export interface BankRateData {
  id: string;
  slug: string;
  name: string;
  logo: string;
  seoTitle: string;
  seoDescription: string;
  salariedRate: string;
  selfEmployedRate: string;
  maxLTV: string;
  processingFee: string;
  processingFeeValue: number; // for sorting/math
  baseRateType: string; // e.g., RLLR, EBLR
  baseRateValue: string; // e.g., 6.50%
  overview: string[];
  benefits: string[];
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  documents: {
    category: string;
    items: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}
