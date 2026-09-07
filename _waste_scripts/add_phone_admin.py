import re

with open("src/app/admin/settings/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add to fetch
content = content.replace(
    'balanceTransferRate: data.settings.balanceTransferRate || "6.45",',
    'balanceTransferRate: data.settings.balanceTransferRate || "6.45",\n            contactPhone: data.settings.contactPhone || "+91 7900-979-001",\n            whatsappPhone: data.settings.whatsappPhone || "917900979001",'
)

# Add to initial state
content = content.replace(
    'balanceTransferRate: "6.45",',
    'balanceTransferRate: "6.45",\n    contactPhone: "+91 7900-979-001",\n    whatsappPhone: "917900979001",'
)

# Add to ratesToSave
content = content.replace(
    '["homeLoanRate", "businessLoanRate", "lapRate", "personalLoanRate", "balanceTransferRate"]',
    '["homeLoanRate", "businessLoanRate", "lapRate", "personalLoanRate", "balanceTransferRate", "contactPhone", "whatsappPhone"]'
)

new_section = """
        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Contact & WhatsApp Numbers</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Primary Call Number *
              </label>
              <input
                type="text"
                required
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
                placeholder="+91 7900-979-001"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                WhatsApp Number (without +) *
              </label>
              <input
                type="text"
                required
                value={settings.whatsappPhone}
                onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                className="w-full bg-emerald-950 border border-emerald-800 rounded-xl px-3 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-bold"
                placeholder="917900979001"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-emerald-800">
          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Product Starting Interest Rates (%)</h3>"""

content = content.replace(
    '<div className="space-y-4 pt-4 border-t border-emerald-800">\n          <h3 className="text-base font-bold text-white border-b border-emerald-800 pb-2">Product Starting Interest Rates (%)</h3>',
    new_section
)

with open("src/app/admin/settings/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
