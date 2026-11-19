import { notFound } from 'next/navigation';
import TravelSite from '../../components/travel-site';
import StructuredData from '../../components/structured-data';
import { listings } from '../../lib/server-catalog';
import { pages, isPagePath } from '../../lib/site-pages';
import { pageContent, seoMetadata } from '../../lib/site-seo';

export const revalidate = 300;
export function generateStaticParams() {
  return Object.keys(pages).filter(path => path !== '/').map(path => ({ page: path.slice(1) }));
}

type Props = { params: Promise<{ page: string }> };

async function route(params: Props['params']) {
  const path = '/' + (await params).page;
  if (!isPagePath(path)) notFound();
  return path;
}

export async function generateMetadata({ params }: Props) {
  const path = await route(params);
  const content = await pageContent(path);
  return seoMetadata(path, content.title, content.description);
}

export default async function Page({ params }: Props) {
  const path = await route(params);
  const [initial, content] = await Promise.all([listings(), pageContent(path)]);
  return <><StructuredData path={path} title={content.title} description={content.description} updatedAt={content.updatedAt}/><TravelSite measurementId={process.env.GOOGLE_ANALYTICS_ID} page={path} initial={initial} content={content} /></>;
}
