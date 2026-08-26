import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A generic card grid — image, title, subtitle, body — four across on desktop.
 *
 * The homepage uses it for the team, but nothing here assumes that: the
 * team-specific wording lives in the content, not the schema. `bodyLabel` is
 * what carries the mockup's bold "Count on me for:" lead-in; leave it empty
 * and the cards render as plain prose.
 */
export const gridSection = defineType({
  name: "gridSection",
  title: "Grid section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "side", type: "text", rows: 3 }),
    defineField({
      name: "bodyLabel",
      title: "Body lead-in",
      type: "string",
      description:
        'Bold text before every item’s body, e.g. "Count on me for:". Leave empty for none.',
    }),
    defineField({
      name: "items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "subtitle", type: "string" }),
            defineField({ name: "body", type: "text", rows: 2 }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "subtitle", media: "image" },
          },
        }),
      ],
    }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Grid section" }),
  },
});
