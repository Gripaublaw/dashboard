---
version: alpha
name: Nexus Dashboard Design System
description: Dark-first control panel for the Nexus digital ecosystem, built with Deno, Fresh 2 and Tailwind CSS v4.
colors:
  base: "#1e1e2e"
  surface: "#2a2a3e"
  surface2: "#23233a"
  overlay: "#31314a"
  line: "#3b3b55"
  strong: "#f4f4fb"
  body: "#d6d6e6"
  muted: "#a6a6c2"
  muted2: "#7e7e9c"
  brand: "#8f8cf5"
  brandInk: "#c3c1ff"
  brandContrast: "#16162a"
  success: "#4ad6a5"
  warning: "#f0b661"
  danger: "#f2788f"
  lightBase: "#f3f4fa"
  lightSurface: "#ffffff"
  lightLine: "#dfe1ee"
  lightStrong: "#1b1b2f"
  lightBrand: "#5b57e8"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: 24px
    fontWeight: 600
    letterSpacing: "-0.01em"
  heading:
    fontFamily: "Plus Jakarta Sans, Segoe UI, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    letterSpacing: "0em"
  body:
    fontFamily: "Inter var, Segoe UI, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter var, Segoe UI, system-ui, sans-serif"
    fontSize: 11px
    fontWeight: 600
    letterSpacing: "0.06em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 12px
    fontWeight: 400
    letterSpacing: "0em"
rounded:
  lg: 8px
  md: 6px
  sm: 4px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
components:
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  metric-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.strong}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  status-badge:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.muted}"
    rounded: 999px
    padding: "4px 10px"
  action-button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.brandContrast}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  action-button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  nav-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  nav-item-active:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.brandContrast}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  input:
    backgroundColor: "{colors.surface2}"
    textColor: "{colors.body}"
    rounded: "{rounded.md}"
    padding: "0 12px"
---

## Overview

Nexus is the control panel for a digital ecosystem: applications, users,
external connections and system health in one dark-first surface. The design is
calm and operational — dense enough for an admin working all day, restrained
enough that status colour carries real meaning.

### Design principles

1. **Dark first.** `#1e1e2e` base and `#2a2a3e` cards are the default identity;
   the light theme is a full parity alternative, not a fallback tint.
2. **Status colour is information.** Success / warning / danger only appear on
   real states (app health, connection state, uptime), never as decoration.
3. **One chrome, many screens.** Every route renders inside the same shell, so
   the sidebar, header and page rhythm never shift between sections.
4. **Reusable primitives over one-off markup.** Cards, table shells, badges and
   buttons live in `components/` and are shared by all five sections.

### Implementing the tokens (Tailwind v4)

Tokens are declared once in `assets/styles.css` with `@theme` (dark values) and
`html.light { ... }` overrides. Use the resulting utilities directly:

| Purpose | Utility examples |
|---|---|
| Page background | `bg-base` |
| Cards / panels | `bg-surface border border-line rounded-lg shadow-card` |
| Nested surfaces | `bg-surface-2`, drawers: `bg-overlay` |
| Text ladder | `text-strong`, `text-body`, `text-muted`, `text-muted-2` |
| Accent | `bg-brand text-brand-contrast`, `bg-brand-soft text-brand-ink` |
| Status | `text-success-ink bg-success-soft`, same for `warning` / `danger` |
| Typography | `font-display` (headings), `font-sans` (body), `font-mono` (ids, uptime) |

Explicit `dark:` variants are rarely needed — the tokens swap themselves. When a
one-off dark rule is required, the `@custom-variant dark` definition keeps
`dark:` bound to `html.dark`.

### Theme switching

`islands/state.ts` owns the `theme` signal, toggles `html.dark` / `html.light`,
sets `color-scheme` and persists to `localStorage["nexus.theme"]`. A tiny inline
script in `routes/_app.tsx` applies the stored value before first paint, so there
is no light flash on a dark-default load.

### Language switching

Every user-facing string lives in `lib/i18n.ts` (keyed CA + EN). Routes render
server-side strings through `t(locale, key)`; islands import the shared `locale`
signal from `islands/state.ts`, so pressing **CA / EN** swaps the sidebar,
header, tables, activity feed and forms at once. Buttons carry `aria-pressed`
and set `document.documentElement.lang`.

### Layout and responsive rules

- Shell: fixed 248 px sidebar from `lg` up; below `lg` it collapses into a
  drawer behind a sticky top bar (`islands/SidebarNav.tsx`).
- Content grid: unbounded width; cards use `repeat(auto-fit, minmax(...))` so
  no fixed breakpoints are baked into section markup.
- Tables become labelled card stacks below `lg` (`components/DataTable.tsx`),
  keeping row actions reachable on touch.
- Minimum interactive height is 40 px; icon-only buttons are 32–36 px with
  `sr-only` labels and visible focus rings.

### Accessibility baseline

Semantic landmarks (`header`, `nav`, `main`, `aside`), one `h1` per page from the
header, `aria-current="page"` on the active nav item, `aria-modal` + labelled
close controls on the connection drawer and form dialogs, `role="status"` /
`role="alert"` banners, `aria-busy` on buttons in flight, and a
`prefers-reduced-motion` reset for all transitions.

### Async action states

Every mutation reads through the same vocabulary, so no screen invents its own
pattern. `components/FeedbackBanner.tsx` renders both outcomes as live regions;
`lib/api.ts` exposes `errorKey()` so raw HTTP text never reaches the UI.

| State | Treatment |
|---|---|
| In flight | `ActionButton loading` — spinner replaces icon, button disabled, `aria-busy="true"`, label swaps to `state.saving` / `state.creating` / `state.deleting` |
| Success | `FeedbackBanner` tone `success`, dismissible, auto-cleared on the next action |
| Failure | `FeedbackBanner` tone `danger` (`role="alert"`), message from `errorKey()` |
| Destructive | `components/Modal.tsx` confirmation with a `danger`-variant confirm button and an explicit "cannot be undone" line |
| Empty | `EmptyState` inside the card, never a bare blank table |

Row-level busy state is scoped: only the row awaiting a response disables, so a
slow delete never freezes the whole table. Forms validate before any request and
map each failure to an inline field error (`error.required`, `error.email`,
`error.slug`).

### Standalone review surface

`App.jsx` at the workspace root is a **self-contained design review**, not a
build artifact. It inlines the icon set, both theme variable sets, the CA/EN
dictionary and the mock data, then renders all five sections inside the same
shell, so the design can be inspected without booting Deno. It is deliberately
outside `routes/`, `components/` and `islands/`, so Fresh never picks it up and
it cannot affect the real build.

To read it in a browser, serve the workspace root over HTTP — opening the file
directly from disk will not work:

```bash
deno run -A jsr:@std/http/file-server .
```

Shipping code remains the `.tsx` set under `routes/`, `components/`, `islands/`
and `lib/`. When the two disagree, the `.tsx` set wins.

