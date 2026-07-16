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
