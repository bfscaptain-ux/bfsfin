export default function CreditCardsLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans transition-colors duration-300 flex flex-col">
      <div className="h-20 bg-white dark:bg-emerald-950/90 border-b border-slate-200 dark:border-emerald-800/80 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-emerald-900/60 animate-pulse" />
          <div className="w-36 h-4 rounded bg-slate-200 dark:bg-emerald-900/60 animate-pulse hidden sm:block" />
        </div>
        <div className="w-28 h-10 rounded-xl bg-emerald-600/20 dark:bg-emerald-800/40 animate-pulse" />
      </div>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-950 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="w-40 h-7 rounded-full bg-emerald-900/50 animate-pulse" />
              <div className="space-y-3">
                <div className="w-full h-10 sm:h-12 lg:h-14 rounded-xl bg-slate-800 animate-pulse" />
                <div className="w-3/4 h-10 sm:h-12 lg:h-14 rounded-xl bg-emerald-900/50 animate-pulse" />
              </div>
              <div className="space-y-2.5 max-w-lg">
                <div className="w-full h-4 rounded bg-slate-800 animate-pulse" />
                <div className="w-5/6 h-4 rounded bg-slate-800 animate-pulse" />
              </div>
              <div className="w-44 h-12 rounded-xl bg-emerald-600/40 animate-pulse mt-4" />
            </div>
            <div className="w-full lg:w-1/2 hidden md:flex items-center justify-center">
              <div className="w-[300px] h-[190px] rounded-xl bg-slate-800/80 animate-pulse border border-slate-700 shadow-2xl rotate-y-[-20deg] rotate-x-[10deg] rotate-z-[-5deg]" />
            </div>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-16 bg-white dark:bg-emerald-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-64 h-8 rounded-lg bg-slate-200 dark:bg-emerald-900/40 animate-pulse mb-8 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-3xl bg-white dark:bg-emerald-900/20 border border-slate-200 dark:border-emerald-800/30 overflow-hidden shadow-lg animate-pulse flex flex-col h-full">
                  <div className="h-28 bg-slate-100 dark:bg-emerald-900/40 w-full" />
                  <div className="px-6 pb-6 pt-16 relative flex-1 flex flex-col">
                    <div className="absolute top-[-40px] left-6 w-[140px] h-[90px] rounded-xl bg-slate-300 dark:bg-emerald-800/60 border-4 border-white dark:border-emerald-950 shadow-md" />
                    <div className="w-1/2 h-6 rounded bg-slate-200 dark:bg-emerald-800/50 mb-2" />
                    <div className="w-1/3 h-4 rounded bg-emerald-100 dark:bg-emerald-900/40 mb-6" />
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex gap-3"><div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-emerald-800/50" /><div className="w-5/6 h-4 rounded bg-slate-100 dark:bg-emerald-900/40" /></div>
                      <div className="flex gap-3"><div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-emerald-800/50" /><div className="w-4/6 h-4 rounded bg-slate-100 dark:bg-emerald-900/40" /></div>
                      <div className="flex gap-3"><div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-emerald-800/50" /><div className="w-3/4 h-4 rounded bg-slate-100 dark:bg-emerald-900/40" /></div>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center border-t border-slate-100 dark:border-emerald-900/30 pt-4">
                      <div className="w-24 h-5 rounded bg-slate-200 dark:bg-emerald-800/50" />
                      <div className="w-28 h-10 rounded-xl bg-emerald-500/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
