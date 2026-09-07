const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');
content = content.replace(
  'const [openAccordion, setOpenAccordion] = useState<string | null>(null);',
  'const [openAccordion, setOpenAccordion] = useState<string | null>(null);\n  const [activeProductTab, setActiveProductTab] = useState("finance");'
);
fs.writeFileSync('src/components/Header.tsx', content);
console.log('Injected state');
