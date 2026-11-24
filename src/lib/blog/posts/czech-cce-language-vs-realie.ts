import type { BlogPostDraft } from "../types";

export const czechCceLanguageVsRealiePost: BlogPostDraft = {
  slug: "czech-cce-language-vs-realie-civics-two-exams",
  title: "Czech Citizenship: CCE Language vs. Zkouška z Reálií — Two Exams, Not One",
  titleTag: "Czech CCE Language vs Reálie: Two Exams, Not One",
  metaDescription:
    "Czech citizenship: B1 CCE language + zkouška z reálií are separate exams. A2 is for PR only. Costs, fail modes, and how to split prep.",
  publishedAt: "2026-08-04",
  contentUpdated: "2026-11-24",
  eyebrow: "Czechia · CCE vs Reálie",
  clusterId: "czech-citizenship",
  relatedSlugs: [
    "czech-citizenship-exam-zkouska-z-realii-complete-guide",
    "polish-citizenship-wiedza-o-polsce-gap-2026",
    "italy-citizenship-b1-test-cils-celi-not-civics",
  ],
  intro:
    "**Czech citizenship needs two separate exams, both at B1: Czech language and Czech realities (reálie).** The language exam has written and spoken parts, each needing 60%; the realities exam is 30 questions from a public bank of 300, with 18 points to pass. This guide compares the two, with the official format, fees, registration and exemptions.",
  mockSlug: "czech-citizenship-readiness-check",
  deckSlug: "czech-a2-cce-anki-deck",
  cta: {
    mockLabel: "Take the free Czech Citizenship readiness check",
    deckLabel: "Get the Czech CCE deck on Prep2Go",
    summary:
      "Language first? Drill A2/B1 with the Czech CCE deck on Prep2Go. Civics next? Use the free Czech Citizenship readiness check, then the Czech Citizenship Anki deck for reálie. Read the complete reálie guide for the 30-topic / 300-question strategy.",
    extraLinks: [
      {
        href: "/blog/czech-citizenship-exam-zkouska-z-realii-complete-guide",
        label: "Complete Guide to the Czech Citizenship Exam (zkouška z reálií)",
      },
      {
        href: "/decks/czech-citizenship-anki-deck",
        label: "Czech Citizenship Anki waitlist (reálie / civics)",
      },
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "Which two exams does Czech citizenship require?",
      blocks: [
        {
          type: "p",
          text: "For Czech citizenship you prove two things at **B1** level: Czech language, and knowledge of Czech realities (reálie). They are separate exams with separate fees, run through the official Czech-for-foreigners system (cestina-pro-cizince.cz), and you can register for one or both.",
        },
        {
          type: "table",
          caption: "Exams for Czech citizenship (cestina-pro-cizince.cz, checked 24 Nov 2026)",
          headers: ["", "Czech language exam", "Czech realities exam"],
          rows: [
            ["Level", "B1", "B1"],
            ["Format", "Written: reading 50 min, listening 30–35 min, writing 60 min; oral: speaking 15–18 min in pairs", "30 multiple-choice questions, 4 options each, 30 minutes"],
            ["To pass", "At least 60% overall and in each part", "At least 18 of 30 points (60%)"],
            ["If you fail", "Repeat the whole exam; no limit on attempts", "Retake at a later date after re-registering; no limit"],
            ["Fee", "CZK 3,700", "CZK 2,000"],
          ],
        },
        {
          type: "p",
          text: "Both exams together cost **CZK 5,700**, paid by bank transfer, with proof of payment brought on the exam day.",
        },
      ],
    },
    {
      heading: "How is the realities exam built?",
      blocks: [
        {
          type: "p",
          text: "The 30 questions are drawn only from a **public bank of 300 questions**: 16 on civic basics, 7 on geography and 7 on history and culture. One point per correct answer. The full strategy is in the [Czech realities exam guide](/blog/czech-citizenship-exam-zkouska-z-realii-complete-guide).",
        },
      ],
    },
    {
      heading: "How do you register and get results?",
      blocks: [
        {
          type: "ul",
          items: [
            "Register online through ÚJOP UK, choosing your preferred centre and day. Places are allocated at least 14 days before each date.",
            "Pay within the deadline stated in your confirmation (7 days).",
            "Results appear online **30 days** after the exam; the certificate arrives by post within 7 weeks and does not expire.",
          ],
        },
      ],
    },
    {
      heading: "Who is exempt?",
      blocks: [
        {
          type: "ul",
          items: [
            "People who completed at least 3 school years at a Czech-language school.",
            "People under 15 or over 65 when they apply.",
            "People whose disability prevents them from learning Czech.",
            "For the language exam only: equivalent certificates such as a Czech maturita or an ALTE certificate at B1 or higher.",
          ],
        },
        {
          type: "p",
          text: "The Ministry of the Interior can also waive either requirement for reasons of special concern, if you ask with your citizenship application.",
        },
      ],
    },
    {
      heading: "Which should you prepare first?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Language first if your Czech is below B1", body: "It takes longest and needs 60% in every part. Drill vocabulary with the [Czech CCE deck](/decks/czech-a2-cce-anki-deck)." },
            { title: "Realities alongside", body: "The 300 questions are public; work through them and test yourself with the [Czech citizenship readiness check](/mock-exams/czech-citizenship-readiness-check)." },
            { title: "Book both together if you are ready", body: "Registering for both costs CZK 5,700 and saves a second registration." },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What Czech level do I need for citizenship?",
      answer: "B1, for both the language exam and the realities exam (cestina-pro-cizince.cz, checked 24 Nov 2026).",
    },
    {
      question: "How many questions are on the realities exam?",
      answer: "30 multiple-choice questions in 30 minutes, drawn from a public bank of 300.",
    },
    {
      question: "What is the pass mark for the realities exam?",
      answer: "At least 18 of 30 points (60%).",
    },
    {
      question: "How much do the exams cost?",
      answer: "CZK 3,700 for language, CZK 2,000 for realities, or CZK 5,700 for both.",
    },
    {
      question: "What happens if I fail the language exam?",
      answer: "You repeat the whole exam. There is no limit on attempts.",
    },
    {
      question: "Who does not need the exams?",
      answer: "Among others, people who completed at least 3 school years at a Czech-language school, people under 15 or over 65 at application, and people with a disability that prevents them learning Czech.",
    },
  ],
  bottomLine:
    "Two exams, both at B1: plan the language exam first and work through the 300 public realities questions alongside it. Sources: [Czech for foreigners — general information](https://cestina-pro-cizince.cz/obcanstvi/cs_CZ/obecne-informace/), [language exam](https://cestina-pro-cizince.cz/obcanstvi/cs_CZ/zkouska-z-ceskeho-jazyka/informace-o-zkousce-jazyk/), [realities exam](https://cestina-pro-cizince.cz/obcanstvi/cs_CZ/zkouska-z-ceskych-realii/informace-o-zkousce-realie/) and [fees](https://cestina-pro-cizince.cz/obcanstvi/obecne-informace/zkouska-pro-ucely-udelovani-statniho-obcanstvi-cr/poplatek-za-zkousku/), checked 24 Nov 2026.",
};
