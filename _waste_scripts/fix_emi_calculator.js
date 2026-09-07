const fs = require('fs');
let content = fs.readFileSync('src/components/EMICalculator.tsx', 'utf8');

const oldBanner = `            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-emerald-900 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-emerald-800">
                <Award className="w-8 h-8 text-emerald-500 shrink-0" />
              </div>
              <div className="text-sm">
                <div className="font-extrabold text-slate-800 dark:text-slate-200">
                  Recommended: PNB Home Loan
                </div>
                <div className="text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                  Lock in at <strong className="text-emerald-600 dark:text-emerald-400">6.50%</strong> with our 5-day approval guarantee.
                </div>
              </div>
            </div>`;

const newBanner = `            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-emerald-900 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-emerald-800">
                <Award className="w-8 h-8 text-emerald-500 shrink-0" />
              </div>
              <div className="text-sm">
                <div className="font-extrabold text-slate-800 dark:text-slate-200">
                  Fastest 5-Day Loan Approvals
                </div>
                <div className="text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                  Apply now to get your documents digitally verified and securely processed.
                </div>
              </div>
            </div>`;

content = content.replace(oldBanner, newBanner);

fs.writeFileSync('src/components/EMICalculator.tsx', content);
console.log('Fixed EMICalculator banner');
