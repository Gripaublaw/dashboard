/**
 * Framework-agnostic dashboard mock data. Replace with real queries later.
 * Dates are fixed ISO strings so server and client render identically.
 */

export interface ActivityItem {
  id: string;
  /** translation key describing the action */
  template:
    | "deployed"
    | "invited"
    | "connector"
    | "incident"
    | "export"
    | "key"
    | "billing";
  actor: string;
  subject: string;
  at: string;
  /** ISO timestamp used for the <time> element */
  iso: string;
  kind: "success" | "info" | "warning" | "danger";
}

export const activities: ActivityItem[] = [
  {
    id: "act-1",
    template: "deployed",
    actor: "Xavier Font",
    subject: "Facturació v4.2",
    at: "Avui, 09:42",
    iso: "2025-02-11T09:42:00Z",
    kind: "success",
  },
  {
    id: "act-2",
    template: "invited",
    actor: "Joan Ferrer",
    subject: "support@nexus.cat",
    at: "Avui, 09:05",
    iso: "2025-02-11T09:05:00Z",
    kind: "info",
  },
  {
    id: "act-3",
    template: "connector",
    actor: "Sistema",
    subject: "Stripe",
    at: "Ahir, 22:18",
    iso: "2025-02-10T22:18:00Z",
    kind: "warning",
  },
  {
    id: "act-4",
    template: "incident",
    actor: "Aina Solé",
    subject: "API de facturació",
    at: "Ahir, 17:30",
    iso: "2025-02-10T17:30:00Z",
    kind: "danger",
  },
  {
    id: "act-5",
    template: "export",
    actor: "Xavier Font",
    subject: "auditoria-2025-02.csv",
    at: "Ahir, 11:12",
    iso: "2025-02-10T11:12:00Z",
    kind: "info",
  },
  {
    id: "act-6",
    template: "key",
    actor: "Pau Vidal",
    subject: "Nexus Analytics",
    at: "10 de febrer, 08:44",
    iso: "2025-02-10T08:44:00Z",
    kind: "success",
  },
  {
    id: "act-7",
    template: "billing",
    actor: "Sistema",
    subject: "Febrer 2025",
    at: "9 de febrer, 03:00",
    iso: "2025-02-09T03:00:00Z",
    kind: "info",
  },
];

export interface ServiceUptime {
  name: string;
  uptime: number;
  window: string;
}

export const uptime: ServiceUptime[] = [
  { name: "API principal", uptime: 99.98, window: "30 d" },
  { name: "Portal d'identitat", uptime: 99.94, window: "30 d" },
  { name: "Cua d'esdeveniments", uptime: 99.81, window: "30 d" },
  { name: "Informes", uptime: 98.92, window: "30 d" },
];

export interface AppRow {
  id: string;
  name: string;
  slug: string;
  /** short mono initials used by the row badge */
  initials: string;
  hue: number;
  status: "active" | "pending" | "error" | "inactive";
  type: "internal" | "client" | "integration" | "api";
  meta: string;
}

export const appRows: AppRow[] = [
  {
    id: "app-1",
    name: "Facturació",
    slug: "facturacio.nexus.cat",
    initials: "FT",
    hue: 265,
    status: "active",
    type: "internal",
    meta: "v4.2 · fa 3 h",
  },
  {
    id: "app-2",
    name: "Portal Ciutadà",
    slug: "ciutada.nexus.cat",
    initials: "PC",
    hue: 200,
    status: "active",
    type: "client",
    meta: "v2.9 · fa 1 dia",
  },
  {
    id: "app-3",
    name: "Nexus Analytics",
    slug: "analytics.nexus.cat",
    initials: "NA",
    hue: 155,
    status: "pending",
    type: "internal",
    meta: "v0.8-beta · fa 4 dies",
  },
  {
    id: "app-4",
    name: "Suport Omnicanal",
    slug: "suport.nexus.cat",
    initials: "SO",
    hue: 25,
    status: "error",
    type: "client",
    meta: "v1.6 · fa 26 min",
  },
  {
    id: "app-5",
    name: "API Pública",
    slug: "api.nexus.cat/v2",
    initials: "AP",
    hue: 235,
    status: "active",
    type: "api",
    meta: "v2.1 · fa 6 h",
  },
  {
    id: "app-6",
    name: "Inventari Magatzem",
    slug: "magatzem.nexus.cat",
    initials: "IM",
    hue: 340,
    status: "inactive",
    type: "internal",
    meta: "v1.0 · fa 3 mesos",
  },
  {
    id: "app-7",
    name: "Notifica SMS",
    slug: "sms.nexus.cat",
    initials: "NS",
    hue: 190,
    status: "active",
    type: "integration",
    meta: "v3.0 · fa 12 h",
  },
];

export interface UserRow {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer" | "auditor";
  status: "active" | "invited" | "suspended";
  lastSeen: string;
  initials: string;
  hue: number;
}

export const userRows: UserRow[] = [
  {
    id: "usr-1",
    name: "Xavier Font",
    email: "marta.ripoll@nexus.cat",
    role: "admin",
    status: "active",
    lastSeen: "fa 4 min",
    initials: "MR",
    hue: 265,
  },
  {
    id: "usr-2",
    name: "Joan Ferrer",
    email: "joan.ferrer@nexus.cat",
    role: "editor",
    status: "active",
    lastSeen: "fa 2 h",
    initials: "JF",
    hue: 200,
  },
  {
    id: "usr-3",
    name: "Aina Solé",
    email: "aina.sole@nexus.cat",
    role: "admin",
    status: "active",
    lastSeen: "fa 1 dia",
    initials: "AS",
    hue: 340,
  },
  {
    id: "usr-4",
    name: "Pau Vidal",
    email: "pau.vidal@nexus.cat",
    role: "viewer",
    status: "invited",
    lastSeen: "convitat ahir",
    initials: "PV",
    hue: 155,
  },
  {
    id: "usr-5",
    name: "Núria Camps",
    email: "nuria.camps@nexus.cat",
    role: "editor",
    status: "active",
    lastSeen: "fa 5 h",
    initials: "NC",
    hue: 25,
  },
  {
    id: "usr-6",
    name: "Oriol Banús",
    email: "oriol.banus@nexus.cat",
    role: "auditor",
    status: "suspended",
    lastSeen: "fa 3 mesos",
    initials: "OB",
    hue: 235,
  },
];

export interface ConnectionRow {
  id: string;
  name: string;
  vendor: string;
  initials: string;
  hue: number;
  status: "active" | "warning" | "error";
  auth: string;
  scope: string;
  connectedOn: string;
  lastEvent: string;
  owner: string;
  description: string;
}

export const connectionRows: ConnectionRow[] = [
  {
    id: "cnx-1",
    name: "Stripe",
    vendor: "Pagaments i subscripcions",
    initials: "ST",
    hue: 265,
    status: "warning",
    auth: "Clau secreta",
    scope: "Lectura i escriptura",
    connectedOn: "12 de març de 2024",
    lastEvent: "fa 2 h",
    owner: "Xavier Font",
    description:
      "Sincronitza factures, subscripcions i devolucions amb el mòdul de facturació.",
  },
  {
    id: "cnx-2",
    name: "Google Workspace",
    vendor: "Directori i correu",
    initials: "GW",
    hue: 200,
    status: "active",
    auth: "OAuth 2.0",
    scope: "Directori (només lectura)",
    connectedOn: "4 de gener de 2025",
    lastEvent: "fa 6 min",
    owner: "Joan Ferrer",
    description:
      "Proveeix l'inici de sessió únic i sincronitza els grups d'usuaris cada hora.",
  },
  {
    id: "cnx-3",
    name: "MongoDB Atlas",
    vendor: "Base de dades principal",
    initials: "MA",
    hue: 155,
    status: "active",
    auth: "Cadena de connexió",
    scope: "Cluster nexus-prod",
    connectedOn: "20 de novembre de 2023",
    lastEvent: "ara mateix",
    owner: "Aina Solé",
    description:
      "Magatzem principal de dades operatives amb còpia de seguretat diària.",
  },
  {
    id: "cnx-4",
    name: "Slack",
    vendor: "Alertes de l'equip",
    initials: "SL",
    hue: 340,
    status: "error",
    auth: "Webhook entrant",
    scope: "#nexus-alerts",
    connectedOn: "8 de febrer de 2025",
    lastEvent: "fa 3 dies",
    owner: "Núria Camps",
    description:
      "Envia avisos d'incidents i desplegaments al canal d'operacions.",
  },
  {
    id: "cnx-5",
    name: "Sentry",
    vendor: "Monitoratge d'errors",
    initials: "SE",
    hue: 25,
    status: "active",
    auth: "Token DSN",
    scope: "Projecte web-frontend",
    connectedOn: "17 de setembre de 2024",
    lastEvent: "fa 18 min",
    owner: "Pau Vidal",
    description:
      "Recull excepcions de les apps del portal i agrupa els errors per versió.",
  },
];
