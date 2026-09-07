const fs = require('fs');

let content = fs.readFileSync('src/components/FloatingSupport.tsx', 'utf8');

content = content.replace(
  '<div className="fixed bottom-6 right-6 z-[60] w-[90%] sm:w-96',
  '<div className="fixed bottom-24 md:bottom-6 right-4 md:right-8 z-[60] w-[90%] sm:w-96'
);

fs.writeFileSync('src/components/FloatingSupport.tsx', content);
console.log('Fixed chat box position');
