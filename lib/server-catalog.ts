import 'server-only';
import { unstable_cache } from 'next/cache';
import {initialListings,type Listing} from './catalog';
import {backendConfigured,serviceSupabase} from './supabase';
import { contentUpdatedAt } from './site-pages';
async function readListings():Promise<Listing[]>{
 const map=new Map(initialListings.map(item=>[item.id,item]));
 if(backendConfigured()){
  const {data,error}=await serviceSupabase().from('offdaya_content').select('id,payload,updated_at');
  if(error)throw new Error('The catalogue database is unavailable. Check the Supabase setup.');
  for(const row of data||[])map.set(row.id,{...row.payload,updatedAt:row.updated_at} as Listing);
 }
 return [...map.values()];
}

const publishedListings = unstable_cache(async () => {
 const items = await readListings();
 return items.filter(item => item.status === 'published').map(item => ({
  ...item, price: 0, updatedAt: item.updatedAt || contentUpdatedAt,
 }));
}, ['offdaya-published-listings-v2'], { revalidate: 300, tags: ['offdaya-catalog'] });

export async function listings(all=false):Promise<Listing[]>{
 return all ? readListings() : publishedListings();
}
