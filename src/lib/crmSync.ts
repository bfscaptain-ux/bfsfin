import { execFile } from "child_process";
import fs from "fs";
import path from "path";

export interface CRMLeadPayload {
  name: string;
  phone: string;
  email?: string;
  secondary_mobile?: string;
  productType?: string;
  subType?: string;
  loanType?: string;
  loanAmount?: number | string;
  income?: number | string | null;
  city?: string;
  location?: string;
  employmentType?: string;
  formType?: string;
  source?: string;
  message?: string;
  panNumber?: string;
  refId?: string;
  slotDate?: string;
  slotTime?: string;
  mapsUrl?: string;
}

const DEFAULT_CRM_URL = process.env.NODE_ENV === "production"
  ? "https://crm.bfsfin.cloud/api_website_lead.php"
  : "http://localhost:8000/api_website_lead.php";
const LOCAL_PHP_EXE = "E:\\Downloads\\client mgmt2\\php-portable\\php.exe";
const LOCAL_SCRIPT = "E:\\Downloads\\client mgmt2\\api_website_lead.php";

/**
 * Dispatches website lead to BFS Financial Services CRM (client mgmt2)
 * Supports direct HTTP Webhook with automated local CLI fallback.
 */
export async function syncLeadToCRM(payload: CRMLeadPayload): Promise<{ success: boolean; leadId?: number; error?: string }> {
  const crmUrl = (process.env.CRM_API_URL || DEFAULT_CRM_URL).trim();

  // 1. Primary Ingestion: HTTP Webhook
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.success) {
        console.log(`[CRM SYNC] Lead #${data.lead_id || ""} successfully ingested into CRM via HTTP.`);
        return { success: true, leadId: data.lead_id };
      }
    }
    console.warn(`[CRM SYNC] HTTP responded with status ${res.status}. Falling back to CLI if available.`);
  } catch (httpErr: any) {
    console.warn(`[CRM SYNC] HTTP Webhook unreachable (${httpErr?.message || httpErr}). Attempting local fallback.`);
  }

  // 2. Secondary Ingestion: Local PHP-Portable CLI Fallback (Works even when dev server is offline)
  try {
    if (fs.existsSync(LOCAL_PHP_EXE) && fs.existsSync(LOCAL_SCRIPT)) {
      const b64Payload = Buffer.from(JSON.stringify(payload)).toString("base64");
      
      return await new Promise((resolve) => {
        execFile(LOCAL_PHP_EXE, [LOCAL_SCRIPT, "--base64", b64Payload], { timeout: 5000 }, (err, stdout) => {
          if (err) {
            console.error("[CRM SYNC] CLI Fallback execution failed:", err.message);
            return resolve({ success: false, error: err.message });
          }
          try {
            const data = JSON.parse(stdout.trim());
            if (data.success) {
              console.log(`[CRM SYNC] Lead #${data.lead_id || ""} successfully ingested into CRM via CLI fallback.`);
              return resolve({ success: true, leadId: data.lead_id });
            }
          } catch (pErr) {
            console.error("[CRM SYNC] CLI Fallback parse error:", stdout);
          }
          resolve({ success: false, error: "CLI execution did not return success" });
        });
      });
    }
  } catch (cliErr: any) {
    console.error("[CRM SYNC] Error in CLI fallback:", cliErr?.message || cliErr);
  }

  return { success: false, error: "Both HTTP and CLI sync attempts failed" };
}
