import type {MetadataRoute} from 'next';
import {siteOrigin} from '../lib/site-url';
import {listings} from '../lib/server-catalog';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const items=await listings();return ['','/packages','/stays','/services','/contact','/about',...items.filter(x=>x.kind==='package').map(x=>'/packages/'+x.id)].map(path=>({url:new URL(path,siteOrigin()).toString()}));}
export const dynamic='force-dynamic';
