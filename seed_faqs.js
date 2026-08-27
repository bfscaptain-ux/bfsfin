const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');

const generateSlug = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const seoFaqs = [
  // General & Trust Building
  { q: "Why is Bhardwaj Financial Services the most trusted loan agency in Agra?", a: "With over two decades of experience, 100% transparency, zero hidden charges, and direct DSA partnerships with top Indian banks (like PNB, SBI, HDFC), we have successfully disbursed thousands of loans. Our founder, Adv. Praveen Bhardwaj, ensures strict legal vetting for every file.", cat: "General" },
  { q: "Is my personal and financial data secure with BFS?", a: "Absolutely. We employ bank-grade encryption and strict internal data protocols. As an RBI-compliant and officially registered DSA, your documents are securely processed and never shared with unauthorized third parties.", cat: "General" },
  { q: "How long does loan approval take with BFS?", a: "Our famous '5-Day Sanction Guarantee' ensures that once your KYC and property documents are complete, your loan is processed through priority banking channels and sanctioned within 5 working days.", cat: "General" },
  
  // Home Loan
  { q: "How can I get the lowest interest rate on a Home Loan in India?", a: "To secure rates starting as low as 6.50%, you need a CIBIL score of 750+, stable income, and a clean repayment history. As an authorized DSA, BFS negotiates directly with banks on your behalf to get you the lowest possible rate.", cat: "Home Loan" },
  { q: "What is the maximum Home Loan amount I can get?", a: "Your maximum eligibility depends on your net monthly income and the property value. Typically, banks fund up to 80-90% of the property value. BFS helps structure your application to maximize your eligible amount up to ₹5 Crores or more.", cat: "Home Loan" },
  { q: "Can I get a Home Loan without an income proof (ITR)?", a: "Yes, under specialized affordable housing schemes and low-income group (LIG) programs, some NBFCs and banks offer home loans based on banking transactions and business margins even without formal ITRs. BFS specializes in profiling such cases.", cat: "Home Loan" },
  { q: "Are there any hidden processing fees for Home Loans?", a: "No. At Bhardwaj Finance, we charge zero brokerage. You only pay the transparent, standard processing fee directly to the lending bank, which we often get waived or discounted during special festive offers.", cat: "Home Loan" },
  
  // Balance Transfer
  { q: "When is the right time to opt for a Home Loan Balance Transfer?", a: "If your current interest rate is at least 0.5% higher than the ongoing market rate, and you have a remaining tenure of 5+ years, a balance transfer can save you lakhs in interest. BFS handles the entire transition seamlessly.", cat: "Balance Transfer" },
  { q: "Will my loan tenure increase if I transfer my loan to a new bank?", a: "You have full control. You can choose to keep the same tenure and reduce your EMI, or keep the same EMI and significantly reduce your tenure, which saves you even more money in the long run.", cat: "Balance Transfer" },
  { q: "What are the charges involved in a Balance Transfer?", a: "Most public sector banks like PNB and SBI have zero foreclosure charges on floating rate home loans. You will only pay a nominal processing fee to the new bank, which BFS will help minimize.", cat: "Balance Transfer" },
  
  // LAP (Loan Against Property)
  { q: "What is the interest rate for a Loan Against Property (LAP)?", a: "LAP interest rates typically range from 8.5% to 11% depending on the property type (residential vs commercial) and your financial profile. BFS compares offers from 10+ banks to secure the best deal.", cat: "Loan Against Property" },
  { q: "Can I use Loan Against Property for business expansion?", a: "Yes, LAP is the most cost-effective way to raise funds for business expansion, working capital, debt consolidation, or even personal needs like medical emergencies or weddings.", cat: "Loan Against Property" },
  { q: "Do you accept commercial properties as collateral for LAP?", a: "Yes, we process Loan Against Property for residential, commercial, and even industrial properties, provided the title is legally clear and marketable.", cat: "Loan Against Property" },
  
  // Business Loan
  { q: "What is an unsecured Business Loan?", a: "An unsecured business loan requires no collateral or property mortgage. It is granted based on your business vintage, annual turnover, GST returns, and banking health. BFS can arrange fast approvals for MSMEs.", cat: "Business Loan" },
  { q: "How much Business Loan can I get without collateral?", a: "Depending on your financials and credit profile, banks and NBFCs offer unsecured business loans ranging from ₹5 Lakhs to ₹50 Lakhs. For higher amounts, collateral-backed MSME loans are recommended.", cat: "Business Loan" },
  
  // Personal Loan
  { q: "What is the minimum salary required for a Personal Loan?", a: "Typically, a minimum net monthly salary of ₹15,000 to ₹25,000 is required, depending on your city and employer category. BFS partners with premium banks to ensure instant approvals for salaried professionals.", cat: "Personal Loan" },
  { q: "Can I prepay my Personal Loan?", a: "Yes, most banks allow you to prepay or foreclose a personal loan after 6 to 12 months, usually with a small foreclosure fee (1% to 4%). We guide you to banks with the most flexible prepayment terms.", cat: "Personal Loan" },
  
  // PNB Specific
  { q: "Why should I choose Punjab National Bank (PNB) for my Home Loan?", a: "PNB offers some of the lowest interest rates in the market, zero prepayment penalties on floating rates, and high transparency. As an elite PNB DSA partner, BFS guarantees prioritized processing of your file.", cat: "PNB" },
  { q: "What is the PNB Max Saver Home Loan?", a: "PNB Max Saver is an overdraft-based home loan where you can park surplus funds in a linked account. This reduces your principal outstanding and saves massive amounts of interest while keeping your funds liquid.", cat: "PNB" },
  
  // SBI Specific
  { q: "How long does SBI take to process a Home Loan?", a: "Traditionally, PSU banks can take weeks, but applying through Bhardwaj Finance fast-tracks your SBI Home Loan. We prepare a flawless file, ensuring SBI sanctions your loan within our 5-day window.", cat: "SBI" }
];

async function seedFaqs() {
  let existingFaqs = [];
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    existingFaqs = JSON.parse(fileContents);
  } catch (e) {
    console.log("No existing file found, creating new.");
  }

  const newFaqs = seoFaqs.map(faq => ({
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
  console.log(`Successfully injected ${newFaqs.length} highly optimized SEO FAQs into the CMS!`);
}

seedFaqs();
