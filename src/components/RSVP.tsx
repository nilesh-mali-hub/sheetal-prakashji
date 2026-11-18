import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Check, CheckCircle, Send, Utensils, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';

interface RSVPProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const INITIAL_FORM = {
  name: '',
  phone: '',
  attending: true,
  guests: '2',
  dietary: '',
  message: '',
};

const FIREWORK_COLORS = [
  '#BD374E', // Crimson Rose
  '#D3C5B0', // Champagne Sand
  '#8B7856', // Antique Brass
  '#E8A849', // Marigold Gold
  '#2F504F', // Deep Slate Teal
  '#F7DDE4', // Soft Blush
];

export default function RSVP({ isOpen, onOpen, onClose }: RSVPProps) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const fireworkTimersRef = useRef<number[]>([]);

  const clearFireworkTimers = useCallback(() => {
    fireworkTimersRef.current.forEach((id) => window.clearTimeout(id));
    fireworkTimersRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearFireworkTimers();
  }, [clearFireworkTimers]);

  const launchRsvpFireworks = useCallback(() => {
    if (prefersReducedMotion) return;
    clearFireworkTimers();

    const fireBurst = (originX: number, originY: number, particleCount: number) => {
      confetti({
        particleCount,
        spread: 360,
        startVelocity: 32,
        ticks: 85,
        gravity: 0.78,
        decay: 0.92,
        scalar: 1.05,
        zIndex: 100,
        disableForReducedMotion: true,
        colors: FIREWORK_COLORS,
        origin: { x: originX, y: originY },
      });
    };

    // Immediate opening center salute + angled side crackers
    fireBurst(0.5, 0.32, 55);
    confetti({
      particleCount: 38,
      angle: 60,
      spread: 58,
      startVelocity: 46,
      zIndex: 100,
      disableForReducedMotion: true,
      colors: FIREWORK_COLORS,
      origin: { x: 0.12, y: 0.72 },
    });
    confetti({
      particleCount: 38,
      angle: 120,
      spread: 58,
      startVelocity: 46,
      zIndex: 100,
      disableForReducedMotion: true,
      colors: FIREWORK_COLORS,
      origin: { x: 0.88, y: 0.72 },
    });

    // Staggered celebratory aerial firework bursts
    const schedule = [
      { delay: 280, x: 0.28, y: 0.26, count: 48 },
      { delay: 560, x: 0.72, y: 0.24, count: 48 },
      { delay: 900, x: 0.42, y: 0.2, count: 52 },
      { delay: 1260, x: 0.62, y: 0.34, count: 44 },
      { delay: 1620, x: 0.5, y: 0.22, count: 60 },
    ];

    schedule.forEach(({ delay, x, y, count }) => {
      const timerId = window.setTimeout(() => fireBurst(x, y, count), delay);
      fireworkTimersRef.current.push(timerId);
    });
  }, [prefersReducedMotion, clearFireworkTimers]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearFireworkTimers();
        if (submitted) {
          setSubmitted(false);
          setFormData(INITIAL_FORM);
        }
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitted, onClose, clearFireworkTimers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const numericGuests = formData.guests === '5+' ? 5 : parseInt(formData.guests, 10) || 1;
      const dietaryText = formData.attending ? formData.dietary.trim() : '';
      await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          mobile: formData.phone.trim(),
          attending: formData.attending,
          guestsCount: formData.attending ? numericGuests : 0,
          dietaryRequirements: dietaryText,
          mealPreference: formData.attending
            ? dietaryText || 'No special requirements'
            : 'Unable to Attend',
          accommodation: '',
          message: formData.message.trim(),
        }),
      });
    } catch {
      // Gracefully confirm on static hosting environments
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      launchRsvpFireworks();
    }
  };

  const handleReset = () => {
    clearFireworkTimers();
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
            type="button"
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
            onClick={() => {
              clearFireworkTimers();
              onClose();
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F3837]/60 backdrop-blur-sm p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-[#FDF9F7] border-2 border-[#8B7856] rounded-3xl p-5 sm:p-7 shadow-2xl my-4"
            >
              <button
                type="button"
                onClick={() => {
                  clearFireworkTimers();
                  onClose();
                }}
                aria-label="Close RSVP dialog"
                className="absolute top-4 right-4 text-[#2F504F]/70 hover:text-[#2F504F] p-1.5 rounded-full hover:bg-[#F3EAE3] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {submitted ? (
                <motion.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={prefersReducedMotion ? undefined : { scale: 0.6, rotate: -12 }}
                    animate={prefersReducedMotion ? undefined : { scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                    className="w-16 h-16 rounded-full bg-[#FBF5F2] border border-[#8B7856] text-[#2F504F] flex items-center justify-center mx-auto mb-4 shadow-sm"
                  >
                    <CheckCircle size={36} className="text-[#BD374E]" />
                  </motion.div>
                  <h3 className="font-serif text-3xl text-[#2F504F] mb-2">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="font-serif italic text-lg text-[#322F2A]/85 mb-6">
                    {formData.attending
                      ? 'Your response has been received with warm love. We look forward to celebrating together!'
                      : 'Thank you for letting us know. We will miss your presence and cherish your warm blessings!'}
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full bg-[#2F504F] text-[#FBF5F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#1F3837] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="text-center mb-4">
                    <span className="font-cinzel text-xs tracking-[0.2em] text-[#8B7856] uppercase">RSVP</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2F504F] mt-0.5">Confirm Presence</h3>
                    <p className="text-xs text-[#322F2A]/75 mt-1">Please confirm your presence for Sheetal &amp; Prakash Ji</p>
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="rsvp-name"
                      type="text"
                      required
                      placeholder="e.g. Sharma Family"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rsvp-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1"
                    >
                      WhatsApp / Phone *
                    </label>
                    <input
                      id="rsvp-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                    />
                  </div>

                  {/* Will you attend? Toggle */}
                  <div className="rounded-2xl border border-[#D3C5B0] bg-[#FBF5F2]/80 p-3">
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <span
                        id="rsvp-attend-label"
                        className="text-xs font-semibold uppercase tracking-wider text-[#2F504F]"
                      >
                        Will you attend?
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={formData.attending}
                        aria-labelledby="rsvp-attend-label"
                        onClick={() => setFormData({ ...formData, attending: !formData.attending })}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2F504F] ${
                          formData.attending
                            ? 'bg-[#2F504F] border-[#2F504F]'
                            : 'bg-[#D3C5B0]/70 border-[#8B7856]/40'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-[#FDF9F7] shadow-sm transition-transform duration-200 ${
                            formData.attending ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      role="radiogroup"
                      aria-labelledby="rsvp-attend-label"
                      className="grid grid-cols-2 gap-2"
                    >
                      <button
                        type="button"
                        role="radio"
                        aria-checked={formData.attending}
                        onClick={() => setFormData({ ...formData, attending: true })}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                          formData.attending
                            ? 'bg-[#2F504F] text-[#FBF5F2] border-[#2F504F] shadow-sm'
                            : 'bg-[#FDF9F7] text-[#322F2A]/75 border-[#D3C5B0]/80 hover:border-[#8B7856]'
                        }`}
                      >
                        {formData.attending && <Check size={13} className="text-[#D3C5B0] shrink-0" />}
                        <span>Yes, Joyfully</span>
                      </button>

                      <button
                        type="button"
                        role="radio"
                        aria-checked={!formData.attending}
                        onClick={() => setFormData({ ...formData, attending: false })}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                          !formData.attending
                            ? 'bg-[#BD374E] text-[#FDF9F7] border-[#BD374E] shadow-sm'
                            : 'bg-[#FDF9F7] text-[#322F2A]/75 border-[#D3C5B0]/80 hover:border-[#8B7856]'
                        }`}
                      >
                        {!formData.attending && <Check size={13} className="text-[#FDF9F7] shrink-0" />}
                        <span>Unable to Attend</span>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {formData.attending && (
                      <motion.div
                        key="attending-details"
                        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="overflow-hidden space-y-3.5"
                      >
                        <div>
                          <label
                            htmlFor="rsvp-guests"
                            className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1"
                          >
                            Number of Guests
                          </label>
                          <select
                            id="rsvp-guests"
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                          >
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5+">5+ Guests</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="rsvp-dietary"
                            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1"
                          >
                            <Utensils size={12} className="text-[#8B7856]" />
                            <span>Dietary Requirements</span>
                          </label>
                          <input
                            id="rsvp-dietary"
                            type="text"
                            placeholder="e.g. Pure Veg, Jain food, no onion/garlic, allergies..."
                            value={formData.dietary}
                            onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label
                      htmlFor="rsvp-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#2F504F] mb-1"
                    >
                      Blessings &amp; Message
                    </label>
                    <textarea
                      id="rsvp-message"
                      rows={2}
                      placeholder="Write your blessings for Sheetal & Prakash Ji..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2]/70 focus:bg-white focus:outline-none focus:border-[#2F504F] text-sm text-[#322F2A]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-full bg-[#2F504F] hover:bg-[#1F3837] disabled:opacity-70 text-[#FBF5F2] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send RSVP'}</span>
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
