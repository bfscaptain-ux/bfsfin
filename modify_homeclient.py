import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Update signature
content = content.replace("export default function HomeClient({ heroConfig }: { heroConfig?: any }) {",
                          "export default function HomeClient({ heroConfig, ownerConfig }: { heroConfig?: any, ownerConfig?: any }) {")

# Fallback config
owner_fallback = """
  const owner = ownerConfig || {
    name: "Vineeta Sharma",
    role: "Founder & Managing Director, BFS",
    quote: "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage.",
    image: "/owner.png"
  };
"""
content = content.replace("const [loanAmount, setLoanAmount] = useState(2500000);", owner_fallback + "\n  const [loanAmount, setLoanAmount] = useState(2500000);")

# Replace section
old_section = """      {/* 3. FOUNDER & AUTHORITY MESSAGE */}
      <section className="py-20 bg-slate-50 dark:bg-emerald-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-emerald-900 border border-slate-200 dark:border-emerald-800 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-10 items-center">
            <div className="w-40 h-40 md:w-56 md:h-56 shrink-0 rounded-full overflow-hidden border-4 border-slate-100 dark:border-emerald-800 shadow-inner">
              <img 
                src="/praveen_bhardwaj.png" 
                alt="Adv. Praveen Bhardwaj" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-4 text-center md:text-left">
              <Quote className="w-10 h-10 text-slate-200 dark:text-slate-800 mx-auto md:mx-0" />
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-snug">
                "We don't just secure loans; we legally vet your lifetime investment. Total transparency, zero hidden brokerage."
              </h3>
              <div>
                <p className="text-lg font-bold text-emerald-700 dark:text-emerald-500">Adv. Praveen Bhardwaj</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Founder & Managing Director, BFS</p>
              </div>
              <Link href="/about/founder" className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600 transition-colors">
                Read Full Profile <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>"""

new_section = """      {/* 3. FOUNDER & AUTHORITY MESSAGE */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-emerald-950 dark:to-emerald-900 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200 dark:via-emerald-700 to-transparent"></div>
        <div className="absolute -left-40 top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -right-40 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="group bg-white/80 dark:bg-emerald-900/80 backdrop-blur-md border border-slate-200/50 dark:border-emerald-800/50 rounded-[2rem] p-8 md:p-14 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 flex flex-col md:flex-row gap-12 items-center">
            
            {/* Interactive Image Container */}
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-teal-300 rounded-full blur opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"></div>
              <div className="relative w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-white dark:border-emerald-800 shadow-xl transform group-hover:-translate-y-2 transition-transform duration-500">
                <img 
                  src={owner.image} 
                  alt={owner.name} 
                  className="w-full h-full object-cover object-top scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-emerald-950 px-4 py-2 rounded-full border border-slate-100 dark:border-emerald-800 shadow-lg flex items-center gap-2 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 delay-100">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-black text-slate-800 dark:text-emerald-100 uppercase tracking-wider">Verified</span>
              </div>
            </div>

            {/* Content Container */}
            <div className="space-y-6 text-center md:text-left flex-1">
              <Quote className="w-12 h-12 text-emerald-100 dark:text-emerald-800/50 mx-auto md:mx-0 transform group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500" />
              
              <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                "{owner.quote}"
              </h3>
              
              <div className="pt-4 border-t border-slate-100 dark:border-emerald-800/50">
                <h4 className="text-xl font-black text-emerald-700 dark:text-emerald-400 mb-1">{owner.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">{owner.role}</p>
              </div>

              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 group/btn">
                Meet {owner.name.split(' ')[0]} 
                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>"""

content = content.replace(old_section, new_section)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
