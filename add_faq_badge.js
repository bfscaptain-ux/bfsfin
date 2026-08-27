const fs = require('fs');

let content = fs.readFileSync('src/app/admin/faqs/page.tsx', 'utf8');

const regex = /<h1 className="text-2xl font-black text-white flex items-center gap-2">\s*<HelpCircle className="w-6 h-6 text-emerald-400" \/> FAQ & AEO CMS\s*<\/h1>/;

const newHeader = `<h1 className="text-2xl font-black text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-emerald-400" /> FAQ & AEO CMS
            <span className="bg-emerald-800 text-emerald-300 text-sm px-3 py-0.5 rounded-full border border-emerald-700/50">{faqs.length} Total</span>
          </h1>`;

content = content.replace(regex, newHeader);
fs.writeFileSync('src/app/admin/faqs/page.tsx', content);
console.log('Added total FAQ count badge!');
