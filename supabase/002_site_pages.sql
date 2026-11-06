create table if not exists public.offdaya_pages (
  path text primary key check (path in ('/', '/packages', '/stays', '/services', '/contact', '/about', '/privacy', '/terms')),
  content jsonb not null check (jsonb_typeof(content) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.offdaya_pages enable row level security;
revoke all on public.offdaya_pages from public, anon, authenticated;
grant select, insert, update on public.offdaya_pages to service_role;
