import 'server-only';
import {authConfigured,sessionSupabase} from './supabase';
export async function adminUser(){
 if(!authConfigured())return null;
 try{const supabase=await sessionSupabase();const {data,error}=await supabase.auth.getUser();
 const user=data.user;const allowed=(process.env.ADMIN_EMAIL||'booking.offdaya@gmail.com').trim().toLowerCase();
 if(error||!user?.email||!user.email_confirmed_at||user.email.toLowerCase()!==allowed)return null;
 return {userId:user.id,email:user.email};}catch{return null;}
}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin;}
