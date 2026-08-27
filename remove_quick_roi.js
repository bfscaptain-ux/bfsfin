const fs = require('fs');
let content = fs.readFileSync('src/components/QuickEligibility.tsx', 'utf8');

content = content.replace(
  'const recommendedBank = empType === "salaried" ? `Top Nationalised Banks @ ${homeLoanRate || "6.50"}%` : `Leading Private Banks @ ${selfEmployedRate || "7.25"}%`;',
  'const recommendedBank = empType === "salaried" ? "Top Nationalised Banks" : "Leading Private Banks";'
);

content = content.replace(
  '<span>Best Interest Match:</span>',
  '<span>Recommended Partners:</span>'
);

fs.writeFileSync('src/components/QuickEligibility.tsx', content);
console.log('Removed ROI from QuickEligibility match');
