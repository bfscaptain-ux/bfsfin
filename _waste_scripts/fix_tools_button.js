const fs = require('fs');

let content = fs.readFileSync('src/components/FloatingSupport.tsx', 'utf8');

const oldButton = `        {!isWheelOpen && (
          <button 
            onClick={() => setIsWheelOpen(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-emerald-900 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:scale-110 transition-all duration-300 z-[51] animate-in zoom-in duration-300"
            title="Open Tools"
          >
            <GripVertical className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}`;

const newButton = `        {!isWheelOpen && (
          <button 
            onClick={() => setIsWheelOpen(true)}
            className="group absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 z-[51] animate-in zoom-in duration-300 hover:scale-110"
            title="Open Tools"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Outer high-tech rotating rings */}
              <div className="absolute inset-1.5 sm:inset-2 border-2 border-slate-100 dark:border-slate-800 rounded-full animate-[spin_6s_linear_infinite] border-t-emerald-500 border-l-emerald-500/20"></div>
              <div className="absolute inset-2.5 sm:inset-3 border-2 border-slate-50 dark:border-slate-800/50 rounded-full animate-[spin_4s_linear_infinite_reverse] border-b-teal-500 border-r-teal-500/20"></div>
              
              {/* Inner Dynamic Grid */}
              <div className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] grid grid-cols-2 gap-1 sm:gap-1.5 rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-10">
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[4px] shadow-sm"></div>
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-[4px] shadow-sm scale-75 group-hover:scale-100 transition-transform duration-300 delay-75"></div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[4px] shadow-sm scale-75 group-hover:scale-100 transition-transform duration-300 delay-150"></div>
                <div className="bg-gradient-to-br from-teal-300 to-teal-500 rounded-[4px] shadow-sm"></div>
              </div>
            </div>
          </button>
        )}`;

content = content.replace(/\r\n/g, '\n');
content = content.replace(oldButton, newButton);
fs.writeFileSync('src/components/FloatingSupport.tsx', content);
console.log('Fixed button design');
