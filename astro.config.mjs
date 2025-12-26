// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  site: 'https://mydigitalharbor.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  redirects: {
    '/flashback-martial-arts': '/harbors/flashback-martial-arts',
    '/caribbean-kings': '/harbors/caribbean-kings',
    '/reveal-fitness': '/harbors/reveal-fitness',
    '/pypeaday': '/harbors/pypeaday',
    '/1man1-band': '/harbors/1man1-band',
    '/mydigitalharbor-xom': '/harbors/mydigitalharbor-xom',
  },
});
