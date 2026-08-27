import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { FAQ } from '@/types/faq';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'faqs.json');

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {}
    
    const faqs: FAQ[] = JSON.parse(fileContents);
    
    const faqIndex = faqs.findIndex((f) => 
      f.slug === params.slug || generateSlug(f.question) === params.slug
    );

    if (faqIndex === -1) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    // Increment views
    faqs[faqIndex].views = (faqs[faqIndex].views || 0) + 1;
    
    fs.writeFile(dataFilePath, JSON.stringify(faqs, null, 2)).catch(console.error);

    return NextResponse.json(faqs[faqIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
  }
}
