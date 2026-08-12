import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, companyName, city, state, pincode, panNumber, profession, experienceYears } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ success: false, error: "Name, email, and phone are required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }]
      }
    });

    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email or phone already registered" }, { status: 400 });
    }

    // Create User and PartnerProfile in a transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          phone,
          city: city || "Agra",
          role: "PARTNER",
          password: "PENDING_APPROVAL_TEMP_PASSWORD", // Password will be set by admin later or via forgot password
        }
      });

      await tx.partnerProfile.create({
        data: {
          userId: user.id,
          companyName: companyName || "",
          status: "Pending Approval",
          tier: "Silver",
          commissionRate: "1.0%",
          state: state || "",
          pincode: pincode || "",
          panNumber: panNumber || "",
          profession: profession || "",
          experienceYears: experienceYears || ""
        }
      });

      return user;
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Partner Registration Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
