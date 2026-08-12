export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface EligibilityCriterion {
  title: string;
  description: string;
}

export interface DocumentCategory {
  category: string;
  items: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  badge: string;
  heroHeadline: string;
  heroDescription: string;
  overview: string[];
  benefits: string[];
  quickFacts: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  features: ProductFeature[];
  eligibility: EligibilityCriterion[];
  documents: DocumentCategory[];
  faqs: FAQ[];
}
