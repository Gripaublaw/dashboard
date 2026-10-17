/**
 * routes/apps.tsx — Aplicacions
 * Carrega les dades inicials de l'API (SSR) i les passa a la illa.
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import AppsTable from "../islands/AppsTable.tsx";
import { listApps } from "../lib/api.ts";

export default define.page(async function Apps() {
  const appRows = await listApps();

  return (
    <DashboardShell active="/apps" titleKey="nav.apps">
      <PageHeading
        title="Aplicacions"
        subtitle="Aplicacions desplegades dins de l'ecosistema Nexus."
      />
      <AppsTable initialRows={appRows} />
    </DashboardShell>
  );
});
