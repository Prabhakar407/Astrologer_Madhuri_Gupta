import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Booking from './pages/Booking.jsx'
import Testimonials from './pages/Testimonials.jsx'
import ContactPage from './pages/ContactPage.jsx'

function AppShell() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="relative min-h-screen bg-cosmic-950 text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-[#3a1906] selection:text-[#faf6e8]">
      <div className={isHome ? 'hero-page-shell' : ''}>
        <div className={isHome ? 'hero-unified-frame' : ''}>
          <Navbar />
          <main className="flex-grow relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function ScrollToHashElement() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1)
      const el = document.getElementById(elementId)
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
        return () => clearTimeout(timer)
      }
    }
  }, [location])

  return null
}

function App() {
  useEffect(() => {
    // Silent background pre-warming of cloud server container (e.g., Render free tier wake-up)
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? '' : 'https://astrologer-madhuri-gupta.onrender.com');
      fetch(`${backendUrl}/api/health`, { method: 'GET', keepalive: true }).catch(() => {});
    } catch (_) {}
  }, []);

  return (
    <Router>
      <ScrollToHashElement />
      <AppShell />
    </Router>
  )
}

export default App
