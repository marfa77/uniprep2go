import type { HubPath } from "./hub-intros";
import { mockVerticalHubPath } from "./hub-intros";
import { mockExamHubBreadcrumbLabel } from "./mock-exams/llm";
import { getVerticalDefinition } from "./mock-exams/taxonomy";
import type { MockVerticalId } from "./mock-exams/types";
import { absoluteUrl, siteConfig } from "./site";

export type BreadcrumbListJsonLd = {
  "@type": "BreadcrumbList";
  "@id": string;
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
};

function listItem(position: number, name: string, path: string) {
  return {
    "@type": "ListItem" as const,
    position,
    name,
    item: absoluteUrl(path),
  };
}

function breadcrumbForPage(pagePath: string, elements: ReturnType<typeof listItem>[]): BreadcrumbListJsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(pagePath)}#breadcrumb`,
    itemListElement: elements,
  };
}

export function buildHomeBreadcrumbItem() {
  return listItem(1, "Home", "/");
}

export function buildMockExamsIndexBreadcrumbJsonLd(): BreadcrumbListJsonLd {
  const path = "/mock-exams";
  return breadcrumbForPage(path, [
    buildHomeBreadcrumbItem(),
    listItem(2, mockExamHubBreadcrumbLabel(), path),
  ]);
}

export function buildMockVerticalHubBreadcrumbJsonLd(verticalId: MockVerticalId): BreadcrumbListJsonLd {
  const vertical = getVerticalDefinition(verticalId);
  const hubPath = mockVerticalHubPath(verticalId);
  return breadcrumbForPage(hubPath, [
    buildHomeBreadcrumbItem(),
    listItem(2, mockExamHubBreadcrumbLabel(), "/mock-exams"),
    listItem(3, vertical?.label ?? verticalId, hubPath),
  ]);
}

export function buildDecksIndexBreadcrumbJsonLd(): BreadcrumbListJsonLd {
  const path = "/decks";
  return breadcrumbForPage(path, [
    buildHomeBreadcrumbItem(),
    listItem(2, "Anki decks", path),
  ]);
}

export function buildFinanceDecksHubBreadcrumbJsonLd(): BreadcrumbListJsonLd {
  const path = "/finance-anki-decks";
  return breadcrumbForPage(path, [
    buildHomeBreadcrumbItem(),
    listItem(2, "Anki decks", "/decks"),
    listItem(3, "Finance Anki decks", path),
  ]);
}

export function buildBuildingDecksHubBreadcrumbJsonLd(): BreadcrumbListJsonLd {
  const path = "/building-certification-anki-decks";
  return breadcrumbForPage(path, [
    buildHomeBreadcrumbItem(),
    listItem(2, "Anki decks", "/decks"),
    listItem(3, "Building certification Anki decks", path),
  ]);
}

export function buildLanguageDecksHubBreadcrumbJsonLd(): BreadcrumbListJsonLd {
  const path = "/language-certification-decks";
  return breadcrumbForPage(path, [
    buildHomeBreadcrumbItem(),
    listItem(2, "Anki decks", "/decks"),
    listItem(3, "Language certification decks", path),
  ]);
}

export function buildHubBreadcrumbJsonLd(hubPath: HubPath): BreadcrumbListJsonLd {
  if (hubPath === "/mock-exams") {
    return buildMockExamsIndexBreadcrumbJsonLd();
  }
  if (hubPath === "/decks") {
    return buildDecksIndexBreadcrumbJsonLd();
  }
  if (hubPath === "/finance-anki-decks") {
    return buildFinanceDecksHubBreadcrumbJsonLd();
  }
  if (hubPath === "/building-certification-anki-decks") {
    return buildBuildingDecksHubBreadcrumbJsonLd();
  }
  if (hubPath === "/language-certification-decks") {
    return buildLanguageDecksHubBreadcrumbJsonLd();
  }
  const verticalPrefix = "/mock-exams/v/";
  if (hubPath.startsWith(verticalPrefix)) {
    const verticalId = hubPath.slice(verticalPrefix.length) as MockVerticalId;
    return buildMockVerticalHubBreadcrumbJsonLd(verticalId);
  }
  throw new Error(`Unknown hub path for breadcrumb: ${hubPath}`);
}