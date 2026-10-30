import React from "react";

/**
 * LoanPortfolioBg2D - Ambient 2D Character Background Vectors for
 * the 6-Product Loan Portfolio Grid Section.
 * Left: Dynamic Business Entrepreneur with growth chart & collateral-free badge.
 * Right: Smiling Property Owner with Title Deed & Approval Stars.
 */

export function LoanPortfolioLeftBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="loanLeftGlow" cx="40%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="150" cy="220" r="150" fill="url(#loanLeftGlow)" />

      {/* Background Business Growth Bar Graph */}
      <g opacity="0.3" transform="translate(30, 90)">
        <rect x="0" y="60" width="14" height="40" rx="3" fill="#10B981" />
        <rect x="22" y="45" width="14" height="55" rx="3" fill="#10B981" />
        <rect x="44" y="28" width="14" height="72" rx="3" fill="#34D399" />
        <rect x="66" y="10" width="14" height="90" rx="3" fill="#059669" />
        <path d="M 5 55 L 28 40 L 50 24 L 75 6" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 3" />
      </g>

      {/* 2D HUMAN CHARACTER: Entrepreneur / Business Professional */}
      <g id="PortfolioEntrepreneur" transform="translate(90, 140)">
        {/* Soft Drop Shadow */}
        <ellipse cx="65" cy="255" rx="42" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Vibrant Red Trousers (User Reference Style) */}
        <path d="M 44 148 L 38 245 L 56 245 L 58 148 Z" fill="#EF4444" />
        <path d="M 68 148 L 70 245 L 88 245 L 82 148 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 30 243 Q 42 240 58 243 L 60 253 L 28 253 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 243 Q 80 240 96 243 L 98 253 L 66 253 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Grey Pullover with White Collar */}
        <path d="M 38 58 C 38 48, 86 48, 86 58 L 88 150 L 36 150 Z" fill="#475569" />
        <polygon points="56,57 68,57 62,72" fill="#FFFFFF" />

        {/* Right Arm: Holding Business Briefcase / Portfolio */}
        <path d="M 38 64 L 16 98 L 18 128" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="130" r="6" fill="#F3C19D" />
        {/* Modern Briefcase */}
        <rect x="6" y="132" width="26" height="20" rx="3" fill="#1E293B" stroke="#34D399" strokeWidth="1.2" />
        <path d="M 14 132 V 127 H 24 V 132" stroke="#34D399" strokeWidth="1.2" fill="none" />

        {/* Left Arm: Confident Thumbs-Up Gesture */}
        <path d="M 86 64 L 112 85 L 126 78" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="128" cy="78" r="6" fill="#F3C19D" />
        {/* Thumbs Up */}
        <path d="M 128 78 L 136 72 L 138 77 L 132 82 Z" fill="#F3C19D" />

        {/* Neck & Head */}
        <rect x="55" y="40" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="62" cy="28" rx="14" ry="16" fill="#F3C19D" />
        {/* Navy Hair */}
        <path d="M 47 26 C 47 12, 77 9, 77 24 C 77 28, 73 33, 71 35 C 66 31, 50 31, 47 26 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function LoanPortfolioRightBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="loanRightGlow" cx="60%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="loanGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="160" cy="200" r="150" fill="url(#loanRightGlow)" />

      {/* Floating Gold Coins & Sanction Star */}
      <g opacity="0.6" transform="translate(200, 80)">
        <circle cx="18" cy="18" r="16" fill="url(#loanGoldGrad)" />
        <text x="18" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>
      <polygon points="70,90 73,98 81,101 73,104 70,112 67,104 59,101 67,98" fill="#F59E0B" opacity="0.6" />

      {/* Floating House & Property Deed Outline */}
      <g opacity="0.35" transform="translate(190, 160)">
        <polygon points="35,5 70,30 0,30" fill="#047857" opacity="0.2" stroke="#10B981" strokeWidth="1.5" />
        <rect x="8" y="30" width="54" height="40" rx="3" fill="#047857" opacity="0.1" stroke="#10B981" strokeWidth="1.5" />
        <rect x="25" y="45" width="14" height="25" rx="2" fill="#34D399" opacity="0.4" />
      </g>

      {/* 2D HUMAN CHARACTER: Delighted Property / Loan Applicant */}
      <g id="PortfolioApplicant" transform="translate(90, 130)">
        {/* Soft Drop Shadow */}
        <ellipse cx="65" cy="265" rx="40" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Signature Vibrant Red Trousers */}
        <path d="M 44 150 L 38 250 L 56 250 L 58 150 Z" fill="#EF4444" />
        <path d="M 68 150 L 70 250 L 88 250 L 82 150 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 30 248 Q 42 245 58 248 L 60 258 L 28 258 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 248 Q 80 245 96 248 L 98 258 L 66 258 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate Grey Top */}
        <path d="M 38 60 C 38 50, 86 50, 86 60 L 88 152 L 36 152 Z" fill="#64748B" />

        {/* Left Arm: Holding High-Value Property Sanction Folder */}
        <path d="M 38 66 L 16 98 L 30 118" stroke="#64748B" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="120" r="6" fill="#F3C19D" />
        {/* Emerald Approval Document */}
        <rect x="20" y="104" width="24" height="32" rx="3" fill="#047857" stroke="#34D399" strokeWidth="1.5" transform="rotate(12 32 120)" />

        {/* Right Arm: Raised Celebrating Keys / Success */}
        <path d="M 86 66 L 115 45 L 126 18" stroke="#64748B" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="127" cy="17" r="6" fill="#F3C19D" />
        {/* Golden House Key */}
        <path d="M 127 17 L 140 14 L 143 19 L 134 22 Z" fill="#F59E0B" />
        <circle cx="143" cy="17" r="4" fill="none" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Neck & Head */}
        <rect x="55" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="62" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Navy Hair */}
        <path d="M 47 28 C 47 14, 77 11, 77 26 C 77 30, 73 35, 71 37 C 66 33, 50 33, 47 28 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
