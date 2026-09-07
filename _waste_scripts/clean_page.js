const fs = require('fs');
let content = fs.readFileSync('src/app/page.tsx', 'utf8');

const regex = /\/\/ Generate liveBankRates array from our unified banks\.json[\s\S]*?\)\)\.sort\(\(a, b\) => a\.interestRate - b\.interestRate\);/m;
content = content.replace(regex, '');

content = content.replace(' liveBankRates={liveBankRates}', '');

content = content.replace(/const homeLoanRate = liveBankRates\[0\]\?\.interestRate\.toFixed\(2\) \|\| "6\.50";/, 'const homeLoanRate = "6.50";');
content = content.replace(/const balanceTransferRate = \(\(liveBankRates\[0\]\?\.interestRate \|\| 6\.50\) - 0\.05\)\.toFixed\(2\);/, 'const balanceTransferRate = "6.45";');

fs.writeFileSync('src/app/page.tsx', content);
console.log('Cleaned page.tsx');
