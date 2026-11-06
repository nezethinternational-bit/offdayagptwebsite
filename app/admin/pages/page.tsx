import { redirect } from 'next/navigation';
import PageEditor from '../../../components/page-editor';
import { adminUser } from '../../../lib/admin-auth';
import { backendConfigured } from '../../../lib/supabase';
import { pageContent } from '../../../lib/site-seo';
import { pages, type PagePath } from '../../../lib/site-pages';

export const dynamic = 'force-dynamic';

export default async function Page() {
  if (!backendConfigured() || !await adminUser()) redirect('/admin/login');
  const entries = await Promise.all((Object.keys(pages) as PagePath[]).map(async path => ({
    path,
    content: await pageContent(path),
  })));
  return <PageEditor entries={entries} />;
}
