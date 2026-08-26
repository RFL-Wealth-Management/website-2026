import Image from "next/image";

import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import { hero as fallback } from "@/lib/content/homepage";
import { urlForImage } from "@/sanity/lib/image";
import type { HeroSectionData, SectionContent } from "@/sanity/lib/types";

/**
 * Renders from Sanity when the homepage document has a hero section, and from
 * lib/content/homepage.ts otherwise — so the site still builds before the
 * dataset is seeded.
 */
export function Hero({ data }: { data?: HeroSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<HeroSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const headline = c.headline;
  const headlineAlt = c.headlineAlt;
  const lede = c.lede;
  const primaryCta = c.primaryCta;
  const primaryNote = c.primaryNote;
  const secondaryCta = c.secondaryCta;
  const chip = c.chip;

  const heroImage = data?.image?.asset
    ? urlForImage(data.image).width(900).height(1035).url()
    : null;

  return (
    <Container className="relative">
      <div className="grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24">
        <Reveal>
          {eyebrow && <Eyebrow className="text-seafoam">{eyebrow}</Eyebrow>}
          <h1 className="mt-5 text-display text-white">
            {headline}
            {headlineAlt && (
              <>
                <br />
                <span className="font-[380] text-seafoam italic">
                  {headlineAlt}
                </span>
              </>
            )}
          </h1>
          {lede && (
            <p className="mt-6 max-w-[34em] text-lede text-dark-lede">{lede}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-6">
            {primaryCta?.href && (
              <div>
                <Button href={primaryCta.href}>{primaryCta.label}</Button>
                {primaryNote && (
                  <p className="mt-3 max-w-[26em] text-[13px] text-dark-micro">
                    {primaryNote}
                  </p>
                )}
              </div>
            )}
            {secondaryCta?.href && (
              <LinkArrow href={secondaryCta.href} className="text-seafoam">
                {secondaryCta.label}
              </LinkArrow>
            )}
          </div>
        </Reveal>

        <Reveal className="relative" delay={120}>
          {heroImage && (
            <Image
              src={heroImage}
              alt={data?.image?.alt ?? ""}
              width={900}
              height={1035}
              priority
              className="aspect-[4/4.6] w-full rounded-card object-cover"
            />
          )}

          {chip?.title && (
            <div className="mt-4 flex max-w-[290px] items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_18px_40px_rgba(10,20,40,0.35)] sm:absolute sm:bottom-8 sm:-left-4 sm:mt-0 lg:-left-6">
              <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-seafoam font-serif text-[17px] font-semibold text-navy">
                ✓
              </div>
              <div>
                <b className="block text-[13.5px] leading-tight text-ink">
                  {chip.title}
                </b>
                {chip.note && (
                  <span className="text-xs text-ink-soft">{chip.note}</span>
                )}
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </Container>
  );
}
