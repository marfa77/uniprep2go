import { makeQ, rot } from "./makeQ.mjs";

export const mandatoryCompetencies = [
  makeQ(
    "A retail landlord asks you to confirm a tenant fit-out completes two weeks before Christmas trading. You lack the contractor programme. What is the most professional response?",
    "Explain the information gap, confirm what you can verify now, and agree a realistic update once the programme arrives",
    [
    { text: "Assure the client the date is achievable to maintain goodwill", why: "Confirming dates without evidence breaches client care." },
    { text: "Decline all comment until every drawing is approved", why: "Silence is unhelpful; transparent communication about knowns and unknowns is required." },
    { text: "Tell the client to instruct the contractor directly and withdraw", why: "Abandoning coordination without cause fails the duty to act in the client's interests." },
    ],
    "Client care combines honesty about uncertainty with proactive information gathering.",
    "medium",
    rot(0)
  ),
  makeQ(
    "During a meeting the facilities manager repeatedly interrupts your cost report. How should you communicate effectively?",
    "Acknowledge concerns, propose a separate slot for operations, and refocus on the agreed agenda",
    [
    { text: "Continue presenting over interruptions to finish on time", why: "Ignoring the client damages rapport." },
    { text: "End the meeting and send the report in writing only", why: "Walking away without a structured alternative avoids resolving barriers." },
    { text: "Ask the contractor to answer operational questions for you", why: "You remain accountable for client communication." },
    ],
    "Professional communication balances agenda discipline with empathy.",
    "easy",
    rot(1)
  ),
  makeQ(
    "You find a missing site induction record for a subcontractor operative near your inspection area. What is your first H&S action?",
    "Stop access until the site manager confirms valid induction and controls are in place",
    [
    { text: "Proceed but walk faster through the area", why: "Speed does not substitute for verified induction." },
    { text: "Report the gap only in your final report after leaving", why: "Immediate risk requires immediate action." },
    { text: "Ask the operative to sign a disclaimer before continuing", why: "Disclaimers do not discharge H&S duties." },
    ],
    "Do not expose yourself or others to unmanaged site risk.",
    "easy",
    rot(2)
  ),
  makeQ(
    "Your CPD record shows webinar attendance but limited reflection on application. What best strengthens your APC profile?",
    "Document learning outcomes and how you applied them on a recent instruction",
    [
    { text: "Duplicate last year's entries with updated dates", why: "Misrepresenting CPD is a conduct issue." },
    { text: "Collect certificates without linking to competency growth", why: "RICS expects reflective CPD tied to practice." },
    { text: "Wait until after final assessment to update CPD", why: "CPD must be maintained throughout training." },
    ],
    "Effective CPD combines learning, reflection, and evidenced application.",
    "medium",
    rot(3)
  ),
  makeQ(
    "A junior surveyor submits a draft with inconsistent units and missing citations. What teamwork approach is best?",
    "Review together, explain expected standards, and agree corrections with a future checklist",
    [
    { text: "Rewrite silently and issue under your name only", why: "This removes learning and misrepresents authorship." },
    { text: "Return with a generic not-good-enough email", why: "Non-specific criticism fails to develop competence." },
    { text: "Escalate to HR immediately for first-instance gaps", why: "Coaching should precede formal escalation." },
    ],
    "Team leadership combines QA with constructive coaching.",
    "easy",
    rot(4)
  ),
  makeQ(
    "Two directors disagree publicly about a refurbishment. Both ask for your cost advice. What should you do?",
    "Present factual cost options neutrally and recommend objective alignment before refined advice",
    [
    { text: "Side with the louder director to keep momentum", why: "Perceived bias undermines independence." },
    { text: "Refuse to speak until they resolve privately", why: "You can provide objective facts while flagging need for unified brief." },
    { text: "Provide optimistic costs to the director favouring proceed", why: "Selective advice to please one party is unethical." },
    ],
    "Conflict management requires neutrality and alignment on objectives.",
    "medium",
    rot(5)
  ),
  makeQ(
    "You must price a four-month monitoring role with unclear visit frequency. Which business skill is most appropriate?",
    "Define scope assumptions, risk allowances, and tiered fee options linked to visit regimes",
    [
    { text: "Match the lowest competitor quote to win work", why: "Under-pricing without scope clarity creates dispute risk." },
    { text: "Submit one fixed fee with no documented assumptions", why: "Undocumented assumptions expose the firm to scope creep." },
    { text: "Decline because the brief is incomplete", why: "Commercial acumen includes helping structure scope." },
    ],
    "Business skills include scoping, risk pricing, and transparent proposals.",
    "hard",
    rot(6)
  ),
  makeQ(
    "A leaseholder calls upset about service charge increases in your report. They are not your instructing client. What do you do?",
    "Explain your duty to the client, summarise published information politely, and signpost consultation routes",
    [
    { text: "Share confidential management accounts to calm them", why: "Disclosing client information to third parties breaches confidentiality." },
    { text: "Ignore the call because they did not instruct you", why: "Courtesy and signposting are expected." },
    { text: "Criticise the landlord to sympathise with the caller", why: "Undermining your client to third parties is unprofessional." },
    ],
    "Client care coexists with respectful stakeholder engagement within ethical limits.",
    "medium",
    rot(7)
  ),
  makeQ(
    "You must present complex quantum evidence to a non-technical board. Which communication method is most effective?",
    "A one-page summary with visual timeline, key drivers, and explicit recommendations",
    [
    { text: "Read the full 40-page appendix verbatim", why: "Information overload reduces comprehension." },
    { text: "Avoid numbers and speak only in generalities", why: "Boards need sufficient quantified detail." },
    { text: "Let the lawyer interpret your report without you present", why: "You remain responsible for ensuring advice is understood." },
    ],
    "Tailored communication for the audience improves decision-making.",
    "easy",
    rot(8)
  ),
  makeQ(
    "On site you notice water pooling near temporary electrics. The contractor says it is under control. What do you do?",
    "Report the hazard and do not enter the affected area until remedied",
    [
    { text: "Step over the pool quickly to finish measuring", why: "Entering a known hazard breaches H&S duty." },
    { text: "Photograph only and mention casually at end of day", why: "Immediate hazards require prompt escalation." },
    { text: "Assume the contractor's assurance removes your responsibility", why: "You must take reasonable steps regardless of assurances." },
    ],
    "H&S requires immediate escalation of observed risks.",
    "easy",
    rot(9)
  ),
  makeQ(
    "You attend a RICS branch event on digital surveying. Which CPD entry best meets APC expectations?",
    "Two hours structured learning with three techniques you will trial on your next instruction",
    [
    { text: "Log eight hours because travel and networking count as technical CPD", why: "CPD hours must reflect verifiable learning, not travel alone." },
    { text: "Skip logging because it was outside working hours", why: "Relevant out-of-hours development still counts when recorded and reflected." },
    { text: "Record attendance without describing pathway relevance", why: "CPD should map to competency development." },
    ],
    "Structured, reflected CPD linked to pathway competencies strengthens the APC record.",
    "medium",
    rot(10)
  ),
  makeQ(
    "Your multidisciplinary team architect keeps missing cost review deadlines. What teamwork action is best?",
    "Agree a shared milestone plan with clear inputs, owners, and a coordination call before submission",
    [
    { text: "Bypass the architect and guess design allowances", why: "Unilateral assumptions undermine accuracy and accountability." },
    { text: "Complain to the client about the architect without internal resolution", why: "External blame before internal coordination damages relationships." },
    { text: "Submit late without explanation to protect your reputation", why: "Team delivery accountability applies even when others cause delay." },
    ],
    "Effective teamwork uses shared planning and early escalation.",
    "medium",
    rot(11)
  ),
  makeQ(
    "A contractor offers rugby tickets after you recommended their tender on a public sector job. What is correct?",
    "Decline and check gifts policy and any client restrictions",
    [
    { text: "Accept because the recommendation was independent", why: "Hospitality can create perceived bias even after decisions." },
    { text: "Accept if you pay face value later without disclosure", why: "Undisclosed benefits still risk conflicts of interest." },
    { text: "Ignore the offer and take no further action", why: "Potential conduct issues should be addressed via policy." },
    ],
    "Mandatory competencies include ethical awareness of gifts and hospitality.",
    "easy",
    rot(12)
  ),
  makeQ(
    "Your supervisor asks you to inflate a contingency so the client feels safer without disclosure. How do you respond?",
    "Explain contingencies must be evidence-based and transparently disclosed with rationale",
    [
    { text: "Comply because the client will never read the backup", why: "Misleading advice violates ethics regardless of perceived benefit." },
    { text: "Add the contingency silently in a lump sum line", why: "Concealing assumptions is dishonest." },
    { text: "Refuse and immediately report the supervisor to the client", why: "First attempt professional challenge and firm policy routes." },
    ],
    "Integrity requires transparent, reasoned contingencies.",
    "hard",
    rot(13)
  ),
  makeQ(
    "You lead a site visit for two APC candidates on a joint industry project. What demonstrates teamwork leadership?",
    "Set roles, ensure both contribute to notes, and debrief learning points equally",
    [
    { text: "Take all notes yourself to guarantee quality", why: "Monopolising tasks limits others development." },
    { text: "Let the other candidate lead entirely to avoid conflict", why: "Leadership includes constructive shared ownership." },
    { text: "Focus only on your firm objectives during the visit", why: "Collaborative projects require balanced objectives." },
    ],
    "Teamwork includes facilitating others contribution while maintaining quality.",
    "medium",
    rot(14)
  ),
  makeQ(
    "A client insists you use their preferred supplier cost data despite better market data. What balances care and integrity?",
    "Use client data as instructed but document assumptions, sensitivities, and market variance clearly",
    [
    { text: "Secretly substitute market rates without telling the client", why: "Changing inputs without agreement breaches transparency." },
    { text: "Refuse unless the client accepts your preferred data", why: "Rigid refusal without explanation fails client care." },
    { text: "Use client data and remove all caveats to simplify", why: "Removing caveats hides material limitations." },
    ],
    "Respect instructions while clearly reporting limitations and impacts.",
    "hard",
    rot(15)
  ),
  makeQ(
    "You discover a calculation error in an issued report material to the client budget threshold. What should you do?",
    "Notify the client promptly, issue a corrected report, and explain impact and preventive steps",
    [
    { text: "Wait to see if the client notices before correcting", why: "Withholding known errors breaches trust." },
    { text: "Correct only the internal file for future use", why: "Issued advice must be corrected when material." },
    { text: "Blame the software and avoid detailing the change", why: "Accountability and clarity are required when correcting advice." },
    ],
    "Client care demands prompt correction and transparency.",
    "medium",
    rot(16)
  ),
  makeQ(
    "Which action best demonstrates proactive H&S on due diligence of an occupied warehouse?",
    "Review RAMS, confirm escort and PPE requirements, and brief your team before entry",
    [
    { text: "Rely on surveyor instinct developed over years", why: "Experience does not replace site-specific safety planning." },
    { text: "Sign in at reception and begin measuring independently", why: "Independent access may breach site rules." },
    { text: "Skip RAMS if the visit is short and daytime", why: "Duration does not remove duty to understand controls." },
    ],
    "H&S competence includes pre-visit planning and team briefing.",
    "easy",
    rot(17)
  ),
  makeQ(
    "Your CPD gap is commercial awareness. Which activity is most targeted?",
    "Structured learning on developer appraisal metrics plus applying them on a live feasibility",
    [
    { text: "General time management course unrelated to practice", why: "CPD should close identified competency gaps." },
    { text: "Reading news headlines without recording reflection", why: "Passive reading without reflection weakens CPD evidence." },
    { text: "Repeat last years ethics module only", why: "Unrelated ethics CPD does not address the commercial gap." },
    ],
    "CPD planning should target assessed gaps with applied learning.",
    "medium",
    rot(18)
  ),
  makeQ(
    "Engineer and architect dispute cladding specification responsibility. Client asks you to pick a side. What conflict step fits?",
    "Facilitate an options table showing cost, programme, and risk impacts without assigning blame",
    [
    { text: "Support the architect because they lead design coordination", why: "Unilateral alignment without analysis fails independent input." },
    { text: "Withdraw from the workshop to avoid conflict", why: "Avoidance leaves the client without coordinated advice." },
    { text: "Tell the client the gap is irrelevant to cost", why: "Specification gaps often have significant cost implications." },
    ],
    "Constructive conflict management focuses on options and impacts.",
    "hard",
    rot(19)
  ),
  makeQ(
    "During APC development, commercial awareness gap identified at mid-year review. What is the most professional response?",
    "Structured learning on developer appraisal plus live feasibility application",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to cpd plan alignment.",
    "medium",
    rot(20)
  ),
  makeQ(
    "During APC development, two senior colleagues disagree on methodology in an APC workshop. What is the most professional response?",
    "Restate objectives, compare methodologies, and seek agreed way forward or client steer",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to workshop dispute.",
    "medium",
    rot(21)
  ),
  makeQ(
    "During APC development, client board says your report language is too legalistic. What is the most professional response?",
    "Revise with plain English summaries while retaining technical appendices for specialists",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to report language complaint.",
    "easy",
    rot(22)
  ),
  makeQ(
    "During APC development, your CPD is ethics-heavy but light on business development. What is the most professional response?",
    "Plan next quarter CPD on fee bidding, risk, and client relationships with reflection",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to cpd balance.",
    "medium",
    rot(23)
  ),
  makeQ(
    "During APC development, client instructs you Sunday evening expecting Monday 8am response. What is the most professional response?",
    "Acknowledge receipt, confirm realistic delivery time, and refer to out-of-hours protocol",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to sunday evening email.",
    "medium",
    rot(24)
  ),
  makeQ(
    "During APC development, joint venture partners use incompatible data standards slowing coordination. What is the most professional response?",
    "Agree minimum data standard, shared issue log, and fortnightly integration checkpoint",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to jv data standards.",
    "easy",
    rot(25)
  ),
  makeQ(
    "During APC development, a vulnerable client appears confused about next steps after your report. What is the most professional response?",
    "Offer a follow-up call to walk through recommendations and confirm understanding",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to vulnerable client.",
    "medium",
    rot(26)
  ),
  makeQ(
    "During APC development, you must demonstrate business awareness on a loss-making APC project. What is the most professional response?",
    "Analyse root causes, propose lessons learned, and update future fee and risk assumptions",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to loss-making project.",
    "medium",
    rot(27)
  ),
  makeQ(
    "During APC development, you witness a tower crane near miss and site team dismisses reporting. What is the most professional response?",
    "Insist on formal near-miss reporting and confirm corrective actions before continuing nearby",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to near miss crane.",
    "easy",
    rot(28)
  ),
  makeQ(
    "During APC development, supervisor suggests exaggerating your role in a team submission. What is the most professional response?",
    "Present accurate personal contribution with reflective evidence and decline misrepresentation",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to apc case study honesty.",
    "medium",
    rot(29)
  ),
  makeQ(
    "During APC development, long-standing client requests free graduate mentoring outside contract. What is the most professional response?",
    "Agree limited mentoring if conflict-free or propose a formal mentoring addendum with scope",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to free mentoring request.",
    "medium",
    rot(30)
  ),
  makeQ(
    "During APC development, client asks to cap liability at £1 regardless of negligence during fee negotiation. What is the most professional response?",
    "Explain PI constraints, refer to firm policy, and propose proportionate cap alternatives if permitted",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to fee negotiation liability cap.",
    "easy",
    rot(31)
  ),
  makeQ(
    "During APC development, colleague is visibly unwell on a site with steep stairs. What is the most professional response?",
    "Check they are fit to continue, suggest rest or substitution, and inform the site supervisor if needed",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to unwell colleague on site.",
    "medium",
    rot(32)
  ),
  makeQ(
    "During APC development, client wants daily WhatsApp voice notes instead of formal reports. What is the most professional response?",
    "Agree a protocol: voice notes for updates plus written confirmation of decisions and key figures",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to whatsapp updates.",
    "medium",
    rot(33)
  ),
  makeQ(
    "During APC development, prospective client asks for free detailed advice on a live dispute at a networking event. What is the most professional response?",
    "Offer a high-level overview and propose a formal conflict-checked appointment for detailed advice",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to networking free advice.",
    "easy",
    rot(34)
  ),
  makeQ(
    "During APC development, two team members misread each other's email tone as rude. What is the most professional response?",
    "Facilitate a short call to clarify intent, agree communication norms, and reset task deadlines",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to cultural email tone.",
    "medium",
    rot(35)
  ),
  makeQ(
    "During APC development, you complete mandatory fire warden training on a long-term client site. What is the most professional response?",
    "Log as H&S-related CPD with site-specific learning and how it supports safe delivery",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to fire warden training.",
    "medium",
    rot(36)
  ),
  makeQ(
    "During APC development, client asks you to backdate a valuation date before you inspected. What is the most professional response?",
    "Refuse and explain opinions must reflect knowledge at stated dates with disclosed inspection timing",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to backdated valuation.",
    "easy",
    rot(37)
  ),
  makeQ(
    "During APC development, your team uses AI drafting for meeting minutes. What is the most professional response?",
    "Require human review for accuracy, confidentiality, and tone before client release",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to ai meeting minutes.",
    "medium",
    rot(38)
  ),
  makeQ(
    "During APC development, client PM demands you exclude a known asbestos allowance from the cost plan. What is the most professional response?",
    "Retain the allowance or clearly scenario-plan removal with risk disclosure to the client",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to asbestos allowance pressure.",
    "medium",
    rot(39)
  ),
  makeQ(
    "During APC development, utilisation targets pressure you to skip a client debrief after handover. What is the most professional response?",
    "Complete a proportionate debrief capturing lessons and client satisfaction unless formally scoped out",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to utilisation vs debrief.",
    "easy",
    rot(40)
  ),
  makeQ(
    "During APC development, trainee sends an overly informal client email draft missing assumptions. What is the most professional response?",
    "Mark two priority edits, explain tone expectations, and ask the trainee to redraft before sending",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to trainee email coaching.",
    "medium",
    rot(41)
  ),
  makeQ(
    "During APC development, manager proposes reducing site visit frequency to improve fee margin. What is the most professional response?",
    "Model fee impact against reduced oversight risk, programme drift, and contractual compliance",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to visit frequency margin.",
    "medium",
    rot(42)
  ),
  makeQ(
    "During APC development, elderly occupier asks you to stop neighbouring works during your inspection. What is the most professional response?",
    "Explain your role limits, document the complaint for the client, and signpost statutory nuisance routes if relevant",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to elderly occupier noise.",
    "easy",
    rot(43)
  ),
  makeQ(
    "During APC development, Manchester and London teams deliver one integrated instruction. What is the most professional response?",
    "Maintain a shared action log showing owners, deadlines, and handover notes between offices",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to multi-office teamwork.",
    "medium",
    rot(44)
  ),
  makeQ(
    "During APC development, you present CPD achievements at an internal APC progress review. What is the most professional response?",
    "Map three CPD activities to specific competency levels with workplace examples",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to cpd progress presentation.",
    "medium",
    rot(45)
  ),
  makeQ(
    "During APC development, client director sends aggressive emails blaming your team for a programme slip. What is the most professional response?",
    "Reply factually with timeline evidence, propose a recovery meeting, and avoid emotive language",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to aggressive client emails.",
    "easy",
    rot(46)
  ),
  makeQ(
    "During APC development, feedback says your presentations lack an executive summary. What is the most professional response?",
    "Take a structured communication module and apply a one-page summary template on the next client deck",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to executive summary feedback.",
    "medium",
    rot(47)
  ),
  makeQ(
    "During APC development, subcontractor refuses to wear hi-vis while escorting you on site. What is the most professional response?",
    "Do not proceed with the escorted visit until site management enforces mandatory PPE rules",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to hi-vis refusal.",
    "medium",
    rot(48)
  ),
  makeQ(
    "During APC development, fee margin pressure conflicts with meaningful project close-out. What is the most professional response?",
    "Complete a proportionate debrief unless formally scoped out, balancing utilisation and client care",
    [
    { text: "Ignore the issue and proceed without documentation or client communication", why: "Failing to address material issues breaches professional standards." },
    { text: "Defer all action until after final assessment without explanation", why: "Deferral without transparent communication is rarely appropriate." },
    { text: "Escalate publicly on social media to force immediate action", why: "Public disclosure may breach confidentiality and bypass proper channels." },
    ],
    "Professional response requires structured action aligned to client debrief commercial.",
    "easy",
    rot(49)
  ),
];

