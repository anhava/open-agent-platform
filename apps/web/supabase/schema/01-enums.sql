/*
 * -------------------------------------------------------
 * Osa: Enumeraatiot (ENUMs)
 * Luodaan skeemassa käytettävät ENUM-tyypit.
 * -------------------------------------------------------
 */

/*
* Sovelluksen käyttöoikeudet (app_permissions)
- Määrittelee erilaiset oikeudet, joita rooleilla voi olla sovelluksessa.
- Esimerkkejä: 'roles.manage', 'billing.manage', 'chatbots.manage' jne.
- Lisää tähän sovelluskohtaisia oikeuksia tarpeen mukaan.
*/
-- Varmistetaan, ettei tyyppiä luoda uudelleen, jos se on jo olemassa
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_permissions') THEN
        CREATE TYPE public.app_permissions AS ENUM(
          'roles.manage',       -- Roolien hallinta
          'billing.manage',     -- Laskutuksen hallinta
          'settings.manage',    -- Tilin asetusten hallinta
          'members.manage',     -- Jäsenten hallinta
          'invites.manage',     -- Kutsujen hallinta
          'chatbots.manage'     -- Chatbottien hallinta (Lisätty Aihio AI:lle)
          -- Lisää muita tarvittavia oikeuksia
        );
    END IF;
END$$;

/*
* Tilauksen tila (subscription_status)
- Kuvaa tilauksen eri tiloja (esim. Stripe- tai Lemon Squeezy -tilaus).
*/
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_status') THEN
        CREATE TYPE public.subscription_status AS ENUM(
          'active',             -- Aktiivinen
          'trialing',           -- Kokeilujakso
          'past_due',           -- Maksu myöhässä
          'canceled',           -- Peruutettu (jakson loppuun asti voimassa)
          'unpaid',             -- Maksamaton
          'incomplete',         -- Kesken (vaatii toimenpiteitä)
          'incomplete_expired', -- Kesken ja vanhentunut
          'paused'              -- Pysäytetty
        );
    END IF;
END$$;

/*
* Maksun tila (payment_status)
- Kuvaa yksittäisen maksutapahtuman tilaa.
*/
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status') THEN
        CREATE TYPE public.payment_status AS ENUM(
          'pending',    -- Odottaa
          'succeeded',  -- Onnistunut
          'failed'      -- Epäonnistunut
        );
    END IF;
END$$;

/*
* Laskutuksen tarjoaja (billing_provider)
- Määrittelee tuetut laskutuksen tarjoajat.
- Pidä vain ne, joita Aihio AI aikoo tukea (esim. Stripe).
*/
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'billing_provider') THEN
        CREATE TYPE public.billing_provider AS ENUM(
          'stripe' --, 'lemon-squeezy', 'paddle' -- Poista tai lisää tarpeen mukaan
        );
    END IF;
END$$;

/*
* Tilauksen kohteen tyyppi (subscription_item_type)
- Kuvaa erityyppisiä tilauksen rivejä (esim. kiinteä hinta, per käyttäjä, käytön mukaan).
*/
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'subscription_item_type') THEN
        CREATE TYPE public.subscription_item_type AS ENUM(
          'flat',       -- Kiinteä hinta
          'per_seat',   -- Hinta per käyttäjäpaikka
          'metered'     -- Hinta käytön mukaan
        );
    END IF;
END$$;

/*
* Kutsu (invitation) - TYYPPI, EI ENUM
- Tämä luo komposiittityypin, jota voidaan käyttää esim. funktioiden parametreina/paluuarvoina.
- Sisältää kutsuttavan sähköpostin ja hänelle tarjottavan roolin.
*/
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invitation') THEN
        CREATE TYPE public.invitation AS (email text, role varchar(50));
    END IF;
END$$;

-- Lisätään Chatbot Builderille spesifit ENUMit (kuten aiemmin ehdotettu)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_sender_type') THEN
        -- Luodaan tyyppi aluksi
        CREATE TYPE public.message_sender_type AS ENUM (
          'user',       -- Loppukäyttäjä (widget/dashboard)
          'ai',         -- Tekoäly/Chatbot
          'agent'       -- Ihmisagentti/tukihenkilö (Lisätty)
        );
    ELSE
        -- Lisätään arvo olemassa olevaan tyyppiin, jos se puuttuu
        -- Huom: Tämä vaatii erillisen ALTER TYPE -komennon, 
        --       jota ei voi ajaa ehdollisesti IF NOT EXISTS -lohkossa näin suoraan.
        --       Käytännössä tämä lisätään erillisessä migraatiossa, jos tyyppi on jo olemassa.
        --       Tässä esimerkissä oletetaan, että tyyppi luodaan nyt ensimmäistä kertaa.
        --       Tai jos tyyppi on olemassa, lisätään arvo manuaalisesti tai migraatiolla:
        --       ALTER TYPE public.message_sender_type ADD VALUE IF NOT EXISTS 'agent'; 
        NULL; -- Pidetään tämä lohko tyhjänä schema.sql-tiedostossa
    END IF;
END$$;

-- HUOM: message_type enum poistettu, koska sender_type kattaa saman tarpeen selkeämmin.
-- Jos tarvitaan erottelua AI:n sisäisistä viesteistä (esim. työkalukutsut), 
-- se kannattaa toteuttaa messages.metadata -kentän avulla.