"use client";

import React from "react";

export default function EligibilitySuccessHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Happy Loan Eligibility Applicant 2D Illustration"
    >
      {/* Soft Background Circle */}
      <circle cx="140" cy="100" r="85" fill="#ECFDF5" opacity="0.8" />
      <ellipse cx="140" cy="180" rx="70" ry="6" fill="#E2E8F0" />

      {/* Floating Checkmark Pill */}
      <g transform="translate(165, 30)">
        <rect x="0" y="0" width="85" height="28" rx="14" fill="#059669" />
        <circle cx="14" cy="14" r="9" fill="#10B981" />
        <path d="M11 14L13 16L17 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="28" y="18" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Pre-Approved</text>
      </g>

      {/* 2D HUMAN CHARACTER (Thumbs up, confident smile, stylish Undraw posture) */}
      {/* Left Leg */}
      <path d="M125 115L120 155L118 175L128 175L132 155L134 115Z" fill="#1E293B" />
      <rect x="120" y="173" width="7" height="4" fill="#C58F68" />
      <path d="M115 177L130 177L132 182L112 182C111 182 113 178 115 177Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />

      {/* Right Leg (Slightly relaxed) */}
      <path d="M142 115L148 152L156 175L166 175L156 150L148 115Z" fill="#0F172A" />
      <rect x="156" y="173" width="7" height="4" fill="#C58F68" />
      <path d="M153 177L168 177L170 182L150 182C149 182 151 178 153 177Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />

      {/* Torso (Coral / Red stylish polo like User Image!) */}
      <path d="M115 65L155 65L150 120L118 120Z" fill="#EF4444" />
      <path d="M122 65L142 65L138 120L122 120Z" fill="#DC2626" />

      {/* Left Arm (Relaxed at side) */}
      <path d="M115 68L100 95L106 100L118 75Z" fill="#DC2626" />
      <circle cx="98" cy="103" r="5" fill="#C58F68" />

      {/* Right Arm (Giving Thumbs Up!) */}
      <path d="M152 68L175 85L170 92L145 76Z" fill="#DC2626" />
      <circle cx="177" cy="88" r="6" fill="#C58F68" />
      {/* Thumbs up gesture */}
      <path d="M178 84V78C178 76 182 76 182 78V84" stroke="#C58F68" strokeWidth="2.5" strokeLinecap="round" />

      {/* Neck & Head */}
      <rect x="130" y="52" width="10" height="15" fill="#C58F68" />
      <ellipse cx="135" cy="42" rx="12" ry="15" fill="#C58F68" />

      {/* Hair (Midnight Navy stylish geometry) */}
      <path d="M123 40C123 28 132 24 145 26C151 27 152 34 150 40C148 38 143 38 140 41C138 39 134 39 130 43C128 43 125 45 123 40Z" fill="#1E1B4B" />

      {/* Sparkles */}
      <path d="M90 45L92 50L97 52L92 54L90 59L88 54L83 52L88 50L90 45Z" fill="#10B981" />
      <circle cx="210" cy="80" r="3" fill="#F59E0B" />
      <circle cx="70" cy="110" r="3" fill="#14B8A6" opacity="0.6" />
    </svg>
  );
}
