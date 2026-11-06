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
};

export function isPagePath(path: string): path is PagePath {
  return Object.hasOwn(pages, path);
}

export function defaultPageContent(path: PagePath): PageContent {
  return {
    title: pages[path][1],
    description: pages[path][2],
    heading: '',
    introduction: '',
    body: '',
  };
}
