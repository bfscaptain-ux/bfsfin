import { Metadata } from "next";
import Link from "next/link";
import { Check, CreditCard, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

// Mock Database
const CARDS_DB = {
  "hdfc-millennia": {
    title: "HDFC Millennia Credit Card",
    description: "A cashback credit card that rewards you for all your online spends.",
    image: "/images/cards/hdfc-millennia.png",
    joiningFee: "₹1,000",
    annualFee: "₹1,000",
    benefits: [
      "5% Cashback on Amazon, BookMyShow, Cult.fit, Flipkart, Myntra, Sony LIV, Swiggy, Tata CLiQ, Uber and Zomato",
      "1% cashback on all other spends",
      "8 Complimentary Domestic Airport Lounge access annually"
    ],
    rating: "4.8"
  },
  "sbi-simplyclick": {
    title: "SBI SimplyCLICK Credit Card",
    description: "Designed for online shoppers with high rewards on partner sites.",
    image: "/images/cards/sbi-simplyclick.png",
    joiningFee: "₹499",
    annualFee: "₹499",
    benefits: [
      "10X Reward Points on online spends with exclusive partners",
      "5X Reward Points on all other online spends",
      "E-voucher worth ₹500 on joining"
    ],
    rating: "4.6"
  },
  "icici-amazon-pay": {
    title: "Amazon Pay ICICI Bank Credit Card",
    description: "Lifetime free credit card with unlimited cashback on Amazon.",
    image: "/images/cards/icici-amazon.png",
    joiningFee: "Nil",
    annualFee: "Nil",
    benefits: [
      "5% Cashback on Amazon for Prime members",
      "3% Cashback on Amazon for Non-prime members",
      "2% Cashback on 100+ partner merchants",
      "1% Cashback on all other payments"
    ],
    rating: "4.9"
  },
  "axis-flipkart": {
    title: "Flipkart Axis Bank Credit Card",
    description: "One of the best cashback cards for online shopping, especially on Flipkart and Myntra.",
    image: "/images/cards/axis-flipkart.png",
    joiningFee: "₹500",
    annualFee: "₹500",
    benefits: [
      "5% unlimited cashback on Flipkart",
      "4% cashback on Cleartrip, Cult.fit, PVR, Swiggy, and Uber",
      "1.5% unlimited cashback on all other spends",
      "4 complimentary domestic lounge visits per year"
    ],
    rating: "4.8"
  },
  "axis-ace": {
    title: "Axis Bank ACE Credit Card",
    description: "Earn flat 2% cashback on all spends, with no upper limit.",
    image: "/images/cards/axis-ace.png",
    joiningFee: "₹499",
    annualFee: "₹499",
    benefits: [
      "5% Cashback on bill payments via Google Pay",
      "4% Cashback on Swiggy, Zomato, and Ola",
      "2% flat Cashback on all other spends",
      "4 Complimentary Domestic Lounge access annually"
    ],
    rating: "4.7"
  }
};

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const card = CARDS_DB[params.slug as keyof typeof CARDS_DB];
  if (!card) {
    return {
      title: "Card Not Found",
    };
  }
  return {
    title: `${card.title} | Apply Online`,
    description: card.description,
  };
}

export default function CreditCardPage({ params }: Props) {
  const card = CARDS_DB[params.slug as keyof typeof CARDS_DB];

  if (!card) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": card.title,
    "description": card.description,
    "image": card.image,
    "offers": {
      "@type": "Offer",
      "price": card.annualFee === "Nil" ? "0" : card.annualFee.replace(/[^0-9]/g, ''),
      "priceCurrency": "INR"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Hero Section */}
        <div className="bg-blue-900 text-white py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center space-x-2 text-sm text-blue-200 mb-4">
                  <Link href="/products/credit-cards" className="hover:text-white transition-colors">Credit Cards</Link>
                  <ChevronRight className="w-4 h-4" />
                  <span>{card.title}</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                  {card.title}
                </h1>
                <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
                  {card.description}
                </p>
                
                <div className="pt-4">
                  <Link 
                    href="/apply"
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-blue-900 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Apply Now
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-64 h-40 bg-gradient-to-br from-gray-200 to-gray-400 rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                   {/* Fallback placeholder if image fails/isn't there */}
                   <CreditCard className="w-16 h-16 text-gray-500 opacity-50" />
                   <div className="absolute inset-0 bg-white/10"></div>
                   <div className="absolute bottom-4 left-4 text-gray-700 font-semibold tracking-widest">{card.title.split(' ')[0]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 max-w-6xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Details */}
            <div className="md:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h2>
                <ul className="space-y-4">
                  {card.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Check className="w-5 h-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-gray-700">{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Fees & Charges</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-gray-600">Joining Fee</span>
                    <span className="font-semibold text-gray-900">{card.joiningFee}</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                    <span className="text-gray-600">Annual Fee</span>
                    <span className="font-semibold text-gray-900">{card.annualFee}</span>
                  </div>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  *Taxes as applicable. Refer to MITC for detailed charges.
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Ready to apply?</h3>
                <p className="text-blue-800 text-sm mb-4">Complete your application in just 3 minutes with Aadhaar e-KYC.</p>
                <Link 
                  href={`/apply?product=Credit%20Card&subType=${encodeURIComponent(card.title)}`}
                  className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Application
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
