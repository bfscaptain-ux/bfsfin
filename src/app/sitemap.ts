import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { productsData } from '@/data/productsData';
import { BlogPost } from '@/types/blog';

// Force Next.js to always render dynamically so updates reflect in real-time
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BASE_URL = 'https://bfsfin.com';

const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const cleanAreaName = (name: string) => {
  return name
    .replace(/^Home Loan & Balance Transfer in\s+/i, '')
    .replace(/^Home Loan in\s+/i, '')
    .replace(/^Loan Against Property \(LAP\) in\s+/i, '')
    .replace(/^Loan Against Property in\s+/i, '')
    .replace(/^Business Loan in\s+/i, '')
    .replace(/^Personal Loan in\s+/i, '')
    .replace(/^Home Loan Balance Transfer in\s+/i, '')
    .replace(/,\s*Agra$/i, '')
    .replace(/,\s*Uttar Pradesh$/i, '')
    .trim();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  // 1. STATIC CORE PAGES & STRUCTURAL HUBS
  const staticRoutes = [
    { path: '', priority: 1.0, freq: 'daily' },
    // About
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/about/founder', priority: 0.8, freq: 'monthly' },
    { path: '/about/why-us', priority: 0.8, freq: 'monthly' },
    { path: '/about/certifications', priority: 0.7, freq: 'monthly' },
    
    // Top 10 Partner Banks
    { path: '/banks/sbi', priority: 0.9, freq: 'weekly' },
    { path: '/banks/hdfc', priority: 0.85, freq: 'weekly' },
    { path: '/banks/icici', priority: 0.85, freq: 'weekly' },
    { path: '/banks/pnb', priority: 0.85, freq: 'weekly' },
    { path: '/banks/bank-of-baroda', priority: 0.85, freq: 'weekly' },
    { path: '/banks/axis-bank', priority: 0.85, freq: 'weekly' },
    { path: '/banks/lic-housing-finance', priority: 0.85, freq: 'weekly' },
    { path: '/banks/kotak-mahindra-bank', priority: 0.8, freq: 'weekly' },
    { path: '/banks/bajaj-housing-finance', priority: 0.8, freq: 'weekly' },
    { path: '/banks/central-bank', priority: 0.8, freq: 'weekly' },

    // Contact & Support
    { path: '/contact', priority: 0.9, freq: 'monthly' },
    { path: '/contact/locations', priority: 0.95, freq: 'daily' },
    { path: '/complaint', priority: 0.8, freq: 'yearly' },
    { path: '/appointment', priority: 0.9, freq: 'weekly' },

    // Legal
    { path: '/disclaimer', priority: 0.5, freq: 'yearly' },
    { path: '/privacy-policy', priority: 0.5, freq: 'yearly' },
    { path: '/terms', priority: 0.5, freq: 'yearly' },
    { path: '/refund-cancellation', priority: 0.5, freq: 'yearly' },
    { path: '/grievance', priority: 0.5, freq: 'yearly' },

    // Careers Hub & AI
    { path: '/careers', priority: 0.7, freq: 'weekly' },
    { path: '/ai-loan-advisor', priority: 0.9, freq: 'daily' },

    // Products Index
    { path: '/products', priority: 0.95, freq: 'weekly' },
    { path: '/products/insurance', priority: 0.9, freq: 'weekly' },

    // Services
    { path: '/services/itr-filing', priority: 0.95, freq: 'daily' },
    { path: '/services/msme-registration', priority: 0.95, freq: 'daily' },

    // Calculators
    { path: '/calculator', priority: 1.0, freq: 'daily' },
    { path: '/calculator/insurance/health-premium', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/insurance/hlv', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/insurance/tax-saver', priority: 0.8, freq: 'monthly' },

    // Tools
    { path: '/tools/affordability', priority: 0.95, freq: 'weekly' },
    { path: '/tools/balance-transfer', priority: 0.95, freq: 'weekly' },
    { path: '/tools/interest-rate-compare', priority: 0.95, freq: 'weekly' },
    { path: '/tools/prepayment', priority: 0.95, freq: 'weekly' },
    { path: '/tools/stamp-duty', priority: 0.95, freq: 'weekly' },
    { path: '/tools/tax-benefit', priority: 0.95, freq: 'weekly' },

    // Resources
    { path: '/resources/credit-score', priority: 0.85, freq: 'monthly' },
    { path: '/resources/documents', priority: 0.85, freq: 'monthly' },
    { path: '/resources/downloads', priority: 0.8, freq: 'monthly' },
    { path: '/resources/process', priority: 0.8, freq: 'monthly' },

    // Main Hubs
    { path: '/apply', priority: 0.95, freq: 'weekly' },
    { path: '/eligibility', priority: 0.95, freq: 'daily' },
    { path: '/blog', priority: 0.9, freq: 'daily' },
    { path: '/news', priority: 0.95, freq: 'daily' },
    { path: '/faq', priority: 0.85, freq: 'weekly' },
    { path: '/testimonials', priority: 0.8, freq: 'weekly' },
    { path: '/reviews', priority: 0.9, freq: 'daily' }
  ];

  staticRoutes.forEach(route => {
    sitemapEntries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified: currentDate,
      changeFrequency: route.freq as any,
      priority: route.priority,
    });
  });

  // 2. DYNAMIC PRODUCTS (All 21+ Retail & Commercial Loan Products)
  if (productsData) {
    Object.values(productsData).forEach((product: any) => {
      sitemapEntries.push({
        url: `${BASE_URL}/products/${product.slug || product.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  }

  // 3. DYNAMIC BLOGS (JSON Fallback + Prisma Database)
  try {
    const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs: BlogPost[] = JSON.parse(fileContents);
    const publishedBlogs = blogs.filter(b => (b.status || 'published') === 'published');
    
    publishedBlogs.forEach(blog => {
      sitemapEntries.push({
        url: `${BASE_URL}/blog/${blog.slug || generateSlug(blog.title)}`,
        lastModified: new Date(blog.date || currentDate),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch (e) {}

  try {
    const dbBlogs = await prisma.blogArticle.findMany();
    dbBlogs.forEach(blog => {
      sitemapEntries.push({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: blog.publishedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  } catch (e) {}

  // 3.1 DYNAMIC NEWS ARTICLES (Verified Financial News, Google News & Discover Feeds)
  try {
    const newsFilePath = path.join(process.cwd(), 'src', 'data', 'news.json');
    const newsContents = await fs.readFile(newsFilePath, 'utf8');
    const newsArticles: any[] = JSON.parse(newsContents);
    const publishedNews = newsArticles.filter(n => (n.status || 'published') === 'published');
    publishedNews.forEach(article => {
      sitemapEntries.push({
        url: `${BASE_URL}/news/${article.slug}`,
        lastModified: new Date(article.publishedAt || currentDate),
        changeFrequency: 'daily',
        priority: 0.9,
      });
    });
  } catch (e) {}

  // 4. DYNAMIC FAQS (Cleaned: Zero Thin/Duplicate Review Spam)
  try {
    const faqFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');
    const faqContents = await fs.readFile(faqFilePath, 'utf8');
    const faqs: any[] = JSON.parse(faqContents);
    
    // Strict filter: Eliminate duplicate review doorway pages
    const genuineFaqs = faqs.filter(f => {
      if ((f.status || 'published') !== 'published') return false;
      const slug = (f.slug || generateSlug(f.question)).toLowerCase();
      if (slug.includes('review-') || slug.includes('what-makes-bhardwaj-finance-the-top-rated-loan-agency-in-agra-review')) {
        return false;
      }
      return true;
    });
    
    genuineFaqs.forEach(faq => {
      sitemapEntries.push({
        url: `${BASE_URL}/faq/${faq.slug || generateSlug(faq.question)}`,
        lastModified: new Date(faq.date || currentDate),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (e) {}

  // 5. HYPERLOCAL & PAN-INDIA GEO-LOCATIONS
  try {
    const serviceAreaFilePath = path.join(process.cwd(), 'src', 'data', 'service-areas.json');
    const saContents = await fs.readFile(serviceAreaFilePath, 'utf8');
    const serviceAreas: any[] = JSON.parse(saContents);
    
    serviceAreas.forEach(city => {
      const citySlug = generateSlug(city.name);

      // City Hub URL (e.g. /locations/agra, /locations/mathura, etc.)
      sitemapEntries.push({
        url: `${BASE_URL}/locations/${citySlug}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      });

      // Special Hyperlocal treatment for Agra (26 local areas with all 4 core loan intents)
      if (citySlug === 'agra' && city.localAreas) {
        city.localAreas.forEach((area: any) => {
          const rawAreaName = typeof area === 'string' ? area : (area?.name || '');
          const baseSlug = generateSlug(cleanAreaName(rawAreaName));
          if (baseSlug) {
            // 1. Home Loan in [Area]
            sitemapEntries.push({
              url: `${BASE_URL}/locations/agra/home-loan-in-${baseSlug}`,
              lastModified: currentDate,
              changeFrequency: 'weekly',
              priority: 0.95,
            });
            // 2. Loan Against Property in [Area]
            sitemapEntries.push({
              url: `${BASE_URL}/locations/agra/loan-against-property-in-${baseSlug}`,
              lastModified: currentDate,
              changeFrequency: 'weekly',
              priority: 0.95,
            });
            // 3. Business Loan in [Area]
            sitemapEntries.push({
              url: `${BASE_URL}/locations/agra/business-loan-in-${baseSlug}`,
              lastModified: currentDate,
              changeFrequency: 'weekly',
              priority: 0.95,
            });
            // 4. Home Loan Balance Transfer in [Area]
            sitemapEntries.push({
              url: `${BASE_URL}/locations/agra/home-loan-balance-transfer-in-${baseSlug}`,
              lastModified: currentDate,
              changeFrequency: 'weekly',
              priority: 0.95,
            });
          }
        });
      } else {
        // For all other 34 UP & Pan-India cities: 5 Core Loan Intent URLs per city
        const coreServices = [
          'home-loan-in',
          'loan-against-property-in',
          'home-loan-balance-transfer-in',
          'business-loan-in',
          'personal-loan-in'
        ];

        coreServices.forEach(srv => {
          sitemapEntries.push({
            url: `${BASE_URL}/locations/${citySlug}/${srv}-${citySlug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.9,
          });
        });
      }
    });
  } catch (e) {}

  // 7. DYNAMIC INSURANCE PRODUCTS
  const insuranceSlugs = ['term-life', 'health-insurance', 'family-floater', 'critical-illness', 'car-insurance', 'two-wheeler-insurance', 'home-insurance', 'business-insurance'];
  insuranceSlugs.forEach(slug => {
    sitemapEntries.push({
      url: `${BASE_URL}/products/insurance/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // Deduplicate URLs
  const uniqueSitemap = Array.from(new Map(sitemapEntries.map(item => [item.url, item])).values());

  return uniqueSitemap;
}
