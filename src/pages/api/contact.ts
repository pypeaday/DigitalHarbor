// POST /api/contact — lead intake. Stores a `leads` entry and emails it
// via Resend. Deliberately plugin-free: works on the Workers free plan
// where sandboxed plugins are disabled.
import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { ContentRepository } from 'emdash';
import { getDb } from 'emdash/runtime';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PROJECT_TYPES = new Set([
  'website',
  'maintenance',
  'linkpage',
  'qr',
  'other',
]);

async function sendLeadEmail(
  env: Env,
  lead: { name: string; email: string; business: string; type: string; message: string },
) {
  if (!env.RESEND_API_KEY) return;
  const to = env.LEADS_TO_EMAIL ?? 'nic@mydigitalharbor.com';
  const from = env.LEADS_FROM_EMAIL ?? 'Digital Harbor <harbor@mydigitalharbor.com>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New lead: ${lead.business || lead.name} (${lead.type})`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Business: ${lead.business || '—'}`,
        `Type: ${lead.type}`,
        '',
        lead.message,
      ].join('\n'),
    }),
  });
  if (!res.ok) {
    console.error('resend failed', res.status, (await res.text()).slice(0, 300));
  }
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const fd = await request.formData();
  const ret = '/contact';

  // Honeypot: pretend success, store nothing.
  if (String(fd.get('_hp') ?? '')) return redirect(`${ret}?submitted=1`, 303);

  const name = String(fd.get('name') ?? '').trim().slice(0, 200);
  const email = String(fd.get('email') ?? '').trim().slice(0, 200);
  const business = String(fd.get('business') ?? '').trim().slice(0, 200);
  const type = String(fd.get('project_type') ?? 'other');
  const message = String(fd.get('message') ?? '').trim().slice(0, 4000);

  if (!name || !EMAIL_RE.test(email) || !message) {
    return redirect(`${ret}?error=required`, 303);
  }
  const projectType = PROJECT_TYPES.has(type) ? type : 'other';
  const now = new Date().toISOString();

  const db = await getDb();
  const repo = new ContentRepository(db);
  await repo.create({
    type: 'leads',
    data: {
      title: `${business || name} — ${projectType}`,
      name,
      email,
      business,
      project_type: projectType,
      message,
      lead_status: 'new',
      submitted_at: now,
      source: 'contact-form',
    },
    status: 'published',
    publishedAt: now,
  });

  // Conversion signal for SigNoz — JSON body, PII-free (type=lead).
  console.log(
    JSON.stringify({
      type: 'lead',
      project_type: projectType,
      source: 'contact-form',
      site: 'mydigitalharbor',
    }),
  );

  await sendLeadEmail(env, { name, email, business, type: projectType, message });

  return redirect(`${ret}?submitted=1`, 303);
};
