"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmartBot from "@/components/SmartBot";
import { Bot, Zap, ShieldCheck } from "lucide-react";

export default function ClientPage() {
  return (
    <div className="h-[calc(100dvh-64px)] xl:h-[100dvh] bg-white flex flex-col font-sans overflow-hidden">
      <Header />
      
      <main className="flex-1 w-full max-w-4xl mx-auto relative flex flex-col h-full overflow-hidden border-x border-slate-100">
        <SmartBot isOpen={true} onClose={() => {}} inline={true} />
      </main>
    </div>
  );
}
