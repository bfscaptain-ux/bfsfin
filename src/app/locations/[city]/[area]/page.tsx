import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingSupport from '@/components/FloatingSupport';
import Link from 'next/link';
import { MapPin, Phone, Building2, ArrowRight, ShieldCheck, CheckCircle2, Heart, Home, ChevronRight, User, Star, Map, Clock, FileCheck } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

const toSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function getLocalAreaData(citySlug: string, areaSlug: string) {
  const dataFilePath = path.join(process.cwd(), 'src', 'data', 'service-areas.json');
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const cities = JSON.parse(fileContents);
    
    for (const city of cities) {
      if (toSlug(city.name) === citySlug) {
        if (city.localAreas) {
          const matchedArea = city.localAreas.find((a: any) => toSlug(a.name) === areaSlug);
          if (matchedArea) {
            return { city, area: matchedArea };
          }
        }
      }
    }
  } catch (e) {}
  return null;
}

export async function generateMetadata({ params }: { params: { city: string, area: string } }) {
  const data = await getLocalAreaData(params.city, params.area);
  const cityDisp = data?.city.name || params.city.replace(/-/g, ' ');
  const areaDisp = data?.area.name || params.area.replace(/-/g, ' ');
  
  return {
    title: `Fastest Home Loans in ${areaDisp}, ${cityDisp} | Bhardwaj Finance`,
    description: data?.area.whyChooseUs || `Looking for the best home loan rates in ${areaDisp}, ${cityDisp}? Bhardwaj Finance offers fast approvals, zero processing fees, and doorstep document pickup locally in ${areaDisp}.`,
  };
}

export default async function LocalAreaPage({ params }: { params: { city: string, area: string } }) {
  const data = await getLocalAreaData(params.city, params.area);
  
  const city = data?.city.name || params.city.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const area = data?.area.name || params.area.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const state = data?.city.state || "Uttar Pradesh";
  
  const whyChooseUs = data?.area.whyChooseUs || `We work directly with top bank branches in ${city} to get ${area} residents the best local branch approvals.`;
  const relateText = data?.area.customerRelateText || `Living in ${area} means you value peace of mind. Don't let endless bank trips ruin it. We bring the loan directly to your doorstep in ${area}.`;
  
  // New Hyper-Local Trust Features
  const landmarkContext = data?.area.landmarkContext;
  const localExpertName = data?.area.localExpertName;
  const localExpertPhone = data?.area.localExpertPhone;
  const successStoryName = data?.area.successStoryName;
  const successStoryText = data?.area.successStoryText;
  const statsCleared = data?.area.statsCleared;
  const statsTime = data?.area.statsTime;
  
  const defaultProps = [
    { title: "Direct Bank Tie-ups", description: `We work directly with HDFC, ICICI, and PNB to get ${area} residents the absolute best local branch approvals.` },
    { title: "Local Doorstep Pickup", description: `Don't travel across ${city}. Our field agents will securely collect documents directly from your home or office in ${area}.` },
    { title: "Zero Brokerage Fees", description: `We are official channel partners. That means zero hidden commissions for our processing services in ${state}.` }
  ];
  const valueProps = data?.area.valueProps?.length >= 3 ? data?.area?.valueProps : defaultProps;
  const nearbyAreas = data?.city.localAreas?.filter((a: any) => toSlug(a.name) !== params.area).slice(0, 4) || [];

  const phoneSetting = await prisma.systemSetting.findUnique({ where: { key: 'contactPhone' } });
  const fallbackPhone = phoneSetting?.value || "+91 7900-979-001";
  const displayPhone = localExpertPhone || fallbackPhone;

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-500/30 flex flex-col">
      <Header />
      
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
                Your Local Financial Partner in <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">{area}.</span>
              </h1>
              
              <p className="text-emerald-100 mb-8 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Fastest Home Loan Approvals across {city}. No hidden brokerage, 100% digital process, and complete doorstep assistance right here in {area}.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/appointment" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-1">
                  Apply Online Now
                </Link>
                <a href={`tel:${displayPhone.replace(/\D/g, '')}`} className="px-8 py-4 bg-emerald-900/50 hover:bg-emerald-800 text-white border border-emerald-500/50 font-bold rounded-xl transition-all flex items-center gap-2 backdrop-blur-sm">
                  <Phone className="w-5 h-5 text-emerald-400" /> 
                  {localExpertName ? `Call ${localExpertName} directly` : `Talk to our ${city} Expert`}
                </a>
              </div>
            </div>

            {/* TRUST BADGES & LOCAL EXPERT */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/5 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-6 md:p-8">
                
                {statsCleared && statsTime && (
                  <div className="flex gap-4 mb-8">
                    <div className="flex-1 bg-emerald-900/40 rounded-2xl p-4 border border-emerald-500/20 text-center">
                      <FileCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                      <p className="text-2xl font-black text-white">{statsCleared}</p>
                      <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Files Cleared in {area}</p>
                    </div>
                    <div className="flex-1 bg-emerald-900/40 rounded-2xl p-4 border border-emerald-500/20 text-center">
                      <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                      <p className="text-2xl font-black text-white">{statsTime}</p>
                      <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">Avg. Approval Time</p>
                    </div>
                  </div>
                )}

                {localExpertName && (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl">
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <User className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Your Local Expert</p>
                      <h4 className="text-lg font-black text-slate-900">{localExpertName}</h4>
                      <p className="text-sm text-slate-500 font-medium">Serving {area}, {city}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL RELATE & LANDMARK SECTION */}
      <section className="py-20 bg-white border-b border-slate-100 relative overflow-hidden">
        {/* Subtle Map Background Pattern */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none">
          <Map className="w-[600px] h-[600px] text-slate-900" />
        </div>

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

          {/* NEARBY AREAS NAVIGATION */}
          {nearbyAreas.length > 0 && (
            <div className="mt-24 pt-12 border-t border-slate-200">
              <h3 className="text-xl font-black text-slate-900 mb-6 text-center">Explore Other Service Areas in {city}</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {nearbyAreas.map((nearArea: any, idx: number) => (
                  <Link 
                    key={idx} 
                    href={`/locations/${params.city}/${toSlug(nearArea.name)}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 font-bold transition-all shadow-sm"
                  >
                    <MapPin className="w-4 h-4" /> {nearArea.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-emerald-900 relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8">Ready to secure your loan in {area}?</h2>
          <Link href="/contact" className="inline-flex px-10 py-5 bg-white text-emerald-900 hover:bg-emerald-50 font-black rounded-2xl shadow-2xl transition-all items-center gap-3 text-lg transform hover:-translate-y-1">
            Start Your Application <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      <Footer />
      <FloatingSupport />
    </div>
  );
}

