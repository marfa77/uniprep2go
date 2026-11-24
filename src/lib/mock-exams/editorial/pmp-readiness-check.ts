import type { MockEditorialBundle } from "./types";
import {
  FREE_DIAGNOSTIC_QUESTIONS,
  MOCK_PASS_PRICE_USD,
  mockAccessLine,
  requireMockConfig,
  topicQuestions,
} from "./config-copy";

const CHECKED = "23 Nov 2026";
const SLUG = "pmp-readiness-check";
const config = requireMockConfig(SLUG);
const people = topicQuestions(config, "people");
const process = topicQuestions(config, "process");
const business = topicQuestions(config, "business-environment");
const target = config.topics[0]?.targetPercent ?? config.passRule.passPercent;

export const pmpEditorial: MockEditorialBundle = {
  slug: SLUG,
  howToPrepare: `Confirm your eligibility and 35 training hours first, since PMI must accept your application before you can book. Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start to see which of the three ECO domains is weakest, study by ECO task, and drill terms and agile practices in the [PMP Anki deck](/decks/pmp-anki-deck).`,
  sections: [
    {
      heading: "PMP exam facts: questions, time, breaks and delivery",
      paragraphs: [
        "PMI (Project Management Institute) owns the PMP. Exams follow the **Examination Content Outline (ECO) for the July 2026 exam update** (document revised 11 Aug 2026). Pearson VUE delivers it.",
      ],
      bullets: [
        "**Questions:** 180, of which **170 are scored** and **10 are unscored pretest** items placed at random.",
        "**Time:** 240 minutes, with **two 10-minute breaks**. Once you start a break you cannot go back to the previous section.",
        "**Question types:** multiple choice (single and multiple response), matching and enhanced matching, point-and-click, pull-down lists, and two newer types, **case or scenario** sets and **graphic-based** questions that ask you to read charts or diagrams.",
        "**Delivery:** at a Pearson VUE test center (PMI's recommended option) or online with OnVue proctoring.",
        "**Scoring:** the ECO does not publish a passing percentage; PMI points to the exam reporting section of its Certification Handbook.",
      ],
    },
    {
      heading: "Who is eligible to sit the PMP",
      paragraphs: [
        "You need **one** education-and-experience path, with all experience **leading projects** gained in the last 10 years and not double-counted for overlapping projects:",
      ],
      bullets: [
        "Secondary school (high school diploma or equivalent): **60 months**.",
        "Associate's-level or post-secondary vocational qualification: **48 months**.",
        "Bachelor's degree or higher: **36 months**.",
        "Bachelor's or postgraduate degree from a PMI GAC-accredited program: **24 months**.",
        "Plus **35 hours** of project management training, or an active **CAPM**. From **1 Dec 2026**, live instructor-led training counts only from a PMI Authorized Training Partner, a China REP, or an accredited higher-education or GAC program. Self-paced on-demand courses with an end-of-course assessment still count.",
      ],
    },
    {
      heading: "What the three ECO domains test",
      paragraphs: [
        "Predictive, agile and hybrid approaches run through **all three domains**: about **40%** of items are predictive and the other **60%** are split between adaptive/agile and hybrid.",
      ],
      bullets: [
        `**People — 33%:** 8 tasks: develop a common vision, manage conflicts, lead the team, engage stakeholders, align and manage stakeholder expectations, help ensure knowledge transfer, and plan and manage communication. This check draws ${people}.`,
        `**Process — 41%:** 10 tasks: integrated planning and delivery approach, scope, value-based delivery, resources, procurement, finance, quality, schedule, evaluating project status, and closure. This check draws ${process}.`,
        `**Business Environment — 26%:** 8 tasks: governance, compliance, change control, impediments and issues, risk, continuous improvement, organizational change, and changes in the external business environment. This check draws ${business}.`,
      ],
    },
    {
      heading: "Retakes and the one-year eligibility period",
      paragraphs: [
        "Once PMI approves your application you have a **1-year eligibility period** and may take the exam **up to three times** within it. After a third failed attempt you must wait **one year** from that exam before reapplying for the PMP; you can still apply for other PMI certifications in that year. If the eligibility period runs out before you pass, you reapply, with no waiting period.",
      ],
    },
    {
      heading: "A 4-week PMP study plan on the ECO",
      paragraphs: [
        `**Week 1:** Take the free ${FREE_DIAGNOSTIC_QUESTIONS}-question start. Mark ECO tasks you have never done at work; scenario questions catch you there.`,
        "**Week 2:** Process (41%), task by task: integrated planning and choosing a delivery approach, scope, schedule, finance, quality, procurement, status, and closure. Know the predictive and the agile or hybrid version of each.",
        "**Week 3:** People and Business Environment: conflict, team leadership, stakeholders, governance, compliance, risk, and change. Drill terms and agile ceremonies in the [PMP flashcards](/decks/pmp-anki-deck).",
        `**Week 4:** Sit the full ${config.questionCount}-question / ${config.durationMinutes}-minute check. It passes only when **all three domains reach ${target}%**, so a strong Process score cannot hide a weak domain. Then move to full 180-question practice for stamina. Access: ${mockAccessLine(config)}. Not eligible yet? See the [CAPM practice test](/mock-exams/capm-readiness-check).`,
      ],
    },
    {
      heading: "What trips PMP candidates",
      paragraphs: [],
      bullets: [
        "Answering from one company's habits instead of the approach the scenario calls for, whether predictive, agile or hybrid.",
        "Escalating or going to the sponsor first, when the scenario expects the project manager to analyze and act within their own authority.",
      ],
    },
  ],
  faqs: [
    {
      question: "How many questions are on the PMP exam and how long is it?",
      answer:
        "180 questions (170 scored, 10 unscored pretest) in 240 minutes, with two 10-minute breaks (PMI PMP Examination Content Outline, revised 11 Aug 2026; checked 23 Nov 2026).",
    },
    {
      question: "How many times can I retake the PMP?",
      answer:
        "Up to three times within your 1-year eligibility period. After three attempts you wait one year from the last exam before reapplying.",
    },
    {
      question: "Can I take the PMP online?",
      answer:
        "Yes. You can test at a Pearson VUE center (PMI's recommended option) or online with OnVue proctoring.",
    },
    {
      question: "What are the PMP eligibility requirements?",
      answer:
        "36 months leading projects with a bachelor's degree (48 with an associate's, 60 with secondary school, 24 with a GAC-accredited degree), within the last 10 years, plus 35 hours of training or an active CAPM.",
    },
    {
      question: "What changes for PMP training hours on 1 Dec 2026?",
      answer:
        "From 1 Dec 2026, live instructor-led training counts toward the 35 hours only from a PMI Authorized Training Partner, a China REP, or an accredited higher-education or GAC program.",
    },
    {
      question: "How long is the UniPrep2Go PMP practice test?",
      answer: `The free start is ${FREE_DIAGNOSTIC_QUESTIONS} questions. The full check is ${config.questionCount} questions in ${config.durationMinutes} minutes (${people} People, ${process} Process, ${business} Business Environment), with unlimited retakes on UniPrep Mock Pass ($${MOCK_PASS_PRICE_USD}, unlimited mocks).`,
    },
  ],
  sources: [
    {
      label: "PMI — PMP Examination Content Outline, July 2026 exam update (PDF)",
      url: "https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/pmp/pmp-examination-content-outline.pdf",
      checked: CHECKED,
    },
    {
      label: "PMI — Project Management Professional (PMP) certification",
      url: "https://www.pmi.org/certifications/project-management-pmp",
      checked: CHECKED,
    },
  ],
};
