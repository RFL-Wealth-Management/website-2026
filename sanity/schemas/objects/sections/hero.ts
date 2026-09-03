import { defineArrayMember, defineField, defineType } from "sanity";

import { HeroLayoutInput } from "@/sanity/components/HeroLayoutInput";
import { DEFAULT_HERO_LAYOUT, HERO_LAYOUTS } from "@/lib/hero-layouts";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  fields: [
    // First field on purpose: it decides how everything below is arranged, and
    // an editor should see that before writing the copy. The fields themselves
    // are identical across layouts, so switching costs nothing.
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      initialValue: DEFAULT_HERO_LAYOUT,
      components: { input: HeroLayoutInput },
      // The custom input is the only way to set this, but the list still has
      // to be here: it is what `validation` and the Vision/API surface check
      // against, and it keeps the field usable if the input ever fails to load.
      options: { list: HERO_LAYOUTS },
      validation: (r) => r.required(),
    }),

    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headlineAlt",
      title: "Headline (italic accent line)",
      type: "string",
    }),
    defineField({ name: "lede", type: "text", rows: 3 }),
    defineField({ name: "primaryCta", type: "cta" }),
    defineField({ name: "primaryNote", type: "string" }),
    defineField({ name: "secondaryCta", type: "cta" }),
    defineField({
      name: "image",
      title: "Hero image",
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
      name: "chip",
      title: "Floating chip",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "note", type: "string" }),
      ],
    }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "headline", layout: "layout" },
    prepare: ({ title, layout }) => ({
      title: title || "Hero",
      subtitle: `Hero${layout ? ` — ${layout}` : ""}`,
    }),
  },
});

export const questionGridSection = defineType({
  name: "questionGridSection",
  title: "Question grid",
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
            defineField({
              name: "q",
              title: "Question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "tag", type: "string" }),
            defineField({ name: "href", type: "string" }),
          ],
          preview: { select: { title: "q", subtitle: "tag" } },
        }),
      ],
    }),
    defineField({ name: "footLink", type: "cta" }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title, subtitle: "Question grid" }),
  },
});
