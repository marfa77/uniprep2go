/**
 * Append readiness-check questions 011–015 per topic (40 → 60).
 * Does not modify existing 001–010 items.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/data/mock-exams");
const SOURCE = "Original UniPrep2Go local bank (Wave 1).";

function q(examSlug, topicId, n, prompt, options, correct, explanation, difficulty = "medium") {
  const id = `${examSlug}-${topicId}-${String(n).padStart(3, "0")}`;
  const opts = ["a", "b", "c", "d"].map((k, i) => ({ id: k, text: options[i] }));
  const distractorExplanations = {};
  for (const o of opts) {
    if (o.id !== correct) distractorExplanations[o.id] = `Incorrect: ${o.text}`;
  }
  return {
    id,
    examSlug,
    topicId,
    prompt,
    options: opts,
    correctOptionId: correct,
    explanation,
    distractorExplanations,
    difficulty,
    sourceNote: SOURCE,
  };
}

const BANKS = {
  "cdl-general-knowledge-readiness-check": {
    topics: {
      "vehicle-systems": [
        q(
          "cdl-general-knowledge-readiness-check",
          "vehicle-systems",
          11,
          "During a pre-trip, oil pressure that stays near zero after the engine starts usually indicates:",
          [
            "Normal warm-up for turbocharged diesels",
            "A serious lubrication problem that can destroy the engine quickly",
            "That the coolant thermostat is stuck open",
            "That DEF fluid needs topping off",
          ],
          "b",
          "Oil pressure must build promptly; near-zero pressure risks catastrophic engine damage.",
          "easy"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "vehicle-systems",
          12,
          "What is the main reason to check suspension components (springs, air bags, U-bolts) during inspection?",
          [
            "They only affect radio antenna mounting",
            "Damaged suspension can cause poor control, uneven tire wear, and unsafe ride height",
            "Suspension parts determine hours-of-service limits",
            "They replace the need for a fifth-wheel check",
          ],
          "b",
          "Suspension defects compromise stability, tire contact, and cargo/vehicle control.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "vehicle-systems",
          13,
          "If the low air warning activates while driving, the safest immediate response is generally to:",
          [
            "Continue to the next rest area at highway speed",
            "Ignore it if ABS lights are off",
            "Bring the vehicle to a safe stop and diagnose before continuing",
            "Pump the accelerator to rebuild pressure",
          ],
          "c",
          "Low air can lead to spring-brake application and loss of service brakes; stop safely and fix it.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "vehicle-systems",
          14,
          "Why must windshield wipers and washers work properly on a CMV?",
          [
            "They are optional if headlights work",
            "Clear forward vision is required for safe operation in rain, snow, and road spray",
            "They only matter during annual inspections",
            "They reduce fuel taxes",
          ],
          "b",
          "Impaired visibility is a major crash risk; wipers/washers are essential inspection items.",
          "easy"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "vehicle-systems",
          15,
          "A leaking air hose or gladhand connection on a combination vehicle can cause:",
          [
            "Improved trailer tracking",
            "Loss of trailer brake air supply and potential service or emergency brake problems",
            "Automatic increases in engine oil pressure",
            "Higher DEF consumption only",
          ],
          "b",
          "Air leaks threaten brake supply pressure and can force emergency spring-brake application.",
          "hard"
        ),
      ],
      "safe-driving": [
        q(
          "cdl-general-knowledge-readiness-check",
          "safe-driving",
          11,
          "When following another vehicle in good conditions, a heavy CMV generally needs:",
          [
            "The same following distance as a passenger car",
            "More following distance because stopping distance is longer",
            "No following distance if ABS is equipped",
            "Less distance because trucks brake better downhill",
          ],
          "b",
          "Greater mass and longer stopping distance require more space ahead than light vehicles.",
          "easy"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "safe-driving",
          12,
          "What is a key hazard when backing a CMV?",
          [
            "Backing is always safer than pulling forward",
            "Blind spots are large; use a helper and get out to look when needed",
            "Mirrors eliminate all blind spots on modern trucks",
            "Backing never requires checking the rear",
          ],
          "b",
          "CMVs have large blind areas; walk-arounds and spotters reduce backing crashes.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "safe-driving",
          13,
          "Driving through water deep enough to reach hubs can:",
          [
            "Improve brake cooling permanently",
            "Wet brakes and reduce braking effectiveness until they dry",
            "Increase tire tread depth",
            "Disable the need for downshifting",
          ],
          "b",
          "Water can soak brake linings; test brakes gently after water crossings and dry them if needed.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "safe-driving",
          14,
          "When another vehicle is in your blind spot, you should:",
          [
            "Assume they see you and merge anyway",
            "Avoid lane changes until you confirm the space is clear",
            "Honk continuously for 30 seconds",
            "Speed up without signaling",
          ],
          "b",
          "Never change lanes into an occupied blind spot; wait until you can see or verify clearance.",
          "easy"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "safe-driving",
          15,
          "On slippery roads, which practice is most appropriate?",
          [
            "Increase speed to get through ice patches faster",
            "Reduce speed, increase following distance, and avoid sudden steering or braking",
            "Use only the trailer hand valve for all stops",
            "Disable ABS so wheels can lock",
          ],
          "b",
          "Smooth inputs and lower speed help maintain traction when friction is reduced.",
          "hard"
        ),
      ],
      cargo: [
        q(
          "cdl-general-knowledge-readiness-check",
          "cargo",
          11,
          "How often should cargo securement generally be rechecked on the road (beyond special exceptions)?",
          [
            "Never after leaving the dock",
            "Within the first 50 miles and periodically thereafter as rules require",
            "Only at state lines",
            "Only if the shipper calls",
          ],
          "b",
          "Federal securement rules require early and periodic inspections because loads can shift.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "cargo",
          12,
          "Placing heavy cargo as low and centered as practical helps:",
          [
            "Increase the chance of rollover",
            "Lower the center of gravity and improve stability",
            "Bypass bridge formula limits",
            "Eliminate the need for any tie-downs",
          ],
          "b",
          "A lower center of gravity reduces rollover risk and improves handling.",
          "easy"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "cargo",
          13,
          "Which statement about working load limit (WLL) of tiedowns is correct?",
          [
            "WLL is irrelevant if the chain looks new",
            "Aggregate WLL of tiedowns must meet required securement strength for the cargo",
            "Any rope may substitute for rated tiedowns",
            "WLL only applies to hazardous materials placards",
          ],
          "b",
          "Securement strength is based on rated WLL; inadequate capacity is a violation and a hazard.",
          "hard"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "cargo",
          14,
          "Why can poorly distributed axle weights be a problem even if total GVW is legal?",
          [
            "Axle overloads can damage roads/bridges and create enforcement violations",
            "Axle weights never matter under FMCSA rules",
            "Only fuel tanks count toward axle weight",
            "Overloading one axle always reduces stopping distance",
          ],
          "a",
          "Bridge formula and axle limits protect infrastructure; illegal axle loads can cite a legal GVW load.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "cargo",
          15,
          "Covered/open loads that can blow or spill debris generally require:",
          [
            "No covering if traveling under 55 mph",
            "Adequate covering or containment to prevent cargo loss onto the roadway",
            "Only a verbal promise from the shipper",
            "Placards instead of securement",
          ],
          "b",
          "Loose material must be contained so it does not endanger other road users.",
          "easy"
        ),
      ],
      "emergencies-rules": [
        q(
          "cdl-general-knowledge-readiness-check",
          "emergencies-rules",
          11,
          "If you feel drowsy while driving a CMV, the safest choice is to:",
          [
            "Open the window and keep driving through the night",
            "Stop at a safe place and rest before continuing",
            "Drink coffee and increase speed to arrive sooner",
            "Use cruise control so you can close your eyes briefly",
          ],
          "b",
          "Fatigue is a major CMV crash factor; only sleep/rest restores alertness reliably.",
          "easy"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "emergencies-rules",
          12,
          "What should you do if your tires blow out on a steer axle?",
          [
            "Slam on the brakes immediately and turn hard",
            "Hold the wheel firmly, ease off the accelerator, and steer to a safe stop",
            "Accelerate to straighten the truck",
            "Shift to neutral and leave the roadway uncontrolled",
          ],
          "b",
          "Sudden hard braking can worsen loss of control; grip, stabilize, then stop safely.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "emergencies-rules",
          13,
          "A CDL disqualification can result from:",
          [
            "Only crashes that occur in a personal car",
            "Serious traffic offenses and certain railroad-crossing or alcohol/drug violations in a CMV",
            "Having too many preventive maintenance records",
            "Using engine brakes on a downgrade",
          ],
          "b",
          "Major and serious offenses (and other listed violations) can disqualify a CDL.",
          "medium"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "emergencies-rules",
          14,
          "When must you stop before crossing railroad tracks in a CMV (typical rule for buses/placarded loads)?",
          [
            "Never; CMVs always have the right-of-way",
            "When required by signs, signals, or vehicle/cargo type rules that mandate a stop",
            "Only if the crossing has no lights",
            "Only during fog",
          ],
          "b",
          "Certain CMVs must stop at crossings; all drivers must obey active signals and avoid stalled tracks.",
          "hard"
        ),
        q(
          "cdl-general-knowledge-readiness-check",
          "emergencies-rules",
          15,
          "If your vehicle starts to skid, a general recovery principle is to:",
          [
            "Steer into the skid and avoid overcorrecting while reducing demand on traction",
            "Close your eyes and lock all brakes",
            "Downshift forcibly through every gear",
            "Turn off the engine immediately while moving",
          ],
          "a",
          "Countersteer appropriately and restore traction gradually; abrupt inputs worsen skids.",
          "hard"
        ),
      ],
    },
  },

  "fl-real-estate-readiness-check": {
    topics: {
      "license-law": [
        q(
          "fl-real-estate-readiness-check",
          "license-law",
          11,
          "In Florida, which statement about a real estate broker's office is most accurate?",
          [
            "A broker may operate without any registered office",
            "A broker must maintain an office registered with DBPR and keep required records",
            "Only sales associates may register branch offices",
            "Office registration is optional if advertising online",
          ],
          "b",
          "Florida brokers must maintain a registered office and comply with recordkeeping rules.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "license-law",
          12,
          "Which Florida license status generally allows a licensee to perform real estate services for compensation?",
          [
            "Involuntary inactive",
            "Active and current",
            "Null and void",
            "Canceled by the licensee without reactivation",
          ],
          "b",
          "Only an active, current license authorizes compensated brokerage activity.",
          "easy"
        ),
        q(
          "fl-real-estate-readiness-check",
          "license-law",
          13,
          "A Florida sales associate who receives a deposit from a buyer should:",
          [
            "Deposit it in the associate's personal account overnight",
            "Deliver it to the employing broker by the end of the next business day (as required)",
            "Hold cash indefinitely until closing",
            "Mail it to FREC without telling the broker",
          ],
          "b",
          "Associates must promptly turn deposits over to the broker per Florida escrow timing rules.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "license-law",
          14,
          "False, deceptive, or misleading advertising by a Florida licensee can result in:",
          [
            "No discipline if a sale closes",
            "Administrative penalties including fines, suspension, or revocation",
            "Automatic immunity under RESPA",
            "Only a private apology letter",
          ],
          "b",
          "Misleading advertising is a disciplinary offense under Florida license law.",
          "easy"
        ),
        q(
          "fl-real-estate-readiness-check",
          "license-law",
          15,
          "Which best describes Florida's requirement regarding post-license education for sales associates?",
          [
            "No education is required after initial licensing",
            "A post-license course must be completed before the first renewal or the license can become null and void",
            "Post-license education is only for brokers in other states",
            "Post-license hours may be skipped if the associate closes three deals",
          ],
          "b",
          "Florida sales associates must complete post-licensing education before first renewal.",
          "hard"
        ),
      ],
      "contracts-titles": [
        q(
          "fl-real-estate-readiness-check",
          "contracts-titles",
          11,
          "Which deed in Florida typically offers the least covenants from the grantor?",
          [
            "General warranty deed",
            "Quitclaim deed",
            "Special warranty deed with full English covenants",
            "Bargain and sale deed with seisin warranty only forever",
          ],
          "b",
          "A quitclaim deed conveys whatever interest the grantor has without title warranties.",
          "easy"
        ),
        q(
          "fl-real-estate-readiness-check",
          "contracts-titles",
          12,
          "In Florida, the statute of frauds generally requires which real estate contracts to be in writing to be enforceable?",
          [
            "Only leases of one day",
            "Contracts for the sale of real property (and other covered agreements)",
            "Verbal listing agreements with no exceptions ever enforced in practice",
            "Only HOA violation notices",
          ],
          "b",
          "Sale contracts for land generally must be written to satisfy the statute of frauds.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "contracts-titles",
          13,
          "A Florida abstract of title is best described as:",
          [
            "A guaranteed insurance policy against all defects",
            "A condensed history of recorded title instruments affecting a property",
            "A property tax bill",
            "A broker's CMA",
          ],
          "b",
          "An abstract summarizes the public-record chain of title; insurance is separate.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "contracts-titles",
          14,
          "Which interest is a nonfreehold estate that gives possession for a definite period?",
          [
            "Fee simple absolute",
            "Estate for years (tenancy for years)",
            "Life estate pur autre vie",
            "Remainder interest",
          ],
          "b",
          "An estate for years is a leasehold with a fixed term.",
          "easy"
        ),
        q(
          "fl-real-estate-readiness-check",
          "contracts-titles",
          15,
          "If a Florida seller cannot deliver marketable title as contracted, the buyer may typically:",
          [
            "Be forced to accept any defective title without remedy",
            "Pursue contract remedies such as rescission, damages, or specific performance depending on facts",
            "Automatically receive a free second home",
            "Ignore the title issue after closing without disclosure rights",
          ],
          "b",
          "Failure to convey marketable title can support buyer remedies under the contract and law.",
          "hard"
        ),
      ],
      "finance-appraisal": [
        q(
          "fl-real-estate-readiness-check",
          "finance-appraisal",
          11,
          "Which loan is typically backed by the U.S. Department of Veterans Affairs for eligible veterans?",
          [
            "Conventional loan with no government involvement ever",
            "VA-guaranteed loan",
            "Only hard-money bridge loans",
            "Seller-financed land contracts exclusively",
          ],
          "b",
          "VA loans are guaranteed by the Department of Veterans Affairs for qualifying veterans.",
          "easy"
        ),
        q(
          "fl-real-estate-readiness-check",
          "finance-appraisal",
          12,
          "In the cost approach to appraisal, value is generally estimated as:",
          [
            "Income divided by a stock market PE ratio",
            "Reproduction/replacement cost new minus depreciation plus site value",
            "Only the last sale price with no adjustments",
            "Assessed value times three",
          ],
          "b",
          "Cost approach: cost new − depreciation + land/site value.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "finance-appraisal",
          13,
          "Which statement about adjustable-rate mortgages (ARMs) is most accurate?",
          [
            "The interest rate never changes after closing",
            "The rate can change periodically based on an index plus margin, subject to caps",
            "ARMs are illegal in Florida residential lending",
            "ARMs eliminate the need for a promissory note",
          ],
          "b",
          "ARMs adjust with index/margin and usually have periodic and lifetime caps.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "finance-appraisal",
          14,
          "Functional obsolescence in appraisal refers to:",
          [
            "Loss in value from outdated design or features within the property",
            "Wear and tear from physical aging only",
            "External highway noise only",
            "A temporary market boom",
          ],
          "a",
          "Functional obsolescence is loss from poor/outdated design or utility, not just physical wear.",
          "hard"
        ),
        q(
          "fl-real-estate-readiness-check",
          "finance-appraisal",
          15,
          "Equity in a property is best defined as:",
          [
            "The property's annual property tax",
            "Market value minus outstanding liens/mortgage debt",
            "Only the down payment forever, regardless of paydown",
            "The interest rate on the loan",
          ],
          "b",
          "Equity = owner's interest = value − debt against the property.",
          "easy"
        ),
      ],
      "property-practice": [
        q(
          "fl-real-estate-readiness-check",
          "property-practice",
          11,
          "Redlining under fair housing law refers to:",
          [
            "Drawing marketing maps for open houses",
            "Denying or limiting financial services in areas based on protected characteristics",
            "Painting curb numbers red",
            "Using red ink on contracts",
          ],
          "b",
          "Redlining is discriminatory denial of lending/insurance in neighborhoods by protected class/area.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "property-practice",
          12,
          "A Florida residential landlord generally must:",
          [
            "Enter the unit anytime without notice for non-emergencies",
            "Comply with notice and habitability rules under the Florida Landlord and Tenant Act",
            "Keep all security deposits in the landlord's personal wallet without accounting",
            "Refuse all families with children as a blanket policy",
          ],
          "b",
          "Chapter 83 imposes duties on notice, deposits, and maintaining fit premises.",
          "medium"
        ),
        q(
          "fl-real-estate-readiness-check",
          "property-practice",
          13,
          "Which best describes a net listing?",
          [
            "A listing where the broker's commission is any amount above a seller's net price",
            "A listing that always guarantees the seller a fixed price",
            "A MLS-only exclusive with no commission",
            "A lease listing for commercial parking only",
          ],
          "a",
          "In a net listing, the broker keeps amounts above the seller's required net (legal/ethical limits apply).",
          "hard"
        ),
        q(
          "fl-real-estate-readiness-check",
          "property-practice",
          14,
          "Lead-based paint disclosure rules for covered pre-1978 housing generally require:",
          [
            "No disclosure if the paint looks fine",
            "Providing required pamphlets/disclosures and opportunity to inspect before obligated purchase/lease",
            "Only a verbal warning at closing",
            "Disclosure only for commercial warehouses",
          ],
          "b",
          "Federal lead disclosure rules apply to most pre-1978 residential target housing.",
          "easy"
        ),
        q(
          "fl-real-estate-readiness-check",
          "property-practice",
          15,
          "Zoning ordinances primarily regulate:",
          [
            "Federal income tax brackets",
            "Land use, density, and building standards within a locality",
            "Interstate highway speed limits",
            "Broker commission splits",
          ],
          "b",
          "Zoning is a police-power tool controlling permitted uses and development standards.",
          "easy"
        ),
      ],
    },
  },

  "tx-real-estate-readiness-check": {
    topics: {
      "license-law": [
        q(
          "tx-real-estate-readiness-check",
          "license-law",
          11,
          "A Texas broker who sponsors sales agents is responsible for:",
          [
            "Nothing related to the agents' licensed activity",
            "Supervising sponsored agents and ensuring compliance with TRELA/TREC rules",
            "Paying all of an agent's personal income taxes automatically",
            "Guaranteeing every listing will sell",
          ],
          "b",
          "Sponsoring brokers must supervise and are accountable for brokerage compliance.",
          "easy"
        ),
        q(
          "tx-real-estate-readiness-check",
          "license-law",
          12,
          "Which statement about Texas real estate advertising is most accurate?",
          [
            "Ads may omit the broker's name if the agent's nickname is catchy",
            "Ads must comply with TREC advertising rules, including required broker identification",
            "Only social media ads are unregulated",
            "For Sale signs never need broker information",
          ],
          "b",
          "TREC rules require clear broker identification and prohibit misleading ads.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "license-law",
          13,
          "If a Texas license holder is convicted of a relevant criminal offense, TREC may:",
          [
            "Never take action after licensing",
            "Discipline the license, including suspension or revocation, under applicable rules",
            "Automatically increase the Recovery Trust Account payment to the licensee",
            "Convert the license to a notary commission",
          ],
          "b",
          "Criminal history/conduct can trigger TREC disciplinary action under TRELA.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "license-law",
          14,
          "Continuing education for Texas sales agent renewal generally:",
          [
            "Is never required after the first license issuance",
            "Must be completed as required for renewal (including SAE and CE as applicable)",
            "Can be waived by closing one transaction",
            "Applies only to out-of-state brokers",
          ],
          "b",
          "Texas renewals require statutory education (SAE then CE) for active status.",
          "easy"
        ),
        q(
          "tx-real-estate-readiness-check",
          "license-law",
          15,
          "Which activity can an unlicensed person in Texas generally NOT do for a fee?",
          [
            "Schedule a showing time at the broker's direction as a clerical task",
            "Negotiate the purchase price of real estate for another person",
            "Place yard signs as directed by a broker without discussing terms",
            "Deliver documents prepared by the license holder",
          ],
          "b",
          "Negotiating real estate for others for compensation requires a license.",
          "hard"
        ),
      ],
      "contracts-agency": [
        q(
          "tx-real-estate-readiness-check",
          "contracts-agency",
          11,
          "Under a Texas exclusive right-to-sell listing, the broker typically earns a commission when:",
          [
            "Only if the broker personally finds the buyer and no one else does",
            "A ready, willing, and able buyer is procured during the listing term (per agreement), even if the seller finds the buyer",
            "The seller refuses all offers",
            "The property is merely advertised once",
          ],
          "b",
          "Exclusive right-to-sell usually entitles the broker to commission regardless of who finds the buyer.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "contracts-agency",
          12,
          "In Texas intermediary brokerage, the broker:",
          [
            "May never appoint license holders to work with parties",
            "Represents both parties with written consent and may appoint associates under the rules",
            "Automatically becomes a dual common-law agent without disclosure",
            "Must cancel the listing",
          ],
          "b",
          "Intermediary status allows a broker to work with both sides under written consent and TREC rules.",
          "hard"
        ),
        q(
          "tx-real-estate-readiness-check",
          "contracts-agency",
          13,
          "A Texas buyer's representation agreement typically creates:",
          [
            "No agency duties at all",
            "An agency relationship in which the broker represents the buyer as a client",
            "A requirement that the buyer must buy the first house shown",
            "Automatic waiver of IABS delivery",
          ],
          "b",
          "A buyer rep agreement establishes the broker–buyer client relationship and duties.",
          "easy"
        ),
        q(
          "tx-real-estate-readiness-check",
          "contracts-agency",
          14,
          "Which statement about the TREC One to Four Family Residential Contract earnest money is accurate?",
          [
            "Earnest money is optional consideration that never needs delivery",
            "Earnest money is typically deposited with the escrow agent as the contract specifies",
            "Earnest money always goes to the listing agent personally",
            "Earnest money replaces the need for a legal description",
          ],
          "b",
          "Earnest money is held by the named escrow agent per the executed TREC contract.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "contracts-agency",
          15,
          "Puffing in real estate marketing is best described as:",
          [
            "A fraudulent statement of a material latent defect",
            "Exaggerated opinion or sales talk that is not a factual warranty",
            "A required TREC disclosure form",
            "A type of easement",
          ],
          "b",
          "Puffing is opinionated hype; misrepresentation of material facts is different and unlawful.",
          "easy"
        ),
      ],
      "finance-closing": [
        q(
          "tx-real-estate-readiness-check",
          "finance-closing",
          11,
          "In Texas, a deed of trust foreclosure for many residential loans commonly proceeds:",
          [
            "Only through lengthy federal court trials every time",
            "Via nonjudicial trustee sale when power of sale exists, subject to notice rules",
            "Without any notice to the borrower ever",
            "By the listing broker personally auctioning the home",
          ],
          "b",
          "Texas deed-of-trust loans often allow nonjudicial foreclosure with statutory notices.",
          "hard"
        ),
        q(
          "tx-real-estate-readiness-check",
          "finance-closing",
          12,
          "Discount points paid at closing typically:",
          [
            "Increase the interest rate permanently without exception",
            "Are prepaid interest used to buy down the note rate",
            "Are illegal under RESPA in all cases",
            "Replace property taxes",
          ],
          "b",
          "Points are usually prepaid interest that lower the contract interest rate.",
          "easy"
        ),
        q(
          "tx-real-estate-readiness-check",
          "finance-closing",
          13,
          "Which item is commonly prorated between buyer and seller at closing?",
          [
            "The buyer's future college tuition",
            "Ad valorem property taxes for the current year",
            "The broker's personal cell phone bill",
            "HOA fines from ten years ago already paid",
          ],
          "b",
          "Property taxes (and similar items) are typically prorated as of the closing date.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "finance-closing",
          14,
          "An owner's title insurance policy generally protects the:",
          [
            "Lender only, never the owner",
            "Owner/insured against covered title defects up to the policy amount",
            "Surveyor from all negligence claims",
            "Appraiser from USPAP violations",
          ],
          "b",
          "Owner's policies insure the owner's title interest against covered risks.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "finance-closing",
          15,
          "A conventional conforming loan is one that:",
          [
            "Exceeds agency guidelines and cannot be sold to Fannie/Freddie",
            "Meets Fannie Mae/Freddie Mac purchase guidelines (including size limits)",
            "Is always an FHA 203(b) loan",
            "Requires no underwriting",
          ],
          "b",
          "Conforming loans meet GSE guidelines; jumbo loans exceed conforming limits.",
          "easy"
        ),
      ],
      "property-practice": [
        q(
          "tx-real-estate-readiness-check",
          "property-practice",
          11,
          "A Texas homestead property is generally protected from:",
          [
            "All taxes of every kind forever",
            "Forced sale by many general creditors, with important exceptions (e.g., purchase-money, taxes)",
            "Any voluntary mortgage the owners sign",
            "HOA assessment liens in every situation without exception",
          ],
          "b",
          "Homestead protection is strong but not absolute; certain liens still attach.",
          "hard"
        ),
        q(
          "tx-real-estate-readiness-check",
          "property-practice",
          12,
          "Which is an example of an appurtenance?",
          [
            "A freestanding refrigerator the seller always moves",
            "A right or improvement that runs with the land, such as an easement appurtenant",
            "A temporary parking permit for one day",
            "The broker's business card",
          ],
          "b",
          "Appurtenances attach to and transfer with the real property.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "property-practice",
          13,
          "Restrictive covenants (deed restrictions) are typically enforced by:",
          [
            "The EPA only",
            "Private parties such as HOAs or benefitted landowners through civil action",
            "The Federal Reserve",
            "TREC license examinations",
          ],
          "b",
          "CC&Rs are private land-use controls enforced civilly by interested parties/HOAs.",
          "medium"
        ),
        q(
          "tx-real-estate-readiness-check",
          "property-practice",
          14,
          "Which statement about Texas community property is most accurate?",
          [
            "All property owned by a spouse before marriage always becomes community property automatically",
            "Property acquired during marriage is generally community property unless it is separate property",
            "Texas does not recognize community property",
            "Community property cannot be sold even with both spouses' consent",
          ],
          "b",
          "Texas is a community-property state; acquisitions during marriage are usually community.",
          "easy"
        ),
        q(
          "tx-real-estate-readiness-check",
          "property-practice",
          15,
          "An encroachment survey might reveal:",
          [
            "The borrower's credit score",
            "A structure or improvement crossing a boundary line onto another's land",
            "The listing commission rate",
            "MLS photo watermarks",
          ],
          "b",
          "Encroachments are physical intrusions across property lines, often found by survey.",
          "easy"
        ),
      ],
    },
  },

  "aapc-cpc-readiness-check": {
    topics: {
      "coding-guidelines": [
        q(
          "aapc-cpc-readiness-check",
          "coding-guidelines",
          11,
          "When a definitive diagnosis has not been established for an outpatient encounter, ICD-10-CM coding should:",
          [
            "Always use a Z00 code only",
            "Code signs, symptoms, or abnormal findings that are documented as the reason for the encounter",
            "Omit diagnosis codes entirely",
            "Use inpatient principal diagnosis rules exclusively",
          ],
          "b",
          "Outpatient guidelines allow coding of documented signs/symptoms when no confirmed diagnosis exists.",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "coding-guidelines",
          12,
          "Which code set is used primarily to report medical procedures and services by physicians?",
          [
            "ICD-10-CM only",
            "CPT (HCPCS Level I)",
            "DSM-5 only",
            "NDC drug package codes only",
          ],
          "b",
          "CPT codes describe procedures/services; ICD-10-CM describes diagnoses.",
          "easy"
        ),
        q(
          "aapc-cpc-readiness-check",
          "coding-guidelines",
          13,
          "Excludes1 notes in ICD-10-CM generally mean:",
          [
            "The codes may always be reported together",
            "The conditions are mutually exclusive and should not be coded together",
            "The note can be ignored if the coder prefers",
            "Only inpatient coders read Excludes notes",
          ],
          "b",
          "Excludes1 indicates the excluded condition should not be coded with the code (true exclude).",
          "hard"
        ),
        q(
          "aapc-cpc-readiness-check",
          "coding-guidelines",
          14,
          "HCPCS Level II codes are primarily used for:",
          [
            "Inpatient DRG assignment only",
            "Supplies, drugs, durable medical equipment, and certain services not in CPT",
            "Replacing all ICD-10-PCS codes",
            "Dental tooth numbering only",
          ],
          "b",
          "Level II HCPCS covers products/services outside CPT (e.g., DME, injectables).",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "coding-guidelines",
          15,
          "Place of service codes on professional claims indicate:",
          [
            "The patient's home ZIP forever",
            "The setting where the service was rendered",
            "The diagnosis related group",
            "The anesthesia base units",
          ],
          "b",
          "POS codes identify the service location (office, inpatient hospital, etc.).",
          "easy"
        ),
      ],
      "evaluation-management": [
        q(
          "aapc-cpc-readiness-check",
          "evaluation-management",
          11,
          "For office/outpatient E/M visits, prolonged service reporting (when applicable) generally requires:",
          [
            "No time documentation",
            "Meeting time thresholds beyond the primary E/M level when using time-based prolonged codes",
            "Always coding critical care instead",
            "Using only the lowest E/M level",
          ],
          "b",
          "Prolonged services depend on documented total time beyond the coded E/M threshold.",
          "hard"
        ),
        q(
          "aapc-cpc-readiness-check",
          "evaluation-management",
          12,
          "Which element is part of medical decision making (MDM) under current office E/M guidelines?",
          [
            "Number of family members in the waiting room",
            "Number and complexity of problems addressed",
            "Color of the clinic walls",
            "Whether the patient arrived early",
          ],
          "b",
          "MDM includes problems addressed, data, and risk of management.",
          "easy"
        ),
        q(
          "aapc-cpc-readiness-check",
          "evaluation-management",
          13,
          "A consultation CPT service (when payer recognizes consults) typically requires:",
          [
            "No request from another clinician",
            "A request for opinion/advice, rendering of services, and a written report back to the requesting source",
            "Only a nursing phone triage note",
            "That the consultant become the primary care physician automatically",
          ],
          "b",
          "Classic consult requirements: request, render, report (payer policies vary).",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "evaluation-management",
          14,
          "Emergency department E/M codes are selected based primarily on:",
          [
            "Whether the patient has insurance",
            "The documented key components/MDM appropriate to ED E/M levels (not typical office time rules)",
            "Only the length of the waiting room delay",
            "The ambulance company name",
          ],
          "b",
          "ED E/M leveling follows ED-specific CPT rules emphasizing history/exam/MDM as applicable.",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "evaluation-management",
          15,
          "When coding a problem-oriented visit during a scheduled preventive visit (same day), correct coding often involves:",
          [
            "Billing only the problem visit and never the preventive",
            "Reporting both services when significant and separately identifiable, with modifier 25 on the problem E/M when appropriate",
            "Using two identical preventive codes",
            "Omitting diagnoses for the problem",
          ],
          "b",
          "Significant separately identifiable problem E/M may be reported with preventive care using modifier 25.",
          "hard"
        ),
      ],
      "surgery-anesthesia": [
        q(
          "aapc-cpc-readiness-check",
          "surgery-anesthesia",
          11,
          "The surgical package (global surgery) typically includes:",
          [
            "All unrelated E/M visits for one year",
            "The procedure and related typical pre-/intra-/postoperative care for the global period",
            "Only the anesthesia professional's time",
            "Never any postoperative visits",
          ],
          "b",
          "Global surgical package covers the operation and routine related care in the global period.",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "surgery-anesthesia",
          12,
          "Modifier 51 is generally used to indicate:",
          [
            "Bilateral procedure",
            "Multiple procedures performed at the same session by the same provider",
            "Assistant surgeon",
            "Discontinued procedure",
          ],
          "b",
          "Modifier 51 reports multiple procedures; payer edits may affect its use.",
          "easy"
        ),
        q(
          "aapc-cpc-readiness-check",
          "surgery-anesthesia",
          13,
          "Anesthesia time for reporting typically begins when:",
          [
            "The surgeon makes the incision only",
            "The anesthesiologist begins to prepare the patient for anesthesia in the OR/procedure area",
            "The patient schedules the surgery online",
            "The recovery room nurse discharges the patient",
          ],
          "b",
          "Anesthesia time starts with preparation for anesthesia induction and ends when the anesthesiologist is no longer in personal attendance.",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "surgery-anesthesia",
          14,
          "Separate procedure designation in CPT means the service is:",
          [
            "Always billed in addition to a more extensive related procedure",
            "Usually considered integral to a larger procedure and not separately reported when performed as part of that larger service",
            "Only for radiology",
            "Never payable under any circumstance",
          ],
          "b",
          "“Separate procedure” codes are typically not unbundled from a more comprehensive related procedure.",
          "hard"
        ),
        q(
          "aapc-cpc-readiness-check",
          "surgery-anesthesia",
          15,
          "Physical status modifiers (P1–P6) in anesthesia coding describe:",
          [
            "The patient's ASA physical status classification",
            "The hospital's trauma level",
            "Whether the case was elective marketing",
            "The CPT surgical global days",
          ],
          "a",
          "Anesthesia physical status modifiers communicate ASA classification for risk/payment policies.",
          "easy"
        ),
      ],
      "compliance-billing": [
        q(
          "aapc-cpc-readiness-check",
          "compliance-billing",
          11,
          "The False Claims Act primarily targets:",
          [
            "Late employee time cards only",
            "Knowingly submitting false or fraudulent claims for government payment",
            "Patient no-shows",
            "HIPAA training attendance",
          ],
          "b",
          "FCA liability attaches to knowing false claims to federal healthcare programs.",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "compliance-billing",
          12,
          "Upcoding means:",
          [
            "Selecting a code that accurately reflects documentation",
            "Reporting a higher-level service than supported by documentation to increase payment",
            "Using ICD-10-CM seventh characters correctly",
            "Appending modifier 59 appropriately",
          ],
          "b",
          "Upcoding is a compliance risk and potential fraud when unsupported.",
          "easy"
        ),
        q(
          "aapc-cpc-readiness-check",
          "compliance-billing",
          13,
          "NCCI edits are designed to:",
          [
            "Increase unrelated diagnosis codes",
            "Prevent improper payment of services that should not be billed together",
            "Replace medical necessity policies",
            "Assign DRGs for physician claims",
          ],
          "b",
          "National Correct Coding Initiative edits promote correct coding and avoid unbundling.",
          "medium"
        ),
        q(
          "aapc-cpc-readiness-check",
          "compliance-billing",
          14,
          "An Advance Beneficiary Notice (ABN) is used in Medicare contexts primarily to:",
          [
            "Guarantee payment from Medicaid",
            "Notify a beneficiary that Medicare may deny a service so they can accept financial responsibility",
            "Replace the CMS-1500 form",
            "Authorize a research study without consent",
          ],
          "b",
          "ABNs shift potential financial liability for anticipated Medicare noncoverage when properly used.",
          "hard"
        ),
        q(
          "aapc-cpc-readiness-check",
          "compliance-billing",
          15,
          "Medical necessity for coding/billing means:",
          [
            "The service is convenient for the clinic schedule",
            "The service is reasonable and necessary for diagnosis or treatment per payer/coverage rules and documentation",
            "Any requested service must be paid",
            "Only cosmetic procedures qualify",
          ],
          "b",
          "Coverage depends on documented medical necessity aligned with payer policies.",
          "easy"
        ),
      ],
    },
  },

  "mblex-readiness-check": {
    topics: {
      "anatomy-physiology": [
        q(
          "mblex-readiness-check",
          "anatomy-physiology",
          11,
          "Which muscle is the primary flexor of the elbow?",
          [
            "Triceps brachii",
            "Biceps brachii (with brachialis)",
            "Deltoid posterior fibers only",
            "Extensor digitorum",
          ],
          "b",
          "Biceps and brachialis are major elbow flexors; triceps extends the elbow.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "anatomy-physiology",
          12,
          "Synovial joints are characterized by:",
          [
            "No joint cavity and immobility",
            "A fluid-filled joint cavity allowing relatively free movement",
            "Only fibrous connections like skull sutures",
            "Cartilage discs without capsules ever",
          ],
          "b",
          "Synovial (diarthrodial) joints have a cavity with synovial fluid and a capsule.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "anatomy-physiology",
          13,
          "Which organ system is primarily responsible for gas exchange?",
          [
            "Digestive system",
            "Respiratory system",
            "Integumentary system only",
            "Lymphatic system exclusively",
          ],
          "b",
          "Lungs and airways perform pulmonary gas exchange.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "anatomy-physiology",
          14,
          "The sagittal plane divides the body into:",
          [
            "Superior and inferior portions",
            "Left and right portions",
            "Anterior and posterior portions only",
            "Superficial and deep layers of skin only",
          ],
          "b",
          "Sagittal planes create left/right sections; frontal separates anterior/posterior.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "anatomy-physiology",
          15,
          "Which connective tissue structure connects muscle to bone?",
          [
            "Ligament",
            "Tendon",
            "Bursa fluid alone",
            "Periosteum without attachment",
          ],
          "b",
          "Tendons attach muscle to bone; ligaments connect bone to bone.",
          "easy"
        ),
      ],
      kinesiology: [
        q(
          "mblex-readiness-check",
          "kinesiology",
          11,
          "Isometric muscle contraction means:",
          [
            "Muscle length changes while tension stays zero",
            "Muscle develops tension without changing length",
            "Only eccentric lengthening occurs",
            "The muscle is completely flaccid",
          ],
          "b",
          "Isometric contractions produce force without joint motion/length change.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "kinesiology",
          12,
          "Which action occurs at the glenohumeral joint when the arm moves away from the midline in the frontal plane?",
          [
            "Adduction",
            "Abduction",
            "Pronation",
            "Plantarflexion",
          ],
          "b",
          "Abduction moves a limb away from the midline; adduction brings it toward midline.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "kinesiology",
          13,
          "A prime mover (agonist) is the muscle that:",
          [
            "Opposes the main action",
            "Primarily produces a desired movement",
            "Only stabilizes without ever contracting",
            "Is always a ligament",
          ],
          "b",
          "The agonist is the main muscle responsible for a movement; antagonists oppose it.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "kinesiology",
          14,
          "Closed-chain exercise is characterized by:",
          [
            "The distal segment moving freely in space (e.g., biceps curl)",
            "The distal segment fixed against a surface (e.g., squat)",
            "No muscle activation",
            "Only isometric holds of the eyelids",
          ],
          "b",
          "In closed-chain movements, the distal end is fixed; open-chain distal end is free.",
          "hard"
        ),
        q(
          "mblex-readiness-check",
          "kinesiology",
          15,
          "Lordosis refers to:",
          [
            "An excessive posterior thoracic curve only",
            "An excessive anterior curvature of the lumbar (or cervical) spine",
            "Lateral curvature of the spine",
            "Fusion of vertebral bodies",
          ],
          "b",
          "Lordosis is exaggerated anterior curvature; kyphosis is excessive posterior thoracic curve; scoliosis is lateral.",
          "medium"
        ),
      ],
      "assessment-treatment": [
        q(
          "mblex-readiness-check",
          "assessment-treatment",
          11,
          "Before massage, a therapist should screen for contraindications such as:",
          [
            "Well-controlled seasonal allergies only",
            "Acute deep vein thrombosis, contagious skin infection, or uncontrolled fever when present",
            "Client preference for lavender oil",
            "A healed scar from childhood",
          ],
          "b",
          "Absolute/relative contraindications include acute DVT, systemic infection, and certain local conditions.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "assessment-treatment",
          12,
          "Effleurage is best described as:",
          [
            "Percussive tapping strokes",
            "Gliding strokes used to warm tissue and spread lubricant",
            "Only joint mobilizations into the barrier",
            "Ice massage exclusively",
          ],
          "b",
          "Effleurage uses long gliding strokes; petrissage kneads; tapotement percusses.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "assessment-treatment",
          13,
          "Endangerment sites are areas where:",
          [
            "Massage pressure is always safest at maximum depth",
            "Nerves, vessels, or organs are vulnerable and deep pressure should be avoided or modified",
            "Only hot stones may be used",
            "Draping is unnecessary",
          ],
          "b",
          "Endangerment sites require caution due to superficial vessels, nerves, or organs.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "assessment-treatment",
          14,
          "SOAP documentation: the 'O' typically includes:",
          [
            "Client's subjective pain story only",
            "Objective findings such as posture, ROM, and palpation results",
            "Only the invoice amount",
            "Marketing consent forms",
          ],
          "b",
          "Objective section records measurable/observable clinical findings.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "assessment-treatment",
          15,
          "If a client reports sharp neurological pain radiating with cervical compression signs, the safest action is often to:",
          [
            "Apply aggressive deep tissue to the neck immediately",
            "Stop or modify treatment and refer for appropriate medical evaluation when indicated",
            "Ignore symptoms and finish the full-body session unchanged",
            "Increase session length to 3 hours",
          ],
          "b",
          "Red-flag neurologic symptoms warrant caution, modification, and referral as appropriate.",
          "hard"
        ),
      ],
      "ethics-business": [
        q(
          "mblex-readiness-check",
          "ethics-business",
          11,
          "Informed consent for massage should include:",
          [
            "No discussion of draping or boundaries",
            "Explanation of the plan, risks/benefits as relevant, and client agreement before treatment",
            "Only a social media tag request",
            "A requirement that the client never ask questions",
          ],
          "b",
          "Clients must understand and agree to the nature of treatment and boundaries.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "ethics-business",
          12,
          "Dual relationships that impair professional judgment are problematic because they:",
          [
            "Always increase clinical objectivity",
            "Can create conflicts of interest and boundary violations",
            "Are required by state boards",
            "Replace the need for SOAP notes",
          ],
          "b",
          "Overlapping personal/financial relationships can compromise ethics and client welfare.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "ethics-business",
          13,
          "Client confidentiality means therapists should:",
          [
            "Discuss cases with friends for entertainment",
            "Protect health information and disclose only with authorization or legal requirement",
            "Post full treatment details online for marketing",
            "Leave charts in a public waiting room",
          ],
          "b",
          "Privacy/confidentiality obligations protect client information.",
          "easy"
        ),
        q(
          "mblex-readiness-check",
          "ethics-business",
          14,
          "Scope of practice for massage therapists generally excludes:",
          [
            "Soft-tissue manipulation within training and law",
            "Diagnosing medical conditions or prescribing drugs",
            "Draping and positioning",
            "Obtaining health history",
          ],
          "b",
          "Diagnosis and prescribing are outside massage scope in US practice acts.",
          "medium"
        ),
        q(
          "mblex-readiness-check",
          "ethics-business",
          15,
          "Power differential in the therapeutic relationship means:",
          [
            "The client always has more clinical power than the therapist",
            "The therapist holds professional authority and must not exploit the client's vulnerability",
            "Fees may be waived only if the therapist dates the client",
            "Boundaries are optional after three sessions",
          ],
          "b",
          "Therapists must manage the inherent power imbalance ethically and non-exploitatively.",
          "hard"
        ),
      ],
    },
  },

  "crcst-readiness-check": {
    topics: {
      decontamination: [
        q(
          "crcst-readiness-check",
          "decontamination",
          11,
          "The first step in instrument reprocessing after point-of-use preparation is typically:",
          [
            "Immediate sterilization without cleaning",
            "Thorough cleaning/decontamination to remove soil before disinfection or sterilization",
            "Skipping detergent if instruments look clean",
            "Lubricating hinged instruments before any rinse",
          ],
          "b",
          "Soil must be removed; sterilization cannot compensate for inadequate cleaning.",
          "easy"
        ),
        q(
          "crcst-readiness-check",
          "decontamination",
          12,
          "Personal protective equipment in decontamination should include:",
          [
            "Street clothes only",
            "Fluid-resistant attire, eye protection, and gloves appropriate to splash/sharps risk",
            "No eye protection if sinks have faucets",
            "Open-toed shoes for comfort",
          ],
          "b",
          "Decontam PPE protects against bloodborne pathogens and chemical splash.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "decontamination",
          13,
          "Enzymatic detergents are used in cleaning primarily to:",
          [
            "Sterilize instruments in 30 seconds",
            "Break down organic soil such as blood and protein",
            "Replace biological indicators",
            "Raise sterilizer chamber temperature",
          ],
          "b",
          "Enzymes help digest organic soils to improve cleaning efficacy.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "decontamination",
          14,
          "Why should lumened instruments be flushed according to IFU during cleaning?",
          [
            "Flushing is never necessary for any lumen",
            "Bioburden and debris can remain inside channels if not properly irrigated",
            "Flushing replaces the need for sterilization",
            "It only matters for wooden instruments",
          ],
          "b",
          "Lumens trap soil; IFU-directed flushing/brushing is critical.",
          "hard"
        ),
        q(
          "crcst-readiness-check",
          "decontamination",
          15,
          "Gross soil should be removed at point of use mainly to:",
          [
            "Decorate the OR back table",
            "Prevent drying of soil that makes later cleaning more difficult and less effective",
            "Activate the sterilizer cycle early",
            "Eliminate the need for PPE in SPD",
          ],
          "b",
          "Point-of-use removal/keeping instruments moist improves subsequent decontamination.",
          "easy"
        ),
      ],
      "assembly-packaging": [
        q(
          "crcst-readiness-check",
          "assembly-packaging",
          11,
          "Instruments should be inspected for cleanliness and function:",
          [
            "Only after the patient leaves the hospital",
            "During assembly, before packaging for sterilization",
            "Never, if the washer completed a cycle",
            "Only when a surgeon complains",
          ],
          "b",
          "Visual/functional inspection at assembly catches residual soil and defects.",
          "easy"
        ),
        q(
          "crcst-readiness-check",
          "assembly-packaging",
          12,
          "Which statement about rigid sterilization containers is correct?",
          [
            "Filters/valves and gaskets must be intact and used per IFU",
            "Damaged filters are acceptable if tape is applied",
            "Containers never need cleaning between uses",
            "Locking mechanisms are decorative only",
          ],
          "a",
          "Container integrity (filters, seals, locks) is required for sterility maintenance.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "assembly-packaging",
          13,
          "Hinged instruments should generally be sterilized:",
          [
            "Fully closed and locked tightly every time",
            "In the open or unlocked position to allow sterilant contact",
            "Wrapped while soaking wet with blood",
            "Without stringers or racks even if IFU requires them",
          ],
          "b",
          "Open position allows steam/sterilant to contact box locks and jaws.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "assembly-packaging",
          14,
          "Chemical indicators (internal) placed in packs primarily show:",
          [
            "That sterility is guaranteed for 10 years",
            "That sterilant conditions were met at the indicator location (process conditions), not sterility by themselves",
            "The exact CFU count of remaining organisms",
            "That the washer-disinfector was skipped",
          ],
          "b",
          "CIs monitor critical process parameters; BIs are needed for lethality verification.",
          "hard"
        ),
        q(
          "crcst-readiness-check",
          "assembly-packaging",
          15,
          "Count sheets in trays are used to:",
          [
            "Replace biological monitoring",
            "Verify completeness of instrument sets during assembly and at point of use",
            "Document employee lunch breaks",
            "Increase sterilizer temperature",
          ],
          "b",
          "Count sheets support accurate assembly and OR counts.",
          "easy"
        ),
      ],
      sterilization: [
        q(
          "crcst-readiness-check",
          "sterilization",
          11,
          "Steam sterilization efficacy depends heavily on:",
          [
            "Color of the sterilizer paint",
            "Time, temperature, and saturated steam contact (and proper drying/air removal as designed)",
            "Leaving packages soaking wet with detergent",
            "Skipping Bowie-Dick tests on dynamic-air-removal sterilizers forever",
          ],
          "b",
          "Steam sterilization requires adequate sterilant contact under validated parameters.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "sterilization",
          12,
          "A biological indicator (BI) is used to:",
          [
            "Decorate the sterilizer door",
            "Challenge the sterilization process with resistant spores to verify lethality",
            "Measure water hardness only",
            "Replace cleaning verification",
          ],
          "b",
          "BIs provide the highest level of sterilization process challenge.",
          "easy"
        ),
        q(
          "crcst-readiness-check",
          "sterilization",
          13,
          "IUSS (immediate-use steam sterilization) should be:",
          [
            "Used as the routine method for all loaner sets",
            "Limited to urgent situations with documented justification and proper cleaning first",
            "Performed on packaged implants without monitoring",
            "Done without following IFU",
          ],
          "b",
          "IUSS is for immediate need after proper cleaning—not a substitute for routine processing.",
          "hard"
        ),
        q(
          "crcst-readiness-check",
          "sterilization",
          14,
          "Ethylene oxide (EO) sterilization is often chosen for:",
          [
            "Items that are heat- and moisture-sensitive when validated for EO",
            "All stainless bowls exclusively",
            "Only cardboard shipping boxes",
            "Items that were never cleaned",
          ],
          "a",
          "EO can sterilize many heat/moisture-sensitive devices when compatible and aerated properly.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "sterilization",
          15,
          "A wet pack after steam sterilization is a concern because:",
          [
            "Moisture can create a pathway for contamination and indicates a process/packaging problem",
            "Wet packs are always more sterile",
            "Moisture proves the BI passed",
            "Wetness means the load can skip cooling",
          ],
          "a",
          "Wet packs compromise sterility assurance and require investigation per policy.",
          "hard"
        ),
      ],
      "storage-distribution": [
        q(
          "crcst-readiness-check",
          "storage-distribution",
          11,
          "Sterile storage areas should be:",
          [
            "Damp, dirty, and near decontamination splash zones",
            "Clean, dry, well-ventilated, and protected from traffic contamination",
            "Open to outdoor weather",
            "Used for eating lunch",
          ],
          "b",
          "Environmental controls protect package integrity until use.",
          "easy"
        ),
        q(
          "crcst-readiness-check",
          "storage-distribution",
          12,
          "Event-related sterility means sterility is maintained until:",
          [
            "A fixed calendar date only, regardless of package condition",
            "An event compromises the package (e.g., moisture, tears, improper handling), subject to facility policy",
            "The manufacturer recalls all indicators",
            "The item leaves the sterilizer cart for 5 minutes",
          ],
          "b",
          "Many facilities use event-related dating; integrity events outdate the item.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "storage-distribution",
          13,
          "When transporting sterile packages to the OR, staff should:",
          [
            "Carry uncovered trays against scrub uniforms through rain",
            "Use clean covered carts/containers and handle packages to protect integrity",
            "Stack heavy items on delicate peel packs without support",
            "Open packs in the elevator to cool them",
          ],
          "b",
          "Covered transport and careful handling prevent contamination and damage.",
          "medium"
        ),
        q(
          "crcst-readiness-check",
          "storage-distribution",
          14,
          "First in, first out (FIFO) rotation of sterile stock helps:",
          [
            "Ensure older stock is used before newer stock within dating/policy rules",
            "Hide expired implants at the back forever",
            "Increase wet pack rates",
            "Eliminate the need for inventory counts",
          ],
          "a",
          "FIFO reduces outdates and supports inventory control.",
          "easy"
        ),
        q(
          "crcst-readiness-check",
          "storage-distribution",
          15,
          "If a sterile package falls on the floor, best practice is generally to:",
          [
            "Wipe it with a sleeve and return it to sterile storage",
            "Consider it contaminated and reprocess according to facility policy",
            "Use it only for the next emergency IUSS without cleaning",
            "Relabel it with a new sterilization load sticker only",
          ],
          "b",
          "Dropped packages are treated as contaminated unless policy allows a validated exception.",
          "hard"
        ),
      ],
    },
  },

  "nha-cmaa-readiness-check": {
    topics: {
      "scheduling-front": [
        q(
          "nha-cmaa-readiness-check",
          "scheduling-front",
          11,
          "Wave scheduling is designed to:",
          [
            "Book only one patient per day",
            "Schedule multiple patients at the same arrival time to improve flow, then space them",
            "Eliminate check-in entirely",
            "Force all visits to be walk-in only",
          ],
          "b",
          "Wave scheduling clusters arrivals to reduce idle provider time while managing wait.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "scheduling-front",
          12,
          "When verifying insurance before a visit, the CMAA should typically confirm:",
          [
            "Only the patient's favorite pharmacy",
            "Eligibility, coverage, and referral/authorization requirements as applicable",
            "The physician's personal NPI by guessing",
            "Nothing if the patient has a card photo",
          ],
          "b",
          "Eligibility and auth checks reduce denials and surprise patient bills.",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "scheduling-front",
          13,
          "A no-show policy is most effective when it is:",
          [
            "Secret and never told to patients",
            "Clearly communicated, consistently applied, and documented",
            "Changed randomly each hour",
            "Used to refuse emergencies illegally",
          ],
          "b",
          "Transparent, consistent no-show policies support operations and fairness.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "scheduling-front",
          14,
          "Which information is essential when creating a new patient demographic record?",
          [
            "Accurate legal name, DOB, contact, and insurance identifiers",
            "Only a nickname",
            "The CMAA's home address",
            "The patient's social media passwords",
          ],
          "a",
          "Correct demographics underpin registration, billing, and clinical identification.",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "scheduling-front",
          15,
          "If two patients arrive claiming the same appointment slot, the CMAA should:",
          [
            "Argue loudly in the waiting room",
            "Review the schedule/documentation calmly and escalate per office protocol to resolve the conflict",
            "Delete both charts",
            "Charge both patients double automatically",
          ],
          "b",
          "De-escalate, verify records, and follow protocol; protect privacy while resolving errors.",
          "hard"
        ),
      ],
      "medical-records": [
        q(
          "nha-cmaa-readiness-check",
          "medical-records",
          11,
          "Under HIPAA, protected health information (PHI) includes:",
          [
            "Only hospital cafeteria menus",
            "Individually identifiable health information in any form",
            "Weather reports",
            "Publicly posted clinic hours with no patient data",
          ],
          "b",
          "PHI is health information that can identify an individual.",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "medical-records",
          12,
          "When releasing records to a third party, the CMAA generally needs:",
          [
            "A verbal request from any caller",
            "A valid patient authorization (or another permitted disclosure) covering the request",
            "Only the requester's email address",
            "Permission from a pharmaceutical sales rep",
          ],
          "b",
          "Most non-TPO disclosures require proper authorization or another HIPAA pathway.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "medical-records",
          13,
          "How should a paper chart error typically be corrected?",
          [
            "Erase thoroughly until unreadable",
            "Draw a single line through the error, initial/date, and enter the correction per policy (no obliteration)",
            "Use white-out to hide the original",
            "Remove the page from the chart",
          ],
          "b",
          "Corrections must remain legible and auditable.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "medical-records",
          14,
          "Retention of medical records should follow:",
          [
            "Whatever is convenient that week",
            "State law, payer, and facility retention policies",
            "Only social media trends",
            "Immediate shredding after each visit always",
          ],
          "b",
          "Retention periods are legally and organizationally defined.",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "medical-records",
          15,
          "Role-based access controls in an EHR help ensure:",
          [
            "Every employee can see all celebrity charts",
            "Workforce members access only the PHI needed for their job functions",
            "Passwords are shared at the front desk",
            "Audit logs are disabled",
          ],
          "b",
          "Minimum necessary access reduces privacy risk.",
          "hard"
        ),
      ],
      "billing-coding-basics": [
        q(
          "nha-cmaa-readiness-check",
          "billing-coding-basics",
          11,
          "A deductible is:",
          [
            "The fixed amount paid at every visit regardless of plan design",
            "The amount the patient must pay before the plan begins paying covered services (per plan rules)",
            "The provider's tax ID",
            "A type of CPT modifier",
          ],
          "b",
          "Deductibles are patient responsibility before insurance payment applies (subject to plan design).",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "billing-coding-basics",
          12,
          "Which claim form is commonly used for professional (physician) billing?",
          [
            "UB-04 only",
            "CMS-1500",
            "SDS sheet",
            "DEA Form 222 for all visits",
          ],
          "b",
          "CMS-1500 is the standard professional claim; UB-04 is institutional.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "billing-coding-basics",
          13,
          "Coordination of benefits (COB) is needed when:",
          [
            "A patient has no insurance",
            "A patient has more than one insurance plan that may cover the same services",
            "Only cash-pay visits occur",
            "The clinic buys new printers",
          ],
          "b",
          "COB determines primary vs secondary payment order.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "billing-coding-basics",
          14,
          "An encounter form / superbill typically lists:",
          [
            "Only employee vacation days",
            "Common diagnoses and procedures to support charge capture for a visit",
            "Pharmacy inventory par levels",
            "MRI images",
          ],
          "b",
          "Superbills help capture services/diagnoses for billing.",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "billing-coding-basics",
          15,
          "If a claim is denied for missing information, the CMAA should generally:",
          [
            "Resubmit the identical claim without review",
            "Review the denial reason, correct the claim/documentation, and resubmit or appeal as appropriate",
            "Bill the patient triple automatically",
            "Delete the patient's chart",
          ],
          "b",
          "Denial management requires root-cause correction and proper resubmission/appeal.",
          "hard"
        ),
      ],
      "communication-ethics": [
        q(
          "nha-cmaa-readiness-check",
          "communication-ethics",
          11,
          "When leaving a telephone message for a patient, the CMAA should:",
          [
            "Announce the full diagnosis and lab values on voicemail",
            "Leave minimal necessary information per policy to protect privacy",
            "Discuss results with whoever answers the phone",
            "Post the message on the clinic Facebook page",
          ],
          "b",
          "Messages should avoid unnecessary PHI disclosure.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "communication-ethics",
          12,
          "Empathy in patient communication means:",
          [
            "Agreeing that policies never apply",
            "Acknowledging feelings while remaining professional and solution-focused",
            "Sharing other patients' stories in detail",
            "Avoiding eye contact and walking away",
          ],
          "b",
          "Empathy validates emotion without abandoning professional boundaries.",
          "easy"
        ),
        q(
          "nha-cmaa-readiness-check",
          "communication-ethics",
          13,
          "A conflict of interest example for a CMAA is:",
          [
            "Following the attendance policy",
            "Accepting kickbacks to refer patients to a specific vendor",
            "Clocking out on time",
            "Attending HIPAA training",
          ],
          "b",
          "Kickbacks and biased referrals violate ethics and often law (e.g., anti-kickback rules).",
          "hard"
        ),
        q(
          "nha-cmaa-readiness-check",
          "communication-ethics",
          14,
          "Which is appropriate when a language barrier exists?",
          [
            "Rely on a minor child to interpret complex medical information routinely",
            "Use a qualified interpreter/service per facility policy",
            "Speak louder in English only",
            "Skip informed forms entirely",
          ],
          "b",
          "Qualified interpreters support accurate, ethical communication.",
          "medium"
        ),
        q(
          "nha-cmaa-readiness-check",
          "communication-ethics",
          15,
          "Professional boundaries with patients include:",
          [
            "Becoming financially entangled with patients for personal gain",
            "Maintaining a therapeutic, respectful relationship without exploitation",
            "Asking patients for large personal loans",
            "Dating patients while accessing their charts for curiosity",
          ],
          "b",
          "Administrative staff must maintain professional, non-exploitative boundaries.",
          "easy"
        ),
      ],
    },
  },

  "ardms-spi-readiness-check": {
    topics: {
      "physics-basics": [
        q(
          "ardms-spi-readiness-check",
          "physics-basics",
          11,
          "Intensity of an ultrasound beam is proportional to:",
          [
            "Amplitude squared (for a given medium relationship)",
            "Propagation speed only, never amplitude",
            "PRP alone",
            "Frame rate alone",
          ],
          "a",
          "Acoustic intensity relates to amplitude squared (power/area considerations).",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "physics-basics",
          12,
          "Refraction occurs when a sound beam:",
          [
            "Hits a boundary at 90° with identical impedances",
            "Obliquely encounters a boundary between media with different propagation speeds",
            "Is completely absorbed with no reflection ever",
            "Travels only in air",
          ],
          "b",
          "Snell's law: refraction needs oblique incidence and speed mismatch.",
          "hard"
        ),
        q(
          "ardms-spi-readiness-check",
          "physics-basics",
          13,
          "Pulse repetition frequency (PRF) is:",
          [
            "The number of pulses transmitted per second",
            "The time from the start of one pulse to the end of that pulse only",
            "Always equal to operating frequency",
            "Unrelated to imaging depth",
          ],
          "a",
          "PRF is pulse rate; deeper imaging generally requires lower PRF.",
          "easy"
        ),
        q(
          "ardms-spi-readiness-check",
          "physics-basics",
          14,
          "Increasing imaging depth while keeping other factors constant typically requires:",
          [
            "Higher PRF",
            "Lower PRF to allow time for echoes to return",
            "Shorter listening time",
            "Elimination of the range equation",
          ],
          "b",
          "Deeper echoes take longer; PRF must decrease to avoid range ambiguity.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "physics-basics",
          15,
          "Decibels (dB) in ultrasound describe:",
          [
            "Absolute temperature only",
            "Relative changes in intensity or amplitude on a logarithmic scale",
            "Only transducer footprint width in millimeters",
            "Blood viscosity",
          ],
          "b",
          "dB express ratios (e.g., attenuation, gain changes) logarithmically.",
          "easy"
        ),
      ],
      "transducers-beam": [
        q(
          "ardms-spi-readiness-check",
          "transducers-beam",
          11,
          "The piezoelectric effect describes:",
          [
            "Conversion between electrical energy and mechanical (sound) energy in crystals",
            "Only heating of tissue without vibration",
            "Color map assignment in Doppler",
            "TGC slope calculation alone",
          ],
          "a",
          "Piezoelectric materials expand/contract with voltage and generate voltage from pressure.",
          "easy"
        ),
        q(
          "ardms-spi-readiness-check",
          "transducers-beam",
          12,
          "Increasing the number of transmit foci typically:",
          [
            "Improves lateral resolution at multiple depths but can reduce frame rate",
            "Always increases temporal resolution",
            "Eliminates the need for a matching layer",
            "Removes all side lobes permanently",
          ],
          "a",
          "Multiple foci improve lateral resolution over depth at a temporal-resolution cost.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "transducers-beam",
          13,
          "Spatial pulse length (SPL) equals:",
          [
            "Number of cycles in the pulse × wavelength",
            "PRF × duty factor",
            "Frame rate × depth",
            "Only the crystal thickness in centimeters",
          ],
          "a",
          "SPL = n × λ; shorter SPL improves axial resolution.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "transducers-beam",
          14,
          "A convex (curved) array produces an image that is typically:",
          [
            "A sector from a tiny footprint with electronic steering only like phased array",
            "Blunted-sector shaped with a wider field at depth from sequential firing along a curved face",
            "A perfect rectangle with no divergence",
            "Only M-mode lines",
          ],
          "b",
          "Curved arrays create blunted sector formats common in abdominal imaging.",
          "hard"
        ),
        q(
          "ardms-spi-readiness-check",
          "transducers-beam",
          15,
          "Bandwidth of a transducer relates to:",
          [
            "The range of frequencies in the transmitted/received pulse",
            "Only the physical cable length",
            "The patient's heart rate",
            "Hospital Wi-Fi speed",
          ],
          "a",
          "Broader bandwidth (more damping) shortens pulses and improves axial resolution.",
          "easy"
        ),
      ],
      "doppler-hemodynamics": [
        q(
          "ardms-spi-readiness-check",
          "doppler-hemodynamics",
          11,
          "The Doppler equation shows Doppler shift increases when:",
          [
            "Reflector speed increases (toward/away component) or operating frequency increases, for a given angle factor",
            "Propagation speed in tissue becomes infinite",
            "The Doppler angle is exactly 90°",
            "PRF is set to zero",
          ],
          "a",
          "fd ∝ 2v f0 cosθ / c; higher v or f0 increases shift (angle matters).",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "doppler-hemodynamics",
          12,
          "Power Doppler imaging is particularly useful because it:",
          [
            "Provides exact velocity and direction as well as CW Doppler",
            "Is more sensitive to low flow and less angle-dependent than velocity color Doppler, without showing direction/velocity magnitude the same way",
            "Never produces flash artifact",
            "Replaces spectral Doppler entirely for stenosis grading",
          ],
          "b",
          "Power Doppler encodes strength of the Doppler signal; it is relatively angle-insensitive compared with color velocity maps.",
          "hard"
        ),
        q(
          "ardms-spi-readiness-check",
          "doppler-hemodynamics",
          13,
          "Laminar flow is characterized by:",
          [
            "Chaotic multidirectional velocities filling the spectrum at rest",
            "Streamlined layers with a relatively narrow range of velocities in a vessel",
            "Only flow at 90° to the beam",
            "Absence of any Doppler shift at all angles",
          ],
          "b",
          "Laminar flow is orderly; turbulence widens the spectral envelope.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "doppler-hemodynamics",
          14,
          "Sample volume (gate) size in pulsed Doppler affects:",
          [
            "Only the B-mode frequency",
            "Which portion of the vessel is interrogated and how much spectral broadening may appear",
            "Whether refraction can occur",
            "Crystal damping material composition",
          ],
          "b",
          "Larger gates include more velocity components and can increase spectral broadening.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "doppler-hemodynamics",
          15,
          "Autocorrelation in color Doppler is used to:",
          [
            "Estimate mean Doppler shifts rapidly across many gates for color display",
            "Measure only tissue harmonic imaging MI",
            "Calibrate the thermal index printer",
            "Replace the need for a transducer",
          ],
          "a",
          "Color flow uses autocorrelation (or similar) for fast mean-velocity estimates.",
          "easy"
        ),
      ],
      "artifacts-safety": [
        q(
          "ardms-spi-readiness-check",
          "artifacts-safety",
          11,
          "Comet-tail artifact is a form of:",
          [
            "Reverberation from closely spaced strong reflectors",
            "Refraction shadowing only",
            "Doppler aliasing",
            "Speed error from fat exclusively",
          ],
          "a",
          "Comet-tail is a dense reverberation pattern from metal/cholesterol etc.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "artifacts-safety",
          12,
          "Range ambiguity artifact can occur when:",
          [
            "PRF is so high that echoes from deep structures return after the next pulse is sent",
            "Gain is set to zero",
            "Only CW Doppler is used for imaging depth",
            "The matching layer is perfect",
          ],
          "a",
          "If listening time is too short, late echoes are mis-mapped to shallow depths.",
          "hard"
        ),
        q(
          "ardms-spi-readiness-check",
          "artifacts-safety",
          13,
          "Which bioeffect is more associated with cavitation risk?",
          [
            "Only skin burns from the keyboard",
            "Mechanical/nonthermal effects monitored conceptually by MI",
            "Solely the thermal index for bone",
            "MRI projectile risk",
          ],
          "b",
          "MI relates to mechanical (cavitation) bioeffect potential.",
          "medium"
        ),
        q(
          "ardms-spi-readiness-check",
          "artifacts-safety",
          14,
          "Edge shadowing (refraction shadow) often appears:",
          [
            "Distal to the edges of a curved structure such as a cyst",
            "Only inside the transducer housing",
            "As color bruit exclusively",
            "When MI is zero",
          ],
          "a",
          "Beam refraction at curved borders can create edge shadows.",
          "easy"
        ),
        q(
          "ardms-spi-readiness-check",
          "artifacts-safety",
          15,
          "To practice ALARA during obstetric ultrasound, a sonographer should:",
          [
            "Use maximum output and dwell time on one spot indefinitely",
            "Minimize output and exposure time while obtaining diagnostic images",
            "Disable freeze and record for hours continuously",
            "Ignore TI/MI displays always",
          ],
          "b",
          "ALARA: as low as reasonably achievable exposure consistent with diagnostic needs.",
          "easy"
        ),
      ],
    },
  },

  "nbstsa-cst-readiness-check": {
    topics: {
      perioperative: [
        q(
          "nbstsa-cst-readiness-check",
          "perioperative",
          11,
          "The purpose of preoperative verification (including site marking when required) is to:",
          [
            "Speed room turnover only",
            "Prevent wrong-person, wrong-site, wrong-procedure surgery",
            "Replace informed consent",
            "Eliminate the need for counts",
          ],
          "b",
          "Universal Protocol steps reduce wrong-site events.",
          "easy"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "perioperative",
          12,
          "During induction of general anesthesia, the surgical team should:",
          [
            "Make loud unnecessary noise and move the patient vigorously",
            "Maintain a calm environment and be ready to assist with airway emergencies",
            "Begin skin prep before airway is secured if rushing",
            "Leave the room entirely without communication",
          ],
          "b",
          "Induction is a critical phase; minimize distraction and support airway readiness.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "perioperative",
          13,
          "Surgical sponges used in body cavities should be:",
          [
            "Uncounted radiopaque-free gauze only",
            "Radiopaque and included in the sponge count process",
            "Left in the wound intentionally without documentation",
            "Substituted with paper towels",
          ],
          "b",
          "Radiopaque sponges and rigorous counts prevent retained surgical items.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "perioperative",
          14,
          "Trendelenburg position places the patient:",
          [
            "Head up, feet down",
            "Head down, feet elevated",
            "Prone with flexion only",
            "Sitting upright for craniotomy always",
          ],
          "b",
          "Trendelenburg tilts the head downward relative to the feet.",
          "easy"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "perioperative",
          15,
          "When receiving a medication onto the sterile field, the CST should:",
          [
            "Accept unlabeled solutions without verification",
            "Verify drug name, strength, and expiration with the circulator and label the container on the field",
            "Pour antibiotics into an unlabeled cup for later guessing",
            "Dilute all drugs by eye without orders",
          ],
          "b",
          "Medication safety requires read-back verification and immediate labeling.",
          "hard"
        ),
      ],
      "asepsis-sterile": [
        q(
          "nbstsa-cst-readiness-check",
          "asepsis-sterile",
          11,
          "The sterile field is considered contaminated if:",
          [
            "A nonsterile item touches it or sterility is broken by moisture strike-through",
            "The surgeon asks a question",
            "The lights are adjusted by the circulator without touching the field",
            "Music plays in the OR",
          ],
          "a",
          "Contact with nonsterile items or strike-through compromises the field.",
          "easy"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "asepsis-sterile",
          12,
          "Gowns are sterile:",
          [
            "In the entire back including below the waist",
            "In front from chest to sterile field level and sleeves to cuffs, per standard practice",
            "Only at the neckline",
            "Everywhere including after falling on the floor",
          ],
          "b",
          "Standard sterile gown areas are limited; backs and below-waist are unsterile.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "asepsis-sterile",
          13,
          "When a sterile team member must move past another, they should:",
          [
            "Brush backs together carelessly",
            "Pass front-to-front or back-to-back while maintaining distance from nonsterile areas",
            "Reach behind one another across the field",
            "Remove one glove to shake hands",
          ],
          "b",
          "Passing technique protects gown fronts and the sterile field.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "asepsis-sterile",
          14,
          "Strike-through on a sterile drape means:",
          [
            "The drape is more sterile",
            "Moisture has penetrated, potentially contaminating the field",
            "Electrosurgery is complete",
            "The count is finished",
          ],
          "b",
          "Fluid strike-through is a contamination pathway.",
          "easy"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "asepsis-sterile",
          15,
          "Opening a peel pack onto the sterile field requires:",
          [
            "Peeling so the contents are projected uncontrolled onto the field",
            "Presenting the item so the sterile person can take it without contaminating edges",
            "Touching the inside of the pack with bare hands",
            "Tearing through the middle of the package randomly",
          ],
          "b",
          "Edges are unsterile; transfer technique must protect sterility.",
          "hard"
        ),
      ],
      "anatomy-surg": [
        q(
          "nbstsa-cst-readiness-check",
          "anatomy-surg",
          11,
          "The spleen is located primarily in which abdominal quadrant?",
          [
            "Right lower quadrant",
            "Left upper quadrant",
            "Right upper quadrant only",
            "Pelvis midline",
          ],
          "b",
          "The spleen lies in the LUQ beneath the diaphragm.",
          "easy"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "anatomy-surg",
          12,
          "Which vessel is typically controlled within the mesoappendix during appendectomy?",
          [
            "Left gastric artery as the only vessel",
            "Appendiceal artery within the mesoappendix",
            "Aorta at the iliac bifurcation always",
            "Pulmonary vein",
          ],
          "b",
          "The appendiceal artery supplies the appendix via the mesoappendix.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "anatomy-surg",
          13,
          "The epididymis is located:",
          [
            "On the superior/posterior aspect of the testis",
            "Inside the gallbladder fossa",
            "Within the mediastinum",
            "Only in the female pelvis",
          ],
          "a",
          "Epididymis sits along the testis and connects to the vas deferens.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "anatomy-surg",
          14,
          "During thyroid surgery, which nerve is at risk near the inferior thyroid artery territory?",
          [
            "Optic nerve",
            "Recurrent laryngeal nerve",
            "Phrenic nerve in the leg",
            "Sciatic nerve",
          ],
          "b",
          "Recurrent laryngeal nerves are critical structures in thyroidectomy.",
          "hard"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "anatomy-surg",
          15,
          "The greater omentum is:",
          [
            "A double layer of peritoneum hanging from the stomach that can wall off infection",
            "A bone in the wrist",
            "The lining of the ventricle",
            "A type of suture material",
          ],
          "a",
          "Greater omentum is a peritoneal apron from the greater curvature of the stomach.",
          "easy"
        ),
      ],
      "equipment-safety": [
        q(
          "nbstsa-cst-readiness-check",
          "equipment-safety",
          11,
          "A grounding pad (patient return electrode) for monopolar electrosurgery should be:",
          [
            "Placed over a bony prominence with poor contact",
            "Applied to clean, dry, well-vascularized skin with full contact per IFU",
            "Cut in half to fit small patients routinely without approved pads",
            "Omitted if the surgeon uses high power",
          ],
          "b",
          "Proper dispersive electrode placement prevents alternate-site burns.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "equipment-safety",
          12,
          "Which is a correct action if a surgical count is incorrect?",
          [
            "Close the wound immediately without notifying the team",
            "Notify the surgeon, search systematically, and use imaging as directed by protocol",
            "Hide the discrepancy from the record",
            "Assume the missing sponge dissolved",
          ],
          "b",
          "Count discrepancies require immediate communication and resolution steps.",
          "easy"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "equipment-safety",
          13,
          "Harmonic/ultrasonic shears cut and coagulate using:",
          [
            "Ionizing radiation",
            "High-frequency mechanical vibration that denatures protein",
            "Only cold steel without energy",
            "Compressed nitrogen alone",
          ],
          "b",
          "Ultrasonic devices use vibrating blades for cutting/coagulation.",
          "medium"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "equipment-safety",
          14,
          "When using a pneumatic tourniquet, staff must:",
          [
            "Ignore inflation time",
            "Document tourniquet time and follow safe pressure/time limits",
            "Place it over the incision site",
            "Inflate without monitoring duration",
          ],
          "b",
          "Tourniquet pressure and duration are patient-safety critical parameters.",
          "hard"
        ),
        q(
          "nbstsa-cst-readiness-check",
          "equipment-safety",
          15,
          "Smoke plume from electrosurgery/laser should be:",
          [
            "Ignored because it is sterile air",
            "Evacuated with appropriate smoke evacuation to reduce inhalation exposure",
            "Directed toward the scrub team's faces",
            "Used to inflate the abdomen",
          ],
          "b",
          "Surgical smoke contains hazardous particulates; evacuation protects the team.",
          "easy"
        ),
      ],
    },
  },

  "vtne-readiness-check": {
    topics: {
      "pharmacy-pharm": [
        q(
          "vtne-readiness-check",
          "pharmacy-pharm",
          11,
          "Which abbreviation means twice daily?",
          [
            "SID",
            "BID",
            "QOD only",
            "PRN exclusively",
          ],
          "b",
          "BID = twice daily; SID = once daily; TID = three times daily.",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "pharmacy-pharm",
          12,
          "A 10 kg cat needs 0.2 mg/kg of a drug available as 1 mg/mL. What volume do you draw?",
          [
            "0.2 mL",
            "2 mL",
            "5 mL",
            "20 mL",
          ],
          "b",
          "Dose = 10 kg × 0.2 mg/kg = 2 mg; volume = 2 mg ÷ 1 mg/mL = 2 mL.",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "pharmacy-pharm",
          13,
          "Which statement about metronidazole in small animals is most accurate?",
          [
            "It is never used for anaerobic or protozoal infections",
            "It is commonly used for anaerobic bacterial and some protozoal infections under veterinary direction",
            "It is a Schedule II opioid",
            "It must be given only by the IO route",
          ],
          "b",
          "Metronidazole is used for anaerobes and certain protozoa (e.g., Giardia protocols vary).",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "pharmacy-pharm",
          14,
          "Acepromazine is classified primarily as a:",
          [
            "Phenothiazine tranquilizer/sedative",
            "Loop diuretic",
            "Insulin analog",
            "Thyroid hormone replacement",
          ],
          "a",
          "Acepromazine is a phenothiazine used for sedation (with important contraindications).",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "pharmacy-pharm",
          15,
          "When reconstituting a vaccine, the technician should:",
          [
            "Use any available water bottle from the break room",
            "Use the diluent supplied/specified and follow label handling and timing",
            "Shake violently after freezing the vial solid",
            "Store reconstituted modified-live vaccine for weeks at room temperature",
          ],
          "b",
          "Vaccines require correct diluent and handling per manufacturer label.",
          "hard"
        ),
      ],
      "surgical-nursing": [
        q(
          "vtne-readiness-check",
          "surgical-nursing",
          11,
          "Capnography primarily monitors:",
          [
            "Blood glucose",
            "End-tidal carbon dioxide as a ventilation indicator",
            "Packed cell volume only",
            "Urine specific gravity",
          ],
          "b",
          "ETCO2 reflects ventilation and can alert to circuit or patient problems.",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "surgical-nursing",
          12,
          "A surgical scrub on a patient should progress:",
          [
            "From dirty periphery toward the incision site",
            "From the proposed incision site outward in concentric fashion",
            "Only with alcohol and never antiseptic",
            "After the drapes are already contaminated",
          ],
          "b",
          "Aseptic prep moves from clean (incision) to dirty (periphery).",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "surgical-nursing",
          13,
          "Which instrument is typically used to hold drapes to skin?",
          [
            "Gelpi retractor",
            "Backhaus towel clamp",
            "Rochester-Carmalt forceps for bowel only",
            "Snook ovariectomy hook",
          ],
          "b",
          "Backhaus towel clamps secure drapes to the patient.",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "surgical-nursing",
          14,
          "Hypotension under anesthesia is a concern because it can:",
          [
            "Improve renal perfusion always",
            "Reduce organ perfusion and increase anesthetic risk",
            "Eliminate the need for monitoring",
            "Raise SpO2 automatically",
          ],
          "b",
          "Low blood pressure threatens tissue perfusion; treat underlying causes promptly.",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "surgical-nursing",
          15,
          "When preparing a cat for feline castration, an important consideration is:",
          [
            "That cats never need analgesia",
            "Adequate analgesia/anesthesia and aseptic technique for the scrotal approach used",
            "Mandatory overnight fasting for 48 hours in neonates only as a universal rule without assessment",
            "Avoiding any monitoring because the procedure is brief",
          ],
          "b",
          "Even brief surgeries require appropriate anesthesia, analgesia, and asepsis.",
          "hard"
        ),
      ],
      diagnostics: [
        q(
          "vtne-readiness-check",
          "diagnostics",
          11,
          "A left shift on a CBC refers to:",
          [
            "Increased numbers of immature neutrophils (bands) in circulation",
            "A change in the X-ray technique chart only",
            "Low platelets exclusively",
            "Elevated bile acids only",
          ],
          "a",
          "Left shift = increased immature neutrophils, often with inflammation/infection.",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "diagnostics",
          12,
          "Which tube additive is commonly used for coagulation testing (e.g., PT/PTT)?",
          [
            "EDTA (purple top) as first choice for coag panels",
            "Sodium citrate (blue top)",
            "No additive red top only for every coag test",
            "Heparin green top exclusively for PT",
          ],
          "b",
          "Citrate tubes are standard for most coagulation assays.",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "diagnostics",
          13,
          "Icteric serum appears:",
          [
            "Clear and colorless always",
            "Yellow due to bilirubin",
            "Milky white from lipemia only",
            "Bright green from EDTA",
          ],
          "b",
          "Icterus = yellow discoloration from bilirubin; lipemia is milky.",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "diagnostics",
          14,
          "A positive catalase test helps differentiate:",
          [
            "Staphylococci (catalase positive) from streptococci (catalase negative)",
            "All Gram-negative rods from each other perfectly",
            "Fungal hyphae species without microscopy",
            "Blood types in cats",
          ],
          "a",
          "Catalase separates Staph (+) from Strep (−) among Gram-positive cocci.",
          "hard"
        ),
        q(
          "vtne-readiness-check",
          "diagnostics",
          15,
          "Which statement about radiographic technique is correct?",
          [
            "Increasing mAs increases radiographic density (blackness) roughly proportionally",
            "kVp has no effect on contrast or penetration",
            "Grids are used to increase scatter reaching the film/detector",
            "Collimation should always be wide open past the patient",
          ],
          "a",
          "mAs controls quantity of x-rays/density; collimate tightly; grids reduce scatter.",
          "medium"
        ),
      ],
      "animal-care": [
        q(
          "vtne-readiness-check",
          "animal-care",
          11,
          "Normal canine rectal temperature is approximately:",
          [
            "96.0–96.5°F (35.5–36°C)",
            "100–102.5°F (about 37.8–39.2°C)",
            "105–107°F at rest always",
            "90°F in healthy adults",
          ],
          "b",
          "Typical dog rectal temps are roughly 100–102.5°F.",
          "easy"
        ),
        q(
          "vtne-readiness-check",
          "animal-care",
          12,
          "Which parasite is commonly associated with zoonotic visceral larva migrans from dog feces?",
          [
            "Dipylidium caninum only",
            "Toxocara canis",
            "Otodectes cynotis exclusively",
            "Demodex canis as a common human intestinal worm",
          ],
          "b",
          "Toxocara canis is a classic cause of visceral larva migrans risk.",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "animal-care",
          13,
          "When restraining a fractious cat, a preferred approach is to:",
          [
            "Use scruffing/force without planning and ignore fear signals",
            "Use Fear Free/low-stress methods, towels/muzzles as appropriate, and chemical restraint when needed per DVM",
            "Hold by the tail tip only",
            "Chase the cat around the room to tire it",
          ],
          "b",
          "Low-stress handling and appropriate restraint/chemical help reduce injury and fear.",
          "medium"
        ),
        q(
          "vtne-readiness-check",
          "animal-care",
          14,
          "Core vaccines for dogs in many US guidelines commonly include protection against:",
          [
            "Only Bordetella forever as the sole core antigen",
            "Distemper, adenovirus, parvovirus (and rabies per law/epidemiology)",
            "Only Lyme disease in all regions as core",
            "No viral antigens at all",
          ],
          "b",
          "DA2P (±P) and rabies are commonly core; lifestyle vaccines vary.",
          "hard"
        ),
        q(
          "vtne-readiness-check",
          "animal-care",
          15,
          "Subcutaneous fluids are typically administered in the:",
          [
            "Intravenous cephalic vein only",
            "Loose skin over the scruff/shoulder area (or other approved SQ sites)",
            "Urinary bladder lumen",
            "Ear canal",
          ],
          "b",
          "SQ fluids are given into subcutaneous tissue, commonly dorsal shoulder/scruff region.",
          "easy"
        ),
      ],
    },
  },
};

function insertAfterTopic(existing, topicId, newQs) {
  let lastIdx = -1;
  for (let i = 0; i < existing.length; i++) {
    if (existing[i].topicId === topicId) lastIdx = i;
  }
  if (lastIdx === -1) throw new Error(`topic not found: ${topicId}`);
  const ids = new Set(existing.map((x) => x.id));
  for (const nq of newQs) {
    if (ids.has(nq.id)) throw new Error(`id already exists: ${nq.id}`);
  }
  return [
    ...existing.slice(0, lastIdx + 1),
    ...newQs,
    ...existing.slice(lastIdx + 1),
  ];
}

function expandFile(examSlug) {
  const file = path.join(ROOT, `${examSlug}.json`);
  const bank = BANKS[examSlug];
  if (!bank) throw new Error(`No bank data for ${examSlug}`);
  let data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (data.length !== 40) {
    throw new Error(`${examSlug}: expected length 40, got ${data.length}`);
  }
  // Preserve original 001-010 verbatim; insert 011-015 after each topic block.
  for (const [topicId, newQs] of Object.entries(bank.topics)) {
    if (newQs.length !== 5) throw new Error(`${examSlug}/${topicId}: need 5 qs`);
    data = insertAfterTopic(data, topicId, newQs);
  }
  if (data.length !== 60) throw new Error(`${examSlug}: expected 60, got ${data.length}`);
  const counts = {};
  for (const item of data) {
    counts[item.topicId] = (counts[item.topicId] || 0) + 1;
  }
  for (const [topicId, count] of Object.entries(counts)) {
    if (count !== 15) throw new Error(`${examSlug}/${topicId}: count ${count}`);
  }
  // Ensure original first 40 ids unchanged (by comparing prompts of *-001..010)
  const original = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const oq of original) {
    const match = data.find((x) => x.id === oq.id);
    if (!match) throw new Error(`missing original id ${oq.id}`);
    if (JSON.stringify(match) !== JSON.stringify(oq)) {
      throw new Error(`original question mutated: ${oq.id}`);
    }
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  return { examSlug, length: data.length, counts };
}

const results = [];
for (const examSlug of Object.keys(BANKS)) {
  results.push(expandFile(examSlug));
}
console.log(JSON.stringify(results, null, 2));
