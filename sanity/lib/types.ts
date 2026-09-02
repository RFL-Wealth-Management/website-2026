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
 * `_key` is optional on every array item below. GROQ always returns one; it
 * stays optional so the same types describe the objects scripts/seed.ts
 * builds from lib/content/homepage.ts, which are keyed on the way in.
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

export type GridItem = {
  _key?: string;
  title?: string;
  subtitle?: string;
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

export type GridSectionData = SectionBase &
  SectionHeading & {
    _type: "gridSection";
    bodyLabel?: string;
    items?: readonly GridItem[];
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

export type FaqItem = {
  _key?: string;
  question?: string;
  answer?: string;
  cta?: Cta;
};

/**
 * A reusable FAQ document, dereferenced by the section that points at it.
 *
 * Optional all the way down because the reference can dangle: deleting the FAQ
 * document leaves the section on the page with nothing behind it.
 */
export type FaqDoc = {
  _id?: string;
  title?: string;
  items?: readonly FaqItem[];
};

export type FaqSectionData = SectionBase &
  SectionHeading & {
    _type: "faqSection";
    faq?: FaqDoc | null;
  };

export type TextSectionData = SectionBase & {
  _type: "textSection";
  eyebrow?: string;
  heading?: string;
  lede?: string;
  footLink?: Cta;
};

export type SectionData =
  | HeroSectionData
  | QuestionGridSectionData
  | CheckupBandSectionData
  | FeatureProductSectionData
  | StageStepsSectionData
  | StoryFeatureSectionData
  | DifferenceGridSectionData
  | GridSectionData
  | InsightsGridSectionData
  | DualPathCtaSectionData
  | FaqSectionData
  | TextSectionData;

export type HomepageData = {
  title?: string;
  sections?: SectionData[];
} | null;

/**
 * A page reached through /[...slug]. Carries the fields the homepage does not
 * need: where it sits in the URL, and the seofields object generateMetadata
 * hands to buildSeoMeta().
 */
export type PageData = {
  title?: string;
  isGroupIndex?: boolean;
  groupSlug?: string | null;
  seo?: unknown;
  sections?: SectionData[];
} | null;

/** One row of PAGE_PATHS_QUERY. */
export type PagePathRow = {
  slug?: string | null;
  isGroupIndex?: boolean | null;
  groupSlug?: string | null;
};


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
 * The document shapes after the loader has ruled out "missing".
 *
 * Components take these, not the nullable query types: with no content
 * fallbacks, a missing document is a 503 decided in app/page.tsx, never
 * something a section has to render around.
 */
export type Homepage = NonNullable<HomepageData>;
export type Page = NonNullable<PageData>;
export type SiteSettings = NonNullable<SiteSettingsData>;
