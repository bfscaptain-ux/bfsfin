"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, UserCheck, Briefcase, Lock, Mail, Key, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, User, Building, Phone } from "lucide-react";
import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { State, City } from 'country-state-city';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"client" | "partner" | "admin">("client");
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Registration State
  const [regName, setRegName] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCompany, setRegCompany] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regState, setRegState] = useState("");
  const [regStateIso, setRegStateIso] = useState("");
  const [regPincode, setRegPincode] = useState("");
  const [regPan, setRegPan] = useState("");
  const [regProfession, setRegProfession] = useState("");
  const [regExperience, setRegExperience] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginAction(email, password, role);
      if (result.success) {
        if (role === "admin") router.push("/admin/dashboard");
        else if (role === "partner") router.push("/partner-dashboard");
        else router.push("/portal/customer");
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/partner/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email,
          phone: regPhone,
          companyName: regCompany,
          city: regCity,
          state: regState,
          pincode: regPincode,
          panNumber: regPan,
          profession: regProfession,
          experienceYears: regExperience
        })
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Registration successful! Your request has been sent to Admin for approval.");
        setIsRegistering(false); // flip back to login
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-50 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-sm transition-all hover:-translate-x-1"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Home
      </Link>

      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-1/4 w-[150%] h-full bg-gradient-to-br from-emerald-100/40 via-blue-50/20 to-transparent dark:from-emerald-950/30 dark:via-blue-950/10 rounded-full blur-3xl transform -rotate-12"></div>
        <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-gradient-to-tl from-emerald-200/30 to-transparent dark:from-emerald-900/20 blur-3xl rounded-full"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center">
        
        {/* Left Branding Panel */}
        <div className={`hidden lg:flex flex-col justify-center pr-12 transition-all duration-500 ${isRegistering ? 'lg:col-span-5' : 'lg:col-span-6'}`}>
          <Link href="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Bhardwaj Finance" className="h-16 object-contain drop-shadow-sm" />
          </Link>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6 tracking-tight">
            Welcome to your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
              Financial Hub
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed max-w-md">
            Secure, transparent, and lightning-fast portal for our esteemed clients and valued partners.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-sm">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                <Briefcase className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">Exclusive Partner Access</span>
            </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className={`w-full mx-auto lg:ml-auto transition-all duration-500 ${isRegistering ? 'lg:col-span-7 max-w-2xl' : 'lg:col-span-6 max-w-md'}`}>
          <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl p-8 sm:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.07)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white dark:border-slate-800/60 relative">
            
            {/* Mobile Logo Fallback */}
            <div className="lg:hidden mb-8 flex justify-center">
              <img src="/logo.png" alt="BFS" className="h-12 object-contain" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {isRegistering ? "Become a Partner" : "Secure Login"}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                {isRegistering ? "Join our elite network of financial partners." : "Please select your portal and authenticate."}
              </p>
            </div>

            {/* Role Toggle Tabs (Hide if registering) */}
            {!isRegistering && (
              <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl mb-8 relative border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
                {[
                  { id: "client", label: "Client", icon: UserCheck },
                  { id: "partner", label: "Partner", icon: Briefcase },
                  { id: "admin", label: "Admin", icon: Lock },
                ].map((r) => {
                  const Icon = r.icon;
                  const isActive = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-300 relative z-10 ${
                        isActive 
                          ? "text-slate-900 dark:text-white bg-white dark:bg-slate-800 shadow-sm" 
                          : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className="w-4 h-4 hidden sm:block" /> {r.label}
                    </button>
                  );
                })}
              </div>
            )}

            {error && (
              <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-xl flex items-start gap-2 animate-in fade-in zoom-in duration-300">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <p className="text-sm font-semibold text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}
            
            {success && (
              <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 rounded-xl flex items-start gap-2 animate-in fade-in zoom-in duration-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{success}</p>
              </div>
            )}

            {/* FORM AREA */}
            {isRegistering ? (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Personal */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Personal Details</h3>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" required value={regName} onChange={(e) => setRegName(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Full Name" />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Email Address" />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="tel" required value={regPhone} onChange={(e) => setRegPhone(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Phone Number" />
                    </div>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" value={regPan} onChange={(e) => setRegPan(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none uppercase" placeholder="PAN Number" />
                    </div>
                  </div>

                  {/* Professional */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">Professional Details</h3>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input type="text" value={regCompany} onChange={(e) => setRegCompany(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Company Name (Optional)" />
                    </div>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input type="text" value={regProfession} onChange={(e) => setRegProfession(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Profession (e.g. CA, DSA)" />
                      </div>
                      <div className="relative w-1/3">
                        <input type="text" value={regExperience} onChange={(e) => setRegExperience(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Exp. (Yrs)" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <select 
                          required 
                          value={regStateIso} 
                          onChange={(e) => {
                            const iso = e.target.value;
                            setRegStateIso(iso);
                            const stateObj = State.getStateByCodeAndCountry(iso, 'IN');
                            setRegState(stateObj?.name || "");
                            setRegCity(""); 
                          }} 
                          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none"
                        >
                          <option value="" disabled>Select State</option>
                          {State.getStatesOfCountry('IN').map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <select 
                          required 
                          value={regCity} 
                          onChange={(e) => setRegCity(e.target.value)} 
                          disabled={!regStateIso}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none appearance-none disabled:opacity-50"
                        >
                          <option value="" disabled>Select City</option>
                          {regStateIso && City.getCitiesOfState('IN', regStateIso).map((city) => (
                            <option key={city.name} value={city.name}>{city.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="relative">
                      <input type="text" required value={regPincode} onChange={(e) => setRegPincode(e.target.value)} className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-sm text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Pincode" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800/50">
                  <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group disabled:opacity-70">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application"}
                  </button>
                  <button type="button" onClick={() => setIsRegistering(false)} className="w-full py-3 text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors mt-2">
                    Back to Login
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">
                    Email or ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
                      placeholder="Enter your registered email"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">
                      Password
                    </label>
                    <a href="#" className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group mt-8 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In Securely <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
            
            {/* Contextual Messages */}
            {!isRegistering && role === "client" && (
              <p className="text-xs text-center font-medium text-slate-500 dark:text-slate-400 mt-6 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/50 dark:border-slate-700/50">
                <Lock className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                Client login is exclusively provided by your dedicated Admin post-approval.
              </p>
            )}
            
            {!isRegistering && role === "partner" && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/50 text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">
                  Don't have a partner account?
                </p>
                <button 
                  onClick={() => setIsRegistering(true)}
                  className="w-full py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl border border-emerald-200 dark:border-emerald-800/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                >
                  Become a Partner
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
