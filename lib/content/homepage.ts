/**
 * Homepage copy, lifted verbatim from the mockup.
 *
 * Phase 2 replaces this module with a Sanity query returning the same shapes,
 * so the section components below don't change when content moves to the CMS.
 */

export const nav = {
  items: [
    { label: "Financial Questions", href: "#questions" },
    { label: "How RFL Helps", href: "#works" },
    { label: "Tax Free MD", href: "#book" },
    { label: "Insights", href: "#insights" },
    { label: "About RFL", href: "#team" },
  ],
  cta: { label: "Start Here", href: "#final" },
};

export const hero = {
  eyebrow: "Financial planning for Canadian physicians",
  headline: "Your financial life should work together.",
  headlineAlt: "So should the people advising you.",
  lede: "RFL coordinates your tax, corporation, investments, insurance, estate and retirement strategy around one plan.",
  primaryCta: { label: "What Am I Missing?", href: "#checkup" },
  primaryNote:
    "Take the 2-minute Physician Financial Checkup. Get your results immediately.",
  secondaryCta: { label: "See how RFL works", href: "#works" },
  chip: {
    title: "Corporation, investments & tax reviewed as one plan",
    note: "Not six separate opinions",
  },
};

export const questions = {
  eyebrow: "Financial questions",
  heading: "The questions you're already asking yourself.",
  side: "Discovery starts with your questions — not our service categories. Each one opens a page built to actually answer it.",
  cards: [
    { q: "Am I paying more tax than I need to?", tag: "Tax efficiency" },
    {
      q: "Is my medical corporation structured properly?",
      tag: "Corporate structure",
    },
    { q: "Is my investment strategy actually working?", tag: "Investments" },
    { q: "Am I on track — or just earning well?", tag: "Retirement readiness" },
    { q: "Could I afford to work less?", tag: "Lifestyle planning" },
    { q: "Is my current advice truly unbiased?", tag: "Independent advice" },
  ],
  footLink: { label: "Explore My Questions", href: "#" },
};

export const checkup = {
  eyebrow: "Physician Financial Checkup",
  heading: "Find the gaps before they become expensive.",
  lede: "Answer a few physician-specific questions and see where your financial plan may need attention — with likely strengths, blind spots, and why each gap matters.",
  cta: { label: "Start My 2-Minute Checkup", href: "#" },
  note: "Immediate results. No meeting required.",
  scanTitle: "Your results preview",
  scanBadge: "Sample",
  rows: [
    { label: "Tax efficiency", state: "ok" },
    { label: "Corporation structure", state: "gap" },
    { label: "Investments", state: "ok" },
    { label: "Risk protection", state: "gap" },
    { label: "Retirement readiness", state: "ok" },
    { label: "Estate planning", state: "ok" },
    { label: "Implementation & coordination", state: "gap" },
  ] as const,
};

export const book = {
  eyebrow: "Tax Free MD",
  heading: "The book that starts the conversation.",
  lede: "A plain-language guide to the tax and corporate decisions Canadian physicians face — written for the questions you actually have.",
  bullets: [
    "Why incorporation alone isn't a strategy",
    "Salary, dividends and the questions behind the answer",
    "What coordinated implementation actually looks like",
  ],
  cta: { label: "Get the Book", href: "#" },
  note: "Free for Canadian physicians.",
  cover: {
    eyebrow: "For Canadian Physicians",
    title: "Tax Free MD",
    author: "RFL Wealth Management",
  },
};

export const works = {
  eyebrow: "How RFL works",
  heading: "A plan means very little until it gets done.",
  side: "Advice is the starting point. Coordination and implementation are where the value shows up.",
  stages: [
    {
      num: "01",
      title: "See the whole picture",
      body: "Bring your corporate, personal and family finances into one view.",
    },
    {
      num: "02",
      title: "Find what's missing",
      body: "Identify gaps, conflicts and opportunities across the plan.",
    },
    {
      num: "03",
      title: "Put the plan into action",
      body: "Coordinate the people, decisions and implementation required.",
    },
    {
      num: "04",
      title: "Keep it working",
      body: "Adjust the plan as your career, family and priorities change.",
    },
  ],
  footLink: { label: "See How RFL Works", href: "#" },
};

export const story = {
  eyebrow: "Physician stories",
  heading: "What changes when everything finally works together?",
  quote:
    "I had an accountant, a broker, and three insurance policies I didn't understand. Nobody had ever looked at how it all fit together — until RFL found the gap sitting in my corporation.",
  name: "Dr. [Name] — story placeholder",
  meta: "Specialty · Province · RFL client since 20XX",
  initials: "DR",
  facts: [
    {
      label: "Where they were",
      body: "Mid-career, incorporated, earning well but unsure if the pieces fit.",
    },
    {
      label: "What RFL found",
      body: "A corporate structure gap and overlapping, unneeded coverage.",
    },
    {
      label: "What was implemented",
      body: "Restructured comp mix, coordinated with their accountant, one plan.",
    },
    {
      label: "What changed",
      body: "Meaningful annual tax savings — and one clear picture of the future.",
    },
  ],
  footLink: { label: "Read Physician Stories", href: "#" },
};

export const difference = {
  eyebrow: "Why RFL is different",
  heading: "Advice is everywhere. Coordination is not.",
  side: "Confident and factual — an easy comparison with banks, traditional advisors and disconnected professionals.",
  items: [
    {
      title: "Built specifically for physicians",
      body: "Corporations, billing realities, and career stages other advisors treat as edge cases.",
    },
    {
      title: "Transparent flat-fee planning",
      body: "You know exactly what you pay and exactly what you get. No hidden compensation.",
    },
    {
      title: "Corporate, personal and family — connected",
      body: "Decisions reviewed together, because that's how they actually behave.",
    },
    {
      title: "Education before pressure",
      body: "Understand the decision first. The book, tools and checkup come before any meeting.",
    },
    {
      title: "Implementation, not recommendations alone",
      body: "We coordinate the people and paperwork it takes to actually get the plan done.",
    },
    {
      title: "Ongoing accountability as life changes",
      body: "The plan adjusts as your career, family and priorities do.",
    },
  ],
  cta: { label: "Compare the RFL Approach", href: "#" },
};

export const team = {
  eyebrow: "The people behind RFL",
  heading:
    "Your financial life should never feel like a file being passed around.",
  side: "Credentials, accountability, and one restrained personal detail each — after relevance and proof, the humans.",
  members: [
    {
      name: "Team Member",
      cred: "CFP® · Role Title",
      body: "keeping your corporate and personal plans speaking the same language.",
    },
    {
      name: "Team Member",
      cred: "CPA, CA · Role Title",
      body: "straight answers on tax — and catching what filings alone won't.",
    },
    {
      name: "Team Member",
      cred: "CIM® · Role Title",
      body: "an investment strategy that fits the plan, not the product shelf.",
    },
    {
      name: "Team Member",
      cred: "CLU® · Role Title",
      body: "making sure the plan survives the things we hope never happen.",
    },
  ],
  footLink: { label: "Meet the People Behind RFL", href: "#" },
};

export const insights = {
  eyebrow: "Insights",
  heading: "Useful answers for the decisions ahead.",
  side: "A curated mix — not an automatic blog feed. Filterable by financial question and physician stage.",
  cards: [
    {
      tag: "Tax update",
      tone: "tax",
      title: "2026 federal budget: what changed for incorporated physicians",
      meta: "4 min read · Updated this month",
    },
    {
      tag: "Article",
      tone: "article",
      title:
        "Salary vs. dividends: the answer depends on questions you haven't been asked",
      meta: "7 min read",
    },
    {
      tag: "Podcast",
      tone: "podcast",
      title: 'Ep. 14 — Why "good enough" advice costs the most',
      meta: "32 min listen",
    },
    {
      tag: "From Tax Free MD",
      tone: "guide",
      title: "Guide: the corporation checklist — 9 things to verify this year",
      meta: "Free download",
    },
  ] as const,
  wide: {
    tag: "Video · 3 min",
    title:
      "Can you afford to work less? A framework for physicians who feel stuck at full tilt",
    meta: "Watch on the Insights hub",
  },
  footLink: { label: "Explore Physician Financial Insights", href: "#" },
};

export const final = {
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

export const footer = {
  blurb:
    "Integrated financial planning built for Canadian physicians — tax, corporation, investments, insurance, estate and retirement, coordinated around one plan.",
  columns: [
    {
      title: "Start here",
      links: [
        "Find Your Starting Point",
        "How RFL Works",
        "Pricing",
        "Speak With RFL",
      ],
    },
    {
      title: "Explore",
      links: [
        "Financial Questions",
        "How RFL Helps",
        "Tax Free MD",
        "Insights",
        "About RFL",
      ],
    },
  ],
  newsletter: {
    title: "Physician updates",
    body: "Tax changes and planning updates that actually affect physicians. A few emails a year, no noise.",
    placeholder: "you@practice.ca",
    button: "Sign up",
  },
  legal: [
    "Contact",
    "Careers",
    "Privacy Policy",
    "Terms of Use",
    "Accessibility",
    "Disclosures",
  ],
  copyright: "© 2026 RFL Wealth Management. All rights reserved.",
  note: "Mockup note: all photography areas are marked as placeholders for in-house shoots. Physician story, endorsement and team details are structural placeholders pending real content and permissions.",
};
