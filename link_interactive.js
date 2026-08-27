const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

content = content.replace(
  'import Header from "@/components/Header";',
  'import Header from "@/components/Header";\nimport InteractiveReviewGrid from "@/components/InteractiveReviewGrid";'
);

const startString = '<div className="min-h-screen bg-slate-50 dark:bg-emerald-950 pb-20 px-4 sm:px-6 lg:px-8 -mt-24 relative z-30">';
const startIndex = content.indexOf(startString);

if (startIndex !== -1) {
  const newBottom = `
      {/* Interactive Grid Client Component */}
      <div className="min-h-screen bg-slate-50 dark:bg-emerald-950">
        <InteractiveReviewGrid 
          initialReviews={reviews} 
          totalPages={totalPages} 
          currentPage={page} 
        />
      </div>
      <Footer />
    </>
  );
}`;

  content = content.substring(0, startIndex) + newBottom;
  fs.writeFileSync('src/app/reviews/page.tsx', content);
  console.log('Updated page.tsx to use Interactive Component!');
} else {
  console.log('Could not find start string');
}
