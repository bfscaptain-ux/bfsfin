import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { ChevronRight, HelpCircle } from "lucide-react";
import Link from 'next/link';
import Script from 'next/script';
import FaqSidebar from '@/components/FaqSidebar';

// Fetch single FAQ
async function getFaq(slug: string) {
  const fs = await import('fs/promises');
  const path = await import('path');
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');
  
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    let faqs = JSON.parse(fileContents);
    
    // Add missing fields for older entries
    faqs = faqs.map((f: any) => ({
      ...f,
      slug: f.slug || f.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: f.category || 'General',
      status: f.status || 'published'
    }));

    const faq = faqs.find((f: any) => f.slug === slug);
    return { faq, allFaqs: faqs };
  } catch (e) {
    return { faq: null, allFaqs: [] };
  }
}

// Generate Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { faq } = await getFaq(params.slug);
  if (!faq) return { title: 'Not Found' };
  
  const cleanAnswer = faq.answer.replace(/<[^>]*>?/gm, '').substring(0, 160);

  return {
    title: `${faq.seoTitle || faq.question} | BFS Agra FAQ`,
    description: faq.metaDescription || cleanAnswer,
    openGraph: {
      title: faq.seoTitle || faq.question,
      description: faq.metaDescription || cleanAnswer,
    },
  };
}

export default async function FaqPostPage({ params }: { params: { slug: string } }) {
  const { faq, allFaqs } = await getFaq(params.slug);

  if (!faq) {
    notFound();
  }

  // Get related FAQs
  const relatedFaqs = allFaqs
    .filter((f: any) => f.category === faq.category && f.id !== faq.id && f.status !== 'draft')
    .slice(0, 5);

  const cleanAnswer = faq.answer.replace(/<[^>]*>?/gm, '');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": faq.question,
      "text": faq.question,
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": cleanAnswer
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 text-slate-900 dark:text-slate-100 font-sans">
      <Header />
      
      <Script id="qa-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-24 sm:py-32 flex flex-col lg:flex-row gap-10">
        {/* Left Sidebar - Knowledge Base Navigation */}
        <FaqSidebar allFaqs={allFaqs} currentSlug={faq.slug} />

        {/* Right Content - Answer Body */}
        <article className="flex-1 max-w-3xl w-full">
          {/* Mobile Back Button */}
          <div className="lg:hidden mb-6">
            <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to FAQ
            </Link>
          </div>

          <div className="mb-6 flex items-center gap-2 text-emerald-500 font-bold text-sm uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> {faq.category}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-8">
            {faq.question}
          </h1>

          <div className="bg-white dark:bg-emerald-900/40 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-emerald-800/50 pb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Official Answer</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verified by BFS Knowledge Base</p>
              </div>
            </div>

            <div 
              className="prose prose-lg dark:prose-invert prose-emerald max-w-none 
              prose-p:leading-relaxed prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
              prose-strong:text-slate-900 dark:prose-strong:text-emerald-300
              prose-ul:text-slate-700 dark:prose-ul:text-slate-300"
              dangerouslySetInnerHTML={{ __html: faq.answer }} 
            />
          </div>
          
          {/* Mobile Related FAQs (Shows on bottom for mobile only) */}
          <div className="lg:hidden mt-12">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">More Questions</h3>
            <div className="space-y-3">
              {relatedFaqs.map((rel: any) => (
                <Link href={`/faq/${rel.slug}`} key={rel.id} className="flex items-center gap-3 p-4 bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-xl hover:shadow-md transition group">
                  <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="font-bold text-slate-700 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">{rel.question}</span>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
