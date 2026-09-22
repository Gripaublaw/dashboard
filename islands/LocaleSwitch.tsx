/**
 * Tiny island that exposes the current locale to the rest of the page.
 * It renders nothing visible; other islands (sidebar, header, tables) import
 * the same `locale` signal from `islands/state.ts`, so switching CA/EN
 * re-renders every island on the page at once.
 */

import { locale, setLocale } from "./state.ts";
import { LOCALES, LOCALE_LABEL } from "../lib/i18n.ts";

export default function LocaleSwitch() {
  return (
    <div
      class="inline-flex items-center rounded-md border border-line bg-surface-2 p-0.5"
      role="group"
      aria-label="Language / Idioma"
    >
      {LOCALES.map((code) => {
        const active = locale.value === code;
        return (
          <button
            type="button"
            key={code}
            aria-pressed={active}
            onClick={() => setLocale(code)}
            class={`min-h-8 min-w-10 rounded-[5px] px-2.5 text-xs font-semibold transition-colors focus-visible:outline-none ${
              active
                ? "bg-brand text-brand-contrast"
                : "text-muted hover:text-body"
            }`}
          >
            {LOCALE_LABEL[code]}
          </button>
        );
      })}
    </div>
  );
}
