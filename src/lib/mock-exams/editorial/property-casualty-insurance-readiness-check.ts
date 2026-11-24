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
const SLUG = "property-casualty-insurance-readiness-check";
const config = requireMockConfig(SLUG);
const largestLine = largestTopicsLine(config);

export const propertyCasualtyInsuranceEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Start with your state's candidate handbook and check which license you are testing for, since some states offer both a full Property & Casualty and a narrower personal-lines license. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start on the general concepts, then drill coverage and exclusions in the [P&C Anki deck](/decks/property-casualty-insurance-exam-anki-deck).`,
  sections: [
    {
      heading: "Who sets the Property & Casualty exam, and what differs by state",
      paragraphs: [
        "Property & Casualty producer licenses are issued by **state insurance regulators**, not by a national body. Each state publishes a candidate handbook and content outline through its test vendor (for example Pearson VUE or PSI), and that handbook sets the question count, time, fee, passing score and retake rules.",
        "Most outlines combine a **general knowledge** part on property and casualty policies with a **state-specific** part on that state's insurance code. Some states offer more than one license: Texas, for example, has a General Lines – Property and Casualty license and a narrower **Personal Lines** Property and Casualty license with its own shorter exam.",
      ],
    },
    {
      heading: "Example: the Texas Property and Casualty exam facts",
      paragraphs: [
        "These numbers are **Texas-only** (Pearson VUE Texas candidate handbook, October 2024 edition, and content outlines effective 1 Sep 2026).",
      ],
      bullets: [
        "**General Lines – Property and Casualty:** exam fee **$49**, **150 minutes**, at a Pearson VUE test center. A general section of **100 scored questions plus 10 pretest**, and a Texas section of **30 scored plus 5 pretest**, scored as one exam.",
        "**Personal Lines Property and Casualty:** exam fee **$39**, **120 minutes**. A general section of 75 scored plus 5 pretest and a Texas section of 25 scored plus 5 pretest.",
        "**Passing score:** a **scaled score of 70** (range 0–100) set by the Texas Department of Insurance. It is not the percent of questions answered correctly.",
        "**Retakes:** you can book a new exam within one day of a failed attempt, and attempts are unlimited.",
        "**After passing:** apply within **one year** or retake the exam; the application fee is $50. Holders of the CPCU designation are exempt from the exam.",
      ],
    },
    {
      heading: "What the Property & Casualty content outline tests",
      paragraphs: [
        "In the Texas General Lines outline, the 100 scored general items split between property and casualty:",
      ],
      bullets: [
        "**Property (50 items):** types of policies, including dwelling and homeowners forms and the commercial package policy (22); insurance terms and related concepts such as risk, hazard, insurable interest and valuation (15); policy provisions and contract law, including declarations, insuring agreements, conditions and proof of loss (13).",
        "**Casualty (50 items):** types of policies, bonds and related terms, including commercial general liability and personal and business auto (23); insurance terms and related concepts (15); policy provisions (12).",
        "**Texas law (30 items):** statutes and rules common to property and casualty insurance (18) and rules specific to property and casualty lines (12).",
        `This check's ${config.questionCount}-question session covers the general part, led by ${largestLine}. It does not include any state's law questions.`,
      ],
    },
    {
      heading: "A 3-week Property & Casualty study plan",
      paragraphs: [
        `**Week 1:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start, then ${topicLabel(config, "pc-general")} and ${topicLabel(config, "pc-property-basics")}: perils versus hazards, actual cash value versus replacement cost, coinsurance, and how a policy is built (declarations, insuring agreement, conditions, exclusions).`,
        `**Week 2:** ${topicLabel(config, "pc-dwelling-homeowners")}, ${topicLabel(config, "pc-auto")}, then ${topicLabel(config, "pc-casualty")} and ${topicLabel(config, "pc-commercial-property")}. Note what each form covers, excludes and who is an insured, and drill those in the [Anki deck](/decks/property-casualty-insurance-exam-anki-deck).`,
        `**Week 3:** Your state's law section from its handbook, then the full ${config.questionCount}-question / ${config.durationMinutes}-minute mock. Retake on a fresh draw. Access: ${mockAccessLine(config)}.`,
        "If you also plan to sell life or health products, the [Life & Health practice test](/mock-exams/life-and-health-insurance-readiness-check) covers the other major line.",
      ],
    },
    {
      heading: "What trips Property & Casualty candidates",
      paragraphs: [],
      bullets: [
        "Memorizing form names without knowing what each covers; questions usually describe a loss and ask whether and how it is paid.",
        "Studying for the full license when your state offers, and you applied for, the narrower personal-lines exam, or the reverse.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is the Property and Casualty exam the same in every state?",
      answer:
        "No. Each state sets its own exam through its test vendor's handbook. Topics like homeowners, auto and commercial liability are similar, but length, fee, passing score, retake rules and the state-law section differ.",
    },
    {
      question: "How many questions are on the Texas Property and Casualty exam?",
      answer:
        "The Texas General Lines – Property and Casualty exam has 100 scored general questions plus 10 pretest, and 30 scored Texas questions plus 5 pretest, in 150 minutes (Pearson VUE Texas handbook and outlines, checked 23 Nov 2026).",
    },
    {
      question: "What is the difference between the Texas General Lines and Personal Lines P&C exams?",
      answer:
        "Personal Lines is a narrower license with a shorter exam: 75 scored general and 25 scored Texas questions in 120 minutes, versus 100 and 30 in 150 minutes for General Lines.",
    },
    {
      question: "What score do I need to pass the Texas P&C exam?",
      answer:
        "A scaled score of 70 on a 0–100 scale, set by the Texas Department of Insurance. The scaled score is not a percentage of correct answers.",
    },
    {
      question: "How long is the UniPrep2Go Property & Casualty practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes on general P&C concepts, with unlimited retakes on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks). It does not cover any state's law section.`,
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
      label: "Texas Department of Insurance — general lines property and casualty license",
      url: "https://www.tdi.texas.gov/agent/general-property-apply.html",
      checked: CHECKED,
    },
  ],
};
