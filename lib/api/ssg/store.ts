'use server';
import { revalidateTag } from 'next/cache';
import * as raw from '../gen/server/store/store';

type NextRequestInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };
type ReplaceLast<T extends any[], R> = T extends [...infer H, any] ? [...H, R] : T;

/** SSG/SSR wrapper for getInventory with Next.js cache tags */
export async function getInventorySSG(...args: ReplaceLast<Parameters<typeof raw['getInventory']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['getInventory']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:store', 'op:getInventory', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['getInventory']>) : ([merged] as unknown as Parameters<typeof raw['getInventory']>));
  return raw['getInventory'](...forwarded);
}

export async function revalidateStoreGetInventory() {
  revalidateTag('op:getInventory');
}

/** SSG/SSR wrapper for placeOrder with Next.js cache tags */
export async function placeOrderSSG(...args: ReplaceLast<Parameters<typeof raw['placeOrder']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['placeOrder']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:store', 'op:placeOrder', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['placeOrder']>) : ([merged] as unknown as Parameters<typeof raw['placeOrder']>));
  return raw['placeOrder'](...forwarded);
}

export async function revalidateStorePlaceOrder() {
  revalidateTag('op:placeOrder');
}

/** SSG/SSR wrapper for getOrderById with Next.js cache tags */
export async function getOrderByIdSSG(...args: ReplaceLast<Parameters<typeof raw['getOrderById']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['getOrderById']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:store', 'op:getOrderById', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['getOrderById']>) : ([merged] as unknown as Parameters<typeof raw['getOrderById']>));
  return raw['getOrderById'](...forwarded);
}

export async function revalidateStoreGetOrderById() {
  revalidateTag('op:getOrderById');
}

/** SSG/SSR wrapper for deleteOrder with Next.js cache tags */
export async function deleteOrderSSG(...args: ReplaceLast<Parameters<typeof raw['deleteOrder']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['deleteOrder']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:store', 'op:deleteOrder', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['deleteOrder']>) : ([merged] as unknown as Parameters<typeof raw['deleteOrder']>));
  return raw['deleteOrder'](...forwarded);
}

export async function revalidateStoreDeleteOrder() {
  revalidateTag('op:deleteOrder');
}

export async function revalidateStoreService() {
  revalidateTag('svc:store');
}
