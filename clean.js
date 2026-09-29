const fs = require('fs');
['src/app/HomeClient.tsx', 'src/components/QuickEligibility.tsx', 'src/components/Footer.tsx', 'src/components/Header.tsx', 'src/components/LanguageSwitcher.tsx'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/ aria-label="Interactive Button"/g, '');
  content = content.replace(/ aria-label="Form Input"/g, ' aria-label="Input field"');
  fs.writeFileSync(file, content);
});
console.log('Cleaned up aria-labels');
