/*
 * -------------------------------------------------------
 * Osa: Kutsut (Invitations)
 * Määrittelee tiimeihin liittymiskutsut.
 * -------------------------------------------------------
 */

-- Taulu: public.invitations
CREATE TABLE IF NOT EXISTS public.invitations (
    -- Käytetään UUID:tä pääavaimena johdonmukaisuuden vuoksi
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(), 
    email VARCHAR(255) NOT NULL,
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    invited_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role VARCHAR(50) REFERENCES public.roles(name) NOT NULL,
    -- Käytetään TEXT-tyyppiä tokenille varmuuden vuoksi, UUID toimii myös
    invite_token TEXT UNIQUE NOT NULL DEFAULT extensions.uuid_generate_v4()::text,
    -- Automaattiset aikaleimat ja käyttäjäseuranta (lisätty)
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,    
    expires_at TIMESTAMPTZ DEFAULT (now() + interval '7 days') NOT NULL,
    -- Estetään saman sähköpostin kutsuminen samaan tiliin useasti
    UNIQUE (email, account_id)
);

COMMENT ON TABLE public.invitations IS 'Käyttäjien kutsut liittyä tiilitileihin.';
COMMENT ON COLUMN public.invitations.account_id IS 'Tili, johon käyttäjä kutsutaan.';
COMMENT ON COLUMN public.invitations.invited_by IS 'Käyttäjä, joka lähetti kutsun.';
COMMENT ON COLUMN public.invitations.role IS 'Rooli, joka kutsuttavalle tarjotaan.';
COMMENT ON COLUMN public.invitations.invite_token IS 'Uniikki tunniste kutsun hyväksymistä varten.';
COMMENT ON COLUMN public.invitations.expires_at IS 'Kutsun viimeinen voimassaolopäivä.';
COMMENT ON COLUMN public.invitations.email IS 'Kutsutun käyttäjän sähköpostiosoite.';

-- Indeksit
CREATE INDEX IF NOT EXISTS ix_invitations_account_id ON public.invitations (account_id);
CREATE INDEX IF NOT EXISTS ix_invitations_token ON public.invitations (invite_token); -- Lisätty indeksi tokenille

-- Oikeudet (RLS rajoittaa todellista pääsyä)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.invitations TO authenticated, service_role;

-- Triggerit
-- Aseta aikaleimat automaattisesti
DROP TRIGGER IF EXISTS set_invitations_timestamps ON public.invitations;
CREATE TRIGGER set_invitations_timestamps
  BEFORE INSERT OR UPDATE ON public.invitations
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamps();

-- Aseta käyttäjäseuranta automaattisesti
DROP TRIGGER IF EXISTS set_invitations_user_tracking ON public.invitations;
CREATE TRIGGER set_invitations_user_tracking
  BEFORE INSERT OR UPDATE ON public.invitations
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_user_tracking();

-- Estä kutsujen luonti henkilökohtaisille tileille
DROP TRIGGER IF EXISTS only_team_accounts_check ON public.invitations;
CREATE TRIGGER only_team_accounts_check
  BEFORE INSERT OR UPDATE ON public.invitations
  FOR EACH ROW EXECUTE PROCEDURE kit.check_team_account();

-- Funktio: kit.check_team_account (Kit-skeemassa)
-- Trigger-funktio, varmistaa että kutsu liittyy tiimitiliin.
CREATE OR REPLACE FUNCTION kit.check_team_account()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = '','public'
AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM public.accounts
        WHERE id = NEW.account_id AND is_personal_account = true
    ) THEN
        RAISE EXCEPTION 'Kutsuja voi lähettää vain tiimitileille.';
    END IF;
    RETURN NEW;
END;
$$;

-- RLS: public.invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Poistetaan vanhat politiikat
DROP POLICY IF EXISTS invitations_read_self ON public.invitations;
DROP POLICY IF EXISTS invitations_create_self ON public.invitations;
DROP POLICY IF EXISTS invitations_update ON public.invitations;
DROP POLICY IF EXISTS invitations_delete ON public.invitations;
DROP POLICY IF EXISTS "Käyttäjä voi lukea oman tiimin kutsut" ON public.invitations;
DROP POLICY IF EXISTS "Käyttäjä voi luoda kutsun oikeuksilla" ON public.invitations;
DROP POLICY IF EXISTS "Käyttäjä voi päivittää kutsun oikeuksilla" ON public.invitations;
DROP POLICY IF EXISTS "Käyttäjä voi poistaa kutsun oikeuksilla" ON public.invitations;

-- SELECT: Käyttäjä voi nähdä kutsut tileillä, joissa hän on jäsen.
CREATE POLICY "Käyttäjä voi lukea oman tiimin kutsut" ON public.invitations
  FOR SELECT TO authenticated USING (public.has_role_on_account(account_id));

-- INSERT: Käyttäjä voi luoda kutsun, jos tiimit on sallittu, hänellä on invites.manage-oikeus 
--         ja kutsuttava rooli on samalla tai alemmalla tasolla kuin kutsujan.
CREATE POLICY "Käyttäjä voi luoda kutsun oikeuksilla" ON public.invitations
  FOR INSERT TO authenticated WITH CHECK (
    public.is_set('enable_team_accounts') AND
    public.has_permission(auth.uid(), account_id, 'invites.manage') AND
    ( -- Joko kutsujalla on korkeampi rooli TAI sama rooli
      public.has_more_elevated_role(auth.uid(), account_id, role) OR
      public.has_same_role_hierarchy_level(auth.uid(), account_id, role)
    )
  );

-- UPDATE: Käyttäjä voi päivittää kutsun (esim. roolia?), jos hänellä on invites.manage-oikeus
--         ja uusi rooli on samalla tai alemmalla tasolla.
-- HUOM: Mitä kenttiä oikeasti saa päivittää? Trigger estää account_id:n muutoksen.
CREATE POLICY "Käyttäjä voi päivittää kutsun oikeuksilla" ON public.invitations
  FOR UPDATE TO authenticated USING (
     public.has_permission(auth.uid(), account_id, 'invites.manage')
  ) WITH CHECK (
    public.has_permission(auth.uid(), account_id, 'invites.manage') AND
    ( -- Tarkistetaan hierarkia suhteessa PÄIVITETTYYN rooliin
      public.has_more_elevated_role(auth.uid(), account_id, NEW.role) OR
      public.has_same_role_hierarchy_level(auth.uid(), account_id, NEW.role)
    )
    -- Varmistetaan, ettei kriittisiä tietoja muuteta (esim. email, account_id, invited_by)
    AND NEW.email IS NOT DISTINCT FROM OLD.email
    AND NEW.account_id IS NOT DISTINCT FROM OLD.account_id
    AND NEW.invited_by IS NOT DISTINCT FROM OLD.invited_by
  );

-- DELETE: Käyttäjä voi poistaa kutsun, jos hänellä on rooli tilillä ja invites.manage-oikeus.
CREATE POLICY "Käyttäjä voi poistaa kutsun oikeuksilla" ON public.invitations
  FOR DELETE TO authenticated USING (
    public.has_role_on_account(account_id) AND
    public.has_permission(auth.uid(), account_id, 'invites.manage')
  );

-- Funktio: public.accept_invitation
-- Hyväksyy kutsun ja lisää käyttäjän jäseneksi.
CREATE OR REPLACE FUNCTION public.accept_invitation (token TEXT, user_id_to_accept UUID)
RETURNS UUID -- Palauttaa tilin ID:n, johon liityttiin
LANGUAGE plpgsql
SECURITY DEFINER -- Tarvitaan, jotta voidaan lisätä jäsenyys ja poistaa kutsu
SET search_path = '','public'
AS $$
DECLARE
    target_account_id UUID;
    target_role VARCHAR(50);
    invitation_id UUID;
BEGIN
    -- Haetaan kutsu tokenilla ja varmistetaan, ettei se ole vanhentunut
    SELECT id, account_id, role INTO invitation_id, target_account_id, target_role
    FROM public.invitations
    WHERE invite_token = token AND expires_at > now();

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Virheellinen tai vanhentunut kutsutoken: %s', token;
    END IF;

    -- Lisätään käyttäjä jäseneksi
    -- Triggerit hoitavat created_at/by ym. automaattisesti
    INSERT INTO public.accounts_memberships(user_id, account_id, account_role)
    VALUES (user_id_to_accept, target_account_id, target_role)
    ON CONFLICT (user_id, account_id) DO NOTHING; -- Älä tee mitään, jos jäsenyys on jo olemassa

    -- Poistetaan käytetty kutsu
    DELETE FROM public.invitations WHERE id = invitation_id;

    RETURN target_account_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.accept_invitation(TEXT, UUID) TO service_role;


-- Funktio: public.create_invitation (HARKITSE POISTOA)
-- Luo yhden kutsun. RLS + suora INSERT voi olla parempi.
CREATE OR REPLACE FUNCTION public.create_invitation (target_account_id UUID, target_email TEXT, target_role VARCHAR(50))
RETURNS public.invitations
LANGUAGE plpgsql
SECURITY INVOKER -- Ajetaan kutsujan oikeuksilla, RLS tarkistaa luontioikeuden
SET search_path = '','public','extensions'
AS $$
DECLARE
    new_invitation public.invitations;
    generated_token TEXT := extensions.uuid_generate_v4()::text;
    inviter_id UUID := auth.uid();
BEGIN
    -- RLS-politiikka 'Käyttäjä voi luoda kutsun oikeuksilla' tarkistaa oikeudet
    INSERT INTO public.invitations(email, account_id, invited_by, role, invite_token)
    VALUES (target_email, target_account_id, inviter_id, target_role, generated_token)
    RETURNING * INTO new_invitation;

    RETURN new_invitation;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_invitation(UUID, TEXT, VARCHAR) TO authenticated;


-- Funktio: public.get_account_invitations
-- Hakee tilin kutsut slugin perusteella.
CREATE OR REPLACE FUNCTION public.get_account_invitations (target_account_slug TEXT)
RETURNS TABLE (
  id UUID,
  email VARCHAR(255),
  account_id UUID,
  invited_by UUID,
  role VARCHAR(50),
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  -- Haetaan kutsujan tiedot auth.users-taulusta
  inviter_name TEXT,
  inviter_email VARCHAR
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER -- Tarvitaan pääsy kutsuihin ja kutsujien tietoihin
SET search_path = '','public','auth'
AS $$
DECLARE
    target_account_id UUID;
BEGIN
    -- Haetaan tilin ID slugin perusteella
    SELECT a.id INTO target_account_id FROM public.accounts a WHERE a.slug = target_account_slug;

    -- Varmistetaan kutsujan oikeus lukea kutsut (RLS:ää ei voi käyttää suoraan)
    IF target_account_id IS NULL OR NOT public.has_role_on_account(target_account_id) THEN
       RAISE EXCEPTION 'Tiliä ei löydy tai sinulla ei ole pääsyä sen kutsuihin.';
    END IF;

    -- Palautetaan kutsut ja kutsujien tiedot
    RETURN QUERY
    SELECT
        i.id,
        i.email,
        i.account_id,
        i.invited_by,
        i.role,
        i.created_at,
        i.updated_at,
        i.expires_at,
        u.raw_user_meta_data ->> 'full_name' AS inviter_name,
        u.email AS inviter_email
    FROM
        public.invitations AS i
    -- Liitetään auth.users-tauluun kutsujan tietojen hakemiseksi
    LEFT JOIN auth.users AS u ON i.invited_by = u.id
    WHERE
        i.account_id = target_account_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_account_invitations(TEXT) TO authenticated, service_role;


-- Funktio: public.add_invitations_to_account
-- Lisää useita kutsuja kerralla.
CREATE OR REPLACE FUNCTION public.add_invitations_to_account (
  target_account_slug TEXT,
  invitations_data public.invitation[] -- Käyttää komposiittityyppiä
)
RETURNS SETOF public.invitations -- Palauttaa luodut kutsut
LANGUAGE plpgsql
SECURITY INVOKER -- Ajetaan kutsujan oikeuksilla, RLS tarkistaa oikeudet
SET search_path = '','public','extensions'
AS $$
DECLARE
    target_account_id UUID;
    new_invitation public.invitations;
    invitation_record public.invitation;
    generated_token TEXT;
    inviter_id UUID := auth.uid();
BEGIN
    -- Haetaan tilin ID slugin perusteella
    SELECT a.id INTO target_account_id FROM public.accounts a WHERE a.slug = target_account_slug;

    IF target_account_id IS NULL THEN
        RAISE EXCEPTION 'Tiliä slugilla % ei löydy.', target_account_slug;
    END IF;

    -- Käydään läpi kutsut ja lisätään ne
    FOREACH invitation_record IN ARRAY invitations_data
    LOOP
        generated_token := extensions.uuid_generate_v4()::text;
        
        -- RLS-politiikka 'Käyttäjä voi luoda kutsun oikeuksilla' tarkistaa oikeudet
        -- ennen kuin INSERT sallitaan.
        INSERT INTO public.invitations(
            email,
            account_id,
            invited_by,
            role,
            invite_token)
        VALUES (
            invitation_record.email,
            target_account_id, 
            inviter_id, 
            invitation_record.role, 
            generated_token)
        ON CONFLICT (email, account_id) DO NOTHING -- Estetään duplikaatit, jos kutsu jo olemassa
        RETURNING * INTO new_invitation;

        -- Palautetaan vain onnistuneesti luodut (ei konflikteja)
        IF new_invitation IS NOT NULL THEN 
            RETURN NEXT new_invitation;
        END IF;
    END LOOP;

    RETURN;
END;
$$;

GRANT EXECUTE ON FUNCTION public.add_invitations_to_account(TEXT, public.invitation[]) TO authenticated;
