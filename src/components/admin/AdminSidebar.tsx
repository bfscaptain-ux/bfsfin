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
  PhoneCall,
  CalendarDays,
  DollarSign,
  Settings,
  ShieldCheck,
  Globe,
  Lock,
  LogOut,
  Building,
  Image as ImageIcon,
  HelpCircle
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Website Leads", href: "/admin/leads", icon: Users, badge: "NEW" },
    { label: "Consultations", href: "/admin/appointments", icon: CalendarDays },
    { label: "Callback Requests", href: "/admin/callbacks", icon: PhoneCall, badge: "URGENT" },
    { label: "Bank Rates CMS", href: "/admin/rates", icon: TrendingDown },
    { label: "Hero Content CMS", href: "/admin/hero-images", icon: ImageIcon, highlight: true },
    { label: "Bank Partner Logos", href: "/admin/bank-logos", icon: Building, highlight: true },
    { label: "Service Areas CMS", href: "/admin/service-areas", icon: Globe, highlight: true },
    { label: "Team CMS", href: "/admin/team", icon: Users, highlight: true },
    { label: "Legal & Certs CMS", href: "/admin/certifications", icon: ShieldCheck, highlight: true },
    { label: "Client Testimonials CMS", href: "/admin/testimonials", icon: MessageSquare },
    { label: "Client Reviews CMS", href: "/admin/reviews", icon: MessageSquare, highlight: true },
    { label: "Blog & Articles CMS", href: "/admin/articles", icon: FileText },
    { label: "FAQ CMS", href: "/admin/faqs", icon: HelpCircle },
    { label: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-emerald-900 border-r border-emerald-500/20 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none text-xs">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-emerald-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-white flex items-center gap-1">
              BFS <span className="text-emerald-400">ADMIN</span>
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
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.highlight ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-black ${
                    isActive ? "bg-white/20 text-white" : "bg-emerald-950 text-emerald-300 border border-emerald-500/30"
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
      <div className="p-4 border-t border-emerald-800 space-y-3 bg-emerald-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/30">
              PB
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">Adv. Praveen Bhardwaj</div>
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
