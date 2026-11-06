import TravelSite from '../components/travel-site';
import { listings } from '../lib/server-catalog';
import { pageContent, seoMetadata } from '../lib/site-seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  const content = await pageContent('/');
  return seoMetadata('/', content.title, content.description);
}

export default async function Page() {
  const [initial, content] = await Promise.all([listings(), pageContent('/')]);
  return <TravelSite measurementId={process.env.GOOGLE_ANALYTICS_ID} page="/" initial={initial} content={content} />;
}
