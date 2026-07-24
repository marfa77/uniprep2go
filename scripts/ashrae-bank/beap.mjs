import { makeQ } from "./makeQ.mjs";

export const beap = [
  makeQ(
    "BEAP (Building Energy Assessment Professional) certification emphasizes:",
    "On-site assessment of existing building energy performance and improvement recommendations",
    [
      { text: "Only new-construction energy modeling without field visits", why: "BEAP focuses on assessing existing buildings in the field." },
      { text: "Structural peer review of high-rise foundations", why: "Structural engineering is outside BEAP scope." },
      { text: "BACnet controller programming certification exclusively", why: "Controls knowledge supports assessment but is not the sole focus." },
    ],
    "BEAP validates skills in evaluating how buildings use energy and identifying practical improvements.",
    "easy"
  ),
  makeQ(
    "ASHRAE Level I energy audit (walk-through) typically includes:",
    "Preliminary energy-use analysis, walk-through survey, and low-cost/no-cost recommendations",
    [
      { text: "Submetering every end use with year-long M&V contracts only", why: "Detailed submetering is characteristic of Level III." },
      { text: "No review of utility bills or operating practices", why: "Utility analysis is fundamental even at Level I." },
      { text: "Complete HVAC redesign construction documents", why: "Level I is screening-level, not design-ready." },
    ],
    "Level I identifies obvious opportunities without the capital cost detail of higher audit levels.",
    "easy"
  ),
  makeQ(
    "A Level II energy audit adds to Level I by providing:",
    "Energy survey and analysis with sufficient detail to justify implementation of identified ECMs",
    [
      { text: "Only a one-page letter with no equipment inventory", why: "Level II requires more detailed survey and analysis." },
      { text: "Guaranteed contractor pricing for all trades nationally", why: "Level II supports budgeting; it does not replace bid procurement." },
      { text: "Elimination of any financial analysis", why: "Level II includes economic screening of measures." },
    ],
    "Level II bridges screening and investment-grade analysis with measure-level savings estimates.",
    "medium"
  ),
  makeQ(
    "Level III investment-grade audits are justified when:",
    "Large capital decisions require high-confidence savings, risk allocation, and detailed M&V planning",
    [
      { text: "A tenant requests a single LED lamp replacement", why: "Small measures rarely need investment-grade analysis." },
      { text: "No utility data exists and none can be obtained", why: "Audits require energy consumption data." },
      { text: "The owner wants only a roof warranty review", why: "Roof warranties alone do not define Level III scope." },
    ],
    "Financing, ESPCs, and major retrofits often require Level III rigor.",
    "medium"
  ),
  makeQ(
    "Energy Use Intensity (EUI) is calculated as:",
    "Annual site energy consumption divided by gross floor area",
    [
      { text: "Peak demand divided by occupant count only", why: "EUI normalizes total energy by area, not peak per person." },
      { text: "Water use in gallons divided by cooling tons", why: "EUI addresses site energy, not water metrics." },
      { text: "Source energy multiplied by floor area", why: "EUI divides energy by area; it does not multiply." },
    ],
    "EUI enables benchmarking across buildings of different sizes.",
    "easy"
  ),
  makeQ(
    "Portfolio benchmarking with ENERGY STAR scores compares a building to:",
    "National survey data (e.g., CBECS) for similar building type and climate",
    [
      { text: "Only the architect's design intent document", why: "Scores use operational data vs national peer groups." },
      { text: "Structural steel tonnage in comparable towers", why: "Structural weight is unrelated to ENERGY STAR scoring." },
      { text: "Refrigerant GWP values exclusively", why: "ENERGY STAR scoring is based on energy performance metrics." },
    ],
    "Normalized scores reflect percentile performance vs peers, not absolute kWh alone.",
    "medium"
  ),
  makeQ(
    "During a walk-through assessment, a BEAP should document:",
    "Equipment nameplates, control settings, maintenance condition, and obvious operational anomalies",
    [
      { text: "Only lobby paint colors for branding review", why: "Decor finishes do not substitute for equipment documentation." },
      { text: "Personal opinions without photos or notes", why: "Defensible assessments require recorded observations." },
      { text: "Nothing, relying solely on owner memory", why: "Field documentation supports recommendations and M&V." },
    ],
    "Thorough notes and photos create an audit trail for measure development.",
    "easy"
  ),
  makeQ(
    "Utility bill analysis often begins by:",
    "Normalizing consumption for weather, occupancy, and rate changes before trend comparison",
    [
      { text: "Ignoring all demand charges in every tariff", why: "Demand charges can be a major cost driver." },
      { text: "Comparing raw kWh only with no time period alignment", why: "Normalization reveals true performance changes." },
      { text: "Using only the most recent week of data always", why: "Annual or multi-year trends require longer periods." },
    ],
    "Degree-day normalization and regression separate weather effects from operational changes.",
    "medium"
  ),
  makeQ(
    "A common BEAP finding in constant-volume HVAC systems is:",
    "Simultaneous heating and cooling or reheat at part load causing excess energy use",
    [
      { text: "Zero ventilation because outdoor air is disabled by code", why: "Codes require minimum ventilation; misuse causes energy waste differently." },
      { text: "Perfect efficiency with no improvement potential", why: "Constant-volume systems often have significant retrofit opportunities." },
      { text: "No relationship between airflow and thermostat calls", why: "Poor zone control is a common assessment finding." },
    ],
    "Older CV/reheat and poor scheduling are frequent existing-building issues.",
    "medium"
  ),
  makeQ(
    "The BEAP exam passing score published by ASHRAE is approximately:",
    "68 correct out of 100 scored items (verify current FAQs before scheduling)",
    [
      { text: "69 correct out of 100 scored items", why: "69/100 is the BEMP pass point, not BEAP." },
      { text: "83 correct out of 120 scored items", why: "83/120 applies to BCxP." },
      { text: "45 correct out of 60 scored items", why: "BEAP uses a 100-scored-item form, not 60." },
    ],
    "Each ASHRAE credential has a distinct Angoff-derived pass point.",
    "easy",
    "b"
  ),
  makeQ(
    "When prioritizing ECMs, a BEAP typically considers:",
    "Savings potential, implementation cost, disruption, and owner constraints",
    [
      { text: "Only measures with the longest payback regardless of owner goals", why: "Prioritization balances economics with owner objectives." },
      { text: "Alphabetical order of equipment names", why: "Technical and economic merit drive prioritization." },
      { text: "Measures that require no O&M follow-up ever", why: "All measures need some operational consideration." },
    ],
    "Screening matrices rank measures by cost, savings, and feasibility.",
    "medium"
  ),
  makeQ(
    "Lighting assessment in an existing building should capture:",
    "Fixture types, lamp/ballast technology, controls, hours of operation, and maintained illuminance needs",
    [
      { text: "Only exterior landscaping irrigation schedules", why: "Irrigation is unrelated to lighting assessment." },
      { text: "Wattage guesses without fixture counts", why: "Inventory and connected load data support savings calculations." },
      { text: "Ceiling tile brand exclusively", why: "Ceiling products do not define lighting power or control strategy." },
    ],
    "Accurate lighting inventories underpin LED retrofit and control ECMs.",
    "medium"
  ),
  makeQ(
    "Envelope assessment for energy performance includes checking for:",
    "Air leakage paths, insulation continuity, window condition, and shading effectiveness",
    [
      { text: "Only interior furniture layout", why: "Furniture may affect loads but envelope assessment focuses on the shell." },
      { text: "Elevator counterweight alloy grade", why: "Elevator materials are unrelated to envelope thermal performance." },
      { text: "Kitchen menu planning", why: "Food service menus are not envelope assessment items." },
    ],
    "Infiltration, conduction, and solar gain drive heating and cooling loads.",
    "medium"
  ),
  makeQ(
    "Boiler plant assessment should verify:",
    "Combustion efficiency, staging, setpoints, distribution losses, and maintenance history",
    [
      { text: "Only the paint color of the boiler room door", why: "Cosmetic items do not indicate combustion performance." },
      { text: "That boilers never require combustion air", why: "Boilers require proper combustion air per code and manufacturer data." },
      { text: "Absence of any safety controls", why: "Safety controls are mandatory and affect reliable operation." },
    ],
    "Plant efficiency testing and turndown capability reveal major gas savings opportunities.",
    "medium"
  ),
  makeQ(
    "Compressed air leaks identified during assessment:",
    "Increase motor-driven load and should be quantified as a potential quick-payback ECM",
    [
      { text: "Have no effect on electricity because air is free", why: "Compressors consume significant electricity to maintain pressure." },
      { text: "Only matter in residential kitchens", why: "Compressed air systems are common in commercial/industrial facilities." },
      { text: "Cannot be detected without demolition", why: "Leaks are often found audibly and with simple detection tools." },
    ],
    "Leak repair and pressure optimization are classic low-cost industrial ECMs.",
    "easy"
  ),
  makeQ(
    "A BEAP reviewing BAS trend data should look for:",
    "Equipment short-cycling, valves stuck open, economizers disabled, and setpoint overrides",
    [
      { text: "Only the wallpaper pattern in the control room", why: "Trend review is a technical operations diagnostic." },
      { text: "Guaranteed absence of any alarms", why: "Alarms and overrides often reveal waste." },
      { text: "Structural column sizes in drawings", why: "Structural design is separate from BAS trend analysis." },
    ],
    "Operational anomalies visible in trends frequently explain poor EUI vs peers.",
    "hard"
  ),
  makeQ(
    "Domestic hot water assessment includes:",
    "Storage temperatures, recirculation control, insulation, and peak demand characteristics",
    [
      { text: "Only cold water fountain aesthetics", why: "DHW systems require temperature and distribution review." },
      { text: "Refrigerant charge in rooftop units only", why: "RTU refrigerant is unrelated to DHW assessment." },
      { text: "Parking lot striping layout", why: "Site striping does not define DHW energy use." },
    ],
    "Oversized storage, high setpoints, and uncontrolled recirculation waste energy.",
    "medium"
  ),
  makeQ(
    "When gas and electric meters serve mixed loads, a BEAP should:",
    "Allocate consumption to HVAC, DHW, and process uses using submeters, engineering estimates, or short-term monitoring",
    [
      { text: "Assume 100% of all fuels are HVAC without analysis", why: "Mixed-use meters require allocation for accurate ECM savings." },
      { text: "Discard gas data if any electric load exists", why: "Both fuels may be relevant to the assessment." },
      { text: "Ignore process loads in industrial facilities", why: "Process loads often dominate and must be separated for HVAC ECMs." },
    ],
    "Allocation prevents overstating HVAC retrofit savings.",
    "hard"
  ),
  makeQ(
    "A screening-level simple payback calculation divides:",
    "Implementation cost by annual energy cost savings",
    [
      { text: "Annual savings by implementation cost incorrectly for payback years", why: "Payback years equal cost divided by annual savings." },
      { text: "Peak kW by floor area", why: "That ratio is not simple payback." },
      { text: "Occupant count by ventilation rate", why: "Ventilation metrics do not define financial payback." },
    ],
    "Simple payback is a common Level II economic screening tool.",
    "easy"
  ),
  makeQ(
    "ASHRAE audit procedures reference collecting:",
    "Architectural, mechanical, electrical, and control drawings plus O&M manuals when available",
    [
      { text: "Only social media posts about the building", why: "Technical documents, not social media, support audits." },
      { text: "No historical data to speed the site visit", why: "Background data improves assessment quality." },
      { text: "Only future tenant lease marketing brochures", why: "Marketing materials rarely contain operating data." },
    ],
    "Document review precedes and supports field verification.",
    "easy"
  ),
  makeQ(
    "Night setback or setup strategies assessed on site should be checked against:",
    "Actual BAS schedules and after-hours occupancy needs",
    [
      { text: "Only peak summer cooling tons from the original design", why: "Schedules are operational parameters distinct from design capacity." },
      { text: "The building's street address numerology", why: "Address has no bearing on HVAC scheduling." },
      { text: "Mandatory 24/7 full conditioning in all buildings", why: "Many buildings can safely setback during unoccupied hours." },
    ],
    "Schedule optimization is a low-cost ECM when operations allow.",
    "medium"
  ),
  makeQ(
    "Steam trap failure identified during assessment typically causes:",
    "Live steam loss, excess boiler load, and higher water treatment costs",
    [
      { text: "Improved heating efficiency with no fuel impact", why: "Failed traps waste steam and fuel." },
      { text: "Reduced need for any boiler maintenance", why: "Trap failures increase system stress and maintenance needs." },
      { text: "Lower water consumption always", why: "Lost steam increases makeup water demand." },
    ],
    "Trap surveys are a standard industrial and campus steam ECM.",
    "medium"
  ),
  makeQ(
    "Cooling tower assessment should note:",
    "Approach temperature, fan control, drift eliminators, and basin heating/bleed operation",
    [
      { text: "Only the color of the tower fill without performance data", why: "Operating conditions determine chiller plant efficiency." },
      { text: "That towers never affect chiller kW", why: "Tower performance directly affects condenser water temperature and chiller efficiency." },
      { text: "Structural footing depth exclusively", why: "Footings do not define tower thermal performance." },
    ],
    "Poor tower maintenance raises condenser temperatures and chiller energy.",
    "medium"
  ),
  makeQ(
    "A BEAP recommendation report should clearly separate:",
    "Operational changes, capital ECMs, and further study needs with estimated savings ranges",
    [
      { text: "All items into one paragraph with no costs", why: "Clients need categorized measures with economic context." },
      { text: "Only measures the assessor personally prefers aesthetically", why: "Recommendations must be evidence-based and economic." },
      { text: "Confidential findings with no supporting data", why: "Reports should be transparent and actionable." },
    ],
    "Structured reports help owners fund and implement improvements.",
    "easy"
  ),
  makeQ(
    "Infrared thermography during assessment can help identify:",
    "Missing insulation, air leakage, and overloaded electrical connections indicative of waste or safety issues",
    [
      { text: "Only interior paint sheen preferences", why: "Thermography reveals thermal anomalies, not finish schedules." },
      { text: "Guaranteed annual utility rates", why: "Tariffs come from utilities, not IR cameras." },
      { text: "Occupant job titles", why: "Thermography is a physical diagnostic tool." },
    ],
    "IR surveys support envelope and electrical distribution assessments.",
    "medium"
  ),
  // 26-50
  makeQ(
    "Fan static pressure measurements above design in existing VAV systems may indicate:",
    "Dirty filters, closed dampers, undersized ducts, or stuck VAV boxes",
    [
      { text: "Perfect duct balance with no remediation needed", why: "High static usually signals restriction or control problems." },
      { text: "Excess free cooling from economizers", why: "Economizer operation does not directly raise duct static." },
      { text: "Reduced fan energy consumption", why: "Higher static typically increases fan power." },
    ],
    "Excess static drives fan kW and may reduce airflow to zones.",
    "hard"
  ),
  makeQ(
    "Kitchen exhaust and makeup air systems assessed for energy should evaluate:",
    "Hood operating schedules, makeup air conditioning, and interlocks with cooking loads",
    [
      { text: "Only table setting arrangements", why: "Hood/makeup air interlocks affect HVAC loads materially." },
      { text: "Structural steel camber in the dining room", why: "Structural camber is unrelated to exhaust energy." },
      { text: "That makeup air is never conditioned", why: "Untreated makeup air can impose large heating/cooling penalties." },
    ],
    "Commercial kitchens often have high ventilation-related energy intensity.",
    "medium"
  ),
  makeQ(
    "A building with rising EUI year-over-year after occupancy growth should:",
    "Normalize metrics per occupant or hour of operation before concluding efficiency degradation",
    [
      { text: "Automatically blame envelope insulation without data", why: "Occupancy and hours affect total consumption." },
      { text: "Ignore occupancy because only area matters always", why: "Some building types scale energy with occupants and runtime." },
      { text: "Delete prior years of utility data", why: "Historical trends are essential for diagnosis." },
    ],
    "Normalization prevents misattributing higher use to worse efficiency.",
    "medium"
  ),
  makeQ(
    "Demand-controlled ventilation assessment verifies:",
    "CO₂ or occupancy sensors modulate outdoor air to meet code minimums without over-ventilating",
    [
      { text: "Outdoor air is fixed at maximum design forever", why: "DCV reduces ventilation when loads are low." },
      { text: "Sensors are disabled to save sensor cost only", why: "Disabled DCV wastes heating/cooling on excess OA." },
      { text: "Ventilation is unrelated to HVAC energy", why: "Conditioning outdoor air is a major load component." },
    ],
    "Proper DCV saves fan and conditioning energy while maintaining IAQ.",
    "medium"
  ),
  makeQ(
    "Chiller sequencing assessment should confirm:",
    "Most efficient chiller leads near design load and lag chillers stage off at part load",
    [
      { text: "All chillers run at minimum load simultaneously always", why: "Poor sequencing wastes energy at part load." },
      { text: "Chiller efficiency is independent of load percentage", why: "kW/ton varies with loading and condenser conditions." },
      { text: "Tower fans never interact with chiller performance", why: "Condenser water temperature affects chiller efficiency." },
    ],
    "Optimal staging minimizes kW/ton across operating range.",
    "hard"
  ),
  makeQ(
    "Tenant plug load growth in multitenant buildings affects BEAP analysis by:",
    "Increasing base electric load independent of central HVAC retrofits",
    [
      { text: "Having no measurable effect on utility bills", why: "Plug loads are a major and growing end use." },
      { text: "Eliminating the need for any metering", why: "Tenant loads complicate allocation and benchmarking." },
      { text: "Replacing all envelope losses", why: "Plug loads add to, not replace, HVAC and envelope loads." },
    ],
    "Assessments must account for tenant vs landlord meter boundaries.",
    "medium"
  ),
  makeQ(
    "A BEAP evaluating roof insulation upgrade ECMs needs:",
    "Existing R-value, roof area, heating/cooling degree impacts, and moisture/code constraints",
    [
      { text: "Only the roofing membrane color name", why: "Thermal resistance and area drive savings." },
      { text: "No climate data because roofs are universal", why: "Climate and fuel mix determine insulation value." },
      { text: "Guaranteed exclusion of any condensation analysis", why: "Moisture risk must be considered in envelope upgrades." },
    ],
    "Roof insulation ECMs depend on pre-retrofit shell performance and climate.",
    "medium"
  ),
  makeQ(
    "Short-term data logging during assessment can:",
    "Capture actual runtime, cycling, and load profiles to validate owner-stated schedules",
    [
      { text: "Replace all safety codes for electrical work", why: "Logging supplements but does not replace code compliance." },
      { text: "Eliminate the need for any utility bill review", why: "Bill analysis and logging are complementary." },
      { text: "Only measure decorative lighting in lobbies", why: "Loggers are applied to major energy-consuming systems." },
    ],
    "Portable loggers bridge gaps when permanent metering is unavailable.",
    "medium"
  ),
  makeQ(
    "Water-side economizer (strainer cycle) assessment should verify:",
    "Controls enable free cooling when outdoor wet-bulb allows and prevent uncontrolled tower water migration",
    [
      { text: "Tower water always mixes into chilled water without controls", why: "Uncontrolled mixing can cause health and efficiency problems." },
      { text: "Water-side economizers work identically in all climates", why: "Wet-bulb conditions determine hours of effectiveness." },
      { text: "Chillers must run at full load whenever towers operate", why: "Economizers reduce chiller loading when conditions permit." },
    ],
    "Proper strainer-cycle control saves chiller energy in suitable climates.",
    "hard"
  ),
  makeQ(
    "When interviewing facility staff, a BEAP should ask about:",
    "Comfort complaints, override practices, maintenance budgets, and known equipment problems",
    [
      { text: "Only personal hobbies unrelated to building operation", why: "Interviews target operational knowledge." },
      { text: "Guaranteed absence of any comfort issues", why: "Complaints reveal control and balancing problems." },
      { text: "Historical stock market performance", why: "Financial markets are unrelated to facility interviews." },
    ],
    "Operator knowledge explains discrepancies between design intent and actual performance.",
    "easy"
  ),
  makeQ(
    "Motor inventory assessment identifies candidates for:",
    "Premium efficiency replacements and variable-speed drives on variable-load applications",
    [
      { text: "Immediate replacement of all motors regardless of load or hours", why: "Economics depend on runtime and load factor." },
      { text: "Removal of all motors to eliminate electricity use", why: "Motors perform necessary work; upgrades target efficiency." },
      { text: "Painting motors only without efficiency review", why: "Nameplate efficiency and application drive ECM value." },
    ],
    "Motors with high annual run hours and variable torque loads are prime VFD candidates.",
    "medium"
  ),
  makeQ(
    "A BEAP analyzing a hospital should recognize:",
    "24/7 operation, high ventilation rates, and critical environmental requirements limit some setback ECMs",
    [
      { text: "Identical operating constraints as unoccupied warehouses", why: "Healthcare has stringent IAQ and reliability requirements." },
      { text: "No ventilation-related loads", why: "Healthcare ventilation energy is substantial." },
      { text: "Mandatory absence of any redundancy", why: "Critical facilities require redundancy; assessments respect constraints." },
    ],
    "Sector-specific operations shape feasible ECM portfolios.",
    "hard"
  ),
  makeQ(
    "Renewable or cogeneration systems on site during assessment require:",
    "Review of production, maintenance, and how generated energy offsets purchased utilities",
    [
      { text: "Ignoring on-site generation in all utility analysis", why: "On-site systems affect net consumption and benchmarking." },
      { text: "Assuming infinite output without meter verification", why: "Production data should be metered or utility-reconciled." },
      { text: "Treating PV as a water conservation measure", why: "PV offsets electricity, not water use." },
    ],
    "Net site energy metrics must account for self-generation accurately.",
    "medium"
  ),
  makeQ(
    "Life-cycle cost analysis differs from simple payback by:",
    "Including time value of money, equipment life, maintenance, and salvage over the analysis period",
    [
      { text: "Using only first cost with no savings", why: "LCC incorporates costs and savings over time." },
      { text: "Excluding maintenance forever", why: "Maintenance and replacement are LCC components." },
      { text: "Ignoring analysis period length", why: "LCC requires a defined study period." },
    ],
    "LCC supports owner decisions on longer-lived capital ECMs.",
    "hard"
  ),
  makeQ(
    "An assessment finding open outdoor air dampers in winter suggests:",
    "Economizer or damper actuator failure causing massive heating load",
    [
      { text: "Optimal free cooling operation in all climates", why: "Open OA dampers in winter waste heating energy." },
      { text: "Improved IAQ with no energy penalty always", why: "Excess OA in extreme weather imposes large conditioning costs." },
      { text: "Normal VAV minimum flow only", why: "Stuck open dampers are faults, not minimum ventilation." },
    ],
    "Stuck dampers are common retrocommissioning fixes with fast payback.",
    "easy"
  ),
  makeQ(
    "BEAP professionals should verify compliance with minimum ventilation by referencing:",
    "ASHRAE Standard 62.1 or applicable local code for outdoor air requirements",
    [
      { text: "Only the building's year of construction with no standard", why: "Ventilation requirements come from recognized standards/codes." },
      { text: "Structural ACI 318 concrete provisions exclusively", why: "Structural concrete codes do not set ventilation rates." },
      { text: "Eliminating outdoor air in all retrofits", why: "IAQ codes set minimum outdoor air requirements." },
    ],
    "Assessments balance energy savings with maintaining compliant ventilation.",
    "medium"
  ),
  makeQ(
    "Data center loads assessed within a larger building need:",
    "Separate IT and cooling energy accounting because PUE and redundancy differ from office loads",
    [
      { text: "Treating IT racks as equivalent to one occupant", why: "IT loads are orders of magnitude higher per area than people." },
      { text: "Ignoring CRAC/CRAH systems entirely", why: "Data center HVAC is specialized and energy-intensive." },
      { text: "Assuming no continuous operation", why: "Many data centers operate 24/7." },
    ],
    "Mixed-use assessments isolate data center energy for accurate ECM targeting.",
    "hard"
  ),
  makeQ(
    "A calibrated simulation used in Level II analysis should be:",
    "Disclosed with assumptions and used to test ECMs, not hidden from the report",
    [
      { text: "Secret so savings cannot be questioned", why: "Transparency supports owner and financier confidence." },
      { text: "Run without any comparison to utility data", why: "Calibration to measured data strengthens savings claims." },
      { text: "Discarded after the walk-through only", why: "Simulation supports measure-level savings estimates in Level II." },
    ],
    "Model-based ECM analysis is common in detailed audits when budgets allow.",
    "medium"
  ),
  makeQ(
    "Fuel switching ECMs (e.g., electrification) require BEAP analysis of:",
    "Marginal energy costs, peak demand impacts, equipment capacity, and carbon policy drivers",
    [
      { text: "Only logo design on utility bills", why: "Fuel switching needs detailed economic and load analysis." },
      { text: "Ignoring capacity of existing electrical service", why: "Electrification may require service upgrades." },
      { text: "Assuming identical COP in all climates without data", why: "Heat pump performance varies with climate and load." },
    ],
    "Site vs source and demand charges affect electrification economics.",
    "hard"
  ),
  makeQ(
    "A BEAP should document measurement boundaries when recommending M&V by:",
    "Stating which meters, systems, and adjustment variables define the savings claim",
    [
      { text: "Promising savings with no baseline period", why: "M&V requires defined baseline and reporting periods." },
      { text: "Avoiding any discussion of interactive effects", why: "Interactive ECM effects should be acknowledged." },
      { text: "Using only anecdotal evidence", why: "Defensible M&V needs measurable boundaries." },
    ],
    "Clear boundaries align with IPMVP and owner financing expectations.",
    "medium"
  ),
  makeQ(
    "Warehouse loading dock infiltration during assessment is significant because:",
    "Open doors introduce large heating/cooling loads and may warrant dock seals or air curtains",
    [
      { text: "Docks are thermally isolated with no airflow exchange", why: "Open docks exchange large air volumes." },
      { text: "Infiltration only matters in tropical climates", why: "Cold and hot climates both suffer dock infiltration penalties." },
      { text: "Air curtains always increase energy use with no benefit", why: "Proper air curtains reduce infiltration losses." },
    ],
    "Logistics facilities often show seasonal energy spikes from door operation.",
    "medium"
  ),
  makeQ(
    "ASHRAE BEAP knowledge areas include:",
    "Data collection, analysis, reporting, and communication of energy assessment findings",
    [
      { text: "Only welding certification for duct fabrication", why: "Fabrication trades are not the BEAP certification focus." },
      { text: "Exclusive focus on refrigerant sales licensing", why: "Refrigerant licensing is separate from BEAP." },
      { text: "Structural seismic retrofit design exclusively", why: "Structural seismic design is outside BEAP scope." },
    ],
    "BEAP spans technical assessment and professional communication per the exam blueprint.",
    "easy",
    "d"
  ),
  makeQ(
    "When existing insulation is damaged by roof leaks, a BEAP should:",
    "Flag moisture-damaged insulation as both an energy and building-envelope integrity issue",
    [
      { text: "Ignore wet insulation because it still insulates perfectly", why: "Wet insulation loses R-value and risks mold/decay." },
      { text: "Recommend only cosmetic ceiling tile replacement", why: "Underlying wet insulation must be remediated." },
      { text: "Increase HVAC cooling setpoints to dry insulation in place only", why: "Material replacement/drying protocols are needed, not just setpoint changes." },
    ],
    "Envelope ECMs must address moisture before assuming rated thermal performance.",
    "medium"
  ),
  makeQ(
    "Peak demand management ECMs assessed may include:",
    "Battery storage, load shifting, chiller precooling, and demand-limiting controls",
    [
      { text: "Only changing carpet color in corridors", why: "Demand management targets electrical peak kW." },
      { text: "Eliminating all demand charges by definition", why: "ECMs reduce demand; tariffs still apply." },
      { text: "Ignoring time-of-use rate structures", why: "TOU and demand rates drive demand ECM economics." },
    ],
    "Demand charges can exceed energy charges in some commercial tariffs.",
    "hard"
  ),
  makeQ(
    "A final BEAP report executive summary should:",
    "Highlight total savings potential, top measures, and recommended next steps for the owner",
    [
      { text: "Hide all numbers to avoid decision-making", why: "Executives need concise savings and cost context." },
      { text: "List every light bulb inspected without synthesis", why: "Summaries synthesize findings for decision makers." },
      { text: "Omit implementation sequencing entirely", why: "Phasing helps owners fund and execute ECMs." },
    ],
    "Executive summaries translate technical findings into actionable business cases.",
    "easy"
  ),
];
