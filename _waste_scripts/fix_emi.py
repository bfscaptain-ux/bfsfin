with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "(loanAmount * 0.065 / 12)",
    "(loanAmount * (parseFloat(homeLoanRate || \"6.50\") / 100) / 12)"
)
content = content.replace(
    "1 + 0.065 / 12",
    "1 + (parseFloat(homeLoanRate || \"6.50\") / 100) / 12"
)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
