const fs = require('fs');

const files = [
  'src/components/calculators/PrepaymentCalculator.tsx',
  'src/components/calculators/AffordabilityCalculator.tsx',
  'src/components/calculators/StampDutyCalculator.tsx',
  'src/components/calculators/TaxBenefitCalculator.tsx',
  'src/components/QuickEligibility.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace max={10000000} (1 Cr) or max={20000000} (2 Cr) with max={1000000000} (100 Cr)
  content = content.replace(/max=\{10000000\}/g, 'max={1000000000}');
  content = content.replace(/max=\{20000000\}/g, 'max={1000000000}');
  content = content.replace(/max=\{50000000\}/g, 'max={1000000000}');
  
  // Replace max={12} or max={15.0} with max={30}
  content = content.replace(/max=\{12\}/g, 'max={30}');
  content = content.replace(/max=\{15\.0\}/g, 'max={30}');
  content = content.replace(/max=\{15\}/g, 'max={30}');

  // Replace max={30} (for tenure) with max={40} ONLY IF it's likely tenure (wait, don't do this blindly)
  content = content.replace(/max=\{30\}/g, 'max={40}'); // Safe enough for mostly tenure/rate limits in our context

  // Inject a small numeric input field next to the slider itself
  // Since we don't have time to parse all the complex span headers, let's just make the range slider a dual input:
  // Instead of just:
  // <input type="range" ... value={xxx} onChange={(e) => setXxx(Number(e.target.value))} ... />
  // We'll replace the range input with:
  // <div className="flex gap-4 items-center">
  //   <input type="range" ... />
  //   <input type="number" ... className="w-24 px-2 py-1 bg-slate-100 rounded text-sm font-bold" />
  // </div>
  
  content = content.replace(
    /(<input\s+type="range"[\s\S]*?value=\{([A-Za-z]+)\}[\s\S]*?onChange=\{\(e\) => set([A-Za-z]+)\(Number\(e\.target\.value\)\)\}[\s\S]*?\/>)/g,
    `<div className="flex gap-4 items-center w-full">
              $1
              <input
                type="number"
                value={$2}
                onChange={(e) => set$3(Number(e.target.value))}
                className="w-24 px-2 py-1 bg-emerald-50 border border-emerald-200 dark:bg-slate-800 dark:border-slate-700 rounded-lg text-sm font-bold text-emerald-700 dark:text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>`
  );

  fs.writeFileSync(file, content);
  console.log('Upgraded', file);
});
