import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "Under NFPA 101, the three primary components of a means of egress are:",
    "Exit access, exit, and exit discharge",
    ["Fire alarm, sprinkler, and standpipe only", "Atrium, shaft, and plenum exclusively", "Lobby, vestibule, and roof deck only"],
    "NFPA 101 defines means of egress as the continuous and unobstructed path from any point to a public way via exit access, exit, and exit discharge.",
    { b: "Active fire protection systems support life safety but are not the three egress components.", c: "Architectural features may be part of paths but are not the defined trio.", d: "Lobby and roof elements may appear in paths but do not define the three-part model." },
    "easy",
    rot(0)
  ),
  q(
    "Occupant load for a building or portion thereof is determined by:",
    "Dividing the floor area by the occupant load factor for the use, then applying code rounding rules",
    ["Counting only employees on the payroll", "Using the architect's seating sketch without area factors", "Multiplying travel distance by exit width"],
    "NFPA 101 assigns occupant load factors by use/occupancy; area divided by factor yields required design occupant load.",
    { b: "Payroll counts do not establish code design occupant load.", c: "Sketches without area factors miss required calculations.", d: "Travel distance and exit width relate to egress capacity, not occupant load calculation." },
    "medium",
    rot(1)
  ),
  q(
    "When calculating occupant load for fixed seating in an assembly occupancy, the count typically includes:",
    "All fixed seats plus any standing-room areas calculated separately by area factor",
    ["Only seats sold for the current event", "Half of fixed seats to allow social distancing by default", "Exit stair width divided by 0.3 inches per person"],
    "Fixed seating occupant load is based on installed seats; adjacent standing areas use applicable load factors.",
    { b: "Event sales do not define code design occupant load.", c: "NFPA 101 does not default to half-capacity seating counts.", d: "Exit width formulas apply to egress capacity, not seating counts." },
    "medium",
    rot(2)
  ),
  q(
    "Travel distance in NFPA 101 is measured:",
    "Along the natural unobstructed egress path from the most remote point to the nearest exit",
    ["As straight-line distance through walls and partitions", "From the main entrance door only", "Vertically from floor to ceiling in the room"],
    "Travel distance follows the actual walking path occupants would use, not diagonal shortcuts through obstructions.",
    { b: "Diagonal paths ignoring partitions are not permitted.", c: "Measurement is not limited to entrance doors.", d: "Vertical room height is irrelevant to horizontal travel distance." },
    "easy",
    rot(3)
  ),
  q(
    "Common path of travel differs from travel distance because it measures:",
    "The portion of exit access that must be traversed before two separate egress paths become available",
    ["Total distance to the public way including exit discharge", "Only the width of the exit door", "Distance from the fire alarm panel to the street"],
    "Common path limits how far occupants may travel before the path splits to provide alternative egress options.",
    { b: "Exit discharge is outside common path measurement.", c: "Door width is a capacity issue, not common path length.", d: "Alarm panel location is unrelated to occupant egress paths." },
    "medium",
    rot(4)
  ),
  q(
    "Exit capacity (egress width) for stairs is commonly calculated using a factor of:",
    "0.3 inches of clear width per occupant (NFPA 101 Chapter 7 methodology)",
    ["0.2 inches per occupant for all stairs regardless of occupancy", "1.0 inch per occupant for every exit component", "Total building square footage divided by 100"],
    "Stair capacity uses the 0.3 in/person factor; doors and other components use 0.2 in/person in the standard capacity calculation.",
    { b: "0.2 in/person applies to doors and some other components, not stairs.", c: "1.0 in/person is not the NFPA 101 stair factor.", d: "Area division by 100 is not the egress width formula." },
    "medium",
    rot(5)
  ),
  q(
    "When two egress components serve the same occupant load, the required combined capacity must:",
    "Equal or exceed the total occupant load served, with each component sized per code minimums",
    ["Be split so one exit carries 90% and the other 10% arbitrarily", "Use only the larger component and ignore the smaller", "Depend solely on sprinkler status without width checks"],
    "All required exits must be sized so aggregate capacity meets or exceeds the occupant load assigned to them.",
    { b: "Arbitrary splits can leave one exit undersized.", c: "Both components must meet capacity requirements.", d: "Sprinklers may allow exceptions in some occupancies but do not eliminate width calculations." },
    "hard",
    rot(6)
  ),
  q(
    "Emergency lighting along the means of egress is required to provide illumination for at least:",
    "90 minutes upon loss of normal power (NFPA 101 typical requirement)",
    ["15 minutes only in all occupancies without exception", "Until the fire department arrives with no minimum duration", "5 minutes if the building has a fire alarm"],
    "NFPA 101 generally requires 90 minutes of emergency illumination for egress paths and exit signs.",
    { b: "15 minutes is insufficient for the standard NFPA 101 duration.", c: "Duration is code-defined, not based on fire department arrival.", d: "Fire alarm presence does not reduce emergency lighting duration." },
    "easy",
    rot(7)
  ),
  q(
    "Illumination levels for emergency lighting on the walking surface of egress paths are typically required to be at least:",
    "1 foot-candle (10.8 lux) measured at the floor",
    ["0.1 foot-candle at the ceiling only", "5 foot-candles at all times including normal power", "20 foot-candles at exit signs only"],
    "NFPA 101 requires minimum 1 fc at the walking surface along egress routes during emergency mode.",
    { b: "Measurement is at the walking surface, not ceiling-only thresholds.", c: "5 fc continuous is not the emergency minimum requirement.", d: "Exit sign illumination has separate requirements from path lighting levels." },
    "medium",
    rot(8)
  ),
  q(
    "NFPA 5000 is best described as:",
    "A comprehensive building construction and safety code covering structural, fire, and life safety provisions",
    ["A sprinkler installation standard only", "An electrical wiring manual for residential kitchens", "A hazardous materials shipping guide for DOT compliance"],
    "NFPA 5000 is NFPA's building construction and safety code, parallel in scope to model codes like the IBC.",
    { b: "Sprinkler installation is covered by NFPA 13, not NFPA 5000 alone.", c: "Electrical wiring is NFPA 70/NEC territory.", d: "DOT shipping is outside NFPA 5000 scope." },
    "easy",
    rot(9)
  ),
  q(
    "NFPA 1, the Fire Code, primarily functions to:",
    "Provide ongoing fire prevention and operational requirements for existing buildings and processes",
    ["Replace NFPA 101 for all new construction design", "Set structural wind load criteria for bridges", "Define medical gas piping for hospitals exclusively"],
    "NFPA 1 addresses fire code administration, operational maintenance, and hazards in the built environment after construction.",
    { b: "NFPA 101 remains the life safety code for egress design.", c: "Structural wind loads are structural codes/standards.", d: "Medical gas is specialized codes; NFPA 1 is broader fire code." },
    "medium",
    rot(10)
  ),
  q(
    "A building is generally considered a high-rise by NFPA 101 when:",
    "The lowest level of fire department vehicle access is more than 75 feet (23 m) above the lowest level of fire department access",
    ["It has more than two stories regardless of height", "Any portion exceeds 25 feet above grade", "It contains an elevator"],
    "The 75-foot threshold to the lowest fire department access level defines high-rise buildings in NFPA 101.",
    { b: "Story count alone does not define high-rise.", c: "25 feet is not the high-rise threshold.", d: "Elevator presence alone does not create high-rise classification." },
    "medium",
    rot(11)
  ),
  q(
    "High-rise buildings typically require which additional egress feature for stairs serving floors above the lowest level of fire department access?",
    "Smokeproof enclosures or pressurized stairs per NFPA 101 high-rise provisions",
    ["Only a single unenclosed monumental stair", "Elimination of all fire-rated door assemblies", "Removal of standpipe systems to reduce cost"],
    "High-rise provisions require smokeproof enclosures or equivalent protection for certain stairs to protect vertical egress.",
    { b: "Unenclosed monumental stairs do not meet high-rise smoke protection.", c: "Fire-rated doors remain essential in egress paths.", d: "Standpipes are required, not removed, in high-rise design." },
    "hard",
    rot(12)
  ),
  q(
    "A smokeproof enclosure in a high-rise often incorporates:",
    "An open exterior balcony/vestibule or pressurization with fire-rated separation from the building interior",
    ["Combustible furnishings in the stair landing", "Permanently propped-open fire doors for convenience", "Return-air grilles connecting the stair to the HVAC plenum unfiltered"],
    "Smokeproof enclosures use vestibules, pressurization, or other approved methods to limit smoke entry into stairs.",
    { b: "Combustible furnishings increase fire load in critical egress.", c: "Propped fire doors defeat smoke and fire separation.", d: "Uncontrolled HVAC connections can spread smoke into stairs." },
    "hard",
    rot(13)
  ),
  q(
    "Stair pressurization for smokeproof enclosures is intended to:",
    "Maintain a positive pressure differential relative to adjacent spaces to resist smoke infiltration during a fire",
    ["Create negative pressure to pull smoke into the stair", "Replace the need for any fire-rated construction", "Operate only during routine HVAC maintenance"],
    "Pressurization keeps stairs tenable by preventing smoke entry; differential pressure is monitored and maintained during fire events.",
    { b: "Negative pressure would draw smoke into the stair.", c: "Pressurization supplements, not replaces, fire-rated construction.", d: "Systems activate on fire alarm/smoke detection, not maintenance schedules." },
    "medium",
    rot(14)
  ),
  q(
    "Atrium smoke control systems are designed primarily to:",
    "Manage smoke accumulation in large volume spaces to maintain tenable conditions for egress and firefighting",
    ["Eliminate all sprinklers in the atrium", "Increase decorative lighting levels only", "Permit unlimited unprotected openings on all floors without analysis"],
    "Atrium smoke management uses mechanical exhaust, make-up air, or other engineered methods to control smoke layer development.",
    { b: "Lighting is unrelated to smoke control objectives.", c: "Unprotected openings require engineered smoke control and fire-rated separation analysis." },
    "medium",
    rot(15)
  ),
  q(
    "An engineered atrium smoke control design typically requires:",
    "Calculation of smoke production, layer interface height, exhaust capacity, and make-up air distribution",
    ["Only the architect's ceiling height preference", "Assumption that sprinklers alone preclude any smoke control", "Elimination of all fire alarm detection in the atrium"],
    "Engineering analysis determines exhaust rates and system response to keep smoke above occupant egress paths for a defined period.",
    { b: "Aesthetic preferences do not replace engineering calculations.", c: "Sprinklers aid control but do not automatically eliminate smoke management needs in atriums.", d: "Detection remains critical for system activation." },
    "hard",
    rot(16)
  ),
  q(
    "Accessible means of egress under ICC/NFPA accessibility coordination requires:",
    "An accessible route to exits including ramps, elevators (where permitted), areas of refuge, or horizontal exits as allowed",
    ["Only audible alarms without route considerations", "Stairs as the sole accessible egress for all occupants with disabilities", "Removal of handrails to widen perceived path width"],
    "Accessible egress routes must be provided where required, often including elevators with standby power or areas of refuge in certain buildings.",
    { b: "Stairs alone are not accessible for wheelchair users.", c: "Handrails are required accessibility and safety features." },
    "medium",
    rot(17)
  ),
  q(
    "Areas of refuge are intended to provide:",
    "A temporarily tenable space on a floor where occupants who cannot use stairs can await assisted evacuation",
    ["Permanent living quarters for building staff", "Storage for combustible maintenance supplies", "Unventilated mechanical rooms without communication"],
    "Areas of refuge have fire-resistance, communication, and signage so mobility-impaired occupants can safely await rescue.",
    { b: "Combustible storage violates refuge fire-resistance intent.", c: "Communication to the fire command center is required." },
    "medium",
    rot(18)
  ),
  q(
    "Fire doors installed in egress paths must generally:",
    "Be self-closing or automatic-closing, latch reliably, and maintain the fire-protection rating of the wall assembly",
    ["Remain wedged open during business hours for convenience", "Have vision panels exceeding 100% of door area without rating", "Omit gasketing in all smoke barrier locations"],
    "Egress fire doors must close to maintain compartmentation; hold-open devices require release upon alarm.",
    { b: "Vision panel size and glazing must be fire-rated appropriately.", c: "Smoke barriers often require gasketing and smoke-rated doors." },
    "easy",
    rot(19)
  ),
  q(
    "A fire door assembly labeled for 90 minutes indicates:",
    "The door assembly was tested to maintain integrity and insulation for that duration in a standard fire test",
    ["The door will automatically upgrade any adjacent wall to 3 hours", "Occupants have 90 minutes to finish work before leaving", "Sprinklers within 90 feet are unnecessary"],
    "Fire door labels reflect tested performance of the assembly; they do not alter wall ratings or delay evacuation requirements.",
    { b: "Evacuation is immediate upon alarm; label is fire resistance, not a work timer.", c: "Sprinkler requirements are independent of door labels." },
    "medium",
    rot(20)
  ),
  q(
    "Coordination of building services with life safety during design should ensure:",
    "Ducts, piping, and cabling do not penetrate fire-rated egress enclosures without proper firestopping and approved details",
    ["Maximum penetrations to reduce installation cost in stair shafts", "Shared open plenums between stairs and occupied floors without dampers", "Routing of fuel gas piping through exit access corridors"],
    "Penetrations of fire-rated egress elements require listed firestop systems and code-compliant details to maintain separation.",
    { b: "Open plenum connections can spread smoke into stairs.", c: "Fuel gas in exit access corridors is prohibited." },
    "hard",
    rot(21)
  ),
  q(
    "HVAC smoke control interfaces with egress design when:",
    "Fan shutdown, damper closure, or pressurization sequences are coordinated with fire alarm and stair protection",
    ["HVAC operates independently with no fire alarm connection", "Return fans increase speed during fire to circulate smoke", "Cooling towers control stair pressurization without sensors"],
    "Integrated sequences prevent smoke migration and support stair pressurization and zone smoke control strategies.",
    { b: "Increasing recirculation during fire spreads contaminants.", c: "Stair pressurization requires dedicated controls and monitoring, not cooling towers." },
    "medium",
    rot(22)
  ),
  q(
    "Exit signs in NFPA 101 must be illuminated and located so that:",
    "No point in the exit access corridor is more than 100 feet (30 m) from the nearest visible sign (typical threshold)",
    ["Signs are required only at the building main entrance", "Signs may be hidden behind open doors", "Only battery-less signs are permitted in all cases"],
    "Exit sign placement and visibility ensure occupants can quickly identify egress direction along the path.",
    { b: "Concealed signs fail visibility requirements.", c: "Illumination may be external or internal per approved methods." },
    "easy",
    rot(23)
  ),
  q(
    "Photo luminescent egress markings are often used to:",
    "Supplement low-level path marking where permitted, especially in high-rise stairs and occupancies requiring path markings",
    ["Replace all emergency lighting and exit signs universally", "Decorate lobbies without photometric performance", "Eliminate the need for handrails on stairs"],
    "Photoluminescent markings aid visibility during power loss where required; they supplement, not universally replace, emergency lighting.",
    { b: "Decorative use without performance data does not satisfy code.", c: "Handrails remain mandatory regardless of markings." },
    "medium",
    rot(24)
  ),
  q(
    "Dead-end corridors in exit access are limited because:",
    "They force occupants toward a single direction without an alternative path, increasing risk if that path is blocked",
    ["They improve travel distance unlimitedly", "They are encouraged for retail impulse displays", "They eliminate the need for exit signs"],
    "NFPA 101 limits dead-end length so occupants quickly reach a point with egress choice.",
    { b: "Travel distance and dead-end limits still apply.", c: "Retail displays cannot compromise egress geometry." },
    "easy",
    rot(25)
  ),
  q(
    "A horizontal exit provides egress by:",
    "Moving occupants through a fire-resistance-rated separation into a refuge area on the same floor",
    ["Lowering occupants with a window rope only", "Traveling vertically through an unprotected atrium", "Exiting directly to a roof helipad without capacity analysis"],
    "Horizontal exits use rated walls/doors/floors to create a protected refuge on the same level, counting as an exit under specific rules.",
    { b: "Unprotected vertical movement through an atrium is not a horizontal exit.", c: "Roof helipads require separate egress and capacity analysis." },
    "medium",
    rot(26)
  ),
  q(
    "Remoteness of exits requires that:",
    "Two exits be separated by distance or intervening construction so a single fire event is unlikely to block both",
    ["Exits may be adjacent doorways in the same room corner", "One exit may be a window and the other a mirror", "Remoteness is waived in all sprinklered buildings without analysis"],
    "Exit separation reduces common-mode failure; diagonal or intervening wall separation achieves remoteness.",
    { b: "Adjacent doors may not satisfy separation intent.", c: "Mirrors are not exits." },
    "medium",
    rot(27)
  ),
  q(
    "Mercantile occupant load factors for sales floor areas typically use:",
    "Factors based on use concentration (e.g., concentrated vs. less concentrated merchandise display)",
    ["Zero occupants because merchandise is not people", "Only checkout counter area divided by 5 sq ft per person", "Roof area divided by parking stall count"],
    "NFPA 101 Table 7.3.1.2 provides factors for mercantile uses; concentration of display affects the factor applied.",
    { b: "The entire sales floor area must be considered, not checkout alone.", c: "Parking stall counts do not determine mercantile occupant load." },
    "hard",
    rot(28)
  ),
  q(
    "Business occupancy occupant load is generally calculated using:",
    "Gross floor area divided by the business use occupant load factor unless actual occupant count is higher",
    ["Number of computers installed", "CEO office square footage only", "Annual revenue divided by 1000"],
    "Business areas use gross area with the assigned load factor; actual use cannot fall below calculated load for egress design.",
    { b: "Only a portion of the floor cannot be used to understate load.", c: "Revenue is unrelated to physical occupant load." },
    "easy",
    rot(29)
  ),
  q(
    "When actual occupant count exceeds calculated occupant load:",
    "The higher number governs for egress capacity and life safety planning for that space",
    ["The lower calculated number always controls", "Only the fire marshal's guess from last year applies", "Occupant load is capped at the certificate of occupancy forever"],
    "Life safety design must accommodate the greater of calculated or actual anticipated occupant load.",
    { b: "Historical guesses do not override measured or anticipated higher loads.", c: "Certificates may require update when use or load changes." },
    "medium",
    rot(30)
  ),
  q(
    "Exit discharge must lead:",
    "Directly to a public way or to an area with free and unobstructed access to a public way",
    ["To a locked interior storage room", "To a dead-end loading dock with no outlet", "To a mechanical penthouse without signage"],
    "Exit discharge completes the egress path to the public way without locking occupants into enclosed dead ends.",
    { b: "Dead-end discharge violates egress continuity.", c: "Discharge to inaccessible penthouses is not compliant." },
    "easy",
    rot(31)
  ),
  q(
    "Width of exit discharge components is sized based on:",
    "The occupant load served from the exit(s) discharging into that area, using applicable capacity factors",
    ["The width of the adjacent sidewalk only", "Half the occupant load because people run faster outside", "Architectural column spacing without load data"],
    "Discharge width must accommodate all occupants arriving from connected exits per NFPA 101 capacity calculations.",
    { b: "Running speed does not reduce required discharge width.", c: "Column spacing must yield required egress width for the load served." },
    "medium",
    rot(32)
  ),
  q(
    "NFPA 101 permits reduced travel distance in some sprinklered occupancies because:",
    "Sprinklers improve fire control, potentially slowing fire growth and supporting safer egress conditions",
    ["Sprinklers eliminate smoke entirely", "Sprinklers remove the need for any exits", "Sprinklers convert the occupancy to storage automatically"],
    "Sprinkler trade-ups are occupancy-specific; they reflect improved fire control, not elimination of smoke or exits.",
    { b: "Exits remain required.", c: "Occupancy classification does not change automatically." },
    "medium",
    rot(33)
  ),
  q(
    "An exit passageway differs from an interior exit stair because it:",
    "Is a horizontal or sloped enclosed component connecting an exit to a public way, with high fire-resistance rating",
    ["Is always unenclosed and open to the atrium", "Serves only HVAC equipment", "Requires no fire-rated construction"],
    "Exit passageways are enclosed, rated corridors that protect horizontal egress between an exit and the public way.",
    { b: "Exit passageways protect occupants, not equipment only.", c: "High fire-resistance ratings are required." },
    "hard",
    rot(34)
  ),
  q(
    "Which element is NOT typically part of exit access?",
    "Public way beyond the building property line",
    ["Corridor leading to a stair", "Door from a room to the corridor", "Aisle in an assembly seating area"],
    "Exit access is the portion from an occupied space to an exit; the public way is part of exit discharge.",
    { b: "Corridors are classic exit access.", c: "Room doors to corridors are exit access.", d: "Assembly aisles are exit access paths." },
    "easy",
    rot(35)
  ),
  q(
    "Emergency lighting testing under NFPA 101 operational provisions should include:",
    "Functional testing at intervals defined by the code and AHJ, with documentation of results",
    ["Never testing if LEDs are installed", "Testing only when tenants complain", "Disabling batteries to save utility costs"],
    "Periodic functional and duration testing ensures emergency lighting will perform upon power failure.",
    { b: "LED technology still requires periodic testing.", c: "Complaint-driven testing misses proactive compliance." },
    "medium",
    rot(36)
  ),
  q(
    "Generator-powered emergency lighting in high-rise buildings must typically:",
    "Energize within 10 seconds of normal power failure and sustain required duration",
    ["Start within 10 minutes to reduce fuel use", "Operate only on weekends", "Power only executive floor corridors"],
    "NFPA 111 and NFPA 101 coordination requires rapid transfer and sustained illumination for egress.",
    { b: "Delayed transfer leaves egress in darkness.", c: "All required egress paths must be illuminated." },
    "hard",
    rot(37)
  ),
  q(
    "NFPA 5000 and NFPA 101 relationship in a jurisdiction that adopts both is:",
    "They must be coordinated; conflicts are resolved per local adoption ordinances and reference chapters",
    ["NFPA 5000 repeals all accessibility law", "NFPA 101 applies only to residential garages globally", "Only one may be enforced, never both"],
    "Adopting jurisdictions harmonize provisions; designers apply the enforced combination per local amendments.",
    { b: "NFPA 101 applies broadly to life safety, not garages only.", c: "Many jurisdictions enforce coordinated sets of NFPA codes." },
    "hard",
    rot(38)
  ),
  q(
    "NFPA 1 inspection of fire doors in existing buildings typically verifies:",
    "Proper closure, latching, labeling, clearances, and absence of unapproved field modifications",
    ["Paint colour matches corridor carpet", "Doors are removed for airflow", "Hold-open devices are taped without release"],
    "Fire door inspections focus on operational integrity and maintaining tested assembly performance.",
    { b: "Removing doors voids fire separation.", c: "Hold-opens require approved release upon alarm." },
    "medium",
    rot(39)
  ),
  q(
    "Vision panels in fire doors along egress paths must:",
    "Use fire-rated glazing sized and installed per listing and code limits for the door assembly",
    ["Use any annealed glass if under 1 square foot without testing", "Be omitted in all 90-minute doors", "Exceed 80% of door area for visibility"],
    "Glazing must be part of a listed fire door assembly with size limits per manufacturer listings and NFPA 80.",
    { b: "Vision panels are permitted with rated glazing.", c: "Excessive glazing area may not be listed." },
    "medium",
    rot(40)
  ),
  q(
    "Smoke dampers coordinated with fire alarm in HVAC systems serving egress shafts should:",
    "Close upon detection of smoke to prevent smoke migration into protected vertical paths",
    ["Open fully during fire to increase airflow into stairs", "Remain fixed open for energy savings", "Operate only during filter changes"],
    "Damper closure limits smoke spread into stairs and smokeproof enclosures when smoke is detected.",
    { b: "Fixed open dampers defeat shaft protection.", c: "Fire events, not maintenance, trigger closure." },
    "medium",
    rot(41)
  ),
  q(
    "Plumbing chase openings on a fire-rated stair enclosure wall require:",
    "Listed firestop systems and code-compliant penetration protection maintaining the enclosure rating",
    ["No protection if pipe is noncombustible", "Larger openings to ease future retrofits without rating", "Combustible insulation packed loosely around pipes"],
    "All penetrations must be protected with tested firestop systems to maintain stair enclosure integrity.",
    { b: "Oversized unprotected openings compromise ratings.", c: "Loose combustible packing is not listed firestopping." },
    "hard",
    rot(42)
  ),
  q(
    "Elevator recall and firefighter service interfaces with egress planning by:",
    "Preventing uncontrolled elevator use during fire while supporting phased evacuation or fire department operations",
    ["Encouraging all occupants to use elevators during alarm", "Disabling all alarms to keep elevators running", "Removing all elevator lobby fire-rated separation"],
    "Phase I/II recall removes elevators from public use during fire, protecting shafts and supporting firefighting.",
    { b: "Alarms must not be disabled.", c: "Elevator lobby separation contains smoke and fire." },
    "medium",
    rot(43)
  ),
  q(
    "Accessible routes must generally coincide with egress paths to the maximum extent feasible so that:",
    "People with disabilities have equivalent access to exits without being diverted to remote segregated routes",
    ["Only freight elevators are used for evacuation of everyone", "Accessible routes may dead-end at restrooms", "Ramps may stop at mezzanines without continuation"],
    "Integrated accessible egress reduces travel distance disparities and avoids unsafe segregated paths.",
    { b: "Dead-ends violate egress principles.", c: "Ramps must continue along the accessible egress path." },
    "medium",
    rot(44)
  ),
  q(
    "Power-operated doors on accessible egress routes must:",
    "Have backup operation or manual capability during power failure where required for egress",
    ["Lock permanently during outages", "Open only with biometric authentication", "Reverse direction randomly during alarm"],
    "Accessible egress hardware must remain operable in emergencies, often via manual push or battery backup.",
    { b: "Biometric locks can block egress.", c: "Random reversal is unsafe and noncompliant." },
    "hard",
    rot(45)
  ),
  q(
    "Atrium enclosing walls and separation from adjacent floors are required to:",
    "Limit fire and smoke spread while permitting the architectural opening arrangement under engineered controls",
    ["Be entirely non-rated glass without limits", "Block all sprinklers from the atrium volume", "Eliminate all detection because of height"],
    "Atrium design balances rated separation and protected openings with sprinkler and smoke control engineering.",
    { b: "Sprinklers are typically required in atriums.", c: "Detection activates smoke control and alarms." },
    "hard",
    rot(46)
  ),
  q(
    "Make-up air for atrium exhaust smoke control should be provided:",
    "Low and distributed to avoid disturbing the smoke layer while supplying replacement air for exhaust volume",
    ["Only at the highest ceiling point exclusively", "Through uncontrolled open windows on all floors without analysis", "By shutting all outdoor air intakes during exhaust"],
    "Proper make-up air location and volume maintain stratification and prevent smoke layer descent onto occupants.",
    { b: "Uncontrolled openings undermine engineered smoke management.", c: "Exhaust requires balanced make-up air, not sealed intakes." },
    "hard",
    rot(47)
  ),
  q(
    "During commissioning of stair pressurization, verification typically includes:",
    "Door opening force tests, differential pressure measurements, and alarm interface checks under simulated conditions",
    ["Painting stair walls only", "Measuring carpet pile height", "Disabling door closers to reduce noise"],
    "Commissioning confirms pressure differentials and operable door forces under design scenarios.",
    { b: "Carpet pile is unrelated to pressurization performance.", c: "Door closers are essential to maintain separation." },
    "medium",
    rot(48)
  ),
  q(
    "The primary reason fire and life safety consultants coordinate with MEP designers early is to:",
    "Integrate rated enclosures, detection, pressurization, and egress geometry before construction documents are fixed",
    ["Delay permits until after construction is 50% complete", "Eliminate all rated walls for cable routing convenience", "Replace AHJ plan review with internal memos only"],
    "Early coordination prevents costly rework when shafts, stairs, and controls conflict with architectural layouts.",
    { b: "Rated walls cannot be removed for convenience.", c: "AHJ review remains mandatory; memos do not substitute." },
    "easy",
    rot(49)
  ),
];
