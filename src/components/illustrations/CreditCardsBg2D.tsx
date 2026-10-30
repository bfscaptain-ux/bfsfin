import React from "react";

/**
 * CreditCardsBg2D - Ambient 2D Character Background Art for
 * "Smart Spending Power & Privilege" (Credit Cards Showcase).
 * Features: Stylish Lifestyle Traveler with Airport Lounge Access Card,
 * Travel Duffel, 5% Cashback Gold Coins, and Rewards Stars.
 */

export function CreditCardsLeftBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ccLeftGlow" cx="40%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ccGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="160" cy="220" r="150" fill="url(#ccLeftGlow)" />

      {/* Floating Airport Airplane & Lounge Badge */}
      <g opacity="0.4" transform="translate(40, 60)">
        <rect x="0" y="0" width="100" height="40" rx="8" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" />
        <path d="M 18 20 L 32 15 L 36 20 L 26 22 L 32 25 L 28 26 L 22 23 L 18 24 Z" fill="#FCD34D" />
        <text x="42" y="24" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="sans-serif">VIP LOUNGE</text>
      </g>

      {/* Floating 5% Cashback Coins */}
      <g opacity="0.6" transform="translate(220, 80)">
        <circle cx="18" cy="18" r="16" fill="url(#ccGoldGrad)" />
        <text x="18" y="22" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900" fontFamily="sans-serif">5%</text>
        <text x="18" y="29" textAnchor="middle" fill="#FFFFFF" fontSize="6" fontWeight="700" fontFamily="sans-serif">CASHBACK</text>
      </g>

      {/* 2D HUMAN CHARACTER: Lifestyle Traveler / Smart Spender */}
      <g id="CreditCardTraveler" transform="translate(90, 130)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="65" cy="265" rx="42" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Signature Vibrant Red Trousers (Brand Reference) */}
        <path d="M 44 150 L 36 255 L 54 255 L 58 150 Z" fill="#EF4444" />
        <path d="M 68 150 L 72 255 L 90 255 L 82 150 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 28 253 Q 40 250 56 253 L 58 263 L 26 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 70 253 Q 82 250 98 253 L 100 263 L 68 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate Grey Pullover with Teal Scarf */}
        <path d="M 38 60 C 38 50, 88 50, 88 60 L 90 152 L 36 152 Z" fill="#475569" />
        <rect x="52" y="58" width="22" height="6" rx="2" fill="#10B981" />

        {/* Left Arm: Holding Premium Travel Duffel Bag */}
        <path d="M 38 65 L 14 96 L 22 130" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="22" cy="132" r="6" fill="#F3C19D" />
        {/* Duffel Bag */}
        <rect x="8" y="132" width="30" height="20" rx="6" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" />
        <path d="M 16 132 C 16 126, 30 126, 30 132" stroke="#34D399" strokeWidth="1.5" fill="none" />

        {/* Right Arm: Tapping Contactless Credit Card */}
        <path d="M 88 65 L 115 45 L 128 22" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="129" cy="22" r="6" fill="#F3C19D" />
        {/* Luxury Obsidian Card */}
        <rect x="124" y="8" width="32" height="20" rx="3" fill="#0F172A" stroke="#FCD34D" strokeWidth="1.2" transform="rotate(15 140 18)" />
        <circle cx="140" cy="18" r="2.5" fill="#FCD34D" />

        {/* Neck & Head */}
        <rect x="56" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="63" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Midnight Navy Hair */}
        <path d="M 48 28 C 48 14, 78 11, 78 26 C 78 30, 74 35, 72 37 C 67 33, 51 33, 48 28 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function CreditCardsRightBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ccRightGlow" cx="60%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="170" cy="210" r="150" fill="url(#ccRightGlow)" />

      {/* Floating Card Perks Watermark */}
      <g opacity="0.4" transform="translate(160, 60)">
        <rect x="0" y="0" width="90" height="45" rx="8" fill="#022C22" stroke="#34D399" strokeWidth="1.5" />
        <text x="45" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" fontFamily="sans-serif">₹0 ANNUAL FEE</text>
        <text x="45" y="34" textAnchor="middle" fill="#FCD34D" fontSize="8" fontWeight="700" fontFamily="sans-serif">LIFETIME FREE</text>
      </g>

      {/* 2D HUMAN CHARACTER: Confident Cardholder presenting Privilege Card */}
      <g id="PrivilegeCardholder" transform="translate(80, 130)">
        {/* Drop Shadow */}
        <ellipse cx="65" cy="265" rx="38" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Deep Slate Trousers */}
        <path d="M 46 150 L 42 255 L 60 255 L 60 150 Z" fill="#1E293B" />
        <path d="M 70 150 L 70 255 L 88 255 L 84 150 Z" fill="#0F172A" />

        {/* Shoes */}
        <path d="M 34 253 Q 46 250 62 253 L 64 263 L 32 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 253 Q 80 250 96 253 L 98 263 L 66 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate / Grey Blazer with Emerald Tie */}
        <path d="M 38 60 C 38 50, 92 50, 92 60 L 94 152 L 36 152 Z" fill="#334155" />
        <polygon points="56,58 74,58 65,90" fill="#FFFFFF" />
        <polygon points="63,66 67,66 68,105 65,112 62,105" fill="#10B981" />

        {/* Left Arm: Welcoming Hand */}
        <path d="M 92 65 L 115 95 L 130 85" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="132" cy="85" r="6" fill="#F3C19D" />

        {/* Right Arm: Holding Metal Credit Card */}
        <path d="M 38 65 L 15 98 L 32 118" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="120" r="6" fill="#F3C19D" />
        {/* Card */}
        <rect x="18" y="108" width="30" height="20" rx="3" fill="#022C22" stroke="#34D399" strokeWidth="1.5" transform="rotate(-12 33 118)" />
        <rect x="23" y="114" width="6" height="5" rx="1" fill="#FCD34D" transform="rotate(-12 33 118)" />

        {/* Neck & Head */}
        <rect x="58" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="65" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Navy Hair */}
        <path d="M 50 27 C 50 14, 80 11, 80 25 C 80 30, 76 35, 74 37 C 69 33, 53 33, 50 27 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
