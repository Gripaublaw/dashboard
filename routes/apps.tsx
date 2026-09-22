/**
 * routes/apps.tsx — Aplicacions
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import AppsTable from "../islands/AppsTable.tsx";
import { appRows } from "../lib/data.ts";

export default define.page(function Apps() {
  return (
    <DashboardShell active="/apps" titleKey="nav.apps">
      <PageHeading
        title="Aplicacions"
        subtitle="Aplicacions desplegades dins de l'ecosistema Nexus."
      />
      {/* Server-seeded so the first paint has real rows; the island owns them after. */}
      <AppsTable initialRows={appRows} />
    </DashboardShell>
  );
});
