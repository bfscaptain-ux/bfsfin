const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

const newMegaMenu = `{/* Products Mega Menu */}
              <div className="relative group py-6" onMouseLeave={() => setActiveProductTab('finance')}>
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                
                {/* Unified Mega Menu Box */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[70px] hidden group-hover:flex w-[950px] min-h-[420px] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] dark:shadow-none overflow-hidden z-50">
                  
                  {/* Left Sidebar Tabs */}
                  <div className="w-[280px] shrink-0 bg-slate-50/80 dark:bg-emerald-950/20 border-r border-slate-100 dark:border-emerald-800/50 p-6 flex flex-col gap-3">
                    <div className="text-xs font-black tracking-widest text-slate-400 uppercase mb-2 px-2">Select Category</div>
                    
                    <button 
                      onMouseEnter={() => setActiveProductTab('finance')}
                      className={\`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between \${activeProductTab === 'finance' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}\`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={\`p-2 rounded-lg \${activeProductTab === 'finance' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}\`}>
                          <Landmark className="w-5 h-5" />
                        </div>
                        Finance Services
                      </div>
                      <ChevronRight className={\`w-4 h-4 transition-transform \${activeProductTab === 'finance' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}\`} />
                    </button>
                    
                    <button 
                      onMouseEnter={() => setActiveProductTab('insurance')}
                      className={\`w-full text-left px-5 py-4 rounded-xl font-bold transition-all flex items-center justify-between \${activeProductTab === 'insurance' ? 'bg-white dark:bg-[#0f172a] shadow-md text-emerald-600 dark:text-emerald-400 border border-slate-100 dark:border-emerald-800' : 'text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-emerald-900/30'}\`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={\`p-2 rounded-lg \${activeProductTab === 'insurance' ? 'bg-emerald-50 dark:bg-emerald-950/50' : 'bg-slate-100 dark:bg-slate-800/50'}\`}>
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        Insurance Services
                      </div>
                      <ChevronRight className={\`w-4 h-4 transition-transform \${activeProductTab === 'insurance' ? 'translate-x-1' : 'opacity-0 -translate-x-2'}\`} />
                    </button>
                    
                    {/* Bottom Promo Banner in Sidebar */}
                    <div className="mt-auto p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-2 opacity-20"><BadgePercent className="w-12 h-12" /></div>
                      <div className="font-black text-sm relative z-10">Lowest ROI Guaranteed</div>
                      <div className="text-xs text-emerald-100 mt-1 relative z-10">Compare 15+ banks in 2 mins.</div>
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 relative bg-white dark:bg-[#0f172a]">
                    
                    {/* Finance Content Tab */}
                    <div className={\`absolute inset-0 p-10 transition-all duration-300 \${activeProductTab === 'finance' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}\`}>
                      <div className="grid grid-cols-3 gap-8 text-left">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Home className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Housing Loans</h4>
                          </div>
                          <Link href="/products/home-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Loan</Link>
                          <Link href="/products/balance-transfer" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Balance Transfer</Link>
                          <Link href="/products/top-up-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Top-Up Loan</Link>
                          <Link href="/products/plot-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Plot / Land Purchase</Link>
                          <Link href="/products/construction-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Construction Loan</Link>
                        </div>
                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Building className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Property & Retail</h4>
                          </div>
                          <Link href="/products/loan-against-property" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Loan Against Property</Link>
                          <Link href="/products/home-renovation" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Renovation</Link>
                          <Link href="/products/nri-home-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">NRI Home Loan</Link>
                          <Link href="/products/personal-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Personal Loan</Link>
                          <Link href="/products/education-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Education Loan</Link>
                        </div>
                        {/* Column 3 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Landmark className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Business & Auto</h4>
                          </div>
                          <Link href="/products/business-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Business / MSME Loan</Link>
                          <Link href="/products/working-capital" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Working Capital</Link>
                          <Link href="/products/loan-against-securities" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Loan Against Securities</Link>
                          <Link href="/products/car-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Car Loan</Link>
                          <Link href="/products/gold-loan" className="block text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Gold Loan</Link>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Content Tab */}
                    <div className={\`absolute inset-0 p-10 transition-all duration-300 \${activeProductTab === 'insurance' ? 'opacity-100 z-10 translate-y-0' : 'opacity-0 z-0 translate-y-4 pointer-events-none'}\`}>
                      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-xl p-5 mb-8 flex items-center justify-between border border-emerald-100 dark:border-emerald-900/50">
                        <div>
                          <div className="font-black text-emerald-800 dark:text-emerald-400 text-xl">Insurance Vertical Launching Soon</div>
                          <div className="text-emerald-600 dark:text-emerald-500 text-sm mt-1 font-medium">We are bringing India's best insurance policies to Agra.</div>
                        </div>
                        <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm">Coming 2026</div>
                      </div>
                      <div className="grid grid-cols-2 gap-10 text-left">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <Users className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Life & Health</h4>
                          </div>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Term Life Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Health Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Family Floater Plans</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Critical Illness Cover</button>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800/50 pb-3 mb-5">
                            <ShieldCheck className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">General Insurance</h4>
                          </div>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Comprehensive Car Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Two Wheeler Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Property Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Business / Shop Insurance</button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>`;

const startIndex = content.indexOf('{/* Products Mega Menu */}');
const endIndex = content.indexOf('{/* Tools */}');

if (startIndex !== -1 && endIndex !== -1) {
  content = content.substring(0, startIndex) + newMegaMenu + "\n\n              " + content.substring(endIndex);
  fs.writeFileSync('src/components/Header.tsx', content);
  console.log('Replaced Mega Menu with professional tabbed layout!');
} else {
  console.log('Could not find markers');
}
