import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSupport from '@/components/FloatingSupport';
import MasterSeoSchema from '@/components/seo/MasterSeoSchema';
import Link from 'next/link';
import { 
  MapPin, Phone, Building2, ArrowRight, ShieldCheck, CheckCircle2, 
  Heart, Home, ChevronRight, User, Star, Map, Clock, FileCheck, 
  MessageCircle, HelpCircle, Landmark, Briefcase, RefreshCw, Calculator
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const cleanAreaName = (name: string) => {
  return name
    .replace(/^Home Loan & Balance Transfer in\s+/i, '')
    .replace(/^Home Loan in\s+/i, '')
    .replace(/^Loan Against Property \(LAP\) in\s+/i, '')
    .replace(/^Loan Against Property in\s+/i, '')
    .replace(/^Business Loan in\s+/i, '')
    .replace(/^Personal Loan in\s+/i, '')
    .replace(/^Home Loan Balance Transfer in\s+/i, '')
    .replace(/^Home Loan & Financial Advisory in\s+/i, '')
    .replace(/,\s*Agra$/i, '')
    .replace(/,\s*Uttar Pradesh$/i, '')
    .trim();
};

interface ParsedIntent {
  loanType: string;
  baseAreaSlug: string;
}

function parseAreaIntent(slug: string, citySlug: string): ParsedIntent {
  const s = slug.toLowerCase();
  if (s.startsWith('home-loan-balance-transfer-in-')) {
    return {
      loanType: 'Home Loan Balance Transfer',
      baseAreaSlug: s.replace('home-loan-balance-transfer-in-', '')
    };
  }
  if (s.startsWith('home-loan-in-')) {
    return {
      loanType: 'Home Loan',
      baseAreaSlug: s.replace('home-loan-in-', '')
    };
  }
  if (s.startsWith('loan-against-property-in-') || s.startsWith('lap-in-')) {
    return {
      loanType: 'Loan Against Property (LAP)',
      baseAreaSlug: s.replace(/^(loan-against-property-in-|lap-in-)/, '')
    };
  }
  if (s.startsWith('business-loan-in-')) {
    return {
      loanType: 'Business Loan',
      baseAreaSlug: s.replace('business-loan-in-', '')
    };
  }
  if (s.startsWith('personal-loan-in-')) {
    return {
      loanType: 'Personal Loan',
      baseAreaSlug: s.replace('personal-loan-in-', '')
    };
  }
  return {
    loanType: 'Home Loan & Financial Advisory',
    baseAreaSlug: s
  };
}

async function getLocalAreaData(citySlug: string, areaSlug: string) {
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'service-areas.json');
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const cities = JSON.parse(fileContents);
    
    const city = cities.find((c: any) => toSlug(c.name) === citySlug);
    if (!city) return null;

    const { loanType, baseAreaSlug } = parseAreaIntent(areaSlug, citySlug);

    // 1. Try finding in localAreas of this city
    let matchedArea = null;
    if (city.localAreas && city.localAreas.length > 0) {
      matchedArea = city.localAreas.find((a: any) => {
        const areaNameSlug = toSlug(cleanAreaName(a.name));
        const fullSlug = toSlug(a.name);
        return (
          areaNameSlug === baseAreaSlug ||
          fullSlug === areaSlug ||
          fullSlug === baseAreaSlug ||
          fullSlug.includes(baseAreaSlug) ||
          baseAreaSlug.includes(areaNameSlug)
        );
      });
    }

    if (matchedArea) {
      return { city, area: matchedArea, loanType };
    }

    // 2. Dynamic City Service Intent (Never 404)
    const cleanCitySlug = baseAreaSlug.replace(new RegExp(`-${citySlug}$`, 'i'), '');
    const areaName = cleanCitySlug
      ? cleanCitySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : city.name;

    const syntheticArea = {
      id: `${citySlug}-${toSlug(areaSlug)}`,
      name: `${loanType} in ${areaName}`,
      whyChooseUs: `Bhardwaj Financial Services provides doorstep document pickup, lowest starting interest rates from 7.15%*, and fast 5-day bank sanction across ${areaName} with direct PSU and private bank approvals.`,
      customerRelateText: `Working or residing in ${areaName}? We eliminate bank queues, branch visits, and legal verification delays completely.`,
      landmarkContext: `Serving all major commercial corridors, residential colonies, and industrial clusters across ${areaName}.`,
      localExpertName: 'Adv. Praveen Bhardwaj',
      localExpertPhone: '9286683232',
      successStoryName: `Client (${areaName})`,
      successStoryText: `Secured smooth sanction with lowest interest spread through Bhardwaj Financial Services desk in ${areaName}.`,
      statsCleared: '500+ Loans Sanctioned',
      statsTime: '48-72 Hours Approval',
      valueProps: [
        { title: 'Direct Bank Tie-ups', description: `We work directly with HDFC, ICICI, SBI, and PNB in ${city.name} for priority processing.` },
        { title: 'Local Doorstep Pickup', description: `Our field agents collect and verify documents directly from your home or office in ${areaName}.` },
        { title: 'Zero Brokerage Fees', description: `Direct accredited institutional channel partner with zero hidden commissions or upfront fees.` }
      ],
      keywords: [
        `${loanType} in ${areaName}`,
        `Best ${loanType} ${areaName}`,
        `Lowest Interest ${loanType} ${areaName}`,
        `Loan Consultant ${areaName}`,
        `Financial Advisor ${areaName}`
      ]
    };

    return { city, area: syntheticArea, loanType };
  } catch (e) {}
  return null;
}

export async function generateMetadata({ params }: { params: { city: string, area: string } }) {
  const data = await getLocalAreaData(params.city, params.area);
  const rawCity = data?.city.name || params.city.replace(/-/g, ' ');
  const rawArea = data?.area.name || params.area.replace(/-/g, ' ');
  const areaDisp = cleanAreaName(rawArea);
  const cityDisp = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
  const loanType = data?.loanType || 'Home Loan & Financial Advisory';

  const title = `Best ${loanType} in ${areaDisp}, ${cityDisp} | Starting 7.15%* ROI | Bhardwaj Finance`;
  const description = data?.area.whyChooseUs || `Apply for the lowest interest rate ${loanType} in ${areaDisp}, ${cityDisp}. Starting 7.15%* with direct bank approvals (SBI, HDFC, PNB, ICICI), zero brokerage, and doorstep document service. Phone: 9286-683-232.`;

  const keywords = (data?.area?.keywords && data.area.keywords.length > 0)
    ? data.area.keywords
    : [
        `${loanType} Provider ${areaDisp}`,
        `${loanType} ${areaDisp}`,
        `Best ${loanType} ${areaDisp}`,
        `Home Loan ${areaDisp}`,
        `Business Loan ${areaDisp}`,
        `Loan Against Property ${areaDisp}`,
        `Mortgage Loan ${areaDisp}`,
        `Finance Broker ${areaDisp}`,
        `Loan Consultant ${areaDisp}`,
        `Financial Advisor ${areaDisp}`,
        `Balance Transfer Loan ${areaDisp}`,
        `Near Me ${loanType} ${areaDisp}`,
        `Low Interest ${loanType} ${areaDisp}`,
        `Bhardwaj Financial Services ${areaDisp}`,
        `Bhardwaj Financial Services ${cityDisp}`
      ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://bfsfin.com/locations/${params.city}/${params.area}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bfsfin.com/locations/${params.city}/${params.area}`,
      siteName: "Bhardwaj Financial Services",
      locale: "en_IN",
      type: "website",
    },
    other: {
      "geo.region": "IN-UP",
      "geo.placename": `${areaDisp}, ${cityDisp}, Uttar Pradesh, India`,
      "geo.position": "27.199777;78.006699",
      "ICBM": "27.199777, 78.006699",
    }
  };
}

export default async function LocalAreaPage({ params }: { params: { city: string, area: string } }) {
  const data = await getLocalAreaData(params.city, params.area);
  
  const rawCity = data?.city.name || params.city.replace(/-/g, ' ');
  const rawArea = data?.area.name || params.area.replace(/-/g, ' ');
  const city = rawCity.charAt(0).toUpperCase() + rawCity.slice(1);
  const area = cleanAreaName(rawArea);
  const state = data?.city.state || "Uttar Pradesh";
  
  const whyChooseUs = data?.area.whyChooseUs || `We work directly with top bank branches in ${city} to get ${area} residents the best local branch approvals.`;
  const relateText = data?.area.customerRelateText || `Living in ${area} means you value peace of mind. Don't let endless bank trips ruin it. We bring the loan directly to your doorstep in ${area}.`;
  
  const landmarkContext = data?.area.landmarkContext;
  const localExpertName = data?.area.localExpertName;
  const localExpertPhone = data?.area.localExpertPhone;
  const successStoryName = data?.area.successStoryName;
  const successStoryText = data?.area.successStoryText;
  const statsCleared = data?.area.statsCleared || "500+";
  const statsTime = data?.area.statsTime || "48 Hours";
  
  const defaultProps = [
    { title: "Direct Bank Tie-ups", description: `We work directly with HDFC, ICICI, SBI, and PNB to get ${area} residents the absolute best local branch approvals.` },
    { title: "Local Doorstep Pickup", description: `Don't travel across ${city}. Our field agents will securely collect documents directly from your home or office in ${area}.` },
    { title: "Zero Brokerage Fees", description: `We are official direct channel partners. That means zero hidden commissions or upfront fees for our processing services in ${state}.` }
  ];
  const valueProps = data?.area.valueProps?.length >= 3 ? data?.area?.valueProps : defaultProps;
  const areaKeywords: string[] = data?.area?.keywords || [];
  const nearbyAreas = data?.city.localAreas?.filter((a: any) => toSlug(a.name) !== params.area && toSlug(cleanAreaName(a.name)) !== params.area).slice(0, 6) || [];

  const phoneSetting = await prisma.systemSetting.findUnique({ where: { key: 'whatsappPhone' } });
  const displayPhone = phoneSetting?.value || "9286683232";

  const loanType = data?.loanType || "Home Loan & Financial Advisory";

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Header />

      <MasterSeoSchema
        citySlug={params.city}
        cityName={city}
        stateName={state}
        subLocationSlug={params.area}
        subLocationTitle={`${loanType} in ${area}, ${city}`}
        areaName={area}
        loanType={loanType}
      />
      
      {/* LOCAL SEO HERO */}
      <section className="pt-24 pb-16 lg:pb-24 bg-emerald-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex text-xs font-bold text-emerald-400 mb-8 items-center gap-2 uppercase tracking-wider">
            <Link href="/" className="hover:text-white transition flex items-center gap-1"><Home className="w-3 h-3"/> Home</Link>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
            <Link href="/contact/locations" className="hover:text-white transition">Locations</Link>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
            <span className="text-emerald-200">{city}</span>
            <ChevronRight className="w-3 h-3 text-emerald-600" />
            <span className="text-white bg-emerald-800/50 px-2 py-0.5 rounded-md">{area}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full mb-6 uppercase tracking-widest shadow-lg">
                <MapPin className="w-4 h-4" /> Dedicated Local Service: {area}, {city}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Top {data?.loanType || 'Home Loan & Finance Consultant'} in <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">{area}.</span>
              </h1>
              
              <p className="text-emerald-100 mb-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Fastest Home Loan, Loan Against Property & Business Loan Approvals in {city}. Lowest interest rates starting 7.15%*, zero hidden brokerage, 100% digital process, and complete doorstep assistance in {area}.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/apply" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1">
                  Apply Online Now
                </Link>
                <a 
                  href={`https://wa.me/91${displayPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi BFS, I am looking for loan assistance in ${area}, ${city}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-emerald-900/50 hover:bg-emerald-800 text-white border border-emerald-500/50 font-bold rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-400" /> 
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* TRUST BADGES & LOCAL EXPERT */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/5 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-6 md:p-8">
                
                <div className="flex gap-4 mb-8">
                  <div className="flex-1 bg-emerald-900/40 rounded-2xl p-4 border border-emerald-500/20 text-center">
                    <FileCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-black text-white">{statsCleared}</p>
                    <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Files Cleared in {area}</p>
                  </div>
                  <div className="flex-1 bg-emerald-900/40 rounded-2xl p-4 border border-emerald-500/20 text-center">
                    <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-black text-white">{statsTime}</p>
                    <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Avg. Sanction Time</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Senior Advisory Desk</p>
                    <h4 className="text-lg font-black text-slate-900">{localExpertName || "Praveen Bhardwaj"}</h4>
                    <p className="text-sm text-slate-500 font-medium">Serving {area}, {city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL PRODUCTS & LOAN SERVICES GRID */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">Financial Services in {area}, {city}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">Direct institutional approvals from HDFC, SBI, ICICI, PNB & Bank of Baroda</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: `Home Loan in ${area}`,
                desc: "Rates from 7.15%* with 30-year repayment and up to 90% property valuation funding.",
                icon: Landmark,
                link: "/products/home-loan"
              },
              {
                title: `Business Loan in ${area}`,
                desc: "Collateral-free loans up to ₹1 Crore for local traders, manufacturers, and MSMEs.",
                icon: Briefcase,
                link: "/products/business-loan"
              },
              {
                title: `Loan Against Property in ${area}`,
                desc: "Unlock high-value liquidity up to ₹15 Crores at lowest mortgage rates.",
                icon: Building2,
                link: "/products/loan-against-property"
              },
              {
                title: `Balance Transfer in ${area}`,
                desc: "Switch your existing high-cost loan and slash monthly EMI by up to 35%.",
                icon: RefreshCw,
                link: "/tools/balance-transfer"
              }
            ].map((prod, idx) => {
              const IconComp = prod.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{prod.title}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{prod.desc}</p>
                  <Link href={prod.link} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700">
                    <span>Learn More & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EMOTIONAL RELATE & LANDMARK SECTION */}
      <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-100">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">We Understand {area}.</h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-8">
                "{relateText}"
              </p>
              
              {landmarkContext && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                  <p className="text-emerald-900 font-medium leading-relaxed">
                    {landmarkContext}
                  </p>
                </div>
              )}
            </div>

            {/* HYPER-LOCAL SUCCESS STORY */}
            {successStoryName && successStoryText && (
              <div className="flex-1 w-full">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-10 relative shadow-2xl">
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <h4 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-6">A {area} Success Story</h4>
                  <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8 italic">
                    "{successStoryText}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{successStoryName}</p>
                      <p className="text-sm text-slate-400">{area} Resident</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DYNAMIC VALUE PROPS */}
      <section className="py-20 bg-slate-50 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Why Choose Us in {area}?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              {whyChooseUs}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueProps.slice(0,3).map((prop: any, idx: number) => {
              const icons = [Building2, CheckCircle2, ShieldCheck];
              const Icon = icons[idx % icons.length];
              return (
                <div key={idx} className="p-8 bg-white border border-slate-200 rounded-3xl hover:shadow-xl transition-all duration-300 hover:border-emerald-300 group">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{prop.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{prop.description}</p>
                </div>
              );
            })}
          </div>

          {/* LOCAL FAQS ACCORDION */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-3">
                <HelpCircle className="w-3.5 h-3.5" /> Frequent Questions
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Questions about Loans in {area}</h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: `How fast can I get a Home Loan or Business Loan in ${area}, ${city}?`,
                  a: `With Bhardwaj Financial Services in ${area}, in-principle loan sanction is delivered within 48 hours to 5 working days with doorstep document verification.`
                },
                {
                  q: `Which bank offers the lowest home loan interest rate in ${area}?`,
                  a: `BFS works directly with top public & private bank branches (SBI, HDFC, PNB, ICICI, Bank of Baroda) providing special discounted rates starting from 7.15%* with zero processing fees.`
                },
                {
                  q: `Does Bhardwaj Finance provide doorstep document collection in ${area}?`,
                  a: `Yes! Our dedicated local field agents collect loan documents directly from your home or office anywhere across ${area} and ${city}.`
                },
                {
                  q: `Can I transfer my existing high-interest home loan to lower rates in ${area}?`,
                  a: `Yes, our Home Loan Balance Transfer service allows you to switch your loan from any NBFC or bank to SBI/HDFC/PNB at starting rates of 7.15%* plus extra top-up funding.`
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                  <h4 className="font-bold text-slate-900 text-base mb-2">{faq.q}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          
          {/* 360 KEYWORDS PILL SECTION */}
          {areaKeywords.length > 0 && (
            <div className="mt-16 pt-10 border-t border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">Popular Financial Searches in {area}, {city}</h3>
              <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
                {areaKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-full shadow-2xs hover:border-emerald-300 hover:text-emerald-700 transition"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* NEARBY AREAS NAVIGATION */}
          {nearbyAreas.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-6 text-center">Explore Other Service Areas in {city}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyAreas.map((nearArea: any, idx: number) => {
                  const cleanedNearArea = cleanAreaName(nearArea.name);
                  return (
                    <Link 
                      key={idx} 
                      href={`/locations/${params.city}/${toSlug(nearArea.name)}`}
                      className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-bold transition-all shadow-sm"
                    >
                      <MapPin className="w-4 h-4 text-emerald-600" /> {cleanedNearArea}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-emerald-900 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to secure your loan in {area}?</h2>
          <p className="text-emerald-200 mb-8 max-w-xl mx-auto">Talk to our local loan advisor in {area} today for lowest interest rate guaranteed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply" className="inline-flex px-10 py-5 bg-white text-emerald-900 hover:bg-emerald-50 font-black rounded-2xl shadow-2xl transition-all items-center justify-center gap-3 text-lg transform hover:-translate-y-1">
              Start Online Application <ArrowRight className="w-6 h-6" />
            </Link>
            <Link href="/calculator" className="inline-flex px-8 py-5 bg-emerald-950/80 hover:bg-emerald-950 text-white font-bold rounded-2xl border border-emerald-700/60 transition-all items-center justify-center gap-2 text-base">
              <Calculator className="w-5 h-5 text-emerald-400" /> Calculate Your EMI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
