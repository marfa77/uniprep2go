import { makeQ } from "./makeQ.mjs";

export const chdHbdp = [
  makeQ(
    "ASHRAE CHD certification validates competency in:",
    "HVAC system design including load calculations, equipment selection, and distribution design",
    [
      { text: "Only plumbing fixture counts without load analysis", why: "CHD requires engineering analysis of HVAC loads and systems." },
      { text: "Electrical one-line drafting without demand study", why: "Electrical design is a separate discipline." },
      { text: "Land surveying legal descriptions exclusively", why: "Surveying is unrelated to CHD HVAC design." },
    ],
    "CHD tests practical HVAC design knowledge per the CHD exam blueprint.",
    "easy"
  ),
  makeQ(
    "HBDP (High-Performance Building Design Professional) emphasizes:",
    "Integrated design delivering energy efficiency, IAQ, and sustainability across disciplines",
    [
      { text: "Single-discipline silo design without coordination", why: "HBDP focuses on integrated high-performance outcomes." },
      { text: "Only lowest first cost without performance metrics", why: "High-performance design balances lifecycle performance." },
      { text: "Exclusive focus on decorative finishes", why: "HBDP addresses building systems and performance integration." },
    ],
    "HBDP spans architecture, mechanical, electrical, and controls integration.",
    "easy"
  ),
  makeQ(
    "Sensible cooling load calculations account for:",
    "Conduction, solar gains, internal heat sources, and ventilation affecting dry-bulb temperature",
    [
      { text: "Only latent moisture without temperature change", why: "Sensible loads change dry-bulb temperature." },
      { text: "Structural footing weights exclusively", why: "Structural weight is not a cooling load component." },
      { text: "Only occupant latent perspiration", why: "Latent load is separate from sensible cooling load." },
    ],
    "Sensible loads size cooling capacity and airflow for temperature control.",
    "medium"
  ),
  makeQ(
    "Latent cooling load is primarily driven by:",
    "Moisture addition from occupants, ventilation, and infiltration requiring dehumidification",
    [
      { text: "Only solar gain on opaque walls", why: "Opaque solar gain is mostly sensible." },
      { text: "Steel beam modulus of elasticity", why: "Structural material properties are not latent loads." },
      { text: "Fan motor sensible heat only", why: "Fan heat is sensible; latent load involves moisture." },
    ],
    "Latent loads determine reheat, dehumidification, and coil selection.",
    "medium"
  ),
  makeQ(
    "The CHD/HBDP published passing score is approximately:",
    "70 correct out of 100 scored items (verify current FAQs)",
    [
      { text: "68 correct out of 100 scored items", why: "68/100 is the BEAP pass point." },
      { text: "83 correct out of 120 scored items", why: "83/120 is the BCxP pass point." },
      { text: "45 correct out of 60 scored items", why: "CHD/HBDP use 100 scored items." },
    ],
    "CHD and HBDP share a similar pass threshold per ASHRAE FAQs.",
    "easy",
    "b"
  ),
  makeQ(
    "Psychrometric analysis in HVAC design is used to:",
    "Relate dry-bulb, wet-bulb, humidity ratio, and enthalpy for process and coil selection",
    [
      { text: "Size structural columns only", why: "Psychrometrics addresses air property relationships." },
      { text: "Calculate parking stall counts", why: "Parking counts are unrelated to psychrometrics." },
      { text: "Determine soil bearing capacity", why: "Geotechnical analysis is separate from HVAC psychrometrics." },
    ],
    "Designers use psychrometric charts for cooling, heating, and humidification processes.",
    "medium"
  ),
  makeQ(
    "ASHRAE Standard 62.1 sets:",
    "Minimum ventilation rates and IAQ procedures for commercial and institutional buildings",
    [
      { text: "Only chiller refrigerant charge limits", why: "Refrigerant rules are in safety and equipment standards." },
      { text: "Structural wind load combinations exclusively", why: "Structural wind loads are in ASCE 7, not 62.1." },
      { text: "Kitchen exhaust hood fabrication welding only", why: "62.1 addresses ventilation rates and IAQ." },
    ],
    "Ventilation rate procedure and IAQ procedure paths are core 62.1 content.",
    "medium"
  ),
  makeQ(
    "VAV system design must address:",
    "Minimum ventilation at part load, static pressure control, and reheat/dehumidification implications",
    [
      { text: "Only constant maximum airflow at all times", why: "VAV modulates airflow to match load." },
      { text: "Elimination of all outdoor air requirements", why: "Minimum ventilation must be maintained per 62.1." },
      { text: "No duct sizing because velocity is irrelevant", why: "Duct design and static pressure are critical VAV design tasks." },
    ],
    "VAV designs balance comfort, ventilation, and fan energy at part load.",
    "hard"
  ),
  makeQ(
    "Air-side economizer design per ASHRAE 90.1 requires:",
    "Evaluating climate zone thresholds, high-limit shutoffs, and integration with mechanical cooling",
    [
      { text: "Economizers in all buildings regardless of size and climate without exception", why: "90.1 has capacity and climate exceptions." },
      { text: "Disabling relief air paths", why: "Relief or return fans manage building pressurization with economizers." },
      { text: "No controls integration with dampers", why: "Economizer dampers must be controlled and interlocked." },
    ],
    "Economizer requirements depend on climate zone and cooling system capacity.",
    "hard"
  ),
  makeQ(
    "Chiller plant design selection considers:",
    "Load profile, redundancy, kW/ton efficiency, condenser water temperatures, and part-load performance",
    [
      { text: "Only chiller footprint color", why: "Equipment aesthetics do not drive plant selection." },
      { text: "A single chiller size with no part-load analysis", why: "Part-load efficiency strongly affects annual energy." },
      { text: "Ignoring cooling tower approach temperature", why: "Tower performance affects chiller efficiency." },
    ],
    "Plant designers match staging and sizes to load duration curves.",
    "medium"
  ),
  makeQ(
    "Duct friction loss calculations use:",
    "Darcy-Weisbach or equivalent methods with roughness, fitting losses, and velocity limits",
    [
      { text: "Only occupant count times floor area", why: "Duct loss calculations use hydraulic principles." },
      { text: "Random duct sizes without velocity checks", why: "Velocity and noise limits constrain duct sizing." },
      { text: "Structural live load factors from ASCE 7", why: "Structural live loads do not size duct friction." },
    ],
    "Total static pressure determines fan selection in distribution design.",
    "medium"
  ),
  makeQ(
    "Hydronic pipe sizing balances:",
    "Flow requirements, velocity limits, pressure drop, and pumping energy",
    [
      { text: "Only pipe color coding standards", why: "Hydronic sizing is a hydraulic engineering task." },
      { text: "Maximum velocity with no regard for erosion or noise", why: "Velocity limits protect pipes and valves." },
      { text: "Elimination of all balancing valves", why: "Balancing devices are required for proper distribution." },
    ],
    "Oversized pipes waste capital; undersized pipes waste pump energy and cause noise.",
    "medium"
  ),
  makeQ(
    "Dedicated outdoor air systems (DOAS) separate:",
    "Ventilation and dehumidification from sensible cooling at terminal units",
    [
      { text: "All heating from any ventilation airflow", why: "DOAS handles ventilation/latent loads; terminals handle sensible loads." },
      { text: "Only plumbing fixtures from electrical panels", why: "DOAS is an HVAC ventilation strategy." },
      { text: "Structural steel from concrete exclusively", why: "Structural materials are unrelated to DOAS." },
    ],
    "DOAS improves humidity control in high-performance buildings.",
    "hard"
  ),
  makeQ(
    "Energy recovery ventilators in design should be evaluated for:",
    "Effectiveness, cross-leakage, frost control, and fan power impact on total ventilation energy",
    [
      { text: "Only decorative grille finishes", why: "Recovery performance metrics drive energy savings." },
      { text: "Infinite effectiveness without manufacturer data", why: "Designers use tested effectiveness ratings." },
      { text: "Eliminating all outdoor air requirements", why: "ERVs precondition OA but do not remove ventilation need." },
    ],
    "ERV/HRV selection balances IAQ and energy in cold and hot climates.",
    "medium"
  ),
  makeQ(
    "Integrated design charrettes in HBDP projects:",
    "Align disciplines early on load reduction, system selection, and performance targets",
    [
      { text: "Occur only after construction is complete", why: "Charrettes are early design collaboration tools." },
      { text: "Exclude owners and operators from participation", why: "Owners and operators inform requirements." },
      { text: "Focus solely on furniture procurement", why: "Charrettes target building performance strategies." },
    ],
    "Early integration prevents costly late redesign of systems.",
    "easy"
  ),
  makeQ(
    "Load calculations for perimeter zones must consider:",
    "Orientation-specific solar gains, conduction, and infiltration distinct from interior zones",
    [
      { text: "Identical loads on all facades regardless of glazing", why: "Orientation and fenestration vary perimeter loads." },
      { text: "Only interior carpet R-value", why: "Carpet has minor effect vs glazing and wall assembly." },
      { text: "No difference between winter and summer loads", why: "Heating and cooling loads vary seasonally." },
    ],
    "Perimeter vs interior zoning affects system selection and controls.",
    "medium"
  ),
  makeQ(
    "Fan coil unit selection requires:",
    "Matching coil capacity, airflow, condensate management, and noise criteria for the zone",
    [
      { text: "Only selecting the smallest cabinet for aesthetics", why: "Capacity and airflow must meet peak and ventilation needs." },
      { text: "Ignoring condensate drain slope and traps", why: "Condensate design prevents water damage and IAQ issues." },
      { text: "No acoustic analysis in any occupancy", why: "Noise criteria matter in hotels, offices, and healthcare." },
    ],
    "FCU design ties hydronic or refrigerant supplies to zone loads.",
    "medium"
  ),
  makeQ(
    "Heat pump system design in commercial buildings should address:",
    "Defrost, backup heat, simultaneous heating/cooling needs, and refrigerant piping limits",
    [
      { text: "Only constant COP at all outdoor temperatures", why: "Performance varies with outdoor conditions." },
      { text: "Unlimited refrigerant line length without manufacturer guidance", why: "Piping limits affect oil return and capacity." },
      { text: "Elimination of all ventilation loads", why: "Ventilation loads remain in heat pump designs." },
    ],
    "VRF/VRV and packaged heat pumps need careful application engineering.",
    "hard"
  ),
  makeQ(
    "Healthcare HVAC design (HFDP overlap) prioritizes:",
    "Infection control airflow, pressure relationships, filtration, and redundancy",
    [
      { text: "Only lowest first cost with no pressure mapping", why: "Healthcare requires pressure and filtration control." },
      { text: "Eliminating all outdoor air to save energy", why: "Healthcare ventilation rates are stringent." },
      { text: "Negative pressure in all spaces universally", why: "Pressure relationships vary by room type." },
    ],
    "HBDP/CHD candidates should understand healthcare differs from standard office design.",
    "hard"
  ),
  makeQ(
    "UFAD (underfloor air distribution) design considerations include:",
    "Swirl diffusers, slab height, cable pathways, and stratification effects on comfort",
    [
      { text: "Only traditional ceiling supply with no floor plenum", why: "UFAD uses underfloor plenums and floor diffusers." },
      { text: "Ignoring air temperature stratification", why: "Stratification affects comfort and load calculations." },
      { text: "No coordination with raised access floor structure", why: "Plenum height and structure are coordinated design tasks." },
    ],
    "UFAD can improve comfort and flexibility in suitable building types.",
    "hard"
  ),
  makeQ(
    "Cooling tower selection depends on:",
    "Heat rejection load, approach, wet-bulb design conditions, drift, and water treatment requirements",
    [
      { text: "Only tower fan blade color", why: "Thermal performance and water management drive selection." },
      { text: "Ignoring wet-bulb temperature for the site", why: "Wet-bulb defines tower capacity and approach." },
      { text: "Assuming towers need no makeup water", why: "Evaporation requires makeup water and bleed." },
    ],
    "Tower performance sets minimum condenser water temperature for chillers.",
    "medium"
  ),
  makeQ(
    "Boiler plant design for heating should evaluate:",
    "Efficiency turndown, redundancy, venting, combustion air, and distribution temperature strategy",
    [
      { text: "Only boiler paint finish", why: "Efficiency and safety drive boiler selection." },
      { text: "Oversizing without part-load efficiency review", why: "Cycling at low load reduces efficiency." },
      { text: "Eliminating all combustion air requirements", why: "Combustion air is code-mandated." },
    ],
    "Condensing boilers need low return temperatures to achieve rated efficiency.",
    "medium"
  ),
  makeQ(
    "ASHRAE Guideline 36 sequences of operation aim to:",
    "Standardize high-performance control sequences for common HVAC equipment",
    [
      { text: "Replace all mechanical equipment sizing rules", why: "Guideline 36 addresses controls sequences, not equipment sizing." },
      { text: "Eliminate need for any BAS programming", why: "Sequences must still be implemented in the BAS." },
      { text: "Define only decorative lighting scenes", why: "Guideline 36 covers HVAC system control logic." },
    ],
    "Designers reference Guideline 36 for efficient stable control strategies.",
    "medium"
  ),
  makeQ(
    "Selecting supply air temperature in cooling design trades off:",
    "Duct size, airflow rate, dehumidification capability, and terminal device performance",
    [
      { text: "Only structural column spacing", why: "Supply air temperature affects HVAC distribution design." },
      { text: "Higher SAT always reduces duct size without dehumidification impact", why: "Warmer SAT may require more airflow for dehumidification." },
      { text: "No relationship to space humidity control", why: "SAT is central to latent capacity delivery." },
    ],
    "Lower SAT improves dehumidification but increases duct and fan sizing.",
    "hard"
  ),
  makeQ(
    "Natural ventilation hybrid design requires:",
    "Defining operable window controls, wind/rain limits, and backup mechanical ventilation",
    [
      { text: "Sealing all windows permanently", why: "Natural ventilation requires controlled operable openings." },
      { text: "No analysis of outdoor air quality or noise", why: "Ambient conditions affect natural ventilation feasibility." },
      { text: "Eliminating all mechanical cooling globally", why: "Hybrids combine natural and mechanical systems." },
    ],
    "High-performance designs may use mixed-mode ventilation where climate allows.",
    "hard"
  ),
  // 26-50
  makeQ(
    "Zone pressurization design for stairwells and cleanrooms requires:",
    "Calculating airflow offsets to maintain required differential pressure under door openings",
    [
      { text: "Only thermostat location in corridors", why: "Pressurization design uses airflow and leakage analysis." },
      { text: "Ignoring door undercut and leakage paths", why: "Leakage paths determine required offset airflow." },
      { text: "Negative pressure in all exit stairs always", why: "Stairwells are typically pressurized positively in fire mode." },
    ],
    "Pressure design is critical in healthcare, labs, and life safety stairs.",
    "hard"
  ),
  makeQ(
    "Radiant cooling design must manage:",
    "Condensation risk on surfaces, dew point control, and integration with ventilation dehumidification",
    [
      { text: "Only sensible loads with no humidity concern", why: "Radiant panels require dew point control to avoid condensation." },
      { text: "Maximum surface temperatures above space dew point always without sensors", why: "Controls must prevent condensation on cold surfaces." },
      { text: "Elimination of all ventilation", why: "Ventilation still required for IAQ in radiant systems." },
    ],
    "Radiant systems need careful humidity and surface temperature control.",
    "hard"
  ),
  makeQ(
    "Kitchen makeup air design should:",
    "Match hood exhaust, condition makeup air, and interlock with hood operation",
    [
      { text: "Provide unlimited unconditioned makeup in all climates", why: "Untreated makeup air imposes large heating/cooling loads." },
      { text: "Ignore hood exhaust CFM requirements", why: "Makeup must balance exhaust per code and design." },
      { text: "Eliminate fire suppression interlocks", why: "Hood systems integrate with fire and HVAC controls." },
    ],
    "Commercial kitchen design is a specialized high-load application.",
    "medium"
  ),
  makeQ(
    "Selecting filters for MERV requirements balances:",
    "Particle removal efficiency, pressure drop, fan energy, and maintenance access",
    [
      { text: "Only filter frame color", why: "MERV, pressure drop, and energy matter in selection." },
      { text: "Highest MERV with no fan capacity check", why: "High MERV increases static pressure and fan kW." },
      { text: "No consideration of filter bypass leakage", why: "Bypass reduces realized filtration performance." },
    ],
    "IAQ goals must be achievable within fan and coil capacity limits.",
    "medium"
  ),
  makeQ(
    "Humidification system design in cold climates addresses:",
    "Water quality, distribution method, condensation on ducts, and energy source selection",
    [
      { text: "Only dehumidification with no winter humidification", why: "Cold dry climates often need humidification for comfort and materials." },
      { text: "Uncontrolled steam injection without pipe slope", why: "Improper humidifier installation causes duct damage." },
      { text: "Ignoring IAQ impacts of untreated water", why: "Water treatment prevents biological and mineral issues." },
    ],
    "Isothermal vs adiabatic humidification has different energy and hygiene profiles.",
    "medium"
  ),
  makeQ(
    "Thermal comfort design per ASHRAE 55 considers:",
    "Operative temperature, humidity, air speed, metabolic rate, and clothing insulation",
    [
      { text: "Only dry-bulb setpoint with no other variables", why: "ASHRAE 55 uses multiple comfort variables." },
      { text: "Structural footing depth exclusively", why: "Footing design is unrelated to thermal comfort." },
      { text: "Only exterior paint reflectance", why: "Comfort depends on environmental and personal factors." },
    ],
    "Designers apply PMV/PPD or adaptive comfort models as appropriate.",
    "medium"
  ),
  makeQ(
    "Passive design strategies in HBDP include:",
    "Orientation, shading, thermal mass, natural ventilation, and high-performance envelope assemblies",
    [
      { text: "Only increasing HVAC capacity without envelope improvements", why: "Passive measures reduce loads before active systems." },
      { text: "Eliminating all glazing to remove solar gain always", why: "Daylighting and views are balanced with shading design." },
      { text: "Ignoring climate-specific design responses", why: "Passive strategies depend on local climate." },
    ],
    "Integrated design prioritizes load reduction before equipment sizing.",
    "easy"
  ),
  makeQ(
    "Cooling load peak may differ from heating peak because:",
    "Solar gains and internal loads drive cooling peaks while heating peaks follow design winter temperature",
    [
      { text: "Heating and cooling always peak at the same hour", why: "Peak conditions differ seasonally and diurnally." },
      { text: "Only occupant count affects heating with no envelope loss", why: "Envelope transmission dominates heating in many climates." },
      { text: "Cooling peaks occur only at night without exception", why: "Cooling peaks often coincide with afternoon solar and occupancy." },
    ],
    "Designers size equipment for respective peak conditions per method standards.",
    "medium"
  ),
  makeQ(
    "Refrigerant piping design for split systems must follow:",
    "Manufacturer limits on line length, lift, oil return, and charge calculations",
    [
      { text: "Only architectural ceiling height with no refrigerant data", why: "Piping limits are equipment-specific engineering requirements." },
      { text: "Unlimited charge without ventilation per ASHRAE 15/34", why: "Refrigerant quantity triggers safety ventilation requirements." },
      { text: "Random pipe sizing without velocity guidance", why: "Oil return and capacity depend on proper pipe sizing." },
    ],
    "Safety standards and manufacturer data govern refrigerant system design.",
    "hard"
  ),
  makeQ(
    "Demand control ventilation design modulates outdoor air based on:",
    "Occupancy or CO₂ concentration while maintaining code minimum ventilation",
    [
      { text: "Fixed maximum outdoor air at all times", why: "DCV reduces OA when occupancy is low." },
      { text: "Outdoor air zero in all occupied modes", why: "Codes require minimum ventilation rates." },
      { text: "Only static pressure in supply ducts", why: "DCV sensors track occupancy or CO₂, not duct static alone." },
    ],
    "DCV saves conditioning energy in variable occupancy spaces.",
    "medium"
  ),
  makeQ(
    "High-performance facade design reduces loads by combining:",
    "Low U-factor assemblies, low SHGC glazing where appropriate, and continuous air barriers",
    [
      { text: "Single-pane clear glass on all orientations always", why: "High-performance facades use improved glazing and assemblies." },
      { text: "Discontinuous air barriers for faster construction only", why: "Air barrier continuity is essential for performance." },
      { text: "Eliminating all shading devices globally", why: "Shading reduces unwanted solar gains." },
    ],
    "Facade performance sets the baseline load for HVAC sizing.",
    "medium"
  ),
  makeQ(
    "Pump affinity laws indicate pump power scales approximately with:",
    "The cube of speed (or flow) ratio for variable-speed applications",
    [
      { text: "Linear relationship with speed only", why: "Power varies roughly with the cube of speed." },
      { text: "No relationship between flow and power", why: "Hydraulic power increases with flow and head." },
      { text: "Square of building height in stories", why: "Building height alone does not define pump affinity." },
    ],
    "VFDs on variable-load pumps yield significant energy savings.",
    "hard"
  ),
  makeQ(
    "Laboratory exhaust design must address:",
    "Fan redundancy, dilution, stack discharge, and makeup air with energy recovery where feasible",
    [
      { text: "Only office carpet selection", why: "Labs have high exhaust and containment requirements." },
      { text: "Recirculating all lab air to save energy without risk review", why: "Labs typically exhaust contaminated air without recirculation." },
      { text: "No stack height or re-entrainment analysis", why: "Exhaust discharge must avoid intake re-entrainment." },
    ],
    "Specialized exhaust is a major energy and safety design focus.",
    "hard"
  ),
  makeQ(
    "CHD designers sizing outdoor air per 62.1 VRP use:",
    "People outdoor air rate plus area outdoor air rate for each zone, then system-level treatment",
    [
      { text: "Only area-based OA with no people component", why: "VRP combines per-person and per-area rates." },
      { text: "Zero OA if CO₂ sensors are installed without analysis", why: "DCV still must meet minimums; IAQ procedure is a separate path." },
      { text: "Random OA values per designer preference", why: "62.1 defines prescribed rate tables." },
    ],
    "System ventilation efficiency may adjust zone-level requirements.",
    "hard"
  ),
  makeQ(
    "Displacement ventilation design delivers:",
    "Low-velocity supply at floor level relying on stratification and heat plumes",
    [
      { text: "High-velocity ceiling jets mixing room air completely", why: "Displacement uses low-level low-velocity supply." },
      { text: "No relationship between supply temperature and stratification", why: "Supply temperature must be warmer than occupied zone for displacement." },
      { text: "Only recirculation with no fresh air path", why: "Ventilation air must still be introduced appropriately." },
    ],
    "Displacement ventilation suits high ceilings and suitable cooling loads.",
    "hard"
  ),
  makeQ(
    "Integrated lighting and HVAC design in HBDP coordinates:",
    "Heat gain from fixtures, daylighting controls, and plug load impacts on cooling",
    [
      { text: "Only wattage of lobby art lighting with no HVAC impact", why: "All internal gains affect cooling loads." },
      { text: "Eliminating all daylight sensors globally", why: "Daylighting controls reduce lighting heat gain." },
      { text: "No coordination between architects and engineers", why: "Integrated design requires cross-discipline coordination." },
    ],
    "LED retrofits and daylighting change internal gain profiles.",
    "medium"
  ),
  makeQ(
    "Sound attenuation in HVAC design uses:",
    "Duct lining, silencers, and equipment selection to meet NC/RC criteria",
    [
      { text: "Only visual duct layout with no acoustic review", why: "Occupant comfort includes noise criteria." },
      { text: "Maximum fan speed regardless of noise", why: "Design must meet project acoustic requirements." },
      { text: "Eliminating all vibration isolation", why: "Isolation reduces structure-borne noise transmission." },
    ],
    "Acoustic design is especially critical in theaters, offices, and healthcare.",
    "medium"
  ),
  makeQ(
    "Geothermal heat exchanger design requires:",
    "Soil/rock thermal conductivity analysis, borefield sizing, and pump power accounting",
    [
      { text: "Only above-ground air temperature averages", why: "Ground loop design depends on subsurface thermal properties." },
      { text: "Infinite ground temperature stability without modeling", why: "Long-term ground temperature drift must be analyzed." },
      { text: "No integration with heat pump performance curves", why: "Entering water temperature affects heat pump efficiency." },
    ],
    "GSHP systems need coupled ground and building load analysis.",
    "hard"
  ),
  makeQ(
    "Smoke management HVAC design modes include:",
    "Pressurization, exhaust, and purge sequences coordinated with fire alarm inputs",
    [
      { text: "Only normal comfort cooling sequences", why: "Fire/smoke modes override normal operation." },
      { text: "No fan restart after power loss", why: "Emergency power and sequences address smoke control." },
      { text: "Ignoring door and damper positions", why: "Damper and fan positions are critical smoke control elements." },
    ],
    "Life safety sequences are mandatory in many occupancy types.",
    "hard"
  ),
  makeQ(
    "CHD/HBDP exam items at the application level may require:",
    "Selecting appropriate system types and design parameters for a described building scenario",
    [
      { text: "Reciting unrelated plumbing code section numbers only", why: "Exams test applied HVAC design judgment." },
      { text: "Memorizing staff phone directories", why: "Technical scenarios drive application-level items." },
      { text: "Hand calculating seismic base shear exclusively", why: "Structural seismic calcs are outside CHD/HBDP focus." },
    ],
    "ASHRAE exams emphasize scenario-based application and analysis.",
    "easy",
    "d"
  ),
  makeQ(
    "Designing for future flexibility in HBDP may include:",
    "Oversized vertical shafts, modular plant capacity, and adaptable zoning/control strategies",
    [
      { text: "Permanently fixed airflow with no VAV capability", why: "Flexibility anticipates changing loads and layouts." },
      { text: "Eliminating all spare capacity in mechanical rooms", why: "Future equipment needs space and infrastructure." },
      { text: "No access panels for maintenance or upgrades", why: "Maintainability supports lifecycle performance." },
    ],
    "High-performance design considers operational adaptation over building life.",
    "medium"
  ),
  makeQ(
    "Condenser water reset strategies improve efficiency by:",
    "Raising condenser water temperature at part load to improve chiller lift characteristics where safe",
    [
      { text: "Lowering tower approach to zero physically always", why: "Approach has physical limits based on wet-bulb." },
      { text: "Running chillers at minimum load continuously", why: "Reset optimizes variable conditions, not minimum load always." },
      { text: "Disabling all cooling towers permanently", why: "Towers reject heat from water-cooled chillers." },
    ],
    "Reset controls must respect chiller manufacturer minimum requirements.",
    "hard"
  ),
  makeQ(
    "Outdoor design conditions for load calculations are obtained from:",
    "ASHRAE climatic design data for the project location (dry-bulb, wet-bulb extremes)",
    [
      { text: "Only average monthly conditions with no peak design", why: "Equipment sizing uses design extremes, not averages only." },
      { text: "Random temperatures chosen by the owner", why: "Engineering standards define design conditions." },
      { text: "Interior thermostat setpoints exclusively", why: "Outdoor design weather drives envelope and ventilation loads." },
    ],
    "Correct design weather data prevents under- or over-sizing equipment.",
    "easy"
  ),
  makeQ(
    "Hydronic system diversity factors in design:",
    "Reduce simultaneous peak load assumption when not all zones peak together",
    [
      { text: "Always assume 100% peak on every zone simultaneously without analysis", why: "Diversity acknowledges non-coincident peaks." },
      { text: "Eliminate all safety factors globally", why: "Diversity is engineering judgment, not elimination of margins." },
      { text: "Apply only to plumbing fixture units never HVAC", why: "HVAC hydronic designs use diversity for plant sizing." },
    ],
    "Proper diversity reduces plant and pipe oversizing while maintaining comfort.",
    "medium"
  ),
  makeQ(
    "High-performance building water heating design integrates:",
    "Low-flow fixtures, efficient heat sources, distribution losses, and recirculation control",
    [
      { text: "Only maximum storage temperature without Legionella policy", why: "Temperature strategy must balance energy and health." },
      { text: "Uninsulated long recirculation loops always", why: "Distribution losses are major DHW energy use." },
      { text: "No hot water demand calculations", why: "Fixture counts and schedules size DHW systems." },
    ],
    "DHW energy is significant in hospitality, healthcare, and multifamily projects.",
    "medium"
  ),
];
