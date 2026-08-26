import Image from "next/image";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { story as fallback } from "@/lib/content/homepage";
import { urlForImage } from "@/sanity/lib/image";
import type {
  SectionContent,
  StoryFact,
  StoryFeatureSectionData,
} from "@/sanity/lib/types";

export function StoryFeature({ data }: { data?: StoryFeatureSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<StoryFeatureSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const quote = c.quote;
  const name = c.name;
  const meta = c.meta;
  const initials = c.initials;
  const footLink = c.footLink;
  const facts: readonly StoryFact[] = c.facts ?? [];

  const portrait = data?.image?.asset
    ? urlForImage(data.image).width(800).height(960).url()
    : null;

  return (
    <section
      id="story"
      {...sectionBackgroundProps(data?.background, {
        fallback: "navy",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data?.background} />
      <Container className="relative z-10">
        <Reveal>
          {eyebrow && <Eyebrow className="text-seafoam">{eyebrow}</Eyebrow>}
          <h2 className="mt-4 max-w-[16em] text-section text-white">
            {heading}
          </h2>
        </Reveal>

        {/* Two columns only when there is a portrait to fill the first one. */}
        <div
          className={
            portrait
              ? "mt-10 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
              : "mt-10 max-w-[52em]"
          }
        >
          {portrait && (
            <Reveal>
              <Image
                src={portrait}
                alt={data?.image?.alt ?? ""}
                width={800}
                height={960}
                className="aspect-[4/4.8] w-full rounded-card object-cover"
              />
            </Reveal>
          )}

          <Reveal delay={portrait ? 120 : 0}>
            <blockquote className="font-serif text-[clamp(21px,2.2vw,28px)] leading-snug text-white">
              <q>{quote}</q>
            </blockquote>

            <div className="mt-6 flex items-center gap-3.5">
              <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-seafoam font-serif text-[15px] font-semibold text-navy">
                {initials}
              </div>
              <div>
                <b className="block text-[14.5px] text-white">{name}</b>
                <span className="text-[13px] text-dark-micro">{meta}</span>
              </div>
            </div>

            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {facts.map((fact, i) => (
                <div key={fact.label ?? i}>
                  <dt className="text-[12.5px] font-semibold tracking-[0.1em] text-seafoam uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] text-dark-lede">
                    {fact.body}
                  </dd>
                </div>
              ))}
            </dl>

            {footLink?.href && (
              <div className="mt-8">
                <LinkArrow href={footLink.href}>{footLink.label}</LinkArrow>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
