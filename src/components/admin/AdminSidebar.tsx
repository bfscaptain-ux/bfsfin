"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileCheck,
  TrendingDown,
  MessageSquare,
  FileText,
  DollarSign,
  Settings,
  ShieldCheck,
  Globe,
  Lock,
  LogOut,
  HelpCircle,
  Mail,
  Star
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Lead Management CRM", href: "/admin/leads", icon: Users, badge: "CRM" },
    { label: "Careers & Jobs CMS", href: "/admin/careers", icon: Briefcase },
    { label: "Job Applications CMS", href: "/admin/job-applications", icon: FileCheck, badge: "New" },
    { label: "Bank Rates CMS", href: "/admin/rates", icon: TrendingDown, highlight: true },
    { label: "Client Testimonials CMS", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Reviews Management", href: "/admin/reviews", icon: Star, badge: "New" },
    { label: "Contact Requests CMS", href: "/admin/contact-requests", icon: Mail, badge: "New" },
    { label: "Blog & Articles CMS", href: "/admin/articles", icon: FileText },
    { label: "FAQ Management CMS", href: "/admin/faqs", icon: HelpCircle },
    { label: "Partner Control Hub", href: "/admin/partners", icon: DollarSign, badge: "360" },
    { label: "Website Control Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-blue-500/20 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none text-xs">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/40 flex items-center justify-center font-black">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-white flex items-center gap-1">
              BFS <span className="text-blue-400">ADMIN</span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Control Center v2.0
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.highlight ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-black ${
                    isActive ? "bg-white/20 text-white" : "bg-blue-950 text-blue-300 border border-blue-500/30"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Strip */}
      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">
              PB
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">Mrs. Vinita Sharma</div>
              <div className="text-[10px] text-emerald-400">Super Admin</div>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-xl font-bold transition"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-400" /> View Live User Site
        </Link>
      </div>
    </aside>
  );
}
