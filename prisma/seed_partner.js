const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Partner Data...');

  // 1. Create a User (Partner)
  const partnerUser = await prisma.user.upsert({
    where: { email: 'john@doerealestate.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@doerealestate.com',
      phone: '+919876543210',
      role: 'PARTNER',
      city: 'Mumbai',
      referralCode: 'PRT-801',
    },
  });

  console.log('Created Partner User:', partnerUser.id);

  // 2. Create Partner Profile
  await prisma.partnerProfile.upsert({
    where: { userId: partnerUser.id },
    update: {},
    create: {
      userId: partnerUser.id,
      companyName: 'Doe Real Estate',
      tier: 'Platinum',
      commissionRate: '2.0%',
      status: 'Active',
      bankName: 'HDFC Bank',
      accountName: 'John Doe',
      accountNumber: '****4589',
      ifscCode: 'HDFC0001234',
    },
  });

  // 3. Create Payouts
  const payouts = [
    { amount: 12500, status: 'Completed', leadName: 'Amit Sharma', date: new Date('2026-08-01T10:00:00Z') },
    { amount: 25000, status: 'Completed', leadName: 'Neha Gupta', date: new Date('2026-07-15T14:30:00Z') },
    { amount: 8500, status: 'Completed', leadName: 'Vikram Singh', date: new Date('2026-07-02T09:15:00Z') },
    { amount: 15000, status: 'Completed', leadName: 'Priya Patel', date: new Date('2026-06-20T16:45:00Z') },
  ];

  for (const payout of payouts) {
    await prisma.payout.create({
      data: {
        userId: partnerUser.id,
        amount: payout.amount,
        status: payout.status,
        leadName: payout.leadName,
        date: payout.date,
      },
    });
  }

  // 4. Create dummy Leads for Pagination testing
  const dummyLeads = [
    { name: 'Amit Sharma', phone: '+91 9876543210', loanType: 'Home Loan', loanAmount: 5000000, status: 'APPROVED' },
    { name: 'Priya Patel', phone: '+91 9876543211', loanType: 'Business Loan', loanAmount: 7500000, status: 'IN_PROGRESS' },
    { name: 'Rajesh Kumar', phone: '+91 9876543212', loanType: 'Personal Loan', loanAmount: 1000000, status: 'PENDING_DOCS' },
    { name: 'Neha Gupta', phone: '+91 9876543213', loanType: 'LAP', loanAmount: 12000000, status: 'APPROVED' },
    { name: 'Vikram Singh', phone: '+91 9876543214', loanType: 'Car Loan', loanAmount: 1500000, status: 'REJECTED' },
    { name: 'Sunita Devi', phone: '+91 9876543215', loanType: 'Home Loan', loanAmount: 2500000, status: 'NEW' },
    { name: 'Anil Kapoor', phone: '+91 9876543216', loanType: 'Business Loan', loanAmount: 4000000, status: 'CONTACTED' },
    { name: 'Pooja Bhatt', phone: '+91 9876543217', loanType: 'Personal Loan', loanAmount: 500000, status: 'APPROVED' },
    { name: 'Ravi Teja', phone: '+91 9876543218', loanType: 'LAP', loanAmount: 8500000, status: 'IN_PROGRESS' },
    { name: 'Kiran Bedi', phone: '+91 9876543219', loanType: 'Home Loan', loanAmount: 6000000, status: 'PENDING_DOCS' },
    { name: 'Sanjay Dutt', phone: '+91 9876543220', loanType: 'Car Loan', loanAmount: 1200000, status: 'NEW' },
    { name: 'Alia Bhatt', phone: '+91 9876543221', loanType: 'Personal Loan', loanAmount: 800000, status: 'CONTACTED' },
    { name: 'Varun Dhawan', phone: '+91 9876543222', loanType: 'Business Loan', loanAmount: 5500000, status: 'APPROVED' },
    { name: 'Shraddha Kapoor', phone: '+91 9876543223', loanType: 'Home Loan', loanAmount: 3500000, status: 'REJECTED' },
    { name: 'Tiger Shroff', phone: '+91 9876543224', loanType: 'LAP', loanAmount: 9000000, status: 'IN_PROGRESS' },
  ];

  console.log('Inserting 15 dummy leads...');
  for (const lead of dummyLeads) {
    await prisma.lead.create({
      data: {
        userId: partnerUser.id,
        name: lead.name,
        phone: lead.phone,
        email: `${lead.name.split(' ')[0].toLowerCase()}@example.com`,
        loanType: lead.loanType,
        loanAmount: lead.loanAmount,
        status: lead.status,
      }
    });
  }

  // 5. Create Reward Profile for John
  await prisma.rewardProfile.upsert({
    where: { userId: partnerUser.id },
    update: {},
    create: {
      userId: partnerUser.id,
      rank: 12,
      totalPoints: 4500,
      badges: JSON.stringify(['Top Performer', 'Fast Starter']),
    },
  });

  // 6. Create Dummy Sub-Partners (John's Network)
  console.log('Creating Sub-Partners...');
  const subPartnerNames = ['Rahul Verma', 'Sneha Kapoor', 'Manish Tiwari'];
  for (const name of subPartnerNames) {
    const sp = await prisma.user.create({
      data: {
        name: name,
        email: `${name.replace(' ', '').toLowerCase()}@test.com`,
        phone: `+9199999${Math.floor(10000 + Math.random() * 90000)}`,
        role: 'PARTNER',
        city: 'Agra',
        referredById: partnerUser.id, // Linked to John
      },
    });
    
    // Give them some payouts so they have earnings
    await prisma.payout.create({
      data: { userId: sp.id, amount: Math.floor(Math.random() * 50000), status: 'Completed', date: new Date() }
    });
  }

  // 7. Create Other Top Partners (For Leaderboard)
  console.log('Creating Leaderboard Partners...');
  const topPartnerData = [
    { name: 'Karan Malhotra', points: 12500, tier: 'Platinum' },
    { name: 'Aditi Rao', points: 9800, tier: 'Gold' },
    { name: 'Suresh Menon', points: 8500, tier: 'Gold' },
  ];
  
  for (const tp of topPartnerData) {
    const user = await prisma.user.create({
      data: {
        name: tp.name,
        email: `${tp.name.replace(' ', '').toLowerCase()}@test.com`,
        phone: `+9188888${Math.floor(10000 + Math.random() * 90000)}`,
        role: 'PARTNER',
        city: 'Delhi',
      },
    });
    await prisma.partnerProfile.create({
      data: { userId: user.id, tier: tp.tier }
    });
    await prisma.rewardProfile.create({
      data: { userId: user.id, totalPoints: tp.points }
    });
  }

  console.log('Phase 2 Partner seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
