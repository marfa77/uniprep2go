import type { BlogPostDraft } from "../types";

export const usNaturalizationCivicsPost: BlogPostDraft = {
  slug: "us-naturalization-civics-test-100-questions-only-10",
  title: "US Naturalization Civics Test 2027: 128 Questions, Up to 20 Asked",
  titleTag: "US Citizenship Civics Test 2027: 128 Questions, 12 to Pass",
  metaDescription:
    "USCIS 2025 civics test for 2026 interviews: 128 published questions, up to 20 asked, 12 correct to pass (2008 test: 6 of 10 if you filed before Oct 20, 2025). Format, topic weights, 65/20 list, free timed check + Anki.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "USA · USCIS Naturalization Civics",
  clusterId: "us-citizenship",
  relatedSlugs: [
    "canada-citizenship-test-20-questions-630-dollars",
    "life-in-the-uk-test-why-one-in-three-fail",
    "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
  ],
  intro:
    "**If you file Form N-400 on or after 20 October 2025, you take the 2025 civics test: 20 questions from a published list of 128, and you need 12 correct.** The officer stops once you reach 12 right or 9 wrong. Filed earlier? You take the 2008 test: up to 10 questions from 100, with 6 to pass. This guide covers both versions, the English test, the 65/20 rule and what happens if you fail, all from USCIS.",
  mockSlug: "us-citizenship-readiness-check",
  deckSlug: "us-citizenship-anki-deck",
  cta: {
    mockLabel: "Take the free US Citizenship readiness check",
    deckLabel: "Get the U.S. Citizenship Anki deck",
    summary:
      "Take the free U.S. Citizenship practice test, then review the 128-question 2025 list daily with the U.S. Citizenship Anki deck before your N-400 interview. Related language decks also live on Prep2Go.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "Which civics test will you take?",
      blocks: [
        {
          type: "table",
          caption: "USCIS civics tests (uscis.gov, checked 24 Nov 2026)",
          headers: ["", "2008 test", "2025 test"],
          rows: [
            ["Applies if you filed Form N-400", "Before 20 October 2025", "On or after 20 October 2025"],
            ["Question list", "100 questions", "128 questions"],
            ["Questions asked", "Up to 10", "20"],
            ["To pass", "6 correct", "12 correct"],
            ["You fail at", "5 wrong", "9 wrong"],
          ],
        },
        {
          type: "p",
          text: "Both tests are oral. The officer stops as soon as you reach the pass number or the fail number, so many interviews end before the last question. USCIS says the 2025 test is based on the 2020 test with some changes to how it is given.",
        },
      ],
    },
    {
      heading: "How do you answer questions whose answers change?",
      blocks: [
        {
          type: "p",
          text: "Some answers depend on elections or appointments. USCIS says you must give the name of the official serving **at the time of your interview**, and it lists those answers on its Civics Test Updates page. Check it in the week before your interview.",
        },
      ],
    },
    {
      heading: "What is on the English test?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Speaking:** the officer judges your spoken English during the N-400 eligibility interview.",
            "**Reading:** read aloud 1 of 3 sentences correctly.",
            "**Writing:** write 1 of 3 sentences correctly. USCIS publishes the official writing vocabulary list.",
          ],
        },
      ],
    },
    {
      heading: "What is the 65/20 special consideration?",
      blocks: [
        {
          type: "p",
          text: "If you are **65 or older** and have been a lawful permanent resident for **20 or more years**, USCIS gives you 10 questions from a special bank of 20 questions marked with an asterisk, from either the 2008 or the 2025 test. You may study just those 20, and you may take the test in the language of your choice. See USCIS's exceptions and accommodations page for medical and other exceptions.",
        },
      ],
    },
    {
      heading: "What happens if you fail part of the test?",
      blocks: [
        {
          type: "ul",
          items: [
            "You have **two opportunities**: the first interview and a re-examination.",
            "If you fail any portion, USCIS reschedules you **between 60 and 90 days** after the first interview.",
            "At the re-examination you are tested **only on the portion you failed**, with a different test form.",
            "Missing the re-examination without USCIS excusing you counts as a failed attempt.",
          ],
        },
      ],
    },
    {
      heading: "How should you study?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Use the official list for your test", body: "Download the 128 Civics Questions and Answers (2025 test) or the 100 questions (2008 test) from USCIS, plus the free study guide *One Nation, One People*." },
            { title: "Answer out loud", body: "The test is oral. Say each answer aloud so it comes out under interview pressure." },
            { title: "Review daily", body: "Spaced review with the [US citizenship Anki deck](/decks/us-citizenship-anki-deck) keeps all 128 answers fresh." },
            { title: "Test yourself", body: "Use the [US citizenship readiness check](/mock-exams/us-citizenship-readiness-check), then check the Civics Test Updates page before your interview." },
          ],
        },
        {
          type: "p",
          text: "Comparing with other countries? See the [Life in the UK Test guide](/blog/life-in-the-uk-test-why-one-in-three-fail).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the US citizenship civics test?",
      answer: "If you filed Form N-400 on or after 20 October 2025, the 2025 test asks 20 questions from a list of 128 and you need 12 correct (USCIS, checked 24 Nov 2026).",
    },
    {
      question: "Which test do I take if I filed before 20 October 2025?",
      answer: "The 2008 test: up to 10 questions from a list of 100, and you need 6 correct.",
    },
    {
      question: "When does the officer stop asking questions?",
      answer: "On the 2025 test, once you answer 12 correctly or 9 incorrectly. On the 2008 test, at 6 correct or 5 incorrect.",
    },
    {
      question: "Do seniors have to study the whole list?",
      answer: "Not if you are 65 or older with 20 or more years as a permanent resident: you may study the 20 asterisked questions, are asked 10, and may test in your chosen language.",
    },
    {
      question: "What happens if I fail the civics test?",
      answer: "You get a re-examination between 60 and 90 days later, tested only on the portion you failed.",
    },
    {
      question: "How many sentences must I read and write?",
      answer: "Read aloud 1 of 3 sentences correctly and write 1 of 3 sentences correctly.",
    },
  ],
  bottomLine:
    "Know which test your filing date gives you, study the official list out loud, and check the updates page before your interview. Sources: [USCIS 2025 Civics Test](https://www.uscis.gov/citizenship-resource-center/naturalization-test-and-study-resources/2025-civics-test), [USCIS Study for the Test](https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test) and [USCIS Policy Manual, Vol. 12, Part E, Ch. 2](https://www.uscis.gov/policy-manual/volume-12-part-e-chapter-2), checked 24 Nov 2026.",
};
