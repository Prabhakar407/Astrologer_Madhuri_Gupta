import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Compass, Heart, Shield, Clock, Globe, Sun, Sprout, Flower2, Briefcase, Target, User, Award, Key, TrendingUp, Trophy, Scale, Scroll, Moon, Info, Phone, Mail } from 'lucide-react'
import { TextShimmer } from '../../components/motion-primitives/text-shimmer'

function ScrollCard({ phase, idx }) {
  const canvasVariants = {
    hidden: { height: 0 },
    visible: {
      height: 310,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: idx * 0.15 + 0.3
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: idx * 0.15 + 0.9
      }
    }
  };

  const tasselVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: idx * 0.15 + 1.1
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="flex flex-col items-center relative select-none w-full max-w-[260px] mx-auto pb-12"
    >
      {/* Top hanging thread loop (hanging from horizontal line cord) */}
      <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-4 h-4 border-t-2 border-x-2 border-[#deb18a]/45 rounded-t-full pointer-events-none z-10" />

      {/* Top Wooden Rod (static) */}
      <div 
        className="w-[108%] h-3.5 bg-gradient-to-r from-[#1f0e0a] via-[#3a1d15] to-[#1f0e0a] rounded-sm shadow-md z-30 relative flex items-center justify-between px-1"
        style={{ border: '1px solid rgba(222, 177, 138, 0.25)' }}
      >
        <div className="w-1.5 h-full bg-[#deb18a] rounded-l-sm" />
        <div className="w-1.5 h-full bg-[#deb18a] rounded-r-sm" />
      </div>

      {/* Scroll Canvas Wrapper - sits directly below top wooden rod to correct the gap */}
      <div className="w-full relative z-20 overflow-visible flex flex-col items-center">
        <motion.div
          variants={canvasVariants}
          animate={{ rotate: [-0.6, 0.6, -0.6] }}
          transition={{ repeat: Infinity, duration: 6.5, ease: "easeInOut" }}
          style={{ transformOrigin: "top center" }}
          className="w-full overflow-visible flex flex-col items-center relative"
        >
          {/* Canvas Pointy Card Shape (Traditional dark bronze-gold with gold border) */}
          <div 
            className="w-full relative bg-[#deb18a]"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)',
              height: '310px'
            }}
          >
            {/* Inner Content Card (to create the 1.5px border) */}
            <div 
              className="absolute inset-[1.5px] bg-gradient-to-br from-[#4a312a] via-[#3d241d] to-[#2d1b16] flex flex-col items-center justify-between p-5 pt-6 pb-12"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0 88%)',
              }}
            >
              {/* Scroll Content (only visible when unrolled) */}
              <motion.div
                variants={contentVariants}
                className="w-full flex flex-col items-center space-y-4"
              >
                {/* Icon */}
                <div className="p-2.5 rounded-full bg-[#deb18a]/5 border border-[#deb18a]/20 flex items-center justify-center shadow-inner">
                  {phase.isCustomIcon ? (
                    <div className="relative h-7 w-7 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-yellow-200 animate-pulse absolute" />
                      <svg className="h-7 w-7 text-[#deb18a] animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                        <circle cx="12" cy="3" r="1.5" fill="#deb18a" />
                        <circle cx="21" cy="12" r="1.5" fill="#deb18a" />
                        <circle cx="3" cy="12" r="1.5" fill="#deb18a" />
                        <circle cx="12" cy="21" r="1.5" fill="#deb18a" />
                      </svg>
                    </div>
                  ) : (
                    React.cloneElement(phase.icon, { className: 'h-6 w-6 text-[#deb18a]' })
                  )}
                </div>

                {/* Title */}
                <div className="space-y-0.5 text-center">
                  <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-[#deb18a]/70 uppercase block">
                    {phase.phase}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#deb18a] tracking-wider uppercase leading-snug">
                    {phase.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-[#f5ebd6]/85 font-light leading-relaxed max-w-[190px] text-center">
                  {phase.desc}
                </p>
              </motion.div>

              {/* Phase 4 Button */}
              {phase.hasCTA && (
                <motion.div
                  variants={contentVariants}
                  className="w-full px-2"
                >
                  <Link
                    to="/booking"
                    className="inline-block px-4 py-2 font-sans text-[9px] font-bold tracking-[0.15em] text-[#3a1906] bg-gradient-to-r from-[#deb18a] via-[#f3dbaf] to-[#deb18a] hover:from-[#f3dbaf] hover:to-[#deb18a] shadow-md border border-[#39190c] uppercase rounded-sm w-full text-center hover:scale-[1.02] transition-transform duration-200"
                  >
                    COMMENCE YOUR JOURNEY
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Floating Circle Hook Tassel Thread hanging from bottom center tip of triangle */}
          <motion.div
            variants={tasselVariants}
            className="absolute bottom-[-32px] left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
          >
            {/* Hanging Cord with wind-blown swaying animation */}
            <motion.div
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
              className="flex flex-col items-center origin-top"
            >
              {/* String */}
              <div className="w-[1.2px] h-6 bg-gradient-to-b from-[#deb18a] to-[#c59c76]" />
              {/* Floating Circle Hook (glowing gold ring) */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 4px #deb18a", "0 0 10px #deb18a", "0 0 4px #deb18a"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#deb18a] bg-transparent flex items-center justify-center -mt-[1px]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#deb18a]/80" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ServiceAccordion({ service, isOpen, onToggle }) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Accordion Header */}
      <button 
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#deb18a] via-[#f3dbaf] to-[#deb18a] border border-[#3a1906]/35 rounded-sm hover:scale-[1.01] transition-transform duration-200 cursor-pointer shadow-md text-left"
      >
        <div className="flex items-center space-x-3">
          {service.icon}
          <span className="font-serif text-sm sm:text-base font-bold text-[#3a1906] tracking-wider uppercase">
            {service.title}
          </span>
          {/* Info Icon & Smooth Hover Tooltip Box */}
          <div className="relative group/info inline-block" onClick={(e) => e.stopPropagation()}>
            <Info className="h-4 w-4 text-[#3a1906]/60 hover:text-[#3a1906] transition-colors cursor-help shrink-0" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-60 sm:w-64 p-3.5 bg-[#4f3129] border border-[#deb18a]/30 text-[#faf6e8] rounded-xl shadow-xl opacity-0 pointer-events-none group-hover/info:opacity-100 group-hover/info:pointer-events-auto transition-all duration-300 transform translate-y-1 group-hover/info:translate-y-0 z-50 normal-case tracking-normal">
              <div className="font-serif font-bold text-[9px] text-[#deb18a] uppercase tracking-wider mb-1.5 border-b border-[#deb18a]/20 pb-1">
                Overview
              </div>
              <p className="font-sans text-[11px] leading-relaxed text-[#f5ebd6]/90 font-medium">
                {service.shortDesc}
              </p>
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#3a1906]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      {/* Accordion Content */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full overflow-hidden"
      >
        <div className="p-5 bg-gradient-to-b from-[#faf6e8] to-[#f4edd9] border-x border-b border-[#3a1906]/20 rounded-b-sm space-y-4 text-[#3b2a1f] shadow-inner">
          {service.id === 'vedic-astrology' ? (
            <div className="space-y-6">
              {/* Section 1: Kundli Matching */}
              <div className="space-y-2.5">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#3a1906] tracking-wide uppercase">
                  Kundli Matching
                </h4>
                <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-[#4a312a]/95 font-medium list-none">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#b8922b] mt-0.5">•</span>
                    <span><strong>Ashta Koota Milan:</strong> Comprehensive compatibility analysis using the traditional 36-Guna alignment system.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#b8922b] mt-0.5">•</span>
                    <span><strong>Dosha Verification:</strong> Deep checking of Manglik Dosha, Bhakoot, Nadi, and potential planetary conflicts.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#b8922b] mt-0.5">•</span>
                    <span><strong>Remedial Solutions:</strong> Actionable relationship counseling and Vedic remedies to foster long-term harmony.</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-bold text-[#3a1906] pt-1">
                  <span>Price: ₹2,100</span>
                  <span>Duration: 45 Mins Session</span>
                </div>
                <div className="pt-2">
                  <Link
                    to="/booking?service=kundli-matching"
                    className="btn-10"
                  >
                    <div className="slide-bg"></div>
                    <span className="arrow-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    <span className="btn-text">Book Appointment</span>
                  </Link>
                </div>
              </div>

              {/* Brown Horizontal Divider */}
              <div className="h-[1.5px] bg-[#3a1906]/20 w-full my-4" />

              {/* Section 2: Kundli Prediction */}
              <div className="space-y-2.5">
                <h4 className="font-serif font-bold text-sm sm:text-base text-[#3a1906] tracking-wide uppercase">
                  Kundli Prediction
                </h4>
                <ul className="space-y-1.5 font-sans text-xs sm:text-sm text-[#4a312a]/95 font-medium list-none">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#b8922b] mt-0.5">•</span>
                    <span><strong>Houses Activation:</strong> Full decoding of your birth chart to map house strengths and planetary influences.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#b8922b] mt-0.5">•</span>
                    <span><strong>Dasha Timeline:</strong> Predictive timelines for key life events including career, finances, and relationships.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#b8922b] mt-0.5">•</span>
                    <span><strong>Tailored Remedies:</strong> Practical guidance on suitable gemstones, charity acts, and mantra recitations.</span>
                  </li>
                </ul>
                <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-bold text-[#3a1906] pt-1">
                  <span>Price: ₹2,500</span>
                  <span>Duration: 60 Mins Session</span>
                </div>
                <div className="pt-2">
                  <Link
                    to="/booking?service=kundli-prediction"
                    className="btn-10"
                  >
                    <div className="slide-bg"></div>
                    <span className="arrow-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                    <span className="btn-text">Book Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="font-sans text-xs sm:text-sm font-medium tracking-wide italic text-[#4a312a]/95">
                {service.tagline}
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm font-sans font-bold text-[#3a1906]">
                <span>Price: {service.price}</span>
                <span>Duration: {service.duration}</span>
              </div>
              <div className="h-[1px] bg-[#3a1906]/10 w-full" />
              <ul className="space-y-2">
                {service.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#4a312a]/90">
                    <span className="text-[#3a1906] font-bold">•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <Link
                  to={`/booking?service=${service.id}`}
                  className="btn-10"
                >
                  <div className="slide-bg"></div>
                  <span className="arrow-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                  <span className="btn-text">Book Session</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Home() {
  const [activeServiceId, setActiveServiceId] = React.useState(null);

  React.useEffect(() => {
    document.title = "Best Vedic Astrologer in Agra | Sarsa Jyotish Sansthan";
  }, []);

  const zodiacSigns = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 
    'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 
    'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ]

  const serviceList = [
    {
      id: 'vedic-astrology',
      title: 'Vedic Astrology',
      tagline: 'Kundli Matching & Kundli Prediction',
      shortDesc: 'Kundli Matching for marital compatibility and Kundli Prediction for career, relationships, and financial guidance.',
      duration: '45 - 60 Mins',
      price: '₹2,100 - ₹2,500',
      icon: <Moon className="h-5 w-5 text-purple-700 fill-purple-700 shrink-0" />,
      features: [
        'Detailed Guna Milan matching analysis',
        'In-depth birth chart predictions',
        'Dasha transit & timing timelines',
        'Personalized remedies & Gemstones'
      ]
    },
    {
      id: 'vastu-consultation',
      title: 'Vastu Consultation',
      tagline: 'Spatial geometry & elemental energy balance',
      shortDesc: 'Harmonizing the energies of your home, office, or plot using spatial geometry, elemental balance, and classical Vastu remedies.',
      duration: '90 Mins Session',
      price: '₹4,500',
      icon: <Compass className="h-5 w-5 text-teal-600 fill-teal-600 shrink-0" />,
      features: [
        'Spatial layout assessment',
        'Elemental energy mapping',
        'Structural blockage remedies',
        'Detailed correction report PDF'
      ]
    },
    {
      id: 'numerology',
      title: 'Numerology',
      tagline: 'Destiny numbers & name spelling alignment',
      shortDesc: 'Decoding the vibrational signature of your birth date, name, and destiny numbers to optimize your path, career, and compatibility.',
      duration: '45 Mins Session',
      price: '₹2,100',
      icon: <Scroll className="h-5 w-5 text-amber-600 fill-amber-600 shrink-0" />,
      features: [
        'Destiny & path calculation',
        'Name vibration alignment',
        'Personal year predictions',
        'Name spelling correction'
      ]
    }
  ]

  const phases = [
    {
      phase: "PHASE 1",
      title: "COSMIC ALIGNMENT",
      icon: <Sun className="h-6 w-6 text-[#deb18a]" />,
      desc: "Discovering your foundational life path and planetary influences."
    },
    {
      phase: "PHASE 2",
      title: "INTENTION & MANIFESTATION",
      icon: <Sprout className="h-6 w-6 text-[#deb18a]" />,
      desc: "Nurturing inner peace and setting clear, powerful life objectives."
    },
    {
      phase: "PHASE 3",
      title: "CELESTIAL WISDOM & ASCENSION",
      icon: <Flower2 className="h-6 w-6 text-[#deb18a]" />,
      desc: "Guiding you toward fulfillment, unlocking your true potential."
    },
    {
      phase: "PHASE 4",
      title: "ASTRO MANIFESTATION",
      isCustomIcon: true,
      desc: "Activating your aligned intentions to create real-world abundance, success, and spiritual joy.",
      hasCTA: true
    }
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden" style={{ background: 'linear-gradient(to bottom, #5d4238 0%, #b39480 50%, #ceb7a6 100%)' }}>
      
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-12 min-h-screen flex flex-col items-center justify-center overflow-hidden z-10">
        {/* Background Image (rose-gold marble without zodiac wheel) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-95 pointer-events-none" 
          style={{ backgroundImage: "url('/marble-bg.jpg')" }}
        />
        {/* Top gradient shadow for navbar links contrast */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cosmic-950/40 to-transparent z-0 pointer-events-none" />

        {/* Left Side Decorative Astronomy Graphic (Crescent Moon & Constellation) */}
        <div className="absolute left-6 xl:left-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center z-20 select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ 
              opacity: 0.45, 
              scale: 1, 
              x: 0,
              y: [0, -10, 0]
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut" },
              x: { duration: 1.5, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative"
          >
            {/* Fine-line Golden Cosmic SVG */}
            <svg width="180" height="220" viewBox="0 0 100 120" className="stroke-[#deb18a]/40 stroke-[0.75] fill-none">
              {/* Crescent Moon */}
              <path d="M45 25 A 25 25 0 1 0 75 75 A 21 21 0 1 1 45 25 Z" className="stroke-[#b8922b]/50" />
              {/* Constellation link lines */}
              <line x1="20" y1="40" x2="35" y2="55" strokeDasharray="1.5,1.5" />
              <line x1="35" y1="55" x2="15" y2="75" strokeDasharray="1.5,1.5" />
              <line x1="15" y1="75" x2="30" y2="95" strokeDasharray="1.5,1.5" />
              <line x1="30" y1="95" x2="55" y2="105" strokeDasharray="1.5,1.5" />
              {/* Star Nodes */}
              <circle cx="20" cy="40" r="1.5" className="fill-[#b8922b]/70 stroke-none" />
              <circle cx="35" cy="55" r="2" className="fill-[#b8922b]/90 stroke-none animate-pulse" />
              <circle cx="15" cy="75" r="1.5" className="fill-[#b8922b]/70 stroke-none" />
              <circle cx="30" cy="95" r="2" className="fill-[#b8922b]/90 stroke-none animate-pulse" />
              <circle cx="55" cy="105" r="1.5" className="fill-[#b8922b]/70 stroke-none" />
              {/* Shimmering 4-Point Stars */}
              <path d="M 68 35 Q 68 39 72 39 Q 68 39 68 43 Q 68 39 64 39 Q 68 39 68 35 Z" className="fill-[#b8922b]/80 stroke-none" />
              <path d="M 28 20 Q 28 23 31 23 Q 28 23 28 26 Q 28 23 25 23 Q 28 23 28 20 Z" className="fill-[#b8922b]/60 stroke-none" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4f3129]/5 font-serif text-7xl select-none">
              ☾
            </div>
          </motion.div>
        </div>

        {/* Right Side Decorative Astronomy Graphic (Sun & Astronomical Rings) */}
        <div className="absolute right-6 xl:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center z-20 select-none pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ 
              opacity: 0.45, 
              scale: 1, 
              x: 0,
              y: [0, -10, 0]
            }}
            transition={{
              opacity: { duration: 1.5, ease: "easeOut" },
              x: { duration: 1.5, ease: "easeOut" },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="relative"
          >
            {/* Fine-line Golden Cosmic Astrolabe SVG */}
            <svg width="180" height="220" viewBox="0 0 100 120" className="stroke-[#deb18a]/40 stroke-[0.75] fill-none">
              {/* Main Sun center */}
              <circle cx="50" cy="55" r="10" className="stroke-[#b8922b]/50" />
              {/* Sun rays */}
              <path d="M50 38 L50 43 M50 67 L50 72 M33 55 L38 55 M62 55 L67 55 M38 43 L42 47 M62 67 L58 63 M38 67 L42 63 M62 43 L58 47" className="stroke-[#b8922b]/40" />
              {/* Outer Orbit ring */}
              <ellipse cx="50" cy="55" rx="36" ry="16" transform="rotate(-20 50 55)" className="stroke-[#deb18a]/30 stroke-dasharray-[2.5,2.5]" />
              <ellipse cx="50" cy="55" rx="42" ry="24" transform="rotate(15 50 55)" className="stroke-[#deb18a]/20" />
              {/* Star Nodes along orbits */}
              <circle cx="83" cy="40" r="1.5" className="fill-[#b8922b]/70 stroke-none" />
              <circle cx="16" cy="68" r="2" className="fill-[#b8922b]/90 stroke-none animate-pulse" />
              {/* Shimmering 4-Point Stars */}
              <path d="M 75 75 Q 75 78 78 78 Q 75 78 75 81 Q 75 78 72 78 Q 75 78 75 75 Z" className="fill-[#b8922b]/80 stroke-none" />
              <path d="M 25 25 Q 25 28 28 28 Q 25 28 25 31 Q 25 28 22 28 Q 25 28 25 25 Z" className="fill-[#b8922b]/60 stroke-none" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4f3129]/5 font-serif text-7xl select-none">
              ☼
            </div>
          </motion.div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 items-center justify-center text-center lg:text-left max-w-4xl lg:max-w-6xl lg:w-full lg:px-8 mx-auto space-y-4 lg:space-y-0 lg:gap-12">
          
          {/* Left Column: Rotating Zodiac Wheel, Person, and Contact details below */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start justify-center lg:justify-start w-full">
            <div className="relative w-[min(410px,75vw)] h-[min(410px,75vw)] lg:w-[410px] lg:h-[410px] flex items-center justify-center select-none mb-2 lg:-ml-2 xl:-ml-6">
              
              {/* The Rotating Wheel (behind the person) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
                className="absolute inset-0 opacity-90"
                style={{
                  backgroundImage: "url('/wheel.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  zIndex: 10
                }}
              />

              {/* Top Center Lighting Highlight - illuminates the wheel signs as they pass the top center */}
              <div 
                className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-32 h-32 rounded-full pointer-events-none mix-blend-screen opacity-95 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(222, 177, 138, 0.15) 55%, transparent 75%)',
                  filter: 'blur(3px)',
                  zIndex: 15
                }}
              />
              
              {/* The Person (Hero_person.png) static in the center */}
              <div 
                className="absolute w-[82%] h-[82%] bottom-[7.5%] flex items-end justify-center overflow-hidden"
                style={{
                  maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 2%, black 8%)',
                  WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.1) 2%, black 8%)',
                  zIndex: 20
                }}
              >
                <img 
                  src="/Hero_person.png" 
                  alt="Astrologer Madhuri Gupta - Best Vedic Astrologer in Agra" 
                  fetchPriority="high"
                  className="w-full h-auto object-contain object-bottom pointer-events-none"
                />
              </div>

              {/* Ground shadow at the bottom of the portrait to soften the edge and add depth */}
              <div 
                className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[60%] h-[8%] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(79, 49, 41, 0.75) 0%, transparent 75%)',
                  filter: 'blur(5px)',
                  zIndex: 21
                }}
              />
            </div>

            {/* Mobile number and email below the image on large screens */}
            <div className="hidden lg:flex flex-col items-start justify-start space-y-2 text-[#4f3129]/90 font-sans text-xs sm:text-sm font-semibold tracking-wider lg:-ml-2 xl:-ml-6 select-text pt-3">
              <a href="tel:+918881573437" className="flex items-center space-x-2.5 hover:text-[#b8922b] transition-colors cursor-pointer">
                <Phone className="h-4 w-4 text-[#4f3129]/75" />
                <span>+91 88815 73437</span>
              </a>
              <a href="mailto:sarsajyotish@gmail.com" className="flex items-center space-x-2.5 hover:text-[#b8922b] transition-colors cursor-pointer">
                <Mail className="h-4 w-4 text-[#4f3129]/75" />
                <span>sarsajyotish@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Text and Button Details */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="lg:col-span-6 space-y-4 max-w-2xl px-4 flex flex-col items-center lg:items-start -mt-5 lg:-mt-0"
          >
            {/* Dark copper name with gold light reflection shimmer effect */}
            <TextShimmer
              as="h1"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] uppercase text-center lg:text-left"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              MADHURI GUPTA
            </TextShimmer>
            
            {/* Darker bronze tagline for high contrast and readability */}
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#5c3d31] uppercase text-center lg:text-left">
              Vedic Astrologer & Spiritual Guide
            </p>

            {/* Detailed cosmic description */}
            <p className="font-sans text-xs sm:text-sm text-[#4a312a]/90 leading-relaxed font-medium text-center lg:text-left max-w-lg pt-1">
              Discover clarity and cosmic alignment through precise Vedic wisdom. Offering personalized Kundli analysis, Vastu consultancy, and Numerology to guide your career, relationships, and spiritual growth.
            </p>
            
            <div className="pt-4 flex flex-row gap-4 items-center justify-center lg:justify-start flex-wrap">
              <Link
                to="/booking"
                className="animated-button"
              >
                <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Book A Consultation</span>
                <span className="circle"></span>
                <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </Link>
              
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-[#deb18a] text-[#4f3129] font-sans text-sm font-semibold uppercase tracking-wider hover:bg-[#deb18a]/20 hover:text-[#4f3129] transition-all duration-300 shadow-sm"
              >
                Read More
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Our Goal Section */}
      <section className="py-6 sm:py-16 lg:py-28 bg-cover bg-center border-b border-[#deb18a]/10 relative" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />

        {/* Celestial Divider 1 (directly on border line, zero height) */}
        <div className="absolute top-0 left-0 right-0 w-full z-20 flex items-center justify-center translate-y-[-50%]">
          <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex-grow h-[1.5px] bg-gradient-to-r from-transparent via-[#4f3129]/30 to-[#4f3129]/70 origin-right"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-4 text-[#b8922b] select-none text-lg font-bold"
            >
              ✦
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex-grow h-[1.5px] bg-gradient-to-l from-transparent via-[#4f3129]/30 to-[#4f3129]/70 origin-left"
            />
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 overflow-visible">
          
          {/* Left Column: Enlarged Image Container (taking up 55% width, overflow visible) */}
          <div className="w-full lg:w-[55%] flex justify-center items-center overflow-visible relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full flex items-center justify-center p-0 overflow-visible"
            >
              <img 
                src="/Goal.png" 
                alt="Our Goal - Vedic Astrological Guidance in Agra" 
                loading="lazy"
                className="w-[90%] sm:w-[80%] max-w-[450px] lg:w-[185%] lg:max-w-none h-auto object-contain p-0 m-0 my-0 lg:-my-24 lg:-ml-24 mx-auto lg:mx-0"
              />
            </motion.div>
          </div>

          {/* Right Column: Text & Bullet Points (taking up 40% width) */}
          <div className="w-full lg:w-[40%] flex flex-col justify-center space-y-6 z-10">
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-4"
            >
              <TextShimmer
                as="h2"
                duration={3.5}
                className="font-serif text-3xl font-bold tracking-widest uppercase text-center lg:text-left"
                style={{
                  '--base-color': '#4f3129',
                  '--base-gradient-color': '#deb18a'
                }}
              >
                OUR GOAL
              </TextShimmer>
              <div className="w-16 h-[1.5px] bg-[#4f3129]/40 mx-auto lg:mx-0" />
              
              <p className="font-sans text-sm sm:text-base text-[#4a312a]/95 leading-relaxed font-medium text-center lg:text-left">
                Bridging ancient celestial wisdom with modern life choices to bring you clarity, balance, and alignment.
              </p>
              
              {/* Goal Points */}
              <ul className="space-y-3 font-serif text-sm sm:text-base text-[#4a312a] font-bold tracking-wide flex flex-col items-center lg:items-start">
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#b8922b] font-bold text-[12px] select-none">◆</span>
                  <span>Unlocking Your True Potential</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#b8922b] font-bold text-[12px] select-none">◆</span>
                  <span>Helping You Navigate Life’s Transitions</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <span className="text-[#b8922b] font-bold text-[12px] select-none">◆</span>
                  <span>Connecting You to the Wisdom of the Universe</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="relative z-10 py-10 bg-cover bg-center" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />

        {/* Celestial Divider 2 (directly on border line, zero height) */}
        <div className="absolute top-0 left-0 right-0 w-full z-20 flex items-center justify-center translate-y-[-50%]">
          <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex-grow h-[1.5px] bg-gradient-to-r from-transparent via-[#4f3129]/30 to-[#4f3129]/70 origin-right"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-4 text-[#b8922b] select-none text-lg font-bold"
            >
              ✦
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex-grow h-[1.5px] bg-gradient-to-l from-transparent via-[#4f3129]/30 to-[#4f3129]/70 origin-left"
            />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center space-y-7"
        >
          
          {/* Top Centre Header */}
          <div className="text-center space-y-2">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              ABOUT ME
            </TextShimmer>
            <div className="w-16 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
          </div>

          {/* Grid: Image and Details */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Image Container */}
            <div className="flex justify-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-[#deb18a]/35 bg-gradient-to-br from-[#4a312a] to-[#2d1b16] shadow-2xl flex items-end justify-center p-2"
              >
                {/* Radial glow highlight behind the person */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(222,177,138,0.15)_0%,transparent_70%)]" />
                
                <img 
                  src="/Hero_person.png" 
                  alt="Astrologer Madhuri Gupta - Vedic Astrologer Agra" 
                  loading="lazy"
                  className="h-[95%] w-auto object-contain object-bottom pointer-events-none relative z-10" 
                />
              </motion.div>
            </div>

            {/* Right: Copy/Details */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="space-y-4 font-sans text-sm sm:text-base text-[#4a312a]/95 leading-relaxed font-medium">
                <p>
                  I am a dedicated, spiritual Vedic astrologer and counselor with over ten years of experience guiding souls along their cosmic paths.
                </p>
                <p>
                  My approach combines classical Parashari and Jaimini Vedic astrology principles with practical, real-world remedies. I decode the complex transits (Gocharas) and planetary cycles (Dashas) to help you make informed choices in career, relationship synastry, and spiritual growth.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-md mx-auto md:mx-0">
                <div className="bg-[#3a1906]/10 border border-[#3a1906]/15 py-1.5 px-3 rounded-xl text-center shadow-sm">
                  <div className="font-serif text-base sm:text-xl font-bold text-[#3a1906]">15+</div>
                  <div className="font-sans text-[8px] sm:text-[10px] text-[#3a1906]/85 font-bold uppercase tracking-wider leading-tight">Years Exp.</div>
                </div>
                <div className="bg-[#3a1906]/10 border border-[#3a1906]/15 py-1.5 px-3 rounded-xl text-center shadow-sm">
                  <div className="font-serif text-base sm:text-xl font-bold text-[#3a1906]">10K+</div>
                  <div className="font-sans text-[8px] sm:text-[10px] text-[#3a1906]/85 font-bold uppercase tracking-wider leading-tight">Clients Served</div>
                </div>
                <div className="bg-[#3a1906]/10 border border-[#3a1906]/15 py-1.5 px-3 rounded-xl text-center shadow-sm">
                  <div className="font-serif text-base sm:text-xl font-bold text-[#3a1906]">4.9/5</div>
                  <div className="font-sans text-[8px] sm:text-[10px] text-[#3a1906]/85 font-bold uppercase tracking-wider leading-tight">Rating</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Centre CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-4 text-center w-full"
          >
            <Link
              to="/about"
              className="animated-button"
            >
              <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span className="text">More About Me</span>
              <span className="circle"></span>
              <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </Link>
          </motion.div>

        </motion.div>
      </section>

      {/* Marquee Banner Section (Placed above Services) */}
      <section className="relative z-10 bg-[#3a1906] border-y border-[#deb18a]/20 py-4 overflow-hidden shadow-md">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[...zodiacSigns, ...zodiacSigns].map((sign, idx) => (
            <span key={idx} className="font-serif text-sm sm:text-base tracking-[0.2em] text-[#deb18a] uppercase select-none">
              {sign}
            </span>
          ))}
        </div>
      </section>

      {/* Working With Me Section */}
      <section className="relative z-10 py-10 bg-cover bg-center border-t border-[#deb18a]/10" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center space-y-7"
        >
          
          {/* Header */}
          <div className="text-center space-y-2">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.18em] uppercase leading-relaxed"
              style={{
                '--base-color': '#3a1906',
                '--base-gradient-color': '#deb18a'
              }}
            >
              WORKING WITH ME IS<br />
              RIGHT FOR THOSE<br />
              WHO WANT:
            </TextShimmer>
            <div className="w-16 h-[1.5px] bg-[#3a1906]/40 mx-auto mt-4" />
          </div>

          {/* 2-Column Grid of 8 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 sm:gap-y-8 w-full max-w-2xl mx-auto">
            
            {/* Item 01 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">01</span>
              <Trophy className="h-5 w-5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Achieve their goals</span>
            </motion.div>

            {/* Item 02 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">02</span>
              <User className="h-5 w-5 text-indigo-600 fill-indigo-600 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Understand themselves</span>
            </motion.div>

            {/* Item 03 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">03</span>
              <Scale className="h-5 w-5 text-emerald-600 fill-emerald-600 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Make wise choices</span>
            </motion.div>

            {/* Item 04 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">04</span>
              <Sun className="h-5 w-5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Create positive changes</span>
            </motion.div>

            {/* Item 05 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">05</span>
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Reconnect and center</span>
            </motion.div>

            {/* Item 06 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">06</span>
              <Sparkles className="h-5 w-5 text-[#b8922b] fill-[#b8922b] shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Find clarity and focus</span>
            </motion.div>

            {/* Item 07 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">07</span>
              <Key className="h-5 w-5 text-teal-600 fill-teal-600 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Unlock their potential</span>
            </motion.div>

            {/* Item 08 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#b8922b] tracking-wider select-none shrink-0 w-10 text-right">08</span>
              <Award className="h-5 w-5 text-blue-600 fill-blue-600 shrink-0" />
              <span className="font-serif text-sm sm:text-base font-semibold text-[#3a1906] tracking-wide">Live authentically</span>
            </motion.div>

          </div>

        </motion.div>
      </section>

      {/* My Services Section */}
      <section id="services" className="relative z-10 py-10 bg-cover bg-center border-t border-[#deb18a]/10" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />

        {/* Celestial Divider 3 (directly on border line, zero height) */}
        <div className="absolute top-0 left-0 right-0 w-full z-20 flex items-center justify-center translate-y-[-50%]">
          <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex-grow h-[1.5px] bg-gradient-to-r from-transparent via-[#4f3129]/30 to-[#4f3129]/70 origin-right"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-4 text-[#b8922b] select-none text-lg font-bold"
            >
              ✦
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="flex-grow h-[1.5px] bg-gradient-to-l from-transparent via-[#4f3129]/30 to-[#4f3129]/70 origin-left"
            />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center space-y-7"
        >
          {/* Header */}
          <div className="text-center space-y-2 max-w-2xl">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl font-bold tracking-widest uppercase"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              MY SERVICES
            </TextShimmer>
            <div className="w-16 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
            <p className="font-sans text-xs sm:text-sm text-[#8c6c51] uppercase tracking-[0.15em] font-semibold">
              Tap to see descriptions
            </p>
          </div>

          {/* Service List (Accordion style matching color.png) */}
          <div className="w-full space-y-4">
            {serviceList.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.25, ease: "easeOut" }}
                className="w-full"
              >
                <ServiceAccordion 
                  service={service} 
                  isOpen={activeServiceId === service.id}
                  onToggle={() => setActiveServiceId(activeServiceId === service.id ? null : service.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  )
}

export default Home
