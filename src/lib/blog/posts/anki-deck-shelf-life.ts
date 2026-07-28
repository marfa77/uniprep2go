import type { BlogPostDraft } from "../types";

export const ankiDeckShelfLifePost: BlogPostDraft = {
  slug: "how-long-anki-decks-stay-current-exam-shelf-life",
  title: "How Long Do Anki Decks Stay Current?",
  titleTag: "How Long Do Anki Decks Stay Current? Exam-by-Exam Shelf Life 2026",
  metaDescription:
    "A 2023 LEED deck is worthless in 2026. A 2020 FINRA deck is still fine. Here is the exact shelf life for every major exam and how to spot a stale deck before you waste 200 hours on it.",
  publishedAt: "2026-07-28",
  eyebrow: "Study tools · Deck freshness",
  clusterId: "anki-study",
  relatedSlugs: ["anki-vs-quizlet-professional-exam-prep"],
  intro:
    "**Anki decks do not rot like milk — they rot like bread: slowly at first, then all at once when the exam body updates the syllabus.** Most sellers never put an expiration date on the product. A student buys a “LEED GA 2024” deck in March 2026, studies six weeks, and sits for LEED v5 — which launched two months earlier — and fails because roughly 40% of the content changed. This guide maps real shelf life by credential, the red flags of a stale deck, and the checkpoints to run before you import a single `.apkg`.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Try a free readiness check",
    deckLabel: "Browse dated Anki decks in the catalog",
    summary:
      "Buying for a 2026 exam? UniPrep2Go decks are mapped to current content outlines. Browse the catalog, then verify with a free readiness check — no guesswork on version.",
  },
  sections: [
    {
      heading: "The Shelf Life Spectrum: Stable vs. Volatile Exams",
      blocks: [
        {
          type: "p",
          text: "Not all exams change at the same speed. Some bodies rewrite tests every decade. Others update annually.",
        },
        {
          type: "table",
          caption: "Typical Anki deck shelf life by exam",
          headers: ["Exam", "Typical deck shelf life", "Why it changes"],
          rows: [
            [
              "FINRA SIE / Series 7",
              "3–4 years",
              "FINRA tweaks content outlines slowly. The SIE launched in 2018 with only minor updates since.",
            ],
            [
              "LEED Green Associate",
              "1–2 years",
              "USGBC launched LEED v5 in 2025. The v4 exam ended April 26, 2026; v5 beta launched April 28, 2026. A v4 deck is obsolete.",
            ],
            [
              "EPA 608",
              "2–3 years",
              "The 2025 A2L refrigerant transition (R-454B, R-32 replacing R-410A) and new GWP limits require updated safety protocols. 2023 decks miss this.",
            ],
            [
              "ServSafe Manager",
              "2–3 years",
              "9th Edition (2026) added sesame as the 9th major allergen, expanded Active Managerial Control, and replaced ALERT with Employees FIRST.",
            ],
            [
              "NEBOSH IGC",
              "3–5 years",
              "Syllabi update periodically, not annually. Core framework (plan-do-check-act, legal requirements) is stable.",
            ],
            [
              "CFA Level 1",
              "1 year",
              "CFA Institute updates the curriculum every year. A prior-cycle deck is usable but will have gaps.",
            ],
            [
              "Real estate (state-specific)",
              "1–2 years",
              "State laws shift faster than national content — California disclosures, Florida DBPR, Texas licensing acts.",
            ],
          ],
        },
      ],
    },
    {
      heading: "The LEED v5 Example: What Obsolescence Looks Like",
      blocks: [
        {
          type: "p",
          text: "LEED is the clearest case of deck death. Timeline:",
        },
        {
          type: "ul",
          items: [
            "**April 26, 2026:** last day to take the LEED v4 Green Associate exam",
            "**April 28, 2026:** LEED v5 beta exam launches",
            "**October 2026:** LEED v5 final exam goes live",
          ],
        },
        {
          type: "p",
          text: "v5 is a restructuring, not a refresh. Content moved from the familiar credit categories (Location & Transportation, Sustainable Sites, Water Efficiency, and so on) to three new pillars: **Decarbonization (~50%)**, **Quality of Life (~30%)**, and **Environmental Stewardship (~20%)**. Carbon lifecycle assessment, embodied carbon, and electrification are heavily tested. A v4 deck has almost no cards on those topics. If you bought a LEED GA deck in 2024–2025 and never checked the version, you are studying for an exam that no longer exists.",
        },
      ],
    },
    {
      heading: "The EPA 608 A2L Transition: Regulation-Driven Obsolescence",
      blocks: [
        {
          type: "p",
          text: "EPA 608 decks from 2023 or earlier are partially stale because of the 2025 refrigerant phase-down:",
        },
        {
          type: "ul",
          items: [
            "**January 1, 2025:** ban on manufacturing new equipment with refrigerants above 750 GWP — R-410A (GWP 2,088) is out for new units",
            "**2025–2026:** A2L refrigerants (R-454B, R-32) enter the market — mildly flammable, needing detection systems, spark-proof wiring, and specialized recovery gear",
            "**Ongoing:** technicians need updated training and certification for A2L handling",
          ],
        },
        {
          type: "p",
          text: "An old deck still teaches R-410A as the standard R-22 replacement. It skips A2L classification, GWP limits, and the new safety requirements. On a 2026 exam, that is lost points.",
        },
      ],
    },
    {
      heading: "The ServSafe 9th Edition: Small Changes, Big Consequences",
      blocks: [
        {
          type: "p",
          text: "The 2026 ServSafe Manager exam (9th Edition) made three updates that invalidate many pre-2024 decks:",
        },
        {
          type: "ol",
          items: [
            "**Sesame is the 9th major food allergen.** The list was eight; it is now nine. A deck that says “the eight major allergens…” is wrong.",
            "**Active Managerial Control (AMC) has a larger footprint.** Old decks may name AMC in passing without drilling it.",
            "**Employees FIRST replaces ALERT** as the food defense framework. Any ALERT card is outdated.",
          ],
        },
        {
          type: "p",
          text: "These are tested directly. A 2022 deck can cost 3–5 questions — enough to drop below a 75% pass threshold.",
        },
      ],
    },
    {
      heading: "FINRA SIE: The Stable Exception",
      blocks: [
        {
          type: "p",
          text: "The SIE is the opposite of LEED. FINRA launched it in 2018 and has made only incremental changes. The October 2025 update reduced unscored questions from 10 to 5 and refined some regulatory content, but core topics — capital markets, products, trading, regulations — have not shifted.",
        },
        {
          type: "p",
          text: "A well-built SIE deck from 2022 is still roughly 90%+ accurate in 2026. Formulas, product definitions, and frameworks are stable. Patch for new rules (T+1 settlement replacing T+2 in May 2024) and minor thresholds. You can add 10–15 cards yourself. You cannot patch a LEED v4 deck for the v5 exam.",
        },
      ],
    },
    {
      heading: "How to Check If Your Deck Is Stale (The 3-Minute Audit)",
      blocks: [
        {
          type: "p",
          text: "Before you study a single card, run this checklist:",
        },
        {
          type: "steps",
          items: [
            {
              title: "1. Check the exam body’s official content outline",
              body: "Download the latest outline (FINRA, USGBC, EPA, NRA, etc.). Compare it to your deck’s table of contents. A missing outline section is a gap.",
            },
            {
              title: "2. Check the deck’s last update date",
              body: "Reputable sellers list it. If missing, ask. If they cannot give a date, assume the deck is old.",
            },
            {
              title: "3. Check regulatory changes in the last 18 months",
              body: "Search “[Exam name] changes 2025 2026.” Major updates (LEED v5, EPA A2L, ServSafe 9th Edition) that post-date your deck mean it is stale.",
            },
            {
              title: "4. Spot-check 10 random cards",
              body: "Pick high-risk topics (regulations, temperatures, allergen lists, refrigerant numbers). Verify against official sources. Two or more wrong → compromised.",
            },
            {
              title: "5. Look for version numbers in the title",
              body: "“LEED GA v4” and “EPA 608 2023” are warnings. “FINRA SIE 2024” is probably fine. “ServSafe Manager 7th Edition” is a red flag if the exam is now 9th Edition.",
            },
          ],
        },
      ],
    },
    {
      heading: "When to Patch vs. When to Replace",
      blocks: [
        {
          type: "table",
          caption: "Patch or replace?",
          headers: ["Situation", "Action"],
          rows: [
            [
              "1–2 minor regulatory changes (e.g. T+1 settlement, new FINRA fee)",
              "Patch — add 5–10 new cards",
            ],
            [
              "New edition of exam (e.g. ServSafe 8th → 9th)",
              "Replace — framework may be similar, tested details shift",
            ],
            [
              "Complete syllabus rewrite (e.g. LEED v4 → v5)",
              "Replace immediately — do not try to patch",
            ],
            [
              "New technology or safety standard (e.g. EPA A2L refrigerants)",
              "Replace or heavy patch (20+ new cards)",
            ],
            [
              "No changes in 3+ years (e.g. NEBOSH IGC)",
              "Likely fine — confirm with a 10-card spot-check",
            ],
          ],
        },
      ],
    },
    {
      heading: "The Cost of a Stale Deck",
      blocks: [
        {
          type: "p",
          text: "A stale deck wastes money and time — the only resource you cannot replace.",
        },
        {
          type: "ul",
          items: [
            "**LEED v4 deck + 6 weeks + ~$250 exam fee = fail.** Restudy with v5 and pay again → ~12 weeks and ~$500.",
            "**ServSafe old deck + 2 weeks + ~$100 exam fee = fail.** Restudy and retake → ~4 weeks and ~$200.",
            "**FINRA SIE old deck + 4 weeks + ~$80 exam fee = probably pass.** You might miss a few new-rule items and still clear 70%.",
          ],
        },
        {
          type: "p",
          text: "Volatile exams demand current decks. Stable exams tolerate older ones.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How long do Anki decks last for professional exams?",
      answer:
        "It depends on the exam. Stable exams like FINRA SIE can use 3–4 year-old decks. Volatile exams like LEED or EPA 608 need decks updated within 12–18 months of major regulatory changes. Always check the exam body’s latest content outline before buying.",
    },
    {
      question: "Is a 2023 LEED GA deck still good in 2026?",
      answer:
        "No. LEED v4 exams ended April 26, 2026. LEED v5 launched April 28, 2026, with a restructured syllabus focused on decarbonization. A v4 deck will not cover roughly 40–50% of v5 content.",
    },
    {
      question: "Do EPA 608 decks need updating for A2L refrigerants?",
      answer:
        "Yes. The 2025 phase-down of high-GWP refrigerants and introduction of A2L refrigerants (R-454B, R-32) changed safety protocols and equipment requirements. Decks from before 2024 will not cover this material.",
    },
    {
      question: "Can I use an old ServSafe deck for the 2026 exam?",
      answer:
        "Only if it covers the 9th Edition. The 2026 exam added sesame as the 9th allergen, expanded Active Managerial Control, and replaced ALERT with Employees FIRST. Pre-2024 decks will have gaps.",
    },
    {
      question: "How do I know if my Anki deck is outdated?",
      answer:
        "Check three things: (1) the deck’s last update date, (2) the exam body’s current content outline, and (3) regulatory changes in the last 18 months. If the deck predates a major exam revision, it is outdated.",
    },
    {
      question: "Should I buy a new deck for every exam retake?",
      answer:
        "Not necessarily. If you failed from anxiety or timing, the deck may be fine. If you failed from content gaps, check freshness before restudying. If the exam changed since your last attempt, buy a new deck.",
    },
    {
      question: "Can I update an old deck myself instead of buying a new one?",
      answer:
        "Yes, for minor changes — a threshold shift or one new topic can be 10–20 new cards. For major syllabus rewrites (LEED v4 → v5), a professionally updated deck is faster and more reliable.",
    },
    {
      question: "Do NEBOSH decks go out of date?",
      answer:
        "Rarely. NEBOSH updates syllabi every 3–5 years. The core framework (management systems, risk assessment, legal requirements) is stable. A 2022 NEBOSH IGC deck is likely still accurate in 2026.",
    },
  ],
  bottomLine:
    "Anki decks are snapshots of an exam at a specific moment — not timeless. A LEED v4 deck was excellent in 2024 and worthless in 2026. A FINRA SIE deck from 2022 is still useful today. Before you commit 100+ hours to spaced repetition, spend 10 minutes verifying the exam has not moved on without you. The $30 you save on a discounted old deck is not worth the exam fee and weeks of restudy after a fail.",
};
