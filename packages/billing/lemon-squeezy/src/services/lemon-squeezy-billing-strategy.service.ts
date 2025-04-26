import 'server-only';

import {
  cancelSubscription,
  createUsageRecord,
  getCheckout,
  getSubscription,
  getVariant,
  listUsageRecords,
  updateSubscriptionItem,
} from '@lemonsqueezy/lemonsqueezy.js';
import { z } from 'zod';

import { BillingStrategyProviderService } from '@aihio/billing/core';
import type {
  CancelSubscriptionParamsSchema,
  CreateBillingCheckoutSchema,
  CreateBillingPortalSessionSchema,
  QueryBillingUsageSchema,
  ReportBillingUsageSchema,
  RetrieveCheckoutSessionSchema,
  UpdateSubscriptionParamsSchema,
} from '@aihio/billing/schema';
import { getLogger } from '@aihio/shared/logger';

import { createLemonSqueezyBillingPortalSession } from './create-lemon-squeezy-billing-portal-session';
import { createLemonSqueezyCheckout } from './create-lemon-squeezy-checkout';
import { createLemonSqueezySubscriptionPayloadBuilderService } from './lemon-squeezy-subscription-payload-builder.service';

export class LemonSqueezyBillingStrategyService
  implements BillingStrategyProviderService
{
  private readonly namespace = 'billing.lemon-squeezy';

  /**
   * @name createCheckoutSession
   * @description Creates a checkout session for a customer
   * @param params
   */
  async createCheckoutSession(
    params: z.infer<typeof CreateBillingCheckoutSchema>,
  ) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      ...params,
    };

    logger.info(ctx, 'Luodaan tilaus...');

    const { data: response, error } = await createLemonSqueezyCheckout(params);

    if (error ?? !response?.data.id) {
      console.log(error);

      logger.error(
        {
          ...ctx,
          error: error?.message,
        },
        'Tilaustapahtuma ei luotu',
      );

      throw new Error('Tilaustapahtuma ei luotu');
    }

    logger.info(ctx, 'Tilaus luotu');

    return {
      checkoutToken: response.data.attributes.url,
    };
  }

  /**
   * @name createBillingPortalSession
   * @description Creates a billing portal session for a customer
   * @param params
   */
  async createBillingPortalSession(
    params: z.infer<typeof CreateBillingPortalSessionSchema>,
  ) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      ...params,
    };

    logger.info(ctx, 'Luodaan tilausportaali...');

    const { data, error } =
      await createLemonSqueezyBillingPortalSession(params);

    if (error ?? !data) {
      logger.error(
        {
          ...ctx,
          error: error?.message,
        },
        'Tilausportaali ei luotu',
      );

      throw new Error('Tilausportaali ei luotu');
    }

    logger.info(ctx, 'Tilausportaali luotu');

    return { url: data };
  }

  /**
   * @name cancelSubscription
   * @description Cancels a subscription
   * @param params
   */
  async cancelSubscription(
    params: z.infer<typeof CancelSubscriptionParamsSchema>,
  ) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      subscriptionId: params.subscriptionId,
    };

    logger.info(ctx, 'Peruutetaan tilaus...');

    try {
      const { error } = await cancelSubscription(params.subscriptionId);

      if (error) {
        logger.error(
          {
            ...ctx,
            error: error.message,
          },
          'Tilaus ei peruutettu',
        );

        throw new Error('Tilaus ei peruutettu');
      }

      logger.info(ctx, 'Tilaus peruutettu');

      return { success: true };
    } catch (error) {
      logger.info(
        {
          ...ctx,
          error: (error as Error)?.message,
        },
        `Tilaus ei peruutettu. Se voi olla jo peruutettu käyttäjän puolella.`,
      );

      return { success: false };
    }
  }

  /**
   * @name retrieveCheckoutSession
   * @description Retrieves a checkout session
   * @param params
   */
  async retrieveCheckoutSession(
    params: z.infer<typeof RetrieveCheckoutSessionSchema>,
  ) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      sessionId: params.sessionId,
    };

    logger.info(ctx, 'Hae tilaustapahtuma...');

    const { data: session, error } = await getCheckout(params.sessionId);

    if (error ?? !session?.data) {
      logger.error(
        {
          ...ctx,
          error: error?.message,
        },
        'Tilaustapahtuma ei löytynyt',
      );

      throw new Error('Tilaustapahtuma ei löytynyt');
    }

    logger.info(ctx, 'Tilaustapahtuma saatu');

    const { id, attributes } = session.data;

    return {
      checkoutToken: id,
      isSessionOpen: false,
      status: 'complete' as const,
      customer: {
        email: attributes.checkout_data.email,
      },
    };
  }

  /**
   * @name reportUsage
   * @description Reports the usage of the billing
   * @param params
   */
  async reportUsage(params: z.infer<typeof ReportBillingUsageSchema>) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      subscriptionItemId: params.id,
    };

    logger.info(ctx, 'Ilmoitetaan käyttö...');

    const { error } = await createUsageRecord({
      quantity: params.usage.quantity,
      subscriptionItemId: params.id,
      action: params.usage.action,
    });

    if (error) {
      logger.error(
        {
          ...ctx,
          error,
        },
        'Käyttö ei ilmoitettu',
      );

      throw new Error('Käyttö ei ilmoitettu');
    }

    logger.info(ctx, 'Käyttö ilmoitettu');

    return { success: true };
  }

  /**
   * @name queryUsage
   * @description Queries the usage of the metered billing
   * @param params
   */
  async queryUsage(
    params: z.infer<typeof QueryBillingUsageSchema>,
  ): Promise<{ value: number }> {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      ...params,
    };

    if (!('page' in params.filter)) {
      logger.error(ctx, `Sivun parametrit ovat pakollisia`);

      throw new Error('Sivun parametrit ovat pakollisia');
    }

    logger.info(ctx, 'Hae käyttö...');

    const records = await listUsageRecords({
      filter: {
        subscriptionItemId: params.id,
      },
      page: params.filter,
    });

    if (records.error) {
      logger.error(
        {
          ...ctx,
          error: records.error,
        },
        'Käyttö ei haettu',
      );

      throw new Error('Käyttö ei haettu');
    }

    if (!records.data) {
      return {
        value: 0,
      };
    }

    const value = records.data.data.reduce(
      (acc, record) => acc + record.attributes.quantity,
      0,
    );

    logger.info(
      {
        ...ctx,
        value,
      },
      'Käyttö haettu',
    );

    return { value };
  }

  /**
   * @name queryUsage
   * @description Queries the usage of the metered billing
   * @param params
   */
  async updateSubscriptionItem(
    params: z.infer<typeof UpdateSubscriptionParamsSchema>,
  ) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      ...params,
    };

    logger.info(ctx, 'Päivitetään tilaus...');

    const { error } = await updateSubscriptionItem(params.subscriptionItemId, {
      quantity: params.quantity,
    });

    if (error) {
      logger.error(
        {
          ...ctx,
          error,
        },
        'Tilaus ei päivitetty',
      );

      throw new Error('Tilaus ei päivitetty');
    }

    logger.info(ctx, 'Tilaus päivitetty');

    return { success: true };
  }

  async getSubscription(subscriptionId: string) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      subscriptionId,
    };

    logger.info(ctx, 'Hae tilaus...');

    const { error, data } = await getSubscription(subscriptionId);

    if (error) {
      logger.error(
        {
          ...ctx,
          error,
        },
        'Tilaus ei löytynyt',
      );

      throw new Error('Tilaus ei löytynyt');
    }

    if (!data) {
      logger.error(
        {
          ...ctx,
        },
        'Tilaus ei löytynyt',
      );

      throw new Error('Tilaus ei löytynyt');
    }

    logger.info(ctx, 'Tilaus saatu');

    const payloadBuilderService =
      createLemonSqueezySubscriptionPayloadBuilderService();

    const subscription = data.data.attributes;
    const customerId = subscription.customer_id.toString();
    const status = subscription.status;
    const variantId = subscription.variant_id;
    const productId = subscription.product_id;
    const createdAt = subscription.created_at;
    const endsAt = subscription.ends_at;
    const renewsAt = subscription.renews_at;
    const trialEndsAt = subscription.trial_ends_at;
    const intervalCount = subscription.billing_anchor;
    const interval = intervalCount === 1 ? 'month' : 'year';

    const subscriptionItemId =
      data.data.attributes.first_subscription_item?.id.toString() as string;

    const lineItems = [
      {
        id: subscriptionItemId.toString(),
        product: productId.toString(),
        variant: variantId.toString(),
        quantity: subscription.first_subscription_item?.quantity ?? 1,
        // not anywhere in the API
        priceAmount: 0,
      },
    ];

    return payloadBuilderService.build({
      customerId,
      id: subscriptionId,
      // not in the API
      accountId: '',
      lineItems,
      status,
      interval,
      intervalCount,
      // not in the API
      currency: '',
      periodStartsAt: new Date(createdAt).getTime(),
      periodEndsAt: new Date(renewsAt ?? endsAt).getTime(),
      cancelAtPeriodEnd: subscription.cancelled,
      trialStartsAt: trialEndsAt ? new Date(createdAt).getTime() : null,
      trialEndsAt: trialEndsAt ? new Date(trialEndsAt).getTime() : null,
    });
  }

  /**
   * @name queryUsage
   * @description Queries the usage of the metered billing
   * @param planId
   */
  async getPlanById(planId: string) {
    const logger = await getLogger();

    const ctx = {
      name: this.namespace,
      planId,
    };

    logger.info(ctx, 'Hae jäsenyys ID:llä...');

    const { error, data } = await getVariant(planId);

    if (error) {
      logger.error(
        {
          ...ctx,
          error,
        },
        'Jäsenyys ei löytynyt',
      );

      throw new Error('Jäsenyys ei löytynyt');
    }

    if (!data) {
      logger.error(
        {
          ...ctx,
        },
        'Jäsenyys ei löytynyt',
      );

      throw new Error('Jäsenyys ei löytynyt');
    }

    logger.info(ctx, 'Jäsenyys saatu');

    const attrs = data.data.attributes;

    return {
      id: data.data.id,
      name: attrs.name,
      interval: attrs.interval ?? '',
      amount: attrs.price,
    };
  }
}
