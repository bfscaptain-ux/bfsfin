import { prisma } from "@/lib/prisma";

const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyEzjAWSQbZRjYx2OQaXyoMAL4FxYSjaH1QClNMmdlMmiJtBqJcYlXygmXJ27LbcOu3EA/exec";

// In-memory cache for webhook URL to eliminate database overhead on every visit
let cachedWebhookUrl: string | null = null;
let lastWebhookCacheTime = 0;
const WEBHOOK_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function sendToGoogleSheets(payload: Record<string, any>) {
  try {
    const now = Date.now();
    let webhookUrl = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || "").trim();

    if (!webhookUrl) {
      if (cachedWebhookUrl && now - lastWebhookCacheTime < WEBHOOK_CACHE_TTL_MS) {
        webhookUrl = cachedWebhookUrl;
      } else {
        try {
          const sheetSetting = await prisma.systemSetting.findFirst({
            where: { key: { in: ["googleSheetWebhookUrl", "googleSheetsWebhookUrl", "googleSheetUrl"] } },
          });
          if (sheetSetting?.value && sheetSetting.value.trim().startsWith("http")) {
            webhookUrl = sheetSetting.value.trim();
          } else {
            webhookUrl = DEFAULT_WEBHOOK_URL;
          }
          cachedWebhookUrl = webhookUrl;
          lastWebhookCacheTime = now;
        } catch {
          webhookUrl = DEFAULT_WEBHOOK_URL;
        }
      }
    }

    if (!webhookUrl) return;

    // Timeout controller so connection is released if Google is slow
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        ...payload,
      }),
    });
    clearTimeout(timeoutId);
  } catch (error) {
    // Graceful background handling
  }
}
