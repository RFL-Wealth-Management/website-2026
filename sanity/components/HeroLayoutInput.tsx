"use client";

import { useCallback } from "react";
import { set, type StringInputProps } from "sanity";

import {
  DEFAULT_HERO_LAYOUT,
  HERO_LAYOUTS,
  heroLayoutPreviewUrl,
  type HeroLayout,
} from "@/lib/hero-layouts";

/**
 * Layout picker for the hero, showing each arrangement as a wireframe rather
 * than a name in a dropdown.
 *
 * A custom input rather than `options.list`: Sanity's string list renders text
 * only, and "Split" vs "Overlay" means nothing to an editor who has not seen
 * them side by side. The thumbnails follow the same convention as the section
 * insert menu — SVGs in public/hero-layouts/ named after the value — so adding
 * a layout means adding it to HERO_LAYOUTS and dropping in a matching SVG,
 * with no change here.
 *
 * Rendered as a radio group, not a row of buttons: this is one choice from a
 * fixed set, so arrow keys should move between the options and only the
 * checked one should be a tab stop. Buttons would give the right pixels and
 * the wrong semantics.
 *
 * Styled with plain elements and the Studio's own CSS variables rather than
 * @sanity/ui's `Card`/`Grid`/`Stack`. Their spacing and responsive props
 * (`padding`, `space`, `columns`) are typed against a theme augmentation the
 * Studio supplies at runtime but `tsc --noEmit` does not see, so every one of
 * them fails the repo's typecheck as "not assignable to type 'undefined'".
 */
export function HeroLayoutInput(props: StringInputProps) {
  const { id, value, onChange, elementProps, readOnly } = props;
  const selected = value ?? DEFAULT_HERO_LAYOUT;

  const choose = useCallback(
    (layout: HeroLayout) => {
      // Always writes a value, never `unset()`: the stored field is what an
      // editor sees echoed back, and an absent one reads as "nothing chosen"
      // even though the page renders Split.
      onChange(set(layout));
    },
    [onChange],
  );

  return (
    <div
      role="radiogroup"
      aria-label="Hero layout"
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
      }}
    >
      {HERO_LAYOUTS.map((layout) => {
        const checked = layout.value === selected;

        return (
          <label
            key={layout.value}
            style={{
              display: "block",
              padding: 10,
              borderRadius: 6,
              cursor: readOnly ? "not-allowed" : "pointer",
              opacity: readOnly ? 0.6 : 1,
              background: "var(--card-bg-color)",
              color: "var(--card-fg-color)",
              border: checked
                ? "1px solid var(--card-focus-ring-color, #2276fc)"
                : "1px solid var(--card-border-color, #e3e4e8)",
              boxShadow: checked
                ? "0 0 0 1px var(--card-focus-ring-color, #2276fc)"
                : "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element --
                next/image needs the Next runtime; this renders inside the
                Studio bundle, where a plain <img> on a local SVG is correct. */}
            <img
              src={heroLayoutPreviewUrl(layout.value)}
              alt=""
              width={320}
              height={200}
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                borderRadius: 4,
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 10,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <input
                {...(checked ? elementProps : {})}
                type="radio"
                // One shared name per field instance, so two heroes on one page
                // do not fight over the same native radio group.
                name={`${id}-hero-layout`}
                value={layout.value}
                checked={checked}
                disabled={readOnly}
                onChange={() => choose(layout.value)}
              />
              {layout.title}
            </div>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                lineHeight: 1.4,
                color: "var(--card-muted-fg-color, #6e7683)",
              }}
            >
              {layout.description}
            </div>
          </label>
        );
      })}
    </div>
  );
}
