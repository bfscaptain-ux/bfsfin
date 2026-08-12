import { PrismaClient } from "@prisma/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import FaqClient from "./FaqClient";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Bhardwaj Finance Services",
  description: "Find answers to your questions about home loans, business financing, personal loans, and credit scores.",
};

export default async function FaqsPage() {
  const faqs = await prisma.faq.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  const allCategories = Array.from(new Set<string>(
    faqs.map((f: any) => f.category)
  )).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-slate-950 text-white pt-24 pb-20 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-purple-950/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">Frequently Asked <span className="text-purple-400">Questions</span></h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">Quick answers to questions about our loan services, interest rates, and approval processes.</p>
        </div>
      </section>

      {/* Advanced Interactive Client-Side Listing */}
      <FaqClient initialFaqs={faqs} allCategories={allCategories} />

      <Footer />
    </div>
  );
}
