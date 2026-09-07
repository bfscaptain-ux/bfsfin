with open("src/app/admin/settings/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add to fetch
content = content.replace('personalLoanRate: data.settings.personalLoanRate || "10.50",', 'personalLoanRate: data.settings.personalLoanRate || "10.50",\n            balanceTransferRate: data.settings.balanceTransferRate || "6.45",')

# Add to initial state
content = content.replace('personalLoanRate: "10.50",', 'personalLoanRate: "10.50",\n    balanceTransferRate: "6.45",')

# Add to ratesToSave
content = content.replace('["homeLoanRate", "businessLoanRate", "lapRate", "personalLoanRate"]', '["homeLoanRate", "businessLoanRate", "lapRate", "personalLoanRate", "balanceTransferRate"]')

# Add to JSX. The grid is grid-cols-4. I will make it grid-cols-5.
jsx_to_add = """            <div>
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
            </div>"""

content = content.replace('sm:grid-cols-4 gap-4">', 'sm:grid-cols-5 gap-4">')

parts = content.split('personalLoanRate: e.target.value })}\n                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"\n                placeholder="10.50"\n              />\n            </div>')
if len(parts) == 2:
    content = parts[0] + 'personalLoanRate: e.target.value })}\n                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"\n                placeholder="10.50"\n              />\n            </div>\n' + jsx_to_add + parts[1]

with open("src/app/admin/settings/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
