import { q, rot } from "./q-helper.mjs";

export default [
  q(
    "A warehouse operative reports lower back pain after repeated lifting of 20 kg sacks from floor level. Which initial control is most aligned with the hierarchy of control?",
    "Provide a mechanical lift or raise the load source to waist height to reduce bending and manual exertion",
    ["Issue a back support belt and continue floor-level lifting", "Rotate workers faster without changing the task", "Tell the worker to lift with a straight back only"],
    "Engineering and task redesign that reduce bending and load handling at floor level address the musculoskeletal hazard at source.",
    { b: "PPE such as belts does not eliminate manual handling risk and is low in the hierarchy.", c: "Rotation shares exposure but does not remove the hazardous task design.", d: "Technique advice alone is insufficient where task design drives risk." },
    "medium",
    rot(0)
  ),
  q(
    "Under typical manual handling assessment principles, which factor combination most increases risk of injury?",
    "Heavy load, awkward posture, limited grip, and insufficient recovery time between lifts",
    ["Light load, waist-height pick-up, team lift, and frequent rest breaks", "Automated conveyor delivery with no lifting required", "Load close to the body with handles and clear footing"],
    "TILE (task, individual, load, environment) risk rises with weight, posture, grip difficulty, and fatigue from inadequate recovery.",
    { b: "Favourable factors reduce manual handling risk.", c: "Automation removes manual handling where applied.", d: "Good posture and load design lower risk." },
    "easy",
    rot(1)
  ),
  q(
    "An office worker using a laptop on a sofa for eight hours daily complains of neck and wrist pain. What is the best first intervention?",
    "Provide a suitable DSE workstation with adjustable chair, external keyboard/mouse, and screen at eye level",
    ["Recommend painkillers only without changing the workstation", "Increase meeting frequency to reduce typing time only", "Allow sofa working because it is more comfortable"],
    "DSE regulations expect suitable equipment and workstation setup for habitual screen users — laptop-on-sofa is a common ergonomic failure.",
    { a: "Medical treatment does not replace ergonomic control of the hazard.", b: "Meetings do not correct sustained poor posture at the desk.", d: "Comfort perception does not equal ergonomic suitability." },
    "easy",
    rot(2)
  ),
  q(
    "Which exposure pattern is most associated with noise-induced hearing loss?",
    "Regular exposure above action levels without adequate hearing protection or engineering controls",
    ["Brief exposure to low-level background music in an office", "Wearing correctly fitted hearing protection during high-noise tasks", "Using quieter tools after a noise risk assessment"],
    "NIHL develops from cumulative exposure to high noise; action values trigger controls including engineering, administrative, and PPE measures.",
    { b: "Low office noise is typically below harmful exposure for NIHL.", c: "Hearing protection reduces risk when correctly used.", d: "Quieter equipment is a higher-order control." },
    "medium",
    rot(3)
  ),
  q(
    "A worker operating a jackhammer reports tingling fingers and whitened fingertips in cold weather. The most likely hazard is:",
    "Hand-arm vibration syndrome (HAVS) from prolonged use of vibrating tools",
    ["Exposure to office display screen equipment only", "Static standing on an anti-fatigue mat", "Inhalation of water mist from a humidifier"],
    "HAVS is linked to repeated exposure to hand-arm vibration from tools such as breakers and grinders, especially without control or health surveillance.",
    { b: "DSE relates to screen work, not vibration injury.", c: "Standing alone does not cause vibration white finger.", d: "Humidifier mist is unrelated to HAVS." },
    "medium",
    rot(4)
  ),
  q(
    "Which welfare provision is most important for workers on a remote outdoor construction site in summer?",
    "Shelter, potable drinking water, toilet facilities, and rest breaks to manage heat stress",
    ["Removal of all break times to accelerate completion", "Single unmarked water hose without hygiene facilities", "No shade because workers should acclimatize instantly"],
    "Welfare facilities support physical health — hydration, sanitation, rest, and shelter are basic expectations on demanding sites.",
    { a: "Removing breaks increases heat stress and fatigue risk.", c: "Inadequate water and sanitation breach welfare standards.", d: "Acclimatization requires time and controlled exposure, not denial of shelter." },
    "easy",
    rot(5)
  ),
  q(
    "A call centre manager notices rising sickness absence citing stress and anxiety. The most appropriate organisational response is:",
    "Review workload, targets, support resources, and consultation with workers to identify psychosocial risk factors",
    ["Dismiss stress as a personal problem unrelated to work", "Increase monitoring of keystrokes to raise productivity", "Ban all absence reports to improve statistics"],
    "Psychological health hazards include excessive demand, poor support, and bullying; employers should assess and control work-related stressors.",
    { b: "Work-related stress must be managed, not dismissed.", c: "Surveillance without support can worsen stress.", d: "Suppressing reporting hides the problem and harms culture." },
    "medium",
    rot(6)
  ),
  q(
    "What is the primary purpose of a Display Screen Equipment (DSE) assessment?",
    "Identify ergonomic risks from screen work and implement adjustments to reduce musculoskeletal and visual strain",
    ["Certify that the employee needs no breaks for five years", "Replace the need for lighting in the office", "Guarantee zero eyesight changes for all users"],
    "DSE assessments review workstation layout, breaks, lighting, and equipment to reduce RSI, eye strain, and related disorders.",
    { b: "DSE assessment does not remove general lighting duties.", c: "Vision can change; assessments reduce strain but do not guarantee medical outcomes.", d: "Breaks remain important; assessment does not waive them." },
    "easy",
    rot(7)
  ),
  q(
    "During a noise survey, the daily personal noise exposure reaches 90 dB(A) with peak levels below the upper action value. Mandatory actions include:",
    "Hearing protection zone, training, and health surveillance where required, plus programme to reduce exposure",
    ["No action until workers report total deafness", "Remove all machine guarding instead of addressing noise", "Rely on cotton wool as an equivalent to rated ear defenders"],
    "Upper exposure action values trigger a programme of control including PPE provision, training, and surveillance alongside noise reduction.",
    { a: "Waiting for injury ignores proactive legal and good practice duties.", c: "Guarding addresses different hazards, not noise substitution.", d: "Cotton wool is not approved hearing protection." },
    "hard",
    rot(8)
  ),
  q(
    "Which manual handling technique reduces spinal loading most effectively when lifting is unavoidable?",
    "Keep the load close to the body, use leg muscles, avoid twisting, and team-lift if the load is unstable or too heavy",
    ["Twist at the waist while holding the load at arm's length", "Lift quickly with a jerking motion to reduce time under load", "Bend the back fully while keeping legs straight"],
    "Safe lifting limits reach, twisting, and spinal flexion; team lifting shares load when assessment indicates.",
    { a: "Twisting and extended reach increase disc stress.", c: "Jerking increases peak forces on the spine.", d: "Straight-leg stooping loads the lower back heavily." },
    "easy",
    rot(9)
  ),
  q(
    "An employer introduces job rotation for assembly line workers doing highly repetitive wrist movements. The main limitation of rotation alone is:",
    "It may spread exposure to different MSD risks without reducing total ergonomic hazard in the job design",
    ["It always eliminates the need for workstation redesign", "It guarantees workers need no training", "It removes the need for health surveillance for HAVS"],
    "Rotation can reduce monotony but may not lower overall biomechanical exposure unless tasks are redesigned with lower force and repetition.",
    { a: "Redesign and engineering controls may still be necessary.", c: "Training needs remain for each task.", d: "HAVS surveillance depends on vibration exposure, not rotation alone." },
    "hard",
    rot(10)
  ),
  q(
    "Whole-body vibration (WBV) is most commonly associated with which work activity?",
    "Driving off-road plant such as dumpers and forklifts on uneven ground for extended periods",
    ["Typing at a standard office keyboard", "Reading paper documents under desk lamps", "Walking on level carpeted corridors"],
    "WBV affects drivers of vehicles transmitting vibration through the seat; risk assessments and seat suspension limits apply.",
    { b: "Keyboard work involves DSE risks, not WBV.", c: "Desk reading is not a WBV exposure.", d: "Walking on level floors is not WBV in the occupational health sense." },
    "medium",
    rot(11)
  ),
  q(
    "A night-shift nurse reports fatigue-related errors. Which control best addresses the underlying health risk?",
    "Review shift length, rest between shifts, workload, and fatigue policy with worker involvement",
    ["Add caffeine dispensers only without schedule review", "Ignore fatigue because healthcare is always stressful", "Mandate overtime to cover vacancies without recovery time"],
    "Fatigue management addresses scheduling, rest, workload, and culture — critical for psychological and physical safety in shift work.",
    { a: "Caffeine is not a sustainable fatigue control.", c: "Stress does not remove duty to manage fatigue.", d: "Excess overtime increases fatigue and error risk." },
    "medium",
    rot(12)
  ),
  q(
    "Which symptom cluster should trigger urgent referral under a HAVS health surveillance programme?",
    "Persistent numbness, loss of grip strength, and finger blanching after tool use",
    ["Mild thirst after a hot day", "Temporary eye dryness from air conditioning", "Occasional sneezing from pollen"],
    "HAVS progression includes vascular and neurological symptoms; surveillance aims to detect early signs and restrict exposure.",
    { b: "Thirst relates to hydration, not HAVS.", c: "Dry eyes are a DSE/environment issue.", d: "Pollen allergy is unrelated to vibration." },
    "hard",
    rot(13)
  ),
  q(
    "An ergonomic improvement for data-entry staff with forearm pain should prioritise:",
    "Adjustable chairs, neutral wrist posture, ergonomic keyboards or rests, and micro-breaks",
    ["Smaller screens placed below desk level", "Removal of all wrist support to toughen workers", "Increasing keystroke targets without pause"],
    "Forearm and wrist MSDs are reduced by neutral posture, suitable furniture, and breaks from repetitive activity.",
    { a: "Low screens increase neck flexion.", c: "Removing support can worsen strain.", d: "Higher pace without breaks increases RSI risk." },
    "easy",
    rot(14)
  ),
  q(
    "What is the most suitable control for a worker exposed to 85 dB(A) noise for six hours daily (above lower action value)?",
    "Provide suitable hearing protection, training in use, and plan noise reduction measures",
    ["No controls until exposure reaches 120 dB(A)", "Play louder music to mask machine noise", "Remove ear defenders to improve communication permanently"],
    "Between lower and upper action values, employers must provide hearing protection and information/training, and assess further reduction.",
    { a: "Legal action values are far below 120 dB(A).", c: "Masking increases total noise exposure.", d: "Defenders should be used with communication solutions, not removed." },
    "medium",
    rot(15)
  ),
  q(
    "A pregnant worker's risk assessment for manual handling should include:",
    "Review of load limits, posture, rest, medical advice, and task modification as pregnancy progresses",
    ["Automatic dismissal from all employment", "No changes because pregnancy is unrelated to work", "Doubling lifting targets to maintain fitness"],
    "Individual factors require reassessment for pregnant workers — manual handling limits and suitable adjustments are typical.",
    { b: "Pregnancy is a key individual factor in risk assessment.", c: "Dismissal on pregnancy grounds is unlawful and unsafe.", d: "Increased lifting is inappropriate without medical and ergonomic review." },
    "medium",
    rot(16)
  ),
  q(
    "Poor workplace lighting contributing to eye strain and headaches is best corrected by:",
    "Balancing ambient and task lighting, reducing glare, and allowing DSE breaks",
    ["Removing all windows to eliminate daylight", "Maximum brightness on all screens at all times", "Discouraging workers from reporting visual discomfort"],
    "Visual health depends on suitable luminance, glare control, and breaks from concentrated screen focus.",
    { a: "Daylight can be managed with blinds rather than eliminated.", c: "Maximum brightness can increase glare and fatigue.", d: "Reporting discomfort enables timely adjustment." },
    "easy",
    rot(17)
  ),
  q(
    "Which indicator best suggests work-related stress rather than only personal issues?",
    "Multiple workers in the same team reporting high demand, low control, and bullying with rising absence",
    ["One worker enjoying a hobby at weekends", "Seasonal colds in winter across the site", "A single employee's unrelated family celebration"],
    "Clustered symptoms linked to organisational factors (demand, control, relationships, change) indicate psychosocial hazards at work.",
    { b: "Hobbies do not diagnose organisational stress.", c: "Seasonal illness patterns differ from stress clusters.", d: "Personal events do not explain team-wide trends." },
    "hard",
    rot(18)
  ),
  q(
    "When delivering manual handling training, the most effective approach is:",
    "Combine theory on TILE with practical demonstration using actual workplace loads and tasks",
    ["Show a generic video unrelated to site tasks", "Test lifting speed only without technique review", "Issue a certificate without observation of practice"],
    "Task-specific training with practice on real loads improves retention and relevance for NEBOSH and legal competence expectations.",
    { a: "Generic video alone lacks task specificity.", c: "Speed testing can encourage unsafe practice.", d: "Certificates without competence verification are weak evidence." },
    "medium",
    rot(19)
  ),
  q(
    "A canteen on an industrial site should primarily support worker health by:",
    "Providing hygienic food preparation areas, seating, hydration, and facilities to eat away from hazardous zones",
    ["Locating eating areas inside a chemical storage room", "Removing seating to shorten lunch breaks", "Banning water to prevent toilet breaks"],
    "Welfare includes safe, hygienic rest and eating areas separated from hazardous processes.",
    { a: "Chemical storage areas are inappropriate for food consumption.", c: "Seating supports recovery during breaks.", d: "Hydration is essential for health and performance." },
    "easy",
    rot(20)
  ),
  q(
    "Vibration magnitude from a tool is documented as 8 m/s² A(8) on the datasheet. This value is used to:",
    "Calculate exposure time against exposure limit values and plan controls under vibration regulations",
    ["Determine the colour of the tool housing", "Set office DSE break frequencies", "Replace the need for maintenance schedules"],
    "Manufacturers' vibration data feeds exposure calculations to compare with ELV/EAV and select controls and surveillance.",
    { b: "Housing colour is unrelated to vibration dose.", c: "DSE breaks are separate from HAV assessment.", d: "Maintenance remains essential for safe tools." },
    "hard",
    rot(21)
  ),
  q(
    "An employee returning after long-term back injury should:",
    "Receive a return-to-work plan with phased duties, ergonomic review, and medical/OH advice",
    ["Immediately resume maximal lifting without assessment", "Be excluded permanently from all duties without review", "Receive no workplace adjustments because injury was personal"],
    "Rehabilitation and reasonable adjustments support physical recovery and legal duties for disabled or injured workers.",
    { a: "Unassessed maximal loading risks re-injury.", c: "Permanent exclusion without assessment may be discriminatory and unnecessary.", d: "Work-related or aggravated MSDs still need workplace controls." },
    "medium",
    rot(22)
  ),
  q(
    "Which combination best prevents MSDs in a packaging line?",
    "Workstation height adjustment, job rotation with redesigned low-force tasks, and training on posture",
    ["Increase conveyor speed and remove all pauses", "Provide only a poster stating 'lift safely'", "Ignore early reports of wrist discomfort"],
    "MSD prevention blends ergonomics, task design, and early intervention on discomfort before chronic injury.",
    { a: "Higher speed without redesign increases repetition and force.", c: "Posters alone are weak controls.", d: "Early discomfort is a warning sign requiring action." },
    "medium",
    rot(23)
  ),
  q(
    "Exposure to occupational noise can cause tinnitus. The most appropriate long-term control is:",
    "Engineering noise reduction at source combined with managed hearing protection programme",
    ["Annual bonus for tolerating noise without protection", "Relocation of affected workers to louder areas", "Ignoring tinnitus because it is not painful"],
    "Tinnitus indicates auditory damage; source reduction and hearing conservation programmes are primary preventive strategies.",
    { a: "Bonuses do not prevent hearing damage.", c: "Louder areas worsen harm.", d: "Tinnitus is a serious health outcome requiring control." },
    "medium",
    rot(24)
  ),
  q(
    "Psychological first aid after a traumatic workplace event should include:",
    "Practical support, signposting to professional help, and avoiding forced disclosure or blame",
    ["Mandatory public recounting of trauma without support", "Immediate dismissal of all witnesses", "Promising that similar events cannot recur without investigation"],
    "Post-incident support emphasises safety, practical help, and access to specialists — not coerced debrief or punitive responses.",
    { a: "Forced disclosure can re-traumatise.", c: "Dismissal does not address psychosocial recovery needs.", d: "Investigation and learning should follow, not empty promises." },
    "hard",
    rot(25)
  ),
  q(
    "A risk assessment for a new seated assembly task identifies static neck flexion for seven hours. The best control package is:",
    "Adjustable bench and chair, task variation, micro-breaks, and tool balancers to reduce reach",
    ["Higher production targets without ergonomic change", "Standing-only work with no anti-fatigue mat", "Removal of all job rotation indefinitely"],
    "Static posture MSDs need workstation fit, variation, and engineering aids — not just production pressure.",
    { a: "Targets without ergonomic change sustain risk.", c: "Standing all day introduces different MSD risks without design.", d: "Rotation can help when combined with redesign." },
    "medium",
    rot(26)
  ),
  q(
    "Which welfare issue on a refurbishment site most directly increases physical health risk?",
    "Inadequate washing facilities after contact with cement-based products",
    ["Too many fire extinguishers", "Excess directional signage", "Over-provision of shaded rest areas"],
    "Wet cement can cause dermatitis; adequate washing helps remove irritants and supports skin health.",
    { b: "Fire extinguishers support safety, not welfare deficiency.", c: "Signage excess is not a typical health risk.", d: "Shade supports heat stress management." },
    "easy",
    rot(27)
  ),
  q(
    "When assessing individual capability for manual handling, which factor is most relevant?",
    "Existing injury, pregnancy, training, and strength relative to the task demands",
    ["Favourite sports team of the worker", "Vehicle colour they drive to work", "Number of years until retirement alone"],
    "Individual assessment considers health, capability, experience, and special circumstances affecting safe handling.",
    { b: "Personal preferences unrelated to capacity are irrelevant.", c: "Commute details do not determine handling ability.", d: "Retirement timeline alone is not a capability measure." },
    "easy",
    rot(28)
  ),
  q(
    "An organisation wants to reduce sedentary behaviour among office staff. The most evidence-aligned approach is:",
    "Encourage standing breaks, walking meetings where practical, and adjustable sit-stand desks",
    ["Ban all movement during core hours", "Remove chairs to force kneeling", "Measure steps only without changing work design"],
    "Physical activity at work is supported by breaks, adjustable furniture, and culture — not punitive removal of seating.",
    { a: "Movement bans worsen sedentary risk.", c: "Kneeling introduces new ergonomic problems.", d: "Measurement without intervention is insufficient." },
    "medium",
    rot(29)
  ),
  q(
    "Hand-arm vibration controls should prioritise:",
    "Selecting lower-vibration tools, maintaining equipment, limiting trigger time, and anti-vibration gloves only as supplementary",
    ["Using the highest vibration tool for shorter total career length", "Disabling tool isolators to speed work", "Relying solely on cotton gloves during winter"],
    "The hierarchy favours lower-vibration equipment, maintenance, and work organisation before PPE.",
    { a: "Career length is not a substitute for exposure control.", c: "Disabled isolators can increase vibration transmission.", d: "Cotton gloves do not replace anti-vibration or limit exposure time." },
    "hard",
    rot(30)
  ),
  q(
    "A worker cleaning with strong disinfectants develops respiratory irritation. Besides PPE, which health measure is appropriate?",
    "Review SDS, ventilation, product substitution, and health surveillance if exposure warrants",
    ["Increase concentration to finish faster", "Mix disinfectants to improve fragrance", "Ignore SDS because labels are optional"],
    "Chemical health risks need SDS-based controls, ventilation, substitution, and surveillance per COSHH principles.",
    { a: "Higher concentration increases exposure.", c: "Mixing chemicals can create dangerous reactions.", d: "SDS are essential hazard communication tools." },
    "medium",
    rot(31)
  ),
  q(
    "Early reporting of musculoskeletal discomfort is valuable because:",
    "It allows ergonomic intervention before reversible strain becomes chronic injury",
    ["It automatically triggers disciplinary action", "It removes the need for any risk assessment", "It guarantees compensation without investigation"],
    "Early intervention culture prevents escalation to lost-time injury and supports suitable adjustments.",
    { b: "Reporting should be encouraged, not punished.", c: "Assessment still underpins controls.", d: "Compensation processes are separate from prevention." },
    "easy",
    rot(32)
  ),
  q(
    "For thermal comfort in an office, which adjustment is most effective?",
    "Manage HVAC setpoints, airflow, humidity, and allow local layering within dress code",
    ["Lock thermostat at 30°C year-round", "Prohibit all personal fans and heaters without assessment", "Ignore complaints because comfort is subjective only"],
    "Thermal comfort balances environmental control with reasonable local adjustments; persistent issues warrant investigation.",
    { a: "Excessive heat causes fatigue and discomfort.", c: "Blanket bans may ignore reasonable needs.", d: "Subjective comfort still signals potential health and performance issues." },
    "medium",
    rot(33)
  ),
  q(
    "A driver exposed to WBV complains of back pain. The assessment should examine:",
    "Seat suspension, road conditions, driving hours, maintenance, and posture",
    ["Only the driver's domestic mattress brand", "Screen refresh rate in the depot office", "Canteen menu calorie counts exclusively"],
    "WBV assessment covers vehicle seat, route, duration, and maintenance — key syllabus content for vibration health.",
    { b: "Domestic factors are secondary to occupational exposure.", c: "DSE at the depot does not explain driving vibration dose.", d: "Nutrition alone does not assess WBV." },
    "medium",
    rot(34)
  ),
  q(
    "Which statement about workplace bullying and mental health is most accurate?",
    "Sustained bullying is a psychosocial hazard that can cause anxiety, depression, and absence",
    ["Bullying improves resilience and should be tolerated", "Mental health is never work-related", "Only physical injuries count in OH&S law"],
    "Psychosocial hazards including bullying are recognised OH&S issues requiring prevention and intervention.",
    { a: "Bullying harms health and culture; it must not be normalised.", c: "Work can contribute significantly to mental ill health.", d: "Health and safety law covers health broadly, including mental health where work-related." },
    "easy",
    rot(35)
  ),
  q(
    "Signage stating 'Think before you lift' in a storeroom with only floor-level pallets is weak because:",
    "It relies on administrative control without addressing poor storage height and task design",
    ["Posters are always illegal on warehouse walls", "Floor-level storage is always prohibited by law", "Workers cannot read signage in warehouses"],
    "Effective control redesigns storage and handling; slogans alone leave biomechanical hazards unchanged.",
    { b: "Posters can supplement but not replace engineering controls.", c: "Floor storage is common; risk must be managed, not assumed banned.", d: "Literacy and visibility are separate from control adequacy." },
    "hard",
    rot(36)
  ),
  q(
    "Health surveillance for noise-exposed workers typically includes:",
    "Baseline and periodic audiometry with record keeping and follow-up on standard threshold shifts",
    ["Annual vision tests only", "Random drug testing unrelated to hearing", "Fitness to drive tests for all office staff"],
    "Audiometry detects early hearing loss in noise programmes, triggering review of exposure and protection.",
    { a: "Vision tests do not monitor NIHL.", c: "Drug testing is unrelated unless part of separate policy.", d: "Office staff not in noise roles do not need audiometry for noise." },
    "medium",
    rot(37)
  ),
  q(
    "A manual handling operation can be avoided entirely by:",
    "Installing conveyors, chutes, or mechanical lifts to move materials without human lifting",
    ["Asking workers to lift faster in pairs without equipment", "Reducing packaging size while keeping floor-level pickup", "Issuing wrist braces for all staff"],
    "Elimination/substitution at the top of the hierarchy removes or reduces handling through mechanisation.",
    { a: "Faster lifting increases risk without redesign.", c: "Smaller loads may still require hazardous postures from floor level.", d: "Braces do not eliminate handling hazard." },
    "easy",
    rot(38)
  ),
  q(
    "Night workers' health is best protected by:",
    "Fatigue risk assessment, controlled overtime, suitable lighting, and access to welfare facilities on shift",
    ["Bright blue-rich lighting only with no rest policy", "Eliminating all meal breaks to increase output", "Scheduling hardest manual tasks at end of 12-hour night shift"],
    "Shift design, lighting, nutrition breaks, and fatigue management support physical and mental health at night.",
    { a: "Lighting alone without fatigue policy is incomplete.", c: "Removing meals harms health and performance.", d: "Hardest tasks should not be scheduled when fatigue is highest." },
    "medium",
    rot(39)
  ),
  q(
    "An ergonomic risk assessment of a lab microscope station should consider:",
    "Eyepiece height, seat support, forearm position, and break frequency from static posture",
    ["Only the chemical inventory in adjacent cupboards", "Parking allocation for visitors", "Brand of lab coats exclusively"],
    "Microscope work creates neck and upper limb static load; DSE/ergonomic principles apply to lab tasks.",
    { b: "Chemical inventory is COSHH-related, not primary for microscope posture.", c: "Parking is unrelated.", d: "Lab coat brand does not determine ergonomic setup." },
    "medium",
    rot(40)
  ),
  q(
    "Workers in a cold store report numb hands and reduced dexterity. Besides thermal PPE, what should be assessed?",
    "Work-rest cycles, buddy systems, warm-up breaks, and manual handling in cold conditions",
    ["Increasing exposure time to build tolerance without limits", "Removing gloves to improve grip on metal at -20°C", "Ignoring dexterity loss because cold is temporary"],
    "Cold environments affect dexterity and MSD risk; work organisation and PPE together manage physical health.",
    { a: "Unlimited cold exposure risks frostbite and errors.", c: "Bare-hand contact with cold metal is hazardous.", d: "Dexterity loss increases accident and handling risk." },
    "hard",
    rot(41)
  ),
  q(
    "Which factor most strongly links poor welfare to increased accident rates?",
    "Fatigue and dehydration from inadequate rest, hydration, and sanitary facilities reducing concentration",
    ["Excess availability of drinking water", "Too frequent legally compliant breaks", "Clear signage to welfare units"],
    "Poor welfare undermines alertness and wellbeing, indirectly raising accident likelihood alongside direct health harm.",
    { b: "Adequate water supports health.", c: "Compliant breaks reduce fatigue.", d: "Signage aids access to welfare." },
    "medium",
    rot(42)
  ),
  q(
    "A company measures psychosocial health using confidential staff surveys. Results show low role clarity and high conflict. Next step:",
    "Develop action plans with worker input to clarify roles and address conflict sources",
    ["Publish named individual survey answers in the canteen", "Ignore results because they are not injury statistics", "Increase conflict by removing team leaders"],
    "Survey findings should drive targeted organisational interventions with confidentiality and participation.",
    { a: "Named publication breaches confidentiality and worsens conflict.", c: "Psychosocial data is valid OH&S intelligence.", d: "Removing leadership without plan can increase disorder." },
    "medium",
    rot(43)
  ),
  q(
    "When selecting hearing protection, the most important fit criterion is:",
    "Appropriate SNR/attenuation for the noise level with correct fit and compatibility with other PPE",
    ["Brightest colour regardless of attenuation", "Smallest size for all workers without fit test", "Reuse of damaged ear plugs indefinitely"],
    "Protection must reduce exposure adequately while fitting the user and not conflicting with helmets or communication needs.",
    { b: "Colour does not indicate protection level.", c: "One size without fit check reduces effectiveness.", d: "Damaged PPE must be replaced." },
    "easy",
    rot(44)
  ),
  q(
    "A warehouse introduces palletisers but keeps manual handling for awkward items. The risk assessment should:",
    "Be updated to cover remaining manual tasks, training on exceptions, and maintenance of new equipment",
    ["Be deleted because automation removed all risk", "Ignore awkward items as too rare to document", "Remove training because machines are automatic"],
    "Partial automation leaves residual manual handling risks requiring updated assessment and competence.",
    { a: "Residual manual tasks still pose MSD risk.", c: "Rare tasks still need control if foreseeable.", d: "Training covers exceptions and safe interaction with machinery." },
    "medium",
    rot(45)
  ),
  q(
    "Occupational dermatitis from wet work is best prevented by:",
    "Substitution of harsh agents, gloves where suitable, skin care programme, and drying facilities",
    ["Requiring longer wet exposure to harden skin", "Banning all moisturiser on site", "Using solvents to clean hands without washing facilities"],
    "Skin health programmes combine hygiene, suitable gloves, gentler products, and welfare washing/drying.",
    { a: "Prolonged wet work increases dermatitis risk.", c: "Moisturiser can be part of skin care when policy allows.", d: "Solvents harm skin and require proper washing." },
    "medium",
    rot(46)
  ),
  q(
    "An employee working at dual monitors reports neck rotation pain. The ergonomic fix is:",
    "Position primary screen directly ahead and angle secondary monitor to minimise sustained neck twist",
    ["Place both screens far to one side", "Lower chairs so screens are below knee height", "Increase font size only without moving screens"],
    "Monitor placement should limit sustained asymmetric neck posture — core DSE competency for IGC.",
    { a: "Side placement increases rotation.", c: "Very low screens increase flexion.", d: "Font size helps vision but not neck twist if layout is poor." },
    "easy",
    rot(47)
  ),
  q(
    "Vibration exposure time for a worker using two different tools in one shift should be calculated by:",
    "Combining partial exposures using trigger time and manufacturer vibration data against limit values",
    ["Ignoring the second tool if it is lighter colour", "Averaging only the loudest noise readings", "Assuming one minute of use equals zero exposure"],
    "Multiple tool exposures are summed in A(8) terms; syllabus expects understanding of exposure addition.",
    { b: "Noise readings do not substitute for vibration data.", c: "Colour is irrelevant.", d: "All trigger time contributes to daily exposure." },
    "hard",
    rot(48)
  ),
  q(
    "Senior management support for ergonomic improvements is important because:",
    "Resource allocation and culture determine whether assessment findings become sustained controls",
    ["Ergonomics is only a worker hobby", "MSDs resolve without management action", "Purchasing cheaper non-adjustable furniture always suffices"],
    "Without management commitment, ergonomic assessments stall at paperwork; culture and budget enable redesign.",
    { a: "Ergonomics is a recognised OH&S discipline.", c: "MSDs often persist without intervention.", d: "Non-adjustable furniture may perpetuate poor fit." },
    "easy",
    rot(49)
  ),
];
