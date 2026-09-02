/**
 * "Am I Paying Too Much Tax?" — /financial-questions/am-i-paying-too-much-tax
 *
 * Drafted from rflwealth.ca (/services/ and /tax-free-md-book/) as a starting
 * point for the Studio. Voice: plain, unhurried, no pressure. Nothing here is
 * personalised advice, and the only figure quoted is one the live site already
 * publishes.
 */

import { physicianTaxFaqs } from "../faqs.ts";
import { TAX_PATH } from "./paths.ts";
import {
  checkupBand,
  exploreAllLink,
  finalCta,
  otherQuestionCards,
} from "./shared.ts";

export const meta = {
  id: "page-am-i-paying-too-much-tax",
  title: "Am I Paying Too Much Tax?",
  slug: "am-i-paying-too-much-tax",
};

export const hero = {
  eyebrow: "Financial questions",
  headline: "Am I paying too much tax?",
  headlineAlt: "Most incorporated physicians are.",
  lede: "It is almost never a mistake. It is that no single person is looking at the corporation, the personal return and the investments at the same time — so the decisions that would lower your bill are never actually made.",
  primaryCta: { label: "Find Out What I'm Missing", href: "#checkup" },
  primaryNote:
    "Take the 2-minute Physician Financial Checkup. Get your results immediately.",
  secondaryCta: { label: "Read the common questions", href: "#faq" },
  chip: {
    title: "Over $100M in tax savings identified for physicians",
    note: "0% AUM fees · 100% fiduciary",
  },
};

export const signs = {
  eyebrow: "Does this sound familiar?",
  heading: "The signs you're leaving money on the table.",
  side: "None of these mean something has gone wrong. They mean nobody has looked at the whole picture yet.",
  items: [
    {
      title: "You earn well and feel no further ahead",
      body: "Billings have grown for years, but the balance sheet has not kept pace with them.",
    },
    {
      title: "Your accountant files, but nobody plans",
      body: "You get an accurate return every spring and no conversation about the year in front of you.",
    },
    {
      title: "Your pay mix has never been revisited",
      body: "The salary and dividend split was set once, early, and has quietly outlived the assumptions behind it.",
    },
    {
      title: "Cash is piling up inside the corporation",
      body: "It feels prudent. Past a point, passive income earned in there starts working against the rate on what you bill.",
    },
    {
      title: "You own products nobody has explained",
      body: "Policies and accounts bought at different times by different people, never reviewed together.",
    },
    {
      title: "No one has asked what the money is for",
      body: "Tax decisions get easier once the plan they are serving is actually written down.",
    },
  ],
  cta: { label: "Check my plan for gaps", href: "#checkup" },
};

export const leaks = {
  eyebrow: "Where it goes",
  heading: "Four places the money usually leaks.",
  side: "In our experience these four account for most of what an incorporated physician overpays — and all four are fixable.",
  stages: [
    {
      num: "01",
      title: "The pay mix",
      body: "Salary, dividends and the RRSP room, CPP and deductions that follow from choosing between them.",
    },
    {
      num: "02",
      title: "Passive income in the corporation",
      body: "Investment income earned inside the company can claw back the small business rate on next year's billings.",
    },
    {
      num: "03",
      title: "Deductions never claimed",
      body: "Legitimate corporate and personal deductions that go unused because nobody was looking for them.",
    },
    {
      num: "04",
      title: "Advisors who never speak",
      body: "Your accountant, your investment advisor and your insurance broker each optimising their own corner.",
    },
  ],
  footLink: { label: "See how RFL coordinates it", href: "#works" },
};

export const checkup = checkupBand({
  heading: "Find the gaps before they become expensive.",
  lede: "Answer a few physician-specific questions and see where your tax picture may need attention — with likely strengths, blind spots, and why each gap matters.",
  rows: [
    { label: "Salary & dividend mix", state: "gap" },
    { label: "Corporate passive income", state: "gap" },
    { label: "Deductions & credits", state: "ok" },
    { label: "Corporate vs personal investing", state: "gap" },
    { label: "RRSP & TFSA room used", state: "ok" },
    { label: "Estate & succession tax", state: "ok" },
    { label: "Accountant & advisor coordination", state: "gap" },
  ],
});

export const book = {
  eyebrow: "Tax Free MD",
  heading: "The tax chapters, in plain language.",
  lede: "Written for the questions physicians actually have about tax — not the ones that make for an easy sales conversation.",
  bullets: [
    "Why incorporation alone isn't a tax strategy",
    "Salary, dividends and the questions behind the answer",
    "What passive income inside the corporation really costs you",
    "How to tell coordinated advice from three separate opinions",
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
  heading: "What it looks like when someone finally checks.",
  quote:
    "I assumed my accountant had this covered. He had — for the filing. Nobody had ever asked why I was taking income the way I was, or what the corporation was holding while I did it.",
  name: "Dr. [Name] — story placeholder",
  meta: "Specialty · Province · RFL client since 20XX",
  initials: "DR",
  facts: [
    {
      label: "Where they were",
      body: "Incorporated eight years, same salary-dividend split the whole time.",
    },
    {
      label: "What RFL found",
      body: "Passive income approaching the threshold, and unused deductions on both returns.",
    },
    {
      label: "What was implemented",
      body: "Restructured the pay mix and moved corporate holdings, coordinated with their accountant.",
    },
    {
      label: "What changed",
      body: "Meaningful annual tax savings — and a plan the numbers were actually serving.",
    },
  ],
  footLink: { label: "Read physician stories", href: "#" },
};

export const faq = {
  eyebrow: "Common questions",
  heading: "What physicians ask us about tax.",
  side: "Short, direct answers. Where the honest answer is “it depends”, we say what it depends on.",
  faqId: physicianTaxFaqs.id,
};

export const others = {
  eyebrow: "Keep going",
  heading: "The other questions you're probably asking.",
  side: "Tax rarely sits on its own. Each of these opens a page built to answer it.",
  cards: otherQuestionCards(TAX_PATH),
  footLink: exploreAllLink,
};

export const final = finalCta;
