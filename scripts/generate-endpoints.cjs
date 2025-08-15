/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');

const ROOT = process.cwd();
const GEN_DIR = path.join(ROOT, 'lib/api/gen/server');
const OUT_DIR = path.join(ROOT, 'lib/api/enums');
const OUT_FILE = path.join(OUT_DIR, 'endpoint.enum.ts');

const API_BASE_URL = process.env.API_BASE_URL || '';
if (!API_BASE_URL) {
  console.error('[endpoints] API_BASE_URL is required');
  process.exit(1);
}
const basePath = new URL(API_BASE_URL).pathname.replace(/\/+$/, ''); // e.g. '/v2'

const isOpFile = (f) =>
  f.endsWith('.ts') &&
  f !== 'index.ts' &&
  !f.endsWith('.schemas.ts') &&
  !f.endsWith('.msw.ts');

const pascal = (s) =>
  s
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join('');

// grab absolute URLs inside `getXxxUrl` bodies
function extractAbsUrls(src) {
  const hits = new Set();
  for (const m of src.matchAll(/`https?:\/\/[^`]+`/g))
    hits.add(m[0].slice(1, -1));
  for (const m of src.matchAll(/['"]https?:\/\/[^'""]+['"]/g))
    hits.add(m[0].slice(1, -1));
  return [...hits];
}

function toRelative(absUrl) {
  const u = new URL(absUrl);
  let rel = u.pathname; // e.g. '/v2/pet/${petId}/uploadImage'
  if (basePath && rel.startsWith(basePath)) rel = rel.slice(basePath.length);
  return rel.replace(/^\/+/, ''); // 'pet/${petId}/uploadImage'
}

function truncateAtParamSegment(relPath) {
  // split and keep segments until the first param segment
  const segs = relPath.split('/').filter(Boolean);
  const isParamSeg = (s) =>
    s.includes('${') || s.includes('{') || /%7B/i.test(s); // handles `${id}`, `{id}`, encoded
  const cut = segs.findIndex(isParamSeg);
  const kept = cut === -1 ? segs : segs.slice(0, cut);
  // if everything would be dropped (rare), keep the first segment (service)
  return kept.length ? kept.join('/') : segs[0] || '';
}

(async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const services = (await fs.readdir(GEN_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const relSet = new Set(); // final relative endpoints

  for (const svc of services) {
    const svcDir = path.join(GEN_DIR, svc);
    const files = (await fs.readdir(svcDir)).filter(isOpFile);
    for (const file of files) {
      const src = await fs.readFile(path.join(svcDir, file), 'utf8');
      const absList = extractAbsUrls(src);
      for (const abs of absList) {
        const rel = toRelative(abs);
        if (!rel.startsWith(`${svc}/`) && rel !== svc) continue; // keep this service only
        const truncated = truncateAtParamSegment(rel);
        if (truncated) relSet.add(truncated);
      }
    }
  }

  const uniq = [...relSet].sort();

  const lines = [];
  lines.push(`// AUTO-GENERATED — do not edit`);
  lines.push(`// All generated server endpoints as a single enum`);
  lines.push(`export enum EndpointEnum {`);
  for (const rel of uniq) {
    // key from truncated path: 'store/order' -> 'StoreOrder', 'pet' -> 'Pet'
    const key = rel.split('/').map(pascal).join('');
    lines.push(`  ${key} = '${rel}',`);
  }
  lines.push(`}`);
  lines.push('');

  await fs.writeFile(OUT_FILE, lines.join('\n'), 'utf8');
  console.log(
    `[endpoints] wrote ${path.relative(ROOT, OUT_FILE)} with ${uniq.length} items`
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
