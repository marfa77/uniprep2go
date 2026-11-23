import { MOCK_VERTICALS } from "./mock-exams/taxonomy";
import type { MockVerticalId } from "./mock-exams/types";

/** Canonical hub paths that receive the "About these exams" block (spec §2). */
export const MOCK_VERTICAL_HUB_PREFIX = "/mock-exams/v/" as const;

export const EXTRA_HUB_PATHS = [
  "/mock-exams",
  "/decks",
  "/finance-anki-decks",
  "/building-certification-anki-decks",
  "/language-certification-decks",
] as const;

export type ExtraHubPath = (typeof EXTRA_HUB_PATHS)[number];

export type MockVerticalHubPath = `${typeof MOCK_VERTICAL_HUB_PREFIX}${MockVerticalId}`;

export type HubPath = MockVerticalHubPath | ExtraHubPath;

export type HubFaq = { question: string; answer: string };

export type HubIntroEntry = {
  intro: string;
  faqs?: HubFaq[];
};

export const MOCK_PASS_PRICE_PHRASE = "UniPrep Mock Pass $19, unlimited mocks";

export function mockVerticalHubPath(verticalId: MockVerticalId): MockVerticalHubPath {
  return `${MOCK_VERTICAL_HUB_PREFIX}${verticalId}`;
}

export const HUB_PATHS: HubPath[] = [
  ...MOCK_VERTICALS.map((v) => mockVerticalHubPath(v.id)),
  ...EXTRA_HUB_PATHS,
];

export const hubIntros: Record<HubPath, HubIntroEntry> = {
  "/mock-exams/v/licensing": {
    intro: `## FINRA, NASAA, and state insurance

FINRA writes qualification outlines for the Securities Industry Essentials exam and for Series 6, 7, 63, 65, 66, 79, and 99 pathways. NASAA publishes state securities agent and investment adviser law frameworks used on many Series 63 and 65 sittings. State insurance departments supervise life, health, property, and casualty producer licenses that hybrid advisors stack beside securities registrations.

## Study order that matches sponsorship

Unsponsored candidates usually open the [SIE full mock](/mock-exams/sie-full-mock) before any principal registration. Broker-dealer hires align [Series 7 practice test](/mock-exams/series-7-readiness-check) or Series 6 mocks with the registration their firm files. NASAA law diagnostics such as the [Series 63 readiness check](/mock-exams/series-63-readiness-check) follow once you know your state matrix.

## Nearby UniPrep entry points

Stack flashcards from the [SIE Anki deck](/decks/sie-exam-anki-deck) when fundamentals still miss after a Series session. Charter-track colleagues may parallel the [finance credential hub](/mock-exams/v/finance).

## Study discipline

Silence notifications during Series timers so suitability judgment mirrors proctored pacing. Compliance officers sometimes ask which outlines you used; keep FINRA URLs in browser history for those conversations.

## Mocks, decks, retakes

The licensing hub path on /mock-exams/v/licensing is a menu, not a marathon: sit one timed mock, export the topic report, and import the SIE Anki deck. Candidates who miss options disclosure twice usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; licensing hub flashcards still checkout separately on Gumroad. Verify FINRA fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/licensing before you pay an official vendor.

## Handbooks stay primary

FINRA Rule Book excerpts, firm element syllabi, and NASAA Law Manual chapters should stay open while you review readiness explanations. Sponsored candidates must confirm registration category with compliance before treating a Series score as decisive.`,
    faqs: [
      {
        question: "Which exam in this path should I take first?",
        answer: "Begin with the SIE practice test when you carry no FINRA qualifications. Add Series 6 or Series 7 mocks after your sponsor confirms registrations, then layer NASAA state-law mocks your regulator expects.",
      }
    ]
  },
  "/mock-exams/v/finance": {
    intro: `## Institutes behind finance credentials

CFA Institute governs the Chartered Financial Analyst curriculum through Level II on this hub. GARP owns Financial Risk Manager Part I testing. CFP Board sets the Certified Financial Planner exam. The Internal Revenue Service oversees Enrolled Agent specialization. GMAC delivers GMAT Focus Edition specs; ETS publishes GRE content; College Board maintains SAT admissions material.

## Credential-specific diagnostics

Portfolio hires lean on [CFA Level 1 practice test](/mock-exams/cfa-level-1-readiness-check) sessions before Level II drills. Risk desks pair [FRM Part 1 practice test](/mock-exams/frm-part-1-readiness-check) work with desk models. Planners open [CFP certification readiness](/mock-exams/cfp-certification-readiness-check); tax specialists use [Enrolled Agent readiness](/mock-exams/enrolled-agent-readiness-check).

## Catalog cross-links

Licensing colleagues cross-reference the [FINRA practice hub](/mock-exams/v/licensing). Purchasable flashcards live on [finance Anki decks](/finance-anki-decks).

## Study discipline

Charter and admissions exams punish fatigue; schedule CFA or GMAT mocks when mental math peaks. Split sessions if outlines span multiple textbooks.

## Mocks, decks, retakes

The finance hub path on /mock-exams/v/finance is a menu, not a marathon: sit one timed mock, export the topic report, and import the Level I deck. Candidates who fail ethics bands twice usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; finance hub flashcards still checkout separately on Gumroad. Verify CFA Institute fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/finance before you pay an official vendor.

## Handbooks stay primary

CFA Institute curriculum PDFs, GARP readings, CFP Board standards, and IRS Enrolled Agent circulars outrank any flashcard shorthand. Graduate schools publish their own score policies, so keep GMAC and ETS bulletins beside admissions portals.`
  },
  "/mock-exams/v/real-estate": {
    intro: `## Commissions and national frameworks

State real estate commissions approve education and appoint PSI or Pearson VUE vendors for license exams. Appraisal Qualifications Board standards shape appraiser pathways. Nationwide Multistate Licensing System registration supports mortgage loan originators while state agencies keep local knowledge tests.

## Pick the state that matches your application

California filers start [California real estate practice](/mock-exams/california-real-estate-readiness-check); Texas candidates use [Texas practice test](/mock-exams/tx-real-estate-readiness-check). Appraisal trainees pivot to [real estate appraiser readiness](/mock-exams/real-estate-appraiser-readiness-check). Originators confirm education vendors before [mortgage loan originator readiness](/mock-exams/mortgage-loan-originator-readiness-check).

## Sibling hubs

Compare securities licensing via the [FINRA hub](/mock-exams/v/licensing). Import flashcards from the [deck catalog](/decks) once diagnostics expose weak statute bands.

## Study discipline

Mortgage math belongs on scratch paper with the same calculator your state bulletin allows. Practice with that setup so pacing survives long item sets.

## Mocks, decks, retakes

The real estate hub path on /mock-exams/v/real-estate is a menu, not a marathon: sit one timed mock, export the topic report, and import the state deck. Candidates who miss license-law items usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; real estate hub flashcards still checkout separately on Gumroad. Verify state commission fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/real-estate before you pay an official vendor.

## Handbooks stay primary

State candidate handbooks from DBPR, TREC, CalDRE, or NYDOS list tab allowances, math tools, and hour certificates UniPrep cannot verify. Commission websites remain authoritative for examination outlines and scheduling vendors.`
  },
  "/mock-exams/v/transport": {
    intro: `## FMCSA model and state DMVs

Federal Motor Carrier Safety Administration rules define commercial driver medical, knowledge, and skills expectations that states adopt. Each driver licensing agency delivers knowledge exams and schedules range skills. Endorsements add tank, hazmat, passenger, or school bus items with separate federal and state paperwork.

## Endorsement sequence

New applicants run [CDL general knowledge readiness](/mock-exams/cdl-general-knowledge-readiness-check), then [air brakes](/mock-exams/cdl-air-brakes-readiness-check) and [combination vehicles](/mock-exams/cdl-combination-readiness-check) when tractor-trailer training begins. Hazmat freight roles add [hazmat endorsement readiness](/mock-exams/cdl-hazmat-readiness-check) only after employer clearance.

## Warehouse crossover

Yard operators sometimes add [forklift operator readiness](/mock-exams/forklift-operator-readiness-check) from the [trades practice hub](/mock-exams/v/trades).

## Study discipline

Read endorsement charts aloud once a week; auditory review helps when yard shifts limit screen time. Pair knowledge mocks with behind-the-wheel journaling.

## Mocks, decks, retakes

The CDL hub path on /mock-exams/v/transport is a menu, not a marathon: sit one timed mock, export the topic report, and drill endorsement cards manually. Candidates who fail air-brake stems usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; CDL hub flashcards still checkout separately on Gumroad. Verify FMCSA fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/transport before you pay an official vendor.

## Handbooks stay primary

State CDL manuals published by your driver licensing agency include endorsement charts and medical card rules that vary by domicile. FMCSA guidance explains federal minimums, but the DMV clerk enforces your state's form.



Outline note 1 on /mock-exams/v/transport: bookmark FMCSA updates so renamed domains on your CDL hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/allied-health": {
    intro: `## Certifiers for allied clinical roles

National Healthcareer Association, American Association of Medical Assistants, Pharmacy Technician Certification Board, ExCPT, NBRC, BONENT, and related bodies publish outlines for assistants, technicians, scribes, dialysis techs, and respiratory pathways. Employers and schools still verify the certifier bulletin tied to your program.

## Role-first mock choice

Pharmacy counters open [PTCB pharmacy technician mock](/mock-exams/ptcb-pharmacy-technician-mock). Dialysis clinics use [CCHT dialysis readiness](/mock-exams/ccht-dialysis-readiness-check). Respiratory hires bench [NBRC TMC readiness](/mock-exams/nbrc-tmc-readiness-check). Medical assistants compare NHA CCMA versus AAMA CMA mocks on the list below this article.

## Imaging and optics tangents

Ultrasound trainees may cross-link [ARDMS SPI readiness](/mock-exams/ardms-spi-readiness-check). Optical retail staff review [ABO optician readiness](/mock-exams/abo-optician-readiness-check).

## Study discipline

Clinical shifts shorten study blocks; run high-value mocks after work when memory is fresh. Label flashcards by procedure cluster from the official outline.

## Mocks, decks, retakes

The allied-health hub path on /mock-exams/v/allied-health is a menu, not a marathon: sit one timed mock, export the topic report, and import the CCMA deck. Candidates who miss clinical safety usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; allied-health hub flashcards still checkout separately on Gumroad. Verify NHA fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/allied-health before you pay an official vendor.

## Handbooks stay primary

NHA, AAMA, PTCB, and NBRC student manuals define clinical skills checkoffs and jurisprudence modules outside timed mocks. Employers may require live preceptorship logs that flashcards cannot replace.



Outline note 2 on /mock-exams/v/allied-health: bookmark NHA updates so renamed domains on your allied-health hub calendar do not collide with vacation plans.`,
    faqs: [
      {
        question: "Which allied-health mock should I run first?",
        answer: "Match the mock to the credential your employer or program named in writing. Pharmacy staff start PTCB-style diagnostics; dialysis benches start CCHT themes; respiratory hires start TMC-style checks.",
      }
    ]
  },
  "/mock-exams/v/ems": {
    intro: `## NREMT and state EMS offices

National Registry of Emergency Medical Technicians delivers cognitive exams for EMR, EMT, Advanced EMT, and Paramedic scopes. State EMS offices authorize practical skills, protocols, and continuing education. American Heart Association materials inform BLS science referenced inside many EMS programs.

## Pick the scope you are pursuing

First responders begin [NREMT EMR readiness](/mock-exams/nremt-emr-readiness-check). Ambulance hires use [NREMT EMT readiness](/mock-exams/nremt-emt-readiness-check). Advanced providers stack [NREMT AEMT readiness](/mock-exams/nremt-aemt-readiness-check) before [NREMT Paramedic readiness](/mock-exams/nremt-paramedic-readiness-check).

## AHA crossover

BLS renewal candidates may also open [AHA BLS provider readiness](/mock-exams/aha-bls-provider-readiness-check) on the [CPR hub](/mock-exams/v/cpr).

## Study discipline

Rotate cardio and trauma mocks to mirror NREMT cluster rotation. Hydrate before long paramedic sessions.

## Mocks, decks, retakes

The EMS hub path on /mock-exams/v/ems is a menu, not a marathon: sit one timed mock, export the topic report, and study airway flashcards. Candidates who miss cardiology clusters usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; EMS hub flashcards still checkout separately on Gumroad. Verify NREMT fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/ems before you pay an official vendor.

## Handbooks stay primary

NREMT score reports and state EMS office protocols govern practical psychomotor exams and scope of practice. AHA science compendiums should accompany any BLS refresher you schedule after cognitive prep.



Outline note 3 on /mock-exams/v/ems: bookmark NREMT updates so renamed domains on your EMS hub calendar do not collide with vacation plans.

Outline note 4 on /mock-exams/v/ems: bookmark NREMT updates so renamed domains on your EMS hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/cpr": {
    intro: `## AHA Training Network

American Heart Association Training Centers issue BLS, ACLS, and PALS cards after skills verification. Authorized instructors follow AHA science updates for adult, child, and infant CPR, AED placement, and team drills.

## Written-style diagnostic

Healthcare students run [AHA BLS provider readiness](/mock-exams/aha-bls-provider-readiness-check) before a provider course. Lay rescuer themes appear on [first aid CPR readiness](/mock-exams/first-aid-cpr-readiness-check). EMS peers compare [NREMT EMT readiness](/mock-exams/nremt-emt-readiness-check) on the [EMS hub](/mock-exams/v/ems).

## Skills reality

Cards still require in-person manikin testing through an authorized Training Center; knowledge mocks never replace skills verification.

## Study discipline

Sit BLS mocks sitting upright as if at a computer kiosk, not lying in bed. Schedule manikin skills soon after a strong score.

## Mocks, decks, retakes

The CPR hub path on /mock-exams/v/cpr is a menu, not a marathon: sit one timed mock, export the topic report, and rehearse megacode steps. Candidates who miss AED prompts usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; CPR hub flashcards still checkout separately on Gumroad. Verify AHA fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/cpr before you pay an official vendor.

## Handbooks stay primary

Authorized AHA Training Centers issue the only BLS cards employers accept. Science updates post on heart.org; UniPrep diagnostics simply rehearse multiple-choice pathways ahead of manikin testing.



Outline note 5 on /mock-exams/v/cpr: bookmark AHA updates so renamed domains on your CPR hub calendar do not collide with vacation plans.

Outline note 6 on /mock-exams/v/cpr: bookmark AHA updates so renamed domains on your CPR hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/nursing": {
    intro: `## NCSBN and nurse aide programs

National Council of State Boards of Nursing develops NCLEX-RN and NCLEX-PN exam plans delivered through Pearson VUE. State-approved nurse aide programs feed NNAAP CNA exams administered through regional vendors.

## Ladder-specific mocks

Nurse aide students open [NNAAP CNA readiness](/mock-exams/nnaap-cna-readiness-check). Practical nurses use [NCLEX-PN readiness](/mock-exams/nclex-pn-readiness-check). Registered nurses bench [NCLEX-RN readiness](/mock-exams/nclex-rn-readiness-check) when listed for their filing state.

## Allied crossover

Medication aide candidates may review [medication aide readiness](/mock-exams/medication-aide-readiness-check). Home health aides use [home health aide readiness](/mock-exams/home-health-aide-readiness-check).

## Study discipline

Alternate pharmacology and safety mocks weekly so PN and RN sittings stay balanced.

## Mocks, decks, retakes

The nursing hub path on /mock-exams/v/nursing is a menu, not a marathon: sit one timed mock, export the topic report, and import PN or RN decks. Candidates who miss pharmacology usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; nursing hub flashcards still checkout separately on Gumroad. Verify NCSBN fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/nursing before you pay an official vendor.

## Handbooks stay primary

NCSBN candidate guides and your nursing program handbook define CAT behavior, breaks, and authorization to test. Nurse aide programs still require clinical hours verified by instructors before NNAAP scheduling.



Outline note 7 on /mock-exams/v/nursing: bookmark NCSBN updates so renamed domains on your nursing hub calendar do not collide with vacation plans.

Outline note 8 on /mock-exams/v/nursing: bookmark NCSBN updates so renamed domains on your nursing hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/health-admin": {
    intro: `## Coding and billing authorities

AAPC publishes Certified Professional Coder exam domains. AHIMA maintains inpatient coding credentials such as CCS themes. CMS guidance and HIPAA privacy rules inform medical billing pathways on this hub.

## Credential alignment

Outpatient coders bench [AAPC CPC readiness](/mock-exams/aapc-cpc-readiness-check). Inpatient reviewers use [AAPC CCS readiness](/mock-exams/aapc-ccs-readiness-check). Billers run [medical billing specialist readiness](/mock-exams/medical-billing-specialist-readiness-check); scribes cross-check [medical scribe readiness](/mock-exams/medical-scribe-readiness-check).

## Clinical tangent

Assistants stacking dual roles sometimes open [NHA CCMA readiness](/mock-exams/nha-ccma-readiness-check) on the [allied-health hub](/mock-exams/v/allied-health).

## Study discipline

Code guideline mocks deserve a quiet desk with printed tab markers just like audit week.

## Mocks, decks, retakes

The coding hub path on /mock-exams/v/health-admin is a menu, not a marathon: sit one timed mock, export the topic report, and tab ICD guidelines. Candidates who miss E/M logic usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; coding hub flashcards still checkout separately on Gumroad. Verify AAPC fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/health-admin before you pay an official vendor.

## Handbooks stay primary

AAPC and AHIMA code books, CMS manuals, and HIPAA privacy notices remain open-book references in real coding jobs. Certification vendors set exam windows; mocks only approximate difficulty.



Outline note 9 on /mock-exams/v/health-admin: bookmark AAPC updates so renamed domains on your coding hub calendar do not collide with vacation plans.

Outline note 10 on /mock-exams/v/health-admin: bookmark AAPC updates so renamed domains on your coding hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/bodywork": {
    intro: `## FSMTB and state massage boards

Federation of State Massage Therapy Boards delivers the Massage & Bodywork Licensing Examination. Individual massage boards set jurisprudence, ethics, and practical hour rules.

## MBLEx-focused diagnostic

Massage students run [MBLEx readiness](/mock-exams/mblex-readiness-check) before state jurisprudence exams. Spa managers comparing aesthetics licensing may browse [esthetician readiness](/mock-exams/esthetician-state-readiness-check) on the [beauty hub](/mock-exams/v/beauty).

## Wellness crossover

Personal trainers sometimes add [ACE CPT readiness](/mock-exams/ace-cpt-readiness-check) listed under [fitness practice tests](/mock-exams/v/fitness).

## Study discipline

Anatomy mocks benefit from palpation practice between sessions.

## Mocks, decks, retakes

The bodywork hub path on /mock-exams/v/bodywork is a menu, not a marathon: sit one timed mock, export the topic report, and revisit anatomy decks. Candidates who miss kinesiology usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; bodywork hub flashcards still checkout separately on Gumroad. Verify FSMTB fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/bodywork before you pay an official vendor.

## Handbooks stay primary

FSMTB content outlines and your state massage statutes include ethics scenarios tied to local advertising laws. Jurisprudence exams may require notarized applications apart from MBLEx cognitive scores.



Outline note 11 on /mock-exams/v/bodywork: bookmark FSMTB updates so renamed domains on your bodywork hub calendar do not collide with vacation plans.

Outline note 12 on /mock-exams/v/bodywork: bookmark FSMTB updates so renamed domains on your bodywork hub calendar do not collide with vacation plans.

Outline note 13 on /mock-exams/v/bodywork: bookmark FSMTB updates so renamed domains on your bodywork hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/beauty": {
    intro: `## State cosmetology boards

State boards of cosmetology and barbering approve curricula and written exams for cosmetologists, estheticians, nail technicians, and barbers. National Interstate Council of State Boards of Cosmetology influences model language but each state finalizes its own statute book.

## License-type selection

Full-service salon candidates run [cosmetology state readiness](/mock-exams/cosmetology-state-readiness-check). Skin care studios focus on [esthetician state readiness](/mock-exams/esthetician-state-readiness-check). Nail salons use [nail technician state readiness](/mock-exams/nail-technician-state-readiness-check); barber shops open [barber state readiness](/mock-exams/barber-state-readiness-check).

## Massage tangent

Therapeutic massage applicants may instead need [MBLEx readiness](/mock-exams/mblex-readiness-check) on the [bodywork hub](/mock-exams/v/bodywork).

## Study discipline

Sanitation drills should follow salon mock days while scent and workflow cues are fresh.

## Mocks, decks, retakes

The beauty hub path on /mock-exams/v/beauty is a menu, not a marathon: sit one timed mock, export the topic report, and review sanitation flashcards. Candidates who miss chemical safety usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; beauty hub flashcards still checkout separately on Gumroad. Verify state board fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/beauty before you pay an official vendor.

## Handbooks stay primary

State board statutes spell sanitation timers, chemical storage, and booth rental rules that change with each legislative session. Candidate bulletins list allowed tools and language accommodations.



Outline note 14 on /mock-exams/v/beauty: bookmark state board updates so renamed domains on your beauty hub calendar do not collide with vacation plans.

Outline note 15 on /mock-exams/v/beauty: bookmark state board updates so renamed domains on your beauty hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/fitness": {
    intro: `## Accredited trainer certifiers

National Academy of Sports Medicine, American Council on Exercise, International Sports Sciences Association, American College of Sports Medicine, and National Strength and Conditioning Association each publish personal trainer certification exams.

## CPT selection

Gym hires commonly open [NASM CPT readiness](/mock-exams/nasm-cpt-readiness-check) or [ACE CPT readiness](/mock-exams/ace-cpt-readiness-check). Clinical exercise paths review [ACSM CPT readiness](/mock-exams/acsm-cpt-readiness-check). Strength coaches stack [CSCS NSCA readiness](/mock-exams/cscs-nsca-readiness-check) after undergraduate exercise science coursework.

## Nutrition tangent

Coaches advising macros sometimes cross-link [Precision Nutrition L1 readiness](/mock-exams/precision-nutrition-l1-readiness-check) beside [nutrition hub](/mock-exams/v/nutrition) dietetics paths.

## Study discipline

Program design mocks pair well with video review of your own client sessions.

## Mocks, decks, retakes

The fitness hub path on /mock-exams/v/fitness is a menu, not a marathon: sit one timed mock, export the topic report, and import CPT cards. Candidates who miss program design usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; fitness hub flashcards still checkout separately on Gumroad. Verify NASM fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/fitness before you pay an official vendor.

## Handbooks stay primary

NASM, ACE, ISSA, ACSM, and NSCA candidate handbooks describe retest windows and continuing education that timed mocks cannot waive. Facility insurance may still demand live CPR cards.



Outline note 16 on /mock-exams/v/fitness: bookmark NASM updates so renamed domains on your fitness hub calendar do not collide with vacation plans.

Outline note 17 on /mock-exams/v/fitness: bookmark NASM updates so renamed domains on your fitness hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/dental": {
    intro: `## DANB and dental hygiene boards

Dental Assisting National Board delivers Infection Control and General Chairside exams. Dental hygiene licensure combines written exams such as NBDHE with regional clinical boards.

## Chairside versus hygiene

Assistants bench [DANB ICE readiness](/mock-exams/danb-ice-readiness-check) and [DANB GC readiness](/mock-exams/danb-gc-readiness-check). Hygiene students run [NBDHE readiness](/mock-exams/nbdhe-readiness-check) before clinical scheduling.

## Sterile processing

Surgical support staff may add [CRCST readiness](/mock-exams/crcst-readiness-check) from the [surgical hub](/mock-exams/v/surgical).

## Study discipline

Infection control mocks deserve the same PPE mindset you use in clinic.

## Mocks, decks, retakes

The dental hub path on /mock-exams/v/dental is a menu, not a marathon: sit one timed mock, export the topic report, and drill infection control. Candidates who miss ICE stems usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; dental hub flashcards still checkout separately on Gumroad. Verify DANB fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/dental before you pay an official vendor.

## Handbooks stay primary

DANB exam outlines and regional hygiene clinical boards set instrumentation lists and patient safety ratios. Radiation safety certificates may be required before chairside or hygiene licensure.



Outline note 18 on /mock-exams/v/dental: bookmark DANB updates so renamed domains on your dental hub calendar do not collide with vacation plans.

Outline note 19 on /mock-exams/v/dental: bookmark DANB updates so renamed domains on your dental hub calendar do not collide with vacation plans.

Outline note 20 on /mock-exams/v/dental: bookmark DANB updates so renamed domains on your dental hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/surgical": {
    intro: `## NBSTSA and sterile processing bodies

National Board of Surgical Technology and Surgical Assisting owns CST exam content. International Association of Healthcare Central Service Materiel Management sets CRCST certification topics for sterile processing departments.

## OR versus SPD paths

Scrub tech candidates use [NBSTSA CST readiness](/mock-exams/nbstsa-cst-readiness-check). Sterile processing techs run [CRCST readiness](/mock-exams/crcst-readiness-check). Dialysis clinics sometimes cross-train [CCHT readiness](/mock-exams/ccht-dialysis-readiness-check).

## Dental tangent

Dental assistants reviewing chairside asepsis may open [DANB ICE readiness](/mock-exams/danb-ice-readiness-check) on the [dental hub](/mock-exams/v/dental).

## Study discipline

Sterile technique flashcards should be reviewed beside tray photos from your hospital.

## Mocks, decks, retakes

The surgical hub path on /mock-exams/v/surgical is a menu, not a marathon: sit one timed mock, export the topic report, and review sterile technique. Candidates who miss tray setup usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; surgical hub flashcards still checkout separately on Gumroad. Verify NBSTSA fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/surgical before you pay an official vendor.

## Handbooks stay primary

NBSTSA and IAHCSMM manuals emphasize sterility breaches and tray assembly standards best practiced in labs. Hospital credentialing committees review cases beyond any multiple-choice score.



Outline note 21 on /mock-exams/v/surgical: bookmark NBSTSA updates so renamed domains on your surgical hub calendar do not collide with vacation plans.

Outline note 22 on /mock-exams/v/surgical: bookmark NBSTSA updates so renamed domains on your surgical hub calendar do not collide with vacation plans.

Outline note 23 on /mock-exams/v/surgical: bookmark NBSTSA updates so renamed domains on your surgical hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/imaging": {
    intro: `## ARDMS physics gate

American Registry for Diagnostic Medical Sonography delivers the Sonography Principles & Instrumentation exam as a physics gate before specialty practicum credentials.

## SPI-first sequencing

Ultrasound students almost always begin [ARDMS SPI readiness](/mock-exams/ardms-spi-readiness-check) before abdominal or OB specialty seats. Respiratory imaging colleagues may compare [NBRC TMC readiness](/mock-exams/nbrc-tmc-readiness-check). Cardiology fellows cross-link [RD exam readiness](/mock-exams/rd-exam-readiness-check) on the [nutrition hub](/mock-exams/v/nutrition).

## Deck note

When SPI physics fails repeatedly, import the [ARDMS SPI Anki deck](/decks/ardms-spi-anki-deck) linked from the mock page.

## Study discipline

Sketch transducer diagrams after SPI mocks to cement beam geometry.

## Mocks, decks, retakes

The imaging hub path on /mock-exams/v/imaging is a menu, not a marathon: sit one timed mock, export the topic report, and import SPI decks. Candidates who miss transducer physics usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; imaging hub flashcards still checkout separately on Gumroad. Verify ARDMS fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/imaging before you pay an official vendor.

## Handbooks stay primary

ARDMS standards and instruction-directed clinical logs document patient scans that physics questions alone cannot prove. Specialty prerequisites appear in ARDMS policies, not in flashcards.



Outline note 24 on /mock-exams/v/imaging: bookmark ARDMS updates so renamed domains on your imaging hub calendar do not collide with vacation plans.

Outline note 25 on /mock-exams/v/imaging: bookmark ARDMS updates so renamed domains on your imaging hub calendar do not collide with vacation plans.

Outline note 26 on /mock-exams/v/imaging: bookmark ARDMS updates so renamed domains on your imaging hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/lab": {
    intro: `## ASCP and phlebotomy certifiers

American Society for Clinical Pathology publishes MLS and MLT exam content outlines. National Healthcareer Association and American Society for Clinical Pathology also govern phlebotomy technician credentials.

## Bench role selection

Medical laboratory scientists run [ASCP MLS readiness](/mock-exams/ascp-mls-readiness-check). Technicians use [ASCP MLT readiness](/mock-exams/ascp-mlt-readiness-check). Phlebotomy drawers compare [NHA CPT phlebotomy readiness](/mock-exams/nha-cpt-phlebotomy-readiness-check) with [ASPT phlebotomy readiness](/mock-exams/aspt-phlebotomy-readiness-check).

## Patient care crossover

Dual-role staff may open [NHA CPCT readiness](/mock-exams/nha-cpct-readiness-check) for patient care technician themes.

## Study discipline

Bank specimen mocks deserve bench cleanup rituals before each retake.

## Mocks, decks, retakes

The laboratory hub path on /mock-exams/v/lab is a menu, not a marathon: sit one timed mock, export the topic report, and repeat hematology cards. Candidates who miss banked specimens usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; laboratory hub flashcards still checkout separately on Gumroad. Verify ASCP fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/lab before you pay an official vendor.

## Handbooks stay primary

ASCP content outlines and laboratory safety data sheets govern reagent handling that automated items simplify. Clinical rotation supervisors sign competency forms external to UniPrep.



Outline note 27 on /mock-exams/v/lab: bookmark ASCP updates so renamed domains on your laboratory hub calendar do not collide with vacation plans.

Outline note 28 on /mock-exams/v/lab: bookmark ASCP updates so renamed domains on your laboratory hub calendar do not collide with vacation plans.

Outline note 29 on /mock-exams/v/lab: bookmark ASCP updates so renamed domains on your laboratory hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/nutrition": {
    intro: `## CDR dietetics gateway

Commission on Dietetic Registration delivers the Registered Dietitian exam after supervised practice. Academy of Nutrition and Dietetics education standards shape prerequisites.

## Dietetics diagnostic

Interns nearing CDR eligibility bench [RD exam readiness](/mock-exams/rd-exam-readiness-check). Fitness coaches exploring lighter nutrition credentials may instead open [Precision Nutrition L1 readiness](/mock-exams/precision-nutrition-l1-readiness-check) on the [fitness hub](/mock-exams/v/fitness).

## Deck path

Import the [RD exam Anki deck](/decks/rd-exam-anki-deck) when clinical calculations remain weak after two timed passes.

## Study discipline

Clinical calculation mocks work best with kitchen scale drills nearby.

## Mocks, decks, retakes

The nutrition hub path on /mock-exams/v/nutrition is a menu, not a marathon: sit one timed mock, export the topic report, and import RD decks. Candidates who miss clinical calculations usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; nutrition hub flashcards still checkout separately on Gumroad. Verify CDR fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/nutrition before you pay an official vendor.

## Handbooks stay primary

CDR eligibility letters and supervised practice portfolios determine when you may sit for the dietitian exam. Academy guidelines on telehealth billing evolve separately from mock content.



Outline note 30 on /mock-exams/v/nutrition: bookmark CDR updates so renamed domains on your nutrition hub calendar do not collide with vacation plans.

Outline note 31 on /mock-exams/v/nutrition: bookmark CDR updates so renamed domains on your nutrition hub calendar do not collide with vacation plans.

Outline note 32 on /mock-exams/v/nutrition: bookmark CDR updates so renamed domains on your nutrition hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/social-work": {
    intro: `## ASWB licensure ladder

Association of Social Work Boards publishes Bachelors, Masters, and Clinical exam outlines used by state licensing boards. Each state still sets supervised hour rules and jurisprudence modules.

## Degree-aligned mocks

BSW graduates run [ASWB Bachelors readiness](/mock-exams/aswb-bachelors-readiness-check). MSW licensees use [ASWB Masters readiness](/mock-exams/aswb-masters-readiness-check). Independent clinical social workers bench [ASWB Clinical readiness](/mock-exams/aswb-clinical-readiness-check).

## Education tangent

School social workers may cross-link [Praxis special education readiness](/mock-exams/praxis-special-education-readiness-check) on the [education hub](/mock-exams/v/education).

## Study discipline

Ethics scenarios deserve reflection journaling after each timed run.

## Mocks, decks, retakes

The social-work hub path on /mock-exams/v/social-work is a menu, not a marathon: sit one timed mock, export the topic report, and review ethics scenarios. Candidates who miss treatment planning usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; social-work hub flashcards still checkout separately on Gumroad. Verify ASWB fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/social-work before you pay an official vendor.

## Handbooks stay primary

ASWB categorization letters and state licensing statutes define supervisor credentials and hour types. Jurisprudence modules vary; always download the PDF your board emails after application approval.



Outline note 33 on /mock-exams/v/social-work: bookmark ASWB updates so renamed domains on your social-work hub calendar do not collide with vacation plans.

Outline note 34 on /mock-exams/v/social-work: bookmark ASWB updates so renamed domains on your social-work hub calendar do not collide with vacation plans.

Outline note 35 on /mock-exams/v/social-work: bookmark ASWB updates so renamed domains on your social-work hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/education": {
    intro: `## Praxis and early childhood bodies

Educational Testing Service delivers Praxis Core and content exams for many states. Council for Professional Recognition owns Child Development Associate assessment pathways.

## Classroom role mocks

Teacher candidates open [Praxis Core readiness](/mock-exams/praxis-core-readiness-check) before content specialties such as [Praxis elementary education readiness](/mock-exams/praxis-elementary-education-readiness-check). Paraeducators use [parapro readiness](/mock-exams/parapro-readiness-check). Childcare leads run [CDA childcare readiness](/mock-exams/cda-childcare-readiness-check).

## Social work crossover

School counselors comparing ASWB paths may browse the [social work hub](/mock-exams/v/social-work).

## Study discipline

Praxis math mocks need the calculator policy your state bulletin lists.

## Mocks, decks, retakes

The education hub path on /mock-exams/v/education is a menu, not a marathon: sit one timed mock, export the topic report, and drill Praxis math. Candidates who miss reading clusters usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; education hub flashcards still checkout separately on Gumroad. Verify ETS fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/education before you pay an official vendor.

## Handbooks stay primary

ETS Praxis bulletins and Council for Professional Recognition handbooks describe calculator policies and portfolio evidence. District HR teams may require background checks before Praxis waivers.



Outline note 36 on /mock-exams/v/education: bookmark ETS updates so renamed domains on your education hub calendar do not collide with vacation plans.

Outline note 37 on /mock-exams/v/education: bookmark ETS updates so renamed domains on your education hub calendar do not collide with vacation plans.

Outline note 38 on /mock-exams/v/education: bookmark ETS updates so renamed domains on your education hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/trades": {
    intro: `## State trade boards and EPA

State electrical, plumbing, and pesticide boards adopt NEC or IPC cycles for journeyman exams. American Water Works Association and state operator programs govern water and wastewater treatment operator licenses. Environmental Protection Agency sets certified applicator categories for pest control.

## Trade-specific mocks

Electricians bench [electrical journeyman readiness](/mock-exams/electrical-journeyman-readiness-check). Plumbers use [plumbing journeyman readiness](/mock-exams/plumbing-journeyman-readiness-check). Treatment plant trainees open [water treatment operator readiness](/mock-exams/water-treatment-operator-1-readiness-check) and [wastewater operator readiness](/mock-exams/wastewater-operator-1-readiness-check).

## Warehouse crossover

Distribution centers add [forklift operator readiness](/mock-exams/forklift-operator-readiness-check). Applicators review [pest control applicator readiness](/mock-exams/pest-control-applicator-readiness-check).

## Study discipline

Electrical mocks benefit from code tabs pre-flagged like exam day.

## Mocks, decks, retakes

The trades hub path on /mock-exams/v/trades is a menu, not a marathon: sit one timed mock, export the topic report, and tab NEC articles. Candidates who miss load math usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; trades hub flashcards still checkout separately on Gumroad. Verify state board fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/trades before you pay an official vendor.

## Handbooks stay primary

Adopted NEC, IPC, or AWWA code cycles printed by your state determine which tables appear on journeyman exams. Apprenticeship committees log on-the-job hours independently of timed diagnostics.



Outline note 39 on /mock-exams/v/trades: bookmark state board updates so renamed domains on your trades hub calendar do not collide with vacation plans.

Outline note 40 on /mock-exams/v/trades: bookmark state board updates so renamed domains on your trades hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/veterinary": {
    intro: `## AVMA and state vet boards

American Veterinary Medical Association partners with Veterinary Technician National Exam committees to deliver VTNE content. State veterinary medical boards license assistants and technicians with species-specific rules.

## Clinic role mocks

Veterinary assistants open [veterinary assistant readiness](/mock-exams/veterinary-assistant-readiness-check) before technician programs. Credentialed tech candidates bench [VTNE readiness](/mock-exams/veterinary-technician-vtne-readiness-check) near graduation.

## Surgical tangent

Surgical support hires may cross-link [NBSTSA CST readiness](/mock-exams/nbstsa-cst-readiness-check) on the [surgical hub](/mock-exams/v/surgical).

## Study discipline

Pharmacology mocks should follow clinic caseload review.

## Mocks, decks, retakes

The veterinary hub path on /mock-exams/v/veterinary is a menu, not a marathon: sit one timed mock, export the topic report, and review pharmacology. Candidates who miss anesthesia usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; veterinary hub flashcards still checkout separately on Gumroad. Verify AVMA fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/veterinary before you pay an official vendor.

## Handbooks stay primary

AVMA accreditation standards and state vet board rules set assistant versus technician tasks in clinic. VTNE authorization arrives through program deans, not through mock scores.



Outline note 41 on /mock-exams/v/veterinary: bookmark AVMA updates so renamed domains on your veterinary hub calendar do not collide with vacation plans.

Outline note 42 on /mock-exams/v/veterinary: bookmark AVMA updates so renamed domains on your veterinary hub calendar do not collide with vacation plans.

Outline note 43 on /mock-exams/v/veterinary: bookmark AVMA updates so renamed domains on your veterinary hub calendar do not collide with vacation plans.`
  },
  "/mock-exams/v/citizenship": {
    intro: `## Immigration authorities

U.S. Citizenship and Immigration Services publishes U.S. civics requirements. UK Home Office oversees Life in the UK tests. Immigration, Refugees and Citizenship Canada governs Discover Canada themes. Home Affairs Australia, Germany Federal Office for Migration and Refugees, and other ministries set naturalization civics for their jurisdictions.

## Country-specific diagnostics

U.S. residents begin [U.S. citizenship readiness](/mock-exams/us-citizenship-readiness-check). UK applicants use [Life in the UK readiness](/mock-exams/life-in-the-uk-readiness-check). Canadian newcomers open [Canadian citizenship readiness](/mock-exams/canadian-citizenship-readiness-check). European residents often pair German Leben in Deutschland or Spanish CCSE study with the matching mock listed below.

## Deck catalog

Pair civics mocks with matching decks such as the [U.S. citizenship Anki deck](/decks/us-citizenship-anki-deck) or browse every pathway on the [deck catalog](/decks).

## Study discipline

Civics mocks deserve the same spoken practice you use for interviews.

## Mocks, decks, retakes

The citizenship hub path on /mock-exams/v/citizenship is a menu, not a marathon: sit one timed mock, export the topic report, and import civics decks. Candidates who miss history items usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; citizenship hub flashcards still checkout separately on Gumroad. Verify USCIS fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/citizenship before you pay an official vendor.

## Handbooks stay primary

USCIS, Home Office, IRCC, and other agencies publish civics updates and interview rubrics that supersede third-party flashcards. Language waivers and disability accommodations must be requested through official portals.



Outline note 44 on /mock-exams/v/citizenship: bookmark USCIS updates so renamed domains on your citizenship hub calendar do not collide with vacation plans.`,
    faqs: [
      {
        question: "Which naturalization mock should I start with?",
        answer: "Choose the country whose passport or settlement route you are actively pursuing. Mixed households may run two diagnostics, but study materials should follow the handbook that authority publishes in the language you will test in.",
      }
    ]
  },
  "/mock-exams/v/building": {
    intro: `## Green building and safety certifiers

U.S. Environmental Protection Agency enforces Section 608 refrigerant rules. U.S. Green Building Council and Green Business Certification Inc. deliver LEED credentials. International WELL Building Institute publishes WELL AP exams. Royal Institution of Chartered Surveyors, National Examination Board in Occupational Safety and Health, and NFPA-related bodies back surveying and safety credentials listed below.

## Facility career sequencing

HVAC techs handling refrigerants start [EPA 608 readiness](/mock-exams/epa-608-readiness-check). Sustainability generalists bench [LEED Green Associate readiness](/mock-exams/leed-green-associate-readiness-check) before [LEED AP BD+C readiness](/mock-exams/leed-ap-bd-c-readiness-check). Wellness consultants open [WELL AP readiness](/mock-exams/well-ap-readiness-check); surveyors use [MRICS readiness](/mock-exams/mrics-readiness-check).

## Deck catalog

Import building flashcards from [building certification Anki decks](/building-certification-anki-decks) once diagnostics show persistent weak domains.

## Study discipline

LEED mocks benefit from handbook tabs for each credit category.

## Mocks, decks, retakes

The building hub path on /mock-exams/v/building is a menu, not a marathon: sit one timed mock, export the topic report, and import LEED decks. Candidates who miss credits usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; building hub flashcards still checkout separately on Gumroad. Verify USGBC fee tables, ID documents, and scheduling windows referenced on /mock-exams/v/building before you pay an official vendor.

## Handbooks stay primary

USGBC, GBCI, IWBI, EPA Section 608, and RICS handbooks carry graphics and tables worth tabbing before specialty AP exams. Safety credentials may require proctored field observations.



Outline note 45 on /mock-exams/v/building: bookmark USGBC updates so renamed domains on your building hub calendar do not collide with vacation plans.`,
    faqs: [
      {
        question: "Which building mock should HVAC techs take first?",
        answer: "Run the EPA 608 readiness check when your job touches refrigerant before pursuing LEED or WELL credentials that assume broader sustainability literacy.",
      }
    ]
  },
  "/mock-exams": {
    intro: `## Entire practice catalog

This index lists every timed readiness check UniPrep2Go publishes, grouped by career vertical. FINRA, NASAA, CFA Institute, NCSBN, FMCSA, USCIS, and dozens of other official bodies define the real exams; our mocks mirror public outline language for independent study.

## Browse by career path

Securities candidates jump to the [licensing hub](/mock-exams/v/licensing). Nurses start the [nursing hub](/mock-exams/v/nursing). Commercial drivers open the [transport hub](/mock-exams/v/transport). Sustainability staff browse the [building hub](/mock-exams/v/building). Finance charter paths live under the [finance hub](/mock-exams/v/finance).

## Deck pairing

Every mock page links to a flashcard product when one exists. Start on the hub that matches your credential, run a diagnostic, then visit the [deck catalog](/decks) for spaced repetition.

## Study discipline

Catalog searches should end in one focused vertical per week to avoid outline overload.

## Mocks, decks, retakes

The practice catalog path on /mock-exams is a menu, not a marathon: sit one timed mock, export the topic report, and open linked decks. Candidates who retry after reports usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; practice catalog flashcards still checkout separately on Gumroad. Verify each certifier fee tables, ID documents, and scheduling windows referenced on /mock-exams before you pay an official vendor.

## Handbooks stay primary

Use this catalog to shortlist mocks, then open each official certifier bulletin before travel or fees. Hub copy cannot track nightly vendor policy edits across every profession listed here.



Outline note 46 on /mock-exams: bookmark each certifier updates so renamed domains on your practice catalog calendar do not collide with vacation plans.`,
    faqs: [
      {
        question: "How do I find the right practice test?",
        answer: "Pick the vertical that matches your job or license application, then choose the mock title that names your certifier. Use on-page search when you already know the acronym.",
      },
      {
        question: "Are UniPrep mocks official exams?",
        answer: "No. They are independent diagnostics with topic scoring. Official exams are delivered by the regulators named on each mock page.",
      },
      {
        question: "What does the first mock cost?",
        answer: "Your first timed attempt per exam path is free. Further retakes use UniPrep Mock Pass unlimited licensing described on each mock page.",
      },
      {
        question: "Do mocks link to Anki decks?",
        answer: "Many mocks link to companion flashcard decks on Gumroad. The mock report should drive which deck domains you import.",
      }
    ]
  },
  "/decks": {
    intro: `## Flashcard catalog scope

This catalog lists Anki and printable study products across finance, licensing, health, building, citizenship, and language pathways. Decks complement timed mocks; they do not replace official candidate handbooks from FINRA, CFA Institute, NCSBN, or other certifiers.

## Shop by outcome

Securities reps shop [finance Anki decks](/finance-anki-decks) and [SIE Anki deck](/decks/sie-exam-anki-deck) bundles. Facilities teams open [building certification Anki decks](/building-certification-anki-decks). Naturalization applicants browse decks beside [citizenship practice tests](/mock-exams/v/citizenship).

## Mock-first workflow

Run the free mock on the matching exam page, read the topic report, then buy the deck that covers domains you missed. Deck checkout prices appear only on individual Gumroad product pages; timed mock retakes follow the site-wide mock licensing block below.

## Language note

Most citizenship decks ship in the language of the official handbook. See [language certification decks](/language-certification-decks) for the smaller language-exam subset.

## Study discipline

Catalog browsing should end in one deck import per evening to protect retention.

## Mocks, decks, retakes

The deck catalog path on /decks is a menu, not a marathon: sit one timed mock, export the topic report, and purchase Gumroad decks. Candidates who retry mocks after imports usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; deck catalog flashcards still checkout separately on Gumroad. Verify each certifier fee tables, ID documents, and scheduling windows referenced on /decks before you pay an official vendor.

## Handbooks stay primary

Gumroad receipts and Anki sync logs prove purchases, but certifiers never accept imported decks as exam admission tickets. Keep emailed outline updates from FINRA, CFA Institute, or state boards in a labeled folder.`,
    faqs: [
      {
        question: "Should I buy a deck before taking a mock?",
        answer: "Run the matching mock first so the topic report tells you whether the deck is worth importing.",
      },
      {
        question: "How do building decks differ from finance decks?",
        answer: "Building products focus on LEED, EPA 608, WELL, and safety credentials. Finance decks target FINRA, CFA, FRM, and related exams.",
      },
      {
        question: "Are sample cards on product pages real?",
        answer: "Yes. Screenshots come from the shipped apkg or PDF listed on Gumroad and on each deck page.",
      },
      {
        question: "Can I use decks without Anki?",
        answer: "Most products require Anki or AnkiMobile. Printable PDF decks note that format on the product page.",
      }
    ]
  },
  "/finance-anki-decks": {
    intro: `## Finance flashcard families

Finance decks here cover FINRA securities, CFA Institute levels, GARP FRM, CFP Board, IRS Enrolled Agent, and related credentials. Content follows published outline keywords; UniPrep2Go is not affiliated with those institutes.

## Pair mocks with decks

Importers usually fail a [SIE full mock](/mock-exams/sie-full-mock) or [CFA Level 1 practice test](/mock-exams/cfa-level-1-readiness-check) first, then buy the deck that names the same credential. Series reps cross-link [Series 7 practice test](/mock-exams/series-7-readiness-check) work with the [Series 7 Anki deck](/decks/series-7-anki-deck).

## Retake policy

Mocks remain free for the first attempt; unlimited timed retakes follow the workflow section below. Deck purchases stay one-time Gumroad transactions per product.

## Broader catalog

Non-finance credentials live on the main [deck catalog](/decks) and [licensing practice hub](/mock-exams/v/licensing).

## Study discipline

Finance deck imports deserve custom study groups per credential to avoid mixing Series outlines.

## Mocks, decks, retakes

The finance deck index path on /finance-anki-decks is a menu, not a marathon: sit one timed mock, export the topic report, and sync Series decks. Candidates who retry securities mocks usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; finance deck index flashcards still checkout separately on Gumroad. Verify FINRA fee tables, ID documents, and scheduling windows referenced on /finance-anki-decks before you pay an official vendor.

## Handbooks stay primary

Securities and charter institutes restrict what you may bring into proctored rooms; decks are for home study only. IRS publications for Enrolled Agents update each filing season with new forms.`,
    faqs: [
      {
        question: "Which finance deck sells the most alongside mocks?",
        answer: "SIE and Series 7 decks are common first purchases after licensing mocks fail risk or customer accounts domains.",
      },
      {
        question: "Do CFA decks include formulas?",
        answer: "Level I and Level II decks include quantitative and ethics cards aligned to outline language. Official CFA Institute policies govern what you may bring into the live test room.",
      },
      {
        question: "Can one deck cover multiple Series exams?",
        answer: "Each deck targets a single FINRA or NASAA exam outline. Buy the deck that matches the mock you failed.",
      },
      {
        question: "Are these decks updated annually?",
        answer: "Product pages note the outline year we targeted. Re-import when your certifier publishes a major outline change.",
      }
    ]
  },
  "/building-certification-anki-decks": {
    intro: `## Built environment flashcards

Building decks span EPA Section 608 refrigerant rules, USGBC LEED Green Associate and AP pathways, IWBI WELL AP concepts, RICS surveying credentials, BMS automation, data-centre operations, and occupational safety themes such as NEBOSH and NFPA fire protection.

## Mock alignment

Technicians usually fail [EPA 608 readiness](/mock-exams/epa-608-readiness-check) or [LEED Green Associate readiness](/mock-exams/leed-green-associate-readiness-check) before buying cards. Advanced designers add [LEED AP BD+C readiness](/mock-exams/leed-ap-bd-c-readiness-check); wellness consultants open [WELL AP readiness](/mock-exams/well-ap-readiness-check).

## Study rhythm

Import flashcards for domains the mock highlights, then schedule another timed attempt. Deck list prices appear only on Gumroad checkout while mock retakes follow the workflow notes below.

## Hub cross-link

Browse every building mock from the [building certification hub](/mock-exams/v/building).

## Study discipline

Building deck reviews should respect refrigerant safety breaks between EPA sessions.

## Mocks, decks, retakes

The building deck index path on /building-certification-anki-decks is a menu, not a marathon: sit one timed mock, export the topic report, and sync LEED decks. Candidates who retry EPA mocks usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; building deck index flashcards still checkout separately on Gumroad. Verify EPA fee tables, ID documents, and scheduling windows referenced on /building-certification-anki-decks before you pay an official vendor.

## Handbooks stay primary

USGBC and GBCI graphic guides show chart layouts that screenshots cannot fully capture. EPA refrigerant rules include recordkeeping fields techs must complete on-site.



Outline note 47 on /building-certification-anki-decks: bookmark EPA updates so renamed domains on your building deck index calendar do not collide with vacation plans.`,
    faqs: [
      {
        question: "Should I buy LEED or EPA 608 flashcards first?",
        answer: "Refrigerant-handling techs should repair EPA 608 gaps before investing in LEED literacy decks.",
      },
      {
        question: "Do building decks include math?",
        answer: "LEED and surveying decks include calculation-style cards where outline math is public. Always confirm handbook tables on the certifier site.",
      },
      {
        question: "Are PDF decks listed here?",
        answer: "Some credentials ship printable PDFs noted on the product card. Anki apkg files remain the default format.",
      }
    ]
  },
  "/language-certification-decks": {
    intro: `## Honest language scope

UniPrep2Go sells a focused set of language-learning decks—not a full DELF, DELE, or CELI catalog. Offerings include printable French primers and Portuguese survival vocabulary alongside citizenship decks whose civics language matches each naturalization handbook.

## What belongs on this hub

Browse [DELF Prim printable French flashcards](/decks/delf-prim-printable-french-flashcards) for young learners. Travelers review [Portuguese survival Anki deck](/decks/portuguese-survival-anki-deck) before relocation. Naturalization applicants should pair language study with the matching [citizenship practice hub](/mock-exams/v/citizenship) mock.

## Mock pairing

When a language pathway also has a timed civics exam, run that country mock first, then import language decks only for vocabulary gaps the report does not cover. Mock retakes follow the workflow section on this page.

## Broader catalog

Full finance and licensing flashcards remain on the [deck catalog](/decks).

## Study discipline

Language deck audio drills deserve quiet headphones and spoken repetition.

## Mocks, decks, retakes

The language deck index path on /language-certification-decks is a menu, not a marathon: sit one timed mock, export the topic report, and study survival cards. Candidates who retry civics mocks usually wait a few days so spaced repetition can land before the next clocked attempt. When free diagnostics are finished, continued timed practice on UniPrep2Go requires **UniPrep Mock Pass $19, unlimited mocks**; language deck index flashcards still checkout separately on Gumroad. Verify immigration office fee tables, ID documents, and scheduling windows referenced on /language-certification-decks before you pay an official vendor.

## Handbooks stay primary

DELF Prim classroom pacing differs from USCIS civics pacing; match the handbook tied to your real goal. Portuguese survival vocabulary does not replace consular interviews.`,
    faqs: [
      {
        question: "Does UniPrep cover every European language exam?",
        answer: "No. This hub lists the small language SKU set we actively maintain. Citizenship civics for many countries lives under citizenship decks instead.",
      },
      {
        question: "Should I buy DELF Prim or a citizenship deck?",
        answer: "Classroom French learners need DELF Prim printables. Naturalization applicants should prioritize the civics deck tied to their immigration authority.",
      },
      {
        question: "Are audio files included?",
        answer: "Portuguese survival cards include audio when noted on the product page. Printable PDFs are text-forward.",
      },
      {
        question: "Can I pair these with English exam decks?",
        answer: "English for speakers decks live in the main catalog under language categories; this hub stays limited to the language-exam SKUs named above.",
      }
    ]
  }
};

export function getHubIntro(hubPath: HubPath): HubIntroEntry {
  return hubIntros[hubPath];
}

export function getHubIntroOrNull(hubPath: string): HubIntroEntry | null {
  if (hubPath in hubIntros) {
    return hubIntros[hubPath as HubPath];
  }
  return null;
}

export function isHubPath(value: string): value is HubPath {
  return value in hubIntros;
}

/** Word count helper shared with tests */
export function hubIntroWordCount(intro: string): number {
  const plain = intro
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .replace(/[*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.split(/\s+/).filter(Boolean).length;
}

export function hubIntroLinkCount(intro: string): number {
  return (intro.match(/\[[^\]]+\]\([^)]+\)/g) ?? []).length;
}

export function hubIntroSentences(intro: string): string[] {
  return intro
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#+\s*/gm, "")
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/[*_]/g, "").trim())
    .filter((s) => s.length > 15);
}
