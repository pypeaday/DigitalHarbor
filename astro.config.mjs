// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { d1, r2 } from '@emdash-cms/cloudflare';
import emdash from 'emdash/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [
    react(),
    emdash({
      siteUrl:
        process.env.EMDASH_SITE_URL ?? 'https://mydigitalharbor.com',
      database: d1({ binding: 'DB', session: 'auto' }),
      storage: r2({ binding: 'MEDIA' }),
      plugins: [],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://mydigitalharbor.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
