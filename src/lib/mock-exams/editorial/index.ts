import type { MockEditorialBundle } from "./types";
import { frmPart1Editorial } from "./frm-part-1-readiness-check";
import { cfaLevel2Editorial } from "./cfa-level-2-readiness-check";
import { ptcbPharmacyEditorial } from "./ptcb-pharmacy-technician-mock";
import { sieFullMockEditorial } from "./sie-full-mock";
import { cfaLevel1Editorial } from "./cfa-level-1-readiness-check";
import { series7Editorial } from "./series-7-readiness-check";
import { series63Editorial } from "./series-63-readiness-check";
import { lifeHealthInsuranceEditorial } from "./life-and-health-insurance-readiness-check";
import { propertyCasualtyInsuranceEditorial } from "./property-casualty-insurance-readiness-check";
import { pmpEditorial } from "./pmp-readiness-check";
import { gmatFocusEditorial } from "./gmat-focus-readiness-check";
import { nclexRnEditorial } from "./nclex-rn-readiness-check";
import { servsafeManagerEditorial } from "./servsafe-manager-mock";
import { mricsEditorial } from "./mrics-readiness-check";
import { mricsQsEditorial } from "./mrics-quantity-surveying-readiness-check";
import { series65Editorial } from "./series-65-readiness-check";
import { cscsEditorial } from "./cscs-nsca-readiness-check";
import { leedGreenAssociateEditorial } from "./leed-green-associate-readiness-check";
import { cfpEditorial } from "./cfp-certification-readiness-check";
import { epa608Editorial } from "./epa-608-readiness-check";
import { enrolledAgentEditorial } from "./enrolled-agent-readiness-check";
import { nbrcTmcEditorial } from "./nbrc-tmc-readiness-check";
import { aceCptEditorial } from "./ace-cpt-readiness-check";
import { rdExamEditorial } from "./rd-exam-readiness-check";
import { leedApOmEditorial } from "./leed-ap-om-readiness-check";
import { cdcpMockEditorial } from "./cdcp-readiness-check";
import { cemEditorial } from "./cem-readiness-check";
import { electricalJourneymanEditorial } from "./electrical-journeyman-readiness-check";
import { nnaapCnaEditorial } from "./nnaap-cna-readiness-check";

export type { MockEditorialBundle, EditorialFaq, EditorialSection, EditorialSource } from "./types";
export { resolveWeightTableQuestions } from "./resolve-weight-table";

const ENRICHMENT_SLUGS = [
  "frm-part-1-readiness-check",
  "cfa-level-2-readiness-check",
  "ptcb-pharmacy-technician-mock",
  "sie-full-mock",
  "cfa-level-1-readiness-check",
  // Batch 2 (15 pages, one PR)
  "series-7-readiness-check",
  "series-63-readiness-check",
  "life-and-health-insurance-readiness-check",
  "property-casualty-insurance-readiness-check",
  "pmp-readiness-check",
  "gmat-focus-readiness-check",
  "nclex-rn-readiness-check",
  "servsafe-manager-mock",
  "mrics-readiness-check",
  "mrics-quantity-surveying-readiness-check",
  "series-65-readiness-check",
  "cscs-nsca-readiness-check",
  "leed-green-associate-readiness-check",
  "cfp-certification-readiness-check",
  "epa-608-readiness-check",
  "enrolled-agent-readiness-check",
  "nbrc-tmc-readiness-check",
  "ace-cpt-readiness-check",
  "rd-exam-readiness-check",
  "leed-ap-om-readiness-check",
  "cdcp-readiness-check",
  "cem-readiness-check",
  "electrical-journeyman-readiness-check",
  "nnaap-cna-readiness-check",
] as const;

export type EnrichmentMockSlug = (typeof ENRICHMENT_SLUGS)[number];

const bundles: Partial<Record<EnrichmentMockSlug, MockEditorialBundle>> = {
  "frm-part-1-readiness-check": frmPart1Editorial,
  "cfa-level-2-readiness-check": cfaLevel2Editorial,
  "ptcb-pharmacy-technician-mock": ptcbPharmacyEditorial,
  "sie-full-mock": sieFullMockEditorial,
  "cfa-level-1-readiness-check": cfaLevel1Editorial,
  "series-7-readiness-check": series7Editorial,
  "series-63-readiness-check": series63Editorial,
  "life-and-health-insurance-readiness-check": lifeHealthInsuranceEditorial,
  "property-casualty-insurance-readiness-check": propertyCasualtyInsuranceEditorial,
  "pmp-readiness-check": pmpEditorial,
  "gmat-focus-readiness-check": gmatFocusEditorial,
  "nclex-rn-readiness-check": nclexRnEditorial,
  "servsafe-manager-mock": servsafeManagerEditorial,
  "mrics-readiness-check": mricsEditorial,
  "mrics-quantity-surveying-readiness-check": mricsQsEditorial,
  "series-65-readiness-check": series65Editorial,
  "cscs-nsca-readiness-check": cscsEditorial,
  "leed-green-associate-readiness-check": leedGreenAssociateEditorial,
  "cfp-certification-readiness-check": cfpEditorial,
  "epa-608-readiness-check": epa608Editorial,
  "enrolled-agent-readiness-check": enrolledAgentEditorial,
  "nbrc-tmc-readiness-check": nbrcTmcEditorial,
  "ace-cpt-readiness-check": aceCptEditorial,
  "rd-exam-readiness-check": rdExamEditorial,
  "leed-ap-om-readiness-check": leedApOmEditorial,
  "cdcp-readiness-check": cdcpMockEditorial,
  "cem-readiness-check": cemEditorial,
  "electrical-journeyman-readiness-check": electricalJourneymanEditorial,
  "nnaap-cna-readiness-check": nnaapCnaEditorial,
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