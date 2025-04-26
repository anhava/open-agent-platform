# Aihio AI Agent Platform - Kehityssuunnitelma

Tämä dokumentti sisältää priorisoidun listan tehtävistä, jotka tarvitaan Aihio AI Agent Platform -projektin viemiseksi tuotantovalmiiksi.

## 1. Korkean prioriteetin tehtävät

### Perusarkkitehtuuri ja infrastruktuuri
- [ ] LangGraph.js-integraation täydentäminen
- [ ] Tietokantarakenteen toteuttaminen (katso tuotantovalmis tietokantastrategia alla)
  - [ ] Käyttäjähallinta ja autentikaatio
  - [ ] Agenttien tallennusjärjestelmä
  - [ ] Keskusteluhistorian tallentaminen
- [ ] Ympäristömuuttujien konfiguraation viimeistely
- [ ] LangSmith-integraatio kehityksen monitorointiin

### Agentit
- [ ] Agenttien StateGraph-rakenteen standardointi
- [ ] Agentin konfiguraatioiden hallintajärjestelmän parantaminen
- [ ] Työkaluintegraation (tools) laajentaminen
- [ ] Human-in-the-loop -toiminnallisuuden implementointi

### RAG-toiminnallisuus
- [ ] Pinecone-vektoritietokannan käyttöönotto matalan latenssin hakua varten
- [ ] Hakutoiminnallisuuden optimointi
- [ ] Kontekstin hallinta ja rajaus

## 2. Keskitason prioriteetin tehtävät

### Käyttöliittymä
- [ ] Agenttien luomiskäyttöliittymän parantaminen
- [ ] Visuaalisen graafimuokkaimen kehittäminen
- [ ] Keskusteluliittymän responsiivisuuden optimointi
- [ ] Teemoituksen ja visuaalisen ilmeen yhtenäistäminen

### Monitorointi ja analytiikka
- [ ] Agenttien suorituskyvyn seurantajärjestelmä
- [ ] Käyttöstatistiikan keräys ja visualisointi
- [ ] Virhetilanteiden kirjaaminen ja ilmoitusjärjestelmä

### Testaus ja laatujärjestelmä
- [ ] Yksikkötestauksen käyttöönotto
- [ ] Integraatiotestit avainominaisuuksille
- [ ] Suorituskykytestien implementointi

## 3. Alemman prioriteetin tehtävät

### Multi-agent -järjestelmät
- [ ] Agenttien välisen kommunikaation implementointi
- [ ] Erikoistuneiden agenttien luominen eri tehtäville
- [ ] Agenttien yhteistyöjärjestelmän kehittäminen

### Liiketoimintaominaisuudet
- [ ] Käyttörajoitusten ja kiintiöiden hallintajärjestelmä
- [ ] Whitelabel-ratkaisun kehittäminen
- [ ] Laskutusjärjestelmän integrointi

### Dokumentaatio ja käyttöönotto
- [ ] Kehittäjädokumentaation kirjoittaminen
- [ ] Käyttöohjeiden laatiminen
- [ ] Malliagenttien luominen eri käyttötapauksille

## 4. Jatkuva kehitys

### Suorituskyvyn optimointi
- [ ] Keskustelujen latenssin minimointi
- [ ] Muistinkäytön optimointi pitkissä keskusteluissa
- [ ] Välimuistijärjestelmän kehittäminen

### Uudet ominaisuudet
- [ ] Agentin persoonallisuusasetusten kehittäminen
- [ ] Tuettujen kielten laajentaminen
- [ ] Käyttäytymisdatan kerääminen agenttien parantamiseksi

## Välittömät seuraavat askeleet

1. Tarkistaa nykyinen LangGraph.js-integraatio ja varmistaa yhteensopivuus uusimman version kanssa
2. Toteuttaa tuotantovalmis tietokantaratkaisu Supabase + Pinecone -yhdistelmällä
3. Määritellä agenttien konfiguraatiomalli ja tallennusjärjestelmä
4. Kehittää prototyyppi parannetusta chat-käyttöliittymästä streamaus-tuella
5. Optimoida RAG-hakujärjestelmä matalan latenssin vaatimuksiin upotetuille chatboteille

## Tuotantovalmis tietokantastrategia (Päivitetty: pgvector)

Koska rakennamme tuotantovalmista palvelua, jossa käyttäjät upottavat chatbot-widgetin verkkosivuilleen, tarvitsemme alusta asti matalan latenssin ratkaisun. Tässä on suunnitelma tuotantovalmiin tietokantastrategian toteuttamiseksi.

### Tietokantaratkaisut

#### Relaatiotietokanta: Supabase

Supabase toimii ensisijaisena tietokantana seuraaville:
- Käyttäjähallinta ja autentikaatio
- Agenttien konfiguraatiot ja metatiedot
- Keskusteluhistoria ja analytiikka

**Edut Supabasessa:**
- Valmis autentikaatiojärjestelmä
- Hyvät React/Next.js-integrointikirjastot
- Realtime-tuki keskustelujen päivityksiin
- Helppo käyttöönotto ja skaalaus

#### Vektoritietokanta: Supabase (pgvector)

Supabase (PostgreSQL) käyttäen `pgvector`-laajennusta toimii vektoritietokantana RAG-toiminnallisuudelle:
- Dokumenttien vektorisointi ja tallennus `documents`-tauluun.
- Semanttinen samankaltaisuushaku `pgvector`-funktioilla.
- Metatietosuodattimet asiakaskohtaiseen sisältöön suoraan SQL-kyselyissä.

**Miksi pgvector + Supabase:**
- Yksinkertaisempi arkkitehtuuri (ei erillistä palvelua).
- Yhtenäinen datan hallinta ja RLS-tuki.
- Mahdollisuus transaktioihin relaatio- ja vektoridatan välillä.
- Hyvä lähtökohta, skaalautuvuutta voidaan arvioida myöhemmin.

### Toteutussuunnitelma (1-3 kk) (Päivitetty: pgvector)

1. **Tietokantarakenteen käyttöönotto:**
   - [ ] Supabasen asennus ja konfigurointi
     - [ ] Auth-järjestelmän käyttöönotto
     - [ ] Relaatiotietokantataulujen luominen (chatbots, conversations, messages)
     - [ ] `pgvector`-laajennuksen aktivointi Supabasessa (`CREATE EXTENSION IF NOT EXISTS vector;`)
     - [ ] `documents`-taulun luominen `vector`-tyypin sarakkeella.
     - [ ] Indeksien luominen `documents`-tauluun (esim. HNSW tai IVFFlat).

2. **Integrointirakenne:**
   - [ ] Toteuta tietokanta-abstraktion kerros (jos halutaan, ei pakollinen pgvectorin kanssa)
   ```typescript
   // Tietokanta-abstraktion kerros (Esimerkki, voidaan myös käyttää suoraan Supabase-clientia)
   interface DatabaseProvider { /* ... */ }
   interface VectorDatabaseProvider { /* ... */ }

   // Implementaatiot
   class SupabaseProvider implements DatabaseProvider, VectorDatabaseProvider {
     // ...implementaatio pgvector-hauille ja muille operaatioille
     // Käyttää @aihio/supabase-pakettia
   }
   ```

3. **Ympäristömuuttujien konfigurointi:**
   ```typescript
   // Aihio AI tuotantokonfiguraatio (pgvector)
   SUPABASE_URL=xxx
   SUPABASE_SERVICE_ROLE_KEY=xxx // Tarvitaan palvelinpuolen operaatioihin
   OPENAI_API_KEY=xxx // Tarvitaan edelleen dokumenttien upotukseen
   ```

### Erityishuomiot matalan latenssin widgetejä varten (Päivitetty: pgvector)

1. **Indeksioptimointi (`pgvector`):**
   - [ ] Valitse sopiva `pgvector`-indeksityyppi (HNSW yleensä hyvä kompromissi nopeuden ja tarkkuuden välillä).
   - [ ] Määritä indeksin parametrit (esim. `hnsw.ef_construction`, `hnsw.m`, `ivfflat.probes`) datan koon ja hakutarpeiden mukaan.
   - [ ] Suunnittele optimaalinen metadatarakenne `documents`-tauluun tehokasta SQL `WHERE`-suodatusta varten.

2. **Välimuististrategia:**
   - [ ] Toteuta sovellustason välimuisti usein käytetyille samankaltaisuushakutuloksille (jos tarpeen).

3. **Latenssin minimointi:**
   - [ ] Optimoi SQL-kyselyt, jotka sisältävät vektorihakuja ja metadatasuodatusta.
   - [ ] Varmista, että Supabase-instanssi on riittävän tehokas odotetulle kuormalle.

4. **Skaalautuvuustestaus:**
   - [ ] Testaa järjestelmää odotetulla kuormituksella.
   - [ ] Mittaa hakujen vasteaikoja eri metadatasuodattimilla.
   - [ ] Varmista tavoitevasteajat (esim. alle 200ms 95% hauista).

### Koodiesimerkki RAG-hakutoteutuksesta (Päivitetty: pgvector + Langchain)

```typescript
import { SupabaseClient } from '@supabase/supabase-js';
import { Document } from 'langchain/document';
import { OpenAIEmbeddings } from '@langchain/openai'; // Korjattu importti
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { supabaseAdmin } from '@aihio/supabase/server-admin-client'; // Oletetaan admin-client palvelinpuolelle

// Dokumenttien lisääminen Supabaseen (pgvector)
export const addDocumentsToSupabase = async (
  documents: Document[],
  customerId: string, // Käytetään metadatana
  chatbotId: string // Linkitetään chatbottiin
) => {
  // Varmista, että dokumenteilla on metadata
  const processedDocs = documents.map(doc => ({
    ...doc,
    metadata: {
      ...doc.metadata,
      customerId, // Asiakkaan tunnus
      chatbotId, // Chatbotin tunnus
      source: doc.metadata.source || 'unknown', // Varmistetaan lähde
    }
  }));

  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
    openAIApiKey: process.env.OPENAI_API_KEY, // Tarvitaan upotusten luontiin
  });

  await SupabaseVectorStore.fromDocuments(
    processedDocs,
    embeddings,
    {
      client: supabaseAdmin, // Käytä admin-clientia palvelinpuolella
      tableName: 'documents', // Oletettu taulun nimi
      queryName: 'match_documents' // Oletettu Supabasen RPC-funktion nimi
    }
  );
};

// Matalan latenssin hakufunktio Supabasesta (pgvector)
export const performSemanticSearch = async (
  query: string,
  customerId: string,
  chatbotId: string,
  k: number = 5
) => {
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-small",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseAdmin, // Käytä admin-clientia
    tableName: 'documents',
    queryName: 'match_documents',
    // Suodatus tapahtuu Langchainin avulla metadatan perusteella
    filter: {
        customerId: customerId,
        chatbotId: chatbotId
    }
  });

  // Hae samankaltaiset dokumentit
  const results = await vectorStore.similaritySearch(query, k);
  
  return results;
};
```

Tämä tuotantovalmis strategia on suunniteltu upotettavien chatbot-widgettien tarpeisiin, joissa latenssi on kriittinen tekijä käyttökokemuksen kannalta. Supabase ja Pinecone -yhdistelmä tarjoaa optimaalisen tasapainon suorituskyvyn, skaalautuvuuden ja helppokäyttöisyyden välillä.

# Aihio AI Dashboard - Tehtävälista

## Vaihe 1: Perusrakenne ja Layout

- [ ] Luo hakemistorakenne: `apps/web/src/app/dashboard`
- [ ] Luo `dashboard/layout.tsx`:
    - [ ] Toteuta peruslayout (esim. käyttäen `@aihio/ui/Shell` tai vastaavaa)
    - [ ] Sisällytä sivupalkki navigointilinkeillä (ainakin "Chatbotit")
    - [ ] Määrittele pääsisältöalue lapsikomponenteille (`children`)
- [ ] Luo `dashboard/page.tsx` oletussivuksi (voi olla tyhjä tai näyttää perustietoja)
- [ ] Luo `middleware.ts` `apps/web`-kansioon (jos ei jo olemassa)
- [ ] Toteuta autentikoinnin tarkistus middlewaressa `/dashboard/*`-reiteille käyttäen `@supabase/ssr` ja `@aihio/supabase/middleware-client`.

## Vaihe 2: Chatbottien listausnäkymä

- [ ] Luo hakemistorakenne: `apps/web/src/app/dashboard/chatbots`
- [ ] Luo `dashboard/chatbots/page.tsx`:
    - [ ] Tee siitä `async` Server Component.
    - [ ] Hae käyttäjän chatbotit palvelimella käyttäen `@aihio/supabase/server-component-client`.
    - [ ] Luo `ChatbotList`-asiakaskomponentti (`"use client"`) näyttämään haetut chatbotit.
    - [ ] Käytä `@aihio/ui/Table` tai korttikomponentteja listan esittämiseen.
    - [ ] Lisää "Luo uusi chatbot" -painike (`@aihio/ui/Button` + `next/link`), joka vie `/dashboard/chatbots/new` -reittiin.
    - [ ] Lisää toiminnallisuus chatbotin valintaan (linkki `/dashboard/chatbots/[chatbotId]`)

## Vaihe 3: Uuden Chatbotin Luontilomake

- [ ] Luo hakemistorakenne: `apps/web/src/app/dashboard/chatbots/new`
- [ ] Luo `dashboard/chatbots/new/page.tsx`:
    - [ ] Luo `CreateChatbotForm`-asiakaskomponentti (`"use client"`).
    - [ ] Käytä `react-hook-form` ja `zod` lomakkeen hallintaan ja validointiin.
    - [ ] Käytä `@aihio/ui`-komponentteja lomakekentil
    - [ ] Luo Server Action (`actions.ts` tiedostoon tai suoraan komponenttiin `"use server"`-direktiivillä) chatbotin luomiseksi.
        - [ ] Action käyttää `@aihio/supabase/server-actions-client` tietojen tallentamiseen.
    - [ ] Yhdistä lomakkeen `onSubmit` Server Actioniin.
    - [ ] Käsittele onnistunut luonti (esim. uudelleenohjaus listanäkymään, notifikaatio).
    - [ ] Käsittele virheet (esim. virheilmoitukset lomakkeessa).

## Vaihe 4: Chatbotin Muokkausnäkymä

- [ ] Luo dynaaminen reitti: `apps/web/src/app/dashboard/chatbots/[chatbotId]`
- [ ] Luo `dashboard/chatbots/[chatbotId]/page.tsx`:
    - [ ] Tee siitä `async` Server Component.
    - [ ] Hae chatbotin tiedot ID:n perusteella palvelimella (`params.chatbotId`).
    - [ ] Luo `EditChatbotForm`-asiakaskomponentti (`"use client"`).
    - [ ] Esitäytä lomake haetuilla tiedoilla.
    - [ ] Toteuta lomake vastaavasti kuin `CreateChatbotForm` (RHF, Zod, @aihio/ui).
    - [ ] Luo Server Action chatbotin päivittämiseksi.
    - [ ] Yhdistä lomakkeen `onSubmit` päivitys-Server Actioniin.
    - [ ] Käsittele onnistuminen ja virheet.

## Vaihe 5: Lisäominaisuudet (Tulevaisuudessa)

- [ ] Integroi vektoritietokannan konfigurointi lomakkeisiin (esim. `pgvector` asetukset tai Pinecone API-avain).
- [ ] Toteuta RAG-datalähteiden liittäminen chatbotteihin (UI ja Server Actions).
- [ ] Toteuta työkalujen liittäminen chatbotteihin (UI ja Server Actions).
- [ ] Lisää reaaliaikaiset päivitykset listanäkymään Supabase Realtime -avulla.
- [ ] Lisää chatbotin avatar-kuvan lataus Supabase Storageen.
- [ ] Viimeistele ja hio käyttöliittymä ja käyttökokemus. 