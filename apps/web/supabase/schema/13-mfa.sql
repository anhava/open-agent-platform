/*
 * -------------------------------------------------------
 * Osa: MFA (Monivaiheinen tunnistautuminen)
 * Määrittelee politiikat ja funktiot MFA-vaatimusten valvontaan
 * -------------------------------------------------------
 */

/*
* public.is_aal2
* Tarkistaa, onko käyttäjällä AAL2-tason (MFA) istunto
*/
CREATE OR REPLACE FUNCTION public.is_aal2() RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = '','public'
AS $$
DECLARE
    is_aal2 boolean;
BEGIN
    SELECT auth.jwt() ->> 'aal' = 'aal2' INTO is_aal2;
    RETURN coalesce(is_aal2, false);
END
$$;

-- Oikeus funktioon vain kirjautuneille käyttäjille
GRANT EXECUTE ON FUNCTION public.is_aal2() TO authenticated;

/*
* public.is_super_admin
* Tarkistaa, onko käyttäjä super-admin (rooli JWT:ssä ja MFA käytössä)
*/
CREATE OR REPLACE FUNCTION public.is_super_admin() RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = '','public'
AS $$
DECLARE
    is_super_admin boolean;
BEGIN
    IF NOT public.is_aal2() THEN
        RETURN false;
    END IF;
    SELECT (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'super-admin' INTO is_super_admin;
    RETURN coalesce(is_super_admin, false);
END
$$;

-- Oikeus funktioon vain kirjautuneille käyttäjille
GRANT EXECUTE ON FUNCTION public.is_super_admin() TO authenticated;

/*
* public.is_mfa_compliant
* Tarkistaa, täyttääkö käyttäjä MFA-vaatimukset:
* Jos käyttäjällä on MFA käytössä, vaaditaan AAL2, muuten riittää AAL1/AAL2.
*/
CREATE OR REPLACE FUNCTION public.is_mfa_compliant() RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = '','public'
AS $$
BEGIN
    RETURN array[(SELECT auth.jwt()->>'aal')] <@ (
        SELECT CASE
            WHEN COUNT(id) > 0 THEN array['aal2']
            ELSE array['aal1', 'aal2']
        END AS aal
        FROM auth.mfa_factors
        WHERE ((SELECT auth.uid()) = auth.mfa_factors.user_id) AND auth.mfa_factors.status = 'verified'
    );
END
$$;

-- Oikeus funktioon vain kirjautuneille käyttäjille
GRANT EXECUTE ON FUNCTION public.is_mfa_compliant() TO authenticated;

-- MFA-rajoitukset:
-- Seuraavat politiikat rajoittavat pääsyä tauluihin, jos käyttäjällä on MFA käytössä.
-- Jos käyttäjällä ei ole MFA:ta, oletuskäyttäytyminen säilyy (ei rajoitusta).

-- Rajoita pääsy tileihin, jos MFA on käytössä
CREATE POLICY restrict_mfa_accounts
    ON public.accounts
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy jäsenyyksiin, jos MFA on käytössä
CREATE POLICY restrict_mfa_accounts_memberships
    ON public.accounts_memberships
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy tilauksiin, jos MFA on käytössä
CREATE POLICY restrict_mfa_subscriptions
    ON public.subscriptions
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy tilausriveihin, jos MFA on käytössä
CREATE POLICY restrict_mfa_subscription_items
    ON public.subscription_items
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy roolien oikeuksiin, jos MFA on käytössä
CREATE POLICY restrict_mfa_role_permissions
    ON public.role_permissions
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy kutsuihin, jos MFA on käytössä
CREATE POLICY restrict_mfa_invitations
    ON public.invitations
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy tilauksiin, jos MFA on käytössä
CREATE POLICY restrict_mfa_orders
    ON public.orders
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy tilausriveihin, jos MFA on käytössä
CREATE POLICY restrict_mfa_order_items
    ON public.order_items
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());

-- Rajoita pääsy ilmoituksiin, jos MFA on käytössä
CREATE POLICY restrict_mfa_notifications
    ON public.notifications
    AS RESTRICTIVE
    TO authenticated
    USING (public.is_mfa_compliant());