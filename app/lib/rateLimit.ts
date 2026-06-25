/**
 * In-memory rate limiter — perfetto per un portfolio personale.
 * Per produzione ad alto traffico sostituire con Upstash Redis.
 */

interface RateLimitEntry {
  count: number
  ts: number
}

const ipMap = new Map<string, RateLimitEntry>()

// Pulizia periodica (ogni 5 min) per evitare memory leak
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of ipMap.entries()) {
    if (now - entry.ts > 5 * 60_000) ipMap.delete(ip)
  }
}, 5 * 60_000)

/**
 * @param ip       - IP del richiedente
 * @param limit    - max richieste consentite nella finestra
 * @param windowMs - finestra temporale in ms (default 60s)
 * @returns true se la richiesta è consentita, false se va bloccata
 */
export function rateLimit(
  ip: string,
  limit = 3,
  windowMs = 60_000
): boolean {
  const now = Date.now()
  const entry = ipMap.get(ip)

  if (!entry || now - entry.ts > windowMs) {
    ipMap.set(ip, { count: 1, ts: now })
    return true
  }

  if (entry.count >= limit) return false

  entry.count++
  return true
}