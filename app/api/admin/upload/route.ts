import {adminUser,sameOrigin} from '../../../../lib/admin-auth';
import {serviceSupabase} from '../../../../lib/supabase';
const MAX_BYTES=4*1024*1024;
export async function POST(request:Request){
 if(!await adminUser()||!sameOrigin(request))return Response.json({error:'Admin access required.'},{status:403});
 if(Number(request.headers.get('content-length'))>MAX_BYTES+65536)return Response.json({error:'Choose a photo smaller than 4 MB.'},{status:413});
 try{
 const form=await request.formData();const file=form.get('file');if(!(file instanceof File)||!file.size||file.size>MAX_BYTES)return Response.json({error:'Choose a photo smaller than 4 MB.'},{status:400});
 const bytes=new Uint8Array(await file.arrayBuffer());const png=bytes[0]===137&&bytes[1]===80&&bytes[2]===78&&bytes[3]===71;const jpg=bytes[0]===255&&bytes[1]===216&&bytes[2]===255;const webp=String.fromCharCode(...bytes.slice(0,4))==='RIFF'&&String.fromCharCode(...bytes.slice(8,12))==='WEBP';if(!png&&!jpg&&!webp)return Response.json({error:'Upload a JPG, PNG or WebP photo.'},{status:400});
 const type=png?'image/png':jpg?'image/jpeg':'image/webp';const key=crypto.randomUUID();const {error}=await serviceSupabase().storage.from('offdaya-media').upload(key,bytes,{contentType:type,upsert:false,cacheControl:'86400'});if(error)throw error;
 return Response.json({url:'/api/media/'+key});
 }catch{return Response.json({error:'Upload failed. Check the Supabase storage setup and try again.'},{status:503})}
}
