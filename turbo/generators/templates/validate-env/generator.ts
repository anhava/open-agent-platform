import type { PlopTypes } from '@turbo/gen';
import { z } from 'zod';
import { generator } from '../../utils/index';

// Apumuuttuja boolean-merkkijonojen validointiin ('true' tai 'false')
const BooleanStringEnum = z.enum(['true', 'false']);

// Zod-skeema ympäristömuuttujien validointiin
const Schema: Record<string, z.ZodType> = {
  NEXT_PUBLIC_SITE_URL: z
    .string({
      description: `Sivuston täydellinen URL. Pitäisi alkaa https://, esim. https://www.aihio.ai.`,
    })
    .url({
      message:
        'NEXT_PUBLIC_SITE_URL pitää olla validi URL. Käytä HTTPS-protokollaa tuotannossa.',
    })
    .refine(
      (url: string) => {
        return url.startsWith('https://');
      },
      {
        message: 'NEXT_PUBLIC_SITE_URL pitää alkaa https://',
        path: ['NEXT_PUBLIC_SITE_URL'],
      },
    ),
  NEXT_PUBLIC_PRODUCT_NAME: z
    .string({
      message: 'Tuotteen nimen pitää olla merkkijono.',
      description: `Tuotteen nimi. Esim. Aihio AI.`,
    })
    .min(1, { message: 'Tuotteen nimi ei voi olla tyhjä.' }),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string({
    message: 'Sivuston kuvauksen pitää olla merkkijono.',
    description: `Sivuston kuvaus (meta description). Lyhyt lause tai pari.`,
  }),
  NEXT_PUBLIC_DEFAULT_THEME_MODE: z.enum(['light', 'dark', 'system'], {
    message: 'Oletusteeman pitää olla light, dark tai system.',
    description: `Sivuston oletusteema.`,
  }),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string({
    message: 'Oletuskielen pitää olla merkkijono.',
    description: `Sivuston oletuskieli (locale). Esim. fi tai en.`,
  }).min(2, { message: 'Kielikoodin tulee olla vähintään 2 merkkiä.'}),
  CONTACT_EMAIL: z
    .string({
      message: 'Yhteyshenkilön sähköpostin pitää olla validi sähköposti.',
      description: `Sähköpostiosoite, johon yhteydenottolomakkeen viestit lähetetään.`,
    })
    .email({ message: 'Virheellinen sähköpostiosoite.' }),
  // Ominaisuusliput (boolean-arvot merkkijonoina)
  NEXT_PUBLIC_ENABLE_THEME_TOGGLE: BooleanStringEnum,
  NEXT_PUBLIC_AUTH_PASSWORD: BooleanStringEnum,
  NEXT_PUBLIC_AUTH_MAGIC_LINK: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_DELETION: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_PERSONAL_ACCOUNT_BILLING: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_DELETION: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_BILLING: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_TEAM_ACCOUNTS_CREATION: BooleanStringEnum,
  NEXT_PUBLIC_REALTIME_NOTIFICATIONS: BooleanStringEnum,
  NEXT_PUBLIC_ENABLE_NOTIFICATIONS: BooleanStringEnum,
  // Supabase-muuttujat
  NEXT_PUBLIC_SUPABASE_URL: z
    .string({
      description: `Supabase-instanssin URL.`,
    })
    .url({
      message: 'Supabase URL pitää olla validi URL.',
    }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string({
    message: 'Supabase anon key pitää olla merkkijono.',
    description: `Supabasen julkinen (anon) avain. Käytetään selaimessa.`,
  }).min(1, { message: 'Supabase anon key ei voi olla tyhjä.' }),
  SUPABASE_SERVICE_ROLE_KEY: z.string({
    message: 'Supabase service role key pitää olla merkkijono.',
    description: `Supabasen salainen (service role) avain. Käytetään palvelimella.`,
  }).min(1, { message: 'Supabase service role key ei voi olla tyhjä.' }),
  // Laskutusmuuttujat
  NEXT_PUBLIC_BILLING_PROVIDER: z.enum(['stripe', 'lemon-squeezy'], {
    message: 'Laskutuksen tarjoajan pitää olla stripe tai lemon-squeezy.',
    description: `Käytettävä laskutuksen tarjoaja.`,
  }),
  // Stripe (jos käytössä)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
    .string({
      message: 'Stripe publishable key pitää olla merkkijono.',
      description: `Stripe Dashboardista saatava julkinen avain. Alkaa pk_.`,
    })
    .refine(
      (value: string) => {
        return value.startsWith('pk_');
      },
      {
        message: 'Stripe publishable key pitää alkaa pk_',
        path: ['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'],
      },
    ).optional(), // Muutetaan vapaaehtoiseksi, koska riippuu providerista
  STRIPE_SECRET_KEY: z
    .string({
      message: 'Stripe secret key pitää olla merkkijono.',
      description: `Stripe Dashboardista saatava salainen avain. Alkaa sk_.`,
    })
    .refine(
      (value: string) => {
        return value.startsWith('sk_');
      },
      {
        message: 'Stripe secret key pitää alkaa sk_',
        path: ['STRIPE_SECRET_KEY'],
      },
    ).optional(), // Muutetaan vapaaehtoiseksi
  STRIPE_WEBHOOK_SECRET: z
    .string({
      message: 'Stripe webhook secret pitää olla merkkijono.',
      description: `Stripe webhookin allekirjoitusavain. Alkaa whsec_.`,
    })
    .min(1)
    .refine(
      (value: string) => {
        return value.startsWith('whsec_');
      },
      {
        message: 'Stripe webhook secret pitää alkaa whsec_',
        path: ['STRIPE_WEBHOOK_SECRET'],
      },
    ).optional(), // Muutetaan vapaaehtoiseksi
  // Lemon Squeezy (jos käytössä)
  LEMON_SQUEEZY_SECRET_KEY: z
    .string({
      message: 'Lemon Squeezy API key pitää olla merkkijono.',
      description: `Lemon Squeezy tilin API-avain.`,
    })
    .min(1).optional(), // Muutetaan vapaaehtoiseksi
  LEMON_SQUEEZY_STORE_ID: z
    .string({
      message: 'Lemon Squeezy store ID pitää olla merkkijono.',
      description: `Lemon Squeezy tilin kaupan ID.`,
    })
    .min(1).optional(), // Muutetaan vapaaehtoiseksi
  LEMON_SQUEEZY_SIGNING_SECRET: z
    .string({
      message: 'Lemon Squeezy signing secret pitää olla merkkijono.',
      description: `Jaettu salaisuus Lemon Squeezy webhookeille.`,
    })
    .min(1).optional(), // Muutetaan vapaaehtoiseksi
  // Sähköposti
  MAILER_PROVIDER: z.enum(['nodemailer', 'resend'], {
    message: 'Sähköpostin tarjoajan pitää olla nodemailer tai resend.',
    description: `Käytettävä sähköpostin lähetystarjoaja.`,
  }),
  // Lisää tähän tarvittaessa validoinnit muille muuttujille (Resend, Nodemailer, CMS jne.)
};

/**
 * Luo generaattorin, joka validoi annetun .env-tiedoston sisällön
 * yllä määriteltyä Zod-skeemaa vasten.
 * @param plop Plop-instanssi.
 */
export function createEnvironmentVariablesValidatorGenerator(
  plop: PlopTypes.NodePlopAPI,
): void {
  plop.setGenerator('validate-env', {
    description: 'Validoi ympäristömuuttujatiedoston sisällön',
    // Suoritettavat toimenpiteet
    actions: [
      async (answers: { path: string }) => {
        // Varmistetaan, että polku on annettu
        if (!answers || !answers.path) {
          throw new Error('Polku ympäristömuuttujatiedostoon on pakollinen.');
        }

        // Ladataan ympäristömuuttujat annetusta tiedostosta
        const env = generator.loadEnvironmentVariables(answers.path as string);

        // Käydään ladatut muuttujat läpi
        for (const key of Object.keys(env)) {
          const propertySchema = Schema[key];
          const value = env[key];

          // Jos muuttujalle löytyy skeemamääritys, validoidaan se
          if (propertySchema) {
            const result = propertySchema.safeParse(value);

            if (!result.success) {
              // Heitetään virhe, jos validointi epäonnistuu
              throw new Error(
                `Validointivirhe muuttujalle ${key} (arvo: ${value}): \n\n${JSON.stringify(result.error.format(), null, 2)}`,
              );
            } else {
              console.log(`✔ Muuttuja ${key} on validi!`);
            }
          } else {
             console.warn(`⚠ Muuttujalle ${key} ei löytynyt validointisääntöä Skeemasta.`) 
          }
        }
        
        // Tarkistetaan vielä, puuttuuko pakollisia muuttujia
        const definedKeys = Object.keys(env);
        for (const schemaKey of Object.keys(Schema)) {
            const propertySchema = Schema[schemaKey];
            // Tarkistetaan vain ei-vapaaehtoiset kentät
            if (!propertySchema.isOptional() && !definedKeys.includes(schemaKey)) {
                throw new Error(`Pakollinen ympäristömuuttuja ${schemaKey} puuttuu tiedostosta ${answers.path}!`);
            }
        }

        return 'Ympäristömuuttujat validoitu onnistuneesti!';
      },
    ],
    // Kysymykset käyttäjälle
    prompts: [
      {
        type: 'input',
        name: 'path',
        message:
          'Anna polku validoitavaan ympäristömuuttujatiedostoon (esim. .env.local tai .env.production). Oletus: .env.local',
        default: '.env.local',
      },
    ],
  });
}
