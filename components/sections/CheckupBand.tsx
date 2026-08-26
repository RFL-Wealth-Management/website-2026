import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { checkup as fallback } from "@/lib/content/homepage";
import type {
  CheckupBandSectionData,
  CheckupRow,
  SectionContent,
} from "@/sanity/lib/types";

export function CheckupBand({ data }: { data?: CheckupBandSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<CheckupBandSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const lede = c.lede;
  const cta = c.cta;
  const note = c.note;
  const scanTitle = c.scanTitle;
  const scanBadge = c.scanBadge;
  const rows: readonly CheckupRow[] = c.rows ?? [];

  return (
    <section
      id="checkup"
      {...sectionBackgroundProps(data?.background, {
        fallback: "teal",
        className: "py-16 md:py-20 lg:py-24",
      })}
    >
      <SectionBackground background={data?.background} />
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[70px]">
          <Reveal>
            {eyebrow && <Eyebrow className="text-seafoam">{eyebrow}</Eyebrow>}
            <h2 className="mt-4 max-w-[16em] text-section text-white">
              {heading}
            </h2>
            {lede && (
              <p className="mt-5 max-w-[34em] text-lede text-[#D3EFE6]">
                {lede}
              </p>
            )}
            {cta?.href && (
              <div className="mt-7">
                <Button href={cta.href} variant="white">
                  {cta.label}
                </Button>
              </div>
            )}
            {note && <p className="mt-3 text-[13px] text-[#BFE7DA]">{note}</p>}
          </Reveal>

          <Reveal delay={120}>
            <div
              className="rounded-card bg-white p-6 text-ink shadow-[0_30px_60px_rgba(6,40,37,0.35)]"
              role="img"
              aria-label="Sample checkup results card showing areas reviewed"
            >
              <div className="mb-4 flex items-center justify-between text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">
                {scanTitle}
                <em className="rounded-full bg-sand px-2.5 py-1 text-[11px] tracking-[0.06em] text-[#7A5A38] not-italic">
                  {scanBadge}
                </em>
              </div>
              <ul className="flex flex-col gap-2.5">
                {rows.map((row, i) => (
                  <li
                    key={row.label ?? i}
                    className="flex items-center gap-3 rounded-[10px] bg-cream px-3.5 py-2.5 text-[14.5px] font-medium"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-[22px] w-[22px] flex-none place-items-center rounded-full text-[11px] font-bold ${
                        row.state === "ok"
                          ? "bg-[#DDF2EA] text-teal"
                          : "bg-[#F7E3CE] text-[#B0703C]"
                      }`}
                    >
                      {row.state === "ok" ? "✓" : "!"}
                    </span>
                    {row.label}
                    <span className="ml-auto text-[11.5px] font-semibold tracking-[0.08em] text-ink-soft uppercase">
                      {row.state === "ok" ? "Reviewed" : "Gap found"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
