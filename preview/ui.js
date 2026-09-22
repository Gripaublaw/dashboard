/* Icons, tokens and small shared primitives for the standalone preview. */

export const ICON = {
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
  eye: [
    "M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12",
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  ],
  chevron: "m6 9 6 6 6-6",
};

export const THEMES = {
  dark: {
    base: "#1e1e2e",
    surface: "#2a2a3e",
    surface2: "#23233a",
    overlay: "#31314a",
    line: "#3b3b55",
    scrim: "rgba(12,12,24,0.62)",
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
    overlayShadow: "0 18px 40px -20px rgba(8,8,20,0.7)",
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

export function Icon({ d, size = 18, style }) {
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
      style={{ flex: "0 0 auto", ...style }}
    >
      {paths.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

export const chipStyle = (tk, tone) =>
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

export function StatusBadge({ tk, label, tone = "neutral" }) {
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
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "currentColor",
        }}
      />
      {label}
    </span>
  );
}

export function InitialsBadge({ tk, initials, hue, size = 36 }) {
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

export function Card({ tk, children, style }) {
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

export function Button({ tk, variant = "secondary", icon, children, onClick, style, title }) {
  const variants = {
    primary: {
      background: tk.brand,
      color: tk.brandContrast,
      border: "1px solid transparent",
    },
    secondary: {
      background: tk.surface,
      color: tk.body,
      border: `1px solid ${tk.line}`,
    },
    ghost: {
      background: "transparent",
      color: tk.muted,
      border: "1px solid transparent",
    },
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

export function RowActions({ tk, labels }) {
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
      {labels.view && (
        <button type="button" style={btn} title={labels.view} aria-label={labels.view}>
          <Icon d={ICON.eye} size={15} />
        </button>
      )}
      <button type="button" style={btn} title={labels.edit} aria-label={labels.edit}>
        <Icon d={ICON.edit} size={15} />
      </button>
      <button type="button" style={btn} title={labels.remove} aria-label={labels.remove}>
        <Icon d={ICON.trash} size={15} />
      </button>
    </div>
  );
}

export function EmptyState({ tk, icon = "search", title, body, action }) {
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
        <Icon d={ICON[icon]} size={20} />
      </span>
      <h3 style={{ margin: "16px 0 0", fontSize: 16, fontWeight: 600, color: tk.strong }}>
        {title}
      </h3>
      <p style={{ margin: "4px 0 0", maxWidth: 340, fontSize: 14, color: tk.muted }}>
        {body}
      </p>
      {action && <div style={{ marginTop: 16 }}>{action}</div>}
    </div>
  );
}

export function SectionTitle({ tk, title, subtitle, action }) {
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
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: tk.strong }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ margin: "4px 0 0", fontSize: 14, color: tk.muted }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function PageHeading({ tk, title, subtitle, actions }) {
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
      <div style={{ maxWidth: 640 }}>
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
        <p style={{ margin: "4px 0 0", fontSize: 14, color: tk.muted }}>
          {subtitle}
        </p>
      </div>
      {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
    </div>
  );
}

export const inputStyle = (tk, mono) => ({
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
