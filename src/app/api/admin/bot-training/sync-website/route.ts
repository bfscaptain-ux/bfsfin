import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    // 1. Fetch live data from Database
    const bankRates = await prisma.bankRate.findMany();
    const teamMembers = await prisma.teamMember.findMany();
    const blogs = await prisma.blogArticle.findMany();
    const jobs = await prisma.jobPost.findMany({ where: { isActive: true } });
    const testimonials = await prisma.testimonial.findMany();
    const reviews = await prisma.review.findMany({ where: { status: "APPROVED" } });

    // Fetch JSON file data
    let faqs: any[] = [];
    let serviceAreas: any[] = [];
    try {
      const faqsData = await fs.readFile(path.join(process.cwd(), 'src', 'data', 'faqs.json'), 'utf8');
      faqs = JSON.parse(faqsData);
    } catch(e) {}
    try {
      const saData = await fs.readFile(path.join(process.cwd(), 'src', 'data', 'service-areas.json'), 'utf8');
      serviceAreas = JSON.parse(saData);
    } catch(e) {}

    // 2. Format Data into a readable AI Context String
    let syncContent = "### OFFICIAL WEBSITE & DATABASE KNOWLEDGE FOR AI ###\n\n";

    // STATIC WEBSITE PAGES KNOWLEDGE (Home, About, Contact, Services)
    syncContent += "--- FULL WEBSITE PAGES KNOWLEDGE (STATIC CONTENT) ---\n";
    syncContent += `
[PAGE: HOME]
Welcome to Bhardwaj Financial Services (BFS Agra).
We offer the fastest 5-Day Home Loan Approvals.
Benefits: Lowest Interest Rates Guaranteed (from 6.50%), Zero Processing Fees for Direct Applications, Doorstep Document Pickup & 100% Digital Process.
Success Rate: 98% Approvals. We are RBI Registered & Compliant.

[PAGE: ABOUT US]
Bhardwaj Financial Services is a trusted financial advisory firm based in Agra, India.
Founders: Adv. Praveen Bhardwaj (Super Admin & Legal Expert) and Vineeta Sharma (Senior Loan Expert).
Mission: To provide transparent, hassle-free, and lowest-cost financial solutions to every Indian citizen. We combine legal expertise with financial advisory to ensure 100% secure loans.

[PAGE: CONTACT US]
Office Location: Agra, Uttar Pradesh, India.
Helpline Phone Number: 7900-979-001.
Operating Hours: Monday to Saturday, 10:00 AM to 6:00 PM.

[PAGE: SERVICES & PRODUCTS]
1. Home Loan: For purchasing flats, plots, or constructing houses. Minimum rate starts from 6.50%.
2. Loan Against Property (LAP): Use your commercial or residential property to get funds.
3. Business Loan: Unsecured loans for business expansion. Available for self-employed individuals with GST/ITR.
4. Personal Loan: Quick funds for medical, travel, or weddings.
5. Balance Transfer (BT): Transfer your existing high-interest loan to us and save on EMIs.

[PAGE: ELIGIBILITY & GENERAL POLICIES]
- We do not process loans for properties located in villages or Gram Panchayat areas. Only Nagar Nigam (Municipal Corporation) or approved authority properties are accepted.
- Both Salaried and Self-Employed individuals are welcome.
- Cash salary or no-ITR profiles can be considered under special NBFC surrogate programs (requires property registry and bank statement).
\n`;

    syncContent += "--- DYNAMIC DATABASE: BANK RATES & OFFERS ---\n";
    bankRates.forEach(rate => {
      syncContent += `Bank: ${rate.bankName}, Category: ${rate.category}, Interest Rate: ${rate.interestRate}%, Processing Fee: ${rate.processingFee}, Speed: ${rate.speedDays} days.\n`;
    });

    syncContent += "\n--- CORE TEAM MEMBERS ---\n";
    teamMembers.forEach(member => {
      syncContent += `Name: ${member.name}, Role: ${member.role}, Description: ${member.desc}\n`;
    });

    syncContent += "\n--- ACTIVE JOB OPENINGS ---\n";
    jobs.forEach(job => {
      syncContent += `Job Title: ${job.title}, Department: ${job.department}, Experience Required: ${job.experience}, Salary: ${job.salary}. Incentive: ${job.incentive || 'None'}. Apply via Careers page.\n`;
    });

    syncContent += "\n--- SUCCESS STORIES & TESTIMONIALS ---\n";
    testimonials.forEach(test => {
      syncContent += `Client: ${test.name} (${test.role}), Location: ${test.location}. Got ${test.loanAmount} from ${test.bankName} in ${test.daysTaken} days at ${test.rate} rate. Quote: "${test.quote}"\n`;
    });

    syncContent += "\n--- CUSTOMER REVIEWS ---\n";
    reviews.forEach(review => {
      syncContent += `Reviewer: ${review.name} from ${review.location}. Rating: ${review.rating}/5. Review: "${review.text}"\n`;
    });

    syncContent += "\n--- BLOGS & ARTICLES (KNOWLEDGE BASE) ---\n";
    blogs.forEach(blog => {
      syncContent += `Title: ${blog.title}, Category: ${blog.category}, Summary: ${blog.summary}, Content: ${blog.content}\n\n`;
    });

    syncContent += "\n--- FREQUENTLY ASKED QUESTIONS (FAQS) ---\n";
    faqs.forEach(faq => {
      if(faq.status === 'published') {
        syncContent += `Q: ${faq.question}\nA: ${faq.answer}\nCategory: ${faq.category}\n\n`;
      }
    });

    syncContent += "\n--- SERVICE AREAS & LOCAL EXPERTISE ---\n";
    serviceAreas.forEach(city => {
      syncContent += `City: ${city.name} (${city.state}). ${city.description}\n`;
      if(city.localAreas) {
        city.localAreas.forEach((area: any) => {
          syncContent += `  Area: ${area.name}\n  Why Us: ${area.whyChooseUs}\n  Local Expert: ${area.localExpertName} (${area.localExpertPhone})\n  Success Story: ${area.successStoryName} - ${area.successStoryText}\n\n`;
        });
      }
    });

    syncContent += "\n--- GENERAL POLICIES ---\n";
    syncContent += "Company Name: Bhardwaj Financial Services (BFS Agra).\n";
    syncContent += "Mission: Fastest 5-Day Home Loan Approvals.\n";
    
    // 3. Save as a Knowledge Document
    // First, delete any old sync file
    await prisma.knowledgeDocument.deleteMany({
      where: { filename: "AutoSync_Website_Database.txt" }
    });

    // Create the new sync document
    const doc = await prisma.knowledgeDocument.create({
      data: {
        filename: "AutoSync_Website_Database.txt",
        fileUrl: "SYSTEM_GENERATED", 
        status: "INDEXED_READY",
      }
    });

    return NextResponse.json({ 
      success: true, 
      document: doc,
      stats: {
        rates: bankRates.length,
        team: teamMembers.length,
        blogs: blogs.length,
        jobs: jobs.length,
        testimonials: testimonials.length,
        reviews: reviews.length,
        faqs: faqs.filter(f => f.status === 'published').length,
        areas: serviceAreas.reduce((acc, city) => acc + (city.localAreas?.length || 0), 0)
      }
    });

  } catch (error) {
    console.error("Auto Sync Error:", error);
    return NextResponse.json({ error: "Failed to sync website data" }, { status: 500 });
  }
}
