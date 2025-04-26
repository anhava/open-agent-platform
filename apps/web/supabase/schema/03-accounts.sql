/*
 * -------------------------------------------------------
 * Osa: Tilit (Accounts)
 * Määrittelee tilit, jotka voivat olla henkilökohtaisia tai tiimejä.
 * Tilit ovat ylätason entiteettejä sovelluksessa.
 * -------------------------------------------------------
 */

-- Taulu: public.accounts
CREATE TABLE IF NOT EXISTS public.accounts (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
    primary_owner_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL DEFAULT auth.uid(),
    name VARCHAR(255) NOT NULL CHECK (char_length(name) > 0),
    slug TEXT UNIQUE,
    email VARCHAR(320) UNIQUE, -- Tilin pääsähköposti (henkilökohtaisilla tileillä sama kuin omistajan)
    is_personal_account BOOLEAN DEFAULT false NOT NULL,
    picture_url VARCHAR(1000), -- Tilin kuvan URL (esim. profiili- tai tiimikuva)
    public_data JSONB DEFAULT '{}'::jsonb NOT NULL, -- Muu julkinen data tarvittaessa
    -- Automaattiset aikaleimat ja käyttäjäseuranta
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

COMMENT ON TABLE public.accounts IS 'Sovelluksen tilit. Voivat olla henkilökohtaisia (is_personal_account=true) tai tiimejä (is_personal_account=false).';
COMMENT ON COLUMN public.accounts.is_personal_account IS 'Onko tili henkilökohtainen (true) vai tiimi (false)?';
COMMENT ON COLUMN public.accounts.name IS 'Tilin nimi (käyttäjän tai tiimin).';
COMMENT ON COLUMN public.accounts.slug IS 'Uniikki tunniste tiimitilille (käytetään URL:ssa), NULL henkilökohtaisilla tileillä.';
COMMENT ON COLUMN public.accounts.primary_owner_user_id IS 'Tilin ensisijainen omistaja (viittaa auth.users).';
COMMENT ON COLUMN public.accounts.email IS 'Tilin sähköposti. Henkilökohtaisilla tileillä sama kuin omistajan, tiimeillä voi olla oma.';
COMMENT ON COLUMN public.accounts.picture_url IS 'URL tilin kuvaan (profiili/logo).';
COMMENT ON COLUMN public.accounts.public_data IS 'Muuta julkista JSON-dataa tilistä.';

-- Rajoite: Slug voi olla NULL vain henkilökohtaisilla tileillä
ALTER TABLE public.accounts
  DROP CONSTRAINT IF EXISTS accounts_slug_null_if_personal_account_true;
ALTER TABLE public.accounts
  ADD CONSTRAINT accounts_slug_null_if_personal_account_true CHECK (
    (is_personal_account = true AND slug IS NULL) OR
    (is_personal_account = false AND slug IS NOT NULL)
  );

-- Rajoite: Uniikki omistaja henkilökohtaisille tileille
DROP INDEX IF EXISTS unique_personal_account;
CREATE UNIQUE INDEX unique_personal_account ON public.accounts (primary_owner_user_id)
  WHERE is_personal_account = true;

-- Indeksit
CREATE INDEX IF NOT EXISTS ix_accounts_primary_owner_user_id ON public.accounts (primary_owner_user_id);
CREATE INDEX IF NOT EXISTS ix_accounts_is_personal_account ON public.accounts (is_personal_account);

-- Triggerit
-- Aseta aikaleimat automaattisesti
DROP TRIGGER IF EXISTS set_accounts_timestamps ON public.accounts;
CREATE TRIGGER set_accounts_timestamps
  BEFORE INSERT OR UPDATE ON public.accounts
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamps();

-- Aseta käyttäjäseuranta automaattisesti
DROP TRIGGER IF EXISTS set_accounts_user_tracking ON public.accounts;
CREATE TRIGGER set_accounts_user_tracking
  BEFORE INSERT OR UPDATE ON public.accounts
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_user_tracking();

-- Suojaa kriittiset kentät päivityksiltä
DROP TRIGGER IF EXISTS protect_account_fields ON public.accounts;
CREATE TRIGGER protect_account_fields
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW EXECUTE PROCEDURE kit.protect_account_fields();

-- Lisää käyttäjä automaattisesti tiimin jäseneksi luonnin yhteydessä
DROP TRIGGER IF EXISTS add_current_user_to_new_account ON public.accounts;
CREATE TRIGGER add_current_user_to_new_account
  AFTER INSERT ON public.accounts
  FOR EACH ROW
  WHEN (NEW.is_personal_account = false)
  EXECUTE PROCEDURE kit.add_current_user_to_new_account();

-- Päivitä henkilökohtaisen tilin email, kun auth.users.email muuttuu
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE kit.handle_update_user_email();

-- Aseta/päivitä slug automaattisesti tiimitileille nimen perusteella
DROP TRIGGER IF EXISTS set_slug_from_account_name ON public.accounts;
CREATE TRIGGER set_slug_from_account_name
  BEFORE INSERT ON public.accounts
  FOR EACH ROW
  WHEN (NEW.name IS NOT NULL AND NEW.slug IS NULL AND NEW.is_personal_account = false)
  EXECUTE PROCEDURE kit.set_slug_from_account_name();

DROP TRIGGER IF EXISTS update_slug_from_account_name ON public.accounts;
CREATE TRIGGER update_slug_from_account_name
  BEFORE UPDATE ON public.accounts
  FOR EACH ROW
  WHEN (NEW.name IS NOT NULL AND NEW.name <> OLD.name AND NEW.is_personal_account = false)
  EXECUTE PROCEDURE kit.set_slug_from_account_name();

-- RLS: public.accounts
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
-- Pääsynhallinnan perusasetukset (SELECT, INSERT, UPDATE, DELETE)
-- Nämä myönnetään nyt, mutta RLS-politiikat rajoittavat todellista pääsyä.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.accounts TO authenticated, service_role;

-- Poistetaan vanhat politiikat ennen uusien luontia
DROP POLICY IF EXISTS accounts_self_update ON public.accounts;
DROP POLICY IF EXISTS accounts_read ON public.accounts;
DROP POLICY IF EXISTS create_org_account ON public.accounts;
DROP POLICY IF EXISTS delete_team_account ON public.accounts;

-- SELECT: Käyttäjä voi lukea tilin, jos hän on sen omistaja TAI jäsen.
CREATE POLICY accounts_read ON public.accounts
  FOR SELECT TO authenticated USING (
    (auth.uid() = primary_owner_user_id) OR 
    (public.has_role_on_account(id)) -- Olettaa has_role_on_account on määritelty
  );

-- UPDATE: Vain tilin omistaja voi päivittää tiliä.
-- HUOM: Trigger `protect_account_fields` estää lisäksi kriittisten kenttien muokkauksen.
CREATE POLICY accounts_self_update ON public.accounts
  FOR UPDATE TO authenticated USING (auth.uid() = primary_owner_user_id)
  WITH CHECK (auth.uid() = primary_owner_user_id);

-- INSERT: Kirjautunut käyttäjä voi luoda tiimitilin, jos ominaisuus on päällä.
-- Henkilökohtainen tili luodaan triggerillä (`on_auth_user_created`).
CREATE POLICY create_org_account ON public.accounts
  FOR INSERT TO authenticated WITH CHECK (
    public.is_set('enable_team_accounts') AND -- Olettaa is_set on määritelty
    is_personal_account = false AND
    primary_owner_user_id = auth.uid() -- Varmistetaan, että luoja on omistaja
  );

-- DELETE: Vain tilin omistaja voi poistaa tilin (sekä henkilökohtaisen että tiimin).
-- HUOM: Mieti tarkemmin tiimitilin poiston seurauksia (jäsenet, resurssit).
CREATE POLICY delete_team_account ON public.accounts
  FOR DELETE TO authenticated USING (auth.uid() = primary_owner_user_id);


-- Funktio: public.transfer_team_account_ownership
-- Siirtää tiimitilin omistajuuden toiselle jäsenelle.
CREATE OR REPLACE FUNCTION public.transfer_team_account_ownership (target_account_id uuid, new_owner_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- Vaatii korkeammat oikeudet muokata omistajaa
SET search_path = '','public'
AS $$
DECLARE
    current_user_id UUID := auth.uid();
    is_current_owner BOOLEAN;
BEGIN
    -- Vain nykyinen omistaja tai service_role voi siirtää omistajuuden
    SELECT current_user_id = a.primary_owner_user_id 
    INTO is_current_owner 
    FROM public.accounts a 
    WHERE a.id = target_account_id;

    IF NOT is_current_owner AND current_user NOT IN ('service_role') THEN
        RAISE EXCEPTION 'Vain tilin omistaja voi siirtää omistajuuden.';
    END IF;

    -- Varmista, että kohdetili on tiimitili
    IF EXISTS(SELECT 1 FROM public.accounts WHERE id = target_account_id AND is_personal_account = true) THEN
        RAISE EXCEPTION 'Omistajuutta voi siirtää vain tiimitileillä.';
    END IF;

    -- Varmista, että uusi omistaja on eri kuin nykyinen
    IF new_owner_id = current_user_id AND is_current_owner THEN
         RAISE EXCEPTION 'Et voi siirtää omistajuutta itsellesi.';
    END IF;

    -- Varmista, että uusi omistaja on jo tilin jäsen
    IF NOT EXISTS(SELECT 1 FROM public.accounts_memberships WHERE account_id = target_account_id AND user_id = new_owner_id) THEN
        RAISE EXCEPTION 'Uuden omistajan tulee olla tilin jäsen.';
    END IF;

    -- Päivitä tilin ensisijainen omistaja
    UPDATE public.accounts
    SET primary_owner_user_id = new_owner_id
    WHERE id = target_account_id;

    -- Päivitä uuden omistajan rooli korkeimmaksi (owner), jos ei jo ole
    -- Olettaa funktion get_upper_system_role() olemassaolon tiedostosta 02-config.sql
    UPDATE public.accounts_memberships
    SET account_role = public.get_upper_system_role()
    WHERE account_id = target_account_id
      AND user_id = new_owner_id
      AND account_role <> public.get_upper_system_role();

    -- Varmista, että vanha omistaja säilyy jäsenenä (voit muuttaa roolia tarvittaessa)
    -- Tässä oletetaan, että vanha omistaja pysyy jäsenenä samalla roolilla,
    -- ellei sitä erikseen muuteta/poisteta.

END;
$$;

GRANT EXECUTE ON FUNCTION public.transfer_team_account_ownership(uuid, uuid) TO authenticated, service_role;

-- Funktio: public.is_account_owner
-- Tarkistaa, onko nykyinen käyttäjä annetun tilin ensisijainen omistaja.
CREATE OR REPLACE FUNCTION public.is_account_owner (target_account_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = '','public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.accounts
        WHERE id = target_account_id
          AND primary_owner_user_id = auth.uid()
    );
$$;

GRANT EXECUTE ON FUNCTION public.is_account_owner(uuid) TO authenticated, service_role;

-- Funktio: kit.protect_account_fields (Kit-skeemassa)
-- Trigger-funktio, joka estää tiettyjen kenttien muokkaamisen.
CREATE OR REPLACE FUNCTION kit.protect_account_fields ()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = '','public'
AS $$
BEGIN
    -- Sallitaan vain service_role-käyttäjän ohittaa tarkistukset
    IF current_user NOT IN ('service_role') THEN
        -- Estetään näiden kenttien muokkaus tavallisilta käyttäjiltä
        IF NEW.id IS DISTINCT FROM OLD.id OR 
           NEW.is_personal_account IS DISTINCT FROM OLD.is_personal_account OR 
           NEW.primary_owner_user_id IS DISTINCT FROM OLD.primary_owner_user_id OR
           NEW.created_at IS DISTINCT FROM OLD.created_at OR -- Myös aikaleimat
           NEW.created_by IS DISTINCT FROM OLD.created_by
           -- Email-kentän päivitys triggeroidaan erikseen auth.users-muutoksesta
           -- ja sitä ei pitäisi sallia suoraan tässä, ellei erityistä syytä
           -- NEW.email IS DISTINCT FROM OLD.email 
         THEN
            RAISE EXCEPTION 'Sinulla ei ole oikeutta päivittää suojattua kenttää.';
        END IF;
    END IF;
    RETURN NEW;
END;
$$;
-- Trigger on jo liitetty aiemmin

-- Funktio: public.get_upper_system_role (Julkisessa skeemassa)
-- Palauttaa korkeimman hierarkiatason roolin nimen.
CREATE OR REPLACE FUNCTION public.get_upper_system_role ()
RETURNS varchar
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = '','public'
AS $$
DECLARE
    role_name varchar(50);
BEGIN
    -- Oletetaan, että korkein taso on 1
    SELECT name INTO role_name FROM public.roles WHERE hierarchy_level = 1 LIMIT 1;
    RETURN role_name;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_upper_system_role() TO authenticated, service_role;

-- Funktio: kit.add_current_user_to_new_account (Kit-skeemassa)
-- Trigger-funktio, lisää tilin luojan jäseneksi.
CREATE OR REPLACE FUNCTION kit.add_current_user_to_new_account ()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = '','public'
AS $$
DECLARE
    owner_role varchar(50);
BEGIN
    -- Varmistetaan, että funktio ajetaan vain kun auth.uid() on saatavilla
    IF auth.uid() IS NULL THEN
        RETURN NEW;
    END IF;

    -- Haetaan korkein rooli
    owner_role := public.get_upper_system_role();

    -- Lisätään jäsenyys vain, jos käyttäjä on tilin luoja/omistaja
    -- ja rooli löytyi
    IF NEW.primary_owner_user_id = auth.uid() AND owner_role IS NOT NULL THEN
        INSERT INTO public.accounts_memberships(account_id, user_id, account_role)
        VALUES(NEW.id, auth.uid(), owner_role);
    END IF;

    RETURN NEW;
END;
$$;
-- Trigger on jo liitetty aiemmin

-- Funktio: kit.handle_update_user_email (Kit-skeemassa)
-- Trigger-funktio, päivittää henkilökohtaisen tilin sähköpostin.
CREATE OR REPLACE FUNCTION kit.handle_update_user_email ()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = '','public'
AS $$
BEGIN
    -- Päivitetään vain, jos kyseessä on sähköpostin muutos
    IF NEW.email IS DISTINCT FROM OLD.email THEN
        UPDATE public.accounts
        SET email = NEW.email
        WHERE primary_owner_user_id = NEW.id
          AND is_personal_account = true;
    END IF;
    RETURN NEW;
END;
$$;
-- Trigger on jo liitetty aiemmin

-- Funktio: kit.slugify (Kit-skeemassa)
-- Luo slugin tekstistä.
CREATE OR REPLACE FUNCTION kit.slugify ("value" text)
RETURNS text
LANGUAGE sql
IMMUTABLE STRICT -- Turvallinen ja ei sivuvaikutuksia
SET search_path = '','kit' -- Käyttää kit.unaccent-funktiota
AS $$
    -- removes accents (diacritic signs) from a given string --
    WITH "unaccented" AS (SELECT kit.unaccent("value") AS "value"),
    -- lowercases the string
    "lowercase" AS (SELECT lower("value") AS "value" FROM "unaccented"),
    -- remove single and double quotes
    "removed_quotes" AS (SELECT regexp_replace("value", '['"]+', '','gi') AS "value" FROM "lowercase"),
    -- replaces anything that's not a letter, number, hyphen('-'), or underscore('_') with a hyphen('-')
    "hyphenated" AS (SELECT regexp_replace("value", '[^a-z0-9\-_]+', '-','gi') AS "value" FROM "removed_quotes"),
    -- trims hyphens('-') if they exist on the head or tail of the string
    "trimmed" AS (SELECT regexp_replace(regexp_replace("value", '\-+$',''), '^-+', '') AS "value" FROM "hyphenated")
    SELECT "value" FROM "trimmed";
$$;

GRANT EXECUTE ON FUNCTION kit.slugify(text) TO authenticated, service_role;

-- Funktio: kit.set_slug_from_account_name (Kit-skeemassa)
-- Trigger-funktio, asettaa/päivittää slugin tiimitileille.
CREATE OR REPLACE FUNCTION kit.set_slug_from_account_name ()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = '','kit','public'
AS $$
DECLARE
    target_slug TEXT;
    counter INT := 0;
    slug_candidate TEXT;
BEGIN
    slug_candidate := kit.slugify(NEW.name);
    target_slug := slug_candidate;

    -- Tarkistetaan, onko slug jo olemassa (huomioidaan myös ID, jos päivitys)
    WHILE EXISTS (
        SELECT 1 FROM public.accounts 
        WHERE slug = target_slug 
          AND (TG_OP = 'INSERT' OR id <> OLD.id)
    ) LOOP
        counter := counter + 1;
        target_slug := slug_candidate || '-' || counter::text;
    END LOOP;

    NEW.slug := target_slug;
    RETURN NEW;
END;
$$;
-- Triggerit on jo liitetty aiemmin

-- Funktio: kit.setup_new_user (Kit-skeemassa)
-- Trigger-funktio, luo henkilökohtaisen tilin uudelle käyttäjälle.
CREATE OR REPLACE FUNCTION kit.setup_new_user ()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = '','public'
AS $$
DECLARE
    user_name TEXT;
    picture_url TEXT;
BEGIN
    -- Yritetään hakea nimi ja kuva metadatasta
    user_name := NEW.raw_user_meta_data ->> 'full_name'; -- Käytä full_name, jos saatavilla
    IF user_name IS NULL THEN
        user_name := NEW.raw_user_meta_data ->> 'name';
    END IF;
    
    -- Oletusnimi sähköpostista, jos muuta ei löydy
    IF user_name IS NULL AND NEW.email IS NOT NULL THEN
        user_name := split_part(NEW.email, '@', 1);
    END IF;

    -- Varmistetaan, ettei nimi ole NULL
    user_name := COALESCE(user_name, 'Nimetön Käyttäjä'); 

    picture_url := NEW.raw_user_meta_data ->> 'avatar_url';

    -- Lisätään henkilökohtainen tili
    INSERT INTO public.accounts(id, primary_owner_user_id, name, is_personal_account, picture_url, email)
    VALUES (NEW.id, NEW.id, user_name, true, picture_url, NEW.email);

    RETURN NEW;
END;
$$;
-- Trigger on jo liitetty aiemmin

-- Funktio: public.create_team_account
-- Luo tiimitilin.
CREATE OR REPLACE FUNCTION public.create_team_account (account_name text)
RETURNS public.accounts
LANGUAGE plpgsql
-- Ajetaan kutsujan oikeuksilla, koska RLS hoitaa tarkistuksen
-- SECURITY INVOKER 
SET search_path = '','public'
AS $$
DECLARE
    new_account public.accounts;
BEGIN
    -- RLS-politiikka 'create_org_account' hoitaa tarkistukset (onko ominaisuus päällä, onko käyttäjä oikeutettu)
    INSERT INTO public.accounts(name, is_personal_account, primary_owner_user_id)
    VALUES (account_name, false, auth.uid()) -- Asetetaan luoja suoraan omistajaksi
    RETURNING * INTO new_account;

    RETURN new_account;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_team_account(text) TO authenticated;

-- Funktio: public.get_account_members
-- Hakee tilin jäsenten tiedot slugin perusteella (turvallisempi kuin ID:n paljastaminen?).
CREATE OR REPLACE FUNCTION public.get_account_members (account_slug text)
RETURNS TABLE (
    membership_user_id UUID, -- Nimetään selkeämmin
    membership_account_id UUID,
    membership_role VARCHAR(50),
    role_hierarchy_level INT,
    user_name VARCHAR,
    user_email VARCHAR,
    user_picture_url VARCHAR,
    membership_created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER -- Tarvitaan pääsy kaikkiin jäsenyyksiin ja tileihin
SET search_path = '','public'
AS $$
DECLARE
    target_account_id UUID;
BEGIN
    -- Haetaan tilin ID slugin perusteella
    SELECT id INTO target_account_id FROM public.accounts WHERE slug = account_slug;

    -- Varmistetaan, että kutsujalla on oikeus nähdä tili (RLS:ää ei voi suoraan käyttää SECURITY DEFINER -funktiossa)
    -- Käytetään has_role_on_account -funktiota tarkistukseen
    IF target_account_id IS NULL OR NOT public.has_role_on_account(target_account_id) THEN
       RAISE EXCEPTION 'Tiliä ei löydy tai sinulla ei ole pääsyä siihen.';
    END IF;

    -- Palautetaan jäsenten tiedot
    RETURN QUERY
    SELECT
        am.user_id AS membership_user_id,
        am.account_id AS membership_account_id,
        am.account_role AS membership_role,
        r.hierarchy_level AS role_hierarchy_level,
        u.raw_user_meta_data ->> 'full_name' AS user_name, -- Käytetään full_name metadatasta
        u.email AS user_email,
        u.raw_user_meta_data ->> 'avatar_url' AS user_picture_url,
        am.created_at AS membership_created_at
    FROM
        public.accounts_memberships am
    JOIN auth.users u ON u.id = am.user_id
    JOIN public.roles r ON r.name = am.account_role
    WHERE
        am.account_id = target_account_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_account_members(text) TO authenticated;

-- Poistettu vanhat RLS-politiikat, koska ne määritellään uudelleen selkeyden vuoksi.
-- Lisätty tarkempia GRANT-lausekkeita.
-- Lisätty triggerit aikaleimoille ja käyttäjäseurannalle.
-- Parannettu funktioiden määrittelyjä (SECURITY DEFINER/INVOKER, search_path, STABLE).
-- Lisätty kommentteja suomeksi.
-- Muokattu RLS-politiikkoja vastaamaan paremmin yleisiä tarpeita.