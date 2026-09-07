const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');
let faqs = [];
if (fs.existsSync(filePath)) {
  faqs = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const newFaqs = [
  // ELIGIBILITY
  {
    id: "faq_elig_1",
    question: "What is the minimum salary required for a Home Loan in Agra?",
    answer: "For most nationalised banks in Agra (like SBI, PNB), the minimum net take-home salary should be at least ₹15,000 per month. However, a higher salary increases your loan eligibility.",
    category: "Eligibility",
    order: 1
  },
  {
    id: "faq_elig_2",
    question: "Can I get a business loan in Agra with a CIBIL score of 650?",
    answer: "A CIBIL score of 650 is considered low for unsecured loans. However, Bhardwaj Finance can help you secure a Loan Against Property (LAP) or a secured business loan even with a 650 score.",
    category: "Eligibility",
    order: 2
  },
  {
    id: "faq_elig_3",
    question: "Are self-employed individuals eligible for home loans?",
    answer: "Yes, absolutely! Self-employed individuals, shop owners, and MSME runners in Agra are highly eligible. You just need to provide your last 3 years of ITR and GST returns.",
    category: "Eligibility",
    order: 3
  },
  {
    id: "faq_elig_4",
    question: "What is the age limit for applying for a mortgage loan?",
    answer: "The minimum age is 21 years, and the maximum age at the time of loan maturity should not exceed 65 years for salaried and 70 years for self-employed individuals.",
    category: "Eligibility",
    order: 4
  },
  {
    id: "faq_elig_5",
    question: "Can I add a co-applicant to increase my loan eligibility?",
    answer: "Yes! Adding a co-applicant (spouse, parents, or earning children) allows the bank to club both your incomes, which significantly increases your maximum loan eligibility.",
    category: "Eligibility",
    order: 5
  },

  // HOME LOANS
  {
    id: "faq_hl_1",
    question: "Who provides the best Home Loan in Sanjay Place, Agra?",
    answer: "Bhardwaj Financial Services, located in Sanjay Place, provides the best home loans by comparing rates from over 15 top nationalised and private banks to secure you the lowest ROI.",
    category: "Home Loans",
    order: 1
  },
  {
    id: "faq_hl_2",
    question: "How fast can I get a Home Loan approved in Agra?",
    answer: "With our completely digitized process and in-house legal vetting, Bhardwaj Finance guarantees a lightning-fast 5-day approval for all clear-title properties in Agra.",
    category: "Home Loans",
    order: 2
  },
  {
    id: "faq_hl_3",
    question: "Is property insurance mandatory with a home loan?",
    answer: "While it is highly recommended to protect your asset from unforeseen damages like fire or earthquakes, it is not legally mandatory for all banks. We help you choose the best options.",
    category: "Home Loans",
    order: 3
  },
  {
    id: "faq_hl_4",
    question: "Can I prepay my home loan before the tenure ends?",
    answer: "Yes, as per RBI guidelines, there are ZERO prepayment or foreclosure charges on floating-rate home loans for individual borrowers. You can prepay and save on interest anytime.",
    category: "Home Loans",
    order: 4
  },
  {
    id: "faq_hl_5",
    question: "Do you provide home loans for properties in Dayal Bagh and Sikandra?",
    answer: "Yes! We provide home loan services across all major localities in Agra including Dayal Bagh, Sikandra, Kamla Nagar, Tajganj, and Fatehabad Road.",
    category: "Home Loans",
    order: 5
  },

  // PROCESSING FEES
  {
    id: "faq_pf_1",
    question: "What are the processing fees for a home loan in Agra?",
    answer: "Processing fees usually range from 0.5% to 1% of the loan amount. However, Bhardwaj Finance frequently runs zero-processing-fee campaigns for direct applications.",
    category: "Processing Fees",
    order: 1
  },
  {
    id: "faq_pf_2",
    question: "Are there any hidden charges when applying through Bhardwaj Finance?",
    answer: "No. We believe in 100% transparency. Any bank fees (like valuation, legal, or processing) are clearly communicated upfront before you sign the application.",
    category: "Processing Fees",
    order: 2
  },
  {
    id: "faq_pf_3",
    question: "Does Balance Transfer (BT) involve new processing fees?",
    answer: "When transferring your loan to a new bank, a nominal processing fee may apply. However, the lakhs of rupees you save in long-term interest heavily outweigh this small fee.",
    category: "Processing Fees",
    order: 3
  },
  {
    id: "faq_pf_4",
    question: "Is GST applicable on loan processing fees?",
    answer: "Yes, an 18% GST is applicable on all banking services, including loan processing fees, legal charges, and valuation fees.",
    category: "Processing Fees",
    order: 4
  },
  {
    id: "faq_pf_5",
    question: "Do you charge any consultancy fee from the customer?",
    answer: "For standard loan applications, Bhardwaj Finance does not charge any upfront consultancy fees from the customer. We are compensated directly by the partner banks.",
    category: "Processing Fees",
    order: 5
  },

  // DOCUMENTATION
  {
    id: "faq_doc_1",
    question: "What documents are required for a Home Loan?",
    answer: "Basic documents include: Aadhar Card, PAN Card, 6 months bank statement, 3 months salary slips (for salaried) or 3 years ITR (for self-employed), and the property title deed.",
    category: "Documentation",
    order: 1
  },
  {
    id: "faq_doc_2",
    question: "Do I need to visit the bank to submit my documents?",
    answer: "Not at all. Bhardwaj Finance provides a free Doorstep Document Pickup service anywhere in Agra. Our executives will collect everything from your home or office.",
    category: "Documentation",
    order: 2
  },
  {
    id: "faq_doc_3",
    question: "What property documents are checked during legal vetting?",
    answer: "Our in-house legal team verifies the Sale Deed, previous chain of agreements (usually up to 13-30 years), Approved Map (Naksha), and local Nagar Nigam tax receipts.",
    category: "Documentation",
    order: 3
  },
  {
    id: "faq_doc_4",
    question: "Is an approved map mandatory for getting a home loan in Agra?",
    answer: "For nationalised banks (like SBI, PNB), an ADA (Agra Development Authority) approved map is usually mandatory. However, we have tie-ups with NBFCs that can fund non-ADA approved properties as well.",
    category: "Documentation",
    order: 4
  },
  {
    id: "faq_doc_5",
    question: "What if I don't have my income tax returns (ITR)?",
    answer: "If you don't file an ITR, getting a traditional bank loan is difficult. But don't worry, we offer special 'No-Income-Proof' or 'Banking Surge' loans through specific NBFCs.",
    category: "Documentation",
    order: 5
  }
];

// Prepend the new FAQs so they show up first
faqs = [...newFaqs, ...faqs];

fs.writeFileSync(filePath, JSON.stringify(faqs, null, 2));
console.log('Injected 20 new FAQs matching the exact filter categories!');
