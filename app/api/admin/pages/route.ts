import { z } from 'zod';
import { adminUser, sameOrigin } from '../../../../lib/admin-auth';
import { isPagePath } from '../../../../lib/site-pages';
import { serviceSupabase } from '../../../../lib/supabase';

const schema = z.object({
  path: z.string().refine(isPagePath),
  content: z.object({
    title: z.string().trim().min(5).max(120),
    description: z.string().trim().min(10).max(300),
    heading: z.string().trim().max(150),
    introduction: z.string().trim().max(1000),
    body: z.string().trim().max(10000),
  }),
});

export async function PUT(request: Request) {
  const user = await adminUser();
  if (!user || !sameOrigin(request)) {
    return Response.json({ error: 'Admin access is required.' }, { status: 403 });
  }
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: 'Check the page title, description and content lengths.' }, { status: 400 });
  }
  const { error } = await serviceSupabase().from('offdaya_pages').upsert({
    ...parsed.data, updated_at: new Date().toISOString(),
  });
  if (error) return Response.json({ error: 'Page could not be saved.' }, { status: 503 });
  return Response.json({ ok: true });
}
