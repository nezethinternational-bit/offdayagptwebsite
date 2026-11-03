import 'server-only';
import {initialListings,type Listing} from './catalog';
import {backendConfigured,serviceSupabase} from './supabase';
export async function listings(all=false):Promise<Listing[]>{
 const map=new Map(initialListings.map(item=>[item.id,item]));
 if(backendConfigured()){
  const {data,error}=await serviceSupabase().from('offdaya_content').select('id,payload');
  if(error)throw new Error('The catalogue database is unavailable. Check the Supabase setup.');
  for(const row of data||[])map.set(row.id,row.payload as Listing);
 }
 return [...map.values()].filter(item=>all||item.status==='published');
}
