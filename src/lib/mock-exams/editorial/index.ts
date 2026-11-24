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
import { nasmCptEditorial } from "./nasm-cpt-readiness-check";
import { cdaChildcareEditorial } from "./cda-childcare-readiness-check";
import { precisionNutritionL1Editorial } from "./precision-nutrition-l1-readiness-check";
import { satEditorial } from "./sat-readiness-check";
import { nremtParamedicEditorial } from "./nremt-paramedic-readiness-check";
import { nremtAemtEditorial } from "./nremt-aemt-readiness-check";
import { homeHealthAideEditorial } from "./home-health-aide-readiness-check";
import { aamaCmaEditorial } from "./aama-cma-readiness-check";
import { sieQuickDiagnosticEditorial } from "./sie-quick-diagnostic";
import { cdlGeneralKnowledgeEditorial } from "./cdl-general-knowledge-readiness-check";
import { leedApBdcEditorial } from "./leed-ap-bd-c-readiness-check";
import { cdlCombinationEditorial } from "./cdl-combination-readiness-check";
import { ardmsSpiEditorial } from "./ardms-spi-readiness-check";
import { crcstEditorial } from "./crcst-readiness-check";
import { nabcepAssociateEditorial } from "./nabcep-associate-readiness-check";
import { neboshEditorial } from "./nebosh-readiness-check";
import { californiaRealEstateEditorial } from "./california-real-estate-readiness-check";
import { greEditorial } from "./gre-readiness-check";
import { asptPhlebotomyEditorial } from "./aspt-phlebotomy-readiness-check";
import { wellApEditorial } from "./well-ap-readiness-check";
import { cdlDoublesTriplesEditorial } from "./cdl-doubles-triples-readiness-check";

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
  "nasm-cpt-readiness-check",
  "cda-childcare-readiness-check",
  "precision-nutrition-l1-readiness-check",
  "sat-readiness-check",
  "nremt-paramedic-readiness-check",
  "nremt-aemt-readiness-check",
  "home-health-aide-readiness-check",
  "aama-cma-readiness-check",
  "sie-quick-diagnostic",
  "cdl-general-knowledge-readiness-check",
  "leed-ap-bd-c-readiness-check",
  "cdl-combination-readiness-check",
  "ardms-spi-readiness-check",
  "crcst-readiness-check",
  "nabcep-associate-readiness-check",
  "nebosh-readiness-check",
  "california-real-estate-readiness-check",
  "gre-readiness-check",
  "aspt-phlebotomy-readiness-check",
  "well-ap-readiness-check",
  "cdl-doubles-triples-readiness-check",
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
  "nasm-cpt-readiness-check": nasmCptEditorial,
  "cda-childcare-readiness-check": cdaChildcareEditorial,
  "precision-nutrition-l1-readiness-check": precisionNutritionL1Editorial,
  "sat-readiness-check": satEditorial,
  "nremt-paramedic-readiness-check": nremtParamedicEditorial,
  "nremt-aemt-readiness-check": nremtAemtEditorial,
  "home-health-aide-readiness-check": homeHealthAideEditorial,
  "aama-cma-readiness-check": aamaCmaEditorial,
  "sie-quick-diagnostic": sieQuickDiagnosticEditorial,
  "cdl-general-knowledge-readiness-check": cdlGeneralKnowledgeEditorial,
  "leed-ap-bd-c-readiness-check": leedApBdcEditorial,
  "cdl-combination-readiness-check": cdlCombinationEditorial,
  "ardms-spi-readiness-check": ardmsSpiEditorial,
  "crcst-readiness-check": crcstEditorial,
  "nabcep-associate-readiness-check": nabcepAssociateEditorial,
  "nebosh-readiness-check": neboshEditorial,
  "california-real-estate-readiness-check": californiaRealEstateEditorial,
  "gre-readiness-check": greEditorial,
  "aspt-phlebotomy-readiness-check": asptPhlebotomyEditorial,
  "well-ap-readiness-check": wellApEditorial,
  "cdl-doubles-triples-readiness-check": cdlDoublesTriplesEditorial,
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