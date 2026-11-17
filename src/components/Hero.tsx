import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Menu, X, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ScratchCard from './ScratchCard';
import CountdownTimer from './CountdownTimer';
import watercolorCoupleImg from '../assets/images/watercolor_couple_marigold_arch_1794684226646.jpg';
import chhatriBackdropImg from '../assets/images/rajasthan_chhatri_hero_1794069479357.jpg';

interface HeroProps {
  isPlaying: boolean;
  isMuted?: boolean;
  volume?: number;
  onToggleMusic: () => void;
  onToggleMute?: () => void;
  onVolumeDown?: () => void;
  onVolumeUp?: () => void;
  onOpenRSVP: () => void;
  onReopenGate?: () => void;
}

export default function Hero({
  isPlaying,
  isMuted = false,
  volume = 0.25,
  onToggleMusic,
  onToggleMute,
  onVolumeDown,
  onVolumeUp,
  onOpenRSVP,
  onReopenGate
}: HeroProps) {
  const [cardWidth, setCardWidth] = useState(300);
  const [dateRevealed, setDateRevealed] = useState(false);
  const [scratchResetKey, setScratchResetKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioMenuOpen, setAudioMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setCardWidth(Math.min(312, window.innerWidth - 72));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!menuOpen && !audioMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setAudioMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, audioMenuOpen]);

  const handleScrollToStory = () => {
    const storyElem = document.getElementById('our-story');
    if (storyElem) {
      storyElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToKeepsake = () => {
    const keepsakeElem = document.getElementById('hero-keepsake');
    if (keepsakeElem) {
      keepsakeElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleScrollToStory();
    }
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#our-story' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Wishes', href: '#wishes' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <section id="hero" className="relative w-full pt-0 pb-6 text-center z-10">
      {/* WATERCOLOR BLUSH-IVORY HERO UNIFIED WITH SP PALETTE */}
      <div className="relative w-full overflow-hidden border-b border-[#D3C5B0] bg-gradient-to-b from-[#F8EFEA] via-[#FAF4EF] to-[#FBF5F2] pt-3 pb-10 px-4 sm:px-6 shadow-[0_12px_36px_rgba(47,80,79,0.08)]">
        {/* Subtle Heritage Backdrop Wash */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={chhatriBackdropImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center opacity-10 filter saturate-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8EFEA]/88 via-[#FAF4EF]/84 to-[#FBF5F2]" />
        </div>

        {/* Top Controls Row: Music Button (Left), Invocation (Center), Menu Button (Right) */}
        <div className="relative z-20 flex items-center justify-between mb-3 px-1">
          {/* Music Control Button */}
          <div className="relative">
            <button
              onClick={() => {
                if (onToggleMute) {
                  onToggleMute();
                } else {
                  onToggleMusic();
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setAudioMenuOpen(!audioMenuOpen);
              }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FDF9F7]/90 border border-[#8B7856]/75 text-[#2F504F] flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105 active:scale-95 hover:bg-[#F3EAE3]"
              aria-label="Toggle Wedding Music / Mute"
              title={isMuted ? "Unmute Music" : isPlaying ? "Mute Music (Right-click for volume)" : "Play Music"}
            >
              {isMuted ? (
                <VolumeX size={18} className="text-[#BD374E]" />
              ) : isPlaying ? (
                <Music size={18} className="text-[#2F504F] animate-pulse" />
              ) : (
                <Volume2 size={18} className="text-[#2F504F]/75" />
              )}
            </button>

            {/* Quick Volume popup on hero button */}
            <AnimatePresence>
              {audioMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 5 }}
                  className="absolute left-0 top-12 z-40 bg-[#FDF9F7] border border-[#8B7856] rounded-xl p-2.5 shadow-xl w-48 text-left"
                >
                  <div className="flex items-center justify-between text-xs font-serif mb-1.5 text-[#2F504F]">
                    <span>Sound Volume</span>
                    <button
                      onClick={() => setAudioMenuOpen(false)}
                      className="text-xs text-[#322F2A]/60 hover:text-[#322F2A] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={onVolumeDown}
                      className="px-2 py-0.5 rounded bg-[#FBF5F2] border border-[#D3C5B0] text-xs text-[#2F504F] cursor-pointer hover:bg-[#F3EAE3]"
                    >
                      - Vol
                    </button>
                    <button
                      onClick={onVolumeUp}
                      className="px-2 py-0.5 rounded bg-[#FBF5F2] border border-[#D3C5B0] text-xs text-[#2F504F] cursor-pointer hover:bg-[#F3EAE3]"
                    >
                      + Vol
                    </button>
                    <button
                      onClick={onToggleMute}
                      className="px-2 py-0.5 rounded bg-[#2F504F] text-[#FBF5F2] text-[10px] ml-auto cursor-pointer"
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Traditional Auspicious Invocation (Center Header) */}
          <div className="flex flex-col items-center">
            <span className="font-hindi text-xs sm:text-sm text-[#8B7856] font-medium tracking-widest">
              ॥ श्री गणेशाय नमः ॥
            </span>
            <span className="font-hindi text-[11px] sm:text-xs text-[#2F504F] tracking-wide">
              शुभ विवाह
            </span>
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FDF9F7]/90 border border-[#8B7856]/75 text-[#2F504F] flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105 active:scale-95 hover:bg-[#F3EAE3]"
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* === EDITORIAL WATERCOLOR OPENING TABLEAU (Matches Reference Image) === */}
        <div className="relative z-10 flex flex-col items-center text-center pt-3 sm:pt-4 max-w-md mx-auto">
          {/* Left & Right Dainty Marigold Sprig Sketches */}
          <svg
            aria-hidden="true"
            viewBox="0 0 44 68"
            fill="none"
            className="pointer-events-none select-none absolute -left-2 sm:-left-6 top-16 w-9 sm:w-11 opacity-85"
          >
            <path d="M22 26 C21 40 22 52 20 64" stroke="#6F7D3E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M21 38 C14 35 10 37 7 42 C13 42 18 41 21 38Z" fill="#7D8C47" fillOpacity="0.8" />
            <path d="M22 42 C29 39 34 41 36 46 C30 46 25 44 22 42Z" fill="#6F7D3E" fillOpacity="0.8" />
            <circle cx="22" cy="18" r="10.5" fill="#F2B84B" fillOpacity="0.88" stroke="#C87E28" strokeWidth="0.9" />
            <circle cx="22" cy="18" r="6.2" fill="#E39731" fillOpacity="0.85" />
            <circle cx="22" cy="18" r="2.6" fill="#C9731D" />
          </svg>

          <svg
            aria-hidden="true"
            viewBox="0 0 44 68"
            fill="none"
            className="pointer-events-none select-none absolute -right-2 sm:-right-6 top-14 w-9 sm:w-11 opacity-85 scale-x-[-1]"
          >
            <path d="M22 26 C21 40 22 52 20 64" stroke="#6F7D3E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M21 38 C14 35 10 37 7 42 C13 42 18 41 21 38Z" fill="#7D8C47" fillOpacity="0.8" />
            <path d="M22 42 C29 39 34 41 36 46 C30 46 25 44 22 42Z" fill="#6F7D3E" fillOpacity="0.8" />
            <circle cx="22" cy="18" r="10.5" fill="#F2B84B" fillOpacity="0.88" stroke="#C87E28" strokeWidth="0.9" />
            <circle cx="22" cy="18" r="6.2" fill="#E39731" fillOpacity="0.85" />
            <circle cx="22" cy="18" r="2.6" fill="#C9731D" />
          </svg>

          {/* Subtle Scattered Watercolor Petals */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute right-8 sm:right-12 top-24 w-4 h-2.5 rounded-[70%_30%_60%_40%] bg-[#BD374E]/80 rotate-[-18deg]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute left-6 sm:left-10 top-52 w-3.5 h-2.5 rounded-[65%_35%_70%_30%] bg-[#D65A47]/80 rotate-[24deg]"
          />

          {/* Crimson Tracked Eyebrow */}
          <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#BD374E] font-semibold mb-2">
            An Invitation
          </span>

          {/* Stacked Graceful Italic Couple Names in Deep Slate Teal */}
          <h1 className="font-serif italic text-[2.7rem] sm:text-[3.35rem] text-[#2F504F] font-normal leading-[1.06] tracking-tight text-balance">
            <span className="block">Sheetal</span>
            <span className="block text-xl sm:text-2xl text-[#BD374E] my-0.5 font-normal">&amp;</span>
            <span className="block">Prakash Ji</span>
          </h1>

          {/* Fine Hairline Stationery Framing & Poetic Subtitle (Zero Venue/Location) */}
          <div className="w-full max-w-[330px] sm:max-w-[370px] mt-4 mb-1 pt-3 pb-3 border-t border-b border-[#8B7856]/30 relative">
            <p className="font-serif italic text-[13px] sm:text-[15px] text-[#322F2A]/85 leading-relaxed">
              Two families, one open page, a lifetime to fill it.
            </p>
          </div>

          {/* Watercolor Bride & Groom Under Marigold Floral Arch */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="w-full max-w-[340px] sm:max-w-[390px] mx-auto -mt-2 relative"
          >
            <img
              src={watercolorCoupleImg}
              alt="Watercolor illustration of Sheetal and Prakash Ji holding hands beneath a blooming marigold floral arch"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain select-none mix-blend-multiply"
            />
          </motion.div>

          {/* Subtle "TURN THE PAGE" Editorial Scroll Cue */}
          <button
            type="button"
            onClick={handleScrollToKeepsake}
            className="mt-1 mb-6 inline-flex flex-col items-center gap-1 font-cinzel text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#8B7856] hover:text-[#2F504F] transition-colors cursor-pointer group"
          >
            <span>Turn The Page</span>
            <span className="text-xs text-[#BD374E]/80 group-hover:translate-y-0.5 transition-transform">
              ⌄
            </span>
          </button>

          {/* === KEEPSAKE BEAT: OFFICIAL SP LOGO, PINK HEART DATE REVEAL & MINIMAL COUNTDOWN === */}
          <div id="hero-keepsake" className="w-full flex flex-col items-center pt-5 border-t border-[#D3C5B0]/70">
            {/* Official Transparent Scalloped SP Logo */}
            <div className="relative mb-4 group cursor-pointer" onClick={handleScrollToStory}>
              <div className="w-24 sm:w-28 h-auto mx-auto relative">
                <img
                  src="/assets/aistudio/image_d5322966.png"
                  alt="Sheetal & Prakash Ji Wedding Monogram Logo"
                  className="w-full h-auto object-contain filter drop-shadow-[0_8px_18px_rgba(47,80,79,0.14)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Unified Keepsake Label & Replay Toggle */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#8B7856]/70" />
              <span className="text-[10px] sm:text-[11px] font-cinzel tracking-[0.18em] uppercase text-[#8B7856] font-semibold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#BD374E]" />
                <span>{dateRevealed ? 'Save The Date Unveiled' : 'Rub Pink Heart to Reveal Date'}</span>
                <Sparkles size={12} className="text-[#BD374E]" />
              </span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#8B7856]/70" />
              {dateRevealed && (
                <button
                  onClick={() => {
                    setDateRevealed(false);
                    setScratchResetKey((prev) => prev + 1);
                  }}
                  title="Scratch Again"
                  aria-label="Scratch Again"
                  className="p-1 rounded-full text-[#BD374E] hover:text-[#2F504F] hover:bg-[#F3EAE3] transition-colors cursor-pointer shrink-0"
                >
                  <RotateCcw size={13} />
                </button>
              )}
            </div>

            {/* Pink Heart Foil Scratch Card (Cleanly Framed Directly on Canvas) */}
            <div className="mb-6 flex justify-center">
              <ScratchCard
                shape="heart"
                width={Math.min(256, cardWidth)}
                height={Math.round(Math.min(256, cardWidth) * 0.9)}
                resetKey={scratchResetKey}
                onReveal={() => setDateRevealed(true)}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#C84360] via-[#BD374E] to-[#871F34] flex flex-col items-center justify-center px-6 pb-5 pt-3 text-center relative overflow-hidden">
                  <span className="text-[10px] font-hindi tracking-[0.18em] text-[#F8DCE4] font-medium">
                    ✦ शुभ विवाह ✦
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="font-serif text-3xl sm:text-4xl text-[#FDF9F7] font-bold leading-none tabular-nums">
                      05
                    </span>
                    <span className="text-[#D3C5B0] text-sm">✦</span>
                    <span className="font-cinzel text-sm sm:text-base tracking-[0.14em] uppercase text-[#F7E5D8] font-semibold">
                      Dec 2026
                    </span>
                  </div>
                  <span className="font-serif italic text-[11px] sm:text-xs text-[#FDF9F7]/95 mt-1.5 tracking-wide">
                    Saturday • Save the Date
                  </span>
                </div>
              </ScratchCard>
            </div>

            {/* Minimal Wedding Countdown Timer Widget (Days, Hours & Minutes) */}
            <CountdownTimer targetDate="2026-12-05T00:00:00+05:30" />

            {/* CTA: Open Invitation Button */}
            <button
              onClick={handleScrollToStory}
              className="mt-1 inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(47,80,79,0.22)] hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer group border border-[#D3C5B0]/50"
            >
              <span>Open Invitation</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D3C5B0]" />
            </button>
          </div>
        </div>

        {/* Subtle Floating Animated Spiritual Diya in Hero Corner */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.9, y: [0, -5, 0] }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeOut' },
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="pointer-events-none select-none absolute bottom-3 left-3 sm:bottom-4 sm:left-5 z-10 w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center"
        >
          {/* Soft Warm Spiritual Aura */}
          <motion.div
            animate={{ scale: [0.92, 1.12, 0.95], opacity: [0.4, 0.72, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-1 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#E8A849]/35 blur-md"
          />

          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative w-full h-full drop-shadow-[0_4px_10px_rgba(47,80,79,0.18)]"
          >
            {/* Outer Flickering Flame */}
            <motion.path
              d="M32 10C32 10 40 19.5 40 26.2C40 30.8 36.4 34 32 34C27.6 34 24 30.8 24 26.2C24 19.5 32 10 32 10Z"
              fill="url(#diyaFlameOuter)"
              animate={{
                scaleY: [1, 1.09, 0.96, 1.06, 1],
                scaleX: [1, 0.95, 1.03, 0.97, 1],
                rotate: [0, -2, 2.5, -1.5, 0],
              }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '32px 33px' }}
            />

            {/* Inner Radiant Flame Core */}
            <motion.path
              d="M32 17.5C32 17.5 35.8 22.8 35.8 26.8C35.8 29.2 34.1 31.2 32 31.2C29.9 31.2 28.2 29.2 28.2 26.8C28.2 22.8 32 17.5 32 17.5Z"
              fill="#FFF7D6"
              animate={{
                scaleY: [1, 1.07, 0.95, 1],
                opacity: [0.9, 1, 0.85, 0.95],
              }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '32px 31px' }}
            />

            {/* Sacred Wick */}
            <path d="M32 32.5V36.5" stroke="#322F2A" strokeWidth="1.6" strokeLinecap="round" />

            {/* Decorative Oil Surface Rim */}
            <ellipse cx="32" cy="37.5" rx="18" ry="3.8" fill="#D3C5B0" stroke="#8B7856" strokeWidth="1.2" />
            <ellipse cx="32" cy="37.7" rx="13.5" ry="2.2" fill="#8B7856" fillOpacity="0.35" />

            {/* Carved Antique Brass Diya Bowl */}
            <path
              d="M14 37.5C14.8 45.8 22.3 50.8 32 50.8C41.7 50.8 49.2 45.8 50 37.5C45.2 40.2 39 41.2 32 41.2C25 41.2 18.8 40.2 14 37.5Z"
              fill="url(#diyaBowlBrass)"
              stroke="#2F504F"
              strokeWidth="1.15"
              strokeLinejoin="round"
            />

            {/* Traditional Scallop Motif & Rose Jewel Accent */}
            <path
              d="M21 43.2C24.2 45.3 28 46.2 32 46.2C36 46.2 39.8 45.3 43 43.2"
              stroke="#FDF9F7"
              strokeOpacity="0.65"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="2 2.5"
            />
            <circle cx="32" cy="44.2" r="1.6" fill="#BD374E" />

            {/* Brass Pedestal Base */}
            <path
              d="M25.5 50.5H38.5L40.5 54.5H23.5L25.5 50.5Z"
              fill="#8B7856"
              stroke="#2F504F"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />

            <defs>
              <linearGradient id="diyaFlameOuter" x1="32" y1="10" x2="32" y2="34" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFE17D" />
                <stop offset="0.55" stopColor="#F2A93B" />
                <stop offset="1" stopColor="#D65A31" />
              </linearGradient>
              <linearGradient id="diyaBowlBrass" x1="14" y1="38" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D3C5B0" />
                <stop offset="0.5" stopColor="#968667" />
                <stop offset="1" stopColor="#8B7856" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      {/* Slide-over Navigation Menu Modal */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F3837]/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-[#FDF9F7] border-2 border-[#8B7856] rounded-3xl p-6 sm:p-8 shadow-2xl text-center text-[#322F2A]"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 text-[#2F504F]/75 hover:text-[#2F504F] p-1.5 rounded-full hover:bg-[#F3EAE3] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="mb-5">
                <img
                  src="/assets/aistudio/image_d5322966.png"
                  alt="Sheetal & Prakash Ji Logo"
                  className="w-24 h-auto object-contain mx-auto mb-2"
                />
                <h4 className="font-serif text-2xl text-[#2F504F] font-semibold">Sheetal &amp; Prakash Ji</h4>
                <p className="text-xs text-[#8B7856] font-cinzel tracking-wider uppercase">Wedding Celebrations</p>
              </div>

              <nav className="flex flex-col gap-1.5 mb-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-sm text-[#322F2A] hover:text-[#2F504F] font-medium border-b border-[#D3C5B0]/50 last:border-0 transition-colors flex items-center justify-between px-3"
                  >
                    <span>{link.name}</span>
                    <span className="text-[#8B7856]">✦</span>
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenRSVP();
                  }}
                  className="w-full py-2.5 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs uppercase tracking-wider font-bold transition-all shadow-md cursor-pointer"
                >
                  Confirm RSVP
                </button>

                {onReopenGate && (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onReopenGate();
                    }}
                    className="w-full py-2.5 rounded-full bg-[#FBF5F2] hover:bg-[#F3EAE3] border border-[#8B7856] text-[#2F504F] text-xs uppercase tracking-wider font-semibold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>🏰</span>
                    <span>Replay Royal Gate Opening</span>
                  </button>
                )}

                {/* Sound Mute & Volume toggle in Menu */}
                <div className="p-2.5 rounded-xl border border-[#D3C5B0] bg-[#FBF5F2] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#2F504F]">
                    {isMuted ? <VolumeX size={15} className="text-[#BD374E]" /> : <Volume2 size={15} />}
                    <span>{isMuted ? 'Muted' : `Volume: ${Math.round(volume * 100)}%`}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={onVolumeDown}
                      className="px-2 py-0.5 rounded bg-[#FDF9F7] border border-[#D3C5B0] text-xs text-[#2F504F] cursor-pointer hover:bg-[#F3EAE3]"
                      title="Volume Down"
                    >
                      -
                    </button>
                    <button
                      onClick={onVolumeUp}
                      className="px-2 py-0.5 rounded bg-[#FDF9F7] border border-[#D3C5B0] text-xs text-[#2F504F] cursor-pointer hover:bg-[#F3EAE3]"
                      title="Volume Up"
                    >
                      +
                    </button>
                    <button
                      onClick={onToggleMute}
                      className="px-2.5 py-0.5 rounded bg-[#2F504F] text-[#FBF5F2] text-[11px] cursor-pointer"
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
