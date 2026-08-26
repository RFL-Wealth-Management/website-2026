import { defineField, defineType } from "sanity";

import {
  BACKGROUND_COLORS,
  OVERLAY_COLORS,
  OVERLAY_OPACITIES,
} from "@/lib/background";

/** Shape of the parent object when evaluating the overlay's `hidden` rule. */
type BackgroundParent = { image?: { asset?: unknown } };

export const background = defineType({
  name: "background",
  title: "Background",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "image",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      description: "Optional. Sits behind the section content, full bleed.",
    }),

    // Only meaningful once there is an image to tint, so it stays out of the
    // way until one is picked.
    defineField({
      name: "overlay",
      title: "Overlay",
      type: "object",
      description: "Tints the image so the text on top stays readable.",
      options: { columns: 2 },
      hidden: ({ parent }) => !(parent as BackgroundParent)?.image?.asset,
      fields: [
        defineField({
          name: "color",
          title: "Overlay colour",
          type: "string",
          options: { list: OVERLAY_COLORS },
          initialValue: "navy",
        }),
        defineField({
          name: "opacity",
          title: "Opacity (%)",
          type: "number",
          options: { list: OVERLAY_OPACITIES },
          initialValue: 50,
        }),
      ],
    }),

    defineField({
      name: "color",
      title: "Background colour",
      type: "string",
      options: { list: BACKGROUND_COLORS },
      initialValue: "cream",
      description: "Shows on its own, or behind a transparent image.",
    }),
  ],
});
