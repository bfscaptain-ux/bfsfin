import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'blogs.json');

// Helper to generate slug for old entries
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const blogs: BlogPost[] = JSON.parse(fileContents);
    
    const blogIndex = blogs.findIndex((b) => 
      b.slug === params.slug || generateSlug(b.title) === params.slug
    );

    if (blogIndex === -1) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Increment views
    blogs[blogIndex].views = (blogs[blogIndex].views || 0) + 1;
    
    // Save views asynchronously (fire and forget for performance)
    fs.writeFile(dataFilePath, JSON.stringify(blogs, null, 2)).catch(console.error);

    return NextResponse.json(blogs[blogIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
