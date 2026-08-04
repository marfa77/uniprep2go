import type { BlogPostDraft } from "../types";

export const canadaCitizenshipTestPost: BlogPostDraft = {
  slug: "canada-citizenship-test-20-questions-630-dollars",
  title: "Canada Citizenship Test: The 20-Question Exam That Costs $630",
  titleTag: "Canada Citizenship Test 2026: 20 Questions, $630 & How to Pass",
  metaDescription:
    "20 questions. 15 correct to pass. 30 minutes. Canada’s citizenship test is short but expensive. Topic split, fee breakdown, and why geography kills scores.",
  publishedAt: "2026-07-28",
  eyebrow: "Canada · Discover Canada / IRCC",
  clusterId: "canada-citizenship",
  relatedSlugs: [
    "australian-citizenship-test-our-common-bond-complete-guide",
    "us-naturalization-civics-test-100-questions-only-10",
    "life-in-the-uk-test-why-one-in-three-fail",
  ],
  intro:
    "**Canada’s citizenship test is one of the shortest in the world — 20 questions in 30 minutes — and one of the most expensive per question.** Between application, right of citizenship, and related charges, you are near CAD $630 to sit those 20 items. Fail and you pay again in time, stress, and possibly a citizenship-officer interview. This guide covers format, five topic areas, the geography trap, and how to use the free official *Discover Canada* guide instead of error-prone apps.",
  mockSlug: "canadian-citizenship-readiness-check",
  deckSlug: "citizenship-naturalization-anki-bundle",
  cta: {
    mockLabel: "Take the free Canadian Citizenship readiness check",
    deckLabel: "Get the Citizenship & Naturalization Anki Bundle",
    summary:
      "Drill Discover Canada themes with the free Canadian Citizenship readiness check (Prep2Go-sourced). Then lock provinces, history, and rights with the Citizenship & Naturalization Anki Bundle before you file with IRCC — and browse Prep2Go for related immigration decks.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "The Format (Exactly What Happens)",
      blocks: [
        {
          type: "table",
          caption: "Official format",
          headers: ["Detail", "Specification"],
          rows: [
            ["Questions", "20 multiple-choice and true/false"],
            ["Time limit", "30 minutes"],
            ["Passing score", "15/20 (75%)"],
            ["Languages", "English or French"],
            ["Delivery", "Test centre computer; some applicants invited online"],
            ["Cost", "About CAD $630 total (processing + right of citizenship)"],
            ["Study material", "Free Discover Canada guide from IRCC"],
            ["Results", "Immediate at some centres; official notice by mail"],
          ],
        },
        {
          type: "p",
          text: "**Fee structure:** ~$630 is the **application** package, not a separate test ticket. The test is included. Retests/interviews usually add no fee — but a refused application does not refund you. **Online vs in-person:** IRCC assigns the method; you do not choose.",
        },
      ],
    },
    {
      heading: "The Five Topic Areas",
      blocks: [
        {
          type: "p",
          text: "Every question comes from *Discover Canada: The Rights and Responsibilities of Citizenship*. Rough exam clusters:",
        },
        {
          type: "table",
          caption: "Topic shares",
          headers: ["Topic area", "Share", "Key content"],
          rows: [
            [
              "Rights and Responsibilities",
              "~25%",
              "Oath, voting, jury duty, law, community",
            ],
            [
              "History",
              "~25%",
              "Indigenous peoples, colonisation, Confederation, wars, Charter",
            ],
            [
              "Government and Law",
              "~20%",
              "Federal system, Parliament, PM, provinces, courts",
            ],
            [
              "Geography",
              "~15%",
              "Provinces, territories, capitals, oceans, regions",
            ],
            [
              "Economy and Symbols",
              "~15%",
              "Currency, industries, anthem, flag, maple leaf, RCMP",
            ],
          ],
        },
        {
          type: "p",
          text: "**Geography trap:** 10 provinces + 3 territories, each with a capital. Miss “capital of Saskatchewan?” (Regina) or similar and you can drop below 15/20. Drill capitals until automatic.",
        },
      ],
    },
    {
      heading: "The Official Study Guide: Free but Dense",
      blocks: [
        {
          type: "p",
          text: "IRCC publishes Discover Canada free as PDF, audiobook, and eBook (~68 pages). Third-party apps often err or go stale. The official guide is the only source that matters.",
        },
        {
          type: "ol",
          items: [
            "Read once, highlight proper nouns (names, places, dates, laws)",
            "Extract ~50 key facts: dates, people, places, laws, symbols",
            "Flashcard each fact",
            "Chapter quizzes, then full 20-question timed mocks",
          ],
        },
      ],
    },
    {
      heading: "The Pass Rate and What Happens If You Fail",
      blocks: [
        {
          type: "p",
          text: "IRCC does not publish a clean official pass rate; field estimates often put first-time passes around 80–85%. Failures usually skip the official guide, skim geography, or overthink under the clock.",
        },
        {
          type: "ol",
          items: [
            "Near miss → often a second test",
            "Low score → citizenship interview (oral questions from the same guide)",
            "Fail interview → possible refusal; reapply from scratch",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Canada citizenship test?",
      answer: "20 multiple-choice and true/false questions in 30 minutes.",
    },
    {
      question: "What is the passing score for the Canadian citizenship test?",
      answer: "15 correct out of 20 (75%).",
    },
    {
      question: "How much does Canadian citizenship cost?",
      answer:
        "About CAD $630 total ($530 processing + $100 right of citizenship), including the test. Fee waivers may apply for low-income applicants.",
    },
    {
      question: "Is the Canada citizenship test in English or French?",
      answer:
        "You choose English or French when you apply. The test is available in both official languages.",
    },
    {
      question: "How long does it take to get Canadian citizenship?",
      answer:
        "Often roughly 12–24 months application to oath. The test commonly falls several months after filing.",
    },
    {
      question: "What happens if I fail the Canada citizenship test?",
      answer:
        "You may get a second test or a citizenship interview. Fail the interview and the application may be refused — you reapply.",
    },
    {
      question: "Can I take the Canada citizenship test online?",
      answer:
        "Some applicants are invited online via their IRCC account; others sit in person. IRCC assigns the method.",
    },
    {
      question: "What is the official study guide for the Canada citizenship test?",
      answer:
        "Discover Canada: The Rights and Responsibilities of Citizenship — free from IRCC as PDF, eBook, and audiobook.",
    },
    {
      question: "How long should I study for the Canada citizenship test?",
      answer:
        "About 2–4 weeks of daily review — roughly 10–15 focused hours plus several full mocks for most candidates.",
    },
    {
      question: "What is the hardest part of the Canada citizenship test?",
      answer:
        "Geography and specific dates — capitals, territories, and precise historical facts under a 75% cut score.",
    },
  ],
  bottomLine:
    "Canada’s test is short, expensive, and detail-hungry. Twenty questions sound easy until a capital or date blanks you below 15/20. Read Discover Canada, flashcard provinces and capitals, and do not sit until mocks hit ~18/20. The $630 is not coming back.",
};
