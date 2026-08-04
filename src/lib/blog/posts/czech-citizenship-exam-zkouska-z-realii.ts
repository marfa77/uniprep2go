import type { BlogPostDraft } from "../types";

export const czechCitizenshipExamZkouskaZRealiiPost: BlogPostDraft = {
  slug: "czech-citizenship-exam-zkouska-z-realii-complete-guide",
  title: "The Complete Guide to the Czech Citizenship Exam (Zkouška z Reálií)",
  titleTag: "Czech Citizenship Exam (Zkouška z Reálií) Guide",
  metaDescription:
    "Czech citizenship: B1 Czech + zkouška z reálií — 30 MCQs in 30 min, 60% pass, CZK 2,000. NPI 300-question pool, 30 topics, costs, exemptions, prep.",
  publishedAt: "2026-08-04",
  eyebrow: "Czechia · Zkouška z reálií",
  clusterId: "czech-citizenship",
  relatedSlugs: [
    "czech-cce-language-vs-realie-civics-two-exams",
    "polish-citizenship-wiedza-o-polsce-gap-2026",
    "portugal-nationality-test-2026-new-civic-exam",
  ],
  intro:
    "**If you are applying for Czech citizenship, you must pass two separate state exams: Czech language at B1 and the Czech realities exam (zkouška z reálií).** They are not the same test, they are not taken as one sitting, and confusing them is the most expensive mistake applicants make. The realities exam is a written multiple-choice test — 30 questions in 30 minutes, 60% (18 correct) to pass, **CZK 2,000** (~€80) per attempt. The language exam costs **CZK 3,700** separately, or **CZK 5,700** if you book both. This guide covers format, the official 300-question pool, the 30 topics, exemptions, and a prep plan that maps to UniPrep2Go’s free readiness check and Anki waitlist.",
  mockSlug: "czech-citizenship-readiness-check",
  deckSlug: "czech-a2-cce-anki-deck",
  cta: {
    mockLabel: "Take the free Czech Citizenship readiness check",
    deckLabel: "Get the Czech CCE Residence Citizenship Anki deck",
    summary:
      "Drill civic themes with the free 60-question Czech Citizenship readiness check. For B1/A2 language evidence, use the Czech CCE Anki deck. Join the Czech Citizenship Anki waitlist for reálie flashcards when the civics .apkg ships.",
    extraLinks: [
      {
        href: "/decks/czech-citizenship-anki-deck",
        label: "Czech Citizenship Anki waitlist (reálie / civics)",
      },
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "What You’re Actually Facing",
      blocks: [
        {
          type: "p",
          text: "Unlike the language exam — which tests active communication — the realities exam tests whether you understand how the Czech Republic functions: constitution, public institutions, rights and obligations, history, geography, and culture. Fail and you pay the full fee again. Retakes are unlimited, but each attempt costs CZK 2,000.",
        },
        {
          type: "p",
          text: "**Permanent residence (trvalý pobyt)** usually needs A2 Czech language evidence — not the realities exam. **Citizenship (státní občanství)** needs **both** B1 language and reálie, unless you are exempt (age under 15 or over 65, 3+ years of Czech schooling, Matura, ALTE B1+, or disability pathways — confirm on official MV ČR / exam-centre pages before you book).",
        },
      ],
    },
    {
      heading: "Exam Format: The Hard Numbers",
      blocks: [
        {
          type: "table",
          caption: "Zkouška z českých reálií — parameters",
          headers: ["Parameter", "Details"],
          rows: [
            ["Format", "Written test, multiple choice"],
            ["Questions", "30"],
            ["Time limit", "30 minutes"],
            ["Options", "4 per question (A–D); exactly 1 correct"],
            ["Passing score", "60% (18/30)"],
            ["Cost", "CZK 2,000"],
            ["Retakes", "Unlimited; full fee each time"],
            ["Where", "Regional exam centres (often ÚJOP UK / krajská centra)"],
            ["Registration", "Online, typically ≥1 week before the date"],
          ],
        },
        {
          type: "p",
          text: "The test is paper-based: a printed booklet plus a separate answer sheet (záznamový arch). No oral component, no essay, no listening.",
        },
      ],
    },
    {
      heading: "The Official 300-Question Pool",
      blocks: [
        {
          type: "p",
          text: "Every question that can appear is published in advance. The National Pedagogical Institute (NPI ČR) maintains an official database of **300** items across **30 topics** in three domains. The live exam draws **one question from each topic** — so the distribution is fixed:",
        },
        {
          type: "ul",
          items: [
            "**16** from Civic Fundamentals (Občanský základ)",
            "**7** from Geography (Základní geografické informace)",
            "**7** from History & Culture (Základní historické a kulturní informace)",
          ],
        },
        {
          type: "p",
          text: "NPI also provides an interactive model test with exactly 30 questions — one per topic. Treat that bank as the real pool, not “sample vibes.” Difficulty ranges from calendar basics to trap items (e.g. Karlštejn is famous but **not** a UNESCO World Heritage Site).",
        },
      ],
    },
    {
      heading: "Domain 1: Civic Fundamentals (16 Questions)",
      blocks: [
        {
          type: "p",
          text: "Largest section — the machinery of daily life and the state.",
        },
        {
          type: "topics",
          items: [
            {
              title: "Law, citizenship & constitution",
              body: "Czech POINT services; who keeps the criminal-record registry (Ministry of Justice); naturalisation and dual citizenship; Parliament (200 Chamber / 81 Senate); President; Constitutional Court vs Supreme Court; Charter of Fundamental Rights and Freedoms.",
            },
            {
              title: "Administration, work & welfare",
              body: "Municipal vs regional offices; who issues IDs/passports; health insurance for registered unemployed (state); Úřad práce; contract types (HPP / DPP / DPČ); Finanční správa; housing and family basics.",
            },
            {
              title: "Daily life, security & EU",
              body: "Traffic points and vehicle registration; CHKO / waste sorting; emergency numbers 112 / 150 / 155 / 158; elections; foreigner integration centres; EU accession 2004; Schengen; koruna (not euro).",
            },
          ],
        },
      ],
    },
    {
      heading: "Domain 2: Geography (7 Questions)",
      blocks: [
        {
          type: "ul",
          items: [
            "Area ~78,867 km²; neighbours; Sněžka (~1,603 m); Vltava, Labe, Morava, Oder",
            "14 regions + Prague; regional capitals; population patterns",
            "National parks (Šumava, Krkonoše, Podyjí); climate",
            "Highways (D1, D5…); Václav Havel Airport Prague and regional airports",
            "Industry and energy (Temelín, Dukovany); tourism and UNESCO sites",
            "Agriculture, minerals, water management",
          ],
        },
      ],
    },
    {
      heading: "Domain 3: History & Culture (7 Questions)",
      blocks: [
        {
          type: "ul",
          items: [
            "Přemyslids / St Wenceslas; Charles IV and Charles University (1348)",
            "Habsburgs from 1526; Thirty Years’ War; Rudolf II; Austerlitz 1805",
            "National Revival; Masaryk; Czechoslovakia 28 Oct 1918",
            "Munich 1938; Protectorate; Prague Spring 1968; Velvet Revolution 1989; split 1 Jan 1993; NATO 1999; EU 2004",
            "State holidays (28 Sep, 28 Oct, 17 Nov); Kafka, Havel, Dvořák, Smetana, Mucha",
            "Jan Hus; Comenius; science and sport figures (verify Nobel claims carefully — e.g. Heyrovský, Seifert)",
          ],
        },
      ],
    },
    {
      heading: "Language Exam vs Reálie Exam",
      blocks: [
        {
          type: "table",
          caption: "Do not mix these pathways",
          headers: ["", "Language (CCE)", "Reálie exam"],
          rows: [
            ["Purpose", "Communicate in Czech", "Understand Czech society"],
            ["Level", "B1 for citizenship; A2 for many PR paths", "Test administered in Czech; civic content"],
            ["Format", "Reading, listening, writing + oral", "Written only — 30 MCQs"],
            ["Cost", "CZK 3,700", "CZK 2,000"],
            ["Combined booking", "Often CZK 5,700 for both", "Often CZK 5,700 for both"],
            ["Prep style", "Active language practice", "Memorise the known 300-item pool"],
            ["Retake", "Often section-based", "Full test again"],
          ],
        },
      ],
    },
    {
      heading: "How to Prepare (6-Week Framework)",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Week 1 — Baseline",
              body: "Take the official NPI interactive model cold. Note weak domains. Also run UniPrep2Go’s free Czech Citizenship readiness check for timed MCQ practice and topic scores.",
            },
            {
              title: "Weeks 2–5 — Systematic coverage",
              body: "Work the 300-item bank by domain: civic (≈1–160), geography (≈161–220), history/culture (≈221–300), then mixed review of misses.",
            },
            {
              title: "Week 6 — Timed simulation",
              body: "Full 30-question / 30-minute drills. One minute per item — recognise wording, don’t invent answers.",
            },
            {
              title: "Final 3 days — Polish traps",
              body: "Numbers (years, seats, area), negative stems (“which is NOT…”), institution competencies, UNESCO vs famous-but-not-UNESCO sites.",
            },
          ],
        },
        {
          type: "p",
          text: "Spaced repetition works because the pool is closed: Anki-style cards for the 300 items beat random “common sense.” Group cards by institution (Czech POINT, Ministry of Interior, Úřad práce) to cut confusion.",
        },
      ],
    },
    {
      heading: "Common Pitfalls",
      blocks: [
        {
          type: "ul",
          items: [
            "Studying only language and treating reálie as common sense — native speakers miss admin and date items too",
            "Ignoring the clock: maps, tables, and multi-clause stems eat minutes",
            "Mixing ministries: Justice (criminal records) vs Interior (citizenship/residence/police) vs Foreign Affairs (abroad) vs municipal office (ID/passport for residents)",
            "Skimming negative questions (“which does Czech POINT **not** provide?”)",
            "Generic EU knowledge without Czech specifics: joined 2004, Schengen, still CZK not euro",
          ],
        },
      ],
    },
    {
      heading: "From Exam to Passport: Realistic Timeline",
      blocks: [
        {
          type: "table",
          headers: ["Step", "Typical duration"],
          rows: [
            ["Prepare & register for exams", "2–3 months"],
            ["Sit language + reálie", "Separate dates or same centre booking"],
            ["Results", "About 2–4 weeks"],
            ["Gather documents", "1–2 months"],
            ["File citizenship application", "1 day at the office + fee"],
            ["Ministry processing", "Often 6–12 months"],
            ["Oath / completion", "After approval"],
          ],
        },
        {
          type: "p",
          text: "Plan roughly **8–14 months** from first serious study to passport — confirm current fees and processing on official Interior Ministry and exam-centre sites before you pay.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the Czech citizenship realities exam?",
      answer:
        "The zkouška z českých reálií is a written multiple-choice civics test for naturalisation: 30 questions in 30 minutes, four options each, 60% (18/30) to pass, typically CZK 2,000 per attempt. Questions are drawn from NPI ČR’s published 300-item pool across 30 topics.",
    },
    {
      question: "Is the language exam the same as the reálie exam?",
      answer:
        "No. The CCE language exam (B1 for citizenship, often A2 for permanent residence) tests communication. Reálie tests civic knowledge in Czech. Citizenship usually requires both unless you are exempt.",
    },
    {
      question: "How many questions are in the official bank?",
      answer:
        "NPI ČR publishes 300 questions covering 30 topics. The live exam takes one question from each topic (16 civic, 7 geography, 7 history/culture).",
    },
    {
      question: "Do I need reálie for permanent residence?",
      answer:
        "Usually no — permanent residence paths focus on language (often A2). Reálie is the citizenship civics exam. Always verify your case against current MV ČR rules.",
    },
    {
      question: "Where can I practice before booking?",
      answer:
        "Use NPI’s official interactive model and the free UniPrep2Go Czech Citizenship readiness check (60 timed MCQs with topic scoring). Join the Czech Citizenship Anki waitlist for spaced-repetition civics cards; use the Czech CCE Anki deck for language vocabulary.",
    },
    {
      question: "What score should I hit on practice tests before booking?",
      answer:
        "Aim consistently for about 22–25/30 on timed 30-question drills — a safety margin above the 18/30 pass line — especially on numbers, institutions, and “NOT” questions.",
    },
    {
      question: "Is UniPrep2Go official NPI or Interior Ministry material?",
      answer:
        "No. UniPrep2Go is an independent study aid. Pair it with the official NPI question bank and current government guidance.",
    },
  ],
  bottomLine:
    "The zkouška z reálií is a structured memorisation challenge with a known question pool — not an IQ test. Pass language and civics as separate products, drill the 300 NPI items under a timer, confirm exemptions before you book, and use the free UniPrep2Go readiness check plus CCE Anki / civics waitlist so you don’t pay CZK 2,000 to retake a bank you never finished.",
};
