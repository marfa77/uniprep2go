#!/usr/bin/env python3
"""NASM CPT readiness bank — 60Q."""

from write_helper import write_bank

# Row: (prompt, correct, wrongs[3], explanation, dist_notes[3], difficulty)

BASICS = [
    (
        "In the NASM OPT model, which phase emphasizes improving muscular endurance and stabilizing the kinetic chain?",
        "Phase 1: Stabilization Endurance",
        [
            "Phase 3: Muscular Development (Hypertrophy)",
            "Phase 4: Maximal Strength",
            "Phase 5: Power only",
        ],
        "Phase 1 focuses on endurance, neuromuscular efficiency, and core/joint stability before heavy loading.",
        [
            "Hypertrophy emphasizes muscle size with moderate-to-heavy loads.",
            "Maximal strength targets peak force production.",
            "Power blends strength and speed after foundational phases.",
        ],
        "easy",
    ),
    (
        "Which muscle is the primary agonist for hip extension?",
        "Gluteus maximus",
        ["Iliacus", "Rectus femoris (isolated hip flexion role)", "Anterior tibialis"],
        "Gluteus maximus is the primary hip extensor; iliopsoas/rectus femoris flex the hip; tibialis anterior dorsiflexes.",
        [
            "Iliacus is a hip flexor.",
            "Rectus femoris flexes the hip and extends the knee.",
            "Tibialis anterior acts at the ankle.",
        ],
        "easy",
    ),
    (
        "What plane of motion divides the body into left and right halves?",
        "Sagittal plane",
        ["Frontal (coronal) plane", "Transverse plane", "Scapular plane only"],
        "Sagittal = left/right; frontal = anterior/posterior; transverse = superior/inferior.",
        [
            "Frontal separates front and back.",
            "Transverse separates upper and lower.",
            "Scapular plane is a functional arm-elevation plane, not a cardinal body plane.",
        ],
        "easy",
    ),
    (
        "Which connective tissue attaches muscle to bone?",
        "Tendon",
        ["Ligament", "Bursa", "Meniscus only"],
        "Tendons connect muscle to bone; ligaments connect bone to bone; bursae reduce friction.",
        [
            "Ligaments stabilize joints bone-to-bone.",
            "Bursae are fluid sacs, not attachments.",
            "Menisci are fibrocartilage cushions in some joints.",
        ],
        "easy",
    ),
    (
        "Type I muscle fibers are best described as:",
        "Slow-twitch, fatigue-resistant fibers used heavily in endurance and postural work",
        [
            "Fast-twitch fibers specialized only for one-rep max lifts",
            "Non-contractile connective tissue",
            "Fibers that cannot use oxygen",
        ],
        "Type I fibers are oxidative and fatigue-resistant; Type II are faster and more fatigable.",
        [
            "Maximal power/force relies more on Type II fibers.",
            "Muscle fibers are contractile tissue.",
            "Type I fibers are highly oxidative.",
        ],
        "medium",
    ),
    (
        "Which structure is the functional unit of a skeletal muscle fiber?",
        "Sarcomere",
        ["Nephron", "Osteon", "Alveolus"],
        "Sarcomeres (actin/myosin arrangement between Z-lines) produce force; other units belong to kidney, bone, and lung.",
        [
            "Nephrons are kidney units.",
            "Osteons are bone structural units.",
            "Alveoli are gas-exchange units in lungs.",
        ],
        "medium",
    ),
    (
        "In OPT Phase 5 (Power), training typically pairs:",
        "A heavy strength exercise with a lighter, high-velocity power exercise for the same movement pattern",
        [
            "Only long slow distance cardio with no resistance",
            "Isometric holds exclusively at end range",
            "Complete rest from all lower-body work for 8 weeks",
        ],
        "Power phases use complex/contrast pairing of strength + explosive work after foundations are built.",
        [
            "Power is not aerobic-only programming.",
            "Isometrics alone do not develop rate of force development.",
            "Complete rest is not a power protocol.",
        ],
        "medium",
    ),
    (
        "Which muscle concentrically produces scapular retraction?",
        "Middle trapezius / rhomboids",
        ["Serratus anterior (primary protraction)", "Pectoralis minor only", "Upper trapezius elevation only"],
        "Middle trapezius and rhomboids retract the scapula; serratus anterior protracts/upwardly rotates.",
        [
            "Serratus anterior protracts the scapula.",
            "Pectoralis minor contributes to protraction/depression, not primary retraction.",
            "Upper trapezius mainly elevates/upwardly rotates.",
        ],
        "medium",
    ),
    (
        "What is the primary role of the transverse abdominis in core training?",
        "Provide deep local stabilization by increasing intra-abdominal pressure and bracing the lumbar spine",
        [
            "Serve as the primary prime mover for heavy spinal extension under load",
            "Replace the need for any hip musculature",
            "Act only as a respiratory muscle with no spinal role",
        ],
        "TrA is a local stabilizer that supports segmental control; global movers create larger trunk motions.",
        [
            "Erector spinae are major extensors.",
            "Hip musculature remains essential for force transfer.",
            "TrA contributes to both bracing and respiratory timing.",
        ],
        "hard",
    ),
    (
        "Which joint action occurs in the frontal plane at the shoulder?",
        "Abduction / adduction",
        ["Flexion / extension only", "Internal / external rotation only", "Pronation / supination of the forearm only"],
        "Shoulder abduction/adduction occur in the frontal plane; flexion/extension are sagittal; rotation is transverse.",
        [
            "Flexion/extension are sagittal-plane actions.",
            "Rotation occurs primarily in the transverse plane.",
            "Pronation/supination occur at the radioulnar joints.",
        ],
        "easy",
    ),
    (
        "According to the length–tension relationship, a muscle produces optimal force when:",
        "Actin and myosin have an optimal overlap (near resting length)",
        [
            "It is placed in extreme passive insufficiency with no overlap possible",
            "It is completely slack with sarcomeres fully bunched always",
            "The nervous system is turned off",
        ],
        "Force peaks near optimal sarcomere length; too short or too long reduces cross-bridge capacity.",
        [
            "Extreme stretch reduces overlap and force.",
            "Extreme shortening also reduces force capacity.",
            "Neural drive is required for voluntary force.",
        ],
        "hard",
    ),
    (
        "Which energy system supplies the majority of ATP for a maximal effort lasting about 8–12 seconds?",
        "ATP–PC (phosphagen) system",
        [
            "Oxidative system as the sole source",
            "Only beta-oxidation of fats",
            "Protein deamination exclusively",
        ],
        "Very short maximal efforts rely primarily on phosphagen stores; oxidative metabolism dominates longer work.",
        [
            "Oxidative pathways dominate longer-duration efforts.",
            "Fat oxidation is too slow for short maximal power.",
            "Protein is not the primary fuel for brief maximal efforts.",
        ],
        "medium",
    ),
    (
        "The agonist for a movement is best defined as the muscle that:",
        "Is the primary mover producing the desired joint action",
        ["Only opposes the movement (antagonist role)", "Only stabilizes without producing force", "Is always a Type I fiber exclusively"],
        "Agonists produce the main action; antagonists oppose; synergists assist; stabilizers control unwanted motion.",
        [
            "That describes the antagonist.",
            "Stabilizers control, but agonists create the primary action.",
            "Fiber type is independent of agonist/antagonist role.",
        ],
        "easy",
    ),
    (
        "In NASM terminology, which subsystem includes the deep longitudinal subsystem (DLS) concept?",
        "Global muscular subsystems that transfer force across the kinetic chain",
        [
            "Only the integumentary system",
            "Only the digestive tract musculature",
            "Cartilage-only connective tissue with no muscle",
        ],
        "Local and global muscular subsystems (including DLS, POS, AOS, LS) describe force transfer and stabilization roles.",
        [
            "Skin is not a muscular subsystem.",
            "GI smooth muscle is unrelated to OPT subsystems.",
            "Subsystem models include muscular linkages.",
        ],
        "hard",
    ),
    (
        "Which bone landmark is the insertion commonly associated with the biceps brachii?",
        "Radial tuberosity",
        ["Greater trochanter of the femur", "Medial malleolus", "Olecranon process only as the sole biceps insertion"],
        "Biceps brachii inserts primarily on the radial tuberosity and bicipital aponeurosis.",
        [
            "Greater trochanter is a hip landmark.",
            "Medial malleolus is distal tibia.",
            "Olecranon is the triceps insertion region.",
        ],
        "medium",
    ),
]

ASSESSMENT = [
    (
        "During an overhead squat assessment, excessive forward lean most commonly indicates overactivity of which muscles?",
        "Hip flexor complex and/or soleus (with possible underactivity of gluteus maximus/erectors depending on findings)",
        [
            "Only the deep neck flexors with no lower-body involvement",
            "Only the wrist extensors",
            "Only the tibialis anterior as the sole cause always",
        ],
        "Forward lean often relates to tight calves/hip flexors and weak posterior chain; interpret the whole kinetic chain.",
        [
            "Cervical findings alone do not explain trunk lean.",
            "Wrist muscles do not drive squat trunk angle.",
            "Tibialis anterior tightness is not the classic forward-lean driver.",
        ],
        "medium",
    ),
    (
        "Feet turning out in the overhead squat assessment most commonly suggests overactivity of:",
        "Soleus / lateral gastrocnemius and/or biceps femoris (short head) with underactive medial gastroc/medial hamstrings/gracilis/sartorius/popliteus as applicable",
        [
            "Only pectoralis major",
            "Only upper trapezius without lower extremity involvement",
            "Only the masseter",
        ],
        "Foot/ankle compensation patterns often involve lateral calf and biceps femoris overactivity.",
        [
            "Chest muscles do not turn the feet out.",
            "Upper trap relates more to shoulder elevation.",
            "Jaw muscles are unrelated.",
        ],
        "hard",
    ),
    (
        "What does a resting heart rate assessment primarily help a trainer establish?",
        "A baseline cardiorespiratory status and training intensity reference (with other metrics)",
        [
            "Exact 1RM squat without testing",
            "Body fat percentage by itself",
            "Bone mineral density",
        ],
        "RHR is a simple baseline; programming still needs goals, history, and other assessments.",
        [
            "Strength must be tested or estimated separately.",
            "Body composition needs other methods.",
            "BMD requires medical imaging.",
        ],
        "easy",
    ),
    (
        "Which assessment is most appropriate as a dynamic postural observation of the kinetic chain under load?",
        "Overhead squat assessment",
        ["Skinfold only", "Sit-and-reach only", "Resting blood pressure only"],
        "OHSA observes movement compensations; skinfolds/flexibility/BP provide other data types.",
        [
            "Skinfolds estimate adiposity.",
            "Sit-and-reach is flexibility-focused.",
            "BP is a vital sign, not a movement screen.",
        ],
        "easy",
    ),
    (
        "Knee valgus (knees cave in) during a squat commonly involves underactivity of:",
        "Gluteus medius / maximus (among other contributors)",
        ["Only wrist flexors", "Only deep neck flexors as the sole cause", "Only finger extensors"],
        "Knee valgus often pairs with weak hip abductors/external rotators and overactive adductors/TFL patterns.",
        [
            "Wrist flexors do not control knee frontal-plane motion.",
            "Neck flexors are not the primary knee-valgus drivers.",
            "Finger muscles are irrelevant here.",
        ],
        "medium",
    ),
    (
        "A PAR-Q+ is primarily used to:",
        "Screen for health risks and determine whether medical clearance or modified programming is needed before exercise",
        [
            "Measure VO2max in a laboratory",
            "Prescribe medications",
            "Replace informed consent entirely in all jurisdictions",
        ],
        "Preparticipation screening tools identify red flags; they do not replace clinical diagnosis or all legal forms.",
        [
            "VO2max requires metabolic testing.",
            "Trainers do not prescribe drugs.",
            "Consent/waiver processes remain separate requirements.",
        ],
        "easy",
    ),
    (
        "Which circumference measurement site is commonly used when estimating body composition with circumference formulas?",
        "Waist (among other sites depending on protocol)",
        ["Only the earlobe", "Only the toenail bed", "Only the scalp hairline"],
        "Waist, hip, neck, and limb sites appear in various circumference protocols; choose the protocol’s sites.",
        [
            "Earlobe is not a standard girth site for body-comp formulas.",
            "Toenails are not circumference sites.",
            "Hairline is not used for girth equations.",
        ],
        "easy",
    ),
    (
        "In a pushing assessment, shoulders elevating commonly indicates overactivity of:",
        "Upper trapezius / levator scapulae (with underactive mid/lower trapezius as applicable)",
        ["Only gluteus maximus", "Only gastrocnemius", "Only tibialis posterior"],
        "Scapular elevation compensations often involve upper trap/levator overactivity.",
        [
            "Glutes are hip extensors/stabilizers.",
            "Calves act at the ankle.",
            "Tibialis posterior supports the medial arch.",
        ],
        "medium",
    ),
    (
        "What is a key reason to assess blood pressure before vigorous exercise programming?",
        "Uncontrolled hypertension is a risk factor that may require medical clearance and intensity modification",
        [
            "BP has no relevance to exercise safety",
            "High BP always means the client should sprint intervals that day",
            "Low readings alone diagnose all cardiac disease",
        ],
        "Elevated BP can contraindicate or modify exercise; trainers refer as indicated.",
        [
            "BP is a core preparticipation vital.",
            "High BP warrants caution, not automatic HIIT.",
            "Diagnosis belongs to licensed clinicians.",
        ],
        "medium",
    ),
    (
        "The Rockport Walk Test is primarily used to estimate:",
        "Cardiorespiratory fitness (VO2-related estimate) from a timed 1-mile walk and heart rate",
        ["Maximal bench press 1RM", "Flexibility of the hamstrings only", "Bone density"],
        "Field walk tests estimate aerobic fitness without a full lab VO2 protocol.",
        [
            "Strength tests estimate muscular force.",
            "Flexibility needs ROM tests.",
            "BMD needs medical testing.",
        ],
        "medium",
    ),
    (
        "Lower crossed syndrome is classically associated with:",
        "Tight hip flexors and erector spinae with weak gluteus maximus and abdominals",
        [
            "Tight deep neck flexors and weak upper trapezius only",
            "Only weak finger flexors",
            "Perfectly balanced anterior and posterior chains always",
        ],
        "Janda’s lower crossed pattern: anterior pelvic tilt with the classic tight/weak pairings.",
        [
            "That pairing is closer to upper crossed ideas reversed/incorrect.",
            "Hand muscles are not the defining pattern.",
            "The syndrome is defined by imbalance.",
        ],
        "hard",
    ),
    (
        "When a client reports sharp joint pain during an assessment, the trainer should:",
        "Stop the painful movement and refer out / seek medical clearance as appropriate",
        [
            "Increase load to 'push through' sharp pain",
            "Ignore pain if the client is motivated",
            "Diagnose a ligament tear on the spot as a definitive medical diagnosis",
        ],
        "Sharp pain is a stop-and-refer cue; trainers do not diagnose injuries.",
        [
            "Sharp pain is not trained through.",
            "Motivation does not override safety.",
            "Diagnosis is outside CPT scope.",
        ],
        "easy",
    ),
    (
        "Davies test is primarily designed to assess:",
        "Upper-body agility and stabilization (reactive hand touches in plank)",
        ["Maximal deadlift strength", "Resting metabolic rate", "Visual acuity"],
        "Davies test challenges shoulder stability/agility in a plank position.",
        [
            "Max strength needs 1RM or estimated strength tests.",
            "RMR needs metabolic measurement.",
            "Vision is not a CPT motor test.",
        ],
        "hard",
    ),
    (
        "Which finding during single-leg squat assessment is a common compensation?",
        "Knee valgus / hip drop / trunk lean (depending on observation)",
        ["Perfect bilateral symmetry with no possible fault ever", "Only ear asymmetry", "Only fingernail length changes"],
        "SLS reveals frontal-plane control deficits at hip/knee and trunk strategies.",
        [
            "Compensations are common and informative.",
            "Ears are not the focus of SLS.",
            "Nails are irrelevant.",
        ],
        "medium",
    ),
    (
        "BMI is best described as:",
        "A height–weight ratio that estimates weight category risk but does not measure body fat directly",
        [
            "A direct gold-standard measure of visceral fat mass",
            "A strength index equal to 1RM",
            "A flexibility score",
        ],
        "BMI screens weight status; athletes and older adults may be misclassified versus true composition.",
        [
            "Imaging/DEXA estimate fat more directly.",
            "BMI is not a strength metric.",
            "Flexibility uses ROM tests.",
        ],
        "easy",
    ),
]

PROGRAM = [
    (
        "For a new client in Stabilization Endurance, which acute variable set is most typical?",
        "12–20 reps, 1–3 sets, slow tempos, shorter rest, lower intensity",
        [
            "1–5 reps at near-maximal loads with long rest only",
            "Only 100-rep sets with no rest ever",
            "Plyometric depth jumps on day one without preparation",
        ],
        "Phase 1 uses higher reps, controlled tempos, and stability emphasis before heavy/power work.",
        [
            "Low-rep maximal loading fits strength phases later.",
            "Extreme fatigue sets are not the standard Phase 1 template.",
            "High-intensity plyometrics require preparation.",
        ],
        "easy",
    ),
    (
        "Which exercise progression is most appropriate for core in early stabilization training?",
        "Floor bridges / dead bugs / bird dogs before loaded spinal flexion machines",
        [
            "Maximal sit-up contests on day one",
            "Heavy standing Russian twists with end-range spinal rotation under fatigue for beginners",
            "Loaded good mornings to failure for all new clients",
        ],
        "Start with controlled anti-extension/anti-rotation stability before aggressive loaded trunk work.",
        [
            "High-volume sit-ups are not ideal first progressions.",
            "Aggressive loaded rotation is advanced.",
            "Loaded spinal flexion/hinge to failure is inappropriate for novices.",
        ],
        "medium",
    ),
    (
        "SAQ training primarily develops:",
        "Speed, agility, and quickness (reaction and change of direction)",
        ["Only maximal hypertrophy", "Only static flexibility", "Only bone mineral density as the sole outcome"],
        "SAQ drills improve acceleration, COD, and reactive ability alongside other programming.",
        [
            "Hypertrophy uses resistance overload schemes.",
            "Flexibility is ROM-focused.",
            "BMD may improve with loading but is not SAQ’s primary aim.",
        ],
        "easy",
    ),
    (
        "Which modality is most appropriate for correcting an overhead squat arms-fall-forward compensation in a corrective sequence?",
        "Inhibit/lengthen latissimus dorsi and pectorals; activate/integrate mid/lower trapezius and rhomboids as indicated",
        [
            "Only foam roll the calves and ignore the upper body",
            "Only train heavy bench press",
            "Only stretch the plantar fascia",
        ],
        "Arms-fall-forward often involves tight lats/pecs and weak scapular retractors/depressors.",
        [
            "Calves may matter for other faults, not this one primarily.",
            "Heavy pressing can worsen the pattern.",
            "Plantar fascia is unrelated.",
        ],
        "hard",
    ),
    (
        "In muscular development (hypertrophy-focused) programming, a common repetition range is:",
        "Approximately 6–12 reps at moderate-to-challenging loads",
        ["Only 30–40 reps with empty bar always", "Only singles at 100% 1RM every set", "Zero resistance forever"],
        "Hypertrophy commonly uses mid-range reps with sufficient tension and volume.",
        [
            "Very high reps shift toward endurance.",
            "Constant maximal singles fit peak strength peaking, not typical hypertrophy blocks.",
            "Progressive overload requires resistance.",
        ],
        "easy",
    ),
    (
        "What is the primary purpose of a dynamic warm-up before resistance training?",
        "Increase tissue temperature, nervous system readiness, and movement-specific ROM",
        [
            "Completely exhaust the client before the session",
            "Replace all cool-down needs forever",
            "Diagnose disease",
        ],
        "Warm-ups prepare tissues and motor patterns; they should not create excessive fatigue.",
        [
            "Fatigue before work impairs performance.",
            "Cool-down is still useful.",
            "Diagnosis is clinical.",
        ],
        "easy",
    ),
    (
        "Plyometric training should generally be introduced when the client can:",
        "Demonstrate adequate strength, landing mechanics, and joint stability for the chosen drill",
        [
            "Barely balance on two feet with pain",
            "Skip all foundational phases regardless of ability",
            "Only if they refuse resistance training forever",
        ],
        "Impact drills require landing control and strength baselines to manage injury risk.",
        [
            "Pain and poor balance are contraindications to progress.",
            "Foundations matter for safety.",
            "Resistance training complements plyometrics.",
        ],
        "medium",
    ),
    (
        "Which rest interval is most typical between heavy maximal strength sets?",
        "About 3–5 minutes (longer recovery for neural/ATP–PC restoration)",
        ["0–10 seconds only always", "24 hours between every single set", "No rest by definition of strength"],
        "High-load strength work needs longer rest than endurance circuits.",
        [
            "Very short rests limit load quality.",
            "Inter-set rest is minutes, not a day.",
            "Strength training uses planned rest.",
        ],
        "medium",
    ),
    (
        "An appropriate beginner progression for a squat pattern is:",
        "Bodyweight squat or assisted squat to box → goblet squat → barbell variations as technique allows",
        [
            "Maximal back squat on session one for all clients",
            "Pistol squat to failure on day one for every sedentary adult",
            "Skip squats and only shrug maximally",
        ],
        "Progress complexity and load after pattern competency.",
        [
            "Max loading without skill is unsafe.",
            "Unilateral advanced variants are not universal day-one drills.",
            "Shrugs do not train the squat pattern.",
        ],
        "easy",
    ),
    (
        "Which statement about progressive overload is correct?",
        "Training stress must gradually increase via load, volume, density, or complexity over time",
        [
            "Clients should never change any variable after week one",
            "Only flexibility can be overloaded, never strength",
            "Overload means training through sharp joint pain",
        ],
        "Adaptation requires progressive challenge within recovery capacity—not pain chasing.",
        [
            "Stagnation occurs without progression.",
            "All fitness qualities can progress.",
            "Pain is a warning, not a method.",
        ],
        "easy",
    ),
    (
        "For a client with the goal of fat loss, resistance training is valuable because it:",
        "Helps preserve lean mass and supports metabolic rate while in a calorie deficit",
        [
            "Replaces the need for any dietary awareness forever",
            "Guarantees spot reduction of belly fat only where electrodes are placed",
            "Makes cardiovascular exercise useless in all cases",
        ],
        "Resistance training protects muscle during weight loss; nutrition and cardio still matter.",
        [
            "Energy balance still drives fat loss.",
            "Spot reduction is a myth.",
            "Cardio can still support energy expenditure and health.",
        ],
        "medium",
    ),
    (
        "Which breathing cue is generally appropriate during a heavy concentric lift?",
        "Brace and exhale through the sticking point (avoid prolonged breath-holding if contraindicated)",
        [
            "Hyperventilate rapidly throughout every rep with no brace",
            "Never breathe during any set",
            "Only breathe during the warm-up, not working sets",
        ],
        "Bracing with controlled breathing manages intra-abdominal pressure; Valsalva may be used carefully in advanced lifters without contraindications.",
        [
            "Uncontrolled hyperventilation impairs stability.",
            "Breathing is required.",
            "Working sets especially need bracing/breath strategy.",
        ],
        "medium",
    ),
    (
        "Integrated training in NASM refers to:",
        "Combining flexibility, core, balance, SAQ, plyometric, and resistance training in a purposeful program",
        [
            "Only foam rolling forever",
            "Only sport practice with no physical preparation",
            "Only machine circuit training without any other qualities",
        ],
        "OPT integrates multiple components rather than isolating one modality indefinitely.",
        [
            "SMR is one tool, not the whole program.",
            "Sport skill alone is incomplete preparation.",
            "Machines can be useful but are not the entire model.",
        ],
        "easy",
    ),
    (
        "A deload week is best described as:",
        "A planned reduction in volume and/or intensity to allow recovery and adaptation",
        [
            "A week of maximal testing every day",
            "Complete retirement from exercise permanently",
            "Eating zero protein",
        ],
        "Deloads manage fatigue while maintaining some training stimulus.",
        [
            "Daily max testing increases fatigue.",
            "Deload is temporary.",
            "Nutrition support remains important.",
        ],
        "medium",
    ),
    (
        "Which balance progression is most advanced?",
        "Single-leg unstable surface with perturbation / reactive tasks",
        [
            "Seated supported bilateral stance on a stable chair",
            "Two-foot standing on a firm floor with eyes open and hand support",
            "Lying completely supported with no upright challenge",
        ],
        "Progress by reducing base of support, adding instability, vision challenges, and reactions.",
        [
            "Seated support is introductory.",
            "Bilateral firm stance is basic.",
            "Lying removes balance demand.",
        ],
        "hard",
    ),
]

NUTRITION_BIZ = [
    (
        "Within typical CPT scope of practice, which nutrition action is appropriate?",
        "Provide general healthy eating guidelines and refer to an RD for medical nutrition therapy",
        [
            "Prescribe a therapeutic ketogenic protocol for epilepsy as clinical treatment",
            "Diagnose celiac disease from a food log",
            "Tell a client to stop physician-prescribed medication to lose weight",
        ],
        "CPTs educate with general guidelines; disease-specific MNT and diagnosis are for licensed clinicians.",
        [
            "Therapeutic diets for disease are RD/MD territory.",
            "Diagnosis is medical.",
            "Medication changes require the prescribing clinician.",
        ],
        "easy",
    ),
    (
        "Which macronutrient is the primary fuel for high-intensity anaerobic glycolysis?",
        "Carbohydrate",
        ["Only dietary cholesterol", "Only alcohol", "Only insoluble fiber as ATP"],
        "Glycolysis uses carbohydrate (glucose/glycogen); fat is slower oxidative fuel; fiber is not a rapid ATP source.",
        [
            "Cholesterol is not a workout fuel.",
            "Alcohol is not a training macronutrient strategy.",
            "Fiber is poorly used for rapid ATP.",
        ],
        "easy",
    ),
    (
        "Recommended dietary protein for many exercising adults often falls near:",
        "About 1.2–2.2 g/kg/day depending on goals and total energy intake (general fitness guidance ranges)",
        [
            "0 g/day if lifting",
            "10 g/kg/day for all sedentary adults as a universal rule",
            "Protein has no role in muscle repair",
        ],
        "Active individuals usually need more than sedentary RDAs; extreme values are unnecessary or unrealistic.",
        [
            "Protein is required for remodeling.",
            "10 g/kg is excessive for most people.",
            "Protein supports repair and adaptation.",
        ],
        "medium",
    ),
    (
        "Which behavior-change technique helps clients turn goals into action?",
        "Specific, measurable action plans and self-monitoring",
        [
            "Vague wishes without tracking",
            "Public shaming as the only tool",
            "Avoiding all feedback",
        ],
        "Implementation intentions, tracking, and feedback support adherence.",
        [
            "Vague goals undermine follow-through.",
            "Shame harms rapport and adherence.",
            "Feedback guides adjustment.",
        ],
        "easy",
    ),
    (
        "A CPT should maintain client confidentiality except when:",
        "Disclosure is required by law / duty-to-warn situations or the client provides appropriate consent",
        [
            "Gossiping with other gym members for fun",
            "Posting client before/after photos without consent",
            "Sharing private health details to market services without permission",
        ],
        "Privacy is an ethical/legal duty; limited exceptions exist for legal obligations and consent.",
        [
            "Casual gossip is a breach.",
            "Photos need consent.",
            "Marketing use needs permission.",
        ],
        "easy",
    ),
    (
        "Which statement about dietary supplements is most accurate for a CPT?",
        "Discuss general evidence cautiously and refer clients to qualified professionals; do not prescribe like a clinician",
        [
            "Guarantee that any supplement sold in a gym cures disease",
            "Inject clients with peptides in the locker room",
            "Claim FDA approval for all sports supplements automatically",
        ],
        "Supplement advice has legal/ethical limits; disease claims and invasive procedures are out of scope.",
        [
            "Cure claims are inappropriate and often illegal.",
            "Injections are not CPT practice.",
            "Most supplements are not FDA-approved drugs.",
        ],
        "medium",
    ),
    (
        "SMART goals are:",
        "Specific, Measurable, Attainable, Realistic/Relevant, Time-bound",
        [
            "Secret, Magical, Abstract, Random, Timeless",
            "Only financial goals for the trainer",
            "Goals that must never be written down",
        ],
        "SMART structure improves clarity and accountability for client outcomes.",
        [
            "Vague/magical framing fails.",
            "Client outcome goals matter, not only trainer revenue.",
            "Writing goals supports tracking.",
        ],
        "easy",
    ),
    (
        "Which business practice is most professional?",
        "Clear contracts, transparent pricing, documented scope of practice, and accurate marketing claims",
        [
            "Guaranteeing a 20-lb fat loss in 7 days for every client",
            "Training minors without required consents/policies",
            "Using another trainer’s credentials on your ads",
        ],
        "Professional practice requires honesty, consent, and legal compliance.",
        [
            "Unrealistic guarantees are unethical.",
            "Minors require proper consent/policies.",
            "Credential misrepresentation is fraud.",
        ],
        "medium",
    ),
    (
        "Motivational interviewing emphasizes:",
        "Collaborative, client-centered exploration of ambivalence and intrinsic motivation",
        [
            "Lecturing clients until they comply",
            "Ignoring the client’s values",
            "Threatening to cancel sessions for any slip",
        ],
        "MI uses empathy, evocative questions, and partnership rather than confrontation alone.",
        [
            "Pure lecturing often increases resistance.",
            "Values drive lasting change.",
            "Threats damage autonomy and rapport.",
        ],
        "medium",
    ),
    (
        "Dehydration during training can impair performance by:",
        "Reducing plasma volume, increasing cardiovascular strain, and impairing thermoregulation",
        [
            "Improving sweat rate indefinitely with no downside",
            "Eliminating the need for electrolytes in all ultra-endurance events automatically",
            "Increasing bone length acutely",
        ],
        "Fluid deficits raise heart rate for a given workload and raise heat illness risk.",
        [
            "Excessive dehydration harms performance.",
            "Long events may still need electrolyte strategies.",
            "Hydration does not lengthen bones.",
        ],
        "medium",
    ),
    (
        "Which is an example of an open-ended coaching question?",
        "What barriers got in the way of your workouts this week?",
        [
            "Did you work out? (yes/no only, with no follow-up)",
            "You failed again, right?",
            "Stop talking and just do what I say.",
        ],
        "Open questions invite reflection and problem-solving; closed questions limit dialogue.",
        [
            "Yes/no questions can start, but open follow-ups deepen change talk.",
            "Judgmental framing harms rapport.",
            "Command-only coaching reduces autonomy.",
        ],
        "easy",
    ),
    (
        "A client asks for a meal plan to treat Type 2 diabetes. The CPT should:",
        "Refer to a registered dietitian / physician for medical nutrition therapy and stay within general guidelines",
        [
            "Create a disease-treatment diet and adjust insulin doses",
            "Tell them to stop metformin immediately",
            "Diagnose the severity of retinopathy",
        ],
        "Diabetes MNT and medication management require licensed clinicians.",
        [
            "Insulin adjustment is medical.",
            "Medication changes need the physician.",
            "Eye disease diagnosis is medical.",
        ],
        "easy",
    ),
    (
        "Which recovery recommendation is generally evidence-aligned?",
        "Prioritize sleep, progressive programming, and adequate nutrition/hydration",
        [
            "Sleep is optional if caffeine is high enough forever",
            "Never take rest days regardless of fatigue and pain",
            "Only passive ice baths replace all training recovery needs",
        ],
        "Sleep and periodization are foundational; modalities are adjuncts.",
        [
            "Chronic sleep loss impairs adaptation.",
            "Rest/recovery days manage load.",
            "Cold therapy does not replace programming and sleep.",
        ],
        "medium",
    ),
    (
        "Liability risk is reduced when a CPT:",
        "Screens clients, documents sessions, uses informed consent, and stays in scope",
        [
            "Ignores red-flag symptoms to keep billing high",
            "Falsifies CPR/AED certification dates",
            "Trains in prohibited medical procedures",
        ],
        "Risk management combines screening, documentation, competence, and referral.",
        [
            "Ignoring symptoms increases harm/liability.",
            "False credentials are illegal/unethical.",
            "Out-of-scope acts increase liability.",
        ],
        "hard",
    ),
    (
        "Which statement about alcohol and fitness goals is most accurate?",
        "Excessive intake can impair recovery, sleep, and calorie control",
        [
            "Alcohol is an essential macronutrient required daily for hypertrophy",
            "Alcohol always increases protein synthesis",
            "Alcohol hydration fully replaces water needs during training",
        ],
        "Alcohol can displace nutrients, disrupt sleep, and add energy without supporting training adaptations.",
        [
            "Alcohol is not essential for muscle growth.",
            "It can impair muscle protein synthesis/recovery.",
            "It is not a hydration strategy for training.",
        ],
        "medium",
    ),
]


def main() -> None:
    write_bank(
        "nasm-cpt-readiness-check",
        {
            "basics-anatomy": BASICS,
            "assessment": ASSESSMENT,
            "program-design": PROGRAM,
            "nutrition-biz": NUTRITION_BIZ,
        },
    )


if __name__ == "__main__":
    main()
