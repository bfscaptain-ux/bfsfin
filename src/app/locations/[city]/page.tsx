import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSupport from '@/components/FloatingSupport';
import Link from 'next/link';
import { 
  MapPin, Phone, Building2, ArrowRight, ShieldCheck, CheckCircle2, 
  Home, ChevronRight, User, Star, MessageCircle, HelpCircle, Landmark, 
  Briefcase, RefreshCw, Calculator, FileCheck, Clock
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const cleanAreaName = (name: string) => {
  return name
    .replace(/^Home Loan & Balance Transfer in\s+/i, '')
    .replace(/,\s*Agra$/i, '')
    .trim();
};

async function getCityData(citySlug: string) {
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'service-areas.json');
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const cities = JSON.parse(fileContents);
    for (const city of cities) {
      if (toSlug(city.name) === citySlug) {
        return city;
      }
    }
  } catch (e) {}
  return null;
}

export async function generateMetadata({ params }: { params: { city: string } }) {
  const city = await getCityData(params.city);
  const rawCity = city?.name || params.city.replace(/-/g, ' ');
  const cityDisp = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);

  const title = `Best Home Loan, Mortgage & Finance Broker in ${cityDisp} | Bhardwaj Finance`;
  const description = city?.description || `Looking for top home loans, business loans, or loan against property in ${cityDisp}? Get lowest interest rates starting 7.15%*, zero brokerage, 48-hr fast approval, and doorstep document pickup. Phone: 9286-683-232.`;

  const keywords = city?.cityKeywords && city.cityKeywords.length > 0 
    ? city.cityKeywords 
    : [
        `Home Loan Provider ${cityDisp}`,
        `Home Loan ${cityDisp}`,
        `Personal Loan ${cityDisp}`,
        `Business Loan ${cityDisp}`,
        `Loan Against Property ${cityDisp}`,
        `Mortgage Loan ${cityDisp}`,
        `Finance Broker ${cityDisp}`,
        `Mortgage Broker ${cityDisp}`,
        `Mortgage Lender ${cityDisp}`,
        `Financial Planner ${cityDisp}`,
        `Financial Advisor ${cityDisp}`,
        `Loan Agency ${cityDisp}`,
        `Loan Consultant ${cityDisp}`,
        `Finance Consultant ${cityDisp}`,
        `Balance Transfer Loan ${cityDisp}`,
        `Top Up Loan ${cityDisp}`,
        `Near Me Home Loan ${cityDisp}`,
        `Best Home Loan ${cityDisp}`,
        `Low Interest Home Loan ${cityDisp}`,
        `Quick Approval Home Loan ${cityDisp}`,
        `Bhardwaj Financial Services ${cityDisp}`
      ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://bfsfin.com/locations/${params.city}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bfsfin.com/locations/${params.city}`,
      siteName: "Bhardwaj Financial Services",
      locale: "en_IN",
      type: "website",
    },
    other: {
      "geo.region": "IN-UP",
      "geo.placename": `${cityDisp}, Uttar Pradesh, India`,
      "geo.position": "27.1983;78.0069",
      "ICBM": "27.1983, 78.0069",
    }
  };
}

export default async function CityLocationPage({ params }: { params: { city: string } }) {
  const city = await getCityData(params.city);
  const rawCity = city?.name || params.city.replace(/-/g, ' ');
  const cityDisp = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
  const state = city?.state || "Uttar Pradesh";
  const localAreas = city?.localAreas || [];
  const cityKeywords: string[] = city?.cityKeywords || [];

  const phoneSetting = await prisma.systemSetting.findUnique({ where: { key: 'whatsappPhone' } });
  const displayPhone = phoneSetting?.value || "9286683232";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["FinancialService", "LocalBusiness"],
        "@id": `https://bfsfin.com/locations/${params.city}#localbusiness`,
        "name": `Bhardwaj Financial Services - ${cityDisp} Headquarters`,
        "url": `https://bfsfin.com/locations/${params.city}`,
        "telephone": "+91-9286683232",
        "priceRange": "₹₹₹",
        "image": "https://bfsfin.com/hero_image.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "C-11, Cloth Market, Sanjay Place",
          "addressLocality": cityDisp,
          "addressRegion": state,
          "postalCode": "282002",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 27.1983,
          "longitude": 78.0069
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "19:00"
          }
        ],
        "areaServed": [
          { "@type": "City", "name": cityDisp },
          { "@type": "AdministrativeArea", "name": state }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "555"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://bfsfin.com/locations/${params.city}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bfsfin.com" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://bfsfin.com/contact/locations" },
          { "@type": "ListItem", "position": 3, "name": cityDisp, "item": `https://bfsfin.com/locations/${params.city}` }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `https://bfsfin.com/locations/${params.city}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Who is the best home loan and mortgage broker in ${cityDisp}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Bhardwaj Financial Services is ${cityDisp}'s #1 rated financial advisor and loan consultancy with direct tie-ups with SBI, HDFC, ICICI, PNB, and Bank of Baroda.`
            }
          },
          {
            "@type": "Question",
            "name": `What is the starting interest rate for home loans in ${cityDisp}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Home loan interest rates start from 7.15%* per annum with zero processing fee and doorstep document pickup across all areas in ${cityDisp}.`
            }
          },
          {
            "@type": "Question",
            "name": `Can I get collateral-free business loans in ${cityDisp}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, BFS provides collateral-free MSME and unsecured business loans up to ₹1 Crore in ${cityDisp} with fast 48-hour approvals.`
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="pt-24 pb-16 lg:pb-24 bg-emerald-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex text-xs font-bold text-emerald-400 mb-8 items-center gap-2 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition flex items-center gap-1"><Home className="w-3 h-3"/> Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
            <Link href="/contact/locations" className="hover:text-white transition">Locations</Link>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
            <span className="text-white bg-emerald-800/50 px-2 py-0.5 rounded-md">{cityDisp}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full mb-6 uppercase tracking-widest shadow-lg">
              <MapPin className="w-4 h-4" /> Official City Hub: {cityDisp}, {state}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Premier Loan Agency & Finance Consultant in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">{cityDisp}.</span>
            </h1>

            <p className="text-emerald-100 mb-8 text-lg sm:text-xl leading-relaxed">
              Direct institutional approvals from HDFC, SBI, ICICI, PNB & Bank of Baroda. Lowest interest rates starting 7.15%*, zero brokerage, 100% digital sanction, and doorstep service across all localities in {cityDisp}.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/apply" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1 text-center">
                Apply for Loan Now
              </Link>
              <a 
                href={`https://wa.me/91${displayPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi BFS, I am looking for loan assistance in ${cityDisp}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-900/50 hover:bg-emerald-800 text-white border border-emerald-500/50 font-bold rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" /> 
                <span>WhatsApp Advisor Desk</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ALL LOCAL AREAS IN CITY */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Select Your Local Area in {cityDisp}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              We provide 15-minute doorstep document pickup and local branch processing across all neighborhoods of {cityDisp}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {localAreas.map((area: any, idx: number) => {
              const cleanedName = cleanAreaName(area.name);
              const slug = toSlug(area.name);
              return (
                <Link
                  key={idx}
                  href={`/locations/${params.city}/${slug}`}
                  className="group p-5 bg-slate-50 hover:bg-emerald-50/60 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between shadow-xs hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 flex items-center justify-center transition-colors shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-950 transition-colors">
                        {cleanedName}
                      </h3>
                      <p className="text-[11px] text-slate-500">Fast Doorstep Sanction</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPULAR SEARCHES / KEYWORDS CLOUD */}
      {cityKeywords.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Popular Financial Queries in {cityDisp}</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
              {cityKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-full shadow-2xs hover:border-emerald-300 hover:text-emerald-700 transition"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CORE FINANCIAL PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Complete Loan Portfolio in {cityDisp}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">Direct institutional approvals with zero broker intervention</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Home Loans", rate: "From 7.15%*", desc: "Up to 90% property funding with 30-year repayment tenure.", link: "/products/home-loan", icon: Landmark },
              { title: "Business Loans", rate: "Collateral-Free", desc: "Up to ₹1 Crore for traders, manufacturers & service MSMEs.", link: "/products/business-loan", icon: Briefcase },
              { title: "Loan Against Property", rate: "From 7.50%*", desc: "Unlock liquidity up to ₹15 Crores against residential/commercial units.", link: "/products/loan-against-property", icon: Building2 },
              { title: "Balance Transfer", rate: "Save 35% EMI", desc: "Switch high-interest loans to lower bank rates with extra top-up.", link: "/tools/balance-transfer", icon: RefreshCw },
            ].map((prod, idx) => {
              const IconComp = prod.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-700 mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{prod.title}</h3>
                    <p className="text-xs font-black text-emerald-600 mb-3">{prod.rate}</p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">{prod.desc}</p>
                  </div>
                  <Link href={prod.link} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-600 transition">
                    <span>Explore Rates & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
