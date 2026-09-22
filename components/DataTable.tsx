import type { ComponentChildren } from "preact";

/**
 * Responsive table shell.
 *
 * The `columns` array only contains the column labels: rows are handed in as
 * pre-composed cells so each screen keeps its own badge/action markup.
 * Below `lg` the table becomes a stack of labelled cards, driven by the
 * `data-label` attribute set on every cell.
 */
export interface DataTableProps {
  columns: string[];
  /** one <tr> per record, each containing one cell per column */
  rows: ComponentChildren;
  caption?: string;
  footer?: ComponentChildren;
  /** renders a wide no-results row instead of the table body */
  empty?: ComponentChildren;
}

export function DataTable(props: DataTableProps) {
  return (
    <>
      {/* small screens: labelled cards */}
      <div class="lg:hidden">
        {props.empty
          ? <div class="border-t border-line">{props.empty}</div>
          : <ul class="divide-y divide-[var(--color-line)]">{props.rows}</ul>}
      </div>

      {/* large screens: real table */}
      <div class="hidden overflow-x-auto lg:block">
        <table class="w-full min-w-[42rem] border-collapse text-sm">
          {props.caption && <caption class="sr-only">{props.caption}</caption>}
          <thead>
            <tr class="border-b border-line bg-surface-2/60 text-left">
              {props.columns.map((col, i) => (
                <th
                  scope="col"
                  class={`px-4 py-3 text-xs font-semibold tracking-wide text-muted uppercase ${
                    i === props.columns.length - 1 ? "text-right" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="divide-y divide-[var(--color-line)]">
            {props.empty
              ? (
                <tr>
                  <td colspan={props.columns.length}>{props.empty}</td>
                </tr>
              )
              : props.rows}
          </tbody>
        </table>
      </div>

      {props.footer && (
        <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted">
          {props.footer}
        </div>
      )}
    </>
  );
}

/** Utility class string for a body cell (also used for mobile cards). */
export const CELL = "px-4 py-3 align-middle text-body";

export interface RowActionsProps {
  editLabel: string;
  deleteLabel: string;
  viewLabel?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  /** disables every action in the row while a request is in flight */
  busy?: boolean;
  /** shows a spinner on the delete button specifically */
  deleting?: boolean;
}

/**
 * Edit / delete / optional view icon buttons. Rendered as buttons (no fake
 * href) and hidden until row hover on pointer devices, always visible on touch.
 */
export function RowActions(props: RowActionsProps) {
  const base =
    "grid size-8 place-items-center rounded-md border border-line text-muted transition-colors hover:border-brand/40 hover:bg-brand-soft hover:text-brand-ink focus-visible:border-brand focus-visible:text-brand-ink focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-line disabled:hover:bg-transparent disabled:hover:text-muted";

  return (
    <div class="flex items-center justify-end gap-1.5 lg:opacity-70 lg:transition-opacity lg:group-hover:opacity-100">
      {props.viewLabel && (
        <button
          type="button"
          class={base}
          title={props.viewLabel}
          disabled={props.busy}
          onClick={props.onView}
        >
          <span class="sr-only">{props.viewLabel}</span>
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
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      )}
      <button
        type="button"
        class={base}
        title={props.editLabel}
        disabled={props.busy}
        onClick={props.onEdit}
      >
        <span class="sr-only">{props.editLabel}</span>
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
          <path d="M4 20h4l10-10-4-4L4 16zM14.5 5.5l4 4" />
        </svg>
      </button>
      <button
        type="button"
        class={`${base} hover:border-danger/40 hover:bg-danger-soft hover:text-danger-ink`}
        title={props.deleteLabel}
        disabled={props.busy}
        aria-busy={props.deleting ? "true" : undefined}
        onClick={props.onDelete}
      >
        <span class="sr-only">{props.deleteLabel}</span>
        {props.deleting
          ? (
            <svg
              class="size-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M12 3a9 9 0 1 0 9 9" />
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
              <path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l.9 12.2A1.8 1.8 0 0 0 9.2 21h5.6a1.8 1.8 0 0 0 1.8-1.8L17.5 7M10.5 11v6M13.5 11v6" />
            </svg>
          )}
      </button>
    </div>
  );
}
