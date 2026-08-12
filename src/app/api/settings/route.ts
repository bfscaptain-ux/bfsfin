import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    
    // Convert array to key-value object
    const settingsMap: Record<string, string> = {};
    settings.forEach((s: any) => {
      settingsMap[s.key] = s.value;
    });
    
    return NextResponse.json({ success: true, settings: settingsMap });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { settings } = body;
    
    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ success: false, error: "Invalid settings payload" }, { status: 400 });
    }

    // Upsert all settings
    const promises = Object.entries(settings).map(([key, value]) => {
      if (typeof value !== 'string') return Promise.resolve();
      
      return prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    });
    
    await Promise.all(promises);

    return NextResponse.json({ success: true, message: "Settings saved successfully" });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
