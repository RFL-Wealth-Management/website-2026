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
    select: { title: "title", slug: "slug.current", home: "isHomepage" },
    prepare: ({ title, slug, home }) => ({
      title: home ? `${title} (Homepage)` : title,
      subtitle: home ? "/" : `/${slug ?? ""}`,
    }),
  },
});
