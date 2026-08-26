import type { StructureResolver } from "sanity/structure";

/**
 * Homepage is pinned to the top as its own entry, separate from the Pages
 * list, so the most-edited document is never buried in an alphabetical list.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("page").documentId("homepage")),

      S.divider(),

      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .filter('_type == "page" && isHomepage != true'),
        ),

      S.divider(),

      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
    ]);
