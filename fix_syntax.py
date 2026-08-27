with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fix the string literal issue on line 676
content = content.replace(
    'a: "Yes! Our Balance Transfer facility allows you to shift your existing loan to a new bank at a much lower interest rate (starting at ${balanceTransferRate || "6.45"}%), saving you lakhs in interest over the tenure."',
    'a: `Yes! Our Balance Transfer facility allows you to shift your existing loan to a new bank at a much lower interest rate (starting at ${balanceTransferRate || "6.45"}%), saving you lakhs in interest over the tenure.`'
)

# Also fix the destructured props
content = content.replace(
    'export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate }',
    'export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate, balanceTransferRate }'
)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
