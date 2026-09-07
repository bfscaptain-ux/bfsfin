const fs = require('fs');
let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

// 1. Remove Back to Home button
content = content.replace(
  '<Link href="/" className="inline-flex items-center justify-center gap-2 text-emerald-300 hover:text-white font-bold mb-8 transition-colors bg-emerald-800/50 hover:bg-emerald-800 px-4 py-2 rounded-full backdrop-blur-sm border border-emerald-700 shadow-sm">\n            <ArrowLeft className="w-4 h-4" /> Back to Home\n          </Link>',
  ''
);
// Also remove it if spaces differ
content = content.replace(/<Link href="\/" className="inline-flex[^>]+>\s*<ArrowLeft[^>]+>\s*Back to Home\s*<\/Link>/g, '');

// 2. Reduce padding (pt-40 pb-48 -> pt-28 pb-32)
content = content.replace('pt-40 pb-48', 'pt-28 pb-32');
content = content.replace('h-[80px] md:h-[160px]', 'h-[60px] md:h-[120px]'); // Slightly reduce curve height

// 3. Add custom animation and fetch background
const dbFetch = `    prisma.review.count({
      where: { status: "APPROVED" }
    }),
    prisma.heroImage.findUnique({
      where: { pageId: "reviews" }
    })
  ]);`;

content = content.replace(/    prisma\.review\.count\(\{\n      where: \{ status: "APPROVED" \}\n    \}\)\n  \]\);/g, dbFetch);

// Note: I have to replace `const [reviews, totalCount] = await Promise.all(` with `const [reviews, totalCount, heroImage] = await Promise.all(`
content = content.replace('const [reviews, totalCount] = await Promise.all([', 'const [reviews, totalCount, heroImage] = await Promise.all([');

// 4. Update the hero wrapper
const oldHeroContent = `<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
        </div>`;

const newHeroContent = `{heroImage?.imageUrl ? (
          <div className="absolute top-0 left-0 w-full h-full z-0">
            <img src={heroImage.imageUrl} alt="Background" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-[2px]"></div>
          </div>
        ) : (
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-400/20 blur-[120px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/20 blur-[120px]"></div>
          </div>
        )}`;

content = content.replace(oldHeroContent, newHeroContent);

// Add the floating animation style inside the layout
content = content.replace('<Header />', `<Header />
      <style dangerouslySetInnerHTML={{__html: \`
        @keyframes float-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-float-soft {
          animation: float-soft 6s ease-in-out infinite;
        }
      \`}} />`);

// Apply floating animation to the glass card
content = content.replace(
  'className="inline-flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl relative z-20"',
  'className="inline-flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-2xl relative z-20 animate-float-soft"'
);

// Also remove the explicit bg-emerald-900 if there's an image, actually the image has absolute inset-0 so it overlays bg-emerald-900 anyway.

fs.writeFileSync('src/app/reviews/page.tsx', content);
console.log('Reviews page updated!');
