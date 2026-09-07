import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const doc = await prisma.knowledgeDocument.findUnique({
      where: { id: params.id }
    });

    if (doc) {
      // Delete file from disk
      const filePath = path.join(process.cwd(), "public", doc.fileUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete from DB
      await prisma.knowledgeDocument.delete({
        where: { id: params.id }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
