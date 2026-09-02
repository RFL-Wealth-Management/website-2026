import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/sections/Section";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import type { SectionData, SiteSettings } from "@/sanity/lib/types";

/**
 * The chrome every Sanity-rendered page shares.
 *
 * Lives here rather than in a layout because the header is not independent of
 * the content: a *leading* hero is lifted out of <main> so it and SiteHeader
 * share one background block, as in the mockup, and the header needs the hero's
 * background to know whether to sit on navy or on a photo. A hero placed
 * further down the page is an ordinary section.
 */
export function PageShell({
  sections,
  settings,
}: {
  sections: readonly SectionData[];
  settings: SiteSettings;
}) {
  const [first, ...rest] = sections;
  const hero = first?._type === "heroSection" ? first : undefined;
  const body = hero ? rest : sections;

  return (
    <>
      <div {...sectionBackgroundProps(hero?.background, { fallback: "navy" })}>
        <SectionBackground background={hero?.background} />
        <SiteHeader settings={settings} />
        {hero && <Hero data={hero} />}
      </div>

      <main>
        {body.map((section) => (
          <Section key={section._key} section={section} />
        ))}
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
