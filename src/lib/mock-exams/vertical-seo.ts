/**
 * Long-form SEO copy for /mock-exams/v/[vertical] hubs.
 * Link lists alone are too thin for Google; each vertical gets unique Q&A-style body.
 */

import type { MockVerticalId } from "./types";

export type VerticalSeoCopy = {
  /** 60–120 word direct answer under the H1 */
  lead: string;
  /** Extra H2 sections rendered after the exam list */
  sections: Array<{ heading: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const verticalSeoCopy: Record<MockVerticalId, VerticalSeoCopy> = {
  citizenship: {
    lead:
      "UniPrep2Go’s citizenship & naturalization path groups free timed civics readiness checks for the US (USCIS), UK (Life in the UK), Canada, Australia, Germany (Leben in Deutschland), France, Spain (CCSE), Belgium, and other naturalization pathways. Each mock scores by topic, then links to a matching Anki deck where available — independent practice, not official government exam material.",
    sections: [
      {
        heading: "Which citizenship tests belong here?",
        body:
          "Use this hub for civics and naturalization diagnostics — not FINRA, insurance, or ServSafe licensing. Start with your destination country’s mock (US, UK, Canada, Australia, Germany, France, Spain, Belgium, and more), review missed government/history domains, then repair with the linked deck. Confirm current question banks, language, and pass scores on the official immigration authority site before exam day.",
      },
      {
        heading: "How to use these free citizenship practice tests",
        body:
          "Sit one timed readiness check under quiet conditions, read the topic report, and drill weak civics domains daily. Pair every study block with the official handbook (USCIS civics, Discover Canada, Life in the UK, etc.). UniPrep2Go does not administer naturalization interviews or redistribute live government exam items.",
      },
    ],
    faqs: [
      {
        question: "What citizenship practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks include U.S. citizenship civics, Life in the UK, Canadian and Australian citizenship, Leben in Deutschland, French naturalization themes, CCSE España, Finland kansalaisuuskoe (2027), Belgium Flanders/Wallonie, and other pathways listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Are these official government citizenship exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids modeled on published public themes. They are not affiliated with or endorsed by USCIS, Home Office, IRCC, Home Affairs, BAMF, or other immigration authorities.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which civics topics failed; the linked Anki deck is for daily repair of those gaps, not a substitute for the official candidate handbook.",
      },
    ],
  },
  building: {
    lead:
      "UniPrep2Go’s building certification path groups free timed readiness checks for HVAC refrigerant work (EPA Section 608), green-building credentials (LEED Green Associate, LEED AP BD+C, WELL AP), energy and safety pathways (CEM, NEBOSH, CFPS), surveying (MRICS), data-centre facilities (CDCP), and related project credentials. Each mock scores by topic, then links to an Anki deck for weak-domain repair — independent practice, not official USGBC, EPA, RICS, or NFPA material.",
    sections: [
      {
        heading: "Which building certifications belong here?",
        body:
          "Start with EPA 608 if you handle refrigerants, then LEED Green Associate for green-building literacy and LEED AP BD+C when you need credit-level design judgment. Pair NEBOSH or CFPS for occupational and fire-protection safety careers, MRICS for surveyor APC pathways, and CDCP / CEM / ASHRAE-oriented checks when your role is plant, energy, or data-centre operations. Use the free mock first so you know which domain cluster to drill before buying flashcards.",
      },
      {
        heading: "How to use these free building practice tests",
        body:
          "Take one timed readiness check under exam-like conditions, read the topic report, and only then open the matching Anki deck for spaced repetition on failed domains. Confirm current outlines, fees, and eligibility on the official certifier site linked from each mock page — UniPrep2Go does not sell official exam vouchers or redistribute live exam items.",
      },
      {
        heading: "Where to go after the mock",
        body:
          "After your topic report, open /building-certification-anki-decks for Gumroad decks that match this hub, or read /blog/epa-608-practice-test-what-to-expect when refrigerants are your weak cluster. Keep the official candidate handbook open beside Anki — the mock diagnoses gaps; flashcards repair them.",
      },
    ],
    faqs: [
      {
        question: "What building certification practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks include EPA 608, LEED Green Associate, LEED AP BD+C, WELL AP, NEBOSH, CFPS, MRICS, CDCP, CEM, BMS/BAS, PMP/CAPM, Six Sigma Green Belt, and related building pathways listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Are these official EPA, USGBC, or RICS exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids modeled on published public outlines. They are not affiliated with or endorsed by the U.S. EPA, USGBC/GBCI, RICS, NEBOSH, NFPA, or other certifiers.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which topics failed; the linked Anki deck is for daily repair of those gaps, not a substitute for official candidate handbooks.",
      },
      {
        question: "Which mock should HVAC technicians start with?",
        answer:
          "Start with the EPA 608 readiness check if you handle refrigerants. Use the topic report to see whether Type I, Type II, or core rules are weak, then drill the matching EPA 608 Anki deck and confirm current EPA Section 608 rules on the official site.",
      },
      {
        question: "Is the building hub the same as the Building Certification Anki catalog?",
        answer:
          "No. This hub is for free timed practice tests. The Building Certification Anki decks page lists purchasable .apkg / PDF products for daily spaced repetition after you know which domains failed.",
      },
      {
        question: "Do these mocks include PMP and CAPM?",
        answer:
          "Yes. Project-management readiness checks (PMP and CAPM) sit in this building & sustainability path alongside LEED, EPA 608, and safety credentials so facilities and construction teams can drill in one place.",
      },
    ],
  },
  trades: {
    lead:
      "This trades exam path collects free timed practice tests for licensed craft and utility careers — electrical journeyman NEC-style judgment, water treatment operator Class I fundamentals, plumbing journeyman themes, pest-control applicator knowledge, and related trade licenses. Each session is scored by domain so apprentices can see which code articles, process math, or safety rules still need drilling before a state or association sitting.",
    sections: [
      {
        heading: "Who these trade practice tests are for",
        body:
          "Apprentices finishing required hours, helpers moving to journeyman written exams, and utility trainees preparing for entry-level water operator certification benefit most. State boards set code years, open-book rules, and hour requirements — always verify your jurisdiction before you schedule. UniPrep2Go mocks are independent diagnostics, not official board exams.",
      },
      {
        heading: "How to study after a trades readiness check",
        body:
          "Use the topic report to prioritize NEC load calculations, grounding/bonding, treatment-process math, or code tables you missed. Repair those domains with the linked Anki deck (when available), then retake a timed session. Pair every study block with your official state handbook or adopted code cycle — flashcards alone are not enough for open-book code exams.",
      },
    ],
    faqs: [
      {
        question: "Which trade license practice tests does UniPrep2Go offer?",
        answer:
          "This hub lists free timed readiness checks such as electrical journeyman, water treatment operator Class I, plumbing journeyman, and related trade pathways — each with topic scoring and answer review.",
      },
      {
        question: "Are these official state board exams?",
        answer:
          "No. Practice questions are original UniPrep2Go items aligned to common published topics. Confirm adopted code years, fees, and eligibility with your state electrical, plumbing, or drinking-water operator board.",
      },
      {
        question: "Do I need my code book open during the mock?",
        answer:
          "Treat the UniPrep2Go session like your real sitting: if your board exam is open-book, practice with your tabbed NEC or plumbing code; if closed-book, time yourself without references. The mock does not replace official vendor software or board rules.",
      },
    ],
  },
  "real-estate": {
    lead:
      "UniPrep2Go’s real estate path highlights free timed salesperson readiness checks for major markets — Florida, Texas, California, and New York — plus additional state pages for candidates who need a diagnostic before TREC, DBPR/FREC, CalBRE/DRE, or NYDOS sittings. National principles (agency, contracts, finance, ownership) sit beside state license-law sections so you can see whether math or local law is the weak link.",
    sections: [
      {
        heading: "Indexable state spears vs the wider state list",
        body:
          "Google-facing priority on this site focuses on Florida, Texas, California, and New York salesperson pathways. Other state readiness checks remain available for practice and GEO citations but may be thinner in search. Always finish your state’s approved pre-license hours and confirm the current national/state outline with the commission before exam day.",
      },
      {
        heading: "How to use a real estate readiness check",
        body:
          "Sit the free timed mock once under quiet conditions, review missed contract and math items, then drill those domains daily. Pair the report with your pre-license course notes and the official candidate bulletin — UniPrep2Go does not issue licenses or redistribute PSI/Pearson VUE live items.",
      },
    ],
    faqs: [
      {
        question: "Which state real estate practice tests are free?",
        answer:
          "Start with Florida, Texas, California, and New York salesperson readiness checks on UniPrep2Go. Additional state pages exist for practice; confirm your commission’s outline and vendor before you book.",
      },
      {
        question: "Is this the official TREC / FREC / DRE exam?",
        answer:
          "No. These are independent timed diagnostics. Licensing exams are administered by each state’s commission and designated testing vendor.",
      },
    ],
  },
  transport: {
    lead:
      "UniPrep2Go’s CDL path groups free timed readiness checks for commercial driver general knowledge plus endorsements such as air brakes, combination vehicles, doubles/triples, tankers, hazmat, passenger, and school bus themes. Each mock scores by topic so you can see whether vehicle systems, cargo securement, or endorsement rules are the weak link before a state DMV sitting.",
    sections: [
      {
        heading: "Which CDL practice tests belong here?",
        body:
          "Start with general knowledge if you are new to Class A/B prep, then add endorsement mocks that match your license goal. Air brakes and combination vehicle checks matter for most tractor-trailer paths; hazmat, passenger, and school bus are endorsement-specific. UniPrep2Go mocks are independent diagnostics — confirm your state’s handbook edition and knowledge-test vendor rules before exam day.",
      },
      {
        heading: "How to use these free CDL practice tests",
        body:
          "Sit one timed session under quiet conditions, read the topic report, and drill missed domains daily with the linked Anki deck when available. Pair every study block with your official CDL manual — flashcards do not replace the state handbook or skills-test practice.",
      },
    ],
    faqs: [
      {
        question: "What CDL practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks cover CDL general knowledge and common endorsements listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Are these official DMV CDL exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids. Official knowledge and skills tests are administered by your state driver licensing agency.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which CDL topics failed; the linked deck is for daily repair of those gaps.",
      },
    ],
  },
  "allied-health": {
    lead:
      "This allied-health path collects free timed practice tests for NHA, AAMA, dialysis (CCHT), respiratory (TMC), pharmacy technician, and related clinical-support certifications. Each session scores by domain so medical assistants, phlebotomists, and tech candidates can see which clinical, admin, or safety clusters still need drilling.",
    sections: [
      {
        heading: "Who these allied-health practice tests are for",
        body:
          "Students finishing programs, career-changers entering clinics, and working techs renewing or stacking credentials benefit most. Employer and certifier outlines change — verify current NHA, AAMA, BONENT, NBRC, or PTCB/ExCPT bulletins before you book. UniPrep2Go mocks are independent diagnostics, not official certifier exams.",
      },
      {
        heading: "How to study after an allied-health readiness check",
        body:
          "Use the topic report to prioritize clinical procedures, safety, or admin domains you missed. Repair those areas with the linked Anki deck, then retake a timed session. Pair study with your official candidate handbook — mocks do not redistribute live exam items.",
      },
    ],
    faqs: [
      {
        question: "Which allied-health practice tests does UniPrep2Go offer?",
        answer:
          "This hub lists free timed readiness checks such as NHA pathways, AAMA CMA themes, CCHT, respiratory TMC, pharmacy technician, and related certifications shown on the page.",
      },
      {
        question: "Are these official NHA or AAMA exams?",
        answer:
          "No. Practice questions are original UniPrep2Go items aligned to common published topics. Confirm fees, eligibility, and outlines with the official certifier.",
      },
    ],
  },
  ems: {
    lead:
      "UniPrep2Go’s EMS path groups free timed NREMT-style readiness checks for EMR, EMT, AEMT, and Paramedic themes across airway, cardiology, medical, trauma, and operations. Each session returns a topic report so providers can see which clinical clusters still need drilling before a cognitive exam — independent diagnostics aligned to published EMS education themes, not NREMT live items or state practical evaluations.",
    sections: [
      {
        heading: "Which EMS practice tests belong here?",
        body:
          "Choose the level that matches your certification goal — EMT for most entry pathways, AEMT/Paramedic for advanced scopes, EMR for first-responder tracks. UniPrep2Go readiness checks are independent study aids modeled on published EMS education themes, not NREMT live items.",
      },
      {
        heading: "How to use these free NREMT practice tests",
        body:
          "Sit a timed mock, review missed domains, and drill with the linked Anki deck plus your EMT/Paramedic textbook and current AHA guidelines where relevant. Confirm testing vendor rules and ALS protocols with your state EMS office.",
      },
    ],
    faqs: [
      {
        question: "What NREMT practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks for EMR, EMT, AEMT, and Paramedic readiness themes listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Is this the official NREMT exam?",
        answer:
          "No. UniPrep2Go does not administer NREMT cognitive exams and does not redistribute live test items.",
      },
    ],
  },
  cpr: {
    lead:
      "This CPR & BLS path offers a free timed AHA BLS provider-style readiness check covering adult, child, and infant CPR themes, AED use, and team dynamics. Use it as a diagnostic before a provider course or renewal — not as a substitute for hands-on skills verification.",
    sections: [
      {
        heading: "Who this BLS practice test is for",
        body:
          "Healthcare students, clinical staff renewing BLS, and first responders who need a written-style diagnostic before a provider class. Official AHA cards require an authorized Training Center course with skills testing.",
      },
      {
        heading: "How to study after the readiness check",
        body:
          "Review missed CPR/AED decision points, then practice skills with a certified instructor. Pair the report with current AHA provider manual science — UniPrep2Go is independent prep.",
      },
    ],
    faqs: [
      {
        question: "Is this an official AHA BLS card?",
        answer:
          "No. Completing the UniPrep2Go readiness check does not issue an AHA card. Cards come from authorized Training Centers after skills testing.",
      },
      {
        question: "Can I use this instead of a BLS course?",
        answer:
          "No. Use it to diagnose knowledge gaps before or between official provider courses.",
      },
    ],
  },
  nursing: {
    lead:
      "UniPrep2Go’s nursing path groups free timed readiness checks for nurse aide (NNAAP CNA) and practical nursing (NCLEX-PN) themes, with NCLEX-RN pathways where listed on the hub. Topic scoring highlights safety, pharmacology, and patient-care clusters that still need drilling before board day — independent study aids, not NCSBN or state board exams.",
    sections: [
      {
        heading: "Which nursing practice tests belong here?",
        body:
          "CNA candidates should start with nurse-aide readiness; LPN/LVN candidates use NCLEX-PN-style checks; RN candidates use NCLEX-RN where available on this hub. These are independent diagnostics — NCSBN and state boards administer official exams.",
      },
      {
        heading: "How to use these free CNA and PN practice tests",
        body:
          "Sit one timed mock, repair weak domains with the linked Anki deck and your program notes, then retest. Confirm candidate bulletins and skills requirements with your state board or NNAAP vendor.",
      },
    ],
    faqs: [
      {
        question: "Are these official NCLEX or NNAAP exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids and do not redistribute live NCSBN or NNAAP items.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first so the topic report drives daily Anki repair.",
      },
    ],
  },
  "health-admin": {
    lead:
      "This medical coding & admin path collects free timed practice tests for AAPC CPC-style coding, CCS-style inpatient themes, medical billing, scribe documentation, and related health-admin credentials. Domain scores show whether guidelines, E/M, surgery coding, or compliance is the weak link before certification week — independent UniPrep2Go diagnostics, not official AAPC or AHIMA exams.",
    sections: [
      {
        heading: "Who these coding practice tests are for",
        body:
          "Coding students, billers moving into CPC/CCS pathways, and clinic staff who need a diagnostic before certification week. Official exams are administered by AAPC, AHIMA, and related bodies — UniPrep2Go is independent prep.",
      },
      {
        heading: "How to study after a coding readiness check",
        body:
          "Use the report to prioritize ICD/CPT guideline gaps, then drill with the linked Anki deck and current code books. Mocks do not replace official practice exams or codebook fluency.",
      },
    ],
    faqs: [
      {
        question: "Which medical coding practice tests are free?",
        answer:
          "This hub lists free timed readiness checks such as AAPC CPC-style, CCS-style inpatient coding themes, billing, and related admin pathways shown on the page.",
      },
      {
        question: "Are these official AAPC or AHIMA exams?",
        answer:
          "No. Practice questions are original UniPrep2Go items aligned to common published coding topics.",
      },
    ],
  },
  bodywork: {
    lead:
      "UniPrep2Go’s massage path features a free timed MBLEx-style readiness check covering anatomy, physiology, kinesiology, pathology, ethics, and professional practice themes for massage therapy licensure candidates. Use the topic report to prioritize weak science domains before an FSMTB sitting — independent prep that does not replace state jurisprudence or hands-on practical requirements.",
    sections: [
      {
        heading: "Who this MBLEx practice test is for",
        body:
          "Massage school graduates and out-of-state therapists preparing for FSMTB MBLEx sittings. Confirm your state board’s accepted exam and jurisprudence requirements — UniPrep2Go is independent prep.",
      },
      {
        heading: "How to study after the readiness check",
        body:
          "Repair weak anatomy and pathology domains with the linked Anki deck, then retest under timed conditions. Pair study with your school notes and the official MBLEx content outline.",
      },
    ],
    faqs: [
      {
        question: "Is this the official MBLEx?",
        answer:
          "No. UniPrep2Go does not administer FSMTB exams and does not redistribute live MBLEx items.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which anatomy and pathology topics failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  beauty: {
    lead:
      "This beauty path groups free timed written readiness checks for state cosmetology, esthetician, barber, and nail technician themes. Topic scores show whether infection control, science, or state-law clusters need more drill before a board written exam — independent diagnostics while state boards and vendors still administer the official written and practical sittings.",
    sections: [
      {
        heading: "Who these beauty practice tests are for",
        body:
          "Students finishing clock-hour programs and licensed pros adding a related credential. State boards set written/practical splits and law modules — always verify your jurisdiction. UniPrep2Go mocks are independent diagnostics.",
      },
      {
        heading: "How to study after a cosmetology readiness check",
        body:
          "Prioritize missed infection-control and law items, repair with the linked Anki deck, and practice practical skills separately. Flashcards do not replace board practical exams.",
      },
    ],
    faqs: [
      {
        question: "Are these official state board exams?",
        answer:
          "No. Official cosmetology and esthetics exams are administered by state boards and designated vendors.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which infection-control or law topics failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  fitness: {
    lead:
      "UniPrep2Go’s CPT path collects free timed personal-training readiness checks for NASM, ISSA, ACE, ACSM, NSCA, and related fitness credentials. Domain scores highlight assessment, programming, exercise science, and behavior-change gaps before certification day — independent prep aligned to common published outlines, not official certifier exams.",
    sections: [
      {
        heading: "Which CPT practice tests belong here?",
        body:
          "Pick the certifier that matches your career goal and employer preference. Each mock is an independent diagnostic aligned to common published outlines — not the official NASM, ACE, ISSA, ACSM, or NSCA exam.",
      },
      {
        heading: "How to use these free CPT practice tests",
        body:
          "Sit a timed session, drill weak domains with the linked Anki deck, and confirm current exam outlines on the certifier site before you schedule.",
      },
    ],
    faqs: [
      {
        question: "What CPT practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks for major personal-trainer pathways listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Are these official NASM or ACE exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids and are not affiliated with those certifiers.",
      },
    ],
  },
  dental: {
    lead:
      "This dental path groups free timed readiness checks for DANB ICE/GC assisting themes and NBDHE hygiene themes. Topic scoring helps assistants and hygienists see whether infection control, radiology, or clinical science still needs work before credentialing — independent UniPrep2Go diagnostics, not DANB or JCNDE live exams.",
    sections: [
      {
        heading: "Who these dental practice tests are for",
        body:
          "Dental assisting students aiming at DANB components and hygiene graduates preparing for NBDHE-style written readiness. Confirm official candidate guides — UniPrep2Go is independent prep.",
      },
      {
        heading: "How to study after a dental readiness check",
        body:
          "Repair missed infection-control and clinical domains with the linked Anki deck, then retest. Pair study with your program materials and official outlines.",
      },
    ],
    faqs: [
      {
        question: "Are these official DANB or NBDHE exams?",
        answer:
          "No. Official exams are administered by DANB, Joint Commission on National Dental Examinations, and related bodies.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which clinical domains failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  surgical: {
    lead:
      "UniPrep2Go’s surgical path offers free timed readiness checks for sterile processing (CRCST) and surgical technology (NBSTSA CST) themes. Domain scores surface instrument care, sterilization science, and perioperative knowledge gaps so SPD techs and surgical tech students can target repair before exam week — independent prep, not HSPA or NBSTSA material.",
    sections: [
      {
        heading: "Who these surgical practice tests are for",
        body:
          "SPD technicians preparing for CRCST-style knowledge checks and surgical tech students approaching CST. These mocks are independent diagnostics — not HSPA or NBSTSA live exams.",
      },
      {
        heading: "How to study after the readiness check",
        body:
          "Use the topic report to prioritize sterilization science or perioperative domains, then drill with the linked Anki deck and your textbook.",
      },
    ],
    faqs: [
      {
        question: "Are these official CRCST or CST exams?",
        answer:
          "No. UniPrep2Go does not administer HSPA or NBSTSA certifications.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which sterilization or perioperative topics failed; the linked Anki deck is for daily repair.",
      },
    ],
  },
  imaging: {
    lead:
      "This imaging path features a free timed ARDMS SPI-style physics readiness check covering ultrasound physics, instrumentation, Doppler themes, and quality-assurance concepts that underpin sonography credentialing. Use the topic report to prioritize weak physics domains before SPI week — independent UniPrep2Go prep, not an ARDMS exam.",
    sections: [
      {
        heading: "Who this SPI practice test is for",
        body:
          "Sonography students and working sonographers preparing for the Sonography Principles & Instrumentation exam. UniPrep2Go is independent prep — not ARDMS.",
      },
      {
        heading: "How to study after the SPI readiness check",
        body:
          "Repair weak physics domains with the linked Anki deck and your ultrasound physics text, then retest under timed conditions.",
      },
    ],
    faqs: [
      {
        question: "Is this the official ARDMS SPI exam?",
        answer:
          "No. Official SPI exams are administered by ARDMS/APCA.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free SPI readiness check first. The report shows which physics domains failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  lab: {
    lead:
      "UniPrep2Go’s lab path groups free timed ASCP MLS and MLT-style readiness checks across blood bank, chemistry, hematology, and microbiology themes for medical laboratory candidates. Topic scores show which bench domains still need drilling before BOC week — independent diagnostics aligned to common published outlines, not ASCP live items.",
    sections: [
      {
        heading: "Who these lab practice tests are for",
        body:
          "MLS/MLT students and working techs preparing for ASCP Board of Certification-style written readiness. Confirm current BOC content outlines — UniPrep2Go is independent prep.",
      },
      {
        heading: "How to study after a lab readiness check",
        body:
          "Prioritize missed bench domains, drill with the linked Anki deck, and pair study with clinical rotations and BOC reading lists.",
      },
    ],
    faqs: [
      {
        question: "Are these official ASCP exams?",
        answer:
          "No. UniPrep2Go readiness checks are not affiliated with ASCP Board of Certification.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which bench domains failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  nutrition: {
    lead:
      "This nutrition path offers a free timed Registered Dietitian exam-style readiness check covering food science, clinical nutrition, management, and community themes for CDR exam candidates. Use the topic report to prioritize weak domains before exam week — independent UniPrep2Go prep, not Commission on Dietetic Registration material.",
    sections: [
      {
        heading: "Who this RD practice test is for",
        body:
          "Dietetic interns and candidates approaching the CDR RD exam. UniPrep2Go is independent prep — not CDR live items.",
      },
      {
        heading: "How to study after the readiness check",
        body:
          "Use topic scores to prioritize clinical or food-service domains, then repair with the linked Anki deck and Academy materials.",
      },
    ],
    faqs: [
      {
        question: "Is this the official CDR RD exam?",
        answer:
          "No. The Commission on Dietetic Registration administers the official credentialing exam.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free RD readiness check first. The report shows which domains failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  "social-work": {
    lead:
      "UniPrep2Go’s social-work path groups free timed ASWB-style readiness checks for Bachelors, Masters, and Clinical themes. Domain scores highlight human development, assessment, intervention, and ethics gaps before licensure sittings — independent diagnostics aligned to common ASWB content outlines, not official ASWB exams.",
    sections: [
      {
        heading: "Which ASWB practice tests belong here?",
        body:
          "Match the mock to your license level — Bachelors, Masters, or Clinical. These are independent diagnostics aligned to common ASWB content outlines, not official ASWB exams.",
      },
      {
        heading: "How to use these free ASWB practice tests",
        body:
          "Sit a timed session, drill weak ethics and assessment domains with the linked Anki deck, and confirm your state board’s ASWB level requirements.",
      },
    ],
    faqs: [
      {
        question: "Are these official ASWB exams?",
        answer:
          "No. Official social-work licensing exams are administered by ASWB for state boards.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free ASWB-style mock first. The report shows which ethics or assessment topics failed; the linked Anki deck is for daily repair.",
      },
    ],
  },
  education: {
    lead:
      "This education path collects free timed readiness checks for CDA childcare themes plus Praxis Core, ParaPro, and related educator pathways listed on the hub. Topic scores show whether child development, literacy, or math clusters need more work before credentialing — independent UniPrep2Go prep, not Council for Professional Recognition or ETS exams.",
    sections: [
      {
        heading: "Who these education practice tests are for",
        body:
          "Early-childhood candidates pursuing CDA and paraeducators or teacher candidates using Praxis/ParaPro-style readiness. Confirm official Council for Professional Recognition and ETS requirements — UniPrep2Go is independent prep.",
      },
      {
        heading: "How to study after an education readiness check",
        body:
          "Repair missed domains with the linked Anki deck and your coursework, then retest. Mocks do not replace official CDA or ETS sittings.",
      },
    ],
    faqs: [
      {
        question: "Are these official CDA or Praxis exams?",
        answer:
          "No. Official credentials are issued by the Council for Professional Recognition, ETS, and related bodies.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which domains failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  veterinary: {
    lead:
      "UniPrep2Go’s veterinary path groups free timed VTNE-style and veterinary assistant readiness checks covering animal care, clinical practice, anesthesia, and pharmacy themes for credentialing candidates. Topic scores help vet tech students prioritize weak clinical domains before AAVSB week — independent prep, not official VTNE items.",
    sections: [
      {
        heading: "Who these veterinary practice tests are for",
        body:
          "Vet tech students approaching VTNE and assistants preparing for workplace or state credential themes. UniPrep2Go is independent prep — not AAVSB live items.",
      },
      {
        heading: "How to study after a veterinary readiness check",
        body:
          "Use the topic report to prioritize clinical and pharmacology gaps, then drill with the linked Anki deck and your program notes.",
      },
    ],
    faqs: [
      {
        question: "Is this the official VTNE?",
        answer:
          "No. The AAVSB administers the official Veterinary Technician National Examination.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which clinical domains failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
  licensing: {
    lead:
      "This US licensing path groups free timed practice tests for FINRA securities (SIE, Series 6/7/63/65/66 and related), insurance (life/health, P&C), ServSafe food safety, notary, alcohol server, and other professional licenses. Topic scoring shows whether products, regulations, or safety rules are the weak link.",
    sections: [
      {
        heading: "Which licensing practice tests belong here?",
        body:
          "Securities candidates start with SIE then add the Series exam that matches their registration goal. Insurance and food-safety candidates use the matching readiness checks. These mocks are independent diagnostics — FINRA, state DOI, and ServSafe administer official exams.",
      },
      {
        heading: "How to use these free licensing practice tests",
        body:
          "Sit one timed mock, repair weak domains with the linked Anki deck, and confirm current candidate bulletins before you schedule with the official vendor.",
      },
    ],
    faqs: [
      {
        question: "What US licensing practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks include SIE and Series pathways, insurance licensing themes, ServSafe, and related professional licenses listed on this hub.",
      },
      {
        question: "Are these official FINRA or ServSafe exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids and are not affiliated with FINRA, NASBA, or the National Restaurant Association.",
      },
    ],
  },
  finance: {
    lead:
      "UniPrep2Go’s finance path groups free timed readiness checks for CFA Level 1/2, FRM Part 1, GMAT Focus, GRE, SAT, and related credential diagnostics. Weighted topic scores show whether ethics, quant, FRA, or portfolio clusters still need drilling before exam week.",
    sections: [
      {
        heading: "Which finance practice tests belong here?",
        body:
          "Charter and risk candidates use CFA/FRM readiness checks; graduate admissions candidates use GMAT/GRE/SAT diagnostics. Each mock is independent prep aligned to published outlines — not CFA Institute, GARP, or ETS official exams.",
      },
      {
        heading: "How to use these free finance practice tests",
        body:
          "Sit a timed session under exam-like conditions, repair weak domains with the linked Anki deck, and confirm current curriculum weights on the official program site before you register.",
      },
    ],
    faqs: [
      {
        question: "What finance practice tests are free on UniPrep2Go?",
        answer:
          "Free timed mocks include CFA Level 1/2, FRM Part 1, GMAT Focus, GRE, SAT, and related pathways listed on this hub — each with topic scoring and answer review.",
      },
      {
        question: "Are these official CFA Institute or GARP exams?",
        answer:
          "No. UniPrep2Go readiness checks are independent study aids and do not redistribute live exam items.",
      },
      {
        question: "Should I take the mock or buy the Anki deck first?",
        answer:
          "Take the free mock first. The report shows which curriculum topics failed; the linked Anki deck is for daily repair of those gaps.",
      },
    ],
  },
};

export function getVerticalSeoCopy(verticalId: MockVerticalId): VerticalSeoCopy {
  return verticalSeoCopy[verticalId];
}
