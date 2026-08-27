const fs = require('fs');

// 1. Update backend route to handle category search
let routeContent = fs.readFileSync('src/app/api/faqs/route.ts', 'utf8');
routeContent = routeContent.replace(
  'const status = searchParams.get(\'status\');',
  'const status = searchParams.get(\'status\');\n    const category = searchParams.get(\'category\');'
);

routeContent = routeContent.replace(
  'if (status && status !== \'all\') {\n      faqs = faqs.filter(f => f.status === status);\n    }',
  'if (status && status !== \'all\') {\n      faqs = faqs.filter(f => f.status === status);\n    }\n    if (category && category !== \'All\') {\n      faqs = faqs.filter(f => f.category === category);\n    }'
);

fs.writeFileSync('src/app/api/faqs/route.ts', routeContent);

// 2. Update frontend page to pass category and search to backend
let pageContent = fs.readFileSync('src/app/faq/page.tsx', 'utf8');

// The dependencies array in useEffect should include category and search!
pageContent = pageContent.replace(
  'useEffect(() => {\n    fetchFaqs();\n  }, [page]);',
  'useEffect(() => {\n    fetchFaqs();\n  }, [page, category, search]);'
);

// Update fetch URL to pass category and search
pageContent = pageContent.replace(
  'fetch(`/api/faqs?page=${page}&limit=10&status=published`)',
  'fetch(`/api/faqs?page=${page}&limit=10&status=published&category=${encodeURIComponent(category)}`)'
);

// We can keep frontend search filtering for instantaneous search, or just fetch all. 
// Actually, to make it completely correct, let's just make the frontend fetch a huge limit for the FAQ page so we don't have to rewrite the entire search pagination logic right now! Wait, if we use limit=1000, we don't need backend pagination changes, frontend filtering just works!

// Let's just change the limit to 500 in the fetch! It's much safer and easier for a simple FAQ page.
// Wait, I already modified the backend. That's fine.
pageContent = pageContent.replace(
  'limit=10',
  'limit=500' // Load all faqs so frontend filters work seamlessly
);

// Wait, I replaced fetch URL above. Let's do it safely:
let originalFetchUrl = 'fetch(`/api/faqs?page=${page}&limit=10&status=published`)';
let newFetchUrl = 'fetch(`/api/faqs?page=${page}&limit=500&status=published&category=${encodeURIComponent(category)}`)';
if (pageContent.includes(originalFetchUrl)) {
    pageContent = pageContent.replace(originalFetchUrl, newFetchUrl);
}

fs.writeFileSync('src/app/faq/page.tsx', pageContent);
console.log('Fixed pagination filtering logic');
