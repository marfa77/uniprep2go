export type EditorialSource = {
  label: string;
  url: string;
  checked: string;
};

export type EditorialSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type EditorialFaq = {
  question: string;
  answer: string;
};

/** Official 2027 weight row; match bank topics by id and/or label aliases (2026 or 2027 names). */
export type EditorialWeightRow = {
  topicIds: string[];
  labelAliases: string[];
  session: "1" | "2";
  officialWeight: string;
  /** Shown only when the official weight band changed vs the prior cycle. */
  priorOfficialWeight?: string;
};

export type EditorialWeightTable = {
  heading: string;
  introParagraphs: string[];
  rows: EditorialWeightRow[];
  footnoteParagraphs?: string[];
};

export type MockEditorialBundle = {
  slug: string;
  howToPrepare?: string;
  sections: EditorialSection[];
  faqs: EditorialFaq[];
  sources: EditorialSource[];
  ctaAfterWeights?: string;
  weightTable?: EditorialWeightTable;
  /** When true, the compact exam-facts block hides its domain-weight table (replaced by editorial). */
  replaceExamFactsDomainWeights?: boolean;
  metaDescriptionOverride?: string;
  /** FAQ questions to drop from the default mock FAQ list when editorial adds a merged replacement. */
  dropDefaultFaqQuestions?: string[];
};