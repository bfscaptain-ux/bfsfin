import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Loading() {
  return (
    <>
      <Header />
      
      {/* Hero Section Skeleton */}
      <div className="relative bg-emerald-900 pt-20 pb-40 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content Skeleton */}
            <div className="text-center lg:text-left">
              <div className="w-3/4 max-w-2xl h-16 md:h-20 bg-emerald-800 rounded-2xl mx-auto lg:mx-0 mb-6 animate-pulse"></div>
              <div className="w-2/3 max-w-xl h-6 bg-emerald-800/50 rounded-lg mx-auto lg:mx-0 mb-10 animate-pulse"></div>
              
              {/* Borderless Stats Skeleton */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center lg:justify-start gap-4 sm:gap-8 mt-8 relative z-20">
                <div className="w-32 h-8 bg-emerald-800/40 rounded-lg animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-800/60 hidden sm:block"></div>
                <div className="w-40 h-8 bg-emerald-800/40 rounded-lg animate-pulse"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-800/60 hidden sm:block"></div>
                <div className="w-28 h-8 bg-emerald-800/40 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Right Giant Logo Skeleton */}
            <div className="hidden lg:flex justify-end items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full"></div>
                <div className="w-[400px] h-[300px] bg-emerald-800/20 rounded-full animate-pulse backdrop-blur-md"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 pb-20 px-4 sm:px-6 lg:px-8 -mt-24 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-emerald-900 p-8 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-sm animate-pulse h-full flex flex-col min-h-[280px]">
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map((_, idx) => <div key={idx} className="w-5 h-5 bg-slate-200 dark:bg-emerald-800 rounded-sm" />)}
                </div>
                <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-3 w-full" />
                <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-3 w-5/6" />
                <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded mb-6 w-4/6" />
                
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-emerald-800 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-emerald-800 shrink-0" />
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-200 dark:bg-emerald-800 rounded w-24" />
                    <div className="h-3 bg-slate-200 dark:bg-emerald-800 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
