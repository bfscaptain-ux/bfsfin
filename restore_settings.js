const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace('const homeLoanRate = "6.50";', 'const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";');
content = content.replace('const balanceTransferRate = "6.45";', 'const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";');
// Update the fallback to inject the dynamic rate
content = content.replace('Lowest Interest Rates Guaranteed (from 6.50%)', 'Lowest Interest Rates Guaranteed (from ${settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50"}%)');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Restored settingsRecords in page.tsx');
