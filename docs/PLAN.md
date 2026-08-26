# RFL Wealth Management — Website Architecture Plan

**Stack:** Next.js (App Router, TypeScript) · Tailwind CSS · Sanity.io · Netlify
**Approach:** Mobile-first. Agent-authorable content. Locked page templates with per-section layout variants. Live visual editing.
**Status:** Plan — not yet implemented. Repo is empty except this document.

---

## 1. Decisions already locked

| Decision | Choice |
|---|---|
| Hosting | Netlify. Namecheap migration deferred — revisit before launch. |
| Content authoring | Claude Code edits content files in this repo, then a publish step pushes to Sanity. |
| Page layouts | Multiple **locked templates**, picked from a visual list. Changeable after creation. Sections carry their own layout variants for flexibility. |
| Analytics consent | Non-essential tags are consent-gated. |
| Editing experience | Live visual editing — editors see the real page while they edit it. |

### Deferred, with a note

**Namecheap.** This plan assumes a Node runtime. If the eventual Namecheap product is shared cPanel hosting, the site must become a static export — which removes API routes (the form webhook proxy and reCAPTCHA verification both live there), removes draft preview, and **removes live visual editing entirely** (see §5, it depends on server-rendered draft mode). Nothing here blocks the move, but that feature set would be lost. Decide before launch, not after.

---

## 2. Design system — porting the mockup

The mockup (`rfl-homepage-mockup.html`) is already a token system. It ports directly.

### Tokens

Every `:root` custom property becomes a Tailwind theme token. No re-eyeballing of colours.

```
navy #1E3256 · teal #16877D · seafoam #7CCFB5 · cream #FCFAF5
stone #E8E3DA · camel #C49676 · sand #EED3B4 · ink #22314E · ink-soft #4E5B74
```

Type: **Fraunces** (display serif, weights 380/500/600 + italic) and **Inter** (400/500/600), loaded via `next/font` — self-hosted, so no render-blocking request to Google and no layout shift.

Radius `18px`, container max-width `1180px`, gutter `32px`.

### Mobile-first inversion

The mockup is **desktop-first** — it uses `@media (max-width:1020px)`, `(max-width:840px)`, `(max-width:600px)`. The Tailwind rebuild inverts this: the phone layout is the base, and `md:` / `lg:` add the multi-column grids. Sections must be authored in that order, not ported literally then patched.

### Primitives to extract

`Container` · `Eyebrow` (with its 26px rule) · `Heading` (display/section) · `Lede` · `Micro` · `Button` (seafoam/navy/white, arrow-slide on hover) · `LinkArrow` · `Reveal` (IntersectionObserver, honours `prefers-reduced-motion`) · `OnDark` context.

The `.on-dark` pattern is a context switch, not a set of overrides. Model it as React context or a `data-theme` attribute so nested components pick up the right colours automatically instead of every dark section re-declaring them.

### Accessibility baseline

- `:focus-visible` outlines already defined in the mockup — keep them, do not reset.
- `prefers-reduced-motion` disables reveals and transitions.
- Decorative owl watermarks stay `aria-hidden`.
- Target WCAG 2.1 AA. Verify seafoam-on-navy and teal-on-white contrast during the port.

---

## 3. Content model (Sanity)

### Document types

**Content**
- `page` — regular pages. Homepage pinned as a singleton, ordered first in the Studio.
- `event`
- `landingPage`
- `post`
- `podcastEpisode`
- `teamMember`
- `contest`

**Hubs** (singletons)
- `postsHub` · `podcastHub` · `contestHub`
- `insightsHub` — hub of hubs. Pulls latest or manually-highlighted items across posts, podcasts, contests, videos and guides. Each row supports **automatic** (most recent N) or **curated** (explicit references), because the mockup copy commits to *"a curated mix — not an automatic blog feed."*

**System**
- `form` · `wizard` · `libraryDoc` · `navigation` · `siteSettings` · `analyticsSettings` · `redirect`

### Shared objects

- `seo` — on every main document (§9)
- `link` — discriminated union: internal reference / external URL / anchor / file download
- `cta` — label + link + button style
- `section` — the page-builder block union (§4)

### Slugs and routing

| Type | Route |
|---|---|
| page | `/[slug]` (homepage → `/`) |
| landingPage | `/lp/[slug]` |
| event | `/events/[slug]` |
| post | `/insights/articles/[slug]` |
| podcastEpisode | `/insights/podcast/[slug]` |
| contest | `/contests/[slug]` |
| teamMember | `/about/team/[slug]` |
| hubs | `/insights`, `/insights/articles`, `/insights/podcast`, `/contests` |

Landing pages sit under `/lp/` so they're trivially excludable from sitemap and navigation, and a campaign page can never collide with a real content slug.

---

## 4. Sections and templates

The core of the "pick a layout, then let the agent fill it" workflow. Two levels.

### Level 1 — Page template (locked)

Templates are **code-defined**, not documents. Each lives in `lib/templates/` and declares:

```
id, label, previewImage, appliesTo: ['landingPage' | 'event' | 'page'],
navbarVariant, showFooter,
sections: [ { _type, variant, ...defaults } ]
```

In the Studio the template field renders as a **grid of preview thumbnails** (custom input component), not a dropdown — you see the layouts and click one. Preview images live in `public/templates/`.

**Changing template after creation.** A Studio document action, "Apply template", diffs current sections against the target:

- types present in both → **content preserved**
- types only in the new template → added empty
- types only in the old → moved to `archivedSections`, not deleted

This diff is what makes locked templates safe to switch. Without it, switching silently destroys written copy.

### Level 2 — Section variants

Every section has a `variant` field — its own individual layout. This is where the flexibility lives.

Example: `hero` variants → `split-media-right` (the mockup homepage), `split-media-left`, `centered`, `full-bleed-image`, `minimal-navy`.

### Section library (derived from the mockup)

| Section | From mockup | Variants (initial) |
|---|---|---|
| `hero` | header + hero | split-right, split-left, centered, full-bleed |
| `questionGrid` | Financial Questions | 3-col, 2-col, list |
| `checkupBand` | Checkup teal band | media-right, media-left, centered-cta |
| `featureProduct` | Tax Free MD | book-left, book-right, cover-only |
| `stageSteps` | How RFL Works | 4-col numbered, vertical timeline |
| `storyFeature` | Physician Story | photo-left, photo-right, quote-only |
| `differenceGrid` | Why RFL Is Different | 2-col checks, 3-col, comparison table |
| `teamGrid` | Team | 4-col, 3-col, single-featured |
| `insightsGrid` | Insights | mixed (with wide card), uniform, carousel |
| `dualPathCta` | Final Conversion | two-path, single-cta, banner |
| `richText` | — | narrow, wide, two-col |
| `mediaText` | — | image-left, image-right, video |
| `faq` | — | accordion, two-col |
| `formSection` | — | inline, card, split-with-copy |
| `wizardSection` | Checkup (net-new) | embedded, full-page |
| `eventDetails` | — | date, location, agenda, speakers, register |
| `logoStrip` / `statBand` | — | — |

Sections render through one `<SectionRenderer>` mapping `_type` → component. Adding a section = schema + component + one map entry. Nothing else changes.

---

## 5. Live visual editing

Editors should see what they're editing on the real page. Sanity's **Presentation tool** provides this, and it's the reason several other decisions in this plan lean the way they do.

### What it gives you

- **Side-by-side.** The Studio shows the live site in an iframe next to the editing form.
- **Click-to-edit.** Click any text on the previewed page and the Studio jumps straight to that field. This works through *stega encoding* — invisible metadata embedded in content strings that identifies the document and field each string came from.
- **Live updates.** Edits appear in the preview as you type, without saving, publishing or refreshing.
- **Draft preview.** Unpublished drafts render on the real page in real layout — which is what makes the repo-authored draft workflow in §11 actually reviewable.

### What it requires

- `next-sanity` with the Live Content API and `@sanity/visual-editing` overlays.
- A draft-mode route that enables preview for authenticated Studio sessions only.
- **Server rendering.** This is the hard dependency behind the Namecheap warning in §1 — a static export cannot do live visual editing.

### Two things to get right

**Stega must be stripped outside preview.** Stega-encoded strings contain invisible characters. If they leak into production they corrupt `metaTitle` tags, `alt` text, JSON-LD and anything compared as a string. Encoding stays on only in draft mode.

**Overlays only render for authenticated editors.** Public visitors get the clean page with no edit affordances and no preview bundle.

### Interaction with templates and sections

Because the page is composed of discrete sections, the Presentation tool can offer section-level affordances — click a section in the preview to jump to that section's fields, and reorder sections while watching the page reflow. This makes the "pick a layout, then fill it" loop visual end to end: choose a template thumbnail, watch the sections appear, click into each one on the live page.

Build this in **Phase 2**, alongside the first Sanity-rendered page — retrofitting visual editing means revisiting every data fetch, so it's much cheaper to establish the fetch pattern once, correctly, at the start.

---

## 6. Forms

### Schema (`form` document)

```
title
fields[]           → array of field objects; order = array order (drag to reorder)
submitLabel
endBehavior        → discriminated union, below
recaptcha          → boolean, default true
zohoWebhook        → a secret KEY, not a raw URL (see below)
notificationEmail  → optional
```

**Field types:** `text` · `email` · `phone` · `select` · `textarea` · `checkbox` · `radio` · `consent` · `hidden`

Each field carries `name` (the key sent to Zoho — immutable once live), `label`, `placeholder`, `helpText`, `required`, `options[]`, `width` (full/half).

You want to tell the agent the fields, have it build the form, then edit labels and order yourself. That works because `name` and `label` are separate concerns: the agent sets both, you freely retitle labels and drag to reorder, and the Zoho payload keys never shift underneath you.

### Three end behaviours

One union field, so exactly one is configured:

1. **`inlineMessage`** — hide form, show success message for `durationSeconds`, then restore the form.
2. **`redirect`** — internal reference or external URL.
3. **`modal`** — popup with rich content and optional CTA.

The wizard reuses this identical union, so the behaviour is written once.

### Submission pipeline

```
Client form  →  POST /api/forms/[formId]
                  ├─ honeypot + timing check
                  ├─ rate limit by IP
                  ├─ verify reCAPTCHA v3 server-side
                  ├─ load form doc from Sanity (server-side)
                  ├─ validate submitted fields against the schema
                  ├─ POST normalized payload → Zoho Flow webhook
                  └─ return { endBehavior } to the client
```

**The webhook URL never reaches the browser.** Sanity stores a key (e.g. `contact-general`); the real URL lives in a Netlify environment variable. A webhook URL stored as a plain string in a public dataset is a public endpoint anyone can flood into your Zoho Flow.

reCAPTCHA v3 loads only on pages that contain a form, not site-wide.

---

## 7. Special components — the 5-step wizard

The mockup's Physician Financial Checkup section is only the **pitch** (CTA plus a sample results card). The wizard itself is net-new.

### `wizard` document

```
title, slug, introCopy
steps[]        → 5 steps, each: title, questions[]
questions[]    → id, label, type (radio/select/scale/checkbox), options[] with weights
categories[]   → result rows: Tax efficiency, Corporation structure, Investments,
                 Risk protection, Retirement readiness, Estate planning,
                 Implementation & coordination
scoring        → maps answers to per-category status
resultsCopy    → per-category copy for "reviewed" vs "gap found"
endBehavior    → same union as forms
```

### Behaviour

- Progress indicator, back/next, one step per screen on mobile.
- Answers persisted to `localStorage` so a refresh doesn't lose progress.
- Results render on screen immediately — matching *"Immediate results. No meeting required."*
- Email capture offered to send results, not required to see them — matching *"results on screen, email them to yourself."*
- Keyboard navigable; each step a `fieldset` with `legend`; step changes announced to screen readers.
- Submits through the same `/api/forms` pipeline.

The `scoring` layer is where domain knowledge decides the product — which answer combinations are a real gap versus a soft flag is a financial-planning judgement, not an engineering one. Flagged for your input at build time.

Built generically so future multi-step tools reuse the engine.

---

## 8. Document library

`libraryDoc` wraps an uploaded file:

```
title, description, file (asset), category, audience,
thumbnail, gated (boolean), gateForm (ref → form),
publishedAt, featured
```

**Two surfaces:**

- **Studio** — a custom structure pane listing every document with filters by category and gated status, so the whole library is visible at a glance instead of buried in assets.
- **Front end** — an optional `/resources` page; library documents are also selectable as link targets anywhere a CTA appears.

Gated documents route through a form and the file URL is issued only after submission, so the asset isn't guessable from page source.

---

## 9. Analytics and consent

### `analyticsSettings` singleton

An array of tag objects:

```
provider    → ga4 | gtm | metaPixel | luckyOrange | linkedIn | custom
id          → measurement / container / pixel ID
category    → essential | analytics | marketing
enabled     → boolean
environment → production only | all
placement   → head | body-end
customCode  → only when provider is custom
```

Adding a tracker becomes a content edit, not a deploy.

### Consent gate

- Banner with accept / reject / manage, categories explained.
- Non-essential tags mount **only after opt-in**. Essential tags always load.
- Google Consent Mode v2 signals so GA4 behaves correctly pre-consent.
- Choice stored in a first-party cookie with expiry; a footer link reopens preferences.
- **Lucky Orange input masking on by default** — it records sessions, and physicians will be typing income and corporate details into these forms.

### Per-page control

Landing pages and events can disable tracking entirely or fire an extra conversion event via an optional `analyticsOverride`.

---

## 10. SEO

### Shared `seo` object on every main document

```
metaTitle, metaDescription, canonicalUrl, ogImage,
noIndex, noFollow, structuredDataType
```

**Sanity plugin.** Established SEO plugins for Sanity add an in-Studio analysis pane (SERP preview, field-length warnings). I'll verify which is currently maintained and compatible with the Sanity version we install before committing — rather than name one here that may be stale. If none is healthy, the `seo` object plus a small custom preview pane covers the same ground with no dependency risk.

### Next.js side

- `generateMetadata` per route, falling back to `siteSettings` defaults.
- JSON-LD per type: `Article`, `PodcastEpisode`, `Event`, `Person`, `FAQPage`, `Organization`.
- `app/sitemap.ts` generated from Sanity, excluding `noIndex` docs and `/lp/*`.
- `app/robots.ts`.
- `next/image` throughout via Sanity's image pipeline with responsive `sizes`.
- `redirect` documents feed Netlify redirects so slug changes don't drop rankings.
- Stega encoding stripped in production (§5) so metadata strings stay clean.

---

## 11. Repo-authored content workflow

Claude Code creates and edits content in this repo, then publishes.

```
/content
  /pages/*.ts
  /events/*.ts
  /landing-pages/*.ts
  /posts/*.ts
  ...
```

Each file is a typed object validated against the Sanity schema **before** anything is sent.

```
npm run content:validate   → type + schema check, no network
npm run content:push       → writes to Sanity as drafts
npm run content:pull       → pulls the dataset back into /content
```

### Three things this design has to get right

**Pushes must not destroy your images.** You add images in the Studio. If push used `createOrReplace`, the next push would wipe every asset reference you set. So push uses `createIfNotExists` then an explicit field `patch` touching only fields present in the content file. Image and file fields are never patched unless the content file explicitly sets them.

**Push writes drafts, not published documents.** Content lands as a draft; you review it in the Presentation tool — real layout, real images, live page (§5) — then hit Publish. That matches "create in the repo, then publish it," and means an agent can never push live copy without you seeing it first.

**Drift.** Heavy Studio editing makes the repo copy stale. `content:pull` re-syncs. Proposed convention: the repo is the source for *new* content and bulk edits; the Studio is the source for tweaks and images. Pull before any large agent-authored change.

---

## 12. Build phases

| Phase | Scope |
|---|---|
| **0** | Next.js + TypeScript + Tailwind scaffold, tokens, fonts, Netlify pipeline, Sanity project, embedded Studio at `/studio` |
| **1** | Design-system primitives, mobile-first: buttons, type, reveal, on-dark context |
| **2** | Core schemas (`page`, `seo`, `siteSettings`, section union), homepage rendered from Sanity matching the mockup, **plus live visual editing / Presentation tool** |
| **3** | Full section library + variants + template system + Studio thumbnail picker + "Apply template" action |
| **4** | Forms: schema, renderer, API route, reCAPTCHA, Zoho Flow, three end behaviours |
| **5** | Wizard engine + Physician Financial Checkup content |
| **6** | Posts, Podcast, Contests, team + their hubs + Insights hub-of-hubs |
| **7** | Document library + gated downloads |
| **8** | Analytics settings + consent gate |
| **9** | SEO completion, JSON-LD, sitemap, a11y audit, performance pass |
| **10** | Navigation UI (schema already in place from phase 2) |

Ordering notes: visual editing belongs in phase 2 because retrofitting it means revisiting every data fetch. Phases 4 and 5 share the end-behaviour union — build 4 first.

---

## 13. Navigation (schema now, UI later)

Not needed initially, but schema is built up front so pages can reference it without a later migration.

```
navigation document:
  title, logo (image + link), variant (transparent-on-dark | solid | minimal)
  items[]  → label, link, children[]   ← submenus
  ctas[]   → label, link, style
```

Each nav item has `children[]` — **submenus are in the schema from day one**, as you flagged. Visual treatment (dropdown, mega-menu, mobile accordion) is a later decision; the data shape won't change when we make it.

Every page / landing / event gets:

- `navigationOverride` → reference to a specific navbar
- `hideNavigation` → boolean, for distraction-free landing pages

Both fall back to the site default when unset.

---

## 14. Open items

- **Namecheap target** — decide before launch (§1). Affects forms, preview and live editing.
- **Submenu visual treatment** — data shape settled, look is not.
- **Wizard scoring rules** — needs your domain input (§7).
- **Real content** — mockup contains placeholder physician story, team and testimonials pending permissions.
- **Photography** — all image areas marked for in-house shoots.
- **Sanity plan** — dataset count and API request volume; the free tier may suffice initially, but the Live Content API used for visual editing has its own request characteristics worth checking.
