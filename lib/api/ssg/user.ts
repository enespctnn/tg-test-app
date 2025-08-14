'use server';
import { revalidateTag } from 'next/cache';
import * as raw from '../gen/server/user/user';

type NextRequestInit = RequestInit & { next?: { revalidate?: number | false; tags?: string[] } };
type ReplaceLast<T extends any[], R> = T extends [...infer H, any] ? [...H, R] : T;

/** SSG/SSR wrapper for createUsersWithListInput with Next.js cache tags */
export async function createUsersWithListInputSSG(...args: ReplaceLast<Parameters<typeof raw['createUsersWithListInput']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['createUsersWithListInput']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:createUsersWithListInput', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['createUsersWithListInput']>) : ([merged] as unknown as Parameters<typeof raw['createUsersWithListInput']>));
  return raw['createUsersWithListInput'](...forwarded);
}

export async function revalidateUserCreateUsersWithListInput() {
  revalidateTag('op:createUsersWithListInput');
}

/** SSG/SSR wrapper for getUserByName with Next.js cache tags */
export async function getUserByNameSSG(...args: ReplaceLast<Parameters<typeof raw['getUserByName']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['getUserByName']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:getUserByName', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['getUserByName']>) : ([merged] as unknown as Parameters<typeof raw['getUserByName']>));
  return raw['getUserByName'](...forwarded);
}

export async function revalidateUserGetUserByName() {
  revalidateTag('op:getUserByName');
}

/** SSG/SSR wrapper for updateUser with Next.js cache tags */
export async function updateUserSSG(...args: ReplaceLast<Parameters<typeof raw['updateUser']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['updateUser']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:updateUser', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['updateUser']>) : ([merged] as unknown as Parameters<typeof raw['updateUser']>));
  return raw['updateUser'](...forwarded);
}

export async function revalidateUserUpdateUser() {
  revalidateTag('op:updateUser');
}

/** SSG/SSR wrapper for deleteUser with Next.js cache tags */
export async function deleteUserSSG(...args: ReplaceLast<Parameters<typeof raw['deleteUser']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['deleteUser']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:deleteUser', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['deleteUser']>) : ([merged] as unknown as Parameters<typeof raw['deleteUser']>));
  return raw['deleteUser'](...forwarded);
}

export async function revalidateUserDeleteUser() {
  revalidateTag('op:deleteUser');
}

/** SSG/SSR wrapper for loginUser with Next.js cache tags */
export async function loginUserSSG(...args: ReplaceLast<Parameters<typeof raw['loginUser']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['loginUser']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:loginUser', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['loginUser']>) : ([merged] as unknown as Parameters<typeof raw['loginUser']>));
  return raw['loginUser'](...forwarded);
}

export async function revalidateUserLoginUser() {
  revalidateTag('op:loginUser');
}

/** SSG/SSR wrapper for logoutUser with Next.js cache tags */
export async function logoutUserSSG(...args: ReplaceLast<Parameters<typeof raw['logoutUser']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['logoutUser']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:logoutUser', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['logoutUser']>) : ([merged] as unknown as Parameters<typeof raw['logoutUser']>));
  return raw['logoutUser'](...forwarded);
}

export async function revalidateUserLogoutUser() {
  revalidateTag('op:logoutUser');
}

/** SSG/SSR wrapper for createUsersWithArrayInput with Next.js cache tags */
export async function createUsersWithArrayInputSSG(...args: ReplaceLast<Parameters<typeof raw['createUsersWithArrayInput']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['createUsersWithArrayInput']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:createUsersWithArrayInput', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['createUsersWithArrayInput']>) : ([merged] as unknown as Parameters<typeof raw['createUsersWithArrayInput']>));
  return raw['createUsersWithArrayInput'](...forwarded);
}

export async function revalidateUserCreateUsersWithArrayInput() {
  revalidateTag('op:createUsersWithArrayInput');
}

/** SSG/SSR wrapper for createUser with Next.js cache tags */
export async function createUserSSG(...args: ReplaceLast<Parameters<typeof raw['createUser']>, NextRequestInit | undefined>): Promise<ReturnType<typeof raw['createUser']>> {
  const len = args.length;
  const options = (len > 0 ? (args[len - 1] as NextRequestInit | undefined) : undefined);
  const tags = Array.from(new Set([ 'svc:user', 'op:createUser', ...(options?.next?.tags ?? []) ]));
  const revalidate = options?.next?.revalidate ?? 3600;
  const next = { ...(options?.next ?? {}), tags, revalidate };
  const merged = { ...(options || {}), next } as NextRequestInit;
  const forwarded = (len > 0 ? ([...args.slice(0, len - 1), merged] as unknown as Parameters<typeof raw['createUser']>) : ([merged] as unknown as Parameters<typeof raw['createUser']>));
  return raw['createUser'](...forwarded);
}

export async function revalidateUserCreateUser() {
  revalidateTag('op:createUser');
}

export async function revalidateUserService() {
  revalidateTag('svc:user');
}
