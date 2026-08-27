import re

# 1. src/app/HomeClient.tsx
with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '12/34, Financial District, Sanjay Place,<br/>Agra, Uttar Pradesh 282002',
    'Block-C11, Shop No.-5, First Floor,<br/>near MK Tailor, Sanjay Palace, Sanjay Place,<br/>Agra, Uttar Pradesh 282002'
)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)

# 2. src/app/page.tsx
with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '"streetAddress": "Sanjay Place Commercial Hub"',
    '"streetAddress": "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Palace, Sanjay Place"'
)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

# 3. src/components/Footer.tsx
with open("src/components/Footer.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'Commercial Hub, Sanjay Place,<br />\n                    Agra, Uttar Pradesh - 282002',
    'Block-C11, Shop No.-5, First Floor, near MK Tailor,<br />\n                    Sanjay Palace, Sanjay Place,<br />\n                    Agra, Uttar Pradesh - 282002'
)

with open("src/components/Footer.tsx", "w", encoding="utf-8") as f:
    f.write(content)
