/**
 * Reusable FAQ sets, seeded as `faq` documents under Content blocks → FAQs.
 *
 * These hold questions only. Their heading, eyebrow and background live on the
 * `faqSection` that references them, so the same set can appear on more than
 * one page under different framing.
 *
 * Drafted from the positioning on rflwealth.ca (/services/, /tax-free-md-book/)
 * — a starting point for the Studio, not signed-off copy. Nothing here should
 * read as personalised advice, and no figure appears that the live site does
 * not already publish.
 */

type FaqEntry = {
  question: string;
  answer: string;
  cta?: { label: string; href: string };
};

export const physicianTaxFaqs: {
  id: string;
  title: string;
  description: string;
  items: readonly FaqEntry[];
} = {
  id: "faq-physician-tax",
  title: "Physician tax FAQs",
  description:
    "Used on the “Am I Paying Too Much Tax?” page. Written for incorporated Canadian physicians.",
  items: [
    {
      question: "I already have an accountant. Isn't my tax handled?",
      answer:
        "Filing and planning are two different jobs. An accountant reports what already happened, accurately and on time. Planning changes what happens next — how you draw income, what the corporation holds, and when.\n\nMost physicians we meet have a good accountant and no plan. The gap is not competence. It is that nobody has been asked to look at the corporate, personal and family picture together.",
    },
    {
      question: "Doesn't incorporating already lower my tax bill?",
      answer:
        "Incorporating creates the opportunity. It does not, by itself, capture it. The small business rate defers tax on income you leave in the corporation, but the saving only becomes real once you decide how and when that money comes out.\n\nA corporation with no drawdown strategy behind it can quietly move a tax bill into the future rather than reduce it.",
    },
    {
      question: "Salary or dividends — which one should I be taking?",
      answer:
        "There is no single right answer, and anyone who gives you one without asking questions is guessing. It depends on the RRSP room you want to create, how you feel about CPP, whether you have childcare or other deductions that need earned income, and how much passive income the corporation already earns.\n\nThe mix is also not a decision you make once. It should be revisited as your billings, your family and the rules change.",
    },
    {
      question:
        "I trained outside Canada. Does that change the tax picture for me?",
      answer:
        "Often, yes. Residency timing, assets and accounts still held abroad, foreign reporting obligations, and a shorter runway between starting to earn well and needing the plan to work all change the order in which decisions should be made.\n\nRFL was built for internationally trained physicians in Canada, so these are the ordinary case here rather than an exception.",
    },
    {
      question: "How much could better planning actually save me?",
      answer:
        "It depends entirely on your structure, your income and what is already in place — which is why we will not quote you a number before looking. Across our clients, RFL has identified over $100M in tax savings.\n\nThe honest answer for any individual physician is that the first step is finding out what is currently being left on the table.",
      cta: { label: "Take the 2-minute checkup", href: "#checkup" },
    },
    {
      question: "What does working with RFL cost?",
      answer:
        "Flat-fee planning, and 0% AUM fees. You are not charged a percentage of your portfolio, and we are not paid more for recommending one product over another.\n\nYou know what you pay and what you get before you start.",
    },
  ],
};

export const medicalCorporationFaqs: {
  id: string;
  title: string;
  description: string;
  items: readonly FaqEntry[];
} = {
  id: "faq-medical-corporation",
  title: "Medical corporation FAQs",
  description:
    "Used on the “Is My Medical Corporation Set Up Properly?” page. Covers structure, shareholders and corporate investing.",
  items: [
    {
      question: "How would I even know if my corporation is set up wrong?",
      answer:
        "You usually would not, because nothing breaks. A corporation that is structured poorly still files, still pays you, and still looks fine on a statement. The cost shows up slowly — as tax you did not need to pay, or as flexibility you no longer have when you want to sell, retire or bring family in.\n\nIt is worth a deliberate review rather than waiting for a reason.",
    },
    {
      question: "Should my spouse or family members be shareholders?",
      answer:
        "Sometimes, and the rules around this have tightened considerably. Whether it helps depends on who actually contributes to the business, their age, and what you want the corporation to do over the next decade.\n\nA share structure set up years ago under different rules is one of the most common things we find worth revisiting.",
    },
    {
      question: "Is money invested inside my corporation treated differently?",
      answer:
        "Yes — and this is where a lot of value is quietly lost. Passive investment income earned inside a corporation is taxed differently from the active income you bill, and past a threshold it can claw back the small business rate on the income you earn next year.\n\nWhat the corporation holds, and in what, is a planning decision, not just an investment one.",
    },
    {
      question: "If I'm incorporated, do I still need an RRSP or a TFSA?",
      answer:
        "Frequently, yes. Corporate and personal accounts do different things, and using only one because it is simpler is a common and expensive shortcut.\n\nThe right split depends on your income mix, your timeline and what you want available to you personally rather than through the corporation.",
    },
    {
      question:
        "I incorporated years ago and nothing has changed since. Is that a problem?",
      answer:
        "It is at least worth checking. The rules on passive income and income splitting have changed materially, and so, most likely, has your income, your family and how close you are to slowing down.\n\nA structure that was right at incorporation is not automatically right now.",
    },
    {
      question: "Who actually makes the changes — you, my accountant, or my lawyer?",
      answer:
        "All three, coordinated. Restructuring touches legal, tax and investment decisions at once, and the usual failure is not bad advice — it is three good advisors each doing their part without anyone holding the whole.\n\nRFL coordinates the work and stays accountable for it getting done.",
      cta: { label: "See how RFL works", href: "#works" },
    },
  ],
};
