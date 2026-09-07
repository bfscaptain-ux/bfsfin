import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, CheckCircle2, ArrowRight, HeartPulse, Activity, Umbrella, Car, ShieldAlert, Home, Briefcase, ChevronRight, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock Database
const insuranceProducts = {
  'term-life': {
    title: 'Term Life Insurance',
    description: 'Secure your family\'s future with our comprehensive term life insurance. Get high coverage at affordable premiums.',
    benefits: ['High coverage amount up to ₹2 Crores', 'Affordable premiums starting at ₹499/mo', 'Tax benefits under Section 80C', 'Return of premium options available'],
    coverageDetails: 'Provides coverage up to age 85. Death benefit paid as a lump sum or monthly income to dependents.',
    icon: ShieldAlert,
    theme: 'from-emerald-600 to-teal-800'
  },
  'health-insurance': {
    title: 'Health Insurance',
    description: 'Comprehensive health coverage for you and your family to tackle rising medical costs with zero hassle.',
    benefits: ['Cashless treatment at 10,000+ hospitals', 'Pre and post hospitalization cover', 'No room rent capping', 'Free annual health checkups'],
    coverageDetails: 'Covers medical expenses, day care procedures, ambulance charges, and critical illnesses.',
    icon: Activity,
    theme: 'from-rose-500 to-red-700'
  },
  'family-floater': {
    title: 'Family Floater Plan',
    description: 'A single, powerful policy to cover the health insurance needs of your entire family under one umbrella.',
    benefits: ['Cover for all family members under one premium', 'Maternity and newborn baby benefits', 'Cumulative bonus for claim-free years', 'Restoration of sum insured'],
    coverageDetails: 'Sum insured floats among family members. Includes spouse, dependent children, and parents.',
    icon: HeartPulse,
    theme: 'from-fuchsia-600 to-purple-800'
  },
  'critical-illness': {
    title: 'Critical Illness Cover',
    description: 'Get immediate financial protection against major life-threatening illnesses upon diagnosis.',
    benefits: ['Lump sum payout on diagnosis', 'Covers 36+ critical illnesses', 'Tax benefits under Section 80D', 'Can be used for treatment or debt payoff'],
    coverageDetails: 'Pays a lump sum amount upon diagnosis of covered critical illnesses like cancer, heart attack, stroke, etc.',
    icon: Umbrella,
    theme: 'from-orange-500 to-amber-700'
  },
  'car-insurance': {
    title: 'Car Insurance',
    description: 'Protect your vehicle against accidents, theft, and natural calamities with our premium motor policies.',
    benefits: ['Comprehensive own-damage cover', 'Zero depreciation add-on available', '24x7 roadside assistance', 'Cashless repairs at network garages'],
    coverageDetails: 'Covers third-party liability, own damage to the car, personal accident cover, and natural disasters.',
    icon: Car,
    theme: 'from-blue-600 to-indigo-800'
  },
  'two-wheeler-insurance': {
    title: 'Two Wheeler Insurance',
    description: 'Complete protection for your bike or scooter at affordable rates with instant policy issuance.',
    benefits: ['Instant 2-minute policy issuance', 'Cashless garage network across India', 'Personal accident cover of ₹15 Lakhs', 'No Claim Bonus protection'],
    coverageDetails: 'Provides comprehensive and third-party cover for your two-wheeler against theft, accidents, and fire.',
    icon: Car,
    theme: 'from-sky-500 to-blue-700'
  },
  'home-insurance': {
    title: 'Home Property Insurance',
    description: 'Safeguard your most valuable asset from unforeseen events, burglary, and natural disasters.',
    benefits: ['Coverage for building structure and contents', 'Protection against fire, floods, and burglary', 'Alternate accommodation cover', 'Coverage for valuable electronics'],
    coverageDetails: 'Covers damages due to fire, earthquake, floods, theft, terrorism, and allied perils.',
    icon: Home,
    theme: 'from-emerald-500 to-green-700'
  },
  'business-insurance': {
    title: 'Business / Shop Insurance',
    description: 'Customized insurance solutions to protect your business, inventory, and premises from operational risks.',
    benefits: ['Property and inventory damage cover', 'Public liability protection', 'Business interruption cover', 'Employee compensation cover'],
    coverageDetails: 'Tailored coverage for small shops, medium enterprises, and large factories against various business risks.',
    icon: Briefcase,
    theme: 'from-slate-700 to-slate-900'
  },
};

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const slug = params.slug;
  const product = insuranceProducts[slug as keyof typeof insuranceProducts];

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | Premium Protection | BFSFIN`,
    description: product.description,
  };
}

export default function InsuranceProductPage({ params }: Props) {
  const slug = params.slug;
  const product = insuranceProducts[slug as keyof typeof insuranceProducts];

  if (!product) {
    notFound();
  }

  const Icon = product.icon;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'BFSFIN',
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a0f1c] transition-colors duration-300">
      <Header />
      
      <main className="flex-grow">
        {/* SEO Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* HERO SECTION */}
        <section className="relative bg-slate-950 pt-20 pb-32 sm:pt-28 sm:pb-40 overflow-hidden">
          {/* Deep Premium Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${product.theme} opacity-40 mix-blend-multiply`}></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-slate-950 to-slate-950"></div>
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, #000 40%, transparent 100%)' }}></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl backdrop-blur-md">
              <ShieldCheck className="w-4 h-4" /> Comprehensive Protection
            </div>
            
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${product.theme} p-[2px] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-300`}>
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                  <Icon className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg">
              {product.title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
              {product.description}
            </p>
          </div>
        </section>

        {/* CONTENT SECTION (Overlapping Hero) */}
        <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 sm:-mt-24 pb-24">
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 p-6 sm:p-10 lg:p-14">
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              
              {/* Left Column: Benefits */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20">
                    <Star className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Key Features & Benefits</h2>
                </div>
                
                <div className="space-y-6">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800">
                      <div className="mt-1 bg-emerald-500 rounded-full p-1 shadow-sm shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Coverage & CTA */}
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
                    <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">What's Covered?</h2>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-700/50 mb-10 flex-grow">
                  <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed text-lg">
                    {product.coverageDetails}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-emerald-950 to-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl border border-emerald-800/50">
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${product.theme} rounded-full blur-[80px] opacity-30 -mr-20 -mt-20 pointer-events-none`}></div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-xl font-black text-white mb-2">Ready to secure your future?</h3>
                    <p className="text-emerald-100/70 text-sm mb-6">Get an instant quote and apply 100% digitally in 2 minutes.</p>
                    
                    <Link 
                      href={`/apply?product=Insurance&subType=${encodeURIComponent(product.title)}`}
                      className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] hover:-translate-y-1"
                    >
                      Apply Now <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
