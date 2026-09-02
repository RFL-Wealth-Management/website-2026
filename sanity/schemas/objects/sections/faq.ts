import { defineField, defineType } from "sanity";

/**
 * Places a reusable FAQ document on a page.
 *
 * The section owns every presentational decision — eyebrow, heading, intro,
 * background — and the referenced `faq` document owns only the questions. That
 * split is the whole point: the same FAQ set reads as “Questions physicians ask
 * about tax” on one page and “Still wondering?” on another, with one source of
 * truth behind both.
 */
export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({
      name: "heading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "side",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Short copy beside the heading.",
    }),
    defineField({
      name: "faq",
      title: "FAQ set",
      type: "reference",
      to: [{ type: "faq" }],
      validation: (r) => r.required(),
      description: "Edit the questions themselves under Content blocks → FAQs.",
    }),
    defineField({ name: "background", type: "background" }),
  ],
  preview: {
    select: { title: "heading", faq: "faq.title" },
    prepare: ({ title, faq }) => ({
      title,
      subtitle: faq ? `FAQ section · ${faq}` : "FAQ section",
    }),
  },
});
