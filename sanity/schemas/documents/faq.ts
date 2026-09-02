import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A reusable set of questions and answers.
 *
 * This is a *content block*, not a section: it holds no eyebrow, heading or
 * background. Those live on `faqSection` (objects/sections/faq.ts), so one FAQ
 * set can appear on three pages under three different framings while still
 * being edited in exactly one place.
 *
 * `answer` is plain text rather than Portable Text. Every other section in this
 * repo is plain strings, a `text` field still supports paragraphs (blank lines
 * are split on render), and the optional `cta` covers the one link an FAQ
 * answer usually wants. Reach for Portable Text only when an answer genuinely
 * needs inline marks or lists.
 */
export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "Internal label, e.g. “Physician tax FAQs”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Studio-only note on where this set is used.",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
      validation: (r) => r.min(1),
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          fields: [
            defineField({
              name: "question",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "answer",
              type: "text",
              rows: 4,
              description: "Leave a blank line between paragraphs.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "cta",
              title: "Link (optional)",
              type: "cta",
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", items: "items" },
    prepare: ({ title, items }) => {
      const n = (items as unknown[] | undefined)?.length ?? 0;
      return {
        title,
        subtitle: `${n} question${n === 1 ? "" : "s"}`,
      };
    },
  },
});
