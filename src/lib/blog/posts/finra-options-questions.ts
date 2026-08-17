import type { BlogPostDraft } from "../types";

export const finraOptionsQuestionsPost: BlogPostDraft = {
  slug: "finra-options-questions-read-without-getting-tricked",
  title: "How to Read a FINRA Options Question Without Getting Tricked",
  titleTag: "SIE Options Question Traps 2026 | 4-Step Reading Method",
  metaDescription:
    "SIE and Series 7 options items are reading traps: long vs short, call vs put, 100× multiplier. Use this 4-step protocol, formula table, and six traps — then take the free 75Q SIE mock.",
  publishedAt: "2026-07-28",
  eyebrow: "FINRA SIE · Options",
  clusterId: "finra-sie",
  relatedSlugs: ["finra-sie-exam-prep-why-people-fail"],
  intro:
    "**Options questions are among the highest-weighted trap categories on the FINRA SIE and Series 7 — and where most first-time candidates bleed points.** Not because the math is hard (breakeven is strike ± premium), but because they misread “short,” mix call formulas into put stems, or forget the 100-share multiplier. FINRA writes these items to reward careful reading, not a memorized formula sheet. This guide gives a four-step reading protocol, formulas for every basic position, six traps that show up on nearly every form, and a practice loop that pairs with UniPrep2Go’s free timed SIE mock.",
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
      heading: "The Four-Step Reading Protocol",
      blocks: [
        {
          type: "p",
          text: "Before you touch a calculator or write a formula, do this:",
        },
        {
          type: "steps",
          items: [
            {
              title: "Step 1: Circle the position",
              body: "Is the investor **long** or **short**? A long call has unlimited gain; a short call has unlimited loss. Miss “short” and you pick the opposite of the correct answer.",
            },
            {
              title: "Step 2: Circle the option type",
              body: "Is it a **call** or a **put**? Calls go up (“call up”); puts go down (“put down”). Call breakeven = strike + premium. Put breakeven = strike − premium. Mix them and every calculation is wrong.",
            },
            {
              title: "Step 3: Separate the story from the question",
              body: "FINRA loves scenarios: “A 65-year-old widow has $500,000 and wants income with limited risk. She buys 100 shares of XYZ at $50 and writes 1 XYZ Dec 55 call at $3.” Age and $500,000 are noise. The question is a **covered call**: long stock $50, short call $55, premium $3.",
            },
            {
              title: "Step 4: Read all four answer choices before selecting",
              body: "Never stop at B because it looks right. Attractive distractors sit early. Often two answers are clearly wrong and two are plausible — the difference is one word (“unlimited” vs “premium received,” or strike + vs strike −).",
            },
          ],
        },
      ],
    },
    {
      heading: "The Six Traps That Appear on Every Exam",
      blocks: [
        {
          type: "topics",
          items: [
            {
              title: "Trap 1: EXCEPT and NOT",
              body: "“All of the following are true EXCEPT…” — miss EXCEPT and you pick the one correct statement among three wrong ones. Rephrase: “Which one is false?”",
            },
            {
              title: "Trap 2: The attractive distractor",
              body: "A primary-market question with a perfect secondary-market description. Primary = new issues; secondary = existing securities. Read every word.",
            },
            {
              title: "Trap 3: Absolute words — ALWAYS and NEVER",
              body: "In securities law, absolutes are rarely correct. Do not auto-eliminate them, but treat them with extreme suspicion.",
            },
            {
              title: "Trap 4: Confusing breakeven with max gain",
              body: "Numbers look close. Label your answer before you look at choices: “This is the breakeven.”",
            },
            {
              title: "Trap 5: Forgetting the multiplier",
              body: "Premiums are per share; one contract = 100 shares. A $5 premium is $500. FINRA loves answers off by exactly 100×.",
            },
            {
              title: "Trap 6: The covered call bait",
              body: "The stem describes a covered call but asks for maximum loss. Candidates quote naked short-call risk (unlimited) instead of covered-call loss (stock cost − premium). “Covered” changes the risk profile completely.",
            },
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
      heading: "Index Options vs. Equity Options",
      blocks: [
        {
          type: "p",
          text: "Index options are **cash-settled** and typically **European-style** (exercisable only at expiration). Equity options are **physically settled** and usually **American-style** (exercisable anytime). If the stem mentions the S&P 500 or NYSE Composite, think index — cash settlement, not share delivery.",
        },
      ],
    },
    {
      heading: "How to Practice Without Memorizing Answers",
      blocks: [
        {
          type: "p",
          text: "The worst habit is repeating the same 50-question quiz until “the covered-call answer is C.” On the real exam the wording changes; the concept does not.",
        },
        {
          type: "ol",
          items: [
            "Do the question. Time yourself: ~90 seconds per options item.",
            "If wrong, do not read the explanation yet — re-solve from scratch.",
            "Still wrong? Read the explanation and name the trap (long/short, call/put, multiplier).",
            "Log the trap type. After 50 questions, your pattern is obvious.",
            "Prefer unused questions. Repeated items inflate scores artificially.",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "What is the most common mistake on FINRA options questions?",
      answer:
        "Misreading “long” vs “short” or “call” vs “put.” Those four words determine the entire calculation. One error and every number is wrong.",
    },
    {
      question: "How much time should I spend per options question?",
      answer:
        "About 90 seconds. Options items are calculation-heavy. If you are spending 3 minutes, you do not know the formula well enough — flag it and move on.",
    },
    {
      question: "Do I need to memorize all options formulas?",
      answer:
        "Yes. The four basic positions, spread acronyms (CAL, PSH, DEW, CVN), and straddle breakevens must be automatic. You do not have time to derive them during the exam.",
    },
    {
      question: "What is the breakeven for a covered call?",
      answer:
        "Effective cost basis of the stock minus premium received. Buy stock at $50 and sell a $55 call for $3 → breakeven $47. Max gain is capped at $8 per share ($5 appreciation + $3 premium).",
    },
    {
      question: "Are there many math questions on the SIE exam?",
      answer:
        "The SIE trends toward fewer calculations and more conceptual items. Options still require math for max gain/loss/breakeven. Do not skip the formulas.",
    },
    {
      question: "What does “cash-settled” mean for index options?",
      answer:
        "No shares change hands. If an index option expires in-the-money, the writer pays the holder the cash difference between the strike and the index value.",
    },
    {
      question: "What is the difference between American and European-style options?",
      answer:
        "American-style (most equity options) can be exercised anytime before expiration. European-style (most index options) only at expiration. That affects early exercise strategy and time value.",
    },
    {
      question: "How do I avoid the “EXCEPT” trap?",
      answer:
        "When you see EXCEPT or NOT, rephrase before reading answers: “Which of the following is false?” That forces you to look for the outlier.",
    },
  ],
  bottomLine:
    "FINRA options questions are reading comprehension tests with numbers. The math is simple addition and subtraction. The trap is in the wording. Read the position first, the option type second, ignore the story, and label your calculation before you look at the choices. Do that every time and you separate yourself from candidates who rush, guess, and retake.",
};
