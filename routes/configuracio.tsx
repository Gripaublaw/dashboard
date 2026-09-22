/**
 * routes/configuracio.tsx — Configuració
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import SettingsForm from "../islands/SettingsForm.tsx";
import { ecosystemSettings } from "../lib/settings.ts";

export default define.page(function Settings() {
  return (
    <DashboardShell active="/configuracio" titleKey="nav.settings">
      <PageHeading
        title="Configuració"
        subtitle="Identitat i paràmetres per defecte de l'ecosistema."
      />
      <SettingsForm initialSettings={ecosystemSettings} />
    </DashboardShell>
  );
});
