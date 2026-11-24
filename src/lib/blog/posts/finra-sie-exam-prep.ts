import type { BlogPostDraft } from "../types";

export const finraSieExamPrepPost: BlogPostDraft = {
  slug: "finra-sie-exam-prep-why-people-fail",
  title: "FINRA SIE Exam Prep: Why Most People Fail and How to Avoid It",
  titleTag: "SIE Exam Prep | Why People Fail + How to Pass",
  metaDescription:
    "Why first-time SIE candidates fail: math gaps, term memorization without understanding, and pacing. What the exam tests, a 4-week study plan, plus 75Q timed mock (free 25-question version).",
  publishedAt: "2026-07-27",
  contentUpdated: "2026-11-23",
  eyebrow: "FINRA SIE · Securities licensing",
  clusterId: "finra-sie",
  relatedSlugs: ["finra-options-questions-read-without-getting-tricked"],
  intro:
    "The FINRA Securities Industry Essentials (SIE) exam is the gatekeeper. Pass it, and you can register with a broker-dealer. Fail it, and you are stuck explaining to hiring managers why your resume has a gap. FINRA publishes a **passing score of 70** on the scored items, not a candidate pass-rate statistic on the public SIE page. The people who fail usually fail for the same three reasons: they underestimated the math, they memorized terms without understanding them, and they ran out of time. For timed practice aligned to FINRA section weights, use the [full 75-question SIE practice test](/mock-exams/sie-full-mock).",
  mockSlug: "sie-full-mock",
  deckSlug: "sie-exam-anki-deck",
  cta: {
    mockLabel: "Take the free FINRA SIE mock",
    deckLabel: "Drill weak topics with the Anki deck",
    summary:
      "Take the 75-question FINRA SIE mock (free 25-question version) → get your pass/no-pass report → drill options, bonds, and accounts with the Anki deck.",
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
    {
      heading: "SIE vs Series 7: how do they fit together?",
      blocks: [
        {
          type: "table",
          caption: "SIE vs Series 7 (finra.org, checked 23 Nov 2026)",
          headers: ["", "SIE", "Series 7"],
          rows: [
            ["Questions", "75 multiple choice", "125 scored + 5 unscored pretest (130)"],
            ["Time", "1 hour 45 minutes", "3 hours 45 minutes"],
            ["Passing score", "70", "72"],
            ["Fee", "$100", "$395"],
            ["Sponsor needed?", "No; anyone 18 or older", "Yes; a FINRA member firm (or other applicable SRO member)"],
            ["Role", "General knowledge corequisite", "Representative-level qualification exam"],
          ],
        },
        {
          type: "p",
          text: "To register as a General Securities Representative you must pass **both**: the SIE is the corequisite, and the Series 7 is the qualification exam. A passed SIE stays valid for four years, so you can take it before you have a job. The Series 7 then goes deeper on recommendations: Function 3 alone is 91 of its 125 scored items. Practise each with the [SIE practice test](/mock-exams/sie-full-mock) and the [Series 7 practice test](/mock-exams/series-7-readiness-check).",
        },
      ],
    },
    {
      heading: "How long do you wait to retake the SIE?",
      blocks: [
        {
          type: "p",
          text: "Today FINRA requires 30 days after a first or second failed attempt and 180 days after a third or later failure within two years. **From 19 January 2027** (FINRA Regulatory Notice 26-18) those waits drop to **15 days** and **60 days**. The wait applies only to the exam you failed, so failing the SIE does not stop you sitting the Series 7, and failures more than two years old don't count.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the passing score for the SIE exam?",
      answer:
        "FINRA's SIE page lists the passing score as 70 for the 75-question, 1 hour 45 minute exam (finra.org, checked 23 Nov 2026).",
    },
    {
      question: "How long should I study for the SIE exam?",
      answer:
        "FINRA does not set a study time. The 4-week plan above works for many part-time schedules; use a timed practice test in week one to decide whether you need longer.",
    },
    {
      question: "Can I take the SIE exam without a sponsor?",
      answer:
        "Yes. Anyone 18 or older can take the SIE without a sponsor. Qualification exams such as the Series 7 require association with a member firm.",
    },
    {
      question: "How much does the SIE exam cost?",
      answer:
        "$100 (FINRA, checked 23 Nov 2026). Results stay valid for four years.",
    },
    {
      question: "What happens if I fail the SIE exam?",
      answer:
        "Today: 30 days after a first or second failure and 180 days after a third within two years. From 19 Jan 2027: 15 days and 60 days (FINRA Regulatory Notice 26-18).",
    },
    {
      question: "Is the SIE exam harder than the Series 7?",
      answer:
        "No. The Series 7 is longer (130 questions: 125 scored + 5 pretest), deeper on suitability and options strategies, and requires sponsorship. The SIE is broader and more foundational. Most people find the Series 7 harder because of the volume, not the complexity.",
    },
  ],
  bottomLine:
    "The SIE is not an intelligence test. It is a reading comprehension and memorization test with a timer. Most people fail because they did not respect the clock or they tried to memorize without understanding. Run a timed practice test in week one, find your worst section, and beat it to death with flashcards. Pass the SIE, then add the qualification exam for your role. Sources: [FINRA SIE](https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam), [FINRA Series 7](https://www.finra.org/registration-exams-ce/qualification-exams/series7) and [Regulatory Notice 26-18](https://www.finra.org/rules-guidance/notices/26-18), checked 23 Nov 2026.",
};
