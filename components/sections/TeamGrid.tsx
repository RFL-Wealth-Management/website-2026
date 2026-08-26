import Image from "next/image";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { team as fallback } from "@/lib/content/homepage";
import { urlForImage } from "@/sanity/lib/image";
import type {
  SectionContent,
  TeamGridSectionData,
  TeamMember,
} from "@/sanity/lib/types";

export function TeamGrid({ data }: { data?: TeamGridSectionData }) {
  // Sanity owns this section once the document has it, so fall back to repo
  // content as a whole object. Per-field `??` would resurrect repo copy for
  // any field the editor deliberately cleared. See SectionContent.
  const c: SectionContent<TeamGridSectionData> = data ?? fallback;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const side = c.side;
  const footLink = c.footLink;
  const members: readonly TeamMember[] = c.members ?? [];

  return (
    <section
      id="team"
      {...sectionBackgroundProps(data?.background, {
        fallback: "stone",
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => {
            const portrait = member.image?.asset
              ? urlForImage(member.image).width(560).height(616).url()
              : null;

            return (
              <Reveal key={member.cred ?? i} delay={i * 60}>
                <div className="h-full overflow-hidden rounded-card bg-white">
                  {portrait && (
                    <Image
                      src={portrait}
                      alt={member.image?.alt ?? member.name ?? ""}
                      width={560}
                      height={616}
                      className="aspect-[4/4.4] w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <b className="block text-[16px] font-semibold">
                      {member.name}
                    </b>
                    <div className="mt-1 text-[12.5px] font-medium tracking-[0.04em] text-teal">
                      {member.cred}
                    </div>
                    <p className="mt-3 text-[14.5px] text-ink-soft">
                      <strong className="font-semibold text-ink">
                        Count on me for:
                      </strong>{" "}
                      {member.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
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
