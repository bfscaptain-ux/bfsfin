import { MetadataRoute } from "next";
import { PrismaClient } from "@prisma/client";
import { banksData } from "@/data/banksData";

const prisma = new PrismaClient();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable for base URL, default to https://bfsagra.com
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bfsagra.com";

  // 1. All static public routes
  const staticRoutes = [
    "",
    "/about",
    "/about/certifications",
    "/about/founder",
    "/about/why-us",
    "/apply",
    "/appointment",
    "/blogs",
    "/calculator",
    "/calculators",
    "/careers",
    "/compare",
    "/compare/interest-rates",
    "/compare/processing-fees",
    "/contact",
    "/contact/locations",
    "/eligibility",
    "/faq",
    "/faqs",
    "/login",
    "/products",
    "/products/balance-transfer",
    "/products/business-loan",
    "/products/car-loan",
    "/products/construction-loan",
    "/products/education-loan",
    "/products/gold-loan",
    "/products/home-loan",
    "/products/home-renovation",
    "/products/loan-against-property",
    "/products/loan-against-securities",
    "/products/nri-home-loan",
    "/products/personal-loan",
    "/products/plot-loan",
    "/products/top-up-loan",
    "/products/working-capital",
    "/rates",
    "/resources/credit-score",
    "/resources/documents",
    "/resources/downloads",
    "/resources/frameworks",
    "/resources/insights",
    "/resources/interviews",
    "/resources/process",
    "/resources/statistics",
    "/resources/use-cases",
    "/reviews",
    "/testimonials",
    "/tools/affordability",
    "/tools/balance-transfer",
    "/tools/interest-rate-compare",
    "/tools/prepayment",
    "/tools/stamp-duty",
    "/tools/tax-benefit",
    "/track"
  ];

  const staticSitemap: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // 2. Fetch all published blogs
    const blogs = await prisma.blog.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const blogSitemap: MetadataRoute.Sitemap = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // 3. Fetch all active careers/jobs
    const jobs = await prisma.careerJob.findMany({
      where: { isActive: true },
      select: { slug: true, updatedAt: true },
    });

    const jobSitemap: MetadataRoute.Sitemap = jobs.map((job) => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified: job.updatedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    // 4. Fetch all published FAQs
    const faqs = await prisma.faq.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const faqSitemap: MetadataRoute.Sitemap = faqs.map((faq) => ({
      url: `${baseUrl}/faqs/${faq.slug}`,
      lastModified: faq.updatedAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }));

    // 5. Fetch Testimonials
    const testimonials = await prisma.testimonial.findMany({
      select: { slug: true, createdAt: true },
    });

    const testimonialSitemap: MetadataRoute.Sitemap = testimonials
      .filter((t) => t.slug)
      .map((t) => ({
        url: `${baseUrl}/testimonials/${t.slug}`,
        lastModified: t.createdAt,
        changeFrequency: "monthly",
        priority: 0.5,
      }));

    // 6. Hardcoded Banks
    const bankSitemap: MetadataRoute.Sitemap = Object.keys(banksData).map((slug) => ({
      url: `${baseUrl}/banks/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...staticSitemap, ...blogSitemap, ...jobSitemap, ...faqSitemap, ...testimonialSitemap, ...bankSitemap];
  } catch (error) {
    console.error("Error generating dynamic sitemap from database:", error);
    // If DB fails, still return the static sitemap
    return staticSitemap;
  }
}
