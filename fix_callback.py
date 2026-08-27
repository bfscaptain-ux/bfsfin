import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("await fetch('/api/appointments', {", "await fetch('/api/leads', {")

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
