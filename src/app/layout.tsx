import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import NavigationProgress from "@/components/NavigationProgress";
import SecurityGuard from "@/components/SecurityGuard";
import MobileInstallPrompt from "@/components/MobileInstallPrompt";
import VisitorTracker from "@/components/VisitorTracker";
import CookieConsent from "@/components/CookieConsent";
export const metadata: Metadata = {
  metadataBase: new URL('https://bfsfin.com'),
  alternates: {
    canonical: './',
  },
  title: {
    default: "Bhardwaj Financial Services (BFS) | Home Loans from 7.15%*, Business Loan & LAP in Agra",
    template: "%s | Bhardwaj Financial Services"
  },
  description: "Agra's premier financial institution at Sanjay Place. Lowest Home Loan ROI starting from 7.15%* p.a., Business Loans up to ₹5 Cr, Loan Against Property (LAP) & Balance Transfer with fast approval.",
  keywords: [
    "Home Loan Agra",
    "Best Home Loan Consultant Agra",
    "Home Loan Agent Agra",
    "Home Loan Sanjay Place Agra",
    "Loan Against Property Agra",
    "Business Loan Agra",
    "Mortgage Loan Agra",
    "Lowest Interest Rate Home Loan 7.15",
    "Cash salary home loan Agra",
    "Home loan without ITR Agra",
    "Balance Transfer Home Loan Agra",
    "Bhardwaj Financial Services",
    "BFS Agra"
  ],
  authors: [{ name: "Bhardwaj Financial Services (BFS)", url: "https://bfsfin.com" }],
  icons: {
    icon: [
      { url: "/favicon.png?v=5", type: "image/png" },
      { url: "/logo.png?v=5", type: "image/png" },
      { url: "/favicon.ico?v=5" }
    ],
    shortcut: "/favicon.png?v=5",
    apple: "/apple-touch-icon.png?v=5",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png?v=5" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=5" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=5" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5" />
        <link rel="shortcut icon" href="/favicon.ico?v=5" />
        <style dangerouslySetInnerHTML={{__html: `
          .goog-te-banner-frame.skiptranslate { display: none !important; }
          .VIpgJd-ZVi9od-aZ2wEe-wOHMyf { display: none !important; }
          .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc { display: none !important; }
          iframe.skiptranslate { display: none !important; visibility: hidden !important; }
          body { top: 0px !important; position: static !important; }
          #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
          .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
          #google_translate_element { display: none !important; }
        `}} />
      </head>
      <body suppressHydrationWarning className="antialiased min-h-screen selection:bg-emerald-200 selection:text-emerald-900 pb-16 xl:pb-0 bg-slate-50 text-slate-900">
        <NavigationProgress />
        <SecurityGuard />
        <MobileInstallPrompt />
        <VisitorTracker />
        <Script
          id="google-translate-hydration-patch"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof Node === "function" && Node.prototype) {
                const originalRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child.parentNode !== this) return child;
                  return originalRemoveChild.apply(this, arguments);
                };
                const originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, referenceNode) {
                  if (referenceNode && referenceNode.parentNode !== this) return newNode;
                  return originalInsertBefore.apply(this, arguments);
                };
              }
            `
          }}
        />
        <div id="google_translate_element"></div>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false,
                  includedLanguages: 'en,hi,mr,gu,pa,bn,ta,te,kn,ml,or,as,ur,ar,es,fr,de,zh-CN,ja,ru,pt,it,ko'
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          type="text/javascript"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
        <ThemeProvider>
          {children}
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
