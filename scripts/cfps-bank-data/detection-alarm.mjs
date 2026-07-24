import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "NFPA 72 is primarily known as the:",
    "National Fire Alarm and Signaling Code",
    ["National Fire Protection Act for sprinklers only", "International Building Code fire chapter", "OSHA workplace evacuation standard"],
    "NFPA 72 governs fire alarm system design, installation, acceptance testing, and maintenance — not sprinkler hydraulic design.",
    { b: "Sprinkler hydraulics fall under NFPA 13, not NFPA 72.", c: "Building construction requirements are in IBC/NFPA 101, not NFPA 72.", d: "OSHA addresses workplace safety broadly; NFPA 72 is the fire alarm code." },
    "easy",
    rot(0)
  ),
  q(
    "A spot-type smoke detector is best described as:",
    "A single sensing unit that monitors conditions at a discrete location",
    ["A continuous sensor along the entire length of a cable run", "A detector that only samples air from HVAC return plenums", "A device that measures beam interruption across an entire atrium"],
    "Spot detectors cover a localized area from one installed device; line-type devices provide continuous coverage along a path.",
    { a: "Continuous cable sensing describes line-type heat detection.", c: "Duct sampling is a separate application, not the definition of spot-type.", d: "Projected beam detectors span spaces but are not spot-type devices." },
    "easy",
    rot(1)
  ),
  q(
    "Line-type heat detectors are most commonly implemented as:",
    "Fixed-temperature sensing cable installed along the protected area",
    ["Ionization chambers spaced at 30 ft intervals", "Photoelectric sensors in a zigzag ceiling pattern", "Aspirating pipes with capillary sampling ports"],
    "Line-type detection uses heat-sensitive cable (or similar) to sense fire along conveyors, tunnels, or long narrow spaces.",
    { a: "Ionization detectors are spot-type, not continuous line coverage.", b: "Photoelectric spot spacing does not create a continuous line sensor.", d: "Aspirating systems sample air through pipes but are not line-type heat cable." },
    "medium",
    rot(2)
  ),
  q(
    "Ionization smoke detectors respond fastest to:",
    "Fast-flaming fires with small combustion particles",
    ["Deep smoldering fires with large visible particles", "Slow pyrolysis before any particulate is produced", "Heat-only conditions with no airborne particulate"],
    "Ionization technology is sensitive to small particles typical of rapid flaming combustion; smoldering fires produce larger particles favoring photoelectric response.",
    { a: "Large particles from smoldering fires are detected more readily by photoelectric sensors.", b: "Pyrolysis without particulate may not trigger smoke detectors promptly.", c: "Incorrect — review NFPA 72 requirements for this application." },
    "medium",
    rot(3)
  ),
  q(
    "Photoelectric smoke detectors are generally most effective for:",
    "Smoldering fires that produce visible smoke with larger particles",
    ["Clean flaming combustion with very little visible smoke", "Sudden temperature rise without smoke production", "Open flame impingement on structural steel only"],
    "Photoelectric sensors use light obscuration/scattering and excel at detecting smoldering, smoky conditions.",
    { b: "Fast clean burns produce smaller particles better suited to ionization.", c: "Temperature rise alone is the domain of heat detectors.", d: "Steel impingement is a heat/flame exposure issue, not photoelectric smoke detection." },
    "easy",
    rot(4)
  ),
  q(
    "A rate-of-rise heat detector activates based on:",
    "Temperature increasing at a predetermined rate per minute",
    ["A single fixed temperature threshold only, with no rate component", "Visible smoke obscuration across a light beam", "Air sample particle concentration in a pipe network"],
    "Rate-of-rise detectors respond to rapid temperature increases, providing faster response than fixed-temperature-only devices in many fires.",
    { a: "Fixed-temperature-only devices lack rate-of-rise sensing capability.", c: "Beam obscuration is a smoke detection principle.", d: "Pipe air sampling describes aspirating smoke detection." },
    "medium",
    rot(5)
  ),
  q(
    "Fixed-temperature heat detectors are typically selected when:",
    "Ambient conditions may cause false rate-of-rise activations",
    ["The fastest possible detection of smoldering upholstered furniture is required", "Beam obstructions from building movement must be avoided", "Very early warning at sub-0.01% obscuration per foot is needed"],
    "Fixed-temperature detectors avoid nuisance trips from normal HVAC temperature swings that could trigger rate-of-rise devices.",
    { a: "Smoldering upholstered fires are better served by smoke detection.", b: "Beam detectors address large open areas, not ambient temperature swing issues.", d: "Ultra-early warning is an aspirating/VESDA-type application." },
    "medium",
    rot(6)
  ),
  q(
    "Projected beam smoke detectors are most appropriate in:",
    "Large open areas with high ceilings where spot detector spacing is impractical",
    ["Small residential sleeping rooms with 8 ft ceilings", "Dusty milling rooms requiring sampling at multiple points along ductwork", "Elevator hoistways requiring heat-only detection by code"],
    "Beam detectors cover large volumes with fewer devices but need stable mounting and clear line-of-sight.",
    { a: "Small rooms use spot smoke detectors economically.", b: "Dusty industrial ducts often use duct housing detectors or aspirating systems.", c: "Hoistway detection requirements vary but beam detectors are not the typical solution." },
    "medium",
    rot(7)
  ),
  q(
    "A projected beam smoke detector signals an alarm when:",
    "Smoke obscures the light beam between the transmitter and receiver/reflector",
    ["The ceiling temperature exceeds a fixed 135°F setting", "Ionization current drops due to humidity alone without smoke", "Duct airflow velocity falls below a preset cubic-feet-per-minute threshold"],
    "Beam detectors measure obscuration across the beam path; environmental misalignment can cause trouble, not typically humidity-based ionization effects.",
    { b: "Fixed temperature thresholds describe heat detectors.", c: "Ionization current changes are unrelated to beam-type detection.", d: "Airflow velocity is a supervisory/HVAC parameter, not beam obscuration." },
    "hard",
    rot(8)
  ),
  q(
    "Aspirating smoke detection systems (ASDs) detect fire by:",
    "Continuously drawing air samples through piping to a centralized high-sensitivity detector",
    ["Measuring infrared radiation from flames across a 300 ft aisle", "Detecting pressure changes in sprinkler piping only", "Monitoring elevator car position for Phase I recall"],
    "ASDs use fans and capillary sampling holes to provide very early warning, often in critical facilities or dusty environments with proper filtration.",
    { a: "Flame radiation detection is flame detector technology, not ASD.", c: "Sprinkler pressure monitoring is waterflow/supervisory signaling.", d: "Elevator recall is life safety integration, not ASD operation." },
    "medium",
    rot(9)
  ),
  q(
    "A primary advantage of aspirating smoke detection in a data center is:",
    "Very early warning at sensitivity levels adjustable above standard spot smoke detectors",
    ["Elimination of all ceiling-mounted notification appliances", "Automatic suppression discharge without any alarm verification delay", "Replacement of all manual pull stations with sampling ports"],
    "ASDs can be set to pre-alarm levels for investigation before general evacuation, valuable in high-value continuous operations.",
    { a: "Notification appliances are still required per occupancy and code.", b: "Suppression release follows separate code requirements; ASD does not eliminate verification rules.", d: "Manual initiation capability must still be provided where required." },
    "hard",
    rot(10)
  ),
  q(
    "Audible notification appliances in a fire alarm system are commonly:",
    "Horns, speakers, or combination horn/strobes producing alert or evacuation tones",
    ["Waterflow switches on sprinkler risers only", "Tamper switches on control valves only", "Heat-sensitive cable along conveyor belts only"],
    "Notification appliances alert occupants; initiating devices detect conditions or manual activation.",
    { a: "Tamper switches produce supervisory signals, not occupant notification.", b: "Waterflow switches are initiating devices for sprinkler operation.", c: "Heat cable is detection, not occupant notification." },
    "easy",
    rot(11)
  ),
  q(
    "Visible notification appliances are rated by:",
    "Candela output measured at a rated mounting height and room configuration",
    ["Decibels at 10 ft from the horn only", "Sprinkler density in gallons per minute per square foot", "Duct velocity in feet per minute through the sampling tube"],
    "Strobe intensity (candela) and spacing depend on sleeping vs non-sleeping, ceiling height, and wall vs ceiling mounting.",
    { b: "Decibels rate audible appliances, not visible strobes.", c: "Sprinkler density is suppression design, unrelated to strobe ratings.", d: "Duct velocity relates to HVAC or duct detector placement, not candela." },
    "medium",
    rot(12)
  ),
  q(
    "In NFPA 72, candela spacing for wall-mounted strobes in general sleeping areas typically requires:",
    "Higher candela ratings and closer spacing than ordinary non-sleeping areas",
    ["Lower candela ratings because occupants are already lying down", "No strobes if horns are installed anywhere in the building", "Strobes only in sprinklered rooms, never in corridors"],
    "Sleeping occupants may not hear alarms; visible notification intensity and placement are more stringent in sleeping spaces.",
    { a: "Sleeping occupants are less likely to hear — visual requirements increase, not decrease.", c: "Both audible and visible notification are typically required where applicable.", d: "Corridor notification requirements are not limited to sprinklered rooms only." },
    "hard",
    rot(13)
  ),
  q(
    "A supervisory signal on a fire alarm control unit indicates:",
    "An off-normal condition of equipment or process that is not an alarm or trouble",
    ["A confirmed fire requiring immediate evacuation", "Loss of primary AC power to the panel only", "Successful completion of the annual inspection test"],
    "Supervisory signals include valve tamper, low air on dry pipe, fire pump off/auto, and other monitored conditions.",
    { a: "Confirmed fire conditions produce alarm signals.", b: "Power loss typically generates trouble signals.", d: "Inspection completion is a maintenance activity, not a panel signal type." },
    "easy",
    rot(14)
  ),
  q(
    "Which condition would typically generate an alarm signal rather than a supervisory signal?",
    "Smoke detector activation in a protected corridor",
    ["Control valve tamper switch off-normal", "Fire pump switch not in automatic position", "Low air pressure on a dry pipe sprinkler system"],
    "Detector and manual pull station activations initiate alarm signals; valve tamper and equipment off-normal are supervisory.",
    { a: "Valve tamper is a classic supervisory condition.", b: "Fire pump off-auto is supervisory monitoring.", c: "Low air on dry pipe is supervisory, not occupant evacuation alarm." },
    "medium",
    rot(15)
  ),
  q(
    "A trouble signal on a fire alarm system most often means:",
    "A fault in the system wiring, power, or components compromising normal operation",
    ["Fire has been confirmed in two separate zones", "All occupants have acknowledged the mass notification message", "The elevator has successfully reached the recall landing"],
    "Trouble indicates service needed — open circuits, ground faults, battery failure — distinct from alarm and supervisory.",
    { b: "Confirmed fire produces alarm, not trouble.", c: "Mass notification acknowledgment is not a standard trouble definition.", d: "Elevator recall status is separate integration signaling." },
    "medium",
    rot(16)
  ),
  q(
    "Mass notification systems (MNS) differ from traditional fire alarm voice systems because MNS:",
    "May deliver multiple threat messages beyond fire, such as weather or security events",
    ["Are exempt from all intelligibility requirements in every occupancy", "Cannot share speakers with fire alarm systems under any circumstances", "Replace manual fire alarm boxes in all educational occupancies"],
    "MNS provides emergency communication for varied hazards; integration with fire alarm must follow NFPA 72 and UFC/DoD criteria where applicable.",
    { a: "Intelligibility requirements still apply to emergency voice systems.", c: "Combined systems are permitted with proper priority and supervision.", d: "Manual fire alarm initiation is still required where codes mandate it." },
    "medium",
    rot(17)
  ),
  q(
    "When fire alarm and mass notification share speakers, NFPA 72 requires:",
    "Fire alarm messages to take priority over non-fire MNS messages",
    ["Security messages to override fire alarm evacuation tones", "All messages to play simultaneously at equal volume", "MNS to disable strobes during any fire alarm activation"],
    "Life safety fire alarm signals must supersede other messaging to prevent confusion during fire emergencies.",
    { a: "Fire alarm must have highest priority for evacuation tones.", b: "Simultaneous competing messages reduce intelligibility and safety.", d: "Visible notification must continue per code during fire alarm." },
    "hard",
    rot(18)
  ),
  q(
    "Integration of fire alarm with smoke management systems typically requires the FACP to:",
    "Activate or disable fans and dampers per the engineered smoke control sequence",
    ["Disable all fire alarm horns to avoid fan vibration", "Delay all elevator recall until smoke is visible at the roof vent", "Permit occupants to re-enter floors at their discretion during Phase I"],
    "Smoke management sequences are occupancy-specific and programmed per approved rational analysis or engineered design.",
    { a: "Horns are not disabled for fan vibration; systems are coordinated.", b: "Elevator recall follows defined code triggers, not visual roof smoke.", c: "Re-entry is controlled by fire department and system status, not occupant discretion." },
    "hard",
    rot(19)
  ),
  q(
    "On a smooth ceiling up to 10 ft high, spot smoke detector spacing is generally:",
    "30 ft between detectors and 15 ft from walls (per typical NFPA 72 prescriptive spacing)",
    ["50 ft between detectors with no wall consideration", "15 ft between detectors in all occupancies without exception", "Detector spacing is unlimited if sprinklers are provided"],
    "Standard smooth-ceiling spacing is 30 ft center-to-center with half-spacing to walls; modifications apply for beams, slopes, and high ceilings.",
    { b: "50 ft exceeds prescriptive smoke detector spacing on smooth ceilings.", c: "15 ft is the wall distance, not the full center-to-center spacing.", d: "Sprinklers do not automatically eliminate detector spacing rules." },
    "medium",
    rot(20)
  ),
  q(
    "When ceiling height exceeds 10 ft, smoke detector spacing generally:",
    "Must be reduced according to NFPA 72 tables for increased ceiling height",
    ["May be doubled because smoke has more volume to collect", "Is unchanged up to 30 ft ceilings without engineering analysis", "Is eliminated if beam detectors are used anywhere in the building"],
    "Higher ceilings delay smoke reaching detectors; reduced spacing or performance-based design compensates for the increased ceiling height.",
    { a: "Greater ceiling height delays detection — spacing tightens, not expands.", c: "Spacing does not remain unchanged for high ceilings without analysis.", d: "Beam detectors in one area do not remove spacing rules elsewhere." },
    "hard",
    rot(21)
  ),
  q(
    "Beam pockets or solid joists on a ceiling may require:",
    "Smoke detectors in each pocket or modified spacing per NFPA 72 beam criteria",
    ["Removal of all heat detectors from the occupancy", "Candela ratings reduced by 50% in sleeping rooms", "Elimination of manual pull stations on that floor"],
    "Beam construction creates pockets that trap smoke; detectors may be needed in each pocket or spacing adjusted.",
    { a: "Heat detector requirements are separate and not eliminated by beams.", b: "Candela ratings are unrelated to beam pocket detector placement.", d: "Manual stations are required by occupancy provisions independent of beam construction." },
    "hard",
    rot(22)
  ),
  q(
    "Duct smoke detectors are commonly required in:",
    "Air handling systems above a threshold capacity serving multiple areas",
    ["Every residential kitchen range hood exhaust duct regardless of size", "All sanitary sewer vents penetrating the roof", "Sprinkler branch lines in each fire sprinkler zone"],
    "NFPA 90A and NFPA 72 address duct detectors in HVAC systems to prevent smoke recirculation; thresholds depend on airflow and application.",
    { a: "Small kitchen hoods are not automatic duct detector locations.", b: "Sewer vents are not HVAC smoke recirculation paths.", c: "Sprinkler branch lines use waterflow detection, not duct smoke detectors." },
    "medium",
    rot(23)
  ),
  q(
    "A duct smoke detector should typically be installed:",
    "In the supply or return air duct downstream of filters and ahead of fan branches where required by code",
    ["Only inside the fire pump room on the floor slab", "At the top of elevator hoistways adjacent to traveling cables", "Inside standpipe hose cabinets on each landing"],
    "Proper duct placement ensures representative sampling and accessibility for testing; location varies by supply/return strategy and code.",
    { b: "Fire pump rooms use area detection, not duct housing placement.", c: "Hoistways have specific detection rules but not duct-type in hoistway itself typically.", d: "Hose cabinets are not duct detector mounting locations." },
    "hard",
    rot(24)
  ),
  q(
    "When a duct detector senses smoke, it typically:",
    "Initiates a supervisory or dedicated HVAC shutdown/recirculation control response per design",
    ["Discharges clean agent suppression directly into the duct", "Automatically opens all stair pressurization dampers fully without FACP logic", "Causes immediate Phase II firefighter service in all elevators"],
    "Duct detectors usually stop fan spread of smoke; response may be supervisory with smoke dampers closing — design-specific.",
    { a: "Suppression systems are not triggered by standard duct detectors alone.", c: "Smoke control sequences are engineered, not uncontrolled damper opening.", d: "Phase II requires firefighter key operation, not automatic duct detection." },
    "medium",
    rot(25)
  ),
  q(
    "Elevator Phase I emergency recall is initiated when:",
    "Designated lobby or machine room smoke/heat detection or manual key switch triggers recall",
    ["Any sprinkler waterflow anywhere in the building without further conditions", "A trouble signal appears on the fire alarm communicator", "Occupants press the elevator door close button repeatedly"],
    "Phase I returns cars to a designated recall floor (or alternate) when initiating devices in recall zones activate.",
    { a: "Waterflow alone may not trigger recall unless designed and required by local code.", b: "Trouble signals do not initiate elevator recall.", d: "Door close buttons have no recall function." },
    "medium",
    rot(26)
  ),
  q(
    "Elevator Phase II emergency in-car operation allows:",
    "Firefighters with a keyed switch to operate the elevator from the car",
    ["All occupants to use elevators for faster evacuation during fire alarm", "Automatic descent to the lowest parking level for all cars simultaneously", "Disabling of all fire alarm notification appliances in the hoistway"],
    "Phase II is firefighter-controlled operation after Phase I recall; occupant use of elevators during fire is generally prohibited.",
    { a: "Occupants must not use elevators for evacuation during fire.", b: "Cars recall to designated floors in Phase I, not uncontrolled lowest level.", c: "Notification appliances are not disabled in hoistways during operation." },
    "hard",
    rot(27)
  ),
  q(
    "Elevator shunt trip is intended to:",
    "Remove power from the elevator before water from sprinklers can cause unsafe operation",
    ["Increase elevator speed for firefighter access during Phase I", "Disable smoke detectors in the elevator lobby permanently", "Bypass Phase I recall and send cars to random floors"],
    "Shunt trip disconnects elevator power when heat/smoke or waterflow in hoistway/related areas threatens electrocution or unsafe movement.",
    { b: "Shunt trip removes power; it does not increase speed.", c: "Lobby detectors remain functional; shunt trip is power removal.", d: "Recall logic is not replaced by random floor selection." },
    "medium",
    rot(28)
  ),
  q(
    "Manual fire alarm boxes (pull stations) are typically located:",
    "Along exit paths within travel distances specified by NFPA 72 and occupancy codes",
    ["Only inside locked electrical rooms inaccessible to staff", "Exclusively at the roof mechanical equipment screen wall", "Only in areas with no automatic detection regardless of egress paths"],
    "Pull stations provide manual initiation along egress routes at code-required spacing and mounting height.",
    { a: "Locked inaccessible rooms defeat manual initiation purpose.", c: "Roof-only placement misses required egress path coverage.", d: "Manual stations are required in addition to automatic detection in most occupancies." },
    "easy",
    rot(29)
  ),
  q(
    "Waterflow switch activation from an automatic sprinkler system generates:",
    "An alarm signal indicating water movement in the sprinkler system",
    ["A supervisory signal only, never an alarm", "A trouble signal for battery low condition", "No signal if horn/strobes are already in alarm from a pull station"],
    "Waterflow switches initiate alarm when delayed or vane-type switches confirm sustained flow — distinct from tamper supervisory.",
    { a: "Waterflow is alarm, not supervisory.", b: "Battery low is a trouble condition.", d: "Additional alarm events still register; systems handle multiple alarms." },
    "medium",
    rot(30)
  ),
  q(
    "In an addressable fire alarm system, each initiating device has:",
    "A unique address allowing the panel to identify the specific device in alarm",
    ["No identification beyond a single zone lamp for the entire building", "Only a zone number shared by 50 devices with no individual distinction", "Identification solely by wire color without panel reporting"],
    "Addressable technology reports device-level location; conventional zones group multiple devices on one circuit.",
    { a: "Single building-wide indication is not addressable capability.", b: "Fifty devices on one indistinguishable zone is conventional zoning.", c: "Wire color is not the panel identification method." },
    "easy",
    rot(31)
  ),
  q(
    "A conventional fire alarm zone is defined as:",
    "A circuit or group of devices identified as a general area, not individually addressable",
    ["A software partition that assigns unique serial numbers to each detector", "A mass notification text message grouping for campus alerts", "A sprinkler hydraulic calculation area for water supply"],
    "Conventional systems identify area zones; troubleshooting requires physical zone subdivision or sequential testing.",
    { b: "Unique serial numbers per detector describe addressable systems.", c: "MNS text groups are emergency communication, not initiating zones.", d: "Hydraulic areas are suppression design terminology." },
    "medium",
    rot(32)
  ),
  q(
    "Smoke detectors should generally be located at least 3 ft away from supply air diffusers because:",
    "High airflow can dilute or push smoke away from the detector sensing chamber",
    ["NFPA 72 prohibits any detection within 50 ft of HVAC equipment", "Diffusers always produce ionizing radiation interfering with photoelectric cells", "Strobes mounted on diffusers replace ceiling smoke detectors"],
    "Air movement from supplies can prevent smoke entry or cause nuisance alarms from dust; minimum distances apply to returns and supplies.",
    { a: "The rule is not a blanket 50 ft prohibition from all HVAC.", c: "Diffusers do not produce ionizing radiation affecting detectors.", d: "Strobes do not replace smoke detectors at diffusers." },
    "medium",
    rot(33)
  ),
  q(
    "Annual inspection and testing of fire alarm components is primarily required by:",
    "NFPA 72 Chapter 14 inspection, testing, and maintenance provisions",
    ["NFPA 25 only, which covers all detection devices equally", "Manufacturer brochures without reference to adopted codes", "Optional internal policies with no code basis"],
    "NFPA 72 Chapter 14 defines frequencies and methods; NFPA 25 covers water-based fire protection systems.",
    { a: "NFPA 25 is sprinkler-focused and does not govern all detection device ITM.", b: "Manufacturer guidance supplements but does not replace code ITM.", d: "ITM is code-required for continued reliability, not merely optional policy." },
    "hard",
    rot(34)
  ),
  q(
    "Line-type heat detector spacing along a conveyor tunnel is typically based on:",
    "Manufacturer listing and NFPA 72 requirements for linear heat detection coverage",
    ["Standard 30 ft x 30 ft spot smoke detector grid spacing only", "Candela ratings for wall-mounted strobes in the tunnel", "Elevator recall landing floor selection criteria"],
    "Linear heat detection spacing follows product listing and application standards, often continuous coverage along the protected route.",
    { a: "Spot smoke grid spacing does not govern line-type heat cable.", b: "Candela ratings apply to notification appliances, not heat cable spacing.", c: "Elevator recall is unrelated to conveyor heat detection spacing." },
    "medium",
    rot(35)
  ),
  q(
    "Multi-criteria smoke detectors may reduce false alarms by:",
    "Requiring multiple sensor inputs (e.g., smoke and heat) before alarm confirmation",
    ["Disabling all heat sensing during business hours", "Removing photoelectric chambers to use ionization only", "Eliminating notification appliances on the same floor"],
    "Multi-criteria/multi-sensor devices use algorithms combining sensor data to discriminate fire from nuisances.",
    { b: "Disabling heat sensing would reduce discrimination capability.", c: "Removing photoelectric sensing limits smoldering fire detection.", d: "Notification appliances remain required regardless of sensor type." },
    "hard",
    rot(36)
  ),
  q(
    "Synchronization of visible notification appliances is required in NFPA 72 to:",
    "Prevent photosensitive seizures and disorientation from unsynchronized flashes",
    ["Increase candela output beyond listed ratings", "Eliminate the need for audible notification in sleeping areas", "Allow strobes to flash only during business hours"],
    "Synchronized flashes within viewing areas protect photosensitive individuals and improve perceptibility.",
    { a: "Synchronization does not increase listed candela.", c: "Audible notification is still required in sleeping areas.", d: "Strobes operate during emergencies regardless of business hours." },
    "medium",
    rot(37)
  ),
  q(
    "Voice evacuation fire alarm systems must meet:",
    "Intelligibility and audibility requirements per NFPA 72 for emergency voice/alarm communications",
    ["No audibility requirements if strobes are provided", "Whisper-level volume to reduce occupant stress", "Music playback capability at higher priority than fire messages"],
    "Emergency voice systems must be intelligible; design includes speaker spacing, power, and priority over background sound.",
    { a: "Strobes do not waive audible/intelligibility requirements.", b: "Whisper volume fails emergency communication requirements.", d: "Fire messages must override background music." },
    "medium",
    rot(38)
  ),
  q(
    "Carbon monoxide detection integrated with fire alarm systems is governed by:",
    "NFPA 72 provisions for household/fire CO detection and applicable occupancy codes",
    ["NFPA 13 hydraulic calculation methods only", "ASHRAE duct velocity tables exclusively without NFPA 72", "Elevator code shunt trip requirements only"],
    "CO detection rules appear in NFPA 72 and NFPA 101/IRC for specific occupancies; integration must not impair fire alarm function.",
    { a: "NFPA 13 does not govern CO detection integration.", b: "ASHRAE alone does not replace NFPA 72 CO provisions.", c: "Elevator shunt trip is unrelated to CO detection." },
    "medium",
    rot(39)
  ),
  q(
    "Pathway survivability for fire alarm circuits in high-rise buildings may require:",
    "Circuit routing and protection so alarms function during fire exposure per NFPA 72",
    ["Use of unshielded telephone wire in any plenum without listing", "Elimination of all strobes above the 10th floor", "Sharing only wireless mesh with no supervision"],
    "Survivability levels specify cable protection, routing in shafts, or 2-hour rating for certain occupancies and circuit types.",
    { b: "Strobes are not eliminated on upper floors.", c: "Unsupervised wireless-only systems do not meet survivability intent.", d: "Unlisted wire in plenums violates listing and code requirements." },
    "hard",
    rot(40)
  ),
  q(
    "In an atrium, smoke detector placement is typically based on:",
    "Engineered smoke management analysis and NFPA 72 performance-based or modified prescriptive spacing",
    ["Standard residential 20 ft spacing without engineering review", "Only duct detectors in the return plenum with no area detection", "Heat detectors exclusively because smoke rises too fast in atriums"],
    "Atria often require rational analysis for detection supporting smoke layer management; prescriptive spacing alone may be insufficient.",
    { a: "Residential spacing is inappropriate for atrium geometry.", c: "Duct detectors alone do not replace area detection needs.", d: "Smoke detection is central to atrium smoke management, not heat only." },
    "hard",
    rot(41)
  ),
  q(
    "For ceilings between 10 ft and 30 ft without beams, smoke detector spacing is often reduced to:",
    "Approximately 0.7 times the 30 ft spacing (21 ft) for heights up to 20 ft per NFPA 72 tables",
    ["60 ft spacing because taller ceilings concentrate smoke faster", "No change until ceiling exceeds 50 ft", "5 ft spacing regardless of ceiling height or occupancy"],
    "NFPA 72 Table 220.127.116.11.1 provides reduction factors; smoke delay at height drives tighter spacing.",
    { a: "Taller ceilings delay detection — spacing tightens, not widens to 60 ft.", b: "Spacing changes below 50 ft per tables, not only above.", d: "5 ft spacing is not the universal high-ceiling requirement." },
    "hard",
    rot(42)
  ),
  q(
    "Wall-mounted strobes for corridor notification are typically mounted with their lens at:",
    "80 inches minimum to 96 inches maximum above the finished floor",
    ["12 inches above the floor to meet ADA reach range only", "Exactly at ceiling level in all occupancies without exception", "6 inches below the floor for trip hazard visibility"],
    "NFPA 72 mounting height ranges ensure visibility over corridor obstructions while remaining within perceptible viewing zones.",
    { a: "Ceiling-only mounting is not the corridor wall strobe rule.", b: "12 inches is far too low for effective corridor visibility.", c: "Below-floor mounting is not a code-compliant strobe location." },
    "medium",
    rot(43)
  ),
  q(
    "Alarm verification features in fire alarm panels temporarily delay alarm transmission to:",
    "Allow the panel to reset if the initiating signal clears within a defined verification period",
    ["Permanently silence horns without fire department notification", "Disable sprinkler waterflow switches during verification", "Convert supervisory signals into trouble signals automatically"],
    "Verification reduces unwanted dispatches from transient signals; it is restricted/disallowed in many occupancies and for certain initiating devices.",
    { b: "Verification does not permanently silence required notification without code allowance.", c: "Waterflow is typically non-verifiable where dispatch is required.", d: "Supervisory signals are not converted to trouble by verification logic." },
    "hard",
    rot(44)
  ),
  q(
    "Smoke detectors on ceilings versus walls are generally preferred on ceilings because:",
    "Smoke rises and collects at the ceiling level first in typical fire development",
    ["Wall mounting eliminates all dust accumulation in the sensing chamber", "Ceiling mounting removes all dead air pocket concerns in beam construction", "NFPA 72 prohibits wall-mounted smoke detectors in every occupancy"],
    "Ceiling placement captures rising smoke; wall mounting is allowed only where listed and per code for specific situations like sleeping rooms.",
    { a: "Dust can still affect ceiling-mounted detectors.", c: "Beam pockets still create dead air concerns with ceiling mounting.", d: "Wall-mounted smoke detectors are permitted in defined applications." },
    "medium",
    rot(45)
  ),
  q(
    "When a fire alarm activates smoke exhaust fans, the sequence is usually coordinated so that:",
    "Fans, dampers, and doors operate per the approved smoke control rational analysis",
    ["All doors open simultaneously without regard to pressure differentials", "Fans start only after manual fire department radio confirmation always", "Stair pressurization is disabled to increase exhaust volume without limit"],
    "Smoke management integration follows engineered sequences maintaining tenability and pressure relationships.",
    { a: "Many sequences are automatic upon detection per approved design.", b: "Stair pressurization is often maintained, not arbitrarily disabled.", d: "Uncontrolled door opening can defeat intended pressure zones." },
    "hard",
    rot(46)
  ),
  q(
    "A heat detector in a garage bay is sometimes preferred over smoke detection because:",
    "Vehicle exhaust and fumes can cause frequent nuisance smoke alarms",
    ["Heat detectors respond to gasoline odor molecules in the air", "NFPA 72 prohibits smoke detectors in any parking structure", "Heat detectors eliminate the need for any notification appliances"],
    "Vehicle emissions trigger smoke detectors; heat or other listed strategies may be used per occupancy hazard analysis and code.",
    { a: "Heat detectors sense temperature, not odor molecules.", b: "Smoke detectors are not universally prohibited in parking structures.", c: "Notification appliances remain required where codes apply." },
    "medium",
    rot(47)
  ),
  q(
    "A flame detector differs from a smoke detector primarily because it senses:",
    "Electromagnetic radiation emitted by flames (UV/IR) rather than airborne particulate",
    ["Temperature rise only through fixed-contact bi-metal strips in ductwork", "Waterflow in sprinkler piping exceeding 10 gallons per minute", "Carbon monoxide concentration at 70 ppm in residential sleeping rooms"],
    "Flame detectors respond to radiant energy from flames, useful in high-ceiling industrial applications with fast fire development.",
    { b: "Bi-metal fixed contacts describe certain heat detectors, not flame detectors.", c: "Waterflow detection is sprinkler monitoring.", d: "CO at 70 ppm relates to carbon monoxide alarms, not flame detection." },
    "medium",
    rot(48)
  ),
  q(
    "The primary purpose of monitoring fire pump running status on the fire alarm panel as supervisory is to:",
    "Alert personnel when the pump is not in automatic or has an abnormal condition affecting readiness",
    ["Initiate occupant evacuation whenever the pump runs during a flow test", "Disable all smoke detectors in the pump room during operation", "Automatically close the main sprinkler control valve"],
    "Supervisory monitoring ensures the fire pump remains available; running during tests may signal on panel per design.",
    { a: "Pump running during tests does not automatically mean building evacuation.", c: "Smoke detection in pump rooms is not disabled by supervisory logic.", d: "Control valves are not closed automatically by pump supervisory." },
    "easy",
    rot(49)
  ),
];
