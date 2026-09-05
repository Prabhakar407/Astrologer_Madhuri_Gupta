import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, ShieldCheck, RefreshCw, X, CheckCircle2, AlertTriangle, Lock } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? '' : 'https://astrologer-madhuri-gupta.onrender.com');

/**
 * High-Speed 6-Digit Email OTP Verification Component
 * Features:
 * - 6 individual auto-advancing input boxes with backspace rewind
 * - Full 6-digit clipboard paste support
 * - Auto-verification upon typing 6th digit
 * - 60s countdown resend timer
 * - Celestial gold themed Framer Motion UI
 */
export default function EmailOtpModal({
  isOpen,
  onClose,
  email,
  purpose = 'booking',
  onVerified,
  autoRequestOnOpen = true
}) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const inputRefs = useRef([]);

  // Auto-focus first input on open & initiate OTP dispatch
  useEffect(() => {
    if (isOpen) {
      setDigits(['', '', '', '', '', '']);
      setError('');
      setSuccessMsg('');
      setResendTimer(60);
      
      const timer = setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 100);

      if (autoRequestOnOpen && email) {
        requestOtp();
      }

      return () => clearTimeout(timer);
    }
  }, [isOpen, email]);

  // 60-Second Countdown Timer
  useEffect(() => {
    let interval = null;
    if (isOpen && resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, resendTimer]);

  // Request OTP from Backend (Resend + Upstash Redis)
  const requestOtp = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), purpose })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Failed to dispatch verification code.');
      }
      setSuccessMsg(`Security code sent to ${email}. Valid for 5 minutes.`);
      setResendTimer(60);
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message?.includes('NetworkError')) {
        setError('Cannot connect to backend server. Please ensure the backend is active.');
      } else {
        setError(err.message || 'Unable to send OTP. Please check your email.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Verify full 6-digit OTP
  const verifyOtpCode = async (otpToVerify) => {
    const code = otpToVerify || digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of your verification code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          otp: code.trim(),
          purpose
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || 'Incorrect or expired verification code.');
      }

      // Instant optimistic callback (0ms)
      if (onVerified) {
        onVerified(data.verifiedToken);
      }
      onClose();
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message?.includes('NetworkError')) {
        setError('Cannot connect to backend server. Please verify the service is running.');
      } else {
        setError(err.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle individual digit input with auto-advance & auto-verify on 6th digit
  const handleDigitChange = (index, value) => {
    const rawVal = value.replace(/\D/g, '');
    if (!rawVal) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      return;
    }

    const char = rawVal.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setError('');

    // Advance to next box
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all 6 digits are populated
    const fullCode = newDigits.join('');
    if (fullCode.length === 6 && !newDigits.includes('')) {
      verifyOtpCode(fullCode);
    }
  };

  // Handle Backspace rewind
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Clipboard Paste (Paste full 6 digits anywhere)
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = [...digits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setDigits(newDigits);
    setError('');

    const focusIdx = Math.min(pastedData.length, 5);
    inputRefs.current[focusIdx]?.focus();

    if (pastedData.length === 6) {
      verifyOtpCode(pastedData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-[#4f3129] border border-[#deb18a]/35 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white relative space-y-5"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-13 h-13 rounded-full bg-[#b8922b]/20 border border-[#b8922b]/50 text-[#deb18a] flex items-center justify-center mx-auto shadow-inner">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
                Verify Your Email
              </h3>
              <p className="text-xs text-[#deb18a]/85 leading-relaxed max-w-xs mx-auto">
                Enter the 6-digit security code sent to <br />
                <strong className="text-white font-medium break-all">{email}</strong>
              </p>
            </div>

            {/* Success Notification */}
            {successMsg && (
              <div className="p-2.5 rounded-xl bg-green-500/15 border border-green-500/30 text-green-300 text-xs text-center flex items-center justify-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-center flex items-center justify-center space-x-1.5 shadow-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 6-Digit Individual Input Grid */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-[#deb18a] text-center">
                Security Verification Code
              </label>
              <div className="flex justify-center items-center gap-2 sm:gap-2.5" onPaste={handlePaste}>
                {digits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-mono font-bold bg-white/10 border border-[#deb18a]/35 rounded-xl focus:border-[#deb18a] focus:ring-2 focus:ring-[#b8922b]/50 focus:outline-none text-white transition-all shadow-inner"
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <button
                type="button"
                onClick={() => verifyOtpCode()}
                disabled={loading || digits.join('').length !== 6}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b8922b] to-[#a27e20] hover:brightness-110 active:scale-[0.99] disabled:opacity-40 text-white font-bold uppercase tracking-wider text-xs shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>

              {/* 60s Resend Timer */}
              <div className="text-center">
                {resendTimer > 0 ? (
                  <span className="text-[11px] text-[#deb18a]/70 font-medium">
                    Resend available in <strong className="text-white font-bold">{resendTimer}s</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={requestOtp}
                    disabled={loading}
                    className="text-xs text-[#deb18a] hover:text-white font-semibold hover:underline flex items-center justify-center space-x-1.5 mx-auto cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Resend Security Code</span>
                  </button>
                )}
              </div>
            </div>

            {/* Security Footer Note */}
            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-white/40 pt-1 border-t border-white/10">
              <Lock className="w-3 h-3 text-[#deb18a]/60" />
              <span>Encrypted via Upstash Serverless Redis & Resend TLS</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
