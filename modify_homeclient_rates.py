with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Update signature
content = content.replace(
    "export default function HomeClient({ heroConfig, ownerConfig }: { heroConfig?: any, ownerConfig?: any }) {",
    "export default function HomeClient({ heroConfig, ownerConfig, liveBankRates, homeLoanRate }: { heroConfig?: any, ownerConfig?: any, liveBankRates?: any[], homeLoanRate?: string }) {"
)

# Update LiveTicker call
content = content.replace("<LiveTicker />", "<LiveTicker rates={liveBankRates} />")

# Replace 6.50% in EMI calculator
# There is a block:
#                          </span>
#                        6.50%
#                        </p>
# It might have whitespace. Let's just use regex or replace.
import re
content = re.sub(r'</span>\s*6\.50%\s*</p>', r'</span>\n                        {homeLoanRate || "6.50"}%\n                        </p>', content)

# There is also "Starting at 6.50%" in the features array.
content = content.replace('"Starting at 6.50%"', '`Starting at ${homeLoanRate || "6.50"}%`')

# Replace `6.50%` in the calculation itself.
# We need to find the EMI calculation part. Let's look for how `interestRate` is set or hardcoded in the EMI calculation.
# Wait, I don't know the exact code for EMI calculation. I will write a small script to find it first.
with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
