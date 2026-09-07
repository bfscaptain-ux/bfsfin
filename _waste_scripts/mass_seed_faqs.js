const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');

const generateSlug = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const areas = ["Sanjay Place", "Sikandra", "Dayalbagh", "Kamla Nagar", "Tajganj", "Khandari", "Shahganj", "Trans Yamuna Colony", "Bodla", "Fatehabad Road"];
const products = [
  { name: "Home Loan", cat: "Home Loan" }, 
  { name: "Loan Against Property", cat: "Loan Against Property" }, 
  { name: "Business Loan", cat: "Business Loan" }, 
  { name: "Personal Loan", cat: "Personal Loan" },
  { name: "Balance Transfer", cat: "Balance Transfer" }
];

const banks = ["PNB", "SBI", "HDFC", "ICICI"];

let massFaqs = [];

// Agra Specific Combinations
areas.forEach(area => {
  products.forEach(product => {
    massFaqs.push({
      q: `Who provides the best ${product.name} in ${area}, Agra?`,
      a: `Bhardwaj Financial Services is the leading provider of ${product.name}s in ${area}. With zero hidden fees and direct DSA tie-ups with top banks, we ensure you get the lowest interest rates and fastest approvals right here in Agra.`,
      cat: product.cat
    });
    massFaqs.push({
      q: `How fast can I get a ${product.name} approved in ${area}?`,
      a: `For residents of ${area}, Agra, we offer a strict 5-Day Sanction Guarantee for ${product.name}s once all your legal and KYC documents are verified.`,
      cat: product.cat
    });
  });
});

// Bank Specific Combinations in Agra
banks.forEach(bank => {
  areas.forEach(area => {
    massFaqs.push({
      q: `How to apply for a ${bank} loan from ${area}, Agra?`,
      a: `You don't need to visit the branch. Bhardwaj Finance is the premium DSA partner for ${bank} in Agra. We offer doorstep document pickup in ${area} and process your file directly through priority channels.`,
      cat: bank
    });
  });
});

// General Top Rank Queries
for(let i=1; i<=30; i++) {
  massFaqs.push({
    q: `What makes Bhardwaj Finance the Top Rated Loan Agency in Agra (Review ${i})?`,
    a: `Our 100% transparent process, zero brokerage model, and relentless focus on securing the lowest interest rates have earned us thousands of 5-star reviews across Agra. We legally vet every property and ensure our clients never fall into hidden fee traps.`,
    cat: "General"
  });
}

// Low Interest Rate Queries
products.forEach(product => {
  massFaqs.push({
    q: `Where can I find the lowest interest rate for a ${product.name} in Agra?`,
    a: `Bhardwaj Financial Services tracks live interest rates across 15+ banks daily. By applying for a ${product.name} through us, we instantly match your profile with the bank offering the absolute lowest rate in Agra today.`,
    cat: product.cat
  });
  massFaqs.push({
    q: `Do I need to pay commission to get a ${product.name} in Agra?`,
    a: `Absolutely not! Bhardwaj Finance strictly operates on a ZERO commission/brokerage model for customers seeking a ${product.name}. We are officially paid by the banks.`,
    cat: product.cat
  });
});

async function run() {
  let existingFaqs = [];
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    existingFaqs = JSON.parse(fileContents);
  } catch (e) {
    console.log("No existing file found, creating new.");
  }

  const newFaqs = massFaqs.map(faq => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    slug: generateSlug(faq.q),
    question: faq.q,
    answer: faq.a,
    category: faq.cat,
    status: 'published',
    seoTitle: faq.q,
    metaDescription: faq.a.substring(0, 150) + "...",
    views: Math.floor(Math.random() * 500) + 50,
    date: new Date().toISOString().split('T')[0]
  }));

  const combined = [...newFaqs, ...existingFaqs];
  
  fs.writeFileSync(dataFilePath, JSON.stringify(combined, null, 2));
  console.log(`Successfully injected ${newFaqs.length} Agra-dominant SEO FAQs into the CMS!`);
}

run();
