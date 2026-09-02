import { BookFeature } from "@/components/sections/BookFeature";
import { CheckupBand } from "@/components/sections/CheckupBand";
import { DifferenceGrid } from "@/components/sections/DifferenceGrid";
import { DualPathCta } from "@/components/sections/DualPathCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { GridSection } from "@/components/sections/GridSection";
import { Hero } from "@/components/sections/Hero";
import { InsightsGrid } from "@/components/sections/InsightsGrid";
import { QuestionGrid } from "@/components/sections/QuestionGrid";
import { StageSteps } from "@/components/sections/StageSteps";
import { StoryFeature } from "@/components/sections/StoryFeature";
import { TextSection } from "@/components/sections/TextSection";
import type { SectionData } from "@/sanity/lib/types";

/**
 * Page-builder dispatch.
 *
 * A `switch` rather than a `_type` → component lookup map: the switch narrows
 * `section` to the exact union member in each branch, so every component gets
 * its own props with no cast at the call site.
 */
export function Section({ section }: { section: SectionData }) {
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
    case "faqSection":
      return <FaqSection data={section} />;
    case "textSection":
      return <TextSection data={section} />;
    default:
      // Unreachable for the union above, but reachable at runtime if the
      // dataset carries a section type this deploy does not know yet.
      return null;
  }
}
