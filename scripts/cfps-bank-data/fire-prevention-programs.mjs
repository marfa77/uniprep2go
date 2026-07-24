import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "A hot work permit program is primarily intended to:",
    "Authorize and control temporary ignition-source activities where fire or explosion hazards exist",
    ["Replace the need for fixed fire detection in all areas", "Permit unlimited welding without area preparation", "Eliminate combustible dust from industrial processes"],
    "Hot work permits formalize risk assessment, area preparation, fire watch, and authorization before welding, cutting, grinding, or similar work.",
    { b: "Permits supplement, not replace, detection and broader prevention programs.", c: "Permits require preparation and controls, not unlimited work.", d: "Dust control is separate from hot work authorization." },
    "easy",
    rot(0)
  ),
  q(
    "Before hot work begins in a partially enclosed area with combustible construction, the permit issuer should verify:",
    "Combustibles within 35 ft (11 m) are removed, covered, or protected and a fire watch is assigned",
    ["Only that the welder brought personal protective equipment", "That the area is painted within the last year", "That production targets will be met on schedule"],
    "NFPA 51B and similar standards require clearing or shielding combustibles, controlling sparks, and assigning a trained fire watch when required.",
    { a: "PPE alone does not address area ignition hazards.", c: "Paint age does not substitute for combustible control.", d: "Production schedule is not a fire safety criterion." },
    "medium",
    rot(1)
  ),
  q(
    "A fire watch for hot work should remain on duty for at least:",
    "30 minutes after work ends, or longer if local policy or hazards require",
    ["Only while the arc is active", "Until the welder leaves the parking lot", "Five minutes regardless of materials present"],
    "Fire watch continues after work stops to detect smoldering fires; duration often extends to 60 minutes in high-hazard settings.",
    { a: "Smoldering can begin after the arc stops.", c: "Parking lot departure is unrelated to hazard monitoring.", d: "Five minutes is insufficient for many combustible exposures." },
    "medium",
    rot(2)
  ),
  q(
    "Which condition most commonly invalidates a previously issued hot work permit?",
    "Change in conditions such as unexpected flammable atmosphere, alarm activation, or incomplete area preparation",
    ["Completion of the planned work scope on time", "Use of the same welder as originally named", "Normal shift change with handover briefing"],
    "Permits are void when hazards change, preparation is inadequate, or emergency conditions arise; work must stop and be re-evaluated.",
    { b: "On-time completion does not invalidate a permit.", c: "Same welder does not alone maintain validity if conditions change.", d: "Shift change requires re-verification, not automatic invalidation by itself." },
    "hard",
    rot(3)
  ),
  q(
    "Housekeeping as a fire prevention strategy focuses on:",
    "Removing accumulations of combustibles, maintaining clear egress, and keeping ignition sources separated from fuel",
    ["Increasing storage density to reduce floor area", "Allowing oily rags in open bins for quick access", "Deferring waste removal until quarterly audits"],
    "Good housekeeping reduces available fuel, maintains travel paths, and supports other controls like sprinkler effectiveness.",
    { b: "Open oily rag storage creates spontaneous combustion risk.", c: "Deferred waste removal allows fuel loading to grow.", d: "Higher storage density increases fire severity potential." },
    "easy",
    rot(4)
  ),
  q(
    "An inspector finds blocked exit aisles behind pallets of cardboard. The primary fire prevention failure is:",
    "Impaired egress and increased fuel load in occupied paths",
    ["Excess illumination in the warehouse", "Use of steel racking instead of wood", "Lack of decorative signage at the entrance"],
    "Blocked egress delays evacuation; combustible storage in paths adds fuel and obstructs emergency response.",
    { b: "Illumination level is not the core issue described.", c: "Steel racking is generally noncombustible structure.", d: "Decorative signage does not address egress or fuel loading." },
    "easy",
    rot(5)
  ),
  q(
    "The most effective housekeeping control for oily machine drip accumulation is:",
    "Routine cleaning, drip pans, and proper disposal of oil-soaked materials in closed metal containers",
    ["Spreading sawdust to absorb oil in place indefinitely", "Hosing oil toward floor drains without containment", "Covering spills with cardboard until year-end shutdown"],
    "Oily deposits on floors and equipment increase ignition likelihood; absorbents must be disposed of safely, not left to accumulate.",
    { a: "Sawdust with oil creates additional combustible fuel.", c: "Uncontrolled flushing may spread flammable residues.", d: "Cardboard cover adds fuel without removing hazard." },
    "medium",
    rot(6)
  ),
  q(
    "Under NFPA 652, the first step in managing combustible dust fire and explosion risk is:",
    "Conduct a dust hazard analysis (DHA) for processes handling combustible particulate solids",
    ["Install sprinklers only after the first explosion", "Assume all dust is inert unless proven otherwise", "Prohibit any pneumatic conveying regardless of material"],
    "NFPA 652 requires a DHA to identify hazards and define prevention and mitigation measures for combustible dust.",
    { b: "Combustible dust must be evaluated; inert assumption is unsafe.", c: "Conveying may be acceptable with proper controls.", d: "Sprinklers alone do not replace required analysis." },
    "medium",
    rot(7)
  ),
  q(
    "A DHA for a wood flour silo should address which hazard pair?",
    "Deflagration from dust cloud ignition and secondary explosions from accumulated dust on surfaces",
    ["Only corrosion of the silo exterior paint", "Thermal expansion of metal during cold weather", "Noise exposure to operators at ground level"],
    "Combustible dust hazards include primary deflagration in enclosures and secondary events when disturbed dust forms new clouds.",
    { a: "Corrosion may matter structurally but is not the primary dust explosion pair.", c: "Cold weather expansion is unrelated to deflagration.", d: "Noise is an occupational health issue, not the DHA dust focus." },
    "hard",
    rot(8)
  ),
  q(
    "NFPA 654 applies primarily to:",
    "Prevention of fire and dust explosions in chemical, dye, pharmaceutical, and related processing facilities",
    ["Residential kitchen cooking with vegetable oil only", "Subsurface coal mine methane drainage exclusively", "Aboveground swimming pool chlorination rooms only"],
    "NFPA 654 covers manufacturing and processing facilities handling combustible particulate solids not addressed by commodity-specific standards.",
    { a: "Residential cooking falls under different guidance.", c: "Mine methane is a different hazard class.", d: "Pool chlorination is not a dust processing standard scope." },
    "medium",
    rot(9)
  ),
  q(
    "Which dust collection practice best reduces deflagration propagation between equipment?",
    "Isolation devices such as explosion vents, chemical suppression, or isolation valves on ductwork",
    ["Increasing duct velocity without regard to static electricity", "Removing all relief devices to avoid product loss", "Connecting all collectors to one unprotected common duct"],
    "Isolation limits explosion transfer between vessels, ducts, and workspaces; NFPA 652/654 emphasize engineered mitigation.",
    { a: "High velocity alone does not replace isolation design.", c: "Removing relief increases catastrophic failure risk.", d: "Unprotected common ducts can transmit deflagration." },
    "hard",
    rot(10)
  ),
  q(
    "Minimum explosible concentration (MEC) for a combustible dust means:",
    "The lowest concentration in air capable of propagating flame through the dust cloud",
    ["The dust weight that clogs a filter bag", "The concentration that meets OSHA housekeeping limits only", "The amount required to damage a concrete floor slab"],
    "MEC defines cloud explosibility; operating below MEC in enclosed spaces still requires caution due to transient clouds.",
    { b: "Housekeeping limits do not define explosibility physics.", c: "Floor damage is unrelated to flame propagation threshold.", d: "Filter clogging is operational, not deflagration criteria." },
    "hard",
    rot(11)
  ),
  q(
    "Flammable liquids should be stored in approved containers primarily to:",
    "Limit vapor release, prevent spills, and reduce ignition likelihood from static or external sources",
    ["Increase evaporation for faster process throughput", "Allow unlimited quantities at each workstation", "Eliminate the need for bonding and grounding"],
    "Approved safety cans and cabinets control vapor, contain spills, and work with bonding/grounding programs.",
    { a: "Increased evaporation elevates vapor hazard.", c: "Quantity limits still apply by code and policy.", d: "Bonding and grounding remain necessary during transfers." },
    "easy",
    rot(12)
  ),
  q(
    "Inside a flammable liquids storage cabinet, containers should be:",
    "Closed tightly and limited to the quantity and arrangement permitted by the cabinet listing",
    ["Stored open to equalize vapor pressure", "Stacked above the cabinet on wood pallets", "Mixed with oxidizers if labels face outward"],
    "Listed cabinets are designed for limited quantities of closed containers; segregation from oxidizers is required.",
    { a: "Open containers release vapors inside the cabinet.", c: "Oxidizer segregation prevents reactive storage.", d: "External stacking defeats cabinet containment." },
    "medium",
    rot(13)
  ),
  q(
    "A room storing Class IB flammable liquids in quantities exceeding allowable cabinet limits typically requires:",
    "An inside storage room designed to code with fire-resistive construction, ventilation, and spill containment",
    ["Only a 'No Smoking' sticker on the door", "Standard office carpet to absorb minor drips", "Unrestricted natural ventilation through missing door gaskets"],
    "High-quantity storage needs rated construction, mechanical ventilation, containment, and electrical classification per NFPA 30.",
    { a: "Signage alone is insufficient for quantity-based storage rooms.", c: "Carpet adds fuel and does not provide containment.", d: "Missing gaskets do not constitute controlled ventilation." },
    "hard",
    rot(14)
  ),
  q(
    "During transfer of flammable liquid from a drum, the first static control measure is:",
    "Bond and ground containers before opening, maintaining contact throughout transfer",
    ["Rapid pour to finish before static builds", "Use plastic funnels without grounding because plastic is nonconductive", "Transfer only on humid days without other controls"],
    "Bonding equalizes potential between containers; grounding dissipates charge to earth. Both reduce spark risk during flow.",
    { b: "Rapid flow can increase static generation.", c: "Plastic without grounding path can retain charge.", d: "Humidity alone is unreliable static control." },
    "medium",
    rot(15)
  ),
  q(
    "Industrial process safety fire prevention emphasizes:",
    "Understanding chemistry, operating limits, abnormal situation management, and independent protection layers",
    ["Running closer to alarm limits to maximize yield only", "Disabling interlocks during night shifts", "Replacing procedures with verbal tradition each crew"],
    "Process safety integrates design, procedures, training, and safeguards to prevent loss of containment and ignition of releases.",
    { a: "Operating at alarm limits increases upset frequency.", c: "Disabled interlocks remove critical safeguards.", d: "Verbal tradition erodes consistent safe operation." },
    "medium",
    rot(16)
  ),
  q(
    "A management of change (MOC) review is required when:",
    "Process equipment, chemistry, utilities, or operating procedures change in ways that could affect fire or explosion risk",
    ["An employee changes desk assignment in the office", "The break room coffee brand changes", "Parking lot striping is repainted"],
    "MOC evaluates unintended consequences of modifications to process technology, facilities, or organization affecting safety.",
    { a: "Desk moves are administrative, not process changes.", c: "Coffee brand is unrelated to process hazard.", d: "Parking striping is not a process modification." },
    "easy",
    rot(17)
  ),
  q(
    "Which scenario most clearly requires a pre-startup safety review (PSSR)?",
    "Installation of a new solvent recovery unit with revised piping and interlocks",
    ["Replacement of identical fire extinguisher brackets", "Annual refresh of emergency contact posters", "Routine filter change on unchanged equipment"],
    "PSSR confirms construction matches design, safeguards are functional, and procedures/training are ready before introducing hazardous materials.",
    { b: "Extinguisher bracket replacement is maintenance, not new process introduction.", c: "Poster updates are administrative.", d: "Like-for-like filter change is routine maintenance." },
    "hard",
    rot(18)
  ),
  q(
    "In cannabis cultivation facilities, a leading fire prevention concern in flowering rooms is:",
    "High electrical load from lighting combined with combustible growing media and limited egress in modified buildings",
    ["Low humidity eliminating all combustion risk", "Absence of any organic materials in cultivation", "Inability of plants to contribute to fuel loading"],
    "Grow lighting, HVAC, extension wiring, and organic media create fuel and electrical ignition scenarios requiring engineered design and housekeeping.",
    { a: "Low humidity does not eliminate electrical or organic fuel risks.", c: "Organic media and plant material are combustible contributors.", d: "Plants and soil media can contribute to fire spread." },
    "medium",
    rot(19)
  ),
  q(
    "Cannabis extraction using hydrocarbon solvents demands which fire prevention control?",
    "Listed equipment, explosion-rated electrical in classified areas, ventilation, gas detection, and hot work prohibitions in process spaces",
    ["Open flame trimming near the extraction booth", "Storage of butane cylinders adjacent to oxidizers", "Bypassing ventilation to retain terpene odor"],
    "Hydrocarbon extraction introduces flammable gas/vapor hazards requiring classified equipment, detection, and strict ignition controls.",
    { a: "Open flames are incompatible with flammable extraction atmospheres.", c: "Oxidizer proximity increases reactivity and fire risk.", d: "Disabled ventilation allows hazardous vapor accumulation." },
    "hard",
    rot(20)
  ),
  q(
    "For lithium-ion battery energy storage systems (ESS), fire prevention planning should prioritize:",
    "Manufacturer emergency guidance, deflagration venting or spacing, monitoring, and restricted combustible storage nearby",
    ["Blocking ventilation louvers to prevent rain entry always", "Treating thermal runaway as impossible once installed", "Storing spare cardboard packaging against ESS cabinets"],
    "ESS hazards include thermal runaway and off-gas; plans integrate detection, spacing, ventilation, and coordination with AHJ requirements.",
    { a: "Ventilation must be engineered, not arbitrarily blocked.", c: "Thermal runaway remains a credible hazard.", d: "Combustible storage near ESS increases external fire exposure." },
    "medium",
    rot(21)
  ),
  q(
    "When an ESS installation uses indoor cabinet arrays, the fire prevention program should include:",
    "Clearance maintenance, sprinkler or alternative suppression design per listing, and emergency response procedures for battery incidents",
    ["Sealing all cabinet vents to improve HVAC efficiency", "Disabling alarms to avoid nuisance during charging", "Prohibiting any documentation of incident scenarios"],
    "Listed systems include spacing, suppression, and ventilation requirements; documented response is essential for battery events.",
    { a: "Sealing vents can trap heat and hazardous off-gas.", c: "Disabled alarms delay response to developing incidents.", d: "Scenario documentation supports responder safety." },
    "hard",
    rot(22)
  ),
  q(
    "Welding slag landing on combustible flooring is best prevented by:",
    "Fire-resistant blankets, shields, or noncombustible work surfaces with combustibles relocated beyond spark travel distance",
    ["Increasing welding current to finish faster", "Using cardboard as a disposable underlay", "Assuming slag cools before contacting any material"],
    "Spark and slag travel farther than expected; shields and cleared areas are standard hot work controls.",
    { a: "Higher current can increase spatter distance and heat.", c: "Cardboard is combustible fuel.", d: "Slag can ignite materials on contact." },
    "easy",
    rot(23)
  ),
  q(
    "Grinding ferrous metal near combustible dust accumulations requires:",
    "Cleaning adjacent dust deposits, using dust-tight electrical equipment where required, and hot work or ignition permits as applicable",
    ["Intentionally directing sparks toward dust to burn it off", "Removing portable extinguishers to avoid damage", "Operating without ventilation because sparks are brief"],
    "Grinding generates hot particles and frictional heat that can ignite dust layers; cleaning and classified equipment reduce risk.",
    { a: "Burning dust off creates uncontrolled ignition and possible deflagration.", c: "Extinguishers are needed for incipient fires.", d: "Brief sparks can still ignite accumulated dust." },
    "medium",
    rot(24)
  ),
  q(
    "An effective welding area ventilation strategy for fire prevention should:",
    "Capture fumes at source without pulling sparks into combustible filters or ducts lacking spark traps",
    ["Recirculate unfiltered air into storage of paper products", "Disable airflow to keep heat in the weld zone", "Route ducts through unprotected wood-framed voids"],
    "Ventilation must reduce fume exposure without transporting sparks to combustible collectors or concealed combustible spaces.",
    { b: "Recirculation to combustible storage spreads contaminants and sparks.", c: "Disabled airflow worsens exposure and does not control sparks.", d: "Combustible concealed spaces can be ignited by duct-transported sparks." },
    "hard",
    rot(25)
  ),
  q(
    "A self-inspection program for fire prevention is most effective when it:",
    "Uses standardized checklists, fixed frequencies, accountable owners, and documented corrective action tracking",
    ["Relies on informal memory with no records", "Occurs only after a fire loss event", "Focuses solely on sprinkler color without other hazards"],
    "Self-inspections detect housekeeping, storage, and procedural drift before incidents; documentation drives closure of deficiencies.",
    { a: "Informal programs miss trends and repeat deficiencies.", c: "Post-loss inspection is reactive, not preventive.", d: "Sprinkler appearance checks alone ignore ignition and fuel issues." },
    "easy",
    rot(26)
  ),
  q(
    "During monthly self-inspection of a paint mixing room, which finding should trigger immediate correction?",
    "Open solvent containers and blocked path to the fire extinguisher",
    ["Clean floors with no ignition sources noted", "Properly labeled closed waste cans", "Functional eyewash station with clear access"],
    "Open solvents increase vapor hazard; blocked extinguishers impair initial fire response — both are priority corrections.",
    { b: "Clean floors support prevention but are not the deficiency here.", c: "Closed labeled waste cans indicate good practice.", d: "Clear eyewash access is positive, not a trigger finding." },
    "medium",
    rot(27)
  ),
  q(
    "Trend analysis in self-inspection data helps fire prevention by:",
    "Identifying recurring deficiencies such as repeated hot work violations or dust accumulation in the same area",
    ["Eliminating the need for management review", "Guaranteeing zero fires for ten years", "Replacing employee training entirely"],
    "Recurring findings indicate systemic control failures needing engineering, procedure, or training intervention.",
    { a: "Management review remains necessary for resource allocation.", c: "Trend analysis reduces risk but cannot guarantee zero events.", d: "Training complements data-driven improvement." },
    "medium",
    rot(28)
  ),
  q(
    "Ignition source control in a solvent storage area most directly includes:",
    "Electrical equipment and fixtures rated for the classified area, plus prohibition of open flames and unapproved portable equipment",
    ["Using any convenience outlet if the plug fits", "Storing road flares for emergency lighting indoors", "Removing bonding cables to speed drum movement"],
    "Classified electrical and ignition management prevent sparks in vapor-prone zones during normal and abnormal operations.",
    { a: "Unrated outlets can arc in flammable atmospheres.", c: "Road flares are open ignition sources indoors.", d: "Bonding prevents static sparks during movement." },
    "easy",
    rot(29)
  ),
  q(
    "Which portable device is generally unacceptable as an ignition source control measure in a classified dust area?",
    "Unsealed conventional vacuum cleaner without dust-tight motor and grounding",
    ["Listed dust-tight vacuum with conductive hose", "Permanently mounted grounded dust collection system", "Intrinsically safe portable lighting where required"],
    "Standard vacuums can arc internally and disturb dust clouds; listed dust-tight equipment is required in hazardous dust locations.",
    { b: "Listed dust-tight vacuums are appropriate controls.", c: "Grounded fixed collection is preferred engineering.", d: "Intrinsically safe lighting controls ignition in classified areas." },
    "medium",
    rot(30)
  ),
  q(
    "Static electricity as an ignition source in bulk powder handling is best controlled by:",
    "Grounding and bonding of equipment, conductive or static-dissipative flooring where needed, and humidity or ionization per assessment",
    ["Insulating all metal chutes from earth", "Increasing pneumatic velocity without charge evaluation", "Relying on operators to avoid wool sweaters only"],
    "Static accumulates during flow and separation; grounding paths and facility design limit discharge energy in combustible atmospheres.",
    { a: "Isolated metal can retain dangerous potentials.", c: "Velocity changes alone may increase electrification.", d: "Clothing controls are supplemental, not primary engineering." },
    "hard",
    rot(31)
  ),
  q(
    "Combustible waste such as oily rags should be managed by:",
    "Placing them in listed self-closing metal containers emptied daily or as required by policy",
    ["Leaving them spread on benches to air-dry in place", "Mixing with aerosol cans in open plastic bins", "Storing outside exit doors for weekly pickup only"],
    "Oily rags can spontaneously ignite; metal containers with self-closing lids limit oxygen and contain heat during oxidation.",
    { a: "Air-drying in place allows heat buildup on combustible surfaces.", c: "Pressurized aerosols with rags increase complexity and hazard.", d: "Exit door storage obstructs egress and delays removal." },
    "easy",
    rot(32)
  ),
  q(
    "Paper and cardboard waste from packaging operations should be:",
    "Removed on a scheduled basis to prevent ceiling-high piles that exceed sprinkler design and block access",
    ["Compacted against electrical panels for space efficiency", "Stored under stairwells if labeled 'recycling'", "Ignored until annual deep clean"],
    "Excess combustible waste increases fire growth rate and can obstruct sprinklers and egress; frequent removal is basic prevention.",
    { a: "Storage at panels blocks access and adds fuel to electrical equipment.", c: "Stairwell storage violates egress and fuel control principles.", d: "Annual-only removal allows hazardous accumulation." },
    "medium",
    rot(33)
  ),
  q(
    "Wood scrap waste in a cabinet shop should be conveyed to collection using:",
    "Covered ducts or direct chutes to metal collection drums located away from ignition sources with regular emptying",
    ["Open belt conveyors through the spray finish booth", "Piles along the exit route for later handling", "Burning cutoffs in a barrel behind the building without permit"],
    "Wood waste is fuel; enclosed transport and remote collection reduce dust and spark exposure near finishing ignition sources.",
    { a: "Open conveyors through spray booths transport sparks and dust.", c: "Exit route piles impair egress and add fuel load.", d: "Open burning without controls is prohibited and hazardous." },
    "hard",
    rot(34)
  ),
  q(
    "Hot work in a vessel that previously contained flammable liquid requires:",
    "Cleaning, gas testing, inerting or isolation as needed, and written authorization confirming safe entry/work conditions",
    ["Assumption the tank is empty because it looks dry", "Welding on the exterior only without interior assessment", "Venting vapors by lighting a propane torch inside"],
    "Residual vapor in confined spaces creates explosion risk; cleaning, monitoring, and permits verify safe conditions.",
    { a: "Visual dryness does not prove absence of flammable vapor.", c: "Exterior work can ignite interior vapor through metal.", d: "Intentional interior flame is extremely hazardous." },
    "hard",
    rot(35)
  ),
  q(
    "A permit-required confined space adjacent to hot work should include which additional precaution?",
    "Preventing entrant exposure to welding fumes, toxic residues, and ignition of interior atmospheres during concurrent operations",
    ["Shared entry without communication between crews", "Locking interior access open to improve airflow only", "Ignoring atmospheric monitoring if fans are running"],
    "Concurrent hot work and confined space entry requires coordinated atmospheric control, communication, and stop-work criteria.",
    { a: "Shared uncoordinated entry increases entrapment and ignition risk.", c: "Open access alone does not guarantee safe atmosphere.", d: "Fans do not replace gas monitoring." },
    "hard",
    rot(36)
  ),
  q(
    "Housekeeping audits in dust-generating processes should verify:",
    "Horizontal and elevated surfaces are free of hazardous dust layers beyond the facility's established threshold",
    ["Only visible floor areas directly underfoot", "Dust is acceptable if color matches product", "Cleaning occurs solely before corporate visits"],
    "Secondary deflagrations often involve dust on beams, ducts, and elevated surfaces; thresholds guide cleaning frequency.",
    { a: "Elevated surfaces are critical secondary explosion fuel.", c: "Dust color does not indicate safe accumulation depth.", d: "Visit-driven cleaning allows hazardous buildup between events." },
    "medium",
    rot(37)
  ),
  q(
    "NFPA 652 requires revalidation of the DHA at least:",
    "Every five years, or when material, process, or building changes occur sooner",
    ["Only at initial plant construction", "Every twenty years regardless of changes", "Never if no fires have occurred"],
    "Periodic and change-driven revalidation keeps dust controls aligned with actual operations and building modifications.",
    { a: "Initial DHA alone becomes outdated as processes evolve.", c: "Twenty-year interval exceeds standard requirement.", d: "Lack of fires does not prove hazard absence." },
    "medium",
    rot(38)
  ),
  q(
    "A dust explosion vent on a collector should be directed:",
    "To a safe exterior area away from occupied paths, vehicles, and additional fuel concentrations",
    ["Into an adjacent office corridor to use 'existing ventilation'", "Toward the main parking lot without calculation", "At another dust collector to balance pressure"],
    "Vent discharge must protect people and prevent secondary ignitions; direction and clearance are engineered per NFPA guidance.",
    { a: "Interior vent discharge exposes occupants to flame and pressure.", c: "Parking areas may hold people and vehicles at risk.", d: "Venting into another collector can propagate the event." },
    "hard",
    rot(39)
  ),
  q(
    "Flammable liquid dispensing from safety cans at a workbench should use:",
    "Approved pumps or self-closing faucets, drip containment, and quantities limited to daily use needs",
    ["Open buckets for faster dip application", "Unlimited open trays to soak parts overnight", "Pouring directly from 55-gallon drums without bonding"],
    "Dispensing controls limit vapor release and spills; day tanks and safety cans reduce quantities at point of use.",
    { a: "Open buckets increase spill and vapor area.", c: "Overnight open trays accumulate flammable vapor.", d: "Large drum pouring without bonding risks static ignition." },
    "medium",
    rot(40)
  ),
  q(
    "Spray finishing operations prevent fire primarily through:",
    "Ventilation, elimination of ignition sources, proper solvent storage, and maintenance of spray booths and filters",
    ["Increasing overspray accumulation on booth floors", "Using nonapproved portable heaters inside booths", "Disabling interlocks on booth airflow"],
    "Overspray creates flammable atmospheres; ventilation and ignition control maintain concentrations below dangerous levels.",
    { a: "Overspray buildup adds readily ignitable fuel.", c: "Unapproved heaters are ignition sources in classified zones.", d: "Disabled airflow interlocks allow vapor accumulation." },
    "medium",
    rot(41)
  ),
  q(
    "Cannabis facility HVAC fire prevention should address:",
    "Filter maintenance, duct cleanliness, electrical loading of dehumidification units, and clearance to combustible finishes",
    ["Sealing return air paths to hide odor regardless of heat buildup", "Installing unlisted grow lights in rated plenum without review", "Ignoring condensate drainage near electrical panels"],
    "HVAC in grow environments handles dust, moisture, and high load; poor maintenance creates fuel and electrical ignition potential.",
    { a: "Arbitrary sealing can trap heat and restrict safe airflow.", c: "Unlisted equipment in plenums introduces ignition in air paths.", d: "Water near panels increases electrical failure and fire risk." },
    "hard",
    rot(42)
  ),
  q(
    "For outdoor ESS installations, fire prevention site planning should consider:",
    "Exposure separation from buildings, vegetation management, and access for emergency cooling or isolation per AHJ",
    ["Planting tall dry ornamental grasses against cabinets", "Parking fleet vehicles touching ESS enclosures", "Blocking access roads with permanent storage containers"],
    "Separation and clear access support exposure control and emergency response; vegetation and vehicles can introduce external fire exposure.",
    { a: "Dry vegetation provides external ignition and spread potential.", c: "Blocked access delays mitigation.", d: "Vehicles at enclosures add heat and obstruction." },
    "medium",
    rot(43)
  ),
  q(
    "A grinding wheel inspection as part of fire prevention should confirm:",
    "Guards are in place, sparks are directed away from combustibles, and the wheel is compatible with machine speed",
    ["Guards are removed for better visibility always", "Any wheel fits if it threads on partially", "Coolant is unnecessary because sparks are small"],
    "Wheel burst and spark ejection hazards require proper guards, speed rating, and spark direction away from fuels.",
    { a: "Removed guards expose operators and direct sparks unpredictably.", c: "Incorrect wheels can shatter at operating speed.", d: "Small sparks can ignite fine combustibles and oils." },
    "easy",
    rot(44)
  ),
  q(
    "Self-inspection of flammable liquid storage areas should verify:",
    "Containers are closed, labeled, segregated from incompatible materials, and within quantity limits for the space",
    ["Secondary containment is unnecessary if floors are sealed", "Leakage is acceptable if under one gallon per day", "Oxidizers may share shelving if alphabetized"],
    "Inspections confirm NFPA 30 fundamentals: containment, segregation, labeling, and quantity control.",
    { a: "Containment is required where codes and policies apply.", c: "Daily leakage sustains vapor and slip hazards.", d: "Alphabetical storage ignores chemical incompatibility." },
    "medium",
    rot(45)
  ),
  q(
    "Ignition source control during planned maintenance outages should include:",
    "Lockout/tagout of energy sources, hot work permits where cutting/welding occurs, and flammable atmosphere testing before startup",
    ["Temporary removal of flame arrestors to speed flow", "Hot work on lines without verifying isolation", "Startup before leak checking completed"],
    "Outages introduce simultaneous mechanical and hot work; energy isolation and gas testing prevent ignition during recommissioning.",
    { a: "Removed flame arrestors allow flame propagation into piping.", c: "Unverified isolation can expose workers to flammable contents.", d: "Leak check before startup prevents flammable releases." },
    "hard",
    rot(46)
  ),
  q(
    "Combustible waste compactors located indoors require fire prevention measures including:",
    "Routine cleaning of buildup, sprinkler protection per design, and prohibiting hot or reactive wastes in the charge chamber",
    ["Loading lithium battery packs to save disposal costs", "Disabling heat sensors to avoid production stops", "Storing hydraulic fluid open on the compactor lid"],
    "Compactors concentrate combustibles and hydraulic oil; contamination with batteries or reactive wastes increases fire intensity.",
    { a: "Lithium batteries in compactors create severe thermal runaway risk.", c: "Disabled sensors allow undetected heating.", d: "Open hydraulic fluid adds fuel at the machine." },
    "hard",
    rot(47)
  ),
  q(
    "An integrated fire prevention program for a multi-process plant should:",
    "Coordinate hot work, housekeeping, dust management, flammable liquids, self-inspection, and training under accountable management review",
    ["Treat each hazard in isolation without communication", "Rely on insurance inspections to replace internal programs", "Focus exclusively on post-incident investigation"],
    "Effective programs link controls across fuels, ignition sources, and processes with leadership oversight and continuous improvement.",
    { a: "Isolated silos miss interacting hazards like dust near hot work.", c: "Insurance surveys supplement but do not replace internal ownership.", d: "Prevention requires proactive measures, not only investigation." },
    "easy",
    rot(48)
  ),
  q(
    "When prioritizing corrective actions from fire prevention inspections, the highest priority is typically:",
    "Conditions that combine immediate ignition likelihood with life safety impact, such as blocked exits with active hot work nearby",
    ["Cosmetic paint chips on a noncombustible column", "Missing biennial employee picnic notice", "Slightly faded exterior landscaping signage"],
    "Risk-based prioritization addresses imminent ignition-egress scenarios before lower-consequence aesthetic or administrative items.",
    { b: "Paint chips on noncombustible structure are lower priority.", c: "Picnic notices are unrelated to fire risk.", d: "Landscaping signage fade does not affect immediate life safety." },
    "medium",
    rot(49)
  ),
];
