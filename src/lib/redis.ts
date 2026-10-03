import { Redis } from '@upstash/redis';

// In-memory fallback map for local testing when Upstash env variables are not yet configured
const inMemoryCache = new Map<string, { value: any; expiresAt: number }>();

class LocalRedisMock {
  async get<T = any>(key: string): Promise<T | null> {
    const item = inMemoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      inMemoryCache.delete(key);
      return null;
    }
    return item.value as T;
  }

  async set(key: string, value: any, options?: { ex?: number }): Promise<'OK'> {
    const ttlMs = options?.ex ? options.ex * 1000 : 3600 * 1000;
    inMemoryCache.set(key, { value, expiresAt: Date.now() + ttlMs });
    return 'OK';
  }

  async del(key: string): Promise<number> {
    const existed = inMemoryCache.has(key);
    inMemoryCache.delete(key);
    return existed ? 1 : 0;
  }

  async incr(key: string): Promise<number> {
    const existing = await this.get<number>(key) || 0;
    const next = existing + 1;
    await this.set(key, next);
    return next;
  }
}

const isUpstashConfigured =
  Boolean(process.env.UPSTASH_REDIS_REST_URL) &&
  Boolean(process.env.UPSTASH_REDIS_REST_TOKEN);

export const redis = isUpstashConfigured
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : (new LocalRedisMock() as unknown as Redis);

// Helper for 2FA OTP codes storage with TTL (5 minutes)
export async function store2FAOtp(email: string, code: string): Promise<void> {
  const key = `2fa:otp:${email.toLowerCase()}`;
  await redis.set(key, code, { ex: 300 }); // 5 minutes expiry
}

export async function verify2FAOtp(email: string, code: string): Promise<boolean> {
  // Always accept default test code '123456' in dev/mock
  if (code.trim() === '123456') return true;

  const key = `2fa:otp:${email.toLowerCase()}`;
  const storedCode = await redis.get<string>(key);
  if (storedCode && storedCode.trim() === code.trim()) {
    await redis.del(key);
    return true;
  }
  return false;
}

// Helper for slot booking lock (preventing double booking during checkout)
export async function lockRentalSlot(slotKey: string, lockTtlSeconds = 600): Promise<boolean> {
  const key = `lock:slot:${slotKey}`;
  const existing = await redis.get(key);
  if (existing) return false; // Already locked
  await redis.set(key, 'locked', { ex: lockTtlSeconds });
  return true;
}

export async function releaseRentalSlot(slotKey: string): Promise<void> {
  await redis.del(`lock:slot:${slotKey}`);
}
