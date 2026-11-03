# Verification

## Completed

- Production `npm run build` succeeded using Next.js 16.4.4 and Node 22.
- `npm run typecheck` passed.
- Public Home, Packages, Stays, Contact, About and Classic Kashmir routes returned HTTP 200.
- With no backend configuration, the public catalogue shows the included baseline and admin shows setup instructions; it does not pretend to save data.
- Forged headers from the previous hosting platform do not grant admin access.
- Production routes were tested against a local mock Supabase HTTP API: successful login and HTTP-only cookies, wrong-password rejection, protected admin access, draft/publish/archive persistence, cross-origin write rejection, photo upload and retrieval, invalid-file rejection and logout.
- Source was checked for Cloudflare, Vinext and ChatGPT authentication dependencies; none remain in application code.
- No actual API keys, admin passwords, runtime data, build files or dependency folders are included in the source archive.

## Not yet verified against live accounts

- Supabase project creation, SQL application and actual Supabase authentication/storage policies.
- A real admin login with booking.offdaya@gmail.com.
- GitHub remote repository creation and push.
- Vercel deployment and custom-domain migration.
- Browser visual QA on the new Vercel deployment.

The mock tests exercise the application's integration behaviour; they are not a substitute for the live setup checklist in README.md.
