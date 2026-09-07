const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.adminUser.create({ data: { username: 'admin', password: 'password123' } }).catch(() => console.log('Admin exists'));
  await prisma.heroImage.createMany({
    data: [
      { pageId: 'home', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { pageId: 'home-loan', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { pageId: 'lap', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
      { pageId: 'business-loan', imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }
    ]
  }).catch(() => console.log('Images exist'));
}
main().then(() => prisma.$disconnect());
