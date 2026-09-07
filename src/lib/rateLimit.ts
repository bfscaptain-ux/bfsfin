// In-memory sliding-window IP rate limiter

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const ipMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leak
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    ipMap.forEach((record, ip) => {
      if (now > record.resetTime) {
        ipMap.delete(ip);
      }
    });
  }, 5 * 60 * 1000);
}

export function checkRateLimit(
  ip: string,
  maxRequests: number = 15,
  windowMs: number = 60 * 1000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = ipMap.get(ip);

  if (!record || now > record.resetTime) {
    ipMap.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: now + windowMs,
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) {
    return cfIp.trim();
  }
  return "127.0.0.1";
}
