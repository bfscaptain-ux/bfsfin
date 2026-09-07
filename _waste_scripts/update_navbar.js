const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldDesktopMenu = `{/* Products Mega Menu */}
              <div className="relative group py-6">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 top-[70px] hidden group-hover:block w-[800px] bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-8 z-50">
                  <div className="grid grid-cols-3 gap-10 text-left">
                    {/* Column 1 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-4">
                        <Home className="w-5 h-5" />
                        <h4 className="font-black text-slate-900 dark:text-white text-base">Housing Loans</h4>
                      </div>
                      <Link href="/products/home-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Loan</Link>
                      <Link href="/products/balance-transfer" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Balance Transfer</Link>
                      <Link href="/products/top-up-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Top-Up Loan</Link>
                      <Link href="/products/plot-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Plot / Land Purchase</Link>
                      <Link href="/products/construction-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Construction Loan</Link>
                    </div>
                    {/* Column 2 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-4">
                        <Building className="w-5 h-5" />
                        <h4 className="font-black text-slate-900 dark:text-white text-base">Property & Retail</h4>
                      </div>
                      <Link href="/products/loan-against-property" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Loan Against Property</Link>
                      <Link href="/products/home-renovation" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Renovation</Link>
                      <Link href="/products/nri-home-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">NRI Home Loan</Link>
                      <Link href="/products/personal-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Personal Loan</Link>
                      <Link href="/products/education-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Education Loan</Link>
                    </div>
                    {/* Column 3 */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-4">
                        <Landmark className="w-5 h-5" />
                        <h4 className="font-black text-slate-900 dark:text-white text-base">Business & Auto</h4>
                      </div>
                      <Link href="/products/business-loan" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Business / MSME Loan</Link>
                      <Link href="/products/working-capital" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Working Capital</Link>
                      <Link href="/products/loan-against-securities" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Loan Against Securities</Link>
                      <Link href="/products/car-loan" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Car Loan</Link>
                      <Link href="/products/gold-loan" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Gold Loan</Link>
                    </div>
                  </div>
                </div>
              </div>`;

const newDesktopMenu = `{/* Products Mega Menu */}
              <div className="relative group py-6">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all">
                  <span>Products</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300 opacity-70" />
                </button>
                
                {/* Level 1 Dropdown */}
                <div className="absolute left-0 top-[70px] hidden group-hover:block w-64 bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:shadow-none p-2 z-50">
                  
                  {/* Finance Submenu */}
                  <div className="relative group/finance">
                    <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-left font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400">
                      Finance Services
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Finance Mega Menu */}
                    <div className="absolute left-[100%] top-0 hidden group-hover/finance:block w-[800px] bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-xl p-8 cursor-default z-[60]">
                      <div className="grid grid-cols-3 gap-10 text-left">
                        {/* Column 1 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-4">
                            <Home className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Housing Loans</h4>
                          </div>
                          <Link href="/products/home-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Loan</Link>
                          <Link href="/products/balance-transfer" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Balance Transfer</Link>
                          <Link href="/products/top-up-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Top-Up Loan</Link>
                          <Link href="/products/plot-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Plot / Land Purchase</Link>
                          <Link href="/products/construction-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Construction Loan</Link>
                        </div>
                        {/* Column 2 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-4">
                            <Building className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Property & Retail</h4>
                          </div>
                          <Link href="/products/loan-against-property" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Loan Against Property</Link>
                          <Link href="/products/home-renovation" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Home Renovation</Link>
                          <Link href="/products/nri-home-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">NRI Home Loan</Link>
                          <Link href="/products/personal-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Personal Loan</Link>
                          <Link href="/products/education-loan" className="block text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all">Education Loan</Link>
                        </div>
                        {/* Column 3 */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-4">
                            <Landmark className="w-5 h-5" />
                            <h4 className="font-black text-slate-900 dark:text-white text-base">Business & Auto</h4>
                          </div>
                          <Link href="/products/business-loan" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Business / MSME Loan</Link>
                          <Link href="/products/working-capital" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Working Capital</Link>
                          <Link href="/products/loan-against-securities" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Loan Against Securities</Link>
                          <Link href="/products/car-loan" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Car Loan</Link>
                          <Link href="/products/gold-loan" className="block text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:translate-x-1 transition-all">Gold Loan</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insurance Submenu */}
                  <div className="relative group/insurance">
                    <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-left font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 mt-1">
                      Insurance Services
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    {/* Insurance Dropdown */}
                    <div className="absolute left-[100%] top-0 hidden group-hover/insurance:block w-64 bg-white dark:bg-emerald-900 border border-slate-100 dark:border-emerald-800 rounded-xl shadow-xl p-6 cursor-default z-[60]">
                      <div className="space-y-4 text-left">
                        <div>
                          <div className="font-black text-emerald-600 dark:text-emerald-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-3">Life & Health</div>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all py-1.5">Term Life Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all py-1.5">Health Insurance</button>
                        </div>
                        <div className="pt-2">
                          <div className="font-black text-amber-500 dark:text-amber-400 border-b border-slate-100 dark:border-emerald-800 pb-2 mb-3">General Insurance</div>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all py-1.5">Car Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all py-1.5">Two Wheeler Insurance</button>
                          <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:translate-x-1 transition-all py-1.5">Home Insurance</button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>`;

// Replace desktop menu
content = content.replace(oldDesktopMenu, newDesktopMenu);

const oldMobileMenu = `{/* Mobile Products Accordion */}
              <div>
                <button onClick={() => toggleAccordion('products')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Products</span>
                  <ChevronDown className={\`w-5 h-5 transition-transform \${openAccordion === 'products' ? 'rotate-180 text-emerald-500' : ''}\`} />
                </button>
                {openAccordion === 'products' && (
                  <div className="pl-8 pr-4 py-2 space-y-2 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2">Housing</div>
                    <Link href="/products/home-loan" onClick={closeMobileMenu} className="block py-1.5">Home Loan</Link>
                    <Link href="/products/balance-transfer" onClick={closeMobileMenu} className="block py-1.5">Balance Transfer</Link>
                    <Link href="/products/top-up-loan" onClick={closeMobileMenu} className="block py-1.5">Top-Up Loan</Link>
                    <Link href="/products/plot-loan" onClick={closeMobileMenu} className="block py-1.5">Plot Loan</Link>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Property & Retail</div>
                    <Link href="/products/loan-against-property" onClick={closeMobileMenu} className="block py-1.5">Loan Against Property</Link>
                    <Link href="/products/personal-loan" onClick={closeMobileMenu} className="block py-1.5">Personal Loan</Link>
                    <Link href="/products/education-loan" onClick={closeMobileMenu} className="block py-1.5">Education Loan</Link>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Business & Auto</div>
                    <Link href="/products/business-loan" onClick={closeMobileMenu} className="block py-1.5">Business Loan</Link>
                    <Link href="/products/working-capital" onClick={closeMobileMenu} className="block py-1.5">Working Capital</Link>
                    <Link href="/products/car-loan" onClick={closeMobileMenu} className="block py-1.5">Car Loan</Link>
                  </div>
                )}
              </div>`;

const newMobileMenu = `{/* Mobile Products Accordion */}
              <div>
                <button onClick={() => toggleAccordion('products')} className="w-full flex items-center justify-between py-3 px-4 rounded-xl font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                  <span>Products</span>
                  <ChevronDown className={\`w-5 h-5 transition-transform \${openAccordion === 'products' ? 'rotate-180 text-emerald-500' : ''}\`} />
                </button>
                {openAccordion === 'products' && (
                  <div className="pl-4 pr-4 py-2 space-y-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl mt-1 text-sm text-slate-600 dark:text-slate-300">
                    
                    {/* Finance Section */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2">Finance Services</div>
                      <div className="pl-4 space-y-2">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">Housing</div>
                        <Link href="/products/home-loan" onClick={closeMobileMenu} className="block py-1">Home Loan</Link>
                        <Link href="/products/balance-transfer" onClick={closeMobileMenu} className="block py-1">Balance Transfer</Link>
                        <Link href="/products/top-up-loan" onClick={closeMobileMenu} className="block py-1">Top-Up Loan</Link>
                        <Link href="/products/plot-loan" onClick={closeMobileMenu} className="block py-1">Plot Loan</Link>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Property & Retail</div>
                        <Link href="/products/loan-against-property" onClick={closeMobileMenu} className="block py-1">Loan Against Property</Link>
                        <Link href="/products/personal-loan" onClick={closeMobileMenu} className="block py-1">Personal Loan</Link>
                        <Link href="/products/education-loan" onClick={closeMobileMenu} className="block py-1">Education Loan</Link>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">Business & Auto</div>
                        <Link href="/products/business-loan" onClick={closeMobileMenu} className="block py-1">Business Loan</Link>
                        <Link href="/products/working-capital" onClick={closeMobileMenu} className="block py-1">Working Capital</Link>
                        <Link href="/products/car-loan" onClick={closeMobileMenu} className="block py-1">Car Loan</Link>
                      </div>
                    </div>

                    {/* Insurance Section */}
                    <div>
                      <div className="font-black text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded-lg mb-2 flex items-center justify-between" onClick={() => alert('We are coming in the Insurance Sector soon!')}>
                        <span>Insurance Services</span>
                        <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Coming Soon</span>
                      </div>
                      <div className="pl-4 space-y-2">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">Life & Health</div>
                        <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block py-1 text-left w-full">Term Life Insurance</button>
                        <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block py-1 text-left w-full">Health Insurance</button>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-2 border-t border-slate-200 dark:border-slate-700">General</div>
                        <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block py-1 text-left w-full">Car Insurance</button>
                        <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block py-1 text-left w-full">Two Wheeler Insurance</button>
                        <button onClick={() => alert('We are coming in the Insurance Sector soon!')} className="block py-1 text-left w-full">Home Insurance</button>
                      </div>
                    </div>

                  </div>
                )}
              </div>`;

// First replace all \r\n with \n so that exact string match works!
content = content.replace(/\r\n/g, '\n');
content = content.replace(oldDesktopMenu, newDesktopMenu);
content = content.replace(oldMobileMenu, newMobileMenu);

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Successfully updated both Desktop and Mobile navigation menus!');
