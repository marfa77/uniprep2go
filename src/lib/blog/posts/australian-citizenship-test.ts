import type { BlogPostDraft } from "../types";

export const australianCitizenshipTestPost: BlogPostDraft = {
  slug: "australian-citizenship-test-our-common-bond-complete-guide",
  title: "The Complete Guide to the Australian Citizenship Test",
  titleTag: "Australian Citizenship Test: Format, Values Rule & Pass",
  metaDescription:
    "Australian citizenship test: 20 MCQs, 45 min, 75% pass. All 5 values questions must be correct. Our Common Bond topics, traps, and prep.",
  publishedAt: "2026-08-04",
  eyebrow: "Australia · Our Common Bond",
  clusterId: "australian-citizenship",
  relatedSlugs: [
    "canada-citizenship-test-20-questions-630-dollars",
    "life-in-the-uk-test-why-one-in-three-fail",
    "us-naturalization-civics-test-100-questions-only-10",
  ],
  intro:
    "**The Australian citizenship test is not a language exam and not a personal interview.** It is a **computer-based, multiple-choice test of 20 questions** drawn from the Department of Home Affairs booklet *Australian Citizenship: Our Common Bond* (OCB). You have **45 minutes**, need **15/20 (75%)**, and face the rule that destroys unprepared candidates: **5 of those 20 are Australian values questions, and you must get all 5 correct.** Miss one values item and you fail — even at 19/20 overall. This guide covers format, the four OCB categories, values traps, and a first-attempt prep plan mapped to UniPrep2Go’s free readiness check and Citizenship Anki Bundle.",
  mockSlug: "australian-citizenship-readiness-check",
  deckSlug: "citizenship-naturalization-anki-bundle",
  cta: {
    mockLabel: "Take the free Australian Citizenship readiness check",
    deckLabel: "Get the Citizenship & Naturalization Anki Bundle",
    summary:
      "Drill Our Common Bond themes — especially values — with the free Australian Citizenship readiness check. Then lock government, history, and values with the Citizenship & Naturalization Anki Bundle (includes Australia) before ceremony day.",
    extraLinks: [
      {
        href: "https://www.prep2go.study",
        label: "Prep2Go.study — language & immigration decks",
      },
    ],
  },
  sections: [
    {
      heading: "What You’re Actually Facing",
      blocks: [
        {
          type: "p",
          text: "The test is **English only**. There is no separate IELTS-style language exam for citizenship (unlike Czech B1 or Polish PaF B1), but you must understand the questions at functional literacy level. Weak English? Home Affairs points applicants toward the Adult Migrant English Program (AMEP) and AMEPOnline citizenship modules before sitting.",
        },
        {
          type: "p",
          text: "Sitting the test is **included in the citizenship application fee**. Fail and you can usually retake after a waiting period (~1 month is commonly cited); repeated fails may trigger an officer interview. Typical cohort: applicants **aged 18–59** for citizenship by conferral — confirm current exemptions on official pages before you book.",
        },
      ],
    },
    {
      heading: "Exam Format: The Hard Numbers",
      blocks: [
        {
          type: "table",
          caption: "Official format (verify on Home Affairs before you sit)",
          headers: ["Parameter", "Details"],
          rows: [
            ["Format", "Computer-based multiple choice"],
            ["Questions", "20"],
            ["Time", "45 minutes"],
            ["Options", "Typically 3 per question (A, B, C)"],
            ["Pass mark", "75% (15/20)"],
            ["Values questions", "5 mandatory — **all 5 must be correct**"],
            ["Cost to sit", "Included in application fee"],
            ["Language", "English only"],
            ["Where", "Department of Home Affairs service centres"],
            ["Retakes", "Allowed; waiting period between attempts"],
          ],
        },
        {
          type: "p",
          text: "Most candidates finish under 20 minutes. Use leftover time to re-read values items carefully — that is where one careless click fails the sitting.",
        },
      ],
    },
    {
      heading: "The Four Testable Categories (Our Common Bond)",
      blocks: [
        {
          type: "p",
          text: "Home Affairs does not publish a closed Czech-style 300-item bank, but every question maps to OCB domains. Topics are explicit and finite.",
        },
        {
          type: "topics",
          items: [
            {
              title: "Australia and its people",
              body: "Geography, First Nations history, symbols, demography. Capital is Canberra (not Sydney/Melbourne). Flag, coat of arms, Advance Australia Fair. Six states + ACT/NT. Australia Day (26 Jan), ANZAC Day (25 Apr). Indigenous cultures continuous for 60,000+ years.",
            },
            {
              title: "Democratic beliefs, rights and liberties",
              body: "Parliamentary democracy, rule of law, freedom of speech/religion, equality of men and women, peaceful democratic change. Free speech is not unlimited — opinions within the law and others’ rights.",
            },
            {
              title: "Government and the law",
              body: "Constitutional monarchy + parliamentary democracy. King as Head of State; Governor-General represents federally. House of Representatives + Senate (12 senators per state, 2 per territory). Compulsory voting 18+. PM leads majority in the House. High Court interprets the Constitution. Referendum = constitutional change needing a double majority.",
            },
            {
              title: "Australian values (the killers)",
              body: "Five mandatory items on freedom, respect, equality, democracy, and rule of law. Framed as alignment, not trivia — wrong answers often encode gender hierarchy, religious supremacy, or law-breaking as OK protest.",
            },
          ],
        },
      ],
    },
    {
      heading: "Australian Values: Why 5/5 Is Non-Negotiable",
      blocks: [
        {
          type: "ul",
          items: [
            "**Freedom** — speech, religion, association, within the law",
            "**Respect** — dignity of individuals; tolerance of difference",
            "**Equality** — opportunity regardless of gender, race, religion, background",
            "**Democracy** — government through elected representatives; compulsory voting",
            "**Rule of law** — no one above the law; laws made and applied fairly",
          ],
        },
        {
          type: "p",
          text: "Example framing: “What does equality of men and women mean in Australia?” Correct answers stress the **same rights and opportunities**. Options that make men primary decision-makers or exclude women from voting/government roles are designed fails.",
        },
      ],
    },
    {
      heading: "Language vs Civics: The Australian Difference",
      blocks: [
        {
          type: "table",
          headers: ["", "Australia", "Czechia", "Poland (current)"],
          rows: [
            ["Civics test", "20 MCQs + values rule", "30 MCQs, known pool", "None yet (proposed)"],
            ["Separate language exam", "No (English assumed)", "B1 Czech", "B1 Polish (PaF)"],
            ["Language support", "AMEP / AMEPOnline", "Self-funded", "Self-funded"],
            ["Retake fee", "Included in application path", "CZK 2,000 typical", "PaF fee per sitting"],
          ],
        },
        {
          type: "p",
          text: "If you can read OCB in English, you can sit. If not, use free AMEP prep — preparatory, not a formal second exam.",
        },
      ],
    },
    {
      heading: "Where Candidates Fail",
      blocks: [
        {
          type: "ul",
          items: [
            "**Senators:** 12 per state, 2 per territory — not population-weighted like the House",
            "**Referendum vs election:** referendum changes the Constitution; election chooses representatives",
            "**Who appoints judges:** Governor-General formally (on government advice) — not “the PM alone” as a casual answer",
            "**Freedom of speech:** correct options always keep “within the law / respecting others’ rights”",
            "**Values alignment:** hierarchical gender/religious supremacy answers auto-fail the sitting",
          ],
        },
      ],
    },
    {
      heading: "How to Prepare",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Days 1–3 — Read OCB cover to cover",
              body: "Free booklet; available in many languages for study, but the test is English-only. Prioritise values, Parliament / Governor-General, First Nations history and symbols, referendum vs election.",
            },
            {
              title: "Days 4–7 — Drill by category",
              body: "People → government/law → rights → values. Use official practice material plus timed third-party mocks. Push each category to ~90%+ before full sims.",
            },
            {
              title: "Days 8–10 — Full 20Q simulations",
              body: "45-minute timer, no notes. Target consistent 18–19/20 with **5/5 values** every time.",
            },
            {
              title: "Final 2 days — Polish only",
              body: "Revisit wrong answers and values wording. Lock numbers (12 senators, 3-year House cycle, 60,000+ years) and constitutional roles — do not cram new topics.",
            },
          ],
        },
      ],
    },
    {
      heading: "Common Pitfalls",
      blocks: [
        {
          type: "ul",
          items: [
            "Treating values as “common sense” instead of OCB’s official framing",
            "Assuming Sydney is the capital",
            "Confusing referendum with election",
            "Rushing values items because the clock feels long",
            "Skipping First Nations history as “optional culture”",
            "Relying on generic democracy knowledge — compulsory voting, double majority, GG roles are Australian-specific",
          ],
        },
      ],
    },
    {
      heading: "Timeline: Test to Certificate",
      blocks: [
        {
          type: "table",
          headers: ["Step", "Typical timing"],
          rows: [
            ["Meet residence rules", "Confirm current Home Affairs criteria (lawful residence + PR periods)"],
            ["Prepare for the test", "1–2 weeks if English is solid; longer with AMEP"],
            ["Submit application", "ImmiAccount + fee"],
            ["Test appointment", "Often months after lodge — varies by caseload"],
            ["Sit the test", "45 minutes; often immediate preliminary result"],
            ["Ceremony + pledge", "After approval — certificate at ceremony"],
          ],
        },
        {
          type: "p",
          text: "Budget roughly **12–24 months** from eligibility to certificate depending on processing. Always verify residence clocks and fees on official Home Affairs pages — proposals change faster than blogs.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the Australian citizenship test pass mark?",
      answer:
        "You need 15 of 20 correct (75%). Separately, all five Australian values questions must be correct — miss one values item and you fail the sitting even if overall score looks high.",
    },
    {
      question: "Is there a separate English exam for Australian citizenship?",
      answer:
        "No formal IELTS-style citizenship language exam. The test itself is English-only. AMEP / AMEPOnline can help if reading comprehension is weak.",
    },
    {
      question: "What should I study?",
      answer:
        "The official free booklet Australian Citizenship: Our Common Bond. Practice tests should map to its four domains — people, democratic beliefs, government and law, and values.",
    },
    {
      question: "Is Sydney the capital of Australia?",
      answer:
        "No. Canberra is the capital. Sydney and Melbourne are major cities; confusing them is a classic trap.",
    },
    {
      question: "How many senators does each state have?",
      answer:
        "Each state has 12 senators; each mainland territory has 2. House seats are based on population — do not mix the two.",
    },
    {
      question: "Does UniPrep2Go use official Home Affairs questions?",
      answer:
        "No. The free Australian Citizenship readiness check and Citizenship Anki Bundle are independent study aids based on Our Common Bond themes — not official Department material.",
    },
    {
      question: "What if I fail the citizenship test?",
      answer:
        "You can usually retake after a waiting period. Repeated failures may lead to an interview with a Home Affairs officer. Confirm current retake rules when you book.",
    },
  ],
  bottomLine:
    "Australia’s citizenship test is short, free to sit within the application, and unforgiving on **values**. Read *Our Common Bond*, drill until you are **5/5 on values** and 18–19/20 overall, then use UniPrep2Go’s free readiness check and Citizenship Anki Bundle to lock weak categories before ceremony day.",
};
