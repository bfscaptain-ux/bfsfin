import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText, Scale, ShieldCheck, AlertCircle, CheckCircle2, 
  MapPin, Mail, PhoneCall, HelpCircle, ArrowRight 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use & Service Agreement | Bhardwaj Financial Services",
  description: "Official terms and conditions governing the use of Bhardwaj Financial Services (bfsfin.com). Legal jurisdiction: Agra, Uttar Pradesh.",
  alternates: {
    canonical: "https://bhardwajfinance.com/terms",
  }
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans text-slate-800 dark:text-slate-200">
      <Header />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5 text-emerald-400" /> Statutory Legal Agreement
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Terms of Use &amp; Service
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            These Terms of Service govern your access to and use of Bhardwaj Financial Services (bfsfin.com), loan consultation services, and indicative calculation tools.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-emerald-300/80 font-medium">
            <span>Last Updated: October 2026</span>
            <span>•</span>
            <span>Jurisdiction: Agra, UP, India</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        {/* Important Notice */}
        <div className="bg-emerald-50 dark:bg-emerald-900/30 border-l-4 border-emerald-500 p-6 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-extrabold text-base">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            Independent Loan Facilitation Notice
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200/90 leading-relaxed font-medium">
            Bhardwaj Financial Services is an authorized corporate channel partner / Direct Selling Agent (DSA). We are not a bank or direct credit underwriter. Loan sanctions, disbursements, and terms are determined solely by lending Banks and NBFCs.
          </p>
        </div>

        {/* Section 1 */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">1</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Acceptance of Terms</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Binding user covenant</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            By accessing or using bfsfin.com, submitting any lead inquiry form, or utilizing our loan consultation services, you agree to be legally bound by these Terms of Use, our Privacy Policy, and our Lender Disclaimer. If you disagree with any part of these terms, you must refrain from using this website.
          </p>
        </section>

        {/* Section 2: Calculators Disclaimer */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">2</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Indicative &amp; Illustrative Tools (Calculators)</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">EMI &amp; Eligibility Disclaimer</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            All online calculators (including Home Loan EMI Calculator, Loan Eligibility Calculator, Prepayment Tool, and Balance Transfer Calculator) provided on bfsfin.com are solely for <strong>illustrative and indicative informational purposes</strong>.
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Calculators use standard mathematical amortization algorithms and do not constitute a commercial credit offer.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Actual interest rates, loan tenure, EMI installments, processing fees, and sanction amounts are determined exclusively by the lender based on formal credit appraisal (CIBIL/income verification).</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Telecommunications & DND Waiver */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">3</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Customer Communications &amp; DND / NDNC Waiver</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Telecom regulatory compliance (TRAI)</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            By submitting your mobile number and contact details on any form on bfsfin.com, you explicitly authorize Bhardwaj Financial Services and its authorized partner lending institutions to communicate with you via Phone Call, WhatsApp, SMS, or Email regarding your credit enquiry.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            This express consent overrides any registration on the National Do Not Call (NDNC) registry or Telecom Commercial Communications Customer Preference Portal (DND) as governed by TRAI guidelines. You may revoke this authorization at any time by emailing <a href="mailto:grievance@bfsfin.com" className="text-emerald-600 underline font-bold">grievance@bfsfin.com</a>.
          </p>
        </section>

        {/* Section 4: Jurisdiction */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">4</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Governing Law &amp; Legal Jurisdiction</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Agra, Uttar Pradesh, India</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            These Terms of Use and any transaction, dispute, or claim arising out of or in connection with the services provided by Bhardwaj Financial Services shall be governed by and construed in accordance with the laws of the Republic of India.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
            <strong>Exclusive Jurisdiction Clause:</strong> All legal disputes, claims, or arbitration proceedings shall be subject to the exclusive jurisdiction of the competent courts in <strong>Agra, Uttar Pradesh</strong>, India.
          </div>
        </section>

        {/* Section 5: Grievance Redressal */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">5</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Grievance Redressal Officer</h2>
              <span className="text-xs text-slate-500 dark:text-slate-400">Customer feedback &amp; dispute contact</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <p><strong>Nodal Officer:</strong> Praveen Bhardwaj</p>
              <p><strong>Designation:</strong> Grievance &amp; Compliance Officer</p>
              <p><strong>Email:</strong> <a href="mailto:grievance@bfsfin.com" className="text-emerald-600 underline font-bold">grievance@bfsfin.com</a></p>
            </div>
            <div>
              <p><strong>Office:</strong> C-11, Cloth Market, Sanjay Place, Agra - 282002</p>
              <p><strong>Turnaround Time (TAT):</strong> 48 working hours</p>
              <p><strong>Helpline:</strong> <a href="tel:9258724227" className="text-emerald-600 underline font-bold">+91 9258-724-227</a></p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
