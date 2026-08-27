export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  status: 'draft' | 'published';
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string;
  readTime?: string;
  views?: number;
}
