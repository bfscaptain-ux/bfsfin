import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Create a new Lead for the partnership request
    // We append the profession to the message to keep using the Lead schema
    const combinedMessage = `Profession: ${body.profession}\n\nMessage: ${body.message || 'No additional message'}`;
    
    const newLead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || 'partner@no-email.com',
        city: body.city,
        loanType: "B2B_PARTNERSHIP",
        loanAmount: 0,
        source: "Partner Page",
        message: combinedMessage,
        status: "NEW"
      }
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Partner Request Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit request' }, { status: 500 });
  }
}
