import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, 
  Mail, MapPin, PhoneCall, Scale, ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Bhardwaj Financial Services",
  description: "Official Refund & Cancellation Policy for Bhardwaj Financial Services (bfsfin.com). Strict zero-advance-brokerage guarantee.",
  alternates: {
    canonical: "https://bhardwajfinance.com/refund-cancellation",
  }
};

export default function RefundCancellationPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans text-slate-800 dark:text-slate-200">
      <Header />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-emerald-400" /> Transparent Fee Structure
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Our operational commitment to transparent loan distribution, zero unauthorized charges, and clear fee policies.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-emerald-300/80 font-medium">
            <span>Last Updated: October 2026</span>
            <span>•</span>
            <span>Zero Advance Fee Commitment</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        {/* Zero Fee Guarantee Box */}
        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500 p-6 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-extrabold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            100% Free Consultation &amp; Zero Upfront Brokerage
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200/90 leading-relaxed font-medium">
            Bhardwaj Financial Services charges <strong>ZERO upfront facilitation or brokerage fees</strong> from borrowers for Home Loans, LAP, and Balance Transfers. All consultation, document collection, and partner bank liaison is provided free of charge.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            1. Partner Bank Processing Fees
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Lending Banks and Housing Finance Companies (HFCs) may levy statutory processing fees, technical evaluation charges, or property legal search fees as per their institutional tariff schedule.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>All legitimate bank processing fees are paid <strong>directly to the lending bank or HFC</strong> through official payment links, demand drafts, or direct account debit.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Refund policies for bank-levied evaluation or administrative fees are governed solely by the respective lender&apos;s terms and conditions. BFS does not collect or hold these funds.</span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            2. Application Cancellation by Applicant
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Borrowers have the complete right to cancel or withdraw their loan application at any stage before loan agreement execution or disbursement without any cancellation penalty from Bhardwaj Financial Services.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            To cancel an active application or request data deletion, simply send an email with your application reference ID to <a href="mailto:grievance@bfsfin.com" className="text-emerald-600 underline font-bold">grievance@bfsfin.com</a>.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            3. Grievance &amp; Fee Disputes
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            If any representative or unauthorized individual claiming affiliation with BFS demands advance cash fees, immediately notify our Nodal Grievance Officer:
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
            <p><strong>Nodal Officer:</strong> Praveen Bhardwaj (Grievance &amp; Compliance)</p>
            <p><strong>Email:</strong> <a href="mailto:grievance@bfsfin.com" className="text-emerald-600 underline font-bold">grievance@bfsfin.com</a></p>
            <p><strong>Address:</strong> C-11, Cloth Market, Sanjay Place, Agra, Uttar Pradesh - 282002</p>
            <p><strong>Phone:</strong> <a href="tel:9258724227" className="text-emerald-600 underline font-bold">+91 9258-724-227</a></p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
