import { getAllMockExams } from "./configs";
import { getFamilyLabel, getVerticalDefinition } from "./taxonomy";
import type { MockExamConfig } from "./types";

export type MockSearchIndexItem = {
  slug: string;
  title: string;
  shortTitle: string;
  status: string;
  questionCount: number;
  durationMinutes: number;
  passPercent: number;
  examBody: string;
  verticalId: string;
  verticalLabel: string;
  familyId: string;
  familyLabel: string;
  searchAliases: string[];
  href: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function toMockSearchIndexItem(mock: MockExamConfig): MockSearchIndexItem {
  const vertical = getVerticalDefinition(mock.verticalId);
  return {
    slug: mock.slug,
    title: mock.title,
    shortTitle: mock.shortTitle,
    status: mock.status,
    questionCount: mock.questionCount,
    durationMinutes: mock.durationMinutes,
    passPercent: mock.passRule.passPercent,
    examBody: mock.examBody,
    verticalId: mock.verticalId,
    verticalLabel: vertical?.label ?? mock.verticalId,
    familyId: mock.familyId,
    familyLabel: getFamilyLabel(mock.familyId),
    searchAliases: mock.searchAliases ?? [],
    href: `/mock-exams/${mock.slug}`,
  };
}

/**
 * Static catalog index for client search on `/mock-exams?q=`.
 * Fine through ~200–500 mocks. Past ~500 (or if payload/LCP hurts),
 * replace the hub client filter with a small server route that filters
 * this same shape — no Algolia required until facets/typos demand it.
 */
export function buildMockSearchIndex(): MockSearchIndexItem[] {
  return getAllMockExams().map(toMockSearchIndexItem);
}

export function matchesMockSearchQuery(query: string, item: MockSearchIndexItem) {
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  const haystack = normalize(
    [
      item.title,
      item.shortTitle,
      item.examBody,
      item.slug,
      item.verticalLabel,
      item.familyLabel,
      ...item.searchAliases,
    ].join(" "),
  );
  return tokens.every((token) => haystack.includes(token));
}

export function filterMockSearchIndex(items: MockSearchIndexItem[], query: string) {
  return items.filter((item) => matchesMockSearchQuery(query, item));
}
