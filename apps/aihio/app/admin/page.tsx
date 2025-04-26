import { AdminDashboard } from '@aihio/admin/components/admin-dashboard';
import { AdminGuard } from '@aihio/admin/components/admin-guard';
import { PageBody, PageHeader } from '@aihio/ui/page';

function AdminPage() {
  return (
    <>
      <PageHeader description={`Super Admin`} />

      <PageBody>
        <AdminDashboard />
      </PageBody>
    </>
  );
}

export default AdminGuard(AdminPage);
