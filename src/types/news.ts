export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: "Loans & EMIs" | "CIBIL & Credit" | "Banking & RBI" | "Taxes & MSME" | "BFS Official";
  imageUrl: string;
  tldr: string[];
  content: string;
  readTime: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published";
  isTrending?: boolean;
  views: number;
  ctaType: "home-loan" | "business-loan" | "personal-loan" | "emi-calculator" | "cibil-check" | "general";
  seoTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
}
