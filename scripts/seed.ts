/**
 * Seeds the homepage and site settings into Sanity from lib/content/homepage.ts.
 *
 *   npm run seed
 *
 * Safe to re-run. Uses createIfNotExists + a targeted patch rather than
 * createOrReplace, so images and edits made in the Studio survive a re-seed.
 * Only the fields listed below are overwritten; image fields are never touched.
 */

import { createClient } from "@sanity/client";

import * as c from "../lib/content/homepage.ts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID / _DATASET");
}
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN.\n" +
      "Create an Editor token at https://sanity.io/manage → API → Tokens,\n" +
      "then add it to .env.local as SANITY_API_WRITE_TOKEN=…",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-20",
  useCdn: false,
});

/** Sanity requires a stable _key on every object inside an array. */
let keyCounter = 0;
const withKeys = <T extends object>(items: readonly T[]) =>
  items.map((item) => ({ ...item, _key: `k${(keyCounter++).toString(36)}` }));

const linkList = (labels: readonly string[]) =>
  withKeys(labels.map((label) => ({ _type: "cta", label, href: "#" })));

const homepage = {
  _id: "homepage",
  _type: "page",
  title: "RFL Wealth Management",
  slug: { _type: "slug", current: "/" },
  isHomepage: true,
  sections: withKeys([
    {
      _type: "heroSection",
      eyebrow: c.hero.eyebrow,
      headline: c.hero.headline,
      headlineAlt: c.hero.headlineAlt,
      lede: c.hero.lede,
      primaryCta: { _type: "cta", ...c.hero.primaryCta },
      primaryNote: c.hero.primaryNote,
      secondaryCta: { _type: "cta", ...c.hero.secondaryCta },
      chip: c.hero.chip,
    },
    {
      _type: "questionGridSection",
      eyebrow: c.questions.eyebrow,
      heading: c.questions.heading,
      side: c.questions.side,
      cards: withKeys(c.questions.cards.map((x) => ({ ...x, href: "#" }))),
      footLink: { _type: "cta", ...c.questions.footLink },
    },
    {
      _type: "checkupBandSection",
      eyebrow: c.checkup.eyebrow,
      heading: c.checkup.heading,
      lede: c.checkup.lede,
      cta: { _type: "cta", ...c.checkup.cta },
      note: c.checkup.note,
      scanTitle: c.checkup.scanTitle,
      scanBadge: c.checkup.scanBadge,
      rows: withKeys(c.checkup.rows),
    },
    {
      _type: "featureProductSection",
      eyebrow: c.book.eyebrow,
      heading: c.book.heading,
      lede: c.book.lede,
      bullets: [...c.book.bullets],
      cta: { _type: "cta", ...c.book.cta },
      note: c.book.note,
      cover: c.book.cover,
    },
    {
      _type: "stageStepsSection",
      eyebrow: c.works.eyebrow,
      heading: c.works.heading,
      side: c.works.side,
      stages: withKeys(c.works.stages),
      footLink: { _type: "cta", ...c.works.footLink },
    },
    {
      _type: "storyFeatureSection",
      eyebrow: c.story.eyebrow,
      heading: c.story.heading,
      quote: c.story.quote,
      name: c.story.name,
      meta: c.story.meta,
      initials: c.story.initials,
      facts: withKeys(c.story.facts),
      footLink: { _type: "cta", ...c.story.footLink },
    },
    {
      _type: "differenceGridSection",
      eyebrow: c.difference.eyebrow,
      heading: c.difference.heading,
      side: c.difference.side,
      items: withKeys(c.difference.items),
      cta: { _type: "cta", ...c.difference.cta },
    },
    {
      _type: "teamGridSection",
      eyebrow: c.team.eyebrow,
      heading: c.team.heading,
      side: c.team.side,
      members: withKeys(c.team.members),
      footLink: { _type: "cta", ...c.team.footLink },
    },
    {
      _type: "insightsGridSection",
      eyebrow: c.insights.eyebrow,
      heading: c.insights.heading,
      side: c.insights.side,
      cards: withKeys(c.insights.cards.map((x) => ({ ...x, href: "#" }))),
      wide: { ...c.insights.wide, href: "#" },
      footLink: { _type: "cta", ...c.insights.footLink },
    },
    {
      _type: "dualPathCtaSection",
      eyebrow: c.final.eyebrow,
      heading: c.final.heading,
      paths: withKeys(
        c.final.paths.map((p) => ({
          kind: p.kind,
          title: p.title,
          body: p.body,
          cta: { _type: "cta", ...p.cta },
          variant: p.variant,
        })),
      ),
    },
  ]),
  // `seo` is deliberately not seeded. The field is the sanity-plugin-seofields
  // `seoFields` type, whose internal shape is owned by the plugin — writing
  // a hand-built object risks producing a document the plugin's UI can't read.
  // Fill it in the Studio, where the plugin's scoring and previews apply.
};

const settings = {
  _id: "siteSettings",
  _type: "siteSettings",
  navItems: withKeys(c.nav.items.map((i) => ({ ...i, children: [] }))),
  navCta: { _type: "cta", ...c.nav.cta },
  footerBlurb: c.footer.blurb,
  footerColumns: withKeys(
    c.footer.columns.map((col) => ({
      title: col.title,
      links: linkList(col.links),
    })),
  ),
  newsletter: c.footer.newsletter,
  legalLinks: linkList(c.footer.legal),
  copyright: c.footer.copyright,
  disclaimer: c.footer.note,
};

/**
 * `title` is set only when the document is first created, then never touched
 * again — renaming a page in the Studio must survive a re-seed. Everything
 * else is patched; image and file fields are never included in `fields`.
 */
async function upsert(doc: Record<string, unknown> & { _id: string }) {
  const { _id, _type, title, ...fields } = doc;
  await client.createIfNotExists({ _id, _type: _type as string, title });
  await client.patch(_id).set(fields).commit();
  return _id;
}

/**
 * Drop any draft first. Sanity shows the draft in preference to the published
 * document, so a draft created before this seed would still render as empty in
 * the Studio — and publishing it would wipe what we just wrote.
 */
async function clearDraft(id: string) {
  const draftId = `drafts.${id}`;
  const exists = await client.fetch<string | null>(`*[_id == $id][0]._id`, {
    id: draftId,
  });
  if (exists) {
    await client.delete(draftId);
    return draftId;
  }
  return null;
}

const cleared = (
  await Promise.all([clearDraft("homepage"), clearDraft("siteSettings")])
).filter(Boolean);
if (cleared.length) {
  console.log(`Removed stale drafts: ${cleared.join(", ")}`);
}

const results = await Promise.all([upsert(homepage), upsert(settings)]);
console.log(`Seeded: ${results.join(", ")}`);
console.log(`→ https://localhost:3100/studio`);
