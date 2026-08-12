import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { PrismaClient } from "@prisma/client";
import CareersClient from "./CareersClient";

const prisma = new PrismaClient();

export const metadata = {
  title: "Careers & Jobs | BFS Agra",
  description: "Join Bhardwaj Financial Services and build a rewarding career in finance, sales, and operations.",
};

export default async function CareersPage() {
  const jobs = await prisma.careerJob.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  const departments = Array.from(new Set(jobs.map((j: any) => j.department)));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-900 dark:to-[#0b132b] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full font-bold text-sm">
            🚀 Join Our Growing Team
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Career</span> With Us
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            We are looking for passionate, driven individuals to join Uttar Pradesh's leading financial services company.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[50px] md:h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path className="fill-slate-50 dark:fill-[#0b132b]" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* Interactive Client-Side Listing */}
      <CareersClient initialJobs={jobs} departments={departments} />

      <Footer />
      <FloatingSupport />
    </div>
  );
}
