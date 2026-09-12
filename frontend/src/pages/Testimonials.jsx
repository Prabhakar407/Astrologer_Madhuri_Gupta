import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Verma",
    title: "Corporate Executive, New Delhi",
    description:
      "The Janam Kundli analysis and planetary transit guidance provided by Astrologer Madhuri Gupta gave me immense clarity during a major career transition. Her gemstone and mantra remedies were practical and truly transformative.",
    imageUrl: "/testimonial_rajesh.webp",
  },
  {
    name: "Ananya Sharma",
    title: "Architect & Interior Designer, Agra",
    description:
      "Her Vastu consultation completely shifted the energy of our home and workspace without requiring structural demolition. Her calm demeanor, profound depth in classical Vedic astrology, and actionable advice are unmatched.",
    imageUrl: "/testimonial_ananya.webp",
  },
  {
    name: "Vikram Malhotra",
    title: "Business Owner, Lucknow",
    description:
      "We consulted Madhuri ji for Kundli matching and relationship synastry. Her deep analysis of Manglik and Nadi Doshas, combined with personalized remedies, brought immense peace of mind and harmony to both families.",
    imageUrl: "/testimonial_vikram.webp",
  },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.title = "Client Reviews & Testimonials | Astrologer Madhuri Gupta Agra";
  }, []);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="pt-24 sm:pt-28 lg:pt-24 2xl:pt-36 3xl:pt-40 4xl:pt-48 min-h-[calc(100vh-80px)] bg-[#F3E7D5] bg-cover bg-center flex flex-col justify-center py-6 2xl:py-12 relative" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
      <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />

      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col space-y-6 lg:space-y-10 2xl:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-1.5 max-w-3xl 2xl:max-w-4xl mx-auto">
          <span className="font-serif italic text-[#b8922b] tracking-[0.25em] text-[10px] sm:text-xs 2xl:text-sm uppercase block">Kind Words</span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-[#3a1906] tracking-wide uppercase">
            Client Testimonials
          </h1>
          <div className="w-12 2xl:w-16 h-[1.5px] bg-[#3a1906]/30 mx-auto mt-2 2xl:mt-3" />
        </div>

        {/* Carousel Container */}
        <div className="w-full max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto px-4">
          
          {/* Desktop & Tablet layout */}
          <div className="hidden md:flex flex-col lg:flex-row relative items-center justify-center">
            
            {/* Avatar Frame */}
            <div className="w-[280px] h-[280px] lg:w-[380px] lg:h-[380px] 2xl:w-[480px] 2xl:h-[480px] 3xl:w-[540px] 3xl:h-[540px] rounded-3xl overflow-hidden border border-[#deb18a]/50 shadow-2xl flex-shrink-0 bg-white/50 p-2 2xl:p-3 z-0 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.imageUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full rounded-2xl overflow-hidden"
                >
                  <img
                    src={currentTestimonial.imageUrl}
                    alt={`${currentTestimonial.name} - Astrologer Madhuri Gupta Client Review`}
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content Card (Overlapping Left Frame on desktop, neatly stacked on tablet) */}
            <div className="bg-[#F3E7D5]/95 backdrop-blur-md border border-[#deb18a]/50 rounded-3xl shadow-xl p-6 lg:p-8 2xl:p-10 3xl:p-12 ml-0 lg:ml-[-60px] 2xl:ml-[-80px] 3xl:ml-[-100px] mt-[-24px] lg:mt-0 z-10 w-full max-w-lg 2xl:max-w-xl 3xl:max-w-2xl flex-1 relative">
              
              {/* Elegant Sparkle decoration */}
              <div className="absolute top-5 right-5 2xl:top-7 2xl:right-7 opacity-30 text-[#b8922b] pointer-events-none">
                <Sparkles className="h-5 w-5 2xl:h-7 2xl:w-7" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.name}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="mb-4 2xl:mb-6">
                    <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold font-serif text-[#3a1906] mb-1">
                      {currentTestimonial.name}
                    </h2>
                    <p className="text-[11px] 2xl:text-xs font-semibold text-[#b8922b] uppercase tracking-wider">
                      {currentTestimonial.title}
                    </p>
                  </div>

                  <blockquote className="text-[#3a1906]/90 text-xs lg:text-sm 2xl:text-base leading-relaxed mb-4 2xl:mb-6 italic font-medium border-l-2 border-[#b8922b]/50 pl-4 2xl:pl-6 py-0.5">
                    "{currentTestimonial.description}"
                  </blockquote>

                  {/* Verified Rating */}
                  <div className="flex items-center space-x-1 text-[#b8922b]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm 2xl:text-base">★</span>
                    ))}
                    <span className="text-[10px] 2xl:text-xs text-[#3a1906]/60 font-serif uppercase tracking-widest pl-2">Verified Client</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Mobile layout */}
          <div className="md:hidden max-w-xs mx-auto text-center bg-transparent">
            
            {/* Avatar */}
            <div className="w-full max-w-[220px] aspect-square bg-white/50 border border-[#deb18a]/50 p-1 rounded-3xl overflow-hidden mb-4 shadow-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.imageUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full h-full rounded-2xl overflow-hidden"
                >
                  <img
                    src={currentTestimonial.imageUrl}
                    alt={`${currentTestimonial.name} - Astrologer Madhuri Gupta Client Review`}
                    loading="lazy"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Card content */}
            <div className="px-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <h2 className="text-lg font-bold font-serif text-[#3a1906] mb-0.5">
                    {currentTestimonial.name}
                  </h2>
                  
                  <p className="text-[10px] font-semibold text-[#b8922b] uppercase tracking-wider mb-2">
                    {currentTestimonial.title}
                  </p>
                  
                  <blockquote className="text-[#3a1906]/90 text-xs leading-relaxed mb-4 italic font-medium pl-2 border-l border-[#b8922b]/50 text-left">
                    "{currentTestimonial.description}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-1 text-[#b8922b]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                    <span className="text-[9px] text-[#3a1906]/60 font-serif uppercase tracking-widest pl-1.5">Verified Client</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom navigation */}
          <div className="flex justify-center items-center gap-6 mt-1 lg:mt-2">
            {/* Previous */}
            <motion.button
              onClick={handlePrevious}
              whileTap={{ scale: 0.92 }}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-[#F3E7D5] border border-[#3a1906]/20 shadow-md flex items-center justify-center hover:bg-[#3a1906] hover:text-white text-[#3a1906] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4.5 h-4.5" />
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, testimonialIndex) => (
                <button
                  key={testimonialIndex}
                  onClick={() => setCurrentIndex(testimonialIndex)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors cursor-pointer",
                    testimonialIndex === currentIndex
                      ? "bg-[#3a1906]"
                      : "bg-[#3a1906]/25"
                  )}
                  aria-label={`Go to testimonial ${testimonialIndex + 1}`}
                />
              ))}
            </div>

            {/* Next */}
            <motion.button
              onClick={handleNext}
              whileTap={{ scale: 0.92 }}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-[#F3E7D5] border border-[#3a1906]/20 shadow-md flex items-center justify-center hover:bg-[#3a1906] hover:text-white text-[#3a1906] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </motion.button>
          </div>

        </div>

      </div>
    </div>
  );
}
