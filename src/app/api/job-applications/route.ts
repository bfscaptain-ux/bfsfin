import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: {
        job: {
          select: { title: true, department: true }
        }
      },
      orderBy: { appliedAt: "desc" }
    });
    return NextResponse.json({ success: true, applications });
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract fields
    const jobId = formData.get("jobId") as string;
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const hasWhatsapp = formData.get("hasWhatsapp") === "true";
    const address = formData.get("address") as string;
    const gender = formData.get("gender") as string;
    const dobString = formData.get("dob") as string;
    
    const preferredLocation = formData.get("preferredLocation") as string;
    const jobType = formData.get("jobType") as string;
    const noticePeriod = formData.get("noticePeriod") as string;
    
    const qualification = formData.get("qualification") as string;
    const specialization = formData.get("specialization") as string;
    const passingYear = formData.get("passingYear") as string;
    const university = formData.get("university") as string;
    
    const experienceYears = formData.get("experienceYears") as string;
    const currentCompany = formData.get("currentCompany") as string;
    const currentCtc = formData.get("currentCtc") as string;
    const expectedSalary = formData.get("expectedSalary") as string;
    const keySkills = formData.get("keySkills") as string; // JSON array string
    
    const hasVehicle = formData.get("hasVehicle") === "true";
    const whyJoin = formData.get("whyJoin") as string;
    const fieldComfortable = formData.get("fieldComfortable") === "true";

    const resumeFile = formData.get("resumeFile") as File;
    const photoFile = formData.get("photoFile") as File;

    // Validation
    const existing = await prisma.jobApplication.findFirst({
      where: { jobId, phone }
    });

    if (existing) {
      return NextResponse.json({ 
        success: false, 
        error: "You have already applied for this job using this phone number." 
      }, { status: 400 });
    }

    // Handle File Uploads (Local for now, Vercel requires S3)
    let resumeUrl = "";
    let photoUrl = "";
    const baseUploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure dirs exist
    if (!fs.existsSync(path.join(baseUploadDir, "resumes"))) {
      await mkdir(path.join(baseUploadDir, "resumes"), { recursive: true });
    }
    if (!fs.existsSync(path.join(baseUploadDir, "photos"))) {
      await mkdir(path.join(baseUploadDir, "photos"), { recursive: true });
    }

    if (resumeFile && resumeFile.name) {
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      const filename = `${Date.now()}_${resumeFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      await writeFile(path.join(baseUploadDir, "resumes", filename), buffer);
      resumeUrl = `/uploads/resumes/${filename}`;
    }

    if (photoFile && photoFile.name) {
      const buffer = Buffer.from(await photoFile.arrayBuffer());
      const filename = `${Date.now()}_${photoFile.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
      await writeFile(path.join(baseUploadDir, "photos", filename), buffer);
      photoUrl = `/uploads/photos/${filename}`;
    }

    // Generate unique application No: APP-{RANDOM}
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const applicationNo = `APP-JOB-${randomCode}`;

    const application = await prisma.jobApplication.create({
      data: {
        applicationNo,
        jobId,
        fullName,
        email,
        phone,
        hasWhatsapp,
        address,
        gender,
        dob: dobString ? new Date(dobString) : null,
        
        preferredLocation,
        jobType,
        noticePeriod,
        
        qualification,
        specialization,
        passingYear,
        university,
        
        experienceYears,
        currentCompany,
        currentCtc,
        expectedSalary,
        keySkills,
        
        resumeUrl,
        photoUrl,
        hasVehicle,
        
        whyJoin,
        fieldComfortable,
        
        status: "NEW"
      }
    });

    return NextResponse.json({ success: true, application });

  } catch (error) {
    console.error("Failed to submit application:", error);
    return NextResponse.json({ success: false, error: "Failed to submit application" }, { status: 500 });
  }
}
