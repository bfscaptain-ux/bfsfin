export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// Helper to generate slug
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

// Helper to calculate reading time
const calculateReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status'); // 'published' or 'draft' or 'all'

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    let blogs: BlogPost[] = JSON.parse(fileContents);

    // Default missing fields for older entries
    blogs = blogs.map(blog => ({
      ...blog,
      slug: blog.slug || generateSlug(blog.title),
      status: blog.status || 'published',
      category: blog.category || 'General',
      readTime: blog.readTime || calculateReadTime(blog.content),
      views: blog.views || 0,
    }));

    // Filter by status if requested (users only see 'published')
    if (status && status !== 'all') {
      blogs = blogs.filter(b => b.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedBlogs,
      meta: {
        total: blogs.length,
        page,
        limit,
        totalPages: Math.ceil(blogs.length / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();
    
    // Validate
    if (!newBlog.title || !newBlog.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Read existing
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs: BlogPost[] = JSON.parse(fileContents);
    
    // Generate derived fields
    const slug = newBlog.slug || generateSlug(newBlog.title);
    const readTime = calculateReadTime(newBlog.content);
    
    // Add new
    const blogEntry: BlogPost = {
      id: Date.now().toString(),
      slug,
      title: newBlog.title,
      excerpt: newBlog.excerpt || '',
      content: newBlog.content,
      imageUrl: newBlog.imageUrl || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      date: new Date().toISOString().split('T')[0],
      author: newBlog.author || 'Admin',
      category: newBlog.category || 'General',
      tags: newBlog.tags || [],
      status: newBlog.status || 'draft',
      seoTitle: newBlog.seoTitle || newBlog.title,
      metaDescription: newBlog.metaDescription || newBlog.excerpt,
      keywords: newBlog.keywords || '',
      readTime,
      views: 0
    };
    
    blogs.unshift(blogEntry); // Add to beginning
    
    // Save
    await fs.writeFile(dataFilePath, JSON.stringify(blogs, null, 2));
    
    return NextResponse.json(blogEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing blog ID' }, { status: 400 });
    }

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs = JSON.parse(fileContents);
    
    const initialLength = blogs.length;
    const updatedBlogs = blogs.filter((blog: any) => blog.id !== id);

    if (updatedBlogs.length === initialLength) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(updatedBlogs, null, 2));
    return NextResponse.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
