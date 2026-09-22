/**
 * Inline icon set (24 × 24, currentColor, 1.6 stroke).
 * Kept local so the dashboard has no icon-font or CDN dependency.
 */

export type IconName =
  | "home"
  | "apps"
  | "users"
  | "settings"
  | "connections"
  | "sun"
  | "moon"
  | "logout"
  | "plus"
  | "search"
  | "edit"
  | "trash"
  | "check"
  | "alert"
  | "clock"
  | "menu"
  | "close"
  | "image"
  | "external"
  | "shield"
  | "activity";

const paths: Record<IconName, string> = {
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20",
  apps: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  users:
    "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.38M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  settings:
    "M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4M19.4 13.6a1.6 1.6 0 0 0 .32 1.76l.06.06a1.9 1.9 0 1 1-2.7 2.7l-.06-.06a1.6 1.6 0 0 0-2.72 1.14v.17a1.9 1.9 0 1 1-3.8 0v-.09a1.6 1.6 0 0 0-2.78-1.08l-.06.06a1.9 1.9 0 1 1-2.7-2.7l.06-.06A1.6 1.6 0 0 0 4.9 13.6h-.17a1.9 1.9 0 1 1 0-3.8h.09a1.6 1.6 0 0 0 1.08-2.78l-.06-.06a1.9 1.9 0 1 1 2.7-2.7l.06.06a1.6 1.6 0 0 0 1.76.32h.08a1.6 1.6 0 0 0 1-1.48v-.17a1.9 1.9 0 1 1 3.8 0v.09a1.6 1.6 0 0 0 2.72 1.14l.06-.06a1.9 1.9 0 1 1 2.7 2.7l-.06.06a1.6 1.6 0 0 0-.32 1.76v.08a1.6 1.6 0 0 0 1.48 1h.17a1.9 1.9 0 1 1 0 3.8h-.09a1.6 1.6 0 0 0-1.48 1z",
  connections:
    "M9 12h6M8.5 8.5H7a3.5 3.5 0 0 0 0 7h1.5M15.5 8.5H17a3.5 3.5 0 0 1 0 7h-1.5",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10M12 1.8v2.2M12 20v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M1.8 12H4M20 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6",
  moon: "M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8",
  logout: "M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13A1.5 1.5 0 0 1 18.5 20H15M10 8l-4 4 4 4M6 12h9",
  plus: "M12 5v14M5 12h14",
  search: "M20 20l-3.9-3.9M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0",
  edit: "M4 20h4l10-10-4-4L4 16zM14.5 5.5l4 4",
  trash: "M4 7h16M9.5 7V4.8h5V7M6.5 7l.9 12.2A1.8 1.8 0 0 0 9.2 21h5.6a1.8 1.8 0 0 0 1.8-1.8L17.5 7M10.5 11v6M13.5 11v6",
  check: "M4.5 12.8l4.6 4.5L19.5 7",
  alert: "M12 3.5 21 20H3zM12 9.5v4.2M12 16.6v.9",
  clock: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16M12 7.6V12l3 1.8",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  image: "M4 5.5h16v13H4zM4 15l4.5-4.2L14 16M14.2 12.6l2.4-2.2L20 13.6M15.5 8.6h.01",
  external: "M14 5h5v5M19 5l-7.5 7.5M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10",
  shield: "M12 3l7 3v5.5c0 4.3-2.9 8-7 9.5-4.1-1.5-7-5.2-7-9.5V6zM9.3 12l1.9 1.9 3.6-3.8",
  activity: "M3 12h3.5l2.5-6 3.5 12 2.6-6H21",
};

export interface IconProps {
  name: IconName;
  class?: string;
}

export function Icon({ name, class: className = "size-5" }: IconProps) {
  return (
    <svg
      class={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
