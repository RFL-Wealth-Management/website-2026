import type { StructureResolver } from "sanity/structure";

/**
 * Homepage is pinned to the top as its own entry, separate from the Pages
 * list, so the most-edited document is never buried in an alphabetical list.
 *
 * Below it, Pages is nested one level: a list of `pageGroup` documents, each
 * opening the pages that reference it. Sanity has no folders — this list *is*
 * the grouping — so "Ungrouped pages" has to exist as a sibling, or a page
 * created without a group becomes unreachable in the Studio.
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
        .id("pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("By group")
                .id("byGroup")
                .child(
                  S.documentTypeList("pageGroup")
                    .title("Page groups")
                    .defaultOrdering([
                      { field: "order", direction: "asc" },
                      { field: "title", direction: "asc" },
                    ])
                    .child((groupId) =>
                      S.documentList()
                        .title("Pages")
                        .schemaType("page")
                        .filter('_type == "page" && group._ref == $groupId')
                        .params({ groupId })
                        // New pages created from inside a group pre-fill the
                        // reference, so an editor never has to set it by hand.
                        .initialValueTemplates([
                          S.initialValueTemplateItem("page-by-group", {
                            groupId,
                          }),
                        ])
                        .defaultOrdering([
                          { field: "isGroupIndex", direction: "desc" },
                          { field: "title", direction: "asc" },
                        ]),
                    ),
                ),

              S.listItem()
                .title("Ungrouped pages")
                .id("ungrouped")
                .child(
                  S.documentList()
                    .title("Ungrouped pages")
                    .schemaType("page")
                    .filter(
                      '_type == "page" && isHomepage != true && !defined(group)',
                    ),
                ),

              S.divider(),

              S.listItem()
                .title("Page groups")
                .id("groups")
                .schemaType("pageGroup")
                .child(S.documentTypeList("pageGroup").title("Page groups")),
            ]),
        ),

      S.divider(),

      /**
       * Reusable content, referenced by sections rather than embedded in them.
       * One sub-list per block type; FAQs is the first.
       */
      S.listItem()
        .title("Content blocks")
        .id("contentBlocks")
        .child(
          S.list()
            .title("Content blocks")
            .items([
              S.listItem()
                .title("FAQs")
                .id("faqs")
                .schemaType("faq")
                .child(S.documentTypeList("faq").title("FAQs")),
            ]),
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
