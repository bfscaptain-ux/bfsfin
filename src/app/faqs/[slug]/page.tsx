import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronLeft, HelpCircle, Calendar, Tag } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { slug: string } }, parent: ResolvingMetadata): Promise<Metadata> {
  const faq = await prisma.faq.findUnique({ where: { slug: params.slug } });
  if (!faq) return { title: "FAQ Not Found" };
  
  return {
    title: `${faq.question} | BFS FAQs`,
    description: faq.answer.substring(0, 150).replace(/<[^>]+>/g, ''),
  };
}

export default async function SingleFaqPage({ params }: { params: { slug: string } }) {
  const faq = await prisma.faq.findUnique({
    where: { slug: params.slug },
  });

  if (!faq || !faq.isPublished) {
    notFound();
  }

  // JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/<[^>]+>/g, '') // strip HTML for schema
      }
    }]
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 py-20 px-4 max-w-4xl mx-auto w-full pt-32">
        
        <Link href="/faqs" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-purple-600 transition-colors mb-8">
          <ChevronLeft className="w-4 h-4" /> Back to all FAQs
        </Link>

        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="flex items-center gap-4 mb-6">
             <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
               <HelpCircle className="w-6 h-6" />
             </div>
             <div>
               <span className="bg-slate-100 text-slate-600 px-3 py-1 text-xs font-bold rounded-lg mb-2 inline-block">
                 {faq.category}
               </span>
               <div className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                 <Calendar className="w-3.5 h-3.5"/> 
                 Updated {new Date(faq.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
               </div>
             </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
            {faq.question}
          </h1>

          <div className="prose prose-lg prose-slate max-w-none prose-a:text-purple-600 hover:prose-a:text-purple-700 prose-headings:font-bold">
            <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </div>
        </article>

      </main>

      <Footer />
    </div>
  );
}
