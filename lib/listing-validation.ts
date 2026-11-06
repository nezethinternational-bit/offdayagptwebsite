import { z } from 'zod';

const image = z.string().max(2000).refine(
  value => /^\/images\/[a-zA-Z0-9_-]+\.(webp|png|jpg|jpeg)$/.test(value) || /^\/api\/media\/[a-f0-9-]{36}$/.test(value),
  'Upload a photo or select a library image',
);
const lines = (maxLength: number, maxItems: number) => z.array(z.string().trim().max(maxLength)).max(maxItems).transform(items => items.filter(Boolean));

export const listingSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]{1,80}$/),
  kind: z.enum(['package', 'stay']),
  status: z.enum(['draft', 'published', 'archived']),
  title: z.string().trim().min(3).max(150),
  location: z.string().trim().min(2).max(150),
  type: z.string().trim().max(100),
  duration: z.string().trim().max(100),
  price: z.number().int().min(0).max(1000000000),
  unit: z.enum(['person', 'couple', 'night', 'package']),
  summary: z.string().trim().min(10).max(4000),
  seoTitle: z.string().trim().max(120).optional(),
  seoDescription: z.string().trim().max(300).optional(),
  story: z.string().trim().max(12000).optional(),
  tagline: z.string().trim().max(250).optional(),
  image: z.union([z.literal(''), image]),
  gallery: z.array(image).max(15),
  highlights: lines(250, 20),
  itinerary: z.array(z.object({ title: z.string().trim().max(200), description: z.string().trim().max(3000) })).max(30),
  inclusions: lines(500, 30),
  exclusions: lines(500, 30),
  amenities: lines(200, 30),
}).superRefine((listing, context) => {
  if (listing.status !== 'published') return;
  const required = (path: string, message: string) => context.addIssue({ code: 'custom', path: [path], message });
  if (!listing.image) required('image', 'Choose a cover photo before publishing.');
  if (!listing.type) required('type', 'Add a category before publishing.');
  if (!listing.highlights.length) required('highlights', 'Add at least one highlight before publishing.');
  if (listing.kind === 'package' && (!listing.itinerary.length || listing.itinerary.some(day => !day.title || !day.description))) {
    required('itinerary', 'Complete every itinerary day before publishing.');
  }
});
