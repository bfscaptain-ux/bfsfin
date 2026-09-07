const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

// Add the state variable
if (!content.includes('showInsuranceModal')) {
  content = content.replace(
    'const [activeProductTab, setActiveProductTab] = useState("finance");',
    'const [activeProductTab, setActiveProductTab] = useState("finance");\n  const [showInsuranceModal, setShowInsuranceModal] = useState(false);'
  );
}

// Replace all the alert calls
content = content.replace(/alert\('We are coming in the Insurance Sector soon!'\)/g, 'setShowInsuranceModal(true)');

// Add the Modal JSX at the very end of the return statement (right before </>)
const modalJSX = `
      {/* Insurance Coming Soon Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setShowInsuranceModal(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-[#0f172a] w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-slate-100 dark:border-emerald-800">
            {/* Top Pattern */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-emerald-500 to-emerald-700 opacity-10 dark:opacity-20"></div>
            
            <div className="absolute top-4 right-4 z-10">
              <button onClick={() => setShowInsuranceModal(false)} className="p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full text-slate-500 hover:text-red-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="relative p-8 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_0_8px_rgba(16,185,129,0.1)] dark:shadow-[0_0_0_8px_rgba(16,185,129,0.05)]">
                <ShieldCheck className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">Insurance Vertical<br/>Launching Soon</h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                We are working hard to bring India's most trusted and affordable insurance policies to Agra. Stay tuned for our grand launch in 2026!
              </p>
              <button 
                onClick={() => setShowInsuranceModal(false)} 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 active:scale-[0.98]"
              >
                Okay, got it!
              </button>
            </div>
          </div>
        </div>
      )}
`;

// Insert right before the last closing tag (</>)
const lastIndex = content.lastIndexOf('</>');
if (lastIndex !== -1) {
  content = content.substring(0, lastIndex) + modalJSX + "\n    " + content.substring(lastIndex);
  fs.writeFileSync('src/components/Header.tsx', content);
  console.log('Successfully injected the beautiful modal!');
} else {
  console.log('Could not find the end of the return statement');
}
