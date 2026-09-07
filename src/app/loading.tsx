export default function RootLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans selection:bg-emerald-500/30 flex flex-col">
      {/* Top Bar Skeleton */}
      <div className="h-9 bg-emerald-950/80 border-b border-emerald-900/40 hidden md:block" />

      {/* Header Skeleton */}
      <div className="h-20 bg-white dark:bg-emerald-950/90 border-b border-slate-200 dark:border-emerald-800/80 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-emerald-900/60 animate-pulse" />
          <div className="space-y-1.5">
            <div className="w-36 h-4 rounded bg-slate-200 dark:bg-emerald-900/60 animate-pulse" />
            <div className="w-20 h-2.5 rounded bg-slate-100 dark:bg-emerald-900/40 animate-pulse" />
          </div>
        </div>
        <div className="hidden xl:flex items-center gap-6">
          <div className="w-16 h-4 rounded bg-slate-200 dark:bg-emerald-900/50 animate-pulse" />
          <div className="w-20 h-4 rounded bg-slate-200 dark:bg-emerald-900/50 animate-pulse" />
          <div className="w-24 h-4 rounded bg-slate-200 dark:bg-emerald-900/50 animate-pulse" />
          <div className="w-20 h-4 rounded bg-slate-200 dark:bg-emerald-900/50 animate-pulse" />
        </div>
        <div className="w-28 h-10 rounded-xl bg-emerald-600/20 dark:bg-emerald-800/40 animate-pulse" />
      </div>

      {/* Hero Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-48 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 animate-pulse" />
            
            <div className="space-y-3">
              <div className="w-3/4 h-10 sm:h-12 rounded-xl bg-slate-200 dark:bg-emerald-900/60 animate-pulse" />
              <div className="w-1/2 h-10 sm:h-12 rounded-xl bg-emerald-500/20 dark:bg-emerald-800/50 animate-pulse" />
            </div>

            <div className="space-y-2.5 max-w-lg">
              <div className="w-full h-4 rounded bg-slate-200 dark:bg-emerald-900/40 animate-pulse" />
              <div className="w-5/6 h-4 rounded bg-slate-200 dark:bg-emerald-900/40 animate-pulse" />
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="w-44 h-12 rounded-xl bg-emerald-600/40 animate-pulse" />
              <div className="w-36 h-12 rounded-xl bg-slate-200 dark:bg-emerald-900/50 animate-pulse" />
            </div>

            {/* Quick Stats Skeleton */}
            <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-emerald-900/40 border border-slate-200 dark:border-emerald-800/50 space-y-1.5 animate-pulse">
                  <div className="w-12 h-5 rounded bg-slate-200 dark:bg-emerald-800/60" />
                  <div className="w-16 h-3 rounded bg-slate-100 dark:bg-emerald-900/50" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column / Hero Card Skeleton */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-emerald-900/60 border border-slate-200 dark:border-emerald-800/70 shadow-xl space-y-5 animate-pulse">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-emerald-800/60">
                <div className="w-32 h-5 rounded bg-slate-200 dark:bg-emerald-800/60" />
                <div className="w-16 h-4 rounded bg-emerald-500/20" />
              </div>
              <div className="space-y-3">
                <div className="w-full h-11 rounded-xl bg-slate-100 dark:bg-emerald-950/60" />
                <div className="w-full h-11 rounded-xl bg-slate-100 dark:bg-emerald-950/60" />
                <div className="w-full h-11 rounded-xl bg-slate-100 dark:bg-emerald-950/60" />
              </div>
              <div className="w-full h-12 rounded-xl bg-emerald-600/40 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
