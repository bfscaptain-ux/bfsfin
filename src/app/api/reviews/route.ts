import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = parseInt(searchParams.get('limit') || '21');
    const category = (searchParams.get('category') || '').trim().toLowerCase();
    const search = (searchParams.get('search') || '').trim();
    const minRating = parseInt(searchParams.get('rating') || searchParams.get('minRating') || '0');
    const skip = (page - 1) * limit;

    const where: any = { status: 'APPROVED' };

    if (minRating > 0) {
      where.rating = { gte: minRating };
    }

    const categoryConditions: Record<string, any[]> = {
      itr: [
        { text: { contains: 'ITR' } },
        { text: { contains: 'income tax' } },
        { text: { contains: 'Income Tax' } },
        { text: { contains: 'TDS refund' } },
        { text: { contains: 'Tax Regime' } },
        { text: { contains: 'Form 16' } },
      ],
      msme: [
        { text: { contains: 'MSME' } },
        { text: { contains: 'Udyam' } },
        { text: { contains: 'PMEGP' } },
        { text: { contains: 'CGTMSE' } },
        { text: { contains: 'Mudra' } },
        { text: { contains: 'Working Capital' } },
        { text: { contains: 'Machinery Loan' } },
      ],
      loan: [
        { text: { contains: 'Home Loan' } },
        { text: { contains: 'Loan Against Property' } },
        { text: { contains: 'Balance Transfer' } },
        { text: { contains: 'Plot Purchase' } },
        { text: { contains: 'Construction' } },
      ],
      insurance: [
        { text: { contains: 'Term Life Insurance' } },
        { text: { contains: 'health insurance' } },
        { text: { contains: 'Health Insurance' } },
        { text: { contains: 'motor insurance' } },
        { text: { contains: 'fire and burglary' } },
        { text: { contains: 'Keyman Insurance' } },
        { text: { contains: 'Marine transit' } },
        { text: { contains: 'liability insurance' } },
      ],
      credit: [
        { text: { contains: 'Credit Card' } },
        { text: { contains: 'credit card' } },
        { text: { contains: 'CIBIL' } },
        { text: { contains: 'Overdraft' } },
        { text: { contains: 'line of credit' } },
      ]
    };

    const andClauses: any[] = [];

    if (category && category !== 'all') {
      const matchedCategory = category === 'tax' ? 'itr' : category === 'business' ? 'msme' : category === 'home-loan' ? 'loan' : category === 'card' ? 'credit' : category;
      if (categoryConditions[matchedCategory]) {
        andClauses.push({ OR: categoryConditions[matchedCategory] });
      }
    }

    if (search) {
      andClauses.push({
        OR: [
          { name: { contains: search } },
          { location: { contains: search } },
          { text: { contains: search } },
        ]
      });
    }

    if (andClauses.length > 0) {
      where.AND = andClauses;
    }

    const [reviews, totalCount, aggregates] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.review.count({ where }),
      prisma.review.aggregate({
        where,
        _avg: { rating: true }
      })
    ]);

    return NextResponse.json({
      reviews,
      totalCount,
      averageRating: aggregates._avg.rating || 5,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit) || 1
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, location, rating, text } = body;

    if (!name || !text || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        name,
        location: location || 'India',
        rating: parseInt(rating),
        text,
        status: 'PENDING',
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
