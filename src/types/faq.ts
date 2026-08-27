export interface FAQ {
  id: string;
  slug: string;
  question: string;
  answer: string;
  category: string;
  status: 'draft' | 'published';
  seoTitle?: string;
  metaDescription?: string;
  views?: number;
  date: string;
}
