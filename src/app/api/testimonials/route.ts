import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  try {
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: skip,
      }),
      prisma.testimonial.count()
    ]);
    
    return NextResponse.json({
      data: testimonials,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const location = formData.get("location") as string;
    const stars = formData.get("stars") as string;
    const quote = formData.get("quote") as string;
    const detail = formData.get("detail") as string;
    const challenge = formData.get("challenge") as string;
    const solution = formData.get("solution") as string;
    const result = formData.get("result") as string;
    const loanAmount = formData.get("loanAmount") as string;
    const daysTaken = formData.get("daysTaken") as string;
    const bankName = formData.get("bankName") as string;
    const rate = formData.get("rate") as string;
    const slug = formData.get("slug") as string;
    
    const videoFile = formData.get("videoFile") as File;
    const photoFile = formData.get("photoFile") as File;
    
    let videoUrl = formData.get("videoUrl") as string || "";
    let photoUrl = formData.get("photoUrl") as string || "";

    const baseUploadDir = path.join(process.cwd(), "public", "uploads", "testimonials");

    if (!fs.existsSync(baseUploadDir)) {
      await mkdir(baseUploadDir, { recursive: true });
    }

    if (videoFile && videoFile.name) {
      const buffer = Buffer.from(await videoFile.arrayBuffer());
      const filename = `video_${Date.now()}_${videoFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      await writeFile(path.join(baseUploadDir, filename), buffer);
      videoUrl = `/uploads/testimonials/${filename}`;
    }

    if (photoFile && photoFile.name) {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const filename = `photo_${Date.now()}_${photoFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      await writeFile(path.join(baseUploadDir, filename), buffer);
      photoUrl = `/uploads/testimonials/${filename}`;
    }

    // Auto-generate slug if not provided
    const generatedSlug = slug 
      ? slug 
      : name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        slug: generatedSlug,
        role,
        location,
        stars: Number(stars),
        quote,
        detail: detail || quote,
        challenge: challenge || null,
        solution: solution || null,
        result: result || null,
        loanAmount: loanAmount || "",
        daysTaken: daysTaken || "",
        bankName: bankName || "",
        rate: rate || "",
        videoUrl: videoUrl || null,
        photoUrl: photoUrl || null,
      },
    });
    
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Testimonial creation error:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
