export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// High-concurrency In-Memory Cache for System Settings
let cachedSettings: Record<string, string> | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export async function GET() {
  try {
    const now = Date.now();
    if (cachedSettings && now - lastCacheTime < CACHE_TTL_MS) {
      return NextResponse.json({ success: true, settings: cachedSettings, cached: true });
    }

    const settings = await prisma.systemSetting.findMany();
    // Convert array of {key, value} to an object
    const settingsObj = settings.reduce((acc: Record<string, string>, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    cachedSettings = settingsObj;
    lastCacheTime = now;
    
    return NextResponse.json({ success: true, settings: settingsObj });
  } catch (error) {
    // If DB has a temporary lock, return stale cached settings if available
    if (cachedSettings) {
      return NextResponse.json({ success: true, settings: cachedSettings, stale: true });
    }
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ success: false, error: "Missing key or value" }, { status: 400 });
    }

    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    // Invalidate cache immediately on admin update
    cachedSettings = null;
    lastCacheTime = 0;

    return NextResponse.json({ success: true, setting });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update setting" }, { status: 500 });
  }
}
