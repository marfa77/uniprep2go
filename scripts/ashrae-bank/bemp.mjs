import { makeQ } from "./makeQ.mjs";

export const bemp = [
  makeQ(
    "ASHRAE BEMP certification primarily validates competency in:",
    "Building energy modeling software, model quality, calibration, and results interpretation",
    [
      { text: "Refrigerant recovery and EPA Section 608 certification only", why: "Refrigerant handling is a separate credential domain." },
      { text: "Structural steel connection design exclusively", why: "Structural design is outside BEMP scope." },
      { text: "Elevator traffic simulation without energy analysis", why: "BEMP focuses on whole-building energy simulation." },
    ],
    "BEMP tests modeling proficiency across inputs, simulation, calibration, and reporting per the BEMP exam blueprint.",
    "easy"
  ),
  makeQ(
    "In a whole-building energy model, the weather file (EPW/TMY) primarily supplies:",
    "Hourly dry-bulb temperature, humidity, solar radiation, and wind data for the simulation year",
    [
      { text: "Only average monthly utility rates without climate data", why: "Tariffs are separate economic inputs." },
      { text: "Occupant names and workstation assignments", why: "Occupancy is modeled via schedules, not weather files." },
      { text: "Structural load combinations for seismic design", why: "Structural loads are unrelated to energy weather files." },
    ],
    "Weather files drive HVAC loads, solar gains, and free-cooling availability in simulation engines.",
    "medium"
  ),
  makeQ(
    "When calibrating an existing-building energy model to utility data, a common acceptance criterion is:",
    "Monthly or annual simulated energy within an agreed tolerance (often ±5–15%) of billed consumption after normalization",
    [
      { text: "Exact match to the penny for every fuel type every month", why: "Perfect monthly agreement is rarely achievable or required." },
      { text: "No comparison to utility bills is ever needed", why: "Calibration requires measured consumption comparison." },
      { text: "Only peak demand matching with no energy total review", why: "Calibration typically addresses energy totals and often demand." },
    ],
    "ASHRAE and industry practice use tolerance bands on normalized utility data to judge model calibration quality.",
    "medium"
  ),
  makeQ(
    "ASHRAE Standard 90.1 Appendix G baseline models for rating compliance are typically:",
    "A minimally compliant reference building modeled with prescribed system types and efficiencies",
    [
      { text: "Identical copies of the proposed design with no changes", why: "Baseline and proposed models differ by Appendix G rules." },
      { text: "Hand calculations without simulation software", why: "Appendix G uses performance rating via simulation." },
      { text: "Based only on architect renderings without geometry", why: "Models require defined geometry and systems." },
    ],
    "Appendix G defines baseline assumptions so proposed design performance can be compared for code or LEED paths.",
    "hard"
  ),
  makeQ(
    "Zoning a building energy model into thermal blocks should reflect:",
    "Spaces with similar orientation, schedule, internal loads, and HVAC service for accurate load aggregation",
    [
      { text: "Only floor level regardless of exposure or use", why: "Orientation and use strongly affect loads." },
      { text: "Random assignment to minimize file size only", why: "Zoning must represent physical and operational similarity." },
      { text: "One zone for the entire campus with no differentiation", why: "Oversimplified zoning obscures load diversity and controls." },
    ],
    "Proper zoning balances accuracy and runtime while capturing load diversity and system boundaries.",
    "medium"
  ),
  makeQ(
    "Internal gains from occupants in energy models are commonly represented using:",
    "Sensible and latent heat rates per person combined with occupancy schedules",
    [
      { text: "Fixed 10 kW per person regardless of activity", why: "Metabolic rates vary by activity level; typical values are much lower." },
      { text: "No internal gains because people do not affect loads", why: "Occupants add significant sensible and latent gains." },
      { text: "Only lighting power with no metabolic contribution", why: "People add metabolic gains separate from plug and lighting loads." },
    ],
    "ASHRAE and software defaults assign watts/person by activity with time-varying schedules.",
    "easy"
  ),
  makeQ(
    "Infiltration in detailed energy models is often specified as:",
    "Effective leakage area, ACH, or crack flow tied to envelope airtightness and pressure difference assumptions",
    [
      { text: "Always zero because modern buildings are perfectly sealed", why: "All buildings have some infiltration/exfiltration." },
      { text: "Only through open windows with no envelope leakage", why: "Envelope infiltration is modeled separately from intentional ventilation." },
      { text: "A fixed 50 ACH for all commercial buildings", why: "50 ACH is unrealistic for typical commercial envelopes." },
    ],
    "Modelers use blower-door results, codes, or standards to set realistic infiltration inputs.",
    "medium"
  ),
  makeQ(
    "When comparing proposed vs baseline energy cost in a LEED energy model, the metric is typically:",
    "Percentage improvement in cost (or energy) relative to the ASHRAE 90.1 Appendix G baseline",
    [
      { text: "Absolute site EUI only with no baseline reference", why: "LEED EA credits compare proposed performance to Appendix G baseline." },
      { text: "Peak cooling tonnage divided by floor area only", why: "Peak load metrics do not replace cost/energy improvement calculations." },
      { text: "Number of HVAC zones in the proposed model", why: "Zone count is not a compliance metric." },
    ],
    "LEED and many codes use cost or energy improvement vs a standardized baseline simulation.",
    "medium"
  ),
  makeQ(
    "Sensitivity analysis in building energy modeling is used to:",
    "Identify which input parameters most influence results and quantify uncertainty",
    [
      { text: "Eliminate the need for any calibrated baseline", why: "Sensitivity complements but does not replace calibration." },
      { text: "Replace all HVAC system definitions with defaults", why: "Sensitivity tests parameter variation; it does not remove system detail." },
      { text: "Guarantee utility bills will match exactly next year", why: "Sensitivity explores uncertainty; it cannot guarantee future bills." },
    ],
    "One-at-a-time or Monte Carlo sensitivity helps prioritize data collection and risk disclosure.",
    "hard"
  ),
  makeQ(
    "Lighting power density in a model should align with:",
    "Space-type LPD from code tables or design documents, controlled by schedules and daylighting controls where modeled",
    [
      { text: "Maximum connected load of all building equipment combined", why: "LPD is watts per area for lighting, not total connected load." },
      { text: "Only exterior signage loads", why: "Interior and exterior lighting schedules use space-based LPD." },
      { text: "Structural footing sizes", why: "Footing design is unrelated to lighting power density." },
    ],
    "Accurate LPD and control schedules affect both energy and peak demand results.",
    "easy"
  ),
  makeQ(
    "A common reason simulated cooling energy exceeds measured data after calibration is:",
    "Overstated internal gains, schedules, or supply air temperature assumptions not matching actual operation",
    [
      { text: "Weather file always underpredicts solar gain", why: "Weather files are standardized; operational assumptions often cause divergence." },
      { text: "Models cannot simulate cooling systems", why: "Simulation engines model HVAC explicitly." },
      { text: "Utility meters never record cooling energy", why: "Meters capture electricity and fuels used for cooling." },
    ],
    "Operational drift, control overrides, and input assumptions are frequent calibration discrepancy sources.",
    "hard"
  ),
  makeQ(
    "On-site photovoltaic generation in an annual energy model is typically accounted by:",
    "Reducing purchased electricity by simulated PV output using site weather and array characteristics",
    [
      { text: "Adding PV kWh to heating energy use", why: "PV offsets electrical consumption, not heating directly." },
      { text: "Ignoring PV because renewables are not modellable", why: "Major tools include PV production models." },
      { text: "Counting PV only in baseline, never in proposed", why: "Proposed models include on-site renewables per project scope." },
    ],
    "Net site energy and cost metrics reflect on-site generation offsetting grid purchases.",
    "medium"
  ),
  makeQ(
    "The BEMP exam passing score published by ASHRAE is approximately:",
    "69 correct out of 100 scored items (verify current FAQs before scheduling)",
    [
      { text: "50 correct out of 100 scored items", why: "ASHRAE BEMP pass point is higher than 50%." },
      { text: "100 correct with no pretest items", why: "Exams include unscored pretest items; pass is on scored items only." },
      { text: "83 correct out of 120 scored items", why: "83/120 is the BCxP threshold, not BEMP." },
    ],
    "Each ASHRAE credential has its own Angoff-derived pass point; verify at ashrae.org.",
    "easy",
    "b"
  ),
  makeQ(
    "Hourly schedules for plug loads in office models should reflect:",
    "Typical weekday/weekend occupancy and equipment use patterns for each space type",
    [
      { text: "Constant maximum load 24/7 all year", why: "Flat schedules overpredict off-hours consumption." },
      { text: "Zero plug load because computers use no power", why: "Plug loads are a major commercial building end use." },
      { text: "Only holiday schedules with no weekday variation", why: "Weekday operation patterns dominate annual energy." },
    ],
    "Schedule shape strongly affects both annual energy and peak demand predictions.",
    "medium"
  ),
  makeQ(
    "Envelope U-factor and solar heat gain coefficient inputs should come from:",
    "Fenestration and opaque assembly product data, NFRC ratings, or code default tables when as-designed data is unavailable",
    [
      { text: "Random values chosen to match utility bills after simulation", why: "Inputs should be evidence-based; post-hoc tuning without basis is poor practice." },
      { text: "Only carpet color specifications", why: "Carpet color does not define thermal transmittance." },
      { text: "Structural steel yield strength", why: "Structural properties differ from thermal envelope properties." },
    ],
    "Defensible envelope inputs come from specifications, testing, or recognized default libraries.",
    "medium"
  ),
  makeQ(
    "When modeling a VAV system with reheat, a critical input is:",
    "Minimum airflow setpoints and reheat coil operation at part load to capture simultaneous heating/cooling penalties",
    [
      { text: "Only supply fan horsepower with no zone controls", why: "Zone minimums and reheat drive significant reheat energy." },
      { text: "Chiller plant cooling tower color", why: "Cosmetic attributes do not affect energy simulation." },
      { text: "Excluding all zone-level controls from the model", why: "VAV behavior requires zone airflow and reheat logic." },
    ],
    "VAV reheat models must represent minimum ventilation and terminal reheat to avoid unrealistic savings.",
    "hard"
  ),
  makeQ(
    "Unmet load hours reported by simulation indicate:",
    "Hours when zone temperatures could not be maintained within the thermostat deadband under modeled capacity",
    [
      { text: "Hours when the utility company shut off power", why: "Unmet hours are a simulation comfort/capacity metric." },
      { text: "Total annual electricity consumption", why: "Unmet hours count comfort violations, not kWh." },
      { text: "Number of occupants in the building", why: "Occupancy is a separate schedule input." },
    ],
    "Excessive unmet hours signal undersized equipment or control issues in the model.",
    "medium"
  ),
  makeQ(
    "ASHRAE Guideline 14 is often referenced in BEMP practice for:",
    "Measurement of energy and demand savings and model calibration uncertainty reporting",
    [
      { text: "Kitchen exhaust hood grease filtration only", why: "Guideline 14 addresses M&V and calibration statistics." },
      { text: "Elevator inspection checklists", why: "Elevator codes are unrelated to Guideline 14." },
      { text: "Refrigerant purity testing procedures", why: "Refrigerant testing follows EPA and industry standards, not Guideline 14." },
    ],
    "Guideline 14 provides statistical criteria for calibrated models and savings measurements.",
    "hard"
  ),
  makeQ(
    "Selecting an appropriate baseline HVAC system type under Appendix G requires:",
    "Following prescriptive system type rules based on building type, climate zone, and fuel availability",
    [
      { text: "Copying the proposed system's brand name into baseline", why: "Baseline equipment types are prescribed, not copied from design." },
      { text: "Always using the highest efficiency chiller available commercially", why: "Baseline efficiencies are defined by standard tables, not best available." },
      { text: "Omitting HVAC systems from the baseline entirely", why: "Baseline models include fully defined HVAC systems." },
    ],
    "Appendix G system mapping tables standardize baseline assumptions by building and climate.",
    "hard"
  ),
  makeQ(
    "A quality control review of an energy model should verify:",
    "Geometry sanity, schedule plausibility, input units, version control, and alignment with design documents",
    [
      { text: "Only the color theme of simulation reports", why: "QC focuses on technical accuracy and traceability." },
      { text: "That no weather file was used", why: "Weather files are required for dynamic simulation." },
      { text: "Deletion of all internal gains to simplify results", why: "Removing internal gains would distort load predictions." },
    ],
    "Peer review catches unit errors, orientation mistakes, and schedule outliers before results are published.",
    "medium"
  ),
  makeQ(
    "Bin analysis of hourly simulation output helps modelers:",
    "Relate energy use to temperature bins to explain weather sensitivity and validate trends",
    [
      { text: "Design structural foundations for high-rise buildings", why: "Bin analysis is an energy post-processing technique." },
      { text: "Calculate refrigerant charge without measurements", why: "Refrigerant charge requires field protocols, not bin analysis." },
      { text: "Replace all HVAC sizing calculations", why: "Bin analysis supports interpretation; it does not replace sizing." },
    ],
    "Plotting kWh vs outdoor temperature reveals heating/cooling balance and calibration alignment.",
    "medium"
  ),
  makeQ(
    "When documenting model assumptions for a client report, BEMP best practice includes:",
    "A clear table of key inputs, data sources, software version, and known limitations",
    [
      { text: "Hiding all assumptions so results cannot be questioned", why: "Transparency is required for defensible consulting deliverables." },
      { text: "Reporting only a single annual kWh number with no context", why: "Clients need traceability to inputs and methods." },
      { text: "Deleting prior model versions from the project record", why: "Version history supports audit trails." },
    ],
    "Documented assumptions enable third-party review and future updates.",
    "easy"
  ),
  makeQ(
    "Modeling district energy or campus steam supply typically requires:",
    "Defining purchased utility rates, plant efficiency or allocation method, and boundary conditions for site vs source energy",
    [
      { text: "Assuming free infinite steam with no metering", why: "District systems have measured or allocated energy costs." },
      { text: "Ignoring all thermal losses in distribution", why: "Distribution losses affect site and source energy accounting." },
      { text: "Modeling only electrical loads with no thermal plants", why: "District steam/chilled water must be represented at boundaries." },
    ],
    "Site/source energy reporting depends on how purchased district energy is characterized.",
    "hard"
  ),
  makeQ(
    "Pretest items on the ASHRAE BEMP exam are:",
    "Unidentified questions that do not count toward the passing score",
    [
      { text: "Always the first 15 questions marked in the candidate guide", why: "Pretest items are not identified to candidates during the exam." },
      { text: "Optional bonus questions that raise the score above 100%", why: "Pretest items are unscored and not bonus points." },
      { text: "Only field-experience essays", why: "BEMP uses multiple-choice items, including unscored pretest questions." },
    ],
    "Most ASHRAE exams embed unscored pretest items throughout the form.",
    "easy",
    "c"
  ),
  makeQ(
    "Comparing multiple ECM scenarios in a single model file is best done by:",
    "Using parametric runs or separate cases with consistent weather, schedules, and calibration baseline",
    [
      { text: "Changing weather files between ECMs to maximize savings appearance", why: "ECM comparisons require consistent weather and base assumptions." },
      { text: "Adjusting occupancy to zero for all ECMs except the preferred one", why: "Inconsistent schedules invalidate comparisons." },
      { text: "Running each ECM in a different software without documenting differences", why: "Comparisons should be methodologically consistent and documented." },
    ],
    "Isolated ECM runs against a calibrated base case produce defensible savings estimates.",
    "medium"
  ),
  // 026-050
  makeQ(
    "EnergyPlus and OpenStudio workflows commonly exchange data through:",
    "IDF/OSM building descriptions, schedules, and simulation output CSV/SQL reports",
    [
      { text: "Handwritten field notes only with no digital files", why: "Modern workflows rely on structured input and output files." },
      { text: "Structural Revit families without thermal properties", why: "Thermal models need material and construction definitions." },
      { text: "Only PDF utility bills embedded as images", why: "Bills inform calibration; they are not simulation input geometry." },
    ],
    "BEMP candidates should understand file types and data flow in common simulation stacks.",
    "medium"
  ),
  makeQ(
    "When a model shows lower winter gas use than measured, a modeler should first check:",
    "Heating setpoints, boiler efficiency curves, and whether non-HVAC gas end uses are included in meter data",
    [
      { text: "Whether the weather file contains summer months only", why: "TMY/EPW files include full annual weather." },
      { text: "Only the number of simulation timesteps per hour", why: "Timestep affects accuracy but non-HVAC gas is a common mismatch cause." },
      { text: "Deleting all infiltration to force a match", why: "Arbitrary input deletion undermines model integrity." },
    ],
    "Meter normalization must separate HVAC from process loads before blaming the heating model.",
    "hard"
  ),
  makeQ(
    "Daylighting controls in models reduce lighting energy by:",
    "Dimming or switching electric lighting based on simulated daylight availability and control type",
    [
      { text: "Increasing LPD when sun is present", why: "Daylighting controls reduce electric lighting when daylight is ample." },
      { text: "Disabling all lighting schedules year-round", why: "Schedules still define occupied hours; daylighting adjusts power within them." },
      { text: "Removing all windows from the model", why: "Windows enable daylighting control savings." },
    ],
    "Photosensor or timed daylighting algorithms modulate lighting power during occupied hours.",
    "medium"
  ),
  makeQ(
    "Source energy factors in reporting convert site energy to:",
    "Primary fuel use accounting for generation, transmission, and distribution losses",
    [
      { text: "Only the building's water consumption in gallons", why: "Source energy addresses fuel upstream of the site meter." },
      { text: "Occupant satisfaction survey scores", why: "Source energy is a physical energy metric." },
      { text: "Structural beam weights in pounds", why: "Structural quantities are unrelated to source energy." },
    ],
    "LEED and ASHRAE publications use source factors to compare environmental impact across fuels.",
    "medium"
  ),
  makeQ(
    "A revolving door vs swing door selection affects models primarily through:",
    "Infiltration and air exchange assumptions at the building entrance",
    [
      { text: "Chiller refrigerant type selection", why: "Door type influences air leakage, not refrigerant chemistry." },
      { text: "Transformer impedance on the electrical service", why: "Electrical distribution is independent of door configuration." },
      { text: "Fire pump flow requirements exclusively", why: "Fire protection flows are governed by code hydraulics, not door type." },
    ],
    "Entrance air leakage can be material in high-traffic buildings during heating/cooling seasons.",
    "medium"
  ),
  makeQ(
    "Automated quality checks should flag if:",
    "Simulated peak demand occurs with all lights and equipment off while cooling is zero",
    [
      { text: "The model includes at least one thermal zone", why: "Having zones is expected, not an error by itself." },
      { text: "Weather data includes wind speed", why: "Wind is a normal weather variable." },
      { text: "An annual simulation has 8,760 hours", why: "8,760 hours is standard for annual runs." },
    ],
    "Nonsensical load combinations indicate schedule or equipment input errors.",
    "hard"
  ),
  makeQ(
    "For a proposed LEED v4 BD+C Optimize Energy Performance credit, the simulation must:",
    "Follow ASHRAE 90.1 Appendix G and LEED modeling rules including baseline cost methodology",
    [
      { text: "Use only prescriptive envelope tables with no simulation", why: "The credit path requires whole-building performance modeling." },
      { text: "Ignore all renewable generation on site", why: "LEED rules define how renewables are treated; they are not ignored by default." },
      { text: "Compare only water use intensity between buildings", why: "The credit is about energy performance improvement." },
    ],
    "LEED EA credits reference Appendix G modeling protocols and supplemental LEED guidance.",
    "hard"
  ),
  makeQ(
    "Thermal mass effects in lightweight vs heavyweight construction influence:",
    "Peak load timing and diurnal load shifting due to heat storage in opaque assemblies",
    [
      { text: "Only plumbing fixture flow rates", why: "Thermal mass affects HVAC load profiles." },
      { text: "Elevator motor horsepower exclusively", why: "Elevator loads are separate from envelope mass effects." },
      { text: "Refrigerant global warming potential only", why: "GWP is a refrigerant property, not a mass effect." },
    ],
    "High-mass walls delay and attenuate conduction peaks compared with lightweight framing.",
    "medium"
  ),
  makeQ(
    "When merging as-built changes late in design, the modeler should:",
    "Update geometry, schedules, and efficiencies with version notes and re-run calibration checks",
    [
      { text: "Leave outdated inputs to preserve prior savings claims without documentation", why: "As-built changes require model updates and transparent revision logs." },
      { text: "Delete the baseline case to avoid rework", why: "Baseline and proposed cases both need consistency after changes." },
      { text: "Switch to a different climate zone arbitrarily", why: "Climate zone is fixed by project location." },
    ],
    "Change control prevents silent drift between reported and actual design conditions.",
    "easy"
  ),
  makeQ(
    "Cogeneration or CHP modeled on site should account for:",
    "Fuel input, electric output, recovered heat utilization, and parallel vs series configuration",
    [
      { text: "Only nameplate electric kW with no heat recovery path", why: "CHP efficiency depends on useful heat recovery." },
      { text: "Infinite free natural gas regardless of runtime", why: "Fuel consumption must be simulated based on load dispatch." },
      { text: "Treating CHP as grid purchases only", why: "On-site generation offsets purchased electricity and fuel." },
    ],
    "CHP dispatch logic determines whether savings accrue to heating, electricity, or both.",
    "hard"
  ),
  makeQ(
    "An ideal air system assumption in early schematic models:",
    "Simplifies HVAC distribution but may misrepresent fan energy and zone humidity control",
    [
      { text: "Perfectly matches all VRF refrigerant circuits", why: "Ideal air systems do not model refrigerant distribution detail." },
      { text: "Eliminates the need for any ventilation airflow", why: "Ventilation must still be specified under ideal air assumptions." },
      { text: "Guarantees zero simultaneous heating and cooling", why: "Ideal air can still show reheat penalties if minimums are modeled." },
    ],
    "Modelers trade early simplicity for later detailed system representation as design advances.",
    "medium"
  ),
  makeQ(
    "Reporting peak coincident demand for utility cost requires:",
    "Aligning simulated demand intervals with tariff demand ratchet and billing window rules",
    [
      { text: "Using annual average kW as the peak for all months", why: "Tariffs bill based on interval peak demand, not annual averages." },
      { text: "Ignoring demand charges entirely in cost reports", why: "Demand charges often drive ECM payback for large buildings." },
      { text: "Multiplying total kWh by occupancy count", why: "Demand is a power peak metric, not kWh per person." },
    ],
    "Cost models must mirror utility rate structures including demand ratchets and TOU energy charges.",
    "hard"
  ),
  makeQ(
    "Natural ventilation modeling requires defining:",
    "Opening schedules, wind pressure coefficients, and cross-ventilation or stack effect pathways",
    [
      { text: "Only mechanical cooling capacity with sealed windows", why: "Natural ventilation needs operable opening logic." },
      { text: "Refrigerant charge in pounds per ton only", why: "Refrigerant charge applies to mechanical cooling systems." },
      { text: "Structural weld inspection intervals", why: "Structural inspection is unrelated to ventilation modeling." },
    ],
    "Hybrid ventilation models couple airflow networks or simplified opening rules with HVAC operation.",
    "hard"
  ),
  makeQ(
    "A BEMP professional interpreting ECM savings should disclose:",
    "Interactive effects, measurement uncertainty, and operational assumptions affecting persistence",
    [
      { text: "Only the largest single ECM number without context", why: "Stacked ECMs may interact; uncertainty affects investment decisions." },
      { text: "Guaranteed savings with no O&M requirements", why: "Persistence depends on continued proper operation." },
      { text: "That calibration eliminates all future weather risk", why: "Future weather and occupancy differ from the simulation year." },
    ],
    "Professional practice includes transparent limits of modeled savings projections.",
    "medium"
  ),
  makeQ(
    "Heat pump modeling in cold climates must address:",
    "Auxiliary heat staging, defrost cycles, and capacity degradation at low outdoor temperatures",
    [
      { text: "Only constant COP of 10 at all temperatures", why: "COP varies with outdoor temperature and defrost." },
      { text: "Excluding backup heat because heat pumps never need it", why: "Many commercial heat pumps use supplemental heat in cold weather." },
      { text: "Modeling heat pumps as electric resistance only", why: "That would ignore heat pump performance curves." },
    ],
    "Accurate cold-climate heat pump inputs prevent overstated heating savings.",
    "hard"
  ),
  makeQ(
    "The purpose of ASHRAE Standard 140 (best practices for software evaluation) is to:",
    "Provide comparative test cases so simulation engines can be validated against analytical solutions",
    [
      { text: "Set minimum passing scores for BEMP candidates", why: "Pass scores are set in certification FAQs, not Standard 140." },
      { text: "Define kitchen exhaust hood capture velocity only", why: "Standard 140 is about software test suites." },
      { text: "Replace all building energy codes nationally", why: "Standard 140 supports software quality, not code adoption." },
    ],
    "Standard 140 test suites help ensure simulation tools produce consistent results.",
    "hard"
  ),
  makeQ(
    "When utility data includes steam in MMBtu and electricity in kWh, normalization requires:",
    "Converting all fuels to common units and separating base load from weather-dependent loads",
    [
      { text: "Adding steam and kWh numerically without conversion", why: "Different units cannot be summed without conversion." },
      { text: "Discarding steam data if the model has no steam system", why: "Non-HVAC steam loads may still appear in meters and need allocation." },
      { text: "Using only the highest single hour of the year", why: "Normalization uses regression or degree-day methods on longer periods." },
    ],
    "Common units and regression help align model outputs with billed consumption patterns.",
    "medium"
  ),
  makeQ(
    "Assigning economizer high-limit shutoff in the model should follow:",
    "Climate-appropriate outdoor air dry-bulb or enthalpy limits per code and design intent",
    [
      { text: "Always disabling economizers in all climates", why: "Economizers are required or beneficial in many climates." },
      { text: "Setting economizer operation to zero outdoor air", why: "Economizers increase outdoor air for free cooling when conditions allow." },
      { text: "Using heating setpoint as the economizer maximum", why: "Economizer limits are based on outdoor conditions, not zone heating setpoints." },
    ],
    "Correct economizer control limits affect cooling energy and ventilation hours.",
    "medium"
  ),
  makeQ(
    "A modeling peer reviewer finds orientations rotated 90°. The impact is:",
    "Solar gains and possibly economizer effectiveness are wrong, invalidating load and energy results",
    [
      { text: "No impact because orientation does not affect loads", why: "Orientation strongly affects solar gains and shading." },
      { text: "Only a cosmetic reporting issue", why: "Orientation errors are technical failures, not cosmetic." },
      { text: "Corrected automatically by the weather file alone", why: "Weather file does not fix building geometry orientation errors." },
    ],
    "Geometry QA must confirm building north rotation against architectural drawings.",
    "easy"
  ),
  makeQ(
    "For multistory buildings with identical stacked floors, modelers often:",
    "Use multipliers on representative floors to reduce geometry duplication while preserving total loads",
    [
      { text: "Model only the ground floor and assume zero loads above", why: "Upper floors contribute significant loads." },
      { text: "Delete all interior walls to speed solving", why: "Interior walls may affect zoning and solar distribution." },
      { text: "Apply a single occupant for the entire tower", why: "Occupancy scales with floor area and use type." },
    ],
    "Multipliers are acceptable when representative floors truly match stacked conditions.",
    "medium"
  ),
  makeQ(
    "BEMP exam content at the analysis level may require candidates to:",
    "Interpret simulation output to recommend design or operational changes based on load disaggregation",
    [
      { text: "Memorize only refrigerant GWP values without application", why: "ASHRAE exams test application and analysis, not isolated memorization." },
      { text: "Recite ASHRAE staff names", why: "Exams focus on technical competency." },
      { text: "Perform structural finite element analysis by hand", why: "Structural FEA is outside BEMP scope." },
    ],
    "ASHRAE certifications test recall, application, and analysis per ISO/IEC 17024 programs.",
    "easy",
    "d"
  ),
  makeQ(
    "Warehouse modeling differs from office modeling primarily in:",
    "High bay volume, infiltration, minimal conditioning, and lighting/ventilation for storage vs occupancy patterns",
    [
      { text: "Identical schedules and LPD as dense office space", why: "Warehouses have distinct use profiles and conditioning strategies." },
      { text: "No need to define any envelope properties", why: "All building types need envelope inputs." },
      { text: "Mandatory district steam for all warehouses", why: "HVAC systems vary; steam is not universal." },
    ],
    "Use-type drives ventilation codes, conditioning setpoints, and internal gains.",
    "medium"
  ),
  makeQ(
    "When exporting results for a code official, the modeler should provide:",
    "Compliance forms, input summary, and evidence that Appendix G rules were followed",
    [
      { text: "Only a verbal summary without files", why: "Code compliance requires documented submittals." },
      { text: "Unrelated structural calculations", why: "Energy compliance submittals are separate from structural calcs." },
      { text: "A blank simulation template", why: "Officials need completed compliance documentation." },
    ],
    "Jurisdictions require traceable compliance reports tied to recognized modeling standards.",
    "easy"
  ),
  makeQ(
    "Long-term persistence of modeled savings after retrofit depends most on:",
    "Ongoing commissioning, operator training, and alarm response maintaining control sequences",
    [
      { text: "Deleting trend logs to reduce server storage", why: "Trend data supports ongoing verification." },
      { text: "Disabling all economizers after one year", why: "Disabling efficiency features erodes savings." },
      { text: "Removing O&M manuals from the building", why: "O&M documentation supports sustained performance." },
    ],
    "Operational drift is a leading cause of savings degradation after ECM implementation.",
    "medium"
  ),
  makeQ(
    "In uncertainty reporting, CV(RMSE) and NMBE from Guideline 14 apply to:",
    "Hourly or monthly comparisons between modeled and measured energy use",
    [
      { text: "Only architectural door hardware schedules", why: "CV(RMSE) and NMBE are statistical calibration metrics." },
      { text: "Refrigerant cylinder color coding", why: "Refrigerant identification is unrelated to calibration statistics." },
      { text: "Occupant parking assignments", why: "Parking assignments do not define calibration error metrics." },
    ],
    "NMBE measures bias; CV(RMSE) measures scatter between model and utility data.",
    "hard"
  ),
];
