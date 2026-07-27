import type { BlogPostDraft } from "../types";

export const swissCitizenshipCantonalFormatPost: BlogPostDraft = {
  slug: "swiss-citizenship-test-cantonal-format-questions",
  title: "Swiss Citizenship Test: There Is No Federal Exam",
  titleTag: "Swiss Citizenship Test 2026: Cantonal Format, Questions & How to Pass",
  metaDescription:
    "Switzerland has no federal citizenship test. Each canton writes its own. Here is what the 48-question exam actually covers, where to find real questions, and why most applicants are underprepared.",
  publishedAt: "2026-07-27",
  eyebrow: "Swiss Einbürgerung · Cantonal knowledge test",
  clusterId: "swiss-citizenship",
  relatedSlugs: ["leben-in-deutschland-test-english-preparation-guide"],
  intro:
    "If you are preparing for Swiss citizenship and searching for \"the\" citizenship test, you are already behind. Switzerland does not have a single federal naturalisation exam. The federal government sets the framework — 10 years of residence, a C permit, language skills, integration — but the **knowledge test** is written, administered, and scored by your **canton** and sometimes your **commune**. That means a candidate in Zurich faces a different test than a candidate in Geneva. The pass rates, question banks, and even the languages of administration vary. This guide explains what the test actually looks like, where to find your canton’s real questions, and how to study without wasting money on generic \"Swiss citizenship prep\" books that do not match your local exam.",
  mockSlug: "swiss-citizenship-readiness-check",
  deckSlug: "swiss-citizenship-anki-deck",
  cta: {
    mockLabel: "Take the free Swiss citizenship readiness check",
    deckLabel: "Drill weak topics with the Anki deck",
    summary:
      "Take the free Einbürgerung Schweiz readiness check — federal civics, cantonal structure, and daily-life scenarios — then drill weak topics with the Swiss Citizenship Anki deck before your cantonal exam date.",
  },
  sections: [
    {
      heading: "The Three Layers You Must Pass",
      blocks: [
        {
          type: "p",
          text: "Swiss naturalisation has three independent approval stages. You can fail at any of them.",
        },
        {
          type: "table",
          caption: "Federal, cantonal, and communal naturalisation layers",
          headers: ["Layer", "What they check", "Who decides"],
          rows: [
            [
              "Federal",
              "10 years residence, C permit, integration, no security threat, language B1 oral / A2 written",
              "State Secretariat for Migration (SEM)",
            ],
            [
              "Cantonal",
              "Cantonal residence (2–5 years), deeper integration, civic knowledge test",
              "Your canton",
            ],
            [
              "Communal",
              "Local ties, community participation, sometimes a local interview or local knowledge test",
              "Your municipality (Gemeinde / commune)",
            ],
          ],
        },
        {
          type: "p",
          text: "The federal layer does not include a knowledge test. The cantonal and communal layers often do. In practice, this means you can meet every federal requirement, speak fluent German, and still fail because your commune in Aargau does not think you know enough about local history — or because you missed the specific format of the Vaud knowledge test.",
        },
      ],
    },
    {
      heading: "What the Knowledge Test Actually Looks Like",
      blocks: [
        {
          type: "p",
          text: "There is no national question bank. However, patterns emerge across cantons:",
        },
        {
          type: "topics",
          items: [
            {
              title: "Format",
              body: "",
              bullets: [
                "**40 to 60 multiple-choice questions** is typical. Some cantons use oral interviews instead of or alongside written tests.",
                "**Time limit:** Usually 45–60 minutes.",
                "**Passing score:** Most cantons require 60–70% correct answers. Some communes add an interview where \"passing\" is subjective.",
                "**Languages:** Administered in the canton’s official language (German, French, or Italian). You cannot take the test in English.",
              ],
            },
            {
              title: "Topic breakdown (typical cantonal test)",
              body: "",
              bullets: [
                "Federal political system: 25–30%",
                "Swiss history and geography: 20–25%",
                "Society and daily life: 15–20%",
                "Cantonal political system and geography: 15–20%",
                "Local (communal) knowledge: 10–15%",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "The federal section is consistent across cantons because it is drawn from the same source material: the Swiss Confederation’s political system, the Federal Council, the seven Federal Councillors and their departments, direct democracy (initiatives and referendums), and the three levels of government.",
        },
        {
          type: "p",
          text: "The cantonal and local sections are where candidates lose points. A Zurich test will ask about the Grosser Rat and the canton’s school system. A Vaud test will ask about the Grand Conseil and the Lavaux vineyards.",
        },
      ],
    },
    {
      heading: "Real Questions From Cantonal Banks",
      blocks: [
        {
          type: "p",
          text: "Some cantons publish official question lists. Others do not. Here is what is publicly available:",
        },
        {
          type: "topics",
          items: [
            {
              title: "Canton of Vaud",
              body: "Publishes an official list of federal and cantonal questions on its website. Topics include:",
              bullets: [
                "How many members sit on the Swiss National Council? (200)",
                "What is the name of the highest Swiss court? (Federal Supreme Court, Lausanne)",
                "Which body elects the Federal Council? (The United Federal Assembly)",
                "Name the six natural regions of the Canton of Vaud.",
                "What is the role of the Communal Council (Conseil communal)?",
              ],
            },
            {
              title: "Canton of Zurich",
              body: "Does not publish a full question bank but provides a preparation brochure. The test covers:",
              bullets: [
                "The 26 cantons and their capitals",
                "The Federal Constitution’s key articles",
                "Swiss neutrality and its historical basis",
                "Canton of Zurich’s government structure (Kantonsrat, Regierungsrat)",
              ],
            },
            {
              title: "German-speaking cantons (general)",
              body: "A common format is 48 questions in 45 minutes. A 2024 SRF report noted that even native Swiss citizens struggle with some questions. Examples from public quizzes:",
              bullets: [
                "What is \"Polenta\"? (A traditional cornmeal dish, associated with Ticino and Italy)",
                "Who was the first woman elected to the Federal Council? (Elisabeth Kopp, 1984)",
                "Who is Ulrich Zwingli? (A leader of the Reformation in Zurich)",
              ],
            },
          ],
        },
        {
          type: "p",
          text: "**The trap:** Many online \"Swiss citizenship test\" apps use generic trivia. Your canton’s test is not trivia. It is civics. Knowing that Roger Federer is Swiss will not help you. Knowing how a cantonal parliament is elected will.",
        },
      ],
    },
    {
      heading: "The Language Test vs The Knowledge Test",
      blocks: [
        {
          type: "p",
          text: "Applicants confuse these constantly. They are separate requirements.",
        },
        {
          type: "table",
          caption: "Language test vs Einbürgerung knowledge test",
          headers: ["", "Language test (fide / Goethe / DELF)", "Knowledge test (Einbürgerungstest)"],
          rows: [
            [
              "Purpose",
              "Prove you can communicate in a national language",
              "Prove you understand Swiss civics",
            ],
            [
              "Who requires it",
              "Federal law (mandatory for all)",
              "Cantonal / communal law (varies)",
            ],
            [
              "Format",
              "fide: ~100 minutes, situational tasks; Goethe/DELF: standard language exam",
              "Cantonal: 40–60 MCQs or oral interview",
            ],
            [
              "Cost",
              "fide: CHF 120; Goethe/DELF: CHF 150–250",
              "Usually free or CHF 50–100",
            ],
            [
              "Where to register",
              "Certified language centres (fide-info.ch)",
              "Your canton’s population office (Einwohnerkontrolle / Service de la population)",
            ],
          ],
        },
        {
          type: "p",
          text: "You must pass the language test **before** you apply for naturalisation in most cantons. The knowledge test usually happens **during** the cantonal review process.",
        },
        {
          type: "p",
          text: "**Critical detail:** The fide test gives you a \"passeport des langues\" with unlimited validity. If you took it five years ago for a Permis C, it still counts for naturalisation. Do not retake it unless your level was below B1 oral / A2 written.",
        },
      ],
    },
    {
      heading: "How to Study: Resources That Actually Exist",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "1. «Der Bund kurz erklärt» (The Swiss Confederation — A Brief Guide)",
              body: "Published free by the federal government. Available in German, French, Italian, Romansh, and English. Read it first in English to understand the concepts, then in your canton’s language to learn the terminology. This is the single most important document for the federal section of any cantonal test.",
            },
            {
              title: "2. Your canton’s official question list",
              body: "Check your canton’s website under «Einbürgerung» or «Naturalisation.» Vaud publishes a full list. Aargau provides a preparation brochure. If your canton does not publish questions, email the population office and ask for study materials. They should tell you what the test covers.",
            },
            {
              title: "3. «Der Kleine Schweizermacher» by Hurter / Kernen / Moser-Léchot",
              body: "A preparation book with MCQs after each chapter. Designed for German-speaking cantons but useful for the federal section regardless of region.",
            },
            {
              title: "4. Local newspapers and municipal websites",
              body: "For the communal section, read your municipality’s website. Know the name of the mayor (Gemeindepräsident / maire), the number of residents, and one current local issue. Some communes ask: «What is being built on Hauptstrasse?» or «Who is your municipal councillor?»",
            },
            {
              title: "5. Practice tests",
              body: "Generic apps are useless. Use canton-specific resources. If your canton does not provide an online test, build your own flashcards from the official question list. Spaced repetition works better than re-reading the brochure.",
            },
          ],
        },
      ],
    },
    {
      heading: "Timeline and Costs (Realistic)",
      blocks: [
        {
          type: "table",
          caption: "Typical Swiss ordinary naturalisation timeline and costs",
          headers: ["Step", "Time", "Cost"],
          rows: [
            ["Language test (fide)", "4–6 weeks for results", "CHF 120"],
            [
              "Gather documents, civil registry",
              "2–6 months",
              "CHF 100–300 (translations, apostilles)",
            ],
            [
              "Submit application to commune",
              "—",
              "CHF 0–500 (varies by commune)",
            ],
            ["Communal review and interview", "3–12 months", "Usually included"],
            ["Cantonal review and knowledge test", "3–12 months", "CHF 0–100"],
            ["Federal authorisation (SEM)", "6–12 months", "CHF 100–900 (federal fee)"],
            ["Total", "1.5–3 years", "CHF 500–2,000+"],
          ],
        },
        {
          type: "p",
          text: "The federal fee for simplified naturalisation (by marriage) is CHF 900, payable upfront and generally not refunded if you are refused. Ordinary naturalisation fees vary by canton and commune and can exceed CHF 2,000 in expensive municipalities.",
        },
      ],
    },
    {
      heading: "Why People Fail (and How to Avoid It)",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Reason 1: They study the wrong canton’s material",
              body: "A candidate in Bern uses a Zurich practice app. The apps have different question banks. Always use your canton’s official resources.",
            },
            {
              title: "Reason 2: They ignore the communal layer",
              body: "You memorise the 26 cantons but cannot name your local municipal council president. The commune votes on your application. Local knowledge matters.",
            },
            {
              title: "Reason 3: They treat it like the US civics test",
              body: "The US naturalisation test has 100 fixed questions. You can buy a single book and pass. The Swiss system is decentralised. There is no \"official question bank\" for the whole country.",
            },
            {
              title: "Reason 4: Language level is borderline",
              body: "You passed fide with B1 oral but struggle to read the test questions in German under time pressure. If your reading is weak, practice reading «Der Bund kurz erklärt» aloud before the test.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is there a federal Swiss citizenship test?",
      answer:
        "No. Switzerland does not have a federal citizenship test. Each canton and some communes administer their own knowledge exams or interviews. The federal government sets the framework but does not write the test.",
    },
    {
      question: "How many questions are on the Swiss citizenship test?",
      answer:
        "It varies by canton. Most use 40 to 60 multiple-choice questions. Some use oral interviews instead of or alongside written tests. Check your canton’s official website for the exact format.",
    },
    {
      question: "What score do you need to pass the Swiss naturalisation test?",
      answer:
        "Most cantons require 60% to 70% correct answers. Some communes use interviews where the assessment is subjective rather than scored.",
    },
    {
      question: "Can you take the Swiss citizenship test in English?",
      answer:
        "No. The test is administered in the official language of your canton: German, French, or Italian. You must demonstrate B1 oral and A2 written proficiency in that language before you even apply.",
    },
    {
      question: "How much does Swiss citizenship cost?",
      answer:
        "For ordinary naturalisation, expect CHF 500 to CHF 2,000+ including federal, cantonal, and communal fees, plus language test costs and document translations. Simplified naturalisation by marriage costs CHF 900 at the federal level, plus cantonal and communal fees.",
    },
    {
      question: "How long does the Swiss naturalisation process take?",
      answer:
        "Typically 1.5 to 3 years from application to passport. Federal authorisation alone takes 6 to 12 months after cantonal and communal approval.",
    },
    {
      question: "What is the best way to prepare for the Swiss citizenship knowledge test?",
      answer:
        "Read «Der Bund kurz erklärt» in your canton’s language, download your canton’s official question list (if published), and study local municipal facts. Use spaced-repetition flashcards for the federal civics section. Do not rely on generic trivia apps.",
    },
    {
      question: "Does the language test (fide) expire?",
      answer:
        "No. The fide «passeport des langues» has unlimited validity. If you already passed fide for a residence permit, you do not need to retake it for naturalisation unless your level was below B1 oral / A2 written.",
    },
    {
      question: "Can you fail the Swiss citizenship test and retake it?",
      answer:
        "Yes, but the rules vary by canton. Some allow one retake after a waiting period. Others require you to restart the application. Check with your canton’s population office before you sit the exam.",
    },
    {
      question: "What is the hardest part of the Swiss citizenship test?",
      answer:
        "The cantonal and local sections. Most candidates handle the federal civics section because the material is standardised. The cantonal questions — local government structure, geography, and current issues — are where underprepared applicants lose points.",
    },
  ],
  bottomLine:
    "Swiss citizenship is not a test you can cram for with a single app. It is a multi-layered process where your canton and your commune have as much power as the federal government. The knowledge test is real, it is local, and it is not published in English. Start with «Der Bund kurz erklärt,» find your canton’s official question list, and drill the material until you can name your Federal Councillors, your cantonal parliament, and your local mayor without hesitation.",
};
