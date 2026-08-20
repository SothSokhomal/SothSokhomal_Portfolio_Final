interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 3; // 3 requests per hour per IP

/**
 * In-memory sliding window rate limiter
 */
export function checkRateLimit(ip: string): { success: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Filter timestamps within the current sliding window
  const validTimestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (validTimestamps.length >= MAX_REQUESTS) {
    const oldestTimestamp = validTimestamps[0];
    const resetMs = oldestTimestamp + WINDOW_MS - now;
    return {
      success: false,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: validTimestamps });

  // Periodically clean up stale IP entries every 100 requests
  if (rateLimitMap.size > 500) {
    for (const [key, rec] of rateLimitMap.entries()) {
      const active = rec.timestamps.filter((ts) => ts > windowStart);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      }
    }
  }

  return {
    success: true,
    remaining: MAX_REQUESTS - validTimestamps.length,
    resetMs: WINDOW_MS,
  };
}
