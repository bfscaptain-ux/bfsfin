import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

const prisma = new PrismaClient();

type Props = {
  params: { slug: string };
};

// Dynamically generate SEO metadata based on the blog content
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.metaTitle || `${blog.title} | Bhardwaj Finance Services`,
    description: blog.metaDescription || blog.excerpt || "Read this article on Bhardwaj Finance Services.",
    openGraph: {
      title: blog.title,
      description: blog.excerpt || "",
      type: "article",
      publishedTime: blog.createdAt.toISOString(),
      authors: [blog.author],
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  };
}

export default async function SingleBlogPage({ params }: Props) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
  });

  if (!blog || !blog.isPublished) {
    notFound();
  }

  // Schema.org JSON-LD for AEO/GEO and Google Search
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.coverImage ? [blog.coverImage] : [],
    "datePublished": blog.createdAt.toISOString(),
    "dateModified": blog.updatedAt.toISOString(),
    "author": [{
      "@type": "Person",
      "name": blog.author,
      "url": "https://bhardwajfinanceservices.com/about-us"
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Bhardwaj Finance Services",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bhardwajfinanceservices.com/logo.png"
      }
    },
    "description": blog.metaDescription || blog.excerpt
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      
      {/* Inject JSON-LD into the head for SEO/GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pb-20">
        
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 pt-16 pb-12 text-center">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm mb-8 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to all articles
          </Link>
          
          <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
            {blog.tags?.split(',').map((tag: string) => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full">
                {tag.trim()}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" /> {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 
              {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="max-w-6xl mx-auto px-4 mb-16">
            <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={blog.coverImage} 
                alt={blog.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-4 prose prose-lg prose-slate prose-headings:font-black prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-2xl">
          {/* Note: In a production app, use a safe HTML parser like DOMPurify or a Markdown renderer. */}
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>

      </main>

      <Footer />
    </div>
  );
}
