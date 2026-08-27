const fs = require('fs');
let content = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf8');

content = content.replace('lapRate: "",', 'lapRate: "",\n    goldLoanRate: "",');
content = content.replace('lapRate: settingsMap["lapRate"] || "7.50",', 'lapRate: settingsMap["lapRate"] || "7.50",\n        goldLoanRate: settingsMap["goldLoanRate"] || "8.50",');

// Wait, the grid in the screenshot is `grid-cols-1 sm:grid-cols-5`. Let's make it grid-cols-1 sm:grid-cols-6 or 3.
content = content.replace('grid-cols-1 sm:grid-cols-5 gap-4', 'grid-cols-1 sm:grid-cols-6 gap-4');

const btRateUI = `<div className="col-span-1 sm:col-span-1">
              <label className="block text-slate-300 font-semibold mb-1">
                BT Rate *
              </label>
              <input
                type="text"
                required
                value={settings.balanceTransferRate}
                onChange={(e) => setSettings({ ...settings, balanceTransferRate: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
                placeholder="6.45"
              />
            </div>`;

const goldRateUI = `<div>
              <label className="block text-slate-300 font-semibold mb-1">
                Gold Loan Rate *
              </label>
              <input
                type="text"
                required
                value={settings.goldLoanRate}
                onChange={(e) => setSettings({ ...settings, goldLoanRate: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
                placeholder="8.50"
              />
            </div>`;

content = content.replace(btRateUI, btRateUI + '\n            ' + goldRateUI);

fs.writeFileSync('src/app/admin/settings/page.tsx', content);
console.log('Added Gold Loan setting');
