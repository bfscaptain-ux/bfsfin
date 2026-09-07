const fs = require('fs');

let content = fs.readFileSync('src/app/admin/settings/page.tsx', 'utf8');

const oldSectionStart = '<h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Product Starting Interest Rates (%)</h3>';

const parts = content.split(oldSectionStart);
if (parts.length === 2) {
  const subparts = parts[1].split('<h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Banner &amp; Ticker Announcement Controls</h3>');
  
  if (subparts.length === 2) {
    const newSection = `${oldSectionStart}

          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Salaried (Home) *</label>
              <input type="text" value={settings.homeLoanRate} onChange={(e) => setSettings({ ...settings, homeLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Self-Employed (Home) *</label>
              <input type="text" value={settings.selfEmployedRate} onChange={(e) => setSettings({ ...settings, selfEmployedRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Business Loan *</label>
              <input type="text" value={settings.businessLoanRate} onChange={(e) => setSettings({ ...settings, businessLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">LAP Rate *</label>
              <input type="text" value={settings.lapRate} onChange={(e) => setSettings({ ...settings, lapRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Personal Loan *</label>
              <input type="text" value={settings.personalLoanRate} onChange={(e) => setSettings({ ...settings, personalLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">BT Rate *</label>
              <input type="text" value={settings.balanceTransferRate} onChange={(e) => setSettings({ ...settings, balanceTransferRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs uppercase">Gold Loan *</label>
              <input type="text" value={settings.goldLoanRate} onChange={(e) => setSettings({ ...settings, goldLoanRate: e.target.value })} className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none font-bold" />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Banner &amp; Ticker Announcement Controls</h3>`;

    content = parts[0] + newSection + subparts[1];
    fs.writeFileSync('src/app/admin/settings/page.tsx', content);
    console.log('Rebuilt Rates UI');
  } else {
    console.log('Failed to find subparts');
  }
} else {
  console.log('Failed to find oldSectionStart');
}
