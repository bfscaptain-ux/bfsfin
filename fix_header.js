const fs = require('fs');
let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

content = content.replace(/\\n\s*\{\/\* Compare Banks Hidden \*\/\}\\n/g, '');
content = content.replace(/\\n\s*\{\/\* Mobile Compare Hidden \*\/\}\\n/g, '');

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Removed literal \\n from Header.tsx');
