/**
 * Official SMS Captain Physical Gateway Integration for BFS Circle
 * Powered by SMS Captain Gateway Engine (Port 3006 / https://sms-api.bfsfin.cloud)
 * Sends real SMS directly through Android SIM cards (Jio / Airtel)
 * Zero DLT registration hassle, 100% instant delivery
 */

const SMS_CAPTAIN_API_URL = process.env.SMS_CAPTAIN_API_URL || 'http://127.0.0.1:3006';
const SMS_CAPTAIN_API_KEY = process.env.SMS_CAPTAIN_API_KEY || 'txb_anuj_bfs_live_2026_sms_gateway';

/**
 * Format any Indian mobile number into international E.164 (+91XXXXXXXXXX)
 */
export function formatIndianMobile(mobile: string | number): string {
  const digits = String(mobile).replace(/\D/g, '');
  if (digits.length === 10) {
    return `+91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return `+91${digits.slice(1)}`;
  }
  if (String(mobile).startsWith('+') && digits.length >= 10) {
    return `+${digits}`;
  }
  return `+91${digits.slice(-10)}`;
}

/**
 * Dispatch an SMS through SMS Captain Android Gateway SIM
 */
export async function sendSmsViaCaptain(
  recipients: string | string[],
  message: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const list = Array.isArray(recipients) ? recipients : [recipients];
    const formattedRecipients = list
      .map(formatIndianMobile)
      .filter((m) => m.length >= 13); // +91XXXXXXXXXX has 13 chars

    if (formattedRecipients.length === 0) {
      return { success: false, error: 'No valid mobile number provided' };
    }

    const endpoint = `${SMS_CAPTAIN_API_URL.replace(/\/$/, '')}/api/v1/gateway/send-sms`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': SMS_CAPTAIN_API_KEY,
      },
      body: JSON.stringify({
        recipients: formattedRecipients,
        message: message.trim(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await res.json().catch(() => ({}));

    if (res.ok && data?.data?.responses?.[0]?.success !== false) {
      const msgId = data?.data?.responses?.[0]?.messageId;
      return { success: true, messageId: msgId };
    }

    const errMsg = data?.error || data?.message || `HTTP ${res.status}`;
    console.error('[SMS Captain Gateway Error]:', errMsg, data);
    return { success: false, error: String(errMsg) };
  } catch (err: any) {
    console.error('[SMS Captain Dispatch Exception]:', err?.message || err);
    return { success: false, error: err?.message || 'Gateway connection failed' };
  }
}

/**
 * Send standard verification OTP to client's mobile via SMS
 */
export async function sendOtpSms(
  mobile: string,
  otp: string,
  formName?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const formattedMobile = formatIndianMobile(mobile);
  const smsBody = `BFS Verification Code: ${otp}. Bhardwaj Financial Services.`;
  return await sendSmsViaCaptain(formattedMobile, smsBody);
}
