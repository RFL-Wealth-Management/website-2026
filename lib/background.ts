/**
 * Single source of truth for section backgrounds.
 *
 * Imported by BOTH the Sanity schema (to build the dropdowns) and the
 * renderer (to map a stored value onto a Tailwind class). Keep it free of
 * React and of `sanity` imports so either side can load it — see the
 * react-server note in AGENTS.md.
 */

export type BackgroundColor = "cream" | "stone" | "navy" | "teal";
export type OverlayColor = "navy" | "teal" | "ink" | "black" | "white";

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
  { title: "Ink", value: "ink" },
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
  ink: "bg-ink",
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
};

export const backgroundClass = (color: BackgroundColor = "cream") =>
  BACKGROUND_CLASS[color] ?? BACKGROUND_CLASS.cream;

export const overlayClass = (color: OverlayColor = "navy") =>
  OVERLAY_CLASS[color] ?? OVERLAY_CLASS.navy;

export const isDarkBackground = (color: BackgroundColor = "cream") =>
  DARK_BACKGROUNDS[color] ?? false;
