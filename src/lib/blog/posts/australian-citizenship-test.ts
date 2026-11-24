import type { BlogPostDraft } from "../types";

export const australianCitizenshipTestPost: BlogPostDraft = {
  slug: "australian-citizenship-test-our-common-bond-complete-guide",
  title: "The Complete Guide to the Australian Citizenship Test",
  titleTag: "Australian Citizenship Test: Format, Values Rule & Pass",
  metaDescription:
    "Australian citizenship test: 20 MCQs, 45 min, 75% pass. All 5 values questions must be correct. Our Common Bond topics, traps, and prep.",
  publishedAt: "2026-08-04",
  contentUpdated: "2026-11-23",
  eyebrow: "Australia · Our Common Bond",
  clusterId: "australian-citizenship",
  relatedSlugs: [
    "canada-citizenship-test-20-questions-630-dollars",
    "life-in-the-uk-test-why-one-in-three-fail",
    "us-naturalization-civics-test-100-questions-only-10",
  ],
  intro:
    "**The Australian citizenship test is a computer-based, multiple-choice test of 20 questions, in English.** Home Affairs says a pass shows a basic knowledge of English, knowledge of Australia, and a commitment to Australian values. Questions come from *Australian Citizenship: Our Common Bond* (OCB). You have **45 minutes**, need **15 of 20 (75%)**, and **all 5 Australian values questions correct**. Miss one values item and you fail, even with 19 of 20 overall. This guide covers the format read on the Home Affairs test page on 19 November 2026, the OCB themes, values traps, and a prep plan mapped to UniPrep2Go’s free readiness check and the Australian Citizenship Anki deck.",
  mockSlug: "australian-citizenship-readiness-check",
  deckSlug: "australian-citizenship-anki-deck",
  cta: {
    mockLabel: "Take the free Australian Citizenship readiness check",
    deckLabel: "Get the Australian Citizenship Anki deck",
    summary:
      "Drill Our Common Bond themes — especially values — with the free Australian Citizenship readiness check. Then lock government, history, and values with the [Australian Citizenship Anki deck](/decks/australian-citizenship-anki-deck) before your appointment.",
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
          text: "Sitting the test is **included in the citizenship application fee**. Most applicants for citizenship by conferral who are **aged 18 to 59** on the day Home Affairs receives their application have to sit it. Home Affairs sends a letter with the date, time and place, and you sit the test on a computer or tablet after your identity is confirmed. If you fail, Home Affairs books another appointment at no extra cost; after three unsuccessful appointments it may refuse the application.",
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
            ["Pass mark", "75% (15/20)"],
            ["Values questions", "5 mandatory — **all 5 must be correct**"],
            ["Cost to sit", "Included in application fee"],
            ["Language", "English only"],
            ["Where", "Departmental offices in most capital cities and some Services Australia offices"],
            ["If you fail", "Another appointment at no extra cost; refusal possible after three unsuccessful appointments"],
          ],
        },
        {
          type: "p",
          text: "Use any time left to re-read the values items carefully; one wrong values answer fails the test even with 19 of 20 correct. Phones, smart watches, notes and talking to anyone other than the Test Facilitator are not allowed, and breaking the rules can lead to refusal.",
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
      heading: "Who has to sit the test, and who doesn't?",
      blocks: [
        {
          type: "p",
          text: "You generally sit the test if you are 18 to 59 on the day Home Affairs receives your conferral application. You generally do not sit it if you:",
        },
        {
          type: "ul",
          items: [
            "are 17 or younger, or 60 or over, when you apply",
            "have a permanent or enduring physical or mental incapacity, or a permanent loss or substantial impairment of hearing, speech or sight",
            "are the child of a former Australian citizen who lost citizenship in specific circumstances",
            "were born in Papua before 16 September 1975 to an Australian citizen born in Australia, or were born in Australia and are stateless",
          ],
        },
        {
          type: "p",
          text: "Applicants who don't sit the test may be asked to an interview to confirm identity and discuss the application. An assisted test and other accommodations can be requested with a form completed by a registered health practitioner.",
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
              body: "People → government/law → rights → values. Use the official Home Affairs practice test, the Our Common Bond podcast, then the [Australian citizenship readiness check](/mock-exams/australian-citizenship-readiness-check) for timed runs.",
            },
            {
              title: "Days 8–10 — Full 20Q simulations",
              body: "45-minute timer, no notes. Aim well above 15/20 with **5/5 values** every time.",
            },
            {
              title: "Final 2 days — Polish only",
              body: "Revisit wrong answers and values wording. Lock key facts from Our Common Bond and constitutional roles; do not cram new topics.",
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
      heading: "What happens after the test?",
      blocks: [
        {
          type: "ul",
          items: [
            "Home Affairs keeps processing your application and writes if it needs more information or when it decides.",
            "If you pass and are approved, you must attend a citizenship ceremony to become a citizen; the invitation letter arrives about four weeks before the ceremony.",
            "If you fail, your visa is not affected, Home Affairs books another appointment at no extra cost, and after three unsuccessful appointments it may refuse the application.",
            "Appointment and ceremony wait times vary; Home Affairs publishes current processing times.",
          ],
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
      question: "Who is exempt from the Australian citizenship test?",
      answer:
        "Generally applicants aged 17 or under or 60 or over when they apply, people with a permanent or enduring physical or mental incapacity or serious hearing, speech or sight impairment, and some specific groups. They may have an interview instead.",
    },
    {
      question: "How long is the Australian citizenship test?",
      answer: "45 minutes for 20 multiple-choice questions, in English, on a computer or tablet.",
    },
    {
      question: "Does UniPrep2Go use official Home Affairs questions?",
      answer:
        "No. The free Australian Citizenship readiness check and Citizenship Anki Bundle are independent study aids based on Our Common Bond themes — not official Department material.",
    },
    {
      question: "What if I fail the citizenship test?",
      answer:
        "Home Affairs books another appointment for you at no extra cost, and your visa is not affected. If you do not pass after three appointments, Home Affairs may refuse your application (immi.homeaffairs.gov.au, checked 23 Nov 2026).",
    },
  ],
  bottomLine:
    "Australia’s citizenship test is short, free to sit within the application, and unforgiving on **values**. Read *Our Common Bond*, drill until you are **5/5 on values** and comfortably above 15/20, then use the free [readiness check](/mock-exams/australian-citizenship-readiness-check) and the [Anki deck](/decks/australian-citizenship-anki-deck) for weak categories. Sources: [Home Affairs — citizenship test](https://immi.homeaffairs.gov.au/citizenship/test-and-interview/learn-about-citizenship-interview-and-test/learn-about-citizenship-test) and [Prepare for the test](https://immi.homeaffairs.gov.au/citizenship/test-and-interview/prepare-for-test), checked 23 Nov 2026.",
};
