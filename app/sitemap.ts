import type { MetadataRoute } from 'next';
import { siteOrigin } from '../lib/site-url';
import { listings } from '../lib/server-catalog';
import { pages } from '../lib/site-pages';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const items = await listings();
  const paths = items.map(item => '/' + (item.kind === 'package' ? 'packages' : 'stays') + '/' + item.id);
  return [...Object.keys(pages), ...paths].map(path => ({ url: new URL(path, siteOrigin()).href }));
}
