export async function basicFetch<T>(
  url: string,
  options?: RequestInit & { params?: Record<string, string> }
): Promise<T> {
  if (options?.params) url += `?${new URLSearchParams(options?.params)}`;
  const res = await fetch(url, {
    cache: 'force-cache',
    ...options,
  });

  // There will be our custom error handling
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}
