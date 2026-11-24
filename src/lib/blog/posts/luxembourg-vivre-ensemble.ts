import type { BlogPostDraft } from "../types";

export const luxembourgVivreEnsemblePost: BlogPostDraft = {
  slug: "luxembourg-vivre-ensemble-test-format-pass",
  title: "Luxembourg Vivre Ensemble: The 40-Question Test That Replaces 24 Hours of Class",
  titleTag: "Luxembourg Vivre Ensemble Test 2027: Format, Questions & Pass Score",
  metaDescription:
    "You can sit a 1-hour, 40-question exam instead of a 24-hour course. Exact 10/20/10 topic split, the pass-mark truth (28/40 is a prep-site figure, not in the regulation), exam languages, and what the CAI exemption really covers.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "Luxembourg · Vivre ensemble",
  clusterId: "luxembourg-citizenship",
  relatedSlugs: [
    "belgium-citizenship-test-flanders-vs-wallonia",
    "sweden-medborgarskapsprov-2026-new-test",
    "portugal-nationality-test-2026-new-civic-exam",
  ],
  intro:
    "**Luxembourg naturalisation needs two knowledge proofs: the Sproochentest in Luxembourgish (€75) and the Vivre ensemble au Grand-Duché de Luxembourg requirement, which you meet with a free 24-hour course or a free exam.** This guide sets out what Guichet.lu and the INLL publish about both, what they do not publish, and how to choose between the course and the exam.",
  mockSlug: "luxembourg-vivre-ensemble-readiness-check",
  deckSlug: "luxembourg-vivre-ensemble-anki-deck",
  cta: {
    mockLabel: "Take the 40-question Vivre ensemble exam simulation (free 25-question version)",
    deckLabel: "Get the Luxembourg Vivre ensemble Anki decks (FR + EN)",
    summary:
      "Sit the Vivre ensemble practice simulation, scored per module, then drill your misses with the FR + EN Anki pair. These are independent practice materials; the official exam format is set by the Luxembourg authorities.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "What does Luxembourg naturalisation require?",
      blocks: [
        {
          type: "p",
          text: "According to Guichet.lu, an adult can apply for naturalisation after at least **5 years of legal residence** in Luxembourg, the last year uninterrupted, subject to good character. Two knowledge requirements come with it: the **Sproochentest** in Luxembourgish, and the **Vivre ensemble au Grand-Duché de Luxembourg** civics requirement. The naturalisation procedure itself is free, although some documents may carry fees from the issuing authority.",
        },
      ],
    },
    {
      heading: "How does the Vivre ensemble requirement work?",
      blocks: [
        {
          type: "p",
          text: "You choose **either** a 24-hour course **or** an exam taken without the course. Enrolment in either is **free**, done online, and final once submitted.",
        },
        {
          type: "table",
          caption: "Vivre ensemble course modules (Guichet.lu, checked 24 Nov 2026)",
          headers: ["Module", "Hours"],
          rows: [
            ["Fundamental rights of citizens", "6"],
            ["State and communal institutions", "12"],
            ["History of Luxembourg and European integration", "6"],
            ["Total", "24"],
          ],
        },
        {
          type: "p",
          text: "The exam uses **multiple-choice or true/false** questionnaires. Guichet.lu does not publish the number of questions, the pass mark, the duration or the exam language, so this guide does not quote them. The history and European integration module is waived automatically if you hold the civic course certificate from the contrat d'accueil et d'intégration or a 6-hour module from the pacte citoyen; a medical exemption can be requested from the Minister of Justice.",
        },
      ],
    },
    {
      heading: "What is the Sproochentest?",
      blocks: [
        {
          type: "table",
          caption: "Sproochentest (INLL and Guichet.lu, checked 24 Nov 2026)",
          headers: ["Part", "Level and format"],
          rows: [
            ["Oral expression", "A2: an interview on one of two topics, then describing one of three pictures; about 10 minutes"],
            ["Listening comprehension", "B1: three recordings (radio news, an everyday conversation, a discussion or talk), each with multiple-choice questions, on a tablet"],
            ["To pass", "At least half the points in oral expression, or an average of both parts of at least half the points"],
            ["Fee", "€75; refundable on request to the Ministry of Justice under certain conditions, once your naturalisation application is filed"],
          ],
        },
        {
          type: "p",
          text: "The test is run by the Institut national des langues Luxembourg (INLL), with online registration. An exemption is possible only for physical or psychological inability, on a specialist's certificate.",
        },
      ],
    },
    {
      heading: "Course or exam: which should you pick?",
      blocks: [
        {
          type: "topics",
          items: [
            { title: "Take the course if…", body: "you want guaranteed coverage of all three modules and can attend 24 hours of classes." },
            { title: "Take the exam if…", body: "you already know Luxembourg's institutions, rights and history and prefer to study on your own." },
          ],
        },
        {
          type: "p",
          text: "Either way, practise the themes with the [Vivre ensemble readiness check](/mock-exams/luxembourg-vivre-ensemble-readiness-check) and the [Vivre ensemble Anki deck](/decks/luxembourg-vivre-ensemble-anki-deck); these are independent practice materials, not the official exam.",
        },
      ],
    },
    {
      heading: "How does the application work?",
      blocks: [
        {
          type: "ul",
          items: [
            "Apply in person at the civil registry of your commune of residence.",
            "Missing documents must be supplied within 3 months, or the application is not examined.",
            "The minister decides within 8 months of the application.",
            "A refusal can be challenged with the minister within one month, then before the administrative tribunal.",
          ],
        },
        {
          type: "p",
          text: "Comparing other countries? See [Belgium: Flanders vs Wallonia](/blog/belgium-citizenship-test-flanders-vs-wallonia).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is the Vivre ensemble course or exam free?",
      answer: "Yes. Guichet.lu says enrolment in the course or the exam is free (checked 24 Nov 2026).",
    },
    {
      question: "How long is the Vivre ensemble course?",
      answer: "24 hours: 6 on fundamental rights, 12 on state and communal institutions, and 6 on Luxembourg's history and European integration.",
    },
    {
      question: "What kind of questions are on the Vivre ensemble exam?",
      answer: "Multiple-choice or true/false questions. Guichet.lu does not publish the number of questions or the pass mark.",
    },
    {
      question: "How much does the Sproochentest cost?",
      answer: "€75, which can be refunded on request to the Ministry of Justice under certain conditions once you have filed your naturalisation application.",
    },
    {
      question: "What Luxembourgish level is required?",
      answer: "A2 in oral expression and B1 in listening comprehension.",
    },
    {
      question: "How long must I live in Luxembourg before applying?",
      answer: "At least 5 years of legal residence, with the last year uninterrupted.",
    },
  ],
  bottomLine:
    "Plan the Sproochentest and choose between the free 24-hour Vivre ensemble course and the exam. Sources: [Guichet.lu — naturalisation](https://guichet.public.lu/fr/citoyens/citoyennete/nationalite-luxembourgeoise/acquisition-recouvrement/naturalisation.html), [Guichet.lu — conditions préalables](https://guichet.public.lu/fr/citoyens/citoyennete/nationalite-luxembourgeoise/acquisition-recouvrement/conditions-prealables.html) and [INLL — Sproochentest](https://www.inll.lu/fr/sproochentest/), checked 24 Nov 2026.",
};
