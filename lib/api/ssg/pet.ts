'use server';
import { revalidateTag } from 'next/cache';
import * as raw from '../gen/server/pet/pet';

type NextRequestInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };
type ReplaceLast<T extends any[], R> = T extends [...infer H, any] ? [...H, R] : T;

/** SSG/SSR wrapper for uploadFile with Next.js cache tags */
export async function uploadFileSSG(...args: ReplaceLast<Parameters<typeof raw['uploadFile']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['uploadFile']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:uploadFile', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['uploadFile']>) : ([merged] as unknown as Parameters<typeof raw['uploadFile']>));
  return raw['uploadFile'](...forwarded);
}

export async function revalidatePetUploadFile() {
  revalidateTag('op:uploadFile');
}

/** SSG/SSR wrapper for addPet with Next.js cache tags */
export async function addPetSSG(...args: ReplaceLast<Parameters<typeof raw['addPet']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['addPet']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:addPet', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['addPet']>) : ([merged] as unknown as Parameters<typeof raw['addPet']>));
  return raw['addPet'](...forwarded);
}

export async function revalidatePetAddPet() {
  revalidateTag('op:addPet');
}

/** SSG/SSR wrapper for updatePet with Next.js cache tags */
export async function updatePetSSG(...args: ReplaceLast<Parameters<typeof raw['updatePet']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['updatePet']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:updatePet', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['updatePet']>) : ([merged] as unknown as Parameters<typeof raw['updatePet']>));
  return raw['updatePet'](...forwarded);
}

export async function revalidatePetUpdatePet() {
  revalidateTag('op:updatePet');
}

/** SSG/SSR wrapper for findPetsByStatus with Next.js cache tags */
export async function findPetsByStatusSSG(...args: ReplaceLast<Parameters<typeof raw['findPetsByStatus']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['findPetsByStatus']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:findPetsByStatus', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['findPetsByStatus']>) : ([merged] as unknown as Parameters<typeof raw['findPetsByStatus']>));
  return raw['findPetsByStatus'](...forwarded);
}

export async function revalidatePetFindPetsByStatus() {
  revalidateTag('op:findPetsByStatus');
}

/** SSG/SSR wrapper for findPetsByTags with Next.js cache tags */
export async function findPetsByTagsSSG(...args: ReplaceLast<Parameters<typeof raw['findPetsByTags']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['findPetsByTags']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:findPetsByTags', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['findPetsByTags']>) : ([merged] as unknown as Parameters<typeof raw['findPetsByTags']>));
  return raw['findPetsByTags'](...forwarded);
}

export async function revalidatePetFindPetsByTags() {
  revalidateTag('op:findPetsByTags');
}

/** SSG/SSR wrapper for getPetById with Next.js cache tags */
export async function getPetByIdSSG(...args: ReplaceLast<Parameters<typeof raw['getPetById']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['getPetById']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:getPetById', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['getPetById']>) : ([merged] as unknown as Parameters<typeof raw['getPetById']>));
  return raw['getPetById'](...forwarded);
}

export async function revalidatePetGetPetById() {
  revalidateTag('op:getPetById');
}

/** SSG/SSR wrapper for updatePetWithForm with Next.js cache tags */
export async function updatePetWithFormSSG(...args: ReplaceLast<Parameters<typeof raw['updatePetWithForm']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['updatePetWithForm']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:updatePetWithForm', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['updatePetWithForm']>) : ([merged] as unknown as Parameters<typeof raw['updatePetWithForm']>));
  return raw['updatePetWithForm'](...forwarded);
}

export async function revalidatePetUpdatePetWithForm() {
  revalidateTag('op:updatePetWithForm');
}

/** SSG/SSR wrapper for deletePet with Next.js cache tags */
export async function deletePetSSG(...args: ReplaceLast<Parameters<typeof raw['deletePet']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['deletePet']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:pet', 'op:deletePet', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['deletePet']>) : ([merged] as unknown as Parameters<typeof raw['deletePet']>));
  return raw['deletePet'](...forwarded);
}

export async function revalidatePetDeletePet() {
  revalidateTag('op:deletePet');
}

export async function revalidatePetService() {
  revalidateTag('svc:pet');
}
