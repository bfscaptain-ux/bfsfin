const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const testimonials = [
  {
    name: "Amit Sharma",
    role: "Business Owner",
    location: "New Delhi",
    stars: 5,
    quote: "Got my business loan approved in just 3 days! The process was incredibly smooth.",
    detail: "I was looking to expand my business and approached them. They guided me throughout the process. Documentation was minimal, and the team was highly professional. Highly recommended for any business owner looking for quick funding.",
    loanAmount: "₹50 Lakhs",
    daysTaken: "3 Days",
    bankName: "HDFC Bank",
    rate: "10.5%",
    slug: "amit-sharma-business-loan",
  },
  {
    name: "Priya Patel",
    role: "Home Buyer",
    location: "Mumbai",
    stars: 5,
    quote: "Dream home achieved without any hassle. Zero hidden charges!",
    detail: "Buying a home is stressful, but their team made the loan approval process a breeze. They negotiated a great interest rate for me. Transparency at every step.",
    loanAmount: "₹1.2 Crores",
    daysTaken: "7 Days",
    bankName: "SBI",
    rate: "8.4%",
    slug: "priya-patel-home-loan",
  },
  {
    name: "Rahul Verma",
    role: "IT Professional",
    location: "Bangalore",
    stars: 4,
    quote: "Very fast personal loan processing. Got funds when I needed them most.",
    detail: "Faced a medical emergency and needed funds instantly. The personal loan was processed very fast. Good customer support and easy repayment options.",
    loanAmount: "₹5 Lakhs",
    daysTaken: "1 Day",
    bankName: "ICICI Bank",
    rate: "11.2%",
    slug: "rahul-verma-personal-loan",
  },
  {
    name: "Neha Gupta",
    role: "Doctor",
    location: "Pune",
    stars: 5,
    quote: "Best service for professional loans. Great rates and quick disbursal.",
    detail: "Setting up a new clinic required substantial capital. Their professional loan service was perfectly tailored to my needs. Excellent experience.",
    loanAmount: "₹25 Lakhs",
    daysTaken: "4 Days",
    bankName: "Axis Bank",
    rate: "10.0%",
    slug: "neha-gupta-professional-loan",
  },
  {
    name: "Suresh Kumar",
    role: "Farmer",
    location: "Punjab",
    stars: 5,
    quote: "Got an agriculture loan with great subsidy benefits. Very helpful staff.",
    detail: "They helped me understand all the government subsidies available for agriculture loans. The paperwork was handled efficiently.",
    loanAmount: "₹15 Lakhs",
    daysTaken: "10 Days",
    bankName: "PNB",
    rate: "7.0%",
    slug: "suresh-kumar-agri-loan",
  },
  {
    name: "Vikram Singh",
    role: "Real Estate Developer",
    location: "Gurgaon",
    stars: 5,
    quote: "Excellent project finance team. Secured funding for my new project seamlessly.",
    detail: "Project financing can be complex, but their team's expertise made it easy. They structured the loan perfectly aligning with our project cash flows.",
    loanAmount: "₹5 Crores",
    daysTaken: "20 Days",
    bankName: "Kotak Mahindra",
    rate: "9.5%",
    slug: "vikram-singh-project-finance",
  },
  {
    name: "Anita Desai",
    role: "Teacher",
    location: "Ahmedabad",
    stars: 5,
    quote: "Helped me secure an education loan for my son's overseas studies.",
    detail: "I was worried about the high costs of studying abroad. They found the perfect education loan with a moratorium period that gave us peace of mind.",
    loanAmount: "₹40 Lakhs",
    daysTaken: "15 Days",
    bankName: "Bank of Baroda",
    rate: "8.8%",
    slug: "anita-desai-education-loan",
  },
  {
    name: "Rajeev Menon",
    role: "Startup Founder",
    location: "Hyderabad",
    stars: 4,
    quote: "Got a working capital loan without putting up heavy collateral.",
    detail: "As a startup, collateral is always an issue. They helped us secure an unsecured working capital loan based on our strong cash flows.",
    loanAmount: "₹20 Lakhs",
    daysTaken: "5 Days",
    bankName: "Yes Bank",
    rate: "12.0%",
    slug: "rajeev-menon-working-capital",
  },
  {
    name: "Meera Reddy",
    role: "Freelancer",
    location: "Chennai",
    stars: 5,
    quote: "Finally found a place that understands freelancer income for car loans.",
    detail: "Most banks rejected me because I don't have standard salary slips. They looked at my IT returns and bank statements and approved my car loan easily.",
    loanAmount: "₹8 Lakhs",
    daysTaken: "2 Days",
    bankName: "HDFC Bank",
    rate: "9.0%",
    slug: "meera-reddy-car-loan",
  },
  {
    name: "Sanjay Joshi",
    role: "Retail Shop Owner",
    location: "Surat",
    stars: 5,
    quote: "Mudra loan processed smoothly. Helped me stock up for Diwali.",
    detail: "The Mudra loan process was explained clearly to me. Thanks to the timely funds, I could maximize my sales during the festive season.",
    loanAmount: "₹10 Lakhs",
    daysTaken: "8 Days",
    bankName: "Union Bank",
    rate: "8.5%",
    slug: "sanjay-joshi-mudra-loan",
  }
];

async function main() {
  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t
    });
  }
  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
