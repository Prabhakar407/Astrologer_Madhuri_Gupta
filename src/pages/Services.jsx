import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Heart, Briefcase, Star, CheckCircle, Clock } from 'lucide-react'

function Services() {
  const serviceList = [
    {
      id: 'birth-chart',
      icon: <Compass className="h-8 w-8 text-gold-400" />,
      title: 'Detailed Birth Chart Reading',
      tagline: 'Full Vedic Kundali & Dasha analysis',
      duration: '60 Mins Session',
      price: '₹2,500 / $45',
      features: [
        'Detailed analysis of all 12 houses',
        '10-year Mahadasha & Antardasha timeline',
        'Specific gemstone & mantra remedies',
        'PDF Copy of your birth chart',
        'Audio/Video session recording'
      ],
      color: 'from-purple-500/10 to-cosmic-950'
    },
    {
      id: 'compatibility',
      icon: <Heart className="h-8 w-8 text-gold-400" />,
      title: 'Relationship Compatibility',
      tagline: 'Synastry and Kundali Milan',
      duration: '45 Mins Session',
      price: '₹3,000 / $55',
      features: [
        'Ashta Koota matchmaking (36 Gunas)',
        'Manglik Dosha analysis and remedies',
        'Emotional & intellectual compatibility scale',
        'Future relationship transit predictions',
        'Session recording included'
      ],
      color: 'from-pink-500/10 to-cosmic-950'
    },
    {
      id: 'career-wealth',
      icon: <Briefcase className="h-8 w-8 text-gold-400" />,
      title: 'Career & Wealth Guidance',
      tagline: '10th House alignment & prosperity',
      duration: '45 Mins Session',
      price: '₹2,100 / $39',
      features: [
        'Job vs. business suitability analysis',
        'Auspicious times for financial investments',
        'Remedies for career blocks (Shani/Rahu)',
        'Timing of promotions or job switches',
        'Session recording included'
      ],
      color: 'from-blue-500/10 to-cosmic-950'
    },
    {
      id: 'yearly-transit',
      icon: <Star className="h-8 w-8 text-gold-400" />,
      title: 'Yearly Solar Return (Varshphal)',
      tagline: 'Month-by-month transit guide',
      duration: '45 Mins Session',
      price: '₹2,500 / $45',
      features: [
        'Month-by-month layout of key events',
        'Sade Sati & Jupiter transit analysis',
        'Health & wellness checkpoints',
        'Personalized calendar for the year',
        'Session recording included'
      ],
      color: 'from-yellow-500/10 to-cosmic-950'
    }
  ]

  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="font-serif text-gold-400 tracking-widest text-sm uppercase">Sacred Sciences</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-wide">
            Astrological Services
          </h1>
          <div className="w-16 h-[2px] bg-gold-400 mx-auto" />
          <p className="text-slate-400 font-light max-w-2xl mx-auto">
            Choose a reading session to unlock the map of your planetary paths and receive practical remedies for growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-gold-500/10 bg-gradient-to-br ${srv.color} relative overflow-hidden`}
            >
              <div className="space-y-6">
                
                {/* Header info */}
                <div className="flex items-start justify-between">
                  <div className="p-3.5 rounded-2xl bg-gold-500/5 border border-gold-500/20">
                    {srv.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-semibold text-white font-serif">{srv.price}</span>
                    <span className="inline-flex items-center text-xs text-gold-400 gap-1 bg-gold-500/5 px-2 py-0.5 rounded-full border border-gold-500/10 mt-1">
                      <Clock className="h-3 w-3" /> {srv.duration}
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-bold text-white tracking-wide">{srv.title}</h2>
                  <p className="text-sm text-gold-300/80 font-light mt-1 font-serif tracking-wide">{srv.tagline}</p>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-gold-500/10 w-full" />

                {/* Features List */}
                <ul className="space-y-3">
                  {srv.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start space-x-3 text-sm text-slate-300">
                      <CheckCircle className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Link
                  to={`/booking?service=${srv.id}`}
                  className="block w-full text-center py-3.5 rounded-2xl border border-gold-500/40 text-gold-300 hover:text-cosmic-950 bg-gold-500/5 hover:bg-gradient-to-r hover:from-gold-600 hover:to-gold-400 hover:border-transparent font-semibold uppercase tracking-wider text-xs transition-all duration-300"
                >
                  Book Reading Session
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Services
