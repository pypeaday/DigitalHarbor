# Digital Harbor

[![Deploy](https://git.paynepride.com/nic/DigitalHarbor/actions/workflows/deploy-worker.yml/badge.svg?branch=main)](https://git.paynepride.com/nic/DigitalHarbor/actions)

Your complete digital infrastructure — link pages, QR codes, and managed hosting.

🌐 **Live Site:** [mydigitalharbor.com](https://mydigitalharbor.com)
🛠️ **Admin:** [mydigitalharbor.com/_emdash/admin](https://mydigitalharbor.com/_emdash/admin)

## Services

- **Websites** — designed, built, and hosted on Cloudflare's edge
- **Link Pages** — one-page link hubs ("Digital Harbors") at `/harbors/*`
- **QR Code Design** — branded codes + AI-generated artisanal designs
- **Managed Hosting** — updates, uptime, and maintenance handled
- **Notifiq Platform** — notification infrastructure (coming soon)

## Tech Stack

- **Framework:** [Astro](https://astro.build) 7 — SSR (`output: 'server'`) + React islands
- **CMS:** [EmDash](https://emdashcms.com) — collections defined in `seed/seed.json`
- **Styling:** [Tailwind CSS](https://tailwindcss.com) 4 via Vite plugin; `@theme` tokens + components in `src/styles/global.css`
- **Design system:** [`design-system/MASTER.md`](design-system/MASTER.md) — "harbor at night" tokens (Fraunces / Inter / JetBrains Mono)
- **Icons:** [Lucide](https://lucide.dev) (+ Phosphor in React islands)
- **Hosting:** [Cloudflare Workers](https://workers.cloudflare.com) — D1 `mydigitalharbor` (content), R2 `mydigitalharbor-media`, minutely cron
- **Email:** Resend — `/api/contact` stores a `leads` entry and emails it

## Development

```bash
# Install dependencies
npm install

# Local secrets (see .dev.vars.example)
cp .dev.vars.example .dev.vars

# Start dev server (wrangler — full SSR + D1/R2 bindings)
npm run dev

# Build for production
npm run build

# Deploy manually (normally done by CI)
npm run deploy
```

## Project Structure

```
├── src/
│   ├── components/       # SiteCard, SiteNav, ServiceCard, QRGallery, StatusDot, ...
│   ├── data/sites.ts     # Site registry — edit to update the portfolio board
│   ├── layouts/          # BaseLayout, LinkPageLayout
│   ├── lib/devin.ts      # Devin session → live build-status matching
│   ├── pages/            # index, sites, contact, harbors/*, qr/*, /api/contact, /[slug]
│   ├── middleware.ts     # Security headers
│   └── worker.ts         # Worker entry (EmDash handler + scheduled tasks)
├── seed/seed.json        # EmDash schema + seed content (services, leads, pages, menus)
├── design-system/        # MASTER.md — design tokens and rules
├── public/               # images, QR galleries, favicon
└── dist/                 # Build output (deployed as Worker static assets)
```

## Deployment

Push to `main` triggers the Forgejo Actions workflow (`.forgejo/workflows/deploy-worker.yml`):
`npm ci` → `npm run build` → `wrangler deploy`.

No preview deploys on purpose: EmDash auto-runs D1 migrations on first request, so a
preview Worker sharing prod D1 could migrate the live schema. A real preview env needs
separate D1/R2 bindings.

**Secrets:**
- Forgejo CI: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- Runtime (`wrangler secret put` / `.dev.vars`): `EMDASH_ENCRYPTION_KEY`, `RESEND_API_KEY`,
  `DEVIN_API_KEY`, `OPS_KEY`, `OPS_DATA` — see comments in `wrangler.jsonc`

## Contact

📧 [nic@mydigitalharbor.com](mailto:nic@mydigitalharbor.com)
