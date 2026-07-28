import type { BlogPostDraft } from "../types";

export const cfaVsFrmPost: BlogPostDraft = {
  slug: "cfa-level-1-vs-frm-part-1-which-to-choose",
  title: "CFA Level 1 vs FRM Part 1: If You Can Only Study for One",
  titleTag: "CFA Level 1 vs FRM Part 1: Which to Choose If You Can Only Pick One",
  metaDescription:
    "CFA Level 1 costs $1,140 and takes 300 hours. FRM Part 1 costs $1,000 and takes 200 hours. Here is which one moves your resume, and which one is a half-finished credential.",
  publishedAt: "2026-07-28",
  eyebrow: "Finance credentials · CFA vs FRM",
  clusterId: "cfa-frm",
  relatedSlugs: [
    "how-long-anki-decks-stay-current-exam-shelf-life",
    "finra-sie-exam-prep-why-people-fail",
  ],
  intro:
    "**Most finance professionals do not have 1,500 hours and $5,000 for both the CFA charter and the FRM.** They have one slot — one exam, one credential, one resume line — and it needs to count. CFA Level 1 and FRM Part 1 look similar on paper: multiple-choice, computer-based, quantitative. They lead to different doors. CFA Level 1 starts a three-level marathon toward portfolio management and equity research. FRM Part 1 starts a two-part sprint toward risk management and regulatory compliance. One is generalist; the other is specialist. Stop after Level 1 or Part 1 and the market treats them very differently. This guide covers real cost, time, pass rates, and employer filters so you do not waste six months on the wrong building.",
  mockSlug: "cfa-level-1-readiness-check",
  deckSlug: "cfa-level-1-anki-deck",
  cta: {
    mockLabel: "Take the free CFA Level 1 readiness check",
    deckLabel: "Drill CFA Level 1 with Anki",
    summary:
      "Not sure where your quantitative gaps are? Take the free CFA Level 1 readiness check (also try FRM Part 1 readiness if risk is your path). Then drill weak topics with the matching Anki deck before you commit $1,000+ to registration.",
  },
  sections: [
    {
      heading: "What Each Exam Actually Tests",
      blocks: [
        {
          type: "table",
          caption: "CFA Level 1 vs FRM Part 1 at a glance",
          headers: ["", "CFA Level 1", "FRM Part 1"],
          rows: [
            [
              "Focus",
              "Investment analysis, financial reporting, equity, fixed income, derivatives, portfolio management, ethics",
              "Risk foundations, quantitative analysis, financial markets and products, valuation and risk models",
            ],
            [
              "Questions",
              "180 multiple-choice (two sessions of 2h 15m)",
              "100 multiple-choice (one 4-hour session)",
            ],
            ["Time limit", "4 hours 30 minutes total", "4 hours"],
            [
              "Passing score",
              "Not published; estimated ~70%",
              "Not published; estimated ~60–65%",
            ],
            ["Pass rate", "~36–43%", "~45–50%"],
            [
              "Exam fee",
              "$1,140–$1,590 (early vs standard registration)",
              "$400 enrollment + $600–$800 exam fee",
            ],
            ["Study hours", "300+ hours", "200–250 hours"],
            [
              "Prerequisites",
              "Final-year bachelor’s or equivalent",
              "None",
            ],
            [
              "Work experience for full credential",
              "4,000 hours (for charter)",
              "2 years (for certification)",
            ],
          ],
        },
        {
          type: "p",
          text: "The key difference is destination, not format. CFA Level 1 teaches you to read a balance sheet and calculate WACC. FRM Part 1 teaches VaR and credit default probability. Investment banking or asset management → CFA language. Risk analytics, treasury, or model validation → FRM language.",
        },
      ],
    },
    {
      heading: "The Time and Money Reality",
      blocks: [
        {
          type: "ul",
          items: [
            "**CFA Level 1 first-year cost:** $1,140–$1,590 exam + $300–$500 materials ≈ **$1,440–$2,090**",
            "**FRM Part 1 first-year cost:** $400 enrollment + $600–$800 exam + $200–$400 materials ≈ **$1,200–$1,600**",
          ],
        },
        {
          type: "p",
          text: "CFA is more expensive but not dramatically so. The real cost is time: 300 hours vs ~200. On a 50-hour work week, that is roughly 15 weeks vs 10 weeks of serious study.",
        },
        {
          type: "p",
          text: "**Hidden cost:** Neither is a terminal credential. CFA Level 1 alone does not make you a charterholder; FRM Part 1 alone does not make you an FRM. Pass and stop and you get “CFA Level I Candidate” or “FRM Part I Passed” — intent signals, not senior-role openers. Full CFA: ~2.5–4 years and ~900 hours. Full FRM: ~1–2 years and ~500 hours.",
        },
      ],
    },
    {
      heading: "Pass Rates: Why CFA Level 1 Looks Harder",
      blocks: [
        {
          type: "p",
          text: "CFA Level 1 pass rates sit around 36–43%; FRM Part 1 around 45–50%. CFA looks harder on paper. The pool explains more than the content.",
        },
        {
          type: "p",
          text: "CFA’s enormous candidate pool includes students, career-changers, and people who underestimated volume. FRM self-selects for quantitative aptitude — many already work in risk or have strong math backgrounds. Comfortable with statistics, probability, and calculus-style thinking? FRM Part 1 often feels easier. Stronger in accounting, economics, and qualitative analysis? CFA Level 1 feels more natural.",
        },
      ],
    },
    {
      heading: "Who Should Choose CFA Level 1",
      blocks: [
        {
          type: "ul",
          items: [
            "You want equity research, portfolio management, IB, wealth management, or corporate finance",
            "Target JDs say “CFA preferred” or “progress toward CFA charter”",
            "You can commit to the full program — or at least Level 2 — because Level 1 alone is not a differentiator in competitive roles",
            "You prefer breadth: CFA covers 10 topic areas; FRM Part 1 covers 4",
            "You work at an asset manager, hedge fund, pension fund, or sell-side research desk",
          ],
        },
        {
          type: "p",
          text: "**The risk:** Many pass Level 1, fail Level 2, and stall. First-attempt passage of all three levels is uncommon. Unsure you can commit ~900 hours over ~3 years? FRM is often the safer bet.",
        },
      ],
    },
    {
      heading: "Who Should Choose FRM Part 1",
      blocks: [
        {
          type: "ul",
          items: [
            "You want risk management, model validation, quant analysis, treasury, or regulatory compliance",
            "Target JDs say “FRM preferred” or mention Basel, VaR, stress testing, or credit risk",
            "You need a credential fast — full FRM can be done in about a year; full CFA cannot",
            "Strong quantitative background (math, engineering, physics, statistics)",
            "You work at a bank, insurer, consulting firm, or corporate treasury",
          ],
        },
        {
          type: "p",
          text: "**The risk:** FRM is narrower. Later move into portfolio management and you still need equity valuation and financial statement analysis via CFA or self-study.",
        },
      ],
    },
    {
      heading: "The Overlap Trap",
      blocks: [
        {
          type: "p",
          text: "CFA and FRM share roughly 30–40% conceptual overlap: quantitative methods, fixed income, derivatives, basic portfolio theory. That tempts people to study both at once.",
        },
        {
          type: "p",
          text: "Do not. Overlap is conceptual, not exam-question identical. CFA tests WACC and dividend discount models; FRM tests VaR and expected shortfall. Both use duration — CFA prices the bond; FRM models default. Vocabulary, notation, and depth differ. Pick the exam that matches your current or next job. Do not split the difference.",
        },
      ],
    },
    {
      heading: "What Employers Actually Filter For",
      blocks: [
        {
          type: "ul",
          items: [
            "**“CFA Level 1” / “CFA candidate”** shows up in entry-level equity research, PM associate, and IB analyst roles — nice-to-have. Must-haves are usually “charterholder” or “Level II candidate.”",
            "**“FRM Part 1”** rarely stands alone. Employers who care want the full FRM or Part 2 passed. “FRM” / “progress toward FRM” appears often in risk analyst, model validation, and treasury roles.",
          ],
        },
        {
          type: "p",
          text: "**Salary ceilings (illustrative senior ranges):** CFA charterholders often $100k–$300k+ in PM and equity research; FRM holders $80k–$250k+ in risk and quant; dual holders can see 25–40% premiums in hybrid roles. As a one-off Level 1 / Part 1, neither moves salary much — they signal intent. The full charter or certification pays.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is CFA Level 1 harder than FRM Part 1?",
      answer:
        "CFA Level 1 has a lower pass rate (~36–43% vs ~45–50%), largely from a broader, less-prepared pool. FRM Part 1 is more intensely quantitative. Strong in math → FRM often feels easier. Strong in accounting → CFA often feels easier.",
    },
    {
      question: "How much does CFA Level 1 cost vs. FRM Part 1?",
      answer:
        "CFA Level 1: $1,140–$1,590 exam + $300–$500 materials ≈ $1,440–$2,090. FRM Part 1: $400 enrollment + $600–$800 exam + $200–$400 materials ≈ $1,200–$1,600.",
    },
    {
      question: "How long does it take to study for CFA Level 1?",
      answer:
        "300+ hours. Most candidates spread this over 4–6 months part-time.",
    },
    {
      question: "How long does it take to study for FRM Part 1?",
      answer:
        "200–250 hours. Most candidates spread this over 2–3 months part-time.",
    },
    {
      question: "Can I put CFA Level 1 on my resume?",
      answer:
        "Yes — as “CFA Level I Candidate” or “Passed CFA Level I.” It signals intent but does not carry charter weight. Some employers filter for Level II or higher.",
    },
    {
      question: "Can I put FRM Part 1 on my resume?",
      answer:
        "Yes — as “FRM Part I Passed” or “FRM Candidate.” Risk-focused employers value it more than generalist employers.",
    },
    {
      question: "Should I do both CFA and FRM?",
      answer:
        "Eventually, yes, if you target senior roles that bridge investment and risk (CIO, CRO, multi-asset head). Do not sit both entry exams at once. Finish one, then use the 30–40% overlap to accelerate the second.",
    },
    {
      question: "Which has better salary potential: CFA or FRM?",
      answer:
        "CFA has a higher ceiling in many front-office PM and equity research roles. FRM has a strong ceiling in risk and quant. Dual holders often command the highest premiums in hybrid seats.",
    },
    {
      question: "What if I fail CFA Level 1 or FRM Part 1?",
      answer:
        "CFA Level 1 is typically offered four times per year (Feb, May, Aug, Nov). FRM Part 1 is typically offered three times (May, Aug, Nov). Both allow retakes; you pay registration again. Confirm current windows with CFA Institute and GARP.",
    },
  ],
  bottomLine:
    "If you can only study for one, choose the credential that matches your job — not the one that sounds more prestigious. CFA Level 1 is the right first step for investment and research roles. FRM Part 1 is the right first step for risk and quantitative roles. Neither is a destination; both are entry points. The wrong entry point costs six months and about $1,500 to learn you are in the wrong building.",
};
