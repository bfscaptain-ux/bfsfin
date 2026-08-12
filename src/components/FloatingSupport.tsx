"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, PhoneCall, MessageCircle, X, Send, Bot, CheckCircle2, Calculator, GripVertical, ChevronLeft, Rocket, MapPin, FileSearch, ChevronUp, ChevronDown, Percent, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const ICONS = [
  { id: 'chat', label: 'Live Chat', icon: MessageSquare, color: 'text-white', bg: 'bg-gradient-to-br from-indigo-500 to-blue-600 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]', action: 'chat' },
  { id: 'emi', label: 'EMI Calc', icon: Calculator, color: 'text-white', bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 border border-purple-400/30 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]', action: 'href', href: '/calculator' },
  { id: 'apply', label: 'Apply Now', icon: Rocket, color: 'text-white', bg: 'bg-gradient-to-br from-rose-500 to-pink-600 border border-rose-400/30 shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:shadow-[0_0_25px_rgba(244,63,94,0.6)]', action: 'href', href: '/apply' },
  { id: 'elig', label: 'Eligibility', icon: CheckCircle2, color: 'text-white', bg: 'bg-gradient-to-br from-teal-500 to-emerald-600 border border-teal-400/30 shadow-[0_0_15px_rgba(20,184,166,0.4)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)]', action: 'href', href: '/eligibility' },
  { id: 'track', label: 'Track Status', icon: FileSearch, color: 'text-white', bg: 'bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]', action: 'href', href: '/track' },
  { id: 'map', label: 'Locate Office', icon: MapPin, color: 'text-white', bg: 'bg-gradient-to-br from-red-500 to-rose-600 border border-red-400/30 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)]', action: 'href', href: '/contact/locations' },
  { id: 'rates', label: 'Interest Rates', icon: Percent, color: 'text-white', bg: 'bg-gradient-to-br from-cyan-500 to-blue-500 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]', action: 'href', href: '/interest-rates' },
  { id: 'partner', label: 'Partner Login', icon: Briefcase, color: 'text-white', bg: 'bg-gradient-to-br from-fuchsia-500 to-pink-500 border border-fuchsia-400/30 shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:shadow-[0_0_25px_rgba(217,70,239,0.6)]', action: 'href', href: '/partner-dashboard' },
];

export default function FloatingSupport() {
  const router = useRouter();
  const [chatOpen, setChatOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isBursting, setIsBursting] = useState(false);
  const hasAppeared = useRef(false);
  const speedRef = useRef(0.15);
  const targetSpeedRef = useRef(0.15);
  const dragRef = useRef({ isDragging: false, startY: 0, startRot: 0, moved: false });
  
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Namaste! Welcome to BFS Agra." },
    { sender: "bot", text: "🚀 Our Advanced AI Chat Support is launching very soon!" },
    { sender: "bot", text: "In the meantime, please click the WhatsApp or Phone icon at the bottom to talk directly with Mrs. Vinita Sharma's team." }
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

  // Trigger fast spin only on the very first time across the session
  useEffect(() => {
    if (isVisible) {
      const hasSpun = sessionStorage.getItem('bfs_wheel_spun');
      if (!hasSpun && !hasAppeared.current) {
        hasAppeared.current = true;
        speedRef.current = 12.0; 
        targetSpeedRef.current = 12.0; 
        setIsBursting(true); 
        sessionStorage.setItem('bfs_wheel_spun', 'true');
        
        const timer = setTimeout(() => {
          targetSpeedRef.current = 0.15; 
          setIsBursting(false); 
        }, 1200);
        return () => clearTimeout(timer);
      }
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
    // Chat is coming soon, do nothing
  };

  return (
    <>
      {/* Expanded Chat Box */}
      {chatOpen && (
        <div className="fixed bottom-[140px] right-6 lg:bottom-[100px] lg:right-[90px] z-[210] w-[90%] sm:w-[380px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[480px] max-h-[70vh] transition-all duration-300 animate-in slide-in-from-bottom-10 fade-in-0 origin-bottom-right">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-blue-600 p-4 text-white flex items-center justify-between shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center shadow-inner">
                  <Bot className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <h3 className="text-base font-bold leading-tight flex items-center gap-2">
                  BFS Support 
                  <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full border border-white/30 tracking-wider">COMING SOON</span>
                </h3>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" /> Maintenance Mode
                </p>
              </div>
            </div>
            <button 
              onClick={() => setChatOpen(false)} 
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors relative z-10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-[#0B1121] relative flex flex-col scroll-smooth" id="chat-messages-container">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
            
            <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium my-2 uppercase tracking-widest">Today</div>

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mr-2 mt-auto mb-1 flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                <div className={`max-w-[75%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm ${m.sender === "user" ? "bg-emerald-600 text-white rounded-br-sm" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700/50 rounded-bl-sm"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative z-20 opacity-70 cursor-not-allowed">
            <div className="flex items-center gap-2 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-full p-1.5 transition-all shadow-inner">
              <input 
                type="text" 
                value="" 
                disabled
                onChange={() => {}} 
                placeholder="Live Chat is launching soon..." 
                className="flex-1 bg-transparent border-none px-3 py-1.5 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-0 placeholder:text-slate-500 cursor-not-allowed" 
              />
              <button 
                type="submit" 
                disabled
                className="bg-slate-300 dark:bg-slate-700 text-white w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 cursor-not-allowed"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
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
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 border border-emerald-300 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/60 hover:scale-110 transition-all duration-300 z-[51] animate-in zoom-in duration-300 group"
            title="Support & Quick Tools"
          >
            <div className="absolute inset-0 bg-white rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 relative z-10 animate-[bounce_3s_infinite]" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full animate-pulse z-20" />
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
              className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/40 text-white backdrop-blur-md flex flex-col items-center justify-center shadow-lg hover:bg-rose-500 transition-colors z-10 cursor-pointer pointer-events-auto touch-none"
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
                    <div className="absolute right-full mr-3 sm:mr-4 px-2 py-1 sm:px-3 sm:py-1 bg-slate-900 dark:bg-slate-800 text-white text-[9px] sm:text-[10px] font-bold rounded-md opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 whitespace-nowrap shadow-xl border border-slate-700 hidden sm:block">
                      {item.label}
                      <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-800 rotate-45 border-t border-r border-slate-700"></div>
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
