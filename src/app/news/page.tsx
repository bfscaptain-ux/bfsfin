import { Metadata } from "next";
import fs from "fs/promises";
import path from "path";
import NewsHubClient from "./NewsHubClient";
import { NewsArticle } from "@/types/news";

export const metadata: Metadata = {
  title: "Financial News, RBI Updates & Loan Advisory | BFS India",
  description: "Stay ahead with verified Indian financial news, RBI monetary policy decisions, home loan interest rate cuts, CIBIL score guidelines, and tax alerts.",
  alternates: { canonical: "https://bfsfin.com/news" },
  openGraph: {
    title: "BFS Financial News & Market Insights",
    description: "Daily finance news, loan interest rate updates, and credit advisory by Bhardwaj Financial Services.",
    url: "https://bfsfin.com/news",
    siteName: "Bhardwaj Financial Services",
    locale: "en_IN",
    type: "website",
  },
};

async function getPublishedNews(): Promise<NewsArticle[]> {
  try {
    const p = path.join(process.cwd(), "src", "data", "news.json");
    const data = await fs.readFile(p, "utf8");
    const all: NewsArticle[] = JSON.parse(data);
    return all.filter(a => a.status === "published");
  } catch (error) {
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getPublishedNews();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "BFS Financial News & Market Insights",
    "description": "Daily verified updates on Indian loans, RBI rates, CIBIL rules, and personal finance.",
    "url": "https://bfsfin.com/news",
    "publisher": {
      "@type": "FinancialService",
      "@id": "https://bfsfin.com/#organization",
      "name": "Bhardwaj Financial Services"
    },
    "hasPart": articles.map((article, i) => ({
      "@type": "NewsArticle",
      "position": i + 1,
      "headline": article.title,
      "url": `https://bfsfin.com/news/${article.slug}`,
      "datePublished": article.publishedAt,
      "author": {
        "@type": "Person",
        "name": article.author
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <NewsHubClient initialArticles={articles} />
    </>
  );
}
