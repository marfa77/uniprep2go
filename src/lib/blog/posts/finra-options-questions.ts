import type { BlogPostDraft } from "../types";

export const finraOptionsQuestionsPost: BlogPostDraft = {
  slug: "finra-options-questions-read-without-getting-tricked",
  title: "How to Read a FINRA Options Question Without Getting Tricked",
  titleTag: "SIE Options Question Traps 2027 | 4-Step Reading Method",
  metaDescription:
    "SIE and Series 7 options items are reading traps: long vs short, call vs put, 100× multiplier. Use this 4-step protocol, formula table, and six traps — then take the 75Q SIE mock (free 25-question version).",
  publishedAt: "2026-07-28",
  contentUpdated: "2026-11-24",
  eyebrow: "FINRA SIE · Options",
  clusterId: "finra-sie",
  relatedSlugs: ["finra-sie-exam-prep-why-people-fail", "finra-exam-retake-waiting-period-2027"],
  intro:
    "**Options questions on the FINRA SIE and Series 7 test careful reading as much as arithmetic.** Breakeven is just strike plus or minus premium; the errors come from misreading long vs short, mixing call and put formulas, or forgetting that one contract covers 100 shares. This guide shows where options sit in the official content outlines, a four-step way to read each item, the formulas for basic positions, spreads and straddles, and how to practise.",
  mockSlug: "sie-full-mock",
  deckSlug: "sie-exam-anki-deck",
  cta: {
    mockLabel: "Take the free FINRA SIE readiness check",
    deckLabel: "Drill options formulas with Anki",
    summary:
      "Need options formulas automatic? Take the free FINRA SIE readiness check (products & risks includes options), then lock in max gain/loss/breakeven with the SIE Anki deck. Climbing toward Series 65 later? Keep fiduciary framing separate — Series 65 is adviser law, not SIE product math.",
  },
  sections: [
    {
      heading: "Where do options questions sit on the SIE and Series 7?",
      blocks: [
        {
          type: "table",
          caption: "SIE content outline (finra.org, checked 24 Nov 2026)",
          headers: ["Section", "Share of questions", "Questions"],
          rows: [
            ["1. Knowledge of Capital Markets", "16%", "12"],
            ["2. Understanding Products and Their Risks", "44%", "33"],
            ["3. Understanding Trading, Customer Accounts and Prohibited Activities", "31%", "23"],
            ["4. Overview of Regulatory Framework", "9%", "7"],
          ],
        },
        {
          type: "p",
          text: "The SIE has **75 multiple-choice questions** in **1 hour 45 minutes**, with a passing score of **70**, and costs **$100**. Options are one of the products in section 2, so expect them alongside equities, debt, packaged products and their risks, not as a section of their own.",
        },
        {
          type: "p",
          text: "The **Series 7** goes deeper. Its 125 scored items are split by job function, and F3 (providing information about investments, making recommendations, transferring assets and keeping records) carries **91** of them. FINRA lists options among the products a Series 7 holder may sell, and the SIE is a corequisite: you need both to get the General Securities registration.",
        },
      ],
    },
    {
      heading: "How should you read an options question?",
      blocks: [
        {
          type: "steps",
          items: [
            { title: "Mark the position", body: "Is the investor **long** or **short**? A long call has unlimited gain; a short call has unlimited loss. Swap them and you pick the mirror-image answer." },
            { title: "Mark the option type", body: "**Call** or **put**? Call breakeven is strike + premium; put breakeven is strike − premium." },
            { title: "Strip the story", body: "Ages, account sizes and goals often frame a suitability question; for a calculation, write down only the positions: long stock at $50, short 1 Dec 55 call at $3 is a covered call." },
            { title: "Read all four answers", body: "Two choices are often close (breakeven vs maximum gain, strike + vs strike −). Label what you calculated before you look." },
          ],
        },
      ],
    },
    {
      heading: "The Four Basic Positions: Formulas That Must Be Automatic",
      blocks: [
        {
          type: "p",
          text: "Do not derive these on exam day. Know them cold.",
        },
        {
          type: "table",
          caption: "Basic option positions",
          headers: ["Position", "Max gain", "Max loss", "Breakeven"],
          rows: [
            ["Long Call", "Unlimited", "Premium paid", "Strike + premium"],
            ["Short Call", "Premium received", "Unlimited", "Strike + premium"],
            [
              "Long Put",
              "Strike − premium (×100)",
              "Premium paid",
              "Strike − premium",
            ],
            [
              "Short Put",
              "Premium received",
              "Strike − premium (×100)",
              "Strike − premium",
            ],
          ],
        },
        {
          type: "ul",
          items: [
            "**Calls:** breakeven is always strike + premium (call up, add up)",
            "**Puts:** breakeven is always strike − premium (put down, subtract)",
            "**Long positions:** max loss is always the premium paid",
            "**Short calls:** max loss is unlimited — the stock can rise forever",
            "**Short puts:** max loss is strike − premium — worst case, stock to zero and you buy at the strike",
          ],
        },
      ],
    },
    {
      heading: "Spreads: The CAL and PSH Acronyms",
      blocks: [
        {
          type: "p",
          text: "Spreads combine two options. Exams test bull/bear call and put spreads.",
        },
        {
          type: "topics",
          items: [
            {
              title: "CALL spreads — CAL",
              body: "**C**all → **A**dd net premium to **L**ower strike = breakeven. Debit call max loss = net premium paid. Max gain = difference in strikes − net premium.",
            },
            {
              title: "PUT spreads — PSH",
              body: "**P**ut → **S**ubtract net premium from **H**igher strike = breakeven. Debit put max loss = net premium paid. Max gain = difference in strikes − net premium.",
            },
            {
              title: "DEW and CVN",
              body: "**DEW:** **D**ebit → wants to **E**xercise → spread must **W**iden. **CVN:** **C**redit → wants options to expire **V**alueless → spread must **N**arrow.",
            },
          ],
        },
        {
          type: "p",
          text: "**Example:** Buy 1 ABC Jan 50 call @ $8; write 1 ABC Jan 60 call @ $2. Bull call (debit) spread. Net debit $600. Max loss $600. Max gain ($60−$50)×100 − $600 = $400. Breakeven $50 + $6 = $56 (CAL).",
        },
      ],
    },
    {
      heading: "Straddles: Two Breakevens, Not One",
      blocks: [
        {
          type: "p",
          text: "A straddle is a call and a put at the same strike — long (buy both) or short (sell both).",
        },
        {
          type: "topics",
          items: [
            {
              title: "Long straddle",
              body: "Max gain unlimited (long call). Max loss = both premiums paid. Breakevens: strike + total premium and strike − total premium.",
            },
            {
              title: "Short straddle",
              body: "Max gain = both premiums received. Max loss unlimited (short call). Breakevens: same — strike ± total premium.",
            },
          ],
        },
        {
          type: "p",
          text: "**Trap:** “Between what two prices will the investor show a loss?” Long straddle loses *between* the breakevens; short straddle profits between them and loses outside. Read carefully.",
        },
      ],
    },
    {
      heading: "Which reading slips cost the most?",
      blocks: [
        {
          type: "topics",
          items: [
            { title: "EXCEPT and NOT", body: "\"All of the following are true EXCEPT\" asks for the one false statement. Rephrase the stem before you answer." },
            { title: "The 100-share multiplier", body: "Premiums are quoted per share and a standard equity option covers 100 shares, so a $5 premium is $500 per contract. Check whether the question asks per share or per contract." },
            { title: "Covered vs naked", body: "A covered call's maximum loss is the stock cost minus the premium, not unlimited. \"Covered\" changes the risk completely." },
            { title: "Breakeven vs maximum gain", body: "The numbers are often close. Decide which one the stem asks for before calculating." },
          ],
        },
      ],
    },
    {
      heading: "How should you practise, and what if you fail?",
      blocks: [
        {
          type: "p",
          text: "Repeating the same quiz until you remember the letter teaches the letter. Mix new items, time yourself, and review every options miss by asking which of the four steps broke. Use the [full SIE practice exam](/mock-exams/sie-full-mock) for the products section and the [Series 7 readiness check](/mock-exams/series-7-readiness-check) for deeper options work, and drill the formulas with the [SIE Anki deck](/decks/sie-exam-anki-deck).",
        },
        {
          type: "p",
          text: "FINRA says that from **19 January 2027** the wait after a first or second failed attempt drops to **15 days** (from 30), and after a third to **60 days** (from 180). The [FINRA retake waiting period guide](/blog/finra-exam-retake-waiting-period-2027) covers the details.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the SIE, and what is the passing score?",
      answer: "75 multiple-choice questions in 1 hour 45 minutes, with a passing score of 70 (FINRA, checked 24 Nov 2026).",
    },
    {
      question: "Where are options in the SIE content outline?",
      answer: "Options are among the products in section 2, Understanding Products and Their Risks, which is 44% of the exam (33 of 75 questions).",
    },
    {
      question: "What is the breakeven for a long call and a long put?",
      answer: "Long call: strike + premium. Long put: strike − premium. The same breakevens apply to the short side of each position.",
    },
    {
      question: "What is the breakeven for a covered call?",
      answer: "The stock purchase price minus the premium received. Maximum loss is that same amount (per share), and maximum gain is the strike minus the stock price plus the premium.",
    },
    {
      question: "Do I need the SIE to take the Series 7?",
      answer: "Yes. FINRA makes the SIE a corequisite: you must pass both to get the General Securities Representative registration.",
    },
    {
      question: "How long do I wait to retake a FINRA exam?",
      answer: "Currently 30 days after the first and second failed attempts and 180 days after the third. From 19 January 2027 FINRA reduces these to 15 and 60 days.",
    },
  ],
  bottomLine:
    "Mark long or short, mark call or put, strip the story, and label your answer before you read the choices. Sources: [FINRA SIE exam](https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam) and [FINRA Series 7 exam](https://www.finra.org/registration-exams-ce/qualification-exams/series7), checked 24 Nov 2026.",
};
