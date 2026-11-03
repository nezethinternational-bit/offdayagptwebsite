import {redirect} from 'next/navigation';
import {adminUser} from '../../lib/admin-auth';
import {backendConfigured} from '../../lib/supabase';
import AdminPanel from '../../components/admin-panel';
import {listings} from '../../lib/server-catalog';
export const dynamic='force-dynamic';
export default async function Page(){if(!backendConfigured())redirect('/admin/login');const user=await adminUser();if(!user)redirect('/admin/login');return <AdminPanel initial={await listings(true)} email={user.email}/>}
