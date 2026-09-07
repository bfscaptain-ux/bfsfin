"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StickyCTA, CalculatorFAQ, DualInput, CalculatorChart, FormulaAndExample, HowToUse, RelatedCalculators } from "@/components/calculators/CalculatorElements";

export default function HealthPremiumEstimator() {
  const [planType, setPlanType] = useState<"Individual" | "Family Floater">("Individual");
  const [eldestAge, setEldestAge] = useState<number>(30);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [cityTier, setCityTier] = useState<"Tier 1" | "Tier 2">("Tier 1");

  const [premium, setPremium] = useState<number>(0);
  const [recommendedCover, setRecommendedCover] = useState<string>("");

  useEffect(() => {
    let base = 3000;
    let ageFactor = Math.max(0, eldestAge - 18) * 120;
    
    // Enforce logic constraint
    const actualAdults = planType === "Individual" ? 1 : adults;
    const actualChildren = planType === "Individual" ? 0 : children;
    
    let membersFactor = (actualAdults * 2000) + (actualChildren * 1000);
    let tierMultiplier = cityTier === "Tier 1" ? 1.25 : 1.0;
    
    let calculatedPremium = (base + ageFactor + membersFactor) * tierMultiplier;
    setPremium(Math.round(calculatedPremium));
    
    if (cityTier === "Tier 1") {
      if (planType === "Family Floater") {
        setRecommendedCover("₹10 Lakhs - ₹25 Lakhs");
      } else {
        setRecommendedCover("₹10 Lakhs");
      }
    } else {
      if (planType === "Family Floater") {
        setRecommendedCover("₹5 Lakhs - ₹10 Lakhs");
      } else {
        setRecommendedCover("₹5 Lakhs");
      }
    }
  }, [planType, eldestAge, adults, children, cityTier]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const actualAdults = planType === "Individual" ? 1 : adults;
  const actualChildren = planType === "Individual" ? 0 : children;
  const membersCost = (actualAdults * 2000) + (actualChildren * 1000);
  const ageCost = Math.max(0, eldestAge - 18) * 120;

  const chartData = [
    { name: "Base Cover Cost", value: 3000 },
    { name: "Age Risk Premium", value: ageCost },
    { name: "Additional Members", value: membersCost },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden"><Header /></div>
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 pb-20">
        
        {/* Dynamic Header Section */}
        <div className="bg-white dark:bg-[#0a0f1c] pt-12 pb-16 px-4 relative overflow-hidden print:hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-emerald-800/30 to-transparent" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
              Precision Health Planner
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
              Health Insurance Premium Estimator
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Get an instant estimate for your health insurance premium based on your age, family size, and location tier.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white dark:bg-emerald-950/80 border border-slate-100 dark:border-emerald-800 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-emerald-900/20 backdrop-blur-3xl mb-16">
            
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100 dark:border-emerald-800/50">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Health Premium Estimator</h3>
                <p className="text-sm text-slate-500 dark:text-emerald-400/80 font-medium">Protect yourself and your family</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Side Inputs */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Toggles for Plan Type & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Plan Type</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                      <button 
                        onClick={() => setPlanType("Individual")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${planType === "Individual" ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'}`}
                      >
                        Individual
                      </button>
                      <button 
                        onClick={() => { setPlanType("Family Floater"); setAdults(2); }}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${planType === "Family Floater" ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'}`}
                      >
                        Family Floater
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">City Category</label>
                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                      <button 
                        onClick={() => setCityTier("Tier 1")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${cityTier === "Tier 1" ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'}`}
                      >
                        Tier 1 (Metro)
                      </button>
                      <button 
                        onClick={() => setCityTier("Tier 2")}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition ${cityTier === "Tier 2" ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500'}`}
                      >
                        Tier 2/3 (Others)
                      </button>
                    </div>
                  </div>
                </div>

                <DualInput label="Eldest Member's Age" value={eldestAge} min={18} max={80} suffix=" yrs" onChange={setEldestAge} />
                
                {planType === "Family Floater" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <DualInput label="Number of Adults" value={adults} min={1} max={4} onChange={setAdults} />
                    <DualInput label="Number of Children" value={children} min={0} max={4} onChange={setChildren} />
                  </div>
                )}
              </div>

              {/* Right Side Results */}
              <div className="lg:col-span-5 flex flex-col gap-6 relative">
                <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 border border-emerald-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="text-center sm:text-left">
                      <div className="text-emerald-300/80 text-xs font-bold uppercase tracking-[0.25em] mb-3">
                        Estimated Annual Premium
                      </div>
                      <div className="text-5xl font-black text-white flex items-baseline justify-center sm:justify-start gap-1 tracking-tighter">
                        <span className="text-3xl text-emerald-400/70">₹</span>
                        {premium.toLocaleString("en-IN")}
                        <span className="text-base text-emerald-400/70 font-medium ml-1">/yr</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 text-left">
                      <div className="flex flex-col items-center">
                        <span className="text-slate-400 text-sm mb-1">Recommended Cover:</span>
                        <span className="text-white font-bold text-lg">{recommendedCover}</span>
                      </div>
                    </div>

                    <div className="h-56 w-full relative my-6">
                      <CalculatorChart data={chartData} colors={['#10b981', '#f59e0b', '#3b82f6']} />
                    </div>

                    <button className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 transition-colors text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      Explore Perfect Plans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <FormulaAndExample 
            formulaName="Health Insurance Premium Logic" 
            formulaText="Premium = (Base Cost + Age Risk Factor + Family Member Cost) × City Tier Multiplier"
            exampleText="If you live in a Tier 1 Metro city and opt for a Family Floater covering 2 adults and 1 child, with the eldest member being 40 years old: The base cost might be ₹3,000. Age risk factor adds up for ages above 18. Each adult and child adds a specific premium cost. Because it's a Tier 1 city (higher medical expenses), the total is multiplied by 1.25, giving you an estimated premium of around ₹13,000 per year."
          />

          <HowToUse steps={[
            "Select whether you want an Individual or Family Floater plan.",
            "Choose your city category (Tier 1 metros generally have higher medical costs).",
            "Use the sliders to input the eldest member's age and family size to instantly see your estimated premium."
          ]} />

          <CalculatorFAQ calculatorId="health-premium" />

          <RelatedCalculators tools={[
            { name: "80D Tax Benefit Saver", link: "/calculator/insurance/tax-saver", desc: "Check how much tax you save by paying health insurance premiums." },
            { name: "Human Life Value (HLV)", link: "/calculator/insurance/hlv", desc: "Determine how much Term Life Insurance your family needs." },
            { name: "EMI Calculator", link: "/calculator", desc: "Calculate your standard personal or home loan EMI." }
          ]} />
        </div>
      </main>
      
      <StickyCTA 
        resultLabel="Est. Premium (Yearly)" 
        resultValue={formatCurrency(premium)} 
        ctaText="View Plans" 
        ctaLink="/apply" 
      />
      <Footer />
    </div>
  );
}
