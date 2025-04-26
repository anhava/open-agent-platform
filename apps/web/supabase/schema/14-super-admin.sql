/*
 * -------------------------------------------------------
 * Osa: Super Admin
 * Määrittelee politiikat, jotka sallivat super admin -käyttäjille lukuoikeuden kaikkiin keskeisiin tauluihin
 * -------------------------------------------------------
 */

-- Seuraavat politiikat ovat permissive-tyyppisiä ja sallivat super adminille (is_super_admin())
-- lukuoikeuden (SELECT) kaikkiin tauluihin. Nämä eivät anna muokkausoikeuksia.

-- Super Admin: pääsy accounts-tauluun
CREATE POLICY super_admins_access_accounts
    ON public.accounts
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy accounts_memberships-tauluun
CREATE POLICY super_admins_access_accounts_memberships
    ON public.accounts_memberships
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy subscriptions-tauluun
CREATE POLICY super_admins_access_subscriptions
    ON public.subscriptions
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy subscription_items-tauluun
CREATE POLICY super_admins_access_subscription_items
    ON public.subscription_items
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy invitations-tauluun
CREATE POLICY super_admins_access_invitations
    ON public.invitations
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy orders-tauluun
CREATE POLICY super_admins_access_orders
    ON public.orders
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy order_items-tauluun
CREATE POLICY super_admins_access_order_items
    ON public.order_items
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());

-- Super Admin: pääsy role_permissions-tauluun
CREATE POLICY super_admins_access_role_permissions
    ON public.role_permissions
    AS permissive
    FOR select
    TO authenticated
    USING (public.is_super_admin());