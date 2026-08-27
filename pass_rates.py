with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('liveBankRates?: any[], homeLoanRate?: string', 'liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string')

# Replace QuickEligibility call
content = content.replace('<QuickEligibility />', '<QuickEligibility homeLoanRate={homeLoanRate} balanceTransferRate={balanceTransferRate} />')

# Replace FAQ 6.45%
content = content.replace('starting at 6.45%', 'starting at ${balanceTransferRate || "6.45"}%')

# Wait, the FAQ array has strings. We should change the array to use template literals for these strings.
import re
content = re.sub(r'a:\s*"Ideally, a CIBIL score of 750 or above is preferred by most partner banks for the lowest interest rates \(starting at 6\.50%\)\. However, we can also process loans for scores between 650-749 with slight variations in the rate\."',
                 r'a: `Ideally, a CIBIL score of 750 or above is preferred by most partner banks for the lowest interest rates (starting at ${homeLoanRate || "6.50"}%). However, we can also process loans for scores between 650-749 with slight variations in the rate.`', content)

content = re.sub(r'a:\s*"Yes! Our Balance Transfer facility allows you to shift your existing loan to a new bank at a much lower interest rate \(starting at 6\.45%\), saving you lakhs in interest over the tenure\."',
                 r'a: `Yes! Our Balance Transfer facility allows you to shift your existing loan to a new bank at a much lower interest rate (starting at ${balanceTransferRate || "6.45"}%), saving you lakhs in interest over the tenure.`', content)

# Loan Offerings "BT Rate 6.45%"
content = content.replace('"BT Rate 6.45%"', '`BT Rate ${balanceTransferRate || "6.45"}%`')

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
