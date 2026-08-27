import re

with open("src/app/HomeClient.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Add the dots pattern
new_section = """      {/* 3. FOUNDER & AUTHORITY MESSAGE */}
      <section className="py-24 bg-slate-50 dark:bg-emerald-950 relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white dark:bg-emerald-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 dark:border-emerald-800 p-8 md:p-14 relative overflow-hidden">
            
            {/* Dotted Pattern Background */}
            <div className="absolute top-0 left-0 w-64 h-full bg-[radial-gradient(#e5e7eb_2px,transparent_2px)] dark:bg-[radial-gradient(#064e3b_2px,transparent_2px)] [background-size:16px_16px] opacity-60"></div>
            <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-transparent to-white dark:to-emerald-900"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left: Image & Badge */}
              <div className="lg:col-span-4 flex flex-col items-center relative pb-8 lg:pb-0">
                
                {/* Glowing Outer Ring */}
                <div className="relative w-64 h-64 md:w-[300px] md:h-[300px] rounded-full p-2 bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent dark:from-emerald-700 dark:via-emerald-800 dark:to-transparent flex items-center justify-center shadow-sm">
                  
                  {/* Thick White Border + Image */}
                  <div className="w-[96%] h-[96%] rounded-full overflow-hidden border-[6px] border-white dark:border-emerald-900 shadow-sm bg-slate-100 dark:bg-emerald-800">
                    <img 
                      src={owner.image} 
                      alt={owner.name} 
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* VERIFIED Floating Badge */}
                <div className="absolute -bottom-5 bg-white dark:bg-emerald-950 px-5 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-emerald-800 flex flex-col items-center gap-1 min-w-[220px]">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-4 h-4 fill-emerald-100" />
                    <span className="text-sm font-black uppercase tracking-wider text-[#003B2A] dark:text-emerald-300">VERIFIED</span>
                  </div>
                  <span className="text-[12px] text-slate-500 dark:text-slate-400 font-medium text-center">{owner.role}</span>
                </div>
              </div>

              {/* Middle: Bio & Title */}
              <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left pt-8 lg:pt-0 border-t lg:border-t-0 lg:border-r border-slate-200/60 dark:border-emerald-800 lg:pr-12">
                
                <div className="flex items-center justify-center lg:justify-start gap-3 w-full mb-6">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1 lg:hidden"></div>
                  <div className="w-9 h-9 rounded-full border-[1.5px] border-emerald-300 dark:border-emerald-600 flex items-center justify-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/50">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-400 tracking-widest uppercase">MEET OUR FOUNDER</span>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1 lg:block"></div>
                </div>

                <h3 className="text-3xl md:text-[40px] font-black text-[#111827] dark:text-white mb-2 tracking-tight">
                  {owner.name}
                </h3>
                <p className="text-[#00A160] dark:text-emerald-400 font-bold text-[16px] mb-8">
                  {owner.role}
                </p>

                <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed mb-8">
                  With 15+ years of experience in financial services, {owner.name} leads Bhardwaj Finance Services with a clear vision — to make loan solutions simple, transparent and accessible for everyone.
                </p>

                <div className="bg-[#F6FBF9] dark:bg-emerald-900/40 px-5 py-4 rounded-xl border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-4 w-full">
                  <div className="w-12 h-12 rounded-full border border-emerald-200 dark:border-emerald-700 flex items-center justify-center bg-transparent shrink-0">
                    <Landmark className="w-6 h-6 text-[#00A160] dark:text-emerald-400" />
                  </div>
                  <p className="text-[14px] text-slate-800 dark:text-slate-200 font-semibold text-left">
                    Building trust through <br />
                    <span className="text-[#00A160] dark:text-emerald-400">transparent</span> financial solutions.
                  </p>
                </div>

              </div>

              {/* Right: Quote & Button */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full lg:pl-4 pt-8 lg:pt-0 border-t lg:border-t-0 border-slate-200/60 dark:border-emerald-800">
                
                <div className="flex items-center justify-center mb-6">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center py-4 relative">
                  {/* Huge SVG Quote Mark in the background for exact design match */}
                  <div className="absolute top-0 left-0 text-[#00A160] opacity-90 font-serif text-[80px] leading-none">“</div>
                  <p className="text-[19px] italic font-medium text-slate-800 dark:text-slate-200 leading-[1.6] mt-8 z-10 relative">
                    {owner.quote}
                  </p>
                  <div className="absolute bottom-0 right-0 text-[#00A160] opacity-90 font-serif text-[80px] leading-none transform rotate-180 translate-y-8">“</div>
                </div>

                <div className="flex items-center justify-center mt-12 mb-8">
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#00A160] dark:bg-emerald-600 mx-3 rounded-[1px]"></div>
                  <div className="h-[2px] bg-emerald-100 dark:bg-emerald-800 flex-1"></div>
                </div>

                <Link href="/about/founder" className="w-full max-w-[280px] mx-auto flex items-center justify-center gap-2 text-[15px] font-bold text-white bg-[#009A5A] hover:bg-[#008A50] py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-emerald-500/20 group/btn">
                  <User className="w-5 h-5" />
                  Meet {owner.name.split(' ')[0]} 
                  <ArrowRight className="w-5 h-5 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </Link>

              </div>
              
            </div>
          </div>
        </div>
      </section>"""

pattern = r'\{\/\*\ 3\.\ FOUNDER \& AUTHORITY MESSAGE\ \*\/\}.*?(?=\{\/\*\ 4\.\ OFFICIAL TRUST BADGES\ \*\/)'
content = re.sub(pattern, new_section, content, flags=re.DOTALL)

with open("src/app/HomeClient.tsx", "w", encoding="utf-8") as f:
    f.write(content)
