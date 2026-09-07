const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace(
  '<ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />',
  '<img src="/logo.png" alt="Bhardwaj Finance" className="w-16 h-auto object-contain" />'
);

content = content.replace(
  'w-20 h-20 bg-emerald-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_0_8px_rgba(16,185,129,0.1)] dark:shadow-[0_0_0_8px_rgba(16,185,129,0.05)]',
  'w-24 h-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-[0_0_0_8px_rgba(16,185,129,0.15)] relative z-10'
);

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Swapped icon with logo!');
