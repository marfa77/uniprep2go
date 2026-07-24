import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "A cleaner mixes bleach and acid-based descaler in a toilet bowl, producing chlorine gas. The immediate priority is:",
    "Evacuate and ventilate the area, ensure affected people get fresh air and medical help, and review COSHH controls",
    ["Continue cleaning to finish the shift quickly", "Add hot water to neutralise the reaction without ventilation", "Store the mixture for reuse tomorrow"],
    "Incompatible chemicals can release toxic gases; emergency response is evacuation, ventilation, medical care, and investigation of COSHH failures.",
    { b: "Continuing exposure worsens harm.", c: "Adding water may accelerate reaction; untrained neutralisation is unsafe.", d: "Reusing toxic mixtures is hazardous and illegal." },
    "hard",
    rot(0)
  ),
  q(
    "Before using a new solvent, an employer must ensure workers have access to:",
    "A current Safety Data Sheet (SDS) with hazards, controls, PPE, and emergency measures",
    ["Only the supplier marketing brochure", "Verbal rumours from previous sites", "A blank notebook for guesswork"],
    "COSHH requires hazard information via SDS and risk assessment before use of hazardous substances.",
    { b: "Marketing material omits detailed hazard data.", c: "Rumours are not reliable hazard communication.", d: "SDS are mandatory reference documents." },
    "easy",
    rot(1)
  ),
  q(
    "Local Exhaust Ventilation (LEV) on a welding bench fails airflow tests. The best action is:",
    "Take the LEV out of service until repaired, use alternative controls, and notify workers",
    ["Ignore the test because welding continues regardless", "Redirect fumes toward other workers to dilute them", "Remove filters to increase noise instead of airflow"],
    "LEV must be maintained and examined; failed extraction requires repair or substitute controls to prevent inhalation exposure.",
    { a: "Continuing without effective LEV increases fume exposure.", c: "Redirecting fumes endangers others.", d: "Filter removal worsens capture, not noise management." },
    "medium",
    rot(2)
  ),
  q(
    "A warehouse aisle has pallet wrap trailing on the floor near a blind corner. The primary hazard category is:",
    "Slip and trip from poor housekeeping in a pedestrian route",
    ["Work at height from the wrap height alone", "Confined space because the aisle is narrow", "Biological agent from cardboard dust only"],
    "Trailing materials on floors at corners are classic slip/trip hazards requiring housekeeping and design controls.",
    { b: "Wrap on floor is not a height issue.", c: "Aisle width alone does not define confined space.", d: "Cardboard dust may be nuisance but trailing wrap is trip focus." },
    "easy",
    rot(3)
  ),
  q(
    "A maintenance worker climbs a fragile roof without edge protection or crawl boards. The most suitable control hierarchy step missed is:",
    "Avoid work on the fragile surface or use collective fall prevention such as guarded walkways",
    ["Issue sunglasses to reduce glare only", "Rely on luck because the task is quick", "Use a longer ladder without tie-off"],
    "Work at height hierarchy prioritises avoiding fragile roofs, then edge protection, then personal fall protection with planning.",
    { a: "Glare protection does not prevent falls.", c: "Luck is not a control measure.", d: "Ladders require proper use and may be unsuitable for fragile roofs." },
    "medium",
    rot(4)
  ),
  q(
    "Entry into a tank that previously held solvent residue requires:",
    "Confined space risk assessment, gas testing, ventilation, permit-to-work, standby person, and rescue plan",
    ["Opening the hatch and starting work if it smells faintly sweet", "Solo entry with only a mobile phone torch", "Painting the outside while ignoring atmosphere inside"],
    "Confined spaces need atmospheric testing, isolation, permits, communication, and rescue arrangements before entry.",
    { a: "Odour is unreliable; toxic atmospheres may be odourless.", c: "Solo entry without gas test is high risk.", d: "External painting does not make internal atmosphere safe." },
    "hard",
    rot(5)
  ),
  q(
    "A security guard patrols alone at night on a remote site with no communication check-in. The employer should:",
    "Assess lone working risks, provide reliable communication, emergency procedures, and periodic welfare checks",
    ["Assume low crime means zero OH&S risk", "Prohibit the guard from reporting incidents", "Remove lighting to save energy without assessment"],
    "Lone workers face delayed assistance if injured; risk assessment covers violence, health emergencies, and communication.",
    { a: "Lone working risk exists independent of crime rates.", c: "Incident reporting must remain available.", d: "Lighting removal can increase violence and trip risks." },
    "medium",
    rot(6)
  ),
  q(
    "Welfare facilities for construction workers must include:",
    "Toilets, washing with hot/cold water, drinking water, and changing/drying areas where needed",
    ["Only a single cold tap shared by 200 workers indefinitely", "No facilities until project completion", "Food service exclusively for managers"],
    "Construction welfare regulations expect adequate sanitation, hydration, and rest support proportionate to workforce size.",
    { a: "Inadequate facilities breach welfare standards.", c: "Facilities are required during work, not only at end.", d: "Welfare applies to all workers, not managers only." },
    "easy",
    rot(7)
  ),
  q(
    "A laboratory stores cultures of unknown respiratory pathogens. The primary control framework is:",
    "Biological agents risk assessment with containment level, training, vaccination where applicable, and emergency procedures",
    ["COSHH ignored because cultures are invisible", "Eating at the bench to save time", "Open windows only without containment review"],
    "Biological hazards require assessment of exposure routes, containment, hygiene, and health surveillance per biosafety principles.",
    { a: "Invisibility does not remove COSHH/biosafety duties.", c: "Eating in labs increases ingestion risk.", d: "Ventilation alone may be insufficient without containment level." },
    "hard",
    rot(8)
  ),
  q(
    "An SDS shows a substance with H317 (may cause allergic skin reaction). Suitable controls include:",
    "Gloves compatible with the substance, hygiene facilities, substitution review, and health surveillance if needed",
    ["Bare-hand application to test sensitivity", "Stronger concentration to finish faster", "Disposing of SDS to reduce paperwork"],
    "Sensitisers need skin protection, hygiene, possible substitution, and surveillance for occupational dermatitis.",
    { a: "Deliberate skin contact is unsafe.", c: "Higher concentration increases exposure.", d: "SDS must be retained and accessible." },
    "medium",
    rot(9)
  ),
  q(
    "A worker slips on a wet floor in a entrance lobby during rain. The best combination of controls is:",
    "Entrance matting, regular mopping, warning signs when wet, and slip-resistant flooring where feasible",
    ["Remove mats to expose smooth tile", "Ban rain near the building", "Only discipline the worker who slipped"],
    "Weather-related wet floors need prevention (mats, drainage), maintenance, and temporary signage — not blame alone.",
    { a: "Removing mats increases tracked-in water hazard.", c: "Weather cannot be banned.", d: "Investigation should examine controls, not only individual fault." },
    "easy",
    rot(10)
  ),
  q(
    "When planning work on a flat roof with a 2 m unprotected edge, the preferred control is:",
    "Collective edge protection or parapet meeting standards before work proceeds",
    ["Single restraint lanyard without anchor assessment as first choice", "Work parallel to the edge for speed", "Rely on verbal caution only"],
    "Collective protection (guardrails, nets where appropriate) is higher in the work at height hierarchy than personal systems alone.",
    { b: "Personal fall protection may be secondary when collective is feasible.", c: "Proximity to edge increases fall likelihood.", d: "Verbal caution is administrative and weak alone." },
    "medium",
    rot(11)
  ),
  q(
    "A confined space standby person's duties include:",
    "Maintaining communication, preventing unauthorised entry, and initiating emergency procedures without entering if unsafe",
    ["Entering immediately without breathing apparatus to rescue alone", "Leaving site for a break during active entry", "Operating machinery inside the space to speed work"],
    "Standby monitors the entry, keeps log, and coordinates rescue — often must not enter without proper rescue team and equipment.",
    { a: "Solo rescue without BA/training can become a second victim.", c: "Standby must remain available during entry.", d: "Machinery operation is not a standby function." },
    "hard",
    rot(12)
  ),
  q(
    "COSHH assessment for a paint spraying booth should verify:",
    "Ventilation capture velocity, respiratory protection, skin protection, fire risk, and SDS compliance",
    ["Only the paint colour matching brand guidelines", "Parking spaces for visitors", "Canteen menu allergens exclusively"],
    "Spraying creates inhalation and dermatitis risks plus flammable atmospheres — LEV and RPE are typical controls.",
    { b: "Colour is not the primary hazard focus.", c: "Parking is unrelated.", d: "Food allergens are separate from spray COSHH." },
    "medium",
    rot(13)
  ),
  q(
    "A lone retail worker closing the store at midnight faces cash-handling robbery risk. Controls include:",
    "Two-person closing where possible, panic alarm, safe visibility, training, and police liaison",
    ["Maximum cash kept on person to speed banking", "Blind corners with no CCTV review", "Prohibition on reporting near-misses"],
    "Lone working risk assessment covers violence, cash procedures, communication, and environmental design.",
    { a: "Excess cash increases robbery incentive.", c: "CCTV and layout review support deterrence.", d: "Reporting enables trend analysis and control." },
    "medium",
    rot(14)
  ),
  q(
    "Biological laundry workers handling soiled linen should receive:",
    "Training on infection routes, PPE, hygiene, vaccination where recommended, and spill procedures",
    ["No training because linen looks clean when folded", "Reuse of damaged gloves indefinitely", "Eating in the sorting area to save time"],
    "Healthcare and laundry biological risks need hygiene discipline and PPE against contact and aerosol routes.",
    { a: "Soiled linen can harbour pathogens when contaminated.", c: "Damaged PPE must be replaced.", d: "Eating in sorting areas increases ingestion risk." },
    "easy",
    rot(15)
  ),
  q(
    "An LEV hood is positioned too far from a grinding wheel. The consequence is:",
    "Reduced capture efficiency allowing airborne dust to escape into the worker's breathing zone",
    ["Improved extraction because distance increases suction magically", "Elimination of all fire risk", "Automatic hearing protection"],
    "LEV must be positioned to capture contaminants at source; poor placement defeats extraction.",
    { b: "Distance reduces capture, not improves it.", c: "Dust and fire risks remain.", d: "LEV does not provide hearing protection." },
    "medium",
    rot(16)
  ),
  q(
    "Trip hazards on a construction site stairway are best controlled by:",
    "Clear treads, handrails, adequate lighting, cable management, and housekeeping inspections",
    ["Leaving tools on steps for convenience", "Removing handrails to widen perceived space", "Using stairs as material storage"],
    "Stairways need clear routes, support, light, and ban on storage — frequent STF focus in IGC scenarios.",
    { a: "Tools on steps are classic trip hazards.", c: "Handrails prevent falls on stairs.", d: "Storage on stairs blocks escape and causes trips." },
    "easy",
    rot(17)
  ),
  q(
    "For work at height using a mobile elevating work platform (MEWP), key requirements include:",
    "Operator training, harness/lanyard where required, ground conditions survey, and exclusion zone below",
    ["Extra passengers standing on guardrails for reach", "Use on slopes beyond manufacturer limits without assessment", "Ignore overhead obstructions because MEWPs are compact"],
    "MEWP use needs competent operators, suitable ground, fall prevention where specified, and overhead/underside hazard checks.",
    { a: "Standing on guardrails defeats fall protection.", c: "Slope limits are critical for stability.", d: "Overhead crushing and power lines are major MEWP risks." },
    "hard",
    rot(18)
  ),
  q(
    "A sewage maintenance team may be exposed to hydrogen sulphide in chambers. Controls include:",
    "Gas detection, ventilation, trained entry procedures, PPE/RPE, and emergency rescue",
    ["Smell-based entry because H2S is always obvious at lethal levels", "Solo descent without communication", "Ignition sources encouraged to test atmosphere"],
    "H2S can cause rapid unconsciousness; gas testing and confined space procedures are mandatory — odour is unreliable at high concentrations.",
    { a: "H2S odour fatigue occurs; lethal levels may not be smelled.", c: "Solo entry delays rescue.", d: "Ignition sources create explosion risk in sewers." },
    "hard",
    rot(19)
  ),
  q(
    "Under COSHH, a workplace exposure limit (WEL) breach means:",
    "Exposure must be reduced below the WEL using the hierarchy of control and monitoring may be required",
    ["Workers must tolerate exceedance if production is urgent", "WELs are optional guidance with no action", "Only PPE is allowed — engineering forbidden"],
    "WELs are legal maximums; exceedance triggers review and stronger controls to reduce exposure.",
    { a: "Production does not override WEL compliance.", c: "WELs are enforceable where applicable.", d: "Engineering and substitution are preferred before PPE." },
    "medium",
    rot(20)
  ),
  q(
    "A night cleaner works alone in a multi-storey office. Which welfare/control pairing is most appropriate?",
    "Lone worker check-in system, lighting, safe chemical use training, and access to toilets on site",
    ["Locked fire exits to prevent intruders during cleaning", "Unlabelled decanted chemicals for easier carrying", "No breaks to finish faster on every floor"],
    "Lone cleaning combines chemical COSHH, STF in dim areas, and welfare — fire exits must remain usable.",
    { a: "Locking fire exits compromises escape.", c: "Decanting without labeling breaches COSHH.", d: "Breaks manage fatigue and chemical exposure duration." },
    "medium",
    rot(21)
  ),
  q(
    "Spill of concentrated acid in a bunded store requires:",
    "PPE, contain spill kit use, ventilate, neutralise or absorb per procedure, dispose as hazardous waste, investigate cause",
    ["Hosing into drain without assessment", "Ignoring bund because liquid is contained forever", "Mixing with unknown chemicals to see reaction"],
    "Chemical spills need trained response, containment, safe neutralisation/absorption, and waste disposal per SDS.",
    { a: "Drain disposal may be illegal and hazardous.", c: "Bunds can fail or overflow; spills need active management.", d: "Uncontrolled mixing is dangerous." },
    "medium",
    rot(22)
  ),
  q(
    "A worker trips on uneven paving between site cabins. Who should act first on control?",
    "The employer/main contractor coordinating site housekeeping and ground maintenance",
    ["Only the injured worker's family doctor", "The weather service exclusively", "Insurance company before any physical fix"],
    "Employers must maintain workplaces and traffic routes in good order — uneven surfaces are foreseeable STF hazards.",
    { b: "Medical care treats injury but employer fixes hazard.", c: "Weather may contribute but maintenance remains duty.", d: "Insurance does not replace hazard control." },
    "easy",
    rot(23)
  ),
  q(
    "Scaffold inspection tags show the scaffold is incomplete. Work at height on it should:",
    "Not proceed until a competent person completes erection and issues positive inspection",
    ["Proceed on the completed lower lifts only without tag review", "Remove tags to avoid confusion", "Climb incomplete standards to save ladder carry"],
    "Scaffolds require competent erection, inspection, and tagging before use — incomplete structures are unsafe.",
    { a: "Partial use without formal inspection is unsafe.", c: "Removing tags hides status.", d: "Climbing incomplete scaffold risks collapse." },
    "medium",
    rot(24)
  ),
  q(
    "Legionella risk in site temporary water systems is controlled by:",
    "Avoiding stagnant water, temperature control, flushing, and competent water system management",
    ["Never flushing unused outlets for months", "Storing warm water in hoses in full sun only", "Assuming biological risk applies only to hospitals"],
    "Stagnant warm water supports Legionella; site welfare tanks and hoses need management like permanent systems.",
    { a: "Stagnation increases bacterial growth.", c: "Warm stagnant hoses are high risk.", d: "Legionella can affect any poorly managed water system." },
    "hard",
    rot(25)
  ),
  q(
    "A farmer enters a grain silo to clear a blockage while auger is energised. The critical errors include:",
    "Confined space engulfment/mechanical hazards without isolation, atmosphere test, and permit",
    ["Wearing hi-vis vest only", "Working during daylight hours only", "Using a wooden shovel exclusively"],
    "Silo entry involves engulfment, dust explosion, and machinery risks — isolation and confined space procedures are essential.",
    { b: "Hi-vis does not address engulfment or auger.", c: "Daylight does not make atmosphere or machinery safe.", d: "Tool material alone does not control major risks." },
    "hard",
    rot(26)
  ),
  q(
    "Which SDS section is most useful for selecting emergency spill response?",
    "Section on accidental release measures and fire-fighting measures",
    ["Section on transport advertising slogans only", "Section listing competitor products", "Section on office desk ergonomics"],
    "SDS accidental release and fire sections guide containment, PPE, and incompatibilities during emergencies.",
    { b: "Marketing slogans are not in SDS spill guidance.", c: "Competitor lists are irrelevant to response.", d: "Ergonomics sections are not standard SDS focus for spills." },
    "easy",
    rot(27)
  ),
  q(
    "Fall through a fragile skylight during roof maintenance is prevented best by:",
    "Using marked crawl boards, barriers, or working from below/alternative access avoiding the fragile panel",
    ["Walking on unmarked glass panels to distribute weight evenly", "Leaning over fragile panels while tethered incorrectly", "Removing skylights without edge protection on the opening"],
    "Fragile surfaces need identification, barriers, covers, or avoidance — classic IGC work at height scenario.",
    { a: "Assuming even weight distribution is unsafe on unidentified fragility.", c: "Incorrect tethering may not prevent fall through.", d: "Openings create new fall edges." },
    "medium",
    rot(28)
  ),
  q(
    "Exposure to blood on sharp contaminated waste requires:",
    "No hand contact, sharps container, training on biological routes, and incident reporting for potential BBV exposure",
    ["Squeezing waste into general bin to save cost", "Mouth pipetting in waste area", "Ignoring splash because uniform looks clean"],
    "Sharps and bloodborne virus risk need segregation, PPE, and post-exposure protocols.",
    { a: "General waste mixing increases injury and infection risk.", c: "Mouth pipetting is prohibited in labs and waste contexts.", d: "Invisible contamination still poses BBV risk." },
    "medium",
    rot(29)
  ),
  q(
    "A COSHH inventory helps an organisation by:",
    "Listing substances used, locations, quantities, and linking to assessments and SDS",
    ["Hiding substances from regulators during visits", "Replacing risk assessments entirely", "Eliminating the need for LEV maintenance"],
    "Inventory supports assessment review, emergency planning, and audit of hazardous substances on site.",
    { a: "Concealment breaches legal duties.", c: "Assessment remains required per substance/process.", d: "LEV still needs maintenance and test." },
    "easy",
    rot(30)
  ),
  q(
    "Trip on trailing extension cable in a workshop is reduced by:",
    "Overhead routing, cable covers in walkways, cordless tools where feasible, and housekeeping rules",
    ["Running cables diagonally across main doors", "Coiling excess cable loosely in walkways", "Increasing cable count without management"],
    "Cable management is a standard STF control in workshops and events.",
    { a: "Doorways are high traffic; cables there increase trips.", c: "Loose coils are trip hazards.", d: "More unmanaged cables worsen risk." },
    "easy",
    rot(31)
  ),
  q(
    "Lone working policy should define:",
    "High-risk tasks prohibited alone, check-in intervals, escalation if contact lost, and training",
    ["Unlimited solo confined space entry for efficiency", "No communication technology provided", "Penalty if worker requests assistance"],
    "Policies set prohibited tasks, communication, and emergency escalation for lone workers.",
    { a: "Confined space entry should not be routine lone work.", c: "Communication is core to lone worker safety.", d: "Assistance requests must be encouraged." },
    "medium",
    rot(32)
  ),
  q(
    "LEV statutory thorough examination is required because:",
    "Performance can degrade invisibly while workers believe they are protected",
    ["LEV eliminates all chemical hazards permanently without maintenance", "Examination replaces operator training", "Filters never clog on dusty processes"],
    "Thorough examination verifies airflow and capture; degraded LEV gives false confidence.",
    { a: "LEV reduces exposure but needs maintenance; not all hazards eliminated.", c: "Training remains necessary.", d: "Filters clog and need replacement." },
    "medium",
    rot(33)
  ),
  q(
    "Work at height using ladders is acceptable when:",
    "Risk assessment shows low duration/light work and ladders are secured, inspected, and used by trained staff",
    ["Always preferred over scaffolding for any task", "Used horizontally as a platform between two trucks", "Three workers on one ladder for speed"],
    "Ladders are for short-duration light work where risk assessment justifies; misuse as platforms or overcrowding is unsafe.",
    { a: "Scaffold or MEWP may be required for longer/heavier tasks.", c: "Horizontal ladder use is prohibited.", d: "Overloading ladders causes collapse." },
    "medium",
    rot(34)
  ),
  q(
    "Welfare on a demolition site should consider:",
    "Dusty work requiring washing, hearing rest areas, potable water, and separate clean eating space",
    ["Single toilet for 150 workers without maintenance", "Eating in the demolition zone to save walking time", "No drinking water to reduce toilet need"],
    "Demolition welfare must address dust, noise, hydration, and hygiene with maintained facilities.",
    { a: "Inadequate toilet provision breaches welfare.", c: "Eating in demolition zone increases ingestion of dust.", d: "Hydration is mandatory." },
    "easy",
    rot(35)
  ),
  q(
    "A biological spill in a clinic procedure room requires:",
    "Absorb with appropriate kit, disinfect per protocol, PPE, waste segregation, and exposure review for staff",
    ["Mop into corridor without disinfectant", "Ignore if spill is small because viruses are harmless", "Compress waste into personal bag for home disposal"],
    "Biological spill procedures protect staff and others via disinfectant, PPE, and clinical waste routes.",
    { a: "Spreading contamination increases exposure.", c: "Small spills still need disinfection.", d: "Clinical waste must use approved containers." },
    "medium",
    rot(36)
  ),
  q(
    "COSHH substitution means:",
    "Replacing a hazardous substance or process with a less hazardous one where reasonably practicable",
    ["Using a more toxic chemical because it is cheaper", "Removing all labels to simplify storage", "Substituting training with hope"],
    "Substitution is high in COSHH hierarchy — less hazardous products or processes reduce exposure potential.",
    { b: "Cheaper more toxic choice contradicts substitution.", c: "Labels are required for hazard communication.", d: "Training complements but does not substitute substances." },
    "easy",
    rot(37)
  ),
  q(
    "Fall from a mezzanine edge where pallets overhang the void is controlled by:",
    "Edge protection, pallet placement rules, signage, and supervision of loading activity",
    ["Overhang pallets for forklift convenience without barriers", "Remove signage to reduce visual clutter", "Allow pedestrians under loading area without exclusion"],
    "Mezzanine edges need guarding and safe loading practices to prevent falls and dropped object strikes.",
    { a: "Overhang without protection increases fall and drop risk.", c: "Signage warns of edge hazards.", d: "Exclusion zones protect pedestrians below." },
    "medium",
    rot(38)
  ),
  q(
    "Monitoring personal exposure to isocyanate paint mist may involve:",
    "Air sampling, biological monitoring where appropriate, and comparison with WEL",
    ["Taste testing the paint for sweetness", "Assuming PPE means no measurement needed ever", "Measuring only warehouse temperature"],
    "Isocyanates are potent sensitisers; exposure monitoring validates control effectiveness beyond assuming PPE works.",
    { a: "Taste testing is unsafe and invalid.", c: "PPE failure and skin routes still need assessment.", d: "Temperature does not measure isocyanate exposure." },
    "hard",
    rot(39)
  ),
  q(
    "Slip risk in a commercial kitchen is increased by:",
    "Grease on floors, wet surfaces, poor footwear policy, and inadequate cleaning schedule",
    ["Non-slip footwear policy with cleaning regime", "Grease traps maintained regularly", "Dry mop of spillages during service"],
    "Kitchen STF risks come from grease/water and footwear; controls include cleaning, mats, and suitable shoes.",
    { b: "Non-slip shoes reduce risk.", c: "Grease trap maintenance limits floor contamination.", d: "Prompt spill cleaning reduces slips." },
    "easy",
    rot(40)
  ),
  q(
    "Confined space 'permit issuer' must verify:",
    "Isolation, atmospheric tests, rescue arrangements, and competence before signing",
    ["Only that paperwork colour matches folder", "That entry can proceed without gas detector calibration", "That lunch break was skipped"],
    "Permit issuers confirm precautions are live — not merely paperwork completion.",
    { a: "Cosmetic paperwork checks are insufficient.", c: "Calibrated gas detection is essential.", d: "Meal breaks relate to welfare, not permit technical checks." },
    "hard",
    rot(41)
  ),
  q(
    "A lone engineer visits domestic boilers in tenants' homes. Risk controls include:",
    "Lone worker traceability, violence/assault awareness, safe entry procedures, and mobile communication",
    ["Hiding identity to surprise tenants", "No appointment system to increase unpredictability", "Cash-only payments in unsafe locations without policy"],
    "Domestic lone work faces variable environments and violence risk; traceability and training are key.",
    { a: "Identity concealment can increase confrontation.", c: "Appointments improve predictability and safety.", d: "Cash handling policy should minimise robbery risk." },
    "medium",
    rot(42)
  ),
  q(
    "Storage of flammable solvents in a COSHH cupboard should follow:",
    "Ventilated, fire-rated store, quantity limits, segregation from oxidisers, and no ignition sources nearby",
    ["Storing next to welding bay without firewall", "Keeping oxidisers on the same shelf unseparated", "Decanting into unlabeled drink bottles"],
    "Flammable storage needs rated cabinets/rooms, segregation, ventilation, and ignition source control.",
    { a: "Welding ignition near bulk solvent is catastrophic risk.", c: "Oxidiser segregation prevents reactive fires.", d: "Unlabeled decanting causes misuse and ingestion risk." },
    "medium",
    rot(43)
  ),
  q(
    "Work at height rescue plan should:",
    "Be planned before work starts, with trained personnel and equipment suited to the suspension scenario",
    ["Be improvised only after a fall occurs", "Rely on the fallen person self-rescuing always", "Exclude emergency services from planning"],
    "Rescue plans address suspension trauma and timely recovery — required in work at height planning.",
    { a: "Improvisation delays rescue and increases harm.", c: "Suspended workers may be unconscious; self-rescue not guaranteed.", d: "Emergency services may be part of the plan." },
    "hard",
    rot(44)
  ),
  q(
    "Housekeeping standard on a busy factory floor reduces:",
    "Slips, trips, fires, and struck-by incidents from clutter and waste",
    ["Only office paper recycling rates", "Psychosocial stress exclusively with no physical effect", "Legal duties to maintain workplaces"],
    "Good housekeeping is a foundational control for STF, fire load, and movement hazards.",
    { a: "Housekeeping affects physical hazards broadly.", c: "Clutter can increase stress but physical STF remains primary.", d: "Housekeeping supports legal workplace maintenance duties." },
    "easy",
    rot(45)
  ),
  q(
    "Biological risk from needlestick injury in a portering role is managed by:",
    "Sharps containers at point of use, training, reporting, and post-exposure prophylaxis pathway",
    ["Recapping needles by hand before disposal", "Carrying loose sharps in pockets for speed", "Discouraging reporting to reduce paperwork"],
    "Needlestick protocols emphasise no recapping, sharps bins, and rapid medical assessment.",
    { a: "Hand recapping increases stick risk.", c: "Pocket carry risks injury to porter and others.", d: "Reporting enables medical prophylaxis." },
    "medium",
    rot(46)
  ),
  q(
    "LEV airflow indicator (gauge) helps operators by:",
    "Showing whether airflow is adequate before starting dusty work",
    ["Decorating the workshop only", "Replacing face fit testing for RPE", "Measuring outdoor rainfall"],
    "Indicators warn when extraction fails, prompting stop-work until maintenance.",
    { a: "Aesthetic value is not the safety function.", c: "Face fit testing is separate from LEV airflow.", d: "Rainfall is unrelated." },
    "easy",
    rot(47)
  ),
  q(
    "A risk assessment for roof work identifies fragile materials and no edge protection. The decision should be:",
    "Do not proceed until higher-order controls are implemented or work method changed",
    ["Proceed if workers sign a disclaimer", "Use disclaimer and shorter lunch", "Proceed Friday only"],
    "Disclaimers do not transfer legal duties; inadequate controls mean work should not start.",
    { a: "Waivers cannot replace fall prevention.", c: "Lunch length does not fix fall risk.", d: "Day of week does not change fragility." },
    "medium",
    rot(48)
  ),
  q(
    "Integrating welfare with hazard control on a hot chemical process line means:",
    "Providing hydration, cool rest areas, chemical hygiene, and maintained toilets away from the process",
    ["Locating drinking water only inside the bund of corrosive tanks", "Removing rest to maximise throughput without heat plan", "Combining toilet and chemical mixing room"],
    "Welfare must be accessible and hygienic, separated from chemical process zones.",
    { a: "Water inside corrosive bund risks contamination and exposure.", c: "Removing rest increases heat stress.", d: "Toilets must not share space with mixing hazards." },
    "medium",
    rot(49)
  ),
];
