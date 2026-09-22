/**
 * Central translation dictionary for the dashboard.
 * Imported by both routes (server-side defaults) and islands (client-side switching).
 *
 * Usage:
 *   import { t } from "../lib/i18n.ts";
 *   t("ca", "nav.apps") // -> "Aplicacions"
 */

export const LOCALES = ["ca", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ca";

export const LOCALE_LABEL: Record<Locale, string> = {
  ca: "CA",
  en: "EN",
};

/** Flat key -> per-locale string map. Keep keys grouped by screen. */
export const translations = {
  // ---- Shell -------------------------------------------------------------
  "app.name": { ca: "Nexus Ecosistema", en: "Nexus Ecosystem" },
  "app.tagline": { ca: "Panell de control", en: "Control panel" },
  "app.env": { ca: "Producció", en: "Production" },

  // ---- Navigation --------------------------------------------------------
  "nav.home": { ca: "Inici", en: "Home" },
  "nav.apps": { ca: "Aplicacions", en: "Applications" },
  "nav.users": { ca: "Usuaris", en: "Users" },
  "nav.settings": { ca: "Configuració", en: "Settings" },
  "nav.connections": { ca: "Connexions", en: "Connections" },
  "nav.section.general": { ca: "General", en: "General" },
  "nav.section.system": { ca: "Sistema", en: "System" },
  "nav.openMenu": { ca: "Obre el menú", en: "Open menu" },
  "nav.closeMenu": { ca: "Tanca el menú", en: "Close menu" },

  // ---- Header / account --------------------------------------------------
  "header.language": { ca: "Idioma", en: "Language" },
  "header.theme.toDark": { ca: "Canvia a tema fosc", en: "Switch to dark theme" },
  "header.theme.toLight": { ca: "Canvia a tema clar", en: "Switch to light theme" },
  "header.theme.dark": { ca: "Fosc", en: "Dark" },
  "header.theme.light": { ca: "Clar", en: "Light" },
  "header.logout": { ca: "Tanca la sessió", en: "Sign out" },
  "header.role": { ca: "Administradora", en: "Administrator" },

  // ---- Shared controls ---------------------------------------------------
  "action.add": { ca: "Afegeix", en: "Add" },
  "action.edit": { ca: "Edita", en: "Edit" },
  "action.delete": { ca: "Elimina", en: "Delete" },
  "action.view": { ca: "Mostra", en: "View" },
  "action.save": { ca: "Desa els canvis", en: "Save changes" },
  "action.cancel": { ca: "Cancel·la", en: "Cancel" },
  "action.reset": { ca: "Restaura", en: "Reset" },
  "action.retry": { ca: "Torna-ho a provar", en: "Try again" },
  "action.upload": { ca: "Puja un fitxer", en: "Upload a file" },
  "action.search": { ca: "Cerca", en: "Search" },
  "action.previous": { ca: "Anterior", en: "Previous" },
  "action.next": { ca: "Següent", en: "Next" },
  "action.refresh": { ca: "Actualitza", en: "Refresh" },
  "action.confirm": { ca: "Confirma", en: "Confirm" },
  "action.dismiss": { ca: "Descarta", en: "Dismiss" },

  // ---- Submit / error states --------------------------------------------
  "state.saving": { ca: "S'està desant…", en: "Saving…" },
  "state.saved": { ca: "Canvis desats", en: "Changes saved" },
  "state.creating": { ca: "S'està creant…", en: "Creating…" },
  "state.deleting": { ca: "S'està eliminant…", en: "Deleting…" },
  "state.loading": { ca: "S'està carregant…", en: "Loading…" },
  "error.network": {
    ca: "No s'ha pogut contactar amb el servidor.",
    en: "Could not reach the server.",
  },
  "error.server": {
    ca: "El servidor ha retornat un error. Torna-ho a provar.",
    en: "The server returned an error. Please try again.",
  },
  "error.unknown": {
    ca: "Alguna cosa ha fallat.",
    en: "Something went wrong.",
  },
  "error.required": { ca: "Camp obligatori", en: "Required field" },
  "error.email": { ca: "Correu no vàlid", en: "Invalid email" },
  "error.slug": {
    ca: "Cal un domini o ruta vàlida",
    en: "Enter a valid domain or path",
  },

  // ---- Create / edit forms ----------------------------------------------
  "form.newApp": { ca: "Nova aplicació", en: "New application" },
  "form.newUser": { ca: "Convidar usuari", en: "Invite user" },
  "form.appName": { ca: "Nom de l'aplicació", en: "Application name" },
  "form.appSlug": { ca: "Domini o ruta", en: "Domain or path" },
  "form.appType": { ca: "Tipus", en: "Type" },
  "form.userName": { ca: "Nom complet", en: "Full name" },
  "form.userEmail": { ca: "Correu electrònic", en: "Email address" },
  "form.userRole": { ca: "Rol", en: "Role" },
  "form.submitApp": { ca: "Crea l'aplicació", en: "Create application" },
  "form.submitUser": { ca: "Envia la invitació", en: "Send invitation" },
  "form.close": { ca: "Tanca el formulari", en: "Close form" },
  "confirm.deleteApp": {
    ca: "Segur que vols eliminar aquesta aplicació?",
    en: "Delete this application?",
  },
  "confirm.deleteUser": {
    ca: "Segur que vols eliminar aquest usuari?",
    en: "Delete this user?",
  },
  "confirm.deleteHint": {
    ca: "Aquesta acció no es pot desfer.",
    en: "This action cannot be undone.",
  },

  // ---- Connections -------------------------------------------------------
  "cnx.auth": { ca: "Autenticació", en: "Authentication" },
  "cnx.scope": { ca: "Abast", en: "Scope" },
  "cnx.since": { ca: "Connectat el", en: "Connected on" },
  "cnx.lastEvent": { ca: "Darrer esdeveniment", en: "Last event" },
  "cnx.owner": { ca: "Responsable", en: "Owner" },
  "cnx.reconnect": { ca: "Reconnecta", en: "Reconnect" },
  "cnx.reconnected": { ca: "Connexió restablerta", en: "Connection restored" },
  "cnx.test": { ca: "Prova la connexió", en: "Test connection" },
  "cnx.testing": { ca: "S'està provant…", en: "Testing…" },
  "cnx.testOk": { ca: "Resposta correcta", en: "Responded successfully" },
  "cnx.healthy": { ca: "Saludables", en: "Healthy" },
  "cnx.attention": { ca: "Requereixen atenció", en: "Need attention" },

  // ---- Settings ----------------------------------------------------------
  "settings.uploadHint": {
    ca: "PNG, SVG o JPG · màxim 512 KB",
    en: "PNG, SVG or JPG · max 512 KB",
  },
  "settings.logoTooBig": {
    ca: "El fitxer supera els 512 KB.",
    en: "File exceeds 512 KB.",
  },
  "settings.defaultLocale": {
    ca: "Idioma per defecte",
    en: "Default language",
  },
  "settings.preview": { ca: "Previsualització", en: "Preview" },
  "settings.dirty": {
    ca: "Tens canvis sense desar",
    en: "You have unsaved changes",
  },

  "table.name": { ca: "Nom", en: "Name" },
  "table.status": { ca: "Estat", en: "Status" },
  "table.type": { ca: "Tipus", en: "Type" },
  "table.role": { ca: "Rol", en: "Role" },
  "table.actions": { ca: "Accions", en: "Actions" },
  "table.updated": { ca: "Darrera sincronització", en: "Last sync" },
  "table.showing": { ca: "Es mostren", en: "Showing" },
  "table.of": { ca: "de", en: "of" },
  "table.results": { ca: "registres", en: "records" },

  "status.active": { ca: "Actiu", en: "Active" },
  "status.inactive": { ca: "Inactiu", en: "Inactive" },
  "status.pending": { ca: "Pendent", en: "Pending" },
  "status.invited": { ca: "Convidat", en: "Invited" },
  "status.suspended": { ca: "Suspès", en: "Suspended" },
  "status.error": { ca: "Amb errors", en: "Degraded" },
  "status.accepted": { ca: "Acceptada", en: "Accepted" },
  "status.warning": { ca: "Avís", en: "Warning" },
  "status.enabled": { ca: "Activada", en: "Enabled" },
  "status.disabled": { ca: "Desactivada", en: "Disabled" },

  "role.admin": { ca: "Administrador", en: "Admin" },
  "role.editor": { ca: "Editor", en: "Editor" },
  "role.viewer": { ca: "Consulta", en: "Viewer" },
  "role.auditor": { ca: "Auditor", en: "Auditor" },

  // ---- Home --------------------------------------------------------------
  "home.title": { ca: "Inici", en: "Home" },
  "home.subtitle": {
    ca: "Estat general de l'ecosistema digital i activitat recent.",
    en: "Overall health of the digital ecosystem and recent activity.",
  },
  "home.metric.apps": { ca: "Nombre d'apps", en: "Number of apps" },
  "home.metric.users": { ca: "Usuaris actius", en: "Active users" },
  "home.metric.services": { ca: "Serveis integrats", en: "Integrated services" },
  "home.metric.sla": { ca: "Estat del sistema", en: "System status" },
  "home.metric.apps.hint": { ca: "2 noves aquest mes", en: "2 new this month" },
  "home.metric.users.hint": { ca: "Fa 5 min", en: "5 min ago" },
  "home.metric.services.hint": { ca: "1 pendent", en: "1 pending" },
  "home.metric.sla.hint": { ca: "99,94 % de disponibilitat", en: "99.94% uptime" },
  "home.metric.operational": { ca: "Operatiu", en: "Operational" },
  "home.activity.title": { ca: "Últimes activitats", en: "Latest activity" },
  "home.activity.subtitle": {
    ca: "Esdeveniments de les darreres 48 hores.",
    en: "Events from the last 48 hours.",
  },
  "home.activity.empty": {
    ca: "Encara no hi ha activitat registrada.",
    en: "No activity recorded yet.",
  },
  "home.uptime.title": { ca: "Disponibilitat per servei", en: "Uptime per service" },
  "home.uptime.window": { ca: "Últims 30 dies", en: "Last 30 days" },

  // ---- Apps --------------------------------------------------------------
  "apps.title": { ca: "Aplicacions", en: "Applications" },
  "apps.subtitle": {
    ca: "Aplicacions desplegades dins de l'ecosistema Nexus.",
    en: "Applications deployed inside the Nexus ecosystem.",
  },
  "apps.add": { ca: "Afegeix una app", en: "New app" },
  "apps.search": { ca: "Cerca aplicacions…", en: "Search applications…" },
  "apps.all": { ca: "Totes", en: "All" },
  "apps.empty.title": { ca: "Cap aplicació coincideix", en: "No matching application" },
  "apps.empty.body": {
    ca: "Prova amb un altre nom o esborra els filtres per veure totes les apps.",
    en: "Try another name or clear the filters to see every app.",
  },
  "apps.clear": { ca: "Esborra els filtres", en: "Clear filters" },

  // ---- Users -------------------------------------------------------------
  "users.title": { ca: "Usuaris", en: "Users" },
  "users.subtitle": {
    ca: "Persones amb accés a l'ecosistema i els seus permisos.",
    en: "People with access to the ecosystem and their permissions.",
  },
  "users.add": { ca: "Afegeix un usuari", en: "New user" },
  "users.search": { ca: "Cerca usuaris…", en: "Search users…" },
  "users.invited": { ca: "Invitació enviada", en: "Invitation sent" },
  "users.deactivated": { ca: "Usuari desactivat", en: "User deactivated" },
  "users.empty.title": { ca: "Cap usuari coincideix", en: "No matching user" },
  "users.empty.body": {
    ca: "Revisa l'ortografia o canvia el filtre d'estat.",
    en: "Check the spelling or switch the status filter.",
  },

  // ---- Settings ----------------------------------------------------------
  "settings.title": { ca: "Configuració", en: "Settings" },
  "settings.subtitle": {
    ca: "Identitat i paràmetres per defecte de l'ecosistema.",
    en: "Identity and default parameters for the ecosystem.",
  },
  "settings.form.title": { ca: "Identitat de l'ecosistema", en: "Ecosystem identity" },
  "settings.name": { ca: "Nom de l'ecosistema", en: "Ecosystem name" },
  "settings.name.help": {
    ca: "Es mostra a la capçalera i als informes enviats.",
    en: "Shown in the header and in sent reports.",
  },
  "settings.logo": { ca: "Logotip", en: "Logo" },
  "settings.logo.help": {
    ca: "PNG o SVG, mínim 256 × 256 px, màxim 512 kB.",
    en: "PNG or SVG, min 256 × 256 px, max 512 kB.",
  },
  "settings.logo.remove": { ca: "Elimina el logotip", en: "Remove logo" },
  "settings.logo.preview": { ca: "Previsualització", en: "Preview" },
  "settings.lang": { ca: "Idioma per defecte", en: "Default language" },
  "settings.lang.help": {
    ca: "S'aplicarà a totes les persones que no hagin triat idioma.",
    en: "Applied to everyone who has not picked a language.",
  },
  "settings.timezone": { ca: "Zona horària", en: "Time zone" },
  "settings.saved": { ca: "S'ha desat la configuració.", en: "Settings saved." },
  "settings.savedAt": { ca: "Desat a les ", en: "Saved at " },
  "settings.saving": { ca: "S'està desant…", en: "Saving…" },
  "settings.name.required": { ca: "Cal un nom", en: "A name is required" },
  "settings.identity": { ca: "Identitat", en: "Identity" },
  "settings.localisation": { ca: "Idioma i regió", en: "Language & region" },

  // ---- Connections -------------------------------------------------------
  "conn.title": { ca: "Connexions", en: "Connections" },
  "conn.subtitle": {
    ca: "Integracions externes connectades a l'ecosistema.",
    en: "External integrations connected to the ecosystem.",
  },
  "conn.add": { ca: "Afegeix una connexió", en: "New connection" },
  "conn.edit": { ca: "Edita la connexió", en: "Edit connection" },
  "conn.auth": { ca: "Autenticació", en: "Authentication" },
  "conn.scope": { ca: "Abast", en: "Scope" },
  "conn.connectedOn": { ca: "Connectada el", en: "Connected on" },
  "conn.lastEvent": { ca: "Últim esdeveniment", en: "Last event" },
  "conn.owner": { ca: "Responsable", en: "Owner" },
  "conn.close": { ca: "Tanca", en: "Close" },
  "conn.saving": { ca: "Desant…", en: "Saving…" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[key][locale] ?? translations[key][DEFAULT_LOCALE];
}

export function isLocale(value: string | undefined): value is Locale {
  return value === "ca" || value === "en";
}
