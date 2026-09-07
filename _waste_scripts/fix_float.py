import re

with open("src/components/FloatingSupport.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make it accept props
content = content.replace(
    'export default function FloatingSupport() {',
    'export default function FloatingSupport({ contactPhone, whatsappPhone }: { contactPhone?: string, whatsappPhone?: string }) {'
)

# Replace the ICONS array with the one that uses props.
# Since it's outside the component, I will move it inside.
icons_block = """const ICONS = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-emerald-600 border border-green-400/30 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]', action: 'href', href: 'https://wa.me/917900979001' },
  { id: 'call', label: 'Call Us', icon: PhoneCall, color: 'text-white', bg: 'bg-gradient-to-br from-emerald-500 to-cyan-600 border border-emerald-400/30 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]', action: 'href', href: 'tel:7900979001' },
  { id: 'chat', label: 'Live Chat', icon: MessageSquare, color: 'text-white', bg: 'bg-gradient-to-br from-indigo-500 to-emerald-600 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]', action: 'chat' },
  { id: 'emi', label: 'EMI Calc', icon: Calculator, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]', action: 'href', href: '/calculator' },
  { id: 'apply', label: 'Apply Now', icon: Rocket, color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-pink-600 border border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]', action: 'href', href: '/apply' },
  { id: 'elig', label: 'Eligibility', icon: CheckCircle2, color: 'text-white', bg: 'bg-gradient-to-br from-teal-500 to-emerald-600 border border-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]', action: 'href', href: '/eligibility' },
  { id: 'track', label: 'Track Status', icon: FileSearch, color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]', action: 'href', href: '/track' },
  { id: 'map', label: 'Locate Office', icon: MapPin, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-rose-600 border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]', action: 'href', href: 'https://maps.google.com' },
];\n"""

dynamic_icons = """  const ICONS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-emerald-600 border border-green-400/30 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]', action: 'href', href: `https://wa.me/${whatsappPhone?.replace(/[^0-9]/g, "") || "917900979001"}` },
    { id: 'call', label: 'Call Us', icon: PhoneCall, color: 'text-white', bg: 'bg-gradient-to-br from-emerald-500 to-cyan-600 border border-emerald-400/30 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]', action: 'href', href: `tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}` },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare, color: 'text-white', bg: 'bg-gradient-to-br from-indigo-500 to-emerald-600 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]', action: 'chat' },
    { id: 'emi', label: 'EMI Calc', icon: Calculator, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]', action: 'href', href: '/calculator' },
    { id: 'apply', label: 'Apply Now', icon: Rocket, color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-pink-600 border border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]', action: 'href', href: '/apply' },
    { id: 'elig', label: 'Eligibility', icon: CheckCircle2, color: 'text-white', bg: 'bg-gradient-to-br from-teal-500 to-emerald-600 border border-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]', action: 'href', href: '/eligibility' },
    { id: 'track', label: 'Track Status', icon: FileSearch, color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]', action: 'href', href: '/track' },
    { id: 'map', label: 'Locate Office', icon: MapPin, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-rose-600 border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]', action: 'href', href: 'https://maps.google.com' },
  ];\n"""

content = content.replace(icons_block, '')
content = content.replace('const router = useRouter();', 'const router = useRouter();\n' + dynamic_icons)

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

# Insert buttons before the expanded chat box
content = content.replace(
    '        {/* Expanded Chat Box (Floats Bottom Right) */}',
    buttons + '\n        {/* Expanded Chat Box (Floats Bottom Right) */}'
)

with open("src/components/FloatingSupport.tsx", "w", encoding="utf-8") as f:
    f.write(content)
