/**
 * Official certifier / exam-body links for mock landing pages.
 * Prefer exam-facts profiles when present; fall back to slug and examBody maps.
 * Links are for candidate verification — not endorsements.
 */

import { getExamFactsProfileForDeck } from "../exam-facts";
import type { MockExamConfig } from "./types";

export type OfficialResourceLink = {
  label: string;
  url: string;
};

export type MockOfficialResources = {
  certifier: string;
  verifyAtUrl: string | null;
  sources: OfficialResourceLink[];
  /** Short line for hero / trust strip */
  trustLine: string;
};

type BodyResource = {
  certifier: string;
  verifyAtUrl: string;
  sources?: OfficialResourceLink[];
};

/** National / multi-state exam bodies — matched via includes() on examBody. */
const BODY_RESOURCES: Array<{ match: RegExp | string; resource: BodyResource }> = [
  {
    match: /^FINRA$/i,
    resource: {
      certifier: "FINRA",
      verifyAtUrl: "https://www.finra.org/registration-exams-ce/qualification-exams",
      sources: [
        {
          label: "FINRA qualification exams",
          url: "https://www.finra.org/registration-exams-ce/qualification-exams",
        },
      ],
    },
  },
  {
    match: /CFA Institute/i,
    resource: {
      certifier: "CFA Institute",
      verifyAtUrl: "https://www.cfainstitute.org/programs/cfa-program",
    },
  },
  {
    match: /^GARP$/i,
    resource: {
      certifier: "GARP",
      verifyAtUrl: "https://www.garp.org/frm",
    },
  },
  {
    match: /^NASAA$/i,
    resource: {
      certifier: "NASAA",
      verifyAtUrl: "https://www.nasaa.org/exams/",
    },
  },
  {
    match: /NASAA/i,
    resource: {
      certifier: "NASAA / FINRA delivery",
      verifyAtUrl: "https://www.nasaa.org/exams/",
    },
  },
  {
    match: /^USCIS$/i,
    resource: {
      certifier: "U.S. Citizenship and Immigration Services (USCIS)",
      verifyAtUrl: "https://www.uscis.gov/citizenship/find-study-materials-and-resources",
    },
  },
  {
    match: /ServSafe|National Restaurant Association/i,
    resource: {
      certifier: "ServSafe / National Restaurant Association",
      verifyAtUrl: "https://www.servsafe.com",
    },
  },
  {
    match: /PTCB/i,
    resource: {
      certifier: "Pharmacy Technician Certification Board (PTCB)",
      verifyAtUrl: "https://ptcb.org/credentials/certification/certified-pharmacy-technician/",
    },
  },
  {
    match: /^GMAC$/i,
    resource: {
      certifier: "GMAC (GMAT)",
      verifyAtUrl: "https://www.mba.com/exams/gmat-exam",
    },
  },
  {
    match: /College Board/i,
    resource: {
      certifier: "College Board (Digital SAT)",
      verifyAtUrl: "https://satsuite.collegeboard.org/sat",
    },
  },
  {
    match: /^ETS$/i,
    resource: {
      certifier: "ETS",
      verifyAtUrl: "https://www.ets.org",
      sources: [
        { label: "ETS GRE", url: "https://www.ets.org/gre.html" },
        { label: "ETS Praxis", url: "https://www.ets.org/praxis.html" },
      ],
    },
  },
  {
    match: /^PMI$/i,
    resource: {
      certifier: "Project Management Institute (PMI)",
      verifyAtUrl: "https://www.pmi.org/certifications",
    },
  },
  {
    match: /U\.S\. EPA|EPA/i,
    resource: {
      certifier: "U.S. Environmental Protection Agency (EPA)",
      verifyAtUrl: "https://www.epa.gov/section608",
    },
  },
  {
    match: /IWBI|WELL Building/i,
    resource: {
      certifier: "International WELL Building Institute (IWBI) / GBCI",
      verifyAtUrl: "https://www.wellcertified.com",
    },
  },
  {
    match: /USGBC|GBCI/i,
    resource: {
      certifier: "USGBC / GBCI",
      verifyAtUrl: "https://www.usgbc.org/credentials",
      sources: [
        { label: "USGBC credentials", url: "https://www.usgbc.org/credentials" },
        { label: "GBCI", url: "https://www.gbci.org" },
      ],
    },
  },
  {
    match: /AEE|Association of Energy Engineers/i,
    resource: {
      certifier: "Association of Energy Engineers (AEE)",
      verifyAtUrl: "https://www.aeecenter.org/certifications/certified-energy-manager-cem/",
    },
  },
  {
    match: /^ASHRAE$/i,
    resource: {
      certifier: "ASHRAE",
      verifyAtUrl: "https://www.ashrae.org/professional-development/ashrae-certification",
    },
  },
  {
    match: /EXIN|EPI/i,
    resource: {
      certifier: "EXIN / EPI (CDCP)",
      verifyAtUrl: "https://www.exin.com",
    },
  },
  {
    match: /NEBOSH/i,
    resource: {
      certifier: "NEBOSH",
      verifyAtUrl: "https://www.nebosh.org.uk",
    },
  },
  {
    match: /NFPA/i,
    resource: {
      certifier: "National Fire Protection Association (NFPA)",
      verifyAtUrl: "https://www.nfpa.org/for-professionals/certification",
    },
  },
  {
    match: /RICS/i,
    resource: {
      certifier: "Royal Institution of Chartered Surveyors (RICS)",
      verifyAtUrl: "https://www.rics.org/profession-standards/rics-standards-and-guidance/assessment-of-professional-competence",
    },
  },
  {
    match: /^NHA|NHA \//i,
    resource: {
      certifier: "National Healthcareer Association (NHA)",
      verifyAtUrl: "https://www.nhanow.com",
    },
  },
  {
    match: /^NREMT$/i,
    resource: {
      certifier: "National Registry of Emergency Medical Technicians (NREMT)",
      verifyAtUrl: "https://www.nremt.org",
    },
  },
  {
    match: /FMCSA|State DMV/i,
    resource: {
      certifier: "State DMV / FMCSA Commercial Driver’s License standards",
      verifyAtUrl: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
      sources: [
        {
          label: "FMCSA CDL overview",
          url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
        },
        {
          label: "CDL manuals (FMCSA)",
          url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license/drivers",
        },
      ],
    },
  },
  {
    match: /AAPC/i,
    resource: {
      certifier: "AAPC",
      verifyAtUrl: "https://www.aapc.com/certifications",
    },
  },
  {
    match: /FSMTB/i,
    resource: {
      certifier: "Federation of State Massage Therapy Boards (FSMTB)",
      verifyAtUrl: "https://www.fsmtb.org/mblex/",
    },
  },
  {
    match: /DANB/i,
    resource: {
      certifier: "Dental Assisting National Board (DANB)",
      verifyAtUrl: "https://www.danb.org",
    },
  },
  {
    match: /HSPA|IAHCSMM/i,
    resource: {
      certifier: "Healthcare Sterile Processing Association (HSPA)",
      verifyAtUrl: "https://myhspa.org/certification/",
    },
  },
  {
    match: /ARDMS/i,
    resource: {
      certifier: "American Registry for Diagnostic Medical Sonography (ARDMS)",
      verifyAtUrl: "https://www.ardms.org",
    },
  },
  {
    match: /NBSTSA/i,
    resource: {
      certifier: "NBSTSA",
      verifyAtUrl: "https://www.nbstsa.org",
    },
  },
  {
    match: /AAVSB/i,
    resource: {
      certifier: "AAVSB (VTNE)",
      verifyAtUrl: "https://www.aavsb.org/vtne/",
    },
  },
  {
    match: /NCSBN/i,
    resource: {
      certifier: "NCSBN (NCLEX)",
      verifyAtUrl: "https://www.ncsbn.org/nclex.htm",
    },
  },
  {
    match: /ASWB/i,
    resource: {
      certifier: "Association of Social Work Boards (ASWB)",
      verifyAtUrl: "https://www.aswb.org/exam/",
    },
  },
  {
    match: /NASM/i,
    resource: {
      certifier: "National Academy of Sports Medicine (NASM)",
      verifyAtUrl: "https://www.nasm.org/certification",
    },
  },
  {
    match: /ISSA/i,
    resource: {
      certifier: "International Sports Sciences Association (ISSA)",
      verifyAtUrl: "https://www.issaonline.com",
    },
  },
  {
    match: /^ACE$/i,
    resource: {
      certifier: "American Council on Exercise (ACE)",
      verifyAtUrl: "https://www.acefitness.org/certification/",
    },
  },
  {
    match: /ACSM/i,
    resource: {
      certifier: "American College of Sports Medicine (ACSM)",
      verifyAtUrl: "https://www.acsm.org/certification",
    },
  },
  {
    match: /NSCA/i,
    resource: {
      certifier: "National Strength and Conditioning Association (NSCA)",
      verifyAtUrl: "https://www.nsca.com/certification/",
    },
  },
  {
    match: /SHRM/i,
    resource: {
      certifier: "SHRM",
      verifyAtUrl: "https://www.shrm.org/credentials",
    },
  },
  {
    match: /HRCI/i,
    resource: {
      certifier: "HRCI",
      verifyAtUrl: "https://www.hrci.org",
    },
  },
  {
    match: /CFP Board/i,
    resource: {
      certifier: "CFP Board",
      verifyAtUrl: "https://www.cfp.net",
    },
  },
  {
    match: /American Heart Association|^AHA/i,
    resource: {
      certifier: "American Heart Association",
      verifyAtUrl: "https://cpr.heart.org",
    },
  },
  {
    match: /AAMA/i,
    resource: {
      certifier: "American Association of Medical Assistants (AAMA)",
      verifyAtUrl: "https://www.aama-ntl.org",
    },
  },
  {
    match: /AMT|American Medical Technologists/i,
    resource: {
      certifier: "American Medical Technologists (AMT)",
      verifyAtUrl: "https://americanmedtech.org",
    },
  },
  {
    match: /ASCP/i,
    resource: {
      certifier: "ASCP Board of Certification",
      verifyAtUrl: "https://www.ascp.org/content/board-of-certification",
    },
  },
  {
    match: /BACB/i,
    resource: {
      certifier: "Behavior Analyst Certification Board (BACB)",
      verifyAtUrl: "https://www.bacb.com",
    },
  },
  {
    match: /NMLS|SAFE MLO/i,
    resource: {
      certifier: "NMLS / SAFE MLO",
      verifyAtUrl: "https://mortgage.nationwidelicensingsystem.org",
    },
  },
  {
    match: /NABCEP/i,
    resource: {
      certifier: "NABCEP",
      verifyAtUrl: "https://www.nabcep.org",
    },
  },
  {
    match: /NATE/i,
    resource: {
      certifier: "NATE",
      verifyAtUrl: "https://www.natex.org",
    },
  },
  {
    match: /IRS/i,
    resource: {
      certifier: "Internal Revenue Service (IRS)",
      verifyAtUrl: "https://www.irs.gov/tax-professionals/enrolled-agents",
    },
  },
  {
    match: /OSHA/i,
    resource: {
      certifier: "Occupational Safety and Health Administration (OSHA)",
      verifyAtUrl: "https://www.osha.gov/training",
    },
  },
  {
    match: /AHIMA/i,
    resource: {
      certifier: "AHIMA",
      verifyAtUrl: "https://www.ahima.org/certification-careers/certifications-overview/",
    },
  },
  {
    match: /CDR|Academy of Nutrition/i,
    resource: {
      certifier: "Commission on Dietetic Registration (CDR)",
      verifyAtUrl: "https://www.cdrnet.org",
    },
  },
  {
    match: /Council for Professional Recognition/i,
    resource: {
      certifier: "Council for Professional Recognition (CDA)",
      verifyAtUrl: "https://www.cdacouncil.org",
    },
  },
  {
    match: /NBRC/i,
    resource: {
      certifier: "National Board for Respiratory Care (NBRC)",
      verifyAtUrl: "https://www.nbrc.org",
    },
  },
  {
    match: /NNCC/i,
    resource: {
      certifier: "Nephrology Nursing Certification Commission (NNCC)",
      verifyAtUrl: "https://www.nncc-exam.org",
    },
  },
  {
    match: /JCNDE|ADA/i,
    resource: {
      certifier: "Joint Commission on National Dental Examinations (JCNDE)",
      verifyAtUrl: "https://jcnde.ada.org",
    },
  },
  {
    match: /American Board of Opticianry|ABO/i,
    resource: {
      certifier: "American Board of Opticianry (ABO)",
      verifyAtUrl: "https://www.abo-ncle.org",
    },
  },
  {
    match: /ASPT/i,
    resource: {
      certifier: "American Society of Phlebotomy Technicians (ASPT)",
      verifyAtUrl: "https://www.aspt.org",
    },
  },
  {
    match: /Precision Nutrition/i,
    resource: {
      certifier: "Precision Nutrition",
      verifyAtUrl: "https://www.precisionnutrition.com",
    },
  },
  {
    match: /The Conference|NBE/i,
    resource: {
      certifier: "The Conference (National Board Exam)",
      verifyAtUrl: "https://theconferenceonline.org",
    },
  },
  {
    match: /Real Estate|Realty|DRE|TREC|DBPR|DPOR|LARA|IDFPR|NCREC|DOL/i,
    resource: {
      certifier: "State real estate commission / licensing board",
      verifyAtUrl: "https://www.arello.org",
      sources: [
        {
          label: "Find your state real estate regulator (ARELLO)",
          url: "https://www.arello.org",
        },
      ],
    },
  },
  {
    match: /insurance/i,
    resource: {
      certifier: "State insurance licensing departments (NAIC resources)",
      verifyAtUrl: "https://content.naic.org",
    },
  },
  {
    match: /\bNIC\b|cosmetology|barber|esthetic/i,
    resource: {
      certifier: "State cosmetology / barber board (often NIC written exams)",
      verifyAtUrl: "https://nictesting.org",
    },
  },
  {
    match: /ASQ|IASSC|Six Sigma/i,
    resource: {
      certifier: "ASQ / IASSC-style Six Sigma certifying bodies",
      verifyAtUrl: "https://asq.org/cert",
    },
  },
  {
    match: /AQB|appraiser/i,
    resource: {
      certifier: "Appraisal Qualifications Board / state appraiser boards",
      verifyAtUrl: "https://www.appraisalfoundation.org",
    },
  },
  {
    match: /NAVTA|veterinary assistant/i,
    resource: {
      certifier: "NAVTA / employer veterinary assistant competencies",
      verifyAtUrl: "https://www.navta.net",
    },
  },
  {
    match: /alcohol server|TIPS/i,
    resource: {
      certifier: "State alcohol server / responsible beverage programs",
      verifyAtUrl: "https://www.usa.gov/state-government",
    },
  },
  {
    match: /scribe|ACMSS/i,
    resource: {
      certifier: "Employer / ACMSS-style medical scribe competencies",
      verifyAtUrl: "https://acmss.org",
    },
  },
  {
    match: /PT aide|physical therapy aide/i,
    resource: {
      certifier: "Employer / state physical therapy aide rules",
      verifyAtUrl: "https://www.apta.org",
    },
  },
  {
    match: /notary/i,
    resource: {
      certifier: "State notary commissioning office",
      verifyAtUrl: "https://www.nationalnotary.org/knowledge-center/about-notaries/notary-central-filing",
    },
  },
  {
    match: /electrical|plumbing|wastewater|drinking water|pesticide|agriculture/i,
    resource: {
      certifier: "State licensing / operator board",
      verifyAtUrl: "https://www.usa.gov/state-government",
    },
  },
  {
    match: /security licensing/i,
    resource: {
      certifier: "State security / guard licensing board",
      verifyAtUrl: "https://www.usa.gov/state-government",
    },
  },
  {
    match: /nurse aide|NNAAP|Credentia|HHA|medication aide/i,
    resource: {
      certifier: "State nurse aide registry / Credentia NNAAP",
      verifyAtUrl: "https://credentia.com",
    },
  },
];

/** Slug-specific official pages when the body map is too generic. */
const SLUG_RESOURCES: Partial<Record<string, BodyResource>> = {
  "sie-full-mock": {
    certifier: "FINRA",
    verifyAtUrl:
      "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie",
    sources: [
      {
        label: "SIE exam overview",
        url: "https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam-sie",
      },
      {
        label: "SIE content outline (PDF)",
        url: "https://www.finra.org/sites/default/files/SIE_Content_Outline.pdf",
      },
    ],
  },
  "series-7-readiness-check": {
    certifier: "FINRA",
    verifyAtUrl: "https://www.finra.org/registration-exams-ce/qualification-exams/series7-exam",
  },
  "series-63-readiness-check": {
    certifier: "NASAA",
    verifyAtUrl: "https://www.nasaa.org/exams/",
  },
  "gmat-focus-readiness-check": {
    certifier: "GMAC",
    verifyAtUrl: "https://www.mba.com/exams/gmat-exam/about/exam-structure",
  },
  "sat-readiness-check": {
    certifier: "College Board",
    verifyAtUrl: "https://satsuite.collegeboard.org/sat/whats-on-the-test/structure",
  },
  "gre-readiness-check": {
    certifier: "ETS",
    verifyAtUrl: "https://www.ets.org/gre/test-takers/general-test/prepare/test-structure.html",
  },
  "pmp-readiness-check": {
    certifier: "PMI",
    verifyAtUrl: "https://www.pmi.org/certifications/project-management-pmp",
  },
  "california-real-estate-readiness-check": {
    certifier: "California Department of Real Estate (DRE)",
    verifyAtUrl: "https://www.dre.ca.gov",
  },
  "fl-real-estate-readiness-check": {
    certifier: "Florida Real Estate Commission / DBPR",
    verifyAtUrl: "https://www.myfloridalicense.com/DBPR/real-estate-commission/",
  },
  "tx-real-estate-readiness-check": {
    certifier: "Texas Real Estate Commission (TREC)",
    verifyAtUrl: "https://www.trec.texas.gov",
  },
  "ny-real-estate-readiness-check": {
    certifier: "New York Department of State",
    verifyAtUrl: "https://dos.ny.gov/real-estate-broker-and-salesperson",
  },
  "cdl-general-knowledge-readiness-check": {
    certifier: "State DMV / FMCSA",
    verifyAtUrl: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
    sources: [
      {
        label: "FMCSA CDL",
        url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license",
      },
      {
        label: "Find your state CDL manual",
        url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license/drivers",
      },
    ],
  },
  "nha-ccma-readiness-check": {
    certifier: "National Healthcareer Association (NHA)",
    verifyAtUrl: "https://www.nhanow.com/certification/nha-certifications/certified-clinical-medical-assistant-(ccma)",
  },
  "ptcb-pharmacy-technician-mock": {
    certifier: "Pharmacy Technician Certification Board (PTCB)",
    verifyAtUrl: "https://ptcb.org/credentials/certification/certified-pharmacy-technician/",
  },
  "servsafe-manager-mock": {
    certifier: "ServSafe / National Restaurant Association",
    verifyAtUrl: "https://www.servsafe.com/ServSafe-Manager",
  },
  "toefl-ibt-readiness-check": {
    certifier: "ETS",
    verifyAtUrl: "https://www.ets.org/toefl.html",
  },
  "praxis-core-readiness-check": {
    certifier: "ETS",
    verifyAtUrl: "https://www.ets.org/praxis.html",
  },
};

/** State real-estate commission home pages keyed by slug prefix / known slug. */
const STATE_RE_RESOURCES: Partial<Record<string, BodyResource>> = {
  "az-real-estate-readiness-check": {
    certifier: "Arizona Department of Real Estate",
    verifyAtUrl: "https://www.azre.gov",
  },
  "ga-real-estate-readiness-check": {
    certifier: "Georgia Real Estate Commission",
    verifyAtUrl: "https://www.grec.state.ga.us",
  },
  "il-real-estate-readiness-check": {
    certifier: "Illinois IDFPR — Real Estate",
    verifyAtUrl: "https://idfpr.illinois.gov/profs/re.html",
  },
  "oh-real-estate-readiness-check": {
    certifier: "Ohio Division of Real Estate",
    verifyAtUrl: "https://com.ohio.gov/divisions-and-programs/real-estate-and-professional-licensing",
  },
  "pa-real-estate-readiness-check": {
    certifier: "Pennsylvania Real Estate Commission",
    verifyAtUrl: "https://www.dos.pa.gov/ProfessionalLicensing/BoardsCommissions/RealEstateCommission",
  },
  "nc-real-estate-readiness-check": {
    certifier: "North Carolina Real Estate Commission",
    verifyAtUrl: "https://www.ncrec.gov",
  },
  "va-real-estate-readiness-check": {
    certifier: "Virginia DPOR — Real Estate",
    verifyAtUrl: "https://www.dpor.virginia.gov/Boards/Real-Estate",
  },
  "wa-real-estate-readiness-check": {
    certifier: "Washington DOL — Real Estate",
    verifyAtUrl: "https://www.dol.wa.gov/professional-licenses/real-estate",
  },
  "co-real-estate-readiness-check": {
    certifier: "Colorado Real Estate Commission",
    verifyAtUrl: "https://dre.colorado.gov",
  },
  "nj-real-estate-readiness-check": {
    certifier: "New Jersey Real Estate Commission",
    verifyAtUrl: "https://www.nj.gov/dobi/division_rec/",
  },
  "ma-real-estate-readiness-check": {
    certifier: "Massachusetts Board of Registration of Real Estate Brokers and Salespersons",
    verifyAtUrl: "https://www.mass.gov/orgs/board-of-registration-of-real-estate-brokers-and-salespersons",
  },
  "mi-real-estate-readiness-check": {
    certifier: "Michigan LARA — Real Estate",
    verifyAtUrl: "https://www.michigan.gov/lara/bureau-list/bpl/occ/prof/real-estate",
  },
};

function resolveBodyResource(examBody: string): BodyResource | null {
  for (const entry of BODY_RESOURCES) {
    const ok =
      typeof entry.match === "string"
        ? examBody === entry.match
        : entry.match.test(examBody);
    if (ok) return entry.resource;
  }
  return null;
}

function uniqueSources(sources: OfficialResourceLink[]): OfficialResourceLink[] {
  const seen = new Set<string>();
  return sources.filter((source) => {
    if (seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

export function getMockOfficialResources(config: MockExamConfig): MockOfficialResources {
  const profile = getExamFactsProfileForDeck(config.linkedDeckSlug);
  const slugHit = SLUG_RESOURCES[config.slug] ?? STATE_RE_RESOURCES[config.slug];
  const bodyHit = resolveBodyResource(config.examBody);

  const certifier =
    profile?.exam_facts.administered_by ??
    slugHit?.certifier ??
    bodyHit?.certifier ??
    config.examBody;

  const verifyAtUrl =
    profile?.exam_facts.verify_at_url ??
    slugHit?.verifyAtUrl ??
    bodyHit?.verifyAtUrl ??
    null;

  const sources = uniqueSources([
    ...(profile?.official_sources ?? []),
    ...(slugHit?.sources ?? []),
    ...(bodyHit?.sources ?? []),
    ...(verifyAtUrl
      ? [{ label: `Official ${config.shortTitle} resources`, url: verifyAtUrl }]
      : []),
  ]).slice(0, 5);

  const trustLine = verifyAtUrl
    ? `Topic weights and timing follow published ${certifier} outlines. Verify fees and scheduling on the official site — UniPrep2Go questions are independent study aids.`
    : `Topic weights and timing follow published ${certifier} outlines and candidate handbooks. UniPrep2Go questions are independent study aids — not official exam material.`;

  return {
    certifier,
    verifyAtUrl,
    sources,
    trustLine,
  };
}
