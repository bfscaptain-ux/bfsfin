const fs = require('fs');
let content = fs.readFileSync('src/components/admin/AdminSidebar.tsx', 'utf8');

content = content.replace(
  "{ name: 'Bank Partners & Rates', href: '/admin/bank-logos', icon: Building2 },",
  "{ name: 'Bank Partner Logos', href: '/admin/bank-logos', icon: Building2 },"
);

fs.writeFileSync('src/components/admin/AdminSidebar.tsx', content);
console.log('Restored sidebar link');
