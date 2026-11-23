import { getLinkedMockForDeck } from "./anki-deck-launch";
import { getDeckBySlug, getRelatedDecks, type Deck } from "./decks";
import { getDeckPracticeMock } from "./deck-funnel";
import { getMockExamConfig, getAllMockExams } from "./mock-exams/configs";
import { getMocksByVertical } from "./mock-exams/hub-clusters";
import type { MockVerticalId } from "./mock-exams/types";
import { shouldIndexDeck, shouldIndexMockExam } from "./seo";

export type ExamFamilyMember = {
  mock?: string;
  deck?: string;
  anchor: string;
  relation?: string;
};

export type ExamFamily = {
  id: string;
  label: string;
  hubHref: string;
  intro?: string;
  members: ExamFamilyMember[];
};

export type RelatedLink = {
  href: string;
  anchor: string;
  relation?: string;
};

export type FamilyHubLink = {
  href: string;
  anchor: string;
};

const RELATED_MIN = 4;
const RELATED_MAX = 6;

/** Hub paths keyed by exam-family id (existing URLs only). */
const FAMILY_HUB_HREF: Record<string, string> = {
  finra: "/mock-exams/v/licensing",
  "finance-credentials": "/finance-anki-decks",
  admissions: "/mock-exams/v/finance",
  insurance: "/mock-exams/v/licensing",
  "real-estate": "/mock-exams/v/real-estate",
  "project-hr": "/mock-exams/v/building",
  nursing: "/mock-exams/v/nursing",
  pharmacy: "/mock-exams/v/allied-health",
  "phlebotomy-lab": "/mock-exams/v/lab",
  "medical-assisting": "/mock-exams/v/allied-health",
  coding: "/mock-exams/v/health-admin",
  "imaging-resp-surg": "/mock-exams/v/allied-health",
  dental: "/mock-exams/v/dental",
  ems: "/mock-exams/v/ems",
  building: "/mock-exams/v/building",
  "hvac-safety": "/mock-exams/v/building",
  surveying: "/mock-exams/v/building",
  fitness: "/mock-exams/v/fitness",
  trades: "/mock-exams/v/trades",
  cdl: "/mock-exams/v/transport",
  food: "/mock-exams/v/licensing",
  "beauty-bodywork": "/mock-exams/v/beauty",
  "social-education": "/mock-exams/v/education",
  "security-legal": "/mock-exams/v/licensing",
  "state-re-decks": "/mock-exams/v/real-estate",
  commodity: "/finance-anki-decks",
  veterinary: "/mock-exams/v/veterinary",
  citizenship: "/mock-exams/v/citizenship",
};

const ANCHOR_OVERRIDES: Record<string, string> = {
  "sie-full-mock": "FINRA SIE full practice test",
  "sie-exam-anki-deck": "FINRA SIE Anki deck",
  "sie-quick-diagnostic": "FINRA SIE quick diagnostic (25 questions)",
  "series-63-readiness-check": "Series 63 practice test (NASAA Uniform Securities Agent)",
  "series-63-anki-deck": "Series 63 Anki deck (NASAA state law)",
  "series-7-readiness-check": "Series 7 practice test (General Securities Representative)",
  "series-7-anki-deck": "Series 7 Anki deck",
  "cfa-level-1-readiness-check": "CFA Level I practice test",
  "cfa-level-1-anki-deck": "CFA Level I Anki deck",
  "nclex-rn-readiness-check": "NCLEX-RN practice test (NCSBN)",
  "leed-green-associate-readiness-check": "LEED Green Associate practice test",
  "leed-green-associate-anki-deck": "LEED Green Associate Anki deck",
};

function defaultAnchorForMock(slug: string): string {
  const config = getMockExamConfig(slug);
  if (!config) {
    return slug;
  }
  return `${config.shortTitle} practice test`;
}

function defaultAnchorForDeck(slug: string): string {
  const deck = getDeckBySlug(slug);
  if (!deck) {
    return slug;
  }
  const base = deck.shortName || deck.title;
  if (deck.format === "PDF" || /guide|pack|formula|printable/i.test(slug)) {
    return base;
  }
  return `${base} Anki deck`;
}

function member(
  entry: { mock?: string; deck?: string; relation?: string },
  anchor?: string,
): ExamFamilyMember {
  const slug = entry.mock ?? entry.deck!;
  const resolvedAnchor =
    anchor ??
    ANCHOR_OVERRIDES[slug] ??
    (entry.mock ? defaultAnchorForMock(entry.mock) : defaultAnchorForDeck(entry.deck!));
  return { ...entry, anchor: resolvedAnchor };
}

const mm = (mock: string, anchor?: string, relation?: string) =>
  member({ mock, relation }, anchor);
const dd = (deck: string, anchor?: string, relation?: string) =>
  member({ deck, relation }, anchor);
const md = (mock: string, deck: string, mockAnchor?: string, deckAnchor?: string) => [
  mm(mock, mockAnchor),
  dd(deck, deckAnchor),
];

const CITIZENSHIP_PATHS: Array<[string, string]> = [
  ["us-citizenship-readiness-check", "us-citizenship-anki-deck"],
  ["canadian-citizenship-readiness-check", "canadian-citizenship-anki-deck"],
  ["life-in-the-uk-readiness-check", "life-in-the-uk-anki-deck"],
  ["australian-citizenship-readiness-check", "australian-citizenship-anki-deck"],
  ["leben-in-deutschland-readiness-check", "leben-in-deutschland-anki-deck"],
  ["naturalisation-francaise-readiness-check", "naturalisation-francaise-anki-deck"],
  ["ccse-espana-readiness-check", "ccse-espana-anki-deck"],
  ["portugal-nacionalidade-readiness-check", "portugal-nacionalidade-anki-deck"],
  ["swiss-citizenship-readiness-check", "einburgerung-schweiz-anki-deck"],
  ["naturalisation-suisse-readiness-check", "naturalisation-suisse-anki-deck"],
  ["naturalizzazione-svizzera-readiness-check", "naturalizzazione-svizzera-anki-deck"],
  ["czech-citizenship-readiness-check", "czech-citizenship-anki-deck"],
  ["polish-citizenship-readiness-check", "polish-citizenship-anki-deck"],
  ["denmark-indfoedsretsproeven-readiness-check", "denmark-indfoedsretsproeven-anki-deck"],
  ["norway-statsborgerproven-readiness-check", "norway-statsborgerproven-anki-deck"],
  ["sweden-medborgarskapsprov-readiness-check", "sweden-medborgarskapsprov-anki-deck"],
  ["belgium-flanders-mo-readiness-check", "belgium-flanders-mo-anki-deck"],
  ["belgium-wallonie-citoyennete-readiness-check", "belgium-wallonie-citoyennete-anki-deck"],
  ["luxembourg-vivre-ensemble-readiness-check", "luxembourg-vivre-ensemble-anki-deck"],
  ["finland-kansalaisuuskoe-readiness-check", "finland-kansalaisuuskoe-anki-deck"],
];

const STATE_RE_DECK_SLUGS = [
  "az-real-estate-anki-deck",
  "ga-real-estate-anki-deck",
  "il-real-estate-anki-deck",
  "oh-real-estate-anki-deck",
  "pa-real-estate-anki-deck",
  "nc-real-estate-anki-deck",
  "va-real-estate-anki-deck",
  "wa-real-estate-anki-deck",
  "co-real-estate-anki-deck",
  "nj-real-estate-anki-deck",
  "ma-real-estate-anki-deck",
  "mi-real-estate-anki-deck",
  "al-real-estate-anki-deck",
  "ak-real-estate-anki-deck",
  "ar-real-estate-anki-deck",
] as const;

function defineFamily(
  id: string,
  label: string,
  members: ExamFamilyMember[],
  intro?: string,
): ExamFamily {
  return {
    id,
    label,
    hubHref: FAMILY_HUB_HREF[id],
    intro,
    members,
  };
}

export const EXAM_FAMILIES: ExamFamily[] = [
  defineFamily("finra", "FINRA & NASAA securities licensing", [
    mm("sie-full-mock"),
    dd("sie-exam-anki-deck"),
    mm("sie-quick-diagnostic"),
    mm("series-6-readiness-check"),
    dd("series-6-anki-deck"),
    mm("series-7-readiness-check"),
    dd("series-7-anki-deck"),
    mm("series-63-readiness-check"),
    dd("series-63-anki-deck"),
    mm("series-65-readiness-check"),
    dd("series-65-anki-deck"),
    mm("series-66-readiness-check"),
    dd("series-66-anki-deck"),
    mm("series-79-readiness-check"),
    dd("series-79-anki-deck"),
    mm("series-99-readiness-check"),
    dd("series-99-anki-deck"),
  ]),
  defineFamily("finance-credentials", "Finance & tax credentials", [
    mm("cfa-level-1-readiness-check"),
    dd("cfa-level-1-anki-deck"),
    mm("cfa-level-2-readiness-check"),
    dd("cfa-level-2-anki-deck"),
    mm("frm-part-1-readiness-check"),
    dd("frm-part-1-anki-deck"),
    mm("cfp-certification-readiness-check"),
    dd("cfp-certification-anki-deck"),
    mm("enrolled-agent-readiness-check"),
    dd("enrolled-agent-anki-deck"),
    dd("cfa-level-1-formula-reference-2026", "CFA Level I formula reference sheet (PDF)"),
    dd("cfa-level-1-pass-pack", "CFA Level I pass pack (printable)"),
    dd("cfa-level-2-formula-reference-2026", "CFA Level II formula reference sheet (PDF)"),
  ]),
  defineFamily("admissions", "Graduate & college admissions tests", [
    mm("gmat-focus-readiness-check"),
    dd("gmat-focus-anki-deck"),
    mm("gre-readiness-check"),
    dd("gre-anki-deck"),
    mm("sat-readiness-check"),
    dd("sat-anki-deck"),
    dd("ib-biology-sl-anki-deck", "IB Biology SL printable Anki deck"),
    dd("cat4-level-d-anki-deck-printable-pdf", "CAT4 Level D printable flashcards (PDF)"),
    dd("portuguese-survival-anki-deck", "Portuguese survival phrase deck"),
    dd("delf-prim-printable-french-flashcards", "DELF Prim printable French flashcards"),
  ]),
  defineFamily("insurance", "Insurance producer licensing", [
    mm("life-and-health-insurance-readiness-check"),
    dd("life-and-health-insurance-exam-anki-deck"),
    mm("property-casualty-insurance-readiness-check"),
    dd("property-casualty-insurance-exam-anki-deck"),
    mm("medicare-counseling-readiness-check"),
  ]),
  defineFamily("real-estate", "Real estate salesperson & MLO licensing", [
    mm("california-real-estate-readiness-check"),
    dd("california-real-estate-exam-anki-deck"),
    mm("fl-real-estate-readiness-check"),
    dd("fl-real-estate-anki-deck"),
    mm("tx-real-estate-readiness-check"),
    dd("tx-real-estate-anki-deck"),
    mm("ny-real-estate-readiness-check"),
    dd("ny-real-estate-anki-deck"),
    mm("real-estate-appraiser-readiness-check"),
    dd("real-estate-appraiser-anki-deck"),
    mm("mortgage-loan-originator-readiness-check"),
    dd("mortgage-loan-originator-anki-deck"),
  ]),
  defineFamily("project-hr", "Project management & HR credentials", [
    mm("pmp-readiness-check"),
    dd("pmp-anki-deck"),
    mm("capm-readiness-check"),
    mm("six-sigma-green-belt-readiness-check"),
    dd("six-sigma-green-belt-anki-deck"),
    mm("shrm-cp-readiness-check"),
    mm("shrm-scp-readiness-check"),
    mm("phr-hrci-readiness-check"),
  ]),
  defineFamily("nursing", "Nursing & nurse aide pathways", [
    mm("nclex-rn-readiness-check"),
    mm("nclex-pn-readiness-check"),
    mm("nnaap-cna-readiness-check"),
    mm("medication-aide-readiness-check"),
    mm("home-health-aide-readiness-check"),
  ]),
  defineFamily("pharmacy", "Pharmacy technician certification", [
    mm("ptcb-pharmacy-technician-mock"),
    dd("ptcb-pharmacy-technician-anki-deck"),
    mm("pharmacy-technician-excpt-readiness-check"),
    dd("ptcb-study-guide-2026", "PTCB study guide (printable PDF)"),
    dd("ptcb-2026-pass-pack", "PTCB 2026 pass pack"),
  ]),
  defineFamily("phlebotomy-lab", "Phlebotomy & clinical laboratory", [
    mm("nha-cpt-phlebotomy-readiness-check"),
    mm("aspt-phlebotomy-readiness-check"),
    dd("aspt-phlebotomy-anki-deck"),
    mm("ascp-mls-readiness-check"),
    mm("ascp-mlt-readiness-check"),
    mm("nha-cpct-readiness-check"),
    dd("nha-cpct-anki-deck"),
  ]),
  defineFamily("medical-assisting", "Medical assisting & clinic support", [
    mm("nha-ccma-readiness-check"),
    mm("aama-cma-readiness-check"),
    mm("amt-rma-readiness-check"),
    mm("nha-cmaa-readiness-check"),
    mm("medical-scribe-readiness-check"),
    dd("medical-scribe-anki-deck"),
    mm("physical-therapy-aide-readiness-check"),
    mm("rbt-behavior-technician-readiness-check"),
  ]),
  defineFamily("coding", "Medical coding & billing", [
    mm("aapc-cpc-readiness-check"),
    mm("aapc-ccs-readiness-check"),
    mm("nha-cbcs-readiness-check"),
    mm("medical-billing-specialist-readiness-check"),
  ]),
  defineFamily("imaging-resp-surg", "Imaging, respiratory, surgical & nutrition", [
    mm("ardms-spi-readiness-check"),
    dd("ardms-spi-anki-deck"),
    mm("nbrc-tmc-readiness-check"),
    mm("nbstsa-cst-readiness-check"),
    mm("crcst-readiness-check"),
    mm("ccht-dialysis-readiness-check"),
    dd("ccht-dialysis-anki-deck"),
    mm("abo-optician-readiness-check"),
    dd("abo-optician-anki-deck"),
    mm("rd-exam-readiness-check"),
    dd("rd-exam-anki-deck"),
  ]),
  defineFamily("dental", "Dental assisting & hygiene", [
    mm("danb-ice-readiness-check"),
    mm("danb-gc-readiness-check"),
    mm("nbdhe-readiness-check"),
  ]),
  defineFamily("ems", "EMS & emergency care", [
    mm("nremt-emr-readiness-check"),
    mm("nremt-emt-readiness-check"),
    mm("nremt-aemt-readiness-check"),
    mm("nremt-paramedic-readiness-check"),
    mm("aha-bls-provider-readiness-check"),
    mm("first-aid-cpr-readiness-check"),
  ]),
  defineFamily("building", "Building & sustainability credentials", [
    mm("leed-green-associate-readiness-check"),
    dd("leed-green-associate-anki-deck"),
    mm("leed-ap-bd-c-readiness-check"),
    dd("leed-ap-bd-c-anki-deck"),
    mm("leed-ap-om-readiness-check"),
    dd("leed-ap-om-anki-deck"),
    mm("well-ap-readiness-check"),
    dd("well-ap-anki-deck"),
    mm("cem-readiness-check"),
    dd("cem-anki-deck"),
    mm("ashrae-certifications-readiness-check"),
    dd("ashrae-certifications-anki-deck"),
    mm("bms-bas-readiness-check"),
    dd("bms-building-automation-anki-deck"),
    mm("cdcp-readiness-check"),
    dd("cdcp-anki-deck"),
    mm("nabcep-associate-readiness-check"),
  ]),
  defineFamily("hvac-safety", "HVAC, safety & fire protection", [
    mm("epa-608-readiness-check"),
    dd("hvac-epa-608-anki-deck"),
    mm("nate-core-readiness-check"),
    mm("osha-10-general-readiness-check"),
    mm("nebosh-readiness-check"),
    dd("nebosh-anki-deck"),
    mm("cfps-readiness-check"),
    dd("cfps-anki-deck"),
  ]),
  defineFamily("surveying", "RICS quantity surveying & APC", [
    mm("mrics-readiness-check"),
    dd("mrics-anki-deck"),
    mm("mrics-quantity-surveying-readiness-check"),
    dd("mrics-quantity-surveying-anki-deck"),
  ]),
  defineFamily("fitness", "Personal training & nutrition coaching", [
    mm("nasm-cpt-readiness-check"),
    mm("ace-cpt-readiness-check"),
    dd("ace-cpt-anki-deck"),
    mm("issa-cpt-readiness-check"),
    mm("acsm-cpt-readiness-check"),
    dd("acsm-cpt-anki-deck"),
    mm("nsca-cpt-readiness-check"),
    mm("cscs-nsca-readiness-check"),
    mm("precision-nutrition-l1-readiness-check"),
  ]),
  defineFamily("trades", "Trades & operator licenses", [
    mm("electrical-journeyman-readiness-check"),
    mm("plumbing-journeyman-readiness-check"),
    mm("water-treatment-operator-1-readiness-check"),
    mm("wastewater-operator-1-readiness-check"),
    mm("forklift-operator-readiness-check"),
    mm("pest-control-applicator-readiness-check"),
  ]),
  defineFamily("cdl", "CDL general knowledge & endorsements", [
    mm("cdl-general-knowledge-readiness-check"),
    mm("cdl-air-brakes-readiness-check"),
    mm("cdl-combination-readiness-check"),
    mm("cdl-doubles-triples-readiness-check"),
    mm("cdl-tankers-readiness-check"),
    mm("cdl-hazmat-readiness-check"),
    mm("cdl-passenger-readiness-check"),
    mm("cdl-school-bus-readiness-check"),
  ]),
  defineFamily("food", "Food safety & alcohol service", [
    mm("servsafe-manager-mock"),
    dd("servsafe-manager-anki-deck"),
    mm("servsafe-food-handler-readiness-check"),
    mm("alcohol-server-readiness-check"),
    dd("servsafe-manager-complete-study-guide", "ServSafe Manager complete study guide (PDF)"),
  ]),
  defineFamily("beauty-bodywork", "Cosmetology, barbering & massage", [
    mm("cosmetology-state-readiness-check"),
    mm("esthetician-state-readiness-check"),
    mm("nail-technician-state-readiness-check"),
    mm("barber-state-readiness-check"),
    mm("mblex-readiness-check"),
  ]),
  defineFamily("social-education", "Social work & education licensure", [
    mm("aswb-bachelors-readiness-check"),
    mm("aswb-masters-readiness-check"),
    mm("aswb-clinical-readiness-check"),
    mm("praxis-core-readiness-check"),
    mm("praxis-elementary-education-readiness-check"),
    mm("praxis-special-education-readiness-check"),
    mm("parapro-readiness-check"),
    mm("cda-childcare-readiness-check"),
  ]),
  defineFamily("security-legal", "Security officer & notary licensing", [
    mm("unarmed-security-officer-readiness-check"),
    mm("armed-security-officer-readiness-check"),
    mm("notary-public-readiness-check"),
    mm("funeral-service-arts-readiness-check"),
  ]),
  defineFamily(
    "state-re-decks",
    "Additional state real estate Anki decks",
    STATE_RE_DECK_SLUGS.map((slug) => dd(slug)),
  ),
  defineFamily("commodity", "Commodity trading desk flashcards", [
    dd("bench-energy-oil-trader-anki-deck"),
    dd("bench-energy-metal-trader-anki-deck"),
    dd("bench-energy-coal-trader-anki-deck"),
    dd("commodity-trader-pack-bundle", "Commodity trader pack bundle"),
  ]),
  defineFamily("veterinary", "Veterinary assistant & technician", [
    mm("veterinary-assistant-readiness-check"),
    mm("veterinary-technician-vtne-readiness-check"),
  ]),
  defineFamily(
    "citizenship",
    "Citizenship & naturalization",
    CITIZENSHIP_PATHS.flatMap(([mockSlug, deckSlug]) => md(mockSlug, deckSlug)),
  ),
];

const mockSlugToFamily = new Map<string, ExamFamily>();
const deckSlugToFamily = new Map<string, ExamFamily>();

for (const family of EXAM_FAMILIES) {
  for (const entry of family.members) {
    if (entry.mock) {
      mockSlugToFamily.set(entry.mock, family);
    }
    if (entry.deck) {
      deckSlugToFamily.set(entry.deck, family);
    }
  }
}

export function getExamFamilyForMock(slug: string): ExamFamily | undefined {
  return mockSlugToFamily.get(slug);
}

export function getExamFamilyForDeck(slug: string): ExamFamily | undefined {
  return deckSlugToFamily.get(slug);
}

function selfHrefForMock(slug: string) {
  return `/mock-exams/${slug}`;
}

function selfHrefForDeck(slug: string) {
  return `/decks/${slug}`;
}

function isIndexableMember(entry: ExamFamilyMember | undefined): boolean {
  if (!entry) {
    return false;
  }
  if (entry.mock) {
    return shouldIndexMockExam(entry.mock);
  }
  if (entry.deck) {
    const deck = getDeckBySlug(entry.deck);
    return Boolean(deck && shouldIndexDeck(deck));
  }
  return false;
}

function memberToLink(entry: ExamFamilyMember): RelatedLink | undefined {
  if (!isIndexableMember(entry)) {
    return undefined;
  }
  const href = entry.mock ? selfHrefForMock(entry.mock) : selfHrefForDeck(entry.deck!);
  return { href, anchor: entry.anchor, relation: entry.relation };
}

function firstFamilyEntryMock(family: ExamFamily): string | undefined {
  return family.members.find((m) => m.mock)?.mock;
}

function findMemberIndex(family: ExamFamily, slug: string, kind: "mock" | "deck"): number {
  return family.members.findIndex((m) => (kind === "mock" ? m.mock === slug : m.deck === slug));
}

function sortedByPathDistance(
  family: ExamFamily,
  currentIndex: number,
  kind: "mock" | "deck",
): ExamFamilyMember[] {
  return family.members
    .map((member, index) => ({ member, index }))
    .filter(({ member }) => (kind === "mock" ? Boolean(member.mock) : Boolean(member.deck)))
    .filter(({ member }) => (kind === "mock" ? member.mock : member.deck) !== undefined)
    .sort((a, b) => Math.abs(a.index - currentIndex) - Math.abs(b.index - currentIndex))
    .map(({ member }) => member);
}

function pickCrossTypeNeighbor(
  family: ExamFamily,
  currentIndex: number,
  pageKind: "mock" | "deck",
): ExamFamilyMember | undefined {
  const wantKind = pageKind === "mock" ? "deck" : "mock";
  const forward = family.members
    .slice(currentIndex + 1)
    .find((m) => (wantKind === "deck" ? m.deck : m.mock));
  if (forward) {
    return forward;
  }
  return family.members
    .slice(0, currentIndex)
    .reverse()
    .find((m) => (wantKind === "deck" ? m.deck : m.mock));
}

function addUnique(
  links: RelatedLink[],
  seen: Set<string>,
  link: RelatedLink | undefined,
  selfHref: string,
) {
  if (!link || link.href === selfHref || seen.has(link.href)) {
    return;
  }
  seen.add(link.href);
  links.push(link);
}

const VERTICAL_FILL_NEIGHBORS: Partial<Record<MockVerticalId, MockVerticalId[]>> = {
  dental: ["allied-health", "surgical"],
  veterinary: ["allied-health"],
};

function verticalIdsForFill(verticalId: MockVerticalId): MockVerticalId[] {
  return [verticalId, ...(VERTICAL_FILL_NEIGHBORS[verticalId] ?? [])];
}

function fillFromVerticalMocks(
  slug: string,
  links: RelatedLink[],
  seen: Set<string>,
  selfHref: string,
) {
  const config = getMockExamConfig(slug);
  if (!config) {
    return;
  }

  const tryMocks = (mocks: ReturnType<typeof getMocksByVertical>) => {
    for (const mock of mocks) {
      if (links.length >= RELATED_MAX) {
        break;
      }
      if (mock.slug === slug || !shouldIndexMockExam(mock.slug)) {
        continue;
      }
      addUnique(
        links,
        seen,
        { href: selfHrefForMock(mock.slug), anchor: defaultAnchorForMock(mock.slug) },
        selfHref,
      );
    }
  };

  for (const verticalId of verticalIdsForFill(config.verticalId)) {
    tryMocks(getMocksByVertical(verticalId));
    if (links.length >= RELATED_MIN) {
      return;
    }
  }

  for (const verticalId of verticalIdsForFill(config.verticalId)) {
    for (const mock of getMocksByVertical(verticalId)) {
      if (links.length >= RELATED_MAX) {
        break;
      }
      if (!mock.linkedDeckSlug) {
        continue;
      }
      const deck = getDeckBySlug(mock.linkedDeckSlug);
      if (!deck || !shouldIndexDeck(deck)) {
        continue;
      }
      addUnique(
        links,
        seen,
        { href: selfHrefForDeck(deck.slug), anchor: defaultAnchorForDeck(deck.slug) },
        selfHref,
      );
    }
    if (links.length >= RELATED_MIN) {
      return;
    }
  }

  for (const mock of getAllMockExams()) {
    if (links.length >= RELATED_MAX) {
      break;
    }
    if (mock.familyId !== config.familyId || mock.slug === slug || !shouldIndexMockExam(mock.slug)) {
      continue;
    }
    addUnique(
      links,
      seen,
      { href: selfHrefForMock(mock.slug), anchor: defaultAnchorForMock(mock.slug) },
      selfHref,
    );
  }
}

function fillFromCategoryDecks(deck: Deck, links: RelatedLink[], seen: Set<string>, selfHref: string) {
  for (const peer of getRelatedDecks(deck, RELATED_MAX + 4)) {
    if (links.length >= RELATED_MAX) {
      break;
    }
  if (!shouldIndexDeck(peer)) {
      continue;
    }
    addUnique(
      links,
      seen,
      { href: selfHrefForDeck(peer.slug), anchor: defaultAnchorForDeck(peer.slug) },
      selfHref,
    );
    if (links.length >= RELATED_MIN) {
      break;
    }
  }
}

function fillFromVerticalForDeck(
  deckSlug: string,
  links: RelatedLink[],
  seen: Set<string>,
  selfHref: string,
) {
  const practiceMock = getDeckPracticeMock(deckSlug) ?? getLinkedMockForDeck(deckSlug);
  if (!practiceMock) {
    return;
  }
  fillFromVerticalMocks(practiceMock.slug, links, seen, selfHref);
}

function buildRelatedLinks(
  family: ExamFamily | undefined,
  slug: string,
  kind: "mock" | "deck",
): RelatedLink[] {
  const selfHref = kind === "mock" ? selfHrefForMock(slug) : selfHrefForDeck(slug);
  const links: RelatedLink[] = [];
  const seen = new Set<string>();

  if (!family) {
    if (kind === "mock") {
      fillFromVerticalMocks(slug, links, seen, selfHref);
    } else {
      const deck = getDeckBySlug(slug);
      if (deck) {
        fillFromCategoryDecks(deck, links, seen, selfHref);
      }
    }
    return links.slice(0, RELATED_MAX);
  }

  const currentIndex = findMemberIndex(family, slug, kind);

  if (kind === "mock") {
    const config = getMockExamConfig(slug);
    if (config?.linkedDeckSlug) {
      const linked = family.members.find((m) => m.deck === config.linkedDeckSlug);
      addUnique(links, seen, memberToLink(linked ?? { deck: config.linkedDeckSlug, anchor: defaultAnchorForDeck(config.linkedDeckSlug) }), selfHref);
    }
  } else {
    const linkedMock = getLinkedMockForDeck(slug) ?? getDeckPracticeMock(slug);
    if (linkedMock) {
      const linked = family.members.find((m) => m.mock === linkedMock.slug);
      addUnique(
        links,
        seen,
        memberToLink(linked ?? { mock: linkedMock.slug, anchor: defaultAnchorForMock(linkedMock.slug) }),
        selfHref,
      );
    }
  }

  const entryMock = firstFamilyEntryMock(family);
  if (entryMock && entryMock !== slug) {
    const entry = family.members.find((m) => m.mock === entryMock);
    addUnique(links, seen, memberToLink(entry!), selfHref);
  }

  const sameTypeNeighbors = sortedByPathDistance(
    family,
    currentIndex >= 0 ? currentIndex : 0,
    kind,
  ).filter((m) => (kind === "mock" ? m.mock !== slug : m.deck !== slug));

  for (const neighbor of sameTypeNeighbors) {
    if (links.length >= RELATED_MAX) {
      break;
    }
    addUnique(links, seen, memberToLink(neighbor), selfHref);
    if (links.filter((l) => l.href.startsWith(kind === "mock" ? "/mock-exams/" : "/decks/")).length >= 3) {
      break;
    }
  }

  const cross = pickCrossTypeNeighbor(family, currentIndex >= 0 ? currentIndex : 0, kind);
  if (cross) {
    addUnique(links, seen, memberToLink(cross), selfHref);
  }

  if (links.length < RELATED_MIN) {
    for (const entry of family.members) {
      if (links.length >= RELATED_MAX) {
        break;
      }
      const entrySlug = entry.mock ?? entry.deck;
      if (entrySlug === slug) {
        continue;
      }
      addUnique(links, seen, memberToLink(entry), selfHref);
    }
  }

  if (links.length < RELATED_MIN) {
    if (kind === "mock") {
      fillFromVerticalMocks(slug, links, seen, selfHref);
    } else {
      const deck = getDeckBySlug(slug);
      if (deck) {
        fillFromCategoryDecks(deck, links, seen, selfHref);
      }
      if (links.length < RELATED_MIN) {
        fillFromVerticalForDeck(slug, links, seen, selfHref);
      }
    }
  }

  return links.slice(0, RELATED_MAX);
}

export function getRelatedForMock(slug: string): RelatedLink[] {
  return buildRelatedLinks(getExamFamilyForMock(slug), slug, "mock");
}

export function getRelatedForDeck(slug: string): RelatedLink[] {
  return buildRelatedLinks(getExamFamilyForDeck(slug), slug, "deck");
}

function hubLinkLabel(family: ExamFamily): string {
  if (family.hubHref.includes("anki-decks") || family.hubHref === "/decks") {
    return `All ${family.label} →`;
  }
  return `All ${family.label} practice tests →`;
}

export function getFamilyHubLinkForMock(slug: string): FamilyHubLink | undefined {
  const family = getExamFamilyForMock(slug);
  if (!family) {
    return undefined;
  }
  return { href: family.hubHref, anchor: hubLinkLabel(family) };
}

export function getFamilyHubLinkForDeck(slug: string): FamilyHubLink | undefined {
  const family = getExamFamilyForDeck(slug);
  if (!family) {
    return undefined;
  }
  return { href: family.hubHref, anchor: hubLinkLabel(family) };
}