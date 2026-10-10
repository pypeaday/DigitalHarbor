// The site registry — this is the file you edit to keep the board current.
// PUBLIC data only: this file is mirrored to a public GitHub repo and shipped
// in the client bundle. Ops details (account IDs, worker names, repo paths)
// live in the OPS_DATA secret — never in this file.

export type SiteStatus = 'live' | 'building' | 'paused' | 'planned';

export interface DevinLink {
  label: string;
  url: string;
}

export interface OpsInfo {
  accountName: string;
  accountId: string;
  worker: string;
  factoryDir?: string;
  repoPath?: string;
  notes?: string;
}

export interface Site {
  slug: string;
  name: string;
  client?: string;
  group: 'clients' | 'lab';
  /** Built to dogfood the process — not a client relationship. */
  demo?: boolean;
  status: SiteStatus;
  tagline: string;
  stack: string[];
  url?: string;
  adminUrl?: string;
  repo?: string;
  domain?: { host: string; state: 'pending' | 'live' };
  /** Homepage screenshot shown on the card — captured via scripts/capture-shots.sh. */
  shot?: string;
  /** HEAD-ish reachability probe rendered client-side (no-cors). */
  check?: boolean;
  devin?: {
    /** Substrings matched (case-insensitive) against session titles + tags. */
    match: string[];
    /** Static fallback links, always rendered. */
    links?: DevinLink[];
  };
}

export const SITES: Site[] = [
  {
    slug: 'olivet',
    name: 'Olivet Bible Church',
    client: 'Olivet Bible Church',
    group: 'clients',
    status: 'building',
    tagline:
      'Sermons, events, and ministries for a Fox Valley church — updated by the church office, no tech skills needed.',
    stack: ['astro', 'workers', 'd1', 'r2', 'access'],
    url: 'https://olivet-website.olivetbiblechurch.workers.dev',
    shot: '/images/shots/olivet.jpg',
    adminUrl: 'https://olivet-website.olivetbiblechurch.workers.dev/admin',
    domain: { host: 'olivetbiblechurch.org', state: 'pending' },
    check: true,
    devin: { match: ['olivet'] },
  },
  {
    slug: 'olivet-emdash',
    name: 'Olivet Bible Church — new version',
    client: 'Olivet Bible Church',
    group: 'clients',
    status: 'building',
    tagline:
      'A rebuilt version of the church site we\'re evaluating — even simpler editing for the office.',
    stack: ['emdash', 'astro', 'workers', 'd1', 'r2', 'kv'],
    url: 'https://olivet-emdash.olivetbiblechurch.workers.dev',
    shot: '/images/shots/olivet-emdash.jpg',
    adminUrl: 'https://olivet-emdash.olivetbiblechurch.workers.dev/_emdash/admin',
    check: true,
    devin: { match: ['olivet', 'emdash'] },
  },
  {
    slug: 'reveal',
    name: 'Reveal Fitness',
    client: 'Reveal Fitness',
    group: 'clients',
    status: 'building',
    tagline:
      'Services, weekly class schedule, testimonials, and booking forms for a fitness studio.',
    stack: ['emdash', 'astro', 'workers', 'd1', 'r2', 'turnstile'],
    url: 'https://reveal-fitness-website.revealfitness.workers.dev',
    shot: '/images/shots/reveal.jpg',
    adminUrl: 'https://reveal-fitness-website.revealfitness.workers.dev/_emdash/admin',
    check: true,
    devin: { match: ['reveal'] },
  },
  {
    slug: 'jacobs',
    name: "Jacob's Meat Market",
    client: "Jacob's Meat Market",
    group: 'clients',
    demo: true,
    status: 'building',
    tagline:
      'Weekly specials, lunch menu, and a gallery for a downtown butcher shop.',
    stack: ['emdash', 'astro', 'workers', 'd1', 'r2'],
    url: 'https://jacobs-meat-market-website.nicpayne713.workers.dev',
    shot: '/images/shots/jacobs.jpg',
    adminUrl: 'https://jacobs-meat-market-website.nicpayne713.workers.dev/_emdash/admin',
    domain: { host: 'jacobsmeatmarket.com', state: 'pending' },
    check: true,
    devin: { match: ['jacob', 'meat-market', 'meat market'] },
  },
  {
    slug: 'hofackers',
    name: 'Hofackers Farm',
    client: 'Hofackers Farm',
    group: 'clients',
    demo: true,
    status: 'building',
    tagline:
      'An orchard and farm site — with field-trip booking built in.',
    stack: ['emdash', 'astro', 'workers', 'd1', 'r2', 'kv'],
    url: 'https://hofackers-website.hofackersfarm.workers.dev',
    shot: '/images/shots/hofackers.jpg',
    adminUrl: 'https://hofackers-website.hofackersfarm.workers.dev/_emdash/admin',
    domain: { host: 'hhorchard.com', state: 'pending' },
    check: true,
    devin: { match: ['hofacker', 'hhorchard', 'orchard'] },
  },
  {
    slug: 'power-washing',
    name: 'Good Works Power Washing',
    client: 'Good Works Power Washing',
    group: 'clients',
    status: 'live',
    tagline:
      'Services and a quote-request form that lands right in the owner\'s inbox.',
    stack: ['workers', 'static', 'resend'],
    url: 'https://gdwrks.com',
    shot: '/images/shots/power-washing.jpg',
    domain: { host: 'gdwrks.com', state: 'live' },
    check: true,
    devin: { match: ['power-washing', 'power washing', 'good works', 'gdwrks'] },
  },
  {
    slug: 'vans-construction',
    name: '711 Custom Home Designs',
    client: '711 Custom Home Designs',
    group: 'clients',
    status: 'building',
    tagline:
      'Services, design portfolio, and contact forms for a custom home designer.',
    stack: ['emdash', 'astro', 'workers', 'd1', 'r2'],
    url: 'https://vans-construction-website.nicpayne713.workers.dev',
    shot: '/images/shots/vans-construction.jpg',
    adminUrl: 'https://vans-construction-website.nicpayne713.workers.dev/_emdash/admin',
    check: true,
    devin: { match: ['van', 'construction', '711', 'custom home'] },
  },

  {
    slug: 'mydigitalharbor',
    name: 'My Digital Harbor',
    group: 'lab',
    status: 'live',
    tagline:
      "The studio itself — this site. Link-page 'harbors', QR galleries, and the living portfolio.",
    stack: ['astro', 'workers', 'emdash', 'd1', 'r2'],
    url: 'https://mydigitalharbor.com',
    shot: '/images/shots/mydigitalharbor.jpg',
    repo: 'https://github.com/pypeaday/DigitalHarbor',
    domain: { host: 'mydigitalharbor.com', state: 'live' },
    check: true,
    devin: {
      match: ['digitalharbor', 'digital harbor', 'mydigitalharbor', '1man1band'],
    },
  },
  {
    slug: 'notifiq',
    name: 'Notifiq',
    group: 'lab',
    status: 'live',
    tagline:
      'Our own product — a notification and events platform.',
    stack: ['pages', 'fastapi', 'monorepo'],
    url: 'https://notifiq.net',
    shot: '/images/shots/notifiq.jpg',
    domain: { host: 'notifiq.net', state: 'live' },
    check: true,
    devin: { match: ['notifiq', 'soonish'] },
  },
  {
    slug: 'pype-dev',
    name: 'pype.dev',
    group: 'lab',
    status: 'live',
    tagline: 'A personal blog — homelab, tech, and faith.',
    stack: ['blog'],
    url: 'https://pype.dev',
    shot: '/images/shots/pype-dev.jpg',
    check: true,
    devin: { match: ['pype'] },
  },
];
