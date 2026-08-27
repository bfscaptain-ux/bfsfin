const fs = require('fs');

function processFile() {
  let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

  // Enhance the overlay to a gradient for better readability of busy background images
  content = content.replace(
    '<div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-[2px]"></div>',
    '<div className="absolute inset-0 bg-gradient-to-b from-emerald-950/95 via-emerald-900/80 to-emerald-950/100 backdrop-blur-[3px]"></div>'
  );

  // Add Logo Pill above the heading
  const headingPattern = '<h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-50 to-emerald-200 mb-6 tracking-tight drop-shadow-sm">';
  const logoPill = `
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl relative z-20 hover:bg-white/10 transition-colors cursor-default">
              <img src="/logo.png" alt="Bhardwaj Finance Services" className="h-5 w-auto object-contain brightness-0 invert opacity-100 drop-shadow-md" />
              <div className="w-px h-4 bg-white/30"></div>
              <span className="text-emerald-50 text-xs font-black tracking-widest uppercase drop-shadow-md">Verified Feedback</span>
            </div>
          </div>
          `;

  if (!content.includes('Verified Feedback')) {
    content = content.replace(headingPattern, logoPill + headingPattern);
  }

  fs.writeFileSync('src/app/reviews/page.tsx', content);
}

processFile();
console.log('Added Logo Pill and refined background overlay!');
