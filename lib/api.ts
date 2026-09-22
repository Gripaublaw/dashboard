/**
 * lib/api.ts — the single boundary between the UI and your backend.
 *
 * Today every function resolves against `lib/data.ts` after a short delay, so
 * the islands exercise real submit / error / empty states without a server.
 * To go live, set USE_REMOTE = true (or point ENDPOINTS at your routes) and
 * the same signatures keep working: nothing in `islands/` has to change.
 *
 * Expected JSON shapes are declared at the bottom of this file — hand those
 * types to the backend as the wire contract.
 */

import {
  appRows,
  connectionRows,
  userRows,
  type AppRow,
  type ConnectionRow,
  type UserRow,
} from "./data.ts";

/** Flip to true once `routes/api/*` is implemented. */
export const USE_REMOTE = false;

/** Relative endpoints the islands will hit when USE_REMOTE is true. */
export const ENDPOINTS = {
  apps: "/api/apps",
  users: "/api/usuaris",
  connections: "/api/connexions",
  settings: "/api/configuracio",
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

async function request<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
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
  return await res.json() as T;
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

export async function listApps(): Promise<AppRow[]> {
  if (!USE_REMOTE) {
    await sleep(120);
    return [...appRows];
  }
  return await request<AppRow[]>(ENDPOINTS.apps);
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
  return await request<AppRow>(ENDPOINTS.apps, {
    method: "POST",
    body: JSON.stringify(input),
  });
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

/**
 * Maps an ApiError (or any thrown value) to a translation key so the UI never
 * leaks raw HTTP text to the user.
 */
export function errorKey(err: unknown) {
  if (err instanceof ApiError && err.message === "NETWORK") {
    return "error.network" as const;
  }
  if (err instanceof ApiError) return "error.server" as const;
  return "error.unknown" as const;
}

/**
 * @wire-contract
 * POST   /api/apps           body: { name, slug, type }      -> AppRow
 * PATCH  /api/apps/:id       body: Partial<AppRow>           -> { ok }
 * DELETE /api/apps/:id                                       -> { ok }
 * POST   /api/usuaris        body: { name, email, role }     -> UserRow
 * PATCH  /api/usuaris/:id    body: Partial<UserRow>          -> { ok }
 * DELETE /api/usuaris/:id                                    -> { ok }
 * PATCH  /api/connexions/:id body: Partial<ConnectionRow>    -> { ok }
 * PUT    /api/configuracio   body: EcosystemSettings         -> EcosystemSettings
 * On failure return { error: "<message>" } with a 4xx/5xx status.
 */
