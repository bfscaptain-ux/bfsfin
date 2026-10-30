import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getClientIp } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const body = await req.json();
    const consentTimestamp = body.consentTimestamp || new Date().toISOString();
    
    const combinedMessage = `B2B Partner Registration | Profession: ${body.profession} | Experience: ${body.experience || 'N/A'} | Monthly Volume: ${body.monthlyVolume || 'N/A'} | City: ${body.city || 'Agra'} | State: ${body.state || 'UP'} | Note: ${body.message || 'No additional note'} | [Consent Authorized | IP: ${clientIp} | Time: ${consentTimestamp}]`;
    
    console.log(`[PARTNER AUDIT] New Partner Registered: ${body.name} (${body.phone || body.email}) | IP: ${clientIp}`);

    const newLead = await prisma.lead.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email || `partner-${Date.now()}@bfsfin.com`,
        city: body.city || "Agra",
        loanType: "B2B_PARTNERSHIP",
        loanAmount: 0,
        source: "Partner Registration Portal",
        message: combinedMessage,
        status: "NEW"
      }
    });

    // Sync to BFS Circle CRM (Partner Inquiries Desk)
    try {
      const { syncLeadToCRM } = await import('@/lib/crmSync');
      await syncLeadToCRM({
        name: body.name || 'Partner Applicant',
        phone: body.phone || '',
        email: body.email || '',
        city: body.city || 'Agra',
        formType: 'Partner Registration',
        loanType: 'B2B_PARTNERSHIP',
        source: 'Website Partner Portal',
        message: combinedMessage,
        productType: 'Partnership',
        subType: body.profession || 'DSA',
      });
    } catch (crmErr) {
      console.error('[PARTNER SYNC] Error syncing partner to CRM:', crmErr);
    }

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Partner Request Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit request' }, { status: 500 });
  }
}
