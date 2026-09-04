import React from 'react';
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
      duration: '45 Mins',
      platform: 'Online Zoom',
      image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=800&q=80',
      amenitiesLeft: [
        { label: '36-Guna compatibility report', icon: 'FileText' },
        { label: 'Manglik Dosha analysis', icon: 'Shield' },
        { label: 'Nadi & Bhakoot matching details', icon: 'Sparkles' }
      ],
      amenitiesRight: [
        { label: 'Custom remedial actions PDF', icon: 'FileText' },
        { label: 'Video/Audio recording link', icon: 'Video' },
        { label: 'Follow-up Q&A support', icon: 'HelpCircle' }
      ],
      feeDetails: 'Comprehensive compatibility analysis for relationship alignment and marital longevity',
      price: '₹2,100',
      durationText: '(45 Mins Session)',
      minSessions: 'Minimum 1 session'
    },
    {
      id: 'kundli-prediction',
      title: 'Kundli Prediction',
      type: 'Life & Transit Insights',
      duration: '60 Mins',
      platform: 'Online Zoom',
      image: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?auto=format&fit=crop&w=800&q=80',
      amenitiesLeft: [
        { label: 'Full birth chart analysis PDF', icon: 'FileText' },
        { label: 'Mahadasha timeline decoding', icon: 'Clock' },
        { label: 'Planetary transit effects analysis', icon: 'Sparkles' }
      ],
      amenitiesRight: [
        { label: 'Personalized gemstone recommendations', icon: 'Shield' },
        { label: 'Vedic mantra & charity remedies', icon: 'HelpCircle' },
        { label: 'Video/Audio recording link', icon: 'Video' }
      ],
      feeDetails: 'Detailed mapping of planetary cycles and house strength for career, relationships, and finance',
      price: '₹2,500',
      durationText: '(60 Mins Session)',
      minSessions: 'Minimum 1 session'
    },
    {
      id: 'vastu-consultation',
      title: 'Vastu Consultation',
      type: 'Spatial Harmonization',
      duration: '90 Mins',
      platform: 'Online / Onsite',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
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
      feeDetails: 'Helps align energies without structural demolition',
      price: '₹4,500',
      durationText: '(90 Mins Session)',
      minSessions: 'Minimum 1 session'
    },
    {
      id: 'numerology',
      title: 'Numerology',
      type: 'Destiny Numbers',
      duration: '45 Mins',
      platform: 'Online Zoom',
      image: 'https://images.unsplash.com/photo-1518133680487-394a5eec85e6?auto=format&fit=crop&w=800&q=80',
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
      feeDetails: 'Excellent for selecting new brand names, phone numbers, or signature changes',
      price: '₹2,100',
      durationText: '(45 Mins Session)',
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

  return (
    <div className="pt-28 pb-16 min-h-screen bg-white text-slate-900 font-sans selection:bg-[#b8922b]/20 selection:text-[#b8922b]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Animated Stack of Cards */}
        <motion.div 
          className="space-y-8"
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
              className="bg-[#faf9f6] rounded-3xl border border-[#eae6df] p-4 sm:p-5 flex flex-col md:flex-row items-center md:items-stretch gap-6 transition-all duration-300 shadow-[0_4px_20px_rgba(79,49,41,0.08)]"
            >
              
              {/* Left Column: Professionally Photographed Image */}
              <div className="w-full md:w-[280px] h-[190px] sm:h-[210px] relative overflow-hidden rounded-2xl shrink-0 group">
                <img 
                  src={srv.image} 
                  alt={srv.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Pill Translucent Button overlay bottom-left */}
                <button className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-md hover:bg-white text-[11px] font-semibold tracking-wide text-slate-800 py-1.5 px-3.5 rounded-full shadow-sm transition-all flex items-center gap-1 cursor-pointer">
                  <span>More details</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              {/* Middle Column: Details Grid */}
              <div className="flex-1 flex flex-col justify-between py-1 w-full">
                
                <div>
                  {/* Title */}
                  <h2 className="font-serif text-2xl font-bold text-slate-900 tracking-wide mb-2.5">
                    {srv.title}
                  </h2>

                  {/* Badges & Indicators */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* Property Type Badge (Service Type Badge) */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4f3129] text-white text-[10px] uppercase font-bold tracking-wider rounded-full">
                      <Compass className="w-3.5 h-3.5" />
                      <span>{srv.type}</span>
                    </span>

                    {/* Duration / Platform */}
                    <span className="text-[11px] font-semibold text-slate-700 tracking-wide bg-[#4f3129]/10 px-2.5 py-1 rounded-md">
                      {srv.duration}  ·  {srv.platform}
                    </span>
                  </div>

                  {/* Amenities Grid (Service features) */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-md">
                    
                    {/* Left Column */}
                    <div className="space-y-1.5">
                      {srv.amenitiesLeft.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-800">
                          {getIcon(item.icon)}
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-1.5">
                      {srv.amenitiesRight.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-800">
                          {getIcon(item.icon)}
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Footnote details */}
                <div className="text-[11px] text-slate-500 italic mt-4 border-t border-[#4f3129]/20 pt-2.5">
                  {srv.feeDetails}
                </div>

              </div>

              {/* Vertical Divider */}
              <div className="w-[1px] bg-[#4f3129]/20 hidden md:block self-stretch mx-2" />

              {/* Right Column: Price & Action */}
              <div className="w-full md:w-[210px] flex flex-col justify-between items-center md:items-end text-center md:text-right py-1 shrink-0">
                
                {/* Minimum Nights Label (Minimum session limits) */}
                <span className="text-xs font-medium text-slate-400 font-serif italic mb-1">
                  {srv.minSessions}
                </span>

                {/* Price Details */}
                <div className="mb-4">
                  <div className="text-3xl font-serif font-bold text-slate-900">
                    {srv.price}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase mt-0.5">
                    {srv.durationText}
                  </div>
                </div>

                {/* Select Button redirects to booking wizard with selected service query param */}
                <Link 
                  to={`/booking?service=${srv.id}`}
                  className="w-full text-center py-2.5 bg-[#b8922b] hover:bg-[#a27e20] text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer block"
                >
                  Select
                </Link>

                {/* 10% Off Banner */}
                <div className="text-[9px] text-slate-500 leading-normal mt-3 flex items-start gap-1 text-left w-full border-t border-[#4f3129]/20 pt-2 bg-white/20">
                  <Tag className="w-3 h-3 text-[#b8922b] shrink-0 mt-0.5" />
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
