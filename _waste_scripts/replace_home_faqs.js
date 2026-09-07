const fs = require('fs');

let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

content = content.replace(
  'import Header from "@/components/Header";',
  'import Header from "@/components/Header";\nimport DynamicFaq from "@/components/DynamicFaq";'
);

const regex = /<div className="space-y-3">\s*\{\[\s*\{\s*q: "What is the minimum CIBIL[\s\S]*?<\/details>\s*\)\)}\s*<\/div>/;

const newFaq = `<DynamicFaq category="General" />`;

content = content.replace(regex, newFaq);
fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Replaced HomeClient FAQs!');
