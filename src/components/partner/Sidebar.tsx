'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Megaphone, 
  Settings,
  LogOut,
  Menu,
  X,
  Gift,
  Bell,
  Trophy,
  LifeBuoy,
  BookOpen,
  Network,
  Calculator,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const menuItems = [
  { name: 'Dashboard', path: '/partner-dashboard', icon: LayoutDashboard },
  { name: 'My Leads', path: '/partner-dashboard/leads', icon: Users },
  { name: 'Earnings', path: '/partner-dashboard/earnings', icon: Wallet },
  { name: 'Rewards', path: '/partner-dashboard/rewards', icon: Gift, isNew: true },
  { name: 'Leaderboard', path: '/partner-dashboard/leaderboard', icon: Trophy, isNew: true },
  { name: 'Community', path: '/partner-dashboard/community', icon: MessageSquare, isNew: true },
  { name: 'My Network', path: '/partner-dashboard/network', icon: Network },
  { name: 'Tools', path: '/partner-dashboard/tools', icon: Calculator },
  { name: 'Training', path: '/partner-dashboard/training', icon: BookOpen },
  { name: 'Marketing', path: '/partner-dashboard/marketing', icon: Megaphone },
  { name: 'Support', path: '/partner-dashboard/support', icon: LifeBuoy },
  { name: 'Settings', path: '/partner-dashboard/settings', icon: Settings },
];

const notifications = [
  { id: 1, title: 'Lead Approved!', desc: 'Amit Sharma\'s loan of ₹50L is approved.', time: '2 mins ago', unread: true },
  { id: 2, title: 'Commission Paid', desc: '₹12,500 transferred to your bank.', time: '1 hour ago', unread: true },
  { id: 3, title: 'New Target', desc: 'You need ₹14.5Cr for the Thailand Trip.', time: '1 day ago', unread: false },
];

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#0B1120] overflow-hidden font-sans text-slate-700 dark:text-slate-300">
      {/* Mobile Top Header (App-like) */}
      <div className="lg:hidden fixed top-0 w-full z-40 bg-slate-50 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 p-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow-sm">
            <Image src="/logo.png" alt="BFSFIN" width={28} height={28} className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider leading-tight">Bhardwaj</span>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-tight">Financial Family</span>
          </div>
        </div>
        
        <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 bg-slate-200/50 dark:bg-slate-800/50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-pulse border border-white dark:border-slate-900"></span>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`
              fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800/50 shadow-2xl
              flex flex-col
            `}
          >
            <div className="flex items-center h-20 px-4 border-b border-slate-200 dark:border-slate-800/50 relative z-20 shrink-0">
              <Link href="/partner-dashboard" className="flex items-center gap-3 w-full">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.15)] shrink-0">
                  <Image src="/logo.png" alt="BFSFIN Logo" width={40} height={40} className="object-contain" priority />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider leading-tight">Bhardwaj</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-tight">Financial Family</span>
                </div>
              </Link>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar relative z-20">
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.path}
                        onClick={() => !isDesktop && setIsOpen(false)}
                        className={`
                          flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden
                          ${isActive 
                            ? 'bg-slate-100 dark:bg-slate-800/60 text-emerald-400 font-medium' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800/30 hover:text-slate-200'
                          }
                        `}
                      >
                        {isActive && (
                          <motion.div 
                            layoutId="active-nav"
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-emerald-500 rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                          />
                        )}
                        <item.icon 
                          className={`
                            mr-3 h-[18px] w-[18px] transition-colors duration-200 relative z-10
                            ${isActive ? 'text-emerald-400' : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:text-slate-300'}
                          `} 
                        />
                        <span className="relative z-10 flex-1 text-[13px] font-medium tracking-wide">{item.name}</span>
                        {item.isNew && (
                          <span className="relative z-10 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm">
                            NEW
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-[#0F172A] shrink-0 relative z-20">
              <div className="flex items-center px-3 py-2.5 mb-2 rounded-lg hover:bg-slate-100 dark:bg-slate-800/30 transition-colors border border-transparent hover:border-slate-200 dark:border-slate-800 cursor-pointer">
                <div className="h-9 w-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold mr-3 text-sm">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-200 leading-tight">John Doe</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-500 font-medium leading-tight">Platinum Partner</p>
                </div>
              </div>
              <button className="flex w-full items-center px-3 py-2 text-slate-500 dark:text-slate-500 hover:text-rose-400 rounded-lg transition-colors duration-200 group text-[13px] font-medium">
                <LogOut className="mr-3 h-[18px] w-[18px]" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#0B1120] relative">
        {/* Professional Top Header */}
        <header className="hidden lg:flex h-20 items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800/50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md shrink-0 z-30">
          <div className="flex-1">
            {/* Breadcrumb or Title can go here */}
          </div>
          
          <div className="flex items-center space-x-6 relative">
            <ThemeToggle />
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-full hover:bg-slate-800/50 focus:outline-none"
            >
              <Bell className="w-[20px] h-[20px]" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0F172A]"></span>
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-12 w-80 bg-white dark:bg-[#0F172A] border border-slate-300 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                    <h3 className="text-sm font-semibold text-slate-200">Notifications</h3>
                    <span className="text-[11px] text-emerald-400 font-medium cursor-pointer hover:text-emerald-300">Mark all read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-slate-200 dark:border-slate-800/50 hover:bg-slate-100 dark:bg-slate-800/30 transition-colors cursor-pointer ${n.unread ? 'bg-slate-100 dark:bg-slate-800/10' : ''}`}>
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-[13px] font-semibold ${n.unread ? 'text-slate-200' : 'text-slate-600 dark:text-slate-400'}`}>{n.title}</h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-500">{n.time}</span>
                        </div>
                        <p className="text-[12px] text-slate-500 dark:text-slate-500 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center bg-white dark:bg-slate-900/50 hover:bg-slate-100 dark:bg-slate-800/50 cursor-pointer transition-colors">
                    <span className="text-[12px] font-medium text-emerald-400">View All</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 mt-16 lg:mt-0 pb-24 lg:pb-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar (App-like) */}
      <div className="lg:hidden fixed bottom-0 w-full z-40 bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-slate-800 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-around px-2 py-2">
          {[
            { name: 'Home', path: '/partner-dashboard', icon: LayoutDashboard },
            { name: 'Leads', path: '/partner-dashboard/leads', icon: Users },
            { name: 'Earnings', path: '/partner-dashboard/earnings', icon: Wallet },
            { name: 'Network', path: '/partner-dashboard/network', icon: Network },
          ].map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.name} href={item.path} className="flex flex-col items-center justify-center w-16 h-14 relative group">
                {isActive && <motion.div layoutId="bottom-nav-active" className="absolute top-0 w-8 h-1 bg-emerald-500 rounded-full" />}
                <item.icon className={`w-6 h-6 mt-1 mb-1 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span className={`text-[10px] font-bold ${isActive ? 'text-emerald-500' : 'text-slate-400'}`}>{item.name}</span>
              </Link>
            );
          })}
          
          <button onClick={toggleSidebar} className="flex flex-col items-center justify-center w-16 h-14 relative group">
             <Menu className={`w-6 h-6 mt-1 mb-1 ${isOpen ? 'text-emerald-500' : 'text-slate-400'}`} />
             <span className={`text-[10px] font-bold ${isOpen ? 'text-emerald-500' : 'text-slate-400'}`}>Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && !isDesktop && (
        <div 
          className="fixed inset-0 bg-slate-50 dark:bg-slate-950/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
