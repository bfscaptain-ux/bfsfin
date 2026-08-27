const fs = require('fs');
let content = fs.readFileSync('src/app/calculator/page.tsx', 'utf8');

const newMetadata = `export const metadata: Metadata = {
  title: "Advanced Home Loan EMI Calculator (100% Accurate) | Bhardwaj Finance",
  description: "Calculate exact Home Loan, Business Loan, and LAP EMIs. View detailed month-by-month amortization schedules, interest breakdowns, and loan eligibility instantly. Best EMI Calculator in Agra.",
  keywords: ["Advanced EMI Calculator", "Home Loan EMI Calculator India", "Business Loan Calculator", "Loan Against Property EMI", "Amortization Schedule Calculator", "Exact EMI calculation", "Agra best loan calculator", "Mortgage repayment calculator", "Bhardwaj Finance EMI", "Calculate home loan interest"],
  alternates: {
    canonical: "https://bfsagra.com/calculator",`;

content = content.replace(/export const metadata: Metadata = \{[\s\S]*?canonical: "https:\/\/bfsagra\.com\/calculator",/, newMetadata);

fs.writeFileSync('src/app/calculator/page.tsx', content);
console.log('Updated Calculator SEO');
