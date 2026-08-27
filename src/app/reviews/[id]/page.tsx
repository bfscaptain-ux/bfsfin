import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Star, MapPin, Quote, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const review = await prisma.review.findUnique({ where: { id: params.id } });
  
  if (!review) {
    return {
      title: "Review Not Found - Bhardwaj Financial Services",
    };
  }

  // Generate SEO friendly title and description
  return {
    title: `${review.name}'s Experience with Bhardwaj Financial Services | Review`,
    description: `Read ${review.name} from ${review.location || "India"}'s review about Bhardwaj Financial Services. ${review.text.substring(0, 120)}...`,
    openGraph: {
      title: `${review.name} rated us ${review.rating} Stars!`,
      description: review.text,
      type: "article",
    }
  };
}

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function ReviewPage({ params }: { params: { id: string } }) {
  const review = await prisma.review.findUnique({ where: { id: params.id } });

  if (!review) {
    return notFound();
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Watermark Logo */}
          <div className="absolute -bottom-8 -right-8 opacity-5 pointer-events-none">
            <img src="/logo.png" alt="" className="w-64 h-auto grayscale" />
          </div>

          <div className="flex items-start justify-between mb-8 relative">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-black text-2xl uppercase shadow-inner">
                {review.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  {review.name}
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                </h1>
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium mt-1">
                  <MapPin className="w-4 h-4" />
                  {review.location || "India"}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-100 text-slate-100 dark:fill-slate-800 dark:text-slate-700'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {new Date(review.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="relative">
            <Quote className="w-12 h-12 text-emerald-100 dark:text-emerald-800/50 absolute -top-4 -left-4 -z-10 transform -rotate-12" />
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed z-10 relative">
              "{review.text}"
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-emerald-900 rounded-3xl p-8 border border-emerald-800 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-3">Want to experience this yourself?</h3>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">Get your Home Loan or Loan Against Property approved in just 5 days with zero hidden fees.</p>
          <Link href="/apply" className="inline-block bg-white text-emerald-900 px-8 py-4 rounded-xl font-black hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl">
            Apply Now
          </Link>
        </div>

      </div>
    </div>
      <Footer />
    </>
  );
}
