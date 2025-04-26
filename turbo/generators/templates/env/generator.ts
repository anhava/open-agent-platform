import type { PlopTypes } from '@turbo/gen';
import { writeFileSync } from 'node:fs';

// Korjattu polku utils-hakemistoon
import { generator } from '../../utils/index';
import { getTemplate } from '../../utils/index';

const DOCS_URL =
  'https://makerkit.dev/docs/next-supabase-turbo/environment-variables';

// Generaattorin nimi, käytetään komennossa `turbo gen env`
const GENERATOR_NAME = 'env';

/**
 * Luo generaattorin, joka kysyy käyttäjältä ympäristömuuttujien arvoja
 * ja generoi .env.local-tiedoston.
 * @param plop Plop-instanssi.
 */
export function createEnvironmentVariablesGenerator(
  plop: PlopTypes.NodePlopAPI,
): void {
  const allVariables = generator.loadAllEnvironmentVariables('apps/web') as Record<string, string | undefined>;

  if (allVariables && Object.keys(allVariables).length > 0) {
    console.log(
      `Ladattiin ${Object.keys(allVariables).length} oletusarvoa ympäristömuuttujille olemassa olevista .env-tiedostoista. Käytetään näitä oletuksina.`, 
    );
  } else {
    console.log('Ei löydetty olemassa olevia .env-tiedostoja, käytetään tyhjiä oletusarvoja.');
  }

  plop.setGenerator(GENERATOR_NAME, {
    description: 'Generoi ympäristömuuttujatiedoston (.env.local) interaktiivisesti',
    // Kysymykset käyttäjälle
    prompts: [
      // Tähän lisätään kysymykset dokumentaation mukaisille muuttujille
      // Esimerkki:
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_SITE_URL',
        message: `Mikä on sivustosi URL? (Esim. https://aihio.ai). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_SITE_URL')}\n`,
        default: allVariables?.NEXT_PUBLIC_SITE_URL ?? 'https://localhost:3000', // Käytetään ladattua tai oletusarvoa
        validate: (input: string) => input.startsWith('http') || 'URL:n tulee alkaa http:// tai https://'
      },
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_PRODUCT_NAME',
        message: `Mikä on tuotteesi nimi? (Esim. Aihio AI). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_PRODUCT_NAME')}\n`,
        default: allVariables?.NEXT_PUBLIC_PRODUCT_NAME ?? 'Aihio AI',
        validate: (input: string) => input.length > 0 || 'Tuotteen nimi ei voi olla tyhjä'
      },
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_SUPABASE_URL',
        message: `Mikä on Supabase URL? (Projektin asetuksista). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_SUPABASE_URL')}\n`,
        default: allVariables?.NEXT_PUBLIC_SUPABASE_URL ?? '',
        validate: (input: string) => input.startsWith('http') || 'URL:n tulee alkaa http:// tai https://'
      },
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_SUPABASE_ANON_KEY',
        message: `Mikä on Supabase anon key (julkinen avain)? (Projektin asetuksista). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_SUPABASE_ANON_KEY')}\n`,
        default: allVariables?.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
        validate: (input: string) => input.length > 0 || 'Supabase anon key ei voi olla tyhjä'
      },
      {
        type: 'input',
        name: 'values.SUPABASE_SERVICE_ROLE_KEY',
        message: `Mikä on Supabase Service Role Key (salainen avain)? (Projektin asetuksista). \nLisätietoja: ${getUrlToDocs('SUPABASE_SERVICE_ROLE_KEY')}\n`,
        default: '', 
        validate: (input: string) => input.length > 0 || 'Supabase Service Role Key ei voi olla tyhjä'
      },
      // --- Lisätään vanhan projektin kysymykset --- 
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_SITE_TITLE',
        message: `Mikä on sivustosi otsikko (title)? (Esim. Aihio AI - Paras tapa luoda tekoälyratkaisuja). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_SITE_TITLE')}\n`,
        default: allVariables?.NEXT_PUBLIC_SITE_TITLE ?? 'Aihio AI',
      },
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_SITE_DESCRIPTION',
        message: `Mikä on sivustosi kuvaus (meta description)? (Tärkeä SEO:lle). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_SITE_DESCRIPTION')}\n`,
        default: allVariables?.NEXT_PUBLIC_SITE_DESCRIPTION ?? '',
      },
      {
        type: 'list',
        name: 'values.NEXT_PUBLIC_DEFAULT_THEME_MODE',
        message: `Mikä on sivuston oletusteema? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_DEFAULT_THEME_MODE')}\n`,
        choices: ['light', 'dark', 'system'],
        default: allVariables?.NEXT_PUBLIC_DEFAULT_THEME_MODE ?? 'light',
      },
      {
        type: 'input',
        name: 'values.NEXT_PUBLIC_DEFAULT_LOCALE',
        message: `Mikä on sivuston oletuskieli (locale)? (esim. fi, en). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_DEFAULT_LOCALE')}\n`,
        default: allVariables?.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'fi',
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_AUTH_PASSWORD',
        message: `Sallitaanko sähköposti/salasana-kirjautuminen? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_AUTH_PASSWORD')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_AUTH_PASSWORD, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_AUTH_MAGIC_LINK',
        message: `Sallitaanko magic link -kirjautuminen? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_AUTH_MAGIC_LINK')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_AUTH_MAGIC_LINK, false),
      },
      {
        type: 'input',
        name: 'values.CONTACT_EMAIL',
        message: `Mihin sähköpostiosoitteeseen yhteydenottolomakkeen viestit lähetetään? \nLisätietoja: ${getUrlToDocs('CONTACT_EMAIL')}\n`,
        default: allVariables?.CONTACT_EMAIL ?? '',
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_THEME_TOGGLE',
        message: `Näytetäänkö teeman vaihto -painike käyttöliittymässä? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_THEME_TOGGLE')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_THEME_TOGGLE, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_DELETION',
        message: `Sallitaanko henkilökohtaisten tilien poistaminen? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_DELETION')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_DELETION, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_BILLING',
        message: `Otetaanko laskutus käyttöön henkilökohtaisille tileille? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_BILLING')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_BILLING, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS',
        message: `Otetaanko tiimitilit käyttöön? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_DELETION',
        message: `Sallitaanko tiimitilien poistaminen? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_DELETION')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_DELETION, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_BILLING',
        message: `Otetaanko laskutus käyttöön tiimitileille? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_BILLING')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_BILLING, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_CREATION',
        message: `Sallitaanko uusien tiimitilien luominen? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_CREATION')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_CREATION, true),
      },
      {
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_ENABLE_NOTIFICATIONS',
        message: `Otetaanko ilmoitusominaisuus käyttöön (kellokuvake)? \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_ENABLE_NOTIFICATIONS')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_ENABLE_NOTIFICATIONS, true),
      },
      {
        when: (answers: any) => answers.values.NEXT_PUBLIC_ENABLE_NOTIFICATIONS,
        type: 'confirm',
        name: 'values.NEXT_PUBLIC_REALTIME_NOTIFICATIONS',
        message: `Käytetäänkö reaaliaikaisia Supabase-ilmoituksia? (Jos ei, ilmoitukset haetaan tarvittaessa). \nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_REALTIME_NOTIFICATIONS')}\n`,
        default: getBoolean(allVariables?.NEXT_PUBLIC_REALTIME_NOTIFICATIONS, false),
      },
      // NEXT_PUBLIC_ENABLE_VERSION_UPDATER jätetty pois, tarkista tarve
      // --- Vanhan projektin kysymykset päättyvät --- 
      {
        type: 'list',
        name: 'values.NEXT_PUBLIC_BILLING_PROVIDER',
        message: `Mitä laskutuksen tarjoajaa haluat käyttää?\nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_BILLING_PROVIDER')}\n`,
        choices: ['stripe', 'lemon-squeezy'],
        default: allVariables?.NEXT_PUBLIC_BILLING_PROVIDER ?? 'stripe',
      },
      {
        when: (answers: any) => // Add type any for now
          answers.values.NEXT_PUBLIC_BILLING_PROVIDER === 'stripe',
        type: 'input',
        name: 'values.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
        message: `Mikä on Stripe julkinen avain (Publishable Key)?\nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')}\n`,
        default: allVariables?.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
      },
      {
        when: (answers: any) => 
          answers.values.NEXT_PUBLIC_BILLING_PROVIDER === 'stripe',
        type: 'input',
        name: 'values.STRIPE_SECRET_KEY',
        message: `Mikä on Stripe salainen avain (Secret Key)? \nLisätietoja: ${getUrlToDocs('STRIPE_SECRET_KEY')}\n`,
        default: '',
      },
      {
        when: (answers: any) => 
          answers.values.NEXT_PUBLIC_BILLING_PROVIDER === 'stripe',
        type: 'input',
        name: 'values.STRIPE_WEBHOOK_SECRET',
        message: `Mikä on Stripe webhookin salaisuus (Webhook Secret)? \nLisätietoja: ${getUrlToDocs('STRIPE_WEBHOOK_SECRET')}\n`,
        default: '',
      },
      {
        when: (answers: any) =>
          answers.values.NEXT_PUBLIC_BILLING_PROVIDER === 'lemon-squeezy',
        type: 'input',
        name: 'values.LEMON_SQUEEZY_SECRET_KEY',
        message: `Mikä on Lemon Squeezy salainen avain (Secret Key)? \nLisätietoja: ${getUrlToDocs('LEMON_SQUEEZY_SECRET_KEY')}\n`,
        default: '',
      },
      {
        when: (answers: any) =>
          answers.values.NEXT_PUBLIC_BILLING_PROVIDER === 'lemon-squeezy',
        type: 'input',
        name: 'values.LEMON_SQUEEZY_STORE_ID',
        message: `Mikä on Lemon Squeezy kaupan ID (Store ID)? \nLisätietoja: ${getUrlToDocs('LEMON_SQUEEZY_STORE_ID')}\n`,
        default: allVariables?.LEMON_SQUEEZY_STORE_ID ?? '',
      },
      {
        when: (answers: any) =>
          answers.values.NEXT_PUBLIC_BILLING_PROVIDER === 'lemon-squeezy',
        type: 'input',
        name: 'values.LEMON_SQUEEZY_SIGNING_SECRET',
        message: `Mikä on Lemon Squeezy allekirjoituksen salaisuus (Signing Secret)?\nLisätietoja: ${getUrlToDocs('LEMON_SQUEEZY_SIGNING_SECRET')}\n`,
        default: '',
      },
      {
        type: 'input',
        name: 'values.SUPABASE_DB_WEBHOOK_SECRET',
        message: `Mikä on tietokannan webhookin salaisuus (DB Webhook Secret)?\nLisätietoja: ${getUrlToDocs('SUPABASE_DB_WEBHOOK_SECRET')}\n`,
        default: '',
      },
      {
        type: 'list',
        name: 'values.CMS_CLIENT',
        message: `Mitä CMS-asiakasta haluat käyttää?\nLisätietoja: ${getUrlToDocs('CMS_CLIENT')}\n`,
        choices: ['keystatic', 'wordpress'],
        default: allVariables?.CMS_CLIENT ?? 'keystatic',
      },
      {
        type: 'list',
        name: 'values.MAILER_PROVIDER',
        message: `Mitä sähköpostin lähetystarjoajaa haluat käyttää?\nLisätietoja: ${getUrlToDocs('MAILER_PROVIDER')}\n`,
        choices: ['nodemailer', 'resend'],
        default: allVariables?.MAILER_PROVIDER ?? 'nodemailer',
      },
      {
        when: (answers: any) => answers.values.MAILER_PROVIDER === 'resend',
        type: 'input',
        name: 'values.RESEND_API_KEY',
        message: `Mikä on Resend API-avain?\nLisätietoja: ${getUrlToDocs('RESEND_API_KEY')}\n`,
        default: '',
      },
      {
        type: 'input',
        name: 'values.EMAIL_SENDER',
        message: `Mikä on sähköpostin lähettäjän osoite? (esim. no-reply@aihio.ai).\nLisätietoja: ${getUrlToDocs('EMAIL_SENDER')}\n`,
        default: allVariables?.EMAIL_SENDER ?? '',
      },
      {
        when: (answers: any) => answers.values.MAILER_PROVIDER === 'nodemailer',
        type: 'input',
        name: 'values.EMAIL_HOST',
        message: `Mikä on sähköpostipalvelin (host)?\nLisätietoja: ${getUrlToDocs('EMAIL_HOST')}\n`,
        default: allVariables?.EMAIL_HOST ?? '',
      },
      {
        when: (answers: any) => answers.values.MAILER_PROVIDER === 'nodemailer',
        type: 'input',
        name: 'values.EMAIL_PORT',
        message: `Mikä on sähköpostipalvelimen portti?\nLisätietoja: ${getUrlToDocs('EMAIL_PORT')}\n`,
        default: allVariables?.EMAIL_PORT ?? '',
      },
      {
        when: (answers: any) => answers.values.MAILER_PROVIDER === 'nodemailer',
        type: 'input',
        name: 'values.EMAIL_USER',
        message: `Mikä on sähköpostin käyttäjätunnus?\nLisätietoja: ${getUrlToDocs('EMAIL_USER')}\n`,
        default: allVariables?.EMAIL_USER ?? '',
      },
      {
        when: (answers: any) => answers.values.MAILER_PROVIDER === 'nodemailer',
        type: 'input',
        name: 'values.EMAIL_PASSWORD',
        message: `Mikä on sähköpostin salasana?\nLisätietoja: ${getUrlToDocs('EMAIL_PASSWORD')}\n`,
        default: '',
      },
      {
        when: (answers: any) => answers.values.MAILER_PROVIDER === 'nodemailer',
        type: 'confirm',
        name: 'values.EMAIL_TLS',
        message: `Käytetäänkö TLS-salausta sähköpostille?\nLisätietoja: ${getUrlToDocs('EMAIL_TLS')}\n`,
        default: getBoolean(allVariables?.EMAIL_TLS, true),
      },
      {
        type: 'confirm',
        name: 'captcha',
        message: `Otetaanko Cloudflare Captcha käyttöön kirjautumissivuilla?`,
        default: false,
      },
      {
        when: (answers: any) => answers.captcha,
        type: 'input',
        name: 'values.NEXT_PUBLIC_CAPTCHA_SITE_KEY',
        message: `Mikä on Cloudflare Captchan sivustoavain (Site Key - JULKINEN)?\nLisätietoja: ${getUrlToDocs('NEXT_PUBLIC_CAPTCHA_SITE_KEY')}\n`,
        default: allVariables?.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? '',
      },
      {
        when: (answers: any) => answers.captcha,
        type: 'input',
        name: 'values.CAPTCHA_SECRET_TOKEN',
        message: `Mikä on Cloudflare Captchan salainen avain (Secret Key - YKSITYINEN)?\nLisätietoja: ${getUrlToDocs('CAPTCHA_SECRET_TOKEN')}\n`,
        default: '',
      }
      // --- Uudet kysymykset päättyvät tähän --- 
    ],
    // Toimenpiteet, kun käyttäjä on vastannut kysymyksiin
    actions: [
      async (answers: { values: Record<string, string> }) => {
        let envContent = '# Generoitu .env.local -tiedosto\n# ÄLÄ KOSKAAN COMMITTOI TÄTÄ TIEDOSTOA GITTIIN!\n\n';
        
        // Muodostetaan .env.local-tiedoston sisältö vastauksista
        for (const [key, value] of Object.entries(answers.values)) {
          if (value !== undefined && value !== '') { // Lisätään vain määritellyt, ei-tyhjät arvot
             envContent += `${key}=${value}\n`;
          }
        }

        // Kirjoitetaan tiedosto projektin juureen (tai haluttuun paikkaan)
        const outputPath = '.env.local';
        try {
           writeFileSync(outputPath, envContent);
           return `Ympäristömuuttujat generoitu tiedostoon: ${outputPath}.\nTarkista tiedosto ja käytä sitä paikallisessa kehityksessä. Älä committoi tätä Gittiin!`;
        } catch (error) {
          console.error(`Virhe kirjoitettaessa tiedostoa ${outputPath}:`, error);
          return `Virhe luotaessa ${outputPath}-tiedostoa.`;
        }
      },
    ],
  });
}

function getBoolean(value: string | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }
  return value.toLowerCase() === 'true';
}

function getUrlToDocs(envVar: string): string {
  return `${DOCS_URL}#${envVar.toLowerCase()}`;
}
