with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('"ownerName", "ownerRole", "ownerQuote", "ownerImage", "homeLoanRate"', '"ownerName", "ownerRole", "ownerQuote", "ownerImage", "homeLoanRate", "balanceTransferRate"')
content = content.replace('const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";', 'const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";\n  const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";')

content = content.replace('liveBankRates={liveBankRates} homeLoanRate={homeLoanRate} />', 'liveBankRates={liveBankRates} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} />')

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
