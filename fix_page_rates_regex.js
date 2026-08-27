const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /const liveBankRates = await prisma\.bankRate\.findMany\(\{\s*orderBy: \{ interestRate: 'asc' \},\s*take: 10\s*\}\);/g;

const replacement = `// Generate liveBankRates array from our unified banks.json
  const { banksData } = await import('@/data/banksData');
  const liveBankRates = Object.values(banksData).map(bank => ({
    id: bank.id,
    bankName: bank.name,
    category: 'Salaried',
    interestRate: parseFloat(bank.salariedRate) || 8.50,
    processingFee: bank.processingFee,
    speedDays: 5,
    badge: 'Special Rate',
    logo: bank.logo
  })).sort((a, b) => a.interestRate - b.interestRate);`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed page.tsx!');
