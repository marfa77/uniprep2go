import type { BlogPostDraft } from "../types";

export const memorizeEpa608RefrigerantsPost: BlogPostDraft = {
  slug: "memorize-epa-608-refrigerant-numbers-method",
  title: "How to Memorize Refrigerant Numbers for EPA 608: A Method That Actually Works",
  titleTag: "Memorize EPA 608 Refrigerant Numbers: Method That Works 2026",
  metaDescription:
    "R-22, R-410A, R-134a, R-404A — the EPA 608 exam throws 20+ refrigerant numbers at you. Here is the ASHRAE numbering system decoded, plus the grouping trick that makes them stick.",
  publishedAt: "2026-07-28",
  eyebrow: "EPA 608 · HVAC certification",
  clusterId: "epa-608",
  relatedSlugs: [
    "epa-608-type-1-vs-type-2-which-first",
    "epa-608-practice-test-what-to-expect",
  ],
  intro:
    "**The EPA 608 Type II exam lists refrigerants by the dozen: R-22, R-410A, R-404A, R-134a, R-402A, R-407C, R-500, R-502, R-123, R-11.** Most technicians flashcard them raw — “R-22 = HCFC” — and forget half by exam day. There is a better way. The ASHRAE numbering system encodes chemical structure into digits. Learn the code once, group by family, and you can classify refrigerants without memorizing a random list.",
  mockSlug: "epa-608-readiness-check",
  deckSlug: "hvac-epa-608-anki-deck",
  cta: {
    mockLabel: "Take the free EPA 608 readiness check",
    deckLabel: "Lock in refrigerant families with Anki",
    summary:
      "Ready to test refrigerant knowledge under pressure? Take the free EPA 608 readiness check on classification, pressure groups, and recovery — then lock in the families with the EPA 608 Anki deck.",
  },
  sections: [
    {
      heading: "The ASHRAE Numbering System (The Code Behind the R-Number)",
      blocks: [
        {
          type: "p",
          text: "Every refrigerant number follows ASHRAE Standard 34. Digits are calculated from the chemical formula, reading from right to left:",
        },
        {
          type: "table",
          caption: "ASHRAE digit positions",
          headers: ["Position", "Rule"],
          rows: [
            ["First digit from the right", "Number of fluorine (F) atoms"],
            ["Second digit from the right", "Number of hydrogen (H) atoms + 1"],
            [
              "Third digit from the right",
              "Number of carbon (C) atoms – 1 (omitted if zero)",
            ],
            [
              "Fourth digit from the right",
              "Number of unsaturated carbon-carbon bonds (omitted if zero)",
            ],
          ],
        },
        {
          type: "p",
          text: "If bromine is present, a capital **B** follows with the bromine count. Isomers use lowercase **a, b, c** (most symmetrical = no letter).",
        },
        {
          type: "topics",
          items: [
            {
              title: "Example: R-134a",
              body: "Digits 1–3–4 → 4 fluorine, 2 hydrogen (3−1), 2 carbon (1+1) → C₂H₂F₄. No chlorine → HFC. The lowercase “a” is the isomer label.",
            },
            {
              title: "Example: R-22",
              body: "Digits 2–2 → 2 fluorine, 1 hydrogen (2−1), 1 carbon → CHClF₂. Chlorine + hydrogen → HCFC.",
            },
            {
              title: "Example: R-12",
              body: "Digits 1–2 → 2 fluorine, 0 hydrogen (1−1), 1 carbon → CCl₂F₂. Chlorine, no hydrogen → CFC.",
            },
          ],
        },
        {
          type: "p",
          text: "You do not need to calculate formulas on the EPA exam. Knowing digits encode fluorine and hydrogen helps you see patterns instead of random numbers.",
        },
      ],
    },
    {
      heading: "The Grouping Method: Stop Memorizing Individual Numbers",
      blocks: [
        {
          type: "p",
          text: "The exam tests family membership more than isolated recall — because each family has different environmental rules, recovery requirements, and phase-out dates. Group by family first. Memorize family characteristics. Then attach numbers.",
        },
        {
          type: "topics",
          items: [
            {
              title: "CFCs — no hydrogen, high ozone depletion",
              body: "R-11, R-12, R-113, R-114, R-115, R-500, R-502. Production banned; existing stock can be reclaimed. Hook: “CFC = Completely Fazed Out.”",
            },
            {
              title: "HCFCs — has hydrogen, moderate ozone depletion",
              body: "R-22, R-123, R-124. R-22 phased out for new equipment in 2010; production ban in 2020. Hook: “Has Chlorine, Has Hydrogen, Halfway Out.” R-123 is a common Type III low-pressure chiller refrigerant.",
            },
            {
              title: "HFCs — no chlorine, no ODP but high GWP",
              body: "R-134a, R-410A, R-404A, R-407A/B/C, R-402A/B. Common modern replacements for R-22 and R-12. Hook: “High-tech, Future Coolant.”",
            },
            {
              title: "Very-high-pressure",
              body: "R-13, R-23, R-503. Hook: “13, 23, 503 — small molecules, extreme pressure.”",
            },
            {
              title: "Low-pressure (Type III)",
              body: "R-11, R-123. Hook: “11 and 123 — chillers, low pressure, big systems.”",
            },
          ],
        },
      ],
    },
    {
      heading: "The Pressure Classification Table (What the EPA Actually Tests)",
      blocks: [
        {
          type: "table",
          caption: "Pressure classes commonly drilled on Type II",
          headers: ["Pressure class", "Refrigerants", "Equipment type"],
          rows: [
            [
              "Medium-pressure",
              "R-12, R-114, R-134a, R-401A, R-500",
              "Older commercial systems",
            ],
            [
              "High-pressure",
              "R-22, R-502, R-402A/B, R-404A, R-407A/B/C, R-410A",
              "Residential AC, commercial refrigeration, heat pumps",
            ],
            [
              "Very-high-pressure",
              "R-13, R-23, R-503",
              "Specialized industrial systems",
            ],
          ],
        },
        {
          type: "p",
          text: "**Memory trick:** no hundreds digit or 1xx → often medium/low; 4xx/5xx/7xx blends → high-pressure; 13, 23, 503 → very high.",
        },
      ],
    },
    {
      heading: "Cylinder Color Codes (Secondary Confirmation)",
      blocks: [
        {
          type: "table",
          caption: "Classic cylinder colors the exam may test",
          headers: ["Color", "Refrigerant"],
          rows: [
            ["Green", "R-22 (HCFC-22)"],
            ["Light blue", "R-134a (HFC-134a)"],
            ["White", "R-12 (CFC-12)"],
          ],
        },
        {
          type: "p",
          text: "Hook: “Green means go — R-22 was the long-time standard.” “Light blue means newer — R-134a replaced R-12 in many systems.” “White means old — R-12 is the grandfather refrigerant.” Mixing refrigerants contaminates reclaim stock — that is why colors get tested.",
        },
      ],
    },
    {
      heading: "The 5-Step Study Method",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Step 1: Learn family rules, not numbers",
              body: "Spend 20 minutes on why CFCs have no hydrogen, HCFCs have hydrogen + chlorine, and HFCs have hydrogen but no chlorine.",
            },
            {
              title: "Step 2: Build family-tree flashcards",
              body: "One card per family — front: “CFC — no hydrogen, high ODP, banned”; back: the member list. Do not make one card per refrigerant.",
            },
            {
              title: "Step 3: Attach the pressure layer",
              body: "Add fields like “High-pressure HFCs: R-410A, R-404A, R-407C…” and “Medium-pressure: R-134a, R-401A.”",
            },
            {
              title: "Step 4: Drill with mixed practice",
              body: "On every number, classify aloud: “R-407C — HFC, high-pressure, blend.” Saying it forces retrieval, not recognition.",
            },
            {
              title: "Step 5: Test under time pressure",
              body: "Aim for under 2 seconds per classification. On a timed Type II section, hesitation on “Is R-123 CFC or HCFC?” burns the clock.",
            },
          ],
        },
      ],
    },
    {
      heading: "The Most Common Exam Traps",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Trap 1: R-500 and R-502 look like modern blends",
              body: "They are regulated as CFCs because they contain CFC components (R-12 / R-115). The EPA tests this specifically.",
            },
            {
              title: "Trap 2: R-134a’s lowercase “a”",
              body: "It marks the isomer. Family stays HFC; pressure stays medium. Do not let the letter confuse you.",
            },
            {
              title: "Trap 3: R-410A vs R-22 pressures",
              body: "R-410A is a high-pressure HFC replacement for R-22 and runs roughly 60% higher pressure. Know the class and role even if you are not asked for blend components.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How does the ASHRAE refrigerant numbering system work?",
      answer:
        "The rightmost digit is fluorine atoms. The second digit from the right is hydrogen atoms + 1. The third is carbon atoms − 1 (omitted if zero). The fourth is unsaturated bonds (omitted if zero). Letters indicate isomers or bromine content.",
    },
    {
      question: "Is R-22 a CFC or HCFC?",
      answer:
        "HCFC. It contains hydrogen, chlorine, and fluorine. CFCs contain no hydrogen. HFCs contain no chlorine.",
    },
    {
      question: "What pressure class is R-410A?",
      answer:
        "High-pressure. It is an HFC blend used in modern residential and light commercial air conditioning.",
    },
    {
      question: "What color is the R-22 cylinder?",
      answer:
        "Green. R-134a cylinders are light blue. R-12 cylinders are white.",
    },
    {
      question: "Are R-500 and R-502 CFCs?",
      answer:
        "Yes. Although they are blends, they contain CFC components and are regulated as CFCs.",
    },
    {
      question: "What is the difference between R-407A, R-407B, and R-407C?",
      answer:
        "They are HFC blends with different proportions of R-32, R-125, and R-134a. For EPA 608 purposes, they are all high-pressure HFCs. The exam does not usually test blend composition ratios.",
    },
    {
      question: "How many refrigerant numbers do I need to know for EPA 608?",
      answer:
        "Approximately 15–20 core refrigerants appear regularly. Focus on families (CFC, HCFC, HFC) and pressure classes rather than memorizing every number in isolation.",
    },
    {
      question: "What is the best way to memorize refrigerant numbers?",
      answer:
        "Group by family, attach pressure class, and use cylinder color codes as visual anchors. Make family cards and drill classification speed — not one flashcard per refrigerant.",
    },
  ],
  bottomLine:
    "Refrigerant numbers are not phone numbers. The ASHRAE system encodes chemistry into digits, and the EPA exam encodes regulatory logic into families. Stop memorizing R-22, R-410A, and R-134a as isolated facts. Learn the family rules, attach pressure classes, and drill until you can classify any refrigerant in under 2 seconds — that speed is the difference between finishing with review time and guessing on the last five questions.",
};
