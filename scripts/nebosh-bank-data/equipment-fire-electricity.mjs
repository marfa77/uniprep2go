import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "Under PUWER, an employer's duty for work equipment includes ensuring:",
    "Equipment is suitable, maintained, inspected where required, and used only by trained/competent people",
    ["Any homemade tool is acceptable without assessment", "Guards may be removed permanently for speed", "Maintenance records are optional for all presses"],
    "PUWER requires suitable equipment, maintenance, inspection, and competent use with effective controls.",
    { b: "Homemade tools need assessment for suitability and safety.", c: "Guards are required unless justified risk assessment allows alternative controls.", d: "Maintenance evidence supports PUWER compliance." },
    "easy",
    rot(0)
  ),
  q(
    "A drill press guard is removed because it 'slows feeding.' The most likely PUWER breach is:",
    "Failure to prevent access to dangerous parts during operation",
    ["Excess lubrication of the chuck", "Using the wrong drill colour", "Training that is too detailed"],
    "Dangerous parts of machinery must be guarded or jigs/hold devices used unless alternative equally effective protection exists.",
    { a: "Lubrication is maintenance, not the guarding breach.", c: "Drill colour is irrelevant.", d: "Detailed training does not replace guarding." },
    "medium",
    rot(1)
  ),
  q(
    "Before lifting a 2-tonne load with a overhead crane, the operator must:",
    "Check SWL, slings, hooks, brakes, and lifting plan including exclusion zone",
    ["Exceed SWL slightly if the load is compact", "Stand under the load to steady it", "Use damaged sling if colour matches crane"],
    "Lifting operations need competent planning, equipment within SWL, and exclusion of people under suspended loads.",
    { a: "SWL must never be exceeded.", c: "Standing under suspended loads is prohibited.", d: "Damaged slings must be removed from service." },
    "hard",
    rot(2)
  ),
  q(
    "A maintenance fitter services a conveyor without isolation and lock-off. The primary risk is:",
    "Unexpected start-up causing entanglement or crushing",
    ["Improved productivity from faster belt tracking", "Reduced noise during cleaning only", "Automatic competency certification"],
    "Safe maintenance requires isolation, lock-out/tag-out, and verification of zero energy before access to dangerous parts.",
    { b: "Productivity never justifies uncontrolled energy.", c: "Noise reduction is not the hazard focus.", d: "Certification requires training, not unsafe shortcuts." },
    "medium",
    rot(3)
  ),
  q(
    "The fire triangle consists of:",
    "Fuel, oxygen (or oxidiser), and heat (ignition source)",
    ["Water, steel, and concrete only", "Smoke, foam, and CO2 exclusively", "Alarm, exit sign, and drill"],
    "Fire needs fuel, oxygen, and ignition; removing one element prevents or extinguishes fire.",
    { b: "Construction materials are not the fire triangle model.", c: "Extinguishing agents are controls, not triangle elements.", d: "Fire safety features are not the combustion model." },
    "easy",
    rot(4)
  ),
  q(
    "A Class B fire involves:",
    "Flammable liquids such as petrol, solvents, or oils",
    ["Ordinary combustible solids like wood and paper only", "Energised electrical equipment only", "Cooking oils in commercial kitchens exclusively (Class F region-dependent)"],
    "Class B covers flammable liquids; foam and dry powder are typical media (not water jets on running liquid fires).",
    { a: "Class A is ordinary combustibles.", c: "Energised electrical is Class E in some systems or requires non-conductive agents.", d: "Cooking oil deep-fat fires are often Class F; Class B is broader flammable liquids." },
    "easy",
    rot(5)
  ),
  q(
    "During fire evacuation, the assembly point should be:",
    "Clearly signed, away from building entrances, and known to all occupants from induction",
    ["Inside the car park under fuel storage", "Adjacent to the fire loading dock with LPG", "Changed secretly each drill without telling staff"],
    "Assembly points account for all personnel and keep them clear of fire spread and emergency vehicle access conflicts.",
    { a: "Fuel storage areas are unsafe assembly locations.", c: "LPG areas risk escalation near evacuees.", d: "Consistent known points are essential." },
    "medium",
    rot(6)
  ),
  q(
    "Electric shock severity is influenced most by:",
    "Current path through the body, magnitude, duration, and frequency (for AC)",
    ["Cable jacket colour only", "Distance from the substation building", "Brand of screwdriver handle"],
    "Ohm's law and body resistance determine current; path across heart increases lethality.",
    { b: "Jacket colour is identification, not shock physics.", c: "Distance from substation alone does not define shock severity.", d: "Handle brand does not replace insulation and safe isolation." },
    "medium",
    rot(7)
  ),
  q(
    "Before electrical maintenance on a motor circuit, the correct sequence is:",
    "Isolate, lock-off, test dead, and earth if required before work",
    ["Test with fingers to confirm voltage", "Rely on switch label without proving dead", "Ask a colleague to switch on to verify isolation"],
    "Safe isolation procedure proves conductors dead after isolation — core electricity syllabus for IGC.",
    { a: "Physical finger test is lethal.", c: "Labels may be wrong; testing is required.", d: "Re-energising during work causes electrocution." },
    "hard",
    rot(8)
  ),
  q(
    "Portable Appliance Testing (PAT) programmes aim to:",
    "Maintain portable electrical equipment in safe condition through inspection, testing, and repair",
    ["Eliminate the need for user visual checks", "Guarantee equipment never fails mechanically", "Replace PUWER for fixed plant"],
    "PAT complements user checks and maintenance; frequency depends on environment and equipment type.",
    { a: "Users still do pre-use visual checks.", c: "Mechanical failure is separate from electrical safety.", d: "Fixed plant remains under PUWER and wiring regs." },
    "easy",
    rot(9)
  ),
  q(
    "An RCD (residual current device) protects primarily against:",
    "Earth leakage currents that could cause electric shock and some fire risks",
    ["Mechanical jamming of conveyor belts", "Chemical spills in bunds", "Noise-induced hearing loss"],
    "RCDs detect imbalance from leakage to earth, tripping quickly to reduce shock duration.",
    { b: "Mechanical jamming needs different controls.", c: "Chemical spills are COSHH.", d: "Hearing loss is noise control." },
    "easy",
    rot(10)
  ),
  q(
    "Interlocked guard on a CNC lathe stops the chuck when opened because:",
    "It prevents access to dangerous parts while they are moving",
    ["It increases cutting speed automatically", "It replaces all operator training permanently", "It eliminates need for emergency stop"],
    "Interlocks link guard position to power — essential machinery guarding principle under PUWER.",
    { a: "Interlocks are safety, not speed optimisation.", c: "Training remains required.", d: "Emergency stops are still mandatory." },
    "medium",
    rot(11)
  ),
  q(
    "Thorough examination of a lifting accessory (chain sling) is required because:",
    "Wear, deformation, and hidden damage can cause catastrophic failure at SWL",
    ["Colour fading indicates legal expiry only", "Slings strengthen with age like wine", "Examination replaces never using slings near edges"],
    "Statutory examination detects defects invisible in daily pre-use checks.",
    { a: "Colour fade is not sole expiry criterion.", c: "Slings degrade with use.", d: "Edge protection during lifts remains necessary." },
    "medium",
    rot(12)
  ),
  q(
    "Hot work permit controls on site primarily manage:",
    "Ignition sources near combustibles during welding, cutting, or grinding",
    ["Slip hazards in canteen only", "DSE breaks for welders exclusively", "Parking violations at site gate"],
    "Hot work permits coordinate fire watch, combustible clearance, and extinguisher readiness.",
    { b: "Canteen slips are separate STF topic.", c: "DSE is unrelated to hot work ignition.", d: "Parking is not hot work focus." },
    "medium",
    rot(13)
  ),
  q(
    "A fixed machine bolted to the floor helps PUWER compliance by:",
    "Reducing unexpected movement that could alter guarding effectiveness or stability",
    ["Eliminating all vibration injuries automatically", "Removing need for maintenance", "Allowing higher speed without risk assessment"],
    "Stability of equipment is a PUWER requirement; movement can defeat guards and cause tip hazards.",
    { a: "Vibration health risks may still exist.", c: "Maintenance remains mandatory.", d: "Speed changes need risk review." },
    "easy",
    rot(14)
  ),
  q(
    "CO2 extinguishers on energised electrical fires are suitable because:",
    "CO2 is non-conductive and leaves no residue on sensitive equipment",
    ["Water jet is always best on live panels", "Foam is ideal inside switchrooms without de-energisation", "Sand is mandatory on all electrical fires globally"],
    "CO2 smothers fire without conductive residue; still prefer isolation where possible.",
    { a: "Water conducts electricity and is dangerous on live gear.", c: "Foam can conduct and damage equipment.", d: "Sand is not standard for all electrical fires." },
    "medium",
    rot(15)
  ),
  q(
    "Two-button start on a press brake requires simultaneous operation to:",
    "Keep hands clear of the closing die during the stroke",
    ["Speed the cycle by one-handed operation", "Disable emergency stop functionality", "Allow bypass during maintenance without isolation"],
    "Hold-to-run or two-hand controls prevent hands in the point of closure during normal operation.",
    { a: "One-handed operation defeats the safety function.", c: "Emergency stop must remain active.", d: "Maintenance requires isolation, not control bypass in production mode." },
    "hard",
    rot(16)
  ),
  q(
    "Fire spread via combustible cladding on a building exterior is primarily a:",
    "Fuel and ignition pathway issue requiring material selection and compartmentation review",
    ["Noise control deficiency only", "Manual handling TILE issue exclusively", "DSE lighting problem"],
    "External fire spread involves fuel continuity and ignition — fire safety strategy and materials matter.",
    { b: "Noise is unrelated.", c: "Manual handling is unrelated.", d: "DSE is unrelated." },
    "hard",
    rot(17)
  ),
  q(
    "Permit-to-work for electrical isolation should record:",
    "Points isolated, locks applied, tester identity, time, and handback procedure",
    ["Only the electrician's favourite tool", "Canteen lunch menu", "Unrelated HR grievance notes"],
    "Documentation ensures traceability and safe reinstatement after maintenance.",
    { a: "Personal tools are not the permit focus.", c: "HR notes are irrelevant.", d: "Lunch menu is irrelevant." },
    "medium",
    rot(18)
  ),
  q(
    "A forklift truck used as a lifting platform for people (non-integrated cage) is:",
    "Generally prohibited or highly restricted because it is not designed for personnel lift without proper MEWP",
    ["Encouraged if workers hold the mast", "Safe if forks are wrapped in tape", "Preferred over scissor lifts always"],
    "Forklifts are primarily for materials; personnel elevation needs designed work platforms and risk assessment.",
    { a: "Holding mast is not a safe platform.", c: "Tape does not create a personnel platform.", d: "MEWPs designed for people are preferred." },
    "medium",
    rot(19)
  ),
  q(
    "Emergency lighting in escape routes must:",
    "Illuminate paths when normal lighting fails, supporting safe evacuation",
    ["Replace fire detection systems", "Operate only during fire drills never in real outages", "Be decorative only without duration rating"],
    "Emergency lighting supports egress; maintained luminaires and testing are legal expectations.",
    { a: "Detection and lighting serve different functions.", c: "Real power failures require emergency lighting.", d: "Duration and lux levels are specified." },
    "easy",
    rot(20)
  ),
  q(
    "Arc flash risk during switchgear work is reduced by:",
    "De-energising, arc-rated PPE if live work unavoidable, and remote racking where possible",
    ["Wearing metal jewellery to ground the panel", "Opening panels without face protection for visibility", "Using water spray on energised busbars"],
    "Arc flash controls prioritise de-energisation and specialised PPE/procedures for justified live work.",
    { a: "Metal jewellery increases burn/injury risk.", c: "Unprotected face exposure to arc is lethal.", d: "Water on energised equipment is extremely dangerous." },
    "hard",
    rot(21)
  ),
  q(
    "PUWER inspection of a pressure vessel mounting includes checking:",
    "Guards, safety valves, mounting integrity, and compliance with written scheme where applicable",
    ["Only paint gloss level", "Office carpet colour nearby", "Whether operators enjoy using it"],
    "Pressure systems need integrity of mountings, safety devices, and statutory examination schemes.",
    { a: "Paint may indicate corrosion but gloss alone is insufficient.", c: "Carpet is irrelevant.", d: "Enjoyment is not a PUWER criterion." },
    "medium",
    rot(22)
  ),
  q(
    "Fire warden responsibilities during evacuation include:",
    "Sweeping assigned areas, assisting mobility-impaired persons, reporting status to coordinator",
    ["Fighting every fire alone before evacuating others", "Collecting personal laptops before leaving", "Re-entering to finish emails"],
    "Wardens support orderly evacuation and area clearance; firefighting is only if trained and safe within role.",
    { a: "Untrained solo firefighting endangers life.", c: "Property retrieval delays evacuation.", d: "Re-entry before all-clear is unsafe." },
    "easy",
    rot(23)
  ),
  q(
    "Extension lead coiled fully while powering a heater risks:",
    "Overheating the cable due to reduced heat dissipation and inductive effects",
    ["Improved electrical efficiency always", "Automatic RCD upgrade", "Elimination of fire triangle fuel"],
    "Coiled cables can overheat under load, creating ignition sources — common PAT/ electricity scenario.",
    { a: "Coiling under load increases resistance heating.", c: "RCD does not upgrade automatically.", d: "Fuel may still be present from combustibles nearby." },
    "medium",
    rot(24)
  ),
  q(
    "Maintenance on a hydraulic press requires:",
    "Isolation of energy, blocking/supporting ram, bleed pressure, and controlled reinstatement",
    ["Opening relief valve while hands in die", "Trusting pressure gauge from 1998 without check", "Removing guards to see leaks better during operation"],
    "Stored energy in hydraulics can cause sudden movement; isolation and blocking are critical.",
    { a: "Hands in die during pressure release is lethal.", c: "Gauge verification is part of safe isolation.", d: "Guards should remain; isolation before access." },
    "hard",
    rot(25)
  ),
  q(
    "Class A fire extinguishing media include:",
    "Water or foam suitable for ordinary combustible solids",
    ["CO2 as primary choice on deep seated smouldering paper stock", "Water on energised electrical cabinet", "Metal powder on wood pallets only"],
    "Class A materials (wood, paper, textiles) are fought with water/foam; deep-seated fires need prolonged application.",
    { b: "CO2 may not penetrate deep Class A smoulder.", c: "Water on live electrics is unsafe.", d: "Metal powder is for Class D metals." },
    "easy",
    rot(26)
  ),
  q(
    "A tower crane overload indicator triggers. The operator should:",
    "Stop the lift, reassess load weight and rigging, and not override safety device",
    ["Bypass indicator to meet schedule", "Swing load faster to reduce moment", "Increase radius to test limit"],
    "Safety devices on lifting equipment must not be overridden; reassess planning and load.",
    { a: "Bypassing defeats statutory safety design.", c: "Faster swing increases dynamic loads.", d: "Increasing radius increases moment and risk." },
    "medium",
    rot(27)
  ),
  q(
    "Electricity at work regulations emphasise:",
    "Systems constructed, maintained, and used to prevent danger, with competence and isolation for work",
    ["Working live as default for efficiency", "DIY wiring by untrained staff to save cost", "Ignoring corrosion on outdoor feeds"],
    "Prevent danger through design, maintenance, competence, and safe isolation — live work only when justified.",
    { a: "Live work is exception, not default.", c: "Untrained electrical work is unlawful and unsafe.", d: "Corrosion can cause failure and shock." },
    "easy",
    rot(28)
  ),
  q(
    "Fixed guards on a conveyor return roller are preferable when:",
    "Access is infrequent and guard removal for maintenance can be planned with isolation",
    ["Operators need daily hand contact with roller", "Guard removal takes longer than 2 seconds occasionally", "Belt speed is zero during cleaning without lock-off"],
    "Fixed guards suit infrequent access; frequent access may need interlocked guards with isolation procedures.",
    { a: "Hand contact with nip points must be prevented.", c: "Occasional removal may still suit interlocked systems.", d: "Zero speed without lock-off is unreliable." },
    "medium",
    rot(29)
  ),
  q(
    "Fire detection and alarm system weekly test should:",
    "Trigger a call point or detector zone and confirm alarm audibility at representative locations",
    ["Disable system until annual contractor visit only", "Test only the fire panel LCD brightness", "Silence alarms permanently to reduce noise complaints"],
    "Weekly tests verify basic function; full servicing is periodic by competent person.",
    { a: "Weekly user tests complement professional service.", c: "LCD test does not confirm audibility.", d: "Silencing defeats life safety function." },
    "medium",
    rot(30)
  ),
  q(
    "PAT failure on a kettle lead with exposed copper requires:",
    "Remove from service, repair or replace, and retest before return",
    ["Tape over damage and return immediately", "Use only if user accepts shock risk", "Move to wet outdoor area without RCD"],
    "Failed appliances must not be used until made safe and verified.",
    { a: "Tape is inadequate repair for conductors.", c: "Users cannot waive electrical safety.", d: "Wet areas need RCD protection and safe equipment." },
    "easy",
    rot(31)
  ),
  q(
    "Lifting equipment LOLER thorough examination timing is driven by:",
    "Statutory intervals, examination scheme, and events like damage or overload",
    ["Paint colour change of the hook", "Operator birthday", "Random social media poll"],
    "LOLER requires thorough examination by competent person per schedule and after exceptional circumstances.",
    { b: "Paint change is not a LOLER trigger.", c: "Personal dates are irrelevant.", d: "Polls are not compliance tools." },
    "medium",
    rot(32)
  ),
  q(
    "Combustible dust in a flour mill can cause:",
    "Explosive atmospheres and deflagration if ignited with adequate concentration and confinement",
    ["Only slip hazards without fire risk", "Improved LEV without ignition control", "Automatic Class A rating only"],
    "Dust explosions need fuel-air mix, ignition, and confinement — process fire safety and housekeeping critical.",
    { a: "Dust also creates STF but explosion is major risk.", c: "LEV helps but ignition sources must be controlled.", d: "Dust explosions are not Class A water scenarios." },
    "hard",
    rot(33)
  ),
  q(
    "Safe use of an isolator for maintenance means:",
    "Lock in off position, prove dead on load side, and communicate with all affected workers",
    ["Leave isolator accessible to anyone to toggle", "Isolate upstream only while working live on load", "Remove warning tags to tidy panel"],
    "Lock-out/tag-out prevents re-energisation; proving dead confirms isolation effectiveness.",
    { a: "Open access allows accidental re-energisation.", c: "Working live on load side with upstream isolation only is unsafe if multiple feeds exist.", d: "Tags warn against re-energisation." },
    "hard",
    rot(34)
  ),
  q(
    "PUWER requires controls to be:",
    "Clearly marked, positioned for safe operation, and not cause additional hazard",
    ["Hidden behind guards during normal operation without interlocks", "Identical unlabeled for all machines", "Operable only by standing in nip point"],
    "Control design and marking support safe operation and emergency response.",
    { a: "Hidden controls impede emergency stop unless interlocked design allows.", c: "Labels identify function especially emergencies.", d: "Controls must not require exposure to dangerous parts." },
    "medium",
    rot(35)
  ),
  q(
    "Foam extinguisher on a solvent pool fire works by:",
    "Separating fuel surface from oxygen with foam blanket and cooling where applicable",
    ["Increasing oxygen concentration at surface", "Conducting electricity into the pool", "Exploding to disperse solvent safely without training"],
    "Foam smothers flammable liquid fires; choose type suitable for polar solvents where needed.",
    { a: "Foam reduces oxygen contact, not increases.", c: "Conductivity depends on type; wrong foam on electrics is unsafe.", d: "Extinguishers require trained selection and use." },
    "medium",
    rot(36)
  ),
  q(
    "Pre-use check of a chainsaw under PUWER includes:",
    "Chain brake function, sharpness, guards, fuel system integrity, and PPE availability",
    ["Removing chain brake to reduce weight", "Disabling dead-man switch for comfort", "Using without eye/leg protection if experienced"],
    "Chainsaws need functional safety devices and PPE; experience does not remove need for controls.",
    { a: "Chain brake prevents kickback injury.", c: "Dead-man switch is essential safety feature.", d: "PPE is required regardless of experience." },
    "easy",
    rot(37)
  ),
  q(
    "Electrical portable tools on construction sites should:",
    "Be 110V centre-tapped to earth where practicable, RCD protected, and visually checked",
    ["Use damaged casings if tape applied", "Bypass RCD to stop nuisance tripping always", "Share one extension through water puddles"],
    "Reduced voltage and RCD use lower shock risk on harsh sites; conditions demand robust inspection.",
    { a: "Damaged casings expose conductors.", c: "Nuisance trips indicate fault investigation, not bypass.", d: "Water increases conductance and shock risk." },
    "medium",
    rot(38)
  ),
  q(
    "Fire compartmentation in a building aims to:",
    "Limit fire and smoke spread, protecting escape routes and property",
    ["Increase smoke spread for early detection only", "Remove all fire doors for open plan aesthetics", "Replace evacuation planning entirely"],
    "Compartment walls/doors hold fire for designed periods, supporting life safety strategy.",
    { a: "Smoke spread endangers occupants; detection complements compartmentation.", c: "Fire doors are part of compartmentation.", d: "Evacuation remains essential." },
    "easy",
    rot(39)
  ),
  q(
    "A nip point between meshing gears requires:",
    "Fixed or interlocked guard preventing access to the mesh zone",
    ["Warning sticker only while gears run unguarded", "Loose clothing encouraged for comfort", "Frequent hand lubrication while running"],
    "Nip points cause entanglement; guarding is primary PUWER control.",
    { a: "Stickers do not prevent contact.", c: "Loose clothing increases entanglement.", d: "Hand lubrication while running risks amputation." },
    "easy",
    rot(40)
  ),
  q(
    "After maintenance, reinstatement of machine guarding should occur:",
    "Before power is restored and before operators resume production",
    ["After a week's trial without guards", "Only if an auditor visits", "Never if guards slow output"],
    "Guards must be refitted and checked before normal operation resumes.",
    { a: "Trial without guards accepts unmanaged risk.", c: "Auditor presence is not the trigger.", d: "Production speed does not waive guarding." },
    "medium",
    rot(41)
  ),
  q(
    "Static electricity ignition in a solvent filling area is controlled by:",
    "Bonding and earthing, conductive footwear/floors, humidity control, and exclusion of ignition sources",
    ["Wearing insulating soles only", "Increasing flow velocity without grounding", "Using plastic containers without earthing"],
    "Bonding/earthing prevents static buildup discharges in flammable atmospheres.",
    { a: "Insulating soles can allow charge accumulation.", c: "High flow can generate static.", d: "Plastic containers need earthing/bonding in flammable filling." },
    "hard",
    rot(42)
  ),
  q(
    "LOLER lifting plan for a complex lift should address:",
    "Load weight, centre of gravity, crane capacity, wind, rigging, exclusion zone, and communication",
    ["Only the operator's lunch preference", "Colour of hi-vis vests exclusively", "Social media posting schedule"],
    "Complex lifts need documented planning beyond routine simple lifts.",
    { b: "Lunch is irrelevant to lift engineering.", c: "Hi-vis is PPE but plan needs engineering factors.", d: "Social media is irrelevant." },
    "hard",
    rot(43)
  ),
  q(
    "User weekly fire alarm test responsibility often lies with:",
    "Employer-appointed competent person or fire warden following procedure",
    ["Any visitor to the building without training", "Only the fire service during real fires", "Insurance broker annually without user tests"],
    "Routine tests are employer duty; fire service responds to real incidents.",
    { a: "Untrained visitors should not test life safety systems.", c: "Fire service does not replace weekly user tests.", d: "Insurance does not conduct weekly tests." },
    "easy",
    rot(44)
  ),
  q(
    "Double insulation symbol on a Class II drill means:",
    "No reliance on earth wire; basic insulation plus supplementary insulation or equivalent",
    ["Must be used only underwater", "Requires daily PAT by law every use", "Eliminates all shock risk in all conditions"],
    "Class II tools lack earth pin; design prevents accessible parts becoming live — still avoid damage and wet misuse.",
    { a: "Water misuse remains dangerous.", c: "PAT frequency is risk-based, not necessarily every use.", d: "Damage or misuse can still create danger." },
    "medium",
    rot(45)
  ),
  q(
    "Emergency stop devices on machinery must be:",
    "Easily accessible, clearly identifiable, and override start functions until reset",
    ["Hidden to prevent misuse", "Slower to activate than production start", "Disabled during maintenance without isolation"],
    "E-stops provide quick cessation of dangerous motion; reset should not automatically restart hazardous movement.",
    { a: "Accessibility is mandatory.", c: "Must not be slower than start — quick access required.", d: "Maintenance uses isolation; e-stop not substitute." },
    "medium",
    rot(46)
  ),
  q(
    "Fire evacuation for mobility-impaired occupants may require:",
    "Personal emergency evacuation plans (PEEPs) and refuge areas with communication",
    ["Abandoning all upper floors without assistance planning", "Using lifts as first option during all fires", "No communication from refuge points"],
    "PEEPs tailor assistance, refuge, and communication for those who cannot evacuate quickly unaided.",
    { a: "Assistance planning is required, not abandonment.", c: "Lifts are generally not used in fire unless specially designed evacuation lifts.", d: "Refuge communication guides rescue." },
    "hard",
    rot(47)
  ),
  q(
    "Risk assessment for woodworking circular saw should cover:",
    "Blade guard, riving knife, push stick, dust extraction, training, and maintenance",
    ["Only the operator's shoe size", "Canteen opening hours exclusively", "Whether wood is sustainably sourced only"],
    "Saw assessments address contact, kickback, dust, and noise — PUWER and COSHH interfaces.",
    { b: "Shoe size is not primary.", c: "Canteen hours unrelated.", d: "Sustainability is environmental, not immediate guarding focus." },
    "medium",
    rot(48)
  ),
  q(
    "Integrating electrical safety with maintenance planning means:",
    "Scheduling isolation windows, competent persons, spares for guards, and testing before return to service",
    ["Running production alongside unguarded maintenance for efficiency", "Skipping dead test to save 30 seconds", "Using unqualified staff to reset RCD repeatedly without fault finding"],
    "Planned maintenance embeds isolation, competence, and verification — aligning PUWER and electricity regs.",
    { a: "Unguarded running maintenance is unsafe.", c: "Dead test is essential.", d: "Repeated RCD trips indicate faults needing investigation." },
    "medium",
    rot(49)
  ),
];
