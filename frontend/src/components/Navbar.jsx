import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Compass, MessageSquare, Phone, Calendar, Sparkles, Menu, X } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync scroll detection for header background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Services', url: '/services', icon: Compass },
    { name: 'Testimonial', url: '/testimonials', icon: MessageSquare },
    { name: 'Contact', url: '/contact', icon: Phone },
    { name: 'Book Appointment', url: '/booking', icon: Calendar }
  ];

  // Track active tab based on path
  useEffect(() => {
    const path = location.pathname;

    if (path === '/about') {
      setActiveTab('About');
    } else if (path === '/services') {
      setActiveTab('Services');
    } else if (path === '/booking') {
      setActiveTab('Book Appointment');
    } else if (path === '/testimonials') {
      setActiveTab('Testimonial');
    } else if (path === '/contact') {
      setActiveTab('Contact');
    } else if (path === '/') {
      setActiveTab('Home');
    }
    
    // Close mobile menu on path changes
    setMobileMenuOpen(false);
  }, [location]);

  const handleLinkClick = (e, item) => {
    if (item.url.startsWith('/#')) {
      const elementId = item.url.substring(2);
      if (location.pathname === '/') {
        e.preventDefault();
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveTab(item.name);
          window.history.pushState(null, '', item.url);
        }
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#deb18a]/15 ${
      scrolled 
        ? 'bg-[#4f3129] py-2 shadow-md' 
        : 'bg-[#4f3129] py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 relative">
          
          {/* Left Branding */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Sparkles className="h-4.5 w-4.5 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-[#deb18a] group-hover:text-white transition-colors duration-300">
              MADHURI GUPTA
            </span>
          </Link>

          {/* Desktop Center Menu Options */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 absolute left-1/2 -translate-x-1/2">
            {navItems
              .filter((item) => ['Home', 'About', 'Services', 'Testimonial', 'Contact'].includes(item.name))
              .map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <Link
                    key={item.name}
                    to={item.url}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`font-serif text-[12px] lg:text-[13px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive 
                        ? 'text-white border-b border-[#deb18a]' 
                        : 'text-[#deb18a]/80 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
          </div>

          {/* Desktop Right CTA Button and Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Link
                to="/booking"
                className="btn-10"
              >
                <div className="slide-bg"></div>
                <span className="arrow-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span className="btn-text">Book Appointment</span>
              </Link>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#deb18a] hover:text-white hover:bg-white/5 focus:outline-none transition-all cursor-pointer"
              aria-label="Toggle Navigation Options"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Dropdown Mobile Navigation Options (Smooth vertical collapse - aligned right with backdrop) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay for outside tap dismissal */}
            <div 
              className="fixed inset-0 top-[50px] bg-black/40 backdrop-blur-[2px] z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden absolute right-0 top-full w-2/3 max-w-[260px] min-w-[190px] bg-[#4f3129] border-l border-b border-[#deb18a]/20 overflow-hidden shadow-2xl rounded-bl-2xl z-50"
            >
              <div className="px-3 py-4 space-y-1.5 flex flex-col font-serif">
                {navItems.map((item) => {
                  const isActive = activeTab === item.name;
                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      onClick={(e) => {
                        handleLinkClick(e, item);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase py-2.5 px-4 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-[#b8922b]/20 text-white border-l-4 border-[#b8922b]' 
                          : 'text-[#deb18a]/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}

export default Navbar;
