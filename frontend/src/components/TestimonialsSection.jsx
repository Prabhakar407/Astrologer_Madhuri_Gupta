import React from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Send, ThumbsUp, Bookmark } from "lucide-react";
import { TextShimmer } from "./motion-primitives/text-shimmer";

/* ------------------------------------------------------------------ */
/*  Styles, Keyframes & Fonts                                          */
/* ------------------------------------------------------------------ */

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700&family=Caveat:wght@600;700&display=swap');
    
    .font-display { font-family: 'Fraunces', Georgia, serif; }
    .font-body { font-family: 'Inter', system-ui, sans-serif; }
    .font-script { font-family: 'Caveat', cursive; }

    /* Floating in space continuous weightless animations (Active for all devices) */
    @keyframes float-space-1 {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-7px) rotate(0.35deg); }
    }
    @keyframes float-space-2 {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-5px) rotate(-0.35deg); }
    }
    @keyframes float-space-3 {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-8px) rotate(0.2deg); }
    }
    @keyframes float-space-4 {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-6px) rotate(-0.4deg); }
    }

    .float-card-1 { animation: float-space-1 5.4s ease-in-out infinite; }
    .float-card-2 { animation: float-space-2 6.1s ease-in-out infinite 0.4s; }
    .float-card-3 { animation: float-space-3 7.0s ease-in-out infinite 0.8s; } /* Hero Center */
    .float-card-4 { animation: float-space-4 5.8s ease-in-out infinite 1.2s; }
    .float-card-5 { animation: float-space-1 6.5s ease-in-out infinite 1.6s; }
    .float-card-6 { animation: float-space-2 5.7s ease-in-out infinite 2.0s; }
    .float-card-7 { animation: float-space-3 6.6s ease-in-out infinite 0.5s; }
    .float-card-8 { animation: float-space-4 5.2s ease-in-out infinite 1.4s; }
    .float-card-9 { animation: float-space-1 6.0s ease-in-out infinite 2.2s; }

    /* Smooth pause on hover */
    .float-card-1:hover, .float-card-2:hover, .float-card-3:hover,
    .float-card-4:hover, .float-card-5:hover, .float-card-6:hover,
    .float-card-7:hover, .float-card-8:hover, .float-card-9:hover {
      animation-play-state: paused;
    }

    /* Floating card spatial depth shadow with ethereal ambient glow (Active for all devices) */
    .floating-card-shadow {
      box-shadow:
        0 14px 34px -8px rgba(51, 41, 29, 0.12),
        0 6px 16px -4px rgba(181, 138, 77, 0.10),
        0 0 0 1px rgba(255, 255, 255, 0.85) inset,
        0 22px 45px -16px rgba(181, 138, 77, 0.14);
      transition: box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .floating-card-shadow:hover {
      box-shadow:
        0 22px 46px -8px rgba(51, 41, 29, 0.18),
        0 10px 24px -4px rgba(181, 138, 77, 0.16),
        0 0 0 1px rgba(255, 255, 255, 0.95) inset,
        0 30px 55px -18px rgba(181, 138, 77, 0.24);
      transform: translateY(-4px) scale(1.01);
    }

    @media (prefers-reduced-motion: reduce) {
      .float-card-1, .float-card-2, .float-card-3, .float-card-4,
      .float-card-5, .float-card-6, .float-card-7, .float-card-8, .float-card-9 {
        animation: none !important;
      }
    }

    /* Standard Desktop & 2K Grid (1024px+) */
    @media (min-width: 1024px) {
      .testimonial-collage-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: auto auto auto;
        gap: 0.95rem;
        align-items: stretch;
      }
      .cell-victoria { grid-area: 1 / 1 / 2 / 5; }
      .cell-fanny { grid-area: 1 / 5 / 3 / 9; }
      .cell-client { grid-area: 1 / 9 / 2 / 13; }
      .cell-dmitri { grid-area: 2 / 1 / 3 / 5; }
      .cell-nelly { grid-area: 2 / 9 / 3 / 13; }
      .cell-topnotch { grid-area: 3 / 1 / 4 / 4; }
      .cell-catherine { grid-area: 3 / 4 / 4 / 8; }
      .cell-recommended { grid-area: 3 / 8 / 4 / 10; }
      .cell-jane { grid-area: 3 / 10 / 4 / 13; }
    }

    /* Tablet / iPad (768px - 1023px) — Clean 2-column layout (Unchanged) */
    @media (min-width: 768px) and (max-width: 1023px) {
      .testimonial-collage-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
        align-items: stretch;
      }
      .cell-fanny { grid-column: 1 / -1; }
      .cell-victoria { grid-column: 1; }
      .cell-dmitri { grid-column: 2; }
      .cell-client { grid-column: 1; }
      .cell-nelly { grid-column: 2; }
      .cell-catherine { grid-column: 1 / -1; }
      .cell-topnotch { grid-column: 1; }
      .cell-recommended { grid-column: 2; }
      .cell-jane { grid-column: 1 / -1; }
    }

    /* Mobile (< 768px) — Clean 3-card stack (Unchanged) */
    @media (max-width: 767px) {
      .testimonial-collage-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        width: 100%;
      }
    }

    /* ----------------------------------------------------------------- */
    /* LAPTOP SCREENS ONLY (1024px to 1535px)                           */
    /* Height adjusted strictly under screen size (<768px), fully visible */
    /* ----------------------------------------------------------------- */
    @media (min-width: 1024px) and (max-width: 1535px) {
      #testimonials {
        padding-top: 1.15rem !important;
        padding-bottom: 1.65rem !important;
      }
      .testimonial-header-box {
        margin-bottom: 0.85rem !important;
      }
      .testimonial-collage-grid {
        column-gap: 0.85rem !important;
        row-gap: 0.65rem !important;
      }
      .laptop-hero-box {
        min-height: 228px !important;
        padding-top: 2.85rem !important;
        padding-bottom: 1rem !important;
        padding-left: 1.25rem !important;
        padding-right: 1.25rem !important;
      }
      .laptop-hero-avatar {
        width: 4.25rem !important;
        height: 4.25rem !important;
      }
      .laptop-hero-quote {
        margin-top: 0.4rem !important;
        margin-bottom: 0.4rem !important;
      }
      .laptop-card-pad-sm {
        padding-top: 0.8rem !important;
        padding-bottom: 0.8rem !important;
      }
      .laptop-cath-photo {
        height: 7.5rem !important;
        width: 5rem !important;
      }
      .laptop-rec-photo {
        height: 5.6rem !important;
      }
      .laptop-jane-container {
        padding-bottom: 2.1rem !important;
      }
    }
  `}</style>
);

const BG = "#F3E7D5";
const CREAM = "#FFFFFF";
const INK = "#33291D";
const MUTED = "#7C7059";
const GOLD = "#E5A93C";
const GOLD_DIM = "#E4D5B4";
const DARK_CHIP = "#403626";
const TAN_CHIP = "#C5B4A5";

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Stars({ filled = 5, size = 12, color = GOLD, dim = GOLD_DIM }) {
  return (
    <div className="flex items-center gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < filled ? color : dim}
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6L10 14.9 4.6 17.8l1.3-6L1.3 7.7l6.1-.6L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function BigQuote({ className = "", color = INK, flip = false }) {
  return (
    <span
      className={`font-display leading-none select-none ${className}`}
      style={{ color, display: "inline-block", transform: flip ? "rotate(180deg)" : "none" }}
    >
      &rdquo;
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 1 — Pooja Sharma (Shown on Mobile & Desktop)                  */
/* ------------------------------------------------------------------ */

function VictoriaCard() {
  return (
    <div className="float-card-1 h-full">
      <div
        className="relative rounded-[1.75rem] floating-card-shadow laptop-card-pad-sm py-4 sm:py-4.5 pl-14 sm:pl-16 pr-5 h-full flex flex-col justify-center border border-white/80"
        style={{ backgroundColor: CREAM }}
      >
        <img
          src="/testimonials/pooja.jpg"
          onError={(e) => { e.currentTarget.src = "/testimonial_ananya.webp"; }}
          alt="Pooja Sharma"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover absolute -left-5 sm:-left-6 top-1/2 -translate-y-1/2"
          style={{ boxShadow: `0 0 0 5px ${BG}` }}
        />
        <BigQuote className="text-4xl sm:text-5xl absolute top-2.5 right-5 text-[#775347]/90" />
        <h3 className="font-display text-base sm:text-lg font-bold" style={{ color: INK }}>
          Pooja Sharma
        </h3>
        <div className="mt-0.5">
          <Stars filled={5} size={12} color={GOLD} />
        </div>
        <p className="font-body text-[11.5px] sm:text-[12px] leading-relaxed mt-1.5" style={{ color: MUTED }}>
          &ldquo;Madhuri ji&apos;s deep insight during our Kundli matching resolved all our anxieties. Her practical remedies brought immense harmony and confidence to both our families.&rdquo;
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 2 — Vikram Malhotra (Hidden on Mobile)                        */
/* ------------------------------------------------------------------ */

function DmitriCard() {
  return (
    <div className="float-card-2 h-full">
      <div
        className="relative rounded-[1.75rem] floating-card-shadow laptop-card-pad-sm py-4 px-5 pr-14 sm:pr-16 h-full flex flex-col justify-between border border-white/80"
        style={{ backgroundColor: CREAM }}
      >
        <img
          src="/testimonials/vikram.jpg"
          onError={(e) => { e.currentTarget.src = "/testimonial_vikram.webp"; }}
          alt="Vikram Malhotra"
          className="w-14 h-14 sm:w-15 sm:h-15 rounded-full object-cover absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-6"
          style={{ boxShadow: `0 0 0 5px ${BG}` }}
        />
        <p className="font-body text-[12px] sm:text-[12.5px] leading-relaxed font-medium" style={{ color: INK }}>
          &ldquo;Her planetary cycle and Dasha analysis accurately pinpointed the exact month for my business expansion. Truly life-changing guidance.&rdquo;
        </p>
        <div className="flex flex-wrap items-end justify-between gap-2 mt-2.5">
          <div>
            <p className="font-body text-[11px] font-bold tracking-wider uppercase" style={{ color: INK }}>
              VIKRAM MALHOTRA
            </p>
            <p className="font-body text-[10px]" style={{ color: MUTED }}>
              @vikram.malhotra
            </p>
          </div>
          <div className="pr-1">
            <Stars filled={5} size={11} color={GOLD} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 3 — Excellent Guidance! (Dr. Meenakshi Iyer)                  */
/* ------------------------------------------------------------------ */

function ExcellentJobCard() {
  return (
    <div className="float-card-3 relative h-full flex flex-col justify-center pt-8 sm:pt-9 pb-1">
      {/* Centered Top Avatar */}
      <div className="flex justify-center absolute top-0 left-0 right-0 z-10">
        <img
          src="/testimonials/meenakshi.jpg"
          onError={(e) => { e.currentTarget.src = "/testimonial_ananya.webp"; }}
          alt="Dr. Meenakshi Iyer"
          className="w-18 h-18 sm:w-20 sm:h-20 laptop-hero-avatar rounded-full object-cover"
          style={{ boxShadow: `0 0 0 5px ${BG}` }}
        />
      </div>
      <div
        className="bg-white rounded-[2rem] floating-card-shadow laptop-hero-box pt-12 sm:pt-13 pb-4 px-5 sm:px-6 text-center h-full flex flex-col justify-between items-center border border-white/80 min-h-[240px] sm:min-h-[255px]"
      >
        <div className="space-y-1 mt-0.5">
          <h3 className="font-display text-lg sm:text-xl font-bold tracking-wide uppercase" style={{ color: INK }}>
            EXCELLENT GUIDANCE!
          </h3>
          <div className="flex justify-center mt-1">
            <Stars filled={5} size={12} color="#A39587" dim="#D5C7B8" />
          </div>
        </div>
        <p
          className="font-body text-[11.5px] sm:text-[12px] laptop-hero-quote leading-relaxed my-2 max-w-[28ch] mx-auto"
          style={{ color: MUTED }}
        >
          &ldquo;Astrologer Madhuri Gupta&apos;s profound Vedic wisdom and compassionate counseling helped me navigate a critical life crossroads with absolute peace and certainty.&rdquo;
        </p>
        <p className="font-script text-3xl sm:text-3xl select-none" style={{ color: INK }}>
          Dr. Meenakshi Iyer
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 4 — Client Review (Rohit Agarwal)                             */
/* ------------------------------------------------------------------ */

function ClientReviewCard() {
  return (
    <div className="float-card-4 h-full">
      <div className="rounded-[1.75rem] overflow-hidden bg-white floating-card-shadow h-full flex flex-col justify-between border border-white/80">
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{ backgroundColor: TAN_CHIP }}
        >
          <h3 className="font-display text-sm sm:text-base font-bold" style={{ color: INK }}>
            Rohit Agarwal
          </h3>
          <span className="font-body text-[11px] font-medium" style={{ color: "#4A3F2C" }}>
            @rohitagarwal_up
          </span>
        </div>
        <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
          <p className="font-body text-[12px] leading-relaxed" style={{ color: INK }}>
            &ldquo;The Vastu space corrections suggested for our new residence improved our family&apos;s health and financial stability within months.&rdquo;
          </p>
          <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-black/5">
            <span
              className="font-body text-[11px] font-bold tracking-wider hover:text-[#b8922b] transition-colors cursor-pointer"
              style={{ color: INK }}
            >
              VERIFIED REVIEW &nbsp;&#8594;
            </span>
            <div className="flex items-center gap-3" style={{ color: MUTED }}>
              <Heart size={15} className="hover:text-red-500 transition-colors cursor-pointer" />
              <MessageCircle size={15} className="hover:text-[#33291D] transition-colors cursor-pointer" />
              <Send size={15} className="hover:text-[#33291D] transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 5 — Neha Agnihotri (Hidden on Mobile)                         */
/* ------------------------------------------------------------------ */

function NellyCard() {
  return (
    <div className="float-card-5 h-full">
      <div
        className="relative rounded-full floating-card-shadow laptop-card-pad-sm py-3.5 px-4 pl-18 sm:pl-20 h-full flex flex-col justify-center border border-white/80"
        style={{ backgroundColor: CREAM }}
      >
        {/* Left Avatar */}
        <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2">
          <img
            src="/testimonials/ananya.jpg"
            onError={(e) => { e.currentTarget.src = "/testimonial_ananya.webp"; }}
            alt="Neha Agnihotri"
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full object-cover"
          />
        </div>

        {/* Thumbs-up Chip at Top-Right */}
        <div
          className="absolute -top-2 right-7 rounded-full p-1.5 text-white shadow-md flex items-center justify-center border-2 border-[#F3E7D5]"
          style={{ backgroundColor: "#8C7A6B" }}
          title="Recommended"
        >
          <ThumbsUp size={13} strokeWidth={2.5} />
        </div>

        <h3 className="font-display text-xs sm:text-sm font-bold tracking-wider uppercase" style={{ color: INK }}>
          NEHA AGNIHOTRI
        </h3>
        <p className="font-body text-[11px] leading-snug mt-0.5" style={{ color: MUTED }}>
          Very precise Janam Kundli predictions without unnecessary superstitions. Her remedies are simple and highly effective.
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <Stars filled={5} size={11} color={GOLD} />
          <span className="font-body text-[10.5px] font-semibold" style={{ color: MUTED }}>
            (5.0)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 6 — Truly Accurate! (Rajesh K. Verma)                         */
/* ------------------------------------------------------------------ */

function TopNotchCard() {
  return (
    <div className="float-card-6 h-full">
      <div className="rounded-[1.75rem] bg-white floating-card-shadow p-4 sm:p-4.5 h-full flex flex-col justify-between border border-white/80">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-center" style={{ color: INK }}>
            Truly Accurate!
          </h3>
          <p
            className="font-body text-[11.5px] leading-relaxed text-center mt-1.5"
            style={{ color: MUTED }}
          >
            Her birth chart reading explained long-standing career blocks and provided the exact timeline when things would turn around.
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Stars filled={5} size={11} color="#A39587" dim="#D5C7B8" />
            <span className="font-body text-[10.5px] font-semibold" style={{ color: MUTED }}>
              (5.0)
            </span>
          </div>
        </div>
        <div
          className="flex items-center gap-2.5 mt-3.5 pt-2.5 border-t"
          style={{ borderColor: "rgba(0,0,0,0.06)" }}
        >
          <img
            src="/testimonials/rajesh.jpg"
            onError={(e) => { e.currentTarget.src = "/testimonial_rajesh.webp"; }}
            alt="Rajesh K. Verma"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-body text-[11.5px] font-bold" style={{ color: INK }}>
              Rajesh K. Verma
            </p>
            <p className="font-body text-[10px]" style={{ color: MUTED }}>
              @rajeshverma_in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 7 — Priya Chawla (Shown on Mobile & Desktop)                  */
/* ------------------------------------------------------------------ */

function CatherineCard() {
  return (
    <div className="float-card-7 flex items-center h-full relative">
      {/* Arched Photo on Left */}
      <div
        className="w-20 sm:w-24 laptop-cath-photo h-32 sm:h-36 rounded-[1.5rem] overflow-hidden -mr-5 z-10 shrink-0 border-2 border-[#E7DAC8] bg-[#FAF5EB]"
        style={{ boxShadow: `0 0 0 4px ${BG}` }}
      >
        <img
          src="/testimonials/priya.jpg"
          onError={(e) => { e.currentTarget.src = "/testimonial_ananya.webp"; }}
          alt="Priya Chawla"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Speech Bubble Card */}
      <div
        className="relative flex-1 bg-white rounded-[1.5rem] floating-card-shadow laptop-card-pad-sm pl-8 sm:pl-9 pr-4 py-3.5 sm:py-4 border border-white/80 h-full flex flex-col justify-between"
      >
        <div>
          <h4 className="font-display text-xs sm:text-sm font-bold tracking-widest uppercase" style={{ color: INK }}>
            TESTIMONIAL
          </h4>
          <p className="font-body text-[11.5px] leading-relaxed mt-1" style={{ color: INK }}>
            &ldquo;Her gemstone recommendation and personalized mantra remedies helped resolve long-standing hurdles in my professional life.&rdquo;
          </p>
          <p className="font-body text-[10.5px] font-medium mt-1" style={{ color: MUTED }}>
            @priyachawla
          </p>
        </div>

        {/* Speech Bubble Tail pointing down-left */}
        <div
          className="absolute -bottom-2.5 left-9 w-0 h-0 border-t-[10px] border-t-white border-r-[10px] border-r-transparent border-l-0 drop-shadow-sm pointer-events-none"
        />

        {/* Floating Dark Stars Chip on Bottom-Right */}
        <div
          className="absolute -bottom-2.5 right-4 rounded-full px-2.5 py-0.5 flex items-center shadow-md"
          style={{ backgroundColor: DARK_CHIP }}
        >
          <Stars filled={5} size={9} color="#E4D5B4" dim="#8A7E68" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 8 — Recommended! (Sunita Rawat)                               */
/* ------------------------------------------------------------------ */

function RecommendedCard() {
  return (
    <div className="float-card-8 h-full">
      <div className="relative rounded-[1.5rem] overflow-hidden h-full floating-card-shadow bg-white flex flex-col justify-between border border-white/80">
        {/* Top Photo */}
        <div className="relative w-full h-24 sm:h-28 laptop-rec-photo overflow-hidden">
          <img
            src="/testimonials/sunita.jpg"
            onError={(e) => { e.currentTarget.src = "/testimonial_ananya.webp"; }}
            alt="Sunita Rawat"
            className="w-full h-full object-cover object-top"
          />
          {/* Bookmark Ribbon */}
          <div
            className="absolute top-0 left-3 px-1.5 py-2 rounded-b-md shadow-md flex items-center justify-center"
            style={{ backgroundColor: DARK_CHIP }}
          >
            <Bookmark size={11} color="#fff" fill="#fff" />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="bg-white px-2.5 py-2 text-center flex flex-col items-center justify-center flex-1">
          <p className="font-display text-[11px] font-bold tracking-wider uppercase" style={{ color: INK }}>
            RECOMMENDED!
          </p>
          <div className="mt-0.5">
            <Stars filled={5} size={10} color={GOLD} />
          </div>
          <p className="font-body text-[9.5px] leading-snug mt-1" style={{ color: MUTED }}>
            &ldquo;Remarkably compassionate guidance that brought peace to our family.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card 9 — Kavita Desai (Hidden on Mobile)                           */
/* ------------------------------------------------------------------ */

function JaneCard() {
  return (
    <div className="float-card-9 relative pb-9 sm:pb-11 laptop-jane-container h-full flex flex-col justify-center">
      {/* Speech Bubble */}
      <div
        className="relative rounded-[1.5rem] bg-white floating-card-shadow p-3.5 sm:p-4 border border-white/80"
      >
        <p className="font-body text-[11.5px] leading-relaxed font-medium" style={{ color: "#3A3120" }}>
          &ldquo;Her precise muhurta timing for our property registration saved us from unforeseen legal complications.&rdquo;
        </p>
        <div className="flex items-end justify-between mt-2">
          <BigQuote className="text-3xl text-[#775347]/90 leading-none" flip />
          <div className="text-right">
            <p className="font-script text-xl leading-none select-none" style={{ color: "#3A3120" }}>
              Kavita
            </p>
            <p className="font-body text-[10px] mt-0.5" style={{ color: "#5A5038" }}>
              @kavitadesai
            </p>
          </div>
        </div>

        {/* Speech Bubble Tail pointing down-right */}
        <div
          className="absolute -bottom-2.5 right-7 w-0 h-0 border-t-[10px] border-t-white border-l-[10px] border-l-transparent border-r-0 drop-shadow-sm pointer-events-none"
        />
      </div>

      {/* Kavita's Avatar below with Diamond Motif */}
      <div className="absolute bottom-0 right-3 flex flex-col items-center">
        {/* Subtle sparkle diamond pointer connecting to tail */}
        <div className="w-2.5 h-2.5 rotate-45 bg-[#E7DAC8] -mb-1 z-0 shadow-sm" />
        <img
          src="/testimonials/kavita.jpg"
          onError={(e) => { e.currentTarget.src = "/testimonial_ananya.webp"; }}
          alt="Kavita Desai"
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full object-cover relative z-10"
          style={{ boxShadow: `0 0 0 4px ${BG}` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animation Variants & Cell Wrapper                                  */
/* ------------------------------------------------------------------ */

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Cell({ children, className = "" }) {
  return (
    <motion.div
      variants={cellVariants}
      className={`w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section Component                                             */
/* ------------------------------------------------------------------ */

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative z-10 scroll-mt-20 sm:scroll-mt-24 pt-4 sm:pt-6 pb-8 sm:pb-10 bg-cover bg-center overflow-hidden border-t border-[#deb18a]/20"
      style={{
        backgroundColor: BG,
        backgroundImage: "url('/marble-bg.webp')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />

      {/* Floating Celestial Star Dust */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <span className="absolute top-[14%] left-[8%] text-[#B58A4D]/25 text-sm select-none animate-pulse">✦</span>
        <span className="absolute top-[26%] right-[7%] text-[#B58A4D]/20 text-xs select-none animate-pulse" style={{ animationDelay: '1.2s' }}>✧</span>
        <span className="absolute top-[68%] left-[5%] text-[#B58A4D]/20 text-xs select-none animate-pulse" style={{ animationDelay: '2.4s' }}>✧</span>
        <span className="absolute top-[80%] right-[11%] text-[#B58A4D]/25 text-sm select-none animate-pulse" style={{ animationDelay: '0.8s' }}>✦</span>
        <span className="absolute top-[46%] right-[49%] text-[#B58A4D]/15 text-[10px] select-none animate-pulse" style={{ animationDelay: '1.8s' }}>·</span>
        <span className="absolute top-[76%] left-[44%] text-[#B58A4D]/20 text-xs select-none animate-pulse" style={{ animationDelay: '3.1s' }}>✦</span>
      </div>

      {/* Celestial Divider at Top */}
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

      <FontStyles />

      <div className="relative z-10 max-w-7xl 2xl:max-w-[1440px] 3xl:max-w-[1680px] mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-1 mb-3.5 sm:mb-4.5 testimonial-header-box"
        >
          <TextShimmer
            as="h2"
            duration={3.5}
            className="font-serif text-2xl sm:text-3xl font-bold tracking-widest uppercase text-center"
            style={{
              "--base-color": "#4f3129",
              "--base-gradient-color": "#deb18a",
            }}
          >
            TESTIMONIALS
          </TextShimmer>
          <div className="w-14 h-[1.5px] bg-[#4f3129]/40 mx-auto" />
          <p className="font-sans text-[11px] sm:text-xs text-[#7C7059] tracking-widest uppercase font-semibold">
            Words of Trust & Guidance
          </p>
        </motion.div>

        {/* Responsive Collage Grid with Sequential Staggered Entrance Animation */}
        <motion.div 
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="testimonial-collage-grid"
        >
          {/* Card 1: Pooja Sharma (Mobile Card 1) */}
          <Cell className="cell-victoria">
            <VictoriaCard />
          </Cell>

          {/* Card 3: Dr. Meenakshi Iyer Hero Center (Mobile Card 2) */}
          <Cell className="cell-fanny">
            <ExcellentJobCard />
          </Cell>

          {/* Card 4: Client Review (Desktop/Tablet only) */}
          <Cell className="cell-client hidden md:block">
            <ClientReviewCard />
          </Cell>

          {/* Card 2: Vikram Malhotra (Desktop/Tablet only) */}
          <Cell className="cell-dmitri hidden md:block">
            <DmitriCard />
          </Cell>

          {/* Card 5: Neha Agnihotri (Desktop/Tablet only) */}
          <Cell className="cell-nelly hidden md:block">
            <NellyCard />
          </Cell>

          {/* Card 6: Truly Accurate! (Desktop/Tablet only) */}
          <Cell className="cell-topnotch hidden md:block">
            <TopNotchCard />
          </Cell>

          {/* Card 7: Priya Chawla (Mobile Card 3) */}
          <Cell className="cell-catherine">
            <CatherineCard />
          </Cell>

          {/* Card 8: Recommended! (Desktop/Tablet only) */}
          <Cell className="cell-recommended hidden md:block">
            <RecommendedCard />
          </Cell>

          {/* Card 9: Kavita Desai (Desktop/Tablet only) */}
          <Cell className="cell-jane hidden md:block">
            <JaneCard />
          </Cell>
        </motion.div>
      </div>
    </section>
  );
}


