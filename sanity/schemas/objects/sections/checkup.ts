import { defineArrayMember, defineField, defineType } from "sanity";

export const checkupBandSection = defineType({
  name: "checkupBandSection",
  title: "Checkup band",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "note", type: "string" }),
    defineField({ name: "scanTitle", type: "string" }),
    defineField({ name: "scanBadge", type: "string" }),
    defineField({
      name: "rows",
      title: "Result preview rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "state",
              type: "string",
              options: {
                list: [
                  { title: "Reviewed", value: "ok" },
                  { title: "Gap found", value: "gap" },
                ],
                layout: "radio",
              },
              initialValue: "ok",
            }),
          ],
          preview: { select: { title: "label", subtitle: "state" } },
        }),
      ],
    }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Checkup band" }),
  },
});

export const featureProductSection = defineType({
  name: "featureProductSection",
  title: "Book / product feature",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    defineField({
      name: "bullets",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "note", type: "string" }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "cover",
      title: "Placeholder cover text",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "author", type: "string" }),
      ],
    }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Product feature" }),
  },
});

export const stageStepsSection = defineType({
  name: "stageStepsSection",
  title: "Numbered stages",
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
      name: "stages",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "num", type: "string" }),
            defineField({
              name: "title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "num" } },
        }),
      ],
    }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Numbered stages" }),
  },
});
