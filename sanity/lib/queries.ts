import { defineQuery } from "next-sanity";

/**
 * The whole page builder, shared by every route that renders a `page`.
 *
 * Sections are projected per `_type`; `background` sits outside those blocks
 * because every section object carries it, so it projects once for all of them.
 *
 * Kept as an interpolated fragment rather than being written out twice: the
 * homepage and /[...slug] must project sections identically, and a section
 * added to one copy but not the other fails silently — the field is simply
 * absent and the component renders a gap.
 */
const SECTIONS_PROJECTION = /* groq */ `
  sections[]{
    _key,
    _type,
    background{ image, overlay, color, parallax },

    _type == "heroSection" => {
      layout,
      eyebrow, headline, headlineAlt, lede,
      primaryCta, primaryNote, secondaryCta,
      image, chip
    },

    _type == "questionGridSection" => {
      eyebrow, heading, side,
      cards[]{ _key, q, tag, href },
      footLink
    },

    _type == "checkupBandSection" => {
      eyebrow, heading, lede, cta, note,
      scanTitle, scanBadge,
      rows[]{ _key, label, state }
    },

    _type == "featureProductSection" => {
      eyebrow, heading, lede, bullets, cta, note,
      coverImage, cover
    },

    _type == "stageStepsSection" => {
      eyebrow, heading, side,
      stages[]{ _key, num, title, body },
      footLink
    },

    _type == "storyFeatureSection" => {
      eyebrow, heading, quote, name, meta, initials, image,
      facts[]{ _key, label, body },
      footLink
    },

    _type == "differenceGridSection" => {
      eyebrow, heading, side,
      items[]{ _key, title, body },
      cta
    },

    _type == "gridSection" => {
      eyebrow, heading, side, bodyLabel,
      items[]{ _key, title, subtitle, body, image },
      footLink
    },

    _type == "insightsGridSection" => {
      eyebrow, heading, side,
      cards[]{ _key, tag, tone, title, meta, href },
      wide,
      footLink
    },

    _type == "dualPathCtaSection" => {
      eyebrow, heading,
      paths[]{ _key, kind, title, body, cta, variant }
    },

    _type == "faqSection" => {
      eyebrow, heading, side,
      faq->{ _id, title, items[]{ _key, question, answer, cta } }
    },

    _type == "textSection" => {
      eyebrow, heading, lede, footLink
    }
  }
`;

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "page" && isHomepage == true][0]{
    title,
    ${SECTIONS_PROJECTION}
  }
`);

/**
 * One page, addressed by the URL it was requested at.
 *
 * A single URL segment is ambiguous — /financial-questions is either a group's
 * landing page or an ungrouped top-level page — so both are matched and the
 * ordering breaks the tie in favour of the group. Two segments can only ever be
 * group + page.
 */
export const PAGE_BY_PATH_QUERY = defineQuery(`
  *[
    _type == "page" && isHomepage != true && (
      ($slug == null && (
        (isGroupIndex == true && group->slug.current == $group) ||
        (!defined(group) && slug.current == $group)
      ))
      ||
      ($slug != null && isGroupIndex != true
        && group->slug.current == $group && slug.current == $slug)
    )
  ] | order(isGroupIndex desc) [0]{
    title,
    isGroupIndex,
    "groupSlug": group->slug.current,
    seo,
    ${SECTIONS_PROJECTION}
  }
`);

/** Every routable path, for generateStaticParams. */
export const PAGE_PATHS_QUERY = defineQuery(`
  *[_type == "page" && isHomepage != true && defined(slug.current)]{
    "slug": slug.current,
    isGroupIndex,
    "groupSlug": group->slug.current
  }
`);

/**
 * The header and footer chrome. A singleton, so it is fetched alongside the
 * page rather than being part of the page-builder array.
 */
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    navItems[]{ _key, label, href, children[]{ _key, label, href } },
    navCta,
    footerBlurb,
    footerColumns[]{ _key, title, links[]{ _key, label, href } },
    newsletter,
    legalLinks[]{ _key, label, href },
    copyright,
    disclaimer
  }
`);
