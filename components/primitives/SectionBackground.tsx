import Image from "next/image";
import type { Image as SanityImage } from "sanity";

import {
  type BackgroundColor,
  type BackgroundData,
  backgroundClass,
  isDarkBackground,
  overlayClass,
} from "@/lib/background";
import { cn } from "@/lib/cn";
import { urlForImage } from "@/sanity/lib/image";

/**
 * Props for the `<section>` element itself — the colour layer and the theme
 * context:
 *
 *   <section {...sectionBackgroundProps(background, { fallback: "navy" })}>
 *     <SectionBackground background={background} />
 *     <Container className="relative z-10">…</Container>
 *   </section>
 *
 * `fallback` is a colour *value*, not a class. Passing `className="bg-navy"`
 * instead would leave two `bg-*` utilities on one element, and `lib/cn.ts` is
 * a plain join with no conflict resolution — the editor's choice would lose
 * to whichever Tailwind emits last.
 *
 * `isolate` matters: it makes the section a stacking context so the `-z-10`
 * image layer paints above the section's own background rather than
 * disappearing behind it.
 */
export function sectionBackgroundProps(
  background?: BackgroundData,
  options?: { fallback?: BackgroundColor; className?: string },
) {
  const color = background?.color ?? options?.fallback ?? "cream";
  return {
    className: cn(
      "relative isolate overflow-hidden",
      backgroundClass(color),
      options?.className,
    ),
    ...(isDarkBackground(color) ? { "data-theme": "dark" as const } : {}),
  };
}

/**
 * The image and overlay layers. Renders nothing without an image, so the
 * colour from `sectionBackgroundProps` shows through on its own.
 */
export function SectionBackground({
  background,
}: {
  background?: BackgroundData;
}) {
  if (!background?.image?.asset) return null;

  const src = urlForImage(background.image as SanityImage)
    .width(2400)
    .url();

  // Percentage in Sanity, 0–1 in CSS. The `?? 50` matches the field's initial
  // value so an image added before the slider is touched still gets tinted.
  const opacity = (background.overlay?.opacity ?? 50) / 100;

  return (
    <>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="pointer-events-none -z-10 object-cover"
      />
      {opacity > 0 && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 -z-10",
            overlayClass(background.overlay?.color),
          )}
          style={{ opacity }}
        />
      )}
    </>
  );
}
