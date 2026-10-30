import React from "react";

/**
 * B2BPartnerHuman2D - Relatable 2D Illustration for B2B Channel Partner / DSA Portal (/partner).
 * Features: Professional Channel Partner & BFS Senior Executive sealing a partnership
 * with handshake, institutional loan portfolio ledger, and rising commission growth charts.
 */
export default function B2BPartnerHuman2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="partnerAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="payoutGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* 1. Ambient Background Aura */}
      <circle cx="260" cy="170" r="150" fill="url(#partnerAura)" />

      {/* 2. Growth Bar Chart & Payout Arrows in Background */}
      <g opacity="0.3" transform="translate(180, 50)">
        <rect x="0" y="70" width="16" height="50" rx="3" fill="#10B981" />
        <rect x="24" y="50" width="16" height="70" rx="3" fill="#10B981" />
        <rect x="48" y="30" width="16" height="90" rx="3" fill="#34D399" />
        <rect x="72" y="10" width="16" height="110" rx="3" fill="#059669" />
        <path d="M 8 65 L 32 45 L 56 25 L 80 5" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 3" />
      </g>

      {/* Floating Payout Commission Coins */}
      <g opacity="0.7" transform="translate(370, 70)">
        <circle cx="16" cy="16" r="14" fill="url(#payoutGold)" />
        <text x="16" y="21" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>
      <g opacity="0.5" transform="translate(120, 80)">
        <circle cx="12" cy="12" r="10" fill="url(#payoutGold)" />
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>

      {/* 3. Drop Shadows */}
      <ellipse cx="170" cy="275" rx="42" ry="7" fill="#0F172A" opacity="0.2" />
      <ellipse cx="350" cy="275" rx="42" ry="7" fill="#0F172A" opacity="0.2" />

      {/* 4. LEFT CHARACTER: Channel Partner / DSA Consultant (Red Trousers, Grey Top) */}
      <g id="ChannelPartner" transform="translate(110, 110)">
        {/* Legs: Signature Vibrant Red Trousers */}
        <path d="M 44 95 L 38 160 L 54 160 L 56 95 Z" fill="#EF4444" />
        <path d="M 66 95 L 68 160 L 84 160 L 78 95 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 30 158 Q 42 155 56 158 L 58 165 L 28 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 66 158 Q 78 155 92 158 L 94 165 L 64 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate Grey Pullover */}
        <path d="M 38 35 C 38 28, 84 28, 84 35 L 86 98 L 36 98 Z" fill="#475569" />

        {/* Left Arm: Holding Client Loan Files */}
        <path d="M 38 40 L 16 65 L 26 80" stroke="#475569" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="82" r="5" fill="#F3C19D" />
        {/* Emerald File Folder */}
        <rect x="15" y="70" width="22" height="26" rx="2" fill="#059669" stroke="#34D399" strokeWidth="1.2" transform="rotate(-10 26 83)" />

        {/* Right Arm: Extended for Corporate Handshake */}
        <path d="M 84 40 L 112 58 L 138 58" stroke="#475569" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="140" cy="58" r="5" fill="#F3C19D" />

        {/* Head & Hair */}
        <rect x="54" y="22" width="12" height="14" fill="#F3C19D" rx="2" />
        <ellipse cx="60" cy="14" rx="12" ry="13" fill="#F3C19D" />
        <path d="M 48 12 C 48 2, 72 0, 72 10 C 72 14, 68 17, 66 19 C 62 16, 50 16, 48 12 Z" fill="#0F172A" />
      </g>

      {/* 5. RIGHT CHARACTER: BFS Senior Relationship Manager (Executive Suit) */}
      <g id="BFSExecutive" transform="translate(290, 110)">
        {/* Legs: Deep Slate Navy Trousers */}
        <path d="M 44 95 L 40 160 L 56 160 L 56 95 Z" fill="#1E293B" />
        <path d="M 66 95 L 66 160 L 82 160 L 78 95 Z" fill="#0F172A" />

        {/* Shoes */}
        <path d="M 32 158 Q 44 155 58 158 L 60 165 L 30 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 64 158 Q 76 155 90 158 L 92 165 L 62 165 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Executive Navy Blazer with Emerald Tie */}
        <path d="M 38 35 C 38 28, 86 28, 86 35 L 88 98 L 36 98 Z" fill="#334155" />
        <polygon points="54,34 70,34 62,60" fill="#FFFFFF" />
        <polygon points="60,40 64,40 65,72 62,77 59,72" fill="#10B981" />

        {/* Left Arm: Extended for Corporate Handshake */}
        <path d="M 38 40 L 10 58 L -16 58" stroke="#334155" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="-18" cy="58" r="5" fill="#F3C19D" />

        {/* Right Arm: Welcoming gesture */}
        <path d="M 86 40 L 108 62 L 122 55" stroke="#334155" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="124" cy="55" r="5" fill="#F3C19D" />

        {/* Head & Hair */}
        <rect x="56" y="22" width="12" height="14" fill="#F3C19D" rx="2" />
        <ellipse cx="62" cy="14" rx="12" ry="13" fill="#F3C19D" />
        <path d="M 50 12 C 50 2, 74 0, 74 10 C 74 14, 70 17, 68 19 C 64 16, 52 16, 50 12 Z" fill="#0F172A" />
      </g>

      {/* 6. Handshake Center Glow */}
      <circle cx="261" cy="168" r="8" fill="#10B981" opacity="0.4" />
      <polygon points="261,162 263,166 267,166 264,169 265,173 261,171 257,173 258,169 255,166 259,166" fill="#FCD34D" />
    </svg>
  );
}
