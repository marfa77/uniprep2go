#!/usr/bin/env python3
"""NY Real Estate Salesperson — 60 curated MCQs (4×15)."""
from write_helper import write_bank

SLUG = "ny-real-estate-readiness-check"

topics = {
    "license-law": [
        (
            "In New York, real estate salesperson licenses are issued and overseen primarily by:",
            "The Department of State (DOS) Division of Licensing Services",
            [
                "The Internal Revenue Service exclusively",
                "Local zoning boards only",
                "The Federal Reserve Board",
            ],
            "NY DOS Licensing Services regulates real estate salesperson and broker licenses under Article 12-A.",
            [
                "IRS handles federal taxes, not NY real estate licenses.",
                "Zoning boards regulate land use, not salesperson licensing.",
                "The Federal Reserve does not license NY salespersons.",
            ],
            "easy",
        ),
        (
            "A New York real estate salesperson may lawfully receive compensation only from:",
            "The broker with whom the salesperson is associated",
            [
                "The buyer directly as an unlicensed side fee",
                "Any title company as a secret bonus",
                "A FSBO seller without broker knowledge when prohibited",
            ],
            "Salespersons are paid through their sponsoring broker; bypassing the broker violates license law.",
            [
                "Direct unlicensed fees are improper.",
                "Secret title bonuses can violate RESPA and ethics rules.",
                "Broker supervision and compensation rules still apply.",
            ],
            "easy",
        ),
        (
            "Before engaging in activities requiring a license, a New York salesperson must:",
            "Be associated with a licensed broker and hold an active license",
            [
                "Only post ads on social media without affiliation",
                "Practice independently without any broker",
                "Use a friend's broker pocket card without association",
            ],
            "A salesperson cannot practice independently; association with a licensed broker is required.",
            [
                "Advertising licensed services still requires proper affiliation.",
                "Independent practice requires a broker license.",
                "Using another person's credentials is illegal.",
            ],
            "easy",
        ),
        (
            "Commingling occurs when a broker:",
            "Mixes client trust/escrow funds with personal or operating funds improperly",
            [
                "Deposits earnest money into a proper escrow account",
                "Keeps accurate escrow ledgers",
                "Discloses agency relationships in writing",
            ],
            "Mixing trust money with personal or operating funds is a serious violation; conversion is misuse of those funds.",
            [
                "Proper escrow deposit is required compliance.",
                "Good records support compliance.",
                "Agency disclosure is a separate duty.",
            ],
            "medium",
        ),
        (
            "Which statement about New York pocket cards is generally correct?",
            "Licensees should carry their pocket card when engaging in licensed activity and produce it upon request",
            [
                "Pocket cards are optional wallpaper decorations only",
                "Only attorneys need pocket cards statewide",
                "Pocket cards replace the need for any broker supervision",
            ],
            "DOS-issued pocket cards identify licensed status; licensees must be able to show them when practicing.",
            [
                "Pocket cards are official credentials, not decorations.",
                "Salespersons and brokers need them, not only attorneys.",
                "Supervision requirements remain regardless of the card.",
            ],
            "easy",
        ),
        (
            "If a sponsoring broker's license is suspended or revoked, associated salespersons generally:",
            "Cannot continue licensed activity under that broker until properly re-associated",
            [
                "Automatically become brokers overnight",
                "May keep practicing under the suspended broker",
                "Lose their Social Security numbers",
            ],
            "Salesperson authority depends on association with an active broker; suspension/revocation stops that pathway.",
            [
                "Broker status is not automatic.",
                "Practicing under a suspended broker is not permitted.",
                "SSNs are unrelated to license status.",
            ],
            "medium",
        ),
        (
            "Unlicensed assistants in New York generally may:",
            "Perform clerical tasks that do not require a license (e.g., scheduling, filing)",
            [
                "Negotiate purchase offers independently with buyers",
                "Show properties and discuss terms as if licensed",
                "Receive commission splits for brokerage services",
            ],
            "Unlicensed staff may do support work but may not perform activities that require a real estate license.",
            [
                "Negotiating offers is licensed activity.",
                "Showing/discussing terms typically requires a license.",
                "Commission splits for brokerage services require licensure.",
            ],
            "medium",
        ),
        (
            "A New York salesperson's license renewal typically requires:",
            "Meeting DOS renewal and continuing education requirements on the prescribed cycle",
            [
                "Never completing any continuing education",
                "Paying only a parking ticket",
                "Automatic lifetime renewal with no filing",
            ],
            "Active status depends on timely renewal and required CE under DOS rules.",
            [
                "CE is generally required for renewal.",
                "Parking tickets are unrelated.",
                "Licenses are not lifetime without renewal.",
            ],
            "easy",
        ),
        (
            "Blind ads that hide the broker's identity are generally:",
            "Prohibited; ads must properly identify the brokerage",
            [
                "Required for all listings",
                "Allowed only if the salesperson's home address is used alone",
                "Encouraged to increase mystery marketing",
            ],
            "Advertising must not mislead and must properly identify the licensed brokerage.",
            [
                "Transparency, not anonymity, is required.",
                "Home-address-only ads that conceal the broker are improper.",
                "Mystery ads that hide the firm violate advertising rules.",
            ],
            "medium",
        ),
        (
            "Kickbacks for settlement services are restricted under federal RESPA; a lawful referral fee generally requires:",
            "Compliance with RESPA and New York rules, including disclosure and licensing constraints",
            [
                "Secret payments to unlicensed people for brokerage services",
                "Sharing commissions with unlicensed finders for licensed services always",
                "No documentation ever",
            ],
            "Fee-sharing for real estate and settlement services is tightly regulated; secret unlicensed payments are illegal.",
            [
                "Secret unlicensed payments violate law.",
                "Unlicensed commission sharing for brokerage services is prohibited.",
                "Documentation and disclosure matter.",
            ],
            "hard",
        ),
        (
            "Article 12-A of the New York Real Property Law primarily addresses:",
            "Licensing and regulation of real estate brokers and salespersons",
            [
                "Federal bankruptcy exemptions only",
                "Coastal fishing quotas",
                "Interstate trucking hours of service",
            ],
            "Article 12-A is the core statutory framework for NY real estate brokerage licensing.",
            [
                "Bankruptcy is a separate body of law.",
                "Fishing quotas are unrelated.",
                "HOS rules are FMCSA, not Article 12-A.",
            ],
            "easy",
        ),
        (
            "A net listing arrangement in New York is generally:",
            "Illegal / prohibited as a listing method",
            [
                "The only lawful listing form",
                "Required by DOS for every sale",
                "Mandatory for condominium resales",
            ],
            "Net listings (seller gets a set net; broker keeps the excess as commission) are prohibited in New York.",
            [
                "Other lawful listing forms exist (exclusive, open, etc.).",
                "DOS does not require net listings.",
                "Condo resales are not exempted into net listings.",
            ],
            "medium",
        ),
        (
            "When must a New York licensee generally provide agency disclosure?",
            "At the first substantive contact with a buyer or seller regarding a specific property, as required",
            [
                "Only after the deed is recorded",
                "Never, if the deal is under $1 million",
                "Only when the salesperson feels like it",
            ],
            "NY agency disclosure timing rules require early, proper disclosure of the licensee's role.",
            [
                "Disclosure is required before closing/recording stages.",
                "Price does not waive disclosure.",
                "Disclosure is a legal duty, not optional mood.",
            ],
            "medium",
        ),
        (
            "Maintaining a place of business for a New York broker generally means:",
            "Maintaining a compliant office that meets DOS/business requirements for the brokerage",
            [
                "Using only an anonymous P.O. box with no required presence when rules require an office",
                "Operating solely from a foreign country with no NY registration",
                "Having no business address on file ever",
            ],
            "Brokers must maintain a proper place of business and meet registration/office rules.",
            [
                "A P.O. box alone is typically insufficient when an office is required.",
                "NY practice requires proper registration/presence rules to be met.",
                "A business address on file is required.",
            ],
            "medium",
        ),
        (
            "Misrepresentation of a material property fact by a licensee can result in:",
            "Civil liability and DOS disciplinary action",
            [
                "Automatic immunity if the buyer liked the kitchen",
                "A required bonus commission from DOS",
                "Exemption from all consumer protection laws",
            ],
            "Material misrepresentation can trigger discipline and civil claims; there is no immunity for misleading buyers/sellers.",
            [
                "Buyer preference does not erase misrepresentation.",
                "Violations do not earn bonus commissions.",
                "Consumer protection still applies.",
            ],
            "easy",
        ),
    ],
    "contracts-agency": [
        (
            "In a single agency relationship representing the seller, the licensee's fiduciary duties are owed primarily to:",
            "The seller-client",
            [
                "The buyer's lender only",
                "The title company exclusively",
                "Any passerby at the open house",
            ],
            "In seller agency, fiduciary duties (loyalty, confidentiality, etc.) run to the seller-client.",
            [
                "Lenders are not the agency client in seller agency.",
                "Title companies are closing parties, not the agency principal.",
                "Open-house visitors are not automatic clients.",
            ],
            "easy",
        ),
        (
            "A listing agreement is best described as:",
            "An employment contract between the seller and the broker authorizing marketing/sale services",
            [
                "A deed transferring title immediately",
                "A mortgage note",
                "An appraisal report",
            ],
            "Listings hire the brokerage to market the property; they do not convey title or create a loan.",
            [
                "Deeds convey title.",
                "Notes evidence debt.",
                "Appraisals estimate value.",
            ],
            "easy",
        ),
        (
            "Which element is essential to form a valid real estate sales contract?",
            "Offer, acceptance, consideration, competent parties, and lawful purpose (among other formalities)",
            [
                "A handshake with no terms ever",
                "Only a verbal price with no parties identified",
                "A social media like on the listing photo",
            ],
            "Contracts require the classic elements plus applicable writing requirements under the Statute of Frauds.",
            [
                "Vague handshakes lack enforceable terms.",
                "Parties and essential terms must be identifiable.",
                "Likes are not acceptances of contract terms.",
            ],
            "easy",
        ),
        (
            "Dual agency in New York generally requires:",
            "Informed written consent of the parties as required by law",
            [
                "Keeping both parties unaware forever",
                "Automatic dual agency with no disclosure",
                "Dual agency only for cash deals under $10,000",
            ],
            "Advanced informed consent is required before dual agency can lawfully proceed.",
            [
                "Concealment violates agency law.",
                "Disclosure/consent is mandatory, not automatic secrecy.",
                "Price and cash terms do not waive consent rules.",
            ],
            "medium",
        ),
        (
            "An exclusive right-to-sell listing typically means:",
            "The listing broker earns a commission if the property sells during the term, regardless of who finds the buyer (per contract)",
            [
                "No commission is ever owed",
                "Only the seller's cousin can show the home",
                "The broker is paid only if the seller self-negotiates illegally",
            ],
            "Exclusive right-to-sell is the most protective listing form for the broker's commission entitlement.",
            [
                "Commission is generally due on a qualifying sale.",
                "Showing rights are governed by the listing, not cousins alone.",
                "Self-sale during the term usually still owes commission under exclusive right-to-sell.",
            ],
            "medium",
        ),
        (
            "The Statute of Frauds generally requires real estate sale contracts to be:",
            "In writing and signed by the party to be charged (with limited exceptions)",
            [
                "Only oral forever",
                "Written in invisible ink",
                "Signed only by a notary with no parties",
            ],
            "Conveyances and sale contracts for real property generally must be written to be enforceable.",
            [
                "Oral contracts for land sales are generally unenforceable.",
                "Visibility/legibility matters for a writing.",
                "Parties must sign; notary alone is not a substitute party.",
            ],
            "easy",
        ),
        (
            "Fair housing law generally prohibits discrimination based on protected classes such as:",
            "Race, color, religion, sex, national origin, familial status, and disability (plus NY/local expansions)",
            [
                "Only credit score and nothing else",
                "Only whether the buyer likes granite counters",
                "Only the color of the front door",
            ],
            "Federal Fair Housing Act and NY Human Rights Law protect specified classes; NY/local law often adds more.",
            [
                "Credit may be a legitimate screening factor but is not the fair housing framework.",
                "Design preferences are not protected-class categories.",
                "Door color is not a protected class.",
            ],
            "easy",
        ),
        (
            "Steering in fair housing means:",
            "Guiding prospects toward or away from neighborhoods based on protected-class characteristics",
            [
                "Using GPS to find the listing address",
                "Explaining school district boundaries factually without bias",
                "Providing a MLS printout on request",
            ],
            "Steering is unlawful channeling of clients based on protected characteristics.",
            [
                "Navigation is not fair housing steering.",
                "Neutral factual information differs from discriminatory guidance.",
                "MLS data sharing alone is not steering.",
            ],
            "medium",
        ),
        (
            "A binder or offer to purchase in New York practice is often:",
            "A preliminary agreement that may lead to a full contract prepared by attorneys",
            [
                "The final recorded deed",
                "A permanent survey map",
                "A certificate of occupancy",
            ],
            "NY commonly uses binders/offers followed by attorney-prepared contracts; the binder is not the deed.",
            [
                "Deeds transfer title at closing/recording stages.",
                "Surveys show boundaries.",
                "COs relate to occupancy/code compliance.",
            ],
            "medium",
        ),
        (
            "Which statement about earnest money is most accurate?",
            "It shows good faith and is typically held in escrow pending contract performance or authorized release",
            [
                "It always belongs to the broker as an immediate commission",
                "It is illegal in every New York transaction",
                "It replaces the need for a purchase price",
            ],
            "Earnest money is security for performance, not an automatic broker fee or substitute for the purchase price.",
            [
                "Commission is earned per the listing/agreement, not by seizing escrow.",
                "Earnest money is common and lawful when handled properly.",
                "Purchase price remains the consideration for the sale.",
            ],
            "easy",
        ),
        (
            "Blockbusting refers to:",
            "Inducing panic selling by suggesting protected-class entry will lower property values",
            [
                "Building a fence on the lot line",
                "Using a lockbox on a listing",
                "Ordering a title search",
            ],
            "Blockbusting is a prohibited fair housing practice that exploits prejudice to generate listings.",
            [
                "Fences are property improvements/encroachments issues.",
                "Lockboxes are showing tools.",
                "Title searches are closing due diligence.",
            ],
            "medium",
        ),
        (
            "A customer (as opposed to a client) is generally owed:",
            "Honesty, fairness, and disclosure of known material facts—but not full fiduciary loyalty",
            [
                "Absolute obedience to every demand",
                "Confidential advocacy against the client",
                "No honesty whatsoever",
            ],
            "Customers get fair dealing; clients get fiduciary duties. Licensees must still be honest with customers.",
            [
                "Obedience is a client fiduciary concept within lawful bounds.",
                "Advocating against your client breaches loyalty.",
                "Honesty is required with customers.",
            ],
            "medium",
        ),
        (
            "An option contract gives the optionee:",
            "The right, but not the obligation, to purchase on stated terms within a period",
            [
                "An immediate deed without payment",
                "A mandatory duty to buy with no choice",
                "An automatic mortgage approval",
            ],
            "Options create a unilateral right to buy; exercise is optional for the optionee.",
            [
                "Deeds require conveyance formalities and consideration/performance.",
                "Options are rights, not obligations, until exercised.",
                "Lenders approve mortgages separately.",
            ],
            "hard",
        ),
        (
            "Which practice violates fair housing advertising rules?",
            "Using phrases that express preference for or against a protected class (e.g., 'no children,' 'Christians only')",
            [
                "Stating the number of bedrooms factually",
                "Listing the property's square footage",
                "Describing a renovated kitchen accurately",
            ],
            "Ads may describe the property, not discriminatory preferences about who may buy/rent.",
            [
                "Bedroom count is a property fact.",
                "Size is a property fact.",
                "Physical features may be described neutrally.",
            ],
            "easy",
        ),
        (
            "If a buyer asks a seller's agent about the seller's motivation, the agent should generally:",
            "Avoid disclosing confidential client information unless authorized",
            [
                "Reveal the lowest price the seller will take without permission",
                "Invent a false story to pressure the buyer",
                "Hand over the seller's tax returns unsolicited",
            ],
            "Confidentiality protects client motivations and negotiation strategy unless disclosure is authorized or legally required.",
            [
                "Bottom-line price is confidential negotiation info.",
                "False statements are misrepresentation.",
                "Tax returns are private and not casually disclosed.",
            ],
            "hard",
        ),
    ],
    "finance-valuation": [
        (
            "Loan-to-value (LTV) ratio is best described as:",
            "The loan amount divided by the property's value (or purchase price, as used by the lender)",
            [
                "Property taxes divided by HOA dues",
                "Commission rate times days on market",
                "Square footage divided by lot size",
            ],
            "LTV measures leverage: loan ÷ value. Higher LTV generally means more lender risk.",
            [
                "Taxes/HOA are ownership costs, not LTV.",
                "Commission and DOM are marketing metrics.",
                "Size ratios are not financing LTV.",
            ],
            "easy",
        ),
        (
            "A conventional conforming mortgage is typically:",
            "A non-government-insured loan that meets GSE (Fannie/Freddie) guidelines",
            [
                "Always an FHA loan",
                "Always a VA loan",
                "A reverse mortgage only",
            ],
            "Conventional loans are not FHA/VA insured/guaranteed; conforming means they meet agency size/guidelines.",
            [
                "FHA is government-insured.",
                "VA is government-guaranteed for eligible veterans.",
                "Reverse mortgages are a different product.",
            ],
            "easy",
        ),
        (
            "PITI commonly stands for:",
            "Principal, Interest, Taxes, and Insurance",
            [
                "Price, Inventory, Title, Inspection",
                "Points, Index, Term, Inflation",
                "Permit, Impact, Transfer, Income",
            ],
            "PITI is the classic housing payment bundle used in underwriting affordability.",
            [
                "Those are transaction steps, not PITI.",
                "Those are loan pricing concepts, not PITI.",
                "Those are unrelated closing items.",
            ],
            "easy",
        ),
        (
            "Which appraisal approach uses recent sales of similar properties?",
            "Sales comparison (market) approach",
            [
                "Cost approach only",
                "Income capitalization only",
                "Assemblage approach",
            ],
            "The sales comparison approach adjusts comps to estimate market value—most common for residences.",
            [
                "Cost approach uses replacement cost minus depreciation plus land.",
                "Income approach capitalizes NOI for income properties.",
                "Assemblage is combining parcels, not an appraisal approach name here.",
            ],
            "easy",
        ),
        (
            "Points paid to a lender at closing typically:",
            "Are prepaid interest that can reduce the note rate (discount points) or cover fees (origination)",
            [
                "Increase the property's lot size",
                "Eliminate the need for a deed",
                "Automatically waive property taxes forever",
            ],
            "One point = 1% of the loan; discount points buy down rate; origination points are lender fees.",
            [
                "Points do not change physical land.",
                "Deeds are still required to convey title.",
                "Taxes are not waived by points.",
            ],
            "medium",
        ),
        (
            "Private mortgage insurance (PMI) is commonly required when:",
            "A conventional loan has a high LTV (often above 80%)",
            [
                "The buyer pays 50% down in cash",
                "The property is free and clear with no loan",
                "The loan is a 100% equity gift with no mortgage",
            ],
            "PMI protects the lender on high-LTV conventional loans until equity reaches required levels.",
            [
                "Large down payments usually avoid PMI.",
                "No loan means no PMI.",
                "No mortgage means no PMI.",
            ],
            "easy",
        ),
        (
            "Amortization means:",
            "Periodic payments that gradually pay down principal over the loan term",
            [
                "Interest-only forever with no principal reduction",
                "Ignoring the loan balance",
                "Paying only property taxes each month",
            ],
            "Fully amortizing loans retire principal through scheduled P&I payments.",
            [
                "Interest-only periods delay principal paydown.",
                "Balances must be tracked and paid.",
                "Taxes are separate from loan amortization.",
            ],
            "easy",
        ),
        (
            "A comparative market analysis (CMA) prepared by a licensee is:",
            "A marketing/pricing opinion using comps—not a formal appraisal",
            [
                "A USPAP appraisal by definition",
                "A government tax assessment",
                "A title insurance policy",
            ],
            "CMAs help price listings; only licensed/certified appraisers perform appraisals under appraisal standards.",
            [
                "Appraisals follow appraisal licensing/USPAP frameworks.",
                "Assessments are for taxation.",
                "Title policies insure title risk.",
            ],
            "medium",
        ),
        (
            "At a typical New York residential closing, the deed is:",
            "Delivered by the seller (grantor) to the buyer (grantee) to transfer title",
            [
                "Issued by the buyer's employer",
                "Created by the listing photographer",
                "Optional if the parties shake hands",
            ],
            "Title transfers by delivery of a properly executed deed meeting statutory formalities.",
            [
                "Employers do not convey realty.",
                "Photos do not transfer title.",
                "Conveyances require a deed writing.",
            ],
            "easy",
        ),
        (
            "Prorations at closing are used to:",
            "Allocate items like taxes and rents fairly between buyer and seller as of the closing date",
            [
                "Increase the broker's license fee",
                "Cancel the mortgage automatically",
                "Survey the property boundaries",
            ],
            "Prorations split ongoing charges/credits so each party pays their ownership period share.",
            [
                "License fees are separate DOS matters.",
                "Mortgage payoff/assumption is separate from proration math.",
                "Surveys measure land, not money splits.",
            ],
            "medium",
        ),
        (
            "An FHA loan is characterized by:",
            "Mortgage insurance through FHA and more flexible qualifying guidelines for eligible borrowers",
            [
                "Being available only to corporations trading on the NYSE",
                "Never requiring any down payment documentation",
                "Prohibiting owner-occupancy in all cases",
            ],
            "FHA insures lenders; borrowers pay MIP and typically must owner-occupy primary residences under program rules.",
            [
                "FHA is for eligible individual borrowers, not NYSE listing status.",
                "Down payment and docs are still required.",
                "FHA commonly requires owner-occupancy for purchase programs.",
            ],
            "medium",
        ),
        (
            "Functional obsolescence is best illustrated by:",
            "An outdated floor plan or inadequate closets that hurt marketability",
            [
                "A brand-new roof in excellent condition",
                "A busy highway built next door (external)",
                "Normal wear that is easily cured by paint",
            ],
            "Functional obsolescence is loss from outdated/poor design within the property.",
            [
                "New roofs are physical improvements.",
                "Highway impact is external/economic obsolescence.",
                "Deferred maintenance is physical, often curable.",
            ],
            "hard",
        ),
        (
            "A balloon payment is:",
            "A large final payment that pays off remaining principal when the loan does not fully amortize",
            [
                "A monthly tax escrow only",
                "A gift of helium at closing",
                "An HOA initiation fee always",
            ],
            "Partially amortizing loans leave a balance due at maturity—the balloon.",
            [
                "Tax escrow is separate.",
                "Party balloons are not loan terms.",
                "HOA fees are association charges.",
            ],
            "medium",
        ),
        (
            "Title insurance primarily protects against:",
            "Covered defects in title that were not discovered in the title search",
            [
                "Future roof leaks from storms",
                "Furniture damage by movers",
                "Changes in interest rates after closing",
            ],
            "Owner's/lender's title policies insure against covered title risks (liens, forgeries, etc.), not physical property damage.",
            [
                "Casualty/homeowners insurance covers physical damage.",
                "Moving damage is not a title risk.",
                "Rate changes are loan-market risk.",
            ],
            "easy",
        ),
        (
            "Which closing document details the final cash due and credits for buyer and seller?",
            "The Closing Disclosure (TRID) / settlement statement used for the transaction",
            [
                "The listing agreement alone",
                "The broker's pocket card",
                "The open house sign-in sheet",
            ],
            "TRID Closing Disclosures (and settlement statements) itemize funds to close and prorations.",
            [
                "Listings set brokerage employment, not final settlement figures.",
                "Pocket cards identify licensees.",
                "Sign-in sheets track visitors.",
            ],
            "easy",
        ),
    ],
    "property-practice": [
        (
            "A fixture is generally:",
            "Personal property that has become real property by annexation/intent/adaptation",
            [
                "Always a free-standing lamp",
                "Cash in a wallet",
                "A car parked in the driveway",
            ],
            "Fixtures (e.g., built-in appliances, chandelier wired in) transfer with the realty unless excluded.",
            [
                "Free-standing lamps are usually personalty.",
                "Cash is personal property.",
                "Vehicles are personal property.",
            ],
            "easy",
        ),
        (
            "Fee simple absolute ownership is:",
            "The most complete bundle of rights lasting potentially forever",
            [
                "A lease for one week",
                "A life estate that ends at death automatically as fee simple",
                "An easement only",
            ],
            "Fee simple is the fullest freehold estate; life estates and leases are more limited.",
            [
                "Short leases are nonfreehold estates.",
                "Life estates end/measure by life; they are not fee simple absolute.",
                "Easements are nonpossessory interests.",
            ],
            "easy",
        ),
        (
            "An easement appurtenant typically:",
            "Benefits a dominant tenement and runs with the land",
            [
                "Is only a personal license that never transfers",
                "Is ownership of the entire servient fee",
                "Is a mortgage lien",
            ],
            "Appurtenant easements attach to land (dominant/servient); they generally transfer with the dominant estate.",
            [
                "Licenses are typically revocable and personal.",
                "Easement holders do not own the fee.",
                "Mortgages are security liens.",
            ],
            "medium",
        ),
        (
            "Zoning ordinances primarily regulate:",
            "Land use, density, and building bulk/height within districts",
            [
                "Federal income tax rates",
                "Who may hold a salesperson license",
                "Interest rates on mortgages",
            ],
            "Zoning is local police-power land-use control; licensing and lending are separate regimes.",
            [
                "Tax rates are tax authority matters.",
                "Licensing is DOS.",
                "Interest rates are lender/market/regulatory finance topics.",
            ],
            "easy",
        ),
        (
            "A variance is:",
            "Authorization to deviate from a zoning requirement due to unnecessary hardship (standards vary)",
            [
                "A type of deed warranty",
                "Automatic rezoning of an entire city",
                "A title insurance endorsement for floods only",
            ],
            "Variances grant relief from strict zoning application in specific hardship cases.",
            [
                "Deed warranties are conveyance covenants.",
                "Rezoning changes the map/ordinance more broadly.",
                "Flood coverage is insurance, not zoning variance.",
            ],
            "medium",
        ),
        (
            "Metes and bounds legal descriptions use:",
            "Distances and directions from a point of beginning around a parcel",
            [
                "Only the postal ZIP code",
                "Only the MLS number",
                "Only the broker's license number",
            ],
            "Metes and bounds are survey-based boundary descriptions common for irregular parcels.",
            [
                "ZIP codes are delivery areas, not legal descriptions.",
                "MLS numbers are listing IDs.",
                "License numbers identify agents, not land.",
            ],
            "easy",
        ),
        (
            "Joint tenancy is characterized by:",
            "Right of survivorship among joint tenants (with unities typically required)",
            [
                "No survivorship—interest always goes by will only",
                "Ownership only by corporations forever",
                "Automatic conversion to a leasehold",
            ],
            "Joint tenancy's hallmark is survivorship; tenancy in common lacks survivorship.",
            [
                "Survivorship is the defining feature vs TIC.",
                "Natural persons commonly hold joint tenancy.",
                "It remains a freehold co-ownership form.",
            ],
            "medium",
        ),
        (
            "A lien is:",
            "A financial claim against property as security for a debt or obligation",
            [
                "A kitchen remodel style",
                "A type of roofing material",
                "A surveyor's measuring tape",
            ],
            "Mortgages, tax liens, and judgments are examples of liens that can encumber title.",
            [
                "Remodel styles are not liens.",
                "Roofing is physical construction.",
                "Tools are personal property.",
            ],
            "easy",
        ),
        (
            "Constructive notice of a recorded deed is achieved by:",
            "Proper recording in the public land records",
            [
                "Whispering the sale to one neighbor",
                "Posting on a private group chat only",
                "Keeping the deed in a drawer forever",
            ],
            "Recording gives constructive notice to the world; unrecorded deeds risk later purchasers without notice.",
            [
                "Informal word-of-mouth is actual notice at best to hearers.",
                "Private chats are not public records.",
                "Unrecorded instruments may not protect against subsequent bona fide purchasers.",
            ],
            "medium",
        ),
        (
            "Encroachment is best described as:",
            "A structure or improvement that illegally extends onto another's land",
            [
                "Paying property taxes early",
                "Recording a mortgage",
                "Obtaining a building permit",
            ],
            "Encroachments (fences, eaves, driveways) create boundary/title issues often found by survey.",
            [
                "Early tax payment is good practice, not encroachment.",
                "Recording creates lien notice.",
                "Permits authorize construction, not trespass.",
            ],
            "easy",
        ),
        (
            "In New York condominium ownership, the unit owner typically owns:",
            "The unit in fee plus an undivided interest in common elements",
            [
                "The entire building exclusively including all other units",
                "Only a proprietary lease with no deeded unit (co-op style)",
                "Nothing but a parking sticker",
            ],
            "Condos convey deeded units plus common-interest shares; co-ops convey shares/leases instead.",
            [
                "Other units belong to other owners.",
                "Proprietary leases characterize co-ops, not condos.",
                "Ownership is far more than parking rights.",
            ],
            "medium",
        ),
        (
            "A cooperative (co-op) purchaser in New York typically receives:",
            "Shares in the cooperative corporation and a proprietary lease",
            [
                "A fee simple deed to a condo unit automatically",
                "Federal land patent title",
                "An easement in gross only",
            ],
            "Co-op buyers buy stock + proprietary lease; they do not get a traditional condo unit deed.",
            [
                "Condo deeds are a different ownership form.",
                "Land patents are historical government grants.",
                "Easements are limited use rights, not co-op ownership.",
            ],
            "medium",
        ),
        (
            "Eminent domain is:",
            "The government's power to take private property for public use with just compensation",
            [
                "A private HOA fine schedule",
                "A broker's right to keep escrow forever",
                "A buyer's right to cancel without contract terms",
            ],
            "Takings require public use/purpose and just compensation under constitutional standards.",
            [
                "HOA fines are private covenants/rules.",
                "Escrow misuse is conversion, not eminent domain.",
                "Cancellation rights come from contracts/statutes, not eminent domain.",
            ],
            "easy",
        ),
        (
            "A certificate of occupancy (CO) generally indicates:",
            "That a building/unit meets applicable codes for occupancy as issued by the authority",
            [
                "That the mortgage is paid in full",
                "That the salesperson passed the licensing exam",
                "That title insurance was declined",
            ],
            "COs are municipal/code compliance documents allowing lawful occupancy.",
            [
                "Satisfaction of mortgage is a different instrument.",
                "Licensing is DOS exam/licensing.",
                "Title insurance decisions are separate.",
            ],
            "easy",
        ),
        (
            "Which environmental issue is commonly associated with older homes and disclosure concerns?",
            "Lead-based paint (pre-1978 housing) and related federal disclosure rules",
            [
                "Only brand-new stainless appliances",
                "Fiber-optic internet speed",
                "The color of blooming flowers",
            ],
            "Federal lead disclosure applies to most pre-1978 residential target housing; other hazards (asbestos, mold) also matter.",
            [
                "New appliances are not the classic lead issue.",
                "Internet is not an environmental hazard disclosure category here.",
                "Landscaping color is not lead paint.",
            ],
            "medium",
        ),
    ],
}

def main() -> None:
    write_bank(SLUG, topics)


if __name__ == "__main__":
    main()
