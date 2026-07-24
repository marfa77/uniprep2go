import { makeQ } from "./makeQ.mjs";

export const opmp = [
  makeQ(
    "OPMP (Operations and Performance Management Professional) certification focuses on:",
    "Existing building operations, performance tracking, and continuous improvement",
    [
      { text: "Only new construction commissioning with no operations phase", why: "OPMP targets ongoing operations and performance management." },
      { text: "Refrigerant sales licensing exclusively", why: "Refrigerant licensing is separate from OPMP." },
      { text: "Food safety HACCP procedures only", why: "HACCP is unrelated to building operations certification." },
    ],
    "OPMP validates skills in sustaining efficient, healthy building operation.",
    "easy"
  ),
  makeQ(
    "A core OPMP responsibility is establishing:",
    "Key performance indicators (KPIs) for energy, comfort, and equipment reliability",
    [
      { text: "Only lobby floral arrangements", why: "KPIs are measurable operational metrics." },
      { text: "Annual paint color trends exclusively", why: "Decor trends are not operations KPIs." },
      { text: "No metrics because operations cannot be measured", why: "Operations performance is measurable via meters and trends." },
    ],
    "KPIs enable benchmarking and continuous improvement programs.",
    "easy"
  ),
  makeQ(
    "Building automation system (BAS) optimization in operations should:",
    "Align live sequences with design intent, eliminate overrides, and tune setpoints for efficiency and comfort",
    [
      { text: "Maximize simultaneous heating and cooling for stability", why: "Simultaneous heating/cooling wastes energy." },
      { text: "Disable all alarms to reduce nuisance notifications", why: "Alarms identify faults requiring response." },
      { text: "Remove all trend logging to save disk space", why: "Trends are essential for performance management." },
    ],
    "BAS optimization is a primary existing-building energy strategy.",
    "medium"
  ),
  makeQ(
    "O&M manuals and sequence documentation support operators by:",
    "Providing normal, emergency, and seasonal procedures for maintained performance",
    [
      { text: "Replacing all training with a single PDF never updated", why: "Operators need accurate, accessible current documentation." },
      { text: "Hiding sequences so only contractors can operate systems", why: "Operators must understand sequences for daily management." },
      { text: "Eliminating seasonal changeover procedures", why: "Seasonal changeover is critical in many climates." },
    ],
    "Documentation reduces operator error and equipment damage.",
    "easy"
  ),
  makeQ(
    "Retrocommissioning handoff to operations should include:",
    "Updated sequences, training, issues resolution log, and M&V baselines",
    [
      { text: "Only a verbal summary with no records", why: "Handoff requires documented updated operating parameters." },
      { text: "Immediate return to pre-RCx overrides without monitoring", why: "Operators must sustain RCx improvements." },
      { text: "Deletion of all test scripts and trend history", why: "Records support ongoing verification." },
    ],
    "Sustained savings depend on operators maintaining RCx settings.",
    "medium"
  ),
  makeQ(
    "Energy management programs in OPMP practice typically include:",
    "Policy, metering, reporting, training, and accountability for performance targets",
    [
      { text: "Only installing equipment with no follow-up", why: "Programs require ongoing management, not one-time installs." },
      { text: "Eliminating all utility bill review", why: "Bill analysis is foundational to energy management." },
      { text: "No staff training because operators never affect energy", why: "Operator behavior strongly affects energy use." },
    ],
    "ISO 50001-style frameworks emphasize plan-do-check-act cycles.",
    "medium"
  ),
  makeQ(
    "Fault detection and diagnostics (FDD) in operations uses:",
    "Analytics on trend data to identify stuck dampers, sensor drift, and inefficient staging",
    [
      { text: "Only annual walk-throughs with no data", why: "FDD relies on continuous or periodic data analytics." },
      { text: "Guessing faults without measurement", why: "FDD algorithms compare expected vs actual performance." },
      { text: "Eliminating all sensors to reduce maintenance", why: "Sensors provide data for fault detection." },
    ],
    "FDD supports monitoring-based commissioning and OPMP goals.",
    "hard"
  ),
  makeQ(
    "Operator training effectiveness is best measured by:",
    "Operators correctly executing procedures, reducing alarms, and maintaining KPI targets",
    [
      { text: "Number of training donuts served only", why: "Training success is operational competence, not catering." },
      { text: "Attendance sheets with no skills assessment", why: "Competency checks validate training outcomes." },
      { text: "Eliminating all hands-on practice", why: "Hands-on training improves retention and accuracy." },
    ],
    "Competent operators sustain high-performance operation.",
    "easy"
  ),
  makeQ(
    "TAB reports at turnover should be used in operations to:",
    "Verify flows remain at design after filter loading and system changes",
    [
      { text: "Discard immediately because balancing never changes", why: "Filter dirt and modifications shift system balance." },
      { text: "Replace all O&M procedures permanently", why: "TAB reports supplement but do not replace O&M." },
      { text: "Only decorate the control room walls", why: "TAB data is a technical reference for maintenance." },
    ],
    "Rebalancing may be needed after major filter or equipment changes.",
    "medium"
  ),
  makeQ(
    "Continuous commissioning differs from one-time RCx by:",
    "Persistently monitoring and correcting performance drift using ongoing data and processes",
    [
      { text: "Occurring only once at building permit", why: "Continuous commissioning is ongoing." },
      { text: "Eliminating all meter data requirements", why: "Continuous programs depend on measured performance." },
      { text: "Replacing operators with no training", why: "Operators remain central with better tools and processes." },
    ],
    "Continuous commissioning maintains savings over the building lifecycle.",
    "medium"
  ),
  makeQ(
    "ASHRAE Guideline 36 is relevant to OPMP because it:",
    "Provides standardized efficient HVAC control sequences operators should maintain",
    [
      { text: "Defines only structural concrete mix designs", why: "Guideline 36 addresses HVAC control sequences." },
      { text: "Eliminates need for any BAS", why: "Sequences must be implemented and maintained in the BAS." },
      { text: "Replaces all local building codes exclusively", why: "Guideline 36 supplements codes; it does not replace them." },
    ],
    "Operators and OPMP professionals align live sequences with Guideline 36 where applicable.",
    "medium"
  ),
  makeQ(
    "Utility tracking dashboards for facility managers should present:",
    "Normalized consumption, cost, demand, and variance from targets or budgets",
    [
      { text: "Only raw kWh with no context or targets", why: "Dashboards need normalization and benchmarks for decisions." },
      { text: "Confidential data with no operator access", why: "Operators benefit from visibility into performance metrics." },
      { text: "Annual data only with no monthly resolution", why: "Monthly views reveal seasonality and drift faster." },
    ],
    "Actionable dashboards drive timely operational responses.",
    "medium"
  ),
  makeQ(
    "Preventive maintenance optimization balances:",
    "Manufacturer requirements, runtime, failure history, and energy/comfort risk",
    [
      { text: "Running equipment to failure always to save PM labor", why: "Run-to-failure increases energy waste and emergency cost." },
      { text: "Identical PM intervals for all equipment regardless of use", why: "Runtime-based PM is more efficient than calendar-only." },
      { text: "No maintenance records because failures are random only", why: "Records inform predictive and preventive strategies." },
    ],
    "Good PM preserves efficiency and avoids catastrophic failures.",
    "medium"
  ),
  makeQ(
    "IAQ verification in operations may include:",
    "CO₂ monitoring, ventilation airflow checks, filter maintenance, and occupant feedback",
    [
      { text: "Only visual inspection of carpet patterns", why: "IAQ requires measurable ventilation and contaminant controls." },
      { text: "Eliminating outdoor air to save filters", why: "Reducing OA below code harms IAQ and may violate regulations." },
      { text: "No response to occupant complaints", why: "Complaints often reveal ventilation or control faults." },
    ],
    "OPMP integrates IAQ with energy performance management.",
    "medium"
  ),
  makeQ(
    "Chiller plant operational sequencing should:",
    "Lead most efficient machines, rotate run hours, and reset condenser water where applicable",
    [
      { text: "Run all chillers at minimum load continuously", why: "Poor sequencing wastes energy at part load." },
      { text: "Ignore approach temperature trends", why: "Rising approach signals tower or fouling issues." },
      { text: "Disable all logging to reduce IT tickets", why: "Logs support diagnostics and KPI tracking." },
    ],
    "Plant operators significantly affect kW/ton through sequencing discipline.",
    "hard"
  ),
  makeQ(
    "An OPMP evaluating staff override practices should:",
    "Identify chronic overrides, document reasons, and implement sustainable control fixes",
    [
      { text: "Encourage permanent manual overrides for all zones", why: "Chronic overrides defeat control strategies and waste energy." },
      { text: "Lock operators out of all controls with no training", why: "Operators need appropriate access and training." },
      { text: "Ignore comfort complaints entirely", why: "Comfort issues often explain overrides; root causes need fixing." },
    ],
    "Sustainable operation resolves comfort problems without permanent bypasses.",
    "medium"
  ),
  makeQ(
    "Measurement and verification in ongoing operations supports:",
    "Validating ECM persistence and detecting performance regression",
    [
      { text: "Only one-time savings claims with no follow-up", why: "Ongoing M&V confirms savings endure." },
      { text: "Eliminating all meter calibration", why: "Accurate meters are essential for M&V." },
      { text: "Ignoring weather normalization in comparisons", why: "Normalization separates weather effects from operational changes." },
    ],
    "IPMVP principles apply to post-implementation performance tracking.",
    "hard"
  ),
  makeQ(
    "OPMP professionals should verify compliance with ASHRAE 90.1 operational requirements such as:",
    "Economizer operation, ventilation minimums, and equipment efficiency where enforceable at operations phase",
    [
      { text: "Only structural steel mill test reports", why: "90.1 operational items include economizers and ventilation." },
      { text: "Eliminating all economizer maintenance", why: "Disabled economizers violate intent and waste energy." },
      { text: "No documentation of operating setpoints", why: "Documented setpoints support compliance and training." },
    ],
    "Operations staff maintain code-intent performance after occupancy.",
    "hard"
  ),
  makeQ(
    "Staffing models for 24/7 facilities affect OPMP by:",
    "Determining response time to alarms, preventive maintenance windows, and training coverage",
    [
      { text: "Having no effect on energy or reliability", why: "Staffing affects fault response and sustained performance." },
      { text: "Eliminating all night shift procedures always", why: "Many facilities require overnight operations support." },
      { text: "Replacing all BAS with manual operation only", why: "BAS remains central; staffing supports it." },
    ],
    "Adequate staffing sustains KPIs in critical environments.",
    "medium"
  ),
  makeQ(
    "Water treatment for cooling towers in operations prevents:",
    "Fouling, scale, biological growth, and increased chiller energy from elevated approach",
    [
      { text: "Only cosmetic staining on tower fill with no efficiency impact", why: "Fouling raises approach and chiller kW." },
      { text: "All makeup water requirements", why: "Evaporation still requires makeup water." },
      { text: "Need for any bleed or blowdown", why: "Concentration cycles require controlled bleed." },
    ],
    "Tower maintenance is an operational energy and reliability priority.",
    "medium"
  ),
  makeQ(
    "An OPMP establishing an energy team should include:",
    "Facilities, engineering, finance, and occupants with defined roles and meeting cadence",
    [
      { text: "Only external consultants with no owner staff", why: "Internal ownership sustains programs after consultants leave." },
      { text: "No defined goals or accountability", why: "Teams need targets and responsibilities." },
      { text: "Meetings only once per decade", why: "Regular cadence maintains momentum." },
    ],
    "Cross-functional teams improve funding and implementation of improvements.",
    "easy"
  ),
  makeQ(
    "Lighting operations and maintenance includes:",
    "Cleaning fixtures, verifying control schedules, and replacing failed lamps/drivers promptly",
    [
      { text: "Leaving failed lamps to save energy in that fixture", why: "Failed lamps may increase load elsewhere or reduce safety." },
      { text: "Disabling occupancy sensors permanently", why: "Controls save energy when maintained properly." },
      { text: "Ignoring daylight sensor calibration", why: "Drifted sensors cause unnecessary electric lighting." },
    ],
    "Maintained lighting controls preserve designed savings.",
    "easy"
  ),
  makeQ(
    "OPMP response to rising demand charges should evaluate:",
    "Peak kW drivers, load shifting, staging improvements, and tariff options",
    [
      { text: "Only reducing occupant count", why: "Demand management targets equipment operation and schedules." },
      { text: "Ignoring interval meter data", why: "Interval data reveals peak drivers." },
      { text: "Assuming demand charges are fixed regardless of kW", why: "Demand charges respond to measured peak kW." },
    ],
    "Operational strategies can reduce costly peak demand charges.",
    "hard"
  ),
  makeQ(
    "Change management after major HVAC upgrades requires:",
    "Updated training, revised sequences, and communication to occupants about new operation",
    [
      { text: "No training because upgrades are identical to old systems always", why: "New equipment and sequences require operator education." },
      { text: "Immediate return to legacy overrides", why: "Upgrades fail to deliver savings if operators bypass new controls." },
      { text: "Deleting all prior O&M records", why: "Historical records support troubleshooting transitions." },
    ],
    "Human factors determine whether capital upgrades achieve projected performance.",
    "medium"
  ),
  makeQ(
    "OPMP certification renewal requires:",
    "Professional Development Hours per ASHRAE credential renewal rules (verify current guidebook)",
    [
      { text: "No continuing education ever", why: "ASHRAE certifications require PDHs for renewal." },
      { text: "Only social media activity", why: "PDHs require qualified professional development." },
      { text: "Automatic renewal without documentation", why: "Certificants document PDH activities." },
    ],
    "Renewal keeps certificants current with evolving standards and practices.",
    "easy"
  ),
  // 26-50
  makeQ(
    "Seasonal changeover procedures for hydronic systems should include:",
    "Valve positions, boiler/chiller enable, glycol checks, and control mode updates",
    [
      { text: "Only changing thermostat labels", why: "Seasonal changeover involves equipment and control modes." },
      { text: "Running chillers and boilers simultaneously without reason", why: "Simultaneous operation wastes energy unless required." },
      { text: "No verification of outdoor air damper minimum positions", why: "Damper positions affect ventilation and freeze protection." },
    ],
    "Documented changeover reduces failures at first heating or cooling day.",
    "medium"
  ),
  makeQ(
    "An OPMP analyzing EUI trends should normalize for:",
    "Weather, occupancy, production level, and major equipment changes",
    [
      { text: "Only building street number", why: "Normalization uses weather and operational drivers." },
      { text: "Raw kWh with no adjustments ever", why: "Unnormalized trends mislead decision makers." },
      { text: "Deleting historical data each year", why: "Historical baselines are essential for trend analysis." },
    ],
    "Normalized metrics reveal true operational performance changes.",
    "medium"
  ),
  makeQ(
    "Emergency operations training should cover:",
    "Power failure, fire modes, equipment failures, and safe shutdown/startup sequences",
    [
      { text: "Only routine weekday startup", why: "Emergencies require distinct trained responses." },
      { text: "No practice drills to save time", why: "Drills improve response during real events." },
      { text: "Ignoring generator and ATS procedures", why: "Emergency power is critical in many facilities." },
    ],
    "Prepared operators protect occupants and equipment during emergencies.",
    "medium"
  ),
  makeQ(
    "Vendor service contracts reviewed by OPMP should align with:",
    "Performance KPIs, response times, parts availability, and energy impact of maintenance quality",
    [
      { text: "Lowest price only with no scope review", why: "Poor maintenance increases energy and failure rates." },
      { text: "No access to maintenance records", why: "Owners need records for accountability." },
      { text: "Eliminating all OEM training requirements", why: "Vendor training supports proper equipment care." },
    ],
    "Contract scope affects long-term operational performance.",
    "medium"
  ),
  makeQ(
    "Occupant engagement programs support OPMP goals by:",
    "Encouraging plug load management, feedback on comfort, and participation in setback initiatives",
    [
      { text: "Hiding all energy data from occupants", why: "Engagement improves behavior and support for initiatives." },
      { text: "Penalizing all comfort feedback", why: "Feedback reveals operational issues." },
      { text: "Eliminating all plug load policies", why: "Plug loads are a growing operational end use." },
    ],
    "Behavior change complements technical O&M improvements.",
    "easy"
  ),
  makeQ(
    "Steam system operations should monitor:",
    "Pressure, trap performance, boiler efficiency, and condensate return rates",
    [
      { text: "Only boiler room paint condition", why: "Trap failures and condensate loss waste fuel." },
      { text: "Venting live steam to atmosphere routinely", why: "Steam venting wastes energy and water treatment chemicals." },
      { text: "No water treatment on makeup", why: "Treatment protects boilers and distribution." },
    ],
    "Steam O&M significantly affects fuel use in campuses and hospitals.",
    "medium"
  ),
  makeQ(
    "OPMP professionals implementing alarm rationalization should:",
    "Prioritize actionable alarms, reduce nuisance alerts, and define response procedures",
    [
      { text: "Enable every possible alarm at maximum sensitivity", why: "Alarm floods cause operator desensitization." },
      { text: "Disable all safeties to reduce noise", why: "Safety alarms must remain functional." },
      { text: "Provide no guidance on alarm response", why: "Runbooks define required operator actions." },
    ],
    "Effective alarm management improves response to real faults.",
    "hard"
  ),
  makeQ(
    "Data quality in BAS trends must be validated because:",
    "Stuck sensors and miscalibrated inputs cause false diagnostics and poor control",
    [
      { text: "All sensor readings are always perfect", why: "Sensors drift, fail, and require calibration." },
      { text: "Only software vendor matters, not field hardware", why: "Field device health determines data trustworthiness." },
      { text: "Trends are decorative with no operational use", why: "Trends underpin FDD and KPI reporting." },
    ],
    "OPMP programs include periodic sensor verification.",
    "medium"
  ),
  makeQ(
    "Portfolio-level OPMP management aggregates:",
    "Normalized EUIs, open work orders, RCx opportunities, and capital planning across sites",
    [
      { text: "Only single-building carpet inventories", why: "Portfolio management compares performance across properties." },
      { text: "Unrelated residential home data", why: "Portfolio metrics must be consistent across owned assets." },
      { text: "No prioritization of capital projects", why: "Portfolio views guide funding to highest-impact sites." },
    ],
    "Enterprise facility managers benchmark and prioritize across buildings.",
    "hard"
  ),
  makeQ(
    "Night audit (overnight walk-through) identifies:",
    "Equipment running when unoccupied, lights left on, and overrides wasting energy",
    [
      { text: "Only daytime peak solar gain", why: "Night audits target after-hours waste." },
      { text: "Structural foundation cracks exclusively", why: "Night audits focus on operating equipment and lights." },
      { text: "Guaranteed absence of any running HVAC", why: "Some HVAC must run; audits find unnecessary operation." },
    ],
    "Overnight surveys are a low-cost operational assessment tool.",
    "easy"
  ),
  makeQ(
    "OPMP alignment with organizational ESG reporting requires:",
    "Documented energy, emissions, water, and IAQ metrics with auditable data trails",
    [
      { text: "Only marketing statements without data", why: "ESG reporting demands measurable verified metrics." },
      { text: "Eliminating all meter calibration records", why: "Auditors require traceable data quality." },
      { text: "Hiding performance regression from leadership", why: "Transparent reporting supports corrective action." },
    ],
    "Operations data feeds corporate sustainability disclosures.",
    "hard"
  ),
  makeQ(
    "Cooling tower fan and pump VFD operations should be tuned to:",
    "Maintain approach setpoints with minimum fan and pump energy",
    [
      { text: "Run fans at 100% speed always", why: "Variable speed reduces energy when conditions allow." },
      { text: "Disable all freeze protection controls", why: "Freeze protection prevents equipment damage." },
      { text: "Ignore basin water level controls", why: "Low water levels damage pumps and reduce capacity." },
    ],
    "Tower control optimization lowers condenser water temperature modestly with less kW.",
    "medium"
  ),
  makeQ(
    "An OPMP evaluating compressed air systems should check for:",
    "Leaks, inappropriate uses, pressure setpoints, and sequencer operation",
    [
      { text: "Only air compressor paint color", why: "Leaks and control setpoints drive electricity use." },
      { text: "Using compressed air for personnel cooling routinely", why: "Misuse wastes compressed air energy." },
      { text: "Maximum pressure without demand analysis", why: "Higher pressure increases compressor energy." },
    ],
    "Compressed air is often the least efficient utility in industrial buildings.",
    "medium"
  ),
  makeQ(
    "Maintaining economizer operation includes:",
    "Actuator calibration, damper linkage checks, sensor validation, and high-limit verification",
    [
      { text: "Welding economizer dampers closed for winter permanently", why: "Stuck closed dampers waste free cooling seasons." },
      { text: "No inspection of relief fan interlocks", why: "Relief paths are required for economizer operation." },
      { text: "Disabling outdoor air enthalpy sensors without replacement strategy", why: "Sensors enable efficient economizer control." },
    ],
    "Economizer maintenance is a high-value operational task.",
    "medium"
  ),
  makeQ(
    "OPMP exam scenarios may test ability to:",
    "Diagnose operational causes of performance gaps and recommend sustainable corrective actions",
    [
      { text: "Recite unrelated plumbing fixture units only", why: "OPMP exams test applied operations knowledge." },
      { text: "Memorize ASHRAE office addresses only", why: "Technical scenarios drive exam content." },
      { text: "Design structural footings exclusively", why: "Structural design is outside OPMP scope." },
    ],
    "ASHRAE exams include application and analysis of operations problems.",
    "easy",
    "d"
  ),
  makeQ(
    "Building pressurization operations should maintain:",
    "Slight positive pressure where required to control infiltration and elevator shaft effects",
    [
      { text: "Strong negative pressure everywhere always", why: "Pressure requirements vary by building type and climate." },
      { text: "No consideration of door openings or vestibules", why: "Door operation affects pressure control." },
      { text: "Eliminating all outdoor air intakes", why: "Outdoor air is required for ventilation." },
    ],
    "Pressure control affects IAQ, infiltration loads, and door operation.",
    "medium"
  ),
  makeQ(
    "OPMP capital planning integrates:",
    "Equipment age, condition assessments, energy impact, and lifecycle cost of replacements",
    [
      { text: "Only aesthetic renovations without engineering review", why: "Capital plans should address failing inefficient equipment." },
      { text: "Random replacement without failure risk analysis", why: "Risk and efficiency inform replacement timing." },
      { text: "Ignoring utility incentive programs", why: "Incentives affect project economics." },
    ],
    "Lifecycle planning avoids emergency replacements at premium cost.",
    "medium"
  ),
  makeQ(
    "Tenant submetering in multitenant buildings supports OPMP by:",
    "Allocating energy use, incentivizing conservation, and identifying anomalous consumption",
    [
      { text: "Eliminating all owner visibility into energy use", why: "Submetering improves accountability." },
      { text: "Only billing once annually with no interval data", why: "Interval submeter data reveals waste patterns." },
      { text: "Ignoring common area load allocation", why: "Common areas must be fairly allocated or managed." },
    ],
    "Transparent metering drives tenant and operator efficiency behavior.",
    "hard"
  ),
  makeQ(
    "Winter freeze protection operations for hydronic coils require:",
    "Minimum flows, glycol concentration checks, and functioning low-temperature safeties",
    [
      { text: "Shutting off all pumps overnight without analysis", why: "No-flow conditions risk coil freeze in cold climates." },
      { text: "Disabling all low-temperature lockouts", why: "Safeties prevent coil rupture from freezing." },
      { text: "Opening outdoor air dampers fully during extreme cold", why: "Excess OA increases freeze risk at coils." },
    ],
    "Freeze events cause costly emergency repairs and downtime.",
    "hard"
  ),
  makeQ(
    "An OPMP benchmarking a building against ENERGY STAR should ensure:",
    "Correct property type, complete meter data, and stable occupancy before comparing scores",
    [
      { text: "Using wrong property type to inflate score", why: "Incorrect classification invalidates benchmarking." },
      { text: "Partial year data without noting gaps", why: "Complete data periods are required for accurate scores." },
      { text: "Ignoring weather or occupancy shifts entirely", why: "Context helps interpret score changes." },
    ],
    "Accurate benchmarking guides prioritization of operational improvements.",
    "medium"
  ),
  makeQ(
    "Documentation of setpoint changes should include:",
    "Who changed it, why, expected impact, and review date",
    [
      { text: "No records to encourage flexibility", why: "Undocumented changes cause confusion and drift." },
      { text: "Only verbal agreements in hallways", why: "Written change logs support accountability." },
      { text: "Deleting history after each change", why: "History helps diagnose performance shifts." },
    ],
    "Change logs are essential for multi-shift operations teams.",
    "easy"
  ),
  makeQ(
    "OPMP professionals supporting net-zero goals focus operations on:",
    "Minimizing loads, maximizing efficient operation, and managing on-site renewables and offsets",
    [
      { text: "Increasing energy use to grow renewables size only", why: "Net-zero strategies prioritize efficiency first." },
      { text: "Ignoring on-site PV production in operations", why: "Operators must understand generation and grid interaction." },
      { text: "Eliminating all performance tracking", why: "Net-zero requires ongoing verification." },
    ],
    "Operations sustain design-level performance needed for net-zero commitments.",
    "hard"
  ),
  makeQ(
    "Humidifier and dehumidifier maintenance in operations includes:",
    "Water treatment, drain function, sensor calibration, and seasonal enable/disable",
    [
      { text: "Only changing air filters in unrelated RTUs", why: "Humidity equipment needs specific maintenance." },
      { text: "Running humidifiers with clogged strainers indefinitely", why: "Poor water quality damages equipment and IAQ." },
      { text: "No seasonal shutdown of unused equipment", why: "Seasonal disable saves energy and reduces failures." },
    ],
    "Humidity control affects comfort, materials, and energy simultaneously.",
    "medium"
  ),
  makeQ(
    "An effective OPMP reporting cadence to leadership includes:",
    "Monthly KPI summaries, exception reporting, and annual improvement plan updates",
    [
      { text: "No reports until equipment fails catastrophically", why: "Regular reporting enables proactive investment." },
      { text: "Only anecdotal stories without metrics", why: "Leadership decisions require quantified performance data." },
      { text: "Hiding all unfavorable variances", why: "Transparent variance reporting builds trust and support." },
    ],
    "Consistent reporting sustains organizational commitment to performance.",
    "easy"
  ),
  makeQ(
    "Air filter maintenance in operations should follow:",
    "Pressure drop monitoring or scheduled changes based on loading, not appearance alone",
    [
      { text: "Replacing filters only when visible dirt appears regardless of pressure", why: "High pressure drop wastes fan energy and reduces airflow." },
      { text: "Never changing filters to save material cost", why: "Clogged filters increase energy use and risk coil freezing." },
      { text: "Removing filters entirely to maximize airflow", why: "Filters protect coils and IAQ; removal causes fouling." },
    ],
    "Filter PM balances IAQ, coil protection, and fan energy.",
    "easy"
  ),
];
