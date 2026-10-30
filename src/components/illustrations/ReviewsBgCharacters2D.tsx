import React from "react";

/**
 * ReviewsBgCharacters2D - Ambient 2D Character Background Artwork for
 * "Client Success Stories" (ReviewsSection).
 * Features: Relatable 2D Clients celebrating 5-star reviews, Google rating badges,
 * and glowing celebration stars.
 */

export function ReviewsLeftBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="revLeftGlow" cx="40%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="revGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="150" cy="220" r="150" fill="url(#revLeftGlow)" />

      {/* Floating 5-Star Speech Bubble */}
      <g opacity="0.45" transform="translate(30, 60)">
        <rect x="0" y="0" width="120" height="46" rx="10" fill="#022C22" stroke="#34D399" strokeWidth="1.5" />
        <polygon points="25,46 35,46 22,58" fill="#022C22" stroke="#34D399" strokeWidth="1.5" />
        {/* 5 Golden Stars inside Bubble */}
        {[0, 1, 2, 3, 4].map((i) => (
          <polygon
            key={i}
            points="7,0 9,5 14,5 10,8 12,13 7,10 2,13 4,8 0,5 5,5"
            fill="url(#revGoldGrad)"
            transform={`translate(${14 + i * 20}, 16)`}
          />
        ))}
      </g>

      {/* Floating Golden Stars */}
      <polygon points="200,80 203,88 211,91 203,94 200,102 197,94 189,91 197,88" fill="#F59E0B" opacity="0.6" />
      <polygon points="30,220 32,226 38,228 32,230 30,236 28,230 22,228 28,226" fill="#34D399" opacity="0.5" />

      {/* 2D HUMAN CHARACTER: Delighted Client giving Double Thumbs-Up */}
      <g id="ReviewerCharacter" transform="translate(90, 130)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="65" cy="265" rx="42" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Signature Vibrant Red Trousers (Brand Reference) */}
        <path d="M 44 150 L 38 255 L 56 255 L 58 150 Z" fill="#EF4444" />
        <path d="M 68 150 L 70 255 L 88 255 L 82 150 Z" fill="#DC2626" />

        {/* Shoes: Clean White Sneakers */}
        <path d="M 30 253 Q 42 250 58 253 L 60 263 L 28 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 253 Q 80 250 96 253 L 98 263 L 66 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate / Grey Pullover */}
        <path d="M 38 60 C 38 50, 88 50, 88 60 L 90 152 L 36 152 Z" fill="#475569" />

        {/* Right Arm Raised Thumbs Up */}
        <path d="M 88 65 L 115 45 L 126 20" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="127" cy="20" r="6" fill="#F3C19D" />
        {/* Golden Thumbs Up Badge */}
        <circle cx="127" cy="20" r="9" fill="#F59E0B" opacity="0.25" />
        <path d="M 127 20 L 135 15 L 137 19 L 131 23 Z" fill="#F59E0B" />

        {/* Left Arm: Holding Review Tablet / Star Badge */}
        <path d="M 38 65 L 14 96 L 30 116" stroke="#475569" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="118" r="6" fill="#F3C19D" />
        {/* Star Badge */}
        <circle cx="32" cy="118" r="12" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
        <polygon points="32,110 34,115 39,115 35,118 37,123 32,120 27,123 29,118 25,115 30,115" fill="#FCD34D" />

        {/* Neck & Head */}
        <rect x="56" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="63" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Midnight Navy Hair */}
        <path d="M 48 28 C 48 14, 78 11, 78 26 C 78 30, 74 35, 72 37 C 67 33, 51 33, 48 28 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}

export function ReviewsRightBg2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 340 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="revRightGlow" cx="60%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ambient Aura */}
      <circle cx="170" cy="200" r="150" fill="url(#revRightGlow)" />

      {/* Floating Google Review Shield Outline */}
      <g opacity="0.4" transform="translate(160, 60)">
        <rect x="0" y="0" width="85" height="42" rx="8" fill="#0F172A" stroke="#34D399" strokeWidth="1.5" />
        <text x="42" y="24" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">4.9 ★★★★★</text>
        <text x="42" y="35" textAnchor="middle" fill="#34D399" fontSize="8" fontWeight="700" fontFamily="sans-serif">VERIFIED</text>
      </g>

      {/* 2D HUMAN CHARACTER: Happy Homeowner Couple / Family Representative */}
      <g id="ReviewsCouple" transform="translate(70, 130)">
        {/* Drop Shadow */}
        <ellipse cx="65" cy="265" rx="38" ry="7" fill="#0F172A" opacity="0.2" />

        {/* Legs: Deep Slate Trousers */}
        <path d="M 46 150 L 42 255 L 60 255 L 60 150 Z" fill="#1E293B" />
        <path d="M 70 150 L 70 255 L 88 255 L 84 150 Z" fill="#0F172A" />

        {/* Shoes */}
        <path d="M 34 253 Q 46 250 62 253 L 64 263 L 32 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 253 Q 80 250 96 253 L 98 263 L 66 263 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />

        {/* Torso: Cool Slate Grey Jacket with Emerald Accent */}
        <path d="M 38 60 C 38 50, 92 50, 92 60 L 94 152 L 36 152 Z" fill="#334155" />
        <polygon points="56,58 74,58 65,90" fill="#FFFFFF" />
        <polygon points="63,66 67,66 68,105 65,112 62,105" fill="#10B981" />

        {/* Left Arm: Welcoming Hand Gesture */}
        <path d="M 92 65 L 115 95 L 130 85" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="132" cy="85" r="6" fill="#F3C19D" />

        {/* Right Arm: Holding 5-Star Recommendation Certificate */}
        <path d="M 38 65 L 15 98 L 32 118" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="34" cy="120" r="6" fill="#F3C19D" />
        {/* Certificate */}
        <rect x="20" y="105" width="24" height="32" rx="3" fill="#047857" stroke="#34D399" strokeWidth="1.5" transform="rotate(-10 32 121)" />
        <circle cx="32" cy="121" r="5" fill="#FCD34D" />

        {/* Neck & Head */}
        <rect x="58" y="42" width="14" height="16" fill="#F3C19D" rx="2" />
        <ellipse cx="65" cy="30" rx="14" ry="16" fill="#F3C19D" />
        {/* Navy Hair */}
        <path d="M 50 27 C 50 14, 80 11, 80 25 C 80 30, 76 35, 74 37 C 69 33, 53 33, 50 27 Z" fill="#0F172A" />
      </g>
    </svg>
  );
}
