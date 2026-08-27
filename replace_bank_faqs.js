const fs = require('fs');

let content = fs.readFileSync('src/components/templates/BankPageTemplate.tsx', 'utf8');

// Add import
content = content.replace(
  'import { ArrowRight, CheckCircle2, ChevronDown, Check, Zap, Percent, Clock } from "lucide-react";',
  'import { ArrowRight, CheckCircle2, ChevronDown, Check, Zap, Percent, Clock } from "lucide-react";\nimport DynamicFaq from "@/components/DynamicFaq";'
);

const regex = /<div className="space-y-4">\s*\{data\.faqs\.map\(\(faq, index\) => \([\s\S]*?<\/div>\s*\)\)}\s*<\/div>/;

const newFaq = `<div className="space-y-4">
            <DynamicFaq category={data.name} />
          </div>`;

content = content.replace(regex, newFaq);
fs.writeFileSync('src/components/templates/BankPageTemplate.tsx', content);
console.log('Replaced Bank FAQs!');
