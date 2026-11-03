-- Run once in a NEW Supabase project's SQL Editor.
create table if not exists public.offdaya_content (
 id text primary key,
 kind text not null check (kind in ('package','stay')),
 status text not null check (status in ('draft','published','archived')),
 payload jsonb not null,
 updated_at timestamptz not null default now(),
 check (payload->>'id'=id),
 check (payload->>'kind'=kind),
 check (payload->>'status'=status)
);
create table if not exists public.offdaya_audit (
 id uuid primary key default gen_random_uuid(),
 actor text not null,
 action text not null,
 entity text not null,
 at timestamptz not null default now()
);
alter table public.offdaya_content enable row level security;
alter table public.offdaya_audit enable row level security;
revoke all on public.offdaya_content,public.offdaya_audit from anon,authenticated;
grant all on public.offdaya_content,public.offdaya_audit to service_role;

create or replace function public.save_offdaya_listing(p_listing jsonb,p_actor text)
returns void language plpgsql security invoker set search_path=public as $$
begin
 insert into public.offdaya_content(id,kind,status,payload,updated_at)
 values(p_listing->>'id',p_listing->>'kind',p_listing->>'status',p_listing,now())
 on conflict(id) do update set kind=excluded.kind,status=excluded.status,payload=excluded.payload,updated_at=excluded.updated_at;
 insert into public.offdaya_audit(actor,action,entity)
 values(p_actor,'save '||(p_listing->>'status'),p_listing->>'id');
end;
$$;
revoke all on function public.save_offdaya_listing(jsonb,text) from public,anon,authenticated;
grant execute on function public.save_offdaya_listing(jsonb,text) to service_role;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('offdaya-media','offdaya-media',false,4194304,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
-- No direct client storage policies: authorised uploads and image retrieval use server routes.
