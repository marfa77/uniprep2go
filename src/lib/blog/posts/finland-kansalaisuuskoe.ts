import type { BlogPostDraft } from "../types";

export const finlandKansalaisuuskoePost: BlogPostDraft = {
  slug: "finland-kansalaisuuskoe-2027-new-test",
  title: "Finland Kansalaisuuskoe: The 2027 Citizenship Test Nobody Has Taken Yet",
  titleTag: "Finland Citizenship Test 2027: Kansalaisuuskoe Format & Free Practice",
  metaDescription:
    "From 1 March 2027, many Finnish citizenship applications need a society knowledge test. Migri runs it; Helsinki University writes the study pack. No official question bank yet — here is what is confirmed.",
  publishedAt: "2026-08-27",
  eyebrow: "Finland · Kansalaisuuskoe",
  clusterId: "finland-citizenship",
  relatedSlugs: [
    "sweden-medborgarskapsprov-2026-new-test",
    "norway-statsborgerproven-format-questions-pass",
    "denmark-indfoedsretsproeven-47-percent-pass-rate",
  ],
  intro:
    "**Finland is adding a citizenship knowledge test.** The amended Citizenship Act takes effect on **1 January 2027**, and applications submitted from **1 March 2027** must generally pass kansalaisuuskoe unless an exemption applies (for example a Finnish or Swedish matriculation exam or a higher-education degree completed in Finnish or Swedish). Maahanmuuttovirasto (Migri) will organise a computer-based test in **Finnish or Swedish** for working-age applicants. The University of Helsinki is preparing learning materials to publish on migri.fi before the first sitting. Government communications have cited roughly **20–40 multiple-choice questions** and about a **70% pass** threshold — treat those numbers as provisional until Migri locks the format. As of August 2026, there is no official public question bank. This guide covers confirmed dates, who is affected, and how to prep with the free Finnish mock while you wait.",
  mockSlug: "finland-kansalaisuuskoe-readiness-check",
  deckSlug: "finland-kansalaisuuskoe-anki-deck",
  cta: {
    mockLabel: "Take the free Finland kansalaisuuskoe readiness check (Finnish)",
    deckLabel: "Mock-only prep (no Anki deck for this pathway)",
    summary:
      "Practice Migri theme areas with the free 60-question Finnish kansalaisuuskoe readiness check. When Migri publishes the official learning package, switch drills to that bank — UniPrep2Go does not sell an Anki deck for this pathway.",
    extraLinks: [
      {
        href: "https://migri.fi/en/citizenship",
        label: "Migri — citizenship (official)",
      },
      {
        href: "https://migri.fi/kansalaisuuskoe",
        label: "Migri — kansalaisuuskoe (FI)",
      },
    ],
  },
  sections: [
    {
      heading: "What changed and when it bites",
      blocks: [
        {
          type: "table",
          caption: "Key dates (confirm on migri.fi)",
          headers: ["Milestone", "Date"],
          rows: [
            ["Citizenship Act amendment effective", "1 January 2027"],
            ["Applications requiring kansalaisuuskoe", "Submitted from 1 March 2027"],
            ["Transition window ends", "28 February 2027 (earlier filings under prior rules)"],
            ["Official learning materials", "Published on migri.fi before first test (Helsinki University)"],
          ],
        },
        {
          type: "p",
          text: "If you file before 1 March 2027, you may be processed under the old pathway — but verify your personal timeline with Migri. Do not assume English is an exam language: the live test is **Finnish or Swedish**.",
        },
      ],
    },
    {
      heading: "What we know about the format",
      blocks: [
        {
          type: "p",
          text: "Migri has described a computer-based society knowledge test covering legislation, fundamental and human rights, equality, Finnish history, and culture. Press and government briefings have floated **~20–40 MCQs** and **~70% to pass** — not yet a stable public spec with fees, booking URLs, and retake rules.",
        },
        {
          type: "ul",
          items: [
            "Organiser: Maahanmuuttovirasto (Migri)",
            "Study pack: University of Helsinki → migri.fi",
            "Languages: Finnish or Swedish",
            "Typical age band discussed: working-age applicants (18–65)",
            "Possible exemptions: matriculation / degree in Finnish or Swedish",
          ],
        },
      ],
    },
    {
      heading: "How to prepare before the official bank ships",
      blocks: [
        {
          type: "ol",
          items: [
            "Bookmark migri.fi/citizenship and migri.fi/kansalaisuuskoe — refresh weekly as 2027 approaches.",
            "Build Finnish civic vocabulary: eduskunta, hallitus, presidentti, perusoikeudet, tasa-arvo.",
            "Study institutions, EU membership (1995), neighbours, and everyday services (Kela, 112, police passports).",
            "Take the free UniPrep2Go 60-question Finnish mock for topic scoring.",
            "When Migri publishes samples, abandon third-party guesswork and drill the official materials.",
          ],
        },
      ],
    },
    {
      heading: "Nordic comparison: why Finland feels late but strict",
      blocks: [
        {
          type: "p",
          text: "Norway already runs Statsborgerprøven; Sweden is launching Medborgarskapsprov in 2026; Denmark tightened Indfødsretsprøven pass rates. Finland waited until 2027 but ties the test to **application date**, not vague “eventually”. If you are comparing Nordic pathways, language evidence and residence years still matter — kansalaisuuskoe is an extra gate, not a shortcut.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is Finland’s citizenship test live today?",
      answer:
        "No. It applies to applications from 1 March 2027 onward. Learning materials and booking rules are still rolling out.",
    },
    {
      question: "Can I take the test in English?",
      answer: "No. Migri specifies Finnish or Swedish for kansalaisuuskoe.",
    },
    {
      question: "Is there a free practice test?",
      answer:
        "UniPrep2Go hosts a free 60-question Finnish diagnostic at /mock-exams/finland-kansalaisuuskoe-readiness-check. It is independent prep, not Migri material.",
    },
    {
      question: "Will UniPrep2Go release an Anki deck?",
      answer: "Not for this pathway — mock-only prep to capture weak domains until the official bank publishes.",
    },
    {
      question: "Who is exempt from kansalaisuuskoe?",
      answer:
        "Migri lists exemptions such as a Finnish or Swedish matriculation exam or a higher-education degree completed in Finnish or Swedish — confirm your case officially.",
    },
    {
      question: "Where will official study materials appear?",
      answer:
        "On migri.fi, prepared by the University of Helsinki before the first test sitting.",
    },
  ],
  bottomLine:
    "Kansalaisuuskoe is real on the calendar but still a moving target on format. The winners in 2027 will be applicants who watched migri.fi, studied in Finnish, and drilled civic themes early — not those who memorised rumoured Q-counts from blogs.",
};
