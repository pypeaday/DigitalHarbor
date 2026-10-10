**Goal:** Make mydigitalharbor.com a kick-ass storefront for the hosting/services platform.

**Now:** FleetGraph ambient hero shipped (replaces the rejected intro-video idea). ⚠️ SITE DOWN until ~00:00 UTC — D1 free-tier daily row reads exhausted (per-minute cron was the hog). Back automatically at reset, or upgrade to paid plan to fix instantly.

**Done:**
- Recon: Astro 7 SSR on Workers + EmDash CMS (D1 `mydigitalharbor`, R2 media)
- **CUT OVER the domain**: apex+www were still bound to the `mydigitalharbor` Pages project (Astro 5 static) — detached via CF API (wrangler OAuth), deleted stale *.pages.dev CNAMEs (CF global key from terraform-cloudflare-factory/.envrc), attached via `routes` in wrangler.jsonc + wrangler deploy. New site live.
- Screenshots: `npm run shots` → headless Chromium captures all 10 registry sites → `public/images/shots/`; SiteCard renders top-bleed shot (dim→full color on hover)
- README rewritten to reality; obsolete gh-pages.yml removed; mirror.yml keeps GitHub in sync
- Deployed via CLI `npm run deploy` — final version 9acadc27
- Notifiq restored: `svc-notifiq` in seed + prod D1 (`ec_services` + `revisions` rows, published); Bell icon in index.astro; verified on live homepage
- Auto-port: `scripts/free-port.sh` (kernel-assigned bind(0) port) + `scripts/dev.sh` (`npm run dev` → wrangler on a free port, `--inspector-port 0`); `dev:astro` and `just serve` also pick free ports
- FleetGraph.astro: ambient SVG hero — 9 registry sites as nodes (slug+status) on beziers into a rotating dotted hub (studio=hub), SMIL packet pulses both directions, zero JS, masked fade, lg+ only, reduced-motion safe. User rejected psychopomp intro videos as hero ("not busy enough, too dark")
- Preview URLs ENABLED: `preview_urls` + `workers_dev` now in wrangler.jsonc (deploys otherwise DISABLE workers.dev — learned the hard way). `wrangler versions upload` → Version Preview URL. Also needed POST /workers/scripts/{name}/subdomain {"enabled":true,"previews_enabled":true} via terraform global key (OAuth gets 10405)
- **INCIDENT: D1 free-tier daily row-read limit hit → all SSR returns HTTP 200 with EMPTY body** (stream starts, throws mid-render). Symptom signature: 200 + 0 bytes on every page, assets fine. Diagnose via `wrangler tail`. Cause: EVERY EmDash site on the shared nicpayne713 account ran `* * * * *` crons (~4,300 invocations/day × table scans) + per-request CMS reads. Resets midnight UTC.
- **Fleet-wide cron fix (2026-10-08):** live schedules PUT to `7 * * * *` on mydigitalharbor + jacobs + vans + 1man1band (nicpayne713, via terraform global key — schedules PUT needs bare-array body) and hofackers-website (own acct, via repo .envrc deploy token). wrangler.jsonc updated + committed in all 4 sibling repos so redeploys don't regress. olivet-emdash already */15 (own acct, fine). reveal has no cron + vault-locked .envrc (direnv needed). power-washing/sites: no cron. Durable fix TODO: edge-cache SSR (EmDash Astro.cache/cacheHint) + consider paid plan
- Content model: pages, services, linkpages (→ /harbors/*), leads, site_content singleton, primary menu — all in seed/seed.json
- Lead funnel: /contact → /api/contact → D1 `leads` + Resend email (honeypot, plugin-free for free plan)
- Live-status: Devin API sessions matched to SITES registry, 60s edge cache; OPS_KEY unlocks ops details
- Design system documented in design-system/MASTER.md ("harbor at night": abyss/brass/signal, Fraunces/Inter/JB Mono)
- Deploy: Forgejo workflow on `main` only → wrangler deploy. GHA dir empty.

**Risks/gaps found:**
- `emdash` branch is local-only, main is 4 commits behind (old static site) — live site was deployed by hand, CI isn't the source of truth
- README stale: still says static Astro + Cloudflare Pages + GitHub Actions
- 3 untracked media files at root (2 intro mp4s ~15MB, voice-only.m4a) — psychopomp renders, no home yet
- Portfolio cards are text-only — no screenshots; biggest visual upgrade candidate
- No /services page (nav anchor only), no pricing, no testimonials
- Legacy dirs still in repo: website/ (old static harbors), streamlit/ (empty), terraform/

**Parked:**
- Legacy dir cleanup (website/, streamlit/, terraform/)
- Intro video in hero (digital-harbor-intro-chatterbox.mp4)
- CF token consolidation task (user noted): audit Forgejo repo secrets + local env files, standardize on one scoped token per account — then CI deploys actually work everywhere
- /services + pricing pages, testimonials
- wip/blog-feature branch exists — possibly revive later

**Decisions:**
- wrangler deploy reads the GENERATED config (dist/server/wrangler.json) — edit wrangler.jsonc then REBUILD before deploy or routes silently don't apply
- wrangler OAuth token: can deploy + Pages domain ops, but NOT workers/domains POST or DNS records — use terraform-cloudflare-factory/.envrc global key for those
- MCP cloudflare-api: read-only for most things (9109/10000 on mutations); fine for discovery
- Rollback path: old Pages project still serves at mydigitalharbor.pages.dev
- Port 8787 locally is squatted by the Collie app — solved permanently via scripts/free-port.sh
- CMS content lives in `ec_<collection>` tables + `revisions` (entry_id FK); prod edits = SQL via `wrangler d1 execute --remote` — seed.json changes do NOT propagate to existing prod data
- Design skill: ui-ux-pro-max-skill (palettes/styles/patterns) + prototype skill for layout experiments; psychopomp already made the intro clips
- Remote fixed: origin was git@ghost (nic shell key) → now ssh://git-ghost (git user, ed25519)
- gh-pages.yml deleted — obsolete static pipeline, was failing every push; mirror.yml keeps GitHub in sync
- CLOUDFLARE_ACCOUNT_ID secret set via Forgejo API; CLOUDFLARE_API_TOKEN must be created by user (MCP OAuth can't mint tokens)
- Forgejo MCP/REST don't expose job logs (v13) — diagnosing CI via secrets + local repro instead
