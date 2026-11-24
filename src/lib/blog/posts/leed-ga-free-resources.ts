import type { BlogPostDraft } from "../types";

export const leedGaFreeResourcesPost: BlogPostDraft = {
  slug: "can-you-pass-leed-ga-free-resources-only",
  title: "Can You Pass the LEED GA Exam with Free Resources Only?",
  titleTag: "Can You Pass LEED GA with Free Resources Only? Honest 2027 Breakdown",
  metaDescription:
    "USGBC gives away the handbook and sample questions. Third-party sites offer free practice tests. Here is what is actually enough to pass LEED v5 — and where free hits a wall.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "LEED GA · Study strategy",
  clusterId: "leed-ga",
  relatedSlugs: [
    "how-long-anki-decks-stay-current-exam-shelf-life",
    "well-ap-vs-fitwel-certification-2026",
  ],
  intro:
    "**The LEED Green Associate exam costs $250 ($200 for USGBC members, $100 for students), and that fee is the one cost you cannot avoid.** Study material is where you choose between free and paid. This guide sets out what USGBC publishes about the exam, what it does and does not give you, the v4 versus v5 question, and a free-first plan with a clear test for when to pay.",
  mockSlug: "leed-green-associate-readiness-check",
  deckSlug: "leed-green-associate-anki-deck",
  cta: {
    mockLabel: "Take the free LEED GA readiness check",
    deckLabel: "Close gaps with the LEED GA Anki deck",
    summary:
      "Test the free path first: take the free LEED Green Associate readiness check across knowledge domains, then close the gaps it shows with the LEED GA Anki deck.",
  },
  sections: [
    {
      heading: "What does the exam cost, and what does it look like?",
      blocks: [
        {
          type: "table",
          caption: "LEED Green Associate exam (usgbc.org, checked 24 Nov 2026)",
          headers: ["Detail", "Official rule"],
          rows: [
            ["Questions and time", "100 multiple-choice questions in 2 hours"],
            ["Passing score", "170 out of 200"],
            ["Fee", "$250; $200 for USGBC members; $100 for students"],
            ["Eligibility", "No prerequisites"],
            ["Where", "A Prometric test centre, or from home as a remotely proctored online exam"],
            ["Translation aids", "Arabic, Brazilian Portuguese, Chinese, French, German, Japanese, Korean and Spanish"],
            ["Rescheduling", "Allowed up to 3 days before the exam; fees may apply"],
          ],
        },
        {
          type: "p",
          text: "USGBC says the exam measures general knowledge of green building practices and how to support others working on LEED projects. The exam fee is the one cost you cannot avoid; study material is where you choose between free and paid.",
        },
      ],
    },
    {
      heading: "What does USGBC give you?",
      blocks: [
        {
          type: "ul",
          items: [
            "**The candidate handbook**, linked from the credential page. Read it first: it is the official description of the exam.",
            "**The credential page** itself, with format, fees, eligibility and maintenance rules.",
            "**Paid options:** USGBC's course catalogue and a yearlong education subscription, plus in-person community events.",
          ],
        },
        {
          type: "p",
          text: "The credential page does not list free official study guides or free courses, so do not count on them. Check the handbook and the course catalogue for anything currently offered at no cost.",
        },
      ],
    },
    {
      heading: "Is the exam on LEED v4 or v5?",
      blocks: [
        {
          type: "p",
          text: "USGBC says **LEED v5** is currently available for the BD+C, ID+C and O+M rating systems. The credential page does **not** say the Green Associate exam has moved to v5 or give a date, and the handbook it links is the LEED v4 Green Associate candidate handbook. Before you study, open the handbook linked from the credential page and follow the version it describes. If USGBC announces a change, switch your materials then.",
        },
      ],
    },
    {
      heading: "Can free resources be enough?",
      blocks: [
        {
          type: "p",
          text: "There is no official answer, and no reliable data on how people who studied for free perform. What you can control is a clear test of readiness:",
        },
        {
          type: "ul",
          items: [
            "you have read the official handbook and know what it says the exam covers;",
            "you score comfortably above the passing line on **timed** practice with questions you have not seen before;",
            "no area is far weaker than the rest when you review your misses.",
          ],
        },
        {
          type: "p",
          text: "If you meet those with free material, paying more adds little. If you keep missing the same areas, a structured paid course may save you a retake fee.",
        },
      ],
    },
    {
      heading: "What is a sensible free-first plan?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Read the candidate handbook", body: "Note the exam's content areas and the version of LEED it uses." },
            { title: "Take a timed diagnostic", body: "Use the free [LEED Green Associate readiness check](/mock-exams/leed-green-associate-readiness-check) to find weak areas." },
            { title: "Drill terms and concepts", body: "Review daily with the [LEED Green Associate Anki deck](/decks/leed-green-associate-anki-deck)." },
            { title: "Retest, then book", body: "Book at a Prometric centre or online when you clear the line consistently; you can reschedule up to 3 days before." },
          ],
        },
      ],
    },
    {
      heading: "What happens after you pass?",
      blocks: [
        {
          type: "p",
          text: "LEED Green Associates must earn **15 continuing education hours within 2 years** of earning the credential, through education, project experience, authorship or volunteering related to green building. If you plan to go further, decks and outlines change when rating systems change; see [how long Anki decks stay current](/blog/how-long-anki-decks-stay-current-exam-shelf-life).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How much does the LEED Green Associate exam cost?",
      answer: "$250, or $200 for USGBC members and $100 for students (usgbc.org, checked 24 Nov 2026).",
    },
    {
      question: "What score do I need to pass?",
      answer: "170 out of 200.",
    },
    {
      question: "How long is the exam?",
      answer: "2 hours for 100 multiple-choice questions.",
    },
    {
      question: "Are there prerequisites?",
      answer: "No. USGBC lists no prerequisites or eligibility requirements.",
    },
    {
      question: "Has the Green Associate exam moved to LEED v5?",
      answer: "The credential page does not say so. LEED v5 is available for BD+C, ID+C and O+M rating systems, and the handbook linked for the exam is the v4 handbook; check it before you study.",
    },
    {
      question: "How do I keep the credential?",
      answer: "Earn 15 continuing education hours within 2 years of earning it.",
    },
  ],
  bottomLine:
    "Pay the exam fee, start with the official handbook, and use timed practice to decide whether free material is enough. Source: [USGBC — LEED Green Associate](https://www.usgbc.org/credentials/leed-green-associate), checked 24 Nov 2026.",
};
