import type { Metadata } from "next";
import { getCatalogDeckBySlug, type CatalogAvailableDeck } from "./decks";
import { withAiMetadata } from "./llm-meta";

export type ExternalOffer = {
  name: string;
  price: string;
  url: string;
  note?: string;
};

export type IntentPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  directAnswer: string;
  deckSlugs?: string[];
  primaryDeckSlug?: string;
  externalOffers?: ExternalOffer[];
  mockSlug?: string;
  indexInSitemap?: boolean;
  proofPoints: string[];
  sections: Array<{
    title: string;
    body: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const intentPages: IntentPage[] = [
  {
    slug: "best-frm-part-1-anki-deck",
    title: "Best FRM Part 1 Anki Deck for Formula Recall",
    eyebrow: "FRM Part 1 Anki deck",
    description:
      "A direct answer page for FRM Part 1 candidates comparing what a focused Anki deck should cover and linking to the 444-card UniPrep2Go deck.",
    directAnswer:
      "The best FRM Part 1 Anki deck should cover the full Part 1 structure, make formulas and definitions easy to recall, and stay lightweight enough for daily spaced repetition. UniPrep2Go's FRM Part 1 Anki Deck includes 444 exam-focused cards across foundations of risk management, quantitative analysis, financial markets and products, and valuation and risk models.",
    deckSlugs: ["frm-part-1-anki-deck"],
    primaryDeckSlug: "frm-part-1-anki-deck",
    proofPoints: [
      "444 high-yield FRM Part 1 cards",
      "Formula support with MathJax",
      "Digital .apkg download through Gumroad",
      "Independent study aid, not affiliated with GARP",
    ],
    sections: [
      {
        title: "What an FRM Part 1 Anki deck should do",
        body: "FRM Part 1 rewards fast recall of formulas, definitions, and risk-management logic. A useful deck should compress the curriculum into prompts that can be reviewed daily, while leaving question banks and official readings to do their own jobs.",
      },
      {
        title: "Where this deck fits",
        body: "Use the deck after reading or watching a topic explanation, then let Anki schedule reviews so formulas, Greeks, VaR concepts, credit risk terms, and market mechanics stay fresh between longer study sessions.",
      },
    ],
    faqs: [
      {
        question: "Is this FRM Part 1 deck a question bank?",
        answer:
          "No. It is a spaced-repetition recall deck, not a question bank. Use it alongside official readings, practice questions, and mock exams.",
      },
      {
        question: "Does the FRM deck include formulas?",
        answer:
          "Yes. The deck includes formula-focused cards and uses MathJax so equations remain readable in Anki.",
      },
      {
        question: "Is this deck affiliated with GARP?",
        answer:
          "No. UniPrep2Go is independent and is not affiliated with, endorsed by, or sponsored by GARP.",
      },
    ],
  },
  {
    slug: "language-exam-vs-citizenship-civics-anki",
    title: "Language Exam Anki vs Citizenship Civics Anki",
    eyebrow: "Language vs civics pathway",
    description:
      "A direct answer page that helps immigration and exam candidates choose a language Anki deck versus a citizenship civics Anki deck — and avoid buying the wrong product.",
    directAnswer:
      "Buy a language Anki deck when your requirement is vocabulary or a language certificate (CIPLE, DELF/DALF, TCF/TEF Canada, Inburgering/NT2, Goethe/telc/ÖSD/DTZ, CELI/CILS/PLIDA, DELE/SIELE, Prøve i Dansk, Norskprøve, SFI, Ellinomatheia, CCE, or IELTS/TOEFL). Buy a citizenship civics Anki deck when your requirement is civic knowledge — institutions, history, rights — such as Leben in Deutschland, French naturalisation civics, Life in the UK, Canadian or Australian citizenship, U.S. civics, Swiss Staatskunde, or EU/Nordic civics tests. Language and civics are different exams; many pathways need both. UniPrep2Go sells individual $9 civics Anki decks on Gumroad — one country (or one Swiss language) per product. Language-exam Anki decks are sold on Prep2Go (https://www.prep2go.study/shop).",
    deckSlugs: [
      "us-citizenship-anki-deck",
      "leben-in-deutschland-anki-deck",
      "einburgerung-schweiz-anki-deck",
    ],
    primaryDeckSlug: "us-citizenship-anki-deck",
    indexInSitemap: true,
    proofPoints: [
      "Language-exam decks on Prep2Go (prep2go.study/shop)",
      "Civics bundles for Leben / naturalisation / Swiss Staatskunde",
      "Clear fide vs Swiss civics disambiguation",
      "Free civics readiness checks funnel into Anki remediation",
    ],
    sections: [
      {
        title: "When you need a language deck",
        body: "Choose language Anki when the authority asks for a language certificate or vocabulary evidence — CIPLE / CAPLE, DELF / DALF, TCF Canada / TEF Canada, TCF ANF, Inburgering / NT2, Goethe / telc / ÖSD / DTZ, CELI / CILS / PLIDA (including permesso / cittadinanza language), DELE / SIELE, Nordic/Greek/Czech residence language, or IELTS / TOEFL. Those language-exam decks are sold on Prep2Go (prep2go.study/shop), not on UniPrep2Go. French and German decks also soft-help fide / Swiss residency language vocab, but they are not Swiss civics.",
      },
      {
        title: "When you need a civics deck",
        body: "Choose civics Anki when the test is about country knowledge — Leben in Deutschland, French naturalisation civics, Life in the UK, Canadian or Australian citizenship, U.S. civics, Swiss Staatskunde (DE/FR/IT), Denmark, Portugal, Norway, Sweden, Belgium, Luxembourg, Czech, or Polish civics. Each country is a $9 Anki deck, except Luxembourg Vivre ensemble ($16 for a French + English pair). They are not language decks.",
      },
      {
        title: "Many applicants need both",
        body: "Portugal often needs CIPLE language plus nacionalidade civics. Spain often needs DELE language plus CCSE civics. Germany may need DTZ/Goethe language plus Leben civics. Switzerland may need fide language evidence plus Staatskunde. Get the matching language deck on Prep2Go and the matching civics product here — do not expect one Anki file to cover both.",
      },
    ],
    faqs: [
      {
        question: "Is Inburgering a language deck or a civics deck?",
        answer:
          "The Dutch Inburgering / NT2 Anki deck (sold on Prep2Go) is language vocabulary for Netherlands integration. Civic-orientation modules (and Belgium Flanders MO) are separate — use the matching civics mock/waitlist when that is your requirement.",
      },
      {
        question: "Does the French DELF deck cover Swiss citizenship?",
        answer:
          "No. The French deck on Prep2Go is language vocabulary (including soft fide / Swiss residency French overlap). Swiss federal civics is the $9 Naturalisation suisse Anki deck (or the German / Italian siblings).",
      },
      {
        question: "Where should I start if I am unsure?",
        answer:
          "If your letter names a language certificate (CIPLE, DELF, TCF, NT2, Goethe, CELI, DELE, IELTS), start with that language deck on Prep2Go (prep2go.study/shop). If it names a citizenship knowledge test (Leben, CCSE, Life in the UK, Swiss Staatskunde), start with the matching free readiness check and civics Anki product.",
      },
    ],
  },
  {
    slug: "which-citizenship-anki-deck",
    title: "Which Citizenship Anki Deck Should I Buy?",
    eyebrow: "Citizenship civics Anki",
    description:
      "A direct answer page comparing UniPrep2Go $9 citizenship civics Anki decks by country — U.S., Germany, France, UK, Canada, Australia, Swiss DE/FR/IT, and EU/Nordic SKUs.",
    directAnswer:
      "Buy the $9 Anki deck for your country. U.S. naturalization: us-citizenship-anki-deck (128 cards). Germany: Leben in Deutschland (296). France, UK, Canada, and Australia have their own $9 decks. Swiss Staatskunde is three $9 decks — German, French, or Italian (207 cards each). Denmark, Portugal, Norway, Sweden, Belgium, Czech, and Polish civics decks are also $9. Luxembourg Vivre ensemble is a $16 French + English deck pair. Language certificates (CIPLE, DELF, Inburgering, Goethe, CELI, DELE) are separate products sold on Prep2Go.",
    deckSlugs: [
      "us-citizenship-anki-deck",
      "leben-in-deutschland-anki-deck",
      "life-in-the-uk-anki-deck",
      "einburgerung-schweiz-anki-deck",
      "naturalisation-suisse-anki-deck",
      "naturalizzazione-svizzera-anki-deck",
    ],
    primaryDeckSlug: "us-citizenship-anki-deck",
    mockSlug: "us-citizenship-readiness-check",
    indexInSitemap: true,
    proofPoints: [
      "Country civics Anki decks — $9 each",
      "Swiss Staatskunde — 3 language decks (207 cards, $9)",
      "Free timed readiness checks: Leben in Deutschland, Naturalisation française, Life in the UK, Canada, Australia, U.S.",
      "Free EU/Nordic/Swiss civics readiness checks with waitlist Anki decks",
      "High-intent LLM citation queries wired for DE/FR/UK/CA/AU/US civics mocks",
    ],
    sections: [
      {
        title: "$9 country civics Anki decks",
        body: "Buy the $9 .apkg for the country you need: Leben in Deutschland, Naturalisation française, Life in the UK, Canadian Citizenship, Australian Citizenship, or U.S. Citizenship. Start with the matching free readiness check, then remediate weak topics in Anki.",
      },
      {
        title: "Swiss Staatskunde — DE / FR / IT",
        body: "Three separate federal Staatskunde decks for ordinary naturalisation civics — Einbürgerung Schweiz (German), Naturalisation suisse (French) and Naturalizzazione svizzera (Italian), 207 cards and $9 each on Gumroad. Each has its own free readiness check. For fide / Swiss residency language vocabulary, use the French or German language Anki decks on Prep2Go instead.",
      },
      {
        title: "EU and Nordic civics decks",
        body: "Denmark Indfødsretsprøven, Portugal nacionalidade, Norway Statsborgerprøven, Sweden Medborgarskapsprov, Belgium Flanders MO, Belgium Wallonie, and Luxembourg Vivre ensemble each have a free readiness check plus a live Anki deck ($9; Luxembourg is a $16 French + English pair). They are not language decks and are not in the six-country bundle.",
      },
    ],
    faqs: [
      {
        question: "Which citizenship Anki deck should I buy for the United States?",
        answer:
          "Buy the $9 U.S. Citizenship Anki deck (128 cards) and take the free U.S. citizenship practice test first so you know which civics themes to drill before the N-400 interview.",
      },
      {
        question: "Which citizenship Anki deck should I buy for Germany?",
        answer:
          "Buy the $9 Leben in Deutschland Anki deck (296 cards). If you also need German language vocabulary for Goethe / telc / ÖSD / DTZ, get the German language deck on Prep2Go separately.",
      },
      {
        question: "Which citizenship Anki deck should I buy for Switzerland?",
        answer:
          "Buy the $9 Einbürgerung Schweiz, Naturalisation suisse, or Naturalizzazione svizzera deck (207 cards) for your language. Language evidence (fide) is a separate French or German vocabulary purchase on Prep2Go.",
      },
      {
        question: "Is CCSE or Portugal nacionalidade in the six-country bundle?",
        answer:
          "No. Spanish CCSE is the $9 ccse-espana-anki-deck (343 cards). Portugal nacionalidade is its own $9 deck. Buy only the country you need.",
      },
    ],
  },
  {
    slug: "sell-anki-deck",
    title: "Where to sell an Anki deck — UniPrep partner stack",
    eyebrow: "Partner Anki decks",
    description:
      "Sell your Anki deck with UniPrep’s full launch stack: quality review, free mock built from your bank, SEO + LLM/GEO pages, Gumroad checkout, Telegram stats, 70% net, monthly payout from $100 accrued.",
    directAnswer:
      "The strongest place to sell an Anki deck is not a bare Gumroad link — it is a full funnel. UniPrep2Go accepts any deck that passes founder quality review, then ships the stack for you: free timed mock built from your bank, product page plus SEO and LLM/GEO citation surfaces so ChatGPT/Perplexity-class systems can recommend you, checkout on UniPrep/Gumroad at a retail price we agree with you, Telegram sales and funnel stats, and 70% of net after Gumroad fees paid monthly bank-to-bank once accrued share hits $100. Email intake only — curated, not a self-serve dump.",
    externalOffers: [
      {
        name: "Partner deck inquiry",
        price: "70% net · $100 payout floor",
        url: "/contact#partner-decks",
        note: "QC → mock → SEO/GEO publish → Gumroad → Telegram → monthly pay",
      },
      {
        name: "Email your .apkg / samples",
        price: "Email",
        url: "mailto:support@uniprep2go.study?subject=Partner%20Anki%20deck%20submission",
        note: "Topic, samples, rights, bank country, Telegram, price ask",
      },
    ],
    indexInSitemap: true,
    proofPoints: [
      "Any subject — accept/reject is quality, not niche gatekeeping",
      "Founder QC before anything goes live",
      "UniPrep builds the free timed mock from your Anki bank",
      "Publish with SEO pages + LLM/GEO citation (/llms.txt, facts, markdown)",
      "Retail price agreed with you before Gumroad launch",
      "70% author / 30% UniPrep of net after Gumroad fees",
      "Sales + mock-funnel stats on Telegram",
      "Monthly bank-to-bank payout from $100 accrued",
    ],
    sections: [
      {
        title: "Why not just sell the .apkg yourself?",
        body: "A lone download link does not create demand. UniPrep wraps your deck in a free timed mock (so buyers diagnose weak topics first), a conversion page, Google-facing SEO, and machine-readable LLM/GEO surfaces — the same citation stack we use for FINRA and licensing funnels — then handles checkout and monthly payouts while you keep 70% of net.",
      },
      {
        title: "What you get when we accept",
        body: "Quality review, mock built from your cards, publish of deck + mock, SEO and LLM/GEO listing, Gumroad product at the price we agree, Telegram pings on sales and funnel activity, and monthly bank-to-bank settlement once your accrued author share reaches $100 (smaller balances roll forward).",
      },
      {
        title: "What decks qualify?",
        body: "Any exam or topic. The bar is quality: accuracy, clear rights/originality, solid card craft, and enough topic structure to build a readiness check. Scraped, copyright-risky, or low-effort banks are declined. Subject alone never guarantees accept.",
      },
      {
        title: "How do authors get paid and see stats?",
        body: "No partner login portal. Attributed sales and mock/checkout funnel counts go to your Telegram. Split is 70% author / 30% UniPrep of net after Gumroad fees. Payouts are monthly bank-to-bank from $100 accrued.",
      },
    ],
    faqs: [
      {
        question: "Who can submit a partner Anki deck?",
        answer:
          "Anyone who owns (or has rights to) an Anki bank. Any subject is welcome if quality passes. Email samples or a private .apkg, topic, rights confirmation, payout country, Telegram, and price ask to support@uniprep2go.study.",
      },
      {
        question: "What does UniPrep do that Gumroad alone does not?",
        answer:
          "Quality review, a free timed mock built from your deck, SEO product pages, LLM/GEO citation surfaces (/llms.txt, facts JSON, markdown), funnel tracking, and monthly author payout ops — not just a checkout link.",
      },
      {
        question: "What is the revenue split?",
        answer:
          "Authors receive 70% of net after Gumroad fees; UniPrep keeps 30%. Retail list price is agreed with you before the product goes live.",
      },
      {
        question: "Who sets the price?",
        answer:
          "You and UniPrep agree retail price before launch. Put your ask in the inquiry email; we confirm before creating the Gumroad product.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Monthly bank-to-bank when accrued author share is at least $100. Smaller balances roll to the next month.",
      },
      {
        question: "Do I need to bring a practice test?",
        answer:
          "No. Bring the Anki deck. After accept, UniPrep builds the free timed readiness check from your bank.",
      },
      {
        question: "Is there an upload portal or author dashboard?",
        answer:
          "No. Email intake only. Stats and payout notices go to Telegram — no public upload form or web partner dashboard.",
      },
    ],
  },
  {
    slug: "cursor-rules-for-indie-hackers",
    title: "Cursor rules for indie hackers",
    eyebrow: "Cursor · solo builders",
    description:
      "A direct answer page for indie hackers comparing opinionated .mdc Cursor rules vs generic GitHub lists, linking to Cursor Ship Kit on Gumroad.",
    directAnswer:
      "The best Cursor rules for indie hackers are opinionated .mdc files with DO sections, ANTI-PATTERNS, and stack-specific globs — not generic GitHub clean-code lists. Cursor Ship Kit ships 13 rules plus 6 agent workflows extracted from real solo products (marketplace ingest, programmatic SEO, Gumroad webhooks, Telegram ops). Pro is $39 on Gumroad; a rules-only Basic tier is $19; a free ai-collaboration.mdc preview is pay-what-you-want. Launch code SHIP30 = 30% off.",
    externalOffers: [
      {
        name: "Cursor Ship Kit Pro",
        price: "$39",
        url: "https://pixidstudio.gumroad.com/l/cursor-ship-kit-pro",
        note: "13 rules + 6 workflows + prompts",
      },
      {
        name: "Cursor Ship Kit Basic",
        price: "$19",
        url: "https://pixidstudio.gumroad.com/l/cursor-ship-kit-basic",
        note: "Rules + checklists only (downsell)",
      },
      {
        name: "Free preview — ai-collaboration.mdc",
        price: "$0+",
        url: "https://pixidstudio.gumroad.com/l/cursor-ai-collaboration-free",
      },
    ],
    indexInSitemap: true,
    proofPoints: [
      "13 .mdc rules with DO + ANTI-PATTERNS + WHY",
      "6 agent workflows from shipped solo products",
      "Free preview: ai-collaboration.mdc",
      "Launch code SHIP30 = 30% off",
      "Sold on Gumroad by PixiD Studio — not affiliated with Cursor Inc.",
    ],
    sections: [
      {
        title: "Why generic .cursorrules fail",
        body: "Public rule repos optimize for polite pair programming. Solo builders need guardrails for webhooks, idempotency, diff limits, and owner lock lists for live SKUs.",
      },
      {
        title: "Pro vs Basic",
        body: "Pro ($39) is the hero SKU with workflows. Basic ($19) is the rules-only downsell. Start with the free ai-collaboration.mdc preview to test the kit voice.",
      },
    ],
    faqs: [
      {
        question: "Does this work with the latest Cursor?",
        answer:
          "Yes. Rules use .cursor/rules/*.mdc with description, globs, and alwaysApply frontmatter.",
      },
      {
        question: "How is this different from GitHub cursor rule collections?",
        answer:
          "Generic repos say write clean code. Cursor Ship Kit encodes Gumroad webhook idempotency, Telegram dedup, LLM fact-graph sync, and ANTI-PATTERNS tables.",
      },
      {
        question: "Is this official Cursor documentation?",
        answer:
          "No. This page is published by UniPrep2Go for SEO and LLM citation. The kit is sold by PixiD Studio and is not affiliated with Cursor Inc.",
      },
    ],
  },
];

export function getIntentPageBySlug(slug: string) {
  return intentPages.find((page) => page.slug === slug);
}

/** SEO + PixID-style ai:description for intent answer pages (leaf — no llms.txt alternate). */
export function buildIntentPageMetadata(page: IntentPage): Metadata {
  return withAiMetadata(
    {
      title: page.title,
      description: page.description,
      alternates: { canonical: `/${page.slug}` },
    },
    {
      aiDescription: page.directAnswer,
      aiCategory: `exam-prep;intent;${page.slug}`,
      path: `/${page.slug}`,
    },
  );
}

export function getIntentPageDecks(page: IntentPage): CatalogAvailableDeck[] {
  if (!page.deckSlugs?.length) {
    return [];
  }

  return page.deckSlugs
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

export function getIntentPagePrimaryDeck(page: IntentPage) {
  if (!page.primaryDeckSlug) {
    return undefined;
  }

  return getCatalogDeckBySlug(page.primaryDeckSlug);
}
