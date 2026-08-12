import { PrismaClient } from "@prisma/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import BlogListClient from "./BlogListClient";

const prisma = new PrismaClient();

export const metadata: Metadata = {
  title: "Insights & Articles | Bhardwaj Finance Services",
  description: "Read the latest financial insights, loan tips, and banking guides from the experts at Bhardwaj Finance Services.",
};

export default async function BlogsPage() {
  // Fetch ALL published blogs for instant client-side filtering and search
  const blogs = await prisma.blog.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  // Extract unique tags from all published blogs for the filter sidebar
  const allTags = Array.from(new Set<string>(
    blogs.flatMap((b: any) => b.tags ? b.tags.split(',').map((t: string) => t.trim()) : [])
  )).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-slate-950 text-white pt-24 pb-20 relative overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-blue-950/20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        
        {/* Decorative Column Chart Background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-32 flex items-end justify-center gap-2 sm:gap-4 opacity-20 pointer-events-none">
          {[40, 70, 45, 90, 60, 100, 75, 50, 85, 65, 30].map((height, i) => (
            <div 
              key={i} 
              className={`w-8 sm:w-16 rounded-t-lg transition-all duration-1000 ${i % 2 === 0 ? 'bg-emerald-500/50' : 'bg-blue-500/50'}`}
              style={{ height: `${height}%`, animationDelay: `${i * 100}ms` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-transparent to-white/20 rounded-t-lg"></div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">Financial Insights <span className="text-emerald-400">&</span> Guides</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">Expert advice on home loans, business financing, and wealth management to help you make informed decisions.</p>
        </div>
      </section>

      {/* Advanced Interactive Client-Side Listing */}
      <BlogListClient initialBlogs={blogs} allTags={allTags} />

      <Footer />
    </div>
  );
}
