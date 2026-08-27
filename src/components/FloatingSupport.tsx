"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, PhoneCall, MessageCircle, X, Send, Bot, CheckCircle2, Calculator, GripVertical, ChevronLeft, Rocket, MapPin, FileSearch, ChevronUp, ChevronDown, Mail } from "lucide-react";
import { useRouter } from "next/navigation";


export default function FloatingSupport({ contactPhone, whatsappPhone }: { contactPhone?: string, whatsappPhone?: string }) {
  const router = useRouter();
  const ICONS = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, color: 'text-white', bg: 'bg-gradient-to-br from-green-500 to-emerald-600 border border-green-400/30 shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)]', action: 'href', href: `https://wa.me/${whatsappPhone?.replace(/[^0-9]/g, "") || "917900979001"}` },
    { id: 'call', label: 'Call Us', icon: PhoneCall, color: 'text-white', bg: 'bg-gradient-to-br from-emerald-500 to-cyan-600 border border-emerald-400/30 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]', action: 'href', href: `tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}` },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare, color: 'text-white', bg: 'bg-gradient-to-br from-indigo-500 to-emerald-600 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]', action: 'chat' },
    { id: 'emi', label: 'EMI Calc', icon: Calculator, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]', action: 'href', href: '/calculator' },
    { id: 'apply', label: 'Apply Now', icon: Rocket, color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-pink-600 border border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]', action: 'href', href: '/apply' },
    { id: 'elig', label: 'Eligibility', icon: CheckCircle2, color: 'text-white', bg: 'bg-gradient-to-br from-teal-500 to-emerald-600 border border-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]', action: 'href', href: '/eligibility' },
    { id: 'track', label: 'Track Status', icon: FileSearch, color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]', action: 'href', href: '/track' },
    { id: 'contact', label: 'Contact Us', icon: Mail, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-rose-600 border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]', action: 'href', href: '/contact' },
  ];

  const [chatOpen, setChatOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isWheelOpen, setIsWheelOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBursting, setIsBursting] = useState(false);
  const hasAppeared = useRef(false);
  const speedRef = useRef(0.04);
  const targetSpeedRef = useRef(0.04);
  const dragRef = useRef({ isDragging: false, startY: 0, startRot: 0, moved: false });
  
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! Welcome to BFS Agra. Looking for a Home Loan in Agra?" },
    { sender: "bot", text: "Our rates start at 6.50% p.a. with 5-day approval guarantee. How can I help you today?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  // Scroll listener to hide wheel at Header and Footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide if at the very top (nav area) or very bottom (footer area)
      const isAtTop = scrollY < 150;
      const isAtBottom = scrollY + windowHeight > documentHeight - 150;
      
      setIsVisible(!isAtTop && !isAtBottom);
    };

    const handleResize = () => setIsMobile(window.innerWidth < 640);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Check on mount
    handleResize(); // Check on mount
    
    return () => {
       window.removeEventListener("scroll", handleScroll);
       window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Trigger fast spin on first appearance
  useEffect(() => {
    if (isVisible && !hasAppeared.current) {
      hasAppeared.current = true;
      speedRef.current = 4.0; // A high, controlled fast speed
      targetSpeedRef.current = 4.0; 
      setIsBursting(true); // Enable burst glow and scale
      const timer = setTimeout(() => {
        targetSpeedRef.current = 0.04; // Smoothly decelerate
        setIsBursting(false); // Fade out glow and return to normal scale
      }, 1200); // 1.2s burst phase
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!dragRef.current.isDragging) return;
      const deltaY = e.clientY - dragRef.current.startY;
      
      if (Math.abs(deltaY) > 5) {
        dragRef.current.moved = true; // Mark as dragged to prevent accidental clicks
      }
      
      // 1px drag = 0.5 degrees rotation. Negative deltaY (dragging up) rotates wheel clockwise
      setRotation(dragRef.current.startRot - deltaY * 0.5);
    };

    const handlePointerUp = () => {
      dragRef.current.isDragging = false;
      document.body.style.userSelect = 'auto'; // Restore text selection
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWheelOpen && !isHovered) {
      interval = setInterval(() => {
        if (!dragRef.current.isDragging) {
          // Smoothly interpolate current speed towards target speed (0.02 gives a silky roulette slide)
          speedRef.current = speedRef.current + (targetSpeedRef.current - speedRef.current) * 0.02;
          setRotation(prev => prev - speedRef.current);
        }
      }, 16); // ~60fps
    }
    return () => clearInterval(interval);
  }, [isWheelOpen, isHovered]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { isDragging: true, startY: e.clientY, startRot: rotation, moved: false };
    document.body.style.userSelect = 'none'; // Prevent highlighting text while dragging wheel
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Mouse wheel scrolling: 1 unit = roughly 1 degree
    setRotation(prev => prev - e.deltaY * 0.2);
  };

  const handleItemClick = (e: React.MouseEvent, item: typeof ICONS[0]) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      return; // Ignore click if we were dragging
    }
    
    if (item.action === 'chat') {
      setChatOpen(!chatOpen);
    } else if (item.href) {
      if (item.href.startsWith('http') || item.href.startsWith('tel')) {
        window.open(item.href, '_blank');
      } else {
        router.push(item.href);
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    setMessages(prev => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: `Thank you! Vineeta Sharma's team will contact you shortly regarding "${userText}". You can also call us directly at 7900-979-001.` }
      ]);
    }, 800);
  };

  return (
    <>

      {/* Bottom Right Direct Buttons */}
      <div className="fixed bottom-24 md:bottom-6 right-4 md:right-8 z-[100] flex flex-col gap-4">
        <a 
          href={`https://wa.me/${whatsappPhone?.replace(/[^0-9]/g, "") || "917900979001"}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all group border border-green-400/30"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
        </a>

        <a 
          href={`tel:${contactPhone?.replace(/[^0-9+]/g, "") || "+917900979001"}`}
          className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.5)] flex items-center justify-center hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.8)] transition-all group border border-emerald-400/30 animate-[bounce_3s_infinite]"
          title="Call Us Directly"
        >
          <PhoneCall className="w-6 h-6 text-white" />
        </a>
      </div>
      {/* Expanded Chat Box (Floats Bottom Right) */}
      {chatOpen && (
        <div className="fixed bottom-24 md:bottom-6 right-4 md:right-8 z-[60] w-[90%] sm:w-96 bg-emerald-900 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[420px] transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in-0">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-3 text-slate-950 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-950 p-1 flex items-center justify-center">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-white">BFS Agra Loan Assistant</div>
                <div className="text-[10px] text-emerald-200 flex items-center gap-1 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Online (Wait time &lt; 1 min)
                </div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-white hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-emerald-950/80 text-xs">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-xl p-2.5 leading-relaxed ${m.sender === "user" ? "bg-emerald-500 text-slate-950 font-medium rounded-br-none" : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-2.5 bg-emerald-900 border-t border-emerald-800 flex items-center gap-2">
            <input type="text" value={inputMsg} onChange={(e) => setInputMsg(e.target.value)} placeholder="Ask about rate, eligibility or status..." className="flex-1 bg-emerald-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500" />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2 rounded-xl font-bold transition"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      )}

      {/* DRAGGABLE DIAL MENU (Right Edge) */}
      <div 
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ease-in-out ${isVisible ? 'translate-x-0 opacity-100 visible' : 'translate-x-[150px] opacity-0 invisible'}`} 
        style={{ width: '0px' }}
      >
        
        {/* Closed State Trigger (Visible when wheel is closed) */}
        {!isWheelOpen && (
          <button 
            onClick={() => setIsWheelOpen(true)}
            className="group absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-[#0f172a] border border-slate-100 dark:border-emerald-800 rounded-full flex items-center justify-center shadow-[0_0_30px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 z-[51] animate-in zoom-in duration-300 hover:scale-110"
            title="Open Tools"
          >
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Outer high-tech rotating rings */}
              <div className="absolute inset-1.5 sm:inset-2 border-2 border-slate-100 dark:border-slate-800 rounded-full animate-[spin_6s_linear_infinite] border-t-emerald-500 border-l-emerald-500/20"></div>
              <div className="absolute inset-2.5 sm:inset-3 border-2 border-slate-50 dark:border-slate-800/50 rounded-full animate-[spin_4s_linear_infinite_reverse] border-b-teal-500 border-r-teal-500/20"></div>
              
              {/* Inner Dynamic Grid */}
              <div className="w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] grid grid-cols-2 gap-1 sm:gap-1.5 rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative z-10">
                <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[4px] shadow-sm"></div>
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-[4px] shadow-sm scale-75 group-hover:scale-100 transition-transform duration-300 delay-75"></div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-[4px] shadow-sm scale-75 group-hover:scale-100 transition-transform duration-300 delay-150"></div>
                <div className="bg-gradient-to-br from-teal-300 to-teal-500 rounded-[4px] shadow-sm"></div>
              </div>
            </div>
          </button>
        )}

        {/* The rotating wheel wrapper (handles scale visibility) */}
        <div 
           className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-right ${!isWheelOpen ? 'scale-50 opacity-0 pointer-events-none' : isBursting ? 'scale-[1.05] opacity-100 drop-shadow-[0_0_40px_rgba(16,185,129,0.8)]' : 'scale-100 opacity-100 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]'}`}
           style={{ 
             width: isMobile ? '220px' : '300px', 
             height: isMobile ? '220px' : '300px',
             right: isMobile ? '-110px' : '-150px' 
           }}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           onTouchStart={() => setIsHovered(true)}
           onTouchEnd={() => {
              // Only resume rotation on touch end if we aren't dragging
              setTimeout(() => setIsHovered(false), 2000); 
           }}
           onWheel={handleWheel} // Mouse wheel support
        >


          {/* The actual rotating wheel (Transparent Hit Area) */}
          <div 
            className={`w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing bg-transparent rounded-full flex items-center justify-center touch-none`}
            style={{ transform: `rotate(${rotation}deg)` }}
            onPointerDown={handlePointerDown}
          >
            {/* Center Hub (Close Button) */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsWheelOpen(false); }}
              onPointerDown={(e) => { e.stopPropagation(); handlePointerDown(e); }}
              className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-900/40 text-white backdrop-blur-md flex flex-col items-center justify-center shadow-lg hover:bg-rose-500 transition-colors z-10 cursor-pointer pointer-events-auto touch-none"
              style={{ transform: `rotate(${-rotation}deg)` }} // Counter-rotate so X is always upright
              title="Close Menu"
            >
               <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Icons positioned on the ring */}
            {ICONS.map((item, i) => {
              const angle = (i * 45) + 180; // 360 degrees / 8 items = 45 degrees apart
              const radius = isMobile ? 85 : 110; // Responsive radius
              const rad = angle * (Math.PI / 180);
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div 
                  key={`${item.id}-${i}`}
                  className="absolute"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Counter-rotation wrapper */}
                  <div className="group relative flex items-center justify-center" style={{ transform: `rotate(${-rotation}deg)` }}>
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 sm:mr-4 px-2 py-1 sm:px-3 sm:py-1 bg-emerald-900 dark:bg-slate-800 text-white text-[9px] sm:text-[10px] font-bold rounded-md opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap shadow-xl border border-slate-700 hidden sm:block">
                      {item.label}
                      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-emerald-900 dark:bg-slate-800 rotate-45 border-t border-r border-slate-700"></div>
                    </div>

                    {/* Icon Button */}
                    <div 
                      onPointerDown={handlePointerDown}
                      onClick={(e) => handleItemClick(e, item)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 border ${item.bg} ${item.color} cursor-grab active:cursor-grabbing pointer-events-auto touch-none ${isBursting ? 'shadow-[0_0_20px_rgba(16,185,129,0.8)]' : ''}`}
                    >
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
