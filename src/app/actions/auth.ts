"use server";

import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "bfs-super-secret-key-2026-production");

export async function loginAction(emailOrId: string, passwordText: string, expectedRole: string) {
  try {
    // Basic validation
    if (!emailOrId || !passwordText) {
      return { success: false, error: "Please provide credentials." };
    }

    // Find user by email or phone (since we don't have a specific loginId field, we use email/phone)
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrId },
          { phone: emailOrId }
        ]
      }
    });

    if (!user) {
      return { success: false, error: "Invalid credentials." };
    }

    // Role check
    let validRole = false;
    if (expectedRole === "admin" && user.role === "ADMIN") validRole = true;
    else if (expectedRole === "partner" && user.role === "PARTNER") validRole = true;
    else if (expectedRole === "client" && user.role === "CUSTOMER") validRole = true;

    if (!validRole) {
      return { success: false, error: `You do not have ${expectedRole} access.` };
    }

    // Verify Password
    if (!user.password) {
      return { success: false, error: "No password set for this account. Please contact Admin." };
    }

    const isMatch = await bcrypt.compare(passwordText, user.password);
    if (!isMatch) {
      return { success: false, error: "Invalid credentials." };
    }

    // Create JWT
    const token = await new SignJWT({ 
      id: user.id, 
      role: user.role, 
      name: user.name 
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET);

    // Set HTTP-Only Cookie
    cookies().set({
      name: "bfs_auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true };
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, error: "Server error during authentication." };
  }
}

export async function logoutAction() {
  cookies().delete("bfs_auth_token");
  return { success: true };
}

export async function verifyAuthToken(token: string) {
  try {
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    return null;
  }
}
