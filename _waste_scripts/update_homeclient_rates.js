const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// Update function signature
content = content.replace(
  'export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate, contactPhone, whatsappPhone }: { heroConfig?: any, ownerConfig?: any, liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string, contactPhone?: string, whatsappPhone?: string }) {',
  'export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate, businessLoanRate, lapRate, personalLoanRate, contactPhone, whatsappPhone }: { heroConfig?: any, ownerConfig?: any, liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string, businessLoanRate?: string, lapRate?: string, personalLoanRate?: string, contactPhone?: string, whatsappPhone?: string }) {'
);

// Pass to QuickEligibility
content = content.replace(
  '<QuickEligibility homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} />',
  '<QuickEligibility homeLoanRate={homeLoanRate} businessLoanRate={businessLoanRate} />'
);

// Update product cards
content = content.replace(
  'features: ["₹20L to ₹5Cr+", `Starting at ${homeLoanRate || "6.50"}%`]',
  'features: ["₹20L to ₹5Cr+", `Starting at ${homeLoanRate || "6.50"}%`]' // Just ensuring
);
content = content.replace(
  'features: [`BT Rate ${balanceTransferRate || "6.45"}%`, "Instant Top-Up"]',
  'features: [`BT Rate ${balanceTransferRate || "6.45"}%`, "Instant Top-Up"]' // Just ensuring
);
content = content.replace(
  'features: ["Up to 70% LTV", "15-Year Tenure"]',
  'features: [`Starting at ${lapRate || "7.50"}%`, "Up to 70% LTV", "15-Year Tenure"]'
);
content = content.replace(
  'features: ["Up to ₹5Cr", "48-Hr Approvals"]',
  'features: [`Starting at ${businessLoanRate || "12.50"}%`, "Up to ₹5Cr", "48-Hr Approvals"]'
);
content = content.replace(
  'features: ["Minimal Docs", "Instant Approval"]',
  'features: [`Starting at ${personalLoanRate || "10.50"}%`, "Minimal Docs", "Instant Approval"]'
);

fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Updated HomeClient with new rates');
