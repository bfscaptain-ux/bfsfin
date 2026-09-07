import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET all FAQs (admin - no filter by isActive)
export async function GET() {
  try {
    const faqs = await prisma.calculatorFAQ.findMany({
      orderBy: [{ calculatorId: 'asc' }, { sortOrder: 'asc' }]
    });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

// POST create new FAQ
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { calculatorId, question, answer, sortOrder = 0 } = body;

    if (!calculatorId || !question || !answer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const faq = await prisma.calculatorFAQ.create({
      data: { calculatorId, question, answer, sortOrder }
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
