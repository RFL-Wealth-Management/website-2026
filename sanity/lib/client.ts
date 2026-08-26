import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN off so content edits appear without waiting for cache expiry.
  // Phase 2 replaces direct client reads with the Live Content API.
  useCdn: false,
  perspective: "published",
});
