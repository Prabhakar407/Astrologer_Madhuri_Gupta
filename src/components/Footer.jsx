import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer id="contact" className="relative z-10 bg-[#4f3129] border-t border-[#deb18a]/20 text-[#deb18a] font-serif">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-[#deb18a]" />
              <span className="font-serif text-lg font-bold tracking-widest text-[#deb18a]">
                MADHURI GUPTA
              </span>
            </Link>
            <p className="text-sm text-white font-serif leading-relaxed tracking-wide">
              Empowering individuals with Vedic astrology and cosmic wisdom to align with their true purpose, relationships, and destiny.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-[#deb18a] mb-4 uppercase tracking-[0.18em] text-xs sm:text-sm">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-serif tracking-wider uppercase">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Madhuri</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-white transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-white transition-colors">Book a Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-bold text-[#deb18a] mb-4 uppercase tracking-[0.18em] text-xs sm:text-sm">Our Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-serif tracking-wider uppercase">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Vedic Astrology</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Vastu Consultation</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Numerology</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Krishnamurti Paddhati Horoscope</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Prashna Kundli</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Bhrigu Nandi Nadi Astrology</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-[#deb18a] mb-4 uppercase tracking-[0.18em] text-xs sm:text-sm">Contact Info</h3>
            <ul className="space-y-3 text-xs sm:text-sm text-white/90 font-serif tracking-wide">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-white/80 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-white/80 shrink-0" />
                <span className="break-all">info@astrologermadhuri.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-white/80 shrink-0 mt-0.5" />
                <span>New Delhi, India (Available Globally Online)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-[#deb18a]/15 mt-8 pt-8 text-center text-[10px] text-[#deb18a]/70 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 font-serif tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Astrologer Madhuri Gupta. All rights reserved.</p>
          <p className="text-[#deb18a] font-bold">ALIGN WITH THE STARS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
