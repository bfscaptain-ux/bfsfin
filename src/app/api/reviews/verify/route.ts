import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { appIdOrPhone } = await req.json();
    
    // Check if a review already exists for this ID
    const existingReview = await prisma.review.findFirst({
      where: {
        OR: [
          { applicationId: appIdOrPhone },
          { phone: appIdOrPhone }
        ]
      }
    });

    if (existingReview) {
      return NextResponse.json({ error: "You have already submitted a review." }, { status: 400 });
    }

    // Verify if it's a real customer by App No
    const application = await prisma.application.findFirst({
      where: { appNo: appIdOrPhone },
      include: { customer: true }
    });

    if (application) {
      return NextResponse.json({ 
        verified: true, 
        name: application.customer.name,
        applicationId: application.appNo,
        phone: application.customer.phone
      });
    }

    // Try finding by phone in users
    const user = await prisma.user.findFirst({
      where: { phone: appIdOrPhone }
    });

    if (user) {
      return NextResponse.json({ 
        verified: true, 
        name: user.name,
        phone: user.phone
      });
    }

    return NextResponse.json({ error: "Customer record not found. Please enter a valid Application No. or Phone." }, { status: 404 });

  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
