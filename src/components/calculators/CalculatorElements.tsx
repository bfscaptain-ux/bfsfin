"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Info, Calculator, FileText, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import AllCalculatorsHub from './AllCalculatorsHub';

/* 1. Sticky CTA Component */
export function StickyCTA({ resultLabel, resultValue, ctaText, ctaLink }: { resultLabel: string, resultValue: string, ctaText: string, ctaLink: string }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-emerald-500/30 p-3 sm:p-4 z-[90] shadow-[0_-10px_40px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom flex justify-between items-center px-4 md:px-8 print:hidden">
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm text-slate-400">{resultLabel}</span>
        <span className="text-base sm:text-xl font-black text-emerald-400">{resultValue}</span>
      </div>
      <Link href={ctaLink} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 sm:px-6 rounded-lg text-sm transition shadow-lg shadow-emerald-900/50 flex items-center gap-2">
        {ctaText} <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

/* 2. Calculator FAQ with Schema */
export function CalculatorFAQ({ faqs: initialFaqs, calculatorId }: { faqs?: { question: string, answer: string }[], calculatorId?: string }) {
  const [faqs, setFaqs] = useState<{question: string, answer: string}[]>(initialFaqs || []);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  React.useEffect(() => {
    if (calculatorId) {
      // First: try dedicated calculator FAQ table
      fetch(`/api/calculator-faqs?id=${calculatorId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            setFaqs(data);
          } else {
            // Fallback: pull from main FAQ CMS using category matching
            fetch(`/api/faqs?limit=100`)
              .then(r => r.json())
              .then(res => {
                const all = res.data || [];
                const matched = all.filter((f: {category?: string, status?: string}) =>
                  (f.category || '').toLowerCase() === calculatorId.toLowerCase() &&
                  (f.status || 'published').toLowerCase() === 'published'
                );
                if (matched.length > 0) {
                  setFaqs(matched.map((f: {question: string, answer: string}) => ({ question: f.question, answer: f.answer })));
                }
              })
              .catch(console.error);
          }
        })
        .catch(console.error);
    }
  }, [calculatorId]);

  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="my-6 sm:my-8 w-full print:hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5 space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Clear answers to common questions about loans, interest rates, and EMI calculations.
        </p>
      </div>
      <div className="w-full space-y-2.5">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-4 py-2.5 flex items-center justify-between font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <span className="pr-4">{faq.question}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openIndex === index ? 'rotate-180 text-emerald-500' : 'text-slate-400'}`} />
            </button>
            {openIndex === index && (
              <div className="px-4 pb-3 text-slate-600 dark:text-slate-400 leading-relaxed text-xs border-t border-slate-100 dark:border-slate-800 pt-2.5">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 3. Dual Input Slider */
export function DualInput({ 
  label, value, min, max, step = 1, prefix = "", suffix = "", onChange 
}: { 
  label: string, value: number, min: number, max: number, step?: number, prefix?: string, suffix?: string, onChange: (val: number) => void 
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{label}</label>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500/50 focus-within:border-emerald-500 transition-all">
          {prefix && <span className="text-slate-500 font-medium">{prefix}</span>}
          <input 
            type="number" 
            value={value} 
            onChange={(e) => onChange(Number(e.target.value))}
            min={min} max={max} step={step}
            className="w-24 bg-transparent border-none outline-none text-right font-bold text-emerald-600 dark:text-emerald-400 p-0 m-0 focus:ring-0 appearance-none"
          />
          {suffix && <span className="text-slate-500 font-medium">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 hover:accent-emerald-400 transition-all"
      />
      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
        <span>{prefix}{min.toLocaleString('en-IN')}{suffix}</span>
        <span>{prefix}{max.toLocaleString('en-IN')}{suffix}</span>
      </div>
    </div>
  );
}

/* 4. Donut Chart Component */
export function CalculatorChart({ data, colors }: { data: { name: string, value: number }[], colors: string[] }) {
  return (
    <div className="h-[250px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-\${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
            contentStyle={{ backgroundColor: '#064e3b', borderColor: '#047857', borderRadius: '12px', color: 'white', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
            itemStyle={{ color: 'white' }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-800 rounded-full flex items-center justify-center shadow-inner">
          <Calculator className="w-6 h-6 text-emerald-500" />
        </div>
      </div>
    </div>
  );
}

/* 5. Formula & Example Component */
export function FormulaAndExample({ formulaName, formulaText, exampleText }: { formulaName: string, formulaText: string, exampleText: string }) {
  return (
    <div className="my-6 sm:my-8 grid md:grid-cols-2 gap-4 w-full print:hidden">
      <div className="bg-slate-900 rounded-xl p-4 sm:p-5 shadow-md border border-slate-800 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 bg-emerald-500/20 rounded-lg">
            <Calculator className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white">Mathematical Formula</h3>
        </div>
        <p className="text-slate-400 text-xs mb-3">How is {formulaName} calculated?</p>
        <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 font-mono text-emerald-300 text-xs overflow-x-auto whitespace-nowrap">
          {formulaText}
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-900/50 rounded-xl p-4 sm:p-5 shadow-xs border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Worked Example</h3>
        </div>
        <div className="prose prose-xs dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed text-xs">
          {exampleText}
        </div>
      </div>
    </div>
  );
}

/* 6. How To Use Step-by-Step */
export function HowToUse({ steps }: { steps: string[] }) {
  const isFourSteps = steps.length === 4;
  return (
    <div className="my-6 sm:my-8 w-full text-center print:hidden">
      <div className="max-w-2xl mx-auto mb-4 sm:mb-5 space-y-1">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          How to Use This Calculator
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Follow these quick steps to calculate your exact monthly payments and loan schedule in seconds.
        </p>
      </div>

      <div className={`grid gap-3 sm:gap-4 relative w-full ${
        isFourSteps 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" 
          : steps.length === 3 
            ? "grid-cols-1 md:grid-cols-3" 
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }`}>
        {steps.map((step, idx) => (
          <div 
            key={idx} 
            className="group relative bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 shadow-xs hover:border-emerald-500/50 transition-all flex flex-col items-center text-center justify-between h-full"
          >
            <div className="w-full flex flex-col items-center">
              {/* Step Number Badge */}
              <div className="w-7 h-7 mx-auto bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-xs mb-2.5 shadow-sm">
                {idx + 1}
              </div>
              
              {/* Step Content */}
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200 leading-snug">
                {step}
              </p>
            </div>

            {/* Subtle Step Counter Pill */}
            <span className="mt-3 inline-block text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-100 dark:border-emerald-900">
              Step {idx + 1} of {steps.length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 7. Related Calculators */
export function RelatedCalculators({ tools, currentToolId }: { tools?: { name: string, link: string, desc: string }[], currentToolId?: string }) {
  if (!tools || tools.length === 0) {
    return <AllCalculatorsHub currentToolId={currentToolId} />;
  }

  return (
    <div className="my-12 sm:my-16 w-full print:hidden">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="w-1.5 h-7 bg-emerald-600 rounded-full"></div>
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Related Financial Tools & Calculators
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore our complete suite of institutional-grade financial decision tools.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {tools.map((tool, idx) => (
          <Link key={idx} href={tool.link} className="block bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-emerald-500/50 hover:shadow-lg transition-all group">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{tool.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export { default as CalculatorNavSwitcher } from './CalculatorNavSwitcher';
export { default as AllCalculatorsHub } from './AllCalculatorsHub';
