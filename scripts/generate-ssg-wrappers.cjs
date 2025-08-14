/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs').promises;
const path = require('path');

const ROOT = process.cwd();
const GEN_DIR = path.join(ROOT, 'lib/api/gen/server');
const OUT_DIR = path.join(ROOT, 'lib/api/ssg');
const DEFAULT_REVALIDATE = Number(process.env.DEFAULT_REVALIDATE || 3600);

const isOpFile = (f) =>
  f.endsWith('.ts') &&
  f !== 'index.ts' &&
  !f.endsWith('.schemas.ts') &&
  !f.endsWith('.msw.ts');

function capitalize(s) {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

function relImport(fromDir, toPath) {
  let rel = path.relative(fromDir, toPath).replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel;
}

// Find exported function names in a file (const fn = ( ... ) or function fn( ... ))
async function collectFnNames(filePath) {
  const src = await fs.readFile(filePath, 'utf8');
  const set = new Set();
  for (const m of src.matchAll(/export\s+const\s+(\w+)\s*=\s*(?:async\s*)?\(/g))
    set.add(m[1]);
  for (const m of src.matchAll(/export\s+function\s+(\w+)\s*\(/g))
    set.add(m[1]);
  // ignore URL builders and test/mocks
  return [...set].filter((n) => !n.endsWith('Url') && !n.startsWith('mock'));
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const services = (await fs.readdir(GEN_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const serviceTags = [];
  const opTagsByService = {};

  for (const service of services) {
    const serviceDir = path.join(GEN_DIR, service);
    const files = await fs.readdir(serviceDir);
    const opFiles = files.filter(isOpFile);

    const fnSet = new Set();
    for (const f of opFiles) {
      const fns = await collectFnNames(path.join(serviceDir, f));
      fns.forEach((n) => fnSet.add(n));
    }

    const fnNames = [...fnSet];
    if (fnNames.length === 0) {
      console.warn(
        `[ssg] No exported functions found for service "${service}". Scanned ${opFiles.length} files.`
      );
      continue;
    }

    // Tags
    const svcTag = `svc:${service}`;
    serviceTags.push(svcTag);
    opTagsByService[service] = fnNames.map((n) => `op:${n}`);

    // Emit wrappers file (typed)
    const importFromServiceIndex = relImport(OUT_DIR, serviceDir); // folder import -> index.ts
    const lines = [];
    lines.push(`'use server';`);
    lines.push(`import { revalidateTag } from 'next/cache';`);
    lines.push(`import * as raw from '${importFromServiceIndex}/${service}';`);
    lines.push('');
    lines.push(
      `type NextRequestInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };`
    );
    lines.push(
      `type ReplaceLast<T extends any[], R> = T extends [...infer H, any] ? [...H, R] : T;`
    );
    lines.push('');

    for (const fn of fnNames) {
      const opTag = `op:${fn}`;
      lines.push(`/** SSG/SSR wrapper for ${fn} with Next.js cache tags */`);
      lines.push(
        `export async function ${fn}SSG(...args: ReplaceLast<Parameters<typeof raw['${fn}']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['${fn}']>> {`
      );
      lines.push(`  const len = args.length;`);
      lines.push(
        `  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);`
      );
      lines.push(
        `  const tags = Array.from(new Set([ '${svcTag}', '${opTag}', ...(options?.next?.tags ?? []) ]));`
      );
      lines.push(
        `  const revalidate = options?.next?.revalidate ?? ${DEFAULT_REVALIDATE};`
      );
      lines.push(
        `  const next = { ...(options?.next ?? {}), tags, revalidate };`
      );
      lines.push(
        `  const merged = { ...(options || {}), next } as NextRequestInit;`
      );
      lines.push(
        `  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['${fn}']>) : ([merged] as unknown as Parameters<typeof raw['${fn}']>));`
      );
      lines.push(`  return raw['${fn}'](...forwarded);`);
      lines.push(`}`);
      lines.push('');
      // op-only revalidate
      lines.push(
        `export async function revalidate${capitalize(service)}${capitalize(fn)}() {`
      );
      lines.push(`  revalidateTag('${opTag}');`);
      lines.push(`}`);
      lines.push('');
    }

    // service-wide revalidate
    lines.push(
      `export async function revalidate${capitalize(service)}Service() {`
    );
    lines.push(`  revalidateTag('${svcTag}');`);
    lines.push(`}`);
    lines.push('');

    await fs.writeFile(
      path.join(OUT_DIR, `${service}.ts`),
      lines.join('\n'),
      'utf8'
    );
  }

  // tags.ts registry
  const tagsLines = [];
  tagsLines.push(
    `export const SERVICE_TAGS = ${JSON.stringify(serviceTags)} as const;`
  );
  tagsLines.push(`export type ServiceTag = typeof SERVICE_TAGS[number];`);
  tagsLines.push(
    `export const OP_TAGS = ${JSON.stringify(opTagsByService, null, 2)} as const;`
  );
  tagsLines.push(`export type ServiceKey = keyof typeof OP_TAGS;`);
  tagsLines.push(
    `export type OpTag = { [K in ServiceKey]: typeof OP_TAGS[K][number] }[ServiceKey];`
  );
  tagsLines.push(`export type AllTag = ServiceTag | OpTag;`);
  tagsLines.push(
    `export const ALL_OP_TAGS = Object.values(OP_TAGS).flatMap(a => [...a]) as readonly OpTag[];`
  );
  tagsLines.push(
    `export const ALL_TAGS = [...SERVICE_TAGS, ...ALL_OP_TAGS] as const;`
  );
  await fs.writeFile(
    path.join(OUT_DIR, 'tags.ts'),
    tagsLines.join('\n'),
    'utf8'
  );

  // index barrel
  const outFiles = await fs.readdir(OUT_DIR);
  const barrel =
    outFiles
      .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
      .map((f) => `export * from './${f.replace(/\.ts$/, '')}';`)
      .join('\n') + '\n';
  await fs.writeFile(path.join(OUT_DIR, 'index.ts'), barrel, 'utf8');

  console.log(
    `[ssg] wrappers generated for services: ${Object.keys(opTagsByService).join(', ')}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
