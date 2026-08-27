const fs = require('fs');

let content = fs.readFileSync('src/app/admin/faqs/page.tsx', 'utf8');

const regex = /<label className="block text-slate-300 font-semibold mb-1 text-xs">Category<\/label>\s*<select value=\{category\} onChange=\{\(e\) => setCategory\(e.target.value\)\} className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs">[\s\S]*?<\/select>/;

const newSelect = `<label className="block text-slate-300 font-semibold mb-1 text-xs">Assign to Page (Category)</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-emerald-950 border border-emerald-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none text-xs">
                    <optgroup label="General Pages">
                      <option value="General">Home & About Us (General)</option>
                    </optgroup>
                    <optgroup label="Product Pages">
                      <option value="Home Loan">Home Loan</option>
                      <option value="Balance Transfer">Balance Transfer</option>
                      <option value="Loan Against Property">Loan Against Property</option>
                      <option value="Business Loan">Business Loan</option>
                    </optgroup>
                    <optgroup label="Bank Pages">
                      <option value="PNB">PNB</option>
                      <option value="SBI">SBI</option>
                      <option value="HDFC">HDFC</option>
                      <option value="ICICI">ICICI</option>
                      <option value="Bank of Baroda">Bank of Baroda</option>
                      <option value="Central Bank of India">Central Bank of India</option>
                    </optgroup>
                  </select>`;

content = content.replace(regex, newSelect);
fs.writeFileSync('src/app/admin/faqs/page.tsx', content);
console.log('Updated category select!');
