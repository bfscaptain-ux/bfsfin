const fs = require('fs');

let content = fs.readFileSync('src/app/reviews/page.tsx', 'utf8');

// 1. Update the database fetch to include average rating
const oldDbCall = `const [reviews, totalCount, heroImage] = await Promise.all([
    prisma.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.review.count({
      where: { status: "APPROVED" }
    }),
    prisma.heroImage.findUnique({
      where: { pageId: "reviews" }
    })
  ]);`;

const newDbCall = `const [reviews, totalCount, heroImage, aggregates] = await Promise.all([
    prisma.review.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.review.count({
      where: { status: "APPROVED" }
    }),
    prisma.heroImage.findUnique({
      where: { pageId: "reviews" }
    }),
    prisma.review.aggregate({
      where: { status: "APPROVED" },
      _avg: { rating: true }
    })
  ]);

  const averageRating = (aggregates._avg.rating || 5.0).toFixed(1);`;

content = content.replace(oldDbCall, newDbCall);

// 2. Reduce hero height by 40% (pt-36 pb-64 -> pt-20 pb-36)
content = content.replace('pt-36 pb-64', 'pt-20 pb-40');

// 3. Inject dynamic rating and exact totalCount
content = content.replace(
  '<span className="text-white font-black text-xl">4.9<span className="text-white/60 text-base">/5</span></span>',
  '<span className="text-white font-black text-xl">{averageRating}<span className="text-white/60 text-base">/5</span></span>'
);

content = content.replace(
  '<span className="text-white font-black text-xl">{totalCount}+</span>',
  '<span className="text-white font-black text-xl">{totalCount}</span>'
);

content = content.replace(
  'See why {totalCount}+ families trust Bhardwaj Financial Services with their dreams.',
  'See why {totalCount} families trust Bhardwaj Financial Services with their dreams.'
);

fs.writeFileSync('src/app/reviews/page.tsx', content);

let loading = fs.readFileSync('src/app/reviews/loading.tsx', 'utf8');
loading = loading.replace('pt-36 pb-64', 'pt-20 pb-40');
fs.writeFileSync('src/app/reviews/loading.tsx', loading);

console.log('Made stats completely dynamic and reduced height!');
