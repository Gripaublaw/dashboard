import type { ComponentChildren } from "preact";
import { Icon, type IconName } from "./Icon.tsx";

/** Card surface: the single place that defines panel chrome. */
export function Card(
  props: { class?: string; children?: ComponentChildren },
) {
  return (
    <section
      class={`rounded-lg border border-line bg-surface shadow-card ${
        props.class ?? ""
      }`}
    >
      {props.children}
    </section>
  );
}

/** Section heading + optional subtitle and trailing actions. */
export function SectionHeader(props: {
  title: string;
  subtitle?: string;
  actions?: ComponentChildren;
  class?: string;
}) {
  return (
    <div
      class={`flex flex-wrap items-start justify-between gap-3 ${
        props.class ?? ""
      }`}
    >
      <div class="min-w-0">
        <h2 class="font-display text-base font-semibold text-strong">
          {props.title}
        </h2>
        {props.subtitle && (
          <p class="mt-1 text-sm text-muted">{props.subtitle}</p>
        )}
      </div>
      {props.actions && <div class="flex items-center gap-2">{props.actions}</div>}
    </div>
  );
}

/**
 * Small square avatar with initials. Used for users, apps and connections so
 * no bitmap assets are required.
 */
export function InitialsBadge(props: {
  initials: string;
  hue: number;
  class?: string;
}) {
  return (
    <span
      aria-hidden="true"
      class={`grid size-9 shrink-0 place-items-center rounded-md text-xs font-semibold ${
        props.class ?? ""
      }`}
      style={`background-color: color-mix(in oklab, var(--color-hue-${props.hue}) 22%, transparent); color: var(--color-hue-${props.hue}-ink);`}
    >
      {props.initials}
    </span>
  );
}

/** Empty / no-results state for tables and lists. */
export function EmptyState(props: {
  icon?: IconName;
  title: string;
  body: string;
  action?: ComponentChildren;
}) {
  return (
    <div class="flex flex-col items-center px-6 py-14 text-center">
      <span class="grid size-11 place-items-center rounded-full border border-line bg-surface-2 text-muted">
        <Icon name={props.icon ?? "search"} class="size-5" />
      </span>
      <h3 class="mt-4 font-display text-base font-semibold text-strong">
        {props.title}
      </h3>
      <p class="mt-1 max-w-sm text-sm text-muted">{props.body}</p>
      {props.action && <div class="mt-4">{props.action}</div>}
    </div>
  );
}
