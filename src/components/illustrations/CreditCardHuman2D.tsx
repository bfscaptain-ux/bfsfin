"use client";

import React from "react";

export default function CreditCardHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Smart Spending Power & Credit Card Illustration"
    >
      {/* Background Soft Glow */}
      <circle cx="160" cy="110" r="95" fill="#F8FAFC" opacity="0.9" />
      <path
        d="M40 190L280 190"
        stroke="#E2E8F0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Floating Giant Luxury Credit Card in Background */}
      <g transform="translate(160, 45) rotate(12)">
        <rect
          x="0"
          y="0"
          width="110"
          height="70"
          rx="8"
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="1.5"
        />
        {/* Gold EMV Chip */}
        <rect x="15" y="20" width="16" height="12" rx="2" fill="#F59E0B" />
        <rect x="18" y="23" width="10" height="6" rx="1" fill="#FEF3C7" opacity="0.8" />
        {/* Contactless Waves */}
        <path d="M40 23C42 25 42 28 40 30" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M43 20C46 24 46 29 43 33" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
        {/* Card Number Mask & Logo */}
        <rect x="15" y="45" width="45" height="3" rx="1.5" fill="#64748B" />
        <circle cx="85" cy="50" r="7" fill="#EF4444" opacity="0.85" />
        <circle cx="95" cy="50" r="7" fill="#F59E0B" opacity="0.85" />
      </g>

      {/* Airplane Silhouette (Airport Lounge Access) */}
      <path
        d="M245 40L260 48L250 50L255 58L250 58L245 52L235 55L245 40Z"
        fill="#94A3B8"
        opacity="0.7"
      />

      {/* 2D HUMAN CHARACTER (Undraw Style - Walking with Bag & Card) */}
      {/* Ground Shadow */}
      <ellipse cx="100" cy="190" rx="45" ry="6" fill="#E2E8F0" />

      {/* Legs (Stylized Pants in Deep Navy / Indigo) */}
      {/* Back Leg */}
      <path
        d="M85 125L75 160L65 183L77 183L88 160L98 125Z"
        fill="#1E293B"
      />
      {/* Back Ankle & Shoe */}
      <rect x="65" y="180" width="8" height="4" fill="#C58F68" />
      <path
        d="M60 184L78 184L80 189L58 189C57 189 59 185 60 184Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Forward Leg (Dynamic Walk) */}
      <path
        d="M98 125L115 155L128 183L140 183L125 152L108 125Z"
        fill="#0F172A"
      />
      {/* Forward Ankle & Shoe */}
      <rect x="128" y="180" width="8" height="4" fill="#C58F68" />
      <path
        d="M125 184L145 184L147 189L123 189C122 189 124 185 125 184Z"
        fill="#F8FAFC"
        stroke="#CBD5E1"
        strokeWidth="1.5"
      />

      {/* Torso (Stylized Emerald Green Polo/Blazer) */}
      <path
        d="M80 70L120 70L115 130L78 130Z"
        fill="#059669"
      />
      {/* Jacket Fold */}
      <path
        d="M86 70L108 70L102 130L82 130Z"
        fill="#047857"
      />

      {/* Left Arm (Holding Travel / Shopping Bag) */}
      <path
        d="M82 72L65 105L74 110L90 80Z"
        fill="#047857"
      />
      <circle cx="63" cy="112" r="6" fill="#C58F68" />
      {/* Shopping / Travel Duffel Bag */}
      <rect x="50" y="115" width="22" height="26" rx="4" fill="#F59E0B" />
      <path d="M56 115V108C56 106 66 106 66 108V115" stroke="#D97706" strokeWidth="2" fill="none" />
      <rect x="58" y="125" width="6" height="4" rx="1" fill="#FEF3C7" />

      {/* Right Arm (Holding up Card to Tap & Pay) */}
      <path
        d="M118 74L148 85L144 94L114 83Z"
        fill="#047857"
      />
      {/* Hand */}
      <circle cx="152" cy="88" r="6" fill="#C58F68" />
      {/* Mini Card in Hand */}
      <rect
        x="150"
        y="78"
        width="22"
        height="14"
        rx="2"
        fill="#0F172A"
        stroke="#F59E0B"
        strokeWidth="1"
        transform="rotate(-15, 150, 78)"
      />

      {/* Neck */}
      <rect x="96" y="56" width="10" height="15" fill="#C58F68" />

      {/* Head */}
      <ellipse cx="101" cy="45" rx="12" ry="15" fill="#C58F68" />

      {/* Hair (Sleek Minimalist Cut) */}
      <path
        d="M89 42C89 30 98 25 110 27C116 28 118 35 116 42C114 40 109 40 106 43C104 41 100 41 96 45C94 45 91 47 89 42Z"
        fill="#1E1B4B"
      />

      {/* Floating Sparkles & Currency Symbols */}
      <path d="M50 45L53 52L60 55L53 58L50 65L47 58L40 55L47 52L50 45Z" fill="#F59E0B" />
      <path d="M190 25L192 30L197 32L192 34L190 39L188 34L183 32L188 30L190 25Z" fill="#10B981" />
      <circle cx="280" cy="110" r="3" fill="#059669" opacity="0.6" />
    </svg>
  );
}
