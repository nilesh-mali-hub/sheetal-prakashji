import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RSVPProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  attending: 'yes',
  guests: '2',
  message: ''
};

export default function RSVP({ isOpen, onOpen, onClose }: RSVPProps) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (submitted) {
          setSubmitted(false);
          setFormData(INITIAL_FORM);
        }
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitted, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(INITIAL_FORM);
    onClose();
  };

  return (
    <section id="rsvp" className="py-7 sm:py-9 px-4 sm:px-6 max-w-5xl mx-auto relative z-10">
      
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2F504F] font-normal tracking-wide">
          Please Confirm Your Presence
        </h2>

        {/* Filigree Antique Brass Divider */}
        <div className="flex items-center justify-center gap-2 my-2.5 opacity-85">
          <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#8B7856]"></div>
          <span className="text-[#8B7856] text-[10px]">✦</span>
          <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#8B7856]"></div>
        </div>
      </div>

      {/* 2-Column Layout: Text + RSVP button on left, Wax Sealed Envelope on right */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        
        {/* Left Column: Delight message & RSVP Now button */}
        <div className="sm:col-span-6 flex flex-col items-center sm:items-start text-center sm:text-left px-2">
          <p className="font-serif italic text-base sm:text-lg text-[#322F2A]/90 leading-relaxed mb-5 font-normal">
            We would be delighted to have you with us on our special day.
          </p>

          <button
            onClick={onOpen}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] border border-[#8B7856]/40 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer group"
          >
            <span>RSVP Now</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D3C5B0]" />
          </button>
        </div>

        {/* Right Column: Envelope with flowers */}
        <div className="sm:col-span-6 flex justify-center sm:justify-end">
          <div 
            onClick={onOpen}
            className="relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 max-w-[260px] sm:max-w-[280px]"
            title="Click to send your RSVP response"
          >
            <img
              src="/assets/aistudio/envelope_with_flowers.png"
              alt="Sheetal & Prakash Ji Wax-Sealed Invitation"
              className="w-full h-auto object-contain select-none filter drop-shadow-md"
            />
          </div>
        </div>

      </div>

      {/* RSVP Interactive Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F3837]/60 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#FDF9F7] border-2 border-[#8B7856] rounded-3xl p-6 sm:p-8 shadow-2xl my-8"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[#2F504F]/70 hover:text-[#2F504F] p-1.5 rounded-full hover:bg-[#F3EAE3] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#FBF5F2] border border-[#8B7856] text-[#2F504F] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={36} className="text-[#2F504F]" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#2F504F] mb-2">Thank You, {formData.name || 'Friend'}!</h3>
                  <p className="font-serif italic text-lg text-[#322F2A]/85 mb-6">
                    Your response has been received with warm love. We look forward to celebrating together!
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#2F504F] text-[#FBF5F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#1F3837] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="text-center mb-6">
                    <span className="font-cinzel text-xs tracking-[0.2em] text-[#8B7856] uppercase">RSVP</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2F504F] mt-1">Confirm Presence</h3>
                    <p className="text-xs text-[#322F2A]/75 mt-1">Please confirm your presence for Sheetal & Prakash Ji</p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sharma Family"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1">
                        Attendance
                      </label>
                      <select
                        value={formData.attending}
                        onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                      >
                        <option value="yes">Accept with Joy 💖</option>
                        <option value="no">Decline</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1">
                        Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5+">5+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1">
                      Blessings & Message
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Write your blessings for Sheetal & Prakash Ji..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Send RSVP</span>
                    <Send size={15} className="text-[#D3C5B0]" />
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
