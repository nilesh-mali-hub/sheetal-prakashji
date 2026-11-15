import React from 'react';
import { Calendar, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'Our Story', href: '#our-story' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Wishes', href: '#wishes' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#2F504F] via-[#24403F] to-[#1B3130] text-[#FBF5F2] overflow-hidden mt-10 shadow-[0_-14px_44px_rgba(31,56,55,0.22)]">
      {/* Ornate Scalloped Mughal Arch Top Transition */}
      <div className="w-full overflow-hidden leading-none bg-[#FBF5F2]">
        <svg
          viewBox="0 0 600 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-7 sm:h-9 block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 44H600V24C540 24 510 6 450 6C390 6 360 24 300 24C240 24 210 6 150 6C90 6 60 24 0 24V44Z"
            fill="#2F504F"
          />
          <path
            d="M0 24C60 24 90 6 150 6C210 6 240 24 300 24C360 24 390 6 450 6C510 6 540 24 600 24"
            stroke="#8B7856"
            strokeWidth="2.5"
          />
          <path
            d="M0 28C60 28 90 10 150 10C210 10 240 28 300 28C360 28 390 10 450 10C510 10 540 28 600 28"
            stroke="#D3C5B0"
            strokeOpacity="0.45"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Decorative Floral Sprays on Top Corners */}
      <div className="absolute top-6 left-0 w-20 sm:w-28 pointer-events-none opacity-45 -translate-x-3">
        <img
          src="/assets/aistudio/floral_left.png"
          alt="Floral Arch Left"
          className="w-full h-auto object-contain transform -rotate-12"
        />
      </div>
      <div className="absolute top-6 right-0 w-20 sm:w-28 pointer-events-none opacity-45 translate-x-3">
        <img
          src="/assets/aistudio/floral_right.png"
          alt="Floral Arch Right"
          className="w-full h-auto object-contain transform rotate-12 scale-x-[-1]"
        />
      </div>

      {/* Main Royal Closing Frame */}
      <div className="relative z-10 pt-5 pb-8 px-5 sm:px-8 max-w-md mx-auto">
        <div className="relative rounded-3xl border border-[#D3C5B0]/25 bg-[#1F3837]/35 backdrop-blur-xs px-5 py-7 text-center flex flex-col items-center shadow-inner">
          {/* Corner Filigree Accents */}
          <span className="absolute top-3 left-4 text-[#D3C5B0]/50 text-[10px]">✦</span>
          <span className="absolute top-3 right-4 text-[#D3C5B0]/50 text-[10px]">✦</span>
          <span className="absolute bottom-3 left-4 text-[#D3C5B0]/50 text-[10px]">✦</span>
          <span className="absolute bottom-3 right-4 text-[#D3C5B0]/50 text-[10px]">✦</span>

          {/* Soft Radiant Glow + Official SP Monogram Crest */}
          <div className="relative mb-3">
            <div className="absolute inset-0 rounded-full bg-[#D3C5B0]/20 blur-xl scale-110 pointer-events-none" />
            <div className="w-24 sm:w-28 h-auto mx-auto relative filter drop-shadow-[0_6px_18px_rgba(0,0,0,0.28)]">
              <img
                src="/assets/aistudio/image_d5322966.png"
                alt="Sheetal & Prakash Ji Wedding Logo"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Auspicious Invocation */}
          <span className="font-cinzel text-[10px] tracking-[0.28em] uppercase text-[#D3C5B0]/85 mb-1">
            With Love &amp; Blessings
          </span>

          {/* Couple Names */}
          <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF5F2] font-bold tracking-tight text-balance">
            Sheetal <span className="font-normal italic text-[#D3C5B0]">&amp;</span> Prakash Ji
          </h3>

          {/* Delicate Antique Brass Divider */}
          <div className="flex items-center justify-center gap-3 my-3 w-full">
            <div className="w-14 h-px bg-gradient-to-r from-transparent to-[#D3C5B0]/75" />
            <span className="text-[#BD374E] text-xs">✦</span>
            <div className="w-14 h-px bg-gradient-to-l from-transparent to-[#D3C5B0]/75" />
          </div>

          {/* Embossed Date Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172B2A]/80 border border-[#8B7856]/60 text-xs sm:text-sm text-[#FBF5F2] font-serif mb-4 shadow-xs">
            <Calendar size={14} className="text-[#D3C5B0]" />
            <span className="font-semibold tracking-wide">5th December, 2026</span>
          </div>

          {/* Traditional Auspicious Blessing */}
          <p className="font-hindi text-xs sm:text-sm text-[#D3C5B0] tracking-widest font-medium mb-5">
            ॥ आप सभी सपरिवार सादर आमंत्रित हैं ॥
          </p>

          {/* Subtle Quick Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 pt-4 border-t border-[#D3C5B0]/20 w-full"
          >
            {quickLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-cinzel text-[10px] tracking-[0.16em] uppercase text-[#FBF5F2]/80 hover:text-[#D3C5B0] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D3C5B0]/40 bg-[#2F504F]/60 hover:bg-[#172B2A] text-[#D3C5B0] hover:text-[#FBF5F2] text-[10px] font-cinzel tracking-[0.18em] uppercase transition-all cursor-pointer"
          >
            <ArrowUp size={12} />
            <span>Back to Top</span>
          </button>
        </div>
      </div>

      {/* Nilesh Mali Portfolio Credit Bar */}
      <div className="py-3.5 px-4 bg-[#142524] border-t border-[#8B7856]/35 flex flex-col items-center justify-center text-center relative z-10">
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
