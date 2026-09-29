const fs = require('fs');
let content = fs.readFileSync('src/app/HomeClient.tsx', 'utf8');

// Fix the bad replacements from earlier
content = content.replace(/margin: 150px/g, 'margin: "150px"');

// Fix any remaining -30px or -40px
content = content.replace(/margin: "-30px"/g, 'margin: "150px"');
content = content.replace(/margin: "-40px"/g, 'margin: "150px"');

fs.writeFileSync('src/app/HomeClient.tsx', content);
console.log('Fixed viewport margins');
