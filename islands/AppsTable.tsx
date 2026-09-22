/**
 * Aplicacions table island: status filter, client-side search, create/delete
 * against lib/api.ts, real submitting + error states, no-results state.
 */

import { computed, useSignal } from "@preact/signals";
import type { ComponentChildren } from "preact";
import { t, type TranslationKey } from "../lib/i18n.ts";
import type { AppRow } from "../lib/data.ts";
import { ApiError, createApp, deleteApp, errorKey } from "../lib/api.ts";
import { ActionButton } from "../components/ActionButton.tsx";
import { Card } from "../components/Card.tsx";
import { CELL, DataTable, RowActions } from "../components/DataTable.tsx";
import { EmptyState, InitialsBadge } from "../components/Card.tsx";
import { FeedbackBanner } from "../components/FeedbackBanner.tsx";
import { Modal } from "../components/Modal.tsx";
import { StatusBadge, type StatusTone } from "../components/StatusBadge.tsx";
import { locale } from "./state.ts";

export interface AppsTableProps {
  /** Seed rows come from the route so SSR renders real content. */
  initialRows: AppRow[];
}

const STATUS_TONE: Record<AppRow["status"], StatusTone> = {
  active: "success",
  pending: "warning",
  error: "danger",
  inactive: "neutral",
};

const STATUS_KEY: Record<AppRow["status"], TranslationKey> = {
  active: "status.active",
  pending: "status.pending",
  error: "status.error",
  inactive: "status.inactive",
};

const TYPE_LABEL: Record<AppRow["type"], { ca: string; en: string }> = {
  internal: { ca: "Interna", en: "Internal" },
  client: { ca: "Client", en: "Client-facing" },
  integration: { ca: "Integració", en: "Integration" },
  api: { ca: "API", en: "API" },
};

export default function AppsTable({ initialRows }: AppsTableProps) {
  const query = useSignal("");
  const filter = useSignal<"all" | AppRow["status"]>("all");
  const rows = useSignal<AppRow[]>(initialRows);
  const notice = useSignal<string | null>(null);
  const error = useSignal<string | null>(null);

  // create form
  const formOpen = useSignal(false);
  const formName = useSignal("");
  const formSlug = useSignal("");
  const formType = useSignal<AppRow["type"]>("internal");
  const submitting = useSignal(false);
  const fieldErrors = useSignal<{ name?: string; slug?: string }>({});

  // delete confirmation
  const confirmId = useSignal<string | null>(null);
  const deletingId = useSignal<string | null>(null);

  const current = locale.value;

  const visible = computed(() => {
    const q = query.value.trim().toLowerCase();
    return rows.value.filter((row) => {
      const matchesQ = q === "" ||
        row.name.toLowerCase().includes(q) ||
        row.slug.toLowerCase().includes(q);
      const matchesF = filter.value === "all" || row.status === filter.value;
      return matchesQ && matchesF;
    });
  });

  const filters: { id: "all" | AppRow["status"]; key: TranslationKey }[] = [
    { id: "all", key: "apps.all" },
    { id: "active", key: "status.active" },
    { id: "pending", key: "status.pending" },
    { id: "error", key: "status.error" },
    { id: "inactive", key: "status.inactive" },
  ];

  function closeForm() {
    formOpen.value = false;
    formName.value = "";
    formSlug.value = "";
    formType.value = "internal";
    fieldErrors.value = {};
    error.value = null;
  }

  /** Client-side validation before we ever touch the network. */
  function validate() {
    const next: { name?: string; slug?: string } = {};
    if (formName.value.trim().length < 2) next.name = "error.required";
    if (!/^[\w.-]+(\.\w{2,})+(\/\S*)?$/.test(formSlug.value.trim())) {
      next.slug = "error.slug";
    }
    fieldErrors.value = next;
    return Object.keys(next).length === 0;
  }

  async function submitForm(e: Event) {
    e.preventDefault();
    if (submitting.value) return;
    if (!validate()) return;
    submitting.value = true;
    error.value = null;
    try {
      const created = await createApp({
        name: formName.value.trim(),
        slug: formSlug.value.trim(),
        type: formType.value,
      });
      rows.value = [created, ...rows.value];
      notice.value = `${t(current, "state.saved")} · ${created.name}`;
      closeForm();
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : "unknown";
    } finally {
      submitting.value = false;
    }
  }

  async function confirmDelete() {
    const id = confirmId.value;
    if (!id || deletingId.value) return;
    const target = rows.value.find((r) => r.id === id);
    deletingId.value = id;
    error.value = null;
    try {
      await deleteApp(id);
      rows.value = rows.value.filter((r) => r.id !== id);
      notice.value = `${target?.name ?? ""} — ${t(current, "action.delete")}`;
      confirmId.value = null;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : "unknown";
    } finally {
      deletingId.value = null;
    }
  }

  const busyCell = deletingId.value !== null;

  return (
    <Card class="overflow-hidden">
      <div class="flex flex-wrap items-center gap-3 border-b border-line p-3 sm:p-4">
        <label class="relative min-w-0 flex-1">
          <span class="sr-only">{t(current, "action.search")}</span>
          <span class="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-muted-2">
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M20 20l-3.9-3.9M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0" />
            </svg>
          </span>
          <input
            type="search"
            value={query.value}
            onInput={(e) => (query.value = e.currentTarget.value)}
            placeholder={t(current, "apps.search")}
            class="min-h-10 w-full rounded-md border border-line bg-surface-2 pl-9 pr-3 text-sm text-body placeholder:text-muted-2 focus:border-brand focus:outline-none"
          />
        </label>

        <div
          class="flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label={t(current, "table.status")}
        >
          {filters.map((f) => {
            const on = filter.value === f.id;
            return (
              <button
                type="button"
                key={f.id}
                aria-pressed={on}
                onClick={() => (filter.value = f.id)}
                class={`min-h-9 rounded-full border px-3 text-xs font-medium transition-colors focus-visible:outline-none ${
                  on
                    ? "border-brand/40 bg-brand-soft text-brand-ink"
                    : "border-line bg-surface-2 text-muted hover:text-body"
                }`}
              >
                {t(current, f.key)}
              </button>
            );
          })}
        </div>

        <ActionButton
          variant="primary"
          icon="plus"
          onClick={() => (formOpen.value = true)}
        >
          {t(current, "apps.add")}
        </ActionButton>
      </div>

      {error.value && (
        <FeedbackBanner
          edge
          tone="danger"
          message={t(current, errorKey(new ApiError(error.value)))}
          onDismiss={() => (error.value = null)}
          dismissLabel={t(current, "action.dismiss")}
        />
      )}

      {notice.value && (
        <FeedbackBanner
          edge
          tone="success"
          message={notice.value}
          onDismiss={() => (notice.value = null)}
          dismissLabel={t(current, "action.dismiss")}
        />
      )}

      <DataTable
        caption={t(current, "apps.title")}
        columns={[
          t(current, "table.name"),
          t(current, "table.status"),
          t(current, "table.type"),
          t(current, "table.actions"),
        ]}
        empty={visible.value.length === 0
          ? (
            <EmptyState
              icon="apps"
              title={t(current, "apps.empty.title")}
              body={t(current, "apps.empty.body")}
              action={
                <ActionButton
                  icon="close"
                  onClick={() => {
                    query.value = "";
                    filter.value = "all";
                  }}
                >
                  {t(current, "apps.clear")}
                </ActionButton>
              }
            />
          )
          : undefined}
        footer={
          <>
            <span>
              {t(current, "table.showing")} {visible.value.length}{" "}
              {t(current, "table.of")} {rows.value.length}{" "}
              {t(current, "table.results")}
            </span>
            <span class="font-mono text-[0.6875rem] text-muted-2">
              regió eu-west-1 · desplegament automàtic
            </span>
          </>
        }
        rows={visible.value.map((row) => (
          <tr key={row.id} class="group transition-colors hover:bg-surface-2/70">
            <td class={CELL}>
              <div class="flex items-center gap-3">
                <InitialsBadge initials={row.initials} hue={row.hue} />
                <div class="min-w-0">
                  <p class="truncate font-medium text-strong">{row.name}</p>
                  <p class="truncate font-mono text-xs text-muted">
                    {row.slug} · {row.meta}
                  </p>
                </div>
              </div>
            </td>
            <td class={CELL}>
              <StatusBadge
                label={t(current, STATUS_KEY[row.status])}
                tone={STATUS_TONE[row.status]}
              />
            </td>
            <td class={CELL}>
              <span class="text-sm text-muted">
                {TYPE_LABEL[row.type][current]}
              </span>
            </td>
            <td class={`${CELL} text-right`}>
              <RowActions
                editLabel={t(current, "action.edit")}
                deleteLabel={t(current, "action.delete")}
                viewLabel={t(current, "action.view")}
                busy={busyCell}
                deleting={deletingId.value === row.id}
                onEdit={() => {
                  notice.value = `${row.name} — ${t(current, "form.close")}`;
                  formOpen.value = true;
                  formName.value = row.name;
                  formSlug.value = row.slug;
                  formType.value = row.type;
                }}
                onDelete={() => (confirmId.value = row.id)}
              />
            </td>
          </tr>
        ))}
      />

      <Modal
        open={formOpen.value}
        title={t(current, "form.newApp")}
        description={t(current, "apps.subtitle")}
        onClose={closeForm}
        closeLabel={t(current, "form.close")}
        footer={
          <>
            <ActionButton onClick={closeForm} disabled={submitting.value}>
              {t(current, "action.cancel")}
            </ActionButton>
            <ActionButton
              variant="primary"
              icon="plus"
              type="submit"
              loading={submitting.value}
              onClick={() => {
                const fake = { preventDefault() {} } as unknown as Event;
                void submitForm(fake);
              }}
            >
              {submitting.value
                ? t(current, "state.creating")
                : t(current, "form.submitApp")}
            </ActionButton>
          </>
        }
      >
        <form class="grid gap-4" onSubmit={submitForm}>
          <Field
            label={t(current, "form.appName")}
            error={fieldErrors.value.name &&
              t(current, fieldErrors.value.name as TranslationKey)}
          >
            <input
              type="text"
              value={formName.value}
              onInput={(e) => (formName.value = e.currentTarget.value)}
              placeholder="Nexus Backoffice"
              class={inputClass(!!fieldErrors.value.name)}
            />
          </Field>

          <Field
            label={t(current, "form.appSlug")}
            error={fieldErrors.value.slug &&
              t(current, fieldErrors.value.slug as TranslationKey)}
          >
            <input
              type="text"
              value={formSlug.value}
              onInput={(e) => (formSlug.value = e.currentTarget.value)}
              placeholder="backoffice.nexus.cat"
              class={inputClass(!!fieldErrors.value.slug)}
            />
          </Field>

          <Field label={t(current, "form.appType")}>
            <select
              value={formType.value}
              onChange={(e) =>
                (formType.value = e.currentTarget.value as AppRow["type"])}
              class={inputClass(false)}
            >
              <option value="internal">{TYPE_LABEL.internal[current]}</option>
              <option value="client">{TYPE_LABEL.client[current]}</option>
              <option value="integration">
                {TYPE_LABEL.integration[current]}
              </option>
              <option value="api">{TYPE_LABEL.api[current]}</option>
            </select>
          </Field>
        </form>
      </Modal>

      <Modal
        open={confirmId.value !== null}
        title={t(current, "confirm.deleteApp")}
        description={t(current, "confirm.deleteHint")}
        onClose={() => (confirmId.value = null)}
        closeLabel={t(current, "action.cancel")}
        footer={
          <>
            <ActionButton
              onClick={() => (confirmId.value = null)}
              disabled={deletingId.value !== null}
            >
              {t(current, "action.cancel")}
            </ActionButton>
            <ActionButton
              variant="danger"
              icon="trash"
              loading={deletingId.value !== null}
              onClick={() => void confirmDelete()}
            >
              {deletingId.value !== null
                ? t(current, "state.deleting")
                : t(current, "action.confirm")}
            </ActionButton>
          </>
        }
      >
        <p class="text-sm text-body">
          {rows.value.find((r) => r.id === confirmId.value)?.name}
        </p>
      </Modal>
    </Card>
  );
}

/** Small label + error wrapper shared by the create/edit forms. */
export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string | false;
  hint?: string;
  children: ComponentChildren;
}) {
  return (
    <label class="grid gap-1.5">
      <span class="text-xs font-semibold tracking-[0.06em] text-muted uppercase">
        {label}
      </span>
      {children}
      {error && (
        <span class="text-xs font-medium text-danger-ink">{error}</span>
      )}
      {!error && hint && <span class="text-xs text-muted-2">{hint}</span>}
    </label>
  );
}

/** Shared input skin; `invalid` switches to the danger border. */
export function inputClass(invalid: boolean) {
  return `min-h-10 w-full rounded-md border bg-surface-2 px-3 text-sm text-body placeholder:text-muted-2 focus:outline-none ${
    invalid
      ? "border-danger focus:border-danger"
      : "border-line focus:border-brand"
  }`;
}
