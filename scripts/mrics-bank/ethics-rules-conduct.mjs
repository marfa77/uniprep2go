import { makeQ, rot } from "./makeQ.mjs";

export const ethicsRulesConduct = [
  makeQ(
    "When you learn confidential client budget data while advising Party A and Party B asks you to tender on the same scheme, what aligns with RICS Rules of Conduct?",
    "Decline or disclose the conflict to both parties and seek written consent before proceeding",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "hard",
    rot(0)
  ),
  makeQ(
    "When a contractor offers you event tickets after you issue an interim certificate on their project, what aligns with RICS Rules of Conduct?",
    "Check gifts policy, decline or disclose per policy, and ensure no influence on certification",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "easy",
    rot(1)
  ),
  makeQ(
    "When your client asks you to omit a known structural defect from a report to speed a sale, what aligns with RICS Rules of Conduct?",
    "Refuse and explain that reports must be honest, balanced, and not misleading",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "medium",
    rot(2)
  ),
  makeQ(
    "When you discover a colleague copied another firm specification text into a client report without attribution, what aligns with RICS Rules of Conduct?",
    "Raise it with the colleague and escalate per firm quality or ethics procedure if unresolved",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "medium",
    rot(3)
  ),
  makeQ(
    "When a journalist calls asking you to comment on a confidential redevelopment you are advising on, what aligns with RICS Rules of Conduct?",
    "Decline comment, refer to the client communications lead, and do not disclose confidential information",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "easy",
    rot(4)
  ),
  makeQ(
    "When you are asked to act as expert witness on a dispute involving a former client whose files you still hold, what aligns with RICS Rules of Conduct?",
    "Run conflict checks, consider prior knowledge bias, and confirm terms with legal teams before accepting",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "hard",
    rot(5)
  ),
  makeQ(
    "When your fee proposal underestimated scope due to your error and mid-project extra work is substantial, what aligns with RICS Rules of Conduct?",
    "Notify the client promptly, explain the error, and agree a variation or recovery plan",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "medium",
    rot(6)
  ),
  makeQ(
    "When a friend buying a flat asks for an informal quick opinion on value using your firm data, what aligns with RICS Rules of Conduct?",
    "Explain you cannot provide informal advice and offer a formal conflict-checked appointment if appropriate",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "medium",
    rot(7)
  ),
  makeQ(
    "When your supervisor instructs you to discriminate in site access scheduling against a contractor they dislike, what aligns with RICS Rules of Conduct?",
    "Refuse, cite equal treatment and conduct standards, and escalate if pressure continues",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "hard",
    rot(8)
  ),
  makeQ(
    "When a client asks you to certify works you have not personally inspected, what aligns with RICS Rules of Conduct?",
    "Refuse certification until appropriate inspection confirms compliance with criteria",
    [
    { text: "Proceed without disclosure if discovery is unlikely", why: "Ethical duty does not depend on likelihood of discovery." },
    { text: "Ask a colleague to act as proxy to avoid your involvement", why: "Circumventing conflict rules through proxies is still a breach." },
    { text: "Comply silently to preserve the client relationship", why: "Silent compliance with unethical requests is a conduct breach." },
    ],
    "Conduct requires early identification, disclosure, and appropriate action.",
    "hard",
    rot(9)
  ),
  makeQ(
    "In a UK surveying practice scenario involving whistleblowing on unsafe practice you observe on site, what is the ethical response?",
    "Use the firm speak-up policy and escalate through proper channels",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Reporting via approved channels protects integrity and legal position.",
    "medium",
    rot(10)
  ),
  makeQ(
    "In a UK surveying practice scenario involving preparing a competing bid using insider knowledge from a confidential instruction, what is the ethical response?",
    "Withdraw or obtain informed consent after full disclosure to affected parties",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Insider advantage from confidential data is prohibited.",
    "medium",
    rot(11)
  ),
  makeQ(
    "In a UK surveying practice scenario involving posting project progress on personal social media without client approval, what is the ethical response?",
    "Do not post confidential information without explicit client authority",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Public posts can breach confidentiality even if positive.",
    "medium",
    rot(12)
  ),
  makeQ(
    "In a UK surveying practice scenario involving being asked to act simultaneously as employer agent and tenant advisor on the same asset, what is the ethical response?",
    "Decline the dual appointment or obtain informed consent with clear safeguards",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Dual roles create inherent conflict without managed consent.",
    "medium",
    rot(13)
  ),
  makeQ(
    "In a UK surveying practice scenario involving delaying communication of a material cost overrun until after fee payment, what is the ethical response?",
    "Communicate material issues promptly regardless of billing timing",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Commercial timing must not override honesty.",
    "medium",
    rot(14)
  ),
  makeQ(
    "In a UK surveying practice scenario involving using an outdated or incorrect professional designation on client correspondence, what is the ethical response?",
    "Use an accurate regulated title and correct post-nominal designation",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Misleading credentials breaches public trust.",
    "medium",
    rot(15)
  ),
  makeQ(
    "In a UK surveying practice scenario involving accepting an instruction clearly beyond your competence without support, what is the ethical response?",
    "Decline or obtain supervision from a competent colleague with client agreement",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Competence boundaries protect clients and professionals.",
    "medium",
    rot(16)
  ),
  makeQ(
    "In a UK surveying practice scenario involving a third party requests your client report without authorisation, what is the ethical response?",
    "Refuse disclosure unless the client authorises release",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Client control of information is fundamental to conduct.",
    "medium",
    rot(17)
  ),
  makeQ(
    "In a UK surveying practice scenario involving pressure to facilitate an inflated insurance claim via your valuation, what is the ethical response?",
    "Refuse and consider conduct reporting obligations",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Integrity prohibits facilitating unlawful or dishonest claims.",
    "medium",
    rot(18)
  ),
  makeQ(
    "In a UK surveying practice scenario involving anonymously leaking safety concerns to the press instead of internal reporting, what is the ethical response?",
    "Use internal and regulatory channels rather than anonymous leaks",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Proper channels preserve process and confidentiality.",
    "medium",
    rot(19)
  ),
  makeQ(
    "In a UK surveying practice scenario involving marking up subcontractor quotes without disclosing commercial policy to the client, what is the ethical response?",
    "Disclose the basis of estimate and any mark-up policy transparently",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Transparency on commercial arrangements is required.",
    "medium",
    rot(20)
  ),
  makeQ(
    "In a UK surveying practice scenario involving drafting an expert report to favour the instructing party regardless of opinion, what is the ethical response?",
    "Maintain independent expert duties and state opinions honestly",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Experts must not become hired advocates.",
    "medium",
    rot(21)
  ),
  makeQ(
    "In a UK surveying practice scenario involving retaining client documents indefinitely after appointment ends, what is the ethical response?",
    "Follow retention policy and return or destroy records per agreement and law",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Document handling must respect contract and legal duties.",
    "medium",
    rot(22)
  ),
  makeQ(
    "In a UK surveying practice scenario involving pressure from a manager to hide a contractor error from the client, what is the ethical response?",
    "Disclose the material error through proper channels",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Concealing material errors misleads the client.",
    "medium",
    rot(23)
  ),
  makeQ(
    "In a UK surveying practice scenario involving a overseas agent requests a facilitation payment to expedite permits, what is the ethical response?",
    "Apply anti-bribery policy regardless of local custom",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "UK firms remain bound by anti-bribery obligations abroad.",
    "medium",
    rot(24)
  ),
  makeQ(
    "In a UK surveying practice scenario involving using a client logo in your firm marketing brochure without consent, what is the ethical response?",
    "Obtain written marketing consent before using client branding",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Marketing use of client identity requires permission.",
    "medium",
    rot(25)
  ),
  makeQ(
    "In a UK surveying practice scenario involving undertaking paid outside work that conflicts with your employer duties, what is the ethical response?",
    "Disclose outside interests per firm policy and avoid unmanaged conflict",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Undisclosed conflicts of interest breach conduct.",
    "medium",
    rot(26)
  ),
  makeQ(
    "In a UK surveying practice scenario involving certifying practical completion prematurely to trigger a client bonus, what is the ethical response?",
    "Certify only when completion criteria are genuinely met",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Premature certification is misleading and high risk.",
    "medium",
    rot(27)
  ),
  makeQ(
    "In a UK surveying practice scenario involving altering a site diary entry after a safety incident, what is the ethical response?",
    "Never alter records; report the incident through proper process",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Record integrity is essential for investigations and trust.",
    "medium",
    rot(28)
  ),
  makeQ(
    "In a UK surveying practice scenario involving advising on a development where you hold undeclared shares in the promoter, what is the ethical response?",
    "Disclose financial interest and withdraw if conflict cannot be managed",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Undisclosed financial interests corrupt independence.",
    "medium",
    rot(29)
  ),
  makeQ(
    "In a UK surveying practice scenario involving a contractor asks you to pressure a trainee to skip a mandatory safety briefing, what is the ethical response?",
    "Refuse and report through safety and conduct routes",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Safety and ethical lines must not be crossed for programme.",
    "medium",
    rot(30)
  ),
  makeQ(
    "In a UK surveying practice scenario involving offered a success fee by a contractor on a project where you certify payments, what is the ethical response?",
    "Decline undisclosed third-party payments linked to client work",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Undisclosed financial ties create corrupt influence.",
    "medium",
    rot(31)
  ),
  makeQ(
    "In a UK surveying practice scenario involving sharing your login credentials for a client document portal with a colleague, what is the ethical response?",
    "Never share credentials; use individual authorised access only",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Credential sharing breaches security and accountability.",
    "medium",
    rot(32)
  ),
  makeQ(
    "In a UK surveying practice scenario involving ghost-writing a client board submission presented as independent surveyor advice, what is the ethical response?",
    "Ensure authorship and reliance are transparent to all parties",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Misrepresenting authorship is misleading conduct.",
    "medium",
    rot(33)
  ),
  makeQ(
    "In a UK surveying practice scenario involving ignoring modern slavery indicators in a proposed subcontractor chain, what is the ethical response?",
    "Raise concerns through client and firm reporting routes",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Professional duty includes ethical supply chain awareness.",
    "medium",
    rot(34)
  ),
  makeQ(
    "In a UK surveying practice scenario involving guaranteeing planning approval in writing to secure an instruction, what is the ethical response?",
    "Do not guarantee outcomes outside your control",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Misleading certainty on discretionary decisions is unethical.",
    "medium",
    rot(35)
  ),
  makeQ(
    "In a UK surveying practice scenario involving selectively excluding unfavourable comparables to meet a client target value, what is the ethical response?",
    "Apply consistent methodology and disclose limitations",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Methodology must not be manipulated for preferred outcomes.",
    "medium",
    rot(36)
  ),
  makeQ(
    "In a UK surveying practice scenario involving continuing to sign certificates after significant alcohol at a client lunch, what is the ethical response?",
    "Withdraw from professional duties until fit and disclose if necessary",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Fitness to practise includes sobriety when advising.",
    "medium",
    rot(37)
  ),
  makeQ(
    "In a UK surveying practice scenario involving capturing drone imagery that includes neighbouring private gardens, what is the ethical response?",
    "Ensure lawful data capture and privacy compliance before use",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Technical capability does not override privacy law.",
    "medium",
    rot(38)
  ),
  makeQ(
    "In a UK surveying practice scenario involving backdating a letter of appointment to meet a client audit deadline, what is the ethical response?",
    "Refuse to backdate; use actual instruction dates only",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Accurate dating of appointments is essential.",
    "medium",
    rot(39)
  ),
  makeQ(
    "In a UK surveying practice scenario involving coordinating tender pricing with a competitor to reduce fee competition, what is the ethical response?",
    "Refuse any anti-competitive coordination",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Collusion is unlawful and serious misconduct.",
    "medium",
    rot(40)
  ),
  makeQ(
    "In a UK surveying practice scenario involving withholding a safety-critical report during a fee dispute with the client, what is the ethical response?",
    "Do not withhold safety-critical information for commercial leverage",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Safety information must not be used as commercial hostage.",
    "medium",
    rot(41)
  ),
  makeQ(
    "In a UK surveying practice scenario involving fabricating CPD entries before APC submission, what is the ethical response?",
    "Maintain honest CPD records supported by evidence only",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Fabrication is serious misconduct.",
    "medium",
    rot(42)
  ),
  makeQ(
    "In a UK surveying practice scenario involving inadvertently advising both parties in a boundary dispute without conflict check, what is the ethical response?",
    "Conduct an immediate conflict check and withdraw from one party",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Even inadvertent conflicts require prompt remedy.",
    "medium",
    rot(43)
  ),
  makeQ(
    "In a UK surveying practice scenario involving telling a client the local council will definitely approve their scheme, what is the ethical response?",
    "Avoid guarantees; explain decision-maker independence",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Do not imply control over third-party decisions.",
    "medium",
    rot(44)
  ),
  makeQ(
    "In a UK surveying practice scenario involving using discriminatory language during site banter without challenge, what is the ethical response?",
    "Challenge behaviour and report through HR and conduct routes",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Conduct requires dignity and respect.",
    "medium",
    rot(45)
  ),
  makeQ(
    "In a UK surveying practice scenario involving recording a site inspection you did not attend to save time, what is the ethical response?",
    "Record inspections honestly with accurate attendance",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "False records undermine trust and may constitute fraud.",
    "medium",
    rot(46)
  ),
  makeQ(
    "In a UK surveying practice scenario involving accepting cryptocurrency payment off books for a private survey, what is the ethical response?",
    "Follow firm financial and anti-money-laundering procedures",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Off-book payments may breach AML and tax law.",
    "medium",
    rot(47)
  ),
  makeQ(
    "In a UK surveying practice scenario involving failing to declare a close family relationship with a contractor bidding to your client, what is the ethical response?",
    "Disclose prior relationships affecting independence before continuing",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Personal relationships can create perception of bias.",
    "medium",
    rot(48)
  ),
  makeQ(
    "In a UK surveying practice scenario involving billing hours for work performed by an unsupervised graduate as your own senior work, what is the ethical response?",
    "Bill only executed work with transparent records and appropriate grade",
    [
    { text: "Ignore the issue unless a formal investigation is already open", why: "Ignoring known issues can compound harm and breach professional duty." },
    { text: "Handle the matter informally with no records to protect relationships", why: "Undocumented informal handling weakens accountability." },
    { text: "Delay action until the project ends to avoid disruption", why: "Material conduct issues require timely action." },
    ],
    "Misrepresented billing is dishonest and potentially fraudulent.",
    "medium",
    rot(49)
  ),
];

