import type { BlogPostDraft } from "../types";

export const luxembourgVivreEnsemblePost: BlogPostDraft = {
  slug: "luxembourg-vivre-ensemble-test-format-pass",
  title: "Luxembourg Vivre Ensemble: The 40-Question Test That Replaces 24 Hours of Class",
  titleTag: "Luxembourg Vivre Ensemble Test 2026: Format, Questions & Pass Score",
  metaDescription:
    "You can sit a 1-hour, 40-question exam instead of a 24-hour course. Exact 10/20/10 topic split, the pass-mark truth (28/40 is a prep-site figure, not in the regulation), exam languages, and what the CAI exemption really covers.",
  publishedAt: "2026-07-28",
  eyebrow: "Luxembourg · Vivre ensemble",
  clusterId: "luxembourg-citizenship",
  relatedSlugs: [
    "belgium-citizenship-test-flanders-vs-wallonia",
    "sweden-medborgarskapsprov-2026-new-test",
    "portugal-nationality-test-2026-new-civic-exam",
  ],
  intro:
    "**Luxembourg offers two paths for civic knowledge: 24 hours in a classroom, or a 1-hour computer-based MCQ.** Most applicants never hear about the exam. “Vivre ensemble au Grand-Duché de Luxembourg” covers the same material as the course in a single sitting. This guide covers format, the three topic areas, what is (and is not) published about the pass mark, and why the CAI exemption only applies to the course — not the exam.",
  mockSlug: "luxembourg-vivre-ensemble-readiness-check",
  deckSlug: "luxembourg-vivre-ensemble-anki-deck",
  cta: {
    mockLabel: "Take the free 40-question Vivre ensemble exam simulation",
    deckLabel: "Get the Luxembourg Vivre ensemble Anki decks (FR + EN)",
    summary:
      "Sit the free Vivre ensemble exam simulation — 40 questions, 60 minutes, the official 10/20/10 split, scored per module. Then drill the misses with the FR + EN Anki pair (subdecks per official module, a key point on every card) — and remember Sproochentest is the harder half.",
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
            [
              "Passing score",
              "Attendance only",
              "Not stated in the 2017 regulation — prep sites cite 28/40 (70%); confirm with SFA",
            ],
            ["Cost", "Free registration (lux.men.lu)", "Free registration (lux.men.lu)"],
            [
              "Language",
              "Luxembourgish, French, German or English",
              "Luxembourgish, French, German or English (règlement grand-ducal of 7 April 2017)",
            ],
            ["Certificate", "Issued upon completion", "Issued upon passing"],
          ],
        },
        {
          type: "p",
          text: "The exam is run by the Service de la formation des adultes (SFA) at a CBT centre in Esch-Belval. Register on lux.men.lu — the site is only reachable from a Luxembourg connection.",
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
          text: "**Heavy section:** institutions are half the exam. Know the Grand Duke, Prime Minister, 60-member Chamber of Deputies, Council of State, the courts, and the state’s relationship to the 100 communes.",
        },
      ],
    },
    {
      heading: "The CAI Exemption: Course Only, Not the Exam",
      blocks: [
        {
          type: "p",
          text: "The Welcome and Integration Contract (CAI — Contrat d’Accueil et d’Intégration) is optional for legal residents 16+ planning to stay permanently. Since the law of 23 August 2023 it has been replaced by the citizens’ pact (pacte citoyen du vivre-ensemble interculturel). A CAI civic-course certificate, or the pact’s 6-hour “overview of Luxembourg” module, exempts you from the **history / European integration module of the course** — so you attend 18 hours instead of 24.",
        },
        {
          type: "p",
          text: "**The exemption does not carry over to the exam.** Guichet.lu is explicit: if you choose to sit the exam instead of attending the course, you must take and pass the full test, history included. There is no “30-question” version.",
        },
        {
          type: "p",
          text: "**Rule of thumb:** if you already hold a CAI or pact certificate and prefer class, the 18-hour course is the shortest route. If you want one sitting, prepare all three modules for the 40-question exam.",
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
              body: "Grand Duke, PM, Chamber of Deputies (60), Council of State, Constitutional Court. EU bodies in Luxembourg: Court of Justice of the EU, European Court of Auditors, EIB, European Parliament General Secretariat. Communes: 100, bourgmestre and échevins, communal councils.",
            },
            {
              title: "Week 2: Fundamental rights (10 Q)",
              body: "2023 Constitution: equality, freedom of expression and religion, separation of churches and state, voting rights (compulsory voting), petitions and citizens’ initiatives. ECHR relationship to Luxembourg law.",
            },
            {
              title: "Week 3: History and European integration (10 Q)",
              body: "963, 1815, 1839, 1867, 1890, WWI/WWII occupations, 1942 general strike, 1951 ECSC, 1957 Rome, 1985 Schengen, 1999/2002 Euro. Figures: Charlotte, Jean, Henri, Guillaume; Robert Schuman, Joseph Bech, Pierre Werner.",
            },
            {
              title: "Week 4: Practice and mock",
              body: "Sit the free 40-question / 60-minute simulation (same 10/20/10 split), then drill every miss. Aim for 32/40+ so you clear the commonly cited 28/40 with a buffer.",
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
      answer:
        "The règlement grand-ducal of 7 April 2017 and the MEN exam page do not publish a pass mark. Prep sites commonly cite 28 out of 40 (70%) — aim higher and confirm with SFA (sfa@men.lu).",
    },
    {
      question: "Can I take the Luxembourg citizenship test in English?",
      answer:
        "Yes. Since the 2017 regulation, both the course and the exam can be taken in Luxembourgish, French, German or English.",
    },
    {
      question: "How much does the Luxembourg citizenship test cost?",
      answer:
        "Registration for the Vivre ensemble course or exam is free on lux.men.lu. Sproochentest is booked separately with INLL.",
    },
    {
      question: "What is the CAI in Luxembourg?",
      answer:
        "Contrat d’Accueil et d’Intégration — a voluntary newcomer programme. Now replaced by the citizens’ pact. A CAI civic-course certificate (or the pact’s 6-hour Luxembourg module) exempts you from the history module of the course only — exam candidates still sit all 40 questions.",
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
    "Luxembourg lets you choose: 24 hours in class or 1 hour at a computer. Strong self-learners can skip the course, study three topics for 2–3 weeks, and sit 40 questions. The CAI exemption shortens the course, not the exam. The real bottleneck is usually Luxembourgish — not Vivre ensemble.",
};
