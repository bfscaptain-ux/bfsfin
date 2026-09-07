import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Make sure we have User and Landmark icons imported
if "User," not in content and "User " not in content:
    content = content.replace("import {", "import {\n  User,\n  Landmark,", 1)

# We will use regex to replace the FOUNDER & AUTHORITY MESSAGE section.
# The section starts with `{/* 3. FOUNDER & AUTHORITY MESSAGE */}`
# and ends right before `{/* 4. OFFICIAL TRUST BADGES */}`

new_section = """      {/* 3. FOUNDER & AUTHORITY MESSAGE */}
      <section className="py-24 bg-slate-50 dark:bg-emerald-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white dark:bg-emerald-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 dark:border-emerald-800 p-8 md:p-12">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left: Image & Badge */}
              <div className="lg:col-span-4 flex flex-col items-center relative pb-8 lg:pb-0">
                
                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full p-2 bg-gradient-to-b from-emerald-100 to-emerald-50 dark:from-emerald-800 dark:to-emerald-900">
                  <div className="w-full h-full rounded-full overflow-hidden border-[6px] border-white dark:border-emerald-950 relative shadow-inner bg-slate-100 dark:bg-emerald-800">
                    {/* Faint Taj background can go here. For now it's just the photo. */}
                    <img 
                      src={owner.image} 
                      alt={owner.name} 
                      className="w-full h-full object-cover object-top relative z-10"
                    />
                  </div>
                </div>

                {/* VERIFIED Floating Badge */}
                <div className="absolute -bottom-6 bg-white dark:bg-emerald-950 px-6 py-4 rounded-2xl shadow-xl border border-slate-100 dark:border-emerald-800 flex flex-col items-center gap-1 min-w-[200px]">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                    <span className="text-[13px] font-black uppercase tracking-wider">VERIFIED</span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium text-center">{owner.role}</span>
                </div>
              </div>

              {/* Middle: Bio & Title */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-r border-slate-100 dark:border-emerald-800 lg:pr-10">
                
                <div className="flex items-center justify-center lg:justify-start gap-3 w-full mb-6">
                  <div className="h-px bg-slate-200 dark:bg-emerald-800 flex-1 lg:hidden"></div>
                  <div className="w-10 h-10 rounded-full border border-emerald-200 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">MEET OUR FOUNDER</span>
                  <div className="h-px bg-slate-200 dark:bg-emerald-800 flex-1 lg:block"></div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                  {owner.name}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-[15px] mb-6">
                  {owner.role}
                </p>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                  With 15+ years of experience in financial services, {owner.name} leads Bhardwaj Finance Services with a clear vision — to make loan solutions simple, transparent and accessible for everyone.
                </p>

                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-emerald-200 dark:border-emerald-700 flex items-center justify-center bg-white dark:bg-emerald-950 shrink-0">
                    <Landmark className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-[13px] text-slate-700 dark:text-slate-300 font-medium text-left">
                    Building trust through <strong className="text-emerald-700 dark:text-emerald-400 font-bold">transparent</strong> financial solutions.
                  </p>
                </div>

              </div>

              {/* Right: Quote & Button */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full lg:pl-6 pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-emerald-800">
                
                <div className="flex items-center justify-center mb-6">
                  <div className="h-px bg-slate-200 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-emerald-400 dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-px bg-slate-200 dark:bg-emerald-800 flex-1"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-4">
                  <Quote className="w-12 h-12 text-emerald-500 mb-4 transform rotate-180 opacity-80" />
                  <p className="text-xl md:text-[22px] italic font-medium text-slate-800 dark:text-slate-200 leading-snug">
                    {owner.quote}
                  </p>
                  <Quote className="w-12 h-12 text-emerald-500 mt-4 ml-auto opacity-80" />
                </div>

                <div className="flex items-center justify-center mt-6 mb-8">
                  <div className="h-px bg-slate-200 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-emerald-400 dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-px bg-slate-200 dark:bg-emerald-800 flex-1"></div>
                </div>

                <Link href="/about/founder" className="w-full flex items-center justify-center gap-2 text-base font-bold text-white bg-[#008A54] hover:bg-[#007044] py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-500/20 group/btn">
                  <User className="w-5 h-5" />
                  Meet {owner.name.split(' ')[0]} 
                  <ArrowRight className="w-5 h-5 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>

              </div>
              
            </div>
          </div>
        </div>
      </section>
"""

pattern = r'\{\/\*\ 3\.\ FOUNDER \& AUTHORITY MESSAGE\ \*\/\}.*?(?=\{\/\*\ 4\.\ OFFICIAL TRUST BADGES\ \*\/)'
content = re.sub(pattern, new_section, content, flags=re.DOTALL)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
