/**
 * FeedbackBanner — one place for submit results and errors.
 *
 * Renders a live region so screen readers announce success and failure without
 * the island needing its own markup. Pair with `errorKey()` from lib/api.ts.
 */

export type BannerTone = "success" | "danger" | "warning" | "info";

const TONE: Record<BannerTone, { wrap: string; icon: string; glyph: string }> = {
  success: {
    wrap: "bg-success-soft text-success-ink border-success/25",
    icon: "text-success",
    glyph: "M4 12.5l5 5L20 6.5",
  },
  danger: {
    wrap: "bg-danger-soft text-danger-ink border-danger/25",
    icon: "text-danger",
    glyph: "M12 8v5M12 16.5h.01M10.3 3.9L2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
  },
  warning: {
    wrap: "bg-warning-soft text-warning-ink border-warning/25",
    icon: "text-warning",
    glyph: "M12 8v5M12 16.5h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  },
  info: {
    wrap: "bg-brand-soft text-brand-ink border-brand/25",
    icon: "text-brand",
    glyph: "M12 11v6M12 7.5h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z",
  },
};

export interface FeedbackBannerProps {
  tone: BannerTone;
  message: string;
  onDismiss?: () => void;
  dismissLabel?: string;
  /** Stretch to the container edges (used at the top of a table card). */
  edge?: boolean;
  class?: string;
}

export function FeedbackBanner({
  tone,
  message,
  onDismiss,
  dismissLabel = "Dismiss",
  edge = false,
  class: extra = "",
}: FeedbackBannerProps) {
  const skin = TONE[tone];
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      aria-live={tone === "danger" ? "assertive" : "polite"}
      class={`flex items-center gap-2.5 border-line text-xs font-medium ${skin.wrap} ${
        edge ? "border-b px-4 py-2.5" : "rounded-md border px-3 py-2"
      } ${extra}`}
    >
      <svg
        class={`size-4 shrink-0 ${skin.icon}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d={skin.glyph} />
      </svg>
      <span class="min-w-0">{message}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          class="-mr-1 ml-auto grid size-6 shrink-0 place-items-center rounded text-current/70 transition-colors hover:bg-black/10 hover:text-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current"
        >
          <svg
            class="size-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default FeedbackBanner;
