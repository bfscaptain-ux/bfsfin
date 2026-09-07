const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace(
  'const personalLoanRate = settingsRecords.find(s => s.key === "personalLoanRate")?.value || "10.50";',
  'const personalLoanRate = settingsRecords.find(s => s.key === "personalLoanRate")?.value || "10.50";\n  const goldLoanRate = settingsRecords.find(s => s.key === "goldLoanRate")?.value || "8.50";'
);

content = content.replace(
  'lapRate={lapRate} personalLoanRate={personalLoanRate}',
  'lapRate={lapRate} personalLoanRate={personalLoanRate} goldLoanRate={goldLoanRate}'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Passed goldLoanRate from page.tsx');
