#!/usr/bin/env node
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_SLUGS = new Set([
  "gmat-focus-readiness-check", // expanded via generate-mock-banks-openrouter
]);

const TOPIC_FACTS = {
  core: {
    q: "Under EPA Section 608, why is refrigerant venting to the atmosphere restricted?",
    correct: "It depletes stratospheric ozone and many refrigerants are greenhouse gases regulated under the Clean Air Act.",
    wrong: [
      "Venting is only restricted for ammonia systems.",
      "Technicians may vent any refrigerant if the charge is under 5 pounds.",
      "Venting is allowed whenever recovery equipment is unavailable.",
    ],
  },
  "type-1": {
    q: "Which appliances are typically covered by EPA Section 608 Type I certification?",
    correct: "Small appliances sealed at the factory with 5 pounds or less of refrigerant.",
    wrong: [
      "Centrifugal chillers only.",
      "Industrial ammonia refrigeration racks only.",
      "Any system above 200 tons cooling capacity.",
    ],
  },
  "type-2": {
    q: "Type II certification covers which class of equipment?",
    correct: "High-pressure appliances except small appliances and very low-pressure equipment.",
    wrong: [
      "Low-pressure centrifugal chillers only.",
      "Domestic window units only.",
      "Transport refrigeration exclusively.",
    ],
  },
  "type-3": {
    q: "Type III certification primarily addresses which systems?",
    correct: "Low-pressure appliances such as large centrifugal chillers using low-pressure refrigerants.",
    wrong: [
      "Residential split systems only.",
      "Automotive AC only.",
      "Propane commercial kitchen equipment.",
    ],
  },
  "bacnet-networking": {
    q: "What is the primary purpose of BACnet (ASHRAE Standard 135)?",
    correct: "Interoperable communication between building automation devices from different manufacturers.",
    wrong: [
      "Electrical wiring color codes for HVAC panels.",
      "Fire alarm voice evacuation messaging only.",
      "Structural load calculations for rooftop units.",
    ],
  },
  "hvac-control": {
    q: "In a typical AHU discharge air temperature reset sequence, what happens as cooling load decreases?",
    correct: "Supply air temperature setpoint may be reset upward within safe comfort and dehumidification limits.",
    wrong: [
      "Outdoor air damper must always close to 0%.",
      "Chiller staging is unrelated to AHU control.",
      "Return fan speed is fixed and cannot modulate.",
    ],
  },
  "platform-ops": {
    q: "Why are alarm prioritization and acknowledgment workflows important in a BMS?",
    correct: "They help operators focus on critical faults and maintain an audit trail of response actions.",
    wrong: [
      "They eliminate the need for preventive maintenance.",
      "They disable all nuisance alarms permanently without review.",
      "They replace BACnet device discovery.",
    ],
  },
  "integration-commissioning": {
    q: "During BMS commissioning, what should be verified for each critical control point?",
    correct: "Correct I/O mapping, scaling, command authority, and alarm routing match the sequence of operations.",
    wrong: [
      "Only the graphic color matches the CAD background.",
      "Network IP addresses are hidden from integrators.",
      "Trend logs are disabled to save storage.",
    ],
  },
  "integrative-process": {
    q: "What is a key goal of the LEED integrative process credit?",
    correct: "Cross-discipline analysis early in design to identify synergies and reduce cost of green strategies.",
    wrong: [
      "Eliminating the commissioning agent from the project team.",
      "Using only prescriptive compliance without energy modeling.",
      "Deferring all water efficiency decisions until construction.",
    ],
  },
  "location-transportation": {
    q: "LEED Location and Transportation credits commonly reward projects for:",
    correct: "Dense, transit-accessible sites that reduce single-occupancy vehicle dependence.",
    wrong: [
      "Maximum parking capacity regardless of transit access.",
      "Locating only on greenfield sites far from services.",
      "Prohibiting bicycle storage on site.",
    ],
  },
  "sites-water": {
    q: "A LEED Sustainable Sites strategy for stormwater management typically emphasizes:",
    correct: "Quantity and quality control using infiltration, detention, or reuse where feasible.",
    wrong: [
      "Directing all runoff to sanitary sewer without treatment.",
      "Eliminating all landscaping to avoid irrigation.",
      "Maximum impervious cover without mitigation.",
    ],
  },
  "energy-atmosphere": {
    q: "In LEED BD+C Energy and Atmosphere, prerequisite energy metering requires:",
    correct: "Whole-building energy consumption tracking and sharing of data with the owner.",
    wrong: [
      "No submetering or benchmarking of any kind.",
      "On-site fossil generation without limits.",
      "Elimination of all renewable energy documentation.",
    ],
  },
  "materials-ieq": {
    q: "LEED Materials and Resources credits often encourage:",
    correct: "Reduced embodied carbon, waste diversion, and responsible sourcing of materials.",
    wrong: [
      "Maximum virgin material use without tracking.",
      "Landfilling all construction waste without diversion.",
      "Avoiding any environmental product declarations.",
    ],
  },
  "process-location": {
    q: "For LEED AP BD+C, integrative process differs from GA-level knowledge because it expects:",
    correct: "Application of credit synergies and prerequisite/credit relationships on real BD+C projects.",
    wrong: [
      "Memorization of only the LEED GA handbook glossary.",
      "Ignoring regional priority credits entirely.",
      "No understanding of MPRs.",
    ],
  },
  "materials-resources": {
    q: "On a LEED BD+C project, Construction and Demolition Waste Management credits require:",
    correct: "Diversion of recyclable and recoverable materials from landfills with documented hauler data.",
    wrong: [
      "Landfilling 100% of waste without tracking.",
      "No waste audit at any project phase.",
      "Prohibiting reuse of salvaged materials.",
    ],
  },
  "indoor-environmental-quality": {
    q: "LEED IEQ credits for low-emitting materials address:",
    correct: "VOC limits for adhesives, sealants, paints, flooring, and composite wood.",
    wrong: [
      "Structural steel yield strength only.",
      "Elevator cab finishes exclusively.",
      "Exterior cladding wind load only.",
    ],
  },
  "air-water-nourishment": {
    q: "WELL v2 Air concept requirements commonly address:",
    correct: "Ventilation effectiveness, filtration, and control of indoor air pollutants.",
    wrong: [
      "Only outdoor PM10 with no indoor limits.",
      "Elimination of all mechanical ventilation.",
      "Unrestricted smoking in designated lobbies.",
    ],
  },
  "light-movement-thermal": {
    q: "WELL Light concept features often include:",
    correct: "Circadian lighting design, glare control, and daylight access where feasible.",
    wrong: [
      "Minimum 1000 lux at all workstations at all times.",
      "Prohibition of window shades.",
      "No consideration of melanopic equivalent daylight illuminance.",
    ],
  },
  "sound-materials": {
    q: "WELL Materials features typically restrict:",
    correct: "Hazardous ingredient thresholds in building products and cleaning protocols.",
    wrong: [
      "All wood products regardless of emissions.",
      "Only exterior paving materials.",
      "Acoustic privacy with no material criteria.",
    ],
  },
  "mind-community": {
    q: "WELL Mind and Community concepts focus on:",
    correct: "Mental health support, restorative spaces, and equitable access to wellness amenities.",
    wrong: [
      "Eliminating all quiet spaces in open offices.",
      "No stakeholder engagement on wellness policies.",
      "Prohibiting mental health resources.",
    ],
  },
  "well-certification-portfolio": {
    q: "WELL Certification differs from WELL Portfolio in that:",
    correct: "Certification applies to individual assets; Portfolio scales WELL strategies across multiple locations.",
    wrong: [
      "Portfolio requires no on-site performance verification.",
      "Certification never uses third-party document review.",
      "They are identical programs with different names.",
    ],
  },
  "policy-audits-economics": {
    q: "In energy auditing, a Level II ASHRAE audit typically includes:",
    correct: "Detailed energy analysis, savings calculations, and economic evaluation of ECMs.",
    wrong: [
      "Only a walk-through with no utility data.",
      "Investment-grade financing contracts only.",
      "No baseline energy model.",
    ],
  },
  "electrical-lighting": {
    q: "Power factor on an industrial plant meter below 0.90 often indicates:",
    correct: "Reactive power from motors and transformers — correctable with power factor correction.",
    wrong: [
      "Excess solar generation only.",
      "Perfect unity power factor is impossible to measure.",
      "Lighting loads cannot affect power factor.",
    ],
  },
  "hvac-envelope-bas": {
    q: "Building envelope commissioning for CEM-relevant projects verifies:",
    correct: "Air barrier continuity, insulation installation quality, and fenestration performance.",
    wrong: [
      "Only interior paint VOC levels.",
      "Elevator traffic studies exclusively.",
      "No relationship to HVAC load calculations.",
    ],
  },
  "industrial-boiler-renewables": {
    q: "A common boiler efficiency improvement measure is:",
    correct: "Combustion tuning, economizers, and blowdown heat recovery.",
    wrong: [
      "Operating without oxygen trim indefinitely.",
      "Eliminating all stack temperature monitoring.",
      "Increasing excess air without measurement.",
    ],
  },
  "commissioning-espc": {
    q: "In an ESPC, measurement and verification (M&V) is used to:",
    correct: "Document actual savings against an agreed baseline using IPMVP or similar protocols.",
    wrong: [
      "Eliminate all utility bill review.",
      "Guarantee savings without any measurement.",
      "Replace the need for a commissioning agent.",
    ],
  },
  "bemp-modeling": {
    q: "ASHRAE BEMP certification focuses on:",
    correct: "Building energy modeling software proficiency, calibration, and interpretation.",
    wrong: [
      "Refrigerant recovery procedures only.",
      "Fire sprinkler hydraulic calculations only.",
      "Elevator traffic simulation exclusively.",
    ],
  },
  "beap-assessment": {
    q: "BEAP (Building Energy Assessment Professional) emphasizes:",
    correct: "On-site assessment of building energy performance and improvement recommendations.",
    wrong: [
      "Only new construction energy modeling without existing buildings.",
      "Healthcare HVAC design exclusively.",
      "BACnet programming certification.",
    ],
  },
  "bcxp-commissioning": {
    q: "BCxP commissioning providers typically deliver:",
    correct: "Owner-focused commissioning process management from design through occupancy.",
    wrong: [
      "Only TAB services with no design review.",
      "Manufacturer warranty registration only.",
      "Structural peer review exclusively.",
    ],
  },
  "chd-hbdp-design": {
    q: "ASHRAE CHD/HBDP credentials validate:",
    correct: "HVAC system design competency and high-performance integrated design knowledge.",
    wrong: [
      "Only plumbing fixture counts.",
      "Electrical one-line drafting without load analysis.",
      "Land surveying legal descriptions.",
    ],
  },
  "opmp-operations": {
    q: "OPMP (Operations and Performance Management Professional) covers:",
    correct: "Existing building operations, performance tracking, and continuous improvement.",
    wrong: [
      "Only new construction commissioning with no operations phase.",
      "Refrigerant sales licensing.",
      "Food safety HACCP exclusively.",
    ],
  },
  "site-standards-building": {
    q: "TIA-942 data centre ratings primarily address:",
    correct: "Telecommunications infrastructure, redundancy, and facility topology for data centres.",
    wrong: [
      "Kitchen exhaust only.",
      "Residential swimming pool chemistry.",
      "Agricultural silo ventilation.",
    ],
  },
  "power-emf-distribution": {
    q: "In a tier III data centre power design, N+1 typically means:",
    correct: "Capacity to support load with one independent power component out of service for maintenance.",
    wrong: [
      "No redundancy in UPS modules.",
      "Single path of power with no backup generator.",
      "Utility power only with no ATS.",
    ],
  },
  "cooling-water-thermal": {
    q: "ASHRAE TC 9.9 thermal guidelines for data centres recommend:",
    correct: "Allowable intake temperature and humidity envelopes for IT equipment reliability.",
    wrong: [
      "Constant 10°C supply air for all servers regardless of manufacturer.",
      "No humidity control in any climate.",
      "Eliminating hot/cold aisle layouts.",
    ],
  },
  "fire-security-network": {
    q: "Clean-agent fire suppression in a data centre is chosen because:",
    correct: "It extinguishes fire with minimal residue and low collateral damage to electronics.",
    wrong: [
      "Water sprinklers are always prohibited globally.",
      "It increases oxygen concentration to feed combustion.",
      "It replaces all physical security controls.",
    ],
  },
  "operations-management": {
    q: "Data centre PUE (Power Usage Effectiveness) is calculated as:",
    correct: "Total facility energy divided by IT equipment energy.",
    wrong: [
      "IT energy divided by total facility energy.",
      "Cooling energy only divided by lighting energy.",
      "Generator fuel gallons divided by rack count.",
    ],
  },
  "hsm-systems-culture": {
    q: "ISO 45001 occupational health and safety management systems require:",
    correct: "Leadership commitment, hazard identification, and continual improvement of OH&S performance.",
    wrong: [
      "No documented worker participation.",
      "Elimination of all risk assessments.",
      "No legal compliance evaluation.",
    ],
  },
  "health-ergonomics": {
    q: "Under NEBOSH IGC, manual handling risk reduction prioritizes:",
    correct: "Elimination/substitution before engineering and administrative controls, with PPE last.",
    wrong: [
      "PPE as the only acceptable control.",
      "No need to assess load weight or frequency.",
      "Maximum twist speeds for all workers.",
    ],
  },
  "agents-workplace-hazards": {
    q: "Control of hazardous substances emphasizes:",
    correct: "Substitution, enclosure, LEV, safe systems of work, and PPE as last resort.",
    wrong: [
      "Unlimited solvent use without ventilation.",
      "No SDS review before tasks.",
      "Storage of incompatible chemicals together without segregation.",
    ],
  },
  "equipment-fire-electricity": {
    q: "Portable appliance testing (where required) aims to:",
    correct: "Detect faults in portable electrical equipment that could cause shock or fire.",
    wrong: [
      "Replace fixed wiring inspection entirely.",
      "Eliminate all residual current devices.",
      "Permit damaged flex cables if taped.",
    ],
  },
  "gic2-risk-assessment": {
    q: "NEBOSH GIC2 risk assessment expects candidates to:",
    correct: "Identify hazards, evaluate risk, and propose proportionate controls using a 5-step approach.",
    wrong: [
      "List hazards without controls or prioritization.",
      "Use only generic textbook examples unrelated to the workplace.",
      "Ignore worker consultation.",
    ],
  },
  "fire-suppression": {
    q: "NFPA 13 sprinkler systems are primarily designed for:",
    correct: "Automatic control and suppression of fire in buildings based on occupancy and hazard classification.",
    wrong: [
      "Detection of carbon monoxide only.",
      "Kitchen grease exhaust exclusively without water.",
      "Structural steel fireproofing application.",
    ],
  },
  "safety-built-environment": {
    q: "Means of egress design under life safety codes requires:",
    correct: "Adequate exit capacity, travel distance limits, and protected exit paths.",
    wrong: [
      "Single exit for unlimited occupant load.",
      "No emergency lighting in any occupancy.",
      "Locking all exits during business hours without exception.",
    ],
  },
  "detection-alarm": {
    q: "Spot-type smoke detectors are typically NOT suitable for:",
    correct: "High-ceiling atriums where smoke stratifies before reaching the detector.",
    wrong: [
      "Small office rooms with flat ceilings.",
      "Corridors with smooth ceilings.",
      "Sleeping rooms with standard ceiling heights.",
    ],
  },
  "fire-prevention-programs": {
    q: "Hot work permits in fire prevention programs require:",
    correct: "Authorization, fire watch, and control of combustibles in the work area.",
    wrong: [
      "Welding without any fire extinguisher present.",
      "No communication with the AHJ.",
      "Permanent exemption for all maintenance staff.",
    ],
  },
  "information-analysis": {
    q: "Fire dynamics analysis for CFPS candidates includes understanding:",
    correct: "Heat release rate, smoke production, and growth stages of compartment fires.",
    wrong: [
      "Only structural wind loads.",
      "Plumbing vent stack sizing exclusively.",
      "Electrical harmonics without fire context.",
    ],
  },
  "facility-hazard-management": {
    q: "Process hazard analysis in industrial facilities often uses:",
    correct: "HAZOP or what-if checklists to identify deviation scenarios and safeguards.",
    wrong: [
      "No documentation of safeguards.",
      "Elimination of all automatic shutdown systems.",
      "Only qualitative color codes without scenarios.",
    ],
  },
  "organizing-fire-rescue": {
    q: "Incident Command System (ICS) in fire service organizes:",
    correct: "Unified command, span of control, and clear roles during emergency operations.",
    wrong: [
      "Only post-incident marketing communications.",
      "Elimination of mutual aid agreements.",
      "Unlimited span of control for one officer.",
    ],
  },
  "confining-fires": {
    q: "Compartmentation as a fire confinement strategy relies on:",
    correct: "Fire-rated assemblies limiting fire spread and protecting egress paths.",
    wrong: [
      "Open-plan only with no rated walls.",
      "Combustible ceiling tiles in all shafts.",
      "Removing all fire dampers from ducts.",
    ],
  },
  "mandatory-competencies": {
    q: "RICS mandatory competencies at Level 2 include demonstrating:",
    correct: "Application of client care, communication, and health and safety in professional practice.",
    wrong: [
      "Only theoretical knowledge with no workplace examples.",
      "No need for CPD records.",
      "Avoidance of all conflict of interest disclosure.",
    ],
  },
  "ethics-rules-conduct": {
    q: "RICS Rules of Conduct require members to:",
    correct: "Act with integrity, avoid conflicts without disclosure, and maintain professional competence.",
    wrong: [
      "Accept gifts that influence impartial advice without disclosure.",
      "Misrepresent qualifications to win work.",
      "Ignore client money handling rules.",
    ],
  },
  "core-technical-pathway": {
    q: "At APC Level 3, a candidate must demonstrate:",
    correct: "Reasoned advice to clients backed by depth of technical knowledge and real project examples.",
    wrong: [
      "Only textbook definitions without project context.",
      "No personal responsibility for advice given.",
      "Memorization of pathway guide page numbers only.",
    ],
  },
  "level2-level3-application": {
    q: "Level 2 vs Level 3 in RICS competencies differs because Level 3 requires:",
    correct: "Personal delivery of reasoned advice with documented outcomes on live projects.",
    wrong: [
      "Only observation of others' work without involvement.",
      "No examples from the last five years.",
      "Generic industry trends without project specifics.",
    ],
  },
  "case-study-interview": {
    q: "An APC case study must typically:",
    correct: "Describe a recent project (within 24 months) where you personally provided Level 3 advice.",
    wrong: [
      "Be entirely fictional with no client context.",
      "Exclude any critical analysis of your own decisions.",
      "Exceed 10,000 words regardless of guidance.",
    ],
  },
  "commercial-cost-planning": {
    q: "Design economics and cost planning at RICS Level 3 includes:",
    correct: "Evolution of cost plans from order-of-cost to pre-tender sums with value engineering advice.",
    wrong: [
      "Only counting doors and windows without elemental analysis.",
      "Ignoring market tender price feedback.",
      "Single lump sum with no elemental breakdown ever.",
    ],
  },
  "quantification-measurement": {
    q: "Quantification and costing of construction works requires:",
    correct: "Accurate measurement to agreed rules (e.g., NRM) and logical pricing of BOQ items.",
    wrong: [
      "Guestimating quantities without dimension sheets.",
      "Ignoring provisional sums and contingencies.",
      "No reconciliation with cost plan.",
    ],
  },
  "contracts-procurement": {
    q: "Under JCT Design and Build, the contractor's primary design responsibility means:",
    correct: "The contractor completes the design to meet the employer's requirements and carries allocated design risk.",
    wrong: [
      "The employer retains all design risk without exception.",
      "No need for contract sum analysis.",
      "Variations are never measured or valued.",
    ],
  },
  "project-finance-construction": {
    q: "Project finance control and reporting for QS includes:",
    correct: "Cash flow forecasting, cost reporting against budget, and final account preparation.",
    wrong: [
      "Only weekly site diary entries with no cost data.",
      "Eliminating retention and defects liability tracking.",
      "No integration with valuation certificates.",
    ],
  },
  "mandatory-ethics-optional": {
    q: "On the QS pathway, Ethics at Level 3 is critical because:",
    correct: "Unsatisfactory ethics answers in the final interview can cause automatic referral.",
    wrong: [
      "Ethics is optional and never assessed in interview.",
      "Optional competencies replace all mandatory requirements.",
      "RICS does not assess professional conduct.",
    ],
  },
};

const DEFAULT_FACT = {
  q: "Which statement best reflects professional practice in this competency area?",
  correct: "Apply recognized standards, document decisions, and seek proportionate solutions aligned with client objectives.",
  wrong: [
    "Ignore applicable codes and rely on informal practice only.",
    "Defer all professional judgment to unqualified subcontractors without review.",
    "Avoid record-keeping because it slows delivery.",
  ],
};

function getFact(topicId, index) {
  const base = TOPIC_FACTS[topicId] ?? DEFAULT_FACT;
  if (index === 0) return base;
  return {
    ...base,
    q: base.q.replace(/\?$/, ` (scenario ${index + 1})?`),
  };
}

function makeQuestion(examSlug, topicId, topicLabel, seq) {
  const fact = getFact(topicId, seq);
  const optionIds = ["a", "b", "c", "d"];
  const correctOptionId = optionIds[seq % 4];
  const wrongPool = [...fact.wrong];
  const options = optionIds.map((id) => {
    if (id === correctOptionId) {
      return { id, text: fact.correct };
    }
    const wrong = wrongPool.shift() ?? `Incorrect practice related to ${topicLabel}.`;
    return { id, text: wrong };
  });
  const correctText = options.find((o) => o.id === correctOptionId)?.text ?? fact.correct;
  const distractorExplanations = {};
  for (const opt of options) {
    if (opt.id !== correctOptionId) {
      distractorExplanations[opt.id] = `Incorrect. This does not reflect best practice for ${topicLabel}.`;
    }
  }
  const num = String(seq + 1).padStart(3, "0");
  return {
    id: `${examSlug}-${topicId}-${num}`,
    examSlug,
    topicId,
    prompt: fact.q,
    options,
    correctOptionId,
    explanation: `Correct: ${correctText} This aligns with ${topicLabel} for this readiness check.`,
    distractorExplanations,
    difficulty: seq % 3 === 0 ? "easy" : seq % 3 === 1 ? "medium" : "hard",
    sourceNote: `Minimal preview bank — ${topicLabel} (10 questions per topic seed).`,
  };
}

async function main() {
  const { mockExamConfigs } = await import("../src/lib/mock-exams/configs.ts");

  for (const config of mockExamConfigs) {
    if (SKIP_SLUGS.has(config.slug)) continue;
    if (config.status !== "preview") continue;

    const bankPath = join(root, `src/data/mock-exams/${config.slug}.json`);
    let existing = [];
    try {
      existing = JSON.parse(readFileSync(bankPath, "utf8"));
    } catch {
      /* empty */
    }
    if (existing.length > 0) {
      console.log(`skip ${config.slug} (${existing.length} questions)`);
      continue;
    }

    // Only generate for exams that previously had empty banks (our new readiness checks)
    const EMPTY_ONLY = new Set([
      "epa-608-readiness-check",
      "bms-bas-readiness-check",
      "leed-green-associate-readiness-check",
      "leed-ap-bd-c-readiness-check",
      "well-ap-readiness-check",
      "cem-readiness-check",
      "ashrae-certifications-readiness-check",
      "cdcp-readiness-check",
      "nebosh-readiness-check",
      "cfps-readiness-check",
      "mrics-readiness-check",
      "mrics-quantity-surveying-readiness-check",
    ]);
    if (!EMPTY_ONLY.has(config.slug)) {
      continue;
    }

    const questions = [];
    for (const topic of config.topics) {
      const count = topic.questionCount ?? 10;
      for (let i = 0; i < count; i++) {
        questions.push(makeQuestion(config.slug, topic.id, topic.label, i));
      }
    }

    writeFileSync(bankPath, `${JSON.stringify(questions, null, 2)}\n`);
    console.log(`wrote ${config.slug}: ${questions.length} questions`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
