const fs = require('fs');

let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// Remove LiveTicker component import
content = content.replace(/import LiveTicker from "@\/components\/LiveTicker";\n/g, '');

// Remove LiveTicker usage
content = content.replace(/\s*<LiveTicker rates=\{liveBankRates\} \/>\n/g, '\n');

// Change bankLogos logic back to API fetch
const regex = /\s*\/\/ Derive logos from liveBankRates[\s\S]*?\.map\(r => \(\{ id: r\.id, bankName: r\.bankName, logoUrl: r\.logo \}\)\);/m;

const replacement = `\n  const [bankLogos, setBankLogos] = useState<{id: string; bankName: string; logoUrl: string}[]>([]);
  useEffect(() => {
    fetch("/api/bank-logos").then(r => r.json()).then(data => {
      if (Array.isArray(data)) setBankLogos(data);
    }).catch(() => {});
  }, []);`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Fixed HomeClient.tsx');
