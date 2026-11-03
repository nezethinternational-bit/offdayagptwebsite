import { notFound } from 'next/navigation';
import TravelSite from '../../../components/travel-site';
import { listings } from '../../../lib/server-catalog';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{page:string;slug:string}>}){const {page,slug}=await params;const initial=await listings();if(!['packages','stays'].includes(page)||!initial.some(x=>x.id===slug&&x.kind===(page==='stays'?'stay':'package')))notFound();return <TravelSite page={'/'+page} slug={slug} initial={initial}/>}
