'use client';

import { useState } from 'react';

import { CreateTeamAccountDialog } from '@aihio/team-accounts/components';
import { Button } from '@aihio/ui/button';
import { Trans } from '@aihio/ui/trans';

export function HomeAddAccountButton(props: { className?: string }) {
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  return (
    <>
      <Button
        className={props.className}
        onClick={() => setIsAddingAccount(true)}
      >
        <Trans i18nKey={'account:createTeamButtonLabel'} />
      </Button>

      <CreateTeamAccountDialog
        isOpen={isAddingAccount}
        setIsOpen={setIsAddingAccount}
      />
    </>
  );
}
