import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import NavigationProgress from "@/components/NavigationProgress";
import SecurityGuard from "@/components/SecurityGuard";
import MobileInstallPrompt from "@/components/MobileInstallPrompt";
import VisitorTracker from "@/components/VisitorTracker";
import CookieConsent from "@/components/CookieConsent";
import FloatingHomeButton from "@/components/FloatingHomeButton";
export const metadata: Metadata = {
  title: "BFS AGRA — Enterprise Home Loan Portal | Vineeta Sharma",
  description: "Agra's #1 Home Loan Portal. Approved in 5 Days! ₹20L to ₹1Cr+ starting @ 6.50% p.a. Direct priority partner for PNB, Central Bank of India, IDBI & HDFC.",
  keywords: ["Home Loan Agra", "PNB Home Loan Rate Agra", "Balance Transfer Agra", "BFS Agra", "Vineeta Sharma", "Low interest home loan UP"],
  authors: [{ name: "Bhardwaj Financial Services (BFS AGRA)" }],
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png" },
      { url: "/logo.png?v=2", type: "image/png" },
      { url: "/favicon.ico?v=2" }
    ],
    shortcut: "/favicon.png?v=2",
    apple: "/logo.png?v=2",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="icon" type="image/png" sizes="192x192" href="/logo.png?v=3" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png?v=3" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png?v=3" />
        <link rel="shortcut icon" href="/logo.png?v=3" />
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
      <body className="antialiased min-h-screen selection:bg-emerald-200 selection:text-emerald-900 pb-16 xl:pb-0 bg-slate-50 text-slate-900">
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
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="lazyOnload"
        />
        <ThemeProvider>
          {children}
          <CookieConsent />
          <FloatingHomeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
