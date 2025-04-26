/*
 * -------------------------------------------------------
 * Osa: Roolit (Roles)
 * Määrittelee sovelluksessa käytettävät käyttäjäroolit ja niiden hierarkian.
 * Roolit liittyvät tileihin (accounts) jäsenyyksien (memberships) kautta.
 * -------------------------------------------------------
 */

-- Taulu: public.roles
CREATE TABLE IF NOT EXISTS public.roles (
    name VARCHAR(50) NOT NULL PRIMARY KEY, -- Roolin uniikki nimi (esim. 'owner', 'admin', 'member')
    hierarchy_level INT NOT NULL UNIQUE CHECK (hierarchy_level > 0) -- Taso hierarkiassa (pienempi = korkeampi oikeus), uniikki
);

COMMENT ON TABLE public.roles IS 'Määrittelee tilien sisällä käytettävät roolit ja niiden hierarkiatason.';
COMMENT ON COLUMN public.roles.name IS 'Roolin uniikki nimi.';
COMMENT ON COLUMN public.roles.hierarchy_level IS 'Roolin taso hierarkiassa (1 = korkein). Käytetään oikeuksien vertailuun.';

-- Oikeudet: Myönnetään lukuoikeus rooleihin
-- Huom: INSERT/UPDATE/DELETE pitäisi rajoittaa esim. vain palvelinroolille tai migraatioille.
GRANT SELECT ON TABLE public.roles TO authenticated, service_role;

-- RLS: public.roles
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Poistetaan vanha politiikka varmuuden vuoksi
DROP POLICY IF EXISTS "Kirjautuneet käyttäjät voivat lukea roolit" ON public.roles;

-- RLS-politiikka: Sallitaan kaikkien kirjautuneiden käyttäjien lukea käytettävissä olevat roolit.
CREATE POLICY "Kirjautuneet käyttäjät voivat lukea roolit" ON public.roles
  FOR SELECT TO authenticated USING (true);