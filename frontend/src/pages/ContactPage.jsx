import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  CheckCircle2,
  AlertTriangle,
  Send
} from "lucide-react";
import EmailOtpModal from "../components/EmailOtpModal.jsx";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? '' : 'https://astrologer-madhuri-gupta.onrender.com');

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Astrologer Madhuri Gupta | Sarsa Jyotish Sansthan Agra";
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Website Contact Form Inquiry",
    message: ""
  });

  // Verification & Status States
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const [statusMsg, setStatusMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "email" && isEmailVerified) {
      setIsEmailVerified(false);
      setVerificationToken("");
    }
  };

  // Professional mobile phone validation (No +91 enforced)
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

  // Submit Contact Query (Asynchronous on backend)
  const submitContactQuery = async (tokenToUse) => {
    setLoading(true);
    setStatusMsg("");
    setIsSuccess(false);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim() || "Website Contact Form Inquiry",
        message: formData.message.trim(),
        verificationToken: tokenToUse || verificationToken
      };

      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to submit contact query.');
      }

      setIsSuccess(true);
      setStatusMsg("Thank you! Your message has been sent successfully. Astrologer Madhuri Gupta will connect with you shortly.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Website Contact Form Inquiry",
        message: ""
      });
      setIsEmailVerified(false);
      setVerificationToken("");
    } catch (err) {
      setIsSuccess(false);
      if (err.message === 'Failed to fetch' || err.message?.includes('NetworkError')) {
        setStatusMsg('Cannot connect to backend server. Please verify the backend service is running.');
      } else {
        setStatusMsg(err.message || 'Server error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Form submission click handler (0ms Instant Modal Opening)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg("");

    // Form Constraints Validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatusMsg("Please enter your name (at least 2 characters).");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setStatusMsg("Please enter a valid email address.");
      return;
    }
    const phoneCheck = validatePhone(formData.phone);
    if (!phoneCheck.valid) {
      setStatusMsg(phoneCheck.message);
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatusMsg("Please enter a message (at least 5 characters).");
      return;
    }

    // 0ms Instant Modal Opening: User sees modal immediately while OTP request dispatches in background
    if (!isEmailVerified) {
      setShowOtpModal(true);
      return;
    }

    await submitContactQuery(verificationToken);
  };

  return (
    <div className="min-h-screen bg-[#F3E7D5]">
      
      {/* Top Header Section (Dark Brown Background) */}
      <section className="contact-hero-section bg-[#4f3129] relative z-10">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] 4xl:max-w-[2400px] 5xl:max-w-[3200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 5xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
            
            {/* Header Text & Contact Info Cards (Left 7 Columns) */}
            <div className="md:col-span-7 space-y-4 lg:space-y-5 2xl:space-y-6 text-left relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <h1 className="text-3xl sm:text-5xl lg:text-6xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl 5xl:text-9xl font-bold text-white font-serif tracking-wide leading-tight">
                  Contact Us
                </h1>
                <p className="text-white/90 max-w-lg 3xl:max-w-2xl 4xl:max-w-3xl 5xl:max-w-4xl text-sm sm:text-base md:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl font-normal leading-relaxed">
                  Have questions about your astrological path or booking a consultation? Reach out today, and let us align your cosmic journey together.
                </p>
              </motion.div>

              {/* Contact Info Badges in Hero: Stacked on tablet (md to lg) to prevent right image overlap, 3-cols on xl desktop */}
              <div className="hidden md:grid md:grid-cols-1 xl:grid-cols-3 gap-3.5 xl:gap-6 pt-5 border-t border-white/20">
                
                {/* Phone */}
                <div className="flex flex-row items-center space-x-3 text-left">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                    <Phone className="w-4.5 h-4.5 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm lg:text-base 3xl:text-xl font-bold text-white font-serif tracking-tight whitespace-nowrap">
                      +91 88815 73437
                    </h3>
                    <p className="text-xs sm:text-sm 3xl:text-base text-white/90 font-medium">
                      Call or WhatsApp
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-row items-center space-x-3 text-left">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                    <Mail className="w-4.5 h-4.5 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm lg:text-sm xl:text-base 3xl:text-xl font-bold text-white font-sans lowercase tracking-tight whitespace-nowrap">
                      sarsajyotish@gmail.com
                    </h3>
                    <p className="text-xs sm:text-sm 3xl:text-base text-white/90 font-medium">
                      Support Email
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-row items-center space-x-3 text-left">
                  <div className="w-10 h-10 lg:w-11 lg:h-11 3xl:w-14 3xl:h-14 4xl:w-16 4xl:h-16 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                    <MapPin className="w-4.5 h-4.5 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm lg:text-base 3xl:text-xl font-bold text-white font-serif tracking-tight whitespace-nowrap">
                      Agra, Uttar Pradesh, India
                    </h3>
                    <p className="text-xs sm:text-sm 3xl:text-base text-white/90 font-medium whitespace-nowrap">
                      Available Globally
                    </p>
                  </div>
                </div>

              </div>

              {/* Mobile view: Flex row splitting text on left and small image on right */}
              <div className="flex md:hidden flex-row justify-between items-stretch gap-3 pt-4 border-t border-white/20">
                {/* Left: Contact Info Stack */}
                <div className="space-y-3.5 flex-grow min-w-0">
                  {/* Phone */}
                  <div className="flex flex-row items-center space-x-2.5 sm:space-x-3 text-left">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                      <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-white font-serif tracking-tight whitespace-nowrap">
                        +91 88815 73437
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/90 font-medium">
                        Call or WhatsApp
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-row items-center space-x-2.5 sm:space-x-3 text-left">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                      <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-white font-sans lowercase tracking-tight whitespace-nowrap">
                        sarsajyotish@gmail.com
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/90 font-medium">
                        Support Email
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-row items-center space-x-2.5 sm:space-x-3 text-left">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                      <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold text-white font-serif tracking-tight whitespace-nowrap">
                        Agra, Uttar Pradesh, India
                      </h3>
                      <p className="text-[11px] sm:text-xs text-white/90 font-medium whitespace-nowrap">
                        Available Globally
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right: Small Arched Image aligned to the right side */}
                <div className="flex items-center shrink-0 pr-1">
                  <div className="w-[85px] sm:w-[120px] aspect-[4/5] rounded-t-full overflow-hidden shadow-xl">
                    <img
                      src="/contact_office.webp"
                      alt="Astrologer Madhuri Gupta Consultation Office Agra"
                      loading="lazy"
                      className="w-full h-full object-cover object-center pointer-events-none"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Spacer Column */}
            <div className="hidden md:block md:col-span-5" />

          </div>
        </div>
      </section>

      {/* Contact Info Row (Below Header, aligns alongside the hanging arch image) */}
      <section className="bg-[#F3E7D5] pt-4 md:pt-4 2xl:pt-6 pb-6 md:pb-6 2xl:pb-14 relative z-10">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] 4xl:max-w-[2400px] 5xl:max-w-[3200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 5xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 2xl:gap-12 items-start">
            
            {/* Our Location Map Section (Matches EXACT width and alignment of Get in Touch form) */}
            <div className="md:col-span-7 space-y-2 flex flex-col items-center md:items-start text-center md:text-left w-full 3xl:pl-10 4xl:pl-20 5xl:pl-28">
              <div className="w-full max-w-md lg:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl 5xl:max-w-4xl space-y-2">
                <h2 className="text-lg sm:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold text-[#3a1906] font-serif">
                  Our Location
                </h2>

                {/* Google Maps Embed - Width identically constrained to match Get in Touch form */}
                <div className="w-full h-[150px] sm:h-[170px] md:h-[180px] 2xl:h-[230px] 3xl:h-[280px] 4xl:h-[360px] 5xl:h-[460px] rounded-2xl 3xl:rounded-[28px] 4xl:rounded-[36px] overflow-hidden shadow-md border border-[#deb18a]/30">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113579.78737678523!2d77.90997184499092!3d27.17630978716335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39740d857c2f41d9%3A0x784aef38a9523b42!2sAgra%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    title="Astro Madhuri Location Office Map"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Arched image cutout (Right 5 Columns - NO white border/outline, perfectly clean arch) */}
            <div className="hidden md:flex md:col-span-5 relative justify-center 2xl:justify-end md:-mt-36 lg:-mt-40 2xl:-mt-[300px] 3xl:-mt-[400px] 4xl:-mt-[540px] 5xl:-mt-[740px] z-30">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-[280px] sm:w-[340px] 2xl:w-[480px] 3xl:w-[680px] 4xl:w-[940px] 5xl:w-[1300px] h-[360px] sm:h-[430px] 2xl:h-[620px] 3xl:h-[860px] 4xl:h-[1180px] 5xl:h-[1620px] rounded-t-full overflow-hidden shadow-2xl"
              >
                <img
                  src="/contact_office.webp"
                  alt="Astrologer Madhuri Gupta Consultation Office Agra"
                  loading="lazy"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Form & QR Section - Vertically Aligned with Map on the Exact Same Axis */}
      <section className="bg-[#F3E7D5] pb-16 2xl:pb-24 relative z-10 border-t border-[#deb18a]/20 pt-6 md:pt-8 2xl:pt-12">
        <div className="w-full max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] 4xl:max-w-[2400px] 5xl:max-w-[3200px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 5xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 2xl:gap-12 items-start">
            
            {/* Get In Touch Form (Exact same column md:col-span-7 and width constraints as Location Map) */}
            <div className="md:col-span-7 flex flex-col items-center md:items-start text-center md:text-left w-full 3xl:pl-10 4xl:pl-20 5xl:pl-28">
              <div className="w-full max-w-md lg:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl 5xl:max-w-4xl bg-[#4f3129] rounded-2xl 3xl:rounded-3xl p-4 sm:p-5 2xl:p-7 3xl:p-8 shadow-xl space-y-3 2xl:space-y-4 text-white">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold font-serif text-white">
                    Get In Touch !
                  </h2>
                  <p className="text-white/90 text-xs sm:text-sm font-normal leading-relaxed">
                    Fill out the form below to receive a personalized callback.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2.5 2xl:space-y-3">
                  {/* Email Input with Verification Indicator */}
                  <div className="space-y-1">
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address"
                        required
                        className="w-full bg-white/10 border border-white/25 rounded-lg px-3.5 py-2 pr-24 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all"
                      />
                      {isEmailVerified ? (
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1 text-[11px] text-green-300 font-semibold bg-green-950/80 px-2 py-0.5 rounded-full border border-green-500/40">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      ) : formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? (
                        <button
                          type="button"
                          onClick={() => setShowOtpModal(true)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] text-white hover:text-white bg-[#b8922b] hover:bg-[#a27e20] px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer shadow-sm"
                        >
                          Verify
                        </button>
                      ) : null}
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="space-y-1">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      required
                      className="w-full bg-white/10 border border-white/25 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all"
                    />
                  </div>

                  {/* Mobile Phone (No +91 enforced) */}
                  <div className="space-y-1">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile Number (e.g. 98881 57343)"
                      required
                      className="w-full bg-white/10 border border-white/25 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can Astrologer Madhuri Gupta assist you?"
                      rows={2}
                      required
                      className="w-full bg-white/10 border border-white/25 rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all resize-none"
                    ></textarea>
                  </div>

                  {statusMsg && (
                    <div className={`p-2.5 rounded-lg text-xs font-semibold flex items-center space-x-2 ${
                      isSuccess ? 'bg-green-500/20 border border-green-500/40 text-green-200' : 'bg-red-500/20 border border-red-500/40 text-red-200'
                    }`}>
                      {isSuccess ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                      <span>{statusMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-fit bg-[#b8922b] hover:bg-[#a27e20] text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg text-xs sm:text-sm select-none disabled:opacity-50 flex items-center justify-center space-x-1.5"
                  >
                    {loading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* QR & Social Media Column (Right 5 Columns md:col-span-5) */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start justify-start w-full space-y-4 pt-1 3xl:pl-6 4xl:pl-12 5xl:pl-16">
              
              {/* WhatsApp QR Code Section */}
              <div className="space-y-1.5 flex flex-col items-center md:items-start w-full">
                <p className="text-xs sm:text-sm font-bold text-[#3a1906] tracking-wider uppercase font-serif text-center md:text-left">
                  Scan to message on WhatsApp
                </p>
                <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white p-1.5 rounded-lg shadow-md border border-gray-150 flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwa.me%2F918881573437&color=4f3129"
                    alt="Scan to Chat on WhatsApp"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Social Media Links Section */}
              <div className="space-y-2.5 pt-3 border-t border-gray-100 flex flex-col items-center md:items-start w-full">
                <h2 className="text-base sm:text-lg font-bold text-[#3a1906] font-serif">
                  Social Media Links
                </h2>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918881573437"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="WhatsApp Message Direct"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.9 12.003 1.9c-5.439 0-9.865 4.37-9.87 9.8-.002 1.984.518 3.923 1.503 5.644l-.997 3.639 3.75-1.83z" />
                      <path d="M15.93 11.66c-.22-.11-1.29-.64-1.49-.71-.2-.07-.35-.11-.5.11-.15.22-.59.75-.73.91-.14.16-.27.18-.49.07-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.03-.28-.02-.39-.05-.11-.5-1.2-.69-1.65-.19-.45-.37-.39-.51-.4-.13 0-.28-.01-.43-.01-.15 0-.4.06-.6.28-.2.22-.77.75-.77 1.83 0 1.08.79 2.13.9 2.28.11.15 1.55 2.37 3.76 3.32.53.23.94.37 1.26.47.53.17 1.02.15 1.4.09.43-.06 1.29-.53 1.47-1.03.18-.5.18-.94.13-1.03-.05-.08-.2-.13-.42-.24z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Facebook Profile"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>

                  {/* Twitter */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>

                  {/* Youtube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Youtube Channel"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>

                  {/* Website */}
                  <a
                    href="https://astrologermadhuri.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Cosmic Globe Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* High-Speed 6-Digit Email OTP Modal (Sub-3ms Redis) */}
      <EmailOtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={formData.email}
        purpose="contact"
        onVerified={(token) => {
          setIsEmailVerified(true);
          setVerificationToken(token);
          submitContactQuery(token);
        }}
      />

    </div>
  );
}
