import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string }',
    'liveBankRates?: any[], homeLoanRate?: string, balanceTransferRate?: string, contactPhone?: string, whatsappPhone?: string }'
)

content = content.replace(
    '<FloatingSupport />',
    '<FloatingSupport contactPhone={contactPhone} whatsappPhone={whatsappPhone} />'
)

content = content.replace('1800-XXX-XXXX (Toll Free)', '{contactPhone || "+91 7900-979-001"}')

# Replace tel links
content = content.replace('tel:7900979001', 'tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}')
# Actually inside JSX, it might be `href="tel:7900979001"`. We need `{` `}` around it.
content = re.sub(
    r'href="tel:7900979001"',
    r'href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}`}',
    content
)

# For supportText default in hConfig
content = re.sub(
    r'supportText:\s*"Prefer talking to an expert\? Call: 7900-979-001"',
    r'supportText: `Prefer talking to an expert? Call: ${contactPhone || "+91 7900-979-001"}`',
    content
)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
