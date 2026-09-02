/**
 * Seeds the site's repo-authored content into Sanity from lib/content/.
 *
 *   npm run seed
 *
 * Writes: the homepage, site settings, the Financial Questions group and its
 * three pages, and the two reusable FAQ documents those pages reference.
 *
 * Safe to re-run. Uses createIfNotExists + a targeted patch rather than
 * createOrReplace, so images and edits made in the Studio survive a re-seed.
 * Only the fields listed below are overwritten; image fields are never touched.
 *
 * One thing it does clobber: `navItems`. Nav edits made in the Studio are
 * overwritten by whatever lib/content/homepage.ts says. Change the content
 * file, not the Studio, if you want a nav change to survive.
 */

import { createClient } from "@sanity/client";

import { physicianTaxFaqs, medicalCorporationFaqs } from "../lib/content/faqs.ts";
import * as c from "../lib/content/homepage.ts";
import * as corporation from "../lib/content/questions/corporation.ts";
import * as hub from "../lib/content/questions/hub.ts";
import * as tax from "../lib/content/questions/tax.ts";

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
      cards: withKeys(c.questions.cards),
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
      _type: "gridSection",
      eyebrow: c.team.eyebrow,
      heading: c.team.heading,
      side: c.team.side,
      bodyLabel: c.team.bodyLabel,
      items: withKeys(c.team.items),
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
  navItems: withKeys(
    c.nav.items.map((i) => ({ ...i, children: withKeys(i.children ?? []) })),
  ),
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

/* ---------------------------------------------------------------------------
   Financial Questions

   Section builders, because the three pages in this group share most of their
   spine and differ only in copy. Each returns the object shape the matching
   schema in sanity/schemas/objects/sections/ expects.
--------------------------------------------------------------------------- */

type Link = { label: string; href: string };
const cta = (link: Link) => ({ _type: "cta", ...link });

/**
 * The shape a question-page content module exports.
 *
 * Named here rather than inferred with `typeof tax`, so corporation.ts is
 * checked against the contract instead of being cast into it — the two files
 * name their middle section differently (`leaks` vs `structure`), which is why
 * it is passed in separately.
 */
type QuestionPageModule = {
  meta: { id: string; title: string; slug: string };
  hero: typeof tax.hero;
  signs: typeof tax.signs;
  checkup: typeof tax.checkup;
  book: typeof tax.book;
  story: typeof tax.story;
  faq: typeof tax.faq;
  others: QuestionGridContent;
  final: typeof tax.final;
};

type QuestionGridContent = {
  eyebrow: string;
  heading: string;
  side: string;
  cards: readonly { q: string; tag: string; href: string }[];
  footLink: Link;
};

/**
 * Explicit background colours, set only where the component fallbacks would
 * otherwise put two same-toned sections next to each other. Everything else
 * inherits its fallback, so the page keeps alternating without an editor
 * having to maintain the rhythm by hand.
 */
const stone = { _type: "background", color: "stone" };

const heroSection = (h: typeof tax.hero) => ({
  _type: "heroSection",
  eyebrow: h.eyebrow,
  headline: h.headline,
  headlineAlt: h.headlineAlt,
  lede: h.lede,
  primaryCta: cta(h.primaryCta),
  primaryNote: h.primaryNote,
  secondaryCta: cta(h.secondaryCta),
  chip: h.chip,
});

const differenceSection = (d: typeof tax.signs) => ({
  _type: "differenceGridSection",
  eyebrow: d.eyebrow,
  heading: d.heading,
  side: d.side,
  items: withKeys(d.items),
  cta: cta(d.cta),
});

const stageSection = (st: typeof tax.leaks) => ({
  _type: "stageStepsSection",
  background: stone,
  eyebrow: st.eyebrow,
  heading: st.heading,
  side: st.side,
  stages: withKeys(st.stages),
  footLink: cta(st.footLink),
});

const checkupSection = (k: typeof tax.checkup) => ({
  _type: "checkupBandSection",
  eyebrow: k.eyebrow,
  heading: k.heading,
  lede: k.lede,
  cta: cta(k.cta),
  note: k.note,
  scanTitle: k.scanTitle,
  scanBadge: k.scanBadge,
  rows: withKeys(k.rows),
});

const bookSection = (b: typeof tax.book) => ({
  _type: "featureProductSection",
  eyebrow: b.eyebrow,
  heading: b.heading,
  lede: b.lede,
  bullets: [...b.bullets],
  cta: cta(b.cta),
  note: b.note,
  cover: b.cover,
});

const storySection = (st: typeof tax.story) => ({
  _type: "storyFeatureSection",
  eyebrow: st.eyebrow,
  heading: st.heading,
  quote: st.quote,
  name: st.name,
  meta: st.meta,
  initials: st.initials,
  facts: withKeys(st.facts),
  footLink: cta(st.footLink),
});

/** The section is a pointer; the questions live in their own document. */
const faqSection = (f: typeof tax.faq) => ({
  _type: "faqSection",
  eyebrow: f.eyebrow,
  heading: f.heading,
  side: f.side,
  faq: { _type: "reference", _ref: f.faqId },
});

const questionGridSection = (
  q: QuestionGridContent,
  background?: typeof stone,
) => ({
  _type: "questionGridSection",
  ...(background ? { background } : {}),
  eyebrow: q.eyebrow,
  heading: q.heading,
  side: q.side,
  cards: withKeys(q.cards),
  footLink: cta(q.footLink),
});

const dualPathSection = (f: typeof tax.final) => ({
  _type: "dualPathCtaSection",
  eyebrow: f.eyebrow,
  heading: f.heading,
  paths: withKeys(
    f.paths.map((p) => ({
      kind: p.kind,
      title: p.title,
      body: p.body,
      cta: cta(p.cta),
      variant: p.variant,
    })),
  ),
});

const faqDoc = (f: typeof physicianTaxFaqs) => ({
  _id: f.id,
  _type: "faq",
  title: f.title,
  description: f.description,
  items: withKeys(
    f.items.map((item) => ({
      _type: "faqItem",
      question: item.question,
      answer: item.answer,
      ...(item.cta ? { cta: cta(item.cta) } : {}),
    })),
  ),
});

const questionsGroup = {
  _id: hub.group.id,
  _type: "pageGroup",
  title: hub.group.title,
  slug: { _type: "slug", current: hub.group.slug },
  description: hub.group.description,
  order: hub.group.order,
};

const groupRef = { _type: "reference", _ref: hub.group.id };

/** The group landing page — short, and there to route people onward. */
const questionsHub = {
  _id: hub.meta.id,
  _type: "page",
  title: hub.meta.title,
  slug: { _type: "slug", current: hub.meta.slug },
  group: groupRef,
  isGroupIndex: true,
  sections: withKeys([
    heroSection(hub.hero),
    questionGridSection(hub.questions),
    checkupSection(hub.checkup),
    dualPathSection(hub.final),
  ]),
};

/**
 * Both question pages run the same spine: hero → the signs → the mechanism →
 * checkup → book → story → FAQ → the other questions → closing CTA.
 */
const questionPage = (
  q: QuestionPageModule,
  stages: typeof tax.leaks,
) => ({
  _id: q.meta.id,
  _type: "page",
  title: q.meta.title,
  slug: { _type: "slug", current: q.meta.slug },
  group: groupRef,
  isGroupIndex: false,
  sections: withKeys([
    heroSection(q.hero),
    differenceSection(q.signs),
    stageSection(stages),
    checkupSection(q.checkup),
    bookSection(q.book),
    storySection(q.story),
    faqSection(q.faq),
    questionGridSection(q.others, stone),
    dualPathSection(q.final),
  ]),
});

const taxPage = questionPage(tax, tax.leaks);
const corporationPage = questionPage(corporation, corporation.structure);

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

const blocks = [faqDoc(physicianTaxFaqs), faqDoc(medicalCorporationFaqs)];
const pages = [homepage, settings, questionsHub, taxPage, corporationPage];

const cleared = (
  await Promise.all(
    [...blocks, ...pages, questionsGroup].map((d) => clearDraft(d._id)),
  )
).filter(Boolean);
if (cleared.length) {
  console.log(`Removed stale drafts: ${cleared.join(", ")}`);
}

// Referenced documents first. Sanity rejects a reference to a document that
// does not exist yet, so the FAQ blocks and the page group have to land before
// the pages that point at them.
await Promise.all([...blocks.map(upsert), upsert(questionsGroup)]);

const results = await Promise.all(pages.map(upsert));
console.log(`Seeded: ${[...blocks, questionsGroup].length} blocks + ${results.join(", ")}`);
console.log(`→ https://localhost:3100/studio`);
