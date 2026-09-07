import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'href="tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}"',
    'href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}`}'
)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
