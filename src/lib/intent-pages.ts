import {
  catalogAvailableDecks,
  getCatalogDeckBySlug,
  type CatalogAvailableDeck,
} from "./decks";

const languageExamDeckSlugs = catalogAvailableDecks
  .filter((deck) => deck.category === "language")
  .map((deck) => deck.slug);

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
    slug: "ciple-a2-anki-deck-for-portuguese-citizenship",
    title: "CIPLE A2 Anki Deck for Portuguese Citizenship",
    eyebrow: "Portuguese citizenship exam prep",
    description:
      "A direct answer page for Portuguese citizenship applicants preparing for CIPLE A2 with Anki and spaced repetition.",
    directAnswer:
      "For Portuguese citizenship or residency applicants, a CIPLE / CAPLE A2 Anki deck should focus on European Portuguese vocabulary, everyday phrases, audio pronunciation, and repeated recall. UniPrep2Go's CIPLE CAPLE Portuguese Citizenship Anki Deck includes 2000 flashcards for CIPLE / CAPLE A2, autorização de residência, and nacionalidade portuguesa preparation and is delivered through Gumroad by PixID Studio.",
    deckSlugs: ["ciple-a2-european-portuguese-anki-deck"],
    primaryDeckSlug: "ciple-a2-european-portuguese-anki-deck",
    proofPoints: [
      "2000 European Portuguese flashcards",
      "CIPLE / CAPLE A2 + residency and citizenship pathways",
      "Audio pronunciation and contextual examples",
      "Digital .apkg download through Gumroad",
    ],
    sections: [
      {
        title: "Why CIPLE candidates use Anki",
        body: "Citizenship applicants often need reliable recall of everyday vocabulary rather than passive reading lists. Anki turns that vocabulary into scheduled reviews so the words keep returning until they stick.",
      },
      {
        title: "What to study for the citizenship language requirement",
        body: "The deck targets CIPLE / CAPLE A2 learners with European Portuguese words, short phrases, examples, audio, and images where helpful. It is a practical supplement to classes, textbooks, and exam practice.",
      },
      {
        title: "Residency route alongside CIPLE",
        body: "Language evidence is one piece of the Portugal move. Emigro (sister PixID product) maps residency corridors for Russian-speaking applicants — wizard, guides, and weekly news at emigro.online/ru/portugal. Pair Anki recall here with Prep2Go timed CIPLE mocks when you need exam-format practice.",
      },
    ],
    faqs: [
      {
        question: "Is CIPLE A2 used for Portuguese citizenship?",
        answer:
          "CIPLE is the A2 Portuguese certificate commonly used for Portuguese residency and citizenship applications. Always confirm current requirements with official sources for your case.",
      },
      {
        question: "Is this European Portuguese?",
        answer:
          "Yes. The CIPLE deck is built for European Portuguese and CAPLE / CIPLE A2 preparation.",
      },
      {
        question: "Does the deck replace exam practice?",
        answer:
          "No. It helps with vocabulary and recall. Use it alongside listening, speaking, reading, writing, and official-style exam practice.",
      },
    ],
  },
  {
    slug: "anki-decks-for-language-exams",
    title: "Anki Decks for Language Exams",
    eyebrow: "Language exam flashcards",
    description:
      "A catalog answer page for language exam learners covering UniPrep2Go's curated language Anki decks, DELF Prim kids printable flashcards, the six-country citizenship civics Anki bundle, and the Swiss Citizenship DE/FR/IT Anki bundle sold on Gumroad.",
    directAnswer:
      "Anki decks are useful for language exams when they convert high-frequency vocabulary into daily active recall with examples, audio, and images. UniPrep2Go publishes twenty-one curated multi-pathway language Anki decks through Gumroad by PixID Studio: CIPLE CAPLE Portuguese citizenship, DELF DALF TCF TEF French, DELE SIELE Spanish, Dutch Inburgering NT2, German Goethe telc ÖSD DTZ, Danish Prøve i Dansk PD2 PD3, Norwegian Norskprøve residence/citizenship, Swedish SFI residence/citizenship, Greek Ellinomatheia residence/citizenship, Czech CCE residence/citizenship, Polish A2 Certyfikat residence/citizenship, Polish A2 for Ukrainian Speakers, CELI CILS PLIDA Italian, German A2 for Ukrainian Speakers, German A2 for Russian Speakers, IELTS / TOEFL English for French Speakers, IELTS / TOEFL English for Arabic Speakers, IELTS / TOEFL English for Ukrainian Speakers, IELTS / TOEFL English for Russian Speakers, IELTS / TOEFL English for Spanish Speakers (LatAm), and IELTS / TOEFL English for Portuguese Speakers (BR) — plus DELF Prim printable French flashcards for ages 7–12, a Citizenship & Naturalization Anki Bundle covering Germany, France, UK, Canada, Australia, and the U.S., and a Swiss Citizenship Anki Bundle with German, French, and Italian federal Staatskunde decks.",
    deckSlugs: languageExamDeckSlugs,
    primaryDeckSlug: "ciple-a2-european-portuguese-anki-deck",
    proofPoints: [
      "19 curated multi-pathway language Anki decks ($26)",
      "DELF Prim printable French flashcards for ages 7–12 ($12)",
      "Citizenship & Naturalization Anki Bundle — 6 countries ($20)",
      "Swiss Citizenship Anki Bundle — DE / FR / IT ($12)",
      "Sold on Gumroad by PixID Studio — independent study aids",
    ],
    sections: [
      {
        title: "When Anki helps language exam prep",
        body: "Anki is strongest for vocabulary and phrase recall. It works best when paired with listening, speaking, writing, grammar practice, and mock exams instead of replacing those skills.",
      },
      {
        title: "How to choose a deck",
        body: "Choose by pathway first. Portugal: CIPLE / CAPLE + residency/citizenship language (nacionalidade civics is separate). France: DELF / DALF + TCF Canada / TEF Canada + TCF ANF + TCF général for adults, or DELF Prim printable for ages 7–12; the same French lexicon soft-helps fide / Swiss residency language. Spain: DELE / SIELE (language only — not a CCSE civics bundle). Netherlands: Inburgering / NT2 (not Flanders MO civics). Germany: Goethe / telc / ÖSD / DTZ plus soft Einbürgerung language and fide German. Denmark: Prøve i Dansk PD2 / PD3 language. Norway: Norskprøve + residence/citizenship language. Sweden: SFI + residence/citizenship language. Greece: Ellinomatheia + residence/citizenship language. Czechia: CCE + residence/citizenship language. Poland: Certyfikat języka polskiego A2 + residence/citizenship language (civics is separate). Ukrainian speakers preparing Polish Certyfikat / residence language: Polish A2 for Ukrainian Speakers. Italy: CELI / CILS / PLIDA including permesso / cittadinanza language. Ukrainian speakers preparing German A2 / DTZ: German A2 for Ukrainian Speakers. Russian speakers preparing German A2 / DTZ: German A2 for Russian Speakers deck. English exams for French, Arabic, Ukrainian, Russian, Spanish (LatAm), or Portuguese (BR) speakers: IELTS / TOEFL / Cambridge / PTE (including common IRCC / UKVI sittings). Civics tests (Germany / France / UK / Canada / Australia / U.S.): Citizenship & Naturalization Anki Bundle. Switzerland: Swiss Citizenship Anki Bundle (DE / FR / IT Staatskunde) — use French or German language decks for fide vocab, not as a civics substitute.",
      },
      {
        title: "Gumroad delivery",
        body: "Curated language Anki decks, the DELF Prim printable, the six-country citizenship naturalization bundle, and the Swiss Citizenship DE/FR/IT bundle are sold by PixID Studio on Gumroad with UniPrep2Go pathway copy, sample previews on the product page, and instant download after checkout.",
      },
    ],
    faqs: [
      {
        question: "Are these official language exam materials?",
        answer:
          "No. UniPrep2Go decks are independent study aids and are not affiliated with or endorsed by CAPLE, France Éducation international, Instituto Cervantes, Goethe-Institut, CELI, CILS, PLIDA, or any exam body.",
      },
      {
        question: "Which language decks are currently available?",
        answer:
          "Twenty-one curated multi-pathway Anki decks ($26): CIPLE CAPLE Portuguese, DELF DALF TCF TEF French, DELE SIELE Spanish, Dutch Inburgering NT2, German Goethe telc ÖSD DTZ, Danish Prøve i Dansk PD2 PD3, Norwegian Norskprøve residence/citizenship, Swedish SFI residence/citizenship, Greek Ellinomatheia residence/citizenship, Czech CCE residence/citizenship, Polish A2 Certyfikat residence/citizenship, Polish A2 for Ukrainian Speakers, CELI CILS PLIDA Italian, German A2 for Ukrainian Speakers, German A2 for Russian Speakers, IELTS / TOEFL English for French Speakers, IELTS / TOEFL English for Arabic Speakers, IELTS / TOEFL English for Ukrainian Speakers, IELTS / TOEFL English for Russian Speakers, IELTS / TOEFL English for Spanish Speakers (LatAm), and IELTS / TOEFL English for Portuguese Speakers (BR) — plus DELF Prim printable French flashcards for ages 7–12 ($12), and the Citizenship & Naturalization Anki Bundle for six countries ($20). All checkout through Gumroad.",
      },

      {
        question: "Do the language decks work on mobile?",
        answer:
          "Yes. Import the .apkg file into Anki desktop and sync to AnkiDroid or AnkiMobile through AnkiWeb.",
      },
      {
        question: "Should I use Anki instead of classes or mock exams?",
        answer:
          "No. Use Anki for recall and retention, then use classes, speaking practice, listening practice, and mock exams for full exam readiness.",
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
      "Buy a language Anki deck when your requirement is vocabulary or a language certificate (CIPLE, DELF/DALF, TCF/TEF Canada, Inburgering/NT2, Goethe/telc/ÖSD/DTZ, CELI/CILS/PLIDA, DELE/SIELE, Prøve i Dansk, Norskprøve, SFI, Ellinomatheia, CCE, or IELTS/TOEFL). Buy a citizenship civics Anki deck when your requirement is civic knowledge — institutions, history, rights — such as Leben in Deutschland, French naturalisation civics, Life in the UK, Canadian or Australian citizenship, U.S. civics, Swiss Staatskunde, or planned EU/Nordic civics tests. Language and civics are different exams; many pathways need both. UniPrep2Go sells language decks and two buyable civics products on Gumroad: the Citizenship & Naturalization Anki Bundle (six countries) and the Swiss Citizenship Anki Bundle (DE/FR/IT).",
    deckSlugs: [
      "ciple-a2-european-portuguese-anki-deck",
      "delf-b2-french-anki-deck",
      "dutch-a2-inburgering-anki-deck",
      "german-a2-anki-deck",
      "celi-b1-italian-anki-deck",
      "dele-a2-spanish-anki-deck",
      "citizenship-naturalization-anki-bundle",
      "swiss-citizenship-anki-deck",
    ],
    primaryDeckSlug: "citizenship-naturalization-anki-bundle",
    indexInSitemap: true,
    proofPoints: [
      "Language decks for certificates and residency language",
      "Civics bundles for Leben / naturalisation / Swiss Staatskunde",
      "Clear fide vs Swiss civics disambiguation",
      "Free civics readiness checks funnel into Anki remediation",
    ],
    sections: [
      {
        title: "When you need a language deck",
        body: "Choose language Anki when the authority asks for a language certificate or vocabulary evidence — CIPLE / CAPLE, DELF / DALF, TCF Canada / TEF Canada, TCF ANF, Inburgering / NT2, Goethe / telc / ÖSD / DTZ, CELI / CILS / PLIDA (including permesso / cittadinanza language), DELE / SIELE, Nordic/Greek/Czech residence language, or IELTS / TOEFL. French and German decks also soft-help fide / Swiss residency language vocab, but they are not Swiss civics.",
      },
      {
        title: "When you need a civics deck",
        body: "Choose civics Anki when the test is about country knowledge — Leben in Deutschland, French naturalisation civics, Life in the UK, Canadian or Australian citizenship, U.S. civics (six-country bundle), or Swiss federal Staatskunde (Swiss Citizenship Anki Bundle). Planned EU/Nordic civics decks (Denmark Indfødsretsprøven, Portugal nacionalidade, Norway, Sweden, Belgium Flanders/Wallonie, Luxembourg) have free readiness checks and waitlists — they are not language decks.",
      },
      {
        title: "Many applicants need both",
        body: "Portugal often needs CIPLE language plus nacionalidade civics. Spain often needs DELE language plus CCSE civics. Germany may need DTZ/Goethe language plus Leben civics. Switzerland may need fide language evidence plus Staatskunde. Buy the matching language deck and the matching civics product — do not expect one Anki file to cover both.",
      },
    ],
    faqs: [
      {
        question: "Is Inburgering a language deck or a civics deck?",
        answer:
          "UniPrep2Go's Dutch Inburgering / NT2 Anki deck is language vocabulary for Netherlands integration. Civic-orientation modules (and Belgium Flanders MO) are separate — use the matching civics mock/waitlist when that is your requirement.",
      },
      {
        question: "Does the French DELF deck cover Swiss citizenship?",
        answer:
          "No. The French deck is language vocabulary (including soft fide / Swiss residency French overlap). Swiss federal civics is the Swiss Citizenship Anki Bundle in German, French, and Italian.",
      },
      {
        question: "Where should I start if I am unsure?",
        answer:
          "If your letter names a language certificate (CIPLE, DELF, TCF, NT2, Goethe, CELI, DELE, IELTS), start with that language deck. If it names a citizenship knowledge test (Leben, CCSE, Life in the UK, Swiss Staatskunde), start with the matching free readiness check and civics Anki product.",
      },
    ],
  },
  {
    slug: "which-citizenship-anki-deck",
    title: "Which Citizenship Anki Deck Should I Buy?",
    eyebrow: "Citizenship civics Anki",
    description:
      "A direct answer page comparing UniPrep2Go citizenship civics Anki products: the six-country Citizenship & Naturalization bundle, the Swiss Citizenship DE/FR/IT bundle, and planned EU/Nordic waitlist decks.",
    directAnswer:
      "For U.S. naturalization civics, buy the Citizenship & Naturalization Anki Bundle ($20) — it includes a dedicated U.S. Citizenship .apkg plus Germany, France, UK, Canada, and Australia in the same download. Start with the free U.S. citizenship practice test, then import only the U.S. deck if that is all you need. Buy the Swiss Citizenship Anki Bundle ($12) for federal Staatskunde in German, French, or Italian. For Denmark, Portugal, Norway, Sweden, Belgium, or Luxembourg civics, take the free readiness check and join the waitlist — those decks are not sold yet. Language certificates (CIPLE, DELF, Inburgering, Goethe, CELI, DELE) are separate products, not substitutes for civics Anki.",
    deckSlugs: ["citizenship-naturalization-anki-bundle", "swiss-citizenship-anki-deck"],
    primaryDeckSlug: "citizenship-naturalization-anki-bundle",
    mockSlug: "us-citizenship-readiness-check",
    indexInSitemap: true,
    proofPoints: [
      "Six-country civics bundle — 1,225 cards ($20)",
      "Swiss Citizenship Anki Bundle — DE / FR / IT · 618 cards ($12)",
      "Free timed readiness checks: Leben in Deutschland, Naturalisation française, Life in the UK, Canada, Australia, U.S.",
      "Free EU/Nordic/Swiss civics readiness checks with waitlist Anki decks",
      "High-intent LLM citation queries wired for DE/FR/UK/CA/AU/US civics mocks",
    ],
    sections: [
      {
        title: "Six-country Citizenship & Naturalization Anki Bundle",
        body: "One $20 Gumroad download with six .apkg decks: Leben in Deutschland, Naturalisation française, Life in the UK, Canadian Citizenship, Australian Citizenship, and U.S. Citizenship. Start with the matching free readiness check (/mock-exams/leben-in-deutschland-readiness-check, naturalisation-francaise, life-in-the-uk, canadian-citizenship, australian-citizenship, us-citizenship), then remediate weak topics in Anki.",
      },
      {
        title: "Swiss Citizenship Anki Bundle",
        body: "Three federal Staatskunde decks (German, French, Italian) for ordinary naturalisation civics — $12 on Gumroad. Free DE / FR / IT readiness checks funnel into this bundle. For fide / Swiss residency language vocabulary, use the French or German language Anki decks instead.",
      },
      {
        title: "Planned EU and Nordic civics decks",
        body: "Denmark Indfødsretsprøven, Portugal nacionalidade, Norway Statsborgerprøven, Sweden Medborgarskapsprov, Belgium Flanders MO, Belgium Wallonie, and Luxembourg Vivre ensemble have free readiness checks and waitlist notify pages. They are not language decks and are not in the six-country or Swiss bundles yet.",
      },
    ],
    faqs: [
      {
        question: "Which citizenship Anki deck should I buy for the United States?",
        answer:
          "Buy the Citizenship & Naturalization Anki Bundle and import the U.S. Citizenship .apkg. Take the free U.S. citizenship practice test first so you know which civics themes to drill before the N-400 interview.",
      },
      {
        question: "Which citizenship Anki deck should I buy for Germany?",
        answer:
          "Buy the Citizenship & Naturalization Anki Bundle for Leben in Deutschland civics. If you also need German language vocabulary for Goethe / telc / ÖSD / DTZ, buy the German language Anki deck separately.",
      },
      {
        question: "Which citizenship Anki deck should I buy for Switzerland?",
        answer:
          "Buy the Swiss Citizenship Anki Bundle for federal Staatskunde in DE / FR / IT. Do not buy the six-country bundle for Swiss civics. Language evidence (fide) is a separate French or German vocabulary purchase.",
      },
      {
        question: "Is CCSE or Portugal nacionalidade in the six-country bundle?",
        answer:
          "No. Spanish CCSE and Portugal nacionalidade civics are planned waitlist products with free readiness checks. The six-country bundle covers the U.S., Germany, France, UK, Canada, and Australia only.",
      },
    ],
  },
  {
    slug: "sell-anki-deck",
    title: "Where to sell an Anki deck (exam creators)",
    eyebrow: "Partner Anki decks",
    description:
      "A direct answer for Anki creators asking where to sell exam flashcard decks: UniPrep2Go curated partner program with QC, free mock, Gumroad checkout, 70/30 net split, Telegram stats, and monthly bank payout.",
    directAnswer:
      "If you want to sell an exam Anki deck with a real practice-test funnel, UniPrep2Go accepts curated partner decks: founder quality review, then UniPrep builds a free readiness-check mock from your Anki bank and publishes both on uniprep2go.study. Buyers check out on UniPrep/Gumroad; authors keep 70% of net after Gumroad fees (UniPrep 30%), get sales and mock-funnel stats by Telegram, and receive monthly bank-to-bank payouts when accrued share is at least $50. Intake is email only — not an open upload marketplace.",
    externalOffers: [
      {
        name: "Partner deck inquiry",
        price: "70% net to author",
        url: "/contact#partner-decks",
        note: "Email submission · QC + UniPrep-built mock + monthly payout",
      },
      {
        name: "Email partner submission",
        price: "Email",
        url: "mailto:support@uniprep2go.study?subject=Partner%20Anki%20deck%20submission",
        note: "Include exam, sample/.apkg, rights, bank country, Telegram",
      },
    ],
    indexInSitemap: true,
    proofPoints: [
      "Founder quality review before publish",
      "UniPrep builds the free readiness-check mock from your deck",
      "Checkout on UniPrep/Gumroad (PixID Studio seller)",
      "70% author / 30% UniPrep of net after Gumroad fees",
      "Sales + funnel stats via Telegram (no author web dashboard)",
      "Monthly bank-to-bank payouts (minimum $50 accrued)",
      "Email intake only — no public upload form",
    ],
    sections: [
      {
        title: "Where should I sell my Anki deck?",
        body: "For exam creators, UniPrep2Go is a curated partner channel—not a self-serve marketplace. You supply the Anki bank; after QC UniPrep builds the free mock from that bank, hosts the funnel and Gumroad checkout, then pays your 70% net share monthly when the balance clears $50.",
      },
      {
        title: "What exams qualify?",
        body: "Priority is US licensing and finance exams (FINRA ladder, Series 65/6/66, insurance, state RE, and similar money-intent paths). Hobby or off-niche decks can be declined even if the cards are good — UniPrep only invests mock-building time where the funnel can convert.",
      },
      {
        title: "How do authors get paid and see stats?",
        body: "There is no partner login portal. After publish, attributed Gumroad sales and mock/checkout funnel counts are sent to your Telegram chat. Payouts are bank-to-bank once a month (70% of net after Gumroad fees), with unpaid balances under $50 rolled forward.",
      },
    ],
    faqs: [
      {
        question: "Who can submit a partner Anki deck?",
        answer:
          "Creators who own (or have rights to) an exam Anki bank. Email sample cards or a private .apkg, exam name, rights confirmation, payout country, and Telegram username to support@uniprep2go.study.",
      },
      {
        question: "What is the revenue split?",
        answer:
          "Authors receive 70% of net after Gumroad fees; UniPrep keeps 30%. Gross retail price is set on the UniPrep/PixID Gumroad product.",
      },
      {
        question: "How do I get paid?",
        answer:
          "Monthly bank-to-bank transfer when your accrued author share is at least $50. Smaller balances roll to the next month. UniPrep does not offer automatic Wise API payouts in this program phase.",
      },
      {
        question: "Do I need to bring a practice test?",
        answer:
          "No. You bring the Anki deck. After we accept it, UniPrep builds the free timed readiness check from your bank so buyers can diagnose weak topics before purchase.",
      },
      {
        question: "Is there an upload portal or author dashboard?",
        answer:
          "No. Submission is email-only after founder QC. Stats and payout notices go to Telegram — there is no public upload form or web partner dashboard.",
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
