export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { NewsArticle } from '@/types/news';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'news.json');

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
};

async function readNewsFile(): Promise<NewsArticle[]> {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

async function writeNewsFile(data: NewsArticle[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const category = searchParams.get('category');
    const search = searchParams.get('search')?.toLowerCase();
    const status = searchParams.get('status'); // 'published', 'draft', or 'all'
    const slug = searchParams.get('slug');
    const trending = searchParams.get('trending');

    let articles = await readNewsFile();

    if (slug) {
      const single = articles.find(a => a.slug === slug);
      if (!single) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 });
      }
      return NextResponse.json({ data: single });
    }

    // Filter by status (default: 'published' unless explicitly 'all' or 'draft')
    if (status && status !== 'all') {
      articles = articles.filter(a => a.status === status);
    } else if (!status) {
      articles = articles.filter(a => a.status === 'published');
    }

    // Filter by category
    if (category && category !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search
    if (search) {
      articles = articles.filter(
        a =>
          a.title.toLowerCase().includes(search) ||
          a.tldr.some(t => t.toLowerCase().includes(search)) ||
          a.content.toLowerCase().includes(search)
      );
    }

    // Filter by trending
    if (trending === 'true') {
      articles = articles.filter(a => a.isTrending);
    }

    // Sort by publishedAt desc
    articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const total = articles.length;
    const startIndex = (page - 1) * limit;
    const paginated = articles.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      data: paginated,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      category,
      imageUrl,
      tldr,
      content,
      author,
      status,
      isTrending,
      ctaType,
      seoTitle,
      metaDescription,
      focusKeyword,
      canonicalUrl,
    } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const articles = await readNewsFile();
    const baseSlug = generateSlug(title);
    let uniqueSlug = baseSlug;
    let count = 1;
    while (articles.some(a => a.slug === uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${count}`;
      count++;
    }

    const tldrArray = Array.isArray(tldr)
      ? tldr.filter((t: string) => t && t.trim().length > 0)
      : typeof tldr === 'string'
      ? tldr.split('\n').map((s: string) => s.trim()).filter(Boolean)
      : [];

    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: title.trim(),
      slug: uniqueSlug,
      category: category || 'Banking & RBI',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      tldr: tldrArray,
      content: content.trim(),
      readTime: calculateReadTime(content),
      author: author || 'Adv. Praveen Bhardwaj',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: status || 'published',
      isTrending: Boolean(isTrending),
      views: 0,
      ctaType: ctaType || 'home-loan',
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || (tldrArray[0] || title),
      focusKeyword: focusKeyword || '',
      canonicalUrl: canonicalUrl || `https://bfsfin.com/news/${uniqueSlug}`,
    };

    articles.unshift(newArticle);
    await writeNewsFile(articles);

    return NextResponse.json({ success: true, data: newArticle }, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    const articles = await readNewsFile();
    const index = articles.findIndex(a => a.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    if (updates.content) {
      updates.readTime = calculateReadTime(updates.content);
    }
    if (updates.tldr && typeof updates.tldr === 'string') {
      updates.tldr = updates.tldr.split('\n').map((s: string) => s.trim()).filter(Boolean);
    }

    articles[index] = {
      ...articles[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await writeNewsFile(articles);

    return NextResponse.json({ success: true, data: articles[index] });
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Article ID is required' }, { status: 400 });
    }

    let articles = await readNewsFile();
    const initialLength = articles.length;
    articles = articles.filter(a => a.id !== id);

    if (articles.length === initialLength) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    await writeNewsFile(articles);
    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
