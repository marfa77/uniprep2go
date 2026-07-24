import { makeQ, rot } from "./makeQ.mjs";

export const commercialCostPlanning = [
  makeQ(
    "A developer asks for an order-of-cost estimate at RIBA Stage 1 for a 12,000 m² office in Manchester. Which approach best meets NRM1 and Level 3 design economics practice?",
    "Prepare an order-of-cost estimate using appropriate functional units, benchmark rates, and stated assumptions with documented exclusions",
    [
    { text: "Issue a fixed lump sum guaranteed to tender without any elemental breakdown", why: "Stage 1 estimates are indicative and cannot guarantee tender outcomes without design detail." },
    { text: "Measure every item to SMM7 rules from outline drawings only", why: "Detailed measurement is premature at Stage 1; order-of-cost methods apply." },
    { text: "Use only the contractor's last project rate with no location or inflation adjustment", why: "Benchmarks must reflect project-specific factors and current market conditions." }
    ],
    "NRM1 order-of-cost estimates at early stages use functional units and benchmarks with transparent assumptions — a core Level 3 cost planning skill.",
    "medium",
    rot(0)
  ),
  makeQ(
    "At RIBA Stage 2, your elemental cost plan shows superstructure at £18.5m against a £17m budget. The architect proposes value engineering. What is your first professional action?",
    "Quantify cost drivers, present options with cost/carbon/function trade-offs, and update the cost plan with agreed adjustments",
    [
    { text: "Delete the superstructure element to balance the total automatically", why: "Cost plans must reflect design reality, not arbitrary element removal." },
    { text: "Wait until tender to address the overspend", why: "Cost planning requires proactive advice before procurement." },
    { text: "Instruct the architect to reduce quality without cost analysis", why: "Value engineering needs structured option appraisal, not unilateral quality cuts." }
    ],
    "Level 3 design economics involves diagnosing overspends, facilitating VE, and revising elemental cost plans with documented rationale.",
    "hard",
    rot(1)
  ),
  makeQ(
    "A PQS is appointed on a design-and-build hospital. The employer's agent requests a cost plan at RIBA Stage 3 aligned to NRM1. Which deliverable is most appropriate?",
    "An elemental cost plan with sub-element breakdown, quantified where possible, tied to the current design and updated assumptions",
    [
    { text: "A contractor's priced BOQ only with no cost plan structure", why: "Employer-side cost planning follows NRM elemental structure, not trade pricing alone." },
    { text: "A single-line total with no elemental split", why: "Stage 3 cost plans require elemental transparency for design decisions." },
    { text: "A post-contract final account format", why: "Final accounts apply after construction; Stage 3 needs forward-looking cost plans." }
    ],
    "RICS QS cost planning at Stage 3 delivers NRM-aligned elemental cost plans supporting employer budget control.",
    "medium",
    rot(2)
  ),
  makeQ(
    "Your client's gateway review requires demonstration that the £45m GIA budget is still viable at RIBA Stage 4. Which evidence best supports Level 3 advice?",
    "Updated elemental cost plan with measured quantities where available, reconciled to previous stages and tender strategy",
    [
    { text: "Verbal assurance that the market is favourable", why: "Gateway decisions require documented cost evidence, not unsupported opinion." },
    { text: "A list of provisional sums with no reconciliation to design", why: "Provisional sums alone do not demonstrate overall budget viability." },
    { text: "Only the architect's specification without cost translation", why: "Cost planners must translate design information into cost advice." }
    ],
    "Stage 4 cost plans integrate measurement progress, design changes, and procurement strategy to confirm budget viability.",
    "hard",
    rot(3)
  ),
  makeQ(
    "A contractor commercial manager must price a two-stage D&B frame agreement. Stage 1 target cost is £28m. Which commercial management action is most sound?",
    "Build up target cost from supply chain input, risk register, and preliminaries with agreed pain/gain mechanisms",
    [
    { text: "Add 30% margin to the employer's budget without analysis", why: "Commercial pricing requires substantiated build-ups, not arbitrary margins." },
    { text: "Exclude preliminaries because they are fixed on every job", why: "Preliminaries vary by programme, site, and methodology and must be priced." },
    { text: "Ignore second-stage subcontract competition", why: "Two-stage procurement relies on competitive second-stage pricing." }
    ],
    "Commercial management at Level 3 involves transparent target-cost build-ups and risk-aligned commercial structures.",
    "hard",
    rot(4)
  ),
  makeQ(
    "An employer asks whether to procure a £6m fit-out as traditional or design-and-build. You are providing design economics advice. What should you compare?",
    "Whole-life implications, cost certainty, programme, design risk allocation, and tender price dispersion for each route",
    [
    { text: "Only the lowest single tender received last year on a different building", why: "Route selection needs project-specific analysis, not unrelated benchmarks." },
    { text: "Architect preference without cost or risk comparison", why: "Procurement advice must be evidence-based across relevant criteria." },
    { text: "Assume D&B is always cheapest regardless of scope definition", why: "Cost outcomes depend on scope, market, and risk transfer." }
    ],
    "Design economics includes procurement route appraisal balancing cost, risk, programme, and quality.",
    "medium",
    rot(5)
  ),
  makeQ(
    "BCIS location and tender price indices have moved +4.2% since your last cost plan. The project is 14 months from anticipated tender. What adjustment is professionally appropriate?",
    "Apply an evidence-based inflation allowance to relevant elements with stated basis and review at next stage",
    [
    { text: "Ignore inflation because the budget was approved", why: "Approved budgets still require inflation transparency in forward estimates." },
    { text: "Increase every element by 15% without documentation", why: "Inflation adjustments should be justified and element-specific where possible." },
    { text: "Defer all inflation to the contractor at tender", why: "Employer cost plans should reflect anticipated market movement." }
    ],
    "Cost planners use BCIS or equivalent indices to project tender-time costs with documented assumptions.",
    "medium",
    rot(6)
  ),
  makeQ(
    "A university client wants lifecycle cost advice for cladding options: aluminium rainscreen vs brick slip. Which analysis best reflects Level 3 design economics?",
    "Compare capital cost, maintenance, replacement cycles, energy performance, and whole-life cost over an agreed period",
    [
    { text: "Select the lowest capital cost option only", why: "Design economics considers whole-life performance, not capital cost alone." },
    { text: "Exclude maintenance because it is an FM issue", why: "Whole-life costing is integral to cladding option appraisal." },
    { text: "Use manufacturer marketing data without independent verification", why: "Advice should be based on verifiable technical and cost data." }
    ],
    "Level 3 design economics integrates capital and operational costs for informed option selection.",
    "hard",
    rot(7)
  ),
  makeQ(
    "Your elemental cost plan includes a 10% design contingency at RIBA Stage 3. The project manager asks why it remains when design is '80% complete'. How do you respond?",
    "Explain contingency covers unresolved design, scope, and market risk until tender — reducing it only with evidenced design maturity",
    [
    { text: "Remove all contingency to show you are under budget", why: "Premature contingency removal misstates risk and misleads the client." },
    { text: "Transfer contingency to contractor profit", why: "Contingency is a risk allowance, not a profit transfer mechanism." },
    { text: "Hide contingency inside every unit rate without disclosure", why: "Cost plans should transparently show risk allowances." }
    ],
    "Design contingencies reflect residual uncertainty and should be managed transparently through stages.",
    "medium",
    rot(8)
  ),
  makeQ(
    "A commercial director on a main contractor framework asks you to review three tender returns for a £12m school extension. Returns range £11.4m–£13.1m. What is your best next step?",
    "Analyse scope compliance, qualifications, preliminaries, risk, programme, and resource assumptions before recommendation",
    [
    { text: "Recommend the lowest price immediately to win work", why: "Lowest price may reflect exclusions, risk mispricing, or insolvency risk." },
    { text: "Average the three prices and award to the middle bidder", why: "Tender analysis requires qualitative and quantitative review, not averaging." },
    { text: "Reject all tenders and re-tender without analysis", why: "Structured analysis should precede any re-tender decision." }
    ],
    "Commercial management includes rigorous tender return analysis beyond headline price.",
    "hard",
    rot(9)
  ),
  makeQ(
    "At feasibility, a client provides 2,500 m² net office area and asks for budget advice in central London. Which functional unit approach is most appropriate?",
    "Cost per m² GIA or NIA using relevant BCIS benchmarks with adjustments for specification, basement, and site constraints",
    [
    { text: "Cost per employee headcount only with no area basis", why: "Early office estimates typically use area-based functional units with stated basis." },
    { text: "Use industrial warehouse benchmarks without adjustment", why: "Building type and location strongly affect benchmark selection." },
    { text: "Apply residential £/m² rates to office accommodation", why: "Functional units must match building use and specification level." }
    ],
    "Feasibility budgeting uses appropriate functional units with transparent benchmark adjustments.",
    "easy",
    rot(10)
  ),
  makeQ(
    "A design change adds a rooftop plant enclosure. The architect asks if it is 'free' because the plant was already budgeted. What is the correct cost planning view?",
    "Assess incremental cost of enclosure, structural support, access, and services diversions beyond the base plant allowance",
    [
    { text: "Treat all design changes as zero cost if within contingency", why: "Changes should be valued incrementally; contingency is not automatic cover." },
    { text: "Ignore structural implications of added load", why: "Cost impact includes associated structural and MEP modifications." },
    { text: "Defer costing until the final account", why: "Cost planning provides timely change cost advice during design." }
    ],
    "Design economics requires incremental cost assessment of changes against baseline allowances.",
    "medium",
    rot(11)
  ),
  makeQ(
    "You are preparing a pre-tender estimate at RIBA Stage 4 using approximate quantities. Which document set is essential?",
    "Coordinated drawings, specifications, provisional quantities, and defined measurement rules with exclusions listed",
    [
    { text: "Outline planning sketches from Stage 1 only", why: "Pre-tender estimates need current coordinated design information." },
    { text: "Contractor's priced BOQ from another project", why: "Estimates must reflect this project's design and scope." },
    { text: "Verbal scope from the client without written record", why: "Professional cost advice requires documented scope and assumptions." }
    ],
    "Pre-tender estimates at Stage 4 rely on coordinated design and stated measurement basis.",
    "medium",
    rot(12)
  ),
  makeQ(
    "A client's cost limit for a refurbishment is £8m. Your order-of-cost estimate is £9.3m at Stage 2. What is the most professional recommendation?",
    "Present options to align scope, specification, or phasing to the budget with quantified savings and residual risk",
    [
    { text: "Proceed silently and hope tender is lower", why: "Cost planners must flag budget gaps with actionable options." },
    { text: "Tell the client the budget is unrealistic without offering solutions", why: "Level 3 advice includes optioneering, not only problem identification." },
    { text: "Reduce the estimate by removing VAT from the total", why: "Estimates must correctly treat tax and statutory costs per brief." }
    ],
    "When estimates exceed budget, QS advice includes scoped options to close the gap.",
    "medium",
    rot(13)
  ),
  makeQ(
    "On a contractor's scheme, you must set a selling price for a negotiated D&B office. Direct costs are £22m, risk £1.2m, overheads 6%, profit target 3%. What commercial principle applies?",
    "Present a transparent build-up separating cost, risk, overheads, and profit with documented assumptions for negotiation",
    [
    { text: "Hide risk inside overheads to simplify the bid", why: "Commercial transparency supports negotiation and internal governance." },
    { text: "Quote £22m only because that is the direct cost", why: "Selling price must reflect risk, overheads, and profit policy." },
    { text: "Match a competitor's price without internal cost review", why: "Commercial management requires cost-led pricing decisions." }
    ],
    "Contractor commercial management uses structured price build-ups for governance and negotiation.",
    "hard",
    rot(14)
  ),
  makeQ(
    "An employer's cost report shows a 6% forecast overrun against approved budget at Stage 4. Under design economics practice, what should the report include?",
    "Cause analysis, forecast final cost, mitigations, contingency status, and decisions required from the client",
    [
    { text: "Only a green RAG status to avoid alarming the client", why: "Cost reporting must be honest and decision-focused." },
    { text: "Delete variances from previous reports", why: "Reports should maintain continuity and trend analysis." },
    { text: "Blame the contractor before appointment", why: "Pre-contract reports focus on design, scope, and procurement factors." }
    ],
    "Employer cost reports at Level 3 enable informed decisions with clear variance analysis.",
    "medium",
    rot(15)
  ),
  makeQ(
    "A mixed-use scheme needs separate cost plans for residential and commercial elements for funding purposes. How should you structure this?",
    "Split elemental cost plans by use with shared infrastructure apportioned on an agreed basis",
    [
    { text: "Produce one blended cost plan with no use split", why: "Funding and appraisal often require use-specific cost allocation." },
    { text: "Allocate all basement costs to residential only", why: "Shared elements need agreed apportionment methodology." },
    { text: "Exclude common parts entirely from the cost plan", why: "Common parts are real costs and must be included." }
    ],
    "Multi-use schemes require transparent cost allocation between uses and shared elements.",
    "hard",
    rot(16)
  ),
  makeQ(
    "A project uses target cost with 60:40 pain/gain share. Final cost is £500k below target. How should commercial management treat the gain?",
    "Apply the agreed share mechanism, document calculation, and adjust final payment per contract terms",
    [
    { text: "Retain all savings as additional contractor profit by default", why: "Pain/gain shares are contractual and must be applied as agreed." },
    { text: "Ignore the mechanism because the client is public sector", why: "Public sector projects still follow agreed commercial mechanisms." },
    { text: "Transfer gain to the next project without client agreement", why: "Gain share calculations are project-specific contractual matters." }
    ],
    "Target-cost commercial management includes correct pain/gain administration.",
    "medium",
    rot(17)
  ),
  makeQ(
    "Your client asks for carbon and cost integrated advice at Stage 3 for structural frame options. What aligns with contemporary QS design economics?",
    "Compare embodied carbon and capital cost for steel, concrete, and timber options with whole-life implications stated",
    [
    { text: "Ignore carbon because it is not a cost element", why: "Modern cost planning increasingly integrates carbon with cost optioneering." },
    { text: "Use only operational energy data for structural choice", why: "Structural optioneering focuses on embodied carbon and capital cost." },
    { text: "Select the lightest frame without engineering or cost input", why: "Options need coordinated structural, cost, and sustainability advice." }
    ],
    "Design economics now commonly integrates cost and embodied carbon in option appraisals.",
    "hard",
    rot(18)
  ),
  makeQ(
    "A cost plan at Stage 3 shows MEP services at 38% of construction cost versus a 32% benchmark. What is your professional response?",
    "Investigate drivers — plant complexity, sustainability targets, riser strategy — and report findings with normalisation basis",
    [
    { text: "Force MEP to 32% by arbitrary rate reduction", why: "Benchmark variances need investigation, not arbitrary adjustment." },
    { text: "Ignore variance because benchmarks are never useful", why: "Benchmarks are diagnostic tools requiring professional interpretation." },
    { text: "Delete MEP sub-elements to hide the variance", why: "Cost plans must remain complete and transparent." }
    ],
    "Benchmark variance analysis is a key Level 3 cost planning diagnostic skill.",
    "medium",
    rot(19)
  ),
  makeQ(
    "An employer wants 'cost certainty' before committing to D&B tender. At Stage 4, what realistically can you advise?",
    "Tender-stage cost plan with defined scope, quantified provisional items, and stated residual risks affecting certainty",
    [
    { text: "Guarantee zero variation after contract award", why: "Residual design and site risks may still produce variations." },
    { text: "Promise the lowest tender will equal the cost plan exactly", why: "Tender outcomes depend on market pricing and scope compliance." },
    { text: "Certify the contractor's design is complete at Stage 4 employer design", why: "Certainty advice must reflect actual scope definition and procurement route." }
    ],
    "Cost certainty advice is qualified by scope definition, procurement route, and residual risks.",
    "hard",
    rot(20)
  ),
  makeQ(
    "A commercial manager reviews supply chain quotations for a £2m cladding package. One subbie is 20% below others. What should you check first?",
    "Scope compliance, exclusions, programme, insurances, technical compliance, and financial standing",
    [
    { text: "Award immediately to improve margin", why: "Abnormally low prices may indicate risk, error, or exclusion." },
    { text: "Assume all quotes are interchangeable", why: "Quotations require scope and qualification comparison." },
    { text: "Select the highest quote to avoid failure", why: "Price alone does not determine suitability; balanced analysis is required." }
    ],
    "Commercial supply-chain review examines price alongside scope, risk, and capability.",
    "medium",
    rot(21)
  ),
  makeQ(
    "RICS Level 3 design economics requires you to explain cost plan evolution to APC assessors. Which narrative is strongest?",
    "How estimates progressed from order-of-cost to pre-tender with key design decisions, VE, and market feedback",
    [
    { text: "That you only produced one spreadsheet at the end", why: "Level 3 requires demonstrated evolution and advice through stages." },
    { text: "That the architect set all costs without QS input", why: "Candidates must show personal cost planning leadership." },
    { text: "That cost plans are confidential and cannot be explained", why: "APC requires articulate explanation of your cost planning decisions." }
    ],
    "APC Level 3 design economics is demonstrated through staged cost plan evolution and advice.",
    "easy",
    rot(22)
  ),
  makeQ(
    "A phased office development has Phase 1 funded now and Phase 2 in three years. How should cost planning treat Phase 2?",
    "Separate cost plan with escalation assumptions, enabling works allowances, and interface costs between phases",
    [
    { text: "Combine both phases into one current-year total without escalation", why: "Phasing requires time-adjusted and interface-aware costing." },
    { text: "Exclude Phase 2 entirely from client advice", why: "Masterplan cost advice should address all committed phases." },
    { text: "Assume Phase 2 costs equal Phase 1 with no review", why: "Future phases need updated assumptions and market outlook." }
    ],
    "Phased developments need stage-specific cost plans and interface cost allowances.",
    "hard",
    rot(23)
  ),
  makeQ(
    "Your employer client requests inclusion of FF&E and loose equipment in the construction cost plan for a hotel. What is correct practice?",
    "Include as separate cost groups with clear exclusion from building contract scope where appropriate",
    [
    { text: "Merge FF&E into concrete rates", why: "FF&E should be identifiable and scope-separated from building works." },
    { text: "Exclude all FF&E as never part of QS remit", why: "Total project cost advice often includes client-defined FF&E allowances." },
    { text: "Double-count FF&E in both preliminaries and finishes", why: "Cost plans must avoid duplication and show clear scope." }
    ],
    "Hotel and fit-out cost planning separates building works from FF&E with clear scope boundaries.",
    "medium",
    rot(24)
  ),
  makeQ(
    "A design team proposes reducing floor-to-floor height to save cost. What cost planning analysis is needed?",
    "Quantify savings in cladding, structure, and MEP against impacts on services capacity, acoustics, and net area",
    [
    { text: "Approve immediately because any reduction saves money", why: "Design changes need net cost and performance impact analysis." },
    { text: "Reject without analysis to save time", why: "Cost planners should evaluate VE proposals objectively." },
    { text: "Consider only door hardware savings", why: "Floor-to-floor changes affect multiple elements and performance criteria." }
    ],
    "VE on floor-to-floor height requires cross-discipline cost and performance trade-off analysis.",
    "hard",
    rot(25)
  ),
  makeQ(
    "At tender analysis for an employer, the lowest compliant bid is £410k below cost plan. What is the QS recommendation process?",
    "Review scope gaps, rates, programme, and qualifications; reconcile to cost plan; advise on award or clarification",
    [
    { text: "Automatic award to lowest without review", why: "Tender analysis must confirm compliance and sustainability of price." },
    { text: "Reject low bid as always non-compliant", why: "Low bids may be valid; analysis determines compliance." },
    { text: "Increase cost plan to match tender without scrutiny", why: "Cost plan and tender reconciliation requires critical review." }
    ],
    "Post-tender employer advice reconciles tenders to cost plans with compliance checks.",
    "medium",
    rot(26)
  ),
  makeQ(
    "A contractor commercial team must forecast preliminaries for an 18-month city centre rebuild. Which factor is most significant?",
    "Site logistics, hoarding, craneage, working hours restrictions, and phased possession",
    [
    { text: "Only head office rent", why: "Project preliminaries are driven by site-specific logistics and constraints." },
    { text: "Uniform £/m² rate from a rural warehouse project", why: "Preliminaries must reflect urban constraints and programme." },
    { text: "Exclude welfare facilities to reduce cost", why: "Statutory site welfare is mandatory and must be included." }
    ],
    "Urban refurbishment preliminaries are heavily influenced by logistics and possession phasing.",
    "medium",
    rot(27)
  ),
  makeQ(
    "An options appraisal compares new build vs retention of a 1960s frame. Which cost planning input is essential?",
    "Investigation allowances, remediation risk, temporary works, programme differential, and operational disruption costs",
    [
    { text: "New build cost only without retention investigation", why: "Retention options need specific investigation and risk allowances." },
    { text: "Assume retention is always cheaper", why: "Retention can carry hidden remediation and programme costs." },
    { text: "Ignore temporary works for phased decanting", why: "Decanting and temporary works are major cost drivers in retention schemes." }
    ],
    "New build vs retention appraisals need full lifecycle and risk-adjusted cost comparison.",
    "hard",
    rot(28)
  ),
  makeQ(
    "A client's funders require quarterly cost reports during design. What minimum content meets Level 3 standards?",
    "Budget status, design development impact, risk/contingency, forecast final cost, and actions for approval",
    [
    { text: "A one-line email stating 'on budget'", why: "Funder reporting requires structured cost intelligence." },
    { text: "Only architect progress photos", why: "Cost reports must address financial status and forecast." },
    { text: "Post-construction cash flow only", why: "Design-stage reporting focuses on cost plan and budget trajectory." }
    ],
    "Funder-grade cost reporting during design tracks budget, risk, and required decisions.",
    "medium",
    rot(29)
  ),
  makeQ(
    "You are commercial manager on a loss-making project at 70% complete. Forecast final cost exceeds sell value. What is the appropriate action?",
    "Reforecast, identify recovery options, escalate commercially, and document margin mitigation with site and head office",
    [
    { text: "Hide the forecast until project completion", why: "Commercial management requires timely transparent forecasting." },
    { text: "Stop all cost recording to avoid evidence", why: "Accurate cost control is essential even on distressed projects." },
    { text: "Automatically claim variations without merit to recover margin", why: "Claims must be contractually and factually substantiated." }
    ],
    "Commercial management includes honest forecasting and structured recovery on distressed jobs.",
    "hard",
    rot(30)
  ),
  makeQ(
    "A cost plan element for external works is based on a single vendor quote for paving. What weakness should you flag?",
    "Single-source pricing lacks competitive market test; recommend benchmark or tender comparison",
    [
    { text: "No weakness if the vendor is well known", why: "Cost plans should reflect market testing where possible." },
    { text: "External works need no cost plan element", why: "External works are a standard NRM element requiring allowance." },
    { text: "Replace external works with a provisional sum always", why: "Provisional sums are for undefined scope, not lazy pricing." }
    ],
    "Cost planning should challenge single-source pricing with market evidence.",
    "easy",
    rot(31)
  ),
  makeQ(
    "An employer's agent asks you to align the cost plan to JCT Design & Build employer's requirements. What linkage is key?",
    "Cost plan scope and exclusions must mirror ERs, drawings, and stated provisional items",
    [
    { text: "Cost plan can ignore ER exclusions", why: "Misalignment creates contract and budget risk." },
    { text: "Only the contract sum matters after award", why: "Pre-contract cost plans must align to tender documentation." },
    { text: "Use NEC wording in a JCT cost plan without adjustment", why: "Documentation and cost plan must match the chosen contract form." }
    ],
    "Pre-tender cost plans must align with contract documentation scope.",
    "medium",
    rot(32)
  ),
  makeQ(
    "A developer requests sensitivity analysis on steel price volatility for a 30-storey residential tower. What do you provide?",
    "Elemental sensitivity on steel package with percentage and absolute impact on total cost and funding headroom",
    [
    { text: "A generic note that materials fluctuate", why: "Sensitivity analysis should quantify specific material impacts." },
    { text: "Ignore steel because it is subcontracted", why: "Main material risks affect overall project cost and funding." },
    { text: "Fix steel price for three years without market basis", why: "Sensitivity should reflect realistic market volatility scenarios." }
    ],
    "Design-stage sensitivity analysis quantifies material price risk on total project cost.",
    "hard",
    rot(33)
  ),
  makeQ(
    "Commercial management requires you to set a bid strategy for a competitive two-envelope tender. What is sound practice?",
    "Technical compliance first, then price submission with internal walk-away thresholds and risk review",
    [
    { text: "Submit lowest price regardless of technical compliance", why: "Non-compliant technical submissions may disqualify the bid." },
    { text: "Price before confirming technical solution", why: "Two-envelope processes separate technical and price evaluation." },
    { text: "Share price with competitors to stabilise market", why: "Bid collusion is unethical and potentially illegal." }
    ],
    "Two-envelope tender strategy balances technical compliance with disciplined commercial pricing.",
    "medium",
    rot(34)
  ),
  makeQ(
    "At Stage 2, the client asks for a cost plan using elemental format but design is only massing models. What do you do?",
    "Prepare elemental cost plan with assumptions per element, flag uncertainty, and plan measurement at Stage 3",
    [
    { text: "Refuse until full construction drawings exist", why: "Cost plans are required at Stage 2 with stated assumptions." },
    { text: "Present a trade BOQ as elemental cost plan", why: "Elemental structure follows NRM, not trade breakdown." },
    { text: "Copy another project's cost plan verbatim", why: "Each project needs tailored assumptions and adjustments." }
    ],
    "Early elemental cost plans are assumption-led with clear uncertainty flags.",
    "medium",
    rot(35)
  ),
  makeQ(
    "A PQS advises on abnormal costs for a constrained city site with party wall awards. How should these appear in the cost plan?",
    "Separate identifiable allowances for party wall, logistics, and restrictions within relevant elements or risk",
    [
    { text: "Bury abnormal costs in generic preliminaries without identification", why: "Abnormal site costs should be visible for client decision-making." },
    { text: "Exclude party wall costs as legal not QS", why: "Party wall and access costs are integral project costs." },
    { text: "Assume abnormal costs equal 1% always", why: "Abnormal costs need site-specific assessment." }
    ],
    "Abnormal site costs should be explicitly allowed in cost plans with justification.",
    "medium",
    rot(36)
  ),
  makeQ(
    "Your cost plan reconciliation shows fittings and furnishings underspent but MEP overspent after tender. What advice follows?",
    "Rebalance forecast, confirm scope transfers with design team, and update post-tender cost plan/report",
    [
    { text: "Leave elements unchanged because tender is fixed", why: "Post-tender cost plans reflect tender pricing and scope allocation." },
    { text: "Hide underspend to mask MEP overrun", why: "Transparent reconciliation supports client budget control." },
    { text: "Cancel MEP works to offset fittings", why: "Advice must respect design requirements and contract scope." }
    ],
    "Post-tender reconciliation reallocates tender pricing across elements with design confirmation.",
    "hard",
    rot(37)
  ),
  makeQ(
    "A contractor asks the PQS to produce the employer's cost plan and also price the same works commercially. What ethical issue arises?",
    "Conflict of interest — separate teams or declined appointment needed to protect client and market fairness",
    [
    { text: "No issue if both fees are paid", why: "Dual roles can compromise independent cost advice." },
    { text: "Commercial pricing improves cost plan accuracy automatically", why: "Independence of employer advice must be preserved." },
    { text: "Share the contractor's margin target with the employer", why: "Confidential commercial data must not cross conflicted roles." }
    ],
    "Independence in employer cost planning conflicts with contractor commercial pricing roles.",
    "easy",
    rot(38)
  ),
  makeQ(
    "Design economics at Level 3 includes advising on specification levels. Client wants 'Category A office' but budget suggests 'shell and core'. What do you do?",
    "Define specification tiers with cost ranges and facilitate client choice against budget and market evidence",
    [
    { text: "Promise Category A without cost consequence", why: "Specification advice must be budget-linked." },
    { text: "Downspec silently without client approval", why: "Specification changes require client-informed decisions." },
    { text: "Ignore fit-out allowances in shell and core pricing", why: "Shell and core vs fitted outcomes need clear cost differentiation." }
    ],
    "Specification advice maps fit-out levels to cost with client-led decisions.",
    "medium",
    rot(39)
  ),
  makeQ(
    "A cost plan for a data centre must capture redundancy in MEP. Which approach is correct?",
    "Model N+1 or 2N redundancy costs explicitly in MEP elements with basis of design stated",
    [
    { text: "Use standard office MEP benchmarks", why: "Data centres have atypical redundancy and services intensity." },
    { text: "Hide redundancy in contingency without explanation", why: "Critical design parameters should be visible in cost plans." },
    { text: "Exclude generators as landlord supply always", why: "Scope must confirm inclusion of backup power and cooling." }
    ],
    "Specialist buildings need parameter-driven cost plans, not generic benchmarks alone.",
    "hard",
    rot(40)
  ),
  makeQ(
    "Commercial management on a framework requires pricing call-off works without full redesign. What pricing mechanism is typical?",
    "Priced schedule of rates or bill of quantities with defined adjustment rules for scope changes",
    [
    { text: "Open-ended cost reimbursement without caps", why: "Framework call-offs need defined pricing mechanisms." },
    { text: "Single lump sum for all future works regardless of scope", why: "Undefined lump sums create dispute and margin risk." },
    { text: "Verbal rates agreed on site only", why: "Framework pricing requires documented rate schedules." }
    ],
    "Framework commercial management relies on documented rates and adjustment rules.",
    "medium",
    rot(41)
  ),
  makeQ(
    "An employer requests that consultant fees be included in the project cost plan. How should you treat them?",
    "Separate consultant and construction cost groups with clearly defined inclusion/exclusion boundaries",
    [
    { text: "Add 10% to construction cost arbitrarily for fees", why: "Consultant fees should be itemised or allowance-based with scope." },
    { text: "Exclude all professional fees from project cost", why: "Total project cost often includes design and PM fees per client brief." },
    { text: "Include contractor profit inside consultant fees", why: "Fee groups must not double-count contractor commercial elements." }
    ],
    "Project cost plans commonly separate construction and professional fee cost groups.",
    "easy",
    rot(42)
  ),
  makeQ(
    "Value engineering workshop proposes standardising bathroom pods. What cost planning evidence supports the decision?",
    "Compare pod capital cost, programme saving, quality control, and logistics against traditional build",
    [
    { text: "Approve pods because they are modern", why: "VE decisions require quantified comparative evidence." },
    { text: "Reject pods without reviewing supplier data", why: "Objective analysis should precede rejection." },
    { text: "Ignore installation crane and access costs", why: "Pod solutions have logistics costs that affect net benefit." }
    ],
    "Pod VE decisions need capital, programme, and logistics cost comparison.",
    "medium",
    rot(43)
  ),
  makeQ(
    "A cost report must explain a £1.1m increase since last month due to cladding specification change. What documentation is expected?",
    "Change reference, elemental impact, comparison to allowance, and updated forecast with approval trail",
    [
    { text: "State 'cladding more expensive' only", why: "Variance reports need quantified traceable analysis." },
    { text: "Omit the increase until tender", why: "Timely reporting of material changes is required." },
    { text: "Spread increase equally across all elements without cause", why: "Variances should attach to causative elements." }
    ],
    "Cost variance reporting ties changes to design decisions with quantified elemental impact.",
    "medium",
    rot(44)
  ),
  makeQ(
    "For APC, you must show commercial management on a £35m civils framework. Which example best demonstrates Level 3?",
    "Leading supply chain negotiations, risk pricing, and margin governance on multiple call-offs with measured outcomes",
    [
    { text: "Attending a single pricing meeting without decisions", why: "Level 3 requires leadership and evidenced commercial outcomes." },
    { text: "Reading tender documents without contributing", why: "Passive involvement does not demonstrate Level 3 competency." },
    { text: "Delegating all commercial decisions to legal", why: "Commercial management is a QS-led competency." }
    ],
    "Level 3 commercial management is shown through leadership in pricing, risk, and supply chain outcomes.",
    "hard",
    rot(45)
  ),
  makeQ(
    "A client wants to compare modular vs traditional construction for a student accommodation block. What cost planning deliverable helps?",
    "Option appraisal with capital cost, programme, factory/offsite assumptions, interfaces, and risk allowances",
    [
    { text: "Traditional cost plan only", why: "Option appraisals need parallel option-specific cost models." },
    { text: "Modular supplier brochure as sole evidence", why: "Independent cost planning should verify supplier claims." },
    { text: "Ignore transport and cranage for modules", why: "Modular costs include logistics and interface works." }
    ],
    "Modular vs traditional appraisals need option-specific costs including logistics and interfaces.",
    "hard",
    rot(46)
  ),
  makeQ(
    "Your Stage 4 cost plan will inform a JCT Intermediate Building Contract tender. Should VAT be in the cost plan?",
    "Follow client brief — typically show net construction cost with VAT stated separately for UK projects",
    [
    { text: "Always include VAT inside every elemental rate without stating treatment", why: "VAT treatment must be explicit and consistent." },
    { text: "Exclude VAT permanently from all client reporting", why: "Clients need clarity on VAT handling per funding and tax status." },
    { text: "Add VAT only to preliminaries", why: "VAT treatment applies consistently per agreed reporting convention." }
    ],
    "UK cost plans should clearly state VAT treatment per client and funding requirements.",
    "easy",
    rot(47)
  ),
  makeQ(
    "A contractor's cost plan for internal governance shows negative margin at tender stage. What should commercial management do before submission?",
    "Review scope, risk, efficiencies, and walk-away position; escalate for director approval or no-bid decision",
    [
    { text: "Submit anyway to keep turnover", why: "Disciplined commercial governance avoids unsustainable bids." },
    { text: "Reduce safety costs to restore margin", why: "Safety and compliance costs must not be cut for margin." },
    { text: "Increase price after award informally", why: "Post-award informal price increases are improper." }
    ],
    "Pre-submission commercial review includes walk-away analysis and governance on margin.",
    "medium",
    rot(48)
  ),
  makeQ(
    "An employer requests integration of Section 106 and CIL into the project cost plan. How do you treat them?",
    "Identify planning obligations separately from construction cost with timing per planning agreement",
    [
    { text: "Add CIL to concrete element rates", why: "Planning obligations are separate cost items with distinct timing." },
    { text: "Ignore S106 because it is paid after completion always", why: "S106 timing varies and must be reflected in project cost and cash flow." },
    { text: "Double-count CIL in contingency and planning", why: "Cost plans must avoid duplication of statutory costs." }
    ],
    "Planning obligations are separately identified in project cost plans with correct timing.",
    "medium",
    rot(49)
  ),
];
