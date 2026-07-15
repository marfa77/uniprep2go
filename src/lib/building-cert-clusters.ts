import registry from "@/data/certifications/registry.json";
import { getCatalogDeckBySlug, type CatalogAvailableDeck } from "./decks";
import { getMockExamConfig } from "./mock-exams/configs";

export type BuildingClusterId =
  | "green-building"
  | "hvac-controls"
  | "safety-fire"
  | "construction-surveying"
  | "datacenter"
  | "mba-admissions";

export const BUILDING_CLUSTER_LABELS: Record<BuildingClusterId, string> = {
  "green-building": "Green building & wellness",
  "hvac-controls": "HVAC & building automation",
  "safety-fire": "Safety & fire protection",
  "construction-surveying": "Construction & surveying",
  datacenter: "Data centre operations",
  "mba-admissions": "MBA admissions",
};

/** Pathway order within each cluster — used for related decks and hub navigation. */
export const BUILDING_CLUSTER_MEMBERS: Record<BuildingClusterId, readonly string[]> = {
  "green-building": [
    "leed-green-associate-anki-deck",
    "leed-ap-bd-c-anki-deck",
    "well-ap-anki-deck",
    "cem-anki-deck",
  ],
  "hvac-controls": [
    "hvac-epa-608-anki-deck",
    "bms-building-automation-anki-deck",
    "ashrae-certifications-anki-deck",
  ],
  "safety-fire": ["nebosh-anki-deck", "cfps-anki-deck"],
  "construction-surveying": ["mrics-anki-deck", "mrics-quantity-surveying-anki-deck"],
  datacenter: ["cdcp-anki-deck"],
  "mba-admissions": ["gmat-focus-anki-deck"],
};

const DECK_TO_CLUSTER = Object.fromEntries(
  Object.entries(BUILDING_CLUSTER_MEMBERS).flatMap(([clusterId, slugs]) =>
    slugs.map((slug) => [slug, clusterId as BuildingClusterId]),
  ),
) as Record<string, BuildingClusterId>;

/** Cross-sell pairs within the building certification line. */
export const BUILDING_COMPANION_DECK_BY_SLUG: Record<string, string> = {
  "leed-green-associate-anki-deck": "leed-ap-bd-c-anki-deck",
  "leed-ap-bd-c-anki-deck": "leed-green-associate-anki-deck",
  "well-ap-anki-deck": "leed-green-associate-anki-deck",
  "cem-anki-deck": "leed-ap-bd-c-anki-deck",
  "hvac-epa-608-anki-deck": "bms-building-automation-anki-deck",
  "bms-building-automation-anki-deck": "hvac-epa-608-anki-deck",
  "ashrae-certifications-anki-deck": "bms-building-automation-anki-deck",
  "nebosh-anki-deck": "cfps-anki-deck",
  "cfps-anki-deck": "nebosh-anki-deck",
  "mrics-anki-deck": "mrics-quantity-surveying-anki-deck",
  "mrics-quantity-surveying-anki-deck": "mrics-anki-deck",
  "cdcp-anki-deck": "ashrae-certifications-anki-deck",
};

export type MockDeckRepairPair = {
  mockSlug: string;
  deckSlug: string;
  clusterId: BuildingClusterId;
};

export const BUILDING_MOCK_DECK_REPAIR_PAIRS: MockDeckRepairPair[] =
  registry.certifications.map((cert) => ({
    mockSlug: cert.mockSlug,
    deckSlug: cert.deckSlug,
    clusterId: DECK_TO_CLUSTER[cert.deckSlug] ?? "green-building",
  }));

export const BUILDING_CERTIFICATION_HUB_SLUG = "building-certification-anki-decks";

export function isBuildingCertDeckSlug(slug: string): boolean {
  return slug in DECK_TO_CLUSTER;
}

export function getBuildingClusterId(deckSlug: string): BuildingClusterId | undefined {
  return DECK_TO_CLUSTER[deckSlug];
}

export function getBuildingClusterLabel(deckSlug: string): string | undefined {
  const clusterId = getBuildingClusterId(deckSlug);
  return clusterId ? BUILDING_CLUSTER_LABELS[clusterId] : undefined;
}

export function getBuildingClusterDecks(
  clusterId: BuildingClusterId,
): CatalogAvailableDeck[] {
  return BUILDING_CLUSTER_MEMBERS[clusterId]
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined);
}

export function getRelatedBuildingDecks(
  deckSlug: string,
  limit = 4,
): CatalogAvailableDeck[] {
  const clusterId = getBuildingClusterId(deckSlug);
  if (!clusterId) {
    return [];
  }

  return BUILDING_CLUSTER_MEMBERS[clusterId]
    .filter((slug) => slug !== deckSlug)
    .map((slug) => getCatalogDeckBySlug(slug))
    .filter((deck): deck is CatalogAvailableDeck => deck !== undefined)
    .slice(0, limit);
}

export function getBuildingCompanionDeckSlug(deckSlug: string): string | undefined {
  return BUILDING_COMPANION_DECK_BY_SLUG[deckSlug];
}

export type ClusterStudyPath = {
  href: string;
  label: string;
  note: string;
};

export function getBuildingClusterStudyPaths(deckSlug: string): ClusterStudyPath[] {
  const clusterId = getBuildingClusterId(deckSlug);
  if (!clusterId) {
    return [];
  }

  const paths: ClusterStudyPath[] = [
    {
      href: `/${BUILDING_CERTIFICATION_HUB_SLUG}#${clusterId}`,
      label: BUILDING_CLUSTER_LABELS[clusterId],
      note: "Full mock → deck pathway for this certification cluster",
    },
  ];

  for (const siblingSlug of BUILDING_CLUSTER_MEMBERS[clusterId]) {
    if (siblingSlug === deckSlug) {
      continue;
    }

    const sibling = getCatalogDeckBySlug(siblingSlug);
    if (!sibling) {
      continue;
    }

    paths.push({
      href: `/decks/${sibling.slug}`,
      label: sibling.shortName,
      note: sibling.subtitle,
    });
  }

  const companionSlug = getBuildingCompanionDeckSlug(deckSlug);
  if (companionSlug && companionSlug !== deckSlug) {
    const companion = getCatalogDeckBySlug(companionSlug);
    if (companion && !paths.some((path) => path.href === `/decks/${companion.slug}`)) {
      paths.unshift({
        href: `/decks/${companion.slug}`,
        label: `Pairs with ${companion.shortName}`,
        note: companion.subtitle,
      });
    }
  }

  const mock = getMockExamConfig(
    BUILDING_MOCK_DECK_REPAIR_PAIRS.find((pair) => pair.deckSlug === deckSlug)?.mockSlug ?? "",
  );
  if (mock) {
    paths.unshift({
      href: `/mock-exams/${mock.slug}`,
      label: `Free ${mock.shortTitle}`,
      note: `${mock.questionCount} questions · topic scoring report`,
    });
  }

  return paths.slice(0, 5);
}
