export default function InsuranceLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] font-sans transition-colors duration-300 flex flex-col">
      <div className="h-20 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
          <div className="w-36 h-4 rounded bg-slate-200 dark:bg-slate-800 animate-pulse hidden sm:block" />
        </div>
        <div className="w-28 h-10 rounded-xl bg-emerald-600/20 dark:bg-emerald-500/20 animate-pulse" />
      </div>

      <main className="flex-1 w-full">
        {/* Split Hero with Form */}
        <section className="relative overflow-hidden bg-slate-950 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="w-48 h-8 rounded-full bg-emerald-900/50 animate-pulse" />
                <div className="space-y-3">
                  <div className="w-full h-10 sm:h-12 lg:h-14 rounded-xl bg-slate-800 animate-pulse" />
                  <div className="w-4/5 h-10 sm:h-12 lg:h-14 rounded-xl bg-emerald-900/50 animate-pulse" />
                </div>
                <div className="space-y-2.5 max-w-lg">
                  <div className="w-full h-4 rounded bg-slate-800 animate-pulse" />
                  <div className="w-5/6 h-4 rounded bg-slate-800 animate-pulse" />
                  <div className="w-3/4 h-4 rounded bg-slate-800 animate-pulse" />
                </div>
                <div className="flex gap-4 pt-2">
                  <div className="w-32 h-10 rounded-lg bg-slate-800 animate-pulse" />
                  <div className="w-32 h-10 rounded-lg bg-slate-800 animate-pulse" />
                  <div className="w-32 h-10 rounded-lg bg-slate-800 animate-pulse" />
                </div>
              </div>
              
              {/* Right Lead Form */}
              <div className="lg:ml-auto w-full max-w-md">
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl animate-pulse space-y-6">
                  <div className="space-y-2">
                    <div className="w-48 h-6 rounded bg-slate-700" />
                    <div className="w-64 h-4 rounded bg-slate-800" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-12 rounded-xl bg-slate-800" />
                    <div className="w-full h-12 rounded-xl bg-slate-800" />
                    <div className="w-full h-12 rounded-xl bg-slate-800" />
                    <div className="w-full h-14 rounded-xl bg-emerald-700/50 mt-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-slate-50 dark:bg-[#0a0f1c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-64 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 animate-pulse mb-8 mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 animate-pulse space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30" />
                  <div className="w-3/4 h-5 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-2">
                    <div className="w-full h-3 rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="w-5/6 h-3 rounded bg-slate-100 dark:bg-slate-800" />
                    <div className="w-4/6 h-3 rounded bg-slate-100 dark:bg-slate-800" />
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
