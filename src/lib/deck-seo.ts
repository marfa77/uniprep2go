import {
  formatDeckContentLabel,
  type CatalogAvailableDeck,
  type Deck,
  type DeckCategory,
} from "./decks";
import { getAllMockExams } from "./mock-exams/configs";
import { buildMockSeoTitle } from "./mock-exams/seo";
import type { MockExamConfig } from "./mock-exams/types";
import { fitSeoTitle, SEO_TITLE_MAX } from "./seo";
import { absoluteUrl, siteConfig } from "./site";

/** Available or planned catalog deck — SEO helpers only need shared BaseDeck fields. */
type SeoDeck = CatalogAvailableDeck | Deck;

type DeckSeoProfile = {
  title: string;
  description: string;
  keywords: string[];
  headline: string;
  intro: string;
  audience: string;
  studyLabel: string;
};

function getLinkedMocks(slug: string): MockExamConfig[] {
  return getAllMockExams().filter((mock) => mock.linkedDeckSlug === slug);
}

function getLinkedMock(slug: string): MockExamConfig | undefined {
  return getLinkedMocks(slug)[0];
}

function yearPrefix(examYear: string): string {
  return examYear.includes("2026") ? "2026 " : "";
}

function mockSuffix(mock?: MockExamConfig): string {
  if (!mock) return "";
  return mock.status === "live" ? " + Free Practice Test" : " + Free Mock";
}

function contentLabel(deck: SeoDeck): string {
  return formatDeckContentLabel(deck);
}

function studyLabelFor(deck: SeoDeck): string {
  if (deck.format === "App") return `${deck.shortName} study app`;
  if (deck.format === "PDF") return `${deck.shortName} study guide`;
  return `${deck.shortName} exam prep`;
}

function defaultTitle(deck: SeoDeck, mock?: MockExamConfig): string {
  const year = yearPrefix(deck.facts.examYear);
  const content = contentLabel(deck);
  const suffix = mockSuffix(mock);

  switch (deck.category) {
    case "finance":
    case "professional":
      return `${year}${deck.shortName} Exam Prep | ${content}${suffix}`;
    case "language":
      return `${deck.shortName} Exam Prep | ${content} Flashcards`;
    case "immigration":
      return deck.format === "App"
        ? `${deck.shortName} Exam Prep | Survival Guide App`
        : `${deck.shortName} Exam Prep | ${content}`;
    case "academic":
      return `${deck.shortName} Exam Prep | ${content}`;
  }
}

function defaultHeadline(deck: SeoDeck, mock?: MockExamConfig): string {
  const year = yearPrefix(deck.facts.examYear).trim();
  const prefix = year ? `${year} ` : "";
  const content = contentLabel(deck);

  if (deck.format === "PDF") {
    return `${prefix}${deck.shortName} Exam Prep — ${content}`;
  }

  if (mock) {
    return `${prefix}${deck.shortName} Exam Prep — ${content} + Free Mock`;
  }

  return `${prefix}${deck.shortName} Exam Prep — ${content}`;
}

function defaultDescription(deck: SeoDeck, mock?: MockExamConfig): string {
  const content = contentLabel(deck);
  const topics = deck.facts.topics;
  const mockLine = mock
    ? ` Includes a linked free ${mock.questionCount}-question ${mock.status === "live" ? "practice test" : "readiness check"} with topic scoring.`
    : "";

  if (deck.category === "finance" || deck.category === "professional") {
    return `${deck.shortName} exam prep with ${content.toLowerCase()} for ${topics.toLowerCase()}. ${deck.format} download for active recall and spaced repetition.${mockLine} Independent study aid — not official exam material.`;
  }

  if (deck.format === "App") {
    return `${deck.shortName} exam prep in the Prep2Go Immigration app: ${topics}. Independent survival guide and citizenship test study aid.`;
  }

  return `${deck.shortName} exam prep with ${content.toLowerCase()} covering ${topics.toLowerCase()}. ${deck.format} format for daily spaced-repetition review. Independent study aid.`;
}

function defaultKeywords(deck: SeoDeck, mock?: MockExamConfig): string[] {
  const base = deck.shortName.toLowerCase();
  const keywords = [
    `${base} exam prep`,
    `${base} flashcards`,
    `${base} study guide`,
  ];

  if (deck.format === ".apkg") {
    keywords.push(`${base} anki deck`, `anki ${base}`);
  }

  if (mock) {
    keywords.push(
      `free ${base} practice test`,
      `${base} mock exam`,
      `${mock.examBody.toLowerCase()} practice questions`,
    );
  }

  if (deck.category === "language") {
    keywords.push(`${base} vocabulary`, `${base} exam flashcards`);
  }

  return keywords;
}

const deckSeoProfiles: Partial<Record<string, Partial<DeckSeoProfile>>> = {
  "ciple-a2-european-portuguese-anki-deck": {
    title: "CIPLE CAPLE Portuguese Citizenship Exam Prep | 2000 Cards",
    headline: "CIPLE CAPLE Portuguese Citizenship Exam Prep — 2000 Flashcards",
    studyLabel: "CIPLE CAPLE Portuguese citizenship exam prep",
    description:
      "CIPLE / CAPLE A2 European Portuguese Anki deck with 2000 flashcards for Portuguese residency and citizenship (nacionalidade). PT-PT audio and examples. Independent study aid — not official CAPLE material.",
    keywords: [
      "ciple anki deck",
      "caple a2 flashcards",
      "portuguese citizenship anki",
      "nacionalidade portuguesa vocabulary",
      "european portuguese anki",
      "autorizacao de residencia portuguese",
    ],
    intro:
      "Applicants using CIPLE A2 for Portuguese residency or citizenship drill European Portuguese vocabulary daily, then practice speaking and official-style exam tasks separately.",
  },
  "dutch-a2-inburgering-anki-deck": {
    title: "Dutch Inburgering NT2 A2 Anki Deck | 2000 Cards",
    headline: "Dutch Inburgering NT2 A2 Prep — 2000 Flashcards",
    studyLabel: "Dutch Inburgering NT2 exam prep",
    description:
      "Dutch A2 Anki deck with 2000 flashcards for Inburgering, Staatsexamen NT2 A2 vocabulary, residency, and naturalisatie. Audio and bilingual examples. Independent study aid — not official DUO material.",
    keywords: [
      "inburgering anki",
      "nt2 a2 flashcards",
      "dutch inburgering vocabulary",
      "staatsexamen nt2 anki",
      "naturalisatie nederlands vocabulary",
    ],
    intro:
      "Migrants preparing Inburgering or NT2 A2 use one high-frequency Dutch vocabulary bank for civic integration and naturalisatie language requirements.",
  },
  "german-a2-anki-deck": {
    title: "German Goethe telc ÖSD DTZ Exam Prep | 2000 Cards",
    headline: "German Goethe telc ÖSD DTZ Exam Prep — 2000 Flashcards",
    studyLabel: "German Goethe telc ÖSD DTZ exam prep",
    description:
      "German Anki deck with 2000 flashcards for Goethe-Institut A2, telc Deutsch A2, ÖSD A2, and DTZ — plus shared lexicon for residence / Einbürgerung language and fide / Swiss residency German. Independent study aid — not official Goethe, telc, ÖSD, BAMF, or fide / SEM material.",
    keywords: [
      "goethe a2 anki",
      "telc a2 flashcards",
      "osd a2 anki",
      "dtz anki deck",
      "german a2 vocabulary anki",
      "einburgerung german vocabulary",
      "fide german anki",
      "swiss residency german vocabulary",
    ],
    intro:
      "Learners preparing Goethe A2, telc A2, ÖSD A2, DTZ, or high-frequency German for residence / Einbürgerung language and fide / Swiss residency share one A2–B1 vocabulary bank — then practice each exam's format separately. For Leben in Deutschland civics, use the Citizenship & Naturalization Anki Bundle; for Swiss civics, use the Swiss Citizenship Anki Bundle.",
  },
  "celi-b1-italian-anki-deck": {
    title: "CELI CILS PLIDA Italian Anki Deck | 1500 Cards",
    headline: "CELI CILS PLIDA Italian Prep — 1500 Flashcards",
    studyLabel: "CELI CILS PLIDA Italian exam prep",
    description:
      "Italian B1 Anki deck with 1,500 flashcards for CELI, CILS, and PLIDA — including vocabulary overlap for permesso di soggiorno and cittadinanza language pathways. Independent study aid — not official exam material.",
    keywords: [
      "celi b1 anki",
      "cils b1 flashcards",
      "plida b1 anki",
      "italian b1 vocabulary anki",
      "celi cils plida deck",
      "cils b1 cittadinanza anki",
      "permesso di soggiorno italian vocabulary",
      "italian citizenship language anki",
    ],
    intro:
      "CELI, CILS, and PLIDA B1 candidates — including applicants using B1 Italian for permesso di soggiorno or cittadinanza language evidence — use one shared Italian vocabulary bank between classes and mock exams. This is language prep, not an Italian civics quiz.",
  },
  "danish-a2-prove-i-dansk-anki-deck": {
    title: "Danish Prøve i Dansk PD2 PD3 Anki | 1000 Cards",
    headline: "Danish Prøve i Dansk PD2 PD3 Prep — 1000 Flashcards",
    studyLabel: "Danish Prøve i Dansk PD2 PD3 exam prep",
    description:
      "Danish Anki deck with 1000 flashcards for Prøve i Dansk PD2 / PD3 (≈ CEFR B1 / B1+, not A2) and residence or citizenship language prep. Audio and examples. Independent study aid — not official Danish exam material.",
    keywords: [
      "prove i dansk anki",
      "pd2 danish flashcards",
      "pd3 prove i dansk",
      "danish citizenship vocabulary",
      "danish b1 vocabulary anki",
    ],
    intro:
      "Prøve i Dansk PD2 / PD3 learners (≈ B1 / B1+) and residence or citizenship applicants drill everyday Danish vocabulary on a daily Anki schedule — this is not a PD1/A2 tourist pack.",
  },
  "norwegian-a2-norskprove-anki-deck": {
    title: "Norwegian Norskprøve Residence Citizenship Anki | 1500 Cards",
    headline: "Norwegian Norskprøve Residence Citizenship Prep — 1500 Flashcards",
    studyLabel: "Norwegian Norskprøve exam prep",
    description:
      "Norwegian Bokmål Anki deck with 1500 flashcards for Norskprøve A2 and residence or citizenship language prep. Independent study aid — not official Norskprøve material.",
    keywords: [
      "norskprove anki",
      "norskprøve flashcards",
      "norwegian citizenship vocabulary",
      "permanent oppholdstillatelse norwegian",
      "bokmal a2 anki",
    ],
    intro:
      "Norskprøve A2 learners preparing residence or citizenship language requirements use daily Bokmål vocabulary recall alongside speaking practice.",
  },
  "swedish-a2-sfi-anki-deck": {
    title: "Swedish SFI Residence Citizenship Anki | 1000 Cards",
    headline: "Swedish SFI Residence Citizenship Prep — 1000 Flashcards",
    studyLabel: "Swedish SFI exam prep",
    description:
      "Swedish Anki deck with 1000 flashcards for SFI (Swedish for Immigrants) A2 and residence or citizenship language prep. Independent study aid — not official SFI or Migration Agency material.",
    keywords: [
      "sfi anki",
      "swedish sfi flashcards",
      "sfi a2 vocabulary",
      "swedish citizenship vocabulary",
      "swedish for immigrants anki",
    ],
    intro:
      "SFI learners preparing residence or citizenship language requirements use daily Swedish vocabulary recall alongside speaking practice.",
  },
  "greek-a2-ellinomatheia-anki-deck": {
    title: "Greek Ellinomatheia Residence Citizenship Anki | 1000 Cards",
    headline: "Greek Ellinomatheia Residence Citizenship Prep — 1000 Flashcards",
    studyLabel: "Greek Ellinomatheia exam prep",
    description:
      "Greek Anki deck with 1000 flashcards for Ellinomatheia A2 and residence or citizenship language prep. Independent study aid — not official Ellinomatheia material.",
    keywords: [
      "ellinomatheia anki",
      "greek a2 flashcards",
      "ellinomatheia a2 vocabulary",
      "greek citizenship vocabulary",
      "greek for immigrants anki",
    ],
    intro:
      "Ellinomatheia learners preparing residence or citizenship language requirements use daily Greek vocabulary recall alongside speaking practice.",
  },
  "czech-a2-cce-anki-deck": {
    title: "Czech CCE Residence Citizenship Anki | 1000 Cards",
    headline: "Czech CCE Residence Citizenship Prep — 1000 Flashcards",
    studyLabel: "Czech CCE exam prep",
    description:
      "Czech Anki deck with 1000 flashcards for CCE A2 and residence or citizenship language prep. Independent study aid — not official CCE / ÚJOP material.",
    keywords: [
      "cce anki",
      "czech a2 flashcards",
      "cce a2 vocabulary",
      "czech citizenship vocabulary",
      "czech language certificate anki",
    ],
    intro:
      "CCE learners preparing residence or citizenship language requirements use daily Czech vocabulary recall alongside speaking practice.",
  },
  "polish-a2-certyfikat-anki-deck": {
    title: "Polish A2 Certyfikat Anki Deck | 1500 Cards",
    headline: "Polish A2 Certyfikat Prep — 1500 Flashcards",
    studyLabel: "Polish Certyfikat A2 exam prep",
    description:
      "Polish Anki deck with 1500 flashcards for Certyfikat języka polskiego A2 and residence or citizenship language prep. Independent study aid — not official Certyfikat material.",
    keywords: [
      "polish certyfikat anki",
      "certyfikat jezyka polskiego anki",
      "polish a2 flashcards",
      "polish residence vocabulary",
      "polish citizenship language anki",
    ],
    intro:
      "Certyfikat języka polskiego A2 learners preparing residence or citizenship language requirements use daily Polish vocabulary recall — not a Polish civics deck.",
  },
  "polish-a2-for-ukrainian-speakers-anki-deck": {
    title: "Polish A2 for Ukrainian Speakers Anki | 1500 Cards",
    headline: "Polish A2 for Ukrainian Speakers — 1500 Flashcards",
    studyLabel: "Polish A2 for Ukrainian speakers exam prep",
    description:
      "Polish Anki deck with 1500 flashcards for Ukrainian speakers preparing Certyfikat języka polskiego A2 and residence language — Ukrainian glosses, bilingual examples, and native Polish audio. Independent study aid — not official Certyfikat material.",
    keywords: [
      "polish for ukrainian speakers anki",
      "польська для українців anki",
      "certyfikat a2 ukrainian anki",
      "polish a2 bilingual ukrainian",
      "польский для украинцев anki",
    ],
    intro:
      "Ukrainian-speaking Certyfikat A2 and residence-language candidates use bilingual Polish vocabulary recall with Ukrainian support before timed exam practice. Not a Polish citizenship civics deck.",
  },
  "german-a2-for-ukrainian-speakers-anki-deck": {
    title: "German A2 for Ukrainian Speakers Anki | 1926 Cards",
    headline: "German A2 for Ukrainian Speakers — 1926 Flashcards",
    studyLabel: "German A2 for Ukrainian speakers exam prep",
    description:
      "German Anki deck with 1926 flashcards for Ukrainian speakers preparing Goethe A2, telc A2, ÖSD A2, and DTZ — Ukrainian glosses, bilingual examples, and native German audio. Independent study aid — not official Goethe, telc, ÖSD, or BAMF material.",
    keywords: [
      "german for ukrainian speakers anki",
      "німецька для українців anki",
      "dtz ukrainian anki",
      "goethe a2 ukrainian flashcards",
      "german a2 bilingual ukrainian",
    ],
    intro:
      "Ukrainian-speaking Goethe, telc, ÖSD, and DTZ candidates use bilingual German vocabulary recall with Ukrainian support before timed exam practice. Not a Leben in Deutschland civics deck.",
  },
  "german-a2-for-russian-speakers-anki-deck": {
    title: "German A2 for Russian Speakers Anki | 1926 Cards",
    headline: "German A2 for Russian Speakers — 1926 Flashcards",
    studyLabel: "German A2 for Russian speakers exam prep",
    description:
      "German Anki deck with 1926 flashcards for Russian speakers preparing Goethe A2, telc A2, ÖSD A2, and DTZ — Russian glosses, bilingual examples, and native German audio. Independent study aid — not official Goethe, telc, ÖSD, or BAMF material.",
    keywords: [
      "german for russian speakers anki",
      "немецкий для русских anki",
      "dtz russian anki",
      "goethe a2 russian flashcards",
      "german a2 bilingual russian",
    ],
    intro:
      "Russian-speaking Goethe, telc, ÖSD, and DTZ candidates use bilingual German vocabulary recall with Russian support before timed exam practice. Not a Leben in Deutschland civics deck.",
  },
  "ielts-toefl-english-for-french-speakers-anki-deck": {
    title: "IELTS / TOEFL English for French Speakers Anki | 2522 Cards",
    headline: "IELTS / TOEFL English for French Speakers — 2522 Flashcards",
    studyLabel: "IELTS TOEFL English for French speakers",
    description:
      "English Anki deck with 2522 flashcards for French speakers preparing IELTS, TOEFL, Cambridge, and PTE — French glosses, bilingual examples, and native English audio. Independent study aid — not official exam material.",
    keywords: [
      "english for french speakers anki",
      "ielts vocabulary french speakers",
      "toefl vocabulary french speakers",
      "anglais pour francophones anki",
      "ielts toefl flashcards french",
    ],
    intro:
      "French-speaking IELTS and TOEFL candidates use bilingual English vocabulary recall with French support before timed exam practice.",
  },
  "ielts-toefl-english-for-arabic-speakers-anki-deck": {
    title: "IELTS / TOEFL English for Arabic Speakers Anki | 2504 Cards",
    headline: "IELTS / TOEFL English for Arabic Speakers — 2504 Flashcards",
    studyLabel: "IELTS TOEFL English for Arabic speakers",
    description:
      "English Anki deck with 2504 flashcards for Arabic speakers preparing IELTS, TOEFL, Cambridge, and PTE — Arabic glosses, bilingual examples, and native English audio. Independent study aid — not official exam material.",
    keywords: [
      "english for arabic speakers anki",
      "ielts vocabulary arabic speakers",
      "toefl vocabulary arabic speakers",
      "english for arab speakers flashcards",
      "ielts toefl flashcards arabic",
    ],
    intro:
      "Arabic-speaking IELTS and TOEFL candidates use bilingual English vocabulary recall with Arabic support before timed exam practice.",
  },

  "ielts-toefl-english-for-ukrainian-speakers-anki-deck": {
    title: "IELTS / TOEFL English for Ukrainian Speakers Anki | 2504 Cards",
    headline: "IELTS / TOEFL English for Ukrainian Speakers — 2504 Flashcards",
    studyLabel: "IELTS TOEFL English for Ukrainian speakers",
    description:
      "English Anki deck with 2504 flashcards for Ukrainian speakers preparing IELTS, TOEFL, Cambridge, and PTE — Ukrainian glosses, bilingual examples, and native English audio. Independent study aid — not official exam material.",
    keywords: [
      "english for ukrainian speakers anki",
      "ielts vocabulary ukrainian speakers",
      "toefl vocabulary ukrainian speakers",
      "английский для украинцев anki",
      "ielts toefl flashcards ukrainian",
    ],
    intro:
      "Ukrainian-speaking IELTS and TOEFL candidates use bilingual English vocabulary recall with Ukrainian support before timed exam practice.",
  },

  "ielts-toefl-english-for-russian-speakers-anki-deck": {
    title: "IELTS / TOEFL English for Russian Speakers Anki | 2504 Cards",
    headline: "IELTS / TOEFL English for Russian Speakers — 2504 Flashcards",
    studyLabel: "IELTS TOEFL English for Russian speakers",
    description:
      "English Anki deck with 2504 flashcards for Russian speakers preparing IELTS, TOEFL, Cambridge, and PTE — Russian glosses, bilingual examples, and native English audio. Independent study aid — not official exam material.",
    keywords: [
      "english for russian speakers anki",
      "ielts vocabulary russian speakers",
      "toefl vocabulary russian speakers",
      "английский для русских anki",
      "ielts toefl flashcards russian",
    ],
    intro:
      "Russian-speaking IELTS and TOEFL candidates use bilingual English vocabulary recall with Russian support before timed exam practice.",
  },

  "ielts-toefl-english-for-spanish-speakers-anki-deck": {
    title: "IELTS / TOEFL English for LatAm Spanish Speakers Anki | 2504 Cards",
    headline: "IELTS / TOEFL English for Spanish Speakers (LatAm) — 2504 Flashcards",
    studyLabel: "IELTS TOEFL English for Spanish speakers LatAm",
    description:
      "Free-preview path to 2504 English Anki cards for Latin American Spanish speakers: LatAm glosses, bilingual examples, native English audio — built for IELTS/TOEFL/Cambridge/PTE vocabulary, not tourist phrases or DELE Spanish. Independent study aid.",
    keywords: [
      "english for spanish speakers anki",
      "ielts vocabulary spanish speakers",
      "toefl vocabulary latam spanish",
      "english for latin american spanish speakers",
      "ielts toefl flashcards spanish",
    ],
    intro:
      "Latin American Spanish-speaking IELTS and TOEFL candidates use bilingual English vocabulary recall with LatAm Spanish support before timed exam practice — distinct from Spain-Castilian or DELE decks.",
  },

  "rd-exam-anki-deck": {
    title: "RD Exam Anki Deck 2026 | 120 CDR Flashcards + Free Mock",
    headline: "RD / RDN Exam Prep — 120 CDR Domain Flashcards",
    studyLabel: "RD exam Anki flashcards",
    description:
      "RDN Anki deck: 120 cards across CDR Principles, Nutrition Care, Management, and Foodservice — with explanations and a free 120-question RD readiness check. Ownable .apkg for dietetic candidates after ACEND practice. Independent — not CDR material.",
    keywords: [
      "rd exam anki",
      "rdn flashcards",
      "dietitian registration anki",
      "cdr exam flashcards",
      "rd exam practice",
    ],
    intro:
      "Dietetic candidates use CDR-domain Anki after a free timed RD readiness check to repair weak nutrition-care and foodservice rows before Pearson VUE.",
  },

  "enrolled-agent-anki-deck": {
    title: "IRS Enrolled Agent Anki Deck | 120 SEE Flashcards + Free Mock",
    headline: "IRS Enrolled Agent (SEE) Prep — 120 Flashcards",
    studyLabel: "Enrolled Agent Anki flashcards",
    description:
      "Enrolled Agent Anki: 120 cards for IRS SEE themes — Individuals, Businesses, Representation, Practices — plus a free 120-question EA readiness check with topic scoring. Ownable .apkg before Prometric. Independent — not IRS material.",
    keywords: [
      "enrolled agent anki",
      "ea exam flashcards",
      "irs see anki deck",
      "enrolled agent study cards",
      "see practice flashcards",
    ],
    intro:
      "EA candidates drill SEE domain cards after a free timed readiness check so Representation and Practices get equal weight to Individuals.",
  },

  "luxembourg-vivre-ensemble-anki-deck": {
    title: "Luxembourg Vivre ensemble Anki | 120 French Civics Cards + Mock",
    headline: "Luxembourg Vivre ensemble Civics — 120 French Flashcards",
    studyLabel: "Luxembourg Vivre ensemble Anki",
    description:
      "Luxembourg nationality civics Anki: 120 French MCQ cards on institutions, rights, history/EU, and daily life — plus a free 60-question Vivre ensemble readiness check. Not Sproochentest language drills. Independent — not Guichet.lu material.",
    keywords: [
      "luxembourg vivre ensemble anki",
      "luxembourg citizenship flashcards",
      "nationalite luxembourg anki",
      "vivre ensemble practice cards",
    ],
    intro:
      "Applicants preparing Vivre ensemble / nationality civics use French MCQ Anki after a free timed diagnostic — Sproochentest stays on a separate language track.",
  },

  "ielts-toefl-english-for-portuguese-speakers-anki-deck": {
    title: "IELTS / TOEFL English for Portuguese Speakers Anki | 2504 Cards",
    headline: "IELTS / TOEFL English for Portuguese Speakers (BR) — 2504 Flashcards",
    studyLabel: "IELTS TOEFL English for Brazilian Portuguese speakers",
    description:
      "English Anki deck with 2504 flashcards for Brazilian Portuguese speakers preparing IELTS, TOEFL, Cambridge, and PTE — PT-BR glosses, bilingual examples, and native English audio. Independent study aid — not official exam material.",
    keywords: [
      "english for portuguese speakers anki",
      "english for brazilian portuguese speakers",
      "ielts vocabulary portuguese speakers",
      "toefl vocabulary brazilian portuguese",
      "ielts toefl flashcards portuguese",
    ],
    intro:
      "Brazilian Portuguese-speaking IELTS and TOEFL candidates use bilingual English vocabulary recall with PT-BR support before timed exam practice.",
  },

  "delf-prim-printable-french-flashcards": {
    title: "DELF Prim Printable French Flashcards | Ages 7–12 · 360 Cards",
    headline: "DELF Prim Printable French — Ages 7–12 · 360 PDF Cards",
    studyLabel: "DELF Prim kids printable French flashcards",
    description:
      "Printable DELF Prim French flashcards for ages 7–12: 360 cards with images, examples, cut lines, and QR audio across two A4 PDFs. Independent study aid — not official France Éducation international material.",
    keywords: [
      "delf prim flashcards",
      "delf prim ages 7-12",
      "printable french flashcards kids",
      "delf prim pdf",
      "french vocabulary cards qr audio",
    ],
    intro:
      "Parents and teachers print DELF Prim vocabulary cards for ages 7–12, cut them out, and use QR audio for pronunciation practice.",
  },
  "citizenship-naturalization-anki-bundle": {
    title: "US Citizenship Civics Anki Deck Bundle | 100 Questions + 5 Countries",
    headline: "U.S. Citizenship Civics Anki — Plus 5 More Countries · 1,225 Cards",
    studyLabel: "US citizenship civics Anki flashcards",
    description:
      "Drill USCIS 100 civics questions with Anki spaced repetition — plus Germany, France, UK, Canada, and Australia in the same $20 download (six .apkg decks, 1,225 cards). Start with the free U.S. citizenship practice test, then buy only when you know your gaps. Independent study aid — not USCIS material.",
    keywords: [
      "us citizenship anki deck",
      "uscis civics flashcards",
      "naturalization anki",
      "citizenship test anki 2026",
      "leben in deutschland anki",
      "life in the uk anki",
      "canadian citizenship test anki",
    ],
    intro:
      "U.S. applicants: take the free citizenship readiness check, then lock the 100 civics questions with Anki. Same $20 bundle also includes DE/FR/UK/CA/AU decks if you need another country later.",
  },
  "dele-a2-spanish-anki-deck": {
    title: "DELE SIELE Spanish Anki Deck | 1500 Flashcards",
    headline: "DELE SIELE Spanish Exam Prep — 1500 Flashcards",
    studyLabel: "DELE SIELE Spanish exam prep",
    description:
      "Spanish Anki deck with 1500 A2 vocabulary flashcards for DELE A2 and SIELE A2-style word knowledge. Single .apkg — language only, not a CCSE civics bundle. Independent study aid — not Instituto Cervantes or SIELE material.",
    keywords: [
      "dele a2 anki",
      "siele a2 vocabulary",
      "dele spanish flashcards",
      "spanish a2 anki deck",
      "dele vocabulary anki",
    ],
    intro:
      "DELE A2 learners drill high-frequency Spanish vocabulary on a daily Anki schedule — language recall only, without CCSE civics.",
  },
  "dele-a2-ccse-spanish-citizenship-bundle": {
    title: "DELE CCSE Spanish Nationality Anki | 60 Cards + Free Mock",
    headline: "DELE + CCSE Compact Anki — 60 Cards + Free CCSE Mock",
    studyLabel: "DELE CCSE Spanish nationality exam prep",
    description:
      "Live $26 compact DELE A2 + CCSE Anki (60 MCQ cards) plus a free 60-question CCSE timed diagnostic. Official Cervantes CCSE is 25Q / 45 min / 60%. Companion only — for thicker DELE vocab use the 1500-card DELE SIELE deck. Not Instituto Cervantes material.",
    keywords: [
      "dele a2 anki",
      "ccse anki deck",
      "nacionalidad espanola flashcards",
      "spanish citizenship anki",
      "dele ccse bundle",
    ],
    intro:
      "A compact 60-card DELE-adjacent + CCSE civics .apkg for nationality applicants who want a light language-and-civics drill — not a full Cervantes substitute. Official CCSE is 25 questions / 45 minutes / 60%. Take the free 60-question CCSE readiness check first; use the standalone 1500-card DELE SIELE deck when you need thicker vocabulary.",
  },
  "swiss-citizenship-anki-deck": {
    title: "Swiss Citizenship Anki Bundle | DE FR IT · 618 Cards",
    headline: "Swiss Citizenship Anki Bundle — DE / FR / IT · 618 Cards",
    studyLabel: "Swiss citizenship Staatskunde exam prep",
    description:
      "Swiss citizenship Anki bundle: 618 federal Staatskunde flashcards in three .apkg decks (German, French, Italian). Free DE / FR / IT readiness checks funnel into this $12 Gumroad download. Independent study aid — not SEM material.",
    keywords: [
      "swiss citizenship anki",
      "einbürgerung anki",
      "staatskunde flashcards",
      "naturalisation suisse anki",
      "naturalizzazione svizzera anki",
    ],
    intro:
      "Take a free DE / FR / IT readiness check first, then drill weak federal civics topics with this three-language Swiss Anki bundle.",
  },
  "czech-citizenship-anki-deck": {
    title: "Czech Citizenship Anki Deck | Zkouška z Reálií",
    headline: "Czech Reálie Prep — Planned Anki Deck",
    studyLabel: "Czech zkouška z reálií prep",
    description:
      "Planned Anki for Czech citizenship reálie. Official exam is 30Q/30min/60% (NPI pool); free UniPrep2Go check is a longer diagnostic. Waitlist — not MV ČR material. Permanent residence usually needs language, not this deck.",
    keywords: [
      "czech citizenship anki",
      "občanství anki",
      "české reálie flashcards",
      "zkouska z realii anki",
      "czech naturalisation deck",
    ],
    intro:
      "Planned reálie Anki. Drill the free 60-question diagnostic + official NPI model test; join the waitlist until the .apkg ships.",
  },
  "polish-citizenship-anki-deck": {
    title: "Polish Citizenship Anki Deck | Proposed Wiedza o Polsce",
    headline: "Polish Citizenship Civics — Planned Anki Deck",
    studyLabel: "Proposed Polish civics / PaF-adjacent prep",
    description:
      "Planned Anki deck for proposed Polish knowledge-of-Poland themes. No official citizenship civics exam is required today (PaF B1 is the live hurdle). Free readiness check + waitlist. Independent — not government material.",
    keywords: [
      "polish citizenship anki",
      "obywatelstwo anki",
      "wiedza o polsce flashcards",
      "test obywatelski anki",
      "polish naturalisation deck",
    ],
    intro:
      "Planned civics Anki for a proposed test obywatelski path. Poland has no official citizenship knowledge MCQ yet — drill the free readiness check and join the waitlist until the .apkg ships.",
  },

  "delf-b2-french-anki-deck": {
    title: "DELF DALF TCF TEF French Anki Deck | 2000+ Flashcards",
    headline: "DELF DALF TCF TEF French Exam Prep — 2000+ Flashcards",
    studyLabel: "DELF DALF TCF TEF French exam prep",
    description:
      "French Anki deck with 2000+ flashcards for DELF, DALF, TCF Canada, TEF Canada, TCF ANF, and TCF général — plus shared lexicon for fide / Swiss residency French. Native audio and examples. Independent study aid — not official France Éducation international, IRCC, or fide / SEM material.",
    keywords: [
      "delf anki deck",
      "dalf anki deck",
      "tcf canada anki",
      "tef canada anki",
      "tcf anf flashcards",
      "tcf general french anki",
      "delf dalf vocabulary",
      "french immigration vocabulary anki",
      "fide french anki",
      "swiss residency french vocabulary",
      "tef canada quebec anki",
    ],
    intro:
      "Candidates preparing DELF / DALF diplomas, TCF Canada or TEF Canada for Canadian immigration, TCF ANF for French naturalization, TCF général for French universities, or high-frequency French for fide / Swiss residency language prep use one shared vocabulary bank — then practice each exam's format separately. For Swiss civics, use the Swiss Citizenship Anki Bundle.",
    audience:
      "DELF / DALF diploma candidates, Canada immigration applicants (TCF Canada / TEF Canada), French naturalization (TCF ANF), French university applicants (TCF général), and fide / Swiss residency French language learners.",
  },
  "cfa-level-1-anki-deck": {
    title: "Best CFA Level 1 Anki Deck 2026 | 342 Cards + Free Mock",
    headline: "CFA Level 1 Exam Prep — 342+ Flashcards + Free Mock",
    studyLabel: "CFA Level 1 exam prep",
    description:
      "Best independent CFA Level 1 Anki deck for 2026: focused 342+ cards across all 10 topic weights, free 60-question timed mock with topic scoring, and printable formula PDF companion — not a 1,600-card dump. Not CFA Institute material.",
    keywords: [
      "best cfa level 1 anki deck",
      "cfa level 1 anki deck",
      "cfa level 1 flashcards",
      "cfa level 1 practice test",
      "cfa formula flashcards",
      "cfa level 1 mock exam",
    ],
    intro:
      "US and global CFA Level 1 candidates use a focused spaced-repetition deck (not a mega-dump) to retain formulas across all 10 topics — pair with the free timed mock and the matching formula sheet PDF for printable tables and an 80-question recall drill.",
  },
  "cfa-level-2-anki-deck": {
    title: "CFA L2 Flashcards 2026 | 495 Cards + Free Mock",
    headline: "CFA Level 2 Exam Prep — 495 Flashcards + Free Mock",
    studyLabel: "CFA Level 2 exam prep",
    description:
      "CFA Level 2 exam prep with 495 Anki flashcards across all 10 topic areas — vignette-depth FSA, equity and fixed income valuation, portfolio management, derivatives, and ethics application. Includes a free 60-question readiness check. Independent study aid — not CFA Institute material.",
    keywords: [
      "cfa level 2 anki deck",
      "cfa level 2 flashcards",
      "cfa level 2 practice test",
      "cfa level 2 item set prep",
      "cfa level 2 mock exam",
    ],
    intro:
      "CFA Level 2 candidates use spaced-repetition flashcards to retain vignette-depth formulas and application logic across all ten equally weighted curriculum topics — run the free readiness check before item-set practice blocks.",
  },
  "cfa-level-2-formula-reference-2026": {
    title: "CFA L2 Formula Reference 2026 | 219 Formulas + Drill",
    headline: "CFA Level 2 Formula Reference — 219 Formulas + 80 Recall Drill",
    studyLabel: "CFA Level 2 exam prep",
    description:
      "CFA Level 2 formula quick reference PDF: 219 typeset formulas and 276 examiner-style definitions across 10 topic areas, 80-question recall drill with explanations, 60 print-ready pages. Pairs with 495-card Anki deck. Recall companion — not CFA Institute curriculum.",
    keywords: [
      "cfa level 2 formula sheet",
      "cfa level 2 formula reference",
      "cfa level 2 recall drill",
      "cfa level 2 quick reference pdf",
      "cfa level 2 formulas",
    ],
    intro:
      "Candidates who need sub-three-second formula retrieval under item-set timing print this reference for typeset formula tables and an 80-question recall drill — then drill weak topics in the companion Anki deck.",
  },
  "cfa-level-1-formula-reference-2026": {
    title: "Best CFA L1 Formula Sheet 2026 | 250 Formulas + Drill",
    headline: "Best CFA Level 1 Formula Sheet PDF 2026 — 250 Formulas + 80Q Drill",
    studyLabel: "CFA Level 1 exam prep",
    description:
      "Best CFA Level 1 formula sheet PDF for 2026: 250 typeset formulas, 98 definitions, 80-question recall drill, 54 print pages — not a free one-page cheat sheet. Pairs with 342+ Anki ($29) and free 60Q mock. Not CFA Institute curriculum.",
    keywords: [
      "best cfa level 1 formula sheet",
      "cfa level 1 formula sheet pdf",
      "cfa level 1 formula reference",
      "cfa formula cheat sheet",
      "cfa level 1 recall drill",
    ],
    intro:
      "Free one-page cheat sheets skip the recall drill. This 54-page reference forces sub-three-second formula retrieval across all 10 topics — then the free 60-question mock and companion Anki close the gaps.",
  },
  "frm-part-1-anki-deck": {
    title: "Best FRM Part 1 Anki Deck | 444 Cards + Free Mock",
    headline: "Best FRM Part 1 Anki — 444 Cards + Free Timed Mock",
    studyLabel: "FRM Part 1 exam prep",
    description:
      "Best independent FRM Part 1 Anki for 2026: ownable 444-card .apkg (VaR, ES, Greeks, credit) plus free 50-question timed mock — cheaper than monthly AnalystPrep/Bionic Turtle when you want spaced repetition + one diagnostic. Not GARP material.",
    keywords: [
      "best frm part 1 anki deck",
      "frm part 1 anki deck",
      "frm part 1 flashcards",
      "frm part 1 practice test",
      "garp frm prep",
      "frm formula deck",
    ],
    intro:
      "Monthly FRM Q-bank subscriptions help for volume practice. If you want an ownable Anki .apkg plus a free timed diagnostic before you pay for more mocks, start here — then drill only the weak Part 1 pillars.",
  },
  "sie-exam-anki-deck": {
    title: "SIE Anki Deck 2026 | 300 Cards + Free 75Q Mock",
    headline: "SIE Exam Prep — 300 Flashcards + Free 75Q Mock",
    studyLabel: "FINRA SIE exam prep",
    description:
      "SIE exam prep: 300 Anki flashcards + free 75-question timed mock (or 25Q diagnostic). Topic-weighted to FINRA blueprint. Ownable .apkg — independent study aid, not official FINRA material.",
    keywords: [
      "sie exam prep",
      "sie exam study guide free",
      "finra sie flashcards",
      "free sie practice test",
      "sie anki deck",
    ],
    intro:
      "Americans entering brokerage and securities roles start with the SIE — this deck covers FINRA topic weights for daily recall. Use the free 25-question diagnostic for a fast gap check, or the full 75-question / 105-minute mock before exam day.",
  },
  "series-7-anki-deck": {
    title: "Series 7 Anki 2026 | 300 Cards + Free Practice Test",
    headline: "Series 7 Exam Prep — 300 Flashcards + Free 60Q Test",
    studyLabel: "Series 7 exam prep",
    description:
      "Series 7 Top-Off prep: 300 flashcards for suitability, options, products, and FINRA job functions — plus a free 60-question Series 7 practice test online (no signup). For US registered rep candidates.",
    keywords: [
      "series 7 exam prep",
      "series 7 flashcards",
      "series 7 practice test",
      "finra series 7 anki",
      "series 7 top off study guide",
    ],
    intro:
      "US Series 7 candidates drill suitability, investment products, and order-flow rules on their phone between full-length Q-banks — then use the free readiness check for a timed baseline.",
  },
  "series-63-anki-deck": {
    title: "Series 63 Anki 2026 | 250 Cards + Free Practice Test",
    headline: "Series 63 Exam Prep — 250 Flashcards + Free 60Q Test",
    studyLabel: "Series 63 exam prep",
    description:
      "Series 63 state law prep: 250 Anki flashcards for NASAA topics — agent registration, ethics, communications, adviser basics — plus a free 60-question practice test online (no signup).",
    keywords: [
      "series 63 exam prep",
      "series 63 flashcards",
      "series 63 practice test",
      "nasaa series 63",
      "uniform securities act study guide",
    ],
    intro:
      "After passing the SIE and Series 7, US reps use this deck for NASAA state-law recall — registration, ethics, and adviser rules that repeat on the Series 63.",
  },
  "servsafe-manager-anki-deck": {
    title: "ServSafe Manager Prep | 300 Cards + Free Mock",
    headline: "ServSafe Manager Practice Test Free — 300 Cards + 90 Questions",
    studyLabel: "ServSafe Manager exam prep",
    description:
      "ServSafe Manager / CFPM exam prep with 300 food safety flashcards — time and temperature, HACCP, hygiene, contamination — plus a free 90-question ServSafe practice test online. For US restaurant managers and kitchen supervisors.",
    keywords: [
      "servsafe manager exam prep",
      "servsafe manager practice test",
      "certified food protection manager",
      "servsafe flashcards",
      "food safety manager study guide",
    ],
    intro:
      "American restaurant managers preparing for the ServSafe Manager certification review food safety rules on Anki during breaks, then take the free 90-question mock before scheduling the proctored exam.",
  },
  "ptcb-pharmacy-technician-anki-deck": {
    title: "PTCB Prep 2026 | 300 PTCE Cards + Free Mock",
    headline: "PTCB Pharmacy Technician Exam Prep — 300 PTCE Flashcards + Free Mock",
    studyLabel: "PTCB / PTCE exam prep",
    description:
      "300 Anki flashcards for the January 2026 PTCE: top 200 brand/generic drugs, sig abbreviations, days-supply math, DEA schedules, DSCSA, and federal law. Pairs with UniPrep2Go’s free 90-question timed mock (separate page) and the optional 2026 printable study guide. Independent — not official PTCB material.",
    keywords: [
      "ptcb exam prep",
      "ptcb anki deck",
      "ptce flashcards",
      "pharmacy technician anki",
      "ptcb brand generic flashcards",
    ],
    intro:
      "US pharmacy technician candidates take the free 90-question PTCB mock first, then drill weak domains with daily brand/generic and sig-code flashcards. Pair with the 2026 printable study guide for domain chapters and an additional 80-question PDF practice exam.",
  },
  "ptcb-study-guide-2026": {
    title: "PTCB Study Guide 2026 | PDF + 80Q Exam + Free Mock",
    headline: "PTCB Study Guide 2026 — Printable PTCE Review + Practice Test",
    studyLabel: "PTCB / PTCE exam prep",
    description:
      "Independent PTCB study guide for the January 2026 PTCE: 30-page PDF with DSCSA-weighted Federal Requirements, 80-question practice exam, and drug/sig/math cheat sheets. Pairs with UniPrep2Go’s free 90-question timed online mock and a separate 300-card Anki deck (sold separately) — not a free blog still teaching removed compounding topics.",
    keywords: [
      "best ptcb study guide 2026",
      "ptcb study guide 2026",
      "ptce practice exam pdf",
      "pharmacy technician study guide pdf",
      "ptcb cheat sheet",
      "ptce 2026 blueprint",
    ],
    intro:
      "Printable 2026 blueprint chapters beat outdated free guides: Federal Requirements at 18.75% with DSCSA and an 80-question PDF exam. Use the free 90-question online mock for timed scoring, then the companion Anki deck (separate purchase) for weak-domain drills.",
  },
  "california-real-estate-exam-anki-deck": {
    title: "Best CA Real Estate Anki | 400 Cards + Free CA Mock",
    headline: "Best California Real Estate Anki — 400 DRE Cards + Free Mock",
    studyLabel: "California real estate exam prep",
    description:
      "Best California DRE salesperson Anki: 400 CA-only cards (agency, disclosures, contracts, math) + free 60-question CA practice test. Beats national Quizlet/Aceable packs with a California sticker. Not official DRE material.",
    keywords: [
      "best california real estate anki deck",
      "california real estate anki deck",
      "california real estate exam prep",
      "ca real estate practice test",
      "california salesperson exam flashcards",
      "dre exam study guide",
    ],
    intro:
      "National real estate Anki packs miss California disclosure timelines and DRE agency traps. Four hundred state-specific cards plus a free 60-question CA mock beat a Quizlet national dump before you buy a full Aceable-style course.",
  },
  "life-and-health-insurance-exam-anki-deck": {
    title: "Life & Health Insurance Prep | 400 Cards + Mock",
    headline: "Life & Health Insurance Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "Life & Health insurance exam prep",
    description:
      "Life and Health insurance license exam prep with 400 flashcards for policy types, annuities, Medicare basics, and producer responsibilities — plus a free 60-question insurance practice test for US licensing candidates.",
    keywords: [
      "life and health insurance practice test",
      "insurance license exam prep",
      "life health insurance flashcards",
      "insurance producer exam",
      "state insurance exam study guide",
    ],
    intro:
      "Americans studying for state Life & Health producer licensing use Anki for policy provisions, annuities, and cost-sharing concepts — then validate with the free timed practice test.",
  },
  "property-casualty-insurance-exam-anki-deck": {
    title: "P&C Insurance Prep | 400 Cards + Free Practice Test",
    headline: "Property & Casualty Insurance Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "Property & Casualty insurance exam prep",
    description:
      "Property and Casualty insurance license exam prep with 400 flashcards for homeowners, auto, commercial lines, and workers comp — plus a free 60-question P&C insurance practice test.",
    keywords: [
      "property casualty insurance practice test",
      "p&c insurance exam prep",
      "insurance license flashcards",
      "homeowners insurance exam questions",
      "casualty insurance study guide",
    ],
    intro:
      "US P&C licensing candidates drill policy structures, exclusions, and commercial lines on Anki, then use the free readiness check before state exam registration.",
  },
  "servsafe-manager-complete-study-guide": {
    title: "ServSafe Manager Study Guide | PDF + 70 Questions",
    headline: "ServSafe Manager Exam Prep — Printable Study Guide + 70 Questions",
    studyLabel: "ServSafe Manager exam prep",
    description:
      "ServSafe Manager printable PDF study guide: 40 pages, 70 practice questions with rationales, 2-page cram sheet, and 7-day study plan. Pairs with the 300-card Anki deck and free 90-question mock.",
    keywords: [
      "servsafe manager study guide pdf",
      "servsafe manager practice questions",
      "food manager exam cram sheet",
      "servsafe pdf download",
    ],
    intro:
      "Managers who prefer printable study material use this PDF for domain review and 70 exam-style questions — then drill weak topics in the companion Anki deck or free online mock.",
  },
  "cat4-level-d-anki-deck-printable-pdf": {
    title: "CAT4 Level D Exam Prep | 200 Cards + Printable PDF",
    headline: "CAT4 Level D Exam Prep — Anki Deck + Printable PDF",
    studyLabel: "CAT4 Level D exam prep",
    description:
      "CAT4 Level D bundle with 200 Anki flashcards and a 49-page printable PDF for Verbal Classification, Verbal Analogies, Number Analogies, and Number Series. Built for Year 7 / Grade 7 selective entry. Independent prep — not official GL Assessment material.",
    keywords: [
      "cat4 level d prep",
      "cat4 anki deck",
      "cat4 printable pdf",
      "grade 7 cat4 practice",
      "year 7 selective entry prep",
      "verbal classification cat4",
      "number series cat4",
    ],
  },
  "gmat-focus-anki-deck": {
    title: "GMAT Focus Exam Prep | 400 Cards + Free Mock",
    headline: "GMAT Focus Exam Prep — 400 Flashcards + Free Mock",
    studyLabel: "GMAT Focus exam prep",
    description:
      "GMAT Focus exam prep with 400 Anki flashcards for Quant, Verbal, and Data Insights — plus a free 45-question timed readiness check with section scoring. Independent MBA prep — not GMAC material.",
    keywords: [
      "gmat focus anki deck",
      "gmat focus flashcards",
      "gmat focus practice test",
      "gmat prep course alternative",
      "mba admissions test prep",
      "gmat diagnostic test",
    ],
    intro:
      "MBA applicants drill high-yield GMAT Focus question types on Anki, then validate weak sections with the free timed readiness check before official GMAC prep or tutoring.",
    audience:
      "MBA and business master's applicants using spaced repetition alongside official GMAC materials.",
  },
  "sat-anki-deck": {
    title: "Digital SAT Exam Prep | 342 Cards + Free Mock",
    headline: "Digital SAT Exam Prep — 342 Flashcards + Free Mock",
    studyLabel: "Digital SAT exam prep",
    description:
      "Digital SAT exam prep with 342 Anki flashcards for Reading and Writing and Math — plus a free 49-question timed readiness check scored on both official section axes. Independent college admissions prep — not College Board material.",
    keywords: [
      "digital sat anki deck",
      "sat flashcards",
      "digital sat practice test",
      "sat prep course alternative",
      "sat reading and writing practice",
      "sat math flashcards",
    ],
    intro:
      "Students drill high-yield Digital SAT skills on Anki across both scored sections, then validate Reading and Writing and Math balance with the free timed readiness check before Bluebook practice.",
    audience:
      "High school students and parents using spaced repetition alongside College Board Bluebook practice.",
  },
  "hvac-epa-608-anki-deck": {
    title: "EPA 608 HVAC Prep | 200+ Cards + Free Mock",
  },
  "bms-building-automation-anki-deck": {
    title: "BMS / BAS Exam Prep | 200+ Cards + Free Mock",
  },
  "leed-green-associate-anki-deck": {
    title: "LEED GA Prep | 250+ Cards + Free Mock",
    description:
      "LEED Green Associate exam prep: 250+ flashcards covering v4.1 concepts and process domains. Free 50-question practice test included. Instant download for USGBC credential candidates. Independent prep — not USGBC exam material.",
    keywords: [
      "leed green associate exam prep",
      "leed ga exam prep free",
      "leed green associate flashcards",
      "free leed practice test",
      "leed ga study guide",
    ],
  },
  "leed-ap-bd-c-anki-deck": {
    title: "LEED AP BD+C Prep | 250+ Cards + Free Mock",
  },
  "well-ap-anki-deck": {
    title: "WELL AP Exam Prep | 250+ Cards + Free Mock",
  },
  "cem-anki-deck": {
    title: "CEM Exam Prep | 250+ Cards + Free Mock",
  },
  "ashrae-certifications-anki-deck": {
    title: "ASHRAE Cert Prep | 250+ Cards + Free Mock",
  },
  "cdcp-anki-deck": {
    title: "CDCP Exam Prep | 250+ Cards + Free Mock",
  },
  "nebosh-anki-deck": {
    title: "NEBOSH IGC Prep | 250+ Cards + Free Mock",
  },
  "cfps-anki-deck": {
    title: "CFPS Exam Prep | 400+ Cards + Free Mock",
  },
  "mrics-anki-deck": {
    title: "MRICS APC Prep | 250+ Cards + Free Mock",
  },
  "mrics-quantity-surveying-anki-deck": {
    title: "Best MRICS QS Anki Deck | APC Cards + Free Mock",
    headline: "MRICS Quantity Surveying APC Prep — Anki Cards + Free Mock",
    studyLabel: "MRICS Quantity Surveying APC prep",
    description:
      "Best independent MRICS Quantity Surveying Anki deck for RICS APC: focused cards on NRM measurement, JCT/NEC contracts, cost planning, procurement, and ethics — plus a free 50-question QS readiness check. Ownable .apkg, not a Brainscape subscription dump.",
    keywords: [
      "best mrics qs anki deck",
      "mrics quantity surveying anki",
      "rics qs apc flashcards",
      "quantity surveyor apc prep",
      "nrm measurement anki",
      "free mrics qs practice questions",
    ],
    intro:
      "QS APC candidates need competency recall under interview pressure — use a pathway-specific Anki .apkg with a free timed QS mock for cost planning, measurement, and contracts, not a generic 2,000-card subscription pack.",
  },
  "gre-anki-deck": {
    title: "GRE Exam Prep | 350 Verbal & Quant Cards + Mock",
  },
  "bench-energy-metal-trader-anki-deck": {
    title: "Best Metal Trader Anki | 202 LME Desk Cards",
    headline: "Best Metal Trader Anki — 202 LME & Metals Desk Cards",
    studyLabel: "metals trading desk vocabulary",
    description:
      "Best metals desk Anki: 202 LME flashcards for cash/3M carry, contango/backwardation, base and precious benchmarks — not a 2,000-card CFA dump. For new metals analysts; bundle with oil/coal in the Commodity Trader Pack.",
    keywords: [
      "best metal trader anki deck",
      "lme flashcards",
      "lme anki cards",
      "metals trading flashcards",
      "commodity trading vocabulary",
      "base metals lexicon",
    ],
  },
  "bench-energy-oil-trader-anki-deck": {
    title: "Oil Trader Lexicon | 211 Crude Oil Anki Cards",
  },
  "bench-energy-coal-trader-anki-deck": {
    title: "Coal Trader Lexicon | 221 Thermal Coal Anki Cards",
  },
};

function mergeProfile(
  deck: SeoDeck,
  mock?: MockExamConfig,
): DeckSeoProfile {
  const defaults: DeckSeoProfile = {
    title: defaultTitle(deck, mock),
    description: defaultDescription(deck, mock),
    keywords: defaultKeywords(deck, mock),
    headline: defaultHeadline(deck, mock),
    intro: deck.directAnswer.replace(/\{PRICE\}/g, "See checkout").slice(0, 320),
    audience: deck.audience,
    studyLabel: studyLabelFor(deck),
  };

  const override = deckSeoProfiles[deck.slug];
  if (!override) return defaults;

  return { ...defaults, ...override };
}

export function getDeckSeoProfile(deck: SeoDeck, mock = getLinkedMock(deck.slug)) {
  return mergeProfile(deck, mock);
}

export function buildDeckSeoTitle(deck: SeoDeck) {
  return fitSeoTitle(getDeckSeoProfile(deck).title, SEO_TITLE_MAX);
}

export function buildDeckSeoDescription(deck: SeoDeck) {
  return getDeckSeoProfile(deck).description;
}

export function buildDeckSeoKeywords(deck: SeoDeck) {
  return getDeckSeoProfile(deck).keywords;
}

export function buildDeckSeoHeadline(deck: SeoDeck) {
  return getDeckSeoProfile(deck).headline;
}

export function buildDeckSearchFaqs(deck: SeoDeck) {
  const profile = getDeckSeoProfile(deck);
  const mock = getLinkedMock(deck.slug);
  const pageUrl = absoluteUrl(`/decks/${deck.slug}`);
  const content = contentLabel(deck);

  const faqs = [
    {
      question: `How do I prepare for the ${deck.shortName} exam?`,
      answer: `${profile.intro} Use it for daily active recall${mock ? `, then run the linked free practice test to find weak topics` : ""}.`,
    },
    {
      question: `Are there ${deck.shortName} flashcards?`,
      answer: `Yes. ${siteConfig.name} publishes ${content} for ${deck.shortName} at ${pageUrl} with sample cards, topic coverage, and machine-readable product facts.`,
    },
    {
      question: `Who is this ${deck.shortName} study material for?`,
      answer: profile.audience,
    },
  ];

  if (mock) {
    const mockUrl = absoluteUrl(`/mock-exams/${mock.slug}`);
    faqs.push({
      question: `Is there a free ${deck.shortName} practice test?`,
      answer: `Yes. Take ${buildMockSeoTitle(mock)} at ${mockUrl}. It includes ${mock.questionCount} timed questions, topic scoring, and a remediation plan linked back to this deck.`,
    });
  } else if (deck.slug === "ptcb-study-guide-2026") {
    faqs.push({
      question: "Is there a free PTCB practice test with this guide?",
      answer:
        "Yes. Take the free 90-question PTCB mock at /mock-exams/ptcb-pharmacy-technician-mock for timed domain scoring. The PDF’s 80-question exam and the separate 300-card Anki deck are for remediation — Anki is sold separately.",
    });
  }

  return faqs;
}

export function buildDeckSeoPageCopy(deck: SeoDeck) {
  const profile = getDeckSeoProfile(deck);

  return {
    headline: profile.headline,
    intro: profile.intro,
    audience: profile.audience,
    studyLabel: profile.studyLabel,
    topicSummary: deck.facts.topics,
    category: deck.category as DeckCategory,
  };
}

export function getDeckLinkedMock(slug: string) {
  return getLinkedMock(slug);
}

/** All readiness checks that funnel to this deck (e.g. six citizenship mocks → one bundle). */
export function getDeckLinkedMocks(slug: string) {
  return getLinkedMocks(slug);
}
