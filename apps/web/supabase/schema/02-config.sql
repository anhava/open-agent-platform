/*
 * -------------------------------------------------------
 * Osa: Sovelluksen Konfiguraatio ja yleiset funktiot
 * Luodaan config-taulu ja yleiskäyttöisiä funktioita/triggereitä.
 * -------------------------------------------------------
 */

-- Taulu: public.config
-- Sisältää globaaleja sovelluksen asetuksia (yleensä vain yksi rivi).
CREATE TABLE IF NOT EXISTS public.config (
    -- Ominaisuusliput
    enable_team_accounts BOOLEAN DEFAULT true NOT NULL,
    enable_account_billing BOOLEAN DEFAULT true NOT NULL,
    enable_team_account_billing BOOLEAN DEFAULT true NOT NULL,
    -- Lisää Aihio AI -spesifejä asetuksia tarvittaessa, esim:
    -- enable_rag_feature BOOLEAN DEFAULT true NOT NULL,
    -- enable_custom_tools BOOLEAN DEFAULT false NOT NULL,
    
    -- Valittu laskutuksen tarjoaja (jos konfiguroidaan tietokannasta)
    -- Vaihtoehtoisesti tämä voi tulla ympäristömuuttujista.
    billing_provider public.billing_provider DEFAULT 'stripe' NOT NULL 
);

COMMENT ON TABLE public.config IS 'Sovelluksen globaalit konfiguraatioasetukset ja ominaisuusliput.';
COMMENT ON COLUMN public.config.enable_team_accounts IS 'Ovatko tiimitilit käytössä?';
COMMENT ON COLUMN public.config.enable_account_billing IS 'Onko laskutus käytössä henkilökohtaisille tileille?';
COMMENT ON COLUMN public.config.enable_team_account_billing IS 'Onko laskutus käytössä tiimitileille?';
COMMENT ON COLUMN public.config.billing_provider IS 'Käytössä oleva laskutuksen tarjoaja.';

-- Varmistetaan, että taulussa on vain yksi rivi (jos se on luotu)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.config) THEN
    INSERT INTO public.config (enable_team_accounts, enable_account_billing, enable_team_account_billing, billing_provider)
    VALUES (true, true, true, 'stripe');
  END IF;
END $$;


-- RLS: public.config
ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;
-- Poistetaan vanha, jos sattuu olemaan
DROP POLICY IF EXISTS "Kirjautuneet käyttäjät voivat lukea konfiguraation" ON public.config;
-- Sallitaan kaikkien kirjautuneiden käyttäjien lukea konfiguraatiotieto
CREATE POLICY "Kirjautuneet käyttäjät voivat lukea konfiguraation" ON public.config
  FOR SELECT TO authenticated USING (true);
-- HUOM: Hallinnointi (INSERT/UPDATE/DELETE) pitäisi rajoittaa esim. superadmin-rooliin tai tehdä migraatioiden kautta.


-- Funktio: public.get_config()
-- Palauttaa konfiguraatiorivin JSON-muodossa.
CREATE OR REPLACE FUNCTION public.get_config ()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER -- Aja funktiona, jolla on oikeudet lukea taulu
SET search_path = '','public' -- Määritä search_path
AS $$
DECLARE
    result record;
BEGIN
    SELECT * FROM public.config LIMIT 1 INTO result;
    RETURN row_to_json(result);
END;
$$;

-- Myönnetään suoritusoikeus funktiolle
GRANT EXECUTE ON FUNCTION public.get_config() TO authenticated, service_role;


-- Funktio: public.is_set(field_name text)
-- Tarkistaa, onko boolean-tyyppinen kenttä config-taulussa asetettu todeksi.
CREATE OR REPLACE FUNCTION public.is_set (field_name text)
RETURNS boolean
LANGUAGE plpgsql
STABLE -- Funktio ei muuta dataa ja palauttaa aina saman tuloksen samoilla syötteillä
SECURITY DEFINER
SET search_path = '','public'
AS $$
DECLARE
    result BOOLEAN;
BEGIN
    -- Käytetään dynaamista SQL:ää turvallisesti format-funktiolla
    EXECUTE format('SELECT %I FROM public.config LIMIT 1', field_name) INTO result;
    RETURN result;
END;
$$;

-- Myönnetään suoritusoikeus funktiolle
GRANT EXECUTE ON FUNCTION public.is_set(text) TO authenticated, service_role;


-- Trigger-funktio: public.trigger_set_timestamps()
-- Asettaa created_at ja updated_at -aikaleimat automaattisesti.
CREATE OR REPLACE FUNCTION public.trigger_set_timestamps()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = '','public'
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_at = now();
        NEW.updated_at = now();
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.updated_at = now();
        -- Estetään created_at-kentän päivitys (jos se on olemassa)
        IF TG_ARGV[0] IS DISTINCT FROM 'ignore_created_at' THEN
             NEW.created_at = OLD.created_at;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.trigger_set_timestamps() IS 'Trigger-funktio, joka asettaa automaattisesti created_at ja updated_at aikaleimat. Voidaan liittää tauluihin.';


-- Trigger-funktio: public.trigger_set_user_tracking()
-- Asettaa created_by ja updated_by -kenttiin muokkaajan user_id:n.
CREATE OR REPLACE FUNCTION public.trigger_set_user_tracking()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- Tarvitaan auth.uid() lukemiseen
SET search_path = '','public'
AS $$
DECLARE
    user_uid UUID := auth.uid();
BEGIN
    IF TG_OP = 'INSERT' THEN
        NEW.created_by = user_uid;
        NEW.updated_by = user_uid;
    ELSIF TG_OP = 'UPDATE' THEN
        NEW.updated_by = user_uid;
        -- Estetään created_by-kentän päivitys (jos se on olemassa)
        IF TG_ARGV[0] IS DISTINCT FROM 'ignore_created_by' THEN
            NEW.created_by = OLD.created_by;
        END IF;
    END IF;
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.trigger_set_user_tracking() IS 'Trigger-funktio, joka asettaa automaattisesti created_by ja updated_by käyttäjätunnisteet auth.uid():n perusteella. Vaatii SECURITY DEFINER.';
