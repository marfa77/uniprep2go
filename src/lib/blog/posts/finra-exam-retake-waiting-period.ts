import type { BlogPostDraft } from "../types";

const CHECKED = "23 Nov 2026";

export const finraRetakeWaitingPeriodPost: BlogPostDraft = {
  slug: "finra-exam-retake-waiting-period-2027",
  title: "FINRA retake waiting periods: what changes on January 19, 2027",
  titleTag: "FINRA Exam Retake Wait Drops to 15 Days on Jan 19, 2027",
  metaDescription:
    "From 19 Jan 2027 FINRA cuts exam retake waits from 30 to 15 days after a 1st or 2nd fail, and from 180 to 60 after a 3rd. Which exams it covers.",
  publishedAt: "2026-11-23",
  eyebrow: "FINRA · Qualification exams",
  clusterId: "finra-sie",
  relatedSlugs: ["finra-sie-exam-prep-why-people-fail", "finra-options-questions-read-without-getting-tricked"],
  intro:
    "**FINRA is shortening the time you must wait before retaking a failed qualification exam. From 19 January 2027 the wait after a first or second failed attempt drops from 30 to 15 days, and after a third or later failure from 180 to 60 days.** The change comes from FINRA Regulatory Notice 26-18, which amends Rule 1210.06. It covers FINRA's own exams, such as the SIE, Series 6 and Series 7, and not NASAA's Series 63, 65 or 66. Everything below is from FINRA, checked " +
    CHECKED +
    ". If you are preparing for a retake now, the [SIE practice test](/mock-exams/sie-full-mock) and the [Series 7 practice test](/mock-exams/series-7-readiness-check) score you by FINRA section.",
  mockSlug: "sie-full-mock",
  deckSlug: "sie-exam-anki-deck",
  cta: {
    mockLabel: "Take the free SIE practice test",
    deckLabel: "SIE Anki deck",
    summary:
      "Use the waiting period well: find weak sections with the free [SIE practice test](/mock-exams/sie-full-mock) or [Series 7 practice test](/mock-exams/series-7-readiness-check), then drill them with the [SIE deck](/decks/sie-exam-anki-deck) or [Series 7 deck](/decks/series-7-anki-deck).",
  },
  sections: [
    {
      heading: "What changes on January 19, 2027?",
      blocks: [
        {
          type: "table",
          caption: "FINRA qualification exam retake waits (Regulatory Notice 26-18)",
          headers: ["After this failed attempt", "Wait until 18 Jan 2027", "Wait from 19 Jan 2027"],
          rows: [
            ["1st", "30 days", "15 days"],
            ["2nd", "30 days", "15 days"],
            ["3rd or later (within two years)", "180 days", "60 days"],
          ],
        },
        {
          type: "p",
          text: "Waits are counted in calendar days. Failures more than two years old do not count toward the third-attempt rule.",
        },
      ],
    },
    {
      heading: "Which exams does the change cover?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Covered:** all FINRA qualification examinations, including the SIE and representative exams such as the Series 6 and Series 7.",
            "**Not covered:** exams FINRA administers for NASAA (Series 63, 65 and 66) or other organizations. FINRA says their waiting periods may differ.",
            "**NASAA's own change:** FINRA's Series 63 and 65 pages state that from 4 Jan 2027 NASAA keeps 30 days after the first and second failures and cuts the wait after the third from 180 to 60 days. There is no 15-day wait for NASAA exams.",
          ],
        },
      ],
    },
    {
      heading: "How do the waits apply to each exam?",
      blocks: [
        {
          type: "ul",
          items: [
            "**Per exam:** a waiting period applies only to the exam you failed. Failing the SIE does not create a waiting period for the Series 7.",
            "**Testing window:** an enrollment opens a 120-day window to test with Prometric, FINRA's test-delivery vendor.",
            "**Open enrollments:** new enrollments, and open enrollments without an appointment, switch to the shorter waits automatically on 19 Jan 2027.",
            "**Already booked:** if you have a retake appointment, FINRA can only apply the shorter wait by cancelling it. FINRA says it will contact affected candidates, and rescheduling fees may apply.",
          ],
        },
      ],
    },
    {
      heading: "What should you do during the wait?",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Read your score report by section",
              body: "Find the sections that cost you the most. On the SIE, Understanding Products and Their Risks is the largest; on the Series 7, Function 3 carries 91 of 125 scored items.",
            },
            {
              title: "Rebuild weak areas, not everything",
              body: "Fifteen days is short. Spend it on the two weakest sections and daily recall with the [SIE deck](/decks/sie-exam-anki-deck) or [Series 7 deck](/decks/series-7-anki-deck).",
            },
            {
              title: "Re-test yourself under time",
              body: "Take a full timed run on the [SIE practice test](/mock-exams/sie-full-mock) or [Series 7 practice test](/mock-exams/series-7-readiness-check) before you book the retake.",
            },
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      question: "How long do I have to wait to retake a FINRA exam?",
      answer:
        "Until 18 Jan 2027: 30 days after a first or second failure and 180 days after a third within two years. From 19 Jan 2027: 15 days and 60 days (FINRA Regulatory Notice 26-18).",
    },
    {
      question: "Does the 15-day wait apply to the SIE?",
      answer: "Yes. FINRA says the waiting periods apply to all FINRA qualification exams, including the SIE.",
    },
    {
      question: "Does the change apply to the Series 63, 65 or 66?",
      answer:
        "No. Those are NASAA exams. From 4 Jan 2027 NASAA keeps 30 days after the first and second failures and reduces the third-failure wait to 60 days.",
    },
    {
      question: "If I fail the SIE, do I have to wait to take the Series 7?",
      answer: "No. The waiting period applies only to the exam you failed.",
    },
    {
      question: "I already booked a retake. Will my wait get shorter?",
      answer:
        "Only if FINRA cancels and you rebook; FINRA says it will contact affected candidates and that rescheduling fees may apply. Enrollments without an appointment adjust automatically.",
    },
    {
      question: "Do old failures count toward the 60-day rule?",
      answer: "Only failures within the last two years count toward the third-attempt waiting period.",
    },
  ],
  bottomLine:
    "From 19 Jan 2027, FINRA exams (SIE, Series 6, Series 7 and the other FINRA qualification exams) need 15 days between the first retakes and 60 days after a third failure. NASAA's Series 63, 65 and 66 follow NASAA's rules. Sources: [FINRA Regulatory Notice 26-18](https://www.finra.org/rules-guidance/notices/26-18), [FINRA Series 7](https://www.finra.org/registration-exams-ce/qualification-exams/series7) and [FINRA Series 63](https://www.finra.org/registration-exams-ce/qualification-exams/series63), checked " +
    CHECKED +
    ".",
};
