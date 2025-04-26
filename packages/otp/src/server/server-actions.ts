'use server';

import { z } from 'zod';

import { enhanceAction } from '@aihio/next/actions';
import { getLogger } from '@aihio/shared/logger';
import { getSupabaseServerAdminClient } from '@aihio/supabase/server-admin-client';

import { createOtpApi } from '../api';

// Schema for sending OTP email
const SendOtpEmailSchema = z.object({
  email: z.string().email({ message: 'Ole hyvä ja syötä oikea sähköpostiosoite' }),
  // Purpose of the OTP (e.g., 'email-verification', 'password-reset')
  purpose: z.string().min(1).max(1000),
  // how long the OTP should be valid for. Defaults to 1 hour. Max is 7 days. Min is 30 seconds.
  expiresInSeconds: z
    .number()
    .min(30)
    .max(86400 * 7)
    .default(3600)
    .optional(),
});

/**
 * Server action to generate an OTP and send it via email
 */
export const sendOtpEmailAction = enhanceAction(
  async function (data: z.infer<typeof SendOtpEmailSchema>, user) {
    const logger = await getLogger();
    const ctx = { name: 'send-otp-email', userId: user.id };
    const email = user.email;

    // validate edge case where user has no email
    if (!email) {
      throw new Error('Käyttäjällä ei ole sähköpostiosoitetta. OTP-vahvistaminen ei ole mahdollista.');
    }

    // validate edge case where email is not the same as the one provided
    // this is highly unlikely to happen, but we want to make sure the client-side code is correct in
    // sending the correct user email
    if (data.email !== email) {
      throw new Error(
        'Käyttäjän sähköpostiosoite ei vastaa sähköpostiosoitetta, jonka käyttäjä antoi. Tämä on todennäköisesti virhe ohjelman käyttäjän sivulla.',
      );
    }

    try {
      const { purpose, expiresInSeconds } = data;

      logger.info(
        { ...ctx, email, purpose },
        'Luodaan OTP-tokeni ja lähetetään sähköposti',
      );

      const client = getSupabaseServerAdminClient();
      const otpApi = createOtpApi(client);

      // Create a token that will be verified later
      const tokenResult = await otpApi.createToken({
        userId: user.id,
        purpose,
        expiresInSeconds,
      });

      // Send the email with the OTP
      await otpApi.sendOtpEmail({
        email,
        otp: tokenResult.token,
      });

      logger.info(
        { ...ctx, tokenId: tokenResult.id },
        'OTP-sähköposti lähetetty onnistuneesti',
      );

      return {
        success: true,
        tokenId: tokenResult.id,
      };
    } catch (error) {
      logger.error({ ...ctx, error }, 'VIRHE: OTP-sähköpostin lähetys epäonnistui');

      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'VIRHE: OTP-sähköpostin lähetys epäonnistui',
      };
    }
  },
  {
    schema: SendOtpEmailSchema,
    auth: true,
  },
);
