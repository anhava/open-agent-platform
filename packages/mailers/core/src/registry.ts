import { Mailer } from '@aihio/mailers-shared';
import { createRegistry } from '@aihio/shared/registry';

import { MailerProvider } from './provider-enum';

const mailerRegistry = createRegistry<Mailer, MailerProvider>();

mailerRegistry.register('nodemailer', async () => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { createNodemailerService } = await import('@aihio/nodemailer');

    return createNodemailerService();
  } else {
    throw new Error(
      'Nodemailer is not available on the edge runtime. Please use another mailer.',
    );
  }
});

mailerRegistry.register('resend', async () => {
  const { createResendMailer } = await import('@aihio/resend');

  return createResendMailer();
});

export { mailerRegistry };
