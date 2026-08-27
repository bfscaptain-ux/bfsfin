const fs = require('fs');
let content = fs.readFileSync('src/components/calculators/BalanceTransferCalculator.tsx', 'utf8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n');

// Update Amount Limits
content = content.replace('max={20000000}', 'max={1000000000}'); // 100 Cr

// Update Tenure Limits
content = content.replace('max={30}', 'max={40}');

// Update Current Rate Limits
content = content.replace('min={6.0}', 'min={1}');
content = content.replace('max={15.0}', 'max={30}');

// Update New Rate Limits
// Because there are two rate sliders, the previous replace might have only hit the first, so let's do a global replace for the slider ranges
content = content.replace(/min=\{6\.0\}/g, 'min={1}');
content = content.replace(/max=\{15\.0\}/g, 'max={30}');


// 1. Outstanding Amount Input
const oldAmountStr = `<motion.span
                key={outstandingAmount}
                initial={{ scale: 1.1, color: "#10b981" }}
                animate={{ scale: 1, color: "var(--tw-colors-emerald-500)" }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                ₹{(outstandingAmount / 100000).toFixed(1)} Lakhs
              </motion.span>`;

const newAmountStr = `<div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">₹</span>
                <input
                  type="number"
                  value={outstandingAmount}
                  onChange={(e) => setOutstandingAmount(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-32 outline-none text-right"
                />
              </div>`;

content = content.replace(oldAmountStr, newAmountStr);

// 2. Remaining Tenure Input
const oldTenureStr = `<motion.span
                key={remainingTenure}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-emerald-600 dark:text-emerald-400 font-extrabold text-xl bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-lg"
              >
                {remainingTenure} Years
              </motion.span>`;

const newTenureStr = `<div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={remainingTenure}
                  onChange={(e) => setRemainingTenure(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-16 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">Yrs</span>
              </div>`;

content = content.replace(oldTenureStr, newTenureStr);

// 3. Current Rate Input
const oldCurrentRateStr = `<span className="text-slate-900 dark:text-slate-100 font-extrabold text-lg">{currentRate.toFixed(2)}%</span>`;
const newCurrentRateStr = `<div className="flex items-center bg-slate-200 dark:bg-slate-800 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                  className="bg-transparent text-slate-900 dark:text-slate-100 font-extrabold text-lg w-20 outline-none text-right"
                />
                <span className="text-slate-900 dark:text-slate-100 font-bold ml-1">%</span>
              </div>`;

content = content.replace(oldCurrentRateStr, newCurrentRateStr);

// 4. New Rate Input
const oldNewRateStr = `<span className="text-emerald-700 dark:text-emerald-300 font-extrabold text-lg">{newRate.toFixed(2)}%</span>`;
const newNewRateStr = `<div className="flex items-center bg-emerald-100 dark:bg-emerald-900/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="bg-transparent text-emerald-700 dark:text-emerald-300 font-extrabold text-lg w-20 outline-none text-right"
                />
                <span className="text-emerald-700 dark:text-emerald-300 font-bold ml-1">%</span>
              </div>`;

content = content.replace(oldNewRateStr, newNewRateStr);

fs.writeFileSync('src/components/calculators/BalanceTransferCalculator.tsx', content);
console.log('Fixed Balance Transfer Calculator');
