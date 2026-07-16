#!/usr/bin/env python3
"""CDA Child Development Associate — 60 curated MCQs (4×15)."""
from write_helper import write_bank

SLUG = "cda-childcare-readiness-check"

topics = {
    "safe-healthy": [
        (
            "The most effective routine for reducing illness spread in a childcare setting is:",
            "Proper handwashing with soap and water at key times (arrival, before meals, after toileting/diapering)",
            [
                "Sharing washcloths among all children without washing",
                "Skipping handwashing if gloves were worn for any task",
                "Using perfume sprays instead of cleaning surfaces",
            ],
            "Hand hygiene at transition points is a core infection-control practice in early childhood programs.",
            [
                "Shared washcloths spread pathogens.",
                "Gloves do not replace handwashing after removal/contamination.",
                "Fragrance is not a sanitizing method.",
            ],
            "easy",
        ),
        (
            "When checking outdoor play areas, a caregiver should prioritize:",
            "Hazards such as broken equipment, inadequate surfacing, and unsafe boundaries",
            [
                "Whether the grass is a fashionable shade of green",
                "Hiding damaged equipment so children will not notice",
                "Leaving gates propped open to busy streets",
            ],
            "Daily safety checks reduce injury risk from equipment, surfacing, and supervision barriers.",
            [
                "Aesthetics are secondary to safety.",
                "Damaged equipment must be removed/repaired, not hidden.",
                "Open gates to traffic create serious risk.",
            ],
            "easy",
        ),
        (
            "Safe sleep practice for infants generally includes:",
            "Placing infants on their backs to sleep on a firm, flat surface without soft bedding",
            [
                "Using pillows and thick blankets in the crib for comfort",
                "Placing infants on soft couches for naps",
                "Propping bottles in cribs unsupervised",
            ],
            "Back-to-sleep on a clear, firm surface reduces SIDS/suffocation risk; soft items and propping are unsafe.",
            [
                "Soft bedding increases suffocation risk.",
                "Couches are not safe sleep surfaces.",
                "Propped bottles risk choking and ear issues; supervision is required for feeding.",
            ],
            "easy",
        ),
        (
            "Universal precautions in childcare mean caregivers:",
            "Treat all blood and certain body fluids as potentially infectious and use barriers/cleanup protocols",
            [
                "Ignore blood exposures because children are healthy",
                "Use bare hands for all cleanup to save supplies",
                "Only wash hands yearly",
            ],
            "Standard/universal precautions protect staff and children during exposure incidents.",
            [
                "Health status is unknown; barriers are still required.",
                "PPE and proper cleanup are expected.",
                "Hand hygiene is frequent, not annual.",
            ],
            "medium",
        ),
        (
            "Medication administration in a center typically requires:",
            "Written parental authorization, proper labeling, and documentation per policy",
            [
                "Giving leftover antibiotics from another child",
                "Guessing the dose from memory",
                "Storing meds in an unlocked backpack in the play area",
            ],
            "Meds must be authorized, labeled, secured, and logged to prevent errors and misuse.",
            [
                "Sharing prescriptions is dangerous and improper.",
                "Doses must follow labeled/authorized instructions.",
                "Medications require secure storage.",
            ],
            "medium",
        ),
        (
            "The primary purpose of a fire drill in childcare is to:",
            "Practice calm, rapid evacuation so children and staff know procedures",
            [
                "Scare children so they never play outdoors",
                "Test whether smoke detectors can be disabled",
                "Replace the need for working exits",
            ],
            "Drills build muscle memory for safe evacuation without panic.",
            [
                "Drills teach safety, not fear of outdoor play.",
                "Detectors must remain functional.",
                "Exits and plans remain essential.",
            ],
            "easy",
        ),
        (
            "Food allergy management in a classroom should include:",
            "Knowing each child's allergies, preventing cross-contact, and having an emergency plan (e.g., epinephrine access per policy)",
            [
                "Offering peanuts to test who reacts",
                "Hiding allergy information from substitutes",
                "Assuming all rashes are unrelated forever",
            ],
            "Prevention plus ready emergency response protects children with life-threatening allergies.",
            [
                "Intentional exposure is dangerous.",
                "Substitutes need allergy/emergency info.",
                "Symptoms need assessment/communication.",
            ],
            "medium",
        ),
        (
            "Diapering procedures should emphasize:",
            "Hygiene steps that prevent contamination of hands, surfaces, and clean supplies",
            [
                "Reusing soiled wipes on multiple children",
                "Placing dirty diapers on the snack table",
                "Skipping handwashing after diapering if pressed for time",
            ],
            "Proper diapering sequences and disinfection reduce fecal-oral disease transmission.",
            [
                "Wipes are single-child use.",
                "Food surfaces must stay clean.",
                "Handwashing after diapering is mandatory.",
            ],
            "easy",
        ),
        (
            "Active supervision means caregivers:",
            "Position themselves to see and hear children, count frequently, and anticipate risks",
            [
                "Sit in an office while children play unsupervised",
                "Rely only on older children to watch toddlers",
                "Use phones so intently that scanning stops",
            ],
            "Supervision is visual, auditory, and mental engagement—not passive presence.",
            [
                "Remote sitting is not supervision.",
                "Children cannot replace adult duty of care.",
                "Phone distraction breaks supervision.",
            ],
            "easy",
        ),
        (
            "When a child is injured, documentation should generally be:",
            "Factual, timely, and shared with parents/guardians per program policy",
            [
                "Altered later to hide details",
                "Posted publicly with the child's full medical history",
                "Delayed for several weeks without notice",
            ],
            "Accurate incident reports support care continuity, family communication, and program accountability.",
            [
                "Falsifying records is unethical/illegal.",
                "Confidentiality limits public posting of health details.",
                "Families need prompt notification for significant injuries.",
            ],
            "medium",
        ),
        (
            "Toy sanitation practices should include:",
            "Regular cleaning/sanitizing of mouthed toys and high-touch materials on a schedule and after contamination",
            [
                "Never cleaning toys because germs build immunity best unchecked",
                "Soaking electronics in bleach water daily without unplugging",
                "Sharing toothbrushes labeled for one child among the group",
            ],
            "Mouthed and frequently handled items need routine sanitation appropriate to the material.",
            [
                "Uncontrolled germ exposure is not a hygiene plan.",
                "Electronics need manufacturer-safe cleaning.",
                "Toothbrushes are individual-use items.",
            ],
            "medium",
        ),
        (
            "A child with fever and vomiting should generally:",
            "Be excluded per health policy until criteria for return are met",
            [
                "Remain in group care to 'tough it out'",
                "Be given another child's prescription",
                "Be left alone in a closet to rest",
            ],
            "Exclusion policies protect the ill child and limit outbreak spread; isolation must be supervised and appropriate.",
            [
                "Ill children need exclusion/care, not endurance in group care.",
                "Sharing prescriptions is unsafe.",
                "Unsupervised isolation is neglectful.",
            ],
            "easy",
        ),
        (
            "Emergency contact information should be:",
            "Current, accessible to staff, and used when parents cannot be reached as authorized",
            [
                "Stored only in a locked home 50 miles away",
                "Guessed from social media profiles",
                "Shared with strangers for marketing lists",
            ],
            "Up-to-date emergency contacts enable rapid response during illness/injury/evacuation.",
            [
                "Contacts must be on-site/accessible to staff.",
                "Staff must use authorized program records.",
                "Contacts are confidential, not marketing data.",
            ],
            "easy",
        ),
        (
            "Childproofing a classroom includes:",
            "Securing chemicals, covering outlets, and removing choking hazards appropriate to ages served",
            [
                "Leaving bleach bottles at child height for easy access",
                "Offering small magnets as toddler snacks",
                "Disabling smoke alarms to avoid noise",
            ],
            "Environment design matches developmental abilities to prevent poisoning, choking, and burns.",
            [
                "Chemicals must be locked/out of reach.",
                "Small objects are choking hazards.",
                "Alarms must remain functional.",
            ],
            "easy",
        ),
        (
            "Ratio and group-size rules exist primarily to:",
            "Support adequate supervision and quality interactions for children's safety and learning",
            [
                "Maximize overcrowding for profit regardless of risk",
                "Eliminate the need for any planned activities",
                "Allow staff to leave the building during nap unchecked",
            ],
            "Licensing ratios protect children by ensuring enough adults for care and emergencies.",
            [
                "Overcrowding increases risk.",
                "Ratios support—not replace—curriculum planning.",
                "Supervision remains required during rest.",
            ],
            "medium",
        ),
    ],
    "physical-cog": [
        (
            "Gross motor development in preschoolers is best supported by:",
            "Daily opportunities for running, climbing, balancing, and outdoor play with safe challenges",
            [
                "Keeping children seated all day with no movement",
                "Only fine motor worksheets for eight hours",
                "Punishing active play as misbehavior always",
            ],
            "Large-muscle practice builds coordination, strength, and healthy habits.",
            [
                "Sedentary days hinder gross motor growth.",
                "Fine motor alone is insufficient.",
                "Active play is developmentally appropriate, not misbehavior.",
            ],
            "easy",
        ),
        (
            "Fine motor skills are strengthened by activities such as:",
            "Drawing, stringing beads, using child-safe scissors, and manipulating small objects",
            [
                "Only watching videos of writing",
                "Avoiding all hand use",
                "Running laps exclusively",
            ],
            "Hands-on manipulation builds the precision needed for writing and self-care.",
            [
                "Passive watching is weak practice.",
                "Hand use is essential.",
                "Running builds gross, not fine, motor primarily.",
            ],
            "easy",
        ),
        (
            "According to Piaget, preschoolers are often in the preoperational stage, which features:",
            "Symbolic play and egocentric thinking with limited conservation",
            [
                "Formal abstract algebra as the main activity",
                "No pretend play at all",
                "Complete adult logic in all tasks",
            ],
            "Preoperational children use symbols/pretend but struggle with conservation and others' perspectives.",
            [
                "Formal operations come much later.",
                "Pretend play is hallmark of this stage.",
                "Adult logic is not yet consistent.",
            ],
            "medium",
        ),
        (
            "Scaffolding means a teacher:",
            "Provides temporary support that helps a child succeed just beyond independent ability, then fades help",
            [
                "Does the entire task for the child forever",
                "Refuses any help so the child quits",
                "Ignores the child's current skill level",
            ],
            "Vygotsky-inspired scaffolding targets the zone of proximal development.",
            [
                "Permanent takeover prevents learning.",
                "Abandonment is not scaffolding.",
                "Support must match current level.",
            ],
            "medium",
        ),
        (
            "An age-appropriate science experience for preschoolers is:",
            "Observing, predicting, and describing simple cause-effect (e.g., sinking/floating) with hands-on materials",
            [
                "Memorizing college-level chemistry equations only",
                "Forbidding questions about nature",
                "Replacing exploration with silent copying of formulas",
            ],
            "Inquiry-based exploration builds scientific thinking at the preschool level.",
            [
                "College chem is not developmentally matched.",
                "Curiosity should be encouraged.",
                "Rote formulas miss experiential learning.",
            ],
            "easy",
        ),
        (
            "Object permanence is the understanding that:",
            "Objects continue to exist even when out of sight",
            [
                "Objects vanish forever when covered",
                "Only adults exist when unseen",
                "Toys change ownership every minute automatically",
            ],
            "Object permanence emerges in infancy and supports search behavior and security.",
            [
                "Infants initially act as if hidden objects are gone.",
                "Existence is not limited to adults.",
                "Ownership is a social rule, not object permanence.",
            ],
            "easy",
        ),
        (
            "Developmentally appropriate practice (DAP) emphasizes:",
            "Teaching that fits age, individual needs, and social-cultural context",
            [
                "One rigid worksheet for all ages from birth to 5",
                "Ignoring individual differences",
                "Only academic drill with no play",
            ],
            "DAP balances child development knowledge, individualization, and meaningful context—including play.",
            [
                "One-size worksheets ignore development.",
                "Individualization is core to DAP.",
                "Play is a primary learning mode in early childhood.",
            ],
            "medium",
        ),
        (
            "To support emerging literacy, caregivers should:",
            "Read aloud daily, talk about print, and provide writing/drawing materials",
            [
                "Avoid books until first grade",
                "Punish scribbling as wrong writing",
                "Never name letters or sounds in play",
            ],
            "Rich language and print exposure build foundational literacy before formal reading.",
            [
                "Early book experiences matter.",
                "Scribbling is a writing stage to encourage.",
                "Playful letter/sound talk supports literacy.",
            ],
            "easy",
        ),
        (
            "A learning center (interest area) works best when it:",
            "Has clear purposes, accessible materials, and enough space for independent/small-group exploration",
            [
                "Is cluttered with broken items and no organization",
                "Is permanently locked during free play",
                "Offers only one pencil for twenty children always",
            ],
            "Well-designed centers invite choice, engagement, and skill practice.",
            [
                "Clutter and breakage reduce learning and safety.",
                "Locked centers block exploration time.",
                "Insufficient materials cause conflict and idle waiting.",
            ],
            "medium",
        ),
        (
            "Observation-based assessment in early childhood should be:",
            "Ongoing, objective notes of what children do and say to inform planning",
            [
                "Only a single high-stakes test for toddlers",
                "Based solely on gossip about families",
                "Used to shame children publicly",
            ],
            "Authentic assessment through observation guides curriculum and identifies needs without inappropriate testing.",
            [
                "High-stakes testing is inappropriate for toddlers.",
                "Assessment needs direct evidence.",
                "Shaming harms children and is unprofessional.",
            ],
            "medium",
        ),
        (
            "Sensory play (sand, water, playdough) supports cognition by:",
            "Encouraging exploration, vocabulary, comparison, and problem-solving through the senses",
            [
                "Only making messes with no learning value",
                "Replacing all adult-child conversation forever",
                "Teaching only silent obedience",
            ],
            "Sensory materials are vehicles for STEM language, measurement concepts, and focus.",
            [
                "Mess can be managed; learning value is high.",
                "Conversation during sensory play deepens learning.",
                "The goal is exploration, not mute compliance.",
            ],
            "easy",
        ),
        (
            "When a toddler repeats the same puzzle many times, the caregiver should recognize this as:",
            "Mastery play that builds competence and confidence",
            [
                "Proof the child is failing",
                "A reason to confiscate all toys",
                "Misbehavior requiring punishment",
            ],
            "Repetition is how young children consolidate skills; it is healthy, not failure.",
            [
                "Repetition signals practice, not failure.",
                "Removing materials blocks learning.",
                "Practice is not misbehavior.",
            ],
            "easy",
        ),
        (
            "Math concepts for preschoolers are best introduced through:",
            "Counting real objects, sorting, patterning, and measuring in play contexts",
            [
                "Only abstract theorems without materials",
                "Forbidding counting during block play",
                "Flashcards alone with no manipulation",
            ],
            "Concrete, playful math builds number sense more effectively than abstract drill alone.",
            [
                "Young children need concrete experiences.",
                "Block play is rich in math talk.",
                "Manipulation strengthens understanding.",
            ],
            "easy",
        ),
        (
            "Executive function skills in early childhood include:",
            "Working memory, inhibitory control, and cognitive flexibility",
            [
                "Only shoe-tying speed",
                "Only height and weight",
                "Only favorite color",
            ],
            "Executive functions support attention, self-control, and flexible thinking—predictive of school success.",
            [
                "Self-care motor skills differ from executive function.",
                "Growth measures are physical health metrics.",
                "Preferences are not executive functions.",
            ],
            "hard",
        ),
        (
            "A teacher notices a 4-year-old struggling to hold a crayon. An appropriate response is to:",
            "Offer thicker crayons/adaptive tools and more fine-motor play, and monitor progress",
            [
                "Force perfect adult pencil grip immediately with shame",
                "Remove all art materials permanently",
                "Diagnose a medical condition without any referral process",
            ],
            "Adaptations and practice support development; concerns may later involve specialists via proper channels—not shame.",
            [
                "Shame harms motivation and is inappropriate.",
                "Art supports development; removal is counterproductive.",
                "Teachers observe and refer through policy; they do not independently diagnose.",
            ],
            "hard",
        ),
    ],
    "social-communication": [
        (
            "Parallel play is typical when children:",
            "Play side by side with similar materials but limited interaction",
            [
                "Always negotiate complex team rules like adults",
                "Never play near peers",
                "Only play alone until adolescence",
            ],
            "Toddlers often engage in parallel play before fully cooperative play emerges.",
            [
                "Complex cooperative games develop later.",
                "Proximity play is common.",
                "Solitary play continues but is not the only form.",
            ],
            "easy",
        ),
        (
            "When two preschoolers argue over a toy, an effective guidance approach is:",
            "Help them name feelings, state the problem, and try solutions (taking turns, timers, alternatives)",
            [
                "Shame one child publicly as 'selfish' for 30 minutes",
                "Ignore dangerous hitting without intervening",
                "Give the toy only to the loudest child always",
            ],
            "Problem-solving guidance teaches social skills; safety intervention is required for aggression.",
            [
                "Public shame damages self-esteem.",
                "Hitting needs immediate safety response.",
                "Rewarding volume teaches coercion.",
            ],
            "medium",
        ),
        (
            "Serve-and-return interaction means:",
            "Caregivers notice a child's cue and respond contingently, building language and attachment",
            [
                "Serving snacks without any conversation",
                "Returning phone calls during circle only",
                "Ignoring infant vocalizations",
            ],
            "Responsive back-and-forth exchanges wire social brain development and communication.",
            [
                "Food service alone is not serve-and-return.",
                "Adult phone focus misses child cues.",
                "Ignoring cues weakens language growth.",
            ],
            "easy",
        ),
        (
            "Emotional literacy is supported when adults:",
            "Label emotions and coach calm-down strategies in the moment",
            [
                "Tell children feelings are not allowed",
                "Mock crying as babyish",
                "Never acknowledge frustration",
            ],
            "Naming feelings and co-regulation help children internalize self-regulation skills.",
            [
                "Feelings are valid and teachable moments.",
                "Mockery harms trust.",
                "Acknowledgment is the starting point for coaching.",
            ],
            "easy",
        ),
        (
            "A language-rich classroom includes:",
            "Conversations, songs, stories, and open-ended questions throughout the day",
            [
                "Silence rules during all free play forever",
                "Only one-word commands with no discussion",
                "Television replacing all adult talk",
            ],
            "Quantity and quality of adult-child talk predict language outcomes.",
            [
                "Play talk is valuable learning time.",
                "Extended discourse builds vocabulary.",
                "Screens do not replace responsive caregivers.",
            ],
            "easy",
        ),
        (
            "Positive guidance differs from punishment because it:",
            "Teaches expected behavior and skills rather than only applying harsh penalties",
            [
                "Uses humiliation as the main tool",
                "Ignores safety rules",
                "Withholds all affection permanently after mistakes",
            ],
            "Guidance is instructive and relationship-based; punishment alone does not teach alternatives.",
            [
                "Humiliation is harmful practice.",
                "Safety limits remain necessary.",
                "Warm relationships support learning from mistakes.",
            ],
            "medium",
        ),
        (
            "Children with delayed speech benefit when teachers:",
            "Use visual supports, expand child utterances, and collaborate with families/specialists as needed",
            [
                "Refuse to listen until speech is perfect",
                "Exclude them from group stories",
                "Speak only at adult lecture speed with no visuals",
            ],
            "Inclusive strategies and early collaboration improve communication access.",
            [
                "Listening builds trust and models language.",
                "Stories support language; exclusion harms.",
                "Slower, supported input helps comprehension.",
            ],
            "medium",
        ),
        (
            "Prosocial behavior (sharing, helping) is encouraged by:",
            "Modeling kindness, noticing prosocial acts, and providing cooperative activities",
            [
                "Only rewarding aggression",
                "Never acknowledging helpful acts",
                "Separating children from all peer contact always",
            ],
            "Children learn social behavior through models, reinforcement, and practice opportunities.",
            [
                "Rewarding aggression increases it.",
                "Specific praise strengthens prosocial acts.",
                "Peer contact is needed to practice skills.",
            ],
            "easy",
        ),
        (
            "Separation anxiety is best handled by:",
            "Consistent goodbye routines, warm reassurance, and predictable caregivers",
            [
                "Sneaking away without goodbye every day",
                "Ridiculing the child for crying",
                "Changing teachers hourly without notice",
            ],
            "Predictable rituals and trust reduce distress; sneaking away often increases anxiety.",
            [
                "Clear goodbyes build security.",
                "Ridicule worsens distress.",
                "Stability of caregivers matters.",
            ],
            "medium",
        ),
        (
            "Cultural responsiveness in communication means:",
            "Respecting family languages/practices and incorporating diverse books, songs, and perspectives",
            [
                "Requiring all families to abandon home language immediately",
                "Using only one cultural holiday story forever",
                "Ignoring family preferences about names/pronunciation",
            ],
            "Honoring identity and home language supports belonging and learning.",
            [
                "Home language is an asset.",
                "Diversity should be ongoing, not token.",
                "Correct name use shows respect.",
            ],
            "medium",
        ),
        (
            "During circle time, engagement improves when the teacher:",
            "Keeps sessions brief, interactive, and matched to attention spans",
            [
                "Lectures for 45 minutes with no movement",
                "Forbids any child response",
                "Uses only abstract worksheets for infants",
            ],
            "Short, participatory group times fit early childhood attention and invite communication.",
            [
                "Long lectures lose young children.",
                "Response opportunities build language.",
                "Infant 'worksheets' are inappropriate.",
            ],
            "easy",
        ),
        (
            "Biting in toddlers is often related to:",
            "Limited language, teething, or overwhelm—and needs calm interruption plus teaching alternatives",
            [
                "Proof the child is permanently 'bad'",
                "A reason to bite the child back",
                "Ignoring the victim's needs",
            ],
            "Biting is a developmental challenge requiring safety, support for both children, and skill teaching—not retaliation.",
            [
                "Labeling children as bad is harmful and inaccurate.",
                "Retaliation models aggression and is abusive.",
                "Victims need comfort and care.",
            ],
            "hard",
        ),
        (
            "Active listening with children includes:",
            "Getting to their level, making eye contact as culturally appropriate, and reflecting their message",
            [
                "Interrupting to change the subject to adult gossip",
                "Looking only at your phone",
                "Correcting grammar before hearing content every time",
            ],
            "Attuned listening validates children and models conversation skills.",
            [
                "Child concerns deserve attention.",
                "Phones signal disinterest.",
                "Content understanding comes before grammar drills.",
            ],
            "easy",
        ),
        (
            "Peer conflict mediation teaches children to:",
            "Express needs with words and negotiate fair solutions with adult coaching",
            [
                "Always win by force",
                "Never speak about problems",
                "Rely on adults to solve every tiny issue forever without skill growth",
            ],
            "Coached mediation builds autonomy and communication over time.",
            [
                "Force is unacceptable.",
                "Talking through problems is the goal.",
                "Adults scaffold, then fade as skills grow.",
            ],
            "medium",
        ),
        (
            "A child who rarely speaks in class but is verbal at home may be showing:",
            "Selective mutism or shyness—respond with patience, low pressure, and family/specialist collaboration as needed",
            [
                "A reason to force public speeches daily as punishment",
                "Proof of laziness only",
                "An excuse to exclude the child from all activities",
            ],
            "Reluctant speech needs supportive approaches; forcing/punishing can worsen anxiety.",
            [
                "Forced performance increases anxiety.",
                "Anxiety/shyness ≠ laziness.",
                "Inclusion with supports is appropriate.",
            ],
            "hard",
        ),
    ],
    "families-professional": [
        (
            "Family engagement works best when programs:",
            "Build reciprocal partnerships that respect families as children's first teachers",
            [
                "Blame families for every challenge without collaboration",
                "Communicate only when there is a crisis and never share positives",
                "Exclude families from any classroom information",
            ],
            "Strengths-based partnership improves outcomes more than deficit blaming.",
            [
                "Collaboration beats blame.",
                "Regular positive communication builds trust.",
                "Transparency (within confidentiality) supports partnership.",
            ],
            "easy",
        ),
        (
            "Confidentiality requires that staff:",
            "Share child/family information only with authorized persons for legitimate care reasons",
            [
                "Gossip about families in the grocery line",
                "Post identifiable child struggles on personal social media",
                "Give records to any visitor who asks casually",
            ],
            "Privacy protects dignity and is a professional/legal expectation.",
            [
                "Public gossip breaches confidentiality.",
                "Social media posting of private info is improper.",
                "Records release follows policy/authorization.",
            ],
            "easy",
        ),
        (
            "Mandatory reporting means caregivers must:",
            "Report suspected child abuse/neglect to authorities as required by law",
            [
                "Investigate alone for months before telling anyone",
                "Confront the suspected abuser aggressively as the first step always",
                "Ignore clear signs because reporting is optional for teachers",
            ],
            "Early childhood professionals are typically mandated reporters; report suspicions per statute—do not delay for private investigation.",
            [
                "Delay can increase harm; report promptly.",
                "Safety and reporting protocols come first; confrontation can escalate risk.",
                "Reporting is a legal duty, not optional.",
            ],
            "medium",
        ),
        (
            "A professional portfolio for CDA typically includes:",
            "Resource collections, competency statements, and evidence of practice with children/families",
            [
                "Only unrelated vacation photos",
                "Blank pages with no reflections",
                "Confidential family medical files copied illegally",
            ],
            "The CDA professional portfolio documents competence across functional areas with appropriate evidence.",
            [
                "Vacation photos do not document competencies.",
                "Reflections/evidence are required elements.",
                "Confidential records must not be misused.",
            ],
            "medium",
        ),
        (
            "When a parent disagrees with a classroom approach, the educator should:",
            "Listen respectfully, explain the developmental rationale, and seek collaborative solutions",
            [
                "Argue loudly in front of children",
                "Refuse any conversation",
                "Change the subject to gossip about other families",
            ],
            "Respectful dialogue maintains partnership even through disagreement.",
            [
                "Public conflict models poor communication.",
                "Avoidance damages trust.",
                "Gossip violates professionalism.",
            ],
            "easy",
        ),
        (
            "Reflective practice means teachers:",
            "Examine what worked, what did not, and how to improve intentional teaching",
            [
                "Never review their own methods",
                "Blame only children for all outcomes",
                "Avoid professional development",
            ],
            "Reflection and ongoing learning are hallmarks of professional early educators.",
            [
                "Growth requires review.",
                "Shared responsibility includes teacher planning.",
                "PD supports quality practice.",
            ],
            "easy",
        ),
        (
            "Dual-language families should be encouraged to:",
            "Continue home language use while the program supports English/additional language learning",
            [
                "Stop speaking the home language immediately in all settings",
                "Avoid reading any books at home",
                "Hide cultural traditions from the school",
            ],
            "Home language maintenance supports identity and cognition; programs can add languages without erasure.",
            [
                "Home language is an asset.",
                "Home reading in any language helps literacy.",
                "Cultural sharing builds belonging.",
            ],
            "medium",
        ),
        (
            "An ethical response to a coworker yelling at a child is to:",
            "Intervene for the child's safety/dignity and follow program reporting procedures",
            [
                "Join in yelling to show solidarity",
                "Film for entertainment online",
                "Ignore ongoing harmful practice",
            ],
            "Protecting children and upholding ethics may require intervention and reporting through proper channels.",
            [
                "Yelling solidarity worsens harm.",
                "Exploitative filming is unprofessional.",
                "Ignoring abuse/inappropriate discipline is unethical.",
            ],
            "hard",
        ),
        (
            "Transition conferences or daily reports help families by:",
            "Sharing observations about the child's day, learning, and needs for continuity of care",
            [
                "Replacing all in-person greetings forever with silence",
                "Listing only negative comments without balance",
                "Discussing other children's private issues",
            ],
            "Two-way communication supports consistency between home and school.",
            [
                "Warm daily contact still matters.",
                "Balanced updates build partnership.",
                "Other children's information stays confidential.",
            ],
            "easy",
        ),
        (
            "Professional appearance and conduct in childcare settings should:",
            "Model respect, safety, and role-appropriate behavior for children and families",
            [
                "Include sharing confidential stories for laughs with visitors",
                "Allow arriving intoxicated",
                "Ignore program dress/safety policies",
            ],
            "Professionals represent the program and children's wellbeing through conduct and reliability.",
            [
                "Confidentiality is not entertainment.",
                "Impairment endangers children.",
                "Policies exist for safety and professionalism.",
            ],
            "easy",
        ),
        (
            "Inclusion of children with disabilities is supported when staff:",
            "Adapt environment/activities and collaborate with families and specialists on goals",
            [
                "Exclude children who learn differently without attempting supports",
                "Refuse to follow any individualized plan",
                "Segregate them from all peers permanently without justification",
            ],
            "Least restrictive, supportive inclusion aligns with ethical and legal expectations in early care/education.",
            [
                "Exclusion without supports is discriminatory practice.",
                "IEP/IFSP/plans guide appropriate adaptations.",
                "Peer participation has developmental value when appropriately supported.",
            ],
            "medium",
        ),
        (
            "A CDA candidate's observation (verification) visit is intended to:",
            "Document competent practice with children through a formal observation process",
            [
                "Replace the need for any training ever",
                "Grade families on income",
                "Test children's IQ for ranking",
            ],
            "CDA assessment includes observation of the candidate's work with children as evidence of competence.",
            [
                "Training/preparation remain part of the pathway.",
                "Family income is not the observation purpose.",
                "CDA is about educator competence, not ranking child IQ.",
            ],
            "medium",
        ),
        (
            "When documenting children's progress for families, writing should be:",
            "Specific, objective, and strength-based with clear examples",
            [
                "Vague insults",
                "Comparisons that shame one child against another by name in a group email",
                "Medical diagnoses invented by the teacher",
            ],
            "Professional documentation informs without labeling harmfully or exceeding the educator's role.",
            [
                "Insults are unprofessional.",
                "Public comparative shaming is harmful.",
                "Diagnosis belongs to qualified professionals.",
            ],
            "medium",
        ),
        (
            "Advocacy as an early childhood professional can include:",
            "Supporting policies and practices that improve quality, equity, and children's wellbeing",
            [
                "Falsifying attendance for funding",
                "Ignoring licensing violations knowingly",
                "Discouraging families from accessing community resources",
            ],
            "Ethical advocacy advances children and the profession within legal/professional bounds.",
            [
                "Fraud is illegal.",
                "Licensing protects children.",
                "Connecting families to resources is supportive practice.",
            ],
            "hard",
        ),
        (
            "Continuing professional development after earning a CDA should be viewed as:",
            "An ongoing responsibility to deepen knowledge and improve practice",
            [
                "Unnecessary once any credential is earned",
                "Only required if a director is angry",
                "A one-time workshop that lasts a lifetime without refreshers",
            ],
            "Early childhood quality depends on lifelong learning beyond initial credentialing.",
            [
                "Credentials start—not end—growth.",
                "PD is a professional norm, not a punishment.",
                "Knowledge and standards evolve; refreshers matter.",
            ],
            "easy",
        ),
    ],
}

def main() -> None:
    write_bank(SLUG, topics)


if __name__ == "__main__":
    main()
