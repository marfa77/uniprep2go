import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "Under NFPA 13, Ordinary Hazard Group 1 occupancies are typically characterized by:",
    "Moderate quantities of combustibles with low heat release, such as light manufacturing and mechanical rooms",
    ["High-piled storage exceeding 12 ft without in-rack sprinklers", "Unsprinklered residential sleeping rooms only", "Exterior-only exposure protection with no interior piping"],
    "OH1 includes spaces with moderate fuel loads and low heat release rates; hazard classification drives sprinkler design density and area.",
    { b: "High-piled storage triggers storage classifications, not OH1.", c: "Residential sleeping is covered under dwelling standards, not OH1.", d: "Exposure protection is a separate application from interior OH1 design." },
    "easy",
    rot(0)
  ),
  q(
    "The design density for a light hazard occupancy per NFPA 13 is:",
    "0.10 gpm/ft² over the hydraulically most remote 1,500 ft² design area",
    ["0.30 gpm/ft² over 3,000 ft² for all light hazard rooms", "0.15 gpm/ft² over 2,000 ft² regardless of ceiling height", "0.60 gpm/ft² because light hazard includes office paper storage"],
    "Light hazard design uses 0.10 gpm/ft² and 1,500 ft² area; higher densities apply to ordinary and extra hazard classifications.",
    { a: "0.30 gpm/ft² is ordinary hazard territory, not light hazard.", c: "0.15 gpm/ft² is not the NFPA 13 light hazard baseline.", d: "Paper storage may elevate hazard class; light hazard remains 0.10/1,500." },
    "medium",
    rot(1)
  ),
  q(
    "An ESFR sprinkler is primarily selected to:",
    "Control or suppress high-challenge storage fires without in-rack sprinklers in many rack configurations",
    ["Replace standpipe hose streams in all high-rise buildings", "Eliminate the need for a fire pump on every wet system", "Serve as a substitute for clean agent systems in data halls"],
    "ESFR (Early Suppression Fast Response) sprinklers deliver high discharge to attack storage ceiling jets; they are a storage protection strategy under NFPA 13.",
    { a: "Standpipes address manual firefighting water; ESFR is automatic sprinkler protection.", c: "Fire pumps are sized to system demand; ESFR does not universally eliminate pumps.", d: "Clean agents protect sensitive electronics; ESFR is water-based storage protection." },
    "medium",
    rot(2)
  ),
  q(
    "A wet pipe sprinkler system is defined as:",
    "Piping filled with water under pressure, with water discharged immediately when a sprinkler operates",
    ["Piping charged with supervisory air until a detector opens a valve", "A system requiring manual opening of a deluge valve at the fire panel", "Dry piping that fills only after all sprinklers in a zone fuse simultaneously"],
    "Wet systems hold water at sprinklers continuously — the most common and simplest automatic sprinkler type.",
    { a: "Supervisory air describes dry or preaction systems, not wet pipe.", c: "Manual deluge valve operation is characteristic of deluge systems.", d: "Dry systems fill upon sprinkler activation; wet systems are already charged." },
    "easy",
    rot(3)
  ),
  q(
    "In a dry pipe sprinkler system, the primary purpose of the air/nitrogen supervisory pressure is to:",
    "Hold the dry pipe valve closed and monitor for leaks while keeping piping free of water until activation",
    ["Increase sprinkler K-factor at the remote end of the branch line", "Replace the need for a fire department connection", "Maintain 175 psi at every sprinkler orifice continuously"],
    "Dry systems use pressurized air above the dry valve clapper; loss of air upon sprinkler opening allows water in — critical for freeze-prone spaces.",
    { b: "FDC provides supplemental water; it does not replace dry system air supervision.", c: "Orifice pressure varies hydraulically; air pressure serves the dry valve, not each head.", d: "K-factor is a sprinkler property, unaffected by supervisory air." },
    "medium",
    rot(4)
  ),
  q(
    "A single-interlock preaction system typically:",
    "Admits water to piping upon operation of a detection device, with sprinkler operation required to discharge water",
    ["Discharges water from all open sprinklers immediately when any detector alarms", "Requires both detection and sprinkler operation before the preaction valve opens", "Uses antifreeze solution in lieu of detection to prevent freezing"],
    "Single interlock preaction opens the valve on detection; piping is not necessarily flooded until heads operate — protecting water-sensitive spaces.",
    { a: "Immediate discharge from open heads describes deluge upon detection.", b: "Dual detection plus sprinkler is double interlock preaction.", d: "Antifreeze is a freeze protection method, not a preaction interlock strategy." },
    "hard",
    rot(5)
  ),
  q(
    "A double-interlock preaction sprinkler system is most appropriate when:",
    "Accidental water discharge must be minimized and both detection and sprinkler heat are required to release water",
    ["The occupancy is an unheated loading dock subject only to freezing", "All sprinklers must be open before any detection is installed", "The building has no fire alarm system and relies on fusible links only"],
    "Double interlock reduces inadvertent flooding — common in museums, archives, and telecommunications spaces.",
    { a: "Freeze risk alone often leads to dry pipe, not necessarily double interlock.", c: "Deluge uses open heads; double interlock still uses closed sprinklers.", d: "Detection is integral to preaction interlocks." },
    "hard",
    rot(6)
  ),
  q(
    "A deluge sprinkler system differs from a wet system because:",
    "All sprinklers are open and water is released through the entire protected area when the deluge valve opens",
    ["Each sprinkler contains an individual glass bulb that holds water back", "Water is held back by antifreeze until room temperature exceeds 200°F", "Only one sprinkler in the remote area discharges during design"],
    "Deluge systems use open nozzles and a detection-initiated valve — typical for high-hazard special applications and some aircraft hangars.",
    { a: "Individual bulbs describe standard closed sprinklers.", c: "Antifreeze systems are a different wet-system variant.", d: "Standard wet design assumes one or more operating sprinklers, not deluge flooding." },
    "medium",
    rot(7)
  ),
  q(
    "Per NFPA 14, a Class I standpipe system is intended to provide:",
    "2½-inch hose connections for fire department use with water available for heavy stream appliances",
    ["1½-inch connections for trained occupant use only with no 2½-inch outlets", "Dry standpipes with no water supply until FDC charging only", "Foam solution exclusively at each landing valve"],
    "Class I standpipes supply FD 2½-inch connections; Class II adds occupant hose, Class III combines both.",
    { b: "1½-inch occupant hose is Class II emphasis.", c: "Wet or dry classification addresses water presence, not Class I definition.", d: "Foam standpipes are specialized; Class I is water for firefighting." },
    "easy",
    rot(8)
  ),
  q(
    "The minimum flow rate required at the hydraulically most remote 2½-inch hose connection for a Class I standpipe in many buildings is:",
    "500 gpm for the most remote standpipe plus additional demand for simultaneous sprinkler systems where applicable",
    ["100 gpm total for the entire building regardless of height", "250 gpm only when the building is fully sprinklered", "1,000 gpm at every hose outlet simultaneously without hydraulic calculation"],
    "NFPA 14 hydraulic calculations ensure remote outlet capability; combined sprinkler/standpipe demand must be evaluated.",
    { a: "100 gpm is far below remote standpipe design requirements.", c: "Sprinklered buildings still require standpipe flows per calculated demand.", d: "Not every outlet flows simultaneously at full rate; hydraulics define remote worst case." },
    "hard",
    rot(9)
  ),
  q(
    "A combined sprinkler/standpipe riser in a high-rise must consider:",
    "Total water demand including sprinkler design area flow plus standpipe hose stream allowance per NFPA 14 and 13",
    ["Standpipe demand only, because sprinklers are decorative", "Sprinkler demand only when standpipes are Class II", "Whichever system has lower pressure governs without summation"],
    "Combined risers are sized for cumulative demand; fire pumps and tanks must satisfy both automatic and manual suppression needs.",
    { b: "Class II occupant hose still requires hydraulic evaluation with sprinklers.", c: "Lower pressure alone does not govern; total demand and duration matter.", d: "Sprinklers are primary automatic suppression, not decorative." },
    "medium",
    rot(10)
  ),
  q(
    "NFPA 20 requires that a fire pump:",
    "Be listed and installed to deliver rated capacity and pressure to the fire protection system under automatic or manual start",
    ["Operate only when manually started by the fire department at the FDC", "Replace all elevation head calculations in sprinkler hydraulics", "Be sized solely to domestic water peak demand with no fire flow"],
    "Fire pumps boost available water supply when municipal or tank supplies cannot meet sprinkler/standpipe hydraulic demand.",
    { a: "Automatic start on pressure drop is typical; manual-only is not the NFPA 20 intent.", c: "Elevation head remains in hydraulic calculations; pumps add pressure/flow.", d: "Domestic demand does not define fire pump sizing." },
    "easy",
    rot(11)
  ),
  q(
    "The rated churn (shutoff) pressure of a centrifugal fire pump is:",
    "The pressure developed at zero flow on the pump curve, typically 120–140% of rated pressure per listing",
    ["The pressure at maximum rated flow only", "Always equal to static municipal pressure without boost", "The suction pressure at the water source"],
    "Churn pressure is used in hydraulic calculations to ensure components are not over-pressurized at no-flow conditions.",
    { b: "Rated pressure is at rated flow; churn is zero-flow condition.", c: "Municipal static is supply; churn is pump-developed shutoff pressure.", d: "Suction pressure is on the inlet side, not shutoff discharge." },
    "hard",
    rot(12)
  ),
  q(
    "A diesel-driven fire pump engine must have:",
    "An independent fuel supply sized for endurance testing and expected run time per NFPA 20",
    ["Shared fuel tank with building emergency generators only, without separation", "No cooling provision because fire events are brief", "Manual crank start as the only permitted method"],
    "Diesel fire pumps require reliable fuel, cooling, and automatic starting — often in dedicated pump rooms.",
    { a: "Fuel supply must meet NFPA 20 endurance; sharing requires careful compliance.", c: "Cooling is required for engine reliability during test and fire runs.", d: "Automatic electric start is standard; manual-only is not typical." },
    "medium",
    rot(13)
  ),
  q(
    "The purpose of a jockey (make-up) pump on a fire pump installation is to:",
    "Maintain system pressure within a narrow band and reduce unnecessary cycling of the main fire pump",
    ["Replace the fire pump during annual testing permanently", "Provide foam concentrate injection to standpipes", "Serve as the primary pump on all NFPA 13R systems"],
    "Jockey pumps offset small leaks and pressure fluctuations without starting the main fire pump.",
    { a: "Fire pump remains primary; jockey is auxiliary.", c: "Foam injection is separate proportioning equipment.", d: "NFPA 13R systems may not require fire pumps depending on supply." },
    "medium",
    rot(14)
  ),
  q(
    "Under NFPA 22, a private fire protection water storage tank must account for:",
    "Volume to supply required fire flow duration plus refill considerations and dead storage as applicable",
    ["Only 30 minutes of domestic water for the largest restroom", "Tank volume based solely on building footprint area", "No seismic or wind load requirements on elevated tanks"],
    "Tank sizing ties to hydraulic duration from NFPA 13/14/20 calculations; NFPA 22 covers construction and protection.",
    { b: "Domestic use does not size fire tanks.", c: "Footprint alone does not define fire water volume.", d: "Structural loads including seismic apply to tank design." },
    "medium",
    rot(15)
  ),
  q(
    "An anti-vortex plate in a fire pump suction tank is installed to:",
    "Prevent swirling and air entrainment at the suction intake that could cause pump cavitation",
    ["Increase water temperature to prevent ice formation", "Filter debris larger than 1 inch from municipal mains", "Measure flow rate to the fire department connection"],
    "Vortexing can introduce air and destroy pump performance; anti-vortex plates are common NFPA 22 details.",
    { b: "Temperature control is separate from vortex prevention.", c: "Screening may occur elsewhere; anti-vortex addresses suction hydraulics.", d: "FDC flow measurement is not the plate's function." },
    "hard",
    rot(16)
  ),
  q(
    "Hazen-Williams C-factor selection in sprinkler hydraulics should reflect:",
    "The internal roughness condition of the piping material and expected age/corrosion of the system",
    ["Only the exterior paint color of exposed pipe", "The K-factor of the most remote sprinkler", "The building occupancy nameplate on the front door"],
    "C-factor affects friction loss calculations; older rough pipe reduces effective C and increases pressure demand.",
    { a: "Paint color has no hydraulic effect.", c: "K-factor is sprinkler discharge coefficient, not pipe roughness.", d: "Occupancy signage does not define C-factor." },
    "medium",
    rot(17)
  ),
  q(
    "The 'hydraulically most remote' design area in NFPA 13 is:",
    "The design area that requires the greatest water pressure at the source when flowing design density",
    ["The area closest to the fire pump discharge flange", "The room with the highest ceiling regardless of sprinkler spacing", "Any 1,500 ft² rectangle chosen arbitrarily by the installer"],
    "Remote area analysis ensures the supply can deliver density at the worst-case location on the sprinkler grid.",
    { a: "Nearest area to pump is often easiest to supply, not most remote.", c: "Ceiling height affects design but remote is a hydraulic determination.", d: "Design area location is calculated, not arbitrary." },
    "medium",
    rot(18)
  ),
  q(
    "A sprinkler with a K-factor of 5.6 at 50 psi flowing pressure discharges approximately:",
    "39.6 gpm, calculated as K√P",
    ["5.6 gpm because K equals flow directly", "280 gpm from multiplying K times pressure", "11.2 gpm from dividing pressure by K"],
    "Sprinkler discharge follows Q = K√P; at 50 psi, K5.6 yields about 39.6 gpm.",
    { a: "K is not equal to gpm; √(pressure) is required.", c: "K×P is not the sprinkler discharge formula.", d: "P/K does not yield flow." },
    "hard",
    rot(19)
  ),
  q(
    "Fast-response sprinklers are distinguished from standard-response primarily by:",
    "Thermal sensitivity (RTI) and activation time suitable for life safety and certain storage applications",
    ["Higher K-factor only, with identical thermal element size", "Use exclusively in deluge systems with open nozzles", "Requirement for 500 psi minimum operating pressure"],
    "Fast-response sprinklers activate quicker; ESFR and residential sprinklers are fast-response categories.",
    { b: "K-factor and response type are independent parameters.", c: "Deluge uses open heads, not thermally sensitive fast-response closed heads.", d: "Operating pressure follows hydraulic demand, not a universal 500 psi." },
    "medium",
    rot(20)
  ),
  q(
    "Sprinkler spacing under unobstructed construction in ordinary hazard occupancies is generally limited to:",
    "15 ft maximum between sprinklers on branch lines and 15 ft between branch lines per NFPA 13 tables",
    ["7 ft 6 in maximum regardless of hazard or construction type", "30 ft spacing when heat detectors are present", "20 ft spacing only if K14.0 heads are used"],
    "Spacing tables balance ceiling coverage and activation timing; obstructed construction reduces permitted spacing.",
    { a: "7 ft 6 in is tighter than ordinary hazard unobstructed limits.", c: "Detectors do not replace sprinkler spacing rules.", d: "K-factor selection does not automatically allow 20 ft spacing." },
    "medium",
    rot(21)
  ),
  q(
    "A sprinkler concealed above a ceiling with a cover plate is designed so that:",
    "The cover plate releases at a lower temperature than the sprinkler element to expose the deflector before activation",
    ["The cover plate never releases and the sprinkler operates through it", "The sprinkler operates only when the cover plate is manually removed", "Cover plates replace the need for a listed sprinkler heat responsive element"],
    "Concealed sprinklers coordinate cover plate dropout with fusible link or glass bulb activation for proper spray pattern.",
    { a: "Covers must drop away; operating through plate would block distribution.", c: "Manual removal is not part of automatic operation.", d: "Listed heat-responsive element remains required." },
    "hard",
    rot(22)
  ),
  q(
    "In-rack sprinklers in storage occupancies are used to:",
    "Control fire within rack storage arrays where ceiling-only sprinklers cannot penetrate rack barriers",
    ["Eliminate ceiling sprinklers in all warehouse buildings", "Protect exterior loading docks without roofs", "Replace fire pumps when ceiling height exceeds 40 ft"],
    "In-rack sprinklers address rack flue spaces and commodity shielding — common in NFPA 13 storage chapters.",
    { a: "Ceiling sprinklers usually remain required with in-rack supplementation.", c: "Exterior docks use different protection strategies.", d: "Pumps are sized to total demand; in-rack does not eliminate pumps." },
    "medium",
    rot(23)
  ),
  q(
    "CMSA (Control Mode Specific Application) sprinklers in storage are intended to:",
    "Limit fire size to a specific design scenario rather than achieve early suppression of high-challenge fires",
    ["Always replace ESFR in every high-piled storage arrangement", "Operate only as sidewall sprinklers along conveyor belts", "Discharge foam solution premixed at each head"],
    "CMSA is a control strategy with defined design criteria; ESFR targets early suppression in qualifying scenarios.",
    { a: "ESFR and CMSA apply to different storage protection philosophies.", c: "CMSA are typically pendent/upright ceiling sprinklers.", d: "CMSA sprinklers are water-based unless specifically listed otherwise." },
    "hard",
    rot(24)
  ),
  q(
    "NFPA 11 covers:",
    "Low-, medium-, and high-expansion foam systems for Class B and certain special hazards",
    ["Residential dwelling unit sprinkler retrofit only", "Carbon dioxide total flooding concentration tables exclusively", "Kitchen hood grease duct welding procedures only"],
    "NFPA 11 addresses foam water solution proportioning, discharge devices, and system design for flammable liquid hazards.",
    { b: "CO2 is NFPA 12.", c: "Dwelling sprinklers are NFPA 13D.", d: "Kitchen systems are NFPA 96 with listed UL 300 appliances." },
    "easy",
    rot(25)
  ),
  q(
    "A balanced pressure foam proportioning system maintains:",
    "Equal pressure on foam concentrate and water inlets to the proportioner for accurate metering",
    ["Higher water pressure than concentrate by exactly 50 psi at all flows", "Zero foam concentrate use during system flushing", "Separate fire pump curves for each foam chamber without reference to water supply"],
    "Balanced pressure systems stabilize proportioning across flow ranges — common in aircraft hangar and tank farm protection.",
    { a: "Equal, not fixed 50 psi differential, is the design goal.", c: "Flushing may use water only temporarily but not normal operation.", d: "Pump sizing still relates to combined foam solution demand." },
    "hard",
    rot(26)
  ),
  q(
    "High-expansion foam is particularly suited to:",
    "Filling large volumes such as warehouses or LNG impoundments to separate fuel from air",
    ["Precision discharge on energized computer circuit boards", "Ordinary combustible paper storage without flammable liquids", "Subsurface injection into underground gasoline tanks exclusively"],
    "High-expansion foam generates voluminous bubbles for total flooding of enclosures and vapor suppression.",
    { a: "Energized electronics need non-conductive agents, not high-expansion foam flooding.", c: "Class A paper may use sprinklers; high-expansion targets vapor/air separation.", d: "Subsurface foam is one application; high-expansion also floods enclosures." },
    "medium",
    rot(27)
  ),
  q(
    "NFPA 12 addresses:",
    "Carbon dioxide fire extinguishing systems including total flooding and local application",
    ["Wet chemical kitchen suppression only", "Standpipe hose thread standards exclusively", "Smoke control fan wiring in atriums only"],
    "NFPA 12 covers CO2 system design, concentrations, safety lockouts, and ventilation warnings for occupied areas.",
    { a: "Kitchen wet chemical is NFPA 17A/UL 300 context.", c: "Standpipes are NFPA 14.", d: "Smoke control is NFPA 92 series." },
    "easy",
    rot(28)
  ),
  q(
    "Before discharging CO2 into an normally occupied enclosure, NFPA 12 requires:",
    "Predischarge alarms and time delay or personnel accounting to allow evacuation",
    ["No warning because CO2 is odorless and harmless to humans", "Immediate discharge upon any heat detector activation without delay", "Manual discharge only from outside without any automatic detection"],
    "CO2 is asphyxiant; lockout and warning devices protect occupants from lethal oxygen displacement.",
    { a: "CO2 is hazardous to life at extinguishing concentrations.", c: "Automatic discharge is permitted with life safety safeguards.", d: "Automatic systems are common with required safety interlocks." },
    "medium",
    rot(29)
  ),
  q(
    "A total flooding CO2 system design concentration depends primarily on:",
    "Fuel type, enclosure volume, and minimum design concentration from NFPA 12 tables",
    ["Ceiling sprinkler density from NFPA 13 only", "Number of standpipe outlets per floor", "Domestic water fixture unit count"],
    "CO2 quantity = concentration × adjusted volume; deep-seated fires may need extended holding periods.",
    { b: "Sprinkler density does not size CO2 concentration.", c: "Standpipes are unrelated to CO2 flooding volume.", d: "Plumbing fixture units are irrelevant." },
    "medium",
    rot(30)
  ),
  q(
    "Clean agent systems covered under NFPA 2001 are characterized by:",
    "Electrically nonconductive gaseous agents that extinguish by heat absorption and/or oxygen reduction without residue",
    ["Water mist only with no gaseous phase", "Dry chemical powder permanently coating all surfaces", "Fuel shutoff valves exclusively without extinguishing medium"],
    "Clean agents (HFCs, FK-5-1-12, inert gases) protect sensitive equipment in enclosures with concentration-based design.",
    { a: "Water mist is NFPA 750.", c: "Dry chemical leaves residue; clean agents minimize residue.", d: "Fuel shutoff may supplement but does not define clean agent systems." },
    "easy",
    rot(31)
  ),
  q(
    "Room integrity (door fan) testing for clean agent enclosures verifies:",
    "Sufficient agent retention time at design concentration by limiting excessive leakage",
    ["Sprinkler coverage in adjacent corridors", "Structural fire resistance rating of exterior walls only", "Adequate lighting levels for maintenance staff"],
    "Hold time ensures fire does not reignite; excessive leakage requires sealing or higher agent quantity.",
    { b: "Fire resistance is building code; integrity is leakage for agent hold.", c: "Lighting is unrelated to agent retention.", d: "Sprinkler coverage in corridors is separate protection." },
    "hard",
    rot(32)
  ),
  q(
    "Inergen (inert gas blend) extinguishing systems reduce oxygen concentration to approximately:",
    "12–15% by volume, below combustion support for many fuels while permitting human exposure briefly during egress",
    ["5% oxygen matching deep-sea diving mixtures", "21% oxygen with no change from ambient air", "0% oxygen achieved by vacuuming the room"],
    "Inert agents lower O₂ to extinguishing level while staying above immediate lethality for brief exposure — still requiring evacuation.",
    { a: "5% is immediately dangerous to life.", c: "21% is normal air; no extinguishment.", d: "Vacuum is not a clean agent deployment method." },
    "hard",
    rot(33)
  ),
  q(
    "NFPA 17 covers:",
    "Dry chemical extinguishing systems for local application and total flooding of specific hazards",
    ["Foam proportioning for municipal hydrants only", "Residential 13D sprinkler pipe sizing only", "Emergency voice evacuation intelligibility testing"],
    "NFPA 17 addresses dry chemical hardware, hazards, and recharge for flammable liquid and gas applications.",
    { a: "Foam proportioning is NFPA 11.", c: "13D is residential sprinklers.", d: "Voice intelligibility is NFPA 72/Annex contexts." },
    "easy",
    rot(34)
  ),
  q(
    "NFPA 17A applies to:",
    "Wet chemical extinguishing systems, including many commercial kitchen hood applications",
    ["High-pressure CO2 localized rotor cooling", "Underground diesel fuel tank cathodic protection", "Smoke detector spacing in sleeping rooms"],
    "NFPA 17A covers wet chemical systems that saponify cooking oils — paired with UL 300 listed appliances.",
    { a: "CO2 is NFPA 12.", c: "Cathodic protection is corrosion engineering.", d: "Detector spacing is NFPA 72." },
    "easy",
    rot(35)
  ),
  q(
    "A UL 300-listed kitchen fire suppression system requires:",
    "Nozzles protecting hood, plenum, and duct; fusible links or detection; manual pull; fuel/power shutoff interlocks",
    ["Only a single water sprinkler above the fryer with no chemical agent", "Discharge of halon 1301 as the only permitted agent", "Annual testing by disabling fuel shutoff interlocks permanently"],
    "Modern cooking oils need wet chemical saponification; UL 300 reflects current appliance and fuel loads.",
    { a: "Ordinary sprinklers alone do not meet commercial kitchen grease fire criteria.", c: "Halon is not used in new kitchen systems.", d: "Fuel/power shutoff interlocks must remain functional." },
    "medium",
    rot(36)
  ),
  q(
    "The primary extinguishing mechanism of wet chemical kitchen systems on grease fires is:",
    "Saponification forming a foam blanket that separates grease from oxygen and cools surfaces",
    ["Dilution of grease to non-flammable concentrations with water only", "Displacement of all oxygen in the entire building by CO2", "Increasing combustion temperature to burn grease completely"],
    "Wet chemicals convert burning fat to soap-like foam; water-only on hot grease can spread fire.",
    { a: "Water alone can cause grease fire spread and is insufficient.", c: "Building-wide CO2 flooding is not kitchen system design.", d: "Raising temperature fuels combustion." },
    "medium",
    rot(37)
  ),
  q(
    "Antifreeze loops in sprinkler systems per NFPA 13 must use:",
    "Listed antifreeze solutions meeting concentration and corrosion limits for the minimum use temperature",
    ["Automotive ethylene glycol without listing regardless of concentration", "Salt water brine as a permanent substitute in all climates", "Any glycol mixture above 70% without engineering review"],
    "Listed antifreeze protects small unheated portions; recent editions restrict unlisted glycols due to flammability and corrosion.",
    { b: "Automotive antifreeze is not automatically acceptable.", c: "Brine is not standard listed sprinkler antifreeze.", d: "High concentrations require compliance with listing and hazard review." },
    "hard",
    rot(38)
  ),
  q(
    "A pressure relief valve on a wet sprinkler system riser protects against:",
    "Trap pressure from thermal expansion of water when the system is isolated and heated",
    ["Loss of all system pressure during normal fire flow", "Corrosion inside dry pipe valves only", "Excessive airflow in preaction supervisory piping"],
    "Heated water expands; without relief, trapped pressure can damage fittings — common above check valves.",
    { a: "Fire flow reduces pressure; relief addresses over-pressurization.", c: "Dry valve corrosion is maintenance, not thermal expansion.", d: "Preaction air uses air vents, not water relief valves on wet risers." },
    "medium",
    rot(39)
  ),
  q(
    "The fire department connection (FDC) on a sprinkler/standpipe system:",
    "Allows the fire service to supplement water into the system at pumped pressure",
    ["Replaces the water supply tank volume calculation entirely", "Serves as the primary drain point for all annual trip tests", "Must be located inside the fire pump room exclusively"],
    "FDC inlets provide supplemental attack water; signage and threading must match local FD practice.",
    { a: "Tank and supply sizing still required; FDC supplements during fire.", c: "Drains are separate; FDC is an inlet.", d: "FDC is typically exterior accessible to apparatus." },
    "easy",
    rot(40)
  ),
  q(
    "A forward-flow test of a backflow preventer on a fire protection supply verifies:",
    "That the assembly allows required fire flow without excessive pressure loss while preventing backflow",
    ["Paint adhesion on exterior standpipe cabinets", "Voice evacuation audibility on the opposite wing", "Sprinkler bulb color coding in storage"],
    "Annual forward-flow ensures the backflow device does not choke fire demand — critical for combined domestic/fire services.",
    { b: "Audibility is alarm system testing.", c: "Bulb color is manufacturer temperature rating, not backflow test.", d: "Cabinet paint is unrelated." },
    "medium",
    rot(41)
  ),
  q(
    "Extra Hazard Group 2 occupancies per NFPA 13 include examples such as:",
    "Flammable liquid spraying, plastics processing, and other high heat release operations",
    ["Light office paper storage in open cubicles only", "Sleeping rooms in one- and two-family dwellings", "Parking garages with only passenger vehicles and no fuel dispensing"],
    "EH2 has high heat release and rapid fire growth; design density 0.40 gpm/ft² over 2,500 ft² is typical baseline.",
    { a: "Office cubicles are usually light or ordinary hazard.", c: "Dwelling sleeping is NFPA 13D/13R scope.", d: "Ordinary parking may be OH1/OH2 depending on fuel load." },
    "medium",
    rot(42)
  ),
  q(
    "Sidewall sprinklers are typically used where:",
    "Pendent sprinklers cannot be installed due to obstructions or architectural limits along walls",
    ["Only underground vault protection is required", "Deluge open nozzles are prohibited by code", "Standpipe Class II hose stations replace all ceiling sprinklers"],
    "Sidewall sprinklers have specific coverage limits and must be listed for sidewall application.",
    { a: "Underground vaults use different suppression strategies.", c: "Deluge is separate; sidewalls are closed heat-responsive heads.", d: "Standpipes do not replace sprinklers where sprinklers are required." },
    "easy",
    rot(43)
  ),
  q(
    "The main drain test on a sprinkler system riser is performed to:",
    "Verify water supply adequacy and identify obstructions by measuring flow at the drain connection",
    ["Calibrate heat detector spacing in adjacent rooms", "Prove foam concentrate viscosity annually", "Set clean agent design concentration automatically"],
    "Main drain flow compared to acceptance baseline indicates supply deterioration or valve obstruction.",
    { a: "Detector spacing is not validated by main drain.", c: "Foam viscosity has separate procedures.", d: "Clean agent concentration uses agent quantity and volume." },
    "medium",
    rot(44)
  ),
  q(
    "NFPA 13R systems in residential occupancies up to four stories differ from NFPA 13 in that:",
    "13R permits omissions of sprinklers in certain areas and has distinct design objectives focused on life safety",
    ["13R requires ESFR in every closet and bathroom without exception", "13R mandates double-interlock preaction throughout", "13R eliminates all fire department connection requirements nationally"],
    "NFPA 13R balances cost and life safety in residential mid-rise; not equivalent to full 13 commodity protection.",
    { a: "ESFR is storage protection, not 13R residential.", c: "Preaction is special hazard protection, not 13R default.", d: "FDC requirements depend on codes and AHJ; 13R does not universally eliminate FDC." },
    "hard",
    rot(45)
  ),
  q(
    "A looped automatic sprinkler feed main is hydraulically advantageous because:",
    "It can supply water from two directions, reducing friction loss to remote branches",
    ["It eliminates the need for any elevation head calculation", "It guarantees all sprinklers operate simultaneously", "It replaces listed sprinklers with open pipes"],
    "Looping provides redundancy of path; calculations still determine realistic simultaneous flows.",
    { b: "Elevation head remains in calculations.", c: "Not all sprinklers flow at once in standard design.", d: "Open pipes would be deluge, not looped wet mains." },
    "medium",
    rot(46)
  ),
  q(
    "Water mist systems per NFPA 750 differ from standard sprinklers primarily by:",
    "Discharging fine water droplets with high surface area for cooling and oxygen displacement at lower total water flow",
    ["Using only dry chemical powder in a water carrier", "Requiring no water supply because mist is generated chemically", "Operating exclusively at 1,000 psi without listing"],
    "Water mist is a distinct technology with listed hardware and applications in machinery and heritage spaces.",
    { a: "Dry chemical is separate technology.", c: "Water mist still requires water supply.", d: "Pressure varies by listing; not universally 1,000 psi." },
    "hard",
    rot(47)
  ),
  q(
    "Hazard classification under NFPA 13 for storage occupancies considers:",
    "Commodity class, storage height, pallet type, and aisle width — not office occupancy labels alone",
    ["Only the building's historical landmark designation", "Interior designer color palette of rack uprights", "Number of parking spaces in the site plan"],
    "Storage chapters classify commodities (Class I–IV, plastics, idle pallets) to select design criteria.",
    { a: "Landmark status does not define sprinkler storage class.", c: "Rack paint color is irrelevant.", d: "Parking counts do not set storage commodity class." },
    "medium",
    rot(48)
  ),
  q(
    "When designing sprinklers for high-ceiling storage with solid shelving, the designer must:",
    "Apply obstructed storage rules, potentially increasing sprinkler density or adding in-rack protection",
    ["Use light hazard spacing because the ceiling is far from commodities", "Remove all ceiling sprinklers and rely on hose streams only", "Ignore shelving because ESFR always suppresses without analysis"],
    "Solid shelving blocks ceiling water penetration; NFPA 13 storage sections require enhanced protection.",
    { a: "Greater ceiling height does not automatically reduce hazard.", c: "Hose streams supplement but do not replace required automatic sprinklers.", d: "ESFR applicability depends on commodity, height, and configuration analysis." },
    "hard",
    rot(49)
  ),
];
