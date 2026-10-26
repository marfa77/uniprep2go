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

# UI chrome for for-X-speakers landings (support-language). Default = English.
UI_BY_LANG: dict[str, dict[str, str]] = {
    "en": {
        "prep_for": "Prep for {exam} · PixID Studio",
        "buy": "Buy —",
        "get_access": "Get instant access —",
        "view_prep2go": "View on Prep2Go",
        "view_uniprep": "View on UniPrep2Go",
        "sold_by": "Sold by PixID Studio on Gumroad — the same Anki bank used on Prep2Go and UniPrep2Go. Independent {exam} study aid. Delivered as {format} for",
        "not_official": "Not official {disclaimer} material.",
        "exams_label": "Exams & pathways",
        "pathways": "Pathways:",
        "covers": "What this deck covers:",
        "not_included": "Not included:",
        "why_anki": "Why Anki:",
        "official_note": "Independent study aid — not affiliated with or endorsed by {disclaimer}. Always verify current exam rules with the official body.",
        "samples_h": "Sample cards",
        "samples_p": "Real preview cards from the deck — vocabulary with image cues (audio in the .apkg).",
        "glance_h": "Deck at a glance",
        "cards_label": "Cards",
        "flashcards": "flashcards",
        "file_label": "File",
        "pathways_label": "Pathways",
        "delivery_label": "Delivery",
        "delivery_value": "Instant Gumroad download",
        "faq_h": "FAQ",
        "faq_exams": "Which exams / pathways is this for?",
        "faq_who": "Who should buy this deck?",
        "faq_cover": "What does the deck cover — and what is missing?",
        "faq_covers": "Covers:",
        "faq_missing": "Not included:",
        "faq_download": "What is included in the download?",
        "faq_download_a": "{cards} Anki flashcards — {format}. Instant Gumroad library download.",
        "faq_import": "How do I import into Anki?",
        "faq_import_a": "Download the .apkg from Gumroad → Anki desktop → File → Import → select the file. Sync to AnkiMobile or AnkiDroid via AnkiWeb.",
        "faq_official": "Is this official exam material?",
        "faq_official_a": "No. Independent study aid — not affiliated with, endorsed by, or sponsored by {disclaimer}. Always verify current exam rules on the official site.",
        "faq_pass": "Will this guarantee I pass?",
        "faq_pass_a": "No. The deck improves vocabulary retention and exam readiness; results depend on consistent study plus official practice.",
        "faq_refund": "Refunds?",
        "faq_refund_a": "Digital download — all sales final.",
        "ready_h": "Ready to study?",
        "ready_p": "One-time purchase. Instant .apkg download. Multi-pathway vocabulary for cold Gumroad traffic.",
        "want_this": "I want this — instant download",
        "footer_legal": "Independent study aid · Not official {disclaimer} material · Digital download — all sales final.",
        "benefit_built": "Built for {exam}",
        "benefit_cards": "{cards} cards — {format}",
        "benefit_fields": "Headword + meaning + example + audio (where included)",
        "benefit_pathways": "Multi-pathway framing for the related exams / immigration routes",
        "benefit_delivery": "Instant Gumroad download · sync to mobile via AnkiWeb",
        "meta": "{cards} Anki flashcards for {exam}. Vocabulary with audio — independent prep, not official {disclaimer} material.",
    },
    "ru": {
        "prep_for": "Подготовка к {exam} · PixID Studio",
        "buy": "Купить —",
        "get_access": "Скачать сразу —",
        "view_prep2go": "На Prep2Go",
        "view_uniprep": "На UniPrep2Go",
        "sold_by": "Продаёт PixID Studio на Gumroad — та же Anki-колода, что на Prep2Go и UniPrep2Go. Независимая подготовка к {exam}. Формат: {format}, цена",
        "not_official": "Не официальные материалы {disclaimer}.",
        "exams_label": "Экзамены и пути",
        "pathways": "Пути:",
        "covers": "Что в колоде:",
        "not_included": "Чего нет:",
        "why_anki": "Зачем Anki:",
        "official_note": "Независимый учебный материал — без аффилиации с {disclaimer}. Актуальные правила всегда сверяйте на официальном сайте.",
        "samples_h": "Примеры карточек",
        "samples_p": "Реальные карточки из колоды — слово, картинка (аудио внутри .apkg).",
        "glance_h": "Колода кратко",
        "cards_label": "Карточки",
        "flashcards": "карточек",
        "file_label": "Файл",
        "pathways_label": "Пути",
        "delivery_label": "Доставка",
        "delivery_value": "Мгновенная загрузка с Gumroad",
        "faq_h": "Вопросы",
        "faq_exams": "Для каких экзаменов и путей эта колода?",
        "faq_who": "Кому подойдёт?",
        "faq_cover": "Что покрывает колода — и чего в ней нет?",
        "faq_covers": "Есть:",
        "faq_missing": "Нет:",
        "faq_download": "Что я получу после оплаты?",
        "faq_download_a": "{cards} карточек Anki — {format}. Сразу в библиотеке Gumroad.",
        "faq_import": "Как импортировать в Anki?",
        "faq_import_a": "Скачайте .apkg с Gumroad → Anki на компьютере → Файл → Импорт → выберите файл. Синхронизация на телефон через AnkiWeb.",
        "faq_official": "Это официальные материалы экзамена?",
        "faq_official_a": "Нет. Независимый учебный продукт PixID Studio, без связи с {disclaimer}. Правила экзамена сверяйте на официальном сайте.",
        "faq_pass": "Гарантирует ли колода сдачу?",
        "faq_pass_a": "Нет. Она ускоряет запоминание словаря; результат зависит от регулярных занятий и официальных пробников.",
        "faq_refund": "Возврат?",
        "faq_refund_a": "Цифровая загрузка — продажи окончательные.",
        "ready_h": "Готовы заниматься?",
        "ready_p": "Разовая оплата. Мгновенная загрузка .apkg. Словарь под экзамен и иммиграционные пути.",
        "want_this": "Хочу — скачать сразу",
        "footer_legal": "Независимый учебный материал · Не официальные материалы {disclaimer} · Цифровая загрузка — без возврата.",
        "benefit_built": "Под {exam}",
        "benefit_cards": "{cards} карточек — {format}",
        "benefit_fields": "Слово + перевод + пример + аудио (где есть)",
        "benefit_pathways": "Формулировки под связанные экзамены и иммиграционные пути",
        "benefit_delivery": "Мгновенная загрузка с Gumroad · синхронизация на телефон через AnkiWeb",
        "meta": "{cards} карточек Anki для {exam}. Словарь с аудио — независимая подготовка, не официальные материалы {disclaimer}.",
    },
    "uk": {
        "prep_for": "Підготовка до {exam} · PixID Studio",
        "buy": "Купити —",
        "get_access": "Завантажити одразу —",
        "view_prep2go": "На Prep2Go",
        "view_uniprep": "На UniPrep2Go",
        "sold_by": "Продає PixID Studio на Gumroad — та сама Anki-колода, що на Prep2Go і UniPrep2Go. Незалежна підготовка до {exam}. Формат: {format}, ціна",
        "not_official": "Не офіційні матеріали {disclaimer}.",
        "exams_label": "Іспити та шляхи",
        "pathways": "Шляхи:",
        "covers": "Що в колоді:",
        "not_included": "Чого немає:",
        "why_anki": "Навіщо Anki:",
        "official_note": "Незалежний навчальний матеріал — без афіліації з {disclaimer}. Актуальні правила завжди звіряйте на офіційному сайті.",
        "samples_h": "Приклади карток",
        "samples_p": "Справжні картки з колоди — слово, зображення (аудіо всередині .apkg).",
        "glance_h": "Колода стисло",
        "cards_label": "Картки",
        "flashcards": "карток",
        "file_label": "Файл",
        "pathways_label": "Шляхи",
        "delivery_label": "Доставка",
        "delivery_value": "Миттєве завантаження з Gumroad",
        "faq_h": "Питання",
        "faq_exams": "Для яких іспитів і шляхів ця колода?",
        "faq_who": "Кому підійде?",
        "faq_cover": "Що покриває колода — і чого в ній немає?",
        "faq_covers": "Є:",
        "faq_missing": "Немає:",
        "faq_download": "Що я отримаю після оплати?",
        "faq_download_a": "{cards} карток Anki — {format}. Одразу в бібліотеці Gumroad.",
        "faq_import": "Як імпортувати в Anki?",
        "faq_import_a": "Завантажте .apkg з Gumroad → Anki на комп’ютері → Файл → Імпорт → оберіть файл. Синхронізація на телефон через AnkiWeb.",
        "faq_official": "Це офіційні матеріали іспиту?",
        "faq_official_a": "Ні. Незалежний навчальний продукт PixID Studio, без зв’язку з {disclaimer}. Правила іспиту звіряйте на офіційному сайті.",
        "faq_pass": "Чи гарантує колода складання?",
        "faq_pass_a": "Ні. Вона прискорює запам’ятовування словника; результат залежить від регулярних занять і офіційних пробників.",
        "faq_refund": "Повернення?",
        "faq_refund_a": "Цифрове завантаження — продаж остаточний.",
        "ready_h": "Готові займатися?",
        "ready_p": "Одноразова оплата. Миттєве завантаження .apkg. Словник під іспит та імміграційні шляхи.",
        "want_this": "Хочу — завантажити одразу",
        "footer_legal": "Незалежний навчальний матеріал · Не офіційні матеріали {disclaimer} · Цифрове завантаження — без повернення.",
        "benefit_built": "Під {exam}",
        "benefit_cards": "{cards} карток — {format}",
        "benefit_fields": "Слово + переклад + приклад + аудіо (де є)",
        "benefit_pathways": "Формулювання під пов’язані іспити та імміграційні шляхи",
        "benefit_delivery": "Миттєве завантаження з Gumroad · синхронізація на телефон через AnkiWeb",
        "meta": "{cards} карток Anki для {exam}. Словник з аудіо — незалежна підготовка, не офіційні матеріали {disclaimer}.",
    },
    "fr": {
        "prep_for": "Préparation {exam} · PixID Studio",
        "buy": "Acheter —",
        "get_access": "Télécharger tout de suite —",
        "view_prep2go": "Sur Prep2Go",
        "view_uniprep": "Sur UniPrep2Go",
        "sold_by": "Vendu par PixID Studio sur Gumroad — le même paquet Anki que sur Prep2Go et UniPrep2Go. Aide indépendante pour {exam}. Format : {format}, prix",
        "not_official": "Pas un matériel officiel {disclaimer}.",
        "exams_label": "Examens et parcours",
        "pathways": "Parcours :",
        "covers": "Contenu du paquet :",
        "not_included": "Non inclus :",
        "why_anki": "Pourquoi Anki :",
        "official_note": "Aide à l’étude indépendante — sans lien avec {disclaimer}. Vérifiez toujours les règles officielles.",
        "samples_h": "Exemples de cartes",
        "samples_p": "Vraies cartes du paquet — mot et image (audio dans le .apkg).",
        "glance_h": "Le paquet en bref",
        "cards_label": "Cartes",
        "flashcards": "cartes",
        "file_label": "Fichier",
        "pathways_label": "Parcours",
        "delivery_label": "Livraison",
        "delivery_value": "Téléchargement immédiat sur Gumroad",
        "faq_h": "FAQ",
        "faq_exams": "Pour quels examens / parcours ?",
        "faq_who": "Pour qui ?",
        "faq_cover": "Que couvre le paquet — et que manque-t-il ?",
        "faq_covers": "Inclus :",
        "faq_missing": "Non inclus :",
        "faq_download": "Que vais-je recevoir ?",
        "faq_download_a": "{cards} cartes Anki — {format}. Immédiatement dans votre bibliothèque Gumroad.",
        "faq_import": "Comment importer dans Anki ?",
        "faq_import_a": "Téléchargez le .apkg depuis Gumroad → Anki bureau → Fichier → Importer. Synchronisez le mobile via AnkiWeb.",
        "faq_official": "Est-ce un matériel officiel ?",
        "faq_official_a": "Non. Produit indépendant PixID Studio, sans lien avec {disclaimer}. Vérifiez les règles sur le site officiel.",
        "faq_pass": "Cela garantit-il la réussite ?",
        "faq_pass_a": "Non. Le paquet accélère la mémorisation du vocabulaire ; le résultat dépend de l’entraînement et des examens blancs officiels.",
        "faq_refund": "Remboursement ?",
        "faq_refund_a": "Téléchargement numérique — ventes définitives.",
        "ready_h": "Prêt à réviser ?",
        "ready_p": "Achat unique. Téléchargement .apkg immédiat. Vocabulaire multi-examens.",
        "want_this": "Je le veux — téléchargement immédiat",
        "footer_legal": "Aide indépendante · Pas un matériel officiel {disclaimer} · Téléchargement numérique — sans remboursement.",
        "benefit_built": "Pour {exam}",
        "benefit_cards": "{cards} cartes — {format}",
        "benefit_fields": "Mot + sens + exemple + audio (si inclus)",
        "benefit_pathways": "Formulation pour les examens et parcours d’immigration liés",
        "benefit_delivery": "Téléchargement Gumroad immédiat · sync mobile via AnkiWeb",
        "meta": "{cards} cartes Anki pour {exam}. Vocabulaire avec audio — préparation indépendante, pas un matériel officiel {disclaimer}.",
    },
    "es": {
        "prep_for": "Preparación {exam} · PixID Studio",
        "buy": "Comprar —",
        "get_access": "Descargar ahora —",
        "view_prep2go": "En Prep2Go",
        "view_uniprep": "En UniPrep2Go",
        "sold_by": "Vendido por PixID Studio en Gumroad — el mismo mazo Anki que en Prep2Go y UniPrep2Go. Ayuda independiente para {exam}. Formato: {format}, precio",
        "not_official": "No es material oficial de {disclaimer}.",
        "exams_label": "Exámenes y vías",
        "pathways": "Vías:",
        "covers": "Qué incluye:",
        "not_included": "Qué no incluye:",
        "why_anki": "Por qué Anki:",
        "official_note": "Material de estudio independiente — sin afiliación con {disclaimer}. Verifique siempre las reglas oficiales.",
        "samples_h": "Ejemplos de tarjetas",
        "samples_p": "Tarjetas reales del mazo — palabra e imagen (audio en el .apkg).",
        "glance_h": "El mazo en resumen",
        "cards_label": "Tarjetas",
        "flashcards": "tarjetas",
        "file_label": "Archivo",
        "pathways_label": "Vías",
        "delivery_label": "Entrega",
        "delivery_value": "Descarga inmediata en Gumroad",
        "faq_h": "Preguntas",
        "faq_exams": "¿Para qué exámenes / vías?",
        "faq_who": "¿Para quién es?",
        "faq_cover": "¿Qué cubre el mazo — y qué falta?",
        "faq_covers": "Incluye:",
        "faq_missing": "No incluye:",
        "faq_download": "¿Qué recibo al pagar?",
        "faq_download_a": "{cards} tarjetas Anki — {format}. Enseguida en tu biblioteca Gumroad.",
        "faq_import": "¿Cómo importar en Anki?",
        "faq_import_a": "Descarga el .apkg desde Gumroad → Anki de escritorio → Archivo → Importar. Sincroniza el móvil con AnkiWeb.",
        "faq_official": "¿Es material oficial del examen?",
        "faq_official_a": "No. Producto independiente de PixID Studio, sin vínculo con {disclaimer}. Consulte las reglas en el sitio oficial.",
        "faq_pass": "¿Garantiza aprobar?",
        "faq_pass_a": "No. Acelera el vocabulario; el resultado depende del estudio constante y de exámenes de práctica oficiales.",
        "faq_refund": "¿Reembolsos?",
        "faq_refund_a": "Descarga digital — ventas finales.",
        "ready_h": "¿Listo para estudiar?",
        "ready_p": "Pago único. Descarga .apkg inmediata. Vocabulario multipaso.",
        "want_this": "Lo quiero — descarga inmediata",
        "footer_legal": "Ayuda independiente · No es material oficial de {disclaimer} · Descarga digital — sin reembolso.",
        "benefit_built": "Para {exam}",
        "benefit_cards": "{cards} tarjetas — {format}",
        "benefit_fields": "Palabra + sentido + ejemplo + audio (si hay)",
        "benefit_pathways": "Enfoque para exámenes y vías de inmigración relacionados",
        "benefit_delivery": "Descarga Gumroad inmediata · sync móvil vía AnkiWeb",
        "meta": "{cards} tarjetas Anki para {exam}. Vocabulario con audio — preparación independiente, no material oficial de {disclaimer}.",
    },
    "pt": {
        "prep_for": "Preparação {exam} · PixID Studio",
        "buy": "Comprar —",
        "get_access": "Baixar agora —",
        "view_prep2go": "No Prep2Go",
        "view_uniprep": "No UniPrep2Go",
        "sold_by": "Vendido pela PixID Studio no Gumroad — o mesmo baralho Anki do Prep2Go e UniPrep2Go. Ajuda independente para {exam}. Formato: {format}, preço",
        "not_official": "Não é material oficial de {disclaimer}.",
        "exams_label": "Exames e caminhos",
        "pathways": "Caminhos:",
        "covers": "O que inclui:",
        "not_included": "O que não inclui:",
        "why_anki": "Por que Anki:",
        "official_note": "Material de estudo independente — sem vínculo com {disclaimer}. Confirme sempre as regras oficiais.",
        "samples_h": "Exemplos de cartões",
        "samples_p": "Cartões reais do baralho — palavra e imagem (áudio no .apkg).",
        "glance_h": "O baralho em resumo",
        "cards_label": "Cartões",
        "flashcards": "cartões",
        "file_label": "Arquivo",
        "pathways_label": "Caminhos",
        "delivery_label": "Entrega",
        "delivery_value": "Download imediato no Gumroad",
        "faq_h": "Perguntas",
        "faq_exams": "Para quais exames / caminhos?",
        "faq_who": "Para quem é?",
        "faq_cover": "O que o baralho cobre — e o que falta?",
        "faq_covers": "Inclui:",
        "faq_missing": "Não inclui:",
        "faq_download": "O que recebo após o pagamento?",
        "faq_download_a": "{cards} cartões Anki — {format}. Na hora na biblioteca Gumroad.",
        "faq_import": "Como importar no Anki?",
        "faq_import_a": "Baixe o .apkg no Gumroad → Anki no computador → Arquivo → Importar. Sincronize o celular via AnkiWeb.",
        "faq_official": "É material oficial do exame?",
        "faq_official_a": "Não. Produto independente da PixID Studio, sem vínculo com {disclaimer}. Confira as regras no site oficial.",
        "faq_pass": "Garante a aprovação?",
        "faq_pass_a": "Não. Acelera o vocabulário; o resultado depende do estudo constante e de simulados oficiais.",
        "faq_refund": "Reembolso?",
        "faq_refund_a": "Download digital — vendas finais.",
        "ready_h": "Pronto para estudar?",
        "ready_p": "Pagamento único. Download .apkg imediato. Vocabulário multipercurso.",
        "want_this": "Quero — download imediato",
        "footer_legal": "Ajuda independente · Não é material oficial de {disclaimer} · Download digital — sem reembolso.",
        "benefit_built": "Para {exam}",
        "benefit_cards": "{cards} cartões — {format}",
        "benefit_fields": "Palavra + sentido + exemplo + áudio (quando houver)",
        "benefit_pathways": "Foco nos exames e caminhos de imigração relacionados",
        "benefit_delivery": "Download Gumroad imediato · sync no celular via AnkiWeb",
        "meta": "{cards} cartões Anki para {exam}. Vocabulário com áudio — preparação independente, não material oficial de {disclaimer}.",
    },
    "ar": {
        "prep_for": "التحضير لـ {exam} · PixID Studio",
        "buy": "اشترِ —",
        "get_access": "حمّل فورًا —",
        "view_prep2go": "على Prep2Go",
        "view_uniprep": "على UniPrep2Go",
        "sold_by": "تبيعه PixID Studio على Gumroad — نفس مجموعة Anki في Prep2Go وUniPrep2Go. مساعدة مستقلة لـ {exam}. الصيغة: {format}، السعر",
        "not_official": "ليست مواد رسمية لـ {disclaimer}.",
        "exams_label": "الامتحانات والمسارات",
        "pathways": "المسارات:",
        "covers": "ما يشمله المجموعة:",
        "not_included": "ما لا يشمله:",
        "why_anki": "لماذا Anki:",
        "official_note": "مادة دراسية مستقلة — بلا ارتباط بـ {disclaimer}. راجع القواعد الرسمية دائمًا.",
        "samples_h": "نماذج البطاقات",
        "samples_p": "بطاقات حقيقية من المجموعة — كلمة وصورة (الصوت داخل ملف .apkg).",
        "glance_h": "المجموعة باختصار",
        "cards_label": "البطاقات",
        "flashcards": "بطاقة",
        "file_label": "الملف",
        "pathways_label": "المسارات",
        "delivery_label": "التسليم",
        "delivery_value": "تنزيل فوري من Gumroad",
        "faq_h": "أسئلة",
        "faq_exams": "لأي امتحانات / مسارات؟",
        "faq_who": "لمن هذه المجموعة؟",
        "faq_cover": "ماذا تغطي المجموعة — وماذا ينقص؟",
        "faq_covers": "يشمل:",
        "faq_missing": "لا يشمل:",
        "faq_download": "ماذا أحصل بعد الدفع؟",
        "faq_download_a": "{cards} بطاقة Anki — {format}. فورًا في مكتبة Gumroad.",
        "faq_import": "كيف أستورد إلى Anki؟",
        "faq_import_a": "حمّل .apkg من Gumroad → Anki على الكمبيوتر → ملف → استيراد. زامن الهاتف عبر AnkiWeb.",
        "faq_official": "هل هذه مواد رسمية؟",
        "faq_official_a": "لا. منتج مستقل من PixID Studio بلا ارتباط بـ {disclaimer}. راجع القواعد على الموقع الرسمي.",
        "faq_pass": "هل يضمن النجاح؟",
        "faq_pass_a": "لا. يسرّع حفظ المفردات؛ النتيجة تعتمد على الدراسة المنتظمة والاختبارات الرسمية التجريبية.",
        "faq_refund": "استرداد؟",
        "faq_refund_a": "تنزيل رقمي — المبيعات نهائية.",
        "ready_h": "جاهز للدراسة؟",
        "ready_p": "شراء لمرة واحدة. تنزيل .apkg فوري. مفردات لمسارات متعددة.",
        "want_this": "أريدها — تنزيل فوري",
        "footer_legal": "مساعدة مستقلة · ليست مواد رسمية لـ {disclaimer} · تنزيل رقمي — بلا استرداد.",
        "benefit_built": "لـ {exam}",
        "benefit_cards": "{cards} بطاقة — {format}",
        "benefit_fields": "كلمة + معنى + مثال + صوت (إن وُجد)",
        "benefit_pathways": "صياغة لمسارات الامتحان والهجرة ذات الصلة",
        "benefit_delivery": "تنزيل Gumroad فوري · مزامنة الهاتف عبر AnkiWeb",
        "meta": "{cards} بطاقة Anki لـ {exam}. مفردات مع صوت — تحضير مستقل، ليست مواد رسمية لـ {disclaimer}.",
    },
    "tr": {
        "prep_for": "{exam} hazırlığı · PixID Studio",
        "buy": "Satın al —",
        "get_access": "Hemen indir —",
        "view_prep2go": "Prep2Go’da",
        "view_uniprep": "UniPrep2Go’da",
        "sold_by": "PixID Studio tarafından Gumroad’da satılır — Prep2Go ve UniPrep2Go’daki aynı Anki destesi. {exam} için bağımsız çalışma yardımı. Biçim: {format}, fiyat",
        "not_official": "{disclaimer} resmi materyali değildir.",
        "exams_label": "Sınavlar ve yollar",
        "pathways": "Yollar:",
        "covers": "Destede neler var:",
        "not_included": "Neler yok:",
        "why_anki": "Neden Anki:",
        "official_note": "Bağımsız çalışma materyali — {disclaimer} ile bağlantısı yoktur. Kuralları her zaman resmi siteden doğrulayın.",
        "samples_h": "Örnek kartlar",
        "samples_p": "Desteden gerçek kartlar — kelime ve görsel (.apkg içinde ses).",
        "glance_h": "Desteye bakış",
        "cards_label": "Kartlar",
        "flashcards": "kart",
        "file_label": "Dosya",
        "pathways_label": "Yollar",
        "delivery_label": "Teslimat",
        "delivery_value": "Gumroad’dan anında indirme",
        "faq_h": "SSS",
        "faq_exams": "Hangi sınavlar / yollar için?",
        "faq_who": "Kimler için?",
        "faq_cover": "Deste neyi kapsıyor — ve neler yok?",
        "faq_covers": "Var:",
        "faq_missing": "Yok:",
        "faq_download": "Ödeme sonrası ne alırım?",
        "faq_download_a": "{cards} Anki kartı — {format}. Hemen Gumroad kitaplığınızda.",
        "faq_import": "Anki’ye nasıl aktarırım?",
        "faq_import_a": "Gumroad’dan .apkg indirin → masaüstü Anki → Dosya → İçe Aktar. AnkiWeb ile telefona senkronize edin.",
        "faq_official": "Resmi sınav materyali mi?",
        "faq_official_a": "Hayır. PixID Studio’nun bağımsız ürünü; {disclaimer} ile bağlantısı yoktur. Kuralları resmi siteden kontrol edin.",
        "faq_pass": "Geçmeyi garanti eder mi?",
        "faq_pass_a": "Hayır. Kelime ezberini hızlandırır; sonuç düzenli çalışmaya ve resmi denemelere bağlıdır.",
        "faq_refund": "İade?",
        "faq_refund_a": "Dijital indirme — satışlar nihaidir.",
        "ready_h": "Çalışmaya hazır mısınız?",
        "ready_p": "Tek seferlik ödeme. Anında .apkg indirme. Çok yollu kelime bankası.",
        "want_this": "İstiyorum — hemen indir",
        "footer_legal": "Bağımsız yardım · {disclaimer} resmi materyali değil · Dijital indirme — iade yok.",
        "benefit_built": "{exam} için",
        "benefit_cards": "{cards} kart — {format}",
        "benefit_fields": "Kelime + anlam + örnek + ses (varsa)",
        "benefit_pathways": "İlgili sınav ve göç yolları için çerçeve",
        "benefit_delivery": "Anında Gumroad indirme · AnkiWeb ile telefona senkron",
        "meta": "{exam} için {cards} Anki kartı. Sesli kelime bankası — bağımsız hazırlık, {disclaimer} resmi materyali değil.",
    },
}

# Multi-pathway cold-traffic copy — Gumroad buyers often have zero site context.
SPECS: dict[str, dict[str, Any]] = {
    "ciple-a2-for-russian-speakers-anki-deck": {
        "label": "CIPLE A2 for Russian Speakers",
        "headline": "CIPLE A2 for Russian Speakers Anki Deck — 2043 Flashcards",
        "exam": "CIPLE / CAPLE A2 · residency & citizenship — for Russian speakers",
        "hook": (
            "European Portuguese vocabulary for Russian speakers preparing CIPLE / CAPLE A2 — "
            "Russian glosses and bilingual examples on every card."
        ),
        "audience": (
            "For Russian-speaking CIPLE / CAPLE A2 and Portugal residency or citizenship "
            "applicants who want PT-PT with Russian support — not Portugal nacionalidade civics."
        ),
        "disclaimer": "CAPLE / University of Lisbon",
        "about_heading": "Who is this CIPLE deck for?",
        "about": (
            "Russian speakers preparing CIPLE A2 for residency and nationality language "
            "evidence share the same high-frequency European Portuguese lexicon. This deck "
            "packages that bank with Russian glosses and bilingual examples. It is distinct "
            "from the English-gloss CIPLE CAPLE deck and not a nacionalidade civics pack."
        ),
        "pathways": "CIPLE A2 · CAPLE A2 · autorização de residência · nacionalidade · Russian support",
        "deck_covers": (
            "2,043 PT-PT vocabulary cards with Russian glosses, bilingual examples, "
            "native Portuguese audio, and illustrations."
        ),
        "not_included": (
            "Official CAPLE past papers, speaking-partner practice, or citizenship civics content "
            "(see Portugal Nacionalidade Anki). Not Brazilian Portuguese glosses."
        ),
        "why_anki": (
            "CIPLE and residency deadlines reward consistent PT-PT recall. Russian support "
            "speeds early comprehension while audio forces European Portuguese under pressure."
        ),
        "cards": "2043",
        "format_note": "Anki .apkg with audio, images, and Russian glosses",
        "sample_captions": ["o código postal", "a farmácia de serviço", "a loja do cidadão"],
        "facts": [
            ("Pathways", "CIPLE / CAPLE · residency · citizenship"),
            ("Cards", "2043 vocabulary"),
            ("Support", "Russian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ciple-a2-european-portuguese-anki-deck": {
        "label": "CIPLE CAPLE Portuguese Citizenship",
        "headline": "CIPLE CAPLE Portuguese Citizenship Anki Deck — 2058 Flashcards",
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
            "2,058 PT-PT cards with headword, meaning, contextual examples, pronunciation audio, "
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
        "cards": "2058",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["a universidade", "o escritório", "o mercado"],
        "facts": [
            ("Pathways", "CIPLE / CAPLE · residency · citizenship"),
            ("Cards", "2058 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "portuguese-survival-anki-deck": {
        "label": "Portuguese Survival",
        "headline": "Portuguese Survival Anki Deck — 344 Speaking Moves (PT-PT)",
        "exam": "Day-1 European Portuguese for life in Portugal",
        "hook": (
            "344 Say / Hear / Repair speaking moves with Google pt-PT audio — shops, clinic, "
            "housing, transport, and paperwork on day one. Not a CIPLE lemma dump."
        ),
        "audience": (
            "For newcomers and relocators who need European Portuguese they can speak on day one "
            "in Portugal — before (or instead of) full CIPLE exam prep."
        ),
        "disclaimer": "CAPLE / University of Lisbon",
        "about_heading": "What is Portuguese Survival?",
        "about": (
            "A Day-1 speaking bank for living in Portugal: each card is a real turn — Say "
            "(your line), Hear (decode theirs), or Repair (unstick the conversation). Nine "
            "scenes cover foundations through documents and social life."
        ),
        "pathways": "Everyday PT-PT · living in Portugal · pre-CIPLE survival",
        "deck_covers": (
            "344 unique speaking-move cards with English scene cues, PT-PT replies, teaching "
            "hints, and Google Cloud pt-PT pronunciation audio."
        ),
        "not_included": (
            "CIPLE / CAPLE exam breadth, official past papers, or citizenship civics — use the "
            "full CIPLE deck when you need the diploma."
        ),
        "why_anki": (
            "Day-one situations repeat. Spaced Anki keeps the same shop / clinic / housing "
            "frames ready when you open your mouth."
        ),
        "cards": "344",
        "format_note": "Anki .apkg with pt-PT audio (speaking moves)",
        "sample_captions": ["shop counter", "farmácia dosing", "wrong balcão repair"],
        "facts": [
            ("Focus", "Say · Hear · Repair"),
            ("Cards", "344 speaking moves"),
            ("Media", "Google pt-PT audio"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "delf-b2-french-anki-deck": {
        "label": "DELF DALF TCF TEF French",
        "headline": "DELF DALF TCF TEF French Anki Deck — 2100 Flashcards",
        "exam": "DELF / DALF · TCF Canada · TEF Canada · TCF ANF · TCF général · fide soft overlap",
        "hook": (
            "One French vocabulary bank for DELF / DALF diplomas, TCF/TEF Canada immigration, "
            "TCF ANF naturalization, TCF général university admission, and shared lexicon for "
            "fide / Swiss residency French."
        ),
        "audience": (
            "For French diploma, Canada Express Entry / Quebec, French naturalization, "
            "university, and fide / Swiss residency French language applicants who need "
            "high-frequency vocabulary with native audio."
        ),
        "disclaimer": "France Éducation international / IRCC / TCF-TEF / fide-SEM",
        "about_heading": "Which French exams does this cover?",
        "about": (
            "DELF and DALF are lifetime diplomas. TCF Canada and TEF Canada support Canadian "
            "immigration. TCF ANF supports French naturalization. TCF général is widely used "
            "for French university admission. The same high-frequency lexicon helps fide / Swiss "
            "residency French language prep — not Swiss civics (use the Swiss Citizenship Anki Bundle)."
        ),
        "pathways": "DELF · DALF · TCF Canada · TEF Canada · TCF ANF · TCF général · fide soft",
        "deck_covers": (
            "2,100 cards pairing each headword with a visual cue, native French audio, "
            "and a contextual example — shared core vocabulary across those exams."
        ),
        "not_included": (
            "Official TCF/TEF listening formats, writing templates, fide speaking formats, "
            "or Swiss Staatskunde civics — keep using official practice for timed skills."
        ),
        "why_anki": (
            "French certificate and immigration scores reward fast lexical access. "
            "Daily spaced recall beats cramming word lists the week before."
        ),
        "cards": "2100",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["université", "bureau", "marché"],
        "facts": [
            ("Pathways", "DELF DALF · TCF · TEF · fide soft"),
            ("Cards", "2100 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "dutch-a2-inburgering-anki-deck": {
        "label": "Dutch Inburgering NT2 A2",
        "headline": "Dutch Inburgering NT2 A2 Anki Deck — 1897 Flashcards",
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
            "1,897 high-frequency Dutch words with English glosses, bilingual examples, "
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
        "cards": "1897",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["universiteit", "kantoor", "markt"],
        "facts": [
            ("Pathways", "Inburgering · NT2 A2"),
            ("Cards", "1897 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "german-a2-anki-deck": {
        "label": "German Goethe telc ÖSD DTZ",
        "headline": "German Goethe telc ÖSD DTZ Anki Deck — 2101 Flashcards",
        "exam": "Goethe A2 · telc A2 · ÖSD A2 · DTZ · Einbürgerung language · fide soft",
        "hook": (
            "Shared German vocabulary for Goethe-Institut, telc, ÖSD certificates, "
            "DTZ immigrant integration, and soft overlap for residence / Einbürgerung "
            "language and fide / Swiss residency German."
        ),
        "audience": (
            "For A2 certificate candidates, DTZ learners, and applicants building German "
            "for residence / Einbürgerung or fide pathways — not a tourist phrase pack."
        ),
        "disclaimer": "Goethe-Institut / telc / ÖSD / BAMF / fide-SEM",
        "about_heading": "Which German A2 pathways does this cover?",
        "about": (
            "Goethe-Institut A2, telc Deutsch A2, and ÖSD Zertifikat A2 are widely recognized "
            "certificates. DTZ is the immigrant integration exam used in Germany. The same A2 "
            "lexicon supports residence / Einbürgerung language and fide / Swiss residency German. "
            "For Leben in Deutschland civics use the Citizenship & Naturalization Anki Bundle; "
            "for Swiss Staatskunde use the Swiss Citizenship Anki Bundle."
        ),
        "pathways": "Goethe A2 · telc A2 · ÖSD A2 · DTZ · Einbürgerung language · fide soft",
        "deck_covers": (
            "2,101 essential German words with meanings, examples, and media cues "
            "for certificate and immigration language pathways."
        ),
        "not_included": (
            "Official Goethe/telc/ÖSD exam papers, Leben in Deutschland civics, or Swiss "
            "Staatskunde — use this deck for lexical recall alongside official practice."
        ),
        "why_anki": (
            "A2 certificate and DTZ success depends on automatic everyday vocabulary. "
            "Spaced repetition keeps that core available under timed conditions."
        ),
        "cards": "2101",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["Universität", "Büro", "Markt"],
        "facts": [
            ("Pathways", "Goethe · telc · ÖSD · DTZ · fide soft"),
            ("Cards", "2101 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "celi-b1-italian-anki-deck": {
        "label": "CELI CILS PLIDA Italian",
        "headline": "CELI CILS PLIDA Italian Anki Deck — 2151 Flashcards",
        "exam": "CELI · CILS · PLIDA · permesso / cittadinanza language",
        "hook": (
            "Italian B1 vocabulary for CELI (Perugia), CILS (Siena), and PLIDA "
            "(Dante Alighieri) — including permesso di soggiorno and cittadinanza language overlap."
        ),
        "audience": (
            "For CELI, CILS, and PLIDA B1 candidates and applicants using B1 Italian for "
            "permesso or cittadinanza language evidence — not an Italian civics quiz."
        ),
        "disclaimer": "CELI / CILS / PLIDA exam bodies",
        "about_heading": "What are CELI, CILS, and PLIDA?",
        "about": (
            "CELI (Università per Stranieri di Perugia), CILS (Università per Stranieri di Siena), "
            "and PLIDA (Società Dante Alighieri) are the main Italian language certificates. "
            "At B1 they share a large intermediate vocabulary bank also used for permesso di "
            "soggiorno and cittadinanza language pathways (CILS B1 cittadinanza-adjacent)."
        ),
        "pathways": "CELI B1 · CILS B1 · PLIDA B1 · permesso · cittadinanza language",
        "deck_covers": (
            "2,151 Italian B1 flashcards covering the shared intermediate vocabulary "
            "and phrases across CELI, CILS, and PLIDA."
        ),
        "not_included": (
            "Official speaking exams, writing tasks, full mock certificates, or Italian "
            "civics quizzes — pair lexical drill with official practice papers."
        ),
        "why_anki": (
            "B1 certificates and immigration language checks reward automatic intermediate "
            "vocabulary. Spaced Anki keeps the shared CELI/CILS/PLIDA lexicon exam-ready."
        ),
        "cards": "2151",
        "format_note": "Anki .apkg with audio and images",
        "sample_captions": ["università", "ufficio", "mercato"],
        "facts": [
            ("Pathways", "CELI · CILS · PLIDA · cittadinanza language"),
            ("Cards", "2151 vocabulary"),
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
        "sample_captions": ["universitet", "kontor", "marked"],
        "facts": [
            ("Pathways", "PD2 · PD3 · residence"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "norwegian-a2-norskprove-anki-deck": {
        "label": "Norwegian Norskprøve Residence Citizenship",
        "headline": "Norwegian Norskprøve Residence Citizenship Anki Deck — 1487 Flashcards",
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
            "1,487 exam-specific Bokmål vocabulary cards with audio and practical "
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
        "cards": "1487",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["universitet", "kontor", "marked"],
        "facts": [
            ("Pathways", "Norskprøve · residence · citizenship"),
            ("Cards", "1487 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "dele-a2-spanish-anki-deck": {
        "label": "DELE SIELE Spanish",
        "headline": "DELE SIELE Spanish Anki Deck — 2105 Flashcards",
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
            "One .apkg with 2,105 high-frequency Spanish A2 vocabulary cards, examples, "
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
        "cards": "2105",
        "format_note": "Single Anki .apkg (language only)",
        "sample_captions": ["universidad", "oficina", "mercado"],
        "facts": [
            ("Pathways", "DELE A2 · SIELE vocabulary"),
            ("Cards", "2105 vocabulary"),
            ("Media", "Audio + images"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "dele-a2-ccse-spanish-citizenship-bundle": {
        "label": "DELE CCSE Spanish Nationality",
        "headline": "DELE CCSE Spanish Nationality Anki Deck — 60 Flashcards",
        "exam": "DELE A2-adjacent language · CCSE civics",
        "hook": (
            "Compact 60-card companion for Spanish nationality prep: DELE-adjacent language "
            "themes plus CCSE civics — not a full Cervantes substitute."
        ),
        "audience": (
            "For Spanish nationality applicants preparing DELE A2 language evidence plus "
            "CCSE civics who want a short daily Anki loop."
        ),
        "disclaimer": "Instituto Cervantes / Spanish Ministry of Justice",
        "about_heading": "What is this DELE + CCSE deck?",
        "about": (
            "Official Cervantes CCSE is 25 questions / 45 minutes / 60% pass. This deck is a "
            "compact 60-card MCQ companion covering DELE-adjacent language themes and CCSE "
            "civics. For thicker DELE / SIELE vocabulary, use the standalone 2105-card DELE deck."
        ),
        "pathways": "DELE A2 language evidence · CCSE · nacionalidad española",
        "deck_covers": (
            "60 MCQ cards mixing DELE-adjacent language themes and CCSE civics recall, "
            "paired with the free UniPrep2Go CCSE timed diagnostic."
        ),
        "not_included": (
            "Official Cervantes past papers, a full 2105-card DELE vocabulary bank, or "
            "guaranteed nationality outcomes — pair with official CCSE materials."
        ),
        "why_anki": (
            "Nationality timelines reward short daily loops. Sixty focused cards keep both "
            "language and civics topics warm between mocks."
        ),
        "cards": "60",
        "format_note": "Anki .apkg (compact nationality companion)",
        "sample_captions": ["CCSE theme", "language theme", "civics recall"],
        "facts": [
            ("Pathways", "DELE A2 · CCSE · nationality"),
            ("Cards", "60 MCQ"),
            ("Official CCSE", "25Q / 45 min / 60%"),
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
        "sample_captions": ["universitet", "kontor", "marknad"],
        "facts": [
            ("Pathways", "SFI · residence · citizenship"),
            ("Cards", "1000 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "greek-a2-ellinomatheia-anki-deck": {
        "label": "Greek Ellinomatheia Residence Citizenship",
        "headline": "Greek Ellinomatheia Residence Citizenship Anki Deck — 939 Flashcards",
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
            "939 exam-specific Greek vocabulary cards with audio and practical "
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
        "cards": "939",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["πανεπιστήμιο", "γραφείο", "αγορά"],
        "facts": [
            ("Pathways", "Ellinomatheia · residence · citizenship"),
            ("Cards", "939 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "czech-a2-cce-anki-deck": {
        "label": "Czech CCE Residence Citizenship",
        "headline": "Czech CCE Residence Citizenship Anki Deck — 945 Flashcards",
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
            "945 exam-specific Czech vocabulary cards with audio and practical "
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
        "cards": "945",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["univerzita", "kancelář", "trh"],
        "facts": [
            ("Pathways", "CCE · residence · citizenship"),
            ("Cards", "945 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "polish-a2-certyfikat-anki-deck": {
        "label": "Polish A2 Certyfikat",
        "headline": "Polish A2 Certyfikat Residence Citizenship Anki Deck — 1489 Flashcards",
        "exam": "Certyfikat języka polskiego A2 · residence · citizenship language",
        "hook": (
            "Polish vocabulary for Certyfikat języka polskiego A2 and the language side of "
            "residence and citizenship pathways in Poland."
        ),
        "audience": (
            "For Certyfikat A2 learners and applicants preparing Polish for residence or "
            "citizenship language requirements — not a Polish civics quiz."
        ),
        "disclaimer": "Certyfikat / Polish language authorities",
        "about_heading": "What is Certyfikat języka polskiego?",
        "about": (
            "Certyfikat języka polskiego as a Foreign Language is Poland's main state Polish "
            "certificate pathway. A2-level vocabulary supports everyday life and the language "
            "evidence often needed for residence and citizenship applications."
        ),
        "pathways": "Certyfikat A2 · residence · citizenship language",
        "deck_covers": (
            "1,489 high-frequency Polish vocabulary cards with audio and practical "
            "example sentences for work, housing, services, and everyday interaction."
        ),
        "not_included": (
            "Official Certyfikat past papers or Polish citizenship civics (wiedza o Polsce) — "
            "pair this deck with official practice; use the free civics readiness check for knowledge of Poland."
        ),
        "why_anki": (
            "Residence and citizenship timelines reward consistent Polish recall. "
            "Spaced Anki keeps everyday Polish available under exam pressure."
        ),
        "cards": "1489",
        "format_note": "Anki .apkg with audio and examples",
        "sample_captions": ["uniwersytet", "biuro", "rynek"],
        "facts": [
            ("Pathways", "Certyfikat · residence · citizenship language"),
            ("Cards", "1489 vocabulary"),
            ("Media", "Audio + examples"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "polish-a2-for-ukrainian-speakers-anki-deck": {
        "label": "Polish A2 for Ukrainian Speakers",
        "headline": "Polish A2 for Ukrainian Speakers Anki Deck — 1489 Flashcards",
        "exam": "Certyfikat A2 · residence language — for Ukrainian speakers",
        "hook": (
            "Polish A2 vocabulary for Ukrainian speakers preparing Certyfikat języka polskiego "
            "and residence language — Ukrainian glosses and bilingual examples on every card."
        ),
        "audience": (
            "For Ukrainian-speaking Certyfikat A2 and residence-language candidates who want "
            "Polish with Ukrainian support — not Polish citizenship civics."
        ),
        "disclaimer": "Certyfikat języka polskiego / state exam bodies",
        "about_heading": "Who is this Polish deck for?",
        "about": (
            "Ukrainian speakers preparing Certyfikat A2 and everyday Polish for residence "
            "share a large high-frequency lexicon. This deck packages that bank with Ukrainian "
            "glosses and bilingual examples. It is distinct from the English-gloss Polish "
            "Certyfikat deck and not a wiedza o Polsce civics pack."
        ),
        "pathways": "Certyfikat A2 · residence language · Ukrainian support",
        "deck_covers": (
            "1,489 Polish vocabulary cards with Ukrainian glosses, bilingual examples, "
            "native Polish audio, and illustrations."
        ),
        "not_included": (
            "Official Certyfikat papers or Polish citizenship civics — "
            "pair lexical drill with official practice."
        ),
        "why_anki": (
            "Certyfikat and residence language success depends on automatic everyday Polish. "
            "Ukrainian support speeds early comprehension while audio forces Polish recall."
        ),
        "cards": "1489",
        "format_note": "Anki .apkg with audio, images, and Ukrainian glosses",
        "sample_captions": ["uniwersytet", "biuro", "rynek"],
        "facts": [
            ("Pathways", "Certyfikat · residence language"),
            ("Cards", "1489 vocabulary"),
            ("Support", "Ukrainian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "german-a2-for-ukrainian-speakers-anki-deck": {
        "label": "German A2 for Ukrainian Speakers",
        "headline": "German A2 for Ukrainian Speakers Anki Deck — 2026 Flashcards",
        "exam": "Goethe A2 · telc A2 · ÖSD A2 · DTZ — for Ukrainian speakers",
        "hook": (
            "German A2 vocabulary for Ukrainian speakers preparing Goethe-Institut, telc, "
            "ÖSD, and DTZ — Ukrainian glosses and bilingual examples on every card."
        ),
        "audience": (
            "For Ukrainian-speaking Goethe / telc / ÖSD / DTZ candidates who want German "
            "with Ukrainian support — not a Leben in Deutschland civics quiz."
        ),
        "disclaimer": "Goethe-Institut / telc / ÖSD / BAMF",
        "about_heading": "Who is this German deck for?",
        "about": (
            "Ukrainian speakers preparing German A2 certificates and DTZ immigrant integration "
            "share a large high-frequency lexicon. This deck packages that bank with Ukrainian "
            "glosses and bilingual examples. It is distinct from the English-gloss German "
            "multi-pathway deck."
        ),
        "pathways": "Goethe A2 · telc A2 · ÖSD A2 · DTZ · Ukrainian support",
        "deck_covers": (
            "2,026 German vocabulary cards with Ukrainian glosses, bilingual examples, "
            "native German audio, and illustrations."
        ),
        "not_included": (
            "Official Goethe/telc/ÖSD exam papers or Leben in Deutschland civics — "
            "pair lexical drill with official practice."
        ),
        "why_anki": (
            "A2 certificate and DTZ success depends on automatic everyday German. "
            "Ukrainian support speeds early comprehension while audio forces German recall."
        ),
        "cards": "2026",
        "format_note": "Anki .apkg with audio, images, and Ukrainian glosses",
        "sample_captions": ["Universität", "Büro", "Markt"],
        "facts": [
            ("Pathways", "Goethe · telc · ÖSD · DTZ"),
            ("Cards", "2026 vocabulary"),
            ("Support", "Ukrainian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "german-a2-for-russian-speakers-anki-deck": {
        "label": "German A2 for Russian Speakers",
        "headline": "German A2 for Russian Speakers Anki Deck — 2026 Flashcards",
        "exam": "Goethe A2 · telc A2 · ÖSD A2 · DTZ — for Russian speakers",
        "hook": (
            "German A2 vocabulary for Russian speakers preparing Goethe-Institut, telc, "
            "ÖSD, and DTZ — Russian glosses and bilingual examples on every card."
        ),
        "audience": (
            "For Russian-speaking Goethe / telc / ÖSD / DTZ candidates who want German "
            "with Russian support — not a Leben in Deutschland civics quiz."
        ),
        "disclaimer": "Goethe-Institut / telc / ÖSD / BAMF",
        "about_heading": "Who is this German deck for?",
        "about": (
            "Russian speakers preparing German A2 certificates and DTZ immigrant integration "
            "share a large high-frequency lexicon. This deck packages that bank with Russian "
            "glosses and bilingual examples. It is distinct from the English-gloss German "
            "multi-pathway deck and the Ukrainian-support edition."
        ),
        "pathways": "Goethe A2 · telc A2 · ÖSD A2 · DTZ · Russian support",
        "deck_covers": (
            "2,026 German vocabulary cards with Russian glosses, bilingual examples, "
            "native German audio, and illustrations."
        ),
        "not_included": (
            "Official Goethe/telc/ÖSD exam papers or Leben in Deutschland civics — "
            "pair lexical drill with official practice."
        ),
        "why_anki": (
            "A2 certificate and DTZ success depends on automatic everyday German. "
            "Russian support speeds early comprehension while audio forces German recall."
        ),
        "cards": "2026",
        "format_note": "Anki .apkg with audio, images, and Russian glosses",
        "sample_captions": ["Universität", "Büro", "Markt"],
        "facts": [
            ("Pathways", "Goethe · telc · ÖSD · DTZ"),
            ("Cards", "2026 vocabulary"),
            ("Support", "Russian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-french-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for French Speakers",
        "headline": "IELTS / TOEFL English for French Speakers Anki Deck — 2482 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for French speakers",
        "hook": (
            "2,482 high-frequency English vocabulary cards with French glosses, bilingual "
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
            "2,482 English cards from the Prep2Go app with French glosses, bilingual examples, "
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
        "cards": "2482",
        "format_note": "Anki .apkg with audio, images, and French support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2482 vocabulary"),
            ("Media", "Audio + French glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-arabic-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Arabic Speakers",
        "headline": "IELTS / TOEFL English for Arabic Speakers Anki Deck — 2482 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Arabic speakers",
        "hook": (
            "2,482 high-frequency English vocabulary cards with Arabic glosses, bilingual "
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
            "2,482 English cards from the Prep2Go app with Arabic glosses, bilingual examples, "
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
        "cards": "2482",
        "format_note": "Anki .apkg with audio, images, and Arabic support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2482 vocabulary"),
            ("Media", "Audio + Arabic glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-ukrainian-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Ukrainian Speakers",
        "headline": "IELTS / TOEFL English for Ukrainian Speakers Anki Deck — 2482 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Ukrainian speakers",
        "hook": (
            "2,482 high-frequency English vocabulary cards with Ukrainian glosses, bilingual "
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
            "2,482 English cards from the Prep2Go app with Ukrainian glosses, bilingual examples, "
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
        "cards": "2482",
        "format_note": "Anki .apkg with audio, images, and Ukrainian support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2482 vocabulary"),
            ("Media", "Audio + Ukrainian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-russian-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Russian Speakers",
        "headline": "IELTS / TOEFL English for Russian Speakers Anki Deck — 2482 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Russian speakers",
        "hook": (
            "2,482 high-frequency English vocabulary cards with Russian glosses, bilingual "
            "examples, and native English audio — built for Russian speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For Russian-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need daily "
            "English recall with native-language support — not tourist phrase lists."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for Russian "
            "speakers: English headword, Russian gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for Russian speakers",
        "deck_covers": (
            "2,482 English cards from the Prep2Go app with Russian glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(Russian as a check) beats translating every sentence under time pressure."
        ),
        "cards": "2482",
        "format_note": "Anki .apkg with audio, images, and Russian support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2482 vocabulary"),
            ("Media", "Audio + Russian glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-spanish-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Spanish Speakers (LatAm)",
        "headline": "IELTS / TOEFL English for Spanish Speakers Anki Deck — 2482 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Spanish speakers (LatAm)",
        "hook": (
            "2,482 high-frequency English vocabulary cards with Latin American Spanish glosses, "
            "bilingual examples, and native English audio — built for LatAm Spanish speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For Latin American Spanish-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need "
            "daily English recall with native-language support — not tourist phrase lists or DELE Spanish prep."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for LatAm Spanish "
            "speakers: English headword, Spanish gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for Spanish speakers (LatAm)",
        "deck_covers": (
            "2,482 English cards from the Prep2Go app with LatAm Spanish glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, DELE Spanish vocab, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(Spanish as a check) beats translating every sentence under time pressure."
        ),
        "cards": "2482",
        "format_note": "Anki .apkg with audio, images, and LatAm Spanish support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2482 vocabulary"),
            ("Media", "Audio + LatAm Spanish glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-portuguese-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Portuguese Speakers (BR)",
        "headline": "IELTS / TOEFL English for Portuguese Speakers Anki Deck — 2482 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Brazilian Portuguese speakers",
        "hook": (
            "2,482 high-frequency English vocabulary cards with Brazilian Portuguese glosses, "
            "bilingual examples, and native English audio — built for PT-BR speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For Brazilian Portuguese-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need "
            "daily English recall with native-language support — not tourist phrase lists or CIPLE European Portuguese prep."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for Brazilian Portuguese "
            "speakers: English headword, PT-BR gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for Portuguese speakers (BR)",
        "deck_covers": (
            "2,482 English cards from the Prep2Go app with Brazilian Portuguese glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, CIPLE European Portuguese vocab, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(Brazilian Portuguese as a check) beats translating every sentence under time pressure."
        ),
        "cards": "2482",
        "format_note": "Anki .apkg with audio, images, and Brazilian Portuguese support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "2482 vocabulary"),
            ("Media", "Audio + PT-BR glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },
    "ielts-toefl-english-for-turkish-speakers-anki-deck": {
        "label": "IELTS / TOEFL English for Turkish Speakers",
        "headline": "IELTS / TOEFL English for Turkish Speakers Anki Deck — 924 Flashcards",
        "exam": "IELTS · TOEFL · Cambridge · PTE — for Turkish speakers",
        "hook": (
            "924 high-frequency English vocabulary cards with Turkish glosses, bilingual "
            "examples, and native English audio — built for Turkish speakers preparing IELTS and TOEFL."
        ),
        "audience": (
            "For Turkish-speaking IELTS, TOEFL, Cambridge, and PTE candidates who need daily "
            "English recall with native-language support — not tourist phrase lists."
        ),
        "disclaimer": "IELTS / TOEFL / Cambridge / PTE bodies",
        "about_heading": "Which English exams does this cover?",
        "about": (
            "IELTS, TOEFL, Cambridge English exams, and PTE share a large high-frequency "
            "academic and general English lexicon. This deck packages that bank for Turkish "
            "speakers: English headword, Turkish gloss, bilingual example, and English audio."
        ),
        "pathways": "IELTS · TOEFL · Cambridge · PTE · English for Turkish speakers",
        "deck_covers": (
            "924 English cards from the Prep2Go app with Turkish glosses, bilingual examples, "
            "native English audio, and illustrations."
        ),
        "not_included": (
            "Official IELTS/TOEFL practice tests, writing scorers, or speaking partners — "
            "pair Anki with timed official practice for each exam format."
        ),
        "why_anki": (
            "Exam sittings punish slow retrieval. Spaced Anki with English-first recall "
            "(Turkish as a check) beats translating every sentence under time pressure."
        ),
        "cards": "924",
        "format_note": "Anki .apkg with audio, images, and Turkish support",
        "sample_captions": ["university", "interview", "station"],
        "facts": [
            ("Pathways", "IELTS · TOEFL · Cambridge · PTE"),
            ("Cards", "924 vocabulary"),
            ("Media", "Audio + Turkish glosses"),
            ("Delivery", "Instant .apkg"),
        ],
    },

}

# Overlay for-X-speakers SPECS with support-language copy (source of truth).
_FOR_X_I18N = ROOT / "src/data/gumroad/for-x-speakers-i18n.json"
_FOR_X_CONTENT_KEYS = (
    "lang",
    "label",
    "headline",
    "exam",
    "hook",
    "audience",
    "disclaimer",
    "about_heading",
    "about",
    "pathways",
    "deck_covers",
    "not_included",
    "why_anki",
    "cards",
    "format_note",
    "sample_captions",
    "facts",
)
if _FOR_X_I18N.exists():
    for _slug, _patch in json.loads(_FOR_X_I18N.read_text(encoding="utf-8")).items():
        if _slug not in SPECS:
            continue
        for _key in _FOR_X_CONTENT_KEYS:
            if _key not in _patch:
                continue
            _val = _patch[_key]
            if _key == "facts":
                _val = [tuple(x) if not isinstance(x, tuple) else x for x in _val]
            SPECS[_slug][_key] = _val


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
    lang = str(spec.get("lang") or "en")
    ui = {**UI_BY_LANG["en"], **UI_BY_LANG.get(lang, {})}
    dir_attr = ' dir="rtl"' if lang == "ar" else ""
    deck_url = f"https://uniprep2go.study/decks/{slug}"
    prep2go_paths = {
        "ciple-a2-european-portuguese-anki-deck": "/shop/ciple-a2-anki-deck",
        "ciple-a2-for-russian-speakers-anki-deck": "/shop/ciple-a2-anki-deck",
        "delf-b2-french-anki-deck": "/shop/delf-a2-anki-deck",
        "dutch-a2-inburgering-anki-deck": "/shop/deck/inburgering-a2-anki-deck",
        "german-a2-anki-deck": "/shop/deck/goethe-telc-osd-anki-deck",
        "german-a2-for-russian-speakers-anki-deck": "/shop/deck/goethe-telc-osd-anki-deck",
        "german-a2-for-ukrainian-speakers-anki-deck": "/shop/deck/goethe-telc-osd-anki-deck",
        "celi-b1-italian-anki-deck": "/shop/celi-a2-anki-deck",
        "danish-a2-prove-i-dansk-anki-deck": "/shop/deck/danish-prove-i-dansk-anki-deck",
        "norwegian-a2-norskprove-anki-deck": "/shop/deck/norwegian-norskprove-anki-deck",
        "swedish-a2-sfi-anki-deck": "/shop/deck/swedish-sfi-anki-deck",
        "greek-a2-ellinomatheia-anki-deck": "/shop/deck/greek-ellinomatheia-anki-deck",
        "czech-a2-cce-anki-deck": "/shop/deck/czech-cce-anki-deck",
        "dele-a2-spanish-anki-deck": "/shop/dele-a2-anki-deck",
        "dele-a2-ccse-spanish-citizenship-bundle": "/shop/dele-a2-anki-deck",
        "polish-a2-for-ukrainian-speakers-anki-deck": "/shop/deck/polish-a2-for-ukrainian-speakers-anki-deck",
        "ielts-toefl-english-for-french-speakers-anki-deck": "/shop/deck/english-for-french-speakers-anki-deck",
        "ielts-toefl-english-for-arabic-speakers-anki-deck": "/shop/deck/english-for-arabic-speakers-anki-deck",
        "ielts-toefl-english-for-ukrainian-speakers-anki-deck": "/shop/deck/english-for-ukrainian-speakers-anki-deck",
        "ielts-toefl-english-for-russian-speakers-anki-deck": "/shop/deck/english-for-russian-speakers-anki-deck",
        "ielts-toefl-english-for-spanish-speakers-anki-deck": "/shop/deck/english-for-spanish-speakers-anki-deck",
        "ielts-toefl-english-for-portuguese-speakers-anki-deck": "/shop/deck/english-for-portuguese-speakers-anki-deck",
        "ielts-toefl-english-for-turkish-speakers-anki-deck": "/shop/deck/english-for-turkish-speakers-anki-deck",
    }
    prep2go_url = (
        f"https://www.prep2go.study{prep2go_paths[slug]}" if slug in prep2go_paths else None
    )
    prep2go_cta = (
        f'<a href="{e(prep2go_url)}" class="btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener">{e(ui["view_prep2go"])}</a>'
        if prep2go_url
        else ""
    )
    prep2go_footer = (
        f'<a href="{e(prep2go_url)}" class="underline" rel="noopener">Prep2Go</a>'
        if prep2go_url
        else ""
    )
    seo_title = f"{headline} | PixID Studio"
    meta = ui["meta"].format(cards=spec["cards"], exam=exam, disclaimer=disclaimer)

    benefits = [
        ui["benefit_built"].format(exam=exam),
        ui["benefit_cards"].format(cards=spec["cards"], format=spec["format_note"]),
        ui["benefit_fields"],
        ui["benefit_pathways"],
        ui["benefit_delivery"],
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
        f'<p class="mt-4 text-sm text-muted">{e(ui["official_note"].format(disclaimer=disclaimer))}</p>'
    )

    exam_section = f"""
    <section id="exam" class="mt-12" aria-labelledby="exam-heading">
      <p class="label-mono">{e(ui["exams_label"])}</p>
      <h2 id="exam-heading" class="mt-2 text-2xl font-semibold tracking-tight">{e(spec["about_heading"])}</h2>
      <p class="mt-4 text-base leading-7 text-muted">{e(spec["about"])}</p>
      <dl class="mt-6 grid gap-3 sm:grid-cols-2">{facts_html}</dl>
      <div class="mt-6 theme-card rounded-3xl p-6 sm:p-8 space-y-4 text-sm sm:text-base leading-7 text-muted">
        <p><strong class="text-[var(--fg)]">{e(ui["pathways"])}</strong> {e(spec["pathways"])}</p>
        <p><strong class="text-[var(--fg)]">{e(ui["covers"])}</strong> {e(spec["deck_covers"])}</p>
        <p><strong class="text-[var(--fg)]">{e(ui["not_included"])}</strong> {e(spec["not_included"])}</p>
        <p><strong class="text-[var(--fg)]">{e(ui["why_anki"])}</strong> {e(spec["why_anki"])}</p>
      </div>
      {official_note}
    </section>
"""

    cover_block = ""
    if cover_url:
        cover_block = (
            f'<figure class="overflow-hidden rounded-3xl theme-card shadow-lg">'
            f'<img src="{e(cover_url)}" alt="{e(label)}" '
            f'class="w-full h-auto object-cover" loading="eager"></figure>'
        )

    captions = list(spec.get("sample_captions") or [])
    sample_figures = []
    for i, url in enumerate(sample_urls, 1):
        caption = captions[i - 1] if i - 1 < len(captions) else str(i)
        sample_figures.append(
            f"""        <figure class="theme-card overflow-hidden rounded-3xl shadow-sm">
          <img src="{e(url)}" alt="{e(label)} {i}" class="w-full h-auto object-contain" loading="lazy">
          <figcaption class="px-4 py-3 text-xs text-muted">{e(caption)}</figcaption>
        </figure>"""
        )
    samples_section = ""
    if sample_figures:
        samples_section = f"""
    <section id="samples" class="mt-12" aria-labelledby="samples-heading">
      <h2 id="samples-heading" class="text-2xl font-semibold tracking-tight">{e(ui["samples_h"])}</h2>
      <p class="mt-2 text-sm text-muted">{e(ui["samples_p"])}</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-3">
{chr(10).join(sample_figures)}
      </div>
    </section>
"""

    faq_items = [
        (
            ui["faq_exams"],
            f'{e(spec["about"])}<br><br><strong>{e(ui["pathways"])}</strong> {e(spec["pathways"])}',
        ),
        (ui["faq_who"], e(spec["audience"])),
        (
            ui["faq_cover"],
            f'<strong>{e(ui["faq_covers"])}</strong> {e(spec["deck_covers"])}<br><strong>{e(ui["faq_missing"])}</strong> {e(spec["not_included"])}',
        ),
        (
            ui["faq_download"],
            e(ui["faq_download_a"].format(cards=spec["cards"], format=spec["format_note"])),
        ),
        (ui["faq_import"], e(ui["faq_import_a"])),
        (
            ui["faq_official"],
            e(ui["faq_official_a"].format(disclaimer=disclaimer)),
        ),
        (ui["faq_pass"], e(ui["faq_pass_a"])),
        (ui["faq_refund"], e(ui["faq_refund_a"])),
    ]
    faq_html = "".join(
        f'<details class="theme-card rounded-2xl p-5 group"><summary class="font-semibold cursor-pointer list-none flex justify-between gap-4 items-start">{e(q)}'
        f'<span class="text-accent shrink-0 group-open:rotate-45 transition-transform text-xl">+</span></summary>'
        f'<p class="text-muted text-sm mt-3 leading-relaxed">{a}</p></details>'
        for q, a in faq_items
    )

    sold_line = (
        f'{e(ui["sold_by"].format(exam=exam, format=spec["format_note"]))} '
        f'<span data-gumroad-field="price">{e(price)}</span>. {e(ui["not_official"].format(disclaimer=disclaimer))}'
    )

    return f"""<!DOCTYPE html>
<html lang="{e(lang)}"{dir_attr}>
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
      <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy rounded-full px-5 py-2.5 text-sm font-semibold" rel="noopener noreferrer">{e(ui["buy"])} <span data-gumroad-field="price">{e(price)}</span></a>
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-6 py-10">
    <p class="label-mono">{e(ui["prep_for"].format(exam=exam))}</p>
    <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight" data-gumroad-field="name">{e(headline)}</h1>

    <div class="mt-8 grid lg:grid-cols-2 gap-8 items-start">
      <div class="space-y-4">
        <p class="text-lg sm:text-xl leading-8">{e(spec["hook"])}</p>
        <p class="text-base leading-7 text-muted">{e(spec["audience"])}</p>
        <ul class="space-y-3 text-sm sm:text-base">
          {benefits_html}
        </ul>
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap pt-2">
          <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener noreferrer">{e(ui["get_access"])} <span data-gumroad-field="price">{e(price)}</span></a>
          {prep2go_cta}
          <a href="{e(deck_url)}" class="btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold" rel="noopener">{e(ui["view_uniprep"])}</a>
        </div>
        <p class="text-sm leading-7 text-muted">{sold_line}</p>
      </div>
      {cover_block}
    </div>
{exam_section}
    <section class="mt-12" aria-labelledby="facts-heading">
      <h2 id="facts-heading" class="text-2xl font-semibold tracking-tight">{e(ui["glance_h"])}</h2>
      <dl class="mt-4 grid gap-3 sm:grid-cols-2">
        <div class="theme-card px-5 py-4"><dt class="label-mono">{e(ui["cards_label"])}</dt><dd class="mt-2 font-medium">{e(spec["cards"])} {e(ui["flashcards"])}</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">{e(ui["file_label"])}</dt><dd class="mt-2 font-medium">{e(spec["format_note"])}</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">{e(ui["pathways_label"])}</dt><dd class="mt-2 font-medium">{e(spec["pathways"])}</dd></div>
        <div class="theme-card px-5 py-4"><dt class="label-mono">{e(ui["delivery_label"])}</dt><dd class="mt-2 font-medium">{e(ui["delivery_value"])}</dd></div>
      </dl>
    </section>
{samples_section}
    <section id="faq" class="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" class="text-2xl font-semibold tracking-tight">{e(ui["faq_h"])}</h2>
      <div class="mt-4 space-y-3">
        {faq_html}
      </div>
    </section>

    <section class="mt-12 mb-6" aria-labelledby="pricing-heading">
      <div class="theme-card rounded-3xl p-8 sm:p-10 text-center">
        <h2 id="pricing-heading" class="text-2xl font-semibold">{e(ui["ready_h"])}</h2>
        <p class="mt-3 text-muted max-w-lg mx-auto text-sm leading-relaxed">{e(ui["ready_p"])}</p>
        <p class="mt-2 text-4xl font-semibold"><span data-gumroad-field="price">{e(price)}</span></p>
        <p class="hidden" data-gumroad-field="description" aria-hidden="true">{e(meta)}</p>
        <a href="{e(checkout)}" data-gumroad-action="buy" class="btn-buy mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold" rel="noopener noreferrer">{e(ui["want_this"])}</a>
        <p class="mt-4 text-xs text-muted">{e(ui["footer_legal"].format(disclaimer=disclaimer))}</p>
      </div>
    </section>
  </main>

  <footer class="border-t py-6" style="border-color:var(--border)">
    <div class="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-muted">
      <p>PixID Studio · Prep2Go · UniPrep2Go</p>
      <span class="flex flex-wrap gap-3 justify-center">
        {prep2go_footer}
        <a href="{e(deck_url)}" class="underline" rel="noopener">UniPrep2Go</a>
      </span>
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
