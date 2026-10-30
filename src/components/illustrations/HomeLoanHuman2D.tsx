"use client";

import React from "react";

export default function HomeLoanHuman2D({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Home Loan & Finance Illustration"
    >
      {/* Background Soft Glow & Geometry */}
      <circle cx="160" cy="110" r="95" fill="#ECFDF5" opacity="0.8" />
      <path
        d="M200 170L280 170"
        stroke="#E2E8F0"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Modern Minimalist House Silhouette */}
      <path
        d="M190 170V105L245 65L300 105V170H190Z"
        fill="#F1F5F9"
        stroke="#CBD5E1"
        strokeWidth="2"
      />
      <path
        d="M245 60L185 105H200L245 72L290 105H305L245 60Z"
        fill="#059669"
      />
      {/* House Door & Window */}
      <rect x="233" y="125" width="24" height="45" rx="3" fill="#10B981" opacity="0.9" />
      <rect x="205" y="115" width="18" height="18" rx="2" fill="#BAE6FD" />
      <rect x="267" y="115" width="18" height="18" rx="2" fill="#BAE6FD" />
      {/* Chimney */}
      <rect x="275" y="70" width="12" height="20" rx="1" fill="#047857" />

      {/* Floating Key (Approved) */}
      <g transform="translate(145, 60)">
        <circle cx="12" cy="12" r="8" fill="#F59E0B" />
        <circle cx="12" cy="12" r="4" fill="#FEF3C7" />
        <path d="M12 20V36H18V30H22V24H12" fill="#F59E0B" />
        <circle cx="6" cy="6" r="1.5" fill="#FCD34D" />
      </g>

      {/* 2D HUMAN CHARACTER (Undraw / Humaaans Style) */}
      {/* Shadow */}
      <ellipse cx="110" cy="195" rx="45" ry="7" fill="#E2E8F0" />

      {/* Left Leg (Back) */}
      <path
        d="M95 130L90 175L72 188L76 193L102 182L105 135Z"
        fill="#EF4444"
      />
      {/* Left Shoe */}
      <path
        d="M68 188L84 186L86 193L65 195C64 195 65 190 68 188Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />

      {/* Right Leg (Forward / Dynamic Step) */}
      <path
        d="M110 128L130 162L135 186L148 186L143 158L122 126Z"
        fill="#DC2626"
      />
      {/* Right Foot Ankle Skin */}
      <path d="M135 183H145V188H135Z" fill="#C58F68" />
      {/* Right Shoe */}
      <path
        d="M132 188H155C158 188 159 191 157 194C155 196 150 196 130 195L132 188Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />

      {/* Torso & Shirt (Minimalist Cool Grey/Slate with relaxed fit) */}
      <path
        d="M80 72L125 76L122 135L88 132Z"
        fill="#E2E8F0"
      />
      {/* Front Jacket Fold */}
      <path
        d="M86 73L115 76L112 134L84 131Z"
        fill="#CBD5E1"
      />

      {/* Left Arm & Reaching Hand */}
      <path
        d="M84 75L55 105L65 112L90 85Z"
        fill="#CBD5E1"
      />
      <path
        d="M55 105L42 118C39 121 43 124 46 122L58 114L65 112Z"
        fill="#C58F68"
      />

      {/* Right Arm & Hand pointing to Key / House */}
      <path
        d="M118 78L150 90L158 84L128 72Z"
        fill="#CBD5E1"
      />
      <path
        d="M150 90L168 94C172 95 174 91 170 89L158 84Z"
        fill="#C58F68"
      />

      {/* Neck */}
      <path d="M98 58H108V74H98Z" fill="#C58F68" />

      {/* Head */}
      <ellipse cx="103" cy="46" rx="13" ry="16" fill="#C58F68" />

      {/* Hair (Modern Navy Geometric Haircut) */}
      <path
        d="M90 44C90 32 98 26 112 28C118 29 120 35 118 42C116 41 113 41 110 43C108 41 104 40 100 45C97 45 93 47 90 44Z"
        fill="#1E1B4B"
      />
      {/* Hair Sideburn */}
      <path d="M93 44L95 50L98 48Z" fill="#1E1B4B" />

      {/* Decorative Floating Sanction Stars */}
      <path d="M70 40L73 48L81 51L73 54L70 62L67 54L59 51L67 48L70 40Z" fill="#10B981" />
      <path d="M175 35L177 41L183 43L177 45L175 51L173 45L167 43L173 41L175 35Z" fill="#F59E0B" />
      <circle cx="215" cy="45" r="3" fill="#10B981" opacity="0.6" />
    </svg>
  );
}
