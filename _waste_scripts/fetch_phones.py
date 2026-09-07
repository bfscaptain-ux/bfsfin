import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '"ownerName", "ownerRole", "ownerQuote", "ownerImage", "homeLoanRate", "balanceTransferRate"',
    '"ownerName", "ownerRole", "ownerQuote", "ownerImage", "homeLoanRate", "balanceTransferRate", "contactPhone", "whatsappPhone"'
)

content = content.replace(
    'const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";',
    'const balanceTransferRate = settingsRecords.find(s => s.key === "balanceTransferRate")?.value || "6.45";\n  const contactPhone = settingsRecords.find(s => s.key === "contactPhone")?.value || "+91 7900-979-001";\n  const whatsappPhone = settingsRecords.find(s => s.key === "whatsappPhone")?.value || "917900979001";'
)

content = content.replace(
    'liveBankRates={liveBankRates} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} />',
    'liveBankRates={liveBankRates} homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} contactPhone={contactPhone} whatsappPhone={whatsappPhone} />'
)

# And update JSON-LD telephone
content = content.replace(
    '"telephone": "+91-7900979001",',
    '"telephone": contactPhone,'
)

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
