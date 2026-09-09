import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Compass, Heart, Shield, Clock, Globe, Sun, Sprout, Flower2, Briefcase, Target, User, Award, Key, TrendingUp, Trophy, Scale, Scroll, Moon, Info, Phone, Mail } from 'lucide-react'
import { TextShimmer } from '../components/motion-primitives/text-shimmer'

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
      className="flex flex-col items-center relative w-full max-w-[260px] mx-auto pb-12"
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
    <div className="w-full max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mx-auto flex flex-col items-center">
      {/* Accordion Header */}
      <button 
        onClick={onToggle}
        className="w-full px-6 py-4 2xl:px-7 2xl:py-2.5 3xl:px-8 3xl:py-3 flex items-center justify-between bg-gradient-to-r from-[#deb18a] via-[#f3dbaf] to-[#deb18a] border border-[#3a1906]/35 rounded-sm hover:scale-[1.01] transition-transform duration-200 cursor-pointer shadow-md text-left"
      >
        <div className="flex items-center space-x-3 2xl:space-x-4">
          {service.icon}
          <span className="font-serif text-sm sm:text-base 2xl:text-[15px] 3xl:text-[17.5px] 4xl:text-[20px] font-bold text-[#3a1906] tracking-wider uppercase">
            {service.title}
          </span>
          {/* Info Icon & Smooth Hover Tooltip Box */}
          <div className="relative group/info inline-block" onClick={(e) => e.stopPropagation()}>
            <Info className="h-4 w-4 2xl:h-5 2xl:w-5 text-[#3a1906]/60 hover:text-[#3a1906] transition-colors cursor-help shrink-0" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-60 sm:w-64 2xl:w-72 p-3.5 2xl:p-4 bg-[#4f3129] border border-[#deb18a]/30 text-[#faf6e8] rounded-xl shadow-xl opacity-0 pointer-events-none group-hover/info:opacity-100 group-hover/info:pointer-events-auto transition-all duration-300 transform translate-y-1 group-hover/info:translate-y-0 z-50 normal-case tracking-normal">
              <div className="font-serif font-bold text-[9px] 2xl:text-[11px] text-[#deb18a] uppercase tracking-wider mb-1.5 border-b border-[#deb18a]/20 pb-1">
                Overview
              </div>
              <p className="font-sans text-[11px] 2xl:text-xs leading-relaxed text-[#f5ebd6]/90 font-medium">
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
          <svg className="h-5 w-5 2xl:h-6 2xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
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
        <div className="p-5 2xl:p-7 3xl:p-8 bg-gradient-to-b from-[#faf6e8] to-[#f4edd9] border-x border-b border-[#3a1906]/20 rounded-b-sm space-y-4 2xl:space-y-6 text-[#3b2a1f] shadow-inner">
          {service.id === 'vedic-astrology' ? (
            <div className="space-y-6 2xl:space-y-8">
              {/* Section 1: Kundli Matching */}
              <div className="space-y-2.5 2xl:space-y-3.5">
                <h4 className="font-serif font-bold text-sm sm:text-base 2xl:text-xl 3xl:text-2xl text-[#3a1906] tracking-wide uppercase">
                  Kundli Matching
                </h4>
                <ul className="space-y-1.5 2xl:space-y-2.5 font-sans text-xs sm:text-sm 2xl:text-lg 3xl:text-xl text-[#4a312a]/95 font-medium list-none">
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
                <div className="flex items-center justify-between text-xs sm:text-sm 2xl:text-lg 3xl:text-xl font-sans font-bold text-[#3a1906] pt-1">
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
              <div className="h-[1.5px] bg-[#3a1906]/20 w-full my-4 2xl:my-6" />

              {/* Section 2: Kundli Prediction */}
              <div className="space-y-2.5 2xl:space-y-3.5">
                <h4 className="font-serif font-bold text-sm sm:text-base 2xl:text-xl 3xl:text-2xl text-[#3a1906] tracking-wide uppercase">
                  Kundli Prediction
                </h4>
                <ul className="space-y-1.5 2xl:space-y-2.5 font-sans text-xs sm:text-sm 2xl:text-lg 3xl:text-xl text-[#4a312a]/95 font-medium list-none">
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
                <div className="flex items-center justify-between text-xs sm:text-sm 2xl:text-lg 3xl:text-xl font-sans font-bold text-[#3a1906] pt-1">
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
              <p className="font-sans text-xs sm:text-sm 2xl:text-lg 3xl:text-xl font-medium tracking-wide italic text-[#4a312a]/95">
                {service.tagline}
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm 2xl:text-lg 3xl:text-xl font-sans font-bold text-[#3a1906]">
                <span>Price: {service.price}</span>
                <span>Duration: {service.duration}</span>
              </div>
              <div className="h-[1px] bg-[#3a1906]/10 w-full" />
              <ul className="space-y-2 2xl:space-y-3">
                {service.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start space-x-2 text-xs sm:text-sm 2xl:text-lg 3xl:text-xl text-[#4a312a]/90">
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
      <section className="relative px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-0 min-h-[calc(100svh-3.5rem)] lg:min-h-screen lg:h-screen flex flex-col justify-center items-center overflow-hidden z-10 2xl:py-20 3xl:py-24 4xl:py-32">
        {/* Background Image (rose-gold marble without zodiac wheel) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-95 pointer-events-none" 
          style={{ backgroundImage: "url('/marble-bg.webp')" }}
        />
        {/* Top gradient shadow for navbar links contrast */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cosmic-950/40 to-transparent z-0 pointer-events-none" />

        {/* Left Side Decorative Astronomy Graphic (Crescent Moon & Constellation) */}
        <div className="absolute left-4 xl:left-8 2xl:left-12 3xl:left-16 4xl:left-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center z-20 select-none pointer-events-none">
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
            <svg width="180" height="220" viewBox="0 0 100 120" className="stroke-[#3a1906]/40 stroke-[0.75] fill-none 2xl:w-[260px] 2xl:h-[320px] 3xl:w-[360px] 3xl:h-[440px] 4xl:w-[480px] 4xl:h-[580px]">
              {/* Crescent Moon */}
              <path d="M45 25 A 25 25 0 1 0 75 75 A 21 21 0 1 1 45 25 Z" className="stroke-[#3a1906]/50" />
              {/* Constellation link lines */}
              <line x1="20" y1="40" x2="35" y2="55" strokeDasharray="1.5,1.5" />
              <line x1="35" y1="55" x2="15" y2="75" strokeDasharray="1.5,1.5" />
              <line x1="15" y1="75" x2="30" y2="95" strokeDasharray="1.5,1.5" />
              <line x1="30" y1="95" x2="55" y2="105" strokeDasharray="1.5,1.5" />
              {/* Star Nodes */}
              <circle cx="20" cy="40" r="1.5" className="fill-[#3a1906]/70 stroke-none" />
              <circle cx="35" cy="55" r="2" className="fill-[#3a1906]/90 stroke-none animate-pulse" />
              <circle cx="15" cy="75" r="1.5" className="fill-[#3a1906]/70 stroke-none" />
              <circle cx="30" cy="95" r="2" className="fill-[#3a1906]/90 stroke-none animate-pulse" />
              <circle cx="55" cy="105" r="1.5" className="fill-[#3a1906]/70 stroke-none" />
              {/* Shimmering 4-Point Stars */}
              <path d="M 68 35 Q 68 39 72 39 Q 68 39 68 43 Q 68 39 64 39 Q 68 39 68 35 Z" className="fill-[#3a1906]/80 stroke-none" />
              <path d="M 28 20 Q 28 23 31 23 Q 28 23 28 26 Q 28 23 25 23 Q 28 23 28 20 Z" className="fill-[#3a1906]/60 stroke-none" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4f3129]/5 font-serif text-7xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[12rem] select-none">
              ☾
            </div>
          </motion.div>
        </div>

        {/* Right Side Decorative Astronomy Graphic (Sun & Astronomical Rings) */}
        <div className="absolute right-4 xl:right-8 2xl:right-12 3xl:right-16 4xl:right-24 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center z-20 select-none pointer-events-none">
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
            <svg width="180" height="220" viewBox="0 0 100 120" className="stroke-[#3a1906]/40 stroke-[0.75] fill-none 2xl:w-[260px] 2xl:h-[320px] 3xl:w-[360px] 3xl:h-[440px] 4xl:w-[480px] 4xl:h-[580px]">
              {/* Main Sun center */}
              <circle cx="50" cy="55" r="10" className="stroke-[#3a1906]/50" />
              {/* Sun rays */}
              <path d="M50 38 L50 43 M50 67 L50 72 M33 55 L38 55 M62 55 L67 55 M38 43 L42 47 M62 67 L58 63 M38 67 L42 63 M62 43 L58 47" className="stroke-[#3a1906]/40" />
              {/* Outer Orbit ring */}
              <ellipse cx="50" cy="55" rx="36" ry="16" transform="rotate(-20 50 55)" className="stroke-[#3a1906]/30 stroke-dasharray-[2.5,2.5]" />
              <ellipse cx="50" cy="55" rx="42" ry="24" transform="rotate(15 50 55)" className="stroke-[#3a1906]/20" />
              {/* Star Nodes along orbits */}
              <circle cx="83" cy="40" r="1.5" className="fill-[#3a1906]/70 stroke-none" />
              <circle cx="16" cy="68" r="2" className="fill-[#3a1906]/90 stroke-none animate-pulse" />
              {/* Shimmering 4-Point Stars */}
              <path d="M 75 75 Q 75 78 78 78 Q 75 78 75 81 Q 75 78 72 78 Q 75 78 75 75 Z" className="fill-[#3a1906]/80 stroke-none" />
              <path d="M 25 25 Q 25 28 28 28 Q 25 28 25 31 Q 25 28 22 28 Q 25 28 25 25 Z" className="fill-[#3a1906]/60 stroke-none" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4f3129]/5 font-serif text-7xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[12rem] select-none">
              ☼
            </div>
          </motion.div>
        </div>

        {/* Hero Content Container with expanded progressive gap for 2K (30vw), 3K (34vw), and 4K (36vw) */}
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center text-center lg:text-left w-full max-w-4xl lg:max-w-7xl 2xl:max-w-[98vw] 3xl:max-w-[98vw] 4xl:max-w-[99vw] 5xl:max-w-[99vw] px-2 sm:px-6 lg:px-8 2xl:px-8 3xl:px-12 4xl:px-16 5xl:px-20 mx-auto lg:gap-12 2xl:gap-[28vw] 3xl:gap-[30vw] 4xl:gap-[34vw] 5xl:gap-[36vw]">
          
          {/* Left Column: Rotating Zodiac Wheel, Person, and Contact details below */}
          <div className="flex flex-col items-center justify-center shrink-0">
            
            {/* Top Text above the Image in Clear Brown Color with Minimized Bottom Gap */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-0 sm:mb-0.5 2xl:mb-1.5 3xl:mb-2 text-center"
            >
              <span className="font-serif font-bold tracking-[0.22em] sm:tracking-[0.25em] 2xl:tracking-[0.32em] text-[#3a1906] text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-sm 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl uppercase block drop-shadow-sm whitespace-nowrap">
                WISDOM • CLARITY • PROSPERITY
              </span>
              <div className="w-10 sm:w-12 2xl:w-36 3xl:w-56 4xl:w-72 5xl:w-96 h-[1px] 2xl:h-[2.5px] 3xl:h-[3px] 4xl:h-[3.5px] 5xl:h-[5px] bg-[#3a1906]/35 mx-auto mt-0.5 2xl:mt-1 3xl:mt-1.5" />
            </motion.div>

            {/* Responsive Rotating Wheel and Person: progressively scaled for 2K (680px-900px), 3K (1200px), 4K (1550px) */}
            <div className="relative w-[min(86vw,320px)] h-[min(86vw,320px)] xs:w-[min(86vw,350px)] xs:h-[min(86vw,350px)] sm:w-[420px] sm:h-[420px] lg:w-[min(38vw,52vh)] lg:h-[min(38vw,52vh)] 2xl:w-[680px] 2xl:h-[680px] 3xl:w-[900px] 3xl:h-[900px] 4xl:w-[1200px] 4xl:h-[1200px] 5xl:w-[1550px] 5xl:h-[1550px] flex items-center justify-center select-none my-0 shrink-0">
              
              {/* The Rotating Wheel (behind the person) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
                className="absolute inset-0 opacity-90"
                style={{
                  backgroundImage: "url('/wheel.webp')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  zIndex: 10
                }}
              />

              {/* Top Center Lighting Highlight - illuminates the wheel signs as they pass the top center */}
              <div 
                className="absolute top-[-10px] sm:top-[-15px] left-1/2 -translate-x-1/2 w-32 h-32 sm:w-40 sm:h-40 2xl:w-64 2xl:h-64 3xl:w-96 3xl:h-96 4xl:w-[500px] 4xl:h-[500px] 5xl:w-[680px] 5xl:h-[680px] rounded-full pointer-events-none mix-blend-screen opacity-95 animate-pulse"
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
                  src="/Hero_person.webp" 
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

            {/* Mobile number and email centered along the Y-axis with the rotating wheel and person image */}
            <div className="flex flex-col items-center justify-center space-y-0.5 sm:space-y-1 2xl:space-y-3 3xl:space-y-4 4xl:space-y-6 5xl:space-y-8 text-[#3a1906] font-sans text-[10.5px] xs:text-xs sm:text-xs lg:text-sm 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold tracking-wider select-text pt-1 sm:pt-1.5 2xl:pt-6 3xl:pt-8 4xl:pt-10 5xl:pt-12">
              <a href="tel:+918881573437" className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 2xl:space-x-4 hover:text-[#b8922b] transition-colors cursor-pointer">
                <Phone className="h-3 w-3 sm:h-3.5 sm:w-3.5 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 4xl:h-12 4xl:w-12 5xl:h-16 5xl:w-16 text-[#3a1906] shrink-0" />
                <span>+91 88815 73437</span>
              </a>
              <a href="mailto:sarsajyotish@gmail.com" className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 2xl:space-x-4 hover:text-[#b8922b] transition-colors cursor-pointer">
                <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 2xl:h-7 2xl:w-7 3xl:h-9 3xl:w-9 4xl:h-12 4xl:w-12 5xl:h-16 5xl:w-16 text-[#3a1906] shrink-0" />
                <span>sarsajyotish@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right Column: Text and Button Details with very small gap from email on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
            className="space-y-1.5 xs:space-y-2 sm:space-y-3 lg:space-y-3 2xl:space-y-7 3xl:space-y-9 4xl:space-y-12 5xl:space-y-14 max-w-xs xs:max-w-sm sm:max-w-xl lg:max-w-2xl 2xl:max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl 5xl:max-w-7xl px-2 sm:px-4 flex flex-col items-center lg:items-start mt-1.5 sm:mt-2 lg:mt-0 shrink-0 lg:shrink"
          >
            {/* Single-line Name across all screens with gold light reflection shimmer effect */}
            <TextShimmer
              as="h1"
              duration={3.5}
              className="font-serif text-[1.35rem] xs:text-2xl sm:text-3xl lg:text-5xl 2xl:text-7xl 3xl:text-8xl 4xl:text-[6.8rem] 5xl:text-[9.5rem] font-bold tracking-[0.14em] sm:tracking-[0.2em] uppercase text-center lg:text-left whitespace-nowrap"
              style={{
                '--base-color': '#3a1906',
                '--base-gradient-color': '#deb18a'
              }}
            >
              MADHURI GUPTA
            </TextShimmer>
            
            {/* High contrast dark brown tagline with reduced gap to description below */}
            <p className="font-sans text-[10px] xs:text-xs sm:text-sm lg:text-base 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.25em] 2xl:tracking-[0.28em] 3xl:tracking-[0.32em] 4xl:tracking-[0.35em] text-[#3a1906] uppercase text-center lg:text-left">
              Vedic Astrologer & Spiritual Guide
            </p>

            {/* Structured Guidance Overview Section */}
            <div className="space-y-1 xs:space-y-1.5 sm:space-y-2 2xl:space-y-4 3xl:space-y-5 4xl:space-y-7 5xl:space-y-9 text-[#3a1906] text-center lg:text-left">
              <h2 className="font-serif text-[11px] xs:text-xs sm:text-sm lg:text-base 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl font-bold tracking-wider text-[#3a1906]">
                Ancient Wisdom. Practical Clarity.
              </h2>
              <p className="font-sans text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-sm 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl text-[#3a1906]/95 font-medium leading-tight sm:leading-relaxed">
                Grounded guidance to help you navigate life’s major decisions:
              </p>
              
              <ul className="space-y-1 sm:space-y-1.5 2xl:space-y-4 3xl:space-y-6 4xl:space-y-8 5xl:space-y-10 font-sans text-[9.5px] xs:text-[10.5px] sm:text-xs lg:text-sm 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl text-[#3a1906]/95 font-normal list-none text-left">
                <li className="flex items-start space-x-1.5 sm:space-x-2 2xl:space-x-3.5 3xl:space-x-4 4xl:space-x-6">
                  <span className="text-[#b8922b] font-bold text-xs sm:text-sm 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl mt-[-1px]">•</span>
                  <span><strong className="font-bold text-[#3a1906]">Kundli Analysis:</strong> Uncover your life path and career trajectory.</span>
                </li>
                <li className="flex items-start space-x-1.5 sm:space-x-2 2xl:space-x-3.5 3xl:space-x-4 4xl:space-x-6">
                  <span className="text-[#b8922b] font-bold text-xs sm:text-sm 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl mt-[-1px]">•</span>
                  <span><strong className="font-bold text-[#3a1906]">Vastu Consultancy:</strong> Harmonize the energy of your living and work spaces.</span>
                </li>
                <li className="flex items-start space-x-1.5 sm:space-x-2 2xl:space-x-3.5 3xl:space-x-4 4xl:space-x-6">
                  <span className="text-[#b8922b] font-bold text-xs sm:text-sm 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl mt-[-1px]">•</span>
                  <span><strong className="font-bold text-[#3a1906]">Numerology:</strong> Gain clarity on timing, personal strengths, and relationships.</span>
                </li>
              </ul>
            </div>
            
            <div className="pt-1 xs:pt-1.5 sm:pt-2 lg:pt-3 2xl:pt-6 3xl:pt-8 4xl:pt-10 5xl:pt-12 flex flex-row gap-2.5 sm:gap-3 lg:gap-4 2xl:gap-5 3xl:gap-6 4xl:gap-8 items-center justify-center lg:justify-start flex-nowrap shrink-0">
              <Link
                to="/booking"
                className="animated-button origin-left shrink-0 whitespace-nowrap"
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
                className="hero-secondary-button origin-left shrink-0 whitespace-nowrap"
              >
                Read More
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Our Goal Section - Scaled to 50vh on 2K/3K/4K so Our Goal + About Me = 1 Screen Height */}
      <section className="py-14 sm:py-20 lg:py-24 2xl:pt-14 2xl:pb-8 3xl:pt-16 3xl:pb-10 4xl:pt-20 4xl:pb-12 2xl:min-h-[50svh] 3xl:min-h-[50svh] 4xl:min-h-[50svh] 2xl:h-[50svh] 3xl:h-[50svh] 4xl:h-[50svh] flex flex-col justify-start bg-cover bg-center border-b border-[#deb18a]/10 relative overflow-hidden" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
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

        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="w-full max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1750px] 4xl:max-w-[2100px] mx-auto px-6 lg:px-16 2xl:px-12 3xl:px-16 relative z-10 flex flex-col items-center space-y-6 2xl:space-y-4 3xl:space-y-5"
        >
          {/* Top Centre Header */}
          <div className="text-center space-y-2 2xl:space-y-1">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold tracking-widest uppercase text-center"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              OUR GOAL
            </TextShimmer>
            <div className="w-16 2xl:w-16 3xl:w-20 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
          </div>

          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 2xl:gap-14 3xl:gap-20 overflow-visible">
            {/* Left Column: Image Container */}
            <div className="w-full lg:w-[55%] flex justify-center items-center overflow-visible relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full flex items-center justify-center p-0 overflow-visible"
              >
                <img 
                  src="/Goal.webp" 
                  alt="Our Goal - Vedic Astrological Guidance in Agra" 
                  loading="lazy"
                  className="w-[90%] sm:w-[80%] max-w-[450px] lg:w-[160%] lg:max-w-none 2xl:w-[100%] 3xl:w-[110%] 4xl:w-[120%] 2xl:max-h-[30svh] 3xl:max-h-[32svh] 4xl:max-h-[34svh] h-auto object-contain p-0 m-0 my-0 lg:-my-16 lg:-ml-16 2xl:my-0 2xl:ml-0 mx-auto lg:mx-0"
                />
              </motion.div>
            </div>

            {/* Right Column: Bullet Points - laptop size standard text-sm sm:text-base */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center space-y-4 2xl:space-y-2 3xl:space-y-2.5 z-10">
              <ul className="space-y-3.5 sm:space-y-4 2xl:space-y-1.5 3xl:space-y-2 4xl:space-y-2.5 font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl text-[#4a312a] font-bold tracking-wide flex flex-col items-start text-left">
                <li className="flex items-center space-x-3 sm:space-x-3.5 2xl:space-x-4">
                  <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">❤️</span>
                  <span>Relationships</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5 2xl:space-x-4">
                  <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">💼</span>
                  <span>Career</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5 2xl:space-x-4">
                  <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🏡</span>
                  <span>Home Energy</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5 2xl:space-x-4">
                  <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">💰</span>
                  <span>Prosperity</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5 2xl:space-x-4">
                  <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🌟</span>
                  <span>Life Decisions</span>
                </li>
                <li className="flex items-center space-x-3 sm:space-x-3.5 2xl:space-x-4">
                  <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🕉️</span>
                  <span>Spiritual Growth</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Me Section - Scaled to 50vh on 2K/3K/4K so Our Goal + About Me = 1 Screen Height */}
      <section id="about" className="relative z-10 py-14 sm:py-20 lg:py-24 2xl:pt-14 2xl:pb-8 3xl:pt-16 3xl:pb-10 4xl:pt-20 4xl:pb-12 2xl:min-h-[50svh] 3xl:min-h-[50svh] 4xl:min-h-[50svh] 2xl:h-[50svh] 3xl:h-[50svh] 4xl:h-[50svh] flex flex-col justify-start bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
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
          className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-6 2xl:px-12 3xl:px-16 relative z-10 flex flex-col items-center space-y-7 2xl:space-y-4 3xl:space-y-5"
        >
          
          {/* Top Centre Header */}
          <div className="text-center space-y-2 2xl:space-y-1">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold tracking-widest uppercase"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              ABOUT ME
            </TextShimmer>
            <div className="w-16 2xl:w-16 3xl:w-20 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
          </div>

          {/* Grid: Image and Details */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 2xl:gap-8 3xl:gap-12 items-center">
            {/* Left: Image Container */}
            <div className="flex justify-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 2xl:w-48 2xl:h-48 3xl:w-56 3xl:h-56 4xl:w-64 4xl:h-64 rounded-2xl 3xl:rounded-3xl overflow-hidden border border-[#deb18a]/35 bg-gradient-to-br from-[#4a312a] to-[#2d1b16] shadow-2xl flex items-end justify-center p-2"
              >
                {/* Radial glow highlight behind the person */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(222,177,138,0.15)_0%,transparent_70%)]" />
                
                <img 
                  src="/Hero_person.webp" 
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
              className="space-y-6 2xl:space-y-2.5 3xl:space-y-3 text-center md:text-left"
            >
              <div className="space-y-4 2xl:space-y-1.5 3xl:space-y-2 font-sans text-sm sm:text-base 2xl:text-base 3xl:text-lg 4xl:text-xl text-[#4a312a]/95 leading-relaxed font-medium">
                <p>
                  I am a Vedic astrologer and counselor with over 10 years of experience helping people find clarity and direction in life.
                </p>
                <p>
                  Using Vedic astrology, I help you understand important areas of your life such as career, relationships, marriage, finances, and personal growth. My guidance combines traditional astrological knowledge with practical solutions that can be applied in everyday life.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 2xl:gap-2.5 3xl:gap-3.5 pt-2 2xl:pt-0.5 max-w-md 2xl:max-w-lg 3xl:max-w-xl mx-auto md:mx-0">
                <div className="bg-[#3a1906]/10 border border-[#3a1906]/15 py-1.5 px-3 2xl:py-2 2xl:px-2.5 3xl:py-2.5 3xl:px-3 rounded-xl 3xl:rounded-2xl text-center shadow-sm">
                  <div className="font-serif text-base sm:text-xl 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-bold text-[#3a1906]">10+</div>
                  <div className="font-sans text-[8px] sm:text-[10px] 2xl:text-lg 3xl:text-xl 4xl:text-2xl text-[#3a1906]/85 font-bold uppercase tracking-wider leading-tight">Years Exp.</div>
                </div>
                <div className="bg-[#3a1906]/10 border border-[#3a1906]/15 py-1.5 px-3 2xl:py-2 2xl:px-2.5 3xl:py-2.5 3xl:px-3 rounded-xl 3xl:rounded-2xl text-center shadow-sm">
                  <div className="font-serif text-base sm:text-xl 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-bold text-[#3a1906]">10K+</div>
                  <div className="font-sans text-[8px] sm:text-[10px] 2xl:text-lg 3xl:text-xl 4xl:text-2xl text-[#3a1906]/85 font-bold uppercase tracking-wider leading-tight">Clients Served</div>
                </div>
                <div className="bg-[#3a1906]/10 border border-[#3a1906]/15 py-1.5 px-3 2xl:py-2 2xl:px-2.5 3xl:py-2.5 3xl:px-3 rounded-xl 3xl:rounded-2xl text-center shadow-sm">
                  <div className="font-serif text-base sm:text-xl 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-bold text-[#3a1906]">4.9/5</div>
                  <div className="font-sans text-[8px] sm:text-[10px] 2xl:text-lg 3xl:text-xl 4xl:text-2xl text-[#3a1906]/85 font-bold uppercase tracking-wider leading-tight">Rating</div>
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
            className="pt-4 2xl:pt-1 3xl:pt-2 text-center w-full"
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
      <section className="relative z-10 bg-[#3a1906] border-y border-[#deb18a]/20 py-2.5 sm:py-3.5 2xl:py-2.5 3xl:py-3 overflow-hidden shadow-md">
        <div className="flex whitespace-nowrap gap-12 2xl:gap-14 3xl:gap-18 animate-marquee">
          {[...zodiacSigns, ...zodiacSigns].map((sign, idx) => (
            <span key={idx} className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl tracking-[0.2em] text-[#deb18a] uppercase select-none">
              {sign}
            </span>
          ))}
        </div>
      </section>

      {/* Working With Me Section - Min-height balanced for 2K/3K/4K viewports with 20% width screen gap */}
      <section className="relative z-10 py-8 sm:py-12 lg:py-16 2xl:pt-14 2xl:pb-8 3xl:pt-16 3xl:pb-10 4xl:pt-20 4xl:pb-12 2xl:min-h-[46svh] 3xl:min-h-[46svh] 4xl:min-h-[46svh] flex flex-col justify-start bg-cover bg-center border-t border-[#deb18a]/10" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="max-w-4xl 2xl:max-w-[90vw] 3xl:max-w-[90vw] 4xl:max-w-[90vw] mx-auto px-6 2xl:px-10 3xl:px-16 relative z-10 flex flex-col items-center space-y-7 2xl:space-y-5 3xl:space-y-6"
        >
          
          {/* Header */}
          <div className="text-center space-y-2 2xl:space-y-1">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-2xl sm:text-3xl 2xl:text-xl 3xl:text-2xl 4xl:text-3xl font-bold tracking-[0.18em] uppercase leading-snug 2xl:leading-snug 3xl:leading-snug"
              style={{
                '--base-color': '#3a1906',
                '--base-gradient-color': '#deb18a'
              }}
            >
              WORKING WITH ME IS<br />
              RIGHT FOR THOSE<br />
              WHO WANT:
            </TextShimmer>
            <div className="w-16 2xl:w-16 3xl:w-20 h-[1.5px] bg-[#3a1906]/40 mx-auto mt-2 2xl:mt-2.5" />
          </div>

          {/* Responsive Grid of 8 items: 2 columns with ~20vw gap between columns on 2K/3K/4K */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 2xl:gap-x-[20vw] 3xl:gap-x-[20vw] 4xl:gap-x-[20vw] gap-y-6 sm:gap-y-8 2xl:gap-y-3.5 3xl:gap-y-4 w-full max-w-2xl 2xl:max-w-[85vw] 3xl:max-w-[85vw] 4xl:max-w-[85vw] mx-auto">
            
            {/* Item 01 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">01</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🎯</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Achieve Their Life Goals</span>
            </motion.div>

            {/* Item 02 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">02</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🧘</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Gain Deeper Self-Awareness</span>
            </motion.div>

            {/* Item 03 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">03</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">💡</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Make Confident Decisions</span>
            </motion.div>

            {/* Item 04 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">04</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">✨</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Create Positive Life Changes</span>
            </motion.div>

            {/* Item 05 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ motion: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">05</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">⚖️</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Find Balance and Inner Peace</span>
            </motion.div>

            {/* Item 06 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">06</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🔍</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Gain Clarity and Direction</span>
            </motion.div>

            {/* Item 07 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">07</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🚀</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Unlock Their Full Potential</span>
            </motion.div>

            {/* Item 08 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">08</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">🌿</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide">Live with Purpose and Authenticity</span>
            </motion.div>

          </div>

        </motion.div>
      </section>

      {/* My Services Section - Min-height responsive for 2K/3K/4K viewports (height not fixed, expands naturally) */}
      <section id="services" className="relative z-10 py-12 sm:py-16 lg:py-20 2xl:pt-14 2xl:pb-8 3xl:pt-16 3xl:pb-10 4xl:pt-20 4xl:pb-12 2xl:min-h-[50svh] 3xl:min-h-[50svh] 4xl:min-h-[50svh] flex flex-col justify-start bg-cover bg-center border-t border-[#deb18a]/10" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
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
          className="max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto px-6 2xl:px-10 3xl:px-16 relative z-10 flex flex-col items-center space-y-7 2xl:space-y-6 3xl:space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2 2xl:space-y-1 max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl flex flex-col items-center">
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold tracking-widest uppercase"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              MY SERVICES
            </TextShimmer>
            <div className="w-16 2xl:w-16 3xl:w-20 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
            <p className="font-sans text-xs sm:text-sm 2xl:text-sm 3xl:text-base 4xl:text-lg text-[#8c6c51] uppercase tracking-[0.15em] font-semibold mt-2">
              Tap to see descriptions
            </p>
          </div>

          {/* Service List (Accordion style matching color.png) */}
          <div className="w-full space-y-4 2xl:space-y-3 3xl:space-y-3.5">
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
