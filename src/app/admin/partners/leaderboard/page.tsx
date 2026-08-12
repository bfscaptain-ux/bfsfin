'use client';

import React, { useEffect, useState } from 'react';
import { TrendingDown, Trophy, Medal, Star } from 'lucide-react';
import { getAdminLeaderboard } from '@/app/actions/adminEcosystem';

export default function LeaderboardAdminPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const res = await getAdminLeaderboard();
      if (res.success && res.data) {
        setLeaderboard(res.data);
      }
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center">
          <TrendingDown className="w-6 h-6 text-yellow-500 mr-2" />
          Global Partner Leaderboard
        </h1>
        <p className="text-slate-400 mt-1 text-sm">Monitor top-performing partners and their total reward points.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-4 font-bold uppercase tracking-wider w-16 text-center">Rank</th>
              <th className="p-4 font-bold uppercase tracking-wider">Partner Name</th>
              <th className="p-4 font-bold uppercase tracking-wider">Partner Tier</th>
              <th className="p-4 font-bold uppercase tracking-wider text-right">Total Points (Disbursed)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {leaderboard.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No partners on leaderboard yet.</td></tr>
            ) : (
              leaderboard.map((profile, idx) => (
                <tr key={profile.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="p-4 text-center">
                    {idx === 0 ? <Trophy className="w-6 h-6 text-yellow-400 mx-auto" /> :
                     idx === 1 ? <Medal className="w-6 h-6 text-slate-300 mx-auto" /> :
                     idx === 2 ? <Medal className="w-6 h-6 text-amber-700 mx-auto" /> :
                     <span className="font-bold text-slate-500">#{idx + 1}</span>}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-white text-base">{profile.user.name}</div>
                    <div className="text-xs text-slate-500">{profile.user.email}</div>
                  </td>
                  <td className="p-4">
                     <span className="inline-block bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md font-medium border border-slate-700">
                        {profile.user.partnerProfile?.tier || 'Silver'}
                     </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-black text-emerald-400 text-lg flex items-center justify-end gap-1">
                      <Star className="w-4 h-4 fill-emerald-400" /> {profile.totalPoints.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase mt-1">₹{(profile.totalPoints / 1000).toFixed(1)} Cr</div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
