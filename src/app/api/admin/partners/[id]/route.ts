import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Find Partner by either ID or partnerCode
    const partner = await prisma.user.findFirst({
      where: {
        role: "PARTNER",
        OR: [
          { id: id },
          { partnerProfile: { partnerCode: id } }
        ]
      },
      include: {
        partnerProfile: true,
        leads: {
          orderBy: { createdAt: "desc" }
        },
        payouts: {
          orderBy: { date: "desc" }
        },
        subPartners: {
          include: { partnerProfile: true, payouts: true }
        },
        rewardProfile: true,
        trainings: {
          include: { module: true }
        },
        documents: true,
        tickets: true,
        activityLogs: {
          orderBy: { timestamp: "desc" },
          take: 10
        }
      }
    });

    if (!partner) {
      return NextResponse.json({ success: false, error: "Partner not found" }, { status: 404 });
    }

    const totalEarnings = partner.payouts.reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({ 
      success: true, 
      partner: {
        ...partner,
        totalEarnings,
        joinedDate: partner.createdAt.toISOString().split("T")[0]
      } 
    });
  } catch (error) {
    console.error("Failed to fetch partner details:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
