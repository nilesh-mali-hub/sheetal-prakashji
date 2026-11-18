import React, { useState, useEffect } from 'react';
import { Music, Volume2, VolumeX, Menu, X, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import ScratchCard from './ScratchCard';
import CountdownTimer from './CountdownTimer';
import royalDoorwayMandapImg from '../assets/images/royal_doorway_mandap_hero_1795024146731.jpg';

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
  const [heroImageLoaded, setHeroImageLoaded] = useState(true);
  const prefersReducedMotion = useReducedMotion();

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
      {/* FULL-BLEED CARVED DOORWAY, TORAN & GOLDEN MANDAP HERO (Matches Reference Design) */}
      <div className="relative w-full aspect-[9/16] overflow-hidden bg-gradient-to-b from-[#FAF4EA] via-[#FBF6EE] to-[#4A251B] shadow-[0_14px_38px_rgba(47,80,79,0.16)]">
        {/* Bespoke Vertical Architectural Doorway & Mandap Illustration with Slow Ken Burns Motion */}
        {heroImageLoaded && (
          <motion.img
            src={royalDoorwayMandapImg}
            alt="Carved heritage wooden doorway adorned with a mango-leaf toran framing a golden wedding mandap ceremony"
            referrerPolicy="no-referrer"
            onError={() => setHeroImageLoaded(false)}
            initial={false}
            animate={
              prefersReducedMotion
                ? { scale: 1, x: 0, y: 0 }
                : {
                    scale: [1, 1.075],
                    y: ['0%', '-1.2%'],
                  }
            }
            transition={
              prefersReducedMotion
                ? undefined
                : {
                    duration: 22,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
            }
            style={{ transformOrigin: 'center 58%' }}
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none will-change-transform"
          />
        )}

        {/* Top Corner Floating Controls (Clean & Non-Obtrusive Over Toran Edges) */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between">
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
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FDF9F7]/85 backdrop-blur-xs border border-[#8B7856]/60 text-[#2F504F] flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105 active:scale-95 hover:bg-[#FDF9F7]"
              aria-label="Toggle Wedding Music / Mute"
              title={isMuted ? "Unmute Music" : isPlaying ? "Mute Music (Right-click for volume)" : "Play Music"}
            >
              {isMuted ? (
                <VolumeX size={16} className="text-[#BD374E]" />
              ) : isPlaying ? (
                <Music size={16} className="text-[#2F504F] animate-pulse" />
              ) : (
                <Volume2 size={16} className="text-[#2F504F]/80" />
              )}
            </button>

            <AnimatePresence>
              {audioMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 5 }}
                  className="absolute left-0 top-11 z-40 bg-[#FDF9F7] border border-[#8B7856] rounded-xl p-2.5 shadow-xl w-48 text-left"
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

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FDF9F7]/85 backdrop-blur-xs border border-[#8B7856]/60 text-[#2F504F] flex items-center justify-center cursor-pointer shadow-sm transition-all hover:scale-105 active:scale-95 hover:bg-[#FDF9F7]"
            aria-label="Open Navigation Menu"
            title="Open Menu"
          >
            <Menu size={16} />
          </button>
        </div>

        {/* Luminous Upper-Center Typography Canvas Between Pillars & Below Toran */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 h-full w-full flex flex-col items-center text-center pt-[21.5%] sm:pt-[21%] px-[17%]"
        >
          {/* Quiet Auspicious Mantra */}
          <span className="font-hindi text-[10px] sm:text-xs tracking-[0.2em] text-[#8B6A3E]/90 font-medium mb-1">
            ॥ श्री गणेशाय नमः ॥
          </span>

          {/* Poetic Quote Above Couple Names */}
          <p className="font-serif italic text-[11px] sm:text-[14px] text-[#6A5745] leading-snug max-w-[225px] sm:max-w-[290px] mb-2.5 sm:mb-4">
            &ldquo;Two families, one open page, a lifetime to fill it.&rdquo;
          </p>

          {/* Grand Stacked Editorial Couple Names */}
          <h1 className="font-serif font-normal leading-[1.03] tracking-tight text-balance">
            <span className="block text-[clamp(2rem,8vw,3.25rem)] text-[#6E1F30] whitespace-nowrap">
              Sheetal
            </span>
            <span className="block font-script text-[clamp(2.1rem,8.4vw,3.15rem)] text-[#A2742B] leading-none -my-0.5 sm:my-0.5">
              Weds
            </span>
            <span className="block text-[clamp(2rem,8vw,3.25rem)] text-[#6E1F30] whitespace-nowrap">
              Prakash Ji
            </span>
          </h1>

          {/* Minimal Typographic Countdown Directly Below Couple Names */}
          <CountdownTimer targetDate="2026-12-05T00:00:00+05:30" variant="minimal" />
        </motion.div>
      </div>

      {/* === KEEPSAKE BEAT BELOW DOORWAY: SP LOGO, PINK HEART SCRATCH CARD & OPEN INVITATION === */}
      <div
        id="hero-keepsake"
        className="w-full flex flex-col items-center pt-7 pb-4 px-4 sm:px-6 bg-gradient-to-b from-[#FAF4EE] via-[#FBF5F2] to-[#FBF5F2] border-b border-[#D3C5B0]"
      >
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

        {/* Pink Heart Foil Scratch Card */}
        <div className="mb-5 flex justify-center">
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

        {/* Primary CTA: Open Invitation Button */}
        <button
          onClick={handleScrollToStory}
          className="mb-2 inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_8px_24px_rgba(47,80,79,0.22)] hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer group border border-[#D3C5B0]/50"
        >
          <span>Open Invitation</span>
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#D3C5B0]" />
        </button>
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
