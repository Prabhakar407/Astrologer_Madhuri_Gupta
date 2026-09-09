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
    name: "Michael Chen",
    title: "Senior Software Engineer, Cloud Infrastructure",
    description:
      "Working with this team completely changed our infrastructure game. The support and expertise were incredible. They delivered beyond our expectations and helped us scale to millions of users.",
    imageUrl: "/testimonial_michael.webp",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Jessica Roberts",
    title: "Lead Data Scientist, InsightX",
    description:
      "The data analytics platform they built gave our team the confidence and tools needed for true data-driven decisions. Their dashboarding capabilities went above and beyond our expectations.",
    imageUrl: "/testimonial_jessica.webp",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "William Carter",
    title: "VP Product, NovaLabs",
    description:
      "NovaLabs helped our products find the perfect market fit. Their engineering team exceeded every delivery milestone and provided exceptional technical leadership.",
    imageUrl: "/testimonial_william.webp",
    githubUrl: "#",
    twitterUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
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

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className="pt-20 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-80px)] bg-[#faf6e8] bg-cover bg-center flex flex-col justify-center py-6 relative" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
      <div className="absolute inset-0 bg-[#faf6e8]/90 z-0 pointer-events-none" />

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
          
          {/* Desktop layout */}
          <div className="hidden md:flex relative items-center justify-center">
            
            {/* Avatar Frame */}
            <div className="w-[360px] h-[360px] lg:w-[400px] lg:h-[400px] 2xl:w-[480px] 2xl:h-[480px] 3xl:w-[540px] 3xl:h-[540px] rounded-3xl overflow-hidden border border-[#deb18a]/50 shadow-2xl flex-shrink-0 bg-white/50 p-2 2xl:p-3 z-0 relative">
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

            {/* Content Card (Overlapping Left Frame) */}
            <div className="bg-[#faf6e8]/95 backdrop-blur-md border border-[#deb18a]/50 rounded-3xl shadow-xl p-6 lg:p-8 2xl:p-10 3xl:p-12 ml-[-60px] 2xl:ml-[-80px] 3xl:ml-[-100px] z-10 max-w-md lg:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl flex-1 relative">
              
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

                  <blockquote className="text-[#3a1906]/90 text-xs lg:text-sm 2xl:text-base leading-relaxed mb-6 2xl:mb-8 italic font-medium border-l-2 border-[#b8922b]/50 pl-4 2xl:pl-6 py-0.5">
                    "{currentTestimonial.description}"
                  </blockquote>

                  {/* Social Profile links */}
                  <div className="flex space-x-3 2xl:space-x-4">
                    {socialIcons.map(({ icon: IconComponent, url, label }) => (
                      <a
                        key={label}
                        href={url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 2xl:w-11 2xl:h-11 bg-[#3a1906] hover:bg-[#b8922b] text-white rounded-full flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-md"
                        aria-label={label}
                      >
                        <IconComponent className="w-4.5 h-4.5 2xl:w-5 2xl:h-5 text-white" />
                      </a>
                    ))}
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
                  
                  <div className="flex justify-center space-x-3">
                    {socialIcons.map(({ icon: IconComponent, url, label }) => (
                      <a
                        key={label}
                        href={url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 bg-[#3a1906] hover:bg-[#b8922b] text-white rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md"
                        aria-label={label}
                      >
                        <IconComponent className="w-4 h-4 text-white" />
                      </a>
                    ))}
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
              className="w-10 h-10 rounded-full bg-[#faf6e8] border border-[#3a1906]/20 shadow-md flex items-center justify-center hover:bg-[#3a1906] hover:text-white text-[#3a1906] transition-colors cursor-pointer"
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
              className="w-10 h-10 rounded-full bg-[#faf6e8] border border-[#3a1906]/20 shadow-md flex items-center justify-center hover:bg-[#3a1906] hover:text-white text-[#3a1906] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4.5 h-4.5" />
            </motion.button>
          </div>

        </div>

      </div>
    </div>
  );
}
