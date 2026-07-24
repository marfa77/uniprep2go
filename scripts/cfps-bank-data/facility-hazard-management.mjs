import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "A Process Hazard Analysis (PHA) under OSHA PSM is required to be completed:",
    "Before startup of a covered process and revalidated at least every five years",
    ["Only after the first reportable incident", "Once during initial design with no further review", "Annually by the local fire marshal exclusively"],
    "OSHA 1910.119 requires PHA prior to startup and at least every five years, and when changes warrant.",
    { b: "Initial-only analysis misses operational learning and modifications.", c: "Fire marshal review does not replace employer PHA obligations.", d: "Waiting for an incident defeats the preventive purpose of PHA." },
    "medium",
    rot(0)
  ),
  q(
    "Which PHA methodology systematically examines guide words applied to process parameters and deviations?",
    "HAZOP (Hazard and Operability Study)",
    ["Checklist inspection of fire extinguishers", "What-if brainstorming without structured nodes", "Failure Mode and Effects Analysis of individual components only"],
    "HAZOP uses guide words (e.g., MORE, LESS, NO) at study nodes to identify deviations, causes, consequences, and safeguards.",
    { b: "What-if lacks HAZOP's formal guide-word/node structure.", c: "FMEA focuses on component failures, not systematic process deviation review.", d: "Extinguisher checklists are maintenance tasks, not PHA methods." },
    "easy",
    rot(1)
  ),
  q(
    "In a HAZOP study, the team typically includes:",
    "A multidisciplinary group with process, operations, engineering, and safety representation plus a trained facilitator",
    ["Only the plant manager and insurance adjuster", "External media observers without process knowledge", "A single design engineer working alone"],
    "Effective HAZOP relies on diverse expertise and an independent facilitator to manage the structured review.",
    { b: "Insurance input may supplement but does not replace operations and engineering knowledge.", c: "Observers without expertise cannot meaningfully assess deviations.", d: "Solo review misses critical operational and maintenance perspectives." },
    "easy",
    rot(2)
  ),
  q(
    "A HAZOP guide word of 'NO' applied to the parameter 'FLOW' in a reactor feed line would prompt review of:",
    "Complete loss of feed flow and its potential causes and consequences",
    ["Excessive flow above design maximum only", "Color change of the product stream", "Ambient humidity variation outside the building"],
    "Guide words explore deviations from design intent; NO/FLOW examines zero-flow scenarios such as valve closure or pump failure.",
    { b: "Excessive flow is typically examined with MORE or HIGH guide words.", c: "Product color is not the parameter tied to the FLOW node.", d: "Ambient humidity is unrelated unless explicitly defined as a parameter." },
    "medium",
    rot(3)
  ),
  q(
    "HAZOP study documentation should include for each credible deviation:",
    "Causes, consequences, existing safeguards, and recommendations for additional protection where needed",
    ["Only a list of employee names who attended", "Estimated construction cost of the original plant", "Marketing plans for finished product"],
    "Actionable HAZOP records tie deviations to risk reduction measures and track recommendations to closure.",
    { b: "Attendance alone does not capture hazard findings.", c: "Capital cost history does not document risk controls.", d: "Marketing content is outside process safety scope." },
    "medium",
    rot(4)
  ),
  q(
    "What-if analysis is most appropriately used when:",
    "A less formal, brainstorming-style hazard review is needed for smaller or well-understood processes",
    ["Replacing all PHA requirements for major covered processes without documentation", "Eliminating the need for any operating procedures", "Satisfying sprinkler hydraulic calculations"],
    "What-if is a recognized PHA method using structured questioning but is less rigorous than HAZOP for complex processes.",
    { b: "Major PSM processes still require documented PHA meeting OSHA criteria.", c: "Operating procedures remain required regardless of PHA method.", d: "Hydraulic calculations are water supply engineering, not hazard analysis." },
    "medium",
    rot(5)
  ),
  q(
    "A effective what-if session begins by:",
    "Describing the process, boundaries, and key hazards, then posing 'what if' scenarios for each step",
    ["Voting on production quotas before any hazard discussion", "Deleting prior incident reports to avoid bias", "Testing fire pumps before identifying scenarios"],
    "What-if analysis builds scenarios from process understanding—equipment failure, human error, external events—and evaluates consequences.",
    { b: "Production quotas do not structure hazard brainstorming.", c: "Prior incidents inform credible scenarios and should be reviewed.", d: "Pump testing is unrelated to the analytical session format." },
    "easy",
    rot(6)
  ),
  q(
    "Compared to HAZOP, what-if analysis generally:",
    "Is less structured and may be faster but can miss subtle deviations without experienced facilitation",
    ["Requires more guide words and formal nodes than HAZOP", "Is mandated by NFPA 400 for all chemical storage", "Eliminates the need for a multidisciplinary team"],
    "What-if trades HAZOP's systematic guide-word rigor for flexibility; quality depends heavily on team experience.",
    { b: "NFPA 400 addresses hazardous materials storage, not PHA method selection.", c: "Multidisciplinary input remains valuable for what-if reviews.", d: "What-if is less structured than HAZOP, not more." },
    "hard",
    rot(7)
  ),
  q(
    "When selecting a PHA methodology for a new highly interconnected unit with numerous control loops, the best choice is usually:",
    "HAZOP because its node-by-node systematic approach suits complex process interactions",
    ["A single-question what-if review lasting 30 minutes", "Visual inspection of paint condition on vessels", "Review of cafeteria menu options for shift workers"],
    "Complex processes benefit from HAZOP's structured examination of parameters, deviations, and safeguards at defined nodes.",
    { b: "Brief what-if may inadequately cover interconnected controls.", c: "Paint inspection does not analyze process deviations.", d: "Cafeteria menus are unrelated to process hazard identification." },
    "hard",
    rot(8)
  ),
  q(
    "An emergency action plan for a chemical facility must address:",
    "Procedures for reporting emergencies, evacuation, accounting for personnel, rescue, and coordination with responders",
    ["Only quarterly profit targets and stock valuation", "Preferred parking assignments for executives", "Routine calibration of office thermostats"],
    "OSHA 1910.38 and good practice require documented emergency procedures, communication, and roles for credible scenarios.",
    { b: "Financial metrics are not emergency response elements.", c: "Parking assignments do not substitute for emergency procedures.", d: "Office HVAC calibration is unrelated to emergency planning." },
    "easy",
    rot(9)
  ),
  q(
    "Facility emergency planning should identify:",
    "Assembly areas, communication methods, shutdown procedures, and interfaces with local emergency services",
    ["Only the color scheme for safety posters", "Annual holiday schedule", "Preferred vendor for office supplies"],
    "Effective plans specify how to notify, evacuate or shelter, shut down hazardous processes, and hand off to responders.",
    { b: "Poster colors do not define response procedures.", c: "Holiday schedules are administrative, not emergency planning content.", d: "Office supply vendors are outside emergency scope." },
    "easy",
    rot(10)
  ),
  q(
    "During emergency planning for a toxic gas release, the primary protection strategy for on-site personnel when evacuation is impractical is:",
    "Shelter-in-place in a pre-identified refuge area with controlled ventilation shutoff",
    ["Opening all windows and doors to dilute the plume indoors", "Continuing normal production until the shift ends", "Gathering at the fence line closest to the release point"],
    "Shelter-in-place uses sealed or low-leakage areas to reduce exposure when timely evacuation is not feasible.",
    { b: "Increasing ventilation can draw contaminated air inside.", c: "Continuing production exposes workers unnecessarily.", d: "Fence-line assembly near the release increases exposure." },
    "medium",
    rot(11)
  ),
  q(
    "An on-site emergency response drill should evaluate:",
    "Activation of alarms, decision-making, communication, evacuation or shelter, and coordination with outside agencies",
    ["Only whether coffee was available in the break room", "Speed of completing unrelated maintenance tickets", "Whether visitors signed the guest log"],
    "Drills test whether plans work in practice—notification, leadership decisions, mustering, and responder interface.",
    { b: "Maintenance ticket metrics do not validate emergency response.", c: "Guest logs are administrative and not drill performance criteria.", d: "Break room amenities are irrelevant to response effectiveness." },
    "medium",
    rot(12)
  ),
  q(
    "Mutual aid agreements in industrial emergency planning are intended to:",
    "Formalize shared resources, capabilities, and communication with neighboring facilities and responders",
    ["Eliminate the need for any on-site emergency equipment", "Transfer all legal liability to the fire department", "Replace employee training with signed paperwork alone"],
    "Mutual aid clarifies who provides specialized equipment, foam, or personnel during large incidents.",
    { b: "On-site capabilities remain necessary; aid supplements capacity.", c: "Liability is not automatically transferred by agreements.", d: "Paperwork without training and equipment does not ensure response." },
    "hard",
    rot(13)
  ),
  q(
    "NFPA 400 primarily addresses:",
    "Fire safety for storage, use, and handling of hazardous materials in all occupancies",
    ["Only residential smoke alarm placement", "Structural wind loads on communication towers", "Swimming pool filtration chemistry exclusively"],
    "NFPA 400 consolidates requirements for classified hazardous materials storage and handling across occupancy types.",
    { b: "Residential smoke alarms are covered by other NFPA documents.", c: "Wind loads are structural engineering standards, not NFPA 400.", d: "Pool chemistry is outside NFPA 400 hazardous materials scope." },
    "easy",
    rot(14)
  ),
  q(
    "Under NFPA 400, hazardous materials are classified primarily by:",
    "Hazard categories such as flammable, oxidizing, corrosive, and water-reactive characteristics",
    ["Brand name and manufacturer marketing tier", "Color of the shipping carton only", "Distance from the nearest cafeteria"],
    "Classification drives maximum quantities, separation, sprinkler design, and storage methods.",
    { b: "Brand tiers are not code classification bases.", c: "Carton color does not define chemical hazard class.", d: "Cafeteria proximity is not a hazardous material classification factor." },
    "medium",
    rot(15)
  ),
  q(
    "Indoor storage of Class I flammable liquids in NFPA 400 is controlled by:",
    "Quantity limits per control area, fire-resistance ratings, ventilation, and automatic sprinkler requirements",
    ["Unlimited storage if containers are labeled", "Exemption from sprinklers when stored below eye level", "Permission to store in any exit enclosure for convenience"],
    "NFPA 400 limits quantities and mandates construction and protection features based on hazard class and storage arrangement.",
    { b: "Labeling alone does not remove quantity and protection rules.", c: "Exit enclosures cannot be used for hazardous material storage.", d: "Sprinkler requirements depend on hazard and quantity, not shelf height alone." },
    "medium",
    rot(16)
  ),
  q(
    "When incompatible hazardous materials share a storage area, NFPA 400 requires:",
    "Separation by distance, barriers, or separate rooms per compatibility requirements",
    ["Commingling if both are in original manufacturer containers", "Storage on the same pallet wrapped in plastic", "Mixing small quantities to reduce container count"],
    "Incompatible materials such as oxidizers and flammables must be segregated to prevent reaction during storage incidents.",
    { b: "Original containers do not eliminate incompatibility risk.", c: "Plastic wrap does not provide required separation.", d: "Mixing incompatible materials creates immediate reaction hazard." },
    "hard",
    rot(17)
  ),
  q(
    "Outdoor storage of oxidizers under NFPA 400 should consider:",
    "Separation from combustible construction, drainage to avoid contaminating other materials, and exposure to weather controls",
    ["Placement against combustible wood fences to save space", "Covering drainage paths to pool rainwater with oxidizers", "Stacking directly on unprotected asphalt without spacing"],
    "Outdoor oxidizer storage requires separation from fuels, compatible containers, and management of spills and weather exposure.",
    { b: "Combustible fences increase fire spread risk to oxidizer storage.", c: "Pooled water can spread contamination and damage containers.", d: "Spacing and surface protection are required for safe outdoor storage." },
    "hard",
    rot(18)
  ),
  q(
    "Industrial occupancies under NFPA 101 are generally characterized by:",
    "Operations involving fabrication, assembly, or processing of materials with occupant loads and hazards distinct from mercantile or storage uses",
    ["Exclusive use as overnight sleeping quarters for the public", "Low hazard office work only with no equipment", "Agricultural barns with no powered machinery"],
    "Industrial occupancies include factories and workshops where production equipment and materials create specific egress and protection requirements.",
    { b: "Office-only work typically falls under business occupancies.", c: "Public sleeping quarters are assembly or residential uses.", d: "Agricultural structures may fall under other occupancy classifications." },
    "easy",
    rot(19)
  ),
  q(
    "In a general industrial occupancy, automatic sprinklers are commonly required when:",
    "Building area or fire load exceeds thresholds in NFPA 101 for that occupancy subclass",
    ["The building has fewer than four windows", "All employees wear safety glasses", "The owner prefers paint color white"],
    "Sprinkler mandates depend on occupancy type, area, height, and hazard classification—not superficial building traits.",
    { b: "Safety glasses are PPE, not a sprinkler trigger.", c: "Window count alone does not determine sprinkler requirements.", d: "Paint color has no bearing on sprinkler mandates." },
    "medium",
    rot(20)
  ),
  q(
    "High-hazard industrial occupancies differ from ordinary industrial occupancies primarily in:",
    "Greater fuel loading, rapid fire growth potential, and stricter construction and protection requirements",
    ["Lower occupant load factors and reduced egress attention", "Exemption from all fire alarm requirements", "Permission to eliminate all means of egress"],
    "High-hazard industrial uses involve materials or processes with elevated fire or explosion potential requiring enhanced safeguards.",
    { b: "Egress requirements remain critical, often more stringent.", c: "Fire alarms are typically required, not waived.", d: "Means of egress cannot be eliminated." },
    "medium",
    rot(21)
  ),
  q(
    "Combustible dust-producing industrial operations should integrate occupancy provisions with:",
    "NFPA 652 dust hazard analysis and applicable NFPA commodity/process standards",
    ["Only aesthetic interior design guidelines", "Unrestricted open burning on the production floor", "Removal of all ventilation to keep dust inside"],
    "Industrial occupancy controls must align with dust hazard management—containment, housekeeping, ignition control, and explosion protection.",
    { b: "Open burning is prohibited in industrial production areas.", c: "Ventilation strategies must control, not arbitrarily eliminate, dust dispersion.", d: "Interior design does not address dust explosion risk." },
    "hard",
    rot(22)
  ),
  q(
    "NFPA 241 applies to:",
    "Fire safety during construction, alteration, and demolition of buildings and structures",
    ["Only finished occupied hospitals after certificate of occupancy", "Residential kitchen recipe standards", "Calibration of laboratory pH meters"],
    "NFPA 241 establishes construction fire prevention programs, hot work controls, and protection of life and property during building projects.",
    { b: "Occupied hospitals follow other NFPA occupancy standards post-CO.", c: "Kitchen recipes are unrelated to construction fire safety.", d: "pH meter calibration is laboratory equipment maintenance." },
    "easy",
    rot(23)
  ),
  q(
    "The Fire Prevention Program Manager (FPPM) role under NFPA 241 is responsible for:",
    "Implementing and enforcing the site fire safety plan, permits, and coordination during construction",
    ["Approving structural steel metallurgy for all beams", "Selecting paint colors for the owner lobby", "Writing payroll checks for subcontractors"],
    "The FPPM administers hot work, housekeeping, standpipe readiness, and liaison with AHJ on the construction site.",
    { b: "Structural metallurgy is engineering design scope.", c: "Lobby finishes are design choices, not FPPM duties.", d: "Payroll is administrative HR, not fire prevention management." },
    "medium",
    rot(24)
  ),
  q(
    "During construction, standpipes and water supplies should be:",
    "Available and maintained as construction progresses in accordance with NFPA 241 staged requirements",
    ["Removed until the project is 100% complete", "Used only for contractor lunch cleanup", "Blocked to prevent accidental sprinkler discharge"],
    "NFPA 241 requires progressive installation and use of fire protection water supplies as building height and area increase.",
    { b: "Domestic misuse does not replace required fire protection readiness.", c: "Removing standpipes delays firefighting capability.", d: "Blocking required supplies violates construction fire safety plans." },
    "medium",
    rot(25)
  ),
  q(
    "Combustible formwork and scaffolding during construction should be managed by:",
    "Limiting accumulation, prohibiting unnecessary storage on scaffolds, and expediting removal when no longer needed",
    ["Adding extra plywood reserves on scaffolds for future unknown projects", "Storing propane cylinders on scaffold platforms for convenience", "Leaving oily rags bundled on formwork overnight near hot work"],
    "Construction debris and combustible materials increase fire load; NFPA 241 emphasizes housekeeping and controlled storage.",
    { b: "Propane on scaffolds creates ignition and fall hazards.", c: "Oily rags near hot work risk spontaneous ignition.", d: "Excess scaffold storage adds fuel and obstructs egress." },
    "hard",
    rot(26)
  ),
  q(
    "Hot work during building alteration under NFPA 241 requires:",
    "Permits, area preparation, fire watch, and coordination with the FPPM and applicable AHJ provisions",
    ["No controls if performed after 5 p.m.", "Only a verbal okay from any subcontractor laborer", "Elimination of all portable fire extinguishers to reduce cost"],
    "Construction hot work follows permit programs paralleling NFPA 51B concepts under the site-specific NFPA 241 plan.",
    { b: "Verbal approval without formal permit and preparation is inadequate.", c: "Extinguishers are required resources, not cost-cutting targets.", d: "Time of day does not waive hot work controls." },
    "hard",
    rot(27)
  ),
  q(
    "LPG (liquefied petroleum gas) storage vessels should be located:",
    "Outdoors or in approved locations with separation from exposures per NFPA 58 and site AHJ requirements",
    ["Directly against building exits to shorten piping runs", "Inside unventilated occupied office suites", "Underground beneath emergency assembly points without marking"],
    "NFPA 58 specifies separation distances from buildings, property lines, and ignition sources for LPG containers and systems.",
    { b: "Occupied unventilated spaces are prohibited for LPG storage.", c: "Blocking exits with vessels impairs egress and increases risk.", d: "Underground placement still requires code compliance and surface marking." },
    "easy",
    rot(28)
  ),
  q(
    "Relief valves on LPG containers are designed to:",
    "Discharge vapor if internal pressure exceeds safe limits due to heat exposure or overfilling",
    ["Increase tank pressure for higher delivery rates", "Seal permanently after the first minor pressure rise", "Replace the need for any separation distance"],
    "Pressure relief protects containers from rupture during fire exposure; separated storage still remains necessary.",
    { b: "Increasing pressure beyond design is unsafe and not a relief valve function.", c: "Relief devices must remain operable, not sealed.", d: "Separation distances are independent requirements." },
    "medium",
    rot(29)
  ),
  q(
    "During a fire exposing an LPG tank, responders and site personnel should primarily:",
    "Cool exposed containers with water streams from a safe distance while preventing BLEVE conditions if possible",
    ["Approach closely to read the nameplate serial number", "Turn off relief valves to stop venting", "Puncture the tank to vent all product immediately"],
    "Water cooling reduces heat input and pressure rise; interfering with relief devices or puncturing tanks increases catastrophic failure risk.",
    { b: "Closing relief valves can cause catastrophic rupture.", c: "Close approach during impingement exposes personnel to BLEVE.", d: "Uncontrolled puncturing releases large flammable volumes instantly." },
    "hard",
    rot(30)
  ),
  q(
    "LPG vapor is heavier than air, so leak monitoring and emergency planning should:",
    "Account for accumulation in low areas, trenches, and basements near the storage and piping",
    ["Assume rapid dispersion to the upper atmosphere only", "Ignore drains and pits as collection points", "Ventilate only roof peaks without considering floor-level traps"],
    "LPG vapors can flow to low points and create flammable atmospheres distant from the leak source.",
    { b: "Low-area accumulation is a primary LPG vapor concern.", c: "Drains and pits are common vapor collection points.", d: "High-only ventilation may miss ground-level concentrations." },
    "medium",
    rot(31)
  ),
  q(
    "Cylinder storage of LPG should include:",
    "Upright securing, protection from vehicle impact, separation from oxidizers, and ventilation",
    ["Horizontal stacking unsecured in exit corridors", "Storage in direct sunlight inside sealed vehicles with no ventilation", "Placement blocking fire department access routes"],
    "Cylinder storage practices under NFPA 58 limit quantities indoors, require securing, and protect against physical damage.",
    { b: "Exit corridor storage blocks egress and increases risk.", c: "Sealed hot vehicles can overpressure and trap vapors.", d: "Blocking FD access delays emergency response." },
    "hard",
    rot(32)
  ),
  q(
    "Warehouse rack storage fire risk is most increased when:",
    "Commodity classification is underestimated and aisle widths or sprinkler design do not match actual storage height and arrangement",
    ["Steel racking is grounded and bolted per manufacturer instructions", "Adequate aisle maintenance and sprinkler clearance are maintained", "Commodity classification matches tested sprinkler design criteria"],
    "Misclassified commodities or changed storage arrays can exceed sprinkler design limits, leading to uncontrolled fire spread.",
    { b: "Proper grounding and bolting are good practices, not risk increasers.", c: "Maintained aisles and clearance support sprinkler performance.", d: "Matching classification to design controls risk appropriately." },
    "medium",
    rot(33)
  ),
  q(
    "In-rack sprinklers in warehouse storage are provided to:",
    "Control or suppress fire within the rack structure where ceiling sprinklers alone may not penetrate storage arrays",
    ["Decorate aisles with red pipe for visibility only", "Replace the need for any ceiling sprinkler system", "Support holiday lighting strings on pallet loads"],
    "In-rack sprinklers deliver water into rack voids and flue spaces per NFPA 13 design for high-piled and rack storage.",
    { b: "Ceiling systems are typically still required in combination designs.", c: "Decorative use misstates life-safety purpose.", d: "Lighting attachments on loads create ignition and obstruction hazards." },
    "easy",
    rot(34)
  ),
  q(
    "Longitudinal flue spaces in rack storage refer to:",
    "Vertical openings along the row length between loads that allow heat venting and sprinkler water penetration",
    ["Horizontal tunnels under the warehouse floor slab", "Office cubicle partitions in the shipping department", "Roof skylight arrangements only"],
    "Flue spaces are critical for rack storage fire control; blocking them with solid loads impairs sprinkler discharge and fire growth venting.",
    { b: "Floor slab tunnels are unrelated to rack flue definitions.", c: "Office cubicles are not rack flue spaces.", d: "Skylights are roof features, not rack longitudinal flues." },
    "medium",
    rot(35)
  ),
  q(
    "When warehouse rack storage height increases above the originally designed sprinkler system:",
    "A fire protection engineer should reevaluate commodity classification, clearance, and sprinkler design per NFPA 13",
    ["No action is needed if aisles remain painted yellow", "Solid decking should be added to block all flue spaces", "Ceiling sprinklers automatically adapt without review"],
    "Storage array changes can outpace original design; reanalysis ensures adequate density and penetration.",
    { b: "Aisles paint color does not validate hydraulic adequacy.", c: "Blocking flue spaces typically worsens fire spread.", d: "Sprinklers do not self-adjust; engineering review is required." },
    "hard",
    rot(36)
  ),
  q(
    "Chemical process safeguards such as interlocks and safety instrumented systems (SIS) are intended to:",
    "Automatically move the process to a safe state when critical parameters exceed defined limits",
    ["Maximize production rate beyond all equipment limits", "Disable all alarms to reduce nuisance notifications", "Replace mechanical integrity and operator training entirely"],
    "Safeguards provide independent protection layers—shutdown, isolation, venting—when sensors detect unsafe conditions.",
    { b: "Alarm disablement removes essential operator awareness.", c: "Mechanical integrity and training remain foundational PSM elements.", d: "Exceeding equipment limits contradicts safe state design." },
    "medium",
    rot(37)
  ),
  q(
    "A pressure relief system on a reactor protects against:",
    "Overpressure from runaway reactions, blocked outlets, or external fire exposure",
    ["Routine operator shift changes", "Minor fluctuations in office HVAC temperature", "Warehouse inventory cycle counting"],
    "Relief devices vent or rupture disks relieve excess pressure to prevent vessel failure during credible upset scenarios.",
    { b: "Office HVAC changes do not drive reactor overpressure.", c: "Inventory counting is unrelated to pressure protection.", d: "Shift changes are operational, not overpressure causes." },
    "easy",
    rot(38)
  ),
  q(
    "Emergency isolation valves in chemical processes should be:",
    "Accessible, clearly identified, tested per procedure, and positioned to stop hazardous flow during credible release scenarios",
    ["Hidden behind permanent storage to prevent tampering", "Welded in the fully open position to save maintenance", "Operated only during annual company picnics"],
    "Isolation valves enable rapid source control during leaks; concealment or welding defeats emergency use.",
    { b: "Welding open prevents isolation during emergencies.", c: "Recreational events are not valve exercise programs.", d: "Hiding valves delays emergency response." },
    "hard",
    rot(39)
  ),
  q(
    "Layer of Protection Analysis (LOPA) in chemical facilities is used to:",
    "Quantify whether independent protection layers reduce risk to tolerable levels for specific scenarios",
    ["Select cafeteria menu items for night shift", "Determine marketing slogans for finished products", "Replace all mechanical maintenance indefinitely"],
    "LOPA evaluates initiating events, consequences, and IPL effectiveness with order-of-magnitude risk estimates.",
    { b: "Marketing slogans are unrelated to risk quantification.", c: "Maintenance remains essential for safeguard reliability.", d: "Food service is outside process safety analysis." },
    "hard",
    rot(40)
  ),
  q(
    "Management of Change (MOC) in PSM-covered processes is required when:",
    "A change affects process chemicals, technology, equipment, or procedures beyond replacement-in-kind",
    ["An identical replacement part from the same manufacturer specification is installed", "Employees wear a different color uniform without process impact", "The parking lot is repaved with the same materials"],
    "MOC ensures changes are reviewed for safety impacts, documentation updates, and training before implementation.",
    { b: "Uniform color without process impact is not a covered change.", c: "Parking lot paving unrelated to process does not trigger MOC.", d: "Replacement-in-kind exclusions apply when specifications match." },
    "medium",
    rot(41)
  ),
  q(
    "An effective MOC review should answer:",
    "What could go wrong, what safeguards are needed, who must be trained, and what documents require updating",
    ["Only whether the change saves money in the current quarter", "Whether social media was notified of the paint color", "If the change can bypass all operator review secretly"],
    "MOC examines safety, health, environmental impacts, and ensures procedures, P&IDs, and training reflect the change.",
    { b: "Cost alone does not satisfy safety review requirements.", c: "Social media notification is irrelevant to MOC.", d: "Secret bypass undermines PSM intent and is prohibited." },
    "easy",
    rot(42)
  ),
  q(
    "A temporary hose connection bypassing a critical interlock for a weekend trial requires:",
    "Formal MOC authorization with hazard analysis, approval, duration limits, and restoration verification",
    ["No review if production management verbally agrees", "Permanent adoption without documentation if results look good", "Immediate removal of the interlock from all future designs without study"],
    "Even temporary changes affecting safeguards need documented review and controlled restoration.",
    { b: "Verbal agreement alone does not meet MOC requirements.", c: "Undocumented permanency skips required safety review.", d: "Removing interlocks globally requires full engineering analysis." },
    "hard",
    rot(43)
  ),
  q(
    "If a PHA recommendation is closed by installing a new safeguard, MOC should ensure:",
    "The change is documented, operators trained, and P&IDs and procedures updated before relying on the safeguard",
    ["Operators discover the new safeguard only after an incident", "Documentation is intentionally omitted to speed startup", "Training is deferred indefinitely because the safeguard is automatic"],
    "Closing PHA items through changes ties into MOC—implementation, training, and document control must align.",
    { b: "Omitting documentation violates PSM and undermines future reviews.", c: "Operators must understand automatic safeguards and their limits.", d: "Post-incident discovery is unacceptable for new protections." },
    "medium",
    rot(44)
  ),
  q(
    "Pre-startup safety review (PSSR) complements MOC by verifying before operation that:",
    "Construction and changes meet design, safeguards are functional, procedures are ready, and training is complete",
    ["Only the company logo on uniforms is correct", "Production may begin without checking relief devices", "Emergency plans may remain outdated until the first drill next year"],
    "PSSR confirms readiness—equipment installed correctly, safety systems tested, and personnel prepared.",
    { b: "Relief device functionality is essential PSSR content.", c: "Outdated emergency plans leave known gaps at startup.", d: "Uniform logos are unrelated to safety readiness." },
    "medium",
    rot(45)
  ),
  q(
    "An emergency shutdown (ESD) system in a chemical plant differs from routine operational shutdown because ESD:",
    "Rapidly places the process in a safe state in response to abnormal conditions without normal sequencing delays",
    ["Gradually optimizes product quality over several hours", "Schedules maintenance for next fiscal quarter only", "Adjusts office lighting based on occupancy sensors"],
    "ESD prioritizes hazard mitigation—stopping feeds, isolating equipment, venting pressure—over production continuity.",
    { b: "Quality optimization is operational, not emergency safety.", c: "Maintenance scheduling is unrelated to ESD function.", d: "Office lighting controls are building automation, not process ESD." },
    "medium",
    rot(46)
  ),
  q(
    "For warehouse rack storage of Group A plastics in cartons, fire protection design should reference:",
    "NFPA 13 commodity classification and storage arrangement criteria for uncartoned/cartoned plastics",
    ["Only the forklift paint color in the loading dock", "Residential bedroom furniture placement guides", "Swimming pool chemical test kit instructions"],
    "Group A plastics present high heat release; NFPA 13 classification drives sprinkler density, K-factor, and in-rack needs.",
    { b: "Residential furniture guides do not govern warehouse rack plastics.", c: "Pool test kits are unrelated to storage classification.", d: "Forklift paint is irrelevant to commodity classification." },
    "hard",
    rot(47)
  ),
  q(
    "Construction site fire watch responsibilities under NFPA 241 include:",
    "Monitoring hot work areas, maintaining extinguishers accessible, and notifying the FPPM of unsafe conditions",
    ["Approving structural engineering calculations", "Authorizing payroll for all trades", "Disabling fire alarms to prevent noise complaints"],
    "Fire watch supports the FPPM by observing ignition hazards during and after hot work and maintaining initial attack capability.",
    { b: "Payroll authorization is outside fire watch duties.", c: "Disabling alarms removes critical life-safety notification.", d: "Structural calculations are engineering design tasks." },
    "easy",
    rot(48)
  ),
  q(
    "Integrating PHA, MOC, and emergency planning best ensures that:",
    "Identified hazards have safeguards, changes are reviewed before implementation, and responders know current process risks",
    ["Each program operates in isolation without document sharing", "Emergency plans never reference chemical inventories", "PHA findings can be ignored if production deadlines are tight"],
    "Linked programs maintain current risk understanding—from analysis through changes to response planning.",
    { b: "Ignoring PHA for deadlines violates PSM and increases catastrophic risk.", c: "Isolation prevents responders from knowing current hazards.", d: "Plans must reflect actual chemicals and scenarios on site." },
    "hard",
    rot(49)
  ),
];
