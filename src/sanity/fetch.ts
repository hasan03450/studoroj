import { cacheLife, cacheTag } from "next/cache";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "./env";

/** Tag on every Sanity query; the webhook at /api/revalidate clears it after an edit. */
export const SANITY_TAG = "sanity";

/**
 * Cached Sanity query. Results are refreshed by the Sanity webhook,
 * and at least every hour as a safety net (so past events drop off).
 * Returns null when Sanity is not configured yet.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  if (!isSanityConfigured) return null;
  return client.fetch<T>(query, params);
}
