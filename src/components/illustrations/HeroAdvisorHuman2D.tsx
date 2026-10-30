"use client";

import React from "react";

export default function HeroAdvisorHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Professional Loan Advisor 2D Illustration"
    >
      {/* Background Soft Glow */}
      <circle cx="160" cy="110" r="95" fill="#ECFDF5" opacity="0.8" />
      <path
        d="M50 190L270 190"
        stroke="#E2E8F0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Modern Digital Tablet / Dashboard Screen in background */}
      <rect x="180" y="55" width="105" height="125" rx="10" fill="#0F172A" stroke="#334155" strokeWidth="2" />
      <rect x="190" y="70" width="85" height="35" rx="6" fill="#1E293B" />
      <rect x="195" y="78" width="40" height="4" rx="2" fill="#10B981" />
      <rect x="195" y="86" width="60" height="3" rx="1.5" fill="#64748B" />
      <rect x="195" y="93" width="50" height="3" rx="1.5" fill="#64748B" />
      <circle cx="260" cy="88" r="8" fill="#10B981" />
      <path d="M257 88L259 90L263 86" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Bank Logos / Sanctions Badge */}
      <rect x="190" y="115" width="85" height="24" rx="6" fill="#1E293B" />
      <circle cx="205" cy="127" r="5" fill="#059669" />
      <rect x="216" y="123" width="45" height="3" rx="1.5" fill="#E2E8F0" />
      <rect x="216" y="129" width="30" height="2.5" rx="1" fill="#94A3B8" />

      <rect x="190" y="145" width="85" height="24" rx="6" fill="#1E293B" />
      <circle cx="205" cy="157" r="5" fill="#0D9488" />
      <rect x="216" y="153" width="50" height="3" rx="1.5" fill="#E2E8F0" />
      <rect x="216" y="159" width="35" height="2.5" rx="1" fill="#94A3B8" />

      {/* 2D HUMAN CHARACTER (Undraw Style) */}
      {/* Ground Shadow */}
      <ellipse cx="110" cy="190" rx="42" ry="6" fill="#E2E8F0" />

      {/* Legs (Stylized Pants in Vibrant Red / Coral matching User Sample!) */}
      <path d="M92 125L85 160L75 185L87 185L98 160L105 125Z" fill="#EF4444" />
      <path d="M105 125L118 158L130 185L142 185L128 152L115 125Z" fill="#DC2626" />
      {/* Shoes (Minimalist White Sneakers) */}
      <path d="M70 186L89 186L91 190L68 190C67 190 69 187 70 186Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M127 186L146 186L148 190L125 190C124 190 126 187 127 186Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

      {/* Torso (Stylized Cool Grey Oversized Tunic / Blazer) */}
      <path d="M82 70L122 70L118 130L80 130Z" fill="#CBD5E1" />
      <path d="M88 70L112 70L108 130L84 130Z" fill="#94A3B8" />

      {/* Left Arm (Relaxed gesture) */}
      <path d="M84 73L65 105L74 110L90 80Z" fill="#CBD5E1" />
      <circle cx="63" cy="112" r="6" fill="#C58F68" />

      {/* Right Arm (Gesturing towards Sanction Dashboard) */}
      <path d="M120 74L155 88L150 96L116 83Z" fill="#CBD5E1" />
      <circle cx="158" cy="90" r="6" fill="#C58F68" />

      {/* Neck & Head */}
      <rect x="98" y="55" width="10" height="16" fill="#C58F68" />
      <ellipse cx="103" cy="45" rx="12" ry="15" fill="#C58F68" />

      {/* Hair (Midnight Navy Classic Cut) */}
      <path d="M91 42C91 30 100 25 112 27C118 28 120 35 118 42C116 40 111 40 108 43C106 41 102 41 98 45C96 45 93 47 91 42Z" fill="#1E1B4B" />

      {/* Floating Sparkles & Success Badges */}
      <path d="M55 45L58 52L65 55L58 58L55 65L52 58L45 55L52 52L55 45Z" fill="#10B981" />
      <path d="M290 35L292 40L297 42L292 44L290 49L288 44L283 42L288 40L290 35Z" fill="#F59E0B" />
      <circle cx="170" cy="35" r="3" fill="#10B981" opacity="0.6" />
    </svg>
  );
}
