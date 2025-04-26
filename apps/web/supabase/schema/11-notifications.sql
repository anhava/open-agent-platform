/**
 * -------------------------------------------------------
 * Section: Notifications
 * We create the schema for the notifications. Notifications are the notifications for an account.
 * -------------------------------------------------------
 */

-- ENUMit ilmoitusten kanavalle ja tyypille
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_channel') THEN
        CREATE TYPE public.notification_channel AS ENUM('in_app', 'email');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type') THEN
        CREATE TYPE public.notification_type AS ENUM('info', 'warning', 'error');
    END IF;
END$$;

-- Taulu: public.notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT extensions.uuid_generate_v4(), -- Muutettu UUID:ksi
    -- account_id voi olla NULL järjestelmänlaajuisille ilmoituksille
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE, 
    type public.notification_type NOT NULL DEFAULT 'info',
    body TEXT NOT NULL CHECK (char_length(body) > 0), -- Käytetään TEXT tyyppiä
    link VARCHAR(2048), -- Pidennetty URL-kenttää
    channel public.notification_channel NOT NULL DEFAULT 'in_app',
    dismissed BOOLEAN NOT NULL DEFAULT false,
    expires_at TIMESTAMPTZ DEFAULT (now() + interval '1 month'),
    -- Automaattiset aikaleimat ja käyttäjäseuranta
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    -- Huom: created_by/updated_by voivat olla NULL, jos service_role luo ilmoituksen
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL 
);

COMMENT ON TABLE public.notifications IS 'Sovelluksen ilmoitukset tileille tai kaikille käyttäjille.';
COMMENT ON COLUMN public.notifications.account_id IS 'Tili, jolle ilmoitus on kohdistettu (NULL = kaikille).';
COMMENT ON COLUMN public.notifications.type IS 'Ilmoituksen tyyppi (info, warning, error).';
COMMENT ON COLUMN public.notifications.body IS 'Ilmoituksen sisältöteksti.';
COMMENT ON COLUMN public.notifications.link IS 'URL-linkki, johon ilmoitus voi liittyä.';
COMMENT ON COLUMN public.notifications.channel IS 'Kanava, jota kautta ilmoitus toimitetaan (in_app, email).';
COMMENT ON COLUMN public.notifications.dismissed IS 'Onko käyttäjä kuitannut ilmoituksen luetuksi/hylätyksi?';
COMMENT ON COLUMN public.notifications.expires_at IS 'Ajankohta, jolloin ilmoitus vanhenee (ei välttämättä enää näytetä).';

-- Oikeudet
-- service_role voi hallita kaikkia ilmoituksia.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.notifications TO service_role;
-- Kirjautuneet käyttäjät voivat lukea ja päivittää (kuitata) ilmoituksia (RLS rajoittaa).
GRANT SELECT, UPDATE ON TABLE public.notifications TO authenticated;

-- Realtime (Säilytetään ennallaan)
alter publication supabase_realtime add table public.notifications;

-- Indeksit
-- Optimoitu hakemaan tilin aktiiviset, kuittaamattomat ilmoitukset.
CREATE INDEX IF NOT EXISTS idx_notifications_account_dismissed_expires ON public.notifications (account_id, dismissed, expires_at);
-- Lisätään indeksi yleisille (NULL account_id) ilmoituksille
CREATE INDEX IF NOT EXISTS idx_notifications_general_dismissed_expires ON public.notifications (dismissed, expires_at) WHERE account_id IS NULL;

-- Triggerit
DROP TRIGGER IF EXISTS set_notifications_timestamps ON public.notifications;
CREATE TRIGGER set_notifications_timestamps
  BEFORE INSERT OR UPDATE ON public.notifications
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_timestamps();

-- Käyttäjäseuranta: Huom. service_role voi luoda ilmoituksia ilman auth.uid():tä
DROP TRIGGER IF EXISTS set_notifications_user_tracking ON public.notifications;
CREATE TRIGGER set_notifications_user_tracking
  BEFORE INSERT OR UPDATE ON public.notifications
  FOR EACH ROW EXECUTE PROCEDURE public.trigger_set_user_tracking();

-- Trigger, joka sallii vain 'dismissed'-kentän päivittämisen
DROP TRIGGER IF EXISTS update_notification_dismissed_status ON public.notifications;
CREATE TRIGGER update_notification_dismissed_status 
  BEFORE UPDATE ON public.notifications 
  FOR EACH ROW EXECUTE PROCEDURE kit.update_notification_dismissed_status();

-- Funktio: kit.update_notification_dismissed_status (Kit-skeemassa)
-- Trigger-funktio, varmistaa että vain 'dismissed' päivitetään.
CREATE OR REPLACE FUNCTION kit.update_notification_dismissed_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER -- Voidaan ajaa kutsujan oikeuksin
SET search_path = '','public'
AS $$
BEGIN
    -- Tehdään kopio NEW-objektista ja asetetaan dismissed-arvo vanhasta
    -- jotta voidaan verrata, muuttuiko mikään *muu* kuin dismissed.
    -- Tämä on turvallisempi tapa kuin verrata jokaista kenttää erikseen.
    NEW.dismissed = OLD.dismissed; 
    
    -- Jos NEW (josta dismissed on palautettu vanhaan arvoon) on edelleen erilainen kuin OLD,
    -- tarkoittaa se, että jokin muu kenttä yritti muuttua.
    IF NEW IS DISTINCT FROM OLD THEN
         RAISE EXCEPTION 'Vain ilmoituksen "dismissed"-tilaa voi päivittää.';
    END IF;

    -- Palautetaan alkuperäinen NEW (jossa on käyttäjän lähettämä uusi dismissed-arvo),
    -- koska tarkistus meni läpi (vain dismissed oli muuttumassa).
    RETURN NEW;
END;
$$;

-- RLS: public.notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Poistetaan vanhat politiikat
DROP POLICY IF EXISTS notifications_read_self ON public.notifications;
DROP POLICY IF EXISTS notifications_update_self ON public.notifications;
DROP POLICY IF EXISTS "Käyttäjä voi lukea ja kuitata omat ilmoitukset" ON public.notifications;

-- SELECT & UPDATE: Käyttäjä voi lukea ja päivittää (kuitata) 
--                  - ilmoitukset tileillä, joissa hän on jäsen
--                  - järjestelmänlaajuiset ilmoitukset (account_id IS NULL)
CREATE POLICY "Käyttäjä voi lukea ja kuitata omat ilmoitukset" ON public.notifications
  FOR ALL -- Käytetään ALL, koska UPDATE vaatii saman ehdon USINGille ja WITH CHECKille
  TO authenticated 
  USING (
    (account_id IS NULL) OR -- Yleiset ilmoitukset
    (account_id = auth.uid() AND EXISTS (SELECT 1 FROM public.accounts a WHERE a.id = account_id AND a.is_personal_account = true)) OR -- Oma henkilökohtainen tili
    (public.has_role_on_account(account_id)) -- Tai on jäsen tilillä
  )
  WITH CHECK (
    (account_id IS NULL) OR 
    (account_id = auth.uid() AND EXISTS (SELECT 1 FROM public.accounts a WHERE a.id = account_id AND a.is_personal_account = true)) OR
    (public.has_role_on_account(account_id))
  );
-- HUOM: INSERT on rajattu service_rolelle GRANT-tasolla.