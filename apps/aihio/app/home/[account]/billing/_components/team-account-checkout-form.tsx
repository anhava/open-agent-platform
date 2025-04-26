'use client';

import { useState, useTransition } from 'react';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';

import { PlanPicker } from '@aihio/billing-gateway/components';
import { useAppEvents } from '@aihio/shared/events';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@aihio/ui/card';
import { Trans } from '@aihio/ui/trans';

import billingConfig from '~/config/billing.config';

import { createTeamAccountCheckoutSession } from '../_lib/server/server-actions';

const EmbeddedCheckout = dynamic(
  async () => {
    const { EmbeddedCheckout } = await import('@aihio/billing-gateway/checkout');

    return {
      default: EmbeddedCheckout,
    };
  },
  {
    ssr: false,
  },
);

export function TeamAccountCheckoutForm(params: {
  accountId: string;
  customerId: string | null | undefined;
}) {
  const routeParams = useParams();
  const [pending, startTransition] = useTransition();
  const appEvents = useAppEvents();

  const [checkoutToken, setCheckoutToken] = useState<string | undefined>(
    undefined,
  );

  // If the checkout token is set, render the embedded checkout component
  if (checkoutToken) {
    return (
      <EmbeddedCheckout
        checkoutToken={checkoutToken}
        provider={billingConfig.provider}
        onClose={() => setCheckoutToken(undefined)}
      />
    );
  }

  // only allow trial if the user is not already a customer
  const canStartTrial = !params.customerId;

  // Otherwise, render the plan picker component
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Trans i18nKey={'billing:manageTeamPlan'} />
        </CardTitle>

        <CardDescription>
          <Trans i18nKey={'billing:manageTeamPlanDescription'} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <PlanPicker
          pending={pending}
          config={billingConfig}
          canStartTrial={canStartTrial}
          onSubmit={({ planId, productId }) => {
            startTransition(async () => {
              const slug = routeParams.account as string;

              appEvents.emit({
                type: 'checkout.started',
                payload: {
                  planId,
                  account: slug,
                },
              });

              const { checkoutToken } = await createTeamAccountCheckoutSession({
                planId,
                productId,
                slug,
                accountId: params.accountId,
              });

              setCheckoutToken(checkoutToken);
            });
          }}
        />
      </CardContent>
    </Card>
  );
}
