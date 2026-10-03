import type { BlogPostDraft } from "../types";

export const usNaturalizationCivicsPost: BlogPostDraft = {
  slug: "us-naturalization-civics-test-100-questions-only-10",
  title: "US Naturalization Civics Test 2026: 128 Questions, Up to 20 Asked",
  titleTag: "US Citizenship Civics Test 2026: 128 Questions, 12 to Pass",
  metaDescription:
    "USCIS 2025 civics test for 2026 interviews: 128 published questions, up to 20 asked, 12 correct to pass (2008 test: 6 of 10 if you filed before Oct 20, 2025). Format, topic weights, 65/20 list, free timed check + Anki.",
  publishedAt: "2026-07-28",
  eyebrow: "USA · USCIS Naturalization Civics",
  clusterId: "us-citizenship",
  relatedSlugs: [
    "canada-citizenship-test-20-questions-630-dollars",
    "life-in-the-uk-test-why-one-in-three-fail",
    "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
  ],
  intro:
    "**If you file Form N-400 on or after October 20, 2025, you take the 2025 civics test: USCIS publishes 128 questions, the officer asks up to 20, and you need 12 correct.** The officer stops once you reach 12 right or 9 wrong. Filed before that date? You keep the 2008 test — up to 10 questions from 100, pass at 6. Either way you never hear most of the list, but you cannot predict which ones come up. This guide covers both formats, the three topic buckets, the 65/20 shortcut, and a study method that works out loud.",
  mockSlug: "us-citizenship-readiness-check",
  deckSlug: "us-citizenship-anki-deck",
  cta: {
    mockLabel: "Take the free US Citizenship readiness check",
    deckLabel: "Get the U.S. Citizenship Anki deck ($9)",
    summary:
      "Take the free U.S. Citizenship practice test (30 timed civics questions), then lock the 128-question 2025 list with the $9 U.S. Citizenship Anki deck (128 cards) before your N-400 interview. Related language decks also live on Prep2Go.",
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
          caption: "2025 test vs 2008 test vs 65/20 track",
          headers: ["Detail", "2025 test (N-400 filed on/after Oct 20, 2025)", "2008 test (filed before Oct 20, 2025)", "65/20 (age 65+, 20+ years LPR)"],
          rows: [
            ["Published list", "128 questions", "100 questions", "20 starred questions"],
            ["Questions asked", "Up to 20", "Up to 10", "10"],
            ["Passing score", "12 correct (60%)", "6 correct (60%)", "6 correct (60%)"],
            ["Stops when", "12 correct or 9 wrong", "6 correct", "6 correct"],
            ["Language", "English", "English", "Language of your choice"],
            ["Medical exemption", "Form N-648", "Form N-648", "Form N-648"],
          ],
        },
        {
          type: "p",
          text: "**Stopping rule:** on the 2025 test civics ends at 12 correct (pass) or 9 wrong (fail), then the officer moves to English reading/writing. Accuracy on a streak of answers matters more than breadth — but any of the 128 can come up. Seniors 65+ with 20+ years as permanent residents study only the 20 starred questions, get 10 of them, need 6, and may take the test in their own language.",
        },
      ],
    },
    {
      heading: "The Three Categories (and Where to Spend Your Time)",
      blocks: [
        {
          type: "table",
          caption: "2025 list structure (128 questions)",
          headers: ["Category", "Questions", "Weight", "What USCIS tests"],
          rows: [
            [
              "American Government",
              "72",
              "~56%",
              "Constitution, branches, federalism, rights",
            ],
            [
              "American History",
              "46",
              "~36%",
              "Colonial era, independence, Civil War, civil rights",
            ],
            [
              "Symbols and Holidays",
              "10",
              "~8%",
              "Capital, Statue of Liberty, flag, anthem, national holidays",
            ],
          ],
        },
        {
          type: "p",
          text: "**Trap:** equal time on all 128. Government is more than half the list — weak answers on branches or “Who is your state’s Governor?” are expensive, and with up to 20 questions asked you will almost certainly get several. History grew to 46 questions in the 2025 version. Symbols and holidays feel easy; do not skip them, do not over-study them.",
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
            "Practice aloud daily — family member asks 20 random questions",
            "Simulate pressure: stand, face a wall, no phone prompts",
            "Drill streaks of 12 correct answers (6 on the 2008 test)",
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
        "On the 2025 test (N-400 filed on or after Oct 20, 2025): up to 20 from a published list of 128; you need 12 correct, and civics ends at 12 right or 9 wrong. If you filed earlier, the 2008 test asks up to 10 from 100 and you need 6.",
    },
    {
      question: "What is the passing score for the US civics test?",
      answer: "60% either way: 12 of 20 on the 2025 test, 6 of 10 on the 2008 test.",
    },
    {
      question: "Do seniors have to study the whole list?",
      answer:
        "No. Applicants 65+ with at least 20 years as permanent residents study only the 20 starred questions. The officer asks 10 of them, you need 6, and you may take the civics test in your own language.",
    },
    {
      question: "Is the US citizenship test in English?",
      answer:
        "Yes, unless you have an approved Form N-648 medical exemption or qualify for an age/residence language exemption (for example 65/20, 50/20, or 55/15). Reading and writing are in English.",
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
        "On the 2025 list: American Government (72), American History (46), and Symbols and Holidays (10). The 2008 list splits 100 questions into Government, History, and Integrated Civics.",
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
    "USCIS hands you 128 questions and asks up to 20. The job is producing 12 correct answers under interview pressure without prompts — before you miss 9. Check your test version by filing date, weight government hardest, practise out loud, and simulate the room. The certificate is worth the drill.",
};
