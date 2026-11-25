import fs from 'fs/promises';
import path from 'path';

const limitFilePath = path.join(process.cwd(), 'src', 'data', 'otp-limits.json');
const TEN_MINUTES_MS = 10 * 60 * 1000;
const MAX_OTP_PER_WINDOW = 2;

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds?: number;
  retryAfterMinutes?: number;
  error?: string;
}

/**
 * Check and record an OTP dispatch attempt for a mobile number.
 * Strictly limits to at most 2 OTP requests per mobile number in any 10-minute window.
 */
export async function checkPhoneOtpRateLimit(mobile: string | number): Promise<RateLimitResult> {
  const digits = String(mobile).replace(/\D/g, '');
  if (!digits || digits.length < 10) {
    return { allowed: true, remainingAttempts: MAX_OTP_PER_WINDOW };
  }
  const cleanPhone = digits.slice(-10);
  const now = Date.now();

  let data: Record<string, number[]> = {};
  try {
    const content = await fs.readFile(limitFilePath, 'utf8');
    data = JSON.parse(content);
  } catch {
    data = {};
  }

  // Filter timestamps within the sliding 10-minute window
  const existingTimestamps = (data[cleanPhone] || []).filter(
    (ts) => typeof ts === 'number' && now - ts < TEN_MINUTES_MS
  );

  if (existingTimestamps.length >= MAX_OTP_PER_WINDOW) {
    existingTimestamps.sort((a, b) => a - b);
    const oldest = existingTimestamps[0];
    const expiry = oldest + TEN_MINUTES_MS;
    const retryAfterMs = Math.max(0, expiry - now);
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
    const retryAfterMinutes = Math.ceil(retryAfterSeconds / 60);

    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds,
      retryAfterMinutes,
      error: `Security limit: Maximum 2 OTP requests allowed within 10 minutes for this mobile number (+91 ${cleanPhone}). Please wait ${retryAfterMinutes} minute(s) before requesting again.`,
    };
  }

  // Record this attempt
  existingTimestamps.push(now);
  data[cleanPhone] = existingTimestamps;

  // Cleanup old entries
  for (const key of Object.keys(data)) {
    data[key] = data[key].filter((ts) => typeof ts === 'number' && now - ts < TEN_MINUTES_MS);
    if (data[key].length === 0) {
      delete data[key];
    }
  }

  try {
    await fs.mkdir(path.dirname(limitFilePath), { recursive: true }).catch(() => {});
    await fs.writeFile(limitFilePath, JSON.stringify(data));
  } catch (err) {
    console.warn('[checkPhoneOtpRateLimit] File write error:', err);
  }

  return {
    allowed: true,
    remainingAttempts: MAX_OTP_PER_WINDOW - existingTimestamps.length,
  };
}
