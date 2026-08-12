import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    let whereClause: any = { isPublished: true };

    if (tag) {
      whereClause.tags = { contains: tag };
    }
    
    if (search) {
      whereClause.title = { contains: search };
    }

    // Admins might want to see all blogs (including drafts)
    const isAdmin = searchParams.get("admin") === "true";
    if (isAdmin) {
      whereClause = {}; // override published check for admin
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newBlog = await prisma.blog.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt || null,
        content: body.content,
        coverImage: body.coverImage || null,
        author: body.author || "Admin",
        tags: body.tags || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        isPublished: body.isPublished || false,
      },
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog. Ensure slug is unique." },
      { status: 500 }
    );
  }
}
