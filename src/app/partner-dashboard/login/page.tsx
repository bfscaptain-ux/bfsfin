'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PartnerLogin() {
  const router = useRouter();
  const [partnerId, setPartnerId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock Authentication Logic
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to the dashboard
      router.push('/partner-dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-slate-900 border-2 border-slate-800 rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
            <ShieldCheck className="w-10 h-10 text-emerald-400 relative z-10" />
          </motion.div>
          
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Partner Portal</h1>
          <p className="text-slate-400 text-sm font-medium">Log in to manage your referrals and earnings.</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle top border glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-50"></div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Partner ID</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input 
                  type="text" 
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  placeholder="e.g. PRT-801" 
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1 mr-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <Link href="#" className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">Forgot Password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-400 transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-950/50 border border-slate-800 rounded-2xl text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-inner"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  <span className="relative z-10 flex items-center">
                    Secure Login <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  {/* Hover sheen effect */}
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-500 text-sm font-medium">
          <p>Don't have an account? <Link href="/apply" className="text-white hover:text-emerald-400 transition-colors border-b border-transparent hover:border-emerald-400 pb-0.5">Apply as a Partner</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
