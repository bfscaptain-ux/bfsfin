import React from 'react';

export interface MasterSeoSchemaProps {
  citySlug?: string;        // e.g., "agra", "lucknow", "delhi", "mathura"
  cityName?: string;        // e.g., "Agra", "Lucknow", "Delhi", "Mathura"
  stateName?: string;       // e.g., "Uttar Pradesh", "Delhi", "Rajasthan"
  subLocationSlug?: string; // e.g., "home-loan-in-sanjay-place-agra"
  subLocationTitle?: string;// e.g., "Home Loan in Sanjay Place, Agra"
  areaName?: string;        // e.g., "Sanjay Place, Agra"
  loanType?: string;        // e.g., "Home Loan", "Business Loan", "Loan Against Property"
}

export default function MasterSeoSchema({
  citySlug,
  cityName,
  stateName = "Uttar Pradesh",
  subLocationSlug,
  subLocationTitle,
  areaName,
  loanType = "Home Loan & Financial Advisory",
}: MasterSeoSchemaProps = {}) {
  const targetArea = areaName || cityName;
  const isLocationPage = Boolean(citySlug && cityName);

  const locationPageUrl = isLocationPage
    ? subLocationSlug
      ? `https://bfsfin.com/locations/${citySlug!.toLowerCase()}/${subLocationSlug}`
      : `https://bfsfin.com/locations/${citySlug!.toLowerCase()}`
    : "https://bfsfin.com";

  const graph: Record<string, unknown>[] = [
    // =========================================================================
    // 1. PRIMARY ORGANIZATION & MORTGAGE CONSULTANCY ENTITY
    // =========================================================================
    {
      "@type": ["FinancialService", "MortgageBroker", "LoanOrCredit"],
      "@id": "https://bfsfin.com/#organization",
      "name": "Bhardwaj Financial Services",
      "legalName": "Bhardwaj Financial Services",
      "alternateName": [
        "BFS",
        "BFS Finance",
        "BFS Loan Consultancy",
        "Bhardwaj Financial Services Agra",
        "भारद्वाज फाइनेंशियल सर्विसेज"
      ],
      "url": "https://bfsfin.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://bfsfin.com/#logo",
        "url": "https://bfsfin.com/logo.png",
        "caption": "Bhardwaj Financial Services - Home Loan, LAP & Business Loan India"
      },
      "image": "https://bfsfin.com/logo.png",
      "telephone": "+91-9258724227",
      "priceRange": "₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Bank Transfer, UPI, NEFT, RTGS, Cheque, Digital Banking",
      "founder": {
        "@type": "Person",
        "name": "Adv. Praveen Bhardwaj",
        "jobTitle": "Founder & Managing Director",
        "url": "https://bfsfin.com/about/founder"
      },
      "description": "Bhardwaj Financial Services (bfsfin.com) is Agra's premier Home Loan, Mortgage & Financial Consultancy headquartered in Sanjay Place, Agra. Offering Pan-India loan processing across 30+ Banks & NBFCs (SBI, HDFC, ICICI, PNB, Bank of Baroda, Central Bank, LIC HFL, Kotak).",
      "slogan": "Financial Solutions You Can Trust — Lowest Interest Rate Loans in Agra & Across India",

      // Verified Rooftop Coordinates for Sanjay Place, Agra HQ
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Block-C11, Shop No.-5, First Floor, Near MK Tailor, Sanjay Place",
        "addressLocality": "Agra",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "282002",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.199777,
        "longitude": 78.006699
      },
      "hasMap": "https://www.google.com/maps?q=27.199777,78.006699",

      // Operating Hours (10:00 AM to 8:00 PM Daily)
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "10:00",
          "closes": "20:00"
        }
      ],

      // Contact & Helpdesk
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9258724227",
          "contactType": "customer service",
          "url": "https://bfsfin.com/contact",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+91-9258724227",
          "contactType": "sales",
          "url": "https://bfsfin.com/appointment",
          "areaServed": "IN",
          "availableLanguage": ["en", "hi"]
        }
      ],

      // Official Verified External Profiles (No Fake Wikidata)
      "sameAs": [
        "https://www.facebook.com/bhardwajfinancialservices",
        "https://www.instagram.com/praveenbhardwajagra/",
        "https://x.com/praveenagra22",
        "https://wa.me/919286683232"
      ],

      "keywords": [
        "Home Loan", "Housing Loan", "Lowest Interest Rate Home Loan India", "Home Loan Provider Near Me",
        "Loan Against Property", "LAP Loan", "Property Mortgage Loan", "Commercial Property Loan",
        "Home Loan Balance Transfer", "Mortgage Refinancing", "Top Up Loan", "Reduce Home Loan EMI",
        "Business Loan", "MSME Loan", "Working Capital Loan", "CC OD Limit", "Machinery Loan",
        "Personal Loan", "Instant Personal Loan", "Education Loan", "Car Loan", "Gold Loan",
        "SBI Home Loan Agent", "HDFC Home Loan DSA", "PNB Home Loan Consultant", "ICICI Home Loan",
        "Best Loan Agency in Agra", "Loan Consultant Sanjay Place Agra", "CIBIL Score Improvement",
        "होम लोन", "प्रॉपर्टी पर लोन", "बिज़नेस लोन", "बैलेंस ट्रांसफर", "कम ब्याज दर पर होम लोन"
      ].join(", "),

      "knowsAbout": [
        "Home Loans & Housing Finance",
        "Loan Against Property (LAP)",
        "Home Loan Balance Transfer & Top-Up",
        "MSME & Unsecured Business Loans",
        "Commercial Property Loans & CC/OD Limits",
        "Machinery & Equipment Financing",
        "CIBIL Score Analysis & Multi-Bank Loan Comparison"
      ],

      // Product & Service Offerings
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Pan-India Loan & Financial Products Catalog",
        "url": "https://bfsfin.com/products",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Home Loan",
              "url": "https://bfsfin.com/products/home-loan",
              "description": "Lowest interest rate home loans starting from 7.15%* p.a. with 30-year tenure and doorstep service."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Loan Against Property (LAP)",
              "url": "https://bfsfin.com/products/loan-against-property",
              "description": "High-value mortgage loan against residential, commercial, or industrial property up to ₹15 Crores."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Home Loan Balance Transfer",
              "url": "https://bfsfin.com/products/balance-transfer",
              "description": "Transfer existing high-interest loans to lower ROI slabs starting 7.15%* and reduce monthly EMI."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Business Loan",
              "url": "https://bfsfin.com/products/business-loan",
              "description": "Collateral-free MSME & commercial business loans up to ₹1 Crore with quick 48-hour sanctions."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Commercial Property Loan",
              "url": "https://bfsfin.com/products/commercial-property-loan",
              "description": "Finance commercial shops, office spaces, warehouses, and plazas up to ₹25 Crores."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Working Capital Overdraft / CC Limit",
              "url": "https://bfsfin.com/products/overdraft-cash-credit-limit",
              "description": "Cash Credit (CC) and Overdraft (OD) facilities to optimize daily operational enterprise liquidity."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Machinery Loan",
              "url": "https://bfsfin.com/products/machinery-loan",
              "description": "Industrial machinery and plant equipment financing with up to 85% asset funding."
            }
          }
        ]
      },

      // Conversion CTA Actions
      "potentialAction": [
        {
          "@type": "ApplyAction",
          "name": "Apply Online for Loan",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://bfsfin.com/apply",
            "inLanguage": ["en-IN", "hi-IN"]
          }
        },
        {
          "@type": "ReserveAction",
          "name": "Book Free Loan Consultation Appointment",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://bfsfin.com/appointment",
            "inLanguage": ["en-IN", "hi-IN"]
          }
        }
      ]
    },

    // =========================================================================
    // 2. WEBSITE ENTITY
    // =========================================================================
    {
      "@type": "WebSite",
      "@id": "https://bfsfin.com/#website",
      "url": "https://bfsfin.com",
      "name": "Bhardwaj Financial Services",
      "alternateName": ["BFS Finance", "bfsfin.com"],
      "publisher": { "@id": "https://bfsfin.com/#organization" },
      "inLanguage": ["en-IN", "hi-IN"]
    },

    // =========================================================================
    // 3. COMPLETE 10 PARTNER BANKS & FINANCIAL CALCULATORS (SITELINKS ENGINE)
    // =========================================================================
    {
      "@type": "ItemList",
      "@id": "https://bfsfin.com/#financial-tools",
      "name": "BFS Online Loan Calculators & Top Bank Partners",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Loan EMI Calculator", "url": "https://bfsfin.com/calculator" },
        { "@type": "ListItem", "position": 2, "name": "Balance Transfer Calculator", "url": "https://bfsfin.com/tools/balance-transfer" },
        { "@type": "ListItem", "position": 3, "name": "Multi-Bank Interest Rate Compare", "url": "https://bfsfin.com/tools/interest-rate-compare" },
        { "@type": "ListItem", "position": 4, "name": "State Bank of India (SBI) Loans", "url": "https://bfsfin.com/banks/sbi" },
        { "@type": "ListItem", "position": 5, "name": "HDFC Bank Loans", "url": "https://bfsfin.com/banks/hdfc" },
        { "@type": "ListItem", "position": 6, "name": "ICICI Bank Loans", "url": "https://bfsfin.com/banks/icici" },
        { "@type": "ListItem", "position": 7, "name": "Punjab National Bank (PNB) Loans", "url": "https://bfsfin.com/banks/pnb" },
        { "@type": "ListItem", "position": 8, "name": "Bank of Baroda Loans", "url": "https://bfsfin.com/banks/bank-of-baroda" },
        { "@type": "ListItem", "position": 9, "name": "Axis Bank Loans", "url": "https://bfsfin.com/banks/axis-bank" },
        { "@type": "ListItem", "position": 10, "name": "LIC Housing Finance Loans", "url": "https://bfsfin.com/banks/lic-housing-finance" },
        { "@type": "ListItem", "position": 11, "name": "Kotak Mahindra Bank Loans", "url": "https://bfsfin.com/banks/kotak-mahindra-bank" },
        { "@type": "ListItem", "position": 12, "name": "Bajaj Housing Finance Loans", "url": "https://bfsfin.com/banks/bajaj-housing-finance" },
        { "@type": "ListItem", "position": 13, "name": "Central Bank of India Loans", "url": "https://bfsfin.com/banks/central-bank" }
      ]
    }
  ];

  // ===========================================================================
  // 4. DYNAMIC LOCATION SPECIFIC SCHEMA (For /locations/* Pages)
  // ===========================================================================
  if (isLocationPage && targetArea) {
    const pageTitle =
      subLocationTitle ||
      `Best ${loanType} in ${targetArea} | Bhardwaj Financial Services`;

    graph.push(
      {
        "@type": "WebPage",
        "@id": `${locationPageUrl}#webpage`,
        "url": locationPageUrl,
        "name": pageTitle,
        "description": `Compare and apply online for the lowest interest rate ${loanType} in ${targetArea} via Bhardwaj Financial Services (bfsfin.com).`,
        "isPartOf": { "@id": "https://bfsfin.com/#website" },
        "about": { "@id": "https://bfsfin.com/#organization" },
        "breadcrumb": { "@id": `${locationPageUrl}#breadcrumb` },
        "inLanguage": ["en-IN", "hi-IN"]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${locationPageUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bfsfin.com" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://bfsfin.com/contact/locations" },
          { "@type": "ListItem", "position": 3, "name": `Loans in ${cityName}`, "item": `https://bfsfin.com/locations/${citySlug!.toLowerCase()}` },
          ...(subLocationSlug
            ? [{ "@type": "ListItem", "position": 4, "name": subLocationTitle || targetArea, "item": locationPageUrl }]
            : [])
        ]
      },
      {
        "@type": "Service",
        "@id": `${locationPageUrl}#service`,
        "name": `${loanType} in ${targetArea}`,
        "serviceType": loanType,
        "provider": { "@id": "https://bfsfin.com/#organization" },
        "areaServed": {
          "@type": areaName ? "Place" : "City",
          "name": targetArea,
          "containedInPlace": { "@type": "AdministrativeArea", "name": stateName }
        },
        "keywords": [
          `${loanType} in ${targetArea}`,
          `Best Loan Agent in ${targetArea}`,
          `Loan Against Property in ${targetArea}`,
          `Home Loan Balance Transfer in ${targetArea}`,
          `Business Loan in ${targetArea}`,
          `${targetArea} mein loan kaise milega`
        ].join(", ")
      },
      {
        "@type": "FAQPage",
        "@id": `${locationPageUrl}#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How can I get the lowest interest rate ${loanType} in ${targetArea}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Through Bhardwaj Financial Services (bfsfin.com), borrowers in ${targetArea} can compare live loan offers across 30+ leading banks including SBI, HDFC, PNB, ICICI, and Bank of Baroda with zero hidden consultancy charges.`
            }
          },
          {
            "@type": "Question",
            "name": `Does Bhardwaj Financial Services provide doorstep service in ${targetArea}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, our dedicated loan advisors provide complete doorstep document pickup, digital loan file submission, and priority bank sanction across ${targetArea}. Call +91-9258724227 or WhatsApp +91-9286683232 or apply online at https://bfsfin.com/apply.`
            }
          }
        ]
      }
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
