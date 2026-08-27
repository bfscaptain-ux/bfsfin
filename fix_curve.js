const fs = require('fs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove the SVG curve
  content = content.replace(
    /<div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none transform translate-y-\[1px\]">[\s\S]*?<\/svg>\s*<\/div>/g,
    ''
  );

  // 2. Adjust hero padding (increase pb so cards can overlap)
  content = content.replace('pt-28 pb-32', 'pt-28 pb-48');

  // 3. Add negative margin to the cards container to make them float over the green bg
  content = content.replace(
    '<div className="min-h-screen bg-slate-50 dark:bg-emerald-950 pb-20 px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">',
    '<div className="min-h-screen bg-slate-50 dark:bg-emerald-950 pb-20 px-4 sm:px-6 lg:px-8 -mt-24 relative z-30">'
  );

  fs.writeFileSync(filePath, content);
}

processFile('src/app/reviews/page.tsx');
processFile('src/app/reviews/loading.tsx');
console.log('Removed curve and added overlap pattern!');
