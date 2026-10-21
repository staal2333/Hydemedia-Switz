/**
 * Sliding-window rate limiter for the public API routes.
 *
 * Deliberately dependency-free and in-memory: the site has no KV store, and a
 * limiter that works today beats one that waits on an account being created.
 *
 * The trade-off is worth stating plainly. State lives in one serverless
 * instance, so a burst from a single source hitting a warm instance is caught,
 * while a distributed flood or a stream of cold starts is not. That covers
 * scripted abuse of a contact form, which is the actual threat here. For a
 * hard guarantee, back `hit()` with Vercel KV or Upstash and keep the same
 * signature — nothing at the call sites needs to change.
 */

interface Bucket {
  /** Timestamps of requests still inside the window. */
  hits: number[];
  /** Last touch, used to evict idle keys. */
  seen: number;
}

const buckets = new Map<string, Bucket>();

/** Bounds memory if a flood arrives with many distinct keys. */
const MAX_KEYS = 10_000;

export interface RateLimitResult {
  ok: boolean;
  limit: number;
  remaining: number;
  /** Seconds until the caller may retry. Zero when `ok`. */
  retryAfter: number;
}

export interface RateLimitOptions {
  /** Requests permitted inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

/**
 * Records a request against `key` and reports whether it is allowed.
 * Call once per request — it mutates state.
 */
export function hit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const cutoff = now - windowMs;

  // Evict wholesale rather than tracking LRU; keys are cheap to rebuild.
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) {
      if (b.seen < cutoff) buckets.delete(k);
    }
    if (buckets.size > MAX_KEYS) buckets.clear();
  }

  const bucket = buckets.get(key) ?? { hits: [], seen: now };
  bucket.hits = bucket.hits.filter((t) => t > cutoff);
  bucket.seen = now;

  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0];
    return {
      ok: false,
      limit,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { ok: true, limit, remaining: limit - bucket.hits.length, retryAfter: 0 };
}

/**
 * Client address for a request behind Vercel's proxy. Falls back to a shared
 * bucket when no header is present, which throttles rather than lets through.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}

/** Headers describing the caller's remaining budget. */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    'RateLimit-Limit': String(result.limit),
    'RateLimit-Remaining': String(result.remaining),
  };
  if (!result.ok) headers['Retry-After'] = String(result.retryAfter);
  return headers;
}
