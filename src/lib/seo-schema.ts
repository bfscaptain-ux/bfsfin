/**
 * SEO, AEO & GEO Structured Data (JSON-LD) Generator
 * Conforms to Schema.org standards for FinancialService, LoanOrCredit, FinancialProduct, FAQPage, and BreadcrumbList.
 * Optimized for Google Search Console, Google AI Overviews, Perplexity & ChatGPT Knowledge Graph.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface LoanSchemaParams {
  name: string;
  description: string;
  slug: string;
  startingRate?: string | number;
  minAmount?: number;
  maxAmount?: number;
  tenureYears?: number;
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
}

export interface FinancialProductSchemaParams {
  name: string;
  description: string;
  slug: string;
  category: "Insurance" | "CreditCard" | "Banking" | "Investment";
  faqs?: FAQItem[];
  breadcrumbs?: BreadcrumbItem[];
}

export const BFS_ORGANIZATION = {
  "@type": "FinancialService",
  "@id": "https://bfsfin.com/#organization",
  name: "Bhardwaj Financial Services",
  alternateName: "BFS",
  url: "https://bfsfin.com",
  logo: "https://bfsfin.com/logo.png",
  image: "https://bfsfin.com/logo.png",
  telephone: "+91-9258724227",
  email: "info@bfsfin.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Block-C11, Shop No.-5, First Floor, near MK Tailor, Sanjay Place",
    addressLocality: "Agra",
    addressRegion: "UP",
    postalCode: "282002",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "27.1994",
    longitude: "78.0053",
  },
  sameAs: [
    "https://www.facebook.com/bhardwajfinancialservices",
    "https://www.instagram.com/bhardwajfinancialservices",
    "https://www.linkedin.com/company/bhardwaj-financial-services",
  ],
};

export function buildLoanGraph(params: LoanSchemaParams) {
  const url = `https://bfsfin.com/products/${params.slug}`;
  const graph: any[] = [];

  const loanEntity: any = {
    "@type": "LoanOrCredit",
    "@id": `${url}#loan`,
    name: params.name,
    description: params.description,
    url: url,
    provider: {
      "@type": "FinancialService",
      "@id": "https://bfsfin.com/#organization",
      name: "Bhardwaj Financial Services",
    },
    currency: "INR",
    termsOfService: "https://bfsfin.com/terms",
    areaServed: [
      "Agra",
      "Mathura",
      "Firozabad",
      "Noida",
      "Gurgaon",
      "Delhi NCR",
      "Pan India",
    ],
  };

  if (params.startingRate) {
    loanEntity.annualPercentageRate = String(params.startingRate);
  }

  if (params.minAmount || params.maxAmount) {
    loanEntity.amount = {
      "@type": "MonetaryAmount",
      currency: "INR",
      minValue: params.minAmount || 50000,
      maxValue: params.maxAmount || 100000000,
    };
  }

  if (params.tenureYears) {
    loanEntity.loanTerm = {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: params.tenureYears,
      unitCode: "ANN",
    };
  }

  graph.push(loanEntity);

  const breadcrumbList = params.breadcrumbs || [
    { name: "Home", url: "https://bfsfin.com" },
    { name: "Products", url: "https://bfsfin.com/products" },
    { name: params.name, url: url },
  ];

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: breadcrumbList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });

  if (params.faqs && params.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: params.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildFinancialProductGraph(params: FinancialProductSchemaParams) {
  const url = `https://bfsfin.com/products/${params.slug}`;
  const graph: any[] = [];

  graph.push({
    "@type": "FinancialProduct",
    "@id": `${url}#product`,
    name: params.name,
    description: params.description,
    url: url,
    category: params.category,
    provider: {
      "@type": "FinancialService",
      "@id": "https://bfsfin.com/#organization",
      name: "Bhardwaj Financial Services",
    },
    areaServed: "India",
    termsOfService: "https://bfsfin.com/terms",
  });

  const breadcrumbList = params.breadcrumbs || [
    { name: "Home", url: "https://bfsfin.com" },
    { name: "Products", url: "https://bfsfin.com/products" },
    { name: params.name, url: url },
  ];

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: breadcrumbList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  });

  if (params.faqs && params.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: params.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
