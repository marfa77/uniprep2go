import { HETZNER_AS24940_PREFIXES } from "./hetzner-as24940";

type V4Prefix = { base: number; mask: number };
type V6Prefix = { base: bigint; mask: bigint };

const v4Prefixes: V4Prefix[] = [];
const v6Prefixes: V6Prefix[] = [];

for (const prefix of HETZNER_AS24940_PREFIXES) {
  if (prefix.includes(":")) {
    const parsed = parseV6Prefix(prefix);
    if (parsed) v6Prefixes.push(parsed);
  } else {
    const parsed = parseV4Prefix(prefix);
    if (parsed) v4Prefixes.push(parsed);
  }
}

/** True when the IP is inside Hetzner AS24940. Residential and mobile ranges are not in this list. */
export function isHetznerIp(ip: string | null | undefined) {
  const value = ip?.trim();
  if (!value) return false;

  const v4 = ipv4ToInt(value);
  if (v4 !== null) {
    return v4Prefixes.some((prefix) => (v4 & prefix.mask) === (prefix.base & prefix.mask));
  }

  const v6 = ipv6ToBig(value);
  if (v6 === null) return false;
  return v6Prefixes.some((prefix) => (v6 & prefix.mask) === (prefix.base & prefix.mask));
}

function parseV4Prefix(cidr: string): V4Prefix | null {
  const [baseText, bitsText] = cidr.split("/");
  const base = ipv4ToInt(baseText ?? "");
  const bits = Number(bitsText);
  if (base === null || !Number.isInteger(bits) || bits < 0 || bits > 32) return null;
  const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  return { base, mask };
}

function parseV6Prefix(cidr: string): V6Prefix | null {
  const [baseText, bitsText] = cidr.split("/");
  const base = ipv6ToBig(baseText ?? "");
  const bits = Number(bitsText);
  if (base === null || !Number.isInteger(bits) || bits < 0 || bits > 128) return null;
  const one = BigInt(1);
  const mask =
    bits === 0
      ? BigInt(0)
      : ((one << BigInt(128)) - one) ^ ((one << BigInt(128 - bits)) - one);
  return { base, mask };
}

function ipv4ToInt(ip: string) {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    value = (value << 8) + octet;
  }
  return value >>> 0;
}

function ipv6ToBig(ip: string) {
  let text = ip.trim().toLowerCase();
  if (text.startsWith("[") && text.endsWith("]")) text = text.slice(1, -1);
  const zone = text.indexOf("%");
  if (zone >= 0) text = text.slice(0, zone);
  if (text.includes(".")) return null;

  const halves = text.split("::");
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(":") : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  if (halves.length === 1 && left.length !== 8) return null;
  const missing = 8 - left.length - right.length;
  if (halves.length === 2 && missing < 0) return null;
  const groups = halves.length === 2 ? [...left, ...Array(missing).fill("0"), ...right] : left;
  if (groups.length !== 8) return null;

  let value = BigInt(0);
  const shift = BigInt(16);
  for (const group of groups) {
    if (!/^[0-9a-f]{1,4}$/.test(group)) return null;
    value = (value << shift) + BigInt(Number.parseInt(group, 16));
  }
  return value;
}
