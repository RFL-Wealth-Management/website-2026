import type { SchemaTypeDefinition } from "sanity";

import { page } from "./documents/page";
import { background } from "./objects/background";
import { cta } from "./objects/cta";
import {
  checkupBandSection,
  featureProductSection,
  stageStepsSection,
} from "./objects/sections/checkup";
import { gridSection } from "./objects/sections/grid";
import { heroSection, questionGridSection } from "./objects/sections/hero";
import {
  dualPathCtaSection,
  insightsGridSection,
} from "./objects/sections/insights";
import {
  differenceGridSection,
  storyFeatureSection,
} from "./objects/sections/story";
import { textSection } from "./objects/sections/text";
import { seo } from "./objects/seo";
import { siteSettings } from "./singletons/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Documents
  page,
  siteSettings,

  // Shared objects
  background,
  cta,
  seo,

  // Sections
  heroSection,
  questionGridSection,
  checkupBandSection,
  featureProductSection,
  stageStepsSection,
  storyFeatureSection,
  differenceGridSection,
  gridSection,
  insightsGridSection,
  dualPathCtaSection,
  textSection,
];
