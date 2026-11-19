export const pages = {
  '/': ['Home', 'Lakshadweep & Kashmir Tours and Kerala Stays | OFFDAYA', 'Explore Lakshadweep island escapes, classic and offbeat Kashmir tours, and resorts and homestays across Kerala with OFFDAYA.'],
  '/packages': ['Packages', 'Lakshadweep & Kashmir Holiday Packages | OFFDAYA', 'Compare Lakshadweep Escape, Beyond Kashmir and Classic Kashmir. Explore day-by-day itineraries, inclusions and travel enquiry options.'],
  '/stays': ['Stays', 'Kerala Resorts & Homestays | OFFDAYA', 'Enquire about Kerala stays in Wayanad, Munnar, Kakkadampoyil, Anakkampoyil, Poovaranthode and Thusharagiri.'],
  '/services': ['Services', 'Holiday Planning & Stay Enquiries | OFFDAYA', 'Get help planning island escapes, mountain tours, Kerala stays and custom trips, with local coordination and a clear quotation.'],
  '/contact': ['Contact', 'Contact OFFDAYA | Travel & Stay Enquiries', 'Ask OFFDAYA about your holiday dates, travel package or Kerala stay by WhatsApp, phone or email.'],
  '/about': ['About', 'About OFFDAYA | Holidays, Stays & Workations', 'Meet OFFDAYA and learn how we plan Lakshadweep escapes, Kashmir journeys and Kerala stay enquiries around your travel preferences.'],
  '/privacy': ['Privacy', 'Privacy Notice | OFFDAYA', 'Read how OFFDAYA handles travel enquiries and the details you choose to share when planning a trip.'],
  '/terms': ['Booking terms', 'Booking Enquiry Terms | OFFDAYA', 'Review how OFFDAYA handles travel enquiries, brochure prices, written quotations and booking details.'],
} as const;

export type PagePath = keyof typeof pages;
export type PageContent = {
  title: string;
  description: string;
  heading: string;
  introduction: string;
  body: string;
  updatedAt?: string;
};

export const contentUpdatedAt = '2026-11-19T00:00:00+05:30';

const aboutIntroduction = 'OFFDAYA grew from a personal experience of working in IT, where busy schedules and constant demands made it difficult to switch off. Seeing others facing the same stress sparked an idea—to help people make time for a break, a change of scenery and moments they could enjoy.\n\nToday, the OFFDAYA team brings together holidays, stays and workations shaped around that purpose.';

const aboutBody = `## A getaway for everyone

We welcome solo travellers, couples, families, friends and corporate groups. Whether you want adventure, time together or a peaceful escape, we listen to your preferences and plan around your pace.

## Discover a different side of travel

Our travel experience and local connections help us create journeys beyond the usual stops. We bring together familiar highlights, quieter places and lesser-known routes that give each trip its own character.

From Lakshadweep’s lagoons to classic Kashmir holidays, our offbeat Beyond Kashmir journeys and Kerala stays, we help you find an experience that feels right for you.

## Complete planning, personal support

We coordinate your journey, including accommodation, transport, activities, guides and permits where needed. Before you book, we explain your itinerary, inclusions and quotation so you know what to expect.

You can come to us with a detailed plan or simply the feeling that you need a few days away.

## Make time for your next off day

Is there anything else you need? Tell the OFFDAYA team what you have in mind, and we’ll help turn it into a getaway worth making time for.`;

export function isPagePath(path: string): path is PagePath {
  return Object.hasOwn(pages, path);
}

export function defaultPageContent(path: PagePath): PageContent {
  return {
    title: pages[path][1],
    description: pages[path][2],
    heading: path === '/about' ? 'Your calendar deserves better views.' : '',
    introduction: path === '/about' ? aboutIntroduction : '',
    body: path === '/about' ? aboutBody : '',
    updatedAt: contentUpdatedAt,
  };
}
