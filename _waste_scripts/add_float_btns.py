import re

with open("src/components/FloatingSupport.tsx", "r", encoding="utf-8") as f:
    content = f.read()

buttons = """
      {/* Bottom Right Direct Buttons */}
      <div className="fixed bottom-6 right-8 z-[100] flex flex-col gap-4">
        <a 
          href={`https://wa.me/${whatsappPhone?.replace(/[^0-9]/g, "") || "917900979001"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all group border border-green-400/30"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
        </a>

        <a 
          href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}`}
          className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all group border border-emerald-400/30 animate-[bounce_3s_infinite]"
          title="Call Us Directly"
        >
          <PhoneCall className="w-6 h-6 text-white" />
        </a>
      </div>
"""

content = re.sub(
    r'(return \(\n\s*<>\n)',
    r'\1' + buttons,
    content
)

with open("src/components/FloatingSupport.tsx", "w", encoding="utf-8") as f:
    f.write(content)
