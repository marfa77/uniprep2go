#!/usr/bin/env python3
"""Append Swiss DE citizenship mock items 016–030 × 4 topics (60 → 120)."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SLUG = "swiss-citizenship-readiness-check"
BANK_PATH = ROOT / "src/data/mock-exams" / f"{SLUG}.json"
SOURCE = (
    "Converted from Prep2Go Immigration app Einbürgerung Schweiz deck "
    "(Q&A → MCQ with related/near-miss distractors)."
)
ANSWERS = ["a", "b", "c", "d"]


def rot(i: int) -> str:
    return ANSWERS[i % 4]


def make_q(topic_id: str, n: int, row: tuple) -> dict:
    prompt, correct, wrongs, explanation, dist, difficulty = row
    if len(wrongs) != 3 or len(dist) != 3:
        raise ValueError(f"bad row {topic_id}-{n}")
    correct_id = rot(n - 1)
    wrong_ids = [x for x in ANSWERS if x != correct_id]
    options = []
    for oid in ANSWERS:
        if oid == correct_id:
            options.append({"id": oid, "text": correct})
        else:
            options.append({"id": oid, "text": wrongs[wrong_ids.index(oid)]})
    distractor = {wrong_ids[i]: dist[i] for i in range(3)}
    num = str(n).zfill(3)
    return {
        "id": f"{SLUG}-{topic_id}-{num}",
        "examSlug": SLUG,
        "topicId": topic_id,
        "prompt": prompt,
        "options": options,
        "correctOptionId": correct_id,
        "explanation": explanation,
        "distractorExplanations": distractor,
        "difficulty": difficulty,
        "sourceNote": SOURCE,
    }


EXTRAS: dict[str, list[tuple]] = {
    "politics-democracy": [
        (
            "Wie viele gültige Unterschriften braucht eine eidgenössische Volksinitiative, damit sie zur Abstimmung zugelassen wird?",
            "100'000 Unterschriften innerhalb von 18 Monaten",
            [
                "50'000 Unterschriften innerhalb von 100 Tagen",
                "200'000 Unterschriften ohne Frist",
                "26 Kantonsunterschriften, je eine pro Kanton",
            ],
            "Eine Volksinitiative verlangt mindestens 100'000 Unterschriften von Stimmberechtigten innerhalb von 18 Monaten, bevor Bundesrat und Parlament sie behandeln.",
            [
                "50'000 in 100 Tagen ist die Schwelle für ein fakultatives Referendum gegen ein bereits beschlossenes Gesetz.",
                "Es gibt keine pauschale 200'000er-Grenze für Initiativen.",
                "Kantone stimmen nicht durch Einzelunterschriften je Kanton zu.",
            ],
            "medium",
        ),
        (
            "Wie viele Unterschriften braucht ein fakultatives Referendum gegen ein neues Bundesgesetz?",
            "50'000 Unterschriften innerhalb von 100 Tagen nach der amtlichen Veröffentlichung",
            [
                "100'000 Unterschriften innerhalb von 18 Monaten",
                "Eine Mehrheit der Kantone ohne Volksunterschriften",
                "Nur Unterschriften von Nationalräten",
            ],
            "Gegen ein vom Parlament verabschiedetes Bundesgesetz können 50'000 Stimmberechtigte innerhalb von 100 Tagen ein Referendum verlangen.",
            [
                "100'000 in 18 Monaten gilt für Volksinitiativen, nicht für fakultative Referenden gegen Gesetze.",
                "Ein Ständemehr entfällt bei normalen Gesetzen; Unterschriften müssen von Bürgern stammen.",
                "Parlamentarier können mitzeichnen, aber die Zahl kommt aus der Bevölkerung, nicht nur aus dem Rat.",
            ],
            "medium",
        ),
        (
            "Wie viele Mitglieder hat der Nationalrat?",
            "200",
            [
                "46",
                "100",
                "250",
            ],
            "Der Nationalrat hat 200 Sitze; die Verteilung richtet sich nach der Bevölkerungsstärke der Kantone.",
            [
                "46 Sitze hat der Ständerat, nicht der Nationalrat.",
                "100 entspricht nicht der geltenden Grösse des Nationalrats.",
                "250 übersteigt die verfassungsmässige Zahl der Volksvertreter.",
            ],
            "easy",
        ),
        (
            "Wie viele Mitglieder hat der Ständerat?",
            "46",
            [
                "200",
                "26",
                "60",
            ],
            "Der Ständerat umfasst 46 Mitglieder: in der Regel je zwei pro Kanton, je eines bei Halbkantonen.",
            [
                "200 ist die Grösse des Nationalrats.",
                "26 wäre nur ein Sitz pro Kanton ohne Halbkantonsregel.",
                "60 gibt es im Ständerat nicht.",
            ],
            "easy",
        ),
        (
            "Wer wählt die sieben Bundesrätinnen und Bundesräte?",
            "Die Vereinigte Bundesversammlung (Nationalrat und Ständerat zusammen)",
            [
                "Das Volk in einer allgemeinen Direktwahl",
                "Nur der Ständerat",
                "Der Bundesrat selbst in interner Wahl",
            ],
            "Bundesrätinnen und Bundesräte werden von der Vereinigten Bundesversammlung nach jedem Nationalratswahljahr gewählt.",
            [
                "Es gibt keine direkte Volkswahl auf Bundesebene für Regierungsmitglieder.",
                "Der Nationalrat allein wählt sie nicht; beide Räte treten zusammen.",
                "Der Bundesrat wählt sich nicht selbst.",
            ],
            "medium",
        ),
        (
            "Wie lange dauert eine Legislaturperiode des Nationalrats?",
            "Vier Jahre",
            [
                "Zwei Jahre",
                "Fünf Jahre",
                "Sechs Jahre wie beim US-Senat",
            ],
            "Nationalräte werden alle vier Jahre neu gewählt; dadurch sind auch die Perioden der Bundesversammlung gegliedert.",
            [
                "Zwei Jahre gilt in anderen Staaten, nicht für den Schweizer Nationalrat.",
                "Fünf Jahre entspricht nicht der eidgenössischen Wahlperiode.",
                "Sechs Jahre ist die US-Vorbildzeit, nicht die Schweizer.",
            ],
            "easy",
        ),
        (
            "Ist die Schweiz Mitglied der Europäischen Union?",
            "Nein — die Beziehungen basieren auf bilateralen Abkommen",
            [
                "Ja, seit dem Beitritt 1995",
                "Ja, als assoziiertes Mitglied mit Stimmrecht",
                "Nein, weil die Schweiz keinerlei Verträge mit der EU hat",
            ],
            "Die Schweiz ist kein EU-Mitglied; sie regelt viele Themen über bilaterale Verträge und bleibt aussen Steuerung und Abstimmungen vorbehalten.",
            [
                "Der EU-Beitritt wurde mehrfach abgelehnt; es gibt kein Vollmitglied.",
                "Assoziiertes Stimmrecht in Brüssel gibt es ohne Mitgliedschaft nicht.",
                "Ohne Verträge wäre der Handel unrealistisch — bilaterale Abkommen existieren.",
            ],
            "medium",
        ),
        (
            "Was bedeutet Neutralität in der Schweizer Aussenpolitik im Kern?",
            "Keine Teilnahme an Kriegen zwischen anderen Staaten",
            [
                "Waffenexporte sind generell verboten",
                "Keine Mitgliedschaft in der UNO",
                "Keine internationalen Verträge jeglicher Art",
            ],
            "Neutralität heisst, in bewaffneten Konflikten zwischen Staaten nicht Partei zu ergreifen; gleichzeitig pflegt die Schweiz Diplomatie und Verträge.",
            [
                "Waffenexporte sind streng reguliert, aber nicht das Kernstück der Neutralitätsdefinition.",
                "Die Schweiz ist seit 2002 UNO-Mitglied.",
                "Sie schliesst viele internationale Abkommen, bleibt aber neutral in fremden Kriegen.",
            ],
            "medium",
        ),
        (
            "Wo hat das Bundesgericht seinen Sitz?",
            "Lausanne",
            [
                "Bern",
                "Zürich",
                "Genf",
            ],
            "Das Bundesgericht ist die höchste ordentliche Gerichtsinstanz und tagt in Lausanne.",
            [
                "Bern ist Sitz von Parlament und Regierung, nicht des Bundesgerichts.",
                "Zürich beherbergt wichtige Gerichte, aber nicht das Bundesgericht als oberste Instanz.",
                "Genf ist international bedeutend, der Bundesgerichtssitz liegt aber in Lausanne.",
            ],
            "easy",
        ),
        (
            "Welche Aufgabe hat der Bundeskanzler?",
            "Leitung der Bundeskanzlei und Unterstützung des Bundesrates — ohne Sitz im Kollegium",
            [
                "Mitglied des Bundesrats mit eigenem Departement",
                "Vorsitz des Nationalrats",
                "Oberster Befehlshaber der Armee",
            ],
            "Der Bundeskanzler steht der Bundeskanzlei vor, koordiniert das Regierungssekretariat und ist kein siebtes Regierungsmitglied.",
            [
                "Nur die sieben Bundesräte bilden das Kollegium mit Departementen.",
                "Den Nationalrat präsidiert der Nationalratspräsident.",
                "Das Kommando der Armee liegt beim Bundesrat, nicht beim Kanzler.",
            ],
            "medium",
        ),
        (
            "Seit wann gilt die geltende Bundesverfassung in ihrer modernen föderalen Form?",
            "1848 (nach dem Sonderbundskrieg neu gefasst)",
            [
                "1291 bei den Urkantonen",
                "1815 allein durch den Wiener Kongress",
                "1971 mit dem Frauenstimmrecht",
            ],
            "Die Bundesverfassung von 1848 schuf den föderalen Bundesstaat mit Verfassungsgerichtsideen und stärkerer Zentralgewalt.",
            [
                "1291 ist Gründungsmythos, nicht die moderne Verfassung.",
                "1815 prägte Neutralität, ersetzte aber nicht die Verfassung von 1848.",
                "1971 betraf das Stimmrecht, nicht den Verfassungstext als Ganzes.",
            ],
            "medium",
        ),
        (
            "Welche Sprachen sind auf Bundesebene amtssprachlich voll anerkannt?",
            "Deutsch, Französisch, Italienisch und Rätoromanisch",
            [
                "Nur Deutsch und Französisch",
                "Deutsch, Französisch und Englisch",
                "Alle Landessprachen der EU",
            ],
            "Die vier Landessprachen sind im Bundesrecht verankert; Rätoromanisch hat besonderen Schutz in Graubünden.",
            [
                "Italienisch ist gleichberechtigt mit Deutsch und Französisch.",
                "Englisch ist keine Schweizer Amtssprache.",
                "EU-Sprachen werden nicht automatisch nationalamtlich.",
            ],
            "easy",
        ),
        (
            "Was ist ein Gegenvorschlag des Parlaments zu einer Volksinitiative?",
            "Ein alternativer Entwurf, über den Stimmberechtigte gleichzeitig mit der Initiative abstimmen können",
            [
                "Eine automatische Ablehnung jeder Initiative durch den Rat",
                "Ein Gesetz, das nur der Ständerat beschliessen darf",
                "Ein Urteil des Bundesgerichts",
            ],
            "Bundesrat und Parlament können einen Gegenvorschlag ausarbeiten; die Wähler stimmen dann über Initiative und Gegenvorschlag.",
            [
                "Initiativen werden nicht pauschal abgelehnt; der Rat kann Gegenvorschläge formulieren.",
                "Gewöhnliche Gesetze bedürfen beider Kammern, das ist kein spezieller Gegenvorschlag.",
                "Das Bundesgericht urteilt, beschliesst aber keine Vorlagen.",
            ],
            "hard",
        ),
        (
            "Welches Bundesorgan wählt den Bundesrat und Richter des Bundesgerichts?",
            "Die Vereinigte Bundesversammlung",
            [
                "Nur der Nationalrat",
                "Die Kantonsregierungen allein",
                "Die EU-Kommission",
            ],
            "Nationalrat und Ständerat treten als Vereinigte Bundesversammlung zusammen, um Regierung und höchste Richter zu wählen.",
            [
                "Der Ständerat fehlt, wenn nur der Nationalrat wählt.",
                "Kantone wählen indirekt über Parlamentarier, nicht separat allein.",
                "Die EU hat keinen Wahlauftrag für Schweizer Organe.",
            ],
            "medium",
        ),
        (
            "Wann ist ein Referendum in der Schweiz obligatorisch?",
            "Bei Verfassungsänderungen und bestimmten völkerrechtlichen Verträgen",
            [
                "Bei jedem neuen Steuergesetz der Kantone",
                "Nur bei Gemeindefusionen",
                "Bei jeder Posttaifänderung ohne Ausnahme",
            ],
            "Verfassungsänderungen und wichtige Staatsverträge unterliegen der obligatorischen Volksabstimmung.",
            [
                "Kantonale Steuergesetze werden kantonal besiedelt, nicht pauschal obligatorisch auf Bund.",
                "Gemeindefusionen sind kantonal, kein allgemeiner Bundestroger.",
                "Posttarife lösen kein obligatorisches Referendum aus.",
            ],
            "medium",
        ),
    ],
    "history-culture": [
        (
            "An welchem Datum wird der Bundesfeiertag traditionell begangen?",
            "1. August",
            [
                "18. April (Schlacht bei Marignano)",
                "12. September (bundesweite Abstimmungen)",
                "31. Dezember",
            ],
            "Der 1. August erinnert an die Bundestradition und wird als Nationalfeiertag gefeiert.",
            [
                "18. April hat keine Bundesfeiertagsfunktion.",
                "September-Abstimmungssonntage sind keine Nationalfeiertage.",
                "Silvester ist kein eidgenössischer Feiertag.",
            ],
            "easy",
        ),
        (
            "Seit wann haben Frauen auf Bundesebene Stimm- und Wahlrecht?",
            "Seit 1971",
            [
                "Seit 1848",
                "Seit 1990",
                "Seit 1291",
            ],
            "Die eidgenössische Volksabstimmung führte 1971 das Frauenstimmrecht auf Bundesebene ein.",
            [
                "1848 erfasste das Stimmrecht zunächst nicht für Frauen.",
                "1990 betraf Appenzell Innerrhoden kantonal, nicht den Bundesschritt.",
                "1291 ist Gründungsjahr, kein Frauenstimmrecht.",
            ],
            "medium",
        ),
        (
            "Was bedeutet die Abkürzung CH auf Kfz-Schildern und Briefmarken?",
            "Confoederatio Helvetica (lateinischer Name der Schweiz)",
            [
                "Cantons Helvetes",
                "Confederation Helveticae erst seit 2002",
                "Chef Helvetique",
            ],
            "Helvetica ist der lateinische Name der Schweizer Eidgenossenschaft und wird international als Landescode genutzt.",
            [
                "Es ist kein Kürzel für einzelne Kantone.",
                "Der Code existiert lange vor dem UNO-Beitritt 2002.",
                "Chef Helvetique ist kein historischer Staatsname.",
            ],
            "easy",
        ),
        (
            "Wann trat die Schweiz der Vereinten Nationen bei?",
            "2002",
            [
                "1945 als Gründungsmitglied",
                "1990",
                "Sie ist kein Mitglied",
            ],
            "Nach langem UNO-Sondersstatus trat die Schweiz 2002 als Vollmitglied bei.",
            [
                "1945 blieb die Schweiz ausserhalb mit Beobachterstatus.",
                "1990 war kein UNO-Beitrittsjahr.",
                "Seit 2002 ist sie Vollmitglied.",
            ],
            "medium",
        ),
        (
            "Welches Ereignis von 1515 wird mit dem Ende grosser Eroberungszüge der Eidgenossen verbunden?",
            "Die Niederlage in der Schlacht bei Marignano",
            [
                "Der Vertrag von Westfalen",
                "Die Gründung der Eidgenossenschaft 1291",
                "Die Annexion des Tessins",
            ],
            "Marignano beendete die expansiven Feldzüge des Alten Eidgenossenbundes nach Italien.",
            [
                "Westfalen betrifft 1648 in Mitteleuropa.",
                "1291 ist Gründung, nicht Ende der Expansion.",
                "Das Tessin kam später unter eidgenössische Herrschaft.",
            ],
            "medium",
        ),
        (
            "Welche Farben hat die Schweizer Landesflagge?",
            "Ein rotes Feld mit weissem Kreuz",
            [
                "Rot, weiss und blau horizontal",
                "Grün mit weissem Balken",
                "Gelb und rot wie der Kanton Waadt",
            ],
            "Das Wappenzeichen ist ein gleicharmiges weisses Kreuz auf rotem Grund.",
            [
                "Dreifarbenstreifen gehören anderen Staaten.",
                "Grün ist keine Schweizer Nationalfarbe.",
                "Gelb-rot ist Kanton Waadt, nicht die Nationalflagge.",
            ],
            "easy",
        ),
        (
            "Warum sprechen viele Schweizer im Alltag Dialekte, schreiben aber Hochdeutsch?",
            "Schriftdeutsch ist seit Jahrhunderten Schreib- und Verwaltungssprache, Dialekte die mündliche Alltagssprache",
            [
                "Dialekte sind seit 1848 verboten",
                "Hochdeutsch gilt nur im Tessin",
                "Schweizerdeutsch ist identisch mit Schriftdeutsch",
            ],
            "Die Alltagssprache ist regional; offizielle Texte und Schulunterricht nutzen in Deutschschweiz meist Hochdeutsch.",
            [
                "Dialekte sind nicht verboten.",
                "Tessin nutzt Italienisch, nicht Hochdeutsch als Landessprache.",
                "Dialekt und Schriftdeutsch unterscheiden sich deutlich.",
            ],
            "medium",
        ),
        (
            "Was ist der Röstigraben in der Volkskunde?",
            "Die grobe Grenze zwischen deutsch- und französischsprachiger Schweiz",
            [
                "Ein Grenzgraben zur EU",
                "Ein Wanderweg im Berner Oberland",
                "Die Linie zwischen Katholiken und Protestanten",
            ],
            "Der Röstigraben trennt sprachlich die Deutsch- von der Französischschweiz und prägt Medien sowie Politik.",
            [
                "Zur EU gibt es keine «Rösti»-Grenze.",
                "Es ist kein reiner Wandernamen.",
                "Konfessionsgrenzen fallen nicht deckungsgleich mit der Sprachgrenze.",
            ],
            "medium",
        ),
        (
            "Welche Notrufnummer gilt für den Rettungsdienst in der Schweiz?",
            "144",
            [
                "117 (Polizei)",
                "118 (Feuerwehr)",
                "112 (nur ausserhalb der Schweiz)",
            ],
            "Ambulanz und medizinischer Notfall: 144; Polizei 117 und Feuerwehr 118.",
            [
                "117 ist die Polizei.",
                "118 ist die Feuerwehr.",
                "112 funktioniert oft, 144 ist aber die klassische Sanitätsnummer.",
            ],
            "easy",
        ),
        (
            "Welche Notrufnummer gilt für die Feuerwehr?",
            "118",
            [
                "144",
                "117",
                "101",
            ],
            "Feuerwehr und Elementarschäden: 118; Sanität 144 und Polizei 117.",
            [
                "144 ist Sanität.",
                "117 ist Polizei.",
                "101 ist keine Schweizer Notfallnummer.",
            ],
            "easy",
        ),
        (
            "Was ist eine Halbtax-Karte im öffentlichen Verkehr?",
            "Eine Jahreskarte, die Bahn-, Bus- und Schiffspreise um rund die Hälfte reduziert",
            [
                "Ein gratis Ticket für alle SBB-Züge",
                "Ein Pass nur für Ausländer",
                "Eine Versicherung bei Zugunfällen",
            ],
            "Mit Halbtax zahlen Inhaberinnen und Inhaber typischerweise 50 % des Normaltarifs im halbtaxberechtigten ÖV.",
            [
                "Gratisfahren gibt es so nicht.",
                "Halbtax richtet sich nicht nur an Ausländer.",
                "Unfallversicherung ist ein anderes Produkt.",
            ],
            "easy",
        ),
        (
            "Welche drei Kantone bilden die Gründungslegende von 1291?",
            "Uri, Schwyz und Unterwalden",
            [
                "Bern, Zürich und Genf",
                "Waadt, Tessin und Graubünden",
                "Basel, Luzern und Solothurn",
            ],
            "Die mittelalterliche Eidgenossenschaft startete nach Überlieferung mit Uri, Schwyz und (heute geteiltem) Unterwalden.",
            [
                "Bern, Zürich und Genf wurden später Kantone.",
                "Waadt, Tessin und Graubünden gehörten nicht zur Urlegende.",
                "Basel und Luzern sind jüngere Zugänge.",
            ],
            "medium",
        ),
        (
            "Wo wurde 1863 das Internationale Komitee vom Roten Kreuz gegründet?",
            "Genf",
            [
                "Bern",
                "Basel",
                "Zürich",
            ],
            "Henry Dunant und Mitstreiter gründeten das IKRC in Genf als humanitäre Institution.",
            [
                "Bern ist Bundeshauptstadt, nicht Gründungsort des IKRC.",
                "Basel ist Handelsstadt, nicht Gründungsort.",
                "Zürich ist Wirtschaftszentrum, das IKRC startete in Genf.",
            ],
            "medium",
        ),
        (
            "Was feiern Schweizerinnen und Schweizer am Bundesfeiertag traditionell?",
            "Den Zusammenschluss der Eidgenossenschaft und die Bundesgemeinschaft",
            [
                "Den Sieg bei Marignano",
                "Den EU-Beitritt",
                "Die Einführung des Euro",
            ],
            "Am 1. August steht die nationale Gemeinschaft im Mittelpunkt — nicht ein militärisches Ereignis.",
            [
                "Marignano war eine Niederlage, kein Feiertagsgrund.",
                "Der EU-Beitritt fand nicht statt.",
                "Der Franken blieb; Euro wurde nicht eingeführt.",
            ],
            "easy",
        ),
        (
            "Welche Aussage zur Föderalgeschichte ist korrekt?",
            "Vor 1848 bestand der lose zusammengesetzte Tagsatzungsbund; 1848 schuf den modernen Bundesstaat",
            [
                "Die Schweiz war ab 1291 ein zentralistischer Einheitsstaat",
                "1848 wurde die Schweiz zur Kolonie Frankreichs",
                "Der Bundesstaat entstand erst 1971",
            ],
            "Der Übergang von der Tagsatzung zur föderalen Verfassung von 1848 modernisierte Institutionen und Kompetenzen.",
            [
                "Der Alte Bund war föderal-lose, nicht zentralistisch.",
                "Frankreich kolonisierte die Schweiz nicht 1848.",
                "1971 betraf Frauenstimmrecht, nicht die Staatsgründung.",
            ],
            "hard",
        ),
    ],
    "geography-society": [
        (
            "Was ist die Hauptstadt der Schweiz?",
            "Bern",
            [
                "Zürich",
                "Genf",
                "Lausanne",
            ],
            "Bern ist Sitz von Bund, Botschaften und vielen Bundesbehörden — nicht grösste Stadt.",
            [
                "Zürich ist wirtschaftlich grösste Stadt, aber nicht Bundeshauptstadt.",
                "Genf ist internationales Zentrum, nicht Hauptstadt.",
                "Lausanne beherbergt das Bundesgericht, die Hauptstadt ist Bern.",
            ],
            "easy",
        ),
        (
            "Welchen höchsten Berg bezeichnet man oft mit dem Namen Dufourspitze?",
            "Monte Rosa-Massiv (höchster Punkt Schweiz)",
            [
                "Matterhorn",
                "Eiger",
                "Pilatus",
            ],
            "Die Dufourspitze (Monte Rosa) ist mit 4634 m der höchste Punkt des Landes.",
            [
                "Matterhorn ist ikonisch, aber etwas niedriger.",
                "Eiger liegt im Berner Oberland, nicht als höchster Gipfel.",
                "Pilatus ist deutlich niedriger.",
            ],
            "medium",
        ),
        (
            "Mit wie vielen Staaten grenzt die Schweiz?",
            "Fünf: Deutschland, Frankreich, Italien, Österreich und Liechtenstein",
            [
                "Drei: nur Nachbarländer der EU",
                "Sechs mit Slowenien",
                "Vier ohne das Fürstentum",
            ],
            "Die Schweiz hat fünf Nachbarstaaten, davon vier EU-Mitglieder und Liechtenstein.",
            [
                "Es sind fünf Grenzen, nicht drei.",
                "Slowenien grenzt nicht an die Schweiz.",
                "Liechtenstein ist der fünfte Nachbar.",
            ],
            "easy",
        ),
        (
            "Ist die obligatorische Krankenversicherung in der Schweiz für alle Einwohner Pflicht?",
            "Ja — jede Person braucht eine anerkannte Grundversicherung",
            [
                "Nein, nur für Arbeitnehmer",
                "Nein, nur im Tessin",
                "Ja, aber nur im Ausland",
            ],
            "Ohne Grundversicherung riskieren Bewohner Nachmeldegebühren und Beiträge rückwirkend.",
            [
                "Nicht nur Erwerbstätige, sondern alle.",
                "Die Pflicht gilt landesweit.",
                "Ausland deckt die Schweizer Grundversicherung nicht ab.",
            ],
            "medium",
        ),
        (
            "Was ist die AHV?",
            "Die Alters- und Hinterlassenenversicherung — erste Säule der Vorsorge",
            [
                "Die Arbeitslosenversicherung",
                "Die Kfz-Steuer",
                "Die Militärpflicht",
            ],
            "AHV-Beiträge sichern eine Grundrente und gehören zur staatlichen Altersvorsorge.",
            [
                "Arbeitslosigkeit ist die ALV, nicht AHV.",
                "Kfz-Steuer ist kantonal, nicht AHV.",
                "Militärpflicht ist Wehrpflicht, nicht Rentenversicherung.",
            ],
            "easy",
        ),
        (
            "Was ist die IV in der Sozialversicherung?",
            "Die Invalidenversicherung für Menschen mit anerkannten Gesundheitsschäden",
            [
                "Die Arbeitslosenversicherung für Kurzarbeit",
                "Die Militärversicherung für Wehrpflichtige",
                "Die Unfallversicherung nur für Skiunfälle",
            ],
            "Die IV (Invalidenversicherung) unterstützt Betroffene bei Eingliederung und Deckung; sie ist eine Säule neben AHV.",
            [
                "Kurzarbeit und Arbeitslosigkeit regelt die ALV, nicht die IV.",
                "Wehrpflichtige haben andere Versicherungsstrukturen, nicht die IV-Definition.",
                "Unfallversicherung ist berufs- und nichtfallbezogen, nicht die IV insgesamt.",
            ],
            "medium",
        ),
        (
            "Was versteht man unter der Schweizer Milizarmee?",
            "Wehrpflichtige dienen periodisch; der Großteil der Armee besteht aus Milizsoldaten",
            [
                "Nur ausländische Söldner ohne Bürger",
                "Eine freiwillige Garde ohne Wehrpflicht",
                "Ein UNO-Truppenkontingent",
            ],
            "Männer leisten Rekrutierung und periodische Wiederholungskurse; Berufsmilitärs ergänzen.",
            [
                "Es sind Schweizer Bürger, nicht Söldnerheere.",
                "Wehrpflicht existiert weiterhin.",
                "UNO-Truppen sind nicht die Milizstruktur.",
            ],
            "medium",
        ),
        (
            "Welche Währung gilt in der Schweiz?",
            "Schweizer Franken (CHF)",
            [
                "Euro (€)",
                "US-Dollar",
                "Deutsche Mark",
            ],
            "Franken und Rappen sind das gesetzliche Zahlungsmittel; Euro wird freiwillig in Grenzregionen akzeptiert.",
            [
                "Der Euro ist keine offizielle Währung.",
                "US-Dollar gilt nicht als Landeswährung.",
                "Die D-Mark existiert nicht mehr.",
            ],
            "easy",
        ),
        (
            "Welcher Fluss fliesst durch die Stadt Bern?",
            "Die Aare",
            [
                "Der Rhein",
                "Die Rhone",
                "Der Inn",
            ],
            "Die Aare umfliesst die Berner Altstadt; Rhein und Rhone liegen in anderen Regionen.",
            [
                "Der Rhein bildet deutsche Grenze, fließt nicht durch Bern.",
                "Die Rhone entspringt im Wallis und mündet ins Mittelmeer.",
                "Der Inn liegt im Osten, nicht in Bern.",
            ],
            "easy",
        ),
        (
            "In welchem Kanton ist Französisch die vorherrschende Amtssprache (Beispiel Genf)?",
            "Waadt",
            [
                "Uri",
                "Schwyz",
                "Appenzell Ausserrhoden",
            ],
            "Waadt (Vaud) ist überwiegend französischsprachig; Genf und Neuenburg ebenfalls.",
            [
                "Uri ist deutschsprachig.",
                "Schwyz ist deutschsprachig.",
                "Appenzell Ausserrhoden ist deutschsprachig.",
            ],
            "easy",
        ),
        (
            "Was regelt in der Schweiz vor allem der Kanton?",
            "Schulen, Polizei, Gesundheitsvollzug und viele Steuern — soweit Bundesrecht nichts anderes bestimmt",
            [
                "Aussenpolitik und Währung allein",
                "Nur die Post",
                "Ausschliesslich die Armee",
            ],
            "Föderalismus: Kantone sind starke Akteure bei Bildung, Sicherheitsvollzug und Steuern.",
            [
                "Aussenpolitik und Geld liegen beim Bund.",
                "Post ist heute Aktiengesellschaft unter bundesnahem Rahmen.",
                "Armee ist Bundessache, Kantone nicht allein.",
            ],
            "medium",
        ),
        (
            "Was regelt vor allem der Bund?",
            "Zoll, Aussenpolitik, Nationalstrassen, Landesverteidigung und einheitliches Bundesrecht",
            [
                "Kommunale Müllabfuhr",
                "Schulcurricula jedes Dorfes",
                "Kantonale Polizeibekleidung",
            ],
            "Bundeskompetenzen umfassen aussen-, sicherheits- und verkehrspolitische Kernaufgaben.",
            [
                "Müll ist Gemeinde/Kanton.",
                "Schulen sind kantonal.",
                "Polizei ist kantonal organisiert.",
            ],
            "medium",
        ),
        (
            "Welcher See wird von Deutschland, Österreich und der Schweiz geteilt?",
            "Bodensee",
            [
                "Genfersee",
                "Zürichsee",
                "Brienzersee",
            ],
            "Der Bodensee liegt an der Dreiländergrenze D-A-CH.",
            [
                "Genfersee liegt zwischen CH und Frankreich.",
                "Zürichsee liegt ganz in der Schweiz.",
                "Brienzersee ist ein Schweizer Alpensee.",
            ],
            "easy",
        ),
        (
            "Welche Pflichten treffen auf Menschen, die in der Schweiz leben (Kernbeispiele)?",
            "Gesetze einhalten, Steuern zahlen, Krankenversicherung abschliessen",
            [
                "Nur freiwillige Spenden",
                "Nur Armee ohne Steuern",
                "Keine Versicherungspflicht",
            ],
            "Wer hier lebt, folgt Rechtsordnung, finanziert Gemeinwesen und muss grundversichert sein.",
            [
                "Spenden ersetzen keine Pflichten.",
                "Wehrpflicht befreit nicht von Steuern.",
                "Grundversicherung ist obligatorisch.",
            ],
            "medium",
        ),
        (
            "Wann finden auf Bundesebene typischerweise Abstimmungen und Wahlen statt?",
            "An mehreren Sonntagen pro Jahr (Abstimmungswochenenden)",
            [
                "Jeden Montag",
                "Nur am Bundesfeiertag",
                "Ausschliesslich im Dezember",
            ],
            "Volksabstimmungen werden meist an gesetzten Sonntagen mehrmals jährlich durchgeführt.",
            [
                "Montags gibt es keine regulären nationalen Urnen.",
                "Der 1. August ist Feiertag, kein Wahlrhythmus.",
                "Dezember allein reicht nicht für das Abstimmungskalender.",
            ],
            "easy",
        ),
    ],
    "naturalisation": [
        (
            "Wie werden Aufenthaltsjahre zwischen dem 8. und 18. Lebensjahr bei der ordentlichen Einbürgerung angerechnet?",
            "Sie zählen doppelt, mindestens 6 effektive Jahre Aufenthalt sind aber nötig",
            [
                "Sie zählen nicht",
                "Sie zählen dreifach",
                "Nur das letzte Jahr zählt",
            ],
            "Kinderjahre werden verdoppelt angerechnet, ersetzen aber nicht die Mindestzeit effektiven Aufenthalts.",
            [
                "Jugendjahre zählen mit, nicht gar nicht.",
                "Eine Verdreifachung gibt es nicht.",
                "Nicht nur ein Jahr, sondern die Regel über viele Jahre.",
            ],
            "medium",
        ),
        (
            "Zählen Jahre mit einer L-Bewilligung für die 10-jährige Bundesfrist?",
            "Nein — L-Aufenthalte zählen nicht für die ordentliche Einbürgerung",
            [
                "Ja, vollständig wie C",
                "Ja, aber nur im Tessin",
                "Nur die Hälfte",
            ],
            "Für ordentliche Einbürgerung müssen anrechenbare Jahre überwiegend mit Ausweisstatus ab B/Ci etc. sein, nicht L.",
            [
                "C und anrechenbare Bewilligungen sind massgebend, nicht L.",
                "Es gibt keine Tessin-Ausnahme für L.",
                "Halbierung gilt für andere Status, nicht pauschal für L.",
            ],
            "medium",
        ),
        (
            "Welche Bewilligung braucht man bei der ordentlichen Einbürgerung zum Zeitpunkt des Gesuchs?",
            "Niederlassungsbewilligung (C)",
            [
                "Kurzaufenthaltsbewilligung (L)",
                "Grenzgängerbewilligung ohne Wohnsitz",
                "Keine Bewilligung",
            ],
            "Wer ordentlich eingebürgert werden will, braucht eine gültige C-Bewilligung während des Verfahrens.",
            [
                "L ist zu kurzfristig für ordentliche Naturalisation.",
                "Grenzgänger wohnen ausserhalb; anderes Verfahren.",
                "Ohne Aufenthaltsstatus kein Gesuch möglich.",
            ],
            "easy",
        ),
        (
            "Was prüft der Bund zusätzlich zu Sprache und Aufenthalt bei der ordentlichen Einbürgerung?",
            "Vertrautheit mit Schweizer Lebensverhältnissen und Integration",
            [
                "Nur die Höhe des Bankkontos",
                "Nur die Religionszugehörigkeit",
                "Nur der Heimatort der Grosseltern",
            ],
            "Integration umfasst Anpassung, gesellschaftlichen Zusammenhalt und Respekt vor Rechtsordnung.",
            [
                "Vermögen allein genügt nicht.",
                "Religion ist kein Einbürgerungskriterium.",
                "Abstammung ersetzt Integration nicht.",
            ],
            "medium",
        ),
        (
            "Wer fällt typischerweise unter die erleichterte Einbürgerung?",
            "Personen, die in der Schweiz geboren oder aufgewachsen sind oder mit einem Schweizer Ehepartner verheiratet sind",
            [
                "Nur Millionäre",
                "Nur EU-Diplomaten",
                "Nur Rückwanderer ohne früheren Aufenthalt",
            ],
            "Das Gesetz sieht vereinfachte Wege für enge Bindungen zur Schweiz vor.",
            [
                "Vermögen öffnet keinen Sonderweg.",
                "Diplomatenstatus ist kein erleichtertes Kriterium.",
                "Ohne früheren Bezug gibt es meist nicht die erleichterte Spur.",
            ],
            "medium",
        ),
        (
            "Wer entscheidet zuletzt über die ordentliche Einbürgerung?",
            "Kanton und Gemeinde nach kantonalem Recht, anschliessend Bundesgenehmigung (SEM)",
            [
                "Nur die EU",
                "Nur das Bundesgericht ohne Kanton",
                "Nur die Gemeinde ohne Kanton",
            ],
            "Kanton und Gemeinde prüfen örtliche Integration; der Bund erteilt die eidgenössische Erwerbsurkunde.",
            [
                "Brüssel entscheidet Schweizer Bürgerrecht nicht.",
                "Das Bundesgericht ist keine Einbürgerungsbehörde.",
                "Kantonale Ebene bleibt zwingend beteiligt.",
            ],
            "medium",
        ),
        (
            "Seit wann anerkennt das Schweizer Recht die doppelte Staatsbürgerschaft generell beim Erwerb?",
            "Seit der Reform (1952 eingeschränkt, Ausweitung 1990er/2018 praktisch erleichtert)",
            [
                "Seit 1291 zwingend",
                "Nie — Mehrstaatigkeit ist verboten",
                "Nur für Sportler",
            ],
            "Heute können viele Bewerber die frühere Staatsangehörigkeit behalten; Details im individuellen Rechtsstaat prüfen.",
            [
                "1291 kannte kein modernes Staatsbürgerschaftsrecht.",
                "Verbot ist historisch, heute flexibler.",
                "Beruf spielt keine generelle Rolle.",
            ],
            "hard",
        ),
        (
            "Was kann eine Gemeinde im Einbürgerungsverfahren zusätzlich verlangen?",
            "Ein Gespräch, einen schriftlichen Test oder andere kantonale Anforderungen",
            [
                "Einen EU-Führerschein",
                "Einen Bundesrat-Posten",
                "Keinerlei Prüfung über die Bundesnorm hinaus",
            ],
            "Gemeinden und Kantone dürfen Staatskunde und Integration lokale prüfen — Formate variieren.",
            [
                "EU-Führerschein ist kein Einbürgerungskriterium.",
                "Politische Ämter sind nicht Voraussetzung.",
                "Lokale Prüfungen sind üblich, nicht verboten.",
            ],
            "medium",
        ),
        (
            "Welche Rolle hat das SEM (Staatssekretariat für Migration)?",
            "Es führt die bundesweite Einbürgerungsverfahren und erlässt die eidgenössische Erwerbsurkunde",
            [
                "Es wählt den Bundesrat",
                "Es leitet die Kantonalbanken",
                "Es ersetzt die Gemeinden vollständig",
            ],
            "Nach Kanton/Gemeinde-Entscheid bearbeitet das SEM den Bundesschritt und stellt Dokumente aus.",
            [
                "Bundesratswahl liegt bei der Bundesversammlung.",
                "Banken sind privat/reguliert, nicht SEM.",
                "Gemeinden bleiben am Anfang beteiligt.",
            ],
            "medium",
        ),
        (
            "Wofür steht fide im Einbürgerungskontext?",
            "Sprachqualifikationsrahmen (u. a. B1 mündlich / A2 schriftlich als Referenz)",
            [
                "Ein kantonaler Feiertag",
                "Eine Krankenversicherung",
                "Ein Militärrang",
            ],
            "fide beschreibt Sprachniveaus für Alltag und Behördenkontakte in Einbürgerungsverfahren.",
            [
                "Kein Feiertagsname.",
                "Versicherungen sind GKV/OKP, nicht fide.",
                "Militär ist Wehrpflicht, nicht fide.",
            ],
            "medium",
        ),
        (
            "Welche drei offiziellen Wege führen zur Schweizer Bürgerschaft durch Entscheid?",
            "Ordentliche, erleichterte und Wiedereinbürgerung",
            [
                "Nur Geburt im Ausland",
                "Nur Lotterie",
                "Nur Heirat ohne Aufenthalt",
            ],
            "Das Bürgerrechtsgesetz unterscheidet ordentlichen, erleichterten Weg und Wiedereinbürgerung.",
            [
                "Geburt im Ausland allein erzeugt nicht automatisch den Schweizer Pass.",
                "Lotterie existiert nicht.",
                "Ehe braucht Aufenthalt und weitere Voraussetzungen.",
            ],
            "easy",
        ),
        (
            "Wie lange müssen Ehepartner einer Schweizerin bzw. eines Schweizers typischerweise in der Schweiz gelebt haben (erleichterter Weg — Orientierung)?",
            "Fünf Jahre Aufenthalt in der Schweiz, davon ein Jahr unmittelbar vor dem Gesuch verheiratet",
            [
                "Ein Monat",
                "Zwanzig Jahre ohne Ausnahme",
                "Kein Aufenthalt nötig",
            ],
            "Der erleichterte Weg verlangt fünf Jahre Wohnsitz und eine Ehe von mindestens einem Jahr unmittelbar vor Einreichung.",
            [
                "Ein Monat reicht nicht.",
                "Zwanzig Jahre ist ordentlicher Pflichtwert, nicht erleichtert.",
                "Aufenthalt ist zwingend.",
            ],
            "hard",
        ),
        (
            "Was passiert bei strittigen Steuerschulden oder Sozialhilfeabhängigkeit oft im Verfahren?",
            "Sie können gegen die Einbürgerung sprechen — Ehrlichkeit und finanzielle Solidität zählen",
            [
                "Sie verbessern automatisch die Chancen",
                "Sie sind irrelevant",
                "Nur die Grosseltern werden geprüft",
            ],
            "Behörden prüfen finanzielle Eigenverantwortung und Integration; offene Schulden können hinderlich sein.",
            [
                "Schulden sind kein Vorteil.",
                "Finanzen gehören zur Integration.",
                "Grosseltern sind nicht massgebend.",
            ],
            "medium",
        ),
        (
            "Warum reicht eine generische Internet-Fragensammlung oft nicht allein aus?",
            "Kantone und Gemeinden prüfen zusätzlich lokale Themen — Formate und Fragen unterscheiden sich",
            [
                "Weil es keinen Staatskundetest gibt",
                "Weil nur Englisch zählt",
                "Weil der Bund mündlich ausschliesslich Französisch testet",
            ],
            "Zürich, Bern und andere veröffentlichen eigene Listen; föderale Basis muss mit lokaler Vorbereitung ergänzt werden.",
            [
                "Tests und Gespräche existieren in vielen Gemeinden.",
                "Nationale Sprachen sind DE/FR/IT/RM, nicht nur Englisch.",
                "Sprache richtet sich nach Region, nicht pauschal nur FR.",
            ],
            "medium",
        ),
        (
            "Endet die Einbürgerung mit der SEM-Urkunde allein?",
            "Nein — Gemeinde/Kanton müssen zustimmen; der Bund erteilt erst danach die Erwerbsurkunde",
            [
                "Ja, SEM ersetzt alle Stufen",
                "Ja, nur ein Online-Quiz genügt",
                "Nein, aber ohne Aufenthaltstitel",
            ],
            "Das Verfahren ist mehrstufig: lokal Integration und Staatskunde, dann eidgenössische Genehmigung.",
            [
                "SEM schliesst erst den Bundesschritt ab.",
                "Behördenprüfung geht über Quiz hinaus.",
                "Gültiger Aufenthalt ist Voraussetzung.",
            ],
            "medium",
        ),
    ],
}


def main() -> None:
    bank = json.loads(BANK_PATH.read_text(encoding="utf-8"))
    keep = [q for q in bank if int(q["id"].split("-")[-1]) <= 15]
    if len(keep) != 60:
        raise SystemExit(f"expected 60 keepers, got {len(keep)}")
    topics = {q["topicId"] for q in keep}
    if topics != set(EXTRAS):
        raise SystemExit(f"topic mismatch {topics} vs {set(EXTRAS)}")
    added: list[dict] = []
    for topic_id in sorted(EXTRAS):
        rows = EXTRAS[topic_id]
        if len(rows) != 15:
            raise SystemExit(f"{topic_id}: need 15 extras")
        for i, row in enumerate(rows):
            n = 16 + i
            added.append(make_q(topic_id, n, row))
    out = keep + added
    if len(out) != 120:
        raise SystemExit(f"expected 120, got {len(out)}")
    BANK_PATH.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {len(out)} items to {BANK_PATH.name}")


if __name__ == "__main__":
    main()
