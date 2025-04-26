/*
 * -------------------------------------------------------
 * Osa: Kertakäyttöiset Tokenit (Nonces/OTPs)
 * Määrittelee järjestelmän kertakäyttöisten tokenien luontiin ja varmentamiseen
 * esim. salasanan nollausta, sähköpostin vahvistusta varten.
 * -------------------------------------------------------
 */

-- Varmistetaan pg_cron-laajennuksen olemassaolo (ajoitus siivoukselle)
-- CREATE EXTENSION IF NOT EXISTS pg_cron; 
-- HUOM: Ajoituksen luonti (esim. SELECT cron.schedule(...)) tulee tehdä erikseen, ei tässä tiedostossa.

-- Taulu: public.nonces
CREATE TABLE IF NOT EXISTS public.nonces (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    -- Kryptattu versio asiakkaalle näytetystä/lähetetystä tokenista (esim. 6-numeroinen koodi)
    client_token TEXT NOT NULL,
    -- Kryptattu sisäinen, vahvempi nonce (ei paljasteta asiakkaalle)
    nonce TEXT NOT NULL,
    -- Käyttäjä, johon token liittyy (voi olla NULL anonyymeille, esim. rekisteröinnin vahvistus)
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Tokenin käyttötarkoitus (esim. 'password-reset', 'email-verification', 'mfa-setup')
    purpose TEXT NOT NULL,

    -- Tilatiedot
    expires_at TIMESTAMPTZ NOT NULL, -- Vanhenemisaika
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), -- Lisätty
    used_at TIMESTAMPTZ, -- Aika, jolloin token käytettiin onnistuneesti
    revoked BOOLEAN NOT NULL DEFAULT FALSE, -- Onko token peruutettu manuaalisesti?
    revoked_reason TEXT, -- Syy peruutukselle

    -- Auditointi
    verification_attempts INTEGER NOT NULL DEFAULT 0, -- Kuinka monta kertaa varmennusta yritetty
    last_verification_at TIMESTAMPTZ, -- Viimeisimmän varmennusyrityksen aika
    last_verification_ip INET, -- Varmennusyrityksen IP-osoite
    last_verification_user_agent TEXT, -- Varmennusyrityksen User Agent
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Lisätty
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Lisätty

    -- Laajennettavuus
    metadata JSONB DEFAULT '{}'::JSONB, -- Vapaavalintaista metadataa
    scopes TEXT[] DEFAULT '{}' -- Mahdolliset oikeudet (scopes), joita token antaa
);

COMMENT ON TABLE public.nonces IS 'Kertakäyttöiset tokenit (nonces/OTP) eri tarkoituksiin, kuten salasanan nollaus tai sähköpostin vahvistus.';
COMMENT ON COLUMN public.nonces.client_token IS 'Asiakkaalle lähetetyn/näytetyn tokenin kryptattu vastine.';
COMMENT ON COLUMN public.nonces.nonce IS 'Kryptattu sisäinen nonce turvallisuuden parantamiseksi.';
COMMENT ON COLUMN public.nonces.purpose IS 'Tokenin käyttötarkoitus (esim. password-reset).';
COMMENT ON COLUMN public.nonces.used_at IS 'Aikaleima, jolloin token varmennettiin onnistuneesti.';
COMMENT ON COLUMN public.nonces.revoked IS 'Onko token peruutettu ennen vanhenemista tai käyttöä?';
COMMENT ON COLUMN public.nonces.verification_attempts IS 'Montako kertaa tokenin varmennusta on yritetty.';

-- Indeksit tehokkaisiin hakuihin
-- Optimoitu haettaessa validia tokenia käyttäjän, tarkoituksen ja tokenin perusteella.
CREATE INDEX IF NOT EXISTS idx_nonces_status ON public.nonces (user_id, purpose, expires_at, used_at, revoked);
-- Lisätään indeksi client_tokenille (vaatii btree_gin laajennuksen, jos GIN halutaan hashatulle?) 
-- Yksinkertaisempi B-tree toimii myös, mutta voi olla hitaampi suurella datamäärällä.
CREATE INDEX IF NOT EXISTS idx_nonces_client_token ON public.nonces (client_token text_pattern_ops); 

-- RLS
ALTER TABLE public.nonces ENABLE ROW LEVEL SECURITY;

-- Poistetaan vanha politiikka
DROP POLICY IF EXISTS "Users can read their own nonces" ON public.nonces;
DROP POLICY IF EXISTS "Käyttäjät voivat lukea omat noncensa" ON public.nonces;

-- SELECT: Käyttäjät voivat lukea omat (ei-anonyymit) noncensa.
-- HUOM: Tarvitaanko tätä? Yleensä tokeneita ei lueta suoraan, vaan ne varmennetaan funktiolla.
CREATE POLICY "Käyttäjät voivat lukea omat noncensa" ON public.nonces
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- INSERT/UPDATE/DELETE: Estetään suorat operaatiot, hallinta tapahtuu funktioiden kautta.
-- Oletuksena RLS estää kaiken, jos politiikkaa ei ole.
-- GRANT-oikeudet on myös hyvä rajoittaa service_rolelle, jos mahdollista.
GRANT SELECT ON TABLE public.nonces TO authenticated; -- Sallitaan vain luku (RLS rajoittaa)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.nonces TO service_role;

-- Triggerit
DROP TRIGGER IF EXISTS set_nonces_timestamps ON public.nonces;
CREATE TRIGGER set_nonces_timestamps
  BEFORE INSERT OR UPDATE ON public.nonces
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamps();

DROP TRIGGER IF EXISTS set_nonces_user_tracking ON public.nonces;
CREATE TRIGGER set_nonces_user_tracking
  BEFORE INSERT OR UPDATE ON public.nonces
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_user_tracking();

-- Funktio: public.create_nonce
-- Luo uuden kertakäyttöisen tokenin.
CREATE OR REPLACE FUNCTION public.create_nonce (
    p_user_id UUID DEFAULT NULL,
    p_purpose TEXT DEFAULT NULL,
    p_expires_in_seconds INTEGER DEFAULT 3600, -- 1 tunti oletuksena
    p_metadata JSONB DEFAULT NULL,
    p_scopes TEXT[] DEFAULT NULL,
    p_revoke_previous BOOLEAN DEFAULT TRUE -- Peruutetaanko aiemmat samanlaiset tokenit?
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Tarvitaan kryptausfunktioihin ja muiden tokenien päivitykseen
SET search_path = '','public','extensions'
AS $$
DECLARE
    v_client_token TEXT;
    v_nonce TEXT;
    v_expires_at TIMESTAMPTZ;
    v_id UUID;
    v_plaintext_token TEXT;
    v_revoked_count INTEGER;
BEGIN
    -- Tarkistetaan, että purpose on annettu
    IF p_purpose IS NULL OR trim(p_purpose) = '' THEN
        RAISE EXCEPTION 'Tokenin tarkoitus (purpose) on pakollinen.';
    END IF;

    -- Peruutetaan aiemmat saman käyttäjän ja tarkoituksen tokenit, jos pyydetty
    IF p_revoke_previous = TRUE AND p_user_id IS NOT NULL THEN
        WITH revoked AS (
            UPDATE public.nonces
            SET
                revoked = TRUE,
                revoked_reason = 'Korvattu uudella saman tarkoituksen tokenilla'
            WHERE
                user_id = p_user_id
                AND purpose = p_purpose
                AND used_at IS NULL
                AND revoked = FALSE
                AND expires_at > now()
            RETURNING 1
        )
        SELECT COUNT(*) INTO v_revoked_count FROM revoked;
    END IF;

    -- Generoidaan 6-numeroinen koodi asiakasta varten
    v_plaintext_token := lpad((floor(random() * 900000) + 100000)::text, 6, '0');
    -- Kryptataan se tietokantaan (käyttäen pgcrypto crypt-funktiota)
    v_client_token := crypt(v_plaintext_token, gen_salt('bf'));

    -- Generoidaan vahvempi sisäinen nonce (ei paljasteta)
    v_nonce := encode(gen_random_bytes(24), 'base64');
    v_nonce := crypt(v_nonce, gen_salt('bf'));

    -- Lasketaan vanhenemisaika
    v_expires_at := now() + (p_expires_in_seconds * interval '1 second');

    -- Lisätään uusi nonce
    INSERT INTO public.nonces (
        client_token,
        nonce,
        user_id,
        expires_at,
        metadata,
        purpose,
        scopes
        -- created_by ja updated_by asetetaan triggerillä
    )
    VALUES (
        v_client_token,
        v_nonce,
        p_user_id,
        v_expires_at,
        COALESCE(p_metadata, '{}'::JSONB),
        p_purpose,
        COALESCE(p_scopes, '{}'::TEXT[])
    )
    RETURNING id INTO v_id;

    -- Palautetaan ID, selkokielinen token ja vanhenemisaika
    -- HUOM: Palautetaan SELKOKIELINEN token (v_plaintext_token)!
    RETURN jsonb_build_object(
        'id', v_id,
        'token', v_plaintext_token, -- Tämä lähetetään käyttäjälle
        'expires_at', v_expires_at,
        'revoked_previous_count', COALESCE(v_revoked_count, 0)
    );
END;
$$;

-- Vain service_role voi luoda tokeneita (esim. backend-kutsusta)
GRANT EXECUTE ON FUNCTION public.create_nonce(UUID, TEXT, INTEGER, JSONB, TEXT[], BOOLEAN) TO service_role;

-- Funktio: public.verify_nonce
-- Varmmentaa kertakäyttöisen tokenin.
CREATE OR REPLACE FUNCTION public.verify_nonce (
    p_token TEXT, -- Käyttäjän antama selkokielinen token (esim. 6 numeroa)
    p_purpose TEXT,
    p_user_id UUID DEFAULT NULL, -- Jos token on käyttäjäkohtainen
    p_required_scopes TEXT[] DEFAULT NULL,
    p_max_verification_attempts INTEGER DEFAULT 5,
    p_ip INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- Tarvitaan pääsy kryptattuihin tokeneihin ja päivitykseen
SET search_path = '','public','extensions'
AS $$
DECLARE
    v_nonce RECORD;
BEGIN
    -- Päivitetään varmennusyritysten laskuri ja auditointitiedot KAIKILLE tokeneille,
    -- jotka vastaavat annettua kryptattua tokenia ja tarkoitusta (estää ajoitushyökkäyksiä hieman).
    UPDATE public.nonces
    SET verification_attempts = verification_attempts + 1,
        last_verification_at = now(),
        last_verification_ip = COALESCE(p_ip, last_verification_ip),
        last_verification_user_agent = COALESCE(p_user_agent, last_verification_user_agent)
    WHERE client_token = crypt(p_token, client_token) -- Verrataan kryptattuun arvoon
      AND purpose = p_purpose;

    -- Haetaan *yksi* vastaava, validi token
    SELECT * INTO v_nonce
    FROM public.nonces
    WHERE client_token = crypt(p_token, client_token) -- Kryptattu vertailu
      AND purpose = p_purpose
      -- Käyttäjä-ID:n tarkistus (jos annettu ja token on käyttäjäkohtainen)
      AND (user_id IS NULL OR p_user_id IS NULL OR user_id = p_user_id)
      AND used_at IS NULL
      AND revoked = FALSE
      AND expires_at > now()
    LIMIT 1; -- Varmistetaan, että saadaan vain yksi rivi

    -- Tarkistetaan löytyikö validi token
    IF v_nonce.id IS NULL THEN
        RETURN jsonb_build_object('valid', false, 'message', 'Virheellinen tai vanhentunut koodi.');
    END IF;

    -- Tarkistetaan yritysten määrä
    IF p_max_verification_attempts > 0 AND v_nonce.verification_attempts > p_max_verification_attempts THEN
        -- Peruutetaan token automaattisesti
        UPDATE public.nonces
        SET revoked = TRUE, revoked_reason = 'Liian monta varmennusyritystä'
        WHERE id = v_nonce.id;
        RETURN jsonb_build_object('valid', false, 'message', 'Koodi peruutettu liian monen yrityksen jälkeen.', 'max_attempts_exceeded', true);
    END IF;

    -- Tarkistetaan vaaditut scopet (jos annettu)
    IF p_required_scopes IS NOT NULL AND array_length(p_required_scopes, 1) > 0 THEN
        IF NOT (v_nonce.scopes @> p_required_scopes) THEN
            RETURN jsonb_build_object('valid', false, 'message', 'Tokenilla ei ole vaadittuja oikeuksia.', 'token_scopes', v_nonce.scopes, 'required_scopes', p_required_scopes);
        END IF;
    END IF;

    -- Merkitään token käytetyksi
    UPDATE public.nonces SET used_at = now() WHERE id = v_nonce.id;

    -- Palautetaan onnistunut tulos ja lisätiedot
    RETURN jsonb_build_object(
        'valid', true,
        'user_id', v_nonce.user_id,
        'metadata', v_nonce.metadata,
        'scopes', v_nonce.scopes,
        'purpose', v_nonce.purpose
    );
END;
$$;

-- Sekä kirjautuneet että service_role voivat varmentaa tokeneita
GRANT EXECUTE ON FUNCTION public.verify_nonce(TEXT, TEXT, UUID, TEXT[], INTEGER, INET, TEXT) TO authenticated, service_role;

-- Funktio: public.revoke_nonce
-- Peruuttaa tokenin manuaalisesti.
CREATE OR REPLACE FUNCTION public.revoke_nonce(
  p_id UUID,
  p_reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER -- Tarvitaan päivitysoikeus
SET search_path = '','public'
AS $$
DECLARE
  v_affected_rows INTEGER;
BEGIN
  UPDATE public.nonces
  SET revoked = TRUE, revoked_reason = p_reason
  WHERE id = p_id
    AND used_at IS NULL
    AND revoked = FALSE -- Perutaan vain, jos ei jo peruttu
  RETURNING 1 INTO v_affected_rows; -- Lasketaan montako riviä päivitettiin

  RETURN v_affected_rows > 0; -- Palauttaa true, jos peruutus onnistui
END;
$$;

GRANT EXECUTE ON FUNCTION public.revoke_nonce(UUID, TEXT) TO service_role;

-- Funktio: kit.cleanup_expired_nonces (Kit-skeemassa)
-- Siivoaa vanhentuneet, käytetyt tai perutut tokenit.
CREATE OR REPLACE FUNCTION kit.cleanup_expired_nonces(
  p_older_than_days INTEGER DEFAULT 7, -- Oletuksena viikkoa vanhemmat
  p_include_used BOOLEAN DEFAULT TRUE,
  p_include_revoked BOOLEAN DEFAULT TRUE
)
RETURNS INTEGER -- Palauttaa poistettujen rivien määrän
LANGUAGE plpgsql
SECURITY DEFINER -- Tarvitaan DELETE-oikeus
SET search_path = '','public'
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  WITH deleted AS (
    DELETE FROM public.nonces
    WHERE (
      -- Vanhentuneet ja käyttämättömät
      (expires_at < (now() - (p_older_than_days * interval '1 day')) AND used_at IS NULL)
      OR 
      -- Käytetyt (jos p_include_used = true)
      (p_include_used = TRUE AND used_at < (now() - (p_older_than_days * interval '1 day')))
      OR 
      -- Peruutetut (jos p_include_revoked = true)
      (p_include_revoked = TRUE AND revoked = TRUE AND created_at < (now() - (p_older_than_days * interval '1 day')))
    )
    RETURNING 1
  )
  SELECT COUNT(*) INTO v_count FROM deleted;

  RETURN v_count;
END;
$$;

-- Funktio: public.get_nonce_status
-- Hakee tokenin tilan hallinnollisiin tarkoituksiin.
CREATE OR REPLACE FUNCTION public.get_nonce_status(p_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = '','public'
AS $$
DECLARE
  v_nonce public.nonces;
BEGIN
  SELECT * INTO v_nonce FROM public.nonces WHERE id = p_id;

  IF v_nonce.id IS NULL THEN
    RETURN jsonb_build_object('exists', false);
  END IF;

  RETURN jsonb_build_object(
    'exists', true,
    'purpose', v_nonce.purpose,
    'user_id', v_nonce.user_id,
    'created_at', v_nonce.created_at,
    'expires_at', v_nonce.expires_at,
    'used_at', v_nonce.used_at,
    'revoked', v_nonce.revoked,
    'revoked_reason', v_nonce.revoked_reason,
    'verification_attempts', v_nonce.verification_attempts,
    'last_verification_at', v_nonce.last_verification_at,
    'last_verification_ip', v_nonce.last_verification_ip,
    'is_valid', (v_nonce.used_at IS NULL AND NOT v_nonce.revoked AND v_nonce.expires_at > now())
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_nonce_status(UUID) TO service_role;

COMMENT ON FUNCTION kit.cleanup_expired_nonces IS 'Poistaa vanhentuneet, käytetyt tai perutut kertakäyttöiset tokenit tietokannasta. Suositellaan ajastettavaksi pg_cronilla.';
