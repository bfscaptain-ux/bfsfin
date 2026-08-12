"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSupport from "@/components/FloatingSupport";
import { 
  CalendarCheck, 
  Home, 
  Building2, 
  Briefcase, 
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

type ConsultationType = "Home Loan" | "LAP" | "Balance Transfer" | "Project Funding";

export default function AppointmentClient() {
  const [step, setStep] = useState(1);
  
  // Booking State
  const [consultationType, setConsultationType] = useState<ConsultationType | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const consultationOptions: { id: ConsultationType; icon: any; desc: string }[] = [
    { id: "Home Loan", icon: Home, desc: "Fresh purchase or construction" },
    { id: "LAP", icon: Building2, desc: "Loan against existing property" },
    { id: "Balance Transfer", icon: RefreshCw, desc: "Shift existing loan for better ROI" },
    { id: "Project Funding", icon: Briefcase, desc: "For real estate developers" }
  ];

  // Generate next 7 days for the calendar
  const getNext7Days = () => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      // Skip Sundays
      if (date.getDay() === 0) {
        date.setDate(date.getDate() + 1);
        i++; // adjust counter since we skipped a day
      }
      dates.push(date);
      if (dates.length === 6) break; // keep it to 6 visible days for grid
    }
    return dates;
  };
  const availableDates = getNext7Days();

  const availableTimes = [
    "10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "05:30 PM"
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(4); // Success step
    }, 1500);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-blue-500/30">
      <Header />
      
      <main className="py-20 lg:py-32 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 bg-white dark:bg-slate-950">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none transform translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* Header Title (Hidden on Success Step) */}
          {step < 4 && (
            <div className="text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold tracking-widest uppercase mb-4"
              >
                <CalendarCheck className="w-4 h-4" /> Priority Booking
              </motion.div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                Schedule a Consultation
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Book a dedicated slot with our senior finance experts.
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {step < 4 && (
            <div className="mb-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 rounded-full" />
              <div 
                className="absolute top-1/2 left-0 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-in-out -translate-y-1/2"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              <div className="relative flex justify-between">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-300 bg-white dark:bg-slate-900
                      ${step >= i ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-slate-200 dark:border-slate-800 text-slate-400'}
                      ${step === i ? 'ring-4 ring-blue-100 dark:ring-blue-900/50' : ''}
                    `}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Consultation Type */}
              {step === 1 && (
                <motion.div key="step1" {...fadeInUp} className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">What do you need help with?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consultationOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setConsultationType(option.id)}
                        className={`text-left p-6 rounded-2xl border-2 transition-all ${
                          consultationType === option.id 
                            ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20' 
                            : 'border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                        }`}
                      >
                        <option.icon className={`w-8 h-8 mb-4 ${consultationType === option.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{option.id}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-10 flex justify-end">
                    <button 
                      onClick={handleNext}
                      disabled={!consultationType}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Date & Time */}
              {step === 2 && (
                <motion.div key="step2" {...fadeInUp} className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Pick a Date & Time</h2>
                  
                  <div className="space-y-8">
                    {/* Date Selection */}
                    <div>
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                        <Calendar className="w-4 h-4 text-emerald-500" /> Available Dates
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {availableDates.map((date, i) => {
                          const dateString = date.toISOString().split('T')[0];
                          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                          const dayNum = date.getDate();
                          const monthName = date.toLocaleDateString('en-US', { month: 'short' });
                          
                          return (
                            <button
                              key={i}
                              onClick={() => setSelectedDate(dateString)}
                              className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                                selectedDate === dateString
                                  ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                  : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:border-blue-300 dark:hover:border-blue-700 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              <span className={`text-xs uppercase font-bold mb-1 ${selectedDate === dateString ? 'text-blue-100' : 'text-slate-400'}`}>{dayName}</span>
                              <span className={`text-xl font-black ${selectedDate === dateString ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{dayNum}</span>
                              <span className={`text-xs ${selectedDate === dateString ? 'text-blue-100' : 'text-slate-500'}`}>{monthName}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <AnimatePresence>
                      {selectedDate && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="pt-4 border-t border-slate-100 dark:border-slate-800"
                        >
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">
                            <Clock className="w-4 h-4 text-emerald-500" /> Available Slots
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {availableTimes.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                                  selectedTime === time
                                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                    : 'border-slate-100 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 text-slate-600 dark:text-slate-400'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-10 flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={handleBack}
                      className="px-6 py-3.5 text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold transition-colors flex items-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                    <button 
                      onClick={handleNext}
                      disabled={!selectedDate || !selectedTime}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Details & Confirm */}
              {step === 3 && (
                <motion.div key="step3" {...fadeInUp} className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Final Step</h2>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">Please provide your details to confirm the booking.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Summary Sidebar */}
                    <div className="md:col-span-5 bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Booking Summary</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Consultation Type</div>
                          <div className="font-bold text-slate-900 dark:text-white">{consultationType}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Date</div>
                          <div className="font-bold text-slate-900 dark:text-white">{selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Time</div>
                          <div className="font-bold text-slate-900 dark:text-white">{selectedTime}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Location</div>
                          <div className="font-bold text-slate-900 dark:text-white">Agra HQ / Telephone</div>
                        </div>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="md:col-span-7 space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                        <input 
                          type="text" required
                          value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                          placeholder="Praveen Kumar"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
                        <input 
                          type="tel" required
                          value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                          placeholder="+91 99999 99999"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email (Optional)</label>
                        <input 
                          type="email"
                          value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                          placeholder="praveen@example.com"
                        />
                      </div>

                      <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                        <button 
                          type="button"
                          onClick={handleBack}
                          className="px-4 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-white font-bold transition-colors flex items-center gap-2"
                        >
                          <ChevronLeft className="w-5 h-5" /> Back
                        </button>
                        <button 
                          type="submit" 
                          disabled={isSubmitting || !formData.name || !formData.phone}
                          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center gap-2"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/></span>
                          ) : (
                            "Confirm Appointment"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Success */}
              {step === 4 && (
                <motion.div 
                  key="step4" 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 md:p-20 text-center flex flex-col items-center justify-center min-h-[400px]"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-12 h-12" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Appointment Confirmed!
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                    Thank you, {formData.name}. Your {consultationType} consultation is scheduled for <span className="font-bold text-slate-900 dark:text-white">{selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedTime}</span>.
                  </p>
                  <p className="text-sm text-slate-500 mb-10">We will send a reminder message to {formData.phone} before the meeting.</p>
                  
                  <Link href="/" className="px-8 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-colors">
                    Return to Homepage
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingSupport />
    </div>
  );
}
