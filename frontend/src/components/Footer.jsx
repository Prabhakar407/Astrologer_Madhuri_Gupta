import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Sparkles } from 'lucide-react'
import { FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa'

function Footer() {
  return (
    <footer id="contact" className="relative z-10 bg-[#4f3129] border-t border-white/20 text-white font-serif">
      <div className="site-container py-12 2xl:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 2xl:gap-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 2xl:space-x-3">
              <Sparkles className="h-5 w-5 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8 text-[#dfb260]" />
              <span className="font-serif text-lg 2xl:text-2xl 3xl:text-3xl font-bold tracking-widest text-white">
                MADHURI GUPTA
              </span>
            </Link>
            <p className="text-sm 2xl:text-base 3xl:text-lg text-white/90 font-serif leading-relaxed tracking-wide">
              Empowering individuals with Vedic astrology and cosmic wisdom to align with their true purpose, relationships, and destiny.
            </p>
            <div className="flex space-x-4 2xl:space-x-6 pt-2">
              <a href="https://wa.me/918881573437" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="WhatsApp">
                <FaWhatsapp className="h-5 w-5 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebook className="h-5 w-5 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube className="h-5 w-5 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-white mb-4 uppercase tracking-[0.18em] text-xs sm:text-sm 2xl:text-base 3xl:text-lg">Quick Links</h3>
            <ul className="space-y-2 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-white/90 font-serif tracking-wider uppercase">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">About Madhuri</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-white hover:underline transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-white hover:underline transition-colors">Book a Consultation</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-bold text-white mb-4 uppercase tracking-[0.18em] text-xs sm:text-sm 2xl:text-base 3xl:text-lg">Our Services</h3>
            <ul className="space-y-2 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-white/90 font-serif tracking-wider uppercase">
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Kundli Matching</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Kundli Prediction</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Vastu Consultation</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white hover:underline transition-colors">Numerology</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-white mb-4 uppercase tracking-[0.18em] text-xs sm:text-sm 2xl:text-base 3xl:text-lg">Contact Info</h3>
            <ul className="space-y-3 text-xs sm:text-sm 2xl:text-base 3xl:text-lg text-white font-serif tracking-wide">
              <li className="flex items-center space-x-2 2xl:space-x-3">
                <Phone className="h-4 w-4 2xl:h-6 2xl:w-6 text-white shrink-0" />
                <span>+91 88815 73437</span>
              </li>
              <li className="flex items-center space-x-2 2xl:space-x-3">
                <Mail className="h-4 w-4 2xl:h-6 2xl:w-6 text-white shrink-0" />
                <span className="break-all font-sans lowercase">sarsajyotish@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2 2xl:space-x-3">
                <MapPin className="h-4 w-4 2xl:h-6 2xl:w-6 text-white shrink-0 mt-0.5" />
                <span>Agra, Uttar Pradesh, India (Available Globally Online)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-white/20 mt-8 2xl:mt-12 pt-8 2xl:pt-12 text-center text-xs 2xl:text-sm 3xl:text-base text-white/90 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 font-serif tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Astrologer Madhuri Gupta. All rights reserved.</p>
          <p className="text-white font-bold">ALIGN WITH THE STARS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
