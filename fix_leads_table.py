import re

with open("src/app/admin/leads/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add Date/Time column header
content = re.sub(
    r'<th className="p-4">Client Contact</th>\s*<th className="p-4">Loan Needed</th>',
    '<th className="p-4">Client Contact</th>\n                <th className="p-4">Date & Time</th>\n                <th className="p-4">Loan Needed</th>',
    content
)

# Add Date/Time column data
content = re.sub(
    r'(<td className="p-4">\s*<div className="font-bold text-white text-\[15px\]">\{item\.name\}</div>\s*<div className="text-xs text-slate-400 mt-1">\{item\.phone\} \| \{item\.email\}</div>\s*</td>)',
    r'\1\n                    <td className="p-4">\n                      {item.createdAt ? (\n                        <>\n                          <div className="font-bold text-slate-200 text-[13px]">{new Date(item.createdAt).toLocaleDateString(\'en-IN\', { day: \'numeric\', month: \'short\', year: \'numeric\' })}</div>\n                          <div className="text-[11px] text-emerald-400 font-bold mt-0.5">{new Date(item.createdAt).toLocaleTimeString(\'en-IN\', { hour: \'2-digit\', minute: \'2-digit\', hour12: true })}</div>\n                        </>\n                      ) : (\n                        <span className="text-slate-500 text-[11px]">N/A</span>\n                      )}\n                    </td>',
    content
)

with open("src/app/admin/leads/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
