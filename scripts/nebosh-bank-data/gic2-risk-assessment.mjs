import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "The first step in the five-step risk assessment process is:",
    "Identify the hazards associated with the activity or workplace",
    ["Select PPE colours before knowing hazards", "Write the method statement only", "Purchase insurance as hazard identification"],
    "Step 1 is hazard identification — what could cause harm — before evaluating who might be harmed and existing controls.",
    { b: "PPE selection comes after assessing risks and hierarchy.", c: "Method statements may follow but do not replace hazard ID.", d: "Insurance is not hazard identification." },
    "easy",
    rot(0)
  ),
  q(
    "A risk assessment is 'suitable and sufficient' when it:",
    "Identifies significant risks, considers those affected, and outlines adequate controls for the activity",
    ["Is one generic paragraph for the entire multinational group forever", "Ignores non-routine maintenance tasks", "Exists only as an unsigned draft in a drawer"],
    "Suitable and sufficient means proportionate, task-specific where needed, and actionable for significant risks.",
    { a: "Generic eternal documents fail task-specific changes.", c: "Non-routine work must be covered.", d: "Draft unsigned assessments lack communication value." },
    "medium",
    rot(1)
  ),
  q(
    "At the top of the hierarchy of control is:",
    "Elimination of the hazard",
    ["PPE as the default first choice", "Administrative paperwork only", "Transferring all duty to workers without engineering"],
    "Elimination removes risk at source; PPE is last resort after elimination, substitution, engineering, admin, and training.",
    { b: "PPE is lowest in hierarchy.", c: "Paperwork alone is weak control.", d: "Employers retain duties; hierarchy still applies." },
    "easy",
    rot(2)
  ),
  q(
    "A risk matrix combining likelihood and severity helps to:",
    "Prioritise controls for higher-rated risks and communicate residual risk",
    ["Eliminate the need for any controls for low scores only", "Replace legal duties when score is green", "Guarantee zero accidents if coloured red"],
    "Matrices support prioritisation and resource allocation; they do not replace control implementation or legal duties.",
    { a: "Low scores still need proportionate control.", c: "Legal duties remain regardless of matrix colour.", d: "Red rating indicates priority, not automatic zero harm." },
    "medium",
    rot(3)
  ),
  q(
    "When assessing risk for a 16-year-old apprentice, the employer must consider:",
    "Inexperience, maturity, training needs, and prohibited high-risk tasks for young persons",
    ["Identical treatment to a 20-year expert with no extra controls", "Exemption from all induction", "Ability to operate any machinery unsupervised immediately"],
    "Young persons need tailored assessment — legal restrictions and supervision for certain hazardous work.",
    { a: "Age and experience require additional factors.", c: "Induction is essential.", d: "Supervision and legal prohibitions apply." },
    "medium",
    rot(4)
  ),
  q(
    "A risk assessment should be reviewed when:",
    "There is reason to suspect it is no longer valid or after significant change, incident, or near miss",
    ["Never — once written it is permanent", "Only when the document font is outdated", "Every day regardless of any change"],
    "Review triggers include new processes, equipment, legislation, accidents, and complaints — not arbitrary daily rewrite.",
    { a: "Assessments age; context changes require review.", c: "Font changes are irrelevant.", d: "Review is trigger-based, not meaningless daily churn." },
    "easy",
    rot(5)
  ),
  q(
    "In GIC2 practical assessment, observing poor housekeeping during a workplace inspection should lead the candidate to:",
    "Record the finding, discuss significance, and recommend corrective actions linked to risk",
    ["Ignore it because it is not a 'major' hazard only", "Delete notes to avoid offending management", "Recommend punishment only without control suggestions"],
    "GIC2 expects structured identification, evaluation, and proportionate recommendations with clear communication.",
    { a: "Housekeeping links to STF and fire risk — significant.", c: "Hiding findings fails assessment and good practice.", d: "Recommendations should focus on controls, not blame alone." },
    "medium",
    rot(6)
  ),
  q(
    "Step 3 of five-step assessment — evaluate risks — means:",
    "Estimate likelihood and severity of harm from each hazard considering existing controls",
    ["Buy PPE immediately without analysis", "Skip evaluation if workers seem happy", "Transfer document to insurer only"],
    "Evaluation judges risk level before deciding if further controls are needed.",
    { a: "PPE without evaluation may target wrong hazards.", c: "Happiness is not a formal risk metric alone.", d: "Insurer receipt does not evaluate risk." },
    "easy",
    rot(7)
  ),
  q(
    "Substitution in hierarchy of control example:",
    "Replacing a toxic solvent with a less harmful water-based alternative",
    ["Adding more toxic solvent because it dries faster", "Issuing gloves while keeping the same carcinogen without review", "Posting a sign saying 'be careful'"],
    "Substitution reduces inherent danger of materials or processes when elimination is not possible.",
    { a: "More toxic choice contradicts substitution.", c: "PPE with same carcinogen is lower hierarchy.", d: "Signs are administrative, not substitution." },
    "easy",
    rot(8)
  ),
  q(
    "A pregnant worker's individual risk assessment should be:",
    "Completed with medical input as needed, reviewed as pregnancy progresses, and include manual handling, chemicals, and stress",
    ["Deferred until maternity leave begins", "Identical to all males without discussion", "Used to automatically terminate employment"],
    "Pregnancy assessments address changing capacity and legal protections; dialogue and review are required.",
    { a: "Assessment is during pregnancy, not only at leave.", c: "Gender-specific factors matter; not identical blindly.", d: "Automatic termination is discriminatory and unlawful." },
    "medium",
    rot(9)
  ),
  q(
    "Likelihood in a risk matrix might be scored higher when:",
    "The hazardous event occurs frequently or controls are consistently bypassed",
    ["Controls are well maintained and incidents are rare", "The task happens once in ten years with strong controls", "Workers are trained and supervised effectively"],
    "Likelihood rises with frequency, exposure duration, and weak control culture.",
    { b: "Strong rare-task controls lower likelihood.", c: "Rare controlled tasks score lower.", d: "Training and supervision reduce likelihood." },
    "medium",
    rot(10)
  ),
  q(
    "Recording significant findings of risk assessment means:",
    "Documenting hazards, who is at risk, controls, and priorities for significant risks",
    ["Shredding all notes to reduce GDPR risk incorrectly", "Recording only the office cat's name", "Keeping assessment secret from workers doing the task"],
    "Significant findings must be recorded and communicated to those affected.",
    { a: "GDPR does not require destroying safety records improperly.", c: "Irrelevant data is not significant findings.", d: "Workers need information from assessments." },
    "easy",
    rot(11)
  ),
  q(
    "Engineering control example for noise hazard is:",
    "Enclosing the machine or installing silencers to reduce emitted noise",
    ["Ear defenders only with no source reduction plan", "Telling workers to lip-read", "Increasing machine speed without enclosure"],
    "Engineering controls reduce hazard at source before administrative measures and PPE.",
    { a: "PPE alone is lower hierarchy.", c: "Lip-reading is not noise control.", d: "Higher speed may increase noise." },
    "medium",
    rot(12)
  ),
  q(
    "GIC2 candidate interviewing a worker about a near miss should:",
    "Ask open questions, listen without blame, and clarify task, hazards, and controls",
    ["Lead the witness to confirm management is blameless only", "Record only worker fault", "Refuse documentation to save time"],
    "Interview skills gather facts for assessment and recommendations — objective and respectful.",
    { a: "Leading questions bias findings.", c: "Blame-only focus misses system causes.", d: "Documentation is core to GIC2." },
    "hard",
    rot(13)
  ),
  q(
    "Severity rating in risk matrix for a fall from 6 m unprotected might be:",
    "High because potential outcome includes serious injury or fatality",
    ["Low because worker is experienced", "Zero because PPE vest is worn", "Medium only on Fridays"],
    "Severity considers credible worst-case harm independent of PPE that may not prevent injury.",
    { a: "Experience does not eliminate fall consequences.", c: "Hi-vis does not prevent fall injury.", d: "Day of week is irrelevant." },
    "medium",
    rot(14)
  ),
  q(
    "Administrative control example is:",
    "Job rotation, permit-to-work, and supervised access to hazardous area",
    ["Removing machine guard for easier access", "Ignoring permits to save time", "Relying on luck during night shift"],
    "Administrative controls manage exposure through procedures and supervision — below engineering in hierarchy.",
    { a: "Guard removal is not administrative control.", c: "Skipping permits increases risk.", d: "Luck is not a control." },
    "easy",
    rot(15)
  ),
  q(
    "After installing new LEV, the risk assessment for welding should be:",
    "Reviewed to reflect reduced inhalation risk and verify maintenance/examination arrangements",
    ["Destroyed because LEV solves everything permanently", "Unchanged from 1995", "Reviewed only after first fatality"],
    "Control changes trigger assessment review to ensure risks are now adequately controlled.",
    { a: "LEV needs maintenance; assessment documents residual risks.", c: "Stale assessments miss new controls.", d: "Reactive-only review is poor practice." },
    "medium",
    rot(16)
  ),
  q(
    "A generic office risk assessment is insufficient for:",
    "Warehouse forklift operations added at the same site without specific assessment",
    ["Desk-based DSE work covered with detail", "Display screen breaks policy in office area", "Manual handling of stationery between desks"],
    "Significant different activities need specific or appended assessments — warehouse trucks exceed generic office scope.",
    { b: "DSE can be covered in office assessment if detailed.", c: "Light office handling may be in scope if evaluated.", d: "Stationery moves are low risk if assessed." },
    "hard",
    rot(17)
  ),
  q(
    "Who should be involved in developing a task risk assessment?",
    "Workers doing the task, supervision, and health and safety expertise as needed",
    ["Only external marketing staff", "Insurance broker in isolation", "Competitors from another industry anonymously"],
    "Participation improves hazard recognition and buy-in; competence ensures adequacy.",
    { a: "Marketing lacks operational knowledge.", c: "Brokers advise cover, not task hazards.", d: "Competitors are not consultation stakeholders." },
    "easy",
    rot(18)
  ),
  q(
    "Residual risk after controls is:",
    "The remaining risk level assuming controls are implemented and effective",
    ["Zero always once PPE is issued", "Unmeasurable so ignore it", "Only the financial insurance excess"],
    "Assessments should acknowledge residual risk and whether it is ALARP or tolerable per policy.",
    { a: "PPE rarely reduces risk to zero.", c: "Residual risk is evaluated in matrix/tolerability.", d: "Insurance excess is financial, not safety residual." },
    "medium",
    rot(19)
  ),
  q(
    "GIC2 physical inspection of an evacuation route should check:",
    "Obstructions, door function, signage, lighting, and final exit security",
    ["Only carpet colour in unrelated office", "Whether workers enjoy the route aesthetically", "Coffee machine placement exclusively"],
    "Evacuation routes must be clear, signed, lit, and usable — common practical observation point.",
    { a: "Carpet colour is irrelevant.", c: "Aesthetics do not replace clearance.", d: "Coffee machines may obstruct routes if placed wrongly but inspection is holistic." },
    "easy",
    rot(20)
  ),
  q(
    "Prohibiting young persons from certain work reflects:",
    "Legal and risk-based recognition of vulnerability and prohibited hazardous activities",
    ["Discrimination without safety basis", "Preference for adult overtime only", "Elimination of training budgets"],
    "Age-based restrictions protect developing persons from high-risk exposures.",
    { a: "Restrictions are safety-based, lawful exemptions.", c: "Not about overtime preference.", d: "Training remains for permitted tasks." },
    "medium",
    rot(21)
  ),
  q(
    "Step 5 — record and implement — requires:",
    "Communicating controls, training, and putting identified measures into practice",
    ["Filing assessment without telling affected workers", "Implementation optional if manager is busy", "Recording only if regulator asks years later"],
    "Implementation and communication close the loop; unshared assessments fail duty.",
    { a: "Communication to affected workers is mandatory.", c: "Implementation is not optional.", d: "Proactive recording is expected." },
    "easy",
    rot(22)
  ),
  q(
    "Using a 5×5 risk matrix, a score of 20 typically indicates:",
    "High priority risk requiring urgent additional controls or task redesign",
    ["No action ever required", "Automatic legal prosecution", "Celebration of low risk"],
    "High scores drive priority action; interpretation depends on organisational matrix design.",
    { a: "High scores need action.", c: "Prosecution is enforcement outcome, not matrix cell meaning.", d: "Score 20 is high, not low." },
    "medium",
    rot(23)
  ),
  q(
    "Dynamic risk assessment is appropriate when:",
    "Conditions change rapidly on site and the worker must reassess before proceeding",
    ["Every task is identical daily with no change", "Written assessment exists and conditions unchanged", "Manager forbids any on-the-spot judgement"],
    "Dynamic assessment empowers STOP work when new hazards emerge — common in construction and emergency response.",
    { a: "Unchanging tasks use static assessment.", c: "Unchanged conditions rely on existing assessment.", d: "Judgement is required for dynamic RA." },
    "hard",
    rot(24)
  ),
  q(
    "PPE as last resort is illustrated by:",
    "Choosing gloves and goggles only after considering substitution and enclosure for a corrosive splash task",
    ["Selecting gloves before identifying the chemical", "Using PPE instead of guarding on a press", "Skipping all other controls because PPE is cheap"],
    "Hierarchy requires higher controls first; PPE supplements when residual risk remains.",
    { a: "Chemical identity informs PPE selection after broader controls.", c: "PPE cannot replace machine guarding.", d: "Cheap PPE does not justify skipping hierarchy." },
    "medium",
    rot(25)
  ),
  q(
    "A new employee with a disclosed disability requires:",
    "Individual assessment of reasonable adjustments without blanket exclusion from role",
    ["Automatic dismissal from all site work", "No conversation about task limitations", "Identical assumptions without medical/workplace dialogue"],
    "Equality and safety align: assess adjustments, do not stereotype or exclude without justification.",
    { a: "Blanket dismissal is discriminatory.", c: "Dialogue informs adjustments.", d: "Individual factors matter." },
    "medium",
    rot(26)
  ),
  q(
    "GIC2 report writing should:",
    "Present findings clearly, prioritise recommendations, and use evidence from inspection and interviews",
    ["Use vague language to avoid any management action", "Omit recommendations to stay neutral", "Copy unrelated assessment from internet"],
    "Reports demonstrate communication skill — clear hazards, risk evaluation, and actionable recommendations.",
    { a: "Vagueness fails GIC2 communication criteria.", c: "Recommendations are essential output.", d: "Plagiarism fails competence and accuracy." },
    "hard",
    rot(27)
  ),
  q(
    "Combining multiple low-severity risks at one workstation:",
    "May still require control if cumulative exposure or interaction creates significant combined risk",
    ["Is always insignificant without evaluation", "Eliminates need for any PPE ever", "Means only one line in assessment is enough without detail"],
    "Assessments consider combined and simultaneous exposures, not only isolated micro-risks.",
    { a: "Cumulative effects can be significant.", c: "Combined exposure may need controls.", d: "Detail proportionate to significance is required." },
    "hard",
    rot(28)
  ),
  q(
    "Step 2 — decide who might be harmed — includes:",
    "Employees, contractors, visitors, public, and vulnerable groups such as young or disabled workers",
    ["Only full-time directors", "Only people management dislikes", "Excluding cleaners because they are contractors"],
    "All affected groups must be considered, including indirect and vulnerable populations.",
    { a: "Directors are included but not exclusively.", c: "Personal dislike is irrelevant.", d: "Contractors must be considered." },
    "easy",
    rot(29)
  ),
  q(
    "Risk assessment for maintenance during production should cover:",
    "Simultaneous operations (SIMOPS), isolation, communication, and fire/explosion interfaces",
    ["Only office lighting", "Assumption maintenance never overlaps production", "Exclusion of contractor maintainers"],
    "SIMOPS assessments prevent collision of maintenance and operations hazards.",
    { a: "Office lighting is insufficient scope.", c: "Overlap is common and must be assessed.", d: "Contractor maintainers are affected persons." },
    "hard",
    rot(30)
  ),
  q(
    "ALARP principle means risks should be reduced to:",
    "As low as reasonably practicable — balancing risk, cost, and benefit of further controls",
    ["Zero regardless of any cost or feasibility", "Whatever is cheapest without risk consideration", "Level where insurance policy ends"],
    "ALARP guides proportionate control investment — not zero at infinite cost, not negligence either.",
    { a: "Zero risk is often not reasonably practicable.", c: "Cheapest option ignoring risk is not ALARP.", d: "Insurance limits do not define ALARP." },
    "medium",
    rot(31)
  ),
  q(
    "Prioritising recommendations in GIC2 should reflect:",
    "Risk level, feasibility, and legal compliance gaps observed during inspection",
    ["Random order to appear comprehensive", "Only cosmetic issues first", "Alphabetical hazard names only"],
    "Prioritisation demonstrates judgement — high risk and legal breaches first.",
    { a: "Random order shows poor judgement.", c: "Cosmetics should not trump serious harm.", d: "Alphabetical order ignores severity." },
    "medium",
    rot(32)
  ),
  q(
    "Temporary workers agency and host employer should:",
    "Cooperate to ensure induction, risk assessment coverage, and clear safety responsibilities",
    ["Assume the other party holds all duties alone", "Skip induction because tenure is short", "Provide no information on site hazards"],
    "Both parties have duties; cooperation ensures temp workers are not left in gap.",
    { a: "Duties are shared/coordinated, not dumped.", c: "Short tenure still needs induction.", d: "Hazard information must be shared." },
    "medium",
    rot(33)
  ),
  q(
    "A control measure that is 'reasonably practicable' considers:",
    "Gravity and likelihood of harm versus sacrifice (cost, time, difficulty) in money terms",
    ["Only shareholder dividend targets", "Celebrity endorsements of PPE", "Luck of the calendar month"],
    "Classic ALARP balancing from case law — risk versus sacrifice.",
    { a: "Dividends alone do not define practicability.", c: "Endorsements are irrelevant.", d: "Calendar luck is not analysis." },
    "hard",
    rot(34)
  ),
  q(
    "Near-miss investigation input to risk assessment review should:",
    "Update controls when investigation shows failed or missing controls",
    ["Be ignored because no injury occurred", "Trigger blame only without system update", "Delete near-miss records to reduce paperwork"],
    "Near misses are free learning; assessments should reflect findings.",
    { a: "Near misses predict serious harm potential.", c: "Blame alone misses system fixes.", d: "Records support trend analysis." },
    "easy",
    rot(35)
  ),
  q(
    "GIC2 candidate notices unguarded drill in busy walkway area. Best immediate recommendation:",
    "Segregate or guard the equipment, restrict access, and review PUWER assessment for location",
    ["Move walkway through the drill path", "Paint drill bright colour only", "Ignore if drill is not running at that second"],
    "Accessible dangerous parts in walkways need guarding/segregation — strong practical marks.",
    { a: "Walkway through hazard increases exposure.", c: "Paint does not prevent contact.", d: "Idle today does not remove tomorrow's risk." },
    "medium",
    rot(36)
  ),
  q(
    "Risk assessor competence includes:",
    "Understanding hazards, legal duties, control options, and ability to involve workers",
    ["Guessing hazards without site visit", "Copying another site without adaptation", "Refusing to document findings"],
    "Competent assessors tailor assessments with participation and knowledge of hierarchy and law.",
    { a: "Site-specific inspection is essential.", c: "Adaptation to context is required.", d: "Documentation is part of competence." },
    "medium",
    rot(37)
  ),
  q(
    "Monitoring effectiveness of controls belongs to:",
    "Ongoing health and safety management — inspections, audits, exposure monitoring, and incident review",
    ["Only day one of assessment then never", "External social media followers", "Annual Christmas party feedback only"],
    "Check stage of management systems verifies controls still work.",
    { a: "One-day-only view is insufficient.", c: "Social media is not monitoring system.", d: "Party feedback is not systematic monitoring." },
    "easy",
    rot(38)
  ),
  q(
    "Severity of ergonomic risk from repetitive packing might increase with:",
    "Higher pace, force, awkward postures, and lack of rotation or breaks",
    ["Adjustable bench and job rotation", "Team lifting aids for heavy items", "Micro-break policy enforced"],
    "RSI severity likelihood rises with biomechanical stressors and insufficient recovery.",
    { b: "Adjustable bench reduces awkward posture.", c: "Lifting aids reduce force.", d: "Breaks allow recovery lowering risk." },
    "medium",
    rot(39)
  ),
  q(
    "When likelihood is low but severity is catastrophic, the assessment should:",
    "Still consider robust controls because credible worst case is intolerable",
    ["Ignore because likelihood is low always", "Use PPE only without engineering", "Remove all records to avoid worry"],
    "Low frequency high impact events (e.g., confined space asphyxiation) need strong controls.",
    { a: "Low likelihood high harm still demands control.", c: "PPE alone may be inadequate for catastrophic hazards.", d: "Records support management." },
    "hard",
    rot(40)
  ),
  q(
    "GIC2 presentation to management should:",
    "Summarise key risks, legal implications, and prioritized actions with timescales",
    ["Use unexplained jargon to impress", "Hide serious findings to maintain friendship", "Avoid any questions from audience"],
    "Communication to management requires clarity, prioritisation, and engagement — assessed in GIC2.",
    { a: "Jargon obscures message.", c: "Hiding findings fails duty and assessment.", d: "Q&A may occur; clarity helps." },
    "medium",
    rot(41)
  ),
  q(
    "Blanket 'sign risk off' sheets for visitors without site-specific briefing are weak because:",
    "They do not communicate site-specific hazards and controls at time of visit",
    ["They are too colourful", "They replace all contractor coordination", "They guarantee zero visitor incidents legally"],
    "Visitor controls need induction on current site risks — generic disclaimers are insufficient alone.",
    { a: "Colour is not the issue.", c: "Contractor coordination remains necessary.", d: "Disclaimers do not transfer legal duties." },
    "medium",
    rot(42)
  ),
  q(
    "Step 4 — record significant findings — aligns with:",
    "Writing down the assessment results for significant risks and sharing with workforce",
    ["Destroying notes immediately", "Keeping only verbal agreement", "Recording trivial matters only while ignoring major risks"],
    "Recording significant findings satisfies legal expectation and supports communication.",
    { a: "Destruction removes evidence of compliance.", c: "Verbal-only fails record duty.", d: "Major risks must be recorded." },
    "easy",
    rot(43)
  ),
  q(
    "A risk assessment for homeworkers should include:",
    "DSE setup, stress/isolation, electrical safety, trips, and emergency arrangements",
    ["Only corporate logo on laptop", "Assumption home is not a workplace legally", "Exclusion of mental health factors"],
    "Employers' duties extend to homeworkers where work equipment and stress factors apply.",
    { a: "Logo branding is irrelevant to risk.", c: "Home working can still be workplace under law.", d: "Isolation stress is relevant psychosocial factor." },
    "medium",
    rot(44)
  ),
  q(
    "Using photographs in GIC2 inspection notes helps by:",
    "Providing objective evidence of hazards observed for the report",
    ["Replacing all written description illegally", "Distracting from recommendations", "Violating privacy always without exception"],
    "Photos support evidence-based reporting when used appropriately and proportionately.",
    { a: "Photos supplement, not necessarily replace, description.", c: "Photos aid clarity.", d: "Appropriate workplace hazard photos are standard practice." },
    "easy",
    rot(45)
  ),
  q(
    "Control measure SMART follow-up means recommendations should ideally be:",
    "Specific, measurable, achievable, relevant, and time-bound where possible",
    ["Vague wishes with no owner", "Impossible demands with no resource", "Only long-term vision statements"],
    "Actionable recommendations with owners and dates demonstrate GIC2 practical value.",
    { a: "Vague outputs fail follow-through.", c: "Impossible demands won't be implemented.", d: "Vision alone lacks actionable detail." },
    "medium",
    rot(46)
  ),
  q(
    "Reassessment after a control upgrade from administrative to engineering should show:",
    "Lower residual risk score reflecting improved hierarchy position",
    ["Same score because paperwork unchanged", "Higher risk because engineering is new", "Deletion of assessment entirely"],
    "Better controls should reduce evaluated risk if effective.",
    { a: "Risk score should reflect control improvement.", c: "Engineering typically lowers risk, not increases.", d: "Assessment is updated, not deleted." },
    "medium",
    rot(47)
  ),
  q(
    "GIC2 ethical conduct during inspection requires:",
    "Honesty, confidentiality where appropriate, and professional behaviour without falsifying findings",
    ["Hiding serious issues for a gift", "Inventing hazards not observed", "Sharing personal data unnecessarily in report"],
    "Professional ethics underpin trust in assessment outcomes.",
    { a: "Gifts must not influence findings.", c: "Fabrication is misconduct.", d: "Personal data minimisation applies." },
    "easy",
    rot(48)
  ),
  q(
    "Integrating risk assessment with emergency planning means:",
    "Identifying scenarios requiring evacuation, rescue, or medical response and linking to procedures",
    ["Ignoring fire risk because assessment is 'health' only", "Separate plans that contradict each other", "No worker training on emergencies"],
    "Assessments feed emergency scenarios — fires, chemical release, confined space rescue.",
    { a: "Fire and emergency are part of holistic assessment.", c: "Contradictory plans confuse response.", d: "Training implements emergency findings." },
    "hard",
    rot(49)
  ),
];
