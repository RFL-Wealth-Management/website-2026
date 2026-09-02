/**
 * Site-level constants shared by the root layout and per-page metadata.
 *
 * The description lives here rather than only in app/layout.tsx because a page
 * that exports generateMetadata replaces the layout's metadata rather than
 * merging with it — so /[...slug] has to hand the same default to
 * buildSeoMeta() or its pages ship with no description at all until an editor
 * fills in the SEO tab.
 */

export const SITE_NAME = "RFL Wealth Management";

export const SITE_DESCRIPTION =
  "Integrated financial planning built for Canadian physicians — tax, corporation, investments, insurance, estate and retirement, coordinated around one plan.";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rflwealth.ca";
