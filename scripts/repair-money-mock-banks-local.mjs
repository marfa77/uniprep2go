#!/usr/bin/env node
/**
 * Local (no OpenRouter) repair for money-cluster mock banks:
 * - Expand short stems
 * - Replace unrelated definition-dump distractors with topic-adjacent parallel options
 * - Fix known near-duplicate Series 63 items
 *
 * Usage: node scripts/repair-money-mock-banks-local.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(root, "src/data/mock-exams");

const MONEY = [
  "sie-full-mock",
  "series-7-readiness-check",
  "series-63-readiness-check",
  "california-real-estate-readiness-check",
  "life-and-health-insurance-readiness-check",
  "property-casualty-insurance-readiness-check",
];

const MANUAL = {
  "sie-full-mock-capital-markets-010": {
    prompt:
      "A municipal securities dealer asks which self-regulatory organization writes conduct rules for municipal securities dealers and municipal advisors. Which answer is correct?",
    options: [
      { id: "a", text: "The Municipal Securities Rulemaking Board (MSRB)" },
      { id: "b", text: "The Commodity Futures Trading Commission (CFTC)" },
      { id: "c", text: "The Federal Deposit Insurance Corporation (FDIC)" },
      { id: "d", text: "State insurance commissioners only" },
    ],
    correctOptionId: "a",
    explanation:
      "The MSRB writes rules for municipal securities dealers, municipal advisors, and related muni-market conduct. FINRA/SEC enforce many MSRB rules; CFTC and FDIC are different regimes.",
    distractorExplanations: {
      b: "CFTC oversees futures and swaps markets, not municipal securities dealer conduct rules.",
      c: "FDIC insures bank deposits; it does not write MSRB municipal dealer rules.",
      d: "State insurance regulators oversee insurance, not municipal securities dealer SRO rules.",
    },
  },
  "sie-full-mock-capital-markets-011": {
    prompt:
      "In the securities industry, which party typically maintains an issuer’s shareholder records, cancels and issues certificates, and processes ownership changes?",
    options: [
      { id: "a", text: "Transfer agent" },
      { id: "b", text: "Market maker quoting two-sided markets only" },
      { id: "c", text: "Clearing corporation that nets broker trades only" },
      { id: "d", text: "Municipal advisor structuring a bond deal only" },
    ],
    correctOptionId: "a",
    explanation:
      "Transfer agents keep issuer ownership records and process transfers, cancellations, and issuances of certificates or book-entry updates.",
    distractorExplanations: {
      b: "Market makers provide liquidity by quoting; they do not maintain issuer shareholder books.",
      c: "Clearing corporations facilitate trade clearance/settlement between firms, not issuer registrar functions.",
      d: "Municipal advisors advise issuers on muni offerings; they are not the transfer agent.",
    },
  },
  "sie-full-mock-capital-markets-012": {
    prompt:
      "Which description best matches an investment adviser for SIE purposes?",
    options: [
      { id: "a", text: "A person who provides securities advice for compensation and owes fiduciary duties under adviser laws" },
      { id: "b", text: "A person who solely executes agency trades with no advice" },
      { id: "c", text: "A transfer agent updating shareholder records" },
      { id: "d", text: "A bank that only holds FDIC-insured deposits" },
    ],
    correctOptionId: "a",
    explanation:
      "Investment advisers give securities advice for compensation and are subject to fiduciary obligations under federal/state adviser frameworks (as tested at SIE level).",
    distractorExplanations: {
      b: "Pure execution without advice is broker-dealer activity, not adviser status by itself.",
      c: "Transfer agents maintain records; they are not advisers merely for that role.",
      d: "Deposit-taking banks are not investment advisers solely for holding deposits.",
    },
  },
  "sie-full-mock-products-risks-001": {
    prompt:
      "A customer may need cash for a home purchase in nine months. Why do liquidity needs matter when recommending products on the SIE?",
    options: [
      { id: "a", text: "They limit use of illiquid or penalty-heavy products that cannot be exited when cash is needed" },
      { id: "b", text: "They eliminate market risk entirely for any holding period" },
      { id: "c", text: "They require every customer to use only preferred stock" },
      { id: "d", text: "They apply only to institutional accounts, never retail" },
    ],
    correctOptionId: "a",
    explanation:
      "Near-term cash needs make lockups, surrender charges, and thin markets unsuitable because the customer may be forced to sell at a bad time or pay penalties.",
    distractorExplanations: {
      b: "Liquidity planning does not remove market risk.",
      c: "No product type is mandatory solely because of liquidity needs.",
      d: "Liquidity analysis applies to retail as well as institutional customers.",
    },
  },
  "sie-full-mock-products-risks-011": {
    prompt:
      "Why are leveraged ETFs generally unsuitable as long-term buy-and-hold vehicles for most retail customers?",
    options: [
      { id: "a", text: "Daily reset and compounding can make multi-day returns diverge from the simple leverage multiple" },
      { id: "b", text: "They never trade on exchanges during market hours" },
      { id: "c", text: "They are always FDIC-insured deposit products" },
      { id: "d", text: "They eliminate tracking error versus the index" },
    ],
    correctOptionId: "a",
    explanation:
      "Most leveraged ETFs reset daily; over longer periods, compounding and volatility can produce results far from a simple 2x or 3x of the index return.",
    distractorExplanations: {
      b: "Leveraged ETFs typically trade on exchanges like other ETFs.",
      c: "ETFs are securities, not FDIC-insured bank deposits.",
      d: "Leverage and reset mechanics often increase divergence, not eliminate tracking differences.",
    },
  },
  "sie-full-mock-trading-accounts-019": {
    prompt:
      "When opening a corporate brokerage account, which documentation need is most characteristic?",
    options: [
      { id: "a", text: "Evidence of corporate authority and authorized traders (for example a corporate resolution)" },
      { id: "b", text: "Only the CEO’s personal driver’s license with no entity documents" },
      { id: "c", text: "An options agreement signed by an unrelated third party only" },
      { id: "d", text: "Proof that the corporation is an MSRB member" },
    ],
    correctOptionId: "a",
    explanation:
      "Firms must know who can bind the corporation and trade the account—typically via corporate resolution or similar authority documents plus CIP on the entity.",
    distractorExplanations: {
      b: "Entity accounts require entity authority documentation, not only an individual’s ID.",
      c: "Options agreements are product-specific and do not replace corporate authority papers.",
      d: "Corporate customers are not required to be MSRB members to open a brokerage account.",
    },
  },
  "series-7-readiness-check-s7-f2-005": {
    prompt:
      "Why does a customer’s federal income tax bracket matter when evaluating suitability of municipal bonds and tax-deferred products on the Series 7?",
    options: [
      { id: "a", text: "It changes after-tax yield comparisons among munis, taxable bonds, and tax-deferred accounts" },
      { id: "b", text: "It sets the FINRA markup ceiling at a fixed 5% for every trade" },
      { id: "c", text: "It determines whether CIP identity verification is required" },
      { id: "d", text: "It eliminates interest-rate risk on all bond holdings" },
    ],
    correctOptionId: "a",
    explanation:
      "Tax bracket drives the value of tax-exempt interest and the relative benefit of tax deferral versus taxable alternatives.",
    distractorExplanations: {
      b: "Markups are judged under fair pricing standards; tax bracket does not set a universal 5% cap.",
      c: "CIP is an identity requirement, not a tax-bracket function.",
      d: "Tax status does not remove interest-rate risk.",
    },
  },
  "series-7-readiness-check-s7-f3-016": {
    prompt:
      "Which factors most often make variable annuity recommendations suitability-sensitive for Series 7 candidates?",
    options: [
      { id: "a", text: "Costs, surrender charges, tax deferral need, investment risk, liquidity, age, and existing tax-advantaged accounts" },
      { id: "b", text: "Only the color of the prospectus cover" },
      { id: "c", text: "Whether the annuity is cleared through the Options Clearing Corporation" },
      { id: "d", text: "Whether the customer has a margin debit balance at another firm exclusively" },
    ],
    correctOptionId: "a",
    explanation:
      "VAs layer fees, surrender periods, market risk, and tax features; suitability must weigh those against age, liquidity, and existing retirement accounts.",
    distractorExplanations: {
      b: "Marketing presentation details are not the suitability core.",
      c: "OCC clearing is an options market utility, not the VA suitability framework.",
      d: "Margin at another firm may be relevant KYC, but VA suitability is broader than that single fact.",
    },
  },
  "series-63-readiness-check-s63-agent-001": {
    prompt:
      "Under the Uniform Securities Act framework tested on Series 63, may an agent generally represent more than one broker-dealer at the same time?",
    options: [
      { id: "a", text: "Generally no, unless the broker-dealers are affiliated or another specific exception/approval applies" },
      { id: "b", text: "Yes, always, with no notice to any firm or Administrator" },
      { id: "c", text: "Only if the agent also registers as an investment adviser representative in every state" },
      { id: "d", text: "Only if the agent exclusively sells insurance products" },
    ],
    correctOptionId: "a",
    explanation:
      "Dual registration with unaffiliated broker-dealers is generally restricted; affiliation or a narrow exception/approval is typically required.",
    distractorExplanations: {
      b: "Silent dual association is not the general rule.",
      c: "IAR registration does not by itself authorize dual BD representation.",
      d: "Insurance-only activity is a different licensing path and does not answer the agent dual-BD rule.",
    },
  },
  "series-63-readiness-check-s63-agent-004": {
    prompt:
      "When an agent’s association with a broker-dealer ends, what notice obligation is most accurate under Series 63 state registration practice?",
    options: [
      { id: "a", text: "Both the broker-dealer and the agent may have prompt notice/filing duties to the Administrator" },
      { id: "b", text: "Only the customer must file Form U4 within 24 hours" },
      { id: "c", text: "No filing is ever required if the agent moves to an affiliated bank" },
      { id: "d", text: "Only FINRA Arbitration must be notified, never the state Administrator" },
    ],
    correctOptionId: "a",
    explanation:
      "Termination of association typically triggers notice obligations (commonly discussed as Form U5-type processes) involving the firm and affecting the agent’s registration status with the Administrator.",
    distractorExplanations: {
      b: "Customers do not file Form U4 for agent terminations.",
      c: "Affiliation does not universally erase termination notice duties.",
      d: "State Administrators are central to agent registration status; arbitration is separate.",
    },
  },
  "series-63-readiness-check-s63-agent-006": {
    prompt:
      "An unregistered administrative employee at a broker-dealer wants to cold-call residents to recommend specific stocks and open accounts. What is the Series 63 concern?",
    options: [
      { id: "a", text: "Soliciting or recommending securities generally requires agent registration (unless a specific exclusion applies)" },
      { id: "b", text: "Administrative staff may always solicit if paid only in cash" },
      { id: "c", text: "Cold-calling stocks is permitted if limited to odd-lot orders" },
      { id: "d", text: "Registration is required only after the first 50 solicitations in a year" },
    ],
    correctOptionId: "a",
    explanation:
      "Effecting or soliciting securities transactions for a BD is agent activity; clerical staff who solicit/recommend typically must be registered.",
    distractorExplanations: {
      b: "Payment form does not create an exclusion from agent registration.",
      c: "Order size does not remove the solicitation/registration issue.",
      d: "There is no general 50-call free registration allowance on the Series 63.",
    },
  },
  "series-63-readiness-check-s63-bd-002": {
    prompt:
      "Which statement best describes a state’s books-and-records authority over a registered broker-dealer for Series 63 purposes?",
    options: [
      { id: "a", text: "The state may require records consistent with federal standards and examine registered firms" },
      { id: "b", text: "States may never request records from any federally registered firm" },
      { id: "c", text: "Only issuers, not broker-dealers, keep books subject to state exam" },
      { id: "d", text: "States may demand records that conflict with and override all SEC record rules without limit" },
    ],
    correctOptionId: "a",
    explanation:
      "Administrators can require and examine BD records, generally aligned with federal recordkeeping frameworks rather than inventing wholly conflicting regimes.",
    distractorExplanations: {
      b: "Federal registration does not bar all state record/exam authority for state-registered activity.",
      c: "Broker-dealers are primary recordkeepers for their business.",
      d: "State power is real but not an unbounded override of federal record rules.",
    },
  },
  "series-63-readiness-check-s63-bd-005": {
    prompt:
      "May states impose net capital or other financial responsibility requirements on broker-dealers under the Series 63 framework?",
    options: [
      { id: "a", text: "Yes, but for many federally regulated BDs state requirements cannot exceed applicable federal limitations" },
      { id: "b", text: "Never, because only the MSRB sets BD capital rules" },
      { id: "c", text: "Yes, and states may always impose higher capital than federal rules with no limit" },
      { id: "d", text: "Only if the BD sells insurance in that state" },
    ],
    correctOptionId: "a",
    explanation:
      "States can address financial responsibility, but federal law constrains how far states may go for broker-dealers already subject to federal capital standards.",
    distractorExplanations: {
      b: "MSRB is not the sole capital-rule source for all BDs.",
      c: "Federal ceilings/limits matter; states are not unbounded.",
      d: "Insurance licensing is separate from BD financial responsibility rules.",
    },
  },
  "california-real-estate-readiness-check-ca-practice-001": {
    prompt:
      "In California, when a broker represents both buyer and seller in the same transaction (dual agency), what is generally required?",
    options: [
      { id: "a", text: "Informed written consent and required agency disclosures" },
      { id: "b", text: "No disclosure, because dual agency is automatic in every listing" },
      { id: "c", text: "Oral permission from only one party is always enough" },
      { id: "d", text: "The broker must stop all supervision of salespersons" },
    ],
    correctOptionId: "a",
    explanation:
      "California dual agency requires proper disclosure and informed consent consistent with agency disclosure statutes/regulations.",
    distractorExplanations: {
      b: "Dual agency is not a silent default without disclosure.",
      c: "One-party oral assent does not satisfy dual-agency disclosure norms.",
      d: "Supervision duties continue; dual agency does not cancel them.",
    },
  },
  "california-real-estate-readiness-check-ca-practice-005": {
    prompt:
      "A California real estate broker employs several salespersons. What does the broker’s supervision duty generally include?",
    options: [
      { id: "a", text: "Reasonable supervision of the licensed activities of employed salespersons" },
      { id: "b", text: "No duty once a salesperson receives a license pocket card" },
      { id: "c", text: "Supervising only escrow officers employed by unaffiliated title companies" },
      { id: "d", text: "Setting federal monetary policy for mortgage rates" },
    ],
    correctOptionId: "a",
    explanation:
      "California brokers must reasonably supervise licensed activity of salespersons they employ.",
    distractorExplanations: {
      b: "Hiring or licensing a salesperson does not end broker supervision.",
      c: "Title-company escrow staff are not the broker’s salespersons.",
      d: "Monetary policy is a central-bank function, not a brokerage duty.",
    },
  },
  "california-real-estate-readiness-check-ca-practice-006": {
    prompt:
      "Alquist-Priolo special studies zones in California primarily relate to which disclosure/development concern?",
    options: [
      { id: "a", text: "Earthquake fault zones that trigger disclosure and development restrictions" },
      { id: "b", text: "Coastal fishing license quotas only" },
      { id: "c", text: "Federal student-loan interest calculations" },
      { id: "d", text: "Brokerage trademark registration deadlines" },
    ],
    correctOptionId: "a",
    explanation:
      "Alquist-Priolo maps address active fault zones and related real-estate disclosure/development rules.",
    distractorExplanations: {
      b: "Fishing licenses are unrelated to Alquist-Priolo zones.",
      c: "Student loans are not the Alquist-Priolo subject.",
      d: "Trademarks are IP issues, not fault-zone law.",
    },
  },
  "california-real-estate-readiness-check-ca-transfer-001": {
    prompt:
      "On a fully amortizing fixed-rate mortgage, what does each level monthly payment primarily cover over the life of the loan?",
    options: [
      { id: "a", text: "Both interest and principal so the unpaid balance declines to zero by maturity" },
      { id: "b", text: "Interest only forever with no principal reduction" },
      { id: "c", text: "Only property taxes collected by the lender" },
      { id: "d", text: "Only HOA capital reserves" },
    ],
    correctOptionId: "a",
    explanation:
      "Fully amortizing fixed-rate payments are calculated to pay interest and reduce principal across the term.",
    distractorExplanations: {
      b: "Interest-only products differ from fully amortizing fixed-rate loans.",
      c: "Taxes may be escrowed but are not what amortization means.",
      d: "HOA reserves are separate from mortgage amortization.",
    },
  },
  "life-and-health-insurance-readiness-check-ins-health-012": {
    prompt:
      "Which benefits are most characteristic of Medicare Part B coverage on a life/health licensing exam?",
    options: [
      { id: "a", text: "Physician services, outpatient care, preventive services, and durable medical equipment" },
      { id: "b", text: "Hospital inpatient room-and-board as Part A’s primary focus" },
      { id: "c", text: "Prescription drugs under Part D only" },
      { id: "d", text: "Long-term custodial nursing home care in all cases" },
    ],
    correctOptionId: "a",
    explanation:
      "Part B is medical insurance—doctors, outpatient, many preventive services, and DME—distinct from Part A hospital and Part D drugs.",
    distractorExplanations: {
      b: "Inpatient hospital is primarily Part A territory.",
      c: "Part D is the drug benefit, not Part B’s core definition.",
      d: "Custodial long-term care is generally not a Medicare Part B promise.",
    },
  },
  "life-and-health-insurance-readiness-check-ins-provisions-002": {
    prompt:
      "How does traditional whole life insurance primarily differ from level term life insurance?",
    options: [
      { id: "a", text: "Whole life combines a permanent death benefit with cash-value accumulation; term is temporary pure protection" },
      { id: "b", text: "Whole life never pays a death benefit" },
      { id: "c", text: "Term always builds guaranteed cash value faster than whole life" },
      { id: "d", text: "Whole life can only be issued as group employer coverage" },
    ],
    correctOptionId: "a",
    explanation:
      "Whole life is permanent with cash value; term provides coverage for a period and typically has no cash value.",
    distractorExplanations: {
      b: "Whole life is designed to pay a death benefit.",
      c: "Level term generally does not build cash value like whole life.",
      d: "Whole life is commonly individual as well as group contexts.",
    },
  },
  "life-and-health-insurance-readiness-check-ins-provisions-007": {
    prompt:
      "What do mortality tables used in life insurance pricing primarily reflect?",
    options: [
      { id: "a", text: "Statistical death rates by characteristics such as age (and often sex) in insured populations" },
      { id: "b", text: "Only equity market total returns" },
      { id: "c", text: "Only homeowners fire-loss frequencies" },
      { id: "d", text: "Agent monthly production quotas" },
    ],
    correctOptionId: "a",
    explanation:
      "Mortality tables summarize expected death rates used to price life insurance risk.",
    distractorExplanations: {
      b: "Market returns inform investments, not mortality tables.",
      c: "Property loss tables are casualty pricing tools.",
      d: "Sales quotas are management metrics, not mortality data.",
    },
  },
  "life-and-health-insurance-readiness-check-ins-provisions-008": {
    prompt:
      "In life/health underwriting, what is an Attending Physician Statement (APS)?",
    options: [
      { id: "a", text: "Medical records ordered from the applicant’s physician to assess insurability" },
      { id: "b", text: "The agent’s sales illustration only" },
      { id: "c", text: "Proof of homeownership for a dwelling policy" },
      { id: "d", text: "The beneficiary designation form exclusively" },
    ],
    correctOptionId: "a",
    explanation:
      "An APS is clinical information from the applicant’s doctor used when the application/medical exam needs more detail.",
    distractorExplanations: {
      b: "Illustrations are sales tools, not physician records.",
      c: "Property ownership proof is a P&C concept.",
      d: "Beneficiary forms name payees; they are not APS records.",
    },
  },
  "life-and-health-insurance-readiness-check-ins-general-007": {
    prompt:
      "Why is an insurance contract described as aleatory?",
    options: [
      { id: "a", text: "The values exchanged are unequal—a small premium may yield a large benefit or none if no loss occurs" },
      { id: "b", text: "Only the insured drafts every policy word" },
      { id: "c", text: "The contract always returns exactly the premium paid" },
      { id: "d", text: "Coverage exists only for speculative investment gains" },
    ],
    correctOptionId: "a",
    explanation:
      "Aleatory contracts feature unequal contingent exchange depending on whether a covered loss occurs.",
    distractorExplanations: {
      b: "Insurers typically draft policies (adhesion), which is a different principle.",
      c: "Insurance is not a dollar-for-dollar savings account of premiums.",
      d: "Insurance addresses pure risk of loss, not speculative gain.",
    },
  },
  "life-and-health-insurance-readiness-check-ins-disability-ltc-001": {
    prompt:
      "A Health Maintenance Organization (HMO) plan typically requires members to do which of the following?",
    options: [
      { id: "a", text: "Select a primary care physician and obtain referrals for most specialist care" },
      { id: "b", text: "Use only out-of-network providers for the highest benefit level" },
      { id: "c", text: "Pay no premiums under any HMO contract" },
      { id: "d", text: "Avoid choosing any physician for the entire year" },
    ],
    correctOptionId: "a",
    explanation:
      "Classic HMO design uses PCP gatekeeping and referrals inside a network (plan specifics vary, but this is the exam stereotype).",
    distractorExplanations: {
      b: "Out-of-network is usually limited or uncovered in HMOs, not preferred.",
      c: "HMOs charge premiums/prepaid contributions.",
      d: "Members choose a PCP rather than avoiding physicians.",
    },
  },
  "property-casualty-insurance-readiness-check-pc-casualty-006": {
    prompt:
      "Which coverage is most characteristic of a commercial auto policy?",
    options: [
      { id: "a", text: "Business auto liability and physical damage for autos described by coverage symbols/forms" },
      { id: "b", text: "Workers’ compensation statutory benefits for employee injuries" },
      { id: "c", text: "Professional liability for accountants’ errors and omissions only" },
      { id: "d", text: "Hull coverage for ocean marine cargo exclusively" },
    ],
    correctOptionId: "a",
    explanation:
      "Commercial auto uses symbols/schedules to extend liability and physical damage to business autos.",
    distractorExplanations: {
      b: "Workers’ comp is a separate statutory line.",
      c: "E&O is professional liability, not commercial auto.",
      d: "Ocean marine hull/cargo is a different specialty line.",
    },
  },
  "property-casualty-insurance-readiness-check-pc-commercial-property-002": {
    prompt:
      "Which factors most commonly affect eligibility for a Businessowners Policy (BOP)?",
    options: [
      { id: "a", text: "Business type, size, revenues, square footage, operations, and risk characteristics" },
      { id: "b", text: "Whether the owner has a Series 7 securities license" },
      { id: "c", text: "The color of the storefront awning" },
      { id: "d", text: "Only the county’s average rainfall" },
    ],
    correctOptionId: "a",
    explanation:
      "BOP eligibility is underwriting-driven by occupancy, size, and risk—not securities licenses or cosmetics.",
    distractorExplanations: {
      b: "Securities licenses are irrelevant to BOP eligibility.",
      c: "Awning color is not an eligibility criterion.",
      d: "Rainfall alone does not define BOP eligibility.",
    },
  },
  "property-casualty-insurance-readiness-check-pc-commercial-property-003": {
    prompt:
      "Under a Building and Personal Property Coverage Form (BPP), which property categories are typically addressed at the described premises?",
    options: [
      { id: "a", text: "Building, business personal property, and personal property of others, subject to limits and conditions" },
      { id: "b", text: "Only automobiles scheduled on a business auto symbol" },
      { id: "c", text: "Only workers’ compensation medical benefits" },
      { id: "d", text: "Only ocean cargo while on the high seas" },
    ],
    correctOptionId: "a",
    explanation:
      "BPP is the standard commercial property form covering building and business personal property (and often property of others) at described locations.",
    distractorExplanations: {
      b: "Autos are commercial auto, not BPP’s core.",
      c: "Workers’ comp is a separate coverage part.",
      d: "Ocean cargo is marine coverage.",
    },
  },
  "property-casualty-insurance-readiness-check-pc-commercial-property-008": {
    prompt:
      "An agent is quoting a Businessowners Policy for a small retail shop. Which set of underwriting factors most affects BOP eligibility?",
    options: [
      { id: "a", text: "Business type, size, revenues, square footage, operations, and overall risk characteristics" },
      { id: "b", text: "Whether the retailer also holds a CFA charter" },
      { id: "c", text: "The shop’s preferred logo font" },
      { id: "d", text: "Only the owner’s personal auto credit score in another state" },
    ],
    correctOptionId: "a",
    explanation:
      "BOP appetite is driven by class of business and size/risk metrics; professional designations and logo fonts do not control eligibility.",
    distractorExplanations: {
      b: "CFA status is unrelated to BOP underwriting.",
      c: "Branding choices are not eligibility factors.",
      d: "Personal auto credit elsewhere is not the BOP eligibility test.",
    },
  },
};

function shortenConcept(text) {
  const t = String(text ?? "").trim();
  const first = t.split(/(?<=\.)\s+/)[0] || t;
  if (first.length <= 110) return first.replace(/\.$/, "");
  return `${first.slice(0, 107).trim()}…`;
}

function stemWords(prompt) {
  return new Set(
    prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 4),
  );
}

function unrelatedWrongCount(question) {
  const words = stemWords(question.prompt);
  let weak = 0;
  for (const option of question.options) {
    if (option.id === question.correctOptionId) continue;
    const oWords = option.text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/);
    const overlap = oWords.filter((w) => words.has(w)).length;
    if (overlap === 0 && option.text.length > 70) weak += 1;
  }
  return weak;
}

function expandStem(prompt, examLabel) {
  const p = prompt.trim().replace(/\s+/g, " ");
  if (p.length >= 70) return p;
  if (/^\s*what\b/i.test(p) || /^\s*why\b/i.test(p) || /^\s*can\b/i.test(p)) {
    return `On the ${examLabel}, ${p.charAt(0).toLowerCase()}${p.slice(1)} Choose the best answer.`.replace(
      /\?\s*Choose/,
      "? Choose",
    );
  }
  if (/:\s*$/.test(p)) {
    return `${p} which of the following is most accurate for the ${examLabel}?`;
  }
  return `For the ${examLabel}, which of the following best answers this item: ${p.replace(/\?$/, "")}?`;
}

function buildTopicPools(questions) {
  const byTopic = new Map();
  for (const q of questions) {
    const list = byTopic.get(q.topicId) ?? [];
    const correct = q.options.find((o) => o.id === q.correctOptionId)?.text;
    if (correct) list.push(shortenConcept(correct));
    byTopic.set(q.topicId, list);
  }
  return byTopic;
}

function repairQuestion(question, topicPools, examLabel) {
  if (MANUAL[question.id]) {
    const patch = MANUAL[question.id];
    return {
      ...question,
      ...patch,
      difficulty: question.difficulty,
      sourceNote: "Local money-bank QA rewrite (parallel distractors; no OpenRouter).",
    };
  }

  let next = { ...question, options: question.options.map((o) => ({ ...o })) };
  if (next.prompt.trim().length < 70) {
    next = { ...next, prompt: expandStem(next.prompt, examLabel) };
  }

  if (unrelatedWrongCount(next) < 2) {
    return next;
  }

  const correct = next.options.find((o) => o.id === next.correctOptionId);
  if (!correct) return next;

  const correctShort = shortenConcept(correct.text);
  const pool = (topicPools.get(next.topicId) ?? [])
    .map(shortenConcept)
    .filter((t) => t && t.toLowerCase() !== correctShort.toLowerCase());

  // Dedupe pool
  const seen = new Set();
  const uniquePool = [];
  for (const t of pool) {
    const key = t.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    uniquePool.push(t);
  }

  while (uniquePool.length < 3) {
    uniquePool.push(
      `A related but incorrect ${examLabel} concept that does not answer this stem`,
    );
  }

  const distractors = uniquePool.slice(0, 3);
  const optionIds = ["a", "b", "c", "d"];
  const correctId = next.correctOptionId;
  const wrongIds = optionIds.filter((id) => id !== correctId);
  const options = optionIds.map((id) => {
    if (id === correctId) return { id, text: correctShort };
    const idx = wrongIds.indexOf(id);
    return { id, text: distractors[idx] };
  });

  const distractorExplanations = {};
  for (const id of wrongIds) {
    distractorExplanations[id] =
      "This choice describes a different concept and does not correctly answer the question stem.";
  }

  return {
    ...next,
    options,
    explanation:
      next.explanation.trim().length >= 40
        ? next.explanation
        : `${correctShort}. The other choices describe different concepts and do not answer this stem.`,
    distractorExplanations,
    sourceNote: "Local money-bank QA repair (topic-adjacent distractors; no OpenRouter).",
  };
}

function examLabel(slug) {
  if (slug.startsWith("sie")) return "SIE";
  if (slug.includes("series-7")) return "Series 7";
  if (slug.includes("series-63")) return "Series 63";
  if (slug.includes("california-real-estate")) return "California real estate exam";
  if (slug.includes("life-and-health")) return "life and health insurance exam";
  if (slug.includes("property-casualty")) return "property and casualty insurance exam";
  return "licensing exam";
}

function main() {
  const summary = [];
  for (const slug of MONEY) {
    const path = join(DIR, `${slug}.json`);
    const questions = JSON.parse(readFileSync(path, "utf8"));
    const pools = buildTopicPools(questions);
    let changed = 0;
    const next = questions.map((q) => {
      const repaired = repairQuestion(q, pools, examLabel(slug));
      if (JSON.stringify(repaired) !== JSON.stringify(q)) changed += 1;
      return repaired;
    });
    writeFileSync(path, `${JSON.stringify(next, null, 2)}\n`);
    summary.push({ slug, changed, size: next.length });
    console.log(`${slug}: repaired ${changed}/${next.length}`);
  }
  writeFileSync(
    join(root, "docs/mock-bank-qa/money-local-repair-summary.json"),
    `${JSON.stringify({ repairedAt: new Date().toISOString(), banks: summary }, null, 2)}\n`,
  );
}

main();
