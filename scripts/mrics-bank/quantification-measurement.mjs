import { makeQ, rot } from "./makeQ.mjs";

export const quantificationMeasurement = [
  makeQ(
    "A PQS is preparing a BOQ for a JCT Standard Building Contract using NRM2. Which document governs measurement rules?",
    "NRM2: Detailed measurement for building works, with SMM7 legacy references only where contract specifies",
    [
    { text: "CESMM4 without modification for building works", why: "CESMM applies to civil engineering, not building BOQ under NRM2." },
    { text: "Contractor's internal pricing spreadsheet only", why: "BOQ measurement must follow agreed standard rules for tender comparability." },
    { text: "RICS Red Book valuation rules for all BOQ items", why: "Red Book governs valuation disputes, not tender BOQ preparation." }
    ],
    "UK building BOQs for tender typically follow NRM2 measurement rules.",
    "easy",
    rot(0)
  ),
  makeQ(
    "An item description reads 'Excavate foundation trenches, max depth 1.2m'. The site requires 2.1m deep trenches in rock. How should quantification treat this?",
    "Amend description and measure additional depth/rock as separate items or provisional sum per tender strategy",
    [
    { text: "Measure all excavation to 1.2m rate regardless of actual depth", why: "BOQ must reflect anticipated scope or risk allowances." },
    { text: "Omit excavation because it is too complex", why: "Complex conditions need measured or provisional items, not omission." },
    { text: "Hide rock excavation in preliminaries without measurement", why: "Major scope items should be identifiable in BOQ or defined provisional sums." }
    ],
    "BOQ preparation must align descriptions and quantities with site and design information.",
    "medium",
    rot(1)
  ),
  makeQ(
    "Under NRM2, hollowcore precast concrete floor slabs should be measured in:",
    "Square metres stating thickness, noting structural screed and topping separately where applicable",
    [
    { text: "Linear metres along building perimeter only", why: "Floor slabs are area-measured, not perimeter-linear." },
    { text: "Number of trucks delivered", why: "BOQ measurement uses construction units per NRM2, not logistics units." },
    { text: "Tonnes of concrete only without area", why: "Precast slabs are typically measured in m² with thickness stated." }
    ],
    "NRM2 sets unit conventions for precast flooring and associated notes.",
    "medium",
    rot(2)
  ),
  makeQ(
    "A contractor's estimator finds the BOQ concrete quantity is 15% below their take-off. What is the professional quantification response?",
    "Reconcile differences against drawings, NRM2 rules, and query ambiguities before pricing",
    [
    { text: "Price the BOQ quantity without review to save time", why: "Pricing should follow reconciled quantities or qualified assumptions." },
    { text: "Automatically add 15% to every BOQ line", why: "Global uplifts without analysis distort tender comparability." },
    { text: "Ignore take-off because BOQ is always wrong", why: "Reconciliation is standard professional practice." }
    ],
    "Estimators reconcile BOQ to take-off and raise queries on material variances.",
    "hard",
    rot(3)
  ),
  makeQ(
    "NRM1 is requested for an employer's pre-tender elemental cost plan. NRM2 BOQ will follow for tender. What is the relationship?",
    "NRM1 structures cost planning elements; NRM2 provides detailed measurement for pricing and tender BOQ",
    [
    { text: "NRM1 replaces NRM2 entirely on all projects", why: "NRM1 and NRM2 serve different purposes in the cost cycle." },
    { text: "NRM2 is only for post-contract final accounts", why: "NRM2 is used for tender BOQ and measurement during procurement." },
    { text: "They are identical documents with different names", why: "NRM1 is elemental cost planning; NRM2 is detailed measurement." }
    ],
    "NRM1 supports cost plans; NRM2 supports detailed measurement and BOQ.",
    "easy",
    rot(4)
  ),
  makeQ(
    "A provisional sum for 'specialist façade access' is included in the BOQ. How should tenderers price it?",
    "Include only attendance/mark-up unless tender documents invite lump-sum pricing of the PS",
    [
    { text: "Distribute the PS value across unrelated items", why: "Provisional sums are re-measured or ascertained per contract terms." },
    { text: "Always include full £1m default in every tender", why: "PS pricing follows contract and tender instructions." },
    { text: "Exclude provisional sums from tender totals", why: "Tender totals typically include provisional sums as priced." }
    ],
    "Provisional sum pricing depends on tender instructions and contract re-measurement rules.",
    "medium",
    rot(5)
  ),
  makeQ(
    "Prime cost sums for light fittings are in the employer's BOQ. What risk does the employer retain?",
    "Difference between PC allowance and actual supply cost plus contractor attendance",
    [
    { text: "No risk — contractor guarantees PC sum final cost", why: "PC sums transfer supply cost risk to employer subject to contract." },
    { text: "All installation risk only with no supply risk", why: "Employer typically carries supply price risk on PC items." },
    { text: "Contractor carries supply and inflation risk always", why: "Unless fixed-price supply is stated, PC risk sits with employer." }
    ],
    "PC sums allocate supply cost risk to the employer with contractor attendance.",
    "medium",
    rot(6)
  ),
  makeQ(
    "When measuring stud partitions to NRM2, which factor is included in the measured area?",
    "Partition area measured face to face including openings unless rules state deduction thresholds",
    [
    { text: "Only studs without boards because boards are finishing", why: "Partition items include complete partition construction per NRM2." },
    { text: "Measure perimeter linear metres of rooms instead", why: "Partitions are area-measured, not taken as room perimeter default." },
    { text: "Exclude all door openings regardless of size", why: "NRM2 sets opening deduction rules; not all openings are excluded." }
    ],
    "NRM2 partition measurement follows defined area rules and opening deductions.",
    "hard",
    rot(7)
  ),
  makeQ(
    "A BOQ for NEC Option B requires activity schedule instead of traditional BOQ. What quantification focus changes?",
    "Price against defined activities/milestones with scope references rather than only trade bills",
    [
    { text: "No measurement needed because NEC has no quantities", why: "Option B uses bill of quantities; other options use different schedules." },
    { text: "Use FIDIC Red Book BOQ format without change", why: "Contract form dictates pricing document structure." },
    { text: "Prepare Red Book valuation only", why: "Tender pricing document must match NEC Option B requirements." }
    ],
    "NEC Option B uses BOQ; quantification must align with chosen NEC option.",
    "medium",
    rot(8)
  ),
  makeQ(
    "An apprentice QS measures external paving. The drawing shows 1,250 m² but site boundaries reduce workable area. What action is required?",
    "Adjust quantity to workable area per drawings and site constraints, note assumption in query if unclear",
    [
    { text: "Measure full drawing area ignoring boundaries", why: "Quantities should reflect constructible scope." },
    { text: "Use 1,000 m² as round number without basis", why: "Rounded quantities need documented measurement basis." },
    { text: "Leave paving unmeasured as provisional sum always", why: "Defined paving scope should be measured where information allows." }
    ],
    "Measurement must reflect constructible scope with queries for ambiguities.",
    "easy",
    rot(9)
  ),
  makeQ(
    "NRM3 is requested for maintenance quantification on a shopping centre. Its primary use is:",
    "Order of cost estimates and elemental cost planning for building maintenance works",
    [
    { text: "Tender BOQ for new stadium construction", why: "NRM3 addresses maintenance works, not new-build tender BOQ." },
    { text: "Legal adjudication procedure guide", why: "NRM3 is a measurement/cost standard, not dispute procedure." },
    { text: "Structural engineering design calculations", why: "NRM3 does not replace structural design standards." }
    ],
    "NRM3 supports measurement and cost planning of maintenance works.",
    "easy",
    rot(10)
  ),
  makeQ(
    "A tender BOQ line for 'Formwork to foundations' is lumped with concrete supply and pour. What is the quantification concern?",
    "Combined items reduce tender transparency and comparability — split per NRM2 where possible",
    [
    { text: "Lumping is always preferred for speed", why: "Transparent BOQ structure supports competitive tender analysis." },
    { text: "Formwork should never be measured", why: "Formwork is a measurable NRM2 item." },
    { text: "Only the total lump sum matters for employer", why: "Employers need rate and quantity visibility for variations and valuations." }
    ],
    "BOQ structure should separate major cost components per measurement rules.",
    "medium",
    rot(11)
  ),
  makeQ(
    "During post-contract measurement, a variation adds 14 nr extra doors. Contract uses NRM2 BOQ rates. How are they valued?",
    "Value using contract rates for similar items or fair rates with quantity per variation rules",
    [
    { text: "No measurement because variations are lump sum always", why: "Variation valuation uses contract valuation rules and measured quantities." },
    { text: "Use current market dayworks without contract check", why: "Contract valuation procedures take precedence." },
    { text: "Ignore door ironmongery as always included", why: "Door variations must address ironmongery scope per contract." }
    ],
    "Variation quantification follows contract BOQ rates and valuation clauses.",
    "hard",
    rot(12)
  ),
  makeQ(
    "A QS checks a subcontract BOQ for MEP services. Services drawings are schematic only. Best quantification approach?",
    "Use provisional quantities or provisional sums with defined design development and remeasurement mechanism",
    [
    { text: "Firm detailed quantities from schematic drawings without caveat", why: "Immature design produces unreliable firm quantities." },
    { text: "Omit MEP entirely from subcontract scope", why: "MEP must be scoped with appropriate uncertainty treatment." },
    { text: "Copy BOQ from a hospital project unchanged", why: "BOQs must reflect project-specific design and scope." }
    ],
    "Immature MEP design requires provisional quantities/sums and remeasurement provisions.",
    "hard",
    rot(13)
  ),
  makeQ(
    "Bill No. 4 in a BOQ covers preliminaries. Which item belongs there under typical UK practice?",
    "Site management, temporary services, hoarding, and insurances specific to preliminaries",
    [
    { text: "Structural steel permanent works", why: "Permanent works belong in measured works bills." },
    { text: "Client's land acquisition costs", why: "Land costs are outside contractor preliminaries." },
    { text: "Architect's design fee", why: "Consultant fees are not contractor BOQ preliminaries." }
    ],
    "Preliminaries cover contractor site-specific setup and management costs.",
    "easy",
    rot(14)
  ),
  makeQ(
    "An employer BOQ requires 'fixed quantity' items despite incomplete design. What tender risk arises?",
    "Tenderers may price risk into rates; employer may carry quantity error risk if design changes",
    [
    { text: "No risk because contractors always absorb quantity errors", why: "Fixed quantities allocate quantity risk per contract and design completeness." },
    { text: "Tenderers ignore quantity and price lump sum only", why: "BOQ tenderers price stated quantities and rates." },
    { text: "Fixed quantities eliminate all variation entitlement", why: "Variations can still arise from scope or instruction changes." }
    ],
    "Fixed quantities on incomplete design shift quantity risk and affect tender pricing.",
    "medium",
    rot(15)
  ),
  makeQ(
    "Quantification of reinforcement should under NRM2 typically be:",
    "Tonnes linked to structural schedules, noting bar type, diameter, and waste policy per BOQ",
    [
    { text: "Counted as number of bars without weight", why: "Reinforcement is weight-measured in tonnes per NRM2 practice." },
    { text: "Included only inside concrete m³ rate always", why: "Reinforcement is usually a separate measurable item." },
    { text: "Excluded because it is invisible after pour", why: "Reinforcement is a major cost item requiring measurement." }
    ],
    "NRM2 measures reinforcement in tonnes with specification linkage.",
    "medium",
    rot(16)
  ),
  makeQ(
    "A civil sub-package uses CESMM4 on a rail project. A building QS joins the team. What competency is required?",
    "Apply CESMM4 measurement rules and coordinate interfaces with building NRM2 packages",
    [
    { text: "Force NRM2 on all rail track items regardless", why: "Civil works follow CESMM, not NRM2." },
    { text: "Avoid all measurement on civil packages", why: "Interface coordination requires understanding both rule sets." },
    { text: "Use SMM7 for earthworks on rail", why: "CESMM is the standard for civil engineering measurement." }
    ],
    "QS quantification may require CESMM4 on civil interfaces alongside NRM2 building works.",
    "hard",
    rot(17)
  ),
  makeQ(
    "Tender documents require electronic BOQ in CESMM/NRM compliant CSV for BIM take-off checking. Purpose is:",
    "Enable consistent automated quantity extraction and audit trail against model and rules",
    [
    { text: "Replace the need for professional measurement entirely", why: "BIM quantities still require rule-based validation by QS." },
    { text: "Hide rates from the employer always", why: "Electronic format supports transparency and analysis, not concealment." },
    { text: "Eliminate provisional sums by software default", why: "Provisional items remain a professional judgment." }
    ],
    "Structured electronic BOQ supports BIM reconciliation and tender analysis.",
    "medium",
    rot(18)
  ),
  makeQ(
    "A measured item 'Brickwork in outer leaf' excludes insulation cavity. The insulation is:",
    "Measured separately as its own NRM2 item linked to wall build-up",
    [
    { text: "Automatically included in brickwork rate", why: "Cavity insulation is a separate measurable component." },
    { text: "Ignored as architect's detail only", why: "Full wall build-up must be quantified for pricing." },
    { text: "Added only in preliminaries", why: "Insulation is permanent works, not preliminaries." }
    ],
    "Composite walls are split into measurable components per NRM2.",
    "easy",
    rot(19)
  ),
  makeQ(
    "Final account quantification dispute: contractor claims extra excavation; employer says BOQ covered it. First QS step?",
    "Compare contract BOQ descriptions, drawings, site records, and variation/clause entitlement",
    [
    { text: "Split difference 50/50 without analysis", why: "Final account resolution requires contractual and measured evidence." },
    { text: "Pay contractor claim in full to close account", why: "Claims must be substantiated against contract records." },
    { text: "Reject all claims automatically", why: "Valid substantiated claims must be evaluated fairly." }
    ],
    "Final account measurement disputes are resolved against contract documents and records.",
    "hard",
    rot(20)
  ),
  makeQ(
    "For APC Level 3 quantification, which example best demonstrates competency?",
    "Leading BOQ production, resolving measurement ambiguities, and pricing logic on a live project",
    [
    { text: "Watching a senior QS measure without participating", why: "Level 3 requires personal technical leadership and advice." },
    { text: "Using only software output without review", why: "Level 3 includes professional judgment on measurement." },
    { text: "Delegating all queries to the architect", why: "QS leads quantification and contractual scope clarification." }
    ],
    "Level 3 quantification is demonstrated through leadership of measurement and costing.",
    "medium",
    rot(21)
  ),
  makeQ(
    "A BOQ note states 'all quantities are provisional'. Under JCT SBC, tender comparison is affected because:",
    "Tenderers may price differently for remeasurement risk; employer should analyse rate build-ups",
    [
    { text: "Provisional quantities make tender prices non-comparable always", why: "Comparable rate analysis remains possible with provisional quantities." },
    { text: "Contractor must ignore quantities entirely", why: "Tenderers still price BOQ items for comparison." },
    { text: "Employer cannot award contract with provisional quantities", why: "JCT contracts commonly use provisional quantities with remeasurement." }
    ],
    "Provisional quantities require rate-focused tender analysis and remeasurement planning.",
    "hard",
    rot(22)
  ),
  makeQ(
    "Pricing a BOQ item for 'Suspended ceiling — tile and grid' requires:",
    "Rate build-up from material, labour, waste, access, and smallworks with measured m² quantity",
    [
    { text: "Guess a single figure from memory", why: "Pricing requires structured build-up and quantity linkage." },
    { text: "Use architect's ceiling height as price only", why: "Height affects components but pricing needs full build-up." },
    { text: "Exclude grid system as supplied by others always", why: "Scope must be confirmed; grid is typically included." }
    ],
    "BOQ pricing links measured quantities to substantiated rate build-ups.",
    "medium",
    rot(23)
  ),
  makeQ(
    "An international BOQ uses FIDIC conditions with method of measurement based on UK practice. Quantification should:",
    "Follow contract-stated measurement method and coordinate with FIDIC re-measurement clauses",
    [
    { text: "Apply only local QS habit with no contract check", why: "Contract documents define applicable measurement rules." },
    { text: "Ignore BOQ because FIDIC is lump sum only always", why: "FIDIC forms vary; many use BOQ or re-measurement." },
    { text: "Use JCT valuation rules in Dubai automatically", why: "Applicable law and contract determine measurement and valuation." }
    ],
    "International contracts require adherence to stated measurement and FIDIC valuation rules.",
    "hard",
    rot(24)
  ),
  makeQ(
    "Deductions for voids over 0.5 m² in plasterboard linings per NRM2 mean the QS must:",
    "Measure gross area and deduct qualifying openings per stated threshold",
    [
    { text: "Never deduct any openings", why: "NRM2 sets deduction thresholds that must be applied." },
    { text: "Deduct all openings including small switch drops always", why: "Only openings meeting rules are deducted." },
    { text: "Measure openings only without wall area", why: "Linings are measured as areas with rule-based deductions." }
    ],
    "Applying deduction thresholds correctly is core NRM2 measurement skill.",
    "medium",
    rot(25)
  ),
  makeQ(
    "A cost plan elemental quantity check against BOQ shows 8% variance in cladding area. Likely cause?",
    "Different measurement boundaries, gross vs net, or BOQ includes features not in cost plan",
    [
    { text: "Variance always means fraud", why: "Technical measurement differences commonly cause variances." },
    { text: "Ignore variance because cost plan and BOQ never reconcile", why: "Reconciliation between cost plan and BOQ is standard practice." },
    { text: "Delete cladding from both documents", why: "Variance should be investigated, not scope deleted." }
    ],
    "Cost plan to BOQ reconciliation identifies measurement boundary differences.",
    "medium",
    rot(26)
  ),
  makeQ(
    "Daywork schedule in BOQ appendices supports:",
    "Valuation of instructed work without prior rates using labour/plant/material daywork percentages",
    [
    { text: "Replacing all BOQ measured work", why: "Dayworks are for contingency/instructed work, not whole project pricing." },
    { text: "Eliminating need for variation records", why: "Daywork valuations still require records and instruction." },
    { text: "Setting contractor profit at 50% always", why: "Daywork percentages are contractually agreed, not arbitrary." }
    ],
    "Daywork schedules provide fallback valuation basis for certain instructed works.",
    "easy",
    rot(27)
  ),
  makeQ(
    "Quantifying curtain walling to NRM2 typically measures:",
    "Area of cladding panels in m² stating system type, performance, and excluded adjacent works",
    [
    { text: "Number of fixing brackets only", why: "Curtain wall is primarily area-measured with system description." },
    { text: "Weight of glass only without frame", why: "Measurement covers the curtain wall system per BOQ description." },
    { text: "Linear metres of building height only", why: "Area measurement reflects panelised cladding extent." }
    ],
    "Curtain wall BOQ items use m² with performance and system descriptors.",
    "medium",
    rot(28)
  ),
  makeQ(
    "A subcontractor refuses to price BOQ item 3.14 citing ambiguous description. QS action?",
    "Issue clarification/amendment via tender query process with consistent addendum to all tenderers",
    [
    { text: "Let one tenderer assume scope unilaterally", why: "Ambiguities must be resolved fairly across tenderers." },
    { text: "Delete item 3.14 from contract after award", why: "Missing scope creates dispute; clarify pre-award." },
    { text: "Tell subcontractor to price highest possible sum", why: "Clarification should define scope, not invite inflated pricing." }
    ],
    "Pre-tender query resolution ensures fair comparable pricing.",
    "medium",
    rot(29)
  ),
  makeQ(
    "Remeasurement contract — interim valuation quantities should be:",
    "Measured to date per contract rules with substantiated dimension sheets and audit trail",
    [
    { text: "Based on contractor's claimed percentage complete only", why: "Valuations require measured quantities or agreed progress rules." },
    { text: "Ignored until final account", why: "Interim valuations need periodic quantity assessment." },
    { text: "Copied from tender BOQ without site measurement", why: "Remeasurement contracts value actual quantities installed." }
    ],
    "Interim remeasurement valuations rely on measured work-to-date.",
    "hard",
    rot(30)
  ),
  makeQ(
    "NRM2 'deemed included' items in descriptions mean:",
    "Certain ancillary components are included in the main item rate without separate measurement",
    [
    { text: "Contractor may omit deemed items without cost", why: "Deemed included items are part of the measured item scope." },
    { text: "Employer will pay twice if listed elsewhere", why: "Deemed included prevents double measurement of minor ancillaries." },
    { text: "All project works are deemed included in one line", why: "Deemed included applies to defined ancillaries, not whole project." }
    ],
    "Understanding deemed included scope prevents omission and double counting.",
    "medium",
    rot(31)
  ),
  makeQ(
    "A QS uses BIM model quantities for structural steel. Professional checking requires:",
    "Validate model LOD, exclusions, connections, and NRM2/grouping before accepting quantities",
    [
    { text: "Blind acceptance of model export", why: "BIM quantities require QS validation against rules and scope." },
    { text: "Reject BIM entirely on all projects", why: "BIM can assist measurement with professional oversight." },
    { text: "Add 50% to all model quantities without review", why: "Adjustments should be evidence-based, not blanket." }
    ],
    "BIM-assisted quantification still requires LOD and rules-based QS review.",
    "hard",
    rot(32)
  ),
  makeQ(
    "Contingency allowances in a cost plan differ from BOQ provisional sums because:",
    "Contingency is employer risk allowance often not in tender BOQ; PS are contract items for defined scope",
    [
    { text: "They are identical in all circumstances", why: "Contingency and provisional sums serve different purposes." },
    { text: "Provisional sums are never in BOQ", why: "BOQs commonly include provisional sums for undefined elements." },
    { text: "Contingency is always paid to contractor as profit", why: "Employer contingency may never transfer to contractor." }
    ],
    "Distinguishing contingency from provisional sums is essential costing practice.",
    "medium",
    rot(33)
  ),
  makeQ(
    "When costing demolition works in urban site, quantification should capture:",
    "Soft strip, structural demolition, temporary propping, waste disposal, and neighbour protection",
    [
    { text: "Only skip hire days", why: "Demolition measurement includes multiple risk and method items." },
    { text: "Exclude asbestos survey allowances", why: "Hazardous materials surveys and remediation may be required." },
    { text: "Measure new build area only", why: "Demolition must reflect existing structures to be removed." }
    ],
    "Urban demolition BOQs include method, protection, and disposal components.",
    "hard",
    rot(34)
  ),
  makeQ(
    "A tender addendum revises BOQ quantities down 12% on earthworks. Tenderers should:",
    "Reprice or confirm rates remain valid for adjusted quantities per tender instructions",
    [
    { text: "Ignore addendum and submit original BOQ", why: "Tender addenda are contractually part of tender documents." },
    { text: "Withdraw without informing client", why: "Professional practice addresses addenda through repricing or qualification." },
    { text: "Increase rates by 12% automatically", why: "Rate validity depends on market and instruction, not automatic inverse adjustment." }
    ],
    "BOQ addenda require tenderer review and compliant repricing behaviour.",
    "medium",
    rot(35)
  ),
  makeQ(
    "Unit rate for 'Concrete in foundations' should clarify:",
    "Strength class, exposure, pour size, formwork interface, and whether reinforcement is excluded",
    [
    { text: "Nothing — one rate fits all concrete", why: "Concrete rates vary materially by specification and scope split." },
    { text: "Only the supplier name", why: "Technical specification drives concrete pricing." },
    { text: "Architect's favourite mix code without specification", why: "Rates must tie to defined specification and measurement rules." }
    ],
    "Clear BOQ descriptions enable comparable concrete rate pricing.",
    "easy",
    rot(36)
  ),
  makeQ(
    "Quantification on a design-and-build tender where contractor completes design means:",
    "Employer documents define performance scope; contractor quantifies completed design in tender",
    [
    { text: "Employer always provides firm BOQ for all D&B", why: "D&B may use employer requirements with contractor design responsibility." },
    { text: "No quantities exist in any D&B tender", why: "D&B tenders often include pricing schedules or quantities where defined." },
    { text: "Measurement rules are optional", why: "Defined pricing documents still require consistent quantification." }
    ],
    "D&B quantification balances employer requirements with contractor design completion.",
    "hard",
    rot(37)
  ),
  makeQ(
    "Pricing logic for preliminaries time-related charges uses:",
    "Weekly/monthly rates for staff and plant with estimated duration linked to programme",
    [
    { text: "Single lump sum with no programme link", why: "Time-related prelims depend on programme duration." },
    { text: "Only percentage of measured works without build-up", why: "Preliminaries need substantive build-up, not only percentage proxy." },
    { text: "Identical prelims on 6-week and 80-week projects", why: "Duration strongly affects time-related preliminary costs." }
    ],
    "Preliminaries pricing links time-related costs to programme duration.",
    "medium",
    rot(38)
  ),
  makeQ(
    "A BOQ for tenant fit-out uses 'item' units for reception joinery. Better quantification is:",
    "Detailed item description with nr count, dimensions, materials, and drawing reference",
    [
    { text: "Single item 'joinery' for whole building", why: "Joinery items need identifiable descriptions for pricing." },
    { text: "No description because item unit suffices", why: "Item units still require scope-defining descriptions." },
    { text: "Measure joinery in kg of timber only", why: "Joinery is typically enumerated with specification detail." }
    ],
    "Enumerated items require rich descriptions for comparable pricing.",
    "medium",
    rot(39)
  ),
  makeQ(
    "Cross-check between services BOQ and architectural BOQ should identify:",
    "Duplications, gaps at interfaces, and coordinated provisional allowances",
    [
    { text: "Only spelling mistakes", why: "Interface coordination prevents scope gaps and double counting." },
    { text: "Nothing — disciplines never overlap", why: "MEP and architectural scopes frequently interface." },
    { text: "Client legal clauses", why: "Legal review is separate from BOQ interface coordination." }
    ],
    "Multi-discipline BOQ coordination prevents gaps and duplication at interfaces.",
    "hard",
    rot(40)
  ),
  makeQ(
    "Waste allowances in material quantities for costing are:",
    "Applied per material type and site constraints with stated percentage in build-up",
    [
    { text: "Never allowed in professional measurement", why: "Waste factors are standard in pricing build-ups." },
    { text: "Always 25% on every material", why: "Waste varies by material and installation method." },
    { text: "Added only at final account secretly", why: "Waste should be transparent in pricing assumptions." }
    ],
    "Pricing build-ups include material-specific waste allowances.",
    "easy",
    rot(41)
  ),
  makeQ(
    "An employer requests BOQ aligned to Uniclass for asset management. Quantification impact:",
    "Structure items with Uniclass codes for lifecycle costing and FM integration",
    [
    { text: "Uniclass replaces NRM2 measurement rules entirely", why: "Uniclass supports classification; measurement still follows NRM2." },
    { text: "Ignore classification as irrelevant to QS", why: "Classification aids client asset and cost data management." },
    { text: "Use Uniclass only for landscaping colours", why: "Uniclass is a broader building classification system." }
    ],
    "Uniclass coding supports structured BOQ data for asset lifecycle management.",
    "medium",
    rot(42)
  ),
  makeQ(
    "Subcontract BOQ transfer from main contractor should avoid:",
    "Scope gaps at interfaces and inconsistent measurement rules between main and sub BOQs",
    [
    { text: "Any description detail", why: "Detail supports scope clarity; the risk is inconsistency and gaps." },
    { text: "Including drawing references", why: "Drawing references aid scope definition." },
    { text: "Agreeing retention and payment terms", why: "Commercial terms are necessary alongside scope." }
    ],
    "Main-to-sub BOQ transfer requires consistent rules and complete interface scope.",
    "medium",
    rot(43)
  ),
  makeQ(
    "Quantity surveyor checking specialist piling BOQ notes 'working load 800kN'. Must verify:",
    "Pile type, diameter, depth criteria, testing regime, and ground conditions interface",
    [
    { text: "Only colour of piling rig", why: "Technical parameters drive piling cost and method." },
    { text: "Architect's ceiling finish", why: "Ceiling finishes are unrelated to piling scope." },
    { text: "Number of site inductions", why: "Inductions are preliminaries, not piling technical verification." }
    ],
    "Specialist piling BOQ items require geotechnical and testing parameter verification.",
    "hard",
    rot(44)
  ),
  makeQ(
    "For Level 3 APC, explaining BOQ pricing logic to assessors, you should describe:",
    "How quantities, market rates, labour/plant, risk, and prelims combined into tender pricing decisions",
    [
    { text: "That software produced the price without input", why: "Level 3 requires personal pricing reasoning." },
    { text: "Only the final tender sum", why: "Assessors probe build-up logic and judgment." },
    { text: "That pricing is confidential and cannot be discussed", why: "Candidates must articulate pricing approach at interview." }
    ],
    "APC quantification includes articulate explanation of pricing build-up logic.",
    "medium",
    rot(45)
  ),
  makeQ(
    "Measured work for waterproofing tanking to basements should include:",
    "Surface preparation, membranes, protection boards, and detailing at penetrations per scope",
    [
    { text: "Only primary membrane area without detailing", why: "Waterproofing cost includes preparation and critical details." },
    { text: "Roofing felt in plant rooms only", why: "Basement tanking scope must match specification." },
    { text: "Exclude sumps and pipe penetrations always", why: "Penetration detailing is often major waterproofing cost." }
    ],
    "Waterproofing BOQ scope includes preparation, membranes, and detailing.",
    "hard",
    rot(46)
  ),
  makeQ(
    "A re-measurement BOQ error overstated structural steel by 200 tonnes at tender. Post-contract effect:",
    "Interim and final valuations use actual measured quantities — employer benefits from rate × reduced qty",
    [
    { text: "Contractor keeps payment for 200 tonnes not installed", why: "Remeasurement pays installed measured quantities." },
    { text: "Tender total remains payable regardless", why: "Remeasurement adjusts quantities, not fixed tender total." },
    { text: "Project is void ab initio", why: "Quantity errors are corrected through remeasurement mechanism." }
    ],
    "Remeasurement contracts adjust payment to actual quantities at agreed rates.",
    "medium",
    rot(47)
  ),
  makeQ(
    "Costing temporary works in BOQ is often handled by:",
    "Separate preliminaries or provisional sums for major temporary works with design responsibility stated",
    [
    { text: "Ignoring temporary works as contractor problem only", why: "Major temporary works may need explicit BOQ allowance." },
    { text: "Including in every permanent work rate invisibly", why: "Major TW items should be visible where appropriate." },
    { text: "Client always designs all temporary works", why: "Temporary works design responsibility varies by contract." }
    ],
    "Major temporary works require explicit scope and responsibility in BOQ/prelims.",
    "medium",
    rot(48)
  ),
  makeQ(
    "Quantifying insulation to external walls, NRM2 expects:",
    "Area of insulation type and thickness in m² linked to wall build-up",
    [
    { text: "Insulation omitted as inside brick rate", why: "Insulation is separately measurable." },
    { text: "Count bags of insulation only", why: "Area measurement with thickness is standard." },
    { text: "Measure insulation in litres", why: "Rigid/board insulation uses area-based units." }
    ],
    "External wall insulation is area-measured with type and thickness stated.",
    "easy",
    rot(49)
  ),
];
