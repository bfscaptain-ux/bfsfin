import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ShieldCheck, Mail, MapPin, PhoneCall, Clock, CheckCircle2, 
  AlertCircle, ArrowRight, FileText, UserCheck, Scale
} from "lucide-react";

export const metadata: Metadata = {
  title: "Grievance Redressal Mechanism & Officer | Bhardwaj Financial Services",
  description: "Official Grievance Redressal Officer contact and dispute resolution protocol for Bhardwaj Financial Services (bfsfin.com). Nodal Officer: Praveen Bhardwaj, Agra.",
  alternates: {
    canonical: "https://bhardwajfinance.com/grievance",
  }
};

export default function GrievancePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-emerald-950 font-sans text-slate-800 dark:text-slate-200">
      <Header />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Customer Protection &amp; Redressal
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Grievance Redressal Protocol
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Bhardwaj Financial Services is committed to total transparency, fair lending practices, and timely resolution of all customer queries and complaints.
          </p>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-emerald-300/80 font-medium">
            <span>Guaranteed Acknowledgment: 24 Hours</span>
            <span>•</span>
            <span>Resolution Turnaround: 48 Working Hours</span>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        
        {/* Nodal Officer Highlight Card */}
        <div className="bg-white dark:bg-[#071711] border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-emerald-900/50 relative z-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block mb-1">
                Designated Statutory Officer
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Praveen Bhardwaj
              </h2>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                Nodal Grievance &amp; Compliance Officer
              </p>
            </div>
            
            <div className="px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Response TAT: 48 Working Hours</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 relative z-10 text-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Direct Grievance Email</span>
                  <a href="mailto:grievance@bfsfin.com" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    grievance@bfsfin.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneCall className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Helpdesk Phone</span>
                  <a href="tel:9258724227" className="font-bold text-slate-900 dark:text-white hover:underline">
                    +91 9258-724-227
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Registered Physical Office</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Block-C11, Shop No.-5, First Floor, Cloth Market (near MK Tailor), Sanjay Place, Agra, Uttar Pradesh - 282002
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">Office Working Hours</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Monday to Saturday: 10:00 AM – 6:30 PM (IST)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action Card: File Complaint Online */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-400 block">Official Disciplinary & Conduct Desk</span>
            <h3 className="text-xl sm:text-2xl font-black">Want to file a complaint against staff or service?</h3>
            <p className="text-xs sm:text-sm text-slate-300">Register an official grievance ticket directly with Praveen Bhardwaj. 48-Hour Resolution Guarantee.</p>
          </div>
          <Link
            href="/complaint"
            className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm rounded-xl shrink-0 transition-all shadow-lg flex items-center gap-2"
          >
            <span>File Formal Complaint Online</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Tier Escalation Matrix */}
        <section className="bg-white dark:bg-[#071711] border border-slate-200 dark:border-emerald-900/50 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-emerald-900/50 pb-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Customer Grievance Escalation Matrix
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Structured step-by-step resolution process compliant with consumer protection norms.
            </p>
          </div>

          <div className="space-y-6">
            {/* Level 1 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-900/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Level 1: Frontline Support Desk
                </span>
                <span className="text-[11px] font-bold text-slate-500">TAT: 24 Hours</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Contact your assigned Loan Relationship Manager or call our central helpline at <a href="tel:9258724227" className="font-bold underline text-emerald-600">+91 9258-724-227</a>, or email <a href="mailto:info@bfsfin.com" className="font-bold underline text-emerald-600">info@bfsfin.com</a>.
              </p>
            </div>

            {/* Level 2 */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-900/30 border border-emerald-300/80 dark:border-emerald-700/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  Level 2: Nodal Grievance Officer
                </span>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">TAT: 48 Hours</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                If your issue is not resolved within 24 hours, escalate with your reference ID directly to <strong>Praveen Bhardwaj</strong> at <a href="mailto:grievance@bfsfin.com" className="font-bold underline text-emerald-700 dark:text-emerald-300">grievance@bfsfin.com</a>.
              </p>
            </div>

            {/* Level 3 */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-emerald-950/40 border border-slate-200/80 dark:border-emerald-900/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Level 3: Partner Bank / Banking Ombudsman
                </span>
                <span className="text-[11px] font-bold text-slate-500">Regulatory Channel</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                For matters strictly concerning partner bank loan underwriting or bank sanction letters, complaints may also be registered with the respective lending Bank&apos;s Principal Nodal Officer or the RBI Banking Ombudsman (cms.rbi.org.in).
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
