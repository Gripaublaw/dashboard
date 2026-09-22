/**
 * routes/index.tsx — Inici
 * KPI strip + uptime bars (server-rendered) + activity list island.
 */

import { define } from "../utils.ts";
import { DashboardShell, PageHeading } from "../components/DashboardShell.tsx";
import { Card, SectionHeader } from "../components/Card.tsx";
import { MetricCard } from "../components/MetricCard.tsx";
import ActivityList from "../islands/ActivityList.tsx";
import { activities, uptime } from "../lib/data.ts";

export default define.page(function Home() {
  const bars = uptime;

  return (
    <DashboardShell active="/" titleKey="home.title">
      <PageHeading
        title="Inici"
        subtitle="Estat general de l'ecosistema digital i activitat recent."
      />

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Nombre d'apps"
          value="7"
          hint="2 noves aquest mes"
          icon="apps"
          tone="brand"
          chip="+2 / mes"
        />
        <MetricCard
          label="Usuaris actius"
          value="1"
          hint="Fa 5 min"
          icon="users"
          tone="success"
          chip="Actiu"
        />
        <MetricCard
          label="Serveis integrats"
          value="5"
          unit="/ 6"
          hint="1 pendent"
          icon="connections"
          tone="warning"
          chip="Avís"
        />
        <MetricCard
          label="Estat del sistema"
          value="99,94"
          unit="%"
          hint="99,94 % de disponibilitat"
          icon="activity"
          tone="success"
          chip="Operatiu"
        />
      </div>

      <div class="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <Card class="p-4 sm:p-5">
          <SectionHeader
            title="Últimes activitats"
            subtitle="Esdeveniments de les darreres 48 hores."
            actions={
              <span class="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-xs font-medium text-muted">
                {activities.length} esdeveniments
              </span>
            }
          />
          <div class="mt-4">
            <ActivityList />
          </div>
        </Card>

        <div class="flex flex-col gap-5">
          <Card class="p-4 sm:p-5">
            <SectionHeader
              title="Disponibilitat per servei"
              subtitle="Últims 30 dies"
            />
            <ul class="mt-4 flex flex-col gap-4">
              {bars.map((service) => (
                <li key={service.name}>
                  <div class="flex items-baseline justify-between gap-3 text-sm">
                    <span class="font-medium text-body">{service.name}</span>
                    <span class="font-mono text-xs text-muted">
                      {service.uptime.toFixed(2).replace(".", ",")} %
                    </span>
                  </div>
                  <div
                    class="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
                    role="img"
                    aria-label={`${service.name}: ${service.uptime}%`}
                  >
                    <span
                      class={`block h-full rounded-full ${
                        service.uptime > 99.9
                          ? "bg-success"
                          : service.uptime > 99.5
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                      style={`width: ${service.uptime}%`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card class="p-4 sm:p-5">
            <SectionHeader
              title="Salut de la plataforma"
              subtitle="Comprovacions automàtiques cada 60 s"
            />
            <dl class="mt-4 flex flex-col gap-3 text-sm">
              <div class="flex items-center justify-between gap-3">
                <dt class="text-muted">Cua d'esdeveniments</dt>
                <dd class="font-mono text-xs text-body">12 ms</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-muted">Base de dades</dt>
                <dd class="font-mono text-xs text-body">4 ms</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-muted">Feines en cua</dt>
                <dd class="font-mono text-xs text-body">3 pendents</dd>
              </div>
              <div class="flex items-center justify-between gap-3">
                <dt class="text-muted">Última còpia</dt>
                <dd class="text-xs text-body">Avui, 03:00</dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
});
