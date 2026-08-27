const fs = require('fs');
const path = require('path');

const directories = [
  './src/app/partner-dashboard',
  './src/components/partner'
];

const mappings = [
  { regex: /\bbg-\[\#0B1120\]\b/g, replace: 'bg-slate-50 dark:bg-[#0B1120]' },
  { regex: /\bbg-\[\#0F172A\]\b/g, replace: 'bg-white dark:bg-[#0F172A]' },
  { regex: /\bbg-slate-950\b/g, replace: 'bg-slate-50 dark:bg-slate-950' },
  { regex: /\bbg-slate-900\b/g, replace: 'bg-white dark:bg-slate-900' },
  { regex: /\bbg-slate-800\b/g, replace: 'bg-slate-100 dark:bg-slate-800' },
  
  { regex: /\bborder-slate-800\b/g, replace: 'border-slate-200 dark:border-slate-800' },
  { regex: /\bborder-slate-700\b/g, replace: 'border-slate-300 dark:border-slate-700' },
  { regex: /\bborder-slate-600\b/g, replace: 'border-slate-400 dark:border-slate-600' },
  
  { regex: /\btext-white\b/g, replace: 'text-slate-900 dark:text-white' },
  { regex: /\btext-slate-300\b/g, replace: 'text-slate-700 dark:text-slate-300' },
  { regex: /\btext-slate-400\b/g, replace: 'text-slate-600 dark:text-slate-400' },
  { regex: /\btext-slate-500\b/g, replace: 'text-slate-500 dark:text-slate-500' },
];

function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      mappings.forEach(mapping => {
        content = content.replace(mapping.regex, mapping.replace);
      });
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Processed: ${fullPath}`);
    }
  });
}

directories.forEach(processDirectory);
console.log('Done!');
