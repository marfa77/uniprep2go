import { getMockClusterImage } from "./cluster-images";
import { getAllMockExams } from "./configs";
import {
  getFamilyLabel,
  getVerticalDefinition,
  MOCK_VERTICALS,
  type MockVerticalDefinition,
} from "./taxonomy";
import type { MockExamConfig, MockVerticalId } from "./types";

export const featuredMockHubSlugs = [
  "sie-full-mock",
  "cdl-general-knowledge-readiness-check",
  "nha-ccma-readiness-check",
  "nremt-emt-readiness-check",
  "servsafe-manager-mock",
  "ptcb-pharmacy-technician-mock",
  "fl-real-estate-readiness-check",
  "aapc-cpc-readiness-check",
] as const;

/**
 * Google money URLs for niche-first SEO (lower competition than SIE/ServSafe/PTCB).
 * Featured hub can stay marketing-oriented; sitemap priority + home links use this set.
 */
export const nicheGooglePrioritySlugs = [
  "epa-608-readiness-check",
  "leed-green-associate-readiness-check",
  "leed-ap-bd-c-readiness-check",
  "nebosh-readiness-check",
  "cfps-readiness-check",
  "mrics-readiness-check",
  "cdl-general-knowledge-readiness-check",
  "water-treatment-operator-1-readiness-check",
  "electrical-journeyman-readiness-check",
  "nha-cpt-phlebotomy-readiness-check",
  "fl-real-estate-readiness-check",
] as const;

/** Head exams kept live/GEO but deprioritized in Google sitemap + home CTAs. */
export const googleHeadExamSlugs = [
  "sie-full-mock",
  "servsafe-manager-mock",
  "ptcb-pharmacy-technician-mock",
  "gmat-focus-readiness-check",
  "gre-readiness-check",
  "cfa-level-1-readiness-check",
] as const;

const nicheGooglePrioritySlugSet = new Set<string>(nicheGooglePrioritySlugs);
const googleHeadExamSlugSet = new Set<string>(googleHeadExamSlugs);

export function isNicheGooglePrioritySlug(slug: string): boolean {
  return nicheGooglePrioritySlugSet.has(slug);
}

export function isGoogleHeadExamSlug(slug: string): boolean {
  return googleHeadExamSlugSet.has(slug);
}

/** Unique SSR lead paragraphs for niche Google money pages (40–100 words). */
export const nicheGooglePageLeads: Partial<Record<(typeof nicheGooglePrioritySlugs)[number], string>> = {
  "epa-608-readiness-check":
    "This free EPA Section 608 practice test targets HVAC technicians preparing for Core plus Type I–III refrigerant certification. Timed questions cover recovery, recycle, reclaim, evacuation levels, and Clean Air Act rules — then the report shows which EPA domains to repair before you sit the official exam.",
  "leed-green-associate-readiness-check":
    "Use this free LEED Green Associate practice test to benchmark green building basics before USGBC exam day. Questions span integrative process, location and transportation, water, energy, materials, and indoor environmental quality so you can see which credit categories still need Anki drilling.",
  "leed-ap-bd-c-readiness-check":
    "This free LEED AP BD+C readiness check focuses on Building Design and Construction credit application, documentation, and rating-system nuance. It is built for project teams moving past Green Associate into AP-level scenario judgment — not a recycled GA quiz.",
  "nebosh-readiness-check":
    "This free NEBOSH practice session drills health and safety management systems, workplace hazards, and risk-control thinking used on IGC-style assessments. Take it timed, review weak topics in the report, then use the linked Anki deck for spaced repetition between study blocks.",
  "cfps-readiness-check":
    "Prepare for the Certified Fire Protection Specialist exam with this free CFPS readiness check. Questions hit fire science, detection and alarm, suppression, and facility hazard management so you can prioritize NFPA-aligned study before the official multiple-choice sitting.",
  "mrics-readiness-check":
    "This free MRICS APC practice check helps surveyors and quantity-surveying candidates rehearse competency-style judgment, ethics, and technical application. Use the score report to decide which RICS pathways and Level 2/3 examples need more written evidence before interview.",
  "cdl-general-knowledge-readiness-check":
    "This free CDL General Knowledge practice test covers vehicle inspection, safe driving, cargo, and air-brakes-adjacent fundamentals for Class A/B learners. Timed scoring mirrors how state testing centers pace the knowledge exam — then drill weak endorsements separately.",
  "water-treatment-operator-1-readiness-check":
    "Use this free Water Treatment Operator Class I readiness check for entry-level plant math, disinfection, coagulation, filtration, and safety rules. It is built for first-license candidates who need a diagnostic mock before state or association exams — not a generic science quiz.",
  "electrical-journeyman-readiness-check":
    "This free electrical journeyman practice test stresses NEC-style calculations, grounding, overcurrent protection, and jobsite safety judgment. Take it timed to find weak code articles, then repair them with the linked Anki deck before your licensing exam.",
  "nha-cpt-phlebotomy-readiness-check":
    "This free NHA CPT phlebotomy practice test covers specimen collection, order of draw, safety, and patient care scenarios used on allied-health certification pathways. The topic report shows which lab skills to drill daily before your official NHA sitting.",
  "fl-real-estate-readiness-check":
    "This free Florida real estate salesperson readiness check focuses on FREC license law, contracts, property ownership, and math you will see on the state exam. It is the Florida spear for UniPrep2Go’s real-estate mocks — not a generic 50-state template page.",
};

export function getNicheGooglePageLead(slug: string): string | undefined {
  if (!isNicheGooglePrioritySlug(slug)) {
    return undefined;
  }
  return nicheGooglePageLeads[slug as (typeof nicheGooglePrioritySlugs)[number]];
}

export type MockVerticalSummary = MockVerticalDefinition & {
  count: number;
  imageSrc: string;
  href: string;
};

export function getMocksByVertical(verticalId: MockVerticalId): MockExamConfig[] {
  return getAllMockExams()
    .filter((mock) => mock.verticalId === verticalId)
    .sort((a, b) => a.shortTitle.localeCompare(b.shortTitle));
}

export function getVerticalSummaries(): MockVerticalSummary[] {
  const mocks = getAllMockExams();
  return MOCK_VERTICALS.map((vertical) => {
    const count = mocks.filter((mock) => mock.verticalId === vertical.id).length;
    return {
      ...vertical,
      count,
      imageSrc: getMockClusterImage(vertical.imageType),
      href: `/mock-exams/v/${vertical.id}`,
    };
  }).filter((vertical) => vertical.count > 0);
}

export function getVerticalOrThrow(verticalId: string): MockVerticalDefinition {
  const vertical = getVerticalDefinition(verticalId as MockVerticalId);
  if (!vertical) {
    throw new Error(`Unknown mock vertical: ${verticalId}`);
  }
  return vertical;
}

export type MockFamilyGroup = {
  familyId: string;
  label: string;
  mocks: MockExamConfig[];
};

export function groupMocksByFamily(mocks: MockExamConfig[]): MockFamilyGroup[] {
  const byFamily = new Map<string, MockExamConfig[]>();
  for (const mock of mocks) {
    const list = byFamily.get(mock.familyId) ?? [];
    list.push(mock);
    byFamily.set(mock.familyId, list);
  }
  return [...byFamily.entries()]
    .map(([familyId, familyMocks]) => ({
      familyId,
      label: getFamilyLabel(familyId),
      mocks: familyMocks.sort((a, b) => a.shortTitle.localeCompare(b.shortTitle)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

/** @deprecated Prefer getVerticalSummaries — kept for any leftover imports. */
export const mockHubClusters = MOCK_VERTICALS.map((vertical) => ({
  id: vertical.id,
  label: vertical.label,
  imageType: vertical.imageType,
  slugs: [] as string[],
}));
