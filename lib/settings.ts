/**
 * lib/settings.ts — initial values for the Configuració form.
 *
 * Kept in its own module so the route can pass real, typed seed values to the
 * island (server-rendered content, no empty first paint). Replace the body of
 * `loadSettings()` with a real query when the backend exists.
 */

import type { EcosystemSettings } from "./api.ts";

export const ecosystemSettings: EcosystemSettings = {
  name: "Nexus Ecosistema",
  defaultLocale: "ca",
  logoDataUrl: undefined,
};

/** Async accessor matching the shape of a future database read. */
export async function loadSettings(): Promise<EcosystemSettings> {
  return ecosystemSettings;
}
