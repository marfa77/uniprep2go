import type { MockEditorialBundle } from "./types";
import { frmPart1Editorial } from "./frm-part-1-readiness-check";
import { cfaLevel2Editorial } from "./cfa-level-2-readiness-check";
import { ptcbPharmacyEditorial } from "./ptcb-pharmacy-technician-mock";
import { sieFullMockEditorial } from "./sie-full-mock";
import { cfaLevel1Editorial } from "./cfa-level-1-readiness-check";

export type { MockEditorialBundle, EditorialFaq, EditorialSection, EditorialSource } from "./types";
export { resolveWeightTableQuestions } from "./resolve-weight-table";

const ENRICHMENT_SLUGS = [
  "frm-part-1-readiness-check",
  "cfa-level-2-readiness-check",
  "ptcb-pharmacy-technician-mock",
  "sie-full-mock",
  "cfa-level-1-readiness-check",
] as const;

export type EnrichmentMockSlug = (typeof ENRICHMENT_SLUGS)[number];

const bundles: Partial<Record<EnrichmentMockSlug, MockEditorialBundle>> = {
  "frm-part-1-readiness-check": frmPart1Editorial,
  "cfa-level-2-readiness-check": cfaLevel2Editorial,
  "ptcb-pharmacy-technician-mock": ptcbPharmacyEditorial,
  "sie-full-mock": sieFullMockEditorial,
  "cfa-level-1-readiness-check": cfaLevel1Editorial,
};

export function getMockEditorialBundle(slug: string): MockEditorialBundle | null {
  return bundles[slug as EnrichmentMockSlug] ?? null;
}

export function getMockEditorialFaqs(slug: string) {
  return getMockEditorialBundle(slug)?.faqs ?? [];
}

export function getMockEditorialMetaDescriptionOverride(slug: string): string | undefined {
  return getMockEditorialBundle(slug)?.metaDescriptionOverride;
}

export function getMockEditorialDropFaqQuestions(slug: string): string[] {
  return getMockEditorialBundle(slug)?.dropDefaultFaqQuestions ?? [];
}

export function registerMockEditorialBundle(slug: EnrichmentMockSlug, bundle: MockEditorialBundle) {
  bundles[slug] = bundle;
}

export function enrichmentMockSlugs(): readonly string[] {
  return ENRICHMENT_SLUGS;
}