const fs = require('fs');
let content = fs.readFileSync('src/app/admin/hero-images/page.tsx', 'utf8');

// Add reviews to state init
content = content.replace(
  'home: "", about: "", products: "", contact: ""',
  'home: "", about: "", products: "", contact: "", reviews: ""'
);

// Add reviews to dropdown
content = content.replace(
  '<option value="contact">Contact Us Page</option>',
  '<option value="contact">Contact Us Page</option>\n                  <option value="reviews">Client Reviews Page</option>'
);

fs.writeFileSync('src/app/admin/hero-images/page.tsx', content);
console.log('Added Reviews to CMS');
