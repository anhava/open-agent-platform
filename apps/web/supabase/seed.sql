-- apps/web/supabase/seed.sql
-- Tämä tiedosto sisältää SQL-lausekkeet, jotka ajetaan `supabase db reset` -komennon jälkeen.
-- Käytä tätä lisätäksesi testidataa tai alustavia perustietoja paikalliseen kehitystietokantaan.
-- ÄLÄ laita tänne salasanoja tai arkaluonteista dataa!

-- Esimerkki: Lisätään oletustyökaluja (jos tools-taulu on luotu)
-- INSERT INTO public.tools (name, description, schema) VALUES
--  ('web_search', 'Etsii tietoa verkosta.', '{ "type": "object", "properties": { "query": { "type": "string" } } }'),
--  ('calculator', 'Suorittaa matemaattisia laskutoimituksia.', '{ "type": "object", "properties": { "expression": { "type": "string" } } }');

-- Esimerkki: Lisätään testikäyttäjä (huom: vaatii käyttäjän luonnin myös Auth-puolella)
-- INSERT INTO public.profiles (id, username) VALUES ('uuid-of-test-user', 'testuser'); 