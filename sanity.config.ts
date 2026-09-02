import { visionTool } from "@sanity/vision";
import { defineConfig, type Template } from "sanity";
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
        // SERP preview URL. Mirrors lib/paths.ts — it cannot import it,
        // because the document here is an untyped Studio value rather than a
        // query result, but the two must agree on what a page's URL is.
        prefix: (doc) => {
          if (doc.isHomepage) return "/";
          const slug = (doc.slug as { current?: string })?.current ?? "";
          // The group is a reference, so the Studio has only its _ref here.
          // Falling back to the bare slug keeps the preview honest rather than
          // inventing a path segment we cannot resolve synchronously.
          return `/${slug}`;
        },
        titleSuffix: "RFL Wealth Management",
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Singletons are reached through the structure, not created ad hoc.
    newDocumentOptions: (prev) =>
      prev.filter((t) => t.templateId !== "siteSettings"),

    // Backs the "Pages → By group → <group>" pane: creating a page from inside
    // a group pre-fills the reference, so the grouping cannot be forgotten.
    templates: (prev: Template[]): Template[] => [
      ...prev,
      {
        id: "page-by-group",
        title: "Page in group",
        schemaType: "page",
        parameters: [{ name: "groupId", type: "string" }],
        value: ({ groupId }: { groupId: string }) => ({
          group: { _type: "reference", _ref: groupId },
        }),
      },
    ],
  },
});
