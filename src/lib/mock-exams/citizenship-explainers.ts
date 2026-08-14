import type { NicheExamExplainer } from "./niche-exam-explainers";

/**
 * Thick explainers for citizenship readiness checks where the product page
 * needs blog-level honesty (format callouts, proposed exams, language vs civics).
 */
export const citizenshipExamExplainers: Record<string, NicheExamExplainer> = {
  "czech-citizenship-readiness-check": {
    practiceTestName: "Czech Citizenship / Reálie Readiness Check",
    whatIsExam:
      "Czech citizenship (státní občanství) usually requires two separate state exams: Czech language at B1 and the Czech realities exam (zkouška z českých reálií). They are not one sitting. The realities exam is a written multiple-choice test — officially 30 questions in 30 minutes, 60% (18/30) to pass, typically CZK 2,000 per attempt — drawn from the National Pedagogical Institute (NPI ČR) published pool of about 300 items across 30 topics (civic fundamentals, geography, history & culture). Permanent residence (trvalý pobyt) usually needs A2 language evidence, not reálie. This UniPrep2Go page is an independent longer diagnostic (60 questions, 45 minutes, 70% pass mark) on overlapping themes — not the official NPI booklet, not Interior Ministry material, and not a substitute for the live 30-question format.",
    administeredBy:
      "Realities exam: regional exam centres under MV ČR / NPI frameworks (often ÚJOP UK and krajská centra). Language: separate CCE / certified B1 pathway. Confirm booking, fees, and exemptions on official MV ČR and exam-centre pages.",
    officialFormat:
      "Official zkouška z reálií: 30 MCQs, 30 minutes, 4 options, 60% pass, paper booklet + answer sheet, ~CZK 2,000, unlimited retakes for the full fee. UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 70% diagnostic pass — use it to find weak domains, then drill the official NPI 300-item pool and model test before exam day.",
    whoFor:
      "Citizenship applicants who need B1 Czech plus reálie; learners who confuse permanent-residence A2 language with the citizenship realities exam; and anyone who wants a harder timed diagnostic before paying for an official sitting. Not legal advice and not the official NPI exam.",
    howToPrepare:
      "1) Confirm whether you need reálie (citizenship) or only language (often A2 for permanent residence). 2) Study the official NPI 300-question pool — one live item per topic. 3) Drill institutions (Parliament 200/81, President, Czech POINT, Úřad práce, emergency numbers, Schengen, koruna not euro). 4) Take this free 60-question readiness check for topic scoring, then repair weak areas. 5) Sit an NPI-style 30-question timed set before booking. Join the Czech Citizenship Anki waitlist for spaced-repetition reálie cards; use Czech CCE Anki for language.",
    topicBlurbs: [
      {
        id: "state-rights",
        label: "State, constitution & rights",
        blurb:
          "Parliamentary republic, President vs Prime Minister, Chamber/Senate, Charter, obce/kraje, naturalisation via Ministry of Interior, rodné číslo.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "1918 / 1989 / 1993 milestones in civic context, neighbours, Sněžka, Vltava/Labe, EU 2004, NATO 1999, Schengen, CZK — significance over bare year recall.",
      },
      {
        id: "society-daily",
        label: "Society, culture & daily life",
        blurb:
          "State holidays, voting age, direct presidential election, pluralism, culture literacy, Úřad práce, energy market basics, emergency numbers.",
      },
      {
        id: "services-extras",
        label: "Education, health & extras",
        blurb:
          "Datová schránka, Czech POINT, ČOI, ČNB, GDPR, nostrifikace, zdravotní pojištění, nemocenská, independent courts.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Czech citizenship realities exam (zkouška z reálií)?",
        answer:
          "It is the written civics / Czech realities MCQ required for most Czech citizenship applications, separate from the B1 language exam. Officially it is 30 questions in 30 minutes with a 60% pass mark, drawn from a published NPI pool.",
      },
      {
        question: "Is this UniPrep2Go test the official Czech reálie exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 70% pass). The official exam is 30 questions / 30 minutes / 60% from the NPI pool — not this page.",
      },
      {
        question: "Do I need reálie for permanent residence in Czechia?",
        answer:
          "Usually no. Permanent residence typically needs A2 Czech language evidence. Citizenship usually needs both B1 language and reálie, unless you qualify for an exemption — verify on official MV ČR pages.",
      },
      {
        question: "How many questions are on the official zkouška z reálií?",
        answer:
          "30 multiple-choice questions in 30 minutes, one from each of 30 official topics, with a 60% (18/30) pass mark. The public NPI bank has about 300 items.",
      },
      {
        question: "How much does the Czech realities exam cost?",
        answer:
          "Typically CZK 2,000 per attempt for reálie (language exam is charged separately). Confirm current fees with your exam centre before booking.",
      },
      {
        question: "Where can I find the official Czech reálie question pool?",
        answer:
          "The National Pedagogical Institute (NPI ČR) publishes the ~300-item database and a 30-question model test. Use that pool for exam-day fidelity; use UniPrep2Go for extra timed diagnostics.",
      },
      {
        question: "Is there a free Czech citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go Czech Citizenship readiness check on this page for topic scoring, then drill the official NPI model test for format match.",
      },
    ],
    keywords: [
      "czech citizenship practice test",
      "zkouška z českých reálií",
      "zkouska z realii practice",
      "občanství ČR test",
      "czech realities exam",
      "npi reálie",
      "czech naturalisation quiz",
    ],
  },
  "polish-citizenship-readiness-check": {
    practiceTestName: "Polish Citizenship Readiness Check (Proposed Civics)",
    whatIsExam:
      "Poland does not currently require a citizenship knowledge / “wiedza o Polsce” MCQ for naturalisation. Under today’s rules the exam hurdle is language: the state Polish certificate (PaF) at B1, plus residence, income, housing, and security checks administered through the voivodeship / MSWiA pathway. Government drafts have discussed a future test obywatelski (civics / knowledge of Poland), possibly with open “values” items, a language raise toward B2, longer residence, and a loyalty oath — but until law and implementing rules are published, those numbers are proposed, not exam-day reality. This UniPrep2Go readiness check is an independent Polish-language diagnostic of constitution, history, EU/NATO, society, and public-services themes so applicants can future-proof civic literacy while still treating PaF B1 as the live bottleneck.",
    administeredBy:
      "Today: voivodeship offices / MSWiA for naturalisation; PaF language via NAWA / certyfikatpolski.pl centres. Proposed civics test: not enacted — confirm current MSWiA drafts before you assume an official bank exists.",
    officialFormat:
      "No official citizenship civics exam format is in force today. Public discussion of drafts has mentioned roughly 30–35 MCQs plus open items — treat as proposed only. Current required exam for many applicants: PaF B1 (listening, reading, grammar, writing, speaking).",
    whoFor:
      "Residency-route applicants who need PaF B1 now and want civic fluency if a test obywatelski appears; people comparing Poland’s language-first path with Czech reálie or other EU civics exams; and learners who confuse Karta Polaka interviews with naturalisation. Not a substitute for official legal advice or PaF registration.",
    howToPrepare:
      "Scenario A (apply under current rules): prioritise PaF B1 — cases, aspect, formal writing, timed mocks, speaking. Scenario B (future-proof): raise language toward B2 argumentation, learn Constitution 1997 and key state institutions in simplified Polish, follow Sejm/presidential news, practice answering “Why Poland?” aloud, and use this free 60-question readiness check to find weak civics domains. Join the Polish Citizenship Anki waitlist for spaced-repetition cards when the .apkg ships; use the Polish Certyfikat Anki deck for language.",
    topicBlurbs: [
      {
        id: "state-rights",
        label: "State, constitution & rights",
        blurb:
          "Republic form, President vs Prime Minister, Sejm/Senat, Constitution 1997, rights and obligations — institutional literacy, not trivia dates alone.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "Independence tradition, 1989 transition, WWII turning points, EU/NATO membership meaning, major geography — framed as civic significance.",
      },
      {
        id: "society-daily",
        label: "Society, culture & daily life",
        blurb:
          "Voting age rules, national symbols, cultural figures in context, emergency numbers, everyday civic participation.",
      },
      {
        id: "services-extras",
        label: "Education, health & extras",
        blurb:
          "Public services, health/education touchpoints, and practical admin literacy useful for life in Poland and a future civics bank.",
      },
    ],
    examFaqs: [
      {
        question: "Does Poland have an official citizenship civics exam today?",
        answer:
          "No. There is no enacted “wiedza o Polsce” / test obywatelski required for naturalisation today. The standard exam hurdle is PaF Polish at B1 (or qualifying Polish education), plus residence and other administrative requirements.",
      },
      {
        question: "What is the proposed Polish test obywatelski?",
        answer:
          "Draft policy discussion has included a naturalisation knowledge test (often described as MCQs plus open “values” items), possible B2 language, longer residence, and a loyalty oath. Until legislation and rules are published, treat format and cut scores as proposed — not official exam specifications.",
      },
      {
        question: "Is this UniPrep2Go page the official Polish citizenship test?",
        answer:
          "No. It is an independent free timed readiness check on civics-style themes. It is not MSWiA, UDSC, or NAWA material and does not replace PaF or a future official bank.",
      },
      {
        question: "Should I still take a Polish citizenship practice test if there is no official civics exam?",
        answer:
          "Yes if you want institutional and history literacy for life in Poland or to future-proof against a possible test obywatelski. Your live exam priority under current rules remains PaF B1.",
      },
      {
        question: "Is Karta Polaka the same as a citizenship civics exam?",
        answer:
          "No. Karta Polaka can involve a consular interview about identity and traditions; it is not naturalisation and not the proposed test obywatelski. Naturalisation is a separate administrative procedure.",
      },
      {
        question: "How do I prepare for Polish citizenship under current 2026 rules?",
        answer:
          "Confirm residence path with your voivodeship, book PaF B1 (not A2 if the passport is the goal), gather income/housing/security documents, and use language Anki plus speaking/writing drills. Use this readiness check for civic themes; join the civics Anki waitlist for flashcards when they ship.",
      },
      {
        question: "Who administers Polish naturalisation today?",
        answer:
          "Applications run through voivodeship offices under MSWiA frameworks. Language certificates are issued via the state PaF system (NAWA / authorised centres). Always verify current fees and checklists on official gov.pl pages.",
      },
    ],
    keywords: [
      "polish citizenship practice test",
      "wiedza o polsce test",
      "test obywatelski polska",
      "polish naturalisation quiz",
      "obywatelstwo polskie egzamin",
      "paf b1 citizenship",
      "proposed polish civics exam",
    ],
  },
  "denmark-indfoedsretsproeven-readiness-check": {
    practiceTestName: "Denmark Indfødsretsprøven Readiness Check",
    whatIsExam:
      "Denmark’s Indfødsretsprøven is the live national citizenship knowledge test for many naturalisation applicants. Officially it is a written multiple-choice exam: 45 questions in 45 minutes, with a dual pass gate — typically 36/45 correct overall plus a separate values/democracy subsection that must also be passed — and a fee around 946 DKK per attempt (confirm current nyidanmark.dk figures). Content covers constitution and democracy, Danish society and history, welfare and daily life, and geography/EU context. Language requirements (Danish) are separate from this civics sitting. This UniPrep2Go page is an independent longer diagnostic (60 questions, 45 minutes, 70% single pass mark) on overlapping themes — not the official booklet, not Udlændinge- og Integrationsministeriet material, and not a substitute for the dual-gate 45-question format.",
    administeredBy:
      "Danish Agency for International Recruitment and Integration / New to Denmark frameworks; sittings via authorised exam centres listed on nyidanmark.dk. Confirm booking windows, fees, and exemptions on official pages before you register.",
    officialFormat:
      "Official Indfødsretsprøven: 45 MCQs, 45 minutes, dual gate (~36/45 overall + values items), ~946 DKK. UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 70% single diagnostic pass — use it to find weak domains, then drill official sample papers for dual-gate fidelity.",
    whoFor:
      "Naturalisation applicants who must sit Indfødsretsprøven; residents who confuse language proof with the citizenship knowledge test; and anyone who wants a harder timed diagnostic before paying the official fee. Not legal advice and not the official Danish exam.",
    howToPrepare:
      "1) Confirm you need Indfødsretsprøven (not only Danish language evidence). 2) Study official sample sets and the dual values gate — passing overall is not enough if values fail. 3) Drill Folketing, monarchy vs government, welfare institutions, holidays, and geography/EU. 4) Take this free 60-question readiness check for topic scoring, then repair weak areas. 5) Sit a 45-question timed set matching official timing before booking. Join the Denmark Indfødsretsprøven Anki waitlist for spaced-repetition cards when the .apkg ships.",
    topicBlurbs: [
      {
        id: "constitution-democracy",
        label: "Constitution & democracy",
        blurb:
          "Grundloven, Folketing, government vs monarch, elections, rule of law, and democratic values items that feed the official dual gate.",
      },
      {
        id: "history-society",
        label: "Society, culture & history",
        blurb:
          "Key historical milestones in civic context, cultural literacy, and social norms framed as citizenship knowledge — not trivia dates alone.",
      },
      {
        id: "welfare-daily",
        label: "Welfare & daily life",
        blurb:
          "Welfare-state touchpoints, everyday civic participation, labour-market and municipal services literacy for life in Denmark.",
      },
      {
        id: "geo-eu-extras",
        label: "Geography, EU & extras",
        blurb:
          "Regions, neighbours, EU/Nordic context, symbols, and practical extras that appear in citizenship knowledge banks.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Danish Indfødsretsprøven?",
        answer:
          "It is Denmark’s official citizenship knowledge test for many naturalisation applicants — a written MCQ on democracy, society, history, welfare, and related themes, separate from Danish language requirements.",
      },
      {
        question: "What is the official Indfødsretsprøven format?",
        answer:
          "Typically 45 questions in 45 minutes with a dual pass gate (about 36/45 overall plus a values/democracy subsection). Confirm current cut scores and fee (~946 DKK) on nyidanmark.dk before booking.",
      },
      {
        question: "Is this UniPrep2Go test the official Danish citizenship exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 70% single pass). The official exam uses a dual gate and a shorter 45-question paper — not this page.",
      },
      {
        question: "Is Indfødsretsprøven the same as the Danish language test?",
        answer:
          "No. Language evidence and the citizenship knowledge test are separate hurdles. You may need both depending on your naturalisation path — verify on official New to Denmark guidance.",
      },
      {
        question: "How much does Indfødsretsprøven cost?",
        answer:
          "Fees have been in the region of ~946 DKK per attempt; always confirm the current amount and retake rules on nyidanmark.dk before you register.",
      },
      {
        question: "Is there a free Danish citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go Indfødsretsprøven readiness check on this page for topic scoring, then practice official sample papers for dual-gate format match.",
      },
      {
        question: "Who administers the Indfødsretsprøven?",
        answer:
          "Sittings run through authorised centres under Danish immigration / integration frameworks published on New to Denmark. Always use official booking channels.",
      },
    ],
    keywords: [
      "Indfødsretsprøven",
      "danish citizenship practice test",
      "denmark citizenship quiz",
      "indfoedsretsproeven practice",
      "danish naturalisation test",
      "nyidanmark citizenship exam",
    ],
  },
  "sweden-medborgarskapsprov-readiness-check": {
    practiceTestName: "Sweden Medborgarskapsprov Readiness Check (Proposed)",
    whatIsExam:
      "Sweden’s Medborgarskapsprov is a proposed / newly announced citizenship knowledge exam track (public rollout discussion around August 2026). As of this page, a full official exam-day format — question count, time limit, pass mark, fee, and published item bank — has not been locked as a stable, takeable specification for all applicants. Until Migrationsverket (or the designated body) publishes binding rules, treat every number you see online as provisional. Language and residence requirements continue under current Swedish naturalisation rules. This UniPrep2Go readiness check is an independent Swedish-language speculative diagnostic (60 questions, 45 minutes, 70% pass) on state/democracy, history/geography/EU, rights/society, and services themes — useful for civic literacy and future-proofing, not a substitute for an unpublished official paper.",
    administeredBy:
      "Proposed / forthcoming under Swedish Migration Agency (Migrationsverket) frameworks once implementing rules exist. Confirm live status on migrationsverket.se before you assume a bookable citizenship MCQ exists.",
    officialFormat:
      "PROPOSED / NEW (Aug 2026 discussion): official Medborgarskapsprov format unpublished — no stable public Q-count, timer, or cut score yet. UniPrep2Go mock on this page: speculative 60 questions / 45 minutes / 70% diagnostic only — not Migrationsverket material.",
    whoFor:
      "Applicants watching Sweden’s proposed citizenship knowledge test; permanent residents who want civic literacy while language/residence remain the live bottlenecks; and learners comparing Nordic civics exams. Not legal advice and not an official exam sitting.",
    howToPrepare:
      "1) Verify whether Medborgarskapsprov is actually required for your application date — proposed rules can change. 2) Keep language and residence documentation current under today’s pathway. 3) Build literacy on Riksdag, government, rights, history, EU/Nordic context, and public services in Swedish. 4) Use this free speculative 60-question check to find weak domains. 5) When an official sample bank appears, switch drills to that format. Join the Sweden Medborgarskapsprov Anki waitlist for cards when they ship.",
    topicBlurbs: [
      {
        id: "state-democracy",
        label: "State & democracy",
        blurb:
          "Constitutional monarchy basics, Riksdag, government, elections, and democratic norms likely to appear in a future bank.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "Civic milestones, regions, neighbours, and EU/Nordic membership framed as significance rather than year trivia alone.",
      },
      {
        id: "rights-society",
        label: "Rights & society",
        blurb:
          "Fundamental rights, equality norms, and everyday civic participation themes for life in Sweden.",
      },
      {
        id: "services-extras",
        label: "Services & extras",
        blurb:
          "Public-service literacy, practical admin touchpoints, and extras useful if a formal Medborgarskapsprov launches.",
      },
    ],
    examFaqs: [
      {
        question: "Does Sweden have an official Medborgarskapsprov today?",
        answer:
          "A citizenship knowledge test has been proposed / newly discussed (around August 2026). Until Migrationsverket publishes binding format, fees, and booking rules, treat it as proposed — not a stable exam-day product for every applicant.",
      },
      {
        question: "Is this UniPrep2Go page the official Swedish citizenship test?",
        answer:
          "No. It is an independent speculative readiness check. It is not Migrationsverket material and cannot replace an unpublished official paper.",
      },
      {
        question: "What is the official Medborgarskapsprov format?",
        answer:
          "Not stably published yet. Ignore third-party guesswork about exact Q-counts or cut scores until the official agency releases them. This mock uses 60/45/70 only as a diagnostic scaffold.",
      },
      {
        question: "Should I prepare if the format is unpublished?",
        answer:
          "Yes for civic literacy and future-proofing, while still meeting current language and residence rules for your application. Switch to official samples the day they appear.",
      },
      {
        question: "Is Medborgarskapsprov the same as Swedish language requirements?",
        answer:
          "No. Language evidence and a knowledge test (if enacted) would be separate hurdles. Confirm what your pathway actually requires on official Migrationsverket pages.",
      },
      {
        question: "Who will administer the Swedish citizenship knowledge test?",
        answer:
          "Expect Swedish Migration Agency / designated exam frameworks once rules are final. Always verify on migrationsverket.se rather than blogs.",
      },
      {
        question: "Is there a free Swedish citizenship practice test?",
        answer:
          "Yes — this UniPrep2Go readiness check is a free speculative timed diagnostic. Pair it with official sources as soon as they publish a bank.",
      },
    ],
    keywords: [
      "Medborgarskapsprov",
      "swedish citizenship practice test",
      "medborgarskap quiz",
      "proposed swedish civics exam",
      "sweden naturalisation test",
      "migrationsverket citizenship",
    ],
  },
  "norway-statsborgerproven-readiness-check": {
    practiceTestName: "Norway Statsborgerprøven Readiness Check",
    whatIsExam:
      "Norway’s Statsborgerprøven is the live citizenship knowledge test administered under HK-dir frameworks for many applicants who need documented knowledge of Norwegian society. Officially it is typically 36 questions in 60 minutes, of which 32 are scored, with a 75% pass mark on the scored set (confirm current HK-dir / Kompetanse Norge figures). Themes include state and democracy, history/geography/EEA context, rights and society, and public services. Norwegian language requirements are a separate pathway. This UniPrep2Go page is an independent diagnostic (60 questions, 45 minutes, 70% pass) on overlapping themes — longer and differently timed than the official paper, not UDI or HK-dir material, and not a substitute for the 36-question / 75% sitting.",
    administeredBy:
      "HK-dir / Kompetanse Norge exam frameworks for the knowledge test; naturalisation decisions via UDI. Confirm booking, fees, and exemptions on official udi.no and HK-dir pages.",
    officialFormat:
      "Official Statsborgerprøven: 36 questions (32 scored), 60 minutes, 75% on scored items (HK-dir). UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 70% diagnostic pass — use for topic scoring, then drill official sample papers for format match.",
    whoFor:
      "Applicants who must sit Statsborgerprøven; residents who confuse Norwegian language tests with the citizenship knowledge exam; and anyone wanting a longer timed diagnostic before booking. Not legal advice and not the official HK-dir exam.",
    howToPrepare:
      "1) Confirm you need Statsborgerprøven for your UDI pathway. 2) Study official sample items and the 32-scored / 75% rule. 3) Drill Storting, government, rights, history, EEA/Schengen context, and public services. 4) Take this free 60-question readiness check, then repair weak domains. 5) Sit a 36-question / 60-minute timed set before exam day. Join the Norway Statsborgerprøven Anki waitlist for spaced-repetition cards when they ship.",
    topicBlurbs: [
      {
        id: "state-democracy",
        label: "State & democracy",
        blurb:
          "Constitutional monarchy basics, Storting, government, elections, and democratic institutions in Norwegian civic literacy.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EEA",
        blurb:
          "Civic milestones, regions, neighbours, and EEA/Schengen membership framed as significance for citizenship knowledge.",
      },
      {
        id: "rights-society",
        label: "Rights & society",
        blurb:
          "Fundamental rights, equality norms, and everyday civic participation themes for life in Norway.",
      },
      {
        id: "services-extras",
        label: "Services & extras",
        blurb:
          "Public services, welfare touchpoints, and practical admin literacy that appear in citizenship knowledge banks.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Norwegian Statsborgerprøven?",
        answer:
          "It is Norway’s official citizenship knowledge test on society, democracy, history, and related themes — separate from Norwegian language requirements and from the UDI application decision itself.",
      },
      {
        question: "What is the official Statsborgerprøven format?",
        answer:
          "Typically 36 questions in 60 minutes with 32 scored items and a 75% pass mark on the scored set (HK-dir). Confirm current figures on official exam pages before you book.",
      },
      {
        question: "Is this UniPrep2Go test the official Norwegian citizenship exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 70% pass). The official exam is shorter, differently timed, and scored under HK-dir rules — not this page.",
      },
      {
        question: "Is Statsborgerprøven the same as the Norwegian language test?",
        answer:
          "No. Language evidence and the citizenship knowledge test are separate. Your UDI pathway may require one, both, or exemptions — verify on udi.no.",
      },
      {
        question: "Who administers Statsborgerprøven?",
        answer:
          "The knowledge test runs under HK-dir / Kompetanse Norge frameworks; naturalisation is decided by UDI. Use official booking channels only.",
      },
      {
        question: "Is there a free Norwegian citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go Statsborgerprøven readiness check on this page, then practice official samples for 36Q / 60min / 75% fidelity.",
      },
      {
        question: "How should I use a 60-question mock if the official test is 36 questions?",
        answer:
          "Use the longer mock to surface weak topics under time pressure, then switch to official-length timed sets so exam-day pacing matches HK-dir rules.",
      },
    ],
    keywords: [
      "Statsborgerprøven",
      "norwegian citizenship practice test",
      "statsborgerskap quiz",
      "norway citizenship test",
      "hk-dir statsborgerprøven",
      "udi citizenship knowledge",
    ],
  },
  "luxembourg-vivre-ensemble-readiness-check": {
    practiceTestName: "Luxembourg Vivre ensemble Readiness Check",
    whatIsExam:
      "Luxembourg’s “Vivre ensemble au Grand-Duché de Luxembourg” is the live nationality / living-together knowledge requirement for many applicants. Officially you typically either pass a written multiple-choice exam — about 40 questions in 60 minutes with a 70% pass mark — or complete the recognised Vivre ensemble course pathway (confirm current Guichet.lu options). Themes cover institutions and vivre ensemble, history/geography/EU, rights and nationality, and society/daily life. Language requirements (often Luxembourgish / French / German pathways) are separate. This UniPrep2Go page is an independent French-language diagnostic (60 questions, 45 minutes, 70% pass) on overlapping themes — not Guichet.lu material and not a substitute for the official 40/60/70 paper or the course certificate.",
    administeredBy:
      "Luxembourg government frameworks published on Guichet.lu (nationality / Vivre ensemble). Confirm whether your path is the exam sitting, the course, or an exemption before you book.",
    officialFormat:
      "Official Vivre ensemble: typically 40 MCQs, 60 minutes, 70% pass — OR recognised course completion instead of the exam. UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 70% diagnostic pass — topic scoring only; finish with official samples or the course route.",
    whoFor:
      "Nationality applicants choosing between the Vivre ensemble exam and the course; residents who confuse language certificates with the living-together requirement; and anyone wanting a timed civics diagnostic. Not legal advice and not the official Luxembourg exam.",
    howToPrepare:
      "1) On Guichet.lu, decide exam vs course vs exemption for your file. 2) If sitting the exam, drill institutions, rights, history, EU/Benelux context, and everyday civic life. 3) Take this free 60-question readiness check for topic scoring. 4) Drill weak domains with the 60-card Luxembourg Vivre ensemble Anki deck, then practice a 40-question / 60-minute set at 70% before booking. 5) Keep language evidence (Sproochentest) on the correct parallel track.",
    topicBlurbs: [
      {
        id: "institutions-vivre",
        label: "Institutions & vivre ensemble",
        blurb:
          "Grand Duchy institutions, living-together norms, and civic participation themes central to the Vivre ensemble requirement.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "Civic milestones, geography, neighbours, and EU/Benelux membership framed as citizenship knowledge.",
      },
      {
        id: "rights-nationality",
        label: "Rights & nationality",
        blurb:
          "Fundamental rights, nationality pathway literacy, and obligations tied to life in Luxembourg.",
      },
      {
        id: "society-daily",
        label: "Society & daily life",
        blurb:
          "Everyday society, public life, and practical civic literacy useful for both exam and course pathways.",
      },
    ],
    examFaqs: [
      {
        question: "What is Luxembourg’s Vivre ensemble requirement?",
        answer:
          "It is the living-together / nationality knowledge requirement — typically met by passing a written MCQ exam or completing a recognised Vivre ensemble course. Confirm your route on Guichet.lu.",
      },
      {
        question: "What is the official Vivre ensemble exam format?",
        answer:
          "Typically about 40 questions in 60 minutes with a 70% pass mark. Some applicants complete the course instead of sitting the exam — always verify current options officially.",
      },
      {
        question: "Is this UniPrep2Go test the official Luxembourg exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 70% pass). It is not Guichet.lu material and does not replace the official 40/60/70 paper or course certificate.",
      },
      {
        question: "Can I take a course instead of the Vivre ensemble exam?",
        answer:
          "Often yes — Luxembourg publishes a course pathway as an alternative to the exam for many applicants. Check Guichet.lu for eligibility and recognised providers.",
      },
      {
        question: "Is Vivre ensemble the same as a language test?",
        answer:
          "No. Language requirements and the Vivre ensemble knowledge/course requirement are separate. You may need both depending on your nationality path.",
      },
      {
        question: "Is there a free Luxembourg citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go Vivre ensemble readiness check on this page, then use official samples or the course materials for exam-day fidelity.",
      },
      {
        question: "Who administers the Luxembourg Vivre ensemble exam?",
        answer:
          "Administration follows Luxembourg government / Guichet.lu nationality frameworks and authorised centres. Use only official registration channels.",
      },
    ],
    keywords: [
      "Vivre ensemble Luxembourg",
      "luxembourg citizenship practice test",
      "nationalité luxembourgeoise",
      "vivre ensemble examen",
      "luxembourg naturalisation quiz",
      "guichet vivre ensemble",
    ],
  },
  "belgium-flanders-mo-readiness-check": {
    practiceTestName: "Belgium Flanders MO Readiness Check",
    whatIsExam:
      "Belgium does not run a single federal multiple-choice “citizenship exam” for naturalisation today. In Flanders, the live civic bottleneck for many newcomers is maatschappelijke oriëntatie (MO / social orientation) plus Dutch language evidence within the inburgering pathway — course completion and local agency rules, not one nationwide MCQ passport test. Federal politics has also discussed a future national citizenship knowledge test; until enacted, treat any federal Q-count as proposed only. This UniPrep2Go readiness check is an independent Dutch-language diagnostic (60 questions, 45 minutes, 70% pass) on Flanders MO-style themes — institutions/orientation, history/geography/EU, rights/nationality, and society/daily life — useful for integration literacy and future-proofing, not an official Agentschap Integratie & Inburgering exam paper.",
    administeredBy:
      "Flanders: Agentschap Integratie & Inburgering / local inburgering partners for MO and Dutch. Naturalisation: federal / municipal pathways. Proposed national test: not a stable bookable federal MCQ yet — verify on official Belgian and Flemish pages.",
    officialFormat:
      "No single federal Belgian citizenship MCQ in force. Live Flanders path: maatschappelijke oriëntatie (course/agency rules) + Dutch language — not one national 60-question paper. Proposed federal knowledge test: format unpublished. UniPrep2Go mock: independent 60/45/70 diagnostic only.",
    whoFor:
      "Newcomers in Flanders preparing maatschappelijke oriëntatie and Dutch; applicants who wrongly expect a federal MCQ like CCSE or Life in the UK; and learners future-proofing against a proposed national test. Not legal advice and not official inburgering material.",
    howToPrepare:
      "1) Register your inburgering / MO pathway with the correct Flemish agency. 2) Prioritise Dutch evidence and MO course requirements that actually appear on your contract. 3) Build civic literacy on Belgian/Flemish institutions, rights, history, EU, and daily life. 4) Use this free 60-question check to find weak domains. 5) If a federal test is enacted, switch to that official bank. Join the Belgium Flanders MO Anki waitlist for cards when they ship.",
    topicBlurbs: [
      {
        id: "institutions-orientation",
        label: "Institutions & orientation",
        blurb:
          "Belgian and Flemish institutions, federal/regional division, and social-orientation themes used in inburgering literacy.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "Civic milestones, regions, neighbours, and EU membership framed for Flanders orientation — not trivia alone.",
      },
      {
        id: "rights-nationality",
        label: "Rights & nationality",
        blurb:
          "Fundamental rights, nationality pathway literacy, and obligations tied to life in Belgium / Flanders.",
      },
      {
        id: "society-daily",
        label: "Society & daily life",
        blurb:
          "Everyday society, work, housing, and civic participation themes common in maatschappelijke oriëntatie.",
      },
    ],
    examFaqs: [
      {
        question: "Does Belgium have a single federal citizenship MCQ exam?",
        answer:
          "No. There is no one nationwide multiple-choice citizenship exam for all Belgians today. Flanders uses maatschappelijke oriëntatie plus Dutch language within inburgering; a federal knowledge test has been discussed as proposed only.",
      },
      {
        question: "What is maatschappelijke oriëntatie (MO)?",
        answer:
          "MO is Flanders’ social orientation / civic integration component — typically course-based under Agentschap Integratie & Inburgering rules, not a federal passport MCQ like Life in the UK.",
      },
      {
        question: "Is this UniPrep2Go page the official Flanders MO exam?",
        answer:
          "No. It is an independent readiness diagnostic on MO-style themes. It is not official Flemish government material and does not replace your inburgering contract requirements.",
      },
      {
        question: "Do I need Dutch as well as MO?",
        answer:
          "Usually yes for Flanders inburgering pathways — language and social orientation are separate pillars. Confirm levels and proofs with your agency.",
      },
      {
        question: "Is a national Belgian citizenship test coming?",
        answer:
          "Federal discussion has included a proposed national knowledge test. Until law and implementing rules exist, treat format and cut scores as proposed — not exam-day reality.",
      },
      {
        question: "Is Flanders MO the same as Wallonia citoyenneté?",
        answer:
          "No. Belgium’s communities/regions run different integration frameworks. Wallonia uses French-language integration / citoyenneté pathways; Flanders uses MO + Dutch.",
      },
      {
        question: "Is there a free Flanders MO practice test?",
        answer:
          "Yes — this UniPrep2Go readiness check is a free timed diagnostic for MO-style themes. Always follow your official agency checklist for what you must complete.",
      },
    ],
    keywords: [
      "maatschappelijke oriëntatie",
      "Flanders MO practice test",
      "inburgering Vlaanderen",
      "belgium citizenship flanders",
      "flemish social orientation quiz",
      "proposed belgian citizenship test",
    ],
  },
  "belgium-wallonie-citoyennete-readiness-check": {
    practiceTestName: "Belgium Wallonie Citoyenneté Readiness Check",
    whatIsExam:
      "Wallonia does not currently run a single Walloon QCM “citizenship exam” equivalent to CCSE or Life in the UK. For many newcomers the live hurdles are French language (often around A2 in integration frameworks) plus parcours d’intégration / citoyenneté course and municipal steps — not one regional multiple-choice passport paper. Belgium has also discussed a future federal citizenship knowledge test; until enacted, treat federal Q-counts as proposed only. This UniPrep2Go readiness check is an independent French-language diagnostic (60 questions, 45 minutes, 70% pass) on Wallonie citoyenneté-style themes — institutions/integration, history/geography/EU, rights/nationality, and society/daily life — for civic literacy and future-proofing, not an official Walloon government exam booklet.",
    administeredBy:
      "Wallonia: parcours d’intégration / citoyenneté partners and municipal services. Naturalisation: federal / municipal pathways. Proposed federal test: not a stable bookable national MCQ yet — verify on official Walloon and Belgian pages.",
    officialFormat:
      "No Walloon citizenship QCM in force as a single official MCQ passport exam. Live path: French language evidence + integration / citoyenneté course steps (confirm locally). Proposed federal knowledge test: format unpublished. UniPrep2Go mock: independent 60/45/70 diagnostic only.",
    whoFor:
      "Newcomers in Wallonia preparing integration / citoyenneté and French A2-style requirements; applicants who wrongly expect a regional MCQ; and learners future-proofing against a proposed federal test. Not legal advice and not official Walloon material.",
    howToPrepare:
      "1) Confirm your parcours d’intégration contract and French language proofs with the correct Walloon body. 2) Prioritise course attendance and language evidence that actually appear on your checklist. 3) Build civic literacy on Belgian/Walloon institutions, rights, history, EU, and daily life. 4) Use this free 60-question check to find weak domains. 5) If a federal test is enacted, switch to that official bank. Join the Belgium Wallonie Citoyenneté Anki waitlist for cards when they ship.",
    topicBlurbs: [
      {
        id: "institutions-integration",
        label: "Institutions & integration",
        blurb:
          "Belgian and Walloon institutions, federal/regional division, and parcours d’intégration / citoyenneté literacy.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "Civic milestones, regions, neighbours, and EU membership framed for Wallonia integration — not trivia alone.",
      },
      {
        id: "rights-nationality",
        label: "Rights & nationality",
        blurb:
          "Fundamental rights, nationality pathway literacy, and obligations tied to life in Belgium / Wallonia.",
      },
      {
        id: "society-daily",
        label: "Society & daily life",
        blurb:
          "Everyday society, work, housing, and civic participation themes common in Walloon integration courses.",
      },
    ],
    examFaqs: [
      {
        question: "Is there an official Walloon citizenship QCM exam?",
        answer:
          "No single Walloon multiple-choice citizenship passport exam is in force like CCSE or Life in the UK. Integration typically mixes French language evidence with parcours d’intégration / citoyenneté steps.",
      },
      {
        question: "What do Wallonia applicants usually need instead?",
        answer:
          "Often French around A2 (pathway-dependent) plus integration / citoyenneté course and municipal naturalisation steps. Always confirm your contract and federal file requirements officially.",
      },
      {
        question: "Is this UniPrep2Go page the official Wallonie citoyenneté exam?",
        answer:
          "No. It is an independent readiness diagnostic on citoyenneté-style themes. It is not official Walloon government material and does not replace your integration checklist.",
      },
      {
        question: "Is a federal Belgian citizenship test coming?",
        answer:
          "Federal discussion has included a proposed national knowledge test. Until legislation and rules exist, treat format and cut scores as proposed only.",
      },
      {
        question: "Is Wallonia the same as Flanders MO?",
        answer:
          "No. Flanders uses maatschappelijke oriëntatie + Dutch; Wallonia uses French-language integration / citoyenneté frameworks. Do not mix checklists across communities.",
      },
      {
        question: "Should I still take a practice test without an official QCM?",
        answer:
          "Yes if you want institutional literacy for life in Belgium or to future-proof against a proposed federal test. Your live priorities remain language and official integration steps.",
      },
      {
        question: "Is there a free Wallonie citoyenneté practice test?",
        answer:
          "Yes — this UniPrep2Go readiness check is a free timed diagnostic. Pair it with your official parcours materials and agency appointments.",
      },
    ],
    keywords: [
      "citoyenneté Wallonie",
      "parcours d'intégration",
      "belgium wallonia citizenship",
      "wallonie citoyennete practice",
      "french a2 belgium integration",
      "proposed belgian citizenship test",
    ],
  },
  "portugal-nacionalidade-readiness-check": {
    practiceTestName: "Portugal Nacionalidade Readiness Check (Pending Civic Test)",
    whatIsExam:
      "Portugal’s nationality pathway has introduced / is introducing a NEW civic knowledge requirement whose exam-day format remains PENDING and unpublished as a stable public specification (question count, timer, pass mark, fee, and official bank). Legal discussion centres on five civic themes — state and rights, nationality and civic participation, history/geography/EU, and society/public services among the mapped domains — but until Justiça / IRN (or the designated body) publishes a binding paper, treat every Q-count you see online as speculative. CIPLE A2 language evidence remains a separate, live hurdle for many applicants. This UniPrep2Go readiness check is an independent Portuguese-language speculative diagnostic (60 questions, 45 minutes, 70% pass) on those five-theme civic areas — useful for literacy and future-proofing, not IRN/AIMA exam material.",
    administeredBy:
      "Nationality procedures via Justiça / IRN frameworks; language via CAPLE / CIPLE centres. Pending civic test administrator and booking rules: confirm on justica.gov.pt and official notices before you assume a bookable MCQ exists.",
    officialFormat:
      "NEW / PENDING: official Portuguese nationality civic test format unpublished — no stable public Q-count, timer, or cut score yet. Five legal civic themes guide study. UniPrep2Go mock: speculative 60 questions / 45 minutes / 70% diagnostic only — not official IRN material.",
    whoFor:
      "Nationality applicants watching Portugal’s new civic knowledge requirement; CIPLE A2 candidates who want parallel civics literacy; and learners comparing Portugal with Spain’s CCSE. Not legal advice and not an official exam sitting.",
    howToPrepare:
      "1) Verify whether the civic test is required for your application date and which exemptions apply. 2) Keep CIPLE A2 (or qualifying Portuguese schooling) on track — language is still a live bottleneck for many. 3) Study the five civic themes: state/rights, nationality/participation, history/geography/EU, society/services. 4) Use this free speculative 60-question check to find weak domains. 5) Switch to the official bank the day Justiça publishes it. Join the Portugal Nacionalidade Anki waitlist for cards when they ship.",
    topicBlurbs: [
      {
        id: "state-rights",
        label: "State & rights",
        blurb:
          "Republic institutions, Constitution, fundamental rights, and state organisation literacy for nationality civics.",
      },
      {
        id: "nationality-civic",
        label: "Nationality & civic participation",
        blurb:
          "Nationality pathway concepts, civic participation, and obligations tied to Portuguese citizenship.",
      },
      {
        id: "history-geo-eu",
        label: "History, geography & EU",
        blurb:
          "Civic milestones, geography, and EU membership framed as significance for a forthcoming knowledge bank.",
      },
      {
        id: "society-services",
        label: "Society & public services",
        blurb:
          "Everyday society, public services, and practical admin literacy useful for life in Portugal and a future civic test.",
      },
    ],
    examFaqs: [
      {
        question: "Does Portugal have an official nationality civic MCQ today?",
        answer:
          "A NEW civic knowledge requirement has been introduced / is pending implementation, but a stable public exam-day format (Q-count, time, pass mark, bank) is not yet a reliable bookable specification for all applicants. Confirm on official Justiça / IRN pages.",
      },
      {
        question: "What are the five legal civic themes?",
        answer:
          "Public materials map nationality civics to core themes spanning state and rights, nationality and civic participation, history/geography/EU context, and society/public services. Use official gazettes when published for the exact legal list.",
      },
      {
        question: "Is this UniPrep2Go page the official Portuguese nationality test?",
        answer:
          "No. It is an independent speculative readiness check. It is not IRN or AIMA material and cannot replace an unpublished official paper.",
      },
      {
        question: "Is the civic test the same as CIPLE A2?",
        answer:
          "No. CIPLE A2 (or equivalent Portuguese language evidence) is a separate live hurdle for many nationality applicants. The civic knowledge requirement, when in force, is an additional theme set.",
      },
      {
        question: "Should I prepare if the format is unpublished?",
        answer:
          "Yes for civic literacy and future-proofing, while still completing language and document requirements that apply today. Switch to official samples when Justiça publishes them.",
      },
      {
        question: "Who will administer the Portuguese nationality civic test?",
        answer:
          "Expect Justiça / IRN (or a designated exam body) once implementing rules are final. Always verify on justica.gov.pt rather than blogs.",
      },
      {
        question: "Is there a free Portugal nacionalidade practice test?",
        answer:
          "Yes — this UniPrep2Go readiness check is a free speculative timed diagnostic on the mapped civic themes.",
      },
    ],
    keywords: [
      "nacionalidade portuguesa",
      "conhecimento cívico nacionalidade",
      "portugal citizenship practice test",
      "portugal civic test pending",
      "irn nationality quiz",
      "ciple a2 nationality",
    ],
  },
  "ccse-espana-readiness-check": {
    practiceTestName: "CCSE (España) Readiness Check",
    whatIsExam:
      "Spain’s CCSE (conocimientos constitucionales y socioculturales de España) is the live Instituto Cervantes civics exam required for most nacionalidad española applications by residence. Officially it is 25 multiple-choice questions in 45 minutes with a 60% pass mark (typically 15/25), covering government/constitution, institutions/elections/rights, geography/history/culture, and everyday life/procedures. DELE A2 (or equivalent Spanish language evidence) is a separate exam — CCSE is not a language test. This UniPrep2Go page is an independent longer diagnostic (60 questions, 45 minutes, 60% pass) on overlapping CCSE themes — not Cervantes material and not a substitute for the official 25-question paper. Pair weak topics with the DELE + CCSE Spanish nationality Anki bundle.",
    administeredBy:
      "Instituto Cervantes exam centres worldwide for CCSE; nationality decisions via Spanish Ministry of Justice / civil registry pathways. Language: DELE or recognised equivalents separately.",
    officialFormat:
      "Official CCSE: 25 MCQs, 45 minutes, 60% pass (Instituto Cervantes). DELE A2 (or equivalent) is separate. UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 60% diagnostic pass — use for topic scoring, then drill official Cervantes samples for 25-question fidelity.",
    whoFor:
      "Residence-route nationality applicants who need CCSE plus DESE/DELE language evidence; learners who confuse CCSE with DELE A2; and anyone wanting a longer timed diagnostic before booking Cervantes. Not legal advice and not the official CCSE.",
    howToPrepare:
      "1) Confirm you need both CCSE and DELE A2 (or exemptions). 2) Study the official Cervantes CCSE manual and sample papers — 25 questions / 60%. 3) Drill Constitución, institutions, CCAA, culture/geography, and trámites. 4) Take this free 60-question readiness check for topic scoring. 5) Sit several official-length 25-question timed sets before exam day. Use the DELE + CCSE Anki bundle for spaced repetition.",
    topicBlurbs: [
      {
        id: "constitution",
        label: "Government & constitution",
        blurb:
          "Constitución española, form of state, powers of government, and constitutional literacy for CCSE Task 1-style themes.",
      },
      {
        id: "institutions-rights",
        label: "Institutions, elections & rights",
        blurb:
          "Cortes, elections, rights and duties, and institutional roles that appear throughout the Cervantes bank.",
      },
      {
        id: "geography-culture",
        label: "Geography, history & culture",
        blurb:
          "CCAA, geography, cultural symbols, and historical milestones framed as sociocultural knowledge — not trivia alone.",
      },
      {
        id: "everyday-life",
        label: "Everyday life & procedures",
        blurb:
          "Daily life in Spain, public procedures, and practical sociocultural items from the CCSE manual.",
      },
    ],
    examFaqs: [
      {
        question: "What is the CCSE exam?",
        answer:
          "CCSE is Instituto Cervantes’ constitutional and sociocultural knowledge test for Spanish nationality. It is a written MCQ, separate from DELE language exams.",
      },
      {
        question: "What is the official CCSE format?",
        answer:
          "25 multiple-choice questions in 45 minutes with a 60% pass mark (typically 15/25). Confirm current manuals and fees on examenes.cervantes.es.",
      },
      {
        question: "Is CCSE the same as DELE A2?",
        answer:
          "No. DELE A2 (or equivalent) proves Spanish language. CCSE proves constitutional/sociocultural knowledge. Most residence-route applicants need both unless exempt.",
      },
      {
        question: "Is this UniPrep2Go test the official CCSE?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 60% pass). The official Cervantes exam is 25 questions — not this page.",
      },
      {
        question: "How many times can I take CCSE?",
        answer:
          "Cervantes allows retakes under published registration rules (fees apply each sitting). Check the current Cervantes calendar and cancellation policy before booking.",
      },
      {
        question: "Is there a free CCSE practice test?",
        answer:
          "Yes — take the free UniPrep2Go CCSE readiness check on this page, then drill official Cervantes sample papers for 25-question fidelity.",
      },
      {
        question: "Who administers CCSE?",
        answer:
          "Instituto Cervantes and authorised exam centres. Nationality decisions remain with Spanish authorities after you submit certificates.",
      },
    ],
    keywords: [
      "CCSE practice test",
      "prueba CCSE gratis",
      "CCSE España test",
      "nacionalidad española práctica",
      "Instituto Cervantes CCSE",
      "DELE A2 CCSE",
    ],
  },
  "canadian-citizenship-readiness-check": {
    practiceTestName: "Canadian Citizenship Readiness Check",
    whatIsExam:
      "Canada’s citizenship test is the live IRCC knowledge exam for most adult applicants. Officially it is typically 20 questions in 30 minutes with a 75% pass mark, based on the Discover Canada study guide — history, government and politics, rights and responsibilities, and symbols/regions/geography. Language ability and the citizenship interview/hearing steps are separate parts of the process. This UniPrep2Go page is an independent longer diagnostic (60 questions, 45 minutes, 75% pass) on overlapping Discover Canada themes — not IRCC material and not a substitute for the official 20-question / 30-minute sitting.",
    administeredBy:
      "Immigration, Refugees and Citizenship Canada (IRCC). Tests are scheduled as part of the citizenship application process; confirm current rules on canada.ca.",
    officialFormat:
      "Official IRCC citizenship test: typically 20 questions, 30 minutes, 75% pass (Discover Canada). UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 75% diagnostic pass — use for topic scoring, then drill official study-guide length sets before your IRCC sitting.",
    whoFor:
      "Permanent residents preparing the Canadian citizenship test; applicants who want longer timed practice than the official 20 questions; and learners pairing mocks with the Citizenship & Naturalization Anki Bundle. Not legal advice and not IRCC material.",
    howToPrepare:
      "1) Study Discover Canada cover to cover — rights, government, history, symbols, regions. 2) Memorise Crown/Parliament roles, Charter basics, and provinces/territories. 3) Take this free 60-question readiness check for topic scoring. 4) Drill several 20-question / 30-minute / 75% sets. 5) Prepare language and interview readiness in parallel. Use the Citizenship & Naturalization Anki Bundle for spaced repetition.",
    topicBlurbs: [
      {
        id: "history",
        label: "Canadian history",
        blurb:
          "Indigenous peoples, Confederation, key wars and social milestones framed as Discover Canada civic knowledge.",
      },
      {
        id: "government",
        label: "Government & politics",
        blurb:
          "Constitutional monarchy, Parliament, federal/provincial roles, elections, and how Canadian government works.",
      },
      {
        id: "rights",
        label: "Rights & responsibilities",
        blurb:
          "Charter rights, citizenship responsibilities, and civic duties expected of new Canadians.",
      },
      {
        id: "symbols-geography",
        label: "Symbols, regions & geography",
        blurb:
          "National symbols, provinces and territories, regions, and geography items from Discover Canada.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Canadian citizenship test?",
        answer:
          "It is IRCC’s knowledge test based on Discover Canada, covering history, government, rights, and symbols. Most adult applicants must pass it as part of naturalisation.",
      },
      {
        question: "What is the official Canadian citizenship test format?",
        answer:
          "Typically 20 questions in 30 minutes with a 75% pass mark. Confirm current delivery mode and rules on canada.ca for your invitation letter.",
      },
      {
        question: "Is this UniPrep2Go test the official IRCC exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 75% pass). The official test is shorter (20/30/75) — not this page.",
      },
      {
        question: "Is the citizenship test the same as the language requirement?",
        answer:
          "No. Adequate knowledge of English or French is assessed separately from the Discover Canada knowledge test. Both can appear in your process.",
      },
      {
        question: "What study guide should I use?",
        answer:
          "Use the official Discover Canada study guide from IRCC as your primary source. UniPrep2Go is extra timed practice only.",
      },
      {
        question: "Is there a free Canadian citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go Canadian Citizenship readiness check on this page, then practice 20-question timed sets from Discover Canada themes.",
      },
      {
        question: "Who administers the Canadian citizenship test?",
        answer:
          "Immigration, Refugees and Citizenship Canada (IRCC) schedules and administers the test as part of the citizenship application.",
      },
    ],
    keywords: [
      "Canadian citizenship practice test",
      "Discover Canada quiz",
      "IRCC citizenship test",
      "canada citizenship practice",
      "free canadian citizenship test",
      "discover canada practice questions",
    ],
  },
  "australian-citizenship-readiness-check": {
    practiceTestName: "Australian Citizenship Readiness Check",
    whatIsExam:
      "Australia’s citizenship test is the live Department of Home Affairs knowledge exam for most applicants. Officially it is typically 20 questions in 45 minutes with a 75% overall pass mark plus a mandatory Australian values subsection that must also be passed (dual-style gate — confirm current Home Affairs rules). Themes cover Australian values, history, government and democracy, and Australia/Australians. This UniPrep2Go page is an independent longer diagnostic (60 questions, 45 minutes, 75% single pass mark) on overlapping themes — it does not enforce a separate values gate like the official sitting, is not Home Affairs material, and is not a substitute for the official 20-question paper.",
    administeredBy:
      "Australian Department of Home Affairs as part of the citizenship application process. Confirm current test rules, values requirements, and booking steps on homeaffairs.gov.au.",
    officialFormat:
      "Official Australian citizenship test: typically 20 questions, 45 minutes, 75% overall PLUS a mandatory values gate. UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 75% single diagnostic pass — no separate values gate; finish with official-style practice that includes values items.",
    whoFor:
      "Permanent residents preparing the Australian citizenship test; applicants who need practice beyond the official 20 questions; and learners who must not forget the official values subsection. Not legal advice and not Home Affairs material.",
    howToPrepare:
      "1) Study the official Australian citizenship test resource booklet. 2) Drill values items until you can clear the mandatory values gate, not only overall percentage. 3) Cover history, democracy, and Australian life. 4) Take this free 60-question readiness check for topic scoring (single 75% gate). 5) Sit several 20-question / 45-minute sets that include values. Use the Citizenship & Naturalization Anki Bundle for spaced repetition.",
    topicBlurbs: [
      {
        id: "values",
        label: "Australian values",
        blurb:
          "Democratic beliefs, freedoms, equality, and values items that form the official mandatory values subsection.",
      },
      {
        id: "history",
        label: "Australian history",
        blurb:
          "First Nations peoples, colonial milestones, Federation, and civic history framed for the citizenship test.",
      },
      {
        id: "government",
        label: "Government & democracy",
        blurb:
          "Parliamentary democracy, Constitution, elections, and how Australian government works.",
      },
      {
        id: "australia",
        label: "Australia & Australians",
        blurb:
          "Symbols, states and territories, and everyday Australian life items from the official resource booklet.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Australian citizenship test?",
        answer:
          "It is Home Affairs’ knowledge test on Australian values, history, government, and Australian life — required for most citizenship-by-conferral applicants.",
      },
      {
        question: "What is the official Australian citizenship test format?",
        answer:
          "Typically 20 questions in 45 minutes with a 75% overall pass mark and a mandatory values subsection that must also be passed. Confirm current rules on homeaffairs.gov.au.",
      },
      {
        question: "Does this UniPrep2Go mock include the values gate?",
        answer:
          "No. This diagnostic uses a single 75% pass mark across 60 questions. You must still practice official-style values items separately before exam day.",
      },
      {
        question: "Is this UniPrep2Go test the official Home Affairs exam?",
        answer:
          "No. It is an independent readiness check. The official test is 20 questions / 45 minutes with a values gate — not this page.",
      },
      {
        question: "What should I study?",
        answer:
          "Use the official Australian citizenship test resource booklet as your primary source. UniPrep2Go is extra timed practice only.",
      },
      {
        question: "Is there a free Australian citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go Australian Citizenship readiness check on this page, then drill official-length sets that include values questions.",
      },
      {
        question: "Who administers the Australian citizenship test?",
        answer:
          "The Australian Department of Home Affairs administers the test as part of the citizenship application process.",
      },
    ],
    keywords: [
      "Australian citizenship practice test",
      "Aussie citizenship quiz",
      "citizenship test Australia",
      "australian values test practice",
      "home affairs citizenship practice",
      "free australian citizenship test",
    ],
  },
  "life-in-the-uk-readiness-check": {
    practiceTestName: "Life in the UK Readiness Check",
    whatIsExam:
      "The Life in the UK Test is the live Home Office knowledge exam for most settlement and British citizenship applicants. Officially it is 24 multiple-choice questions in 45 minutes with a 75% pass mark (18/24), currently £50 per attempt (confirm gov.uk). Content covers British values, UK history, government and law, and everyday life/society from the official handbook. English language evidence is a separate requirement. This UniPrep2Go page is an independent longer diagnostic (60 questions, 45 minutes, 75% pass) on overlapping handbook themes — not Home Office material and not a substitute for the official 24-question / £50 sitting.",
    administeredBy:
      "UK Home Office via official Life in the UK Test booking on gov.uk / authorised centres. Confirm current fee, ID rules, and handbook edition before you book.",
    officialFormat:
      "Official Life in the UK Test: 24 MCQs, 45 minutes, 75% pass (18/24), £50. UniPrep2Go readiness check on this page: 60 timed questions, 45 minutes, 75% diagnostic pass — use for topic scoring, then drill official-length 24-question sets before booking.",
    whoFor:
      "Applicants for ILR or British citizenship who must pass Life in the UK; learners who want longer practice than 24 questions; and anyone pairing mocks with the Citizenship & Naturalization Anki Bundle. Not legal advice and not Home Office material.",
    howToPrepare:
      "1) Study the official Life in the UK handbook (current edition). 2) Drill values, Parliament, history milestones, and everyday life facts to 75%+. 3) Take this free 60-question readiness check for topic scoring. 4) Sit several 24-question / 45-minute / 75% mocks. 5) Keep English language evidence on the parallel track. Use the Citizenship & Naturalization Anki Bundle for spaced repetition.",
    topicBlurbs: [
      {
        id: "values",
        label: "British values",
        blurb:
          "Democracy, rule of law, liberty, respect, and tolerance themes from the official Life in the UK handbook.",
      },
      {
        id: "history",
        label: "UK history",
        blurb:
          "Key historical milestones framed as handbook civic knowledge — significance over bare year lists.",
      },
      {
        id: "government",
        label: "Government & law",
        blurb:
          "Parliament, government, monarchy, courts, and how UK democracy and law work day to day.",
      },
      {
        id: "everyday",
        label: "Everyday life & society",
        blurb:
          "Everyday UK life, nations and regions, and society items that appear throughout the handbook.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Life in the UK Test?",
        answer:
          "It is the Home Office knowledge test required for most settlement (ILR) and British citizenship applications, based on the official handbook.",
      },
      {
        question: "What is the official Life in the UK format?",
        answer:
          "24 multiple-choice questions in 45 minutes with a 75% pass mark (18/24). The fee is currently £50 per attempt — confirm on gov.uk before booking.",
      },
      {
        question: "Is this UniPrep2Go test the official Home Office exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (45 minutes, 75% pass). The official test is 24 questions for £50 — not this page.",
      },
      {
        question: "Is Life in the UK the same as an English language test?",
        answer:
          "No. English language evidence (or exemption) is separate from the Life in the UK knowledge test. Many applicants need both.",
      },
      {
        question: "How much does the Life in the UK Test cost?",
        answer:
          "Currently £50 per attempt on the official booking service. Always confirm the live fee on gov.uk.",
      },
      {
        question: "Is there a free Life in the UK practice test?",
        answer:
          "Yes — take the free UniPrep2Go Life in the UK readiness check on this page, then practice official-length 24-question timed sets.",
      },
      {
        question: "Who administers the Life in the UK Test?",
        answer:
          "The UK Home Office via the official Life in the UK Test booking system and authorised test centres listed on gov.uk.",
      },
    ],
    keywords: [
      "Life in the UK practice test",
      "LITUK free test",
      "British citizenship test practice",
      "life in the uk test 24 questions",
      "home office citizenship practice",
      "ILR life in the uk",
    ],
  },
  "leben-in-deutschland-readiness-check": {
    practiceTestName: "Leben in Deutschland / Einbürgerungstest Readiness Check",
    whatIsExam:
      "Leben in Deutschland (Einbürgerungstest) is Germany’s live BAMF naturalisation civics exam. Officially it is 33 questions in 60 minutes with 17 correct answers required to pass, drawn from a published catalogue that includes federal items plus Land-specific questions. Themes cover politics/constitution/rights, German history, society/religion/law, and federal states/everyday life. German language evidence (usually B1) is a separate requirement. This UniPrep2Go page is an independent diagnostic (60 questions, 60 minutes, 55% pass — aligned to roughly the official 17/33 difficulty) on overlapping themes — not BAMF material and not a substitute for the official 33-question sitting.",
    administeredBy:
      "BAMF frameworks via authorised Volkshochschulen and exam centres in the Länder. Confirm booking, fees, and Land-specific question sets on official BAMF / local pages.",
    officialFormat:
      "Official Einbürgerungstest / Leben in Deutschland: 33 questions, 60 minutes, 17 correct to pass (BAMF catalogue + Land items). UniPrep2Go readiness check on this page: 60 timed questions, 60 minutes, 55% diagnostic pass — use for topic scoring, then drill official 33-question model tests including your Bundesland.",
    whoFor:
      "Residents preparing the German Einbürgerungstest; applicants who need longer practice than 33 questions; and learners pairing mocks with the Citizenship & Naturalization Anki Bundle. Not legal advice and not BAMF material.",
    howToPrepare:
      "1) Download the official BAMF question catalogue and your Land’s questions. 2) Drill constitution, history, society, and federal-state items to clear 17/33 comfortably. 3) Keep B1 German evidence on the parallel track. 4) Take this free 60-question / 60-minute readiness check for topic scoring. 5) Sit several official-length 33-question timed sets. Use the Citizenship & Naturalization Anki Bundle for spaced repetition.",
    topicBlurbs: [
      {
        id: "politics-rights",
        label: "Politics, constitution & rights",
        blurb:
          "Grundgesetz, Bundestag/Bundesrat, Grundrechte, and democratic institutions central to the Einbürgerungstest.",
      },
      {
        id: "history",
        label: "German history",
        blurb:
          "Key milestones from empire to reunification framed as civic knowledge — significance over bare dates.",
      },
      {
        id: "society-law",
        label: "Society, religion & law",
        blurb:
          "Religious freedom, rule of law, family/society norms, and legal basics that appear in the BAMF catalogue.",
      },
      {
        id: "federal-states",
        label: "Federal states & everyday life",
        blurb:
          "Bundesländer literacy, everyday federal life, and Land-specific themes you must also drill from the official set.",
      },
    ],
    examFaqs: [
      {
        question: "What is the Leben in Deutschland / Einbürgerungstest?",
        answer:
          "It is Germany’s official naturalisation civics test administered under BAMF frameworks — 33 questions with 17 correct required to pass, including Land-specific items.",
      },
      {
        question: "What is the official exam format?",
        answer:
          "33 questions in 60 minutes; you need 17 correct answers to pass. Questions come from the published BAMF catalogue plus your Bundesland set.",
      },
      {
        question: "Is this UniPrep2Go test the official BAMF exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (60 minutes, 55% pass). The official exam is 33 questions / 17 correct — not this page.",
      },
      {
        question: "Do I also need a German language certificate?",
        answer:
          "Usually yes — naturalisation typically requires German around B1 (or qualifying schooling) separate from the civics test. Confirm exemptions on official pages.",
      },
      {
        question: "Are there state-specific questions?",
        answer:
          "Yes. Besides federal catalogue items, you must prepare the questions for your Bundesland. Official lists are published for each Land.",
      },
      {
        question: "Is there a free Leben in Deutschland practice test?",
        answer:
          "Yes — take the free UniPrep2Go readiness check on this page, then practice official 33-question BAMF-style sets including your Land.",
      },
      {
        question: "Who administers the Einbürgerungstest?",
        answer:
          "Authorised centres (often VHS) under BAMF frameworks in the Länder. Book only through official local channels.",
      },
    ],
    keywords: [
      "Leben in Deutschland test",
      "Einbürgerungstest üben",
      "German citizenship practice test",
      "BAMF Einbürgerungstest",
      "leben in deutschland practice",
      "33 fragen einbürgerungstest",
    ],
  },
  "swiss-citizenship-readiness-check": {
    practiceTestName: "Einbürgerung Schweiz Readiness Check (Federal DE)",
    whatIsExam:
      "Switzerland has NO single federal multiple-choice naturalisation exam for the whole country. Ordinary naturalisation is cantonal and communal: each Kanton/Gemeinde sets interviews, local knowledge checks, or written tests that vary widely. What is relatively stable is the federal Staatskunde theme set (politics and direct democracy, history/culture, geography/social system, naturalisation procedure) that SEM frameworks expect applicants to know — often assessed locally in German, French, or Italian. This UniPrep2Go page is an independent German-language diagnostic (60 questions, 45 minutes, 70% pass) on those federal DE themes only — not SEM material, not a cantonal exam paper, and not a substitute for your Gemeinde’s actual interview or test format.",
    administeredBy:
      "Federal framework: SEM (State Secretariat for Migration). Exam-day reality: your canton and commune decide format, language, and pass rules. Always confirm with your Einwohnerkontrolle / naturalisation office.",
    officialFormat:
      "No federal Swiss MCQ naturalisation exam. Cantons/communes run interviews and/or local tests with widely different formats. UniPrep2Go on this page: independent federal Staatskunde DE diagnostic only (60/45/70) — use it for theme literacy, then prepare your local Gemeinde format separately.",
    whoFor:
      "German-speaking ordinary naturalisation applicants who need federal Staatskunde literacy; learners comparing DE/FR/IT twin checks; and anyone who wrongly expects one national Swiss MCQ like Life in the UK. Not legal advice and not your cantonal exam.",
    howToPrepare:
      "1) Ask your commune exactly how they test (interview, written, both). 2) Master federal themes: Bundesrat, Parlament, Volksinitiative/Referendum, history, geography, social system, procedure. 3) Add canton/commune facts (capital, executive, local rights). 4) Take this free 60-question DE readiness check for federal topic scoring. 5) Practice answering aloud in the interview style your Gemeinde uses. Pair with the Swiss Citizenship Anki Bundle (DE / FR / IT).",
    topicBlurbs: [
      {
        id: "politics-democracy",
        label: "Politik, Institutionen & direkte Demokratie",
        blurb:
          "Bundesrat, Parlament, Gewaltenteilung, Volksinitiative und Referendum — Kern der föderalen Staatskunde.",
      },
      {
        id: "history-culture",
        label: "Geschichte, Kultur & Alltag",
        blurb:
          "Wichtige historische Stationen, Mehrsprachigkeit und Alltagskultur im föderalen Kontext.",
      },
      {
        id: "geography-society",
        label: "Geographie & Sozialsystem",
        blurb:
          "Kantone, Regionen, Nachbarn und Sozialversicherungs-/Alltagsstrukturen der Schweiz.",
      },
      {
        id: "naturalisation",
        label: "Einbürgerungsverfahren",
        blurb:
          "Ordentliche Einbürgerung: Bund/Kanton/Gemeinde-Rollen, Voraussetzungen und Verfahrenslogik — lokal immer verifizieren.",
      },
    ],
    examFaqs: [
      {
        question: "Is there a federal Swiss citizenship MCQ exam?",
        answer:
          "No. Switzerland does not run one nationwide multiple-choice naturalisation exam. Cantons and communes set their own interviews and/or tests.",
      },
      {
        question: "What does this UniPrep2Go Swiss DE check cover?",
        answer:
          "Federal Staatskunde themes in German only — politics/direct democracy, history/culture, geography/social system, and naturalisation procedure. It is not your Gemeinde exam.",
      },
      {
        question: "Do FR and IT versions exist?",
        answer:
          "Yes — UniPrep2Go also offers Naturalisation Suisse (FR) and Naturalizzazione Svizzera (IT) twin readiness checks linked to the same Swiss Citizenship Anki Bundle.",
      },
      {
        question: "Is SEM the exam centre?",
        answer:
          "SEM sets federal naturalisation frameworks, but your canton and commune administer the practical knowledge check. Always ask your local office for the exact format.",
      },
      {
        question: "Should I memorise only federal facts?",
        answer:
          "No. Federal literacy is necessary but not sufficient — communes usually also test local geography, institutions, and integration in daily life.",
      },
      {
        question: "Is this page official Swiss government material?",
        answer:
          "No. It is an independent readiness diagnostic. It does not replace SEM guidance or your cantonal/communal requirements.",
      },
      {
        question: "Is there a free Einbürgerung Schweiz practice test?",
        answer:
          "Yes — take this free German-language federal Staatskunde readiness check, then prepare the interview or written format your commune actually uses.",
      },
    ],
    keywords: [
      "Einbürgerung Schweiz üben",
      "Staatskunde Schweiz Test",
      "Swiss citizenship practice German",
      "Einbürgerungstest Schweiz",
      "föderale Staatskunde",
      "cantonal naturalisation Switzerland",
    ],
  },
  "naturalisation-suisse-readiness-check": {
    practiceTestName: "Naturalisation Suisse Readiness Check (Federal FR)",
    whatIsExam:
      "La Suisse n’a PAS d’examen fédéral unique en QCM pour la naturalisation ordinaire. La procédure est cantonale et communale : chaque canton/commune organise entretien, test local ou les deux, avec des formats très variables. Ce qui reste stable, ce sont les thèmes fédéraux de connaissances civiques (politique et démocratie directe, histoire/culture, géographie/système social, procédure de naturalisation) attendus dans le cadre SEM — souvent évalués localement en français, allemand ou italien. Cette page UniPrep2Go est un diagnostic indépendant en français (60 questions, 45 minutes, 70 %) sur ces thèmes fédéraux FR uniquement — pas un matériel SEM, pas l’examen de votre commune, et pas un substitut à l’entretien local.",
    administeredBy:
      "Cadre fédéral : SEM (Secrétariat d’État aux migrations). Réalité du jour J : votre canton et votre commune fixent format, langue et règles. Vérifiez toujours auprès du contrôle des habitants / service de naturalisation.",
    officialFormat:
      "Pas de QCM fédéral suisse de naturalisation. Cantons/communes : entretiens et/ou tests locaux (formats variables). UniPrep2Go ici : diagnostic fédéral FR indépendant seulement (60/45/70) — literacy thématique, puis préparation du format communal réel.",
    whoFor:
      "Candidats francophones à la naturalisation ordinaire qui doivent maîtriser les connaissances fédérales ; personnes qui comparent les jumeaux DE/FR/IT ; et ceux qui croient à tort qu’il existe un QCM national unique. Pas un conseil juridique et pas l’examen cantonal.",
    howToPrepare:
      "1) Demandez à votre commune comment elle évalue (entretien, écrit, les deux). 2) Maîtrisez les thèmes fédéraux : Conseil fédéral, Parlement, initiative/référendum, histoire, géographie, système social, procédure. 3) Ajoutez les faits cantonaux/communaux. 4) Passez ce contrôle FR gratuit de 60 questions pour le scoring thématique. 5) Entraînez-vous à l’oral si votre commune privilégie l’entretien. Couplez avec le Swiss Citizenship Anki Bundle (DE / FR / IT).",
    topicBlurbs: [
      {
        id: "politics-democracy",
        label: "Politique, institutions & démocratie directe",
        blurb:
          "Conseil fédéral, Parlement, séparation des pouvoirs, initiative et référendum — cœur des connaissances fédérales.",
      },
      {
        id: "history-culture",
        label: "Histoire, culture & vie quotidienne",
        blurb:
          "Jalons historiques, plurilinguisme et culture du quotidien dans le contexte fédéral suisse.",
      },
      {
        id: "geography-society",
        label: "Géographie & système social",
        blurb:
          "Cantons, régions, voisins et structures sociales / assurance sociale de la Suisse.",
      },
      {
        id: "naturalisation",
        label: "Procédure de naturalisation",
        blurb:
          "Naturalisation ordinaire : rôles Confédération/canton/commune, conditions et logique de procédure — toujours vérifier localement.",
      },
    ],
    examFaqs: [
      {
        question: "La Suisse a-t-elle un examen fédéral de naturalisation en QCM ?",
        answer:
          "Non. Il n’existe pas d’examen national unique en QCM. Les cantons et communes organisent leurs propres entretiens et/ou tests.",
      },
      {
        question: "Que couvre ce contrôle UniPrep2Go FR ?",
        answer:
          "Uniquement les thèmes fédéraux de connaissances civiques en français — politique/démocratie directe, histoire/culture, géographie/système social, procédure. Ce n’est pas l’examen de votre commune.",
      },
      {
        question: "Existe-t-il des versions DE et IT ?",
        answer:
          "Oui — UniPrep2Go propose aussi Einbürgerung Schweiz (DE) et Naturalizzazione Svizzera (IT), liées au même Swiss Citizenship Anki Bundle.",
      },
      {
        question: "Le SEM organise-t-il l’examen ?",
        answer:
          "Le SEM fixe le cadre fédéral, mais c’est votre canton/commune qui administre le contrôle concret. Demandez toujours le format local exact.",
      },
      {
        question: "Les faits fédéraux suffisent-ils ?",
        answer:
          "Non. La literacy fédérale est nécessaire mais pas suffisante — les communes testent aussi la géographie et les institutions locales.",
      },
      {
        question: "Cette page est-elle un matériel officiel ?",
        answer:
          "Non. C’est un diagnostic indépendant. Elle ne remplace ni les consignes SEM ni les exigences cantonales/communales.",
      },
      {
        question: "Y a-t-il un test gratuit de naturalisation suisse ?",
        answer:
          "Oui — ce readiness check FR gratuit sur les thèmes fédéraux, puis préparez le format réel de votre commune.",
      },
    ],
    keywords: [
      "naturalisation suisse test",
      "examen naturalisation suisse",
      "connaissances fédérales Suisse",
      "citoyenneté suisse pratique",
      "naturalisation canton commune",
      "SEM naturalisation",
    ],
  },
  "naturalizzazione-svizzera-readiness-check": {
    practiceTestName: "Naturalizzazione Svizzera Readiness Check (Federal IT)",
    whatIsExam:
      "La Svizzera NON ha un unico esame federale a quiz per la naturalizzazione ordinaria. La procedura è cantonale e comunale: ogni Cantone/Comune organizza colloquio, prova locale o entrambi, con formati molto diversi. Ciò che resta stabile è il blocco federale di Staatskunde (politica e democrazia diretta, storia/cultura, geografia/sistema sociale, procedura di naturalizzazione) atteso nei quadri SEM — spesso valutato localmente in italiano, tedesco o francese. Questa pagina UniPrep2Go è un diagnostico indipendente in italiano (60 domande, 45 minuti, 70%) solo sui temi federali IT — non materiale SEM, non l’esame del vostro Comune, e non un sostituto del colloquio locale.",
    administeredBy:
      "Quadro federale: SEM (Segreteria di Stato della migrazione). Realtà del giorno dell’esame: il vostro Cantone e Comune fissano formato, lingua e regole. Verificate sempre presso il controllo abitanti / ufficio naturalizzazioni.",
    officialFormat:
      "Nessun QCM federale svizzero di naturalizzazione. Cantoni/Comuni: colloqui e/o test locali (formati variabili). UniPrep2Go qui: solo diagnostico federale IT indipendente (60/45/70) — literacy tematica, poi preparazione del formato comunale reale.",
    whoFor:
      "Candidati italofoni alla naturalizzazione ordinaria che devono padroneggiare le conoscenze federali; chi confronta i gemelli DE/FR/IT; e chi crede per errore che esista un unico QCM nazionale. Non è consulenza legale e non è l’esame cantonale.",
    howToPrepare:
      "1) Chiedete al Comune come valuta (colloquio, scritto, entrambi). 2) Padroneggiate i temi federali: Consiglio federale, Parlamento, iniziativa/referendum, storia, geografia, sistema sociale, procedura. 3) Aggiungete i fatti cantonali/comunali. 4) Fate questo controllo IT gratuito da 60 domande per lo scoring tematico. 5) Allenatevi all’orale se il Comune privilegia il colloquio. Abbinate allo Swiss Citizenship Anki Bundle (DE / FR / IT).",
    topicBlurbs: [
      {
        id: "politics-democracy",
        label: "Politica, istituzioni e democrazia diretta",
        blurb:
          "Consiglio federale, Parlamento, separazione dei poteri, iniziativa e referendum — cuore delle conoscenze federali.",
      },
      {
        id: "history-culture",
        label: "Storia, cultura e vita quotidiana",
        blurb:
          "Tappe storiche, plurilinguismo e cultura quotidiana nel contesto federale svizzero.",
      },
      {
        id: "geography-society",
        label: "Geografia e sistema sociale",
        blurb:
          "Cantoni, regioni, vicini e strutture sociali / assicurazioni sociali della Svizzera.",
      },
      {
        id: "naturalisation",
        label: "Procedura di naturalizzazione",
        blurb:
          "Naturalizzazione ordinaria: ruoli Confederazione/Cantone/Comune, requisiti e logica della procedura — verificare sempre in loco.",
      },
    ],
    examFaqs: [
      {
        question: "Esiste un esame federale svizzero di naturalizzazione a QCM?",
        answer:
          "No. Non c’è un unico esame nazionale a quiz. Cantoni e Comuni organizzano i propri colloqui e/o test.",
      },
      {
        question: "Cosa copre questo controllo UniPrep2Go IT?",
        answer:
          "Solo i temi federali di conoscenze civiche in italiano — politica/democrazia diretta, storia/cultura, geografia/sistema sociale, procedura. Non è l’esame del vostro Comune.",
      },
      {
        question: "Esistono versioni DE e FR?",
        answer:
          "Sì — UniPrep2Go offre anche Einbürgerung Schweiz (DE) e Naturalisation Suisse (FR), collegate allo stesso Swiss Citizenship Anki Bundle.",
      },
      {
        question: "Il SEM amministra l’esame?",
        answer:
          "Il SEM fissa il quadro federale, ma Cantone e Comune amministrano il controllo concreto. Chiedete sempre il formato locale esatto.",
      },
      {
        question: "Bastano i fatti federali?",
        answer:
          "No. La literacy federale è necessaria ma non sufficiente — i Comuni testano anche geografia e istituzioni locali.",
      },
      {
        question: "Questa pagina è materiale ufficiale?",
        answer:
          "No. È un diagnostico indipendente. Non sostituisce le indicazioni SEM né i requisiti cantonali/comunali.",
      },
      {
        question: "C’è un test gratuito di naturalizzazione svizzera?",
        answer:
          "Sì — questo readiness check IT gratuito sui temi federali, poi preparate il formato reale del vostro Comune.",
      },
    ],
    keywords: [
      "naturalizzazione svizzera test",
      "esame cittadinanza svizzera",
      "conoscenze federali Svizzera",
      "cittadinanza svizzera pratica",
      "naturalizzazione cantone comune",
      "SEM naturalizzazione",
    ],
  },
  "naturalisation-francaise-readiness-check": {
    practiceTestName: "Naturalisation française — Examen civique Readiness Check",
    whatIsExam:
      "France’s naturalisation civics requirement is now a LIVE written examen civique (from January 2026): typically 40 multiple-choice questions in 45 minutes with an 80% pass mark, covering Republic institutions, history, values/symbols, and rights/duties/civic life. It is NOT “just an interview” anymore for pathways that use the new exam — treat older blog posts about only the entretien as outdated unless your préfecture still documents an interview-only exception. French language at B2 (or qualifying schooling) remains a separate live hurdle. This UniPrep2Go page is an independent diagnostic (60 questions, 60 minutes, 70% pass) on overlapping civics themes — longer and differently scored than the official 40/45/80 paper, not préfecture material, and not a substitute for the live examen civique.",
    administeredBy:
      "French naturalisation pathways via préfectures / Ministry of the Interior frameworks; examen civique sittings under published 2026 rules. Confirm booking, fees, and whether your dossier still uses interview components on service-public.fr and préfecture pages.",
    officialFormat:
      "LIVE from Jan 2026: examen civique typically 40 MCQs, 45 minutes, 80% pass — plus separate B2 language evidence. Not interview-only for standard exam pathways. UniPrep2Go readiness check on this page: 60 timed questions, 60 minutes, 70% diagnostic pass — use for topic scoring, then drill official-length 40/45/80 sets before exam day.",
    whoFor:
      "Naturalisation applicants who must sit the 2026 examen civique; learners still reading outdated “interview only” guides; and anyone who needs timed MCQ practice alongside B2 French. Not legal advice and not official préfecture material.",
    howToPrepare:
      "1) Confirm your préfecture path uses the written examen civique (Jan 2026+) and what language proof you need (usually B2). 2) Study institutions of the Republic, history milestones, Marianne/Tricolore/Devise, and rights/duties. 3) Take this free 60-question / 60-minute readiness check for topic scoring. 4) Sit several 40-question / 45-minute / 80% mocks. 5) Keep oral assimilation readiness if an entretien still appears in your file. Use the Citizenship & Naturalization Anki Bundle for spaced repetition.",
    topicBlurbs: [
      {
        id: "institutions",
        label: "Institutions & Republic",
        blurb:
          "Président, Gouvernement, Parlement, collectivités, and how the Fifth Republic’s institutions work.",
      },
      {
        id: "history",
        label: "French history",
        blurb:
          "Civic milestones from Revolution to Republic framed for the examen civique — significance over trivia dates alone.",
      },
      {
        id: "values-symbols",
        label: "Values & symbols",
        blurb:
          "Liberté, Égalité, Fraternité, Tricolore, Marianne, La Marseillaise, and laïcité as exam-facing values literacy.",
      },
      {
        id: "rights-duties",
        label: "Rights, duties & civic life",
        blurb:
          "Fundamental rights, civic duties, voting, and everyday republican civic life themes.",
      },
    ],
    examFaqs: [
      {
        question: "Is French naturalisation still only an interview?",
        answer:
          "No for standard pathways under the LIVE Jan 2026 examen civique rules — expect a written 40-question / 45-minute / 80% MCQ plus separate B2 language evidence. Older “interview only” guides are outdated unless your préfecture documents an exception.",
      },
      {
        question: "What is the official examen civique format?",
        answer:
          "Typically 40 multiple-choice questions in 45 minutes with an 80% pass mark from January 2026. Confirm current figures on service-public.fr / préfecture notices before booking.",
      },
      {
        question: "Is this UniPrep2Go test the official French exam?",
        answer:
          "No. This is an independent 60-question readiness diagnostic (60 minutes, 70% pass). The official examen civique is 40/45/80 — not this page.",
      },
      {
        question: "Is the examen civique the same as the B2 language requirement?",
        answer:
          "No. B2 French (or qualifying schooling) is separate from the civics MCQ. Many applicants need both.",
      },
      {
        question: "Do I still need an entretien de naturalisation?",
        answer:
          "Some dossiers may still include assimilation / interview steps alongside or after the written exam. Check your préfecture checklist rather than assuming interview-only or exam-only.",
      },
      {
        question: "Is there a free naturalisation française practice test?",
        answer:
          "Yes — take the free UniPrep2Go readiness check on this page, then practice official-length 40-question / 80% timed sets.",
      },
      {
        question: "Who administers the examen civique?",
        answer:
          "French Interior / préfecture frameworks under the published 2026 naturalisation rules. Use only official registration channels.",
      },
    ],
    keywords: [
      "examen civique naturalisation",
      "naturalisation française test",
      "entretien naturalisation",
      "French citizenship practice test",
      "examen civique 40 questions",
      "naturalisation B2",
      "naturalisation janvier 2026",
    ],
  },
  "us-citizenship-readiness-check": {
    practiceTestName: "U.S. Citizenship Civics Readiness Check",
    whatIsExam:
      "The U.S. naturalization civics test is a LIVE oral exam at the USCIS interview: an officer asks up to 10 questions from the official 100-question civics list (2020 or 2025 list depending on your filing rules), and you pass by answering 6 correctly. It is not a written multiple-choice sitting on exam day. English speaking/reading/writing is assessed separately in the same interview process. This UniPrep2Go page is an independent written MCQ diagnostic (30 questions, 30 minutes, 80% pass) covering American government, history, and geography/symbols — useful for drilling the 100-question bank under time pressure, but not a substitute for oral practice and not official USCIS material. Remediating weak topics with the Citizenship & Naturalization Anki Bundle is the intended next step.",
    administeredBy:
      "U.S. Citizenship and Immigration Services (USCIS) at the N-400 naturalization interview. Confirm whether you are on the 2020 or 2025 civics list for your application date on uscis.gov.",
    officialFormat:
      "Official USCIS civics test: oral — up to 10 questions from the 100-item list; pass by answering 6 correctly (English tests separate). UniPrep2Go readiness check on this page: written MCQ — 30 questions, 30 minutes, 80% diagnostic pass across government/history/geography — practice aid only, then drill oral recall of all 100.",
    whoFor:
      "Green-card holders preparing the N-400 civics interview; applicants who want timed MCQ diagnostics before oral drills; and learners pairing mocks with the Citizenship & Naturalization Anki Bundle. Not legal advice and not a USCIS interview.",
    howToPrepare:
      "1) Confirm your civics list (2020 vs 2025) on uscis.gov. 2) Memorise all 100 official Q&A with spoken answers, not only recognition. 3) Take this free 30-question / 30-minute / 80% MCQ check for topic scoring. 4) Practice oral sets of 10 until you clear 6+ cold. 5) Prep English read/write/speak in parallel. Use the Citizenship & Naturalization Anki Bundle for spaced repetition of the full bank.",
    topicBlurbs: [
      {
        id: "government",
        label: "American Government & Civics",
        blurb:
          "Constitution, branches of government, rights and responsibilities, and system-of-government items from the USCIS civics list.",
      },
      {
        id: "history",
        label: "American History",
        blurb:
          "Colonial period, independence, wars, and 1800s–modern history items framed for oral civics recall.",
      },
      {
        id: "geography",
        label: "Geography, Symbols & Holidays",
        blurb:
          "States, capitals, geography, symbols, and national holidays from the USCIS 100-question bank.",
      },
    ],
    examFaqs: [
      {
        question: "What is the U.S. citizenship civics test?",
        answer:
          "It is the USCIS oral civics exam at your N-400 interview. An officer asks up to 10 questions from the official 100-question list; you pass by answering 6 correctly.",
      },
      {
        question: "Is the official test multiple choice?",
        answer:
          "No. The official civics test is oral. This UniPrep2Go page is a written MCQ readiness diagnostic only — you still need spoken recall practice for interview day.",
      },
      {
        question: "What is the UniPrep2Go U.S. mock format?",
        answer:
          "30 multiple-choice questions in 30 minutes with an 80% readiness pass mark across government, history, and geography/symbols topics.",
      },
      {
        question: "Is English tested separately?",
        answer:
          "Yes. USCIS also assesses speaking, reading, and writing in English during the naturalization interview (with age/time exemptions where published rules apply).",
      },
      {
        question: "Which civics list should I study — 2020 or 2025?",
        answer:
          "It depends on your application filing date and USCIS transition rules. Confirm on uscis.gov which 100-question list applies to your case before you memorise.",
      },
      {
        question: "Is this UniPrep2Go test official USCIS material?",
        answer:
          "No. It is an independent practice diagnostic using Prep2Go civics themes. Always study the official USCIS 100 questions for interview fidelity.",
      },
      {
        question: "Is there a free U.S. citizenship practice test?",
        answer:
          "Yes — take the free UniPrep2Go 30-question readiness check on this page, then drill all 100 official questions aloud until you can pass 6 of 10 cold.",
      },
    ],
    keywords: [
      "us citizenship practice test 2026",
      "uscis civics test free",
      "naturalization test practice",
      "n-400 civics questions",
      "citizenship test questions 2026",
      "100 civics questions practice",
    ],
  },
};
