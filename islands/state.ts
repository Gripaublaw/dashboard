/**
 * Theme + locale signals shared across islands.
 * Loaded on the client only (imported from islands), so `document` is available.
 */

import { effect, signal } from "@preact/signals";
import { DEFAULT_LOCALE, isLocale, type Locale } from "../lib/i18n.ts";

export type Theme = "dark" | "light";

const THEME_KEY = "nexus.theme";
const LOCALE_KEY = "nexus.locale";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "dark"; // dark theme is the default
}

function readLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const stored = localStorage.getItem(LOCALE_KEY);
  return isLocale(stored ?? undefined) ? (stored as Locale) : DEFAULT_LOCALE;
}

export const theme = signal<Theme>(readTheme());
export const locale = signal<Locale>(readLocale());

export function toggleTheme() {
  theme.value = theme.value === "dark" ? "light" : "dark";
}

export function setLocale(next: Locale) {
  locale.value = next;
  if (typeof document !== "undefined") {
    document.documentElement.lang = next;
  }
}

// Persist + apply as soon as the values change on the client.
effect(() => {
  const value = theme.value;
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", value === "dark");
  document.documentElement.style.colorScheme = value;
  localStorage.setItem(THEME_KEY, value);
});

effect(() => {
  const value = locale.value;
  if (typeof document === "undefined") return;
  document.documentElement.lang = value;
  localStorage.setItem(LOCALE_KEY, value);
});
