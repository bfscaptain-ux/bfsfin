import { prisma } from "@/lib/prisma";
import { Star, MapPin, ArrowLeft, ShieldCheck, ThumbsUp, Users } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Header from "@/components/Header";
import InteractiveReviewGrid from "@/components/InteractiveReviewGrid";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "All Client Reviews | Bhardwaj Financial Services",
  description: "Read thousands of reviews from satisfied clients who got their home loans and LAP approved through Bhardwaj Financial Services.",
};

export const dynamic = 'force-dynamic';

export default async function AllReviewsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = parseInt(searchParams.page || "1");
  const limit = 21;
  const skip = (page - 1) * limit;

  const [reviews, totalCount, heroImage, aggregates] = await Promise.all([
    prisma.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.review.count({
      where: { status: "APPROVED" }
    }),
    prisma.heroImage.findUnique({
      where: { pageId: "reviews" }
    }),
    prisma.review.aggregate({
      where: { status: "APPROVED" },
      _avg: { rating: true }
    })
  ]);

  const averageRating = (aggregates._avg.rating || 5.0).toFixed(1);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <Header />
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-soft {
          animation: float-soft 6s ease-in-out infinite;
        }
      `}} />
      
      {/* Curved Hero Section */}
      <div className="relative bg-emerald-900 pt-20 pb-40 overflow-hidden">
        {/* Background decorative elements */}
        {heroImage?.imageUrl ? (
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <img src={heroImage.imageUrl} alt="Background" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/95 via-emerald-900/80 to-emerald-950/100 backdrop-blur-[3px]"></div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-50 to-emerald-200 mb-6 tracking-tight drop-shadow-sm">
                Client Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-2xl mx-auto lg:mx-0 font-medium mb-12 leading-relaxed">
                Don't just take our word for it. See why {totalCount} families trust Bhardwaj Financial Services with their dreams.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-8 relative z-20 animate-in fade-in slide-in-from-left-8 duration-700 delay-200">
                
                {/* 5 Solid Stars */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5 drop-shadow-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-white font-black text-xl">{averageRating}<span className="text-white/50 text-base font-bold">/5</span></span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 hidden sm:block"></div>
                
                {/* Micro Avatar Stack */}
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2 drop-shadow-md">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 border-2 border-emerald-900 flex items-center justify-center text-[9px] font-black text-emerald-950">A</div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-300 to-teal-500 border-2 border-emerald-900 flex items-center justify-center text-[9px] font-black text-teal-950">S</div>
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-300 to-cyan-500 border-2 border-emerald-900 flex items-center justify-center text-[9px] font-black text-cyan-950">R</div>
                  </div>
                  <span className="text-white font-black text-xl">{totalCount} <span className="text-emerald-200/80 font-bold text-sm tracking-widest uppercase ml-1">Families</span></span>
                </div>
                
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 hidden sm:block"></div>
                
                {/* Solid Glowing Checkmark */}
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-white font-black text-xl">100% <span className="text-emerald-200/80 font-bold text-sm tracking-widest uppercase ml-1">Genuine</span></span>
                </div>
                
              </div>
            </div>

            {/* Right Large Logo */}
            <div className="hidden lg:flex justify-end items-center animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full"></div>
                <img src="/logo.png" alt="BFS Official" className="relative z-10 w-full max-w-[450px] h-auto object-contain brightness-0 invert opacity-90 drop-shadow-2xl animate-float-soft" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Interactive Grid Client Component */}
      <div className="min-h-screen bg-slate-50 dark:bg-emerald-950">
        <InteractiveReviewGrid 
          initialReviews={reviews} 
          totalPages={totalPages} 
          currentPage={page} 
        />
      </div>
      <Footer />
    </>
  );
}