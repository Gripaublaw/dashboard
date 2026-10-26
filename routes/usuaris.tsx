/**
 * routes/usuaris.tsx — Usuaris
 * Carrega les dades inicials de l'API (SSR) i les passa a la illa.
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import UsersTable from "../islands/UsersTable.tsx";
import { listUsers } from "../lib/api.ts";

export default define.page(async function Users() {
  const userRows = await listUsers();

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
