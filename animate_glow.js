const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf8');

const oldMegaMenuContainer = '<div className="absolute left-1/2 -translate-x-1/2 top-[70px] hidden group-hover:flex w-[950px] min-h-[420px] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-2xl shadow-[0_0_100px_-15px_rgba(16,185,129,0.25)] dark:shadow-[0_0_100px_-15px_rgba(16,185,129,0.2)] ring-1 ring-slate-200 dark:ring-emerald-800 overflow-hidden z-50">';

const newMegaMenuContainer = `<style dangerouslySetInnerHTML={{__html: \`
  @keyframes live-glow {
    0%, 100% { box-shadow: 0 0 50px -10px rgba(16,185,129,0.2); transform: translateX(-50%) translateY(0px); }
    50% { box-shadow: 0 0 150px 15px rgba(16,185,129,0.45); transform: translateX(-50%) translateY(-3px); }
  }
  .animate-live-glow {
    animation: live-glow 3.5s ease-in-out infinite;
  }
\`}} />
                <div className="absolute left-1/2 top-[70px] hidden group-hover:flex w-[950px] min-h-[420px] bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-2xl ring-1 ring-slate-200 dark:ring-emerald-800 overflow-hidden z-[100] animate-live-glow">`;

content = content.replace(oldMegaMenuContainer, newMegaMenuContainer);

fs.writeFileSync('src/components/Header.tsx', content);
console.log('Added live breathing glow!');
