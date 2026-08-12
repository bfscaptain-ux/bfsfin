'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Users, Search, PlusCircle, Award } from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'Amit CA Associates',
    avatar: 'A',
    badge: 'Platinum',
    time: '2 hours ago',
    title: 'How to quickly close a ₹5Cr LAP deal?',
    content: 'Hi everyone, I just closed a major Loan Against Property deal with BFSFIN. The key was ensuring all property chain documents were verified beforehand. The technical team at BFSFIN is very fast if your papers are clear. Has anyone else experienced this?',
    likes: 24,
    comments: 8,
    tags: ['LAP', 'Success Story']
  },
  {
    id: 2,
    author: 'Neha Financials',
    avatar: 'N',
    badge: 'Gold',
    time: '5 hours ago',
    title: 'Client query regarding pre-payment charges',
    content: 'My client wants to take a Home Loan but is concerned about foreclosure charges after 3 years. I know RBI guidelines say no charges on floating rates, but what about fixed-rate loans? Need some clarity.',
    likes: 12,
    comments: 15,
    tags: ['Home Loan', 'Policy']
  },
  {
    id: 3,
    author: 'Vikram Singh',
    avatar: 'V',
    badge: 'Silver',
    time: '1 day ago',
    title: 'New to the Partner Program! Looking forward to working together.',
    content: 'Just joined the BFSFIN Partner network. I am a real estate broker based in Pune. Looking forward to connecting with you all and providing the best loan solutions to my buyers!',
    likes: 45,
    comments: 12,
    tags: ['Introduction']
  }
];

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            Partner Community
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Connect, share insights, and grow together with top partners across India.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] flex items-center shrink-0">
          <PlusCircle className="w-5 h-5 mr-2" />
          New Discussion
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Feed */}
        <div className="flex-1 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search discussions, tags, or partners..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 dark:text-white placeholder-slate-500 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={post.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xl text-slate-700 dark:text-slate-300 mr-4">
                      {post.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white flex items-center">
                        {post.author}
                        {post.badge === 'Platinum' && <Award className="w-4 h-4 ml-1 text-blue-500" />}
                        {post.badge === 'Gold' && <Award className="w-4 h-4 ml-1 text-yellow-500" />}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{post.time} • {post.badge} Partner</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{post.title}</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">{post.content}</p>
                
                <div className="flex items-center gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 font-bold transition-colors">
                      <ThumbsUp className="w-5 h-5 mr-2" />
                      {post.likes}
                    </button>
                    <button className="flex items-center text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 font-bold transition-colors">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      {post.comments}
                    </button>
                  </div>
                  <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Read more</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Trending Topics</h3>
            <div className="space-y-3">
              {['#HomeLoanTips', '#TaxBenefits2026', '#LAP', '#NRI_Loans'].map((tag, i) => (
                <div key={tag} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors">{tag}</span>
                  <span className="text-xs text-slate-400">{120 - i * 20} posts</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="font-black text-xl mb-2 relative z-10">Become a Top Contributor</h3>
            <p className="text-blue-100 text-sm mb-4 relative z-10">Answer questions and share knowledge to earn community badges and extra reward points!</p>
            <button className="w-full bg-white text-blue-900 py-2.5 rounded-xl font-bold shadow-md hover:bg-blue-50 transition-colors relative z-10">
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
