'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Plane, Trophy, Star, ChevronRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { getPartnerRewards, getRewardTargets, claimReward } from '@/app/actions/partner';

export default function RewardsPage() {
  const [rewardData, setRewardData] = useState<any>(null);
  const [targets, setTargets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [claimedMessage, setClaimedMessage] = useState<{id: string, text: string} | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [rewardsRes, targetsRes] = await Promise.all([
          getPartnerRewards(),
          getRewardTargets()
        ]);
        
        if (rewardsRes.success && targetsRes.success) {
          setRewardData(rewardsRes.data || null);
          setTargets(targetsRes.data || []);
        } else {
          setHasError(true);
        }
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleClaim = async (rewardId: string) => {
    setClaimingId(rewardId);
    try {
      const res = await claimReward(rewardId);
      if (res.success) {
        setClaimedMessage({ id: rewardId, text: 'Claim Request Submitted Successfully!' });
      } else {
        setClaimedMessage({ id: rewardId, text: res.error || 'Failed to claim.' });
      }
    } catch (error) {
      setClaimedMessage({ id: rewardId, text: 'Something went wrong.' });
    }
    setClaimingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (hasError || !rewardData) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Failed to load Rewards</h3>
      </div>
    );
  }

  const currentDisbursed = parseFloat((rewardData.totalPoints / 1000).toFixed(1));

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center">
            <Gift className="w-8 h-8 text-rose-500 mr-3" />
            Rewards & Targets
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm sm:text-base">Hit milestones and win exclusive trips and gadgets!</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center shadow-inner">
          <Star className="w-6 h-6 text-yellow-500 mr-3 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Your Balance</span>
            <span className="font-black text-lg text-slate-900 dark:text-white leading-none">{rewardData.totalPoints} <span className="text-sm font-bold">Pts</span></span>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 px-2">Active Targets</h2>
        
        {targets.map((target, idx) => {
          const isEligible = currentDisbursed >= target.targetValue;
          const progressPercentage = Math.min((currentDisbursed / target.targetValue) * 100, 100);

          return (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={target.id} 
              className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group"
            >
              {/* Premium Image Background */}
              <div className="absolute inset-0">
                <img src={target.imageUrl || 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop'} alt={target.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/40 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-slate-900/40"></div>
              </div>

              <div className="relative z-20 p-6 sm:p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center md:text-left">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white font-black text-xs sm:text-sm mb-4 border border-white/20 backdrop-blur-md tracking-widest uppercase shadow-lg">
                    Target: ₹{target.targetValue} Cr
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-xl" dangerouslySetInnerHTML={{ __html: target.title }}></h2>
                  <p className="text-sm sm:text-lg text-slate-200 font-medium max-w-xl drop-shadow-md">
                    {target.description}
                  </p>
                </div>
                
                <div className="flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl w-full md:w-auto min-w-[280px]">
                  {isEligible ? (
                    <div className="text-center w-full">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                        <Trophy className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-1">Target Achieved!</h3>
                      <p className="text-emerald-300 text-sm font-bold mb-6">You are eligible for this reward.</p>
                      
                      {claimedMessage?.id === target.id ? (
                        <div className="bg-white/20 px-4 py-3 rounded-xl border border-white/30 text-white font-bold text-sm">
                          {claimedMessage?.text}
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleClaim(target.id)}
                          disabled={claimingId === target.id}
                          className="w-full bg-white text-slate-900 py-3.5 rounded-xl font-black hover:bg-slate-200 transition-colors shadow-xl flex justify-center items-center"
                        >
                          {claimingId === target.id ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Claim'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center w-full">
                      <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-4">Current Progress</p>
                      <div className="relative w-full h-4 bg-black/40 rounded-full overflow-hidden mb-4 border border-white/10">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full"
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                        </motion.div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-left">
                          <p className="text-3xl font-black text-white leading-none">₹{currentDisbursed} <span className="text-lg">Cr</span></p>
                          <p className="text-emerald-400 text-xs font-bold mt-1">{progressPercentage.toFixed(1)}% Completed</p>
                        </div>
                        <div className="text-right text-slate-400 text-sm font-bold">
                          / ₹{target.targetValue} Cr
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">How it works?</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mr-3 shrink-0 border border-blue-500/30 mt-0.5">1</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Refer clients for Home Loans, LAP, or Business Loans.</p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mr-3 shrink-0 border border-blue-500/30 mt-0.5">2</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Once the loan is <strong className="text-emerald-500 dark:text-emerald-400">disbursed</strong>, the amount is added to your tracker.</p>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mr-3 shrink-0 border border-blue-500/30 mt-0.5">3</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Cross the milestones to win gadgets. Hit your targets to unlock premium vacations!</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
