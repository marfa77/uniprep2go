import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "NFPA 1500 primarily establishes requirements for:",
    "Occupational safety, health, and wellness programs within fire departments",
    ["Minimum staffing levels for career engine companies only", "Sprinkler system design for commercial occupancies", "Fire investigation and origin determination procedures"],
    "NFPA 1500 is the comprehensive standard for fire service occupational safety and health, covering PPE, training, apparatus, and wellness.",
    { b: "Sprinkler design is addressed in NFPA 13 and related installation standards.", c: "Fire investigation standards are separate from occupational safety.", d: "Staffing deployment is covered by NFPA 1710/1720, not NFPA 1500." },
    "easy",
    rot(0)
  ),
  q(
    "Under NFPA 1521, the Incident Safety Officer (ISO) is responsible for:",
    "Monitoring incident conditions and advising the Incident Commander on safety hazards and risk management",
    ["Directing all fire attack lines without IC approval", "Managing public information and media relations", "Determining property insurance claim values"],
    "The ISO evaluates hazards, enforces safety policies, and has authority to stop unsafe acts — but operates within the command structure advising the IC.",
    { a: "Tactical line direction belongs to Operations, not the ISO role.", c: "Public information is the PIO function.", d: "Insurance valuation is outside fire service incident command scope." },
    "medium",
    rot(1)
  ),
  q(
    "NFPA 1561 addresses which core organizational concept?",
    "Emergency services incident management system and command safety",
    ["Wildland urban interface fuel modification only", "Hazardous materials shipping documentation", "Private fire brigade payroll administration"],
    "NFPA 1561 defines incident management system requirements and integrates command safety principles for emergency services operations.",
    { b: "Hazmat shipping is governed by DOT and NFPA 472/473 training standards.", c: "Payroll is an administrative function outside NFPA 1561 scope.", d: "WUI fuel modification relates to wildland standards, not incident command systems." },
    "easy",
    rot(2)
  ),
  q(
    "The recommended span of control in ICS is:",
    "Three to seven subordinates per supervisor, with five being optimal",
    ["One subordinate regardless of incident complexity", "Ten to fifteen subordinates to maximize efficiency", "Unlimited subordinates when using radio communications"],
    "ICS maintains manageable supervision ratios; exceeding span of control degrades coordination and safety oversight.",
    { a: "A span of one is inefficient and not the ICS guideline.", c: "Ten to fifteen exceeds safe supervisory capacity.", d: "Radios do not eliminate the need for manageable span of control." },
    "easy",
    rot(3)
  ),
  q(
    "Unity of command means:",
    "Each individual reports to only one supervisor within the incident organization",
    ["All agencies share a single radio frequency permanently", "The Incident Commander must personally approve every tactical action", "Only one fire department may respond to any emergency"],
    "Unity of command eliminates conflicting orders and clarifies accountability by ensuring one supervisor per person.",
    { b: "Radio frequency management is a communications issue, not unity of command.", c: "Delegation allows subordinates to execute tactics within assigned scope.", d: "Multiple departments may respond under unified or single command structures." },
    "easy",
    rot(4)
  ),
  q(
    "Unified command is most appropriately used when:",
    "Multiple agencies with jurisdictional authority share decision-making at a single incident",
    ["A single fire department handles a routine room-and-contents fire", "The Incident Commander wants to eliminate all agency representatives", "Only federal agencies respond to a local emergency"],
    "Unified command brings together responsible officials from each jurisdiction or discipline to set common objectives and strategies collaboratively.",
    { a: "Routine single-jurisdiction incidents typically use single command.", c: "Unified command includes, not eliminates, agency representatives.", d: "Local agencies commonly lead even when federal resources assist." },
    "medium",
    rot(5)
  ),
  q(
    "In unified command, strategic decisions are made by:",
    "Representatives of all agencies with jurisdictional responsibility, acting through consensus on shared objectives",
    ["The senior fire officer alone, regardless of other agencies present", "Whichever agency arrives first on scene permanently", "A rotating officer chosen daily by mutual agreement"],
    "Unified command requires joint authority; no single agency unilaterally sets strategy when jurisdictions overlap.",
    { a: "Single-officer authority describes single command, not unified command.", c: "First-arriving agency does not retain permanent command in unified structures.", d: "Daily rotation is not an ICS unified command principle." },
    "medium",
    rot(6)
  ),
  q(
    "The Incident Commander's first priority upon arrival at a working structure fire with reported occupants is:",
    "Life safety — rescue, accountability, and removal of occupants from immediate danger",
    ["Complete a full property pre-plan review before any action", "Establish a finance section to track resource costs", "Deploy the rehabilitation unit before size-up"],
    "Life safety drives initial strategy; rescue and protecting civilians take precedence over property conservation.",
    { b: "Pre-plan review during active rescue delays critical life safety actions.", c: "Finance section is rarely an initial priority at working incidents.", d: "Rehabilitation supports operations but follows initial rescue and fire control decisions." },
    "easy",
    rot(7)
  ),
  q(
    "Which ICS section is responsible for developing the Incident Action Plan and tracking resources?",
    "Planning Section",
    ["Operations Section", "Logistics Section", "Finance/Administration Section"],
    "Planning collects situation data, maintains resource status, and documents the IAP; Operations executes tactics.",
    { a: "Operations implements tactical assignments from the IAP.", c: "Logistics provides support such as supplies, facilities, and services.", d: "Finance tracks costs and administrative requirements." },
    "medium",
    rot(8)
  ),
  q(
    "The Operations Section Chief in ICS is primarily responsible for:",
    "Directing all tactical operations to meet incident objectives",
    ["Preparing the incident cost summary for FEMA reimbursement", "Conducting long-range strategic planning for the next fiscal year", "Managing department pension fund investments"],
    "Operations translates strategy into tactics, assigning divisions, groups, and branches as needed.",
    { b: "Cost summaries are Finance/Administration functions.", c: "Fiscal year planning is organizational administration, not incident Operations.", d: "Pension management is unrelated to incident command." },
    "easy",
    rot(9)
  ),
  q(
    "Mutual aid agreements are designed to:",
    "Provide formal mechanisms for sharing personnel, apparatus, and resources across jurisdictional boundaries",
    ["Eliminate the need for individual department training programs", "Transfer all command authority permanently to a state agency", "Guarantee that the requesting department pays no costs for any assistance"],
    "Mutual aid formalizes resource sharing during emergencies; terms vary by agreement regarding reimbursement and command.",
    { a: "Each department retains training obligations for its members.", c: "Command transfers are incident-specific, not permanent.", d: "Reimbursement terms depend on the agreement and applicable law." },
    "easy",
    rot(10)
  ),
  q(
    "Automatic mutual aid differs from mutual aid on request because:",
    "Predetermined units are dispatched automatically when defined trigger conditions occur",
    ["No written agreement exists between participating departments", "Only state agencies may participate in automatic aid", "The Incident Commander must call each department individually after the incident ends"],
    "Automatic aid dispatches resources per pre-arranged triggers (alarm type, location), reducing dispatch delays.",
    { b: "Automatic aid requires formal pre-arrangements.", c: "Local departments commonly participate in automatic aid.", d: "Dispatch occurs at incident onset, not after termination." },
    "medium",
    rot(11)
  ),
  q(
    "A strike team in fire service organization typically consists of:",
    "Five similar resources with common communications and a designated leader",
    ["A single engine company operating independently without supervision", "Fifty personnel assigned to logistics only", "Only chief officers with no line personnel"],
    "Strike teams group like resources (e.g., five engines) under one leader for efficient deployment and tracking.",
    { a: "Single resources operate as individuals or within larger divisions.", c: "Fifty personnel exceeds standard strike team composition.", d: "Strike teams include line resources, not only chief officers." },
    "medium",
    rot(12)
  ),
  q(
    "A task force differs from a strike team because a task force:",
    "Combines different but complementary resource types under one leader",
    ["Contains only identical apparatus from the same department", "Operates without any designated supervisor", "Is used exclusively for administrative support functions"],
    "Task forces mix resource types (e.g., engine, ladder, ambulance) for a specific operational need.",
    { a: "Identical resources define a strike team, not a task force.", c: "Task forces require a designated leader.", d: "Task forces are operational, not purely administrative." },
    "medium",
    rot(13)
  ),
  q(
    "NFPA 1710 applies to:",
    "Career fire departments' organization and deployment of suppression, EMS, and special operations",
    ["Volunteer fire departments exclusively", "Industrial fire brigades on private manufacturing sites only", "Federal wildland fire crews exclusively"],
    "NFPA 1710 sets staffing and response time objectives for career departments; NFPA 1720 addresses volunteer departments.",
    { b: "Volunteer departments are covered by NFPA 1720.", c: "Industrial brigades follow NFPA 600 and site-specific requirements.", d: "Wildland crews follow NWCG and wildland-specific standards." },
    "easy",
    rot(14)
  ),
  q(
    "NFPA 1720 applies to:",
    "Volunteer fire departments' organization and deployment of suppression, EMS, and special operations",
    ["Career fire departments exclusively", "Airport crash rescue only", "Municipal building code enforcement"],
    "NFPA 1720 recognizes volunteer staffing models and sets deployment objectives appropriate to volunteer response.",
    { a: "Career departments follow NFPA 1710.", c: "Airport rescue follows NFPA 403/407 and ARFF requirements.", d: "Building code enforcement is a separate municipal function." },
    "easy",
    rot(15)
  ),
  q(
    "Under NFPA 1710, the minimum staffing for an interior structural firefighting company is:",
    "Four members on-scene, with at least two for initial interior attack when required",
    ["One member who serves as both driver and sole interior firefighter", "Eight members before any water may be applied to the fire", "Two members regardless of whether interior operations are conducted"],
    "NFPA 1710 requires four on-scene for effective operations; interior work requires minimum pairs for safety and compliance with two-in/two-out.",
    { a: "Solo interior entry violates two-in/two-out and NFPA 1710 staffing intent.", c: "Eight is not the NFPA 1710 minimum on-scene staffing.", d: "Two on-scene is below the four-member company standard." },
    "hard",
    rot(16)
  ),
  q(
    "NFPA 1710 establishes a travel time objective for first arriving suppression resources of:",
    "Four minutes for the arrival of the first arriving engine company",
    ["Fifteen minutes for all mutual aid units regardless of distance", "One minute for every response in all geographic conditions", "Ten minutes before any 911 call is processed"],
    "NFPA 1710 targets four-minute travel time for the first engine; total response includes alarm handling and turnout time.",
    { b: "Fifteen minutes is not the first-arriving engine travel objective.", c: "One minute is unrealistic for all conditions and is not the standard.", d: "911 processing is separate from travel time measurement." },
    "hard",
    rot(17)
  ),
  q(
    "NFPA 1720 recognizes that volunteer departments may meet staffing objectives through:",
    "An effective response force assembled from on-duty, on-call, or callback personnel within defined time frames",
    ["Requiring full-time paid staffing on every apparatus at all times", "Eliminating interior firefighting for all structure fires", "Deploying only unmanned apparatus to all incidents"],
    "NFPA 1720 accommodates volunteer models using assembly of available personnel while still setting deployment benchmarks.",
    { a: "Full-time staffing describes career models under NFPA 1710.", c: "Interior firefighting remains a core capability with adequate assembly.", d: "Unmanned apparatus cannot perform suppression operations." },
    "medium",
    rot(18)
  ),
  q(
    "Pre-incident planning primarily enables fire departments to:",
    "Identify building hazards, access points, and tactical considerations before an emergency occurs",
    ["Replace the need for on-scene size-up at working incidents", "Eliminate the requirement for fire code enforcement", "Avoid conducting any building inspections"],
    "Pre-plans provide critical intelligence on construction, occupancy, hydrants, and FDC locations to support faster, safer operations.",
    { a: "Size-up remains essential; pre-plans supplement but do not replace dynamic assessment.", c: "Code enforcement complements pre-incident planning.", d: "Inspections often generate pre-plan data." },
    "easy",
    rot(19)
  ),
  q(
    "A pre-incident plan for a high-rise building should include:",
    "Standpipe and FDC locations, elevator recall features, occupant notification systems, and stairwell configuration",
    ["Only the building owner's personal contact for billing", "Historical weather patterns for the past century", "Preferred paint colors for lobby renovation"],
    "High-rise pre-plans focus on fire protection systems, egress, vertical access, and ventilation considerations critical to strategy.",
    { a: "Billing contacts are administrative, not tactical pre-plan elements.", c: "Weather history is not a primary pre-plan component.", d: "Decorative finishes do not drive fireground strategy." },
    "medium",
    rot(20)
  ),
  q(
    "Fire department pre-incident planning surveys should be updated:",
    "When significant changes occur to building construction, occupancy, or fire protection systems",
    ["Only once when the building is first constructed, never again", "Every twenty years regardless of changes", "Only after a major fire has occurred at the property"],
    "Pre-plans must reflect current conditions; renovations, occupancy changes, and system modifications require updates.",
    { a: "One-time-only plans become outdated and unsafe.", c: "Twenty-year intervals ignore intervening changes.", d: "Waiting for a fire defeats the purpose of pre-incident planning." },
    "easy",
    rot(21)
  ),
  q(
    "Public fire education programs are most effective when they:",
    "Target specific behaviors such as smoke alarm maintenance, escape planning, and cooking fire prevention",
    ["Focus exclusively on fire service history without practical safety messages", "Discourage community participation in fire department activities", "Avoid reaching vulnerable populations such as children and older adults"],
    "Evidence-based public education addresses identifiable fire causes and behaviors, reaching audiences at highest risk.",
    { a: "History alone does not change fire-safe behaviors.", c: "Community engagement strengthens education programs.", d: "High-risk groups are priority audiences for education." },
    "easy",
    rot(22)
  ),
  q(
    "A fire department's public education risk reduction strategy should be guided by:",
    "Local fire loss data, demographic profiles, and identified community hazards",
    ["Random selection of topics without data analysis", "Only national advertising campaigns unrelated to local conditions", "Avoiding measurement of program outcomes"],
    "Data-driven programs allocate resources to the leading local causes of fire, injury, and death.",
    { a: "Random topics waste resources and miss priority risks.", c: "National campaigns supplement but do not replace local data analysis.", d: "Outcome measurement validates program effectiveness." },
    "medium",
    rot(23)
  ),
  q(
    "Community Risk Reduction (CRR) integrates public education with:",
    "Enforcement, engineering, economic incentives, and emergency response to address identified risks holistically",
    ["Eliminating all fire suppression capabilities to save budget", "Replacing fire codes with voluntary guidelines only", "Removing smoke alarm installation requirements"],
    "CRR uses all five E's — education, enforcement, engineering, economic incentives, and emergency response — to reduce community risk.",
    { a: "Suppression remains a core CRR component.", c: "Codes provide enforceable minimum safety requirements.", d: "Smoke alarms are proven life-saving devices promoted in CRR." },
    "medium",
    rot(24)
  ),
  q(
    "In a typical municipal fire department organizational structure, the Fire Chief is:",
    "The executive head responsible for overall department administration, policy, and strategic direction",
    ["A line firefighter assigned exclusively to hydrant maintenance", "An elected position with no accountability to municipal government", "A role limited to conducting fire investigations only"],
    "The Fire Chief leads the department, reports to a city manager or mayor, and sets policy, budgets, and strategic priorities.",
    { a: "Hydrant maintenance is an operational support function, not the chief's role.", c: "Fire chiefs are appointed officials accountable to municipal authority.", d: "Investigation may be a division but not the chief's sole function." },
    "easy",
    rot(25)
  ),
  q(
    "A fire department division chief typically:",
    "Manages a major functional area such as operations, prevention, training, or support services",
    ["Serves as the sole interior firefighter on every alarm", "Has no supervisory or budget responsibilities", "Reports directly to state fire marshals instead of the Fire Chief"],
    "Division chiefs oversee broad program areas and supervise battalion chiefs or program managers within the department hierarchy.",
    { a: "Line firefighting is not the primary role of division chiefs.", c: "Division chiefs have significant supervisory and administrative duties.", d: "Division chiefs report within the department chain of command to the Fire Chief." },
    "medium",
    rot(26)
  ),
  q(
    "The battalion chief's primary role in a career fire department is:",
    "Supervising multiple companies, managing shift operations, and serving as an initial Incident Commander at major alarms",
    ["Performing only clerical payroll functions at headquarters", "Maintaining personal social media accounts unrelated to duty", "Conducting building code adoption hearings independently of the municipality"],
    "Battalion chiefs bridge line operations and administration, directing companies and assuming command at escalating incidents.",
    { a: "Payroll is an administrative staff function.", c: "Social media may be a PIO function but is not the battalion chief's primary role.", d: "Code adoption is a legislative/administrative process, not a battalion chief duty." },
    "medium",
    rot(27)
  ),
  q(
    "Company officers (captains/lieutenants) are responsible for:",
    "Direct supervision of assigned personnel, apparatus, and emergency scene operations at the company level",
    ["Setting municipal tax rates for the entire jurisdiction", "Approving international trade agreements", "Conducting judicial sentencing in criminal courts"],
    "Company officers lead daily station operations, training, and tactical execution on the fireground.",
    { b: "Tax rates are set by elected governing bodies.", c: "Trade agreements are federal or state government functions.", d: "Sentencing is a judicial function." },
    "easy",
    rot(28)
  ),
  q(
    "NFPA 1500 requires fire departments to establish:",
    "A comprehensive occupational safety and health program with written policies, training, and enforcement",
    ["Only a voluntary suggestion box for safety ideas without policy", "Exemptions from all OSHA requirements automatically", "A policy prohibiting any safety officer positions"],
    "NFPA 1500 mandates formal safety programs including hazard identification, PPE, medical surveillance, and incident safety roles.",
    { a: "Informal suggestions do not meet the standard's program requirements.", c: "NFPA 1500 complements but does not exempt departments from applicable regulations.", d: "Safety officer roles are encouraged and defined in related standards." },
    "medium",
    rot(29)
  ),
  q(
    "Under NFPA 1500, fire department members exposed to infectious disease risks must receive:",
    "Appropriate training, PPE, medical evaluation, and follow-up consistent with recognized health standards",
    ["No training if they hold EMT certification", "Only a single briefing at initial hire with no updates", "Exemption from vaccination and exposure documentation requirements"],
    "NFPA 1500 addresses infectious disease exposure control including training, immunization programs, and medical surveillance.",
    { a: "EMT certification does not replace department-specific exposure training.", c: "One-time briefing is insufficient for ongoing hazard management.", d: "Documentation and immunization programs are required components." },
    "hard",
    rot(30)
  ),
  q(
    "The Safety Officer position required by NFPA 1521 at an expanding incident should be filled by:",
    "A qualified individual dedicated to safety monitoring, not simultaneously serving as Operations Section Chief",
    ["The same person directing all fire attack operations without assistance", "An untrained community volunteer with no fire service background", "Whoever is available regardless of qualifications or certification"],
    "NFPA 1521 requires a qualified ISO; combining ISO with Operations creates conflicts and exceeds span of control.",
    { a: "Dual-hatting Operations and ISO violates role separation principles.", c: "Qualifications and training are required for the ISO function.", d: "Availability alone does not establish ISO qualification." },
    "hard",
    rot(31)
  ),
  q(
    "NFPA 1561 requires the Incident Commander to:",
    "Conduct risk assessment and apply risk management principles throughout the incident",
    ["Accept maximum risk to achieve property conservation in all cases", "Delegate all safety decisions exclusively to outside consultants", "Ignore changing conditions once the first IAP is written"],
    "NFPA 1561 integrates risk management into command decisions, balancing operational needs with firefighter safety.",
    { a: "Maximum risk acceptance contradicts risk management principles.", c: "The IC retains ultimate responsibility for incident safety.", d: "Dynamic incidents require continuous reassessment." },
    "medium",
    rot(32)
  ),
  q(
    "When the Incident Commander determines that conditions exceed acceptable risk levels, NFPA 1561 supports:",
    "Transition to defensive operations and withdrawal of personnel from untenable positions",
    ["Mandatory interior offensive attack regardless of structural stability", "Removing all PPE to improve mobility in collapsing structures", "Discontinuing all communication with crews inside the building"],
    "Risk management allows strategic shifts to defensive modes when benefits no longer justify exposure.",
    { a: "Mandatory offensive attack ignores unacceptable risk determinations.", c: "Removing PPE increases injury potential.", d: "Communication must increase during critical safety transitions." },
    "medium",
    rot(33)
  ),
  q(
    "Initial and ongoing training for fire department members under NFPA 1500 should include:",
    "Job performance requirements for assigned duties, safety procedures, and regular proficiency maintenance",
    ["Only a one-time orientation with no continuing education", "Training limited to drivers with no requirements for firefighters", "Elimination of live-fire training in all circumstances"],
    "NFPA 1500 requires comprehensive initial and continuing training tied to job performance requirements and safety.",
    { a: "Continuing education is mandatory, not optional.", c: "All members require training appropriate to their assigned duties.", d: "Live-fire training may be conducted with proper safety controls." },
    "medium",
    rot(34)
  ),
  q(
    "Driver/operator training per NFPA 1002 and department policy should verify competency in:",
    "Apparatus operation, pumping, aerial device use as equipped, and safe positioning on the fireground",
    ["Only administrative report writing without apparatus skills", "Social media posting during emergency response", "Courtroom testimony procedures exclusively"],
    "Driver/operators must demonstrate mechanical operation, hydraulics, and scene positioning relevant to their assigned apparatus.",
    { a: "Report writing is ancillary; apparatus operation is the core competency.", c: "Social media is not a driver/operator certification element.", d: "Courtroom testimony is a specialized skill, not the primary driver/operator focus." },
    "medium",
    rot(35)
  ),
  q(
    "Fire officer training aligned with NFPA 1021 progresses through levels that include:",
    "Fire Officer I through IV competencies covering supervision, management, and executive leadership",
    ["A single certification with no distinction between company and chief officer skills", "Only physical fitness testing without leadership curriculum", "Exclusive focus on hazardous materials technician skills"],
    "NFPA 1021 defines progressive officer competencies from company-level supervision to executive administration.",
    { a: "Officer levels reflect increasing scope of responsibility.", c: "Leadership and management curriculum is central to officer training.", d: "Hazmat technician training is separate from fire officer progression." },
    "hard",
    rot(36)
  ),
  q(
    "Two-in/two-out requirements for interior structural firefighting establish that:",
    "At least two firefighters enter together while two remain available outside for rescue",
    ["One firefighter may enter alone if experienced", "All personnel on scene must enter the structure simultaneously", "Two-in/two-out applies only to wildland fire operations"],
    "OSHA 1910.134 and fire service practice require a standby team equal to interior team size for immediate rescue capability.",
    { a: "Solo interior entry violates two-in/two-out.", c: "Simultaneous entry by all personnel leaves no exterior rapid intervention capability.", d: "Two-in/two-out applies to structural firefighting, not wildland." },
    "hard",
    rot(37)
  ),
  q(
    "A Rapid Intervention Crew (RIC) or FAST team should be established:",
    "Before interior firefighting operations begin at structural incidents where members enter the IDLH environment",
    ["Only after a mayday has already been declared", "Exclusively at wildland incidents with no structures involved", "After all firefighting operations have been completed"],
    "RIC/FAST teams must be staged and ready prior to interior entry to provide immediate rescue if a firefighter emergency occurs.",
    { a: "Post-mayday establishment delays critical rescue capability.", c: "Structural IDLH entry drives RIC/FAST deployment, not wildland-only scenes.", d: "Post-incident RIC serves no operational purpose." },
    "hard",
    rot(38)
  ),
  q(
    "Transfer of command at an incident should occur:",
    "Face-to-face with a briefing when possible, documenting the time and conditions at transfer",
    ["Silently by leaving the scene without notifying anyone", "Only in writing after the incident is fully terminated", "By radio announcement with no situation briefing"],
    "Effective transfer includes direct communication of situation status, current actions, resource assignments, and safety concerns.",
    { a: "Silent departure creates a command vacuum.", c: "Post-termination transfer is meaningless for ongoing operations.", d: "Radio-only transfer without briefing risks information gaps." },
    "medium",
    rot(39)
  ),
  q(
    "The Liaison Officer in ICS is responsible for:",
    "Coordinating with cooperating and assisting agency representatives",
    ["Directing all interior fire attack operations", "Preparing the final incident cost documentation alone", "Operating the department's pension investment portfolio"],
    "The Liaison Officer serves as the primary contact for agency representatives not assigned to unified command.",
    { a: "Fire attack is an Operations function.", c: "Cost documentation involves Finance/Administration.", d: "Pension investments are unrelated to incident command staff." },
    "medium",
    rot(40)
  ),
  q(
    "The Public Information Officer (PIO) during a major incident should:",
    "Provide accurate, timely information to the public and media while coordinating messages with command",
    ["Release unverified casualty information before command confirmation", "Refuse all communication with the public and media", "Set tactical fireground assignments independently of the IC"],
    "The PIO manages external communications, ensuring consistency with command objectives and verified facts.",
    { a: "Unverified information creates public panic and liability.", c: "Public communication is the core PIO function.", d: "Tactical assignments belong to Operations under the IC." },
    "easy",
    rot(41)
  ),
  q(
    "A fire department deployment plan should address:",
    "Apparatus staging, resource typing, callback procedures, and coverage of vacated stations during major incidents",
    ["Only uniform color selection for ceremonial events", "Personal vacation scheduling preferences of individual members", "Historical trivia about the department's founding date"],
    "Deployment plans ensure adequate coverage, resource accountability, and strategic placement during escalated incidents.",
    { a: "Uniform colors are administrative detail, not deployment planning.", c: "Vacation preferences are HR matters, not deployment strategy.", d: "Historical trivia does not guide resource deployment." },
    "medium",
    rot(42)
  ),
  q(
    "When multiple alarms are struck, the primary purpose is to:",
    "Request additional resources and personnel to match escalating incident demands",
    ["Signal that the incident is ready for termination", "Reduce the number of responding units", "Indicate that no further command structure is needed"],
    "Alarm levels (second, third, etc.) trigger pre-planned resource assignments to maintain operational capability.",
    { a: "Termination is signaled through demobilization, not additional alarms.", c: "Multiple alarms increase, not decrease, responding resources.", d: "Escalating incidents require expanded command and resources." },
    "easy",
    rot(43)
  ),
  q(
    "Resource typing in mutual aid systems helps ensure:",
    "Responding units meet defined capability and equipment standards for the requested resource category",
    ["All apparatus are identical regardless of community needs", "Departments may send any unit without regard to capability", "Resource typing eliminates the need for incident command"],
    "Typing (e.g., Type 1 engine) standardizes expectations so requesting agencies receive appropriate capabilities.",
    { a: "Communities have varying needs; typing defines capabilities, not identical apparatus.", c: "Capability matching is the purpose of typing.", d: "Command remains essential regardless of resource typing." },
    "hard",
    rot(44)
  ),
  q(
    "A fire department's Standard Operating Guidelines (SOGs) or SOPs should:",
    "Provide consistent operational procedures while allowing deviation when conditions require IC judgment",
    ["Prohibit any deviation under all circumstances including imminent life safety", "Replace all training and officer judgment entirely", "Exist only as unwritten traditions never documented"],
    "SOGs/SOPs standardize common operations; the IC may deviate with documented justification when conditions warrant.",
    { a: "Life safety may require deviation from standard tactics.", c: "SOGs supplement, not replace, training and judgment.", d: "Written documentation ensures consistency and accountability." },
    "medium",
    rot(45)
  ),
  q(
    "Integrated dispatch systems improve fire department deployment by:",
    "Coordinating multi-agency call taking, automatic aid dispatch, and unit recommendation based on location and call type",
    ["Eliminating the need for any fire department pre-incident plans", "Preventing mutual aid resources from crossing jurisdictional lines", "Delaying dispatch until three separate supervisors approve each call"],
    "CAD and integrated dispatch reduce dispatch times and assign appropriate resources using pre-programmed run cards and GIS.",
    { a: "Pre-incident plans complement dispatch systems.", c: "Mutual aid depends on cross-jurisdictional dispatch capability.", d: "Excessive approval steps delay emergency response." },
    "medium",
    rot(46)
  ),
  q(
    "Fire department shift schedules for career personnel should consider:",
    "Adequate rest, fatigue management, coverage requirements, and compliance with labor agreements and safety standards",
    ["Maximizing consecutive hours without rest to reduce staffing costs regardless of fatigue", "Eliminating all overlap between shifts", "Scheduling only overnight shifts for all suppression personnel"],
    "Fatigue management under NFPA 1500 and labor practices affects response readiness and firefighter safety.",
    { a: "Unlimited consecutive hours increase error and injury risk.", c: "Shift overlap may be needed for briefings and coverage.", d: "Daytime demand requires daytime staffing." },
    "hard",
    rot(47)
  ),
  q(
    "A fire department training division should maintain records demonstrating:",
    "Completion of required initial and continuing training for each member's assigned duties",
    ["Only attendance at social events without skills verification", "No documentation to protect member privacy from all accountability", "Training records only for chief officers, not line personnel"],
    "Training documentation supports ISO audits, certification maintenance, and legal defensibility of department preparedness.",
    { a: "Social events do not substitute for skills-based training records.", c: "All members require documented training appropriate to their roles.", d: "Privacy does not eliminate the need for training accountability." },
    "medium",
    rot(48)
  ),
  q(
    "The most important organizational principle when career and volunteer departments operate together under mutual aid is:",
    "Clear command structure, interoperable communications, and pre-established working relationships through joint training",
    ["Assuming all departments use identical SOGs without prior coordination", "Avoiding any joint training to prevent information sharing", "Each unit operating independently without unified objectives"],
    "Interoperability and prior joint training reduce confusion when diverse departments integrate at complex incidents.",
    { a: "SOGs differ; coordination and ICS provide common structure.", c: "Joint training builds familiarity and trust before emergencies.", d: "Independent operation without unified objectives creates chaos." },
    "hard",
    rot(49)
  ),
];
