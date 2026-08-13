import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, Compass, MessageSquare, Phone, Calendar, Sparkles } from 'lucide-react'

function Navbar() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('Home')
  const [scrolled, setScrolled] = useState(false)

  // Sync scroll detection for header blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'About', url: '/about', icon: User },
    { name: 'Services', url: '/services', icon: Compass },
    { name: 'Testimonial', url: '/#testimonials', icon: MessageSquare },
    { name: 'Contact', url: '/#contact', icon: Phone },
    { name: 'Book Appointment', url: '/booking', icon: Calendar }
  ]

  // Track active tab based on path and hash
  useEffect(() => {
    const path = location.pathname
    const hash = location.hash

    if (path === '/about') {
      setActiveTab('About')
    } else if (path === '/services') {
      setActiveTab('Services')
    } else if (path === '/booking') {
      setActiveTab('Book Appointment')
    } else if (path === '/' && hash === '#testimonials') {
      setActiveTab('Testimonial')
    } else if (hash === '#contact') {
      setActiveTab('Contact')
    } else if (path === '/') {
      setActiveTab('Home')
    }
  }, [location])

  const handleLinkClick = (e, item) => {
    if (item.url.startsWith('/#')) {
      const elementId = item.url.substring(2)
      if (location.pathname === '/') {
        e.preventDefault()
        const el = document.getElementById(elementId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
          // Manually update active tab and hash
          setActiveTab(item.name)
          window.history.pushState(null, '', item.url)
        }
      }
    }
  }

  return (
    <>
      {/* Top Navbar Header (Branding only on Mobile, Brand + Menu on Desktop) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#deb18a]/15 ${
        scrolled 
          ? 'bg-[#4f3129] py-2 shadow-md' 
          : 'bg-[#4f3129] py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-center h-8">
            
            {/* Branding - Visible only on Mobile */}
            <div className="flex justify-center md:hidden w-full">
              <Link to="/" className="flex items-center space-x-2 group">
                <Sparkles className="h-4 w-4 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-serif text-base font-bold tracking-widest bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  MADHURI GUPTA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered, Spaced, No Branding, No Capsule (Matches Hero2.png) */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems
                .filter((item) => ['Home', 'About', 'Services', 'Contact'].includes(item.name))
                .map((item) => {
                  const isActive = activeTab === item.name
                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      onClick={(e) => handleLinkClick(e, item)}
                      className={`font-serif text-[13px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-[#deb18a]/80 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )
                })}
            </div>

            {/* Book Appointment CTA Button - Right Aligned on Desktop */}
            <div className="hidden md:block absolute right-0">
              <Link
                to="/booking"
                className="px-4 py-1.5 font-serif text-[10px] font-bold tracking-widest text-cosmic-950 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 rounded hover:from-gold-200 hover:to-gold-500 shadow-[0_2px_12px_rgba(212,175,55,0.2)] hover:shadow-[0_4px_16px_rgba(212,175,55,0.35)] transition-all duration-300 transform hover:-translate-y-0.5 border border-gold-300/30 uppercase"
              >
                Book Appointment
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Floating Bottom Dock (Visible only on Mobile) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[420px] mobile-bottom-nav">
        <div className="lamp-nav-container justify-around py-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            return (
              <Link
                key={item.name}
                to={item.url}
                onClick={(e) => handleLinkClick(e, item)}
                className={`lamp-link p-3 rounded-full shrink-0 flex items-center justify-center transition-colors ${isActive ? 'active text-gold-400' : 'text-slate-400'}`}
                title={item.name}
              >
                <span className="relative z-10">
                  <Icon className="h-5 w-5 stroke-[2.2]" />
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="mobile-lamp"
                    className="absolute inset-0 w-full bg-gold-500/5 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  >
                    {/* Active Indicator Bottom Glow Line */}
                    <div className="lamp-glow-bar" />
                  </motion.div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Navbar
