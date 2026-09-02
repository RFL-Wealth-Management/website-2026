/**
 * "Is My Medical Corporation Set Up Properly?"
 * — /financial-questions/is-my-medical-corporation-set-up-properly
 *
 * Drafted from rflwealth.ca (/services/, which leads with "Your MPC is Your
 * Superpower") as a starting point for the Studio. Same spine as the tax page:
 * signs → mechanism → checkup → book → story → FAQ → other questions → CTA.
 */

import { medicalCorporationFaqs } from "../faqs.ts";
import { CORPORATION_PATH } from "./paths.ts";
import {
  checkupBand,
  exploreAllLink,
  finalCta,
  otherQuestionCards,
} from "./shared.ts";

export const meta = {
  id: "page-is-my-medical-corporation-set-up-properly",
  title: "Is My Medical Corporation Set Up Properly?",
  slug: "is-my-medical-corporation-set-up-properly",
};

export const hero = {
  eyebrow: "Financial questions",
  headline: "Is my medical corporation set up properly?",
  headlineAlt: "Your MPC is your superpower.",
  lede: "A corporation that is structured poorly does not break. It files, it pays you, and it looks fine on a statement. The cost shows up years later, as tax you didn't need to pay and flexibility you no longer have.",
  primaryCta: { label: "Check My Corporation", href: "#checkup" },
  primaryNote:
    "Take the 2-minute Physician Financial Checkup. Get your results immediately.",
  secondaryCta: { label: "Read the common questions", href: "#faq" },
  chip: {
    title: "Corporation, investments and tax reviewed as one plan",
    note: "Not six separate opinions",
  },
};

export const signs = {
  eyebrow: "Worth a second look if…",
  heading: "The signs your corporation isn't pulling its weight.",
  side: "A structure that was right the year you incorporated is not automatically right now.",
  items: [
    {
      title: "Nothing has changed since you incorporated",
      body: "The rules on passive income and income splitting have moved considerably. Most structures have not.",
    },
    {
      title: "You're not sure who owns which shares",
      body: "Share classes set up quickly at the start are the single most common thing we find worth revisiting.",
    },
    {
      title: "The corporation is holding cash it isn't using",
      body: "Retained earnings sitting in a chequing account are a decision that was never actually made.",
    },
    {
      title: "You invest corporately or personally, not both",
      body: "Using one because it is simpler is a common shortcut, and an expensive one.",
    },
    {
      title: "Your family situation has changed",
      body: "A marriage, a child, a spouse's new income — each of these changes what the structure should be doing.",
    },
    {
      title: "Nobody owns the whole picture",
      body: "A lawyer set it up, an accountant files it, an advisor invests it. No one is accountable for the result.",
    },
  ],
  cta: { label: "Check my structure for gaps", href: "#checkup" },
};

export const structure = {
  eyebrow: "What good looks like",
  heading: "Four things a well-built corporation gets right.",
  side: "None of this is exotic. It is ordinary planning, done deliberately and revisited as things change.",
  stages: [
    {
      num: "01",
      title: "A share structure with room in it",
      body: "Classes and ownership that still work when your family, income or exit plans change.",
    },
    {
      num: "02",
      title: "A deliberate income strategy",
      body: "What comes out, in what form, and when — decided against a plan rather than by habit.",
    },
    {
      num: "03",
      title: "Corporate investments that fit the plan",
      body: "What the company holds, chosen knowing how passive income interacts with the rate on your billings.",
    },
    {
      num: "04",
      title: "Personal and corporate, connected",
      body: "RRSP, TFSA, insurance and estate decisions made in the same conversation as the corporate ones.",
    },
  ],
  footLink: { label: "See how RFL works", href: "#works" },
};

export const checkup = checkupBand({
  heading: "Find out what your structure is costing you.",
  lede: "Answer a few physician-specific questions and see where your corporation may need attention — with likely strengths, blind spots, and why each gap matters.",
  rows: [
    { label: "Share structure & ownership", state: "gap" },
    { label: "Income splitting eligibility", state: "gap" },
    { label: "Retained earnings strategy", state: "ok" },
    { label: "Corporate investment income", state: "gap" },
    { label: "Corporate vs personal accounts", state: "ok" },
    { label: "Succession & wind-up planning", state: "ok" },
    { label: "Lawyer, accountant & advisor coordination", state: "gap" },
  ],
});

export const book = {
  eyebrow: "Tax Free MD",
  heading: "The corporation chapters, in plain language.",
  lede: "Written for physicians who were handed a corporation and never given the manual that should have come with it.",
  bullets: [
    "What incorporation does — and what it doesn't do on its own",
    "Share structures, and the questions to ask before you change one",
    "Holding investments inside the company without undoing the benefit",
    "Getting your lawyer, accountant and advisor into the same plan",
  ],
  cta: { label: "Get the Book", href: "#" },
  note: "Free for Canadian physicians.",
  cover: {
    eyebrow: "For Canadian Physicians",
    title: "Tax Free MD",
    author: "RFL Wealth Management",
  },
};

export const story = {
  eyebrow: "Physician stories",
  heading: "What changes when the structure finally fits.",
  quote:
    "I set the corporation up the month I started practising and never touched it again. It turned out to be built for a version of my life that ended about six years ago.",
  name: "Dr. [Name] — story placeholder",
  meta: "Specialty · Province · RFL client since 20XX",
  initials: "DR",
  facts: [
    {
      label: "Where they were",
      body: "Incorporated at the start of practice, single share class, never reviewed.",
    },
    {
      label: "What RFL found",
      body: "A structure with no room for a spouse, and corporate cash earning nothing.",
    },
    {
      label: "What was implemented",
      body: "Reorganised shares with their lawyer, and gave the retained earnings a job.",
    },
    {
      label: "What changed",
      body: "Ongoing tax savings, and a corporation that can follow them into the next decade.",
    },
  ],
  footLink: { label: "Read physician stories", href: "#" },
};

export const faq = {
  eyebrow: "Common questions",
  heading: "What physicians ask us about their corporation.",
  side: "Short, direct answers. Where the honest answer is “it depends”, we say what it depends on.",
  faqId: medicalCorporationFaqs.id,
};

export const others = {
  eyebrow: "Keep going",
  heading: "The other questions you're probably asking.",
  side: "Your corporation touches nearly every other decision. Each of these opens a page built to answer it.",
  cards: otherQuestionCards(CORPORATION_PATH),
  footLink: exploreAllLink,
};

export const final = finalCta;
