const fs = require('fs');
let content = fs.readFileSync('src/components/EMICalculator.tsx', 'utf8');

// 1. Expand Slider limits
content = content.replace('max={10000000}', 'max={1000000000}'); // 100 Cr
content = content.replace('<span>₹1 Crore+</span>', '<span>₹100 Cr</span>');
content = content.replace('<span>₹50 Lakhs</span>', '<span>₹50 Cr</span>');

content = content.replace('max={12}', 'max={30}'); // 30% rate
content = content.replace('<span>12.00%</span>', '<span>30.00%</span>');
content = content.replace('<span>8.50%</span>', '<span>15.00%</span>');
content = content.replace('min={6.5}', 'min={1}');
content = content.replace('<span>6.50%</span>', '<span>1.00%</span>');

content = content.replace('max={30}', 'max={40}'); // 40 Years

// 2. Add editable inputs
const oldLoanAmountDisplay = /<motion\.span[\s\S]*?\{\(loanAmount \/ 100000\)\.toFixed\(1\)\} Lakhs\n\s*<\/motion\.span>/;
const newLoanAmountDisplay = `
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold mr-1">₹</span>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-32 outline-none text-right"
                />
              </div>`;
content = content.replace(oldLoanAmountDisplay, newLoanAmountDisplay);

const oldRateDisplay = /<motion\.span[\s\S]*?\{rate\.toFixed\(2\)\}\%\n\s*<\/motion\.span>/;
const newRateDisplay = `
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-20 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">%</span>
              </div>`;
content = content.replace(oldRateDisplay, newRateDisplay);

const oldTenureDisplay = /<motion\.span[\s\S]*?\{tenure\} Years\n\s*<\/motion\.span>/;
const newTenureDisplay = `
              <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/50 rounded-lg px-2 py-1">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="bg-transparent text-emerald-600 dark:text-emerald-400 font-extrabold text-xl w-16 outline-none text-right"
                />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-1">Yrs</span>
              </div>`;
content = content.replace(oldTenureDisplay, newTenureDisplay);

fs.writeFileSync('src/components/EMICalculator.tsx', content);
console.log('Made EMI calculator fully editable and uncapped limits');
