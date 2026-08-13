import React from 'react'
import { motion } from 'framer-motion'
import { Award, BookOpen, Star, Compass } from 'lucide-react'

function About() {
  const values = [
    {
      icon: <Award className="h-6 w-6 text-gold-400" />,
      title: 'Vedic Lineage',
      desc: 'Trained under traditional Gurukul systems, blending ancient shlokas with modern practical applications.'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-gold-400" />,
      title: '20+ Years Experience',
      desc: 'Guiding thousands of clients worldwide with highly accurate astrological mapping and remedial suggestions.'
    },
    {
      icon: <Star className="h-6 w-6 text-gold-400" />,
      title: 'Ethical Readings',
      desc: 'No fear-mongering. Focus is strictly on constructive pathfinding, empowerment, and spiritual clarity.'
    }
  ]

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-serif text-gold-400 tracking-widest text-sm uppercase">The Soul Behind The Science</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-wide">
            Astrologer Madhuri Gupta
          </h1>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual Showcase - Celestial Portrait Placeholder */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Ambient Circle Glow */}
            <div className="absolute w-72 h-72 rounded-full nebula-gold animate-star-glow" />
            
            {/* Visual Frame */}
            <div className="relative glass-panel p-4 rounded-full border-gold-500/35 flex justify-center items-center w-80 h-80">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-cosmic-800 to-cosmic-950 flex flex-col justify-center items-center border border-gold-500/20 text-center p-6">
                <Compass className="h-16 w-16 text-gold-400 animate-spin" style={{ animationDuration: '40s' }} />
                <h3 className="font-serif text-lg font-bold text-gold-300 mt-4 tracking-widest">JYOTISH SHASTRA</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Cosmic Mapping & Remedies</p>
              </div>
            </div>
          </div>

          {/* Text Info */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-white font-semibold tracking-wide">
              An Astrological Guide to Clarity & Purpose
            </h2>
            <p className="text-slate-300 font-light leading-relaxed">
              Astrologer Madhuri Gupta is a highly revered Vedic Astrologer, Vaastu consultant, and spiritual guide. For over two decades, she has helped individuals understand the energetic blueprints of their lives to overcome obstacles and realize their highest potential.
            </p>
            <p className="text-slate-300 font-light leading-relaxed">
              Her readings integrate planetary transits, Dashas (planetary periods), and Ashtakvarga calculations with practical remedies. Whether navigating career confusion, marital delays, health challenges, or business blocks, Madhuri provides compassionate, logical, and transformative insights.
            </p>
            <blockquote className="border-l-2 border-gold-400 pl-4 py-1 text-gold-200/90 font-serif italic text-lg bg-gold-500/5 rounded-r-xl">
              "Astrology is not about predicting a fixed future; it is about preparing you to ride the cosmic waves with grace and wisdom."
            </blockquote>
          </div>
        </div>

        {/* Our Approach (Values) */}
        <div className="mt-24 space-y-12">
          <h3 className="font-serif text-2xl sm:text-3xl text-center text-white font-semibold">Our Foundational Pillars</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-panel p-8 rounded-3xl space-y-4"
              >
                <div className="p-3 w-fit rounded-xl bg-gold-500/5 border border-gold-500/20">
                  {val.icon}
                </div>
                <h4 className="font-serif text-lg font-semibold text-white tracking-wide">{val.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default About
