const fs = require('fs');

let emiContent = fs.readFileSync('src/components/EMICalculator.tsx', 'utf8');
emiContent = emiContent.replace(
  'export default function EMICalculator() {',
  'export default function EMICalculator({ defaultRate = 6.5 }: { defaultRate?: number }) {'
);
emiContent = emiContent.replace(
  'const [rate, setRate] = useState(6.5); // 6.5% default',
  'const [rate, setRate] = useState(defaultRate);'
);
fs.writeFileSync('src/components/EMICalculator.tsx', emiContent);

let pageContent = fs.readFileSync('src/app/calculator/page.tsx', 'utf8');

pageContent = pageContent.replace(
  'export default function CalculatorPage() {',
  `import { PrismaClient } from "@prisma/client";\n\nexport default async function CalculatorPage() {\n  const prisma = new PrismaClient();\n  const settings = await prisma.systemSetting.findMany();\n  const rateSetting = settings.find(s => s.key === "homeLoanRate")?.value || "6.50";\n  const defaultRate = parseFloat(rateSetting);`
);

pageContent = pageContent.replace(
  '<EMICalculator />',
  '<EMICalculator defaultRate={defaultRate} />'
);

fs.writeFileSync('src/app/calculator/page.tsx', pageContent);
console.log('Made EMI Calculator dynamic to CMS rates');
