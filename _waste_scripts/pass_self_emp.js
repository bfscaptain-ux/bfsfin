const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

content = content.replace(
  'homeLoanRate, balanceTransferRate, businessLoanRate,',
  'homeLoanRate, balanceTransferRate, selfEmployedRate, businessLoanRate,'
);

content = content.replace(
  'homeLoanRate?: string, balanceTransferRate?: string, businessLoanRate?: string,',
  'homeLoanRate?: string, balanceTransferRate?: string, selfEmployedRate?: string, businessLoanRate?: string,'
);

content = content.replace(
  '<QuickEligibility homeLoanRate={homeLoanRate} businessLoanRate={businessLoanRate} />',
  '<QuickEligibility homeLoanRate={homeLoanRate} selfEmployedRate={selfEmployedRate} />'
);

fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Passed selfEmployedRate through HomeClient');
