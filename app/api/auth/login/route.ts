import {NextResponse} from 'next/server';
import {sameOrigin} from '../../../../lib/admin-auth';
import {backendConfigured,sessionSupabase} from '../../../../lib/supabase';
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({error:'Invalid request origin.'},{status:403});
 if(!backendConfigured())return NextResponse.json({error:'Admin setup is incomplete.'},{status:503});
 let body;try{body=await request.json()}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
 const email=typeof body.email==='string'?body.email.trim().toLowerCase():'';const password=typeof body.password==='string'?body.password:'';
 if(email!==(process.env.ADMIN_EMAIL||'adnan@offdaya.in').trim().toLowerCase()||password.length<8||password.length>256)return NextResponse.json({error:'Invalid email or password.'},{status:401});
 try{const supabase=await sessionSupabase();const {data,error}=await supabase.auth.signInWithPassword({email,password});
 if(error||!data.user?.email_confirmed_at){await supabase.auth.signOut();return NextResponse.json({error:'Invalid email or password.'},{status:401});}
 return NextResponse.json({ok:true},{headers:{'Cache-Control':'private, no-store'}});
 }catch{return NextResponse.json({error:'Sign-in is temporarily unavailable.'},{status:503})}
}
