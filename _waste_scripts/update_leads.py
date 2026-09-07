import re

with open("src/app/admin/leads/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Filter out Callback Requests
content = content.replace(
    'if (data.success && data.leads.length > 0) {\n        setLeads(data.leads);\n      }',
    'if (data.success && data.leads) {\n        const fullLeads = data.leads.filter((l: any) => l.loanType !== "Callback Request");\n        if(fullLeads.length > 0) setLeads(fullLeads);\n        else setLeads([]);\n      }'
)

# 2. Add createdAt to LeadItem interface
content = content.replace(
    '  status: string;\n}',
    '  status: string;\n  createdAt?: string;\n}'
)

# 3. Add Date/Time column to table header
content = content.replace(
    '<th className="p-4">Client Contact</th>\n                <th className="p-4">Loan Needed</th>',
    '<th className="p-4">Client Contact</th>\n                <th className="p-4">Date & Time</th>\n                <th className="p-4">Loan Needed</th>'
)

# 4. Add Date/Time column data
# I need to insert a <td> for the date right after the first <td>
# This might be tricky with simple string replace. Let's use regex or a targeted replace.
td_contact = """                    <tr key={item.id} className="hover:bg-emerald-800/30 transition group">
                    <td className="p-4">
                      <div className="font-bold text-white text-[15px]">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.phone} | {item.email}</div>
                    </td>"""

td_date_added = """                    <tr key={item.id} className="hover:bg-emerald-800/30 transition group">
                    <td className="p-4">
                      <div className="font-bold text-white text-[15px]">{item.name}</div>
                      <div className="text-xs text-slate-400 mt-1">{item.phone} | {item.email}</div>
                    </td>
                    <td className="p-4">
                      {item.createdAt ? (
                        <>
                          <div className="font-bold text-slate-200 text-xs">{new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                          <div className="text-[10px] text-emerald-400 font-bold mt-0.5">{new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
                        </>
                      ) : (
                        <span className="text-slate-500 text-xs">N/A</span>
                      )}
                    </td>"""

content = content.replace(td_contact, td_date_added)

with open("src/app/admin/leads/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
