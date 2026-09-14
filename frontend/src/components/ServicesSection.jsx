import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    id: 'kundli-analysis',
    num: '01',
    label: 'Service 01',
    name: 'Kundli Analysis',
    summary: 'Decode your birth chart to uncover planetary patterns and strengths.',
    price: '₹3,500',
    duration: '60 min · Video call',
    detail: 'A comprehensive study of your Janam Kundli—examining planetary strengths, houses, and dasha cycles to illuminate your innate life path and purpose.'
  },
  {
    id: 'kundli-prediction',
    num: '02',
    label: 'Service 02',
    name: 'Kundli Prediction',
    summary: 'Clear life timing and future forecasts for career, marriage, and finances.',
    price: '₹3,500',
    duration: '60 min · Video call',
    detail: 'Actionable timing forecasts based on planetary transits (Gochara) and dasha periods, helping you navigate upcoming decisions with clarity and foresight.'
  },
  {
    id: 'vastu-consultation',
    num: '03',
    label: 'Service 03',
    name: 'Vastu Consultation',
    summary: 'Create spaces that support calm, focus, and natural energy flow.',
    price: '₹2,500',
    duration: '45 min · Home or virtual',
    detail: 'A practical spatial analysis of your home or workspace with simple, non-demolition remedies to restore harmony, prosperity, and peace of mind.'
  },
  {
    id: 'numerology',
    num: '04',
    label: 'Service 04',
    name: 'Numerology',
    summary: 'Find meaning in the numbers shaping your name, destiny, and decisions.',
    price: '₹2,000',
    duration: '45 min · Video call',
    detail: 'A concise calculation of your life path, expression, and soul numbers to clarify your personal frequency, career timing, and relationship compatibility.'
  }
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeService = SERVICES[activeIndex];

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % SERVICES.length;
      setActiveIndex(nextIndex);
      document.getElementById(`service-tab-${SERVICES[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + SERVICES.length) % SERVICES.length;
      setActiveIndex(prevIndex);
      document.getElementById(`service-tab-${SERVICES[prevIndex].id}`)?.focus();
    }
  };

  return (
    <section 
      id="services" 
      className="relative z-10 w-full py-6 sm:py-7 md:py-7 lg:py-8 xl:py-9 2xl:py-12 bg-[#F3E7D5] text-[#432015] border-t border-[#432015]/10"
    >
      <div className="w-full max-w-7xl 2xl:max-w-[88vw] 3xl:max-w-[85vw] mx-auto px-4 sm:px-6 md:px-7 lg:px-8 xl:px-10 2xl:px-14">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-3 sm:mb-4 md:mb-4 lg:mb-4 xl:mb-5">
          {/* Section Label: 02 · SERVICES */}
          <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
            <span className="font-sans text-[10.5px] sm:text-xs tracking-[0.22em] uppercase font-semibold text-[#806B5A]">
              02 · SERVICES
            </span>
            <span className="h-px w-7 sm:w-8 bg-[#B58A4D]/50" />
          </div>

          {/* Editorial Heading: Half in Cocoa Brown, Half in Warm Antique Gold */}
          <h2 className="font-serif text-xl sm:text-2xl md:text-2xl lg:text-[1.85rem] xl:text-[2.2rem] 2xl:text-[2.8rem] leading-[1.12] tracking-tight">
            <span className="text-[#432015] font-serif font-normal">Guidance for </span>
            <span className="text-[#B58A4D] italic font-serif font-normal drop-shadow-xs">what matters.</span>
          </h2>

          {/* Description */}
          <p className="mt-1 sm:mt-1.5 font-sans text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base text-[#806B5A] leading-relaxed font-normal max-w-xl">
            A calm, focused session for the question in front of you.
          </p>
        </div>

        {/* Image-Led Responsive Service Explorer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 md:gap-5 lg:gap-6 xl:gap-8 2xl:gap-10 items-stretch">
          
          {/* LEFT SIDE: Portrait / Image Panel (Reduced width by 1/4 on iPad and greater: md:col-span-4) */}
          <motion.div 
            whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-4 relative rounded-xl sm:rounded-2xl lg:rounded-2xl overflow-hidden border border-[#432015]/12 shadow-[0_10px_24px_-10px_rgba(67,32,21,0.18)] bg-[#432015] group aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:h-auto min-h-[220px] sm:min-h-[240px] md:min-h-[310px] lg:min-h-[320px] xl:min-h-[340px] 2xl:min-h-[400px] 3xl:min-h-[450px] flex flex-col justify-between p-3.5 sm:p-4 lg:p-4 xl:p-5"
          >
            {/* Stable Background Portrait */}
            <img 
              src="/madhuri-portrait.png" 
              alt="Astrologer Madhuri Gupta - Personal Guidance"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
            />

            {/* Dark Cocoa Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#432015] via-[#432015]/40 to-[#432015]/20 pointer-events-none" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none rounded-xl sm:rounded-2xl lg:rounded-2xl" />

            {/* Subtle Gold Label on the Image: 01 — PERSONAL GUIDANCE */}
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#432015]/85 backdrop-blur-md border border-[#B58A4D]/40 text-[#B58A4D] font-sans text-[9px] sm:text-[10px] xl:text-[11px] tracking-[0.18em] uppercase font-semibold shadow-xs">
                <Sparkles className="w-2.5 h-2.5 text-[#B58A4D]" />
                01 — PERSONAL GUIDANCE
              </span>
            </div>

            {/* Subtle Lower Identity Vignette */}
            <div className="relative z-10 mt-auto pt-2.5 sm:pt-3 text-white/90">
              <p className="font-serif text-sm sm:text-base lg:text-base xl:text-lg 2xl:text-xl text-[#F3E7D5] font-normal tracking-wide">
                Astrologer Madhuri Gupta
              </p>
              <p className="font-sans text-[9.5px] sm:text-[10px] xl:text-[11px] text-[#F3E7D5]/70 uppercase tracking-[0.18em] font-medium mt-0.5">
                Vedic Wisdom · Practical Clarity
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Service Navigation List + Active Service Detail */}
          <div className="md:col-span-8 flex flex-col justify-between">
            
            {/* Service Navigation Vertical Tab List */}
            <div 
              role="tablist" 
              aria-label="Astrology & Vastu Services"
              className="flex flex-col divide-y divide-[#432015]/10 border-t border-b border-[#432015]/15"
            >
              {SERVICES.map((service, index) => {
                const isActive = activeIndex === index;

                return (
                  <motion.button
                    key={service.id}
                    role="tab"
                    id={`service-tab-${service.id}`}
                    aria-selected={isActive}
                    aria-controls={`service-panel-${service.id}`}
                    tabIndex={0}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    whileHover={shouldReduceMotion ? {} : { x: 4 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`group w-full py-1.5 sm:py-2 md:py-1.5 lg:py-1.5 xl:py-2 2xl:py-2.5 px-2 sm:px-2.5 lg:px-3 text-left flex items-center justify-between transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B58A4D] rounded-sm relative ${
                      isActive ? 'bg-[#432015]/[0.035]' : 'hover:bg-[#432015]/[0.015]'
                    }`}
                  >
                    {/* Number and Name Column */}
                    <div className="flex items-baseline gap-2.5 sm:gap-3.5 lg:gap-3.5 xl:gap-4 min-w-0 pr-2">
                      {/* Number: 01, 02, 03, or 04 */}
                      <span className={`font-sans text-[11px] sm:text-xs xl:text-xs tracking-[0.18em] font-semibold transition-colors duration-200 shrink-0 ${
                        isActive ? 'text-[#B58A4D]' : 'text-[#806B5A]/80 group-hover:text-[#432015]'
                      }`}>
                        {service.num}
                      </span>

                      {/* Service Name & Summary */}
                      <div className="min-w-0">
                        <h3 className={`font-serif text-[13px] sm:text-[14.5px] md:text-[14px] lg:text-[14.5px] xl:text-[16px] 2xl:text-lg transition-colors duration-200 tracking-tight leading-snug ${
                          isActive ? 'text-[#432015] font-semibold' : 'text-[#432015]/85 group-hover:text-[#432015]'
                        }`}>
                          {service.name}
                        </h3>
                        <p className="font-sans text-[10px] sm:text-[11px] lg:text-[11px] xl:text-xs text-[#806B5A] mt-0.5 line-clamp-1 font-normal">
                          {service.summary}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div className="flex items-center shrink-0 ml-2">
                      <div className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-[#B58A4D] bg-[#B58A4D]/15 text-[#432015]' 
                          : 'border-[#432015]/20 text-[#806B5A] group-hover:border-[#432015]/40 group-hover:text-[#432015]'
                      }`}>
                        <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 ${
                          isActive ? 'rotate-90 text-[#B58A4D]' : 'group-hover:translate-x-0.5'
                        }`} />
                      </div>
                    </div>

                    {/* Active Gold Underline / Border */}
                    {isActive && (
                      <motion.div
                        layoutId="activeServiceUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B58A4D]"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Active Service Detail Panel with AnimatePresence */}
            <div className="mt-2.5 sm:mt-3 md:mt-2.5 lg:mt-3 xl:mt-3.5 2xl:mt-4">
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeService.name}
                  id={`service-panel-${activeService.id}`}
                  role="tabpanel"
                  aria-labelledby={`service-tab-${activeService.id}`}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="p-3 sm:p-3.5 md:p-3 lg:p-3.5 xl:p-4 2xl:p-5 rounded-xl sm:rounded-xl bg-[#432015]/[0.035] border border-[#432015]/10 flex flex-col justify-between shadow-xs relative"
                >
                  {/* Service Top Meta */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-1 sm:mb-1">
                      {/* Small Label: Service 01, 02, 03, or 04 */}
                      <span className="font-sans text-[10px] sm:text-[10.5px] xl:text-[11px] tracking-[0.22em] uppercase font-semibold text-[#B58A4D]">
                        {activeService.label}
                      </span>
                      {/* Duration */}
                      <span className="font-sans text-[10px] sm:text-[10.5px] xl:text-[11px] text-[#806B5A] tracking-wider uppercase font-medium">
                        {activeService.duration}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h4 className="font-serif text-sm sm:text-base md:text-base lg:text-base xl:text-lg 2xl:text-xl text-[#432015] font-normal tracking-tight leading-snug">
                      {activeService.name}
                    </h4>

                    {/* Short Detail */}
                    <p className="mt-1 sm:mt-1 font-sans text-[10.5px] sm:text-xs md:text-xs lg:text-xs xl:text-sm 2xl:text-base text-[#806B5A] leading-relaxed font-normal max-w-2xl line-clamp-2 sm:line-clamp-none">
                      {activeService.detail}
                    </p>
                  </div>

                  {/* Price & CTA Row */}
                  <div className="mt-2 pt-2 sm:mt-2.5 sm:pt-2.5 xl:mt-3 xl:pt-3 border-t border-[#432015]/10 flex flex-row items-center justify-between gap-3">
                    {/* Price with fade-in */}
                    <div className="flex flex-col">
                      <span className="font-sans text-[9px] sm:text-[9.5px] xl:text-[10px] tracking-[0.18em] uppercase text-[#806B5A] font-medium">
                        Fee
                      </span>
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.03 }}
                        className="font-serif text-base sm:text-lg md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl font-semibold text-[#432015] tracking-tight"
                      >
                        {activeService.price}
                      </motion.span>
                    </div>

                    {/* CTA: Book appointment → linking to /booking */}
                    <Link
                      to={`/booking?service=${activeService.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 lg:px-5 xl:px-6 py-1.5 sm:py-2 lg:py-2 xl:py-2.5 rounded-full bg-[#432015] text-[#F3E7D5] font-sans text-[11px] sm:text-xs tracking-[0.12em] uppercase font-semibold hover:bg-[#34180f] hover:text-[#f4e6c1] border border-transparent hover:border-[#B58A4D]/50 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.01] cursor-pointer text-center group shrink-0"
                    >
                      <span>Book appointment</span>
                      <span className="text-xs group-hover:translate-x-1 transition-transform duration-200">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
