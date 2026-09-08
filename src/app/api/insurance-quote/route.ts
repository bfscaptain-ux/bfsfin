import { NextResponse } from 'next/server';
import { sendToGoogleSheets } from '@/lib/googleSheets';
import { resolveClientLocation } from '@/lib/geo';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Resolve Geolocation of Customer
    const geo = await resolveClientLocation(request, null, null);

    // Send to Google Sheets
    await sendToGoogleSheets({
      formType: "Insurance Quote",
      name: data.name,
      phone: data.phone,
      productType: "Insurance",
      subType: data.insuranceType,
      state: geo.region,
      city: geo.city,
      userLocation: geo.fullAddress,
      mapsUrl: geo.mapsUrl,
      status: "New Lead",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Insurance Quote Error:", error);
    return NextResponse.json({ error: 'Failed to submit quote request' }, { status: 500 });
  }
}
