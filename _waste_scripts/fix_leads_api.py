with open("src/app/api/leads/route.ts", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    "email: body.email,",
    "email: body.email || `no-email-${Date.now()}@callback.local`,"
)

with open("src/app/api/leads/route.ts", "w", encoding="utf-8") as f:
    f.write(content)
