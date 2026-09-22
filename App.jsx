/**
 * Revisió visual autònoma — Ecosistema digital Dashboard.
 *
 * AQUEST FITXER NO S'INTEGRA al projecte Fresh. Serveix només per revisar el
 * disseny al navegador. El codi que s'entrega és el conjunt .tsx de
 * routes/, components/, islands/ i lib/.
 *
 * Sistema de disseny (DESIGN.md): base #1e1e2e · surface #2a2a3e ·
 * brand #8f8cf5 · radius 8px · dark-first amb tema clar de paritat.
 */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentColor": "#8f8cf5",
  "radius": 8,
  "density": 1
}/*EDITMODE-END*/;

const { useEffect, useMemo, useState } = React;

/* ---------------------------------------------------------------- icones */
const ICON = {
  home: "M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5M10 20v-5.5h4V20",
  apps: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  users: [
    "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19",
    "M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7",
    "M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.38M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  ],
  settings: [
    "M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4",
    "M12 3.4l1 2.4 2.6.5 2-1.5 1.9 1.9-1.5 2 .5 2.6 2.4 1v2.7l-2.4 1-.5 2.6 1.5 2-1.9 1.9-2-1.5-2.6.5-1 2.4h-2.7l-1-2.4-2.6-.5-2 1.5-1.9-1.9 1.5-2-.5-2.6-2.4-1V9.8l2.4-1 .5-2.6-1.5-2L4.2 2.3l2 1.5 2.6-.5 1-2.4z",
  ],
  connections:
    "M9 12h6M8.5 8.5H7a3.5 3.5 0 0 0 0 7h1.5M15.5 8.5H17a3.5 3.5 0 0 1 0 7h-1.5",
  sun: [
    "M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9",
    "M12 2.6v1.8M12 19.6v1.8M4.9 4.9l1.3 1.3M17.8 17.8l1.3 1.3M2.6 12h1.8M19.6 12h1.8M4.9 19.1l1.3-1.3M17.8 6.2l1.3-1.3",
  ],
  moon: "M20.5 14.3A8.5 8.5 0 0 1 9.7 3.5a8.5 8.5 0 1 0 10.8 10.8",
  logout: "M15 4h3.5A1.5 1.5 0 0 1 20 5.5v13A1.5 1.5 0 0 1 18.5 20H15M10 8l-4 4 4 4M6 12h9",
  plus: "M12 5v14M5 12h14",
  search: "M20 20l-3.9-3.9M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0",
  edit: "M4 20h4l10-10-4-4L4 16zM14.5 5.5l4 4",
  trash: "M4 7h16M9.5 7V4.8h5V7M6.5 7l.9 12.2A1.8 1.8 0 0 0 9.2 21h5.6a1.8 1.8 0 0 0 1.8-1.8L17.5 7M10.5 11v6M13.5 11v6",
  check: "M4.5 12.8l4.6 4.5L19.5 7",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  image: "M4 5.5h16v13H4zM4 15l4.5-4.2L14 16M14.2 12.6l2.4-2.2L20 13.6",
  activity: "M3 12h3.5l2.5-6 3.5 12 2.6-6H21",
  chevron: "m6 9 6 6 6-6",
  shield: "M12 3.5 5 6.2v5.1c0 4.3 2.9 7.6 7 9.2 4.1-1.6 7-4.9 7-9.2V6.2z",
};

function Icon({ d, size = 18, color = "currentColor", width = 1.7 }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={{ flex: "0 0 auto" }}
    >
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

/* --------------------------------------------------------------- tokens */
const DARK_VARS = {
  base: "#1e1e2e",
  surface: "#2a2a3e",
  surface2: "#23233a",
  overlay: "#31314a",
  line: "#3b3b55",
  strong: "#f4f4fb",
  body: "#d6d6e6",
  muted: "#a6a6c2",
  muted2: "#7e7e9c",
  brandInk: "#c3c1ff",
  brandContrast: "#16162a",
  success: "#4ad6a5",
  successSoft: "rgba(74,214,165,0.14)",
  successInk: "#7ee8c3",
  warning: "#f0b661",
  warningSoft: "rgba(240,182,97,0.14)",
  warningInk: "#f7cf95",
  danger: "#f2788f",
  dangerSoft: "rgba(242,120,143,0.14)",
  dangerInk: "#ff9fb0",
  info: "#7fb6f5",
  infoSoft: "rgba(127,182,245,0.14)",
  infoInk: "#a9cffb",
  scrim: "rgba(12,12,24,0.65)",
  shadow: "0 1px 2px rgba(8,8,20,0.35)",
  overlayShadow: "0 18px 40px -20px rgba(8,8,20,0.75)",
};

const LIGHT_VARS = {
  base: "#f3f4fa",
  surface: "#ffffff",
  surface2: "#f7f8fc",
  overlay: "#ffffff",
  line: "#dfe1ee",
  strong: "#1b1b2f",
  body: "#3b3b52",
  muted: "#5f5f7a",
  muted2: "#85859c",
  brandInk: "#403bb8",
  brandContrast: "#ffffff",
  success: "#1f9d76",
  successSoft: "rgba(31,157,118,0.12)",
  successInk: "#15795b",
  warning: "#c58420",
  warningSoft: "rgba(197,132,32,0.13)",
  warningInk: "#8f5f11",
  danger: "#d1435f",
  dangerSoft: "rgba(209,67,95,0.12)",
  dangerInk: "#a52c45",
  info: "#2f6fd0",
  infoSoft: "rgba(47,111,208,0.11)",
  infoInk: "#24559f",
  scrim: "rgba(24,24,44,0.4)",
  shadow: "0 1px 2px rgba(24,24,48,0.08)",
  overlayShadow: "0 18px 40px -24px rgba(24,24,48,0.35)",
};

function useTheme() {
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("nx-theme") || "dark";
    } catch (_) {
      return "dark";
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem("nx-theme", mode);
    } catch (_) {}
  }, [mode]);

  return [mode, setMode];
}

function makeTokens(mode, accent, radius, density) {
  const v = mode === "light" ? LIGHT_VARS : DARK_VARS;
  return {
    ...v,
    brand: accent,
    brandSoft: accent + "26",
    radius: Number(radius),
    pad: Number(density),
    mode,
  };
}

/* -------------------------------------------------------------- textos */
const DICT = {
  ca: {
    appName: "Ecosistema digital",
    appSub: "Centre de control",
    nav_home: "Inici",
    nav_apps: "Aplicacions",
    nav_users: "Usuaris",
    nav_settings: "Configuració",
    nav_connections: "Connexions",
    nav_group_operate: "Operació",
    nav_group_manage: "Gestió",
    theme: "Tema",
    lang: "Idioma",
    logout: "Tanca la sessió",
    user_name: "Xavier Font",
    user_role: "Administradora",
    menu: "Menú",
    close: "Tanca",
    search_ph: "Cerca aplicacions, usuaris…",

    home_title: "Inici",
    home_sub: "Estat de l'ecosistema en temps real i activitat recent.",
    metric_apps: "Aplicacions actives",
    metric_apps_delta: "+2 aquest mes",
    metric_users: "Usuaris actius",
    metric_users_delta: "12 convidats pendents",
    metric_uptime: "Disponibilitat 30 dies",
    metric_uptime_delta: "Objectiu 99,90%",
    metric_incidents: "Incidents oberts",
    metric_incidents_delta: "Cap de crític",
    uptime_title: "Disponibilitat per aplicació",
    uptime_sub: "Finestra de 30 dies, mostrejada cada minut",
    uptime_app: "Aplicació",
    uptime_value: "Disponibilitat",
    uptime_slo: "SLO",
    uptime_state: "Estat",
    activity_title: "Activitat recent",
    activity_sub: "Darrers esdeveniments dels serveis",
    health_title: "Salut dels serveis",
    health_sub: "5 nòdims · 3 amb marge",
    legend_title: "Com llegir els estats",
    legend_sub: "El color només informa d'un estat real, mai decora.",

    apps_title: "Aplicacions",
    apps_sub: "Registre d'aplicacions desplegades a l'ecosistema.",
    apps_search: "Cerca per nom o responsable",
    apps_new: "Nova aplicació",
    apps_edit: "Edita l'aplicació",
    apps_create: "Crea una aplicació",
    col_name: "Aplicació",
    col_env: "Entorn",
    col_owner: "Responsable",
    col_status: "Estat",
    col_updated: "Actualitzat",
    col_version: "Versió",
    col_role: "Rol",
    col_last: "Darrer accés",
    col_type: "Tipus",
    col_actions: "Accions",
    action_edit: "Edita",
    action_delete: "Elimina",
    action_test: "Prova la connexió",
    action_save: "Desa",
    action_cancel: "Cancel·la",
    action_create: "Crea",
    saving: "S'està desant…",
    save_ok: "Canvis desats correctament.",
    save_err: "No s'han pogut desar els canvis. Torna-ho a provar.",
    delete_title: "Eliminar {name}?",
    delete_body: "Aquesta acció no es pot desfer. Es perdrà l'historial de desplegaments.",
    delete_confirm: "Sí, elimina",
    deleted_ok: "{name} s'ha eliminat.",
    err_required: "Cal omplir tots els camps obligatoris.",
    err_name_taken: "Ja existeix una aplicació amb aquest nom.",

    env_dev: "Desenvolupament",
    env_staging: "Preproducció",
    env_prod: "Producció",
    st_active: "Actiu",
    st_pending: "Pendent",
    st_error: "Error",
    st_inactive: "Inactiu",
    st_invited: "Convidat",
    st_suspended: "Suspès",

    users_title: "Usuaris",
    users_sub: "Persones amb accés a l'ecosistema i els seus permisos.",
    users_search: "Cerca per nom o correu",
    users_new: "Convida usuari",
    users_invite: "Convida un usuari",
    users_total: "{n} usuaris · {a} administradors",
    role_admin: "Administració",
    role_editor: "Editor",
    role_viewer: "Lectura",
    invite_sent: "Invitació enviada a {email}.",

    conn_title: "Connexions",
    conn_sub: "Integracions externes i el seu estat d'autenticació.",
    conn_type_api: "API",
    conn_type_db: "Base de dades",
    conn_type_webhook: "Webhook",
    conn_type_sso: "SSO",
    conn_ok: "La connexió respon correctament.",
    conn_testing: "S'està provant…",
    conn_last_sync: "Darrera sincronització",

    settings_title: "Configuració",
    settings_sub: "Identitat de l'ecosistema i preferències del taulell.",
    settings_identity: "Identitat",
    settings_identity_sub: "Nom i marca visibles a tot el taulell.",
    settings_logo: "Logotip",
    settings_logo_hint: "PNG o SVG, màxim 512 KB.",
    settings_logo_err: "El fitxer ha de ser PNG o SVG i no superar 512 KB.",
    settings_logo_ok: "Logotip carregat.",
    field_name: "Nom de l'ecosistema",
    field_slug: "Identificador",
    field_region: "Regió principal",
    field_tz: "Zona horària",
    settings_prefs: "Preferències",
    settings_prefs_sub: "S'apliquen a tothom qui fa servir el taulell.",
    pref_density: "Densitat de la interfície",
    density_comfortable: "Còmoda",
    density_compact: "Compacta",
    pref_alerts: "Avisos per correu quan un servei cau",
    pref_beta: "Mostra funcions en proves",
    settings_danger: "Zona sensible",
    settings_danger_sub: "Accions irreversibles sobre l'ecosistema.",
    danger_rotate: "Regenera les claus d'API",
    danger_archive: "Arxiva l'ecosistema",

    empty_search: "Cap resultat per a «{q}»",
    empty_search_sub: "Prova amb un altre terme o neteja la cerca.",
    empty_apps: "Encara no hi ha aplicacions",
    empty_apps_sub: "Crea la primera aplicació per començar.",
    clear_filter: "Neteja la cerca",
  },
  en: {
    appName: "Digital ecosystem",
    appSub: "Control centre",
    nav_home: "Home",
    nav_apps: "Applications",
    nav_users: "Users",
    nav_settings: "Settings",
    nav_connections: "Connections",
    nav_group_operate: "Operate",
    nav_group_manage: "Manage",
    theme: "Theme",
    lang: "Language",
    logout: "Sign out",
    user_name: "Xavier Font",
    user_role: "Administrator",
    menu: "Menu",
    close: "Close",
    search_ph: "Search apps, users…",

    home_title: "Home",
    home_sub: "Live ecosystem status and recent activity.",
    metric_apps: "Active applications",
    metric_apps_delta: "+2 this month",
    metric_users: "Active users",
    metric_users_delta: "12 pending invites",
    metric_uptime: "30-day uptime",
    metric_uptime_delta: "Target 99.90%",
    metric_incidents: "Open incidents",
    metric_incidents_delta: "None critical",
    uptime_title: "Uptime by application",
    uptime_sub: "30-day window, sampled every minute",
    uptime_app: "Application",
    uptime_value: "Uptime",
    uptime_slo: "SLO",
    uptime_state: "Status",
    activity_title: "Recent activity",
    activity_sub: "Latest service events",
    health_title: "Service health",
    health_sub: "5 nodes · 3 with headroom",
    legend_title: "How to read status",
    legend_sub: "Colour reports a real state; it is never decoration.",

    apps_title: "Applications",
    apps_sub: "Registry of applications deployed in the ecosystem.",
    apps_search: "Search by name or owner",
    apps_new: "New application",
    apps_edit: "Edit application",
    apps_create: "Create an application",
    col_name: "Application",
    col_env: "Environment",
    col_owner: "Owner",
    col_status: "Status",
    col_updated: "Updated",
    col_version: "Version",
    col_role: "Role",
    col_last: "Last seen",
    col_type: "Type",
    col_actions: "Actions",
    action_edit: "Edit",
    action_delete: "Delete",
    action_test: "Test connection",
    action_save: "Save",
    action_cancel: "Cancel",
    action_create: "Create",
    saving: "Saving…",
    save_ok: "Changes saved.",
    save_err: "Could not save your changes. Please try again.",
    delete_title: "Delete {name}?",
    delete_body: "This cannot be undone. Deployment history will be lost.",
    delete_confirm: "Yes, delete",
    deleted_ok: "{name} was deleted.",
    err_required: "Please fill in every required field.",
    err_name_taken: "An application with that name already exists.",

    env_dev: "Development",
    env_staging: "Staging",
    env_prod: "Production",
    st_active: "Active",
    st_pending: "Pending",
    st_error: "Error",
    st_inactive: "Inactive",
    st_invited: "Invited",
    st_suspended: "Suspended",

    users_title: "Users",
    users_sub: "People with access to the ecosystem and their permissions.",
    users_search: "Search by name or email",
    users_new: "Invite user",
    users_invite: "Invite a user",
    users_total: "{n} users · {a} admins",
    role_admin: "Admin",
    role_editor: "Editor",
    role_viewer: "Viewer",
    invite_sent: "Invite sent to {email}.",

    conn_title: "Connections",
    conn_sub: "External integrations and their authentication state.",
    conn_type_api: "API",
    conn_type_db: "Database",
    conn_type_webhook: "Webhook",
    conn_type_sso: "SSO",
    conn_ok: "The connection responded successfully.",
    conn_testing: "Testing…",
    conn_last_sync: "Last sync",

    settings_title: "Settings",
    settings_sub: "Ecosystem identity and dashboard preferences.",
    settings_identity: "Identity",
    settings_identity_sub: "Name and branding shown across the dashboard.",
    settings_logo: "Logo",
    settings_logo_hint: "PNG or SVG, up to 512 KB.",
    settings_logo_err: "The file must be PNG or SVG and under 512 KB.",
    settings_logo_ok: "Logo uploaded.",
    field_name: "Ecosystem name",
    field_slug: "Slug",
    field_region: "Primary region",
    field_tz: "Time zone",
    settings_prefs: "Preferences",
    settings_prefs_sub: "Applied to everyone using the dashboard.",
    pref_density: "Interface density",
    density_comfortable: "Comfortable",
    density_compact: "Compact",
    pref_alerts: "Email me when a service goes down",
    pref_beta: "Show beta features",
    settings_danger: "Danger zone",
    settings_danger_sub: "Irreversible actions for this ecosystem.",
    danger_rotate: "Rotate API keys",
    danger_archive: "Archive ecosystem",

    empty_search: "No results for “{q}”",
    empty_search_sub: "Try another term or clear the search.",
    empty_apps: "No applications yet",
    empty_apps_sub: "Create your first application to get started.",
    clear_filter: "Clear search",
  },
};

function tr(locale, key, vars) {
  let out = (DICT[locale] && DICT[locale][key]) || key;
  if (vars) {
    for (const k of Object.keys(vars)) out = out.replace("{" + k + "}", vars[k]);
  }
  return out;
}

/* ------------------------------------------------------------ dades mock */
const APPS = [
  { id: "app-portal", name: "Portal ciutadà", env: "prod", owner: "Xavier Font", status: "active", updated: "18 set 2026", version: "4.12.0" },
  { id: "app-portal-s", name: "Portal ciutadà", env: "staging", owner: "Xavier Font", status: "active", updated: "18 set 2026", version: "4.13.0-rc2" },
  { id: "app-factura", name: "Facturació electrònica", env: "prod", owner: "Nil Ferran", status: "active", updated: "15 set 2026", version: "2.8.3" },
  { id: "app-arxiu", name: "Arxiu documental", env: "prod", owner: "Aina Bosch", status: "pending", updated: "11 set 2026", version: "1.4.0" },
  { id: "app-mapes", name: "Servei de mapes", env: "prod", owner: "Nil Ferran", status: "error", updated: "9 set 2026", version: "3.0.1" },
  { id: "app-ident", name: "Identitat digital", env: "prod", owner: "Pau Vidal", status: "active", updated: "4 set 2026", version: "5.1.2" },
  { id: "app-notif", name: "Notificacions", env: "dev", owner: "Aina Bosch", status: "inactive", updated: "29 ago 2026", version: "0.9.4" },
];

const USERS = [
  { id: "u-1", name: "Xavier Font", email: "marta.ripoll@nexus.cat", role: "admin", status: "active", last: "Fa 12 min" },
  { id: "u-2", name: "Nil Ferran", email: "nil.ferran@nexus.cat", role: "editor", status: "active", last: "Fa 2 h" },
  { id: "u-3", name: "Aina Bosch", email: "aina.bosch@nexus.cat", role: "editor", status: "active", last: "Ahir, 18:40" },
  { id: "u-4", name: "Pau Vidal", email: "pau.vidal@nexus.cat", role: "admin", status: "active", last: "Ahir, 09:15" },
  { id: "u-5", name: "Roc Serra", email: "roc.serra@nexus.cat", role: "viewer", status: "invited", last: "—" },
  { id: "u-6", name: "Laia Miró", email: "laia.miro@nexus.cat", role: "viewer", status: "suspended", last: "3 set 2026" },
];

const CONNECTIONS = [
  { id: "c-1", name: "Passarel·la de pagaments", type: "api", status: "active", last: "Fa 4 min" },
  { id: "c-2", name: "Directori corporatiu (SSO)", type: "sso", status: "active", last: "Fa 21 min" },
  { id: "c-3", name: "Magatzem d'objectes", type: "api", status: "pending", last: "Ahir, 22:03" },
  { id: "c-4", name: "Rèplica de lectura", type: "db", status: "error", last: "Fa 3 dies" },
  { id: "c-5", name: "Webhook d'auditoria", type: "webhook", status: "inactive", last: "12 ago 2026" },
];

const ACTIVITY = [
  { id: "a-1", who: "Nil Ferran", what: "desplegà", target: "Facturació electrònica 2.8.3", when: "Fa 26 min", tone: "success" },
  { id: "a-2", who: "Aina Bosch", what: "obrí un incident a", target: "Servei de mapes", when: "Fa 1 h", tone: "danger" },
  { id: "a-3", who: "Pau Vidal", what: "convidà", target: "roc.serra@nexus.cat", when: "Fa 3 h", tone: "info" },
  { id: "a-4", who: "Xavier Font", what: "rotà les claus de", target: "Passarel·la de pagaments", when: "Ahir", tone: "neutral" },
];

const UPTIME = [
  { id: "s-1", app: "Identitat digital", uptime: 99.98, slo: 99.9, state: "active" },
  { id: "s-2", app: "Portal ciutadà", uptime: 99.94, slo: 99.9, state: "active" },
  { id: "s-3", app: "Facturació electrònica", uptime: 99.87, slo: 99.9, state: "pending" },
  { id: "s-4", app: "Servei de mapes", uptime: 97.2, slo: 99.5, state: "error" },
  { id: "s-5", app: "Arxiu documental", uptime: 99.99, slo: 99.5, state: "active" },
];

const STATUS_TONE = {
  active: "success",
  pending: "warning",
  error: "danger",
  inactive: "neutral",
  invited: "info",
  suspended: "danger",
};

const ENV_LABEL = { dev: "env_dev", staging: "env_staging", prod: "env_prod" };
const STATUS_LABEL = {
  active: "st_active",
  pending: "st_pending",
  error: "st_error",
  inactive: "st_inactive",
  invited: "st_invited",
  suspended: "st_suspended",
};
const ROLE_LABEL = { admin: "role_admin", editor: "role_editor", viewer: "role_viewer" };
const TYPE_LABEL = { api: "conn_type_api", db: "conn_type_db", webhook: "conn_type_webhook", sso: "conn_type_sso" };

/* ------------------------------------------------------------ primitius */
function Card({ tk, children, style, as: Tag = "section", ...rest }) {
  return (
    <Tag
      {...rest}
      style={{
        background: tk.surface,
        border: "1px solid " + tk.line,
        borderRadius: tk.radius,
        padding: tk.pad * 20,
        boxShadow: tk.shadow,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

function SectionTitle({ tk, title, sub, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
      <div style={{ minWidth: 0 }}>
        <h2 style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: tk.strong }}>
          {title}
        </h2>
        {sub && <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.5, color: tk.muted }}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

function PageHeading({ tk, title, sub, action }) {
  return (
    <header style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "clamp(1.35rem, 1.1rem + 0.8vw, 1.5rem)", fontWeight: 700, color: tk.strong, letterSpacing: "-0.01em" }}>
          {title}
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: tk.muted, maxWidth: "62ch" }}>{sub}</p>
      </div>
      {action}
    </header>
  );
}

const TONE_KEYS = {
  success: ["success", "successSoft", "successInk"],
  warning: ["warning", "warningSoft", "warningInk"],
  danger: ["danger", "dangerSoft", "dangerInk"],
  info: ["info", "infoSoft", "infoInk"],
};

function StatusBadge({ tk, tone = "neutral", children }) {
  const keys = TONE_KEYS[tone];
  const bg = keys ? tk[keys[1]] : tk.surface2;
  const ink = keys ? tk[keys[2]] : tk.muted;
  const dot = keys ? tk[keys[0]] : tk.muted2;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap", background: bg, color: ink, border: "1px solid " + tk.line }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: dot, flex: "0 0 auto" }} />
      {children}
    </span>
  );
}

function Button({ tk, variant = "secondary", icon, children, ...rest }) {
  const [hover, setHover] = useState(false);
  const v = {
    primary: { background: hover ? tk.brandInk : tk.brand, color: tk.brandContrast, border: "1px solid " + (hover ? tk.brandInk : tk.brand) },
    secondary: { background: hover ? tk.surface2 : tk.surface, color: tk.body, border: "1px solid " + tk.line },
    ghost: { background: hover ? tk.surface2 : "transparent", color: tk.muted, border: "1px solid transparent" },
    danger: { background: hover ? tk.danger : tk.dangerSoft, color: hover ? "#ffffff" : tk.dangerInk, border: "1px solid " + tk.danger },
  }[variant];
  const { style, ...handlers } = rest;
  return (
    <button
      type="button"
      {...handlers}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 600,
        fontFamily: "inherit",
        borderRadius: 6,
        cursor: rest.disabled ? "not-allowed" : "pointer",
        opacity: rest.disabled ? 0.55 : 1,
        transition:
          "background 120ms ease, color 120ms ease, border-color 120ms ease",
        ...v,
        ...style,
      }}
    >
      {rest.disabled && rest.busy && (
        <span
          aria-hidden="true"
          style={{
            width: 11,
            height: 11,
            borderRadius: 999,
            border: "1.6px solid currentColor",
            borderTopColor: "transparent",
            animation: "nx-spin 700ms linear infinite",
          }}
        />
      )}
      {icon && !rest.busy && <Icon d={ICON[icon]} size={15} />}
      {children}
    </button>
  );
}

function IconButton({ tk, icon, label, tone = "neutral", onClick }) {
  const [hover, setHover] = useState(false);
  const danger = tone === "danger";
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 30,
        height: 30,
        borderRadius: 6,
        fontFamily: "inherit",
        cursor: "pointer",
        background: hover
          ? danger
            ? tk.dangerSoft
            : tk.surface2
          : "transparent",
        color: hover ? (danger ? tk.dangerInk : tk.strong) : tk.muted,
        border: "1px solid " + (hover ? tk.line : "transparent"),
        transition: "background 120ms ease, color 120ms ease",
      }}
    >
      <Icon d={ICON[icon]} size={15} />
    </button>
  );
}

function Field({ tk, label, hint, error, children, id }) {
  return (
    <label htmlFor={id} style={{ display: "block", marginBottom: 14 }}>
      <span
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: tk.muted,
          marginBottom: 6,
        }}
      >
        {label}
      </span>
      {children}
      {hint && !error && (
        <span style={{ display: "block", fontSize: 12, color: tk.muted2, marginTop: 5 }}>
          {hint}
        </span>
      )}
      {error && (
        <span style={{ display: "block", fontSize: 12, color: tk.dangerInk, marginTop: 5 }}>
          {error}
        </span>
      )}
    </label>
  );
}

function inputStyle(tk) {
  return {
    width: "100%",
    minHeight: 36,
    padding: "0 12px",
    fontSize: 13,
    fontFamily: "inherit",
    color: tk.body,
    background: tk.surface2,
    border: "1px solid " + tk.line,
    borderRadius: 6,
    outline: "none",
  };
}

function FeedbackBanner({ tk, tone = "success", children, onDismiss, dismissLabel }) {
  const keys = TONE_KEYS[tone] || TONE_KEYS.info;
  return (
    <div
      role={tone === "danger" ? "alert" : "status"}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "10px 12px",
        marginBottom: 14,
        fontSize: 13,
        lineHeight: 1.5,
        borderRadius: 6,
        background: tk[keys[1]],
        color: tk[keys[2]],
        border: "1px solid " + tk.line,
      }}
    >
      <Icon d={ICON[tone === "danger" ? "close" : "check"]} size={15} />
      <span style={{ flex: 1 }}>{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={dismissLabel}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            cursor: "pointer",
            padding: 0,
            display: "inline-flex",
          }}
        >
          <Icon d={ICON.close} size={13} />
        </button>
      )}
    </div>
  );
}

function Modal({ tk, title, sub, children, footer, onClose, closeLabel, labelledBy }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        style={{ position: "absolute", inset: 0, border: "none", background: tk.scrim, cursor: "pointer" }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 460,
          maxHeight: "88vh",
          overflowY: "auto",
          background: tk.overlay,
          border: "1px solid " + tk.line,
          borderRadius: tk.radius,
          padding: tk.pad * 22,
          boxShadow: tk.overlayShadow,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
          <div>
            <h3 id={labelledBy} style={{ margin: 0, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 16, fontWeight: 600, color: tk.strong }}>
              {title}
            </h3>
            {sub && <p style={{ margin: "4px 0 0", fontSize: 13, lineHeight: 1.5, color: tk.muted }}>{sub}</p>}
          </div>
          <IconButton tk={tk} icon="close" label={closeLabel} onClick={onClose} />
        </div>
        {children}
        {footer && <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>{footer}</div>}
      </div>
    </div>
  );
}

function MetricCard({ tk, label, value, delta, tone = "neutral", icon }) {
  const keys = TONE_KEYS[tone];
  return (
    <Card style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: tk.muted }}>
          {label}
        </span>
        <span style={{ color: keys ? tk[keys[0]] : tk.muted2, display: "inline-flex" }}>
          <Icon d={ICON[icon]} size={16} />
        </span>
      </div>
      <strong style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: "clamp(1.5rem, 1.2rem + 1vw, 1.85rem)", fontWeight: 700, color: tk.strong, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
        {value}
      </strong>
      <span style={{ fontSize: 12, color: tk.muted2 }}>{delta}</span>
    </Card>
  );
}

function InitialsBadge({ tk, name, size = 30 }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        background: tk.brandSoft,
        color: tk.brandInk,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: size * 0.36,
        fontWeight: 500,
      }}
    >
      {initials}
    </span>
  );
}

function EmptyState({ tk, icon = "search", title, sub, action }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, padding: "36px 20px" }}>
      <span style={{ width: 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 999, background: tk.surface2, border: "1px solid " + tk.line, color: tk.muted }}>
        <Icon d={ICON[icon]} size={19} />
      </span>
      <strong style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 600, color: tk.strong }}>{title}</strong>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: tk.muted, maxWidth: "38ch" }}>{sub}</p>
      {action}
    </div>
  );
}

/* -------------------------------------------------------------- taules */
function DataTable({ tk, columns, children }) {
  return (
    <div style={{ overflowX: "auto", margin: "0 -4px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                style={{
                  textAlign: c.align || "left",
                  padding: "0 12px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: tk.muted2,
                  borderBottom: "1px solid " + tk.line,
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Row({ tk, children }) {
  const [hover, setHover] = useState(false);
  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? tk.surface2 : "transparent", transition: "background 100ms ease" }}
    >
      {React.Children.map(children, (cell) =>
        React.isValidElement(cell)
          ? React.cloneElement(cell, {
              style: {
                padding: "12px",
                fontSize: 13,
                color: tk.body,
                borderBottom: "1px solid " + tk.line,
                verticalAlign: "middle",
                ...cell.props.style,
              },
            })
          : cell,
      )}
    </tr>
  );
}

function Cell({ children, style, ...rest }) {
  return (
    <td {...rest} style={style}>
      {children}
    </td>
  );
}

function SearchInput({ tk, value, onChange, placeholder, label }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ position: "relative", minWidth: 0, flex: "1 1 220px", maxWidth: 320 }}>
      <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: tk.muted2, display: "inline-flex" }}>
        <Icon d={ICON.search} size={15} />
      </span>
      <input
        type="search"
        value={value}
        aria-label={label}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          ...inputStyle(tk),
          paddingLeft: 34,
          borderColor: focus ? tk.brand : tk.line,
          transition: "border-color 120ms ease",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------- seccions */
function HomeSection({ tk, locale }) {
  const avg = (UPTIME.reduce((s, r) => s + r.uptime, 0) / UPTIME.length).toFixed(2);
  return (
    <section id="section-home" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeading tk={tk} title={tr(locale, "home_title")} sub={tr(locale, "home_sub")} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14 }}>
        <MetricCard tk={tk} icon="apps" label={tr(locale, "metric_apps")} value="18" delta={tr(locale, "metric_apps_delta")} tone="success" />
        <MetricCard tk={tk} icon="users" label={tr(locale, "metric_users")} value="247" delta={tr(locale, "metric_users_delta")} tone="info" />
        <MetricCard tk={tk} icon="activity" label={tr(locale, "metric_uptime")} value={avg + "%"} delta={tr(locale, "metric_uptime_delta")} tone="success" />
        <MetricCard tk={tk} icon="shield" label={tr(locale, "metric_incidents")} value="2" delta={tr(locale, "metric_incidents_delta")} tone="warning" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, alignItems: "start" }}>
        <Card>
          <SectionTitle tk={tk} title={tr(locale, "uptime_title")} sub={tr(locale, "uptime_sub")} />
          <DataTable
            tk={tk}
            columns={[
              { key: "app", label: tr(locale, "uptime_app") },
              { key: "uptime", label: tr(locale, "uptime_value"), align: "right" },
              { key: "slo", label: tr(locale, "uptime_slo"), align: "right" },
              { key: "state", label: tr(locale, "uptime_state") },
            ]}
          >
            {UPTIME.map((r) => {
              const behind = r.uptime < r.slo;
              return (
                <Row key={r.id} tk={tk}>
                  <Cell style={{ fontWeight: 500, color: tk.strong }}>{r.app}</Cell>
                  <Cell
                    style={{
                      textAlign: "right",
                      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                      fontSize: 12,
                      color: behind ? tk.dangerInk : tk.body,
                    }}
                  >
                    {r.uptime.toFixed(2)}%
                  </Cell>
                  <Cell style={{ textAlign: "right", fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12, color: tk.muted }}>
                    {r.slo.toFixed(2)}%
                  </Cell>
                  <Cell>
                    <StatusBadge tk={tk} tone={STATUS_TONE[r.state]}>
                      {tr(locale, STATUS_LABEL[r.state])}
                    </StatusBadge>
                  </Cell>
                </Row>
              );
            })}
          </DataTable>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card>
            <SectionTitle tk={tk} title={tr(locale, "activity_title")} sub={tr(locale, "activity_sub")} />
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column" }}>
              {ACTIVITY.map((a, i) => (
                <li
                  key={a.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "11px 0",
                    borderTop: i === 0 ? "none" : "1px solid " + tk.line,
                  }}
                >
                  <span style={{ marginTop: 6, width: 7, height: 7, borderRadius: 999, flex: "0 0 auto", background: a.tone === "neutral" ? tk.muted2 : tk[a.tone] }} />
                  <span style={{ fontSize: 13, lineHeight: 1.55, color: tk.muted, minWidth: 0 }}>
                    <strong style={{ color: tk.strong, fontWeight: 600 }}>{a.who}</strong> {a.what}{" "}
                    <strong style={{ color: tk.strong, fontWeight: 600 }}>{a.target}</strong>
                    <span style={{ display: "block", fontSize: 12, color: tk.muted2, marginTop: 2 }}>{a.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <SectionTitle tk={tk} title={tr(locale, "legend_title")} sub={tr(locale, "legend_sub")} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <StatusBadge tk={tk} tone="success">{tr(locale, "st_active")}</StatusBadge>
              <StatusBadge tk={tk} tone="warning">{tr(locale, "st_pending")}</StatusBadge>
              <StatusBadge tk={tk} tone="danger">{tr(locale, "st_error")}</StatusBadge>
              <StatusBadge tk={tk} tone="info">{tr(locale, "st_invited")}</StatusBadge>
              <StatusBadge tk={tk} tone="neutral">{tr(locale, "st_inactive")}</StatusBadge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function AppsSection({ tk, locale }) {
  const [rows, setRows] = useState(APPS);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? rows.filter((r) => r.name.toLowerCase().includes(q) || r.owner.toLowerCase().includes(q))
    : rows;

  function submit(e) {
    e.preventDefault();
    const name = e.target.elements.name.value.trim();
    const owner = e.target.elements.owner.value.trim();
    if (!name || !owner || !e.target.elements.version.value.trim()) {
      setError("err_required");
      return;
    }
    if (rows.some((r) => r.name.toLowerCase() === name.toLowerCase() && r.id !== editing.id)) {
      setError("err_name_taken");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setRows((prev) =>
        prev.map((r) =>
          r.id === editing.id
            ? { ...r, name, owner, env: e.target.elements.env.value, version: e.target.elements.version.value.trim(), updated: "22 set 2026" }
            : r,
        ),
      );
      setBusy(false);
      setEditing(null);
      setError(null);
      setFeedback("save_ok");
    }, 700);
  }

  function confirmDelete() {
    setBusy(true);
    window.setTimeout(() => {
      const gone = removing.name;
      setRows((prev) => prev.filter((r) => r.id !== removing.id));
      setBusy(false);
      setRemoving(null);
      setFeedback({ key: "deleted_ok", vars: { name: gone } });
    }, 550);
  }

  return (
    <section id="section-apps" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeading
        tk={tk}
        title={tr(locale, "apps_title")}
        sub={tr(locale, "apps_sub")}
        action={
          <Button
            tk={tk}
            variant="primary"
            icon="plus"
            onClick={() => {
              setError(null);
              setEditing({ id: "new", name: "", env: "dev", owner: "", version: "0.1.0" });
            }}
          >
            {tr(locale, "apps_new")}
          </Button>
        }
      />

      <Card>
        {feedback && (
          <FeedbackBanner tk={tk} tone="success" onDismiss={() => setFeedback(null)} dismissLabel={tr(locale, "close")}>
            {typeof feedback === "string" ? tr(locale, feedback) : tr(locale, feedback.key, feedback.vars)}
          </FeedbackBanner>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <SearchInput
            tk={tk}
            value={query}
            onChange={setQuery}
            label={tr(locale, "apps_search")}
            placeholder={tr(locale, "apps_search")}
          />
          <span style={{ fontSize: 12, color: tk.muted2, alignSelf: "center" }}>
            {filtered.length} / {rows.length}
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            tk={tk}
            icon="search"
            title={tr(locale, "empty_search", { q: query })}
            sub={tr(locale, "empty_search_sub")}
            action={
              <Button tk={tk} onClick={() => setQuery("")}>
                {tr(locale, "clear_filter")}
              </Button>
            }
          />
        ) : (
          <DataTable
            tk={tk}
            columns={[
              { key: "name", label: tr(locale, "col_name") },
              { key: "env", label: tr(locale, "col_env") },
              { key: "owner", label: tr(locale, "col_owner") },
              { key: "version", label: tr(locale, "col_version") },
              { key: "status", label: tr(locale, "col_status") },
              { key: "updated", label: tr(locale, "col_updated") },
              { key: "actions", label: tr(locale, "col_actions"), align: "right" },
            ]}
          >
            {filtered.map((r) => (
              <Row key={r.id} tk={tk}>
                <Cell>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <InitialsBadge tk={tk} name={r.name} />
                    <span style={{ fontWeight: 600, color: tk.strong }}>{r.name}</span>
                  </span>
                </Cell>
                <Cell style={{ color: tk.muted }}>{tr(locale, ENV_LABEL[r.env])}</Cell>
                <Cell style={{ color: tk.muted }}>{r.owner}</Cell>
                <Cell style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12, color: tk.muted }}>{r.version}</Cell>
                <Cell>
                  <StatusBadge tk={tk} tone={STATUS_TONE[r.status]}>{tr(locale, STATUS_LABEL[r.status])}</StatusBadge>
                </Cell>
                <Cell style={{ color: tk.muted2, whiteSpace: "nowrap" }}>{r.updated}</Cell>
                <Cell style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    <IconButton
                      tk={tk}
                      icon="edit"
                      label={tr(locale, "action_edit")}
                      onClick={() => {
                        setError(null);
                        setEditing(r);
                      }}
                    />
                    <IconButton tk={tk} icon="trash" label={tr(locale, "action_delete")} tone="danger" onClick={() => setRemoving(r)} />
                  </span>
                </Cell>
              </Row>
            ))}
          </DataTable>
        )}
      </Card>

      {editing && (
        <Modal
          tk={tk}
          labelledBy="app-modal-title"
          title={tr(locale, editing.id === "new" ? "apps_create" : "apps_edit")}
          sub={editing.id === "new" ? null : editing.name}
          onClose={() => !busy && setEditing(null)}
          closeLabel={tr(locale, "close")}
          footer={
            <>
              <Button tk={tk} onClick={() => setEditing(null)} disabled={busy}>
                {tr(locale, "action_cancel")}
              </Button>
              <Button tk={tk} variant="primary" form="app-form" type="submit" disabled={busy} busy={busy}>
                {busy ? tr(locale, "saving") : tr(locale, "action_save")}
              </Button>
            </>
          }
        >
          <form id="app-form" onSubmit={submit}>
            {error && <FeedbackBanner tk={tk} tone="danger">{tr(locale, error)}</FeedbackBanner>}
            <Field tk={tk} id="f-name" label={tr(locale, "col_name")}>
              <input id="f-name" name="name" defaultValue={editing.name} style={inputStyle(tk)} />
            </Field>
            <Field tk={tk} id="f-owner" label={tr(locale, "col_owner")}>
              <input id="f-owner" name="owner" defaultValue={editing.owner} style={inputStyle(tk)} />
            </Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Field tk={tk} id="f-env" label={tr(locale, "col_env")}>
                <select id="f-env" name="env" defaultValue={editing.env} style={inputStyle(tk)}>
                  <option value="dev">{tr(locale, "env_dev")}</option>
                  <option value="staging">{tr(locale, "env_staging")}</option>
                  <option value="prod">{tr(locale, "env_prod")}</option>
                </select>
              </Field>
              <Field tk={tk} id="f-version" label={tr(locale, "col_version")}>
                <input id="f-version" name="version" defaultValue={editing.version} style={inputStyle(tk)} />
              </Field>
            </div>
          </form>
        </Modal>
      )}

      {removing && (
        <Modal
          tk={tk}
          labelledBy="del-modal-title"
          title={tr(locale, "delete_title", { name: removing.name })}
          sub={tr(locale, "delete_body")}
          onClose={() => !busy && setRemoving(null)}
          closeLabel={tr(locale, "close")}
          footer={
            <>
              <Button tk={tk} onClick={() => setRemoving(null)} disabled={busy}>
                {tr(locale, "action_cancel")}
              </Button>
              <Button tk={tk} variant="danger" onClick={confirmDelete} disabled={busy} busy={busy}>
                {busy ? tr(locale, "saving") : tr(locale, "delete_confirm")}
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, fontSize: 13, color: tk.muted }}>
            <strong style={{ color: tk.strong }}>{removing.name}</strong> · {tr(locale, ENV_LABEL[removing.env])} · {removing.version}
          </p>
        </Modal>
      )}
    </section>
  );
}

function UsersSection({ tk, locale }) {
  const [query, setQuery] = useState("");
  const [inviting, setInviting] = useState(false);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? USERS.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
    : USERS;
  const admins = USERS.filter((u) => u.role === "admin").length;

  function submit(e) {
    e.preventDefault();
    const email = e.target.elements.email.value.trim();
    const name = e.target.elements.name.value.trim();
    if (!name || !email) {
      setError("err_required");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setInviting(false);
      setError(null);
      setFeedback({ key: "invite_sent", vars: { email } });
    }, 700);
  }

  return (
    <section id="section-users" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeading
        tk={tk}
        title={tr(locale, "users_title")}
        sub={tr(locale, "users_sub")}
        action={
          <Button tk={tk} variant="primary" icon="plus" onClick={() => { setError(null); setInviting(true); }}>
            {tr(locale, "users_new")}
          </Button>
        }
      />

      <Card>
        {feedback && (
          <FeedbackBanner tk={tk} tone="success" onDismiss={() => setFeedback(null)} dismissLabel={tr(locale, "close")}>
            {tr(locale, feedback.key, feedback.vars)}
          </FeedbackBanner>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <SearchInput tk={tk} value={query} onChange={setQuery} label={tr(locale, "users_search")} placeholder={tr(locale, "users_search")} />
          <span style={{ fontSize: 12, color: tk.muted2, alignSelf: "center" }}>
            {tr(locale, "users_total", { n: USERS.length, a: admins })}
          </span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            tk={tk}
            icon="users"
            title={tr(locale, "empty_search", { q: query })}
            sub={tr(locale, "empty_search_sub")}
            action={<Button tk={tk} onClick={() => setQuery("")}>{tr(locale, "clear_filter")}</Button>}
          />
        ) : (
          <DataTable
            tk={tk}
            columns={[
              { key: "name", label: tr(locale, "col_name") },
              { key: "role", label: tr(locale, "col_role") },
              { key: "status", label: tr(locale, "col_status") },
              { key: "last", label: tr(locale, "col_last") },
              { key: "actions", label: tr(locale, "col_actions"), align: "right" },
            ]}
          >
            {filtered.map((u) => (
              <Row key={u.id} tk={tk}>
                <Cell>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <InitialsBadge tk={tk} name={u.name} />
                    <span style={{ minWidth: 0 }}>
                      <span style={{ display: "block", fontWeight: 600, color: tk.strong }}>{u.name}</span>
                      <span style={{ display: "block", fontSize: 12, color: tk.muted2 }}>{u.email}</span>
                    </span>
                  </span>
                </Cell>
                <Cell style={{ color: tk.muted }}>{tr(locale, ROLE_LABEL[u.role])}</Cell>
                <Cell>
                  <StatusBadge tk={tk} tone={STATUS_TONE[u.status]}>{tr(locale, STATUS_LABEL[u.status])}</StatusBadge>
                </Cell>
                <Cell style={{ color: tk.muted2, whiteSpace: "nowrap" }}>{u.last}</Cell>
                <Cell style={{ textAlign: "right" }}>
                  <span style={{ display: "inline-flex", gap: 4 }}>
                    <IconButton tk={tk} icon="edit" label={tr(locale, "action_edit")} />
                    <IconButton tk={tk} icon="trash" label={tr(locale, "action_delete")} tone="danger" />
                  </span>
                </Cell>
              </Row>
            ))}
          </DataTable>
        )}
      </Card>

      {inviting && (
        <Modal
          tk={tk}
          labelledBy="invite-modal-title"
          title={tr(locale, "users_invite")}
          sub={tr(locale, "users_search")}
          onClose={() => !busy && setInviting(false)}
          closeLabel={tr(locale, "close")}
          footer={
            <>
              <Button tk={tk} onClick={() => setInviting(false)} disabled={busy}>{tr(locale, "action_cancel")}</Button>
              <Button tk={tk} variant="primary" form="invite-form" type="submit" disabled={busy} busy={busy}>
                {busy ? tr(locale, "saving") : tr(locale, "action_create")}
              </Button>
            </>
          }
        >
          <form id="invite-form" onSubmit={submit}>
            {error && <FeedbackBanner tk={tk} tone="danger">{tr(locale, error)}</FeedbackBanner>}
            <Field tk={tk} id="i-name" label={tr(locale, "col_name")}>
              <input id="i-name" name="name" style={inputStyle(tk)} />
            </Field>
            <Field tk={tk} id="i-email" label="Correu" >
              <input id="i-email" name="email" type="email" style={inputStyle(tk)} />
            </Field>
            <Field tk={tk} id="i-role" label={tr(locale, "col_role")}>
              <select id="i-role" name="role" style={inputStyle(tk)}>
                <option value="viewer">{tr(locale, "role_viewer")}</option>
                <option value="editor">{tr(locale, "role_editor")}</option>
                <option value="admin">{tr(locale, "role_admin")}</option>
              </select>
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}

function ConnectionsSection({ tk, locale }) {
  const [testing, setTesting] = useState(null);
  const [feedback, setFeedback] = useState(null);

  function test(id) {
    setTesting(id);
    setFeedback(null);
    window.setTimeout(() => {
      setTesting(null);
      setFeedback("conn_ok");
    }, 800);
  }

  return (
    <section id="section-connections" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeading tk={tk} title={tr(locale, "conn_title")} sub={tr(locale, "conn_sub")} />

      {feedback && (
        <FeedbackBanner tk={tk} tone="success" onDismiss={() => setFeedback(null)} dismissLabel={tr(locale, "close")}>
          {tr(locale, feedback)}
        </FeedbackBanner>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        {CONNECTIONS.map((c) => (
          <Card key={c.id} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <span style={{ width: 32, height: 32, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: tk.surface2, border: "1px solid " + tk.line, color: tk.muted }}>
                  <Icon d={ICON.connections} size={16} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <strong style={{ display: "block", fontSize: 14, fontWeight: 600, color: tk.strong }}>{c.name}</strong>
                  <span style={{ display: "block", fontSize: 12, color: tk.muted2 }}>{tr(locale, TYPE_LABEL[c.type])}</span>
                </span>
              </span>
              <StatusBadge tk={tk} tone={STATUS_TONE[c.status]}>{tr(locale, STATUS_LABEL[c.status])}</StatusBadge>
            </div>

            <span style={{ fontSize: 12, color: tk.muted2 }}>
              {tr(locale, "conn_last_sync")}: {c.last}
            </span>

            <Button
              tk={tk}
              icon={testing === c.id ? null : "check"}
              disabled={testing === c.id}
              busy={testing === c.id}
              onClick={() => test(c.id)}
              style={{ alignSelf: "flex-start" }}
            >
              {testing === c.id ? tr(locale, "conn_testing") : tr(locale, "action_test")}
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SettingsSection({ tk, locale }) {
  const [name, setName] = useState("Ecosistema digital");
  const [slug, setSlug] = useState("ecosistema-digital");
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState(null);
  const [alerts, setAlerts] = useState(true);
  const [beta, setBeta] = useState(false);
  const [density, setDensity] = useState("comfortable");
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  function onLogoFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const okType = file.type === "image/png" || file.type === "image/svg+xml";
    if (!okType || file.size > 512 * 1024) {
      setLogoError("settings_logo_err");
      setLogo(null);
      return;
    }
    setLogoError(null);
    const reader = new FileReader();
    reader.onload = () => setLogo({ url: String(reader.result), name: file.name });
    reader.readAsDataURL(file);
  }

  function save(e) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setError("err_required");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setError(null);
      setFeedback("save_ok");
    }, 700);
  }

  return (
    <section id="section-settings" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <PageHeading tk={tk} title={tr(locale, "settings_title")} sub={tr(locale, "settings_sub")} />

      <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <Card>
          <SectionTitle tk={tk} title={tr(locale, "settings_identity")} sub={tr(locale, "settings_identity_sub")} />
          {feedback && (
            <FeedbackBanner tk={tk} tone="success" onDismiss={() => setFeedback(null)} dismissLabel={tr(locale, "close")}>
              {tr(locale, feedback)}
            </FeedbackBanner>
          )}
          {error && <FeedbackBanner tk={tk} tone="danger">{tr(locale, error)}</FeedbackBanner>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            <Field tk={tk} id="s-name" label={tr(locale, "field_name")}>
              <input id="s-name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle(tk)} />
            </Field>
            <Field tk={tk} id="s-slug" label={tr(locale, "field_slug")}>
              <input id="s-slug" value={slug} onChange={(e) => setSlug(e.target.value)} style={{ ...inputStyle(tk), fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 12 }} />
            </Field>
            <Field tk={tk} id="s-region" label={tr(locale, "field_region")}>
              <select id="s-region" defaultValue="eu-west" style={inputStyle(tk)}>
                <option value="eu-west">Europa occidental</option>
                <option value="eu-central">Europa central</option>
                <option value="us-east">Estats Units est</option>
              </select>
            </Field>
            <Field tk={tk} id="s-tz" label={tr(locale, "field_tz")}>
              <select id="s-tz" defaultValue="cet" style={inputStyle(tk)}>
                <option value="cet">Europe/Andorra (CET)</option>
                <option value="utc">UTC</option>
              </select>
            </Field>
          </div>

          <Field tk={tk} id="s-logo" label={tr(locale, "settings_logo")} hint={tr(locale, "settings_logo_hint")} error={logoError ? tr(locale, logoError) : null}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ width: 46, height: 46, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: tk.surface2, border: "1px dashed " + tk.line, color: tk.muted2, overflow: "hidden" }}>
                {logo ? <img src={logo.url} alt={logo.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} /> : <Icon d={ICON.image} size={17} />}
              </span>
              <input id="s-logo" type="file" accept="image/png,image/svg+xml" onChange={onLogoFile} style={{ fontSize: 13, color: tk.muted, maxWidth: "100%" }} />
            </div>
          </Field>
        </Card>

        <Card>
          <SectionTitle tk={tk} title={tr(locale, "settings_prefs")} sub={tr(locale, "settings_prefs_sub")} />
          <Field tk={tk} id="s-density" label={tr(locale, "pref_density")}>
            <select id="s-density" value={density} onChange={(e) => setDensity(e.target.value)} style={{ ...inputStyle(tk), maxWidth: 260 }}>
              <option value="comfortable">{tr(locale, "density_comfortable")}</option>
              <option value="compact">{tr(locale, "density_compact")}</option>
            </select>
          </Field>
          <Toggle tk={tk} id="s-alerts" checked={alerts} onChange={setAlerts} label={tr(locale, "pref_alerts")} />
          <Toggle tk={tk} id="s-beta" checked={beta} onChange={setBeta} label={tr(locale, "pref_beta")} />
        </Card>

        <Card style={{ borderColor: tk.danger }}>
          <SectionTitle tk={tk} title={tr(locale, "settings_danger")} sub={tr(locale, "settings_danger_sub")} />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button tk={tk} variant="danger" type="button">{tr(locale, "danger_rotate")}</Button>
            <Button tk={tk} variant="danger" type="button">{tr(locale, "danger_archive")}</Button>
          </div>
        </Card>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button tk={tk} type="button" disabled={busy}>{tr(locale, "action_cancel")}</Button>
          <Button tk={tk} variant="primary" type="submit" disabled={busy} busy={busy}>
            {busy ? tr(locale, "saving") : tr(locale, "action_save")}
          </Button>
        </div>
      </form>
    </section>
  );
}

function Toggle({ tk, id, checked, onChange, label }) {
  return (
    <label htmlFor={id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", cursor: "pointer", fontSize: 13, color: tk.body }}>
      <input id={id} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
      <span
        aria-hidden="true"
        style={{
          width: 34,
          height: 19,
          flex: "0 0 auto",
          borderRadius: 999,
          padding: 2,
          background: checked ? tk.brand : tk.surface2,
          border: "1px solid " + (checked ? tk.brand : tk.line),
          transition: "background 140ms ease",
        }}
      >
        <span style={{ display: "block", width: 13, height: 13, borderRadius: 999, background: checked ? tk.brandContrast : tk.muted2, transform: checked ? "translateX(15px)" : "translateX(0)", transition: "transform 140ms ease" }} />
      </span>
      {label}
    </label>
  );
}

/* ------------------------------------------------------------- app shell */
const NAV = [
  { route: "home", key: "nav_home", icon: "home", group: "operate" },
  { route: "apps", key: "nav_apps", icon: "apps", group: "operate" },
  { route: "connections", key: "nav_connections", icon: "connections", group: "operate" },
  { route: "users", key: "nav_users", icon: "users", group: "manage" },
  { route: "settings", key: "nav_settings", icon: "settings", group: "manage" },
];

function Logo({ tk }) {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true" style={{ flex: "0 0 auto" }}>
      <rect x="1" y="1" width="30" height="30" rx="7" fill={tk.brandSoft} stroke={tk.brand} strokeWidth="1.5" />
      <path d="M10 21.5 16 9.5l6 12" fill="none" stroke={tk.brandInk} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.6 18.4h6.8" fill="none" stroke={tk.brandInk} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SidebarNav({ tk, locale, route, onNavigate }) {
  const groups = [
    { id: "operate", label: tr(locale, "nav_group_operate") },
    { id: "manage", label: tr(locale, "nav_group_manage") },
  ];
  return (
    <nav aria-label={tr(locale, "menu")} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {groups.map((g) => (
        <div key={g.id} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: tk.muted2, padding: "0 12px 6px" }}>
            {g.label}
          </span>
          {NAV.filter((n) => n.group === g.id).map((item) => {
            const active = item.route === route;
            return (
              <NavLink key={item.route} tk={tk} item={item} locale={locale} active={active} onNavigate={onNavigate} />
            );
          })}
        </div>
      ))}
    </nav>
  );
}

function NavLink({ tk, item, locale, active, onNavigate }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={"#section-" + item.route}
      onClick={() => onNavigate(item.route)}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        minHeight: 38,
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 13.5,
        fontWeight: active ? 600 : 500,
        textDecoration: "none",
        color: active ? tk.brandInk : hover ? tk.strong : tk.muted,
        background: active ? tk.brandSoft : hover ? tk.surface2 : "transparent",
        border: "1px solid " + (active ? tk.line : "transparent"),
        transition: "background 120ms ease, color 120ms ease",
      }}
    >
      <Icon d={ICON[item.icon]} size={17} />
      {tr(locale, item.key)}
    </a>
  );
}

function Header({ tk, locale, setLocale, mode, setMode, onOpenDrawer }) {
  const [focus, setFocus] = useState(false);
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
        padding: "12px 20px",
        background: tk.surface,
        borderBottom: "1px solid " + tk.line,
      }}
    >
      <button
        type="button"
        onClick={onOpenDrawer}
        aria-label={tr(locale, "menu")}
        className="nx-drawer-trigger"
        style={{ background: "none", border: "1px solid " + tk.line, borderRadius: 6, color: tk.muted, padding: 6, cursor: "pointer", display: "inline-flex" }}
      >
        <Icon d={ICON.menu} size={16} />
      </button>

      <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <Logo tk={tk} />
        <span style={{ minWidth: 0 }}>
          <strong style={{ display: "block", fontSize: 14, fontWeight: 600, color: tk.strong, whiteSpace: "nowrap" }}>
            {tr(locale, "appName")}
          </strong>
          <span style={{ display: "block", fontSize: 11.5, color: tk.muted2, whiteSpace: "nowrap" }}>
            {tr(locale, "appSub")}
          </span>
        </span>
      </span>

      <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 340, marginLeft: "auto" }}>
        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: tk.muted2, display: "inline-flex" }}>
          <Icon d={ICON.search} size={15} />
        </span>
        <input
          type="search"
          aria-label={tr(locale, "search_ph")}
          placeholder={tr(locale, "search_ph")}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{ ...inputStyle(tk), paddingLeft: 34, minHeight: 34, borderColor: focus ? tk.brand : tk.line }}
        />
      </div>

      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div role="group" aria-label={tr(locale, "lang")} style={{ display: "inline-flex", border: "1px solid " + tk.line, borderRadius: 6, overflow: "hidden" }}>
          {["ca", "en"].map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              style={{
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 600,
                fontFamily: "inherit",
                cursor: "pointer",
                border: "none",
                background: locale === l ? tk.brand : "transparent",
                color: locale === l ? tk.brandContrast : tk.muted,
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <IconButton
          tk={tk}
          icon={mode === "dark" ? "sun" : "moon"}
          label={tr(locale, "theme")}
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        />

        <span style={{ display: "flex", alignItems: "center", gap: 9, paddingLeft: 10, borderLeft: "1px solid " + tk.line }}>
          <InitialsBadge tk={tk} name={tr(locale, "user_name")} size={28} />
          <span style={{ display: "none" }} className="nx-user-meta">
            <strong style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: tk.strong }}>{tr(locale, "user_name")}</strong>
            <span style={{ display: "block", fontSize: 11, color: tk.muted2 }}>{tr(locale, "user_role")}</span>
          </span>
          <IconButton tk={tk} icon="logout" label={tr(locale, "logout")} />
        </span>
      </span>
    </header>
  );
}

function App() {
  const [mode, setMode] = useTheme();
  const [locale, setLocale] = useState("ca");
  const [route, setRoute] = useState("home");
  const [drawer, setDrawer] = useState(false);
  const tk = makeTokens(mode, TWEAK_DEFAULTS.accentColor, TWEAK_DEFAULTS.radius, TWEAK_DEFAULTS.density);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#section-", "");
      if (NAV.some((n) => n.route === id)) setRoute(id);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const sections = {
    home: <HomeSection tk={tk} locale={locale} />,
    apps: <AppsSection tk={tk} locale={locale} />,
    users: <UsersSection tk={tk} locale={locale} />,
    connections: <ConnectionsSection tk={tk} locale={locale} />,
    settings: <SettingsSection tk={tk} locale={locale} />,
  };

  return (
    <div style={{ minHeight: "100vh", background: tk.base, display: "flex", flexDirection: "column" }}>
      <style>{`
        @keyframes nx-spin { to { transform: rotate(360deg); } }
        .nx-drawer-trigger { display: inline-flex !important; }
        .nx-sidebar { display: none; }
        .nx-user-meta { display: none !important; }
        @media (min-width: 900px) {
          .nx-drawer-trigger { display: none !important; }
          .nx-sidebar { display: flex !important; }
          .nx-user-meta { display: block !important; }
        }
        a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible {
          outline: 2px solid ${tk.brand};
          outline-offset: 2px;
        }
        ::selection { background: ${tk.brandSoft}; }
      `}</style>

      <Header
        tk={tk}
        locale={locale}
        setLocale={setLocale}
        mode={mode}
        setMode={setMode}
        onOpenDrawer={() => setDrawer(true)}
      />

      <div style={{ display: "flex", flex: 1, minHeight: 0, alignItems: "stretch" }}>
        <aside
          className="nx-sidebar"
          style={{
            width: 244,
            flex: "0 0 244px",
            padding: 16,
            flexDirection: "column",
            gap: 18,
            background: tk.surface,
            borderRight: "1px solid " + tk.line,
          }}
        >
          <SidebarNav tk={tk} locale={locale} route={route} onNavigate={setRoute} />
          <div style={{ marginTop: "auto", padding: 12, borderRadius: tk.radius, background: tk.surface2, border: "1px solid " + tk.line }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, color: tk.successInk }}>
              <span style={{ width: 7, height: 7, borderRadius: 999, background: tk.success }} />
              {tr(locale, "health_ok") || "OK"}
            </span>
            <p style={{ margin: "6px 0 0", fontSize: 11.5, lineHeight: 1.5, color: tk.muted2 }}>
              {tr(locale, "health_title")} · {tr(locale, "health_sub")}
            </p>
          </div>
        </aside>

        <main style={{ flex: 1, minWidth: 0, padding: "clamp(16px, 2vw, 26px)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
            {sections[route]}
          </div>
          <footer style={{ maxWidth: 1180, margin: "32px auto 0", paddingTop: 18, borderTop: "1px solid " + tk.line, fontSize: 12, color: tk.muted2 }}>
            {tr(locale, "appName")} · {tr(locale, "nav_settings")} → DESIGN.md
          </footer>
        </main>
      </div>

      {drawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          <button type="button" aria-label={tr(locale, "close")} onClick={() => setDrawer(false)} style={{ position: "absolute", inset: 0, border: "none", background: tk.scrim, cursor: "pointer" }} />
          <div style={{ position: "relative", width: 272, maxWidth: "85vw", height: "100%", overflowY: "auto", background: tk.surface, borderRight: "1px solid " + tk.line, padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <IconButton tk={tk} icon="close" label={tr(locale, "close")} onClick={() => setDrawer(false)} />
            </div>
            <SidebarNav
              tk={tk}
              locale={locale}
              route={route}
              onNavigate={(r) => {
                setRoute(r);
                setDrawer(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
