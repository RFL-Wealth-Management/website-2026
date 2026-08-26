import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import type {
  Stage,
  StageStepsSectionData,
} from "@/sanity/lib/types";

export function StageSteps({ data }: { data: StageStepsSectionData }) {
  const c = data;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const side = c.side;
  const footLink = c.footLink;
  const stages: readonly Stage[] = c.stages ?? [];

  return (
    <section
      id="works"
      {...sectionBackgroundProps(data.background, {
        fallback: "cream",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data.background} />
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

        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {stages.map((stage, i) => (
            <Reveal key={stage.num ?? i} delay={i * 70}>
              <li className="border-t-2 border-stone pt-5">
                <span className="font-serif text-[15px] font-semibold text-teal">
                  {stage.num}
                </span>
                <h3 className="mt-2 text-[20.5px] leading-tight font-medium">
                  {stage.title}
                </h3>
                <p className="mt-2.5 text-[15px] text-ink-soft">{stage.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        {footLink?.href && (
          <Reveal className="mt-10">
            <LinkArrow href={footLink.href}>{footLink.label}</LinkArrow>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
