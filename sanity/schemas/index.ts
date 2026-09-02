import type { SchemaTypeDefinition } from "sanity";

import { faq } from "./documents/faq";
import { page } from "./documents/page";
import { pageGroup } from "./documents/pageGroup";
import { background } from "./objects/background";
import { cta } from "./objects/cta";
import {
  checkupBandSection,
  featureProductSection,
  stageStepsSection,
} from "./objects/sections/checkup";
import { faqSection } from "./objects/sections/faq";
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
  pageGroup,
  siteSettings,

  // Content blocks — reusable, referenced by a section rather than embedded
  faq,

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
  faqSection,
  textSection,
];
