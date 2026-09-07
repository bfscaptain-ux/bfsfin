const fs = require('fs');

let content = fs.readFileSync('src/components/templates/ProductPageTemplate.tsx', 'utf8');

const oldOverlay = `{/* Dynamic Background Image overlay from CMS */}
        {heroImageUrl && (
          <>
            <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-normal pointer-events-none" style={{ backgroundImage: \`url('\${heroImageUrl}')\` }}></div>
            {/* Light screen overlay to ensure dark text readability */}
            <div className="absolute inset-0 bg-white/60 dark:bg-emerald-950/80 pointer-events-none"></div>
          </>
        )}`;

const newOverlay = `{/* Dynamic Background Image overlay from CMS */}
        {heroImageUrl && (
          <>
            {/* The Image */}
            <div className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-40 mix-blend-multiply dark:mix-blend-normal pointer-events-none" style={{ backgroundImage: \`url('\${heroImageUrl}')\` }}></div>
            
            {/* The Ultimate Gradient Mask for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-emerald-50/95 to-emerald-50/0 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900/10 pointer-events-none"></div>
          </>
        )}`;

// Normalize newlines before replacing
content = content.replace(/\r\n/g, '\n');
content = content.replace(oldOverlay, newOverlay);

fs.writeFileSync('src/components/templates/ProductPageTemplate.tsx', content);
console.log('Fixed overlay readability');
