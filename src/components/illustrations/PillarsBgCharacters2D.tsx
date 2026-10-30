import React from "react";

/**
 * PillarsBgCharacters2D - Flanking 2D Character Background Art for
 * "One Trusted Partner. Three Financial Pillars." section.
 * Left Flank: Celebrating couple/family with home keys & wealth growth.
 * Right Flank: Confident fintech advisor with portfolio tablet & protection aura.
 */

export function PillarsLeftBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pillarsLeftGlow" cx="40%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="leftGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Ambient Radial Aura */}
      <circle cx="160" cy="220" r="150" fill="url(#pillarsLeftGlow)" />

      {/* Floating Modern House Outline */}
      <g opacity="0.35" transform="translate(40, 60)">
        <polygon points="50,10 100,45 0,45" fill="#047857" opacity="0.2" stroke="#10B981" strokeWidth="1.5" />
        <rect x="12" y="45" width="76" height="55" rx="4" fill="#047857" opacity="0.1" stroke="#10B981" strokeWidth="1.5" />
        <rect x="24" y="55" width="18" height="18" rx="2" fill="#FCD34D" opacity="0.4" />
        <rect x="58" y="55" width="18" height="18" rx="2" fill="#FCD34D" opacity="0.4" />
        <rect x="42" y="75" width="16" height="25" rx="2" fill="#34D399" opacity="0.5" />
      </g>

      {/* Floating Rupee Coins */}
      <g opacity="0.6" transform="translate(220, 90)">
        <circle cx="18" cy="18" r="16" fill="url(#leftGoldGrad)" />
        <text x="18" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>
      <g opacity="0.4" transform="translate(30, 240)">
        <circle cx="12" cy="12" r="11" fill="url(#leftGoldGrad)" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>

      {/* Ascending Trend Arc */}
      <path
        d="M 20 340 C 80 320, 140 260, 220 180 C 260 140, 290 100, 310 60"
        stroke="#34D399"
        strokeWidth="2.5"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.45"
      />
      <circle cx="220" cy="180" r="4.5" fill="#10B981" opacity="0.8" />
      <circle cx="310" cy="60" r="5" fill="#059669" opacity="0.9" />

      {/* 2D HUMAN CHARACTER: Delighted Homeowner with Key & Thumbs Up */}
      <g id="PillarsHomeowner" transform="translate(100, 140)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="65" cy="245" rx="40" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Signature Vibrant Red Trousers (Matching User Reference) */}
        <path d="M 46 145 L 40 235 L 58 235 L 60 145 Z" fill="#EF4444" />
        <path d="M 70 145 L 72 235 L 90 235 L 84 145 Z" fill="#DC2626" />

        {/* White Sneakers */}
        <path d="M 32 233 Q 44 230 60 233 L 62 243 L 30 243 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 70 233 Q 82 230 98 233 L 100 243 L 68 243 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate Grey Jacket/Pullover */}
        <path d="M 40 58 C 40 48, 88 48, 88 58 L 90 148 L 38 148 Z" fill="#475569" />

        {/* Raised Right Arm with Golden Key */}
        <path d="M 88 62 L 115 42 L 124 16" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="125" cy="15" r="6" fill="#F3C19D" />
        {/* Golden House Key */}
        <path d="M 125 15 L 138 12 L 141 17 L 132 20 Z" fill="#F59E0B" />
        <circle cx="141" cy="15" r="4" fill="none" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Left Arm holding Approval Folder */}
        <path d="M 40 62 L 20 98 L 36 114" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="116" r="6" fill="#F3C19D" />
        {/* Emerald Sanction Document */}
        <rect x="25" y="102" width="22" height="30" rx="3" fill="#059669" stroke="#34D399" strokeWidth="1.5" transform="rotate(10 36 117)" />

        {/* Neck & Head */}
        <rect x="57" y="40" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="64" cy="28" rx="14" ry="16" fill="#F3C19D" />
        {/* Midnight Navy Hair */}
        <path d="M 49 26 C 49 12, 79 9, 79 24 C 79 28, 74 33, 72 35 C 67 31, 51 31, 49 26 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function PillarsRightBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pillarsRightGlow" cx="60%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Radial Aura */}
      <circle cx="160" cy="200" r="150" fill="url(#pillarsRightGlow)" />

      {/* Floating Medical Protection Shield Outline */}
      <g opacity="0.35" transform="translate(190, 70)">
        <path d="M 28 0 L 56 12 V 36 C 56 60 28 74 28 74 C 28 74 0 60 0 36 V 12 Z" fill="#064E3B" opacity="0.3" stroke="#34D399" strokeWidth="2" />
        <path d="M 18 35 L 25 42 L 39 26" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating Credit Card Outline */}
      <g opacity="0.45" transform="translate(40, 110)">
        <rect x="0" y="0" width="70" height="44" rx="6" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" transform="rotate(-8 35 22)" />
        <rect x="8" y="12" width="12" height="9" rx="1.5" fill="#FCD34D" transform="rotate(-8 35 22)" />
        <line x1="8" y1="28" x2="48" y2="28" stroke="#34D399" strokeWidth="1.5" transform="rotate(-8 35 22)" />
      </g>

      {/* 2D HUMAN CHARACTER: Financial Advisor / Protection Specialist */}
      <g id="PillarsAdvisor" transform="translate(90, 130)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="65" cy="255" rx="38" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Deep Slate Trousers */}
        <path d="M 46 150 L 42 245 L 60 245 L 60 150 Z" fill="#1E293B" />
        <path d="M 70 150 L 70 245 L 88 245 L 84 150 Z" fill="#0F172A" />

        {/* Shoes: White & Slate Sneakers */}
        <path d="M 34 243 Q 46 240 62 243 L 64 253 L 32 253 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 243 Q 80 240 96 243 L 98 253 L 66 253 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <rect x="42" y="251" width="18" height="2" fill="#10B981" />
        <rect x="74" y="251" width="18" height="2" fill="#10B981" />

        {/* Torso: Cool Slate / Grey Blazer with Emerald Tie */}
        <path d="M 38 60 C 38 50, 92 50, 92 60 L 94 152 L 36 152 Z" fill="#334155" />
        <polygon points="56,58 74,58 65,90" fill="#FFFFFF" />
        <polygon points="63,66 67,66 68,110 65,118 62,110" fill="#10B981" />

        {/* Right Arm: Presenting gesture towards the 3 pillars */}
        <path d="M 38 65 L 12 95 L 0 88" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="0" cy="88" r="6" fill="#F3C19D" />

        {/* Left Arm: Holding Digital Multi-Bank Tablet */}
        <path d="M 92 65 L 115 95 L 98 114" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="96" cy="116" r="6" fill="#F3C19D" />
        {/* Tablet */}
        <rect x="85" y="98" width="26" height="36" rx="3" fill="#022C22" stroke="#34D399" strokeWidth="1.5" transform="rotate(8 98 116)" />
        <circle cx="98" cy="126" r="2.5" fill="#34D399" />

        {/* Neck & Head */}
        <rect x="58" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="65" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Midnight Navy Hair */}
        <path d="M 50 27 C 50 14, 80 10, 80 24 C 80 29, 76 34, 74 36 C 69 32, 53 32, 50 27 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
