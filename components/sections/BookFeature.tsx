import Image from "next/image";

import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { book as fallback } from "@/lib/content/homepage";
import { urlForImage } from "@/sanity/lib/image";
import type {
  FeatureProductSectionData,
  SectionContent,
} from "@/sanity/lib/types";

export function BookFeature({ data }: { data?: FeatureProductSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<FeatureProductSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const lede = c.lede;
  const cta = c.cta;
  const note = c.note;
  const cover = c.cover;
  const bullets: readonly string[] = c.bullets ?? [];

  // A real cover photo wins; otherwise the typeset cover stands in — it is a
  // designed element, not a placeholder awaiting art.
  const coverImage = data?.coverImage?.asset
    ? urlForImage(data.coverImage).width(600).url()
    : null;

  return (
    <section
      id="book"
      {...sectionBackgroundProps(data?.background, {
        fallback: "stone",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data?.background} />
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="grid place-items-center py-4">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={data?.coverImage?.alt ?? cover?.title ?? ""}
                width={600}
                height={870}
                className="w-[min(300px,68%)] rotate-[-2.5deg] rounded-[6px_14px_14px_6px] shadow-[-24px_30px_60px_rgba(30,50,86,0.35)]"
              />
            ) : (
              <div className="relative flex w-[min(300px,68%)] rotate-[-2.5deg] flex-col rounded-[6px_14px_14px_6px] bg-[linear-gradient(150deg,#27406C,var(--color-navy)_55%)] px-7 py-8 text-white shadow-[-24px_30px_60px_rgba(30,50,86,0.35),inset_8px_0_0_rgba(255,255,255,0.08)] before:absolute before:top-0 before:bottom-0 before:left-3.5 before:w-px before:bg-white/20 aspect-[3/4.35]">
                <span className="text-[10.5px] font-semibold tracking-[0.22em] text-seafoam uppercase">
                  {cover?.eyebrow}
                </span>
                <h3 className="mt-auto font-serif text-[34px] leading-none">
                  {cover?.title}
                </h3>
                <span className="mt-3 text-[12.5px] text-dark-micro">
                  {cover?.author}
                </span>
              </div>
            )}
          </Reveal>

          <Reveal delay={120}>
            {eyebrow && <Eyebrow className="text-teal">{eyebrow}</Eyebrow>}
            <h2 className="mt-4 max-w-[16em] text-section">{heading}</h2>
            {lede && (
              <p className="mt-5 max-w-[34em] text-lede text-ink-soft">
                {lede}
              </p>
            )}
            <ul className="mt-6 flex flex-col gap-3">
              {bullets.map((b, i) => (
                <li
                  key={b ?? i}
                  className="flex items-start gap-3 text-[15.5px]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-[22px] w-[22px] flex-none place-items-center rounded-full bg-white text-[11px] font-bold text-teal"
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            {cta?.href && (
              <div className="mt-8">
                <Button href={cta.href} variant="navy">
                  {cta.label}
                </Button>
              </div>
            )}
            {note && <p className="mt-3 text-[13px] text-ink-soft">{note}</p>}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
