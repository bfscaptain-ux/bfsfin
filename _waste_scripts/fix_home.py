import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate }:',
    'export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate, contactPhone, whatsappPhone }:'
)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
