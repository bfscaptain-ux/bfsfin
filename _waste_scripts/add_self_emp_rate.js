const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

// 1. Fetch selfEmployedRate
content = content.replace(
  'const businessLoanRate = settingsRecords.find(s => s.key === "businessLoanRate")?.value || "12.50";',
  'const businessLoanRate = settingsRecords.find(s => s.key === "businessLoanRate")?.value || "12.50";\n  const selfEmployedRate = settingsRecords.find(s => s.key === "selfEmployedRate")?.value || "7.25";'
);

// 2. Pass selfEmployedRate to HomeClient
content = content.replace(
  'balanceTransferRate={balanceTransferRate} businessLoanRate={businessLoanRate}',
  'balanceTransferRate={balanceTransferRate} selfEmployedRate={selfEmployedRate} businessLoanRate={businessLoanRate}'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Added selfEmployedRate to page.tsx');
