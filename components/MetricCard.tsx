import { Icon, type IconName } from "./Icon.tsx";

const TONES = {
  brand: "bg-brand-soft text-brand-ink",
  success: "bg-success-soft text-success-ink",
  warning: "bg-warning-soft text-warning-ink",
  danger: "bg-danger-soft text-danger-ink",
  neutral: "bg-surface-2 text-muted",
} as const;

export type MetricTone = keyof typeof TONES;

export interface MetricCardProps {
  label: string;
  value: string;
  /** small suffix shown next to the value, e.g. "99,94 %" */
  unit?: string;
  hint: string;
  icon: IconName;
  tone?: MetricTone;
  /** tiny inline trend/status text, e.g. "Operatiu" */
  chip?: string;
}

/** KPI card used by the Inici section (reusable anywhere). */
export function MetricCard(props: MetricCardProps) {
  const tone = props.tone ?? "brand";
  return (
    <article class="rounded-lg border border-line bg-surface p-4 shadow-card sm:p-5">
      <div class="flex items-start justify-between gap-3">
        <p class="text-[0.8125rem] font-medium text-muted">{props.label}</p>
        <span
          class={`grid size-8 shrink-0 place-items-center rounded-md ${TONES[tone]}`}
        >
          <Icon name={props.icon} class="size-4" />
        </span>
      </div>
      <p class="mt-3 flex items-baseline gap-1 font-display text-2xl font-semibold tracking-tight text-strong sm:text-3xl">
        {props.value}
        {props.unit && (
          <span class="text-base font-medium text-muted">{props.unit}</span>
        )}
      </p>
      <p class="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        {props.chip && (
          <span class={`rounded-full px-2 py-0.5 font-medium ${TONES[tone]}`}>
            {props.chip}
          </span>
        )}
        <span>{props.hint}</span>
      </p>
    </article>
  );
}
