import { redirect } from "next/navigation";

import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { BookFeature } from "@/components/sections/BookFeature";
import { CheckupBand } from "@/components/sections/CheckupBand";
import { DifferenceGrid } from "@/components/sections/DifferenceGrid";
import { DualPathCta } from "@/components/sections/DualPathCta";
import { GridSection } from "@/components/sections/GridSection";
import { Hero } from "@/components/sections/Hero";
import { InsightsGrid } from "@/components/sections/InsightsGrid";
import { QuestionGrid } from "@/components/sections/QuestionGrid";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { StageSteps } from "@/components/sections/StageSteps";
import { StoryFeature } from "@/components/sections/StoryFeature";
import { TextSection } from "@/components/sections/TextSection";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type {
  Homepage,
  SectionData,
  SiteSettings,
  SiteSettingsData,
} from "@/sanity/lib/types";

// Re-fetch periodically until the Live Content API lands with the
// Presentation tool. A failed revalidation keeps serving the last good page,
// so this window is also the site's buffer against a brief Sanity outage.
export const revalidate = 60;

/**
 * Page-builder dispatch.
 *
 * A `switch` rather than a `_type` → component lookup map: the switch narrows
 * `section` to the exact union member in each branch, so every component gets
 * its own props with no cast at the call site.
 */
function Section({ section }: { section: SectionData }) {
  switch (section._type) {
    case "heroSection":
      return <Hero data={section} />;
    case "questionGridSection":
      return <QuestionGrid data={section} />;
    case "checkupBandSection":
      return <CheckupBand data={section} />;
    case "featureProductSection":
      return <BookFeature data={section} />;
    case "stageStepsSection":
      return <StageSteps data={section} />;
    case "storyFeatureSection":
      return <StoryFeature data={section} />;
    case "differenceGridSection":
      return <DifferenceGrid data={section} />;
    case "gridSection":
      return <GridSection data={section} />;
    case "insightsGridSection":
      return <InsightsGrid data={section} />;
    case "dualPathCtaSection":
      return <DualPathCta data={section} />;
    case "textSection":
      return <TextSection data={section} />;
    default:
      // Unreachable for the union above, but reachable at runtime if the
      // dataset carries a section type this deploy does not know yet.
      return null;
  }
}

/**
 * There are no content fallbacks: Sanity is the only source. Anything that
 * stops us from rendering a real page — a failed request, a missing document,
 * a page with no sections — resolves to `null` and becomes a 503.
 */
async function loadHomepage(): Promise<{
  homepage: Homepage;
  settings: SiteSettings;
} | null> {
  try {
    const [homepage, settings] = await Promise.all([
      client.fetch<Homepage | null>(HOMEPAGE_QUERY),
      client.fetch<SiteSettingsData>(SITE_SETTINGS_QUERY),
    ]);

    if (!homepage?.sections?.length || !settings) return null;
    return { homepage, settings };
  } catch {
    return null;
  }
}

export default async function Home() {
  const content = await loadHomepage();

  // redirect() signals by throwing. Calling it inside loadHomepage's `try`
  // would let that catch swallow the signal and return null instead.
  if (!content) redirect("/503");

  const { homepage, settings } = content;
  const sections = homepage.sections ?? [];

  // The header and hero share one background block, as in the mockup, so a
  // leading hero is lifted out of <main>. Every other section — including a
  // hero placed further down — renders in document order.
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
