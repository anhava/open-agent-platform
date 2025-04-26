/*
 * -------------------------------------------------------
 * Osa: Laskutusasiakkaat (Billing Customers)
 * Linkittää sovelluksen tilit (accounts) ulkoisen laskutusjärjestelmän (esim. Stripe)
 * asiakastietueisiin.
 * -------------------------------------------------------
 */

-- Taulu: public.billing_customers
CREATE TABLE IF NOT EXISTS public.billing_customers (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(), -- Muutettu UUID:ksi
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    provider public.billing_provider NOT NULL, -- Mikä laskutusjärjestelmä (ENUM)
    customer_id TEXT NOT NULL, -- Asiakkaan ID laskutusjärjestelmässä
    email TEXT, -- Asiakkaan sähköposti laskutusjärjestelmässä (voi erota tilin emailista)
    -- Automaattiset aikaleimat ja käyttäjäseuranta
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    -- Varmistaa, ettei samaa tiliä voi linkittää samaan asiakkaaseen samalla providerilla useasti
    UNIQUE (account_id, provider),
    -- Varmistaa, että providerin asiakas-ID on uniikki (yleensä näin on)
    UNIQUE (provider, customer_id) 
);

COMMENT ON TABLE public.billing_customers IS 'Linkittää sovelluksen tilit ulkoisten laskutusjärjestelmien asiakkaisiin.';
COMMENT ON COLUMN public.billing_customers.account_id IS 'Tili, johon laskutusasiakas liittyy.';
COMMENT ON COLUMN public.billing_customers.provider IS 'Laskutusjärjestelmän tarjoaja (esim. stripe).';
COMMENT ON COLUMN public.billing_customers.customer_id IS 'Asiakkaan tunniste ulkoisessa laskutusjärjestelmässä.';
COMMENT ON COLUMN public.billing_customers.email IS 'Asiakkaan sähköposti laskutusjärjestelmässä.';

-- Indeksit
CREATE INDEX IF NOT EXISTS ix_billing_customers_account_id ON public.billing_customers (account_id);
-- Lisätty indeksi provider + customer_id -parille webhookien käsittelyä varten
CREATE INDEX IF NOT EXISTS ix_billing_customers_provider_customer_id ON public.billing_customers (provider, customer_id);

-- Oikeudet
-- service_role tarvitsee täydet oikeudet webhookien ja palvelinlogiikan kautta tapahtuvaan hallintaan.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.billing_customers TO service_role;
-- Kirjautuneet käyttäjät saavat lukea omiin tileihinsä liittyviä tietoja (RLS rajoittaa).
GRANT SELECT ON TABLE public.billing_customers TO authenticated;

-- Triggerit
-- Aseta aikaleimat automaattisesti
DROP TRIGGER IF EXISTS set_billing_customers_timestamps ON public.billing_customers;
CREATE TRIGGER set_billing_customers_timestamps
  BEFORE INSERT OR UPDATE ON public.billing_customers
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamps();

-- Aseta käyttäjäseuranta automaattisesti (jos service_role tekee muutoksia, tämä voi olla NULL)
DROP TRIGGER IF EXISTS set_billing_customers_user_tracking ON public.billing_customers;
CREATE TRIGGER set_billing_customers_user_tracking
  BEFORE INSERT OR UPDATE ON public.billing_customers
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_user_tracking();

-- RLS: public.billing_customers
ALTER TABLE public.billing_customers ENABLE ROW LEVEL SECURITY;

-- Poistetaan vanha politiikka
DROP POLICY IF EXISTS billing_customers_read_self ON public.billing_customers;
DROP POLICY IF EXISTS "Käyttäjä voi lukea oman tilin laskutusasiakastiedot" ON public.billing_customers;

-- SELECT: Käyttäjä voi lukea laskutusasiakastiedot tileiltä, joissa hän on jäsen tai jotka ovat hänen henkilökohtaisia tilejään.
CREATE POLICY "Käyttäjä voi lukea oman tilin laskutusasiakastiedot" ON public.billing_customers
  FOR SELECT TO authenticated USING (
    (account_id = auth.uid() AND EXISTS (SELECT 1 FROM public.accounts a WHERE a.id = account_id AND a.is_personal_account = true)) OR -- Oma henkilökohtainen tili
    (public.has_role_on_account(account_id)) -- Tai on jäsen tilillä
  );
-- HUOM: INSERT/UPDATE/DELETE on rajattu service_rolelle GRANT-tasolla, 
-- joten niille ei välttämättä tarvita erillisiä RLS-politiikkoja tässä vaiheessa, 
-- ellei haluta antaa kirjautuneille käyttäjille oikeuksia esim. päivittää sähköpostia.
