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
    default: "Home Loan in Agra | Bhardwaj Financial Services – Expert Loan Advisor",
    template: "%s | Bhardwaj Financial Services"
  },
  description: "Agra's premier financial institution at Sanjay Place. Lowest Home Loan ROI starting from 7.15%* p.a., Business Loans up to ₹5 Cr, Loan Against Property (LAP) & Balance Transfer with fast 5-day approval.",
  keywords: [
    "home loan in Agra",
    "home loan agent in Agra",
    "home loan consultant Agra",
    "best home loan Agra",
    "home loan DSA Agra",
    "home loan interest rate 2026",
    "home loan eligibility calculator",
    "home loan EMI calculator",
    "home loan documents required",
    "home loan for salaried / self-employed",
    "home loan for salaried",
    "home loan for self-employed",
    "home loan balance transfer",
    "home loan top up",
    "LAP (loan against property) Agra",
    "plot loan / construction loan Agra",
    "plot loan Agra",
    "construction loan Agra",
    "home loan for first-time buyers",
    "low interest home loan",
    "home loan approval fast",
    "SBI / HDFC / ICICI / Axis home loan Agra",
    "SBI home loan Agra",
    "HDFC home loan Agra",
    "ICICI home loan Agra",
    "Axis home loan Agra",
    "financial advisor in Agra",
    "loan advisor Agra",
    "loan consultant near me",
    "financial consultant Agra",
    "loan broker in Agra",
    "best financial services in Agra",
    "CIBIL score improvement advice",
    "loan planning consultant",
    "Agra mein home loan kaise le",
    "ghar ke liye loan Agra",
    "sabse sasta home loan",
    "home loan ke liye kitni salary chahiye",
    "loan agent near me",
    "ghar kharidne ke liye loan",
    "CIBIL score kam ho to loan milega kya",
    "home loan near me",
    "loan consultant near Sanjay Place",
    "loan consultant near Kamla Nagar",
    "loan consultant near Sikandra",
    "loan consultant near Dayalbagh",
    "financial services Agra Uttar Pradesh",
    "Bhardwaj Financial Services",
    "BFS Agra",
    "Praveen Bhardwaj loan consultant Agra",
    "Cash salary home loan Agra",
    "Home loan without ITR Agra"
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
