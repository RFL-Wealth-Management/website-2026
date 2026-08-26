import { type ClassNameValue, twMerge } from "tailwind-merge";

/**
 * Joins class names AND resolves Tailwind conflicts, so a `className` passed
 * into a primitive actually overrides that primitive's base classes.
 *
 * A plain `join(" ")` does not do this. Both utilities survive into the DOM
 * and CSS source order picks the winner — which is the stylesheet's order, not
 * the class attribute's. That silently broke `<Button className="px-5 py-2.5">`
 * in the header: Tailwind emits same-utility rules sorted by value, so the
 * base `px-6 py-3.5` came later and won.
 *
 * Custom theme values (`rounded-card`, `max-w-site`, `px-gutter`) are not in
 * tailwind-merge's default scales, so it leaves them alone rather than merging
 * them — safe, since nothing overrides those today. The `on-dark:` variant is
 * treated as its own modifier bucket, so `on-dark:text-seafoam` never collides
 * with an unprefixed `text-*`.
 */
export function cn(...parts: ClassNameValue[]) {
  return twMerge(parts);
}
