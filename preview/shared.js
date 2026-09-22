/* Shared preview primitives: icons, theme tokens, i18n helpers, mock data. */

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
  search: "M20 20l-3.9-3.9M17 11a6 6 0 1 0-12 0 6 6 0 0 0 12 0",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  chevron: "m6 9 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  trash: [
    "M4 7h16M9.5 7V4.8h5V7M6.5 7l.9 12.2A1.8 1.8 0 0 0 9.2 21h5.6a1.8 1.8 0 0 0 1.8-1.8L17.5 7",
    "M10.5 11v6M13.5 11v6",
  ],
  plug: "M9 12h6M8.5 8.5H7a3.5 3.5 0 0 0 0 7h1.5M15.5 8.5H17a3.5 3.5 0 0 1 0 7h-1.5",
  check: "M4 12.5l5 5L20 6.5",
};

const THEMES = {
  dark: {
    base: "#1e1e2e",
    surface: "#2a2a3e",
    surface2: "#23233a",
    overlay: "#31314a",
    line: "#3b3b55",
    scrim: "rgba(12,12,24,0.65)",
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
    shadow: "0 1px 2px rgba(8,8,20,0.35)",
    overlayShadow: "0 18px 40px -20px rgba(8,8,20,0.75)",
    hues: {
      25: ["#f0b661", "#f7cf95"],
      155: ["#4ad6a5", "#7ee8c3"],
      200: ["#6aa9f2", "#a3c8f8"],
      235: ["#8f9bf5", "#bcc3fb"],
      265: ["#a98cf5", "#cbb9fb"],
      340: ["#f083a8", "#f9aec6"],
    },
  },
  light: {
    base: "#f3f4fa",
    surface: "#ffffff",
    surface2: "#f6f7fc",
    overlay: "#ffffff",
    line: "#dfe1ee",
    scrim: "rgba(24,24,46,0.35)",
    strong: "#1b1b2f",
    body: "#3c3c56",
    muted: "#63637f",
    muted2: "#8b8ba6",
    brandInk: "#403cb8",
    brandContrast: "#ffffff",
    success: "#12876a",
    successSoft: "rgba(18,135,106,0.1)",
    successInk: "#0d6b53",
    warning: "#b7791f",
    warningSoft: "rgba(183,121,31,0.12)",
    warningInk: "#8f5d13",
    danger: "#c93d63",
    dangerSoft: "rgba(201,61,99,0.1)",
    dangerInk: "#a3284b",
    shadow: "0 1px 2px rgba(24,24,46,0.06)",
    overlayShadow: "0 18px 40px -24px rgba(24,24,46,0.35)",
    hues: {
      25: ["#b7791f", "#8f5d13"],
      155: ["#12876a", "#0d6b53"],
      200: ["#2563b0", "#1c4c88"],
      235: ["#4f4ac4", "#3b3797"],
      265: ["#7a45c9", "#5e349c"],
      340: ["#c93d76", "#9d2c5b"],
    },
  },
};

const DICT = {
  "nav.home": ["Inici", "Home"],
  "nav.apps": ["Aplicacions", "Applications"],
  "nav.users": ["Usuaris", "Users"],
  "nav.settings": ["Configuració", "Settings"],
  "nav.connections": ["Connexions", "Connections"],
  tagline: ["Panell de control", "Control panel"],
  "app.env": ["Producció", "Production"],
  role: ["Administradora", "Administrator"],
  "role.admin": ["Administrador", "Admin"],
  "role.editor": ["Editor", "Editor"],
  "role.viewer": ["Consulta", "Viewer"],
  "role.auditor": ["Auditor", "Auditor"],
  "status.active": ["Actiu", "Active"],
  "status.inactive": ["Inactiu", "Inactive"],
  "status.pending": ["Pendent", "Pending"],
  "status.invited": ["Convidat", "Invited"],
  "status.suspended": ["Suspès", "Suspended"],
  "status.error": ["Amb errors", "Degraded"],
  "status.accepted": ["Acceptada", "Accepted"],
  "status.warning": ["Avís", "Warning"],
  "action.edit": ["Edita", "Edit"],
  "action.delete": ["Elimina", "Delete"],
  "action.view": ["Mostra", "View"],
  "action.search": ["Cerca", "Search"],
  "action.save": ["Desa els canvis", "Save changes"],
  "action.cancel": ["Cancel·la", "Cancel"],
  "action.reset": ["Restaura", "Reset"],
  "action.upload": ["Puja un fitxer", "Upload a file"],
  "action.close": ["Tanca", "Close"],
  "table.name": ["Nom", "Name"],
  "table.status": ["Estat", "Status"],
  "table.type": ["Tipus", "Type"],
  "table.role": ["Rol", "Role"],
  "table.actions": ["Accions", "Actions"],
  "table.showing": ["Es mostren", "Showing"],
  "table.of": ["de", "of"],
  "table.results": ["registres", "records"],
  "theme.dark": ["Fosc", "Dark"],
  "theme.light": ["Clar", "Light"],
  "theme.toDark": ["Canvia a tema fosc", "Switch to dark theme"],
  "theme.toLight": ["Canvia a tema clar", "Switch to light theme"],
  "header.logout": ["Tanca la sessió", "Sign out"],
  "home.subtitle": [
    "Estat general de l'ecosistema digital i activitat recent.",
    "Overall health of the digital ecosystem and recent activity.",
  ],
  "metric.apps": ["Nombre d'apps", "Number of apps"],
  "metric.users": ["Usuaris actius", "Active users"],
  "metric.services": ["Serveis integrats", "Integrated services"],
  "metric.status": ["Estat del sistema", "System status"],
  "metric.apps.hint": ["2 noves aquest mes", "2 new this month"],
  "metric.users.hint": ["Fa 5 min", "5 min ago"],
  "metric.services.hint": ["1 pendent", "1 pending"],
  "metric.status.hint": ["99,94 % de disponibilitat", "99.94% uptime"],
  "home.activity": ["Últimes activitats", "Latest activity"],
  "home.activity.sub": [
    "Esdeveniments de les darreres 48 hores.",
    "Events from the last 48 hours.",
  ],
  "home.events": ["7 esdeveniments", "7 events"],
  "home.uptime": ["Disponibilitat per servei", "Uptime per service"],
  "home.window": ["Últims 30 dies", "Last 30 days"],
  "home.health": ["Salut de la plataforma", "Platform health"],
  "home.health.sub": ["Comprovacions automàtiques cada 60 s", "Automatic checks every 60s"],
  "home.queue": ["Cua d'esdeveniments", "Event queue"],
  "home.db": ["Base de dades", "Database"],
  "home.jobs": ["Feines en cua", "Queued jobs"],
  "home.backup": ["Última còpia", "Last backup"],
  "apps.subtitle": [
    "Aplicacions desplegades dins de l'ecosistema Nexus.",
    "Applications deployed inside the Nexus ecosystem.",
  ],
  "apps.add": ["Afegeix una app", "New app"],
  "apps.search": ["Cerca aplicacions…", "Search applications…"],
  "apps.all": ["Totes", "All"],
  "apps.clear": ["Esborra els filtres", "Clear filters"],
  "apps.empty": ["Cap aplicació coincideix", "No matching application"],
  "apps.empty.body": [
    "Prova amb un altre nom o esborra els filtres per veure totes les apps.",
    "Try another name or clear the filters to see every app.",
  ],
  "apps.created": ["App afegida: Nexus Backoffice", "App added: Nexus Backoffice"],
  "type.internal": ["Interna", "Internal"],
  "type.client": ["Client", "Client-facing"],
  "type.integration": ["Integració", "Integration"],
  "type.api": ["API", "API"],
  "users.subtitle": [
    "Persones amb accés a l'ecosistema i els seus permisos.",
    "People with access to the ecosystem and their permissions.",
  ],
  "users.add": ["Afegeix un usuari", "New user"],
  "users.search": ["Cerca usuaris…", "Search users…"],
  "users.invited": ["Invitació enviada", "Invitation sent"],
  "users.empty": ["Cap usuari coincideix", "No matching user"],
  "users.empty.body": [
    "Revisa l'ortografia o canvia el filtre d'estat.",
    "Check the spelling or switch the status filter.",
  ],
  "settings.subtitle": [
    "Identitat i paràmetres per defecte de l'ecosistema.",
    "Identity and default parameters for the ecosystem.",
  ],
  "settings.form": ["Identitat de l'ecosistema", "Ecosystem identity"],
  "settings.name": ["Nom de l'ecosistema", "Ecosystem name"],
  "settings.name.help": [
    "Es mostra a la capçalera i als informes enviats.",
    "Shown in the header and in sent reports.",
  ],
  "settings.logo": ["Logotip", "Logo"],
  "settings.logo.help": [
    "PNG o SVG, mínim 256 × 256 px, màxim 512 kB.",
    "PNG or SVG, min 256 × 256 px, max 512 kB.",
  ],
  "settings.logo.remove": ["Elimina el logotip", "Remove logo"],
  "settings.preview": ["Previsualització", "Preview"],
  "settings.lang": ["Idioma per defecte", "Default language"],
  "settings.lang.help": [
    "S'aplicarà a totes les persones que no hagin triat idioma.",
    "Applied to everyone who has not picked a language.",
  ],
  "settings.saved": ["S'ha desat la configuració.", "Settings saved."],
  "settings.savedAt": ["Desat a les ", "Saved at "],
  "settings.note": [
    "Els canvis s'apliquen a la capçalera, als informes i a les invitacions per correu.",
    "Changes apply to the header, reports and email invitations.",
  ],
  "settings.min3": [
    "El nom ha de tenir com a mínim 3 caràcters.",
    "The name must be at least 3 characters long.",
  ],
  "conn.subtitle": [
    "Integracions externes connectades a l'ecosistema.",
    "External integrations connected to the ecosystem.",
  ],
  "conn.add": ["Afegeix una connexió", "New connection"],
  "conn.edit": ["Edita la connexió", "Edit connection"],
  "conn.auth": ["Autenticació", "Authentication"],
  "conn.scope": ["Abast", "Scope"],
  "conn.connectedOn": ["Connectada el", "Connected on"],
  "conn.lastEvent": ["Últim esdeveniment", "Last event"],
  "conn.owner": ["Responsable", "Owner"],
};

const tr = (l, k) => (DICT[k] ? DICT[k][l === "ca" ? 0 : 1] : k);

const ACTIVITY = [
  ["deployed", "Xavier Font", "Facturació v4.2", "Avui, 09:42", "success"],
  ["invited", "Joan Ferrer", "support@nexus.cat", "Avui, 09:05", "info"],
  ["connector", "Sistema", "Stripe", "Ahir, 22:18", "warning"],
  ["incident", "Aina Solé", "API de facturació", "Ahir, 17:30", "danger"],
  ["export", "Xavier Font", "auditoria-2025-02.csv", "Ahir, 11:12", "info"],
  ["key", "Pau Vidal", "Nexus Analytics", "10 de febrer, 08:44", "success"],
  ["billing", "Sistema", "Febrer 2025", "9 de febrer, 03:00", "info"],
];

const ACT_TEMPLATES = {
  deployed: [(a, s) => `${a} ha desplegat ${s}`, (a, s) => `${a} deployed ${s}`],
  invited: [(a, s) => `${a} ha convidat ${s}`, (a, s) => `${a} invited ${s}`],
  connector: [
    (a, s) => `${a}: el connector ${s} necessita atenció`,
    (a, s) => `${a}: connector ${s} needs attention`,
  ],
  incident: [
    (a, s) => `${a} ha resolt un incident a ${s}`,
    (a, s) => `${a} resolved an incident on ${s}`,
  ],
  export: [(a, s) => `${a} ha exportat ${s}`, (a, s) => `${a} exported ${s}`],
  key: [
    (a, s) => `${a} ha rotat la clau de ${s}`,
    (a, s) => `${a} rotated the key for ${s}`,
  ],
  billing: [
    (a, s) => `${a} ha emès la factura de ${s}`,
    (a, s) => `${a} issued the invoice for ${s}`,
  ],
};

const APPS = [
  ["Facturació", "facturacio.nexus.cat", "FT", 265, "active", "internal", "v4.2 · fa 3 h"],
  ["Portal Ciutadà", "ciutada.nexus.cat", "PC", 200, "active", "client", "v2.9 · fa 1 dia"],
  ["Nexus Analytics", "analytics.nexus.cat", "NA", 155, "pending", "internal", "v0.8-beta · fa 4 dies"],
  ["Suport Omnicanal", "suport.nexus.cat", "SO", 25, "error", "client", "v1.6 · fa 26 min"],
  ["API Pública", "api.nexus.cat/v2", "AP", 235, "active", "api", "v2.1 · fa 6 h"],
  ["Inventari Magatzem", "magatzem.nexus.cat", "IM", 340, "inactive", "internal", "v1.0 · fa 3 mesos"],
  ["Notifica SMS", "sms.nexus.cat", "NS", 200, "active", "integration", "v3.0 · fa 12 h"],
].map((r, i) => ({
  id: `app-${i}`,
  name: r[0],
  slug: r[1],
  initials: r[2],
  hue: r[3],
  status: r[4],
  type: r[5],
  meta: r[6],
}));

const USERS = [
  ["Xavier Font", "marta.ripoll@nexus.cat", "admin", "active", "fa 4 min", "MR", 265],
  ["Joan Ferrer", "joan.ferrer@nexus.cat", "editor", "active", "fa 2 h", "JF", 200],
  ["Aina Solé", "aina.sole@nexus.cat", "admin", "active", "fa 1 dia", "AS", 340],
  ["Pau Vidal", "pau.vidal@nexus.cat", "viewer", "invited", "convitat ahir", "PV", 155],
  ["Núria Camps", "nuria.camps@nexus.cat", "editor", "active", "fa 5 h", "NC", 25],
  ["Oriol Banús", "oriol.banus@nexus.cat", "auditor", "suspended", "fa 3 mesos", "OB", 235],
].map((r, i) => ({
  id: `usr-${i}`,
  name: r[0],
  email: r[1],
  role: r[2],
  status: r[3],
  lastSeen: r[4],
  initials: r[5],
  hue: r[6],
}));

const CONNECTIONS = [
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
    description: "Envia avisos d'incidents i desplegaments al canal d'operacions.",
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

const UPTIME = [
  ["API principal", 99.98],
  ["Portal d'identitat", 99.94],
  ["Cua d'esdeveniments", 99.81],
  ["Informes", 98.92],
];

const NAV = [
  { route: "/", key: "nav.home", icon: "home" },
  { route: "/apps", key: "nav.apps", icon: "apps" },
  { route: "/usuaris", key: "nav.users", icon: "users" },
  { route: "/connexions", key: "nav.connections", icon: "connections" },
  { route: "/configuracio", key: "nav.settings", icon: "settings" },
];

const NAV = [
  { route: "/", key: "nav.home", icon: "home" },
  { route: "/apps", key: "nav.apps", icon: "apps" },
  { route: "/usuaris", key: "nav.users", icon: "users" },
  { route: "/connexions", key: "nav.connections", icon: "connections" },
  { route: "/configuracio", key: "nav.settings", icon: "settings" },
];

/* ------------------------------------------------------------- primitives */
function Icon({ d, size = 18 }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "0 0 auto" }}
    >
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const chipStyle = (tk, tone) =>
  ({
    success: {
      background: tk.successSoft,
      color: tk.successInk,
      border: `1px solid ${tk.success}55`,
    },
    info: {
      background: tk.brandSoft,
      color: tk.brandInk,
      border: `1px solid ${tk.brand}55`,
    },
    warning: {
      background: tk.warningSoft,
      color: tk.warningInk,
      border: `1px solid ${tk.warning}55`,
    },
    danger: {
      background: tk.dangerSoft,
      color: tk.dangerInk,
      border: `1px solid ${tk.danger}55`,
    },
    neutral: {
      background: tk.surface2,
      color: tk.muted,
      border: `1px solid ${tk.line}`,
    },
  }[tone] || {});

function StatusBadge({ tk, label, tone = "neutral" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
        ...chipStyle(tk, tone),
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }} />
      {label}
    </span>
  );
}

function InitialsBadge({ tk, initials, hue, size = 36 }) {
  const [base, ink] = tk.hues[hue] || [tk.brand, tk.brandInk];
  return (
    <span
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        display: "grid",
        placeItems: "center",
        borderRadius: 6,
        background: `${base}33`,
        color: ink,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {initials}
    </span>
  );
}

function Card({ tk, children, style }) {
  return (
    <section
      style={{
        background: tk.surface,
        border: `1px solid ${tk.line}`,
        borderRadius: tk.radius,
        boxShadow: tk.shadow,
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Button({ tk, variant = "secondary", icon, children, onClick, style, title }) {
  const variants = {
    primary: { background: tk.brand, color: tk.brandContrast, border: "1px solid transparent" },
    secondary: { background: tk.surface, color: tk.body, border: `1px solid ${tk.line}` },
    ghost: { background: "transparent", color: tk.muted, border: "1px solid transparent" },
  };
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        minHeight: 40,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 6,
        fontSize: 14,
        fontWeight: 500,
        fontFamily: "inherit",
        cursor: "pointer",
        ...variants[variant],
        ...style,
      }}
    >
      {icon && <Icon d={ICON[icon]} size={16} />}
      {children}
    </button>
  );
}

function RowActions({ tk, locale, withView }) {
  const btn = {
    width: 32,
    height: 32,
    display: "grid",
    placeItems: "center",
    borderRadius: 6,
    background: "transparent",
    border: `1px solid ${tk.line}`,
    color: tk.muted,
    cursor: "pointer",
  };
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
      {withView && (
        <button
          type="button"
          style={btn}
          title={tr(locale, "action.view")}
          aria-label={tr(locale, "action.view")}
        >
          <Icon
            d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12"
            size={15}
          />
        </button>
      )}
      <button
        type="button"
        style={btn}
        title={tr(locale, "action.edit")}
        aria-label={tr(locale, "action.edit")}
      >
        <Icon d="M4 20h4l10-10-4-4L4 16zM14.5 5.5l4 4" size={15} />
      </button>
      <button
        type="button"
        style={btn}
        title={tr(locale, "action.delete")}
        aria-label={tr(locale, "action.delete")}
      >
        <Icon
          d="M4 7h16M9.5 7V4.8h5V7M6.5 7l.9 12.2A1.8 1.8 0 0 0 9.2 21h5.6a1.8 1.8 0 0 0 1.8-1.8L17.5 7M10.5 11v6M13.5 11v6"
          size={15}
        />
      </button>
    </div>
  );
}

function EmptyState({ tk, icon, title, body, action }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "48px 24px",
      }}
    >
      <span
        style={{
          width: 44,
          height: 44,
          display: "grid",
          placeItems: "center",
          borderRadius: 999,
          border: `1px solid ${tk.line}`,
          background: tk.surface2,
          color: tk.muted,
        }}
      >
        <Icon d={ICON[icon] || ICON.search} size={20} />
      </span>
      <h3 style={{ margin: "16px 0 0", fontSize: 16, fontWeight: 600, color: tk.strong }}>
        {title}
      </h3>
      <p style={{ margin: "4px 0 0", maxWidth: 340, fontSize: 14, color: tk.muted }}>{body}</p>
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

function SectionTitle({ tk, title, subtitle, action }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: tk.strong }}>{title}</h2>
        {subtitle && <p style={{ margin: "4px 0 0", fontSize: 14, color: tk.muted }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function PageHeading({ tk, title, subtitle, actions }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 24,
      }}
    >
      <div style={{ maxWidth: 620 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: tk.strong,
          }}
        >
          {title}
        </h2>
        <p style={{ margin: "4px 0 0", fontSize: 14, color: tk.muted }}>{subtitle}</p>
      </div>
      {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
    </div>
  );
}

const inputStyle = (tk, mono) => ({
  minHeight: 40,
  width: "100%",
  boxSizing: "border-box",
  background: tk.surface2,
  border: `1px solid ${tk.line}`,
  borderRadius: 6,
  padding: "0 12px",
  fontSize: 14,
  color: tk.body,
  fontFamily: mono ? "ui-monospace, SFMono-Regular, monospace" : "inherit",
  outline: "none",
});
}
