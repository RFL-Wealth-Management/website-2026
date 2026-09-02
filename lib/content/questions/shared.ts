/**
 * Content that repeats across every Financial Questions page.
 *
 * The question grid, the checkup band and the closing CTA are the same three
 * sections on all of them; only the framing changes. Writing them once here
 * means fixing a link or a claim in one place rather than three.
 */

import {
  CORPORATION_PATH,
  GROUP_PATH,
  TAX_PATH,
} from "./paths.ts";

export type QuestionCardContent = { q: string; tag: string; href: string };

/**
 * The seven questions in card voice — conversational, first person.
 *
 * The homepage keeps its own shorter list of six (lib/content/homepage.ts):
 * that grid is a 3-column layout that reads best filled exactly twice, and
 * changing what the homepage shows is not this page's decision to make. The
 * two lists are deliberate, not drift; the hrefs come from the same module.
 */
export const ALL_QUESTION_CARDS: readonly QuestionCardContent[] = [
  {
    q: "Am I paying more tax than I need to?",
    tag: "Tax efficiency",
    href: TAX_PATH,
  },
  {
    q: "Is my medical corporation structured properly?",
    tag: "Corporate structure",
    href: CORPORATION_PATH,
  },
  {
    q: "Is my investment strategy actually working?",
    tag: "Investments",
    href: "#questions",
  },
  {
    q: "Am I on track — or just earning well?",
    tag: "Retirement readiness",
    href: "#questions",
  },
  {
    q: "Could I afford to work less?",
    tag: "Lifestyle planning",
    href: "#questions",
  },
  {
    q: "What happens if I can't work?",
    tag: "Risk protection",
    href: "#questions",
  },
  {
    q: "Is my current advice truly unbiased?",
    tag: "Independent advice",
    href: "#questions",
  },
];

/** Every question except the one whose page you are already reading. */
export const otherQuestionCards = (currentPath: string) =>
  ALL_QUESTION_CARDS.filter((card) => card.href !== currentPath);

/**
 * The Physician Financial Checkup band.
 *
 * Each page tunes `heading`, `lede` and the sample result rows to its own
 * question so the preview card is about the thing the reader came for.
 */
export const checkupBand = (opts: {
  heading: string;
  lede: string;
  rows: readonly { label: string; state: "ok" | "gap" }[];
}) => ({
  eyebrow: "Physician Financial Checkup",
  heading: opts.heading,
  lede: opts.lede,
  cta: { label: "Start My 2-Minute Checkup", href: "#" },
  note: "Immediate results. No meeting required.",
  scanTitle: "Your results preview",
  scanBadge: "Sample",
  rows: opts.rows,
});

/** The closing two-path CTA. Identical on every question page. */
export const finalCta = {
  eyebrow: "Your next step",
  heading: "You don't need another opinion. You need to know what's missing.",
  paths: [
    {
      kind: "Self-directed",
      title: "Take the Physician Financial Checkup",
      body: "Get an immediate view of where your plan may need attention. Two minutes, results on screen, email them to yourself.",
      cta: { label: "Start My 2-Minute Checkup", href: "#" },
      variant: "seafoam" as const,
    },
    {
      kind: "Talk to a person",
      title: "Ask RFL a Question",
      body: "Tell us what you're trying to figure out. We'll help you determine the right next step — no pitch, no obligation.",
      cta: { label: "Ask RFL a Question", href: "#" },
      variant: "navy" as const,
    },
  ],
};

/** Link back to the group hub, used as the question grid's foot link. */
export const exploreAllLink = {
  label: "See all seven questions",
  href: GROUP_PATH,
};
