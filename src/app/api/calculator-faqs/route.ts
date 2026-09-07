import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const calculatorId = searchParams.get('id');

  if (!calculatorId) {
    return NextResponse.json({ error: 'Calculator ID is required' }, { status: 400 });
  }

  try {
    const faqs = await prisma.calculatorFAQ.findMany({
      where: {
        calculatorId: calculatorId,
        isActive: true,
      },
      orderBy: {
        sortOrder: 'asc'
      },
      select: {
        question: true,
        answer: true
      }
    });
    
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array gracefully if table doesn't exist yet
  }
}
