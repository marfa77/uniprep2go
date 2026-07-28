import type { BlogPostDraft } from "../types";

export const spainCitizenshipCcseDelePost: BlogPostDraft = {
  slug: "spain-citizenship-ccse-dele-a2-two-exams",
  title: "Spain Citizenship: Two Exams, Not One",
  titleTag: "Spain Citizenship Exams 2026: CCSE vs DELE A2 & How to Pass Both",
  metaDescription:
    "Spain makes you pass two separate exams: CCSE for civics and DELE A2 for language. Here is the exact format, the €85 vs €130 cost, and why failing one skill on DELE forces a full retake.",
  publishedAt: "2026-07-28",
  eyebrow: "Spain · CCSE + DELE A2",
  clusterId: "spain-citizenship",
  relatedSlugs: [
    "italy-citizenship-b1-test-cils-celi-not-civics",
    "portugal-nationality-test-2026-new-civic-exam",
    "belgium-citizenship-test-flanders-vs-wallonia",
  ],
  intro:
    "**Most European countries ask for one gate: language, civics, or a course. Spain asks for two** — both under Instituto Cervantes. CCSE proves constitution, history, and culture. DELE A2 proves basic Spanish. Different formats, fees, calendars, and retake rules. Mix them up and your file stalls for months. This guide puts both exams side by side, lists common exemptions, and explains the DELE scoring trap that forces full retakes.",
  mockSlug: "ccse-espana-readiness-check",
  deckSlug: "dele-a2-spanish-anki-deck",
  cta: {
    mockLabel: "Take the free CCSE España readiness check",
    deckLabel: "Get the DELE / SIELE Spanish Anki deck",
    summary:
      "Drill civics with the free CCSE readiness check (Prep2Go-sourced). Build DELE A2 vocabulary with the Spanish Anki deck, join the DELE+CCSE bundle waitlist, and browse Prep2Go before you pay ~€215 for both official exams.",
    extraLinks: [
      {
        href: "/decks/dele-a2-ccse-spanish-citizenship-bundle",
        label: "DELE + CCSE Spanish citizenship Anki bundle (waitlist)",
      },
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "The Two-Exam Requirement",
      blocks: [
        {
          type: "table",
          caption: "CCSE vs DELE A2",
          headers: ["", "CCSE", "DELE A2"],
          rows: [
            [
              "Full name",
              "Conocimientos Constitucionales y Socioculturales de España",
              "Diploma de Español como Lengua Extranjera",
            ],
            [
              "What it tests",
              "Constitution, government, culture, history, daily life",
              "Spanish: reading, writing, listening, speaking",
            ],
            [
              "Format",
              "25 MCQ / true-false",
              "4 sections with multiple tasks",
            ],
            ["Duration", "45 minutes", "~2.5–3 hours"],
            [
              "Passing score",
              "15/25 (60%)",
              "104/200 overall + group mins + per-skill mins",
            ],
            [
              "Cost",
              "€85 (includes 2 attempts)",
              "~€130–€138 (1 attempt)",
            ],
            [
              "Frequency",
              "Last Thursday most months (not Aug/Dec)",
              "Fixed dates through the year",
            ],
            ["Validity", "4 years", "Lifetime"],
            [
              "Exemptions",
              "Minors, legal incapacity, ESO in Spain",
              "Spanish-speaking nationals, higher DELE, ESO in Spain",
            ],
          ],
        },
        {
          type: "p",
          text: "**Critical:** CCSE includes a free second attempt within ~18 months. DELE does not. Schedule DELE first — higher retake cost and longer score wait.",
        },
      ],
    },
    {
      heading: "CCSE: The Easier Half",
      blocks: [
        {
          type: "p",
          text: "CCSE draws from a published bank of roughly 300 questions. Instituto Cervantes publishes the Manual CCSE free — study it and you will recognise exam items.",
        },
        {
          type: "ul",
          items: [
            "~60% government, constitution, rights and duties",
            "~40% culture, history, and society",
            "Sample: “What is the name of the Spanish Parliament?” → Las Cortes Generales",
            "Pass: 15/25. Most prepared candidates pass first try",
            "Register at examenes.cervantes.es; book 4–5 weeks ahead",
          ],
        },
      ],
    },
    {
      heading: "DELE A2: The Trap Is in the Scoring",
      blocks: [
        {
          type: "table",
          caption: "DELE A2 sections",
          headers: ["Section", "Time", "Points", "Minimum to pass"],
          rows: [
            ["Reading comprehension", "60 min", "25", "6.25"],
            ["Written expression", "45 min", "25", "6.25"],
            ["Listening comprehension", "40 min", "25", "6.25"],
            ["Oral expression", "~15 min", "25", "6.25"],
          ],
        },
        {
          type: "p",
          text: "**Three gates:** (1) overall 104/200, (2) 30/50 in Grupo 1 (Reading+Listening) and 30/50 in Grupo 2 (Writing+Speaking), (3) 6.25/25 in every skill. Fail any gate → fail the exam. Score 24/25 on three skills and 5/25 on speaking → fail.",
        },
        {
          type: "p",
          text: "**Listening trap:** distractors reuse audio keywords in the wrong context. Keyword-matching without meaning fails. Results often take 2–3 months; physical diplomas longer. Book DELE ~6 months before your filing target.",
        },
      ],
    },
    {
      heading: "Who Is Exempt (And Who Is Not)",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Exempt from DELE A2",
              body: "Nationals of Spanish-speaking countries (Ibero-America list), holders of DELE B1+, and ESO completers in Spain.",
            },
            {
              title: "Exempt from both CCSE and DELE",
              body: "Minors under 18, people with documented modified legal capacity, ESO completers in Spain.",
            },
            {
              title: "Not exempt from CCSE",
              body: "Ibero-American nationals still take CCSE even when DELE is waived. A Latin American passport does not skip both exams.",
            },
          ],
        },
      ],
    },
    {
      heading: "Residency Rules Before You Book Exams",
      blocks: [
        {
          type: "table",
          caption: "Residence clocks",
          headers: ["Category", "Residency required"],
          rows: [
            ["Standard naturalisation", "10 years"],
            ["Refugees", "5 years"],
            [
              "Ibero-American, Andorra, Philippines, Equatorial Guinea, Portugal, Sephardic origin",
              "2 years",
            ],
          ],
        },
        {
          type: "p",
          text: "Do not sit exams years early without a plan — CCSE expires in 4 years; DELE is lifetime. The 2-year path requires legal, continued residency immediately prior to filing. Student/tourist gaps can reset the clock — verify with counsel.",
        },
      ],
    },
    {
      heading: "Study Timeline",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Month 1: DELE A2",
              body: "Below A1? Study Spanish first. At A1–A2, book DELE for Month 3. Spend ~40% of time on Listening. Tutor speaking 2×/week.",
            },
            {
              title: "Month 2: CCSE + DELE polish",
              body: "Read the free CCSE Manual. 3–4 practice tests targeting 20/25. DELE timed mock — every skill above 6.25/25.",
            },
            {
              title: "Month 3: Exams",
              body: "DELE first, CCSE 2–4 weeks later. Pass both, then assemble the file.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need to pass both CCSE and DELE A2 for Spanish citizenship?",
      answer:
        "Yes in most cases. CCSE is civics; DELE A2 is language. They are independent — retake only the one you fail.",
    },
    {
      question: "What is the passing score for the CCSE exam?",
      answer:
        "15 of 25 (60%) in 45 minutes. Results often appear ~20 days after the sitting.",
    },
    {
      question: "What is the passing score for DELE A2?",
      answer:
        "104/200 overall, plus 30/50 in each group, plus 6.25/25 in every skill. One weak skill fails the exam.",
    },
    {
      question: "How much do the Spanish citizenship exams cost?",
      answer:
        "CCSE ~€85 (includes a free second attempt within ~18 months). DELE A2 ~€130–€138 per attempt.",
    },
    {
      question: "Can I take the CCSE exam in English?",
      answer:
        "No. Both exams are in Spanish. CCSE uses simpler Spanish, but you still need basic reading comprehension.",
    },
    {
      question: "How long are CCSE and DELE results valid?",
      answer: "CCSE ~4 years. DELE A2 generally lifetime.",
    },
    {
      question: "Do Spanish-speaking Latin Americans need DELE A2?",
      answer:
        "Usually no for DELE. They still need CCSE unless exempt (e.g. ESO in Spain).",
    },
    {
      question: "What happens if I fail the CCSE?",
      answer:
        "The fee typically includes a second attempt at the same centre within ~18 months. After two fails, re-register and pay again.",
    },
    {
      question: "What happens if I fail the DELE A2?",
      answer:
        "Re-register for a future date and pay the full fee again. No free retake.",
    },
    {
      question: "How long does it take to get DELE A2 results?",
      answer:
        "Often 2–3 months online; physical diploma can take longer. Plan filing around that lag.",
    },
  ],
  bottomLine:
    "Spain runs two gauntlets. CCSE is a memory test with a published bank — easy if you study the manual. DELE A2 has three scoring gates — hard if one skill is weak. Book DELE first. Pass both, then file. Bureaucracy does not accept “I am taking the test next month” as proof.",
};
