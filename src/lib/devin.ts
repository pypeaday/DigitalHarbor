import type { Site } from '../data/sites';
import type { OpsInfo } from '../data/sites';

export interface DevinSession {
  session_id: string;
  title?: string | null;
  status?: string;
  status_enum?: string | null;
  updated_at: string;
  created_at: string;
  tags?: string[] | null;
  pull_request?: { url: string } | null;
}

export interface SessionHit {
  title: string | null | undefined;
  status?: string;
  status_enum?: string | null;
  updated_at: string;
  url: string;
  pr: string | null;
}

export type SiteSessions = Record<string, SessionHit[]>;
export type OpsMap = Record<string, OpsInfo>;

export function matchSessions(
  sessions: DevinSession[],
  sites: Site[],
): SiteSessions {
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
  const out: SiteSessions = {};
  for (const site of sites) {
    const match = site.devin?.match;
    if (!match?.length) continue;
    const needles = match.map((m) => m.toLowerCase());
    const hits = sorted.filter((s) => {
      const hay = `${s.title ?? ''} ${(s.tags ?? []).join(' ')}`.toLowerCase();
      return needles.some((n) => hay.includes(n));
    });
    if (hits.length) {
      out[site.slug] = hits.slice(0, 3).map((s) => ({
        title: s.title,
        status: s.status,
        status_enum: s.status_enum,
        updated_at: s.updated_at,
        url: `https://app.devin.ai/sessions/${s.session_id}`,
        pr: s.pull_request?.url ?? null,
      }));
    }
  }
  return out;
}

/**
 * Fetch Devin sessions and match them to sites. Cached 60s at the edge.
 * Returns an empty map when no key is configured or the API errors —
 * callers should degrade to static rendering.
 */
export async function getSiteSessions(
  env: Env,
  ctx: ExecutionContext | undefined,
  sites: Site[],
): Promise<SiteSessions> {
  if (!env.DEVIN_API_KEY) return {};

  const cacheKey = new Request('https://dh.internal/__devin_cache');
  try {
    const hit = await caches.default.match(cacheKey);
    if (hit) return (await hit.json()) as SiteSessions;
  } catch {
    // caches.default unavailable outside worker runtime — continue uncached
  }

  const base = env.DEVIN_API_BASE ?? 'https://api.devin.ai/v1';
  try {
    const res = await fetch(`${base}/sessions?limit=100`, {
      headers: { authorization: `Bearer ${env.DEVIN_API_KEY}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return {};
    const data = (await res.json()) as { sessions?: DevinSession[] };
    const matched = matchSessions(data.sessions ?? [], sites);

    const body = new Response(JSON.stringify(matched), {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60',
      },
    });
    try {
      (ctx ?? { waitUntil: (p: Promise<unknown>) => p }).waitUntil(
        caches.default.put(cacheKey, body),
      );
    } catch {
      // no cache runtime — fine
    }
    return matched;
  } catch {
    return {};
  }
}

/** OPS_DATA is a JSON secret: { "<slug>": OpsInfo }. Empty when unset/invalid. */
export function getOpsMap(env: Env): OpsMap {
  if (!env.OPS_DATA) return {};
  try {
    const parsed = JSON.parse(env.OPS_DATA);
    return parsed && typeof parsed === 'object' ? (parsed as OpsMap) : {};
  } catch {
    return {};
  }
}

/** Ops details render only with ?key=<OPS_KEY> and only when OPS_KEY is set. */
export function opsAllowed(env: Env, url: URL): boolean {
  return !!env.OPS_KEY && url.searchParams.get('key') === env.OPS_KEY;
}

export function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return `${Math.floor(d / 30)}mo ago`;
}
