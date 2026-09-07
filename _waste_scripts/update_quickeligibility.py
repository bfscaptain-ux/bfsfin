with open("src/components/QuickEligibility.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('export default function QuickEligibility() {', 'export default function QuickEligibility({ homeLoanRate, balanceTransferRate }: { homeLoanRate?: string, balanceTransferRate?: string }) {')

content = content.replace('const recommendedBank = empType === "salaried" ? "Top Nationalised Banks @ 6.50%" : "Leading Private Banks @ 6.60%";', 
                          'const recommendedBank = empType === "salaried" ? `Top Nationalised Banks @ ${homeLoanRate || "6.50"}%` : `Leading Private Banks @ ${balanceTransferRate || "6.60"}%`;')

with open("src/components/QuickEligibility.tsx", "w", encoding="utf-8") as f:
    f.write(content)
