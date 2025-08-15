import { revalidateTag } from 'next/cache';

const HEADER = 'x-revalidate-secret';
const secret = process.env.REVALIDATE_TOKEN;

if (!secret) throw new Error('Missing REVALIDATE_TOKEN in env!');

export function GET(req: Request) {
  const provided = req.headers.get(HEADER) || '';

  if (provided !== secret) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const ops = searchParams.getAll('op');
  const svcs = searchParams.getAll('svc');

  const revalidated: string[] = [];

  // Revalidate all op tags
  if (ops.length > 0) {
    for (const op of ops) {
      revalidateTag(op);
      revalidated.push(op);
    }
  }

  // Revalidate all svc tags
  if (svcs.length > 0) {
    for (const svc of svcs) {
      revalidateTag(svc);
      revalidated.push(svc);
    }
  }

  if (revalidated.length === 0) {
    return Response.json(
      { ok: false, error: 'No tags provided' },
      { status: 400 }
    );
  }

  return Response.json({ ok: true, revalidated });
}
