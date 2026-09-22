/**
 * routes/usuaris.tsx — Usuaris
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import UsersTable from "../islands/UsersTable.tsx";
import { userRows } from "../lib/data.ts";

export default define.page(function Users() {
  return (
    <DashboardShell active="/usuaris" titleKey="nav.users">
      <PageHeading
        title="Usuaris"
        subtitle="Persones amb accés a l'ecosistema i els seus permisos."
      />
      <UsersTable initialRows={userRows} />
    </DashboardShell>
  );
});
