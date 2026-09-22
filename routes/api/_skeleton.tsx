/**
 * routes/api/_skeleton.tsx — TEMPLATE, not an active route.
 *
 * The leading underscore keeps Fresh from registering this file, so it ships as
 * documentation you can copy. To go live:
 *
 *   1. Copy this file to routes/api/apps.tsx (and usuaris / connexions /
 *      configuracio.tsx the same way).
 *   2. Replace the in-memory array with your real store.
 *   3. In lib/api.ts set USE_REMOTE = true.
 *
 * Method contract (must match lib/api.ts):
 *   GET    /api/apps         -> AppRow[]
 *   POST   /api/apps         { name, slug, type }  -> AppRow
 *   PATCH  /api/apps/:id     Partial<AppRow>       -> { ok: true }
 *   DELETE /api/apps/:id                           -> { ok: true }
 * On failure respond with { error: "message" } and a 4xx/5xx status.
 */

import { define } from "../../utils.ts";
import { appRows, type AppRow } from "../../lib/data.ts";

// Swap for a real store (Deno KV, Postgres, an upstream service...).
const store: AppRow[] = [...appRows];

export const handler = define.handlers({
  async GET() {
    return Response.json(store);
  },

  async POST(ctx) {
    const body = await ctx.req.json() as {
      name?: string;
      slug?: string;
      type?: AppRow["type"];
    };

    if (!body.name || !body.slug || !body.type) {
      return Response.json({ error: "MISSING_FIELDS" }, { status: 400 });
    }

    const created: AppRow = {
      id: `app-${crypto.randomUUID()}`,
      name: body.name,
      slug: body.slug,
      initials: body.name.slice(0, 2).toUpperCase(),
      hue: 265,
      status: "pending",
      type: body.type,
      meta: "v0.1",
    };
    store.unshift(created);
    return Response.json(created, { status: 201 });
  },

  async PATCH(ctx) {
    const id = ctx.params.id;
    const patch = await ctx.req.json() as Partial<AppRow>;
    const index = store.findIndex((row) => row.id === id);
    if (index === -1) {
      return Response.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    store[index] = { ...store[index], ...patch };
    return Response.json({ ok: true });
  },

  async DELETE(ctx) {
    const id = ctx.params.id;
    const index = store.findIndex((row) => row.id === id);
    if (index === -1) {
      return Response.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    store.splice(index, 1);
    return Response.json({ ok: true });
  },
});

/** Not a page — this file is a copyable template only. */
export default define.page(function Skeleton() {
  return <div />;
});
