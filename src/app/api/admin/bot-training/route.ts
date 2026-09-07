import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const rules = await prisma.botTrainingRule.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rules" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, instruction } = body;
    
    if (!topic || !instruction) {
      return NextResponse.json({ error: "Topic and Instruction are required" }, { status: 400 });
    }

    const rule = await prisma.botTrainingRule.create({
      data: {
        topic,
        instruction,
      }
    });

    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create rule" }, { status: 500 });
  }
}
