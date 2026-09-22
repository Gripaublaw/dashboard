/* The five dashboard sections, mirroring routes/*.tsx. */

import {
  ACTIVITY,
  ACT_TEMPLATES,
  APPS,
  Button,
  Card,
  CONNECTIONS,
  EmptyState,
  Icon,
  ICON,
  InitialsBadge,
  inputStyle,
  NAV,
  PageHeading,
  RowActions,
  SectionTitle,
  StatusBadge,
  tr,
  UPTIME,
  USERS,
} from "./shared.js";

const { useState } = React;

const STATUS_TONE = {
  active: "success",
  pending: "warning",
  error: "danger",
  inactive: "neutral",
  invited: "info",
  warning: "warning",
};

const ROLE_KEY = {
  admin: "role.admin",
  editor: "role.editor",
  viewer: "role.viewer",
  auditor: "role.auditor",
};

function chipColor(tk, kind) {
  return (
    {
      success: tk.success,
      info: tk.brand,
      warning: tk.warning,
      danger: tk.danger,
    }[kind] || tk.brand
  );
}

/* ------------------------------------------------------------------ Inici */
function MetricCard({ tk, icon, label, value, unit, chip, hint, tone }) {
  return (
    <Card tk={tk} style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: tk.muted, paddingTop: 6 }}>
          {label}
        </p>
        <span
          style={{
            width: 32,
            height: 32,
            flex: "0 0 auto",
            display: "grid",
            placeItems: "center",
            borderRadius: 6,
            background: tk[`${tone}Soft`] || tk.brandSoft,
            color: tk[`${tone}Ink`] || tk.brandInk,
          }}
        >
          <Icon d={ICON[icon]} size={16} />
        </span>
      </div>
      <p
        style={{
          margin: "12px 0 0",
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: tk.strong,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: 16, fontWeight: 500, color: tk.muted, marginLeft: 4 }}>
            {unit}
          </span>
        )}
      </p>
      <div
        style={{ marginTop: 8, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}
      >
        {chip && <StatusBadge tk={tk} label={chip} tone={tone} />}
        <span style={{ fontSize: 12, color: tk.muted }}>{hint}</span>
      </div>
    </Card>
  );
}

function ActivityRow({ tk, item, locale }) {
  const [template, actor, subject, at, kind] = item;
  return (
    <li
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 8,
        padding: "12px 4px",
        borderTop: `1px solid ${tk.line}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
        <span
          style={{
            marginTop: 7,
            width: 6,
            height: 6,
            flex: "0 0 auto",
            borderRadius: 999,
            background: chipColor(tk, kind),
          }}
        />
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, color: tk.body }}>
            {ACT_TEMPLATES[template][locale === "ca" ? 0 : 1](actor, subject)}
          </p>
          <span style={{ fontSize: 12, color: tk.muted2 }}>{at}</span>
        </div>
      </div>
      <StatusBadge tk={tk} label={tr(locale, "status.accepted")} tone={kind} />
    </li>
  );
}

function SectionHome({ tk, locale }) {
  return (
    <>
      <PageHeading tk={tk} title={tr(locale, "nav.home")} subtitle={tr(locale, "home.subtitle")} />

      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        <MetricCard
          tk={tk}
          icon="apps"
          tone="info"
          label={tr(locale, "metric.apps")}
          value="7"
          chip="+2 / mes"
          hint={tr(locale, "metric.apps.hint")}
        />
        <MetricCard
          tk={tk}
          icon="users"
          tone="success"
          label={tr(locale, "metric.users")}
          value="1"
          chip={tr(locale, "status.active")}
          hint={tr(locale, "metric.users.hint")}
        />
        <MetricCard
          tk={tk}
          icon="connections"
          tone="warning"
          label={tr(locale, "metric.services")}
          value="5"
          unit="/ 6"
          chip={tr(locale, "status.warning")}
          hint={tr(locale, "metric.services.hint")}
        />
        <MetricCard
          tk={tk}
          icon="activity"
          tone="success"
          label={tr(locale, "metric.status")}
          value="99,94"
          unit="%"
          chip={tr(locale, "status.active")}
          hint={tr(locale, "metric.status.hint")}
        />
      </div>

      <div
        style={{
          display: "grid",
          gap: 20,
          alignItems: "start",
          marginTop: 20,
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        }}
      >
        <Card tk={tk} style={{ padding: 20 }}>
          <SectionTitle
            tk={tk}
            title={tr(locale, "home.activity")}
            subtitle={tr(locale, "home.activity.sub")}
            action={<StatusBadge tk={tk} label={tr(locale, "home.events")} tone="neutral" />}
          />
          <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0 }}>
            {ACTIVITY.map((item, i) => (
              <ActivityRow key={i} tk={tk} item={item} locale={locale} />
            ))}
          </ul>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Card tk={tk} style={{ padding: 20 }}>
            <SectionTitle
              tk={tk}
              title={tr(locale, "home.uptime")}
              subtitle={tr(locale, "home.window")}
            />
            <ul
              style={{
                listStyle: "none",
                margin: "16px 0 0",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {UPTIME.map(([name, value]) => (
                <li key={name}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                    <span style={{ color: tk.body, fontWeight: 500 }}>{name}</span>
                    <span
                      style={{
                        color: tk.muted,
                        fontSize: 12,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {value.toFixed(2).replace(".", ",")} %
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      height: 6,
                      borderRadius: 999,
                      background: tk.surface2,
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        height: "100%",
                        width: `${value}%`,
                        borderRadius: 999,
                        background: value > 99.9
                          ? tk.success
                          : value > 99.5
                          ? tk.warning
                          : tk.danger,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card tk={tk} style={{ padding: 20 }}>
            <SectionTitle
              tk={tk}
              title={tr(locale, "home.health")}
              subtitle={tr(locale, "home.health.sub")}
            />
            <dl
              style={{
                margin: "16px 0 0",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                fontSize: 14,
              }}
            >
              {[
                [tr(locale, "home.queue"), "12 ms"],
                [tr(locale, "home.db"), "4 ms"],
                [tr(locale, "home.jobs"), "3"],
                [tr(locale, "home.backup"), "03:00"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
                >
                  <dt style={{ color: tk.muted }}>{label}</dt>
                  <dd
                    style={{
                      margin: 0,
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 12,
                      color: tk.body,
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------------------------- table pieces */
function Head({ tk, columns }) {
  return (
    <thead>
      <tr style={{ background: tk.surface2 }}>
        {columns.map((col, i, arr) => (
          <th
            key={col}
            scope="col"
            style={{
              textAlign: i === arr.length - 1 ? "right" : "left",
              padding: "12px 16px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: tk.muted,
              borderBottom: `1px solid ${tk.line}`,
              whiteSpace: "nowrap",
            }}
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Td({ tk, children, align }) {
  return (
    <td
      style={{
        padding: "12px 16px",
        borderBottom: `1px solid ${tk.line}`,
        textAlign: align,
        verticalAlign: "middle",
      }}
    >
      {children}
    </td>
  );
}

function FilterBar({ tk, locale, value, onChange, placeholder, onAdd, notice, onDismiss, options }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          padding: 16,
          borderBottom: `1px solid ${tk.line}`,
        }}
      >
        <label style={{ position: "relative", flex: "1 1 220px", minWidth: 180 }}>
          <span style={{ position: "absolute", left: 10, top: 11, color: tk.muted2 }}>
            <Icon d={ICON.search} size={16} />
          </span>
          <input
            type="search"
            value={value.startsWith("#") ? "" : value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            style={{ ...inputStyle(tk), paddingLeft: 34 }}
          />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {options.map(([id, label]) => {
            const active = id === "all"
              ? !value.startsWith("#")
              : value.startsWith("#") && value.slice(1) === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id === "all" ? "" : `#${id}`)}
                style={{
                  minHeight: 36,
                  padding: "0 12px",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  border: `1px solid ${active ? `${tk.brand}66` : tk.line}`,
                  background: active ? tk.brandSoft : tk.surface2,
                  color: active ? tk.brandInk : tk.muted,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <Button tk={tk} variant="primary" icon="plus" onClick={onAdd}>
          {locale === "ca" ? "Afegeix" : "Add"}
        </Button>
      </div>

      {notice && (
        <div
          role="status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: tk.successSoft,
            color: tk.successInk,
            fontSize: 12,
            fontWeight: 500,
            borderBottom: `1px solid ${tk.line}`,
          }}
        >
          <span aria-hidden="true">✓</span>
          {notice}
          <button
            type="button"
            onClick={onDismiss}
            style={{
              marginLeft: "auto",
              border: "none",
              background: "transparent",
              color: tk.muted,

/* ----------------------------------------------------------- Aplicacions */
export function SectionApps({ tk, locale }) {
  const [q, setQ] = useState("");
  const [notice, setNotice] = useState(null);

  const term = q.startsWith("#") ? "" : q.trim().toLowerCase();
  const status = q.startsWith("#") ? q.slice(1) : "all";
  const rows = APPS.filter((row) => {
    const okQ = !term || row.name.toLowerCase().includes(term) || row.slug.includes(term);
    const okS = status === "all" || row.status === status;
    return okQ && okS;
  });

  const filters = [
    ["all", tr(locale, "apps.all")],
    ["active", tr(locale, "status.active")],
    ["pending", tr(locale, "status.pending")],
    ["error", tr(locale, "status.error")],
    ["inactive", tr(locale, "status.inactive")],
  ];

  return (
    <>
      <PageHeading tk={tk} title={tr(locale, "nav.apps")} subtitle={tr(locale, "apps.subtitle")} />
      <Card tk={tk} style={{ overflow: "hidden" }}>
        <FilterBar
          tk={tk}
          locale={locale}
          value={q}
          onChange={setQ}
          placeholder={tr(locale, "apps.search")}
          onAdd={() => setNotice(`${tr(locale, "apps.created")} · ${tr(locale, "status.pending")}`)}
          notice={notice}
          onDismiss={() => setNotice(null)}
          options={filters}
        />

        {rows.length === 0
          ? (
            <EmptyState
              tk={tk}
              icon="apps"
              title={tr(locale, "apps.empty")}
              body={tr(locale, "apps.empty.body")}
              action={
                <Button tk={tk} icon="close" onClick={() => setQ("")}>
                  {tr(locale, "apps.clear")}
                </Button>
              }
            />
          )
          : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 680 }}
              >
                <Head
                  tk={tk}
                  columns={[
                    tr(locale, "table.name"),
                    tr(locale, "table.status"),
                    tr(locale, "table.type"),
                    tr(locale, "table.actions"),
                  ]}
                />
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <Td tk={tk}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <InitialsBadge tk={tk} initials={row.initials} hue={row.hue} />
                          <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 500, color: tk.strong }}>
                              {row.name}
                            </p>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 12,
                                color: tk.muted,
                                fontFamily: "ui-monospace, monospace",
                              }}
                            >
                              {row.slug} · {row.meta}
                            </p>
                          </div>
                        </div>
                      </Td>
                      <Td tk={tk}>
                        <StatusBadge
                          tk={tk}
                          tone={STATUS_TONE[row.status]}
                          label={tr(locale, `status.${row.status}`)}
                        />
                      </Td>
                      <Td tk={tk}>
                        <span style={{ color: tk.muted }}>{tr(locale, `type.${row.type}`)}</span>
                      </Td>
                      <Td tk={tk} align="right">
                        <RowActions tk={tk} locale={locale} withView />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        <RowsFooter
          tk={tk}
          locale={locale}
          visible={rows.length}
          total={APPS.length}
          right="regió eu-west-1 · desplegament automàtic"
        />
      </Card>
    </>
  );
}

/* --------------------------------------------------------------- Usuaris */
export function SectionUsers({ tk, locale }) {
  const [q, setQ] = useState("");
  const [notice, setNotice] = useState(null);

  const term = q.startsWith("#") ? "" : q.trim().toLowerCase();
  const status = q.startsWith("#") ? q.slice(1) : "all";
  const rows = USERS.filter((row) => {
    const okQ = !term ||
      row.name.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term);
    const okS = status === "all" || row.status === status;
    return okQ && okS;
  });

  const filters = [
    ["all", tr(locale, "apps.all")],
    ["active", tr(locale, "status.active")],
    ["invited", tr(locale, "status.invited")],
    ["suspended", tr(locale, "status.suspended")],
  ];

  return (
    <>
      <PageHeading
        tk={tk}
        title={tr(locale, "nav.users")}
        subtitle={tr(locale, "users.subtitle")}
      />
      <Card tk={tk} style={{ overflow: "hidden" }}>
        <FilterBar
          tk={tk}
          locale={locale}
          value={q}
          onChange={setQ}
          placeholder={tr(locale, "users.search")}
          onAdd={() => setNotice(`${tr(locale, "users.invited")} · convidat@nexus.cat`)}
          notice={notice}
          onDismiss={() => setNotice(null)}
          options={filters}
        />

        {rows.length === 0
          ? (
            <EmptyState
              tk={tk}
              icon="users"
              title={tr(locale, "users.empty")}
              body={tr(locale, "users.empty.body")}
              action={
                <Button tk={tk} icon="close" onClick={() => setQ("")}>
                  {tr(locale, "apps.clear")}
                </Button>
              }
            />
          )
          : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 680 }}
              >
                <Head
                  tk={tk}
                  columns={[
                    tr(locale, "table.name"),
                    tr(locale, "table.role"),
                    tr(locale, "table.status"),
                    tr(locale, "table.actions"),
                  ]}
                />
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <Td tk={tk}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <InitialsBadge tk={tk} initials={row.initials} hue={row.hue} />
                          <div style={{ minWidth: 0 }}>
                            <p style={{ margin: 0, fontWeight: 500, color: tk.strong }}>
                              {row.name}
                            </p>
                            <p style={{ margin: 0, fontSize: 12, color: tk.muted }}>{row.email}</p>
                          </div>
                        </div>
                      </Td>
                      <Td tk={tk}>
                        <span
                          style={{
                            border: `1px solid ${tk.line}`,
                            background: tk.surface2,
                            color: tk.muted,
                            padding: "2px 8px",
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        >
                          {tr(locale, ROLE_KEY[row.role])}
                        </span>
                      </Td>
                      <Td tk={tk}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: 4,
                          }}
                        >
                          <StatusBadge
                            tk={tk}
                            tone={STATUS_TONE[row.status]}
                            label={tr(locale, `status.${row.status}`)}
                          />
                          <span style={{ fontSize: 12, color: tk.muted2 }}>{row.lastSeen}</span>
                        </div>
                      </Td>
                      <Td tk={tk} align="right">
                        <RowActions tk={tk} locale={locale} />
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        <RowsFooter
          tk={tk}
          locale={locale}
          visible={rows.length}
          total={USERS.length}
          right="fa 12 min"
        />
      </Card>
    </>
  );
}

/* ----------------------------------------------------------- Configuració */
export function SectionSettings({ tk, locale, setLocale }) {
  const [name, setName] = useState("Nexus Ecosistema");
  const [logo, setLogo] = useState("logo-nexus.svg");
  const [defaultLang, setDefaultLang] = useState(locale);
  const [savedAt, setSavedAt] = useState(null);
  const [error, setError] = useState(null);

  const save = () => {
    if (name.trim().length < 3) {
      setError(tr(locale, "settings.min3"));
      return;
    }
    setError(null);
    setLocale(defaultLang);
    const now = new Date().toLocaleTimeString(locale === "ca" ? "ca-ES" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSavedAt(`${tr(locale, "settings.savedAt")}${now}`);
  };

  const label = { fontSize: 14, fontWeight: 500, color: tk.body };
  const help = { fontSize: 12, color: tk.muted2 };

  return (
    <>
      <PageHeading
        tk={tk}
        title={tr(locale, "nav.settings")}
        subtitle={tr(locale, "settings.subtitle")}
      />
      <div
        style={{
          display: "grid",
          gap: 20,
          alignItems: "start",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        }}
      >
        <Card tk={tk} style={{ padding: 24 }}>
          <SectionTitle
            tk={tk}
            title={tr(locale, "settings.form")}
            subtitle={tr(locale, "settings.subtitle")}
          />
          <form
            style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 20 }}
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={label}>{tr(locale, "settings.name")}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSavedAt(null);
                }}
                style={{ ...inputStyle(tk), borderColor: error ? tk.danger : tk.line }}
              />
              <span style={help}>{tr(locale, "settings.name.help")}</span>
              {error && <span style={{ ...help, color: tk.dangerInk }}>{error}</span>}
            </label>

            <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
              <legend style={{ ...label, marginBottom: 6 }}>{tr(locale, "settings.logo")}</legend>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 16,
                  padding: 16,
                  border: `1px dashed ${tk.line}`,
                  borderRadius: 6,
                  background: tk.surface2,
                }}
              >
                <span
                  style={{
                    width: 56,
                    height: 56,
                    flex: "0 0 auto",
                    display: "grid",
                    placeItems: "center",
                    borderRadius: 6,
                    border: `1px solid ${tk.line}`,
                    background: tk.surface,
                    color: tk.brand,
                  }}
                >
                  <Icon d={ICON.image} size={22} />
                </span>
                <div style={{ flex: "1 1 180px", minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: tk.body }}>
                    {logo}
                  </p>
                  <p style={{ ...help, margin: "2px 0 0" }}>{tr(locale, "settings.logo.help")}</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <label>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        minHeight: 40,
                        padding: "0 14px",
                        border: `1px solid ${tk.line}`,
                        borderRadius: 6,
                        background: tk.surface,
                        fontSize: 14,
                        fontWeight: 500,
                        color: tk.body,
                        cursor: "pointer",
                      }}
                    >
                      <Icon d={ICON.image} size={16} />
                      {tr(locale, "action.upload")}
                    </span>
                    <input
                      type="file"
                      accept="image/png,image/svg+xml"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setLogo(file.name);
                      }}
                    />
                  </label>
                  <Button tk={tk} variant="ghost" onClick={() => setLogo("—")}>
                    {tr(locale, "settings.logo.remove")}
                  </Button>
                </div>
              </div>
            </fieldset>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={label}>{tr(locale, "settings.lang")}</span>
              <select
                value={defaultLang}
                onChange={(e) => {
                  setDefaultLang(e.target.value);
                  setSavedAt(null);
                }}
                style={inputStyle(tk)}
              >
                <option value="ca">Català (CA)</option>
                <option value="en">English (EN)</option>
              </select>
              <span style={help}>{tr(locale, "settings.lang.help")}</span>
            </label>

            {error && (
              <p
                role="alert"
                style={{
                  margin: 0,
                  padding: "10px 12px",
                  borderRadius: 6,
                  border: `1px solid ${tk.danger}55`,
                  background: tk.dangerSoft,
                  color: tk.dangerInk,
                  fontSize: 14,
                  fontWeight: 500,
                }}
              >
                {error}
              </p>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 12,
                borderTop: `1px solid ${tk.line}`,
                paddingTop: 20,
              }}
            >
              <Button tk={tk} variant="primary" icon="check" onClick={save}>
                {tr(locale, "action.save")}
              </Button>
              <Button
                tk={tk}
                onClick={() => {
                  setName("Nexus Ecosistema");
                  setLogo("logo-nexus.svg");
                  setDefaultLang("ca");
                  setError(null);
                  setSavedAt(null);
                }}
              >
                {tr(locale, "action.reset")}
              </Button>
              {savedAt && (
                <p
                  role="status"
                  style={{ margin: 0, fontSize: 14, fontWeight: 500, color: tk.successInk }}
                >
                  {savedAt}
                </p>
              )}
            </div>
          </form>
        </Card>

        <Card tk={tk} style={{ padding: 24 }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: tk.strong }}>
            {tr(locale, "settings.preview")}
          </h3>
          <div
            style={{
              marginTop: 16,
              padding: 16,
              border: `1px solid ${tk.line}`,
              borderRadius: 6,
              background: tk.surface2,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 6,
                  background: tk.brand,
                  color: tk.brandContrast,
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                NX
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, color: tk.strong }}>
                  {name || "—"}
                </span>
                <span style={{ display: "block", fontSize: 12, color: tk.muted }}>
                  {defaultLang === "ca" ? "Català" : "English"}
                </span>
              </span>
            </div>
            <p
              style={{
                margin: "16px 0 0",
                fontSize: 11,
                color: tk.muted2,
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {logo} · 512 kB màx.
            </p>
          </div>
          <p style={{ margin: "16px 0 0", fontSize: 12, color: tk.muted }}>
            {tr(locale, "settings.note")}
          </p>
        </Card>
      </div>
    </>
  );
}

/* ------------------------------------------------------------ Connexions */
function SectionConnections({ tk, locale }) {
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(null);

  return (
    <>
      <PageHeading
        tk={tk}
        title={tr(locale, "nav.connections")}
        subtitle={tr(locale, "conn.subtitle")}
        actions={
          <Button tk={tk} variant="primary" icon="plus">
            {tr(locale, "conn.add")}
          </Button>
        }
      />

      {saved && (
        <div
          role="status"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 16,
            padding: "12px 16px",
            borderRadius: 6,
            border: `1px solid ${tk.line}`,
            background: tk.successSoft,
            color: tk.successInk,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <span aria-hidden="true">✓</span>
          {saved}
          <button
            type="button"
            onClick={() => setSaved(null)}
            style={{
              marginLeft: "auto",
              border: "none",
              background: "transparent",
              color: tk.muted,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        }}
      >
        {CONNECTIONS.map((row) => (
          <li key={row.id}>
            <Card tk={tk} style={{ padding: 20, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <InitialsBadge tk={tk} initials={row.initials} hue={row.hue} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: tk.strong }}>
                      {row.name}
                    </h3>
                    <StatusBadge
                      tk={tk}
                      tone={STATUS_TONE[row.status]}
                      label={tr(locale, `status.${row.status}`)}
                    />
                  </div>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: tk.muted }}>{row.vendor}</p>
                </div>
                <Button tk={tk} icon="edit" onClick={() => setSelected(row)}>
                  {tr(locale, "conn.edit")}
                </Button>
              </div>

              <p style={{ margin: "12px 0 0", fontSize: 14, color: tk.muted }}>
                {row.description}
              </p>

              <dl
                style={{
                  margin: "16px 0 0",
                  paddingTop: 12,
                  borderTop: `1px solid ${tk.line}`,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px 16px",
                  fontSize: 12,
                }}
              >
                {[
                  [tr(locale, "conn.auth"), row.auth, false],
                  [tr(locale, "conn.scope"), row.scope, true],
                  [tr(locale, "conn.connectedOn"), row.connectedOn, false],
                  [tr(locale, "conn.lastEvent"), row.lastEvent, false],
                ].map(([dt, dd, mono]) => (
                  <div key={dt} style={{ minWidth: 0 }}>
                    <dt style={{ color: tk.muted2 }}>{dt}</dt>
                    <dd
                      style={{
                        margin: "2px 0 0",
                        color: tk.body,
                        fontWeight: 500,
                        fontFamily: mono ? "ui-monospace, monospace" : "inherit",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {dd}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label={tr(locale, "action.close")}
            style={{
              position: "absolute",
              inset: 0,
              border: "none",
              background: tk.scrim,
              cursor: "pointer",
            }}
          />
          <aside
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              maxWidth: 420,
              height: "100%",
              background: tk.overlay,
              borderLeft: `1px solid ${tk.line}`,
              boxShadow: tk.overlayShadow,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
                padding: 20,
                borderBottom: `1px solid ${tk.line}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                <InitialsBadge tk={tk} initials={selected.initials} hue={selected.hue} size={40} />
                <div style={{ minWidth: 0 }}>
                  <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: tk.strong }}>
                    {selected.name}
                  </h2>
                  <p style={{ margin: 0, fontSize: 12, color: tk.muted }}>{selected.vendor}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label={tr(locale, "action.close")}
                style={{
                  width: 36,
                  height: 36,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: 6,
                  border: `1px solid ${tk.line}`,
                  background: tk.surface2,
                  color: tk.muted,
                  cursor: "pointer",
                }}
              >
                <Icon d={ICON.close} size={16} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
              <p style={{ margin: 0, fontSize: 14, color: tk.muted }}>{selected.description}</p>
              <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  [tr(locale, "conn.auth"), selected.auth, false],
                  [tr(locale, "conn.scope"), selected.scope, true],
                  [tr(locale, "conn.owner"), selected.owner, false],
                ].map(([fieldLabel, value, mono]) => (
                  <label
                    key={fieldLabel}
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 500, color: tk.muted }}>
                      {fieldLabel}
                    </span>
                    <input type="text" defaultValue={value} style={inputStyle(tk, mono)} />
                  </label>
                ))}

                <div
                  style={{
                    borderRadius: 6,
                    border: `1px solid ${tk.line}`,
                    background: tk.surface2,
                    padding: 12,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12, color: tk.muted2 }}>
                    {tr(locale, "table.status")}
                  </p>
                  <div style={{ marginTop: 6 }}>
                    <StatusBadge
                      tk={tk}
                      tone={STATUS_TONE[selected.status]}
                      label={tr(locale, `status.${selected.status}`)}
                    />
                  </div>
                  <p
                    style={{
                      margin: "8px 0 0",
                      fontSize: 11,
                      color: tk.muted2,
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {selected.connectedOn} · {selected.lastEvent}
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                padding: 20,
                borderTop: `1px solid ${tk.line}`,
              }}
            >
              <Button tk={tk} onClick={() => setSelected(null)}>
                {tr(locale, "action.cancel")}
              </Button>
              <Button
                tk={tk}
                variant="primary"
                icon="check"
                onClick={() => {
                  setSaved(
                    `${tr(locale, "conn.edit")} · ${selected.name} · ${tr(
                      locale,
                      "settings.saved",
                    )}`,
                  );
                  setSelected(null);
                }}
              >
                {tr(locale, "action.save")}
              </Button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}

function RowsFooter({ tk, locale, visible, total, right }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        padding: "12px 16px",
        fontSize: 12,
        color: tk.muted,
        borderTop: `1px solid ${tk.line}`,
      }}
    >
      <span>
        {tr(locale, "table.showing")} {visible} {tr(locale, "table.of")} {total}{" "}
        {tr(locale, "table.results")}
      </span>
      <span style={{ color: tk.muted2 }}>{right}</span>
    </div>
  );
}
