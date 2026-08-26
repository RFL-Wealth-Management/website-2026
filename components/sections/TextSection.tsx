import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import type { TextSectionData } from "@/sanity/lib/types";

/**
 * Prose only.
 *
 * Colours go through the `on-dark:` variant rather than being pinned, because
 * this section is meant to be dropped anywhere and the editor picks its
 * background.
 */
export function TextSection({ data }: { data: TextSectionData }) {
  if (!data.heading) return null;

  const { eyebrow, heading, lede, footLink } = data;

  return (
    <section
      {...sectionBackgroundProps(data.background, {
        fallback: "cream",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data.background} />
      <Container className="relative z-10">
        <Reveal className="max-w-[46em]">
          {eyebrow && (
            <Eyebrow className="text-teal on-dark:text-seafoam">
              {eyebrow}
            </Eyebrow>
          )}
          <h2 className="mt-4 text-section on-dark:text-white">{heading}</h2>
          {lede && (
            <p className="mt-5 text-lede text-ink-soft on-dark:text-dark-lede">
              {lede}
            </p>
          )}
          {footLink?.href && (
            <div className="mt-8">
              <LinkArrow href={footLink.href}>{footLink.label}</LinkArrow>
            </div>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
