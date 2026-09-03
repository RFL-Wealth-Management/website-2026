/**
 * Seeds repo-authored content from lib/content/ into Sanity.
 *
 *   npm run seed                     list the targets, write nothing
 *   npm run seed -- homepage         write exactly one document
 *   npm run seed -- page-am-i-paying-too-much-tax
 *   npm run seed -- --all            write everything (fresh dataset only)
 *   npm run seed -- <target> --dry   show the plan without writing
 *
 * NOT safe to re-run blindly, which is why a bare run refuses. Each target it
 * writes is REPLACED from lib/content/ — the whole `sections` array, including
 * images uploaded into a section and hrefs edited in the Studio. Only `title`
 * survives (set on create, never patched again).
 *
 * So: the content files are the source of truth for any document you name.
 * Edit lib/content/, then seed that one target. Never seed a document whose
 * current state in the Studio is newer than the repo.
 *
 * Drafts are left alone unless you pass --clear-drafts; the script stops rather
 * than write under a draft the Studio would keep showing you instead.
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
 * again — renaming a page in the Studio must survive a re-seed.
 *
 * Everything else in `fields` is REPLACED, not merged. That includes the whole
 * `sections` array — so any image uploaded into a section, any href edited in
 * the Studio, and any section reordering is overwritten by whatever the
 * lib/content/ file says. (The old comment here claimed "image fields are never
 * touched"; that only ever held for *top-level* image fields, of which there
 * are none. Images live inside sections.)
 *
 * This is why the seed is targeted: never write a document you did not name.
 */
async function upsert(doc: Record<string, unknown> & { _id: string }) {
  const { _id, _type, title, ...fields } = doc;
  await client.createIfNotExists({ _id, _type: _type as string, title });
  await client.patch(_id).set(fields).commit();
  return _id;
}

/** Create the document if it is missing, but never overwrite an existing one. */
async function ensure(doc: Record<string, unknown> & { _id: string }) {
  const { _id, _type, title } = doc;
  await client.createIfNotExists({ _id, _type: _type as string, title });
  return _id;
}

async function draftExists(id: string) {
  const found = await client.fetch<string | null>(`*[_id == $id][0]._id`, {
    id: `drafts.${id}`,
  });
  return Boolean(found);
}

/**
 * Every seedable document, by target name. `deps` are documents a target
 * references: they must exist before the target lands (Sanity rejects a
 * reference to a missing document), but they are only *created* if absent —
 * seeding a page never rewrites the FAQ blocks or the group it points at.
 */
const registry = {
  homepage: { doc: homepage, deps: [] },
  settings: { doc: settings, deps: [] },
  "faq-physician-tax": { doc: faqDoc(physicianTaxFaqs), deps: [] },
  "faq-medical-corporation": { doc: faqDoc(medicalCorporationFaqs), deps: [] },
  [hub.group.id]: { doc: questionsGroup, deps: [] },
  [hub.meta.id]: { doc: questionsHub, deps: [questionsGroup] },
  [tax.meta.id]: {
    doc: taxPage,
    deps: [questionsGroup, faqDoc(physicianTaxFaqs)],
  },
  [corporation.meta.id]: {
    doc: corporationPage,
    deps: [questionsGroup, faqDoc(medicalCorporationFaqs)],
  },
} satisfies Record<
  string,
  { doc: Record<string, unknown> & { _id: string }; deps: { _id: string }[] }
>;

type Target = keyof typeof registry;

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const named = args.filter((a) => !a.startsWith("--"));

const usage = () => {
  console.log("Usage: npm run seed -- <target> [target…] [--all] [--dry] [--clear-drafts]\n");
  console.log("Targets:");
  for (const t of Object.keys(registry)) console.log(`  ${t}`);
  console.log("\n  --all           write every target (fresh dataset only)");
  console.log("  --dry           print what would be written, write nothing");
  console.log("  --clear-drafts  delete drafts of the targeted documents first");
};

if (flags.has("--help") || (!named.length && !flags.has("--all"))) {
  usage();
  if (!flags.has("--help")) {
    console.error(
      "\nRefusing to write: name the documents to seed.\n" +
        "A bare `npm run seed` used to rewrite every page from lib/content/,\n" +
        "clobbering anything edited in the Studio.",
    );
    process.exit(1);
  }
  process.exit(0);
}

const unknown = named.filter((n) => !(n in registry));
if (unknown.length) {
  console.error(`Unknown target(s): ${unknown.join(", ")}\n`);
  usage();
  process.exit(1);
}

const targets = (
  flags.has("--all") ? (Object.keys(registry) as Target[]) : (named as Target[])
).filter((t, i, all) => all.indexOf(t) === i);

// Dependencies of the targeted documents, minus any that are themselves targeted.
const targetIds = new Set(targets.map((t) => registry[t].doc._id));
const deps = targets
  .flatMap((t) => registry[t].deps)
  .filter((d) => !targetIds.has(d._id))
  .filter((d, i, all) => all.findIndex((o) => o._id === d._id) === i);

console.log(`Writing: ${targets.map((t) => registry[t].doc._id).join(", ")}`);
if (deps.length) {
  console.log(`Ensuring exists (not overwritten): ${deps.map((d) => d._id).join(", ")}`);
}

if (flags.has("--dry")) {
  console.log("\n--dry: nothing written.");
  process.exit(0);
}

// Sanity shows a draft in preference to the published document, so a stale
// draft would still render as empty in the Studio — and publishing it would
// wipe what we just wrote. But a draft may equally be unpublished work worth
// keeping, so deleting one is opt-in and scoped to the targeted documents.
const drafts = (
  await Promise.all(
    [...targetIds].map(async (id) => ((await draftExists(id)) ? id : null)),
  )
).filter((id): id is string => Boolean(id));

if (drafts.length) {
  if (flags.has("--clear-drafts")) {
    await Promise.all(drafts.map((id) => client.delete(`drafts.${id}`)));
    console.log(`Removed drafts: ${drafts.join(", ")}`);
  } else {
    console.error(
      `\nRefusing to write: unpublished drafts exist for ${drafts.join(", ")}.\n` +
        "The Studio shows the draft, not what this script writes, so the seed\n" +
        "would look like it did nothing — and publishing the draft would undo it.\n" +
        "Publish or discard them in the Studio, or re-run with --clear-drafts.",
    );
    process.exit(1);
  }
}

// Referenced documents first.
await Promise.all(deps.map(ensure));
const written = await Promise.all(targets.map((t) => upsert(registry[t].doc)));

console.log(`\nSeeded: ${written.join(", ")}`);
console.log(`→ http://localhost:3100/studio`);
