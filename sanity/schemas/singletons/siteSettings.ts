import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "nav", title: "Navigation", default: true },
    { name: "footer", title: "Footer" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "navItems",
      title: "Primary navigation",
      type: "array",
      group: "nav",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "href", type: "string" }),
            // Submenus ship in Phase 10; the shape is here from the start so
            // adding them later needs no migration.
            defineField({
              name: "children",
              title: "Submenu",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "href", type: "string" }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "navCta",
      title: "Header CTA",
      type: "cta",
      group: "nav",
    }),

    defineField({
      name: "footerBlurb",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    defineField({
      name: "footerColumns",
      type: "array",
      group: "footer",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({
              name: "links",
              type: "array",
              of: [defineArrayMember({ type: "cta" })],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({
      name: "newsletter",
      type: "object",
      group: "footer",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "body", type: "text", rows: 2 }),
        defineField({ name: "placeholder", type: "string" }),
        defineField({ name: "button", type: "string" }),
      ],
    }),
    defineField({
      name: "legalLinks",
      type: "array",
      group: "footer",
      of: [defineArrayMember({ type: "cta" })],
    }),
    defineField({ name: "copyright", type: "string", group: "footer" }),
    defineField({
      name: "disclaimer",
      type: "text",
      rows: 3,
      group: "footer",
    }),

    defineField({ name: "defaultSeo", type: "seo", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
