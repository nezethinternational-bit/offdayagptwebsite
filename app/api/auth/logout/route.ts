import {NextResponse} from 'next/server';
import {sameOrigin} from '../../../../lib/admin-auth';
import {authConfigured,sessionSupabase} from '../../../../lib/supabase';
export async function POST(request:Request){if(!sameOrigin(request))return new Response('Forbidden',{status:403});if(authConfigured()){const supabase=await sessionSupabase();await supabase.auth.signOut();}return NextResponse.redirect(new URL('/admin/login',request.url),303);}
