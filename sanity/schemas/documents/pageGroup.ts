import { defineField, defineType } from "sanity";

/**
 * A container for related pages — "Financial Questions", and whatever groups
 * follow it.
 *
 * Sanity has no folders: the Studio sidebar is only ever a query. Making the
 * group a real document rather than a string on `page` means one field does
 * three jobs — it groups the sidebar (sanity/structure.ts), it prefixes the
 * URL (lib/paths.ts), and it is a reference a future "related pages" query can
 * follow without anyone hand-maintaining a list.
 */
export const pageGroup = defineType({
  name: "pageGroup",
  title: "Page group",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      description:
        "First segment of every URL in this group — /financial-questions/…",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Studio-only note. Never rendered on the site.",
    }),
    defineField({
      name: "order",
      type: "number",
      description: "Sort position in the Studio sidebar. Lower comes first.",
    }),
  ],
  orderings: [
    {
      name: "manual",
      title: "Sidebar order",
      by: [
        { field: "order", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title, subtitle: `/${slug ?? ""}` }),
  },
});
