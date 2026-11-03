import {redirect} from 'next/navigation';
import {adminUser} from '../../../lib/admin-auth';
import {backendConfigured} from '../../../lib/supabase';
import AdminLogin from '../../../components/admin-login';
export const dynamic='force-dynamic';
export default async function Page(){if(await adminUser())redirect('/admin');return <div className="admin-login"><a className="logo" href="/">offdaya<span>CONTENT STUDIO</span></a><h1>Your next great escape<br/>starts behind the scenes.</h1>{backendConfigured()?<><p>Manage packages, itineraries, stays and photos with your OFFDAYA admin account.</p><AdminLogin/></>:<div className="setup-notice"><h2>Admin setup is required</h2><p>The website preview is available. To enable admin login, saving and uploads, connect Supabase using the environment variables and SQL setup in the project README.</p><p>No admin password has been created automatically.</p></div>}<a href="/">← Back to website</a></div>}
