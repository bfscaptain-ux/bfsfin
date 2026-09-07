const fs = require('fs');

let content = fs.readFileSync('src/components/FloatingSupport.tsx', 'utf8');

content = content.replace(
  '<div className="fixed bottom-6 right-8 z-[100] flex flex-col gap-4">',
  '<div className="fixed bottom-24 md:bottom-6 right-4 md:right-8 z-[100] flex flex-col gap-4">'
);

fs.writeFileSync('src/components/FloatingSupport.tsx', content);
console.log('Fixed floating buttons position');
