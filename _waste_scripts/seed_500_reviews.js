const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const firstNames = ["Rahul", "Amit", "Sneha", "Priya", "Vikram", "Neha", "Rohan", "Anjali", "Suresh", "Kavita", "Mohit", "Pooja", "Deepak", "Aarti", "Manish", "Sunita", "Gaurav", "Divya", "Sanjay", "Ritu", "Rajesh", "Meera", "Ajay", "Swati", "Nitin", "Kiran", "Vijay", "Shikha", "Ashish", "Jyoti", "Kapil", "Reena", "Tarun", "Payal", "Vikas", "Geeta", "Yogesh", "Preeti", "Ravi", "Sarita", "Arun", "Seema", "Manoj", "Anu", "Anil", "Bhavna", "Sunil", "Mamta", "Rajeev", "Rashmi"];
const lastNames = ["Sharma", "Singh", "Kumar", "Gupta", "Mishra", "Verma", "Tiwari", "Yadav", "Chauhan", "Bhardwaj", "Pandey", "Rajput", "Jain", "Agarwal", "Dixit", "Dubey", "Garg", "Srivastava", "Tripathi", "Pathak", "Chaudhary", "Tyagi", "Saxena", "Bhatia", "Goyal", "Tomar", "Saini", "Rathore", "Upadhyay", "Kushwaha"];
const locations = ["Agra", "Mathura", "Noida", "Delhi", "Gurgaon", "Aligarh", "Firozabad", "Hathras", "Tundla", "Gwalior", "Bharatpur", "Jaipur", "Lucknow", "Kanpur", "Ghaziabad", "Faridabad", "Meerut", "Vrindavan"];

const templates = [
  "Got my {loanType} sanctioned in exactly {days} days. BFS handled all the paperwork and legal checks effortlessly. Highly recommended!",
  "I transferred my existing loan through BFS and reduced my interest rate by a massive margin. Their team is highly professional and responsive.",
  "The zero hidden fee promise is real! Everything was transparent from day one till the final disbursal for my {loanType}. Great service by BFS team.",
  "Very helpful staff. They guided me through the entire {loanType} process. Would definitely recommend them to friends and family in {location}.",
  "Fastest loan processing I have ever seen. They collected documents from my home and approved it in just a few days.",
  "Bhardwaj Financial Services is the best loan consultant in {location}. They got me the lowest interest rate for my {loanType}.",
  "I was struggling to get a {loanType} due to some technical issues in my property papers, but the legal team at BFS sorted it out smoothly.",
  "Excellent service! The team was available on WhatsApp to answer all my queries regarding the {loanType}. Fully satisfied.",
  "Applied for a {loanType} and got it approved from PNB without visiting the branch even once. 100% digital and transparent.",
  "If you need a {loanType} in {location}, don't look anywhere else. Vineeta ma'am and her team are doing a wonderful job.",
  "My {loanType} was stuck with another agent for months. BFS cleared it in {days} days. Simply amazing speed and dedication.",
  "I highly recommend Bhardwaj Finance for any {loanType} needs. They have great tie-ups with top banks like HDFC and SBI.",
  "Securing a {loanType} was a breeze with BFS. They are genuine, RBI compliant, and charge zero processing fees upfront.",
  "The best part about BFS is their doorstep service. I didn't have to leave my office to get my {loanType} processed.",
  "Thank you BFS team for helping us buy our dream home. The {loanType} process was completely hassle-free."
];

const loanTypes = ["Home Loan", "Loan Against Property", "Balance Transfer", "Business Loan", "Construction Loan", "Plot Purchase Loan", "Personal Loan", "MSME Loan"];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateReview() {
  const name = `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
  const location = getRandomItem(locations);
  const loanType = getRandomItem(loanTypes);
  const days = Math.floor(Math.random() * 5) + 3; // 3 to 7 days
  
  let text = getRandomItem(templates)
    .replace(/{loanType}/g, loanType)
    .replace(/{location}/g, location)
    .replace(/{days}/g, days);
    
  // 90% 5-star, 10% 4-star
  const rating = Math.random() > 0.1 ? 5 : 4;
  
  // Random past date within the last 2 years
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 700));

  return {
    name,
    location,
    rating,
    text,
    status: 'APPROVED',
    createdAt: pastDate
  };
}

async function seed() {
  const reviews = [];
  for (let i = 0; i < 550; i++) {
    reviews.push(generateReview());
  }
  
  // Sort by date to make it look realistic when paginating (newest first)
  reviews.sort((a, b) => b.createdAt - a.createdAt);

  console.log(`Generating ${reviews.length} reviews...`);
  
  try {
    // We can use createMany for bulk insert
    const result = await prisma.review.createMany({
      data: reviews
    });
    console.log(`Successfully inserted ${result.count} reviews!`);
  } catch (error) {
    console.error("Error inserting reviews:", error);
  }
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
