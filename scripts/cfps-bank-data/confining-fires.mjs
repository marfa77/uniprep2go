import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "Per NFPA 221, a fire wall is primarily intended to:",
    "Subdivide a building to limit fire spread and allow independent structural collapse on either side",
    ["Provide a 1-hour smoke-tight membrane between tenant suites only", "Replace sprinkler protection in adjacent compartments", "Serve as a nonstructural chase wall for MEP routing without rating"],
    "Fire walls are structural fire-resistance-rated assemblies that create separate buildings for fire spread purposes and must remain stable if one side collapses.",
    { b: "Sprinklers complement but do not replace required fire wall ratings.", c: "Unrated chase walls are not fire walls.", d: "Smoke-tight membranes alone describe smoke barriers, not fire walls." },
    "easy",
    rot(0)
  ),
  q(
    "A fire barrier per NFPA 221 is best defined as:",
    "A fire-resistance-rated wall assembly that restricts fire spread within a building and may support a floor or roof assembly",
    ["An exterior curtain wall with no rating requirement", "A corridor wall rated only for smoke leakage", "A demising wall with no opening protectives allowed"],
    "Fire barriers create compartments within a building; they are rated assemblies that can be load-bearing and must address openings and penetrations.",
    { a: "Exterior curtain walls are envelope components, not interior fire barriers.", c: "Smoke-only walls lack the fire-resistance rating of fire barriers.", d: "Fire barriers may have protected openings when permitted by code." },
    "easy",
    rot(1)
  ),
  q(
    "Fire partitions differ from fire barriers chiefly because fire partitions:",
    "Typically have lower fire-resistance ratings and are used to subdivide tenant spaces or dwelling units",
    ["Must always extend from foundation to roof without exception", "Are required to remain standing if the opposite side collapses", "Cannot occur in corridors or exit access passageways"],
    "Fire partitions (often 1-hour) separate units or rooms; fire barriers (often 1–2 hour) create larger fire compartments and may have stricter continuity rules.",
    { a: "Foundation-to-roof continuity is a fire wall characteristic, not typical of partitions.", c: "Structural independence under collapse is a fire wall requirement.", d: "Partitions are commonly used along dwelling unit and tenant separations, including corridors." },
    "medium",
    rot(2)
  ),
  q(
    "Under NFPA 221, the term 'opening protective' refers to:",
    "A listed assembly installed in an opening in a fire-rated barrier to maintain the rating of the wall or floor",
    ["Any self-closing door regardless of fire rating", "A sprinkler head within 4 ft of a doorway", "A smoke detector mounted above a transom"],
    "Opening protectives — fire doors, shutters, windows, and dampers — are tested assemblies that restore the fire-resistance rating at penetrations.",
    { a: "Self-closing alone does not establish a fire-rated opening protective.", c: "Sprinklers near doors do not substitute for rated opening protectives.", d: "Detection does not replace rated closure assemblies." },
    "easy",
    rot(3)
  ),
  q(
    "A fire damper is required in duct penetrations through fire-rated assemblies when:",
    "The duct is not part of an engineered smoke control system exception and the penetration is through a rated wall or floor",
    ["The duct serves only a single room under 1,000 ft²", "The HVAC system is shut down during a fire alarm", "The duct is constructed of galvanized steel regardless of size"],
    "Fire dampers close upon heat detection to maintain the integrity of fire barriers and fire partitions at duct openings.",
    { a: "Small room size alone does not eliminate damper requirements at rated penetrations.", c: "System shutdown does not replace the need for dampers unless specifically permitted.", d: "Duct material does not waive fire damper requirements." },
    "medium",
    rot(4)
  ),
  q(
    "A combination fire/smoke damper is typically specified when a duct penetrates:",
    "A smoke barrier or other assembly requiring both fire resistance and smoke leakage control",
    ["An unrated interior partition in a single-family dwelling", "An exterior brick veneer with no rated cavity", "A roof parapet with no occupied space below"],
    "Combination dampers meet fire-resistance and smoke leakage criteria — common at smoke barrier penetrations and some corridor walls.",
    { a: "Unrated partitions do not require combination dampers.", c: "Exterior veneer without rated assemblies does not trigger damper requirements.", d: "Parapets without rated penetrations do not require dampers." },
    "medium",
    rot(5)
  ),
  q(
    "Fire dampers are commonly actuated by:",
    "A fusible link or heat-responsive device that releases the damper blade to close",
    ["A manual pull station at the building entrance", "Occupant voice commands through the PA system", "Annual pressure testing of the duct system"],
    "Fusible links (typically 165°F or 212°F) are the traditional release method; some systems use electric heat detectors tied to the fire alarm.",
    { b: "Pull stations activate alarms, not individual fire dampers.", c: "PA announcements do not close dampers.", d: "Duct pressure testing is maintenance, not damper actuation." },
    "easy",
    rot(6)
  ),
  q(
    "A 90-minute fire door assembly is most commonly associated with:",
    "Openings in 2-hour fire walls or barriers where door rating is typically 3/4 of the wall rating",
    ["Openings in 20-minute corridor partitions only", "Unrated exterior entrances to retail stores", "Smoke barriers rated for leakage only without fire rating"],
    "Door ratings are often 3/4 of the wall rating (e.g., 90-minute doors in 2-hour walls); 20-minute doors serve lower-rated partitions.",
    { a: "20-minute doors pair with 1-hour or corridor partitions, not 2-hour walls.", c: "Unrated entrances do not require 90-minute assemblies.", d: "Leakage-only smoke barriers may not require fire-rated doors." },
    "medium",
    rot(7)
  ),
  q(
    "A 20-minute fire-rated door is frequently used at:",
    "Corridor walls and some fire partition openings where a 1-hour wall is reduced at the door",
    ["2-hour boiler room enclosures requiring 90-minute doors", "Fire walls requiring 120-minute door assemblies", "Unrated storage closets in fully sprinklered offices only"],
    "Corridor door pairs often use 20-minute rated doors in 1-hour corridor walls per common building code tables.",
    { b: "Boiler rooms typically need higher door ratings matching barrier ratings.", c: "Fire walls require door ratings per wall rating tables, not 20 minutes.", d: "Closet doors may be unrated when not in rated walls." },
    "medium",
    rot(8)
  ),
  q(
    "Fire door assemblies must be:",
    "Installed as a complete listed assembly including frame, door, hardware, and required gasketing per the listing",
    ["Field modified to add vision kits without label approval", "Propped open with magnetic holders during all business hours", "Painted any color regardless of intumescent seal requirements"],
    "NFPA 80 requires fire doors to be maintained as labeled assemblies; field modifications void listings unless permitted by the door manufacturer.",
    { a: "Unauthorized vision kit modifications can void the fire door label.", c: "Hold-open devices must be tied to release on alarm unless otherwise permitted.", d: "Paint can cover intumescent seals and void performance." },
    "medium",
    rot(9)
  ),
  q(
    "Penetration firestopping is required to:",
    "Restore the fire-resistance rating of a wall or floor where piping, cables, or ducts pass through",
    ["Seal exterior windows against wind-driven rain only", "Reduce HVAC noise between adjacent offices", "Support conduit loads without any sealant"],
    "Firestopping systems are tested to limit fire and sometimes smoke passage at penetrations; they are part of the rated assembly.",
    { a: "Weather sealing is not firestopping.", c: "Acoustic treatment does not fulfill fire-resistance requirements.", d: "Structural support alone does not restore fire rating." },
    "easy",
    rot(10)
  ),
  q(
    "A through-penetration firestop system is tested per:",
    "ASTM E814 (UL 1479) as a system of penetrating item, opening, and fill material",
    ["NFPA 25 only for sprinkler pipe clearance", "ASHRAE 90.1 for energy code compliance", "OSHA fall protection standards"],
    "Penetration firestopping is evaluated as a system — not individual products in isolation — under ASTM E814/UL 1479.",
    { b: "NFPA 25 covers sprinkler inspection, not firestop system testing.", c: "Energy codes do not define firestop test standards.", d: "OSHA addresses worker safety, not penetration fire ratings." },
    "hard",
    rot(11)
  ),
  q(
    "Membrane penetrations in fire-rated gypsum walls differ from through-penetrations because:",
    "The penetrating item does not pass completely through the wall assembly to the opposite side",
    ["They never require any firestopping material", "They apply only to exterior curtain wall mullions", "They are exempt in all 2-hour rated barriers"],
    "Outlet boxes and similar items that pierce one side of a membrane require listed firestop or listed box arrangements per code.",
    { a: "Membrane penetrations still require protection when not meeting listed exceptions.", c: "Curtain wall mullions are a different application.", d: "Higher ratings do not automatically exempt membrane penetrations." },
    "hard",
    rot(12)
  ),
  q(
    "Compartmentation strategy in fire confinement aims to:",
    "Divide a building into fire-rated zones so fire and smoke spread are limited while occupants evacuate",
    ["Eliminate all openings between rooms for architectural privacy", "Replace the need for any active detection systems", "Concentrate all fuel loads into a single protected room"],
    "Compartmentation uses rated barriers, partitions, and floors to buy time for egress and fire department operations.",
    { a: "Rated openings with protectives are permitted; total elimination of openings is not the strategy.", c: "Detection and alarms complement passive compartmentation.", d: "Concentrating fuel loads increases hazard; compartmentation limits spread." },
    "easy",
    rot(13)
  ),
  q(
    "A horizontal assembly in fire confinement is:",
    "A fire-resistance-rated floor or roof assembly that separates building levels or spaces vertically",
    ["A lateral bracing member in an unrated mezzanine only", "A smoke curtain hung from an unrated ceiling tile", "An exterior sidewalk at grade"],
    "Horizontal assemblies (floors/ceilings) are part of the compartment envelope along with walls and shaft enclosures.",
    { a: "Unrated mezzanine bracing is not a rated horizontal assembly.", c: "Smoke curtains are supplements, not the primary horizontal assembly.", d: "Exterior sidewalks are outside the building compartmentation model." },
    "medium",
    rot(14)
  ),
  q(
    "A shaft enclosure is required around:",
    "Stairways, elevators, dumbwaiters, and other vertical openings that connect multiple stories",
    ["Single-story mechanical rooms with no vertical openings", "Exterior loading docks at grade only", "Temporary construction fencing"],
    "Shaft enclosures prevent fire and smoke migration via vertical chases; they are continuous rated barriers around vertical openings.",
    { a: "Single-story rooms without vertical continuity are not shafts.", c: "Loading docks at grade lack multi-story vertical openings.", d: "Construction fencing is not a building shaft." },
    "easy",
    rot(15)
  ),
  q(
    "Shaft enclosure walls typically must have a fire-resistance rating of:",
    "At least equal to the rating required for the intervening floor assembly, often 1 to 2 hours depending on occupancy",
    ["0 minutes when the building is fully sprinklered", "20 minutes regardless of building height", "4 hours in every occupancy without exception"],
    "Shaft ratings follow building and occupancy requirements; sprinklers may reduce some ratings but do not universally eliminate shaft enclosures.",
    { a: "Sprinklers may allow reductions in some cases but not a blanket zero rating.", c: "20 minutes is insufficient for most multi-story shaft enclosures.", d: "Four hours applies only in specific high-hazard or high-rise contexts." },
    "medium",
    rot(16)
  ),
  q(
    "Smoke barriers differ from fire barriers because smoke barriers:",
    "Are constructed to resist the movement of smoke but may not require the same fire-resistance rating as fire barriers",
    ["Must always be rated 4 hours for structural stability", "Are only used on the building exterior", "Cannot have any doors or transfer openings"],
    "Smoke barriers limit smoke migration (often in health care and I-2 occupancies); fire barriers provide fire-resistance-rated separation.",
    { a: "Four-hour structural stability is a fire wall concept, not typical smoke barriers.", c: "Smoke barriers are interior partitions controlling smoke movement.", d: "Smoke barriers may have rated doors and controlled openings." },
    "medium",
    rot(17)
  ),
  q(
    "In health care occupancies, smoke barrier continuity is critical because:",
    "Patients may not be moved immediately and smoke migration must be limited to defend-in-place zones",
    ["All patients evacuate vertically within 2 minutes", "Smoke barriers eliminate the need for nurse staffing", "Fire walls are prohibited in hospitals"],
    "Defend-in-place strategies rely on smoke compartments bounded by smoke barriers with controlled openings.",
    { a: "Immediate full evacuation is often impractical for immobile patients.", c: "Staffing is operational; smoke barriers are a physical control.", d: "Hospitals use fire barriers, fire walls, and smoke barriers as applicable." },
    "hard",
    rot(18)
  ),
  q(
    "A smoke compartment in NFPA 101 health care chapters is bounded by:",
    "Smoke barriers with access to an exit or refuge area within prescribed travel limits",
    ["Unrated cubicle curtains only", "Exterior windows with operable sashes", "Parking garage vehicular ramps"],
    "Smoke compartments limit smoke spread size so staff can relocate patients horizontally within the floor.",
    { a: "Cubicle curtains are not smoke barrier assemblies.", c: "Windows do not define smoke compartments.", d: "Parking ramps are separate occupancies/spaces." },
    "medium",
    rot(19)
  ),
  q(
    "Fire walls must generally extend:",
    "From the foundation through the roof, with specific exceptions for stepped buildings and certain parapet conditions",
    ["Only between the ceiling and suspended tile grid", "From the third floor to the roof exclusively", "Through exterior windows at each floor"],
    "Continuous vertical extension prevents fire from bypassing the wall via floor-ceiling spaces or roof voids.",
    { a: "Ceiling plenum gaps alone do not satisfy fire wall continuity.", c: "Starting at the third floor leaves lower stories unprotected.", d: "Windows are openings requiring protectives, not wall extensions." },
    "medium",
    rot(20)
  ),
  q(
    "When a fire wall separates two portions of a building, structural design often requires:",
    "Independent structural framing on each side so collapse on one side does not pull down the other",
    ["Shared continuous floor joists spanning the wall without break", "A single unbraced column through the wall centerline", "Common roof trusses with no fire cut clearance"],
    "Structural independence is a defining fire wall feature — butt joints, double walls, or protected structural members achieve this.",
    { a: "Continuous joists through fire walls violate structural independence.", c: "Single through-columns can transmit collapse forces.", d: "Shared trusses without fire cuts can bridge collapse." },
    "hard",
    rot(21)
  ),
  q(
    "Fire wall coped with double walls (two separate walls on a common slab) achieves:",
    "Structural independence while maintaining the required fire-resistance rating between building sections",
    ["Elimination of all fire-resistance rating requirements", "A smoke barrier only without fire rating", "Permission to remove all opening protectives"],
    "Double-wall fire wall construction is a recognized method to allow differential movement and prevent collapse transfer.",
    { a: "Rating requirements still apply to the fire wall assembly.", c: "Smoke barrier ratings differ from fire wall ratings.", d: "Opening protectives remain required at rated openings." },
    "hard",
    rot(22)
  ),
  q(
    "A fire barrier continuity requirement typically means:",
    "The barrier extends from the top of the foundation or floor assembly below to the underside of the floor or roof above",
    ["The barrier stops at the ceiling grid and resumes above the tiles", "Only the door leaf needs rating, not the surrounding wall", "Penetrations need no protection if under 2 inches diameter"],
    "Continuity seals the compartment envelope; gaps at ceilings and floors allow fire and smoke bypass.",
    { a: "Ceiling grid gaps are a common failure point without proper continuity.", c: "The full assembly, not just the door, must maintain rating.", d: "Small penetrations still require listed firestopping unless exempt." },
    "medium",
    rot(23)
  ),
  q(
    "An exit enclosure (exit stair shaft) is a type of:",
    "Shaft enclosure forming part of the means of egress with fire-resistance-rated walls and protected openings",
    ["Unrated decorative stair wrap", "Exterior fire escape bolted to window frames only", "Mechanical room with no vertical continuity"],
    "Exit enclosures protect egress paths from fire and smoke in the building they serve.",
    { a: "Decorative wraps without rating do not constitute exit enclosures.", c: "Exterior escapes are separate structures, not interior exit enclosures.", d: "Mechanical rooms are not exit stairs." },
    "easy",
    rot(24)
  ),
  q(
    "Transfer openings in fire walls are:",
    "Generally prohibited or severely restricted because they compromise the wall's confinement function",
    ["Encouraged to improve tenant circulation", "Required at every floor for HVAC balance", "Unrestricted when under 100 ft²"],
    "Fire walls create separate buildings; openings are limited and must meet stringent protectives when allowed.",
    { a: "Circulation convenience does not override fire wall integrity.", c: "HVAC balance does not mandate fire wall openings.", d: "Size does not eliminate restrictions on fire wall openings." },
    "medium",
    rot(25)
  ),
  q(
    "A fire window assembly differs from a fire door in that it:",
    "Is a rated glazing and frame assembly tested to limit fire passage through window openings in rated walls",
    ["Operates only as a smoke detector mounting panel", "Requires no rating when glass is tempered only", "Replaces the need for exterior weather louvers"],
    "Fire-rated glazing assemblies (wired glass historically, now ceramic/glass units) are tested opening protectives.",
    { a: "Detector mounting is unrelated to fire window assemblies.", c: "Tempered glass alone is not a fire-rated assembly.", d: "Weather louvers are separate from fire-rated glazing." },
    "medium",
    rot(26)
  ),
  q(
    "Rolling steel fire shutters are classified as:",
    "Opening protectives that close to shield large openings in rated walls when activated by fire",
    ["Permanent ventilation grilles needing no maintenance", "Decorative ceiling coffers", "Unrated loading dock bumpers"],
    "Rolling shutters are tested assemblies for storefronts, counters, and large wall openings in rated separations.",
    { a: "Ventilation grilles without listing are not fire shutters.", c: "Ceiling coffers are architectural, not opening protectives.", d: "Dock bumpers are not fire-rated closures." },
    "medium",
    rot(27)
  ),
  q(
    "When a fire-rated floor assembly is penetrated by a plumbing stack, the penetration must be:",
    "Firestopped with a listed system matching the floor rating and penetrating item type",
    ["Left open to allow drain venting of fire gases", "Wrapped with fiberglass batt only for sound", "Sealed with expandable foam not listed for fire"],
    "Floor penetrations require tested firestop systems; generic foam without listing does not restore rating.",
    { a: "Open penetrations defeat floor fire resistance.", c: "Fiberglass batts are not listed firestop systems.", d: "Non-listed foam fails in fire exposure." },
    "easy",
    rot(28)
  ),
  q(
    "Annular space at a penetration is:",
    "The gap between the penetrating item and the edge of the opening in the rated assembly",
    ["The total room area divided by occupant load", "The stair width minus handrail projection", "The duct velocity pressure in inches w.c."],
    "Firestop design addresses annular space fill material and size limits per the listed system.",
    { b: "Occupant load area is unrelated to penetration gaps.", c: "Stair width is an egress calculation.", d: "Duct velocity is an HVAC parameter." },
    "medium",
    rot(29)
  ),
  q(
    "NFPA 221 is titled and scoped to address:",
    "Standard for High Challenge Fire Walls, Fire Walls, and Fire Barrier Walls",
    ["Sprinkler system hydraulic calculation procedures", "Portable fire extinguisher hydrostatic testing", "Wildland urban interface defensible space only"],
    "NFPA 221 defines types of fire walls and fire barrier walls and their construction features for confining fire.",
    { a: "Sprinkler hydraulics are covered in NFPA 13.", c: "Extinguisher testing is NFPA 10.", d: "WUI defensible space is addressed in other NFPA documents." },
    "easy",
    rot(30)
  ),
  q(
    "A high challenge fire wall under NFPA 221 is used where:",
    "Occupancies with very high fuel loads or hazards require enhanced wall performance beyond standard fire walls",
    ["Single-family residential detached garages only", "Open parking structures with no enclosed areas", "Temporary tents for farmers markets"],
    "High challenge fire walls address severe hazard occupancies with stringent construction requirements.",
    { a: "Detached garages typically use standard separations, not high challenge walls.", c: "Open parking has different protection schemes.", d: "Temporary tents are not high challenge wall applications." },
    "hard",
    rot(31)
  ),
  q(
    "Fire-resistance rating is determined by:",
    "Standardized fire tests (e.g., ASTM E119) measuring time until failure criteria are reached for walls, floors, and assemblies",
    ["Architect's specification note without testing", "Paint color and wallpaper selection", "The age of the building multiplied by two"],
    "Ratings (20 min, 1 hr, 2 hr, etc.) come from listed test results of complete assemblies.",
    { a: "Specification notes must reference tested assemblies.", c: "Finishes do not establish fire resistance.", d: "Building age is not a rating metric." },
    "easy",
    rot(32)
  ),
  q(
    "A ceiling membrane of a fire-resistance-rated floor-ceiling assembly contributes to:",
    "The assembly rating when tested as part of the floor-ceiling system protecting the space below",
    ["Only acoustic performance with no fire role", "Exterior wind load resistance on curtain wall", "Soil bearing capacity at the foundation"],
    "The ceiling, joists, decking, and protection materials act together as a horizontal fire barrier.",
    { a: "Ceiling membranes are integral to floor-ceiling fire ratings.", c: "Curtain wall wind loads are unrelated.", d: "Foundation bearing is structural geotechnical design." },
    "medium",
    rot(33)
  ),
  q(
    "Fireblocking differs from firestopping in that fireblocking:",
    "Uses building materials to obstruct concealed draft openings at intersections and concealed spaces at prescribed intervals",
    ["Is a listed penetration seal system tested to ASTM E814 only", "Applies exclusively to exterior window mullions", "Replaces fire dampers in all duct shafts"],
    "Fireblocking limits hidden fire spread in cavities; firestopping restores ratings at through-penetrations.",
    { a: "ASTM E814 systems are firestopping, not fireblocking.", c: "Fireblocking addresses concealed spaces, not curtain wall mullions.", d: "Dampers and fireblocking serve different purposes." },
    "hard",
    rot(34)
  ),
  q(
    "In a fully sprinklered building, some codes permit:",
    "Reduction of certain fire barrier ratings when sprinklers are installed per qualifying criteria",
    ["Complete removal of all fire walls without engineering analysis", "Elimination of every fire damper regardless of penetration", "Use of unrated hollow-core doors at all shaft openings"],
    "Sprinkler trade-ups are code-specific; they reduce ratings in defined cases but do not eliminate all passive protection.",
    { a: "Fire walls are rarely removed solely due to sprinklers.", c: "Damper requirements often remain at rated penetrations.", d: "Shaft openings still need rated protectives." },
    "medium",
    rot(35)
  ),
  q(
    "A tenant separation wall in a multi-tenant mercantile building is typically a:",
    "Fire partition or fire barrier rated per occupancy and area provisions extending to the underside of the deck above",
    ["Nonrated stud wall with only insulation batts", "Exterior limestone veneer", "Temporary barricade during renovation only"],
    "Demising walls between tenants must meet fire separation requirements based on occupancy, size, and construction type.",
    { a: "Nonrated walls do not meet tenant separation requirements.", c: "Exterior veneer is not an interior demising partition.", d: "Temporary barricades are not permanent separations." },
    "medium",
    rot(36)
  ),
  q(
    "Dwelling unit separations in apartment buildings commonly require:",
    "Fire partitions (often 1-hour) between units and between units and corridors per building code tables",
    ["No separation when buildings are under four stories", "Only smoke detectors without any rated walls", "Open mezzanines between all units"],
    "Fire partitions limit unit-to-unit spread; ratings depend on construction type, height, and sprinkler status.",
    { a: "Low-rise does not automatically eliminate separations.", c: "Detection supplements but does not replace rated separations.", d: "Open mezzanines between units would violate separation." },
    "medium",
    rot(37)
  ),
  q(
    "Corridor walls in many occupancies are required to be:",
    "Fire partitions or fire barriers with rated doors limiting smoke and fire spread along the egress path",
    ["Unrated glass partitions for visibility only", "Chain-link fencing for security", "Operable fabric banners"],
    "Corridor ratings protect egress routes; door ratings pair with wall ratings per code tables.",
    { a: "Unrated glass may not meet corridor wall requirements.", c: "Chain-link is not a corridor separation.", d: "Fabric banners provide no fire resistance." },
    "easy",
    rot(38)
  ),
  q(
    "A fire door with a failing latch or missing closer is considered:",
    "A significant impairment to the fire confinement strategy because the opening protective cannot perform as designed",
    ["Acceptable if the door looks visually aligned", "Irrelevant when the building has a fire pump", "Compliant if propped open only during lunch"],
    "NFPA 80 requires functional closers, latches, and intact labels; impaired doors compromise compartmentation.",
    { a: "Visual alignment does not ensure self-closing and latching.", c: "Fire pumps do not compensate for open or unlatched fire doors.", d: "Propping open violates fire door function unless released on alarm." },
    "easy",
    rot(39)
  ),
  q(
    "Gasketing on fire door assemblies is used to:",
    "Limit smoke passage and assist intumescent seals in maintaining the door's performance in a fire",
    ["Decorate the door with color accents", "Increase door weight for security only", "Eliminate the need for a door frame"],
    "Smoke seals and intumescent gasketing are part of listed fire door assemblies where required.",
    { a: "Decoration is not the purpose of fire door gasketing.", c: "Weight alone does not establish fire performance.", d: "Frames are required components of door assemblies." },
    "medium",
    rot(40)
  ),
  q(
    "An elevator hoistway enclosure must resist:",
    "Fire and smoke spread through the vertical shaft connecting multiple floors",
    ["Only water leakage from roof drains", "Seismic soil liquefaction at the site", "Wind uplift on the parapet exclusively"],
    "Hoistway enclosures are shaft enclosures with rated walls and protected landing openings.",
    { a: "Water leakage is a weatherproofing issue, not the primary hoistway function.", c: "Soil liquefaction is geotechnical/seismic design.", d: "Parapet wind uplift is unrelated to hoistway fire confinement." },
    "easy",
    rot(41)
  ),
  q(
    "Penthouse structures above a roof require fire wall or barrier consideration because:",
    "They can allow fire spread from the penthouse into the main building or between separated sections",
    ["Penthouses are always outside the building and need no separation", "Roof color determines fire rating", "Mechanical equipment never ignites"],
    "Continuity of rated assemblies at roof transitions prevents bypass of compartmentation.",
    { a: "Penthouses connected to the building need rated separations as required.", c: "Roof color has no bearing on fire rating.", d: "Mechanical equipment can be an ignition source." },
    "medium",
    rot(42)
  ),
  q(
    "A fire-rated joint system is used at:",
    "Interfaces between adjacent fire-rated assemblies that may move independently (e.g., floor-to-wall joints)",
    ["Decorative crown molding in lobbies only", "Exterior landscape edging at grade", "Parking stripe layout in garages"],
    "Joint systems (tested per ASTM E1966 / UL 2079) maintain rating at dynamic joints.",
    { a: "Crown molding is not a rated joint system.", c: "Landscape edging is exterior hardscape.", d: "Parking stripes are traffic marking." },
    "hard",
    rot(43)
  ),
  q(
    "Perimeter fire containment systems at floor edges in curtain wall buildings address:",
    "The gap between the floor slab edge and the curtain wall to prevent floor-to-floor fire spread",
    ["Interior carpet tile adhesive selection", "Desk layout in open offices", "Coffee service in break rooms"],
    "Perimeter firestop/containment restores the horizontal assembly at the slab perimeter — a common vulnerability.",
    { a: "Carpet adhesive is interior finish.", c: "Desk layout is furniture planning.", d: "Break room services are unrelated." },
    "hard",
    rot(44)
  ),
  q(
    "A smoke damper (without fire damper function) may be permitted when:",
    "The penetration is only through a smoke barrier and the code requires smoke leakage control without a fire rating at that opening",
    ["Any duct penetrates a 2-hour fire wall without exception", "The duct is in an unlisted grease exhaust plenum at a rated shaft", "All HVAC systems in high-rise buildings universally"],
    "Smoke dampers address leakage at smoke barriers; fire or combination dampers are needed at fire-rated penetrations.",
    { a: "Fire walls require fire-rated protection at duct penetrations.", c: "Grease ducts have specific protection rules beyond smoke dampers alone.", d: "High-rise rules still distinguish smoke vs fire-rated locations." },
    "hard",
    rot(45)
  ),
  q(
    "Inspection of fire dampers after installation should verify:",
    "Accessibility, correct orientation, fusible link rating, and unobstructed closure in the rated assembly",
    ["Only the paint color of the duct exterior", "That the damper is wired open for maximum airflow", "Removal of all access panels to hide the damper"],
    "Fire dampers must be accessible for inspection per NFPA 80/90 and building codes; wired open is prohibited.",
    { a: "Duct paint is irrelevant to damper function.", c: "Dampers must close freely; wiring open defeats protection.", d: "Hiding dampers prevents required inspection and maintenance." },
    "medium",
    rot(46)
  ),
  q(
    "An opening in a fire barrier for a duct air transfer grille (pass-through) typically requires:",
    "A listed fire damper or other approved opening protective unless a specific code exception applies",
    ["Nothing if the grille is decorative aluminum", "Only a carbon monoxide detector nearby", "Removal of the fire barrier in that bay"],
    "Air transfer openings can convey fire and smoke; protectives or exceptions govern their use in rated walls.",
    { a: "Decorative grilles without listing do not protect openings.", c: "CO detectors do not block fire passage.", d: "Removing the barrier defeats compartmentation." },
    "medium",
    rot(47)
  ),
  q(
    "The primary purpose of limiting compartment size through fire barriers is to:",
    "Keep fire size manageable for sprinkler design, egress time, and fire department intervention",
    ["Maximize open floor plate for furniture vendors", "Increase smoke spread for early detector activation only", "Eliminate all interior walls for aesthetics"],
    "Compartment area limits align hazard growth with available egress and suppression response.",
    { a: "Vendor layout is commercial, not life safety driven.", c: "Smoke spread is limited, not encouraged.", d: "Aesthetics do not override compartmentation requirements." },
    "easy",
    rot(48)
  ),
  q(
    "When evaluating a building's confining fire features, the CFPS professional should prioritize verifying:",
    "Continuity of rated assemblies, proper opening protectives, and listed firestopping at penetrations",
    ["Only the exterior landscaping irrigation schedule", "Employee uniform colors in the lobby", "Social media postings about fire drills"],
    "Passive confinement depends on continuous rated construction and maintained opening protectives and firestopping.",
    { a: "Irrigation is unrelated to fire confinement.", c: "Uniform policy is administrative.", d: "Social media is not a field verification item." },
    "easy",
    rot(49)
  ),
];
