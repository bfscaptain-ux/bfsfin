import re

with open("src/app/admin/callbacks/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'if (!dateString) return "N/A";',
    'if (!dateString) return { date: "N/A", time: "N/A" };'
)

with open("src/app/admin/callbacks/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
