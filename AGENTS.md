<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# RFL Wealth Management — website

Marketing site for Canadian physicians. Next.js 16 (App Router, Turbopack) ·
Tailwind v4 · Sanity 6 · deployed on Netlify.

- **Architecture spec:** `docs/PLAN.md`
- **Build plan (phases):** `~/.claude/plans/make-a-plan-for-golden-lampson.md`
- **Design source:** `~/Downloads/rfl-homepage-mockup.html`

## Non-negotiables

**Mobile-first.** The mockup is desktop-first (`@media (max-width: …)`). Never
port those queries literally. Author the phone layout as the base and use
`md:` / `lg:` to add columns.

**Design tokens only.** Every colour, radius and font lives in the `@theme`
block in `app/globals.css`. Do not hardcode hex values in components.

**Dark sections use the context, not overrides.** A dark section sets
`data-theme="dark"`; descendants opt in with the `on-dark:` variant
(e.g. `text-ink on-dark:text-dark-lede`). Do not re-declare colours per section.

**Keep the focus styles.** `app/globals.css` carries the mockup's
`:focus-visible` treatment deliberately. Do not reset it.

## Gotchas already hit

**Never import `sanity.config.ts` from a Server Component.** Under the
`react-server` export condition, Turbopack resolves Sanity's transitive deps
(notably `swr`) to RSC builds missing the default exports Studio needs, and the
build fails. The config is imported only by `app/studio/[[...tool]]/Studio.tsx`,
which is a Client Component. `page.tsx` stays server-side for metadata.

**SEO is `sanity-plugin-seofields`, not `sanity-plugin-seo`.** The latter
declares `sanity: ^3 || ^4 || ^5` and broke on Sanity 6 (`@sanity/icons` v5
collapsed its named exports; `@sanity/ui` v4 dropped `Code`), which forced a
generated icon shim, a UI shim and a postinstall patch script. All of that is
deleted. `sanity-plugin-seofields` declares `sanity: ^3 || ^4 || ^5 || ^6` and
needs no shims.

- Field type is `seoFields` (was `seoMetaFields`).
- Plugin is a default export: `import seofields from "sanity-plugin-seofields"`.
- Registers its own Studio route at `/studio/seo-dashboard`.
- Ships `buildSeoMeta()` from `sanity-plugin-seofields/next` — use it for
  `generateMetadata` in Phase 9 rather than hand-rolling the mapping.
- `seo` is deliberately never written by `scripts/seed.ts`: the plugin owns the
  object's internal shape, and a hand-built one may not render in its UI.

**Restart `next dev` and delete `.next` after changing `sanity.config.ts`
imports** — Turbopack caches the resolved module graph, so a running dev server
keeps reporting the old import even though `next build` is green. Browser
console history survives the restart too; check `preview_logs` for the truth.

**Do not run `npm audit fix --force`.** It "fixes" by installing `sanity@5` —
a downgrade from the 6.x we're on. The remaining advisories are all `js-yaml@3`
under `@sanity/cli → @vercel/frameworks`: CLI-only, never bundled into the app.
`smol-toml` and `uuid` are already pinned to patched versions via `overrides`
in `package.json`.

**`turbopack.root` is pinned** in `next.config.ts` because a stray
`package-lock.json` in the user's home directory otherwise makes Turbopack
guess the wrong workspace root.

**Dev runs on port 3100, not 3000** (`next dev -p 3100`) — port 3000 is held by
another process on this machine. Keep it stable: every origin the Studio runs
on needs its own Sanity CORS entry.

**Sanity CORS origins need "allow credentials".** The Studio authenticates with
a session cookie, so an origin added without credentials fails — and the browser
reports it as the misleading "No 'Access-Control-Allow-Origin' header". Add with
`npx sanity cors add <origin> --credentials`. Grant credentials only to origins
we control: a credentialed origin can act as the signed-in editor. Verify with:

```
curl -sI -X OPTIONS -H "Origin: <origin>" -H "Access-Control-Request-Method: GET" \
  https://<projectId>.api.sanity.io/v2026-05-04/users/me | grep -i access-control
```

**The `production` dataset is public-read.** Published documents are readable by
anyone with the project ID, without a token (drafts still need one, so the
Phase 3B draft workflow is safe). This breaks the naive design for **Phase 7
gated downloads**: a `libraryDoc`'s file asset URL could be read straight from
the public API, skipping the form. Gated files must be served through a
signed-URL route, or held in a private dataset — decide before building Phase 7.

## Layout

```
app/                    routes, API handlers, /studio mount
components/primitives/  design-system atoms          (Phase 1)
components/sections/    page-builder sections        (Phase 2+)
lib/                    templates, forms, wizard, seo, links
sanity/
  env.ts                env assertions — throws loudly, never falls back
  lib/                  client, image builder, queries
  schemas/              documents/ objects/ singletons/
content/                repo-authored content        (Phase 3B)
```

## Commands

```
npm run dev         dev server
npm run build       production build
npm run typecheck   tsc --noEmit
npm run lint        eslint
```

## Environment

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SANITY_PROJECT_ID` and
`NEXT_PUBLIC_SANITY_DATASET` are required — `sanity/env.ts` throws at import
time if they're missing, which is intentional: a silent fallback to the wrong
dataset is worse than a loud failure.

Secrets (`SANITY_API_*_TOKEN`, `ZOHO_WEBHOOK_*`, `RECAPTCHA_SECRET_KEY`) must
never carry the `NEXT_PUBLIC_` prefix.
