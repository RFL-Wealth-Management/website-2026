import { defineArrayMember, defineField, defineType } from "sanity";

export const storyFeatureSection = defineType({
  name: "storyFeatureSection",
  title: "Physician story",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quote",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "meta", type: "string" }),
    defineField({ name: "initials", type: "string" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the photo for screen readers.",
        }),
      ],
    }),
    defineField({
      name: "facts",
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
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "label", subtitle: "body" } },
        }),
      ],
    }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Physician story" }),
  },
});

export const differenceGridSection = defineType({
  name: "differenceGridSection",
  title: "Difference grid",
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
            defineField({ name: "body", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
    }),
    defineField({ name: "cta", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Difference grid" }),
  },
});

export const teamGridSection = defineType({
  name: "teamGridSection",
  title: "Team grid",
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
      name: "members",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "cred", title: "Credentials", type: "string" }),
            defineField({
              name: "body",
              title: "Count on me for…",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "image",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "cred", media: "image" },
          },
        }),
      ],
    }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Team grid" }),
  },
});
