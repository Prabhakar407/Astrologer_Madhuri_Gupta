import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Compass, Heart, Shield, Clock, Globe, Sun, Sprout, Flower2, Briefcase, Target, User, Award, Key, TrendingUp, Trophy, Scale, Scroll, Moon, Info, Phone, Mail } from 'lucide-react'
import { TextShimmer } from '../components/motion-primitives/text-shimmer'
import VideoHeroCurtain from '../components/VideoHeroCurtain.jsx'
import ServicesSection from '../components/ServicesSection.jsx'
import TestimonialsSection from '../components/TestimonialsSection.jsx'

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
      viewport={{ once: true, margin: "-20px" }}
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
                  <span className="font-sans text-[9px] font-bold tracking-[0.2em] text-white/80 uppercase block">
                    {phase.phase}
                  </span>
                  <h3 className="font-serif text-sm font-bold text-white tracking-wider uppercase leading-snug">
                    {phase.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-white/90 font-normal leading-relaxed max-w-[190px] text-center">
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

function Home() {
  React.useEffect(() => {
    document.title = "Best Vedic Astrologer in Agra | Sarsa Jyotish Sansthan";
  }, []);

  const zodiacSigns = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 
    'Leo ♌', 'Virgo ♍', 'Libra ♎', 'Scorpio ♏', 
    'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
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
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#F3E7D5]">
      
      {/* 1. New Video Hero Curtain Section (Autoplaying repeated Hero.mp4 with luxury bottom-up sheet curtain slide) */}
      <VideoHeroCurtain />

      {/* Our Goal Section - Scaled to 50vh on 2K/3K/4K so Our Goal + About Me = 1 Screen Height */}
      <section className="py-14 sm:py-20 lg:py-24 2xl:pt-14 2xl:pb-8 3xl:pt-16 3xl:pb-10 4xl:pt-20 4xl:pb-12 2xl:min-h-[50svh] 3xl:min-h-[50svh] 4xl:min-h-[50svh] 2xl:h-[50svh] 3xl:h-[50svh] 4xl:h-[50svh] flex flex-col justify-start bg-cover bg-center bg-[#F3E7D5] border-b border-[#deb18a]/20 relative overflow-hidden" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
        <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />

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
          viewport={{ once: true, margin: "-20px" }}
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
                viewport={{ once: true, margin: "-20px" }}
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
      <section id="about" className="relative z-10 py-14 sm:py-20 lg:py-24 2xl:pt-14 2xl:pb-14 3xl:pt-16 3xl:pb-16 4xl:pt-20 4xl:pb-20 2xl:min-h-[50svh] 3xl:min-h-[50svh] 4xl:min-h-[50svh] 2xl:h-[50svh] 3xl:h-[50svh] 4xl:h-[50svh] flex flex-col justify-start bg-cover bg-center bg-[#F3E7D5] overflow-hidden" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
        <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />

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
          viewport={{ once: true, margin: "-20px" }}
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
            className="pt-4 2xl:pt-3 3xl:pt-4 4xl:pt-5 2xl:pb-3 3xl:pb-4 text-center w-full"
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
      <section className="relative z-10 bg-[#3a1906] border-y border-white/20 py-2.5 sm:py-3.5 2xl:py-2.5 3xl:py-3 overflow-hidden shadow-md">
        <div className="flex whitespace-nowrap gap-12 2xl:gap-14 3xl:gap-18 animate-marquee">
          {[...zodiacSigns, ...zodiacSigns].map((sign, idx) => (
            <span key={idx} className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl tracking-[0.2em] text-white uppercase select-none font-medium">
              {sign}
            </span>
          ))}
        </div>
      </section>

      {/* Working With Me Section - Min-height balanced for 2K/3K/4K viewports with 20% width screen gap */}
      <section className="relative z-10 py-8 sm:py-12 lg:py-16 2xl:pt-14 2xl:pb-8 3xl:pt-16 3xl:pb-10 4xl:pt-20 4xl:pb-12 2xl:min-h-[46svh] 3xl:min-h-[46svh] 4xl:min-h-[46svh] flex flex-col justify-start bg-cover bg-center bg-[#F3E7D5] border-t border-[#deb18a]/20" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
        <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
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

          {/* Responsive Grid of 8 items: 2 columns with balanced middle gap on 2K/3K/4K */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 2xl:gap-x-16 3xl:gap-x-24 4xl:gap-x-32 gap-y-6 sm:gap-y-8 2xl:gap-y-3.5 3xl:gap-y-4 w-full max-w-2xl lg:max-w-4xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto">
            
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Achieve Their Life Goals</span>
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Gain Deeper Self-Awareness</span>
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Make Confident Decisions</span>
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Create Positive Life Changes</span>
            </motion.div>

            {/* Item 05 */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center space-x-3"
            >
              <span className="font-serif text-2xl sm:text-3xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold text-[#b8922b] tracking-wider shrink-0 w-10 2xl:w-12 3xl:w-14 text-right select-none">05</span>
              <span className="text-[1.35em] leading-none shrink-0 drop-shadow-sm select-none">⚖️</span>
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Find Balance and Inner Peace</span>
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Gain Clarity and Direction</span>
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Unlock Their Full Potential</span>
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
              <span className="font-serif text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl font-semibold text-[#3a1906] tracking-wide lg:whitespace-nowrap">Live with Purpose and Authenticity</span>
            </motion.div>

          </div>

        </motion.div>
      </section>

      {/* Services Section - Editorial Image-Led Explorer */}
      <ServicesSection />

      {/* Testimonials Section - 9-Card Editorial Collage */}
      <TestimonialsSection />

    </div>
  )
}

export default Home
