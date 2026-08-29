import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function About() {
  return (
    <div className="min-h-screen bg-[#faf6e8]">
      
      {/* About Page Hero Section */}
      <section className="relative w-full h-auto min-h-screen pt-28 lg:pt-20 pb-16 flex flex-col justify-center items-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/marble-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#faf6e8]/90 z-0 pointer-events-none" />
        
        {/* Symmetrical crescent curved shading at the top to match image_67 */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#eadecc]/30 to-transparent pointer-events-none z-0" />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center space-y-6 lg:space-y-8 h-full">
          
          {/* Upper-Center Header */}
          <div className="text-center space-y-0.5 relative -top-3 lg:-top-6">
            <span className="font-serif italic font-semibold text-[#3a1906] tracking-[0.25em] text-[11px] sm:text-sm uppercase block select-none">Tarot Reading</span>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3a1906] tracking-wide">
              Personalized Divination
            </h1>
            <div className="w-10 h-[1.5px] bg-[#3a1906]/30 mx-auto mt-1" />
          </div>

          {/* Symmetrical 3-Column Grid representing image_67.png */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center w-full">
            
            {/* Column 1: Large Vertical Rectangular Photo of Smiling Woman (lg:col-span-4) */}
            <div className="lg:col-span-4 flex justify-center relative">
              {/* Constellation line-art above the portrait */}
              <div className="absolute -top-12 left-4 w-60 h-16 opacity-35 pointer-events-none">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-[#3a1906]" fill="none" strokeWidth="0.5">
                  <path d="M 10,30 L 30,15 L 50,30 L 70,10 L 90,25" />
                  <circle cx="10" cy="30" r="1.2" fill="#3a1906" />
                  <circle cx="30" cy="15" r="1.2" fill="#3a1906" />
                  <circle cx="50" cy="30" r="1.2" fill="#3a1906" />
                  <circle cx="70" cy="10" r="1.2" fill="#3a1906" />
                  <circle cx="90" cy="25" r="1.2" fill="#3a1906" />
                </svg>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative h-[42vh] lg:h-[60vh] max-h-[460px] aspect-[3/4] rounded-sm overflow-hidden p-1.5 border border-[#deb18a]/50 bg-white shadow-2xl"
              >
                <div className="w-full h-full rounded-sm overflow-hidden relative">
                  <img 
                    src="/Hero_person.png" 
                    alt="Madhuri Gupta" 
                    className="h-full w-full object-cover object-top pointer-events-none" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a1906]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>

            {/* Column 2: Center Paragraphs, Minimalist Button & Small Photo (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5 relative text-center">
              
              {/* Diamond grid graphic watermark in background */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <svg viewBox="0 0 100 100" className="w-56 h-56 stroke-[#3a1906]" fill="none" strokeWidth="0.6">
                  <polygon points="50,0 100,50 50,100 0,50" />
                  <polygon points="50,15 85,50 50,85 15,50" />
                  <line x1="50" y1="0" x2="50" y2="100" />
                  <line x1="0" y1="50" x2="100" y2="50" />
                </svg>
              </div>

              <div className="relative z-10 space-y-3 font-sans text-xs sm:text-sm text-[#3a1906]/80 leading-relaxed tracking-wide font-medium text-center">
                <p>
                  Discover solutions to dilemmas, gain perspective on life transitions, and harness the power of ancient wisdom to shape your future.
                </p>
                <p>
                  I interpret the unique positions of the planets at the moment of your birth to uncover your innate strengths.
                </p>
              </div>

              {/* Row: Minimalist More Info Button & Stats below */}
              <div className="relative z-10 flex flex-col items-center pt-1 space-y-4">
                
                {/* Minimalist outline button */}
                <Link 
                  to="/booking" 
                  className="px-5 py-2 border border-[#3a1906]/60 text-[#3a1906] font-serif text-[10px] tracking-widest uppercase hover:bg-[#3a1906] hover:text-[#faf6e8] transition-all duration-300 shrink-0"
                >
                  More Info
                </Link>

                {/* 3 Stats Boxes */}
                <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full pt-2">
                  <div className="bg-[#3a1906]/5 border border-[#3a1906]/15 rounded-xl px-4 py-2 text-center shrink-0 min-w-[90px]">
                    <div className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#b8922b]">15+</div>
                    <div className="text-[8px] sm:text-[9px] text-[#3a1906]/75 font-bold uppercase tracking-wider">Years Exp.</div>
                  </div>
                  <div className="bg-[#3a1906]/5 border border-[#3a1906]/15 rounded-xl px-4 py-2 text-center shrink-0 min-w-[110px]">
                    <div className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#b8922b]">10K+</div>
                    <div className="text-[8px] sm:text-[9px] text-[#3a1906]/75 font-bold uppercase tracking-wider">Clients Served</div>
                  </div>
                  <div className="bg-[#3a1906]/5 border border-[#3a1906]/15 rounded-xl px-4 py-2 text-center shrink-0 min-w-[90px]">
                    <div className="font-serif text-sm sm:text-base lg:text-lg font-bold text-[#b8922b]">4.9/5</div>
                    <div className="text-[8px] sm:text-[9px] text-[#3a1906]/75 font-bold uppercase tracking-wider">Rating</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Column 3: Symmetrical Arched Image Cluster (lg:col-span-3) - hidden on mobile/tablet */}
            <div className="hidden lg:flex lg:col-span-3 justify-center relative lg:-translate-y-20">
              
              <div className="relative w-44 h-[270px]">
                
                {/* Top Smaller Arch containing vertical line art (rotated 90 degrees clockwise) */}
                <div className="absolute top-0 right-0 w-[105px] h-[155px] rounded-t-full rounded-b-2xl overflow-hidden border border-[#b8922b]/35 shadow-md z-10 bg-white rotate-90 transition-transform duration-300">
                  <img src="/right_top.png" alt="Occult Alignment" className="w-full h-full object-cover object-center pointer-events-none" />
                </div>

                {/* Bottom Larger Arch containing fanned tarot over zodiac wheel (matching shape of top arch) */}
                <div className="absolute bottom-12 left-0 w-[125px] h-[155px] rounded-t-full rounded-b-2xl overflow-hidden border border-[#deb18a]/50 shadow-lg z-20 bg-white">
                  <img src="/right_bottom.png" alt="Tarot & Zodiac spread" className="w-full h-full object-cover object-center pointer-events-none" />
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Certification Section */}
      <section className="py-16 bg-[#faf6e8] relative z-10 border-t border-[#deb18a]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-1 mb-12">
            <span className="font-serif italic font-semibold text-[#b8922b] tracking-[0.25em] text-[10px] sm:text-xs uppercase block">Official Certification</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3a1906] tracking-wide uppercase">
              Professional Qualifications & Honors
            </h2>
            <div className="w-12 h-[1.5px] bg-[#3a1906]/35 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Certificate Image Container */}
            <div className="hidden md:block md:col-span-6 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[480px] p-2 bg-white rounded-lg border border-[#deb18a]/45 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] rounded overflow-hidden">
                  <img
                    src="/certificate.png"
                    alt="Astrology Certification"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Certificate Details */}
            <div className="md:col-span-6 space-y-5 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Mobile-only Certificate Image (visible on small screens only) */}
                <div className="block md:hidden w-full max-w-[280px] mx-auto mb-4 p-1.5 bg-white rounded-lg border border-[#deb18a]/45 shadow-md">
                  <div className="relative aspect-[4/3] rounded overflow-hidden">
                    <img
                      src="/certificate.png"
                      alt="Astrology Certification"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3a1906] leading-tight">
                    Advanced Astrology & Cosmic Analysis
                  </h3>
                  <p className="hidden md:block text-xs sm:text-sm font-semibold text-[#b8922b] tracking-wider uppercase">
                    The Astrological Society Council
                  </p>
                </div>

                <p className="hidden md:block text-xs sm:text-sm text-[#4a312a]/85 leading-relaxed font-medium">
                  Formally accredited in classical natal chart analysis, stellar calculations, and transits interpretation. This certification honors rigorous training in Jaimini systems and holistic predictive remedies.
                </p>

                <div className="hidden md:block pt-2 border-t border-[#3a1906]/10 space-y-2">
                  <div className="flex items-center space-x-2.5 text-xs text-[#3a1906] font-medium justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8922b] shrink-0" />
                    <span>Certified in Natal Chart Interpretation</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-[#3a1906] font-medium justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8922b] shrink-0" />
                    <span>Advanced Planetary Transits Mapping</span>
                  </div>
                  <div className="flex items-center space-x-2.5 text-xs text-[#3a1906] font-medium justify-center md:justify-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8922b] shrink-0" />
                    <span>Ethical Counselor Credentials</span>
                  </div>
                </div>

                <div className="hidden md:block pt-2 text-[10px] text-[#3a1906]/65 font-serif uppercase tracking-widest">
                  Issued: November 12, 2023 • Credential ID: AIAF-89240
                </div>

              </motion.div>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}

export default About
