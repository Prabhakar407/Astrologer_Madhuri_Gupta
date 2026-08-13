import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Compass, Heart, Shield, Clock, Globe, Sun, Sprout, Flower2 } from 'lucide-react'
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

function ServiceAccordion({ service }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Accordion Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#deb18a] via-[#f3dbaf] to-[#deb18a] border border-[#3a1906]/35 rounded-sm hover:scale-[1.01] transition-transform duration-200 cursor-pointer shadow-md text-left"
      >
        <span className="font-serif text-sm sm:text-base font-bold text-[#3a1906] tracking-wider uppercase">
          {service.title}
        </span>
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
              className="inline-block px-6 py-2 bg-[#3a1906] hover:bg-[#4f210b] text-[#deb18a] font-serif text-[10px] font-bold tracking-widest uppercase rounded-sm border border-[#deb18a]/30 transition-all duration-200"
            >
              Book Reading Session
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Home() {
  const zodiacSigns = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 
    'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 
    'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ]

  const serviceList = [
    {
      id: 'birth-chart',
      title: 'Detailed Birth Chart Reading',
      tagline: 'Full Vedic Kundali & Dasha analysis',
      duration: '60 Mins Session',
      price: '₹2,500 / $45',
      features: [
        'Detailed analysis of all 12 houses',
        '10-year Mahadasha & Antardasha timeline',
        'Specific gemstone & mantra remedies',
        'PDF Copy of your birth chart'
      ]
    },
    {
      id: 'compatibility',
      title: 'Relationship Compatibility',
      tagline: 'Synastry and Kundali Milan',
      duration: '45 Mins Session',
      price: '₹3,000 / $55',
      features: [
        'Ashta Koota matchmaking (36 Gunas)',
        'Manglik Dosha analysis and remedies',
        'Emotional & intellectual compatibility scale',
        'Future relationship transit predictions'
      ]
    },
    {
      id: 'career-wealth',
      title: 'Career & Wealth Guidance',
      tagline: '10th House alignment & prosperity',
      duration: '45 Mins Session',
      price: '₹2,100 / $39',
      features: [
        'Job vs. business suitability analysis',
        'Auspicious times for financial investments',
        'Remedies for career blocks (Shani/Rahu)',
        'Timing of promotions or job switches'
      ]
    },
    {
      id: 'yearly-transit',
      title: 'Yearly Solar Return (Varshphal)',
      tagline: 'Month-by-month transit guide',
      duration: '45 Mins Session',
      price: '₹2,500 / $45',
      features: [
        'Month-by-month layout of key events',
        'Sade Sati & Jupiter transit analysis',
        'Health & wellness checkpoints',
        'Personalized calendar for the year'
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
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-16 min-h-screen flex flex-col items-center justify-start overflow-hidden z-10">
        {/* Background Image (rose-gold marble without zodiac wheel) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-95 pointer-events-none" 
          style={{ backgroundImage: "url('/marble-bg.jpg')" }}
        />
        {/* Top gradient shadow for navbar links contrast */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-cosmic-950/40 to-transparent z-0 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-4">
          
          {/* Rotating Zodiac Wheel and Person Container */}
          <div className="relative w-[min(410px,75vw)] h-[min(410px,75vw)] flex items-center justify-center select-none mb-2">
            
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
                alt="Astrologer Madhuri Gupta" 
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

          {/* Text and Button Details */}
          <div className="space-y-3.5 max-w-2xl px-4 flex flex-col items-center -mt-5">
            {/* Dark copper name with gold light reflection shimmer effect */}
            <TextShimmer
              as="h1"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] uppercase"
              style={{
                '--base-color': '#4f3129',
                '--base-gradient-color': '#deb18a'
              }}
            >
              MADHURI GUPTA
            </TextShimmer>
            
            {/* Darker bronze tagline for high contrast and readability */}
            <p className="font-sans text-xs sm:text-sm font-semibold tracking-[0.3em] text-[#5c3d31] uppercase">
              Vedic Astrologer & Spiritual Guide
            </p>
            
            <div className="pt-4">
              {/* Gold gradient button with dark text and border matching Hero2.png */}
              <Link
                to="/booking"
                className="inline-block px-8 py-3.5 font-serif text-sm font-bold tracking-widest text-[#321300] bg-gradient-to-r from-[#deb18a] via-[#f3dbaf] to-[#deb18a] rounded-md hover:from-[#f4e6c1] hover:to-[#deb18a] shadow-[0_4px_15px_rgba(79,49,41,0.15)] hover:shadow-[0_6px_20px_rgba(79,49,41,0.25)] transition-all duration-300 transform hover:-translate-y-0.5 border border-[#b8922b]/30"
              >
                BOOK A CONSULTATION
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Marquee Banner */}
      <section className="relative z-10 bg-cosmic-900/40 backdrop-blur-sm border-y border-gold-500/10 py-6 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[...zodiacSigns, ...zodiacSigns].map((sign, idx) => (
            <span key={idx} className="font-serif text-lg tracking-widest text-gold-300/60 uppercase select-none">
              {sign}
            </span>
          ))}
        </div>
      </section>


      {/* Our Goal Section */}
      <section 
        className="relative z-10 py-24 bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/marble-bg.jpg')" }}
      >
        {/* Soft dark overlay to make text pop against marble */}
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center space-y-16">
          
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4f3129] tracking-widest uppercase">
              OUR GOAL
            </h2>
            <div className="w-16 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
            <p className="font-sans text-sm sm:text-base text-[#5c3d31] max-w-2xl mx-auto leading-relaxed">
              Helping you navigate life's challenges, find inner peace, and unlock your true potential through cosmic wisdom.
            </p>
          </div>

          {/* Horizontal Timeline Container */}
          <div className="relative w-full py-8">
            {/* Horizontal Timeline Path Cord Wrapper */}
            <div className="absolute top-[7px] left-[5%] right-[5%] h-[2px] z-0 hidden md:block">
              {/* ScaleX Entry Animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full origin-left"
              >
                {/* Wind-blown vertical sway Animation */}
                <motion.div
                  animate={{ y: [0, 1.5, -0.8, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#deb18a] to-transparent"
                />
              </motion.div>
            </div>

            {/* Scroll Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 w-full">
              {phases.map((phase, idx) => (
                <ScrollCard key={idx} phase={phase} idx={idx} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="relative z-10 py-24 bg-cover bg-center" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
                alt="Madhuri Gupta" 
                className="h-[95%] w-auto object-contain object-bottom pointer-events-none relative z-10" 
              />
            </motion.div>
          </div>

          {/* Right: Copy & CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4f3129] tracking-widest uppercase">
              ABOUT ME
            </h2>
            <div className="w-16 h-[1.5px] bg-[#4f3129]/40 mx-auto md:mx-0" />
            
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#4a312a]/95 leading-relaxed font-light">
              <p>
                I am a dedicated, spiritual Vedic astrologer and counselor with over ten years of experience guiding souls along their cosmic paths.
              </p>
              <p>
                My approach combines classical Parashari and Jaimini Vedic astrology principles with practical, real-world remedies. I decode the complex transits (Gocharas) and planetary cycles (Dashas) to help you make informed choices in career, relationship synastry, and spiritual growth.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-block px-8 py-3.5 bg-[#3a1906] hover:bg-[#4f210b] text-[#deb18a] border border-[#deb18a] font-serif text-[11px] font-bold tracking-widest uppercase rounded-sm shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
              >
                MORE ABOUT ME
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* My Services Section */}
      <section id="services" className="relative z-10 py-24 bg-cover bg-center border-t border-[#deb18a]/10" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#f9f6f0]/20 z-0 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#4f3129] tracking-widest uppercase">
              MY SERVICES
            </h2>
            <div className="w-16 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
            <p className="font-sans text-xs sm:text-sm text-[#8c6c51] uppercase tracking-[0.15em] font-semibold">
              Tap to see descriptions
            </p>
          </div>

          {/* Service List (Accordion style matching color.png) */}
          <div className="w-full space-y-4">
            {serviceList.map((service) => (
              <ServiceAccordion key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="relative z-10 py-20 bg-gradient-to-b from-transparent to-cosmic-950/40 border-t border-gold-500/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sparkles className="h-60 w-60 text-gold-500" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex space-x-1 text-gold-400">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="font-playfair text-lg sm:text-xl italic text-slate-200 leading-relaxed">
                "Madhuri Gupta's reading changed the way I approached my startup launch. Her planetary transit guide helped me select the right time, and the results were beyond expectation."
              </p>
              <div>
                <h4 className="font-serif text-white font-semibold">Amit R.</h4>
                <p className="text-xs text-gold-400/80">Tech Entrepreneur, Bangalore</p>
              </div>
            </div>

            <div className="border-t md:border-t-0 md:border-l border-gold-500/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center items-center text-center shrink-0 w-full md:w-auto">
              <Shield className="h-10 w-10 text-gold-400 mb-2" />
              <h5 className="font-serif text-white font-medium">100% Confidential</h5>
              <p className="text-xs text-slate-400 max-w-[200px] mt-1">All birth data and consultations are strictly private.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
