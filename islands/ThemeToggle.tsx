/**
 * Dark/light theme toggle island.
 * Dark is the default; the active theme is written to <html class="dark">
 * by the effect in islands/state.ts, which is what the Tailwind tokens use.
 */

import { t } from "../lib/i18n.ts";
import { locale, theme, toggleTheme } from "./state.ts";

export default function ThemeToggle() {
  const isDark = theme.value === "dark";
  const label = isDark ? t(locale.value, "header.theme.toLight") : t(
    locale.value,
    "header.theme.toDark",
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      title={label}
      class="inline-flex min-h-10 items-center gap-2 rounded-md border border-line bg-surface-2 px-2.5 text-xs font-medium text-muted transition-colors hover:text-body focus-visible:outline-none"
    >
      <span class="sr-only">{label}</span>
      <span class="grid size-6 place-items-center rounded-[5px] bg-surface text-body">
        {isDark
          ? (
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8" />
            </svg>
          )
          : (
            <svg
              class="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.4v2M12 19.6v2M4.6 4.6 6 6M18 18l1.4 1.4M2.4 12h2M19.6 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
            </svg>
          )}
      </span>
      <span class="hidden sm:inline" aria-hidden="true">
        {isDark
          ? t(locale.value, "header.theme.dark")
          : t(locale.value, "header.theme.light")}
      </span>
    </button>
  );
}
