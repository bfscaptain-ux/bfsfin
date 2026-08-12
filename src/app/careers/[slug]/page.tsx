import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Briefcase, MapPin, Tag, Clock, CheckCircle2 } from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await prisma.careerJob.findUnique({
    where: { slug: params.slug }
  });

  if (!job) return { title: "Job Not Found" };

  return {
    title: `${job.title} | Careers at BFS Agra`,
    description: `We are hiring for a ${job.title} in ${job.location}. Join our ${job.department} team today!`,
  };
}

export default async function JobPage({ params }: { params: { slug: string } }) {
  const job = await prisma.careerJob.findUnique({
    where: { slug: params.slug }
  });

  if (!job || !job.isActive) {
    notFound();
  }

  // Schema for Google Jobs SEO
  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Bhardwaj Financial Services (BFS Agra)",
      "sameAs": "https://bfsagra.com",
      "logo": "https://bfsagra.com/logo.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Agra",
        "addressRegion": "UP",
        "addressCountry": "IN"
      }
    },
    "employmentType": job.type.toUpperCase().replace("-", "_"),
    "datePosted": job.createdAt.toISOString().split('T')[0],
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }} />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 bg-slate-900 dark:bg-slate-950 overflow-hidden border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/careers" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-10 font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to all jobs
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl p-4 shadow-2xl shrink-0 flex items-center justify-center border border-slate-200">
              {/* Fallback if logo.png doesn't exist yet, using an img tag for simplicity, though we should use Image if optimized */}
              <img src="/logo.png" alt="BFS Agra Logo" className="w-full h-auto object-contain" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm font-bold">
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 text-blue-400 border border-slate-700 backdrop-blur-sm"><MapPin className="w-4 h-4"/> {job.location}</span>
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 text-emerald-400 border border-slate-700 backdrop-blur-sm"><Tag className="w-4 h-4"/> {job.department}</span>
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 text-purple-400 border border-slate-700 backdrop-blur-sm"><Clock className="w-4 h-4"/> {job.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] rounded-full bg-emerald-600/10 blur-3xl pointer-events-none"></div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -mt-12 relative z-20 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800">
            <section>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-blue-500" /> About The Role
              </h2>
              <div 
                className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-blue-600"
                dangerouslySetInnerHTML={{ __html: job.description }} 
              />
            </section>

            {job.requirements && (
              <section className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Requirements
                </h2>
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-li:marker:text-emerald-500"
                  dangerouslySetInnerHTML={{ __html: job.requirements }} 
                />
              </section>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <JobApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </div>

      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
