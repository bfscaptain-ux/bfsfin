const fs = require('fs');

const files = [
  'src/components/templates/ProductPageTemplate.tsx',
  'src/components/templates/BankPageTemplate.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(
    'import { useState } from "react";',
    'import { useState } from "react";\nimport DynamicFaq from "@/components/DynamicFaq";'
  );
  // Just in case it imports react differently
  if (!content.includes('import DynamicFaq')) {
      content = content.replace(
          'import Header from "@/components/Header";',
          'import Header from "@/components/Header";\nimport DynamicFaq from "@/components/DynamicFaq";'
      );
  }
  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
}
