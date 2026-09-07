const fs = require('fs');

let content = fs.readFileSync('src/app/admin/faqs/page.tsx', 'utf8');

const regex = /<optgroup label="Product Pages">[\s\S]*?<\/optgroup>/;

const newOptgroup = `<optgroup label="Product Pages">
                      <option value="Home Loan">Home Loan</option>
                      <option value="Balance Transfer">Balance Transfer</option>
                      <option value="Loan Against Property">Loan Against Property</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Car Loan">Car Loan</option>
                      <option value="Education Loan">Education Loan</option>
                      <option value="Gold Loan">Gold Loan</option>
                      <option value="Plot Loan">Plot Loan</option>
                      <option value="Construction Loan">Construction Loan</option>
                      <option value="Home Renovation">Home Renovation</option>
                      <option value="Top Up Loan">Top-Up Loan</option>
                      <option value="NRI Home Loan">NRI Home Loan</option>
                      <option value="Loan Against Securities">Loan Against Securities</option>
                      <option value="Working Capital">Working Capital</option>
                    </optgroup>`;

content = content.replace(regex, newOptgroup);
fs.writeFileSync('src/app/admin/faqs/page.tsx', content);
console.log('Added all products to FAQ category dropdown!');
