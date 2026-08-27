const fs = require('fs');
let content = fs.readFileSync('src/app/tools/balance-transfer/page.tsx', 'utf8');

content = content.replace(
  'export default function BalanceTransferPage() {',
  `import { PrismaClient } from "@prisma/client";\n\nexport default async function BalanceTransferPage() {\n  const prisma = new PrismaClient();\n  const settings = await prisma.systemSetting.findMany();\n  const rateSetting = settings.find(s => s.key === "balanceTransferRate")?.value || "6.45";\n  const defaultRate = parseFloat(rateSetting);`
);

content = content.replace(
  '<BalanceTransferCalculator />',
  '<BalanceTransferCalculator defaultRate={defaultRate} />'
);

fs.writeFileSync('src/app/tools/balance-transfer/page.tsx', content);
console.log('Passed dynamic BT rate to BT page');
