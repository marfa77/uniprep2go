#!/usr/bin/env python3
"""ACE CPT — 60 curated MCQs (4×15)."""
from write_helper import write_bank

SLUG = "ace-cpt-readiness-check"

topics = {
    "client-interview": [
        (
            "The primary purpose of a preparticipation health screening is to:",
            "Identify health risks and determine whether medical clearance or modifications are needed before exercise",
            [
                "Replace all physician care forever",
                "Guarantee injury-free training",
                "Set the client's tax bracket",
            ],
            "Screening tools (e.g., PAR-Q+/ACS M guidance concepts) flag risk factors and clearance needs.",
            [
                "Trainers do not replace medical care.",
                "Screening reduces—not eliminates—risk.",
                "Taxes are unrelated to screening.",
            ],
            "easy",
        ),
        (
            "Informed consent for training should include:",
            "Explanation of procedures, risks/benefits, and voluntary participation with opportunity for questions",
            [
                "A promise of specific weight-loss amounts as a contract guarantee",
                "Hidden clauses the client may not read",
                "Permission to ignore all medical advice",
            ],
            "Consent is about understanding and agreeing to participate—not outcome guarantees or ignoring medicine.",
            [
                "Outcome guarantees are inappropriate and risky.",
                "Transparency is required.",
                "Medical advice remains with clinicians.",
            ],
            "easy",
        ),
        (
            "A client reports chest pain during exertion. The safest immediate action is to:",
            "Stop exercise and advise seeking urgent medical evaluation as appropriate",
            [
                "Increase intensity to 'push through'",
                "Ignore symptoms and finish the workout",
                "Diagnose a heart attack and prescribe medication",
            ],
            "Red-flag symptoms require stopping activity and medical referral—not diagnosis or intensification.",
            [
                "Pushing through chest pain is dangerous.",
                "Ignoring red flags is negligent.",
                "Trainers do not diagnose or prescribe.",
            ],
            "easy",
        ),
        (
            "SMART goals are:",
            "Specific, Measurable, Attainable, Relevant, and Time-bound",
            [
                "Secret, Magical, Arbitrary, Random, Temporary",
                "Only about maximum one-rep records",
                "Unrelated to behavior change",
            ],
            "SMART structure improves adherence and progress tracking in behavior-change coaching.",
            [
                "Vague/magical goals undermine planning.",
                "Goals can include health behaviors, not only 1RM.",
                "Goal setting is central to behavior change.",
            ],
            "easy",
        ),
        (
            "Lifestyle and health-history interviews should prioritize:",
            "Open-ended questions about activity, medical history, medications, and preferences",
            [
                "Only closed yes/no questions about favorite celebrities",
                "Skipping medications because they never matter",
                "Publicly posting answers online",
            ],
            "Comprehensive history informs program safety and personalization; confidentiality applies.",
            [
                "Relevant health/activity data matter more than celebrities.",
                "Medications can affect exercise response.",
                "Health data are confidential.",
            ],
            "medium",
        ),
        (
            "Resting heart rate assessment is typically taken:",
            "After the client has been seated/resting quietly for several minutes",
            [
                "Immediately after a sprint",
                "While the client holds breath maximally",
                "During a heavy deadlift set",
            ],
            "True resting values require quiet rest; post-exercise rates are elevated.",
            [
                "Sprints elevate HR.",
                "Breath-holds alter readings.",
                "Lifting elevates HR.",
            ],
            "easy",
        ),
        (
            "BMI is best described as:",
            "A height-weight screening index that does not directly measure body composition",
            [
                "A direct measure of visceral fat via X-ray",
                "A VO2max test",
                "A flexibility score",
            ],
            "BMI categorizes weight relative to height but cannot distinguish muscle vs fat.",
            [
                "Imaging/other tools assess fat more directly.",
                "VO2max is cardiorespiratory fitness.",
                "Flexibility is ROM-related.",
            ],
            "medium",
        ),
        (
            "Motivational interviewing emphasizes:",
            "Evoking the client's own reasons for change with empathy and collaboration",
            [
                "Confronting the client as lazy until they comply",
                "Lecturing without listening",
                "Setting all goals without client input",
            ],
            "MI uses OARS-style listening to resolve ambivalence rather than arguing for change.",
            [
                "Confrontation often increases resistance.",
                "Listening is core.",
                "Autonomy support improves adherence.",
            ],
            "medium",
        ),
        (
            "A client on beta-blockers may show:",
            "Blunted heart-rate response, so RPE and talk-test cues become more important",
            [
                "Guaranteed higher max HR than predicted",
                "No need for any intensity monitoring",
                "Immunity to dehydration",
            ],
            "Beta-blockers lower HR response; use alternative intensity gauges and clinical guidance.",
            [
                "HR is typically reduced, not elevated.",
                "Monitoring remains essential.",
                "Hydration still matters.",
            ],
            "hard",
        ),
        (
            "Anthropometric measures (girths, skinfolds when trained) are used to:",
            "Track body-composition-related changes over time as part of assessment",
            [
                "Diagnose cancer",
                "Replace ECG stress testing always",
                "Determine IQ",
            ],
            "Girths/skinfolds estimate composition trends; they are not medical diagnostics.",
            [
                "Medical diagnosis is outside scope.",
                "Cardiac testing is a medical domain.",
                "IQ is unrelated.",
            ],
            "easy",
        ),
        (
            "When collecting a client's blood pressure, the cuff should be:",
            "Properly sized and placed on the upper arm at heart level with the client seated and supported",
            [
                "Placed over thick clothing on the thigh while standing and talking loudly",
                "Inflated once and left on for the entire session",
                "Used on an unsupported arm dangling while the client crosses legs tightly if that is convenient",
            ],
            "Accurate BP needs correct cuff size/position, quiet seated posture, and supported arm.",
            [
                "Poor placement and talking distort readings.",
                "Prolonged inflation is inappropriate.",
                "Unsupported/crossed-leg positions can alter readings.",
            ],
            "medium",
        ),
        (
            "A positive risk factor commonly considered in CVD risk profiling is:",
            "Current cigarette smoking (or recent quit within defined timeframes used by guidelines)",
            [
                "Regular moderate exercise only",
                "HDL cholesterol that is high (protective)",
                "Youthful age with no other risks always",
            ],
            "Smoking is a major modifiable CVD risk factor; high HDL is often a negative risk factor.",
            [
                "Exercise is protective.",
                "High HDL is favorable.",
                "Age/risk still depend on full profile.",
            ],
            "medium",
        ),
        (
            "Rapport-building in the first session should focus on:",
            "Listening, clarifying expectations, and creating a supportive nonjudgmental climate",
            [
                "Immediate maximal testing to exhaustion without screening",
                "Criticizing the client's past failures",
                "Selling supplements before assessing needs",
            ],
            "Trust and clarity precede aggressive testing or product pitches.",
            [
                "Exhaustive testing without screening is unsafe.",
                "Judgment harms adherence.",
                "Needs assessment comes before sales.",
            ],
            "easy",
        ),
        (
            "If a client discloses an eating disorder history, the trainer should:",
            "Stay within scope, avoid prescribing diets as treatment, and refer to qualified clinicians as appropriate",
            [
                "Design extreme restriction plans to 'fix' the disorder",
                "Ignore medical/mental-health referrals",
                "Publicly discuss the disclosure with other clients",
            ],
            "Eating disorders require clinical care; trainers support safe movement within interdisciplinary plans.",
            [
                "Extreme restriction can worsen disorders.",
                "Referral is appropriate.",
                "Confidentiality applies.",
            ],
            "hard",
        ),
        (
            "The talk test as an intensity gauge suggests moderate aerobic work when the client can:",
            "Speak in sentences but not sing comfortably",
            [
                "Only gasp single words at most",
                "Lecture continuously with no breathing change",
                "Hold a conversation underwater",
            ],
            "Talk-test zones approximate moderate vs vigorous effort without needing HR tech.",
            [
                "Gasping suggests vigorous/near-max effort.",
                "No breathing change suggests very light effort.",
                "Underwater talk is not a valid field cue.",
            ],
            "easy",
        ),
    ],
    "program-design": [
        (
            "The FITT-VP principle includes:",
            "Frequency, Intensity, Time, Type, Volume, and Progression",
            [
                "Fashion, Instagram, Trends, Trends again",
                "Only one variable: maximum weight",
                "Food, Ice cream, Tea, Toast",
            ],
            "FITT-VP organizes aerobic/resistance prescription variables systematically.",
            [
                "Social trends are not prescription variables.",
                "Multiple variables matter.",
                "Nutrition acronyms differ.",
            ],
            "easy",
        ),
        (
            "For healthy adults, moderate aerobic activity recommendations commonly target about:",
            "150 minutes per week of moderate-intensity (or 75 vigorous), plus muscle-strengthening on 2+ days",
            [
                "Zero minutes of activity ever",
                "20 hours of continuous vigorous exercise daily",
                "Strength training once per decade",
            ],
            "Public-health style targets (ACS M/HHS concepts) guide minimum effective doses with progression.",
            [
                "Inactivity raises health risk.",
                "Extreme daily volumes risk overtraining/injury.",
                "Twice-weekly strength is a common minimum target.",
            ],
            "easy",
        ),
        (
            "Progressive overload means:",
            "Gradually increasing training stress so fitness continues to adapt",
            [
                "Doing the exact same easy workout forever",
                "Jumping load by 100% every session",
                "Avoiding all recovery days always",
            ],
            "Small, planned increases in load/volume/complexity drive adaptation without reckless spikes.",
            [
                "No overload stalls progress.",
                "Huge jumps raise injury risk.",
                "Recovery enables adaptation.",
            ],
            "easy",
        ),
        (
            "A beginner resistance program often starts with:",
            "Full-body sessions 2–3 days/week emphasizing major movements and technique",
            [
                "Advanced competition peaking with daily one-rep maxes",
                "Only isolation of one forearm muscle forever",
                "No instruction on form",
            ],
            "Novices need frequency for learning, compound patterns, and coaching—not elite peaking.",
            [
                "Daily maxing is inappropriate for beginners.",
                "Balanced programs train major muscle groups.",
                "Form instruction is essential.",
            ],
            "medium",
        ),
        (
            "Specificity principle states that:",
            "Adaptations are specific to the muscles, energy systems, and skills trained",
            [
                "Any random activity improves all sports equally",
                "Stretching alone maximizes VO2max",
                "Bench press automatically improves marathon economy",
            ],
            "Train the qualities you want to improve; transfer is limited across dissimilar tasks.",
            [
                "Random training yields random adaptations.",
                "Stretching is flexibility-specific.",
                "Upper-body strength ≠ running economy automatically.",
            ],
            "easy",
        ),
        (
            "Periodization organizes training into:",
            "Planned cycles (macro/meso/microcycles) that vary volume and intensity",
            [
                "Random daily chaos with no plan",
                "Identical sessions forever without review",
                "Only competition days without preparation",
            ],
            "Periodized plans manage fatigue and peak performance through structured variation.",
            [
                "Chaos increases injury/plateau risk.",
                "Stagnation occurs without planned change.",
                "Preparation phases matter.",
            ],
            "medium",
        ),
        (
            "For fat-loss clients, a sustainable approach typically combines:",
            "Caloric deficit via nutrition habits plus resistance training and adequate protein, with sustainable cardio",
            [
                "Zero protein and no strength training",
                "Sleep deprivation as the main strategy",
                "Dehydration contests",
            ],
            "Preserving muscle with resistance training and protein while managing energy intake is evidence-aligned.",
            [
                "Protein/strength protect lean mass.",
                "Sleep supports recovery/hormones.",
                "Dehydration is dangerous and not fat loss.",
            ],
            "medium",
        ),
        (
            "Rest intervals for strength (high load, low reps) are typically:",
            "Longer (often ~2–5 minutes) to restore performance between sets",
            [
                "Zero seconds always",
                "Exactly 3 seconds regardless of goal",
                "Only rest between mesocycles, never sets",
            ],
            "Heavy strength work needs more recovery than muscular endurance circuits.",
            [
                "No rest impairs load quality.",
                "Rest should match the goal.",
                "Intrasession rest matters.",
            ],
            "medium",
        ),
        (
            "Aerobic base building emphasizes:",
            "Accumulating time at sustainable intensities before high volumes of HIIT",
            [
                "Only all-out sprints from day one for deconditioned clients",
                "No warm-up ever",
                "Avoiding any walking",
            ],
            "Deconditioned clients need gradual aerobic development; excessive early HIIT raises risk.",
            [
                "All-out work is advanced/conditional.",
                "Warm-ups prepare tissues/systems.",
                "Walking is valid aerobic training.",
            ],
            "easy",
        ),
        (
            "The SAID principle stands for:",
            "Specific Adaptation to Imposed Demands",
            [
                "Sudden Athletic Injury Denial",
                "Strength And Instant Diet",
                "Slow Always Ineffective Design",
            ],
            "SAID restates specificity: the body adapts to the demands placed on it.",
            [
                "Not an injury acronym.",
                "Not a diet slogan.",
                "Slow progress can still be effective design.",
            ],
            "easy",
        ),
        (
            "For older adults, program design should often emphasize:",
            "Balance, power (safely), strength, and fall-prevention patterns with medical considerations",
            [
                "Only maximal Olympic lifts on day one without screening",
                "Complete avoidance of all resistance training",
                "Ignoring balance work",
            ],
            "Aging clients benefit from strength/power/balance; screening and progression remain critical.",
            [
                "Unscreened max lifts are risky.",
                "Resistance training is highly beneficial when dosed well.",
                "Balance training reduces fall risk.",
            ],
            "medium",
        ),
        (
            "Supersets are:",
            "Performing two exercises in sequence with little rest between them",
            [
                "Eating two dinners",
                "Skipping both warm-up and cool-down",
                "A type of blood test",
            ],
            "Supersets manipulate density; antagonist or unrelated pairings are common.",
            [
                "Nutrition is separate.",
                "Warm-up/cool-down remain important.",
                "Not a lab test.",
            ],
            "easy",
        ),
        (
            "A deload week is used to:",
            "Reduce volume/intensity temporarily to manage fatigue and promote recovery",
            [
                "Increase load beyond all previous maxes immediately",
                "Stop all protein intake",
                "Test one-rep maxes daily",
            ],
            "Strategic unloading consolidates gains and reduces overreaching risk.",
            [
                "Deload is reduction, not peaking load.",
                "Nutrition support continues.",
                "Daily max testing is opposite of deload.",
            ],
            "medium",
        ),
        (
            "When designing for a client with hypertension (cleared to exercise), prefer:",
            "Aerobic training and avoid breath-holding/Valsalva under heavy loads without guidance",
            [
                "Maximal isometric holds with breath-holding as the only mode",
                "No physician communication when red flags appear",
                "Very hot yoga to replace all meds without clinician input",
            ],
            "Aerobic work helps BP; Valsalva can spike pressure—coordinate with medical guidance.",
            [
                "Breath-hold isometrics can raise BP sharply.",
                "Red flags need medical coordination.",
                "Trainers do not replace medication decisions.",
            ],
            "hard",
        ),
        (
            "Exercise order in a resistance session usually prioritizes:",
            "Large multi-joint lifts before small isolation work when both are in the plan",
            [
                "Wrist curls before all squats always for athletes",
                "Random order with no fatigue consideration",
                "Only machines that isolate calves first forever",
            ],
            "Freshness for complex, high-demand lifts improves quality and safety.",
            [
                "Small muscles first can fatigue stabilizers needed for big lifts.",
                "Order should be intentional.",
                "Program goals may vary, but general rule favors compounds first.",
            ],
            "easy",
        ),
    ],
    "instruction": [
        (
            "A clear exercise cue for a squat often includes:",
            "Brace the core, sit hips back/down, keep heels grounded, and track knees with toes",
            [
                "Round the lumbar spine aggressively under load",
                "Rise onto the toes and collapse knees inward maximally",
                "Hold breath and jerk the bar from the floor with a flexed spine",
            ],
            "Neutral spine, hip hinge/sit pattern, and knee tracking are foundational squat cues.",
            [
                "Loaded lumbar flexion is risky.",
                "Heel lift and knee collapse reduce stability.",
                "Poor setup increases injury risk.",
            ],
            "easy",
        ),
        (
            "Spotting a bench press should prioritize:",
            "Agreed lift-off/hand-off, attentive readiness at the bar, and assisted racking if failure occurs",
            [
                "Looking at a phone until the bar drops",
                "Pulling the bar sideways unpredictably",
                "Standing far away out of reach",
            ],
            "Effective spotting is preplanned, attentive, and positioned to assist safely.",
            [
                "Distraction fails the spotter role.",
                "Sideways pulls destabilize the lift.",
                "Distance prevents timely help.",
            ],
            "easy",
        ),
        (
            "Kinesthetic learning is supported when the trainer:",
            "Uses hands-on (consented) positioning and lets the client feel correct movement patterns",
            [
                "Only emails PDFs without practice",
                "Never allows practice reps",
                "Avoids all demonstration and feedback",
            ],
            "Learning styles vary; practice with feedback builds motor patterns—consent for touch is required.",
            [
                "Reading alone is insufficient for skill.",
                "Practice is essential.",
                "Demo/feedback accelerate learning.",
            ],
            "medium",
        ),
        (
            "Feedback that is most useful early in skill learning is often:",
            "Immediate, specific, and focused on one or two key corrections",
            [
                "Delayed by a month with 20 simultaneous cues",
                "Only sarcasm",
                "No feedback at all",
            ],
            "Novices benefit from timely, limited cues; cue overload confuses motor learning.",
            [
                "Delayed overload overwhelms.",
                "Sarcasm harms rapport.",
                "Feedback guides improvement.",
            ],
            "medium",
        ),
        (
            "A proper warm-up generally includes:",
            "General increase in temperature/blood flow plus movement-specific prep",
            [
                "Maximal loads with no pulse elevation",
                "Static stretching only for 30 minutes then max lifts with cold muscles always",
                "Skipping warm-up to save time for PR attempts",
            ],
            "Warm-ups prepare tissues and nervous system for the session's demands.",
            [
                "Cold maximal loading raises risk.",
                "Long static-only warm-ups may not prep dynamic tasks.",
                "Skipping warm-up for PRs is poor practice.",
            ],
            "easy",
        ),
        (
            "When teaching a hip hinge (deadlift pattern), a useful drill is:",
            "Dowel rod along head-back-sacrum to maintain neutral spine while pushing hips back",
            [
                "Rounding to touch toes with a heavy barbell immediately",
                "Squatting only with toes elevated and knees shooting far past without cueing hips",
                "Pressing overhead exclusively",
            ],
            "Dowel feedback teaches hinge vs squat distinction and spinal position.",
            [
                "Loaded flexion is not the teaching progression.",
                "That describes a different pattern/error.",
                "Overhead press is a different pattern.",
            ],
            "medium",
        ),
        (
            "Regression of an exercise means:",
            "Simplifying the movement to match the client's current ability",
            [
                "Always adding load regardless of form",
                "Making the movement harder immediately",
                "Removing all coaching",
            ],
            "Regressions (e.g., incline push-up) preserve stimulus while protecting technique/safety.",
            [
                "Load without form is unsafe progression.",
                "Harder is progression/advancement.",
                "Coaching remains necessary.",
            ],
            "easy",
        ),
        (
            "Mirror and video feedback help clients by:",
            "Providing external visual information about position and path",
            [
                "Replacing the need for any verbal safety cues",
                "Guaranteeing perfect form without practice",
                "Measuring blood lactate automatically",
            ],
            "External feedback tools augment—not replace—instruction and practice.",
            [
                "Safety cues still matter.",
                "Practice is still required.",
                "Lactate needs lab/sensors.",
            ],
            "easy",
        ),
        (
            "During a first-time cable row, the trainer should emphasize:",
            "Scapular control, neutral spine, and controlled tempo without using momentum",
            [
                "Jerking with lumbar extension every rep",
                "Shrugging ears to shoulders and holding breath maximally",
                "Locking elbows in hyperextension at the finish with no scapular motion",
            ],
            "Rows train scapular retraction/depression with torso stability—not momentum cheating.",
            [
                "Lumbar jerking is compensatory.",
                "Elevated shoulders and breath-holding are common faults.",
                "Elbow/scapula sequencing matters for the intended pattern.",
            ],
            "medium",
        ),
        (
            "Group instruction safety includes:",
            "Clear demos, space management, regressions/progressions, and scanning the room",
            [
                "Turning away from the class for long periods",
                "One advanced move only with no options",
                "Encouraging competition to ignore pain signals",
            ],
            "Inclusive, attentive group leadership reduces injury and dropout.",
            [
                "Visual supervision is required.",
                "Options serve mixed abilities.",
                "Pain signals need respect.",
            ],
            "easy",
        ),
        (
            "Corrective exercise prioritization often starts with:",
            "Addressing mobility/stability limitations that impair the desired pattern before loading heavily",
            [
                "Maximal loading of a dysfunctional pattern",
                "Ignoring pain during movement screens",
                "Only Olympic lifts for every limitation",
            ],
            "Clean patterns before heavy load; screen findings guide regressions and mobility work.",
            [
                "Loading dysfunction reinforces poor patterns.",
                "Pain warrants modification/referral.",
                "Not every client needs Olympic lifts.",
            ],
            "hard",
        ),
        (
            "Breathing cue for bracing under load typically involves:",
            "Creating 360° abdominal pressure (brace) while maintaining a neutral spine",
            [
                "Fully relaxing the core on heavy lifts",
                "Hyperventilating for two minutes then lifting dizzy",
                "Holding a full Valsalva while walking around the gym between sets",
            ],
            "Intra-abdominal pressure supports the spine; chronic improper Valsalva needs coaching caution (BP).",
            [
                "Core relaxation under heavy load is unsafe.",
                "Dizziness increases fall/injury risk.",
                "Breath-hold walking is unnecessary and risky.",
            ],
            "medium",
        ),
        (
            "A client cannot perform a full push-up with good form. Best next step:",
            "Regress to incline or knee push-ups while coaching scapular and trunk control",
            [
                "Add a weighted vest immediately",
                "Have them bounce chest off the floor for reps",
                "Abandon upper-body training entirely",
            ],
            "Meet the client where they are; build capacity with regressions.",
            [
                "Added load worsens form breakdown.",
                "Bouncing is poor control and risky.",
                "Upper body can still be trained with regressions.",
            ],
            "easy",
        ),
        (
            "Cool-downs are useful to:",
            "Gradually lower intensity and support transition out of hard work (and may include light movement/flexibility)",
            [
                "Spike intensity to a new max at the end",
                "Skip hydration after sweaty sessions",
                "Replace sleep",
            ],
            "Gradual downshift aids comfort and routine; hydration and sleep remain separate recovery pillars.",
            [
                "Ending with a new max defeats cool-down.",
                "Rehydration matters.",
                "Sleep is not replaced by cool-down.",
            ],
            "easy",
        ),
        (
            "When a client reports sharp joint pain during a movement, the trainer should:",
            "Stop or modify the movement and assess; refer if pain persists or red flags appear",
            [
                "Add load to 'work through' sharp pain",
                "Diagnose a tear and prescribe anti-inflammatories",
                "Mock the client for being soft",
            ],
            "Sharp pain is a stop/modify signal; diagnosis and meds are outside trainer scope.",
            [
                "Loading into sharp pain is unsafe.",
                "Diagnosis/prescription exceed scope.",
                "Respect builds trust and safety.",
            ],
            "easy",
        ),
    ],
    "professional": [
        (
            "ACE CPT scope of practice generally allows:",
            "Designing exercise programs for apparently healthy clients and those cleared to exercise, within certification bounds",
            [
                "Diagnosing diseases and prescribing drugs",
                "Providing psychotherapy for trauma",
                "Performing invasive medical procedures",
            ],
            "Trainers coach exercise and lifestyle habits within scope; medicine and therapy require other licenses.",
            [
                "Diagnosis/Rx are medical.",
                "Psychotherapy requires clinical licensure.",
                "Invasive procedures are clinical.",
            ],
            "easy",
        ),
        (
            "A conflict of interest example is:",
            "Pushing a supplement you earn commission on without disclosing the financial relationship",
            [
                "Referring to a physician when red flags appear",
                "Documenting sessions accurately",
                "Maintaining CPR/AED certification",
            ],
            "Undisclosed financial incentives can bias recommendations; transparency and ethics matter.",
            [
                "Medical referral is ethical.",
                "Documentation is professional.",
                "Emergency credentials are expected.",
            ],
            "medium",
        ),
        (
            "Professional liability insurance for trainers is important because it:",
            "Helps protect against claims arising from professional services",
            [
                "Replaces the need for any screening",
                "Makes unsafe practices legal",
                "Guarantees clients never get injured",
            ],
            "Insurance manages residual risk; it does not excuse negligence or replace standards of care.",
            [
                "Screening remains required.",
                "Illegality/negligence standards still apply.",
                "No guarantee of zero injury.",
            ],
            "easy",
        ),
        (
            "Client records should be:",
            "Accurate, confidential, and stored securely for an appropriate retention period",
            [
                "Left in the open lobby for anyone",
                "Posted to social media highlight reels with private metrics",
                "Falsified to hide no-shows",
            ],
            "Documentation supports continuity and legal protection; privacy laws/ethics apply.",
            [
                "Open records breach confidentiality.",
                "Private metrics need consent/privacy care.",
                "Falsification is unethical/illegal.",
            ],
            "easy",
        ),
        (
            "CPR/AED readiness means trainers should:",
            "Maintain current certification and know facility emergency action plans",
            [
                "Assume someone else will always handle emergencies",
                "Disable AEDs to avoid alarms",
                "Practice CPR only on conscious resisting clients for fun",
            ],
            "Emergency competence is a professional standard in fitness settings.",
            [
                "Personal readiness is required.",
                "AEDs must remain accessible/functional.",
                "CPR training uses manikins; never harm clients.",
            ],
            "easy",
        ),
        (
            "When advertising results, ethical practice requires:",
            "Truthful claims without guaranteeing specific outcomes or using misleading before/after tactics",
            [
                "Promising 30 lb loss in 7 days for everyone",
                "Using another client's photos without consent",
                "Claiming to cure diabetes with lunges",
            ],
            "Truth-in-advertising and consent protect clients and the profession's credibility.",
            [
                "Guarantees are misleading.",
                "Photo use needs consent.",
                "Disease cure claims are out of scope/false.",
            ],
            "medium",
        ),
        (
            "A client asks for a detailed meal plan to treat a medical condition. Best response:",
            "Stay in scope—offer general healthy-eating guidance and refer to an RD/physician for medical nutrition therapy",
            [
                "Prescribe a therapeutic ketogenic medical protocol as if licensed",
                "Tell them to stop all physician-ordered diets",
                "Provide IV vitamin therapy",
            ],
            "Medical nutrition therapy is for qualified clinicians; trainers give general guidelines only.",
            [
                "Therapeutic protocols exceed CPT scope.",
                "Never contradict medical orders casually.",
                "IV therapy is clinical.",
            ],
            "medium",
        ),
        (
            "Dual relationships become problematic when:",
            "Personal/financial entanglements impair objectivity or professional boundaries",
            [
                "You maintain clear session focus and boundaries",
                "You refer out when needed",
                "You document thoroughly",
            ],
            "Blurred roles (dating clients, improper business deals) risk exploitation and poor judgment.",
            [
                "Clear boundaries are appropriate.",
                "Referral is professional.",
                "Documentation supports care.",
            ],
            "hard",
        ),
        (
            "Continuing education for ACE-certified professionals is required to:",
            "Renew certification and stay current with evidence-based practice",
            [
                "Be optional forever with no renewal rules",
                "Only watch entertainment videos unrelated to fitness",
                "Avoid learning about new safety guidelines",
            ],
            "CE maintains competence and credential standing.",
            [
                "Renewal typically requires CE.",
                "CE must be relevant.",
                "Safety updates matter.",
            ],
            "easy",
        ),
        (
            "If a facility policy conflicts with safe practice, the trainer should:",
            "Advocate for safety, follow legal/ethical standards, and escalate appropriately rather than knowingly endanger clients",
            [
                "Knowingly run unsafe sessions to please management",
                "Hide incidents that occur",
                "Encourage clients to ignore medical clearances",
            ],
            "Client safety and ethics supersede pressure to cut corners.",
            [
                "Unsafe compliance is still unsafe.",
                "Incident honesty is required.",
                "Medical clearances protect clients.",
            ],
            "hard",
        ),
        (
            "Business practices for independent trainers should include:",
            "Clear contracts, pricing, cancellation policies, and scope boundaries in writing",
            [
                "Verbal-only forever with shifting fees weekly secretly",
                "No emergency contacts collected ever",
                "Sharing client passwords as a service",
            ],
            "Written agreements reduce disputes and clarify expectations.",
            [
                "Clarity prevents conflict.",
                "Emergency info is important.",
                "Password sharing is a security/privacy violation.",
            ],
            "medium",
        ),
        (
            "Cultural competence in training means:",
            "Respecting diverse values, adapting communication, and avoiding stereotypes",
            [
                "Assuming one diet culture fits all clients",
                "Mocking religious dress in the gym",
                "Refusing interpreters/support when language is a barrier and policy allows help",
            ],
            "Inclusive practice improves adherence and trust across diverse populations.",
            [
                "Individualization beats assumptions.",
                "Respect is mandatory.",
                "Communication access supports care.",
            ],
            "medium",
        ),
        (
            "Social media posts of client transformations require:",
            "Explicit consent and respect for privacy/editable agreements",
            [
                "No consent if the trainer wants likes",
                "Tagging medical record numbers",
                "Sharing private weigh-ins in public stories by default",
            ],
            "Likeness and health information need permission; default public sharing is unethical.",
            [
                "Consent is required.",
                "MRNs are sensitive identifiers.",
                "Weigh-ins are private by default.",
            ],
            "easy",
        ),
        (
            "An ACE professional who suspects a colleague of sexual harassment of a client should:",
            "Follow reporting procedures to protect the client and uphold ethical standards",
            [
                "Join in the behavior",
                "Silence the client",
                "Destroy related records",
            ],
            "Protecting clients and reporting misconduct is an ethical duty.",
            [
                "Participation is misconduct.",
                "Silencing victims is unethical.",
                "Record destruction can be illegal.",
            ],
            "hard",
        ),
        (
            "Risk management in a training session includes:",
            "Screening, appropriate progression, equipment checks, and emergency readiness",
            [
                "Removing all waivers and consents",
                "Using broken cables because they are 'still fine'",
                "Leaving clients unsupervised on advanced Olympic lifts on day one",
            ],
            "Layered controls reduce foreseeable harm; waivers do not replace competence.",
            [
                "Consents/waivers are part of risk management.",
                "Broken equipment must be removed from service.",
                "Supervision and progression matter.",
            ],
            "easy",
        ),
    ],
}

def main() -> None:
    write_bank(SLUG, topics)


if __name__ == "__main__":
    main()
