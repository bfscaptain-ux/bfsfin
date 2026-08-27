import re

with open("src/app/admin/leads/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'const fullLeads = data.leads.filter((l: any) => l.loanType !== "Callback Request");',
    'const fullLeads = data.leads.filter((l: any) => l.loanType !== "Callback Request" && !l.source.startsWith("APPOINTMENT:"));'
)

with open("src/app/admin/leads/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
