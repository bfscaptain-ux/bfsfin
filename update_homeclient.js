const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

const regex = /const \[bankLogos, setBankLogos\] = useState<\{id: string; bankName: string; logoUrl: string\}\[\]>\(\[\]\);\s*useEffect\(\(\) => \{\s*fetch\("\/api\/bank-logos"\)\.then\(r => r\.json\(\)\)\.then\(data => \{\s*if \(Array\.isArray\(data\)\) setBankLogos\(data\);\s*\}\)\.catch\(\(\) => \{\}\);\s*\}, \[\]\);/m;

const replacement = `  // Derive logos from liveBankRates
  const bankLogos = (liveBankRates || [])
    .filter(r => r.logo && r.logo !== 'Building' && r.logo.includes('/uploads/'))
    .map(r => ({ id: r.id, bankName: r.bankName, logoUrl: r.logo }));`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Fixed HomeClient to use liveBankRates for logos');
