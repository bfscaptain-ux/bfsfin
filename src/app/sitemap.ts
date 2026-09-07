import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { productsData } from '@/data/productsData';
import { BlogPost } from '@/types/blog';

// Force Next.js to always render this dynamically so admin updates reflect instantly
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Ensure no caching

const BASE_URL = 'https://bfsfin.com';

const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const currentDate = new Date();

  // 1. STATIC PAGES (Core & Structural)
  const staticRoutes = [
    { path: '', priority: 1.0, freq: 'daily' },
    // About
    { path: '/about', priority: 0.8, freq: 'monthly' },
    { path: '/about/founder', priority: 0.8, freq: 'monthly' },
    { path: '/about/why-us', priority: 0.8, freq: 'monthly' },
    { path: '/about/certifications', priority: 0.7, freq: 'monthly' },
    // Banks
    { path: '/banks/central-bank', priority: 0.8, freq: 'monthly' },
    { path: '/banks/hdfc', priority: 0.8, freq: 'monthly' },
    { path: '/banks/icici', priority: 0.8, freq: 'monthly' },
    { path: '/banks/pnb', priority: 0.8, freq: 'monthly' },
    // Contact & Support
    { path: '/contact', priority: 0.9, freq: 'monthly' },
    { path: '/contact/locations', priority: 0.9, freq: 'monthly' },
    { path: '/complaint', priority: 0.8, freq: 'yearly' },
    { path: '/appointment', priority: 0.9, freq: 'weekly' },
    // Legal
    { path: '/disclaimer', priority: 0.5, freq: 'yearly' },
    // Careers
    { path: '/careers', priority: 0.7, freq: 'weekly' },
    // AI
    { path: '/ai-loan-advisor', priority: 0.9, freq: 'daily' },
    // Products
    { path: '/products', priority: 0.9, freq: 'weekly' },
    { path: '/products/credit-cards', priority: 0.9, freq: 'weekly' },
    { path: '/products/insurance', priority: 0.9, freq: 'weekly' },
    // Services
    { path: '/services/itr-filing', priority: 0.95, freq: 'daily' },
    { path: '/services/msme-registration', priority: 0.95, freq: 'daily' },
    // Calculators
    { path: '/calculator', priority: 0.9, freq: 'monthly' },
    { path: '/calculator/credit-cards/minimum-due', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/credit-cards/payoff', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/credit-cards/rewards', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/insurance/health-premium', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/insurance/hlv', priority: 0.8, freq: 'monthly' },
    { path: '/calculator/insurance/tax-saver', priority: 0.8, freq: 'monthly' },
    // Tools
    { path: '/tools/affordability', priority: 0.8, freq: 'monthly' },
    { path: '/tools/balance-transfer', priority: 0.8, freq: 'monthly' },
    { path: '/tools/interest-rate-compare', priority: 0.8, freq: 'monthly' },
    { path: '/tools/prepayment', priority: 0.8, freq: 'monthly' },
    { path: '/tools/stamp-duty', priority: 0.8, freq: 'monthly' },
    { path: '/tools/tax-benefit', priority: 0.8, freq: 'monthly' },
    // Resources
    { path: '/resources/credit-score', priority: 0.8, freq: 'monthly' },
    { path: '/resources/documents', priority: 0.8, freq: 'monthly' },
    { path: '/resources/downloads', priority: 0.8, freq: 'monthly' },
    { path: '/resources/process', priority: 0.8, freq: 'monthly' },
    // Miscellaneous
    { path: '/apply', priority: 0.9, freq: 'weekly' },
    { path: '/eligibility', priority: 0.9, freq: 'monthly' },
    { path: '/blog', priority: 0.9, freq: 'daily' },
    { path: '/faq', priority: 0.8, freq: 'weekly' },
    { path: '/testimonials', priority: 0.8, freq: 'weekly' },
    { path: '/reviews', priority: 0.8, freq: 'daily' }
  ];

  staticRoutes.forEach(route => {
    sitemapEntries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified: currentDate,
      changeFrequency: route.freq as any,
      priority: route.priority,
    });
  });

  // 2. DYNAMIC PRODUCTS (from productsData config)
  if (productsData) {
    Object.values(productsData).forEach((product: any) => {
      sitemapEntries.push({
        url: `${BASE_URL}/products/${product.slug || product.id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9, // High priority for product landing pages (AEO/SEO)
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
  } catch (e) {
    console.error('Sitemap: Failed to parse blogs.json');
  }

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
  } catch (e) {
    console.error('Sitemap: Failed to fetch DB blogs');
  }

  // 4. DYNAMIC FAQS (Long-tail SEO & Answer Engine Optimization - AEO)
  try {
    const faqFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');
    const faqContents = await fs.readFile(faqFilePath, 'utf8');
    const faqs: any[] = JSON.parse(faqContents);
    const publishedFaqs = faqs.filter(f => (f.status || 'published') === 'published');
    
    publishedFaqs.forEach(faq => {
      sitemapEntries.push({
        url: `${BASE_URL}/faq/${faq.slug || generateSlug(faq.question)}`,
        lastModified: new Date(faq.date || currentDate),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (e) {}

  // 5. DYNAMIC GEO-LOCATIONS (Local SEO & Hyperlocal targeting)
  try {
    const serviceAreaFilePath = path.join(process.cwd(), 'src', 'data', 'service-areas.json');
    const saContents = await fs.readFile(serviceAreaFilePath, 'utf8');
    const serviceAreas: any[] = JSON.parse(saContents);
    
    serviceAreas.forEach(city => {
      if (city.localAreas) {
        city.localAreas.forEach((area: string) => {
          sitemapEntries.push({
            url: `${BASE_URL}/locations/${generateSlug(city.name)}/${generateSlug(area)}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.85,
          });
        });
      }
    });
  } catch (e) {}

  // 6. DYNAMIC REVIEWS (User Generated Content for Freshness & Trust)
  try {
    const dbReviews = await prisma.review.findMany({
      where: { status: 'APPROVED' },
      select: { id: true, createdAt: true }
    });
    
    dbReviews.forEach(review => {
      sitemapEntries.push({
        url: `${BASE_URL}/reviews/${review.id}`,
        lastModified: review.createdAt,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  } catch (e) {
    console.error('Sitemap: Failed to fetch reviews');
  }

  // 7. HARDCODED DYNAMIC CREDIT CARDS
  const creditCardSlugs = ['hdfc-millennia', 'sbi-simplyclick', 'icici-amazon-pay', 'axis-flipkart', 'axis-ace', 'sbi-elite', 'axis-magnus'];
  creditCardSlugs.forEach(slug => {
    sitemapEntries.push({
      url: `${BASE_URL}/products/credit-cards/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // 8. HARDCODED DYNAMIC INSURANCE
  const insuranceSlugs = ['term-life', 'health-insurance', 'family-floater', 'critical-illness', 'car-insurance', 'two-wheeler-insurance', 'home-insurance', 'business-insurance'];
  insuranceSlugs.forEach(slug => {
    sitemapEntries.push({
      url: `${BASE_URL}/products/insurance/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    });
  });

  // 9. DYNAMIC JOBS
  try {
    const dbJobs = await prisma.jobPost.findMany({
      where: { status: 'PUBLISHED' },
      select: { id: true, updatedAt: true }
    });
    dbJobs.forEach(job => {
      sitemapEntries.push({
        url: `${BASE_URL}/careers/apply/${job.id}`,
        lastModified: job.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (e) {
    console.error('Sitemap: Failed to fetch jobs');
  }

  // Deduplicate URLs in case of overlap between DB and JSON
  const uniqueSitemap = Array.from(new Map(sitemapEntries.map(item => [item.url, item])).values());

  return uniqueSitemap;
}
