/**
 * Sidebar navigation island.
 *
 * Receives the active route as a prop from the server-rendered shell, so the
 * active destination is correct on first paint. Collapses into a drawer on
 * viewports below `lg`.
 */

import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { t, type TranslationKey } from "../lib/i18n.ts";
import { Icon, type IconName } from "../components/Icon.tsx";
import { locale } from "./state.ts";

export interface NavItem {
  href: string;
  key: TranslationKey;
  icon: IconName;
}

export const NAV_SECTIONS: { title?: TranslationKey; items: NavItem[] }[] = [
  {
    items: [
      { href: "/", key: "nav.home", icon: "home" },
      { href: "/apps", key: "nav.apps", icon: "apps" },
      { href: "/usuaris", key: "nav.users", icon: "users" },
    ],
  },
  {
    title: "nav.section.system",
    items: [
      { href: "/connexions", key: "nav.connections", icon: "connections" },
      { href: "/configuracio", key: "nav.settings", icon: "settings" },
    ],
  },
];

export interface SidebarProps {
  active: string;
  ecosystemName: string;
}

export default function Sidebar({ active, ecosystemName }: SidebarProps) {
  const open = useSignal(false);
  const current = locale.value;

  // Close the drawer whenever the route changes.
  useEffect(() => {
    open.value = false;
  }, [active]);

  const isActive = (href: string) =>
    href === "/" ? active === "/" : active.startsWith(href);

  const nav = (
    <nav class="flex flex-1 flex-col gap-6" aria-label="Principal / Main">
      {NAV_SECTIONS.map((section, i) => (
        <div key={i}>
          {section.title && (
            <p class="mb-2 px-3 text-[0.6875rem] font-semibold tracking-widest text-muted-2 uppercase">
              {t(current, section.title)}
            </p>
          )}
          <ul class="flex flex-col gap-1">
            {section.items.map((item) => {
              const activeItem = isActive(item.href);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={activeItem ? "page" : undefined}
                    class={`flex min-h-10 items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      activeItem
                        ? "bg-brand-soft font-semibold text-brand-ink"
                        : "font-medium text-muted hover:bg-surface-2 hover:text-body"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      class={`size-[1.125rem] shrink-0 ${
                        activeItem ? "text-brand" : ""
                      }`}
                    />
                    {t(current, item.key)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const brand = (
    <div class="flex items-center gap-3 px-3 py-1">
      <span class="grid size-9 shrink-0 place-items-center rounded-md bg-brand text-sm font-bold text-brand-contrast">
        NX
      </span>
      <span class="min-w-0">
        <span class="block truncate font-display text-sm font-semibold text-strong">
          {ecosystemName}
        </span>
        <span class="block truncate text-xs text-muted">
          {t(current, "app.tagline")}
        </span>
      </span>
    </div>
  );

  const envBox = (
    <div class="rounded-md border border-line bg-surface-2 px-3 py-2.5">
      <p class="flex items-center gap-2 text-xs font-medium text-body">
        <span class="size-1.5 rounded-full bg-success" />
        {t(current, "app.env")}
      </p>
      <p class="mt-1 font-mono text-[0.6875rem] text-muted">
        nexus.cat · regió eu-west-1
      </p>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div class="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
        <div class="flex min-w-0 items-center gap-3">
          <span class="grid size-9 shrink-0 place-items-center rounded-md bg-brand text-sm font-bold text-brand-contrast">
            NX
          </span>
          <span class="truncate font-display text-sm font-semibold text-strong">
            {ecosystemName}
          </span>
        </div>
        <button
          type="button"
          onClick={() => (open.value = !open.value)}
          class="grid size-10 place-items-center rounded-md border border-line bg-surface-2 text-body"
          aria-expanded={open.value}
          aria-controls="sidebar-drawer"
        >
          <span class="sr-only">
            {open.value
              ? t(current, "nav.closeMenu")
              : t(current, "nav.openMenu")}
          </span>
          <Icon name={open.value ? "close" : "menu"} class="size-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside class="hidden w-[15.5rem] shrink-0 flex-col gap-5 border-r border-line bg-surface p-3 lg:sticky lg:top-0 lg:flex lg:h-dvh">
        {brand}
        {nav}
        {envBox}
      </aside>

      {/* Mobile drawer */}
      {open.value && (
        <div class="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            class="absolute inset-0 bg-scrim backdrop-blur-[2px]"
            aria-label={t(current, "nav.closeMenu")}
            onClick={() => (open.value = false)}
          />
          <div
            id="sidebar-drawer"
            class="absolute inset-y-0 left-0 flex w-[17rem] max-w-[85vw] flex-col gap-5 border-r border-line bg-surface p-3 shadow-overlay"
          >
            <div class="flex items-center justify-between gap-2">
              {brand}
              <button
                type="button"
                onClick={() => (open.value = false)}
                class="grid size-9 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-muted"
              >
                <span class="sr-only">{t(current, "nav.closeMenu")}</span>
                <Icon name="close" class="size-4" />
              </button>
            </div>
            {nav}
            {envBox}
          </div>
        </div>
      )}
    </>
  );
}
