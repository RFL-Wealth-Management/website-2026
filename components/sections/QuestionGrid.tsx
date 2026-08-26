import Link from "next/link";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { questions as fallback } from "@/lib/content/homepage";
import type {
  QuestionCard,
  QuestionGridSectionData,
  SectionContent,
} from "@/sanity/lib/types";

export function QuestionGrid({ data }: { data?: QuestionGridSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<QuestionGridSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const side = c.side;
  const footLink = c.footLink;
  // An empty array in Sanity means "not filled in yet", not "render nothing".
  const cards: readonly QuestionCard[] = c.cards ?? [];

  return (
    <section
      id="questions"
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
            <Reveal key={card.q ?? i} delay={i * 60}>
              <Link
                href={card.href ?? "#"}
                className="group flex h-full min-h-[168px] flex-col justify-between gap-8 rounded-card border border-hairline bg-white px-6 py-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-seafoam hover:shadow-[0_16px_34px_rgba(30,50,86,0.10)]"
              >
                <h3 className="max-w-[13em] text-[20.5px] leading-tight font-medium">
                  {card.q}
                </h3>
                <div className="flex items-center justify-between text-[13px] font-semibold text-teal">
                  <span>{card.tag}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-[30px] w-[30px] place-items-center rounded-full bg-cream transition-colors duration-200 group-hover:bg-seafoam group-hover:text-navy"
                  >
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
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
