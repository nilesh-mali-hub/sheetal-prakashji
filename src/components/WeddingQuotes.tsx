import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface QuoteItem {
  text: string;
  attribution?: string;
  isHindi: boolean;
}

const WEDDING_QUOTES: QuoteItem[] = [
  {
    text: 'Together with our families, we invite you to join us as we begin our life together. Your presence, your laughter and your blessings are all we could wish for on this day.',
    isHindi: false,
  },
  {
    text: 'दो दिलों की धड़कन, एक प्यारा सा सफ़र,\nतेरे नाम से रोशन है मेरा हर एक पहर।',
    attribution: 'शीतल एवं प्रकाश जी',
    isHindi: true,
  },
  {
    text: 'Two souls with but a single thought, two hearts that beat as one.',
    attribution: 'John Keats',
    isHindi: false,
  },
  {
    text: 'रब ने मिलाई जोड़ी, खुशियों से सजा आँगन,\nसात फेरों संग बंधा, जन्मों-जन्मों का बंधन।',
    attribution: 'शुभ विवाह · ५ दिसंबर २०२६',
    isHindi: true,
  },
  {
    text: 'मेहंदी के रंग में घुला तेरा प्यार,\nसदा महकता रहे हमारा ये संसार।',
    attribution: 'प्रेम एवं आशीर्वाद',
    isHindi: true,
  },
];

function MangoLeafToran({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden pointer-events-none select-none ${
        flip ? 'rotate-180' : ''
      }`}
    >
      <svg
        viewBox="0 0 600 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-3.5 sm:h-4 block"
        preserveAspectRatio="none"
      >
        {/* Continuous Golden Thread */}
        <line x1="0" y1="2" x2="600" y2="2" stroke="#8B7856" strokeWidth="1.2" strokeOpacity="0.65" />

        {/* Repeating Mango Leaf & Marigold Garland Clusters */}
        {Array.from({ length: 16 }).map((_, idx) => {
          const cx = 18 + idx * 38;
          return (
            <g key={idx}>
              {/* Left Angled Mango Leaf */}
              <path
                d={`M${cx} 2 Q${cx - 8} 10 ${cx - 12} 16 Q${cx - 3} 12 ${cx} 2Z`}
                fill="#5E7364"
                fillOpacity="0.86"
              />
              {/* Right Angled Mango Leaf */}
              <path
                d={`M${cx} 2 Q${cx + 8} 10 ${cx + 12} 16 Q${cx + 3} 12 ${cx} 2Z`}
                fill="#4C6154"
                fillOpacity="0.86"
              />
              {/* Center Leaf */}
              <path
                d={`M${cx} 2 Q${cx - 3} 10 ${cx} 17 Q${cx + 3} 10 ${cx} 2Z`}
                fill="#738775"
              />
              {/* Crimson & Antique Brass Accent Bead */}
              {idx % 3 === 1 && (
                <circle cx={cx} cy={4} r="2.2" fill="#BD374E" />
              )}
              {idx % 3 !== 1 && (
                <circle cx={cx} cy={3.5} r="1.6" fill="#8B7856" />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function SacredKalashIcon() {
  return (
    <svg
      viewBox="0 0 64 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-11 h-12 sm:w-12 sm:h-13 mx-auto drop-shadow-[0_3px_6px_rgba(139,120,86,0.2)]"
    >
      {/* Mango Leaves Fan */}
      <path d="M32 30 C22 25 14 23 10 26 C16 29 24 31 32 32 Z" fill="#6F7D3E" />
      <path d="M32 30 C42 25 50 23 54 26 C48 29 40 31 32 32 Z" fill="#6F7D3E" />
      <path d="M32 29 C23 20 18 15 16 12 C22 15 28 21 32 29 Z" fill="#819049" />
      <path d="M32 29 C41 20 46 15 48 12 C42 15 36 21 32 29 Z" fill="#819049" />
      <path d="M32 28 C29 19 29 12 32 7 C35 12 35 19 32 28 Z" fill="#788843" />

      {/* Sacred Coconut (Nariyal) */}
      <ellipse cx="32" cy="19.5" rx="7.2" ry="9.5" fill="url(#kalashCoconut)" stroke="#754624" strokeWidth="0.9" />
      <path d="M32 10.5 C30 14.5 30 22 32 28" stroke="#683B1C" strokeWidth="0.8" strokeOpacity="0.45" />

      {/* Brass Pot Neck & Rim */}
      <ellipse cx="32" cy="31.5" rx="10.5" ry="2.6" fill="#C98A42" stroke="#8C531E" strokeWidth="1" />
      <rect x="24" y="31.5" width="16" height="4.2" rx="1.5" fill="#DDA158" stroke="#8C531E" strokeWidth="0.9" />

      {/* Kalash Vessel Body */}
      <path
        d="M24 35.5 C16.5 39 15 47.5 18 54.5 C20.8 60.5 25.8 62.5 32 62.5 C38.2 62.5 43.2 60.5 46 54.5 C49 47.5 47.5 39 40 35.5 Z"
        fill="url(#kalashPot)"
        stroke="#8C531E"
        strokeWidth="1.1"
      />

      {/* Sacred Mauli Thread & Swastika / Tilak Detail */}
      <path d="M21 40.5 Q32 43.2 43 40.5" stroke="#BD374E" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="32" cy="48.5" r="1.4" fill="#BD374E" />
      <path d="M29.2 48.5 H34.8 M32 45.7 V51.3" stroke="#BD374E" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="25.5" cy="48.5" r="0.9" fill="#8C531E" fillOpacity="0.55" />
      <circle cx="38.5" cy="48.5" r="0.9" fill="#8C531E" fillOpacity="0.55" />

      {/* Pedestal Ring */}
      <ellipse cx="32" cy="62.5" rx="8.5" ry="1.8" fill="#B57531" stroke="#8C531E" strokeWidth="0.9" />

      <defs>
        <linearGradient id="kalashCoconut" x1="25" y1="10" x2="39" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C98952" />
          <stop offset="0.6" stopColor="#9C5E2E" />
          <stop offset="1" stopColor="#77421B" />
        </linearGradient>
        <linearGradient id="kalashPot" x1="17" y1="36" x2="46" y2="62" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4C77B" />
          <stop offset="0.45" stopColor="#D78E43" />
          <stop offset="1" stopColor="#A86122" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function WeddingQuotes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const total = WEDDING_QUOTES.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      handleNext();
    }, 6200);
    return () => window.clearInterval(timer);
  }, [isPaused, prefersReducedMotion, handleNext]);

  const current = WEDDING_QUOTES[activeIndex];

  return (
    <section
      aria-label="The Invitation Quotes and Shayaris"
      className="relative w-full bg-gradient-to-b from-[#F4EAE1] via-[#F7EFE8] to-[#F4EAE1] border-y border-[#D3C5B0] overflow-hidden my-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Mango Leaf Toran Border */}
      <MangoLeafToran />

      <div className="px-4 sm:px-7 py-5 sm:py-7 max-w-lg mx-auto">
        {/* Tracked Crimson-Rose Eyebrow Title */}
        <h2 className="text-center font-cinzel text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#BD374E] font-semibold mb-4">
          The Invitation
        </h2>

        {/* Crisp Double-Bordered Ivory Stationery Card */}
        <div className="bg-[#FDF9F7] border border-[#D3C5B0] p-[5px] shadow-[0_8px_24px_rgba(47,80,79,0.08)]">
          <div className="relative border border-[#D3C5B0]/75 px-5 sm:px-8 pt-6 pb-5 text-center overflow-hidden bg-[radial-gradient(circle_at_80%_62%,rgba(214,176,165,0.22),transparent_58%)]">
            {/* Centered Sacred Kalash Motif */}
            <div className="mb-4">
              <SacredKalashIcon />
            </div>

            {/* Rotating Quote / Shayari Content */}
            <div className="min-h-[108px] sm:min-h-[102px] flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.38, ease: 'easeOut' }}
                  className="flex flex-col items-center"
                >
                  <blockquote
                    className={
                      current.isHindi
                        ? 'font-hindi text-[15px] sm:text-[17px] text-[#322F2A]/90 font-normal leading-[1.85] whitespace-pre-line'
                        : 'font-serif text-[15px] sm:text-[17px] text-[#322F2A]/90 font-normal leading-[1.78] max-w-md text-balance'
                    }
                  >
                    {current.text}
                  </blockquote>

                  {current.attribution && (
                    <cite
                      className={`mt-2.5 not-italic block ${
                        current.isHindi
                          ? 'font-hindi text-xs text-[#8B7856] tracking-wide font-medium'
                          : 'font-cinzel text-[10px] tracking-[0.2em] uppercase text-[#8B7856] font-semibold'
                      }`}
                    >
                      — {current.attribution}
                    </cite>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Minimal Controls Row */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous quote"
                className="w-7 h-7 rounded-full text-[#8B7856] hover:text-[#2F504F] hover:bg-[#F3EAE3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>

              <div className="flex items-center gap-1.5" role="tablist" aria-label="Select quote">
                {WEDDING_QUOTES.map((_, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Show quote ${idx + 1}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive ? 'w-5 bg-[#BD374E]' : 'w-1.5 bg-[#D3C5B0] hover:bg-[#8B7856]'
                      }`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next quote"
                className="w-7 h-7 rounded-full text-[#8B7856] hover:text-[#2F504F] hover:bg-[#F3EAE3] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Mango Leaf Toran Border */}
      <MangoLeafToran flip />
    </section>
  );
}
