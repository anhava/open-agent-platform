/*
 * -------------------------------------------------------
 * Osa: Jäsenyydet (Memberships)
 * Määrittelee käyttäjien jäsenyydet ja roolit tileillä.
 * Linkittää `auth.users`, `public.accounts` ja `public.roles` -taulut.
 * -------------------------------------------------------
 */

-- Taulu: public.accounts_memberships
CREATE TABLE IF NOT EXISTS public.accounts_memberships (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    account_role VARCHAR(50) REFERENCES public.roles(name) NOT NULL,
    -- Automaattiset aikaleimat ja käyttäjäseuranta
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    PRIMARY KEY (user_id, account_id)
);

COMMENT ON TABLE public.accounts_memberships IS 'Linkittää käyttäjät tileihin ja määrittelee heidän roolinsa kullakin tilillä.';
COMMENT ON COLUMN public.accounts_memberships.account_id IS 'Tili, johon jäsenyys liittyy.';
COMMENT ON COLUMN public.accounts_memberships.account_role IS 'Käyttäjän rooli tällä tilillä.';
COMMENT ON COLUMN public.accounts_memberships.user_id IS 'Jäsenen käyttäjätunnus (viittaa auth.users).';

-- Indeksit
CREATE INDEX IF NOT EXISTS ix_accounts_memberships_account_id ON public.accounts_memberships (account_id);
CREATE INDEX IF NOT EXISTS ix_accounts_memberships_user_id ON public.accounts_memberships (user_id);
CREATE INDEX IF NOT EXISTS ix_accounts_memberships_account_role ON public.accounts_memberships (account_role);

-- Triggerit
-- Aseta aikaleimat automaattisesti
DROP TRIGGER IF EXISTS set_memberships_timestamps ON public.accounts_memberships;
CREATE TRIGGER set_memberships_timestamps
  BEFORE INSERT OR UPDATE ON public.accounts_memberships
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamps();

-- Aseta käyttäjäseuranta automaattisesti
DROP TRIGGER IF EXISTS set_memberships_user_tracking ON public.accounts_memberships;
CREATE TRIGGER set_memberships_user_tracking
  BEFORE INSERT OR UPDATE ON public.accounts_memberships
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_user_tracking();

-- Estä omistajan poistaminen jäsenyydestä
DROP TRIGGER IF EXISTS prevent_account_owner_membership_delete_check ON public.accounts_memberships;
CREATE TRIGGER prevent_account_owner_membership_delete_check
  BEFORE DELETE ON public.accounts_memberships
  FOR EACH ROW EXECUTE PROCEDURE kit.prevent_account_owner_membership_delete();

-- Salli vain roolin päivitys
DROP TRIGGER IF EXISTS prevent_memberships_update_check ON public.accounts_memberships;
CREATE TRIGGER prevent_memberships_update_check
  BEFORE UPDATE ON public.accounts_memberships
  FOR EACH ROW EXECUTE PROCEDURE kit.prevent_memberships_update();


-- Funktio: kit.prevent_account_owner_membership_delete (Kit-skeemassa)
-- Trigger-funktio, estää omistajan poiston.
CREATE OR REPLACE FUNCTION kit.prevent_account_owner_membership_delete()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER -- Kutsujan oikeuksilla, koska tarkistus tehdään public.accounts-tauluun
SET search_path = '','public'
AS $$
BEGIN
    -- Tarkistetaan, onko poistettava käyttäjä tilin ensisijainen omistaja
    IF EXISTS (
        SELECT 1
        FROM public.accounts
        WHERE id = OLD.account_id
          AND primary_owner_user_id = OLD.user_id
    ) THEN
        RAISE EXCEPTION 'Tilin ensisijaista omistajaa ei voi poistaa jäsenyydestä.';
    END IF;
    RETURN OLD;
END;
$$;

-- Funktio: kit.prevent_memberships_update (Kit-skeemassa)
-- Trigger-funktio, sallii vain roolin päivityksen.
CREATE OR REPLACE FUNCTION kit.prevent_memberships_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = '','public'
AS $$
BEGIN
    -- Sallitaan vain account_role-kentän muutos
    IF NEW.account_role IS DISTINCT FROM OLD.account_role AND
       NEW.user_id IS NOT DISTINCT FROM OLD.user_id AND
       NEW.account_id IS NOT DISTINCT FROM OLD.account_id
    THEN
        RETURN NEW;
    END IF;
    
    -- Jos rooli ei muuttunut, mutta jokin muu muuttui (tai roolin lisäksi muu), estetään
    IF NEW.account_role IS NOT DISTINCT FROM OLD.account_role AND
       ROW(NEW.user_id, NEW.account_id) IS DISTINCT FROM ROW(OLD.user_id, OLD.account_id)
    THEN
       RAISE EXCEPTION 'Vain jäsenen roolia voi päivittää.';
    END IF;
    
    -- Jos vain rooli muuttui, sallitaan. Jos mikään ei muuttunut, sallitaan myös.
    -- Jos rooli JA jokin muu muuttui, estetään.
    IF NEW.account_role IS DISTINCT FROM OLD.account_role AND 
       ROW(NEW.user_id, NEW.account_id) IS DISTINCT FROM ROW(OLD.user_id, OLD.account_id)
    THEN
       RAISE EXCEPTION 'Vain jäsenen roolia voi päivittää.';
    END IF;

    RETURN NEW; -- Sallitaan, jos mikään ei muuttunut tai vain rooli muuttui
END;
$$;


-- Funktio: public.has_role_on_account
-- Tarkistaa, onko nykyisellä käyttäjällä rooli (tai tietty rooli) tilillä.
CREATE OR REPLACE FUNCTION public.has_role_on_account (
  target_account_id UUID,
  target_account_role VARCHAR(50) DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER -- Tarvitaan pääsy kaikkiin jäsenyyksiin
SET search_path = '','public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.accounts_memberships AS m
        WHERE m.user_id = auth.uid()
          AND m.account_id = target_account_id
          AND (m.account_role = target_account_role OR target_account_role IS NULL)
    );
$$;

GRANT EXECUTE ON FUNCTION public.has_role_on_account(UUID, VARCHAR) TO authenticated, service_role;


-- Funktio: public.is_team_member (Yksinkertaistettu)
-- Tarkistaa, onko annettu käyttäjä jäsen annetulla tilillä.
CREATE OR REPLACE FUNCTION public.is_team_member (target_account_id UUID, target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER -- Tarvitaan pääsy kaikkiin jäsenyyksiin
SET search_path = '','public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.accounts_memberships AS m
        WHERE m.account_id = target_account_id
          AND m.user_id = target_user_id
    );
$$;

GRANT EXECUTE ON FUNCTION public.is_team_member(UUID, UUID) TO authenticated, service_role;


-- Funktio: public.can_action_account_member
-- Tarkistaa, voiko nykyinen käyttäjä hallita (muokata roolia, poistaa) toista jäsentä.
CREATE OR REPLACE FUNCTION public.can_action_account_member (target_account_id UUID, target_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER -- Tarvitaan pääsy rooleihin, jäsenyyksiin ja oikeuksiin
SET search_path = '','public'
AS $$
DECLARE
    current_user_id UUID := auth.uid();
    permission_granted BOOLEAN;
    target_user_hierarchy_level INT;
    current_user_hierarchy_level INT;
    is_target_primary_owner BOOLEAN;
BEGIN
    -- Käyttäjä ei voi hallita itseään tällä funktiolla
    IF target_user_id = current_user_id THEN
        RETURN false; -- Tai RAISE EXCEPTION 'Et voi hallita omaa jäsenyyttäsi tällä.';
    END IF;

    -- Tilin omistaja voi hallita kaikkia muita jäseniä
    IF public.is_account_owner(target_account_id) THEN
        RETURN true;
    END IF;

    -- Tarkistetaan, onko kohdekäyttäjä tilin ensisijainen omistaja
    SELECT EXISTS (
        SELECT 1 FROM public.accounts
        WHERE id = target_account_id AND primary_owner_user_id = target_user_id
    ) INTO is_target_primary_owner;

    -- Ensisijaista omistajaa ei voi hallita kukaan muu
    IF is_target_primary_owner THEN
        RETURN false; -- Tai RAISE EXCEPTION 'Tilin ensisijaista omistajaa ei voi hallita.';
    END IF;

    -- Tarkistetaan, onko nykyisellä käyttäjällä 'members.manage'-oikeus
    SELECT public.has_permission(current_user_id, target_account_id, 'members.manage')
    INTO permission_granted;

    IF NOT permission_granted THEN
        RETURN false; -- Tai RAISE EXCEPTION 'Sinulla ei ole oikeutta hallita jäseniä tällä tilillä.';
    END IF;

    -- Haetaan kohdekäyttäjän ja nykyisen käyttäjän roolien hierarkiatasot
    SELECT r.hierarchy_level
    INTO target_user_hierarchy_level
    FROM public.accounts_memberships AS am
    JOIN public.roles AS r ON am.account_role = r.name
    WHERE am.account_id = target_account_id AND am.user_id = target_user_id;

    SELECT r.hierarchy_level
    INTO current_user_hierarchy_level
    FROM public.roles AS r
    JOIN public.accounts_memberships AS am ON r.name = am.account_role
    WHERE am.account_id = target_account_id AND am.user_id = current_user_id;

    -- Jos jompaakumpaa roolia ei löydy, ei voi hallita
    IF target_user_hierarchy_level IS NULL OR current_user_hierarchy_level IS NULL THEN
        RETURN false;
    END IF;

    -- Käyttäjä voi hallita vain itseään alemmalla hierarkiatasolla olevia
    -- (pienempi numero = korkeampi taso)
    IF current_user_hierarchy_level >= target_user_hierarchy_level THEN
        RETURN false; -- Tai RAISE EXCEPTION 'Voit hallita vain itseäsi alemmassa roolissa olevia jäseniä.';
    END IF;

    -- Jos kaikki tarkistukset menivät läpi
    RETURN true;
END;
$$;

GRANT EXECUTE ON FUNCTION public.can_action_account_member(UUID, UUID) TO authenticated, service_role;


-- RLS: public.accounts_memberships
ALTER TABLE public.accounts_memberships ENABLE ROW LEVEL SECURITY;

-- Poistetaan vanhat politiikat
DROP POLICY IF EXISTS accounts_memberships_read ON public.accounts_memberships;
DROP POLICY IF EXISTS accounts_memberships_delete ON public.accounts_memberships;
DROP POLICY IF EXISTS accounts_memberships_update_role ON public.accounts_memberships;

-- SELECT: Käyttäjä voi nähdä omat jäsenyytensä ja niiden tilien jäsenyydet, joissa hän on jäsen.
CREATE POLICY accounts_memberships_read ON public.accounts_memberships
  FOR SELECT TO authenticated USING (
    (user_id = auth.uid()) OR 
    (public.has_role_on_account(account_id)) -- Käyttäjä on jäsen tässä tilissä
  );

-- DELETE: Käyttäjä voi poistaa oman jäsenyytensä TAI toisen jäsenen, jos hänellä on siihen oikeus.
CREATE POLICY accounts_memberships_delete ON public.accounts_memberships
  FOR DELETE TO authenticated USING (
    (user_id = auth.uid() AND NOT public.is_account_owner(account_id)) OR -- Voi poistaa itsensä, paitsi jos omistaja
    (public.can_action_account_member(account_id, user_id)) -- Tai voi hallita kohdejäsenta
  );

-- UPDATE: Käyttäjä voi päivittää toisen jäsenen roolia, jos hänellä on siihen oikeus.
-- HUOM: Trigger `prevent_memberships_update` sallii vain `account_role`-kentän muutoksen.
CREATE POLICY accounts_memberships_update_role ON public.accounts_memberships
  FOR UPDATE TO authenticated USING (
    public.can_action_account_member(account_id, user_id)
  ) WITH CHECK (
    public.can_action_account_member(account_id, user_id)
  );

-- POISTETTU DUPLIKAATIT:
-- Poistettu `roles_read` ja `accounts_read` -politiikkojen määrittelyt tästä tiedostosta.
-- Poistettu `is_account_team_member` -funktio (ei käytössä päivitetyissä RLS-politiikoissa ja voi olla tarpeeton).