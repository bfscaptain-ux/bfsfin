import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    const admin = await prisma.adminUser.findUnique({
      where: { username }
    });
    
    if (admin && admin.password === password) {
      return NextResponse.json({ success: true, message: "Login successful" }, { status: 200 });
    }
    
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
