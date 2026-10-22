# StuduRoj website

Website for StuduRoj (Studenten van Roj), built with **Next.js 16**, **Sanity** (content) and **Tailwind CSS**, hosted on **Vercel**. The site is in Dutch.

| Page | URL |
|---|---|
| Home | `/` |
| Over ons | `/over-ons` |
| Activiteiten (with filters + calendar feed `/agenda.ics`) | `/activiteiten` |
| Nieuws + artikelen | `/nieuws`, `/nieuws/[slug]` |
| Lid worden (+ email confirmation) | `/lid-worden`, `/lid-worden/bevestigen` |
| Contact | `/contact` |
| Privacyverklaring | `/privacy` |
| Content editor (Sanity Studio) | `/studio` |

Until Sanity is connected, the site shows the example content from the design. Text in `[brackets]` is a placeholder for the board to fill in.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

Without an email key, form emails are printed in the terminal instead of sent (development only).

Other commands: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run check` (all three).

## Going live, step by step

### 1. Sanity (content)

1. Create a free account and project at [sanity.io/manage](https://www.sanity.io/manage), with a dataset called `production`.
2. Put the project id in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. In the project's **API → CORS origins**, add `http://localhost:3000` and your live URL (for example `https://www.studuroj.nl`), both with **Allow credentials** on.
4. Open `/studio`, log in, and fill in **Website-instellingen** first (name, address, email, KvK). Then the pages, activities, news and board.
5. Invite the other board members under **Members** in sanity.io/manage.

### 2. Email (Resend)

1. Create a free account at [resend.com](https://resend.com) and verify your domain (it gives you DNS records to add).
2. Set `RESEND_API_KEY`, `EMAIL_FROM` (an address on the verified domain) and `EMAIL_TO_BOARD` (where messages and new members go).
3. Set `MEMBERSHIP_TOKEN_SECRET` to a random string: `openssl rand -base64 32`.

### 3. Vercel (hosting)

1. Push this repository to GitHub.
2. At [vercel.com/new](https://vercel.com/new), import the repository. The framework is detected automatically.
3. Add every variable from `.env.example` under **Settings → Environment Variables** (for Production and Preview).
4. Deploy. Then add your own domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it.

### 4. Make edits appear immediately (Sanity webhook)

Pages are pre-built and cached, and refresh by themselves at least once an hour. To make edits appear within seconds:

1. Choose a random secret and set it as `SANITY_REVALIDATE_SECRET` in Vercel (redeploy afterwards).
2. In sanity.io/manage → **API → Webhooks**, create a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Dataset: `production`, trigger on create, update and delete
   - HTTP method: `POST`, and the same **Secret** as above

### 5. Optional extras

- **Newsletter (Brevo):** set `BREVO_API_KEY` and `BREVO_LIST_ID`. With `BREVO_DOI_TEMPLATE_ID` set, subscribers get a confirmation email first (double opt-in, recommended under GDPR).
- **Spam protection (Cloudflare Turnstile):** create a free widget at Cloudflare and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Every form also has a hidden trap field for bots.

## How it works

- **Content:** `src/sanity/schemaTypes` defines what editors can change. `src/lib/content.ts` holds the queries, and `src/lib/fallback.ts` holds the example content shown for anything not yet filled in.
- **Caching:** every Sanity query is cached (`src/sanity/fetch.ts`, using Next.js `"use cache"`) and tagged `sanity`. The webhook clears that tag.
- **Forms:** server actions in `src/lib/forms/actions.ts`. A new member gets an email with an encrypted confirmation link, so no database is needed. After they click it, the board receives the details by email. Personal data is never stored in the CMS.
- **SEO:** page titles and descriptions, canonical URLs, `sitemap.xml`, `robots.txt` (preview deployments are not indexed), a share image, and structured data (Organization, Event, NewsArticle, FAQ).
- **Privacy:** the Geist font is served from the site itself (no Google Fonts requests), and there are no tracking cookies.
- **Design tokens:** colours and fonts live in `src/app/globals.css` (`@theme`).

## Note on Vercel's free plan

Vercel's Hobby plan is meant for non-commercial use. A free student association normally fits. If the association ever starts charging fees or selling tickets through the site, check Vercel's terms (or move to Netlify or Cloudflare Pages, which work with this project as well).
