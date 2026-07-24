import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "Heat release rate (HRR) is best defined as:",
    "The rate at which a fire releases thermal energy, typically expressed in kilowatts or megawatts",
    ["The total mass of fuel consumed before flashover occurs", "The temperature at the ceiling of a compartment at 10 minutes", "The volume of smoke produced per unit floor area"],
    "HRR quantifies energy release per unit time and is a primary metric for characterizing fire severity and growth.",
    { b: "Total fuel mass is a consumption measure, not an energy release rate.", c: "Ceiling temperature is an environmental response, not HRR itself.", d: "Smoke volume relates to combustion products, not thermal energy release rate." },
    "easy",
    rot(0)
  ),
  q(
    "In the t-squared fire growth model, HRR increases proportionally to:",
    "The square of elapsed time from ignition",
    ["The cube root of ventilation opening area", "The linear distance flame spreads across a surface", "The inverse of ambient relative humidity"],
    "The t-squared model assumes HRR = αt², where α is the growth coefficient; it describes accelerating fire growth in the early phase.",
    { b: "Ventilation area affects burning regime but is not the t-squared time relationship.", c: "Flame spread distance is a separate phenomenon from the t-squared HRR curve.", d: "Humidity may influence combustion but is not part of the t-squared growth law." },
    "medium",
    rot(1)
  ),
  q(
    "A slow t-squared fire growth classification corresponds to an α value of approximately:",
    "0.0029 kW/s²",
    ["0.047 kW/s²", "0.188 kW/s²", "0.930 kW/s²"],
    "Fire growth categories use standard α values: slow (0.0029), medium (0.0117), fast (0.0469), and ultra-fast (0.1876) kW/s².",
    { a: "0.047 kW/s² is closer to the fast growth category.", c: "0.188 kW/s² aligns with ultra-fast growth.", d: "0.930 kW/s² exceeds standard t-squared classification values." },
    "hard",
    rot(2)
  ),
  q(
    "The peak heat release rate of a compartment fire in the fully developed stage is most often limited by:",
    "Available oxygen supply through ventilation openings",
    ["The initial mass of the first item ignited only", "The thermal inertia of exterior wall cladding alone", "The activation temperature of the first sprinkler"],
    "In ventilation-controlled fully developed fires, burning rate is governed by air inflow through openings, not fuel surface area alone.",
    { b: "The first ignited item affects early growth, not the sustained ventilation limit.", c: "Exterior cladding thermal inertia does not primarily cap HRR in compartment fires.", d: "Sprinkler activation may suppress fire but does not define the ventilation limit concept." },
    "medium",
    rot(3)
  ),
  q(
    "During the growth stage of a compartment fire, the dominant heat transfer mechanism to ignite unburned fuel is typically:",
    "Radiation from the fire plume and hot upper gas layer",
    ["Conduction through concrete slab thickness only", "Forced convection from HVAC supply air", "Evaporative cooling of nearby surfaces"],
    "Radiant heat flux from the developing hot layer and flames drives pyrolysis and spread during growth prior to full room involvement.",
    { b: "Slab conduction is generally too slow to dominate fire spread in compartments.", c: "HVAC supply air does not provide the high radiant flux needed for rapid growth.", d: "Evaporative cooling suppresses ignition, it does not drive it." },
    "medium",
    rot(4)
  ),
  q(
    "Flashover in a compartment is best described as:",
    "A rapid transition to full-room involvement with a sudden increase in upper-layer temperature and radiant flux",
    ["The moment the fire department arrives and opens the front door", "Complete burnout of all fuel with declining HRR", "The first visible flame from the initial item ignited"],
    "Flashover marks transition from growth to fully developed stage when lower surfaces ignite from radiant heating of the hot gas layer.",
    { b: "Door opening may change ventilation but is not the definition of flashover.", c: "Burnout is decay stage, occurring after fully developed burning.", d: "Initial flame appearance is ignition, not flashover." },
    "easy",
    rot(5)
  ),
  q(
    "In the decay stage of a compartment fire, HRR generally decreases because:",
    "Available fuel is consumed or oxygen becomes insufficient to sustain prior burning rates",
    ["The t-squared growth coefficient automatically reverses sign", "Radiation is replaced entirely by endothermic chemical reactions", "Ventilation openings suddenly enlarge without cause"],
    "Decay follows peak burning when fuel is depleted or ventilation cannot support continued combustion at prior intensity.",
    { b: "The t-squared model describes growth; decay is a separate phase driven by fuel/oxygen limits.", c: "Radiation does not convert entirely to endothermic reactions at decay.", d: "Opening enlargement is not the typical physical mechanism for decay." },
    "medium",
    rot(6)
  ),
  q(
    "A fuel-limited (fuel-controlled) compartment fire is characterized by:",
    "Burning rate governed primarily by fuel surface area and properties rather than air supply",
    ["HRR increasing solely because exhaust fans were turned off", "Zero production of carbon monoxide because air is unlimited", "Immediate flashover upon ignition of any small trash item"],
    "Fuel-controlled burning occurs when sufficient ventilation exists that pyrolysis and reaction rates depend on fuel geometry and characteristics.",
    { a: "Exhaust fan changes may alter ventilation but do not define fuel-controlled burning.", c: "CO is produced in virtually all incomplete combustion scenarios.", d: "Flashover requires substantial accumulated heat; small items do not guarantee it." },
    "medium",
    rot(7)
  ),
  q(
    "A ventilation-limited fire will most likely produce:",
    "Higher yields of incomplete combustion products such as CO and smoke",
    ["Lower upper-layer temperatures than a fuel-limited fire of equal HRR", "No accumulation of hot gases beneath the ceiling", "Complete oxidation of all pyrolyzates before they leave the fire plume"],
    "Limited oxygen promotes incomplete combustion, increasing toxic gas and smoke yields even when visible flaming may diminish.",
    { b: "Ventilation-limited fires can still develop very hot upper layers.", c: "Hot gas accumulation is typical in compartment fires regardless of limitation type.", d: "Incomplete oxidation is characteristic of ventilation-limited conditions." },
    "medium",
    rot(8)
  ),
  q(
    "The oxygen consumption calorimetry principle used in bench-scale HRR measurement relies on:",
    "The constant energy release per unit mass of oxygen consumed",
    ["The linear relationship between flame height and room volume", "The assumption that all fuels release identical CO₂ per joule", "Direct weighing of soot collected on a filter only"],
    "Thornton’s rule approximates that ~13.1 MJ of heat is released per kg of oxygen consumed, enabling HRR from O₂ depletion measurement.",
    { b: "Flame height-volume relationships do not form the basis of oxygen consumption calorimetry.", c: "CO₂ yield varies by fuel; oxygen consumption is the standard basis.", d: "Soot mass alone does not directly quantify HRR without oxygen consumption data." },
    "hard",
    rot(9)
  ),
  q(
    "Cone calorimeter testing at a fixed external heat flux primarily measures:",
    "Ignitability, HRR, mass loss, and smoke production of a material specimen",
    ["Full-scale flashover time in a two-story office", "Structural fire resistance of a loaded steel column", "Sprinkler activation time in a warehouse mockup"],
    "The cone calorimeter is a bench-scale apparatus exposing specimens to controlled irradiance to quantify combustion response properties.",
    { b: "Flashover timing requires compartment or larger-scale experiments.", c: "Structural fire resistance uses furnace tests like ASTM E119, not cone calorimetry.", d: "Sprinkler activation is not measured in cone calorimeter material tests." },
    "easy",
    rot(10)
  ),
  q(
    "In cone calorimeter results, higher peak HRR per unit area generally indicates:",
    "Greater fire growth potential of the material under the test heat flux",
    ["Lower flammability and slower flame spread on the specimen", "That the material will always self-extinguish in all applications", "Compliance with noncombustible construction requirements by itself"],
    "Peak HRR and HRR curves from the cone calorimeter inform material flammability; higher peaks suggest more rapid heat release.",
    { b: "Higher peak HRR indicates more intense burning, not lower flammability.", c: "Self-extinguishment depends on configuration and exposure, not peak HRR alone.", d: "Noncombustible classification requires specific criteria beyond a single HRR value." },
    "medium",
    rot(11)
  ),
  q(
    "The LIFT (Lateral Ignition and Flame Spread Test) apparatus evaluates:",
    "Upward flame spread on a vertical material surface after pilot ignition",
    ["Downward flame spread on a horizontal ceiling only", "Explosive spalling of concrete under rapid heating", "Electrical short-circuit arcing in cable trays"],
    "LIFT (ASTM E1321) measures flame spread index related to how flames travel upward on a vertically mounted specimen.",
    { b: "Ceiling downward spread is not the LIFT test configuration.", c: "Concrete spalling is a structural heating phenomenon, not LIFT scope.", d: "Cable arcing is electrical fault testing, unrelated to LIFT." },
    "hard",
    rot(12)
  ),
  q(
    "Radiant panel flame spread testing differs from small-scale Bunsen burner tests because it:",
    "Exposes the specimen to a defined external radiant heat flux simulating nearby fire heating",
    ["Measures only the melting point of thermoplastics in an oven", "Eliminates the influence of material surface orientation", "Requires full room flashover before data collection begins"],
    "Radiant panel tests (e.g., ASTM E162) assess flame spread under imposed radiant heating, relevant to adjacent fire scenarios.",
    { b: "Melting point ovens do not replicate flame spread under radiant exposure.", c: "Surface orientation remains a significant factor in flame spread testing.", d: "Full flashover is not a prerequisite for radiant panel bench tests." },
    "medium",
    rot(13)
  ),
  q(
    "Piloted ignition theory distinguishes between:",
    "A heat flux threshold for ignition when a pilot flame is present versus spontaneous ignition without a pilot",
    ["Sprinkler wetting rates and hose stream reach only", "Earthquake damage categories and wind uplift forces", "Fire alarm audibility and strobe candela ratings"],
    "Piloted ignition occurs when external flux causes pyrolyzate ignition in presence of a small flame; autoignition requires higher flux/temperature without pilot.",
    { b: "Sprinkler and hose stream parameters are suppression topics.", c: "Seismic and wind loads are structural hazard categories.", d: "Alarm audibility and strobes are detection/notification criteria." },
    "medium",
    rot(14)
  ),
  q(
    "The critical heat flux for ignition of a material is:",
    "The minimum imposed heat flux at which sustained ignition occurs under specified conditions",
    ["The maximum temperature a firefighter turnout coat can withstand", "The total calories released when a building is fully consumed", "The airflow velocity needed to extinguish a candle flame"],
    "Critical heat flux is a material property boundary; below it, ignition will not be sustained under the test configuration.",
    { b: "Turnout coat limits are PPE specifications, not material ignition properties.", c: "Total building heat release is an aggregate outcome, not critical flux.", d: "Air velocity for candle extinction is unrelated to material critical heat flux." },
    "easy",
    rot(15)
  ),
  q(
    "Smoldering combustion differs from flaming combustion primarily because:",
    "It proceeds on the solid surface without visible flame, producing heat at lower temperature",
    ["It always generates higher HRR than any flaming fire", "It cannot produce toxic gases or smoke", "It requires direct impingement of a propane torch pilot only"],
    "Smoldering is a surface oxidation/pyrolysis process that can persist at low heat release and produce significant smoke and CO.",
    { b: "Smoldering typically has lower HRR than well-developed flaming fires.", c: "Smoldering can produce substantial CO and visible smoke.", d: "Smoldering can initiate from low-energy sources, not only torch impingement." },
    "easy",
    rot(16)
  ),
  q(
    "The N-Gas model is used to estimate:",
    "Fractional effective dose (FED) of fire gases for incapacitation based on CO, CO₂, HCN, and oxygen depletion",
    ["Wind-driven flame length on wildland slopes only", "Required sprinkler design density for rack storage", "Bolt shear strength at elevated temperature"],
    "N-Gas combines toxic gas concentrations into an FED metric for tenability analysis in fire safety engineering.",
    { b: "Wildland flame length uses different empirical models.", c: "Sprinkler density is hydraulic design, not toxic gas dose modeling.", d: "Bolt shear at temperature is structural mechanics." },
    "hard",
    rot(17)
  ),
  q(
    "Smoke obscuration is commonly quantified using:",
    "Specific extinction area (SEA) or light obscuration percentage per unit path length",
    ["Sprinkler orifice K-factor and pipe C-factor only", "Concrete compressive strength in pounds per square inch", "Fire pump rated gallons per minute at 0 psi"],
    "Smoke production metrics include SEA (m²/kg) from bench tests and obscuration in compartment tenability assessments.",
    { b: "Sprinkler K-factor and pipe roughness are hydraulic parameters.", c: "Concrete strength is a structural material property.", d: "Pump rated flow is a water supply characteristic." },
    "medium",
    rot(18)
  ),
  q(
    "Hydrogen cyanide (HCN) in building fires is of particular concern because:",
    "It is highly toxic at low concentrations and can be produced from nitrogen-containing fuels and materials",
    ["It is heavier than air and always settles harmlessly below occupant breathing level", "It is only produced when sprinklers operate on steel decks", "It has no contribution to fractional effective dose calculations"],
    "HCN contributes significantly to incapacitation; foam, textiles, and many synthetics can generate HCN under fire conditions.",
    { b: "HCN mixing behavior varies; it is not assumed to settle harmlessly.", c: "HCN production is tied to fuel chemistry and conditions, not sprinkler operation on steel.", d: "HCN is explicitly included in FED models such as N-Gas." },
    "medium",
    rot(19)
  ),
  q(
    "Tenability analysis in fire safety engineering evaluates whether:",
    "Exposed occupants can survive given heat, smoke, and toxic gas exposure over time",
    ["The building exterior paint color meets owner specifications", "Annual fire drill attendance exceeds 50 percent of staff", "Standpipe hose threads match local FD preferences only"],
    "Tenability ties fire modeling outputs (temperature, visibility, FED) to available safe egress time versus required egress time.",
    { b: "Paint color is aesthetic, not life safety tenability.", c: "Drill attendance is training metrics, not physical tenability.", d: "Hose thread compatibility aids firefighting but is not tenability analysis." },
    "easy",
    rot(20)
  ),
  q(
    "The plume in fire dynamics refers to:",
    "The buoyant column of hot gases and combustion products rising above the fire",
    ["The water discharge pattern from a single upright sprinkler", "The horizontal spread of flame across a carpet without buoyancy effects", "The electrical arc path in a faulted panelboard"],
    "Fire plumes transport heat and smoke upward, entrain air, and interact with ceilings to form ceiling jets.",
    { b: "Sprinkler discharge patterns are hydraulic spray descriptions.", c: "Horizontal spread neglects the buoyant column defining a plume.", d: "Electrical arcing is unrelated to combustion buoyant flow." },
    "easy",
    rot(21)
  ),
  q(
    "When a fire plume impinges on a ceiling, a ceiling jet forms that:",
    "Spreads horizontally outward carrying high-temperature gases and high heat flux near the ceiling",
    ["Immediately drops all smoke to the floor with no horizontal flow", "Eliminates any radiant heat transfer to lower surfaces", "Stops entrainment of air into the plume entirely"],
    "Ceiling jets distribute heat and smoke radially; they are critical for detector activation and downstream hazard spread.",
    { b: "Smoke and hot gases spread horizontally, not solely to the floor.", c: "Radiant flux from the hot layer remains significant below the ceiling jet.", d: "Entrainment continues; impingement redirects flow rather than ending entrainment." },
    "medium",
    rot(22)
  ),
  q(
    "The zone model approach in compartment fire modeling divides the room into:",
    "An upper hot smoke layer and a lower cooler layer with a distinct interface",
    ["Only solid fuel particles with no gas phase", "Individual sprinkler droplets and pipe fittings", "Structural steel members without any gas temperatures"],
    "Zone models (e.g., CFAST) assume two uniform gas layers, simplifying energy and mass exchange versus full CFD resolution.",
    { b: "Sprinkler components are not the compartment gas layering scheme.", c: "Steel members may be tracked but zone models center on gas layer temperatures.", d: "Solid fuel particles alone omit the gas layer concept." },
    "medium",
    rot(23)
  ),
  q(
    "CFAST (Consolidated Model of Fire and Smoke Transport) is primarily classified as:",
    "A two-zone compartment fire model used for rapid scenario analysis",
    ["A three-dimensional computational fluid dynamics field model solving Navier-Stokes on fine grids", "A structural finite-element collapse program for earthquake design", "A hydraulic calculation engine for sprinkler tree systems"],
    "CFAST couples zone model compartments with vent flow, plume correlations, and target heating for engineering-level predictions.",
    { b: "Full Navier-Stokes CFD describes tools like FDS, not CFAST’s zone approach.", c: "Structural collapse software addresses mechanics, not smoke transport zoning.", d: "Sprinkler hydraulics use NFPA formulas, not CFAST." },
    "medium",
    rot(24)
  ),
  q(
    "Fire Dynamics Simulator (FDS) solves fire and smoke transport using:",
    "Large-eddy simulation computational fluid dynamics on a rectilinear grid",
    ["A single uniform temperature for the entire building without vents", "Empirical t-squared curves only with no mass transport", "Hand calculation of Hazen-Williams friction loss in pipes"],
    "FDS is a CFD model resolving flow, combustion, and radiation fields in three dimensions for detailed fire scenario analysis.",
    { b: "Uniform single temperature is a drastic simplification unlike FDS field modeling.", c: "T-squared alone is a growth correlation, not the FDS numerical framework.", d: "Hazen-Williams pertains to water flow in piping." },
    "medium",
    rot(25)
  ),
  q(
    "A primary advantage of FDS over zone models for some applications is:",
    "Ability to capture three-dimensional flow patterns, obstructions, and localized conditions",
    ["Guaranteed faster run times for every scenario regardless of grid size", "Elimination of any need for experimental validation or expertise", "Automatic conversion of results into NFPA 13 sprinkler pipe schedules"],
    "FDS resolves complex geometries and flows but requires greater computational resources and user skill than zone models.",
    { b: "CFD runs are typically slower and grid-dependent, not universally faster.", c: "All models require validation and engineering judgment.", d: "FDS does not auto-generate sprinkler pipe schedules." },
    "medium",
    rot(26)
  ),
  q(
    "In fire modeling, grid cell size in FDS should generally:",
    "Resolve important flow features, often related to fire diameter and characteristic lengths",
    ["Be as large as the entire building to minimize any computation", "Match the sprinkler orifice diameter exactly in all cases", "Be chosen randomly without sensitivity testing"],
    "Mesh resolution affects accuracy; practitioners perform sensitivity studies refining cells near flames, vents, and targets.",
    { b: "A single cell for the whole building cannot resolve fire dynamics.", c: "Sprinkler orifice size is not the universal mesh criterion.", d: "Random mesh choice without sensitivity analysis is poor practice." },
    "hard",
    rot(27)
  ),
  q(
    "A vent in CFAST or zone modeling represents:",
    "An opening through which mass and energy exchange occurs between compartments or with the exterior",
    ["Only a decorative architectural feature with no flow", "A fire department radio communication channel", "A sprinkler alarm check valve in the riser"],
    "Vents model doors, windows, and mechanical openings, controlling pressure-driven flow and smoke movement between zones.",
    { b: "Radio channels are unrelated to compartment vent modeling.", c: "Check valves are piping components, not zone model vents.", d: "Decorative features without openings do not function as model vents." },
    "easy",
    rot(28)
  ),
  q(
    "Uncertainty in computer fire models is best managed by:",
    "Sensitivity studies, validation against experiments, and documenting input assumptions",
    ["Using default inputs without review because models are exact", "Ignoring ventilation because it rarely affects outcomes", "Reporting only peak HRR without context or ranges"],
    "Engineering credibility requires stating assumptions, bounding outputs, and comparing to test data or established correlations.",
    { b: "Models are not exact; blind defaults increase error risk.", c: "Ventilation often strongly influences compartment fire development.", d: "Single metrics without context omit uncertainty and scenario dependence." },
    "medium",
    rot(29)
  ),
  q(
    "Probabilistic risk analysis in fire safety differs from deterministic scenario analysis by:",
    "Combining event likelihoods with consequence estimates to quantify risk metrics",
    ["Eliminating all uncertainty by using a single worst-case heat flux", "Replacing the need for any code compliance review", "Focusing only on historical art restoration costs"],
    "Probabilistic methods integrate frequency and severity (e.g., expected annual loss, FN curves) rather than one fixed design fire alone.",
    { b: "Single worst-case deterministic scenarios do not incorporate probability.", c: "Risk analysis supplements but does not replace code compliance.", d: "Art restoration is a narrow consequence not defining probabilistic fire risk." },
    "medium",
    rot(30)
  ),
  q(
    "An event tree in fire risk analysis is used to:",
    "Map branching sequences of events and outcomes following an initiating fire event",
    ["Calculate friction loss in a standpipe lateral", "Determine the color rendering index of emergency lighting", "Size grease duct enclosure clearances only"],
    "Event trees decompose scenarios (detection, suppression success, egress) to assign probabilities to outcome branches.",
    { b: "Friction loss is hydraulic engineering.", c: "Color rendering index is a lighting quality parameter.", d: "Duct clearances are code spacing requirements, not event tree methodology." },
    "medium",
    rot(31)
  ),
  q(
    "A fault tree in fire protection risk assessment represents:",
    "Logical combinations of component failures leading to a defined top event such as flashover or unacceptable loss",
    ["The physical ladder placement at a building exterior", "A chronological diary of fire inspector lunch breaks", "Only the wind rose diagram for a construction site"],
    "Fault trees use AND/OR gates to relate basic failures (detector fault, door held open) to system-level undesired outcomes.",
    { b: "Ladder placement is tactical fireground activity.", c: "Inspector schedules are administrative, not risk logic diagrams.", d: "Wind roses inform environmental design but are not fault trees." },
    "medium",
    rot(32)
  ),
  q(
    "Expected loss in fire risk analysis is conceptually:",
    "The sum of consequence magnitudes weighted by their probabilities of occurrence",
    ["The maximum single fuel package mass in a warehouse aisle", "The decibel level of a fire alarm horn strobe combo", "The number of pages in a building evacuation plan"],
    "Risk integrates frequency and impact; expected loss combines monetary or life safety consequences with likelihood estimates.",
    { b: "Fuel mass alone omits probability and damage valuation.", c: "Alarm decibels measure notification, not expected loss.", d: "Plan page count is not a risk metric." },
    "hard",
    rot(33)
  ),
  q(
    "According to NFPA and national data trends, residential fires most often:",
    "Occur in one- and two-family dwellings and are frequently associated with cooking and heating equipment",
    ["Are confined exclusively to high-rise commercial office towers", "Have no relationship to occupant behavior or fuel packages in the home", "Always originate in fully sprinklered industrial occupancies"],
    "Residential occupancies dominate U.S. fire deaths and injuries; cooking is a leading cause in home fire statistics.",
    { b: "High-rise offices are not the dominant residential fire category.", c: "Occupant behavior and home contents strongly influence residential fire risk.", d: "Industrial sprinklered fires are not the primary residential fire pattern." },
    "easy",
    rot(34)
  ),
  q(
    "NFPA research on home fire losses commonly reports that working smoke alarms:",
    "Reduce the risk of dying in reported home fires compared to homes without working alarms",
    ["Increase fire growth rate by supplying additional oxygen", "Are unnecessary if the home has exterior hardboard siding", "Guarantee that no fire deaths will ever occur in any scenario"],
    "Statistical analyses show substantially lower fatality rates where working alarms are present, though they do not eliminate all risk.",
    { b: "Smoke alarms do not increase fire growth by providing oxygen.", c: "Siding material does not replace the need for detection.", d: "No single measure guarantees zero fatalities in all fires." },
    "easy",
    rot(35)
  ),
  q(
    "Leading causes of civilian fire deaths in U.S. statistics often include:",
    "Smoking materials, cooking, heating equipment, and electrical distribution faults",
    ["Routine scheduled fire department training burns only", "Post-fire overhaul water damage without any ignition", "Fire code adoption hearings and public comment periods"],
    "NFPA and USFA data consistently rank smoking, cooking, heating, and electrical issues among top residential fire death causes.",
    { b: "Training burns are controlled and not leading civilian death causes.", c: "Overhaul water damage follows fire; it is not an ignition cause category.", d: "Code hearings are administrative processes, not fire causes." },
    "medium",
    rot(36)
  ),
  q(
    "Fire loss statistics are most useful to fire protection professionals when they:",
    "Inform hazard prioritization, prevention programs, and resource allocation based on frequency and severity patterns",
    ["Replace all engineering judgment about a specific building’s unique layout", "Prove that every fire grows at the ultra-fast t-squared rate", "Eliminate the need for site-specific fire modeling in all cases"],
    "Aggregate data guides macro-level decisions; site-specific analysis still addresses unique geometry, occupancy, and systems.",
    { b: "Statistics inform but do not replace building-specific engineering.", c: "Real fires span all growth categories, not only ultra-fast α.", d: "Modeling may still be warranted for complex or high-consequence designs." },
    "medium",
    rot(37)
  ),
  q(
    "The SFPE Engineering Guide to Performance-Based Fire Protection emphasizes:",
    "Defining project objectives, design fire scenarios, and acceptance criteria before selecting analysis methods",
    ["Skipping documentation because authorities always accept verbal assurances", "Using only prescriptive tabulated occupant loads without analysis", "Ignoring uncertainty if the architect prefers a particular ceiling finish"],
    "Performance-based design requires explicit goals, scenarios, calculation methods, and peer review/documentation per SFPE guidance.",
    { b: "Documentation and stakeholder agreement are central, not verbal assurances alone.", c: "Occupant loads are inputs; performance design still requires fire analysis.", d: "Finish preferences do not override safety objectives and analysis requirements." },
    "hard",
    rot(38)
  ),
  q(
    "A design fire scenario for analysis should:",
    "Be credible for the occupancy, fuel load, and ignition sources with defined growth and ventilation assumptions",
    ["Always assume zero ventilation and infinite fuel indefinitely", "Be chosen only from unrelated wildland fire case studies", "Ignore suppression and detection unless required to increase HRR"],
    "Credible scenarios reflect plausible fuels, ignition locations, vent conditions, and system interactions for the specific facility.",
    { b: "Wildland cases may not represent an office or warehouse compartment scenario.", c: "Suppression and detection materially affect outcomes and should be considered.", d: "Zero ventilation and infinite fuel are unrealistic for credible scenario design." },
    "medium",
    rot(39)
  ),
  q(
    "Material flammability parameters used in engineering analysis may include:",
    "Heat of combustion, thermal conductivity, specific heat, and ignition temperature or critical flux",
    ["Only the carpet color and pattern visible under normal lighting", "The brand of fire extinguisher tags on the wall", "The number of parking spaces per zoning code"],
    "Heat release and ignition modeling require thermophysical and combustion properties, often from bench-scale tests and literature.",
    { b: "Extinguisher tag brands do not define material flammability.", c: "Parking counts are zoning data, not combustion properties.", d: "Aesthetic carpet color is not a flammability parameter." },
    "medium",
    rot(40)
  ),
  q(
    "The effective heat of combustion for a fuel is:",
    "The energy released per unit mass of fuel actually burned, accounting for incomplete combustion",
    ["The total installed sprinkler head count in a room", "The ceiling height divided by door width only", "The voltage drop across a notification appliance circuit"],
    "Effective heat of combustion adjusts theoretical values for measured combustion efficiency and unburned products.",
    { b: "Sprinkler count is a system design factor, not heat of combustion.", c: "Ceiling-to-door ratio is geometric, not energy per mass burned.", d: "Voltage drop is electrical design, unrelated to fuel energy release." },
    "hard",
    rot(41)
  ),
  q(
    "Flame spread index from standardized small-scale tests is used to:",
    "Compare relative rate of flame travel on a material surface under controlled conditions",
    ["Determine the seismic base shear for a hospital", "Calculate required fire flow for municipal water mains only", "Set the temperature rating of a heat detector in a kitchen"],
    "Flame spread indices (e.g., from ASTM E84) rank materials for code applications; they are not direct full-scale fire predictions alone.",
    { b: "Seismic base shear uses structural codes, not flame spread index.", c: "Municipal fire flow is water supply planning.", d: "Detector temperature ratings are selected per occupancy nuisance and hazard." },
    "medium",
    rot(42)
  ),
  q(
    "The Steckler ventilation model is applied to estimate:",
    "Mass flow through a vent driven by pressure differences from hot gas buoyancy in a compartment",
    ["The number of fire drills required per semester in schools", "Luminaire efficacy in lumens per watt for exit signs", "Bolt pretension in a moment-resisting steel frame connection"],
    "Ventilation models like Steckler relate temperature differences and vent geometry to bidirectional or unidirectional flow rates.",
    { b: "Drill frequency is a life safety management requirement.", c: "Luminaire efficacy is lighting performance.", d: "Bolt pretension is structural connection design." },
    "hard",
    rot(43)
  ),
  q(
    "Backdraft is most likely when:",
    "A ventilation-limited fire in an under-ventilated compartment receives a sudden inflow of fresh air",
    ["A fully sprinklered room experiences routine monthly testing", "A fire burns in the open outdoors with unlimited wind from ignition", "All fuel has been completely oxidized and the room is cold"],
    "Backdraft involves rapid ignition of accumulated unburned gases when oxygen is introduced after a ventilation-limited period.",
    { b: "Routine sprinkler testing does not define backdraft conditions.", c: "Well-ventilated outdoor fires do not typically develop backdraft pockets.", d: "Fully burned out cold rooms lack unburned gas accumulations for backdraft." },
    "medium",
    rot(44)
  ),
  q(
    "Rollover in compartment fire development refers to:",
    "Flames traveling in the hot gas layer beneath the ceiling before full surface involvement at lower levels",
    ["A sprinkler pipe elbow rotating during hydrostatic testing", "The building settling uniformly under dead load only", "Firefighters descending stairs during evacuation"],
    "Rollover indicates growing upper-layer ignition and is a precursor phenomenon that may precede flashover.",
    { b: "Pipe elbow movement during testing is mechanical, not combustion rollover.", c: "Uniform structural settlement is unrelated to fire layer flames.", d: "Firefighter stair descent is operational activity, not gas layer flame spread." },
    "medium",
    rot(45)
  ),
  q(
    "The concept of available safe egress time (ASET) compares:",
    "The time until untenable conditions at a location versus time needed for occupants to reach safety (RSET)",
    ["Sprinkler pipe diameter to standpipe hose coupling thread type", "Annual inflation rate to property tax assessments", "Roofing shingle color to landscaping species selection"],
    "ASET must exceed RSET (required safe egress time) for a design to provide adequate life safety margin in performance analysis.",
    { b: "Pipe and hose threads are compatibility details, not ASET/RSET.", c: "Inflation and taxes are economic metrics.", d: "Shingle and landscaping choices are aesthetic, not egress timing." },
    "medium",
    rot(46)
  ),
  q(
    "Inverse square law application to radiant heat flux means that:",
    "Radiant heat flux decreases approximately with the square of distance from the radiating source",
    ["Heat flux doubles when distance from the source doubles", "Radiation is unaffected by distance in any fire scenario", "Only convective heat transfer follows inverse square behavior"],
    "Radiative flux from a point or small source diminishes rapidly with distance, important for ignition and tenability calculations.",
    { b: "Doubling distance reduces flux, it does not double it.", c: "Distance strongly affects radiant exposure to targets.", d: "Inverse square is characteristic of radiation, not a universal convection rule." },
    "easy",
    rot(47)
  ),
  q(
    "A medium t-squared fire growth coefficient α is approximately:",
    "0.0117 kW/s²",
    ["0.0029 kW/s²", "0.0469 kW/s²", "0.1876 kW/s²"],
    "Standard classifications: slow 0.0029, medium 0.0117, fast 0.0469, ultra-fast 0.1876 kW/s² — commonly used in design fires.",
    { a: "0.0029 kW/s² is the slow growth value.", c: "0.0469 kW/s² is fast growth.", d: "0.1876 kW/s² is ultra-fast growth." },
    "hard",
    rot(48)
  ),
  q(
    "When interpreting fire test data for a furnished compartment, a key limitation of bench-scale results is that:",
    "They may not capture full-scale interactions of fuel arrangement, ventilation, and structural feedback",
    ["They always overpredict every full-scale fire without exception", "They are invalid for any material classification purpose", "They automatically include firefighter suppression tactics"],
    "Bench tests isolate material response; furnishing layout, room size, and system effects require engineering extrapolation or larger tests.",
    { b: "Bench-scale data can under- or over-predict; it is not universally conservative.", c: "Bench tests are foundational for material classification when used properly.", d: "Suppression tactics are not part of standard material bench tests." },
    "medium",
    rot(49)
  ),
];
