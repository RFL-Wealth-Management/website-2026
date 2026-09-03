/**
 * Single source of truth for hero layouts.
 *
 * Same split as lib/background.ts: imported by BOTH the Sanity schema (to
 * build the picker) and the renderer (to choose a component). Keep it free of
 * React and of `sanity` imports so either side can load it — see the
 * react-server note in AGENTS.md.
 *
 * The layouts differ only in arrangement. Every one of them renders the same
 * hero fields, so an editor can switch between them without losing content or
 * being asked to fill in something new.
 */

export type HeroLayout = "split" | "centered" | "overlay";

export const HERO_LAYOUTS: {
  title: string;
  value: HeroLayout;
  /** Shown under the thumbnail in the Studio picker. */
  description: string;
}[] = [
  {
    title: "Split",
    value: "split",
    description: "Copy on the left, portrait on the right, chip floating over it.",
  },
  {
    title: "Centred",
    value: "centered",
    description: "Copy centred in a narrow column above a wide banner image.",
  },
  {
    title: "Overlay",
    value: "overlay",
    description: "Copy sits on the image itself, behind a navy scrim.",
  },
];

export const DEFAULT_HERO_LAYOUT: HeroLayout = "split";

/**
 * Sanity hands back a plain `string`, so narrow it here rather than casting at
 * the call site — a layout removed from the schema later degrades to the
 * default instead of rendering nothing. Mirrors `asVariant` in
 * components/primitives/Button.tsx.
 */
export function asHeroLayout(value?: string): HeroLayout {
  return HERO_LAYOUTS.some((l) => l.value === value)
    ? (value as HeroLayout)
    : DEFAULT_HERO_LAYOUT;
}

/**
 * Wireframe thumbnails live in public/hero-layouts/ and are named after the
 * layout value, so a new layout only needs a matching SVG dropped in beside
 * the others. Same convention as public/sections/ (see documents/page.ts).
 */
export const heroLayoutPreviewUrl = (layout: HeroLayout) =>
  `/hero-layouts/${layout}.svg`;
