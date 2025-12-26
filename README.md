# Digital Harbor

[![☁️ Deploy to Cloudflare Pages](https://github.com/DigitalHarbor7/DigitalHarbor/actions/workflows/cloudflare-pages-deployment.yml/badge.svg)](https://github.com/DigitalHarbor7/DigitalHarbor/actions/workflows/cloudflare-pages-deployment.yml)

Your complete digital infrastructure - link pages, QR codes, and managed hosting.

🌐 **Live Site:** [mydigitalharbor.com](https://mydigitalharbor.com)

## Services

- **Static Site Hosting** - Beautiful, fast-loading link pages ("Digital Harbors")
- **QR Code Design** - Professional branded codes and AI-generated artisanal designs
- **Notifiq Platform** - Notification infrastructure (coming soon)
- **Managed Hosting** - Enterprise-grade hosting at competitive prices

## Tech Stack

- **Framework:** [Astro](https://astro.build) - Static site generator
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Icons:** [Lucide](https://lucide.dev)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/     # Reusable Astro components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global CSS
├── public/
│   ├── harbors/        # Client link pages (static HTML)
│   ├── images/         # Site images
│   └── qr/             # QR code galleries
└── dist/               # Build output (deployed to Cloudflare)
```

## Deployment

Push to `main` triggers automatic deployment via GitHub Actions:
1. Builds Astro site
2. Deploys to Cloudflare Pages
3. Auto-tags version

## Contact

📧 [nic@mydigitalharbor.com](mailto:nic@mydigitalharbor.com)
