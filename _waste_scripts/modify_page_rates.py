import re

with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add homeLoanRate to systemSettings fetch
content = content.replace('"ownerName", "ownerRole", "ownerQuote", "ownerImage"',
                          '"ownerName", "ownerRole", "ownerQuote", "ownerImage", "homeLoanRate"')

# Fetch BankRates
bank_rates_fetch = """
  // Fetch live bank rates for the ticker
  const liveBankRates = await prisma.bankRate.findMany({
    orderBy: { interestRate: 'asc' },
    take: 10
  });

  const homeLoanRate = settingsRecords.find(s => s.key === "homeLoanRate")?.value || "6.50";
"""
content = content.replace("const heroConfig =", bank_rates_fetch + "\n  const heroConfig =")

# Update HomeClient props
content = content.replace("<HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} />", 
                          "<HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} liveBankRates={liveBankRates} homeLoanRate={homeLoanRate} />")

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
