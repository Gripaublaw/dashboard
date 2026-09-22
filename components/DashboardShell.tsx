/**
 * Layout shell reused by every route.
 *
 * Lives in components/ (not islands/) because it is a pure, non-interactive
 * wrapper: all stateful parts — sidebar, header, tables — are islands.
 */

import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { t, type TranslationKey } from "../lib/i18n.ts";
import Sidebar from "../islands/SidebarNav.tsx";
import Header from "../islands/Header.tsx";

export interface DashboardShellProps {
  /** current route path, used for the active sidebar destination */
  active: string;
  /** translation key for the page title shown in the header */
  titleKey: TranslationKey;
  ecosystemName?: string;
  children: ComponentChildren;
}

export function DashboardShell(props: DashboardShellProps) {
  return (
    <div class="min-h-dvh bg-base text-body">
      <Head>
        <title>{`${t("ca", props.titleKey)} · Nexus`}</title>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <div class="flex min-h-dvh flex-col lg:flex-row">
        <Sidebar active={props.active} ecosystemName={props.ecosystemName ?? "Nexus"} />
        <div class="flex min-w-0 flex-1 flex-col">
          <Header
            pageTitle={t("ca", props.titleKey)}
            userName="Xavier Font"
            userEmail="marta.ripoll@nexus.cat"
            initials="MR"
          />
          <main class="flex-1 px-4 py-6 sm:px-6 sm:py-8">{props.children}</main>
        </div>
      </div>
    </div>
  );
}

/** Consistent page intro used above the section content. */
export function PageHeading(
  props: { title: string; subtitle: string; actions?: ComponentChildren },
) {
  return (
    <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div class="min-w-0 max-w-2xl">
        <h2 class="font-display text-xl font-semibold tracking-tight text-strong sm:text-2xl">
          {props.title}
        </h2>
        <p class="mt-1 text-sm text-muted">{props.subtitle}</p>
      </div>
      {props.actions && <div class="flex items-center gap-2">{props.actions}</div>}
    </div>
  );
}
