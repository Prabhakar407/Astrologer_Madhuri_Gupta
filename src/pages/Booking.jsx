import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Mail,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Phone,
  CreditCard,
  Check,
  ShieldCheck
} from 'lucide-react';

const BACKEND_URL = "https://astrologer-madhuri-gupta.onrender.com";

export default function Booking() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || 'kundli-prediction';

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: initialService,
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    additionalInfo: ''
  });

  // Booking Flow State
  const [step, setStep] = useState(1); // 1: User Details, 2: Date & Time, 3: Payment, 4: Success
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  const serviceOptions = [
    { value: 'kundli-matching', label: 'Kundli Matching (45 min)', price: '₹2,100' },
    { value: 'kundli-prediction', label: 'Kundli Prediction (60 min)', price: '₹2,500' },
    { value: 'vastu-consultation', label: 'Vastu Consultation (90 min)', price: '₹4,500' },
    { value: 'numerology', label: 'Numerology (45 min)', price: '₹2,100' }
  ];

  // Update form service type if URL parameter changes and set document title
  useEffect(() => {
    document.title = "Book Kundli & Vastu Consultation in Agra | Sarsa Jyotish Sansthan";
    if (searchParams.get('service')) {
      setFormData(prev => ({ ...prev, serviceType: searchParams.get('service') }));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit details to proceed to slots calendar
  // Fetch slots from backend API
  const fetchSlots = async (date) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${BACKEND_URL}/api/available-slots?date=${date}`);
      if (!response.ok) {
        throw new Error('Failed to load slots from API.');
      }
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (err) {
      console.error(err);
      // Fallback slots if backend is offline
      setAvailableSlots(['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']);
    } finally {
      setLoading(false);
    }
  };

  // Submit details to proceed to slots calendar
  const handleProceedToSlots = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.birthDate || !formData.birthTime) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    
    // Set default selected date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    setSelectedDate(formattedTomorrow);
    
    setStep(2);
    fetchSlots(formattedTomorrow);
  };

  // Handle changing dates in the slots panel
  const handleDateChange = (date) => {
    setSelectedDate(date);
    fetchSlots(date);
  };

  // Proceed to Payment screen
  const handleProceedToPayment = () => {
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }
    setError('');
    setStep(3);
  };

  // Finalize booking submit via backend integration
  const handleConfirmPayment = async () => {
    setError('');
    setBookingLoading(true);

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      serviceType: formData.serviceType,
      birthDate: formData.birthDate,
      birthTime: formData.birthTime,
      birthPlace: formData.birthPlace || null,
      bookingDate: selectedDate,
      bookingTime: selectedSlot,
      additionalInfo: formData.additionalInfo || null
    };

    try {
      const response = await fetch(`${BACKEND_URL}/api/book-appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to complete booking.');
      }

      const result = await response.json();
      setBookingResult({
        ...payload,
        jitsiLink: result.jitsiLink,
        bookingId: result.bookingId
      });
      setStep(4);
    } catch (err) {
      setError(err.message || 'Something went wrong during scheduling. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const activeService = serviceOptions.find(o => o.value === formData.serviceType) || serviceOptions[0];

  return (
    <div 
      className="pt-10 md:pt-12 min-h-screen relative bg-[#faf6e8]" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(250, 246, 232, 0.45), rgba(250, 246, 232, 0.45)), url('/marble-bg.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed' 
      }}
    >
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-4 pb-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-3 space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3a1906] tracking-wide">
            Book a Consultation
          </h1>
          <div className="w-12 h-[2px] bg-[#deb18a] mx-auto" />
        </div>

        {/* 3-Step Progress Tracker */}
        {step <= 3 && (
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-4 text-xs sm:text-sm font-medium tracking-wide">
            
            {/* Step 1 */}
            <div className={`flex items-center space-x-1.5 ${step === 1 ? 'text-[#b8922b]' : step > 1 ? 'text-green-600' : 'text-gray-500'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                step > 1 
                  ? 'border-green-600 bg-green-500/10 text-green-600' 
                  : step === 1 
                    ? 'border-[#b8922b] bg-[#b8922b]/15 text-[#b8922b] ring-2 ring-[#b8922b]/20' 
                    : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                {step > 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
              </span>
              <span className="font-serif font-semibold">User Details</span>
            </div>

            <div className="h-[1px] w-4 sm:w-6 bg-gray-300" />

            {/* Step 2 */}
            <div className={`flex items-center space-x-1.5 ${step === 2 ? 'text-[#b8922b]' : step > 2 ? 'text-green-600' : 'text-gray-500'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                step > 2 
                  ? 'border-green-600 bg-green-500/10 text-green-600' 
                  : step === 2 
                    ? 'border-[#b8922b] bg-[#b8922b]/15 text-[#b8922b] ring-2 ring-[#b8922b]/20' 
                    : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                {step > 2 ? <Check className="w-3.5 h-3.5" /> : "2"}
              </span>
              <span className="font-serif font-semibold">Select Slot</span>
            </div>

            <div className="h-[1px] w-4 sm:w-6 bg-gray-300" />

            {/* Step 3 */}
            <div className={`flex items-center space-x-1.5 ${step === 3 ? 'text-[#b8922b]' : 'text-gray-500'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center border font-bold text-xs transition-all ${
                step === 3 
                  ? 'border-[#b8922b] bg-[#b8922b]/15 text-[#b8922b] ring-2 ring-[#b8922b]/20' 
                  : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                3
              </span>
              <span className="font-serif font-semibold">Payment</span>
            </div>

          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs flex items-center space-x-2.5 shadow-sm">
            <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Wizard Form Panels (Reduced size by 1/3, padding to p-4 sm:p-5, min-h to min-h-[280px]) */}
        <div className="bg-[#4f3129] rounded-3xl p-4 sm:p-5 shadow-2xl border border-[#deb18a]/10 text-white min-h-[280px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Collect User Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                <form onSubmit={handleProceedToSlots} className="space-y-4">
                  
                  {/* Personal Information Group */}
                  <div className="space-y-2.5">
                    <h2 className="font-serif text-lg font-bold text-white border-b border-[#deb18a]/10 pb-1 flex items-center space-x-2">
                      <User className="h-4.5 w-4.5 text-[#deb18a]" />
                      <span>Personal Information</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Name *</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#deb18a]/45" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full pl-10 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#deb18a]/45" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="w-full pl-10 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#deb18a]/45" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+91 88815 73437"
                            className="w-full pl-10 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Consultation Service *</label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full pl-3.5 pr-9 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all appearance-none cursor-pointer"
                          >
                            {serviceOptions.map(opt => (
                              <option key={opt.value} value={opt.value} className="bg-[#4f3129] text-white">
                                {opt.label} ({opt.price})
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#deb18a]/60">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Birth Details Group */}
                  <div className="space-y-2.5 pt-1">
                    <h2 className="font-serif text-lg font-bold text-white border-b border-[#deb18a]/10 pb-1 flex items-center space-x-2">
                      <Sparkles className="h-4.5 w-4.5 text-[#deb18a]" />
                      <span>Vedic Birth Details</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Date of Birth *</label>
                        <input
                          type="date"
                          name="birthDate"
                          required
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Time of Birth *</label>
                        <input
                          type="time"
                          name="birthTime"
                          required
                          value={formData.birthTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80 mb-1">Place of Birth (Optional)</label>
                        <div className="relative">
                          <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#deb18a]/45" />
                          <input
                            type="text"
                            name="birthPlace"
                            value={formData.birthPlace}
                            onChange={handleInputChange}
                            placeholder="City, Country"
                            className="w-full pl-10 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Focus Areas */}
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#deb18a]/80">Specific Questions or Focus Areas</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="E.g. career path details..."
                      className="w-full px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs resize-none transition-all"
                    />
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      type="submit"
                      className="w-1/4 py-3 rounded-xl bg-[#b8922b] hover:bg-[#a27e20] text-white font-bold uppercase tracking-wider shadow-lg active:scale-[0.99] transition-all cursor-pointer text-xs"
                    >
                      Submit
                    </button>
                  </div>

                </form>
              </motion.div>
            )}

            {/* STEP 2: Select Date & Time (Calendar-based booking) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#deb18a]/10 pb-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-1 text-[#deb18a]/80 hover:text-white transition-colors text-xs font-semibold"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Details</span>
                  </button>
                  <span className="text-[10px] text-[#deb18a] font-serif uppercase tracking-widest font-bold">Select Session Slot</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                  
                  {/* Calendar Widget */}
                  <div className="sm:col-span-5 space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#deb18a]">Appointment Date</label>
                    <div className="relative bg-white/5 p-3 rounded-2xl border border-white/10">
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#deb18a]" />
                        <input
                          type="date"
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Min is tomorrow
                          value={selectedDate}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="w-full pl-9 pr-2 py-2 bg-white/10 border border-white/10 rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-[11px] font-semibold transition-all"
                        />
                      </div>
                      <p className="text-[9px] text-white mt-2 font-light leading-normal">
                        Select an available calendar date. Only slot times aligning with positive astrological transits are shown.
                      </p>
                    </div>
                  </div>

                  {/* Available Time Slots Grid */}
                  <div className="sm:col-span-7 space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#deb18a]">
                      Available Slots for {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                    </label>

                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-2 bg-white/5 rounded-2xl border border-white/10">
                        <div className="w-6 h-6 rounded-full border-2 border-[#b8922b] border-t-transparent animate-spin" />
                        <span className="text-[10px] text-[#deb18a]/80">Checking astrologer schedule...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-white/5 p-3 rounded-2xl border border-white/10">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 px-1.5 rounded-xl border text-[10px] font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                              selectedSlot === slot
                                ? 'bg-[#b8922b] text-white border-transparent shadow-md'
                                : 'bg-white/5 border-white/10 text-white/80 hover:border-[#b8922b]/50 hover:text-white'
                            }`}
                          >
                            <Clock className="h-3 w-3" />
                            <span>{slot}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                </div>

                {/* Slot Summary */}
                {selectedSlot && (
                  <div className="p-3 rounded-xl bg-[#b8922b]/10 border border-[#b8922b]/20 text-xs flex items-center justify-between text-[#deb18a]">
                    <span>Selected Date/Time:</span>
                    <strong className="text-white font-serif tracking-wide">{selectedDate} at {selectedSlot}</strong>
                  </div>
                )}

                <div className="pt-3 border-t border-white/5 flex justify-center">
                  <button
                    onClick={handleProceedToPayment}
                    disabled={!selectedSlot || loading}
                    className="w-1/4 py-3 rounded-xl bg-[#b8922b] hover:bg-[#a27e20] text-white font-bold uppercase tracking-wider shadow-lg active:scale-[0.99] transition-all disabled:opacity-40 cursor-pointer text-xs"
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Payment Portal */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                <div className="flex items-center justify-between border-b border-[#deb18a]/10 pb-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center space-x-1.5 text-[#deb18a]/80 hover:text-white transition-colors text-xs font-semibold"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Calendar</span>
                  </button>
                  <span className="text-[10px] text-[#deb18a] font-serif uppercase tracking-widest font-bold">Secure Checkout</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                  
                  {/* Summary Block (Left Column) */}
                  <div className="sm:col-span-5 bg-white/5 p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                    <h3 className="font-serif text-[#deb18a] font-bold border-b border-white/10 pb-1.5">Summary</h3>
                    
                    <div className="space-y-2 font-sans">
                      <p><span className="text-[#deb18a]/60 block text-[9px] uppercase">Service</span> <strong className="text-white font-serif">{activeService.label}</strong></p>
                      <p><span className="text-[#deb18a]/60 block text-[9px] uppercase">Date & Time</span> <strong className="text-white">{selectedDate} at {selectedSlot}</strong></p>
                      <p><span className="text-[#deb18a]/60 block text-[9px] uppercase">Client Name</span> <strong className="text-white">{formData.name}</strong></p>
                      
                      <div className="pt-2 border-t border-white/10 flex justify-between items-center">
                        <span className="font-bold text-[#deb18a]">Total:</span>
                        <span className="text-base font-bold text-white font-serif">{activeService.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details (Right Column) */}
                  <div className="sm:col-span-7 space-y-3">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#deb18a]">Payment Method</label>
                    
                    <div className="grid grid-cols-2 gap-2">
                      
                      {/* UPI */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-[#b8922b] text-white border-transparent'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-[#b8922b]/50'
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold">UPI / GPay / Paytm</span>
                      </button>

                      {/* Card */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-[#b8922b] text-white border-transparent'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-[#b8922b]/50'
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold">Credit/Debit Card</span>
                      </button>

                    </div>

                    <div className="bg-white/5 p-3 rounded-xl border border-white/10 min-h-[110px] flex items-center justify-center">
                      {paymentMethod === 'upi' ? (
                        <div className="text-center space-y-2 w-full">
                          <p className="text-[10px] text-[#deb18a]/80">Scan the QR code below using your UPI app</p>
                          <div className="w-24 h-24 bg-white p-1 rounded-lg mx-auto flex items-center justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3Dastromadhuri%40upi%26pn%3DAstrologer%2520Madhuri%2520Gupta%26am%3D${activeService.price.replace(/[^\d]/g, '')}%26cu%3DINR%26tn%3DAppointment%2520Booking&color=4f3129`}
                              alt="Scan to Pay UPI"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 w-full">
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              placeholder="Card Number"
                              className="w-full px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-[11px] font-mono transition-all"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-[11px] font-mono transition-all"
                              />
                              <input
                                type="text"
                                placeholder="CVV"
                                className="w-full px-3 py-1.5 bg-white/10 border border-white/10 rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-[11px] font-mono transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-1.5 text-[9px] text-gray-400">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500 shrink-0" />
                      <span>Secure 256-bit SSL checkout system.</span>
                    </div>

                  </div>

                </div>

                <div className="pt-3 border-t border-white/5 flex justify-center">
                  <button
                    onClick={handleConfirmPayment}
                    disabled={bookingLoading}
                    className="w-1/4 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:brightness-105 text-white font-bold uppercase tracking-wider shadow-lg active:scale-[0.99] transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-xs"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Success Panel */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 0.99 }}
                className="text-center space-y-5 py-4"
              >
                <div className="inline-flex p-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                  <CheckCircle2 className="h-10 w-10 animate-[pulse_2s_infinite]" />
                </div>
                
                <div className="space-y-1.5">
                  <h2 className="font-serif text-2xl font-bold text-white">Consultation Booked!</h2>
                  <p className="text-[#deb18a]/80 font-light text-xs max-w-sm mx-auto leading-relaxed">
                    Invitation link has been dispatched to <strong className="text-white font-normal">{formData.email}</strong>.
                  </p>
                </div>

                <div className="max-w-sm mx-auto p-4 rounded-2xl bg-white/5 border border-[#deb18a]/10 text-left text-xs space-y-2.5 font-sans">
                  <h3 className="font-serif text-[#deb18a] font-bold border-b border-white/10 pb-1.5">Session Details</h3>
                  <p><span className="text-gray-400">Client:</span> <span className="text-white font-serif">{formData.name}</span></p>
                  <p><span className="text-gray-400">Service:</span> <span className="text-white">{activeService.label}</span></p>
                  <p><span className="text-gray-400">Date/Time:</span> <span className="text-white">{selectedDate} at {selectedSlot}</span></p>
                  {bookingResult?.jitsiLink && (
                    <div className="pt-1.5 border-t border-white/10 mt-1.5">
                      <span className="block text-[10px] text-gray-400 mb-0.5">Meeting Link (Jitsi):</span>
                      <a
                        href={bookingResult.jitsiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#b8922b] hover:underline font-mono break-all"
                      >
                        {bookingResult.jitsiLink}
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        serviceType: 'birth-chart',
                        birthDate: '',
                        birthTime: '',
                        birthPlace: '',
                        additionalInfo: ''
                      });
                      setSelectedSlot('');
                      setStep(1);
                    }}
                    className="px-5 py-2.5 rounded-full border border-[#deb18a]/30 text-[#deb18a] hover:text-[#4f3129] hover:bg-[#deb18a] hover:border-transparent font-semibold uppercase tracking-wider text-[10px] transition-all duration-300 cursor-pointer"
                  >
                    Book Another Reading
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
