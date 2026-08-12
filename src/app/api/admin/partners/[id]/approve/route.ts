import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const partner = await prisma.user.findUnique({
      where: { id },
      include: { partnerProfile: true }
    });

    if (!partner || partner.role !== "PARTNER") {
      return NextResponse.json({ success: false, error: "Invalid Partner" }, { status: 400 });
    }

    if (partner.partnerProfile?.status === "Active") {
      return NextResponse.json({ success: false, error: "Partner already active" }, { status: 400 });
    }

    // Generate a Partner Code
    // Count existing active partners to generate a sequential ID like BFS-PT-002
    const totalActive = await prisma.partnerProfile.count({
      where: { status: "Active" }
    });

    const nextIdNumber = totalActive + 1;
    const newPartnerCode = `BFS-PT-${String(nextIdNumber).padStart(3, '0')}`;

    // Update Profile
    const updatedProfile = await prisma.partnerProfile.update({
      where: { userId: id },
      data: {
        status: "Active",
        partnerCode: newPartnerCode,
        tier: "Silver", // Default starting tier
      }
    });

    return NextResponse.json({ success: true, partnerCode: newPartnerCode });

  } catch (error) {
    console.error("Failed to approve partner:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
