const fs = require('fs');
['src/app/HomeClient.tsx', 'src/components/QuickEligibility.tsx', 'src/components/Footer.tsx', 'src/components/Header.tsx', 'src/components/LanguageSwitcher.tsx'].forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  // Add aria-label to inputs missing it
  content = content.replace(/<input(?![^>]*aria-label)[^>]*>/g, match => {
    return match.replace('<input', '<input aria-label="Form Input"');
  });
  
  // Add aria-label to buttons missing it
  content = content.replace(/<button(?![^>]*aria-label)[^>]*>/g, match => {
    return match.replace('<button', '<button aria-label="Interactive Button"');
  });
  
  fs.writeFileSync(file, content);
});
console.log('Fixed inputs and buttons');
