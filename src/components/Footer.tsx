import React, { useState, useRef, useEffect } from 'react';
import { Calendar, CalendarPlus, Download, ExternalLink, ArrowUp, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GOOGLE_CALENDAR_URL, downloadWeddingIcs } from '../utils/calendar';

export default function Footer() {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [icsDownloaded, setIcsDownloaded] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!calendarMenuOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setCalendarMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCalendarMenuOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [calendarMenuOpen]);

  const handleDownloadIcs = () => {
    downloadWeddingIcs();
    setIcsDownloaded(true);
    window.setTimeout(() => {
      setIcsDownloaded(false);
      setCalendarMenuOpen(false);
    }, 1600);
  };

  const quickLinks = [
    { label: 'Our Story', href: '#our-story' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Wishes', href: '#wishes' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Location', href: '#event-map' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#2F504F] via-[#233E3D] to-[#192D2C] text-[#FBF5F2] overflow-hidden mt-10">
      {/* Crisp Pointed Mughal Scalloped Arch Transition */}
      <div className="w-full overflow-hidden leading-none bg-[#FBF5F2]">
        <svg
          viewBox="0 0 600 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-9 sm:h-12 block"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 54H600V36C545 36 510 20 455 24C400 28 345 18 300 4C255 18 200 28 145 24C90 20 55 36 0 36V54Z"
            fill="#2F504F"
          />
          <path
            d="M0 36C55 36 90 20 145 24C200 28 255 18 300 4C345 18 400 28 455 24C510 20 545 36 600 36"
            stroke="#8B7856"
            strokeWidth="2.5"
          />
          <path
            d="M0 41C55 41 90 25 145 29C200 33 255 23 300 9C345 23 400 33 455 29C510 25 545 41 600 41"
            stroke="#D3C5B0"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Main Open-Canvas Royal Closing Frame */}
      <div className="relative z-10 pt-4 pb-8 px-6 max-w-md mx-auto text-center flex flex-col items-center">
        {/* Soft Radiant Halo + Official SP Monogram Crest */}
        <div className="relative mb-3.5">
          <div className="absolute inset-0 rounded-full bg-[#D3C5B0]/15 blur-xl scale-110 pointer-events-none" />
          <img
            src="/assets/aistudio/image_d5322966.png"
            alt="Sheetal & Prakash Ji Wedding Crest"
            className="w-24 sm:w-28 h-auto mx-auto relative drop-shadow-[0_6px_16px_rgba(0,0,0,0.28)] select-none"
          />
        </div>

        {/* Auspicious Invocation */}
        <span className="font-cinzel text-[10px] tracking-[0.28em] uppercase text-[#D3C5B0]/90 mb-1">
          With Love &amp; Blessings
        </span>

        {/* Couple Names */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF5F2] font-semibold tracking-tight text-balance">
          Sheetal <span className="font-normal italic text-[#D3C5B0]">&amp;</span> Prakash Ji
        </h3>

        {/* Delicate Brass Hairline Divider */}
        <div className="flex items-center justify-center gap-3 my-3.5 w-full">
          <div className="w-14 h-px bg-gradient-to-r from-transparent to-[#D3C5B0]/70" />
          <span className="text-[#BD374E] text-xs" aria-hidden="true">✦</span>
          <div className="w-14 h-px bg-gradient-to-l from-transparent to-[#D3C5B0]/70" />
        </div>

        {/* Clean Unboxed Date & Directions Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#FBF5F2]/95 font-serif mb-3.5">
          <span className="inline-flex items-center gap-1.5">
            <Calendar size={14} className="text-[#D3C5B0]" />
            <span className="font-medium tracking-wide">5th December, 2026</span>
          </span>
          <span className="text-[#D3C5B0]/50" aria-hidden="true">·</span>
          <a
            href="https://maps.app.goo.gl/xci1FQXozgPz2u698"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#D3C5B0] hover:text-white transition-colors underline decoration-[#8B7856]/60 underline-offset-4"
          >
            <MapPin size={13} />
            <span>Venue Map</span>
          </a>
        </div>

        {/* Traditional Auspicious Blessing */}
        <p className="font-hindi text-xs sm:text-sm text-[#D3C5B0] tracking-wider font-medium mb-5">
          ॥ आप सभी सपरिवार सादर आमंत्रित हैं ॥
        </p>

        {/* Save the Date — Interactive Calendar Action (Google Calendar & .ics Download) */}
        <div ref={menuContainerRef} className="relative mb-6 w-full max-w-[280px] flex flex-col items-center">
          <button
            type="button"
            onClick={() => setCalendarMenuOpen((prev) => !prev)}
            aria-expanded={calendarMenuOpen}
            aria-haspopup="menu"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FDF9F7] hover:bg-[#F3EAE3] border border-[#8B7856] text-[#2F504F] text-xs font-semibold tracking-wider uppercase shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <CalendarPlus size={15} className="text-[#BD374E]" />
            <span>Save to Calendar</span>
            <ChevronDown
              size={14}
              className={`text-[#8B7856] transition-transform duration-200 ${
                calendarMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <AnimatePresence>
            {calendarMenuOpen && (
              <motion.div
                role="menu"
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="mt-2 w-full rounded-2xl bg-[#FDF9F7] border border-[#8B7856] p-1.5 shadow-xl text-left flex flex-col gap-1"
              >
                <a
                  role="menuitem"
                  href={GOOGLE_CALENDAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setCalendarMenuOpen(false)}
                  className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#2F504F] hover:bg-[#F3EAE3] transition-colors whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} className="text-[#BD374E]" />
                    <span>Add to Google Calendar</span>
                  </span>
                  <ExternalLink size={12} className="text-[#8B7856]" />
                </a>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleDownloadIcs}
                  className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#2F504F] hover:bg-[#F3EAE3] transition-colors cursor-pointer whitespace-nowrap w-full text-left"
                >
                  <span className="inline-flex items-center gap-2">
                    <Download size={14} className="text-[#8B7856]" />
                    <span>{icsDownloaded ? 'Saved (.ics Downloaded)' : 'Download .ics File'}</span>
                  </span>
                  <span className="font-cinzel text-[9px] tracking-wider uppercase text-[#8B7856]">
                    Apple / Outlook
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Single-Line Quick Navigation Links */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-4 border-t border-[#D3C5B0]/20 w-full"
        >
          {quickLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-[#FBF5F2]/80 hover:text-[#D3C5B0] transition-colors whitespace-nowrap shrink-0 underline-offset-4 hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Clean Back to Top Action */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to Top"
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#D3C5B0]/40 bg-[#1B3130]/75 hover:bg-[#142524] text-[#D3C5B0] hover:text-[#FBF5F2] text-[10px] font-cinzel tracking-[0.18em] uppercase transition-colors cursor-pointer whitespace-nowrap"
        >
          <ArrowUp size={12} />
          <span>Back to Top</span>
        </button>
      </div>

      {/* Nilesh Mali Portfolio Credit Bar */}
      <div className="py-3.5 px-4 bg-[#142524] border-t border-[#8B7856]/35 flex items-center justify-center text-center relative z-10">
        <p className="text-xs font-sans tracking-wider text-[#FBF5F2]/80 flex items-center gap-1.5">
          <span>Craft By</span>
          <a
            href="https://nilesh.runs-on.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#D3C5B0] hover:text-white transition-colors underline decoration-[#8B7856]/75 underline-offset-4 cursor-pointer"
          >
            Nilesh Mali
          </a>
        </p>
      </div>
    </footer>
  );
}
