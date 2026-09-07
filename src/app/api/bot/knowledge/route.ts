export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    // 1. Fetch from Database
    const scenarios = await prisma.botScenario.findMany({ where: { isActive: true } });
    const rules = await prisma.botTrainingRule.findMany({ where: { isActive: true } });
    const rates = await prisma.bankRate.findMany();
    
    // 2. Fetch from JSON
    let faqs: any[] = [];
    let serviceAreas: any[] = [];
    try {
      const faqsData = await fs.readFile(path.join(process.cwd(), 'src', 'data', 'faqs.json'), 'utf8');
      faqs = JSON.parse(faqsData).filter((f: any) => f.status === 'published');
    } catch(e) {}
    try {
      const saData = await fs.readFile(path.join(process.cwd(), 'src', 'data', 'service-areas.json'), 'utf8');
      serviceAreas = JSON.parse(saData);
    } catch(e) {}

    return NextResponse.json({
      success: true,
      data: {
        scenarios,
        rules,
        rates,
        faqs,
        serviceAreas
      }
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to load bot knowledge" }, { status: 500 });
  }
}
