import Image from "next/image";

import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/cn";
import { asHeroLayout } from "@/lib/hero-layouts";
import { urlForImage } from "@/sanity/lib/image";
import type { HeroSectionData } from "@/sanity/lib/types";

/**
 * Hero, in three arrangements.
 *
 * The layouts are presentation only: every one reads the same fields, so an
 * editor switching layout in the Studio never loses copy and is never asked
 * for something new. Anything shared lives in the two pieces below —
 * `HeroCopy` and `HeroChip` — so a wording or spacing fix lands in all three.
 *
 * All three assume a dark backdrop, because PageShell lifts a *leading* hero
 * into the header's background block (fallback "navy").
 */
export function Hero({ data }: { data: HeroSectionData }) {
  switch (asHeroLayout(data.layout)) {
    case "centered":
      return <CenteredHero data={data} />;
    case "overlay":
      return <OverlayHero data={data} />;
    default:
      return <SplitHero data={data} />;
  }
}

/* -------------------------------------------------------------------------
   Shared pieces
   ------------------------------------------------------------------------- */

/**
 * Headline, lede and the CTA row.
 *
 * `align` centres the whole stack rather than only the text: the CTA row and
 * the note have to follow the headline, or a centred layout ends up with a
 * centred heading over a left-hugging button.
 */
function HeroCopy({
  data,
  align = "start",
}: {
  data: HeroSectionData;
  align?: "start" | "center";
}) {
  const centered = align === "center";
  const { eyebrow, headline, headlineAlt, lede } = data;
  const { primaryCta, primaryNote, secondaryCta } = data;

  return (
    <>
      {eyebrow && <Eyebrow className="text-seafoam">{eyebrow}</Eyebrow>}

      <h1 className="mt-5 text-display text-white">
        {headline}
        {headlineAlt && (
          <>
            <br />
            <span className="font-normal text-seafoam italic">
              {headlineAlt}
            </span>
          </>
        )}
      </h1>

      {lede && (
        <p
          className={cn(
            "mt-6 max-w-[34em] text-lede text-dark-lede",
            centered && "mx-auto",
          )}
        >
          {lede}
        </p>
      )}

      {/* Both CTAs share one centred row; the note drops beneath it so it
          cannot drag the secondary link off the button's centre line. */}
      <div className="mt-8">
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-6 gap-y-4",
            centered && "justify-center",
          )}
        >
          {primaryCta?.href && (
            <Button href={primaryCta.href}>{primaryCta.label}</Button>
          )}
          {secondaryCta?.href && (
            <LinkArrow href={secondaryCta.href} className="text-seafoam">
              {secondaryCta.label}
            </LinkArrow>
          )}
        </div>
        {primaryCta?.href && primaryNote && (
          <p
            className={cn(
              "mt-3 max-w-[26em] text-[13px] text-dark-micro",
              centered && "mx-auto",
            )}
          >
            {primaryNote}
          </p>
        )}
      </div>
    </>
  );
}

/**
 * The white proof chip. Positioning is the caller's job — each layout hangs it
 * somewhere different — so only the card itself is shared.
 */
function HeroChip({
  chip,
  className,
}: {
  chip?: { title?: string; note?: string };
  className?: string;
}) {
  if (!chip?.title) return null;

  return (
    <div
      className={cn(
        "flex max-w-[290px] items-center gap-3 rounded-2xl bg-white p-4",
        "shadow-[0_18px_40px_rgba(10,20,40,0.35)]",
        className,
      )}
    >
      <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-seafoam font-serif text-[17px] font-semibold text-navy">
        ✓
      </div>
      <div>
        <b className="block text-[13.5px] leading-tight text-ink">
          {chip.title}
        </b>
        {chip.note && <span className="text-xs text-ink-soft">{chip.note}</span>}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Layouts
   ------------------------------------------------------------------------- */

/** Copy left, portrait right. The mockup's original arrangement. */
function SplitHero({ data }: { data: HeroSectionData }) {
  const heroImage = data.image?.asset
    ? urlForImage(data.image).width(900).height(1035).url()
    : null;

  return (
    <Container className="relative">
      <div className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        <Reveal>
          <HeroCopy data={data} />
        </Reveal>

        <Reveal className="relative" delay={120}>
          {heroImage && (
            <Image
              src={heroImage}
              alt={data.image?.alt ?? ""}
              width={900}
              height={1035}
              priority
              className="aspect-[4/4.6] w-full rounded-card object-cover"
            />
          )}

          <HeroChip
            chip={data.chip}
            className="mt-4 sm:absolute sm:bottom-8 sm:-left-4 sm:mt-0 lg:-left-6"
          />
        </Reveal>
      </div>
    </Container>
  );
}

/**
 * Copy centred in a narrow column, wide banner image beneath.
 *
 * The image goes landscape rather than portrait here, so it is requested at a
 * different crop than the split layout's — same asset, different derivative.
 */
function CenteredHero({ data }: { data: HeroSectionData }) {
  const heroImage = data.image?.asset
    ? urlForImage(data.image).width(1800).height(860).url()
    : null;

  return (
    <Container className="relative">
      <div className="py-12 md:py-16 lg:py-20">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <HeroCopy data={data} align="center" />
        </Reveal>

        {heroImage ? (
          <Reveal className="relative mt-12 lg:mt-16" delay={120}>
            <Image
              src={heroImage}
              alt={data.image?.alt ?? ""}
              width={1800}
              height={860}
              priority
              className="aspect-[4/3] w-full rounded-card object-cover sm:aspect-[21/9]"
            />
            {/* Overlaps the photo from `sm` up; below that there is no room
                beside it, so the chip stacks underneath instead. */}
            <HeroChip
              chip={data.chip}
              className="mx-auto mt-4 sm:absolute sm:bottom-6 sm:left-6 sm:mx-0 sm:mt-0"
            />
          </Reveal>
        ) : (
          // No image: the chip still belongs somewhere, so it centres under
          // the copy rather than disappearing along with the photo.
          <HeroChip chip={data.chip} className="mx-auto mt-10" />
        )}
      </div>
    </Container>
  );
}

/**
 * Copy over the image itself, inside a rounded panel.
 *
 * The panel keeps its own `bg-navy-lift`, so a hero with no image yet reads as
 * a deliberate colour block instead of collapsing to nothing.
 *
 * The scrim is two layers, not one gradient. The copy fills the panel's whole
 * height, so a directional fade puts some of the headline in its thin end — at
 * which point legibility depends on what happens to be in the photo there. The
 * flat layer sits at 70%, just past the 67% that OVERLAY_AA_OPACITY in
 * lib/background.ts derives as the floor for white text on navy over a
 * worst-case white photo. The gradient on top only deepens the left, where the
 * text column is, and leaves the right of the image comparatively open.
 */
function OverlayHero({ data }: { data: HeroSectionData }) {
  const heroImage = data.image?.asset
    ? urlForImage(data.image).width(2000).height(1200).url()
    : null;

  return (
    <Container className="relative">
      <div className="py-12 md:py-16 lg:py-20">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-card bg-navy-lift">
            {heroImage && (
              <>
                <Image
                  src={heroImage}
                  alt={data.image?.alt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1180px) 1116px, 100vw"
                  className="-z-10 object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-navy/70"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/60 to-transparent"
                />
              </>
            )}

            <div className="px-6 py-14 sm:px-10 md:px-12 md:py-20 lg:py-28">
              <div className="max-w-[36rem]">
                <HeroCopy data={data} />
                <HeroChip chip={data.chip} className="mt-8" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Container>
  );
}
