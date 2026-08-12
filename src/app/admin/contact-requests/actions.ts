"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function markAsResolved(id: string) {
  try {
    await prisma.contactRequest.update({
      where: { id },
      data: { status: "RESOLVED" }
    });
    
    revalidatePath("/admin/contact-requests");
  } catch (error) {
    console.error("Failed to mark as resolved:", error);
  }
}
