const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Synchronizing BFS Compliance & Phone Standards...');

  const updates = [
    { key: 'contactPhone', value: '+91 9286-683-232' },
    { key: 'salesPhone', value: '+91 9286-683-232' },
    { key: 'whatsappPhone', value: '919286683232' },
    { key: 'heroBullet1', value: 'Lowest Institutional Rates Starting from 7.15%* p.a.' },
    { key: 'tickerText', value: '⚡ Express Home Loan Processing in Agra (3-5 Days TAT*)' },
    { key: 'heroTitlePart2', value: 'Fast-Track Sanction in 5 Days*.' }
  ];

  for (const item of updates) {
    await prisma.systemSetting.upsert({
      where: { key: item.key },
      update: { value: item.value },
      create: { key: item.key, value: item.value }
    });
    console.log(`Updated setting: ${item.key} -> ${item.value}`);
  }

  console.log('✅ Compliance settings successfully synchronized.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
