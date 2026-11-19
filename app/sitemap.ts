import type { MetadataRoute } from 'next';
import { siteOrigin } from '../lib/site-url';
import { listings } from '../lib/server-catalog';
import { pages, type PagePath } from '../lib/site-pages';
import { pageContent } from '../lib/site-seo';

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await listings();
  const pageEntries = await Promise.all((Object.keys(pages) as PagePath[]).map(async path => ({
    url: new URL(path, siteOrigin()).href,
    lastModified: (await pageContent(path)).updatedAt,
  })));
  return [...pageEntries, ...items.map(item => ({
    url: new URL('/' + (item.kind === 'package' ? 'packages' : 'stays') + '/' + item.id, siteOrigin()).href,
    lastModified: item.updatedAt,
  }))];
}
