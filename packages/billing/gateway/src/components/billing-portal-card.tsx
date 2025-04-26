'use client';

import { ArrowUpRight } from 'lucide-react';

import { Button } from '@aihio/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@aihio/ui/card';
import { Trans } from '@aihio/ui/trans';

export function BillingPortalCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Trans i18nKey="billing:billingPortalCardTitle" />
        </CardTitle>

        <CardDescription>
          <Trans i18nKey="billing:billingPortalCardDescription" />
        </CardDescription>
      </CardHeader>

      <CardContent className={'space-y-2'}>
        <div>
          <Button data-test={'manage-billing-redirect-button'}>
            <span>
              <Trans i18nKey="billing:billingPortalCardButton" />
            </span>

            <ArrowUpRight className={'h-4'} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
