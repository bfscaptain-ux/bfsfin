const fs = require('fs');
let content = fs.readFileSync('src/components/EMICalculator.tsx', 'utf8');

// 1. Tooltip Fix
content = content.replace(
  'backgroundColor: "var(--tw-colors-slate-900)",',
  'backgroundColor: "#0f172a",'
);
content = content.replace(
  'borderColor: "var(--tw-colors-slate-800)",',
  'borderColor: "#1e293b",'
);
content = content.replace(
  'itemStyle={{ color: "white" }}',
  'itemStyle={{ color: "#ffffff" }}'
);

// 2. Editable Inputs Fix
const oldLoanStr = `<motion.span
                key={loanAmount}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(loanAmount / 100000).toFixed(1)} Lakhs
              </motion.span>`;
const newLoanStr = `<div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">₹</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-32 outline-none text-right"
                />
              </div>`;
content = content.replace(oldLoanStr, newLoanStr);

const oldRateStr = `<motion.span
                key={rate}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                {rate.toFixed(2)}%
              </motion.span>`;
const newRateStr = `<div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-20 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">%</span>
              </div>`;
content = content.replace(oldRateStr, newRateStr);

const oldTenureStr = `<motion.span
                key={tenure}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                {tenure} Years
              </motion.span>`;
const newTenureStr = `<div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-16 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">Yrs</span>
              </div>`;
content = content.replace(oldTenureStr, newTenureStr);

fs.writeFileSync('src/components/EMICalculator.tsx', content);
console.log('Fixed inputs and tooltip');
