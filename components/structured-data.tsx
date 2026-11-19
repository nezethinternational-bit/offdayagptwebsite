import { siteOrigin } from '../lib/site-url';
import { contentUpdatedAt } from '../lib/site-pages';

type Props = { path: string; title: string; description: string; updatedAt?: string };

export default function StructuredData({ path, title, description, updatedAt = contentUpdatedAt }: Props) {
  const origin = siteOrigin();
  const url = new URL(path, origin).href;
  const organizationId = new URL('/#organization', origin).href;
  const websiteId = new URL('/#website', origin).href;
  const pageType = path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : 'WebPage';
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency', '@id': organizationId, name: 'OFFDAYA', url: origin,
        description: 'Personal holiday planning, Lakshadweep and Kashmir trips, and Kerala stay enquiries.',
        email: 'hello@offdaya.in', telephone: '+917994849989',
        sameAs: ['https://www.instagram.com/offdaya.in/'],
      },
      { '@type': 'WebSite', '@id': websiteId, url: origin, name: 'OFFDAYA', publisher: { '@id': organizationId } },
      {
        '@type': pageType, '@id': url + '#webpage', url, name: title, description,
        inLanguage: 'en', dateModified: updatedAt,
        isPartOf: { '@id': websiteId }, about: { '@id': organizationId },
      },
      ...(path === '/' ? [] : [{
        '@type': 'BreadcrumbList', itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
          { '@type': 'ListItem', position: 2, name: title.replace(/ \| OFFDAYA$/, ''), item: url },
        ],
      }]),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />;
}
