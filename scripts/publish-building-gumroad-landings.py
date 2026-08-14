#!/usr/bin/env python3
"""Publish Gumroad custom landing pages with Sample cards images in the description body.

Gumroad strips <img> from the default product description. Custom landing HTML keeps them.
Do NOT upload samples as product covers — put them in the Sample cards section only.
"""

from __future__ import annotations

import argparse
import html
import json
import re
import subprocess
import tempfile
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
SPECS_PATH = ROOT / "src/data/building-deck-specs.json"
CATALOG_PATH = ROOT / "src/data/gumroad/building-anki-decks.json"
CDN_CACHE_PATH = ROOT / "src/data/gumroad/building-sample-cdn.json"
SAMPLES_DIR = ROOT / "public/samples"
OUT_DIR = ROOT / "landing-pages/building"
# Gumroad landing iframes only reliably load public-files.gumroad.com images.
# uniprep2go.study / S3 attachment URLs show as broken images in the sandbox.

# Cold-traffic exam/cert copy — Gumroad buyers often have zero site context.
EXAM_CONTEXT: dict[str, dict[str, Any]] = {
    "gre-anki-deck": {
        "exam_name": "GRE General Test (ETS)",
        "hook": (
            "Active recall for the GRE General Test — Verbal Reasoning and Quantitative "
            "Reasoning MCQs with explanations on every card."
        ),
        "audience": (
            "For master's, MBA, and PhD applicants who need daily Verbal + Quant drilling "
            "between official ETS PowerPrep — not another passive PDF the week before test day."
        ),
        "disclaimer": "ETS",
        "about_heading": "What is the GRE General Test?",
        "about": (
            "The GRE General Test is ETS's graduate admissions exam used by thousands of "
            "master's, MBA, and doctoral programs worldwide. Schools typically review three "
            "scores: Verbal Reasoning, Quantitative Reasoning, and Analytical Writing."
        ),
        "format": "About 1 hour 58 minutes — 1 Issue essay + 27 Verbal + 27 Quant (section-level adaptive)",
        "scoring": "Verbal 130–170 · Quant 130–170 · Writing 0–6 (no single pass/fail cut score)",
        "who": "Graduate / business / PhD applicants who need reportable Verbal and Quant scores",
        "deck_covers": (
            "Verbal (text completion, sentence equivalence, RC-style judgment) and Quant "
            "(algebra, arithmetic, geometry, data analysis) MCQs with explanations."
        ),
        "not_included": "Analytical Writing essays are not included — drill Issue essays separately with ETS prompts.",
        "why_anki": (
            "GRE rewards speed + pattern recognition under adaptive pressure. Spaced MCQ recall "
            "beats re-reading notes the night before."
        ),
        "official_url": "https://www.ets.org/gre/test-takers/general-test.html",
        "facts": [
            ("Administrator", "ETS"),
            ("Length", "~1 hr 58 min"),
            ("Verbal / Quant", "27 + 27 questions"),
            ("Score scale", "130–170 each"),
        ],
    },
    "gmat-focus-anki-deck": {
        "exam_name": "GMAT Focus Edition (GMAC)",
        "hook": (
            "Active recall for the GMAT Focus Edition — Quantitative Reasoning, Verbal Reasoning, "
            "and Data Insights in MCQ format with explanations on every card."
        ),
        "audience": (
            "For MBA and business master's applicants who need daily Quant, Verbal, and Data Insights "
            "drilling between official GMAC practice."
        ),
        "disclaimer": "GMAC",
        "about_heading": "What is the GMAT Focus Edition?",
        "about": (
            "The GMAT Focus Edition is GMAC's graduate management admissions exam. Business schools "
            "use the total score (and section performance) to compare MBA and specialized master's applicants."
        ),
        "format": "Three sections — Quantitative Reasoning, Verbal Reasoning, and Data Insights",
        "scoring": "Total score 205–805 (Focus Edition scale)",
        "who": "MBA / business master's applicants targeting competitive programs",
        "deck_covers": "Quant, Verbal, and Data Insights style MCQs for daily spaced repetition.",
        "not_included": "Official adaptive full-lengths — keep using GMAC Official Prep alongside this deck.",
        "why_anki": "Focus Edition rewards consistent section drilling. Anki keeps weak item types from decaying between mocks.",
        "official_url": "https://www.mba.com/exams/gmat-exam",
        "facts": [
            ("Administrator", "GMAC"),
            ("Sections", "Quant · Verbal · DI"),
            ("Total score", "205–805"),
            ("Format", "Computer adaptive"),
        ],
    },
    "sat-anki-deck": {
        "exam_name": "Digital SAT (College Board)",
        "hook": (
            "Active recall for the Digital SAT — Reading & Writing and Math MCQs "
            "with explanations on every card."
        ),
        "audience": (
            "For high-school students who need daily section drilling between Bluebook practice "
            "— not cramming the night before."
        ),
        "disclaimer": "College Board",
        "about_heading": "What is the Digital SAT?",
        "about": (
            "The Digital SAT is College Board's college admissions exam. Most U.S. colleges still "
            "use SAT scores (or accept them) as part of admissions and scholarship decisions."
        ),
        "format": "Two scored sections — Reading and Writing, and Math (adaptive modules)",
        "scoring": "Total 400–1600 (200–800 per section)",
        "who": "College-bound high-school students preparing for Digital SAT test dates",
        "deck_covers": "Reading & Writing and Math skill drills aligned to Digital SAT section practice.",
        "not_included": "Full Bluebook adaptive exams — use College Board Bluebook for timed full lengths.",
        "why_anki": "Digital SAT is module-adaptive. Daily Anki keeps high-frequency grammar, vocab-in-context, and math patterns sharp.",
        "official_url": "https://satsuite.collegeboard.org/sat",
        "facts": [
            ("Administrator", "College Board"),
            ("Sections", "R&W · Math"),
            ("Total score", "400–1600"),
            ("Delivery", "Digital / Bluebook"),
        ],
    },
    "pmp-anki-deck": {
        "exam_name": "Project Management Professional — PMP (PMI)",
        "hook": (
            "Active recall for the PMP exam — People, Process, and Business Environment "
            "scenario MCQs with explanations on every card."
        ),
        "audience": (
            "For project managers pursuing PMI's PMP credential who need daily ECO-aligned "
            "scenario drilling between practice exams — not another PDF summary."
        ),
        "disclaimer": "PMI",
        "about_heading": "What is the PMP certification?",
        "about": (
            "The Project Management Professional (PMP) is PMI's flagship project management "
            "credential. The exam follows the Exam Content Outline (People, Process, Business Environment) "
            "and is heavily situational — pick the next best action, not a vocabulary definition."
        ),
        "format": "180 questions · 4 hours (170 scored + 10 pretest) · Pearson VUE / online proctored",
        "scoring": "Domain performance levels (People / Process / Business Environment) — no published fixed % cut score",
        "who": "Experienced PMs meeting PMI education + experience eligibility who need the PMP credential",
        "deck_covers": "ECO-aligned scenario MCQs across People, Process, and Business Environment with distractor notes.",
        "not_included": "35 contact hours / CAPM path paperwork — handle eligibility and application on pmi.org.",
        "why_anki": "PMP is judgment under pressure. Spaced scenario recall beats rereading the ECO the week of the exam.",
        "official_url": "https://www.pmi.org/certifications/project-management-pmp",
        "facts": [
            ("Administrator", "PMI"),
            ("Questions", "180 (4 hours)"),
            ("Domains", "People · Process · Business Env."),
            ("Outline", "ECO 2026"),
        ],
    },
    "leed-ap-om-anki-deck": {
        "exam_name": "LEED AP Operations + Maintenance (GBCI / USGBC)",
        "hook": (
            "Active recall for LEED AP O+M — process, site, water, energy, and materials/IEQ "
            "drills for existing-building performance."
        ),
        "audience": (
            "For facility / sustainability professionals pursuing LEED AP O+M who already hold "
            "(or are pursuing) LEED Green Associate and need daily specialty drilling."
        ),
        "disclaimer": "USGBC / GBCI",
        "about_heading": "What is LEED AP O+M?",
        "about": (
            "LEED AP with specialty in Operations + Maintenance is GBCI's credential for professionals "
            "who improve performance of existing buildings — energy, water, IAQ, waste, and ongoing "
            "operations — not new-construction design alone."
        ),
        "format": "Specialty exam: 100 multiple-choice questions in 2 hours (Prometric / remote proctoring)",
        "scoring": "Scaled score out of 200 — passing score 170",
        "who": "O+M / facility / sustainability pros; specialty-only path typically requires active LEED GA",
        "deck_covers": (
            "Process & integrative planning, location/transportation, sites, water, energy & atmosphere, "
            "materials, and IEQ for O+M performance-period style questions."
        ),
        "not_included": "LEED Green Associate fundamentals deck — get GA first if you still need the prerequisite.",
        "why_anki": "O+M domains are dense (especially Energy and IEQ). Spaced recall keeps credit intent and operations metrics exam-ready.",
        "official_url": "https://www.usgbc.org/credentials/leed-ap",
        "facts": [
            ("Administrator", "GBCI / USGBC"),
            ("Questions", "100 MCQ · 2 hours"),
            ("Pass score", "170 / 200 scaled"),
            ("Prereq path", "Active LEED GA (typical)"),
        ],
    },
    "leed-green-associate-anki-deck": {
        "exam_name": "LEED Green Associate (GBCI / USGBC)",
        "hook": "Active recall for LEED Green Associate — foundational green-building and LEED process drills.",
        "audience": "For professionals newer to LEED who need the GA credential before (or with) a specialty AP exam.",
        "disclaimer": "USGBC / GBCI",
        "about_heading": "What is LEED Green Associate?",
        "about": (
            "LEED Green Associate is GBCI's foundational credential demonstrating general knowledge of "
            "green building, LEED rating systems, and project support roles."
        ),
        "format": "Multiple-choice computer-based exam — verify current length and delivery at usgbc.org",
        "scoring": "Scaled scoring — confirm current passing standard in the GA candidate handbook",
        "who": "Architects, engineers, brokers, students, and sustainability staff starting the LEED credential path",
        "deck_covers": "High-yield LEED GA domain drills for spaced repetition.",
        "not_included": "Specialty AP exams (BD+C, O+M, etc.) — those are separate decks/credentials.",
        "why_anki": "GA is broad. Daily Anki keeps terminology, process, and credit categories from blurring together.",
        "official_url": "https://www.usgbc.org/credentials/leed-green-associate",
        "facts": [
            ("Administrator", "GBCI / USGBC"),
            ("Level", "Foundational LEED"),
            ("Path", "Often before LEED AP"),
            ("Format", "MCQ exam"),
        ],
    },
    "leed-ap-bd-c-anki-deck": {
        "exam_name": "LEED AP BD+C (GBCI / USGBC)",
        "hook": "Active recall for LEED AP Building Design + Construction specialty domains.",
        "audience": "For design/construction professionals pursuing LEED AP BD+C after LEED Green Associate.",
        "disclaimer": "USGBC / GBCI",
        "about_heading": "What is LEED AP BD+C?",
        "about": (
            "LEED AP with specialty in Building Design + Construction validates advanced LEED knowledge "
            "for new construction and major renovation projects."
        ),
        "format": "Specialty MCQ exam after (or combined with) LEED Green Associate — verify current handbook",
        "scoring": "Scaled specialty scoring — confirm pass standard in the current BD+C handbook",
        "who": "Architects, engineers, and consultants on LEED BD+C projects; typically requires active LEED GA",
        "deck_covers": "BD+C specialty domain drills for daily review.",
        "not_included": "O+M existing-building operations content — that is a different specialty.",
        "why_anki": "BD+C credit categories are easy to confuse under timed pressure. Spaced MCQs lock intent + requirements.",
        "official_url": "https://www.usgbc.org/credentials/leed-ap",
        "facts": [
            ("Administrator", "GBCI / USGBC"),
            ("Specialty", "Building Design + Construction"),
            ("Prereq path", "Active LEED GA (typical)"),
            ("Format", "Specialty MCQ"),
        ],
    },
    "hvac-epa-608-anki-deck": {
        "exam_name": "EPA Section 608 Technician Certification",
        "hook": "Active recall for EPA 608 — Core plus Type I, II, and III refrigerant handling MCQs with explanations.",
        "audience": "For HVAC technicians who must pass Section 608 before servicing systems that can release refrigerants.",
        "disclaimer": "U.S. EPA",
        "about_heading": "What is EPA Section 608?",
        "about": (
            "EPA Section 608 certification (Clean Air Act) is required for technicians who maintain, service, "
            "repair, or dispose of equipment that could release refrigerants. Universal certification means "
            "passing Core plus Types I, II, and III."
        ),
        "format": "100 MCQ for Universal (25 Core + 25 Type I + 25 Type II + 25 Type III); sections scored independently",
        "scoring": "Typically 18/25 (72%) per section — Core must pass for any Type certification",
        "who": "HVAC/R technicians and students preparing for EPA-approved 608 testing",
        "deck_covers": "Core ozone/recovery/safety plus Type I small appliances, Type II high-pressure, Type III low-pressure chillers.",
        "not_included": "State HVAC licenses or manufacturer equipment certs — 608 is refrigerant handling only.",
        "why_anki": "608 is rule-heavy (recovery, cylinders, leak thresholds). Spaced MCQs beat cramming the night before the proctored test.",
        "official_url": "https://www.epa.gov/section608/technician-certification",
        "facts": [
            ("Administrator", "U.S. EPA (via certifiers)"),
            ("Universal", "100 MCQ / 4 sections"),
            ("Pass", "~72% per section"),
            ("Expires?", "Certification does not expire"),
        ],
    },
    "bms-building-automation-anki-deck": {
        "exam_name": "BMS / BAS technician credentials (BACnet & platform paths)",
        "hook": "Active recall for building automation — BACnet, HVAC sequences, alarms/trends, and commissioning MCQs.",
        "audience": "For BAS/BMS technicians and controls engineers drilling protocol + operator workflow between vendor courses.",
        "disclaimer": "BACnet International / vendor programs",
        "about_heading": "What is BMS / BAS prep for?",
        "about": (
            "Building Management / Automation Systems control HVAC, lighting, and plant equipment. There is no "
            "single U.S. federal BMS license — careers typically combine BACnet knowledge, vendor platform training "
            "(e.g. Niagara / manufacturer certs), and field commissioning."
        ),
        "format": "Varies by credential (vendor TCP / manufacturer exams) — this deck supports knowledge drilling, not one license",
        "scoring": "No universal scaled score — employers and project specs set the bar",
        "who": "Controls techs, energy managers, and commissioning agents working on BACnet/BAS projects",
        "deck_covers": "BACnet networking, HVAC control sequences, alarms/trends/schedules, integration and troubleshooting.",
        "not_included": "Hands-on Niagara lab exams or manufacturer practical assessments — take those with an authorized trainer.",
        "why_anki": "BAS vocabulary and sequences are dense. Daily Anki keeps BACnet objects and plant logic from blurring on site.",
        "official_url": "https://www.ashrae.org/technical-resources/bookstore/bacnet",
        "facts": [
            ("Path", "Vendor + BACnet knowledge"),
            ("Core std", "ASHRAE 135 (BACnet)"),
            ("Focus", "Controls / commissioning"),
            ("Format", "MCQ study deck"),
        ],
    },
    "well-ap-anki-deck": {
        "exam_name": "WELL Accredited Professional — WELL AP (IWBI / GBCI)",
        "hook": "Active recall for WELL AP — Air through Community plus WELL Certification/Portfolio process MCQs.",
        "audience": "For designers and sustainability pros pursuing WELL AP who need daily concept drilling before Prometric.",
        "disclaimer": "IWBI / GBCI",
        "about_heading": "What is the WELL AP credential?",
        "about": (
            "WELL AP demonstrates expertise in the WELL Building Standard and human health in the built environment. "
            "GBCI administers the exam for IWBI. It is separate from LEED AP credentials."
        ),
        "format": "115 MCQ (100 scored + 15 unscored) in 2 hours 30 minutes — Prometric / remote proctoring",
        "scoring": "Scaled 125–200 — passing score 170",
        "who": "Architects, engineers, and wellness/sustainability consultants working with WELL projects",
        "deck_covers": "Air, Water, Nourishment, Light, Movement, Thermal, Sound, Materials, Mind, Community, and certification/portfolio process.",
        "not_included": "Embedded exam-day scenario PDF navigation practice — review IWBI ‘Get to know the exam’ before scheduling.",
        "why_anki": "Eleven knowledge domains blur together. Spaced MCQs keep concept → project application links exam-ready.",
        "official_url": "https://support.wellcertified.com/hc/en-us/articles/25696901381015-WELL-AP-overview",
        "facts": [
            ("Administrator", "GBCI for IWBI"),
            ("Questions", "115 · 2.5 hours"),
            ("Pass score", "170 scaled"),
            ("Standard", "WELL v2"),
        ],
    },
    "cem-anki-deck": {
        "exam_name": "Certified Energy Manager — CEM (AEE)",
        "hook": "Active recall for CEM — audits, electrical, HVAC, industrial systems, and M&V MCQs with explanations.",
        "audience": "For energy engineers and facility managers pursuing AEE’s CEM credential.",
        "disclaimer": "AEE",
        "about_heading": "What is the CEM certification?",
        "about": (
            "Certified Energy Manager (CEM) from the Association of Energy Engineers recognizes expertise in "
            "optimizing energy use across commercial and industrial systems."
        ),
        "format": "130 items (120 scored + 10 pretest) · 4 hours · AEE-approved delivery / remote proctoring",
        "scoring": "Scaled 0–1,040 — passing score 700",
        "who": "Energy managers, facility engineers, and consultants meeting AEE eligibility for CEM",
        "deck_covers": "Policy/audits/economics, electrical & lighting, HVAC/envelope/BAS, industrial/boilers/renewables, commissioning & M&V.",
        "not_included": "AEE seminar seat or application eligibility review — handle those on aeecenter.org.",
        "why_anki": "CEM spans many plant systems. Spaced recall keeps formulas, sequences, and economics from decaying between study blocks.",
        "official_url": "https://www.aeecenter.org/certifications/certified-energy-manager",
        "facts": [
            ("Administrator", "AEE"),
            ("Questions", "130 · 4 hours"),
            ("Pass score", "700 / 1040 scaled"),
            ("Focus", "Facility energy optimization"),
        ],
    },
    "ashrae-certifications-anki-deck": {
        "exam_name": "ASHRAE personnel certifications (BEMP, BEAP, BCxP & related)",
        "hook": "Active recall across ASHRAE certification themes — modeling, assessment, commissioning, design, and operations.",
        "audience": "For HVAC engineers preparing for ASHRAE personnel certs who need daily domain drilling.",
        "disclaimer": "ASHRAE",
        "about_heading": "What are ASHRAE certifications?",
        "about": (
            "ASHRAE offers personnel certifications such as BEMP (energy modeling), BEAP (energy assessment), "
            "BCxP (commissioning), and related design/operations credentials. Each has its own handbook and exam — "
            "this deck drills high-yield themes shared across those paths."
        ),
        "format": "Varies by credential — computer-based exams per ASHRAE certification program rules",
        "scoring": "Per-credential pass standards — verify in the current ASHRAE candidate handbook for your exam",
        "who": "HVAC designers, energy modelers, commissioning authorities, and operations engineers",
        "deck_covers": "BEMP modeling, BEAP assessment, BCxP commissioning, high-performance design, and OPMP-style operations themes.",
        "not_included": "A single official exam ticket — pick your target ASHRAE credential and confirm eligibility separately.",
        "why_anki": "ASHRAE domains overlap but use precise terminology. Spaced MCQs reduce mix-ups under timed testing.",
        "official_url": "https://www.ashrae.org/professional-development/ashrae-certification",
        "facts": [
            ("Administrator", "ASHRAE"),
            ("Examples", "BEMP · BEAP · BCxP"),
            ("Focus", "HVAC / energy / Cx"),
            ("Format", "Per-credential exam"),
        ],
    },
    "cdcp-anki-deck": {
        "exam_name": "Certified Data Centre Professional — CDCP (EXIN / EPI)",
        "hook": "Active recall for CDCP — site, power, cooling, fire, security, and operations MCQs.",
        "audience": "For data-centre facility staff preparing for EXIN EPI CDCP after (or alongside) accredited training.",
        "disclaimer": "EXIN / EPI",
        "about_heading": "What is the CDCP certification?",
        "about": (
            "EXIN EPI Certified Data Centre Professional validates foundational knowledge of data-centre facility "
            "infrastructure and operations. Accredited EPI training is typically required before sitting the exam."
        ),
        "format": "40 multiple-choice questions in 60 minutes (usually at end of accredited CDCP course)",
        "scoring": "Pass mark 68% (27 of 40 correct) — closed book",
        "who": "Data-centre technicians, facility engineers, and IT/facility hybrid roles starting the EPI pathway",
        "deck_covers": "Site/standards/building, power & EMF, cooling/water, fire/security/network, and operations.",
        "not_included": "Mandatory EPI classroom/lab seat — EXIN lists accredited training as required for the exam path.",
        "why_anki": "CDCP packs many facility standards into 40 questions. Spaced recall keeps TIA-942 / cooling / power facts sharp.",
        "official_url": "https://www.exin.com/technologies-software/exin-epi-data-centre-management/certified-data-centre-professional",
        "facts": [
            ("Administrator", "EXIN / EPI"),
            ("Questions", "40 · 60 minutes"),
            ("Pass", "68% (27/40)"),
            ("Validity", "3 years"),
        ],
    },
    "nebosh-anki-deck": {
        "exam_name": "NEBOSH International General Certificate (IGC)",
        "hook": "Active recall for NEBOSH IGC — management systems, health hazards, fire/electricity, and risk-assessment themes.",
        "audience": "For H&S practitioners preparing for NEBOSH IGC (GIC1/GIC2) who need daily syllabus drilling.",
        "disclaimer": "NEBOSH",
        "about_heading": "What is the NEBOSH IGC?",
        "about": (
            "The NEBOSH International General Certificate is a Level 3 occupational health and safety qualification. "
            "Assessment is Unit GIC1 (open-book scenario exam) and Unit GIC2 (practical risk assessment) — not a pure MCQ license."
        ),
        "format": "GIC1: 5-hour open-book scenario exam (100 marks); GIC2: practical risk assessment (pass/refer)",
        "scoring": "GIC1 pass from 45/100; Credit 65–74; Distinction 75+. Grade is based on GIC1; GIC2 is pass/refer",
        "who": "H&S officers, managers, and consultants building an internationally recognised OHS foundation",
        "deck_covers": "H&S management systems/culture, physical & psychosocial health, agents/workplace hazards, equipment/fire/electricity, risk assessment themes.",
        "not_included": "Official GIC1 OBE sitting or GIC2 submission — register via an accredited Learning Partner.",
        "why_anki": "IGC syllabus is broad. Spaced MCQ recall builds the knowledge base you then apply in open-book scenario answers.",
        "official_url": "https://www.nebosh.org.uk/qualifications/nebosh-international-general-certificate-in-occupational-health-and-safety/",
        "facts": [
            ("Administrator", "NEBOSH"),
            ("Units", "GIC1 + GIC2"),
            ("GIC1 pass", "45/100"),
            ("Style", "OBE + practical"),
        ],
    },
    "cfps-anki-deck": {
        "exam_name": "Certified Fire Protection Specialist — CFPS (NFPA)",
        "hook": "Active recall for CFPS — suppression, detection, built-environment safety, and fire science MCQs.",
        "audience": "For fire protection professionals preparing for NFPA’s open-book CFPS exam.",
        "disclaimer": "NFPA",
        "about_heading": "What is the CFPS certification?",
        "about": (
            "Certified Fire Protection Specialist (CFPS) from NFPA recognizes expertise in fire protection, "
            "life safety, and fire science. The computer-based exam is open book and references the NFPA Fire Protection Handbook."
        ),
        "format": "100 multiple-choice · 3 hours · Prometric (open book — Fire Protection Handbook)",
        "scoring": "Pass/Fail only — NFPA does not publish a percentage cut score",
        "who": "Fire protection engineers, AHJs, and safety professionals meeting NFPA CFPS eligibility",
        "deck_covers": "Suppression, built-environment safety, detection/alarm, prevention programs, analysis, hazard management, fire/rescue organization, confining fires.",
        "not_included": "The NFPA Fire Protection Handbook itself — you need handbook navigation skills for the open-book exam.",
        "why_anki": "Open-book still requires fast topic recall so you know where to look. Anki builds that retrieval under time pressure.",
        "official_url": "https://www.nfpa.org/cfps",
        "facts": [
            ("Administrator", "NFPA"),
            ("Questions", "100 · 3 hours"),
            ("Style", "Open book"),
            ("Result", "Pass / Fail"),
        ],
    },
    "mrics-anki-deck": {
        "exam_name": "MRICS / RICS Assessment of Professional Competence (APC)",
        "hook": "Active recall for RICS APC — mandatory competencies, ethics, technical Level 1–3 themes, and interview prep.",
        "audience": "For surveyors pursuing MRICS via APC who need daily competency and ethics drilling before final assessment.",
        "disclaimer": "RICS",
        "about_heading": "What is the RICS APC / MRICS?",
        "about": (
            "MRICS membership is awarded through the RICS Assessment of Professional Competence (APC). Candidates "
            "demonstrate mandatory and technical competencies, ethics, and usually a case study plus final assessment interview — "
            "not a single multiple-choice licensure exam."
        ),
        "format": "Structured APC pathway — submissions, ethics module, case study, and final assessment (pathway-specific)",
        "scoring": "Competency-based assessment — assessors judge Level 1–3 evidence; not a published % cut score",
        "who": "Graduate and experienced surveyors on an RICS-approved APC pathway seeking MRICS",
        "deck_covers": "Mandatory competencies, ethics/Rules of Conduct, core technical Level 1 knowledge, Level 2–3 application, case study/interview themes.",
        "not_included": "Your pathway counsellor, diary, or case-study writing — Anki supports knowledge recall, not the full APC submission.",
        "why_anki": "APC fails when definitions and ethics blur under interview pressure. Spaced recall keeps competency language precise.",
        "official_url": "https://www.rics.org/surveyor-careers/assessment-of-professional-competence-apc",
        "facts": [
            ("Body", "RICS"),
            ("Goal", "MRICS via APC"),
            ("Focus", "Competencies + ethics"),
            ("Assessment", "Submission + interview"),
        ],
    },
    "mrics-quantity-surveying-anki-deck": {
        "exam_name": "MRICS Quantity Surveying APC (RICS)",
        "hook": "Active recall for QS APC — cost planning, measurement, contracts/procurement, and project finance MCQs.",
        "audience": "For quantity surveyors on the RICS QS APC pathway who need daily technical competency drilling.",
        "disclaimer": "RICS",
        "about_heading": "What is the Quantity Surveying APC pathway?",
        "about": (
            "Quantity Surveying is a core RICS APC pathway to MRICS. Candidates evidence QS technical competencies "
            "(cost planning, quantification, contracts, procurement, construction technology) plus mandatory competencies and ethics."
        ),
        "format": "RICS QS APC pathway — structured submissions and final assessment (not a single MCQ license exam)",
        "scoring": "Competency-based APC judgment — verify current pathway guide on rics.org",
        "who": "Assistant / graduate quantity surveyors pursuing chartered status via the QS pathway",
        "deck_covers": "Commercial/cost planning, quantification & costing, contracts & procurement, project finance & construction tech, mandatory/ethics themes.",
        "not_included": "Full APC case study drafting or counsellor sign-off — use this deck for technical recall between submissions.",
        "why_anki": "QS competencies mix standards, measurement, and contract practice. Spaced MCQs keep terminology interview-ready.",
        "official_url": "https://www.rics.org/surveyor-careers/assessment-of-professional-competence-apc",
        "facts": [
            ("Body", "RICS"),
            ("Pathway", "Quantity Surveying"),
            ("Goal", "MRICS"),
            ("Focus", "Cost · contracts · measurement"),
        ],
    },
}


def e(value: Any) -> str:
    return html.escape(str(value or ""), quote=True)


def gumroad_json(args: list[str]) -> dict:
    out = subprocess.run(
        ["gumroad", *args, "--json", "--non-interactive"],
        capture_output=True,
        text=True,
        check=False,
    )
    if out.returncode != 0:
        raise RuntimeError(out.stderr.strip() or out.stdout.strip() or f"gumroad failed: {args}")
    return json.loads(out.stdout)


def sample_paths(slug: str) -> list[Path]:
    return [p for i in range(1, 4) if (p := SAMPLES_DIR / f"{slug}-sample-{i}.webp").exists()]


def load_cdn_cache() -> dict[str, list[str]]:
    if CDN_CACHE_PATH.exists():
        return json.loads(CDN_CACHE_PATH.read_text(encoding="utf-8"))
    return {}


def save_cdn_cache(cache: dict[str, list[str]]) -> None:
    CDN_CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CDN_CACHE_PATH.write_text(json.dumps(cache, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def ensure_sample_cdn_urls(product_id: str, slug: str, cache: dict[str, list[str]], *, force: bool = False) -> list[str]:
    """Host sample JPGs on public-files.gumroad.com without leaving them as covers.

    Workflow: add as covers → capture original_url → remove those covers.
    Cached URLs remain valid after cover removal.
    """
    paths = sample_paths(slug)
    if not paths:
        return []
    cached = cache.get(slug) or []
    if not force and len(cached) >= len(paths):
        return cached[: len(paths)]

    before = gumroad_json(["products", "view", product_id])
    before_ids = {
        c.get("id")
        for c in ((before.get("product") or before).get("covers") or [])
        if c.get("id")
    }

    uploaded_ids: list[str] = []
    with tempfile.TemporaryDirectory(prefix="gumroad-sample-cdn-") as tmp:
        for path in paths:
            jpg = Path(tmp) / f"{path.stem}.jpg"
            subprocess.run(
                ["magick", str(path), "-quality", "88", str(jpg)],
                check=True,
                capture_output=True,
            )
            add = subprocess.run(
                [
                    "gumroad",
                    "products",
                    "covers",
                    "add",
                    product_id,
                    "--image",
                    str(jpg),
                    "--yes",
                    "--non-interactive",
                    "--json",
                ],
                capture_output=True,
                text=True,
            )
            if add.returncode != 0:
                raise RuntimeError(f"cover add failed for {slug}: {add.stderr or add.stdout}")
            # Resolve newly added cover ids after each upload for robustness.
            view = gumroad_json(["products", "view", product_id])
            covers = (view.get("product") or view).get("covers") or []
            for cover in covers:
                cid = cover.get("id")
                if cid and cid not in before_ids and cid not in uploaded_ids:
                    uploaded_ids.append(cid)

    after = gumroad_json(["products", "view", product_id])
    covers = (after.get("product") or after).get("covers") or []
    by_id = {c.get("id"): c for c in covers if c.get("id")}
    urls: list[str] = []
    for cid in uploaded_ids:
        cover = by_id.get(cid) or {}
        url = cover.get("original_url") or cover.get("url")
        if url:
            urls.append(url)
        # Always remove — samples must not stay in the cover gallery.
        subprocess.run(
            [
                "gumroad",
                "products",
                "covers",
                "remove",
                product_id,
                cid,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
            check=False,
        )

    if len(urls) < len(paths):
        raise RuntimeError(f"expected {len(paths)} CDN urls for {slug}, got {len(urls)}")
    cache[slug] = urls
    save_cdn_cache(cache)
    return urls


def short_caption(topic: str, max_len: int = 42) -> str:
    topic = re.sub(r"\s+", " ", topic).strip()
    if len(topic) <= max_len:
        return topic
    return topic[: max_len - 1].rsplit(" ", 1)[0] + "…"


def render_landing(spec: dict, product: dict, cover_url: str, sample_urls: list[str]) -> str:
    slug = spec["deckSlug"]
    permalink = spec["permalink"]
    checkout = f"https://pixidstudio.gumroad.com/l/{permalink}"
    price = product.get("formatted_price") or "$11"
    count = spec["cardCount"]
    label = spec["deckLabel"]
    topics = list(spec["topics"].values())
    coverage = " · ".join(short_caption(t, 28) for t in topics[:3])
    ctx = EXAM_CONTEXT.get(slug, {})
    exam = ctx.get("exam_name") or spec.get("deckName") or label
    hook = ctx.get("hook") or (
        f"Active recall for {exam} — {count} MCQ Anki flashcards with explanations on every card."
    )
    audience = ctx.get("audience") or (
        "Built for candidates who need daily spaced-repetition drilling between practice tests."
    )
    disclaimer = ctx.get("disclaimer") or spec.get("disclaimerOrg") or label
    headline = f"{label} Anki Deck — {count} Flashcards"
    seo_title = f"{headline} | {exam} Prep | PixiD Studio"
    meta = (
        f"{count} Anki flashcards for the {exam}. {ctx.get('scoring') or coverage}. "
        f"MCQs with explanations — independent prep, not official {disclaimer} material."
    )
    mock_url = f"https://uniprep2go.study/mock-exams/{spec['mockSlug']}"
    deck_url = f"https://uniprep2go.study/decks/{slug}"

    benefits = [
        f"Built for the {exam}",
        f"{count} MCQ cards across {len(topics)} topic domains",
        "Question, four options, correct answer, and explanation on every card",
        "Same validated bank as the free readiness check on UniPrep2Go",
        "Mobile sync via AnkiWeb (AnkiMobile / AnkiDroid)",
    ]
    benefits_html = "".join(
        f'<li class="flex gap-3"><span class="text-accent font-bold">✓</span><span>{e(b)}</span></li>'
        for b in benefits
    )

    exam_facts = list(ctx.get("facts") or [])
    if not exam_facts:
        exam_facts = [
            ("Exam", exam),
            ("Cards", f"{count} MCQ"),
            ("Coverage", coverage),
            ("Delivery", "Instant .apkg"),
        ]
    facts_html = "".join(
        f'<div class="theme-card px-5 py-4"><dt class="label-mono">{e(k)}</dt>'
        f'<dd class="mt-2 font-medium">{e(v)}</dd></div>'
        for k, v in exam_facts[:4]
    )

    about_heading = ctx.get("about_heading") or f"About the {exam}"
    about_body = ctx.get("about") or (
        f"This deck supports prep for {exam} using spaced-repetition Anki flashcards."
    )
    format_line = ctx.get("format") or "Computer-based multiple-choice exam — verify current format with the official administrator."
    scoring_line = ctx.get("scoring") or "See the official score report / handbook for current scoring rules."
    who_line = ctx.get("who") or audience
    deck_covers = ctx.get("deck_covers") or f"{coverage} drills with explanations on every card."
    not_included = ctx.get("not_included") or "Official full-length adaptive exams — keep using the administrator's practice tools."
    why_anki = ctx.get("why_anki") or (
        "Spaced repetition keeps high-yield items retrievable under timed exam pressure."
    )
    official_url = ctx.get("official_url") or ""
    official_link = (
        f'<p class="mt-4 text-sm text-muted">Official overview: '
        f'<a href="{e(official_url)}" class="text-accent underline" rel="noopener noreferrer" target="_blank">'
        f'{e(official_url.replace("https://", "").split("/")[0])}</a> '
        f"(we are not affiliated).</p>"
        if official_url
        else ""
    )
    exam_section = f"""
    <section id="exam" class="mt-12" aria-labelledby="exam-heading">
      <p class="label-mono">Exam &amp; certification</p>
      <h2 id="exam-heading" class="mt-2 text-2xl font-semibold tracking-tight">{e(about_heading)}</h2>
      <p class="mt-4 text-base leading-7 text-muted">{e(about_body)}</p>
      <dl class="mt-6 grid gap-3 sm:grid-cols-2">{facts_html}</dl>
      <div class="mt-6 theme-card rounded-3xl p-6 sm:p-8 space-y-4 text-sm sm:text-base leading-7 text-muted">
        <p><strong class="text-[var(--fg)]">Format:</strong> {e(format_line)}</p>
        <p><strong class="text-[var(--fg)]">Scoring:</strong> {e(scoring_line)}</p>
        <p><strong class="text-[var(--fg)]">Who it's for:</strong> {e(who_line)}</p>
        <p><strong class="text-[var(--fg)]">What this deck covers:</strong> {e(deck_covers)}</p>
        <p><strong class="text-[var(--fg)]">Not included:</strong> {e(not_included)}</p>
        <p><strong class="text-[var(--fg)]">Why Anki:</strong> {e(why_anki)}</p>
      </div>
      {official_link}
    </section>
"""

    cover_block = ""
    if cover_url:
        cover_block = (
            f'<figure class="overflow-hidden rounded-3xl theme-card shadow-lg">'
            f'<img src="{e(cover_url)}" alt="{e(label)} Anki deck cover" '
            f'class="w-full h-auto object-cover" loading="eager"></figure>'
        )

    # Prefer explicit captions when sample order ≠ topics order (e.g. GRE Quant/Verbal/Quant).
    captions = {
        "gre-anki-deck": ["Quantitative Reasoning", "Verbal Reasoning", "Quantitative Reasoning"],
        "gmat-focus-anki-deck": ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
        "sat-anki-deck": ["Reading and Writing", "Math", "Math"],
        "pmp-anki-deck": ["People", "Process", "Business Environment"],
    }.get(slug)
    sample_figures = []
    for i, url in enumerate(sample_urls, 1):
        if captions and i - 1 < len(captions):
            caption = captions[i - 1]
        else:
            topic = topics[i - 1] if i - 1 < len(topics) else f"Sample {i}"
            caption = short_caption(topic)
        sample_figures.append(
            f"""        <figure class="theme-card overflow-hidden rounded-3xl shadow-sm">
          <img src="{e(url)}" alt="{e(label)} sample card {i}" class="w-full h-auto object-contain" loading="lazy">
          <figcaption class="px-4 py-3 text-xs text-muted">{e(caption)}</figcaption>
        </figure>"""
        )
    samples_section = ""
    if sample_figures:
        samples_section = f"""
    <section id="samples" class="mt-12" aria-labelledby="samples-heading">
      <h2 id="samples-heading" class="text-2xl font-semibold tracking-tight">Sample cards</h2>
      <p class="mt-2 text-sm text-muted">Real screenshots from the deck — question, four options, correct answer, and explanation on every card.</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
{chr(10).join(sample_figures)}
      </div>
    </section>
"""

    faq_items = [
        (
            "What exam / certification is this for?",
            f"{e(about_body)} <br><br><strong>Format:</strong> {e(format_line)}<br><strong>Scoring:</strong> {e(scoring_line)}",
        ),
        (
            "Who should buy this deck?",
            e(who_line),
        ),
        (
            "What does the deck cover — and what is missing?",
            f"<strong>Covers:</strong> {e(deck_covers)}<br><strong>Not included:</strong> {e(not_included)}",
        ),
        (
            "What is included in the download?",
            f"{count} Anki MCQ flashcards (.apkg) — built from the same validated bank as the free readiness check.",
        ),
        (
            "Is there a free practice test?",
            f'Yes. Take the free readiness check at <a href="{e(mock_url)}" class="text-accent underline">uniprep2go.study</a> — timed scoring and full answer review.',
        ),
        (
            "How do I import into Anki?",
            "Download the .apkg from Gumroad → Anki → File → Import → select the file. Sync to AnkiMobile or AnkiDroid via AnkiWeb.",
        ),
        (
            "Is this official exam material?",
            f"No. Independent study aid — not affiliated with, endorsed by, or sponsored by {disclaimer}. Always verify current exam rules on the official site.",
        ),
        (
            "Will this guarantee I pass / hit my target score?",
            "No. The deck improves retention and exam readiness; results depend on consistent study plus official practice tests.",
        ),
        ("Refunds?", "Digital download — all sales final."),
    ]
    faq_html = "".join(
        f'<details class="theme-card rounded-2xl p-5 group"><summary class="font-semibold cursor-pointer list-none flex justify-between gap-4 items-start">{e(q)}'
        f'<span class="text-accent shrink-0 group-open:rotate-45 transition-transform text-xl">+</span></summary>'
        f'<p class="text-muted text-sm mt-3 leading-relaxed">{a}</p></details>'
        for q, a in faq_items
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(seo_title)}</title>
  <meta name="description" content="{e(meta)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="{e(checkout)}">
  <meta property="og:type" content="product">
  <meta property="og:title" content="{e(seo_title)}">
  <meta property="og:description" content="{e(meta)}">
  <meta property="og:url" content="{e(checkout)}">
  <meta property="og:image" content="{e(cover_url)}">
  <meta name="twitter:image" content="{e(cover_url)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f7f3ea">
  <link rel="preconnect" href="https://cdn.tailwindcss.com">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {{ --bg:#f7f3ea; --fg:#18140f; --muted:#5f5749; --card:#fffaf0; --border:rgba(24,20,15,.15); --accent:#1f3a5f; --btn:#18140f; --btn-hover:#1f3a5f; --btn-fg:#fffaf0; }}
    body {{ background:var(--bg); color:var(--fg); }}
    .theme-card {{ background:var(--card); border:1px solid var(--border); }}
    .text-muted {{ color:var(--muted); }}
    .text-accent {{ color:var(--accent); }}
    .label-mono {{ font-family:ui-monospace,Menlo,monospace; font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); }}
    .btn-buy {{ background:var(--btn); color:var(--btn-fg); transition:background .2s,transform .2s; }}
    .btn-buy:hover {{ background:var(--btn-hover); transform:translateY(-1px); }}
    .btn-secondary {{ border:1px solid var(--border); color:var(--fg); }}
    .btn-secondary:hover {{ background:rgba(31,58,95,.08); }}
  </style>
</head>
<body class="antialiased font-sans">
  <header class="sticky top-0 z-50 border-b backdrop-blur-md" style="background:color-mix(in srgb,var(--bg) 88%,transparent);border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
      <p class="font-semibold text-sm truncate" data-gumroad-field="name">{e(product.get("name") or headline)}</p>
      <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy rounded-full px-5 py-2.5 text-sm font-semibold" rel="noopener noreferrer">Buy — <span data-gumroad-field="price">{e(price)}</span></a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 py-10">
    <p class="label-mono">Prep for {e(exam)} · UniPrep2Go</p>
    <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight" data-gumroad-field="name">{e(headline)}</h1>

    <div class="mt-8 grid lg:grid-cols-2 gap-8 items-start">
      <div class="space-y-4">
        <p class="text-lg sm:text-xl leading-8">{e(hook)}</p>
        <p class="text-base leading-7 text-muted">{e(audience)}</p>
        <ul class="space-y-3 text-sm sm:text-base">
          {benefits_html}
        </ul>
        <div class="flex flex-col gap-3 sm:flex-row pt-2">
          <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener noreferrer">Get instant access — <span data-gumroad-field="price">{e(price)}</span></a>
          <a href="{e(mock_url)}" class="btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener">Try free readiness check first</a>
        </div>
        <p class="text-sm leading-7 text-muted">Independent {e(exam)} study aid. Delivered as a .apkg file for <span data-gumroad-field="price">{e(price)}</span>. Not official {e(disclaimer)} material.</p>
      </div>
      {cover_block}
    </div>
{exam_section}
    <section class="mt-12" aria-labelledby="facts-heading">
      <h2 id="facts-heading" class="text-2xl font-semibold tracking-tight">Deck at a glance</h2>
      <dl class="mt-4 grid gap-3 sm:grid-cols-2">
        <div class="theme-card px-5 py-4"><dt class="label-mono">Cards</dt><dd class="mt-2 font-medium">{count} MCQ flashcards</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">File</dt><dd class="mt-2 font-medium">Anki .apkg</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">Coverage</dt><dd class="mt-2 font-medium">{e(coverage)}</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">Delivery</dt><dd class="mt-2 font-medium">Instant Gumroad download</dd></div>
      </dl>
    </section>
{samples_section}
    <section id="faq" class="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl font-semibold tracking-tight">FAQ</h2>
      <div class="mt-4 space-y-3">
        {faq_html}
      </div>
    </section>

    <section class="mt-12 mb-6" aria-labelledby="pricing-heading">
      <div class="theme-card rounded-3xl p-8 sm:p-10 text-center">
        <h2 id="pricing-heading" class="text-2xl font-semibold">Ready to drill?</h2>
        <p class="mt-3 text-muted max-w-lg mx-auto text-sm leading-relaxed">One-time purchase. Instant .apkg download. Built from the same bank as the free readiness check.</p>
        <p class="mt-2 text-4xl font-semibold"><span data-gumroad-field="price">{e(price)}</span></p>
        <p class="hidden" data-gumroad-field="description" aria-hidden="true">{e(meta)}</p>
        <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold" rel="noopener noreferrer">I want this — instant download</a>
        <p class="mt-4 text-xs text-muted">Independent study aid · Not official {e(disclaimer)} material · Digital download — all sales final.</p>
      </div>
    </section>
  </main>

  <footer class="border-t py-6" style="border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
      <p>PixiD Studio · UniPrep2Go</p>
      <a href="{e(deck_url)}" class="underline" rel="noopener">Deck page on UniPrep2Go</a>
    </div>
  </footer>
</body>
</html>"""


def remove_trailing_sample_covers(product_id: str, keep: int = 3) -> str:
    """If gallery grew past main covers (samples were added as covers), drop the extras."""
    view = gumroad_json(["products", "view", product_id])
    prod = view.get("product") or view
    covers = list(prod.get("covers") or [])
    if len(covers) <= keep:
        return f"covers={len(covers)}"
    removed = 0
    # Remove from the end (samples were appended last).
    for cover in reversed(covers[keep:]):
        cid = cover.get("id")
        if not cid:
            continue
        out = subprocess.run(
            [
                "gumroad",
                "products",
                "covers",
                "remove",
                product_id,
                cid,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
        )
        if out.returncode == 0:
            removed += 1
    return f"covers {len(covers)}→{len(covers) - removed} (removed {removed})"


def publish_landing(product_id: str, html_doc: str) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as fh:
        fh.write(html_doc)
        path = fh.name
    try:
        out = subprocess.run(
            [
                "gumroad",
                "products",
                "page",
                "publish",
                product_id,
                path,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
        )
        if out.returncode != 0:
            raise RuntimeError(out.stderr.strip() or out.stdout.strip())
    finally:
        Path(path).unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append", dest="slugs")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--strip-sample-covers",
        action="store_true",
        help="Remove covers beyond the first 3 (sample screenshots wrongly added as covers).",
    )
    parser.add_argument(
        "--keep-covers",
        type=int,
        default=1,
        help="How many product covers to keep (default 1 = hero only; samples live in landing HTML).",
    )
    parser.add_argument(
        "--force-cdn",
        action="store_true",
        help="Re-upload samples to Gumroad CDN even if cache already has URLs.",
    )
    args = parser.parse_args()

    specs = json.loads(SPECS_PATH.read_text(encoding="utf-8"))
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    cdn_cache = load_cdn_cache()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    results: list[str] = []

    for slug, record in catalog["products"].items():
        if args.slugs and slug not in args.slugs:
            continue
        product_id = record.get("gumroadProductId")
        if not product_id or slug not in specs:
            results.append(f"SKIP  {slug}")
            continue
        spec = specs[slug]
        if not sample_paths(slug):
            results.append(f"SKIP  {slug} (no local samples)")
            continue

        view = gumroad_json(["products", "view", product_id])
        product = view.get("product") or view
        covers = product.get("covers") or []
        cover_url = ""
        if covers:
            cover_url = covers[0].get("original_url") or covers[0].get("url") or ""

        try:
            if args.dry_run and not args.force_cdn and slug in cdn_cache:
                sample_urls = cdn_cache[slug]
            elif args.dry_run:
                sample_urls = [f"https://public-files.gumroad.com/dry-run-{slug}-{i}" for i in range(1, 4)]
            else:
                sample_urls = ensure_sample_cdn_urls(
                    product_id, slug, cdn_cache, force=args.force_cdn
                )

            html_doc = render_landing(spec, product, cover_url, sample_urls)
            out_path = OUT_DIR / f"{slug}.html"
            out_path.write_text(html_doc, encoding="utf-8")

            if args.dry_run:
                results.append(f"DRY   {slug} → {out_path} ({len(html_doc)} chars, {len(sample_urls)} samples)")
                continue

            publish_landing(product_id, html_doc)
            note = f"published cdn={len(sample_urls)}"
            if args.strip_sample_covers:
                note += "; " + remove_trailing_sample_covers(product_id, keep=args.keep_covers)
            results.append(f"OK    {slug} ({note})")
        except Exception as exc:  # noqa: BLE001
            results.append(f"FAIL  {slug}: {exc}")

    print("\n".join(results))


if __name__ == "__main__":
    main()
