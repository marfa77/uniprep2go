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
  "sie-quick-diagnostic",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "california-real-estate-readiness-check",
  "life-and-health-insurance-readiness-check",
  "property-casualty-insurance-readiness-check",
  "cfa-level-1-readiness-check",
  "servsafe-manager-mock",
  "epa-608-readiness-check",
  "fl-real-estate-readiness-check",
] as const;

/**
 * US money-priority mocks for sitemap boost + home CTAs (FINRA ladder + CA RE).
 * Featured hub can stay marketing-oriented; sitemap priority uses this set.
 */
export const nicheGooglePrioritySlugs = [
  "sie-full-mock",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "california-real-estate-readiness-check",
] as const;

/** Parked / lower-WTP exams kept live/GEO but deprioritized in Google sitemap. */
export const googleHeadExamSlugs = [
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
  "tx-real-estate-readiness-check",
  "servsafe-manager-mock",
  "ptcb-pharmacy-technician-mock",
  "gmat-focus-readiness-check",
  "gre-readiness-check",
  "cfa-level-1-readiness-check",
  "us-citizenship-readiness-check",
] as const;

const nicheGooglePrioritySlugSet = new Set<string>(nicheGooglePrioritySlugs);
const googleHeadExamSlugSet = new Set<string>(googleHeadExamSlugs);

export function isNicheGooglePrioritySlug(slug: string): boolean {
  return nicheGooglePrioritySlugSet.has(slug);
}

export function isGoogleHeadExamSlug(slug: string): boolean {
  return googleHeadExamSlugSet.has(slug);
}

/** Unique SSR lead paragraphs for US money-priority mock pages (40–100 words). */
export const nicheGooglePageLeads: Partial<Record<(typeof nicheGooglePrioritySlugs)[number], string>> = {
  "sie-full-mock":
    "This free FINRA SIE practice test mirrors the Securities Industry Essentials gate exam for brokerage candidates who do not yet need a firm sponsor. Timed questions cover capital markets, products, trading, customer accounts, and prohibited activities — then the report shows which SIE domains to repair with Anki before you schedule Prometric.",
  "series-7-readiness-check":
    "Use this free Series 7 readiness check after SIE to stress-test General Securities Representative judgment on equities, debt, options, packaged products, and customer suitability. It is built for sponsored candidates climbing the FINRA license ladder — not a recycled SIE quiz — so you can see which Series 7 topics still need daily drill.",
  "series-63-readiness-check":
    "This free Series 63 readiness check targets Uniform Securities Agent State Law rules that sit beside Series 7 for many state registrations. Timed items cover registration, unethical practices, and administrative provisions so you can close the state-law gap on the same buyer ladder as SIE and Series 7.",
  "california-real-estate-readiness-check":
    "This free California real estate salesperson readiness check focuses on DRE license law, contracts, property ownership, agency, and exam math for the endless CA cohort. Use it as a timed diagnostic before PSI — then repair weak topics with the linked Anki deck between study blocks.",
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
