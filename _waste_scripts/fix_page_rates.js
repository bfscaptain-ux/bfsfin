const fs = require('fs');

let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const oldPrismaFetch = `const liveBankRates = await prisma.bankRate.findMany({
    orderBy: { interestRate: 'asc' },
    take: 10
  });`;

const newPrismaFetch = `// Generate liveBankRates array from our unified banks.json
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

content = content.replace(oldPrismaFetch, newPrismaFetch);

content = content.replace(
  `const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";`,
  `const homeLoanRate = liveBankRates[0]?.interestRate.toFixed(2) || "6.50";`
);

content = content.replace(
  `const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";`,
  `const balanceTransferRate = ((liveBankRates[0]?.interestRate || 6.50) - 0.05).toFixed(2);`
);

fs.writeFileSync('src/app/page.tsx', content);
console.log('Fixed page.tsx to use unified banks data!');
