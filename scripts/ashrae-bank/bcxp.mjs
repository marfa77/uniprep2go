import { makeQ } from "./makeQ.mjs";

export const bcxp = [
  makeQ(
    "BCxP (Building Commissioning Professional) certification validates ability to:",
    "Lead and manage the commissioning process from design through occupancy per owner requirements",
    [
      { text: "Perform only TAB services with no design review", why: "BCxP scope includes process leadership beyond TAB alone." },
      { text: "Register equipment warranties without functional testing", why: "Commissioning requires verification testing, not just paperwork." },
      { text: "Conduct structural peer review exclusively", why: "Structural peer review is outside BCxP commissioning scope." },
    ],
    "BCxP emphasizes owner advocacy and process management across project phases.",
    "easy"
  ),
  makeQ(
    "The Owner's Project Requirements (OPR) document defines:",
    "Owner's measurable performance expectations for systems and the facility",
    [
      { text: "Only contractor bid alternates and unit prices", why: "Bid pricing is contractual, not performance requirements." },
      { text: "Interior paint color palettes exclusively", why: "Aesthetics may appear in OPR but core content is performance criteria." },
      { text: "Structural weld inspection records only", why: "Structural records are separate deliverables." },
    ],
    "OPR is the foundation against which commissioning verifies success.",
    "easy"
  ),
  makeQ(
    "Basis of Design (BOD) translates OPR into:",
    "Design team assumptions, standards, and system selections explaining how requirements will be met",
    [
      { text: "Only the construction schedule without technical content", why: "BOD is a technical narrative tied to OPR." },
      { text: "Marketing brochures for leasing agents", why: "BOD is an engineering/design document." },
      { text: "Final O&M manuals before construction starts", why: "O&M manuals are turnover deliverables, not BOD." },
    ],
    "CxA reviews BOD for alignment with OPR early in design.",
    "medium"
  ),
  makeQ(
    "ASHRAE Guideline 0 describes commissioning as:",
    "A quality-focused process verifying systems achieve owner requirements throughout project delivery",
    [
      { text: "Only a single test at certificate of occupancy", why: "Guideline 0 defines multi-phase quality verification." },
      { text: "Replacement of all design professionals by contractors", why: "Commissioning supplements the project team; it does not replace designers." },
      { text: "Elimination of all owner involvement", why: "Owner requirements drive the commissioning process." },
    ],
    "Guideline 0 is the overarching framework for total building commissioning.",
    "medium"
  ),
  makeQ(
    "The BCxP exam form includes approximately:",
    "130 total items with 120 scored and 10 unscored pretest questions",
    [
      { text: "100 scored items with no pretest questions", why: "BCxP uses a longer form than most ASHRAE credentials." },
      { text: "40 items in 60 minutes like CDCP", why: "BCxP is a 2.5-hour ASHRAE personnel exam." },
      { text: "Only essay questions with no multiple choice", why: "BCxP uses multiple-choice items." },
    ],
    "BCxP has the largest scored item count among common ASHRAE certification exams.",
    "easy",
    "b"
  ),
  makeQ(
    "The published BCxP passing score is approximately:",
    "83 correct out of 120 scored items (verify current FAQs)",
    [
      { text: "68 correct out of 100 scored items", why: "68/100 is the BEAP threshold." },
      { text: "69 correct out of 100 scored items", why: "69/100 is the BEMP threshold." },
      { text: "50 correct out of 100 scored items", why: "ASHRAE pass points are well above 50%." },
    ],
    "BCxP has the highest pass threshold among the common ASHRAE credentials.",
    "easy"
  ),
  makeQ(
    "Design-phase commissioning activities include:",
    "OPR/BOD workshops, design reviews, and commissioning specifications in contract documents",
    [
      { text: "Final punch list walkthrough only after occupancy", why: "Design-phase Cx starts before construction." },
      { text: "Demolition of all installed equipment", why: "Demolition is not a commissioning activity." },
      { text: "Skipping submittal review to accelerate bidding", why: "Submittal review verifies equipment matches design intent." },
    ],
    "Early involvement prevents costly rework during construction.",
    "medium"
  ),
  makeQ(
    "A commissioning plan should define:",
    "Roles, schedules, test requirements, documentation, and acceptance criteria",
    [
      { text: "Only the food service menu for the jobsite trailer", why: "Cx plans are technical project documents." },
      { text: "Contractor profit margins exclusively", why: "Financial margins are not commissioning plan content." },
      { text: "No testing because TAB replaces all Cx", why: "Functional performance testing is core to commissioning." },
    ],
    "The Cx plan is the roadmap for all commissioning activities.",
    "medium"
  ),
  makeQ(
    "Functional performance testing (FPT) scripts should:",
    "Step through modes and failures to prove systems respond per OPR and sequences of operation",
    [
      { text: "Only verify nameplate voltage once with no mode changes", why: "FPT exercises control logic across operating modes." },
      { text: "Be improvised onsite without documentation", why: "Scripts must be repeatable and documented." },
      { text: "Exclude alarm and safeties verification", why: "Safeties and alarms are critical FPT elements." },
    ],
    "FPT demonstrates integrated system performance under realistic conditions.",
    "medium"
  ),
  makeQ(
    "Retrocommissioning (RCx) differs from new construction Cx because RCx:",
    "Focuses on existing buildings with degraded performance and often lacks complete as-built documentation",
    [
      { text: "Never includes functional testing", why: "RCx relies heavily on testing and trend analysis." },
      { text: "Occurs only before design begins on new shells", why: "RCx targets operating existing buildings." },
      { text: "Eliminates the need for any OPR document", why: "RCx still defines current performance requirements." },
    ],
    "RCx discovers as-built conditions and corrects operational drift.",
    "medium"
  ),
  makeQ(
    "The commissioning authority (CxA) should be:",
    "Independent of design and construction contract line items that create conflicts of interest",
    [
      { text: "Always the installing mechanical subcontractor only", why: "Self-commissioning reduces independent verification." },
      { text: "Excluded from witnessing any tests", why: "CxA witnesses key tests per the Cx plan." },
      { text: "Responsible for approving all change orders unilaterally", why: "Change orders follow owner/contract procedures." },
    ],
    "Independence preserves objective verification of owner requirements.",
    "hard"
  ),
  makeQ(
    "Issues log management during commissioning requires:",
    "Tracking deficiencies, responsible parties, resolution dates, and retest status",
    [
      { text: "Deleting issues after verbal promises without retest", why: "Open issues need documented closure and verification." },
      { text: "Ignoring repeat failures on the same component", why: "Repeat issues signal systemic problems." },
      { text: "Only logging aesthetic paint touch-ups", why: "Cx issues focus on performance and safety deficiencies." },
    ],
    "The issues log is the primary tool for closing commissioning gaps.",
    "easy"
  ),
  makeQ(
    "Pre-functional checklists (PFC) verify:",
    "Installation completeness and readiness before formal functional testing begins",
    [
      { text: "Final owner training is complete before equipment is installed", why: "Training typically follows successful testing." },
      { text: "Only landscaping irrigation heads", why: "PFCs target commissioned systems installation readiness." },
      { text: "That functional testing can be skipped if PFC passes", why: "PFC precedes but does not replace FPT." },
    ],
    "PFC catches installation defects early, saving retest time.",
    "medium"
  ),
  makeQ(
    "LEED fundamental commissioning requires:",
    "Design and construction review, OPR/BOD documentation, and systems verification for energy-related systems",
    [
      { text: "No commissioning on LEED projects", why: "LEED EA prerequisites/credits require commissioning scope." },
      { text: "Only enhanced commissioning with no fundamental tier", why: "Fundamental commissioning is the baseline LEED requirement." },
      { text: "Commissioning of only plumbing fixtures", why: "Fundamental Cx addresses HVAC, lighting controls, and related systems." },
    ],
    "LEED references ASHRAE Guideline 0 and project-specific OPR/BOD.",
    "medium"
  ),
  makeQ(
    "Enhanced commissioning under LEED may add:",
    "Design review of OPR/BOD, submittal review, and ongoing commissioning or monitoring requirements",
    [
      { text: "Elimination of all functional testing to save fees", why: "Enhanced Cx adds rigor, not less testing." },
      { text: "Only a single walk-through with no scripts", why: "Enhanced Cx expands review and verification scope." },
      { text: "Structural foundation redesign exclusively", why: "Enhanced Cx focuses on building systems performance." },
    ],
    "Enhanced Cx credit paths exceed fundamental commissioning scope.",
    "hard"
  ),
  makeQ(
    "TAB (testing, adjusting, and balancing) in commissioning:",
    "Provides airflow/waterflow measurements supporting but not replacing functional performance verification",
    [
      { text: "Eliminates all control sequence testing", why: "TAB confirms flows; FPT verifies control logic." },
      { text: "Replaces the need for OPR entirely", why: "OPR defines requirements TAB and Cx verify." },
      { text: "Is unrelated to HVAC commissioning", why: "TAB is a key input to successful HVAC FPT." },
    ],
    "Balanced systems are prerequisites for meaningful functional tests.",
    "medium"
  ),
  makeQ(
    "Seasonal or deferred commissioning is used when:",
    "Full-load or economizer modes cannot be demonstrated during initial turnover due to weather",
    [
      { text: "Owners want to skip all testing permanently", why: "Deferred tests are scheduled, not eliminated." },
      { text: "Systems are too new to ever need testing", why: "New systems still require verification at applicable conditions." },
      { text: "Only winter heating tests are needed on data centers in all climates", why: "Deferred items depend on which modes were not demonstrable initially." },
    ],
    "Deferred Cx items are tracked in the issues log until completed.",
    "medium"
  ),
  makeQ(
    "Training requirements in commissioning turnover include:",
    "Hands-on demonstrations for operators on normal, emergency, and seasonal operations",
    [
      { text: "Only emailing PDF manuals with no demonstration", why: "Effective training includes live system walkthroughs." },
      { text: "Training solely for commissioning agents, not owners", why: "Owner O&M staff are primary training recipients." },
      { text: "Eliminating O&M manuals to reduce paper", why: "O&M manuals remain essential turnover documents." },
    ],
    "Operator training supports persistence of commissioned performance.",
    "easy"
  ),
  makeQ(
    "Integrated systems testing in BCxP practice verifies:",
    "Interactions among HVAC, lighting, fire alarm, elevator, and other interlocked systems",
    [
      { text: "Only isolated components with no cross-system scenarios", why: "Integration failures occur at system boundaries." },
      { text: "Only carpet installation tolerances", why: "Integration testing addresses controls interlocks." },
      { text: "That fire alarm never affects HVAC", why: "Fire modes often command fans and dampers." },
    ],
    "Fire, smoke, and emergency modes are classic integrated test scenarios.",
    "hard"
  ),
  makeQ(
    "Monitoring-based commissioning (MBCx) extends RCx by:",
    "Using persistent analytics on trend data to detect and correct performance drift",
    [
      { text: "Eliminating all sensors after initial Cx", why: "MBCx depends on ongoing sensor and meter data." },
      { text: "Replacing operators with no alarms or dashboards", why: "MBCx supports operators with fault detection tools." },
      { text: "Conducting only one test at building permit", why: "MBCx is continuous, not a single event." },
    ],
    "MBCx maintains savings after initial retrocommissioning.",
    "hard"
  ),
  makeQ(
    "Submittal review during commissioning checks:",
    "Equipment and controls match BOD/OPR capacities, efficiencies, and sequences",
    [
      { text: "Only font choice on cover sheets", why: "Technical compliance is the review focus." },
      { text: "That submittals may ignore specified efficiencies", why: "Non-compliant equipment must be rejected or revised." },
      { text: "Only structural steel mill test reports for all trades", why: "Submittals are trade-specific; Cx reviews relevant systems." },
    ],
    "Early submittal rejection avoids field installation of wrong equipment.",
    "medium"
  ),
  makeQ(
    "Acceptance criteria in commissioning should be:",
    "Objective, measurable, and traceable to OPR performance metrics",
    [
      { text: "Subjective opinions without measurements", why: "Cx acceptance requires measurable pass/fail criteria." },
      { text: "Different for every test without documentation", why: "Criteria should be consistent and documented in plans." },
      { text: "Hidden from the owner until occupancy", why: "Owners approve OPR and related acceptance criteria." },
    ],
    "Measurable criteria prevent disputes at project closeout.",
    "medium"
  ),
  makeQ(
    "ASHRAE Standard 202 defines:",
    "The Commissioning Process for Buildings and Systems",
    [
      { text: "Only kitchen grease interceptor sizing", why: "Standard 202 is the commissioning process standard." },
      { text: "Refrigerant recovery technician licensing", why: "Refrigerant licensing is under EPA regulations." },
      { text: "Elevator traffic analysis methods only", why: "Elevator analysis is unrelated to Standard 202." },
    ],
    "Standard 202 codifies commissioning roles, deliverables, and phases.",
    "medium"
  ),
  makeQ(
    "A BCxP managing an issues log prioritizes:",
    "Safety, functional failures, and OPR non-compliance before minor documentation gaps",
    [
      { text: "Cosmetic label alignment only", why: "Life safety and functional issues take precedence." },
      { text: "Closing issues without retest to meet calendar", why: "Issues close only after verified correction." },
      { text: "Deleting historical issues each week", why: "Issue history supports accountability and trends." },
    ],
    "Risk-based prioritization aligns with owner safety and performance goals.",
    "medium"
  ),
  makeQ(
    "Commissioning specifications in Division 23/26 typically require:",
    "Contractors to support CxA access, provide TAB, attend tests, and correct deficiencies",
    [
      { text: "Contractors to block CxA site access", why: "Contracts must grant CxA access for verification." },
      { text: "No participation in functional testing", why: "Installing contractors support testing and fixes." },
      { text: "Elimination of all O&M data", why: "O&M submittals are required commissioning deliverables." },
    ],
    "Contract language enforces commissioning cooperation and deliverables.",
    "medium"
  ),
  // 26-50
  makeQ(
    "Recommissioning is performed when:",
    "A previously commissioned building needs re-verification after major renovations or prolonged performance drift",
    [
      { text: "A building has never had any systems installed", why: "Recommissioning assumes existing commissioned or operable systems." },
      { text: "Only before original construction begins", why: "That describes new construction commissioning." },
      { text: "Structural foundations are poured only", why: "Recommissioning addresses building systems operation." },
    ],
    "ReCx restores performance after changes or degradation.",
    "medium"
  ),
  makeQ(
    "CxA review of control sequences should reference:",
    "ASHRAE Guideline 36 or project-specific sequences aligned with OPR",
    [
      { text: "Random sequences with no basis of design", why: "Sequences must implement design intent and standards." },
      { text: "Only manual operator overrides permanently", why: "Automatic sequences should be verified during FPT." },
      { text: "Elimination of all economizer logic", why: "Economizers are often required for energy performance." },
    ],
    "Guideline 36 provides high-performance HVAC control sequence templates.",
    "hard"
  ),
  makeQ(
    "Domestic hot water commissioning tests should verify:",
    "Temperature control, recirculation, and legionella prevention strategies per design",
    [
      { text: "Only paint finish on water heaters", why: "Temperature and distribution performance are critical." },
      { text: "That hot water storage is eliminated on all projects", why: "Many designs use storage; testing verifies control." },
      { text: "No temperature measurement is needed", why: "Temperature limits are key acceptance criteria." },
    ],
    "DHW systems affect energy, safety, and code compliance.",
    "medium"
  ),
  makeQ(
    "Electrical commissioning scope may include:",
    "ATS transfer tests, UPS ride-through, and panel schedules matching submittals",
    [
      { text: "Only interior plant watering schedules", why: "Electrical Cx addresses power distribution and emergency power." },
      { text: "Skipping all emergency generator tests", why: "Emergency power verification is critical." },
      { text: "No coordination with mechanical interlocks", why: "Electrical Cx often integrates with HVAC/fire modes." },
    ],
    "Critical facilities require witnessed power system functional tests.",
    "medium"
  ),
  makeQ(
    "Hydronic system FPT should demonstrate:",
    "Pump staging, valve modulation, differential pressure control, and boiler/chiller enable logic",
    [
      { text: "Only static pressure at one idle pump", why: "FPT exercises control under multiple load conditions." },
      { text: "That balancing valves are fully closed permanently", why: "Closed valves prevent design flow to loads." },
      { text: "No interaction between primary and secondary loops", why: "Decoupled loops require staged integration testing." },
    ],
    "Hydronic FPT confirms pumping and production equipment coordinate properly.",
    "hard"
  ),
  makeQ(
    "Owner occupancy phase commissioning includes:",
    "Seasonal testing completion, warranty reviews, and post-occupancy trend evaluation",
    [
      { text: "Abandoning all issues at certificate of occupancy", why: "Occupancy phase closes deferred and warranty items." },
      { text: "Only architectural punch list with no systems", why: "Systems performance continues into occupancy phase." },
      { text: "Deleting all trend data on day one", why: "Post-occupancy trends verify sustained performance." },
    ],
    "Warranty phase Cx catches problems under real operating conditions.",
    "medium"
  ),
  makeQ(
    "A BCxP evaluating metering for MBCx should ensure:",
    "Meters have adequate accuracy, interval data access, and coverage of major end uses",
    [
      { text: "No metering because trends are optional always", why: "MBCx requires reliable measured data." },
      { text: "Only one annual utility bill with no intervals", why: "Analytics need interval trend resolution." },
      { text: "Meters shared with unrelated tenants without allocation", why: "Clear metering boundaries are required for diagnostics." },
    ],
    "Good metering underpins fault detection and ongoing commissioning.",
    "hard"
  ),
  makeQ(
    "Smoke control commissioning requires:",
    "Witnessed tests of pressurization fans, dampers, and firefighter controls per code and design",
    [
      { text: "Only cosmetic ceiling tile replacement", why: "Life safety smoke control demands rigorous testing." },
      { text: "Skipping all damper position verification", why: "Damper failure defeats smoke control strategies." },
      { text: "No coordination with fire alarm inputs", why: "Fire alarm triggers smoke control modes." },
    ],
    "Code officials often witness smoke control acceptance tests.",
    "hard"
  ),
  makeQ(
    "Commissioning closeout documentation typically includes:",
    "Final Cx report, completed issues log, test scripts, as-built sequences, and training records",
    [
      { text: "Only verbal handshakes without records", why: "Closeout requires documented deliverables." },
      { text: "Deletion of all test scripts after one failure", why: "Scripts are retained as part of the record." },
      { text: "No training attendance records", why: "Training documentation proves operator readiness." },
    ],
    "Owners need complete records for operations and future RCx.",
    "easy"
  ),
  makeQ(
    "When CxA finds BOD contradicting OPR, the BCxP should:",
    "Facilitate owner and design team resolution before construction proceeds on conflicting requirements",
    [
      { text: "Ignore OPR because contractors prefer BOD only", why: "OPR is the owner's authoritative requirements document." },
      { text: "Delete OPR to match contractor preferences", why: "OPR should not be discarded silently." },
      { text: "Proceed with construction and test later without alignment", why: "Unresolved conflicts cause expensive rework." },
    ],
    "Early alignment prevents systems that cannot meet owner goals.",
    "medium"
  ),
  makeQ(
    "Factory witness testing may be required for:",
    "Critical custom equipment where site testing cannot reproduce design conditions",
    [
      { text: "All standard residential light switches only", why: "Factory witness is for critical custom assemblies." },
      { text: "Every paint sample in the lobby", why: "Factory tests target major custom mechanical/electrical skids." },
      { text: "Eliminating all site functional tests", why: "Site FPT still occurs after successful factory tests." },
    ],
    "Large chillers, generators, or custom AHUs may need factory verification.",
    "medium"
  ),
  makeQ(
    "Cx specifications often require contractors to provide:",
    "Temporary controls, test ports, and safe access for CxA during functional testing",
    [
      { text: "No access to mechanical rooms during tests", why: "CxA must witness tests safely on site." },
      { text: "Permanent removal of all gauges after TAB", why: "Test ports and gauges support verification and O&M." },
      { text: "Blocking all documentation submittals", why: "Documentation is a contractual deliverable." },
    ],
    "Contract support reduces delays during FPT scheduling.",
    "medium"
  ),
  makeQ(
    "A BCxP assessing economizer operation during FPT should test:",
    "Damper modulation, high-limit shutoff, and interlocks with mechanical cooling",
    [
      { text: "Only winter heating with dampers welded shut", why: "Economizer tests require favorable outdoor air conditions." },
      { text: "That economizers increase compressor energy always", why: "Proper economizers reduce mechanical cooling energy." },
      { text: "No linkage between OA dampers and relief fans", why: "Relief/exhaust coordination is part of economizer verification." },
    ],
    "Economizer failures are among the most common RCx findings.",
    "medium"
  ),
  makeQ(
    "Water treatment and chemistry in cooling towers affect commissioning by:",
    "Influencing heat transfer, fouling, and safe operation verified during performance testing",
    [
      { text: "Having no impact on chiller plant efficiency", why: "Fouling raises approach and chiller kW." },
      { text: "Eliminating all bleed and makeup controls", why: "Tower water management is essential for performance and health." },
      { text: "Replacing all HVAC controls testing", why: "Water treatment supports but does not replace controls FPT." },
    ],
    "Tower approach temperature is a commissioning acceptance metric.",
    "medium"
  ),
  makeQ(
    "BCxP leadership in meetings requires:",
    "Clear facilitation of action items, decisions, and accountability among stakeholders",
    [
      { text: "Avoiding all written minutes to save time", why: "Documented action items track commissioning progress." },
      { text: "Unilateral design changes without owner approval", why: "Owners approve requirement changes." },
      { text: "Limiting communication to one trade only", why: "Commissioning coordinates multiple disciplines." },
    ],
    "Process management is a core BCxP competency.",
    "easy"
  ),
  makeQ(
    "Renewable energy systems commissioning includes:",
    "Verifying inverters, protective relays, metering, and grid interconnection per design and utility requirements",
    [
      { text: "Only checking panel aesthetics on rooftops", why: "PV/renewable Cx includes electrical and performance verification." },
      { text: "Ignoring utility interconnection agreements", why: "Interconnection rules affect testing and energization." },
      { text: "Assuming generation with no meter verification", why: "Metering confirms production and safety functions." },
    ],
    "Renewables integrate with building electrical systems and codes.",
    "hard"
  ),
  makeQ(
    "Pneumatic controls legacy buildings in RCx often need:",
    "Calibration, receiver controller checks, and conversion planning to digital controls",
    [
      { text: "No maintenance because pneumatics never drift", why: "Pneumatic systems drift and leak over time." },
      { text: "Immediate demolition of all HVAC without assessment", why: "RCx corrects controls where economically feasible." },
      { text: "Only software patches on BMS with no field devices", why: "Field devices must be verified regardless of front-end software." },
    ],
    "Legacy controls are common RCx scope in older buildings.",
    "medium"
  ),
  makeQ(
    "BCxP exam cognitive levels include analysis tasks such as:",
    "Evaluating test results and recommending corrective actions for failed sequences",
    [
      { text: "Reciting staff directories only", why: "Exams test technical analysis, not directories." },
      { text: "Hand-drafting structural beam connections only", why: "Structural drafting is outside BCxP scope." },
      { text: "Memorizing refrigerant colors without application", why: "ASHRAE exams emphasize applied knowledge." },
    ],
    "BCxP tests recall, application, and analysis per the exam blueprint.",
    "easy",
    "d"
  ),
  makeQ(
    "Building envelope commissioning may verify:",
    "Air barrier continuity, fenestration performance, and infiltration control details",
    [
      { text: "Only carpet pile direction in offices", why: "Envelope Cx targets air and thermal boundary performance." },
      { text: "That all windows must remain operable year-round for economizer", why: "Envelope Cx is distinct from air-side economizer testing." },
      { text: "Structural rebar spacing exclusively", why: "Structural reinforcement is separate from envelope air barrier Cx." },
    ],
    "Envelope Cx prevents hidden infiltration and moisture failures.",
    "hard"
  ),
  makeQ(
    "Trend log review before FPT helps the CxA:",
    "Identify overrides, sensor drift, and short-cycling that would fail functional tests",
    [
      { text: "Skip all testing because trends replace FPT", why: "Trends inform but do not replace witnessed FPT." },
      { text: "Ignore alarm history entirely", why: "Alarms highlight faults to resolve pre-test." },
      { text: "Only review landscaping water use", why: "HVAC and controls trends are primary Cx diagnostics." },
    ],
    "Pre-FPT analytics reduce retest cycles.",
    "medium"
  ),
  makeQ(
    "Warranty phase commissioning follow-up typically occurs:",
    "Within 10–12 months after occupancy to catch seasonal and operational issues",
    [
      { text: "Only before design development begins", why: "Warranty follow-up is post-occupancy." },
      { text: "Never, because warranties eliminate all defects", why: "Warranties do not replace performance verification." },
      { text: "50 years after demolition", why: "Follow-up occurs during the warranty period." },
    ],
    "Seasonal modes often require warranty-phase retesting.",
    "medium"
  ),
  makeQ(
    "BCxP professionals renewing certification must earn:",
    "Professional Development Hours (PDHs) per the credential renewal requirements",
    [
      { text: "No continuing education of any kind", why: "ASHRAE certifications require PDHs for renewal." },
      { text: "Only social media posts about projects", why: "PDHs require qualified professional development activities." },
      { text: "A separate EPA 608 universal license automatically", why: "EPA refrigerant licensing is unrelated to BCxP renewal." },
    ],
    "BCxP renewal requires 50 PDHs per 3-year cycle (verify current guidebook).",
    "easy"
  ),
  makeQ(
    "Fire alarm integration testing with HVAC must confirm:",
    "Fans, dampers, and elevators respond correctly without conflicting normal control",
    [
      { text: "HVAC ignores all fire alarm signals by design", why: "Fire modes command specific HVAC responses." },
      { text: "Only strobe light colors in corridors", why: "Integration testing addresses system responses, not aesthetics." },
      { text: "Elevators never interact with fire systems", why: "Fire recall is a standard integration test item." },
    ],
    "Failed integration can violate life safety code requirements.",
    "hard"
  ),
  makeQ(
    "A commissioning risk to owners if Cx is deferred to construction only is:",
    "Design errors become field changes with higher cost and schedule impact",
    [
      { text: "Earlier identification of OPR gaps at bid time", why: "Late Cx misses design-phase correction opportunities." },
      { text: "Lower change order rates automatically", why: "Late discovery typically increases change orders." },
      { text: "Guaranteed elimination of all TAB needs", why: "TAB remains necessary regardless of Cx timing." },
    ],
    "Early Cx is most cost-effective per Guideline 0 and Standard 202.",
    "medium"
  ),
  makeQ(
    "OPR workshops facilitated by the CxA should:",
    "Engage owner stakeholders to define measurable performance criteria before design advances",
    [
      { text: "Exclude owners so contractors can set requirements alone", why: "OPR expresses owner requirements, not contractor preferences." },
      { text: "Finalize OPR after construction is complete only", why: "OPR must guide design and commissioning from early phases." },
      { text: "Avoid documenting any performance metrics", why: "OPR criteria must be measurable for verification." },
    ],
    "Early OPR workshops align the project team on success criteria.",
    "easy"
  ),
];
