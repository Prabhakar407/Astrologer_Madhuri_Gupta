import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Youtube,
  Globe,
  MessageCircle
} from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submit placeholder
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Top Header Section (Dark Brown Background) */}
      <section className="bg-[#4f3129] relative pt-24 pb-12 md:pb-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
            
            {/* Header Text & Contact Info Cards (Left 7 Columns) */}
            <div className="md:col-span-7 space-y-6 text-left relative z-10">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-3"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-serif tracking-wide">
                  Contact Us
                </h1>
                <p className="text-[#deb18a]/80 max-w-lg text-sm sm:text-base font-light leading-relaxed">
                  Have questions about your astrological path or booking a consultation? Reach out today, and let us align your cosmic journey together.
                </p>
              </motion.div>

              {/* 3 Circular Badges Row in Hero (Styled for Dark Background) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#deb18a]/15">
                
                {/* Phone */}
                <div className="flex flex-row items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-serif tracking-tight">
                      (+91) 98765 43210
                    </h3>
                    <p className="text-[10px] text-[#deb18a]/70 font-medium">
                      Call or WhatsApp
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-row items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-white font-serif tracking-tight break-all">
                      info@astromadhuri.com
                    </h3>
                    <p className="text-[10px] text-[#deb18a]/70 font-medium">
                      Support Email
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-row items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-full bg-[#b8922b] text-white flex items-center justify-center shadow-md shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white font-serif tracking-tight">
                      New Delhi, India
                    </h3>
                    <p className="text-[10px] text-[#deb18a]/70 font-medium">
                      Available Globally
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Spacer Column */}
            <div className="hidden md:block md:col-span-5" />

          </div>
        </div>
      </section>

      {/* Contact Info Row (Below Header, aligns alongside the hanging arch image) */}
      <section className="bg-white pt-6 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Our Location Map Section (Left 7 Columns) */}
            <div className="md:col-span-7 space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#3a1906] font-serif">
                Our Location
              </h2>

              {/* Google Maps Embed */}
              <div className="w-full max-w-[450px] h-[170px] rounded-xl overflow-hidden shadow-md border border-gray-150">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83606995655!2d77.06889753443152!3d28.527280327339794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204d!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  title="Astro Madhuri Location Office Map"
                ></iframe>
              </div>
            </div>

            {/* Arched image cutout (Right 5 Columns - sits directly on white background with negative margin overlap) */}
            <div className="md:col-span-5 relative flex justify-center md:justify-end -mt-28 md:-mt-76 z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-[280px] sm:w-[320px] h-[380px] sm:h-[420px] rounded-t-full overflow-hidden border-[6px] border-white shadow-2xl bg-white"
              >
                <img
                  src="/contact_office.png"
                  alt="Madhuri Gupta consulting room"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Form & Map Section */}
      <section className="bg-white pb-24 relative z-10 border-t border-gray-100 pt-8 md:pt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Get In Touch Form (Left 6 Columns) */}
            <div className="md:col-span-6 bg-[#4f3129] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4 text-[#faf6e8]">
              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl font-bold font-serif">
                  Get In Touch !
                </h2>
                <p className="text-[#deb18a]/80 text-[11px] sm:text-xs font-light leading-relaxed">
                  Fill out the form below to receive a personalized callback regarding cosmic charts and readings.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#deb18a]/40 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all"
                  />
                </div>
                
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#deb18a]/40 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#deb18a]/40 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <textarea
                    placeholder="Message"
                    rows={3}
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#deb18a]/40 focus:outline-none focus:border-[#b8922b] focus:ring-1 focus:ring-[#b8922b] transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-fit bg-[#b8922b] hover:bg-[#a27e20] text-white font-bold py-2.5 px-6 rounded-xl transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg text-xs select-none"
                >
                  Submit Button
                </button>
              </form>
            </div>

            {/* QR & Social Media Column (Right 6 Columns) */}
            <div className="md:col-span-6 space-y-6 flex flex-col justify-start items-start md:items-center pl-0 md:pl-8 pr-0 md:pr-24">
              
              {/* WhatsApp QR Code Section */}
              <div className="space-y-2 flex flex-col items-center w-full md:pr-4 pt-6 md:pt-12">
                <p className="text-sm font-bold text-[#3a1906] tracking-wider uppercase font-serif text-center whitespace-nowrap">
                  Scan the qr to message on whatsapp
                </p>
                <div className="w-36 h-36 md:w-40 md:h-40 bg-white p-2 rounded-lg shadow-md border border-gray-150 flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fwa.me%2F918881573437&color=4f3129"
                    alt="Scan to Chat on WhatsApp"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Social Media Links Section */}
              <div className="space-y-3 pt-4 border-t border-gray-100 flex flex-col items-center w-full md:pr-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#3a1906] font-serif text-center">
                  Social Media Links
                </h2>
                <div className="flex flex-wrap gap-2.5 justify-center">
                  {/* WhatsApp (Real Logo & Match Link Color) */}
                  <a
                    href="https://wa.me/918881573437"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="WhatsApp Message Direct"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.528 1.977 14.07 1.9 12.003 1.9c-5.439 0-9.865 4.37-9.87 9.8-.002 1.984.518 3.923 1.503 5.644l-.997 3.639 3.75-1.83z" />
                      <path d="M15.93 11.66c-.22-.11-1.29-.64-1.49-.71-.2-.07-.35-.11-.5.11-.15.22-.59.75-.73.91-.14.16-.27.18-.49.07-.22-.11-.93-.34-1.77-1.09-.65-.58-1.09-1.3-1.22-1.52-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.03-.28-.02-.39-.05-.11-.5-1.2-.69-1.65-.19-.45-.37-.39-.51-.4-.13 0-.28-.01-.43-.01-.15 0-.4.06-.6.28-.2.22-.77.75-.77 1.83 0 1.08.79 2.13.9 2.28.11.15 1.55 2.37 3.76 3.32.53.23.94.37 1.26.47.53.17 1.02.15 1.4.09.43-.06 1.29-.53 1.47-1.03.18-.5.18-.94.13-1.03-.05-.08-.2-.13-.42-.24z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Facebook Profile"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>

                  {/* Twitter */}
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Twitter Profile"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>

                  {/* Youtube */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Youtube Channel"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>

                  {/* Website */}
                  <a
                    href="https://astrologermadhuri.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#b8922b] hover:bg-[#3a1906] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                    aria-label="Cosmic Globe Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
