import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    // Check if there is an active request (Status != 'RESOLVED') for this phone number
    const existingRequest = await prisma.contactRequest.findFirst({
      where: {
        phone: phone,
        status: {
          not: "RESOLVED"
        }
      }
    });

    if (existingRequest) {
      return NextResponse.json(
        { 
          error: "Limit Reached", 
          message: "You already have an active request pending. Please wait for our team to contact you and resolve it before submitting another request." 
        }, 
        { status: 403 }
      );
    }

    // In a real production app, you would integrate Fast2SMS, Twilio, MSG91, Firebase, etc. here.
    // For this simulation, we'll pretend the SMS is sent and the expected OTP is '123456'.
    console.log(`[SIMULATION] Sending OTP to ${phone}... Expected OTP is 123456`);

    return NextResponse.json({ 
      success: true, 
      message: "OTP sent successfully (Simulated for dev)" 
    }, { status: 200 });

  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
