#!/usr/bin/env python3
"""CDL School Bus (S) Endorsement — 60 curated MCQs (4×15)."""
from write_helper import write_bank

SLUG = "cdl-school-bus-readiness-check"

topics = {
    "vehicle-equipment": [
        (
            "School bus pre-trip inspection should include checking:",
            "Lights, mirrors, emergency exits, tires, brakes, and required safety equipment",
            [
                "Only the radio station presets",
                "Whether the bus color matches the school mascot exactly",
                "Skipping brake checks if running late",
            ],
            "A thorough pre-trip verifies systems that protect students and road users before departure.",
            [
                "Entertainment settings are not safety-critical checks.",
                "Paint aesthetics are not the inspection focus.",
                "Brake checks are never optional.",
            ],
            "easy",
        ),
        (
            "Convex (fisheye) mirrors on a school bus are used primarily to:",
            "Show wide areas along the sides and front danger zones that flat mirrors may miss",
            [
                "Replace the need to look for students at all",
                "Heat the windshield",
                "Measure vehicle speed",
            ],
            "Convex mirrors expand field of view for loading-zone and side blind spots; drivers still must scan properly.",
            [
                "Mirrors aid—not replace—active scanning.",
                "Defrosters heat glass, not mirrors' purpose.",
                "Speedometers measure speed.",
            ],
            "easy",
        ),
        (
            "The danger zone around a school bus is generally considered:",
            "The area extending about 10 feet around the bus where students are at greatest risk",
            [
                "Only the inside aisle",
                "Five miles ahead on the highway",
                "The school parking lot exclusively when empty",
            ],
            "Most student injuries occur near the bus; drivers must account for the danger zone in mirror use and procedures.",
            [
                "Interior supervision matters, but danger zone refers to exterior risk areas.",
                "Highway distance is not the danger-zone definition.",
                "Danger zone exists whenever students are around the bus.",
            ],
            "easy",
        ),
        (
            "If an emergency exit warning buzzer sounds because a door/window is open while driving, you should:",
            "Stop safely and secure/close the exit properly before continuing",
            [
                "Disable the buzzer and keep driving with the exit open",
                "Accelerate to drown out the sound",
                "Ignore it if students say it is fine",
            ],
            "Open emergency exits while underway are unsafe; stop and correct the condition.",
            [
                "Disabling warnings hides a safety defect.",
                "Speed increases risk.",
                "Student opinion does not override equipment rules.",
            ],
            "medium",
        ),
        (
            "School bus crossing gates (stop arms) and red lights are used to:",
            "Stop other traffic while students board or leave the bus as required by law",
            [
                "Decorate the bus for parades only",
                "Signal that the driver is on a personal errand",
                "Replace mirrors entirely",
            ],
            "Eight-light warning systems and stop arms control traffic during student loading/unloading.",
            [
                "They are operational safety devices, not decorations.",
                "They indicate student loading operations.",
                "Mirrors remain essential.",
            ],
            "easy",
        ),
        (
            "During pre-trip, tire checks should verify:",
            "Proper inflation, tread, and no dangerous cuts/bulges or duals touching",
            [
                "Only that tires are black",
                "That spare tire logos match",
                "Nothing—tires never fail on buses",
            ],
            "Tire defects cause blowouts and loss of control; duals rubbing indicate problems.",
            [
                "Color is irrelevant.",
                "Logo matching is not a safety check.",
                "Tires do fail; inspection prevents many failures.",
            ],
            "easy",
        ),
        (
            "ABS malfunction lamps on a school bus mean:",
            "ABS may not function; drive carefully and get repairs—use normal braking without pumping",
            [
                "The bus has no brakes at all always",
                "You must pump brakes rapidly at all times",
                "You should remove the fuse and ignore it forever",
            ],
            "ABS faults do not eliminate foundation brakes; do not pump ABS-equipped brakes in panic stops.",
            [
                "Service brakes usually still work.",
                "Pumping is incorrect for ABS.",
                "Ignoring required repairs is improper.",
            ],
            "medium",
        ),
        (
            "First-aid kits and body fluid cleanup kits on school buses should be:",
            "Present, accessible, and stocked per state/district requirements",
            [
                "Optional decorations",
                "Locked in a garage miles away during routes",
                "Used as student toys",
            ],
            "Emergency equipment must be on the bus and ready for injuries/cleanup incidents.",
            [
                "Equipment is required, not decorative.",
                "It must be on the vehicle in service.",
                "Kits are for emergencies, not play.",
            ],
            "easy",
        ),
        (
            "Fire extinguishers on school buses must be:",
            "Charged, properly mounted, and accessible to the driver",
            [
                "Empty to save weight",
                "Hidden under loose trash",
                "Removed to make room for sports gear",
            ],
            "A usable extinguisher is part of required emergency equipment.",
            [
                "Empty units are useless in a fire.",
                "Access cannot be blocked.",
                "Equipment removal violates requirements.",
            ],
            "easy",
        ),
        (
            "If windshield wipers fail in heavy rain during a route, you should:",
            "Stop in a safe place and not continue until visibility is safe/repairs are made per policy",
            [
                "Speed up to finish faster",
                "Drive blind using memory of the road",
                "Have a student wipe the glass from outside while moving",
            ],
            "Inadequate visibility is a stop condition; student involvement outside a moving bus is dangerous.",
            [
                "Speed worsens risk.",
                "Blind driving is reckless.",
                "Students must not wipe a moving bus.",
            ],
            "medium",
        ),
        (
            "Seat belt (if equipped for driver) use by the school bus driver is:",
            "Required/expected—drivers must use the driver restraint as designed",
            [
                "Optional because buses never crash",
                "Only for highway trips over 100 miles",
                "Prohibited by federal law always",
            ],
            "Driver restraints protect the person responsible for student safety; use them.",
            [
                "Crashes can occur.",
                "Use is not limited to long trips.",
                "Restraints are not prohibited.",
            ],
            "easy",
        ),
        (
            "Emergency roof hatches should be:",
            "Operational, unobstructed, and included in pre-trip checks",
            [
                "Painted shut permanently",
                "Blocked with luggage",
                "Ignored because side doors always suffice in every scenario",
            ],
            "Multiple egress paths are required for evacuation options; hatches must work.",
            [
                "Sealed hatches defeat egress.",
                "Obstructions delay evacuation.",
                "Alternate exits are needed if primary exits are blocked.",
            ],
            "medium",
        ),
        (
            "Student-facing cameras/GPS (if installed) are primarily for:",
            "Safety, security, and operational accountability per district policy",
            [
                "Entertainment livestreams for the public without authorization",
                "Replacing the driver's duty to supervise",
                "Increasing road speed limits for the bus",
            ],
            "Technology supports—but does not replace—safe driving and supervision practices.",
            [
                "Unauthorized public streams may violate privacy/policy.",
                "Drivers still supervise.",
                "Speed limits are set by law, not cameras.",
            ],
            "easy",
        ),
        (
            "If you find a defective stop-arm during pre-trip, you should:",
            "Report it and not operate until repaired/cleared per district and law",
            [
                "Cover it with tape and run the route anyway",
                "Tell students to flag traffic themselves",
                "Use hazard lights only as a permanent substitute without authorization",
            ],
            "Inoperative student-loading warning equipment is a serious out-of-service type defect.",
            [
                "Tape does not restore function.",
                "Students must not control traffic.",
                "Unauthorized substitutes are unsafe/noncompliant.",
            ],
            "hard",
        ),
        (
            "Air brake adjustment (if air-equipped) matters because:",
            "Excessive pushrod travel reduces braking effectiveness",
            [
                "Loose adjustment improves fuel economy only",
                "Brakes work better when severely out of adjustment",
                "Adjustment is unrelated to stopping distance",
            ],
            "Out-of-adjustment brakes increase stopping distance and fail inspections.",
            [
                "Adjustment is a safety, not MPG, issue.",
                "Poor adjustment worsens braking.",
                "Stopping distance is directly affected.",
            ],
            "medium",
        ),
    ],
    "loading-unloading": [
        (
            "When approaching a stop to load students, you should:",
            "Approach carefully, activate amber warning lights as required, and scan for traffic/students",
            [
                "Race to the stop and brake hard at the last second",
                "Never use warning lights",
                "Stop in the middle of an uncontrolled blind curve without adjusting",
            ],
            "Smooth, legal warning-light procedures and scanning protect students in the danger zone.",
            [
                "Hard stops endanger students and traffic.",
                "Warning lights are required in the process.",
                "Stops need adequate sight distance when possible.",
            ],
            "easy",
        ),
        (
            "Students should be taught to cross in front of the bus only after:",
            "The driver signals it is safe and they have checked traffic themselves",
            [
                "They run behind the bus out of mirror view",
                "They cross on red without looking",
                "They retrieve dropped papers from under the bus while it may move",
            ],
            "Crossing procedures keep students in view; never go behind or under the bus.",
            [
                "Rear crossing is a major fatality pattern.",
                "Looking and waiting for the signal are essential.",
                "Items under the bus require driver help—not student retrieval while at risk.",
            ],
            "easy",
        ),
        (
            "If a student drops papers near the bus during unloading, the student should:",
            "Tell the driver and wait for instructions—never go under/near wheels to grab items",
            [
                "Dive under the bus immediately",
                "Chase papers into traffic",
                "Assume the driver sees them without communication",
            ],
            "Communication prevents students from entering blind spots near wheels.",
            [
                "Under-bus retrieval is extremely dangerous.",
                "Traffic chase is hazardous.",
                "Drivers need to be told.",
            ],
            "easy",
        ),
        (
            "Railroad crossing procedures for school buses generally require:",
            "Stopping, looking and listening, and crossing only when safe (with required hazards/procedures)",
            [
                "Crossing tracks without slowing if the bus is late",
                "Relying only on students to watch for trains",
                "Stopping on the tracks to count riders",
            ],
            "School buses must follow railroad stop requirements; never stop on tracks.",
            [
                "Lateness does not waive RR stops.",
                "The driver is responsible for the scan.",
                "Stopping on tracks risks being struck.",
            ],
            "easy",
        ),
        (
            "At a railroad crossing, if your bus stalls on the tracks, you should:",
            "Evacuate students immediately away from the tracks at an angle toward the train's approach if a train is coming",
            [
                "Keep students seated to wait for a tow",
                "Try to push the bus with students still aboard while a train approaches",
                "Honk continuously without evacuating when a train is imminent",
            ],
            "Life safety comes first—evacuate clear of tracks when stalled and danger exists.",
            [
                "Waiting aboard on tracks is deadly if a train comes.",
                "Pushing with students aboard wastes critical time.",
                "Evacuation is required when a train approaches.",
            ],
            "hard",
        ),
        (
            "When unloading on the side of the road, students should move:",
            "To a safe location away from traffic as directed, remaining visible to the driver as required",
            [
                "Immediately into traffic lanes to hurry home",
                "Between buses in a blind alley without guidance",
                "Under the bus to stay warm",
            ],
            "Safe waiting/walking paths keep students out of traffic and wheel areas.",
            [
                "Traffic lanes are dangerous.",
                "Blind areas between vehicles are risk zones.",
                "Under-bus areas are danger zones.",
            ],
            "easy",
        ),
        (
            "Counting students during loading/unloading helps ensure:",
            "All students are accounted for and none are left around the danger zone unseen",
            [
                "Faster driving speeds",
                "Skipping mirror checks",
                "Ignoring the stop arm",
            ],
            "Accountability checks prevent leaving students behind or pulling away while someone is near wheels.",
            [
                "Counting is not about speed.",
                "Mirror checks remain mandatory.",
                "Stop-arm use remains required.",
            ],
            "easy",
        ),
        (
            "You must not proceed after loading until:",
            "Students are seated/secure as required and the danger zone is clear",
            [
                "A student is still hanging on the door",
                "The stop arm is still required to be out but you cancel early to save time",
                "You guess the mirrors are fine without looking",
            ],
            "Movement begins only when boarding is complete and pathways are clear.",
            [
                "Hanging on doors is extremely dangerous.",
                "Early cancellation endangers crossing students.",
                "Mirror confirmation is required.",
            ],
            "medium",
        ),
        (
            "Amber lights (where used in the 8-light system) typically mean:",
            "The bus is preparing to stop to load/unload students",
            [
                "The bus is broken down on the shoulder only",
                "The driver is turning into a driveway always",
                "Police are requesting a stop of the bus",
            ],
            "Amber warning lights alert traffic before reds/stop arm engage at the stop.",
            [
                "Ambers are part of student-stop warning sequence.",
                "Turn signals differ from student ambers.",
                "Police stops use different signals.",
            ],
            "easy",
        ),
        (
            "If traffic does not stop for your reds/stop arm as required, you should:",
            "Keep students from crossing until traffic is safe; report violators per policy",
            [
                "Order students to run across anyway",
                "Chase the violator in the bus",
                "Turn off lights and pretend it did not happen without protecting students",
            ],
            "Student safety overrides schedule; do not send children into moving traffic.",
            [
                "Running into traffic is unsafe.",
                "Pursuit is not the driver's role.",
                "Protect students first, then report.",
            ],
            "medium",
        ),
        (
            "Backing a school bus is:",
            "Avoided when possible; if required, use a responsible adult lookout when available and extreme caution",
            [
                "Preferred instead of turning around safely",
                "Done at high speed to finish faster",
                "Done while students stand in the danger zone behind the bus",
            ],
            "Backing has huge blind areas; minimize it and use spotters when possible.",
            [
                "Forward maneuvers are safer when feasible.",
                "Speed increases backing risk.",
                "Students behind a backing bus are in grave danger.",
            ],
            "medium",
        ),
        (
            "At a multi-lane road stop, students who must cross should:",
            "Cross only after traffic has stopped and the driver gives the crossing signal, walking far enough in front to stay in view",
            [
                "Cross behind the bus between stopped cars",
                "Cross without stopping for the driver's signal",
                "Cross diagonally behind trailers out of sight",
            ],
            "Front crossing in view is the standard; rear/out-of-sight crossing is forbidden.",
            [
                "Behind-the-bus crossing is a classic hazard.",
                "Driver signal coordinates the cross.",
                "Out-of-sight paths are unsafe.",
            ],
            "medium",
        ),
        (
            "When stopped at railroad tracks, the driver should:",
            "Open the door/window as required to look and listen for trains",
            [
                "Play loud music to mask train horns",
                "Rely only on a student lookout",
                "Close eyes and count to three",
            ],
            "Sensory checks for trains are part of school-bus RR procedure.",
            [
                "Noise defeats listening.",
                "Driver responsibility cannot be delegated to students.",
                "Looking/listening must be real.",
            ],
            "easy",
        ),
        (
            "Loading on the opposite side of the roadway requiring a student cross is:",
            "Especially hazardous—use proper signals and ensure all traffic is stopped before students enter the roadway",
            [
                "Safer than same-side loading always",
                "A reason to skip stop-arm use",
                "Allowed while the bus is still rolling",
            ],
            "Crossing students face more traffic conflict; procedures must be deliberate and complete.",
            [
                "Crossing adds risk vs same-side.",
                "Stop-arm/lights are still required.",
                "Students never board a rolling bus.",
            ],
            "hard",
        ),
        (
            "After students unload at school, before pulling away you should:",
            "Check mirrors and the danger zone carefully for late students and pedestrians",
            [
                "Leave immediately without mirror checks",
                "Assume the parking lot is empty always",
                "Rely on horn blasts instead of looking",
            ],
            "School loops are crowded; mirror/danger-zone checks prevent strike incidents.",
            [
                "Immediate departure without checks is unsafe.",
                "Assumptions cause tragedies.",
                "Horns do not replace vision.",
            ],
            "easy",
        ),
    ],
    "student-management": [
        (
            "The driver's first responsibility in an emergency is:",
            "Protect students—stop safely, assess, and follow evacuation/emergency procedures as needed",
            [
                "Save personal belongings first",
                "Argue with bystanders before securing the scene",
                "Leave students alone to find help far away without plan",
            ],
            "Life safety and orderly emergency action come before property or debate.",
            [
                "Belongings are secondary.",
                "Scene safety first.",
                "Abandonment without a plan endangers students.",
            ],
            "easy",
        ),
        (
            "If two students are fighting on the bus, you should:",
            "Stop the bus safely when needed, separate them using district-approved methods, and report the incident",
            [
                "Keep driving at highway speed while they fight",
                "Join the fight",
                "Ignore serious injury risk",
            ],
            "Safe stop and controlled intervention protect everyone; document and report.",
            [
                "Driving during a fight is unsafe.",
                "Drivers must not assault students.",
                "Injuries require response.",
            ],
            "medium",
        ),
        (
            "Evacuation drills teach students to:",
            "Leave quickly in an orderly way using designated exits without pushing",
            [
                "Grab all belongings before moving during a fire",
                "Block aisles to wait for friends",
                "Exit only through the windshield always",
            ],
            "Orderly evacuation practice saves lives when seconds matter.",
            [
                "Belongings delay escape in fire/smoke.",
                "Aisle blocking traps others.",
                "Multiple exits may be used depending on the emergency.",
            ],
            "easy",
        ),
        (
            "When a student has a medical emergency on board, the driver should:",
            "Secure the bus, request emergency help per policy, and provide appropriate first aid within training",
            [
                "Continue the route without stopping",
                "Give prescription drugs from another student",
                "Post the student's condition on social media",
            ],
            "Stop, communicate, and aid within training/policy; privacy still matters.",
            [
                "Medical emergencies need immediate stop/help.",
                "Sharing meds is dangerous/illegal.",
                "Privacy/HIPAA-like norms apply.",
            ],
            "medium",
        ),
        (
            "Weapons or suspected weapons on the bus require:",
            "Following district emergency protocols—do not attempt heroics that escalate danger",
            [
                "Physically wrestling for a firearm as the only option always",
                "Ignoring the situation",
                "Allowing students to handle the weapon to 'keep it safe'",
            ],
            "Trained protocol, communication, and law enforcement involvement take priority.",
            [
                "Untrained confrontation can be deadly.",
                "Ignoring weapons endangers all.",
                "Students must not handle weapons.",
            ],
            "hard",
        ),
        (
            "Good student management starts with:",
            "Clear rules, consistent enforcement, and respectful communication",
            [
                "Threats and humiliation as primary tools",
                "No rules posted or explained",
                "Favoritism that ignores safety rules for athletes",
            ],
            "Predictable, respectful discipline prevents chaos better than fear-based methods.",
            [
                "Humiliation is unprofessional and harmful.",
                "Rules must be known.",
                "Safety rules apply to all students.",
            ],
            "easy",
        ),
        (
            "If a student refuses to stay seated and creates a hazard, you should:",
            "Address it using approved progressive discipline; stop if safety requires",
            [
                "Speed up so they fall into the seat",
                "Physically punish the student",
                "Let them stand in the stairwell at highway speeds",
            ],
            "Safety interventions follow policy; never use dangerous driving or illegal punishment.",
            [
                "Using vehicle motion as punishment is abusive/unsafe.",
                "Corporal punishment is generally prohibited.",
                "Stairwell standing underway is extremely dangerous.",
            ],
            "medium",
        ),
        (
            "During a tornado threat while en route, guidance often includes:",
            "Seeking appropriate shelter per emergency plans rather than staying exposed on the road if directed",
            [
                "Parking on a bridge for a better view",
                "Continuing at top speed through warnings without a plan",
                "Having students film the funnel up close outside",
            ],
            "Severe-weather procedures prioritize sturdy shelter and district emergency directions.",
            [
                "Bridges are poor tornado shelter.",
                "Unplanned high speed is reckless.",
                "Students must not approach funnels.",
            ],
            "medium",
        ),
        (
            "Bus evacuation is usually warranted when:",
            "Fire, fuel leak, stalling in a dangerous location, or other conditions make staying aboard unsafe",
            [
                "Students are slightly bored",
                "You are one minute late",
                "The radio plays a song you dislike",
            ],
            "Evacuate for true hazards; unnecessary roadside evacuations can create other risks.",
            [
                "Boredom is not an evacuation trigger.",
                "Lateness alone is not.",
                "Radio preference is irrelevant.",
            ],
            "easy",
        ),
        (
            "Assigning younger students toward the front can help:",
            "Improve supervision and reduce unsafe behavior in harder-to-see areas",
            [
                "Hide misbehavior from the driver",
                "Encourage standing in the back exclusively",
                "Block the emergency exit with backpacks permanently",
            ],
            "Seating strategies support visibility and control, especially with young riders.",
            [
                "Goal is visibility, not hiding issues.",
                "Standing is unsafe.",
                "Exits must stay clear.",
            ],
            "easy",
        ),
        (
            "If you suspect a student is being bullied on the bus, you should:",
            "Intervene appropriately, document, and report per school policy",
            [
                "Encourage the bullying as toughness training",
                "Ignore repeated harassment",
                "Post videos of the bullying online",
            ],
            "Drivers are part of the school's safe climate; bullying requires action and reporting.",
            [
                "Encouraging bullying is unethical.",
                "Ignoring harm allows escalation.",
                "Public posting can retraumatize and violate policy.",
            ],
            "medium",
        ),
        (
            "In a hostile parent confrontation at the bus door, prioritize:",
            "Student safety, calm communication, and involving school administrators/law enforcement as needed",
            [
                "Arguing while students stand in traffic",
                "Allowing the parent to board and threaten students",
                "Driving away with a parent hanging on the door",
            ],
            "Do not let conflicts spill into traffic danger; use backup resources.",
            [
                "Traffic exposure during arguments is unsafe.",
                "Unauthorized threatening boarding is not allowed.",
                "Moving with someone on the door is extremely dangerous.",
            ],
            "hard",
        ),
        (
            "Emergency contact/route sheets should be:",
            "Current and available so you can communicate during incidents",
            [
                "Left at home intentionally",
                "Shared publicly on social media with student addresses",
                "Thrown away each morning",
            ],
            "Accurate operational info supports emergency response while protecting student privacy.",
            [
                "On-bus/accessible info is needed.",
                "Public address sharing endangers students.",
                "Daily destruction defeats the purpose.",
            ],
            "easy",
        ),
        (
            "If smoke appears from the engine area while students are aboard, you should:",
            "Stop in a safe place, shut down as appropriate, evacuate, and move students upwind to a safe distance",
            [
                "Keep driving to the next town 20 miles away",
                "Tell students to stay seated in thick smoke",
                "Open the fuel door to 'check'",
            ],
            "Smoke/fire risk demands evacuation away from the vehicle and traffic hazards.",
            [
                "Continuing risks catastrophe.",
                "Smoke inhalation is dangerous.",
                "Fuel-system tampering is unsafe.",
            ],
            "medium",
        ),
        (
            "Confidential student information (IEPs, medical plans shared with you) should be:",
            "Used only as needed for safe transport and kept private",
            [
                "Discussed gossip-style with other parents",
                "Posted on a public route blog",
                "Used to mock the student",
            ],
            "Drivers may need need-to-know medical/behavior info; confidentiality still applies.",
            [
                "Gossip breaches privacy.",
                "Public posting is improper.",
                "Mockery is abusive.",
            ],
            "easy",
        ),
    ],
    "rules": [
        (
            "School bus drivers are generally prohibited from:",
            "Operating with students aboard while using a hand-held phone for non-emergency chatting",
            [
                "Checking mirrors",
                "Using required warning lights",
                "Reporting hazards to dispatch",
            ],
            "Distracted driving rules are strict for passenger-carrying school buses; emergencies have narrow exceptions per law/policy.",
            [
                "Mirror use is required.",
                "Warning lights are required.",
                "Hazard reporting is appropriate.",
            ],
            "easy",
        ),
        (
            "Alcohol and drug use before driving a school bus is:",
            "Strictly prohibited—school bus drivers are held to high safety standards",
            [
                "Allowed in small amounts if students do not notice",
                "Required for calm nerves",
                "Only banned on field trips",
            ],
            "Zero-tolerance expectations protect children; impaired driving is illegal and disqualifying.",
            [
                "Any impairment is unacceptable.",
                "Drugs/alcohol worsen judgment.",
                "Bans apply to all student transport duty.",
            ],
            "easy",
        ),
        (
            "Leaving students unattended on the bus is generally:",
            "Prohibited—drivers must supervise or follow approved handoff procedures",
            [
                "Encouraged during lunch breaks downtown",
                "Fine if the keys are left in the bus",
                "Allowed if the radio is on",
            ],
            "Unattended student situations create abduction, injury, and runaway risks.",
            [
                "Students need supervision.",
                "Keys-in is worse, not better.",
                "Radio does not supervise.",
            ],
            "easy",
        ),
        (
            "Exceeding posted speed limits in a school zone because you are late is:",
            "Illegal and unsafe—lateness never justifies speeding",
            [
                "Required by CDL rules",
                "Allowed with hazard lights only",
                "Acceptable if no police are visible",
            ],
            "Speed laws protect children; schedule pressure is not a defense.",
            [
                "CDL rules do not require speeding.",
                "Hazards do not authorize speeding.",
                "Enforcement visibility is irrelevant to legality.",
            ],
            "easy",
        ),
        (
            "Railroad crossing stop exemptions for school buses:",
            "Are limited; know state rules—do not assume you may blow crossings",
            [
                "Always allow school buses to ignore all tracks",
                "Mean students should flag trains",
                "Replace the need to look and listen when a stop is required",
            ],
            "Most school buses must stop at tracks unless a specific exemption applies; still use caution.",
            [
                "Ignoring tracks is unlawful/dangerous.",
                "Students do not flag trains.",
                "Required stops include look/listen steps.",
            ],
            "medium",
        ),
        (
            "Falsifying a pre-trip inspection report is:",
            "A serious violation that can lead to termination and legal consequences",
            [
                "A best practice when late",
                "Required weekly",
                "Harmless because paperwork does not matter",
            ],
            "Inspection honesty is a safety and compliance obligation.",
            [
                "Lateness does not excuse fraud.",
                "Falsification is never required.",
                "Paperwork documents life-safety checks.",
            ],
            "medium",
        ),
        (
            "Carrying unauthorized adult passengers (not assigned) on a student route is generally:",
            "Against policy/rules unless specifically authorized",
            [
                "Always required",
                "A way to make extra money for the driver",
                "Allowed if they sit on the steps",
            ],
            "Rider authorization protects students and liability boundaries.",
            [
                "Unauthorized riders are not required.",
                "Personal profit transport is improper.",
                "Steps are not seats and block egress.",
            ],
            "easy",
        ),
        (
            "Standees in the stairwell or aisle while the bus is moving are:",
            "Prohibited—students must be properly seated as required",
            [
                "Recommended for overflow",
                "Safe if holding a friend",
                "Allowed above 50 mph only",
            ],
            "Standing in aisles/stairwells creates ejection and trampling hazards in sudden stops.",
            [
                "Overflow needs operational solutions, not standing.",
                "Holding friends is not restraint.",
                "Higher speeds make standing more dangerous.",
            ],
            "easy",
        ),
        (
            "Passing a stopped school bus with red lights/stop arm activated (from directions required to stop) is:",
            "Illegal for other motorists and extremely dangerous to students",
            [
                "Encouraged during rush hour",
                "Legal if the pass is on the right shoulder always",
                "Only a problem in other states, never yours",
            ],
            "Stop-arm violations are a leading student fatality risk; drivers should report them.",
            [
                "Rush hour does not legalize passing.",
                "Shoulder passes can still be illegal/deadly.",
                "Laws apply in your state too.",
            ],
            "easy",
        ),
        (
            "Driver hours and fatigue rules matter because:",
            "Fatigue impairs reaction time and increases crash risk with children aboard",
            [
                "Fatigue improves focus",
                "Sleep is optional for passenger endorsements",
                "Only freight drivers can get tired",
            ],
            "Rested drivers are a core safety control for student transportation.",
            [
                "Fatigue degrades performance.",
                "Rest is required for safe operation.",
                "Passenger drivers fatigue too.",
            ],
            "easy",
        ),
        (
            "Using the bus for personal errands with students aboard is:",
            "Prohibited—routes and vehicle use must follow authorized purposes",
            [
                "A fringe benefit",
                "Allowed if you buy students snacks as cover",
                "Required once per week",
            ],
            "Misuse of a school bus violates policy and can endanger students/schedule integrity.",
            [
                "Not a benefit.",
                "Snacks do not authorize misuse.",
                "Not a requirement.",
            ],
            "medium",
        ),
        (
            "If your CDL is suspended, you must:",
            "Not drive a school bus—report and follow reinstatement rules",
            [
                "Continue driving until someone notices",
                "Drive only empty buses on public roads without a CDL when a CDL is required",
                "Lend your license card to another driver",
            ],
            "Operating without required driving privileges is illegal; credential sharing is fraud.",
            [
                "Continuing is unlawful.",
                "CDL class/endorsement rules still apply.",
                "Lending credentials is illegal.",
            ],
            "medium",
        ),
        (
            "Idling policies and local rules may require drivers to:",
            "Minimize unnecessary idling for health/environmental and policy compliance",
            [
                "Idle with doors open in a closed garage for fun",
                "Ignore all posted school idling limits",
                "Rev engines to entertain students",
            ],
            "Many districts limit idling near students due to exhaust exposure.",
            [
                "Garage idling risks CO poisoning.",
                "Posted limits must be followed.",
                "Revving is unprofessional and wasteful.",
            ],
            "easy",
        ),
        (
            "Refusing a required drug/alcohol test when ordered under applicable rules can result in:",
            "Disqualification/removal from safety-sensitive functions",
            [
                "A free lunch coupon",
                "Automatic promotion",
                "No consequences ever",
            ],
            "Testing refusals are typically treated like positive results under FMCSA/employer rules.",
            [
                "Not a reward.",
                "Not a promotion path.",
                "Consequences are serious.",
            ],
            "medium",
        ),
        (
            "The school bus endorsement (S) generally requires:",
            "Passing knowledge (and skills as required) tests specific to school bus operation in addition to base CDL qualifications",
            [
                "No extra knowledge beyond a bicycle license",
                "Only a written note from a friend",
                "Owning the bus personally",
            ],
            "S endorsement validates school-bus-specific knowledge/skills beyond general CDL.",
            [
                "Bicycle licenses are insufficient.",
                "Friends' notes are not credentials.",
                "Ownership is irrelevant to endorsement.",
            ],
            "easy",
        ),
    ],
}

def main() -> None:
    write_bank(SLUG, topics)


if __name__ == "__main__":
    main()
