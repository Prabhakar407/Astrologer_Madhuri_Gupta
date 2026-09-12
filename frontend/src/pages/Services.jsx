import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Clock, 
  Sparkles, 
  FileText, 
  Video, 
  Shield, 
  Heart, 
  Briefcase, 
  Star,
  Tag, 
  ExternalLink, 
  ChevronRight,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

export default function Services() {
  const serviceList = [
    {
      id: 'kundli-matching',
      title: 'Kundli Matching',
      type: 'Relationship Synastry',
      duration: '30 Mins',
      platform: 'Online Zoom',
      image: '/service_kundli_matching.webp',
      amenitiesLeft: [
        { label: '36-Guna compatibility report', icon: 'FileText' },
        { label: 'Manglik Dosha analysis', icon: 'Shield' },
        { label: 'Nadi & Bhakoot matching', icon: 'Sparkles' }
      ],
      amenitiesRight: [
        { label: 'Custom remedial actions PDF', icon: 'FileText' },
        { label: 'Video/Audio recording link', icon: 'Video' },
        { label: 'Follow-up Q&A support', icon: 'HelpCircle' }
      ],
      feeDetails: 'Comprehensive 36-guna analysis for marital harmony, longevity & mutual alignment',
      price: '₹2,100',
      durationText: '(30 Mins Session)',
      minSessions: 'Minimum 1 session'
    },
    {
      id: 'kundli-prediction',
      title: 'Kundli Prediction',
      type: 'Life & Transit Insights',
      duration: '30 Mins',
      platform: 'Online Zoom',
      image: '/service_kundli_prediction.webp',
      amenitiesLeft: [
        { label: 'Full birth chart analysis PDF', icon: 'FileText' },
        { label: 'Mahadasha timeline decoding', icon: 'Clock' },
        { label: 'Planetary transit insights', icon: 'Sparkles' }
      ],
      amenitiesRight: [
        { label: 'Gemstone recommendations', icon: 'Shield' },
        { label: 'Vedic mantra & charity remedies', icon: 'HelpCircle' },
        { label: 'Video/Audio recording link', icon: 'Video' }
      ],
      feeDetails: 'Complete life path analysis covering career, finances, health & planetary transits',
      price: '₹2,500',
      durationText: '(30 Mins Session)',
      minSessions: 'Minimum 1 session'
    },
    {
      id: 'vastu-consultation',
      title: 'Vastu Consultation',
      type: 'Spatial Harmonization',
      duration: '30 Mins',
      platform: 'Online / Onsite',
      image: '/service_vastu_consultation.webp',
      amenitiesLeft: [
        { label: 'Spatial layout assessment', icon: 'Compass' },
        { label: 'Elemental energy mapping', icon: 'Sparkles' },
        { label: 'Structural blockage remedies', icon: 'Shield' }
      ],
      amenitiesRight: [
        { label: 'Vastu correction report PDF', icon: 'FileText' },
        { label: 'Detailed follow-up consult', icon: 'Clock' },
        { label: 'Video/Audio recording link', icon: 'Video' }
      ],
      feeDetails: 'Harmonize living and workspace energy flows without requiring structural demolition',
      price: '₹4,500',
      durationText: '(30 Mins Session)',
      minSessions: 'Minimum 1 session'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      type: 'Destiny Numbers',
      duration: '30 Mins',
      platform: 'Online Zoom',
      image: '/service_numerology.webp',
      amenitiesLeft: [
        { label: 'Destiny & path calculation', icon: 'Star' },
        { label: 'Name vibration alignment', icon: 'Sparkles' },
        { label: 'Personal year predictions', icon: 'Clock' }
      ],
      amenitiesRight: [
        { label: 'Numerology summary sheet', icon: 'FileText' },
        { label: 'Name spelling correction', icon: 'Shield' },
        { label: 'Video/Audio recording link', icon: 'Video' }
      ],
      feeDetails: 'Name vibration, destiny number calculation & auspicious signature alignment',
      price: '₹2,100',
      durationText: '(30 Mins Session)',
      minSessions: 'Minimum 1 session'
    }
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Clock': return <Clock className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Video': return <Video className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'HelpCircle': return <HelpCircle className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Shield': return <Shield className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Heart': return <Heart className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Star': return <Star className="w-4 h-4 text-slate-600 shrink-0" />;
      case 'Compass': return <Compass className="w-4 h-4 text-slate-600 shrink-0" />;
      default: return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  useEffect(() => {
    document.title = "Astrology & Vastu Services in Agra | Sarsa Jyotish Sansthan";
  }, []);

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 2xl:pt-40 3xl:pt-48 4xl:pt-60 5xl:pt-80 pb-16 2xl:pb-24 min-h-screen bg-[#F3E7D5] bg-cover bg-center text-[#3a1906] font-sans selection:bg-[#3a1906] selection:text-[#F3E7D5] relative" style={{ backgroundImage: "url('/marble-bg.webp')" }}>
      <div className="absolute inset-0 bg-[#F3E7D5]/90 z-0 pointer-events-none" />
      <div className="w-full max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2100px] mx-auto px-4 sm:px-6 2xl:px-12 relative z-10">
        
        {/* Page Header with Semantic H1 */}
        <div className="text-center space-y-2 mb-10 2xl:mb-14 5xl:mb-20">
          <h1 className="font-serif text-3xl sm:text-4xl 2xl:text-5xl 5xl:text-6xl font-bold tracking-widest text-[#3a1906] uppercase">
            Vedic Astrology & Consultation Services
          </h1>
          <div className="w-16 2xl:w-24 5xl:w-32 h-[1.5px] bg-[#3a1906]/40 mx-auto" />
          <p className="font-sans text-xs sm:text-sm 2xl:text-base 5xl:text-xl text-[#8c6c51] uppercase tracking-[0.15em] font-semibold">
            Authentic Consultations & Remedial Guidance in Agra
          </p>
        </div>

        {/* Animated Stack of Cards */}
        <motion.div 
          className="space-y-8 2xl:space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {serviceList.map((srv) => (
            <motion.div 
              key={srv.id} 
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.015, borderColor: "#b8922b", boxShadow: "0 20px 45px -10px rgba(79, 49, 41, 0.16)" }}
              whileTap={{ scale: 0.99 }}
              className="bg-white/90 rounded-3xl border border-[#deb18a]/40 p-5 sm:p-6 2xl:p-7 flex flex-col lg:flex-row items-stretch gap-6 2xl:gap-8 transition-all duration-300 shadow-[0_4px_20px_rgba(79,49,41,0.08)] backdrop-blur-sm"
            >
              
              {/* Left Column: Professionally Photographed Image */}
              <div className="w-full lg:w-[280px] 2xl:w-[340px] 3xl:w-[380px] h-[210px] sm:h-[230px] lg:h-auto min-h-[210px] 2xl:min-h-[240px] relative overflow-hidden rounded-2xl shrink-0 group">
                <img 
                  src={srv.image} 
                  alt={`${srv.title} Consultation in Agra`} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Middle Column: Details Grid */}
              <div className="flex-1 flex flex-col justify-between py-1 w-full">
                
                <div>
                  {/* Title */}
                  <h2 className="font-serif text-2xl lg:text-2xl 2xl:text-3xl font-bold text-slate-900 tracking-wide mb-2.5">
                    {srv.title}
                  </h2>

                  {/* Badges & Indicators */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    {/* Service Type Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4f3129] text-white text-[11px] lg:text-xs uppercase font-bold tracking-wider rounded-full">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{srv.type}</span>
                    </span>

                    {/* Duration / Platform */}
                    <span className="text-xs lg:text-sm font-semibold text-slate-800 tracking-wide bg-[#4f3129]/10 px-2.5 py-1 rounded-md">
                      {srv.duration}  ·  {srv.platform}
                    </span>
                  </div>

                  {/* Amenities Grid (Service features) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 w-full">
                    
                    {/* Left Column */}
                    <div className="space-y-2">
                      {srv.amenitiesLeft.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs lg:text-sm 2xl:text-base text-slate-800">
                          {getIcon(item.icon)}
                          <span className="font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2">
                      {srv.amenitiesRight.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs lg:text-sm 2xl:text-base text-slate-800">
                          {getIcon(item.icon)}
                          <span className="font-medium">{item.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Footnote details - enlarged and darkened */}
                <div className="text-xs lg:text-sm 2xl:text-base text-slate-800 font-medium italic mt-4 border-t border-[#4f3129]/20 pt-2.5 min-h-[2.5rem] flex items-center">
                  {srv.feeDetails}
                </div>

              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] bg-[#4f3129]/20 hidden lg:block self-stretch mx-2" />

              {/* Right Column: Price & Action */}
              <div className="w-full lg:w-[220px] 2xl:w-[250px] flex flex-col justify-between items-center lg:items-end text-center lg:text-right py-1 shrink-0">
                
                {/* Minimum session limits */}
                <span className="text-xs lg:text-sm font-medium text-slate-600 font-serif italic mb-1">
                  {srv.minSessions}
                </span>

                {/* Price Details */}
                <div className="mb-4">
                  <div className="text-3xl lg:text-3xl 2xl:text-4xl font-serif font-bold text-slate-900">
                    {srv.price}
                  </div>
                  <div className="text-xs lg:text-sm text-slate-700 font-semibold tracking-wider uppercase mt-0.5">
                    {srv.durationText}
                  </div>
                </div>

                {/* Select Button redirects to booking wizard with selected service query param */}
                <Link 
                  to={`/booking?service=${srv.id}`}
                  className="w-full text-center py-2.5 2xl:py-3 bg-[#b8922b] hover:bg-[#a27e20] text-white font-semibold text-xs lg:text-sm uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer block"
                >
                  Select
                </Link>

                {/* 10% Off Banner - enlarged and darkened */}
                <div className="text-xs lg:text-xs 2xl:text-sm text-slate-800 font-medium leading-relaxed mt-3 flex items-start gap-1.5 text-left w-full border-t border-[#4f3129]/20 pt-2 bg-white/20">
                  <Tag className="w-3.5 h-3.5 text-[#b8922b] shrink-0 mt-0.5" />
                  <span>We offer 10% off when paid in full at the time of booking.</span>
                </div>

              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
