import re

with open("src/components/FloatingSupport.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add props
content = content.replace(
    'export default function FloatingSupport() {',
    'export default function FloatingSupport({ contactPhone, whatsappPhone }: { contactPhone?: string, whatsappPhone?: string }) {'
)

# 2. Add fixed bottom right buttons
# The return statement currently looks like: return ( <div className="fixed right-0 top-1/4 ...">...</div> );
# I will wrap the entire return in a fragment and add the two bottom right buttons.

new_buttons = """
      {/* Bottom Right Direct WhatsApp & Call Buttons */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4">
        {/* Call Button */}
        <a 
          href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}`}
          className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all group"
          title="Call Us Directly"
        >
          <PhoneCall className="w-6 h-6 text-white group-hover:animate-[bounce_1s_infinite]" />
        </a>

        {/* WhatsApp Button */}
        <a 
          href={`https://wa.me/${whatsappPhone?.replace(/[^0-9]/g, "") || "917900979001"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all group"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
        </a>
      </div>
"""

content = re.sub(
    r'(return \(\n\s*)',
    r'\1<>\n' + new_buttons,
    content
)

content = re.sub(
    r'(\n\s*\]\)\}\n\s*</div>\n\s*</div>\n\s*</div>\n\s*</div>\n\s*\);)',
    r'\1\n    </>;',
    content
)
# The second regex to close fragment might fail because of varying indentation or div counts.
