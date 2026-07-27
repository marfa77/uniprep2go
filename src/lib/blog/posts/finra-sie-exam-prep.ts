import type { BlogPostDraft } from "../types";

export const finraSieExamPrepPost: BlogPostDraft = {
  slug: "finra-sie-exam-prep-why-people-fail",
  title: "FINRA SIE Exam Prep: Why Most People Fail and How to Avoid It",
  titleTag: "FINRA SIE Exam Prep: Why Most People Fail + How to Pass",
  metaDescription:
    "The SIE exam pass rate is around 70%, but that includes retakes. Here is why first-timers fail, what the exam actually tests, and the study plan that gets you out in 4 weeks.",
  publishedAt: "2026-07-27",
  eyebrow: "FINRA SIE · Securities licensing",
  clusterId: "finra-sie",
  relatedSlugs: [],
  intro:
    "The FINRA Securities Industry Essentials (SIE) exam is the gatekeeper. Pass it, and you can register with a broker-dealer. Fail it, and you are stuck explaining to hiring managers why your resume has a gap. The pass rate hovers around **70%**, but that number is inflated by retakes. First-time pass rates are lower, and the people who fail usually fail for the same three reasons: they underestimated the math, they memorized terms without understanding them, and they ran out of time.",
  mockSlug: "sie-full-mock",
  deckSlug: "sie-exam-anki-deck",
  cta: {
    mockLabel: "Take the free FINRA SIE mock",
    deckLabel: "Drill weak topics with the Anki deck",
    summary:
      "Take the free 75-question FINRA SIE mock → get your pass/no-pass report → drill options, bonds, and accounts with the Anki deck.",
  },
  sections: [
    {
      heading: "What the SIE Exam Actually Covers",
      blocks: [
        {
          type: "p",
          text: "FINRA breaks the exam into four sections:",
        },
        {
          type: "ol",
          items: [
            "**Knowledge of Capital Markets** (16%) — types of markets, economic factors, offerings",
            "**Understanding Products and Their Risks** (44%) — equities, debt, options, pooled investments",
            "**Understanding Trading, Customer Accounts, and Prohibited Activities** (31%) — accounts, orders, compliance",
            "**Overview of the Regulatory Framework** (9%) — FINRA, SEC, MSRB, SIPC",
          ],
        },
        {
          type: "p",
          text: "Notice the weight: **44% of your score** comes from products and risks. If you know options, bonds, and mutual funds cold, you are nearly halfway home. If you skim them to focus on regulations, you are building your house on sand.",
        },
      ],
    },
    {
      heading: "Why People Fail (The Real Reasons)",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Reason 1: They treat it like the Series 7 light",
              body: "It is not. The SIE is broader and more conceptual. The Series 7 goes deep on suitability and options strategies. The SIE asks you to identify a municipal bond from its description or calculate current yield. The overlap is smaller than people think.",
            },
            {
              title: "Reason 2: They ignore the math",
              body: "You do not need calculus, but you need to calculate these in under 60 seconds or you will fall behind on time:",
              bullets: [
                "Current yield: annual interest / market price",
                "Total return: (ending value – beginning value + income) / beginning value",
                "Tax-equivalent yield: municipal yield / (1 – tax bracket)",
                "Break-even on options: strike + premium (calls) or strike – premium (puts)",
              ],
            },
            {
              title: "Reason 3: They do not practice under timed conditions",
              body: "You get **75 questions** in **105 minutes**. That is 1 minute 24 seconds per question. Some questions are short. Others are paragraph-long scenario questions with four parts. If you have never done a full timed mock, you will panic on question 50 when you realize you have 20 minutes left and 25 questions to go.",
            },
          ],
        },
      ],
    },
    {
      heading: "The Topics That Eat the Most Time",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Options",
              body: "You will get 5–10 options questions. Get them wrong and your score tanks. Know these cold:",
              bullets: [
                "Calls: right to buy",
                "Puts: right to sell",
                "Covered call: own the stock, sell the call",
                "Protective put: own the stock, buy the put",
                "Long call breakeven: strike + premium",
                "Long put breakeven: strike – premium",
                "Short call: strike + premium (max gain = premium)",
                "Short put: strike – premium (max gain = premium)",
              ],
            },
            {
              title: "Bonds",
              body: "",
              bullets: [
                "Par value: $1,000",
                "Coupon rate vs. current yield vs. yield to maturity",
                "Inverse relationship between price and yield",
                "Duration: sensitivity to interest rate changes",
                "Zero-coupon bonds: issued at a discount, no periodic interest",
              ],
            },
            {
              title: "Mutual Funds and ETFs",
              body: "",
              bullets: [
                "Open-end vs. closed-end",
                "NAV calculation: (assets – liabilities) / shares outstanding",
                "Front-end load, back-end load, 12b-1 fees",
                "ETFs trade intraday; mutual funds price once after close",
              ],
            },
            {
              title: "Customer Accounts",
              body: "",
              bullets: [
                "Cash accounts: pay in full",
                "Margin accounts: borrow up to 50% for equities, Regulation T",
                "Pattern day trader: 4+ day trades in 5 business days in a margin account, $25,000 minimum equity",
                "Suitability: know the customer (KYC), time horizon, risk tolerance, liquidity needs",
              ],
            },
          ],
        },
        {
          type: "table",
          caption: "SIE options breakeven quick reference",
          headers: ["Position", "Breakeven", "Max gain note"],
          rows: [
            ["Long call", "Strike + premium", "Unlimited"],
            ["Long put", "Strike – premium", "Strike – premium"],
            ["Short call", "Strike + premium", "Premium received"],
            ["Short put", "Strike – premium", "Premium received"],
          ],
        },
      ],
    },
    {
      heading: "The 4-Week Study Plan",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Week 1: Products and Risks",
              body: "Read the equity, debt, options, and pooled investment chapters. Do 50 practice questions per topic. Score below 70%? Re-read and re-test.",
            },
            {
              title: "Week 2: Trading and Accounts",
              body: "Focus on order types, margin, cash accounts, and prohibited activities. This is where the rules live. Memorize the dollar thresholds and time limits.",
            },
            {
              title: "Week 3: Capital Markets and Regulations",
              body: "These are lower-weight but high-confidence sections. Learn the market participants, the role of the SEC/FINRA/MSRB, and the basics of offerings.",
            },
            {
              title: "Week 4: Full Mocks and Weak-Topic Repair",
              body: "Take three full timed mocks under exam conditions. No phone, no notes, kitchen timer. Review every wrong answer. If you miss an options question, do 20 more options questions. Do not move on until you are scoring 80%+ consistently.",
            },
          ],
        },
      ],
    },
    {
      heading: "How to Read a Question Without Getting Tricked",
      blocks: [
        {
          type: "p",
          text: "FINRA writes questions to test whether you read carefully. Watch for:",
        },
        {
          type: "ul",
          items: [
            '**Except questions:** "Which of the following is NOT a characteristic of…?" Read slowly. Underline the word NOT.',
            '**Roman numeral questions:** "Which combination is correct? I, II, and III only." Eliminate one wrong statement and the answer falls out.',
            "**Scenario questions:** A customer has $50,000, wants growth, 10-year horizon. Which product is suitable? Do not pick the highest return. Pick the one that matches the profile.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the passing score for the SIE exam?",
      answer:
        "FINRA does not publish the exact passing score, but industry consensus and candidate feedback place it at 70% (roughly 53 out of 75 questions).",
    },
    {
      question: "How long should I study for the SIE exam?",
      answer:
        "4–6 weeks of part-time study (10–15 hours per week) is the sweet spot. Less than 3 weeks and you are cramming. More than 8 weeks and you start forgetting the early material.",
    },
    {
      question: "Can I take the SIE exam without a sponsor?",
      answer:
        "Yes. The SIE is the only FINRA exam you can take without being sponsored by a member firm. You register directly through FINRA.",
    },
    {
      question: "How much does the SIE exam cost?",
      answer:
        "$80 as of 2026. Rescheduling costs $35 if done within 10 days of the exam. No-shows forfeit the fee.",
    },
    {
      question: "What happens if I fail the SIE exam?",
      answer:
        "You must wait 30 days before retaking. If you fail three times, you must wait 180 days before a fourth attempt. There is no lifetime limit, but the waiting periods are enforced.",
    },
    {
      question: "Is the SIE exam harder than the Series 7?",
      answer:
        "No. The Series 7 is longer (125 questions), deeper on suitability and options strategies, and requires sponsorship. The SIE is broader and more foundational. Most people find the Series 7 harder because of the volume, not the complexity.",
    },
    {
      question: "Do I need a calculator for the SIE exam?",
      answer:
        "No. The testing center provides a basic four-function calculator. You cannot bring your own.",
    },
  ],
  bottomLine:
    "The SIE is not an intelligence test. It is a reading comprehension and memorization test with a timer. Most people fail because they did not respect the clock or they tried to memorize without understanding. Run a timed practice test in week one, find your worst section, and beat it to death with flashcards. Pass the SIE, and the door to the industry opens.",
};
