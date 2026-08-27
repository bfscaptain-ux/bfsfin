import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { Calendar, User, Clock, ChevronRight, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import Link from 'next/link';

// Fetch single blog
async function getBlog(slug: string) {
  // In Next.js App Router, we should fetch from an absolute URL or hit the database directly.
  // Since we are in the same project and it's a server component, hitting the absolute API route might require localhost domain which is brittle in production.
  // We'll read the file directly for SSR.
  const fs = await import('fs/promises');
  const path = await import('path');
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
  
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs = JSON.parse(fileContents);
    const blog = blogs.find((b: any) => 
      b.slug === slug || 
      b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === slug
    );
    return { blog, allBlogs: blogs };
  } catch (e) {
    return { blog: null, allBlogs: [] };
  }
}

// Generate Dynamic Metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { blog } = await getBlog(params.slug);
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: `${blog.seoTitle || blog.title} | BFS Agra`,
    description: blog.metaDescription || blog.excerpt || 'Read the latest financial insights from BFS Agra.',
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: [blog.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { blog, allBlogs } = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = allBlogs
    .filter((b: any) => b.category === blog.category && b.id !== blog.id && b.status !== 'draft')
    .slice(0, 3);

  // Trigger API to increment views in background (client side usually, but we can do it via a quick fetch on mount)
  // We'll just render it.

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b132b] text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      <Header />
      
      {/* Blog Hero Section */}
      <section className="relative pt-32 pb-20 bg-emerald-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
            <Link href="/blog" className="hover:text-emerald-300 transition">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-emerald-200">{blog.category}</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-bold text-emerald-200 pt-6">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {blog.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {blog.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {blog.readTime || '5 min read'}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Social Share Sidebar (Desktop) */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-32 h-fit">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest writing-vertical-rl rotate-180 mb-4">Share Article</span>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition shadow-sm hover:shadow-emerald-500/30">
            <Facebook className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition shadow-sm hover:shadow-emerald-500/30">
            <Twitter className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 hover:bg-emerald-500 hover:text-white transition shadow-sm hover:shadow-emerald-500/30">
            <Linkedin className="w-4 h-4" />
          </button>
        </div>

        {/* Article Body */}
        <article className="flex-1 max-w-3xl w-full mx-auto">
          {/* This applies styles to the HTML generated by React-Quill */}
          <div 
            className="prose prose-lg dark:prose-invert prose-emerald max-w-none 
            prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-emerald-400
            prose-a:text-emerald-600 dark:prose-a:text-emerald-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-3xl prose-img:shadow-xl
            prose-strong:text-slate-900 dark:prose-strong:text-emerald-300"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>

        {/* Right Sidebar (Table of Contents / Ads) */}
        <aside className="hidden xl:block w-72 sticky top-32 h-fit">
          <div className="bg-white dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800/50 rounded-3xl p-6 shadow-sm">
            <h3 className="font-black text-lg text-slate-900 dark:text-emerald-400 mb-4 border-b border-emerald-100 dark:border-emerald-800/50 pb-4">
              Need a Home Loan?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Get the best interest rates starting at 6.50% p.a. with our fast 5-day approval process.
            </p>
            <Link href="/apply" className="block w-full py-3 text-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-emerald-500/30">
              Apply Now
            </Link>
          </div>
        </aside>

      </main>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="bg-emerald-50 dark:bg-emerald-900/20 border-t border-emerald-100 dark:border-emerald-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 text-center">
              More on <span className="text-emerald-600 dark:text-emerald-400">{blog.category}</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((rel: any) => (
                <Link href={`/blog/${rel.slug}`} key={rel.id} className="bg-white dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition group">
                  <div className="h-40 overflow-hidden">
                    <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition line-clamp-2">{rel.title}</h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 block">{rel.readTime || '3 min read'}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <FloatingSupport />
      
      {/* Mobile Share Floating Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-emerald-950 border-t border-slate-200 dark:border-emerald-900 p-4 flex justify-center gap-6 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
        <button className="text-emerald-600 dark:text-emerald-400 hover:scale-110 transition"><Facebook className="w-6 h-6" /></button>
        <button className="text-emerald-600 dark:text-emerald-400 hover:scale-110 transition"><Twitter className="w-6 h-6" /></button>
        <button className="text-emerald-600 dark:text-emerald-400 hover:scale-110 transition"><Linkedin className="w-6 h-6" /></button>
      </div>
    </div>
  );
}
