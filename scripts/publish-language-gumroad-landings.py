#!/usr/bin/env python3
"""Publish Gumroad custom landing pages for curated language Anki decks.

Gumroad strips <img> from the default product description. Custom landing HTML
keeps sample screenshots. Do NOT leave samples as product covers — host them on
public-files.gumroad.com via temporary cover upload, then remove.
"""

from __future__ import annotations

import argparse
import html
import json
import subprocess
import tempfile
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "src/data/gumroad/language-anki-decks.json"
CDN_CACHE_PATH = ROOT / "src/data/gumroad/language-sample-cdn.json"
SAMPLES_DIR = ROOT / "public/samples"
OUT_DIR = ROOT / "landing-pages/language"

# Multi-pathway cold-traffic copy — Gumroad buyers often have zero site context.
SPECS: dict[str, dict[str, Any]] = {
    "ciple-a2-european-portuguese-anki-deck": {
        "label": "CIPLE CAPLE Portuguese Citizenship",
        "headline": "CIPLE CAPLE Portuguese Citizenship Anki Deck — 1600+ Flashcards",
        "exam": "CIPLE / CAPLE A2 · Portuguese residency & citizenship",
        "hook": (
            "European Portuguese vocabulary for CIPLE / CAPLE A2 — the CAPLE diploma "
            "used for autorização de residência and nacionalidade portuguesa."
        ),
        "audience": (
            "For CIPLE / CAPLE A2 candidates and Portugal residency or citizenship "
            "applicants who need daily PT-PT recall with audio — not tourist phrase lists."
        ),
        "disclaimer": "CAPLE / University of Lisbon",
        "about_heading": "What is CIPLE / CAPLE A2?",
        "about": (
            "CIPLE is the CAPLE A2 certificate in European Portuguese. Many residency "
            "and nationality pathways in Portugal accept CAPLE A2 as language evidence. "
            "This deck drills the shared high-frequency vocabulary those pathways need."
        ),
        "pathways": "CIPLE A2 · CAPLE A2 · autorização de residência · nacionalidade portuguesa",
        "deck_covers": (
            "1600+ PT-PT cards with headword, meaning, contextual examples, pronunciation audio, "
            "and image cues for everyday A2 situations."
        ),
        "not_included": (
            "Official CAPLE past papers, speaking-partner practice, or citizenship civics content "
            "— pair with official CAPLE materials and spoken practice."
        ),
        "why_anki": (
            "Citizenship and residency deadlines reward consistent recall. Spaced Anki keeps "
            "high-frequency European Portuguese available under exam pressure."
        ),
        "cards": "1600+",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["estar", "eu", "tu"],
        "facts": [
            ("Pathways", "CIPLE / CAPLE · residency · citizenship"),
            ("Cards", "1600+ vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "delf-b2-french-anki-deck": {
        "label": "DELF DALF TCF TEF French",
        "headline": "DELF DALF TCF TEF French Anki Deck — 2000+ Flashcards",
        "exam": "DELF / DALF · TCF Canada · TEF Canada · TCF ANF · TCF général",
        "hook": (
            "One French vocabulary bank for DELF / DALF diplomas, TCF/TEF Canada immigration, "
            "TCF ANF naturalization, and TCF général university admission."
        ),
        "audience": (
            "For French diploma, Canada Express Entry / Quebec, French naturalization, "
            "and university applicants who need high-frequency vocabulary with native audio."
        ),
        "disclaimer": "France Éducation international / IRCC / TCF-TEF bodies",
        "about_heading": "Which French exams does this cover?",
        "about": (
            "DELF and DALF are lifetime diplomas. TCF Canada and TEF Canada support Canadian "
            "immigration. TCF ANF supports French naturalization. TCF général is widely used "
            "for French university admission. These pathways share a large high-frequency lexicon."
        ),
        "pathways": "DELF · DALF · TCF Canada · TEF Canada · TCF ANF · TCF général",
        "deck_covers": (
            "2000+ cards pairing each headword with a visual cue, native French audio, "
            "and a contextual example — shared core vocabulary across those exams."
        ),
        "not_included": (
            "Official TCF/TEF listening formats, writing templates, or full mock exams — "
            "keep using official practice for timed skills."
        ),
        "why_anki": (
            "French certificate and immigration scores reward fast lexical access. "
            "Daily spaced recall beats cramming word lists the week before."
        ),
        "cards": "2000+",
        "format_note": "Anki .apkg with audio and images (~159 MB)",
        "sample_captions": ["être", "je", "tu"],
        "facts": [
            ("Pathways", "DELF DALF · TCF · TEF"),
            ("Cards", "2000+ vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "dutch-a2-inburgering-anki-deck": {
        "label": "Dutch Inburgering NT2 A2",
        "headline": "Dutch Inburgering NT2 A2 Anki Deck — 1000+ Flashcards",
        "exam": "Inburgering · Staatsexamen NT2 A2 · residency & naturalisatie",
        "hook": (
            "Dutch A2 vocabulary for civic integration (Inburgering), Staatsexamen NT2 A2, "
            "and everyday language toward residency and naturalisatie."
        ),
        "audience": (
            "For migrants preparing Inburgering or NT2 A2 who need bilingual examples, "
            "native audio, and illustrations — not tourist Dutch."
        ),
        "disclaimer": "DUO / Dutch government exam bodies",
        "about_heading": "What is Inburgering / NT2 A2?",
        "about": (
            "Inburgering is the Dutch civic integration pathway. Staatsexamen NT2 assesses "
            "Dutch as a second language. A2-level vocabulary supports everyday life, residency, "
            "and naturalisatie language requirements."
        ),
        "pathways": "Inburgering · Staatsexamen NT2 A2 · residency · naturalisatie",
        "deck_covers": (
            "1000+ high-frequency Dutch words with English glosses, bilingual examples, "
            "native audio, and illustrations."
        ),
        "not_included": (
            "Official Inburgering civic knowledge modules or full NT2 exam listening papers — "
            "pair this deck with official practice."
        ),
        "why_anki": (
            "Integration exams reward automatic everyday vocabulary. Spaced Anki keeps "
            "housing, work, services, and daily-life words retrievable."
        ),
        "cards": "1000+",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["zijn", "ik", "jij"],
        "facts": [
            ("Pathways", "Inburgering · NT2 A2"),
            ("Cards", "1000+ vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "german-a2-anki-deck": {
        "label": "German Goethe telc ÖSD DTZ",
        "headline": "German Goethe telc ÖSD DTZ Anki Deck — 1000 Flashcards",
        "exam": "Goethe-Institut A2 · telc Deutsch A2 · ÖSD A2 · DTZ",
        "hook": (
            "Shared German A2 vocabulary for Goethe-Institut, telc, ÖSD certificates, "
            "and DTZ (Deutsch-Test für Zuwanderer) immigrant integration."
        ),
        "audience": (
            "For A2 certificate candidates and DTZ learners who need one essential word bank "
            "across the main German pathways — not a tourist phrase pack."
        ),
        "disclaimer": "Goethe-Institut / telc / ÖSD / BAMF",
        "about_heading": "Which German A2 pathways does this cover?",
        "about": (
            "Goethe-Institut A2, telc Deutsch A2, and ÖSD Zertifikat A2 are widely recognized "
            "certificates. DTZ is the immigrant integration exam used in Germany. They share "
            "a large A2 vocabulary core this deck targets."
        ),
        "pathways": "Goethe A2 · telc A2 · ÖSD A2 · DTZ",
        "deck_covers": (
            "1,000 essential German A2 words with meanings, examples, and media cues "
            "for certificate and immigration pathways."
        ),
        "not_included": (
            "Official Goethe/telc/ÖSD exam papers or full DTZ civic modules — "
            "use this deck for lexical recall alongside official practice."
        ),
        "why_anki": (
            "A2 certificate and DTZ success depends on automatic everyday vocabulary. "
            "Spaced repetition keeps that core available under timed conditions."
        ),
        "cards": "1000",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["sein", "ich", "du"],
        "facts": [
            ("Pathways", "Goethe · telc · ÖSD · DTZ"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "celi-b1-italian-anki-deck": {
        "label": "CELI CILS PLIDA Italian",
        "headline": "CELI CILS PLIDA Italian Anki Deck — 1,373 Flashcards",
        "exam": "CELI · CILS · PLIDA (Italian B1)",
        "hook": (
            "Italian B1 vocabulary for the three main certificates: CELI (Perugia), "
            "CILS (Siena), and PLIDA (Dante Alighieri)."
        ),
        "audience": (
            "For CELI, CILS, and PLIDA B1 candidates who want one shared intermediate "
            "vocabulary deck instead of three overlapping word lists."
        ),
        "disclaimer": "CELI / CILS / PLIDA exam bodies",
        "about_heading": "What are CELI, CILS, and PLIDA?",
        "about": (
            "CELI (Università per Stranieri di Perugia), CILS (Università per Stranieri di Siena), "
            "and PLIDA (Società Dante Alighieri) are the main Italian language certificates. "
            "At B1 they share a large intermediate vocabulary bank."
        ),
        "pathways": "CELI B1 · CILS B1 · PLIDA B1",
        "deck_covers": (
            "1,373 Italian B1 flashcards covering the shared intermediate vocabulary "
            "and phrases across CELI, CILS, and PLIDA."
        ),
        "not_included": (
            "Official speaking exams, writing tasks, or full mock certificates — "
            "pair lexical drill with official practice papers."
        ),
        "why_anki": (
            "B1 certificates reward automatic intermediate vocabulary. Spaced Anki keeps "
            "the shared CELI/CILS/PLIDA lexicon exam-ready."
        ),
        "cards": "1,373",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["essere", "io", "tu"],
        "facts": [
            ("Pathways", "CELI · CILS · PLIDA"),
            ("Cards", "1,373 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "danish-a2-prove-i-dansk-anki-deck": {
        "label": "Danish Prøve i Dansk PD2 PD3",
        "headline": "Danish Prøve i Dansk PD2 PD3 Anki Deck — 1000 Flashcards",
        "exam": "Prøve i Dansk PD2 / PD3 · residence & citizenship language",
        "hook": (
            "Danish exam vocabulary for Prøve i Dansk PD2 / PD3 and language prep tied "
            "to permanent residence and citizenship requirements."
        ),
        "audience": (
            "For Prøve i Dansk learners and applicants using Danish for residence or "
            "citizenship language requirements."
        ),
        "disclaimer": "Danish language exam administrators",
        "about_heading": "What is Prøve i Dansk (PD2 / PD3)?",
        "about": (
            "Prøve i Dansk is the Danish language exam family used for education, work, "
            "and immigration pathways. PD2 and PD3 levels target practical Danish for "
            "everyday life, residence, and citizenship language evidence."
        ),
        "pathways": "Prøve i Dansk PD2 · PD3 · permanent residence · citizenship language",
        "deck_covers": (
            "1,000 exam-specific Danish vocabulary cards with audio and practical example "
            "sentences for work, housing, services, and daily life."
        ),
        "not_included": (
            "Official listening/writing papers or full citizenship civics content — "
            "use this deck for lexical recall alongside official practice."
        ),
        "why_anki": (
            "Residence and citizenship language requirements reward everyday Danish recall. "
            "Spaced Anki keeps housing, work, and services vocabulary ready."
        ),
        "cards": "1000",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["være", "jeg", "du"],
        "facts": [
            ("Pathways", "PD2 · PD3 · residence"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "norwegian-a2-norskprove-anki-deck": {
        "label": "Norwegian Norskprøve Residence Citizenship",
        "headline": "Norwegian Norskprøve Residence Citizenship Anki Deck — 1000 Flashcards",
        "exam": "Norskprøve A2 · permanent residence · statsborgerskap",
        "hook": (
            "Bokmål vocabulary for Norskprøve A2 and the language side of permanent "
            "residence (permanent oppholdstillatelse) and citizenship (statsborgerskap)."
        ),
        "audience": (
            "For Norskprøve A2 learners and applicants preparing Norwegian for residence "
            "or citizenship language requirements."
        ),
        "disclaimer": "Norwegian language exam / immigration authorities",
        "about_heading": "What is Norskprøve?",
        "about": (
            "Norskprøve is Norway's main Norwegian language exam pathway. A2-level "
            "vocabulary supports everyday life and the language evidence often needed "
            "for permanent residence and citizenship applications."
        ),
        "pathways": "Norskprøve A2 · permanent oppholdstillatelse · statsborgerskap",
        "deck_covers": (
            "1,000 exam-specific Bokmål vocabulary cards with audio and practical "
            "example sentences for work, housing, services, and everyday interaction."
        ),
        "not_included": (
            "Official Norskprøve listening/writing papers or full citizenship civics — "
            "pair this deck with official practice."
        ),
        "why_anki": (
            "Residence and citizenship timelines reward consistent Norwegian recall. "
            "Spaced Anki keeps everyday Bokmål available under exam pressure."
        ),
        "cards": "1000",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["være", "jeg", "du"],
        "facts": [
            ("Pathways", "Norskprøve · residence · citizenship"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "dele-a2-spanish-anki-deck": {
        "label": "DELE SIELE Spanish",
        "headline": "DELE SIELE Spanish Anki Deck — 1000 Flashcards",
        "exam": "DELE A2 · SIELE A2 vocabulary",
        "hook": (
            "Spanish A2 vocabulary for DELE A2 and overlapping SIELE A2-style word knowledge — "
            "language only, not a CCSE civics bundle."
        ),
        "audience": (
            "For DELE A2 candidates and learners building SIELE-overlapping Spanish vocabulary "
            "with spaced repetition."
        ),
        "disclaimer": "Instituto Cervantes / SIELE",
        "about_heading": "What are DELE A2 and SIELE?",
        "about": (
            "DELE A2 (Instituto Cervantes) is a level diploma proving A2 Spanish. SIELE is a "
            "scored proficiency exam; its A2-range vocabulary overlaps heavily with DELE A2 "
            "high-frequency words. This deck trains that shared lexicon — not CCSE civics."
        ),
        "pathways": "DELE A2 · SIELE A2 vocabulary overlap",
        "deck_covers": (
            "One .apkg with 1,000 high-frequency Spanish A2 vocabulary cards, examples, "
            "and media for DELE / SIELE-style recall."
        ),
        "not_included": (
            "CCSE civics for nacionalidad española, or official Cervantes speaking exams — "
            "pair this language deck with official practice papers."
        ),
        "why_anki": (
            "DELE and SIELE reward fast lexical access. Spaced Anki keeps high-frequency "
            "Spanish available under exam pressure."
        ),
        "cards": "1000",
        "format_note": "Single Anki .apkg (language only)",
        "sample_captions": ["estar", "yo", "tú"],
        "facts": [
            ("Pathways", "DELE A2 · SIELE vocabulary"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "swedish-a2-sfi-anki-deck": {
        "label": "Swedish SFI Residence Citizenship",
        "headline": "Swedish SFI Residence Citizenship Anki Deck — 1000 Flashcards",
        "exam": "SFI A2 · Swedish residence · citizenship language",
        "hook": (
            "Swedish vocabulary for SFI (Swedish for Immigrants) A2 and the language side "
            "of residence and citizenship pathways in Sweden."
        ),
        "audience": (
            "For SFI learners and applicants preparing Swedish for residence or citizenship "
            "language requirements."
        ),
        "disclaimer": "Swedish SFI / immigration authorities",
        "about_heading": "What is SFI?",
        "about": (
            "SFI (Swedish for Immigrants) is Sweden's main Swedish-language pathway for newcomers. "
            "A2-level vocabulary supports everyday life and the language evidence often needed "
            "for residence and citizenship applications."
        ),
        "pathways": "SFI A2 · residence · citizenship language",
        "deck_covers": (
            "1,000 exam-specific Swedish vocabulary cards with audio and practical "
            "example sentences for work, housing, services, and everyday interaction."
        ),
        "not_included": (
            "Official SFI course materials or full citizenship civics — "
            "pair this deck with official practice."
        ),
        "why_anki": (
            "Residence and citizenship timelines reward consistent Swedish recall. "
            "Spaced Anki keeps everyday Swedish available under exam pressure."
        ),
        "cards": "1000",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["vara", "jag", "du"],
        "facts": [
            ("Pathways", "SFI · residence · citizenship"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "greek-a2-ellinomatheia-anki-deck": {
        "label": "Greek Ellinomatheia Residence Citizenship",
        "headline": "Greek Ellinomatheia Residence Citizenship Anki Deck — 1000 Flashcards",
        "exam": "Ellinomatheia A2 · Greek residence · citizenship language",
        "hook": (
            "Greek vocabulary for Ellinomatheia A2 and the language side of residence "
            "and citizenship pathways in Greece."
        ),
        "audience": (
            "For Ellinomatheia learners and applicants preparing Greek for residence or "
            "citizenship language requirements."
        ),
        "disclaimer": "Ellinomatheia / Greek language authorities",
        "about_heading": "What is Ellinomatheia?",
        "about": (
            "Ellinomatheia is Greece's main Greek-language certificate pathway. "
            "A2-level vocabulary supports everyday life and the language evidence often needed "
            "for residence and citizenship applications."
        ),
        "pathways": "Ellinomatheia A2 · residence · citizenship language",
        "deck_covers": (
            "1,000 exam-specific Greek vocabulary cards with audio and practical "
            "example sentences for work, housing, services, and everyday interaction."
        ),
        "not_included": (
            "Official Ellinomatheia past papers or full citizenship civics — "
            "pair this deck with official practice."
        ),
        "why_anki": (
            "Residence and citizenship timelines reward consistent Greek recall. "
            "Spaced Anki keeps everyday Greek available under exam pressure."
        ),
        "cards": "1000",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["είμαι", "εγώ", "εσύ"],
        "facts": [
            ("Pathways", "Ellinomatheia · residence · citizenship"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "czech-a2-cce-anki-deck": {
        "label": "Czech CCE Residence Citizenship",
        "headline": "Czech CCE Residence Citizenship Anki Deck — 1000 Flashcards",
        "exam": "CCE A2 · Czech residence · citizenship language",
        "hook": (
            "Czech vocabulary for CCE (Czech Language Certificate Exam) A2 and the language "
            "side of residence and citizenship pathways in Czechia."
        ),
        "audience": (
            "For CCE learners and applicants preparing Czech for residence or citizenship "
            "language requirements."
        ),
        "disclaimer": "CCE / Czech language authorities",
        "about_heading": "What is CCE?",
        "about": (
            "CCE (Czech Language Certificate Exam) is Czechia's main Czech-language certificate pathway. "
            "A2-level vocabulary supports everyday life and the language evidence often needed "
            "for residence and citizenship applications."
        ),
        "pathways": "CCE A2 · residence · citizenship language",
        "deck_covers": (
            "1,000 exam-specific Czech vocabulary cards with audio and practical "
            "example sentences for work, housing, services, and everyday interaction."
        ),
        "not_included": (
            "Official CCE past papers or full citizenship civics — "
            "pair this deck with official practice."
        ),
        "why_anki": (
            "Residence and citizenship timelines reward consistent Czech recall. "
            "Spaced Anki keeps everyday Czech available under exam pressure."
        ),
        "cards": "1000",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["být", "já", "ty"],
        "facts": [
            ("Pathways", "CCE · residence · citizenship"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-french-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for French Speakers",
        "headline": "IELTS / TOEFL English for French Speakers Anki Deck — 2522 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for French speakers",
        "hook": (
            "2,522 high-frequency English vocabulary cards with French glosses, bilingual "
            "examples, and native English audio — built for French speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For French-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need daily "
            "English recall with native-language support — not tourist phrase lists."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for French "
            "speakers: English headword, French gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for French speakers",
        "deck_covers": (
            "2,522 English cards from the Prep2Go app with French glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(French as a check) beats translating every sentence under time pressure."
        ),
        "cards": "2522",
        "format_note": "Anki .apkg with audio, images, and French support",
        "sample_captions": ["be", "i", "you"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2522 vocabulary"),
            ("Media", "Audio + French glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-arabic-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Arabic Speakers",
        "headline": "IELTS / TOEFL English for Arabic Speakers Anki Deck — 2504 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Arabic speakers",
        "hook": (
            "2,504 high-frequency English vocabulary cards with Arabic glosses, bilingual "
            "examples, and native English audio — built for Arabic speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For Arabic-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need daily "
            "English recall with native-language support — not tourist phrase lists."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for Arabic "
            "speakers: English headword, Arabic gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for Arabic speakers",
        "deck_covers": (
            "2,504 English cards from the Prep2Go app with Arabic glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(Arabic as a check) beats translating every sentence under time pressure."
        ),
        "cards": "2504",
        "format_note": "Anki .apkg with audio, images, and Arabic support",
        "sample_captions": ["be", "i", "you"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2504 vocabulary"),
            ("Media", "Audio + Arabic glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-ukrainian-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Ukrainian Speakers",
        "headline": "IELTS / TOEFL English for Ukrainian Speakers Anki Deck — 2504 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Ukrainian speakers",
        "hook": (
            "2,504 high-frequency English vocabulary cards with Ukrainian glosses, bilingual "
            "examples, and native English audio — built for Ukrainian speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For Ukrainian-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need daily "
            "English recall with native-language support — not tourist phrase lists."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for Ukrainian "
            "speakers: English headword, Ukrainian gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for Ukrainian speakers",
        "deck_covers": (
            "2,504 English cards from the Prep2Go app with Ukrainian glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(Ukrainian as a check) beats translating every sentence under time pressure."
        ),
        "cards": "2504",
        "format_note": "Anki .apkg with audio, images, and Ukrainian support",
        "sample_captions": ["be", "i", "you"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2504 vocabulary"),
            ("Media", "Audio + Ukrainian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },

}


def e(value: Any) -> str:
    return html.escape(str(value or ""), quote=True)


def gumroad_json(args: list[str]) -> dict:
    out = subprocess.run(
        ["gumroad", *args, "--json", "--non-interactive"],
        capture_output=True,
        text=True,
        check=False,
    )
    if out.returncode != 0:
        raise RuntimeError(out.stderr.strip() or out.stdout.strip() or f"gumroad failed: {args}")
    return json.loads(out.stdout)


def sample_paths(slug: str) -> list[Path]:
    return [p for i in range(1, 4) if (p := SAMPLES_DIR / f"{slug}-sample-{i}.webp").exists()]


def load_cdn_cache() -> dict[str, list[str]]:
    if CDN_CACHE_PATH.exists():
        return json.loads(CDN_CACHE_PATH.read_text(encoding="utf-8"))
    return {}


def save_cdn_cache(cache: dict[str, list[str]]) -> None:
    CDN_CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CDN_CACHE_PATH.write_text(
        json.dumps(cache, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def ensure_sample_cdn_urls(
    product_id: str, slug: str, cache: dict[str, list[str]], *, force: bool = False
) -> list[str]:
    """Host sample JPGs on public-files.gumroad.com without leaving them as covers."""
    paths = sample_paths(slug)
    if not paths:
        return []
    cached = cache.get(slug) or []
    if not force and len(cached) >= len(paths):
        return cached[: len(paths)]

    before = gumroad_json(["products", "view", product_id])
    before_ids = {
        c.get("id")
        for c in ((before.get("product") or before).get("covers") or [])
        if c.get("id")
    }

    uploaded_ids: list[str] = []
    with tempfile.TemporaryDirectory(prefix="gumroad-lang-sample-cdn-") as tmp:
        for path in paths:
            jpg = Path(tmp) / f"{path.stem}.jpg"
            subprocess.run(
                ["magick", str(path), "-quality", "88", str(jpg)],
                check=True,
                capture_output=True,
            )
            add = subprocess.run(
                [
                    "gumroad",
                    "products",
                    "covers",
                    "add",
                    product_id,
                    "--image",
                    str(jpg),
                    "--yes",
                    "--non-interactive",
                    "--json",
                ],
                capture_output=True,
                text=True,
            )
            if add.returncode != 0:
                raise RuntimeError(f"cover add failed for {slug}: {add.stderr or add.stdout}")
            view = gumroad_json(["products", "view", product_id])
            covers = (view.get("product") or view).get("covers") or []
            for cover in covers:
                cid = cover.get("id")
                if cid and cid not in before_ids and cid not in uploaded_ids:
                    uploaded_ids.append(cid)

    after = gumroad_json(["products", "view", product_id])
    covers = (after.get("product") or after).get("covers") or []
    by_id = {c.get("id"): c for c in covers if c.get("id")}
    urls: list[str] = []
    for cid in uploaded_ids:
        cover = by_id.get(cid) or {}
        url = cover.get("original_url") or cover.get("url")
        if url:
            urls.append(url)
        subprocess.run(
            [
                "gumroad",
                "products",
                "covers",
                "remove",
                product_id,
                cid,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
            check=False,
        )

    if len(urls) < len(paths):
        raise RuntimeError(f"expected {len(paths)} CDN urls for {slug}, got {len(urls)}")
    cache[slug] = urls
    save_cdn_cache(cache)
    return urls


def remove_trailing_sample_covers(product_id: str, keep: int = 1) -> str:
    view = gumroad_json(["products", "view", product_id])
    prod = view.get("product") or view
    covers = list(prod.get("covers") or [])
    if len(covers) <= keep:
        return f"covers={len(covers)}"
    removed = 0
    for cover in reversed(covers[keep:]):
        cid = cover.get("id")
        if not cid:
            continue
        out = subprocess.run(
            [
                "gumroad",
                "products",
                "covers",
                "remove",
                product_id,
                cid,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
        )
        if out.returncode == 0:
            removed += 1
    return f"covers {len(covers)}→{len(covers) - removed} (removed {removed})"


def render_landing(slug: str, spec: dict, product: dict, cover_url: str, sample_urls: list[str]) -> str:
    permalink = slug
    checkout = f"https://pixidstudio.gumroad.com/l/{permalink}"
    price = product.get("formatted_price") or "$26"
    label = spec["label"]
    headline = spec["headline"]
    exam = spec["exam"]
    disclaimer = spec["disclaimer"]
    deck_url = f"https://uniprep2go.study/decks/{slug}"
    seo_title = f"{headline} | PixiD Studio"
    meta = (
        f"{spec['cards']} Anki flashcards for {exam}. "
        f"Vocabulary with audio — independent prep, not official {disclaimer} material."
    )

    benefits = [
        f"Built for {exam}",
        f"{spec['cards']} cards — {spec['format_note']}",
        "Headword + meaning + example + audio (where included)",
        "Multi-pathway framing for the related exams / immigration routes",
        "Instant Gumroad download · sync to mobile via AnkiWeb",
    ]
    benefits_html = "".join(
        f'<li class="flex gap-3"><span class="text-accent font-bold">✓</span><span>{e(b)}</span></li>'
        for b in benefits
    )

    facts_html = "".join(
        f'<div class="theme-card px-5 py-4"><dt class="label-mono">{e(k)}</dt>'
        f'<dd class="mt-2 font-medium">{e(v)}</dd></div>'
        for k, v in spec["facts"][:4]
    )

    official_note = (
        f'<p class="mt-4 text-sm text-muted">Independent study aid — not affiliated with or '
        f"endorsed by {e(disclaimer)}. Always verify current exam rules with the official body.</p>"
    )

    exam_section = f"""
    <section id="exam" class="mt-12" aria-labelledby="exam-heading">
      <p class="label-mono">Exams &amp; pathways</p>
      <h2 id="exam-heading" class="mt-2 text-2xl font-semibold tracking-tight">{e(spec["about_heading"])}</h2>
      <p class="mt-4 text-base leading-7 text-muted">{e(spec["about"])}</p>
      <dl class="mt-6 grid gap-3 sm:grid-cols-2">{facts_html}</dl>
      <div class="mt-6 theme-card rounded-3xl p-6 sm:p-8 space-y-4 text-sm sm:text-base leading-7 text-muted">
        <p><strong class="text-[var(--fg)]">Pathways:</strong> {e(spec["pathways"])}</p>
        <p><strong class="text-[var(--fg)]">What this deck covers:</strong> {e(spec["deck_covers"])}</p>
        <p><strong class="text-[var(--fg)]">Not included:</strong> {e(spec["not_included"])}</p>
        <p><strong class="text-[var(--fg)]">Why Anki:</strong> {e(spec["why_anki"])}</p>
      </div>
      {official_note}
    </section>
"""

    cover_block = ""
    if cover_url:
        cover_block = (
            f'<figure class="overflow-hidden rounded-3xl theme-card shadow-lg">'
            f'<img src="{e(cover_url)}" alt="{e(label)} Anki deck cover" '
            f'class="w-full h-auto object-cover" loading="eager"></figure>'
        )

    captions = list(spec.get("sample_captions") or [])
    sample_figures = []
    for i, url in enumerate(sample_urls, 1):
        caption = captions[i - 1] if i - 1 < len(captions) else f"Sample {i}"
        sample_figures.append(
            f"""        <figure class="theme-card overflow-hidden rounded-3xl shadow-sm">
          <img src="{e(url)}" alt="{e(label)} sample card {i}" class="w-full h-auto object-contain" loading="lazy">
          <figcaption class="px-4 py-3 text-xs text-muted">{e(caption)}</figcaption>
        </figure>"""
        )
    samples_section = ""
    if sample_figures:
        samples_section = f"""
    <section id="samples" class="mt-12" aria-labelledby="samples-heading">
      <h2 id="samples-heading" class="text-2xl font-semibold tracking-tight">Sample cards</h2>
      <p class="mt-2 text-sm text-muted">Real preview cards from the deck — vocabulary with image cues (audio in the .apkg).</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
{chr(10).join(sample_figures)}
      </div>
    </section>
"""

    faq_items = [
        (
            "Which exams / pathways is this for?",
            f"{e(spec['about'])}<br><br><strong>Pathways:</strong> {e(spec['pathways'])}",
        ),
        ("Who should buy this deck?", e(spec["audience"])),
        (
            "What does the deck cover — and what is missing?",
            f"<strong>Covers:</strong> {e(spec['deck_covers'])}<br><strong>Not included:</strong> {e(spec['not_included'])}",
        ),
        (
            "What is included in the download?",
            f"{e(spec['cards'])} Anki flashcards — {e(spec['format_note'])}. Instant Gumroad library download.",
        ),
        (
            "How do I import into Anki?",
            "Download the .apkg from Gumroad → Anki desktop → File → Import → select the file. Sync to AnkiMobile or AnkiDroid via AnkiWeb.",
        ),
        (
            "Is this official exam material?",
            f"No. Independent study aid — not affiliated with, endorsed by, or sponsored by {e(disclaimer)}. Always verify current exam rules on the official site.",
        ),
        (
            "Will this guarantee I pass?",
            "No. The deck improves vocabulary retention and exam readiness; results depend on consistent study plus official practice.",
        ),
        ("Refunds?", "Digital download — all sales final."),
    ]
    faq_html = "".join(
        f'<details class="theme-card rounded-2xl p-5 group"><summary class="font-semibold cursor-pointer list-none flex justify-between gap-4 items-start">{e(q)}'
        f'<span class="text-accent shrink-0 group-open:rotate-45 transition-transform text-xl">+</span></summary>'
        f'<p class="text-muted text-sm mt-3 leading-relaxed">{a}</p></details>'
        for q, a in faq_items
    )

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{e(seo_title)}</title>
  <meta name="description" content="{e(meta)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="{e(checkout)}">
  <meta property="og:type" content="product">
  <meta property="og:title" content="{e(seo_title)}">
  <meta property="og:description" content="{e(meta)}">
  <meta property="og:url" content="{e(checkout)}">
  <meta property="og:image" content="{e(cover_url)}">
  <meta name="twitter:image" content="{e(cover_url)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f7f3ea">
  <link rel="preconnect" href="https://cdn.tailwindcss.com">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {{ --bg:#f7f3ea; --fg:#18140f; --muted:#5f5749; --card:#fffaf0; --border:rgba(24,20,15,.15); --accent:#1f3a5f; --btn:#18140f; --btn-hover:#1f3a5f; --btn-fg:#fffaf0; }}
    body {{ background:var(--bg); color:var(--fg); }}
    .theme-card {{ background:var(--card); border:1px solid var(--border); }}
    .text-muted {{ color:var(--muted); }}
    .text-accent {{ color:var(--accent); }}
    .label-mono {{ font-family:ui-monospace,Menlo,monospace; font-size:.75rem; letter-spacing:.18em; text-transform:uppercase; color:var(--accent); }}
    .btn-buy {{ background:var(--btn); color:var(--btn-fg); transition:background .2s,transform .2s; }}
    .btn-buy:hover {{ background:var(--btn-hover); transform:translateY(-1px); }}
    .btn-secondary {{ border:1px solid var(--border); color:var(--fg); }}
    .btn-secondary:hover {{ background:rgba(31,58,95,.08); }}
  </style>
</head>
<body class="antialiased font-sans">
  <header class="sticky top-0 z-50 border-b backdrop-blur-md" style="background:color-mix(in srgb,var(--bg) 88%,transparent);border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
      <p class="font-semibold text-sm truncate" data-gumroad-field="name">{e(product.get("name") or headline)}</p>
      <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy rounded-full px-5 py-2.5 text-sm font-semibold" rel="noopener noreferrer">Buy — <span data-gumroad-field="price">{e(price)}</span></a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 py-10">
    <p class="label-mono">Prep for {e(exam)} · UniPrep2Go</p>
    <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight" data-gumroad-field="name">{e(headline)}</h1>

    <div class="mt-8 grid lg:grid-cols-2 gap-8 items-start">
      <div class="space-y-4">
        <p class="text-lg sm:text-xl leading-8">{e(spec["hook"])}</p>
        <p class="text-base leading-7 text-muted">{e(spec["audience"])}</p>
        <ul class="space-y-3 text-sm sm:text-base">
          {benefits_html}
        </ul>
        <div class="flex flex-col gap-3 sm:flex-row pt-2">
          <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener noreferrer">Get instant access — <span data-gumroad-field="price">{e(price)}</span></a>
          <a href="{e(deck_url)}" class="btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener">View on UniPrep2Go</a>
        </div>
        <p class="text-sm leading-7 text-muted">Independent {e(exam)} study aid. Delivered as {e(spec["format_note"])} for <span data-gumroad-field="price">{e(price)}</span>. Not official {e(disclaimer)} material.</p>
      </div>
      {cover_block}
    </div>
{exam_section}
    <section class="mt-12" aria-labelledby="facts-heading">
      <h2 id="facts-heading" class="text-2xl font-semibold tracking-tight">Deck at a glance</h2>
      <dl class="mt-4 grid gap-3 sm:grid-cols-2">
        <div class="theme-card px-5 py-4"><dt class="label-mono">Cards</dt><dd class="mt-2 font-medium">{e(spec["cards"])} flashcards</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">File</dt><dd class="mt-2 font-medium">{e(spec["format_note"])}</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">Pathways</dt><dd class="mt-2 font-medium">{e(spec["pathways"])}</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">Delivery</dt><dd class="mt-2 font-medium">Instant Gumroad download</dd></div>
      </dl>
    </section>
{samples_section}
    <section id="faq" class="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl font-semibold tracking-tight">FAQ</h2>
      <div class="mt-4 space-y-3">
        {faq_html}
      </div>
    </section>

    <section class="mt-12 mb-6" aria-labelledby="pricing-heading">
      <div class="theme-card rounded-3xl p-8 sm:p-10 text-center">
        <h2 id="pricing-heading" class="text-2xl font-semibold">Ready to study?</h2>
        <p class="mt-3 text-muted max-w-lg mx-auto text-sm leading-relaxed">One-time purchase. Instant .apkg download. Multi-pathway vocabulary for cold Gumroad traffic.</p>
        <p class="mt-2 text-4xl font-semibold"><span data-gumroad-field="price">{e(price)}</span></p>
        <p class="hidden" data-gumroad-field="description" aria-hidden="true">{e(meta)}</p>
        <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold" rel="noopener noreferrer">I want this — instant download</a>
        <p class="mt-4 text-xs text-muted">Independent study aid · Not official {e(disclaimer)} material · Digital download — all sales final.</p>
      </div>
    </section>
  </main>

  <footer class="border-t py-6" style="border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
      <p>PixiD Studio · UniPrep2Go</p>
      <a href="{e(deck_url)}" class="underline" rel="noopener">Deck page on UniPrep2Go</a>
    </div>
  </footer>
</body>
</html>"""


def publish_landing(product_id: str, html_doc: str) -> None:
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as fh:
        fh.write(html_doc)
        path = fh.name
    try:
        out = subprocess.run(
            [
                "gumroad",
                "products",
                "page",
                "publish",
                product_id,
                path,
                "--yes",
                "--non-interactive",
            ],
            capture_output=True,
            text=True,
        )
        if out.returncode != 0:
            raise RuntimeError(out.stderr.strip() or out.stdout.strip())
    finally:
        Path(path).unlink(missing_ok=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slug", action="append", dest="slugs")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument(
        "--strip-sample-covers",
        action="store_true",
        help="Remove covers beyond the first N (samples wrongly left as covers).",
    )
    parser.add_argument("--keep-covers", type=int, default=1)
    parser.add_argument(
        "--force-cdn",
        action="store_true",
        help="Re-upload samples to Gumroad CDN even if cache already has URLs.",
    )
    args = parser.parse_args()

    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
    cdn_cache = load_cdn_cache()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    results: list[str] = []

    for slug, record in catalog["products"].items():
        if args.slugs and slug not in args.slugs:
            continue
        product_id = record.get("gumroadProductId")
        if not product_id or slug not in SPECS:
            results.append(f"SKIP  {slug}")
            continue
        if not sample_paths(slug):
            results.append(f"SKIP  {slug} (no local samples)")
            continue

        view = gumroad_json(["products", "view", product_id])
        product = view.get("product") or view
        covers = product.get("covers") or []
        cover_url = ""
        if covers:
            cover_url = covers[0].get("original_url") or covers[0].get("url") or ""

        try:
            if args.dry_run and not args.force_cdn and slug in cdn_cache:
                sample_urls = cdn_cache[slug]
            elif args.dry_run:
                sample_urls = [
                    f"https://public-files.gumroad.com/dry-run-{slug}-{i}" for i in range(1, 4)
                ]
            else:
                sample_urls = ensure_sample_cdn_urls(
                    product_id, slug, cdn_cache, force=args.force_cdn
                )

            html_doc = render_landing(slug, SPECS[slug], product, cover_url, sample_urls)
            out_path = OUT_DIR / f"{slug}.html"
            out_path.write_text(html_doc, encoding="utf-8")

            if args.dry_run:
                results.append(
                    f"DRY   {slug} → {out_path} ({len(html_doc)} chars, {len(sample_urls)} samples)"
                )
                continue

            publish_landing(product_id, html_doc)
            note = f"published cdn={len(sample_urls)}"
            if args.strip_sample_covers:
                note += "; " + remove_trailing_sample_covers(product_id, keep=args.keep_covers)
            results.append(f"OK    {slug} ({note})")
        except Exception as exc:  # noqa: BLE001
            results.append(f"FAIL  {slug}: {exc}")

    print("\n".join(results))


if __name__ == "__main__":
    main()
