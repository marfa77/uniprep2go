import type { BlogPostDraft } from "../types";

export const canadaCitizenshipTestPost: BlogPostDraft = {
  slug: "canada-citizenship-test-20-questions-630-dollars",
  title: "Canada Citizenship Test: The 20-Question Exam That Costs $653",
  titleTag: "Canada Citizenship Test 2027: 20 Questions, $653 & How to Pass",
  metaDescription:
    "Canada citizenship test 2027 prep: 20 questions, 15 correct to pass, 45 minutes. Application fee CAD $653 (from 31 Mar 2026). Topic split, fee breakdown, and why geography kills scores.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "Canada · Discover Canada / IRCC",
  clusterId: "canada-citizenship",
  relatedSlugs: [
    "australian-citizenship-test-our-common-bond-complete-guide",
    "us-naturalization-civics-test-100-questions-only-10",
    "life-in-the-uk-test-why-one-in-three-fail",
  ],
  intro:
    "**Canada's citizenship test is 20 questions in 45 minutes, and you need 15 right.** Most applicants take it online, with up to three attempts in a 30-day window. An adult application costs CAN$653. This guide covers the official format, who must take it, what happens if you fail, and how to study Discover Canada, all from IRCC.",
  mockSlug: "canadian-citizenship-readiness-check",
  deckSlug: "canadian-citizenship-anki-deck",
  cta: {
    mockLabel: "Take the free Canadian Citizenship readiness check",
    deckLabel: "Get the Canadian Citizenship Anki deck",
    summary:
      "Drill Discover Canada themes with the free Canadian Citizenship readiness check. Then review provinces, history and rights with the Canadian Citizenship Anki deck before you file with IRCC, and browse Prep2Go for related immigration decks.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "What is the Canadian citizenship test?",
      blocks: [
        {
          type: "table",
          caption: "Citizenship test (IRCC, canada.ca, checked 24 Nov 2026)",
          headers: ["Detail", "Official rule"],
          rows: [
            ["Questions", "20, multiple choice or true/false"],
            ["Language", "English or French"],
            ["Time", "45 minutes"],
            ["To pass", "At least 15 of 20 correct"],
            ["Attempts", "Up to 3 chances within your 30-day test period"],
            ["Who takes it", "In most cases, applicants aged 18 to 54 on the day they sign the application"],
          ],
        },
        {
          type: "p",
          text: "The test has no language-skills questions; IRCC assesses language separately. Applicants under 18, those 55 or older, and those granted a waiver do not take it.",
        },
      ],
    },
    {
      heading: "How does the online test work?",
      blocks: [
        {
          type: "ul",
          items: [
            "IRCC invites most applicants to take the test **online**, unless they need an accommodation.",
            "You can take it from anywhere, monitored by webcam, and have **30 days** to complete it.",
            "Some people take it in person or on Microsoft Teams as an accommodation.",
            "You see an unofficial score straight away; an officer reviews it before it becomes official, and there is no emailed confirmation.",
          ],
        },
      ],
    },
    {
      heading: "What happens if you fail?",
      blocks: [
        {
          type: "p",
          text: "Within the 30-day period you have up to 3 attempts. If you fail all three, IRCC invites you to a **hearing** with a citizenship official, which lasts 30 to 90 minutes. It includes an oral knowledge test of 20 questions (15 to pass) and up to 9 language questions (6 to pass). If you fail the hearing, your application is refused and you must reapply and pay the fees again. Passing the test may still lead to an interview, which is separate from a hearing.",
        },
      ],
    },
    {
      heading: "What does it cost?",
      blocks: [
        {
          type: "p",
          text: "IRCC's fee list gives **CAN$653** for an adult (18 and over), which includes the processing fee and the right of citizenship fee. A minor's application costs CAN$100.",
        },
      ],
    },
    {
      heading: "How should you study?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Use Discover Canada", body: "IRCC bases every test question on its free study guide, *Discover Canada: The Rights and Responsibilities of Citizenship*, available online, as a PDF or eBook, in audio and on paper." },
            { title: "Review with spaced repetition", body: "The [Canadian citizenship Anki deck](/decks/canadian-citizenship-anki-deck) keeps history, rights, provinces and government fresh." },
            { title: "Practise under the real conditions", body: "20 questions, 45 minutes, 15 to pass: take the [Canadian citizenship readiness check](/mock-exams/canadian-citizenship-readiness-check)." },
            { title: "Prepare your setup", body: "For the online test, check your webcam and a quiet room before your 30-day window opens." },
          ],
        },
        {
          type: "p",
          text: "Comparing with the US? See the [US naturalization civics test guide](/blog/us-naturalization-civics-test-100-questions-only-10).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Canadian citizenship test?",
      answer: "20 multiple-choice or true/false questions in 45 minutes (IRCC, checked 24 Nov 2026).",
    },
    {
      question: "What score do I need to pass?",
      answer: "At least 15 of the 20 questions.",
    },
    {
      question: "How much does a Canadian citizenship application cost?",
      answer: "CAN$653 for an adult, including the processing fee and the right of citizenship fee; CAN$100 for a minor.",
    },
    {
      question: "Who has to take the test?",
      answer: "In most cases, applicants aged 18 to 54 on the day they sign their application.",
    },
    {
      question: "What if I fail the test three times?",
      answer: "IRCC invites you to a hearing with a citizenship official. If you fail the hearing, the application is refused and you must reapply.",
    },
    {
      question: "What is the official study guide?",
      answer: "Discover Canada: The Rights and Responsibilities of Citizenship. IRCC bases all test questions on it.",
    },
  ],
  bottomLine:
    "Study Discover Canada, aim well above 15 of 20, and use your three online attempts wisely. Sources: [IRCC — how the test works](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/how-it-works.html), [study for the test](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/study.html), [test results](https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/test/results.html) and [IRCC fee list](https://ircc.canada.ca/english/information/fees/fees.asp), checked 24 Nov 2026.",
};
