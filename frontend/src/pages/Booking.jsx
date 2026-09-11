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
  ShieldCheck,
  KeyRound,
  RefreshCw,
  Lock,
  X
} from 'lucide-react';
import EmailOtpModal from '../components/EmailOtpModal';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? '' : 'https://astrologer-madhuri-gupta.onrender.com');

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
  const [step, setStep] = useState(1); // 1: User Details, 2: Date & Time, 3: Payment/Confirm, 4: Success
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay_later'); // Default to instant confirm / test mode

  // OTP Verification State
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  const serviceOptions = [
    { value: 'kundli-matching', label: 'Kundli Matching (30 min)', price: '₹2,100' },
    { value: 'kundli-prediction', label: 'Kundli Prediction (30 min)', price: '₹2,500' },
    { value: 'vastu-consultation', label: 'Vastu Consultation (30 min)', price: '₹4,500' },
    { value: 'numerology', label: 'Numerology (30 min)', price: '₹2,100' }
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
    // If email changes after verification, reset verification status
    if (name === 'email' && isEmailVerified) {
      setIsEmailVerified(false);
      setVerificationToken('');
    }
  };

  // Professional mobile phone validation helper (Does NOT enforce +91)
  const validatePhone = (rawPhone) => {
    if (!rawPhone) return { valid: false, message: 'Please enter your mobile number.' };
    const digits = rawPhone.replace(/\D/g, '');
    if (!digits) return { valid: false, message: 'Please enter a valid mobile number.' };
    if (/^(\d)\1{7,}$/.test(digits)) {
      return { valid: false, message: 'Please enter a genuine mobile number.' };
    }
    if (digits.length === 10) {
      if (/^[6-9]/.test(digits)) return { valid: true, digits };
      return { valid: false, message: '10-digit Indian mobile numbers must start with 6, 7, 8, or 9.' };
    }
    if (digits.length === 11 && digits.startsWith('0')) {
      return { valid: true, digits: digits.slice(1) };
    }
    if (digits.length === 12 && digits.startsWith('91')) {
      return { valid: true, digits: digits.slice(2) };
    }
    if (digits.length >= 10 && digits.length <= 15) {
      return { valid: true, digits };
    }
    return { valid: false, message: 'Please enter a valid 10-digit mobile number (e.g. 98881 57343).' };
  };

  // Fetch available slots from backend
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
      setAvailableSlots(['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification Success
  const handleOtpVerified = (token) => {
    setIsEmailVerified(true);
    setVerificationToken(token);
    setShowOtpModal(false);

    // Auto-proceed to step 2 once verified
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    setSelectedDate(formattedTomorrow);
    setStep(2);
    fetchSlots(formattedTomorrow);
  };

  // Submit details to proceed to slots calendar (with mandatory email verification check)
  const handleProceedToSlots = (e) => {
    e.preventDefault();
    setError('');

    // 1. Validate Form Constraints
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    const phoneCheck = validatePhone(formData.phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.message);
      return;
    }
    if (!formData.birthDate) {
      setError('Please select your date of birth.');
      return;
    }
    if (!formData.birthTime) {
      setError('Please select your approximate time of birth.');
      return;
    }

    // 2. Enforce Email Verification before advancing
    if (!isEmailVerified) {
      setShowOtpModal(true);
      return;
    }

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

  // Proceed to confirmation screen
  const handleProceedToPayment = () => {
    if (!selectedSlot) {
      setError('Please select a time slot.');
      return;
    }
    setError('');
    setStep(3);
  };

  // Finalize booking submit via asynchronous backend integration
  const handleConfirmPayment = async () => {
    setError('');
    setBookingLoading(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      serviceType: formData.serviceType,
      birthDate: formData.birthDate,
      birthTime: formData.birthTime,
      birthPlace: formData.birthPlace.trim() || null,
      bookingDate: selectedDate,
      bookingTime: selectedSlot,
      additionalInfo: formData.additionalInfo.trim() || null,
      verificationToken: verificationToken || null
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
      // Instant transition to step 4 without waiting for slow backend syncing!
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
      className="booking-page-root px-4 sm:px-6 2xl:px-8 relative bg-[#faf6e8]" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(250, 246, 232, 0.45), rgba(250, 246, 232, 0.45)), url('/marble-bg.webp')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundAttachment: 'fixed' 
      }}
    >
      
      <div className="w-full max-w-[540px] 2xl:max-w-[640px] 3xl:max-w-[760px] 4xl:max-w-[920px] 5xl:max-w-[1100px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center w-full mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6 space-y-1">
          <h1 className="font-serif text-xl sm:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl font-bold text-[#3a1906] tracking-wide">
            Book a Consultation
          </h1>
          <div className="w-10 2xl:w-12 3xl:w-16 4xl:w-20 5xl:w-28 h-[2px] 3xl:h-[3px] bg-[#deb18a] mx-auto" />
        </div>

        {/* 3-Step Progress Tracker */}
        {step <= 3 && (
          <div className="flex justify-center items-center space-x-1.5 sm:space-x-3 3xl:space-x-4 4xl:space-x-5 mb-3 2xl:mb-4 3xl:mb-5 4xl:mb-6 text-[11px] sm:text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl font-medium tracking-wide">
            
            {/* Step 1 */}
            <div className={`flex items-center space-x-1.5 2xl:space-x-2 4xl:space-x-3 ${step === 1 ? 'text-[#b8922b]' : step > 1 ? 'text-green-600' : 'text-gray-500'}`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 5xl:w-12 5xl:h-12 rounded-full flex items-center justify-center border font-bold text-[10px] sm:text-xs 2xl:text-sm 4xl:text-base transition-all ${
                step > 1 
                  ? 'border-green-600 bg-green-500/10 text-green-600' 
                  : step === 1 
                    ? 'border-[#b8922b] bg-[#b8922b]/15 text-[#b8922b] ring-2 ring-[#b8922b]/20' 
                    : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                {step > 1 ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-3.5 2xl:h-3.5 4xl:w-5 4xl:h-5" /> : "1"}
              </span>
              <span className="font-serif font-semibold whitespace-nowrap">User Details</span>
            </div>

            <div className="h-[1px] 2xl:h-[2px] 4xl:h-[3px] w-3 sm:w-6 2xl:w-8 4xl:w-12 5xl:w-16 bg-gray-300 shrink-0" />

            {/* Step 2 */}
            <div className={`flex items-center space-x-1.5 2xl:space-x-2 4xl:space-x-3 ${step === 2 ? 'text-[#b8922b]' : step > 2 ? 'text-green-600' : 'text-gray-500'}`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 5xl:w-12 5xl:h-12 rounded-full flex items-center justify-center border font-bold text-[10px] sm:text-xs 2xl:text-sm 4xl:text-base transition-all ${
                step > 2 
                  ? 'border-green-600 bg-green-500/10 text-green-600' 
                  : step === 2 
                    ? 'border-[#b8922b] bg-[#b8922b]/15 text-[#b8922b] ring-2 ring-[#b8922b]/20' 
                    : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                {step > 2 ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-3.5 2xl:h-3.5 4xl:w-5 4xl:h-5" /> : "2"}
              </span>
              <span className="font-serif font-semibold whitespace-nowrap">Select Slot</span>
            </div>

            <div className="h-[1px] 2xl:h-[2px] 4xl:h-[3px] w-3 sm:w-6 2xl:w-8 4xl:w-12 5xl:w-16 bg-gray-300 shrink-0" />

            {/* Step 3 */}
            <div className={`flex items-center space-x-1.5 2xl:space-x-2 4xl:space-x-3 ${step === 3 ? 'text-[#b8922b]' : 'text-gray-500'}`}>
              <span className={`w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 3xl:w-8 3xl:h-8 4xl:w-10 4xl:h-10 5xl:w-12 5xl:h-12 rounded-full flex items-center justify-center border font-bold text-[10px] sm:text-xs 2xl:text-sm 4xl:text-base transition-all ${
                step === 3 
                  ? 'border-[#b8922b] bg-[#b8922b]/15 text-[#b8922b] ring-2 ring-[#b8922b]/20' 
                  : 'border-gray-300 bg-gray-100 text-gray-400'
              }`}>
                3
              </span>
              <span className="font-serif font-semibold whitespace-nowrap">Payment</span>
            </div>

          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="w-full mb-3 p-2.5 4xl:p-3.5 rounded-lg 4xl:rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs sm:text-sm 4xl:text-base flex items-center space-x-2 shadow-sm">
            <AlertTriangle className="h-4 w-4 4xl:h-5 4xl:w-5 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Wizard Form Card - Clean, Balanced & Centered */}
        <div className="w-full bg-[#4f3129] rounded-2xl sm:rounded-3xl 4xl:rounded-[36px] 5xl:rounded-[44px] p-4 sm:p-5 2xl:p-6 3xl:p-7 4xl:p-9 5xl:p-12 shadow-2xl border border-[#deb18a]/10 text-white">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Collect User Details */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <form onSubmit={handleProceedToSlots} className="space-y-3 2xl:space-y-4 3xl:space-y-5 4xl:space-y-6">
                  
                  {/* Personal Information Group */}
                  <div className="space-y-2 2xl:space-y-2.5 4xl:space-y-3.5">
                    <h2 className="font-serif text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl font-bold text-white border-b border-white/15 pb-1 4xl:pb-2 flex items-center space-x-1.5 4xl:space-x-2">
                      <User className="h-3.5 w-3.5 2xl:h-4 2xl:w-4 4xl:h-5 4xl:w-5 text-[#dfb260]" />
                      <span>Personal Information</span>
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 2xl:gap-3 4xl:gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white mb-1 4xl:mb-1.5">Name *</label>
                        <div className="relative">
                          <User className="absolute left-2.5 4xl:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white/60" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name"
                            className="w-full pl-8 4xl:pl-11 pr-2.5 4xl:pr-4 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl placeholder-white/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1 4xl:mb-1.5">
                          <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white">Email Address *</label>
                          {isEmailVerified ? (
                            <span className="text-[9px] sm:text-[10px] 4xl:text-xs text-green-300 font-semibold flex items-center space-x-0.5 bg-green-500/20 px-1 py-0.2 rounded border border-green-500/30">
                              <CheckCircle2 className="w-2.5 h-2.5 4xl:w-3.5 4xl:h-3.5" />
                              <span>Verified</span>
                            </span>
                          ) : (
                            <span className="text-[9px] sm:text-[10px] 4xl:text-xs text-white/80 font-medium">OTP Verified</span>
                          )}
                        </div>
                        <div className="relative">
                          <Mail className="absolute left-2.5 4xl:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white/60" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@example.com"
                            className="w-full pl-8 4xl:pl-11 pr-2.5 4xl:pr-4 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl placeholder-white/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 2xl:gap-3 4xl:gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white mb-1 4xl:mb-1.5">
                          Mobile Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-2.5 4xl:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white/60" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="e.g. 98881 57343"
                            className="w-full pl-8 4xl:pl-11 pr-2.5 4xl:pr-4 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl placeholder-white/50 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white mb-1 4xl:mb-1.5">Consultation Service *</label>
                        <div className="relative">
                          <select
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleInputChange}
                            className="w-full pl-2.5 4xl:pl-3.5 pr-7 4xl:pr-10 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-[#4f3129] border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl transition-all appearance-none cursor-pointer"
                          >
                            {serviceOptions.map(opt => (
                              <option key={opt.value} value={opt.value} className="bg-[#4f3129] text-white">
                                {opt.label} ({opt.price})
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2.5 4xl:right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                            <svg className="w-3.5 h-3.5 4xl:w-5 4xl:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Birth Details Group */}
                  <div className="space-y-2 2xl:space-y-2.5 4xl:space-y-3.5">
                    <h2 className="font-serif text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl font-bold text-white border-b border-white/15 pb-1 4xl:pb-2 flex items-center space-x-1.5 4xl:space-x-2">
                      <Sparkles className="h-3.5 w-3.5 2xl:h-4 2xl:w-4 4xl:h-5 4xl:w-5 text-[#dfb260]" />
                      <span>Vedic Birth Details</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 2xl:gap-3 4xl:gap-4">
                      <div>
                        <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white mb-1 4xl:mb-1.5">Date of Birth *</label>
                        <input
                          type="date"
                          name="birthDate"
                          required
                          value={formData.birthDate}
                          onChange={handleInputChange}
                          className="w-full px-2 4xl:px-3 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white mb-1 4xl:mb-1.5">Time of Birth *</label>
                        <input
                          type="time"
                          name="birthTime"
                          required
                          value={formData.birthTime}
                          onChange={handleInputChange}
                          className="w-full px-2 4xl:px-3 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white mb-1 4xl:mb-1.5">Place of Birth</label>
                        <div className="relative">
                          <MapPin className="absolute left-2 4xl:left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white/60" />
                          <input
                            type="text"
                            name="birthPlace"
                            value={formData.birthPlace}
                            onChange={handleInputChange}
                            placeholder="City, State"
                            className="w-full pl-6 4xl:pl-9 pr-2 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 5xl:py-4 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl placeholder-white/50 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Focus Areas */}
                  <div className="space-y-1 4xl:space-y-1.5">
                    <label className="block text-[10px] sm:text-[11px] 2xl:text-xs 3xl:text-sm 4xl:text-base font-semibold uppercase tracking-wider text-white">Specific Questions (Optional)</label>
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows="1"
                      placeholder="E.g. career path, marriage timing, health queries..."
                      className="w-full px-2.5 4xl:px-3.5 py-1.5 4xl:py-2.5 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg resize-none transition-all"
                    />
                  </div>

                  <div className="pt-2 4xl:pt-3 flex justify-center">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 2xl:px-10 3xl:px-12 4xl:px-14 5xl:px-16 py-2.5 2xl:py-3 3xl:py-3.5 4xl:py-4 5xl:py-5 rounded-xl 4xl:rounded-2xl bg-[#b8922b] hover:bg-[#a27e20] text-white font-bold uppercase tracking-wider shadow-md active:scale-[0.99] transition-all cursor-pointer text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-2xl flex items-center justify-center space-x-2 4xl:space-x-3"
                    >
                      <span>Proceed to Select Slot</span>
                      <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 4xl:w-5 4xl:h-5 text-white" />
                    </button>
                  </div>

                </form>
              </motion.div>
            )}

            {/* STEP 2: Select Date & Time (Calendar-based booking) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5 2xl:space-y-4 3xl:space-y-5 4xl:space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-2 4xl:pb-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-1 4xl:space-x-2 text-white/90 hover:text-white transition-colors text-xs 3xl:text-sm 4xl:text-base font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white" />
                    <span>Back to Details</span>
                  </button>
                  <span className="text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl text-white font-serif uppercase tracking-widest font-bold">Select Session Slot</span>
                </div>

                <div className="space-y-3 4xl:space-y-4">
                  {/* Calendar Widget */}
                  <div className="space-y-1 4xl:space-y-1.5">
                    <label className="block text-[11px] sm:text-xs 3xl:text-sm 4xl:text-base font-bold uppercase tracking-wider text-white">Appointment Date</label>
                    <div className="relative bg-white/10 p-2 4xl:p-3 rounded-xl 4xl:rounded-2xl border border-white/20">
                      <div className="relative">
                        <CalendarIcon className="absolute left-2.5 4xl:left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white" />
                        <input
                          type="date"
                          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                          value={selectedDate}
                          onChange={(e) => handleDateChange(e.target.value)}
                          className="w-full pl-8 4xl:pl-11 pr-2 py-1.5 2xl:py-2 3xl:py-2.5 4xl:py-3.5 bg-white/10 border border-white/20 rounded-lg 4xl:rounded-xl focus:border-[#b8922b] focus:outline-none text-white text-xs sm:text-sm 3xl:text-base 4xl:text-lg font-semibold transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Available Time Slots Grid */}
                  <div className="space-y-1 4xl:space-y-1.5">
                    <label className="block text-[11px] sm:text-xs 3xl:text-sm 4xl:text-base font-bold uppercase tracking-wider text-white">
                      Available Slots for {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </label>

                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-6 4xl:py-8 space-y-1.5 4xl:space-y-2 bg-white/10 rounded-xl 4xl:rounded-2xl border border-white/20">
                        <div className="w-5 h-5 4xl:w-7 4xl:h-7 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span className="text-[11px] 3xl:text-xs 4xl:text-sm text-white/90">Checking schedule...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 4xl:gap-3 bg-white/10 p-2.5 4xl:p-3.5 rounded-xl 4xl:rounded-2xl border border-white/20">
                        {availableSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`py-2 4xl:py-3 px-1.5 4xl:px-3 rounded-lg 4xl:rounded-xl border text-[11px] sm:text-xs 3xl:text-sm 4xl:text-base font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-1 4xl:space-x-2 cursor-pointer ${
                              selectedSlot === slot
                                ? 'bg-[#b8922b] text-white border-transparent shadow-md ring-1 ring-white/50'
                                : 'bg-white/5 border-white/20 text-white hover:border-[#b8922b]/50 hover:bg-white/10'
                            }`}
                          >
                            <Clock className="h-3 w-3 4xl:h-4 4xl:w-4" />
                            <span>{slot}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Slot Summary */}
                  {selectedSlot && (
                    <div className="p-2.5 4xl:p-3.5 rounded-lg 4xl:rounded-xl bg-white/10 border border-white/20 text-xs 3xl:text-sm 4xl:text-base flex items-center justify-between text-white">
                      <span>Selected:</span>
                      <strong className="text-white font-serif">{selectedDate} at {selectedSlot}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-2 4xl:pt-3 border-t border-white/10 flex justify-center">
                  <button
                    onClick={handleProceedToPayment}
                    disabled={!selectedSlot || loading}
                    className="w-full sm:w-auto px-8 3xl:px-10 4xl:px-12 py-2.5 4xl:py-3.5 rounded-xl 4xl:rounded-2xl bg-[#b8922b] hover:bg-[#a27e20] text-white font-bold uppercase tracking-wider shadow-md active:scale-[0.99] transition-all disabled:opacity-40 cursor-pointer text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl"
                  >
                    Proceed to Confirmation
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Payment & Consultation Confirmation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3.5 2xl:space-y-4 3xl:space-y-5 4xl:space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-2 4xl:pb-3">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center space-x-1 4xl:space-x-2 text-white/90 hover:text-white transition-colors text-xs 3xl:text-sm 4xl:text-base font-semibold cursor-pointer"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 4xl:h-5 4xl:w-5 text-white" />
                    <span>Back to Calendar</span>
                  </button>
                  <span className="text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg 5xl:text-xl text-white font-serif uppercase tracking-widest font-bold">Review & Confirm</span>
                </div>

                <div className="space-y-2.5 4xl:space-y-3.5">
                  {/* Summary Block */}
                  <div className="bg-white/10 p-3 4xl:p-4 rounded-xl 4xl:rounded-2xl border border-white/20 text-xs 3xl:text-sm 4xl:text-base space-y-1.5 4xl:space-y-2 font-sans text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Service:</span>
                      <strong className="text-white font-serif">{activeService.label}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Date & Time:</span>
                      <strong className="text-white">{selectedDate} at {selectedSlot}</strong>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Client:</span>
                      <strong className="text-white">{formData.name} ({formData.phone})</strong>
                    </div>
                    <div className="pt-1.5 4xl:pt-2 border-t border-white/15 flex justify-between items-center">
                      <span className="font-bold text-white">Fee:</span>
                      <span className="text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl font-bold text-white font-serif">{activeService.price}</span>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-2 4xl:space-y-3">
                    <label className="block text-[11px] sm:text-xs 3xl:text-sm 4xl:text-base font-bold uppercase tracking-wider text-white">Payment Option</label>
                    
                    <div className="grid grid-cols-3 gap-2 4xl:gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pay_later')}
                        className={`p-2 4xl:p-3 rounded-lg 4xl:rounded-xl border flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                          paymentMethod === 'pay_later'
                            ? 'bg-[#b8922b] text-white border-transparent shadow-md'
                            : 'bg-white/5 border-white/20 text-white hover:border-[#b8922b]/50'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 4xl:h-5 4xl:w-5 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] 3xl:text-xs 4xl:text-sm font-bold text-center">Pay at Session</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-2 4xl:p-3 rounded-lg 4xl:rounded-xl border flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-[#b8922b] text-white border-transparent shadow-md'
                            : 'bg-white/5 border-white/20 text-white hover:border-[#b8922b]/50'
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5 4xl:h-5 4xl:w-5 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] 3xl:text-xs 4xl:text-sm font-bold text-center">UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-2 4xl:p-3 rounded-lg 4xl:rounded-xl border flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-[#b8922b] text-white border-transparent shadow-md'
                            : 'bg-white/5 border-white/20 text-white hover:border-[#b8922b]/50'
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5 4xl:h-5 4xl:w-5 shrink-0" />
                        <span className="text-[10px] sm:text-[11px] 3xl:text-xs 4xl:text-sm font-bold text-center">Card</span>
                      </button>
                    </div>

                    <div className="bg-white/10 p-3 4xl:p-4 rounded-lg 4xl:rounded-xl border border-white/20 min-h-[60px] 4xl:min-h-[80px] flex items-center justify-center">
                      {paymentMethod === 'pay_later' ? (
                        <div className="text-center">
                          <p className="text-xs 2xl:text-sm 3xl:text-base 4xl:text-lg font-bold text-white">Instant Confirmation</p>
                          <p className="text-[11px] 3xl:text-xs 4xl:text-sm text-white/90">Click confirm to schedule and receive Jitsi Meet link immediately.</p>
                        </div>
                      ) : paymentMethod === 'upi' ? (
                        <div className="text-center space-y-1.5">
                          <p className="text-[11px] 3xl:text-xs 4xl:text-sm text-white/90">Scan UPI QR code</p>
                          <div className="w-20 h-20 4xl:w-28 4xl:h-28 bg-white p-1 rounded-lg mx-auto flex items-center justify-center">
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi%3A%2F%2Fpay%3Fpa%3Dastromadhuri%40upi%26pn%3DAstrologer%2520Madhuri%2520Gupta%26am%3D${activeService.price.replace(/[^\d]/g, '')}&color=4f3129`}
                              alt="Scan to Pay"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 w-full text-xs 4xl:text-sm">
                          <input
                            type="text"
                            placeholder="Card Number"
                            className="w-full px-2.5 py-1.5 4xl:py-2.5 bg-white/10 border border-white/20 rounded focus:outline-none text-white text-xs 4xl:text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 4xl:pt-3 border-t border-white/10 flex justify-center">
                  <button
                    onClick={handleConfirmPayment}
                    disabled={bookingLoading}
                    className="w-full sm:w-auto px-8 3xl:px-10 4xl:px-12 py-2.5 4xl:py-3.5 rounded-xl 4xl:rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:brightness-105 text-white font-bold uppercase tracking-wider shadow-md active:scale-[0.99] transition-all flex items-center justify-center space-x-2 4xl:space-x-3 cursor-pointer text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 4xl:w-4.5 4xl:h-4.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 4xl:w-5 4xl:h-5" />
                        <span>Confirm & Book</span>
                      </>
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
                className="text-center py-2 4xl:py-4 space-y-3 4xl:space-y-4"
              >
                <div className="inline-flex p-2.5 4xl:p-3.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 mx-auto">
                  <CheckCircle2 className="h-8 w-8 4xl:h-12 4xl:w-12" />
                </div>
                
                <div className="space-y-1 4xl:space-y-1.5">
                  <h2 className="font-serif text-lg sm:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl font-bold text-white">Consultation Confirmed!</h2>
                  <p className="text-white/90 text-xs 3xl:text-sm 4xl:text-base max-w-xs 4xl:max-w-md mx-auto">
                    Details sent to <strong className="text-white">{formData.email}</strong>.
                  </p>
                </div>

                <div className="p-3 4xl:p-4 rounded-xl 4xl:rounded-2xl bg-white/10 border border-white/20 text-left text-xs 3xl:text-sm 4xl:text-base space-y-1.5 4xl:space-y-2 font-sans">
                  <p><span className="text-white/80">Client:</span> <strong className="text-white">{formData.name}</strong></p>
                  <p><span className="text-white/80">Service:</span> <strong className="text-white">{activeService.label}</strong></p>
                  <p><span className="text-white/80">Date/Time:</span> <strong className="text-white">{selectedDate} at {selectedSlot}</strong></p>
                  {bookingResult?.jitsiLink && (
                    <div className="pt-1.5 4xl:pt-2 border-t border-white/15 mt-1">
                      <span className="block text-[10px] 3xl:text-xs 4xl:text-sm text-white/80">Video Link:</span>
                      <a
                        href={bookingResult.jitsiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs 3xl:text-sm 4xl:text-base text-yellow-300 hover:underline font-mono break-all font-semibold"
                      >
                        {bookingResult.jitsiLink}
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2 4xl:pt-3">
                  <button
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        serviceType: 'kundli-prediction',
                        birthDate: '',
                        birthTime: '',
                        birthPlace: '',
                        additionalInfo: ''
                      });
                      setSelectedSlot('');
                      setIsEmailVerified(false);
                      setVerificationToken('');
                      setStep(1);
                    }}
                    className="px-6 4xl:px-8 py-2.5 4xl:py-3.5 rounded-full border border-white/30 text-white hover:text-[#4f3129] hover:bg-white font-semibold uppercase tracking-wider text-xs 3xl:text-sm 4xl:text-base transition-all duration-300 cursor-pointer shadow-md"
                  >
                    Book Another Reading
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

      </div>

      {/* 6-Digit Email OTP Verification Modal */}
      <EmailOtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={formData.email}
        purpose="booking"
        onVerified={handleOtpVerified}
      />

    </div>
  );
}

