import type { Image } from "sanity";

import type { BackgroundData } from "@/lib/background";

export type Cta = { label?: string; href?: string };

/** Alt text is defined as a custom field on the image, so it rides along. */
export type SanityImageWithAlt = Image & { alt?: string };

/** Every section object carries these — see the `background` schema object. */
type SectionBase = {
  _key: string;
  background?: BackgroundData;
};

/**
 * `_key` is optional on every array item below. GROQ always returns one, but
 * the repo-authored fallbacks in lib/content/homepage.ts do not have keys —
 * making it optional lets one type describe both sources, so components read
 * `card.href` directly instead of narrowing a union at every property access.
 */

/** Heading block shared by the grid-style sections. */
type SectionHeading = {
  eyebrow?: string;
  heading?: string;
  side?: string;
};

export type QuestionCard = {
  _key?: string;
  q?: string;
  tag?: string;
  href?: string;
};

export type CheckupRow = { _key?: string; label?: string; state?: string };

export type Stage = {
  _key?: string;
  num?: string;
  title?: string;
  body?: string;
};

export type StoryFact = { _key?: string; label?: string; body?: string };

export type DifferenceItem = { _key?: string; title?: string; body?: string };

export type TeamMember = {
  _key?: string;
  name?: string;
  cred?: string;
  body?: string;
  image?: SanityImageWithAlt;
};

export type InsightCard = {
  _key?: string;
  tag?: string;
  tone?: string;
  title?: string;
  meta?: string;
  href?: string;
};

export type WideCard = {
  tag?: string;
  title?: string;
  meta?: string;
  href?: string;
  thumbnail?: SanityImageWithAlt;
};

export type CtaPath = {
  _key?: string;
  kind?: string;
  title?: string;
  body?: string;
  cta?: Cta;
  variant?: string;
};

export type HeroSectionData = SectionBase & {
  _type: "heroSection";
  eyebrow?: string;
  headline?: string;
  headlineAlt?: string;
  lede?: string;
  primaryCta?: Cta;
  primaryNote?: string;
  secondaryCta?: Cta;
  image?: SanityImageWithAlt;
  chip?: { title?: string; note?: string };
};

export type QuestionGridSectionData = SectionBase &
  SectionHeading & {
    _type: "questionGridSection";
    cards?: readonly QuestionCard[];
    footLink?: Cta;
  };

export type CheckupBandSectionData = SectionBase & {
  _type: "checkupBandSection";
  eyebrow?: string;
  heading?: string;
  lede?: string;
  cta?: Cta;
  note?: string;
  scanTitle?: string;
  scanBadge?: string;
  rows?: readonly CheckupRow[];
};

export type FeatureProductSectionData = SectionBase & {
  _type: "featureProductSection";
  eyebrow?: string;
  heading?: string;
  lede?: string;
  bullets?: readonly string[];
  cta?: Cta;
  note?: string;
  coverImage?: SanityImageWithAlt;
  cover?: { eyebrow?: string; title?: string; author?: string };
};

export type StageStepsSectionData = SectionBase &
  SectionHeading & {
    _type: "stageStepsSection";
    stages?: readonly Stage[];
    footLink?: Cta;
  };

export type StoryFeatureSectionData = SectionBase & {
  _type: "storyFeatureSection";
  eyebrow?: string;
  heading?: string;
  quote?: string;
  name?: string;
  meta?: string;
  initials?: string;
  image?: SanityImageWithAlt;
  facts?: readonly StoryFact[];
  footLink?: Cta;
};

export type DifferenceGridSectionData = SectionBase &
  SectionHeading & {
    _type: "differenceGridSection";
    items?: readonly DifferenceItem[];
    cta?: Cta;
  };

export type TeamGridSectionData = SectionBase &
  SectionHeading & {
    _type: "teamGridSection";
    members?: readonly TeamMember[];
    footLink?: Cta;
  };

export type InsightsGridSectionData = SectionBase &
  SectionHeading & {
    _type: "insightsGridSection";
    cards?: readonly InsightCard[];
    wide?: WideCard;
    footLink?: Cta;
  };

export type DualPathCtaSectionData = SectionBase & {
  _type: "dualPathCtaSection";
  eyebrow?: string;
  heading?: string;
  paths?: readonly CtaPath[];
};

export type SectionData =
  | HeroSectionData
  | QuestionGridSectionData
  | CheckupBandSectionData
  | FeatureProductSectionData
  | StageStepsSectionData
  | StoryFeatureSectionData
  | DifferenceGridSectionData
  | TeamGridSectionData
  | InsightsGridSectionData
  | DualPathCtaSectionData;

export type HomepageData = {
  title?: string;
  sections?: SectionData[];
} | null;

/**
 * Narrows the page-builder array to one section by `_type`, returning that
 * member's own type — `findSection(sections, "teamGridSection")` gives back a
 * `TeamGridSectionData | undefined` with no cast at the call site.
 */
export function findSection<T extends SectionData["_type"]>(
  sections: SectionData[] | undefined,
  type: T,
): Extract<SectionData, { _type: T }> | undefined {
  return sections?.find(
    (s): s is Extract<SectionData, { _type: T }> => s._type === type,
  );
}

export type NavItem = {
  _key?: string;
  label?: string;
  href?: string;
  children?: readonly NavItem[];
};

export type FooterLink = { _key?: string; label?: string; href?: string };

export type FooterColumn = {
  _key?: string;
  title?: string;
  links?: readonly FooterLink[];
};

export type SiteSettingsData = {
  navItems?: readonly NavItem[];
  navCta?: Cta;
  footerBlurb?: string;
  footerColumns?: readonly FooterColumn[];
  newsletter?: {
    title?: string;
    body?: string;
    placeholder?: string;
    button?: string;
  };
  legalLinks?: readonly FooterLink[];
  copyright?: string;
  disclaimer?: string;
} | null;

/**
 * A section's editable fields, without the page-builder plumbing.
 *
 * Components fall back to repo content as ONE object (`data ?? fallback`)
 * rather than field by field. Per-field `??` cannot express deletion: a field
 * the editor clears comes back `undefined` and resurrects the repo default,
 * so removing a CTA in the Studio would never reach the page. Falling back
 * wholesale means Sanity owns the section the moment the document has it —
 * including the fields it deliberately leaves empty.
 *
 * `background` is excluded because it is Sanity-only; it is read from `data`
 * directly, never from the fallback.
 */
export type SectionContent<T extends SectionData> = Omit<
  T,
  "_key" | "_type" | "background"
>;
