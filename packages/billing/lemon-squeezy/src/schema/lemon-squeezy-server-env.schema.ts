import { z } from 'zod';

/**
 * @name getLemonSqueezyEnv
 * @description Get the Lemon Squeezy environment variables.
 * It will throw an error if any of the required variables are missing.
 */
export const getLemonSqueezyEnv = () =>
  z
    .object({
      secretKey: z
        .string({
          description: `Salainen avain. Käytä muuttujaa LEMON_SQUEEZY_SECRET_KEY asettaaksesi sen.`,
        })
        .min(1),
      webhooksSecret: z
        .string({
          description: `Jakamaton salainen avain. Käytä muuttujaa LEMON_SQUEEZY_SIGNING_SECRET asettaaksesi sen.`,
        })
        .min(1)
        .max(40),
      storeId: z
        .string({
          description: `Kaupan ID. Käytä muuttujaa LEMON_SQUEEZY_STORE_ID asettaaksesi sen.`,
        })
        .min(1),
    })
    .parse({
      secretKey: process.env.LEMON_SQUEEZY_SECRET_KEY,
      webhooksSecret: process.env.LEMON_SQUEEZY_SIGNING_SECRET,
      storeId: process.env.LEMON_SQUEEZY_STORE_ID,
    });
