export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { CallbackRequest } from '@/types/callback';
import { sendToGoogleSheets } from '@/lib/googleSheets';
import { resolveClientLocation } from '@/lib/geo';

const dataFilePath = path.join(process.cwd(), 'src', 'data', 'callbacks.json');

export async function GET() {
  try {
    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {}
    
    const callbacks: CallbackRequest[] = JSON.parse(fileContents);
    return NextResponse.json(callbacks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {}
    
    const callbacks: CallbackRequest[] = JSON.parse(fileContents);
    
    const newEntry: CallbackRequest = {
      id: Date.now().toString(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      state: data.state,
      city: data.city,
      loanType: data.loanType,
      loanSubType: data.loanSubType,
      message: data.message,
      status: 'New',
      date: new Date().toISOString()
    };
    
    callbacks.unshift(newEntry);
    
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true }).catch(() => {});
    await fs.writeFile(dataFilePath, JSON.stringify(callbacks, null, 2));
    
    // Resolve Geolocation of Customer
    const geo = await resolveClientLocation(request, data.lat, data.lng);

    // Send to Google Sheets (Dedicated "Contact Inquiries" & Master Sheet)
    await sendToGoogleSheets({
      formType: "Contact Inquiry",
      name: newEntry.name,
      phone: newEntry.phone,
      email: newEntry.email,
      state: newEntry.state || geo.region,
      city: newEntry.city || geo.city,
      userLocation: geo.fullAddress,
      mapsUrl: geo.mapsUrl,
      loanType: newEntry.loanType,
      productType: "Finance",
      subType: newEntry.loanSubType || newEntry.loanType,
      message: newEntry.message || `Contact Form Inquiry from ${newEntry.city}, ${newEntry.state}`,
      status: "New Lead",
    });

    // Send Confirmation Email to Customer
    if (newEntry.email && !newEntry.email.includes("no-email")) {
      const { sendEmail } = await import("@/lib/mailer");
      const { generateCallbackEmail } = await import("@/lib/emailTemplates");

      const emailContent = generateCallbackEmail({
        name: newEntry.name,
        phone: newEntry.phone,
        email: newEntry.email,
        city: `${newEntry.city}, ${newEntry.state}`,
        category: newEntry.loanType || "Advisory Inquiry",
        subType: newEntry.loanSubType || newEntry.loanType || "General",
        notes: newEntry.message
      });

      sendEmail({
        to: newEntry.email,
        subject: emailContent.subject,
        html: emailContent.html,
      }).catch(console.error);
    }

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status } = await request.json();
    
    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {}
    
    const callbacks: CallbackRequest[] = JSON.parse(fileContents);
    const index = callbacks.findIndex(c => c.id === id);
    
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    
    callbacks[index].status = status;
    
    await fs.writeFile(dataFilePath, JSON.stringify(callbacks, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    let fileContents = '[]';
    try {
      fileContents = await fs.readFile(dataFilePath, 'utf8');
    } catch(e) {}
    
    const callbacks: CallbackRequest[] = JSON.parse(fileContents);
    const filtered = callbacks.filter(c => c.id !== id);
    
    await fs.writeFile(dataFilePath, JSON.stringify(filtered, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
