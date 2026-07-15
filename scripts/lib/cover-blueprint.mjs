/**
 * UniPrep2Go cover composer v2 — editorial product cards (ServSafe layout, no wireframes).
 * Left: cream copy panel. Right: navy panel with large exam monogram + flashcard motif.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

export const COVER_WIDTH = 1005;
export const COVER_HEIGHT = 561;
export const HERO_WIDTH = 1200;
export const HERO_HEIGHT = 630;

const COLORS = {
  cream: "#f7f3ea",
  paper: "#fffaf0",
  navy: "#1f3a5f",
  navyDeep: "#152238",
  ink: "#18140f",
  muted: "#5a6578",
  amber: "#c8922a",
  white: "#fffaf0",
};

const PANEL_SPLIT = 0.57;

const LOGO_SVG = readFileSync(join(root, "public/brand/uniprep2go-mark.svg"), "utf8")
  .replace(/<\?xml.*?\?>/, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "");

/** @type {Record<string, { bg: string; fg: string }>} */
const PANEL_THEMES = {
  finance: { bg: "#1f3a5f", fg: "#fffaf0" },
  building: { bg: "#234a52", fg: "#fffaf0" },
  hvac: { bg: "#1f3a5f", fg: "#fffaf0" },
  safety: { bg: "#3d4f3a", fg: "#fffaf0" },
  language: { bg: "#4a3d52", fg: "#fffaf0" },
  study: { bg: "#1f3a5f", fg: "#fffaf0" },
  hero: { bg: "#152238", fg: "#fffaf0" },
};

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function wrapLines(text, maxChars = 16) {
  return text
    .split("\n")
    .flatMap((line) => {
      const words = line.trim().split(/\s+/);
      const lines = [];
      let current = "";
      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxChars && current) {
          lines.push(current);
          current = word;
        } else {
          current = next;
        }
      }
      if (current) lines.push(current);
      return lines;
    })
    .slice(0, 3);
}

export function simplifyCoverTitle(title) {
  return title
    .replace(/\s*—\s*\d[\d+]*.*$/i, "")
    .replace(/\s*–\s*\d[\d+]*.*$/i, "")
    .replace(/\s+Anki Deck$/i, "")
    .replace(/\s+Printable PDF$/i, "")
    .trim();
}

export function simplifyCoverSubtitle(subtitle) {
  return subtitle
    .replace(/^A (concise|focused|planned|printable) /i, "")
    .replace(/\.$/, "")
    .slice(0, 72);
}

export function inferMonogram(title, monogram) {
  if (monogram) return monogram.slice(0, 12);
  const cleaned = simplifyCoverTitle(title);
  const known = [
    ["CFA Level 2", "CFA L2"],
    ["CFA Level 1", "CFA L1"],
    ["Series 63", "S63"],
    ["Series 7", "S7"],
    ["ServSafe", "ServSafe"],
    ["Property", "P&C"],
    ["Life and Health", "L&H"],
    ["California Real Estate", "CA RE"],
    ["EPA 608", "608"],
    ["LEED AP", "BD+C"],
    ["LEED Green", "LEED GA"],
    ["MRICS Quantity", "MRICS QS"],
    ["GMAT Focus", "GMAT"],
    ["PTCB", "PTCB"],
  ];
  for (const [needle, code] of known) {
    if (cleaned.includes(needle)) return code;
  }
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 10);
  if (words.length === 2) return `${words[0]}\n${words[1]}`.slice(0, 14);
  return words
    .slice(0, 2)
    .map((w) => w.slice(0, 4))
    .join(" ");
}

function flashcardStack(x, y, color, opacity = 0.35) {
  return `
    <rect x="${x}" y="${y + 18}" width="88" height="58" rx="6" fill="${color}" opacity="${opacity}"/>
    <rect x="${x + 10}" y="${y + 9}" width="88" height="58" rx="6" fill="${color}" opacity="${opacity + 0.08}"/>
    <rect x="${x + 20}" y="${y}" width="88" height="58" rx="6" fill="none" stroke="${color}" stroke-width="2" opacity="${opacity + 0.25}"/>
    <line x1="${x + 34}" y1="${y + 18}" x2="${x + 94}" y2="${y + 18}" stroke="${color}" stroke-width="1.5" opacity="${opacity + 0.2}"/>
    <line x1="${x + 34}" y1="${y + 30}" x2="${x + 82}" y2="${y + 30}" stroke="${color}" stroke-width="1.5" opacity="${opacity + 0.15}"/>
    <line x1="${x + 34}" y1="${y + 42}" x2="${x + 88}" y2="${y + 42}" stroke="${color}" stroke-width="1.5" opacity="${opacity + 0.15}"/>`;
}

function buildRightPanel({ panelLeft, width, height, panelKind, monogram, badge }) {
  const panelWidth = width - panelLeft;
  const theme = PANEL_THEMES[panelKind] ?? PANEL_THEMES.study;
  const cx = panelLeft + panelWidth / 2;
  const cy = height / 2;
  const monoLines = monogram.split("\n");
  const monoSize = monoLines.length > 1 ? 54 : monoLines[0].length > 8 ? 46 : 64;

  const monoTspans = monoLines
    .map(
      (line, index) =>
        `<tspan x="${cx}" dy="${index === 0 ? 0 : monoSize * 0.92}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  const heroStats =
    panelKind === "hero"
      ? `
      <text x="${cx}" y="${cy + 92}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="15" fill="${theme.fg}" opacity="0.72">Timed mocks · topic scoring · linked decks</text>`
      : "";

  return `
    <defs>
      <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bg}"/>
        <stop offset="100%" stop-color="${COLORS.navyDeep}"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="42%" r="55%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.14"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect x="${panelLeft}" y="0" width="${panelWidth}" height="${height}" fill="url(#panelGrad)"/>
    <rect x="${panelLeft}" y="0" width="${panelWidth}" height="${height}" fill="url(#glow)"/>
    <circle cx="${panelLeft + panelWidth * 0.82}" cy="${height * 0.18}" r="120" fill="#ffffff" opacity="0.04"/>
    ${flashcardStack(panelLeft + panelWidth * 0.12, height * 0.58, theme.fg, 0.22)}
    <text x="${cx}" y="${cy - (monoLines.length > 1 ? 12 : 0)}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${monoSize}" font-weight="700" letter-spacing="0.04em" fill="${theme.fg}">${monoTspans}</text>
    ${heroStats}
    <text x="${panelLeft + panelWidth - 28}" y="${height - 24}" text-anchor="end" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="11" font-weight="600" letter-spacing="0.14em" fill="${theme.fg}" opacity="0.55">${escapeXml((badge ?? "ANKI DECK").toUpperCase())}</text>`;
}

function buildBadgeSvg(badge, x, y) {
  const label = escapeXml(badge);
  const width = Math.max(88, label.length * 6.5 + 24);
  return `
    <rect x="${x}" y="${y}" width="${width}" height="26" rx="13" fill="${COLORS.navy}"/>
    <text x="${x + width / 2}" y="${y + 17}" text-anchor="middle" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="10" font-weight="600" letter-spacing="0.14em" fill="${COLORS.white}">${label.toUpperCase()}</text>`;
}

function buildLeftPanel({ width, height, panelLeft, title, subtitle, badge }) {
  const displayTitle = simplifyCoverTitle(title);
  const displaySubtitle = simplifyCoverSubtitle(subtitle);
  const titleLines = wrapLines(displayTitle, width >= HERO_WIDTH ? 18 : 15);
  const titleSize = width >= HERO_WIDTH ? 48 : 42;
  const titleLineHeight = Math.round(titleSize * 1.14);
  const titleStartY = badge ? 168 : 150;

  const titleTspans = titleLines
    .map(
      (line, index) =>
        `<tspan x="52" dy="${index === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  const subtitleLines = wrapLines(displaySubtitle, 34).slice(0, 2);
  const subtitleStartY = titleStartY + titleLines.length * titleLineHeight + 22;
  const subtitleTspans = subtitleLines
    .map(
      (line, index) =>
        `<tspan x="52" dy="${index === 0 ? 0 : 26}">${escapeXml(line)}</tspan>`,
    )
    .join("");

  return `
    <rect width="${panelLeft}" height="${height}" fill="${COLORS.cream}"/>
    <rect x="52" y="${height - 10}" width="${Math.min(panelLeft - 104, 220)}" height="4" rx="2" fill="${COLORS.amber}"/>
    <g transform="translate(44, 34) scale(0.98)">${LOGO_SVG}</g>
    ${badge ? buildBadgeSvg(badge, 52, 72) : ""}
    <text x="52" y="${titleStartY}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${titleSize}" font-weight="700" fill="${COLORS.ink}">${titleTspans}</text>
    <text x="52" y="${subtitleStartY}" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" font-weight="400" fill="${COLORS.muted}">${subtitleTspans}</text>`;
}

export function buildCoverSvg({
  width = COVER_WIDTH,
  height = COVER_HEIGHT,
  title,
  subtitle,
  badge = "Anki Deck",
  panelKind = "study",
  monogram,
  panelLeft = Math.round(width * PANEL_SPLIT),
}) {
  const code = inferMonogram(title, monogram);

  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${COLORS.paper}"/>
      ${buildLeftPanel({ width, height, panelLeft, title, subtitle, badge })}
      ${buildRightPanel({ panelLeft, width, height, panelKind, monogram: code, badge })}
    </svg>`,
  );
}

export async function renderCoverWebp(svgBuffer, { maxBytes = 80 * 1024 } = {}) {
  let quality = 86;
  let buffer = await sharp(svgBuffer).webp({ quality, effort: 6 }).toBuffer();

  while (quality >= 58 && buffer.length > maxBytes) {
    quality -= 4;
    buffer = await sharp(svgBuffer).webp({ quality, effort: 6 }).toBuffer();
  }

  return { buffer, quality, bytes: buffer.length };
}

export async function writeCoverWebp(outPath, options) {
  const svg = buildCoverSvg(options);
  const { buffer, quality, bytes } = await renderCoverWebp(svg, {
    maxBytes: options.maxBytes,
  });
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, buffer);
  return { outPath, quality, bytes };
}
