export default function CalculatorLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-emerald-950 font-sans transition-colors duration-300">
      <div className="h-20 bg-white dark:bg-emerald-950/90 border-b border-slate-200 dark:border-emerald-800/80 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-emerald-900/60 animate-pulse" />
          <div className="w-36 h-4 rounded bg-slate-200 dark:bg-emerald-900/60 animate-pulse hidden sm:block" />
        </div>
        <div className="w-28 h-10 rounded-xl bg-emerald-600/20 dark:bg-emerald-800/40 animate-pulse" />
      </div>

      <main className="flex-1 py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="w-32 h-6 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/10 animate-pulse" />
          <div className="w-3/4 sm:w-1/2 h-10 sm:h-12 mx-auto rounded-xl bg-slate-200 dark:bg-emerald-900/60 animate-pulse" />
          <div className="w-full h-4 max-w-lg mx-auto rounded bg-slate-200 dark:bg-emerald-900/40 animate-pulse mt-4" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mt-8 max-w-6xl mx-auto flex flex-col lg:flex-row">
          <div className="w-full lg:w-5/12 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 space-y-8 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between">
                  <div className="w-24 h-4 rounded bg-slate-200 dark:bg-slate-700" />
                  <div className="w-20 h-6 rounded bg-emerald-100 dark:bg-emerald-900/40" />
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
            <div className="w-full h-12 rounded-xl bg-emerald-500/30 mt-6" />
          </div>

          <div className="w-full lg:w-7/12 p-6 sm:p-8 flex flex-col items-center justify-center animate-pulse">
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-[20px] border-slate-100 dark:border-slate-800 mb-8" />
            <div className="w-full grid grid-cols-2 gap-4 max-w-md">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="w-16 h-3 mx-auto rounded bg-slate-200 dark:bg-slate-700 mb-2" />
                <div className="w-24 h-6 mx-auto rounded bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                <div className="w-16 h-3 mx-auto rounded bg-slate-200 dark:bg-slate-700 mb-2" />
                <div className="w-24 h-6 mx-auto rounded bg-slate-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
