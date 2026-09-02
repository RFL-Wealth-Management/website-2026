import { defineArrayMember, defineField, defineType } from "sanity";

export const SECTION_TYPES = [
  "heroSection",
  "questionGridSection",
  "checkupBandSection",
  "featureProductSection",
  "stageStepsSection",
  "storyFeatureSection",
  "differenceGridSection",
  "gridSection",
  "insightsGridSection",
  "dualPathCtaSection",
  "faqSection",
  "textSection",
] as const;

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "page", title: "Page" },
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ---- Page ----------------------------------------------------------
    defineField({
      name: "title",
      type: "string",
      group: "page",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "page",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description: 'Use "/" for the homepage.',
    }),
    defineField({
      name: "isHomepage",
      title: "Homepage",
      type: "boolean",
      group: "page",
      initialValue: false,
      description: "Pins this page to / and to the top of the Studio list.",
    }),

    // The group is what nests the URL: /<group slug>/<page slug>. Required for
    // everything except the homepage, which sits at the root by definition.
    defineField({
      name: "group",
      title: "Page group",
      type: "reference",
      to: [{ type: "pageGroup" }],
      group: "page",
      description:
        "Groups this page in the Studio and prefixes its URL. Leave empty for a top-level page.",
      validation: (r) =>
        r.custom((value, context) => {
          const doc = context.document as { isHomepage?: boolean } | undefined;
          if (doc?.isHomepage || value) return true;
          return "Pick a group, or tick Homepage.";
        }),
    }),
    defineField({
      name: "isGroupIndex",
      title: "Group landing page",
      type: "boolean",
      group: "page",
      initialValue: false,
      description:
        "Renders at the group's own URL (/financial-questions) instead of below it.",
      // Warn rather than error: a second index is a mistake worth surfacing,
      // but blocking the save would strand an editor mid-migration between
      // which page is the landing page.
      validation: (r) =>
        r.custom(async (value, context) => {
          if (!value) return true;
          const doc = context.document as
            | { _id?: string; group?: { _ref?: string } }
            | undefined;
          const ref = doc?.group?._ref;
          if (!ref) return true;

          const id = (doc?._id ?? "").replace(/^drafts\./, "");
          const others = await context
            .getClient({ apiVersion: "2026-08-20" })
            .fetch<string[]>(
              `*[_type == "page" && isGroupIndex == true && group._ref == $ref
                 && !(_id in [$id, "drafts." + $id])].title`,
              { ref, id },
            );

          return others.length
            ? {
                message: `This group already has a landing page: ${others.join(", ")}.`,
                level: "warning" as const,
              }
            : true;
        }),
    }),

    // ---- Content -------------------------------------------------------
    defineField({
      name: "sections",
      type: "array",
      group: "content",
      of: SECTION_TYPES.map((type) => defineArrayMember({ type })),
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              // Wireframe thumbnails live in public/sections/ and are named
              // after the schema type, so a new section type only needs a
              // matching SVG dropped in beside the others.
              previewImageUrl: (schemaType) => `/sections/${schemaType}.svg`,
            },
            { name: "list" },
          ],
        },
      },
    }),

    // ---- SEO -----------------------------------------------------------
    // Provided by sanity-plugin-seofields: meta, Open Graph, Twitter cards,
    // robots directives, canonical, hreflang and Schema.org JSON-LD, with a
    // live SERP preview. Chosen over sanity-plugin-seo because it declares
    // native Sanity 6 support and needs no compatibility shims.
    defineField({
      name: "seo",
      title: "Search & social",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      home: "isHomepage",
      index: "isGroupIndex",
      groupSlug: "group.slug.current",
    },
    // The resolved path, not the bare slug — otherwise two pages called
    // "Overview" in different groups are indistinguishable in the list.
    prepare: ({ title, slug, home, index, groupSlug }) => ({
      title: home ? `${title} (Homepage)` : title,
      subtitle: home
        ? "/"
        : groupSlug
          ? index
            ? `/${groupSlug}`
            : `/${groupSlug}/${slug ?? ""}`
          : `/${slug ?? ""}`,
    }),
  },
});
