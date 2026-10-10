/// <reference path="../.astro/types.d.ts" />

interface Env {
  DEVIN_API_KEY?: string;
  DEVIN_API_BASE?: string;
  OPS_KEY?: string;
  OPS_DATA?: string;
  EMDASH_ENCRYPTION_KEY?: string;
  RESEND_API_KEY?: string;
  LEADS_TO_EMAIL?: string;
  LEADS_FROM_EMAIL?: string;
  DB?: D1Database;
  MEDIA?: R2Bucket;
  SESSION?: KVNamespace;
  ASSETS?: Fetcher;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
