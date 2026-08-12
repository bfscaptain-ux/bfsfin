'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, ArrowUp, Crown, AlertCircle } from 'lucide-react';
import { getLeaderboard } from '@/app/actions/partner';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getLeaderboard();
        if (res.success && res.data) {
          setLeaderboard(res.data);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (hasError || leaderboard.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Leaderboard Unavailable</h3>
      </div>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  // Helper for ranks 1-3 styling
  const getRankConfig = (rank: number) => {
    if (rank === 1) return { color: 'yellow-500', h: 'h-56', text: 'text-yellow-500' };
    if (rank === 2) return { color: 'slate-300', h: 'h-40', text: 'text-slate-700 dark:text-slate-300' };
    return { color: 'amber-600', h: 'h-32', text: 'text-amber-600' };
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center">
          <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
          Partner Leaderboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">See how you rank against other top referring partners.</p>
      </div>

      {/* Podium Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-800 relative overflow-hidden pt-12">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 min-h-[300px] relative z-10 pb-8">
          
          {/* Top 3 Rendering */}
          {[1, 0, 2].map((idx) => {
            const partner = top3[idx];
            if (!partner) return null;
            
            const config = getRankConfig(partner.rank);
            const isFirst = partner.rank === 1;

            return (
              <motion.div 
                key={partner.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
                className={`flex flex-col items-center w-full md:w-${isFirst ? '56 z-10 -mb-4 md:-mb-8' : '48'} order-${idx === 0 ? '2 md:order-1' : idx === 1 ? '1 md:order-2' : '3'}`}
              >
                {isFirst && <Crown className={`w-10 h-10 ${config.text} mb-2 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]`} />}
                
                <div className={`w-${isFirst ? '20 h-20' : '16 h-16'} rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-${config.color} mb-3 flex items-center justify-center relative shadow-[0_0_15px_rgba(0,0,0,0.1)]`}>
                  {partner.isCurrentUser && (
                    <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 animate-pulse border border-slate-900">YOU</span>
                  )}
                  <span className={`text-${isFirst ? '2xl' : 'xl'} font-black ${config.text}`}>{partner.name.charAt(0)}</span>
                </div>
                
                <div className={`bg-slate-50 dark:bg-slate-950/80 backdrop-blur-sm border border-${config.color}/30 w-full rounded-t-2xl p-4 flex flex-col items-center justify-start ${config.h}`}>
                  <h3 className={`font-${isFirst ? 'black text-lg' : 'bold'} text-slate-900 dark:text-white text-center truncate w-full`}>{partner.name}</h3>
                  <span className={`text-${isFirst ? 'sm' : 'xs'} font-bold ${config.text} mt-1 uppercase`}>#{partner.rank} Rank</span>
                  <span className={`text-${isFirst ? '2xl' : 'lg'} font-black text-emerald-400 mt-2`}>{partner.points} Pts</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* List View for Others */}
      {others.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mt-8">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950/30">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Other Top Performers</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 dark:text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950/20">
                  <th className="px-6 py-5 font-bold w-24">Rank</th>
                  <th className="px-6 py-5 font-bold">Partner Name</th>
                  <th className="px-6 py-5 font-bold">Tier</th>
                  <th className="px-6 py-5 font-bold text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {others.map((partner) => (
                  <tr key={partner.rank} className={`hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors group ${partner.isCurrentUser ? 'bg-emerald-500/5 dark:bg-emerald-500/10' : ''}`}>
                    <td className="px-6 py-5">
                      <span className="font-black text-slate-500 dark:text-slate-500 text-lg">#{partner.rank}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold mr-3 border border-slate-300 dark:border-slate-700">
                          {partner.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{partner.name} {partner.isCurrentUser && <span className="ml-2 text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full">YOU</span>}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded border
                        ${partner.tier === 'Platinum' ? 'bg-slate-200 text-slate-900 border-white' : 
                          partner.tier === 'Gold' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                          'bg-slate-700/50 text-slate-700 dark:text-slate-300 border-slate-400 dark:border-slate-600'}
                      `}>
                        {partner.tier}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end">
                        <span className="font-black text-emerald-400 mr-2">{partner.points}</span>
                        <ArrowUp className="w-4 h-4 text-emerald-500" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
