with open("src/app/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add to key list
content = content.replace('"googleRating", "googleReviewCount"', 
                          '"googleRating", "googleReviewCount",\n          "ownerName", "ownerRole", "ownerQuote", "ownerImage"')

# Create ownerConfig
owner_config = """  const ownerConfig = {
    name: settingsRecords.find(s => s.key === "ownerName")?.value || "Vineeta Sharma",
    role: settingsRecords.find(s => s.key === "ownerRole")?.value || "Founder & Managing Director, BFS",
    quote: settingsRecords.find(s => s.key === "ownerQuote")?.value || "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: settingsRecords.find(s => s.key === "ownerImage")?.value || "/owner.png"
  };"""
content = content.replace("  return (", owner_config + "\n\n  return (")

# Update HomeClient props
content = content.replace("<HomeClient heroConfig={heroConfig} />", "<HomeClient heroConfig={heroConfig} ownerConfig={ownerConfig} />")

# Also update JSON-LD founder name
content = content.replace('"name": "Praveen Bhardwaj",', '"name": "Vineeta Sharma",')

with open("src/app/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)
