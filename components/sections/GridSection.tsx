import Image from "next/image";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { LinkArrow } from "@/components/primitives/LinkArrow";
import { Reveal } from "@/components/primitives/Reveal";
import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { urlForImage } from "@/sanity/lib/image";
import type {
  GridItem,
  GridSectionData,
} from "@/sanity/lib/types";

/**
 * A generic card grid. The homepage fills it with the team, but the component
 * knows nothing about that — the bold lead-in above each body is content
 * (`bodyLabel`), not a hardcoded string.
 */
export function GridSection({ data }: { data: GridSectionData }) {
  const c = data;

  const eyebrow = c.eyebrow;
  const heading = c.heading;
  const side = c.side;
  const bodyLabel = c.bodyLabel;
  const footLink = c.footLink;
  const items: readonly GridItem[] = c.items ?? [];

  return (
    <section
      id="team"
      {...sectionBackgroundProps(data.background, {
        fallback: "stone",
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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const picture = item.image?.asset
              ? urlForImage(item.image).width(560).height(616).url()
              : null;

            // Titles are not unique enough to key on — the repo fallback has
            // four cards all titled "Team Member". `_key` is present on
            // everything GROQ returns; the repo content falls through to the
            // index.
            return (
              <Reveal key={item._key ?? i} delay={i * 60}>
                <div className="h-full overflow-hidden rounded-card bg-white">
                  {picture && (
                    <Image
                      src={picture}
                      alt={item.image?.alt ?? item.title ?? ""}
                      width={560}
                      height={616}
                      className="aspect-[4/4.4] w-full object-cover"
                    />
                  )}
                  <div className="p-5">
                    <b className="block text-[16px] font-semibold">
                      {item.title}
                    </b>
                    {item.subtitle && (
                      <div className="mt-1 text-[12.5px] font-medium tracking-[0.04em] text-teal">
                        {item.subtitle}
                      </div>
                    )}
                    <p className="mt-3 text-[14.5px] text-ink-soft">
                      {bodyLabel && (
                        <>
                          <strong className="font-semibold text-ink">
                            {bodyLabel}
                          </strong>{" "}
                        </>
                      )}
                      {item.body}
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
