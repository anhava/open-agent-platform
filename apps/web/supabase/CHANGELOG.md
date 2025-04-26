# Supabase Skeeman Muutosloki (Kehityksen Aikana)

Tämä tiedosto seuraa merkittäviä muutoksia ja parannuksia, jotka on tehty `apps/web/supabase/schema/*.sql` -tiedostoihin tämän kehityssession aikana. **Tämä EI korvaa virallista `migrations`-kansion historiaa**, vaan toimii muistiinpanona tehdyistä päätöksistä ennen ensimmäisen virallisen migraation (`0000_initial_schema.sql`) luontia.

## [Päivämäärä Tähän]

*   **Yleistä:**
    *   Päätettiin jakaa alkuperäinen laaja skeema loogisiin osiin `schema/` -kansioon (`00-*`, `01-*`, jne.).
    *   Päätettiin poistaa vanhat, epäjohdonmukaiset tiedostot `migrations/`-kansiosta ja luoda puhdas alkumigraatio myöhemmin.
*   **`00-privileges.sql`:**
    *   Tarkistettu ja todettu hyväksi. Noudattaa hyviä turvallisuuskäytäntöjä (oletusoikeuksien poisto, `kit`-skeema).
*   **`01-enums.sql`:**
    *   Kommentit käännetty suomeksi, Makerkit-viittaukset poistettu.
    *   Lisätty `app_permissions` ENUMiin `chatbots.manage`.
    *   Rajattu `billing_provider` ENUM sisältämään vain `stripe` (toistaiseksi).
    *   Lisätty `message_sender_type` ENUM (`user`, `ai`, `agent`).
    *   Parannettu ENUMien luontilogiikkaa (`DO $$ ... IF NOT EXISTS ...`).
*   **`02-config.sql`:**
    *   Kommentit käännetty suomeksi, Makerkit-viittaukset poistettu.
    *   Varmistettu `config`-taulun INSERT-lauseen idempotenssi (`DO $$`).
    *   Parannettu funktioiden (`get_config`, `is_set`, `trigger_set_timestamps`, `trigger_set_user_tracking`) määrittelyjä (`SECURITY DEFINER`, `search_path`, `STABLE`).
    *   Lisätty `noEmit: true` `turbo/generators/tsconfig.json` tiedostoon (ei liity suoraan tähän, mutta tehtiin samassa yhteydessä).
*   **`03-accounts.sql`:**
    *   Analysoitu rakenne (taulu, funktiot, triggerit, RLS).
    *   **Tärkein puute:** Yleiset triggerit (`trigger_set_timestamps`, `trigger_set_user_tracking`) tulee liittää `accounts`-tauluun `CREATE TRIGGER`-lausekkeilla.
    *   Muita parannusehdotuksia (kommentit, funktion määrittelyt) annettu, mutta toteutus epäonnistui editorin rajoitusten vuoksi.
    *   Keskusteltu onboarding-prosessin parantamisesta UI-tasolla hyödyntäen olemassa olevaa skeemaa.
*   **`04-roles.sql`:**
    *   Kommentit käännetty ja selkeytetty.
    *   RLS-politiikka (`Kirjautuneet käyttäjät voivat lukea roolit`) lisätty tiedostoon selkeyden vuoksi.
*   **`05-memberships.sql`:**
    *   Analysoitu rakenne (taulu, triggerit, funktiot, RLS).
    *   **Parannusehdotukset (toteutus editorilla epäonnistui):**
        *   Kommenttien kääntö ja siivous.
        *   Yleisten triggerien (`timestamps`, `user_tracking`) liittäminen `accounts_memberships`-tauluun.
        *   Funktioiden määrittelyjen tarkennus (`SECURITY DEFINER/INVOKER`, `search_path`).
        *   `is_team_member`-funktion yksinkertaistus.
        *   Duplikaatti-RLS-politiikkojen (`roles_read`, `accounts_read`) poisto.
        *   Puuttuvan `UPDATE`-politiikan (`accounts_memberships_update_role`) lisääminen.
*   **`06-roles-permissions.sql`:**
    *   Kommentit käännetty ja siivottu.
    *   Parannettu funktioiden (`has_permission`, `has_more_elevated_role`, `has_same_role_hierarchy_level`) määrittelyjä (`SECURITY DEFINER`, `STABLE`, `search_path`).
    *   Lisätty `ON DELETE CASCADE` `role`-viiteavaimeen `role_permissions`-taulussa.
    *   Varmistettu RLS-politiikan olemassaolo ja selkeys.
    *   Korjattu `has_permission`-funktion parametrien nimet takaisin muotoon `user_id` ja `account_id` (aiemmin virheellisesti `target_*`).
*   **`07-invitations.sql`:**
    *   Kommentit käännetty ja selkeytetty.
    *   Muutettu `invitations.id` tyypiksi `UUID`.
    *   Lisätty triggerit aikaleimoille ja käyttäjäseurannalle.
    *   Parannettu funktioiden (`accept_invitation`, `create_invitation`, `get_account_invitations`, `add_invitations_to_account`) määrittelyjä ja logiikkaa (`SECURITY DEFINER/INVOKER`, `search_path`).
    *   Lisätty indeksi `invite_token`-sarakkeelle.
    *   Selkeytetty RLS-politiikkojen nimiä ja varmistettu niiden logiikka.
*   **`08-billing-customers.sql`:**
    *   Kommentit käännetty ja selkeytetty.
    *   Muutettu `id`-sarakkeen tyyppi `UUID`:ksi.
    *   Lisätty aikaleima- ja käyttäjäseurantakentät ja niitä päivittävät triggerit.
    *   Lisätty `UNIQUE`-rajoite ja indeksi `(provider, customer_id)` -parille.
    *   Tarkennettu `SELECT` RLS-politiikkaa.
*   **`09-subscriptions.sql`:**
    *   (Ei vielä käsitelty tässä sessiossa)
*   **`10-orders.sql`:**
    *   Kommentit käännetty ja selkeytetty.
    *   Lisätty aikaleima- ja käyttäjäseurantakentät ja triggerit `orders`- ja `order_items`-tauluihin.
    *   Korjattu `orders.billing_customer_id` viittaamaan `billing_customers.id` (UUID) ja `ON DELETE SET NULL`.
    *   Lisätty `CHECK`-rajoitteita (`total_amount`, `price_amount`, `quantity`).
    *   Selkeytetty RLS-politiikkojen nimiä ja tarkennettu logiikkaa.
    *   Parannettu `upsert_order`-funktion logiikkaa ja muuttujien nimiä.
*   **`11-notifications.sql`:**
    *   Kommentit käännetty.
    *   Muutettu `id`-sarakkeen tyyppi `UUID`:ksi.
    *   Sallittu `account_id` olla `NULL` ja päivitetty RLS/indeksi vastaavasti.
    *   Lisätty aikaleima- ja käyttäjäseurantakentät ja triggerit.
    *   Parannettu `kit.update_notification_dismissed_status`-triggerin logiikkaa.
    *   Yhdistetty RLS-politiikat (`FOR ALL`).
*   **`12-one-time-tokens.sql`:**
    *   Kommentit käännetty.
    *   Lisätty aikaleima- ja käyttäjäseurantakentät ja triggerit `nonces`-tauluun.
    *   Lisätty indeksi `client_token`-sarakkeelle.
    *   Parannettu funktioiden määrittelyjä (`SECURITY DEFINER`, `STABLE`, `search_path`).
    *   Parannettu `create_nonce`, `verify_nonce` ja `revoke_nonce` funktioiden logiikkaa ja virheenkäsittelyä.
    *   Selkeytetty RLS- ja GRANT-lausekkeita. 