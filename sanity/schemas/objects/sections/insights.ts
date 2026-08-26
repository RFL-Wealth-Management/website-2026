import { defineArrayMember, defineField, defineType } from "sanity";

export const insightsGridSection = defineType({
  name: "insightsGridSection",
  title: "Insights grid",
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
      name: "cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "tag", type: "string" }),
            defineField({
              name: "tone",
              type: "string",
              options: {
                list: [
                  { title: "Tax update", value: "tax" },
                  { title: "Article", value: "article" },
                  { title: "Podcast", value: "podcast" },
                  { title: "Guide", value: "guide" },
                ],
              },
              initialValue: "article",
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "meta", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        }),
      ],
    }),
    defineField({
      name: "wide",
      title: "Featured wide card",
      type: "object",
      fields: [
        defineField({ name: "tag", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "meta", type: "string" }),
        defineField({ name: "href", type: "string" }),
        defineField({
          name: "thumbnail",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Insights grid" }),
  },
});

export const dualPathCtaSection = defineType({
  name: "dualPathCtaSection",
  title: "Dual-path CTA",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "paths",
      type: "array",
      validation: (r) => r.max(2),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "kind", title: "Label", type: "string" }),
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "body", type: "text", rows: 3 }),
            defineField({ name: "cta", type: "cta" }),
            defineField({
              name: "variant",
              title: "Button style",
              type: "string",
              options: {
                list: [
                  { title: "Seafoam", value: "seafoam" },
                  { title: "Navy", value: "navy" },
                  { title: "White", value: "white" },
                ],
                layout: "radio",
              },
              initialValue: "seafoam",
            }),
          ],
          preview: { select: { title: "title", subtitle: "kind" } },
        }),
      ],
    }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Dual-path CTA" }),
  },
});
