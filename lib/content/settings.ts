import { footer, nav } from "@/lib/content/homepage";
import type { SiteSettingsData } from "@/sanity/lib/types";

/**
 * Repo content reshaped to match what the `siteSettings` singleton returns.
 *
 * The header and footer swap this in as one object when the Studio has no
 * settings document, for the same reason sections use `SectionContent`:
 * per-field `??` cannot express a value the editor deliberately cleared.
 *
 * The repo stores footer links as bare labels; Sanity stores them as `cta`
 * objects, so they are normalised up to the richer shape here — once, rather
 * than in both components.
 */
const asLinks = (labels: readonly string[]) =>
  labels.map((label) => ({ label, href: "#" }));

export const FALLBACK_SETTINGS: NonNullable<SiteSettingsData> = {
  navItems: nav.items,
  navCta: nav.cta,
  footerBlurb: footer.blurb,
  footerColumns: footer.columns.map((col) => ({
    title: col.title,
    links: asLinks(col.links),
  })),
  newsletter: footer.newsletter,
  legalLinks: asLinks(footer.legal),
  copyright: footer.copyright,
  disclaimer: footer.note,
};
