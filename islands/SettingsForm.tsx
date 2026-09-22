/**
 * Configuració island: ecosystem identity form (name, logo, default language)
 * with client-side validation, an in-browser logo preview and a dirty indicator.
 *
 * Submits through lib/api.ts (saveSettings), so it works against local data
 * today and against /api/configuracio once the backend exists.
 */

import { useSignal } from "@preact/signals";
import {
  ApiError,
  errorKey,
  saveSettings,
  type EcosystemSettings,
} from "../lib/api.ts";
import { t } from "../lib/i18n.ts";
import { ActionButton } from "../components/ActionButton.tsx";
import { Card, SectionHeader } from "../components/Card.tsx";
import { FeedbackBanner } from "../components/FeedbackBanner.tsx";
import { Icon } from "../components/Icon.tsx";
import { locale, setLocale } from "./state.ts";

const INPUT =
  "min-h-10 w-full rounded-md border border-line bg-surface-2 px-3 text-sm text-body placeholder:text-muted-2 focus:border-brand focus:outline-none";

const MAX_LOGO_BYTES = 512 * 1024;

export interface SettingsFormProps {
  initialSettings: EcosystemSettings;
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const name = useSignal(initialSettings.name);
  const logoName = useSignal<string | null>(null);
  const logoData = useSignal<string | undefined>(initialSettings.logoDataUrl);
  const defaultLang = useSignal<"ca" | "en">(initialSettings.defaultLocale);
  const savedAt = useSignal<string | null>(null);
  const error = useSignal<string | null>(null);
  const saving = useSignal(false);
  const current = locale.value;

  const dirty = name.value !== initialSettings.name ||
    defaultLang.value !== initialSettings.defaultLocale ||
    logoData.value !== initialSettings.logoDataUrl;

  async function save() {
    if (saving.value) return;
    if (name.value.trim().length < 3) {
      error.value = t(current, "settings.name.required");
      return;
    }
    error.value = null;
    saving.value = true;
    try {
      await saveSettings({
        name: name.value.trim(),
        defaultLocale: defaultLang.value,
        logoDataUrl: logoData.value,
      });
      setLocale(defaultLang.value);
      const now = new Date().toLocaleTimeString(
        current === "ca" ? "ca-ES" : "en-GB",
        { hour: "2-digit", minute: "2-digit" },
      );
      savedAt.value = `${t(current, "settings.savedAt")}${now}`;
    } catch (err) {
      error.value = err instanceof ApiError
        ? t(current, errorKey(err))
        : t(current, "error.unknown");
    } finally {
      saving.value = false;
    }
  }

  /** Rejects oversized files before they ever reach the (future) endpoint. */
  function onPickLogo(e: Event) {
    const input = e.currentTarget as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > MAX_LOGO_BYTES) {
      error.value = t(current, "settings.logoTooBig");
      input.value = "";
      return;
    }
    error.value = null;
    logoName.value = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      logoData.value = typeof reader.result === "string"
        ? reader.result
        : undefined;
    };
    reader.readAsDataURL(file);
  }

  const hasLogo = Boolean(logoData.value) || Boolean(logoName.value);

  return (
    <div class="grid gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <Card class="p-4 sm:p-6">
        <SectionHeader
          title={t(current, "settings.form.title")}
          subtitle={t(current, "settings.subtitle")}
        />

        {error.value && (
          <FeedbackBanner
            class="mt-5"
            tone="danger"
            message={error.value}
            onDismiss={() => (error.value = null)}
            dismissLabel={t(current, "action.dismiss")}
          />
        )}

        {savedAt.value && (
          <FeedbackBanner
            class="mt-5"
            tone="success"
            message={savedAt.value}
            onDismiss={() => (savedAt.value = null)}
            dismissLabel={t(current, "action.dismiss")}
          />
        )}

        <form
          class="mt-6 flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
        >
          <label class="flex flex-col gap-1.5">
            <span class="text-sm font-medium text-body">
              {t(current, "settings.name")}
            </span>
            <input
              type="text"
              value={name.value}
              onInput={(e) => {
                name.value = e.currentTarget.value;
                savedAt.value = null;
              }}
              placeholder="Nexus Ecosistema"
              aria-invalid={error.value ? "true" : undefined}
              class={INPUT}
            />
            <span class="text-xs text-muted-2">
              {t(current, "settings.name.help")}
            </span>
          </label>

          {/* Logo picker — local preview only; upload is a backend concern */}
          <fieldset class="flex flex-col gap-1.5">
            <legend class="mb-1.5 text-sm font-medium text-body">
              {t(current, "settings.logo")}
            </legend>

            <div class="flex flex-wrap items-center gap-4 rounded-md border border-dashed border-line bg-surface-2 p-4">
              <span class="grid size-14 shrink-0 place-items-center overflow-hidden rounded-md border border-line bg-surface">
                {logoData.value
                  ? (
                    <img
                      src={logoData.value}
                      alt={t(current, "settings.logo")}
                      class="size-full object-contain p-1.5"
                    />
                  )
                  : (
                    <Icon name="image" class="size-6 text-brand" />
                  )}
              </span>

              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-body">
                  {logoName.value ?? (logoData.value
                    ? t(current, "settings.logo.current")
                    : t(current, "settings.logo.none"))}
                </p>
                <p class="mt-0.5 text-xs text-muted-2">
                  {t(current, "settings.uploadHint")}
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <label class="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-line bg-surface px-3.5 text-sm font-medium text-body transition-colors hover:border-brand/40 focus-within:border-brand">
                  <Icon name="image" class="size-4" />
                  {t(current, "action.upload")}
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg"
                    class="sr-only"
                    onChange={onPickLogo}
                  />
                </label>
                <ActionButton
                  variant="ghost"
                  disabled={!hasLogo}
                  onClick={() => {
                    logoName.value = null;
                    logoData.value = undefined;
                    savedAt.value = null;
                  }}
                >
                  {t(current, "settings.logo.remove")}
                </ActionButton>
              </div>
            </div>
          </fieldset>

          <label class="flex flex-col gap-1.5">
            <span class="text-sm font-medium text-body">
              {t(current, "settings.defaultLocale")}
            </span>
            <select
              value={defaultLang.value}
              onChange={(e) => {
                defaultLang.value = e.currentTarget.value as "ca" | "en";
                savedAt.value = null;
              }}
              class={INPUT}
            >
              <option value="ca">Català (CA)</option>
              <option value="en">English (EN)</option>
            </select>
            <span class="text-xs text-muted-2">
              {t(current, "settings.lang.help")}
            </span>
          </label>

          <div class="flex flex-wrap items-center gap-3 border-t border-line pt-5">
            <ActionButton
              type="submit"
              variant="primary"
              icon="check"
              loading={saving.value}
            >
              {saving.value
                ? t(current, "settings.saving")
                : t(current, "action.save")}
            </ActionButton>
            {dirty && !saving.value && (
              <span class="text-xs font-medium text-warning-ink">
                {t(current, "settings.dirty")}
              </span>
            )}
          </div>
        </form>
      </Card>

      {/* Live summary panel */}
      <Card class="h-fit p-4 sm:p-5">
        <h3 class="font-display text-sm font-semibold text-strong">
          {t(current, "settings.preview")}
        </h3>
        <div class="mt-4 flex items-center gap-3 rounded-md border border-line bg-surface-2 p-3">
          <span class="grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border border-line bg-surface">
            {logoData.value
              ? (
                <img
                  src={logoData.value}
                  alt=""
                  class="size-full object-contain p-1"
                />
              )
              : (
                <Icon name="image" class="size-5 text-brand" />
              )}
          </span>
          <div class="min-w-0">
            <p class="truncate font-display text-sm font-semibold text-strong">
              {name.value || "—"}
            </p>
            <p class="text-xs text-muted">
              {defaultLang.value === "ca" ? "Català (CA)" : "English (EN)"}
            </p>
          </div>
        </div>

        <dl class="mt-4 grid gap-3 border-t border-line pt-3 text-xs">
          <div class="flex items-center justify-between gap-3">
            <dt class="text-muted-2">{t(current, "settings.identity")}</dt>
            <dd class="truncate font-mono text-body">
              {name.value ? name.value.toLowerCase().replace(/\s+/g, "-") : "—"}
            </dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-muted-2">{t(current, "settings.localisation")}</dt>
            <dd class="text-body">{defaultLang.value.toUpperCase()}</dd>
          </div>
          <div class="flex items-center justify-between gap-3">
            <dt class="text-muted-2">{t(current, "table.status")}</dt>
            <dd class={dirty ? "text-warning-ink" : "text-success-ink"}>
              {dirty
                ? t(current, "settings.dirty")
                : t(current, "state.saved")}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
