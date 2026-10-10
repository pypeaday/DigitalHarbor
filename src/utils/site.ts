import { getEmDashEntry } from 'emdash';

/**
 * The `site` singleton from the site_content collection.
 * Falls back to defaults when the collection isn't seeded yet.
 */
export async function getSiteContent() {
  const { entry } = await getEmDashEntry('site_content', 'site');
  const d = (entry?.data ?? {}) as Record<string, string | undefined>;
  return {
    title: d.title ?? 'Digital Harbor',
    hero_headline: d.hero_headline,
    hero_subtext: d.hero_subtext,
    email: d.email ?? 'nic@mydigitalharbor.com',
    location: d.location ?? '41.25°N — Fox Cities, Wisconsin',
    github: d.github,
    announcement: d.announcement,
  };
}
