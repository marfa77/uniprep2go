import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  largestTopicsLine,
  topicLabel,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "life-and-health-insurance-readiness-check";
const config = requireMockConfig(SLUG);
const largestLine = largestTopicsLine(config);

export const lifeHealthInsuranceEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Find your state's candidate handbook first: the state sets the exam, its length and its passing score. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start for the general life and health concepts every state tests, then study your state's law section from its own content outline. Drill provisions in the [Life & Health Anki deck](/decks/life-and-health-insurance-exam-anki-deck).`,
  sections: [
    {
      heading: "Who sets the Life & Health exam, and why the details differ by state",
      paragraphs: [
        "There is no national Life & Health licensing exam. **State insurance regulators license producers**, and each state publishes a candidate handbook and content outline through its test vendor (for example Pearson VUE or PSI). The number of questions, the time, the fee, the passing score and the retake rules all come from that handbook.",
        "What is similar across states is the structure: a **general knowledge** part on life insurance, annuities and health insurance, and a **state-specific** part on that state's insurance code, licensing rules and marketing practices.",
      ],
    },
    {
      heading: "Example: the Texas Life, Accident and Health exam facts",
      paragraphs: [
        "These numbers are **Texas-only** (Pearson VUE Texas candidate handbook, October 2024 edition, and content outlines effective 1 Sep 2026); other states differ.",
      ],
      bullets: [
        "**Exam:** General Lines – Life, Accident and Health, delivered by Pearson VUE at a test center. Exam fee **$49**, time **150 minutes**.",
        "**Length:** a general section of **100 scored questions plus 10 pretest**, and a Texas section of **30 scored plus 5 pretest**. The score is for the exam as a whole, not each part separately.",
        "**Passing score:** **70 on a scaled 0–100 score** set by the Texas Department of Insurance. The scaled score is neither the number nor the percent of questions answered correctly.",
        "**Retakes:** after a failed attempt you can book a new exam within one day, and there is no limit on attempts.",
        "**After passing:** apply for the license within **one year**, or retake the exam. The application fee is $50, and most applicants complete IdentoGO fingerprinting. Holders of the CLU designation are exempt from the exam.",
      ],
    },
    {
      heading: "What the Life & Health content outline tests",
      paragraphs: [
        "Using the Texas general-knowledge outline as the example, the 100 scored general items split evenly between life and health:",
      ],
      bullets: [
        "**Life (50 items):** types of policies including whole life, universal and variable life, and annuities (15); policy riders, provisions, options and exclusions (15); completing the application, underwriting and delivering the policy, including replacement, disclosures, anti-money-laundering and privacy rules (12); retirement and other insurance concepts (8).",
        "**Health (50 items):** types of health policies (16); policy provisions, clauses and riders (15); field underwriting procedures (8); social insurance (6); other concepts such as tax treatment of premiums and managed care (5).",
        "**Texas law (30 items):** rules common to life and health (14), life only (6), accident and health only (7), and HMOs (3).",
        `This check's ${config.questionCount}-question session covers the general part, led by ${largestLine}. It does not test any state's law section; use your state's outline for that.`,
      ],
    },
    {
      heading: "A 3-week Life & Health study plan",
      paragraphs: [
        `**Week 1:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Study ${topicLabel(config, "ins-general")} and ${topicLabel(config, "ins-life-basics")}: insurable interest, risk, contract law, and the main policy types.`,
        `**Week 2:** ${topicLabel(config, "ins-provisions")}, ${topicLabel(config, "ins-annuities")}, and ${topicLabel(config, "ins-health")}. For each rider and provision, note what it does and when it applies. Drill them in the [Anki deck](/decks/life-and-health-insurance-exam-anki-deck).`,
        `**Week 3:** Your state's law section from its handbook, then the full ${config.questionCount}-question / ${config.durationMinutes}-minute mock. Retake on a fresh draw. Access: ${mockAccessLine(config)}.`,
        "Some states also require prelicensing education. California, for example, requires a 12-hour course on ethics and the California Insurance Code (including one hour on insurance fraud) for Life and for Accident and Health licenses. Check your state's rule before you book.",
      ],
    },
    {
      heading: "What trips Life & Health candidates",
      paragraphs: [],
      bullets: [
        "Studying a national course and skipping the state-law section, which is scored with the rest of the exam.",
        "Mixing up similar provisions, such as grace period versus reinstatement, or the incontestable clause versus the suicide clause.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is the Life and Health insurance exam the same in every state?",
      answer:
        "No. Each state sets its own exam through its test vendor's candidate handbook: length, time, fee, passing score and retake rules differ. The general life, annuity and health topics are similar; the state-law section is unique to each state.",
    },
    {
      question: "How many questions are on the Texas Life and Health exam?",
      answer:
        "The Texas General Lines – Life, Accident and Health exam has 100 scored general questions plus 10 pretest, and 30 scored Texas questions plus 5 pretest, in 150 minutes (Pearson VUE Texas handbook and outlines, checked 23 Nov 2026).",
    },
    {
      question: "What score do I need to pass the Texas Life and Health exam?",
      answer:
        "A scaled score of 70 on a 0–100 scale, set by the Texas Department of Insurance. It is not 70% of questions correct.",
    },
    {
      question: "Do I need prelicensing education before the Life and Health exam?",
      answer:
        "It depends on the state. California requires a 12-hour ethics and California Insurance Code course for Life and for Accident and Health licenses (California Department of Insurance).",
    },
    {
      question: "How long is the UniPrep2Go Life & Health practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes on general life and health concepts, with unlimited retakes on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks). It does not cover any state's law section.`,
    },
  ],
  sources: [
    {
      label: "NAIC — producer licensing (state regulators license producers)",
      url: "https://content.naic.org/cipr-topics/producer-licensing",
      checked: CHECKED,
    },
    {
      label: "Pearson VUE — Texas insurance licensing (candidate handbook and content outlines)",
      url: "https://www.pearsonvue.com/us/en/tx/insurance.html",
      checked: CHECKED,
    },
    {
      label: "Texas Department of Insurance — general lines life, accident, health and HMO license",
      url: "https://www.tdi.texas.gov/agent/general-life-apply.html",
      checked: CHECKED,
    },
    {
      label: "California Department of Insurance — 12-hour prelicensing study",
      url: "https://www.insurance.ca.gov/0200-industry/0030-seek-pre-lic/",
      checked: CHECKED,
    },
  ],
};
