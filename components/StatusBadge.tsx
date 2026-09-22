export type StatusTone = "success" | "info" | "warning" | "danger" | "neutral";

const TONES: Record<StatusTone, { chip: string; dot: string }> = {
  success: {
    chip: "bg-success-soft text-success-ink border-success/30",
    dot: "bg-success",
  },
  info: { chip: "bg-brand-soft text-brand-ink border-brand/30", dot: "bg-brand" },
  warning: {
    chip: "bg-warning-soft text-warning-ink border-warning/30",
    dot: "bg-warning",
  },
  danger: {
    chip: "bg-danger-soft text-danger-ink border-danger/30",
    dot: "bg-danger",
  },
  neutral: { chip: "bg-surface-2 text-muted border-line", dot: "bg-muted-2" },
};

export interface StatusBadgeProps {
  /** already-translated label */
  label: string;
  tone?: StatusTone;
}

/** Small pill with a status dot. Used in tables, lists and activity. */
export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  const t = TONES[tone];
  return (
    <span
      class={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap ${t.chip}`}
    >
      <span class={`size-1.5 rounded-full ${t.dot}`} />
      {label}
    </span>
  );
}
