# OFFDAYA website and admin for Vercel

A standalone Next.js project for a **new GitHub repository**. Includes the latest OFFDAYA design, three package stories, six Kerala stay destinations, supplied Kashmir travel photos and an admin editor. It does not use ChatGPT login, Cloudflare Workers, D1 or R2.

## 1. Create a new Supabase project

1. Create a Supabase project in your own account. Keep the database password private.
2. Open **SQL Editor**, paste the entire contents of `supabase/001_setup.sql`, and run it once in this new project.
3. In **Authentication → Users**, choose **Add user → Create new user**. Create `adnan@offdaya.in` with a strong password you choose, and mark the email confirmed. Do not paste this password into chat or code.
4. Disable public email signups in your Supabase authentication settings; this website has no signup form.
5. Find the project URL, publishable key and server secret key in the project's API/Connect settings. The legacy service-role key is also supported as `SUPABASE_SERVICE_ROLE_KEY` instead of `SUPABASE_SECRET_KEY`.

The SQL creates two application tables and a private `offdaya-media` storage bucket. Database writes and photo uploads go through verified admin-only server routes. An anonymous visitor cannot directly read the database tables or upload to storage. Images attached to the public website are served through `/api/media/<id>`.

## 2. Create the new GitHub repository

Suggested name: **offdaya-vercel**. Use a private repository unless you deliberately want the source and included photos public.

Unzip the delivered source package. Upload the **contents of the project folder** so `package.json`, `app`, `components`, `lib`, `public` and `supabase` are at the repository root. Include `.env.example` and `.gitignore`, but never upload an actual `.env.local` file. Do not upload `node_modules`, `.next` or the ZIP itself as the website.

If using Git locally after adding the new GitHub remote:

```sh
git remote add origin https://github.com/YOUR_ACCOUNT/offdaya-vercel.git
git push -u origin main
```

No GitHub account or remote repository is created by unzipping these files.

## 3. Import the repository into Vercel

1. Choose **Add New → Project** and import the new GitHub repository.
2. Framework: **Next.js**. Root directory: the repository root.
3. Node.js: **22.x**. Build command: `npm run build`. Leave the output directory at the Next.js default.
4. Add these environment variables for Production and Preview:

| Name | Value |
| --- | --- |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_PUBLISHABLE_KEY` | Your publishable API key |
| `SUPABASE_SECRET_KEY` | Your server secret API key; mark sensitive |
| `ADMIN_EMAIL` | `adnan@offdaya.in` |
| `SITE_URL` | Your final HTTPS website origin, with no trailing slash |

Never prefix the server secret with `NEXT_PUBLIC_`. Never put a key or password in a GitHub file. Deploy again after changing environment variables. While testing, set `SITE_URL` to the new Vercel production URL; update it when the custom domain moves.

5. Deploy. Open `/admin`, which redirects to `/admin/login`. Sign in with your Supabase admin email and the password **you created in step 1**. This is independent from your ChatGPT password and Vercel password.

## 4. Check the complete admin workflow

Before moving the domain:

- Sign in, sign out and confirm a signed-out visitor cannot access `/api/admin/catalog`.
- Create a draft package; confirm it is absent from `/packages`.
- Upload a JPG, PNG or WebP image smaller than **4 MB**.
- Edit the story, price, photo order and itinerary. Save and reload to confirm persistence.
- Publish the package and confirm it appears publicly; archive it and confirm it disappears.
- Check the contact, WhatsApp, Instagram and email links on mobile and desktop.

The 4 MB upload limit stays below Vercel's function request-size limit including multipart overhead. Photos are stored in Supabase, not the temporary filesystem of a serverless function.

## 5. Move offdaya.in after testing

Keep the existing website and domain configuration until the new deployment passes these checks. Then add the domain to the new Vercel project and follow Vercel's exact domain instructions. Do not remove the old project first. Existing admin edits and uploads from the earlier Cloudflare-backed site do not transfer automatically; the included package and photo baseline is carried into this project.

## Local development

```sh
npm ci
```

Copy `.env.example` to `.env.local` and enter your own project values, then:

```sh
npm run dev
```

Without Supabase settings, the public website displays the included package baseline and `/admin/login` explains the required setup. Login, saving and uploads remain disabled until Supabase is configured. When configured, a database outage is shown as an error rather than silently discarding saved changes.

## Admin scope

The editor controls package/stay listings, prices, visibility, cover photos, gallery order, summaries, story headings, long introductions and individual itinerary days. General homepage layout, About copy, contact information and decorative banners remain code-managed. Package images shown on the homepage follow listing/gallery choices. No payment checkout or confirmed booking engine is included.

## Reference documentation

- [Vercel Git deployment](https://vercel.com/docs/git)
- [Supabase server-side sessions](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Vercel function request limits](https://vercel.com/docs/functions/limitations)

## Verification status

See `VERIFICATION.md` for the checks completed when this package was prepared. Live Supabase provisioning, real-user sign-in, Vercel deployment and domain migration require your connected accounts and are separate from local build verification.
