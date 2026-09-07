import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// PATCH update a FAQ
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { calculatorId, question, answer, sortOrder, isActive } = body;

    const faq = await prisma.calculatorFAQ.update({
      where: { id: params.id },
      data: {
        ...(calculatorId !== undefined && { calculatorId }),
        ...(question !== undefined && { question }),
        ...(answer !== undefined && { answer }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
      }
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// DELETE a FAQ
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.calculatorFAQ.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
