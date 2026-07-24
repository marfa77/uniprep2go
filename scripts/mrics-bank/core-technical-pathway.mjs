import { makeQ, rot } from "./makeQ.mjs";

export const coreTechnicalPathway = [
  makeQ(
    "For APC core technical readiness, regarding selecting your APC pathway with your counsellor, which statement is correct?",
    "Match pathway to role, evidence base, and long-term practice area",
    [
    { text: "Pathway choice is cosmetic and interchangeable at final assessment", why: "Pathway must match evidenced practice." },
    { text: "Level 1 requires leading projects independently at director level", why: "Level 1 is foundational knowledge, not director leadership." },
    { text: "Professional statements are optional historical documents only", why: "Statements are active standards." },
    ],
    "Pathway choice should align role, evidence, and career direction.",
    "easy",
    rot(0)
  ),
  makeQ(
    "For APC core technical readiness, regarding describing Level 1 technical competency in your pathway, which statement is correct?",
    "Demonstrate knowledge and understanding of concepts, principles, and terminology",
    [
    { text: "Pathway choice is cosmetic and interchangeable at final assessment", why: "Pathway must match evidenced practice." },
    { text: "Level 1 requires leading projects independently at director level", why: "Level 1 is foundational knowledge, not director leadership." },
    { text: "Professional statements are optional historical documents only", why: "Statements are active standards." },
    ],
    "Level 1 is knowledge-based understanding.",
    "easy",
    rot(1)
  ),
  makeQ(
    "For APC core technical readiness, regarding using a current RICS professional statement on your project, which statement is correct?",
    "Apply the statement as the primary quality reference for that topic",
    [
    { text: "Pathway choice is cosmetic and interchangeable at final assessment", why: "Pathway must match evidenced practice." },
    { text: "Level 1 requires leading projects independently at director level", why: "Level 1 is foundational knowledge, not director leadership." },
    { text: "Professional statements are optional historical documents only", why: "Statements are active standards." },
    ],
    "Professional statements define expected practice standards.",
    "easy",
    rot(2)
  ),
  makeQ(
    "For APC core technical readiness, regarding reading your pathway guide during APC training, which statement is correct?",
    "Understand required competencies, levels, and acceptable evidence types",
    [
    { text: "Pathway choice is cosmetic and interchangeable at final assessment", why: "Pathway must match evidenced practice." },
    { text: "Level 1 requires leading projects independently at director level", why: "Level 1 is foundational knowledge, not director leadership." },
    { text: "Professional statements are optional historical documents only", why: "Statements are active standards." },
    ],
    "Pathway guides structure APC requirements.",
    "easy",
    rot(3)
  ),
  makeQ(
    "For APC core technical readiness, regarding distinguishing core technical from mandatory competencies, which statement is correct?",
    "Core technical covers pathway specialism; mandatory covers universal practice skills",
    [
    { text: "Pathway choice is cosmetic and interchangeable at final assessment", why: "Pathway must match evidenced practice." },
    { text: "Level 1 requires leading projects independently at director level", why: "Level 1 is foundational knowledge, not director leadership." },
    { text: "Professional statements are optional historical documents only", why: "Statements are active standards." },
    ],
    "Distinct competency groups serve different purposes.",
    "easy",
    rot(4)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for applying BCIS or comparable cost data on a feasibility?",
    "Use recognised cost data with stated basis, location, date, and adjustments",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing applying BCIS or comparable cost data.",
    "medium",
    rot(5)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for selecting NRM measurement rules for a cost plan?",
    "Select the NRM ruleset aligned to project stage and reporting purpose",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing selecting NRM measurement rules for a cost plan.",
    "easy",
    rot(6)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for explaining fundamental JCT payment mechanisms at Level 1?",
    "Understand roles, payment stages, and notice requirements conceptually",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing explaining fundamental JCT payment mechanisms at Level 1.",
    "medium",
    rot(7)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for linking cost plan structure to design milestones?",
    "Relate cost plan sections to design decisions and approval gates",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing linking cost plan structure to design milestones.",
    "easy",
    rot(8)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for introducing whole life cost in option appraisal?",
    "Include capital, operating, maintenance, and end-of-life cost principles",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing introducing whole life cost in option appraisal.",
    "medium",
    rot(9)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for using a risk register at concept stage?",
    "Identify, classify, and allocate risks for management not elimination alone",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing using a risk register at concept stage.",
    "easy",
    rot(10)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for describing value engineering to a client?",
    "Improve value by balancing function, quality, and cost without arbitrary cuts",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing describing value engineering to a client.",
    "medium",
    rot(11)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for comparing procurement routes at early stage?",
    "Assess time, price certainty, complexity, and client capabilities",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing comparing procurement routes at early stage.",
    "easy",
    rot(12)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for BIM Level 1 information management awareness?",
    "Understand structured information exchange and collaboration principles",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing BIM Level 1 information management awareness.",
    "medium",
    rot(13)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for sustainability targets in cost planning?",
    "Recognise how sustainability requirements affect design, cost, and operation",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing sustainability targets in cost planning.",
    "easy",
    rot(14)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for operating cost dominance in offices?",
    "Recognise that operating costs often dominate whole life spend in many assets",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing operating cost dominance in offices.",
    "medium",
    rot(15)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for applying construction inflation indices?",
    "Apply appropriate indices with stated base date and logic",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing applying construction inflation indices.",
    "easy",
    rot(16)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for elemental cost analysis for benchmarking?",
    "Break down cost by building elements to support comparison and control",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing elemental cost analysis for benchmarking.",
    "medium",
    rot(17)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for setting cost reporting cycles for a client?",
    "Align reporting cadence to client decision points and contract mechanisms",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing setting cost reporting cycles for a client.",
    "easy",
    rot(18)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for change control on a construction project?",
    "Establish clear valuation, approval, and record processes for changes",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing change control.",
    "medium",
    rot(19)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for final account reconciliation overview?",
    "Reconcile contract sum, changes, and adjustments to an agreed final account",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing final account reconciliation overview.",
    "easy",
    rot(20)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for dispute avoidance on a contentious refurbishment?",
    "Use early warning, clear records, and collaborative issue resolution",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing dispute avoidance.",
    "medium",
    rot(21)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for CDM duty holder awareness at feasibility?",
    "Understand principal designer and contractor roles and information flow",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing CDM duty holder awareness at feasibility.",
    "easy",
    rot(22)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for planning obligations in viability modelling?",
    "Include section agreements, CIL, and delay costs where material",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing planning obligations in viability modelling.",
    "medium",
    rot(23)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for VAT and tax interfaces at feasibility stage?",
    "Identify where tax treatments may affect gross development value",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing VAT and tax interfaces at feasibility stage.",
    "easy",
    rot(24)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for market analysis inputs for rental appraisal?",
    "Use evidence-based demand, rental, and yield assumptions",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing market analysis inputs for rental appraisal.",
    "medium",
    rot(25)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for drawing revision control before pricing?",
    "Maintain revision control to prevent pricing outdated design information",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing drawing revision control before pricing.",
    "easy",
    rot(26)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for contract document precedence if conflict arises?",
    "Understand hierarchy of contract documents stated in the conditions",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing contract document precedence if conflict arises.",
    "medium",
    rot(27)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for pricing project-specific preliminaries?",
    "Cover site-specific costs, insurances, and management not in measured work",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing pricing project-specific preliminaries.",
    "easy",
    rot(28)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for using provisional sums appropriately?",
    "Allow for undefined work with as much scope definition as possible",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing using provisional sums appropriately.",
    "medium",
    rot(29)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for contingency versus provisional sum on a cost plan?",
    "Use contingency for known unknowns and provisional sums for defined scope gaps",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing contingency versus provisional sum.",
    "easy",
    rot(30)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for cash flow profiling for client funding?",
    "Map expenditure and income timing to support funding decisions",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing cash flow profiling for client funding.",
    "medium",
    rot(31)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for benchmarking a proposed office scheme?",
    "Compare like-with-like on date, location, specification, and scope",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing benchmarking a proposed office scheme.",
    "easy",
    rot(32)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for peer review of a colleague cost plan?",
    "Check arithmetic, scope completeness, and stated assumptions independently",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing peer review of a colleague cost plan.",
    "medium",
    rot(33)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for international project cost planning?",
    "Adjust for local standards, currency, procurement law, and market conditions",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing international project cost planning.",
    "easy",
    rot(34)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for digital cost modelling tools?",
    "Use software to improve accuracy and audit trail while retaining professional judgement",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing digital cost modelling tools.",
    "medium",
    rot(35)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for employer requirements in design and build?",
    "Client requirements define performance standards the contractor must meet",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing employer requirements in design and build.",
    "easy",
    rot(36)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for performance specifications in D&B?",
    "Define required outcomes allowing contractor design freedom within limits",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing performance specifications in D&B.",
    "medium",
    rot(37)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for lifecycle replacement of major plant?",
    "Plan for major plant replacement in whole life cost models",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing lifecycle replacement of major plant.",
    "easy",
    rot(38)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for modular construction cost drivers?",
    "Consider factory, logistics, and interface risks affecting modular economics",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing modular construction cost drivers.",
    "medium",
    rot(39)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for refurbishment cost uncertainty?",
    "Allow for existing condition and interface uncertainty in refurb projects",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing refurbishment cost uncertainty.",
    "easy",
    rot(40)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for measured term contracts for estates?",
    "Use schedule of rates frameworks suitable for recurring repairs",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing measured term contracts for estates.",
    "medium",
    rot(41)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for two-stage tendering purpose?",
    "Enable early contractor involvement with later price competition on defined scope",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing two-stage tendering purpose.",
    "easy",
    rot(42)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for single-stage tendering suitability?",
    "Use fixed price competition when design and documents are sufficiently complete",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing single-stage tendering suitability.",
    "medium",
    rot(43)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for cost-led design iterations?",
    "Iterate design to meet budget with explicit trade-offs documented",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing cost-led design iterations.",
    "easy",
    rot(44)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for affordable housing via section 106?",
    "Model onsite or offsite affordable provision required by planning obligations",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing affordable housing via section 106.",
    "medium",
    rot(45)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for consistent units across BOQ and model?",
    "Ensure measurement units are consistent to prevent quantity errors",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing consistent units across BOQ and model.",
    "easy",
    rot(46)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for embodied carbon overlay in optioneering?",
    "Consider embodied carbon alongside cost in option appraisal where relevant",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing embodied carbon overlay in optioneering.",
    "medium",
    rot(47)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for employers agent role in some contracts?",
    "Understand coordination between client and contractor in certain routes",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing employers agent role in some contracts.",
    "easy",
    rot(48)
  ),
  makeQ(
    "At Level 1 core technical knowledge for UK surveying practice, which approach is correct for collateral warranties for funders?",
    "Provide third-party contractual rights typically for funders or tenants",
    [
    { text: "Apply rules without stating basis, date, or limitations", why: "Level 1 still requires reasoned application with stated assumptions." },
    { text: "Rely entirely on software defaults without professional review", why: "Software defaults cannot replace professional understanding." },
    { text: "Select methods without regard to client objectives or project context", why: "Technical methods should align to client objectives and context." },
    ],
    "Sound Level 1 practice requires transparent assumptions when addressing collateral warranties for funders.",
    "medium",
    rot(49)
  ),
];

