import 'server-only';

import { getLogger } from '@aihio/shared/logger';

import { getLemonSqueezyEnv } from '../schema/lemon-squeezy-server-env.schema';

/**
 * @description Initialize the Lemon Squeezy client
 */
export async function initializeLemonSqueezyClient() {
  const { lemonSqueezySetup } = await import('@lemonsqueezy/lemonsqueezy.js');
  const env = getLemonSqueezyEnv();
  const logger = await getLogger();

  lemonSqueezySetup({
    apiKey: env.secretKey,
    onError(error) {
      logger.error(
        {
          name: `billing.lemon-squeezy`,
          error: error.message,
        },
        'Lemon Squeezy SDK:ssä tapahtui virhe',
      );
    },
  });
}
