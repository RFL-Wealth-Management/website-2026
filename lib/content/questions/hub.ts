/**
 * "Financial Questions" — the group landing page at /financial-questions.
 *
 * Gives the mega-menu's parent link and the homepage's "Explore My Questions"
 * foot link a real destination. Deliberately short: it exists to route people
 * onward, not to answer anything itself.
 */

import { GROUP_SLUG } from "./paths.ts";
import {
  ALL_QUESTION_CARDS,
  checkupBand,
  finalCta,
} from "./shared.ts";

export const meta = {
  id: "page-financial-questions",
  groupId: "group-financial-questions",
  title: "Financial Questions",
  slug: GROUP_SLUG,
};

export const group = {
  id: "group-financial-questions",
  title: "Financial Questions",
  slug: GROUP_SLUG,
  description:
    "The seven questions the site is organised around. One page per question.",
  order: 10,
};

export const hero = {
  eyebrow: "Financial questions",
  headline: "Start with the question you're actually asking.",
  headlineAlt: "Not the one someone wants to sell you.",
  lede: "Physicians rarely come to us asking for “wealth management”. They come with one specific thing that has been bothering them. These are the seven we hear most — each with a page built to answer it properly.",
  primaryCta: { label: "What Am I Missing?", href: "#checkup" },
  primaryNote:
    "Not sure which one is yours? The 2-minute checkup will tell you.",
  secondaryCta: { label: "See the questions", href: "#questions" },
  chip: {
    title: "Corporation, investments and tax reviewed as one plan",
    note: "Not six separate opinions",
  },
};

export const questions = {
  eyebrow: "Where would you like to start?",
  heading: "The questions you're already asking yourself.",
  side: "Two are written. The rest are on their way — in the meantime the checkup covers all seven.",
  cards: ALL_QUESTION_CARDS,
  footLink: { label: "Start My 2-Minute Checkup", href: "#checkup" },
};

export const checkup = checkupBand({
  heading: "Not sure which question is yours?",
  lede: "Answer a few physician-specific questions and see which parts of your plan need attention first — with likely strengths, blind spots, and why each gap matters.",
  rows: [
    { label: "Tax efficiency", state: "ok" },
    { label: "Corporation structure", state: "gap" },
    { label: "Investments", state: "ok" },
    { label: "Risk protection", state: "gap" },
    { label: "Retirement readiness", state: "ok" },
    { label: "Estate planning", state: "ok" },
    { label: "Implementation & coordination", state: "gap" },
  ],
});

export const final = finalCta;
