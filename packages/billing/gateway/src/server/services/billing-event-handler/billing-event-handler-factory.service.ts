import 'server-only';

import { z } from 'zod';

import {
  type BillingConfig,
  type BillingProviderSchema,
  BillingWebhookHandlerService,
} from '@aihio/billing';
import { createRegistry } from '@aihio/shared/registry';

/**
 * @description Creates a registry for billing webhook handlers
 * @param config - The billing config
 * @returns The billing webhook handler registry
 */
export function createBillingEventHandlerFactoryService(config: BillingConfig) {
  // Create a registry for billing webhook handlers
  const billingWebhookHandlerRegistry = createRegistry<
    BillingWebhookHandlerService,
    z.infer<typeof BillingProviderSchema>
  >();

  // Register the Stripe webhook handler
  billingWebhookHandlerRegistry.register('stripe', async () => {
    const { StripeWebhookHandlerService } = await import('@aihio/stripe');

    return new StripeWebhookHandlerService(config);
  });

  // Register the Lemon Squeezy webhook handler
  billingWebhookHandlerRegistry.register('lemon-squeezy', async () => {
    const { LemonSqueezyWebhookHandlerService } = await import(
      '@aihio/lemon-squeezy'
    );

    return new LemonSqueezyWebhookHandlerService(config);
  });

  // Register Paddle webhook handler (not implemented yet)
  billingWebhookHandlerRegistry.register('paddle', () => {
    throw new Error('Paddle is not supported yet');
  });

  return billingWebhookHandlerRegistry;
}
