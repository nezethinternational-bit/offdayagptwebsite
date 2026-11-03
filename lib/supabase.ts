import 'server-only';
import {createClient} from '@supabase/supabase-js';
import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
export const authConfigured=()=>Boolean(process.env.SUPABASE_URL&&process.env.SUPABASE_PUBLISHABLE_KEY);
export const backendConfigured=()=>Boolean(authConfigured()&&(process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY));
export function serviceSupabase(){
 const key=process.env.SUPABASE_SECRET_KEY||process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!process.env.SUPABASE_URL||!key)throw new Error('Supabase storage and database are not configured.');
 return createClient(process.env.SUPABASE_URL,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
export async function sessionSupabase(){
 if(!authConfigured())throw new Error('Admin authentication is not configured.');
 const store=await cookies();
 return createServerClient(process.env.SUPABASE_URL!,process.env.SUPABASE_PUBLISHABLE_KEY!,{
  cookieOptions:{path:'/',sameSite:'lax',httpOnly:true,secure:process.env.NODE_ENV==='production'},
  cookies:{getAll(){return store.getAll()},setAll(values){try{values.forEach(({name,value,options})=>store.set(name,value,options))}catch{/* Proxy refreshes cookies for server-rendered pages. */}}}
 });
}
