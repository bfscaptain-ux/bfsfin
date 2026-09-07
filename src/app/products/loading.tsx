export default function ProductsLoading() {
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
        <section className="relative overflow-hidden bg-slate-950 pt-20 pb-20 lg:pt-28 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="w-32 h-6 rounded-full bg-emerald-900/50 animate-pulse" />
              <div className="space-y-3">
                <div className="w-full h-10 sm:h-12 lg:h-14 rounded-xl bg-slate-800 animate-pulse" />
                <div className="w-3/4 h-10 sm:h-12 lg:h-14 rounded-xl bg-emerald-900/50 animate-pulse" />
              </div>
              <div className="space-y-2.5 max-w-lg">
                <div className="w-full h-4 rounded bg-slate-800 animate-pulse" />
                <div className="w-5/6 h-4 rounded bg-slate-800 animate-pulse" />
                <div className="w-4/6 h-4 rounded bg-slate-800 animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="w-40 h-12 rounded-xl bg-emerald-600/40 animate-pulse" />
                <div className="w-32 h-12 rounded-xl bg-slate-800 animate-pulse" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 hidden md:block">
              <div className="aspect-[4/3] rounded-3xl bg-slate-800/50 animate-pulse border border-slate-700/50" />
            </div>
          </div>
        </section>

        <section className="py-16 bg-white dark:bg-emerald-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-emerald-900/40 border border-slate-100 dark:border-emerald-800/50 animate-pulse space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-800/60" />
                  <div className="w-3/4 h-5 rounded bg-slate-200 dark:bg-emerald-800/60" />
                  <div className="space-y-2">
                    <div className="w-full h-3 rounded bg-slate-100 dark:bg-emerald-900/50" />
                    <div className="w-5/6 h-3 rounded bg-slate-100 dark:bg-emerald-900/50" />
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
