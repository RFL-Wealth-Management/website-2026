import { asVariant, Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import type {
  CtaPath,
  DualPathCtaSectionData,
} from "@/sanity/lib/types";

export function DualPathCta({ data }: { data: DualPathCtaSectionData }) {
  const c = data;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const paths: readonly CtaPath[] = c.paths ?? [];

  return (
    <section
      id="final"
      {...sectionBackgroundProps(data.background, {
        fallback: "navy",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data.background} />
      <Container className="relative z-10">
        <Reveal>
          {eyebrow && <Eyebrow className="text-seafoam">{eyebrow}</Eyebrow>}
          <h2 className="mt-4 max-w-[16em] text-section text-white">
            {heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {paths.map((path, i) => (
            <Reveal key={path.kind ?? i} delay={i * 100}>
              <div className="flex h-full flex-col items-start gap-3 rounded-card border border-white/10 bg-white/[0.04] p-7">
                <span className="text-[12px] font-semibold tracking-[0.14em] text-seafoam uppercase">
                  {path.kind}
                </span>
                <h3 className="text-[23px] leading-tight font-medium text-white">
                  {path.title}
                </h3>
                <p className="text-[15px] text-dark-lede">{path.body}</p>
                {path.cta?.href && (
                  <div className="mt-3">
                    <Button
                      href={path.cta.href}
                      variant={asVariant(path.variant)}
                    >
                      {path.cta.label}
                    </Button>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
