/**
 * Single source of truth for section backgrounds.
 *
 * Imported by BOTH the Sanity schema (to build the dropdowns) and the
 * renderer (to map a stored value onto a Tailwind class). Keep it free of
 * React and of `sanity` imports so either side can load it — see the
 * react-server note in AGENTS.md.
 */

export type BackgroundColor = "cream" | "stone" | "navy" | "teal";
export type OverlayColor = "navy" | "teal" | "stone" | "black" | "white";

/** The colours already in use as section backgrounds across the homepage. */
export const BACKGROUND_COLORS: {
  title: string;
  value: BackgroundColor;
}[] = [
  { title: "Cream (page default)", value: "cream" },
  { title: "Stone", value: "stone" },
  { title: "Navy", value: "navy" },
  { title: "Teal", value: "teal" },
];

/**
 * Sanity 6 types `NumberOptions` as an enum list only — there is no typed
 * slider — so opacity is a fixed set of steps rather than free input. It also
 * stops an editor typing a value that blows out the contrast.
 */
export const OVERLAY_OPACITIES: { title: string; value: number }[] = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
].map((n) => ({ title: `${n}%`, value: n }));

export const OVERLAY_COLORS: { title: string; value: OverlayColor }[] = [
  { title: "Navy", value: "navy" },
  { title: "Teal", value: "teal" },
  { title: "Stone", value: "stone" },
  { title: "Black", value: "black" },
  { title: "White", value: "white" },
];

/**
 * Written out in full because Tailwind scans source text — a template string
 * like `bg-${color}` would never make it into the generated stylesheet.
 */
const BACKGROUND_CLASS: Record<BackgroundColor, string> = {
  cream: "bg-cream",
  stone: "bg-stone",
  navy: "bg-navy",
  teal: "bg-teal",
};

const OVERLAY_CLASS: Record<OverlayColor, string> = {
  navy: "bg-navy",
  teal: "bg-teal",
  stone: "bg-stone",
  black: "bg-black",
  white: "bg-white",
};

/**
 * Which backgrounds are dark enough to need the inverted text palette. This
 * drives `data-theme="dark"`, so the `on-dark:` variant keeps working instead
 * of every section re-declaring its colours.
 */
const DARK_BACKGROUNDS: Record<BackgroundColor, boolean> = {
  cream: false,
  stone: false,
  navy: true,
  teal: true,
};

export type BackgroundData = {
  image?: { asset?: { _ref?: string } };
  overlay?: { color?: OverlayColor; opacity?: number };
  color?: BackgroundColor;
  /** Decorative scroll-driven drift on the background image. */
  parallax?: boolean;
};

export const backgroundClass = (color: BackgroundColor = "cream") =>
  BACKGROUND_CLASS[color] ?? BACKGROUND_CLASS.cream;

/**
 * Resolve a stored overlay colour to one still in the palette.
 *
 * Values dropped from the picker live on in existing documents, and the paint
 * and the theme decision MUST land on the same answer. When they disagreed —
 * `overlayClass` mapping an unknown value to navy while the theme lookup read
 * it as "not a dark overlay" — the section painted itself dark and then asked
 * for ink text on top of it.
 */
const resolveOverlay = (color?: OverlayColor): OverlayColor =>
  color !== undefined && color in OVERLAY_CLASS ? color : "navy";

export const overlayClass = (color?: OverlayColor) =>
  OVERLAY_CLASS[resolveOverlay(color)];

export const isDarkBackground = (color: BackgroundColor = "cream") =>
  DARK_BACKGROUNDS[color] ?? false;

/** Which overlay colours darken whatever sits under them. */
const DARK_OVERLAYS: Record<OverlayColor, boolean> = {
  navy: true,
  teal: true,
  stone: false,
  black: true,
  white: false,
};

/**
 * Opacity at which the overlay, rather than the photo, decides the mood of the
 * section. Below this the image still shows through strongly enough that the
 * base colour is the better guess.
 */
const OVERLAY_DECIDES_AT = 50;

/**
 * Minimum overlay opacity for white body text to clear WCAG AA (4.5:1) in the
 * worst case — a pure white photo underneath. Derived from the sRGB luminance
 * formula rather than eyeballed; `null` means the colour is too light to ever
 * guarantee it, so it should carry dark text instead.
 */
export const OVERLAY_AA_OPACITY: Record<OverlayColor, number | null> = {
  navy: 67,
  teal: null,
  stone: null,
  black: 54,
  white: null,
};

/**
 * Does this section need the inverted text palette?
 *
 * The base colour on its own is not enough to answer. A light `stone` section
 * carrying a photo under a 90% navy tint reads as dark to a human, and
 * answering "light" there puts ink text on a navy backdrop at 1.4:1 — which is
 * exactly the bug this replaced.
 */
export function isDarkSection(
  background?: BackgroundData,
  fallback: BackgroundColor = "cream",
) {
  const overlay = background?.overlay;
  const opacity = overlay?.opacity ?? 50;

  if (background?.image?.asset && opacity >= OVERLAY_DECIDES_AT) {
    return DARK_OVERLAYS[resolveOverlay(overlay?.color)];
  }

  return isDarkBackground(background?.color ?? fallback);
}
