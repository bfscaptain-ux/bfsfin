const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(
  '"Lowest Interest Rates Guaranteed (from ${settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50"}%)"',
  '`Lowest Interest Rates Guaranteed (from ${settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50"}%)`'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed syntax error');
