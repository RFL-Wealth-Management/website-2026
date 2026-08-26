import {
  SectionBackground,
  sectionBackgroundProps,
} from "@/components/primitives/SectionBackground";
import { BookFeature } from "@/components/sections/BookFeature";
import { CheckupBand } from "@/components/sections/CheckupBand";
import { DifferenceGrid } from "@/components/sections/DifferenceGrid";
import { DualPathCta } from "@/components/sections/DualPathCta";
import { Hero } from "@/components/sections/Hero";
import { InsightsGrid } from "@/components/sections/InsightsGrid";
import { QuestionGrid } from "@/components/sections/QuestionGrid";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { StageSteps } from "@/components/sections/StageSteps";
import { StoryFeature } from "@/components/sections/StoryFeature";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import {
  findSection,
  type HomepageData,
  type SiteSettingsData,
} from "@/sanity/lib/types";

// Re-fetch periodically until the Live Content API lands with the
// Presentation tool.
export const revalidate = 60;

export default async function Home() {
  const [homepage, settings] = await Promise.all([
    client.fetch<HomepageData>(HOMEPAGE_QUERY),
    client.fetch<SiteSettingsData>(SITE_SETTINGS_QUERY),
  ]);
  const sections = homepage?.sections;

  // The running order is fixed in code; Sanity supplies each section's
  // content. Reordering from the Studio is a later phase — it needs the
  // sections rendered from the array rather than named one by one.
  const hero = findSection(sections, "heroSection");

  return (
    <>
      {/* Header and hero share one block, as in the mockup. Navy unless the
          hero section overrides it in Sanity. */}
      <div {...sectionBackgroundProps(hero?.background, { fallback: "navy" })}>
        <SectionBackground background={hero?.background} />
        <SiteHeader settings={settings} />
        <Hero data={hero} />
      </div>

      <main>
        <QuestionGrid data={findSection(sections, "questionGridSection")} />
        <CheckupBand data={findSection(sections, "checkupBandSection")} />
        <BookFeature data={findSection(sections, "featureProductSection")} />
        <StageSteps data={findSection(sections, "stageStepsSection")} />
        <StoryFeature data={findSection(sections, "storyFeatureSection")} />
        <DifferenceGrid data={findSection(sections, "differenceGridSection")} />
        <TeamGrid data={findSection(sections, "teamGridSection")} />
        <InsightsGrid data={findSection(sections, "insightsGridSection")} />
        <DualPathCta data={findSection(sections, "dualPathCtaSection")} />
      </main>

      <SiteFooter settings={settings} />
    </>
  );
}
