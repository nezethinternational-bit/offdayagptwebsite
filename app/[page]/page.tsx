import { notFound } from 'next/navigation';
import TravelSite from '../../components/travel-site';
import { listings } from '../../lib/server-catalog';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{page:string}>}){const {page}=await params;if(!['packages','stays','services','contact','about','privacy','terms'].includes(page))notFound();return <TravelSite page={'/'+page} initial={await listings()}/>}
