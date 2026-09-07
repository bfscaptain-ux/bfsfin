const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function seed() {
  await prisma.review.createMany({
    data: [
      { name: 'Rahul Sharma', location: 'Agra', rating: 5, text: 'Got my PNB home loan sanctioned in exactly 4 days. BFS handled all the paperwork and legal checks effortlessly. Highly recommended!' },
      { name: 'Sneha Mishra', location: 'Noida', rating: 5, text: 'I transferred my existing loan through BFS and reduced my interest rate by a massive margin. Their team is highly professional and responsive.' },
      { name: 'Amit Kumar', location: 'Mathura', rating: 5, text: 'The zero hidden fee promise is real! Everything was transparent from day one till the final disbursal. Great service by BFS team.' },
      { name: 'Priya Singh', location: 'Delhi', rating: 4, text: 'Very helpful staff. They guided me through the entire LAP process. Would definitely recommend them to friends and family.' },
      { name: 'Vikram Mehta', location: 'Gurgaon', rating: 5, text: 'Fastest loan processing I have ever seen. They collected documents from my home and approved it in just a few days.' }
    ]
  });
  console.log('Seeded reviews');
}
seed().catch(console.error).finally(() => prisma.$disconnect());
