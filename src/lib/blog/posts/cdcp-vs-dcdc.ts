import type { BlogPostDraft } from "../types";

export const cdcpVsDcdcPost: BlogPostDraft = {
  slug: "cdcp-vs-dcdc-data-center-certification-first-step",
  title: "CDCP vs DCDC: Which Data Center Certification Should You Get First?",
  titleTag: "CDCP vs DCDC: Data Center Certification Comparison & First Step",
  metaDescription:
    "CDCP is a 2-day course with no prerequisites. DCDC requires 3 years of experience and costs $725. Here is which one opens doors, and which one closes them if you pick it too early.",
  publishedAt: "2026-07-28",
  eyebrow: "CDCP · Data center infrastructure",
  clusterId: "cdcp",
  relatedSlugs: [
    "well-ap-vs-fitwel-certification-2026",
    "nebosh-igc-vs-international-diploma-employers",
  ],
  intro:
    "**The data center industry has two credentials that sound interchangeable: CDCP (Certified Data Centre Professional) and DCDC (Data Center Design Consultant).** Both cover power and cooling. But one is a 2-day foundation course for operations staff. The other is an advanced design credential that requires three years of experience and a $725 exam fee. Pick the wrong one first and you either waste money on a credential you cannot qualify for, or stall with a certificate that design hiring managers do not respect.",
  mockSlug: "cdcp-readiness-check",
  deckSlug: "cdcp-anki-deck",
  cta: {
    mockLabel: "Take the free CDCP readiness check",
    deckLabel: "Drill CDCP fundamentals with Anki",
    summary:
      "New to data center infrastructure? Take the free CDCP readiness check on power, cooling, security, and standards, then build your foundation with the CDCP Anki deck before you book the 2-day course.",
  },
  sections: [
    {
      heading: "What Each Certification Actually Is",
      blocks: [
        {
          type: "table",
          caption: "CDCP (EPI) vs DCDC (BICSI) at a glance",
          headers: ["", "CDCP (EPI)", "DCDC (BICSI)"],
          rows: [
            ["Issuing body", "EPI", "BICSI"],
            ["Level", "Entry to mid-level", "Advanced / Professional"],
            [
              "Prerequisites",
              "None. 1–2 years of data center experience recommended.",
              "3 years verifiable full-time data center design, construction, or operations experience within the past 7 years.",
            ],
            ["Duration", "2 days (ILT or virtual)", "Self-study; 125+ hours recommended"],
            [
              "Exam",
              "40 multiple-choice questions, 1 hour",
              "100 questions, 2 hours (MCQ, multiple response, drag-and-drop, hot spot)",
            ],
            ["Passing score", "27 out of 40 (67.5%)", "Not published by BICSI"],
            [
              "Exam fee",
              "Varies by region; typically $800–$1,200 including course",
              "$510 (BICSI member) / $725 (non-member)",
            ],
            ["Validity", "3 years; recertification required", "3 years; renewal via BICSI CEUs"],
            ["Post-nominal", "CDCP®", "DCDC®"],
            [
              "Geographic strength",
              "Strong in Southeast Asia, Europe, Middle East",
              "Strong in North America, Europe, Middle East, Singapore",
            ],
          ],
        },
      ],
    },
    {
      heading: "The Content Gap: Operations vs Design",
      blocks: [
        {
          type: "p",
          text: "**CDCP covers design and operations.** The 2-day syllabus includes site selection, power infrastructure, cooling systems, equipment racks, cabling architecture, network infrastructure, fire safety, physical security, monitoring, and operational standards. It is broad, not deep — enough vocabulary to talk to designers and enough knowledge to run a facility day-to-day.",
        },
        {
          type: "p",
          text: "**DCDC covers design only.** The outline focuses on site selection and analysis, power and cooling, telecommunications infrastructure aligned with ANSI/TIA-942, structured cabling, physical security, fire protection, and cross-disciplinary coordination with electrical, mechanical, and structural engineers. It assumes you already know how a UPS works — and tests whether you can specify one, size it, and integrate it into a Tier III facility.",
        },
        {
          type: "p",
          text: "**Practical difference:** a CDCP holder can explain why the CRAC unit needs maintenance. A DCDC holder can write the CRAC specification, size the electrical feed, and coordinate cable tray routing so it does not block airflow.",
        },
      ],
    },
    {
      heading: "Who Should Get CDCP First?",
      blocks: [
        {
          type: "ul",
          items: [
            "Data center operations, facilities, or IT support — need a credential that validates broad knowledge",
            "Moving from general IT into data center infrastructure and need a foundation",
            "Sales engineer or consultant who must speak credibly about power, cooling, and security without designing them",
            "Based in Southeast Asia, where EPI has deep market penetration and CDCP is widely recognized by local operators",
          ],
        },
        {
          type: "p",
          text: "**EPI pathway:** CDCP → CDCS (Specialist) → CDCE (Expert), plus parallel tracks like CDFOM (management) and CDCEP (energy). If you are early in your career, CDCP is the correct entry point.",
        },
      ],
    },
    {
      heading: "Who Should Skip to DCDC?",
      blocks: [
        {
          type: "ul",
          items: [
            "3+ years of hands-on data center design or construction experience",
            "ICT designer, consulting engineer, or architect who specifies infrastructure",
            "Your firm bids on projects where ANSI/TIA-942 compliance is required",
            "You already hold BICSI credentials like RCDD and want data center specialization",
            "You need weight in North American enterprise and colocation markets",
          ],
        },
        {
          type: "p",
          text: "**BICSI ecosystem:** DCDC sits alongside RCDD and RTPM. In ICT infrastructure, BICSI credentials are the standard. Outside that world, DCDC is still valuable but often less recognized than EPI’s track in Asia-Pacific markets.",
        },
      ],
    },
    {
      heading: "The Cost Reality",
      blocks: [
        {
          type: "table",
          caption: "First-time cost comparison",
          headers: ["Cost item", "CDCP", "DCDC"],
          rows: [
            ["Course + exam bundle", "$800–$1,200", "Self-study only; no bundled course"],
            ["Exam fee alone", "Included in bundle", "$510–$725"],
            ["Study materials", "Included in course", "$300–$500 (manuals, standards, online)"],
            ["Prerequisite verification", "None", "Resume, work history, degree verification"],
            ["Total first-time cost", "$800–$1,200", "$810–$1,225"],
            ["Renewal", "Recertification exam or CPD", "BICSI CEUs"],
          ],
        },
        {
          type: "p",
          text: "Costs are similar; risk profiles differ. CDCP bundles training and exam — fail and you often get a free or discounted resit through the training partner. DCDC is exam-only through Pearson VUE — fail and you pay $510–$725 again.",
        },
      ],
    },
    {
      heading: "Employer Filters: What Job Listings Actually Ask For",
      blocks: [
        {
          type: "ul",
          items: [
            "**“CDCP or equivalent”** — operations, facilities, and technician roles, especially Asia-Pacific and the Middle East",
            "**“DCDC or RCDD”** — design consultant, senior engineer, and project manager roles, especially North America",
            "**“BICSI DCDC preferred”** — common in RFPs for enterprise data center builds",
            "**“EPI CDCP”** — common in colocation operator specs in Singapore, Hong Kong, and Dubai",
          ],
        },
        {
          type: "p",
          text: "Hyperscalers (Google, Microsoft, AWS) rarely hard-require either — they care more about direct experience. Design consultancies (Arup, Jacobs, WSP) weight DCDC; colocation operators (Equinix, Digital Realty) often weight CDCP.",
        },
      ],
    },
    {
      heading: "The Wrong Order: What Happens If You Pick DCDC First",
      blocks: [
        {
          type: "p",
          text: "BICSI will reject your DCDC application without 3 years of verifiable experience. They review resumes, contact employers, and can request more documentation. Rejection means you lose the non-refundable application fee.",
        },
        {
          type: "p",
          text: "Even if you qualify, the exam assumes deep familiarity with ANSI/BICSI 002 and ANSI/TIA-942. Without job exposure, 125+ study hours can stretch past 200. Most first-time passers already spent years reading these standards at work.",
        },
      ],
    },
    {
      heading: "The Smart Path: CDCP → Experience → DCDC (or CDCS)",
      blocks: [
        {
          type: "steps",
          items: [
            {
              title: "Year 1",
              body: "Pass CDCP. Work in operations or facilities. Touch power, cooling, and cabling daily.",
            },
            {
              title: "Years 2–3",
              body: "Move into design support, project coordination, or infrastructure planning. Start reading ANSI/TIA-942 and BICSI 002.",
            },
            {
              title: "Year 4",
              body: "Apply for DCDC with 3 years of experience. Pass the exam. Add RCDD if your work includes structured cabling.",
            },
          ],
        },
        {
          type: "p",
          text: "If you stay in operations and never touch design specs, skip DCDC and climb EPI to CDCS or CDFOM. If you move into consulting, DCDC becomes the credential that justifies your rate.",
        },
      ],
    },
  ],
  faqs: [
    {
      question: "Is CDCP or DCDC better for beginners?",
      answer:
        "CDCP. It has no prerequisites, includes training, and covers both operations and design fundamentals. DCDC requires 3 years of experience and is exam-only.",
    },
    {
      question: "Can I take DCDC without experience?",
      answer:
        "No. BICSI requires 3 years of verifiable full-time equivalent work in data center design, construction, or operations within the past 7 years. Applications are reviewed and can be rejected.",
    },
    {
      question: "How much does the DCDC exam cost?",
      answer:
        "$510 for BICSI members; $725 for non-members. This includes the first exam attempt through Pearson VUE.",
    },
    {
      question: "What is the passing score for CDCP?",
      answer:
        "27 out of 40, or 67.5%. The exam is 40 multiple-choice questions in 60 minutes, closed-book.",
    },
    {
      question: "How long is CDCP valid?",
      answer:
        "3 years. Recertification is required. EPI offers a recertification program with multiple options.",
    },
    {
      question: "Does DCDC expire?",
      answer:
        "Yes. DCDC is valid for 3 years and must be renewed through BICSI Continuing Education Units (CEUs).",
    },
    {
      question: "Which certification is recognized in Asia?",
      answer:
        "CDCP (EPI) has stronger recognition in Southeast Asia, where EPI is headquartered and has deep training partnerships. DCDC (BICSI) is recognized but less common outside Singapore and Hong Kong.",
    },
    {
      question: "Can CDCP holders work in design roles?",
      answer:
        "CDCP covers design fundamentals but does not qualify you as a design consultant. For senior design roles, employers typically want DCDC, CDCS, or a relevant engineering degree plus direct project experience.",
    },
    {
      question: "What is the difference between CDCP and CDCS?",
      answer:
        "CDCP is entry-to-mid level, covering broad infrastructure and operations. CDCS (Certified Data Centre Specialist) is the next EPI level, going deeper into redundancy, high-availability design, and operational risk. CDCS requires CDCP as a prerequisite.",
    },
  ],
  bottomLine:
    "CDCP is the key. DCDC is the corner office. If you are new to data centers or work in operations, start with CDCP — it is designed as a foundation, recognized globally, and opens the EPI pathway. If you already design data centers and can prove the experience, DCDC separates you from technicians who took a weekend course. Do not apply for DCDC with two years of experience and a hope — BICSI will keep your fee and send you back to CDCP.",
};
