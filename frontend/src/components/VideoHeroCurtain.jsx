import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "+ WISDOM · CLARITY · PROSPERITY",
    heading: "A clearer path begins within.",
    description: "Vedic astrology and spiritual guidance for the moments when life asks you to pause, listen, and realign.",
    primaryCta: {
      text: "BOOK A CONSULTATION →",
      to: "/booking"
    },
    secondaryCta: {
      text: "DISCOVER MORE"
    }
  },
  {
    id: 2,
    eyebrow: "+ PERSONAL GUIDANCE · ANCIENT INSIGHT",
    heading: "Make sense of what comes next.",
    description: "Understand your patterns, your timing, and the opportunities waiting in the chapters ahead.",
    primaryCta: {
      text: "EXPLORE SERVICES →",
      to: "/services"
    },
    secondaryCta: {
      text: "DISCOVER MORE"
    }
  },
  {
    id: 3,
    eyebrow: "+ GROUNDED · INTUITIVE · PERSONAL",
    heading: "Your questions deserve a thoughtful answer.",
    description: "A calm, practical approach to astrology that turns ancient wisdom into modern direction.",
    primaryCta: {
      text: "MEET MADHURI →",
      to: "/about"
    },
    secondaryCta: {
      text: "DISCOVER MORE"
    }
  }
];

function VideoHeroCurtain() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  const [isSliderOpen, setIsSliderOpen] = useState(() => {
    if (typeof window !== 'undefined' && (window.location.href.includes('curtain') || window.location.search.includes('curtain'))) {
      return true;
    }
    return false;
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const isSliderOpenRef = useRef(isSliderOpen);
  const isTransitioningRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    isSliderOpenRef.current = isSliderOpen;
  }, [isSliderOpen]);

  // Guarantee video plays and loops across all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  // Auto-rotate slides when the slider is open (matching Helper2.webm transition rhythm)
  useEffect(() => {
    if (!isSliderOpen) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5800);
    return () => clearInterval(timer);
  }, [isSliderOpen]);

  const openSlider = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsSliderOpen(true);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 800);
  }, []);

  const closeSlider = useCallback((e) => {
    e?.stopPropagation();
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsSliderOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 800);
  }, []);

  const scrollToNextSection = () => {
    const nextEl = document.getElementById('consultation-hero');
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intercept wheel, touch, and scroll interactions at the top of the hero
  useEffect(() => {
    // Wheel listener (passive: false so we can preventDefault and stop unwanted page jumps)
    const handleWheel = (e) => {
      const isAtTop = window.scrollY <= 8;

      // 1. If at top and curtain is CLOSED:
      // Scrolling DOWN must drop the curtain smoothly from the top, NOT scroll the page away!
      if (isAtTop && !isSliderOpenRef.current) {
        if (e.deltaY > 3) {
          e.preventDefault();
          openSlider();
        }
        return;
      }

      // 2. If at top and curtain is OPEN:
      if (isAtTop && isSliderOpenRef.current) {
        // Scrolling UP must smoothly retract the curtain back up to reveal video
        if (e.deltaY < -5) {
          e.preventDefault();
          closeSlider();
          return;
        }

        // If currently animating down, absorb wheel down events so user sees the curtain drop
        if (isTransitioningRef.current && e.deltaY > 0) {
          e.preventDefault();
          return;
        }

        // If done animating and user scrolls DOWN: allow normal scroll down to consultation section
      }
    };

    // Touch listeners for mobile / tablet gestures
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      const isAtTop = window.scrollY <= 8;
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = touchStartY.current - currentY; // positive = swipe up = scroll down
      const deltaX = touchStartX.current - currentX;

      // Ignore primarily horizontal gestures
      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      // 1. If at top and curtain is CLOSED:
      if (isAtTop && !isSliderOpenRef.current) {
        if (deltaY > 12) {
          if (e.cancelable) e.preventDefault();
          openSlider();
        }
        return;
      }

      // 2. If at top and curtain is OPEN:
      if (isAtTop && isSliderOpenRef.current) {
        // Swipe down = scroll up -> retract curtain
        if (deltaY < -12) {
          if (e.cancelable) e.preventDefault();
          closeSlider();
          return;
        }

        // Absorb during transition
        if (isTransitioningRef.current && deltaY > 0) {
          if (e.cancelable) e.preventDefault();
          return;
        }
      }
    };

    // Keyboard navigation (Arrow keys / Page keys / Space)
    const handleKeyDown = (e) => {
      const isAtTop = window.scrollY <= 8;
      if (isAtTop) {
        if (!isSliderOpenRef.current && (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ')) {
          e.preventDefault();
          openSlider();
        } else if (isSliderOpenRef.current && (e.key === 'ArrowUp' || e.key === 'PageUp')) {
          e.preventDefault();
          closeSlider();
        }
      }
    };

    // Scroll listener: keep slider state open when scrolling further down page
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120 && !isSliderOpenRef.current) {
        setIsSliderOpen(true);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [openSlider, closeSlider]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[580px] 2xl:min-h-[750px] 3xl:min-h-[900px] overflow-hidden bg-black select-none"
    >
      {/* 1. Full Bleed Repeating Background Video Layer */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden cursor-pointer"
        onClick={openSlider}
        title="Click to explore"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover absolute inset-0 pointer-events-none"
          src="/Hero.mp4"
        />
        {/* Subtle film over video for luxury contrast */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Minimal initial bottom prompt on video when slider is retracted */}
        {!isSliderOpen && (
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none group">
            <span className="font-serif text-[clamp(10px,0.7vw+2px,15px)] tracking-[0.25em] uppercase font-semibold text-[#f5ebd6] drop-shadow-md">
              Scroll Down To Explore
            </span>
            <div className="w-9 h-9 2xl:w-11 2xl:h-11 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <ChevronDown className="w-4 h-4 2xl:w-5 2xl:h-5 text-[#deb18a] animate-bounce" />
            </div>
          </div>
        )}
      </div>

      {/* 2. Top-Down Sliding Cream Panel (Foreground Reveal from top, rounded bottom corners, #F3E7D5) */}
      <motion.div
        initial={false}
        animate={{ 
          y: isSliderOpen ? "0%" : "-105%"
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1] // Luxury cubic bezier curve
        }}
        className="absolute top-0 left-0 right-0 z-30 w-full h-auto max-h-[82svh] md:h-[clamp(440px,50svh,560px)] lg:h-[clamp(430px,58svh,580px)] xl:h-[clamp(450px,56svh,620px)] 2xl:h-[clamp(520px,56svh,700px)] 3xl:h-[clamp(580px,56svh,760px)] 4xl:h-[50svh] 5xl:h-[33.3svh] bg-[#F3E7D5] rounded-b-[clamp(28px,3vw,56px)] 4xl:rounded-b-[52px] 5xl:rounded-b-[64px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] border-b border-[#deb18a]/40 flex flex-col justify-between px-[clamp(1rem,3.2vw,4.5rem)] 4xl:px-16 5xl:px-24 pt-[66px] xs:pt-[68px] sm:pt-[70px] md:pt-[61px] 2xl:pt-[88px] 3xl:pt-[118px] 4xl:pt-[159px] 5xl:pt-[190px] pb-3 sm:pb-3 md:pb-0 overflow-y-auto lg:overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content Grid: Left Side Text Carousel + Right Side Rotating Wheel & Portrait */}
        <div className="w-full max-w-7xl 2xl:max-w-[94vw] 4xl:max-w-[92vw] 5xl:max-w-[90vw] mx-auto grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12 4xl:gap-12 5xl:gap-16 items-center my-auto">
          
          {/* Left Side: Smooth Changing Content with Fluid Percentage Scaling */}
          <div className="md:col-span-7 flex flex-col justify-center text-left min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col space-y-[clamp(0.45rem,0.7vw,1.1rem)] 4xl:space-y-2 5xl:space-y-1.5"
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[clamp(0.68rem,0.52rem+0.35vw,1.15rem)] 4xl:text-[1.2rem] 5xl:text-[1.15rem] tracking-[0.24em] 4xl:tracking-[0.25em] 5xl:tracking-[0.25em] uppercase font-semibold text-[#5a3d2e]/90">
                    {activeSlide.eyebrow}
                  </span>
                </div>

                {/* Main Heading - Editorial high-contrast serif auto-scaling with viewport */}
                <h1 className="font-serif text-[clamp(1.6rem,1rem+2.2vw,4.4rem)] 4xl:text-[3.8rem] 5xl:text-[3.1rem] text-[#2e1c14] font-normal leading-[1.1] 4xl:leading-[1.1] 5xl:leading-[1.1] tracking-tight">
                  {activeSlide.heading}
                </h1>

                {/* Subtext Description */}
                <p className="font-sans text-[clamp(0.78rem,0.65rem+0.55vw,1.35rem)] 4xl:text-[1.25rem] 5xl:text-[1.15rem] text-[#3e271c]/85 max-w-[min(100%,38vw+180px)] 4xl:max-w-[760px] 5xl:max-w-[1100px] leading-relaxed 4xl:leading-[1.4] 5xl:leading-[1.35] font-normal">
                  {activeSlide.description}
                </p>

                {/* Action Buttons with fluid padding and font scaling */}
                <div className="flex flex-wrap items-center gap-[clamp(0.6rem,1vw,1.25rem)] 4xl:gap-4 5xl:gap-4 pt-0.5 sm:pt-1 4xl:pt-0.5 5xl:pt-0.5">
                  <Link
                    to={activeSlide.primaryCta.to}
                    className="inline-flex items-center gap-[clamp(0.4rem,0.6vw,0.9rem)] 4xl:gap-3 5xl:gap-3 px-[clamp(1rem,0.8rem+1vw,2.5rem)] py-[clamp(0.45rem,0.35rem+0.45vw,1.05rem)] 4xl:px-8 4xl:py-3 5xl:px-8 5xl:py-2.5 rounded-full bg-[#2e1c14] text-white font-sans text-[clamp(0.7rem,0.6rem+0.32vw,1.05rem)] 4xl:text-[1.1rem] 5xl:text-[1.05rem] font-semibold tracking-wider hover:bg-[#442a1e] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                  >
                    <span>{activeSlide.primaryCta.text}</span>
                  </Link>
                  <button
                    onClick={scrollToNextSection}
                    className="inline-flex items-center px-[clamp(1rem,0.8rem+1vw,2.5rem)] py-[clamp(0.45rem,0.35rem+0.45vw,1.05rem)] 4xl:px-8 4xl:py-3 5xl:px-8 5xl:py-2.5 rounded-full border border-[#2e1c14]/35 text-[#2e1c14] font-sans text-[clamp(0.7rem,0.6rem+0.32vw,1.05rem)] 4xl:text-[1.1rem] 5xl:text-[1.05rem] font-semibold tracking-wider hover:bg-[#2e1c14]/10 transition-all duration-300"
                  >
                    <span>{activeSlide.secondaryCta.text}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Indicator Dots (Clickable to switch slides) */}
            <div className="flex items-center gap-[clamp(0.35rem,0.45vw,0.75rem)] 4xl:gap-2 5xl:gap-2 mt-[clamp(0.5rem,0.8vw,1.25rem)] 4xl:mt-2.5 5xl:mt-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-[clamp(4px,0.35vw,7px)] 4xl:h-1.5 5xl:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentSlide === idx 
                      ? 'w-[clamp(1.5rem,2vw,3rem)] 4xl:w-14 5xl:w-16 bg-[#2e1c14]' 
                      : 'w-[clamp(0.5rem,0.6vw,0.9rem)] 4xl:w-3 5xl:w-3.5 bg-[#2e1c14]/25 hover:bg-[#2e1c14]/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Rotating Zodiac Wheel + Person Portrait (Auto-scaling percentage ratio) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-[clamp(165px,40vw,240px)] h-[clamp(165px,40vw,240px)] md:w-[clamp(190px,20vw,240px)] md:h-[clamp(190px,20vw,240px)] lg:w-[clamp(230px,21vw,460px)] lg:h-[clamp(230px,21vw,460px)] 4xl:w-[310px] 4xl:h-[310px] 5xl:w-[250px] 5xl:h-[250px] aspect-square flex items-center justify-center select-none shrink-0">
              
              {/* Rotating Zodiac Wheel behind the person */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
                className="absolute inset-0 opacity-90 pointer-events-none"
                style={{
                  backgroundImage: "url('/wheel.webp')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  zIndex: 10
                }}
              />

              {/* Top Center Lighting Highlight */}
              <div 
                className="absolute top-[-8%] left-1/2 -translate-x-1/2 w-[70%] h-[70%] rounded-full pointer-events-none mix-blend-screen opacity-95 animate-pulse"
                style={{
                  background: 'radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(222, 177, 138, 0.15) 55%, transparent 75%)',
                  filter: 'blur(3px)',
                  zIndex: 15
                }}
              />

              {/* Orbit text accents (as seen in Helper2.webm) */}
              <div className="absolute top-[18%] left-[-4%] z-20 pointer-events-none hidden sm:block">
                <span className="font-serif italic text-[clamp(7.5px,0.55vw,11px)] 4xl:text-[11px] 5xl:text-[12px] text-[#8a6834] uppercase tracking-widest bg-[#F3E7D5]/90 px-[clamp(4px,0.4vw,8px)] 4xl:px-2 5xl:px-2.5 py-[clamp(1px,0.15vw,3px)] 4xl:py-0.5 5xl:py-0.5 rounded backdrop-blur-xs shadow-xs">
                  VEDIC WISDOM
                </span>
              </div>
              <div className="absolute top-[12%] right-[-2%] z-20 pointer-events-none hidden sm:block">
                <span className="font-serif italic text-[clamp(7.5px,0.55vw,11px)] 4xl:text-[11px] 5xl:text-[12px] text-[#8a6834] uppercase tracking-widest bg-[#F3E7D5]/90 px-[clamp(4px,0.4vw,8px)] 4xl:px-2 5xl:px-2.5 py-[clamp(1px,0.15vw,3px)] 4xl:py-0.5 5xl:py-0.5 rounded backdrop-blur-xs shadow-xs">
                  PRACTICAL CLARITY
                </span>
              </div>

              {/* The Person (Hero_person.webp) in the center */}
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
                  alt="Astrologer Madhuri Gupta - Best Vedic Astrologer" 
                  fetchPriority="high"
                  className="w-full h-auto object-contain object-bottom pointer-events-none"
                />
              </div>

              {/* Ground shadow underneath */}
              <div 
                className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[60%] h-[8%] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse, rgba(79, 49, 41, 0.7) 0%, transparent 75%)',
                  filter: 'blur(4px)',
                  zIndex: 21
                }}
              />
            </div>

            {/* Caption label under portrait (as seen in Helper2.webm) */}
            <div className="mt-1 4xl:mt-1 5xl:mt-1.5 text-center w-full">
              <div className="font-serif text-[clamp(0.72rem,0.6rem+0.32vw,1.15rem)] 4xl:text-[1.15rem] 5xl:text-[1.15rem] font-bold tracking-[0.16em] uppercase text-[#2e1c14]">
                Madhuri Gupta
              </div>
              <div className="font-sans text-[clamp(0.6rem,0.5rem+0.25vw,0.95rem)] 4xl:text-[0.95rem] 5xl:text-[1.05rem] text-[#6e4e3b] uppercase tracking-[0.2em] font-medium">
                Vedic Astrologer & Spiritual Guide
              </div>
            </div>
          </div>

        </div>

        {/* Retract Tab / Slide-Up Cue at the bottom of the card */}
        <button
          onClick={closeSlider}
          title="Slide up to reveal video"
          className="group flex flex-col items-center gap-0.5 cursor-pointer pt-0.5 pb-0.5 mx-auto opacity-75 hover:opacity-100 transition-opacity shrink-0 relative md:absolute md:bottom-2 4xl:md:bottom-2.5 5xl:md:bottom-3 left-1/2 -translate-x-1/2 z-10 mt-3 md:mt-0 mb-1"
        >
          <ChevronUp className="w-4 h-4 2xl:w-5 2xl:h-5 4xl:w-5 4xl:h-5 5xl:w-5 5xl:h-5 text-[#2e1c14]/70 group-hover:text-[#2e1c14] transition-transform group-hover:-translate-y-0.5" />
          <div className="w-12 sm:w-16 2xl:w-20 4xl:w-20 5xl:w-24 h-1 4xl:h-1.5 5xl:h-1.5 bg-[#2e1c14]/25 group-hover:bg-[#2e1c14]/50 rounded-full transition-colors" />
        </button>
      </motion.div>

      {/* 3. Bottom Video Area Content: Glassmorphic Explore Prompt Over Playing Video */}
      <AnimatePresence>
        {isSliderOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="absolute bottom-4 sm:bottom-6 2xl:bottom-8 4xl:bottom-10 5xl:bottom-12 left-0 right-0 z-20 flex justify-center items-center pointer-events-auto"
          >
            <button
              onClick={scrollToNextSection}
              className="flex items-center gap-2.5 4xl:gap-3.5 px-[clamp(1.1rem,1.4vw,2.2rem)] 4xl:px-10 5xl:px-12 py-[clamp(0.45rem,0.6vw,0.9rem)] 4xl:py-3.5 5xl:py-4.5 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-md border border-white/30 hover:border-[#deb18a]/80 shadow-2xl text-[#f7ebd4] font-serif text-[clamp(0.68rem,0.58rem+0.3vw,1rem)] 4xl:text-[1.2rem] 5xl:text-[1.4rem] font-bold uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer hover:scale-105"
            >
              <span>Explore Details</span>
              <ChevronDown className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 4xl:w-5 4xl:h-5 5xl:w-6 5xl:h-6 text-[#deb18a] animate-bounce" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default VideoHeroCurtain;
