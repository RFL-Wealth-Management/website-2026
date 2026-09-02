/**
 * Where the Financial Questions pages live.
 *
 * Imported by the nav, by the question cards on every page that lists them,
 * and by scripts/seed.ts. Nothing here imports anything, so it can be the one
 * place these URLs are written down — a card that links somewhere the page
 * isn't is invisible without ever looking broken.
 *
 * Paths are built the same way lib/paths.ts builds them: /<group>/<page>.
 *
 * Everything under lib/content/ uses relative imports with an explicit `.ts`
 * extension. scripts/seed.ts is the only consumer and it runs on Node's type
 * stripping, which does not read the `@/*` aliases from tsconfig.
 *
 * Document _ids in this directory use hyphens, never dots. A `.` in a Sanity
 * document id makes the document private — it disappears from the public
 * dataset and the site 404s while the Studio still shows it, which is a
 * genuinely confusing failure to diagnose. See AGENTS.md.
 */

export const GROUP_SLUG = "financial-questions";
export const GROUP_PATH = `/${GROUP_SLUG}`;

/** Slugs of the question pages that exist. More land as they are written. */
export const QUESTION_SLUGS = {
  tax: "am-i-paying-too-much-tax",
  corporation: "is-my-medical-corporation-set-up-properly",
} as const;

export const TAX_PATH = `${GROUP_PATH}/${QUESTION_SLUGS.tax}`;
export const CORPORATION_PATH = `${GROUP_PATH}/${QUESTION_SLUGS.corporation}`;

/**
 * The seven questions as the navigation states them.
 *
 * `href` is the anchor to the homepage grid for the five pages that do not
 * exist yet — the same placeholder the nav has carried since the mockup — so
 * an unbuilt question lands somewhere useful instead of on "#".
 */
export const QUESTION_LINKS = [
  { label: "Am I Paying Too Much Tax?", href: TAX_PATH },
  {
    label: "Is My Medical Corporation Set Up Properly?",
    href: CORPORATION_PATH,
  },
  { label: "Am I Investing in the Right Places?", href: "#questions" },
  { label: "How Much Is Enough?", href: "#questions" },
  { label: "Can I Afford to Work Less?", href: "#questions" },
  { label: "What Happens if I Cannot Work?", href: "#questions" },
  { label: "Am I Getting Truly Unbiased Advice?", href: "#questions" },
] as const;
