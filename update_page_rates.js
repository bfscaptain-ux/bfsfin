const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

content = content.replace('const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";',
`const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";
  const businessLoanRate = settingsRecords.find(s => s.key === "businessLoanRate")?.value || "12.50";
  const lapRate = settingsRecords.find(s => s.key === "lapRate")?.value || "7.50";
  const personalLoanRate = settingsRecords.find(s => s.key === "personalLoanRate")?.value || "10.50";`);

content = content.replace(
  '<HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} contactPhone={contactPhone} whatsappPhone={whatsappPhone} />',
  '<HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} businessLoanRate={businessLoanRate} lapRate={lapRate} personalLoanRate={personalLoanRate} contactPhone={contactPhone} whatsappPhone={whatsappPhone} />'
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Added all rates to page.tsx');
