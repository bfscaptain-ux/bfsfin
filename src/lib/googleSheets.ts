import { prisma } from "@/lib/prisma";

const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbymBNLS0IXJ_ZTAHSdQdADRLhWrz33zIgiv_fZP_4nTayLPD-WLNPVsFndKhcBxBy0G/exec";

export async function sendToGoogleSheets(payload: Record<string, any>) {
  try {
    let webhookUrl = (process.env.GOOGLE_SHEETS_WEBHOOK_URL || "").trim() || DEFAULT_WEBHOOK_URL;

    try {
      const sheetSetting = await prisma.systemSetting.findFirst({
        where: { key: { in: ["googleSheetWebhookUrl", "googleSheetsWebhookUrl", "googleSheetUrl"] } },
      });
      if (sheetSetting?.value && sheetSetting.value.trim().startsWith("http")) {
        webhookUrl = sheetSetting.value.trim();
      }
    } catch {
      // ignore
    }

    if (!webhookUrl) return;

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        ...payload,
      }),
    });
  } catch (error) {
    console.error("Google Sheets Webhook Dispatch Error:", error);
  }
}
