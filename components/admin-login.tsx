'use client';
import {useState} from 'react';
export default function AdminLogin(){
 const [busy,setBusy]=useState(false);const [error,setError]=useState('');
 async function signIn(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();setBusy(true);setError('');
  const form=new FormData(event.currentTarget);
  try{
   const response=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:form.get('email'),password:form.get('password')})});
   const result=await response.json();
   if(!response.ok)throw new Error(result.error||'Sign-in failed.');
   window.location.assign('/admin');
  }catch(error){setError(error instanceof Error?error.message:'Sign-in failed. Please try again.');setBusy(false);}
 }
 return <form className="vercel-login-form" onSubmit={signIn}>
  <label>Admin email<input name="email" type="email" required autoComplete="username" defaultValue="adnan@offdaya.in"/></label>
  <label>Password<input name="password" type="password" required minLength={8} maxLength={256} autoComplete="current-password"/></label>
  {error&&<p role="alert" className="login-error">{error}</p>}
  <button className="button" disabled={busy}>{busy?'Signing in…':'Sign in to OFFDAYA'} ↗</button>
  <p className="fineprint">Use the password set for your OFFDAYA admin user in Supabase. For a reset, use Supabase Authentication → Users.</p>
 </form>;
}
