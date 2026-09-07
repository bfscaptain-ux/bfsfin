const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

content = content.replace(
  'lapRate, personalLoanRate, contactPhone',
  'lapRate, personalLoanRate, goldLoanRate, contactPhone'
);

content = content.replace(
  'lapRate?: string, personalLoanRate?: string, contactPhone',
  'lapRate?: string, personalLoanRate?: string, goldLoanRate?: string, contactPhone'
);

content = content.replace(
  'features: ["90% Gold Value", "Same-Day Cash"]',
  'features: [`Starting at ${goldLoanRate || "8.50"}%`, "90% Gold Value", "Same-Day Cash"]'
);

fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Added goldLoanRate to HomeClient product card');
