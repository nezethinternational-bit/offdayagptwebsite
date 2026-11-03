import TravelSite from '../components/travel-site';
import { listings } from '../lib/server-catalog';
export const dynamic='force-dynamic';
export default async function Page(){return <TravelSite page="/" initial={await listings()}/>}
