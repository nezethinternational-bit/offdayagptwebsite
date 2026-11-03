import {adminUser,sameOrigin} from '../../../../lib/admin-auth';
import {serviceSupabase} from '../../../../lib/supabase';
import {listings} from '../../../../lib/server-catalog';
import {listingSchema} from '../../../../lib/listing-validation';
export const dynamic='force-dynamic';
export async function GET(){if(!await adminUser())return Response.json({error:'Admin access is required.'},{status:403});try{return Response.json(await listings(true),{headers:{'Cache-Control':'private, no-store'}})}catch{return Response.json({error:'The catalogue is temporarily unavailable.'},{status:503})}}
export async function PUT(request:Request){const user=await adminUser();if(!user||!sameOrigin(request))return Response.json({error:'Admin access is required.'},{status:403});let body;try{body=await request.json()}catch{return Response.json({error:'Invalid listing data.'},{status:400})}const parsed=listingSchema.safeParse(body);if(!parsed.success)return Response.json({error:parsed.error.issues[0]?.message||'Check the listing details.'},{status:400});try{const {error}=await serviceSupabase().rpc('save_offdaya_listing',{p_listing:parsed.data,p_actor:user.email});if(error)throw error;return Response.json({ok:true})}catch{return Response.json({error:'Save failed. Check the Supabase database setup and try again.'},{status:503})}}
