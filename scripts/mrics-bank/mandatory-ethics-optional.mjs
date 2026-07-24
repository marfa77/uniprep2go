import { makeQ, rot } from "./makeQ.mjs";

export const mandatoryEthicsOptional = [
  makeQ(
    "RICS Rules of Conduct require a QS to declare to a client:",
    "Conflicts of interest, fees, and scope limitations before accepting instruction",
    [
    { text: "Nothing until final account", why: "Transparency at outset is mandatory under RICS conduct rules." },
    { text: "Only successes on other projects, not conflicts", why: "Conflicts must be disclosed proactively." },
    { text: "Competitor fee structures confidentially obtained", why: "Disclosure concerns own conflicts, not improper intelligence gathering." }
    ],
    "RICS conduct requires early disclosure of conflicts, fees, and limitations.",
    "easy",
    rot(0)
  ),
  makeQ(
    "Ethics at Level 3 in APC final interview means assessors expect:",
    "Applied ethical judgment examples with reasoning, consequences, and RICS standards reference",
    [
    { text: "Reciting the dictionary definition of ethics only", why: "Level 3 requires applied scenarios and judgment." },
    { text: "Stating ethics is not assessed", why: "Unsatisfactory ethics can cause automatic referral." },
    { text: "Avoiding any discussion of difficult decisions", why: "Candidates must discuss real ethical dilemmas." }
    ],
    "Ethics Level 3 is demonstrated through reasoned applied examples in interview.",
    "medium",
    rot(1)
  ),
  makeQ(
    "A QS discovers their firm also advises the contractor bidding the same employer work. Action?",
    "Declare conflict immediately; separate teams or decline instruction per RICS conflict policy",
    [
    { text: "Proceed silently to maximise fee income", why: "Undisclosed conflicts breach RICS Rules of Conduct." },
    { text: "Share employer budget with contractor team", why: "Confidential employer information must not cross conflicted teams." },
    { text: "Destroy employer records", why: "Records must be preserved; conflict must be managed properly." }
    ],
    "Conflicts require disclosure and structural separation or declination.",
    "hard",
    rot(2)
  ),
  makeQ(
    "Mandatory competency Client care at Level 2 for QS includes:",
    "Understanding client objectives, managing expectations, and delivering proportionate service",
    [
    { text: "Telling client only what they want to hear", why: "Client care includes honest professional advice." },
    { text: "Avoiding all written communication", why: "Client care requires clear documented communication." },
    { text: "Ignoring client business constraints", why: "Client care aligns advice to client objectives and constraints." }
    ],
    "Client care Level 2 is understanding and managing client expectations professionally.",
    "easy",
    rot(3)
  ),
  makeQ(
    "Communication mandatory competency at Level 2 expects QS to:",
    "Present cost advice clearly to diverse stakeholders in appropriate formats",
    [
    { text: "Use unexplained jargon with all clients", why: "Effective communication adapts to audience." },
    { text: "Communicate only via informal chats without records", why: "Professional communication includes appropriate documentation." },
    { text: "Avoid presenting to clients entirely", why: "QS regularly presents cost advice to clients." }
    ],
    "Communication Level 2 is clear tailored presentation of technical advice.",
    "easy",
    rot(4)
  ),
  makeQ(
    "Health and safety mandatory competency Level 2 for office-based QS means:",
    "Understanding CDM duties, hazard identification in advice, and promoting safe procurement/design",
    [
    { text: "Operating tower cranes personally", why: "Level 2 is awareness and influence, not operatives' tasks." },
    { text: "Ignoring H&S in cost advice", why: "QS advice can affect H&S outcomes in procurement and design." },
    { text: "Replacing principal designer role always", why: "CDM roles are allocated per regulations; QS supports compliance." }
    ],
    "H&S Level 2 requires understanding CDM and influencing safe outcomes.",
    "medium",
    rot(5)
  ),
  makeQ(
    "Optional competency Risk management at Level 2 for QS involves:",
    "Identifying, recording, and mitigating project commercial and delivery risks proportionately",
    [
    { text: "Eliminating all risk by ignoring contracts", why: "Risk management recognises and treats risk, not denial." },
    { text: "Transferring every risk to client without discussion", why: "Risk allocation requires informed client dialogue." },
    { text: "Risk management is not relevant to QS", why: "QS core practice integrates commercial risk management." }
    ],
    "Risk management optional competency covers identification and mitigation of project risks.",
    "medium",
    rot(6)
  ),
  makeQ(
    "Contract administration optional competency differs from contract practice because it focuses on:",
    "Day-to-day administration — notices, certificates, records — often Level 2 supporting role",
    [
    { text: "Selecting JCT vs NEC only at appointment", why: "Form selection is contract practice; administration is operational." },
    { text: "Structural engineering design certification", why: "Contract administration is contractual process management." },
    { text: "Marketing the contractor's services", why: "Administration concerns contract compliance and records." }
    ],
    "Contract administration is operational contract process management at optional Level 2.",
    "medium",
    rot(7)
  ),
  makeQ(
    "A candidate chooses Programming and planning as optional competency. Evidence should show:",
    "Linking cost advice to programme logic, critical path, and delay cost implications",
    [
    { text: "No connection between cost and programme", why: "Programming optional links schedule and commercial outcomes." },
    { text: "Only Gantt chart software licence ownership", why: "Competency needs applied project examples." },
    { text: "Avoiding extension of time topics", why: "Planning competency intersects with delay analysis." }
    ],
    "Programming optional competency connects programme decisions to cost and risk.",
    "hard",
    rot(8)
  ),
  makeQ(
    "RICS regulated member receives gift from supplier before award recommendation. Ethical response?",
    "Decline or declare per gifts policy; ensure recommendation remains objective",
    [
    { text: "Accept lavish gifts without disclosure", why: "Gifts can compromise independence and breach conduct rules." },
    { text: "Award to gift giver automatically", why: "Procurement recommendations must be objective." },
    { text: "Hide gift from employer and RICS", why: "Transparency and policy compliance are required." }
    ],
    "Gifts policy protects independence of procurement recommendations.",
    "medium",
    rot(9)
  ),
  makeQ(
    "Sustainability optional competency for QS at Level 2 includes:",
    "Advising on cost/carbon trade-offs, waste minimisation, and sustainable procurement options",
    [
    { text: "Ignoring PAS 2080 and project carbon targets", why: "Sustainability competency includes carbon-aware cost advice." },
    { text: "Only installing solar panels on QS office roof", why: "Competency is project advice, not personal office fit-out." },
    { text: "Treating sustainability as purely marketing", why: "Sustainability optional requires substantive project application." }
    ],
    "Sustainability optional integrates environmental outcomes with cost advice.",
    "medium",
    rot(10)
  ),
  makeQ(
    "Capital allowances optional competency relevant to QS involves:",
    "Identifying qualifying plant/fixtures elements affecting client tax-efficient cost reporting",
    [
    { text: "Preparing personal tax returns for all staff", why: "Capital allowances advice is specialist tax-related QS input." },
    { text: "Ignoring MEP plant categorisation", why: "Plant categorisation affects capital allowances claims." },
    { text: "Replacing HMRC guidance arbitrarily", why: "Advice must align with tax legislation and specialist input." }
    ],
    "Capital allowances optional links cost breakdown to tax-efficient asset categorisation.",
    "hard",
    rot(11)
  ),
  makeQ(
    "APC case study must demonstrate Level 3 advice personally given within:",
    "Last 24 months on a project where you provided reasoned professional recommendations",
    [
    { text: "Any project from 15 years ago without recent relevance", why: "RICS requires recent case study within 24 months." },
    { text: "A fictional project with no client", why: "Case study must be real with client context." },
    { text: "Only university coursework", why: "APC case study requires professional practice experience." }
    ],
    "QS APC case study uses recent real projects with personal Level 3 advice.",
    "easy",
    rot(12)
  ),
  makeQ(
    "Whistleblowing on unsafe site practice observed during valuation visit — QS should:",
    "Raise through appropriate H&S channels, document, and escalate per firm and CDM duties",
    [
    { text: "Ignore because QS is commercial only", why: "H&S mandatory competency requires action on serious hazards." },
    { text: "Post photos publicly without process", why: "Escalation should follow firm and legal procedures." },
    { text: "Demand bribe to stay silent", why: "Extortion is criminal and breaches all professional ethics." }
    ],
    "Serious H&S issues require proper escalation per CDM and firm policy.",
    "hard",
    rot(13)
  ),
  makeQ(
    "Mandatory competency Data management Level 1 for QS means:",
    "Maintaining accurate organised project cost records with appropriate confidentiality",
    [
    { text: "Deleting emails to save server space", why: "Records must be retained per policy and law." },
    { text: "Sharing all data on public social media", why: "Confidential project data requires protection." },
    { text: "Using only handwritten notes without backup", why: "Professional data management requires reliable accessible records." }
    ],
    "Data management Level 1 is accurate, confidential, organised project records.",
    "easy",
    rot(14)
  ),
  makeQ(
    "Diversity and inclusion mandatory competency at Level 1 requires:",
    "Awareness of inclusive behaviours and fair treatment in professional practice",
    [
    { text: "Active discrimination to match client bias", why: "RICS requires inclusive professional conduct." },
    { text: "Ignoring accessibility in client communications", why: "Inclusion includes accessible communication awareness." },
    { text: "Excluding colleagues from teams based on protected characteristics", why: "Discrimination breaches law and RICS standards." }
    ],
    "D&I Level 1 is awareness and application of inclusive professional behaviour.",
    "easy",
    rot(15)
  ),
  makeQ(
    "A QS is asked to certify progress they have not inspected. Ethical response?",
    "Refuse false certification; inspect or qualify report based on available verified information",
    [
    { text: "Certify 100% to maintain contractor relationship", why: "False certification is dishonest and professionally misconduct." },
    { text: "Copy last month's certificate", why: "Certification must reflect verified current progress." },
    { text: "Charge extra but still certify falsely", why: "Dishonesty is not cured by higher fee." }
    ],
    "Progress certification must be based on verified inspection or qualified limits.",
    "hard",
    rot(16)
  ),
  makeQ(
    "Two optional competencies to Level 2 on QS pathway should be:",
    "Selected from pathway list and evidenced with distinct examples — e.g., Risk management and Contract administration",
    [
    { text: "Duplicating the same example for both", why: "Each optional competency needs distinct evidence." },
    { text: "Chosen randomly without pathway list check", why: "Optionals must be from current RICS pathway guide." },
    { text: "Ignored because only core matters", why: "Two optionals to Level 2 are mandatory pathway requirements." }
    ],
    "QS pathway requires two distinct optional competencies to Level 2 from guide list.",
    "medium",
    rot(17)
  ),
  makeQ(
    "RICS 'act with integrity' in fee bidding means:",
    "Honest transparent fee proposals without hidden commissions or misleading scope",
    [
    { text: "Underquote then recover via aggressive variations", why: "Bait-and-switch fee tactics breach integrity." },
    { text: "Accept secret kickbacks from subcontractors", why: "Undisclosed commissions compromise integrity." },
    { text: "Promise services firm cannot deliver", why: "Integrity requires honest capability representation." }
    ],
    "Integrity in fee proposals means transparent honest scope and pricing.",
    "medium",
    rot(18)
  ),
  makeQ(
    "Conflict between employer cost plan confidentiality and contractor's information request on another job:",
    "Decline to disclose confidential employer data; maintain information barriers",
    [
    { text: "Share employer budget to win contractor work", why: "Confidentiality must be maintained across assignments." },
    { text: "Anonymise partially but include identifiable figures", why: "Partial disclosure may still breach confidentiality." },
    { text: "Sell data to highest bidder", why: "Selling confidential data is serious misconduct." }
    ],
    "Confidential employer information cannot be disclosed on other assignments.",
    "hard",
    rot(19)
  ),
  makeQ(
    "Level 3 Ethics interview question on bribery overseas agent. Strong answer includes:",
    "Reference Bribery Act 2010, due diligence, refusal, and escalation per RICS and firm policy",
    [
    { text: "Pay bribe as local custom always acceptable", why: "UK Bribery Act can apply to overseas conduct." },
    { text: "Ignore unless caught", why: "Ethics is proactive compliance, not avoidance of detection." },
    { text: "Delegate personal accountability to agent entirely", why: "Firms and individuals retain anti-bribery responsibility." }
    ],
    "Ethics Level 3 addresses Bribery Act compliance and due diligence on agents.",
    "hard",
    rot(20)
  ),
  makeQ(
    "Client care when delivering bad news on 15% budget overrun requires:",
    "Early transparent communication with options, impacts, and recommended path forward",
    [
    { text: "Delay telling client until after handover", why: "Client care requires timely honest communication." },
    { text: "Blame client exclusively without analysis", why: "Professional advice is balanced and evidence-based." },
    { text: "Hide overrun in vague language intentionally", why: "Deliberate obscurity breaches client care and ethics." }
    ],
    "Client care includes clear timely communication of adverse cost news with options.",
    "medium",
    rot(21)
  ),
  makeQ(
    "Insurance optional competency at Level 2 for QS may cover:",
    "Understanding insured parties, cover relevance to project risk, and claims documentation support",
    [
    { text: "Selling personal car insurance", why: "Insurance optional relates to project/construction insurance context." },
    { text: "Replacing broker's technical advice always", why: "QS supports understanding; specialist brokers advise cover." },
    { text: "Ignoring CAR/PI policy relevance", why: "Project insurance affects risk and contract administration." }
    ],
    "Insurance optional includes understanding project insurance roles and documentation.",
    "medium",
    rot(22)
  ),
  makeQ(
    "APC summary of experience must map:",
    "All mandatory and core/optional competencies with level achieved and cross-references",
    [
    { text: "Only hobbies outside work", why: "Summary maps professional competency achievement." },
    { text: "Unrelated GCSE results only", why: "APC summary is competency-structured professional experience." },
    { text: "Competencies without any project examples", why: "Examples are required to evidence competency levels." }
    ],
    "Summary of experience maps competencies to levels with project cross-references.",
    "easy",
    rot(23)
  ),
  makeQ(
    "A junior asks you to backdate a site instruction record. Response?",
    "Refuse; create accurate contemporaneous record noting actual instruction date and reason for delay",
    [
    { text: "Backdate to help contractor cash flow", why: "Falsifying records is dishonest and may be fraudulent." },
    { text: "Delete instruction instead", why: "Valid instructions need accurate records." },
    { text: "Charge fee for falsification", why: "Ethics prohibits falsification regardless of fee." }
    ],
    "Records must be accurate; backdating is falsification.",
    "hard",
    rot(24)
  ),
  makeQ(
    "Dispute resolution optional competency Level 2 evidence might include:",
    "Supporting adjudication/negotiation with documented quantum substantiation",
    [
    { text: "Starting fights on site", why: "Dispute resolution is formal professional process." },
    { text: "Withholding all records from adjudicator", why: "Good faith dispute resolution requires evidence." },
    { text: "Ignoring contract notice requirements", why: "Dispute resolution follows contractual procedures." }
    ],
    "Dispute resolution optional covers supported participation in ADR processes.",
    "medium",
    rot(25)
  ),
  makeQ(
    "RICS consumer service standards apply when:",
    "Providing regulated services to external clients under RICS regulation",
    [
    { text: "Never — QS is exempt", why: "RICS regulated firms follow consumer service standards." },
    { text: "Only residential leasehold work always", why: "Standards apply broadly to regulated services." },
    { text: "Only when client requests them in writing", why: "Standards apply by regulation, not opt-in." }
    ],
    "RICS regulated practices must meet consumer service standards.",
    "medium",
    rot(26)
  ),
  makeQ(
    "Personal development mandatory competency Level 1 means:",
    "Maintaining CPD and reflective learning to improve professional practice",
    [
    { text: "No learning after university degree", why: "CPD is ongoing mandatory requirement." },
    { text: "CPD only watching unrelated TV", why: "CPD must be relevant structured learning." },
    { text: "Forging CPD records to meet quota", why: "Falsifying CPD is misconduct." }
    ],
    "Personal development Level 1 is ongoing relevant CPD and reflection.",
    "easy",
    rot(27)
  ),
  makeQ(
    "Consultancy QS asked to provide 'lowest possible' cost plan to help client secure funding knowing it is optimistic. Ethics?",
    "Present realistic range with assumptions and risks — not misleading single optimistic figure",
    [
    { text: "Provide unrealistically low figure as requested", why: "Misleading cost advice breaches integrity and client care." },
    { text: "Refuse all cost planning forever", why: "Ethical path is realistic transparent advice." },
    { text: "Hide assumptions in footnote only", why: "Material assumptions must be clear to client." }
    ],
    "Cost advice must not mislead funders; assumptions and risks must be transparent.",
    "hard",
    rot(28)
  ),
  makeQ(
    "Team leadership mandatory competency Level 1 for assistant QS includes:",
    "Supporting team delivery, seeking guidance, and contributing reliably to shared outputs",
    [
    { text: "Refusing all collaboration", why: "Teamwork is part of professional delivery." },
    { text: "Taking credit for all seniors' work", why: "Honest attribution is part of integrity." },
    { text: "Ignoring firm quality procedures", why: "Team delivery follows firm QA processes." }
    ],
    "Team leadership Level 1 is reliable collaborative contribution within teams.",
    "easy",
    rot(29)
  ),
  makeQ(
    "Business planning mandatory Level 1 for employed QS means:",
    "Understanding how your work contributes to departmental and firm objectives",
    [
    { text: "Writing firm's five-year M&A strategy alone as graduate", why: "Level 1 is awareness of business context, not sole strategic ownership." },
    { text: "Ignoring commercial context of assignments", why: "Business planning awareness includes understanding firm objectives." },
    { text: "Only focusing on billable hours fraudulently inflated", why: "Fraudulent time recording breaches conduct rules." }
    ],
    "Business planning Level 1 is awareness of how role supports firm goals.",
    "easy",
    rot(30)
  ),
  makeQ(
    "Confidential employer budget data on laptop left on train. Immediate action?",
    "Report breach per firm GDPR/security policy; notify client if required; mitigate harm",
    [
    { text: "Hope no one finds it", why: "Data breaches require immediate reporting and mitigation." },
    { text: "Blame client for giving data", why: "QS firm holds data protection responsibilities." },
    { text: "Post budget on LinkedIn for transparency", why: "Public disclosure worsens breach." }
    ],
    "Data breaches require immediate policy-compliant reporting and mitigation.",
    "hard",
    rot(31)
  ),
  makeQ(
    "Facilities management optional competency link to QS is:",
    "Understanding how construction decisions affect operational costs and asset performance",
    [
    { text: "Irrelevant to all QS roles", why: "FM optional connects built asset cost to operations." },
    { text: "Only cleaning schedules", why: "FM optional is broader operational asset management." },
    { text: "Replacing cost plan with FM invoice only", why: "QS advice spans capital/operational interface." }
    ],
    "FM optional links construction cost decisions to lifecycle operational outcomes.",
    "medium",
    rot(32)
  ),
  makeQ(
    "RICS disciplinary matter for dishonest measurement could result in:",
    "Sanctions up to expulsion from RICS and reputational damage",
    [
    { text: "Automatic promotion", why: "Misconduct leads to sanctions, not reward." },
    { text: "No consequences ever", why: "RICS enforces conduct through disciplinary process." },
    { text: "Mandatory APC pass", why: "Disciplinary outcomes are separate from assessment success." }
    ],
    "RICS enforces conduct rules through disciplinary sanctions including expulsion.",
    "medium",
    rot(33)
  ),
  makeQ(
    "Inclusive communication with neurodiverse client stakeholder means:",
    "Clear written summaries, defined acronyms, and check understanding respectfully",
    [
    { text: "Refuse to meet neurodiverse clients", why: "Inclusive practice adapts communication, not exclusion." },
    { text: "Use maximum technical jargon to impress", why: "Clear accessible communication supports inclusion." },
    { text: "Record meetings without consent", why: "Recording requires consent and policy compliance." }
    ],
    "Inclusive communication adapts format and clarity to audience needs.",
    "medium",
    rot(34)
  ),
  makeQ(
    "Anti-money laundering client due diligence for new developer client requires:",
    "Identity verification and risk-based source-of-funds checks per MLR regulations",
    [
    { text: "No checks for friendly referrals", why: "AML checks apply regardless of referral source." },
    { text: "Accept cash payments without questions", why: "AML requires source of funds scrutiny where applicable." },
    { text: "Delegate entirely to client self-certify without verification", why: "Firms must perform regulated AML checks." }
    ],
    "AML regulations require identity and risk-based due diligence on clients.",
    "hard",
    rot(35)
  ),
  makeQ(
    "Level 2 optional Contract administration evidence example:",
    "Issuing compliant payment notices and tracking compensation events under NEC on live project",
    [
    { text: "Never attending contract meetings", why: "Administration requires active contract process management." },
    { text: "Only reading contracts without application", why: "Level 2 needs applied examples." },
    { text: "Altering signed contract unilaterally", why: "Contract changes require proper variation procedure." }
    ],
    "Contract administration optional is evidenced through live contract process tasks.",
    "medium",
    rot(36)
  ),
  makeQ(
    "Professional scepticism when reviewing contractor claim means:",
    "Test substantiation against contract and records before certifying",
    [
    { text: "Approve all claims to avoid conflict", why: "Scepticism protects client and professional integrity." },
    { text: "Reject all claims automatically", why: "Valid substantiated claims must be paid." },
    { text: "Certify based on friendship", why: "Certification must be evidence-based." }
    ],
    "Professional scepticism balances fair evaluation of substantiated claims.",
    "medium",
    rot(37)
  ),
  makeQ(
    "RICS global professional statement on ethics requires members to:",
    "Act honourably, avoid conflicts, and uphold public trust in the profession",
    [
    { text: "Pursue fee income above all else", why: "Public trust and integrity supersede commercial gain." },
    { text: "Discriminate when profitable", why: "Ethics prohibits discriminatory conduct." },
    { text: "Hide mistakes permanently", why: "Integrity requires acknowledging and correcting errors." }
    ],
    "RICS ethics framework prioritises public trust, integrity, and conflict avoidance.",
    "easy",
    rot(38)
  ),
  makeQ(
    "Research analysis and problem solving mandatory Level 2 means:",
    "Structured analysis of complex cost problems with evidence-based recommendations",
    [
    { text: "Guessing solutions without data", why: "Level 2 requires structured analytical approach." },
    { text: "Copying answers from internet without verification", why: "Professional analysis verifies sources and logic." },
    { text: "Avoiding difficult problems entirely", why: "Competency is demonstrated by tackling complex problems." }
    ],
    "Research and problem solving Level 2 uses structured evidence-based analysis.",
    "medium",
    rot(39)
  ),
  makeQ(
    "When optional competency overlaps core competency evidence, APC guidance says:",
    "Use distinct examples or clearly separate aspects to avoid double-counting same example",
    [
    { text: "Submit identical paragraph for all competencies", why: "Assessors require distinct evidence per competency." },
    { text: "Ignore optional competencies entirely", why: "Optionals are mandatory pathway requirements." },
    { text: "Fabricate extra projects", why: "Evidence must be truthful." }
    ],
    "Distinct evidence prevents double-counting across core and optional competencies.",
    "medium",
    rot(40)
  ),
  makeQ(
    "Client requests QS to pressure subcontractor for unlawful payment deduction. Response?",
    "Refuse; advise on lawful set-off and contract remedies only",
    [
    { text: "Threaten subcontractor illegally", why: "Unlawful pressure breaches conduct and law." },
    { text: "Deduct without notice or contract right", why: "Set-off requires contractual/legal basis." },
    { text: "Accept kickback for compliance", why: "Bribery and coercion are prohibited." }
    ],
    "QS must refuse unlawful payment practices and advise on lawful remedies.",
    "hard",
    rot(41)
  ),
  makeQ(
    "Continuing professional development for ethics should include:",
    "RICS ethics modules, case studies, and firm policy updates on conduct and AML",
    [
    { text: "Only technical measurement with no ethics content", why: "Ethics CPD is required component of professional development." },
    { text: "Falsified attendance certificates", why: "CPD falsification is misconduct." },
    { text: "No CPD because already chartered eventually", why: "CPD continues throughout career pre and post chartership." }
    ],
    "Ethics CPD includes RICS modules and firm conduct policy training.",
    "easy",
    rot(42)
  ),
  makeQ(
    "Programming optional — delay analysis interface with QS means:",
    "Quantifying prolongation costs linked to programme slippage and causation",
    [
    { text: "Ignoring time impact of variations", why: "Delay analysis connects time and cost claims." },
    { text: "Only drawing bar charts without cost link", why: "QS programming optional links schedule to cost consequences." },
    { text: "Automatic 10% claim for any rain", why: "Prolongation requires causation and substantiation." }
    ],
    "Programming optional for QS includes prolongation cost linkage to programme.",
    "hard",
    rot(43)
  ),
  makeQ(
    "Acting as expert witness in quantum dispute requires:",
    "Independent objective opinion within area of expertise, documented and defensible",
    [
    { text: "Advocating client's position regardless of facts", why: "Expert duty is to the tribunal/court, not partisan advocacy." },
    { text: "Withholding adverse data", why: "Experts must be objective and complete." },
    { text: "Accepting instructions to mislead", why: "Misleading expert evidence is serious misconduct." }
    ],
    "Expert witnesses owe independent objective duty with defensible opinions.",
    "hard",
    rot(44)
  ),
  makeQ(
    "Mandatory competency Legal/regulatory compliance Level 2 for QS includes:",
    "Applying CDM, construction act payment rules, and relevant contract law basics in advice",
    [
    { text: "Practising as solicitor without qualification", why: "QS applies relevant law; complex matters refer to lawyers." },
    { text: "Ignoring HGCRA payment requirements", why: "Payment legislation is core compliance knowledge." },
    { text: "Breaching GDPR to share client data", why: "Data protection is legal compliance requirement." }
    ],
    "Legal/regulatory Level 2 is applying relevant construction law in QS practice.",
    "medium",
    rot(45)
  ),
  makeQ(
    "Social value in procurement advice from QS might include:",
    "Costing community employment targets, local spend, and SME participation in tender evaluation",
    [
    { text: "Ignoring client ESG policies", why: "Social value increasingly forms procurement criteria." },
    { text: "Treating social value as free text only", why: "Social value can be weighted and costed in evaluation." },
    { text: "Guaranteeing social outcomes without contract mechanism", why: "Advice should align social value with enforceable mechanisms." }
    ],
    "QS can support social value evaluation integration in procurement.",
    "medium",
    rot(46)
  ),
  makeQ(
    "Final assessment interview starts at Level 3 and may probe down to Level 1. Preparation requires:",
    "Deep Level 3 examples ready with underpinning Level 1-2 knowledge for follow-up questions",
    [
    { text: "Only Level 1 definitions memorised", why: "Interview starts at Level 3 competency depth." },
    { text: "Refusing Level 1 questions as beneath you", why: "Assessors probe down when Level 3 answers are weak." },
    { text: "No preparation because interview is informal chat", why: "Final assessment is formal competency examination." }
    ],
    "Interview probes Level 3 first with potential descent to Level 1 knowledge checks.",
    "medium",
    rot(47)
  ),
  makeQ(
    "Managing director asks to hide subcontractor insolvency from public sector client. Ethics?",
    "Disclose material risk to client promptly; confidentiality does not cover concealing material project risk",
    [
    { text: "Conceal to protect firm share price only", why: "Material project risks must be disclosed to client." },
    { text: "Blame client for choosing subcontractor", why: "Professional duty is transparent risk communication." },
    { text: "Fabricate alternative subcontractor name", why: "Falsification is serious misconduct." }
    ],
    "Material delivery risks like insolvency must be disclosed to the client.",
    "hard",
    rot(48)
  ),
  makeQ(
    "Optional competency Taxation allowances and reliefs at Level 2 might support:",
    "Client decisions on land remediation relief, capital allowances, or VAT treatment with specialist input",
    [
    { text: "Evading tax illegally", why: "Competency covers lawful reliefs, not evasion." },
    { text: "Replacing qualified tax advisers on all matters", why: "QS supports with specialist tax advice where needed." },
    { text: "Ignoring VAT on international supplies", why: "VAT treatment is relevant commercial consideration." }
    ],
    "Taxation optional supports lawful reliefs with appropriate specialist collaboration.",
    "hard",
    rot(49)
  ),
];
