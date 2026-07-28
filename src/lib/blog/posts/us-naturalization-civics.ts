import type { BlogPostDraft } from "../types";

export const usNaturalizationCivicsPost: BlogPostDraft = {
  slug: "us-naturalization-civics-test-100-questions-only-10",
  title: "US Naturalization Civics Test: The 100 Questions Are a Lie",
  titleTag: "US Naturalization Civics Test 2026: 100 Questions, Only 10 on Exam",
  metaDescription:
    "USCIS publishes 100 questions. The exam pulls 10 at random. Seniors 65+ with 20 years LPR study 20. Exact format, topic traps, and why oral flashcards beat apps.",
  publishedAt: "2026-07-28",
  eyebrow: "USA · USCIS Naturalization Civics",
  clusterId: "us-citizenship",
  relatedSlugs: [
    "canada-citizenship-test-20-questions-630-dollars",
    "life-in-the-uk-test-why-one-in-three-fail",
    "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
  ],
  intro:
    "**USCIS publishes 100 civics questions and tells you to study them all.** That is honest. What they under-emphasise: the interview pulls only **10** from that list — and once you get **6** right, it stops. You may never hear the other 90. Memorising the full bank creates false confidence. Under officer pressure, people blank on the 10 that matter. This guide covers the real format, the three topic buckets, the senior shortcut, and a study method that works out loud.",
  mockSlug: "us-citizenship-readiness-check",
  deckSlug: "citizenship-naturalization-anki-bundle",
  cta: {
    mockLabel: "Take the free US Citizenship readiness check",
    deckLabel: "Get the Citizenship & Naturalization Anki Bundle",
    summary:
      "Drill USCIS civics themes with the free US Citizenship readiness check (Prep2Go-sourced). Then lock all 100 questions with the Citizenship & Naturalization Anki Bundle before your interview — and browse Prep2Go for related immigration decks.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "The Real Format (Not What the Pamphlet Says)",
      blocks: [
        {
          type: "table",
          caption: "Standard vs senior track",
          headers: ["Detail", "Standard applicant", "Senior (65+, 20 years LPR)"],
          rows: [
            ["Questions asked", "Up to 10", "Up to 10 (from a designated 20-question list)"],
            ["Passing score", "6 correct", "6 correct"],
            ["Stops when", "You reach 6 correct", "You reach 6 correct"],
            ["Language", "English", "English (same requirement)"],
            ["Medical exemption", "Form N-648", "Form N-648"],
          ],
        },
        {
          type: "p",
          text: "**Stopping rule:** once you hit 6 correct, civics ends and the officer moves to English reading/writing. Speed and accuracy on the first six matter more than breadth across all 100. Seniors 65+ with 20 years LPR study a designated 20-question list — still up to 10 asked, but only from those 20.",
        },
      ],
    },
    {
      heading: "The Three Categories (and Where to Spend Your Time)",
      blocks: [
        {
          type: "table",
          caption: "Approximate pool weights",
          headers: ["Category", "Questions", "Weight", "What USCIS tests"],
          rows: [
            [
              "American Government",
              "57",
              "~57%",
              "Constitution, branches, federalism, rights",
            ],
            [
              "American History",
              "30",
              "~30%",
              "Colonial era, independence, Civil War, civil rights",
            ],
            [
              "Integrated Civics",
              "13",
              "~13%",
              "Geography, holidays, symbols, anthem",
            ],
          ],
        },
        {
          type: "p",
          text: "**Trap:** equal time on all 100. Government is more than half the pool — weak answers on branches or “Who is your state’s Governor?” are expensive. Geography items feel easy until nerves flip East/West Coast oceans. Do not skip them; do not over-study them.",
        },
      ],
    },
    {
      heading: "The English Test: Reading, Writing, and the Vocabulary List",
      blocks: [
        {
          type: "ul",
          items: [
            "**Reading:** read one sentence aloud from the USCIS reading vocabulary list",
            "**Writing:** write one dictated sentence from the writing vocabulary list",
            "Civics study overlaps the vocab lists — still practice **handwriting**, not typing",
          ],
        },
      ],
    },
    {
      heading: "The N-648 Medical Exemption",
      blocks: [
        {
          type: "p",
          text: "A licensed medical professional can complete Form N-648 to waive English and/or civics when a disability prevents learning. USCIS wants clinical detail on **how** the impairment blocks learning — not a one-line GP note. Thin letters often get rejected.",
        },
      ],
    },
    {
      heading: "Study Method: Flashcards, Not Apps",
      blocks: [
        {
          type: "ol",
          items: [
            "Build oral flashcards (question → short answer, no multiple choice)",
            "Practice aloud daily — family member asks 10 random questions",
            "Simulate pressure: stand, face a wall, no phone prompts",
            "Drill opening sequences of 6 correct answers in a row",
          ],
        },
        {
          type: "p",
          text: "Most apps are multiple-choice. The real interview is oral. Train the format you will face.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the US citizenship civics test?",
      answer:
        "Up to 10 from a published list of 100. You need 6 correct to pass. Once you reach 6 correct, civics ends.",
    },
    {
      question: "What is the passing score for the US civics test?",
      answer: "6 out of 10 correct (60%).",
    },
    {
      question: "Do seniors have to study all 100 questions?",
      answer:
        "No. Applicants 65+ with at least 20 years of LPR study a designated list of 20 questions. The interview still asks up to 10 from that list.",
    },
    {
      question: "Is the US citizenship test in English?",
      answer:
        "Yes, unless you have an approved Form N-648 medical exemption. Civics, reading, and writing are in English.",
    },
    {
      question: "How much does the US naturalization application cost?",
      answer:
        "Typically about $710–$760 (N-400 plus biometrics; fees change). Fee waivers may apply for low-income applicants.",
    },
    {
      question: "Can I fail the civics test and retake it?",
      answer:
        "Yes. USCIS usually schedules a second interview within about 60–90 days. Fail again and the N-400 is denied — you must reapply.",
    },
    {
      question: "How long does US naturalization take?",
      answer:
        "Field-office dependent; often roughly 8–14 months from filing to oath ceremony.",
    },
    {
      question: "What are the three categories of civics questions?",
      answer:
        "American Government (~57), American History (~30), and Integrated Civics — geography, symbols, holidays (~13).",
    },
    {
      question: "Do I need to answer in complete sentences?",
      answer:
        "Civics answers can be short (“The President”). Reading and writing require complete sentences as dictated.",
    },
    {
      question: "Is the civics test multiple choice?",
      answer:
        "No. The officer asks orally; you answer orally. No printed options.",
    },
  ],
  bottomLine:
    "USCIS hands you 100 questions and asks 10. The job is producing 6 correct answers under interview pressure without prompts. Weight government hardest, practise out loud, and simulate the room. The certificate is worth the drill.",
};
