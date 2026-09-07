const fs = require('fs');
let content = fs.readFileSync('src/components/QuickEligibility.tsx', 'utf8');

content = content.replace(
  'export default function QuickEligibility({ homeLoanRate, businessLoanRate }: { homeLoanRate?: string, businessLoanRate?: string }) {',
  'export default function QuickEligibility({ homeLoanRate, selfEmployedRate }: { homeLoanRate?: string, selfEmployedRate?: string }) {'
);

content = content.replace(
  'const recommendedBank = empType === "salaried" ? `Top Nationalised Banks @ ${homeLoanRate || "6.50"}%` : `Leading Private Banks @ ${businessLoanRate || "12.50"}%`;',
  'const recommendedBank = empType === "salaried" ? `Top Nationalised Banks @ ${homeLoanRate || "6.50"}%` : `Leading Private Banks @ ${selfEmployedRate || "7.25"}%`;'
);

content = content.replace(
  'const interestRate = empType === "salaried" ? (parseFloat(homeLoanRate || "6.50") / 100) / 12 : (parseFloat(businessLoanRate || "12.50") / 100) / 12;',
  'const interestRate = empType === "salaried" ? (parseFloat(homeLoanRate || "6.50") / 100) / 12 : (parseFloat(selfEmployedRate || "7.25") / 100) / 12;'
);

fs.writeFileSync('src/components/QuickEligibility.tsx', content);
console.log('Updated QuickEligibility with selfEmployedRate');
