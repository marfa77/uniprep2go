# appended to expand_wave1_banks_data.py — continuation from crcst sterilization wet-pack
TAIL = r'''
            (
                "A wet pack after steam sterilization is a concern because:",
                "Moisture can compromise the sterile barrier and allow wicking of contaminants",
                [
                    "Wetness always proves sterility",
                    "It means the BI passed",
                    "It only matters for ethylene oxide loads",
                ],
                "Wet packs are not released as sterile; investigate load/cooling/packaging factors.",
                "hard",
            ),
            (
                "Dynamic air removal (prevac) steam cycles are especially important for:",
                "Loads where air removal is critical for steam penetration (e.g., porous/wrapped goods)",
                [
                    "Only washing utensils in decontam",
                    "Room-temperature storage checks",
                    "Printing count sheets",
                ],
                "Prevacuum cycles remove air so steam can contact all surfaces effectively.",
                "easy",
            ),
        ],
        "storage-distribution": [
            (
                "Sterile storage areas should be:",
                "Clean, dry, well-ventilated, and protected from contamination and extremes of temperature/humidity",
                [
                    "Adjacent to decontam sinks without barriers",
                    "Used to store cardboard shipping boxes on open shelves with sterile packs mixed freely always",
                    "Damp basements preferred",
                ],
                "Environmental control and traffic patterns protect package integrity.",
                "easy",
            ),
            (
                "Event-related sterility means items remain sterile until:",
                "An event compromises the package (tear, moisture, improper handling), not only a fixed date in many systems",
                [
                    "Exactly 24 hours regardless of packaging",
                    "They leave the sterilizer cart",
                    "The BI result prints",
                ],
                "Many facilities use event-related dating with package integrity as the key criterion.",
                "medium",
            ),
            (
                "First in, first out (FIFO) stock rotation helps:",
                "Use older sterile stock before newer stock within policy",
                [
                    "Hide expired loaner sets",
                    "Skip inventory counts",
                    "Store sterile and soiled together",
                ],
                "FIFO reduces expiry/obsolescence and supports inventory control.",
                "medium",
            ),
            (
                "When transporting sterile trays to the OR, you should:",
                "Keep packages covered/protected and handle to avoid crushing or contamination",
                [
                    "Stack heavy containers on soft wrap packs until crushed",
                    "Carry wet packs because they are cooling",
                    "Open packs in the elevator to cool faster",
                ],
                "Protect sterile barriers during transport; do not use compromised packs.",
                "hard",
            ),
            (
                "A sterile package with a broken seal should be:",
                "Considered contaminated and reprocessed (or discarded per policy)",
                [
                    "Relabeled as sterile if the indicator changed color once",
                    "Used only for minor procedures",
                    "Repaired with transparent tape and issued",
                ],
                "Compromised packaging voids sterility assurance—reprocess appropriately.",
                "easy",
            ),
        ],
    },
    "nha-cmaa-readiness-check": {
        "scheduling-front": [
            (
                "When a patient arrives late for an appointment, the CMAA should typically:",
                "Follow office policy for late patients and communicate options courteously",
                [
                    "Refuse any future care permanently without policy",
                    "Ignore the provider's schedule impacts",
                    "Discuss the patient's diagnosis loudly at the desk",
                ],
                "Apply consistent late policies while protecting privacy and clinic flow.",
                "easy",
            ),
            (
                "Double-booking may be appropriate when:",
                "Policy allows it for short visits or expected no-shows and staffing can manage",
                [
                    "You want to punish slow providers",
                    "PHI can be shared in the lobby",
                    "Insurance is always denied",
                ],
                "Double-booking is a deliberate scheduling strategy, not chaos—follow policy.",
                "medium",
            ),
            (
                "A matrix in a scheduling system defines:",
                "When providers are available and what appointment types fit those slots",
                [
                    "Only the color of the waiting room",
                    "Patient credit scores",
                    "Pharmacy formularies",
                ],
                "Templates/matrices control open times, visit lengths, and provider availability.",
                "medium",
            ),
            (
                "Collecting copays at check-in is important because:",
                "It follows payer contracts and reduces billing follow-up burden",
                [
                    "It replaces coding entirely",
                    "It is illegal under HIPAA always",
                    "It must be done after claim denial only",
                ],
                "Point-of-service collections improve revenue cycle performance when done correctly.",
                "hard",
            ),
            (
                "When verifying insurance eligibility, the CMAA confirms:",
                "Coverage active dates, plan type, and often copay/deductible information",
                [
                    "The patient's favorite pharmacy candy",
                    "Only the employer's stock price",
                    "Whether the provider likes the payer",
                ],
                "Eligibility checks prevent unexpected denials and inform patient estimates.",
                "easy",
            ),
        ],
        "medical-records": [
            (
                "A release of information (ROI) authorization should include:",
                "Who may disclose, to whom, what information, purpose, and expiration/revocation terms",
                [
                    "Only the patient's nickname",
                    "A blank check for any future uses forever without limits",
                    "No signature if the request is verbal from a stranger",
                ],
                "Valid authorizations need required core elements under HIPAA.",
                "medium",
            ),
            (
                "EHRs improve care mainly by enabling:",
                "Accessible, legible documentation and better information sharing among authorized users",
                [
                    "Unlimited public internet posting of charts",
                    "Elimination of all privacy rules",
                    "Automatic malpractice immunity",
                ],
                "EHRs support continuity when access controls and accuracy are maintained.",
                "easy",
            ),
            (
                "Correcting an EHR entry typically requires:",
                "An addendum/amendment that preserves the original entry history",
                [
                    "Deleting the encounter so it never existed",
                    "Editing another patient's note by mistake without fix",
                    "Using another staff member's login",
                ],
                "Audit trails and amendments maintain record integrity.",
                "medium",
            ),
            (
                "The legal medical record for a visit generally includes:",
                "Documentation of care relevant to that encounter as defined by policy",
                [
                    "Staff personal text messages unrelated to care",
                    "Parking lot camera footage always",
                    "Unverified social media posts",
                ],
                "Policies define what constitutes the designated record set/legal record.",
                "hard",
            ),
            (
                "Filing systems that use terminal digit order help:",
                "Distribute files more evenly and improve retrieval efficiency in large paper systems",
                [
                    "Encrypt emails automatically",
                    "Schedule surgeries",
                    "Calculate RVUs",
                ],
                "Terminal digit filing reduces congestion in high-volume paper record rooms.",
                "easy",
            ),
        ],
        "billing-coding-basics": [
            (
                "CPT codes primarily describe:",
                "Procedures and services performed",
                ["Only inpatient diagnoses", "Drug chemical structures", "Hospital room numbers"],
                "CPT/HCPCS report services; ICD-10-CM reports diagnoses.",
                "easy",
            ),
            (
                "A claim may be denied for lack of medical necessity when:",
                "Documentation does not support the service as reasonable/necessary for the diagnosis",
                [
                    "The claim was filed with correct codes and complete docs always",
                    "The patient paid a copay",
                    "The provider has a valid NPI",
                ],
                "Payers link coverage to medical necessity supported by documentation.",
                "medium",
            ),
            (
                "An Advance Beneficiary Notice (ABN) is used in Medicare contexts to:",
                "Notify a beneficiary that Medicare may not pay and the patient may be responsible",
                [
                    "Guarantee Medicare payment",
                    "Replace all coding",
                    "Authorize HIPAA research waivers",
                ],
                "ABNs document beneficiary acknowledgment of potential noncoverage in specified situations.",
                "medium",
            ),
            (
                "The CMS-1500 form is commonly used to bill:",
                "Professional/outpatient services by physicians and similar providers",
                [
                    "Only inpatient hospital facility DRGs exclusively always",
                    "Workers' lunch reimbursement",
                    "Pharmacy inventory to wholesalers",
                ],
                "CMS-1500 is the professional claim form; UB-04 is typically institutional.",
                "hard",
            ),
            (
                "A clearinghouse in the revenue cycle typically:",
                "Edits and routes electronic claims between providers and payers",
                [
                    "Performs surgery",
                    "Issues medical licenses",
                    "Stores paper charts offsite only",
                ],
                "Clearinghouses facilitate HIPAA transactions and basic claim edits.",
                "easy",
            ),
        ],
        "communication-ethics": [
            (
                "Active listening at the front desk includes:",
                "Allowing the patient to finish, clarifying needs, and confirming understanding",
                [
                    "Interrupting with assumptions",
                    "Checking personal social media during the request",
                    "Sharing another patient's story as an example aloud",
                ],
                "Respectful listening improves accuracy and patient experience.",
                "easy",
            ),
            (
                "If a patient is angry about a wait, the CMAA should:",
                "Stay calm, acknowledge feelings, and offer appropriate solutions within policy",
                [
                    "Argue about who is ruder",
                    "Disclose other patients' reasons for delays",
                    "Walk away without any response",
                ],
                "De-escalation and problem-solving beat confrontation.",
                "medium",
            ),
            (
                "Discussing a celebrity patient's visit with friends is:",
                "A privacy breach if PHI is disclosed without authorization",
                [
                    "Allowed because celebrities have no privacy rights",
                    "Required marketing",
                    "Fine if you omit the last name only always",
                ],
                "HIPAA protects all patients; celebrity status is not an exception.",
                "medium",
            ),
            (
                "Embezzlement of patient payments is:",
                "Theft and grounds for termination and legal action",
                [
                    "A normal cash-drawer tip",
                    "Allowed if you plan to repay later",
                    "Only wrong if over $10,000",
                ],
                "Financial integrity is a core ethical/legal duty in practice management.",
                "hard",
            ),
            (
                "Cultural sensitivity in communication means:",
                "Respecting diverse beliefs/language needs and avoiding stereotypes",
                [
                    "Assuming all patients share your preferences",
                    "Refusing interpreters when language barriers exist",
                    "Mocking traditional remedies",
                ],
                "Respectful, patient-centered communication improves access and trust.",
                "easy",
            ),
        ],
    },
'''
