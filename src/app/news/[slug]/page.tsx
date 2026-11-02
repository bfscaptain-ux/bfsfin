import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import NewsArticleClient from "./NewsArticleClient";
import { NewsArticle } from "@/types/news";

async function getAllNews(): Promise<NewsArticle[]> {
  try {
    const p = path.join(process.cwd(), "src", "data", "news.json");
    const data = await fs.readFile(p, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const articles = await getAllNews();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: "News Article Not Found | BFS",
    };
  }

  const title = article.seoTitle || `${article.title} | BFS Financial News`;
  const description =
    article.metaDescription || (article.tldr && article.tldr[0]) || article.title;
  const canonical = article.canonicalUrl || `https://bfsfin.com/news/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const articles = await getAllNews();
  const article = articles.find(
    (a) => a.slug === params.slug && a.status === "published"
  );

  if (!article) {
    notFound();
  }

  const related = articles
    .filter((a) => a.id !== article.id && a.status === "published")
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  const newsArticleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bfsfin.com/news/${article.slug}`
    },
    "headline": article.title,
    "description": article.metaDescription || (article.tldr && article.tldr[0]) || article.title,
    "image": [article.imageUrl],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": article.author,
      "url": "https://bfsfin.com/about/founder"
    },
    "publisher": {
      "@type": "FinancialService",
      "@id": "https://bfsfin.com/#organization",
      "name": "Bhardwaj Financial Services",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bfsfin.com/logo.png"
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bfsfin.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Financial News",
        "item": "https://bfsfin.com/news"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://bfsfin.com/news/${article.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <NewsArticleClient article={article} relatedArticles={related} />
    </>
  );
}
