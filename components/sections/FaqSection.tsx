import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import type { FaqItem, FaqSectionData } from "@/sanity/lib/types";

/**
 * A referenced FAQ set, rendered as a disclosure list.
 *
 * Built on native <details>/<summary> rather than React state: this is a
 * Server Component, so the accordion ships no JavaScript and keeps keyboard
 * operation, screen-reader semantics and find-in-page for free. Only
 * SiteHeader is a Client Component; nothing here needs to join it.
 *
 * Colours go through `on-dark:` rather than being pinned, so an editor can
 * move the section onto a navy background without it breaking.
 */
export function FaqSection({ data }: { data: FaqSectionData }) {
  const items: readonly FaqItem[] = data.faq?.items ?? [];

  // The reference dangles if the FAQ document is deleted, and an empty set has
  // nothing to disclose. Either way there is no section to draw.
  if (!items.length) return null;

  const { eyebrow, heading, side } = data;

  return (
    <section
      id="faq"
      {...sectionBackgroundProps(data.background, {
        fallback: "cream",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data.background} />
      <Container className="relative z-10">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-13">
          <div>
            {eyebrow && (
              <Eyebrow className="text-teal on-dark:text-seafoam">
                {eyebrow}
              </Eyebrow>
            )}
            <h2 className="mt-4 max-w-[16em] text-section on-dark:text-white">
              {heading}
            </h2>
          </div>
          {side && (
            <p className="max-w-[24em] text-[15.5px] text-ink-soft on-dark:text-dark-lede">
              {side}
            </p>
          )}
        </Reveal>

        <div className="border-t border-hairline on-dark:border-dark-rule">
          {items.map((item, i) => (
            <Reveal key={item._key ?? i} delay={i * 40}>
              <FaqRow item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqRow({ item }: { item: FaqItem }) {
  // A `text` field, so paragraphs arrive as blank-line-separated runs.
  const paragraphs = (item.answer ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <details className="group border-b border-hairline on-dark:border-dark-rule">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
        <h3 className="text-[18px] leading-snug font-medium text-ink group-hover:text-teal on-dark:text-white on-dark:group-hover:text-seafoam md:text-[20.5px]">
          {item.question}
        </h3>
        <span
          aria-hidden
          className="mt-1 shrink-0 text-teal transition-transform duration-200 group-open:rotate-180 on-dark:text-seafoam"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 6.5 9 11.5 14 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>

      <div className="max-w-[46em] pb-6">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className="mt-0 text-[15.5px] text-ink-soft not-first:mt-3.5 on-dark:text-dark-lede"
          >
            {p}
          </p>
        ))}
        {item.cta?.href && (
          <div className="mt-4">
            <LinkArrow href={item.cta.href}>{item.cta.label}</LinkArrow>
          </div>
        )}
      </div>
    </details>
  );
}
