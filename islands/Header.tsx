/**
 * Top header island: search, language switch, theme switch and account menu.
 * The language and theme controls live in their own islands so both can be
 * reused elsewhere; this island only owns the account dropdown.
 */

import { useSignal } from "@preact/signals";
import { t } from "../lib/i18n.ts";
import { Icon } from "../components/Icon.tsx";
import { locale } from "./state.ts";
import LocaleSwitch from "./LocaleSwitch.tsx";
import ThemeToggle from "./ThemeToggle.tsx";

export interface HeaderProps {
  pageTitle: string;
  userName: string;
  userEmail: string;
  initials: string;
}

export default function Header(
  { pageTitle, userName, userEmail, initials }: HeaderProps,
) {
  const menu = useSignal(false);
  const current = locale.value;

  return (
    <header class="flex flex-wrap items-center gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
      <div class="min-w-0 flex-1">
        <p class="text-xs font-medium tracking-wide text-muted uppercase">
          {t(current, "app.tagline")}
        </p>
        <h1 class="truncate font-display text-lg font-semibold text-strong">
          {pageTitle}
        </h1>
      </div>

      <label class="relative hidden md:block">
        <span class="sr-only">{t(current, "action.search")}</span>
        <span class="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-muted-2">
          <Icon name="search" class="size-4" />
        </span>
        <input
          type="search"
          placeholder={t(current, "apps.search")}
          class="min-h-10 w-56 rounded-md border border-line bg-surface-2 pl-9 pr-3 text-sm text-body placeholder:text-muted-2 focus:border-brand focus:outline-none lg:w-64"
        />
      </label>

      <div class="flex items-center gap-2">
        <LocaleSwitch />
        <ThemeToggle />

        <div class="relative">
          <button
            type="button"
            onClick={() => (menu.value = !menu.value)}
            aria-expanded={menu.value}
            aria-haspopup="menu"
            class="flex min-h-10 items-center gap-2 rounded-md border border-line bg-surface-2 px-2 py-1.5 text-left transition-colors hover:border-brand/40 focus-visible:outline-none"
          >
            <span class="grid size-7 shrink-0 place-items-center rounded-md bg-brand-soft text-[0.6875rem] font-semibold text-brand-ink">
              {initials}
            </span>
            <span class="hidden min-w-0 sm:block">
              <span class="block max-w-[9rem] truncate text-xs font-semibold text-strong">
                {userName}
              </span>
              <span class="block text-[0.6875rem] text-muted">
                {t(current, "header.role")}
              </span>
            </span>
            <svg
              class="size-4 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {menu.value && (
            <>
              <button
                type="button"
                class="fixed inset-0 z-40 cursor-default"
                aria-hidden="true"
                tabindex={-1}
                onClick={() => (menu.value = false)}
              />
              <div
                role="menu"
                class="absolute right-0 z-50 mt-2 w-64 rounded-lg border border-line bg-overlay p-1.5 shadow-overlay"
              >
                <div class="border-b border-line px-3 py-2.5">
                  <p class="truncate text-sm font-semibold text-strong">
                    {userName}
                  </p>
                  <p class="truncate text-xs text-muted">{userEmail}</p>
                </div>
                <a
                  href="/configuracio"
                  role="menuitem"
                  class="flex min-h-10 items-center gap-2.5 rounded-md px-3 py-2 text-sm text-body hover:bg-surface-2"
                >
                  <Icon name="settings" class="size-4 text-muted" />
                  {t(current, "nav.settings")}
                </a>
                <a
                  href="/usuaris"
                  role="menuitem"
                  class="flex min-h-10 items-center gap-2.5 rounded-md px-3 py-2 text-sm text-body hover:bg-surface-2"
                >
                  <Icon name="users" class="size-4 text-muted" />
                  {t(current, "nav.users")}
                </a>
                <div class="my-1 border-t border-line" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => (menu.value = false)}
                  class="flex min-h-10 w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-danger-ink hover:bg-danger-soft"
                >
                  <Icon name="logout" class="size-4" />
                  {t(current, "header.logout")}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
