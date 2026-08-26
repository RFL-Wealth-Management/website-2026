import { defineField, defineType } from "sanity";

/**
 * Prose only — no cards, no media. For the copy that has to sit between two
 * heavier sections without competing with them.
 */
export const textSection = defineType({
  name: "textSection",
  title: "Text section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lede", type: "text", rows: 4 }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Text section" }),
  },
});
