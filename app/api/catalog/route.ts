import { listings } from '../../../lib/server-catalog';
export async function GET(){try{return Response.json(await listings())}catch{return Response.json({error:'The catalogue is temporarily unavailable. Please contact OFFDAYA.'},{status:503})}}
