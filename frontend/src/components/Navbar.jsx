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
        ? 'bg-[#4f3129] py-2 2xl:py-3 3xl:py-4 4xl:py-5 5xl:py-4 shadow-md' 
        : 'bg-[#4f3129] py-3 2xl:py-4 3xl:py-5 4xl:py-6 5xl:py-5'
    }`}>
      <div className="site-container">
        <div className="flex items-center justify-between h-9 2xl:h-12 3xl:h-14 4xl:h-16 5xl:h-16 relative">
          
          {/* Left Branding */}
          <Link to="/" className="flex items-center space-x-2 2xl:space-x-3 5xl:space-x-4 shrink-0 group">
            <Sparkles className="h-5 w-5 sm:h-5.5 sm:w-5.5 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8 4xl:h-9 4xl:w-9 5xl:h-10 5xl:w-10 text-gold-400 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            <span className="font-serif text-lg sm:text-xl lg:text-2xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-4xl font-bold tracking-widest text-white group-hover:text-[#deb18a] transition-colors duration-300 whitespace-nowrap">
              MADHURI GUPTA
            </span>
          </Link>

          {/* Desktop Center Menu Options (Only on xl+ to prevent overlap on iPad / tablets) */}
          <div className="hidden xl:flex items-center space-x-5 2xl:space-x-6 3xl:space-x-8 4xl:space-x-10 5xl:space-x-10 mx-auto px-4">
            {navItems
              .filter((item) => ['Home', 'About', 'Services', 'Testimonial', 'Contact'].includes(item.name))
              .map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <Link
                    key={item.name}
                    to={item.url}
                    onClick={(e) => handleLinkClick(e, item)}
                    className={`font-serif text-xs 2xl:text-base 3xl:text-lg 4xl:text-xl 5xl:text-xl font-semibold tracking-[0.2em] uppercase transition-colors duration-300 pb-0.5 whitespace-nowrap ${
                      isActive 
                        ? 'text-[#dfb260] border-b-2 border-[#dfb260]' 
                        : 'text-white hover:text-[#dfb260]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
          </div>

          {/* Right CTA Button & Mobile/Tablet Menu Button */}
          <div className="flex items-center space-x-3 2xl:space-x-4 shrink-0">
            
            {/* CTA Button */}
            <div className="hidden sm:block pr-1 sm:pr-2 lg:pr-3">
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

            {/* Mobile / Tablet Menu Button (Active on screens < xl including iPad/iPads) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 2xl:p-2 rounded-lg text-[#deb18a] hover:text-white hover:bg-white/5 focus:outline-none transition-all cursor-pointer"
              aria-label="Toggle Navigation Options"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 2xl:h-8 2xl:w-8" /> : <Menu className="h-6 w-6 2xl:h-8 2xl:w-8" />}
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
              className="fixed inset-0 top-[50px] 2xl:top-[70px] bg-black/40 backdrop-blur-[2px] z-40 xl:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="xl:hidden absolute right-0 top-full w-3/4 max-w-[280px] sm:max-w-[320px] 2xl:max-w-[380px] bg-[#4f3129] border-l border-b border-[#deb18a]/20 overflow-hidden shadow-2xl rounded-bl-2xl z-50"
            >
              <div className="px-3 py-4 2xl:px-5 2xl:py-6 space-y-1.5 2xl:space-y-2.5 flex flex-col font-serif">
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
                      className={`text-xs sm:text-sm 2xl:text-base 3xl:text-lg font-semibold tracking-[0.18em] uppercase py-2.5 px-4 2xl:py-3.5 2xl:px-5 rounded-xl transition-all ${
                        isActive 
                          ? 'bg-[#b8922b]/20 text-[#deb18a] border-l-4 border-[#deb18a]' 
                          : 'text-white hover:text-[#deb18a] hover:bg-white/5'
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
