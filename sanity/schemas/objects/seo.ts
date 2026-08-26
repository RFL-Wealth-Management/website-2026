import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      type: "string",
      description: "Falls back to the page title. Aim for under 60 characters.",
      validation: (r) => r.max(70).warning("Google truncates around 60."),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      rows: 3,
      validation: (r) => r.max(170).warning("Google truncates around 155."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "canonicalUrl", type: "url" }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
