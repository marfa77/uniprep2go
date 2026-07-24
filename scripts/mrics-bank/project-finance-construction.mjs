import { makeQ, rot } from "./makeQ.mjs";

export const projectFinanceConstruction = [
  makeQ(
    "A main contractor's QS prepares monthly cash flow forecast for a 24-month £55m project. What is the primary input?",
    "Programme-linked spend curve, valuation timings, retention, and supply chain payment terms",
    [
    { text: "Only last month's invoice total extrapolated", why: "Cash flow needs forward programme-based projection." },
    { text: "Client's annual report revenue", why: "Client finances do not drive contractor cost cash flow." },
    { text: "Random monthly equal splits", why: "S-curve spend patterns reflect programme progression." }
    ],
    "Project cash flow forecasting links cost spend to programme and payment cycles.",
    "medium",
    rot(0)
  ),
  makeQ(
    "Interim valuation under JCT at month 8 should value:",
    "Measured work completed, authorised variations, and materials on site per contract rules",
    [
    { text: "Full contract sum regardless of progress", why: "Interim valuations reflect work done to date." },
    { text: "Profit for future months not yet worked", why: "Valuations are based on executed work, not future profit." },
    { text: "Client's bank balance", why: "Valuation addresses contractor's work, not client liquidity." }
    ],
    "JCT interim valuations reflect executed work and contract valuation rules.",
    "easy",
    rot(1)
  ),
  makeQ(
    "Cost report to employer at month 6 shows forecast final cost £2.1m over budget. Level 3 project finance action?",
    "Analyse variance drivers, update forecast, propose mitigations, and seek client decisions on scope/programme",
    [
    { text: "Hide overrun until final account", why: "Project finance control requires timely transparent reporting." },
    { text: "Delete contingency to show zero variance", why: "Misreporting breaches professional standards." },
    { text: "Blame weather without evidence", why: "Variance analysis must be evidence-based." }
    ],
    "Level 3 project finance includes proactive forecast control and client decision support.",
    "hard",
    rot(2)
  ),
  makeQ(
    "S-curve cash flow for construction spend typically shows:",
    "Slow start, peak mid-project, tapering finish as prelims wind down",
    [
    { text: "Linear spend every month identical", why: "Construction spend follows non-linear programme profile." },
    { text: "All cost in month one", why: "Spend accumulates with site activity progression." },
    { text: "Maximum spend after PC only", why: "Peak spend occurs during main construction phase." }
    ],
    "Construction cost cash flow commonly follows an S-curve tied to programme.",
    "easy",
    rot(3)
  ),
  makeQ(
    "Retention cash flow impact on subcontractor means:",
    "Reduced monthly cash in until release at PC/defects per subcontract terms",
    [
    { text: "Retention increases monthly cash always", why: "Retention withholds cash from interim payments." },
    { text: "No cash effect because retention is notional", why: "Retention materially affects subcontractor liquidity." },
    { text: "Retention paid to HMRC", why: "Retention is withheld by payer as security." }
    ],
    "Retention timing affects supply chain cash flow and must be forecast.",
    "medium",
    rot(4)
  ),
  makeQ(
    "Final account preparation on JCT project starts with:",
    "Agreeing outstanding variations, EOT cost claims, defects, and measured work adjustments",
    [
    { text: "Issuing certificate before any reconciliation", why: "Final account requires full contractual reconciliation." },
    { text: "Ignoring all extension of time cost claims", why: "Valid LAE claims form part of final account." },
    { text: "Using tender BOQ only with no variations", why: "Final account includes all contract adjustments." }
    ],
    "Final accounts reconcile variations, delays, and measured work to contract sum.",
    "medium",
    rot(5)
  ),
  makeQ(
    "A piled raft foundation is selected over pad foundations on poor ground. Construction technology reason?",
    "Distributes load and reduces differential settlement on variable bearing strata",
    [
    { text: "Rafts are always cheaper on rock", why: "Ground conditions drive foundation selection, not universal cost." },
    { text: "Pads preferred when settlement risk is high", why: "Rafts address poor/variable ground more effectively." },
    { text: "Foundation choice is aesthetic only", why: "Foundation design is structural/geotechnical." }
    ],
    "Raft foundations address poor ground by distributing structural loads.",
    "medium",
    rot(6)
  ),
  makeQ(
    "CLT (cross-laminated timber) frame advantages in construction technology include:",
    "Offsite precision, faster erection, and lower embodied carbon vs conventional steel/concrete options",
    [
    { text: "Unlimited height without engineering limits", why: "CLT has structural and fire height constraints per design." },
    { text: "Zero need for fire or acoustic design", why: "CLT buildings require fire and acoustic engineering." },
    { text: "Cannot integrate with concrete cores", why: "Hybrid CLT/concrete systems are common." }
    ],
    "CLT offers programme and carbon benefits with appropriate structural/fire design.",
    "hard",
    rot(7)
  ),
  makeQ(
    "Employer's payment cycle 30 days vs contractor paying subs 45 days creates:",
    "Working capital gap requiring finance planning in contractor cash flow",
    [
    { text: "No effect on contractor liquidity", why: "Payment lag between inflow and outflow affects working capital." },
    { text: "Automatic profit increase", why: "Payment timing affects cash, not profit directly." },
    { text: "Legal requirement for same-day sub payment always", why: "Payment terms vary by contract subject to statute minima." }
    ],
    "Payment cycle mismatches drive contractor working capital requirements.",
    "medium",
    rot(8)
  ),
  makeQ(
    "MEP services coordination clash on site — QS cost impact is tracked via:",
    "Variation or compensation event with measured cost and programme delay assessment",
    [
    { text: "Ignore because MEP is invisible", why: "Coordination failures generate measurable cost/time impacts." },
    { text: "Automatic 5% contract sum deduction", why: "Impacts require event-specific valuation." },
    { text: "Client absorbs all costs without record", why: "Cost control requires documented variation/CE valuation." }
    ],
    "Site coordination issues are captured through contractual variation mechanisms.",
    "hard",
    rot(9)
  ),
  makeQ(
    "Cost-to-complete estimate at 75% progress should include:",
    "Remaining works quantities, forecast rates, risk, and known claims/defects provision",
    [
    { text: "Only original budget with no update", why: "Cost-to-complete must reflect current forecast." },
    { text: "Exclude defects snagging always", why: "Snagging and defects costs should be considered." },
    { text: "Assume zero cost for remaining 25%", why: "Remaining work still carries cost to complete." }
    ],
    "Cost-to-complete forecasts update remaining work cost with current intelligence.",
    "hard",
    rot(10)
  ),
  makeQ(
    "Curtain walling system selection — unitised vs stick-built affects:",
    "Site labour content, programme, tolerances, and logistics cost profile",
    [
    { text: "Only paint colour options", why: "System type affects method, programme, and cost." },
    { text: "Nothing — identical cost always", why: "Unitised and stick systems have different cost drivers." },
    { text: "Structural frame material only", why: "Cladding system choice is independent of frame material decision." }
    ],
    "Cladding system selection impacts programme, logistics, and installed cost.",
    "medium",
    rot(11)
  ),
  makeQ(
    "RICS QS monthly cost report for employer should present:",
    "Budget, committed cost, forecast final cost, variances, risks, and cash flow outlook",
    [
    { text: "Site weather diary only", why: "Cost reports address financial status and forecast." },
    { text: "Tender prices from 2019 unchanged", why: "Reports must reflect current forecast and commitments." },
    { text: "Contractor payroll confidential data unrelated to project", why: "Reports focus on project cost performance." }
    ],
    "Employer cost reports integrate budget, commitment, forecast, and risk.",
    "medium",
    rot(12)
  ),
  makeQ(
    "Practical completion cash flow effect for contractor often includes:",
    "Retention release tranche, reduced prelims, and acceleration of snagging costs",
    [
    { text: "Immediate payment of full contract sum if not yet valued", why: "Payment follows valuation of completed work." },
    { text: "Zero change to cash position", why: "PC triggers retention release and cost profile change." },
    { text: "Client stops all payments permanently", why: "Payments continue for valued work and releases." }
    ],
    "Practical completion affects retention cash inflow and cost profile.",
    "medium",
    rot(13)
  ),
  makeQ(
    "Ground source heat pump in environmental services selection requires QS to cost:",
    "Borefield/loop, plant, controls, electrical upgrade, and lifecycle maintenance interfaces",
    [
    { text: "Only boiler swap like-for-like", why: "GSHP systems have distinct civil and MEP cost components." },
    { text: "Exclude electrical infrastructure", why: "Heat pumps often require electrical capacity upgrades." },
    { text: "Ignore Part L compliance implications", why: "Environmental systems interact with building regulations targets." }
    ],
    "Environmental services costing includes civil loops, plant, and infrastructure upgrades.",
    "hard",
    rot(14)
  ),
  makeQ(
    "CVR (cost value reconciliation) on contractor project shows cost £48m, value £46m at month 10. Meaning?",
    "Work-in-progress loss — costs exceed certified value; margin erosion requiring action",
    [
    { text: "Healthy profit guaranteed", why: "Cost exceeding value indicates margin pressure." },
    { text: "Client has overpaid", why: "Value is certified work; lower value means under-recovery." },
    { text: "Irrelevant management metric", why: "CVR is core contractor commercial control." }
    ],
    "Negative CVR gap signals cost over value and margin risk.",
    "hard",
    rot(15)
  ),
  makeQ(
    "Precast concrete flooring vs in-situ slab — construction technology trade-off?",
    "Precast speeds programme and quality control; in-situ offers flexibility for complex geometry",
    [
    { text: "Identical in all project contexts", why: "Selection depends on geometry, programme, and logistics." },
    { text: "In-situ always faster", why: "Precast often accelerates superstructure programme." },
    { text: "Precast cannot be used with steel frame", why: "Precast flooring commonly integrates with steel frames." }
    ],
    "Flooring system choice balances programme, quality, and design flexibility.",
    "medium",
    rot(16)
  ),
  makeQ(
    "Section 278 highway works bond affects project cash flow because:",
    "Bond/security ties up facility until works certified by highway authority",
    [
    { text: "Bonds generate revenue for contractor", why: "Bonds are security obligations, not income." },
    { text: "No financial planning needed", why: "Bonds affect working capital and contingency." },
    { text: "Bond replaces all construction insurance", why: "Bonds secure specific obligations, not all insurable risks." }
    ],
    "Third-party bonds affect working capital and financial planning.",
    "medium",
    rot(17)
  ),
  makeQ(
    "Employer change instruction after 80% MEP installation requires QS to:",
    "Value variation for dismantle, rework, materials, delay, and testing per contract",
    [
    { text: "Value only new kit supply", why: "Variations include demolition, rework, and delay costs." },
    { text: "Refuse valuation until project end", why: "Timely variation valuation supports cost control." },
    { text: "Apply 1% of contract sum flat fee", why: "Valuation must reflect actual change cost." }
    ],
    "Late design changes carry dismantle, rework, and delay valuation components.",
    "hard",
    rot(18)
  ),
  makeQ(
    "Life cycle cost of roof systems should compare:",
    "Capital, maintenance, replacement, insulation performance, and warranty terms",
    [
    { text: "Initial install price only", why: "Life cycle costing includes operational and replacement costs." },
    { text: "Colour options exclusively", why: "Performance and maintenance drive life cycle cost." },
    { text: "Architect fee percentage", why: "Roof LCC focuses on roof system costs over life." }
    ],
    "Roof option appraisal uses whole-life cost not capital cost alone.",
    "medium",
    rot(19)
  ),
  makeQ(
    "Project bank facility covenant requires quarterly cost report certification. QS role?",
    "Provide accurate certified cost/forecast data per funder template and covenant definitions",
    [
    { text: "Inflate forecast to please funder", why: "Misreporting breaches ethics and covenant law." },
    { text: "Ignore funder template", why: "Funded projects require compliant reporting." },
    { text: "Certify structural calculations", why: "QS certifies cost data, not structural engineering." }
    ],
    "Funded projects require QS-certified cost reporting per covenant.",
    "hard",
    rot(20)
  ),
  makeQ(
    "Tower crane foundation and climbing costs belong in:",
    "Preliminaries/temporary works with programme-linked duration costing",
    [
    { text: "Permanent substructure BOQ only", why: "Crane bases are temporary works/prelims unless permanent." },
    { text: "Client land purchase costs", why: "Crane costs are construction preliminaries." },
    { text: "Post-completion marketing budget", why: "Crane costs are construction phase preliminaries." }
    ],
    "Major plant items are costed in preliminaries with programme duration.",
    "easy",
    rot(21)
  ),
  makeQ(
    "NEC project bank account (if used) affects cash flow by:",
    "Ring-fencing payments to contractor and supply chain per trust provisions",
    [
    { text: "Eliminating all interim payments", why: "PBA manages payment flow, not eliminate it." },
    { text: "Paying only employer's staff", why: "PBA protects supply chain payment from project receipts." },
    { text: "Removing need for defined cost records", why: "Defined cost/open book may still apply." }
    ],
    "NEC PBA mechanisms protect supply chain cash flow from project income.",
    "hard",
    rot(22)
  ),
  makeQ(
    "Damp-proof course and cavity tray detailing in masonry construction prevents:",
    "Moisture penetration at junctions — defects here drive snagging and warranty claims",
    [
    { text: "All structural loading", why: "DPC/cavity trays address moisture, not primary structure." },
    { text: "Need for any insulation", why: "Thermal performance is separate though related building physics." },
    { text: "Planning permission requirements", why: "Planning is regulatory; DPC is construction detailing." }
    ],
    "Correct moisture detailing prevents defects with cost/warranty implications.",
    "medium",
    rot(23)
  ),
  makeQ(
    "Forecast final cost (FFC) at month 12 equals actual to date plus:",
    "Cost-to-complete for remaining works including risk and known claims",
    [
    { text: "Original tender sum only", why: "FFC updates from current intelligence." },
    { text: "Client's original aspiration budget always", why: "FFC is realistic forecast, not original budget." },
    { text: "Zero for all future work", why: "Remaining work must be costed to complete." }
    ],
    "FFC = cost incurred to date + realistic cost-to-complete.",
    "easy",
    rot(24)
  ),
  makeQ(
    "Steel frame fire protection method selection (intumescent vs board) impacts:",
    "Cost, programme, thickness, and maintainability of steel sections",
    [
    { text: "Only planning colour palette", why: "Fire protection affects build-up, cost, and programme." },
    { text: "Foundation type selection directly", why: "Fire protection is superstructure issue." },
    { text: "Nothing on commercial projects", why: "Fire protection is mandatory cost and programme item." }
    ],
    "Fire protection systems affect cost, programme, and spatial coordination.",
    "medium",
    rot(25)
  ),
  makeQ(
    "Client funded retention on PFI differs from standard JCT because:",
    "Payment mechanisms follow project agreement output specs and lifecycle service deductions",
    [
    { text: "No financial reporting ever", why: "PFI has rigorous payment and performance reporting." },
    { text: "Identical to JCT without reading contract", why: "PFI payment structures differ from JCT building contracts." },
    { text: "QS not involved in payment certification", why: "QS/certifier roles exist per project agreement." }
    ],
    "PFI finance control follows project agreement, not standard JCT alone.",
    "hard",
    rot(26)
  ),
  makeQ(
    "Value engineering on MEP plant room spatial constraints should consider:",
    "Equipment access, replacement routes, duct/pipe coordination, and builder's work allowances",
    [
    { text: "Only smallest plant regardless of maintenance", why: "Maintainability affects lifecycle cost and operations." },
    { text: "Exclude builders work in walls for penetrations", why: "Builders work is real cost at interfaces." },
    { text: "Ignore acoustic vibration requirements", why: "Plant selection must meet performance and maintenance needs." }
    ],
    "Plant room VE balances capital, spatial, and maintainability constraints.",
    "hard",
    rot(27)
  ),
  makeQ(
    "Payment application underpayment dispute — subcontractor cash remedy may include:",
    "Adjudication, suspension notice per statute, or negotiated settlement per sub terms",
    [
    { text: "Immediate criminal prosecution of QS", why: "Disputes follow contractual/adjudication routes first." },
    { text: "No remedy in UK construction", why: "HGCRA and contracts provide remedies." },
    { text: "Remove works without notice always lawful", why: "Remedies require proper procedure." }
    ],
    "Payment disputes use contractual, adjudication, and statutory remedies.",
    "medium",
    rot(28)
  ),
  makeQ(
    "Building Regulations Part L compliance strategy affects QS cost plan via:",
    "Enhanced envelope, HVAC efficiency, renewables, and testing/commissioning allowances",
    [
    { text: "No cost impact on any element", why: "Part L drives specification and systems cost." },
    { text: "Only paint specification", why: "Part L focuses on energy performance of fabric and systems." },
    { text: "Eliminates need for air tightness testing", why: "Testing and commissioning are Part L related costs." }
    ],
    "Regulatory energy targets materially affect envelope and services costs.",
    "medium",
    rot(29)
  ),
  makeQ(
    "Earned value metric CPI < 1 on contractor project indicates:",
    "Cost efficiency below plan — spending more per unit of work than baseline",
    [
    { text: "Ahead of programme always", why: "CPI addresses cost efficiency, not schedule directly." },
    { text: "Superior margin performance", why: "CPI below 1 signals cost overrun efficiency." },
    { text: "Client payment early", why: "CPI is cost performance index, not cash timing." }
    ],
    "CPI below 1 means actual cost exceeds earned value baseline.",
    "hard",
    rot(30)
  ),
  makeQ(
    "Post-tensioned slab construction technology advantage is:",
    "Longer spans, thinner slabs, and reduced reinforcement for open plan layouts",
    [
    { text: "Eliminates all structural engineering", why: "PT slabs require specialist design and installation." },
    { text: "Unsuitable for commercial buildings always", why: "PT is common in commercial/car park construction." },
    { text: "Cheaper than all alternatives without analysis", why: "Cost depends on spans, logistics, and specialist trade." }
    ],
    "PT slabs enable longer spans with structural and cost implications.",
    "medium",
    rot(31)
  ),
  makeQ(
    "Monthly valuation meeting agenda for contractor QS should cover:",
    "Progress measure, variations, claims status, payment forecast, and supply chain applications",
    [
    { text: "Office Christmas party only", why: "Valuation meetings focus on commercial progress." },
    { text: "Unrelated new business leads", why: "Meeting addresses project valuation and payment." },
    { text: "Tender for next project exclusively", why: "Current project valuation is the priority." }
    ],
    "Valuation meetings coordinate progress, variations, and payment forecasting.",
    "easy",
    rot(32)
  ),
  makeQ(
    "RICS APC Level 3 project finance evidence requires showing:",
    "Leading cost reporting, cash flow forecasting, and final account resolution on real project",
    [
    { text: "Reading a cash flow definition", why: "Level 3 needs applied leadership with outcomes." },
    { text: "One spreadsheet without client interaction", why: "Level 3 includes advice and reporting to stakeholders." },
    { text: "Avoiding all final account work", why: "Final account is core project finance competency." }
    ],
    "Level 3 project finance is demonstrated through live reporting and account closure.",
    "medium",
    rot(33)
  ),
  makeQ(
    "Facade access strategy (BMU vs cradle) lifecycle cost includes:",
    "Capital install, maintenance, replacement, and statutory inspection regime",
    [
    { text: "Capital cost only", why: "BMU/cradle systems have ongoing maintenance and inspection costs." },
    { text: "No cost because landlord maintains always", why: "Responsibility depends on lease/contract — costs still exist." },
    { text: "Only architect's design fee", why: "Access systems are construction and FM cost items." }
    ],
    "Facade access systems carry capital and recurring compliance/maintenance costs.",
    "hard",
    rot(34)
  ),
  makeQ(
    "Cost report variance analysis 'committed vs uncommitted' helps employer:",
    "Understand how much scope is fixed by orders vs still exposed to market movement",
    [
    { text: "Ignore procurement status", why: "Commitment status drives forecast certainty." },
    { text: "Delete uncommitted costs from forecast", why: "Uncommitted scope still needs forecast allowance." },
    { text: "Avoid all subcontracting", why: "Commitment tracking supports procurement strategy." }
    ],
    "Committed/uncommitted analysis shows forecast certainty and exposure.",
    "medium",
    rot(35)
  ),
  makeQ(
    "SFS (light steel framing) infill construction technology is suited to:",
    "Rapid envelope closure in panelised residential/commercial infill with disciplined interfaces",
    [
    { text: "Heavy industrial foundations only", why: "SFS is infill framing, not heavy foundation systems." },
    { text: "Unlimited unsupported height without engineering", why: "SFS requires structural design within limits." },
    { text: "Eliminating all weatherproofing layers", why: "SFS external walls need full weathertight build-up." }
    ],
    "SFS enables fast infill construction with interface coordination requirements.",
    "medium",
    rot(36)
  ),
  makeQ(
    "Project cash flow sensitivity to 4-week programme delay on high-prelims project:",
    "Extended preliminaries, labour/plant standing time, and potential LD exposure",
    [
    { text: "Zero cost impact", why: "Delay extends time-related costs." },
    { text: "Automatic profit increase", why: "Delay generally increases cost and risk." },
    { text: "Client pays LDs to contractor", why: "LDs typically apply contractor-to-employer for delay." }
    ],
    "Programme delay drives preliminaries extension and LD risk.",
    "hard",
    rot(37)
  ),
  makeQ(
    "Final account negotiation stalemate on £400k variation. Next step per JCT culture?",
    "Document positions, consider adjudication, mediation, or senior commercial settlement",
    [
    { text: "Abandon final account indefinitely", why: "Parties should pursue contractual dispute resolution." },
    { text: "Unilateral payment of random sum", why: "Settlement requires substantiation or agreement." },
    { text: "Destroy project records", why: "Records are essential for dispute resolution." }
    ],
    "Final account disputes follow negotiation, ADR, and adjudication routes.",
    "medium",
    rot(38)
  ),
  makeQ(
    "Photovoltaic array on flat roof — QS should allow for:",
    "Structural load check, ballasted/penetrating mounts, inverter, cabling, and DNO connection",
    [
    { text: "Panels only with no electrical scope", why: "PV includes structural, electrical, and grid connection costs." },
    { text: "Exclude maintenance access", why: "Maintenance and safety access may be required." },
    { text: "Ignore roof warranty implications", why: "Penetrations affect waterproofing warranty risk." }
    ],
    "PV costing includes structural, electrical, and connection components.",
    "hard",
    rot(39)
  ),
  makeQ(
    "Cost plan vs tender vs actual 'triangle' reporting shows:",
    "Budget trajectory from planning through procurement to forecast final outturn",
    [
    { text: "Only tender day weather", why: "Triangle tracks cost performance through project life." },
    { text: "Unrelated HR headcount", why: "Triangle is project cost benchmarking tool." },
    { text: "Marketing spend exclusively", why: "Triangle concerns construction cost stages." }
    ],
    "Cost plan-tender-actual triangle tracks cost performance through project stages.",
    "medium",
    rot(40)
  ),
  makeQ(
    "Waterproof concrete basement tanking vs membrane system — technology choice affects:",
    "Risk profile, joint detailing, repairability, and warranty approach",
    [
    { text: "Only lobby decoration", why: "Waterproofing strategy affects basement performance risk." },
    { text: "Nothing — identical cost and risk always", why: "Systems have different risk and detailing implications." },
    { text: "Roof cladding selection", why: "Basement waterproofing is substructure/envelope interface issue." }
    ],
    "Basement waterproofing system choice affects risk, detail, and cost profile.",
    "hard",
    rot(41)
  ),
  makeQ(
    "Interim payment certificate delay of 35 days beyond due date triggers:",
    "Statutory interest and potential suspension rights per HGCRA on qualifying contracts",
    [
    { text: "Automatic contract termination day 36 always", why: "Remedies follow notice and statutory thresholds." },
    { text: "No financial consequence ever", why: "Late payment statutes provide interest remedies." },
    { text: "Contractor must continue funding indefinitely without remedy", why: "Statute protects contractor payment rights." }
    ],
    "Late payment under construction act contracts carries interest and remedy rights.",
    "medium",
    rot(42)
  ),
  makeQ(
    "Acoustic floor build-up in residential conversion requires costing:",
    "Insulation, resilient bars, floating deck, flanking paths, and testing allowance",
    [
    { text: "Standard office carpet only", why: "Residential acoustic floors need compliant build-up." },
    { text: "Exclude party wall/floor junctions", why: "Flanking transmission is major acoustic cost/risk." },
    { text: "Ignore Building Regulations Part E", why: "Part E drives acoustic performance requirements." }
    ],
    "Acoustic compliance requires specified build-ups and testing allowances.",
    "medium",
    rot(43)
  ),
  makeQ(
    "Supply chain insolvency during project — QS commercial response includes:",
    "Assess exposure, retender packages, value acceleration cost, and update forecast/cash flow",
    [
    { text: "Ignore because insolvency is rare", why: "Insolvency requires immediate commercial reassessment." },
    { text: "Hide impact from client", why: "Transparent reporting supports client decision-making." },
    { text: "Assume identical replacement price", why: "Retender in distress market may cost more and delay programme." }
    ],
    "Supply chain failure triggers retender, cost, and programme reassessment.",
    "hard",
    rot(44)
  ),
  makeQ(
    "Modular bathroom pods technology benefit for programme is:",
    "Parallel manufacture while site works proceed, reducing critical path duration",
    [
    { text: "Eliminating all MEP coordination", why: "Pods still require site interfaces and coordination." },
    { text: "Removing need for waterproofing testing", why: "Wet areas still require testing and commissioning." },
    { text: "Unlimited design changes on site without cost", why: "Late changes to pods carry significant cost." }
    ],
    "Pods compress programme via offsite manufacture parallel to site works.",
    "medium",
    rot(45)
  ),
  makeQ(
    "Employer wants KPI dashboard: CPI, committed cost, FFC, cash flow. QS provides:",
    "Integrated monthly report with definitions consistent across project stakeholders",
    [
    { text: "Four conflicting spreadsheets with different FFC definitions", why: "KPI dashboards need consistent definitions." },
    { text: "Only narrative email without numbers", why: "Dashboards require quantified metrics." },
    { text: "Tender BOQ reprint monthly", why: "Dashboards show dynamic forecast, not static tender." }
    ],
    "Project finance dashboards need consistent metric definitions and monthly refresh.",
    "medium",
    rot(46)
  ),
  makeQ(
    "Thermal bridging at balcony connections should be costed with:",
    "Structural thermal break details, insulation continuity, and condensation risk mitigation",
    [
    { text: "Standard balcony without thermal break always", why: "Part L and performance specs may require thermal breaks." },
    { text: "Ignore structural interface", why: "Balcony connections are major thermal bridge risk." },
    { text: "Only decorative balustrade", why: "Thermal/structural interface drives detail cost." }
    ],
    "Balcony thermal bridges require specialist detailing with cost implications.",
    "hard",
    rot(47)
  ),
  makeQ(
    "RICS QS reviewing contractor payment application should verify:",
    "Application matches site progress, contract rates, variations authorised, and retention deducted",
    [
    { text: "Pay full application without review", why: "Certification requires progress and contractual verification." },
    { text: "Ignore unauthorised works", why: "Only instructed/authorised work is certifiable." },
    { text: "Certify future works not started", why: "Payment reflects executed work." }
    ],
    "Payment certification verifies progress, authority, and contractual deductions.",
    "easy",
    rot(48)
  ),
  makeQ(
    "Green roof intensive vs extensive technology cost difference driven by:",
    "Growing medium depth, plant species, irrigation, structural loading, and maintenance",
    [
    { text: "Colour of drainage layer only", why: "Intensive systems are heavier and maintenance-intensive." },
    { text: "Identical structural and maintenance cost", why: "Intensive green roofs cost more to build and maintain." },
    { text: "No structural implications", why: "Loading drives structural design and cost." }
    ],
    "Green roof type affects structure, irrigation, and maintenance cost.",
    "medium",
    rot(49)
  ),
];
