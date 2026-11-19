import fs from "fs/promises";
import path from "path";
import { Metadata } from "next";
import { BlogPost } from "@/types/blog";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Financial Blog & Home Loan Guides",
  description: "Read expert guides on home loans, LAP, MSME business finance, CIBIL score improvement, and interest rate trends by Bhardwaj Financial Services.",
  alternates: {
    canonical: "https://bfsfin.com/blog",
  },
  openGraph: {
    title: "Financial Blog & Home Loan Guides | Bhardwaj Financial Services",
    description: "Read expert guides on home loans, LAP, MSME business finance, CIBIL score improvement, and interest rate trends.",
    url: "https://bfsfin.com/blog",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Blog & Home Loan Guides | Bhardwaj Financial Services",
    description: "Read expert guides on home loans, LAP, MSME business finance, and CIBIL score improvement.",
  },
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let blogs: BlogPost[] = [];
  try {
    const filePath = path.join(process.cwd(), "src", "data", "blogs.json");
    const raw = await fs.readFile(filePath, "utf8");
    blogs = JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load initial blogs from json", error);
  }

  return <BlogClient initialBlogs={blogs} />;
}
