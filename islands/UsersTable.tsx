/**
 * Usuaris table island: role/status filtering, invite form, delete confirmation
 * and real submit/error states. Structurally mirrors AppsTable so both share
 * the same components and the same lib/api.ts contract.
 */

import { computed, useSignal } from "@preact/signals";
import { t, type TranslationKey } from "../lib/i18n.ts";
import type { UserRow } from "../lib/data.ts";
import { ApiError, createUser, deleteUser, errorKey } from "../lib/api.ts";
import { ActionButton } from "../components/ActionButton.tsx";
import { Card, EmptyState, InitialsBadge } from "../components/Card.tsx";
import { CELL, DataTable, RowActions } from "../components/DataTable.tsx";
import { FeedbackBanner } from "../components/FeedbackBanner.tsx";
import { Modal } from "../components/Modal.tsx";
import { StatusBadge, type StatusTone } from "../components/StatusBadge.tsx";
import { Field, inputClass } from "./AppsTable.tsx";
import { locale } from "./state.ts";

export interface UsersTableProps {
  initialRows: UserRow[];
}

const STATUS_TONE: Record<UserRow["status"], StatusTone> = {
  active: "success",
  invited: "info",
  suspended: "danger",
};

const STATUS_KEY: Record<UserRow["status"], TranslationKey> = {
  active: "status.active",
  invited: "status.invited",
  suspended: "status.suspended",
};

const ROLE_KEY: Record<UserRow["role"], TranslationKey> = {
  admin: "role.admin",
  editor: "role.editor",
  viewer: "role.viewer",
  auditor: "role.auditor",
};

export default function UsersTable({ initialRows }: UsersTableProps) {
  const query = useSignal("");
  const filter = useSignal<"all" | UserRow["status"]>("all");
  const rows = useSignal<UserRow[]>(initialRows);
  const notice = useSignal<string | null>(null);
  const error = useSignal<string | null>(null);

  const formOpen = useSignal(false);
  const formName = useSignal("");
  const formEmail = useSignal("");
  const formRole = useSignal<UserRow["role"]>("viewer");
  const submitting = useSignal(false);
  const fieldErrors = useSignal<{ name?: string; email?: string }>({});

  const confirmId = useSignal<string | null>(null);
  const deletingId = useSignal<string | null>(null);

  const current = locale.value;

  const visible = computed(() => {
    const q = query.value.trim().toLowerCase();
    return rows.value.filter((row) => {
      const matchesQ = q === "" ||
        row.name.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q);
      const matchesF = filter.value === "all" || row.status === filter.value;
      return matchesQ && matchesF;
    });
  });

  const filters: { id: "all" | UserRow["status"]; key: TranslationKey }[] = [
    { id: "all", key: "apps.all" },
    { id: "active", key: "status.active" },
    { id: "invited", key: "status.invited" },
    { id: "suspended", key: "status.suspended" },
  ];

  function closeForm() {
    formOpen.value = false;
    formName.value = "";
    formEmail.value = "";
    formRole.value = "viewer";
    fieldErrors.value = {};
    error.value = null;
  }

  function validate() {
    const next: { name?: string; email?: string } = {};
    if (formName.value.trim().length < 2) next.name = "error.required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formEmail.value.trim())) {
      next.email = "error.email";
    }
    fieldErrors.value = next;
    return Object.keys(next).length === 0;
  }

  async function submitForm(e: Event) {
    e.preventDefault();
    if (submitting.value || !validate()) return;
    submitting.value = true;
    error.value = null;
    try {
      const created = await createUser({
        name: formName.value.trim(),
        email: formEmail.value.trim(),
        role: formRole.value,
      });
      rows.value = [created, ...rows.value];
      notice.value = `${t(current, "users.invited")} · ${created.email}`;
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
      await deleteUser(id);
      rows.value = rows.value.filter((r) => r.id !== id);
      notice.value = `${target?.name ?? ""} — ${t(current, "users.deactivated")}`;
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
            placeholder={t(current, "users.search")}
            class="min-h-10 w-full rounded-md border border-line bg-surface-2 pl-9 pr-3 text-sm text-body placeholder:text-muted-2 focus:border-brand focus:outline-none"
          />
        </label>

        <div class="flex flex-wrap items-center gap-1.5" role="group">
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
          {t(current, "users.add")}
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
        caption={t(current, "users.title")}
        columns={[
          t(current, "table.name"),
          t(current, "table.role"),
          t(current, "table.status"),
          t(current, "table.actions"),
        ]}
        empty={visible.value.length === 0
          ? (
            <EmptyState
              icon="users"
              title={t(current, "users.empty.title")}
              body={t(current, "users.empty.body")}
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
            <span class="text-muted-2">
              {t(current, "table.updated")}: fa 12 min
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
                  <p class="truncate text-xs text-muted">{row.email}</p>
                </div>
              </div>
            </td>
            <td class={CELL}>
              <span class="rounded border border-line bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">
                {t(current, ROLE_KEY[row.role])}
              </span>
            </td>
            <td class={CELL}>
              <div class="flex flex-col items-start gap-1">
                <StatusBadge
                  label={t(current, STATUS_KEY[row.status])}
                  tone={STATUS_TONE[row.status]}
                />
                <span class="text-xs text-muted-2">{row.lastSeen}</span>
              </div>
            </td>
            <td class={`${CELL} text-right`}>
              <RowActions
                editLabel={t(current, "action.edit")}
                deleteLabel={t(current, "action.delete")}
                busy={busyCell}
                deleting={deletingId.value === row.id}
                onEdit={() => {
                  formOpen.value = true;
                  formName.value = row.name;
                  formEmail.value = row.email;
                  formRole.value = row.role;
                }}
                onDelete={() => (confirmId.value = row.id)}
              />
            </td>
          </tr>
        ))}
      />

      <Modal
        open={formOpen.value}
        title={t(current, "form.newUser")}
        description={t(current, "users.subtitle")}
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
              loading={submitting.value}
              onClick={() => {
                const fake = { preventDefault() {} } as unknown as Event;
                void submitForm(fake);
              }}
            >
              {submitting.value
                ? t(current, "state.creating")
                : t(current, "form.submitUser")}
            </ActionButton>
          </>
        }
      >
        <form class="grid gap-4" onSubmit={submitForm}>
          <Field
            label={t(current, "form.userName")}
            error={fieldErrors.value.name &&
              t(current, fieldErrors.value.name as TranslationKey)}
          >
            <input
              type="text"
              value={formName.value}
              onInput={(e) => (formName.value = e.currentTarget.value)}
              placeholder="Núria Camps"
              class={inputClass(!!fieldErrors.value.name)}
            />
          </Field>

          <Field
            label={t(current, "form.userEmail")}
            error={fieldErrors.value.email &&
              t(current, fieldErrors.value.email as TranslationKey)}
          >
            <input
              type="email"
              value={formEmail.value}
              onInput={(e) => (formEmail.value = e.currentTarget.value)}
              placeholder="nom.cognom@nexus.cat"
              class={inputClass(!!fieldErrors.value.email)}
            />
          </Field>

          <Field label={t(current, "form.userRole")}>
            <select
              value={formRole.value}
              onChange={(e) =>
                (formRole.value = e.currentTarget.value as UserRow["role"])}
              class={inputClass(false)}
            >
              <option value="admin">{t(current, "role.admin")}</option>
              <option value="editor">{t(current, "role.editor")}</option>
              <option value="viewer">{t(current, "role.viewer")}</option>
              <option value="auditor">{t(current, "role.auditor")}</option>
            </select>
          </Field>
        </form>
      </Modal>

      <Modal
        open={confirmId.value !== null}
        title={t(current, "confirm.deleteUser")}
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
          {rows.value.find((r) => r.id === confirmId.value)?.email}
        </p>
      </Modal>
    </Card>
  );
}
