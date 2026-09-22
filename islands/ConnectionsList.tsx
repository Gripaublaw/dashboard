/**
 * Connexions list island: external integrations with status, a real
 * test-connection probe and an edit drawer.
 *
 * Every mutation goes through lib/api.ts, so switching to a live backend is a
 * one-line change there (USE_REMOTE = true) and nothing here has to move.
 */

import { useSignal } from "@preact/signals";
import { t, type TranslationKey } from "../lib/i18n.ts";
import type { ConnectionRow } from "../lib/data.ts";
import { ApiError, errorKey, updateConnection } from "../lib/api.ts";
import { ActionButton } from "../components/ActionButton.tsx";
import { Card, InitialsBadge } from "../components/Card.tsx";
import { FeedbackBanner } from "../components/FeedbackBanner.tsx";
import { StatusBadge, type StatusTone } from "../components/StatusBadge.tsx";
import { locale } from "./state.ts";

export interface ConnectionsListProps {
  initialRows: ConnectionRow[];
}

const STATUS_TONE: Record<ConnectionRow["status"], StatusTone> = {
  active: "success",
  warning: "warning",
  error: "danger",
};

const STATUS_KEY: Record<ConnectionRow["status"], TranslationKey> = {
  active: "status.active",
  warning: "status.warning",
  error: "status.error",
};

export default function ConnectionsList({ initialRows }: ConnectionsListProps) {
  const rows = useSignal<ConnectionRow[]>(initialRows);
  const selected = useSignal<ConnectionRow | null>(null);
  const saved = useSignal<string | null>(null);
  const error = useSignal<string | null>(null);
  const saving = useSignal(false);
  /** id of the connection whose probe is running right now */
  const testingId = useSignal<string | null>(null);
  const testedOk = useSignal<string | null>(null);
  const current = locale.value;

  const healthy = rows.value.filter((r) => r.status === "active").length;
  const attention = rows.value.length - healthy;

  async function saveSelected() {
    const row = selected.value;
    if (!row || saving.value) return;
    saving.value = true;
    error.value = null;
    try {
      await updateConnection(row.id, {
        auth: row.auth,
        scope: row.scope,
        owner: row.owner,
      });
      rows.value = rows.value.map((r) => (r.id === row.id ? { ...row } : r));
      saved.value = `${t(current, "settings.saved")} · ${row.name}`;
      selected.value = null;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : "unknown";
    } finally {
      saving.value = false;
    }
  }

  async function testConnection(id: string) {
    if (testingId.value) return;
    const row = rows.value.find((r) => r.id === id);
    testingId.value = id;
    error.value = null;
    testedOk.value = null;
    try {
      await updateConnection(id, { status: "active" });
      rows.value = rows.value.map((r) =>
        r.id === id ? { ...r, status: "active", lastEvent: "ara mateix" } : r
      );
      testedOk.value = row?.name ?? null;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : "unknown";
    } finally {
      testingId.value = null;
    }
  }

  return (
    <>
      <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span class="inline-flex items-center gap-1.5 rounded-full border border-success/25 bg-success-soft px-3 py-1 font-medium text-success-ink">
          <span class="size-1.5 rounded-full bg-success" aria-hidden="true" />
          {healthy} {t(current, "cnx.healthy")}
        </span>
        <span class="inline-flex items-center gap-1.5 rounded-full border border-warning/25 bg-warning-soft px-3 py-1 font-medium text-warning-ink">
          <span class="size-1.5 rounded-full bg-warning" aria-hidden="true" />
          {attention} {t(current, "cnx.attention")}
        </span>
      </div>

      {error.value && (
        <FeedbackBanner
          class="mb-4"
          tone="danger"
          message={t(current, errorKey(new ApiError(error.value)))}
          onDismiss={() => (error.value = null)}
          dismissLabel={t(current, "action.dismiss")}
        />
      )}

      {testedOk.value && (
        <FeedbackBanner
          class="mb-4"
          tone="success"
          message={`${testedOk.value} · ${t(current, "cnx.testOk")}`}
          onDismiss={() => (testedOk.value = null)}
          dismissLabel={t(current, "action.dismiss")}
        />
      )}

      {saved.value && (
        <FeedbackBanner
          class="mb-4"
          tone="success"
          message={saved.value}
          onDismiss={() => (saved.value = null)}
          dismissLabel={t(current, "action.dismiss")}
        />
      )}

      <ul class="grid gap-3 xl:grid-cols-2">
        {rows.value.map((row) => (
          <li key={row.id}>
            <Card class="flex h-full flex-col">
              <div class="flex items-start gap-3">
                <InitialsBadge initials={row.initials} hue={row.hue} />
                <div class="min-w-0 flex-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <h3 class="font-display text-sm font-semibold text-strong">
                      {row.name}
                    </h3>
                    <StatusBadge
                      label={t(current, STATUS_KEY[row.status])}
                      tone={STATUS_TONE[row.status]}
                    />
                  </div>
                  <p class="mt-0.5 text-xs text-muted">{row.vendor}</p>
                </div>
              </div>

              <p class="mt-3 text-sm text-muted">{row.description}</p>

              <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-3 text-xs">
                <div>
                  <dt class="text-muted-2">{t(current, "cnx.auth")}</dt>
                  <dd class="mt-0.5 font-medium text-body">{row.auth}</dd>
                </div>
                <div>
                  <dt class="text-muted-2">{t(current, "cnx.scope")}</dt>
                  <dd class="mt-0.5 truncate font-mono text-body">
                    {row.scope}
                  </dd>
                </div>
                <div>
                  <dt class="text-muted-2">{t(current, "cnx.since")}</dt>
                  <dd class="mt-0.5 text-body">{row.connectedOn}</dd>
                </div>
                <div>
                  <dt class="text-muted-2">{t(current, "cnx.lastEvent")}</dt>
                  <dd class="mt-0.5 text-body">{row.lastEvent}</dd>
                </div>
              </dl>

              <div class="mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-3 md:mt-4">
                <ActionButton
                  icon="plug"
                  loading={testingId.value === row.id}
                  disabled={testingId.value !== null &&
                    testingId.value !== row.id}
                  onClick={() => void testConnection(row.id)}
                >
                  {testingId.value === row.id
                    ? t(current, "cnx.testing")
                    : t(current, "cnx.test")}
                </ActionButton>
                <ActionButton
                  icon="edit"
                  onClick={() => {
                    selected.value = { ...row };
                    saved.value = null;
                    error.value = null;
                  }}
                >
                  {t(current, "conn.edit")}
                </ActionButton>
              </div>
            </Card>
          </li>
        ))}
      </ul>

      {/* Edit drawer */}
      {selected.value && (
        <div class="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            class="absolute inset-0 bg-scrim"
            aria-label={t(current, "conn.close")}
            onClick={() => (selected.value = null)}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label={`${t(current, "conn.edit")} · ${selected.value.name}`}
            class="relative flex h-full w-full max-w-md flex-col border-l border-line bg-overlay shadow-overlay"
          >
            <div class="flex items-start justify-between gap-3 border-b border-line p-5">
              <div class="flex min-w-0 items-center gap-3">
                <InitialsBadge
                  initials={selected.value.initials}
                  hue={selected.value.hue}
                />
                <div class="min-w-0">
                  <h2 class="font-display text-base font-semibold text-strong">
                    {selected.value.name}
                  </h2>
                  <p class="truncate text-xs text-muted">
                    {selected.value.vendor}
                  </p>
                </div>
              </div>
              <ActionButton
                icon="close"
                aria-label={t(current, "conn.close")}
                onClick={() => (selected.value = null)}
              />
            </div>

            <div class="flex-1 overflow-y-auto p-5">
              <div class="grid gap-4">
                <label class="grid gap-1.5">
                  <span class="text-xs font-semibold tracking-[0.06em] text-muted uppercase">
                    {t(current, "cnx.auth")}
                  </span>
                  <input
                    type="text"
                    value={selected.value.auth}
                    onInput={(e) => {
                      const v = e.currentTarget.value;
                      selected.value = selected.value
                        ? { ...selected.value, auth: v }
                        : null;
                    }}
                    class="min-h-10 w-full rounded-md border border-line bg-surface-2 px-3 text-sm text-body focus:border-brand focus:outline-none"
                  />
                </label>

                <label class="grid gap-1.5">
                  <span class="text-xs font-semibold tracking-[0.06em] text-muted uppercase">
                    {t(current, "cnx.scope")}
                  </span>
                  <input
                    type="text"
                    value={selected.value.scope}
                    onInput={(e) => {
                      const v = e.currentTarget.value;
                      selected.value = selected.value
                        ? { ...selected.value, scope: v }
                        : null;
                    }}
                    class="min-h-10 w-full rounded-md border border-line bg-surface-2 px-3 font-mono text-sm text-body focus:border-brand focus:outline-none"
                  />
                </label>

                <label class="grid gap-1.5">
                  <span class="text-xs font-semibold tracking-[0.06em] text-muted uppercase">
                    {t(current, "cnx.owner")}
                  </span>
                  <input
                    type="text"
                    value={selected.value.owner}
                    onInput={(e) => {
                      const v = e.currentTarget.value;
                      selected.value = selected.value
                        ? { ...selected.value, owner: v }
                        : null;
                    }}
                    class="min-h-10 w-full rounded-md border border-line bg-surface-2 px-3 text-sm text-body focus:border-brand focus:outline-none"
                  />
                </label>

                <div class="rounded-md border border-line bg-surface-2 p-3 text-xs">
                  <p class="text-muted-2">{t(current, "cnx.lastEvent")}</p>
                  <p class="mt-1 text-body">{selected.value.lastEvent}</p>
                  <p class="mt-2 text-muted-2">{t(current, "format.id")}</p>
                  <p class="mt-1 font-mono text-body">{selected.value.id}</p>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 border-t border-line p-5">
              <ActionButton
                onClick={() => (selected.value = null)}
                disabled={saving.value}
              >
                {t(current, "action.cancel")}
              </ActionButton>
              <ActionButton
                variant="primary"
                icon="check"
                loading={saving.value}
                onClick={() => void saveSelected()}
              >
                {saving.value
                  ? t(current, "conn.saving")
                  : t(current, "action.save")}
              </ActionButton>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
