const fs = require('fs');
let content = fs.readFileSync('src/components/EMICalculator.tsx', 'utf8');

// 1. Remove (PNB Special) from the slider scale
content = content.replace('<span>6.50% (PNB Special)</span>', '<span>6.50%</span>');

// 2. Replace the banner
// The banner starts near line 185 with `<div className="mt-8 bg-emerald-50`
const regex = /<div className="mt-8 bg-emerald-50[\s\S]*?Apply Now\n\s*<\/Link>\n\s*<\/div>/m;

const newBanner = `<div className="mt-8 bg-emerald-50 dark:bg-emerald-950/50 p-4 sm:p-5 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
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
            </div>
            <Link
              href="/apply"
              className="w-full sm:w-auto bg-emerald-500 text-white dark:text-slate-950 text-sm font-bold px-6 py-3 rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg text-center whitespace-nowrap"
            >
              Apply Now
            </Link>
          </div>`;

content = content.replace(regex, newBanner);

fs.writeFileSync('src/components/EMICalculator.tsx', content);
console.log('Fixed EMICalculator properly');
