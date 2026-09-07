import re

with open("src/app/about/founder/FounderClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Update signature
content = content.replace("export default function FounderClient() {",
                          "export default function FounderClient({ ownerConfig }: { ownerConfig?: any }) {")

# Add fallback owner logic
fallback_owner = """
  const owner = ownerConfig || {
    name: "Vineeta Sharma",
    role: "Founder & Managing Director, BFS",
    quote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: "/owner.png"
  };
"""
content = content.replace("  const fadeInUp =", fallback_owner + "\n  const fadeInUp =")

# Replace Praveen Bhardwaj's name & role & image
content = content.replace('src="/praveen_bhardwaj.png"', 'src={owner.image}')
content = content.replace('alt="Mr. Praveen Bhardwaj"', 'alt={owner.name}')
content = content.replace('Mr. Praveen Bhardwaj\n                  </h3>', '{owner.name}\n                  </h3>')

# Also replace the paragraph
paragraph_old = "Before founding Bhardwaj Financial Services, Mr. Praveen Bhardwaj spent over a decade working closely within India's top banking institutions. He witnessed firsthand the anxiety, delays, and lack of transparency ordinary families faced when applying for home loans."
paragraph_new = "Before founding Bhardwaj Financial Services, {owner.name} spent over a decade working closely within India's top banking institutions. They witnessed firsthand the anxiety, delays, and lack of transparency ordinary families faced when applying for home loans."
content = content.replace(paragraph_old, paragraph_new)

# Quote replacement - wait, the quote might not be exactly matching but I'll leave it as is if it's styled differently, 
# or I can replace the quote block with `owner.quote`.
# Actually the quote block has: "We don't just process loan files..."
# The user might want the quote from the admin or the static one. Let's just use `owner.quote`.

quote_old_block = """<p className="text-xl italic font-black text-slate-800 dark:text-emerald-100 leading-snug">
                      "We don't just process loan files; we are helping families unlock the doors to their dream homes. Speed and integrity are the cornerstones of everything we do at BFS."
                    </p>"""
quote_new_block = """<p className="text-xl italic font-black text-slate-800 dark:text-emerald-100 leading-snug">
                      "{owner.quote}"
                    </p>"""
content = content.replace(quote_old_block, quote_new_block)

# Remove any lingering "Mr. Praveen Bhardwaj"
content = content.replace("Mr. Praveen Bhardwaj", "{owner.name}")

with open("src/app/about/founder/FounderClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
