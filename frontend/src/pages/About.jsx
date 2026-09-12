import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function About() {
  useEffect(() => {
    document.title = "About Astrologer Madhuri Gupta | 15+ Yrs Vedic Experience Agra";
  }, []);
  return (
    <div className="min-h-screen bg-[#F3E7D5]">
      
      {/* About Page Hero Section: Full screen (< lg) so only Hero appears on load, reduced bottom gap and precise top clearance on 2K/3K/4K */}
      <section className="relative w-full h-auto min-h-[100svh] min-h-[100dvh] lg:min-h-0 pt-20 sm:pt-24 md:pt-28 lg:pt-24 xl:pt-28 2xl:pt-48 3xl:pt-60 4xl:pt-76 5xl:pt-96 pb-12 sm:pb-16 md:pb-16 lg:pb-12 xl:pb-14 2xl:pb-8 3xl:pb-8 4xl:pb-10 5xl:pb-12 flex flex-col justify-center lg:justify-start 2xl:justify-start items-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
        <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />
        
        {/* Symmetrical crescent curved shading at the top */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#eadecc]/30 to-transparent pointer-events-none z-0" />

        <div className="w-full max-w-7xl 2xl:max-w-[1600px] 3xl:max-w-[1920px] 4xl:max-w-[2400px] 5xl:max-w-[3200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 2xl:px-12 4xl:px-16 5xl:px-24 relative z-10 flex flex-col justify-center lg:justify-start 2xl:justify-start space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-6 xl:space-y-8 2xl:space-y-8 3xl:space-y-8 4xl:space-y-10 my-auto lg:my-0">
          
          {/* Upper-Center Header (with distinct clear padding below navbar on 2K/3K/4K) */}
          <div className="text-center space-y-1 relative pt-2 sm:pt-3 md:pt-4 lg:pt-2 2xl:pt-6 3xl:pt-8 4xl:pt-10 5xl:pt-12 mb-1 sm:mb-2 md:mb-4 lg:mb-1 2xl:mb-4 3xl:mb-5">
            <h1 className="font-serif text-lg min-[360px]:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl font-bold text-[#3a1906] tracking-wide whitespace-nowrap">
              Personalized Divination
            </h1>
            <div className="w-10 md:w-14 2xl:w-16 h-[1.5px] bg-[#3a1906]/30 mx-auto mt-1.5 2xl:mt-2" />
          </div>

          {/* Symmetrical 3-Column Grid representing image_67.png */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-8 xl:gap-10 2xl:gap-12 items-center lg:items-start w-full">
            
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
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative h-[38vh] sm:h-[42vh] md:h-[48vh] lg:h-[48vh] xl:h-[54vh] max-h-[440px] md:max-h-[480px] lg:max-h-[460px] aspect-[3/4] rounded-sm overflow-hidden p-1.5 border border-[#deb18a]/50 bg-white shadow-2xl"
              >
                <div className="w-full h-full rounded-sm overflow-hidden relative">
                  <img 
                    src="/Hero_person.webp" 
                    alt="Astrologer Madhuri Gupta - Vedic Astrologer in Agra" 
                    loading="lazy"
                    className="h-full w-full object-cover object-top pointer-events-none" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a1906]/15 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>

            {/* Column 2: Center Paragraphs, Minimalist Button & Small Photo (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-start relative text-center">
              
              {/* Diamond grid graphic watermark in background */}
              <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                <svg viewBox="0 0 100 100" className="w-56 h-56 stroke-[#3a1906]" fill="none" strokeWidth="0.6">
                  <polygon points="50,0 100,50 50,100 0,50" />
                  <polygon points="50,15 85,50 50,85 15,50" />
                  <line x1="50" y1="0" x2="50" y2="100" />
                  <line x1="0" y1="50" x2="100" y2="50" />
                </svg>
              </div>

              <div className="relative z-10 font-sans text-xs sm:text-sm md:text-base lg:text-xs xl:text-sm 2xl:text-base text-[#3a1906]/85 leading-relaxed tracking-wide font-medium text-center">
                <p>
                  I have spent over 15 years helping people find answers, overcome challenges, and make better life decisions through Vedic Astrology, Numerology, and Vastu. My consultations focus on providing clear, practical guidance for relationships, career, finances, and overall well-being. I believe astrology should not only offer insights but also help create positive change in everyday life.
                </p>
              </div>

              {/* Row: Minimalist More Info Button & Stats below */}
              <div className="relative z-10 flex flex-col items-center pt-5 sm:pt-6 md:pt-7 lg:pt-5 xl:pt-6 2xl:pt-4 space-y-4 sm:space-y-5 md:space-y-6 2xl:space-y-3">
                
                {/* Minimalist outline button */}
                <Link 
                  to="/booking" 
                  className="px-6 sm:px-7 md:px-8 py-2 sm:py-2.5 md:py-3 border border-[#3a1906]/60 text-[#3a1906] font-serif text-[10px] sm:text-xs md:text-xs tracking-widest uppercase hover:bg-[#3a1906] hover:text-[#F3E7D5] transition-all duration-300 shrink-0 shadow-sm"
                >
                  More Info
                </Link>

                {/* 3 Stats Boxes */}
                <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 w-full pt-1 md:pt-2 2xl:pt-1">
                  <div className="bg-[#3a1906]/5 border border-[#3a1906]/15 rounded-xl px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-center shrink-0 min-w-[90px] sm:min-w-[105px] md:min-w-[120px]">
                    <div className="font-serif text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-bold text-[#b8922b]">15+</div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-[#3a1906]/75 font-bold uppercase tracking-wider">Years Exp.</div>
                  </div>
                  <div className="bg-[#3a1906]/5 border border-[#3a1906]/15 rounded-xl px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-center shrink-0 min-w-[110px] sm:min-w-[125px] md:min-w-[140px]">
                    <div className="font-serif text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-bold text-[#b8922b]">10K+</div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-[#3a1906]/75 font-bold uppercase tracking-wider">Clients Served</div>
                  </div>
                  <div className="bg-[#3a1906]/5 border border-[#3a1906]/15 rounded-xl px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-center shrink-0 min-w-[90px] sm:min-w-[105px] md:min-w-[120px]">
                    <div className="font-serif text-sm sm:text-base md:text-lg lg:text-base xl:text-lg font-bold text-[#b8922b]">4.9/5</div>
                    <div className="text-[8px] sm:text-[9px] md:text-[10px] text-[#3a1906]/75 font-bold uppercase tracking-wider">Rating</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Column 3: Symmetrical Arched Image Cluster (lg:col-span-3) - hidden on mobile/tablet */}
            <div className="hidden lg:flex lg:col-span-3 justify-center relative">
              
              <div className="relative w-44 h-[270px]">
                
                {/* Top Smaller Arch containing vertical line art (rotated 90 degrees clockwise) */}
                <div className="absolute top-0 right-0 w-[105px] h-[155px] rounded-t-full rounded-b-2xl overflow-hidden border border-[#b8922b]/35 shadow-md z-10 bg-white rotate-90 transition-transform duration-300">
                  <img src="/right_top.webp" alt="Occult Alignment" loading="lazy" className="w-full h-full object-cover object-center pointer-events-none" />
                </div>

                {/* Bottom Larger Arch containing fanned tarot over zodiac wheel (matching shape of top arch) */}
                <div className="absolute bottom-12 left-0 w-[125px] h-[155px] rounded-t-full rounded-b-2xl overflow-hidden border border-[#deb18a]/50 shadow-lg z-20 bg-white">
                  <img src="/right_bottom.webp" alt="Tarot & Zodiac spread" loading="lazy" className="w-full h-full object-cover object-center pointer-events-none" />
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Certification Section: Standard comfortable spacing on mobile/tablet/laptop, reduced top spacing specifically on 2K/3K/4K */}
      <section className="pt-12 sm:pt-14 md:pt-16 lg:pt-12 xl:pt-14 2xl:pt-4 3xl:pt-4 4xl:pt-5 5xl:pt-6 pb-12 sm:pb-14 md:pb-16 lg:pb-12 xl:pb-14 2xl:pb-16 3xl:pb-20 4xl:pb-24 bg-[#F3E7D5] relative z-10 border-t border-[#deb18a]/20">
        <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1700px] mx-auto px-4 sm:px-6 md:px-8 lg:px-8 2xl:px-12">
          
          <div className="text-center space-y-1 mb-8 sm:mb-10 md:mb-12 lg:mb-8 xl:mb-10 2xl:mb-6 3xl:mb-6 4xl:mb-8">
            <span className="font-serif italic font-semibold text-[#b8922b] tracking-[0.25em] text-[10px] sm:text-xs 2xl:text-sm uppercase block">Official Certification</span>
            <h2 className="font-serif text-2xl sm:text-3xl 2xl:text-4xl font-bold text-[#3a1906] tracking-wide uppercase">
              Professional Qualifications & Honors
            </h2>
            <div className="w-12 2xl:w-16 h-[1.5px] bg-[#3a1906]/35 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-10 xl:gap-12 2xl:gap-16 items-center">
            
            {/* Left: Certificate Image Container */}
            <div className="hidden md:block md:col-span-6 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-[440px] lg:max-w-[460px] 2xl:max-w-[480px] p-2 bg-white rounded-lg border border-[#deb18a]/45 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] rounded overflow-hidden">
                  <img
                    src="/certificate.webp"
                    alt="Astrology Certification - Bharatiya Vidya Bhavan"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right: Certificate Details */}
            <div className="md:col-span-6 space-y-4 md:space-y-5 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-4"
              >
                {/* Mobile-only Certificate Image (visible on small screens only) */}
                <div className="block md:hidden w-full max-w-[280px] mx-auto mb-4 p-1.5 bg-white rounded-lg border border-[#deb18a]/45 shadow-md">
                  <div className="relative aspect-[4/3] rounded overflow-hidden">
                    <img
                      src="/certificate.webp"
                      alt="Astrology Certification - Bharatiya Vidya Bhavan"
                      loading="lazy"
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
