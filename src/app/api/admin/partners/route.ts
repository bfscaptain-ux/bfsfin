import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const partners = await prisma.user.findMany({
      where: { role: "PARTNER" },
      include: {
        partnerProfile: true,
        leads: {
          select: { id: true }
        },
        payouts: {
          select: { amount: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Format the response for the frontend
    const formattedPartners = partners.map(p => {
      const totalEarnings = p.payouts.reduce((sum, payout) => sum + payout.amount, 0);
      
      return {
        id: p.id,
        partnerCode: p.partnerProfile?.partnerCode || "PENDING",
        name: p.name,
        company: p.partnerProfile?.companyName || "Independent",
        tier: p.partnerProfile?.tier || "Silver",
        totalLeads: p.leads.length,
        commission: p.partnerProfile?.commissionRate || "1.0%",
        status: p.partnerProfile?.status || "Pending Approval",
        joined: p.createdAt.toISOString().split("T")[0],
        phone: p.phone,
        email: p.email
      };
    });

    return NextResponse.json({ success: true, partners: formattedPartners });
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch partners" }, { status: 500 });
  }
}
