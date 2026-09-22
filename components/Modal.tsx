/**
 * Modal — controlled dialog shell used by the create/edit forms.
 *
 * Escape closes, the backdrop closes, and the first field receives focus. Keep
 * one <Modal> per island so the open/closed signal stays local to that table.
 */

import { useEffect, useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { Icon } from "./Icon.tsx";

export interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  closeLabel?: string;
  /** Footer actions; rendered on the right with a top divider. */
  footer?: ComponentChildren;
  children: ComponentChildren;
}

export function Modal({
  open,
  title,
  description,
  onClose,
  closeLabel = "Close",
  footer,
  children,
}: ModalProps) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const first = panel.current?.querySelector<HTMLElement>(
      "input, select, textarea, button",
    );
    first?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      class="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <div
        class="absolute inset-0 bg-scrim"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        class="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-lg border border-line bg-surface shadow-pop sm:rounded-lg"
      >
        <div class="flex items-start gap-3 border-b border-line p-4 sm:p-5">
          <div class="min-w-0 flex-1">
            <h2 class="font-display text-lg font-semibold text-strong">
              {title}
            </h2>
            {description && (
              <p class="mt-1 text-sm text-muted">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            class="grid size-9 shrink-0 place-items-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-body focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand"
          >
            <Icon name="close" class="size-4" />
          </button>
        </div>

        <div class="p-4 sm:p-5">{children}</div>

        {footer && (
          <div class="flex flex-wrap items-center justify-end gap-2 border-t border-line p-4 sm:p-5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
