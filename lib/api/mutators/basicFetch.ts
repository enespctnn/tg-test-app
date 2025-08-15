// lib/api/mutators/basicFetch.ts
import { configs } from '../constants/config.constant';
import { EndpointEnum } from '../enums/endpoint.enum';

const API_BASE = process.env.API_BASE_URL;

function endpointFromUrl(url: string): EndpointEnum | undefined {
  const u = new URL(url, API_BASE);
  // derive "service/op" by stripping API base path
  const basePath = API_BASE
    ? new URL(API_BASE).pathname.replace(/\/+$/, '')
    : '';
  let path = u.pathname;

  if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length);
  const key = path.replace(/^\/+/, '') as EndpointEnum; // -> "pet/findByStatus"
  return Object.values(EndpointEnum).includes(key)
    ? (key as EndpointEnum)
    : undefined;
}

export async function basicFetch<T>(
  url: string,
  options?: RequestInit & { params?: Record<string, string> }
): Promise<T> {
  // append ?params safely
  if (options?.params) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(options.params)) {
      if (v === undefined) continue;
      q.append(k, v === null ? 'null' : String(v));
    }
    const qs = q.toString();

    if (qs) url += (url.includes('?') ? '&' : '?') + qs;
  }

  // find config by enum or by URL

  const key = endpointFromUrl(url);
  const fromCfg = key ? configs[key] : undefined;

  // deep-merge headers + next; options should win over defaults
  const mergedHeaders = {
    ...(fromCfg?.headers || {}),
    ...(options?.headers || {}),
  };
  const tags = new Set<string>([
    ...(fromCfg?.next?.tags ?? []),
    ...(options?.next?.tags ?? []),
  ]);

  if (key) {
    const [svc, op] = key.split('/');
    tags.add(svc);
    tags.add(op);
  }

  const merged: RequestInit = {
    ...fromCfg,
    ...options,
    headers: mergedHeaders,
    next: {
      ...(fromCfg?.next ?? {}),
      ...(options?.next ?? {}),
      tags: Array.from(tags),
      revalidate: options?.next?.revalidate ?? fromCfg?.next?.revalidate,
    },
  };

  console.log('tags', merged.next?.tags);

  const res = await fetch(url, merged);

  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
