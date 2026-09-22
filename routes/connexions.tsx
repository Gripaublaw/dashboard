/**
 * routes/connexions.tsx — Connexions
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import { ActionButton } from "../components/ActionButton.tsx";
import ConnectionsList from "../islands/ConnectionsList.tsx";
import { connectionRows } from "../lib/data.ts";

export default define.page(function Connections() {
  return (
    <DashboardShell active="/connexions" titleKey="nav.connections">
      <PageHeading
        title="Connexions"
        subtitle="Integracions externes connectades a l'ecosistema."
        actions={
          <ActionButton variant="primary" icon="plus">
            Afegeix una connexió
          </ActionButton>
        }
      />
      <ConnectionsList initialRows={connectionRows} />
    </DashboardShell>
  );
});
