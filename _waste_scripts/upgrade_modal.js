const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

// The new gorgeous modal JSX
const newModalJSX = `{/* Insurance Coming Soon Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop with heavy blur */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => setShowInsuranceModal(false)}
          ></div>
          
          {/* Modal Content - Modern Glassmorphism & Gradient */}
          <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-md rounded-3xl shadow-[0_0_50px_-12px_rgba(16,185,129,0.25)] overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-slate-200/50 dark:border-emerald-800/50">
            
            {/* Glowing Orb Background Effects */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setShowInsuranceModal(false)} className="p-2 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700 backdrop-blur-sm rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative p-10 text-center flex flex-col items-center">
              
              {/* Logo Presentation */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/40 rounded-full blur-xl scale-150 opacity-70"></div>
                <div className="relative w-24 h-24 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 dark:border-slate-700 rotate-3 transition-transform hover:rotate-0">
                  <img src="/logo.png" alt="Bhardwaj Finance" className="w-16 h-auto object-contain -rotate-3 hover:rotate-0 transition-transform" />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-widest uppercase mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Coming in 2026
              </div>

              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                Insurance Vertical
              </h2>
              
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium px-2">
                We are currently building India's most transparent and affordable insurance marketplace, exclusively for Agra.
              </p>
              
              {/* Waitlist Form Area */}
              <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-center shadow-inner mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email address..." 
                  className="w-full bg-transparent border-none focus:ring-0 text-sm px-4 text-slate-700 dark:text-slate-200 placeholder-slate-400 outline-none"
                />
                <button 
                  onClick={() => {
                    alert('Thank you for joining the waitlist! We will notify you when we launch.');
                    setShowInsuranceModal(false);
                  }} 
                  className="shrink-0 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all active:scale-95 text-sm"
                >
                  Notify Me
                </button>
              </div>
              
              <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Be the first to get exclusive early-bird discounts.
              </div>
            </div>
          </div>
        </div>
      )}`;

// We need to extract the existing modal and replace it.
// Finding the start and end of the modal
const startIndex = content.indexOf('{/* Insurance Coming Soon Modal */}');
const endIndex = content.lastIndexOf(')}');

// We know the modal is at the very end of the file right before the final `    </>` or `  );`
if (startIndex !== -1) {
  // To be safe, just take everything from startIndex to the last closing fragment `</>`
  const finalFragmentIndex = content.lastIndexOf('</>');
  content = content.substring(0, startIndex) + newModalJSX + "\n    " + content.substring(finalFragmentIndex);
  fs.writeFileSync('src/components/Header.tsx', content);
  console.log('Successfully upgraded the modal to ultra-premium design!');
} else {
  console.log('Could not find the modal marker.');
}
