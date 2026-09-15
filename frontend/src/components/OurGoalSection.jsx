import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Briefcase, Home, Coins, Compass, Sparkles } from "lucide-react";
import { TextShimmer } from "./motion-primitives/text-shimmer";

/**
 * OurGoalSection
 * Recreates a "6 goal cards" layout for an astrology website,
 * styled with the site-wide signature serif typography, celestial dividers,
 * and responsive height calibration for laptop and smaller screens.
 */
export default function OurGoalSection() {
  const goals = [
    {
      id: 1,
      badge: "1",
      title: "LOVE & RELATIONSHIPS",
      desc: "Build trust and emotional harmony through astrological compatibility and synastry analysis.",
      icon: HeartHandshake,
      image: "/goals/relationships.jpg",
      alt: "Indian couple holding hands at wedding ceremony symbolizing deep astrological compatibility",
    },
    {
      id: 2,
      badge: "2",
      title: "CAREER & PURPOSE",
      desc: "Align career moves with favorable planetary timing and Dasha cycles to achieve true fulfillment.",
      icon: Briefcase,
      image: "/goals/career.jpg",
      alt: "Professional in executive attire representing career purpose and planetary timing",
    },
    {
      id: 3,
      badge: "3",
      title: "HOME & ENERGY",
      desc: "Harmonize the 5 elemental energies with Vastu space clearing for a peaceful, powerful home.",
      icon: Home,
      image: "/goals/home.jpg",
      alt: "Sunlit tranquil living space harmonized with natural Vastu elements",
    },
    {
      id: 4,
      badge: "4",
      title: "WEALTH & PROSPERITY",
      desc: "Unlock wealth-generating yogas and financial cycles in your chart for long-term prosperity.",
      icon: Coins,
      image: "/goals/wealth.jpg",
      alt: "Golden coins treasure representing financial prosperity and wealth cycles",
    },
    {
      id: 5,
      badge: "5",
      title: "LIFE DECISIONS",
      desc: "Gain clear astrological clarity to navigate crossroads and vital life choices confidently.",
      icon: Compass,
      image: "/goals/decisions.jpg",
      alt: "Person greeting sunrise on mountain peak symbolizing clarity in life decisions",
    },
    {
      id: 6,
      badge: "6",
      title: "SPIRITUAL GROWTH",
      desc: "Awaken cosmic awareness and align with your higher self by balancing planetary energies.",
      icon: Sparkles,
      image: "/goals/spiritual.jpg",
      alt: "Woman meditating peacefully in sunrise representing spiritual growth",
    },
  ];

  // Framer Motion staggered entrance container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.1,
      },
    },
  };

  // Card entrance animation variant with smooth slide-up and scale transition
  const cardVariants = {
    hidden: { opacity: 0, y: 36, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section 
      id="our-goal"
      className="relative w-full py-8 sm:py-10 md:py-10 lg:py-10 2xl:py-20 3xl:py-24 overflow-hidden parchment-texture"
    >
      {/* Styles for Fonts, Parchment Texture, Laptop Height Calibration & 2K Grid */}
      <style>{`
        .parchment-texture {
          background-color: #F8F3E8;
          background-image: 
            radial-gradient(ellipse at 12% 18%, rgba(226, 214, 192, 0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 88% 22%, rgba(218, 202, 178, 0.45) 0%, transparent 55%),
            radial-gradient(ellipse at 22% 82%, rgba(222, 208, 184, 0.5) 0%, transparent 60%),
            radial-gradient(ellipse at 78% 85%, rgba(230, 218, 196, 0.55) 0%, transparent 50%),
            linear-gradient(180deg, #FAF6EE 0%, #F5ECE0 50%, #EFE6D6 100%);
        }

        /* ------------------------------------------------------------- */
        /* LAPTOP SCREENS ONLY (1024px to 1535px)                       */
        /* Fits comfortably within single screen height (<768px viewport)*/
        /* ------------------------------------------------------------- */
        @media (min-width: 1024px) and (max-width: 1535px) {
          #our-goal {
            padding-top: 1.25rem !important;
            padding-bottom: 1.5rem !important;
          }
          .goal-header-box {
            margin-bottom: 0.85rem !important;
          }
          .goals-responsive-grid {
            gap: 0.75rem !important;
          }
          .goal-card-item {
            border-radius: 0.875rem !important;
          }
          .goal-card-content {
            padding: 0.85rem 0.95rem !important;
          }
          .goal-card-title {
            font-size: 0.8rem !important;
          }
          .goal-card-desc {
            font-size: 0.75rem !important;
            line-height: 1.35 !important;
          }
          .goal-card-image-box {
            min-height: 110px !important;
            width: 36% !important;
          }
        }

        /* ------------------------------------------------------------- */
        /* LARGE / 2K+ SCREENS (≥1920px)                                */
        /* 3 columns auto-fit with spacious proportion                   */
        /* ------------------------------------------------------------- */
        @media (min-width: 1920px) {
          .goals-responsive-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }
      `}</style>

      {/* Subtle Corner Parchment Accents */}
      <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 pointer-events-none opacity-30">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8C6D46]/25 fill-current">
          <path d="M0,0 L100,0 C72,14 42,9 26,26 C9,42 14,72 0,100 Z" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 pointer-events-none opacity-30 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#8C6D46]/25 fill-current">
          <path d="M0,0 L100,0 C72,14 42,9 26,26 C9,42 14,72 0,100 Z" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl lg:max-w-[1020px] xl:max-w-[1080px] 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Site-Wide Signature Serif & TextShimmer matching About Me */}
        <div className="text-center space-y-1 sm:space-y-1.5 mb-5 sm:mb-6 md:mb-6 lg:mb-7 2xl:mb-12 goal-header-box">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1, margin: "100px 0px 100px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            {/* Main Section Heading: OUR GOAL with TextShimmer (Exact match to ABOUT ME) */}
            <TextShimmer
              as="h2"
              duration={3.5}
              className="font-serif text-3xl sm:text-4xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl font-bold tracking-widest uppercase text-center"
              style={{
                "--base-color": "#4f3129",
                "--base-gradient-color": "#deb18a",
              }}
            >
              OUR GOAL
            </TextShimmer>

            {/* Ornamental Divider Rule (Exact match to ABOUT ME) */}
            <div className="w-16 2xl:w-16 3xl:w-20 h-[1.5px] bg-[#4f3129]/40 mx-auto my-1 sm:my-1.5" />

            {/* Sub-headline matching typography & dark rich serif color */}
            <p className="font-serif text-xs sm:text-sm lg:text-sm 2xl:text-base text-[#4a312a] tracking-widest uppercase font-semibold">
              WE GUIDE YOU TO TRANSFORM YOUR LIFE.
            </p>
          </motion.div>
        </div>

        {/* 6 Goal Cards Grid - Slightly Narrower Width & Proportional Compact Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.01 }}
          className="grid grid-cols-1 md:grid-cols-2 goals-responsive-grid gap-4 sm:gap-4.5 md:gap-5 lg:gap-5 2xl:gap-7"
        >
          {goals.map((goal) => {
            const Icon = goal.icon;
            return (
              <motion.div
                key={goal.id}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  scale: 1.012,
                  boxShadow: "0 18px 32px -8px rgba(42, 36, 32, 0.16), 0 8px 16px -4px rgba(42, 36, 32, 0.08), 0 0 0 1px rgba(140, 109, 70, 0.35)",
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                className="goal-card-item group relative bg-[#FAF6EE] rounded-2xl border border-[#E3D4BD] hover:border-[#C8A97E] shadow-[0_3px_16px_-2px_rgba(42,36,32,0.06),0_2px_6px_-1px_rgba(42,36,32,0.04)] transition-colors duration-300 flex flex-col sm:flex-row justify-between overflow-hidden cursor-default"
              >
                {/* Left Side (or Top on Mobile): Content Area with Balanced Padding */}
                <div className="goal-card-content flex-1 p-4 sm:p-4.5 md:p-4.5 lg:p-5 2xl:p-6 flex flex-col justify-between">
                  <div>
                    {/* Header Row: Number Badge + Bold Title + Line Art Icon */}
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      {/* Circled Number Badge (1-6) */}
                      <div className="w-5.5 h-5.5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-full border-[1.5px] border-[#8C6D46]/50 bg-[#F4EDE0]/60 flex items-center justify-center shrink-0 shadow-xs group-hover:border-[#8C6D46] group-hover:bg-[#F0E4D2] transition-colors">
                        <span className="font-serif text-[10.5px] sm:text-xs lg:text-xs font-bold text-[#7C5A32]">
                          {goal.badge}
                        </span>
                      </div>

                      {/* Bold All-Caps Title in Serif/Heading Style */}
                      <h3 className="goal-card-title font-serif text-[11.5px] sm:text-xs md:text-[12.5px] lg:text-sm 2xl:text-[15px] font-bold tracking-wider uppercase text-[#2A2420] flex-1 leading-snug">
                        {goal.title}
                      </h3>

                      {/* Small Line-Art Icon */}
                      <div className="p-1 sm:p-1.5 rounded-lg bg-[#8C6D46]/10 text-[#7C5A32] group-hover:text-[#2A2420] group-hover:bg-[#8C6D46]/25 transition-colors duration-200 shrink-0">
                        <Icon className="w-3.5 h-3.5 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" strokeWidth={2} />
                      </div>
                    </div>

                    {/* Thin Underline Rule Beneath Title */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-[#8C6D46]/45 via-[#8C6D46]/20 to-transparent mt-1.5 sm:mt-2 mb-2 sm:mb-2.5 group-hover:from-[#8C6D46]/70 transition-all duration-300" />

                    {/* Simple, Accurate & Concise Description */}
                    <p className="goal-card-desc font-sans text-[11.5px] sm:text-xs lg:text-[12.5px] 2xl:text-[14px] leading-relaxed text-[#3D332D] font-normal">
                      {goal.desc}
                    </p>
                  </div>
                </div>

                {/* Right Side (or Bottom on Mobile): Photo-Realistic Image filling the card edge */}
                <div className="goal-card-image-box w-full sm:w-[38%] md:w-[38%] lg:w-[38%] 2xl:w-[42%] shrink-0 h-40 sm:h-auto min-h-[125px] sm:min-h-[135px] lg:min-h-[145px] 2xl:min-h-[190px] overflow-hidden relative border-t sm:border-t-0 sm:border-l border-[#8C6D46]/15">
                  <img
                    src={goal.image}
                    alt={goal.alt}
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle warm lighting vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none group-hover:opacity-60 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
