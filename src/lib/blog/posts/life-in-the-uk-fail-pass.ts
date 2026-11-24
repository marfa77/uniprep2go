import type { BlogPostDraft } from "../types";

export const lifeInTheUkFailPassPost: BlogPostDraft = {
  slug: "life-in-the-uk-test-why-one-in-three-fail",
  title: "Life in the UK Test: Why People Fail",
  titleTag: "Life in the UK Test 2027: Why People Fail | Free Mock",
  metaDescription:
    "24Q / 45 min / £50 per attempt — 75% to pass. Official handbook trap, Chapter 3 dates, and a 60Q Life in the UK mock (free 25-question version) + Citizenship Anki bundle before you book.",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "UK · Life in the UK Test",
  clusterId: "life-in-the-uk",
  relatedSlugs: [
    "netherlands-inburgeringsexamen-five-exams-pass-guide",
    "france-naturalization-2026-civic-exam-b2-language-test",
    "germany-einbuergerungstest-vs-leben-in-deutschland-difference",
  ],
  intro:
    "**The Life in the UK Test is 24 questions in 45 minutes, and you need 75% to pass.** That leaves room for six mistakes. GOV.UK does not publish a pass rate, so this guide sticks to what it does publish: the rules, the exemptions, the ID problems that stop people sitting the test at all, and the one handbook every question comes from.",
  mockSlug: "life-in-the-uk-readiness-check",
  deckSlug: "life-in-the-uk-anki-deck",
  cta: {
    mockLabel: "Take the free Life in the UK readiness check",
    deckLabel: "Get the Life in the UK Anki deck",
    summary:
      "Start with the free Life in the UK readiness check (UniPrep Mock Pass $19, unlimited mocks) and keep going until you are well clear of 18 of 24. Then review handbook dates and facts daily with the Life in the UK Anki deck before you pay £50 on GOV.UK.",
  },
  sections: [
    {
      heading: "What are the official rules for the test?",
      blocks: [
        {
          type: "table",
          caption: "Life in the UK Test (GOV.UK, checked 24 Nov 2026)",
          headers: ["Rule", "Detail"],
          rows: [
            ["Questions and time", "24 questions in 45 minutes"],
            ["Pass mark", "75% or more"],
            ["Fee", "£50, paid each time you book"],
            ["Booking", "Online through GOV.UK, at least 3 days in advance; the only official booking service"],
            ["Centres", "Over 30 test centres in the UK; you choose when you book"],
            ["If you pass", "You get a unique reference number for your citizenship or settlement application"],
            ["If you fail", "You can rebook as many times as you need, paying each time"],
            ["Cancelling", "Refund if you cancel at least 3 days (72 hours) before; none within 3 days"],
          ],
        },
        {
          type: "p",
          text: "Seventy-five per cent of 24 is 18 correct answers, so you can afford at most six mistakes. Practise until you score well above that line on the [Life in the UK readiness check](/mock-exams/life-in-the-uk-readiness-check).",
        },
      ],
    },
    {
      heading: "Who has to take it?",
      blocks: [
        {
          type: "p",
          text: "You may need the test for British citizenship or for settlement; the guidance and form for your application say whether you do. GOV.UK says you do not need to take it if you:",
        },
        {
          type: "ul",
          items: [
            "are under 18",
            "are 65 or over",
            "have passed it before, for example for settlement before applying for citizenship",
            "have a long-term physical or mental condition, with an exemption form or a doctor's letter",
          ],
        },
      ],
    },
    {
      heading: "Which mistakes stop people before the first question?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Wrong ID.** Bring the same original ID you booked with, not a copy or screenshot. The name on your booking must exactly match your ID.",
            "**Refusing the photo.** Your photo is taken on the day. Without the right ID or the photo, you cannot sit the test and get no refund.",
            "**Old documents.** If you have an eVisa, book with a share code from your UKVI account. A biometric residence permit or card can be used only if your test is no later than 24 months after its printed expiry date or before 31 December 2026, whichever comes first.",
            "**Unofficial booking sites.** GOV.UK is the only official booking service.",
          ],
        },
      ],
    },
    {
      heading: "What is actually tested?",
      blocks: [
        {
          type: "p",
          text: "GOV.UK says you are tested **only** on the official *Guide for New Residents*. It comes as a book, eBook or audio, with an official e-learning subscription and practice app sold through the official Life in the UK Test shop. Facts from unofficial sources that are not in the handbook will not be tested, and differences in wording can cost you a point.",
        },
        {
          type: "p",
          text: "Expect dates and institutions. Two examples, confirmed by UK Parliament: **Magna Carta** was issued in June **1215** at Runnymede; the **1918** Representation of the People Act let women over 30 who met a property qualification vote, and the **1928** Equal Franchise Act gave women the same voting rights as men.",
        },
      ],
    },
    {
      heading: "So why do people fail?",
      blocks: [
        {
          type: "p",
          text: "GOV.UK does not publish a pass rate, so this guide does not quote one. The format itself explains most failures:",
        },
        {
          type: "ul",
          items: [
            "**A narrow margin:** six wrong answers is the limit.",
            "**One source:** studying from apps or summaries instead of the handbook leaves gaps and teaches wording the test does not use.",
            "**Detail questions:** history dates, numbers and names are easy to mix up without regular review.",
            "**Reading load:** 24 questions in 45 minutes in English; slow reading eats into checking time.",
          ],
        },
      ],
    },
    {
      heading: "How should you prepare?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Read the handbook once for the story", body: "Then go back and mark the dates, people, numbers and institutions." },
            { title: "Turn facts into cards", body: "Review them daily with the [Life in the UK Anki deck](/decks/life-in-the-uk-anki-deck)." },
            { title: "Take timed practice", body: "Sit 24 questions in 45 minutes and review every miss against the handbook." },
            { title: "Book when you are clear of the line", body: "Book at least 3 days ahead with the ID you will bring on the day." },
          ],
        },
        {
          type: "p",
          text: "Comparing countries? See the [Germany Leben in Deutschland guide](/blog/germany-einbuergerungstest-vs-leben-in-deutschland-difference).",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the Life in the UK Test?",
      answer: "24 questions in 45 minutes, based on the official Guide for New Residents (GOV.UK, checked 24 Nov 2026).",
    },
    {
      question: "What is the pass mark?",
      answer: "75% or more, which is 18 of the 24 questions.",
    },
    {
      question: "How much does the Life in the UK Test cost?",
      answer: "£50, and you pay again each time you rebook after a fail.",
    },
    {
      question: "Can I retake the test if I fail?",
      answer: "Yes. GOV.UK says you can rebook as many times as you need, paying each time.",
    },
    {
      question: "Who does not need to take the test?",
      answer: "People under 18, people aged 65 or over, people who have passed it before, and people with a long-term physical or mental condition who provide an exemption form or doctor's letter.",
    },
    {
      question: "What happens if I bring the wrong ID?",
      answer: "You cannot take the test and you do not get a refund. Bring the original ID you used to book.",
    },
  ],
  bottomLine:
    "Study only the official handbook, aim well above 18 of 24 in timed practice, and bring the exact ID you booked with. Sources: [GOV.UK Life in the UK Test](https://www.gov.uk/life-in-the-uk-test) and [full guide](https://www.gov.uk/life-in-the-uk-test/print), [UK Parliament: Magna Carta](https://www.parliament.uk/about/living-heritage/evolutionofparliament/originsofparliament/birthofparliament/overview/magnacarta/) and [UK Parliament: women get the vote](https://www.parliament.uk/about/living-heritage/transformingsociety/electionsvoting/womenvote/overview/thevote/), checked 24 Nov 2026.",
};
