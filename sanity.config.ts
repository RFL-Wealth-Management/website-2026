import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import seofields from "sanity-plugin-seofields";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";
import { structure } from "./sanity/structure";

/**
 * Studio is mounted inside the Next app at /studio.
 *
 * presentationTool (live visual editing) lands in Phase 2 — it depends on the
 * draft-mode route and the Live Content API, which don't exist yet.
 */
export default defineConfig({
  name: "rfl",
  title: "RFL Wealth Management",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    seofields({
      seoPreview: {
        // SERP preview URL: homepage is "/", every other page is "/<slug>".
        prefix: (doc) =>
          doc.isHomepage
            ? "/"
            : `/${(doc.slug as { current?: string })?.current ?? ""}`,
        titleSuffix: "RFL Wealth Management",
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Singletons are reached through the structure, not created ad hoc.
    newDocumentOptions: (prev) =>
      prev.filter((t) => t.templateId !== "siteSettings"),
  },
});
