import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import type {
  DifferenceGridSectionData,
  DifferenceItem,
} from "@/sanity/lib/types";

export function DifferenceGrid({ data }: { data: DifferenceGridSectionData }) {
  const c = data;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const side = c.side;
  const cta = c.cta;
  const items: readonly DifferenceItem[] = c.items ?? [];

  return (
    <section
      id="diff"
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

        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.title ?? i} delay={i * 50}>
              <div className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-full bg-seafoam text-[13px] font-bold text-navy"
                >
                  ✓
                </span>
                <div>
                  <h3 className="text-[19px] leading-tight font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-ink-soft">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {cta?.href && (
          <Reveal className="mt-12">
            <Button href={cta.href} variant="navy">
              {cta.label}
            </Button>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
