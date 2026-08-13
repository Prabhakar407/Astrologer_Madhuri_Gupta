import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, MapPin, User, Mail, Sparkles, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react'

function Booking() {
  const [searchParams] = useSearchParams()
  const initialService = searchParams.get('service') || 'birth-chart'

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
  })

  // Booking Flow State
  const [step, setStep] = useState(1) // 1: Info & Birth Details, 2: Slot Selection, 3: Success
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState([])
  const [selectedSlot, setSelectedSlot] = useState('')
  
  // Loading & Error States
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookingResult, setBookingResult] = useState(null)

  // Update form service type if URL parameter changes
  useEffect(() => {
    if (searchParams.get('service')) {
      setFormData(prev => ({ ...prev, serviceType: searchParams.get('service') }))
    }
  }, [searchParams])

  const serviceOptions = [
    { value: 'birth-chart', label: 'Detailed Birth Chart Reading (60 min)' },
    { value: 'compatibility', label: 'Relationship Compatibility - Kundali Milan (45 min)' },
    { value: 'career-wealth', label: 'Career & Wealth Guidance (45 min)' },
    { value: 'yearly-transit', label: 'Yearly Solar Return - Varshphal (45 min)' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Fetch slots from FastAPI backend
  const handleProceedToSlots = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setLoading(true)
    
    // Default selected date to today or birthDate or tomorrow
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const formattedTomorrow = tomorrow.toISOString().split('T')[0]
    setSelectedDate(formattedTomorrow)

    try {
      // Query backend for slots on selected date
      const response = await fetch(`/api/available-slots?date=${formattedTomorrow}`)
      if (!response.ok) {
        throw new Error('Failed to load slots from calendar API.')
      }
      const data = await response.json()
      setAvailableSlots(data.slots || [])
      setStep(2)
    } catch (err) {
      console.error(err)
      // Fallback slots if backend is not reachable during initial development
      setAvailableSlots(['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'])
      setStep(2)
    } finally {
      setLoading(false)
    }
  }

  // Handle changing dates in the slots panel
  const handleDateChange = async (date) => {
    setSelectedDate(date)
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/available-slots?date=${date}`)
      if (!response.ok) {
        throw new Error('Failed to load slots.')
      }
      const data = await response.json()
      setAvailableSlots(data.slots || [])
    } catch (err) {
      console.error(err)
      setAvailableSlots(['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'])
    } finally {
      setLoading(false)
    }
  }

  // Submit Booking to FastAPI
  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      setError('Please select a time slot.')
      return
    }
    setError('')
    setBookingLoading(true)

    const payload = {
      ...formData,
      bookingDate: selectedDate,
      bookingTime: selectedSlot
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to confirm booking.')
      }

      const result = await response.json()
      setBookingResult(result)
      setStep(3)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Connection lost. Please try booking again.')
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="font-serif text-gold-400 tracking-widest text-sm uppercase">Align with the Stars</span>
          <h1 className="font-serif text-4xl font-bold text-white tracking-wide">
            Book a Consultation
          </h1>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto" />
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-center items-center space-x-4 mb-10 text-sm font-medium tracking-wide">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-gold-400' : 'text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-gold-400 bg-gold-500/10' : 'border-slate-600'}`}>1</span>
            <span>Birth Details</span>
          </div>
          <div className="h-[1px] w-8 bg-slate-700" />
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-gold-400' : 'text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-gold-400 bg-gold-500/10' : 'border-slate-600'}`}>2</span>
            <span>Select Time</span>
          </div>
          <div className="h-[1px] w-8 bg-slate-700" />
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-gold-400' : 'text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 3 ? 'border-gold-400 bg-gold-500/10' : 'border-slate-600'}`}>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/5 text-red-300 text-sm flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* STEP 1: Personal and Birth Details Form */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass-panel p-8 rounded-3xl"
            >
              <form onSubmit={handleProceedToSlots} className="space-y-6">
                <h2 className="font-serif text-xl font-bold text-white border-b border-gold-500/10 pb-3 flex items-center space-x-2">
                  <User className="h-5 w-5 text-gold-400" />
                  <span>Personal Information</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Name *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full pl-11 pr-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full pl-11 pr-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Consultation Service *</label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm appearance-none"
                    >
                      {serviceOptions.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-cosmic-900 text-white">{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <h2 className="font-serif text-xl font-bold text-white border-b border-gold-500/10 pt-4 pb-3 flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-gold-400" />
                  <span>Vedic Birth Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="birthDate"
                      required
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Time of Birth *</label>
                    <input
                      type="time"
                      name="birthTime"
                      required
                      value={formData.birthTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Place of Birth *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        name="birthPlace"
                        required
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        placeholder="City, Country"
                        className="w-full pl-11 pr-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Specific Questions or Focus Areas</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="E.g., marriage timing, career path, Sade Sati concerns..."
                    className="w-full px-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-cosmic-950 font-bold uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50"
                  >
                    {loading ? 'Finding Auspicious Times...' : 'Proceed to Calendar'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 2: Time Slot Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass-panel p-8 rounded-3xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-gold-500/10 pb-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to details</span>
                </button>
                <span className="text-xs text-gold-400 font-serif uppercase tracking-widest">Select Session Time</span>
              </div>

              {/* Date Input Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Appointment Date</label>
                <div className="relative max-w-xs">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-cosmic-950/80 border border-slate-700/60 rounded-xl focus:border-gold-500 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              {/* Available Slots Grid */}
              <div className="space-y-4">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Available Slots for {new Date(selectedDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</label>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-2">
                    <div className="w-8 h-8 rounded-full border-2 border-gold-500 border-t-transparent animate-spin" />
                    <span className="text-xs text-slate-400">Retrieving slots from Google Calendar...</span>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <div className="text-center py-12 border border-slate-800/80 rounded-2xl bg-cosmic-950/50">
                    <p className="text-slate-400 text-sm">No available slots found for this date.</p>
                    <p className="text-xs text-slate-500 mt-1">Please select another date in the calendar above.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3.5 px-4 rounded-xl border font-medium text-xs tracking-wider uppercase transition-all ${
                          selectedSlot === slot
                            ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-cosmic-950 border-transparent shadow-lg shadow-gold-500/10'
                            : 'bg-cosmic-950/60 border-slate-700/60 text-slate-300 hover:border-gold-400 hover:text-white'
                        }`}
                      >
                        <Clock className="h-3 w-3 inline mr-1.5 -mt-0.5" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary panel before confirmation */}
              <div className="p-4 rounded-2xl bg-gold-500/5 border border-gold-500/10 text-sm space-y-2">
                <p className="text-slate-400"><strong className="text-gold-300">Consultation:</strong> {serviceOptions.find(o => o.value === formData.serviceType)?.label}</p>
                <p className="text-slate-400"><strong className="text-gold-300">Name:</strong> {formData.name} ({formData.email})</p>
                <p className="text-slate-400"><strong className="text-gold-300">Birth Info:</strong> {formData.birthDate} at {formData.birthTime} in {formData.birthPlace}</p>
                {selectedSlot && (
                  <p className="text-slate-300 font-medium pt-1 border-t border-gold-500/10 mt-2 flex items-center space-x-1">
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                    <span>Selected {selectedDate} at {selectedSlot}</span>
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleConfirmBooking}
                  disabled={bookingLoading || !selectedSlot}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-600 to-gold-400 text-cosmic-950 font-bold uppercase tracking-wider hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {bookingLoading ? 'Registering meeting...' : 'Confirm Consultation Booking'}
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Booking Success */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-6"
            >
              <div className="inline-flex p-4 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
                <CheckCircle2 className="h-12 w-12 animate-[pulse_2s_infinite]" />
              </div>
              
              <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-white">Consultation Booked!</h2>
                <p className="text-slate-300 font-light text-sm max-w-md mx-auto">
                  Your appointment has been registered with Google Calendar. An invite has been dispatched to <strong className="text-gold-400 font-normal">{formData.email}</strong>.
                </p>
              </div>

              <div className="max-w-md mx-auto p-6 rounded-2xl bg-cosmic-950/70 border border-gold-500/10 text-left text-sm space-y-3 font-sans">
                <h3 className="font-serif text-gold-300 font-semibold border-b border-gold-500/10 pb-2">Session Details</h3>
                <p><span className="text-slate-400">Client:</span> <span className="text-white">{formData.name}</span></p>
                <p><span className="text-slate-400">Date/Time:</span> <span className="text-white">{selectedDate} at {selectedSlot}</span></p>
                {bookingResult?.jitsiLink && (
                  <div className="pt-2 border-t border-gold-500/10 mt-2">
                    <span className="block text-xs text-slate-400 mb-1">Meeting Link (Jitsi):</span>
                    <a
                      href={bookingResult.jitsiLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-400 hover:text-blue-300 underline font-mono break-all"
                    >
                      {bookingResult.jitsiLink}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-6">
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
                    })
                    setSelectedSlot('')
                    setStep(1)
                  }}
                  className="px-8 py-3.5 rounded-full border border-gold-500/40 text-gold-300 hover:text-cosmic-950 hover:bg-gradient-to-r hover:from-gold-600 hover:to-gold-400 hover:border-transparent font-semibold uppercase tracking-wider text-xs transition-all duration-300"
                >
                  Book Another Reading
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  )
}

export default Booking
