"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DEFAULT_FAQS = [
  {
    id: "faq-1",
    question: "Why choose Bhardwaj Financial Services (BFS) for loans?",
    answer: "Bhardwaj Financial Services is an authorized banking facilitator in Agra and North India partnered with 50+ nationalized banks and NBFCs (including SBI, PNB, HDFC, ICICI, Axis). We compare live interest rates, handle documentation, and ensure doorstep processing with zero advisory markup."
  },
  {
    id: "faq-2",
    question: "What is the lowest interest rate offered on home loans?",
    answer: "Home loan rates start from <strong>7.15%* p.a.</strong> depending on the applicant's CIBIL score (750+), employment profile (salaried or self-employed), and partner bank sanction terms."
  },
  {
    id: "faq-3",
    question: "How long does the loan sanction process take?",
    answer: "We facilitate in-principle digital sanction within <strong>48 to 72 hours</strong> once complete KYC, income proofs, and property chain registry documents are verified."
  },
  {
    id: "faq-4",
    question: "Does BFS charge any upfront advisory fees from borrowers?",
    answer: "No. BFS does not charge any upfront consultation or application fees from borrowers. Only official bank processing and statutory legal/valuation fees apply as mandated directly by the lending bank."
  },
  {
    id: "faq-5",
    question: "Is my personal and financial data secure with BFS?",
    answer: "Yes. We adhere strictly to DPDP Act 2023 guidelines and RBI channel partner security standards. Customer KYC and financial documents are encrypted and shared exclusively with the underwriting desk of your selected partner bank."
  }
];

export default function DynamicFaq({ category = "all" }: { category?: string }) {
  const [faqs, setFaqs] = useState<any[]>(DEFAULT_FAQS);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`/api/faqs?limit=100&t=${Date.now()}`);
        const data = await res.json();
        
        let fetchedFaqs = data.data || [];
        
        fetchedFaqs = fetchedFaqs.filter((f: any) => {
           const status = (f.status || 'Published').toLowerCase();
           return status === 'published';
        });
        
        if (category !== "all") {
          fetchedFaqs = fetchedFaqs.filter((f: any) => {
            const faqCat = (f.category || 'General').toLowerCase();
            return faqCat === category.toLowerCase();
          });
        }
        
        if (fetchedFaqs.length > 0) {
          setFaqs(fetchedFaqs);
        }
      } catch (err) {
        // Keep DEFAULT_FAQS on failure
      }
    };
    fetchFaqs();
  }, [category]);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <details key={faq.id || idx} className="group bg-slate-50 dark:bg-emerald-950 border border-slate-200 dark:border-emerald-800 rounded-xl [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 dark:text-white font-bold text-sm">
            {faq.question}
            <span className="shrink-0 text-slate-500 group-open:-rotate-180 transition-transform duration-300">
              <ChevronDown className="w-4 h-4" />
            </span>
          </summary>
          <div 
            className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </details>
      ))}
    </div>
  );
}
