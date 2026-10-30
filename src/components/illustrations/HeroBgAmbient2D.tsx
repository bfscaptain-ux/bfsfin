import React from "react";

/**
 * HeroBgAmbient2D - Subtle, high-end 2D fintech character ambient background illustration.
 * Flat vector art style (unDraw / Pablo Stanley aesthetic) matching BFS brand colors.
 */
export default function HeroBgAmbient2D({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Soft Radial Ambient Aura */}
        <radialGradient id="heroBgAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
          <stop offset="60%" stopColor="#059669" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0" />
        </radialGradient>

        {/* Emerald Brand Gradient */}
        <linearGradient id="heroEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Gold Coin Gradient */}
        <linearGradient id="heroGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* 1. Large Ambient Aura Glow */}
      <circle cx="340" cy="270" r="230" fill="url(#heroBgAura)" />

      {/* 2. Background Grid & Financial Growth Trendlines */}
      <g opacity="0.35" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4">
        <line x1="80" y1="380" x2="520" y2="380" />
        <line x1="80" y1="300" x2="520" y2="300" />
        <line x1="80" y1="220" x2="520" y2="220" />
        <line x1="80" y1="140" x2="520" y2="140" />
      </g>

      {/* Ascending Trend Line */}
      <path
        d="M 100 360 C 180 340, 240 280, 320 230 C 380 190, 430 160, 500 120"
        stroke="url(#heroEmeraldGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Trendline Area Glow */}
      <path
        d="M 100 360 C 180 340, 240 280, 320 230 C 380 190, 430 160, 500 120 L 500 380 L 100 380 Z"
        fill="url(#heroEmeraldGrad)"
        opacity="0.06"
      />

      {/* Trend Data Nodes */}
      <circle cx="210" cy="305" r="4" fill="#34D399" opacity="0.8" />
      <circle cx="320" cy="230" r="5" fill="#34D399" opacity="0.9" />
      <circle cx="430" cy="160" r="5.5" fill="#10B981" />
      <circle cx="500" cy="120" r="7" fill="#059669" />

      {/* 3. Floating Modern House Outline (Pillar 1) */}
      <g transform="translate(110, 160)" opacity="0.5">
        <rect x="0" y="24" width="70" height="54" rx="8" fill="#0F172A" opacity="0.2" stroke="#10B981" strokeWidth="1.5" />
        <path d="M -6 24 L 35 -6 L 76 24 Z" fill="#0F172A" opacity="0.3" stroke="#10B981" strokeWidth="2" strokeLinejoin="round" />
        <rect x="25" y="46" width="20" height="32" rx="4" fill="#34D399" opacity="0.4" />
        <rect x="10" y="34" width="16" height="16" rx="3" fill="#FCD34D" opacity="0.4" />
        <rect x="44" y="34" width="16" height="16" rx="3" fill="#FCD34D" opacity="0.4" />
      </g>

      {/* 4. Floating Shield (Pillar 2 - Cashless Insurance) */}
      <g transform="translate(470, 220)" opacity="0.55">
        <path d="M 30 0 L 60 12 V 38 C 60 62 30 76 30 76 C 30 76 0 62 0 38 V 12 Z" fill="#064E3B" opacity="0.3" stroke="#34D399" strokeWidth="2" />
        <path d="M 20 36 L 27 44 L 42 28" stroke="#34D399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* 5. Floating Rupee Coins (Pillar 3 - Liquidity & Cards) */}
      <g transform="translate(430, 90)" opacity="0.75">
        <circle cx="20" cy="20" r="18" fill="url(#heroGoldGrad)" />
        <circle cx="20" cy="20" r="14" fill="#F59E0B" />
        <text x="20" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>
      <g transform="translate(90, 290)" opacity="0.55">
        <circle cx="14" cy="14" r="13" fill="url(#heroGoldGrad)" />
        <text x="14" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900" fontFamily="sans-serif">₹</text>
      </g>

      {/* =========================================================================
          6. RELATABLE 2D HUMAN CHARACTERS (Flat Vector Aesthetic matching Brand)
          Character 1: Standing Professional Advisor with Tablet
          Character 2: Delighted Applicant celebrating fast sanction
         ========================================================================= */}

      {/* CHARACTER 1: Advisor (Left-Center) */}
      <g id="AdvisorCharacter" transform="translate(260, 150)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="65" cy="235" rx="38" ry="7" fill="#0F172A" opacity="0.25" />

        {/* Legs - Midnight Slate Trousers */}
        <path d="M 48 140 L 44 225 L 60 225 L 60 140 Z" fill="#1E293B" />
        <path d="M 70 140 L 70 225 L 86 225 L 82 140 Z" fill="#0F172A" />

        {/* Shoes - White Sneakers with Emerald Accents */}
        <path d="M 36 223 Q 48 220 62 223 L 64 233 L 34 233 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <path d="M 68 223 Q 80 220 94 223 L 96 233 L 66 233 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <rect x="42" y="231" width="18" height="2" fill="#10B981" />
        <rect x="74" y="231" width="18" height="2" fill="#10B981" />

        {/* Torso - Cool Grey / Slate Jacket over Crisp White Shirt */}
        <path d="M 40 55 C 40 45, 90 45, 90 55 L 94 142 L 36 142 Z" fill="#334155" />
        {/* White Shirt Collar V */}
        <polygon points="56,54 74,54 65,85" fill="#FFFFFF" />
        {/* Emerald Tie */}
        <polygon points="63,62 67,62 68,105 65,112 62,105" fill="#10B981" />

        {/* Left Arm holding Digital Sanction Tablet */}
        <path d="M 40 60 L 22 100 L 46 112" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        {/* Hand */}
        <circle cx="48" cy="113" r="6" fill="#F3C19D" />
        {/* Tablet */}
        <rect x="36" y="92" width="24" height="34" rx="3" fill="#022C22" stroke="#34D399" strokeWidth="1.5" transform="rotate(-10 48 109)" />
        <circle cx="48" cy="118" r="2" fill="#34D399" />

        {/* Right Arm welcoming gesture */}
        <path d="M 90 60 L 115 88 L 132 80" stroke="#334155" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="134" cy="80" r="6.5" fill="#F3C19D" />

        {/* Neck & Head */}
        <rect x="58" y="38" width="14" height="15" fill="#F3C19D" rx="2" />
        {/* Head */}
        <ellipse cx="65" cy="28" rx="14" ry="16" fill="#F3C19D" />
        {/* Midnight Navy Modern Hair */}
        <path d="M 50 25 C 50 12, 78 8, 80 22 C 80 26, 76 32, 75 34 C 70 30, 52 32, 50 25 Z" fill="#0F172A" />
      </g>

      {/* CHARACTER 2: Delighted Applicant (Right-Center) - Vibrant Red Trousers */}
      <g id="ApplicantCharacter" transform="translate(360, 160)">
        {/* Soft Drop Shadow under feet */}
        <ellipse cx="60" cy="225" rx="36" ry="7" fill="#0F172A" opacity="0.25" />

        {/* Legs - Signature Vibrant Red / Coral Trousers (matching user reference) */}
        <path d="M 42 135 L 36 215 L 54 215 L 56 135 Z" fill="#EF4444" />
        <path d="M 64 135 L 68 215 L 86 215 L 78 135 Z" fill="#DC2626" />

        {/* Shoes - Clean White Sneakers */}
        <path d="M 28 213 Q 40 210 56 213 L 58 223 L 26 223 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <path d="M 66 213 Q 78 210 94 213 L 96 223 L 64 223 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

        {/* Torso - Cool Slate / Soft Grey Pullover (matching user reference) */}
        <path d="M 38 55 C 38 46, 82 46, 82 55 L 84 138 L 36 138 Z" fill="#64748B" />

        {/* Right Arm Raised in Celebration (Sanction Approved!) */}
        <path d="M 82 58 L 105 40 L 115 15" stroke="#64748B" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="116" cy="14" r="6" fill="#F3C19D" />
        {/* Thumbs Up / Key in Hand */}
        <path d="M 116 14 L 126 12 L 129 16 L 122 19 Z" fill="#F59E0B" />
        <circle cx="129" cy="14" r="3.5" fill="none" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Left Arm holding folder */}
        <path d="M 38 58 L 22 92 L 35 106" stroke="#64748B" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="37" cy="108" r="6" fill="#F3C19D" />
        {/* Emerald Approval Folder */}
        <rect x="25" y="96" width="22" height="28" rx="3" fill="#10B981" stroke="#34D399" strokeWidth="1" transform="rotate(12 36 110)" />

        {/* Neck & Head */}
        <rect x="53" y="38" width="14" height="15" fill="#F3C19D" rx="2" />
        <ellipse cx="60" cy="28" rx="13" ry="15" fill="#F3C19D" />
        {/* Contemporary Navy Hair */}
        <path d="M 46 25 C 46 12, 74 10, 74 22 C 74 27, 70 32, 68 33 C 64 30, 48 30, 46 25 Z" fill="#0F172A" />
      </g>

      {/* 7. Celebratory Confetti & Sanction Star Glyphs */}
      <g opacity="0.6">
        <polygon points="340,90 343,98 351,101 343,104 340,112 337,104 329,101 337,98" fill="#F59E0B" />
        <polygon points="490,170 492,175 497,177 492,179 490,184 488,179 483,177 488,175" fill="#34D399" />
        <polygon points="200,240 202,245 207,247 202,249 200,254 198,249 193,247 198,245" fill="#34D399" />
        <circle cx="280" cy="80" r="3" fill="#10B981" />
        <circle cx="400" cy="60" r="2.5" fill="#F59E0B" />
        <circle cx="150" cy="210" r="2.5" fill="#38BDF8" />
        <circle cx="530" cy="280" r="3" fill="#10B981" />
      </g>
    </svg>
  );
}
