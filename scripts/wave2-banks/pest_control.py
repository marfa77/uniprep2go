#!/usr/bin/env python3
"""Structural Pest Control Applicator — 60 curated MCQs (4×15)."""
from write_helper import write_bank

SLUG = "pest-control-applicator-readiness-check"

topics = {
    "pests-id": [
        (
            "German cockroaches are best identified by:",
            "Small size and two dark longitudinal stripes on the pronotum",
            [
                "Being the size of a mouse with no markings",
                "Producing light like fireflies",
                "Having only four legs",
            ],
            "Blattella germanica is small, light brown, with two pronotal stripes—common indoor pest.",
            [
                "They are not mouse-sized.",
                "They do not bioluminesce.",
                "Insects have six legs.",
            ],
            "easy",
        ),
        (
            "Bed bugs typically feed on:",
            "Blood of humans (and other hosts) usually at night",
            [
                "Only wood cellulose like termites",
                "Only stored flour",
                "Only living plant leaves outdoors",
            ],
            "Cimex lectularius are hematophagous ectoparasites associated with sleeping areas.",
            [
                "Wood feeding is termites/carpenter ants context.",
                "Flour pests are stored-product insects.",
                "Bed bugs are not plant chewers.",
            ],
            "easy",
        ),
        (
            "Subterranean termite workers are generally:",
            "Soft-bodied, light-colored, and avoid open air/light by using mud tubes",
            [
                "Hard-bodied beetles that fly into kitchens for crumbs only",
                "Bright red with black spots like lady beetles",
                "Aquatic nymphs that need ponds",
            ],
            "Subterranean termites maintain contact with soil moisture and build shelter tubes.",
            [
                "That describes pantry beetles more than termites.",
                "Lady beetles are beneficial predators.",
                "Termites are terrestrial social insects.",
            ],
            "easy",
        ),
        (
            "Carpenter ants damage wood by:",
            "Excavating galleries for nesting (they do not eat wood for nutrition like termites)",
            [
                "Digesting cellulose with protozoa exactly like subterranean termites",
                "Feeding only on blood",
                "Never nesting in structures",
            ],
            "Carpenter ants smooth galleries in wood for housing; frass may be present; termites consume wood.",
            [
                "Termites digest cellulose; carpenter ants excavate.",
                "They are not blood feeders.",
                "Structural nesting is common.",
            ],
            "medium",
        ),
        (
            "Rodent droppings that are capsule-shaped (~¾ inch) suggest:",
            "Norway rats more than house mice",
            [
                "Fruit flies",
                "German cockroaches exclusively",
                "Bed bug fecal spots only",
            ],
            "Norway rat pellets are larger; mouse droppings are smaller rods; ID guides treatment.",
            [
                "Flies leave different signs.",
                "Cockroach droppings differ in size/shape.",
                "Bed bug feces are dark spots on fabrics/wood.",
            ],
            "medium",
        ),
        (
            "Anopheles mosquitoes are important because some species transmit:",
            "Malaria parasites",
            [
                "Only termites",
                "Only lead poisoning",
                "Only structural wood decay fungi as the vector",
            ],
            "Anopheles vectors Plasmodium; control reduces disease risk in endemic/relevant contexts.",
            [
                "Termites are not mosquito-transmitted.",
                "Lead is environmental, not mosquito-borne.",
                "Decay fungi are not mosquito diseases.",
            ],
            "medium",
        ),
        (
            "Complete metamorphosis includes which stages?",
            "Egg, larva, pupa, adult",
            [
                "Egg and adult only",
                "Nymph stages identical to adults only (incomplete)",
                "Spore, hypha, mushroom",
            ],
            "Holometabolous pests (fleas, flies, beetles, mosquitoes) have larval/pupal stages.",
            [
                "Many pests have more than two stages.",
                "Incomplete metamorphosis uses nymphs.",
                "That describes fungi.",
            ],
            "easy",
        ),
        (
            "Stored-product pests such as Indian meal moths are typically found in:",
            "Pantry goods like grains, cereals, and dried foods",
            [
                "Only septic tanks",
                "Only structural lumber in crawlspaces",
                "Only on living oak trees outdoors as borers exclusively",
            ],
            "Pantry moths/beetles infest packaged dry foods; sanitation and discard are key.",
            [
                "Septic flies differ.",
                "Wood pests differ.",
                "Tree borers are different pests.",
            ],
            "easy",
        ),
        (
            "Brown recluse spiders are medically important because of:",
            "Necrotic potential from venom in some bites",
            [
                "Transmitting malaria",
                "Eating only concrete",
                "Being harmless millipedes",
            ],
            "Loxosceles reclusa venom can cause dermonecrosis; ID and medical care matter—many 'recluse' IDs are wrong.",
            [
                "Malaria is mosquito-borne.",
                "Spiders do not eat concrete.",
                "They are spiders, not millipedes.",
            ],
            "medium",
        ),
        (
            "Flea larvae typically develop:",
            "Off-host in carpets/soil/bedding debris feeding on organic matter including adult flea feces",
            [
                "Only inside the host's bloodstream as adults permanently",
                "Only in clean empty stainless steel with no debris",
                "Only underwater in aquaria",
            ],
            "IPM targets eggs/larvae in the environment, not just adult fleas on pets.",
            [
                "Adults blood-feed; larvae are environmental.",
                "Debris is larval habitat.",
                "Fleas are not aquatic aquaria pests.",
            ],
            "medium",
        ),
        (
            "Powderpost beetles are associated with:",
            "Infesting hardwoods and leaving fine flour-like frass from exit holes",
            [
                "Building mud tubes from soil to siding exclusively like subterranean termites",
                "Feeding only on blood at night",
                "Pollinating crops as bees",
            ],
            "Lyctid/anobiid powderpost activity shows pinholes and powdery frass in susceptible wood.",
            [
                "Mud tubes indicate subterranean termites.",
                "Blood feeding is bed bugs/fleas/mosquitoes.",
                "They are not bees.",
            ],
            "medium",
        ),
        (
            "House mouse distinguishing traits include:",
            "Small size, large ears relative to head, and droppings that are small and rod-shaped",
            [
                "Body length over two feet",
                "Hooves",
                "Feathers",
            ],
            "Mus musculus is small with characteristic droppings and gnaw marks; ID guides bait station placement.",
            [
                "That size is not a mouse.",
                "Mice do not have hooves.",
                "Mice are mammals without feathers.",
            ],
            "easy",
        ),
        (
            "Drift of pest ID errors matters because:",
            "Wrong ID leads to wrong tactics, wasted pesticide, and continued infestation",
            [
                "All pests respond identically to any product",
                "Labels never mention target pests",
                "ID is optional for certified applicators",
            ],
            "Correct identification is the foundation of IPM and legal labeled use.",
            [
                "Pests differ in biology/susceptibility.",
                "Labels specify sites/pests.",
                "ID is a core competency.",
            ],
            "easy",
        ),
        (
            "Formosan subterranean termites differ from many native subterranean species by:",
            "Often larger colonies and aggressive structural damage potential in introduced ranges",
            [
                "Being beneficial pollinators only",
                "Living only in arctic ice",
                "Never using carton/nests in structures",
            ],
            "Coptotermes formosanus can cause severe damage; regional knowledge informs inspection intensity.",
            [
                "They are destructive pests.",
                "They inhabit warm/humid regions.",
                "They can build carton nests in structures.",
            ],
            "hard",
        ),
        (
            "Mosquito larvae (wrigglers) are found in:",
            "Standing water habitats",
            [
                "Only dry flour bags",
                "Only kiln-dried lumber interiors with no moisture",
                "Only sealed sterile vials in labs as the sole habitat worldwide",
            ],
            "Source reduction of standing water is primary mosquito IPM.",
            [
                "Flour suggests pantry pests.",
                "Dry lumber is not larval mosquito habitat.",
                "Wild populations use environmental water.",
            ],
            "easy",
        ),
    ],
    "pesticides": [
        (
            "The pesticide label is:",
            "A legal document—use inconsistent with the label is generally a violation",
            [
                "Optional reading material",
                "Only a marketing brochure",
                "Suggestions that never matter in inspections",
            ],
            "FIFRA makes the label the law; applicators must follow directions, rates, PPE, and site uses.",
            [
                "Labels are mandatory.",
                "Labels are regulatory, not just ads.",
                "Inspectors enforce label compliance.",
            ],
            "easy",
        ),
        (
            "LD50 refers to:",
            "The dose lethal to 50% of a test population—lower LD50 means higher acute toxicity",
            [
                "The legal discount of 50% on products",
                "Days until a pesticide expires always",
                "The percentage of inert ingredients only",
            ],
            "Acute toxicity categories use LD50/LC50 concepts; signal words reflect relative hazard.",
            [
                "Not a price discount.",
                "Not shelf-life days.",
                "Inerts are listed separately; LD50 is toxicity metric.",
            ],
            "easy",
        ),
        (
            "Signal word DANGER on a label indicates:",
            "High acute toxicity / high hazard relative to CAUTION/WARNING categories",
            [
                "The product is always nontoxic",
                "No PPE is ever needed",
                "It is safer than CAUTION products always by definition",
            ],
            "DANGER (sometimes with Poison/skull) denotes highest acute toxicity category among common signal words.",
            [
                "DANGER means higher hazard.",
                "PPE is specified on the label.",
                "CAUTION is lower acute toxicity category than DANGER.",
            ],
            "easy",
        ),
        (
            "IPM emphasizes:",
            "Combining inspection, sanitation, exclusion, and pesticides only as needed",
            [
                "Calendar spraying without inspection forever",
                "Using the highest rate possible always",
                "Ignoring harborage and sanitation",
            ],
            "Integrated Pest Management reduces reliance on chemicals by addressing root causes.",
            [
                "Blind calendars waste pesticide and select resistance.",
                "Maximum rates are not default.",
                "Sanitation/exclusion are foundational.",
            ],
            "easy",
        ),
        (
            "A residual insecticide is intended to:",
            "Remain active on treated surfaces for a period to kill pests contacting residues",
            [
                "Evaporate instantly with no surface activity",
                "Act only as a fertilizer",
                "Neutralize all odors permanently",
            ],
            "Residuals differ from contact-only/space sprays; placement and surface type affect performance.",
            [
                "Residuals persist by design (within label limits).",
                "Not fertilizers.",
                "Odor control is not the mode of action definition.",
            ],
            "easy",
        ),
        (
            "Bait formulations work best when:",
            "Competing food is reduced and baits are placed in areas of pest activity per label",
            [
                "Sprayed as a broadcast fog over food prep surfaces contrary to label",
                "Mixed into family dinners",
                "Placed only in unreachable voids with zero pest activity signs",
            ],
            "Baits compete with other food; sanitation and correct placement drive success.",
            [
                "Fogging baits onto food surfaces is misuse.",
                "Baits must never contaminate food.",
                "Placement should match activity.",
            ],
            "medium",
        ),
        (
            "Herbicide exposure risk to an applicator is an example of concern about:",
            "Pesticide toxicity and route of entry (dermal, inhalation, oral)",
            [
                "Only the color of the bottle cap as toxicity",
                "Wind direction never mattering",
                "PPE being purely fashion",
            ],
            "Understanding toxicity and exposure routes guides PPE and handling—even for non-insecticides.",
            [
                "Cap color is not the toxicity measure.",
                "Drift/wind matters for many applications.",
                "PPE is hazard control.",
            ],
            "easy",
        ),
        (
            "Resistance management may include:",
            "Rotating modes of action and integrating nonchemical tactics",
            [
                "Using the same product daily forever at sublethal rates intentionally",
                "Never reading mode-of-action information",
                "Applying below-label rates to 'save money' routinely",
            ],
            "Repeated identical MOAs select resistant populations; IPM slows resistance.",
            [
                "Sublethal chronic exposure can select resistance.",
                "MOA knowledge guides rotation.",
                "Below-label rates are illegal/poor practice.",
            ],
            "medium",
        ),
        (
            "Inert ingredients on a label:",
            "Are not necessarily harmless—follow the label; trade secrets may limit naming but hazards still matter",
            [
                "Are always water and sugar only",
                "Can be ignored for PPE decisions always",
                "Make the product non-regulated",
            ],
            "Inerts can be solvents/carriers with hazards; the full label/SDS informs safe use.",
            [
                "Inerts vary widely.",
                "PPE considers the formulated product.",
                "Pesticide products remain regulated.",
            ],
            "hard",
        ),
        (
            "A restricted-use pesticide (RUP) generally may be applied only by:",
            "Certified applicators (or persons under their direct supervision as allowed by law)",
            [
                "Any untrained homeowner without rules",
                "Children as a school project",
                "Anyone who finds an unmarked bottle",
            ],
            "RUPs require certification due to higher risk; supervision rules are state-specific.",
            [
                "RUPs are not general-use for anyone.",
                "Children must not apply RUPs.",
                "Unmarked bottles are illegal to use.",
            ],
            "easy",
        ),
        (
            "Synergists in insecticide formulations are used to:",
            "Enhance toxicity of the active ingredient (e.g., by inhibiting insect detox enzymes)",
            [
                "Feed beneficial bees exclusively",
                "Neutralize the active ingredient intentionally",
                "Act as the only food attractant in all baits",
            ],
            "Piperonyl butoxide-type synergists can increase efficacy of some actives.",
            [
                "Not a bee feed.",
                "They enhance, not neutralize, actives.",
                "Attractants differ from synergists.",
            ],
            "hard",
        ),
        (
            "Contact vs systemic pesticides differ in that systemics:",
            "Are taken up and move within the treated plant/animal system as designed",
            [
                "Never leave the spray droplet on the surface conceptually",
                "Are identical to inert dusts only",
                "Cannot appear on any label",
            ],
            "Systemic movement affects what pests are controlled and residue considerations; structural uses vary by product.",
            [
                "Systemics move within the organism.",
                "Dusts can be contact; systemics are a property of actives/formulations.",
                "Systemics are labeled when registered.",
            ],
            "medium",
        ),
        (
            "Emulsifiable concentrates (ECs) mixed with water form:",
            "Emulsions that can be more readily absorbed through skin—handle with care",
            [
                "Gases only",
                "Solids that cannot spill",
                "Harmless drinking water",
            ],
            "ECs often use solvents; dermal absorption risk can be significant—PPE per label.",
            [
                "ECs are liquid formulations.",
                "They can spill as liquids.",
                "Never drink pesticide mixes.",
            ],
            "medium",
        ),
        (
            "The SDS (Safety Data Sheet) provides:",
            "Detailed hazard, first aid, spill, and handling information for the product",
            [
                "Only coupon codes",
                "Permission to ignore the label",
                "Guaranteed nontoxicity certificates",
            ],
            "SDS complements the label for occupational hazard communication (HazCom).",
            [
                "Not marketing coupons.",
                "Label directions still govern use.",
                "SDS describes hazards, not 'safe to ignore'.",
            ],
            "easy",
        ),
        (
            "Choosing the least hazardous effective option is part of:",
            "IPM and responsible pesticide selection",
            [
                "Always maximizing toxicity for marketing",
                "Ignoring nonchemical options",
                "Using unlabeled homemade concentrates",
            ],
            "Match product to pest/site with efficacy and risk reduction; homemade mixes are illegal/dangerous.",
            [
                "Higher toxicity is not a goal.",
                "Nonchemical tactics come first when effective.",
                "Unlabeled use is unlawful.",
            ],
            "easy",
        ),
    ],
    "application-safety": [
        (
            "Before spraying indoors, an applicator should:",
            "Read the label, prepare the site (cover/remove items as directed), and wear required PPE",
            [
                "Spray first and read later",
                "Mix by smell",
                "Disable smoke detectors to avoid beeps",
            ],
            "Preparation and PPE prevent exposure and contamination of food/utensils/toys.",
            [
                "Label comes first.",
                "Smell is not measurement.",
                "Detectors must remain functional.",
            ],
            "easy",
        ),
        (
            "The most common route of pesticide exposure for applicators is often:",
            "Dermal (skin) absorption",
            [
                "Telepathy",
                "Exposure only through fingernails growing",
                "None—PPE makes exposure impossible always",
            ],
            "Skin contact during mixing/loading/application is a primary exposure pathway; gloves/coveralls matter.",
            [
                "Not telepathy.",
                "Not nail growth.",
                "PPE reduces—not magically eliminates—all risk if misused.",
            ],
            "easy",
        ),
        (
            "When mixing pesticides, correct practice is to:",
            "Wear label-required PPE, measure accurately, and avoid splash by proper pouring/order",
            [
                "Siphon by mouth",
                "Mix in kitchen cooking pots used for food",
                "Estimate rates as 'about a glug'",
            ],
            "Accurate measurement and anti-splash technique prevent acute exposures and illegal rates.",
            [
                "Mouth siphoning is extremely dangerous.",
                "Food utensils must never be used.",
                "Rates must be measured.",
            ],
            "easy",
        ),
        (
            "If pesticide splashes in the eyes, first aid generally starts with:",
            "Immediate rinsing with clean water for the label/SDS recommended duration while seeking medical help as directed",
            [
                "Rubbing eyes with dirty gloves",
                "Waiting a day to see if it improves without rinsing",
                "Applying more concentrate to 'neutralize'",
            ],
            "Prompt irrigation is critical; follow SDS/label and get medical care with product information.",
            [
                "Rubbing worsens injury.",
                "Delay increases damage.",
                "More chemical worsens injury.",
            ],
            "easy",
        ),
        (
            "Respirator use requires:",
            "Correct respirator type for the hazard, fit, and cartridge change schedules per guidance",
            [
                "Any dust mask for fumigants always",
                "Facial hair that breaks the seal as ideal",
                "Sharing cartridges soaked in pesticide as reuse best practice",
            ],
            "NIOSH-approved respirators must match the chemical; fit and maintenance are mandatory.",
            [
                "Fumigants often need supplied-air/SCBA—not dust masks.",
                "Beards break tight-fitting seals.",
                "Contaminated cartridges are hazardous waste/not shared.",
            ],
            "medium",
        ),
        (
            "To reduce spray drift outdoors:",
            "Avoid high winds, use appropriate nozzles/pressure, and respect buffers",
            [
                "Spray during the windiest part of the day intentionally",
                "Use the finest possible mist in gusts",
                "Ignore sensitive sites downwind",
            ],
            "Drift injures nontargets and creates illegal off-site residues.",
            [
                "High wind increases drift.",
                "Fine droplets drift more.",
                "Sensitive sites need protection.",
            ],
            "easy",
        ),
        (
            "After application, PPE should be:",
            "Removed carefully to avoid contaminating skin, then cleaned or disposed per label",
            [
                "Worn home to hug family before washing",
                "Washed with dishes in the kitchen sink routinely",
                "Never cleaned",
            ],
            "Doffing sequence and separate laundry prevent take-home exposure.",
            [
                "Take-home residue endangers families.",
                "Kitchen sinks are for food hygiene, not PPE.",
                "Reusable PPE needs proper cleaning.",
            ],
            "medium",
        ),
        (
            "Closed mixing/loading systems are designed to:",
            "Reduce handler exposure during concentrate transfer",
            [
                "Increase spills intentionally",
                "Eliminate the need to read labels",
                "Allow mouth siphoning safely",
            ],
            "Engineering controls complement PPE for concentrate handling.",
            [
                "They reduce, not increase, spills.",
                "Labels still govern.",
                "Mouth siphoning remains forbidden.",
            ],
            "medium",
        ),
        (
            "When a spill occurs, priorities include:",
            "Protect people, stop/contain the spill if safe, and clean up per label/SDS and regulations",
            [
                "Hosing concentrates into storm drains immediately",
                "Leaving the spill unattended in a public aisle",
                "Lighting a match to 'burn it off' indoors",
            ],
            "Spill response prevents environmental release and secondary exposures; never create fire/explosion hazards.",
            [
                "Storm drains lead to waterways—illegal/harmful.",
                "Public exposure must be controlled.",
                "Ignition can cause fire/toxic smoke.",
            ],
            "medium",
        ),
        (
            "Calibration of application equipment ensures:",
            "The correct labeled rate is delivered",
            [
                "Random over-application as a buffer always",
                "That gauges never need checking",
                "Legal immunity if you guess",
            ],
            "Uncalibrated equipment causes under-/over-application—efficacy and compliance suffer.",
            [
                "Over-application can be illegal/hazardous.",
                "Gauges/nozzles wear and need checks.",
                "Guessing is not compliance.",
            ],
            "easy",
        ),
        (
            "Space treatments (fogs/mists) require special caution because:",
            "Airborne droplets increase inhalation exposure and may require vacating/reentry intervals",
            [
                "They never move in air",
                "They are always safer than baits for occupied nurseries without precautions",
                "PPE is never specified for fogs",
            ],
            "ULV/fogging can expose lungs; follow ventilation and reentry directions strictly.",
            [
                "Aerosols move with air currents.",
                "Occupied sensitive sites need careful method selection.",
                "Labels specify PPE/reentry.",
            ],
            "medium",
        ),
        (
            "Heat stress risk for applicators rises when:",
            "Wearing impermeable PPE in hot environments without work/rest/hydration planning",
            [
                "Working only in cool shade with breaks always eliminates all legal duties",
                "PPE is unnecessary in heat",
                "Salt tablets replace water without medical guidance always",
            ],
            "PPE increases heat load; employers/applicators must manage heat illness risk.",
            [
                "Cool conditions help but duties remain.",
                "PPE may still be required—manage heat differently.",
                "Hydration strategies should be appropriate; medical guidance matters.",
            ],
            "hard",
        ),
        (
            "Triple rinsing empty pesticide containers is done to:",
            "Remove residues so containers can be disposed/recycled per regulations",
            [
                "Make containers safe as drinking cups",
                "Avoid pressure-rinsing when the label requires proper rinsing",
                "Pour rinsate into creeks",
            ],
            "Rinsate goes into the spray tank when allowed; containers are punctured/recycled per rules—never reused for food/water.",
            [
                "Never use as drinking cups.",
                "Proper rinsing (including pressure rinse) is required.",
                "Rinsate must not enter waterways.",
            ],
            "easy",
        ),
        (
            "A symptom of moderate pesticide poisoning may include:",
            "Nausea, sweating, headache, or other label/SDS-listed effects—seek medical help and take the label/SDS",
            [
                "Feeling heroic and doubling workload without reporting",
                "Assuming all symptoms are allergies to gloves only without evaluation",
                "Drinking milk as proven universal antidote for all pesticide classes",
            ],
            "Recognizing poisoning and getting medical care with product identity saves lives; antidotes are chemical-specific.",
            [
                "Report and get help.",
                "Evaluate exposures seriously.",
                "No universal home antidote exists for all pesticides.",
            ],
            "medium",
        ),
        (
            "When two products are tank-mixed, you must:",
            "Ensure label allows mixing and follow compatibility/order instructions",
            [
                "Mix any two concentrates because stronger is better",
                "Ignore proprietary tank-mix prohibitions",
                "Heat mixtures in a closed bottle over flame",
            ],
            "Incompatible mixes can clog equipment, reduce efficacy, or create hazards; labels govern.",
            [
                "Unauthorized mixes are illegal/dangerous.",
                "Prohibitions must be followed.",
                "Heating closed pesticide containers risks explosion.",
            ],
            "hard",
        ),
    ],
    "laws": [
        (
            "FIFRA is the federal law that primarily:",
            "Regulates pesticide registration, labeling, and sale/use in the United States",
            [
                "Sets only restaurant tip wages",
                "Regulates airline ticket prices",
                "Bans all state authority forever",
            ],
            "The Federal Insecticide, Fungicide, and Rodenticide Act is the core federal pesticide statute; states may be stricter.",
            [
                "Wage law is separate.",
                "Airlines are separate.",
                "States retain important roles.",
            ],
            "easy",
        ),
        (
            "Applying a pesticide to a site not listed on the label is:",
            "Generally illegal (unless a specific legal exemption applies)",
            [
                "Encouraged creativity",
                "Required for certification CEU",
                "Allowed if the pest looks similar",
            ],
            "Site/pest must be on the label; similarity is not a legal substitute.",
            [
                "Creativity does not override law.",
                "Misuse is not CE.",
                "Similar pests still need labeled uses.",
            ],
            "easy",
        ),
        (
            "Pesticide storage should be:",
            "Secure, ventilated as appropriate, locked from children/pets, and segregated from food/feed",
            [
                "In an unlocked toy chest at home",
                "Next to lunch in the truck cab cupholder",
                "Outdoors unlabeled in the rain without secondary containment when required",
            ],
            "Storage rules prevent theft, spills, and accidental exposures; follow label and state rules.",
            [
                "Children must not access pesticides.",
                "Food contamination risk is unacceptable.",
                "Weathering/unlabeled storage creates hazards and violations.",
            ],
            "easy",
        ),
        (
            "Records of commercial applications are important because they:",
            "Document compliance and support investigations if problems arise",
            [
                "Are illegal to keep",
                "Replace the need for a label",
                "Must be destroyed daily always",
            ],
            "Many jurisdictions require application records (product, rate, site, date, applicator).",
            [
                "Records are often required.",
                "Labels still govern use.",
                "Retention periods apply—do not destroy improperly.",
            ],
            "easy",
        ),
        (
            "Endangered species and pollinator protections on labels may require:",
            "Following geographic/use restrictions and timing/method limits to protect nontargets",
            [
                "Ignoring bee icons because they are decorative",
                "Spraying blooming plants attractive to bees contrary to label precautions",
                "Dumping leftovers in habitat areas",
            ],
            "EPA/state mitigations protect listed species and bees; label advisories/restrictions are enforceable.",
            [
                "Bee/pollinator statements matter.",
                "Bloom spray restrictions are common.",
                "Dumping is illegal disposal.",
            ],
            "medium",
        ),
        (
            "Backflow prevention when filling tanks from water supplies is required to:",
            "Prevent pesticide from siphoning into public/private water systems",
            [
                "Increase siphon risk intentionally",
                "Flavor drinking water",
                "Satisfy only aesthetic preferences",
            ],
            "Air gaps/backflow devices protect water supplies during mixing/loading.",
            [
                "Prevention reduces siphon risk.",
                "Contamination is not flavoring.",
                "It is a health/compliance issue.",
            ],
            "medium",
        ),
        (
            "Container disposal must follow:",
            "Label directions and hazardous waste/recycling rules—never reuse for water/food",
            [
                "Burning all containers in backyard piles always as best practice",
                "Burying concentrates in the woods",
                "Pouring leftovers down sanitary drains casually",
            ],
            "Improper disposal contaminates environment and violates law.",
            [
                "Open burning is often illegal/hazardous.",
                "Burial of concentrates is illegal dumping.",
                "Drains lead to treatment plants/waterways issues.",
            ],
            "easy",
        ),
        (
            "State certification of applicators exists to:",
            "Ensure minimum competency for safe, legal pesticide use",
            [
                "Replace federal labels entirely",
                "Allow uncertified RUP use freely",
                "Eliminate CE requirements in all states forever",
            ],
            "Certification/licensing demonstrates knowledge; CE maintains competency—details vary by state.",
            [
                "Labels remain federal/state law.",
                "RUPs need certified applicators.",
                "CE is commonly required.",
            ],
            "easy",
        ),
        (
            "Transporting pesticides safely includes:",
            "Securing containers upright, protecting labels, and separating from passengers/food as required",
            [
                "Loose containers sliding in the back seat with kids",
                "Unlabeled jugs only",
                "Venting concentrates into the cab heater",
            ],
            "DOT/state rules and common sense prevent spills and exposure during transport.",
            [
                "Children/passengers must be protected.",
                "Labels must remain intact/legible.",
                "Cab contamination is dangerous.",
            ],
            "easy",
        ),
        (
            "Falsifying application records is:",
            "Illegal and can result in penalties/license actions",
            [
                "A recommended shortcut",
                "Required when you forget what you applied",
                "Harmless because records are never reviewed",
            ],
            "Honest records are a compliance obligation; guesswork should be replaced by better documentation habits.",
            [
                "Shortcuts that falsify are violations.",
                "Forgetting is not fixed by fraud.",
                "Records are reviewed in inspections/complaints.",
            ],
            "medium",
        ),
        (
            "Community right-to-know / posting & notification rules may require:",
            "Advance notice or posting for certain applications per state/local ordinance",
            [
                "Secret night spraying to avoid all notice always when notice is required",
                "Never telling property managers anything",
                "Removing posted signs immediately before reentry times end when posting is required",
            ],
            "Schools, apartments, and some municipalities have notification/posting laws beyond the label.",
            [
                "Required notice cannot be evaded by secrecy.",
                "Managers/occupants may need information.",
                "Signs stay up for required periods.",
            ],
            "medium",
        ),
        (
            "WPS (Worker Protection Standard) primarily protects:",
            "Agricultural workers and pesticide handlers on covered agricultural establishments",
            [
                "Only office software users",
                "Only deep-sea fishermen from storms",
                "Structural applicators from all city parking tickets",
            ],
            "WPS is an EPA agricultural worker rule; structural work has other OSHA/state frameworks—but know which rules apply to your job.",
            [
                "Not IT policy.",
                "Not maritime weather.",
                "Not parking enforcement.",
            ],
            "hard",
        ),
        (
            "Groundwater advisories on labels exist because some chemicals:",
            "Can leach and contaminate groundwater under certain soil/rainfall conditions",
            [
                "Always float harmlessly forever",
                "Cannot move in soil ever",
                "Are required to be poured into wells",
            ],
            "Vulnerable aquifers and sandy soils increase leaching risk—follow setbacks and rates.",
            [
                "Many pesticides can move with water.",
                "Soil mobility varies but is real for some AIs.",
                "Well disposal is illegal.",
            ],
            "medium",
        ),
        (
            "An applicator finds an old unlabeled pesticide container. Best action:",
            "Treat as unknown hazardous material—do not use; contact authorities/hazardous waste channels for disposal guidance",
            [
                "Guess it is water and spray interiors",
                "Mix with a new product to 'identify' by smell",
                "Give it to neighbors as free samples",
            ],
            "Unlabeled pesticides cannot be used legally/safely; manage as hazardous waste per guidance.",
            [
                "Unknowns must not be applied.",
                "Smell ID is dangerous.",
                "Distribution of unknowns is illegal/hazardous.",
            ],
            "medium",
        ),
        (
            "Civil/criminal penalties for pesticide misuse can include:",
            "Fines, license suspension/revocation, and in serious cases criminal charges",
            [
                "Only a thank-you letter",
                "Automatic immunity for commercial applicators",
                "Free product forever",
            ],
            "Misuse harming people, wildlife, or environment can bring severe enforcement consequences.",
            [
                "Enforcement is real.",
                "No automatic immunity.",
                "Penalties are not rewards.",
            ],
            "easy",
        ),
    ],
}

def main() -> None:
    write_bank(SLUG, topics)


if __name__ == "__main__":
    main()
