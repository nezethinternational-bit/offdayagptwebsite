import { cache } from 'react';
import { notFound } from 'next/navigation';
import TravelSite from '../../../components/travel-site';
import StructuredData from '../../../components/structured-data';
import { listings } from '../../../lib/server-catalog';
import { seoMetadata } from '../../../lib/site-seo';

export const revalidate = 300;
export async function generateStaticParams() {
  return (await listings()).map(item => ({ page: item.kind === 'stay' ? 'stays' : 'packages', slug: item.id }));
}

type Props = { params: Promise<{ page: string; slug: string }> };
const publishedListings = cache(() => listings());

async function route(params: Props['params']) {
  const { page, slug } = await params;
  if (page !== 'packages' && page !== 'stays') notFound();
  const initial = await publishedListings();
  const item = initial.find(entry => entry.id === slug && entry.kind === (page === 'stays' ? 'stay' : 'package'));
  if (!item) notFound();
  return { page, item, initial };
}

export async function generateMetadata({ params }: Props) {
  const { page, item } = await route(params);
  const title = item.seoTitle || item.title + ' | OFFDAYA';
  const description = item.seoDescription || item.summary.replace(/\s+/g, ' ').slice(0, 160);
  return seoMetadata('/' + page + '/' + item.id, title, description, item.image || undefined);
}

export default async function Page({ params }: Props) {
  const { page, item, initial } = await route(params);
  return <><StructuredData path={'/' + page + '/' + item.id} title={item.seoTitle || item.title + ' | OFFDAYA'} description={item.seoDescription || item.summary} updatedAt={item.updatedAt}/><TravelSite measurementId={process.env.GOOGLE_ANALYTICS_ID} page={'/' + page} slug={item.id} initial={initial} /></>;
}
