import React, { useState } from 'react';
import { Menu, X, Music, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  isPlaying: boolean;
  isMuted?: boolean;
  volume?: number;
  onToggleMusic: () => void;
  onToggleMute?: () => void;
  onVolumeDown?: () => void;
  onVolumeUp?: () => void;
  onOpenRSVP: () => void;
}

export default function Navbar({
  isPlaying,
  isMuted = false,
  onToggleMusic,
  onToggleMute,
  onVolumeDown,
  onVolumeUp,
  onOpenRSVP
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Our Story', href: '#our-story' },
    { name: 'Events', href: '#events' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Wishes', href: '#wishes' },
    { name: 'RSVP', href: '#rsvp' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FBF5F2]/95 backdrop-blur-md border-b border-[#D3C5B0] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 sm:h-20 flex items-center justify-between relative">
        {/* Left: Music & Mute Button with quick volume */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              if (onToggleMute) {
                onToggleMute();
              } else {
                onToggleMusic();
              }
            }}
            className="w-10 h-10 rounded-full border border-[#8B7856] bg-[#FDF9F7] text-[#2F504F] flex items-center justify-center hover:bg-[#F3EAE3] transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
            title={isMuted ? "Unmute Music" : isPlaying ? "Mute Music" : "Play Wedding Music"}
            aria-label="Toggle Mute / Music"
          >
            {isMuted ? (
              <VolumeX size={17} className="text-[#BD374E]" />
            ) : isPlaying ? (
              <Music size={17} className="text-[#2F504F] animate-pulse" />
            ) : (
              <Volume2 size={17} className="text-[#2F504F]/75" />
            )}
          </button>

          {onVolumeDown && (
            <button
              onClick={onVolumeDown}
              className="hidden sm:flex w-8 h-8 rounded-full border border-[#D3C5B0] bg-[#FDF9F7] text-[#2F504F] items-center justify-center text-xs font-bold hover:bg-[#F3EAE3] cursor-pointer transition-colors"
              title="Volume Down"
              aria-label="Volume Down"
            >
              -
            </button>
          )}
          {onVolumeUp && (
            <button
              onClick={onVolumeUp}
              className="hidden sm:flex w-8 h-8 rounded-full border border-[#D3C5B0] bg-[#FDF9F7] text-[#2F504F] items-center justify-center text-xs font-bold hover:bg-[#F3EAE3] cursor-pointer transition-colors"
              title="Volume Up"
              aria-label="Volume Up"
            >
              +
            </button>
          )}
        </div>

        {/* Center: Official SP Wedding Logo */}
        <a href="#hero" className="flex items-center gap-2 group absolute left-1/2 -translate-x-1/2">
          <img
            src="/assets/aistudio/image_d5322966.png"
            alt="Sheetal & Prakash Ji Logo"
            className="h-14 sm:h-16 w-auto object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Right: RSVP Button & Menu Hamburger */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenRSVP}
            className="hidden sm:inline-flex px-5 py-2 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs font-medium tracking-wider uppercase transition-all shadow-sm hover:shadow hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            RSVP
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full border border-[#8B7856] bg-[#FDF9F7] text-[#2F504F] flex items-center justify-center hover:bg-[#F3EAE3] transition-colors cursor-pointer shadow-xs hover:scale-105 active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="bg-[#FDF9F7] border-b border-[#8B7856]/40 px-6 py-5 flex flex-col gap-2.5 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[#322F2A] hover:text-[#2F504F] font-medium text-sm border-b border-[#D3C5B0]/40 last:border-0 flex items-center justify-between transition-colors"
            >
              <span>{link.name}</span>
              <span className="text-[#8B7856]">✦</span>
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRSVP();
            }}
            className="mt-2 w-full py-2.5 rounded-full bg-[#2F504F] hover:bg-[#1F3837] text-[#FBF5F2] text-xs font-semibold tracking-wider uppercase text-center cursor-pointer transition-colors"
          >
            Confirm RSVP
          </button>
        </div>
      )}
    </header>
  );
}
