export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { FAQ } from '@/types/faq';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');

// Helper to generate slug
const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {
      // file might not exist yet
    }
    
    let faqs: FAQ[] = JSON.parse(fileContents);

    // Default missing fields for older entries
    faqs = faqs.map(faq => ({
      ...faq,
      slug: faq.slug || generateSlug(faq.question),
      status: faq.status || 'published',
      category: faq.category || 'General',
      views: faq.views || 0,
      date: faq.date || new Date().toISOString().split('T')[0]
    }));

    // Filter by status if requested
    if (status && status !== 'all') {
      faqs = faqs.filter(f => f.status === status);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedFaqs = faqs.slice(startIndex, endIndex);

    return NextResponse.json({
      data: paginatedFaqs,
      meta: {
        total: faqs.length,
        page,
        limit,
        totalPages: Math.ceil(faqs.length / limit)
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newFaq = await request.json();
    
    if (!newFaq.question || !newFaq.answer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {}
    
    const faqs: FAQ[] = JSON.parse(fileContents);
    
    const slug = newFaq.slug || generateSlug(newFaq.question);
    
    const faqEntry: FAQ = {
      id: Date.now().toString(),
      slug,
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category || 'General',
      status: newFaq.status || 'draft',
      seoTitle: newFaq.seoTitle || newFaq.question,
      metaDescription: newFaq.metaDescription || '',
      views: 0,
      date: new Date().toISOString().split('T')[0]
    };
    
    faqs.unshift(faqEntry); // Add to top
    
    await fs.writeFile(dataFilePath, JSON.stringify(faqs, null, 2));
    
    return NextResponse.json(faqEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing FAQ ID' }, { status: 400 });
    }

    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const faqs = JSON.parse(fileContents);
    
    const initialLength = faqs.length;
    const updatedFaqs = faqs.filter((faq: any) => faq.id !== id);

    if (updatedFaqs.length === initialLength) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    await fs.writeFile(dataFilePath, JSON.stringify(updatedFaqs, null, 2));
    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
