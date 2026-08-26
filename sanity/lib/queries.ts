import { defineQuery } from "next-sanity";

/**
 * The whole page builder. Sections are projected per `_type`; `background` sits
 * outside those blocks because every section object carries it, so it projects
 * once for all of them.
 */
export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "page" && isHomepage == true][0]{
    title,
    sections[]{
      _key,
      _type,
      background{ image, overlay, color, parallax },

      _type == "heroSection" => {
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

      _type == "textSection" => {
        eyebrow, heading, lede, footLink
      }
    }
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
