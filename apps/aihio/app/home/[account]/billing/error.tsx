'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { useCaptureException } from '@aihio/monitoring/hooks';
import { Alert, AlertDescription, AlertTitle } from '@aihio/ui/alert';
import { AppBreadcrumbs } from '@aihio/ui/app-breadcrumbs';
import { Button } from '@aihio/ui/button';
import { PageBody, PageHeader } from '@aihio/ui/page';
import { Trans } from '@aihio/ui/trans';

export default function BillingErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useCaptureException(error);

  return (
    <>
      <PageHeader description={<AppBreadcrumbs />} />

      <PageBody>
        <div className={'flex flex-col space-y-4'}>
          <Alert variant={'destructive'}>
            <ExclamationTriangleIcon className={'h-4'} />

            <AlertTitle>
              <Trans i18nKey={'billing:planPickerAlertErrorTitle'} />
            </AlertTitle>

            <AlertDescription>
              <Trans i18nKey={'billing:planPickerAlertErrorDescription'} />
            </AlertDescription>
          </Alert>

          <div>
            <Button variant={'outline'} onClick={reset}>
              <Trans i18nKey={'common:retry'} />
            </Button>
          </div>
        </div>
      </PageBody>
    </>
  );
}
