import 'server-only';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import type { Metadata } from 'next';
import { backendConfigured, serviceSupabase } from './supabase';
import { defaultPageContent, type PagePath, type PageContent } from './site-pages';
import { siteOrigin } from './site-url';

const readPageContent = unstable_cache(async (path: PagePath): Promise<PageContent> => {
  const defaults = defaultPageContent(path);
  if (!backendConfigured()) return defaults;
  const { data, error } = await serviceSupabase()
    .from('offdaya_pages').select('content,updated_at').eq('path', path).maybeSingle();
  if (error) throw new Error('Website page content is temporarily unavailable.');
  return { ...defaults, ...data?.content, updatedAt: data?.updated_at || defaults.updatedAt };
}, ['offdaya-page-content-v2'], { revalidate: 300, tags: ['offdaya-pages'] });

export const pageContent = cache(readPageContent);

export function seoMetadata(path: string, title: string, description: string, image = '/images/lakshadweep-lagoon-v3.webp'): Metadata {
  const canonical = new URL(path, siteOrigin());
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { type: 'website', siteName: 'OFFDAYA', title, description, url: canonical, images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
