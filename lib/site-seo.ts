import 'server-only';
import { cache } from 'react';
import type { Metadata } from 'next';
import { backendConfigured, serviceSupabase } from './supabase';
import { defaultPageContent, type PagePath, type PageContent } from './site-pages';
import { siteOrigin } from './site-url';

export const pageContent = cache(async (path: PagePath): Promise<PageContent> => {
  const defaults = defaultPageContent(path);
  if (!backendConfigured()) return defaults;
  const { data, error } = await serviceSupabase()
    .from('offdaya_pages').select('content').eq('path', path).maybeSingle();
  if (error) throw new Error('Website page content is temporarily unavailable.');
  return { ...defaults, ...data?.content };
});

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
