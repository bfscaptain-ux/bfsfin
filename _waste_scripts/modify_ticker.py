with open("src/components/LiveTicker.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "export default function LiveTicker() {",
    "export default function LiveTicker({ rates: propRates }: { rates?: any[] }) {"
)

# Replace the rates array logic
# Currently:
#  const rates = [
#    { bank: "PNB Home Loan", rate: "6.50%", change: "down", time: "Updated 15 mins ago", tag: "Lowest Rate" },
#    ...
#  ];
# We will use propRates if it's not empty, mapping from BankRate format

new_rates_logic = """
  const defaultRates = [
    { bank: "PNB Home Loan", rate: "6.50%", change: "down", time: "Updated 15 mins ago", tag: "Lowest Rate" },
    { bank: "Central Bank of India", rate: "6.70%", change: "stable", time: "Updated 45 mins ago", tag: "Zero Processing Fee" },
    { bank: "IDBI Bank", rate: "6.60%", change: "up", time: "Updated 1 hour ago", tag: "Self-Employed Special" },
    { bank: "HDFC Bank", rate: "6.75%", change: "down", time: "Updated 30 mins ago", tag: "Pre-approved Sanction" },
    { bank: "ICICI Bank", rate: "6.80%", change: "stable", time: "Updated 2 hours ago", tag: "Instant Digital Docket" },
    { bank: "SBI Home Loan", rate: "6.85%", change: "down", time: "Updated 10 mins ago", tag: "Govt Partner" },
  ];

  const rates = propRates && propRates.length > 0 
    ? propRates.map(r => ({
        bank: r.bankName,
        rate: `${r.interestRate.toFixed(2)}%`,
        change: "stable",
        time: "Updated recently",
        tag: r.badge || "Featured"
      }))
    : defaultRates;
"""

import re
# We need to carefully replace the `const rates = [` array up to `];`
# A simple regex match from `const rates = \[` to `  \];`

content = re.sub(r'const rates = \[\s*\{ bank: "PNB.*?\n\s*\];', new_rates_logic.strip(), content, flags=re.DOTALL)

with open("src/components/LiveTicker.tsx", "w", encoding="utf-8") as f:
    f.write(content)
