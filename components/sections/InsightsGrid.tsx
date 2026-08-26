import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { insights as fallback } from "@/lib/content/homepage";
import { urlForImage } from "@/sanity/lib/image";
import type {
  InsightCard,
  InsightsGridSectionData,
  SectionContent,
  WideCard,
} from "@/sanity/lib/types";

const TAG_TONES: Record<string, string> = {
  tax: "bg-[#F7E3CE] text-[#8A5A2B]",
  article: "bg-[#DDF2EA] text-teal",
  podcast: "bg-[#E4E2F5] text-[#544C8C]",
  guide: "bg-sand text-[#7A5A38]",
};

export function InsightsGrid({ data }: { data?: InsightsGridSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<InsightsGridSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const side = c.side;
  const footLink = c.footLink;
  const wide: WideCard | undefined = c.wide;
  const cards: readonly InsightCard[] = c.cards ?? [];

  const thumbnail =
    data?.wide?.thumbnail?.asset && urlForImage(data.wide.thumbnail).width(640);

  return (
    <section
      id="insights"
      {...sectionBackgroundProps(data?.background, {
        fallback: "cream",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data?.background} />
      <Container className="relative z-10">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-13">
          <div>
            {eyebrow && <Eyebrow className="text-teal">{eyebrow}</Eyebrow>}
            <h2 className="mt-4 max-w-[16em] text-section">{heading}</h2>
          </div>
          {side && (
            <p className="max-w-[24em] text-[15.5px] text-ink-soft">{side}</p>
          )}
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, i) => (
            <Reveal key={card.title ?? i} delay={i * 60}>
              <Link
                href={card.href ?? "#"}
                className="flex h-full flex-col gap-3 rounded-card border border-hairline bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-seafoam hover:shadow-[0_16px_34px_rgba(30,50,86,0.10)]"
              >
                <span
                  className={`self-start rounded-full px-3 py-1 text-[11.5px] font-semibold tracking-[0.06em] uppercase ${
                    TAG_TONES[card.tone ?? "article"] ?? TAG_TONES.article
                  }`}
                >
                  {card.tag}
                </span>
                <h3 className="text-[18.5px] leading-snug font-medium">
                  {card.title}
                </h3>
                <span className="mt-auto text-[13px] text-ink-soft">
                  {card.meta}
                </span>
              </Link>
            </Reveal>
          ))}

          {wide?.title && (
            <Reveal delay={240} className="sm:col-span-2 lg:col-span-2">
              <Link
                href={wide.href ?? "#"}
                data-theme="dark"
                className="flex h-full flex-col gap-5 rounded-card bg-navy p-6 transition-shadow duration-200 hover:shadow-[0_16px_34px_rgba(30,50,86,0.25)] sm:flex-row sm:items-center"
              >
                {thumbnail && (
                  <Image
                    src={thumbnail.url()}
                    alt=""
                    aria-hidden="true"
                    width={640}
                    height={360}
                    className="aspect-video w-full flex-none rounded-xl object-cover sm:w-[220px]"
                  />
                )}
                <div className="flex flex-col gap-2.5">
                  <span className="self-start rounded-full bg-white/15 px-3 py-1 text-[11.5px] font-semibold tracking-[0.06em] text-seafoam uppercase">
                    {wide.tag}
                  </span>
                  <h3 className="text-[19px] leading-snug font-medium text-white">
                    {wide.title}
                  </h3>
                  <span className="text-[13px] text-dark-micro">
                    {wide.meta}
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
        </div>

        {footLink?.href && (
          <Reveal className="mt-10">
            <LinkArrow href={footLink.href}>{footLink.label}</LinkArrow>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
