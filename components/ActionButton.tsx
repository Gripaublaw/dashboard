import type { ComponentChildren } from "preact";
import { Icon, type IconName } from "./Icon.tsx";

export interface ActionButtonProps {
  /** visually emphasised (brand fill) */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: IconName;
  type?: "button" | "submit";
  disabled?: boolean;
  /** swaps the leading icon for a spinner and sets aria-busy */
  loading?: boolean;
  class?: string;
  onClick?: () => void;
  "aria-label"?: string;
  children?: ComponentChildren;
}

const VARIANTS = {
  primary:
    "border border-transparent bg-brand text-brand-contrast hover:bg-brand-strong",
  secondary:
    "border border-line bg-surface text-body hover:border-brand/40 hover:bg-surface-2",
  ghost: "border border-transparent text-muted hover:bg-surface-2 hover:text-body",
  danger:
    "border border-danger/35 bg-danger-soft text-danger-ink hover:border-danger/60",
} as const;

/** Single button primitive shared by every section (>= 40px tall). */
export function ActionButton(props: ActionButtonProps) {
  const variant = props.variant ?? "secondary";
  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled ?? props.loading}
      aria-busy={props.loading ? "true" : undefined}
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      class={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3.5 py-2 text-sm font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55 ${
        VARIANTS[variant]
      } ${props.class ?? ""}`}
    >
      {props.loading
        ? (
          <svg
            class="size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M12 3a9 9 0 1 0 9 9" />
          </svg>
        )
        : props.icon && <Icon name={props.icon} class="size-4" />}
      {props.children}
    </button>
  );
}
