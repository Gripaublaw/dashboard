/**
 * lib/api.ts — the single boundary between the UI and your backend.
 *
 * USE_REMOTE = true: les crides van a l'API real (Hono + PostgreSQL).
 * Els endpoints són absoluts i apunten a API_BASE_URL del .env.
 */

import {
  appRows,
  connectionRows,
  userRows,
  type AppRow,
  type ConnectionRow,
  type UserRow,
} from "./data.ts";

/** Amb true, les crides van a l'API real. */
export const USE_REMOTE = true;

/** URL base de l'API, llegida del .env del dashboard. */
const API_BASE = "http://localhost:8000";

/** Endpoints absoluts cap a l'API. */
export const ENDPOINTS = {
  apps: `${API_BASE}/api/apps`,
  users: `${API_BASE}/api/usuaris`,
  connections: `${API_BASE}/api/connexions`,
  settings: `${API_BASE}/api/configuracio`,
} as const;

/** Thrown (and catchable) by every call below — safe to show in a banner. */
export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export interface MutationResult<T> {
  ok: boolean;
  item?: T;
  error?: string;
}

/** Simulated latency; keeps skeletons and disabled buttons visible. */
const LATENCY = 450;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let seq = 0;
function nextId(prefix: string) {
  seq += 1;
  return `${prefix}-local-${Date.now().toString(36)}-${seq}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      headers: { "content-type": "application/json" },
      ...init,
    });
  } catch {
    throw new ApiError("NETWORK", 0);
  }
  if (!res.ok) {
    throw new ApiError(`HTTP_${res.status}`, res.status);
  }
  return (await res.json()) as T;
}

/** Two-letter badge initials derived from a display name. */
export function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Deterministic hue so a new row keeps the same accent across renders. */
export function hueOf(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

/* ------------------------------------------------------------------ apps */

/** Forma que retorna l'API Hono per a una app. */
interface ApiApp {
  id: number;
  name: string;
  slug: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

/** Converteix una app de l'API al format AppRow del dashboard. */
function adaptApp(raw: ApiApp): AppRow {
  return {
    id: String(raw.id),
    name: raw.name,
    slug: raw.slug,
    initials: initialsOf(raw.name),
    hue: hueOf(raw.slug),
    status: raw.status as AppRow["status"],
    type: raw.type as AppRow["type"],
    meta: `v0.1 · ${new Date(raw.createdAt).toLocaleDateString("ca-ES")}`,
  };
}

export async function listApps(): Promise<AppRow[]> {
  if (!USE_REMOTE) {
    await sleep(120);
    return [...appRows];
  }
  const raw = await request<ApiApp[]>(ENDPOINTS.apps);
  return raw.map(adaptApp);
}

export async function createApp(input: {
  name: string;
  slug: string;
  type: AppRow["type"];
}): Promise<AppRow> {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return {
      id: nextId("app"),
      name: input.name,
      slug: input.slug,
      initials: initialsOf(input.name),
      hue: hueOf(input.slug),
      status: "pending",
      type: input.type,
      meta: "v0.1 · acabat de crear",
    };
  }
  const raw = await request<ApiApp>(ENDPOINTS.apps, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return adaptApp(raw);
}

export async function updateApp(id: string, patch: Partial<AppRow>) {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return { ok: true, id, patch };
  }
  return await request<{ ok: boolean }>(`${ENDPOINTS.apps}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteApp(id: string) {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return { ok: true, id };
  }
  return await request<{ ok: boolean }>(`${ENDPOINTS.apps}/${id}`, {
    method: "DELETE",
  });
}

/* ----------------------------------------------------------------- users */

export async function listUsers(): Promise<UserRow[]> {
  if (!USE_REMOTE) {
    await sleep(120);
    return [...userRows];
  }
  return await request<UserRow[]>(ENDPOINTS.users);
}

export async function createUser(input: {
  name: string;
  email: string;
  role: UserRow["role"];
}): Promise<UserRow> {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return {
      id: nextId("usr"),
      name: input.name,
      email: input.email,
      role: input.role,
      status: "invited",
      lastSeen: "convidat ara",
      initials: initialsOf(input.name),
      hue: hueOf(input.email),
    };
  }
  return await request<UserRow>(ENDPOINTS.users, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateUser(id: string, patch: Partial<UserRow>) {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return { ok: true, id, patch };
  }
  return await request<{ ok: boolean }>(`${ENDPOINTS.users}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteUser(id: string) {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return { ok: true, id };
  }
  return await request<{ ok: boolean }>(`${ENDPOINTS.users}/${id}`, {
    method: "DELETE",
  });
}

/* ----------------------------------------------------------- connections */

export async function listConnections(): Promise<ConnectionRow[]> {
  if (!USE_REMOTE) {
    await sleep(120);
    return [...connectionRows];
  }
  return await request<ConnectionRow[]>(ENDPOINTS.connections);
}

export async function updateConnection(
  id: string,
  patch: Partial<ConnectionRow>,
) {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return { ok: true, id, patch };
  }
  return await request<{ ok: boolean }>(`${ENDPOINTS.connections}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

/* -------------------------------------------------------------- settings */

export interface EcosystemSettings {
  name: string;
  defaultLocale: "ca" | "en";
  logoDataUrl?: string;
}

export async function saveSettings(
  input: EcosystemSettings,
): Promise<EcosystemSettings> {
  if (!USE_REMOTE) {
    await sleep(LATENCY);
    return input;
  }
  return await request<EcosystemSettings>(ENDPOINTS.settings, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

/* ------------------------------------------------------------- i18n keys */

export function errorKey(err: unknown) {
  if (err instanceof ApiError && err.message === "NETWORK") {
    return "error.network" as const;
  }
  if (err instanceof ApiError) return "error.server" as const;
  return "error.unknown" as const;
}
