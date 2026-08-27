const fs = require('fs');

let content = fs.readFileSync('src/components/templates/ProductPageTemplate.tsx', 'utf8');

content = content.replace(
  'import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";',
  'import { ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";\nimport DynamicFaq from "@/components/DynamicFaq";'
);

const regex = /<div className="space-y-4">\s*\{data\.faqs\.map\(\(faq, index\) => \([\s\S]*?<\/div>\s*\)\)}\s*<\/div>/;

const newFaq = `<div className="space-y-4">
            <DynamicFaq category={data.title} />
          </div>`;

content = content.replace(regex, newFaq);
fs.writeFileSync('src/components/templates/ProductPageTemplate.tsx', content);
console.log('Replaced Product FAQs!');
