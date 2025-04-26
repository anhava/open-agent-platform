/*
 * -------------------------------------------------------
 * Osa: Tilinäkymät ja -funktiot
 * Määrittelee näkymät ja funktiot käyttäjän ja tiimin tilitietojen lataamiseen
 * -------------------------------------------------------
 */

--
-- NÄKYMÄ "user_account_workspace":
-- Palauttaa kirjautuneen käyttäjän henkilökohtaisen tilin perustiedot ja tilauksen tilan.
CREATE OR REPLACE VIEW
    public.user_account_workspace
    WITH (security_invoker = true) AS
SELECT
    accounts.id AS id,
    accounts.name AS name,
    accounts.picture_url AS picture_url,
    (
        SELECT status
        FROM public.subscriptions
        WHERE account_id = accounts.id
        LIMIT 1
    ) AS subscription_status
FROM
    public.accounts
WHERE
    primary_owner_user_id = (SELECT auth.uid())
    AND accounts.is_personal_account = true
LIMIT 1;

GRANT SELECT ON public.user_account_workspace TO authenticated, service_role;

--
-- NÄKYMÄ "user_accounts":
-- Palauttaa kirjautuneen käyttäjän kaikki tiimitilit ja niihin liittyvät roolit.
CREATE OR REPLACE VIEW
    public.user_accounts (id, name, picture_url, slug, role)
    WITH (security_invoker = true) AS
SELECT
    account.id,
    account.name,
    account.picture_url,
    account.slug,
    membership.account_role
FROM
    public.accounts account
    JOIN public.accounts_memberships membership ON account.id = membership.account_id
WHERE
    membership.user_id = (SELECT auth.uid())
    AND account.is_personal_account = false
    AND account.id IN (
        SELECT account_id
        FROM public.accounts_memberships
        WHERE user_id = (SELECT auth.uid())
    );

GRANT SELECT ON public.user_accounts TO authenticated, service_role;

--
-- FUNKTIO "public.team_account_workspace"
-- Palauttaa kaikki tiimitilin workspace-tiedot yhdellä kyselyllä (slugin perusteella).
CREATE OR REPLACE FUNCTION public.team_account_workspace(account_slug text)
RETURNS TABLE (
    id uuid,
    name varchar(255),
    picture_url varchar(1000),
    slug text,
    role varchar(50),
    role_hierarchy_level int,
    primary_owner_user_id uuid,
    subscription_status public.subscription_status,
    permissions public.app_permissions[]
)
LANGUAGE plpgsql
SET search_path = '','public'
AS $$
BEGIN
    RETURN QUERY
    SELECT
        accounts.id,
        accounts.name,
        accounts.picture_url,
        accounts.slug,
        accounts_memberships.account_role,
        roles.hierarchy_level,
        accounts.primary_owner_user_id,
        subscriptions.status,
        array_agg(role_permissions.permission)
    FROM
        public.accounts
        JOIN public.accounts_memberships ON accounts.id = accounts_memberships.account_id
        LEFT JOIN public.subscriptions ON accounts.id = subscriptions.account_id
        JOIN public.roles ON accounts_memberships.account_role = roles.name
        LEFT JOIN public.role_permissions ON accounts_memberships.account_role = role_permissions.role
    WHERE
        accounts.slug = account_slug
        AND public.accounts_memberships.user_id = (SELECT auth.uid())
    GROUP BY
        accounts.id,
        accounts_memberships.account_role,
        subscriptions.status,
        roles.hierarchy_level;
END;
$$;

GRANT EXECUTE ON FUNCTION public.team_account_workspace(text) TO authenticated, service_role;
