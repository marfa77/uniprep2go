import type { BlogPostDraft } from "../types";

const CHECKED = "23 Nov 2026";

export const cfaVsFrmPost: BlogPostDraft = {
  slug: "cfa-level-1-vs-frm-part-1-which-to-choose",
  title: "CFA Level 1 vs FRM Part 1: If You Can Only Study for One",
  titleTag: "CFA Level 1 vs FRM Part 1: If You Can Only Study for One",
  metaDescription:
    "CFA Level 1 registration is $1,140 (early) or $1,490 (standard) in 2026 — no enrollment fee — and takes ~300 hours. FRM Part 1 costs $1,000 and takes 200 hours. Here is which one moves your resume, and which one is a half-finished credential.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-23",
  eyebrow: "Finance credentials · CFA vs FRM",
  clusterId: "cfa-frm",
  relatedSlugs: [
    "how-long-anki-decks-stay-current-exam-shelf-life",
    "finra-sie-exam-prep-why-people-fail",
  ],
  intro:
    "**CFA Level I and FRM Part I are both computer-based, multiple-choice and quantitative, but they start different credentials.** Level I is the first of three CFA Program exams, built around investment analysis across ten topics. FRM Part I is the first of two GARP exams, built around risk measurement across four topics. Below: format, 2027 dates and fees, what each tests, and how each leads to the full credential, using CFA Institute and GARP figures checked " +
    CHECKED +
    ". To see where your gaps are before you pay, try the [CFA Level I practice test](/mock-exams/cfa-level-1-readiness-check) or the [FRM Part I practice test](/mock-exams/frm-part-1-readiness-check).",
  mockSlug: "cfa-level-1-readiness-check",
  deckSlug: "cfa-level-1-anki-deck",
  cta: {
    mockLabel: "CFA Level 1 practice test",
    deckLabel: "Drill CFA Level 1 with Anki",
    summary:
      "Not sure which exam fits? Take the free start of both practice tests, then drill weak topics in the matching deck before you register.",
    extraLinks: [
      {
        href: "/mock-exams/cfa-level-1-readiness-check",
        label: "CFA Level 1 practice test — free 25 questions, no signup",
      },
      {
        href: "/decks/cfa-level-1-anki-deck",
        label: "CFA Level 1 Anki deck",
      },
      {
        href: "/mock-exams/frm-part-1-readiness-check",
        label: "FRM Part 1 practice test — free 25 questions, no signup",
      },
      {
        href: "/decks/frm-part-1-anki-deck",
        label: "FRM Part 1 Anki deck",
      },
    ],
  },
  sections: [
    {
      heading: "How do the two exams compare on format?",
      blocks: [
        {
          type: "table",
          caption: "CFA Level I vs FRM Part I (CFA Institute and GARP, checked " + CHECKED + ")",
          headers: ["", "CFA Level I", "FRM Part I"],
          rows: [
            ["Set by", "CFA Institute", "GARP"],
            ["Questions", "180 three-option multiple choice", "100 equally weighted multiple choice"],
            ["Time", "Two 135-minute sessions of 90 questions", "4 hours"],
            ["Topics", "10", "4"],
            ["Passing score", "Minimum passing score set by CFA Institute; no fixed published percentage", "Pass/fail with quartile feedback; no fixed published percentage"],
            ["Results", "By email within about 5–7 weeks of the window", "Within 8 weeks of the window closing"],
            ["Exam fee", "USD 1,140 early / 1,490 standard; no enrollment fee since 29 Apr 2025", "USD 600 early / 800 standard, plus a one-time USD 400 enrollment fee"],
          ],
        },
        {
          type: "p",
          text: "CFA Level I has no penalty for wrong answers. You must also complete one Practical Skills Module (PSM) at each CFA level before results are released.",
        },
      ],
    },
    {
      heading: "When can you sit each exam in 2027?",
      blocks: [
        {
          type: "ul",
          items: [
            "**CFA Level I:** four windows a year (typically February, May, August and November). You may sit at most twice per calendar year, not in consecutive windows and not within six months of each other. Check exact dates in CFA Institute's dates-and-fees tool.",
            "**FRM Part I:** 8–13 May, 13–14 August (morning sessions) and 13–18 November 2027, at Pearson VUE test centers. Early registration for May opens 1 December; for August, 1 March; for November, 1 May.",
          ],
        },
      ],
    },
    {
      heading: "What does each exam test?",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "CFA Level I topic weights (2027 exams)",
              body: "Ten topics, each with an official weight range:",
              bullets: [
                "Ethical and Professional Standards 10–15%",
                "Quantitative Methods, Financial Statement Analysis, Equity Investments and Fixed Income 11–14% each",
                "Portfolio Construction 8–12%",
                "Economics, Corporate Issuers, Derivatives and Alternative Investments 6–9% each",
              ],
            },
            {
              title: "FRM Part I topics",
              body: "Four topics appear on every sitting:",
              bullets: [
                "Foundations of Risk Management",
                "Quantitative Analysis",
                "Financial Markets and Products",
                "Valuation and Risk Models",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "Both cover quantitative methods, fixed income and derivatives, but with different aims: Level I spends more time on financial statements, equity and ethics; Part I goes deeper into risk measurement and models. The practice tests score you by these topics: [CFA Level I](/mock-exams/cfa-level-1-readiness-check) and [FRM Part I](/mock-exams/frm-part-1-readiness-check).",
        },
      ],
    },
    {
      heading: "How much study time does each take?",
      blocks: [
        {
          type: "p",
          text: "CFA Institute says successful candidates report **over 300 hours** of study per level on average. GARP reports that FRM Part I candidates spend **about 240 hours** on average, with survey answers ranging from under 100 to more than 400 hours. Your background matters: strong statistics helps most on FRM Part I, strong accounting on CFA Level I.",
        },
      ],
    },
    {
      heading: "What does each lead to after you pass?",
      blocks: [
        {
          type: "ul",
          items: [
            "**CFA:** Level I is followed by Levels II and III. A PSM is required at each level, and the charter has further requirements set by CFA Institute.",
            "**FRM:** pass Part II within four years of passing Part I, and submit two years of relevant full-time work experience within ten years of sitting Part II; experience can come before or after the exams.",
          ],
        },
        {
          type: "p",
          text: "On its own, a passed Level I or Part I is a step toward the credential rather than the credential itself. Choose the program whose full credential matches the roles you want: investment analysis and portfolio management for the CFA, risk management for the FRM.",
        },
      ],
    },
    {
      heading: "Who should start with which?",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Start with CFA Level I if…",
              body: "you are aiming at equity research, portfolio management, wealth management or corporate finance, want the broader ten-topic curriculum, and can plan for three exams.",
            },
            {
              title: "Start with FRM Part I if…",
              body: "you are aiming at risk management, model validation, treasury or regulatory work, are comfortable with statistics, and want a two-exam path.",
            },
          ],
        },
        {
          type: "p",
          text: "Studying both entry exams at once rarely works: the overlap is in concepts, not in the questions, notation or depth. Drill the one you pick with the [CFA Level 1 deck](/decks/cfa-level-1-anki-deck) or the [FRM Part 1 deck](/decks/frm-part-1-anki-deck).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on CFA Level 1 and FRM Part 1?",
      answer:
        "CFA Level I has 180 questions in two 135-minute sessions. FRM Part I has 100 questions in 4 hours (CFA Institute and GARP, checked 23 Nov 2026).",
    },
    {
      question: "How much does CFA Level 1 cost vs. FRM Part 1?",
      answer:
        "CFA Level I is USD 1,140 early or 1,490 standard, with no enrollment fee. FRM Part I is USD 600 early or 800 standard, plus a one-time USD 400 enrollment fee for new candidates.",
    },
    {
      question: "When are the 2027 FRM Part 1 exam dates?",
      answer: "8–13 May, 13–14 August (morning sessions) and 13–18 November 2027.",
    },
    {
      question: "What are the CFA Level 1 topic weights for 2027?",
      answer:
        "Ethics 10–15%; Quantitative Methods, FSA, Equity and Fixed Income 11–14% each; Portfolio Construction 8–12%; Economics, Corporate Issuers, Derivatives and Alternative Investments 6–9% each.",
    },
    {
      question: "How long does it take to study for CFA Level 1 or FRM Part 1?",
      answer:
        "CFA Institute reports over 300 hours per level for successful candidates; GARP reports about 240 hours on average for FRM Part I.",
    },
    {
      question: "Do CFA Level 1 and FRM Part 1 publish a passing score?",
      answer:
        "Neither publishes a fixed percentage. CFA Institute sets a minimum passing score; GARP reports pass/fail with quartile feedback.",
    },
    {
      question: "What do I need after passing FRM Part 1?",
      answer:
        "Pass Part II within four years, then submit two years of relevant full-time work experience within ten years of sitting Part II.",
    },
  ],
  bottomLine:
    "Pick the program whose full credential matches your target roles: CFA for investment analysis, FRM for risk. Sources: [CFA Institute Level I exam](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam), [CFA Program dates and fees](https://www.cfainstitute.org/programs/cfa-program/dates-fees), [CFA exam results](https://www.cfainstitute.org/programs/cfa-program/candidate-resources/exam-results), [GARP FRM program and exams](https://www.garp.org/frm/program-exams) and [GARP fees and payments](https://www.garp.org/frm/fees-payments), checked " +
    CHECKED +
    ".",
};
