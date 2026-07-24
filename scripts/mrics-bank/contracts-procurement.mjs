import { makeQ, rot } from "./makeQ.mjs";

export const contractsProcurement = [
  makeQ(
    "An employer procures a £40m office via JCT Design and Build 2016. Who carries primary design risk after novation of concept design?",
    "Contractor for completion of design to meet employer's requirements, subject to ERs and liability caps",
    [
    { text: "Employer retains all design risk without exception", why: "D&B transfers design completion risk to contractor per contract." },
    { text: "Architect remains solely liable after novation always", why: "Novation reallocates design responsibility per deed terms." },
    { text: "RICS APC assessor carries design risk", why: "Contract parties allocate design risk, not assessors." }
    ],
    "JCT D&B allocates design completion risk to the contractor within ER framework.",
    "medium",
    rot(0)
  ),
  makeQ(
    "Under NEC4 ECC Option C, target cost mechanics mean:",
    "Defined cost plus fee with pain/gain share against agreed target at completion",
    [
    { text: "Fixed lump sum with no open-book accounting", why: "Option C is target contract with defined cost openness." },
    { text: "Contractor paid dayworks only", why: "Option C uses defined cost, not dayworks as primary mechanism." },
    { text: "No pain/gain possible in NEC", why: "Option C expressly includes pain/gain arrangements." }
    ],
    "NEC Option C combines target cost with defined cost and pain/gain share.",
    "hard",
    rot(1)
  ),
  makeQ(
    "FIDIC Red Book 2017 on an overseas infrastructure job — interim payments are based on:",
    "Measured works per BOQ and contract valuation procedures in Conditions of Contract",
    [
    { text: "Employer's monthly mood assessment", why: "FIDIC payments follow contractual measurement and certification." },
    { text: "UK JCT interim certificate rules automatically", why: "Applicable contract is FIDIC, not JCT." },
    { text: "Final account only with no interim payments", why: "FIDIC includes interim payment mechanisms." }
    ],
    "FIDIC Red Book interim payments follow contract BOQ and valuation clauses.",
    "medium",
    rot(2)
  ),
  makeQ(
    "A two-stage tender is chosen for a complex hospital. Stage 1 typically awards:",
    "Pre-construction services agreement with defined prelim design, programme, and stage 2 competition scope",
    [
    { text: "Full construction contract without price", why: "Stage 1 sets up PCSA/pre-construction with stage 2 price competition." },
    { text: "Design responsibility to employer only with no contractor input", why: "Two-stage engages contractor early for buildability and pricing." },
    { text: "Automatic single-stage conversion without repricing", why: "Stage 2 involves repricing/competition per strategy." }
    ],
    "Two-stage procurement separates pre-construction engagement from stage 2 price fix.",
    "hard",
    rot(3)
  ),
  makeQ(
    "JCT Standard Building Contract with quantities — variations are valued using:",
    "Contract valuation rules referencing BOQ rates and fair rates hierarchy",
    [
    { text: "Whatever the contractor invoices first", why: "Variations follow contract valuation procedure." },
    { text: "RICS Red Book only, superseding JCT", why: "Contract conditions govern unless parties agree otherwise." },
    { text: "No valuation until 10 years after completion", why: "Variations are valued during the contract." }
    ],
    "JCT SBC variations use contractual rate hierarchy for valuation.",
    "medium",
    rot(4)
  ),
  makeQ(
    "NEC early warning meetings primarily aim to:",
    "Notify and mitigate risk events collaboratively before they become compensation events",
    [
    { text: "Replace all compensation event procedures", why: "Early warnings support CE management, not replace it." },
    { text: "Punish contractors for forecasting delay", why: "NEC promotes proactive risk notification." },
    { text: "Eliminate need for programme", why: "Programme remains central to NEC compensation events." }
    ],
    "NEC early warnings are collaborative risk mitigation, core to contract culture.",
    "easy",
    rot(5)
  ),
  makeQ(
    "Procurement on a public sector framework — call-off requires:",
    "Compliance with PCR2015/Procurement Act procedures and framework terms for mini-competition or direct award",
    [
    { text: "Any subcontractor chosen without process", why: "Public procurement must follow statutory framework rules." },
    { text: "Verbal award to lowest informal quote", why: "Framework call-offs need documented compliant process." },
    { text: "Ignore framework pricing schedules", why: "Framework terms govern call-off pricing." }
    ],
    "Public sector framework call-offs must comply with procurement regulations.",
    "hard",
    rot(6)
  ),
  makeQ(
    "JCT Intermediate Building Contract is most appropriate when:",
    "Employer design with contractor carrying works risk; moderate complexity without full SBC administration",
    [
    { text: "Contractor designs entire building with no ERs", why: "That scenario typically uses Design & Build." },
    { text: "No drawings exist at all", why: "IBC still requires defined employer design information." },
    { text: "Only maintenance works under £10k", why: "Minor works use JCT MW, not Intermediate." }
    ],
    "JCT IBC suits employer-designed projects of moderate complexity.",
    "medium",
    rot(7)
  ),
  makeQ(
    "A tenderer submits lowest price but fails insurance requirements. QS recommendation?",
    "Non-compliant — reject or seek cure per tender rules; do not recommend award on price alone",
    [
    { text: "Award anyway and fix insurance later", why: "Mandatory compliance criteria gate award." },
    { text: "Average with compliant bids", why: "Non-compliant tenders are excluded per evaluation criteria." },
    { text: "Accept verbal insurance promise", why: "Compliance requires documented evidence." }
    ],
    "Tender evaluation applies pass/fail compliance before price ranking.",
    "easy",
    rot(8)
  ),
  makeQ(
    "NEC compensation event for adverse weather values by:",
    "Forecast vs actual weather data per contract data with defined compensation thresholds",
    [
    { text: "Contractor diary entry only without data", why: "NEC CEs require contractual evidence and procedure." },
    { text: "Automatic 10% of contract sum", why: "Weather CEs are not blanket percentages." },
    { text: "JCT extension of time rules in NEC contract", why: "NEC has its own compensation event mechanism." }
    ],
    "NEC weather compensation events use contract weather data and thresholds.",
    "hard",
    rot(9)
  ),
  makeQ(
    "Design-and-build ERs are silent on acoustic performance. Tender risk sits with:",
    "Contractor if ERs plus applicable law imply performance; clarify via tender query urgently",
    [
    { text: "Employer always regardless of silence", why: "Silence creates dispute — D&B contractors price implied compliance." },
    { text: "No party — acoustic performance not required", why: "Statutory and functional requirements may still apply." },
    { text: "RICS ethics committee", why: "Contract parties must clarify scope operationally." }
    ],
    "Silent ERs in D&B create contractor pricing risk requiring pre-tender clarification.",
    "hard",
    rot(10)
  ),
  makeQ(
    "Single-stage selective tender with 4 invited contractors — advantage is:",
    "Competitive price with controlled bidder quality and reduced open-market unknowns",
    [
    { text: "Maximum bidder count always", why: "Selective tender limits bidders to pre-qualified firms." },
    { text: "No need for tender documents", why: "Selective tender still requires full tender pack." },
    { text: "Guaranteed zero variations", why: "Variations can arise on any contract form." }
    ],
    "Selective tender balances competition with bidder quality control.",
    "medium",
    rot(11)
  ),
  makeQ(
    "JCT clause 2.29 liquidated damages must be:",
    "Genuine pre-estimate of loss, not penalty, and clearly stated in contract particulars",
    [
    { text: "Any punitive sum to deter delay", why: "UK law restricts penalties; LDs must be genuine pre-estimate." },
    { text: "Verbal side agreement only", why: "LDs must be contractually stated." },
    { text: "Unlimited daily amount without cap", why: "LDs are typically stated rates/amounts per contract." }
    ],
    "JCT liquidated damages require genuine pre-estimate and clear contract statement.",
    "medium",
    rot(12)
  ),
  makeQ(
    "FIDIC Yellow Book (design-build) employer provides:",
    "Employer's requirements; contractor designs and executes works to meet them",
    [
    { text: "Detailed BOQ only with no performance requirements", why: "Yellow Book is design-build on employer's requirements." },
    { text: "No documents at all", why: "Employer provides requirements defining performance/scope." },
    { text: "Only Red Book remeasurement BOQ", why: "Yellow Book is design-build, not Red Book remeasurement." }
    ],
    "FIDIC Yellow Book follows design-build on employer's requirements.",
    "medium",
    rot(13)
  ),
  makeQ(
    "Pre-qualification questionnaire purpose in procurement is:",
    "Assess financial standing, experience, H&S, and capacity before inviting tender",
    [
    { text: "Replace tender pricing entirely", why: "PQQ filters bidders; tender follows for shortlisted firms." },
    { text: "Guarantee lowest price", why: "PQQ addresses capability, not price." },
    { text: "Avoid need for insurance", why: "Insurance is typically verified at PQQ/tender stage." }
    ],
    "PQQ ensures only capable contractors proceed to tender.",
    "easy",
    rot(14)
  ),
  makeQ(
    "NEC4 Option E (cost reimbursable) suits:",
    "High uncertainty scopes needing open-book defined cost with pain/gain or fee control",
    [
    { text: "Fully defined BOQ school extension only", why: "Defined BOQ projects often suit Option A/B better." },
    { text: "Projects requiring zero cost transparency", why: "Option E requires defined cost openness." },
    { text: "When contractor should carry all price risk fixed", why: "Option E is cost reimbursable, not fixed price." }
    ],
    "NEC Option E fits uncertain scope with open-book cost reimbursement.",
    "hard",
    rot(15)
  ),
  makeQ(
    "A contractor notices conflicting specs between drawings and ERs at tender. Best action?",
    "Submit compliant tender query requesting priority and clarification before submission",
    [
    { text: "Assume drawings prevail without asking", why: "Priority of documents is contract-specific and must be clarified." },
    { text: "Price highest interpretation without disclosure", why: "Clarification protects fair tender comparison." },
    { text: "Withdraw silently", why: "Query process exists to resolve conflicts." }
    ],
    "Pre-tender queries resolve document conflicts for fair pricing.",
    "medium",
    rot(16)
  ),
  makeQ(
    "JCT payment notice and pay less notice regime requires:",
    "Specified notices within statutory/contractual deadlines showing sums due and deductions",
    [
    { text: "Oral payment agreement only", why: "Housing Grants Act and JCT require prescribed notices." },
    { text: "Payment whenever convenient", why: "Payment cycles and notices are time-bound." },
    { text: "Withholding 100% without notice", why: "Pay less notices must follow prescribed procedure." }
    ],
    "JCT payment regime requires timely payment and pay less notices.",
    "hard",
    rot(17)
  ),
  makeQ(
    "Negotiated tender without competition is justified when:",
    "Unique specialist supplier, continuity risk, or procurement rules allow — with documented rationale",
    [
    { text: "Client prefers friend's company always", why: "Negotiated procurement needs objective justification." },
    { text: "To avoid any tender documentation", why: "Negotiated routes still require commercial documentation." },
    { text: "Market is always uncompetitive", why: "Competition should be default unless exceptions apply." }
    ],
    "Negotiated tender requires documented justification and compliance with rules.",
    "medium",
    rot(18)
  ),
  makeQ(
    "NEC Project Manager issues instruction changing scope. Contractor should:",
    "Comply and notify compensation event if not own fault within NEC timescales",
    [
    { text: "Ignore instruction until final account", why: "NEC requires compliance subject to CE notification." },
    { text: "Automatically claim 20% of contract sum", why: "CEs require event-specific assessment." },
    { text: "Terminate contract immediately", why: "Instructions are part of normal NEC administration." }
    ],
    "NEC instructions trigger compensation event procedures when applicable.",
    "medium",
    rot(19)
  ),
  makeQ(
    "Retention under JCT typically is:",
    "Percentage withheld from interim payments released at practical completion and defects period end",
    [
    { text: "Permanent contractor penalty", why: "Retention is security, largely released per contract." },
    { text: "Paid upfront to employer", why: "Retention is withheld from contractor payments." },
    { text: "Illegal on all UK projects", why: "Retention is common subject to contract and policy." }
    ],
    "JCT retention provides performance security with staged release.",
    "easy",
    rot(20)
  ),
  makeQ(
    "OJEU/Procurement Act threshold exceeded — next step is:",
    "Structured advertised procedure with defined evaluation criteria and standstill",
    [
    { text: "Direct award to incumbent", why: "Above-threshold works require compliant procedures." },
    { text: "Informal emails to three firms only", why: "Statutory procedures apply above thresholds." },
    { text: "Skip evaluation criteria", why: "Advertised procedures require published criteria." }
    ],
    "Above-threshold public procurement requires statutory advertised procedures.",
    "hard",
    rot(21)
  ),
  makeQ(
    "JCT Minor Works contract limitations include:",
    "Simpler administration for low-risk small works — not for complex major projects",
    [
    { text: "Unlimited project value always suitable", why: "Minor Works is for simpler low-value works." },
    { text: "Includes full design liability on employer always", why: "MW can include contractor design options but is limited in scope." },
    { text: "Replaces NEC on all infrastructure", why: "Contract selection depends on project risk and parties." }
    ],
    "JCT MW suits simple small works with reduced administration.",
    "easy",
    rot(22)
  ),
  makeQ(
    "Contractor's tender qualification 'subject to ground conditions' should be:",
    "Evaluated — may be non-compliant if tender required unconditional acceptance of site info",
    [
    { text: "Ignored because all tenders are equal", why: "Qualifications affect compliance and risk allocation." },
    { text: "Always accepted without review", why: "Employer must assess qualification impact on risk and price." },
    { text: "Automatic award criterion", why: "Qualifications may disqualify or require clarification." }
    ],
    "Tender qualifications affect compliance and risk — require employer assessment.",
    "medium",
    rot(23)
  ),
  makeQ(
    "FIDIC dispute avoidance/adjudication board role is:",
    "Early dispute avoidance and binding adjudication decisions per FIDIC procedure",
    [
    { text: "Replace employer entirely", why: "DAAB supports dispute resolution, not employer functions." },
    { text: "Issue building regulations certificates", why: "DAAB addresses contractual disputes." },
    { text: "Design structural steel connections", why: "DAAB is dispute avoidance/adjudication, not design." }
    ],
    "FIDIC DAAB provides contractual dispute avoidance and adjudication.",
    "medium",
    rot(24)
  ),
  makeQ(
    "Open tender for a school exposes the employer to:",
    "Wide bidder pool with higher bid review burden and potential non-compliant low bids",
    [
    { text: "Zero procurement risk", why: "Open tender increases volume of bids to evaluate." },
    { text: "Guaranteed quality regardless of price", why: "Open tender requires rigorous compliance filtering." },
    { text: "Exemption from all procurement law", why: "Open tender still must comply with regulations." }
    ],
    "Open tender maximises competition but increases evaluation workload.",
    "medium",
    rot(25)
  ),
  makeQ(
    "NEC secondary options for X clauses include:",
    "Additional conditions such as delay damages, performance bonds, and sectional completion",
    [
    { text: "Replacement of all core clauses", why: "Secondary options supplement core NEC clauses." },
    { text: "Only colour of site signage", why: "X clauses address substantive commercial risk." },
    { text: "Mandatory on every NEC contract", why: "Secondary options are selected per project." }
    ],
    "NEC secondary options (X/Y/Z) tailor commercial risk allocation.",
    "hard",
    rot(26)
  ),
  makeQ(
    "Employer delays issuing possession under JCT. Contractor remedy includes:",
    "Extension of time and/or loss and expense per contract if employer delay is relevant event",
    [
    { text: "Immediate termination without notice always", why: "Remedies follow contract notice and relevant events." },
    { text: "No remedy because contractor waits silently", why: "JCT provides EOT/LAE mechanisms for employer delay." },
    { text: "Automatic 50% fee increase", why: "Financial remedies follow contractual valuation." }
    ],
    "Employer possession delay may trigger JCT EOT and loss/expense claims.",
    "hard",
    rot(27)
  ),
  makeQ(
    "Best value procurement in public sector evaluates:",
    "Price and quality criteria weighted per published methodology — not price alone",
    [
    { text: "Lowest price only always", why: "Most public procedures allow quality/social value weighting." },
    { text: "Contractor logo design", why: "Evaluation uses published substantive criteria." },
    { text: "Post-award negotiation without disclosure", why: "Evaluation methodology must be transparent." }
    ],
    "Public best value procurement uses weighted price/quality evaluation.",
    "medium",
    rot(28)
  ),
  makeQ(
    "JCT Design & Build contractor's duty to complete design includes:",
    "Developing employer's requirements to deliver compliant completed works",
    [
    { text: "No obligation if employer had concept architect", why: "D&B contractor completes design to ER standard." },
    { text: "Only pricing without design coordination", why: "Design completion is integral to D&B obligation." },
    { text: "Unlimited redesign of employer spatial requirements", why: "Design must meet ERs, not override employer requirements." }
    ],
    "D&B contractors complete design to satisfy employer's requirements.",
    "medium",
    rot(29)
  ),
  makeQ(
    "A PCSA before D&B construction contract allows:",
    "Early contractor involvement for design development, programming, and tender pricing inputs",
    [
    { text: "Construction start without construction contract", why: "PCSA is pre-construction; construction needs main contract." },
    { text: "Bypass of all procurement rules automatically", why: "PCSA must comply with applicable procurement." },
    { text: "Guaranteed construction award without competition if PCSA signed", why: "Award terms depend on procurement strategy and regulations." }
    ],
    "PCSA enables early contractor input before main D&B contract.",
    "hard",
    rot(30)
  ),
  makeQ(
    "Tender evaluation matrix weighting 60% price, 40% quality requires:",
    "Documented scoring of quality sub-criteria and arithmetically combined weighted result",
    [
    { text: "Choosing favourite bidder subjectively", why: "Weighted matrices need auditable scoring." },
    { text: "Ignoring quality to save time", why: "Published weightings must be applied." },
    { text: "Changing weightings after bids received", why: "Evaluation criteria should be fixed pre-tender." }
    ],
    "Weighted tender evaluation requires transparent documented scoring.",
    "medium",
    rot(31)
  ),
  makeQ(
    "NEC Clause 63 assesses compensation events using:",
    "Projected defined cost of event with disallowable cost rules",
    [
    { text: "Random percentage of delay", why: "Clause 63 uses defined cost assessment rules." },
    { text: "JCT fair rates automatically", why: "NEC has its own CE valuation mechanism." },
    { text: "Employer guess without records", why: "CE assessment requires defined cost evidence." }
    ],
    "NEC CE valuation under Clause 63 uses defined cost principles.",
    "hard",
    rot(32)
  ),
  makeQ(
    "Contractor design portion under JCT SBC with Contractor's Designed Portion requires:",
    "Identification of CDP works in contract documents with appropriate design liability insurance",
    [
    { text: "No insurance because employer designs all", why: "CDP allocates design liability requiring insurance." },
    { text: "Full D&B without stating CDP scope", why: "CDP scope must be identified in contract." },
    { text: "Employer indemnifies all design errors unconditionally", why: "Liability allocation follows contract and CDP scope." }
    ],
    "JCT CDP requires defined scope and design liability provisions.",
    "medium",
    rot(33)
  ),
  makeQ(
    "Framework pricing refresh after 3 years should:",
    "Follow framework rules — mini-competition or indexation/rebenchmark per terms",
    [
    { text: "Lock original rates forever regardless of market", why: "Frameworks include refresh/recompetition mechanisms." },
    { text: "Cancel framework without client process", why: "Refresh follows agreed framework procedure." },
    { text: "Use only one supplier without competition ever", why: "Framework terms govern competition requirements." }
    ],
    "Framework rate refresh follows contractual refresh or mini-competition rules.",
    "medium",
    rot(34)
  ),
  makeQ(
    "Bonds and guarantees in procurement typically include:",
    "Bid bonds, performance bonds, and parent company guarantees per contract risk profile",
    [
    { text: "No security on any public project", why: "Many contracts require performance security." },
    { text: "Only verbal assurances", why: "Bonds are formal financial security instruments." },
    { text: "Guarantee of unlimited profit to contractor", why: "Bonds secure performance, not contractor profit." }
    ],
    "Procurement security packages align with contract risk and employer policy.",
    "easy",
    rot(35)
  ),
  makeQ(
    "JCT fluctuation provisions (optional) address:",
    "Material/labour price movement via formula indices during contract period",
    [
    { text: "Contractor profit guarantee", why: "Fluctuations address input cost movement, not profit." },
    { text: "Extension of defects period only", why: "Fluctuations relate to price indices, not defects timing." },
    { text: "Automatic 30% price increase annually", why: "Fluctuation uses agreed formula indices." }
    ],
    "JCT optional fluctuation provisions pass formula-based price movement.",
    "hard",
    rot(36)
  ),
  makeQ(
    "E-tendering platform use in UK public procurement ensures:",
    "Audit trail, deadline enforcement, and equal information to all bidders",
    [
    { text: "Late bids accepted privately", why: "E-tendering enforces equal deadline compliance." },
    { text: "Hidden amendments to one bidder", why: "Platforms support transparency and audit." },
    { text: "Elimination of evaluation records", why: "E-tendering improves record-keeping." }
    ],
    "E-tendering supports fair transparent auditable procurement.",
    "easy",
    rot(37)
  ),
  makeQ(
    "NEC early contractor involvement under Option X22 supports:",
    "Collaborative design development with target cost evolution before main construction",
    [
    { text: "Eliminating all compensation events", why: "ECI evolves target cost; CEs still apply." },
    { text: "Fixed price without design input", why: "ECI is collaborative pre-construction involvement." },
    { text: "Replacing Project Manager role", why: "Project Manager remains; ECI adds collaboration." }
    ],
    "NEC X22 ECI enables collaborative target cost development.",
    "hard",
    rot(38)
  ),
  makeQ(
    "Letter of intent risk for employer includes:",
    "Limited scope, unclear terms, and payment/dispute exposure if full contract delayed",
    [
    { text: "No risk — LOI equals full JCT contract", why: "LOIs are limited interim arrangements." },
    { text: "Automatic transfer of all design liability to employer always", why: "LOI terms define scope and risk — often limited." },
    { text: "Guaranteed lowest final account", why: "LOI does not guarantee final pricing outcomes." }
    ],
    "LOIs carry scope and contractual certainty risks requiring careful drafting.",
    "medium",
    rot(39)
  ),
  makeQ(
    "Contractor claims EOT under JCT for exceptionally adverse weather. Must demonstrate:",
    "Relevant event, causal delay to completion, and notice within contractual period",
    [
    { text: "Any rain day qualifies automatically", why: "Weather EOT requires exceptional threshold and causation." },
    { text: "No notice required", why: "JCT requires timely delay notices." },
    { text: "Only financial loss without delay analysis", why: "EOT addresses time; prolongation costs are separate." }
    ],
    "JCT EOT claims need relevant event, causation, and compliant notice.",
    "hard",
    rot(40)
  ),
  makeQ(
    "Procurement fraud red flag in tendering is:",
    "Collusive pricing patterns, identical errors across bids, or confidential info leaks",
    [
    { text: "Two compliant bids within 1% price", why: "Close pricing alone is not necessarily collusion." },
    { text: "Use of electronic tender portal", why: "E-tendering reduces fraud risk." },
    { text: "Publishing evaluation criteria", why: "Transparency reduces fraud risk." }
    ],
    "Bid collusion indicators include abnormal patterns and information leaks.",
    "medium",
    rot(41)
  ),
  makeQ(
    "FIDIC force majeure/exceptional events clause effect may include:",
    "Extension of time, cost relief, or termination rights per sub-clause and event type",
    [
    { text: "Automatic full payment without analysis", why: "Relief depends on FIDIC clause and event circumstances." },
    { text: "No contractual remedies exist", why: "FIDIC addresses exceptional events with defined remedies." },
    { text: "Contractor always bears all force majeure cost", why: "Cost/time allocation is clause-specific." }
    ],
    "FIDIC exceptional events trigger defined contractual remedies.",
    "hard",
    rot(42)
  ),
  makeQ(
    "JCT practical completion is generally evidenced by:",
    "Certificate of practical completion when works substantially complete per contract definition",
    [
    { text: "Contractor's email stating done", why: "Completion follows contract certification process." },
    { text: "First brick laid", why: "Practical completion is end of works substantially complete." },
    { text: "Final account agreement only", why: "Practical completion precedes final account." }
    ],
    "JCT practical completion triggers defects period and retention release stages.",
    "easy",
    rot(43)
  ),
  makeQ(
    "Standstill period after public contract award notification allows:",
    "Challenging bidders to seek remedies before contract signature per procurement remedies",
    [
    { text: "Unlimited delay of award forever", why: "Standstill is a defined minimum period." },
    { text: "Immediate contract signature same day without wait", why: "Regulations require standstill before signature." },
    { text: "Exemption from all legal challenge", why: "Standstill provides opportunity for challenge." }
    ],
    "Procurement standstill protects challenger rights before contract execution.",
    "medium",
    rot(44)
  ),
  makeQ(
    "NEC compensation event for client-specified material unavailability requires:",
    "Notification, quotation assessment, and adjustment to programme/prices per NEC process",
    [
    { text: "Contractor absorbs cost silently", why: "Client-risk events may be compensation events." },
    { text: "Automatic termination", why: "NEC provides CE mechanism before termination." },
    { text: "Ignore programme impact", why: "CEs assess time and cost effects." }
    ],
    "NEC CE procedures address client-risk events with quotation assessment.",
    "medium",
    rot(45)
  ),
  makeQ(
    "Domestic subcontract on JCT project — back-to-back means:",
    "Subcontract terms aligned to main contract obligations flowing down appropriately",
    [
    { text: "Subcontractor has no obligations", why: "Back-to-back passes relevant obligations downstream." },
    { text: "Main contract irrelevant to subcontracts", why: "Alignment prevents gaps in risk flow-down." },
    { text: "Employer signs every subcontract personally", why: "Contractor procures subs; terms align to main contract." }
    ],
    "Back-to-back subcontracts align obligations with main contract risk allocation.",
    "medium",
    rot(46)
  ),
  makeQ(
    "APC Level 3 contract practice evidence should show:",
    "Advising client/employer on form selection, risk allocation, and administering key provisions on live project",
    [
    { text: "Reading JCT index only", why: "Level 3 requires applied advisory experience." },
    { text: "Avoiding all contract meetings", why: "Contract practice includes active administration advice." },
    { text: "Delegating all contract decisions to lawyer without QS input", why: "QS provides commercial contract advice alongside legal." }
    ],
    "Level 3 contract practice is demonstrated through form selection and administration advice.",
    "medium",
    rot(47)
  ),
  makeQ(
    "Early supply chain engagement in procurement improves:",
    "Buildability input, realistic pricing, and risk identification before tender",
    [
    { text: "Need for any contract documents", why: "Documentation remains essential." },
    { text: "Guaranteed zero defects", why: "Early engagement reduces risk but does not eliminate defects." },
    { text: "Exclusion of H&S planning", why: "H&S remains integral to procurement and design." }
    ],
    "Early supply chain input improves price realism and risk visibility.",
    "easy",
    rot(48)
  ),
  makeQ(
    "JCT sectional completion allows:",
    "Phased completion certificates with sectional liquidated damages and partial possession",
    [
    { text: "Only one completion date for all phases always", why: "Sectional completion supports phased handover." },
    { text: "No retention on sectional works", why: "Retention can still apply per section." },
    { text: "Automatic waiver of all defects liability", why: "Defects liability continues per section." }
    ],
    "JCT sectional completion supports phased handover and damages.",
    "hard",
    rot(49)
  ),
];
