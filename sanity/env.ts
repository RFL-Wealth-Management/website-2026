/**
 * Sanity environment configuration.
 *
 * These throw at import time rather than falling back to defaults: a silent
 * fallback to the wrong dataset is far worse than a loud failure at startup.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-20";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

/** Server-only. Never expose to the browser outside draft mode. */
export const readToken = process.env.SANITY_API_READ_TOKEN;

export const studioUrl = "/studio";

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }
  return v;
}
