import type { BlogPostDraft } from "../types";

export const canadaCitizenshipTestPost: BlogPostDraft = {
  slug: "canada-citizenship-test-20-questions-630-dollars",
  title: "Canada Citizenship Test: The 20-Question Exam That Costs $653",
  titleTag: "Canada Citizenship Test 2026: 20 Questions, $653 & How to Pass",
  metaDescription:
    "20 questions. 15 correct to pass. 45 minutes. Canada’s citizenship test is short but expensive (CAD $653 from 31 Mar 2026). Topic split, fee breakdown, and why geography kills scores.",
  publishedAt: "2026-07-28",
  eyebrow: "Canada · Discover Canada / IRCC",
  clusterId: "canada-citizenship",
  relatedSlugs: [
    "australian-citizenship-test-our-common-bond-complete-guide",
    "us-naturalization-civics-test-100-questions-only-10",
    "life-in-the-uk-test-why-one-in-three-fail",
  ],
  intro:
    "**Canada’s citizenship test is one of the shortest in the world — 20 questions in 45 minutes — and one of the most expensive per question.** Between application, right of citizenship, and related charges, adult fees are **CAD $653** from **31 March 2026** (was CAD $630). Fail and you pay again in time, stress, and possibly a citizenship-officer interview. This guide covers format, five topic areas, the geography trap, and how to use the free official *Discover Canada* guide instead of error-prone apps.",
  mockSlug: "canadian-citizenship-readiness-check",
  deckSlug: "canadian-citizenship-anki-deck",
  cta: {
    mockLabel: "Take the free Canadian Citizenship readiness check",
    deckLabel: "Get the Canadian Citizenship Anki deck ($9.99)",
    summary:
      "Drill Discover Canada themes with the free Canadian Citizenship readiness check (Prep2Go-sourced). Then lock provinces, history, and rights with the $9.99 Canadian Citizenship Anki deck before you file with IRCC — and browse Prep2Go for related immigration decks.",
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
            ["Time limit", "45 minutes"],
            ["Passing score", "15/20 (75%)"],
            ["Languages", "English or French"],
            ["Delivery", "Online, in person, or Microsoft Teams, as the invitation sets"],
            ["Cost", "CAD $653 total from 31 Mar 2026 (processing + right of citizenship)"],
            ["Study material", "Free Discover Canada guide from IRCC"],
            ["Results", "Online score is unofficial until an officer reviews it. In person and on Teams, the official score is given right after the test"],
          ],
        },
        {
          type: "p",
          text: "**Fee structure:** CAD $653 (from 31 March 2026) is the adult **application** package, not a separate test ticket. The test is included. Confirm the live fee table on canada.ca. **How you sit it:** IRCC assigns online, in person, or Microsoft Teams. You do not pick the method.",
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
          text: "IRCC does not publish a pass rate. On the results page read 21 November 2026, you have up to 3 attempts in the 30-day period on the invitation. Fail all 3 and IRCC invites you to a hearing.",
        },
        {
          type: "ol",
          items: [
            "Up to 3 attempts in the 30-day period, online, on Microsoft Teams, or in person",
            "Fail all 3 and IRCC invites you to a hearing of 30 to 90 minutes",
            "The oral knowledge check at that hearing is 20 questions, and 15 must be correct. A language check there can be up to 9 questions, with 6 to pass. Fail the hearing and the application is refused",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Canada citizenship test?",
      answer: "20 multiple-choice or true/false questions in 45 minutes. You need 15 correct (75%). You get up to 3 attempts in the 30-day period on the invitation.",
    },
    {
      question: "What is the passing score for the Canadian citizenship test?",
      answer: "15 correct out of 20 (75%).",
    },
    {
      question: "How much does Canadian citizenship cost?",
      answer:
        "CAD $653 total for adults from 31 March 2026 (processing + right of citizenship), including the test. Confirm the live fee table on canada.ca. Fee waivers may apply for low-income applicants.",
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
    "Canada’s test is short, expensive, and detail-hungry. Twenty questions sound easy until a capital or date blanks you below 15/20. Read Discover Canada, flashcard provinces and capitals, and do not sit until mocks hit ~18/20. The CAD $653 application fee is not coming back.",
};
