import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getSupabaseServerComponentClient } from '@aihio/supabase/server-component-client';

import { AdminAccountsTable } from '@aihio/admin/components/admin-accounts-table';
import { AdminCreateUserDialog } from '@aihio/admin/components/admin-create-user-dialog';
import { AdminGuard } from '@aihio/admin/components/admin-guard';
import { AppBreadcrumbs } from '@aihio/ui/app-breadcrumbs';
import { Button } from '@aihio/ui/button';
import { PageBody, PageHeader } from '@aihio/ui/page';

interface SearchParams {
  page?: string;
  account_type?: 'all' | 'team' | 'personal';
  query?: string;
}

interface AdminAccountsPageProps {
  searchParams: Promise<SearchParams>;
}

export const metadata = {
  title: `Accounts`,
};

async function fetchAccounts(client: ReturnType<typeof getSupabaseServerComponentClient>, params: SearchParams) {
  const query = client.from('accounts').select('*');

  if (params.account_type && params.account_type !== 'all') {
    query.eq('is_personal_account', params.account_type === 'personal');
  }

  if (params.query) {
    query.or(`name.ilike.%${params.query}%,email.ilike.%${params.query}%`);
  }

  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data;
}

async function AccountsPage(props: AdminAccountsPageProps) {
  const queryClient = new QueryClient();
  const client = getSupabaseServerComponentClient();
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const accounts = await fetchAccounts(client, searchParams);
  
  // Prefetch the data to the React Query cache
  queryClient.setQueryData(['admin', 'accounts'], accounts);

  return (
    <>
      <PageHeader description={<AppBreadcrumbs />}>
        <div className="flex justify-end">
          <AdminCreateUserDialog>
            <Button data-test="admin-create-user-button">Luo käyttäjä</Button>
          </AdminCreateUserDialog>
        </div>
      </PageHeader>

      <PageBody>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AdminAccountsTable
            page={page}
            filters={{
              type: searchParams.account_type ?? 'all',
              query: searchParams.query ?? '',
            }}
          />
        </HydrationBoundary>
      </PageBody>
    </>
  );
}

export default AdminGuard(AccountsPage);
