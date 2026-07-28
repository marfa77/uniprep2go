import type { BlogPostDraft } from "../types";

export const luxembourgVivreEnsemblePost: BlogPostDraft = {
  slug: "luxembourg-vivre-ensemble-test-format-pass",
  title: "Luxembourg Vivre Ensemble: The 40-Question Test That Replaces 24 Hours of Class",
  titleTag: "Luxembourg Vivre Ensemble Test 2026: Format, Questions & Pass Score",
  metaDescription:
    "You can sit a 1-hour exam instead of taking a 24-hour course. 40 questions. 28 correct to pass. Here is the exact topic split and why the CAI certificate exempts you from half the material.",
  publishedAt: "2026-07-28",
  eyebrow: "Luxembourg · Vivre ensemble",
  clusterId: "luxembourg-citizenship",
  relatedSlugs: [
    "belgium-citizenship-test-flanders-vs-wallonia",
    "sweden-medborgarskapsprov-2026-new-test",
    "portugal-nationality-test-2026-new-civic-exam",
  ],
  intro:
    "**Luxembourg offers two paths for civic knowledge: 24 hours in a classroom, or a 1-hour computer-based MCQ.** Most applicants never hear about the exam. “Vivre ensemble au Grand-Duché de Luxembourg” covers the same material as the course in a single sitting. This guide covers format, the three topic areas, the passing score, and the CAI shortcut that waives one-third of the content.",
  mockSlug: "luxembourg-vivre-ensemble-readiness-check",
  deckSlug: "luxembourg-vivre-ensemble-anki-deck",
  cta: {
    mockLabel: "Take the free Luxembourg Vivre ensemble readiness check",
    deckLabel: "Join the Luxembourg Vivre ensemble Anki waitlist",
    summary:
      "Drill rights, institutions, and history with the free Luxembourg Vivre ensemble readiness check (Prep2Go-sourced). Join the Anki waitlist before your sitting in Esch-Belval — and remember Sproochentest is the harder half.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "The Two Paths: Course vs. Exam",
      blocks: [
        {
          type: "table",
          caption: "Course vs exam",
          headers: ["", "24-hour course", "1-hour exam"],
          rows: [
            ["Time commitment", "24 hours (often 4×6 hours)", "1 hour"],
            ["Format", "Classroom instruction", "Computer-based multiple-choice"],
            ["Questions", "None — attendance-based", "40 multiple-choice"],
            ["Passing score", "Attendance only", "28 of 40 (70%)"],
            ["Cost", "Free or low-cost through SFA", "Exam fee only"],
            [
              "Language",
              "Luxembourgish, French, German, English (course)",
              "Likely Luxembourgish/French — confirm with SFA",
            ],
            ["Certificate", "Issued upon completion", "Issued upon passing"],
          ],
        },
        {
          type: "p",
          text: "The exam is run by Service de la formation des adultes (SFA) at a CBT centre in Esch-Belval. Register via the SFA website.",
        },
      ],
    },
    {
      heading: "The 40 Questions: Exact Topic Split",
      blocks: [
        {
          type: "table",
          caption: "Topic split",
          headers: ["Topic area", "Questions", "Hours in course", "What it covers"],
          rows: [
            [
              "Fundamental rights of citizens",
              "10",
              "6 hours",
              "Human rights, constitution, rule of law, equality, democratic participation",
            ],
            [
              "State and municipal institutions",
              "20",
              "12 hours",
              "Grand Duke, government, Chamber of Deputies, courts, communes, EU institutions",
            ],
            [
              "History of Luxembourg and European integration",
              "10",
              "6 hours",
              "963 to present, EU founding, Schengen, Euro",
            ],
          ],
        },
        {
          type: "p",
          text: "**Heavy section:** institutions are half the exam. Know the Grand Duke, Prime Minister, 60-member Chamber of Deputies, and the state’s relationship to the 102 communes.",
        },
      ],
    },
    {
      heading: "The CAI Shortcut: Exempt From History",
      blocks: [
        {
          type: "p",
          text: "The Welcome and Integration Contract (CAI — Contrat d’Accueil et d’Intégration) is optional for legal residents 16+ planning to stay permanently. Completing CAI can exempt you from the **history / European integration** module (6 hours / 10 exam questions) at citizenship time.",
        },
        {
          type: "p",
          text: "A CAI holder sitting Vivre ensemble then focuses on rights (10) + institutions (20). History is waived — effectively a 28/30 target instead of 28/40.",
        },
        {
          type: "p",
          text: "**Trade-off:** CAI itself needs orientation, language (up to A1), and an integration course — months of work. If you are close to eligibility and never started CAI, studying the full 40-question exam is usually faster.",
        },
      ],
    },
    {
      heading: "The Language Requirement (Separate and Harder)",
      blocks: [
        {
          type: "table",
          caption: "Civics vs Sproochentest",
          headers: ["Test", "Level", "Skills tested"],
          rows: [
            [
              "Sproochentest",
              "A2 oral expression, B1 oral comprehension",
              "Speaking and listening",
            ],
            ["Vivre ensemble", "N/A (content test)", "Civic knowledge"],
          ],
        },
        {
          type: "p",
          text: "Sproochentest (INLL) is harder for most applicants than Vivre ensemble. A2 speaking means daily conversation; B1 listening means radio-style audio. INLL offers prep courses.",
        },
        {
          type: "p",
          text: "**Exemption:** more than **20 years** legal residence may waive both Sproochentest and Vivre ensemble — you may still need 24 hours of Luxembourgish courses. Confirm current rules before you rely on this.",
        },
      ],
    },
    {
      heading: "Study Strategy for the Exam Path",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Week 1: State and municipal institutions (20 Q)",
              body: "Grand Duke, PM, Chamber of Deputies (60), Council of State, Constitutional Court. EU bodies in Luxembourg: CJEU, EP, EIB, ECB. Communes: 102, mayors, councils.",
            },
            {
              title: "Week 2: Fundamental rights (10 Q)",
              body: "Constitution basics: speech, equality, suffrage, secularism. ECHR relationship to Luxembourg law.",
            },
            {
              title: "Week 3: History (10 Q) — skip if CAI",
              body: "963, 1815, 1867, 1890, WWI/WWII occupations, 1957 Rome, 1985 Schengen, 1999 Euro. Figures: Henri, Jean, Charlotte.",
            },
            {
              title: "Week 4: Practice and mock",
              body: "Full timed 40-question mock. Target 32/40 for buffer above 28/40.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Luxembourg Vivre ensemble test?",
      answer:
        "40 multiple-choice: 10 rights, 20 institutions, 10 history and European integration.",
    },
    {
      question: "What is the passing score for the Vivre ensemble exam?",
      answer: "28 out of 40 (70%).",
    },
    {
      question: "Can I take the Luxembourg citizenship test in English?",
      answer:
        "24-hour courses are offered in English (including online). Exam language is often Luxembourgish or French — confirm with SFA before registering.",
    },
    {
      question: "How much does the Luxembourg citizenship test cost?",
      answer:
        "Vivre ensemble fees are typically low (often under €100) but not always prominently listed. Sproochentest has a separate INLL fee.",
    },
    {
      question: "What is the CAI in Luxembourg?",
      answer:
        "Contrat d’Accueil et d’Intégration — a voluntary newcomer programme. Completing it can exempt you from the history module of Vivre ensemble at citizenship.",
    },
    {
      question: "Do I need to speak Luxembourgish to become a citizen?",
      answer:
        "Yes for most pathways: Sproochentest at A2 oral expression and B1 oral comprehension, separate from Vivre ensemble.",
    },
    {
      question: "How long does it take to get Luxembourg citizenship?",
      answer:
        "Typically 5 years legal residence (sometimes 3 if married to a Luxembourger or under specific conditions). After eligibility, applications often take 6–12 months.",
    },
    {
      question: "Can I retake the Vivre ensemble exam if I fail?",
      answer:
        "Yes. No published hard retake cap in typical guidance — contact SFA to reschedule.",
    },
    {
      question: "Where is the Vivre ensemble exam held?",
      answer:
        "CBT centre in Esch-Belval. Courses: Luxembourg-Hollerich, Esch-Belval, Diekirch, with more northern locations planned from late 2026.",
    },
    {
      question: "What is the hardest part of the Luxembourg citizenship test?",
      answer:
        "Usually Sproochentest, not Vivre ensemble. Language needs months; civic MCQ can be prepped in 2–3 weeks for strong self-learners.",
    },
  ],
  bottomLine:
    "Luxembourg lets you choose: 24 hours in class or 1 hour at a computer. Strong self-learners can skip the course, study three topics for 2–3 weeks, and sit 40 questions. CAI holders may only need 30. The real bottleneck is usually Luxembourgish — not Vivre ensemble.",
};
