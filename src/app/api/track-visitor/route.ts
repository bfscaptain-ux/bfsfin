export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { resolveClientLocation } from "@/lib/geo";
import { sendToGoogleSheets } from "@/lib/googleSheets";

// Helper to detect device and browser from User-Agent
function parseUserAgent(ua: string) {
  let device = "Desktop (Computer)";
  if (/mobile|android|iphone|ipad|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    device = "Mobile Phone";
    if (/iphone|ipad|ipod/i.test(ua)) device = "Apple iOS Device";
    else if (/android/i.test(ua)) device = "Android Mobile";
  } else if (/tablet|ipad/i.test(ua)) {
    device = "Tablet";
  }

  let browser = "Web Browser";
  if (ua.includes("Chrome") && !ua.includes("Edg")) browser = "Google Chrome";
  else if (ua.includes("Edg")) browser = "Microsoft Edge";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Apple Safari";
  else if (ua.includes("Firefox")) browser = "Mozilla Firefox";

  return { device, browser };
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get("user-agent") || "";
    const { device, browser } = parseUserAgent(userAgent);

    // Resolve Location via IP
    const geo = await resolveClientLocation(req);

    const pageUrl = body.page || "/";
    const userLocation = geo.fullAddress || `${geo.city}, ${geo.region}, ${geo.country}`;
    const mapsUrl = geo.mapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(userLocation)}`;

    // Dispatch to Google Sheets under "Website Visitor" (routes to "Live Visitors (Traffic)" tab)
    await sendToGoogleSheets({
      formType: "Website Visitor",
      isVisitor: true,
      page: pageUrl,
      device: device,
      browser: browser,
      city: geo.city || "Agra",
      state: geo.region || "Uttar Pradesh",
      country: geo.country || "India",
      userLocation: userLocation,
      mapsUrl: mapsUrl,
      ip: geo.ip || "Unknown",
    });

    return NextResponse.json({
      success: true,
      tracked: {
        city: geo.city,
        state: geo.region,
        country: geo.country,
        device,
        page: pageUrl
      }
    });
  } catch (error) {
    console.error("Track Visitor Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
