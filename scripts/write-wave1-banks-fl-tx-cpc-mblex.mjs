/**
 * Write Wave 1 local mock banks: FL RE, TX RE, AAPC CPC, MBLEx.
 * Run: node scripts/write-wave1-banks-fl-tx-cpc-mblex.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../src/data/mock-exams");
const SOURCE = "Original UniPrep2Go local bank (Wave 1).";

function q(examSlug, topicId, n, prompt, options, correctOptionId, explanation, distractorExplanations, difficulty) {
  const id = `${examSlug}-${topicId}-${String(n).padStart(3, "0")}`;
  const opts = ["a", "b", "c", "d"].map((oid, i) => ({ id: oid, text: options[i] }));
  const wrong = Object.fromEntries(
    Object.entries(distractorExplanations).filter(([k]) => k !== correctOptionId)
  );
  return {
    id,
    examSlug,
    topicId,
    prompt,
    options: opts,
    correctOptionId,
    explanation,
    distractorExplanations: wrong,
    difficulty,
    sourceNote: SOURCE,
  };
}

function bank(examSlug, byTopic) {
  const out = [];
  for (const [topicId, items] of Object.entries(byTopic)) {
    if (items.length !== 10) throw new Error(`${examSlug}/${topicId}: expected 10, got ${items.length}`);
    items.forEach((item, i) => {
      out.push(q(examSlug, topicId, i + 1, ...item));
    });
  }
  if (out.length !== 40) throw new Error(`${examSlug}: expected 40, got ${out.length}`);
  // vary correct answers
  const dist = { a: 0, b: 0, c: 0, d: 0 };
  for (const x of out) dist[x.correctOptionId]++;
  if (Object.values(dist).some((n) => n < 5)) {
    console.warn(`${examSlug} answer distribution thin:`, dist);
  }
  return out;
}

// ─── Florida Real Estate ─────────────────────────────────────────────────────
const fl = bank("fl-real-estate-readiness-check", {
  "license-law": [
    [
      "Under Florida license law, which activity generally requires an active real estate license?",
      [
        "An owner selling their own homestead property",
        "A salaried employee of an owner-developer selling that developer's inventory for compensation",
        "A person negotiating a sale of real property for another for compensation",
        "An attorney preparing a deed in the course of legal practice",
      ],
      "c",
      "Florida requires licensure for people who, for compensation, appraise, auction, sell, exchange, buy, rent, or negotiate real property for another. Negotiating a sale for another for pay is classic brokerage activity.",
      {
        a: "Owners may sell their own property without a real estate license.",
        b: "Certain owner-developer employees selling only that developer's inventory may be exempt when properly structured; this is not the clearest licensed activity.",
        d: "Attorneys acting in their legal capacity have a recognized exemption for certain services.",
      },
      "medium",
    ],
    [
      "How many members serve on the Florida Real Estate Commission (FREC)?",
      ["5", "7", "9", "11"],
      "b",
      "FREC has seven members appointed by the Governor and confirmed by the Senate: four licensed brokers, one licensed sales associate or broker, and two consumer members.",
      {
        a: "Five is too few; FREC is a seven-member commission.",
        c: "Nine is incorrect for Florida's FREC composition.",
        d: "Eleven is not the FREC membership size.",
      },
      "easy",
    ],
    [
      "A Florida sales associate's license is inactive. Which statement is most accurate?",
      [
        "The associate may continue to collect new listing commissions while inactive",
        "The associate may not perform real estate services for compensation until the license is active and registered with a broker",
        "Inactive status permanently cancels the license after 30 days",
        "Inactive associates may supervise other sales associates",
      ],
      "b",
      "An inactive Florida licensee may not practice real estate for compensation. To work, the license must be active and the associate must be registered under an employing broker.",
      {
        a: "Inactive status prohibits performing licensed services for compensation.",
        c: "Involuntary inactive status has specific time rules, but inactivity does not automatically cancel after 30 days in that way.",
        d: "Sales associates do not supervise other associates; brokers supervise.",
      },
      "medium",
    ],
    [
      "Florida's broker experience requirement before applying for a broker license generally includes which of the following?",
      [
        "Holding an active sales associate license for at least 24 months during the preceding 5 years",
        "Completing only a 14-hour continuing education course",
        "Owning real property in Florida for 5 years",
        "Passing the sales associate exam a second time",
      ],
      "a",
      "Broker applicants typically need active licensed experience as a sales associate (commonly 24 months within the prior 5 years) plus the broker prelicense education, among other requirements.",
      {
        b: "Continuing education alone does not satisfy broker experience requirements.",
        c: "Property ownership is not a substitute for licensed experience.",
        d: "Retaking the sales associate exam does not create broker eligibility.",
      },
      "medium",
    ],
    [
      "What is the purpose of Florida's Real Estate Recovery Fund?",
      [
        "To finance FREC member salaries",
        "To reimburse consumers harmed by certain licensees' violations when judgments are uncollectible",
        "To guarantee mortgage payments for first-time buyers",
        "To pay advertising costs for brokers in disciplinary cases",
      ],
      "b",
      "The Recovery Fund helps compensate persons who obtain a final judgment against a licensee for certain violations and cannot collect, subject to statutory caps and procedures.",
      {
        a: "The fund is not a payroll account for FREC.",
        c: "It is not a mortgage guaranty program.",
        d: "It does not fund broker advertising.",
      },
      "easy",
    ],
    [
      "A Florida broker must keep escrow records for at least how long?",
      ["1 year", "2 years", "5 years", "7 years"],
      "c",
      "Florida brokers generally must preserve brokerage business records, including escrow records, for at least five years (longer if involved in litigation until resolution plus that period).",
      {
        a: "One year is shorter than Florida's record-retention standard.",
        b: "Two years is insufficient under Florida brokerage record rules.",
        d: "Seven years exceeds the general five-year baseline (though litigation can extend retention).",
      },
      "hard",
    ],
    [
      "Which Florida entity issues real estate licenses?",
      [
        "Florida Association of Realtors",
        "Department of Business and Professional Regulation (DBPR)",
        "County property appraiser",
        "Federal Housing Administration",
      ],
      "b",
      "DBPR issues Florida real estate licenses; FREC regulates and disciplines licensees under Chapter 475, F.S., among other roles.",
      {
        a: "Trade associations do not issue state licenses.",
        c: "Property appraisers assess property; they do not license brokers.",
        d: "FHA is a federal mortgage insurance program, not a Florida licensing body.",
      },
      "easy",
    ],
    [
      "If a Florida sales associate changes employing brokers, what must occur?",
      [
        "Nothing; the license automatically follows the associate",
        "The associate must notify DBPR and become registered with the new broker before performing services",
        "Only the former broker must notify FREC within one year",
        "The associate must retake the prelicense course",
      ],
      "b",
      "A sales associate may work for only one broker at a time and must be properly registered with the new employer before practicing for that broker.",
      {
        a: "Registration does not auto-transfer without proper notification/registration.",
        c: "Timely registration with the new broker is required; waiting a year is incorrect.",
        d: "Changing employers does not require repeating prelicense education.",
      },
      "medium",
    ],
    [
      "Florida's Chapter 475 primarily governs which of the following?",
      [
        "Building codes for residential construction",
        "Real estate brokers, sales associates, and schools",
        "Federal RESPA disclosures",
        "County zoning variances",
      ],
      "b",
      "Chapter 475, Florida Statutes, is the real estate license law governing brokers, sales associates, real estate schools, and related practice standards.",
      {
        a: "Building codes are separate from Chapter 475 license law.",
        c: "RESPA is federal; Florida implements disclosures through other frameworks as well.",
        d: "Zoning is local land-use regulation, not Chapter 475's core subject.",
      },
      "easy",
    ],
    [
      "A Florida broker receives conflicting demands on earnest money. After following required procedures, the broker may use which settlement procedure?",
      [
        "Keep the deposit as a brokerage fee automatically",
        "Mediation, arbitration, litigation, or escrow disbursement order (EDO) as available options",
        "Return the deposit only to the seller without notice",
        "Destroy the deposit check to end the dispute",
      ],
      "b",
      "When facing conflicting demands, Florida brokers must notify FREC (when required) and may resolve via mediation, arbitration, litigation, or request an escrow disbursement order, among permitted paths.",
      {
        a: "Brokers may not simply convert disputed escrow to fees.",
        c: "Unilateral return to one party without following procedures risks liability.",
        d: "Destroying funds is improper handling of escrow.",
      },
      "hard",
    ],
  ],
  "contracts-titles": [
    [
      "In Florida, which instrument typically conveys legal title to real property?",
      ["Listing agreement", "Deed", "Promissory note", "Appraisal report"],
      "b",
      "A deed is the written instrument that transfers title to real property when properly executed and delivered (and usually recorded).",
      {
        a: "A listing is a brokerage employment contract, not a conveyance of title.",
        c: "A note evidences debt; it does not convey title.",
        d: "An appraisal estimates value; it does not transfer ownership.",
      },
      "easy",
    ],
    [
      "Which Florida deed provides the greatest protection to the grantee through full covenants?",
      ["Quitclaim deed", "Bargain and sale deed", "General warranty deed", "Personal representative's deed without warranties"],
      "c",
      "A general warranty deed warrants title against defects arising anytime, offering the broadest customary title warranties to the buyer.",
      {
        a: "A quitclaim deed conveys whatever interest the grantor may have without warranties.",
        b: "Bargain and sale deeds typically offer fewer warranties than a general warranty deed.",
        d: "PR deeds often limit warranties to the estate's acts.",
      },
      "medium",
    ],
    [
      "Constructive notice of a deed interest is most commonly achieved by:",
      [
        "Oral agreement between neighbors",
        "Recording the deed in the public records of the county where the property is located",
        "Placing the deed in a safe-deposit box only",
        "Emailing a copy to the buyer",
      ],
      "b",
      "Recording in the county public records gives constructive notice to the world of the recorded interest.",
      {
        a: "Oral agreements do not create constructive notice of title.",
        c: "Private storage does not notify third parties.",
        d: "Email alone is not public recording.",
      },
      "easy",
    ],
    [
      "A Florida real estate sales contract that is missing an essential element is generally:",
      ["Enforceable as written", "Void or voidable depending on the defect", "Automatically converted to a lease", "Binding only on the broker"],
      "b",
      "Contracts lacking essential elements (competent parties, offer/acceptance, consideration, lawful object, etc.) may be void or voidable and not fully enforceable.",
      {
        a: "Missing essential elements undermines enforceability.",
        c: "Defects do not transform a purchase contract into a lease.",
        d: "Brokers are not the parties whose mutual assent creates the sale contract.",
      },
      "medium",
    ],
    [
      "Which clause in a mortgage or deed of trust allows the lender to demand full payment if the borrower defaults?",
      ["Defeasance clause", "Acceleration clause", "Habendum clause", "Exculpatory clause in a lease"],
      "b",
      "An acceleration clause lets the lender call the entire debt due upon default (subject to notice and law).",
      {
        a: "Defeasance relates to defeating the lien when the debt is paid.",
        c: "Habendum (“to have and to hold”) appears in deeds, not as a loan acceleration term.",
        d: "Lease exculpatory clauses address liability, not mortgage acceleration.",
      },
      "medium",
    ],
    [
      "Title insurance primarily protects the insured against:",
      [
        "Future declines in market value",
        "Covered defects in title existing as of the policy date",
        "Physical damage from hurricanes",
        "Tenant nonpayment of rent",
      ],
      "b",
      "Owner's or lender's title insurance covers certain title defects and liens that existed as of the policy effective date, subject to exclusions and exceptions.",
      {
        a: "Title insurance does not insure market appreciation or price.",
        c: "Hazard insurance covers physical damage, not title defects.",
        d: "Rent collection risk is a landlord/management issue, not title insurance.",
      },
      "easy",
    ],
    [
      "In Florida condominium resales, which disclosure is characteristically required?",
      [
        "Only a federal lead pamphlet with no condo documents",
        "Governance form and opportunity to review association documents within statutory timelines",
        "An FHA case number on every contract",
        "A broker price opinion in lieu of a contract",
      ],
      "b",
      "Florida condo resale buyers receive specific disclosures and document review rights (including a governance form) under condominium statutes.",
      {
        a: "Lead disclosures may apply to pre-1978 housing but do not replace condo document requirements.",
        c: "FHA case numbers apply to FHA-insured loans, not every condo resale.",
        d: "A BPO is not a substitute for required condo disclosures.",
      },
      "hard",
    ],
    [
      "An option contract in real estate gives the optionee:",
      [
        "Immediate fee simple ownership",
        "A unilateral right to purchase on stated terms within a period, usually for consideration",
        "An automatic lease renewal",
        "Power to revoke the optionor's listing",
      ],
      "b",
      "An option is typically a unilateral contract: the optionee may elect to buy on fixed terms within the option period, supported by option consideration.",
      {
        a: "Ownership transfers only if the option is exercised and closing occurs.",
        c: "Options are purchase rights, not lease renewals.",
        d: "Options do not control the seller's listing agreements.",
      },
      "medium",
    ],
    [
      "Which tenancy includes a right of survivorship between co-owners?",
      ["Tenancy in common", "Joint tenancy", "Estate for years", "Tenancy at sufferance"],
      "b",
      "Joint tenancy (and in Florida, tenancy by the entireties for spouses) includes survivorship so a deceased co-owner's interest passes to the survivor(s).",
      {
        a: "Tenancy in common has no automatic survivorship; interests pass by will/intestacy.",
        c: "Estate for years is a leasehold for a fixed term.",
        d: "Tenancy at sufferance is wrongful holdover after lease expiration.",
      },
      "easy",
    ],
    [
      "A purchase contract contingent on the buyer obtaining financing is best described as:",
      [
        "An illegal wagering contract",
        "A conditional contract that may be terminated if the contingency is not met as written",
        "An executed deed",
        "A listing exclusive right to sell",
      ],
      "b",
      "Financing contingencies make the buyer's duty to close conditional; if financing is not obtained per the clause, the buyer may typically terminate under the contract terms.",
      {
        a: "Financing contingencies are standard and lawful when properly drafted.",
        c: "A deed is the conveyance instrument, not the purchase contract.",
        d: "A listing employs a broker; it is not the buyer-seller purchase agreement.",
      },
      "medium",
    ],
  ],
  "finance-appraisal": [
    [
      "Loan-to-value (LTV) ratio is calculated as:",
      [
        "Monthly payment divided by income",
        "Loan amount divided by appraised value (or sale price if lower, depending on lender rules)",
        "Taxes divided by assessed value",
        "Equity divided by interest rate",
      ],
      "b",
      "LTV compares the mortgage amount to the property's value (often the lesser of sale price or appraised value).",
      {
        a: "That describes a payment-to-income concept, not LTV.",
        c: "That relates to effective tax rate concepts, not LTV.",
        d: "Equity and rate are not the LTV formula.",
      },
      "easy",
    ],
    [
      "Which federal law requires lenders to provide a Loan Estimate and Closing Disclosure for most closed-end residential mortgages?",
      ["Fair Housing Act", "TILA-RESPA Integrated Disclosure (TRID) rules", "Sherman Antitrust Act", "Statute of Frauds"],
      "b",
      "TRID (TILA-RESPA Integrated Disclosure) requires the Loan Estimate and Closing Disclosure timing and content for covered mortgage transactions.",
      {
        a: "Fair Housing addresses discrimination in housing, not LE/CD forms.",
        c: "Sherman is antitrust law.",
        d: "The Statute of Frauds concerns which contracts must be in writing.",
      },
      "medium",
    ],
    [
      "In the sales comparison approach, an appraiser adjusts:",
      [
        "The subject property's sale price after closing",
        "Comparable sales to make them more like the subject",
        "Only the tax assessment",
        "The borrower's credit score",
      ],
      "b",
      "Appraisers adjust comparable sales (not the subject) for differences so indicated values reflect the subject's characteristics.",
      {
        a: "The subject's price is not adjusted in the appraisal process this way.",
        c: "Assessments are a different valuation system.",
        d: "Credit scores affect lending, not sales comparison adjustments.",
      },
      "easy",
    ],
    [
      "A point on a mortgage loan typically equals:",
      ["1% of the property's appraised value", "1% of the loan amount", "$1,000 regardless of loan size", "1% of the down payment"],
      "b",
      "One discount or origination point equals one percent of the loan amount.",
      {
        a: "Points are based on the loan, not the appraisal alone.",
        c: "Points scale with the loan size.",
        d: "Down payment percentage is not the definition of a point.",
      },
      "easy",
    ],
    [
      "Which statement about FHA loans is most accurate?",
      [
        "FHA loans are made directly by HUD to all borrowers without lenders",
        "FHA insures loans made by approved lenders meeting FHA guidelines",
        "FHA prohibits any down payment under all programs",
        "FHA loans may only finance commercial warehouses",
      ],
      "b",
      "FHA mortgage insurance protects approved lenders on qualifying loans; FHA generally does not lend the money itself for standard forward mortgages.",
      {
        a: "Approved private lenders originate FHA-insured loans.",
        c: "FHA programs typically require a minimum investment/down payment.",
        d: "FHA primarily supports residential housing finance.",
      },
      "medium",
    ],
    [
      "If a property produces $24,000 annual NOI and the capitalization rate is 8%, the indicated value by direct capitalization is:",
      ["$192,000", "$300,000", "$240,000", "$48,000"],
      "b",
      "Value = NOI / cap rate = 24,000 / 0.08 = $300,000.",
      {
        a: "$192,000 would imply an incorrect rate or NOI relationship.",
        c: "$240,000 equals 24,000 / 0.10, not 8%.",
        d: "$48,000 is roughly two years of NOI, not capitalized value.",
      },
      "medium",
    ],
    [
      "PITI on a residential mortgage typically includes:",
      [
        "Price, Interest, Taxes, Inventory",
        "Principal, Interest, Taxes, Insurance",
        "Points, Income, Title, Inspection",
        "Premium, Index, Term, Inflation",
      ],
      "b",
      "PITI means principal, interest, taxes, and insurance—the common housing payment components lenders underwrite.",
      {
        a: "Those terms are not the PITI acronym.",
        c: "Those are transaction costs/items, not PITI.",
        d: "Those terms do not define PITI.",
      },
      "easy",
    ],
    [
      "Which appraisal principle states that value is influenced by the cost to acquire an equally desirable substitute?",
      ["Contribution", "Substitution", "Anticipation", "Conformity"],
      "b",
      "The principle of substitution holds that a buyer will not pay more than the cost of an equally desirable alternative.",
      {
        a: "Contribution addresses how a component adds to overall value.",
        c: "Anticipation relates to expected future benefits.",
        d: "Conformity concerns harmony with surroundings.",
      },
      "medium",
    ],
    [
      "Truth in Lending (Regulation Z) primarily requires disclosure of:",
      [
        "The property's assessed value to the tax collector",
        "Credit terms such as APR and finance charges to consumers",
        "Broker commission splits to FREC",
        "HOA bylaws to tenants",
      ],
      "b",
      "TILA/Reg Z focuses on meaningful disclosure of consumer credit costs and terms, including APR.",
      {
        a: "Tax assessment disclosures are separate from TILA.",
        c: "Commission splits are brokerage/compensation issues, not TILA's core.",
        d: "HOA documents are association disclosures, not Reg Z credit disclosures.",
      },
      "medium",
    ],
    [
      "Negative amortization occurs when:",
      [
        "The borrower pays extra principal each month",
        "Scheduled payments do not cover accruing interest, so unpaid interest is added to principal",
        "The loan balance declines faster than amortization tables",
        "Taxes are escrowed by the lender",
      ],
      "b",
      "Negative amortization means the loan balance rises because payments are insufficient to cover interest due.",
      {
        a: "Extra principal payments reduce balance (positive amortization).",
        c: "Faster balance decline is stronger positive amortization.",
        d: "Escrowing taxes does not define negative amortization.",
      },
      "hard",
    ],
  ],
  "property-practice": [
    [
      "Florida's homestead tax exemption generally applies to:",
      [
        "Any vacant investment lot owned by a corporation",
        "A permanent residence owned by a natural person who qualifies and files timely",
        "Commercial office towers only",
        "Timeshare weeks held solely for rental",
      ],
      "b",
      "Florida homestead benefits (including tax exemption and certain creditor protections) apply to a qualifying owner's permanent residence when requirements are met.",
      {
        a: "Vacant investment land typically does not qualify as homestead residence.",
        c: "Commercial property is not a homestead residence.",
        d: "Pure investment timeshares generally are not homestead residences.",
      },
      "medium",
    ],
    [
      "Which brokerage relationship in Florida requires written disclosure in residential sales as specified by statute?",
      [
        "Transaction broker, single agent, and no brokerage relationship disclosures when required",
        "Only oral agreements with no paperwork ever",
        "Federal MLS membership cards",
        "Title insurance binders only",
      ],
      "a",
      "Florida's brokerage relationship disclosure law requires specific written disclosures for residential transactions depending on the relationship chosen (transaction broker is presumed in many cases, with disclosure rules).",
      {
        b: "Written disclosures are required in covered residential situations.",
        c: "MLS membership is not the statutory disclosure form.",
        d: "Title binders are closing documents, not brokerage relationship disclosures.",
      },
      "hard",
    ],
    [
      "Steering in fair housing means:",
      [
        "Guiding buyers toward or away from neighborhoods based on protected class",
        "Calculating prorations at closing",
        "Recording a deed after closing",
        "Ordering a survey",
      ],
      "a",
      "Steering is illegally channeling prospects to or from areas because of race, color, religion, sex, disability, familial status, or national origin (and other protected bases under applicable law).",
      {
        b: "Prorations are closing math, not steering.",
        c: "Recording is a title/closing step.",
        d: "Surveys measure boundaries; they are not steering.",
      },
      "easy",
    ],
    [
      "A property manager's primary duty is to:",
      [
        "Maximize the owner's objectives while complying with law and the management agreement",
        "Always fill units below market to help friends",
        "Ignore fair housing to rent faster",
        "Spend reserve funds without authorization",
      ],
      "a",
      "Property managers act as agents for owners: protect the property, maintain income, and follow the management contract and applicable law.",
      {
        b: "Undermarket leasing to friends can breach fiduciary duties.",
        c: "Fair housing compliance is mandatory.",
        d: "Unauthorized use of reserves violates agency and contract duties.",
      },
      "easy",
    ],
    [
      "Which best describes a fixture?",
      [
        "Personal property that has been annexed to realty so it becomes part of the real property",
        "A free-standing refrigerator always personal property with no exceptions",
        "An easement appurtenant",
        "A promissory note",
      ],
      "a",
      "Fixtures are items once personal property that become real property by attachment/intent/adaptation/agreement tests.",
      {
        b: "Appliances can be fixtures or personalty depending on facts and agreement.",
        c: "Easements are interests in land use, not fixtures.",
        d: "A note is personal property evidence of debt.",
      },
      "medium",
    ],
    [
      "Blockbusting refers to:",
      [
        "Inducing owners to sell by suggesting protected-class entry will lower values",
        "Building a retaining wall on a lot line",
        "Using a lockbox on a listing",
        "Prorating HOA dues",
      ],
      "a",
      "Blockbusting (panic peddling) is illegally pressuring owners to sell based on fear of demographic change involving protected classes.",
      {
        b: "Construction/walls are physical improvements, not blockbusting.",
        c: "Lockboxes are access tools.",
        d: "HOA prorations are closing adjustments.",
      },
      "easy",
    ],
    [
      "In Florida, which statement about radon gas disclosure in residential sales is most accurate?",
      [
        "Radon disclosure is never required",
        "Florida requires a radon gas disclosure statement on real estate contracts/leases as specified by statute",
        "Radon disclosure replaces the need for a deed",
        "Only commercial warehouses need radon notices",
      ],
      "b",
      "Florida law requires a specific radon disclosure notice in contracts for sale and lease of buildings.",
      {
        a: "Florida does require radon disclosure language.",
        c: "Disclosure does not convey title.",
        d: "The statutory notice applies to buildings generally as specified, not only warehouses.",
      },
      "medium",
    ],
    [
      "An exclusive-right-of-sale listing generally means:",
      [
        "The seller may avoid paying any commission even if the broker procures the buyer",
        "The listing broker is owed a commission if the property sells during the term, regardless of who finds the buyer (per the agreement)",
        "Any broker in the MLS automatically becomes the seller's single agent",
        "The listing is illegal in Florida",
      ],
      "b",
      "Under an exclusive-right-of-sale (exclusive right to sell) listing, the broker typically earns a commission if a sale occurs during the listing term, even if the seller finds the buyer.",
      {
        a: "That describes a weaker open listing dynamic, not exclusive right.",
        c: "MLS participation does not automatically create single agency for all members.",
        d: "Exclusive right listings are standard and lawful when properly used.",
      },
      "medium",
    ],
    [
      "Which estate provides the greatest and most complete ownership interest?",
      ["Life estate", "Fee simple absolute", "Estate for years", "Tenancy at will"],
      "b",
      "Fee simple absolute is the fullest freehold estate: inheritable and of potentially infinite duration, subject to government powers.",
      {
        a: "A life estate ends at a measuring life.",
        c: "Estate for years is a leasehold for a fixed term.",
        d: "Tenancy at will is a terminable leasehold without a fixed ending date.",
      },
      "easy",
    ],
    [
      "A Florida broker advertising real estate must:",
      [
        "Omit the brokerage name to protect privacy",
        "Include the registered brokerage name as required and avoid misleading statements",
        "Use only handwritten yard signs with no phone numbers",
        "Advertise other brokers' exclusive listings as the broker's own without authorization",
      ],
      "b",
      "Florida advertising rules require clear identification of the brokerage and prohibit false, deceptive, or misleading advertising.",
      {
        a: "Omitting the brokerage name typically violates advertising rules.",
        c: "Phone numbers and professional formats are allowed; handwriting is not mandated.",
        d: "Advertising another's exclusive listing without authority is improper.",
      },
      "hard",
    ],
  ],
});

// ─── Texas Real Estate ───────────────────────────────────────────────────────
const tx = bank("tx-real-estate-readiness-check", {
  "license-law": [
    [
      "Which Texas agency administers real estate licensing and regulation?",
      [
        "Texas Department of Insurance only",
        "Texas Real Estate Commission (TREC)",
        "Federal Reserve Bank of Dallas",
        "Texas Association of Realtors alone",
      ],
      "b",
      "TREC administers The Real Estate License Act (TRELA), issues licenses, and adopts rules governing Texas real estate practice.",
      {
        a: "TDI regulates insurance, not real estate licenses.",
        c: "The Fed is a monetary authority, not a Texas licensing agency.",
        d: "Trade associations do not issue state licenses.",
      },
      "easy",
    ],
    [
      "Under TRELA, a person generally needs a license to:",
      [
        "Sell their own home as an owner",
        "Act as a real estate broker or sales agent for another for valuable consideration",
        "Give free legal advice as a licensed attorney",
        "Serve as a courthouse clerk recording deeds",
      ],
      "b",
      "TRELA requires licensure for brokerage activities performed for another for compensation, with statutory exemptions (owners, attorneys in practice, etc.).",
      {
        a: "Owners selling their own property are typically exempt.",
        c: "Attorneys acting as attorneys have exemptions for legal services.",
        d: "Recording clerks perform governmental functions, not brokerage.",
      },
      "medium",
    ],
    [
      "A Texas real estate sales agent may receive compensation from:",
      [
        "Any seller directly without broker involvement",
        "Only the agent's sponsoring broker (or as the broker directs per law/rules)",
        "Title companies as a referral kickback for steering loans",
        "Buyers in cash at the curb without disclosure",
      ],
      "b",
      "Sales agents may accept compensation only through their sponsoring broker, not directly from the public.",
      {
        a: "Direct seller payments to agents bypass required broker compensation channels.",
        c: "Illegal kickbacks violate RESPA and ethics/license rules.",
        d: "Undisclosed curb cash is improper compensation.",
      },
      "easy",
    ],
    [
      "TREC-promulgated contract forms are generally required to be used by license holders when:",
      [
        "A mandatory TREC form exists for that transaction type and no exception applies",
        "The parties prefer a napkin contract always",
        "Only commercial leases over 100 years",
        "Never; forms are optional decorations",
      ],
      "a",
      "When TREC has promulgated a mandatory form for a transaction, license holders must use it unless an exception applies (e.g., attorney-prepared forms, forms prepared by a property owner, or no mandatory form exists).",
      {
        b: "Informal writings risk noncompliance and enforceability issues.",
        c: "Promulgated residential forms are not limited to century leases.",
        d: "Mandatory forms are not optional when they apply.",
      },
      "medium",
    ],
    [
      "The Texas Real Estate Recovery Trust Account exists to:",
      [
        "Pay brokers' MLS fees",
        "Reimburse aggrieved persons who obtain judgments against license holders for certain misconduct when collection fails",
        "Fund political campaigns",
        "Guarantee property appreciation",
      ],
      "b",
      "The Recovery Trust Account provides limited compensation to consumers harmed by license holders after judgment and unsuccessful collection, subject to statutory limits.",
      {
        a: "MLS fees are private association costs.",
        c: "Trust accounts are not campaign funds.",
        d: "No program guarantees market gains.",
      },
      "medium",
    ],
    [
      "How long is an inactive Texas sales agent license typically kept before it expires if not renewed (standard renewal cycle concept)?",
      [
        "Licenses never expire in Texas",
        "Licenses are issued for a term and must be renewed; failure to renew leads to expiration",
        "Licenses last exactly 30 days only",
        "Licenses renew automatically every weekend",
      ],
      "b",
      "Texas real estate licenses are issued for a set term and must be renewed with education and fees; nonrenewal results in expiration.",
      {
        a: "Texas licenses do expire if not renewed.",
        c: "Thirty days is not the standard full license term.",
        d: "Weekly automatic renewal is false.",
      },
      "easy",
    ],
    [
      "A broker's responsibility for sponsored agents includes:",
      [
        "No supervision once the agent is licensed",
        "Reasonable supervision and training consistent with TREC rules and brokerage policies",
        "Allowing agents to run separate brokerages under the same license",
        "Prohibiting agents from using promulgated forms",
      ],
      "b",
      "Sponsoring brokers must supervise agents, maintain policies, and ensure compliance with TRELA and TREC rules.",
      {
        a: "Brokers remain responsible for sponsored agents' regulated acts.",
        c: "Agents practice under the broker; they are not independent brokers on that license.",
        d: "Brokers must ensure proper use of required forms, not ban them.",
      },
      "medium",
    ],
    [
      "Which statement about Texas intermediary practice is most accurate?",
      [
        "A broker may act as intermediary with written consent and appoint license holders if the broker chooses appointments under the rules",
        "Intermediary status allows undisclosed dual agency with no consent",
        "Intermediary is illegal in all Texas transactions",
        "Only unlicensed assistants may be intermediaries",
      ],
      "a",
      "Texas uses intermediary brokerage (not traditional dual agency). With written consent, a broker may act as intermediary and may appoint associated license holders to each party.",
      {
        b: "Consent and disclosure are required; undisclosed dual representation is improper.",
        c: "Intermediary is a recognized statutory relationship.",
        d: "Unlicensed assistants cannot act as intermediaries.",
      },
      "hard",
    ],
    [
      "Canvassing for listings by telephone in Texas must comply with:",
      [
        "No laws whatsoever",
        "Do-Not-Call and related telemarketing rules as applicable, plus license advertising standards",
        "Only HOA architectural guidelines",
        "IRS depreciation schedules",
      ],
      "b",
      "License holders must follow federal/state telemarketing and Do-Not-Call restrictions and TREC advertising rules when soliciting.",
      {
        a: "Telemarketing is regulated.",
        c: "HOA rules do not replace telemarketing law.",
        d: "Tax depreciation is unrelated to solicitation calls.",
      },
      "medium",
    ],
    [
      "An unlicensed assistant in Texas generally may:",
      [
        "Negotiate offers and explain contract contingencies to buyers",
        "Perform administrative tasks such as scheduling and placing signs if not engaging in brokerage",
        "Show properties and answer questions about financing options as the main advisor",
        "Host open houses alone and discuss price strategy",
      ],
      "b",
      "Unlicensed assistants may do clerical/administrative work but may not perform acts that require a license, such as negotiating, explaining contractual rights, or hosting activities that involve brokerage discussions.",
      {
        a: "Negotiation and contract advising require a license.",
        c: "Showing/advising on substantive terms is licensed activity.",
        d: "Open houses involving brokerage communications require a license holder.",
      },
      "hard",
    ],
  ],
  "contracts-agency": [
    [
      "In Texas residential sales using TREC forms, the earnest money is typically delivered to:",
      [
        "The listing agent's personal account",
        "The escrow/title company named in the contract (or as the contract directs)",
        "TREC headquarters in Austin as a filing fee",
        "The buyer's employer",
      ],
      "b",
      "TREC contracts usually provide for earnest money to be deposited with the escrow agent (often the title company) within the stated deadline.",
      {
        a: "Personal accounts are improper for earnest money.",
        c: "TREC does not hold earnest money as a filing fee.",
        d: "Employers are not escrow agents under the contract.",
      },
      "easy",
    ],
    [
      "A Texas seller's disclosure notice (Section 5.008) is generally required for:",
      [
        "Most sellers of single-family residences, with statutory exceptions",
        "Only commercial warehouses",
        "Never in Texas",
        "Federal land sales only",
      ],
      "a",
      "Texas Property Code §5.008 requires a seller's disclosure for many residential sales, with listed exceptions (e.g., certain court sales, new residences never lived in, etc.).",
      {
        b: "The statute targets residential disclosures, not warehouses.",
        c: "Disclosure is required in many residential sales.",
        d: "It is a Texas Property Code requirement for covered sales.",
      },
      "medium",
    ],
    [
      "Fiduciary duties of a Texas agent to a client typically include:",
      [
        "Obedience to illegal instructions",
        "Loyalty, confidentiality, accounting, and reasonable care, among other duties",
        "Guaranteeing the property will appraise",
        "Sharing the client's bottom line with the other party without consent",
      ],
      "b",
      "Agency duties include loyalty, confidentiality, disclosure, obedience (to lawful instructions), accounting, and reasonable care/diligence.",
      {
        a: "Agents must not follow illegal instructions.",
        c: "Agents do not guarantee appraisals.",
        d: "Confidential information such as price flexibility generally must not be disclosed without authorization.",
      },
      "easy",
    ],
    [
      "The effective date of a TREC residential contract is generally:",
      [
        "The date the first party signs only",
        "The date when the last party signs and communicates acceptance (final acceptance)",
        "Always the closing date",
        "The date earnest money is spent",
      ],
      "b",
      "The contract becomes effective when acceptance is complete—typically when the final party signs and acceptance is communicated as required.",
      {
        a: "One signature alone is usually an offer, not a binding contract.",
        c: "Closing is performance, not the effective date.",
        d: "Spending earnest money improperly does not set the effective date.",
      },
      "medium",
    ],
    [
      "An option fee under the TREC One to Four Family contract typically:",
      [
        "Creates an unrestricted right to terminate during the option period if paid and delivered as required",
        "Is illegal consideration",
        "Must equal 10% of the price",
        "Is paid to TREC",
      ],
      "a",
      "Payment of the option fee per the contract usually gives the buyer an unrestricted right to terminate within the option period.",
      {
        b: "Option fees are standard lawful consideration for the termination right.",
        c: "No fixed 10% statutory amount applies to the option fee.",
        d: "Option fees go to the seller (or as directed), not TREC.",
      },
      "medium",
    ],
    [
      "Which relationship is created when a broker represents only the buyer under a buyer representation agreement?",
      ["Intermediary without appointments only", "Buyer agency / buyer representation", "Subagency to the seller automatically", "Transaction coordinator as a principal"],
      "b",
      "A buyer representation agreement establishes the broker's agency relationship with the buyer as client.",
      {
        a: "Intermediary involves representing both sides through one broker.",
        c: "Buyer representation is not automatic subagency to the seller.",
        d: "Coordinators are not principals to the sale.",
      },
      "easy",
    ],
    [
      "A material fact that a Texas license holder knows about a property generally should be:",
      [
        "Concealed if it might reduce the price",
        "Disclosed to the parties as required by law and agency duties",
        "Told only to the title company after funding",
        "Posted anonymously on social media instead of disclosed in the transaction",
      ],
      "b",
      "License holders must disclose known material facts that could affect a reasonable buyer's decision, consistent with TRELA, TREC rules, and agency duties.",
      {
        a: "Concealment of material defects can be fraud or license violations.",
        c: "Post-funding notice is too late for informed consent.",
        d: "Social media is not a substitute for proper transactional disclosure.",
      },
      "medium",
    ],
    [
      "Assignment of a Texas real estate contract by the buyer:",
      [
        "Is always prohibited",
        "May be allowed or restricted depending on the contract terms and parties' agreement",
        "Automatically voids title insurance",
        "Requires FHA approval on every cash deal",
      ],
      "b",
      "Assignability depends on the contract language; many TREC forms allow assignment unless restricted, but parties may negotiate limits.",
      {
        a: "Blanket prohibition is incorrect unless the contract forbids assignment.",
        c: "Assignment alone does not automatically void title insurance.",
        d: "Cash deals are not universally subject to FHA assignment rules.",
      },
      "hard",
    ],
    [
      "The statute of frauds in Texas generally requires which real estate agreements to be in writing to be enforceable?",
      [
        "Contracts for the sale of real property",
        "Agreements to meet for coffee",
        "Oral month-to-month residential leases of any length always",
        "Handshake listing agreements for any duration without exception concepts",
      ],
      "a",
      "Agreements for the sale of real estate generally must be in writing and signed to be enforceable under the statute of frauds.",
      {
        b: "Social plans are not real estate conveyances.",
        c: "Short-term leases may have different writing rules; the classic SOF focus is sale contracts (and longer leases).",
        d: "Listing agreements also generally need writing for enforceability of commission claims under TRELA rules/practice.",
      },
      "medium",
    ],
    [
      "When must a Texas license holder provide the Information About Brokerage Services (IABS) notice?",
      [
        "Only after closing",
        "At the first substantive communication with a party about a specific property, as required by TREC rule",
        "Never if the person found the listing online",
        "Only to attorneys",
      ],
      "b",
      "TREC rules require delivery of the IABS notice at the first substantive communication with a party regarding a specific real property, with limited exceptions.",
      {
        a: "Post-closing is far too late.",
        c: "Online discovery does not eliminate the IABS duty when substantive communication occurs.",
        d: "IABS is for parties to a real estate transaction, not only attorneys.",
      },
      "hard",
    ],
  ],
  "finance-closing": [
    [
      "Proration of property taxes at a Texas closing typically means:",
      [
        "Ignoring taxes until the next leap year",
        "Allocating taxes between buyer and seller based on days of ownership in the tax year",
        "Charging all taxes to the broker",
        "Doubling the assessed value",
      ],
      "b",
      "Taxes are prorated so each party pays for the portion of the year they own the property, per the contract.",
      {
        a: "Taxes are addressed at closing via prorations/escrows.",
        c: "Brokers do not pay the parties' property taxes as a proration rule.",
        d: "Proration does not change assessed value.",
      },
      "easy",
    ],
    [
      "A Texas homestead generally offers which protection?",
      [
        "Unlimited exemption from all federal income tax",
        "Constitutional protections against forced sale for many debts, with important exceptions (taxes, purchase money, etc.)",
        "Automatic free title insurance",
        "Immunity from zoning laws",
      ],
      "b",
      "Texas homestead protections restrict forced sale for many creditor claims, subject to exceptions such as purchase-money liens, taxes, and certain other liens.",
      {
        a: "Homestead does not erase federal income tax liability.",
        c: "Title insurance is purchased, not automatic via homestead.",
        d: "Homestead does not override land-use regulation.",
      },
      "medium",
    ],
    [
      "Which document creates the borrower's personal promise to repay a mortgage loan?",
      ["Deed", "Promissory note", "Survey", "Appraisal"],
      "b",
      "The promissory note is the borrower's promise to pay; the deed of trust/mortgage secures that promise with the property.",
      {
        a: "A deed conveys title; it is not the repayment promise.",
        c: "A survey shows boundaries.",
        d: "An appraisal estimates value.",
      },
      "easy",
    ],
    [
      "In Texas, residential closings commonly use which security instrument?",
      ["Deed of trust", "Torrens certificate exclusively statewide", "Bill of sale for the land", "Quitclaim from the lender to itself"],
      "a",
      "Texas typically uses a deed of trust with a trustee and power of sale, rather than a judicial mortgage foreclosure process as the default structure.",
      {
        b: "Texas is not a statewide Torrens title registration system for ordinary closings.",
        c: "Bills of sale convey personal property, not land.",
        d: "That is not a standard security instrument structure.",
      },
      "medium",
    ],
    [
      "Prepaid interest collected at closing from the borrower usually covers:",
      [
        "Interest from funding/closing through the end of the month before the first full payment",
        "The entire 30-year interest total",
        "Only late fees",
        "HOA initiation fees always",
      ],
      "a",
      "Lenders often collect per diem interest from the funding date to month-end so the first payment is a full month of interest going forward.",
      {
        b: "Lifetime interest is not collected as prepaid interest at closing.",
        c: "Late fees arise from delinquency, not standard prepaid interest.",
        d: "HOA fees are separate charges when applicable.",
      },
      "medium",
    ],
    [
      "Private mortgage insurance (PMI) is commonly required when:",
      [
        "The borrower makes a small down payment on a conventional loan (e.g., LTV above about 80%)",
        "The loan is 100% cash with no mortgage",
        "The property is free and clear",
        "The seller pays all closing costs for a VA loan always",
      ],
      "a",
      "Conventional lenders typically require PMI when the borrower finances more than about 80% LTV.",
      {
        b: "Cash purchases have no mortgage and no PMI.",
        c: "Free-and-clear ownership has no loan to insure.",
        d: "VA loans use a funding fee structure, not conventional PMI rules.",
      },
      "easy",
    ],
    [
      "Which closing figure is the amount the buyer must bring (or receive) after credits and charges?",
      ["List price", "Cash to close / amount due from buyer", "Assessed value", "Gross living area"],
      "b",
      "The Closing Disclosure shows cash to close after summing purchase price, loan proceeds, prorations, and closing costs.",
      {
        a: "List price is marketing, not the settlement bottom line.",
        c: "Assessed value is for taxes.",
        d: "GLA is an appraisal measurement.",
      },
      "easy",
    ],
    [
      "RESPA Section 8 primarily prohibits:",
      [
        "Recording deeds",
        "Kickbacks and unearned fees for referrals of settlement services",
        "Use of surveys",
        "Owner financing of any kind",
      ],
      "b",
      "RESPA §8 bans giving or accepting kickbacks/unearned fees for referrals of real estate settlement services on covered loans.",
      {
        a: "Recording is a normal closing step.",
        c: "Surveys are legitimate services when charged properly.",
        d: "Owner financing is not banned by §8; kickbacks are.",
      },
      "medium",
    ],
    [
      "If a loan is amortized over 30 years with equal monthly payments of principal and interest, early payments primarily pay:",
      ["Mostly interest", "Mostly principal", "Only taxes", "Only PMI"],
      "a",
      "In standard amortization, early payments are interest-heavy; principal portion grows over time.",
      {
        b: "Principal dominance occurs later in the schedule.",
        c: "Taxes are separate escrow items if collected.",
        d: "PMI is a separate premium when required.",
      },
      "medium",
    ],
    [
      "A Texas title company acting as escrow agent generally:",
      [
        "May disburse funds only according to the contract and closing instructions",
        "May loan earnest money to the listing agent",
        "Owns the property until funding",
        "Sets the sales price",
      ],
      "a",
      "Escrow agents hold and disburse funds per written instructions and the contract; they do not unilaterally change deal terms.",
      {
        b: "Lending trust funds to agents is improper.",
        c: "Title companies do not take ownership as part of ordinary escrow.",
        d: "Price is set by the parties' contract.",
      },
      "hard",
    ],
  ],
  "property-practice": [
    [
      "Metes and bounds descriptions describe property by:",
      [
        "Lot and block only",
        "Distances (metes) and directions/boundaries (bounds) from a point of beginning",
        "Street address alone",
        "Zip code centroid",
      ],
      "b",
      "Metes and bounds uses courses and distances around the parcel from a point of beginning.",
      {
        a: "Lot and block is a recorded plat description method.",
        c: "Addresses are informal and insufficient as legal descriptions.",
        d: "Zip centroids do not describe parcels.",
      },
      "easy",
    ],
    [
      "An easement appurtenant:",
      [
        "Benefits a dominant estate and runs with the land",
        "Is always a personal license that ends when the user moves",
        "Transfers the fee simple title automatically",
        "Is the same as a mechanic's lien",
      ],
      "a",
      "An easement appurtenant benefits a dominant tenement and generally transfers with that land; the servient estate is burdened.",
      {
        b: "That describes a license more than an appurtenant easement.",
        c: "Easements are use rights, not fee transfers.",
        d: "Mechanic's liens secure unpaid labor/materials.",
      },
      "medium",
    ],
    [
      "Encroachment is best defined as:",
      [
        "A building or improvement that intrudes across a property boundary",
        "A recorded utility easement used as intended",
        "Paying taxes on time",
        "A zoning variance granted by the city",
      ],
      "a",
      "Encroachments are physical intrusions (fences, buildings, driveways) across boundary lines.",
      {
        b: "Proper easement use is authorized, not an encroachment.",
        c: "Tax payment is not encroachment.",
        d: "Variances authorize land use exceptions; they are not encroachments.",
      },
      "easy",
    ],
    [
      "Which freehold estate lasts for the lifetime of a specified person?",
      ["Fee simple absolute", "Life estate", "Estate for years", "Periodic tenancy"],
      "b",
      "A life estate endures for the life of the measuring life, then typically passes to a remainderman or reverts.",
      {
        a: "Fee simple is potentially perpetual.",
        c: "Estate for years is a leasehold with a fixed term.",
        d: "Periodic tenancy renews by periods until terminated.",
      },
      "easy",
    ],
    [
      "Community property in Texas generally means:",
      [
        "Property acquired by either spouse during marriage (with exceptions) is owned equally",
        "All property owned before marriage becomes community automatically on day one worldwide",
        "Children own half of every marital asset at birth",
        "Homestead always equals community property identically",
      ],
      "a",
      "Texas is a community property state: most property acquired during marriage is community, while separate property includes assets owned before marriage and certain gifts/inheritances.",
      {
        b: "Premarital separate property generally remains separate if properly maintained.",
        c: "Children do not automatically own marital assets.",
        d: "Homestead is a protection/residence concept distinct from community vs separate classification.",
      },
      "medium",
    ],
    [
      "Which land description system uses townships and sections?",
      ["Metes and bounds only", "Rectangular (government) survey system", "Street index only", "Assessor's sketch without legal description"],
      "b",
      "The rectangular survey system divides land into townships, sections, and aliquot parts.",
      {
        a: "Metes and bounds uses courses and distances.",
        c: "Street indexes are not legal surveys.",
        d: "Sketches alone are not the rectangular system.",
      },
      "medium",
    ],
    [
      "A latent defect is one that:",
      [
        "Is hidden and not discoverable by ordinary inspection",
        "Is painted bright orange on the front porch",
        "Appears only in the MLS remarks",
        "Is created solely by the appraisal",
      ],
      "a",
      "Latent defects are concealed problems that careful ordinary inspection would not reveal; patent defects are obvious.",
      {
        b: "Obvious conditions are patent, not latent.",
        c: "MLS remarks do not define latency.",
        d: "Appraisals do not create physical defects.",
      },
      "medium",
    ],
    [
      "Police power in real estate includes:",
      [
        "Zoning, building codes, and environmental regulations",
        "The right of a neighbor to take title by prescription only",
        "A broker's right to set interest rates",
        "IRS lien priority always over property taxes",
      ],
      "a",
      "Police power is the government's authority to regulate land use for health, safety, and welfare—zoning and codes are classic examples.",
      {
        b: "Prescriptive easements/adverse possession are private acquisition doctrines, not police power.",
        c: "Brokers do not set mortgage interest rates via police power.",
        d: "Tax lien priority is a separate legal topic.",
      },
      "easy",
    ],
    [
      "In property management, a security deposit in Texas residential leases:",
      [
        "May be kept forever without accounting regardless of damages",
        "Must be handled according to the lease and Property Code rules on refunds and deductions",
        "Belongs immediately to the property manager as a bonus",
        "Is illegal statewide",
      ],
      "b",
      "Texas residential landlords must follow Property Code requirements for deposit returns, itemized deductions, and timelines.",
      {
        a: "Unexplained retention can violate the Property Code.",
        c: "Deposits secure the landlord's claims; they are not manager bonuses.",
        d: "Security deposits are lawful when properly handled.",
      },
      "hard",
    ],
    [
      "Which practice violates fair housing law?",
      [
        "Refusing to rent to a family with children in a non-exempt property because of familial status",
        "Requiring all applicants to meet the same income criteria",
        "Documenting objective screening criteria applied consistently",
        "Providing reasonable accommodations for disabilities as required",
      ],
      "a",
      "Familial status is a protected class under the Fair Housing Act; refusing families with children in covered housing is discrimination (subject to limited exemptions such as housing for older persons).",
      {
        b: "Neutral, consistently applied income standards are generally lawful.",
        c: "Consistent documentation supports compliance.",
        d: "Reasonable accommodations are required for disability, not a violation.",
      },
      "medium",
    ],
  ],
});

// Continue in part 2 - CPC and MBLEx written to same file via append... wait, I'll include them in this same write.

// ─── AAPC CPC ────────────────────────────────────────────────────────────────
const cpc = bank("aapc-cpc-readiness-check", {
  "coding-guidelines": [
    [
      "ICD-10-CM codes are used primarily to report:",
      [
        "Physician work RVUs only",
        "Diagnoses and reasons for encounters",
        "Anesthesia time units",
        "Durable medical equipment fees exclusively",
      ],
      "b",
      "ICD-10-CM classifies diseases, injuries, symptoms, and other reasons for healthcare encounters—the diagnosis coding system.",
      {
        a: "RVUs relate to payment methodology, not ICD-10-CM's purpose.",
        c: "Anesthesia time is reported with anesthesia CPT rules, not ICD-10-CM.",
        d: "DME is often coded with HCPCS; ICD-10-CM still reports diagnoses.",
      },
      "easy",
    ],
    [
      "When coding outpatient encounters, which diagnosis coding principle is most accurate?",
      [
        "Code only uncertain diagnoses as if confirmed in the outpatient setting",
        "Do not code diagnoses documented as 'probable,' 'suspected,' or 'rule out' as if confirmed in outpatient coding; code conditions to the highest certainty documented",
        "Always code every historical condition as a current acute disease",
        "Code only the patient's ZIP code as the first-listed diagnosis",
      ],
      "b",
      "Outpatient ICD-10-CM guidelines generally prohibit coding uncertain diagnoses as confirmed; code to the highest degree of certainty (symptoms, signs, or confirmed conditions).",
      {
        a: "That approaches inpatient uncertain-diagnosis rules, not outpatient.",
        c: "History codes are used when relevant; they are not acute current disease codes.",
        d: "ZIP codes are demographic/address data, not ICD-10-CM diagnoses.",
      },
      "hard",
    ],
    [
      "CPT Category I codes primarily describe:",
      [
        "Emerging technologies only with temporary status",
        "Widely performed medical procedures and services",
        "External cause of injury only",
        "Place of service exclusively",
      ],
      "b",
      "Category I CPT codes represent established procedures and services meeting AMA criteria for widespread use.",
      {
        a: "Category III codes track emerging technology.",
        c: "External causes are ICD-10-CM V/W/X/Y codes.",
        d: "Place of service is a separate claim element.",
      },
      "easy",
    ],
    [
      "The ICD-10-CM Official Guidelines instruct coders to code to the highest level of:",
      ["Payment", "Specificity supported by the documentation", "Provider preference regardless of documentation", "Alphabetical index only without Tabular review"],
      "b",
      "Codes must be reported to the highest specificity justified by the medical record, using both Alphabetic Index and Tabular List.",
      {
        a: "Payment is not the specificity standard.",
        c: "Documentation—not preference alone—supports code selection.",
        d: "Guidelines require verification in the Tabular List.",
      },
      "medium",
    ],
    [
      "A combination code in ICD-10-CM is used when:",
      [
        "Two unrelated conditions must always be billed separately with modifiers",
        "A single code fully identifies the diagnostic statement (e.g., disease with associated manifestation)",
        "Only E/M services are reported",
        "Anesthesia is converted to surgery",
      ],
      "b",
      "Combination codes capture a condition and a related manifestation or etiology in one code when available and appropriate.",
      {
        a: "Combination coding reduces separate coding when one code suffices.",
        c: "E/M is CPT evaluation and management, not combination diagnosis logic.",
        d: "Anesthesia conversion is unrelated to diagnosis combination codes.",
      },
      "medium",
    ],
    [
      "Sequencing the principal/first-listed diagnosis should reflect:",
      [
        "The condition chiefly responsible for the encounter/admission per guidelines",
        "The highest-paying DRG always, regardless of documentation",
        "The alphabetically first code in the Index",
        "Any chronic history code listed first by default",
      ],
      "a",
      "First-listed/principal diagnosis selection follows Official Guidelines: the condition primarily responsible for services provided.",
      {
        b: "Coding for payment without clinical support is abusive.",
        c: "Alphabetical order does not determine sequencing.",
        d: "Chronic history is sequenced when relevant, not automatically first.",
      },
      "medium",
    ],
    [
      "CPT modifiers are used to:",
      [
        "Replace the need for any procedure code",
        "Indicate that a service was altered without changing the code's definition",
        "Report diagnoses instead of ICD-10-CM",
        "Increase RVUs automatically by 100%",
      ],
      "b",
      "Modifiers communicate circumstances (bilateral, multiple procedures, distinct services, etc.) that modify how a CPT/HCPCS service is interpreted for billing.",
      {
        a: "Modifiers accompany procedure codes; they do not replace them.",
        c: "Diagnoses remain ICD-10-CM.",
        d: "Modifiers do not universally double RVUs.",
      },
      "easy",
    ],
    [
      "NEC in ICD-10-CM Index notation generally means:",
      [
        "Not elsewhere classifiable — a more specific code is not available",
        "Never ever code",
        "New employee coder",
        "Nonessential modifier only",
      ],
      "a",
      "NEC indicates the Index points to a code for conditions not more specifically classified elsewhere.",
      {
        b: "NEC is a classification instruction, not a ban.",
        c: "Unrelated acronym expansion.",
        d: "Nonessential modifiers are a different Index concept (parentheses).",
      },
      "medium",
    ],
    [
      "When a patient has a current acute MI and also a history of an old MI, coding typically:",
      [
        "Ignores the acute MI",
        "Codes the acute MI as current and may use a history/personal history code for the old MI when appropriate",
        "Codes both as acute STEMI encounters",
        "Uses only an external cause code",
      ],
      "b",
      "Current acute myocardial infarction is coded as an acute condition; an old/healed MI is reported with the appropriate history or old MI code when documented and relevant.",
      {
        a: "The acute event drives the encounter coding.",
        c: "An old MI is not coded as a second acute STEMI.",
        d: "External cause codes do not replace diagnosis of MI.",
      },
      "hard",
    ],
    [
      "Which statement about laterality in ICD-10-CM is most accurate?",
      [
        "Laterality is never required",
        "When laterality is documented and codes distinguish side, report the side-specific code",
        "Always code bilateral when only left is documented",
        "Laterality applies only to CPT, never ICD-10-CM",
      ],
      "b",
      "Many ICD-10-CM codes specify right, left, or bilateral; documentation should support the most specific laterality code.",
      {
        a: "Laterality is frequently required for specificity.",
        c: "Coding bilateral without documentation is incorrect.",
        d: "ICD-10-CM includes extensive laterality.",
      },
      "easy",
    ],
  ],
  "evaluation-management": [
    [
      "Office/outpatient E/M level selection (AMA CPT guidelines for office visits) may be based on:",
      [
        "Medical decision making (MDM) or total time on the date of the encounter",
        "Only the number of diagnoses listed in the problem list forever",
        "Only the amount of the patient's copay",
        "Place of service 21 exclusively",
      ],
      "a",
      "For office/outpatient E/M, CPT allows leveling by MDM or by total time on the encounter date, per current CPT E/M guidelines.",
      {
        b: "Problem lists alone do not determine the level without MDM/time criteria.",
        c: "Copays are billing/collection, not leveling.",
        d: "POS 21 is inpatient hospital; office visits use outpatient POS.",
      },
      "medium",
    ],
    [
      "Medical decision making complexity considers which elements?",
      [
        "Number and complexity of problems, amount/complexity of data, and risk of complications/morbidity/mortality of management",
        "Only the font size of the note",
        "Only whether a nurse roomed the patient",
        "Only the patient's age in months",
      ],
      "a",
      "MDM is assessed via problems addressed, data reviewed/analyzed, and risk of management—aligned with CPT E/M MDM constructs.",
      {
        b: "Formatting is irrelevant to MDM.",
        c: "Rooming staff does not set MDM level.",
        d: "Age alone does not define MDM.",
      },
      "easy",
    ],
    [
      "A preventive medicine visit (well visit) is distinct from a problem-oriented E/M because it:",
      [
        "Always requires inpatient admission",
        "Focuses on age- and gender-appropriate comprehensive preventive evaluation rather than a problem-driven sick visit",
        "Cannot be coded for any patient over 18",
        "Is reported only with ICD-10-CM, never CPT",
      ],
      "b",
      "Preventive CPT codes describe routine preventive evaluation and counseling; problem E/M addresses illnesses/injuries.",
      {
        a: "Preventive visits are typically outpatient.",
        c: "Preventive codes exist across age ranges.",
        d: "Both CPT and ICD-10-CM are used.",
      },
      "medium",
    ],
    [
      "When a significant, separately identifiable E/M service is performed on the same day as a minor procedure, coding may require:",
      [
        "Modifier 25 on the E/M when criteria are met",
        "Deleting the procedure code always",
        "modifier 59 on every diagnosis",
        "Reporting only a consultation code from 1992 guidelines",
      ],
      "a",
      "Modifier 25 indicates a significant, separately identifiable E/M by the same physician on the same day as a procedure.",
      {
        b: "The procedure is still reported when performed.",
        c: "Modifier 59 applies to distinct procedural services, not diagnoses.",
        d: "Consultation coding rules vary by payer; this is not the universal answer.",
      },
      "medium",
    ],
    [
      "Critical care services are defined by:",
      [
        "Any hospitalist note written after midnight",
        "High-complexity decision making to assess, manipulate, and support vital system function in a critically ill/injured patient, with time-based coding rules",
        "Only outpatient clinic blood pressure checks",
        "Routine postoperative floor rounds without critical illness",
      ],
      "b",
      "Critical care CPT requires critical illness/injury and high-complexity decision making involving vital organ systems, reported by time when requirements are met.",
      {
        a: "Time of day alone does not define critical care.",
        c: "Routine outpatient vitals are not critical care.",
        d: "Routine postop care without critical illness is not critical care.",
      },
      "hard",
    ],
    [
      "Which statement about new vs established patients for office E/M is most accurate?",
      [
        "A new patient has not received professional services from the physician/group of the same specialty in the past three years",
        "Every patient seen twice in one day is new",
        "Established patients can never have E/M codes",
        "New patient status lasts forever",
      ],
      "a",
      "CPT defines a new patient as one who has not received face-to-face professional services from the physician or another physician of the same specialty/group within the prior three years.",
      {
        b: "Same-day revisits do not reset new patient status that way.",
        c: "Established patients use established office E/M codes.",
        d: "New status converts after a professional service within three years.",
      },
      "easy",
    ],
    [
      "Time-based office E/M coding includes which activities on the encounter date (when using time)?",
      [
        "Only face-to-face counseling after the visit day",
        "Total time personally spent by the physician/QHP on the date of the encounter, including prep and documentation that day per CPT",
        "Staff scheduling time from the prior month",
        "Only the patient's commute time",
      ],
      "b",
      "When leveling by time, CPT counts the physician/QHP's total time on the date of the encounter (including non-face-to-face work that day), not staff or prior-day time.",
      {
        a: "Time after the encounter date generally does not count for that visit's time.",
        c: "Staff scheduling is not physician total time.",
        d: "Patient travel is irrelevant.",
      },
      "medium",
    ],
    [
      "Observation care E/M codes are used when:",
      [
        "A patient is in outpatient observation status and the service meets observation E/M requirements",
        "A patient buys OTC medication at a pharmacy",
        "Only telehealth audio check-ins under one minute",
        "Anesthesia induction begins",
      ],
      "a",
      "Observation E/M codes apply to evaluation and management of patients under observation status per CPT instructions and payer policy.",
      {
        b: "Retail pharmacy purchases are not observation E/M.",
        c: "Brief check-ins have other code sets when covered.",
        d: "Anesthesia has its own coding.",
      },
      "medium",
    ],
    [
      "Split/shared visits in a facility setting generally involve:",
      [
        "A physician and a qualified NPP each performing a substantive portion, with reporting rules per CMS/payer policy",
        "Two patients sharing one chart number permanently",
        "Only dental hygienists billing critical care",
        "Coders inventing time without documentation",
      ],
      "a",
      "Split/shared E/M visits are those in which a physician and NPP in the same group both see the patient in a facility; billing follows current CMS/payer substantive portion rules.",
      {
        b: "Chart numbers are identity controls, not split/shared definitions.",
        c: "Dental hygienists are outside this E/M construct.",
        d: "Documentation must support services and time/MDM.",
      },
      "hard",
    ],
    [
      "Which element is NOT one of the three MDM elements in current office E/M guidelines?",
      [
        "Number and complexity of problems addressed",
        "Amount and/or complexity of data to be reviewed and analyzed",
        "Risk of complications and/or morbidity or mortality of patient management",
        "Number of family members in the waiting room",
      ],
      "d",
      "MDM uses problems, data, and risk. Waiting-room headcount is not an MDM element.",
      {
        a: "Problems addressed is an MDM element.",
        b: "Data is an MDM element.",
        c: "Risk is an MDM element.",
      },
      "easy",
    ],
  ],
  "surgery-anesthesia": [
    [
      "The surgical package (global surgery) typically includes:",
      [
        "Related preoperative visits after the decision for surgery, intraoperative service, and uncomplicated postoperative care for the global period",
        "All future unrelated surgeries for life",
        "Only the anesthesia professionally billed by the surgeon always",
        "Never any follow-up visits",
      ],
      "a",
      "Medicare/CPT global surgical concepts include the operation and related pre- and postop care within the global period, excluding unrelated services.",
      {
        b: "Unrelated future surgeries are separately reported.",
        c: "Anesthesia is usually separately reported by anesthesia providers.",
        d: "Routine related postop visits in the global period are typically included.",
      },
      "medium",
    ],
    [
      "Modifier 51 is used to indicate:",
      [
        "Bilateral procedure",
        "Multiple procedures performed at the same session by the same provider",
        "Staged procedure",
        "Decision for surgery",
      ],
      "b",
      "Modifier 51 reports multiple procedures at the same operative session (payer rules vary on whether it must be appended).",
      {
        a: "Bilateral is modifier 50.",
        c: "Staged/related procedures use modifier 58 in many cases.",
        d: "Decision for surgery relates to modifier 57 with E/M.",
      },
      "medium",
    ],
    [
      "Anesthesia coding base units plus time units generally reflect:",
      [
        "Only the diagnosis code count",
        "Procedure-specific base value plus anesthesia time, with physical status/qualifying circumstances when applicable",
        "Only the surgeon's RVUs",
        "Pathology specimen count",
      ],
      "b",
      "Professional anesthesia payment formulas use base units for the anesthesia code, time units, and may include physical status or qualifying circumstance units per payer rules.",
      {
        a: "Diagnoses support medical necessity; they are not anesthesia units.",
        c: "Surgeon RVUs are separate from anesthesia units.",
        d: "Pathology is separately coded.",
      },
      "medium",
    ],
    [
      "A separate procedure designated in CPT:",
      [
        "Is always paid in addition to a comprehensive procedure in the same area without review",
        "Is usually considered integral to a larger procedure when performed at the same site/session and not reported additionally unless criteria for separate reporting are met",
        "Cannot appear in the CPT book",
        "Means the service is experimental",
      ],
      "b",
      "CPT “separate procedure” designation means the service is normally a component of a more extensive procedure and is not separately reported in that context unless truly distinct.",
      {
        a: "Separate reporting requires distinct service criteria.",
        c: "These codes are printed with the parenthetical designation.",
        d: "Separate procedure ≠ experimental.",
      },
      "hard",
    ],
    [
      "Modifier 59 indicates:",
      [
        "A distinct procedural service not normally reported together",
        "Reduced services",
        "Assistant surgeon",
        "Repeat clinical diagnostic laboratory test",
      ],
      "a",
      "Modifier 59 (and X{EPSU} subsets for Medicare) identify distinct procedural services when criteria are met.",
      {
        b: "Reduced services is modifier 52.",
        c: "Assistant surgeon uses 80/81/82 or AS as applicable.",
        d: "Repeat labs use modifier 91.",
      },
      "easy",
    ],
    [
      "National Correct Coding Initiative (NCCI) edits primarily:",
      [
        "Assign ICD-10-CM codes automatically without documentation",
        "Identify code pairs that should not be billed together for the same beneficiary on the same date without an appropriate modifier",
        "Replace CPT entirely",
        "Set malpractice premium rates",
      ],
      "b",
      "NCCI PTP edits prevent improper coding combinations; modifiers may bypass edits only when clinically appropriate and allowed.",
      {
        a: "NCCI does not replace diagnosis coding from documentation.",
        c: "CPT remains the procedure code set.",
        d: "Malpractice rates are insurer/actuarial matters.",
      },
      "medium",
    ],
    [
      "An add-on code in CPT:",
      [
        "Is reported alone as a standalone primary procedure",
        "Is reported in addition to a primary code and is exempt from multiple-procedure reductions as designated",
        "Always requires modifier 51",
        "Is only used for radiology films",
      ],
      "b",
      "Add-on codes (often marked +) are additional services reported with a primary code and typically are not subject to modifier 51.",
      {
        a: "Add-ons are not primary standalone codes.",
        c: "Add-ons generally should not take 51.",
        d: "Add-ons exist across many sections, not only radiology.",
      },
      "easy",
    ],
    [
      "Physical status modifiers (P1–P6) are used in anesthesia to report:",
      [
        "The patient's ASA physical status classification",
        "The hospital's trauma level",
        "The coder's certification level",
        "Whether the claim is paper or electronic",
      ],
      "a",
      "Anesthesia physical status modifiers communicate ASA classification from a normal healthy patient (P1) to a declared brain-dead patient (P6).",
      {
        b: "Trauma designation is facility status, not P modifiers.",
        c: "Coder credentials are not P modifiers.",
        d: "Claim format is administrative, not physical status.",
      },
      "easy",
    ],
    [
      "When coding a laparoscopic procedure converted to open, the coder generally reports:",
      [
        "Only the laparoscopic code",
        "The open procedure code (and may append a conversion indicator/modifier per payer guidance when applicable)",
        "No procedure code",
        "Only an E/M new patient visit",
      ],
      "b",
      "If conversion to open occurs, coding typically follows the open procedure performed; some payers use specific modifiers/indicators for conversion.",
      {
        a: "Reporting only laparoscopic when completed open is incorrect.",
        c: "A performed surgery must be coded.",
        d: "E/M does not replace the surgical procedure code.",
      },
      "hard",
    ],
    [
      "Unbundling improperly means:",
      [
        "Reporting comprehensive and component codes separately to increase payment when one comprehensive code includes the components",
        "Using the correct combination code",
        "Following NCCI with appropriate modifiers",
        "Sequencing diagnoses per guidelines",
      ],
      "a",
      "Unbundling is the abusive practice of fragmenting services that should be reported with a single comprehensive code.",
      {
        b: "Proper combination/comprehensive coding is correct coding.",
        c: "Compliant NCCI use is not unbundling.",
        d: "Proper sequencing is required, not unbundling.",
      },
      "medium",
    ],
  ],
  "compliance-billing": [
    [
      "The False Claims Act targets:",
      [
        "Knowingly submitting false or fraudulent claims for payment to the government",
        "Honest coding mistakes corrected through timely repayment processes only as criminal intent always",
        "Patient satisfaction surveys",
        "State medical board CME hours",
      ],
      "a",
      "The FCA imposes liability for knowingly presenting false claims or causing false claims to be paid by the government.",
      {
        b: "Innocent errors differ from 'knowing' false claims; still, repayment obligations may exist.",
        c: "Surveys are quality tools, not FCA claims.",
        d: "CME is licensing education, not FCA subject matter.",
      },
      "easy",
    ],
    [
      "HCPCS Level II codes primarily report:",
      [
        "Physician surgical techniques only in CPT Category III",
        "Products, supplies, services, and certain drugs/DME not in CPT",
        "Only inpatient ICD procedure codes",
        "Only anesthesia base units",
      ],
      "b",
      "HCPCS Level II (A–V codes, etc.) covers supplies, DME, drugs, transportation, and other services outside CPT.",
      {
        a: "Physician procedures are mainly CPT Category I.",
        c: "Inpatient procedures use ICD-10-PCS.",
        d: "Anesthesia units are CPT anesthesia methodology.",
      },
      "easy",
    ],
    [
      "A National Provider Identifier (NPI) is:",
      [
        "A patient's Social Security number",
        "A unique identification number for covered healthcare providers under HIPAA",
        "A CPT modifier",
        "An ICD-10-CM chapter",
      ],
      "b",
      "NPIs uniquely identify providers on HIPAA standard transactions.",
      {
        a: "SSNs are not NPIs and should not be used as provider IDs on claims.",
        c: "Modifiers alter procedure reporting.",
        d: "ICD chapters organize diagnoses.",
      },
      "easy",
    ],
    [
      "Upcoding is best described as:",
      [
        "Selecting a code that reflects higher complexity/payment than documentation supports",
        "Choosing a more specific accurate code supported by the record",
        "Adding laterality when documented",
        "Using NCCI-associated modifiers correctly",
      ],
      "a",
      "Upcoding is reporting a higher-level or more expensive service than documented—an abusive billing practice.",
      {
        b: "Accurate specificity is correct coding, not upcoding.",
        c: "Documented laterality improves accuracy.",
        d: "Proper modifier use is compliance, not upcoding.",
      },
      "medium",
    ],
    [
      "Advance Beneficiary Notice (ABN) under Medicare is used to:",
      [
        "Notify a beneficiary that Medicare may deny a service as not reasonable and necessary, shifting potential financial liability if signed appropriately",
        "Enroll providers in PECOS automatically",
        "Replace the claim form",
        "Appeal an RAC finding without a denial",
      ],
      "a",
      "ABNs inform Medicare beneficiaries before receiving services that may not be covered, allowing liability transfer when rules are met.",
      {
        b: "PECOS is provider enrollment.",
        c: "Claims still use standard forms/EDI.",
        d: "Appeals follow denial/overpayment processes.",
      },
      "medium",
    ],
    [
      "HIPAA Privacy Rule primarily governs:",
      [
        "Protected health information use and disclosure",
        "Only the color of claim forms",
        "State property tax rates",
        "CPT copyright ownership by payers",
      ],
      "a",
      "The Privacy Rule sets standards for PHI use/disclosure and patient rights.",
      {
        b: "Form aesthetics are not Privacy Rule core.",
        c: "Tax rates are unrelated.",
        d: "CPT is AMA intellectual property; HIPAA is privacy/security/transactions.",
      },
      "easy",
    ],
    [
      "Medical necessity for coding/billing means:",
      [
        "Services are reasonable and necessary for diagnosis/treatment per coverage criteria and supported by documentation",
        "Any service a patient requests must be paid",
        "The most expensive option is always required",
        "Codes may be assigned without a provider order when convenient",
      ],
      "a",
      "Payers require that billed services be medically necessary and documented; LCD/NCD and clinical standards often guide coverage.",
      {
        b: "Patient request alone does not establish coverage.",
        c: "Costlier care is not automatically necessary.",
        d: "Orders/documentation requirements still apply.",
      },
      "medium",
    ],
    [
      "Which is an example of a compliance best practice?",
      [
        "Regular coding audits, policies, training, and a process to refund identified overpayments",
        "Incentives paid for the highest code level regardless of documentation",
        "Destroying records immediately after each claim",
        "Sharing passwords among the billing team",
      ],
      "a",
      "Effective compliance programs include auditing, education, written policies, and prompt corrective action including repayments.",
      {
        b: "Volume/upcoding incentives create risk.",
        c: "Record retention laws require keeping records.",
        d: "Password sharing violates security practices.",
      },
      "easy",
    ],
    [
      "Place of service (POS) codes on professional claims identify:",
      [
        "Where the service was rendered (e.g., office, inpatient hospital, telehealth settings as applicable)",
        "The patient's home ZIP for marketing",
        "The ICD-10-CM seventh character only",
        "The anesthesia physical status",
      ],
      "a",
      "POS codes tell the payer the setting of the service, which affects payment and coverage rules.",
      {
        b: "POS is not a marketing ZIP field.",
        c: "Seventh characters are ICD-10-CM injury/episode concepts.",
        d: "Physical status uses anesthesia modifiers P1–P6.",
      },
      "medium",
    ],
    [
      "A Recovery Audit Contractor (RAC) primarily:",
      [
        "Identifies improper Medicare payments for recovery/correction",
        "Issues medical licenses to physicians",
        "Writes CPT new codes each month",
        "Sets malpractice jury awards",
      ],
      "a",
      "RACs review Medicare claims to detect overpayments and underpayments under CMS's audit programs.",
      {
        b: "State boards license physicians.",
        c: "AMA CPT Editorial Panel maintains CPT.",
        d: "Courts/juries handle malpractice awards.",
      },
      "hard",
    ],
  ],
});

// ─── MBLEx ───────────────────────────────────────────────────────────────────
const mblex = bank("mblex-readiness-check", {
  "anatomy-physiology": [
    [
      "Which tissue type contracts to produce movement?",
      ["Epithelial", "Muscle", "Nervous only without any muscle", "Adipose exclusively"],
      "b",
      "Muscle tissue is specialized for contraction, generating force and movement.",
      {
        a: "Epithelium covers/lines surfaces and forms glands.",
        c: "Nervous tissue conducts signals; it does not replace muscle contraction.",
        d: "Adipose stores fat and cushions; it does not contract like muscle.",
      },
      "easy",
    ],
    [
      "The sagittal plane divides the body into:",
      ["Anterior and posterior portions", "Superior and inferior portions", "Right and left portions", "Superficial and deep portions only"],
      "c",
      "A sagittal plane divides the body into right and left sections; the midsagittal plane is midline.",
      {
        a: "Frontal/coronal divides anterior/posterior.",
        b: "Transverse divides superior/inferior.",
        d: "Superficial/deep are directional terms, not a primary plane division.",
      },
      "easy",
    ],
    [
      "Which structure carries oxygenated blood from the lungs to the left atrium?",
      ["Superior vena cava", "Pulmonary veins", "Pulmonary arteries", "Coronary sinus only"],
      "b",
      "Pulmonary veins return oxygen-rich blood from the lungs to the left atrium.",
      {
        a: "SVC returns deoxygenated blood from the upper body to the right atrium.",
        c: "Pulmonary arteries carry deoxygenated blood to the lungs.",
        d: "Coronary sinus drains cardiac venous blood into the right atrium.",
      },
      "medium",
    ],
    [
      "A synapse is the site where:",
      [
        "A bone articulates with another bone",
        "A neuron communicates with another cell via neurotransmitters or electrical coupling",
        "Chyme enters the large intestine",
        "Filtration occurs in the glomerulus only by definition of synapse",
      ],
      "b",
      "Synapses are junctions where neurons transmit signals to neurons, muscle, or glands.",
      {
        a: "That describes a joint (articulation).",
        c: "That describes GI transit at the ileocecal region.",
        d: "Glomerular filtration is renal physiology, not a synapse.",
      },
      "medium",
    ],
    [
      "Which organelle is the primary site of ATP production via aerobic respiration?",
      ["Ribosome", "Mitochondrion", "Golgi apparatus", "Lysosome"],
      "b",
      "Mitochondria produce most ATP through oxidative phosphorylation.",
      {
        a: "Ribosomes synthesize proteins.",
        c: "Golgi modifies and packages proteins.",
        d: "Lysosomes digest materials with enzymes.",
      },
      "easy",
    ],
    [
      "The axial skeleton includes:",
      [
        "Skull, vertebral column, and thoracic cage",
        "Only the bones of the upper and lower limbs",
        "Only the pelvic and pectoral girdles",
        "Sesamoid bones of the hand exclusively",
      ],
      "a",
      "The axial skeleton forms the central axis: skull, vertebrae, ribs, and sternum.",
      {
        b: "Limb bones are appendicular.",
        c: "Girdles are appendicular.",
        d: "Sesamoids are typically appendicular (e.g., patella).",
      },
      "easy",
    ],
    [
      "Which hormone, produced by the pancreas, lowers blood glucose?",
      ["Glucagon", "Insulin", "Cortisol", "Epinephrine"],
      "b",
      "Insulin promotes cellular uptake of glucose and lowers blood glucose.",
      {
        a: "Glucagon raises blood glucose.",
        c: "Cortisol tends to increase blood glucose (stress hormone).",
        d: "Epinephrine elevates blood glucose as part of fight-or-flight.",
      },
      "medium",
    ],
    [
      "Dermatomes are best described as:",
      [
        "Areas of skin innervated by sensory fibers of a specific spinal nerve",
        "Layers of smooth muscle in arteries",
        "Lymph nodes in the axillary region only",
        "Tendon sheaths around the wrist",
      ],
      "a",
      "A dermatome is a cutaneous sensory territory of a single spinal nerve root—clinically important for nerve assessment.",
      {
        b: "Vessel muscle layers are tunics, not dermatomes.",
        c: "Lymph nodes are immune structures.",
        d: "Tendon sheaths reduce friction for tendons.",
      },
      "medium",
    ],
    [
      "During inhalation at rest, the diaphragm typically:",
      [
        "Contracts and moves inferiorly, increasing thoracic volume",
        "Relaxes and moves superiorly as the primary quiet-breathing action",
        "Stops all intercostal activity permanently",
        "Pumps lymph into the cisterna chyli",
      ],
      "a",
      "Diaphragm contraction flattens/descends the dome, expanding the thorax and drawing air in.",
      {
        b: "Relaxation and ascent occur during quiet exhalation.",
        c: "Intercostals assist; they are not permanently stopped.",
        d: "Lymph propulsion is not the diaphragm's primary respiratory role.",
      },
      "medium",
    ],
    [
      "Which connective tissue structure connects muscle to bone?",
      ["Ligament", "Tendon", "Bursa", "Meniscus"],
      "b",
      "Tendons attach muscle to bone; ligaments connect bone to bone.",
      {
        a: "Ligaments stabilize joints bone-to-bone.",
        c: "Bursae are synovial fluid sacs reducing friction.",
        d: "Menisci are fibrocartilage pads in some joints.",
      },
      "easy",
    ],
  ],
  "kinesiology": [
    [
      "Flexion of the elbow primarily occurs in which plane?",
      ["Frontal", "Sagittal", "Transverse", "Oblique coronal only"],
      "b",
      "Elbow flexion/extension occur in the sagittal plane around a mediolateral axis.",
      {
        a: "Frontal plane motions include abduction/adduction.",
        c: "Transverse plane includes rotation.",
        d: "Not the primary classification for elbow flexion.",
      },
      "easy",
    ],
    [
      "An isometric muscle contraction is one in which:",
      [
        "Muscle length stays essentially the same while tension develops",
        "The muscle shortens and moves a load (concentric)",
        "The muscle lengthens under load (eccentric)",
        "No motor units are ever recruited",
      ],
      "a",
      "Isometric contraction produces tension without appreciable change in muscle length (e.g., holding a position).",
      {
        b: "That describes concentric contraction.",
        c: "That describes eccentric contraction.",
        d: "Motor units are recruited to generate tension.",
      },
      "easy",
    ],
    [
      "The agonist (prime mover) for shoulder abduction includes which muscle?",
      ["Pectoralis major (sternal head only as sole abductor)", "Deltoid (especially middle fibers) and supraspinatus initiation", "Latissimus dorsi", "Pronator teres"],
      "b",
      "Supraspinatus initiates abduction; the middle deltoid is a prime abductor through much of the range.",
      {
        a: "Pectoralis major primarily adducts/flexes/internally rotates, not pure abduction.",
        c: "Latissimus dorsi adducts, extends, and internally rotates the humerus.",
        d: "Pronator teres acts at the forearm, not shoulder abduction.",
      },
      "medium",
    ],
    [
      "Lordosis refers to:",
      [
        "An exaggerated anterior curvature of the lumbar (or cervical) spine",
        "A lateral curvature of the spine",
        "A posterior thoracic hump only called scoliosis",
        "Fusion of the sacroiliac joint",
      ],
      "a",
      "Lordosis is increased anterior convexity, commonly discussed in the lumbar spine; kyphosis is posterior convexity; scoliosis is lateral curvature.",
      {
        b: "Lateral curvature is scoliosis.",
        c: "Thoracic posterior convexity relates to kyphosis; scoliosis is lateral.",
        d: "SI fusion is ankylosis/arthrodesis, not lordosis.",
      },
      "medium",
    ],
    [
      "Carpal tunnel syndrome involves compression of which nerve?",
      ["Radial nerve at the spiral groove", "Median nerve at the wrist", "Femoral nerve under the inguinal ligament", "Sciatic nerve at the popliteal fossa"],
      "b",
      "The median nerve passes through the carpal tunnel and is compressed in carpal tunnel syndrome.",
      {
        a: "Radial nerve compression at the spiral groove is a different neuropathy.",
        c: "Femoral nerve issues present in the thigh/anterior leg pattern.",
        d: "Sciatic pathology is typically buttock/posterior thigh related.",
      },
      "easy",
    ],
    [
      "A strain primarily injures:",
      ["Ligament", "Muscle or tendon", "Bone cortex only", "Epidermis only"],
      "b",
      "Strains involve muscle–tendon units; sprains involve ligaments.",
      {
        a: "Ligament injury is a sprain.",
        c: "Bone injury is fracture/contusion categories.",
        d: "Epidermal injury is a skin wound.",
      },
      "easy",
    ],
    [
      "Closed-chain exercise is characterized by:",
      [
        "The distal segment fixed against a surface (e.g., squat) while the proximal segment moves",
        "The distal segment moving freely in space (e.g., seated knee extension machine)",
        "No joint motion at all",
        "Only isometric holds of the eyelids",
      ],
      "a",
      "In closed kinetic chain movements, the distal end is stabilized (feet on floor in a squat).",
      {
        b: "That describes open-chain motion.",
        c: "Closed-chain exercises involve multi-joint motion.",
        d: "Irrelevant example.",
      },
      "medium",
    ],
    [
      "Inflammation is classically associated with which signs?",
      [
        "Rubor, calor, tumor, dolor (redness, heat, swelling, pain), and loss of function",
        "Only cyanosis without other changes",
        "Immediate scar maturation in one hour",
        "Complete absence of immune cell activity",
      ],
      "a",
      "Classic inflammatory signs are redness, heat, swelling, pain, and often impaired function.",
      {
        b: "Cyanosis indicates low oxygenated blood, not the classic inflammation tetrad.",
        c: "Scar maturation takes much longer.",
        d: "Immune cells are central to inflammation.",
      },
      "medium",
    ],
    [
      "The rotator cuff muscles include:",
      [
        "Supraspinatus, infraspinatus, teres minor, subscapularis",
        "Biceps brachii, brachialis, brachioradialis, coracobrachialis",
        "Gluteus maximus, medius, minimus, TFL only as cuff",
        "Erector spinae group only",
      ],
      "a",
      "SITS muscles stabilize the glenohumeral joint: supraspinatus, infraspinatus, teres minor, subscapularis.",
      {
        b: "Those are anterior arm flexors (and related), not the cuff.",
        c: "Those are hip abductors/extensors, not rotator cuff.",
        d: "Erector spinae extend the spine.",
      },
      "easy",
    ],
    [
      "Adhesive capsulitis (frozen shoulder) typically presents with:",
      [
        "Global restriction of active and passive glenohumeral motion, especially external rotation and abduction",
        "Hypermobile shoulder with recurrent voluntary dislocation only",
        "Isolated distal finger numbness without shoulder limits",
        "Painless full ROM with only skin rash",
      ],
      "a",
      "Frozen shoulder features progressive capsular tightness with limited active and passive ROM, classically ER and abduction.",
      {
        b: "Hypermobility/dislocation patterns suggest instability, not adhesive capsulitis.",
        c: "Isolated distal numbness suggests neuropathy more than frozen shoulder.",
        d: "Painful stiffness with ROM loss is typical, not painless full ROM.",
      },
      "hard",
    ],
  ],
  "assessment-treatment": [
    [
      "Before a massage session, obtaining informed consent primarily ensures:",
      [
        "The client understands proposed treatment, benefits, risks, and may agree or decline",
        "The therapist is paid in cash only",
        "SOAP notes are optional forever",
        "Contraindications can be ignored if the client insists quietly",
      ],
      "a",
      "Informed consent is an ethical/legal process of explaining care and obtaining voluntary agreement.",
      {
        b: "Payment method is separate from consent.",
        c: "Documentation remains a professional standard.",
        d: "Absolute contraindications are not overridden by quiet insistence.",
      },
      "easy",
    ],
    [
      "An absolute contraindication for local massage generally includes:",
      [
        "Well-healed scar tissue away from the treatment goal with clearance",
        "An area with known contagious skin infection or open wound",
        "Mild delayed-onset muscle soreness after exercise",
        "A client request for lighter pressure",
      ],
      "b",
      "Local massage over contagious lesions or open wounds risks spread/infection and tissue damage—typically avoided.",
      {
        a: "Healed scars may be treated carefully when appropriate.",
        c: "DOMS is often an indication for gentle work, not absolute contraindication.",
        d: "Pressure preference guides technique, not contraindication.",
      },
      "medium",
    ],
    [
      "SOAP documentation: the 'O' stands for:",
      ["Opinion", "Objective", "Optional", "Outcome only without findings"],
      "b",
      "SOAP = Subjective, Objective, Assessment, Plan. Objective includes measurable observations and findings.",
      {
        a: "Opinion is not the SOAP letter meaning.",
        c: "Optional is incorrect.",
        d: "Outcomes may appear in assessment/plan; O is objective data.",
      },
      "easy",
    ],
    [
      "Endangerment sites are areas where:",
      [
        "Deep or sustained pressure may risk nerves, vessels, or fragile structures",
        "Only bone is present with no soft tissue",
        "Massage is always illegal statewide",
        "Clients must stand during treatment",
      ],
      "a",
      "Endangerment sites (e.g., anterior neck, axilla, antecubital fossa) require caution due to superficial vessels/nerves/organs.",
      {
        b: "Soft tissue and neurovascular structures are precisely the concern.",
        c: "Cautious treatment may be possible; sites are not blanket illegal zones.",
        d: "Positioning is adapted; standing is not required.",
      },
      "medium",
    ],
    [
      "Effleurage is best described as:",
      [
        "Gliding strokes that warm tissue and spread lubricant",
        "Percussive tapping only",
        "Joint mobilization into the end-feel forcefully",
        "Needling of trigger points",
      ],
      "a",
      "Effleurage uses long gliding strokes for introduction, assessment, and transition—often with lubricant.",
      {
        b: "Percussion is tapotement.",
        c: "Forceful end-range joint work is not effleurage and may be outside scope.",
        d: "Needling is not classical massage effleurage.",
      },
      "easy",
    ],
    [
      "A client reports acute ankle sprain from yesterday with significant swelling and heat. The most appropriate immediate approach is:",
      [
        "Deep transverse friction over the injured ligaments today",
        "Avoid local massage to the acute injury; follow RICE/medical guidance and treat only appropriate proximal/compensatory areas if indicated",
        "Aggressive stretching into pain",
        "Hot pack directly on the swollen joint for 40 minutes",
      ],
      "b",
      "Acute inflammatory injuries are generally local contraindications for deep massage; protect the area and use appropriate acute-care principles.",
      {
        a: "Deep friction is inappropriate in acute high-inflammation phase.",
        c: "Aggressive painful stretch risks further injury.",
        d: "Heat can worsen acute swelling; cold is more typical acutely.",
      },
      "hard",
    ],
    [
      "Pétrissage techniques typically involve:",
      [
        "Kneading, lifting, and squeezing soft tissue",
        "Only static touch without movement",
        "High-velocity spinal thrusts",
        "Diagnostic imaging interpretation",
      ],
      "a",
      "Pétrissage includes kneading/squeezing/lifting strokes to mobilize deeper soft tissue.",
      {
        b: "Static touch may be holding/energetic approaches, not pétrissage.",
        c: "HVLA thrusts are chiropractic/osteopathic, generally outside massage scope.",
        d: "Imaging is a physician/radiology function.",
      },
      "easy",
    ],
    [
      "When assessing posture, a therapist notices increased thoracic kyphosis. A common soft-tissue focus might include:",
      [
        "Shortened pectorals and elongated/weak mid-scapular retractors as a common pattern to address within scope",
        "Prescribing opioid medication",
        "Ordering MRI without referral",
        "Ignoring breathing and scapular mobility entirely always",
      ],
      "a",
      "Upper crossed–type patterns often involve tight anterior chest muscles and stressed mid-back retractors; massage addresses soft tissue within scope while referring as needed.",
      {
        b: "Prescribing drugs is outside massage therapy scope.",
        c: "Ordering advanced imaging is not a massage therapist's role.",
        d: "Breathing and scapular mobility are relevant assessment considerations.",
      },
      "medium",
    ],
    [
      "Trigger point pressure release generally involves:",
      [
        "Sustained, tolerable pressure on a hyperirritable spot in taut band, often with client feedback",
        "Needling with acupuncture needles as required for all massage licenses",
        "Ignoring client pain signals to 'break through'",
        "Vigorous joint cracking as the primary method",
      ],
      "a",
      "Ischemic/pressure release applies measured pressure to myofascial trigger points with communication and appropriate dosage.",
      {
        b: "Dry needling/acupuncture requires specific credentials; not universal to massage licensure.",
        c: "Ignoring pain risks injury and violates consent.",
        d: "Joint cavitation is not the definition of trigger point release.",
      },
      "medium",
    ],
    [
      "A treatment plan should be based primarily on:",
      [
        "Assessment findings, client goals, contraindications, and scope of practice",
        "The therapist's favorite routine for every client identically",
        "Social media trends alone",
        "Guaranteed cure promises for systemic disease",
      ],
      "a",
      "Plans are individualized from assessment, goals, safety, and legal scope—not one-size routines or cure claims.",
      {
        b: "Identical routines ignore assessment.",
        c: "Trends are not clinical foundations.",
        d: "Cure promises for disease are unethical and often illegal.",
      },
      "easy",
    ],
  ],
  "ethics-business": [
    [
      "Dual relationships that may impair professional judgment should be:",
      [
        "Managed carefully or avoided when they risk exploitation or impaired objectivity",
        "Sought aggressively for marketing",
        "Required by law in all states",
        "Hidden from any supervision or ethics reflection",
      ],
      "a",
      "Ethics codes caution against dual relationships that could harm the client or cloud clinical judgment.",
      {
        b: "Pursuing risky dual relationships for sales is unethical.",
        c: "Dual relationships are not legally mandated.",
        d: "Ethical practice includes reflection and appropriate consultation.",
      },
      "medium",
    ],
    [
      "Client confidentiality means a massage therapist generally:",
      [
        "Does not disclose protected health/client information without authorization or legal requirement",
        "Posts full SOAP notes with names on public social media",
        "Discusses cases with friends for entertainment",
        "Sells client phone lists to advertisers",
      ],
      "a",
      "Confidentiality and privacy laws/ethics require safeguarding client information except with consent or legal mandate.",
      {
        b: "Public posting of identifiable clinical data is a serious breach.",
        c: "Gossip breaches confidentiality.",
        d: "Selling contact lists violates privacy and trust.",
      },
      "easy",
    ],
    [
      "Draping standards exist primarily to:",
      [
        "Maintain client privacy, warmth, and professional boundaries",
        "Increase laundry costs intentionally",
        "Allow nudity without consent as a therapy requirement",
        "Replace the need for informed consent",
      ],
      "a",
      "Professional draping protects modesty, comfort, and clear sexual/professional boundaries.",
      {
        b: "Cost is not the purpose.",
        c: "Consent and draping protect against inappropriate exposure.",
        d: "Draping complements, not replaces, consent.",
      },
      "easy",
    ],
    [
      "Practicing massage without a required state license is:",
      [
        "Illegal where licensure is mandated and can result in penalties",
        "Always allowed if the therapist took one weekend workshop",
        "Encouraged by FSMTB as a substitute for the MBLEx",
        "Only a concern for estheticians",
      ],
      "a",
      "Where states require licensure, unlicensed practice violates law and endangers the public.",
      {
        b: "Workshops do not replace statutory licensure.",
        c: "FSMTB administers MBLEx for licensure pathways; it does not endorse unlicensed practice.",
        d: "Massage practice laws apply to massage therapists.",
      },
      "easy",
    ],
    [
      "A sexual boundary violation by a therapist is:",
      [
        "Never acceptable; sexual activity with clients is prohibited",
        "Allowed if the client initiates after the third session",
        "Required for myofascial release",
        "Covered by charging an extra fee",
      ],
      "a",
      "Sexual contact with clients is unethical and often illegal; power imbalance precludes valid consent in the professional relationship.",
      {
        b: "Client initiation does not make it ethical.",
        c: "Clinical techniques do not require sexual contact.",
        d: "Fees cannot legitimize boundary violations.",
      },
      "easy",
    ],
    [
      "When a client's condition is outside the therapist's scope, the appropriate action is:",
      [
        "Refer to an appropriate licensed healthcare provider",
        "Diagnose the disease and prescribe medication",
        "Guarantee a medical cure with massage alone",
        "Continue deep work over an undiagnosed mass the client fears is cancer without referral",
      ],
      "a",
      "Referral/red-flag recognition protects clients; diagnosis and prescribing are outside massage scope.",
      {
        b: "Diagnosis/prescribing exceed massage therapy scope.",
        c: "Cure guarantees for medical disease are unethical.",
        d: "Suspicious masses require medical evaluation, not aggressive local work alone.",
      },
      "medium",
    ],
    [
      "Accurate business records for a massage practice should include:",
      [
        "Appointment logs, consents, SOAP notes, and financial records as required",
        "No records to maximize privacy by absence",
        "Only cash totals without client identifiers ever when treating injuries",
        "Fabricated CEU certificates",
      ],
      "a",
      "Professional and legal standards require documentation of care, consent, and business/tax records.",
      {
        b: "Lack of records harms continuity and legal defense.",
        c: "Clinical care documentation is still required.",
        d: "Falsifying CE is fraud.",
      },
      "medium",
    ],
    [
      "Transference in the therapeutic relationship refers to:",
      [
        "The client projecting feelings from past relationships onto the therapist",
        "Transferring a client file to a new clinic software only",
        "Moving lubricant from bottle to table",
        "A billing code change",
      ],
      "a",
      "Transference is a psychological dynamic where clients redirect emotions onto the practitioner; therapists must maintain boundaries.",
      {
        b: "File migration is administrative, not the psychodynamic term.",
        c: "Lubricant handling is technique logistics.",
        d: "Billing changes are administrative.",
      },
      "hard",
    ],
    [
      "Advertising massage services must avoid:",
      [
        "False, deceptive, or sexualized claims that misrepresent services",
        "Accurate statement of license number where required",
        "Clear listing of modalities offered",
        "Honest cancellation policy language",
      ],
      "a",
      "Truthful advertising is required; sexualized or misleading ads harm the profession and may violate regulations.",
      {
        b: "License disclosure is often required and appropriate.",
        c: "Clear modality lists help informed choice.",
        d: "Clear policies are good practice.",
      },
      "medium",
    ],
    [
      "Continuing education for licensed massage therapists is important because:",
      [
        "It maintains competence and often fulfills renewal requirements",
        "It permanently replaces the need for licensure",
        "It allows diagnosing medical conditions independently in all states",
        "It is illegal in most jurisdictions",
      ],
      "a",
      "CE keeps skills current and is commonly required for license renewal.",
      {
        b: "CE supplements licensure; it does not replace it.",
        c: "CE does not expand scope to medical diagnosis universally.",
        d: "CE is widely required, not illegal.",
      },
      "easy",
    ],
  ],
});

function validate(name, questions) {
  if (questions.length !== 40) throw new Error(`${name}: length ${questions.length}`);
  const byTopic = {};
  const answers = { a: 0, b: 0, c: 0, d: 0 };
  for (const qn of questions) {
    byTopic[qn.topicId] = (byTopic[qn.topicId] || 0) + 1;
    answers[qn.correctOptionId]++;
    if (qn.options.length !== 4) throw new Error(`${qn.id}: options`);
    if (!["a", "b", "c", "d"].includes(qn.correctOptionId)) throw new Error(`${qn.id}: correct`);
    const wrongKeys = Object.keys(qn.distractorExplanations);
    if (wrongKeys.includes(qn.correctOptionId)) throw new Error(`${qn.id}: distractor has correct`);
    if (wrongKeys.length !== 3) throw new Error(`${qn.id}: need 3 distractors`);
    if (qn.sourceNote !== SOURCE) throw new Error(`${qn.id}: sourceNote`);
  }
  for (const [t, n] of Object.entries(byTopic)) {
    if (n !== 10) throw new Error(`${name}/${t}: ${n}`);
  }
  console.log(name, { length: questions.length, byTopic, answers });
}

validate("fl-real-estate-readiness-check", fl);
validate("tx-real-estate-readiness-check", tx);
validate("aapc-cpc-readiness-check", cpc);
validate("mblex-readiness-check", mblex);

for (const [slug, data] of [
  ["fl-real-estate-readiness-check", fl],
  ["tx-real-estate-readiness-check", tx],
  ["aapc-cpc-readiness-check", cpc],
  ["mblex-readiness-check", mblex],
]) {
  fs.writeFileSync(path.join(OUT, `${slug}.json`), JSON.stringify(data, null, 2) + "\n");
}
console.log("Wrote all 4 banks to", OUT);
